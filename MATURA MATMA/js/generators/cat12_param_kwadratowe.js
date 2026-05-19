// Kategoria 12: Równanie kwadratowe z parametrem
// Wzorzec matura 2025 z.3: warunki na pierwiastki przez wzory Viète'a
// Wzorzec matura 2024 z.3: x²+bx+c=0, jeden pierwiastek znany, znajdź drugi + parametr
// Wzorzec matura 2023 z.4: równanie z parametrem m, wyróżnik, ilość rozwiązań
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

    const taskType = M.choose(['sumSq', 'diffSq', 'recipSum']);
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
      if (x1 * x2 === 0) return vieta(diff); // unikaj dzielenia przez 0
      const recSum = (x1 + x2); // licznik po uproszczeniu * (c/a)
      const recDen = x1 * x2;
      ask = `$\\dfrac{1}{x_1} + \\dfrac{1}{x_2}$`;
      const f = M.simplifyFraction((-b/a) * a, c); // (x1+x2)/(x1x2) = (-b/a)/(c/a) = -b/c
      ansLatex = M.latexFrac(-b, c);
      ans = -b / c;
      solutionSteps = [
        { step: 1, title: 'Wzory Viète\'a', content: `x_1 + x_2 = \\frac{${-b}}{${a}},\\quad x_1 x_2 = \\frac{${c}}{${a}}`, explanation: '' },
        { step: 2, title: 'Obliczenie', content: `\\frac{1}{x_1}+\\frac{1}{x_2} = \\frac{x_1+x_2}{x_1 x_2} = \\frac{${-b/a}}{${c/a}} = \\frac{${-b}}{${c}} = ${ansLatex}`, explanation: '' }
      ];
    }

    const polyStr = M.latexPoly3 ? M.latexPoly3(a, 0, b, c) : `${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`;

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

    // Δ = m² - 4ac
    // Δ > 0: m² > 4ac → m ∈ (-∞, -√(4ac)) ∪ (√(4ac), +∞)
    // Δ = 0: m = ±√(4ac)
    // Δ < 0: brak rozwiązań rzeczywistych

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

  function generate() {
    return M.choose([vieta, paramDiscriminant])();
  }

  return { generate };
})();
