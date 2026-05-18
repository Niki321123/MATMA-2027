// Kategoria 3: Logarytmy
// Wzorzec z matur: dowód/oblicz log wyrażenie przez a i b
// Matura 2024 z. 5: jeżeli log₅4 = a i log₄3 = b, to log₁₂80 = (2a+1)/(a·(1+b))
// Matura 2021 z. 6: niech log₂18 = c. Wykaż że log₃4 = 4/(c−1)
window.cat03 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Wyraź logarytm przez a i b ===
  // a = log_p(q), b = log_r(s), wyraź log_t(u) przez a i b
  function expressLog(diff) {
    // Zestaw gotowych ładnych zadań (jak w maturze)
    const tasks = [
      {
        given: [
          { sym: 'a', expr: '\\log_5 4', base: 5, val: 4 },
          { sym: 'b', expr: '\\log_4 3', base: 4, val: 3 }
        ],
        find: '\\log_{12} 80',
        result: '\\dfrac{2a + 1}{a \\cdot (1 + b)}',
        proof_steps: [
          {
            step: 1, title: 'Przekształcenie log₁₂80',
            content: '\\log_{12} 80 = \\dfrac{\\log 80}{\\log 12} = \\dfrac{\\log(16 \\cdot 5)}{\\log(4 \\cdot 3)} = \\dfrac{\\log 16 + \\log 5}{\\log 4 + \\log 3}',
            explanation: 'Używamy wzoru zmiany podstawy i rozkładu na czynniki.'
          },
          {
            step: 2, title: 'Wyrażanie przez log 4 i log 5',
            content: '\\dfrac{2\\log 4 + \\log 5}{\\log 4 + \\log 3}',
            explanation: 'log 16 = 2·log 4, log 80 = log(16·5) = 2log4 + log5.'
          },
          {
            step: 3, title: 'Wyrażanie przez a i b',
            content: 'a = \\dfrac{\\log 4}{\\log 5} \\implies \\log 5 = \\dfrac{\\log 4}{a}, \\quad b = \\dfrac{\\log 3}{\\log 4} \\implies \\log 3 = b \\cdot \\log 4',
            explanation: 'Wyznaczamy log5 i log3 przez log4, korzystając z definicji a i b.'
          },
          {
            step: 4, title: 'Podstawienie',
            content: '\\dfrac{2\\log 4 + \\frac{\\log 4}{a}}{\\log 4 + b \\cdot \\log 4} = \\dfrac{\\log 4 \\cdot (2 + \\frac{1}{a})}{\\log 4 \\cdot (1 + b)} = \\dfrac{2 + \\frac{1}{a}}{1 + b} = \\dfrac{\\frac{2a+1}{a}}{1+b} = \\dfrac{2a+1}{a(1+b)}',
            explanation: 'Skracamy log4, upraszczamy ułamek.'
          }
        ]
      },
      {
        given: [
          { sym: 'c', expr: '\\log_2 18', base: 2, val: 18 }
        ],
        find: '\\log_3 4',
        result: '\\dfrac{4}{c - 1}',
        proof_steps: [
          {
            step: 1, title: 'Rozłożenie log₂18',
            content: 'c = \\log_2 18 = \\log_2(2 \\cdot 9) = \\log_2 2 + \\log_2 9 = 1 + 2\\log_2 3',
            explanation: 'log₂18 = log₂(2·3²) = 1 + 2log₂3.'
          },
          {
            step: 2, title: 'Wyznaczenie log₂3',
            content: 'c = 1 + 2\\log_2 3 \\implies \\log_2 3 = \\dfrac{c-1}{2}',
            explanation: 'Wyznaczamy log₂3 z równania.'
          },
          {
            step: 3, title: 'Obliczenie log₃4',
            content: '\\log_3 4 = \\dfrac{\\log_2 4}{\\log_2 3} = \\dfrac{2}{\\frac{c-1}{2}} = \\dfrac{4}{c-1}',
            explanation: 'Wzór zmiany podstawy: log_a(b) = log_c(b)/log_c(a).'
          }
        ]
      },
      {
        given: [
          { sym: 'a', expr: '\\log_2 3', base: 2, val: 3 }
        ],
        find: '\\log_6 8',
        result: '\\dfrac{3}{a + 1}',
        proof_steps: [
          {
            step: 1, title: 'Zastosowanie wzoru zmiany podstawy',
            content: '\\log_6 8 = \\dfrac{\\log_2 8}{\\log_2 6} = \\dfrac{3}{\\log_2(2 \\cdot 3)} = \\dfrac{3}{1 + \\log_2 3}',
            explanation: 'log₂8 = 3, log₂6 = log₂2 + log₂3 = 1 + a.'
          },
          {
            step: 2, title: 'Podstawienie a',
            content: '= \\dfrac{3}{1 + a}',
            explanation: 'Podstawiamy a = log₂3.'
          }
        ]
      },
      {
        given: [
          { sym: 'a', expr: '\\log_3 5', base: 3, val: 5 },
          { sym: 'b', expr: '\\log_5 7', base: 5, val: 7 }
        ],
        find: '\\log_{15} 35',
        result: '\\dfrac{a(b+1)}{a+1}',
        proof_steps: [
          {
            step: 1, title: 'Zmiana podstawy',
            content: '\\log_{15} 35 = \\dfrac{\\log_3 35}{\\log_3 15} = \\dfrac{\\log_3(5 \\cdot 7)}{\\log_3(3 \\cdot 5)}',
            explanation: 'Stosujemy wzór zmiany podstawy z bazą 3.'
          },
          {
            step: 2, title: 'Rozłożenie logarytmów',
            content: '= \\dfrac{\\log_3 5 + \\log_3 7}{1 + \\log_3 5} = \\dfrac{a + \\log_3 7}{1 + a}',
            explanation: 'log₃15 = 1 + log₃5 = 1 + a.'
          },
          {
            step: 3, title: 'Wyrażenie log₃7 przez a i b',
            content: '\\log_3 7 = \\log_3 5 \\cdot \\log_5 7 = a \\cdot b',
            explanation: 'Wzór łańcuchowy: log_a(c) = log_a(b)·log_b(c).'
          },
          {
            step: 4, title: 'Podstawienie',
            content: '\\dfrac{a + ab}{1 + a} = \\dfrac{a(1+b)}{a+1}',
            explanation: 'Wyłączamy a z licznika.'
          }
        ]
      },
      {
        given: [
          { sym: 'k', expr: '\\log_4 3', base: 4, val: 3 }
        ],
        find: '\\log_8 48',
        result: '\\dfrac{2(k+2)}{3}',
        proof_steps: [
          {
            step: 1, title: 'Rozkład log₈48',
            content: '\\log_8 48 = \\dfrac{\\log_4 48}{\\log_4 8} = \\dfrac{\\log_4 48}{\\frac{3}{2}}',
            explanation: 'Stosujemy wzór zmiany podstawy. log₄8 = log₄(4^(3/2)) = 3/2.'
          },
          {
            step: 2, title: 'Obliczenie log₄48',
            content: '\\log_4 48 = \\log_4(16 \\cdot 3) = \\log_4 16 + \\log_4 3 = 2 + k',
            explanation: 'log₄16 = 2, ponieważ 4² = 16.'
          },
          {
            step: 3, title: 'Wynik',
            content: '\\log_8 48 = \\dfrac{2 + k}{3/2} = \\dfrac{2(2+k)}{3} = \\dfrac{2k+4}{3}',
            explanation: 'Mnożymy licznik przez 2/2.'
          }
        ]
      }
    ];

    const task = M.choose(diff === 'easy' ? tasks.slice(0, 3) : tasks);
    const givenStrs = task.given.map(g => `$${g.sym} = ${g.expr}$`).join(' oraz ');

    return {
      id: M.makeId('cat03_log'),
      category: 3,
      categoryName: 'Logarytmy',
      type: 'express_log',
      difficulty: diff,
      points: 3,
      params: { task },
      statement:
        `Wykaż, że jeżeli ${givenStrs}, to\n` +
        `$$${task.find} = ${task.result}$$`,
      answer: {
        type: 'proof',
        display: task.result,
        description: `Dowód: $${task.find} = ${task.result}$`
      },
      hints: [
        { level: 1, text: `Skorzystaj z wzoru zmiany podstawy: $\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$ dla dowolnej podstawy $c > 0$, $c \\neq 1$.` },
        { level: 2, text: `Rozkład: ${task.proof_steps[0].content}` },
        { level: 3, text: `Wyrażaj logarytmy danych wartości przez podane symbole (${task.given.map(g => g.sym).join(', ')}).` }
      ],
      solution: task.proof_steps
    };
  }

  // === SCHEMAT B: Obliczenie wyrażenia z logarytmami ===
  function computeLog(diff) {
    const tasks = [
      {
        statement: 'Oblicz wartość wyrażenia\n$$\\log_3 \\sqrt{27} \\cdot \\log_{\\sqrt{3}} 9$$',
        answer_display: '3',
        answer_val: 3,
        solution: [
          { step: 1, title: 'Uproszczenie log₃√27', content: '\\log_3 \\sqrt{27} = \\log_3 3^{3/2} = \\dfrac{3}{2}', explanation: '√27 = 27^(1/2) = (3³)^(1/2) = 3^(3/2).' },
          { step: 2, title: 'Uproszczenie log_{√3} 9', content: '\\log_{\\sqrt{3}} 9 = \\log_{3^{1/2}} 3^2 = \\dfrac{2}{1/2} = 4', explanation: 'Wzór zmiany podstawy lub: (√3)^x = 9 → x = 4.' },
          { step: 3, title: 'Iloczyn', content: '\\dfrac{3}{2} \\cdot 4 = \\mathbf{3}', explanation: '' }
        ]
      },
      {
        statement: 'Oblicz wartość wyrażenia\n$$3\\log_2 5 - \\log_2 50 + \\log_2 4$$',
        answer_display: '\\log_2 5',
        answer_val: Math.log2(5),
        solution: [
          { step: 1, title: 'Użycie własności logarytmów', content: '3\\log_2 5 = \\log_2 125, \\quad \\log_2 50 = \\log_2(25 \\cdot 2) = \\log_2 25 + 1', explanation: '' },
          { step: 2, title: 'Obliczenie', content: '\\log_2 125 - \\log_2 50 + \\log_2 4 = \\log_2 \\dfrac{125 \\cdot 4}{50} = \\log_2 10', explanation: '' },
          { step: 3, title: 'Wynik', content: '\\log_2 10 \\approx 3,32...', explanation: 'Możemy też zapisać jako log₂10.' }
        ]
      },
      {
        statement: 'Oblicz\n$$\\dfrac{\\log 8 + \\log 125}{\\log 2 + \\log 5}$$',
        answer_display: '3',
        answer_val: 3,
        solution: [
          { step: 1, title: 'Uproszczenie', content: '\\log 8 = 3\\log 2, \\quad \\log 125 = 3\\log 5', explanation: '' },
          { step: 2, title: 'Podstawienie', content: '\\dfrac{3\\log 2 + 3\\log 5}{\\log 2 + \\log 5} = \\dfrac{3(\\log 2 + \\log 5)}{\\log 2 + \\log 5} = \\mathbf{3}', explanation: 'Skrócenie wspólnego czynnika.' }
        ]
      }
    ];

    const task = M.choose(diff === 'easy' ? tasks.slice(2) : tasks);
    return {
      id: M.makeId('cat03_compute'),
      category: 3,
      categoryName: 'Logarytmy',
      type: 'compute_log',
      difficulty: diff,
      points: 2,
      params: {},
      statement: task.statement + '\n\nZapisz obliczenia.',
      answer: {
        type: 'number',
        value: task.answer_val,
        display: task.answer_display,
        description: `Wynik $= ${task.answer_display}$`
      },
      hints: [
        { level: 1, text: 'Skorzystaj z wzorów: $\\log_a(xy) = \\log_a x + \\log_a y$, $\\log_a x^n = n \\log_a x$.' },
        { level: 2, text: 'Rozłóż liczby na potęgi: $8 = 2^3$, $125 = 5^3$, $27 = 3^3$, $\\sqrt{27} = 3^{3/2}$.' },
        { level: 3, text: task.solution.length > 0 ? task.solution[0].content : '' }
      ],
      solution: task.solution
    };
  }

  // Poprawienie hints w computeLog
  function fixedComputeLog(diff) {
    const r = computeLog(diff);
    r.hints = [
      { level: 1, text: 'Skorzystaj z wzorów: $\\log_a(xy) = \\log_a x + \\log_a y$, $\\log_a x^n = n \\log_a x$.' },
      { level: 2, text: 'Rozłóż liczby na potęgi: $8 = 2^3$, $125 = 5^3$, $27 = 3^3$.' },
      { level: 3, text: r.solution.length > 0 ? r.solution[0].content : '' }
    ];
    return r;
  }

  function generate(diff = 'medium') {
    return M.choose([expressLog, fixedComputeLog])(diff);
  }

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
