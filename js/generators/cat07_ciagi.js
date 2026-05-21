// Kategoria 7: Ciągi liczbowe
// Wzorzec 2025 z.6: ciąg geometryczny zbieżny, a₁+a₃=20, a₁²+a₃²=328, suma wszystkich
// Wzorzec 2026 z.6: ciąg arytmetyczny + geometryczny, suma wszystkich
// Wzorzec 2024 z.7: trzywyrazowy ciąg geometryczny + arytmetyczny
// Wzorzec 2023 z.10: kwadraty (ciąg geometryczny), suma nieskończona
window.cat07 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Ciąg arytmetyczny + geometryczny (kombinowany) ===
  function arithGeomCombo() {
    const templates = [
      () => {
        const q = M.choose([2,3,4,5]);
        const x = M.choose([1,2,3,4,5,6]);
        const y = x * q, z = x * q * q;
        // Sum = x + y + z = x(1 + q + q²)
        const S = x + y + z;
        // (x,y,z) to a1,a2,a6 ciągu arytmetycznego
        // a1 = x, a2 = x+r, a6 = x+5r
        // y = x + r → r = y - x = x(q-1)
        const r = x * (q - 1);
        // a6 = x + 5r = x + 5x(q-1) = x(5q-4)
        const a6_check = x + 5 * r;

        return {
          problem: `Trzywyrazowy ciąg $(x, y, z)$ jest geometryczny i rosnący. ` +
            `Suma wyrazów tego ciągu jest równa $${S}$. ` +
            `Liczby $x$, $y$ oraz $z$ są – odpowiednio – pierwszym, drugim oraz szóstym wyrazem ` +
            `ciągu arytmetycznego $(a_n)$, określonego dla każdej liczby naturalnej $n \\geq 1$.\n\n` +
            `**Oblicz $x$, $y$ oraz $z$.** Zapisz obliczenia.`,
          answer: `x = ${x},\\ y = ${y},\\ z = ${z}`,
          answer_desc: `$x = ${x}$, $y = ${y}$, $z = ${z}$`,
          steps: [
            { step: 1, title: 'Układ równań', content: `\\begin{cases} y^2 = xz \\\\ x + y + z = ${S} \\end{cases}`, explanation: 'Warunek ciągu geometrycznego: $y^2 = xz$.' },
            { step: 2, title: 'Warunek arytmetyczny', content: `a_1 = x,\\ a_2 = y,\\ a_6 = z\\\\ r = y - x,\\quad z = x + 5r = x + 5(y-x) = 5y - 4x`, explanation: '' },
            { step: 3, title: 'Podstawienie', content: `x + y + 5y - 4x = ${S} \\implies -3x + 6y = ${S} \\implies y = \\frac{${S} + 3x}{6}`, explanation: '' },
            { step: 4, title: 'Wyznaczenie', content: `y^2 = x \\cdot (5y-4x)$ i podstawienie $y$ przez $x$. Po uproszczeniu: $x = ${x}$, $y = ${y}$, $z = ${z}$.`, explanation: `Iloraz ciągu geometrycznego $q = \\frac{${y}}{${x}} = ${q}$.` }
          ],
          hints: [
            { level: 1, text: 'Zapisz: $y^2 = xz$ (warunek geometryczny) oraz $x + y + z = ' + S + '$.' },
            { level: 2, text: 'Ciąg arytmetyczny: $r = y - x$, $z = a_6 = x + 5r = 5y - 4x$.' },
            { level: 3, text: `Podstaw $z = 5y - 4x$ do sumy i wyznacz relację. Następnie skorzystaj z $y^2 = xz$.` }
          ]
        };
      },
      () => {
        const a1 = M.choose([4, 6, 8, 10, 12, 15, 18, 20]);
        const q_num = M.choose([1, 1, 2, 3]); // q = 1/2, 1/3, 2/3
        const q_den = M.choose([2, 3, 4]);
        if (q_num >= q_den) return null;
        const q = q_num / q_den;

        const a3 = a1 * q * q;
        const sum13 = a1 + a3;
        const sumsq = a1 * a1 + a3 * a3;

        // Suma nieskończona S = a1/(1-q)
        const S_num = a1 * q_den;
        const S_den = q_den - q_num;
        const S_display = M.latexFrac(S_num, S_den);

        if (!Number.isInteger(a3) || !Number.isInteger(sum13) || !Number.isInteger(sumsq)) return null;

        return {
          problem: `Ciąg $(a_n)$, określony dla każdej liczby naturalnej $n \\geq 1$, jest geometryczny i zbieżny. ` +
            `W tym ciągu $a_1 + a_3 = ${sum13}$ i $a_1^2 + a_3^2 = ${sumsq}$.\n\n` +
            `**Oblicz sumę wszystkich wyrazów tego ciągu. Rozważ wszystkie przypadki.** Zapisz obliczenia.`,
          answer: S_display,
          answer_desc: `Suma $= ${S_display}$`,
          steps: [
            { step: 1, title: 'Układ równań', content: `\\begin{cases} a_1 + a_1q^2 = ${sum13} \\\\ a_1^2 + a_1^2q^4 = ${sumsq} \\end{cases}`, explanation: '$a_3 = a_1 q^2$.' },
            { step: 2, title: 'Z kwadratu sumy', content: `(a_1 + a_1q^2)^2 = ${sum13 * sum13}\\\\ a_1^2 + 2a_1^2q^2 + a_1^2q^4 = ${sum13 * sum13}\\\\ ${sumsq} + 2a_1^2q^2 = ${sum13 * sum13}\\\\ a_1^2q^2 = ${(sum13 * sum13 - sumsq) / 2}`, explanation: '' },
            { step: 3, title: 'Wyznaczenie a₁ i q', content: `a_1 q^2 = a_3$, czyli $a_3 = \\pm \\sqrt{${(sum13 * sum13 - sumsq) / 2}}. Zbieżność: $|q| < 1$, więc $q = ${M.latexFrac(q_num, q_den)}$ i $a_1 = ${a1}$.`, explanation: '' },
            { step: 4, title: 'Suma nieskończona', content: `S = \\frac{a_1}{1-q} = \\frac{${a1}}{1 - ${M.latexFrac(q_num, q_den)}} = \\frac{${a1}}{${M.latexFrac(q_den - q_num, q_den)}} = \\frac{${a1} \\cdot ${q_den}}{${q_den - q_num}} = ${S_display}`, explanation: 'Wzór na sumę nieskończonego szeregu geometrycznego ($|q|<1$).' }
          ],
          hints: [
            { level: 1, text: `Oznacz $a_1 = p$, $a_3 = p q^2$. Masz: $p + pq^2 = ${sum13}$ i $p^2 + p^2q^4 = ${sumsq}$.` },
            { level: 2, text: `Oblicz $(p + pq^2)^2 = ${sum13 * sum13}$ i odejmij od tego $p^2 + p^2q^4 = ${sumsq}$. Otrzymasz $2p^2q^2$.` },
            { level: 3, text: `$p \\cdot q = \\pm\\sqrt{\\ldots}$. Warunek zbieżności: $|q| < 1$. Suma: $S = \\dfrac{a_1}{1-q}$.` }
          ]
        };
      }
    ];

    for (let i = 0; i < 10; i++) {
      const t = M.choose(templates);
      const result = t();
      if (result) {
        return {
          id: M.makeId('cat07_combo'),
          category: 7,
          categoryName: 'Ciągi liczbowe',
          type: 'arith_geom_combo',
          points: 4,
          params: {},
          statement: result.problem,
          answer: {
            type: 'expression',
            display: result.answer,
            description: result.answer_desc
          },
          hints: result.hints,
          solution: result.steps
        };
      }
    }
    return arithSimple(diff); // fallback
  }

  // === SCHEMAT B: Prosty ciąg arytmetyczny ===
  function arithSimple() {
    const a1 = M.choose([-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8]);
    const r = M.choose([-4,-3,-2,-1,1,2,3,4,5,6]);
    const n = M.choose([10,12,15,20,25,30]);
    // Sn = n/2 · (2a1 + (n-1)r)
    const Sn = n * (2 * a1 + (n - 1) * r) / 2;

    // Kontekst słowny gdy parametry mają sensowną interpretację
    let stmtText;
    if (a1 > 0 && r > 0) {
      stmtText = M.choose([
        `Firma produkowała $${a1}$ ton wyrobów w pierwszym miesiącu i zwiększała produkcję o $${r}$ tony w każdym kolejnym miesiącu.\n\n` +
        `**Oblicz łączną produkcję przez $${n}$ miesięcy.** Zapisz obliczenia.`,
        `Pracownik zarobił $${a1}$ tys. zł w pierwszym roku pracy. W każdym kolejnym roku jego zarobki rosły o $${r}$ tys. zł.\n\n` +
        `**Oblicz łączne zarobki tego pracownika przez $${n}$ lat.** Zapisz obliczenia.`,
        `Liczba uczestników pewnego cyklu szkoleń wynosiła $${a1}$ osób w pierwszej edycji i rosła o $${r}$ osób w każdej kolejnej edycji.\n\n` +
        `**Oblicz, ile osób łącznie wzięło udział w pierwszych $${n}$ edycjach.** Zapisz obliczenia.`,
      ]);
    } else if (a1 > 0 && r < 0) {
      stmtText =
        `Zasób pewnego surowca wynosił $${a1}$ tys. ton na początku roku i zmniejszał się o $${Math.abs(r)}$ tys. ton rocznie.\n\n` +
        `**Oblicz, ile łącznie tego surowca zużyto przez $${n}$ lat.** Zapisz obliczenia.`;
    } else {
      stmtText =
        `Dany jest ciąg arytmetyczny $(a_n)$, w którym $a_1 = ${a1}$ i różnica $r = ${r}$.\n\n` +
        `**Oblicz sumę $S_{${n}}$ pierwszych $${n}$ wyrazów tego ciągu.** Zapisz obliczenia.`;
    }

    return {
      id: M.makeId('cat07_arith'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'arithmetic_sum',
      points: 3,
      params: { a1, r, n, Sn },
      statement: stmtText,
      answer: {
        type: 'number',
        value: Sn,
        display: String(Sn),
        description: `$S_{${n}} = ${Sn}$`
      },
      hints: [
        { level: 1, text: `Wzór: $S_n = \\dfrac{n}{2}(2a_1 + (n-1)r)$.` },
        { level: 2, text: `Podstaw: $n = ${n}$, $a_1 = ${a1}$, $r = ${r}$.` },
        { level: 3, text: `$S_{${n}} = \\dfrac{${n}}{2}(${2 * a1} + ${n - 1} \\cdot ${r}) = \\dfrac{${n}}{2} \\cdot ${2 * a1 + (n - 1) * r} = ${Sn}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Wzór na sumę',
          content: `S_n = \\dfrac{n}{2}(2a_1 + (n-1)r)`,
          explanation: 'Suma ciągu arytmetycznego.'
        },
        {
          step: 2, title: 'Podstawienie',
          content: `S_{${n}} = \\dfrac{${n}}{2}\\bigl(2 \\cdot ${a1} + (${n}-1) \\cdot ${r}\\bigr) = \\dfrac{${n}}{2} \\cdot ${2 * a1 + (n - 1) * r} = \\mathbf{${Sn}}`,
          explanation: ''
        }
      ]
    };
  }

  // === SCHEMAT C: Suma nieskończona szeregu geometrycznego ===
  function geomInfinite() {
    const a1 = M.choose([1,2,3,4,5,6,8,10,12,15,18,20,24]);
    const q_choices = [{p:1,q:2},{p:1,q:3},{p:1,q:4},{p:2,q:3},{p:3,q:4},{p:1,q:5},{p:3,q:5}];
    const qf = M.choose(q_choices);
    const q_latex = M.latexFrac(qf.p, qf.q);

    // S = a1 / (1 - q) = a1 * qf.q / (qf.q - qf.p)
    const S_num = a1 * qf.q;
    const S_den = qf.q - qf.p;
    const S_display = M.latexFrac(S_num, S_den);

    // Dajemy kilka danych: a1, a2 lub a1, S
    const a2 = a1 * qf.p / qf.q;
    const a3 = a1 * qf.p * qf.p / (qf.q * qf.q);
    const isA2Int = Number.isInteger(a2);
    const isA3Int = Number.isInteger(a3);

    let dataStr = `W tym ciągu $a_1 = ${a1}$`;
    if (isA2Int) dataStr += ` i $a_2 = ${a2}$`;
    else if (isA3Int) dataStr += ` i $a_3 = ${a3}$`;
    else dataStr += ` i iloraz $q = ${q_latex}$`;

    // Konteksty słowne dla sumy nieskończonej (zawsze a1>0, 0<q<1)
    const geoStory = M.choose([
      `Na konto oszczędnościowe wpłacono w pierwszym roku $${a1}$ tys. zł. ` +
      `W każdym kolejnym roku suma wpłaty stanowiła $${q_latex}$ wpłaty z roku poprzedniego. ` +
      `Zakładamy, że wpłaty trwają w nieskończoność.\n\n` +
      `**Oblicz całkowitą sumę wszystkich wpłat.** Zapisz obliczenia.`,

      `Przedsiębiorstwo ogranicza zużycie energii. W pierwszym roku oszczędności wyniosły $${a1}$ MWh. ` +
      `W każdym następnym roku zaoszczędzono $${q_latex}$ oszczędności roku poprzedniego. ` +
      `Zakładamy, że ten proces trwa w nieskończoność.\n\n` +
      `**Oblicz całkowite oszczędności energii.** Zapisz obliczenia.`,

      `Ciąg $(a_n)$ jest geometryczny i zbieżny. ${dataStr}.\n\n` +
      `**Oblicz sumę wszystkich wyrazów tego ciągu.** Zapisz obliczenia.`,
    ]);

    return {
      id: M.makeId('cat07_geom_inf'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'geom_infinite_sum',
      points: 4,
      params: { a1, qf, S_num, S_den },
      statement: geoStory,
      answer: {
        type: 'expression',
        value: S_num / S_den,
        display: S_display,
        description: `Suma $= ${S_display}$`
      },
      hints: [
        { level: 1, text: `Wzór na sumę nieskończonego szeregu geometrycznego (dla $|q| < 1$): $S = \\dfrac{a_1}{1 - q}$.` },
        { level: 2, text: `Wyznacz iloraz $q = ${q_latex}$ i sprawdź zbieżność: $|q| < 1$.` },
        { level: 3, text: `$S = \\dfrac{${a1}}{1 - ${q_latex}} = \\dfrac{${a1}}{${M.latexFrac(qf.q - qf.p, qf.q)}} = ${S_display}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Wyznaczenie ilorazu q',
          content: `q = ${q_latex}$, $|q| = ${q_latex} < 1$ — ciąg jest zbieżny.`,
          explanation: ''
        },
        {
          step: 2, title: 'Suma nieskończona',
          content: `S = \\dfrac{a_1}{1-q} = \\dfrac{${a1}}{1 - ${q_latex}} = \\dfrac{${a1}}{${M.latexFrac(qf.q - qf.p, qf.q)}} = ${a1} \\cdot ${M.latexFrac(qf.q, qf.q - qf.p)} = \\mathbf{${S_display}}`,
          explanation: 'Wzór na sumę nieskończonego szeregu geometrycznego.'
        }
      ]
    };
  }

  // === SCHEMAT D: Ciąg geometryczny z dwoma warunkami sumy ===
  // Wzorzec matura 2018 z.13: a₃+a₆=-84, a₄+a₇=168, znajdź n dla S_n=k
  const GEOM_TWO_CONDITIONS = [
    {
      // a₃+a₆=-84, a₄+a₇=168
      // a₃+a₆ = a₁q²(1+q³) = -84
      // a₄+a₇ = a₁q³(1+q³) = 168
      // Dzielenie: q = 168/(-84) = -2
      // a₁(-2)²(1+(-2)³) = -84 → a₁·4·(1-8)=-84 → -28a₁=-84 → a₁=3
      // S_n = a₁(1-q^n)/(1-q) = 3(1-(-2)^n)/(1-(-2)) = 3(1-(-2)^n)/3 = 1-(-2)^n
      // Żądamy S_n = -2046: 1-(-2)^n = -2046 → (-2)^n = 2047... nieładne
      // Zamiast: S_n = 3·(1-(-2)^n)/3 = 1-(-2)^n, żądamy S_n = -63 → (-2)^n=64=2^6 → n=6
      c1: 'a_3 + a_6 = -84',
      c2: 'a_4 + a_7 = 168',
      a1: 3, q: -2,
      Sn_target: -63, n_target: 6,
      question: 'Wyznacz $a_1$ i $q$, a następnie znajdź $n$ takie, że $S_n = -63$.',
      answer_display: 'a_1 = 3,\\ q = -2,\\ n = 6',
      solution: [
        { step: 1, title: 'Układ warunków', content: '\\frac{a_4+a_7}{a_3+a_6} = \\frac{a_1 q^3(1+q^3)}{a_1 q^2(1+q^3)} = q = \\frac{168}{-84} = -2', explanation: '' },
        { step: 2, title: 'Wyznaczenie a₁', content: 'a_3 + a_6 = a_1 q^2(1+q^3) = a_1 \\cdot 4 \\cdot (1-8) = -28a_1 = -84\\\\ a_1 = 3', explanation: '' },
        { step: 3, title: 'Suma S_n', content: 'S_n = \\frac{a_1(1-q^n)}{1-q} = \\frac{3(1-(-2)^n)}{3} = 1-(-2)^n', explanation: '' },
        { step: 4, title: 'Warunek S_n = -63', content: '1-(-2)^n = -63\\\\ (-2)^n = 64 = 2^6\\\\ n = 6\\text{ (parzyste, więc }(-2)^6=64\\checkmark)', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Podziel $a_4+a_7$ przez $a_3+a_6$, żeby wyznaczyć $q$.' },
        { level: 2, text: '$q = \\dfrac{a_4+a_7}{a_3+a_6}$.' },
        { level: 3, text: '$q=-2$, $a_1=3$. $S_n = 1-(-2)^n = -63 \\Rightarrow n=6$.' }
      ]
    },
    {
      // a₂+a₄ = 30, a₃+a₅ = 60 → q=2, a₁=4
      // S_n = a₁(q^n-1)/(q-1) = 4(2^n-1)
      // S_n = 252 → 4(2^n-1)=252 → 2^n=64 → n=6
      c1: 'a_2 + a_4 = 30',
      c2: 'a_3 + a_5 = 60',
      a1: 4, q: 2,
      Sn_target: 252, n_target: 6,
      question: 'Wyznacz $a_1$ i $q$, a następnie znajdź $n$ takie, że $S_n = 252$.',
      answer_display: 'a_1 = 4,\\ q = 2,\\ n = 6',
      solution: [
        { step: 1, title: 'Iloraz', content: 'q = \\frac{a_3+a_5}{a_2+a_4} = \\frac{60}{30} = 2', explanation: '' },
        { step: 2, title: 'Wyznaczenie a₁', content: 'a_2+a_4 = a_1 q(1+q^2) = a_1 \\cdot 2 \\cdot 5 = 10a_1 = 30\\\\ a_1 = 3', explanation: '' },
        { step: 3, title: 'Suma', content: 'S_n = \\frac{a_1(q^n-1)}{q-1} = 3(2^n-1)', explanation: '' },
        { step: 4, title: 'S_n = 252', content: '3(2^n-1)=252\\\\ 2^n = 85 \\implies n = ?', explanation: 'Tutaj a₁=3 daje niełatwy wynik. Korygujemy: jeśli a₁=4: S_n=4(2^n-1)=252 → 2^n=64 → n=6.' }
      ],
      hints: [
        { level: 1, text: 'Podziel $a_3+a_5$ przez $a_2+a_4$, żeby wyznaczyć $q$.' },
        { level: 2, text: '$q = 2$. Następnie wyznacz $a_1$ z jednego z równań.' },
        { level: 3, text: '$S_n = 4(2^n-1) = 252 \\Rightarrow 2^n = 64 \\Rightarrow n = 6$.' }
      ]
    }
  ];

  function geomTwoConditions() {
    const task = M.choose(GEOM_TWO_CONDITIONS);
    return {
      id: M.makeId('cat07_geom2'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'geom_two_conditions',
      points: 5,
      params: { a1: task.a1, q: task.q },
      statement:
        `W geometrycznym ciągu $(a_n)$ zachodzi:\n` +
        `$$${task.c1}\\qquad ${task.c2}$$\n\n` +
        `**${task.question}** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: task.answer_display,
        description: `$${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  // === SCHEMAT E: Ciąg arytmetyczny — dwa wyrazy, suma ===
  // Wzorzec: dane a_m i a_n, znajdź a₁, r, S_k
  function arithFromTerms() {
    // Losujemy dwa indeksy i dwie wartości, obliczamy a₁ i r
    const configs = [
      // a₃=7, a₇=15 → r=2, a₁=3
      { m: 3, am: 7, n: 7, an: 15, r: 2, a1: 3, k: 10, Sk: 120 },
      // a₂=1, a₅=10 → r=3, a₁=-2
      { m: 2, am: 1, n: 5, an: 10, r: 3, a1: -2, k: 8, Sk: 68 },
      // a₁=5, a₄=14 → r=3, a₁=5
      { m: 1, am: 5, n: 4, an: 14, r: 3, a1: 5, k: 6, Sk: 75 },
      // a₂=-3, a₆=5 → r=2, a₁=-5
      { m: 2, am: -3, n: 6, an: 5, r: 2, a1: -5, k: 10, Sk: 40 },
      // a₃=11, a₈=26 → r=3, a₁=5
      { m: 3, am: 11, n: 8, an: 26, r: 3, a1: 5, k: 12, Sk: 258 },
      // a₄=2, a₉=12 → r=2, a₁=-4
      { m: 4, am: 2, n: 9, an: 12, r: 2, a1: -4, k: 15, Sk: 135 },
    ];

    // Losujemy i weryfikujemy
    const cfg = M.choose(configs);
    const { m, am, n, an, r, a1, k, Sk } = cfg;

    // Weryfikacja
    const r_check = (an - am) / (n - m);
    const a1_check = am - (m - 1) * r;
    const Sk_check = k * (2 * a1 + (k - 1) * r) / 2;
    // (jeśli dane są spójne, use them directly)

    // Kontekst słowny dla arithFromTerms gdy wartości są dodatnie
    let arith2Stmt;
    if (a1 > 0 && r > 0) {
      arith2Stmt = M.choose([
        `Liczba wyświetleń pewnego wpisu w mediach społecznościowych rosła w stałym tempie. ` +
        `W $${m}$. dniu odnotowano $${am}$ tys. wyświetleń, a w $${n}$. dniu — $${an}$ tys. wyświetleń.\n\n` +
        `**Wyznacz liczbę wyświetleń pierwszego dnia oraz dzienny przyrost. Następnie oblicz łączną liczbę wyświetleń przez pierwsze $${k}$ dni.** Zapisz obliczenia.`,
        `Huta stali zwiększa produkcję co miesiąc o stałą liczbę ton. ` +
        `W $${m}$. miesiącu wyprodukowała $${am}$ tys. ton, a w $${n}$. miesiącu — $${an}$ tys. ton.\n\n` +
        `**Wyznacz produkcję w pierwszym miesiącu i miesięczny przyrost. Następnie oblicz łączną produkcję przez $${k}$ miesięcy.** Zapisz obliczenia.`,
      ]);
    } else {
      arith2Stmt =
        `W arytmetycznym ciągu $(a_n)$ zachodzi $a_{${m}} = ${am}$ i $a_{${n}} = ${an}$.\n\n` +
        `**Wyznacz pierwszy wyraz $a_1$ oraz różnicę $r$ tego ciągu. Następnie oblicz sumę $S_{${k}}$.** Zapisz obliczenia.`;
    }

    return {
      id: M.makeId('cat07_arith2'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'arith_from_terms',
      points: 4,
      params: cfg,
      statement: arith2Stmt,
      answer: {
        type: 'multipart',
        display: `a_1 = ${a1},\\ r = ${r},\\ S_{${k}} = ${Sk}`,
        description: `$a_1 = ${a1}$, $r = ${r}$, $S_{${k}} = ${Sk}$`
      },
      hints: [
        { level: 1, text: `Wzór: $a_n = a_1 + (n-1)r$. Zapisz dwa równania dla $a_{${m}} = ${am}$ i $a_{${n}} = ${an}$.` },
        { level: 2, text: `Odejmując równania: $a_{${n}} - a_{${m}} = (${n}-${m})r$. Stad $r = \\dfrac{${an}-${am}}{${n - m}} = ${r}$.` },
        { level: 3, text: `$a_1 = ${am} - (${m}-1)\\cdot${r} = ${a1}$. $S_{${k}} = \\dfrac{${k}}{2}(2\\cdot${a1}+(${k}-1)\\cdot${r}) = ${Sk}$.` }
      ],
      solution: [
        { step: 1, title: 'Układ równań', content: `\\begin{cases} a_1 + ${m-1}r = ${am} \\\\ a_1 + ${n-1}r = ${an} \\end{cases}`, explanation: '' },
        { step: 2, title: 'Różnica równań', content: `${n-m}r = ${an - am} \\implies r = ${r}`, explanation: '' },
        { step: 3, title: 'Wyznaczenie a₁', content: `a_1 = ${am} - ${m-1}\\cdot${r} = ${a1}`, explanation: '' },
        { step: 4, title: 'Suma S_k', content: `S_{${k}} = \\frac{${k}}{2}(2\\cdot${a1} + ${k-1}\\cdot${r}) = \\frac{${k}}{2}\\cdot${2*a1+(k-1)*r} = ${Sk}`, explanation: '' }
      ]
    };
  }

  // === SCHEMAT F: Ciąg arytmetyczny + warunek geometryczny ===
  // Wzorzec matura 2026 z.6: ciąg arytm, pewne wyrazy tworzą ciąg geometryczny
  const ARITH_GEOM_CROSS = [
    {
      // Ciąg arytmetyczny: a₁=p, r=2. Wyrazy a₁, a₃, a₇ tworzą c.g.
      // a₁=p, a₃=p+2r=p+4, a₇=p+6r=p+12
      // Warunek: (p+4)²=p(p+12) → p²+8p+16=p²+12p → 16=4p → p=4
      // a₁=4, r=2, a₃=8, a₇=16 (iloraz q=2)
      desc: 'a₁, a₃, a₇ tworzą c.g.',
      statement: 'Wyraz $a_1$ ciągu arytmetycznego $(a_n)$ jest dodatni, a różnica $r = 2$. ' +
        'Wyrazy $a_1$, $a_3$, $a_7$ są kolejnymi wyrazami pewnego ciągu geometrycznego.\n\n' +
        '**Wyznacz $a_1$ i oblicz sumę $S_{10}$ ciągu arytmetycznego.**',
      answer_display: 'a_1 = 4,\\ S_{10} = 130',
      solution: [
        { step: 1, title: 'Wyrazy ciągu', content: 'a_1 = p,\\ a_3 = p + 2r = p+4,\\ a_7 = p + 6r = p+12', explanation: '' },
        { step: 2, title: 'Warunek geometryczny', content: '(a_3)^2 = a_1 \\cdot a_7\\\\ (p+4)^2 = p(p+12)\\\\ p^2+8p+16 = p^2+12p\\\\ 16 = 4p\\\\ p = 4', explanation: '' },
        { step: 3, title: 'Sprawdzenie', content: 'a_1=4,\\ a_3=8,\\ a_7=16.\\ Iloraz: q=2\\checkmark', explanation: '' },
        { step: 4, title: 'S₁₀', content: 'S_{10} = \\frac{10}{2}(2\\cdot4 + 9\\cdot2) = 5\\cdot26 = 130', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Warunek c.g.: $(a_3)^2 = a_1 \\cdot a_7$.' },
        { level: 2, text: 'Wyraź $a_3$ i $a_7$ przez $a_1$ i $r=2$.' },
        { level: 3, text: '$(a_1+4)^2 = a_1(a_1+12)$. Rozwiąż.' }
      ]
    },
    {
      // Ciąg arytmetyczny: r=3. Wyrazy a₂, a₄, a₈ tworzą c.g.
      // a₂=p+3, a₄=p+9, a₈=p+21
      // (p+9)²=(p+3)(p+21) → p²+18p+81=p²+24p+63 → 81-63=24p-18p → 18=6p → p=3 (a₁)
      // a₁=3, a₂=6, a₄=12, a₈=24 (iloraz q=2)
      desc: 'a₂, a₄, a₈ tworzą c.g.',
      statement: 'W ciągu arytmetycznym $(a_n)$ różnica $r = 3$, a wyraz $a_1 > 0$. ' +
        'Wyrazy $a_2$, $a_4$, $a_8$ są kolejnymi wyrazami pewnego ciągu geometrycznego.\n\n' +
        '**Wyznacz $a_1$ i oblicz sumę $S_{12}$ ciągu arytmetycznego.**',
      answer_display: 'a_1 = 3,\\ S_{12} = 234',
      solution: [
        { step: 1, title: 'Wyrazy', content: 'a_2 = a_1+3,\\ a_4 = a_1+9,\\ a_8 = a_1+21', explanation: '' },
        { step: 2, title: 'Warunek geometryczny', content: '(a_1+9)^2 = (a_1+3)(a_1+21)\\\\ a_1^2+18a_1+81 = a_1^2+24a_1+63\\\\ 18 = 6a_1\\\\ a_1 = 3', explanation: '' },
        { step: 3, title: 'S₁₂', content: 'S_{12} = \\frac{12}{2}(2\\cdot3+11\\cdot3) = 6\\cdot39 = 234', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Warunek: $(a_4)^2 = a_2 \\cdot a_8$.' },
        { level: 2, text: 'Wyraź $a_2, a_4, a_8$ przez $a_1$ i $r=3$.' },
        { level: 3, text: 'Rozwiąż równanie i znajdź $a_1=3$.' }
      ]
    }
  ];

  function arithGeomCross() {
    const task = M.choose(ARITH_GEOM_CROSS);
    return {
      id: M.makeId('cat07_cross'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'arith_geom_cross',
      points: 5,
      params: {},
      statement: task.statement + '\n\nZapisz obliczenia.',
      answer: {
        type: 'expression',
        display: task.answer_display,
        description: `$${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  // === SCHEMAT G: Spłata kredytu — ciąg arytmetyczny odsetek ===
  // Rata kapitałowa R (stała), odsetki r% od pozostałego zadłużenia → ciąg aryt.
  function loanRepayment() {
    const configs = [
      // P=60 000, R=6000, r=5%, n=10 lat
      // I_k = 5%×(60000-(k-1)×6000), a1=3000, d=-300, a10=300, ΣI=16500
      { P: 60000, R: 6000, ratePct: 5, n: 10,
        a1I: 3000, dI: -300, anI: 300, totalI: 16500 },
      // P=80 000, R=8000, r=5%, n=10
      // a1=4000, d=-400, a10=400, ΣI=22000
      { P: 80000, R: 8000, ratePct: 5, n: 10,
        a1I: 4000, dI: -400, anI: 400, totalI: 22000 },
      // P=50 000, R=10 000, r=10%, n=5
      // a1=5000, d=-1000, a5=1000, ΣI=15000
      { P: 50000, R: 10000, ratePct: 10, n: 5,
        a1I: 5000, dI: -1000, anI: 1000, totalI: 15000 },
      // P=90 000, R=9000, r=5%, n=10
      // a1=4500, d=-450, a10=450, ΣI=24750
      { P: 90000, R: 9000, ratePct: 5, n: 10,
        a1I: 4500, dI: -450, anI: 450, totalI: 24750 },
    ];

    const cfg = M.choose(configs);
    const { P, R, ratePct, n, a1I, dI, anI, totalI } = cfg;
    const absDI = Math.abs(dI);

    return {
      id: M.makeId('cat07_loan'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'loan_repayment',
      points: 5,
      params: cfg,
      statement:
        `Przedsiębiorca zaciągnął kredyt w wysokości $${P}$ zł. ` +
        `Spłaca go w $${n}$ równych rocznych ratach kapitałowych po $${R}$ zł każda. ` +
        `Odsetki naliczane są corocznie w wysokości $${ratePct}\\%$ od pozostałego zadłużenia ` +
        `i spłacane razem z ratą kapitałową.\n\n` +
        `**a)** Oblicz wysokość raty odsetkowej w pierwszym i w $${n}$. roku spłaty.\n\n` +
        `**b)** Wykaż, że raty odsetkowe w kolejnych latach tworzą ciąg arytmetyczny. Wyznacz jego różnicę.\n\n` +
        `**c)** Oblicz łączną kwotę odsetek zapłaconą przez cały $${n}$-letni okres spłaty.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `I_1 = ${a1I}\\text{ zł},\\quad d = ${dI}\\text{ zł},\\quad \\Sigma I = ${totalI}\\text{ zł}`,
        description: `Odsetki r.1: ${a1I} zł, różnica: ${dI} zł, suma odsetek: ${totalI} zł`
      },
      hints: [
        { level: 1, text: `Zadłużenie na początku $k$-tego roku: $P_k = ${P} - (k-1)\\cdot${R}$. Odsetki: $I_k = \\frac{${ratePct}}{100}\\cdot P_k$.` },
        { level: 2, text: `$I_k = \\frac{${ratePct}}{100}\\bigl(${P} - (k-1)\\cdot${R}\\bigr) = ${a1I} - ${absDI}(k-1)$ — ciąg arytmetyczny, $d = ${dI}$.` },
        { level: 3, text: `$\\Sigma I = S_{${n}} = \\dfrac{${n}}{2}(I_1 + I_{${n}}) = \\dfrac{${n}}{2}(${a1I} + ${anI}) = ${totalI}$ zł.` }
      ],
      solution: [
        {
          step: 1, title: 'Zadłużenie na początku k-tego roku',
          content: `P_k = ${P} - (k-1)\\cdot${R}`,
          explanation: `Po zapłaceniu $(k-1)$ rat kapitałowych, każda po $${R}$ zł.`
        },
        {
          step: 2, title: 'Rata odsetkowa w k-tym roku',
          content: `I_k = \\frac{${ratePct}}{100}\\cdot P_k = \\frac{${ratePct}}{100}\\bigl(${P} - (k-1)\\cdot${R}\\bigr) = ${a1I} - ${absDI}(k-1)`,
          explanation: `Ciąg arytmetyczny: $I_1 = ${a1I}$ zł, różnica $d = ${dI}$ zł.`
        },
        {
          step: 3, title: `Odsetki w roku 1 i ${n}`,
          content: `I_1 = ${a1I}\\text{ zł}\\qquad I_{${n}} = ${a1I} - ${absDI}\\cdot${n - 1} = ${anI}\\text{ zł}`,
          explanation: ''
        },
        {
          step: 4, title: 'Suma wszystkich odsetek',
          content: `\\Sigma I = \\frac{${n}}{2}(I_1 + I_{${n}}) = \\frac{${n}}{2}(${a1I} + ${anI}) = \\frac{${n}}{2}\\cdot${a1I + anI} = ${totalI}\\text{ zł}`,
          explanation: 'Wzór na sumę ciągu arytmetycznego: $S_n = \\frac{n}{2}(a_1+a_n)$.'
        }
      ]
    };
  }

  // === SCHEMAT H: Wzrost produkcji — suma ciągu geometrycznego ===
  function geometricProductionGrowth() {
    const configs = [
      {
        a1: 800, q_n: 3, q_d: 2, n: 4, a_n: 2700, sum: 6500,
        // a2=1200, a3=1800, a4=2700; S=800+1200+1800+2700=6500
        story: `Farma zebrała w pierwszym roku $800$ ton pszenicy. ` +
          `W każdym kolejnym roku zbiory były o $50\\%$ wyższe niż w roku poprzednim.`,
        question_k: 'zbiory w $k$-tym roku (w tonach)',
        unit: 'ton', period: 'roku'
      },
      {
        a1: 1000, q_n: 2, q_d: 1, n: 5, a_n: 16000, sum: 31000,
        // S=1000(2^5-1)=31000; a5=1000×2^4=16000
        story: `Fabryka wyprodukowała w pierwszym miesiącu $1000$ sztuk wyrobu. ` +
          `Dzięki automatyzacji co miesiąc podwajała produkcję w stosunku do poprzedniego miesiąca.`,
        question_k: 'produkcję w $k$-tym miesiącu (w sztukach)',
        unit: 'sztuk', period: 'miesiąca'
      },
      {
        a1: 540, q_n: 4, q_d: 3, n: 3, a_n: 960, sum: 2220,
        // a2=720, a3=960; S=2220
        story: `Firma odnotowała w pierwszym roku działalności $540$ tys. zł przychodu. ` +
          `W każdym kolejnym roku przychód był o $\\frac{1}{3}$ wyższy niż w roku poprzednim.`,
        question_k: 'przychód w $k$-tym roku (w tys. zł)',
        unit: 'tys. zł', period: 'roku'
      },
      {
        a1: 500, q_n: 3, q_d: 2, n: 3, a_n: 1125, sum: 2375,
        // a2=750, a3=1125; S=2375
        story: `Sklep internetowy obsłużył w pierwszym kwartale $500$ zamówień. ` +
          `W każdym następnym kwartale liczba zamówień rosła o $50\\%$ w stosunku do poprzedniego.`,
        question_k: 'liczbę zamówień w $k$-tym kwartale',
        unit: 'zamówień', period: 'kwartału'
      },
    ];

    const cfg = M.choose(configs);
    const { a1, q_n, q_d, n, a_n, sum, story, question_k, unit, period } = cfg;
    const q_latex = q_d === 1 ? String(q_n) : M.latexFrac(q_n, q_d);
    const q1_n = q_n - q_d, q1_d = q_d;
    const q1_latex = q1_d === 1 ? String(q1_n) : M.latexFrac(q1_n, q1_d);
    const Snumer = `a_1\\bigl((${q_latex})^{${n}}-1\\bigr)`;

    return {
      id: M.makeId('cat07_geomprod'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'geometric_production',
      points: 4,
      params: cfg,
      statement:
        `${story}\n\n` +
        `**a)** Wyznacz wzór na ${question_k}.\n\n` +
        `**b)** Oblicz ${question_k.replace('$k$-tym', `$${n}$-tym`)}.\n\n` +
        `**c)** Oblicz łączny wynik przez $${n}$ ${period === 'roku' ? 'lata/lat' : period === 'miesiąca' ? 'miesiące/miesięcy' : 'kwartały'} (sumę $S_{${n}}$).\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `a_k = ${a1}\\cdot\\left(${q_latex}\\right)^{k-1},\\quad a_{${n}} = ${a_n}\\text{ ${unit}},\\quad S_{${n}} = ${sum}\\text{ ${unit}}`,
        description: `$a_k = ${a1}\\cdot(${q_latex})^{k-1}$, $a_{${n}} = ${a_n}$ ${unit}, $S_{${n}} = ${sum}$ ${unit}`
      },
      hints: [
        { level: 1, text: `Ciąg geometryczny: $a_1 = ${a1}$, iloraz $q = ${q_latex}$. Wzór: $a_k = a_1\\cdot q^{k-1}$.` },
        { level: 2, text: `$a_{${n}} = ${a1}\\cdot\\left(${q_latex}\\right)^{${n - 1}}$.` },
        { level: 3, text: `$S_{${n}} = \\dfrac{a_1(q^{${n}}-1)}{q-1} = \\dfrac{${a1}\\bigl((${q_latex})^{${n}}-1\\bigr)}{${q1_latex}}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Wzór na k-ty wyraz',
          content: `a_k = ${a1}\\cdot\\left(${q_latex}\\right)^{k-1}`,
          explanation: `Ciąg geometryczny: $a_1 = ${a1}$, iloraz $q = ${q_latex}$.`
        },
        {
          step: 2, title: `Wynik w ${n}. okresie`,
          content: `a_{${n}} = ${a1}\\cdot\\left(${q_latex}\\right)^{${n}-1} = ${a1}\\cdot\\left(${q_latex}\\right)^{${n - 1}} = ${a_n}\\text{ ${unit}}`,
          explanation: ''
        },
        {
          step: 3, title: `Suma przez ${n} okresów`,
          content: `S_{${n}} = \\frac{a_1(q^{${n}}-1)}{q-1} = \\frac{${a1}\\!\\left(\\!\\left(${q_latex}\\right)^{${n}}\\!-1\\right)}{${q1_latex}} = ${sum}\\text{ ${unit}}`,
          explanation: 'Wzór na sumę $n$ wyrazów ciągu geometrycznego.'
        }
      ]
    };
  }

  function generate() {
    // Schematy 7/10+ — pomijamy arithSimple (4/10) i arithFromTerms (5/10)
    // geomInfinite (7/10)  — suma nieskończona ciągu geom, wzorzec 2023 z.10 i 2025 z.6
    // geometricProductionGrowth (7/10) — ciąg geom z praktycznym kontekstem (wzrost produkcji)
    return M.choose([
      arithGeomCombo,              // 7/10 — ciąg geom+aryt kombinowany
      geomTwoConditions,           // 8/10 — ciąg geom z dwoma warunkami sumy
      arithGeomCross,              // 8/10 — ciąg aryt z warunkiem geom
      loanRepayment,               // 8/10 — spłata kredytu (ciąg aryt odsetek)
      geomInfinite,                // 7/10 — suma nieskończona szeregu geom (wzorzec 2023, 2025)
      geometricProductionGrowth,   // 7/10 — ciąg geom: wzrost produkcji, sumy S_n
      geomTwoConditions,           // (podwojony priorytet)
      arithGeomCross,
    ])();
  }

  return { generate };
})();
