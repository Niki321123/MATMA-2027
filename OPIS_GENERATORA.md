# Jak działa generator zadań

## 1. Dwa niezależne źródła zadań

Aplikacja ma dwa różne tryby pracy:

- **Zadania z matur** — ładuje stałe zadania z arkuszy CKE z pliku `js/data/matura_tasks.js`. To są zadania przepisane z PDF-ów.
- **Generator zadań** — tworzy nowe zadania na podstawie schematów zapisanych w plikach `js/generators/cat01_...js` do `cat15_...js`.

Te tryby nie mieszają danych. Zadanie maturalne jest odtworzeniem arkusza, a zadanie z generatora jest nową wersją z podobnego typu.

## 2. Czym jest schemat zadania

Schemat to funkcja, która zna typ zadania, np.:

- granica ciągu,
- logarytmy,
- styczna do wykresu,
- dowód nierówności,
- równanie trygonometryczne,
- stereometria,
- parametr w równaniu kwadratowym.

Schemat robi cztery rzeczy:

1. Losuje parametry zadania.
2. Układa treść zadania z tych parametrów.
3. Oblicza poprawną odpowiedź.
4. Tworzy wskazówki i rozwiązanie krok po kroku.

Przykład: schemat stycznej losuje funkcję, punkt styczności, liczy pochodną, współczynnik kierunkowy i wyraz wolny prostej stycznej.

## 3. Dlaczego generator używa „ładnych” liczb

Generator nie losuje całkiem przypadkowych liczb, bo wtedy często powstawałyby brzydkie wyniki, np. długie ułamki albo pierwiastki bez sensu maturalnego.

Za to odpowiada `js/core/MathUtils.js`. Są tam m.in.:

- pule małych liczb dla poziomów `easy`, `medium`, `hard`,
- skracanie ułamków,
- generowanie trójmianu z zadanych pierwiastków,
- gotowe wartości trygonometryczne,
- trójki pitagorejskie,
- mechanizm ponawiania losowania, jeśli wynik jest zbyt brzydki.

Czyli generator często działa „od wyniku do treści”: najpierw dobiera takie dane, żeby rozwiązanie było sensowne, a dopiero potem buduje zadanie.

## 4. Poziomy trudności

Każdy generator może obsługiwać poziomy:

- `easy` — krótsze obliczenia, prostsze liczby,
- `medium` — poziom najbliższy typowemu zadaniu maturalnemu,
- `hard` — więcej przypadków, parametrów albo dłuższy rachunek.

Poziom trudności wpływa głównie na dobór liczb i wariantu schematu, a nie na sam dział.

## 5. Rejestr generatorów

Plik `js/generators/index.js` łączy działy z konkretnymi generatorami.

Gdy wybierasz kategorię w aplikacji, aplikacja wywołuje:

```js
Generators.generate(categoryId, difficulty)
```

Rejestr znajduje właściwy plik kategorii, np. `cat07_ciagi.js`, i uruchamia jego funkcję `generate`.

## 6. Symulacja matury

Tryb **Symulacja matury** nie bierze gotowego arkusza CKE. On losuje pełny zestaw z generatorów.

Aplikacja wybiera kategorie typowe dla rozszerzonej matury, generuje po jednym zadaniu z wybranych działów i pokazuje je jako arkusz treningowy. Dzięki temu można ćwiczyć układ podobny do matury, ale na nowych danych.

## 7. Różnica między „zadaniem z matury” a „zadaniem ze schematu”

Zadanie z matury:

- ma stałą treść,
- pochodzi z konkretnego roku i numeru,
- powinno wyglądać jak w arkuszu CKE.

Zadanie ze schematu:

- jest nowe za każdym losowaniem,
- zachowuje typ zadania,
- ma inne liczby i czasem inny wariant,
- ma automatycznie utworzoną odpowiedź, wskazówki i rozwiązanie.

