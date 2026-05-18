// Kategoria 2: Granica ciągu lub funkcji
// Wzorzec z matur: lim n→∞ wyrażenia wymierne, granica jednostronna
window.cat02 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: granica ciągu wymiernego ===
  // lim (an^k + ...) / (bn^k + ...) = a/b
  function seqLimit(diff) {
    const a = M.nonZeroRand(-5, 5);
    const b = M.nonZeroRand(-5, 5);
    let c = M.rand(-4, 4);
    let d = M.rand(-4, 4);
    const limit = M.simplifyFraction(a, b);

    // Upewnij się że a/b jest nieskracalne i różne od 0
    const g = M.gcd(Math.abs(a), Math.abs(b));
    const aN = a / g, bN = b / g;

    const degree = diff === 'easy' ? 2 : diff === 'medium' ? 3 : M.choose([3, 4]);

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
      difficulty: diff,
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
  function funcLimit(diff) {
    const a = M.choose(diff === 'easy' ? [1, 2, 3] : [2, 3, 4, -1, -2]);
    const n = diff === 'easy' ? 2 : M.choose([2, 3]);
    const an = Math.pow(a, n);
    const limit_val = n * Math.pow(a, n - 1);

    // Numerator: x^n - a^n, Denominator: (x - a)^k
    const k = diff === 'hard' ? 2 : 1;

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
      difficulty: diff,
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

  // === SCHEMAT C: granica ciągu z potęgą ===
  function powerSeqLimit(diff) {
    // ((n+a)/(n+b))^n → e^(a-b)  — ale to skomplikowane
    // Prostsze: ((an+b)/(cn+d))^(2n) → (a/c)^2
    const a = M.choose([1, 2, 3]);
    const b = M.choose([1, 2, 3]);
    const c = M.choose([1, 2, 3]);
    let d = M.choose([1, 2, 3]);
    if (a === c && b === d) { d += 1; }

    const innerLimit = a / c; // granica (an+b)/(cn+d) = a/c
    const exp_power = diff === 'easy' ? 1 : M.choose([2, 3]);
    const finalLimit = Math.pow(innerLimit, exp_power);
    const limitDisplay = M.latexFrac(Math.pow(a, exp_power), Math.pow(c, exp_power));

    const numStr = `${a === 1 ? '' : a}n${b > 0 ? `+${b}` : b < 0 ? b : ''}`;
    const denStr = `${c === 1 ? '' : c}n${d > 0 ? `+${d}` : d < 0 ? d : ''}`;
    const powStr = exp_power === 1 ? '' : `^{${exp_power}}`;

    return {
      id: M.makeId('cat02_pow'),
      category: 2,
      categoryName: 'Granica',
      type: 'power_seq_limit',
      difficulty: diff,
      points: 2,
      params: { a, b, c, d, exp_power, finalLimit },
      statement:
        `Oblicz granicę\n` +
        `$$\\lim_{n \\to +\\infty} \\left(\\frac{${numStr}}{${denStr}}\\right)${powStr}$$\n` +
        `Zapisz obliczenia.`,
      answer: {
        type: 'number',
        value: finalLimit,
        display: limitDisplay,
        description: `$\\lim = ${limitDisplay}$`
      },
      hints: [
        { level: 1, text: `Oblicz najpierw granicę wyrażenia w nawiasie: $\\lim_{n\\to\\infty} \\frac{${numStr}}{${denStr}}$.` },
        { level: 2, text: `Po podzieleniu przez $n$: $\\frac{${a}+${b}/n}{${c}+${d}/n} \\to \\frac{${a}}{${c}}$.` },
        { level: 3, text: `Granica $= \\left(\\frac{${a}}{${c}}\\right)^{${exp_power}} = ${limitDisplay}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Granica wyrażenia wewnętrznego',
          content: `$\\frac{${numStr}}{${denStr}} = \\frac{${a} + \\frac{${b}}{n}}{${c} + \\frac{${d}}{n}} \\xrightarrow{n\\to\\infty} \\frac{${a}}{${c}}$`,
          explanation: 'Dzielimy przez n i korzystamy z faktu, że 1/n → 0.'
        },
        {
          step: 2, title: 'Podniesienie do potęgi',
          content: `$\\left(\\frac{${a}}{${c}}\\right)^{${exp_power}} = \\mathbf{${limitDisplay}}$`,
          explanation: 'Granica potęgi = potęga granicy (dla skończonych granic).'
        }
      ]
    };
  }

  function generate(diff = 'medium') {
    const gen = M.choose([seqLimit, funcLimit, powerSeqLimit]);
    return gen(diff);
  }

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
