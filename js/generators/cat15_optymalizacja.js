// Kategoria 15: Optymalizacja (zadanie 2-częściowe)
// Wzorzec matura 2025 z.4+z.6: odczytaj z wykresu f', potem optymalizacja
// Wzorzec matura 2024 z.4+z.5: monotoniczność, ekstremum
// Wzorzec matura 2023 z.6: maksymalne pole prostokąta wpisanego w trójkąt
window.cat15 = (() => {
  const M = window.MathUtils;

  // === Zadanie optymalizacyjne: prostokąt wpisany w trójkąt ===
  function rectInTriangle() {
    // Trójkąt prostokątny z ramionami a, b; prostokąt wpisany w trójkąt
    const a = M.choose([4,6,8,10,12,15]);
    const b = M.choose([4,6,8,10,12,15]);
    // Prostokąt o bokach x i y wpisany: x/a + y/b = 1 → y = b(1-x/a)
    // Pole P(x) = x·b(1-x/a) = bx - bx²/a
    // P'(x) = b - 2bx/a = 0 → x = a/2
    // P_max = b·(a/2)·(1-1/2) = ab/4
    const x_opt = a / 2;
    const P_max = a * b / 4;

    return {
      id: M.makeId('cat15_rect_tri'),
      category: 15,
      categoryName: 'Optymalizacja',
      type: 'rect_in_triangle',
      points: 6,
      params: { a, b, x_opt, P_max },
      statement:
        `Dany jest trójkąt prostokątny z ramionami $a = ${a}$ i $b = ${b}$ (kąt prosty przy wierzchołku $C$). ` +
        `W trójkąt wpisany jest prostokąt tak, że jeden z jego boków leży na ramieniu $a$ (odcinku $CA$), ` +
        `a jeden wierzchołek leży na przeciwprostokątnej $AB$.\n\n` +
        `Oznaczmy przez $x$ długość boku prostokąta leżącego na ramieniu $a$.\n\n` +
        `**a)** Wyraź pole prostokąta jako funkcję $x$. Podaj dziedzinę tej funkcji.\n\n` +
        `**b)** Znajdź wartość $x$, dla której pole prostokąta jest największe, i oblicz to maksymalne pole.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x = ${x_opt},\\quad P_{\\max} = ${P_max}`,
        description: `Optymalne $x = ${x_opt}$, maksymalne pole $= ${P_max}$`
      },
      hints: [
        { level: 1, text: `Równanie przeciwprostokątnej: $\\frac{X}{${a}} + \\frac{Y}{${b}} = 1$, czyli $Y = ${b}\\left(1 - \\frac{X}{${a}}\\right)$.` },
        { level: 2, text: `Jeśli $x$ to długość boku na ramieniu $a$, to wysokość prostokąta $y = ${b}\\left(1 - \\frac{x}{${a}}\\right)$. Pole: $P(x) = x \\cdot y$.` },
        { level: 3, text: `$P(x) = ${b}x - \\frac{${b}}{${a}}x^2$. Ekstremum: $P'(x) = 0 \\implies x = \\frac{${a}}{2} = ${x_opt}$.` }
      ],
      solution: [
        { step: 1, title: 'Opis geometryczny', content: `\\text{Prostokąt ma bok } x \\in (0, ${a})\\text{ na ramieniu } a.`, explanation: '' },
        { step: 2, title: 'Wysokość prostokąta', content: `y = ${b}\\left(1 - \\frac{x}{${a}}\\right)`, explanation: 'Z równania prostej AB (przeciwprostokątnej).' },
        { step: 3, title: 'Funkcja pola', content: `P(x) = x \\cdot y = ${b}x\\left(1 - \\frac{x}{${a}}\\right) = ${b}x - \\frac{${b}}{${a}}x^2,\\quad x \\in (0, ${a})`, explanation: '' },
        { step: 4, title: 'Pochodna', content: `P'(x) = ${b} - \\frac{2\\cdot${b}}{${a}}x = ${b} - \\frac{${2*b}}{${a}}x`, explanation: '' },
        { step: 5, title: 'Punkt ekstremalny', content: `P'(x) = 0 \\implies x = \\frac{${a}}{2} = ${x_opt}`, explanation: '$P\'$ zmienia znak z + na −, więc to maksimum.' },
        { step: 6, title: 'Maksymalne pole', content: `P\\!\\left(${x_opt}\\right) = ${b}\\cdot${x_opt}\\cdot\\frac{1}{2} = ${P_max}`, explanation: '' }
      ]
    };
  }

  // === Optymalizacja: ogrodzenie ===
  function fencing() {
    // Prostokąt z jedną ścianą = ściana budynku, trzy strony ogrodzenia = L metrów
    const L = M.choose([50,60,80,100,120,150]);
    // P = x·y, 2x+y = L → y = L-2x, x∈(0,L/2)
    // P(x) = x(L-2x) = Lx - 2x², P'= L-4x=0 → x=L/4
    const x_opt = L / 4;
    const y_opt = L - 2 * x_opt;
    const P_max = x_opt * y_opt;

    return {
      id: M.makeId('cat15_fence'),
      category: 15,
      categoryName: 'Optymalizacja',
      type: 'fencing',
      points: 6,
      params: { L, x_opt, y_opt, P_max },
      statement:
        `Wzdłuż ściany budynku chcemy ogrodzić prostokątny plac. Ściana budynku stanowi jedną ` +
        `z czterech boków prostokąta (ta strona nie wymaga ogrodzenia). ` +
        `Łączna długość ogrodzenia (pozostałe trzy boki) wynosi $${L}$ m.\n\n` +
        `**a)** Wyraź pole placu jako funkcję $x$ — długości boku prostopadłego do budynku. Podaj dziedzinę.\n\n` +
        `**b)** Znajdź wymiary placu, dla których jego pole jest największe, i oblicz to pole.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x = ${x_opt},\\quad y = ${y_opt},\\quad P_{\\max} = ${P_max}`,
        description: `$x = ${x_opt}$, $y = ${y_opt}$, $P_{max} = ${P_max}\\,\\text{m}^2$`
      },
      hints: [
        { level: 1, text: `Trzy boki: $x + y + x = ${L}$, czyli $y = ${L} - 2x$.` },
        { level: 2, text: `Pole: $P(x) = x\\cdot(${L}-2x) = ${L}x - 2x^2$, gdzie $x \\in \\left(0, ${L/2}\\right)$.` },
        { level: 3, text: `$P'(x) = ${L} - 4x = 0 \\implies x = ${x_opt}$, $y = ${y_opt}$, $P_{max} = ${P_max}$.` }
      ],
      solution: [
        { step: 1, title: 'Zapis warunków', content: `2x + y = ${L} \\implies y = ${L} - 2x,\\quad x \\in \\left(0, ${L/2}\\right)`, explanation: '' },
        { step: 2, title: 'Funkcja pola', content: `P(x) = x\\cdot(${L}-2x) = ${L}x - 2x^2`, explanation: '' },
        { step: 3, title: 'Pochodna', content: `P'(x) = ${L} - 4x`, explanation: '' },
        { step: 4, title: 'Punkt ekstremalny', content: `P'(x) = 0 \\implies x = \\frac{${L}}{4} = ${x_opt}`, explanation: '' },
        { step: 5, title: 'Wymiary i pole', content: `y = ${L} - 2\\cdot${x_opt} = ${y_opt}\\\\ P_{\\max} = ${x_opt}\\cdot${y_opt} = ${P_max}\\,\\text{m}^2`, explanation: '' }
      ]
    };
  }

  // === Monotoniczność i ekstrema funkcji wielomianowej ===
  function polynomialExtreme() {
    // f(x) = ax³ + bx² + cx + d
    const x1 = M.choose([-3,-2,-1,0,1,2,3]);
    const x2 = x1 + M.choose([1,2,3,4]);
    const a = M.choose([1,-1,2,-2]);
    // f'(x) = 3a(x-x1)(x-x2) → f'(x) = 3a·(x²-(x1+x2)x+x1·x2)
    // f(x) = a·(x³ - 3/2(x1+x2)x² + 3x1x2·x) + const
    const fp_a = a;
    const fp_b = -a * (x1 + x2);
    const fp_c = a * x1 * x2;
    // f'(x) = 3fp_a·x² + 2fp_b·x + fp_c (derivative coefficients times 3,2,1)
    // Actually: if f'(x) = 3a(x-x1)(x-x2) = 3a(x²-(x1+x2)x+x1x2)
    // then f(x) = a·x³ - 3a/2(x1+x2)x² + 3ax1x2·x + d
    // For nice numbers, let's use: f(x) = x³ + px² + qx + r where f'(x) has roots x1, x2
    // f'(x) = 3x² + 2px + q, roots at x1,x2 → x1+x2 = -2p/3, x1x2 = q/3
    // Choose: a=1, f'(x) = 3(x-x1)(x-x2) = 3x² - 3(x1+x2)x + 3x1x2
    // So: 2p = -3(x1+x2) → p = -3(x1+x2)/2 (may not be integer)
    // Better: just define f directly:
    const p = -3 * (x1 + x2) / 2;
    const q = 3 * x1 * x2;
    if (!Number.isInteger(p)) return polynomialExtreme(); // retry for nice p

    const f = (x) => x*x*x + p*x*x + q*x;
    const f_x1 = f(x1);
    const f_x2 = f(x2);

    const fDisplay = `x^3 ${p >= 0 ? '+' + p : p}x^2 ${q >= 0 ? '+' + q : q}x`;
    const fpDisplay = `3x^2 ${2*p >= 0 ? '+' + 2*p : 2*p}x ${q >= 0 ? '+' + q : q}`;

    // x1 < x2 for a=1 (positive leading coeff): max at x1, min at x2
    const isMax1 = a > 0; // local max at x1, local min at x2

    // Kontekst słowny
    const polyCtx = M.choose([
      {
        intro: `Zysk pewnego przedsiębiorstwa (w tys. zł) w zależności od liczby $x$ (w tys.) wyprodukowanych jednostek opisuje wzór\n$$f(x) = ${fDisplay}$$`,
        varName: 'x', varUnit: 'tys. jednostek',
      },
      {
        intro: `Natężenie prądu $I$ (w mA) w pewnym obwodzie elektrycznym w chwili $x$ (w ms) wyraża się wzorem\n$$f(x) = ${fDisplay}$$`,
        varName: 'x', varUnit: 'ms',
      },
      {
        intro: `Stężenie produktu $C$ (w mol/dm³) pewnej reakcji chemicznej w chwili $x$ (w min) opisuje wzór\n$$f(x) = ${fDisplay}$$`,
        varName: 'x', varUnit: 'min',
      },
    ]);

    return {
      id: M.makeId('cat15_poly'),
      category: 15,
      categoryName: 'Optymalizacja',
      type: 'polynomial_extreme',
      points: 4,
      params: { p, q, x1, x2, f_x1, f_x2 },
      statement:
        `${polyCtx.intro}\n\n` +
        `**a)** Oblicz pochodną $f'(x)$.\n\n` +
        `**b)** Wyznacz przedziały monotoniczności funkcji $f$.\n\n` +
        `**c)** Wyznacz wartości ekstremalne funkcji $f$ (jeśli istnieją) i podaj ich interpretację.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `f'(x)=${fpDisplay},\\ x_{\\min}=${Math.max(x1,x2)},\\ x_{\\max}=${Math.min(x1,x2)}`,
        description: `Ekstrema w $x_1=${x1}$ i $x_2=${x2}$`
      },
      hints: [
        { level: 1, text: `Oblicz pochodną: $f'(x) = 3x^2 + ${2*p}x + ${q}$.` },
        { level: 2, text: `Rozwiąż $f'(x)=0$: pierwiastki to $x_1=${x1}$ i $x_2=${x2}$.` },
        { level: 3, text: `Analizuj znak $f'$: rosnąca gdy $f'>0$, malejąca gdy $f'<0$. Oblicz $f(${x1})$ i $f(${x2})$.` }
      ],
      solution: [
        { step: 1, title: 'Pochodna', content: `f'(x) = 3x^2 ${2*p >= 0 ? '+' + 2*p : 2*p}x + ${q}`, explanation: '' },
        { step: 2, title: 'Miejsca zerowe f\'', content: `f'(x) = 3(x-${x1})(x-${x2}) = 0 \\implies x = ${x1}\\text{ lub }x = ${x2}`, explanation: '' },
        { step: 3, title: 'Monotoniczność (a > 0)', content:
          x1 < x2
            ? `f\\text{ rosnąca na }(-\\infty,${x1}),\\text{ malejąca na }(${x1},${x2}),\\text{ rosnąca na }(${x2},+\\infty)`
            : `f\\text{ malejąca na }(-\\infty,${x2}),\\text{ rosnąca na }(${x2},${x1}),\\text{ malejąca na }(${x1},+\\infty)`,
          explanation: '' },
        { step: 4, title: 'Ekstrema', content:
          `f(${x1}) = ${f_x1}\\text{ — ekstremum lokalne (max dla }a>0\\text{)}\\\\ f(${x2}) = ${f_x2}\\text{ — ekstremum lokalne (min dla }a>0\\text{)}`,
          explanation: '' }
      ]
    };
  }

  // === Prostokąt wpisany w półkole ===
  // Wzorzec maturalny 8/10: jeden bok na średnicy, dwa narożniki na półokręgu
  // P(x) = 2x√(R²-x²), P'=0 → x=R/√2, P_max=R²
  // Wymaga: pochodnej funkcji z pierwiastkiem, analizy znaku P'
  function rectInSemicircle() {
    const configs = [
      { R: 4, R2: 16, P_max: 16, x_opt_str: '2\\sqrt{2}', x_opt_num: 4/Math.SQRT2 },
      { R: 5, R2: 25, P_max: 25, x_opt_str: '\\dfrac{5\\sqrt{2}}{2}', x_opt_num: 5/Math.SQRT2 },
      { R: 6, R2: 36, P_max: 36, x_opt_str: '3\\sqrt{2}', x_opt_num: 6/Math.SQRT2 },
      { R: 8, R2: 64, P_max: 64, x_opt_str: '4\\sqrt{2}', x_opt_num: 8/Math.SQRT2 },
      { R: 10, R2: 100, P_max: 100, x_opt_str: '5\\sqrt{2}', x_opt_num: 10/Math.SQRT2 },
    ];
    const cfg = M.choose(configs);
    const { R, R2, P_max, x_opt_str } = cfg;

    return {
      id: M.makeId('cat15_semicircle'),
      category: 15,
      categoryName: 'Optymalizacja',
      type: 'rect_in_semicircle',
      points: 6,
      params: { R, R2, P_max },
      statement:
        `W półkolu o promieniu $R = ${R}$ wpisano prostokąt tak, że jeden bok prostokąta leży ` +
        `na średnicy półkola (w całości wewnątrz półkola), a pozostałe dwa górne narożniki ` +
        `leżą na półokręgu.\n\n` +
        `Oznaczamy przez $x$ połowę długości prostokąta ($0 < x < ${R}$).\n\n` +
        `**a)** Wyraź pole prostokąta jako funkcję $P(x)$. Podaj dziedzinę.\n\n` +
        `**b)** Oblicz pochodną $P'(x)$ i wyznacz wartość $x$, dla której pole jest największe.\n\n` +
        `**c)** Oblicz maksymalne pole prostokąta. Zapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x = ${x_opt_str},\\quad P_{\\max} = ${P_max}`,
        description: `Optymalne $x = ${x_opt_str}$, maksymalne pole $= ${P_max}$`
      },
      hints: [
        { level: 1, text: `Wierzchołek $(x, y)$ leży na okręgu: $x^2 + y^2 = ${R2}$, więc wysokość prostokąta $y = \\sqrt{${R2}-x^2}$. Długość podstawy $= 2x$. Pole: $P(x) = 2x\\sqrt{${R2}-x^2}$.` },
        { level: 2, text: `$P'(x) = 2\\sqrt{${R2}-x^2} + 2x\\cdot\\dfrac{-x}{\\sqrt{${R2}-x^2}} = \\dfrac{2(${R2}-2x^2)}{\\sqrt{${R2}-x^2}}$.` },
        { level: 3, text: `$P'(x) = 0 \\iff ${R2}-2x^2 = 0 \\iff x = \\dfrac{${R}}{\\sqrt{2}} = ${x_opt_str}$. Wtedy $P_{\\max} = 2\\cdot\\dfrac{${R}}{\\sqrt{2}}\\cdot\\dfrac{${R}}{\\sqrt{2}} = ${P_max}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Opis geometryczny',
          content: `\\text{Narożniki: } (-x,0),\\;(x,0),\\;(x,y),\\;(-x,y)\\text{ gdzie }(x,y)\\text{ na półokręgu}.`,
          explanation: ''
        },
        {
          step: 2, title: 'Funkcja pola',
          content: `y = \\sqrt{${R2}-x^2},\\quad P(x) = 2x\\cdot y = 2x\\sqrt{${R2}-x^2},\\quad x\\in(0,${R})`,
          explanation: '$x^2+y^2 = R^2$ — równanie okręgu.'
        },
        {
          step: 3, title: 'Pochodna P\'(x)',
          content: `P'(x) = 2\\sqrt{${R2}-x^2} + 2x\\cdot\\frac{-x}{\\sqrt{${R2}-x^2}} = \\frac{2(${R2}-x^2) - 2x^2}{\\sqrt{${R2}-x^2}} = \\frac{2(${R2}-2x^2)}{\\sqrt{${R2}-x^2}}`,
          explanation: 'Reguła iloczynu: $(uv)\'=u\'v+uv\'$.'
        },
        {
          step: 4, title: 'Punkt krytyczny',
          content: `P'(x) = 0 \\iff ${R2}-2x^2 = 0 \\iff x^2 = \\frac{${R2}}{2} \\iff x = \\frac{${R}}{\\sqrt{2}} = ${x_opt_str}`,
          explanation: 'Liczymy $x > 0$.'
        },
        {
          step: 5, title: 'Weryfikacja maksimum (analiza znaku P\')',
          content: `x < ${x_opt_str}:\\; ${R2}-2x^2 > 0 \\implies P'(x) > 0\\text{ (P rośnie)}\\\\ x > ${x_opt_str}:\\; ${R2}-2x^2 < 0 \\implies P'(x) < 0\\text{ (P maleje)}\\\\ \\text{Zmiana znaku }+\\to-\\implies\\text{ maksimum}.`,
          explanation: ''
        },
        {
          step: 6, title: 'Maksymalne pole',
          content: `P_{\\max} = 2\\cdot\\frac{${R}}{\\sqrt{2}}\\cdot\\sqrt{${R2}-\\frac{${R2}}{2}} = 2\\cdot\\frac{${R}}{\\sqrt{2}}\\cdot\\frac{${R}}{\\sqrt{2}} = 2\\cdot\\frac{${R2}}{2} = \\mathbf{${P_max}}`,
          explanation: ''
        }
      ]
    };
  }

  // === Walec wpisany w stożek: maksymalizacja pola powierzchni bocznej walca ===
  // Wzorzec maturalny 8-9/10: stożek r=R, h=H; walec r_w, h_w = H(1-r_w/R)
  // Pole boczne walca Sb = 2π·r_w·h_w = 2πH·r_w(1-r_w/R)
  // Sb'=0 → r_w = R/2, h_w = H/2, Sb_max = π·R·H/2
  function cylinderLateralInCone() {
    const configs = [
      { R: 6, H: 8, r_opt: 3, h_opt: 4, Sb_num: 24, Sb_str: '24\\pi' },
      { R: 4, H: 6, r_opt: 2, h_opt: 3, Sb_num: 12, Sb_str: '12\\pi' },
      { R: 10, H: 12, r_opt: 5, h_opt: 6, Sb_num: 60, Sb_str: '60\\pi' },
      { R: 8, H: 10, r_opt: 4, h_opt: 5, Sb_num: 40, Sb_str: '40\\pi' },
      { R: 6, H: 10, r_opt: 3, h_opt: 5, Sb_num: 30, Sb_str: '30\\pi' },
    ];

    const cfg = M.choose(configs);
    const { R, H, r_opt, h_opt, Sb_num, Sb_str } = cfg;

    return {
      id: M.makeId('cat15_cyl_cone'),
      category: 15,
      categoryName: 'Optymalizacja',
      type: 'cylinder_lateral_in_cone',
      points: 6,
      params: { R, H, r_opt, h_opt, Sb_num },
      statement:
        `W stożku o promieniu podstawy $R = ${R}$ i wysokości $H = ${H}$ wpisano walec tak, ` +
        `że podstawa walca leży na podstawie stożka, a górna krawędź walca dotyka powierzchni ` +
        `bocznej stożka. Oznaczamy przez $r$ promień podstawy walca ($0 < r < ${R}$).\n\n` +
        `**a)** Korzystając z podobieństwa trójkątów, wyraź wysokość walca $h$ jako funkcję $r$ ` +
        `oraz zapisz pole powierzchni bocznej walca $S_b(r) = 2\\pi r h$.\n\n` +
        `**b)** Wyznacz $r$, dla którego $S_b(r)$ jest największe. Oblicz maksymalne $S_b$.\n\n` +
        `**c)** Oblicz wymiary walca o największym polu bocznym. Zapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `r = ${r_opt},\\quad h = ${h_opt},\\quad S_{b,\\max} = ${Sb_str}`,
        description: `$r = ${r_opt}$, $h = ${h_opt}$, $S_{b,\\max} = ${Sb_str}$`
      },
      hints: [
        { level: 1, text: `Podobieństwo trójkątów w przekroju: $\\dfrac{R-r}{R} = \\dfrac{h}{H}$, więc $h = H\\left(1-\\dfrac{r}{R}\\right) = ${H}\\left(1-\\dfrac{r}{${R}}\\right)$.` },
        { level: 2, text: `$S_b(r) = 2\\pi r\\cdot${H}\\!\\left(1-\\dfrac{r}{${R}}\\right) = 2\\pi${H}\\!\\left(r - \\dfrac{r^2}{${R}}\\right)$. Pochodna: $S_b'(r) = 2\\pi${H}\\!\\left(1 - \\dfrac{2r}{${R}}\\right)$.` },
        { level: 3, text: `$S_b'(r) = 0 \\implies r = \\dfrac{${R}}{2} = ${r_opt}$. Wtedy $h = ${H}\\!\\left(1-\\dfrac{1}{2}\\right) = ${h_opt}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Wysokość walca (podobieństwo trójkątów)',
          content: `\\frac{R-r}{R} = \\frac{h}{H} \\implies h = H\\left(1-\\frac{r}{R}\\right) = ${H}\\left(1-\\frac{r}{${R}}\\right)`,
          explanation: 'Przekrój osiowy: dwa podobne trójkąty prostokątne.'
        },
        {
          step: 2, title: 'Funkcja pola bocznego',
          content: `S_b(r) = 2\\pi r h = 2\\pi r\\cdot${H}\\left(1-\\frac{r}{${R}}\\right) = \\frac{2\\pi${H}}{${R}}\\left(${R}r-r^2\\right), \\quad r\\in(0,${R})`,
          explanation: ''
        },
        {
          step: 3, title: 'Pochodna',
          content: `S_b'(r) = \\frac{2\\pi${H}}{${R}}(${R}-2r) = 2\\pi${H}\\left(1-\\frac{2r}{${R}}\\right)`,
          explanation: ''
        },
        {
          step: 4, title: 'Punkt optymalny',
          content: `S_b'(r) = 0 \\implies ${R}-2r = 0 \\implies r = \\frac{${R}}{2} = ${r_opt}`,
          explanation: `$S_b'' = -\\frac{4\\pi${H}}{${R}} < 0$ — potwierdzenie maksimum.`
        },
        {
          step: 5, title: 'Wymiary walca',
          content: `h = ${H}\\left(1-\\frac{${r_opt}}{${R}}\\right) = ${H}\\cdot\\frac{1}{2} = ${h_opt}`,
          explanation: ''
        },
        {
          step: 6, title: 'Maksymalne pole boczne',
          content: `S_{b,\\max} = 2\\pi\\cdot${r_opt}\\cdot${h_opt} = \\mathbf{${Sb_str}}`,
          explanation: 'Walec o największym polu bocznym wpisany w stożek ma $r = R/2$ i $h = H/2$.'
        }
      ]
    };
  }

  function generate() {
    // rectInSemicircle (8/10) i cylinderLateralInCone (8/10) — nowe schematy maturalne
    // rectInTriangle (6-7/10) zostawiony dla różnorodności
    return M.choose([rectInSemicircle, cylinderLateralInCone, rectInSemicircle, cylinderLateralInCone, rectInTriangle])();
  }

  return { generate };
})();
