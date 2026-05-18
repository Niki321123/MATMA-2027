// Kategoria 13: Prawdopodobieństwo i schemat Bernoulliego
// Wzorzec matura 2025 z.12: Schemat Bernoulliego, P(X=k), warunkowe
// Wzorzec matura 2024 z.12: Prawdopodobieństwo warunkowe
// Wzorzec matura 2023 z.12: Schemat Bernoulliego 4 próby
window.cat13 = (() => {
  const M = window.MathUtils;

  // === Schemat Bernoulliego ===
  function bernoulli(diff) {
    // n prób, prawdopodobieństwo sukcesu p = p_num/p_den
    const configs = diff === 'easy'
      ? [
          { n: 3, p_num: 1, p_den: 2, contexts: ['rząd trafień', 'orłów', 'szóstek'] },
          { n: 4, p_num: 1, p_den: 2, contexts: ['orłów', 'trafień'] },
          { n: 3, p_num: 1, p_den: 3, contexts: ['sukcesów'] }
        ]
      : [
          { n: 4, p_num: 1, p_den: 3, contexts: ['sukcesów'] },
          { n: 5, p_num: 1, p_den: 2, contexts: ['orłów'] },
          { n: 4, p_num: 2, p_den: 5, contexts: ['trafień'] },
          { n: 6, p_num: 1, p_den: 3, contexts: ['sukcesów'] },
          { n: 3, p_num: 2, p_den: 3, contexts: ['sukcesów'] }
        ];

    const cfg = M.choose(configs);
    const { n, p_num, p_den } = cfg;
    const context = M.choose(cfg.contexts);
    const q_num = p_den - p_num;

    // k = dokładnie k sukcesów
    const k = M.choose(diff === 'easy' ? [1, 2] : [1, 2, 3]);
    if (k > n) return bernoulli(diff);

    const Cnk = M.combinations(n, k);
    // P(X=k) = C(n,k) * p^k * q^(n-k)
    // Wynik jako ułamek
    const prob_num = Cnk * Math.pow(p_num, k) * Math.pow(q_num, n - k);
    const prob_den = Math.pow(p_den, n);
    const { num: pn, den: pd } = M.simplifyFraction(prob_num, prob_den);
    const prob_display = M.latexFrac(pn, pd);

    const p_display = M.latexFrac(p_num, p_den);
    const q_display = M.latexFrac(q_num, p_den);

    // Kontekst: rzut monetą, losowanie, loteria
    const scenarios = [
      {
        intro: `Rzucamy symetryczną monetą ${n} razy. Prawdopodobieństwo wypadnięcia orła wynosi $${p_display}$.`,
        event: `dokładnie ${k} ${context}`
      },
      {
        intro: `W doświadczeniu losowym prawdopodobieństwo sukcesu wynosi $${p_display}$. Doświadczenie powtarzamy ${n} razy niezależnie.`,
        event: `dokładnie ${k} ${context}`
      },
      {
        intro: `Strzelec trafia w tarczę z prawdopodobieństwem $${p_display}$. Oddaje ${n} strzałów.`,
        event: `dokładnie ${k} trafień`
      }
    ];
    const scenario = M.choose(scenarios);

    return {
      id: M.makeId('cat13_bernoulli'),
      category: 13,
      categoryName: 'Prawdopodobieństwo',
      type: 'bernoulli',
      difficulty: diff,
      points: 4,
      params: { n, p_num, p_den, k, Cnk, prob_num, prob_den },
      statement:
        `${scenario.intro}\n\n` +
        `**Oblicz prawdopodobieństwo, że zajdzie ${scenario.event}.** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: prob_display,
        description: `$P(X = ${k}) = ${prob_display}$`
      },
      hints: [
        { level: 1, text: `Schemat Bernoulliego: $P(X=k) = \\binom{n}{k}\\cdot p^k\\cdot(1-p)^{n-k}$.` },
        { level: 2, text: `$n = ${n}$, $k = ${k}$, $p = ${p_display}$, $q = 1-p = ${q_display}$. Oblicz $\\binom{${n}}{${k}} = ${Cnk}$.` },
        { level: 3, text: `$P(X=${k}) = ${Cnk}\\cdot\\left(${p_display}\\right)^{${k}}\\cdot\\left(${q_display}\\right)^{${n-k}} = ${prob_display}$.` }
      ],
      solution: [
        { step: 1, title: 'Model', content: `X \\sim B(${n},\\ ${p_display})$ — schemat Bernoulliego ($n=${n}$ prób, $p=${p_display}$).`, explanation: '' },
        { step: 2, title: 'Wzór', content: `P(X=${k}) = \\binom{${n}}{${k}}\\cdot\\left(${p_display}\\right)^{${k}}\\cdot\\left(${q_display}\\right)^{${n-k}}`, explanation: '' },
        { step: 3, title: 'Obliczenie', content: `= ${Cnk}\\cdot\\frac{${Math.pow(p_num,k)}}{${Math.pow(p_den,k)}}\\cdot\\frac{${Math.pow(q_num,n-k)}}{${Math.pow(p_den,n-k)}} = \\frac{${prob_num}}{${prob_den}} = ${prob_display}`, explanation: '' }
      ]
    };
  }

  // === Prawdopodobieństwo warunkowe ===
  function conditional(diff) {
    // Dwa zdarzenia A, B z podanym P(A), P(B), P(A∩B)
    // P(A|B) = P(A∩B)/P(B)
    const TASKS = [
      {
        difficulty: 'easy',
        statement:
          'W klasie jest 30 uczniów: 18 chłopców i 12 dziewcząt. ' +
          'Spośród chłopców 6 należy do koła matematycznego, ' +
          'a spośród dziewcząt 4 należą do koła matematycznego.\n\n' +
          'Losujemy jednego ucznia. Zdarzenie $A$ — wylosowany uczeń należy do koła matematycznego.\n\n' +
          '**Oblicz $P(A)$.** Zapisz obliczenia.',
        answer_display: '\\dfrac{1}{3}',
        answer_val: 1/3,
        solution: [
          { step: 1, title: 'Liczba uczniów z koła', content: '6 + 4 = 10', explanation: '' },
          { step: 2, title: 'Prawdopodobieństwo', content: 'P(A) = \\frac{10}{30} = \\frac{1}{3}', explanation: '' }
        ],
        hints: [
          { level: 1, text: 'Ile uczniów łącznie należy do koła matematycznego?' },
          { level: 2, text: '$P(A) = \\frac{\\text{liczba uczniów z koła}}{\\text{liczba wszystkich uczniów}}$.' },
          { level: 3, text: '$P(A) = \\frac{10}{30} = \\frac{1}{3}$.' }
        ]
      },
      {
        difficulty: 'medium',
        statement:
          'Rzucamy dwukrotnie kostką sześcienną (o ściankach 1–6).\n\n' +
          'Zdarzenie $A$: suma oczek jest równa 7.\n' +
          'Zdarzenie $B$: na pierwszej kostce wypadło 4.\n\n' +
          '**Oblicz $P(A|B)$ — prawdopodobieństwo warunkowe zdarzenia $A$ pod warunkiem $B$.** Zapisz obliczenia.',
        answer_display: '\\dfrac{1}{6}',
        answer_val: 1/6,
        solution: [
          { step: 1, title: 'P(B)', content: 'P(B) = \\frac{6}{36} = \\frac{1}{6}', explanation: 'Pierwsze 4, drugie dowolne: 6 przypadków z 36.' },
          { step: 2, title: 'P(A∩B)', content: 'A \\cap B\\text{: pierwsza = 4, suma = 7} \\implies \\text{druga = 3. Jeden przypadek.}\\\\ P(A\\cap B) = \\frac{1}{36}', explanation: '' },
          { step: 3, title: 'Prawdopodobieństwo warunkowe', content: 'P(A|B) = \\frac{P(A\\cap B)}{P(B)} = \\frac{1/36}{1/6} = \\frac{1}{6}', explanation: '' }
        ],
        hints: [
          { level: 1, text: '$P(A|B) = \\frac{P(A\\cap B)}{P(B)}$.' },
          { level: 2, text: 'Jeśli pierwsza kostka = 4, to druga musi = 3, żeby suma = 7.' },
          { level: 3, text: '$P(A|B) = \\frac{1/36}{6/36} = \\frac{1}{6}$.' }
        ]
      },
      {
        difficulty: 'medium',
        statement:
          'W urnie jest 5 kul białych i 3 czarne. Losujemy kolejno dwie kule bez zwracania.\n\n' +
          '**Oblicz prawdopodobieństwo, że obie wylosowane kule są białe.** Zapisz obliczenia.',
        answer_display: '\\dfrac{5}{14}',
        answer_val: 5/14,
        solution: [
          { step: 1, title: 'Całkowita liczba wyników', content: '\\binom{8}{2} = 28', explanation: '' },
          { step: 2, title: 'Liczba korzystnych wyników', content: '\\binom{5}{2} = 10', explanation: 'Obie kule białe: wybieramy 2 z 5.' },
          { step: 3, title: 'Prawdopodobieństwo', content: 'P = \\frac{10}{28} = \\frac{5}{14}', explanation: '' }
        ],
        hints: [
          { level: 1, text: 'Zastosuj metodę kombinatoryczną: $P = \\frac{\\text{liczba korzystnych}}{\\text{liczba wszystkich}}$.' },
          { level: 2, text: 'Wszystkich sposobów wyboru 2 kul z 8: $\\binom{8}{2}$.' },
          { level: 3, text: '$P = \\frac{\\binom{5}{2}}{\\binom{8}{2}} = \\frac{10}{28} = \\frac{5}{14}$.' }
        ]
      },
      {
        difficulty: 'hard',
        statement:
          'Dane są zdarzenia $A$ i $B$, dla których:\n' +
          '$P(A) = 0{,}4$, $P(B) = 0{,}5$, $P(A \\cup B) = 0{,}7$.\n\n' +
          '**Oblicz $P(A|B)$.** Zapisz obliczenia.',
        answer_display: '\\dfrac{2}{5}',
        answer_val: 0.4,
        solution: [
          { step: 1, title: 'P(A∩B)', content: 'P(A\\cup B) = P(A)+P(B)-P(A\\cap B)\\\\ 0{,}7 = 0{,}4+0{,}5-P(A\\cap B)\\\\ P(A\\cap B) = 0{,}2', explanation: '' },
          { step: 2, title: 'Prawdopodobieństwo warunkowe', content: 'P(A|B) = \\frac{P(A\\cap B)}{P(B)} = \\frac{0{,}2}{0{,}5} = \\frac{2}{5} = 0{,}4', explanation: '' }
        ],
        hints: [
          { level: 1, text: 'Wzór: $P(A\\cup B) = P(A)+P(B)-P(A\\cap B)$. Wyznacz $P(A\\cap B)$.' },
          { level: 2, text: '$P(A\\cap B) = 0{,}4+0{,}5-0{,}7 = 0{,}2$.' },
          { level: 3, text: '$P(A|B) = \\frac{P(A\\cap B)}{P(B)} = \\frac{0{,}2}{0{,}5} = 0{,}4$.' }
        ]
      }
    ];

    const pool = TASKS.filter(t => t.difficulty === diff);
    const task = M.choose(pool.length > 0 ? pool : TASKS);

    return {
      id: M.makeId('cat13_cond'),
      category: 13,
      categoryName: 'Prawdopodobieństwo',
      type: 'conditional_prob',
      difficulty: diff,
      points: diff === 'easy' ? 3 : 4,
      params: {},
      statement: task.statement,
      answer: {
        type: 'expression',
        display: task.answer_display,
        description: `$P = ${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  function generate(diff = 'medium') {
    return M.choose([bernoulli, conditional])(diff);
  }

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
