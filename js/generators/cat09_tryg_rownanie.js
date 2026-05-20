// Kategoria 9: Równania trygonometryczne
// Wzorzec matura 2025 z.8: 3cos²x+√3sin2x-3sin²x=0 → tan2x=-√3
// Wzorzec matura 2024 z.6: sin4x-sin2x=4cos²x-3
// Wzorzec matura 2023 z.7: 2sin²x - 3sinx + 1 = 0
// Wzorzec matura 2022 z.8: sin x + cos x = 1
// Wzorzec matura 2018 z.8: sin6x+cos3x=2sin3x+1
// Wzorzec matura 2017 z.8: cos2x+3cosx=-2
// Wzorzec matura 2026 z.8: sin6x-2sin2x=0
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
    // Równanie z tożsamością kąta podwojonego: sin2x = cosx
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
    // sin x + cos x = 1
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$\\sin x + \\cos x = 1$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x = 0 \\text{ lub } x = \\dfrac{\\pi}{2}',
      solution: [
        { step: 1, title: 'Kwadrat obu stron', content: '(\\sin x + \\cos x)^2 = 1\\\\ 1 + \\sin 2x = 1\\\\ \\sin 2x = 0', explanation: 'Pamiętaj: podnoszenie do kwadratu może wprowadzić rozwiązania obce!' },
        { step: 2, title: 'Rozwiązanie', content: '2x = k\\pi,\\quad x = \\frac{k\\pi}{2}\\\\ x \\in \\{0,\\ \\frac{\\pi}{2},\\ \\pi,\\ \\frac{3\\pi}{2}\\}', explanation: '' },
        { step: 3, title: 'Weryfikacja', content: 'x=0: 0+1=1\\checkmark\\quad x=\\frac{\\pi}{2}: 1+0=1\\checkmark\\\\ x=\\pi: 0+(-1)\\neq 1\\quad x=\\frac{3\\pi}{2}: (-1)+0\\neq 1', explanation: 'Odrzucamy rozwiązania obce.' }
      ],
      hints: [
        { level: 1, text: 'Podnieś obie strony do kwadratu. Pamiętaj o weryfikacji!' },
        { level: 2, text: '$\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x = 1 \\implies \\sin 2x = 0$.' },
        { level: 3, text: 'Kandydaci: $x \\in \\{0, \\pi/2, \\pi, 3\\pi/2\\}$. Zweryfikuj każdy.' }
      ]
    },
    // === NOWE ZADANIA Z MATUR 2017–2026 ===
    // cos2x + 3cosx = -2  [2017 z.8]
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$\\cos 2x + 3\\cos x = -2$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x = \\pi',
      solution: [
        { step: 1, title: 'Wzór na cos 2x', content: '\\cos 2x = 2\\cos^2 x - 1', explanation: '$\\cos 2x = 2\\cos^2 x - 1$.' },
        { step: 2, title: 'Podstawienie', content: '2\\cos^2 x - 1 + 3\\cos x = -2\\\\ 2\\cos^2 x + 3\\cos x + 1 = 0', explanation: '' },
        { step: 3, title: 'Równanie kwadratowe (t = cosx)', content: '2t^2 + 3t + 1 = 0\\\\ (2t+1)(t+1) = 0\\\\ t = -\\frac{1}{2}\\text{ lub }t = -1', explanation: '' },
        { step: 4, title: 'cos x = -1/2', content: 'x = \\frac{2\\pi}{3}\\text{ lub }x = \\frac{4\\pi}{3}', explanation: 'cos < 0 w II i III ćwiartce.' },
        { step: 5, title: 'cos x = -1', content: 'x = \\pi', explanation: 'Jedyne rozwiązanie.' },
        { step: 6, title: 'Odpowiedź', content: 'x \\in \\left\\{\\frac{2\\pi}{3},\\ \\pi,\\ \\frac{4\\pi}{3}\\right\\}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Podstaw $\\cos 2x = 2\\cos^2 x - 1$.' },
        { level: 2, text: 'Dostaniesz równanie kwadratowe $2t^2+3t+1=0$ gdzie $t=\\cos x$.' },
        { level: 3, text: '$(2t+1)(t+1)=0$: $t = -\\frac{1}{2}$ lub $t=-1$.' }
      ]
    },
    // 3cos²x + √3·sin2x - 3sin²x = 0  [2025 z.8]
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$3\\cos^2 x + \\sqrt{3}\\sin 2x - 3\\sin^2 x = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{\\dfrac{\\pi}{12},\\, \\dfrac{7\\pi}{12},\\, \\dfrac{13\\pi}{12},\\, \\dfrac{19\\pi}{12}\\right\\}',
      solution: [
        { step: 1, title: 'Przekształcenie', content: '3(\\cos^2 x - \\sin^2 x) + \\sqrt{3}\\sin 2x = 0\\\\ 3\\cos 2x + \\sqrt{3}\\sin 2x = 0', explanation: '$\\cos^2 x-\\sin^2 x=\\cos 2x$, $\\sin 2x = 2\\sin x\\cos x$.' },
        { step: 2, title: 'Dzielenie przez cos2x (≠0)', content: '3 + \\sqrt{3}\\,\\tg 2x = 0\\\\ \\tg 2x = -\\sqrt{3}', explanation: 'Dzielimy przez $\\cos 2x \\neq 0$ (sprawdzimy czy $\\cos 2x = 0$ daje rozwiązania).' },
        { step: 3, title: 'Sprawdzenie cos2x=0', content: '\\text{Dla }\\cos 2x = 0:\\quad 3\\cdot 0 + \\sqrt{3}\\sin 2x = 0 \\implies \\sin 2x = 0.\\\\ \\text{Ale }\\cos 2x = 0\\text{ i }\\sin 2x = 0\\text{ jednocześnie — niemożliwe.}', explanation: '' },
        { step: 4, title: 'tg2x = -√3', content: '2x = -\\frac{\\pi}{3} + k\\pi\\\\ x = -\\frac{\\pi}{6} + \\frac{k\\pi}{2}', explanation: '$\\tg\\frac{\\pi}{3}=\\sqrt{3}$, więc $\\tg 2x=-\\sqrt{3}$ ma kąt bazowy $\\frac{\\pi}{3}$ w II ćwiartce: $2x=\\pi-\\frac{\\pi}{3}+k\\pi=\\frac{2\\pi}{3}+k\\pi$.' },
        { step: 5, title: 'Wartości w [0,2π)', content: '2x = \\frac{2\\pi}{3}+k\\pi:\\\\ k=0: x=\\frac{\\pi}{3}\\quad k=1: x=\\frac{\\pi}{3}+\\frac{\\pi}{2}=\\frac{5\\pi}{6}\\\\ k=2: x=\\frac{\\pi}{3}+\\pi=\\frac{4\\pi}{3}\\quad k=3: x=\\frac{\\pi}{3}+\\frac{3\\pi}{2}=\\frac{11\\pi}{6}', explanation: '' },
        { step: 6, title: 'Odpowiedź', content: 'x \\in \\left\\{\\frac{\\pi}{3},\\ \\frac{5\\pi}{6},\\ \\frac{4\\pi}{3},\\ \\frac{11\\pi}{6}\\right\\}', explanation: 'Uwaga: w arkuszu maturalnym 2025 podawano x∈[0,π), ale tu rozwiązujemy dla [0,2π).' }
      ],
      hints: [
        { level: 1, text: 'Użyj: $\\cos^2 x-\\sin^2 x = \\cos 2x$. Równanie staje się: $3\\cos 2x + \\sqrt{3}\\sin 2x = 0$.' },
        { level: 2, text: 'Podziel przez $\\cos 2x$: $3 + \\sqrt{3}\\,\\tg 2x = 0$, czyli $\\tg 2x = -\\sqrt{3}$.' },
        { level: 3, text: '$\\tg 2x = -\\sqrt{3}$: kąt bazowy $\\frac{\\pi}{3}$, $2x = \\frac{2\\pi}{3}+k\\pi$, $x = \\frac{\\pi}{3}+\\frac{k\\pi}{2}$.' }
      ]
    },
    // sin6x - 2sin2x = 0  [2026 z.8]
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$\\sin 6x - 2\\sin 2x = 0$$\ndla $x \\in [0, \\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{0,\\, \\dfrac{\\pi}{4},\\, \\dfrac{\\pi}{2},\\, \\dfrac{3\\pi}{4}\\right\\}',
      solution: [
        { step: 1, title: 'Wzór różnicowy sinusów', content: '\\sin 6x - \\sin 2x = 2\\cos 4x \\sin 2x', explanation: '$\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$. Tu $A=6x,B=2x$: $2\\cos 4x\\sin 2x$.' },
        { step: 2, title: 'Przekształcenie', content: '2\\cos 4x\\sin 2x - \\sin 2x = 0\\\\ \\sin 2x(2\\cos 4x - 1) = 0', explanation: '' },
        { step: 3, title: 'sin2x = 0', content: '2x = k\\pi \\implies x = \\frac{k\\pi}{2}\\\\ x \\in \\{0,\\ \\frac{\\pi}{2}\\} \\text{ dla }x\\in[0,\\pi)', explanation: '' },
        { step: 4, title: 'cos4x = 1/2', content: '4x = \\pm\\frac{\\pi}{3} + 2k\\pi\\\\ x = \\frac{\\pi}{12}+\\frac{k\\pi}{2}\\text{ lub }x = -\\frac{\\pi}{12}+\\frac{k\\pi}{2}', explanation: '' },
        { step: 5, title: 'Wartości w [0,π)', content: 'x = \\frac{\\pi}{12},\\ \\frac{7\\pi}{12},\\ \\frac{5\\pi}{12},\\ \\frac{11\\pi}{12}\\text{ (z cos4x=1/2)}\\\\ \\cup\\ \\{0,\\ \\frac{\\pi}{2}\\}', explanation: '' },
        { step: 6, title: 'Odpowiedź', content: 'x \\in \\left\\{0,\\ \\frac{\\pi}{12},\\ \\frac{5\\pi}{12},\\ \\frac{\\pi}{2},\\ \\frac{7\\pi}{12},\\ \\frac{11\\pi}{12}\\right\\}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Użyj wzoru: $\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$.' },
        { level: 2, text: '$\\sin 6x - \\sin 2x = 2\\cos 4x\\sin 2x$. Więc równanie: $\\sin 2x(2\\cos 4x-1)=0$.' },
        { level: 3, text: 'Dwa przypadki: $\\sin 2x=0$ lub $\\cos 4x=\\frac{1}{2}$.' }
      ]
    },
    // sin6x + cos3x = 2sin3x + 1  [2018 z.8]
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$\\sin 6x + \\cos 3x = 2\\sin 3x + 1$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{\\dfrac{\\pi}{2},\\, \\dfrac{7\\pi}{6},\\, \\dfrac{3\\pi}{2},\\, \\dfrac{11\\pi}{6}\\right\\}',
      solution: [
        { step: 1, title: 'Wzór na sin6x', content: '\\sin 6x = \\sin(2\\cdot 3x) = 2\\sin 3x\\cos 3x', explanation: '$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$.' },
        { step: 2, title: 'Podstawienie', content: '2\\sin 3x\\cos 3x + \\cos 3x = 2\\sin 3x + 1\\\\ \\cos 3x(2\\sin 3x + 1) = 2\\sin 3x + 1\\\\ (2\\sin 3x + 1)(\\cos 3x - 1) = 0', explanation: '' },
        { step: 3, title: 'Przypadek 1: cos3x = 1', content: '3x = 2k\\pi \\implies x = \\frac{2k\\pi}{3}\\\\ x \\in \\{0,\\ \\frac{2\\pi}{3},\\ \\frac{4\\pi}{3}\\}', explanation: '' },
        { step: 4, title: 'Przypadek 2: sin3x = -1/2', content: '3x = \\frac{7\\pi}{6}+2k\\pi\\text{ lub }3x = \\frac{11\\pi}{6}+2k\\pi\\\\ x = \\frac{7\\pi}{18}+\\frac{2k\\pi}{3}\\text{ lub }x = \\frac{11\\pi}{18}+\\frac{2k\\pi}{3}', explanation: '' },
        { step: 5, title: 'Odpowiedź', content: 'x \\in \\left\\{0,\\ \\frac{7\\pi}{18},\\ \\frac{11\\pi}{18},\\ \\frac{2\\pi}{3},\\ \\frac{7\\pi}{9},\\ \\frac{4\\pi}{3},\\ \\frac{25\\pi}{18},\\ \\frac{29\\pi}{18}\\right\\}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Skorzystaj z $\\sin 6x = 2\\sin 3x\\cos 3x$.' },
        { level: 2, text: 'Po podstawieniu: $(2\\sin 3x+1)\\cos 3x = 2\\sin 3x + 1$.' },
        { level: 3, text: 'Przenieś: $(2\\sin 3x+1)(\\cos 3x - 1) = 0$. Dwa przypadki.' }
      ]
    },
    // 4sin4x·cos6x = 2sin10x + 1  [typ maturalny: wzory iloczynowe]
    {
      difficulty: 'hard',
      statement: 'Rozwiąż równanie\n$$4\\sin 4x \\cdot \\cos 6x = 2\\sin 10x + 1$$\ndla $x \\in [0, \\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{\\dfrac{\\pi}{12},\\, \\dfrac{5\\pi}{12},\\, \\dfrac{7\\pi}{12},\\, \\dfrac{11\\pi}{12}\\right\\}',
      solution: [
        { step: 1, title: 'Wzór iloczynowy', content: '2\\sin A\\cos B = \\sin(A+B)+\\sin(A-B)', explanation: 'Wzór na iloczyn sinus·cosinus.' },
        { step: 2, title: 'Zastosowanie', content: '4\\sin 4x\\cos 6x = 2\\cdot[2\\sin 4x\\cos 6x]\\\\ = 2[\\sin(10x)+\\sin(-2x)]\\\\ = 2\\sin 10x - 2\\sin 2x', explanation: '$2\\sin 4x\\cos 6x = \\sin(4x+6x)+\\sin(4x-6x)=\\sin 10x+\\sin(-2x)$.' },
        { step: 3, title: 'Równanie', content: '2\\sin 10x - 2\\sin 2x = 2\\sin 10x + 1\\\\ -2\\sin 2x = 1\\\\ \\sin 2x = -\\frac{1}{2}', explanation: '' },
        { step: 4, title: 'Rozwiązanie', content: '2x = \\frac{7\\pi}{6}+2k\\pi\\text{ lub }2x = \\frac{11\\pi}{6}+2k\\pi\\\\ x = \\frac{7\\pi}{12}+k\\pi\\text{ lub }x = \\frac{11\\pi}{12}+k\\pi', explanation: '' },
        { step: 5, title: 'Wartości w [0,π)', content: 'x = \\frac{7\\pi}{12}\\text{ lub }x = \\frac{11\\pi}{12}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Użyj wzoru: $2\\sin A\\cos B = \\sin(A+B)+\\sin(A-B)$.' },
        { level: 2, text: '$4\\sin 4x\\cos 6x = 2\\sin 10x - 2\\sin 2x$. Podstaw do równania.' },
        { level: 3, text: 'Po uproszczeniu: $\\sin 2x = -\\frac{1}{2}$.' }
      ]
    },
    // 2sin²x - cos2x = 0  [typ maturalny: kwadratowe przez cos2x]
    {
      difficulty: 'medium',
      statement: 'Rozwiąż równanie\n$$2\\sin^2 x - \\cos 2x = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{\\dfrac{\\pi}{4},\\, \\dfrac{3\\pi}{4},\\, \\dfrac{5\\pi}{4},\\, \\dfrac{7\\pi}{4}\\right\\}',
      solution: [
        { step: 1, title: 'Wzór na cos 2x', content: '\\cos 2x = 1-2\\sin^2 x', explanation: '' },
        { step: 2, title: 'Podstawienie', content: '2\\sin^2 x - (1-2\\sin^2 x) = 0\\\\ 4\\sin^2 x - 1 = 0\\\\ \\sin^2 x = \\frac{1}{4}\\\\ \\sin x = \\pm\\frac{1}{2}', explanation: '' },
        { step: 3, title: 'sin x = 1/2', content: 'x = \\frac{\\pi}{6}\\text{ lub }x = \\frac{5\\pi}{6}', explanation: '' },
        { step: 4, title: 'sin x = -1/2', content: 'x = \\frac{7\\pi}{6}\\text{ lub }x = \\frac{11\\pi}{6}', explanation: '' },
        { step: 5, title: 'Odpowiedź', content: 'x \\in \\left\\{\\frac{\\pi}{6},\\ \\frac{5\\pi}{6},\\ \\frac{7\\pi}{6},\\ \\frac{11\\pi}{6}\\right\\}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Użyj: $\\cos 2x = 1-2\\sin^2 x$.' },
        { level: 2, text: 'Otrzymasz: $4\\sin^2 x - 1 = 0$.' },
        { level: 3, text: '$\\sin x = \\pm\\frac{1}{2}$. Cztery rozwiązania w $[0,2\\pi)$.' }
      ]
    },
    // sin²x - 2sinx·cosx - 3cos²x = 0  [kwadratowe → tg]
    {
      difficulty: 'medium',
      statement: 'Rozwiąż równanie\n$$\\sin^2 x - 2\\sin x\\cos x - 3\\cos^2 x = 0$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.',
      solution_set: 'x \\in \\left\\{\\dfrac{3\\pi}{4},\\, \\dfrac{7\\pi}{4},\\, \\dfrac{\\pi}{4}+\\pi,\\, \\ldots\\right\\}',
      solution: [
        { step: 1, title: 'Dzielenie przez cos²x', content: '\\tg^2 x - 2\\tg x - 3 = 0', explanation: 'Dzielimy obie strony przez $\\cos^2 x \\neq 0$ (sprawdzamy cos x=0 osobno: podstawiając x=π/2 dostajemy 1≠0, więc cos x≠0).' },
        { step: 2, title: 'Rozwiązanie kwadratowego (t = tg x)', content: 't^2-2t-3=0\\\\ (t-3)(t+1)=0\\\\ t=3\\text{ lub }t=-1', explanation: '' },
        { step: 3, title: 'tg x = 3', content: 'x = \\arctan 3 + k\\pi \\approx 71.6° + k\\cdot 180°', explanation: '' },
        { step: 4, title: 'tg x = -1', content: 'x = -\\frac{\\pi}{4}+k\\pi\\\\ x = \\frac{3\\pi}{4}\\text{ lub }x = \\frac{7\\pi}{4}\\text{ w [0,2π)}', explanation: '$\\tg(-\\frac{\\pi}{4})=-1$.' },
        { step: 5, title: 'Odpowiedź', content: 'x = \\frac{3\\pi}{4},\\ x = \\frac{7\\pi}{4},\\ x = \\arctan 3,\\ x = \\pi+\\arctan 3', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Sprawdź czy $\\cos x = 0$ jest rozwiązaniem. Jeśli nie, podziel przez $\\cos^2 x$.' },
        { level: 2, text: 'Dostaniesz $\\tg^2 x - 2\\tg x - 3 = 0$. Podstaw $t = \\tg x$.' },
        { level: 3, text: '$(t-3)(t+1)=0$: $\\tg x = 3$ lub $\\tg x = -1$.' }
      ]
    }
  ];

  // Generator parametryczny: sin x = p/q lub cos x = p/q
  function simpleTrigo() {
    const func = M.choose(['sin', 'cos']);
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

  // cos2x + a·cosx = b  — parametryczny typ "kwadratowe przez podstawienie"
  function cos2xLinear() {
    // cos2x = 2cos²x-1, więc 2cos²x + a·cosx + (1+b) = 0
    // Chcemy ładne rozwiązania: t₁ i t₂ w [-1,1]
    const configs = [
      // cos2x - cosx - 2 = 0: 2t²-t-3=0, (2t-3)(t+1)=0, t=3/2 (odrzuc) lub t=-1, cosx=-1, x=π
      { a: -1, b: -2, note: 'cos2x-cosx-2=0', t1: -1, t2: 1.5, answer: 'x = \\pi' },
      // cos2x + cosx = 0: 2t²+t-1=0, (2t-1)(t+1)=0, t=1/2 lub t=-1
      { a: 1, b: 0, note: 'cos2x+cosx=0', t1: 0.5, t2: -1, answer: 'x \\in \\left\\{\\frac{\\pi}{3},\\ \\frac{5\\pi}{3},\\ \\pi\\right\\}' },
      // cos2x - 3cosx + 2 = 0: 2t²-3t+1=0, (2t-1)(t-1)=0, t=1/2 lub t=1
      { a: -3, b: 2, note: 'cos2x-3cosx+2=0', t1: 0.5, t2: 1, answer: 'x \\in \\left\\{0,\\ \\frac{\\pi}{3},\\ \\frac{5\\pi}{3}\\right\\}' }
    ];
    const cfg = M.choose(configs);

    const signA = cfg.a >= 0 ? '+' : '';
    const signB = cfg.b >= 0 ? '=' : '=';
    const bAbs = Math.abs(cfg.b);
    const bStr = cfg.b === 0 ? '' : (cfg.b > 0 ? ` + ${cfg.b}` : ` - ${bAbs}`);
    const eqStr = `\\cos 2x ${cfg.a > 0 ? '+ ' + cfg.a : '- ' + Math.abs(cfg.a)}\\cos x${bStr} = 0`;

    return {
      id: M.makeId('cat09_cos2x'),
      category: 9,
      categoryName: 'Równania trygonometryczne',
      type: 'cos2x_linear',
      points: 4,
      params: { a: cfg.a, b: cfg.b },
      statement: `Rozwiąż równanie\n$$${eqStr}$$\ndla $x \\in [0, 2\\pi)$. Zapisz obliczenia.`,
      answer: {
        type: 'set',
        display: cfg.answer,
        description: `$${cfg.answer}$`
      },
      hints: [
        { level: 1, text: 'Podstaw $\\cos 2x = 2\\cos^2 x - 1$.' },
        { level: 2, text: 'Dostaniesz równanie kwadratowe w zmiennej $t = \\cos x$.' },
        { level: 3, text: 'Pamiętaj, że $|\\cos x| \\leq 1$ — odrzuć rozwiązania spoza $[-1,1]$.' }
      ],
      solution: [
        { step: 1, title: 'Wzór na cos 2x', content: '\\cos 2x = 2\\cos^2 x - 1', explanation: '' },
        { step: 2, title: 'Równanie kwadratowe', content: `2\\cos^2 x - 1 ${cfg.a >= 0 ? '+ ' + cfg.a : '- ' + Math.abs(cfg.a)}\\cos x${bStr} = 0`, explanation: 'Podstawiamy $t=\\cos x$.' },
        { step: 3, title: 'Rozwiązanie', content: `t_1 = ${cfg.t1},\\quad t_2 = ${cfg.t2}`, explanation: '' },
        { step: 4, title: 'Sprawdzenie zakresu', content: `${cfg.t2 > 1 || cfg.t2 < -1 ? `t_2 = ${cfg.t2} \\notin [-1,1]\\text{ — odrzucamy}` : `\\text{oba } t \\in [-1,1]`}`, explanation: '' },
        { step: 5, title: 'Odpowiedź', content: cfg.answer, explanation: '' }
      ]
    };
  }

  function generate() {
    // Pool: wszystkie medium/hard z banku + parametryczny typ cos2xLinear
    const pool = TASKS.filter(t => t.difficulty === 'medium' || t.difficulty === 'hard');
    const taskFromPool = M.choose(pool);

    // 20% szans na cos2xLinear (parametryczny), reszta z banku maturalnego
    const r = Math.random();
    if (r < 0.20) return cos2xLinear();

    return {
      id: M.makeId('cat09'),
      category: 9,
      categoryName: 'Równania trygonometryczne',
      type: 'trig_equation',
      points: 4,
      params: {},
      statement: taskFromPool.statement,
      answer: {
        type: 'set',
        display: taskFromPool.solution_set,
        description: `$${taskFromPool.solution_set}$`
      },
      hints: taskFromPool.hints,
      solution: taskFromPool.solution
    };
  }

  return { generate };
})();
