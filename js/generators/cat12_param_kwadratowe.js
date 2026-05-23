// Kategoria 12: Równanie kwadratowe z parametrem  — PROCEDURAL GENERATOR
// Bazuje na MathEngineering: backward synthesis + parameter coupling + rejection sampling.
//
// W przeciwieństwie do poprzedniej wersji (3 hardcoded zadania w 3 funkcjach),
// ta wersja procedurally generuje równania ze sprzężeniem parametru w b(m) i c(m),
// tak że KAŻDY z warunków (Δ, znak iloczynu, znak sumy, położenie w przedziale)
// daje nietrywialną nierówność na m.
//
// Wzorce maturalne pokryte:
//   2024 z.12: x²-(m+2)x+m+1=0 + warunek na x₁,x₂
//   2025 z.11: (2-a)x² - 2(2a+1)x + a+8 = 0, oba pierwiastki tego samego znaku
//   2026 z.10: dwa różne miejsca zerowe w (-2,2)
//   2023 z.11: równanie z parametrem, x₁+x₂ > k

window.cat12 = (() => {
  const M = window.MathUtils;
  const ME = window.MathEngineering;

  // ===== Reprezentacja przedziału na osi rzeczywistej =====
  const Iall = () => [{ a: -Infinity, b: Infinity, oa: true, ob: true }];
  const Iempty = () => [];

  // Przyciętą reprezentację wyniku polyToInterval konwertujemy do listy przedziałów
  function polyToIntervalSet(poly, op) {
    const r = ME.solveQuadInequality(poly.a2, poly.a1, poly.a0, op);
    if (r.type === 'all') return Iall();
    if (r.type === 'empty') return Iempty();
    if (r.type === 'ray') {
      if (/\\geq|>/.test(r.latex)) {
        const closed = /\\geq/.test(r.latex);
        return [{ a: r.value, b: Infinity, oa: !closed, ob: true }];
      } else {
        const closed = /\\leq/.test(r.latex);
        return [{ a: -Infinity, b: r.value, oa: true, ob: !closed }];
      }
    }
    if (r.type === 'interval') {
      const closed = /\[/.test(r.latex);
      return [{ a: r.a, b: r.b, oa: !closed, ob: !closed }];
    }
    if (r.type === 'union') {
      const closed = /\]/.test(r.latex);
      return [
        { a: -Infinity, b: r.a, oa: true, ob: !closed },
        { a: r.b, b: Infinity, oa: !closed, ob: true },
      ];
    }
    return [];
  }

  // ====================================================================
  // WARIANT A: x₁ + x₂ oraz x₁ · x₂  jako warunki Viète'a
  // Zadanie: znajdź m, dla których spełnione są jednocześnie:
  //   (i)  Δ > 0  (dwa różne pierwiastki rzeczywiste)
  //   (ii) Wybrany warunek (oba dodatnie / oba ujemne / oba tego samego znaku / x₁²+x₂² ≥ k itp.)
  // ====================================================================
  function variantViete() {
    return ME.rejectUntil(() => {
      const coupled = ME.coupledQuadratic(M.choose(['S1', 'S3']));
      const conditionType = M.choose([
        'both_positive', 'both_negative', 'same_sign',
        'sum_squared_ge_k', 'diff_squared_le_k',
      ]);

      // Warunek 1: Δ > 0
      const deltaSet = polyToIntervalSet(coupled.delta_poly, '>');
      if (deltaSet.length === 0) return null;

      // Pomocnicze: s(m) = -b/a, p(m) = c/a
      // Dla S1/S3 a=1, więc s=-b, p=c
      // s(m) = (linowa w m), p(m) = (liniowa w m)
      const sPoly = { a2: 0, a1: -ME.discriminantValue.bind(null), a0: 0 };  // placeholder
      // Lepiej: rozwiniemy bezpośrednio z formuł
      // dla S1: b = -(m+k1) → -b = m+k1 → s_poly = { a1: 1, a0: k1 }
      // dla S3: b = -(αm+β) → -b = αm+β → s_poly = { a1: α, a0: β }
      const sP = sCoeffsForCoupled(coupled);
      const pP = pCoeffsForCoupled(coupled);

      let conditionSets = [];
      let conditionLatex = [];
      let questionText = '';
      let traps = [];

      if (conditionType === 'both_positive') {
        // s > 0 ∧ p > 0
        const sSet = polyToIntervalSet(sP, '>');
        const pSet = polyToIntervalSet(pP, '>');
        conditionSets = [deltaSet, sSet, pSet];
        conditionLatex = [
          { name: '\\Delta > 0', set: deltaSet, formula: coupled.delta_str },
          { name: 'x_1 + x_2 > 0', set: sSet, formula: coupled.s_str },
          { name: 'x_1 \\cdot x_2 > 0', set: pSet, formula: coupled.p_str },
        ];
        questionText = 'oba pierwiastki są dodatnie';
        traps.push('zapomnienie_o_jednym_z_trzech_warunkow');
      } else if (conditionType === 'both_negative') {
        const sSet = polyToIntervalSet(sP, '<');
        const pSet = polyToIntervalSet(pP, '>');
        conditionSets = [deltaSet, sSet, pSet];
        conditionLatex = [
          { name: '\\Delta > 0', set: deltaSet, formula: coupled.delta_str },
          { name: 'x_1 + x_2 < 0', set: sSet, formula: coupled.s_str },
          { name: 'x_1 \\cdot x_2 > 0', set: pSet, formula: coupled.p_str },
        ];
        questionText = 'oba pierwiastki są ujemne';
      } else if (conditionType === 'same_sign') {
        // p > 0 ∧ Δ > 0 (nie potrzeba sumy)
        const pSet = polyToIntervalSet(pP, '>');
        conditionSets = [deltaSet, pSet];
        conditionLatex = [
          { name: '\\Delta > 0', set: deltaSet, formula: coupled.delta_str },
          { name: 'x_1 \\cdot x_2 > 0', set: pSet, formula: coupled.p_str },
        ];
        questionText = 'oba pierwiastki są tego samego znaku';
        traps.push('pamietac_o_iloczynie_nie_o_sumie');
      } else if (conditionType === 'sum_squared_ge_k') {
        // x₁² + x₂² = s² - 2p = (poly w m)
        // Stwórzmy poly: s²-2p, gdzie s,p są liniowe w m
        const sumSqPoly = subtract(squarePoly(sP), scalePoly(pP, 2));
        const k = M.choose([4, 9, 16, 25]);
        const target = { a2: sumSqPoly.a2, a1: sumSqPoly.a1, a0: sumSqPoly.a0 - k };
        const condSet = polyToIntervalSet(target, '>=');
        conditionSets = [deltaSet, condSet];
        conditionLatex = [
          { name: '\\Delta > 0', set: deltaSet, formula: coupled.delta_str },
          { name: `x_1^2 + x_2^2 \\geq ${k}`, set: condSet, formula: polyToStr(target) + ' \\geq 0' },
        ];
        questionText = `spełniają warunek $x_1^2 + x_2^2 \\geq ${k}$`;
      } else if (conditionType === 'diff_squared_le_k') {
        // (x₁ - x₂)² = s² - 4p
        const diffSqPoly = subtract(squarePoly(sP), scalePoly(pP, 4));
        const k = M.choose([4, 9, 16, 25, 36]);
        const target = { a2: diffSqPoly.a2, a1: diffSqPoly.a1, a0: diffSqPoly.a0 - k };
        const condSet = polyToIntervalSet(target, '<=');
        conditionSets = [deltaSet, condSet];
        conditionLatex = [
          { name: '\\Delta > 0', set: deltaSet, formula: coupled.delta_str },
          { name: `(x_1 - x_2)^2 \\leq ${k}`, set: condSet, formula: polyToStr(target) + ' \\leq 0' },
        ];
        questionText = `spełniają warunek $(x_1 - x_2)^2 \\leq ${k}$`;
      }

      // Przecięcie wszystkich warunków
      let result = conditionSets[0];
      for (let i = 1; i < conditionSets.length; i++) {
        result = ME.intersectIntervals(result, conditionSets[i]);
      }

      // QUALITY GATES:
      if (result.length === 0) return null;  // pusty wynik
      if (result.length === 1 && result[0].a === -Infinity && result[0].b === Infinity) return null;
      // Wynik musi być nieoczywisty: granice powinny być różne liczby (nie zero, nie 1)
      const hasInterestingBound = result.some(I =>
        (I.a !== -Infinity && Math.abs(I.a) > 0.001) ||
        (I.b !== Infinity  && Math.abs(I.b) > 0.001));
      if (!hasInterestingBound) return null;

      const answerLatex = `m \\in ${ME.setToLatex(result)}`;

      // Krok-po-kroku
      const steps = buildVieteSolutionSteps(coupled, conditionLatex, result);

      return {
        id: M.makeId('cat12_param_vieta'),
        category: 12,
        categoryName: 'Parametr w równaniu',
        type: 'param_vieta',
        points: 5,
        params: { scheme: coupled.scheme, conditionType, coupled_params: coupled.params },
        statement:
          `Dane jest równanie\n$$x^2 ${signLatex(coupled.b_str)} x ${signLatexRaw(coupled.c_str)} = 0$$\n` +
          `gdzie $m$ jest parametrem rzeczywistym, a $x_1, x_2$ są pierwiastkami rzeczywistymi tego równania.\n\n` +
          `**Wyznacz wszystkie wartości parametru $m$, dla których równanie ma dwa różne pierwiastki rzeczywiste $x_1, x_2$, które ${questionText}.** Zapisz obliczenia.`,
        answer: { type: 'interval', display: answerLatex, description: `$${answerLatex}$` },
        hints: buildVieteHints(coupled, conditionLatex),
        solution: steps,
        traps,
      };
    }, ME.isMaturaLevel, 60);
  }

  function sCoeffsForCoupled(c) {
    // s(m) = -b/a. Dla S1/S2/S3 a=1.
    if (c.scheme === 'S1') return { a2: 0, a1: 1, a0: c.params.k1 };
    if (c.scheme === 'S2') return { a2: 0, a1: 2, a0: 0 };
    if (c.scheme === 'S3') return { a2: 0, a1: c.params.alpha, a0: c.params.beta };
    if (c.scheme === 'S4') return null;  // a zależy od m → s wymierne
    return null;
  }
  function pCoeffsForCoupled(c) {
    if (c.scheme === 'S1') return { a2: 0, a1: c.params.k2, a0: c.params.k3 };
    if (c.scheme === 'S2') return { a2: 1, a1: 0, a0: -c.params.k };
    if (c.scheme === 'S3') return { a2: 0, a1: c.params.gamma, a0: c.params.delta };
    return null;
  }

  function squarePoly(p) {
    // (a1·m + a0)² = a1²m² + 2a1a0·m + a0²
    return { a2: p.a1*p.a1, a1: 2*p.a1*p.a0, a0: p.a0*p.a0 };
  }
  function scalePoly(p, k) {
    return { a2: p.a2*k, a1: p.a1*k, a0: p.a0*k };
  }
  function subtract(p, q) {
    return { a2: p.a2 - q.a2, a1: p.a1 - q.a1, a0: p.a0 - q.a0 };
  }
  function polyToStr(p) {
    const terms = [];
    if (p.a2 !== 0) terms.push(p.a2 === 1 ? 'm^2' : p.a2 === -1 ? '-m^2' : `${p.a2}m^2`);
    if (p.a1 !== 0) terms.push((terms.length > 0 ? (p.a1 > 0 ? '+' : '') : '') + (p.a1 === 1 ? 'm' : p.a1 === -1 ? '-m' : `${p.a1}m`));
    if (p.a0 !== 0) terms.push((terms.length > 0 ? (p.a0 > 0 ? '+' : '') : '') + p.a0);
    return terms.join('') || '0';
  }
  function signLatex(s) {
    // s zawiera "−(m+k)" — wystarczy zwrócić
    return s.replace('-', '-');
  }
  function signLatexRaw(s) {
    if (s.startsWith('-')) return s;
    return '+' + s;
  }

  function buildVieteSolutionSteps(coupled, conditionLatex, finalSet) {
    const steps = [];
    steps.push({
      step: 1,
      title: 'Wzory Viète\'a',
      content: `x_1 + x_2 = ${coupled.s_str},\\quad x_1 \\cdot x_2 = ${coupled.p_str}`,
      explanation: `Dla równania $x^2+bx+c=0$: suma pierwiastków $= -b/a = -b$, iloczyn $= c/a = c$.`
    });
    for (let i = 0; i < conditionLatex.length; i++) {
      const cond = conditionLatex[i];
      steps.push({
        step: 2 + i,
        title: `Warunek: $${cond.name}$`,
        content: `${cond.formula}\\\\ ${ME.setToLatex(cond.set)}`,
        explanation: '',
      });
    }
    steps.push({
      step: 2 + conditionLatex.length,
      title: 'Część wspólna warunków',
      content: `m \\in ${ME.setToLatex(finalSet)}`,
      explanation: 'Wszystkie warunki muszą być spełnione jednocześnie — bierzemy ich przecięcie.',
    });
    return steps;
  }

  function buildVieteHints(coupled, conditionLatex) {
    return [
      { level: 1, text: `Wzory Viète'a: $x_1+x_2 = ${coupled.s_str}$, $x_1 x_2 = ${coupled.p_str}$.` },
      { level: 2, text: `Warunki: ${conditionLatex.map(c => '$' + c.name + '$').join(', ')}. Rozwiąż każdy osobno, potem weź przecięcie.` },
      { level: 3, text: `Wyróżnik $\\Delta = ${coupled.delta_str}$. Pamiętaj o jednoczesnym spełnieniu WSZYSTKICH warunków.` },
    ];
  }

  // ====================================================================
  // WARIANT B: PIERWIASTKI W PRZEDZIALE  (a, b)
  // 2026 z.10 wzorzec.
  // Warunki (dla a_lead > 0):
  //   Δ > 0,  f(α) > 0,  f(β) > 0,  α < -b/(2a) < β
  // ====================================================================
  function variantInterval() {
    return ME.rejectUntil(() => {
      const coupled = ME.coupledQuadratic('S3');
      // Wybierz przedział (α, β) — całkowite końce
      let α = M.choose([-3, -2, -1, 0, 1]);
      let β = α + M.choose([2, 3, 4, 5]);

      // f(x) = x² + bx + c gdzie b=-(αm+β'), c=γm+δ
      // f(α_int) = α_int² - (αm+β')·α_int + γm + δ  = -α·α_int·m + γ·m + (α_int² - β'·α_int + δ)
      //         = (γ - α·α_int)·m + (α_int² - β'·α_int + δ)
      const αp = coupled.params.alpha, βp = coupled.params.beta;
      const γp = coupled.params.gamma, δp = coupled.params.delta;
      const fα_a1 = γp - αp * α;
      const fα_a0 = α*α - βp*α + δp;
      const fβ_a1 = γp - αp * β;
      const fβ_a0 = β*β - βp*β + δp;

      // Warunki:
      // Δ > 0
      const deltaSet = polyToIntervalSet(coupled.delta_poly, '>');
      // f(α) > 0
      const fαSet = polyToIntervalSet({ a2: 0, a1: fα_a1, a0: fα_a0 }, '>');
      // f(β) > 0
      const fβSet = polyToIntervalSet({ a2: 0, a1: fβ_a1, a0: fβ_a0 }, '>');
      // α < (αp·m + βp)/2 < β  →  2α < αp·m + βp < 2β  →  (2α-βp)/αp < m < (2β-βp)/αp (gdy αp>0)
      const vertexLow = (2*α - βp) / αp;
      const vertexHigh = (2*β - βp) / αp;
      const vL = Math.min(vertexLow, vertexHigh), vH = Math.max(vertexLow, vertexHigh);
      const vertexSet = [{ a: vL, b: vH, oa: true, ob: true }];

      let result = ME.intersectIntervals(deltaSet, fαSet);
      result = ME.intersectIntervals(result, fβSet);
      result = ME.intersectIntervals(result, vertexSet);

      if (result.length === 0) return null;
      if (result.length === 1 && result[0].a === -Infinity && result[0].b === Infinity) return null;
      const hasInterestingBound = result.some(I =>
        (I.a !== -Infinity && Math.abs(I.a) > 0.001) ||
        (I.b !== Infinity  && Math.abs(I.b) > 0.001));
      if (!hasInterestingBound) return null;

      // OK
      const answerLatex = `m \\in ${ME.setToLatex(result)}`;
      const eqStr = `x^2 ${coupled.b_str} x ${(/^-/.test(coupled.c_str)) ? coupled.c_str : '+' + coupled.c_str} = 0`;

      const steps = [
        {
          step: 1, title: 'Warunki na położenie obu pierwiastków w przedziale',
          content: `\\begin{cases} \\Delta > 0 \\\\ f(${α}) > 0 \\\\ f(${β}) > 0 \\\\ ${α} < -\\frac{b}{2a} < ${β} \\end{cases}`,
          explanation: 'Dla paraboli $a>0$ z obydwoma pierwiastkami w $(\\alpha,\\beta)$ wymagane są wszystkie cztery warunki.',
        },
        {
          step: 2, title: 'Wyróżnik', content: `\\Delta = ${coupled.delta_str} > 0\\\\ ${ME.setToLatex(deltaSet)}`, explanation: '',
        },
        {
          step: 3, title: `$f(${α}) > 0$`, content: `${fα_a1}m ${fα_a0>=0?'+'+fα_a0:fα_a0} > 0\\\\ ${ME.setToLatex(fαSet)}`, explanation: '',
        },
        {
          step: 4, title: `$f(${β}) > 0$`, content: `${fβ_a1}m ${fβ_a0>=0?'+'+fβ_a0:fβ_a0} > 0\\\\ ${ME.setToLatex(fβSet)}`, explanation: '',
        },
        {
          step: 5, title: `Położenie wierzchołka w $(${α},${β})$`, content: `${α} < \\frac{${coupled.s_str}}{2} < ${β}\\\\ ${ME.setToLatex(vertexSet)}`, explanation: '',
        },
        {
          step: 6, title: 'Część wspólna warunków', content: `m \\in ${ME.setToLatex(result)}`, explanation: '',
        },
      ];

      return {
        id: M.makeId('cat12_param_interval'),
        category: 12,
        categoryName: 'Parametr w równaniu',
        type: 'param_interval',
        points: 6,
        params: { coupled_params: coupled.params, interval: [α, β] },
        statement:
          `Dane jest równanie\n$$${eqStr}$$\n` +
          `gdzie $m$ jest parametrem rzeczywistym.\n\n` +
          `**Wyznacz wszystkie wartości parametru $m$, dla których równanie ma dwa różne pierwiastki rzeczywiste $x_1, x_2$, które należą do przedziału $(${α}, ${β})$.** Zapisz obliczenia.`,
        answer: { type: 'interval', display: answerLatex, description: `$${answerLatex}$` },
        hints: [
          { level: 1, text: `Oba pierwiastki w przedziale $(${α},${β})$ wymagają: $\\Delta>0$, $f(${α})>0$, $f(${β})>0$, wierzchołek w przedziale.` },
          { level: 2, text: `Oblicz $f(${α})$ i $f(${β})$ podstawiając $x=${α}$ i $x=${β}$ do równania.` },
          { level: 3, text: `Wszystkie cztery warunki muszą być spełnione jednocześnie — bierzemy ich przecięcie.` },
        ],
        solution: steps,
      };
    }, ME.isMaturaLevel, 80);
  }

  // ====================================================================
  // WARIANT C: Wzorzec 2025 z.11 — wsp. wiodący też zależny od m
  // (k-m)x² - 2(αm+β)x + (γm+δ) = 0   →   ukryty constraint m ≠ k
  // ====================================================================
  function variantLeadingCoef() {
    return ME.rejectUntil(() => {
      const coupled = ME.coupledQuadratic('S4');
      const k = coupled.params.k;
      // Δ/4 = (αm+β)² − (k−m)(γm+δ)
      // = α²m² + 2αβm + β² − (kγ m + kδ − γm² − δm)
      // = α²m² + 2αβm + β² − kγ m − kδ + γm² + δm
      // = (α² + γ) m² + (2αβ − kγ + δ) m + (β² − kδ)
      const α = coupled.params.alpha, β = coupled.params.beta;
      const γ = coupled.params.gamma, δ = coupled.params.delta;
      const D = { a2: α*α + γ, a1: 2*α*β - k*γ + δ, a0: β*β - k*δ };
      const deltaSet = polyToIntervalSet(D, '>');

      // Warunek: oba pierwiastki tego samego znaku → x₁·x₂ > 0 → c/a > 0
      // c = γm+δ, a = k-m
      // Razem: (γm+δ) i (k-m) tego samego znaku
      // Rozważymy: c>0 ∧ a>0  LUB  c<0 ∧ a<0
      const cPos = polyToIntervalSet({ a2: 0, a1: γ, a0: δ }, '>');
      const aPos = polyToIntervalSet({ a2: 0, a1: -1, a0: k }, '>');
      const cNeg = polyToIntervalSet({ a2: 0, a1: γ, a0: δ }, '<');
      const aNeg = polyToIntervalSet({ a2: 0, a1: -1, a0: k }, '<');
      const sameSignSet = union(
        ME.intersectIntervals(cPos, aPos),
        ME.intersectIntervals(cNeg, aNeg)
      );

      let result = ME.intersectIntervals(deltaSet, sameSignSet);
      // Wyklucz m = k (a = 0)
      result = excludePoint(result, k);

      if (result.length === 0) return null;
      const hasInterestingBound = result.some(I =>
        (I.a !== -Infinity && Math.abs(I.a) > 0.001) ||
        (I.b !== Infinity  && Math.abs(I.b) > 0.001));
      if (!hasInterestingBound) return null;

      const answerLatex = `m \\in ${ME.setToLatex(result)}`;
      const eqStr = `(${k}-m)x^2 ${coupled.b_str} x ${coupled.c_str.startsWith('-') ? coupled.c_str : '+'+coupled.c_str} = 0`;

      return {
        id: M.makeId('cat12_param_leading'),
        category: 12,
        categoryName: 'Parametr w równaniu',
        type: 'param_leading',
        points: 6,
        params: { coupled_params: coupled.params },
        statement:
          `Dane jest równanie kwadratowe\n$$${eqStr}$$\n` +
          `gdzie $m$ jest parametrem rzeczywistym, $m \\neq ${k}$.\n\n` +
          `**Wyznacz wszystkie wartości parametru $m$, dla których to równanie ma dwa różne pierwiastki rzeczywiste tego samego znaku.** Zapisz obliczenia.`,
        answer: { type: 'interval', display: answerLatex, description: `$${answerLatex}$` },
        hints: [
          { level: 1, text: `Warunek na bycie równaniem kwadratowym: współczynnik wiodący $\\neq 0$, czyli $m \\neq ${k}$.` },
          { level: 2, text: 'Oba pierwiastki tego samego znaku $\\iff x_1 \\cdot x_2 > 0 \\iff \\dfrac{c}{a} > 0$ (oraz $\\Delta > 0$).' },
          { level: 3, text: '$\\dfrac{c}{a} > 0$: licznik i mianownik tego samego znaku. Rozważ oba przypadki i weź sumę.' },
        ],
        solution: [
          { step: 1, title: 'Warunek na bycie równaniem kwadratowym', content: `${k} - m \\neq 0 \\implies m \\neq ${k}`, explanation: 'Współczynnik przy $x^2$ musi być niezerowy.' },
          { step: 2, title: 'Wyróżnik > 0', content: `\\Delta = (${α}m${β>=0?'+'+β:β})^2 - 4(${k}-m)(${γ}m${δ>=0?'+'+δ:δ}) = ${polyToStr(D)}`, explanation: '' },
          { step: 3, title: 'Warunek na pierwiastki tego samego znaku', content: `x_1 x_2 = \\dfrac{${γ}m${δ>=0?'+'+δ:δ}}{${k}-m} > 0`, explanation: '$x_1\\cdot x_2 = c/a$.' },
          { step: 4, title: 'Część wspólna warunków', content: `m \\in ${ME.setToLatex(result)}`, explanation: 'Przecięcie wszystkich warunków, wykluczając $m = ${k}$.' },
        ],
      };
    }, ME.isMaturaLevel, 80);
  }

  function union(A, B) {
    return ME.unionOfIntervals([...A, ...B]);
  }
  function excludePoint(set, pt) {
    const out = [];
    for (const I of set) {
      if (pt <= I.a || pt >= I.b) { out.push(I); continue; }
      if (pt > I.a && pt < I.b) {
        out.push({ a: I.a, b: pt, oa: I.oa, ob: true });
        out.push({ a: pt, b: I.b, oa: true, ob: I.ob });
      }
    }
    return out;
  }

  // ====================================================================
  // ENTRY POINT
  // ====================================================================
  function generate() {
    const variant = M.choose([variantViete, variantViete, variantInterval, variantLeadingCoef]);
    const result = variant();
    if (result) return result;
    // Fallback: jeśli rejection failed, użyj variantViete bez quality gate
    return variantViete() || variantInterval() || variantLeadingCoef();
  }

  return { generate, variantViete, variantInterval, variantLeadingCoef };
})();
