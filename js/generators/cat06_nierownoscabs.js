// Kategoria 6: Nierówność z wartością bezwzględną
// Wzorzec matura 2025 z.5: |x-2| - 2·|x+3| < -2
// Wzorzec matura 2026 z.5: |2x-6| - |x²-9| < 0
// Wzorzec matura 2022 z.7: |x-3| = 2x+11
window.cat06 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: |ax+b| - c·|dx+e| < f ===
  // Rozwiązanie metodą podziału na przedziały
  function absLinear(diff) {
    const templates = [
      // |x - a| < c
      () => {
        const a = M.choose(diff === 'easy' ? [-3,-2,-1,0,1,2,3] : [-5,-4,-3,-2,-1,0,1,2,3,4,5]);
        const c = M.pickNice(diff);
        // Rozwiązanie: a-c < x < a+c
        return {
          statement: `|x ${a >= 0 ? '-' + a : '+' + Math.abs(a)}| < ${c}`,
          solution_set: `(${a - c},\\, ${a + c})`,
          intervals: [
            `Nierówność $|x - (${a})| < ${c}$ opisuje odległość $x$ od $${a}$ mniejszą niż $${c}$.`,
            `Rozwiązanie: $${a} - ${c} < x < ${a} + ${c}$, czyli $x \\in (${a - c}, ${a + c})$.`
          ],
          steps: [
            { step: 1, title: 'Definicja wartości bezwzględnej', content: `|x - ${a}| < ${c} \\iff -${c} < x - ${a} < ${c}`, explanation: `$|A| < r \\iff -r < A < r$ dla $r > 0$.` },
            { step: 2, title: 'Dodanie ${a}', content: `${a} - ${c} < x < ${a} + ${c} \\iff ${a - c} < x < ${a + c}`, explanation: '' },
            { step: 3, title: 'Odpowiedź', content: `x \\in (${a - c},\\, ${a + c})`, explanation: '' }
          ]
        };
      },
      // |x - a| - k·|x + b| < c  — dwa punkty podziału
      () => {
        const a = M.choose(diff === 'easy' ? [-2,-1,1,2] : [-3,-2,-1,0,1,2,3]);
        const b = M.choose(diff === 'easy' ? [1,2,3] : [-3,-2,1,2,3,4]);
        const k = diff === 'easy' ? 1 : M.choose([1,2]);
        const c = M.choose(diff === 'easy' ? [-1,0,1] : [-3,-2,-1,0,1,2]);

        // Punkty podziału: x = a i x = -b (zakładam a > -b dla prostoty)
        // Jeśli k=1: |x-a| - |x+b| = const na każdym przedziale
        // Na (-∞,-b): -(x-a) - (-(x+b)) = -x+a+x+b = a+b
        //   a+b < c → brak rozwiązań lub wszystkie x < -b
        // Na [-b, a]: -(x-a) - (x+b) = a-b-2x
        //   a-b-2x < c → x > (a-b-c)/2
        // Na (a,+∞): (x-a) - (x+b) = -a-b
        //   -a-b < c → prawda zawsze lub nigdy

        const p1 = Math.min(-b, a), p2 = Math.max(-b, a);
        const stmt = `|x ${a >= 0 ? '-' + a : '+' + Math.abs(a)}| ${k === 2 ? '- 2' : '-'}|x ${b >= 0 ? '+' + b : '-' + Math.abs(b)}| < ${c}`;

        // Oblicz rozwiązanie (uproszczone przez podanie gotowych wyników)
        // Zamiast generowania, użyj gotowych przykładów
        return null; // signal to fallback
      }
    ];

    // Użyj tylko prostego szablonu
    const r = templates[0]();
    return {
      id: M.makeId('cat06_abs_linear'),
      category: 6,
      categoryName: 'Nierówność z |...|',
      type: 'abs_linear',
      points: 3,
      params: {},
      statement: `Rozwiąż nierówność\n$$${r.statement}$$\nZapisz obliczenia.`,
      answer: {
        type: 'interval',
        display: `x \\in ${r.solution_set}`,
        description: `Zbiór rozwiązań: $x \\in ${r.solution_set}$`
      },
      hints: [
        { level: 1, text: 'Skorzystaj z definicji: $|A| < r \\iff -r < A < r$ dla $r > 0$.' },
        { level: 2, text: r.intervals[0] },
        { level: 3, text: r.intervals[1] }
      ],
      solution: r.steps
    };
  }

  // === SCHEMAT B: Gotowe zadania z matur (dokładne wzorce) ===
  const MATURA_TASKS = [
    {
      difficulty: 'medium',
      statement: 'Rozwiąż nierówność\n$$|x - 2| - 2 \\cdot |x + 3| < -2$$\nZapisz obliczenia.',
      solution_set: 'x \\in (-\\infty,\\, -8) \\cup (0,\\, +\\infty)',
      solution: [
        { step: 1, title: 'Punkty podziału', content: 'x_1 = -3,\\quad x_2 = 2', explanation: 'Zerują wartości bezwzględne: $x+3=0 \\to x=-3$, $x-2=0 \\to x=2$.' },
        { step: 2, title: 'Przypadek 1: x < -3', content: '-(x-2) - 2(-(x+3)) < -2\\\\ -x+2+2x+6 < -2\\\\ x+8 < -2\\\\ x < -10', explanation: 'W tym przedziale: $x-2<0$ i $x+3<0$.' },
        { step: 3, title: 'Przypadek 2: -3 ≤ x < 2', content: '-(x-2) - 2(x+3) < -2\\\\ -x+2-2x-6 < -2\\\\ -3x-4 < -2\\\\ -3x < 2\\\\ x > -\\tfrac{2}{3}', explanation: 'W tym przedziale: $x-2<0$, $x+3\\geq 0$. Uwaga: dzielenie przez $-3$ odwraca nierówność!' },
        { step: 4, title: 'Przypadek 3: x ≥ 2', content: '(x-2) - 2(x+3) < -2\\\\ x-2-2x-6 < -2\\\\ -x-8 < -2\\\\ -x < 6\\\\ x > -6', explanation: 'Zawsze spełnione gdy $x \\geq 2$.' },
        { step: 5, title: 'Suma rozwiązań', content: 'x \\in (-\\infty, -10) \\cup \\left(-\\tfrac{2}{3}, 2\\right) \\cup [2, +\\infty) = (-\\infty,-10) \\cup \\left(-\\tfrac{2}{3},+\\infty\\right)', explanation: 'Łączymy przedziały z każdego przypadku.' }
      ],
      hints: [
        { level: 1, text: 'Podziel na przypadki: $x < -3$, $-3 \\leq x < 2$, $x \\geq 2$.' },
        { level: 2, text: 'W każdym przedziale opuść znaki wartości bezwzględnych (sprawdź znak!).' },
        { level: 3, text: 'Przypadek $x < -3$: nierówność staje się $x + 8 < -2$.' }
      ]
    },
    {
      difficulty: 'medium',
      statement: 'Rozwiąż nierówność\n$$|2x - 6| - |x^2 - 9| < 0$$\nZapisz obliczenia.',
      solution_set: 'x \\in (-3, 3) \\cup (3, +\\infty)',
      solution: [
        { step: 1, title: 'Przekształcenie', content: '|2x-6| < |x^2-9|\\\\ 2|x-3| < |x+3|\\cdot|x-3|', explanation: '$x^2-9=(x+3)(x-3)$, więc $|x^2-9|=|x+3||x-3|$.' },
        { step: 2, title: 'Przypadek x = 3', content: 'Lewa strona: $0$, prawa: $0$. Nierówność $0 < 0$ — fałsz. Odrzucamy $x = 3$.', explanation: '' },
        { step: 3, title: 'Przypadek x ≠ 3', content: '2|x-3| < |x+3||x-3| \\implies 2 < |x+3|\\\\ |x+3| > 2 \\iff x > -1 \\text{ lub } x < -5', explanation: 'Dzielimy przez $|x-3|>0$.' },
        { step: 4, title: 'Odpowiedź', content: 'x \\in (-5,-3) \\cup (-1, 3) \\cup (3, +\\infty)', explanation: 'Uwzględniamy $x \\neq 3$ i punkt podziału $x = -3$.' }
      ],
      hints: [
        { level: 1, text: 'Rozłóż: $2x-6 = 2(x-3)$, $x^2-9 = (x-3)(x+3)$.' },
        { level: 2, text: 'Wyłącz $|x-3|$. Przypadek $x=3$ sprawdź osobno.' },
        { level: 3, text: 'Po skróceniu: $2 < |x+3|$, czyli $x+3 > 2$ lub $x+3 < -2$.' }
      ]
    },
    {
      difficulty: 'easy',
      statement: 'Rozwiąż nierówność\n$$|x + 4| \\leq 3x$$\nZapisz obliczenia.',
      solution_set: 'x \\in [2, +\\infty)',
      solution: [
        { step: 1, title: 'Warunek konieczny', content: 'Aby $|x+4| \\leq 3x$, musimy mieć $3x \\geq 0$, czyli $x \\geq 0$.', explanation: '' },
        { step: 2, title: 'Przypadek x ≥ 0, x+4 ≥ 0 (tj. x ≥ -4)', content: 'x+4 \\leq 3x \\iff 4 \\leq 2x \\iff x \\geq 2', explanation: '' },
        { step: 3, title: 'Odpowiedź', content: 'x \\in [2, +\\infty)', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Warunek niezbędny: prawa strona $3x \\geq 0$.' },
        { level: 2, text: 'Dla $x \\geq 0$: $x + 4 > 0$, więc $|x+4| = x+4$.' },
        { level: 3, text: '$x + 4 \\leq 3x \\iff 2x \\geq 4 \\iff x \\geq 2$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Rozwiąż nierówność\n$$|3x - 2| > 2|x + 4|$$\nZapisz obliczenia.',
      solution_set: 'x \\in \\left(-\\infty,\\, -\\dfrac{6}{5}\\right) \\cup (10,\\, +\\infty)',
      solution: [
        { step: 1, title: 'Punkty podziału', content: 'x_1 = -4,\\quad x_2 = \\tfrac{2}{3}', explanation: 'Zerują wartości bezwzględne: $x+4=0\\to x=-4$, $3x-2=0\\to x=\\tfrac{2}{3}$.' },
        { step: 2, title: 'Przypadek 1: $x < -4$', content: '-(3x-2) > 2\\cdot(-(x+4))\\\\ -3x+2 > -2x-8\\\\ -x > -10\\\\ x < 10', explanation: 'W tym przedziale: $3x-2<0$ i $x+4<0$. Połączenie z $x<-4$: cały przedział $(-\\infty,-4)$.' },
        { step: 3, title: 'Przypadek 2: $-4 \\leq x < \\frac{2}{3}$', content: '-(3x-2) > 2(x+4)\\\\ -3x+2 > 2x+8\\\\ -5x > 6\\\\ x < -\\tfrac{6}{5}', explanation: 'Połączenie z $-4\\leq x<\\tfrac{2}{3}$: $x\\in\\left[-4,\\,-\\tfrac{6}{5}\\right)$.' },
        { step: 4, title: 'Przypadek 3: $x \\geq \\frac{2}{3}$', content: '(3x-2) > 2(x+4)\\\\ 3x-2 > 2x+8\\\\ x > 10', explanation: 'Połączenie z $x\\geq\\tfrac{2}{3}$: $x\\in(10,+\\infty)$.' },
        { step: 5, title: 'Suma rozwiązań', content: '(-\\infty,-4)\\cup\\left[-4,-\\tfrac{6}{5}\\right)\\cup(10,+\\infty) = \\left(-\\infty,-\\tfrac{6}{5}\\right)\\cup(10,+\\infty)', explanation: 'Pierwsze dwa przedziały łączą się.' }
      ],
      hints: [
        { level: 1, text: 'Podziel na przypadki: $x<-4$, $-4\\leq x<\\tfrac{2}{3}$, $x\\geq\\tfrac{2}{3}$.' },
        { level: 2, text: 'W każdym przedziale opuść znaki wartości bezwzględnych, uwzględniając ich znak na tym przedziale.' },
        { level: 3, text: 'Przypadek 2 daje $x<-\\tfrac{6}{5}$, stąd $x\\in[-4,-\\tfrac{6}{5})$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Rozwiąż nierówność\n$$|x^2 - 5x + 4| \\leq x - 1$$\nZapisz obliczenia.',
      solution_set: 'x \\in \\{1\\} \\cup [3,\\, 5]',
      solution: [
        { step: 1, title: 'Warunek konieczny i rozkład', content: 'x^2-5x+4 = (x-1)(x-4)\\\\ \\text{Prawa strona } x-1 \\geq 0 \\implies x \\geq 1', explanation: 'Wartość bezwzględna $\\geq 0$, więc prawa strona też musi być $\\geq 0$.' },
        { step: 2, title: 'Przedział $1 \\leq x \\leq 4$', content: '(x-1)(x-4) \\leq 0$, więc $|(x-1)(x-4)| = (x-1)(4-x)$\\\\ (x-1)(4-x) \\leq x-1', explanation: '' },
        { step: 3, title: 'Podprzedział $x > 1$', content: '\\text{Dzielimy przez } (x-1) > 0\\text{:}\\\\ 4-x \\leq 1 \\implies x \\geq 3\\\\ \\text{Połączenie z } 1<x\\leq 4\\text{: } x\\in[3,4]', explanation: '' },
        { step: 4, title: 'Przypadek $x = 1$', content: '|(1-1)(1-4)| = 0 \\leq 1-1 = 0\\quad\\checkmark', explanation: '$x=1$ jest rozwiązaniem.' },
        { step: 5, title: 'Przedział $x > 4$', content: '(x-1)(x-4) > 0$, więc $|(x-1)(x-4)| = (x-1)(x-4)$\\\\ (x-1)(x-4) \\leq x-1\\\\ \\text{Dzielimy przez }(x-1)>0\\text{:} \\quad x-4\\leq 1 \\implies x\\leq 5\\\\ \\text{Połączenie z } x>4\\text{: } x\\in(4,5]', explanation: '' },
        { step: 6, title: 'Odpowiedź', content: '\\{1\\}\\cup[3,4]\\cup(4,5] = \\{1\\}\\cup[3,5]', explanation: 'Przedziały $[3,4]$ i $(4,5]$ łączą się w $[3,5]$.' }
      ],
      hints: [
        { level: 1, text: 'Rozłóż: $x^2-5x+4=(x-1)(x-4)$. Warunek konieczny: prawa strona $x-1\\geq 0$.' },
        { level: 2, text: 'Na $[1,4]$: $(x-1)(x-4)\\leq 0$, więc $|(\\ldots)|=(x-1)(4-x)$. Dla $x>1$ dzielisz przez $x-1>0$.' },
        { level: 3, text: 'Na $(4,+\\infty)$: $|(\\ldots)|=(x-1)(x-4)$. Podziel przez $x-1>0$ i dostaniesz $x\\leq 5$.' }
      ]
    },
    {
      difficulty: 'hard',
      statement: 'Rozwiąż nierówność\n$$\\sqrt{x^2 + 4x + 4} < \\frac{1}{3}\\left(25 - \\sqrt{x^2 - 6x + 9}\\right)$$\nWskazówka: $\\sqrt{a^2} = |a|$.',
      solution_set: 'x \\in \\left(-2,\\, \\frac{19}{4}\\right)',
      solution: [
        { step: 1, title: 'Uproszczenie lewej strony', content: '\\sqrt{x^2+4x+4} = \\sqrt{(x+2)^2} = |x+2|', explanation: '' },
        { step: 2, title: 'Uproszczenie prawej strony', content: '\\sqrt{x^2-6x+9} = \\sqrt{(x-3)^2} = |x-3|', explanation: '' },
        { step: 3, title: 'Nierówność', content: '|x+2| < \\frac{25-|x-3|}{3}\\\\ 3|x+2| < 25-|x-3|\\\\ 3|x+2| + |x-3| < 25', explanation: '' },
        { step: 4, title: 'Podział na przypadki', content: 'Punkt -2 i 3. Na przedziale $[-2, 3]$: $3(x+2)+(3-x) = 2x+9 < 25 \\iff x < 8$. Uwzględniając: $x \\in [-2,3]$.\nNa $(3,+\\infty)$: $3(x+2)+(x-3) = 4x+3 < 25 \\iff x < 5.5$, więc $x \\in (3, 5.5)$.\nNa $(-\\infty,-2)$: $-3(x+2)-(x-3) = -4x-3 < 25 \\iff x > -7$, więc $x \\in (-7,-2)$.', explanation: '' },
        { step: 5, title: 'Dziedzina', content: 'Prawa strona $>0$: $25-|x-3|>0 \\iff |x-3|<25 \\iff -22<x<28$. Po połączeniu: $x \\in (-2, \\frac{19}{4})$ (sprawdź granice).', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Zauważ: $x^2+4x+4 = (x+2)^2$ i $x^2-6x+9 = (x-3)^2$.' },
        { level: 2, text: 'Nierówność upraszcza się do $3|x+2| + |x-3| < 25$.' },
        { level: 3, text: 'Podziel na trzy przedziały: $x < -2$, $-2 \\leq x < 3$, $x \\geq 3$.' }
      ]
    }
  ];

  function generate() {
    const pool = MATURA_TASKS.filter(t => t.difficulty === 'hard');
    const task = M.choose(pool.length > 0 ? pool : MATURA_TASKS);
    return {
      id: M.makeId('cat06'),
      category: 6,
      categoryName: 'Nierówność z |...|',
      type: 'abs_inequality',
      points: 4,
      params: {},
      statement: task.statement,
      answer: {
        type: 'interval',
        display: task.solution_set,
        description: `Zbiór rozwiązań: $${task.solution_set}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  return { generate };
})();
