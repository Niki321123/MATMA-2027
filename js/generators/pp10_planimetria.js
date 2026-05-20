// PP Kategoria 10: Planimetria
// Schemat A: trójkąt — pole, obwód, wysokość
// Schemat B: trapez/równoległobok — pole i przekątna
// Schemat C: koło — pole, obwód, łuk
window.pp10 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Trójkąt ===
  function triangle() {
    const configs = [
      {
        stmt: 'Trójkąt równoboczny ma bok $a = 6$. Oblicz pole i wysokość tego trójkąta.',
        // h = a√3/2 = 3√3; P = a²√3/4 = 9√3
        h: '3\\sqrt{3}', P: '9\\sqrt{3}',
        steps: [
          { step:1, title:'Wysokość', content:'h=\\frac{a\\sqrt{3}}{2}=\\frac{6\\sqrt{3}}{2}=3\\sqrt{3}', explanation:'W trójkącie równobocznym $h=\\frac{a\\sqrt{3}}{2}$.' },
          { step:2, title:'Pole', content:'P=\\frac{a^2\\sqrt{3}}{4}=\\frac{36\\sqrt{3}}{4}=9\\sqrt{3}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Wzory: $h=\\frac{a\\sqrt{3}}{2}$, $P=\\frac{a^2\\sqrt{3}}{4}$.' },
          { level:2, text:'$h=3\\sqrt{3}$.' },
          { level:3, text:'$P=9\\sqrt{3}$.' }
        ]
      },
      {
        stmt: 'Trójkąt prostokątny ma przyprostokątne $a = 6$ i $b = 8$. Oblicz pole, obwód i długość przeciwprostokątnej.',
        c: 10, P: 24, L: 24,
        steps: [
          { step:1, title:'Przeciwprostokątna', content:'c=\\sqrt{6^2+8^2}=\\sqrt{36+64}=\\sqrt{100}=10', explanation:'' },
          { step:2, title:'Pole', content:'P=\\frac{1}{2}\\cdot6\\cdot8=24', explanation:'' },
          { step:3, title:'Obwód', content:'L=6+8+10=24', explanation:'' }
        ],
        hints:[
          { level:1, text:'Tw. Pitagorasa: $c^2=a^2+b^2$.' },
          { level:2, text:'$c=10$.' },
          { level:3, text:'$P=24$, $L=24$.' }
        ]
      },
      {
        stmt: 'Trójkąt ma podstawę $b = 10$ i wysokość $h = 7$. Oblicz jego pole.',
        P: 35,
        steps: [
          { step:1, title:'Wzór na pole', content:'P=\\frac{1}{2}\\cdot b\\cdot h=\\frac{1}{2}\\cdot10\\cdot7=35', explanation:'' }
        ],
        hints:[
          { level:1, text:'$P=\\frac{1}{2}bh$.' },
          { level:2, text:'$P=\\frac{1}{2}\\cdot10\\cdot7$.' },
          { level:3, text:'$P=35$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.c !== undefined ? `c=${cfg.c},\\ P=${cfg.P},\\ L=${cfg.L}` :
                    (cfg.h ? `h=${cfg.h},\\ P=${cfg.P}` : `P=${cfg.P}`);
    return {
      id: M.makeId('pp10_triangle'),
      category: 10,
      categoryName: 'Planimetria',
      type: 'triangle',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Trapez i równoległobok ===
  function trapezoid() {
    const configs = [
      {
        stmt: 'Trapez prostokątny ma podstawy $a = 5$ i $b = 9$, a wysokość $h = 4$. Oblicz pole i długość przekątnej łączącej wierzchołek przy dłuższej podstawie z końcem krótszej.',
        // P = (5+9)/2 * 4 = 28
        // Przekątna: w trapez prostokątnym jeden bok jest prostopadły
        // d = √(h² + (b-a)²+... )
        // Zakładamy: A(0,0), B(5,0), C(9,4), D(0,4) — trapez prostokątny
        // Przekątna BD = √((9-5)²+4²) = √(16+16)=√32 = 4√2? Nie, sprawdź:
        // Przekątna AC: A(0,0), C(9,4) = √(81+16)=√97... trudna
        // Przekątna BD: B(5,0), D(0,4) = √(25+16)=√41
        // Użyjemy prostszego obliczenia
        P: 28, diagAns: '\\sqrt{97}',
        steps: [
          { step:1, title:'Pole trapezu', content:'P=\\frac{(a+b)}{2}\\cdot h=\\frac{(5+9)}{2}\\cdot4=7\\cdot4=28', explanation:'' },
          { step:2, title:'Przekątna', content:'\\text{Wierzchołki: }A(0,0),\\ B(5,0),\\ C(9,4),\\ D(0,4)', explanation:'Trapez prostokątny: bok AD ⊥ podstawom.' },
          { step:3, title:'', content:'d_{AC}=\\sqrt{(9-0)^2+(4-0)^2}=\\sqrt{81+16}=\\sqrt{97}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$P=\\frac{(a+b)}{2}h$.' },
          { level:2, text:'$P=28$. Dla przekątnej: wyznacz współrzędne wierzchołków.' },
          { level:3, text:'$d=\\sqrt{81+16}=\\sqrt{97}$.' }
        ]
      },
      {
        stmt: 'Równoległobok ma boki $a = 8$ i $b = 5$ oraz kąt między nimi $\\alpha = 30°$. Oblicz pole tego równoległoboku.',
        // P = a·b·sin(α) = 8·5·(1/2) = 20
        P: 20,
        steps: [
          { step:1, title:'Wzór na pole', content:'P=a\\cdot b\\cdot\\sin\\alpha=8\\cdot5\\cdot\\sin30°=40\\cdot\\frac{1}{2}=20', explanation:'$P=a\\cdot b\\cdot\\sin\\alpha$.' }
        ],
        hints:[
          { level:1, text:'$P=ab\\sin\\alpha$.' },
          { level:2, text:'$\\sin30°=\\frac{1}{2}$.' },
          { level:3, text:'$P=8\\cdot5\\cdot\\frac{1}{2}=20$.' }
        ]
      },
      {
        stmt: 'Trapez równoramienny ma podstawy $a = 4$ i $b = 10$ oraz ramię $c = 5$. Oblicz pole trapezu.',
        // h² = c² - ((b-a)/2)² = 25 - 9 = 16, h=4; P = (4+10)/2 * 4 = 28
        h: 4, P: 28,
        steps: [
          { step:1, title:'Wysokość trapezu', content:'h=\\sqrt{c^2-\\left(\\frac{b-a}{2}\\right)^2}=\\sqrt{25-\\left(\\frac{6}{2}\\right)^2}=\\sqrt{25-9}=\\sqrt{16}=4', explanation:'$(b-a)/2=3$ to rzut ramienia na podstawę.' },
          { step:2, title:'Pole', content:'P=\\frac{(4+10)}{2}\\cdot4=7\\cdot4=28', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz wysokość: $h=\\sqrt{c^2-\\left(\\frac{b-a}{2}\\right)^2}$.' },
          { level:2, text:'$h=4$.' },
          { level:3, text:'$P=\\frac{(4+10)}{2}\\cdot4=28$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.diagAns ? `P=${cfg.P},\\ d=${cfg.diagAns}` : `P=${cfg.P}`;
    return {
      id: M.makeId('pp10_trapez'),
      category: 10,
      categoryName: 'Planimetria',
      type: 'trapezoid',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Koło — pole, obwód, łuk ===
  function circle() {
    const configs = [
      {
        stmt: 'Koło ma promień $r = 5$. Oblicz pole koła i długość okręgu. Wyniki wyraź przez $\\pi$.',
        P: '25\\pi', L: '10\\pi',
        steps: [
          { step:1, title:'Pole koła', content:'P=\\pi r^2=\\pi\\cdot25=25\\pi', explanation:'' },
          { step:2, title:'Długość okręgu', content:'L=2\\pi r=2\\pi\\cdot5=10\\pi', explanation:'' }
        ],
        hints:[
          { level:1, text:'$P=\\pi r^2$, $L=2\\pi r$.' },
          { level:2, text:'$P=25\\pi$.' },
          { level:3, text:'$L=10\\pi$.' }
        ]
      },
      {
        stmt: 'Długość okręgu wynosi $24\\pi$. Oblicz pole koła.',
        // 2πr = 24π → r=12; P=144π
        r: 12, P: '144\\pi',
        steps: [
          { step:1, title:'Wyznaczenie promienia', content:'2\\pi r=24\\pi\\implies r=12', explanation:'' },
          { step:2, title:'Pole koła', content:'P=\\pi\\cdot12^2=144\\pi', explanation:'' }
        ],
        hints:[
          { level:1, text:'$2\\pi r=24\\pi$.' },
          { level:2, text:'$r=12$.' },
          { level:3, text:'$P=144\\pi$.' }
        ]
      },
      {
        stmt: 'Wycinek koła o promieniu $r = 6$ i kącie środkowym $\\alpha = 60°$ (mierzonego w stopniach). Oblicz pole wycinka i długość łuku.',
        // P = (60/360)·π·36 = (1/6)·36π = 6π
        // l = (60/360)·2π·6 = (1/6)·12π = 2π
        P: '6\\pi', l: '2\\pi',
        steps: [
          { step:1, title:'Pole wycinka', content:'P=\\frac{\\alpha}{360°}\\cdot\\pi r^2=\\frac{60°}{360°}\\cdot36\\pi=\\frac{1}{6}\\cdot36\\pi=6\\pi', explanation:'' },
          { step:2, title:'Długość łuku', content:'l=\\frac{\\alpha}{360°}\\cdot2\\pi r=\\frac{1}{6}\\cdot12\\pi=2\\pi', explanation:'' }
        ],
        hints:[
          { level:1, text:'$P_{wycinka}=\\frac{\\alpha}{360°}\\cdot\\pi r^2$.' },
          { level:2, text:'$\\frac{60}{360}=\\frac{1}{6}$.' },
          { level:3, text:'$P=6\\pi$, $l=2\\pi$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.l ? `P=${cfg.P},\\ l=${cfg.l}` : `P=${cfg.P},\\ L=${cfg.L || ''}`;
    return {
      id: M.makeId('pp10_circle'),
      category: 10,
      categoryName: 'Planimetria',
      type: 'circle',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([triangle, trapezoid, circle])();
  }

  return { generate };
})();
