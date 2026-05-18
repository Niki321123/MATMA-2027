// Kategoria 7: Ciągi liczbowe
// Wzorzec 2025 z.6: ciąg geometryczny zbieżny, a₁+a₃=20, a₁²+a₃²=328, suma wszystkich
// Wzorzec 2026 z.6: ciąg arytmetyczny + geometryczny, suma wszystkich
// Wzorzec 2024 z.7: trzywyrazowy ciąg geometryczny + arytmetyczny
// Wzorzec 2023 z.10: kwadraty (ciąg geometryczny), suma nieskończona
window.cat07 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Ciąg arytmetyczny + geometryczny (kombinowany) ===
  function arithGeomCombo(diff) {
    // Jak matura 2024 z.7: (x,y,z) geometryczny, x+y+z=S; x,y,z = a1,a2,a6 arytmetycznego
    const templates = [
      // Wariant 1: suma = S, pierwsze wyrazy ciągu geom. = a1,a2,a6 aritm.
      () => {
        // Dobierz ładne liczby
        const q = M.choose(diff === 'easy' ? [2,3] : [2,3,4,5]);
        const x = M.choose(diff === 'easy' ? [1,2,4,5] : [1,2,3,4,5]);
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
      // Wariant 2: ciąg geometryczny zbieżny, dane a₁+a₃ i a₁²+a₃²
      () => {
        const a1 = M.choose(diff === 'easy' ? [4, 6, 8, 10] : [4, 6, 8, 10, 12, 15]);
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
          difficulty: diff,
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
  function arithSimple(diff) {
    const a1 = M.choose(diff === 'easy' ? [1,2,3,4,5] : [-5,-4,-3,-2,-1,1,2,3,4,5,6,7]);
    const r = M.choose(diff === 'easy' ? [1,2,3] : [-3,-2,-1,1,2,3,4,5]);
    const n = M.choose(diff === 'easy' ? [5,6,8,10] : [10,12,15,20,25]);
    // Sn = n/2 · (2a1 + (n-1)r)
    const Sn = n * (2 * a1 + (n - 1) * r) / 2;

    return {
      id: M.makeId('cat07_arith'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'arithmetic_sum',
      difficulty: diff,
      points: 3,
      params: { a1, r, n, Sn },
      statement:
        `Dany jest ciąg arytmetyczny $(a_n)$, w którym $a_1 = ${a1}$ i różnica $r = ${r}$.\n\n` +
        `**Oblicz sumę $S_{${n}}$ pierwszych $${n}$ wyrazów tego ciągu.** Zapisz obliczenia.`,
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
  function geomInfinite(diff) {
    const a1 = M.choose(diff === 'easy' ? [2,4,6,8,10,12] : [1,2,3,4,5,6,8,10,12,15,18,20]);
    const q_choices = diff === 'easy'
      ? [{p:1,q:2},{p:1,q:3},{p:2,q:3}]
      : [{p:1,q:2},{p:1,q:3},{p:1,q:4},{p:2,q:3},{p:3,q:4},{p:1,q:5}];
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

    return {
      id: M.makeId('cat07_geom_inf'),
      category: 7,
      categoryName: 'Ciągi liczbowe',
      type: 'geom_infinite_sum',
      difficulty: diff,
      points: 4,
      params: { a1, qf, S_num, S_den },
      statement:
        `Ciąg $(a_n)$ jest geometryczny i zbieżny. ${dataStr}.\n\n` +
        `**Oblicz sumę wszystkich wyrazów tego ciągu.** Zapisz obliczenia.`,
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

  function generate(diff = 'medium') {
    return M.choose([arithGeomCombo, geomInfinite, diff === 'easy' ? arithSimple : arithGeomCombo])(diff);
  }

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
