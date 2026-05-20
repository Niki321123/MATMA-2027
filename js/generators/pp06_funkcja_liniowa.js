// PP Kategoria 6: Funkcja liniowa
// Schemat A: wyznaczanie wzoru f(x)=ax+b z 2 warunków
// Schemat B: prostokąt/równoległość prostych
// Schemat C: zadanie tekstowe z funkcją liniową
window.pp06 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Wyznaczanie wzoru z 2 punktów ===
  function linearFormula() {
    const configs = [
      {
        pt1: { x:0, y:3 }, pt2: { x:2, y:7 },
        a: 2, b: 3,
        ans: 'f(x) = 2x + 3',
        steps: [
          { step:1, title:'Współczynnik kierunkowy', content:'a=\\frac{7-3}{2-0}=\\frac{4}{2}=2', explanation:'' },
          { step:2, title:'Wyraz wolny', content:'b=y_1-a\\cdot x_1=3-2\\cdot0=3', explanation:'' },
          { step:3, title:'Wzór', content:'f(x)=2x+3', explanation:'' }
        ],
        hints:[
          { level:1, text:'Współczynnik kierunkowy: $a=\\frac{y_2-y_1}{x_2-x_1}$.' },
          { level:2, text:'$a=\\frac{7-3}{2-0}=2$.' },
          { level:3, text:'$b=3$, więc $f(x)=2x+3$.' }
        ],
        stmt: 'Wyznacz wzór funkcji liniowej $f(x)=ax+b$ przechodzącej przez punkty $A(0,3)$ i $B(2,7)$.'
      },
      {
        pt1: { x:1, y:5 }, pt2: { x:3, y:1 },
        a: -2, b: 7,
        ans: 'f(x) = -2x + 7',
        steps: [
          { step:1, title:'Współczynnik kierunkowy', content:'a=\\frac{1-5}{3-1}=\\frac{-4}{2}=-2', explanation:'' },
          { step:2, title:'Wyraz wolny', content:'5=(-2)\\cdot1+b\\implies b=7', explanation:'' },
          { step:3, title:'Wzór', content:'f(x)=-2x+7', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a=\\frac{1-5}{3-1}$.' },
          { level:2, text:'$a=-2$. Podstaw jeden punkt, by znaleźć $b$.' },
          { level:3, text:'$f(x)=-2x+7$.' }
        ],
        stmt: 'Wyznacz wzór funkcji liniowej przechodzącej przez punkty $A(1,5)$ i $B(3,1)$.'
      },
      {
        pt1: { x:-1, y:2 }, pt2: { x:2, y:8 },
        a: 2, b: 4,
        ans: 'f(x) = 2x + 4',
        steps: [
          { step:1, title:'Współczynnik kierunkowy', content:'a=\\frac{8-2}{2-(-1)}=\\frac{6}{3}=2', explanation:'' },
          { step:2, title:'Wyraz wolny', content:'2=2\\cdot(-1)+b\\implies b=4', explanation:'' },
          { step:3, title:'Wzór', content:'f(x)=2x+4', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a=\\frac{8-2}{2-(-1)}=2$.' },
          { level:2, text:'Podstaw punkt $A(-1,2)$: $2=2\\cdot(-1)+b$.' },
          { level:3, text:'$b=4$, $f(x)=2x+4$.' }
        ],
        stmt: 'Wyznacz wzór funkcji liniowej przechodzącej przez punkty $A(-1,2)$ i $B(2,8)$.'
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp06_formula'),
      category: 6,
      categoryName: 'Funkcja liniowa',
      type: 'linear_formula',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Prostokątność i równoległość prostych ===
  function perpParallel() {
    const configs = [
      {
        stmt: 'Prosta $l\\colon y = 2x + k$ jest prostopadła do prostej $m\\colon y = -\\frac{1}{2}x + 3$ i przechodzi przez punkt $A(2, 1)$. Wyznacz $k$.',
        perpCheck: 'Sprawdzenie: $2\\cdot(-\\frac{1}{2})=-1$ ✓ (iloczyn współczynników prostopadłych = −1).',
        ans: 'k = -3', ansVal: -3,
        steps: [
          { step:1, title:'Warunek prostopadłości', content:'a_l\\cdot a_m=2\\cdot\\left(-\\frac{1}{2}\\right)=-1\\checkmark', explanation:'Dwie proste są prostopadłe, gdy $a_1\\cdot a_2=-1$.' },
          { step:2, title:'Wyznaczenie k', content:'y=2x+k,\\quad A(2,1):\\quad 1=2\\cdot2+k\\implies k=1-4=-3', explanation:'' }
        ],
        hints:[
          { level:1, text:'Sprawdź prostopadłość: $a_l\\cdot a_m=-1$.' },
          { level:2, text:'$2\\cdot(-\\frac{1}{2})=-1$ ✓. Podstaw punkt $A$ do wzoru prostej $l$.' },
          { level:3, text:'$1=4+k\\implies k=-3$.' }
        ]
      },
      {
        stmt: 'Wyznacz równanie prostej równoległej do $y = 3x - 2$ przechodzącej przez punkt $P(1, 5)$.',
        ans: 'y = 3x + 2',
        steps: [
          { step:1, title:'Równoległość', content:'\\text{Prosta równoległa ma ten sam współczynnik kierunkowy: }a=3.', explanation:'' },
          { step:2, title:'Wyznaczenie b', content:'5=3\\cdot1+b\\implies b=2', explanation:'' },
          { step:3, title:'Równanie', content:'y=3x+2', explanation:'' }
        ],
        hints:[
          { level:1, text:'Proste równoległe mają ten sam $a$.' },
          { level:2, text:'$a=3$. Podstaw punkt $P(1,5)$.' },
          { level:3, text:'$b=2$, równanie: $y=3x+2$.' }
        ]
      },
      {
        stmt: 'Wyznacz równanie prostej prostopadłej do $y = 4x - 1$ przechodzącej przez punkt $Q(4, 3)$.',
        // a_perp = -1/4
        ans: 'y = -\\dfrac{1}{4}x + 4',
        steps: [
          { step:1, title:'Współczynnik prostopadłej', content:'a=4\\implies a_\\perp=-\\frac{1}{4}', explanation:'$a\\cdot a_\\perp=-1\\implies a_\\perp=-\\frac{1}{4}$.' },
          { step:2, title:'Wyznaczenie b', content:'3=-\\frac{1}{4}\\cdot4+b\\implies3=-1+b\\implies b=4', explanation:'' },
          { step:3, title:'Równanie', content:'y=-\\frac{1}{4}x+4', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a_\\perp=-1/a=-1/4$.' },
          { level:2, text:'Podstaw $Q(4,3)$: $3=-1+b$.' },
          { level:3, text:'$b=4$, $y=-\\frac{1}{4}x+4$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp06_perpPar'),
      category: 6,
      categoryName: 'Funkcja liniowa',
      type: 'perp_parallel',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Zadanie tekstowe z funkcją liniową ===
  function linearWordProblem() {
    const configs = [
      {
        stmt: 'Taksówkarz pobiera opłatę startową $5$ zł, a następnie $2{,}50$ zł za każdy kilometr jazdy. ' +
          'Wyraź koszt przejazdu $f(x)$ jako funkcję liczby kilometrów $x$. ' +
          'Oblicz, ile kosztuje przejazd $12$ km.',
        ans_formula: 'f(x) = 2{,}5x + 5', ans_val: 35, ans_display: '35\\text{ zł}',
        steps: [
          { step:1, title:'Wzór', content:'f(x)=2{,}5x+5', explanation:'Koszt = opłata za km × km + opłata startowa.' },
          { step:2, title:'Dla x=12', content:'f(12)=2{,}5\\cdot12+5=30+5=35\\text{ zł}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Zapisz wzór: $f(x)=\\text{cena/km}\\cdot x+\\text{opłata startowa}$.' },
          { level:2, text:'$f(x)=2{,}5x+5$.' },
          { level:3, text:'$f(12)=30+5=35$ zł.' }
        ]
      },
      {
        stmt: 'Temperatura w piecu wzrasta liniowo. O godzinie $8{:}00$ wynosi $20°C$, a o $10{:}00$ wynosi $80°C$. ' +
          'Wyraź temperaturę $T$ jako funkcję czasu $t$ (w godzinach od $8{:}00$). ' +
          'O której godzinie temperatura wyniesie $140°C$?',
        ans_formula: 'T(t)=30t+20', ans_display: '12{:}00',
        steps: [
          { step:1, title:'Współczynnik kierunkowy', content:'a=\\frac{80-20}{2-0}=30\\text{ °C/h}', explanation:'' },
          { step:2, title:'Wzór', content:'T(t)=30t+20', explanation:'' },
          { step:3, title:'T=140', content:'30t+20=140\\implies30t=120\\implies t=4\\text{ h}\\implies \\text{godz. }12{:}00', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a=\\frac{80-20}{2}=30$.' },
          { level:2, text:'$T(t)=30t+20$.' },
          { level:3, text:'$30t+20=140\\implies t=4\\implies 8{:}00+4\\text{h}=12{:}00$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp06_word'),
      category: 6,
      categoryName: 'Funkcja liniowa',
      type: 'linear_word',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.ans_display || cfg.ans_formula, description: cfg.ans_formula ? `Wzór: $${cfg.ans_formula}$` : '' },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([linearFormula, perpParallel, linearWordProblem])();
  }

  return { generate };
})();
