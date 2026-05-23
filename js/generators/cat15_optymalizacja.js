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

  function generate() {
    return M.choose([rectInTriangle, fencing, polynomialExtreme])();
  }

  return { generate };
})();
