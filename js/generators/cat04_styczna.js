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
    ];

    const result = M.choose(templates)();
    const { x0, f_x0, fp_x0, a, b_tangent, fx_display, fp_display } = result;

    let tangentStr = '';
    if (a === 0) tangentStr = `y = ${b_tangent}`;
    else if (b_tangent === 0) tangentStr = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x`;
    else tangentStr = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x${b_tangent > 0 ? '+' + b_tangent : b_tangent}`;

    // Kontekst słowny — styczna jako krańcowy koszt/przychód lub geometryczny
    const tangentCtx = M.choose([
      {
        intro:
          `Koszt produkcji $x$ tys. sztuk towaru (w tys. zł) opisuje funkcja\n$$f(x) = ${fx_display}$$\n` +
          `Punkt $P = (${x0},\\, ${f_x0})$ leży na wykresie tej funkcji.\n\n` +
          `Prosta $y = ax + b$ jest styczna do wykresu $f$ w punkcie $P$ — wyraża ona **krańcowy koszt produkcji** w tym punkcie.`,
      },
      {
        intro:
          `Przychód ze sprzedaży $x$ tys. sztuk produktu (w tys. zł) opisuje funkcja\n$$f(x) = ${fx_display}$$\n` +
          `Punkt $P = (${x0},\\, ${f_x0})$ należy do wykresu tej funkcji.\n\n` +
          `Prosta $y = ax + b$ jest styczna do wykresu $f$ w punkcie $P$.`,
      },
      {
        intro:
          `Funkcja $f$ jest określona wzorem\n$$f(x) = ${fx_display}$$\n` +
          `dla każdej liczby rzeczywistej $x$. Punkt $P = (${x0},\\, ${f_x0})$ należy do wykresu funkcji $f$.\n\n` +
          `Prosta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.`,
      },
    ]);

    return {
      id: M.makeId('cat04_poly'),
      category: 4,
      categoryName: 'Styczna do wykresu',
      type: 'poly_tangent',
      points: 3,
      params: { x0, f_x0, fp_x0, a, b_tangent },
      statement:
        `${tangentCtx.intro}\n\n` +
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

  // === SCHEMAT C: styczna równoległa do danej prostej ===
  // Wzorzec matura 2015 z.12: f(x) = x³ - 2x² + 1, styczna równoległa do y = 4x
  // Wzorzec matura 2019: f(x) = x³ + ax + b, styczna równoległa do y = kx
  function parallelTangent() {
    const configs = [
      // f(x) = x³ + bx + c, styczna równoległa do y = kx
      // f'(x) = 3x² + b = k → 3x² = k-b → x² = (k-b)/3
      // Chcemy (k-b)/3 = m² dla całkowitego m
      { a3: 1, a2: 0, a1: -3, a0: 1, k: 6, x0s: [1, -1],
        fStr: 'x^3 - 3x + 1', fpStr: '3x^2 - 3', lineStr: 'y = 6x',
        // f'(x)=3x²-3=6 → x²=3, nie całkowite… zmień
      },
    ];

    // Generuj od parametrów: wybierz x₀, oblicz f'(x₀)=k (nachylenie)
    // f(x) = x³ + px + q, f'(x) = 3x²+p
    // x₀ ∈ {1,2,-1,-2}, p ∈ {-3,-2,-1,0,1,2,3}
    const x0 = M.choose([1, 2, -1, -2, 3, -3]);
    const p = M.choose([-6, -5, -3, -2, -1, 0, 1, 2, 3]);
    const q = M.choose([-4, -3, -2, -1, 0, 1, 2, 3, 4]);

    const k = 3 * x0 * x0 + p; // nachylenie stycznej = f'(x₀)
    // Inne punkty x₁ gdzie f'(x₁)=k: 3x₁²+p=k → x₁²=x₀² → x₁=x₀ lub x₁=-x₀
    const x1 = -x0; // drugi punkt (o ile x0≠0)
    if (x0 === 0) return parallelTangent();

    // Wartości funkcji
    const f = (x) => x*x*x + p*x + q;
    const f0 = f(x0);
    const f1 = f(x1);

    // Równania stycznych:
    // y = k(x - x₀) + f₀ = kx + (f₀ - k·x₀)
    const b0 = f0 - k * x0; // wyraz wolny stycznej w x₀
    const b1 = f1 - k * x1; // wyraz wolny stycznej w x₁

    const pSign = p >= 0 ? `+${p}` : `${p}`;
    const qSign = q >= 0 ? `+${q}` : `${q}`;
    const fStr = p === 0
      ? (q === 0 ? 'x^3' : `x^3${qSign}`)
      : (q === 0 ? `x^3${pSign}x` : `x^3${pSign}x${qSign}`);

    const lineStr = k === 0 ? 'y = 0' : (k === 1 ? 'y = x' : (k === -1 ? 'y = -x' : `y = ${k}x`));

    const tang0 = b0 === 0 ? `y = ${k}x` : `y = ${k}x ${b0 > 0 ? '+' + b0 : b0}`;
    const tang1 = b1 === 0 ? `y = ${k}x` : `y = ${k}x ${b1 > 0 ? '+' + b1 : b1}`;
    const hasTwoTangents = b0 !== b1;

    return {
      id: M.makeId('cat04_parallel'),
      category: 4,
      categoryName: 'Styczna do wykresu',
      type: 'parallel_tangent',
      points: 4,
      params: { p, q, k, x0, x1, f0, f1, b0, b1 },
      statement:
        `Funkcja $f$ jest określona wzorem\n$$f(x) = ${fStr}$$\n` +
        `**Wyznacz równania wszystkich stycznych do wykresu funkcji $f$, równoległych do prostej $${lineStr}$.** ` +
        `Zapisz obliczenia.`,
      answer: {
        type: 'set',
        display: hasTwoTangents ? `${tang0} \\text{ oraz } ${tang1}` : tang0,
        description: hasTwoTangents ? `Dwie styczne: $${tang0}$ i $${tang1}$` : `Jedna styczna: $${tang0}$`
      },
      hints: [
        { level: 1, text: `Styczna równoległa do $${lineStr}$ ma nachylenie $k = ${k}$. Warunek: $f'(x_0) = ${k}$.` },
        { level: 2, text: `$f'(x) = 3x^2 ${p >= 0 ? '+' + p : p}$. Rozwiąż $3x^2 ${p >= 0 ? '+' + p : p} = ${k}$.` },
        { level: 3, text: `Punkty styczności: $x_0 = ${x0}$ i $x_1 = ${x1}$. Wyznacz $f(x_0)$ i $f(x_1)$, następnie napisz równania stycznych.` }
      ],
      solution: [
        { step: 1, title: 'Nachylenie stycznej', content: `\\text{Styczna równoległa do }${lineStr}\\text{ ma współczynnik kierunkowy }k = ${k}.`, explanation: '' },
        { step: 2, title: 'Pochodna', content: `f'(x) = 3x^2 ${p >= 0 ? '+' + p : p}`, explanation: '' },
        { step: 3, title: 'Równanie f\'(x₀) = k', content: `3x_0^2 ${p >= 0 ? '+' + p : p} = ${k}\\\\ 3x_0^2 = ${k - p}\\\\ x_0^2 = ${(k - p) / 3}\\\\ x_0 = ${x0}\\text{ lub }x_0 = ${x1}`, explanation: '' },
        { step: 4, title: 'Punkty i styczne', content: `f(${x0}) = ${f0},\\quad f(${x1}) = ${f1}\\\\ ${tang0}\\\\ ${tang1}`, explanation: '' }
      ]
    };
  }

  // === SCHEMAT D: styczna pod kątem α ===
  // Wzorzec matura 2018 z.6: y=3x²-1, styczna pod kątem 45°, f'(x₀)=tg(45°)=1
  function tangentAtAngle() {
    const CONFIGS = [
      {
        // f(x) = 3x²-1, kąt 45° → tg=1, f'(x)=6x=1, x₀=1/6 — brzydkie
        // f(x) = x²-3x+2, kąt 45° → f'(x)=2x-3=1 → x₀=2, f(2)=0, styczna y=x-2
        a: 1, b: -3, c: 2, angle: 45, tg_val: 1,
        fStr: 'x^2 - 3x + 2',
        fpStr: '2x - 3',
        x0: 2, f0: 0, tangStr: 'y = x - 2'
      },
      {
        // f(x) = x²+x, f'(x)=2x+1=3 → x₀=1, f(1)=2, styczna y=3x-1
        a: 1, b: 1, c: 0, angle: 71.6, tg_val: 3,
        fStr: 'x^2 + x',
        fpStr: '2x + 1',
        x0: 1, f0: 2, tangStr: 'y = 3x - 1',
        angleStr: '\\alpha$ gdzie $\\tan\\alpha = 3'
      },
      {
        // f(x) = x² + 2x - 3, f'(x) = 2x+2 = 0 → x₀=-1, f(-1)=-4, styczna y=-4 (pozioma)
        a: 1, b: 2, c: -3, angle: 0, tg_val: 0,
        fStr: 'x^2 + 2x - 3',
        fpStr: '2x + 2',
        x0: -1, f0: -4, tangStr: 'y = -4',
        angleStr: '0°\\text{ (pozioma styczna)}'
      },
      {
        // f(x) = x³-3x, f'(x)=3x²-3=9 → x²=4 → x=±2
        // f(2)=2, styczna y=9x-16; f(-2)=-2, styczna y=9x+16
        a3: 1, tg_val: 9,
        fStr: 'x^3 - 3x',
        fpStr: '3x^2 - 3',
        x0: 2, f0: 2, b0: -16, x1: -2, f1: -2, b1: 16,
        tangStr: 'y = 9x - 16\\text{ lub }y = 9x + 16',
        angleStr: '\\alpha$ gdzie $\\tan\\alpha = 9'
      }
    ];

    const cfg = M.choose(CONFIGS);

    let stmt;
    if (cfg.angleStr) {
      stmt = `Funkcja $f$ jest określona wzorem\n$$f(x) = ${cfg.fStr}$$\n` +
        `**Wyznacz równanie stycznej do wykresu funkcji $f$, która tworzy kąt $${cfg.angleStr}$ z osią $Ox$.** ` +
        `Zapisz obliczenia.`;
    } else {
      stmt = `Funkcja $f$ jest określona wzorem\n$$f(x) = ${cfg.fStr}$$\n` +
        `**Wyznacz równanie stycznej do wykresu funkcji $f$, która tworzy kąt $${cfg.angle}°$ z osią $Ox$.** ` +
        `Zapisz obliczenia.`;
    }

    return {
      id: M.makeId('cat04_angle'),
      category: 4,
      categoryName: 'Styczna do wykresu',
      type: 'tangent_angle',
      points: 4,
      params: cfg,
      statement: stmt,
      answer: {
        type: 'expression',
        display: cfg.tangStr,
        description: `$${cfg.tangStr}$`
      },
      hints: [
        { level: 1, text: `Nachylenie stycznej: $k = \\tan\\alpha = ${cfg.tg_val}$. Szukamy $x_0$, dla którego $f'(x_0) = ${cfg.tg_val}$.` },
        { level: 2, text: `$f'(x) = ${cfg.fpStr}$. Rozwiąż $${cfg.fpStr} = ${cfg.tg_val}$.` },
        { level: 3, text: `Punkt(y) styczności: $x_0 = ${cfg.x0}$. Oblicz $f(x_0)$ i napisz równanie prostej.` }
      ],
      solution: [
        { step: 1, title: 'Nachylenie', content: `k = \\tan(${cfg.angle}°) = ${cfg.tg_val}`, explanation: '' },
        { step: 2, title: 'Pochodna', content: `f'(x) = ${cfg.fpStr}`, explanation: '' },
        { step: 3, title: 'f\'(x₀) = k', content: `${cfg.fpStr} = ${cfg.tg_val}`, explanation: '' },
        { step: 4, title: 'Równanie stycznej', content: cfg.tangStr, explanation: '' }
      ]
    };
  }

  function generate() {
    return M.choose([polyTangent, rationalTangent, parallelTangent, tangentAtAngle])();
  }

  return { generate };
})();
