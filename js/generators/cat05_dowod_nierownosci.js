// Kategoria 5: Dowód nierówności algebraicznej
// Wzorzec matura 2025 z.2: Wykaż (a+2b)³ > 8a²b + 16ab² dla a,b>0, b≠a/2
// Wzorzec matura 2026 z.3: Wykaż 1/x + 1/y ≤ x/y² + y/x²
// Wzorzec matura 2022 z.6: Wykaż 7x³+4x²y ≥ y³+2xy²−x³ gdy 2x>y
// Wzorzec matura 2019 z.8: Wykaż (x+a)/(y+a) + y/x > 2
window.cat05 = (() => {
  const M = window.MathUtils;

  // Bank gotowych zadań dowodowych — dokładnie jak w maturze
  const PROOFS = [
    {
      difficulty: 'easy',
      statement: 'Wykaż, że dla każdych liczb rzeczywistych $a$ i $b$ prawdziwa jest nierówność\n$$a^2 + b^2 \\geq 2ab$$',
      method: 'Nierówność równoważna $(a - b)^2 \\geq 0$',
      solution: [
        { step: 1, title: 'Przekształcenie', content: 'a^2 + b^2 - 2ab \\geq 0', explanation: 'Przenosimy 2ab na lewą stronę.' },
        { step: 2, title: 'Rozpoznanie kwadratu', content: 'a^2 - 2ab + b^2 = (a - b)^2 \\geq 0', explanation: 'Kwadrat liczby rzeczywistej jest zawsze nieujemny.' },
        { step: 3, title: 'Wniosek', content: '(a-b)^2 \\geq 0 \\implies a^2+b^2-2ab \\geq 0 \\implies a^2+b^2 \\geq 2ab\\quad\\blacksquare', explanation: 'Nierówność udowodniona.' }
      ],
      hints: [
        { level: 1, text: 'Przenieś $2ab$ na lewą stronę i spróbuj rozpoznać kwadrat.' },
        { level: 2, text: '$a^2 - 2ab + b^2 = ?$' },
        { level: 3, text: '$(a-b)^2 \\geq 0$ dla każdych liczb rzeczywistych.' }
      ]
    },
    {
      difficulty: 'easy',
      statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $x$ i $y$ prawdziwa jest nierówność\n$$\\frac{x}{y} + \\frac{y}{x} \\geq 2$$',
      method: 'Nierówność równoważna $(x-y)^2 \\geq 0$',
      solution: [
        { step: 1, title: 'Sprowadzenie do wspólnego mianownika', content: '\\frac{x}{y} + \\frac{y}{x} - 2 = \\frac{x^2 + y^2 - 2xy}{xy}', explanation: 'Mianownik $xy > 0$.' },
        { step: 2, title: 'Rozpoznanie', content: '\\frac{x^2 - 2xy + y^2}{xy} = \\frac{(x-y)^2}{xy}', explanation: '' },
        { step: 3, title: 'Wniosek', content: '\\frac{(x-y)^2}{xy} \\geq 0$, bo $(x-y)^2 \\geq 0$ i $xy > 0$, więc $\\frac{x}{y}+\\frac{y}{x} \\geq 2\\quad\\blacksquare', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Sprowadź lewą stronę do jednego ułamka.' },
        { level: 2, text: '$\\frac{x}{y}+\\frac{y}{x}-2 = \\frac{x^2+y^2-2xy}{xy}$.' },
        { level: 3, text: 'Licznik to $(x-y)^2 \\geq 0$, mianownik $xy > 0$.' }
      ]
    },
    {
      difficulty: 'medium',
      statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $x$ i $y$ prawdziwa jest nierówność\n$$\\frac{1}{x} + \\frac{1}{y} \\leq \\frac{x}{y^2} + \\frac{y}{x^2}$$',
      method: 'AM-GM lub $(x-y)^2(x+y)\\geq 0$',
      solution: [
        { step: 1, title: 'Przeniesienie na jedną stronę', content: '\\frac{x}{y^2} + \\frac{y}{x^2} - \\frac{1}{x} - \\frac{1}{y} \\geq 0', explanation: '' },
        { step: 2, title: 'Wspólny mianownik $x^2y^2$', content: '\\frac{x^3 + y^3 - x^2y - xy^2}{x^2y^2}', explanation: 'Mianownik $x^2y^2 > 0$.' },
        { step: 3, title: 'Rozkład licznika', content: 'x^3+y^3-x^2y-xy^2 = x^2(x-y) - y^2(x-y) = (x^2-y^2)(x-y) = (x+y)(x-y)^2', explanation: '' },
        { step: 4, title: 'Wniosek', content: '\\frac{(x+y)(x-y)^2}{x^2y^2} \\geq 0$, bo wszystkie czynniki $\\geq 0$. $\\blacksquare', explanation: '$x+y>0$, $(x-y)^2\\geq 0$, $x^2y^2>0$.' }
      ],
      hints: [
        { level: 1, text: 'Przenieś wszystko na jedną stronę i sprowadź do wspólnego mianownika $x^2y^2$.' },
        { level: 2, text: 'Licznik to $x^3 + y^3 - x^2y - xy^2$. Spróbuj wyłączyć czynnik $(x-y)$.' },
        { level: 3, text: 'Rozłóż: $x^3+y^3-x^2y-xy^2 = (x+y)(x-y)^2 \\geq 0$.' }
      ]
    },
    {
      difficulty: 'medium',
      statement: 'Wykaż, że dla każdej liczby rzeczywistej $x > 0$ i dla każdej liczby rzeczywistej $y > 0$ spełniona jest nierówność\n$$\\frac{x + y}{2} \\geq \\sqrt{xy}$$',
      method: 'Nierówność AM-GM: kwadrat różnicy',
      solution: [
        { step: 1, title: 'Przekształcenie', content: '\\frac{x+y}{2} - \\sqrt{xy} \\geq 0 \\iff x+y - 2\\sqrt{xy} \\geq 0', explanation: '' },
        { step: 2, title: 'Kwadrat różnicy', content: 'x - 2\\sqrt{xy} + y = (\\sqrt{x} - \\sqrt{y})^2 \\geq 0', explanation: 'Kwadrat jest nieujemny.' },
        { step: 3, title: 'Wniosek', content: '(\\sqrt{x}-\\sqrt{y})^2 \\geq 0 \\implies \\frac{x+y}{2} \\geq \\sqrt{xy}\\quad\\blacksquare', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Pomnóż obie strony przez 2 i przenieś $2\\sqrt{xy}$ na lewą.' },
        { level: 2, text: '$x - 2\\sqrt{xy} + y = ?$' },
        { level: 3, text: '$(\\sqrt{x} - \\sqrt{y})^2 \\geq 0$.' }
      ]
    },
    {
      difficulty: 'medium',
      statement: 'Wykaż, że dla każdej liczby rzeczywistej $a > 0$ i dla każdej liczby rzeczywistej $b > 0$ spełniona jest nierówność\n$$(a + 2b)^3 \\geq 8ab(a + 2b)$$',
      method: 'AM-GM lub wyłączenie czynnika',
      solution: [
        { step: 1, title: 'Przekształcenie', content: '(a+2b)^3 - 8ab(a+2b) = (a+2b)\\bigl[(a+2b)^2 - 8ab\\bigr]', explanation: 'Wyłączamy $(a+2b)$.' },
        { step: 2, title: 'Uproszczenie nawiasu', content: '(a+2b)^2 - 8ab = a^2+4ab+4b^2-8ab = a^2-4ab+4b^2 = (a-2b)^2', explanation: '' },
        { step: 3, title: 'Wniosek', content: '(a+2b)(a-2b)^2 \\geq 0$, bo $a+2b > 0$ (bo $a,b>0$) i $(a-2b)^2 \\geq 0$. $\\blacksquare', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Wyłącz $(a+2b)$ z różnicy $(a+2b)^3 - 8ab(a+2b)$.' },
        { level: 2, text: 'Zostaje $[(a+2b)^2 - 8ab]$. Rozwiń $(a+2b)^2$.' },
        { level: 3, text: '$(a+2b)^2 - 8ab = (a-2b)^2 \\geq 0$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Wykaż, że dla każdych liczb rzeczywistych $x > 0$, $y > 0$ takich, że $x < y$, i dla każdej dodatniej liczby rzeczywistej $a$ prawdziwa jest nierówność\n$$\\frac{x + a}{y + a} + \\frac{y}{x} > 2$$',
      method: 'Suma dwóch ułamków > 2 — przekształcenie do postaci sumy kwadratów',
      solution: [
        { step: 1, title: 'Przeniesienie', content: 'D = \\frac{x+a}{y+a} + \\frac{y}{x} - 2 = \\frac{x(x+a) + y(y+a) - 2x(y+a)}{x(y+a)}', explanation: 'Sprowadzamy do wspólnego mianownika.' },
        { step: 2, title: 'Licznik', content: 'x^2+ax + y^2+ay - 2xy - 2ax = x^2-2xy+y^2 + a(y-x) = (x-y)^2 + a(y-x)', explanation: '' },
        { step: 3, title: 'Przekształcenie', content: '= (y-x)^2 + a(y-x) = (y-x)[(y-x)+a] = (y-x)(y-x+a)', explanation: '' },
        { step: 4, title: 'Wniosek', content: 'y > x \\implies y-x > 0$ oraz $y-x+a > 0$ (bo $a>0$). Mianownik $x(y+a)>0$. Więc $D > 0$. $\\blacksquare', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Sprowadź sumę do jednego ułamka z mianownikiem $x(y+a)$.' },
        { level: 2, text: 'Licznik: $x(x+a) + y(y+a) - 2x(y+a)$. Grupuj jako $(x-y)^2 + a(y-x)$.' },
        { level: 3, text: 'Wyłącz $(y-x)$: $(y-x)(y-x+a)$. Oba czynniki $>0$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Wykaż, że dla każdej dodatniej liczby rzeczywistej $a$ i dla każdej dodatniej liczby rzeczywistej $b$ takiej, że $b \\neq \\frac{1}{2}a$, prawdziwa jest nierówność\n$$(a + 2b)^3 > 8a^2b + 16ab^2$$',
      method: 'Wyłączenie czynnika i AM-GM',
      solution: [
        { step: 1, title: 'Przekształcenie prawej strony', content: '8a^2b + 16ab^2 = 8ab(a+2b)', explanation: 'Wyłączamy 8ab.' },
        { step: 2, title: 'Różnica', content: '(a+2b)^3 - 8ab(a+2b) = (a+2b)\\bigl[(a+2b)^2 - 8ab\\bigr]', explanation: '' },
        { step: 3, title: 'Uproszczenie', content: '(a+2b)^2 - 8ab = a^2 - 4ab + 4b^2 = (a-2b)^2', explanation: '' },
        { step: 4, title: 'Wniosek', content: '(a+2b)(a-2b)^2 > 0$: czynnik $(a+2b)>0$ bo $a,b>0$; $(a-2b)^2 > 0$ bo $b \\neq \\frac{a}{2}$. $\\blacksquare', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Prawa strona $= 8ab(a+2b)$. Przenieś na lewą i wyłącz $(a+2b)$.' },
        { level: 2, text: 'Zostaje $(a+2b)^2 - 8ab = (a-2b)^2$.' },
        { level: 3, text: '$(a+2b)(a-2b)^2$: pierwszy czynnik $> 0$, drugi $> 0$ bo $b \\neq a/2$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $a$ i $b$ prawdziwa jest nierówność\n$$\\frac{a^2}{b} + \\frac{b^2}{a} \\geq a + b$$',
      method: 'Wspólny mianownik $ab$ + rozkład licznika $(a+b)(a-b)^2$',
      solution: [
        { step: 1, title: 'Przeniesienie na jedną stronę', content: '\\frac{a^2}{b} + \\frac{b^2}{a} - a - b \\geq 0', explanation: '' },
        { step: 2, title: 'Wspólny mianownik $ab$', content: '\\frac{a^3 + b^3 - a^2b - ab^2}{ab} \\geq 0', explanation: 'Mianownik $ab > 0$, więc wystarczy wykazać, że licznik $\\geq 0$.' },
        { step: 3, title: 'Rozkład licznika', content: 'a^3 + b^3 - a^2b - ab^2 = a^2(a-b) - b^2(a-b) = (a^2-b^2)(a-b) = (a+b)(a-b)^2', explanation: 'Wyłączamy $(a-b)$, a następnie korzystamy z $a^2-b^2=(a+b)(a-b)$.' },
        { step: 4, title: 'Wniosek', content: '\\dfrac{(a+b)(a-b)^2}{ab} \\geq 0', explanation: '$a+b > 0$ (bo $a,b>0$), $(a-b)^2 \\geq 0$, $ab > 0$. Nierówność udowodniona. $\\blacksquare$' }
      ],
      hints: [
        { level: 1, text: 'Przenieś $a+b$ na lewą stronę i sprowadź do jednego ułamka z mianownikiem $ab$.' },
        { level: 2, text: 'Licznik to $a^3+b^3-a^2b-ab^2$. Wyłącz $(a-b)$.' },
        { level: 3, text: 'Rozkład: $(a+b)(a-b)^2 \\geq 0$. Mianownik $ab>0$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $m$ i $n$ prawdziwa jest nierówność\n$$(m + n)\\left(\\frac{1}{m} + \\frac{1}{n} + \\frac{4}{m+n}\\right) \\geq 8$$',
      method: 'Rozwinięcie iloczynu + nierówność AM-GM: $\\frac{n}{m}+\\frac{m}{n} \\geq 2$',
      solution: [
        { step: 1, title: 'Rozwinięcie nawiasów', content: '(m+n)\\!\\left(\\frac{1}{m}+\\frac{1}{n}+\\frac{4}{m+n}\\right) = \\frac{m+n}{m}+\\frac{m+n}{n}+4', explanation: 'Mnożymy $(m+n)$ przez każdy składnik sumy.' },
        { step: 2, title: 'Uproszczenie ułamków', content: '\\frac{m+n}{m}+\\frac{m+n}{n}+4 = \\left(1+\\frac{n}{m}\\right)+\\left(1+\\frac{m}{n}\\right)+4 = 6+\\frac{n}{m}+\\frac{m}{n}', explanation: '' },
        { step: 3, title: 'Nierówność AM-GM', content: '\\frac{n}{m}+\\frac{m}{n} \\geq 2\\sqrt{\\frac{n}{m}\\cdot\\frac{m}{n}} = 2', explanation: 'Dla dowolnych $x,y>0$: $x+y\\geq 2\\sqrt{xy}$ (nierówność AM-GM).' },
        { step: 4, title: 'Wniosek', content: '6 + \\frac{n}{m}+\\frac{m}{n} \\geq 6 + 2 = 8\\quad\\blacksquare', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Rozwiń iloczyn: $(m+n)\\cdot\\frac{1}{m} = 1+\\frac{n}{m}$ itd.' },
        { level: 2, text: 'Po uproszczeniu otrzymasz $6+\\frac{n}{m}+\\frac{m}{n}$.' },
        { level: 3, text: 'Zastosuj AM-GM: $\\frac{n}{m}+\\frac{m}{n} \\geq 2$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Wykaż, że dla każdych liczb rzeczywistych $a$ i $b$ takich, że $0 < a < b$, prawdziwa jest nierówność\n$$\\frac{b}{a} + \\frac{a}{b} > 2 + \\frac{(b-a)^2}{2ab}$$',
      method: 'Przeniesienie na jedną stronę + (a-b)² > 0',
      solution: [
        { step: 1, title: 'Przeniesienie', content: 'D = \\frac{b}{a}+\\frac{a}{b} - 2 - \\frac{(b-a)^2}{2ab}', explanation: 'Wystarczy wykazać, że $D > 0$.' },
        { step: 2, title: 'Wspólny mianownik $2ab$', content: 'D = \\frac{2b^2 + 2a^2 - 4ab - (b-a)^2}{2ab} = \\frac{2(a^2-2ab+b^2)-(b-a)^2}{2ab}', explanation: '' },
        { step: 3, title: 'Uproszczenie licznika', content: '2(a-b)^2 - (b-a)^2 = 2(a-b)^2 - (a-b)^2 = (a-b)^2', explanation: '$(b-a)^2=(a-b)^2$.' },
        { step: 4, title: 'Wniosek', content: 'D = \\dfrac{(a-b)^2}{2ab} > 0', explanation: '$(a-b)^2 > 0$ bo $a \\neq b$ (gdyż $a < b$), $ab > 0$ bo $a,b > 0$. $\\blacksquare$' }
      ],
      hints: [
        { level: 1, text: 'Przenieś $2+\\frac{(b-a)^2}{2ab}$ na lewą i sprowadź do mianownika $2ab$.' },
        { level: 2, text: 'Licznik: $2b^2+2a^2-4ab-(b-a)^2$. Pamiętaj, że $(b-a)^2=(a-b)^2=a^2-2ab+b^2$.' },
        { level: 3, text: 'Licznik upraszcza się do $(a-b)^2 > 0$ (bo $a\\neq b$).' }
      ]
    }
  ];

  function generate() {
    const pool = PROOFS.filter(p => p.difficulty === 'hard');
    const task = M.choose(pool.length > 0 ? pool : PROOFS);
    return {
      id: M.makeId('cat05_proof'),
      category: 5,
      categoryName: 'Dowód nierówności',
      type: 'algebraic_proof',
      points: 3,
      params: {},
      statement: task.statement,
      answer: {
        type: 'proof',
        display: task.method,
        description: `Metoda dowodu: ${task.method}. Patrz: rozwiązanie krok po kroku.`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  return { generate };
})();
