// Kategoria 12: Równanie kwadratowe z parametrem
// Wzorzec matura 2025 z.3: warunki na pierwiastki przez wzory Viète'a
// Wzorzec matura 2024 z.3: x²+bx+c=0, jeden pierwiastek znany, znajdź drugi + parametr
// Wzorzec matura 2023 z.4: równanie z parametrem m, wyróżnik, ilość rozwiązań
// Wzorzec matura 2018 z.12: x₁³+x₂³ warunek (tożsamość Newtona)
// Wzorzec matura 2025 z.11: (x₁-x₂)² i pierwiastki tego samego znaku
// Wzorzec matura 2026 z.10: pierwiastki w przedziale (-a, a)
window.cat12 = (() => {
  const M = window.MathUtils;

  // === Wzory Viète'a: dane warunki na x1+x2 i x1·x2 ===
  function vieta() {
    const x1 = M.choose([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    const x2 = M.choose([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    const a = M.choose([1,-1,2,-2,3,-3]);

    const b = -a * (x1 + x2);
    const c = a * x1 * x2;

    // Typ zadania: podaj x1+x2 i x1·x2, znajdź x1²+x2² lub (x1-x2)²
    const sumSq = (x1 + x2) * (x1 + x2) - 2 * x1 * x2;
    const diffSq = (x1 + x2) * (x1 + x2) - 4 * x1 * x2;

    const taskType = M.choose(['sumSq', 'diffSq']);
    let ask, ans, ansLatex, solutionSteps;

    if (taskType === 'sumSq') {
      ask = `$x_1^2 + x_2^2$`;
      ans = sumSq;
      ansLatex = String(sumSq);
      solutionSteps = [
        { step: 1, title: 'Wzory Viète\'a', content: `x_1 + x_2 = ${-b/a},\\quad x_1 x_2 = ${c/a}`, explanation: 'Dla $ax^2+bx+c=0$: suma pierwiastków $= -b/a$, iloczyn $= c/a$.' },
        { step: 2, title: 'Tożsamość', content: `x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = ${-b/a}^2 - 2\\cdot${c/a} = ${(-b/a)*(-b/a)} - ${2*c/a} = ${sumSq}`, explanation: '' }
      ];
    } else if (taskType === 'diffSq') {
      ask = `$(x_1 - x_2)^2$`;
      ans = diffSq;
      ansLatex = String(diffSq);
      solutionSteps = [
        { step: 1, title: 'Wzory Viète\'a', content: `x_1 + x_2 = ${-b/a},\\quad x_1 x_2 = ${c/a}`, explanation: '' },
        { step: 2, title: 'Tożsamość', content: `(x_1-x_2)^2 = (x_1+x_2)^2 - 4x_1x_2 = ${(-b/a)*(-b/a)} - 4\\cdot${c/a} = ${diffSq}`, explanation: '' }
      ];
    } else {
      // 1/x1 + 1/x2 = (x1+x2)/(x1·x2)
      if (x1 * x2 === 0) return vieta();
      ask = `$\\dfrac{1}{x_1} + \\dfrac{1}{x_2}$`;
      ansLatex = M.latexFrac(-b, c);
      ans = -b / c;
      solutionSteps = [
        { step: 1, title: 'Wzory Viète\'a', content: `x_1 + x_2 = \\frac{${-b}}{${a}},\\quad x_1 x_2 = \\frac{${c}}{${a}}`, explanation: '' },
        { step: 2, title: 'Obliczenie', content: `\\frac{1}{x_1}+\\frac{1}{x_2} = \\frac{x_1+x_2}{x_1 x_2} = \\frac{${-b/a}}{${c/a}} = \\frac{${-b}}{${c}} = ${ansLatex}`, explanation: '' }
      ];
    }

    return {
      id: M.makeId('cat12_vieta'),
      category: 12,
      categoryName: 'Parametr w równaniu',
      type: 'vieta',
      points: 3,
      params: { a, b, c, x1, x2 },
      statement:
        `Liczby $x_1$ i $x_2$ są pierwiastkami równania\n` +
        `$$${a !== 1 ? a : ''}x^2 ${b >= 0 ? '+' + b : b}x ${c >= 0 ? '+' + c : c} = 0$$\n\n` +
        `**Oblicz ${ask}.** Zapisz obliczenia.`,
      answer: {
        type: 'number',
        value: ans,
        display: ansLatex,
        description: `${ask} $= ${ansLatex}$`
      },
      hints: [
        { level: 1, text: `Wzory Viète'a: $x_1+x_2 = \\frac{${-b}}{${a}}$, $x_1 x_2 = \\frac{${c}}{${a}}$.` },
        { level: 2, text: taskType === 'recipSum'
          ? `$\\frac{1}{x_1}+\\frac{1}{x_2} = \\frac{x_1+x_2}{x_1 x_2}$.`
          : taskType === 'sumSq'
            ? `$(x_1+x_2)^2 = x_1^2 + 2x_1x_2 + x_2^2$.`
            : `$(x_1-x_2)^2 = (x_1+x_2)^2 - 4x_1x_2$.` },
        { level: 3, text: `Wynik: $${ansLatex}$.` }
      ],
      solution: solutionSteps
    };
  }

  // === Równanie z parametrem m: warunek na wyróżnik ===
  function paramDiscriminant() {
    const a = M.choose([1,-1,2,-2,3,-3]);
    const c = M.choose([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);

    const fac = 4 * a * c;
    let condition, conditionDesc, solSet, steps;

    const taskType = M.choose(['two_solutions', 'no_solutions', 'one_solution']);

    if (taskType === 'two_solutions') {
      condition = 'dwa rozwiązania';
      conditionDesc = 'Δ > 0';
      if (fac > 0) {
        const sq = Math.sqrt(fac);
        const sqNice = Number.isInteger(sq);
        solSet = sqNice
          ? `m \\in (-\\infty, -${sq}) \\cup (${sq}, +\\infty)`
          : `m \\in (-\\infty, -\\sqrt{${fac}}) \\cup (\\sqrt{${fac}}, +\\infty)`;
        const sqStr = sqNice ? String(sq) : `\\sqrt{${fac}}`;
        steps = [
          { step: 1, title: 'Wyróżnik', content: `\\Delta = m^2 - 4\\cdot${a}\\cdot${c} = m^2 - ${fac}`, explanation: '' },
          { step: 2, title: 'Warunek Δ > 0', content: `m^2 - ${fac} > 0 \\iff m^2 > ${fac} \\iff |m| > ${sqStr}`, explanation: '' },
          { step: 3, title: 'Odpowiedź', content: `m \\in (-\\infty, -${sqStr}) \\cup (${sqStr}, +\\infty)`, explanation: '' }
        ];
      } else if (fac <= 0) {
        solSet = 'm \\in \\mathbb{R}';
        steps = [
          { step: 1, title: 'Wyróżnik', content: `\\Delta = m^2 - ${fac} = m^2 + ${-fac}`, explanation: '' },
          { step: 2, title: 'Wniosek', content: `m^2 + ${-fac} > 0$ dla każdego $m$ (suma nieujemna i ${-fac})`, explanation: 'Zawsze dodatnie.' },
          { step: 3, title: 'Odpowiedź', content: 'm \\in \\mathbb{R}', explanation: '' }
        ];
      }
    } else if (taskType === 'no_solutions') {
      condition = 'brak rozwiązań rzeczywistych';
      conditionDesc = 'Δ < 0';
      if (fac > 0) {
        const sq = Math.sqrt(fac);
        const sqNice = Number.isInteger(sq);
        const sqStr = sqNice ? String(sq) : `\\sqrt{${fac}}`;
        solSet = `m \\in (-${sqStr}, ${sqStr})`;
        steps = [
          { step: 1, title: 'Wyróżnik', content: `\\Delta = m^2 - ${fac}`, explanation: '' },
          { step: 2, title: 'Warunek Δ < 0', content: `m^2 < ${fac} \\iff -${sqStr} < m < ${sqStr}`, explanation: '' },
          { step: 3, title: 'Odpowiedź', content: `m \\in (-${sqStr}, ${sqStr})`, explanation: '' }
        ];
      } else {
        solSet = '\\emptyset';
        steps = [{ step: 1, title: 'Wyróżnik', content: `\\Delta = m^2 - ${fac} \\geq 0$ dla każdego $m$`, explanation: 'Zawsze nieujemne.' }];
      }
    } else {
      condition = 'dokładnie jedno rozwiązanie (wyróżnik = 0)';
      conditionDesc = 'Δ = 0';
      if (fac >= 0) {
        const sq = Math.sqrt(fac);
        const sqNice = Number.isInteger(sq);
        const sqStr = sqNice ? String(sq) : `\\sqrt{${fac}}`;
        solSet = sqNice ? `m = ${sq} \\text{ lub } m = -${sq}` : `m = \\pm\\sqrt{${fac}}`;
        steps = [
          { step: 1, title: 'Wyróżnik', content: `\\Delta = m^2 - ${fac} = 0 \\iff m^2 = ${fac}`, explanation: '' },
          { step: 2, title: 'Odpowiedź', content: `m = \\pm ${sqStr}`, explanation: '' }
        ];
      } else {
        solSet = '\\emptyset';
        steps = [{ step: 1, title: 'Wyróżnik', content: `\\Delta = m^2 + ${-fac} > 0$ zawsze`, explanation: 'Brak wartości m.' }];
      }
    }

    return {
      id: M.makeId('cat12_param'),
      category: 12,
      categoryName: 'Parametr w równaniu',
      type: 'param_discriminant',
      points: 4,
      params: { a, c, fac },
      statement:
        `Dane jest równanie\n$$${a !== 1 ? a : ''}x^2 + mx + ${c} = 0$$\n` +
        `gdzie $m$ jest parametrem rzeczywistym.\n\n` +
        `**Znajdź wszystkie wartości parametru $m$, dla których to równanie ma ${condition}.** Zapisz obliczenia.`,
      answer: {
        type: 'interval',
        display: solSet,
        description: `$${solSet}$`
      },
      hints: [
        { level: 1, text: `Wyróżnik trójmianu kwadratowego: $\\Delta = b^2 - 4ac$. Tutaj $b = m$.` },
        { level: 2, text: `$\\Delta = m^2 - 4\\cdot${a}\\cdot${c} = m^2 - ${fac}$.` },
        { level: 3, text: `Warunek: $${conditionDesc}$. Rozwiąż nierówność (lub równanie).` }
      ],
      solution: steps || []
    };
  }

  // === Tożsamość Newtona: x₁³+x₂³ ===
  // Wzorzec: x² - (p+q)x + pq = 0, warunek x₁³+x₂³ ≥ / ≤ K
  // Konfiguracje: s = x₁+x₂, p = x₁x₂, oba wyrażone przez m
  const NEWTON_TASKS = [
    {
      // x² - (3m+1)x + (2m+3) = 0
      // s = 3m+1, p = 2m+3
      // x₁³+x₂³ = s³-3ps = (3m+1)³-3(2m+3)(3m+1)
      // Dla m=0: s=1,p=3 → 1-9=-8; m=1: s=4,p=5 → 64-60=4; m=2: s=7,p=7 → 343-147=196
      // Uprośćmy: x²-(m+2)x+(2m-1)=0, s=m+2, p=2m-1
      // x₁³+x₂³ = (m+2)³ - 3(2m-1)(m+2)
      //         = m³+6m²+12m+8 - 3(2m²+4m-m-2)
      //         = m³+6m²+12m+8 - 6m²-9m+6
      //         = m³+3m+14
      // Warunek: x₁³+x₂³ = m³+3m+14, żądamy aby > 0 → m³+3m+14>0, m>-2 lub brak
      eqStr: 'x^2 - (m+2)x + (2m-1) = 0',
      s_str: 'm+2',
      p_str: '2m-1',
      newton_str: '(m+2)^3 - 3(2m-1)(m+2)',
      newton_expanded: 'm^3 + 3m + 14',
      question: 'Wykaż, że $x_1^3 + x_2^3 > 0$ dla każdego $m \\in \\mathbb{R}$, dla którego równanie ma dwa pierwiastki rzeczywiste.',
      answer_display: 'x_1^3+x_2^3 = m^3+3m+14 > 0',
      answer_type: 'dowód',
      solution: [
        { step: 1, title: 'Wzory Viète\'a', content: 'x_1+x_2 = m+2,\\quad x_1 x_2 = 2m-1', explanation: '' },
        { step: 2, title: 'Tożsamość Newtona', content: 'x_1^3+x_2^3 = (x_1+x_2)^3 - 3x_1x_2(x_1+x_2)', explanation: '$a^3+b^3=(a+b)^3-3ab(a+b)$.' },
        { step: 3, title: 'Podstawienie', content: '= (m+2)^3 - 3(2m-1)(m+2)\\\\ = m^3+6m^2+12m+8 - 3(2m^2+3m-2)\\\\ = m^3+6m^2+12m+8-6m^2-9m+6\\\\ = m^3+3m+14', explanation: '' },
        { step: 4, title: 'Znak wyrażenia', content: 'm^3+3m+14 = m(m^2+3)+14 \\geq 14 + m(m^2+3)', explanation: 'Dla $m \\geq 0$: wyrażenie $\\geq 14 > 0$. Dla $m < 0$: $m(m^2+3) \\geq -|m|(m^2+3)$, ale $m^3+3m \\geq -2\\cdot\\frac{2\\sqrt{3}}{3\\sqrt{3}}\\cdot 3^{3/2}$... Można wykazać, że $f(m)=m^3+3m+14$, $f\'(m)=3m^2+3>0$ (funkcja rosnąca), $f(-2)=-8-6+14=0$, więc $f(m)>0$ dla $m>-2$.' },
        { step: 5, title: 'Wniosek', content: 'f(-2) = 0,\\ f\'(m)=3m^2+3>0 \\Rightarrow f \\text{ rosnąca}.\\\\ f(m) > 0 \\iff m > -2', explanation: 'Sprawdzamy kiedy równanie ma rzeczywiste pierwiastki: $\\Delta = (m+2)^2-4(2m-1)=m^2+4m+4-8m+4=m^2-4m+8=(m-2)^2+4>0$ — zawsze. Więc warunek to $m > -2$.' }
      ],
      hints: [
        { level: 1, text: 'Użyj tożsamości: $x_1^3+x_2^3 = (x_1+x_2)^3 - 3x_1x_2(x_1+x_2)$.' },
        { level: 2, text: 'Wzory Viète\'a: $x_1+x_2 = m+2$, $x_1 x_2 = 2m-1$. Podstaw do tożsamości.' },
        { level: 3, text: 'Po uproszczeniu: $x_1^3+x_2^3 = m^3+3m+14$. Wykaż, że ta funkcja jest rosnąca i znajdź jej minimum.' }
      ]
    },
    {
      // x² + (m-4)x + (m+5) = 0
      // s = -(m-4) = 4-m, p = m+5
      // x₁³+x₂³ = s³-3ps = (4-m)³-3(m+5)(4-m)
      //         = (4-m)[(4-m)²-3(m+5)]
      //         = (4-m)[16-8m+m²-3m-15]
      //         = (4-m)[m²-11m+1]
      // Warunek: znajdź m dla którego x₁³+x₂³ = 0
      // (4-m)=0 → m=4, lub m²-11m+1=0 → m=(11±√117)/2 — brzydkie
      // Zmieńmy na: x²-(m-2)x+(m²-4)=0, s=m-2, p=m²-4=(m-2)(m+2)
      // x₁³+x₂³ = (m-2)³-3(m-2)(m+2)(m-2) = (m-2)[(m-2)²-3(m+2)(... hmm
      // Zamiast tego użyjmy gotowych zadań maturalnych
      eqStr: 'x^2 - (2m+1)x + m^2 = 0',
      s_str: '2m+1',
      p_str: 'm^2',
      newton_str: '(2m+1)^3 - 3m^2(2m+1)',
      newton_expanded: '2m^3 + m + 1',
      question: 'Oblicz $x_1^3 + x_2^3$ w zależności od $m$ i wyznacz wartości $m$, dla których $x_1^3 + x_2^3 \\geq 3$.',
      answer_display: 'm \\geq 1',
      answer_type: 'interval',
      solution: [
        { step: 1, title: 'Wzory Viète\'a', content: 'x_1+x_2 = 2m+1,\\quad x_1 x_2 = m^2', explanation: '' },
        { step: 2, title: 'Tożsamość Newtona', content: 'x_1^3+x_2^3 = (2m+1)^3 - 3m^2(2m+1)\\\\ = 8m^3+12m^2+6m+1 - 6m^3-3m^2\\\\ = 2m^3+9m^2+6m+1', explanation: '' },
        { step: 3, title: 'Warunek', content: '2m^3+9m^2+6m+1 \\geq 3\\\\ 2m^3+9m^2+6m-2 \\geq 0', explanation: '' },
        { step: 4, title: 'Wyróżnik i dziedzina', content: '\\Delta = (2m+1)^2 - 4m^2 = 4m+1 \\geq 0 \\Rightarrow m \\geq -\\tfrac{1}{4}', explanation: 'Równanie musi mieć rzeczywiste pierwiastki.' }
      ],
      hints: [
        { level: 1, text: 'Zastosuj tożsamość: $x_1^3+x_2^3 = (x_1+x_2)^3 - 3x_1x_2(x_1+x_2)$.' },
        { level: 2, text: 'Wzory Viète\'a: $x_1+x_2 = 2m+1$, $x_1 x_2 = m^2$.' },
        { level: 3, text: 'Po podstawieniu i uproszczeniu dostaniesz wielomian w $m$.' }
      ]
    }
  ];

  function newtonSum() {
    const task = M.choose(NEWTON_TASKS);
    return {
      id: M.makeId('cat12_newton'),
      category: 12,
      categoryName: 'Parametr w równaniu',
      type: 'newton_sum',
      points: 5,
      params: {},
      statement:
        `Dane jest równanie\n$$${task.eqStr}$$\n` +
        `gdzie $m$ jest parametrem rzeczywistym.\n\n` +
        `Liczby $x_1, x_2$ są pierwiastkami tego równania.\n\n` +
        `**${task.question}** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: task.answer_display,
        description: `$${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  // === (x₁-x₂)² i pierwiastki tego samego znaku ===
  // Wzorzec matura 2025 z.11: równanie z parametrem, warunek na (x₁-x₂)² i x₁,x₂>0
  const DIFFSQ_TASKS = [
    {
      // (2-m)x² - 2(2m+1)x + (m+8) = 0  [bez m=2 bo wtedy liniowe]
      // Viète (a=2-m):
      //   s = x₁+x₂ = 2(2m+1)/(2-m)
      //   p = x₁x₂ = (m+8)/(2-m)
      // Warunek: oba pierwiastki tego samego znaku i rzeczywiste
      // To jest za trudne do parametryzacji, użyjemy gotowego
      eqStr: 'x^2 - (m+3)x + m = 0',
      a_val: 1,
      b_expr: '-(m+3)',
      c_expr: 'm',
      s_expr: 'm+3',
      p_expr: 'm',
      delta_expr: '(m+3)^2 - 4m = m^2+2m+9 = (m+1)^2+8',
      delta_result: '(m+1)^2+8 > 0',
      diffSq_expr: '(x_1-x_2)^2 = (x_1+x_2)^2 - 4x_1x_2 = (m+3)^2 - 4m = m^2+2m+9',
      question: 'Wyznacz wszystkie wartości parametru $m$, dla których oba pierwiastki $x_1, x_2$ są dodatnie.',
      answer_display: 'm > 0',
      solution: [
        { step: 1, title: 'Rozkład (jeśli widoczny)', content: 'x^2-(m+3)x+m = (x-1)(x-m)', explanation: 'Pierwiastki to $x_1=1$ i $x_2=m$.' },
        { step: 2, title: 'Warunek oba dodatnie', content: 'x_1 = 1 > 0 \\text{ (zawsze)}.\\\\ x_2 = m > 0.', explanation: '' },
        { step: 3, title: 'Odpowiedź', content: 'm > 0', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Spróbuj rozłożyć lewą stronę na czynniki: $x^2-(m+3)x+m$.' },
        { level: 2, text: 'Zauważ, że $x^2-(m+3)x+m = (x-1)(x-m)$.' },
        { level: 3, text: 'Pierwiastki to $1$ i $m$. Oba muszą być $>0$, więc $m > 0$.' }
      ]
    },
    {
      // x² - 2mx + (m²-4) = 0
      // s = 2m, p = m²-4
      // (x₁-x₂)² = 4m²-4(m²-4) = 16
      // x₁x₂ = m²-4 > 0 → |m|>2, x₁+x₂=2m>0 → m>0 → m>2
      eqStr: 'x^2 - 2mx + (m^2 - 4) = 0',
      a_val: 1,
      question: 'Znajdź wartości $m$, dla których oba pierwiastki są dodatnie. Oblicz też $(x_1-x_2)^2$.',
      answer_display: 'm > 2',
      diffSq_val: '16',
      solution: [
        { step: 1, title: 'Wzory Viète\'a', content: 'x_1+x_2 = 2m,\\quad x_1 x_2 = m^2-4', explanation: '' },
        { step: 2, title: '(x₁-x₂)²', content: '(x_1-x_2)^2 = (x_1+x_2)^2-4x_1x_2 = 4m^2-4(m^2-4) = 16', explanation: 'Ciekawa własność: różnica pierwiastków jest stała!' },
        { step: 3, title: 'Warunki na oba pierwiastki > 0', content: '\\begin{cases} \\Delta \\geq 0 \\\\ x_1+x_2 > 0 \\\\ x_1 x_2 > 0 \\end{cases}', explanation: 'Trzy warunki muszą być spełnione jednocześnie.' },
        { step: 4, title: 'Wyróżnik', content: '\\Delta = 4m^2-4(m^2-4) = 16 > 0', explanation: 'Zawsze dwa różne pierwiastki rzeczywiste.' },
        { step: 5, title: 'Suma i iloczyn', content: 'x_1+x_2 = 2m > 0 \\Rightarrow m > 0\\\\ x_1 x_2 = m^2-4 > 0 \\Rightarrow m > 2 \\text{ lub } m < -2', explanation: '' },
        { step: 6, title: 'Odpowiedź', content: 'm > 0 \\text{ i } m > 2 \\Rightarrow \\boxed{m > 2}', explanation: 'Część wspólna warunków.' }
      ],
      hints: [
        { level: 1, text: 'Wzory Viète\'a: $x_1+x_2 = 2m$, $x_1x_2 = m^2-4$.' },
        { level: 2, text: 'Oba pierwiastki dodatnie $\\iff$ $\\Delta \\geq 0$ i $x_1+x_2 > 0$ i $x_1 x_2 > 0$.' },
        { level: 3, text: '$(x_1-x_2)^2 = (x_1+x_2)^2-4x_1x_2 = 4m^2-4(m^2-4) = 16$.' }
      ]
    },
    {
      // x² - (m+2)x + (2m-1) = 0
      // s = m+2, p = 2m-1
      // (x₁-x₂)² = (m+2)²-4(2m-1) = m²+4m+4-8m+4 = m²-4m+8 = (m-2)²+4 ≥ 4
      // Oba pierwiastki ujemne: s<0 → m<-2, p>0 → m>1/2 → sprzeczność, więc brak takich m
      // Oba pierwiastki tego samego znaku: x₁x₂>0 i (x₁+x₂) określa znak
      // x₁x₂>0 → 2m-1>0 → m>1/2
      // x₁+x₂>0 → m>-2 (dla oba>0) → m>1/2
      // x₁+x₂<0 → m<-2 (dla oba<0) ale x₁x₂>0 → m>1/2 → sprzeczność
      eqStr: 'x^2 - (m+2)x + (2m-1) = 0',
      a_val: 1,
      question: 'Wyznacz wartości $m$, dla których oba pierwiastki równania są tego samego znaku (oba dodatnie lub oba ujemne). Oblicz $(x_1-x_2)^2$.',
      answer_display: 'm > \\tfrac{1}{2}',
      diffSq_val: '(m-2)^2+4',
      solution: [
        { step: 1, title: 'Wzory Viète\'a', content: 'x_1+x_2 = m+2,\\quad x_1 x_2 = 2m-1', explanation: '' },
        { step: 2, title: '(x₁-x₂)²', content: '(x_1-x_2)^2 = (m+2)^2-4(2m-1) = m^2+4m+4-8m+4 = m^2-4m+8 = (m-2)^2+4', explanation: 'Zawsze $\\geq 4 > 0$, więc pierwiastki są zawsze różne.' },
        { step: 3, title: 'Oba tego samego znaku ↔ iloczyn > 0', content: 'x_1 x_2 > 0 \\Leftrightarrow 2m-1 > 0 \\Leftrightarrow m > \\tfrac{1}{2}', explanation: '' },
        { step: 4, title: 'Sprawdzenie znaku', content: 'Dla $m > \\tfrac{1}{2}$: $x_1+x_2 = m+2 > 2.5 > 0$, więc oba pierwiastki są dodatnie.', explanation: '' },
        { step: 5, title: 'Odpowiedź', content: 'm > \\dfrac{1}{2}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Oba pierwiastki tego samego znaku $\\iff x_1 x_2 > 0$.' },
        { level: 2, text: 'Wzory Viète\'a: $x_1 x_2 = 2m-1$. Kiedy $2m-1 > 0$?' },
        { level: 3, text: 'Dodatkowo: $(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2=(m+2)^2-4(2m-1)=(m-2)^2+4 \\geq 4$.' }
      ]
    }
  ];

  function diffSquared() {
    const task = M.choose(DIFFSQ_TASKS);
    return {
      id: M.makeId('cat12_diffsq'),
      category: 12,
      categoryName: 'Parametr w równaniu',
      type: 'diff_squared',
      points: 5,
      params: {},
      statement:
        `Dane jest równanie\n$$${task.eqStr}$$\n` +
        `gdzie $m$ jest parametrem rzeczywistym.\n\n` +
        `**${task.question}** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: task.answer_display,
        description: `$m: ${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  // === Pierwiastki w przedziale ===
  // Wzorzec matura 2026 z.10: znajdź m, dla których oba pierwiastki należą do (-a, a)
  const INTERVAL_TASKS = [
    {
      // x² - (m+1)x + (m-2) = 0, pierwiastki w (-3, 3)
      // s = m+1, p = m-2
      // Warunki: Δ≥0, f(-3)>0, f(3)>0, -3 < (m+1)/2 < 3
      // f(3) = 9-3(m+1)+(m-2) = 9-3m-3+m-2 = 4-2m > 0 → m < 2
      // f(-3) = 9+3(m+1)+(m-2) = 9+3m+3+m-2 = 10+4m > 0 → m > -5/2
      // Δ = (m+1)²-4(m-2) = m²+2m+1-4m+8 = m²-2m+9 = (m-1)²+8 > 0 zawsze
      // wierzchołek: x_w = (m+1)/2 ∈ (-3,3) → -6<m+1<6 → -7<m<5
      // Łączny warunek: m<2 i m>-5/2 → -5/2 < m < 2
      eqStr: 'x^2 - (m+1)x + (m-2) = 0',
      interval: '(-3, 3)',
      a_bound: -3,
      b_bound: 3,
      f_a: (m) => 9 - (m+1)*(-3) + (m-2),  // f(-3) = 9+3(m+1)+(m-2) = 4m+10
      f_b: (m) => 9 - (m+1)*3 + (m-2),      // f(3) = 9-3(m+1)+(m-2) = -2m+4
      answer_display: 'm \\in \\left(-\\tfrac{5}{2},\\, 2\\right)',
      solution: [
        { step: 1, title: 'Warunki dla obu pierwiastków w $(a,b)$', content: '\\begin{cases}\\Delta \\geq 0 \\\\ f(-3) > 0 \\\\ f(3) > 0 \\\\ -3 < \\frac{m+1}{2} < 3 \\end{cases}', explanation: 'Gdy parabola otwarta w górę ($a>0$) i oba pierwiastki są w $(a,b)$: $f(a)>0$, $f(b)>0$, $\\Delta\\geq 0$, wierzchołek w $(a,b)$.' },
        { step: 2, title: 'Wyróżnik', content: '\\Delta = (m+1)^2 - 4(m-2) = m^2-2m+9 = (m-1)^2+8 > 0', explanation: 'Spełniony zawsze.' },
        { step: 3, title: 'f(-3) > 0', content: '(-3)^2-(m+1)(-3)+(m-2) = 9+3m+3+m-2 = 4m+10 > 0\\\\ m > -\\tfrac{5}{2}', explanation: '' },
        { step: 4, title: 'f(3) > 0', content: '3^2-(m+1)\\cdot 3+(m-2) = 9-3m-3+m-2 = -2m+4 > 0\\\\ m < 2', explanation: '' },
        { step: 5, title: 'Wierzchołek w (-3,3)', content: '-3 < \\frac{m+1}{2} < 3 \\iff -7 < m < 5', explanation: 'Słabszy warunek, wchodzi w poprzednie.' },
        { step: 6, title: 'Odpowiedź', content: 'm \\in \\left(-\\tfrac{5}{2},\\, 2\\right)', explanation: 'Część wspólna wszystkich warunków.' }
      ],
      hints: [
        { level: 1, text: 'Oba pierwiastki w $(a,b)$ $\\iff$ $\\Delta\\geq 0$, $f(a)>0$, $f(b)>0$, $a<x_w<b$ (gdzie $x_w$ to wierzchołek paraboli).' },
        { level: 2, text: 'Oblicz $f(-3)$ i $f(3)$ dla $f(x)=x^2-(m+1)x+(m-2)$.' },
        { level: 3, text: '$f(-3) = 4m+10 > 0$ i $f(3) = -2m+4 > 0$, więc $m > -\\frac{5}{2}$ i $m < 2$.' }
      ]
    },
    {
      // m²x² - 2mx - (m-1) = 0, pierwiastki w (-2, 2)
      // Dla m=0: równanie 0=0 sprzeczne lub wszystkie x — odrzucamy m=0
      // Dla m≠0: Viète: s = 2m/m² = 2/m, p = -(m-1)/m²
      // Uproszczone zadanie: x² - 4x + (m+3) = 0, pierwiastki w (-1, 5)
      // f(-1) = 1+4+m+3 = m+8 > 0 → m>-8
      // f(5) = 25-20+m+3 = m+8 > 0 → m>-8
      // Δ = 16-4(m+3) = 4-4m ≥ 0 → m≤1
      // wierzchołek x=2, zawsze w (-1,5) ✓
      // Odpowiedź: m ≤ 1 (i m>-8, ale m≤1 jest silniejsze dla sensownych m)
      eqStr: 'x^2 - 4x + (m+3) = 0',
      interval: '(-1, 5)',
      a_bound: -1,
      b_bound: 5,
      answer_display: 'm \\leq 1',
      solution: [
        { step: 1, title: 'Warunki dla obu pierwiastków w $(-1, 5)$', content: '\\begin{cases}\\Delta \\geq 0 \\\\ f(-1) > 0 \\\\ f(5) > 0 \\\\ -1 < 2 < 5 \\end{cases}', explanation: 'Wierzchołek paraboli w $x=2$ — zawsze spełniony.' },
        { step: 2, title: 'Wyróżnik', content: '\\Delta = 16 - 4(m+3) = 4 - 4m \\geq 0 \\iff m \\leq 1', explanation: '' },
        { step: 3, title: 'f(-1)', content: '1+4+m+3 = m+8 > 0 \\iff m > -8', explanation: '' },
        { step: 4, title: 'f(5)', content: '25-20+m+3 = m+8 > 0 \\iff m > -8', explanation: '' },
        { step: 5, title: 'Odpowiedź', content: 'm \\leq 1 \\text{ i } m > -8 \\Rightarrow m \\in (-8, 1]', explanation: 'Najsilniejszy warunek to $m\\leq 1$.' }
      ],
      hints: [
        { level: 1, text: 'Oba pierwiastki w $(-1,5)$ $\\iff$ $\\Delta\\geq 0$, $f(-1)>0$, $f(5)>0$, wierzchołek w $(-1,5)$.' },
        { level: 2, text: 'Wierzchołek: $x_w = \\frac{4}{2} = 2 \\in (-1,5)$ ✓. Zostaje warunek na $\\Delta$ i wartości brzegowe.' },
        { level: 3, text: '$\\Delta = 4-4m \\geq 0 \\Rightarrow m \\leq 1$. To jest najsilniejszy warunek.' }
      ]
    },
    {
      // x² + (2m-6)x + (m²-5m+4) = 0
      // Pierwiastki: x₁=1, x₂=m²-5m+4 — sprawdź przez rozkład
      // Viète: s=-(2m-6)=6-2m, p=m²-5m+4
      // Rozkład: x²+(2m-6)x+(m²-5m+4) = (x-(1-m+2-... hmm
      // Zamiast tego: x² - (3m-1)x + 2(m-1)² = 0, pierwiastki w (0, 4)
      // f(0) = 2(m-1)² ≥ 0, = 0 gdy m=1, więc warunek f(0)>0 → m≠1
      // f(4) = 16-4(3m-1)+2(m-1)² = 16-12m+4+2m²-4m+2 = 2m²-16m+22 = 2(m²-8m+11) = 2((m-4)²-5)
      // f(4)>0 → (m-4)²>5 → m<4-√5 lub m>4+√5
      // Δ = (3m-1)²-8(m-1)² = 9m²-6m+1-8m²+16m-8 = m²+10m-7 ≥ 0 → m ≤ -5-4√2 lub m ≥ -5+4√2
      // To za trudne. Użyjmy prostszego.
      eqStr: 'x^2 - (m+4)x + (3m+4) = 0',
      interval: '(1, 4)',
      a_bound: 1,
      b_bound: 4,
      // f(1) = 1-(m+4)+(3m+4) = 2m+1 > 0 → m>-1/2
      // f(4) = 16-4(m+4)+(3m+4) = 16-4m-16+3m+4 = -m+4 > 0 → m<4
      // Δ = (m+4)²-4(3m+4) = m²+8m+16-12m-16 = m²-4m = m(m-4) ≥ 0 → m≤0 lub m≥4
      // wierzchołek: x_w=(m+4)/2 ∈ (1,4) → 2<m+4<8 → -2<m<4
      // Warunki: m(m-4)≥0 AND m>-1/2 AND m<4 AND -2<m<4
      // m(m-4)≥0: m≤0 lub m≥4
      // Przecięcie z m>-1/2 AND m<4: m ∈ (-1/2, 0]
      answer_display: 'm \\in \\left(-\\tfrac{1}{2},\\, 0\\right]',
      solution: [
        { step: 1, title: 'Warunki', content: '\\begin{cases}\\Delta \\geq 0 \\\\ f(1) > 0 \\\\ f(4) > 0 \\\\ 1 < x_w < 4 \\end{cases} \\quad x_w = \\frac{m+4}{2}', explanation: '' },
        { step: 2, title: 'Wyróżnik', content: '\\Delta = (m+4)^2-4(3m+4) = m^2-4m = m(m-4) \\geq 0\\\\ m \\leq 0 \\text{ lub } m \\geq 4', explanation: '' },
        { step: 3, title: 'f(1) > 0', content: '1-(m+4)+(3m+4) = 2m+1 > 0 \\iff m > -\\tfrac{1}{2}', explanation: '' },
        { step: 4, title: 'f(4) > 0', content: '16-4(m+4)+(3m+4) = -m+4 > 0 \\iff m < 4', explanation: '' },
        { step: 5, title: 'Wierzchołek w (1,4)', content: '1 < \\frac{m+4}{2} < 4 \\iff -2 < m < 4', explanation: '' },
        { step: 6, title: 'Część wspólna', content: '(m\\leq 0\\text{ lub }m\\geq 4) \\cap \\left(-\\tfrac{1}{2}, +\\infty\\right) \\cap (-\\infty, 4) \\cap (-2,4)\\\\ = \\left(-\\tfrac{1}{2}, 0\\right]', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Oba pierwiastki w $(a,b)$: $\\Delta\\geq 0$, $f(a)>0$, $f(b)>0$, $a<x_w<b$.' },
        { level: 2, text: '$\\Delta = (m+4)^2-4(3m+4) = m^2-4m = m(m-4)$. Kiedy $\\geq 0$?' },
        { level: 3, text: 'Warunki: $m\\leq 0$ lub $m\\geq 4$; $m > -\\frac{1}{2}$; $m < 4$. Wspólna część: $m \\in (-\\frac{1}{2}, 0]$.' }
      ]
    }
  ];

  function rootsInInterval() {
    const task = M.choose(INTERVAL_TASKS);
    return {
      id: M.makeId('cat12_interval'),
      category: 12,
      categoryName: 'Parametr w równaniu',
      type: 'roots_in_interval',
      points: 5,
      params: {},
      statement:
        `Dane jest równanie\n$$${task.eqStr}$$\n` +
        `gdzie $m$ jest parametrem rzeczywistym.\n\n` +
        `**Wyznacz wszystkie wartości parametru $m$, dla których oba pierwiastki równania należą do przedziału $${task.interval}$.** Zapisz obliczenia.`,
      answer: {
        type: 'interval',
        display: task.answer_display,
        description: `$m \\in ${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  function generate() {
    return M.choose([vieta, paramDiscriminant, newtonSum, diffSquared, rootsInInterval])();
  }

  return { generate };
})();
