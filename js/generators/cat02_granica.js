// Kategoria 2: Granica ciągu lub funkcji
// Wzorzec z matur: lim n→∞ wyrażenia wymierne, granica jednostronna
window.cat02 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: granica ciągu wymiernego ===
  // lim (an^k + ...) / (bn^k + ...) = a/b
  function seqLimit() {
    const a = M.nonZeroRand(-5, 5);
    const b = M.nonZeroRand(-5, 5);
    let c = M.rand(-4, 4);
    let d = M.rand(-4, 4);
    const limit = M.simplifyFraction(a, b);

    // Upewnij się że a/b jest nieskracalne i różne od 0
    const g = M.gcd(Math.abs(a), Math.abs(b));
    const aN = a / g, bN = b / g;

    const degree = M.choose([3, 4]);

    // Buduj numerator i denominator
    let numStr, denStr;
    if (degree === 2) {
      const e = M.rand(-3, 3), f = M.rand(-3, 3);
      numStr = buildPolyN(aN, c, e, 2);
      denStr = buildPolyN(bN, d, f, 2);
    } else if (degree === 3) {
      const e = M.rand(-3, 3), f = M.rand(-3, 3);
      numStr = buildPolyN(aN, c, e, 3);
      denStr = buildPolyN(bN, d, f, 3);
    } else {
      const e = M.rand(-3, 3);
      numStr = buildPolyN(aN, c, e, 4);
      denStr = buildPolyN(bN, d, e, 4);
    }

    const limitDisplay = M.latexFrac(aN, bN);

    return {
      id: M.makeId('cat02_seq'),
      category: 2,
      categoryName: 'Granica',
      type: 'sequence_limit',
      points: 2,
      params: { aN, bN, c, d, degree, limit: aN / bN },
      statement:
        `Oblicz granicę\n` +
        `$$\\lim_{n \\to +\\infty} \\frac{${numStr}}{${denStr}}$$\n` +
        `Zapisz obliczenia.`,
      answer: {
        type: 'number',
        value: aN / bN,
        display: limitDisplay,
        description: `$\\lim = ${limitDisplay}$`
      },
      hints: [
        { level: 1, text: `Podziel licznik i mianownik przez $n^{${degree}}$ (najwyższa potęga).` },
        { level: 2, text: `Każdy wyraz postaci $\\frac{c}{n^k} \\to 0$ gdy $n \\to +\\infty$. Zostają tylko współczynniki przy $n^{${degree}}$.` },
        { level: 3, text: `Granica = $\\dfrac{${aN}}{${bN}} = ${limitDisplay}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Podział przez najwyższą potęgę',
          content: `Dzielimy licznik i mianownik przez $n^{${degree}}$:\n$$\\frac{${numStr}}{${denStr}} = \\frac{${buildDivN(aN, c, degree)}}{${buildDivN(bN, d, degree)}}$$`,
          explanation: `Jeśli stopień licznika = stopień mianownika, granica = iloraz współczynników wiodących.`
        },
        {
          step: 2, title: 'Przejście do granicy',
          content: `Wyrazy postaci $\\frac{\\text{const}}{n^k} \\to 0$, więc\n$$\\lim_{n \\to +\\infty} = \\frac{${aN} + 0 + \\ldots}{${bN} + 0 + \\ldots} = \\frac{${aN}}{${bN}} = ${limitDisplay}$$`,
          explanation: 'Zostają tylko wiodące współczynniki.'
        }
      ]
    };
  }

  function buildPolyN(leading, mid, low, deg) {
    let s = '';
    if (deg >= 4) s += `${leading === 1 ? '' : leading === -1 ? '-' : leading}n^4`;
    if (deg >= 3) s += deg === 3 ? `${leading === 1 ? '' : leading === -1 ? '-' : leading}n^3` : `${mid >= 0 ? '+' : ''}${mid}n^3`;
    if (deg >= 2) s += `${mid >= 0 && deg <= 3 ? (mid === 0 ? '' : (mid > 0 ? '+' : '') + mid) : (low >= 0 ? '+' : '') + low}n^2`;
    if (low !== 0 && deg <= 3) s += `${low > 0 ? '+' : ''}${low}n`;

    // Simplified: just construct readable polynomial
    const terms = [];
    if (deg === 2) {
      if (leading !== 0) terms.push(leading === 1 ? 'n^2' : leading === -1 ? '-n^2' : `${leading}n^2`);
      if (mid !== 0) terms.push(mid > 0 ? `+${mid}n` : `${mid}n`);
      if (low !== 0) terms.push(low > 0 ? `+${low}` : `${low}`);
    } else if (deg === 3) {
      if (leading !== 0) terms.push(leading === 1 ? 'n^3' : leading === -1 ? '-n^3' : `${leading}n^3`);
      if (mid !== 0) terms.push(mid > 0 ? `+${mid}n^2` : `${mid}n^2`);
      if (low !== 0) terms.push(low > 0 ? `+${low}n` : `${low}n`);
    } else {
      if (leading !== 0) terms.push(leading === 1 ? 'n^4' : leading === -1 ? '-n^4' : `${leading}n^4`);
      if (mid !== 0) terms.push(mid > 0 ? `+${mid}n^2` : `${mid}n^2`);
    }
    let result = terms.join('').replace(/^\+/, '');
    return result || '0';
  }

  function buildDivN(leading, mid, deg) {
    if (deg === 2) return `${leading}${mid !== 0 ? (mid > 0 ? '+\\frac{' + mid + '}{n}' : '-\\frac{' + Math.abs(mid) + '}{n}') : ''}`;
    return `${leading}${mid !== 0 ? (mid > 0 ? '+\\frac{' + mid + '}{n}' : '-\\frac{' + Math.abs(mid) + '}{n}') : ''}+\\ldots`;
  }

  // === SCHEMAT B: granica funkcji wymiernej w punkcie ===
  // lim (x^n - a^n)/(x - a) = n·a^(n-1)
  function funcLimit() {
    const a = M.choose([2, 3, 4, -1, -2, -3]);
    const n = M.choose([2, 3]);
    const an = Math.pow(a, n);
    const limit_val = n * Math.pow(a, n - 1);

    const k = M.choose([1, 1, 2]); // mostly k=1, occasionally k=2

    let numStr = `x^${n}${an >= 0 ? '-' : '+'}${Math.abs(an)}`;
    let denStr = a === 0 ? 'x' : a > 0 ? `(x-${a})${k > 1 ? '^' + k : ''}` : `(x+${Math.abs(a)})${k > 1 ? '^' + k : ''}`;

    let dir = M.choose(['+', '-']);
    let limitDisplay;
    if (k === 1) {
      limitDisplay = String(limit_val);
    } else {
      // lim (x^2-4)/(x-2)^2 as x→2⁻  → +∞ or -∞
      limitDisplay = dir === '-' ? '-\\infty' : '+\\infty';
    }

    return {
      id: M.makeId('cat02_func'),
      category: 2,
      categoryName: 'Granica',
      type: 'function_limit',
      points: 2,
      params: { a, n, k, dir, limit_val },
      statement:
        `Oblicz granicę\n` +
        `$$\\lim_{x \\to ${a}${k > 1 ? '^{' + dir + '}' : ''}} \\frac{${numStr}}{${denStr}}$$\n` +
        `Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        value: limit_val,
        display: limitDisplay,
        description: `Granica $= ${limitDisplay}$`
      },
      hints: [
        k === 1
          ? { level: 1, text: `Rozłóż licznik na czynniki: $x^${n} - ${an} = (x - ${a})(x^{${n - 1}} + \\ldots + ${Math.pow(a, n - 1)})$. Skróć $(x - ${a})$.` }
          : { level: 1, text: `Rozłóż licznik: $${numStr} = (x-${a})(x+${a})$. Skróć jeden czynnik $(x-${a})$ z mianownika.` },
        { level: 2, text: `Po skróceniu zostaje granica wyrażenia, które ${k === 1 ? 'jest ciągłe w ' + a : 'dąży do ±∞'}.` },
        { level: 3, text: `Wynik: $${limitDisplay}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Rozkład na czynniki',
          content: k === 1
            ? `$x^${n} - ${an} = (x - ${a})(x^{${n - 1}} + ${a > 0 ? a : '(' + a + ')'}x^{${n - 2}} + \\ldots + ${Math.pow(a, n - 1)})$`
            : `$${numStr} = (x - ${a})(x + ${a})$`,
          explanation: 'Wzór na rozkład różnicy potęg lub suma/różnica kwadratów.'
        },
        {
          step: 2, title: 'Skrócenie i obliczenie granicy',
          content: k === 1
            ? `Po skróceniu $(x - ${a})$: $\\lim_{x \\to ${a}} (x^{${n - 1}} + \\ldots + ${Math.pow(a, n - 1)}) = ${n} \\cdot ${a}^{${n - 1}} = \\mathbf{${limit_val}}$`
            : `Po skróceniu: $\\lim_{x \\to ${a}^{${dir}}} \\frac{x + ${a}}{x - ${a}} = \\mathbf{${limitDisplay}}$ (mianownik dąży do $0^{${dir}}$)`,
          explanation: 'Podstawiamy x = a do uproszczonego wyrażenia lub badamy znak.'
        }
      ]
    };
  }

  // === SCHEMAT C: lim (√(n²+an) − n) — technika sprzężenia ===
  // Wzorzec maturalny: wymaga mnożenia przez sprzężone, nie trywialne
  function sqrtLimit() {
    const a = M.choose([2, 4, 6, 8, 10]);
    const half_a = a / 2;
    const dispResult = Number.isInteger(half_a) ? String(half_a) : M.latexFrac(a, 2);

    return {
      id: M.makeId('cat02_sqrt'),
      category: 2,
      categoryName: 'Granica',
      type: 'sqrt_limit',
      points: 3,
      params: { a },
      statement:
        `Oblicz granicę\n` +
        `$$\\lim_{n \\to +\\infty} \\left(\\sqrt{n^2 + ${a}n} - n\\right)$$\n` +
        `Zapisz obliczenia.`,
      answer: {
        type: 'number',
        value: half_a,
        display: dispResult,
        description: `$\\lim = ${dispResult}$`
      },
      hints: [
        { level: 1, text: `Pomnóż i podziel przez wyrażenie sprzężone: $\\dfrac{(\\sqrt{n^2+${a}n}-n)(\\sqrt{n^2+${a}n}+n)}{\\sqrt{n^2+${a}n}+n}$.` },
        { level: 2, text: `Licznik po pomnożeniu: $(n^2+${a}n) - n^2 = ${a}n$. Dostajemy $\\dfrac{${a}n}{\\sqrt{n^2+${a}n}+n}$.` },
        { level: 3, text: `Podziel przez $n$: $\\dfrac{${a}}{\\sqrt{1+\\frac{${a}}{n}}+1} \\xrightarrow{n\\to\\infty} \\dfrac{${a}}{1+1} = ${dispResult}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Mnożenie przez sprzężone',
          content: `\\sqrt{n^2+${a}n}-n = \\frac{(\\sqrt{n^2+${a}n}-n)(\\sqrt{n^2+${a}n}+n)}{\\sqrt{n^2+${a}n}+n} = \\frac{n^2+${a}n-n^2}{\\sqrt{n^2+${a}n}+n} = \\frac{${a}n}{\\sqrt{n^2+${a}n}+n}`,
          explanation: 'Technika: $(A-B)(A+B)=A^2-B^2$. Eliminujemy różnicę pod pierwiastkiem.'
        },
        {
          step: 2, title: 'Podział przez n',
          content: `\\frac{${a}n}{\\sqrt{n^2+${a}n}+n} = \\frac{${a}}{\\frac{\\sqrt{n^2+${a}n}}{n}+1} = \\frac{${a}}{\\sqrt{\\frac{n^2+${a}n}{n^2}}+1} = \\frac{${a}}{\\sqrt{1+\\frac{${a}}{n}}+1}`,
          explanation: `$\\frac{\\sqrt{n^2+${a}n}}{n} = \\sqrt{1+\\frac{${a}}{n}}$ — wyłączamy $n$ spod pierwiastka.`
        },
        {
          step: 3, title: 'Obliczenie granicy',
          content: `\\lim_{n\\to+\\infty} \\frac{${a}}{\\sqrt{1+\\frac{${a}}{n}}+1} = \\frac{${a}}{\\sqrt{1+0}+1} = \\frac{${a}}{2} = \\mathbf{${dispResult}}`,
          explanation: `$\\frac{${a}}{n}\\to 0$, więc $\\sqrt{1+\\frac{${a}}{n}}\\to 1$.`
        }
      ]
    };
  }

  // === SCHEMAT D: granica ciągu z czynnikiem wykładniczym vs wielomianem ===
  // lim (a·n + b) / a^n → 0  lub  lim (a^n + b^n) / a^n → 1 (a > b)
  function expVsPolyLimit() {
    const type = M.choose(['poly_over_exp', 'exp_ratio']);

    if (type === 'poly_over_exp') {
      // lim n^k / a^n = 0  (wielomian vs wykładnicza)
      const a = M.choose([2, 3, 4]);
      const k = M.choose([1, 2, 3]);
      const powStr = k === 1 ? 'n' : `n^${k}`;
      return {
        id: M.makeId('cat02_exp_poly'),
        category: 2, categoryName: 'Granica',
        type: 'exp_vs_poly', points: 3,
        params: { a, k },
        statement: `Oblicz granicę\n$$\\lim_{n\\to+\\infty} \\frac{${powStr}}{${a}^n}$$\nZapisz obliczenia.`,
        answer: { type: 'number', value: 0, display: '0', description: '$\\lim = 0$' },
        hints: [
          { level: 1, text: `Funkcja wykładnicza $${a}^n$ rośnie szybciej niż każda potęga $n^k$.` },
          { level: 2, text: `Skorzystaj z tw.: $\\lim_{n\\to\\infty} \\frac{n^k}{a^n} = 0$ dla każdego $k\\in\\mathbb{N}$ i $a > 1$.` },
          { level: 3, text: `Dowód: kryterium ilorazowe — $\\frac{a_{n+1}}{a_n} = \\frac{(n+1)^k}{n^k}\\cdot\\frac{1}{a} = \\left(1+\\frac{1}{n}\\right)^k\\cdot\\frac{1}{a} \\to \\frac{1}{a} < 1$.` }
        ],
        solution: [
          { step: 1, title: 'Kryterium ilorazowe', content: `\\frac{a_{n+1}}{a_n} = \\frac{(n+1)^${k}}{n^${k}} \\cdot \\frac{1}{${a}} = \\left(1+\\frac{1}{n}\\right)^{${k}} \\cdot \\frac{1}{${a}}`, explanation: '' },
          { step: 2, title: 'Granica ilorazu', content: `\\lim_{n\\to\\infty}\\frac{a_{n+1}}{a_n} = 1^{${k}} \\cdot \\frac{1}{${a}} = \\frac{1}{${a}} < 1`, explanation: 'Skoro iloraz kolejnych wyrazów dąży do wartości $<1$, ciąg dąży do 0.' },
          { step: 3, title: 'Wniosek', content: `\\lim_{n\\to+\\infty}\\frac{${powStr}}{${a}^n} = \\mathbf{0}`, explanation: '' }
        ]
      };
    }

    // type === 'exp_ratio': lim (a^n + b^n) / (a^n + c) = 1  [a > b, wyłącz a^n]
    const a = M.choose([3, 4, 5]);
    const b = M.choose([1, 2]);
    const c = M.choose([1, 2, 3, 4, 5]);

    return {
      id: M.makeId('cat02_exp_ratio'),
      category: 2, categoryName: 'Granica',
      type: 'exp_ratio', points: 3,
      params: { a, b, c },
      statement: `Oblicz granicę\n$$\\lim_{n\\to+\\infty} \\frac{${a}^n + ${b}^n}{${a}^n + ${c}}$$\nZapisz obliczenia.`,
      answer: { type: 'number', value: 1, display: '1', description: '$\\lim = 1$' },
      hints: [
        { level: 1, text: `Podziel licznik i mianownik przez $${a}^n$ (dominujący składnik).` },
        { level: 2, text: `$\\frac{1 + (${b}/${a})^n}{1 + ${c}/${a}^n}$. Co dąży do 0?` },
        { level: 3, text: `$(\\frac{${b}}{${a}})^n \\to 0$ (bo $\\frac{${b}}{${a}} < 1$) i $\\frac{${c}}{${a}^n} \\to 0$. Granica $= \\frac{1+0}{1+0} = 1$.` }
      ],
      solution: [
        { step: 1, title: 'Podział przez dominujący składnik $${a}^n$', content: `\\frac{${a}^n+${b}^n}{${a}^n+${c}} = \\frac{1+\\left(\\frac{${b}}{${a}}\\right)^n}{1+\\frac{${c}}{${a}^n}}`, explanation: 'Wyłączamy $${a}^n$ z licznika i mianownika.' },
        { step: 2, title: 'Granice składników', content: `\\left(\\frac{${b}}{${a}}\\right)^n \\to 0\\text{ (bo }\\frac{${b}}{${a}}<1\\text{)},\\quad \\frac{${c}}{${a}^n} \\to 0`, explanation: '' },
        { step: 3, title: 'Wynik', content: `\\lim = \\frac{1+0}{1+0} = \\mathbf{1}`, explanation: '' }
      ]
    };
  }

  // === SCHEMAT E: granica √(an²+bn) − √(an²+cn) — sprzężenie z dwoma pierwiastkami ===
  // Wzorzec maturalny 8/10: lim (√(4n²+3n) − 2n) = 3/4, lub ogólnie lim (√(k²n²+an) − kn)
  // Wymaga: mnożenia przez sprzężone, wyłączenia n z pod pierwiastka
  function sqrtLimitCompound() {
    const TEMPLATES = [
      // lim (√(4n²+6n) − 2n) = 6/4 = 3/2
      { kStr: '2', k: 2, a: 6, expr: '\\sqrt{4n^2 + 6n} - 2n',
        result: '\\dfrac{3}{2}', resultVal: 3/2,
        conj: '\\sqrt{4n^2+6n}+2n',
        step2: '\\frac{4n^2+6n-4n^2}{\\sqrt{4n^2+6n}+2n} = \\frac{6n}{\\sqrt{4n^2+6n}+2n}',
        step3: '\\frac{6}{\\sqrt{4+\\frac{6}{n}}+2} \\xrightarrow{n\\to\\infty} \\frac{6}{2+2} = \\frac{6}{4} = \\frac{3}{2}' },
      // lim (√(9n²+12n) − 3n) = 12/6 = 2
      { kStr: '3', k: 3, a: 12, expr: '\\sqrt{9n^2 + 12n} - 3n',
        result: '2', resultVal: 2,
        conj: '\\sqrt{9n^2+12n}+3n',
        step2: '\\frac{9n^2+12n-9n^2}{\\sqrt{9n^2+12n}+3n} = \\frac{12n}{\\sqrt{9n^2+12n}+3n}',
        step3: '\\frac{12}{\\sqrt{9+\\frac{12}{n}}+3} \\xrightarrow{n\\to\\infty} \\frac{12}{3+3} = \\frac{12}{6} = 2' },
      // lim (√(4n²+n+3) − √(4n²+3n+1)) = (1−3)/(2·2) = −1/2
      { kStr: null, a: 1, b: 3, c: 3, d: 1,
        expr: '\\sqrt{4n^2+n+3} - \\sqrt{4n^2+3n+1}',
        result: '-1', resultVal: -1,
        conj: '\\sqrt{4n^2+n+3}+\\sqrt{4n^2+3n+1}',
        step2: '\\frac{(4n^2+n+3)-(4n^2+3n+1)}{\\sqrt{4n^2+n+3}+\\sqrt{4n^2+3n+1}} = \\frac{-2n+2}{\\sqrt{4n^2+n+3}+\\sqrt{4n^2+3n+1}}',
        step3: '\\frac{-2+\\frac{2}{n}}{\\sqrt{4+\\frac{1}{n}+\\frac{3}{n^2}}+\\sqrt{4+\\frac{3}{n}+\\frac{1}{n^2}}} \\xrightarrow{n\\to\\infty} \\frac{-2}{2+2} = -\\frac{1}{2}',
        result: '-\\dfrac{1}{2}', resultVal: -0.5 },
      // lim n·(√(1+3/n) − 1) = 3/2 (rozwinięcie √(1+x)≈1+x/2)
      { kStr: 'lin', a: 3, expr: 'n\\left(\\sqrt{1+\\dfrac{3}{n}}-1\\right)',
        result: '\\dfrac{3}{2}', resultVal: 1.5,
        conj: '\\sqrt{1+\\frac{3}{n}}+1',
        step2: 'n \\cdot \\frac{1+\\frac{3}{n}-1}{\\sqrt{1+\\frac{3}{n}}+1} = n \\cdot \\frac{\\frac{3}{n}}{\\sqrt{1+\\frac{3}{n}}+1} = \\frac{3}{\\sqrt{1+\\frac{3}{n}}+1}',
        step3: '\\frac{3}{\\sqrt{1+0}+1} = \\frac{3}{2}' },
    ];

    const tpl = M.choose(TEMPLATES);

    return {
      id: M.makeId('cat02_sqrt2'),
      category: 2,
      categoryName: 'Granica',
      type: 'sqrt_limit_compound',
      points: 4,
      params: tpl,
      statement:
        `Oblicz granicę\n$$\\lim_{n \\to +\\infty} ${tpl.expr}$$\nZapisz obliczenia.`,
      answer: {
        type: 'expression',
        value: tpl.resultVal,
        display: tpl.result,
        description: `$\\lim = ${tpl.result}$`
      },
      hints: [
        { level: 1, text: `Zastosuj technikę sprzężenia: pomnóż licznik i mianownik przez $${tpl.conj}$.` },
        { level: 2, text: `Po pomnożeniu: $${tpl.step2}$.` },
        { level: 3, text: `Podziel przez $n$ i oblicz granicę: $${tpl.step3}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Mnożenie przez sprzężone',
          content: `${tpl.expr} = \\frac{\\left(${tpl.expr.replace(/^n\\left\\(/, '').replace(/\\right\\)$/, '')}\\right)\\cdot\\left(${tpl.conj}\\right)}{${tpl.conj}}`,
          explanation: 'Technika sprzężenia eliminuje różnicę pierwiastków.'
        },
        { step: 2, title: 'Uproszczenie', content: tpl.step2, explanation: '$(A-B)(A+B) = A^2 - B^2$.' },
        { step: 3, title: 'Granica', content: tpl.step3, explanation: 'Wyrazy postaci $\\frac{c}{n^k} \\to 0$.' }
      ]
    };
  }

  function generate() {
    // funcLimit (rozkład na czynniki, nieoznaczoność 0/0)
    // sqrtLimit (sprzężenie — klasyczne)
    // sqrtLimitCompound (sprzężenie z trudniejszą strukturą — 8/10)
    return M.choose([funcLimit, sqrtLimit, sqrtLimitCompound, sqrtLimitCompound, funcLimit])();
  }

  return { generate };
})();
