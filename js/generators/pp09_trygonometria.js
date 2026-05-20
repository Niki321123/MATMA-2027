// PP Kategoria 9: Trygonometria
// Schemat A: sin/cos/tg z trójkąta prostokątnego
// Schemat B: wartości dla kątów 30°/45°/60°, tożsamości
// Schemat C: obliczenia mieszane, redukcja
window.pp09 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Trójkąt prostokątny ===
  function rightTriangle() {
    const configs = [
      {
        // sin α = 3/5, cos α = 4/5, tg α = 3/4
        stmt: 'W trójkącie prostokątnym $\\sin\\alpha = \\dfrac{3}{5}$. Oblicz $\\cos\\alpha$ i $\\tan\\alpha$.',
        sinA: '\\frac{3}{5}', cosA: '\\frac{4}{5}', tanA: '\\frac{3}{4}',
        steps: [
          { step:1, title:'Tożsamość Pitagorasa', content:'\\sin^2\\alpha+\\cos^2\\alpha=1\\implies\\cos^2\\alpha=1-\\frac{9}{25}=\\frac{16}{25}\\implies\\cos\\alpha=\\frac{4}{5}', explanation:'W trójkącie prostokątnym $\\cos\\alpha>0$.' },
          { step:2, title:'Tangens', content:'\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}=\\frac{3/5}{4/5}=\\frac{3}{4}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Skorzystaj z $\\sin^2\\alpha+\\cos^2\\alpha=1$.' },
          { level:2, text:'$\\cos^2\\alpha=1-\\frac{9}{25}=\\frac{16}{25}$.' },
          { level:3, text:'$\\cos\\alpha=\\frac{4}{5}$, $\\tan\\alpha=\\frac{3}{4}$.' }
        ]
      },
      {
        // sin α = 5/13, cos α = 12/13, tg α = 5/12
        stmt: 'W trójkącie prostokątnym przeciwprostokątna ma długość $13$, a jedna z przyprostokątnych $5$. Oblicz $\\sin\\alpha$, $\\cos\\alpha$ i $\\tan\\alpha$ dla kąta przy tej przyprostokątnej.',
        sinA: '\\frac{5}{13}', cosA: '\\frac{12}{13}', tanA: '\\frac{5}{12}',
        steps: [
          { step:1, title:'Druga przyprostokątna', content:'b=\\sqrt{13^2-5^2}=\\sqrt{169-25}=\\sqrt{144}=12', explanation:'Twierdzenie Pitagorasa.' },
          { step:2, title:'Wartości', content:'\\sin\\alpha=\\frac{5}{13},\\quad\\cos\\alpha=\\frac{12}{13},\\quad\\tan\\alpha=\\frac{5}{12}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz drugą przyprostokątną z tw. Pitagorasa.' },
          { level:2, text:'$b=12$.' },
          { level:3, text:'$\\sin\\alpha=\\frac{5}{13}$, $\\cos\\alpha=\\frac{12}{13}$, $\\tan\\alpha=\\frac{5}{12}$.' }
        ]
      },
      {
        // kąt 30°, sin=1/2, cos=√3/2, tg=√3/3
        stmt: 'W trójkącie prostokątnym jeden z ostrych kątów wynosi $30°$. Podaj wartości $\\sin30°$, $\\cos30°$ i $\\tan30°$.',
        sinA: '\\frac{1}{2}', cosA: '\\frac{\\sqrt{3}}{2}', tanA: '\\frac{\\sqrt{3}}{3}',
        steps: [
          { step:1, title:'Wartości tablicowe', content:'\\sin30°=\\frac{1}{2},\\quad\\cos30°=\\frac{\\sqrt{3}}{2},\\quad\\tan30°=\\frac{1}{\\sqrt{3}}=\\frac{\\sqrt{3}}{3}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Przypomnij sobie tablice trygonometryczne dla kątów 30°, 45°, 60°.' },
          { level:2, text:'$\\sin30°=\\frac{1}{2}$.' },
          { level:3, text:'$\\cos30°=\\frac{\\sqrt{3}}{2}$, $\\tan30°=\\frac{\\sqrt{3}}{3}$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const ans = `\\sin\\alpha=${cfg.sinA},\\quad\\cos\\alpha=${cfg.cosA},\\quad\\tan\\alpha=${cfg.tanA}`;
    return {
      id: M.makeId('pp09_right'),
      category: 9,
      categoryName: 'Trygonometria',
      type: 'right_triangle',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: ans, description: `$${ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Wartości dla standardowych kątów i tożsamości ===
  function standardAngles() {
    const configs = [
      {
        stmt: 'Oblicz wartość wyrażenia $\\sin^2 40° + \\cos^2 40°$.',
        ans: '1',
        steps: [
          { step:1, title:'Tożsamość podstawowa', content:'\\sin^2\\alpha+\\cos^2\\alpha=1\\text{ dla każdego }\\alpha', explanation:'Podstawowa tożsamość trygonometryczna.' },
          { step:2, title:'Wynik', content:'\\sin^2 40°+\\cos^2 40°=\\mathbf{1}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Skorzystaj z tożsamości $\\sin^2\\alpha+\\cos^2\\alpha=1$.' },
          { level:2, text:'Ta tożsamość zachodzi dla każdego kąta $\\alpha$.' },
          { level:3, text:'Wynik: 1.' }
        ]
      },
      {
        stmt: 'Oblicz wartość wyrażenia $\\dfrac{\\sin30°\\cdot\\cos60°}{\\tan45°}$.',
        // sin30=1/2, cos60=1/2, tg45=1 → (1/2·1/2)/1 = 1/4
        ans: '\\dfrac{1}{4}',
        steps: [
          { step:1, title:'Wartości', content:'\\sin30°=\\frac{1}{2},\\quad\\cos60°=\\frac{1}{2},\\quad\\tan45°=1', explanation:'' },
          { step:2, title:'Obliczenie', content:'\\frac{\\frac{1}{2}\\cdot\\frac{1}{2}}{1}=\\frac{1}{4}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Przypomnij wartości: $\\sin30°$, $\\cos60°$, $\\tan45°$.' },
          { level:2, text:'$\\sin30°=\\frac{1}{2}$, $\\cos60°=\\frac{1}{2}$, $\\tan45°=1$.' },
          { level:3, text:'$\\frac{1/4}{1}=\\frac{1}{4}$.' }
        ]
      },
      {
        stmt: 'Oblicz wartość wyrażenia $\\sin60°\\cdot\\cos30° - \\cos60°\\cdot\\sin30°$.',
        // = sin(60°-30°) = sin30° = 1/2
        ans: '\\dfrac{1}{2}',
        steps: [
          { step:1, title:'Wzór na sinus różnicy kątów', content:'\\sin(\\alpha-\\beta)=\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta', explanation:'' },
          { step:2, title:'Zastosowanie', content:'\\sin60°\\cos30°-\\cos60°\\sin30°=\\sin(60°-30°)=\\sin30°=\\frac{1}{2}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Rozpoznaj wzór $\\sin(\\alpha-\\beta)$.' },
          { level:2, text:'$\\sin(60°-30°)=\\sin30°$.' },
          { level:3, text:'$\\sin30°=\\frac{1}{2}$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp09_standard'),
      category: 9,
      categoryName: 'Trygonometria',
      type: 'standard_angles',
      points: 2,
      params: {},
      statement: cfg.stmt,
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Trójkąt — obliczenia z sinusem kąta ===
  function triangleCalc() {
    const configs = [
      {
        stmt: 'W trójkącie $ABC$ kąt $A = 90°$, $BC = 10$, $AC = 6$. Oblicz $\\sin B$, $\\cos B$ i $AB$.',
        // AB = √(100-36) = √64 = 8
        // sinB = AC/BC = 6/10 = 3/5, cosB = AB/BC = 8/10 = 4/5
        steps: [
          { step:1, title:'Wyznaczenie AB', content:'AB=\\sqrt{BC^2-AC^2}=\\sqrt{100-36}=\\sqrt{64}=8', explanation:'Twierdzenie Pitagorasa.' },
          { step:2, title:'Wartości trig.', content:'\\sin B=\\frac{AC}{BC}=\\frac{6}{10}=\\frac{3}{5},\\quad\\cos B=\\frac{AB}{BC}=\\frac{8}{10}=\\frac{4}{5}', explanation:'' }
        ],
        ans: 'AB=8,\\ \\sin B=\\frac{3}{5},\\ \\cos B=\\frac{4}{5}',
        hints:[
          { level:1, text:'Oblicz $AB$ z twierdzenia Pitagorasa.' },
          { level:2, text:'$AB=8$.' },
          { level:3, text:'$\\sin B=\\frac{6}{10}=\\frac{3}{5}$, $\\cos B=\\frac{8}{10}=\\frac{4}{5}$.' }
        ]
      },
      {
        stmt: 'W trójkącie prostokątnym kąt $\\beta = 45°$ i przyprostokątna $a = 5$. Oblicz pozostałe boki.',
        // kąt 45°: tg45=1 → a=b → b=5; c = a√2 = 5√2
        steps: [
          { step:1, title:'Trójkąt równoramienny', content:'\\tan45°=1\\implies a=b=5', explanation:'' },
          { step:2, title:'Przeciwprostokątna', content:'c=\\sqrt{a^2+b^2}=\\sqrt{25+25}=5\\sqrt{2}', explanation:'' }
        ],
        ans: 'b=5,\\ c=5\\sqrt{2}',
        hints:[
          { level:1, text:'Kąt 45° → trójkąt równoramienny.' },
          { level:2, text:'$b=a=5$.' },
          { level:3, text:'$c=5\\sqrt{2}$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp09_triCalc'),
      category: 9,
      categoryName: 'Trygonometria',
      type: 'triangle_calc',
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
        stmt: 'Wartość wyrażenia $\\sin 30° + \\cos 60°$ wynosi:',
        options: { A: '$1$', B: '$\\sqrt{3}$', C: '$\\frac{\\sqrt{3}}{2}$', D: '$\\frac{1}{2}$' },
        correct: 'A',
        hints: [{ level:1, text:'$\\sin 30°=\\frac{1}{2}$, $\\cos 60°=\\frac{1}{2}$.' }],
        solution: [{ step:1, title:'Obliczenie', content:'\\frac{1}{2}+\\frac{1}{2}=1', explanation:'' }]
      },
      {
        stmt: 'W trójkącie prostokątnym $\\sin\\alpha = \\dfrac{3}{5}$. Wartość $\\cos\\alpha$ wynosi:',
        options: { A: '$\\dfrac{4}{5}$', B: '$\\dfrac{3}{4}$', C: '$\\dfrac{4}{3}$', D: '$\\dfrac{5}{4}$' },
        correct: 'A',
        hints: [{ level:1, text:'$\\sin^2\\alpha+\\cos^2\\alpha=1$.' }],
        solution: [{ step:1, title:'Obliczenie', content:'\\cos^2\\alpha=1-\\frac{9}{25}=\\frac{16}{25}\\implies\\cos\\alpha=\\frac{4}{5}', explanation:'' }]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp09_closed'),
      categoryId: 'pp09',
      categoryName: 'Trygonometria (PP)',
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
    return M.choose([rightTriangle, standardAngles, triangleCalc])();
  }

  return { generate, generateClosed };
})();
