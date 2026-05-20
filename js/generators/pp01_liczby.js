// PP Kategoria 1: Liczby rzeczywiste
// Schemat A: upraszczanie wyrażeń z pierwiastkami
// Schemat B: potęgi o wykładnikach wymiernych / całkowitych
// Schemat C: porównywanie liczb rzeczywistych / kolejność na osi
window.pp01 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Upraszczanie sum pierwiastków ===
  function rootSimplify() {
    // Generuj a·√n + b·√n = (a+b)√n, ale przez różne rozkłady
    const configs = [
      // √48 - √75 + √27 = 4√3 - 5√3 + 3√3 = 2√3
      { expr: '\\sqrt{48} - \\sqrt{75} + \\sqrt{27}', ans: '2\\sqrt{3}', ansVal: '2√3',
        steps: [
          { step:1, title:'Rozkład pierwiastków', content:'\\sqrt{48}=\\sqrt{16\\cdot3}=4\\sqrt{3},\\quad \\sqrt{75}=\\sqrt{25\\cdot3}=5\\sqrt{3},\\quad \\sqrt{27}=\\sqrt{9\\cdot3}=3\\sqrt{3}', explanation:'Wyłączamy pełne kwadraty spod pierwiastka.' },
          { step:2, title:'Sumowanie', content:'4\\sqrt{3}-5\\sqrt{3}+3\\sqrt{3}=(4-5+3)\\sqrt{3}=\\mathbf{2\\sqrt{3}}', explanation:'Dodajemy wyrazy z tym samym pierwiastkiem.' }
        ],
        hints:[
          { level:1, text:'Rozkłaj każdą liczbę pod pierwiastkiem na iloczyn z największym pełnym kwadratem: $48=16\\cdot3$, $75=25\\cdot3$, $27=9\\cdot3$.' },
          { level:2, text:'$\\sqrt{48}=4\\sqrt{3}$, $\\sqrt{75}=5\\sqrt{3}$, $\\sqrt{27}=3\\sqrt{3}$.' },
          { level:3, text:'$(4-5+3)\\sqrt{3}=2\\sqrt{3}$.' }
        ]
      },
      // √50 + √18 - √8 = 5√2 + 3√2 - 2√2 = 6√2
      { expr: '\\sqrt{50} + \\sqrt{18} - \\sqrt{8}', ans: '6\\sqrt{2}', ansVal: '6√2',
        steps: [
          { step:1, title:'Rozkład', content:'\\sqrt{50}=5\\sqrt{2},\\quad \\sqrt{18}=3\\sqrt{2},\\quad \\sqrt{8}=2\\sqrt{2}', explanation:'$50=25\\cdot2$, $18=9\\cdot2$, $8=4\\cdot2$.' },
          { step:2, title:'Sumowanie', content:'5\\sqrt{2}+3\\sqrt{2}-2\\sqrt{2}=\\mathbf{6\\sqrt{2}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Sprowadź każdy pierwiastek do postaci $k\\sqrt{2}$.' },
          { level:2, text:'$\\sqrt{50}=5\\sqrt{2}$, $\\sqrt{18}=3\\sqrt{2}$, $\\sqrt{8}=2\\sqrt{2}$.' },
          { level:3, text:'$(5+3-2)\\sqrt{2}=6\\sqrt{2}$.' }
        ]
      },
      // √12 + √75 - √27 = 2√3 + 5√3 - 3√3 = 4√3
      { expr: '\\sqrt{12} + \\sqrt{75} - \\sqrt{27}', ans: '4\\sqrt{3}', ansVal: '4√3',
        steps: [
          { step:1, title:'Rozkład', content:'\\sqrt{12}=2\\sqrt{3},\\quad \\sqrt{75}=5\\sqrt{3},\\quad \\sqrt{27}=3\\sqrt{3}', explanation:'' },
          { step:2, title:'Sumowanie', content:'2\\sqrt{3}+5\\sqrt{3}-3\\sqrt{3}=\\mathbf{4\\sqrt{3}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Rozkłaj: $12=4\\cdot3$, $75=25\\cdot3$, $27=9\\cdot3$.' },
          { level:2, text:'$\\sqrt{12}=2\\sqrt{3}$, $\\sqrt{75}=5\\sqrt{3}$, $\\sqrt{27}=3\\sqrt{3}$.' },
          { level:3, text:'$(2+5-3)\\sqrt{3}=4\\sqrt{3}$.' }
        ]
      },
      // √45 - √20 + √80 = 3√5 - 2√5 + 4√5 = 5√5
      { expr: '\\sqrt{45} - \\sqrt{20} + \\sqrt{80}', ans: '5\\sqrt{5}', ansVal: '5√5',
        steps: [
          { step:1, title:'Rozkład', content:'\\sqrt{45}=3\\sqrt{5},\\quad \\sqrt{20}=2\\sqrt{5},\\quad \\sqrt{80}=4\\sqrt{5}', explanation:'$45=9\\cdot5$, $20=4\\cdot5$, $80=16\\cdot5$.' },
          { step:2, title:'Sumowanie', content:'3\\sqrt{5}-2\\sqrt{5}+4\\sqrt{5}=\\mathbf{5\\sqrt{5}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Sprowadź do postaci $k\\sqrt{5}$.' },
          { level:2, text:'$\\sqrt{45}=3\\sqrt{5}$, $\\sqrt{20}=2\\sqrt{5}$, $\\sqrt{80}=4\\sqrt{5}$.' },
          { level:3, text:'$(3-2+4)\\sqrt{5}=5\\sqrt{5}$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp01_rootSimp'),
      category: 1,
      categoryName: 'Liczby rzeczywiste',
      type: 'root_simplify',
      points: 1,
      params: {},
      statement: `Oblicz wartość wyrażenia $${cfg.expr}$. Zapisz obliczenia.`,
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Potęgi i upraszczanie wyrażeń potęgowych ===
  function powerExpr() {
    const configs = [
      // (2^5 · 4^3) / (8^2 · 2) = 2^5 · 2^6 / (2^6 · 2) = 2^11 / 2^7 = 2^4 = 16
      {
        expr: '\\dfrac{2^5 \\cdot 4^3}{8^2 \\cdot 2}',
        ans: '16', ansDisplay: '16',
        steps: [
          { step:1, title:'Sprowadzenie do tej samej podstawy', content:'4^3=(2^2)^3=2^6,\\quad 8^2=(2^3)^2=2^6', explanation:'$4=2^2$, $8=2^3$.' },
          { step:2, title:'Upraszczanie', content:'\\frac{2^5\\cdot2^6}{2^6\\cdot2^1}=\\frac{2^{11}}{2^7}=2^{11-7}=2^4=\\mathbf{16}', explanation:'Dodajemy wykładniki w liczniku, w mianowniku, potem odejmujemy.' }
        ],
        hints:[
          { level:1, text:'Zapisz $4$ i $8$ jako potęgi dwójki: $4=2^2$, $8=2^3$.' },
          { level:2, text:'$4^3=2^6$, $8^2=2^6$. Teraz licznik: $2^{5+6}=2^{11}$, mianownik: $2^{6+1}=2^7$.' },
          { level:3, text:'$\\frac{2^{11}}{2^7}=2^4=16$.' }
        ]
      },
      // 3^4 · 9 / 27^2 = 3^4 · 3^2 / 3^6 = 3^6/3^6 = 1
      {
        expr: '\\dfrac{3^4 \\cdot 9}{27^2}',
        ans: '1', ansDisplay: '1',
        steps: [
          { step:1, title:'Podstawy jako potęgi 3', content:'9=3^2,\\quad 27^2=(3^3)^2=3^6', explanation:'' },
          { step:2, title:'Obliczenie', content:'\\frac{3^4\\cdot3^2}{3^6}=\\frac{3^6}{3^6}=3^0=\\mathbf{1}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Zapisz $9=3^2$ i $27=3^3$.' },
          { level:2, text:'Licznik: $3^{4+2}=3^6$, mianownik: $3^6$.' },
          { level:3, text:'$3^6/3^6=1$.' }
        ]
      },
      // 2^3 · 8^2 / (4^4) = 2^3 · 2^6 / 2^8 = 2^9/2^8 = 2
      {
        expr: '\\dfrac{2^3 \\cdot 8^2}{4^4}',
        ans: '2', ansDisplay: '2',
        steps: [
          { step:1, title:'Sprowadzenie do podstawy 2', content:'8^2=(2^3)^2=2^6,\\quad 4^4=(2^2)^4=2^8', explanation:'' },
          { step:2, title:'Obliczenie', content:'\\frac{2^3\\cdot2^6}{2^8}=\\frac{2^9}{2^8}=2^1=\\mathbf{2}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$8=2^3$, $4=2^2$.' },
          { level:2, text:'Licznik: $2^{3+6}=2^9$, mianownik: $2^8$.' },
          { level:3, text:'$2^9/2^8=2$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp01_powerExpr'),
      category: 1,
      categoryName: 'Liczby rzeczywiste',
      type: 'power_expr',
      points: 1,
      params: {},
      statement: `Oblicz wartość wyrażenia $${cfg.expr}$. Zapisz obliczenia.`,
      answer: { type: 'number', value: Number(cfg.ans), display: cfg.ansDisplay, description: `Wynik: $${cfg.ansDisplay}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Porównywanie liczb rzeczywistych ===
  function compareReals() {
    const configs = [
      {
        question: 'Uszereguj liczby $\\sqrt{2}$, $\\sqrt[3]{3}$, $1{,}5$ od najmniejszej do największej.',
        ans: '\\sqrt{2} < \\sqrt[3]{3} < 1{,}5',
        hint1: 'Oblicz przybliżone wartości dziesiętne każdej liczby.',
        hint2: '$\\sqrt{2}\\approx1{,}414$, $\\sqrt[3]{3}\\approx1{,}442$, $1{,}5=1{,}5$.',
        hint3: '$1{,}414<1{,}442<1{,}5$, więc $\\sqrt{2}<\\sqrt[3]{3}<1{,}5$.',
        solution: [
          { step:1, title:'Przybliżenia', content:'\\sqrt{2}\\approx1{,}414,\\quad \\sqrt[3]{3}\\approx1{,}442,\\quad 1{,}5', explanation:'' },
          { step:2, title:'Porównanie', content:'1{,}414 < 1{,}442 < 1{,}5', explanation:'' },
          { step:3, title:'Odpowiedź', content:'\\sqrt{2} < \\sqrt[3]{3} < 1{,}5', explanation:'' }
        ]
      },
      {
        question: 'Spośród liczb $\\sqrt{5}$, $2{,}2$, $\\sqrt[3]{10}$ wskaż największą.',
        ans: '\\sqrt[3]{10}',
        hint1: 'Oblicz przybliżone wartości.',
        hint2: '$\\sqrt{5}\\approx2{,}236$, $2{,}2$, $\\sqrt[3]{10}\\approx2{,}154$.',
        hint3: '$2{,}236>2{,}2>2{,}154$, więc największa jest $\\sqrt{5}$.',
        solution: [
          { step:1, title:'Przybliżenia', content:'\\sqrt{5}\\approx2{,}236,\\quad 2{,}2,\\quad \\sqrt[3]{10}\\approx2{,}154', explanation:'' },
          { step:2, title:'Odpowiedź', content:'\\text{Największa: }\\sqrt{5}\\approx2{,}236', explanation:'' }
        ]
      },
      {
        question: 'Oceń, która liczba jest większa: $3\\sqrt{2}$ czy $2\\sqrt{3}$? Uzasadnij.',
        ans: '3\\sqrt{2} > 2\\sqrt{3}',
        hint1: 'Porównaj kwadraty obu liczb (obie są dodatnie, więc porównanie kwadratów zachowuje nierówność).',
        hint2: '$(3\\sqrt{2})^2 = 18$, $(2\\sqrt{3})^2 = 12$.',
        hint3: '$18 > 12$, więc $3\\sqrt{2} > 2\\sqrt{3}$.',
        solution: [
          { step:1, title:'Kwadraty liczb', content:'(3\\sqrt{2})^2=9\\cdot2=18,\\quad (2\\sqrt{3})^2=4\\cdot3=12', explanation:'Obie liczby są dodatnie, więc porównanie kwadratów jest równoważne.' },
          { step:2, title:'Porównanie', content:'18>12\\implies 3\\sqrt{2}>2\\sqrt{3}', explanation:'' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp01_compareReals'),
      category: 1,
      categoryName: 'Liczby rzeczywiste',
      type: 'compare_reals',
      points: 1,
      params: {},
      statement: cfg.question,
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: [
        { level:1, text: cfg.hint1 },
        { level:2, text: cfg.hint2 },
        { level:3, text: cfg.hint3 }
      ],
      solution: cfg.solution
    };
  }

  function generate() {
    return M.choose([rootSimplify, powerExpr, compareReals])();
  }

  return { generate };
})();
