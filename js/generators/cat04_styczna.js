// Kategoria 4: Styczna do wykresu funkcji
// Wzorzec matura 2024 z.4: f(x) = (x³-3x+2)/x, styczna w P=(2,f(2))
// Wzorzec matura 2023 z.3: f(x) = (3x²-2x)/(x²+2x+8), P=(x₀,3)
// Wzorzec matura 2019 z.7: y = 2x²+x+2219, P=(10,2429)
window.cat04 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: wielomian lub wielomian/liniowa ===
  // f(x) = wielomian, dany punkt P=(x₀, f(x₀)), oblicz równanie stycznej
  function polyTangent() {
    const templates = [
      // f(x) = x³ + bx + c, P=(x₀, f(x₀))
      () => {
        const b = M.choose([-5,-4,-3,-2,-1,1,2,3,4]);
        const c = M.choose([-4,-3,-2,-1,0,1,2,3,4]);
        const x0 = M.choose([1,2,-1,-2,3,-3]);
        const f_x0 = Math.pow(x0, 3) + b * x0 + c;
        const fp_x0 = 3 * Math.pow(x0, 2) + b;
        const a_tangent = fp_x0;
        const b_tangent = f_x0 - fp_x0 * x0;
        const fx_clean = M.latexPoly3(1, 0, b, c);
        // f'(x) = 3x² + b
        const fp_display = b === 0 ? '3x^2' : `3x^2 ${b > 0 ? '+' + b : b}`;
        return { x0, f_x0, fp_x0, a: a_tangent, b_tangent, fx_display: fx_clean, fp_display };
      },
      // f(x) = ax² + bx + c
      () => {
        const a = M.choose([1,2,-1,-2,3,-3]);
        const b = M.choose([-4,-3,-2,-1,0,1,2,3,4]);
        const c = M.choose([-4,-3,-2,-1,0,1,2,3,4]);
        const x0 = M.choose([-3,-2,-1,0,1,2,3,4]);
        const f_x0 = a * x0 * x0 + b * x0 + c;
        const fp_x0 = 2 * a * x0 + b;
        const a_tangent = fp_x0;
        const b_tangent = f_x0 - fp_x0 * x0;
        const fx_display = M.latexPoly2(a, b, c);
        // f'(x) = 2ax + b
        const two_a = 2 * a;
        const fp_display = b === 0
          ? `${two_a === 1 ? '' : two_a === -1 ? '-' : two_a}x`
          : `${two_a === 1 ? '' : two_a === -1 ? '-' : two_a}x ${b > 0 ? '+' + b : b}`;
        return { x0, f_x0, fp_x0, a: a_tangent, b_tangent, fx_display, fp_display };
      }
    ];

    const result = M.choose(templates)();
    const { x0, f_x0, fp_x0, a, b_tangent, fx_display, fp_display } = result;

    let tangentStr = '';
    if (a === 0) tangentStr = `y = ${b_tangent}`;
    else if (b_tangent === 0) tangentStr = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x`;
    else tangentStr = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x${b_tangent > 0 ? '+' + b_tangent : b_tangent}`;

    return {
      id: M.makeId('cat04_poly'),
      category: 4,
      categoryName: 'Styczna do wykresu',
      type: 'poly_tangent',
      points: 3,
      params: { x0, f_x0, fp_x0, a, b_tangent },
      statement:
        `Funkcja $f$ jest określona wzorem\n` +
        `$$f(x) = ${fx_display}$$\n` +
        `dla każdej liczby rzeczywistej $x$. Punkt $P = (${x0},\\, ${f_x0})$ należy do wykresu funkcji $f$.\n\n` +
        `Prosta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n` +
        `**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `a = ${a}, \\quad b = ${b_tangent}`,
        description: `$a = ${a}$, $b = ${b_tangent}$`
      },
      hints: [
        { level: 1, text: 'Współczynnik kierunkowy stycznej w punkcie $P = (x_0, f(x_0))$ to $a = f\'(x_0)$.' },
        { level: 2, text: `Oblicz pochodną $f'(x)$, następnie podstaw $x_0 = ${x0}$.` },
        { level: 3, text: `$f'(${x0}) = ${fp_x0}$, więc $a = ${a}$. Z warunku przechodzenia przez punkt: $b = f(x_0) - f'(x_0) \\cdot x_0 = ${f_x0} - ${fp_x0} \\cdot ${x0} = ${b_tangent}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Obliczenie pochodnej',
          content: `Dla $f(x) = ${fx_display}$:\n$$f'(x) = ${fp_display}$$`,
          explanation: 'Różniczkujemy składnik po składniku.'
        },
        {
          step: 2, title: 'Współczynnik kierunkowy',
          content: `$a = f'(${x0}) = ${fp_x0}$`,
          explanation: 'Wartość pochodnej w punkcie styczności = nachylenie stycznej.'
        },
        {
          step: 3, title: 'Wyraz wolny stycznej',
          content: `Styczna przechodzi przez $P = (${x0}, ${f_x0})$:\n$$${f_x0} = ${a} \\cdot ${x0} + b \\implies b = ${b_tangent}$$`,
          explanation: 'Podstawiamy punkt do równania prostej.'
        },
        {
          step: 4, title: 'Wynik',
          content: `Równanie stycznej: $${tangentStr}$`,
          explanation: ''
        }
      ]
    };
  }

  // === SCHEMAT B: funkcja wymierna, dany punkt przez f(x₀)=y₀ ===
  function rationalTangent() {
    const a = M.choose([1, 2, 3, -1, -2, -3]);
    const b = M.choose([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
    const c = M.choose([-6, -4, -3, -2, -1, 1, 2, 3, 4, 6]);
    const x0 = M.choose([1, 2, -1, -2, 3, -3]);
    if (x0 === 0) return rationalTangent(diff); // unikaj dzielenia przez 0

    const f_x0 = a * x0 * x0 + b * x0 + c; // f(x₀) = ax₀² + bx₀ + c gdy f(x)=(ax²+bx+c)/x·x
    // Uproszczenie: f(x) = ax + b + c/x
    // f'(x) = a - c/x²
    const fp_x0_num = a * x0 * x0 - c;
    const fp_x0 = fp_x0_num / (x0 * x0);
    const tangent_b = f_x0 / x0 - fp_x0; // b = f(x0) - f'(x0)·x0

    // Upewnij się że wyniki są ładne
    if (!Number.isInteger(f_x0) || !Number.isInteger(fp_x0) || !Number.isInteger(tangent_b * x0 * x0)) {
      return polyTangent(diff); // fallback
    }

    const f_display = `\\dfrac{${M.latexPoly3(a, 0, b, c)}}{x}`;

    return {
      id: M.makeId('cat04_rational'),
      category: 4,
      categoryName: 'Styczna do wykresu',
      type: 'rational_tangent',
      points: 3,
      params: { a, b, c, x0, f_x0, fp_x0, tangent_b },
      statement:
        `Funkcja $f$ jest określona wzorem\n` +
        `$$f(x) = ${f_display}$$\n` +
        `dla każdej liczby rzeczywistej $x \\neq 0$.\n\n` +
        `Punkt $P$, o pierwszej współrzędnej równej $${x0}$, należy do wykresu funkcji $f$.\n\n` +
        `Prosta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n` +
        `**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `a = ${fp_x0},\\ b = ${tangent_b}`,
        description: `$a = ${fp_x0}$, $b = ${tangent_b}$`
      },
      hints: [
        { level: 1, text: `Oblicz $f(${x0})$, żeby znaleźć drugą współrzędną punktu $P$.` },
        { level: 2, text: `Zapisz $f(x) = ${a}x + ${b} + \\frac{${c}}{x}$ i oblicz pochodną: $f'(x) = ${a} - \\frac{${c}}{x^2}$.` },
        { level: 3, text: `$f'(${x0}) = ${a} - \\frac{${c}}{${x0 * x0}} = ${fp_x0}$, więc $a = ${fp_x0}$. Punkt $P = (${x0}, ${f_x0 / x0})$.` }
      ],
      solution: [
        {
          step: 1, title: 'Obliczenie f(x₀)',
          content: `$f(${x0}) = \\dfrac{${M.latexPoly3(a, 0, b, c).replace('x^3', x0 + '^3').replace('x^2', x0 + '^2')}}{${x0}} = ${f_x0 / x0}$`,
          explanation: 'Podstawiamy x₀ do wzoru funkcji.'
        },
        {
          step: 2, title: 'Pochodna funkcji',
          content: `$f(x) = ${a}x + ${b} + \\dfrac{${c}}{x}$, więc $f'(x) = ${a} - \\dfrac{${c}}{x^2}$`,
          explanation: 'Zapisujemy funkcję w prostszej postaci i różniczkujemy.'
        },
        {
          step: 3, title: 'Wyniki',
          content: `$a = f'(${x0}) = ${a} - \\dfrac{${c}}{${x0 * x0}} = ${fp_x0}$\n\n$b = f(${x0}) - a \\cdot ${x0} = ${f_x0 / x0} - ${fp_x0} \\cdot ${x0} = ${tangent_b}$`,
          explanation: ''
        }
      ]
    };
  }

  function generate() {
    return M.choose([polyTangent, rationalTangent])();
  }

  return { generate };
})();
