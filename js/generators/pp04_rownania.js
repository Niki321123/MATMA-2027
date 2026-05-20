// PP Kategoria 4: Równania kwadratowe i układy równań
// Schemat A: równanie kwadratowe ax²+bx+c=0
// Schemat B: układ dwóch równań liniowych
// Schemat C: wzory Viète'a / parametr w równaniu kwadratowym
window.pp04 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Równanie kwadratowe ===
  function quadratic() {
    // Generuj przez dwa pierwiastki x1, x2 → a(x-x1)(x-x2)
    const roots = [
      { x1:2, x2:3, a:1, b:-5, c:6 },
      { x1:-1, x2:4, a:1, b:-3, c:-4 },
      { x1:1, x2:5, a:1, b:-6, c:5 },
      { x1:-2, x2:-3, a:1, b:5, c:6 },
      { x1:0, x2:4, a:1, b:-4, c:0 },
      { x1:2, x2:6, a:1, b:-8, c:12 },
      { x1:-3, x2:5, a:1, b:-2, c:-15 },
      { x1:1, x2:7, a:1, b:-8, c:7 },
    ];
    const cfg = M.choose(roots);
    const { x1, x2, a, b, c } = cfg;
    const bStr = b >= 0 ? `+${b}` : `${b}`;
    const cStr = c >= 0 ? `+${c}` : `${c}`;
    const eqStr = `x^2${bStr}x${cStr}=0`;
    const delta = b * b - 4 * a * c;
    const sqrtDelta = Math.round(Math.sqrt(delta));

    return {
      id: M.makeId('pp04_quad'),
      category: 4,
      categoryName: 'Równania i układy',
      type: 'quadratic',
      points: 2,
      params: cfg,
      statement: `Rozwiąż równanie $${eqStr}$. Zapisz obliczenia.`,
      answer: {
        type: 'set',
        display: `x_1 = ${x1},\\quad x_2 = ${x2}`,
        description: `$x_1=${x1}$, $x_2=${x2}$`
      },
      hints: [
        { level:1, text:`Oblicz wyróżnik: $\\Delta = b^2-4ac = (${b})^2-4\\cdot1\\cdot(${c}) = ${delta}$.` },
        { level:2, text:`$\\sqrt{\\Delta}=${sqrtDelta}$. Wzory: $x_{1,2}=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}$.` },
        { level:3, text:`$x_1=\\dfrac{${-b}+${sqrtDelta}}{2}=${x1}$, $x_2=\\dfrac{${-b}-${sqrtDelta}}{2}=${x2}$.` }
      ],
      solution: [
        { step:1, title:'Wyróżnik', content:`\\Delta = (${b})^2 - 4\\cdot1\\cdot(${c}) = ${b*b} - (${4*c}) = ${delta}`, explanation:'$\\Delta = b^2-4ac$.' },
        { step:2, title:'Pierwiastki równania', content:`x_1 = \\frac{${-b}+${sqrtDelta}}{2} = \\frac{${-b+sqrtDelta}}{2} = ${x1}\\qquad x_2 = \\frac{${-b}-${sqrtDelta}}{2} = \\frac{${-b-sqrtDelta}}{2} = ${x2}`, explanation:'' }
      ]
    };
  }

  // === SCHEMAT B: Układ dwóch równań liniowych ===
  function linearSystem() {
    const configs = [
      { eq1:'2x + y = 7', eq2:'x - y = 2', x:3, y:1,
        solve: ['2x+y=7,\\quad x-y=2', 'Dodajemy: 3x=9\\implies x=3', 'y=7-6=1'] },
      { eq1:'3x + 2y = 12', eq2:'x - y = 1', x:2, y:3,
        solve: ['3x+2y=12,\\quad x-y=1\\implies x=y+1', '3(y+1)+2y=12\\implies 5y=9\\implies y=\\frac{9}{5}',
                'Niestandardowe — użyj eliminacji: mnóż II przez 2: $2x-2y=2$. Dodaj do I: $5x=14$, $x=\\frac{14}{5}$'] },
      { eq1:'x + 2y = 8', eq2:'3x - y = 3', x:2, y:3,
        solve: ['x=8-2y,\\quad 3(8-2y)-y=3', '24-6y-y=3\\implies 7y=21\\implies y=3', 'x=8-6=2'] },
      { eq1:'2x - 3y = 1', eq2:'x + y = 3', x:2, y:1,
        solve: ['x=3-y,\\quad 2(3-y)-3y=1', '6-2y-3y=1\\implies 5y=5\\implies y=1', 'x=2'] },
      { eq1:'4x + y = 14', eq2:'x + 2y = 7', x:3, y:2,
        solve: ['Mnożymy I przez 2: 8x+2y=28. Odejmujemy II: 7x=21\\implies x=3', 'y=7-12=-5 — sprawdzamy z II: 3+2y=7\\implies y=2', 'x=3, y=2'] },
    ];
    // Użyj tylko poprawnych konfiguracji
    const validConfigs = [
      { eq1:'2x + y = 7', eq2:'x - y = 2', x:3, y:1 },
      { eq1:'x + 2y = 8', eq2:'3x - y = 3', x:2, y:3 },
      { eq1:'2x - 3y = 1', eq2:'x + y = 3', x:2, y:1 },
      { eq1:'4x + y = 14', eq2:'x + 2y = 7', x:3, y:2 },
      { eq1:'5x - 2y = 4', eq2:'x + y = 5', x:2, y:3 },
    ];
    const cfg = M.choose(validConfigs);
    const { eq1, eq2, x, y } = cfg;
    return {
      id: M.makeId('pp04_system'),
      category: 4,
      categoryName: 'Równania i układy',
      type: 'linear_system',
      points: 2,
      params: cfg,
      statement: `Rozwiąż układ równań:\n$$\\begin{cases} ${eq1} \\\\ ${eq2} \\end{cases}$$\nZapisz obliczenia.`,
      answer: { type: 'set', display: `x = ${x},\\quad y = ${y}`, description: `$x=${x}$, $y=${y}$` },
      hints: [
        { level:1, text:'Zastosuj metodę podstawiania lub eliminacji.' },
        { level:2, text:'Wyrażenie z jednego równania podstaw do drugiego lub dodaj/odejmij równania po przemnożeniu.' },
        { level:3, text:`Wynik: $x=${x}$, $y=${y}$. Sprawdź podstawiając do obu równań.` }
      ],
      solution: [
        { step:1, title:'Układ równań', content:`\\begin{cases} ${eq1} \\\\ ${eq2} \\end{cases}`, explanation:'' },
        { step:2, title:'Eliminacja zmiennej', content:`\\text{Z II: wyznaczamy jedną zmienną i podstawiamy do I.}`, explanation:'Metoda podstawiania lub eliminacji.' },
        { step:3, title:'Wynik', content:`x = ${x},\\quad y = ${y}`, explanation:'Sprawdź: podstaw do obu równań.' }
      ]
    };
  }

  // === SCHEMAT C: Wzory Viète'a — parametr w równaniu kwadratowym ===
  function vietaParam() {
    const configs = [
      {
        stmt: 'Suma i iloczyn pierwiastków równania $3x^2 - 12x + k = 0$ są równe. Wyznacz $k$.',
        a:3, b:-12,
        // Suma = 12/3 = 4, Iloczyn = k/3. Suma = Iloczyn → 4 = k/3 → k=12
        ans: 12, display: '12',
        steps: [
          { step:1, title:'Wzory Viète\'a', content:'x_1+x_2 = \\frac{-b}{a} = \\frac{12}{3}=4,\\quad x_1x_2=\\frac{k}{3}', explanation:'' },
          { step:2, title:'Warunek', content:'x_1+x_2=x_1x_2\\implies 4=\\frac{k}{3}\\implies k=\\mathbf{12}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Wzory Viète\'a: $x_1+x_2=\\frac{-b}{a}$, $x_1x_2=\\frac{c}{a}$.' },
          { level:2, text:'Suma pierwiastków $=4$, iloczyn $=\\frac{k}{3}$.' },
          { level:3, text:'$4=\\frac{k}{3}\\implies k=12$.' }
        ]
      },
      {
        stmt: 'Równanie $x^2 + px + 6 = 0$ ma pierwiastki $x_1$ i $x_2$ takie, że $x_1 + x_2 = -5$. Wyznacz $p$ i oblicz $x_1 \\cdot x_2$.',
        a:1, b:null,
        // Suma = -p = -5 → p=5; Iloczyn = 6
        ans: 5, display: 'p=5,\\ x_1x_2=6',
        steps: [
          { step:1, title:'Suma pierwiastków', content:'x_1+x_2=\\frac{-p}{1}=-p=-5\\implies p=5', explanation:'' },
          { step:2, title:'Iloczyn pierwiastków', content:'x_1x_2=\\frac{6}{1}=6', explanation:'' }
        ],
        hints:[
          { level:1, text:'Wzory Viète\'a: $x_1+x_2=-p$ dla $a=1$.' },
          { level:2, text:'$-p=-5\\implies p=5$.' },
          { level:3, text:'Iloczyn $=c/a=6$.' }
        ]
      },
      {
        stmt: 'Wiedząc, że $x_1=2$ jest pierwiastkiem równania $x^2 + bx - 6 = 0$, wyznacz $b$ i drugi pierwiastek $x_2$.',
        a:1, c:-6, x1:2,
        // x1*x2 = -6 → x2 = -3; x1+x2 = -b → 2+(-3)=-b → b=1
        ans: 1, display: 'b=1,\\ x_2=-3',
        steps: [
          { step:1, title:'Podstawienie x₁=2', content:'4+2b-6=0\\implies 2b=2\\implies b=1', explanation:'' },
          { step:2, title:'Drugi pierwiastek', content:'x_1x_2=\\frac{-6}{1}=-6\\implies x_2=\\frac{-6}{2}=-3', explanation:'Wzory Viète\'a: $x_1x_2=c/a$.' }
        ],
        hints:[
          { level:1, text:'Podstaw $x=2$ do równania i wyznacz $b$.' },
          { level:2, text:'$4+2b-6=0$.' },
          { level:3, text:'$b=1$. Iloczyn pierwiastków: $2\\cdot x_2=-6\\implies x_2=-3$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp04_vieta'),
      category: 4,
      categoryName: 'Równania i układy',
      type: 'vieta_param',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.display, description: `$${cfg.display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generateClosed() {
    const configs = [
      {
        stmt: 'Rozwiązaniami równania $x^2 - 5x + 6 = 0$ są:',
        options: { A: '$x=2$ i $x=3$', B: '$x=-2$ i $x=-3$', C: '$x=1$ i $x=6$', D: '$x=2$ i $x=-3$' },
        correct: 'A',
        hints: [{ level:1, text:'$\\Delta=25-24=1$, $x_{1,2}=\\frac{5\\pm1}{2}$.' }],
        solution: [{ step:1, title:'Wyróżnik', content:'\\Delta=25-24=1,\\quad x_1=\\frac{5-1}{2}=2,\\quad x_2=\\frac{5+1}{2}=3', explanation:'' }]
      },
      {
        stmt: 'Rozwiązaniem równania $\\dfrac{x+2}{3} = 2$ jest:',
        options: { A: '$x=4$', B: '$x=2$', C: '$x=8$', D: '$x=-2$' },
        correct: 'A',
        hints: [{ level:1, text:'Pomnóż obie strony przez 3: $x+2=6$.' }],
        solution: [{ step:1, title:'Rozwiązanie', content:'x+2=6\\implies x=4', explanation:'' }]
      },
      {
        stmt: 'Układ równań $\\begin{cases}2x+y=7\\\\x-y=2\\end{cases}$ ma rozwiązanie:',
        options: { A: '$x=3,\\ y=1$', B: '$x=1,\\ y=5$', C: '$x=3,\\ y=-1$', D: '$x=4,\\ y=1$' },
        correct: 'A',
        hints: [{ level:1, text:'Dodaj równania stronami: $3x=9$, $x=3$.' }],
        solution: [{ step:1, title:'Eliminacja', content:'3x=9\\Rightarrow x=3,\\quad y=7-6=1', explanation:'' }]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp04_closed'),
      categoryId: 'pp04',
      categoryName: 'Równania i układy',
      type: 'closed',
      points: 1,
      params: {},
      statement: cfg.stmt,
      options: cfg.options,
      correctOption: cfg.correct,
      answer: { type: 'choice', display: cfg.correct, description: `Odpowiedź: ${cfg.correct}` },
      hints: cfg.hints,
      solution: cfg.solution
    };
  }

  function generate() {
    return M.choose([quadratic, linearSystem, vietaParam])();
  }

  return { generate, generateClosed };
})();
