"""
Scraper zadania.info — matura rozszerzona, poziom średni i trudny
URL: https://zadania.info/d1/1/5_3_1_0_0_f5/{strona}

Pobiera zadania i rozwiązania, zapisuje do js/data/zadania_info_tasks.js
"""
import sys
import time
import json
import re
import requests
from bs4 import BeautifulSoup
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "https://zadania.info"
LIST_URL = BASE_URL + "/d1/1/5_3_1_0_0_f5/{page}"
TASK_URL = BASE_URL + "/d1/{task_id}"
OUTPUT_FILE = Path(__file__).parent.parent / "js" / "data" / "zadania_info_tasks.js"
CACHE_FILE = Path(__file__).parent / "cache_tasks.json"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0',
    'Accept-Language': 'pl-PL,pl;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

DELAY_LIST = 1.5   # sekund między stronami listy
DELAY_TASK = 1.0   # sekund między poszczególnymi zadaniami
TOTAL_PAGES = 35


# ── Mapowanie kategorii ────────────────────────────────────────────────────────
CATEGORY_MAP = {
    'prawdopodobieństwo': 'Prawdopodobieństwo',
    'kombinatoryk': 'Kombinatoryka',
    'ciąg': 'Ciągi',
    'ciag': 'Ciągi',
    'trygonometri': 'Trygonometria',
    'funkcj': 'Funkcje',
    'równanie': 'Równania i nierówności',
    'rownan': 'Równania i nierówności',
    'nierówno': 'Równania i nierówności',
    'nierowno': 'Równania i nierówności',
    'geometri': 'Geometria',
    'planimetri': 'Planimetria',
    'stereometri': 'Stereometria',
    'analityczn': 'Geometria analityczna',
    'logarytm': 'Logarytmy',
    'potęg': 'Potęgi i pierwiastki',
    'poteg': 'Potęgi i pierwiastki',
    'pierwiastk': 'Potęgi i pierwiastki',
    'wielomian': 'Wielomiany',
    'granica': 'Granice i ciągłość',
    'pochodn': 'Pochodne',
    'całk': 'Całki',
    'statystyk': 'Statystyka',
    'optymalizacj': 'Optymalizacja',
    'dowód': 'Dowody',
    'dowod': 'Dowody',
    'liczb': 'Liczby',
}

def guess_category(text: str) -> str:
    """Heurystyczne rozpoznanie kategorii na podstawie treści."""
    t = text.lower()
    for keyword, cat in CATEGORY_MAP.items():
        if keyword in t:
            return cat
    return 'Inne'


# ── Parsowanie ─────────────────────────────────────────────────────────────────
def extract_text_with_math(element) -> str:
    """Zwróć tekst elementu, wstawiając alt text obrazków jako [formuła]."""
    parts = []
    for child in element.children:
        if hasattr(child, 'name') and child.name == 'img':
            alt = child.get('alt', '').strip()
            if alt:
                parts.append(f' [{alt}] ')
        elif hasattr(child, 'children'):
            parts.append(extract_text_with_math(child))
        else:
            parts.append(str(child))
    text = ''.join(parts)
    # Cleanup: wielokrotne spacje/newlines
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def parse_list_page(html: str) -> list[dict]:
    """Parsuj stronę listy zadań, zwróć listę {id, statement, year, difficulty}."""
    soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')
    tasks = []

    boxes = soup.find_all('div', class_='doc-box__inner')
    for box in boxes:
        task = {}

        # Treść zadania
        src = box.find('div', class_='doc-box__src')
        if src:
            task['statement'] = extract_text_with_math(src)
        else:
            continue

        # ID zadania i link do rozwiązania
        sol_link = box.find('a', href=lambda h: h and re.match(r'^/d1/\d+$', h))
        if sol_link:
            task['id'] = sol_link['href'].split('/')[-1]
            task['source_url'] = BASE_URL + sol_link['href']
        else:
            continue

        # Źródło egzaminu / rok
        exam_link = box.find('a', href=lambda h: h and '/d916/' in str(h))
        if exam_link:
            task['exam_source'] = exam_link.get_text(strip=True)
            year_match = re.search(r'(\d{4})', task['exam_source'])
            task['year'] = int(year_match.group(1)) if year_match else None
        else:
            task['exam_source'] = ''
            task['year'] = None

        # Trudność (liczba gwiazdek)
        diff_div = box.find('div', class_='ex__diff')
        if diff_div:
            stars = diff_div.find_all('span', class_=lambda c: c and 'star' in str(c).lower())
            hard_stars = diff_div.find('div', class_='ex__diff--h')
            med_stars = diff_div.find('div', class_='ex__diff--m')
            if hard_stars:
                task['difficulty'] = 'trudny'
            elif med_stars:
                task['difficulty'] = 'sredni'
            else:
                task['difficulty'] = 'sredni'
        else:
            task['difficulty'] = 'sredni'

        # Kategoria – heurystyka
        task['category'] = guess_category(task['statement'])

        tasks.append(task)

    return tasks


def parse_task_page(html: str) -> dict:
    """Parsuj stronę indywidualnego zadania, zwróć {statement, solution}."""
    soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')
    boxes = soup.find_all('div', class_='article-dbl-box__content')

    result = {}
    if len(boxes) >= 1:
        result['statement'] = extract_text_with_math(boxes[0])
    if len(boxes) >= 2:
        result['solution'] = extract_text_with_math(boxes[1])

    # Kategoria z bocznego panelu lub breadcrumb
    aside = soup.find('aside') or soup.find('div', class_=lambda c: c and 'sidebar' in str(c))
    if aside:
        cat_links = aside.find_all('a', href=True)
        for lnk in cat_links:
            href = lnk.get('href', '')
            if '/d1/' in href and lnk.get_text(strip=True):
                txt = lnk.get_text(strip=True)
                if txt and txt not in ('Szkoła średnia',):
                    result['category_hint'] = txt
                    break

    return result


# ── Sieć ──────────────────────────────────────────────────────────────────────
session = requests.Session()
session.headers.update(HEADERS)

def fetch(url: str, retries=3) -> str | None:
    for attempt in range(retries):
        try:
            r = session.get(url, timeout=20)
            if r.status_code == 200:
                return r.content  # bytes — BeautifulSoup obsłuży encoding
            elif r.status_code == 429:
                print(f"  Rate limit! Czekam 30s... ({url})")
                time.sleep(30)
            else:
                print(f"  HTTP {r.status_code} dla {url}")
                return None
        except Exception as e:
            print(f"  Błąd: {e}, próba {attempt+1}/{retries}")
            time.sleep(5 * (attempt + 1))
    return None


# ── Główna logika ──────────────────────────────────────────────────────────────
def run(pages_to_scrape=None, fetch_solutions=True, max_tasks=None):
    pages = pages_to_scrape or list(range(1, TOTAL_PAGES + 1))

    # Załaduj cache
    cache = {}
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding='utf-8') as f:
            cache = json.load(f)
        print(f"Cache: {len(cache)} zadań wczytanych")

    all_tasks_meta = []  # meta z list page

    # Faza 1: Scraping list pages
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

    # Faza 2: Scraping stron indywidualnych (rozwiązania)
    if fetch_solutions:
        print(f"\n=== FAZA 2: Pobieranie rozwiązań ===")
        for i, task in enumerate(all_tasks_meta):
            task_id = task['id']

            if max_tasks and i >= max_tasks:
                print(f"Osiągnięto limit {max_tasks} zadań")
                break

            if task_id in cache:
                # Użyj cache
                cached = cache[task_id]
                if 'solution' in cached:
                    task['solution'] = cached['solution']
                if 'statement_full' in cached:
                    task['statement'] = cached['statement_full']
                continue

            url = TASK_URL.format(task_id=task_id)
            print(f"  [{i+1}/{len(all_tasks_meta)}] Zadanie {task_id}...")

            html = fetch(url)
            if html:
                detail = parse_task_page(html)
                if 'statement' in detail:
                    task['statement'] = detail['statement']
                if 'solution' in detail:
                    task['solution'] = detail['solution']
                if 'category_hint' in detail:
                    task['category'] = guess_category(detail['category_hint']) or task['category']

                # Zapisz do cache
                cache[task_id] = {
                    'statement_full': task.get('statement', ''),
                    'solution': task.get('solution', ''),
                }
                # Zapisuj cache co 20 zadań
                if i % 20 == 0:
                    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                        json.dump(cache, f, ensure_ascii=False, indent=2)

            time.sleep(DELAY_TASK)

        # Zapisz finalne cache
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)

    return all_tasks_meta


def to_js_format(tasks: list[dict]) -> list[dict]:
    """Konwertuj do formatu aplikacji."""
    result = []
    for t in tasks:
        task_id = t.get('id', '')
        year = t.get('year')
        cat = t.get('category', 'Inne')

        js_task = {
            'id': f"zi_{task_id}",
            'source': 'zadania.info',
            'source_id': task_id,
            'source_url': t.get('source_url', f"https://zadania.info/d1/{task_id}"),
            'year': year,
            'exam_source': t.get('exam_source', ''),
            'difficulty': t.get('difficulty', 'sredni'),
            'category': cat,
            'statement': t.get('statement', ''),
            'solution': t.get('solution', ''),
            'answer': {
                'type': 'open',
                'display': 'Sprawdź rozwiązanie na zadania.info',
                'description': f"Pełne rozwiązanie: https://zadania.info/d1/{task_id}",
            },
            'hints': [
                {'level': 1, 'text': 'Przeanalizuj treść zadania i zidentyfikuj co szukamy.'},
                {'level': 2, 'text': f'Dział: {cat}. Przypomnij sobie wzory i metody z tego działu.'},
                {'level': 3, 'text': f'Pełne rozwiązanie: https://zadania.info/d1/{task_id}'},
            ],
        }
        result.append(js_task)
    return result


def write_js_file(tasks: list[dict]):
    js_tasks = to_js_format(tasks)
    tasks_json = json.dumps(js_tasks, ensure_ascii=False, indent=2)

    js_content = f"""// Zadania z zadania.info — matura rozszerzona, poziom średni i trudny
// Źródło: https://zadania.info/d1/1/5_3_1_0_0_f5
// Wygenerowano automatycznie przez scraper. Zadań: {len(js_tasks)}
// UWAGA: Treści i rozwiązania są własnością zadania.info

window.ZadaniaInfoTasks = (() => {{
  const TASKS = {tasks_json};

  // Mapowanie kategorii -> ikona + krótka nazwa (spójne z app.js)
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
    'Pochodne':               {{ icon: '∂',  id: 'zi_poch' }},
    'Całki':                  {{ icon: '∫',  id: 'zi_calk' }},
    'Statystyka':             {{ icon: '📉', id: 'zi_stat' }},
    'Optymalizacja':          {{ icon: '🎯', id: 'zi_opt'  }},
    'Dowody':                 {{ icon: '✏️', id: 'zi_dow'  }},
    'Inne':                   {{ icon: '❓', id: 'zi_inne' }},
  }};

  function rand(arr) {{ return arr[Math.floor(Math.random() * arr.length)]; }}

  // Konwersja do formatu displayTask()
  function asTask(raw) {{
    if (!raw) return null;
    const meta = CAT_META[raw.category] || {{ icon: '❓', id: 'zi_inne' }};
    return {{
      id:           raw.id,
      source:       'zadania.info',
      source_url:   raw.source_url,
      year:         raw.year,
      number:       raw.source_id,
      exam_source:  raw.exam_source,
      categoryId:   meta.id,
      categoryName: raw.category,
      points:       4,
      difficulty:   raw.difficulty,
      statement:    raw.statement,
      solution_raw: raw.solution,
      answer:       raw.answer,
      hints:        raw.hints,
      type:         'open',
    }};
  }}

  return {{
    // API kompatybilne z CKE / MaturaTasks
    getAll:        () => TASKS,
    getById:       (id) => TASKS.find(t => t.id === id || t.source_id === id),
    getByYear:     (year) => TASKS.filter(t => t.year === year),
    getYears:      () => [...new Set(TASKS.map(t => t.year).filter(Boolean))].sort(),
    random:        () => rand(TASKS),
    randomByYear:  (year) => {{ const f = TASKS.filter(t => t.year === year); return rand(f); }},
    asTask,

    // Dodatkowe
    getByCategory:     (cat) => TASKS.filter(t => t.category === cat),
    getRandomByCategory:(cat) => {{ const f = TASKS.filter(t => t.category === cat); return rand(f); }},
    count:         () => TASKS.length,
    categories:    () => [...new Set(TASKS.map(t => t.category))].sort(),
    catMeta:       (cat) => CAT_META[cat] || {{ icon: '❓', id: 'zi_inne' }},
  }};
}})();
"""
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"\n✅ Zapisano {len(js_tasks)} zadań do: {OUTPUT_FILE}")


# ── Uruchomienie ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Scraper zadania.info')
    parser.add_argument('--pages', type=int, nargs='+', help='Numery stron do scrapingu (domyślnie 1-35)')
    parser.add_argument('--no-solutions', action='store_true', help='Nie pobieraj stron indywidualnych')
    parser.add_argument('--max-tasks', type=int, help='Maksymalna liczba zadań (do testów)')
    parser.add_argument('--test', action='store_true', help='Tryb testowy: tylko strona 1, max 5 zadań')
    args = parser.parse_args()

    if args.test:
        pages = [1]
        fetch_solutions = True
        max_tasks = 5
    else:
        pages = args.pages  # None = wszystkie strony
        fetch_solutions = not args.no_solutions
        max_tasks = args.max_tasks

    tasks = run(
        pages_to_scrape=pages,
        fetch_solutions=fetch_solutions,
        max_tasks=max_tasks,
    )

    write_js_file(tasks)

    # Podsumowanie
    print(f"\n📊 Podsumowanie:")
    print(f"  Zadań razem: {len(tasks)}")
    cats = {}
    for t in tasks:
        cats[t.get('category','?')] = cats.get(t.get('category','?'), 0) + 1
    for cat, count in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")
