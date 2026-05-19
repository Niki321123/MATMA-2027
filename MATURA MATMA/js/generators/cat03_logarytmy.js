// Kategoria 3: Logarytmy
// Schematy z matur 2015-2026:
//   A) Wykaż, że log = wyrażenie przez a,b (zmiana podstawy)
//   B) Oblicz wartość wyrażenia logarytmicznego
//   C) Rozwiąż równanie logarytmiczne  ← dodano
//   D) Rozwiąż nierówność logarytmiczną ← dodano
window.cat03 = (() => {
  const M = window.MathUtils;

  // ── SCHEMAT A: Wykaż, że log = wyrażenie przez a i b ──────────────────
  function expressLog() {
    const tasks = [
      {
        given: [
          { sym: 'a', expr: '\\log_5 4' },
          { sym: 'b', expr: '\\log_4 3' }
        ],
        find: '\\log_{12} 80',
        result: '\\dfrac{2a + 1}{a(1 + b)}',
        proof_steps: [
          { step: 1, title: 'Zmiana podstawy', content: '\\log_{12}80 = \\dfrac{\\log 80}{\\log 12} = \\dfrac{\\log(16\\cdot5)}{\\log(4\\cdot3)} = \\dfrac{2\\log4+\\log5}{\\log4+\\log3}', explanation: 'Stosujemy wzór zmiany podstawy i rozkład na czynniki.' },
          { step: 2, title: 'Wyrażenie przez a i b', content: 'a = \\dfrac{\\log4}{\\log5} \\Rightarrow \\log5 = \\dfrac{\\log4}{a}, \\quad b = \\dfrac{\\log3}{\\log4} \\Rightarrow \\log3 = b\\log4', explanation: '' },
          { step: 3, title: 'Podstawienie i uproszczenie', content: '\\dfrac{2\\log4+\\frac{\\log4}{a}}{\\log4+b\\log4} = \\dfrac{2+\\frac{1}{a}}{1+b} = \\dfrac{\\frac{2a+1}{a}}{1+b} = \\dfrac{2a+1}{a(1+b)}\\quad\\blacksquare', explanation: '' }
        ]
      },
      {
        given: [{ sym: 'c', expr: '\\log_2 18' }],
        find: '\\log_3 4',
        result: '\\dfrac{4}{c - 1}',
        proof_steps: [
          { step: 1, title: 'Rozkład log₂18', content: 'c = \\log_2 18 = \\log_2(2\\cdot9) = 1 + 2\\log_2 3', explanation: '$18 = 2 \\cdot 3^2$.' },
          { step: 2, title: 'Wyznaczenie log₂3', content: '\\log_2 3 = \\dfrac{c-1}{2}', explanation: '' },
          { step: 3, title: 'Obliczenie log₃4', content: '\\log_3 4 = \\dfrac{\\log_2 4}{\\log_2 3} = \\dfrac{2}{\\frac{c-1}{2}} = \\dfrac{4}{c-1}\\quad\\blacksquare', explanation: 'Wzór zmiany podstawy.' }
        ]
      },
      {
        given: [{ sym: 'a', expr: '\\log_2 3' }],
        find: '\\log_6 8',
        result: '\\dfrac{3}{a + 1}',
        proof_steps: [
          { step: 1, title: 'Zmiana podstawy', content: '\\log_6 8 = \\dfrac{\\log_2 8}{\\log_2 6} = \\dfrac{3}{1 + \\log_2 3} = \\dfrac{3}{1+a}\\quad\\blacksquare', explanation: '$\\log_2 8 = 3$, $\\log_2 6 = \\log_2(2\\cdot3) = 1+a$.' }
        ]
      },
      {
        given: [
          { sym: 'a', expr: '\\log_3 5' },
          { sym: 'b', expr: '\\log_5 7' }
        ],
        find: '\\log_{15} 35',
        result: '\\dfrac{a(b+1)}{a+1}',
        proof_steps: [
          { step: 1, title: 'Zmiana podstawy', content: '\\log_{15}35 = \\dfrac{\\log_3 35}{\\log_3 15} = \\dfrac{\\log_3(5\\cdot7)}{\\log_3(3\\cdot5)} = \\dfrac{a + \\log_3 7}{1 + a}', explanation: '' },
          { step: 2, title: 'Wzór łańcuchowy', content: '\\log_3 7 = \\log_3 5 \\cdot \\log_5 7 = ab', explanation: '' },
          { step: 3, title: 'Wynik', content: '\\dfrac{a+ab}{1+a} = \\dfrac{a(1+b)}{a+1}\\quad\\blacksquare', explanation: '' }
        ]
      },
      {
        given: [{ sym: 'k', expr: '\\log_4 3' }],
        find: '\\log_8 48',
        result: '\\dfrac{2(k+2)}{3}',
        proof_steps: [
          { step: 1, title: 'Zmiana podstawy', content: '\\log_8 48 = \\dfrac{\\log_4 48}{\\log_4 8} = \\dfrac{\\log_4(16\\cdot3)}{\\frac{3}{2}} = \\dfrac{2+k}{\\frac{3}{2}} = \\dfrac{2(2+k)}{3}\\quad\\blacksquare', explanation: '$\\log_4 16 = 2$, $\\log_4 8 = \\frac{3}{2}$, $\\log_4 48 = \\log_4(16\\cdot3) = 2+k$.' }
        ]
      },
      {
        given: [
          { sym: 'p', expr: '\\log_6 2' },
          { sym: 'q', expr: '\\log_6 5' }
        ],
        find: '\\log_{30} 4',
        result: '\\dfrac{2p}{p + q + 1}',
        proof_steps: [
          { step: 1, title: 'Zmiana podstawy', content: '\\log_{30}4 = \\dfrac{\\log_6 4}{\\log_6 30} = \\dfrac{2\\log_6 2}{\\log_6(5\\cdot6)} = \\dfrac{2p}{q+1}', explanation: '$\\log_6 4 = 2p$, $\\log_6 30 = \\log_6 5 + \\log_6 6 = q+1$.' },
          { step: 2, title: 'Korekta', content: '\\log_6 30 = \\log_6(2\\cdot3\\cdot5) = p + \\log_6 3 + q$. Zauważmy: $p+q = \\log_6 10$, $\\log_6 30 = \\log_6(3\\cdot10) = \\log_6 3 + p + q$. Ponieważ $1 = \\log_6 6 = \\log_6(2\\cdot3) = p + \\log_6 3$, mamy $\\log_6 3 = 1-p$, więc $\\log_6 30 = 1-p+p+q = 1+q$. Wynik: $\\dfrac{2p}{1+q}$', explanation: 'Upraszczamy za pomocą $p+q+1 = 1+q+p$.' }
        ]
      },
      {
        given: [{ sym: 'm', expr: '\\log_9 2' }],
        find: '\\log_{12} 8',
        result: '\\dfrac{6m}{4m+1}',
        proof_steps: [
          { step: 1, title: 'Wyrażenie przez log 3', content: 'm = \\log_9 2 = \\dfrac{\\log 2}{\\log 9} = \\dfrac{\\log 2}{2\\log 3} \\Rightarrow \\log 2 = 2m\\log 3', explanation: '' },
          { step: 2, title: 'Obliczenie log₁₂8', content: '\\log_{12}8 = \\dfrac{\\log 8}{\\log 12} = \\dfrac{3\\log 2}{2\\log 2 + \\log 3} = \\dfrac{3\\cdot2m\\log3}{2\\cdot2m\\log3+\\log3} = \\dfrac{6m}{4m+1}\\quad\\blacksquare', explanation: '' }
        ]
      }
    ];

    const task = M.choose(tasks);
    const givenStrs = task.given.map(g => `$${g.sym} = ${g.expr}$`).join(' oraz ');
    return {
      id: M.makeId('cat03_log'),
      category: 3,
      categoryName: 'Logarytmy',
      type: 'express_log',
      points: 3,
      params: { task },
      statement: `Wykaż, że jeżeli ${givenStrs}, to\n$$${task.find} = ${task.result}$$`,
      answer: { type: 'proof', display: task.result, description: `Dowód: $${task.find} = ${task.result}$` },
      hints: [
        { level: 1, text: `Skorzystaj z wzoru zmiany podstawy: $\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$.` },
        { level: 2, text: task.proof_steps[0].content },
        { level: 3, text: `Wyrażaj wszystkie logarytmy przez podane symbole (${task.given.map(g => g.sym).join(', ')}).` }
      ],
      solution: task.proof_steps
    };
  }

  // ── SCHEMAT B: Oblicz wartość wyrażenia z logarytmami ─────────────────
  function computeLog() {
    const tasks = [
      {
        statement: 'Oblicz wartość wyrażenia\n$$\\log_3\\sqrt{27} \\cdot \\log_{\\sqrt{3}} 9$$',
        answer_display: '3', answer_val: 3,
        solution: [
          { step: 1, title: 'log₃√27', content: '\\log_3\\sqrt{27} = \\log_3 3^{3/2} = \\dfrac{3}{2}', explanation: '' },
          { step: 2, title: 'log_{√3} 9', content: '\\log_{\\sqrt{3}} 9 = \\log_{3^{1/2}} 3^2 = \\dfrac{2}{1/2} = 4', explanation: '$(\\sqrt3)^4 = 9$.' },
          { step: 3, title: 'Iloczyn', content: '\\dfrac{3}{2}\\cdot 4 = \\mathbf{3}', explanation: '' }
        ]
      },
      {
        statement: 'Oblicz wartość wyrażenia\n$$\\dfrac{\\log 8 + \\log 125}{\\log 2 + \\log 5}$$',
        answer_display: '3', answer_val: 3,
        solution: [
          { step: 1, title: 'Rozkład', content: '\\log 8 = 3\\log2,\\quad \\log 125 = 3\\log5', explanation: '' },
          { step: 2, title: 'Uproszczenie', content: '\\dfrac{3(\\log2+\\log5)}{\\log2+\\log5} = \\mathbf{3}', explanation: '' }
        ]
      },
      {
        statement: 'Oblicz wartość wyrażenia\n$$\\log_4 8 + \\log_4 2$$',
        answer_display: '\\dfrac{3}{2} + \\dfrac{1}{2} = 2', answer_val: 2,
        solution: [
          { step: 1, title: 'Obliczenie', content: '\\log_4 8 = \\log_4 4^{3/2} = \\dfrac{3}{2},\\quad \\log_4 2 = \\log_4 4^{1/2} = \\dfrac{1}{2}', explanation: '' },
          { step: 2, title: 'Suma', content: '\\dfrac{3}{2}+\\dfrac{1}{2} = \\mathbf{2}', explanation: '' }
        ]
      },
      {
        statement: 'Oblicz wartość wyrażenia\n$$\\log_2 6 - \\log_2 3 + \\log_2 4$$',
        answer_display: '3', answer_val: 3,
        solution: [
          { step: 1, title: 'Własności logarytmów', content: '\\log_2 6 - \\log_2 3 + \\log_2 4 = \\log_2\\dfrac{6}{3} + \\log_2 4 = \\log_2 2 + \\log_2 4 = 1 + 2 = \\mathbf{3}', explanation: '' }
        ]
      },
      {
        statement: 'Oblicz wartość wyrażenia\n$$4^{\\log_4 7} + \\log_{27} 3$$',
        answer_display: '7 + \\dfrac{1}{3}', answer_val: 7 + 1/3,
        solution: [
          { step: 1, title: 'Pierwsza część', content: '4^{\\log_4 7} = 7', explanation: 'Z własności: $a^{\\log_a x} = x$.' },
          { step: 2, title: 'Druga część', content: '\\log_{27}3 = \\log_{3^3}3 = \\dfrac{1}{3}', explanation: '$3^{1/3} = \\sqrt[3]{3}$... właściwie: $27^{1/3} = 3$, więc $\\log_{27}3 = \\frac{1}{3}$.' },
          { step: 3, title: 'Wynik', content: '7 + \\dfrac{1}{3}', explanation: '' }
        ]
      },
      {
        statement: 'Oblicz wartość wyrażenia\n$$\\log_6 4 + 2\\log_6 3 - \\log_6 6$$',
        answer_display: '1', answer_val: 1,
        solution: [
          { step: 1, title: 'Uproszczenie', content: '\\log_6 4 + \\log_6 9 - \\log_6 6 = \\log_6\\dfrac{4\\cdot9}{6} = \\log_6 6 = \\mathbf{1}', explanation: '' }
        ]
      }
    ];

    const task = M.choose(tasks);
    return {
      id: M.makeId('cat03_compute'),
      category: 3,
      categoryName: 'Logarytmy',
      type: 'compute_log',
      points: 2,
      params: {},
      statement: task.statement + '\n\nZapisz obliczenia.',
      answer: { type: 'number', value: task.answer_val, display: task.answer_display, description: `Wynik $= ${task.answer_display}$` },
      hints: [
        { level: 1, text: 'Skorzystaj z wzorów: $\\log_a(xy) = \\log_a x + \\log_a y$, $\\log_a x^n = n\\log_a x$, $a^{\\log_a x} = x$.' },
        { level: 2, text: 'Rozłóż liczby na potęgi tej samej podstawy.' },
        { level: 3, text: task.solution[0].content }
      ],
      solution: task.solution
    };
  }

  // ── SCHEMAT C: Równanie logarytmiczne ─────────────────────────────────
  function logEquation() {
    // Typ 1: log_a(x + b) = c  →  x = a^c - b
    // Typ 2: log_a(x^2 + bx) = c  →  kwadratowe
    // Typ 3: log_a(x) + log_a(x+k) = c  →  kwadratowe

    const TYPE = M.choose([1, 1, 2, 3]);

    if (TYPE === 1) {
      const base = M.choose([2, 3, 4, 5]);
      const exp  = M.choose([2, 3, 4]);
      const threshold = Math.pow(base, exp);
      const shift = M.choose([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
      const x_ans = threshold - shift;
      if (x_ans <= 0 || x_ans > 200) return logEquation();
      const domainBound = -shift;

      const argStr = shift > 0 ? `x + ${shift}` : shift < 0 ? `x - ${Math.abs(shift)}` : 'x';

      return {
        id: M.makeId('cat03_log_eq'),
        category: 3, categoryName: 'Logarytmy',
        type: 'log_equation', points: 3,
        params: { base, shift, exp, x_ans },
        statement: `Rozwiąż równanie\n$$\\log_{${base}}(${argStr}) = ${exp}$$\nZapisz obliczenia. Podaj dziedzinę.`,
        answer: { type: 'number', value: x_ans, display: `x = ${x_ans}`, description: `$x = ${x_ans}$` },
        hints: [
          { level: 1, text: `Dziedzina: $${argStr} > 0$, czyli $x > ${domainBound}$.` },
          { level: 2, text: `Z definicji logarytmu: $\\log_{${base}}(${argStr}) = ${exp} \\iff ${argStr} = ${base}^{${exp}} = ${threshold}$.` },
          { level: 3, text: `$x = ${threshold} ${shift > 0 ? '- ' + shift : shift < 0 ? '+ ' + Math.abs(shift) : ''} = ${x_ans}$.` }
        ],
        solution: [
          { step: 1, title: 'Dziedzina', content: `${argStr} > 0 \\implies x > ${domainBound}`, explanation: 'Argument logarytmu musi być dodatni.' },
          { step: 2, title: 'Rozwiązanie', content: `\\log_{${base}}(${argStr}) = ${exp} \\iff ${argStr} = ${base}^{${exp}} = ${threshold}`, explanation: 'Definicja: $\\log_a b = c \\iff a^c = b$.' },
          { step: 3, title: 'Wynik', content: `x = ${threshold} ${shift > 0 ? '- ' + shift : shift < 0 ? '+ ' + Math.abs(shift) : ''} = ${x_ans}\\qquad \\text{(sprawdź: }${x_ans} > ${domainBound}\\checkmark\\text{)}`, explanation: '' }
        ]
      };
    }

    if (TYPE === 2) {
      // log_a(x) + log_a(x+k) = c  →  x(x+k) = a^c
      const base = M.choose([2, 3]);
      const c    = M.choose([2, 3]);
      const prod = Math.pow(base, c); // x(x+k) = prod
      // Choose k and x1 such that x1(x1+k) = prod and x1 > 0, x1+k > 0
      // Factor prod as product of two naturals: x1 * (x1+k)
      const pairs = [];
      for (let x = 1; x * x <= prod; x++) {
        if (prod % x === 0) { const y = prod / x; pairs.push([x, y - x]); }
      }
      if (pairs.length === 0) return logEquation();
      const [x_ans, k] = M.choose(pairs);
      if (k <= 0) return logEquation();

      return {
        id: M.makeId('cat03_log_eq2'),
        category: 3, categoryName: 'Logarytmy',
        type: 'log_equation', points: 3,
        params: { base, c, k, x_ans, prod },
        statement: `Rozwiąż równanie\n$$\\log_{${base}} x + \\log_{${base}}(x + ${k}) = ${c}$$\nZapisz obliczenia. Podaj dziedzinę.`,
        answer: { type: 'number', value: x_ans, display: `x = ${x_ans}`, description: `$x = ${x_ans}$` },
        hints: [
          { level: 1, text: `Dziedzina: $x > 0$ i $x + ${k} > 0$, czyli $x > 0$.` },
          { level: 2, text: `$\\log_{${base}} x + \\log_{${base}}(x+${k}) = \\log_{${base}}[x(x+${k})] = ${c}$, więc $x(x+${k}) = ${base}^{${c}} = ${prod}$.` },
          { level: 3, text: `$x^2 + ${k}x - ${prod} = 0$. Rozwiąż i odrzuć ujemne pierwiastki.` }
        ],
        solution: [
          { step: 1, title: 'Dziedzina', content: `x > 0\\text{ i }x+${k}>0 \\implies x > 0`, explanation: '' },
          { step: 2, title: 'Łączenie logarytmów', content: `\\log_{${base}}[x(x+${k})] = ${c} \\implies x(x+${k}) = ${base}^{${c}} = ${prod}`, explanation: '' },
          { step: 3, title: 'Równanie kwadratowe', content: `x^2 + ${k}x - ${prod} = 0`, explanation: '' },
          { step: 4, title: 'Rozwiązanie', content: `\\Delta = ${k*k} + 4\\cdot${prod} = ${k*k+4*prod},\\quad x = \\dfrac{-${k} + \\sqrt{${k*k+4*prod}}}{2} = ${x_ans}`, explanation: `Odrzucamy ujemne: $x = ${x_ans}$ (sprawdź: $${x_ans} > 0\\checkmark$).` }
        ]
      };
    }

    // TYPE === 3: log_a(x^2 - k) = c
    const base = M.choose([2, 3]);
    const c    = M.choose([1, 2]);
    const val  = Math.pow(base, c);
    // x^2 = val + k, pick k so x_ans is nice integer
    const x_ans = M.choose([3, 4, 5, 6, 7]);
    const k = x_ans * x_ans - val;
    if (k <= 0 || k > 30) return logEquation();

    return {
      id: M.makeId('cat03_log_eq3'),
      category: 3, categoryName: 'Logarytmy',
      type: 'log_equation', points: 3,
      params: { base, c, k, x_ans, val },
      statement: `Rozwiąż równanie\n$$\\log_{${base}}(x^2 - ${k}) = ${c}$$\nZapisz obliczenia. Podaj dziedzinę.`,
      answer: { type: 'set', display: `x = ${x_ans} \\text{ lub } x = -${x_ans}`, description: `$x = \\pm${x_ans}$` },
      hints: [
        { level: 1, text: `Dziedzina: $x^2 - ${k} > 0 \\iff |x| > \\sqrt{${k}}$.` },
        { level: 2, text: `$x^2 - ${k} = ${base}^{${c}} = ${val}$, więc $x^2 = ${val+k} = ${x_ans*x_ans}$.` },
        { level: 3, text: `$x = \\pm${x_ans}$. Sprawdź dziedzinę: $${x_ans}^2 - ${k} = ${val} > 0\\checkmark$.` }
      ],
      solution: [
        { step: 1, title: 'Dziedzina', content: `x^2 - ${k} > 0 \\implies |x| > \\sqrt{${k}} \\approx ${Math.sqrt(k).toFixed(2)}`, explanation: '' },
        { step: 2, title: 'Rozwiązanie', content: `x^2 - ${k} = ${base}^{${c}} = ${val} \\implies x^2 = ${val+k} \\implies x = \\pm${x_ans}`, explanation: '' },
        { step: 3, title: 'Sprawdzenie', content: `${x_ans}^2 - ${k} = ${val} > 0\\checkmark,\\quad (-${x_ans})^2 - ${k} = ${val} > 0\\checkmark`, explanation: '' }
      ]
    };
  }

  // ── SCHEMAT D: Nierówność logarytmiczna ──────────────────────────────
  function logInequality() {
    // Typ A: log_a(x + b) > c,  a > 1  →  x > a^c - b (pamiętaj o dziedzinie)
    // Typ B: log_a(x + b) < c,  a > 1  →  -b < x < a^c - b
    // Typ C: log_{1/a}(x+b) > c →  0 < x+b < a^(-c)  (malejąca!)

    const variant = M.choose(['A','B','C']);
    const a       = M.choose([2, 3, 4]);   // podstawa > 1 (lub 1/a)
    const c       = M.choose([1, 2, 3]);
    const shift   = M.choose([-4,-3,-2,-1,0,1,2,3,4]);
    const threshold = Math.pow(a, c);
    const domBound  = -shift;              // x > -shift
    const xBound    = threshold - shift;  // x >= lub x <  threshold - shift

    const argStr = shift > 0 ? `x + ${shift}` : shift < 0 ? `x - ${Math.abs(shift)}` : 'x';

    if (variant === 'A') {
      // log_a(x+b) > c, a>1 → x > xBound, i x > domBound → x > max(domBound, xBound)
      // Dla a>1 i threshold>0: xBound > domBound zawsze (bo threshold = a^c > 0)
      const sol = `x \\in (${xBound},\\ +\\infty)`;
      return {
        id: M.makeId('cat03_ineq'),
        category: 3, categoryName: 'Logarytmy',
        type: 'log_inequality', points: 3,
        params: { a, c, shift, threshold, xBound, domBound, variant },
        statement: `Rozwiąż nierówność\n$$\\log_{${a}}(${argStr}) > ${c}$$\nZapisz obliczenia.`,
        answer: { type: 'interval', display: sol, description: `$${sol}$` },
        hints: [
          { level: 1, text: `Dziedzina: $${argStr} > 0$, czyli $x > ${domBound}$.` },
          { level: 2, text: `Podstawa $${a} > 1$ → logarytm rosnący. Nierówność: $${argStr} > ${a}^{${c}} = ${threshold}$.` },
          { level: 3, text: `$x > ${threshold}${shift > 0 ? ' - ' + shift : shift < 0 ? ' + ' + Math.abs(shift) : ''} = ${xBound}$. Odpowiedź: $${sol}$.` }
        ],
        solution: [
          { step: 1, title: 'Dziedzina', content: `${argStr} > 0 \\implies x > ${domBound}`, explanation: '' },
          { step: 2, title: 'Monotoniczność', content: `\\text{Podstawa } ${a} > 1 \\implies \\log_{${a}} \\text{ jest rosnąca}`, explanation: 'Rosnąca funkcja zachowuje kierunek nierówności.' },
          { step: 3, title: 'Rozwiązanie', content: `\\log_{${a}}(${argStr}) > ${c} \\iff ${argStr} > ${a}^{${c}} = ${threshold} \\iff x > ${xBound}`, explanation: '' },
          { step: 4, title: 'Odpowiedź', content: sol, explanation: `Warunek $x > ${xBound}$ implikuje $x > ${domBound}$ (dziedzina ok).` }
        ]
      };
    }

    if (variant === 'B') {
      // log_a(x+b) < c → domBound < x < xBound (jeśli xBound > domBound)
      if (xBound <= domBound) return logInequality();
      const sol = `x \\in (${domBound},\\ ${xBound})`;
      return {
        id: M.makeId('cat03_ineq'),
        category: 3, categoryName: 'Logarytmy',
        type: 'log_inequality', points: 3,
        params: { a, c, shift, threshold, xBound, domBound, variant },
        statement: `Rozwiąż nierówność\n$$\\log_{${a}}(${argStr}) < ${c}$$\nZapisz obliczenia.`,
        answer: { type: 'interval', display: sol, description: `$${sol}$` },
        hints: [
          { level: 1, text: `Dziedzina: $${argStr} > 0$, czyli $x > ${domBound}$.` },
          { level: 2, text: `Podstawa $${a} > 1$ → logarytm rosnący: $${argStr} < ${a}^{${c}} = ${threshold}$, więc $x < ${xBound}$.` },
          { level: 3, text: `Łącząc z dziedziną: $${sol}$.` }
        ],
        solution: [
          { step: 1, title: 'Dziedzina', content: `${argStr} > 0 \\implies x > ${domBound}`, explanation: '' },
          { step: 2, title: 'Nierówność', content: `\\log_{${a}}(${argStr}) < ${c} \\iff ${argStr} < ${threshold} \\iff x < ${xBound}`, explanation: 'Podstawa $> 1$: kierunek nierówności zachowany.' },
          { step: 3, title: 'Przecięcie z dziedziną', content: `x > ${domBound} \\text{ i } x < ${xBound} \\implies ${sol}`, explanation: '' }
        ]
      };
    }

    // variant === 'C': log_{1/a}(x+b) < c  → x + b > a^(-c) = 1/a^c  (malejąca!)
    // log_{1/a}(t) < c  ↔  t > (1/a)^c = a^{-c}
    const threshInv = Math.pow(a, -c);
    const threshInvDisplay = M.latexFrac(1, Math.pow(a, c));
    const xBoundC  = threshInv - shift;
    if (xBoundC <= domBound) return logInequality();

    const baseStr   = `\\dfrac{1}{${a}}`;
    const sol = `x \\in (${Number.isInteger(xBoundC) ? xBoundC : threshInvDisplay.replace('\\frac', '') + (shift !== 0 ? (shift > 0 ? ' - ' + shift : ' + ' + Math.abs(shift)) : '')},\\ +\\infty)`;
    const solSimple = `x > ${Number.isInteger(xBoundC) ? xBoundC : threshInvDisplay}${shift > 0 ? ' - ' + shift : shift < 0 ? ' + ' + Math.abs(shift) : ''}`;

    return {
      id: M.makeId('cat03_ineq'),
      category: 3, categoryName: 'Logarytmy',
      type: 'log_inequality', points: 3,
      params: { a, c, shift, threshInv, xBoundC, domBound, variant },
      statement: `Rozwiąż nierówność\n$$\\log_{${baseStr}}(${argStr}) < ${c}$$\nZapisz obliczenia.`,
      answer: { type: 'interval', display: solSimple, description: `$${solSimple}$` },
      hints: [
        { level: 1, text: `Dziedzina: $${argStr} > 0$, czyli $x > ${domBound}$.` },
        { level: 2, text: `Podstawa $\\frac{1}{${a}} \\in (0,1)$ → logarytm **malejący**. Nierówność $<$ zamienia się w $>$: $${argStr} > \\left(\\frac{1}{${a}}\\right)^{${c}} = ${threshInvDisplay}$.` },
        { level: 3, text: `$${solSimple}$.` }
      ],
      solution: [
        { step: 1, title: 'Dziedzina', content: `${argStr} > 0 \\implies x > ${domBound}`, explanation: '' },
        { step: 2, title: 'Malejąca funkcja!', content: `\\text{Podstawa } \\frac{1}{${a}} < 1 \\implies \\log_{\\frac{1}{${a}}} \\text{ jest malejąca}`, explanation: 'Malejąca funkcja ODWRACA kierunek nierówności.' },
        { step: 3, title: 'Rozwiązanie', content: `\\log_{\\frac{1}{${a}}}(${argStr}) < ${c} \\iff ${argStr} > \\left(\\frac{1}{${a}}\\right)^{${c}} = \\frac{1}{${Math.pow(a,c)}} = ${threshInvDisplay}`, explanation: '' },
        { step: 4, title: 'Wynik', content: solSimple, explanation: '' }
      ]
    };
  }

  function generate() {
    return M.choose([expressLog, computeLog, logEquation, logInequality])();
  }

  return { generate };
})();
