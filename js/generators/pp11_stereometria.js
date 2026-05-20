// PP Kategoria 11: Stereometria
// Schemat A: graniastosłup (prosty prostokątny, sześcian)
// Schemat B: ostrosłup i piramida
// Schemat C: walec i stożek
window.pp11 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Graniastosłup prostokątny ===
  function prism() {
    const configs = [
      {
        stmt: 'Graniastosłup prostokątny (prostopadłościan) ma wymiary $a = 4$, $b = 3$, $c = 5$. Oblicz objętość i pole powierzchni całkowitej.',
        a:4, b:3, c:5,
        V: 60, // 4·3·5
        S: 2*(4*3 + 4*5 + 3*5), // 2*(12+20+15)=94
        steps: [
          { step:1, title:'Objętość', content:'V=a\\cdot b\\cdot c=4\\cdot3\\cdot5=60', explanation:'' },
          { step:2, title:'Pole powierzchni', content:'S=2(ab+ac+bc)=2(12+20+15)=2\\cdot47=94', explanation:'' }
        ],
        hints:[
          { level:1, text:'$V=abc$, $S=2(ab+ac+bc)$.' },
          { level:2, text:'$V=60$.' },
          { level:3, text:'$S=94$.' }
        ]
      },
      {
        stmt: 'Sześcian ma krawędź $a = 3$. Oblicz objętość, pole powierzchni i długość przekątnej.',
        a:3,
        V: 27,
        S: 54,
        d: '3\\sqrt{3}',
        steps: [
          { step:1, title:'Objętość', content:'V=3^3=27', explanation:'' },
          { step:2, title:'Pole powierzchni', content:'S=6a^2=6\\cdot9=54', explanation:'' },
          { step:3, title:'Przekątna', content:'d=a\\sqrt{3}=3\\sqrt{3}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$V=a^3$, $S=6a^2$, $d=a\\sqrt{3}$.' },
          { level:2, text:'$V=27$, $S=54$.' },
          { level:3, text:'$d=3\\sqrt{3}$.' }
        ]
      },
      {
        stmt: 'Graniastosłup trójkątny prostokątny ma podstawę trójkąt prostokątny o przyprostokątnych $3$ i $4$ oraz wysokość $h = 6$. Oblicz objętość.',
        // P_base = 3*4/2 = 6; V = 6*6 = 36
        V: 36,
        steps: [
          { step:1, title:'Pole podstawy', content:'P_\\text{pod}=\\frac{1}{2}\\cdot3\\cdot4=6', explanation:'' },
          { step:2, title:'Objętość', content:'V=P_\\text{pod}\\cdot h=6\\cdot6=36', explanation:'' }
        ],
        hints:[
          { level:1, text:'$V=P_{\\text{podstawy}}\\cdot h$.' },
          { level:2, text:'$P_{\\text{pod}}=\\frac{1}{2}\\cdot3\\cdot4=6$.' },
          { level:3, text:'$V=36$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.d ? `V=${cfg.V},\\ S=${cfg.S},\\ d=${cfg.d}` :
                    (cfg.S ? `V=${cfg.V},\\ S=${cfg.S}` : `V=${cfg.V}`);
    return {
      id: M.makeId('pp11_prism'),
      category: 11,
      categoryName: 'Stereometria',
      type: 'prism',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Ostrosłup (piramida) ===
  function pyramid() {
    const configs = [
      {
        stmt: 'Ostrosłup prawidłowy czworokątny ma podstawę kwadratu o boku $a = 6$ i wysokość $h = 4$. Oblicz jego objętość.',
        // V = (1/3)·a²·h = (1/3)·36·4 = 48
        V: 48,
        steps: [
          { step:1, title:'Pole podstawy', content:'P_\\text{pod}=6^2=36', explanation:'' },
          { step:2, title:'Objętość', content:'V=\\frac{1}{3}\\cdot36\\cdot4=48', explanation:'' }
        ],
        hints:[
          { level:1, text:'$V=\\frac{1}{3}\\cdot P_{\\text{pod}}\\cdot h$.' },
          { level:2, text:'$P_{\\text{pod}}=36$.' },
          { level:3, text:'$V=48$.' }
        ]
      },
      {
        stmt: 'Ostrosłup prawidłowy czworokątny ma podstawę kwadratu o boku $a = 6$ i krawędź boczną $l = 5$. Oblicz objętość i pole powierzchni bocznej.',
        // Apothema ściany: m = √(l²-(a/2)²) = √(25-9) = 4
        // V = (1/3)·36·h; h = √(l²-(a√2/2)²) = √(25-18) = √7 — trudne
        // Uproszczone: użyj wysokości h=4 (wybieramy sensownie)
        // apothem m = √(5²-3²) = 4; h = √(m²-(a/2)²) = nie! h = √(l²-(a√2/2)²)
        // Zamiast tego: niech krawędź boczna = √41 ≈ 6.4
        // Zostaniemy przy: a=6, h=4 liczymy l: l = √(h²+(a√2/2)²) = √(16+18)=√34
        // To skomplikowane. Uproszczone zadanie:
        // Ostrosłup o podstawie kwadratu 6×6 i apothemie ściany bocznej m=4:
        // Pole pow. bocznej = (1/2)·obwód·m = (1/2)·24·4 = 48
        // h = √(m²-(a/2)²) = √(16-9) = √7 — nieładne
        // Użyjemy: a=4, m=3 → h=√(9-4)=√5 — nadal nieładne
        // Najprościej: podaj h=4, a=6 → m=√(h²+(a/2)²)=√(16+9)=5
        a:6, h:4,
        // apothem m=5; boczna=48; V=48
        V: 48, S_boczna: 48, m_apothem: 5,
        steps: [
          { step:1, title:'Apothema ściany bocznej', content:'m=\\sqrt{h^2+\\left(\\frac{a}{2}\\right)^2}=\\sqrt{16+9}=\\sqrt{25}=5', explanation:'' },
          { step:2, title:'Pole powierzchni bocznej', content:'S_b=\\frac{1}{2}\\cdot\\text{obwód}\\cdot m=\\frac{1}{2}\\cdot24\\cdot5=60', explanation:'4 trójkąty równoramienne, każdy o podstawie $a$ i apothemie $m$.' },
          { step:3, title:'Objętość', content:'V=\\frac{1}{3}\\cdot36\\cdot4=48', explanation:'' }
        ],
        hints:[
          { level:1, text:'Apothema ściany bocznej: $m=\\sqrt{h^2+(a/2)^2}$.' },
          { level:2, text:'$m=5$.' },
          { level:3, text:'$S_b=60$, $V=48$.' }
        ]
      },
      {
        stmt: 'Piramida ma podstawę prostokąt o wymiarach $4\\times3$ i wysokość $h = 6$. Oblicz objętość.',
        V: 24,
        steps: [
          { step:1, title:'Pole podstawy', content:'P=4\\cdot3=12', explanation:'' },
          { step:2, title:'Objętość', content:'V=\\frac{1}{3}\\cdot12\\cdot6=24', explanation:'' }
        ],
        hints:[
          { level:1, text:'$V=\\frac{1}{3}\\cdot P\\cdot h$.' },
          { level:2, text:'$P=12$.' },
          { level:3, text:'$V=24$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.S_boczna !== undefined
      ? `V=${cfg.V},\\ S_b=60`
      : `V=${cfg.V}`;
    return {
      id: M.makeId('pp11_pyramid'),
      category: 11,
      categoryName: 'Stereometria',
      type: 'pyramid',
      points: 3,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Walec i stożek ===
  function cylinderCone() {
    const configs = [
      {
        stmt: 'Walec ma promień podstawy $r = 3$ i wysokość $h = 8$. Oblicz objętość i pole powierzchni całkowitej. Wyniki wyraź przez $\\pi$.',
        r:3, h:8,
        V: '72\\pi',
        S: '66\\pi',  // 2πr²+2πrh = 2π9+2π24 = 18π+48π=66π
        steps: [
          { step:1, title:'Objętość', content:'V=\\pi r^2 h=\\pi\\cdot9\\cdot8=72\\pi', explanation:'' },
          { step:2, title:'Pole powierzchni', content:'S=2\\pi r^2+2\\pi rh=2\\pi\\cdot9+2\\pi\\cdot3\\cdot8=18\\pi+48\\pi=66\\pi', explanation:'' }
        ],
        hints:[
          { level:1, text:'$V=\\pi r^2 h$, $S=2\\pi r^2+2\\pi rh$.' },
          { level:2, text:'$V=72\\pi$.' },
          { level:3, text:'$S=18\\pi+48\\pi=66\\pi$.' }
        ]
      },
      {
        stmt: 'Stożek ma promień podstawy $r = 4$ i wysokość $h = 3$. Oblicz objętość i pole powierzchni bocznej. Wyniki wyraź przez $\\pi$.',
        r:4, h:3,
        // l = √(r²+h²) = √(16+9) = 5
        l: 5,
        V: '16\\pi', // (1/3)π·16·3
        S_b: '20\\pi', // πrl = π·4·5
        steps: [
          { step:1, title:'Tworzącą', content:'l=\\sqrt{r^2+h^2}=\\sqrt{16+9}=5', explanation:'' },
          { step:2, title:'Objętość', content:'V=\\frac{1}{3}\\pi r^2 h=\\frac{1}{3}\\pi\\cdot16\\cdot3=16\\pi', explanation:'' },
          { step:3, title:'Pole boczne', content:'S_b=\\pi r l=\\pi\\cdot4\\cdot5=20\\pi', explanation:'' }
        ],
        hints:[
          { level:1, text:'Tworzącą: $l=\\sqrt{r^2+h^2}$.' },
          { level:2, text:'$l=5$.' },
          { level:3, text:'$V=16\\pi$, $S_b=20\\pi$.' }
        ]
      },
      {
        stmt: 'Walec ma objętość $50\\pi$ i wysokość $h = 2$. Oblicz promień podstawy i pole powierzchni całkowitej.',
        h:2,
        // V=πr²·2=50π → r²=25 → r=5; S=2π25+2π5·2=50π+20π=70π
        r: 5, V: '50\\pi', S: '70\\pi',
        steps: [
          { step:1, title:'Wyznaczenie r', content:'\\pi r^2\\cdot2=50\\pi\\implies r^2=25\\implies r=5', explanation:'' },
          { step:2, title:'Pole powierzchni', content:'S=2\\pi\\cdot25+2\\pi\\cdot5\\cdot2=50\\pi+20\\pi=70\\pi', explanation:'' }
        ],
        hints:[
          { level:1, text:'$V=\\pi r^2 h=50\\pi$.' },
          { level:2, text:'$r^2=25\\implies r=5$.' },
          { level:3, text:'$S=70\\pi$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.S_b ? `V=${cfg.V},\\ S_b=${cfg.S_b},\\ l=${cfg.l}` : `V=${cfg.V},\\ S=${cfg.S}`;
    return {
      id: M.makeId('pp11_cylcone'),
      category: 11,
      categoryName: 'Stereometria',
      type: 'cylinder_cone',
      points: 3,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([prism, pyramid, cylinderCone])();
  }

  return { generate };
})();
