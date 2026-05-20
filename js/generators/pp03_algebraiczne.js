// PP Kategoria 3: Wyrażenia algebraiczne
// Schemat A: skracanie ułamków algebraicznych
// Schemat B: wzory skróconego mnożenia, wyznaczanie wartości wyrażeń
// Schemat C: rozkład na czynniki
window.pp03 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Skracanie ułamków algebraicznych ===
  function algebraicFrac() {
    const configs = [
      {
        expr: '\\dfrac{x^2 - 9}{x^2 - 6x + 9}',
        ans: '\\dfrac{x+3}{x-3}',
        condition: 'x \\neq 3',
        steps: [
          { step:1, title:'Rozkład licznika', content:'x^2-9=(x-3)(x+3)', explanation:'Różnica kwadratów: $a^2-b^2=(a-b)(a+b)$.' },
          { step:2, title:'Rozkład mianownika', content:'x^2-6x+9=(x-3)^2', explanation:'Trójmian kwadratowy: $(x-3)^2$.' },
          { step:3, title:'Skrócenie', content:'\\frac{(x-3)(x+3)}{(x-3)^2}=\\frac{x+3}{x-3},\\quad x\\neq3', explanation:'' }
        ],
        hints:[
          { level:1, text:'Rozkłaj licznik: $x^2-9=(x-3)(x+3)$.' },
          { level:2, text:'Rozkłaj mianownik: $x^2-6x+9=(x-3)^2$.' },
          { level:3, text:'Skróć $(x-3)$: wynik $\\frac{x+3}{x-3}$, dla $x\\neq3$.' }
        ]
      },
      {
        expr: '\\dfrac{x^2 - 4}{x^2 + 4x + 4}',
        ans: '\\dfrac{x-2}{x+2}',
        condition: 'x \\neq -2',
        steps: [
          { step:1, title:'Licznik', content:'x^2-4=(x-2)(x+2)', explanation:'' },
          { step:2, title:'Mianownik', content:'x^2+4x+4=(x+2)^2', explanation:'' },
          { step:3, title:'Skrócenie', content:'\\frac{(x-2)(x+2)}{(x+2)^2}=\\frac{x-2}{x+2},\\quad x\\neq-2', explanation:'' }
        ],
        hints:[
          { level:1, text:'Licznik: $x^2-4=(x-2)(x+2)$.' },
          { level:2, text:'Mianownik: $x^2+4x+4=(x+2)^2$.' },
          { level:3, text:'Skróć $(x+2)$: wynik $\\frac{x-2}{x+2}$.' }
        ]
      },
      {
        expr: '\\dfrac{2x^2 + 6x}{x^2 - 9}',
        ans: '\\dfrac{2x}{x-3}',
        condition: 'x \\neq \\pm3',
        steps: [
          { step:1, title:'Licznik', content:'2x^2+6x=2x(x+3)', explanation:'Wyłączamy wspólny czynnik $2x$.' },
          { step:2, title:'Mianownik', content:'x^2-9=(x-3)(x+3)', explanation:'' },
          { step:3, title:'Skrócenie', content:'\\frac{2x(x+3)}{(x-3)(x+3)}=\\frac{2x}{x-3},\\quad x\\neq\\pm3', explanation:'' }
        ],
        hints:[
          { level:1, text:'Licznik: wyłącz $2x$.' },
          { level:2, text:'Mianownik: różnica kwadratów.' },
          { level:3, text:'Skróć $(x+3)$: wynik $\\frac{2x}{x-3}$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp03_fracSimp'),
      category: 3,
      categoryName: 'Wyrażenia algebraiczne',
      type: 'algebraic_frac',
      points: 2,
      params: {},
      statement: `Uprość wyrażenie $${cfg.expr}$, podając dziedzinę.`,
      answer: { type: 'expression', display: cfg.ans + ',\\quad ' + cfg.condition, description: `$${cfg.ans}$, dla $${cfg.condition}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Wyznaczanie wartości wyrażeń ze wzorów skróconego mnożenia ===
  function algebraicValue() {
    const configs = [
      {
        stmt: 'Wiedząc, że $a + b = 5$ i $ab = 3$, oblicz wartość wyrażenia $a^2 + b^2$.',
        ans: 19, display: '19',
        steps: [
          { step:1, title:'Wzór', content:'a^2+b^2=(a+b)^2-2ab', explanation:'Ze wzoru $(a+b)^2=a^2+2ab+b^2$.' },
          { step:2, title:'Podstawienie', content:'a^2+b^2=5^2-2\\cdot3=25-6=\\mathbf{19}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Skorzystaj z tożsamości $a^2+b^2=(a+b)^2-2ab$.' },
          { level:2, text:'$(a+b)^2=25$, $2ab=6$.' },
          { level:3, text:'$a^2+b^2=25-6=19$.' }
        ]
      },
      {
        stmt: 'Wiedząc, że $a - b = 4$ i $ab = 5$, oblicz wartość wyrażenia $a^2 + b^2$.',
        ans: 26, display: '26',
        steps: [
          { step:1, title:'Wzór', content:'a^2+b^2=(a-b)^2+2ab', explanation:'Ze wzoru $(a-b)^2=a^2-2ab+b^2$.' },
          { step:2, title:'Podstawienie', content:'a^2+b^2=16+10=\\mathbf{26}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a^2+b^2=(a-b)^2+2ab$.' },
          { level:2, text:'$(a-b)^2=16$, $2ab=10$.' },
          { level:3, text:'$a^2+b^2=26$.' }
        ]
      },
      {
        stmt: 'Wiedząc, że $x + \\frac{1}{x} = 3$, oblicz wartość wyrażenia $x^2 + \\frac{1}{x^2}$.',
        ans: 7, display: '7',
        steps: [
          { step:1, title:'Podniesienie do kwadratu', content:'\\left(x+\\frac{1}{x}\\right)^2 = x^2+2+\\frac{1}{x^2}=9', explanation:'Podnosimy lewą stronę do kwadratu: $3^2=9$.' },
          { step:2, title:'Wyznaczenie', content:'x^2+\\frac{1}{x^2}=9-2=\\mathbf{7}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Podnieś $x+\\frac{1}{x}=3$ do kwadratu.' },
          { level:2, text:'$\\left(x+\\frac{1}{x}\\right)^2=x^2+2+\\frac{1}{x^2}=9$.' },
          { level:3, text:'$x^2+\\frac{1}{x^2}=7$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp03_algebraVal'),
      category: 3,
      categoryName: 'Wyrażenia algebraiczne',
      type: 'algebraic_value',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'number', value: cfg.ans, display: cfg.display, description: `Wynik: $${cfg.display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Rozkład na czynniki ===
  function factorize() {
    const configs = [
      {
        expr: 'x^3 - x^2 - x + 1',
        ans: '(x-1)^2(x+1)',
        steps: [
          { step:1, title:'Grupowanie', content:'x^2(x-1)-(x-1)=(x-1)(x^2-1)', explanation:'Wyłączamy $(x-1)$ przed nawias.' },
          { step:2, title:'Rozkład', content:'(x-1)(x^2-1)=(x-1)(x-1)(x+1)=(x-1)^2(x+1)', explanation:'$x^2-1=(x-1)(x+1)$.' }
        ],
        hints:[
          { level:1, text:'Pogrupuj: $(x^3-x^2)+(-x+1)$.' },
          { level:2, text:'$x^2(x-1)-(x-1)=(x-1)(x^2-1)$.' },
          { level:3, text:'$x^2-1=(x-1)(x+1)$, wynik: $(x-1)^2(x+1)$.' }
        ]
      },
      {
        expr: '4x^2 - 12x + 9',
        ans: '(2x-3)^2',
        steps: [
          { step:1, title:'Rozpoznanie wzoru', content:'4x^2-12x+9=(2x)^2-2\\cdot(2x)\\cdot3+3^2', explanation:'Wzór $(a-b)^2=a^2-2ab+b^2$, gdzie $a=2x$, $b=3$.' },
          { step:2, title:'Wynik', content:'(2x-3)^2', explanation:'' }
        ],
        hints:[
          { level:1, text:'Czy wyraz środkowy to $-2\\cdot2x\\cdot3$?' },
          { level:2, text:'$-12x=-2\\cdot2x\\cdot3$ ✓. Wzór: $(a-b)^2$.' },
          { level:3, text:'$(2x-3)^2$.' }
        ]
      },
      {
        expr: 'x^4 - 16',
        ans: '(x^2-4)(x^2+4)=(x-2)(x+2)(x^2+4)',
        steps: [
          { step:1, title:'Różnica kwadratów', content:'x^4-16=(x^2)^2-4^2=(x^2-4)(x^2+4)', explanation:'$a^2-b^2=(a-b)(a+b)$ dla $a=x^2$, $b=4$.' },
          { step:2, title:'Dalszy rozkład', content:'x^2-4=(x-2)(x+2),\\quad x^2+4\\text{ — nierozkładalne}', explanation:'' },
          { step:3, title:'Wynik', content:'(x-2)(x+2)(x^2+4)', explanation:'' }
        ],
        hints:[
          { level:1, text:'$x^4-16=(x^2)^2-4^2$ — różnica kwadratów.' },
          { level:2, text:'$(x^2-4)(x^2+4)$.' },
          { level:3, text:'$x^2-4=(x-2)(x+2)$; $x^2+4$ nie rozkłada się nad $\\mathbb{R}$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp03_factor'),
      category: 3,
      categoryName: 'Wyrażenia algebraiczne',
      type: 'factorize',
      points: 2,
      params: {},
      statement: `Rozłóż na czynniki wyrażenie $${cfg.expr}$.`,
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([algebraicFrac, algebraicValue, factorize])();
  }

  return { generate };
})();
