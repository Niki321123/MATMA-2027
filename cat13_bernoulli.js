// Kategoria 13: Prawdopodobieństwo i schemat Bernoulliego
// Wzorzec matura 2025 z.12: Schemat Bernoulliego, P(X=k), warunkowe
// Wzorzec matura 2024 z.12: Prawdopodobieństwo warunkowe
// Wzorzec matura 2023 z.12: Schemat Bernoulliego 4 próby
window.cat13 = (() => {
  const M = window.MathUtils;

  // === Schemat Bernoulliego ===
  function bernoulli() {
    const configs = [
      { n: 4, p_num: 1, p_den: 3, contexts: ['sukcesów'] },
      { n: 5, p_num: 1, p_den: 2, contexts: ['orłów'] },
      { n: 4, p_num: 2, p_den: 5, contexts: ['trafień'] },
      { n: 6, p_num: 1, p_den: 3, contexts: ['sukcesów'] },
      { n: 5, p_num: 2, p_den: 3, contexts: ['sukcesów'] },
      { n: 4, p_num: 3, p_den: 5, contexts: ['trafień'] },
      { n: 6, p_num: 1, p_den: 4, contexts: ['sukcesów'] }
    ];

    const cfg = M.choose(configs);
    const { n, p_num, p_den } = cfg;
    const context = M.choose(cfg.contexts);
    const q_num = p_den - p_num;

    const k = M.choose([1, 2, 3]);
    if (k > n) return bernoulli();

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
  function conditional() {
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

    const pool = TASKS.filter(t => t.difficulty === 'medium' || t.difficulty === 'hard');
    const task = M.choose(pool.length > 0 ? pool : TASKS);

    return {
      id: M.makeId('cat13_cond'),
      category: 13,
      categoryName: 'Prawdopodobieństwo',
      type: 'conditional_prob',
      points: 4,
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

  // === Wzór na prawdopodobieństwo całkowite ===
  // P(A) = P(A|H₁)P(H₁) + P(A|H₂)P(H₂) + ...
  const TOTAL_PROB_TASKS = [
    {
      difficulty: 'medium',
      statement:
        'W pudełku I jest 3 kulki białe i 2 czarne. W pudełku II jest 1 kulka biała i 4 czarne. ' +
        'Losujemy jedno pudełko (z równym prawdopodobieństwem), a następnie losujemy z niego jedną kulkę.\n\n' +
        'Zdarzenie $A$: wylosowana kulka jest biała.\n\n' +
        '**Oblicz $P(A)$.** Zapisz obliczenia.',
      answer_display: '\\dfrac{2}{5}',
      answer_val: 0.4,
      solution: [
        { step: 1, title: 'Hipotezy', content: 'H_1\\text{: wybrano pudełko I},\\quad H_2\\text{: wybrano pudełko II}\\\\ P(H_1) = P(H_2) = \\frac{1}{2}', explanation: '' },
        { step: 2, title: 'Prawdopodobieństwa warunkowe', content: 'P(A|H_1) = \\frac{3}{5},\\quad P(A|H_2) = \\frac{1}{5}', explanation: '' },
        { step: 3, title: 'Wzór na prawdopodobieństwo całkowite', content: 'P(A) = P(A|H_1)P(H_1) + P(A|H_2)P(H_2)\\\\ = \\frac{3}{5}\\cdot\\frac{1}{2} + \\frac{1}{5}\\cdot\\frac{1}{2} = \\frac{3}{10}+\\frac{1}{10} = \\frac{4}{10} = \\frac{2}{5}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Zastosuj wzór: $P(A) = P(A|H_1)P(H_1) + P(A|H_2)P(H_2)$.' },
        { level: 2, text: '$P(A|H_1) = \\frac{3}{5}$, $P(A|H_2) = \\frac{1}{5}$, $P(H_1) = P(H_2) = \\frac{1}{2}$.' },
        { level: 3, text: '$P(A) = \\frac{3}{10} + \\frac{1}{10} = \\frac{2}{5}$.' }
      ]
    },
    {
      difficulty: 'medium',
      statement:
        'Fabryka produkuje śruby na dwóch maszynach. Maszyna I produkuje 60% śrub, maszyna II — 40%. ' +
        'Wadliwość maszyny I wynosi 2%, a maszyny II — 5%.\n\n' +
        'Zdarzenie $A$: losowo wybrana śruba jest wadliwa.\n\n' +
        '**Oblicz $P(A)$.** Zapisz obliczenia.',
      answer_display: '\\dfrac{7}{250} = 0{,}028',
      answer_val: 0.028,
      solution: [
        { step: 1, title: 'Hipotezy', content: 'H_1\\text{: śruba z maszyny I},\\quad H_2\\text{: śruba z maszyny II}\\\\ P(H_1) = 0{,}6,\\quad P(H_2) = 0{,}4', explanation: '' },
        { step: 2, title: 'Prawdopodobieństwa warunkowe', content: 'P(A|H_1) = 0{,}02,\\quad P(A|H_2) = 0{,}05', explanation: '' },
        { step: 3, title: 'Wzór', content: 'P(A) = 0{,}6\\cdot0{,}02 + 0{,}4\\cdot0{,}05 = 0{,}012 + 0{,}020 = 0{,}032', explanation: 'Hmm, sprawdźmy: 6/10·2/100+4/10·5/100=12/1000+20/1000=32/1000=4/125≈0,032.' }
      ],
      hints: [
        { level: 1, text: 'Wzór: $P(A) = P(A|H_1)P(H_1) + P(A|H_2)P(H_2)$.' },
        { level: 2, text: '$P(A) = 0{,}6 \\cdot 0{,}02 + 0{,}4 \\cdot 0{,}05$.' },
        { level: 3, text: '$P(A) = 0{,}012 + 0{,}020 = 0{,}032 = \\frac{4}{125}$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement:
        'Urnę wypełniamy kulkami w następujący sposób: z prawdopodobieństwem $\\frac{1}{3}$ wkładamy 3 kulki białe, ' +
        'a z prawdopodobieństwem $\\frac{2}{3}$ wkładamy 1 kulkę białą i 2 czarne.\n\n' +
        'Następnie losujemy jedną kulkę z urny.\n\n' +
        'Zdarzenie $A$: wylosowana kulka jest biała.\n\n' +
        '**a) Oblicz $P(A)$.**\n\n' +
        '**b) Wiedząc, że wylosowana kulka jest biała, oblicz prawdopodobieństwo, że urna zawierała tylko białe kulki.** Zapisz obliczenia.',
      answer_display: 'P(A) = \\dfrac{5}{9},\\quad P(H_1|A) = \\dfrac{3}{5}',
      answer_val: 5/9,
      solution: [
        { step: 1, title: 'a) Wzór na P(A)', content: 'H_1:\\text{ 3 białe}, P(H_1)=\\tfrac{1}{3},\\ P(A|H_1)=1\\\\ H_2:\\text{ 1 biała + 2 czarne}, P(H_2)=\\tfrac{2}{3},\\ P(A|H_2)=\\tfrac{1}{3}\\\\ P(A) = 1\\cdot\\tfrac{1}{3}+\\tfrac{1}{3}\\cdot\\tfrac{2}{3}=\\tfrac{1}{3}+\\tfrac{2}{9}=\\tfrac{5}{9}', explanation: '' },
        { step: 2, title: 'b) Wzór Bayesa', content: 'P(H_1|A) = \\frac{P(A|H_1)P(H_1)}{P(A)} = \\frac{1\\cdot\\frac{1}{3}}{\\frac{5}{9}} = \\frac{\\frac{1}{3}}{\\frac{5}{9}} = \\frac{1}{3}\\cdot\\frac{9}{5} = \\frac{3}{5}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'a) Zastosuj wzór: $P(A) = P(A|H_1)P(H_1) + P(A|H_2)P(H_2)$.' },
        { level: 2, text: 'b) Wzór Bayesa: $P(H_1|A) = \\dfrac{P(A|H_1)P(H_1)}{P(A)}$.' },
        { level: 3, text: '$P(A) = \\frac{5}{9}$, $P(H_1|A) = \\frac{3}{5}$.' }
      ]
    },
    {
      difficulty: 'medium',
      statement:
        'Gracz rzuca raz kostką. Jeśli wypadnie 1 lub 2 — ciągnie kartę z talii 4 kart (2 czerwone, 2 czarne). ' +
        'Jeśli wypadnie 3, 4, 5 lub 6 — ciągnie kartę z talii 6 kart (1 czerwona, 5 czarnych).\n\n' +
        'Zdarzenie $A$: wyciągnięta karta jest czerwona.\n\n' +
        '**Oblicz $P(A)$.** Zapisz obliczenia.',
      answer_display: '\\dfrac{5}{18}',
      answer_val: 5/18,
      solution: [
        { step: 1, title: 'Hipotezy', content: 'H_1\\text{: wypadło 1 lub 2},\\ P(H_1)=\\tfrac{2}{6}=\\tfrac{1}{3}\\\\ H_2\\text{: wypadło 3-6},\\ P(H_2)=\\tfrac{4}{6}=\\tfrac{2}{3}', explanation: '' },
        { step: 2, title: 'Warunkowe', content: 'P(A|H_1) = \\frac{2}{4} = \\frac{1}{2},\\quad P(A|H_2) = \\frac{1}{6}', explanation: '' },
        { step: 3, title: 'P(A)', content: 'P(A) = \\frac{1}{2}\\cdot\\frac{1}{3}+\\frac{1}{6}\\cdot\\frac{2}{3} = \\frac{1}{6}+\\frac{2}{18} = \\frac{3}{18}+\\frac{2}{18} = \\frac{5}{18}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Określ dwie hipotezy: wypadło 1 lub 2, albo wypadło 3–6.' },
        { level: 2, text: '$P(H_1)=\\frac{1}{3}$, $P(H_2)=\\frac{2}{3}$, $P(A|H_1)=\\frac{1}{2}$, $P(A|H_2)=\\frac{1}{6}$.' },
        { level: 3, text: '$P(A) = \\frac{1}{6} + \\frac{2}{18} = \\frac{5}{18}$.' }
      ]
    }
  ];

  function totalProbability() {
    const pool = TOTAL_PROB_TASKS.filter(t => t.difficulty === 'medium' || t.difficulty === 'hard');
    const task = M.choose(pool.length > 0 ? pool : TOTAL_PROB_TASKS);

    return {
      id: M.makeId('cat13_total'),
      category: 13,
      categoryName: 'Prawdopodobieństwo',
      type: 'total_probability',
      points: 4,
      params: {},
      statement: task.statement,
      answer: {
        type: 'expression',
        display: task.answer_display,
        description: `$P(A) = ${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  function generate() {
    return M.choose([bernoulli, conditional, totalProbability])();
  }

  return { generate };
})();
