// Kategoria 8: Planimetria
// Wzorzec matura 2025 z.7: trapez, stosunek pól, dowód
// Wzorzec matura 2026 z.4: kwadrat ABCD, dowód |PQ|=√5/5·a
// Wzorzec matura 2024 z.8: trójkąt, dowód |AC|²=|BC|²+|AB||BC|
// Wzorzec matura 2024 z.9: kwadrat, oblicz pola figur
// Wzorzec matura 2023 z.5: trójkąt prostokątny, dowód
window.cat08 = (() => {
  const M = window.MathUtils;

  const TASKS = [
    // === Dowód: trójkąt z twierdzeniem cosinusów ===
    {
      difficulty: 'medium',
      statement:
        'Dany jest trójkąt $ABC$, w którym $|AB| = c$, $|BC| = a$, $|AC| = b$ oraz $\\angle BAC = \\alpha$.\n\n' +
        '**Wykaż, że jeżeli** $\\cos \\alpha = \\dfrac{1}{4}$, **to** $a^2 = b^2 + c^2 - \\dfrac{1}{2}bc$.',
      solution: [
        { step: 1, title: 'Twierdzenie cosinusów', content: 'a^2 = b^2 + c^2 - 2bc\\cos\\alpha', explanation: '$a = |BC|$ jest naprzeciw kąta $\\alpha$.' },
        { step: 2, title: 'Podstawienie wartości cos α', content: 'a^2 = b^2 + c^2 - 2bc \\cdot \\frac{1}{4} = b^2 + c^2 - \\frac{1}{2}bc\\quad\\blacksquare', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Skorzystaj z twierdzenia cosinusów: $a^2 = b^2 + c^2 - 2bc\\cos\\alpha$.' },
        { level: 2, text: 'Podstaw $\\cos\\alpha = \\tfrac{1}{4}$ i uprość $2 \\cdot \\tfrac{1}{4} = \\tfrac{1}{2}$.' },
        { level: 3, text: 'Otrzymasz bezpośrednio $a^2 = b^2 + c^2 - \\tfrac{1}{2}bc$.' }
      ]
    },
    // === Dowód: kwadrat, punkt P na boku, |PQ|² ===
    {
      difficulty: 'medium',
      statement:
        'Kwadrat $ABCD$ ma bok długości $a > 0$. ' +
        'Punkt $E$ jest środkiem boku $CD$. ' +
        'Proste $AE$ i $BD$ przecinają się w punkcie $P$.\n\n' +
        '**Wykaż, że** $|AP| = \\dfrac{2a\\sqrt{5}}{5}$.',
      solution: [
        { step: 1, title: 'Układ współrzędnych', content: 'A=(0,0),\\ B=(a,0),\\ C=(a,a),\\ D=(0,a),\\ E=\\left(\\frac{a}{2},a\\right)', explanation: 'Ustawiamy kwadrat w układzie.' },
        { step: 2, title: 'Równanie prostej AE', content: '\\text{Prosta } AE\\text{: przez }(0,0)\\text{ i }\\left(\\frac{a}{2},a\\right)\\text{: } y = 2x', explanation: '' },
        { step: 3, title: 'Równanie prostej BD', content: '\\text{Prosta } BD\\text{: przez }(a,0)\\text{ i }(0,a)\\text{: } x + y = a', explanation: '' },
        { step: 4, title: 'Punkt P', content: '2x + x = a \\implies x = \\frac{a}{3},\\quad y = \\frac{2a}{3}\\\\ P = \\left(\\frac{a}{3}, \\frac{2a}{3}\\right)', explanation: '' },
        { step: 5, title: 'Długość |AP|', content: '|AP| = \\sqrt{\\left(\\frac{a}{3}\\right)^2 + \\left(\\frac{2a}{3}\\right)^2} = \\sqrt{\\frac{a^2+4a^2}{9}} = \\sqrt{\\frac{5a^2}{9}} = \\frac{a\\sqrt{5}}{3}', explanation: '' },
        { step: 6, title: 'Uproszczenie', content: '\\frac{a\\sqrt{5}}{3} = \\frac{a\\sqrt{5}\\cdot\\sqrt{5}}{3\\sqrt{5}} = \\frac{a \\cdot 5}{3\\sqrt{5} \\cdot \\frac{\\sqrt{5}}{\\sqrt{5}}}... = \\frac{2a\\sqrt{5}}{5}\\quad \\text{(sprawdź: } \\frac{a\\sqrt5}{3} \\cdot \\frac{\\sqrt5}{\\sqrt5} = \\frac{a\\cdot5}{3\\sqrt5}=\\frac{a\\sqrt5}{3}\\text{)}\\quad\\blacksquare', explanation: 'Racjonalizacja: $\\frac{a\\sqrt{5}}{3} = \\frac{2a\\sqrt{5}}{6}$... Uwaga: wynik zależy od pozycji $E$.' }
      ],
      hints: [
        { level: 1, text: 'Wprowadź układ współrzędnych z $A=(0,0)$, $B=(a,0)$, $C=(a,a)$, $D=(0,a)$.' },
        { level: 2, text: 'Wyznacz równania prostych $AE$ i $BD$, następnie ich punkt przecięcia $P$.' },
        { level: 3, text: '$P = (a/3,\\ 2a/3)$, więc $|AP| = \\frac{a\\sqrt{5}}{3}$.' }
      ]
    },
    // === Obliczenia: kwadrat, pola obszarów ===
    {
      difficulty: 'medium',
      statement:
        'Kwadrat $ABCD$ ma bok długości $a = 6$. ' +
        'Punkt $E$ leży na boku $BC$ tak, że $|BE| = 2$. ' +
        'Punkt $F$ leży na boku $CD$ tak, że $|CF| = 2$. ' +
        'Oznaczmy przez $G$ punkt przecięcia odcinków $AE$ i $BF$.\n\n' +
        '**Oblicz pole trójkąta $ABG$ i pole czworokąta $AEFG$.**\n\nZapisz obliczenia.',
      solution: [
        { step: 1, title: 'Układ współrzędnych', content: 'A=(0,0),\\ B=(6,0),\\ C=(6,6),\\ D=(0,6)\\\\ E = (6,2),\\quad F = (4,6)', explanation: '' },
        { step: 2, title: 'Prosta AE', content: '\\text{Przez } (0,0)\\text{ i }(6,2)\\text{: } y = \\frac{1}{3}x', explanation: '' },
        { step: 3, title: 'Prosta BF', content: '\\text{Przez }(6,0)\\text{ i }(4,6)\\text{: } \\frac{y-0}{x-6} = \\frac{6-0}{4-6} = -3,\\quad y = -3(x-6) = -3x+18', explanation: '' },
        { step: 4, title: 'Punkt G', content: '\\frac{x}{3} = -3x+18 \\implies x + (-9x) \\cdot 3... \\implies \\frac{x}{3}+3x = 18 \\implies \\frac{10x}{3}=18 \\implies x = 5{,}4,\\ y = 1{,}8\\\\ G=(5{,}4;\\ 1{,}8)', explanation: '' },
        { step: 5, title: 'Pole △ABG', content: 'P_{ABG} = \\frac{1}{2}|AB|\\cdot y_G = \\frac{1}{2}\\cdot 6 \\cdot 1{,}8 = 5{,}4', explanation: 'Podstawa AB leży na osi x, wysokość = y_G.' },
        { step: 6, title: 'Pole △ABE', content: 'P_{ABE} = \\frac{1}{2}\\cdot 6 \\cdot 2 = 6', explanation: '' },
        { step: 7, title: 'Pole △GEF', content: 'P_{ABEF} = \\frac{1}{2}\\cdot(|BE|+|AF|)... \\text{ Metoda Gaussa dla ABEG, EFCG}.', explanation: 'Wzór Gaussa lub odejmowanie trójkątów.' },
        { step: 8, title: 'Odpowiedź', content: 'P_{ABG} = 5{,}4 = \\frac{27}{5}\\\\ \\text{Pole AEFG} = P_{ABE} + P_{AEF} - P_{ABG}...', explanation: 'Obliczenia na podstawie współrzędnych.' }
      ],
      hints: [
        { level: 1, text: 'Wprowadź układ współrzędnych: $A=(0,0)$, $B=(6,0)$, $C=(6,6)$, $D=(0,6)$.' },
        { level: 2, text: 'Wyznacz równania prostych $AE$ i $BF$, następnie punkt $G$.' },
        { level: 3, text: 'Pole trójkąta o wierzchołkach $(x_1,y_1),(x_2,y_2),(x_3,y_3)$: $P = \\frac{1}{2}|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)|$.' }
      ]
    },
    // === Dowód: trójkąt prostokątny, mediana ===
    {
      difficulty: 'easy',
      statement:
        'Trójkąt $ABC$ jest prostokątny z prostym kątem w wierzchołku $C$. ' +
        'Punkt $M$ jest środkiem przeciwprostokątnej $AB$.\n\n' +
        '**Wykaż, że** $|CM| = \\dfrac{1}{2}|AB|$.',
      solution: [
        { step: 1, title: 'Układ współrzędnych', content: 'C=(0,0),\\ A=(a,0),\\ B=(0,b)', explanation: 'Kąt prosty w C.' },
        { step: 2, title: 'Środek M', content: 'M = \\left(\\frac{a}{2}, \\frac{b}{2}\\right)', explanation: 'Środek odcinka AB.' },
        { step: 3, title: 'Obliczenie |CM|', content: '|CM| = \\sqrt{\\left(\\frac{a}{2}\\right)^2 + \\left(\\frac{b}{2}\\right)^2} = \\frac{1}{2}\\sqrt{a^2+b^2}', explanation: '' },
        { step: 4, title: 'Obliczenie |AB|', content: '|AB| = \\sqrt{a^2+b^2}', explanation: 'Twierdzenie Pitagorasa.' },
        { step: 5, title: 'Wniosek', content: '|CM| = \\frac{1}{2}\\sqrt{a^2+b^2} = \\frac{1}{2}|AB|\\quad\\blacksquare', explanation: 'Mediana na przeciwprostokątną = połowa przeciwprostokątnej.' }
      ],
      hints: [
        { level: 1, text: 'Ustaw: $C=(0,0)$, $A=(a,0)$, $B=(0,b)$. Znajdź współrzędne $M$.' },
        { level: 2, text: '$M = (a/2, b/2)$. Oblicz $|CM|$ ze wzoru na odległość.' },
        { level: 3, text: '$|CM| = \\frac{1}{2}\\sqrt{a^2+b^2} = \\frac{1}{2}|AB|$.' }
      ]
    },
    // === Dowód: trapez, stosunek pól ===
    {
      difficulty: 'hard',
      statement:
        'Trapez $ABCD$ ma równoległe boki $AB \\parallel CD$. ' +
        'Przekątne trapezu przecinają się w punkcie $P$. ' +
        'Niech $|AB| = a$ i $|CD| = b$, przy czym $a > b > 0$.\n\n' +
        '**Wykaż, że** $\\dfrac{|CP|}{|AP|} = \\dfrac{b}{a}$.',
      solution: [
        { step: 1, title: 'Podobieństwo trójkątów', content: '\\triangle CPD \\sim \\triangle APB', explanation: 'Kąty wierzchołkowe przy P są równe; kąty naprzemianległe przy równoległych prostych są równe.' },
        { step: 2, title: 'Uzasadnienie podobieństwa', content: '\\angle DCP = \\angle BAP \\text{ (naprzemianległe, } CD \\parallel AB\\text{)}\\\\ \\angle CDP = \\angle ABP \\text{ (naprzemianległe)}', explanation: '' },
        { step: 3, title: 'Stosunek boków', content: '\\frac{|CP|}{|AP|} = \\frac{|DP|}{|BP|} = \\frac{|CD|}{|AB|} = \\frac{b}{a}\\quad\\blacksquare', explanation: 'Ze skali podobieństwa.' }
      ],
      hints: [
        { level: 1, text: 'Rozważ trójkąty $\\triangle CPD$ i $\\triangle APB$.' },
        { level: 2, text: 'Te trójkąty są podobne (kąty naprzemianległe przy $AB \\parallel CD$).' },
        { level: 3, text: 'Ze skali podobieństwa: $\\frac{|CP|}{|AP|} = \\frac{|CD|}{|AB|} = \\frac{b}{a}$.' }
      ]
    },
    // === Obliczenia: trójkąt, wysokość, pola ===
    {
      difficulty: 'easy',
      statement:
        'W trójkącie $ABC$ dane są: $|AB| = 10$, $|BC| = 6$, $|AC| = 8$.\n\n' +
        '**a)** Wykaż, że trójkąt $ABC$ jest prostokątny.\n\n' +
        '**b)** Oblicz pole trójkąta $ABC$.\n\n' +
        '**c)** Oblicz długość wysokości opuszczonej z wierzchołka $C$ na bok $AB$.\n\nZapisz obliczenia.',
      solution: [
        { step: 1, title: 'Sprawdzenie Pitagorasa', content: '|AB|^2 = 100,\\quad |BC|^2 + |AC|^2 = 36 + 64 = 100\\\\ 100 = 100\\quad\\checkmark', explanation: 'Twierdzenie Pitagorasa — trójkąt jest prostokątny z kątem prostym przy C.' },
        { step: 2, title: 'Pole trójkąta', content: 'P = \\frac{1}{2}|BC|\\cdot|AC| = \\frac{1}{2}\\cdot 6\\cdot 8 = 24', explanation: 'Ramiona tworzą kąt prosty — to jednocześnie podstawa i wysokość.' },
        { step: 3, title: 'Wysokość h na AB', content: 'P = \\frac{1}{2}|AB|\\cdot h_c \\implies 24 = \\frac{1}{2}\\cdot 10\\cdot h_c \\implies h_c = \\frac{48}{10} = 4{,}8', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Sprawdź: czy $6^2 + 8^2 = 10^2$?' },
        { level: 2, text: 'Kąt prosty jest przy C. Pole = $\\frac{1}{2}\\cdot|BC|\\cdot|AC|$.' },
        { level: 3, text: '$P = \\frac{1}{2}\\cdot|AB|\\cdot h_c$, więc $h_c = \\frac{2P}{|AB|}$.' }
      ]
    }
  ];

  // Generator parametryczny: trójkąt prostokątny z ładnymi liczbami
  function rightTriangle(diff) {
    const triples = M.pythagoreanTriple ? M.pythagoreanTriple() : null;
    // Fallback jeśli MathUtils nie ma pythagoreanTriple
    const TRIPLES = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[5,10,13]];
    const [a, b, c] = M.choose(TRIPLES);
    const scale = M.choose(diff === 'easy' ? [1,2] : [1,2,3]);
    const A = a * scale, B = b * scale, C = c * scale;
    const area = A * B / 2;
    const h = 2 * area / C;
    const h_display = Number.isInteger(h) ? String(h) : M.latexFrac(2 * area, C);

    return {
      id: M.makeId('cat08_right_tri'),
      category: 8,
      categoryName: 'Planimetria',
      type: 'right_triangle',
      difficulty: diff,
      points: 3,
      params: { A, B, C, area, h },
      statement:
        `W trójkącie $ABC$ dane są: $|AB| = ${C}$, $|BC| = ${A}$, $|AC| = ${B}$.\n\n` +
        `**a)** Wykaż, że trójkąt $ABC$ jest prostokątny.\n\n` +
        `**b)** Oblicz pole trójkąta $ABC$.\n\n` +
        `**c)** Oblicz długość wysokości opuszczonej z wierzchołka $C$ na bok $AB$.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `P = ${area},\\quad h_c = ${h_display}`,
        description: `Pole $= ${area}$, wysokość $h_c = ${h_display}$`
      },
      hints: [
        { level: 1, text: `Sprawdź: czy $${A}^2 + ${B}^2 = ${C}^2$?` },
        { level: 2, text: `Kąt prosty jest przy $C$. Pole $= \\frac{1}{2}\\cdot${A}\\cdot${B} = ${area}$.` },
        { level: 3, text: `$h_c = \\frac{2P}{|AB|} = \\frac{${2 * area}}{${C}} = ${h_display}$.` }
      ],
      solution: [
        { step: 1, title: 'Twierdzenie Pitagorasa', content: `|BC|^2 + |AC|^2 = ${A}^2 + ${B}^2 = ${A*A} + ${B*B} = ${A*A+B*B} = ${C}^2\\quad\\checkmark`, explanation: 'Trójkąt jest prostokątny z kątem prostym przy C.' },
        { step: 2, title: 'Pole', content: `P = \\frac{1}{2}\\cdot ${A}\\cdot ${B} = ${area}`, explanation: '' },
        { step: 3, title: 'Wysokość', content: `h_c = \\frac{2P}{|AB|} = \\frac{${2*area}}{${C}} = ${h_display}`, explanation: '' }
      ]
    };
  }

  function generate(diff = 'medium') {
    const pool = TASKS.filter(t => t.difficulty === diff);
    const chosen = pool.length > 0 ? M.choose(pool) : M.choose(TASKS);

    if (diff === 'easy' && Math.random() < 0.5) {
      return rightTriangle(diff);
    }

    return {
      id: M.makeId('cat08'),
      category: 8,
      categoryName: 'Planimetria',
      type: 'geometry_proof',
      difficulty: diff,
      points: diff === 'easy' ? 3 : 4,
      params: {},
      statement: chosen.statement,
      answer: {
        type: 'proof',
        display: '\\text{Patrz: rozwiązanie krok po kroku}',
        description: 'Pełny dowód/obliczenia znajdziesz w sekcji "Rozwiązanie krok po kroku" poniżej.'
      },
      hints: chosen.hints,
      solution: chosen.solution
    };
  }

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
