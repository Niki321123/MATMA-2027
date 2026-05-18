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
    }
  ];

  function generate(diff = 'medium') {
    const pool = PROOFS.filter(p => p.difficulty === diff);
    const task = M.choose(pool.length > 0 ? pool : PROOFS);
    return {
      id: M.makeId('cat05_proof'),
      category: 5,
      categoryName: 'Dowód nierówności',
      type: 'algebraic_proof',
      difficulty: diff,
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

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
