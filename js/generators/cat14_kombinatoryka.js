// Kategoria 14: Kombinatoryka
// Wzorzec matura 2025 z.10: ile słów/kodów można ułożyć + warunek
// Wzorzec matura 2024 z.9: kombinacje z warunkami
// Wzorzec matura 2023 z.10: permutacje, litery, cyfry
window.cat14 = (() => {
  const M = window.MathUtils;

  const TASKS = [
    // Permutacje liter
    {
      difficulty: 'easy',
      statement:
        'Ile różnych czteroliterowych "słów" (niekoniecznie sensownych) można ułożyć z liter:\n' +
        '$$A,\\ B,\\ C,\\ D$$\n' +
        '(każda litera może wystąpić co najwyżej raz)?\n\nZapisz obliczenia.',
      answer_display: '24',
      answer_val: 24,
      solution: [
        { step: 1, title: 'Permutacja 4 elementów', content: '4! = 4\\cdot3\\cdot2\\cdot1 = 24', explanation: 'Każde ustawienie 4 różnych liter.' }
      ],
      hints: [
        { level: 1, text: 'Liczymy permutacje 4 różnych elementów.' },
        { level: 2, text: '$4! = 4\\cdot3\\cdot2\\cdot1$.' },
        { level: 3, text: '$4! = 24$.' }
      ]
    },
    // Cyfry, bez powtórzeń
    {
      difficulty: 'easy',
      statement:
        'Ile różnych trzycyfrowych liczb naturalnych można zbudować z cyfr:\n' +
        '$$1,\\ 2,\\ 3,\\ 4,\\ 5$$\n' +
        'jeśli każda cyfra może wystąpić co najwyżej raz?\n\nZapisz obliczenia.',
      answer_display: '60',
      answer_val: 60,
      solution: [
        { step: 1, title: 'Permutacje bez powtórzeń', content: 'P(5, 3) = \\frac{5!}{(5-3)!} = 5\\cdot4\\cdot3 = 60', explanation: 'Wybieramy i ustawiamy 3 z 5 cyfr.' }
      ],
      hints: [
        { level: 1, text: 'Oblicz liczbę sposobów: $5$ wyborów pierwszej cyfry, $4$ drugiej, $3$ trzeciej.' },
        { level: 2, text: '$5\\cdot4\\cdot3 = P(5,3)$.' },
        { level: 3, text: '$P(5,3) = 60$.' }
      ]
    },
    // Kombinacje bez powtórzeń
    {
      difficulty: 'medium',
      statement:
        'W drużynie jest 10 zawodników. Trener musi wybrać skład 5-osobowy.\n\n' +
        '**Ile jest możliwych składów pięcioosobowych?** Zapisz obliczenia.',
      answer_display: '252',
      answer_val: 252,
      solution: [
        { step: 1, title: 'Kombinacje', content: '\\binom{10}{5} = \\frac{10!}{5!\\cdot 5!} = \\frac{10\\cdot9\\cdot8\\cdot7\\cdot6}{5\\cdot4\\cdot3\\cdot2\\cdot1} = 252', explanation: 'Kolejność nie ma znaczenia.' }
      ],
      hints: [
        { level: 1, text: 'Kolejność wyboru nie ma znaczenia — używamy kombinacji $\\binom{n}{k}$.' },
        { level: 2, text: '$\\binom{10}{5} = \\frac{10!}{5!5!}$.' },
        { level: 3, text: '$\\binom{10}{5} = 252$.' }
      ]
    },
    // Kombinacje z warunkiem
    {
      difficulty: 'medium',
      statement:
        'Mamy 6 chłopców i 4 dziewczęta. Chcemy wybrać komitet 3-osobowy.\n\n' +
        '**Ile jest komitetów, w których jest dokładnie jedna dziewczynka?** Zapisz obliczenia.',
      answer_display: '60',
      answer_val: 60,
      solution: [
        { step: 1, title: 'Wybór dziewczynki', content: '\\binom{4}{1} = 4', explanation: '1 dziewczynka z 4.' },
        { step: 2, title: 'Wybór chłopców', content: '\\binom{6}{2} = 15', explanation: '2 chłopców z 6.' },
        { step: 3, title: 'Łącznie', content: '4\\cdot 15 = 60', explanation: 'Reguła mnożenia.' }
      ],
      hints: [
        { level: 1, text: 'Wybieramy: 1 dziewczynkę z 4 ORAZ 2 chłopców z 6.' },
        { level: 2, text: '$\\binom{4}{1}\\cdot\\binom{6}{2}$.' },
        { level: 3, text: '$4\\cdot15 = 60$.' }
      ]
    },
    // Kody i hasła
    {
      difficulty: 'medium',
      statement:
        'Czterocyfrowy PIN składa się z cyfr od 0 do 9 (cyfry mogą się powtarzać).\n\n' +
        '**Ile jest czterocyfrowych PINów, w których żadna cyfra nie jest zerem?** Zapisz obliczenia.',
      answer_display: '9^4 = 6561',
      answer_val: 6561,
      solution: [
        { step: 1, title: 'Każda pozycja', content: '\\text{Na każdej z 4 pozycji: 9 wyborów (cyfry 1–9)}', explanation: '' },
        { step: 2, title: 'Łącznie', content: '9^4 = 6561', explanation: 'Reguła mnożenia dla niezależnych wyborów.' }
      ],
      hints: [
        { level: 1, text: 'Cyfry mogą się powtarzać. Na każdej pozycji: 9 możliwości (1–9).' },
        { level: 2, text: '4 niezależne wybory: $9\\cdot9\\cdot9\\cdot9 = 9^4$.' },
        { level: 3, text: '$9^4 = 6561$.' }
      ]
    },
    // Permutacje z warunkiem (litera na początku)
    {
      difficulty: 'hard',
      statement:
        'Ile różnych czteroliterowych "słów" można ułożyć z liter $A, B, C, D, E$ (każda raz),\n' +
        'jeśli słowo musi zaczynać się od litery $A$?\n\nZapisz obliczenia.',
      answer_display: '24',
      answer_val: 24,
      solution: [
        { step: 1, title: 'Pierwsza pozycja', content: '\\text{Ustalona: } A', explanation: '' },
        { step: 2, title: 'Pozostałe 3 pozycje', content: 'P(4,3) = 4\\cdot3\\cdot2 = 24', explanation: '4 litery do rozłożenia na 3 miejsca.' }
      ],
      hints: [
        { level: 1, text: 'Pierwsza litera jest ustalona (A). Pozostałe 3 miejsca — permutacje 4 pozostałych liter.' },
        { level: 2, text: '$P(4,3) = 4\\cdot3\\cdot2 = 24$.' },
        { level: 3, text: 'Odpowiedź: 24.' }
      ]
    },
    // Permutacje z powtórzeniami (anagramy)
    {
      difficulty: 'hard',
      statement:
        'Ile różnych anagramów (niekoniecznie sensownych) można ułożyć ze wszystkich liter słowa $\\text{ALGEBRA}$?\n\n' +
        '(Słowo ALGEBRA zawiera: A, L, G, E, B, R, A — 7 liter, litera A powtarza się 2 razy.)\n\nZapisz obliczenia.',
      answer_display: '\\dfrac{7!}{2!} = 2520',
      answer_val: 2520,
      solution: [
        { step: 1, title: 'Permutacja z powtórzeniami', content: '\\frac{n!}{k_1!\\cdot k_2!\\cdots} = \\frac{7!}{2!}', explanation: '7 liter, litera A powtarza się 2 razy.' },
        { step: 2, title: 'Obliczenie', content: '\\frac{7!}{2!} = \\frac{5040}{2} = 2520', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Wzór: $\\frac{n!}{k_1!\\cdot k_2!\\cdots}$, gdzie $k_i$ — ile razy $i$-ta litera się powtarza.' },
        { level: 2, text: 'ALGEBRA: 7 liter, A powtarza się 2 razy: $\\frac{7!}{2!}$.' },
        { level: 3, text: '$\\frac{5040}{2} = 2520$.' }
      ]
    },
    // Kombinacje z warunkiem "co najmniej k z grupy"
    {
      difficulty: 'hard',
      statement:
        'W komisji konkursowej zasiada 5 mężczyzn i 4 kobiety. ' +
        'Wybieramy 4-osobowy podkomitet.\n\n' +
        '**Ile jest sposobów wyboru, jeśli podkomitet musi zawierać co najmniej 2 kobiety?** Zapisz obliczenia.',
      answer_display: '81',
      answer_val: 81,
      solution: [
        { step: 1, title: 'Przypadek: dokładnie 2 kobiety', content: '\\binom{4}{2}\\cdot\\binom{5}{2} = 6\\cdot10 = 60', explanation: '2 kobiety z 4, 2 mężczyzn z 5.' },
        { step: 2, title: 'Przypadek: dokładnie 3 kobiety', content: '\\binom{4}{3}\\cdot\\binom{5}{1} = 4\\cdot5 = 20', explanation: '' },
        { step: 3, title: 'Przypadek: dokładnie 4 kobiety', content: '\\binom{4}{4}\\cdot\\binom{5}{0} = 1\\cdot1 = 1', explanation: '' },
        { step: 4, title: 'Łącznie', content: '60+20+1 = 81', explanation: 'Reguła sumy (przypadki rozłączne).' }
      ],
      hints: [
        { level: 1, text: 'Rozdziel na przypadki: dokładnie 2, 3 lub 4 kobiety w podkomitecie.' },
        { level: 2, text: '$\\binom{4}{2}\\binom{5}{2}+\\binom{4}{3}\\binom{5}{1}+\\binom{4}{4}\\binom{5}{0}$.' },
        { level: 3, text: '$60+20+1=81$.' }
      ]
    },
    // Parzyste czterocyfrowe liczby
    {
      difficulty: 'hard',
      statement:
        'Ile czterocyfrowych liczb parzystych można ułożyć z cyfr $1, 2, 3, 4, 5, 6$, ' +
        'jeśli każda cyfra może wystąpić co najwyżej raz?\n\nZapisz obliczenia.',
      answer_display: '180',
      answer_val: 180,
      solution: [
        { step: 1, title: 'Ostatnia cyfra (parzysta)', content: '\\text{Cyfry parzyste: } 2, 4, 6 \\implies 3 \\text{ możliwości}', explanation: 'Liczba parzysta kończy się na parzystej cyfrze.' },
        { step: 2, title: 'Pozostałe 3 pozycje', content: 'P(5,3) = 5\\cdot4\\cdot3 = 60', explanation: 'Z pozostałych 5 cyfr układamy 3 na 3 pozycjach.' },
        { step: 3, title: 'Łącznie', content: '3\\cdot60 = 180', explanation: 'Reguła mnożenia.' }
      ],
      hints: [
        { level: 1, text: 'Parzysta liczba: ostatnia cyfra musi być 2, 4 lub 6.' },
        { level: 2, text: 'Ustal ostatnią cyfrę (3 opcje), potem ułóż 3 z pozostałych 5: $P(5,3) = 60$.' },
        { level: 3, text: '$3\\cdot60 = 180$.' }
      ]
    },
    // Permutacje cykliczne
    {
      difficulty: 'hard',
      statement:
        'Przy okrągłym stole zasiada 6 gości.\n\n' +
        '**Ile jest różnych ustawień**, jeśli przyjmujemy, że dwa ustawienia są takie same, gdy jedno można ' +
        'obrócić do drugiego?\n\nZapisz obliczenia.',
      answer_display: '(6-1)! = 5! = 120',
      answer_val: 120,
      solution: [
        { step: 1, title: 'Permutacje cykliczne', content: '\\text{Liczba permutacji cyklicznych }n\\text{ elementów} = (n-1)!', explanation: 'Ustalamy jedną osobę jako punkt odniesienia. Pozostałe $n-1$ ustawiamy dowolnie.' },
        { step: 2, title: 'Obliczenie', content: '(6-1)! = 5! = 5\\cdot4\\cdot3\\cdot2\\cdot1 = 120', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Przy stole okrągłym jedna osoba może być ustalona na stałe (punkt odniesienia).' },
        { level: 2, text: 'Permutacje cykliczne $n$ elementów: $(n-1)!$.' },
        { level: 3, text: '$(6-1)! = 5! = 120$.' }
      ]
    },
    // Kombinacje z podziałem
    {
      difficulty: 'hard',
      statement:
        'Ze zbioru $\\{1, 2, 3, 4, 5, 6, 7, 8\\}$ losujemy bez zwracania 3 elementy.\n\n' +
        '**Ile jest takich trójek, w których suma elementów jest parzysta?** Zapisz obliczenia.',
      answer_display: '28',
      answer_val: 28,
      solution: [
        { step: 1, title: 'Liczby parzyste i nieparzyste', content: '\\text{Parzyste: } \\{2,4,6,8\\}\\text{ — 4 szt.}\\\\ \\text{Nieparzyste: }\\{1,3,5,7\\}\\text{ — 4 szt.}', explanation: '' },
        { step: 2, title: 'Warunek sumy parzystej', content: '\\text{Suma 3 liczb parzysta} \\iff \\text{albo 3 parzyste, albo 1 parzysta i 2 nieparzyste}', explanation: '' },
        { step: 3, title: 'Przypadek 1: 3 parzyste', content: '\\binom{4}{3} = 4', explanation: '' },
        { step: 4, title: 'Przypadek 2: 1 parzysta + 2 nieparzyste', content: '\\binom{4}{1}\\cdot\\binom{4}{2} = 4\\cdot6 = 24', explanation: '' },
        { step: 5, title: 'Łącznie', content: '4 + 24 = 28', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Podziel na przypadki wg parzystości: suma parzysta ⟺ albo 3 parzyste, albo 1 parzysta + 2 nieparzyste.' },
        { level: 2, text: 'Ile liczb parzystych? Ile nieparzystych? $\\binom{4}{3}$ i $\\binom{4}{1}\\cdot\\binom{4}{2}$.' },
        { level: 3, text: '$4 + 24 = 28$.' }
      ]
    }
  ];

  // Generator parametryczny: kombinacje/permutacje z prostymi liczbami
  function simpleCount() {
    const n = M.choose([6,7,8,9,10]);
    const k = M.choose([2,3,4]);
    if (k >= n) return simpleCount();

    const type = M.choose(['combinations', 'permutations']);
    const ans = type === 'combinations' ? M.combinations(n, k) : M.permutations(n, k);
    const formulaStr = type === 'combinations'
      ? `\\binom{${n}}{${k}} = \\frac{${n}!}{${k}!\\cdot${n-k}!}`
      : `P(${n},${k}) = \\frac{${n}!}{(${n}-${k})!}`;

    return {
      id: M.makeId('cat14_count'),
      category: 14,
      categoryName: 'Kombinatoryka',
      type: type,
      points: 4,
      params: { n, k, ans },
      statement: type === 'combinations'
        ? `Ze zbioru $${n}$-elementowego wybieramy $${k}$-elementowe podzbiory.\n\n**Ile jest takich podzbiorów?** Zapisz obliczenia.`
        : `Z ${n} różnych przedmiotów układamy ${k}-elementowe ciągi (kolejność ma znaczenie, bez powtórzeń).\n\n**Ile jest takich ciągów?** Zapisz obliczenia.`,
      answer: {
        type: 'number',
        value: ans,
        display: String(ans),
        description: `$${formulaStr} = ${ans}$`
      },
      hints: [
        { level: 1, text: type === 'combinations'
          ? `Kolejność nie ma znaczenia — kombinacje: $\\binom{n}{k}$.`
          : `Kolejność ma znaczenie — permutacje bez powtórzeń: $P(n,k)$.` },
        { level: 2, text: `$${formulaStr}$.` },
        { level: 3, text: `Wynik: $${ans}$.` }
      ],
      solution: [
        { step: 1, title: 'Wzór', content: formulaStr, explanation: type === 'combinations' ? 'Kolejność nie ma znaczenia.' : 'Kolejność ma znaczenie.' },
        { step: 2, title: 'Obliczenie', content: `${formulaStr} = ${ans}`, explanation: '' }
      ]
    };
  }

  function generate() {
    // simpleCount usunięty — "ile jest C(n,k) podzbiorów" to poziom zadania zamkniętego
    const pool = TASKS.filter(t => t.difficulty === 'hard');
    const task = M.choose(pool.length > 0 ? pool : TASKS);
    return {
      id: M.makeId('cat14'),
      category: 14,
      categoryName: 'Kombinatoryka',
      type: 'combinatorics',
      points: 4,
      params: {},
      statement: task.statement,
      answer: {
        type: 'number',
        value: task.answer_val,
        display: task.answer_display,
        description: `Odpowiedź: $${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  return { generate };
})();
