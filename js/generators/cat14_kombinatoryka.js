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
  function simpleCount(diff) {
    const n = M.choose(diff === 'easy' ? [4,5,6] : [6,7,8,9,10]);
    const k = M.choose(diff === 'easy' ? [2,3] : [2,3,4]);
    if (k >= n) return simpleCount(diff);

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
      difficulty: diff,
      points: 3,
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

  function generate(diff = 'medium') {
    if (Math.random() < 0.4) return simpleCount(diff);
    const pool = TASKS.filter(t => t.difficulty === diff);
    const task = M.choose(pool.length > 0 ? pool : TASKS);
    return {
      id: M.makeId('cat14'),
      category: 14,
      categoryName: 'Kombinatoryka',
      type: 'combinatorics',
      difficulty: diff,
      points: diff === 'easy' ? 3 : 4,
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

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
