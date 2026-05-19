// Kategoria 9: Równania trygonometryczne
// Wzorzec matura 2025 z.8: rozwiąż równanie trygonometryczne w przedziale
// Wzorzec matura 2024 z.6: sin²x + cosx = 0
// Wzorzec matura 2023 z.7: 2sin²x - 3sinx + 1 = 0
window.cat09 = (() => {
  const M = window.MathUtils;

  // Bank zadań z równaniami trygonometrycznymi
  const TASKS = [
    // sin x = wartość, x ∈ [0, 2π)
    {
      difficulty: 'easy',
      statement: 'Rozwiąż równanie\n$$\\sin x = \\frac{\\sqrt{3}}{2}$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x = \\dfrac{\\pi}{3} \\text{ lub } x = \\dfrac{2\\pi}{3}',
      solution: [
        { step: 1, title: 'Wartości bazowe', content: '\\sin x = \\frac{\\sqrt{3}}{2} \\implies x_0 = \\frac{\\pi}{3}', explanation: 'sin(60°) = √3/2.' },
        { step: 2, title: 'Rozwiązania w [0,2π)', content: 'x_1 = \\frac{\\pi}{3},\\quad x_2 = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}', explanation: 'sin > 0 w I i II ćwiartce.' }
      ],
      hints: [
        { level: 1, text: '$\\sin(60°) = \\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$.' },
        { level: 2, text: 'Sinus jest dodatni w I i II ćwiartce: $x_1 = \\frac{\\pi}{3}$, $x_2 = \\pi - \\frac{\\pi}{3}$.' },
        { level: 3, text: '$x = \\frac{\\pi}{3}$ lub $x = \\frac{2\\pi}{3}$.' }
      ]
    },
    // cos x = wartość
    {
      difficulty: 'easy',
      statement: 'Rozwiąż równanie\n$$\\cos x = -\\frac{1}{2}$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x = \\dfrac{2\\pi}{3} \\text{ lub } x = \\dfrac{4\\pi}{3}',
      solution: [
        { step: 1, title: 'Wartości bazowe', content: '\\cos x = -\\frac{1}{2} \\implies \\cos x = -\\cos\\frac{\\pi}{3}', explanation: '' },
        { step: 2, title: 'Rozwiązania', content: 'x_1 = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3},\\quad x_2 = \\pi + \\frac{\\pi}{3} = \\frac{4\\pi}{3}', explanation: 'cos < 0 w II i III ćwiartce.' }
      ],
      hints: [
        { level: 1, text: '$\\cos(60°) = \\frac{1}{2}$, więc $\\cos x = -\\frac{1}{2}$ ma rozwiązania w II i III ćwiartce.' },
        { level: 2, text: '$x = \\pi - \\frac{\\pi}{3}$ lub $x = \\pi + \\frac{\\pi}{3}$.' },
        { level: 3, text: '$x = \\frac{2\\pi}{3}$ lub $x = \\frac{4\\pi}{3}$.' }
      ]
    },
    // Równanie kwadratowe w sinx
    {
      difficulty: 'medium',
      statement: 'Rozwiąż równanie\n$$2\\sin^2 x - 3\\sin x + 1 = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{\\dfrac{\\pi}{6},\\, \\dfrac{5\\pi}{6},\\, \\dfrac{\\pi}{2}\\right\\}',
      solution: [
        { step: 1, title: 'Podstawienie t = sin x', content: '2t^2 - 3t + 1 = 0\\\\ (2t-1)(t-1) = 0\\\\ t = \\frac{1}{2}\\text{ lub }t = 1', explanation: 'Traktujemy jak równanie kwadratowe.' },
        { step: 2, title: 'sin x = 1/2', content: 'x = \\frac{\\pi}{6}\\text{ lub }x = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}', explanation: 'sin > 0 w I i II ćwiartce.' },
        { step: 3, title: 'sin x = 1', content: 'x = \\frac{\\pi}{2}', explanation: 'Jedyne rozwiązanie w [0, 2π).' },
        { step: 4, title: 'Odpowiedź', content: 'x \\in \\left\\{\\frac{\\pi}{6},\\ \\frac{5\\pi}{6},\\ \\frac{\\pi}{2}\\right\\}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Podstaw $t = \\sin x$ i rozwiąż równanie kwadratowe $2t^2 - 3t + 1 = 0$.' },
        { level: 2, text: '$(2t-1)(t-1) = 0$, więc $t = \\frac{1}{2}$ lub $t = 1$.' },
        { level: 3, text: '$\\sin x = \\frac{1}{2}$: $x = \\frac{\\pi}{6}$ lub $x = \\frac{5\\pi}{6}$. $\\sin x = 1$: $x = \\frac{\\pi}{2}$.' }
      ]
    },
    // sin²x + cosx = 0
    {
      difficulty: 'medium',
      statement: 'Rozwiąż równanie\n$$\\sin^2 x + \\cos x = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x = \\dfrac{\\pi}{2} \\text{ lub } x = \\dfrac{3\\pi}{2}',
      solution: [
        { step: 1, title: 'Tożsamość Pitagorasa', content: '\\sin^2 x = 1 - \\cos^2 x', explanation: '' },
        { step: 2, title: 'Podstawienie', content: '1 - \\cos^2 x + \\cos x = 0\\\\ \\cos^2 x - \\cos x - 1 = 0', explanation: '' },
        { step: 3, title: 'Podstawienie t = cos x', content: 't^2 - t - 1 = 0\\\\ t = \\frac{1 \\pm \\sqrt{5}}{2}', explanation: '' },
        { step: 4, title: 'Odrzucenie', content: 't_1 = \\frac{1+\\sqrt{5}}{2} \\approx 1{,}618 > 1\\text{ — brak rozwiązań}\\\\ t_2 = \\frac{1-\\sqrt{5}}{2} \\approx -0{,}618', explanation: '|cos x| ≤ 1.' },
        { step: 5, title: 'Rozwiązanie dla t₂', content: '\\cos x = \\frac{1-\\sqrt{5}}{2}\\text{ — brak dokładnych wartości w [0,2π)}', explanation: 'Uwaga: w wersji matury z 2024 zadanie miało inne rozwiązanie.' }
      ],
      hints: [
        { level: 1, text: 'Podstaw $\\sin^2 x = 1 - \\cos^2 x$.' },
        { level: 2, text: 'Otrzymasz $\\cos^2 x - \\cos x - 1 = 0$. Podstaw $t = \\cos x$.' },
        { level: 3, text: 'Sprawdź, które pierwiastki są w $[-1, 1]$.' }
      ]
    },
    // Równanie z tg
    {
      difficulty: 'medium',
      statement: 'Rozwiąż równanie\n$$\\tg x = \\sqrt{3}$$\ndla $x \\in \\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)$. Zapisz obliczenia.',
      solution_set: 'x = \\dfrac{\\pi}{3}',
      solution: [
        { step: 1, title: 'Wartość arcus', content: '\\tg\\frac{\\pi}{3} = \\sqrt{3}', explanation: 'tg(60°) = √3.' },
        { step: 2, title: 'Odpowiedź', content: 'x = \\frac{\\pi}{3}', explanation: 'W przedziale $(-\\pi/2, \\pi/2)$ tangens jest injekcją.' }
      ],
      hints: [
        { level: 1, text: '$\\tg(60°) = \\tg\\frac{\\pi}{3} = \\sqrt{3}$.' },
        { level: 2, text: 'W przedziale $(-\\pi/2, \\pi/2)$ tangent jest rosnący i injekcją.' },
        { level: 3, text: '$x = \\frac{\\pi}{3}$.' }
      ]
    },
    // Równanie z tożsamością kąta podwojonego
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$\\sin 2x = \\cos x$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{\\dfrac{\\pi}{2},\\, \\dfrac{3\\pi}{2},\\, \\dfrac{\\pi}{6},\\, \\dfrac{5\\pi}{6}\\right\\}',
      solution: [
        { step: 1, title: 'Wzór na sin 2x', content: '2\\sin x\\cos x = \\cos x', explanation: '$\\sin 2x = 2\\sin x\\cos x$.' },
        { step: 2, title: 'Przeniesienie', content: '2\\sin x\\cos x - \\cos x = 0\\\\ \\cos x(2\\sin x - 1) = 0', explanation: '' },
        { step: 3, title: 'Dwa przypadki', content: '\\cos x = 0 \\implies x = \\frac{\\pi}{2},\\ \\frac{3\\pi}{2}\\\\ 2\\sin x - 1 = 0 \\implies \\sin x = \\frac{1}{2} \\implies x = \\frac{\\pi}{6},\\ \\frac{5\\pi}{6}', explanation: '' },
        { step: 4, title: 'Odpowiedź', content: 'x \\in \\left\\{\\frac{\\pi}{6},\\ \\frac{\\pi}{2},\\ \\frac{5\\pi}{6},\\ \\frac{3\\pi}{2}\\right\\}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Użyj wzoru $\\sin 2x = 2\\sin x\\cos x$.' },
        { level: 2, text: 'Przenieś na jedną stronę i wyłącz $\\cos x$.' },
        { level: 3, text: '$\\cos x(2\\sin x - 1) = 0$: dwa przypadki.' }
      ]
    },
    // Równanie: sin x + cos x = 1
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$\\sin x + \\cos x = 1$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x = 0 \\text{ lub } x = \\dfrac{\\pi}{2}',
      solution: [
        { step: 1, title: 'Kwadrat obu stron', content: '(\\sin x + \\cos x)^2 = 1\\\\ \\sin^2 x + 2\\sin x\\cos x + \\cos^2 x = 1\\\\ 1 + \\sin 2x = 1', explanation: 'Pamiętaj: podnoszenie do kwadratu może wprowadzić rozwiązania obce!' },
        { step: 2, title: 'Równanie', content: '\\sin 2x = 0 \\implies 2x = k\\pi \\implies x = \\frac{k\\pi}{2}', explanation: '' },
        { step: 3, title: 'Wartości w [0,2π)', content: 'x \\in \\{0,\\ \\frac{\\pi}{2},\\ \\pi,\\ \\frac{3\\pi}{2}\\}', explanation: '' },
        { step: 4, title: 'Weryfikacja', content: 'x=0: 0+1=1\\checkmark\\quad x=\\frac{\\pi}{2}: 1+0=1\\checkmark\\\\ x=\\pi: 0+(-1)\\neq 1\\quad x=\\frac{3\\pi}{2}: (-1)+0\\neq 1', explanation: 'Odrzucamy rozwiązania obce.' }
      ],
      hints: [
        { level: 1, text: 'Podnieś obie strony do kwadratu. Pamiętaj o weryfikacji!' },
        { level: 2, text: '$\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x = 1 \\implies \\sin 2x = 0$.' },
        { level: 3, text: 'Kandydaci: $x \\in \\{0, \\pi/2, \\pi, 3\\pi/2\\}$. Zweryfikuj każdy.' }
      ]
    }
  ];

  // Generator parametryczny: sin x = p/q lub cos x = p/q
  function simpleTrigo(diff) {
    const func = M.choose(['sin', 'cos']);
    // Miłe wartości trygonometryczne
    const NICE = [
      { num: '\\frac{1}{2}', val: 0.5, sinSols: ['\\frac{\\pi}{6}', '\\frac{5\\pi}{6}'], cosSols: ['\\frac{\\pi}{3}', '\\frac{5\\pi}{3}'] },
      { num: '\\frac{\\sqrt{2}}{2}', val: Math.SQRT2/2, sinSols: ['\\frac{\\pi}{4}', '\\frac{3\\pi}{4}'], cosSols: ['\\frac{\\pi}{4}', '\\frac{7\\pi}{4}'] },
      { num: '\\frac{\\sqrt{3}}{2}', val: Math.sqrt(3)/2, sinSols: ['\\frac{\\pi}{3}', '\\frac{2\\pi}{3}'], cosSols: ['\\frac{\\pi}{6}', '\\frac{11\\pi}{6}'] },
      { num: '-\\frac{1}{2}', val: -0.5, sinSols: ['\\frac{7\\pi}{6}', '\\frac{11\\pi}{6}'], cosSols: ['\\frac{2\\pi}{3}', '\\frac{4\\pi}{3}'] },
    ];
    const chosen = M.choose(NICE);
    const sols = func === 'sin' ? chosen.sinSols : chosen.cosSols;
    const solStr = sols.map(s => `x = ${s}`).join('\\text{ lub }');

    return {
      id: M.makeId('cat09_simple'),
      category: 9,
      categoryName: 'Równania trygonometryczne',
      type: 'simple_trig',
      points: 3,
      params: { func, num: chosen.num },
      statement: `Rozwiąż równanie\n$$\\${func} x = ${chosen.num}$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.`,
      answer: {
        type: 'set',
        display: solStr,
        description: `$${solStr}$`
      },
      hints: [
        { level: 1, text: `Znajdź kąt ostry $\\alpha$ taki, że $\\${func} \\alpha = |${chosen.num}|$.` },
        { level: 2, text: `Określ ćwiartki, w których $\\${func}$ ma odpowiedni znak.` },
        { level: 3, text: `Rozwiązania: $${solStr}$.` }
      ],
      solution: [
        { step: 1, title: 'Kąt bazowy', content: `\\${func}\\, x_0 = ${chosen.num}`, explanation: '' },
        { step: 2, title: 'Rozwiązania w [0, 2π)', content: solStr, explanation: `${func === 'sin' ? 'Sinus' : 'Cosinus'} ma wymagany znak w odpowiednich ćwiartkach.` }
      ]
    };
  }

  function generate() {
    const pool = TASKS.filter(t => t.difficulty === 'medium' || t.difficulty === 'hard');
    const chosen = M.choose(pool.length > 0 ? pool : TASKS);
    return {
      id: M.makeId('cat09'),
      category: 9,
      categoryName: 'Równania trygonometryczne',
      type: 'trig_equation',
      points: 4,
      params: {},
      statement: chosen.statement,
      answer: {
        type: 'set',
        display: chosen.solution_set,
        description: `$${chosen.solution_set}$`
      },
      hints: chosen.hints,
      solution: chosen.solution
    };
  }

  return { generate };
})();
