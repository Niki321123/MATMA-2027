// PP Kategoria 7: Funkcja kwadratowa
// Schemat A: wierzchołek paraboli i postać kanoniczna
// Schemat B: miejsca zerowe (delta)
// Schemat C: wyznaczanie wzoru z danych warunków
window.pp07 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Postać kanoniczna i wierzchołek ===
  function canonicalForm() {
    const configs = [
      {
        f: '2x^2 - 8x + 3',
        a: 2, b: -8, c: 3,
        // p = -b/(2a) = 8/4 = 2; q = c - b²/(4a) = 3 - 64/8 = 3-8 = -5
        p: 2, q: -5,
        canonical: '2(x-2)^2 - 5',
        vertex: 'W = (2, -5)',
        steps: [
          { step:1, title:'Wzór na wierzchołek', content:'p=\\frac{-b}{2a}=\\frac{8}{4}=2,\\quad q=\\frac{-(b^2-4ac)}{4a}=c-\\frac{b^2}{4a}=3-\\frac{64}{8}=3-8=-5', explanation:'' },
          { step:2, title:'Postać kanoniczna', content:'f(x)=2(x-2)^2-5', explanation:'$f(x)=a(x-p)^2+q$.' }
        ],
        hints:[
          { level:1, text:'Współrzędne wierzchołka: $p=\\frac{-b}{2a}$, $q=f(p)$.' },
          { level:2, text:'$p=2$, $q=f(2)=2\\cdot4-16+3=-5$.' },
          { level:3, text:'$f(x)=2(x-2)^2-5$.' }
        ]
      },
      {
        f: 'x^2 + 6x + 5',
        a: 1, b: 6, c: 5,
        p: -3, q: -4,
        canonical: '(x+3)^2 - 4',
        vertex: 'W = (-3, -4)',
        steps: [
          { step:1, title:'Wierzchołek', content:'p=\\frac{-6}{2}=-3,\\quad q=f(-3)=9-18+5=-4', explanation:'' },
          { step:2, title:'Postać kanoniczna', content:'f(x)=(x+3)^2-4', explanation:'' }
        ],
        hints:[
          { level:1, text:'$p=-b/(2a)$.' },
          { level:2, text:'$p=-3$, $q=-4$.' },
          { level:3, text:'$f(x)=(x+3)^2-4$.' }
        ]
      },
      {
        f: '-x^2 + 4x - 1',
        a: -1, b: 4, c: -1,
        p: 2, q: 3,
        canonical: '-(x-2)^2 + 3',
        vertex: 'W = (2, 3)',
        steps: [
          { step:1, title:'Wierzchołek', content:'p=\\frac{-4}{-2}=2,\\quad q=f(2)=-4+8-1=3', explanation:'' },
          { step:2, title:'Postać kanoniczna', content:'f(x)=-(x-2)^2+3', explanation:'' }
        ],
        hints:[
          { level:1, text:'$p=2$, $q=f(2)$.' },
          { level:2, text:'$q=3$.' },
          { level:3, text:'$f(x)=-(x-2)^2+3$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp07_canonical'),
      category: 7,
      categoryName: 'Funkcja kwadratowa',
      type: 'canonical_form',
      points: 2,
      params: {},
      statement: `Wyznacz postać kanoniczną funkcji $f(x) = ${cfg.f}$ i podaj współrzędne wierzchołka paraboli. Zapisz obliczenia.`,
      answer: { type: 'expression', display: cfg.canonical + ',\\quad ' + cfg.vertex, description: `$${cfg.canonical}$, wierzchołek $${cfg.vertex}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Miejsca zerowe ===
  function zeros() {
    const configs = [
      {
        f: 'x^2 - 5x + 6', delta: 1, x1: 2, x2: 3,
        stmt: 'Wyznacz miejsca zerowe funkcji $f(x) = x^2 - 5x + 6$.',
        steps: [
          { step:1, title:'Wyróżnik', content:'\\Delta=25-24=1,\\quad\\sqrt{\\Delta}=1', explanation:'' },
          { step:2, title:'Pierwiastki', content:'x_1=\\frac{5-1}{2}=2,\\quad x_2=\\frac{5+1}{2}=3', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz $\\Delta=b^2-4ac$.' },
          { level:2, text:'$\\Delta=1$, $\\sqrt{\\Delta}=1$.' },
          { level:3, text:'$x_1=2$, $x_2=3$.' }
        ]
      },
      {
        f: 'x^2 - 4x - 5', delta: 36, x1: -1, x2: 5,
        stmt: 'Wyznacz miejsca zerowe funkcji $f(x) = x^2 - 4x - 5$.',
        steps: [
          { step:1, title:'Wyróżnik', content:'\\Delta=16+20=36,\\quad\\sqrt{\\Delta}=6', explanation:'' },
          { step:2, title:'Pierwiastki', content:'x_1=\\frac{4-6}{2}=-1,\\quad x_2=\\frac{4+6}{2}=5', explanation:'' }
        ],
        hints:[
          { level:1, text:'$\\Delta=(-4)^2-4\\cdot1\\cdot(-5)=36$.' },
          { level:2, text:'$\\sqrt{\\Delta}=6$.' },
          { level:3, text:'$x_1=-1$, $x_2=5$.' }
        ]
      },
      {
        f: '2x^2 - x - 3', delta: 25, x1: -1, x2: 1.5,
        stmt: 'Wyznacz miejsca zerowe funkcji $f(x) = 2x^2 - x - 3$.',
        steps: [
          { step:1, title:'Wyróżnik', content:'\\Delta=1+24=25,\\quad\\sqrt{\\Delta}=5', explanation:'' },
          { step:2, title:'Pierwiastki', content:'x_1=\\frac{1-5}{4}=-1,\\quad x_2=\\frac{1+5}{4}=\\frac{3}{2}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$\\Delta=(-1)^2-4\\cdot2\\cdot(-3)=25$.' },
          { level:2, text:'$\\sqrt{\\Delta}=5$.' },
          { level:3, text:'$x_1=-1$, $x_2=\\frac{3}{2}$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp07_zeros'),
      category: 7,
      categoryName: 'Funkcja kwadratowa',
      type: 'zeros',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'set', display: `x_1=${cfg.x1},\\quad x_2=${cfg.x2}`, description: `$x_1=${cfg.x1}$, $x_2=${cfg.x2}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Wyznaczanie wzoru z warunków ===
  function fromConditions() {
    const configs = [
      {
        stmt: 'Parabola ma wierzchołek $W=(2,-3)$ i przechodzi przez punkt $(0,5)$. Wyznacz wzór tej funkcji kwadratowej.',
        // f(x) = a(x-2)²-3; f(0)=5 → 4a-3=5 → a=2
        ans: 'f(x) = 2(x-2)^2 - 3 = 2x^2 - 8x + 5',
        steps: [
          { step:1, title:'Postać kanoniczna', content:'f(x)=a(x-2)^2-3', explanation:'Wierzchołek W=(2,-3) → $p=2$, $q=-3$.' },
          { step:2, title:'Wyznaczenie a', content:'f(0)=5:\\quad a(0-2)^2-3=5\\implies4a=8\\implies a=2', explanation:'' },
          { step:3, title:'Wzór', content:'f(x)=2(x-2)^2-3=2x^2-8x+5', explanation:'' }
        ],
        hints:[
          { level:1, text:'Zapisz $f(x)=a(x-2)^2-3$ i podstaw punkt $(0,5)$.' },
          { level:2, text:'$4a-3=5\\implies a=2$.' },
          { level:3, text:'$f(x)=2(x-2)^2-3=2x^2-8x+5$.' }
        ]
      },
      {
        stmt: 'Funkcja kwadratowa ma miejsca zerowe $x_1=-1$ i $x_2=3$ oraz przechodzi przez punkt $(1,-4)$. Wyznacz wzór tej funkcji.',
        // f(x)=a(x+1)(x-3); f(1)=a·2·(-2)=-4a=-4 → a=1
        ans: 'f(x) = (x+1)(x-3) = x^2 - 2x - 3',
        steps: [
          { step:1, title:'Postać iloczynowa', content:'f(x)=a(x-(-1))(x-3)=a(x+1)(x-3)', explanation:'' },
          { step:2, title:'Wyznaczenie a', content:'f(1)=-4:\\quad a(1+1)(1-3)=-4\\implies a\\cdot2\\cdot(-2)=-4\\implies-4a=-4\\implies a=1', explanation:'' },
          { step:3, title:'Wzór', content:'f(x)=(x+1)(x-3)=x^2-2x-3', explanation:'' }
        ],
        hints:[
          { level:1, text:'Postać iloczynowa: $f(x)=a(x+1)(x-3)$.' },
          { level:2, text:'Podstaw $(1,-4)$: $a(2)(-2)=-4$.' },
          { level:3, text:'$a=1$, $f(x)=x^2-2x-3$.' }
        ]
      },
      {
        stmt: 'Funkcja kwadratowa $f(x)=ax^2+bx+c$ osiąga minimum równe $-4$ dla $x=3$ i przechodzi przez punkt $(0,5)$. Wyznacz wzór funkcji.',
        // f(x)=a(x-3)²-4; f(0)=9a-4=5 → a=1
        ans: 'f(x) = (x-3)^2 - 4 = x^2 - 6x + 5',
        steps: [
          { step:1, title:'Minimum', content:'f(x)=a(x-3)^2-4,\\quad a>0', explanation:'Minimum (nie maksimum): $a>0$.' },
          { step:2, title:'Wyznaczenie a', content:'f(0)=5:\\quad9a-4=5\\implies a=1', explanation:'' },
          { step:3, title:'Wzór', content:'f(x)=(x-3)^2-4=x^2-6x+5', explanation:'' }
        ],
        hints:[
          { level:1, text:'Minimum dla $x=3$ o wartości $-4$: $f(x)=a(x-3)^2-4$, $a>0$.' },
          { level:2, text:'$f(0)=9a-4=5$.' },
          { level:3, text:'$a=1$, $f(x)=x^2-6x+5$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp07_fromCond'),
      category: 7,
      categoryName: 'Funkcja kwadratowa',
      type: 'from_conditions',
      points: 3,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([canonicalForm, zeros, fromConditions])();
  }

  return { generate };
})();
