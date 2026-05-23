// Kategoria 9: Równania trygonometryczne  — PROCEDURAL GENERATOR
// Bazuje na MathEngineering.trigEquationProcedural.
//
// Wzorce maturalne:
//   2024 z.6: sin4x − sin2x = 4cos²x − 3
//   2025 z.8: 3cos²x + √3 sin2x − 3sin²x = 0  → tg2x = -√3
//   2023 z.7: 2sin²x − 3sinx + 1 = 0
//   2026 z.8: sin6x − 2sin2x = 0  (faktoryzacja przez sin2x)
//   2018 z.8: sin6x + cos3x = 2sin3x + 1  (faktoryzacja przez dwumian)
//   2022 z.8: sinx + cosx = 1  (metoda kąta pomocniczego)

window.cat09 = (() => {
  const M = window.MathUtils;
  const ME = window.MathEngineering;

  // ===== Wyniki dla popularnych wartości sin/cos =====
  // Zwraca listę rozwiązań w [0, 2π) dla sin x = v, cos x = v
  function solutionsForSin(v, domain = '[0, 2pi)') {
    const sols = [];
    if (Math.abs(v - 1) < 1e-9) sols.push({ tex: '\\frac{\\pi}{2}', val: Math.PI/2 });
    else if (Math.abs(v + 1) < 1e-9) sols.push({ tex: '\\frac{3\\pi}{2}', val: 3*Math.PI/2 });
    else if (Math.abs(v) < 1e-9) {
      sols.push({ tex: '0', val: 0 });
      sols.push({ tex: '\\pi', val: Math.PI });
    } else {
      // sin x = v: x = arcsin(v), x = π - arcsin(v) (oraz +2kπ)
      const base = baseAngle(v);
      if (v > 0) {
        sols.push({ tex: base.tex, val: base.val });
        sols.push({ tex: piMinus(base), val: Math.PI - base.val });
      } else {
        sols.push({ tex: `\\pi + ${base.tex}`, val: Math.PI + Math.abs(base.val) });
        sols.push({ tex: `2\\pi - ${base.tex}`, val: 2*Math.PI - Math.abs(base.val) });
      }
    }
    return sols;
  }
  function solutionsForCos(v) {
    const sols = [];
    if (Math.abs(v - 1) < 1e-9) sols.push({ tex: '0', val: 0 });
    else if (Math.abs(v + 1) < 1e-9) sols.push({ tex: '\\pi', val: Math.PI });
    else if (Math.abs(v) < 1e-9) {
      sols.push({ tex: '\\frac{\\pi}{2}', val: Math.PI/2 });
      sols.push({ tex: '\\frac{3\\pi}{2}', val: 3*Math.PI/2 });
    } else {
      const base = baseAngle(v, 'cos');
      if (v > 0) {
        sols.push({ tex: base.tex, val: base.val });
        sols.push({ tex: `2\\pi - ${base.tex}`, val: 2*Math.PI - base.val });
      } else {
        sols.push({ tex: piMinus(base), val: Math.PI - Math.abs(base.val) });
        sols.push({ tex: `\\pi + ${base.tex}`, val: Math.PI + Math.abs(base.val) });
      }
    }
    return sols;
  }
  function baseAngle(v, type = 'sin') {
    const va = Math.abs(v);
    if (Math.abs(va - 0.5) < 1e-9) return type === 'sin'
      ? { tex: '\\frac{\\pi}{6}', val: Math.PI/6 }
      : { tex: '\\frac{\\pi}{3}', val: Math.PI/3 };
    if (Math.abs(va - Math.sqrt(2)/2) < 1e-9) return { tex: '\\frac{\\pi}{4}', val: Math.PI/4 };
    if (Math.abs(va - Math.sqrt(3)/2) < 1e-9) return type === 'sin'
      ? { tex: '\\frac{\\pi}{3}', val: Math.PI/3 }
      : { tex: '\\frac{\\pi}{6}', val: Math.PI/6 };
    return { tex: '?', val: 0 };
  }
  function piMinus(angle) {
    if (angle.tex === '\\frac{\\pi}{6}') return '\\frac{5\\pi}{6}';
    if (angle.tex === '\\frac{\\pi}{4}') return '\\frac{3\\pi}{4}';
    if (angle.tex === '\\frac{\\pi}{3}') return '\\frac{2\\pi}{3}';
    return `\\pi - ${angle.tex}`;
  }

  // ====================================================================
  // SCHEMAT A: Równanie kwadratowe w sin x (lub cos x)
  // a·t² + b·t + c = 0  gdzie t = sin x (lub cos x), pierwiastki w [-1,1]
  // ====================================================================
  function quadraticInTrigFn() {
    for (let attempt = 0; attempt < 30; attempt++) {
      const fn = M.choose(['sin', 'cos']);
      // Wybierz pierwiastki w [-1, 1], przynajmniej jeden różny od 0,±1
      const niceVals = [-1, -0.5, 0, 0.5, 1];
      const t1 = M.choose(niceVals);
      let t2 = M.choose(niceVals.filter(v => v !== t1));
      // Wielomian: (t - t1)(t - t2) = t² - (t1+t2)t + t1·t2
      // Skalujemy by uniknąć ułamków
      const s = t1 + t2;
      const p = t1 * t2;
      // 2(t² - s·t + p) = 2t² - 2s·t + 2p
      const a = 2;
      const b = -2 * s;
      const c = 2 * p;
      if (!Number.isInteger(b) || !Number.isInteger(c)) continue;
      // Pozbądź się trywialnych wariantów
      if (t1 === 0 || t2 === 0) continue;  // chcemy ciekawsze
      if (Math.abs(t1) === 1 && Math.abs(t2) === 1) continue;

      const eqLatex = formatTrigQuadratic(a, b, c, fn);
      const sols1 = fn === 'sin' ? solutionsForSin(t1) : solutionsForCos(t1);
      const sols2 = fn === 'sin' ? solutionsForSin(t2) : solutionsForCos(t2);
      const allSols = [...sols1, ...sols2].sort((x, y) => x.val - y.val);
      const solSet = `x \\in \\left\\{${allSols.map(s => s.tex).join(',\\, ')}\\right\\}`;

      return {
        id: M.makeId('cat09_quad'),
        category: 9, categoryName: 'Równania trygonometryczne',
        type: 'quadratic_in_trig', points: 4,
        params: { a, b, c, fn, t1, t2 },
        statement: `Rozwiąż równanie\n$$${eqLatex} = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.`,
        answer: { type: 'set', display: solSet, description: `Zbiór rozwiązań: $${solSet}$` },
        hints: [
          { level: 1, text: `Podstaw $t = \\${fn} x$ i rozwiąż równanie kwadratowe $${a}t^2 ${b>=0?'+'+b:b}t ${c>=0?'+'+c:c} = 0$.` },
          { level: 2, text: `Pierwiastki: $t = ${formatRationalTrig(t1)}$ lub $t = ${formatRationalTrig(t2)}$.` },
          { level: 3, text: `Z $\\${fn} x = ${formatRationalTrig(t1)}$ oraz $\\${fn} x = ${formatRationalTrig(t2)}$ wyznacz wszystkie $x$ w $[0, 2\\pi)$.` },
        ],
        solution: [
          { step: 1, title: 'Podstawienie', content: `t = \\${fn} x \\implies ${a}t^2 ${b>=0?'+'+b:b}t ${c>=0?'+'+c:c} = 0`, explanation: '' },
          { step: 2, title: 'Rozkład', content: `(t - ${formatRationalTrig(t1)})(t - ${formatRationalTrig(t2)}) = 0 \\implies t = ${formatRationalTrig(t1)}\\text{ lub }t = ${formatRationalTrig(t2)}`, explanation: '' },
          { step: 3, title: `$\\${fn} x = ${formatRationalTrig(t1)}$`, content: `x \\in \\left\\{${sols1.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
          { step: 4, title: `$\\${fn} x = ${formatRationalTrig(t2)}$`, content: `x \\in \\left\\{${sols2.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
          { step: 5, title: 'Suma rozwiązań', content: solSet, explanation: '' },
        ],
      };
    }
    return null;
  }
  function formatTrigQuadratic(a, b, c, fn) {
    let s = '';
    if (a !== 0) s += a === 1 ? `\\${fn}^2 x` : a === -1 ? `-\\${fn}^2 x` : `${a}\\${fn}^2 x`;
    if (b !== 0) {
      if (b === 1) s += `+\\${fn} x`;
      else if (b === -1) s += `-\\${fn} x`;
      else if (b > 0) s += `+${b}\\${fn} x`;
      else s += `${b}\\${fn} x`;
    }
    if (c !== 0) s += c > 0 ? `+${c}` : `${c}`;
    return s.replace(/^\+/, '');
  }
  function formatRationalTrig(v) {
    if (v === 0) return '0';
    if (v === 1) return '1';
    if (v === -1) return '-1';
    if (v === 0.5) return '\\frac{1}{2}';
    if (v === -0.5) return '-\\frac{1}{2}';
    return String(v);
  }

  // ====================================================================
  // SCHEMAT B: Faktoryzacja przez sin lub cos (kąt podwójny)
  // sin(kx) = c·cos(mx)  lub  cos(kx) = c·sin(mx)
  // Po przekształceniu: sin(...)·(... ) = 0 → dwa przypadki
  // ====================================================================
  function doubleAngleFactor() {
    const templates = [
      // sin 2x = c·cos x  →  2 sin x cos x − c cos x = 0  →  cos x (2 sin x − c) = 0
      () => {
        const cVal = M.choose([1, -1, Math.sqrt(2), -Math.sqrt(2), Math.sqrt(3), -Math.sqrt(3)]);
        const cTex = cVal === Math.sqrt(2) ? '\\sqrt{2}' :
                     cVal === -Math.sqrt(2) ? '-\\sqrt{2}' :
                     cVal === Math.sqrt(3) ? '\\sqrt{3}' :
                     cVal === -Math.sqrt(3) ? '-\\sqrt{3}' : String(cVal);
        // sin 2x − c·cos x = 0
        const sinVal = cVal / 2;
        if (Math.abs(sinVal) > 1) return null;

        const sinSols = solutionsForSin(sinVal);
        const cosSols = solutionsForCos(0);
        const allSols = [...sinSols, ...cosSols].sort((a, b) => a.val - b.val);

        return {
          id: M.makeId('cat09_double_factor'),
          category: 9, categoryName: 'Równania trygonometryczne',
          type: 'double_angle_factor', points: 5,
          params: { cVal, sinVal },
          statement: `Rozwiąż równanie\n$$\\sin 2x = ${cTex}\\cos x$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.`,
          answer: { type: 'set', display: `x \\in \\left\\{${allSols.map(s => s.tex).join(',\\, ')}\\right\\}`, description: '' },
          hints: [
            { level: 1, text: 'Skorzystaj z $\\sin 2x = 2\\sin x\\cos x$.' },
            { level: 2, text: `Przenieś na jedną stronę i wyłącz $\\cos x$: $\\cos x(2\\sin x - ${cTex}) = 0$.` },
            { level: 3, text: `Dwa przypadki: $\\cos x = 0$ lub $\\sin x = ${formatRationalTrig(sinVal)}$.` },
          ],
          solution: [
            { step: 1, title: 'Wzór na sin 2x', content: '\\sin 2x = 2\\sin x\\cos x', explanation: '' },
            { step: 2, title: 'Przeniesienie i wyłączenie', content: `2\\sin x\\cos x - ${cTex}\\cos x = 0\\\\ \\cos x(2\\sin x - ${cTex}) = 0`, explanation: '' },
            { step: 3, title: '$\\cos x = 0$', content: `x \\in \\left\\{${cosSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
            { step: 4, title: `$\\sin x = ${formatRationalTrig(sinVal)}$`, content: `x \\in \\left\\{${sinSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
            { step: 5, title: 'Odpowiedź', content: `x \\in \\left\\{${allSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
          ],
        };
      },
      // cos 2x + a·cos x + b = 0  →  2cos²x − 1 + a·cos x + b = 0  →  kwadratowe w cos x
      () => {
        const a = M.choose([1, 2, 3, -1, -2, -3]);
        const bConst = M.choose([-3, -2, -1, 0, 1, 2]);
        // 2t² + at + (b-1) = 0   (gdzie t=cosx)
        const A = 2, B = a, C = bConst - 1;
        const D = B*B - 4*A*C;
        if (D < 0) return null;
        const sqD = Math.sqrt(D);
        const t1 = (-B - sqD) / (2*A);
        const t2 = (-B + sqD) / (2*A);
        // Sprawdź czy pierwiastki są ładne (w [-1,1] i z TRIG_EXACT)
        const nice = [-1, -0.5, 0, 0.5, 1];
        const t1Nice = nice.some(v => Math.abs(v - t1) < 1e-9);
        const t2Nice = nice.some(v => Math.abs(v - t2) < 1e-9);
        if (!t1Nice && !t2Nice) return null;
        if (!t1Nice || !t2Nice) return null;  // chcemy oba ładne

        const sols1 = solutionsForCos(t1);
        const sols2 = solutionsForCos(t2);
        const allSols = [...sols1, ...sols2].sort((a, b) => a.val - b.val);

        return {
          id: M.makeId('cat09_cos2x_quad'),
          category: 9, categoryName: 'Równania trygonometryczne',
          type: 'cos2x_quadratic', points: 5,
          params: { a, b: bConst, t1, t2 },
          statement: `Rozwiąż równanie\n$$\\cos 2x ${a>=0?'+'+a:a}\\cos x ${bConst>=0?'+'+bConst:bConst} = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.`,
          answer: { type: 'set', display: `x \\in \\left\\{${allSols.map(s => s.tex).join(',\\, ')}\\right\\}`, description: '' },
          hints: [
            { level: 1, text: 'Skorzystaj z $\\cos 2x = 2\\cos^2 x - 1$.' },
            { level: 2, text: `Po podstawieniu $t=\\cos x$ otrzymasz $2t^2 ${a>=0?'+'+a:a}t ${(bConst-1)>=0?'+'+(bConst-1):(bConst-1)} = 0$.` },
            { level: 3, text: `Pierwiastki: $t = ${formatRationalTrig(t1)}$ i $t = ${formatRationalTrig(t2)}$.` },
          ],
          solution: [
            { step: 1, title: 'Wzór na cos 2x', content: '\\cos 2x = 2\\cos^2 x - 1', explanation: '' },
            { step: 2, title: 'Podstawienie t = cos x', content: `2t^2 - 1 ${a>=0?'+'+a:a}t ${bConst>=0?'+'+bConst:bConst} = 0\\\\ 2t^2 ${a>=0?'+'+a:a}t ${(bConst-1)>=0?'+'+(bConst-1):(bConst-1)} = 0`, explanation: '' },
            { step: 3, title: 'Pierwiastki', content: `t = ${formatRationalTrig(t1)}\\ \\text{lub}\\ t = ${formatRationalTrig(t2)}`, explanation: '' },
            { step: 4, title: `$\\cos x = ${formatRationalTrig(t1)}$`, content: `x \\in \\left\\{${sols1.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
            { step: 5, title: `$\\cos x = ${formatRationalTrig(t2)}$`, content: `x \\in \\left\\{${sols2.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
            { step: 6, title: 'Odpowiedź', content: `x \\in \\left\\{${allSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
          ],
        };
      },
    ];
    for (let i = 0; i < 5; i++) {
      const t = M.choose(templates);
      const result = t();
      if (result) return result;
    }
    return null;
  }

  // ====================================================================
  // SCHEMAT C: a·sin x + b·cos x = c  (metoda kąta pomocniczego)
  // R = √(a²+b²), R·sin(x + φ) = c
  // Dobieramy a, b tak, że R ∈ {1, √2, 2}, φ ∈ standard
  // ====================================================================
  function auxAngleMethod() {
    const triples = [
      { a: 1, b: 1, R: '\\sqrt{2}', Rval: Math.sqrt(2), phi: '\\frac{\\pi}{4}', phiVal: Math.PI/4 },
      { a: 1, b: -1, R: '\\sqrt{2}', Rval: Math.sqrt(2), phi: '-\\frac{\\pi}{4}', phiVal: -Math.PI/4 },
      { a: Math.sqrt(3), b: 1, R: '2', Rval: 2, phi: '\\frac{\\pi}{6}', phiVal: Math.PI/6, aTex: '\\sqrt{3}' },
      { a: 1, b: Math.sqrt(3), R: '2', Rval: 2, phi: '\\frac{\\pi}{3}', phiVal: Math.PI/3, bTex: '\\sqrt{3}' },
    ];
    const trip = M.choose(triples);
    const c = M.choose([0, trip.Rval/2, -trip.Rval/2, trip.Rval, -trip.Rval]);
    const cOverR = c / trip.Rval;
    if (Math.abs(cOverR) > 1) return null;

    const aTex = trip.aTex || String(trip.a);
    const bTex = trip.bTex || String(trip.b);
    const cTex = c === trip.Rval/2 ? `\\dfrac{${trip.R}}{2}` :
                 c === -trip.Rval/2 ? `-\\dfrac{${trip.R}}{2}` :
                 c === trip.Rval ? trip.R :
                 c === -trip.Rval ? `-${trip.R}` : String(c);

    const sinSols = solutionsForSin(cOverR);
    const xSols = sinSols.map(s => ({
      tex: shiftedAngleTex(s.tex, trip.phi),
      val: s.val - trip.phiVal,
    })).map(s => {
      // Normalize do [0, 2π)
      while (s.val < 0) s.val += 2 * Math.PI;
      while (s.val >= 2 * Math.PI) s.val -= 2 * Math.PI;
      return s;
    });
    xSols.sort((a, b) => a.val - b.val);

    return {
      id: M.makeId('cat09_aux_angle'),
      category: 9, categoryName: 'Równania trygonometryczne',
      type: 'aux_angle', points: 5,
      params: { a: trip.a, b: trip.b, c, R: trip.Rval, phi: trip.phiVal },
      statement: `Rozwiąż równanie\n$$${aTex !== '1' ? aTex : ''}\\sin x ${trip.b>=0?'+':''}${bTex !== '1' ? (bTex==='-1'?'-':bTex) : (trip.b>0?'':'-')}\\cos x = ${cTex}$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.`,
      answer: { type: 'set', display: `x \\in \\left\\{${xSols.map(s => s.tex).join(',\\, ')}\\right\\}`, description: '' },
      hints: [
        { level: 1, text: `Zauważ: $${aTex}\\sin x + ${bTex}\\cos x = ${trip.R}\\sin(x + ${trip.phi})$ (metoda kąta pomocniczego).` },
        { level: 2, text: `Równanie sprowadza się do $\\sin(x + ${trip.phi}) = ${formatRationalTrig(cOverR)}$.` },
        { level: 3, text: `Wyznacz $x + ${trip.phi}$, a następnie odejmij $${trip.phi}$. Pamiętaj o przedziale $[0, 2\\pi)$.` },
      ],
      solution: [
        { step: 1, title: 'Metoda kąta pomocniczego', content: `${aTex}\\sin x + ${bTex}\\cos x = ${trip.R}\\sin(x + ${trip.phi})`, explanation: 'Wzór: $a\\sin x + b\\cos x = R\\sin(x+\\varphi)$, gdzie $R = \\sqrt{a^2+b^2}$.' },
        { step: 2, title: 'Sprowadzenie', content: `${trip.R}\\sin(x + ${trip.phi}) = ${cTex}\\\\ \\sin(x + ${trip.phi}) = ${formatRationalTrig(cOverR)}`, explanation: '' },
        { step: 3, title: 'Wyznaczenie x', content: `x + ${trip.phi} \\in \\left\\{${sinSols.map(s => s.tex).join(',\\, ')}\\right\\}\\\\ x \\in \\left\\{${xSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
      ],
    };
  }
  function shiftedAngleTex(angleTex, phiTex) {
    // Bardzo proste: zwróć "angle - phi" — sprawdź wynik później
    // Dla zera używamy "0 - phi" → "-phi"
    return `${angleTex} - ${phiTex}`;
  }

  // ====================================================================
  // SCHEMAT D: Faktoryzacja przez wzór różnicowy sinusów
  // sin(kx) − sin(mx) = 0   (lub  + ),  k, m ∈ {2, 3, 4, 6}, k > m
  // sin A − sin B = 2 cos((A+B)/2) sin((A-B)/2)
  // ====================================================================
  function sumDiffFactor() {
    const pairs = [[3,1], [4,2], [6,2], [5,1], [3,2]];
    const [k, m] = M.choose(pairs);
    const op = M.choose(['minus', 'plus']);
    const halfSum = (k + m) / 2;
    const halfDiff = (k - m) / 2;
    // sin kx − sin mx = 2 cos((k+m)/2 x) sin((k-m)/2 x)
    // sin kx + sin mx = 2 sin((k+m)/2 x) cos((k-m)/2 x)
    const sym = op === 'minus' ? '-' : '+';
    let leftFactor, rightFactor, leftTex, rightTex;
    if (op === 'minus') {
      leftFactor = `\\cos ${halfSum}x`;
      rightFactor = `\\sin ${halfDiff}x`;
      leftTex = `${halfSum}x`;
      rightTex = `${halfDiff}x`;
    } else {
      leftFactor = `\\sin ${halfSum}x`;
      rightFactor = `\\cos ${halfDiff}x`;
      leftTex = `${halfSum}x`;
      rightTex = `${halfDiff}x`;
    }
    if (!Number.isInteger(halfSum) || !Number.isInteger(halfDiff)) return null;
    if (halfSum === halfDiff) return null;

    // Równanie: 2 · LEFT · RIGHT = 0  →  LEFT = 0 lub RIGHT = 0
    // LEFT = 0: cos(αx) = 0 → αx = π/2 + kπ → x = (π/2 + kπ)/α
    // RIGHT = 0: sin(βx) = 0 → βx = kπ → x = kπ/β

    const leftSols = op === 'minus'
      ? collectInDomain(t => Math.PI/2 + t*Math.PI, halfSum)
      : collectInDomain(t => t*Math.PI, halfSum);
    const rightSols = op === 'minus'
      ? collectInDomain(t => t*Math.PI, halfDiff)
      : collectInDomain(t => Math.PI/2 + t*Math.PI, halfDiff);
    const allSols = [...leftSols, ...rightSols];
    // Deduplikacja
    const uniqueSols = [];
    for (const s of allSols) {
      if (!uniqueSols.some(u => Math.abs(u.val - s.val) < 1e-6)) uniqueSols.push(s);
    }
    uniqueSols.sort((a, b) => a.val - b.val);

    if (uniqueSols.length < 3 || uniqueSols.length > 10) return null;

    return {
      id: M.makeId('cat09_sum_diff'),
      category: 9, categoryName: 'Równania trygonometryczne',
      type: 'sum_diff_factor', points: 5,
      params: { k, m, op },
      statement: `Rozwiąż równanie\n$$\\sin ${k}x ${sym} \\sin ${m}x = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.`,
      answer: { type: 'set', display: `x \\in \\left\\{${uniqueSols.map(s => s.tex).join(',\\, ')}\\right\\}`, description: '' },
      hints: [
        { level: 1, text: op === 'minus'
          ? `Skorzystaj ze wzoru: $\\sin A - \\sin B = 2\\cos\\dfrac{A+B}{2}\\sin\\dfrac{A-B}{2}$.`
          : `Skorzystaj ze wzoru: $\\sin A + \\sin B = 2\\sin\\dfrac{A+B}{2}\\cos\\dfrac{A-B}{2}$.` },
        { level: 2, text: `Otrzymasz: $2\\,${leftFactor}\\cdot ${rightFactor} = 0$.` },
        { level: 3, text: `Dwa przypadki: ${leftFactor} = 0$ lub $${rightFactor} = 0$.` },
      ],
      solution: [
        { step: 1, title: 'Wzór sum/różnic', content: `\\sin ${k}x ${sym} \\sin ${m}x = 2\\,${leftFactor}\\cdot ${rightFactor}`, explanation: '' },
        { step: 2, title: 'Iloczyn = 0', content: `${leftFactor} = 0\\ \\text{lub}\\ ${rightFactor} = 0`, explanation: '' },
        { step: 3, title: `Przypadek $${leftFactor} = 0$`, content: `x \\in \\left\\{${leftSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
        { step: 4, title: `Przypadek $${rightFactor} = 0$`, content: `x \\in \\left\\{${rightSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
        { step: 5, title: 'Suma rozwiązań', content: `x \\in \\left\\{${uniqueSols.map(s => s.tex).join(',\\, ')}\\right\\}`, explanation: '' },
      ],
    };
  }
  function collectInDomain(fn, divisor, domain = [0, 2*Math.PI]) {
    const sols = [];
    for (let k = -10; k <= 30; k++) {
      const val = fn(k) / divisor;
      if (val >= domain[0] && val < domain[1] - 1e-9) {
        sols.push({ tex: piFractionTex(val), val });
      }
    }
    return sols;
  }
  function piFractionTex(val) {
    if (Math.abs(val) < 1e-9) return '0';
    if (Math.abs(val - Math.PI) < 1e-9) return '\\pi';
    if (Math.abs(val - 2*Math.PI) < 1e-9) return '2\\pi';
    // val = p·π/q
    for (const q of [2, 3, 4, 6, 8, 12]) {
      const p = val * q / Math.PI;
      if (Math.abs(p - Math.round(p)) < 1e-6) {
        const pp = Math.round(p);
        if (pp === 1 && q === 1) return '\\pi';
        if (pp === 0) return '0';
        const g = M.gcd(Math.abs(pp), q);
        const np = pp/g, nq = q/g;
        if (nq === 1) return np === 1 ? '\\pi' : `${np}\\pi`;
        return `\\dfrac{${np === 1 ? '' : np === -1 ? '-' : np}\\pi}{${nq}}`;
      }
    }
    return val.toFixed(4);
  }

  // ====================================================================
  // ENTRY POINT
  // ====================================================================
  function generate() {
    const variants = [quadraticInTrigFn, doubleAngleFactor, auxAngleMethod, sumDiffFactor];
    for (let i = 0; i < 10; i++) {
      const v = M.choose(variants);
      const result = v();
      if (result) return result;
    }
    return quadraticInTrigFn();
  }

  return { generate, quadraticInTrigFn, doubleAngleFactor, auxAngleMethod, sumDiffFactor };
})();
