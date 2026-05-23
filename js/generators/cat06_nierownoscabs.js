// Kategoria 6: Nierówność z wartością bezwzględną  — PROCEDURAL GENERATOR
// Wzorce maturalne:
//   2025 z.5: |x-2| - 2|x+3| < -2
//   2026 z.5: |2x-6| - |x²-9| < 0  (faktoryzacja!)
//
// Procedural pipeline:
//   1) Wygeneruj |x-α| - k|x-β| OP c  z gwarantowaną nietrywialnością
//   2) Rozwiąż analitycznie na trzech przedziałach
//   3) Sklej i przedstaw odpowiedź
//   4) Rejection: odrzuć wyniki pustelub całe R lub jednoprzedziałowe bez ciekawej granicy.

window.cat06 = (() => {
  const M = window.MathUtils;
  const ME = window.MathEngineering;

  // ====================================================================
  // SCHEMAT A: |x-α| - k|x-β| OP c    (3 przypadki na osi)
  // ====================================================================
  function threeCaseAbs(opts = {}) {
    const data = ME.absInequality3case(opts);
    if (!data) return null;

    const { alpha, beta, k, c, op, p1, p2, segments, unionSet, formula } = data;

    const solSetLatex = ME.setToLatex(unionSet);
    const opLatex = op === '<' ? '<' : op === '>' ? '>' : op;

    // Solution steps
    const steps = [];
    steps.push({
      step: 1,
      title: 'Punkty podziału',
      content: `x_1 = ${Math.min(alpha, beta)},\\quad x_2 = ${Math.max(alpha, beta)}`,
      explanation: `Wartości bezwzględne zerują się w punktach: $x-${alpha} = 0 \\implies x = ${alpha}$, $x-${beta} = 0 \\implies x = ${beta}$.`,
    });

    // Trzy przypadki
    const cases = [
      { lo: -Infinity, hi: p1, descr: `x < ${p1}` },
      { lo: p1, hi: p2, descr: `${p1} \\leq x < ${p2}` },
      { lo: p2, hi: Infinity, descr: `x \\geq ${p2}` },
    ];
    for (let i = 0; i < cases.length; i++) {
      const cs = cases[i];
      const seg = segments[i];
      const segLatex = seg.length === 0 ? '\\emptyset' :
        seg.map(s => intervalLatex(s)).join(' \\cup ');
      // Wyznacz formułę na tym przedziale
      let sa, sb;
      if (i === 0) { sa = '-(x-' + alpha + ')'; sb = '-(x-' + beta + ')'; }
      else if (i === 2) { sa = '(x-' + alpha + ')'; sb = '(x-' + beta + ')'; }
      else {
        if (alpha < beta) { sa = '(x-' + alpha + ')'; sb = '-(x-' + beta + ')'; }
        else { sa = '-(x-' + alpha + ')'; sb = '(x-' + beta + ')'; }
      }
      steps.push({
        step: 2 + i,
        title: `Przypadek ${i+1}: $${cs.descr}$`,
        content: `${sa} ${k>1?'-'+k:'-'}(${sb}) ${opLatex} ${c}\\\\ \\text{Rozwiązanie w tym przedziale: } ${segLatex}`,
        explanation: '',
      });
    }
    steps.push({
      step: 5,
      title: 'Suma rozwiązań',
      content: solSetLatex,
      explanation: 'Łączymy rozwiązania ze wszystkich trzech przypadków.',
    });

    return {
      id: M.makeId('cat06_abs3case'),
      category: 6,
      categoryName: 'Nierówność z |...|',
      type: 'abs_3case',
      points: 4,
      params: { alpha, beta, k, c, op },
      statement: `Rozwiąż nierówność\n$$${formula}$$\nZapisz obliczenia.`,
      answer: { type: 'interval', display: solSetLatex, description: `$${solSetLatex}$` },
      hints: [
        { level: 1, text: `Podziel na trzy przedziały według punktów $x = ${Math.min(alpha,beta)}$ i $x = ${Math.max(alpha,beta)}$.` },
        { level: 2, text: 'W każdym przedziale opuść znaki wartości bezwzględnych, uwzględniając ich znak.' },
        { level: 3, text: 'Sklej rozwiązania z trzech przypadków — końcowy zbiór to ich suma.' },
      ],
      solution: steps,
    };
  }
  function intervalLatex(I) {
    if (I.a === -Infinity && I.b === Infinity) return '\\mathbb{R}';
    const left = I.a === -Infinity ? '(-\\infty' : `${I.oa?'(':'['}${ME.formatRealNum(I.a)}`;
    const right = I.b === Infinity ? '+\\infty)' : `${ME.formatRealNum(I.b)}${I.ob?')':']'}`;
    return `${left},\\, ${right}`;
  }

  // ====================================================================
  // SCHEMAT B: |ax+b| - |x²-k²| OP 0  (wzorzec 2026)
  // Faktoryzacja: x²-k² = (x-k)(x+k)
  // ax+b = a(x+b/a), zwykle a·k = ±b (dzielenie się czynnikiem!)
  // Generujemy tak żeby wystąpiło wyłączenie czynnika |x-α|.
  // ====================================================================
  function factoredAbs() {
    for (let attempt = 0; attempt < 50; attempt++) {
      const k = M.choose([2, 3, 4, 5]);                // x²-k²
      const a = M.choose([1, 2, 3]);                    // współczynnik liniowy
      const op = M.choose(['<', '>']);
      // Generujemy linear w postaci |ax-c| gdzie c = a·m, m ∈ {-k, k}, tak by mieć wspólny czynnik
      const root = M.choose([k, -k]);
      const c = a * root;
      // |ax - c| = a|x - root|
      // |x²-k²| = |x-k|·|x+k|
      // Nierówność: a|x-root| OP |x-k|·|x+k|
      // Wyłączamy |x-root| (jeśli root = k lub -k, jest wspólny czynnik z (x-k)(x+k))
      // Powiedzmy root=k: |x-k|·(a OP |x+k|), z punktem x=k osobno

      const otherFactor = root === k ? -k : k;        // ten, który NIE jest wspólny
      // Po skróceniu (dla x ≠ root): nierówność |x-root|·(a OP |x+otherFactor|·|x-otherRoot|) — chwila, źle
      // Lepiej: a|x-root| OP |x-root|·|x+otherFactor|·... — to nie pasuje bo |x²-k²|=|x-k||x+k|
      // Dla root=k: |x-k|·a OP |x-k|·|x+k|  →  (dla x ≠ k) a OP |x+k|

      const isLess = op === '<';
      // a < |x+k|  →  x+k > a lub x+k < -a  →  x > a-k lub x < -a-k
      // a > |x+k|  →  -a < x+k < a  →  -a-k < x < a-k
      let solSet;
      const shift = root === k ? k : -k;        // to co dodawane do x w drugim |·|
      // |x + shift| ? a
      if (isLess) {
        const left = -a - shift, right = a - shift;
        solSet = [{ a: -Infinity, b: left, oa: true, ob: true },
                  { a: right, b: Infinity, oa: true, ob: true }];
      } else {
        const left = -a - shift, right = a - shift;
        solSet = [{ a: left, b: right, oa: true, ob: true }];
      }
      // Wykluczyć x = root
      solSet = excludePoint(solSet, root);
      // Quality: chcemy rozwiązanie nieoczywiste
      if (solSet.length === 0) continue;

      const ax_minus_c = `${a===1?'':a}x${(-c)>=0?'+'+(-c):(-c)}`;
      const formula = `|${ax_minus_c}| ${op} |x^2 - ${k*k}|`;

      const solLatex = ME.setToLatex(solSet);

      const steps = [
        {
          step: 1, title: 'Faktoryzacja', content: `${ax_minus_c} = ${a}(x ${root>=0?'-':'+'}${Math.abs(root)})\\\\ x^2 - ${k*k} = (x-${k})(x+${k})`,
          explanation: `Wyłączamy czynniki i widzimy wspólny czynnik $|x ${root>=0?'-':'+'}${Math.abs(root)}|$.`,
        },
        {
          step: 2, title: 'Sprowadzenie do formy z modułem', content: `${a}|x ${root>=0?'-':'+'}${Math.abs(root)}| ${op} |x-${k}|\\cdot|x+${k}|`,
          explanation: '',
        },
        {
          step: 3, title: `Przypadek $x = ${root}$`, content: `\\text{LHS} = 0,\\ \\text{RHS} = 0 \\implies 0 ${op} 0 \\text{ — fałsz}`,
          explanation: `Punkt $x = ${root}$ NIE należy do zbioru rozwiązań.`,
        },
        {
          step: 4, title: `Przypadek $x \\neq ${root}$ — dzielimy przez $|x ${root>=0?'-':'+'}${Math.abs(root)}| > 0$`,
          content: `${a} ${op} |x ${shift>=0?'+':''}${shift}|`,
          explanation: 'Skracamy wspólny czynnik.',
        },
        {
          step: 5, title: 'Rozwiązanie nierówności podstawowej', content: `${op==='<' ? '|x'+(shift>=0?'+'+shift:shift)+'| > '+a : '|x'+(shift>=0?'+'+shift:shift)+'| < '+a}\\\\ ${solLatex}`,
          explanation: '',
        },
      ];

      return {
        id: M.makeId('cat06_abs_factored'),
        category: 6,
        categoryName: 'Nierówność z |...|',
        type: 'abs_factored',
        points: 4,
        params: { k, a, root, op },
        statement: `Rozwiąż nierówność\n$$${formula}$$\nZapisz obliczenia.`,
        answer: { type: 'interval', display: solLatex, description: `$${solLatex}$` },
        hints: [
          { level: 1, text: `Rozłóż: $x^2 - ${k*k} = (x-${k})(x+${k})$ oraz $${ax_minus_c} = ${a}(x ${root>=0?'-':'+'}${Math.abs(root)})$.` },
          { level: 2, text: `Zauważ wspólny czynnik $|x ${root>=0?'-':'+'}${Math.abs(root)}|$. Sprawdź osobno przypadek $x = ${root}$.` },
          { level: 3, text: `Dla $x \\neq ${root}$ dzielimy obie strony przez $|x ${root>=0?'-':'+'}${Math.abs(root)}| > 0$.` },
        ],
        solution: steps,
      };
    }
    return null;
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
  // SCHEMAT C: √(x²+2αx+α²) ± √(x²-2βx+β²) OP c
  // 2023 z.9 wzorzec — pierwiastek z kwadratu daje |·|.
  // ====================================================================
  function sqrtToAbs() {
    for (let attempt = 0; attempt < 30; attempt++) {
      const α = M.choose([1, 2, 3, 4]);
      const β = M.choose([1, 2, 3, 4]);
      if (α === β) continue;
      // √(x²+2αx+α²) = |x+α|
      // √(x²-2βx+β²) = |x-β|
      // Tworzymy nierówność a·|x+α| + b·|x-β| OP c
      const a = M.choose([1, 2, 3]);
      const b = M.choose([1, 2, 3]);
      const op = M.choose(['<', '>']);
      // Wybierz c tak, by rozwiązanie było ładnym przedziałem
      // Maksymalna wartość w x=α: a·|α+α| + b·|α-β| = 2aα + b|α-β|
      // Minimum w pewnym punkcie pomiędzy
      const minVal = a * 0 + b * Math.abs(α + β);  // x=-α: |−α+α|=0, |−α−β|=α+β
      const c = Math.floor(minVal + M.choose([1, 2, 3]));

      // Rozwiązanie: a|x+α| + b|x-β| OP c
      // Trzy przedziały: x<-α, -α≤x<β, x≥β
      const p1 = -α, p2 = β;
      const cases = [
        { range: [-Infinity, p1], signA: -1, signB: -1 },
        { range: [p1, p2], signA: 1, signB: -1 },
        { range: [p2, Infinity], signA: 1, signB: 1 },
      ];
      const solutions = cases.map(cs => {
        // a·signA·(x+α) + b·signB·(x-β) OP c
        // (a·signA + b·signB)x + (a·signA·α - b·signB·β) OP c
        const A = a*cs.signA + b*cs.signB;
        const B = a*cs.signA*α - b*cs.signB*β;
        // Ax + B OP c
        if (Math.abs(A) < 1e-9) {
          const truth = (op === '<' && B < c) || (op === '>' && B > c);
          return truth ? [{ a: cs.range[0], b: cs.range[1], oa: cs.range[0] !== -Infinity, ob: cs.range[1] !== Infinity }] : [];
        }
        const bound = (c - B) / A;
        let newOp = op;
        if (A < 0) newOp = op === '<' ? '>' : '<';
        if (newOp === '<') {
          const segHi = Math.min(cs.range[1], bound);
          if (cs.range[0] >= segHi) return [];
          return [{ a: cs.range[0], b: segHi, oa: cs.range[0] !== -Infinity, ob: true }];
        } else {
          const segLo = Math.max(cs.range[0], bound);
          if (segLo >= cs.range[1]) return [];
          return [{ a: segLo, b: cs.range[1], oa: true, ob: cs.range[1] !== Infinity }];
        }
      });
      const all = ME.unionOfIntervals(solutions.flat());
      if (all.length === 0) continue;
      if (all.length === 1 && all[0].a === -Infinity && all[0].b === Infinity) continue;

      const solLatex = ME.setToLatex(all);
      const formula = `\\sqrt{x^2 ${2*α>=0?'+':''}${2*α}x + ${α*α}} ${a>1?'\\cdot '+a:''}+ ${b>1?b+'\\cdot ':''}\\sqrt{x^2 ${(-2*β)>=0?'+':''}${-2*β}x + ${β*β}} ${op} ${c}`;
      const stmtFormula = `${a>1?a+'\\cdot ':''}\\sqrt{x^2 ${2*α>=0?'+':''}${2*α}x + ${α*α}} + ${b>1?b+'\\cdot ':''}\\sqrt{x^2 ${(-2*β)>=0?'+':''}${-2*β}x + ${β*β}} ${op} ${c}`;

      return {
        id: M.makeId('cat06_sqrt_abs'),
        category: 6,
        categoryName: 'Nierówność z |...|',
        type: 'sqrt_abs',
        points: 4,
        params: { α, β, a, b, c, op },
        statement: `Rozwiąż nierówność\n$$${stmtFormula}$$\nWskazówka: $\\sqrt{A^2} = |A|$. Zapisz obliczenia.`,
        answer: { type: 'interval', display: solLatex, description: `$${solLatex}$` },
        hints: [
          { level: 1, text: `Zauważ: $x^2 + ${2*α}x + ${α*α} = (x + ${α})^2$ oraz $x^2 - ${2*β}x + ${β*β} = (x - ${β})^2$.` },
          { level: 2, text: `$\\sqrt{(x+${α})^2} = |x+${α}|$ i $\\sqrt{(x-${β})^2} = |x-${β}|$.` },
          { level: 3, text: `Otrzymasz nierówność $${a>1?a:''}|x+${α}| + ${b>1?b:''}|x-${β}| ${op} ${c}$. Podziel na 3 przedziały.` },
        ],
        solution: [
          { step: 1, title: 'Uproszczenie pierwiastków', content: `\\sqrt{x^2+${2*α}x+${α*α}} = \\sqrt{(x+${α})^2} = |x+${α}|\\\\ \\sqrt{x^2-${2*β}x+${β*β}} = \\sqrt{(x-${β})^2} = |x-${β}|`, explanation: '' },
          { step: 2, title: 'Forma z modułami', content: `${a>1?a:''}|x+${α}| + ${b>1?b:''}|x-${β}| ${op} ${c}`, explanation: '' },
          { step: 3, title: 'Punkty podziału', content: `x_1 = ${-α},\\quad x_2 = ${β}`, explanation: '' },
          { step: 4, title: 'Po analizie trzech przypadków', content: solLatex, explanation: 'Łączymy rozwiązania ze wszystkich przedziałów.' },
        ],
      };
    }
    return null;
  }

  // ====================================================================
  // ENTRY POINT
  // ====================================================================
  function generate() {
    const variants = [threeCaseAbs, threeCaseAbs, factoredAbs, sqrtToAbs];
    for (let i = 0; i < 5; i++) {
      const v = M.choose(variants);
      const result = v();
      if (result) return result;
    }
    return threeCaseAbs();  // fallback
  }

  return { generate, threeCaseAbs, factoredAbs, sqrtToAbs };
})();
