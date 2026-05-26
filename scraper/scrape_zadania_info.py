"""
Scraper zadania.info — matura rozszerzona i podstawowa, poziom średni i trudny.

Użycie:
  python scrape_zadania_info.py              # PR (rozszerzona), 197 stron
  python scrape_zadania_info.py --level pp   # PP (podstawowa), 190 stron
  python scrape_zadania_info.py --test       # 1 strona, 3 zadania (szybki test)

Obrazki wzorów pobierane lokalnie do js/data/zi_images/.
Filtrowanie wg podstawy programowej z Informatora CKE 2024.
"""
import sys
import time
import json
import re
import hashlib
import requests
from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urlparse

sys.stdout.reconfigure(encoding='utf-8')

BASE_URL  = "https://zadania.info"
TASK_URL  = BASE_URL + "/d1/{task_id}"
IMG_DIR   = Path(__file__).parent.parent / "js" / "data" / "zi_images"
IMG_CACHE = Path(__file__).parent / "cache_images.json"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0',
    'Accept-Language': 'pl-PL,pl;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Referer': BASE_URL,
}

DELAY_LIST  = 1.5
DELAY_TASK  = 0.8
DELAY_IMG   = 0.1

# ── Konfiguracja poziomów ─────────────────────────────────────────────────────
LEVEL_CONFIG = {
    'pr': {
        'list_url':    BASE_URL + "/d1/1/5_3/{page}",   # rozszerzony, średni+trudny → 197 stron
        'total_pages': 197,
        'output_file': Path(__file__).parent.parent / "js" / "data" / "zadania_info_tasks.js",
        'cache_file':  Path(__file__).parent / "cache_tasks.json",
        'js_var':      'ZadaniaInfoTasks',
        'label':       'rozszerzona',
        'points':      4,
    },
    'pp': {
        'list_url':    BASE_URL + "/d1/1/5_2/{page}",   # podstawowy, średni+trudny → 190 stron
        'total_pages': 190,
        'output_file': Path(__file__).parent.parent / "js" / "data" / "zadania_info_tasks_pp.js",
        'cache_file':  Path(__file__).parent / "cache_tasks.json",  # wspólny cache zadań
        'js_var':      'ZadaniaInfoTasksPP',
        'label':       'podstawowa',
        'points':      2,
    },
}

# ── Podstawa programowa matury PR (Informator CKE 2024) ──────────────────────
# Tematy: Liczby/Wyrażenia/Równania, Funkcje/Ciągi/Tryg/Optymalizacja/Pochodne,
#         Planimetria/Geometria analityczna/Stereometria, Kombinatoryka/Prawdop./Statystyka
MATURA_CAT_PR = {
    'Całki':                  True,
    'Ciągi':                  True,
    'Dowody':                 True,
    'Funkcje':                True,
    'Geometria':              True,
    'Geometria analityczna':  True,
    'Planimetria':            True,
    'Stereometria':           True,
    'Kombinatoryka':          True,
    'Liczby':                 True,
    'Logarytmy':              True,
    'Optymalizacja':          True,
    'Pochodne':               True,
    'Potęgi i pierwiastki':   True,
    'Prawdopodobieństwo':     True,
    'Równania i nierówności': True,
    'Statystyka':             True,
    'Trygonometria':          True,
    'Wielomiany':             True,
    'Granice i ciągłość':     True,
    'Inne':                   None,
}

# ── Podstawa programowa matury PP (Informator CKE 2024) ──────────────────────
# Tematy: Liczby/Wyrażenia/Równania, Funkcje/Ciągi/Optymalizacja (BEZ POCHODNYCH!),
#         Trygonometria(podstawy)/Planimetria/Geometria analityczna/Stereometria,
#         Kombinatoryka/Prawdopodobieństwo/Statystyka
MATURA_CAT_PP = {
    'Całki':                  False,  # NIE ma w PP
    'Ciągi':                  True,   # arytmetyczny i geometryczny (podstawy)
    'Dowody':                 True,   # proste uzasadnienia
    'Funkcje':                True,   # liniowa, kwadratowa, wykładnicza (podstawy)
    'Geometria':              True,
    'Geometria analityczna':  True,   # prosta na płaszczyźnie
    'Planimetria':            True,
    'Stereometria':           True,
    'Kombinatoryka':          True,   # symbol Newtona, wariacje
    'Liczby':                 True,
    'Logarytmy':              True,   # podstawy logarytmów
    'Optymalizacja':          True,   # bez pochodnych (algebraiczne/geometryczne)
    'Pochodne':               False,  # NIE ma w PP
    'Potęgi i pierwiastki':   True,
    'Prawdopodobieństwo':     True,
    'Równania i nierówności': True,
    'Statystyka':             True,
    'Trygonometria':          True,   # sin/cos/tg w trójkącie + jedostkowy okrąg
    'Wielomiany':             True,   # tylko stopień ≤ 2 (praktycznie)
    'Granice i ciągłość':     False,  # NIE ma w PP
    'Inne':                   None,
}

# Aktywna konfiguracja (ustawiana przez argparse)
_LEVEL = 'pr'
MATURA_CATEGORIES = MATURA_CAT_PR
LIST_URL    = LEVEL_CONFIG['pr']['list_url']
OUTPUT_FILE = LEVEL_CONFIG['pr']['output_file']
CACHE_FILE  = LEVEL_CONFIG['pr']['cache_file']
TOTAL_PAGES = LEVEL_CONFIG['pr']['total_pages']
JS_VAR      = LEVEL_CONFIG['pr']['js_var']
JS_LABEL    = LEVEL_CONFIG['pr']['label']
JS_POINTS   = LEVEL_CONFIG['pr']['points']

# Słowa kluczowe POZA podstawą — jeśli wystąpią w treści, odrzuć zadanie
EXCLUDE_KEYWORDS = [
    'macierz', 'wyznacznik', 'tensor', 'przestrzeń liniowa', 'podprzestrzeń',
    'liczby zespolone', 'liczba zespolona', 'moduł liczby zespolonej',
    'szereg', 'szeregi', 'zbieżność szeregu',
    'równanie różniczkowe',
    'metryka', 'topologia',
    'teoria grup', 'pierścień', 'ciało algebraiczne',
    'całka wielokrotna', 'całka podwójna', 'całka po powierzchni',
    'delta diraca', 'transformata fouriera', 'transformata laplace',
]

# Słowa kluczowe w programie matury PR (dla kategorii "Inne")
INCLUDE_KEYWORDS_INNE = [
    'funkcj', 'równan', 'nierówno', 'ciąg', 'wielomian', 'logarytm',
    'trygonometr', 'sinus', 'cosinus', 'tangens', 'sin', 'cos', 'tg',
    'prawdopodobie', 'kombinatoryk', 'permutacj', 'kombinacj',
    'planimetri', 'stereometri', 'geometri', 'trójkąt', 'okrąg',
    'pochodn', 'całk', 'optymalizacj', 'ekstrem',
    'statystyk', 'średnia', 'mediana', 'odchylenie',
    'potęg', 'pierwiastk', 'logarytm',
    'prosta', 'płaszczyzna', 'graniastosłup', 'ostrosłup', 'stożek', 'kula',
    'układ równań', 'wariacja', 'symbol Newtona', 'symbol newtona',
]


# ── Mapowanie kategorii ────────────────────────────────────────────────────────
CATEGORY_MAP = {
    'prawdopodobieństwo': 'Prawdopodobieństwo',
    'kombinatoryk':        'Kombinatoryka',
    'ciąg':                'Ciągi',
    'ciag':                'Ciągi',
    'trygonometri':        'Trygonometria',
    'sinus':               'Trygonometria',
    'cosinus':             'Trygonometria',
    'tangens':             'Trygonometria',
    ' sin ':               'Trygonometria',
    ' cos ':               'Trygonometria',
    'funkcj':              'Funkcje',
    'równanie':            'Równania i nierówności',
    'rownan':              'Równania i nierówności',
    'nierówno':            'Równania i nierówności',
    'nierowno':            'Równania i nierówności',
    'układ':               'Równania i nierówności',
    'uklad':               'Równania i nierówności',
    'geometri':            'Geometria',
    'planimetri':          'Planimetria',
    'stereometri':         'Stereometria',
    'analityczn':          'Geometria analityczna',
    'trójkąt':             'Planimetria',
    'trojkat':             'Planimetria',
    'okrąg':               'Planimetria',
    'okrag':               'Planimetria',
    'graniastosłup':       'Stereometria',
    'ostrosłup':           'Stereometria',
    'stożek':              'Stereometria',
    'walec':               'Stereometria',
    'kula':                'Stereometria',
    'logarytm':            'Logarytmy',
    'potęg':               'Potęgi i pierwiastki',
    'poteg':               'Potęgi i pierwiastki',
    'pierwiastk':          'Potęgi i pierwiastki',
    'wielomian':           'Wielomiany',
    'granica':             'Granice i ciągłość',
    'pochodn':             'Pochodne',
    'całk':                'Całki',
    'calk':                'Całki',
    'statystyk':           'Statystyka',
    'optymalizacj':        'Optymalizacja',
    'ekstrem':             'Optymalizacja',
    'maksimum':            'Optymalizacja',
    'minimum':             'Optymalizacja',
    'dowód':               'Dowody',
    'dowod':               'Dowody',
    'indukcj':             'Dowody',
    'liczb':               'Liczby',
    'podzielno':           'Liczby',
    'nwd':                 'Liczby',
    'nww':                 'Liczby',
    'pierwsz':             'Liczby',
}


def guess_category(text: str) -> str:
    t = text.lower()
    for keyword, cat in CATEGORY_MAP.items():
        if keyword in t:
            return cat
    return 'Inne'


def is_matura_task(task: dict) -> bool:
    """Czy zadanie jest w podstawie programowej matury PR?"""
    cat = task.get('category', 'Inne')
    stmt = (task.get('statement', '') + ' ' + task.get('statement_html', '')).lower()

    # Sprawdź czy kategoria jest wykluczona z matury
    in_matura = MATURA_CATEGORIES.get(cat)
    if in_matura is False:
        return False
    if in_matura is True:
        # Sprawdź czy treść nie zawiera słów kluczowych poza programem
        for kw in EXCLUDE_KEYWORDS:
            if kw in stmt:
                return False
        return True

    # in_matura is None → kategoria "Inne", sprawdź słowa kluczowe
    for kw in EXCLUDE_KEYWORDS:
        if kw in stmt:
            return False
    for kw in INCLUDE_KEYWORDS_INNE:
        if kw in stmt:
            return True
    # Nie można sklasyfikować → odrzuć
    return False


# ── Pobieranie obrazków ────────────────────────────────────────────────────────
session = requests.Session()
session.headers.update(HEADERS)

# Cache URL→filename (wczytywany na starcie)
_img_cache: dict[str, str] = {}


def load_img_cache():
    global _img_cache
    if IMG_CACHE.exists():
        with open(IMG_CACHE, encoding='utf-8') as f:
            _img_cache = json.load(f)
    IMG_DIR.mkdir(parents=True, exist_ok=True)


def save_img_cache():
    with open(IMG_CACHE, 'w', encoding='utf-8') as f:
        json.dump(_img_cache, f, ensure_ascii=False)


def download_image(url: str) -> str | None:
    """Pobierz obrazek, zapisz lokalnie, zwróć ścieżkę względną (od js/data/)."""
    if not url or not url.startswith('http'):
        return None
    if url in _img_cache:
        return _img_cache[url]

    try:
        r = session.get(url, timeout=15)
        if r.status_code != 200:
            return None
        # Nazwa pliku = hash URL + oryginalne rozszerzenie
        ext = Path(urlparse(url).path).suffix or '.gif'
        fname = hashlib.md5(url.encode()).hexdigest()[:12] + ext
        fpath = IMG_DIR / fname
        fpath.write_bytes(r.content)

        rel = f"js/data/zi_images/{fname}"   # względna od katalogu głównego (index.html)
        _img_cache[url] = rel
        time.sleep(DELAY_IMG)
        return rel
    except Exception as e:
        print(f"    Błąd obrazka {url}: {e}")
        return None


# ── Parsowanie ─────────────────────────────────────────────────────────────────
def extract_text_with_math(element) -> str:
    """Plain text z [alt text] — używany do kategoryzacji."""
    parts = []
    for child in element.children:
        if hasattr(child, 'name') and child.name == 'img':
            alt = child.get('alt', '').strip()
            if alt:
                parts.append(f' [{alt}] ')
            # zadania.info używa niestandardowego </img>, przez co BeautifulSoup
            # traktuje następne elementy jako dzieci tagu <img>.
            # Rekurencyjnie przetwarzamy zawartość img, żeby nie stracić tekstu i wzorów.
            if list(child.children):
                parts.append(extract_text_with_math(child))
        elif hasattr(child, 'children'):
            parts.append(extract_text_with_math(child))
        else:
            parts.append(str(child))
    text = ''.join(parts)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def extract_html_with_math(element, download_imgs=True) -> str:
    """HTML z <img> tagami — obrazki pobierane lokalnie (Plan B)."""
    import html as htmllib

    def process_node(node):
        if isinstance(node, str):
            return htmllib.escape(str(node))
        if not hasattr(node, 'name') or node.name is None:
            return htmllib.escape(str(node))

        tag = node.name.lower()

        if tag == 'img':
            src = node.get('src', '').strip()
            alt = node.get('alt', '').strip()
            # Uzupełnij URL absolutny
            if src.startswith('//'):
                src = 'https:' + src
            elif src.startswith('/'):
                src = BASE_URL + src
            elif src and not src.startswith('http'):
                src = BASE_URL + '/' + src

            if src and download_imgs:
                local = download_image(src)
                if local:
                    src = local  # np. "zi_images/abc123.gif"

            alt_esc = htmllib.escape(alt)
            img_html = f'<img src="{src}" alt="{alt_esc}" class="zi-math-img">'
            # zadania.info używa niestandardowego </img>, przez co BeautifulSoup
            # traktuje kolejne elementy (tekst "i", drugi wzór) jako DZIECI <img>.
            # Musimy je przetworzyć i dołączyć po tagu <img>.
            children_html = ''.join(process_node(c) for c in node.children)
            return img_html + children_html

        if tag in ('script', 'style', 'head', 'nav', 'footer', 'header'):
            return ''

        inner = ''.join(process_node(c) for c in node.children)
        if tag == 'div':
            classes = node.get('class', [])
            s = inner.strip()
            if 'latex__math-display' in classes:
                return f'<div class="zi-display-math">{s}</div>' if s else ''
            return (s + '<br>') if s else ''
        if tag in ('p', 'li', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5'):
            s = inner.strip()
            return (s + '<br>') if s else ''
        if tag == 'br':
            return '<br>'
        if tag in ('b', 'strong'):
            return f'<strong>{inner}</strong>'
        if tag in ('i', 'em'):
            return f'<em>{inner}</em>'
        if tag == 'sup':
            return f'<sup>{inner}</sup>'
        if tag == 'sub':
            return f'<sub>{inner}</sub>'
        return inner

    raw_html = ''.join(process_node(c) for c in element.children)
    raw_html = re.sub(r'(<br>\s*){3,}', '<br><br>', raw_html)
    raw_html = re.sub(r'^\s*(<br>)+', '', raw_html)
    raw_html = re.sub(r'(<br>)+\s*$', '', raw_html)
    return raw_html.strip()


def parse_list_page(html: str) -> list[dict]:
    soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')
    tasks = []

    for box in soup.find_all('div', class_='doc-box__inner'):
        task = {}

        src = box.find('div', class_='doc-box__src')
        if not src:
            continue
        task['statement'] = extract_text_with_math(src)

        sol_link = box.find('a', href=lambda h: h and re.match(r'^/d1/\d+$', h))
        if not sol_link:
            continue
        task['id'] = sol_link['href'].split('/')[-1]
        task['source_url'] = BASE_URL + sol_link['href']

        exam_link = box.find('a', href=lambda h: h and '/d916/' in str(h))
        if exam_link:
            task['exam_source'] = exam_link.get_text(strip=True)
            m = re.search(r'(\d{4})', task['exam_source'])
            task['year'] = int(m.group(1)) if m else None
        else:
            task['exam_source'] = ''
            task['year'] = None

        diff_div = box.find('div', class_='ex__diff')
        if diff_div and diff_div.find('div', class_='ex__diff--h'):
            task['difficulty'] = 'trudny'
        else:
            task['difficulty'] = 'sredni'

        task['category'] = guess_category(task['statement'])
        tasks.append(task)

    return tasks


def parse_task_page(html: str, download_imgs=True) -> dict:
    soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')
    boxes = soup.find_all('div', class_='article-dbl-box__content')

    result = {}
    if len(boxes) >= 1:
        result['statement']      = extract_text_with_math(boxes[0])
        result['statement_html'] = extract_html_with_math(boxes[0], download_imgs)
    if len(boxes) >= 2:
        result['solution']       = extract_text_with_math(boxes[1])
        result['solution_html']  = extract_html_with_math(boxes[1], download_imgs)

    aside = soup.find('aside') or soup.find('div', class_=lambda c: c and 'sidebar' in str(c))
    if aside:
        for lnk in aside.find_all('a', href=True):
            href = lnk.get('href', '')
            if '/d1/' in href:
                txt = lnk.get_text(strip=True)
                if txt and txt not in ('Szkoła średnia',):
                    result['category_hint'] = txt
                    break

    return result


# ── Sieć ──────────────────────────────────────────────────────────────────────
def fetch(url: str, retries=3):
    for attempt in range(retries):
        try:
            r = session.get(url, timeout=20)
            if r.status_code == 200:
                return r.content
            elif r.status_code == 429:
                print(f"  Rate limit! Czekam 30s...")
                time.sleep(30)
            else:
                print(f"  HTTP {r.status_code} dla {url}")
                return None
        except Exception as e:
            print(f"  Błąd: {e}, próba {attempt+1}/{retries}")
            time.sleep(5 * (attempt + 1))
    return None


# ── Główna logika ──────────────────────────────────────────────────────────────
def run(pages_to_scrape=None, fetch_solutions=True, max_tasks=None, download_imgs=True):
    load_img_cache()
    pages = pages_to_scrape or list(range(1, TOTAL_PAGES + 1))
    print(f"Poziom: {JS_LABEL.upper()} | URL: {LIST_URL.format(page='N')} | Stron: {TOTAL_PAGES}")

    cache = {}
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding='utf-8') as f:
            cache = json.load(f)
        print(f"Cache zadań: {len(cache)}, cache obrazków: {len(_img_cache)}")

    all_tasks_meta = []

    # ── Faza 1: Scraping list pages ──
    print(f"\n=== FAZA 1: Scraping stron listy ({len(pages)} stron) ===")
    for page_num in pages:
        url = LIST_URL.format(page=page_num)
        print(f"Strona {page_num}/{TOTAL_PAGES}: {url}")
        html = fetch(url)
        if html is None:
            print(f"  Pominięto stronę {page_num}")
            continue
        tasks = parse_list_page(html)
        print(f"  Znaleziono {len(tasks)} zadań")
        all_tasks_meta.extend(tasks)
        time.sleep(DELAY_LIST)

    print(f"\nRazem zadań z list: {len(all_tasks_meta)}")

    # ── Faza 2: Scraping indywidualnych zadań ──
    if fetch_solutions:
        print(f"\n=== FAZA 2: Pobieranie treści i rozwiązań (z obrazkami) ===")
        saved_every = 0
        for i, task in enumerate(all_tasks_meta):
            task_id = task['id']
            if max_tasks and i >= max_tasks:
                print(f"Osiągnięto limit {max_tasks}")
                break

            cached = cache.get(task_id, {})
            if cached.get('statement_html'):
                # Cache aktualny (ma HTML z lokalnymi obrazkami)
                task['statement']      = cached.get('statement_full', '')
                task['statement_html'] = cached['statement_html']
                task['solution']       = cached.get('solution', '')
                task['solution_html']  = cached.get('solution_html', '')
                continue

            # Pobierz stronę zadania
            if i % 50 == 0:
                print(f"  Postęp: {i}/{len(all_tasks_meta)}")
            print(f"  [{i+1}] Zadanie {task_id}...")

            html = fetch(TASK_URL.format(task_id=task_id))
            if html:
                detail = parse_task_page(html, download_imgs=download_imgs)
                task.update({k: detail[k] for k in detail if k in
                    ('statement', 'statement_html', 'solution', 'solution_html')})
                if 'category_hint' in detail:
                    task['category'] = guess_category(detail['category_hint']) or task['category']

                cache[task_id] = {
                    'statement_full':  task.get('statement', ''),
                    'statement_html':  task.get('statement_html', ''),
                    'solution':        task.get('solution', ''),
                    'solution_html':   task.get('solution_html', ''),
                }
                saved_every += 1
                if saved_every % 20 == 0:
                    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                        json.dump(cache, f, ensure_ascii=False, indent=2)
                    save_img_cache()
                    print(f"    Cache zapisany ({len(_img_cache)} obrazków)")

            time.sleep(DELAY_TASK)

        # Finalne zapisanie
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
        save_img_cache()

    return all_tasks_meta


def to_js_format(tasks: list[dict]) -> list[dict]:
    result = []
    skipped = 0
    for t in tasks:
        if not is_matura_task(t):
            skipped += 1
            continue
        task_id = t.get('id', '')
        cat = t.get('category', 'Inne')
        result.append({
            'id':            f"zi_{task_id}",
            'source':        'zadania.info',
            'source_id':     task_id,
            'source_url':    t.get('source_url', f"{BASE_URL}/d1/{task_id}"),
            'year':          t.get('year'),
            'exam_source':   t.get('exam_source', ''),
            'difficulty':    t.get('difficulty', 'sredni'),
            'category':      cat,
            'statement':     t.get('statement', ''),
            'statement_html':t.get('statement_html', ''),
            'solution':      t.get('solution', ''),
            'solution_html': t.get('solution_html', ''),
            'answer':  {'type': 'open', 'display': '', 'description': ''},
            'hints': [
                {'level': 1, 'text': 'Przeanalizuj treść zadania i zidentyfikuj co szukamy.'},
                {'level': 2, 'text': f'Dział: {cat}. Przypomnij sobie wzory i metody z tego działu.'},
                {'level': 3, 'text': 'Sprawdź rozwiązanie poniżej.'},
            ],
        })
    print(f"Przefiltrowano: {skipped} zadań poza podstawą programową")
    return result


def write_js_file(tasks: list[dict]):
    js_tasks = to_js_format(tasks)
    tasks_json = json.dumps(js_tasks, ensure_ascii=False, indent=2)

    js_content = f"""// Zadania maturalne — poziom {JS_LABEL}, trudność średnia i trudna
// Wygenerowano automatycznie. Zadań po filtrowaniu: {len(js_tasks)}

window.{JS_VAR} = (() => {{
  const TASKS = {tasks_json};

  const CAT_META = {{
    'Prawdopodobieństwo':    {{ icon: '🎲', id: 'zi_prob' }},
    'Kombinatoryka':          {{ icon: '🔢', id: 'zi_komb' }},
    'Ciągi':                  {{ icon: '📈', id: 'zi_ciag' }},
    'Trygonometria':          {{ icon: '📐', id: 'zi_tryg' }},
    'Funkcje':                {{ icon: '📊', id: 'zi_funk' }},
    'Równania i nierówności': {{ icon: '⚖️', id: 'zi_row'  }},
    'Geometria':              {{ icon: '🔷', id: 'zi_geom' }},
    'Planimetria':            {{ icon: '🔷', id: 'zi_plan' }},
    'Stereometria':           {{ icon: '🧊', id: 'zi_ster' }},
    'Geometria analityczna':  {{ icon: '📍', id: 'zi_anal' }},
    'Logarytmy':              {{ icon: '🔬', id: 'zi_log'  }},
    'Potęgi i pierwiastki':   {{ icon: '√',  id: 'zi_pot'  }},
    'Wielomiany':             {{ icon: '〰️', id: 'zi_wiel' }},
    'Granice i ciągłość':     {{ icon: '∞',  id: 'zi_gran' }},
    'Pochodne':               {{ icon: "∂",  id: 'zi_poch' }},
    'Całki':                  {{ icon: '∫',  id: 'zi_calk' }},
    'Statystyka':             {{ icon: '📉', id: 'zi_stat' }},
    'Optymalizacja':          {{ icon: '🎯', id: 'zi_opt'  }},
    'Dowody':                 {{ icon: '✏️', id: 'zi_dow'  }},
    'Liczby':                 {{ icon: '🔢', id: 'zi_liczb'}},
    'Inne':                   {{ icon: '❓', id: 'zi_inne' }},
  }};

  function rand(arr) {{ return arr[Math.floor(Math.random() * arr.length)]; }}

  function asTask(raw) {{
    if (!raw) return null;
    const meta = CAT_META[raw.category] || {{ icon: '❓', id: 'zi_inne' }};
    return {{
      id:             raw.id,
      source:         'zi',
      source_url:     raw.source_url,
      year:           raw.year,
      number:         raw.source_id,
      exam_source:    raw.exam_source,
      categoryId:     meta.id,
      categoryName:   raw.category,
      points:         4,
      difficulty:     raw.difficulty,
      statement:      raw.statement,
      statement_html: raw.statement_html || '',
      solution_raw:   raw.solution,
      solution_html:  raw.solution_html  || '',
      answer:         raw.answer,
      hints:          raw.hints,
      type:           'open',
      level:          '{JS_LABEL}',
    }};
  }}

  return {{
    getAll:              () => TASKS,
    getById:             (id) => TASKS.find(t => t.id === id || t.source_id === id),
    getByYear:           (y)  => TASKS.filter(t => t.year === y),
    getYears:            ()   => [...new Set(TASKS.map(t => t.year).filter(Boolean))].sort(),
    random:              ()   => rand(TASKS),
    randomByYear:        (y)  => {{ const f = TASKS.filter(t => t.year === y); return rand(f); }},
    getByCategory:       (c)  => TASKS.filter(t => t.category === c),
    getRandomByCategory: (c)  => {{ const f = TASKS.filter(t => t.category === c); return rand(f); }},
    count:               ()   => TASKS.length,
    categories:          ()   => [...new Set(TASKS.map(t => t.category))].sort(),
    catMeta:             (c)  => CAT_META[c] || {{ icon: '❓', id: 'zi_inne' }},
    asTask,
  }};
}})();
"""
    out = OUTPUT_FILE
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"\n✅ Zapisano {len(js_tasks)} zadań → {out}")


# ── Uruchomienie ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Scraper zadania.info — PR i PP')
    parser.add_argument('--level',        choices=['pr', 'pp'], default='pr',
                        help='Poziom matury: pr=rozszerzona (domyślnie), pp=podstawowa')
    parser.add_argument('--pages',        type=int, nargs='+')
    parser.add_argument('--no-solutions', action='store_true')
    parser.add_argument('--no-images',    action='store_true')
    parser.add_argument('--max-tasks',    type=int)
    parser.add_argument('--test',         action='store_true', help='1 strona, 3 zadania')
    args = parser.parse_args()

    # Ustaw konfigurację poziomu — nadpisz zmienne modułowe przez sys.modules
    import sys as _sys
    _mod = _sys.modules[__name__]
    cfg = LEVEL_CONFIG[args.level]
    _mod.MATURA_CATEGORIES = MATURA_CAT_PR if args.level == 'pr' else MATURA_CAT_PP
    _mod.LIST_URL    = cfg['list_url']
    _mod.OUTPUT_FILE = cfg['output_file']
    _mod.CACHE_FILE  = cfg['cache_file']
    _mod.TOTAL_PAGES = cfg['total_pages']
    _mod.JS_VAR      = cfg['js_var']
    _mod.JS_LABEL    = cfg['label']
    _mod.JS_POINTS   = cfg['points']

    if args.test:
        pages, max_tasks = [1], 3
    else:
        pages, max_tasks = args.pages, args.max_tasks

    tasks = run(
        pages_to_scrape=pages,
        fetch_solutions=not args.no_solutions,
        max_tasks=max_tasks,
        download_imgs=not args.no_images,
    )
    write_js_file(tasks)

    cats = {}
    for t in tasks:
        cats[t.get('category','?')] = cats.get(t.get('category','?'), 0) + 1
    print("\n📊 Kategorie:")
    for cat, n in sorted(cats.items(), key=lambda x: -x[1]):
        ok = '✅' if MATURA_CATEGORIES.get(cat, None) is True else '❓'
        print(f"  {ok} {cat}: {n}")
