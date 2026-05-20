// PP Kategoria 14: Geometria analityczna
// Schemat A: odległość i środek odcinka, długość
// Schemat B: równanie prostej przez 2 punkty, prostopadłość
// Schemat C: równanie okręgu i analiza
window.pp14 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Odległość i środek odcinka ===
  function segmentMidpoint() {
    const configs = [
      {
        A: { x:1, y:3 }, B: { x:5, y:7 },
        mid: { x:3, y:5 },
        d: '4\\sqrt{2}',
        stmt: 'Dane $A(1,3)$ i $B(5,7)$. Wyznacz środek odcinka $AB$ i jego długość.',
        steps: [
          { step:1, title:'Środek', content:'S=\\left(\\frac{1+5}{2},\\frac{3+7}{2}\\right)=(3,5)', explanation:'' },
          { step:2, title:'Długość', content:'|AB|=\\sqrt{(5-1)^2+(7-3)^2}=\\sqrt{16+16}=\\sqrt{32}=4\\sqrt{2}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Środek: $S=\\left(\\frac{x_A+x_B}{2},\\frac{y_A+y_B}{2}\\right)$.' },
          { level:2, text:'$S=(3,5)$.' },
          { level:3, text:'$|AB|=4\\sqrt{2}$.' }
        ]
      },
      {
        A: { x:-2, y:1 }, B: { x:4, y:-3 },
        mid: { x:1, y:-1 },
        d: '2\\sqrt{13}',
        stmt: 'Dane $A(-2,1)$ i $B(4,-3)$. Wyznacz środek odcinka $AB$ i jego długość.',
        steps: [
          { step:1, title:'Środek', content:'S=\\left(\\frac{-2+4}{2},\\frac{1+(-3)}{2}\\right)=(1,-1)', explanation:'' },
          { step:2, title:'Długość', content:'|AB|=\\sqrt{(4-(-2))^2+(-3-1)^2}=\\sqrt{36+16}=\\sqrt{52}=2\\sqrt{13}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Wzory na środek i odległość.' },
          { level:2, text:'$S=(1,-1)$.' },
          { level:3, text:'$|AB|=\\sqrt{52}=2\\sqrt{13}$.' }
        ]
      },
      {
        A: { x:0, y:0 }, B: { x:6, y:8 },
        mid: { x:3, y:4 },
        d: '10',
        stmt: 'Dane $A(0,0)$ i $B(6,8)$. Wyznacz środek odcinka $AB$ i jego długość.',
        steps: [
          { step:1, title:'Środek', content:'S=(3,4)', explanation:'' },
          { step:2, title:'Długość', content:'|AB|=\\sqrt{36+64}=\\sqrt{100}=10', explanation:'' }
        ],
        hints:[
          { level:1, text:'$S=(3,4)$.' },
          { level:2, text:'$|AB|=\\sqrt{36+64}$.' },
          { level:3, text:'$|AB|=10$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = `S=(${cfg.mid.x},${cfg.mid.y}),\\ |AB|=${cfg.d}`;
    return {
      id: M.makeId('pp14_midpoint'),
      category: 14,
      categoryName: 'Geometria analityczna',
      type: 'segment_midpoint',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Równanie prostej i prostopadłość ===
  function lineEquation() {
    const configs = [
      {
        stmt: 'Wyznacz równanie prostej prostopadłej do $y = 3x - 1$ przechodzącej przez punkt $P(6, 2)$.',
        // a_perp = -1/3; b: 2 = -1/3·6 + b → b = 4
        ans: 'y = -\\dfrac{1}{3}x + 4',
        steps: [
          { step:1, title:'Współczynnik prostopadłej', content:'a_{\\perp}=-\\frac{1}{3}', explanation:'$3\\cdot a_{\\perp}=-1$.' },
          { step:2, title:'Wyznaczenie b', content:'2=-\\frac{1}{3}\\cdot6+b\\implies2=-2+b\\implies b=4', explanation:'' },
          { step:3, title:'Równanie', content:'y=-\\frac{1}{3}x+4', explanation:'' }
        ],
        hints:[
          { level:1, text:'Prosta prostopadła do $y=3x-1$ ma $a=-1/3$.' },
          { level:2, text:'Podstaw $P(6,2)$: $2=-2+b$.' },
          { level:3, text:'$b=4$, równanie: $y=-\\frac{1}{3}x+4$.' }
        ]
      },
      {
        stmt: 'Wyznacz równanie prostej przechodzącej przez punkty $A(2,1)$ i $B(4,7)$.',
        // a = (7-1)/(4-2) = 3; b = 1-3·2 = -5
        ans: 'y = 3x - 5',
        steps: [
          { step:1, title:'Współczynnik kierunkowy', content:'a=\\frac{7-1}{4-2}=\\frac{6}{2}=3', explanation:'' },
          { step:2, title:'Wyraz wolny', content:'1=3\\cdot2+b\\implies b=-5', explanation:'' },
          { step:3, title:'Równanie', content:'y=3x-5', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a=\\frac{y_2-y_1}{x_2-x_1}$.' },
          { level:2, text:'$a=3$.' },
          { level:3, text:'$b=-5$, równanie: $y=3x-5$.' }
        ]
      },
      {
        stmt: 'Prosta $l$ przechodzi przez punkt $A(3,4)$ i jest równoległa do prostej $y = 2x + 5$. Wyznacz równanie prostej $l$.',
        ans: 'y = 2x - 2',
        steps: [
          { step:1, title:'Równoległość', content:'a=2\\text{ (ten sam współczynnik)}', explanation:'' },
          { step:2, title:'Wyznaczenie b', content:'4=2\\cdot3+b\\implies b=-2', explanation:'' },
          { step:3, title:'Równanie', content:'y=2x-2', explanation:'' }
        ],
        hints:[
          { level:1, text:'Prosta równoległa ma taki sam $a$.' },
          { level:2, text:'$a=2$. Podstaw $A(3,4)$.' },
          { level:3, text:'$b=-2$, $y=2x-2$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp14_line'),
      category: 14,
      categoryName: 'Geometria analityczna',
      type: 'line_equation',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Równanie okręgu ===
  function circleEquation() {
    const configs = [
      {
        stmt: 'Wyznacz równanie okręgu o środku $S(2, -3)$ i promieniu $r = 5$.',
        ans: '(x-2)^2 + (y+3)^2 = 25',
        steps: [
          { step:1, title:'Wzór na okrąg', content:'(x-a)^2+(y-b)^2=r^2', explanation:'Środek $(a,b)$, promień $r$.' },
          { step:2, title:'Podstawienie', content:'(x-2)^2+(y-(-3))^2=25\\implies(x-2)^2+(y+3)^2=25', explanation:'' }
        ],
        hints:[
          { level:1, text:'$(x-a)^2+(y-b)^2=r^2$.' },
          { level:2, text:'$S=(2,-3)$, $r=5$.' },
          { level:3, text:'$(x-2)^2+(y+3)^2=25$.' }
        ]
      },
      {
        stmt: 'Sprawdź, czy punkt $P(4, 1)$ leży na okręgu $(x-1)^2+(y+2)^2=25$, wewnątrz niego czy na zewnątrz.',
        // d² = (4-1)²+(1+2)² = 9+9=18 < 25 → wewnątrz
        ans: '\\text{Wewnątrz okręgu}',
        steps: [
          { step:1, title:'Podstawienie punktu', content:'(4-1)^2+(1+2)^2=9+9=18', explanation:'' },
          { step:2, title:'Porównanie z r²', content:'18<25\\implies\\text{punkt leży wewnątrz okręgu}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Podstaw $P(4,1)$ do lewej strony równania okręgu.' },
          { level:2, text:'$(4-1)^2+(1+2)^2=18$.' },
          { level:3, text:'$18<25$ — punkt wewnątrz.' }
        ]
      },
      {
        stmt: 'Okrąg ma środek $S(0,0)$ i przechodzi przez punkt $A(3,4)$. Wyznacz równanie tego okręgu.',
        // r = |SA| = √(9+16)=5; r²=25
        ans: 'x^2 + y^2 = 25',
        steps: [
          { step:1, title:'Promień', content:'r=|SA|=\\sqrt{(3-0)^2+(4-0)^2}=\\sqrt{9+16}=5', explanation:'' },
          { step:2, title:'Równanie', content:'x^2+y^2=25', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz $r=|SA|$.' },
          { level:2, text:'$r=5$.' },
          { level:3, text:'$x^2+y^2=25$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp14_circle'),
      category: 14,
      categoryName: 'Geometria analityczna',
      type: 'circle_equation',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generateClosed() {
    const configs = [
      {
        stmt: 'Odległość punktu $A=(1,\\ 2)$ od punktu $B=(4,\\ 6)$ wynosi:',
        options: { A: '$5$', B: '$\\sqrt{7}$', C: '$7$', D: '$\\sqrt{50}$' },
        correct: 'A',
        hints: [{ level:1, text:'$|AB|=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}$.' }],
        solution: [{ step:1, title:'Obliczenie', content:'|AB|=\\sqrt{9+16}=\\sqrt{25}=5', explanation:'' }]
      },
      {
        stmt: 'Prosta $y = 3x - 2$ przecina oś $Oy$ w punkcie:',
        options: { A: '$(0,\\ -2)$', B: '$(-2,\\ 0)$', C: '$(0,\\ 3)$', D: '$(2,\\ 0)$' },
        correct: 'A',
        hints: [{ level:1, text:'Oś $Oy$: $x=0$. Podstaw $x=0$.' }],
        solution: [{ step:1, title:'Obliczenie', content:'y=3\\cdot0-2=-2\\implies(0,-2)', explanation:'' }]
      },
      {
        stmt: 'Środek odcinka $AB$, gdzie $A=(2,\\ 4)$ i $B=(6,\\ 2)$, ma współrzędne:',
        options: { A: '$(4,\\ 3)$', B: '$(3,\\ 4)$', C: '$(4,\\ 4)$', D: '$(2,\\ 3)$' },
        correct: 'A',
        hints: [{ level:1, text:'$S=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$.' }],
        solution: [{ step:1, title:'Obliczenie', content:'S=\\left(\\frac{2+6}{2},\\frac{4+2}{2}\\right)=(4,3)', explanation:'' }]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp14_closed'),
      categoryId: 'pp14',
      categoryName: 'Geometria analityczna (PP)',
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
    return M.choose([segmentMidpoint, lineEquation, circleEquation])();
  }

  return { generate, generateClosed };
})();
