import requests
from bs4 import BeautifulSoup
import sys
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
r = requests.get('https://zadania.info/d1/1001018', headers=headers, timeout=15)
soup = BeautifulSoup(r.content, 'html.parser', from_encoding='utf-8')

# Sprawdz alt atrybuty obrazkow matematycznych
imgs = soup.find_all('img')
print(f'Wszystkie obrazki: {len(imgs)}')
for img in imgs[:20]:
    alt = img.get('alt', '')
    src = img.get('src', '')
    cls = img.get('class', [])
    if 'zadania.info' in src or 'latex' in str(cls):
        print(f'  alt=[{alt}] cls={cls} src=...{src[-40:]}')
