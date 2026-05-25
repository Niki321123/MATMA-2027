"""
Regeneruje js/data/zadania_info_tasks.js z istniejącego cache_tasks.json
Uruchom po aktualizacji write_js_file w scrape_zadania_info.py
"""
import sys, json
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from scrape_zadania_info import (
    write_js_file, guess_category, CACHE_FILE, BASE_URL
)
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Wczytaj cache
with open(CACHE_FILE, encoding='utf-8') as f:
    cache = json.load(f)

print(f'Cache: {len(cache)} zadań')

# Odbuduj listę zadań ze scraping cache
# cache format: { task_id: { statement_full, solution } }
tasks = []
for tid, data in cache.items():
    stmt = data.get('statement_full', '')
    cat = guess_category(stmt)
    tasks.append({
        'id': tid,
        'source_url': f'{BASE_URL}/d1/{tid}',
        'statement': stmt,
        'solution': data.get('solution', ''),
        'category': cat,
        'year': None,        # brak roku w cache — do poprawy jeśli trzeba
        'exam_source': '',
        'difficulty': 'sredni',
    })

print(f'Zadań do zapisu: {len(tasks)}')
write_js_file(tasks)

# Podsumowanie kategorii
cats = {}
for t in tasks:
    cats[t['category']] = cats.get(t['category'], 0) + 1
print('\nKategorie:')
for cat, n in sorted(cats.items(), key=lambda x: -x[1]):
    print(f'  {cat}: {n}')
