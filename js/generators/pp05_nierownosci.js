// PP Kategoria 5: Nierówności
// Schemat A: nierówność liniowa
// Schemat B: nierówność kwadratowa
// Schemat C: nierówność wymierna prosta
window.pp05 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Nierówność liniowa ===
  function linearIneq() {
    const configs = [
      {
        stmt: 'Rozwiąż nierówność $2x - 3 > x + 5$.',
        ans: 'x > 8', interval: '(8, +\\infty)',
        steps: [
          { step:1, title:'Przeniesienie wyrazów', content:'2x-x>5+3\\implies x>8', explanation:'' }
        ],
        hints:[
          { level:1, text:'Przenoś wyrazy z $x$ na lewą stronę, liczby na prawą.' },
          { level:2, text:'$2x-x>5+3$.' },
          { level:3, text:'$x>8$.' }
        ]
      },
      {
        stmt: 'Rozwiąż nierówność $3(x-1) \\leq 2x + 4$.',
        ans: 'x \\leq 7', interval: '(-\\infty, 7]',
        steps: [
          { step:1, title:'Rozwinięcie nawiasu', content:'3x-3\\leq2x+4', explanation:'' },
          { step:2, title:'Uproszczenie', content:'x\\leq7', explanation:'' }
        ],
        hints:[
          { level:1, text:'Rozwiń nawias: $3(x-1)=3x-3$.' },
          { level:2, text:'$3x-3\\leq2x+4$.' },
          { level:3, text:'$x\\leq7$.' }
        ]
      },
      {
        stmt: 'Rozwiąż nierówność $\\dfrac{x+2}{3} > \\dfrac{x-1}{2}$.',
        ans: 'x < 7', interval: '(-\\infty, 7)',
        steps: [
          { step:1, title:'Mnożenie przez 6', content:'2(x+2)>3(x-1)', explanation:'Mnożymy przez NWW mianowników = 6.' },
          { step:2, title:'Uproszczenie', content:'2x+4>3x-3\\implies 7>x\\implies x<7', explanation:'' }
        ],
        hints:[
          { level:1, text:'Pomnóż obie strony przez NWW mianowników (6).' },
          { level:2, text:'$2(x+2)>3(x-1)$.' },
          { level:3, text:'$2x+4>3x-3\\implies 7>x$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp05_linear'),
      category: 5,
      categoryName: 'Nierówności',
      type: 'linear_ineq',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz rozwiązanie w postaci przedziału.',
      answer: { type: 'expression', display: cfg.interval, description: `$${cfg.interval}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Nierówność kwadratowa ===
  function quadraticIneq() {
    const configs = [
      {
        stmt: 'Rozwiąż nierówność $x^2 - 5x + 4 \\leq 0$.',
        // x²-5x+4=(x-1)(x-4); rozwiązanie: [1,4]
        ans: '[1, 4]', x1:1, x2:4,
        steps: [
          { step:1, title:'Miejsca zerowe', content:'x^2-5x+4=0\\implies (x-1)(x-4)=0\\implies x_1=1,\\ x_2=4', explanation:'' },
          { step:2, title:'Parabola skierowana w górę', content:'a=1>0,\\text{ więc funkcja }\\leq0\\text{ między pierwiastkami.}', explanation:'' },
          { step:3, title:'Rozwiązanie', content:'x\\in[1,4]', explanation:'' }
        ],
        hints:[
          { level:1, text:'Znajdź miejsca zerowe równania $x^2-5x+4=0$.' },
          { level:2, text:'$x_1=1$, $x_2=4$. Parabola zwrócona w górę.' },
          { level:3, text:'$f(x)\\leq0$ między pierwiastkami: $x\\in[1,4]$.' }
        ]
      },
      {
        stmt: 'Rozwiąż nierówność $x^2 - 3x - 10 > 0$.',
        // (x-5)(x+2)>0; x<-2 lub x>5
        ans: 'x\\in(-\\infty,-2)\\cup(5,+\\infty)', x1:-2, x2:5,
        steps: [
          { step:1, title:'Miejsca zerowe', content:'x^2-3x-10=0\\implies (x-5)(x+2)=0\\implies x_1=-2,\\ x_2=5', explanation:'' },
          { step:2, title:'Znak funkcji', content:'a=1>0,\\ f(x)>0\\ \\text{poza pierwiastkami}', explanation:'' },
          { step:3, title:'Rozwiązanie', content:'x\\in(-\\infty,-2)\\cup(5,+\\infty)', explanation:'' }
        ],
        hints:[
          { level:1, text:'Rozwiąż $x^2-3x-10=0$.' },
          { level:2, text:'$x_1=-2$, $x_2=5$.' },
          { level:3, text:'Parabola zwrócona w górę: $f>0$ dla $x<-2$ lub $x>5$.' }
        ]
      },
      {
        stmt: 'Rozwiąż nierówność $2x^2 - 7x + 3 \\leq 0$.',
        // 2x²-7x+3=0; Δ=49-24=25; x=(7±5)/4; x1=1/2, x2=3
        ans: '\\left[\\frac{1}{2},\\ 3\\right]',
        steps: [
          { step:1, title:'Wyróżnik', content:'\\Delta=49-24=25,\\quad \\sqrt{\\Delta}=5', explanation:'' },
          { step:2, title:'Pierwiastki', content:'x_1=\\frac{7-5}{4}=\\frac{1}{2},\\quad x_2=\\frac{7+5}{4}=3', explanation:'' },
          { step:3, title:'Rozwiązanie', content:'x\\in\\left[\\frac{1}{2},3\\right]', explanation:'$a=2>0$: nierówność $\\leq0$ między pierwiastkami.' }
        ],
        hints:[
          { level:1, text:'Oblicz $\\Delta=b^2-4ac=(−7)^2-4\\cdot2\\cdot3=25$.' },
          { level:2, text:'$x_1=\\frac{1}{2}$, $x_2=3$.' },
          { level:3, text:'Parabola w górę: $f\\leq0$ dla $x\\in[\\frac{1}{2},3]$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp05_quad'),
      category: 5,
      categoryName: 'Nierówności',
      type: 'quadratic_ineq',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz rozwiązanie w postaci przedziału.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Nierówność wymierna ===
  function rationalIneq() {
    const configs = [
      {
        stmt: 'Rozwiąż nierówność $\\dfrac{x-1}{x+2} > 0$.',
        ans: 'x\\in(-\\infty,-2)\\cup(1,+\\infty)',
        steps: [
          { step:1, title:'Miejsca zerowe licznika i mianownika', content:'\\text{Licznik}=0\\colon x=1;\\quad \\text{Mianownik}=0\\colon x=-2\\text{ (wykluczone)}', explanation:'' },
          { step:2, title:'Tabela znaków', content:`\\begin{array}{c|ccc}
x & (-\\infty,-2) & (-2,1) & (1,+\\infty) \\\\ \\hline
x-1 & - & - & + \\\\
x+2 & - & + & + \\\\
\\text{ułamek} & + & - & +
\\end{array}`, explanation:'' },
          { step:3, title:'Rozwiązanie', content:'x\\in(-\\infty,-2)\\cup(1,+\\infty)', explanation:'' }
        ],
        hints:[
          { level:1, text:'Szukaj, gdzie ułamek jest dodatni: oba czynniki tego samego znaku.' },
          { level:2, text:'Zera: $x=1$ (licznik), $x=-2$ (mianownik, wykluczony).' },
          { level:3, text:'Tabela znaków: ułamek $>0$ dla $x<-2$ lub $x>1$.' }
        ]
      },
      {
        stmt: 'Rozwiąż nierówność $\\dfrac{2x+1}{x-3} \\leq 0$.',
        ans: 'x\\in\\left[-\\frac{1}{2},\\ 3\\right)',
        steps: [
          { step:1, title:'Zera', content:'2x+1=0\\colon x=-\\frac{1}{2};\\quad x-3=0\\colon x=3\\text{ (wykluczone)}', explanation:'' },
          { step:2, title:'Tabela znaków', content:`\\begin{array}{c|ccc}
x & (-\\infty,-\\frac{1}{2}) & (-\\frac{1}{2},3) & (3,+\\infty) \\\\ \\hline
2x+1 & - & + & + \\\\
x-3 & - & - & + \\\\
\\text{ułamek} & + & - & +
\\end{array}`, explanation:'' },
          { step:3, title:'Rozwiązanie', content:'x\\in\\left[-\\tfrac{1}{2},3\\right)', explanation:'Uwzględniamy $x=-\\frac{1}{2}$ (ułamek=0), wykluczamy $x=3$.' }
        ],
        hints:[
          { level:1, text:'Szukaj, gdzie ułamek $\\leq0$.' },
          { level:2, text:'$x=-\\frac{1}{2}$ — zero; $x=3$ — wykluczone.' },
          { level:3, text:'$x\\in[-\\frac{1}{2},3)$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp05_rational'),
      category: 5,
      categoryName: 'Nierówności',
      type: 'rational_ineq',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz rozwiązanie w postaci przedziału.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([linearIneq, quadraticIneq, rationalIneq])();
  }

  return { generate };
})();
