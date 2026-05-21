// Kategoria 16: Zadania 6-punktowe — optymalizacja złożona z treścią
// Wzorzec matura 2025 z.14, 2024 z.13, 2023 z.11, 2022 z.13, 2019 z.10
// Schemat: (a) wyraź funkcję celu, (b) znajdź optimum, (c) zweryfikuj / oblicz pochodną
window.cat16 = (() => {
  const M = window.MathUtils;

  // ─── 1. Puszka cylindryczna: minimalizacja zużycia blachy ───────────────
  // Wzorzec: dana objętość V₀, minimalizuj pole powierzchni całkowitej
  // S(r) = 2πr² + 2πrh = 2πr² + 2V₀/r, S'=0 → r³ = V₀/(2π) → h = 2r
  function cylinderContainer() {
    // Wybieramy V₀ = 2πr³ dla ładnych r
    const configs = [
      { r: 3, h: 6, V_coeff: 54, V_str: '54\\pi' },
      { r: 4, h: 8, V_coeff: 128, V_str: '128\\pi' },
      { r: 5, h: 10, V_coeff: 250, V_str: '250\\pi' },
      { r: 6, h: 12, V_coeff: 432, V_str: '432\\pi' },
    ];
    const cfg = M.choose(configs);
    const { r, h, V_coeff, V_str } = cfg;
    const S_min = 2 * r * r + 2 * r * h; // bez π

    const contexts = [
      { who: 'Producent napojów projektuje puszki aluminiowe', what: 'każda puszka', unit: 'cm' },
      { who: 'Firma farmaceutyczna produkuje cylindryczne pojemniki na tabletki', what: 'każdy pojemnik', unit: 'cm' },
      { who: 'Zakład metalurgiczny wytwarza cylindryczne pojemniki na farbę', what: 'każdy pojemnik', unit: 'dm' },
    ];
    const ctx = M.choose(contexts);

    return {
      id: M.makeId('cat16_cyl'),
      category: 16,
      categoryName: 'Zadania 6-punktowe',
      type: 'cylinder_optimization',
      points: 6,
      params: { r, h, V_coeff, S_min },
      statement:
        `${ctx.who}. ${ctx.what.charAt(0).toUpperCase() + ctx.what.slice(1)} ma kształt walca ` +
        `o objętości $${V_str}$ ${ctx.unit}³. Oznaczmy przez $r$ promień podstawy (w ${ctx.unit}), ` +
        `a przez $h$ wysokość walca (w ${ctx.unit}).\n\n` +
        `**a)** Wyraź $h$ jako funkcję $r$ oraz zapisz całkowite pole powierzchni walca $S(r)$ ` +
        `jako funkcję samego $r$ dla $r > 0$.\n\n` +
        `**b)** Wyznacz wartość $r$, dla której $S(r)$ osiąga minimum. Oblicz odpowiadającą mu ` +
        `wysokość $h$ oraz minimalne zużycie blachy $S_{\\min}$ (bez czynnika $\\pi$).\n\n` +
        `**c)** Udowodnij, że wyznaczony punkt jest minimum (zbadaj znak $S'(r)$). ` +
        `Sformułuj wniosek geometryczny.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `r = ${r},\\quad h = ${h},\\quad S_{\\min} = ${S_min}\\pi`,
        description: `$r = ${r}$ ${ctx.unit}, $h = ${h}$ ${ctx.unit}, $S_{\\min} = ${S_min}\\pi$ ${ctx.unit}²`
      },
      hints: [
        { level: 1, text: `Z $\\pi r^2 h = ${V_str}$ wyznacz $h = \\dfrac{${V_coeff}}{r^2}$. Następnie $S(r) = 2\\pi r^2 + 2\\pi r h = 2\\pi r^2 + \\dfrac{${2 * V_coeff}\\pi}{r}$.` },
        { level: 2, text: `$S'(r) = 4\\pi r - \\dfrac{${2 * V_coeff}\\pi}{r^2}$. Przyrównaj do 0: $4r^3 = ${2 * V_coeff}$, skąd $r^3 = ${V_coeff / 2}$.` },
        { level: 3, text: `$r^3 = ${V_coeff / 2} \\implies r = ${r}$. Wtedy $h = \\dfrac{${V_coeff}}{${r * r}} = ${h} = 2r$. Wniosek: **optymalna puszka ma wysokość równą średnicy** ($h = 2r$).` }
      ],
      solution: [
        {
          step: 1, title: 'Wyrażenie h przez r',
          content: `V = \\pi r^2 h = ${V_str} \\implies h = \\frac{${V_coeff}}{r^2}`,
          explanation: 'Wyznaczamy h z warunku na objętość.'
        },
        {
          step: 2, title: 'Funkcja celu S(r)',
          content: `S(r) = 2\\pi r^2 + 2\\pi r \\cdot \\frac{${V_coeff}}{r^2} = 2\\pi r^2 + \\frac{${2 * V_coeff}\\pi}{r}, \\quad r > 0`,
          explanation: 'Pole całkowite walca = 2 podstawy + powierzchnia boczna.'
        },
        {
          step: 3, title: 'Pochodna i punkt krytyczny',
          content: `S'(r) = 4\\pi r - \\frac{${2 * V_coeff}\\pi}{r^2} = \\frac{\\pi(4r^3 - ${2 * V_coeff})}{r^2}`,
          explanation: ''
        },
        {
          step: 4, title: 'Rozwiązanie S\'(r) = 0',
          content: `4r^3 = ${2 * V_coeff} \\implies r^3 = ${V_coeff / 2} \\implies r = \\sqrt[3]{${V_coeff / 2}} = ${r}`,
          explanation: `$(${r})^3 = ${Math.pow(r, 3)} = ${V_coeff / 2}$.`
        },
        {
          step: 5, title: 'Weryfikacja (znak S\')',
          content: `r < ${r}: \\; 4r^3 < ${2 * V_coeff} \\implies S'(r) < 0 \\text{ (S maleje)}\\\\ r > ${r}: \\; 4r^3 > ${2 * V_coeff} \\implies S'(r) > 0 \\text{ (S rośnie)}\\\\ \\text{Zatem } r = ${r} \\text{ daje minimum.}`,
          explanation: ''
        },
        {
          step: 6, title: 'Optymalne wymiary i wniosek',
          content: `h = \\frac{${V_coeff}}{${r}^2} = \\frac{${V_coeff}}{${r * r}} = ${h} = 2r\\\\ S_{\\min} = 2\\pi\\cdot${r}^2 + \\frac{${2 * V_coeff}\\pi}{${r}} = ${2 * r * r}\\pi + ${2 * V_coeff / r}\\pi = \\mathbf{${S_min}\\pi}`,
          explanation: `**Wniosek geometryczny:** Minimalne zużycie materiału osiągane jest gdy $h = 2r$, czyli wysokość walca równa się jego średnicy.`
        }
      ]
    };
  }

  // ─── 2. Pudełko z arkusza blachy: maksymalizacja objętości ──────────────
  // Z prostokątnej kartki L×L wycinamy kwadraty x×x z rogów i składamy pudełko
  // V(x) = x(L-2x)², V'(x) = (L-2x)(L-6x), x_opt = L/6
  function boxFromSheet() {
    const Ls = [12, 18, 24, 30, 36];
    const L = M.choose(Ls);
    const x_opt = L / 6;
    const dim = L - 2 * x_opt; // bok pudełka = 2L/3
    const V_max = x_opt * dim * dim; // (L/6)(2L/3)² = 2L³/27

    return {
      id: M.makeId('cat16_box'),
      category: 16,
      categoryName: 'Zadania 6-punktowe',
      type: 'box_from_sheet',
      points: 6,
      params: { L, x_opt, dim, V_max },
      statement:
        `Z kwadratowej blachy stalowej o boku $${L}$ cm wytwarza się otwarte pudełko ` +
        `(bez wieka) w następujący sposób: z każdego narożnika wycina się kwadrat o boku $x$ cm ` +
        `$(0 < x < ${L / 2})$, a pozostałe cztery ściany zgina się do góry.\n\n` +
        `**a)** Wyraź objętość pudełka $V$ jako funkcję $x$. Podaj dziedzinę tej funkcji.\n\n` +
        `**b)** Wyznacz wartość $x$, dla której objętość pudełka jest największa, ` +
        `i oblicz tę maksymalną objętość.\n\n` +
        `**c)** Sformułuj odpowiedź: jakie są wymiary pudełka o największej objętości?\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x = ${x_opt},\\quad V_{\\max} = ${V_max}\\text{ cm}^3`,
        description: `$x = ${x_opt}$ cm, wymiary: $${dim}\\times${dim}\\times${x_opt}$, $V_{\\max} = ${V_max}$ cm³`
      },
      hints: [
        { level: 1, text: `Po wycięciu narożników i złożeniu: długość i szerokość dna $= L - 2x = ${L} - 2x$, wysokość $= x$. Zatem $V(x) = x(${L}-2x)^2$.` },
        { level: 2, text: `$V'(x) = (${L}-2x)^2 + x\\cdot 2(${L}-2x)\\cdot(-2) = (${L}-2x)[(${L}-2x)-4x] = (${L}-2x)(${L}-6x)$.` },
        { level: 3, text: `$V'(x) = 0 \\iff x = ${L / 2}$ (poza dziedziną) lub $x = ${x_opt}$. Sprawdź znak $V'$: maksimum w $x = ${x_opt}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Funkcja objętości',
          content: `V(x) = x\\cdot(${L}-2x)\\cdot(${L}-2x) = x(${L}-2x)^2, \\quad x \\in \\left(0,\\, ${L / 2}\\right)`,
          explanation: 'Po złożeniu: podstawa dna to $(L-2x)\\times(L-2x)$, wysokość to $x$.'
        },
        {
          step: 2, title: 'Pochodna V\'(x)',
          content: `V'(x) = (${L}-2x)^2 + x\\cdot 2(${L}-2x)\\cdot(-2) = (${L}-2x)\\bigl[(${L}-2x) - 4x\\bigr] = (${L}-2x)(${L}-6x)`,
          explanation: 'Reguła iloczynu: $(uv)\'=u\'v+uv\'$.'
        },
        {
          step: 3, title: 'Miejsca zerowe V\'',
          content: `V'(x) = 0 \\iff ${L}-2x = 0\\text{ lub }${L}-6x = 0 \\iff x = ${L / 2}\\text{ (spoza dziedziny)}\\text{ lub }x = \\frac{${L}}{6} = ${x_opt}`,
          explanation: `Jedyny punkt krytyczny w $(0,\\,${L / 2})$ to $x = ${x_opt}$.`
        },
        {
          step: 4, title: 'Analiza znaku V\'',
          content: `x \\in (0,${x_opt}):\\; (${L}-2x)>0,\\;(${L}-6x)>0 \\implies V'>0\\text{ (rośnie)}\\\\ x \\in (${x_opt},${L / 2}):\\; (${L}-2x)>0,\\;(${L}-6x)<0 \\implies V'<0\\text{ (maleje)}`,
          explanation: 'Zmiana znaku + → − potwierdza maksimum.'
        },
        {
          step: 5, title: 'Maksymalna objętość',
          content: `V(${x_opt}) = ${x_opt}\\cdot(${L}-${2 * x_opt})^2 = ${x_opt}\\cdot${dim}^2 = ${x_opt}\\cdot${dim * dim} = \\mathbf{${V_max}\\text{ cm}^3}`,
          explanation: ''
        },
        {
          step: 6, title: 'Wymiary pudełka',
          content: `\\text{Dno: }${dim}\\text{ cm}\\times${dim}\\text{ cm},\\quad \\text{wysokość: }${x_opt}\\text{ cm}\\\\ V_{\\max} = ${V_max}\\text{ cm}^3`,
          explanation: 'Pudełko z największą objętością ma boki dna równe $\\frac{2}{3}L$ i wysokość $\\frac{1}{6}L$.'
        }
      ]
    };
  }

  // ─── 3. Walec wpisany w stożek: maksymalizacja objętości walca ──────────
  // Stożek: promień R, wysokość H. Walec: promień r, wysokość h.
  // Podobne trójkąty: r/R = (H-h)/H → h = H(1-r/R)
  // V(r) = πr²H(1-r/R), V'=0 → r = 2R/3, h = H/3, V_max = 4πR²H/27
  function cylinderInCone() {
    const configs = [
      { R: 6, H: 9,  r_opt: 4, h_opt: 3  },
      { R: 3, H: 6,  r_opt: 2, h_opt: 2  },
      { R: 9, H: 12, r_opt: 6, h_opt: 4  },
      { R: 6, H: 12, r_opt: 4, h_opt: 4  },
    ];
    const cfg = M.choose(configs);
    const { R, H, r_opt, h_opt } = cfg;
    // V_max = π·r²·h = π·(2R/3)²·(H/3) = 4πR²H/27
    const V_max_num = 4 * R * R * H; // V = V_max_num·π/27
    const g = (function gcd(a,b){return b===0?a:gcd(b,a%b);})(V_max_num, 27);
    const Vn = V_max_num / g, Vd = 27 / g;
    const V_str = Vd === 1 ? `${Vn}\\pi` : `\\dfrac{${Vn}\\pi}{${Vd}}`;

    return {
      id: M.makeId('cat16_cone_cyl'),
      category: 16,
      categoryName: 'Zadania 6-punktowe',
      type: 'cylinder_in_cone',
      points: 6,
      params: { R, H, r_opt, h_opt, V_max_num },
      statement:
        `Stożkowy silos o promieniu podstawy $R = ${R}$ m i wysokości $H = ${H}$ m stoi ` +
        `pionowo. Wewnątrz silosa wpisano walec cylindryczny tak, że podstawa walca ` +
        `leży na podstawie stożka, a krawędź górnej podstawy walca dotyka powierzchni ` +
        `bocznej stożka.\n\n` +
        `Oznaczmy przez $r$ promień podstawy walca i przez $h$ jego wysokość (w metrach).\n\n` +
        `**a)** Korzystając z podobieństwa trójkątów, wyraź $h$ jako funkcję $r$ ` +
        `(gdzie $0 < r < ${R}$) oraz zapisz objętość walca $V(r)$.\n\n` +
        `**b)** Wyznacz $r$, dla którego $V(r)$ osiąga wartość największą. ` +
        `Oblicz maksymalną objętość walca.\n\n` +
        `**c)** Jaki jest stosunek maksymalnej objętości walca do objętości stożka?\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `r = ${r_opt},\\; h = ${h_opt},\\; V_{\\max} = ${V_str}`,
        description: `$r = ${r_opt}$ m, $h = ${h_opt}$ m, $V_{\\max} = ${V_str}$ m³, stosunek = $\\frac{4}{9}$`
      },
      hints: [
        { level: 1, text: `Rozważ przekrój osiowy stożka: trójkąt o podstawie $2R$ i wysokości $H$. Walec tworzy prostokąt w tym przekroju. Z podobieństwa trójkątów: $\\dfrac{R-r}{R} = \\dfrac{h}{H}$, skąd $h = H\\left(1-\\dfrac{r}{R}\\right)$.` },
        { level: 2, text: `$V(r) = \\pi r^2 H\\left(1-\\dfrac{r}{R}\\right) = \\pi H\\left(r^2 - \\dfrac{r^3}{R}\\right)$. Oblicz $V'(r) = \\pi H\\left(2r - \\dfrac{3r^2}{R}\\right)$.` },
        { level: 3, text: `$V'(r) = \\pi Hr\\left(2 - \\dfrac{3r}{R}\\right) = 0 \\implies r = \\dfrac{2R}{3} = ${r_opt}$. Wtedy $h = \\dfrac{H}{3} = ${h_opt}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Wyznaczenie h przez podobieństwo',
          content: `\\text{Przekrój osiowy: trójkąt podobny.}\\quad \\frac{R-r}{R} = \\frac{h}{H} \\implies h = H\\cdot\\frac{R-r}{R} = ${H}\\left(1-\\frac{r}{${R}}\\right)`,
          explanation: 'Górna krawędź walca (punkt na boku stożka) dzieli bok stożka proporcjonalnie.'
        },
        {
          step: 2, title: 'Funkcja objętości',
          content: `V(r) = \\pi r^2 h = \\pi r^2 \\cdot ${H}\\left(1-\\frac{r}{${R}}\\right) = ${H}\\pi\\left(r^2 - \\frac{r^3}{${R}}\\right), \\quad r \\in (0, ${R})`,
          explanation: ''
        },
        {
          step: 3, title: 'Pochodna',
          content: `V'(r) = ${H}\\pi\\left(2r - \\frac{3r^2}{${R}}\\right) = ${H}\\pi r\\left(2 - \\frac{3r}{${R}}\\right)`,
          explanation: ''
        },
        {
          step: 4, title: 'Punkt krytyczny',
          content: `V'(r) = 0 \\iff r = 0\\text{ (granica dz.)}\\text{ lub }2 - \\frac{3r}{${R}} = 0 \\iff r = \\frac{2\\cdot${R}}{3} = ${r_opt}`,
          explanation: ''
        },
        {
          step: 5, title: 'Weryfikacja i maksimum',
          content: `r < ${r_opt}: V'> 0;\\quad r > ${r_opt}: V'< 0 \\implies \\text{maksimum w } r = ${r_opt}\\\\ h = ${H}\\left(1-\\frac{${r_opt}}{${R}}\\right) = ${H}\\cdot\\frac{1}{3} = ${h_opt}\\\\ V_{\\max} = \\pi\\cdot${r_opt}^2\\cdot${h_opt} = ${r_opt * r_opt * h_opt}\\pi = ${V_str}`,
          explanation: ''
        },
        {
          step: 6, title: 'Stosunek objętości',
          content: `V_{\\text{stożek}} = \\frac{1}{3}\\pi R^2 H = \\frac{1}{3}\\pi\\cdot${R}^2\\cdot${H} = \\frac{${R * R * H}\\pi}{3}\\\\ \\frac{V_{\\max}}{V_{\\text{stożek}}} = \\frac{${V_str}}{\\frac{${R * R * H}\\pi}{3}} = \\frac{4\\pi R^2H/27}{\\pi R^2H/3} = \\frac{4}{27}\\cdot 3 = \\mathbf{\\frac{4}{9}}`,
          explanation: 'Maksymalny walec wpisany w stożek zajmuje zawsze $\\frac{4}{9}$ objętości stożka — niezależnie od wymiarów!'
        }
      ]
    };
  }

  // ─── 4. Ogrodzenie z przegrodą: maksymalizacja pola ─────────────────────
  // Prostokąt podzielony przegrodą || krótszego boku
  // L = 3x + 2y (2 długie + 2 krótkie + 1 przegroda = 3x+2y), P = xy
  // y = (L-3x)/2, P(x) = x(L-3x)/2, P'=0 → x=L/6, y=L/4, P_max=L²/24
  function fencingWithPartition() {
    const Ls = [120, 180, 240, 300, 360];
    const L = M.choose(Ls);
    const x_opt = L / 6;
    const y_opt = L / 4;
    const P_max = L * L / 24;

    const contexts = [
      { who: 'Hodowca kóz', what: 'prostokątne pastwisko', div: 'na dwa równe kwadraty', where: 'z jedną przegrodą wewnętrzną' },
      { who: 'Ogrodnik', what: 'prostokątny ogród warzywny', div: 'na dwie równe grządki', where: 'z jedną przegrodą równoległą do krótszego boku' },
      { who: 'Zarządca stadniny', what: 'prostokątny wybieg dla koni', div: 'na dwa oddzielne boksy', where: 'z jedną ścianką działową' },
    ];
    const ctx = M.choose(contexts);

    return {
      id: M.makeId('cat16_fence_div'),
      category: 16,
      categoryName: 'Zadania 6-punktowe',
      type: 'fencing_partition',
      points: 6,
      params: { L, x_opt, y_opt, P_max },
      statement:
        `${ctx.who} chce ogrodzić ${ctx.what} ${ctx.where}. ` +
        `Do dyspozycji jest $${L}$ m siatki ogrodzeniowej. ` +
        `Całość siatki zostanie użyta na dwa boki o długości $x$ m (krótsze boki + przegroda) ` +
        `i dwa boki o długości $y$ m (długie boki prostokąta).\n\n` +
        `**a)** Wyraź $y$ przez $x$ i zapisz pole $P(x)$ całego obszaru jako funkcję $x$. ` +
        `Podaj dziedzinę.\n\n` +
        `**b)** Wyznacz wymiary prostokąta, dla których pole jest największe.\n\n` +
        `**c)** Oblicz to maksymalne pole i sprawdź, czy cała siatka została wykorzystana.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x = ${x_opt},\\quad y = ${y_opt},\\quad P_{\\max} = ${P_max}\\text{ m}^2`,
        description: `$x = ${x_opt}$ m, $y = ${y_opt}$ m, $P_{\\max} = ${P_max}$ m²`
      },
      hints: [
        { level: 1, text: `Siatka: 3 odcinki długości $x$ (2 krótkie boki + 1 przegroda) + 2 odcinki długości $y$. Łącznie: $3x + 2y = ${L}$, czyli $y = \\dfrac{${L}-3x}{2}$.` },
        { level: 2, text: `$P(x) = x \\cdot y = x\\cdot\\dfrac{${L}-3x}{2} = \\dfrac{${L}x - 3x^2}{2}$, dziedzina $x \\in \\left(0,\\, ${L / 3}\\right)$.` },
        { level: 3, text: `$P'(x) = \\dfrac{${L} - 6x}{2} = 0 \\implies x = ${x_opt}$, $y = ${y_opt}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Równanie wiążące x i y',
          content: `3x + 2y = ${L} \\implies y = \\frac{${L} - 3x}{2}, \\quad x \\in \\left(0,\\, \\frac{${L}}{3}\\right) = \\left(0,\\, ${L / 3}\\right)`,
          explanation: 'Trzy odcinki x (2 boki + przegroda) i dwa odcinki y.'
        },
        {
          step: 2, title: 'Funkcja pola',
          content: `P(x) = x \\cdot \\frac{${L}-3x}{2} = \\frac{${L}x - 3x^2}{2}`,
          explanation: ''
        },
        {
          step: 3, title: 'Pochodna i optimum',
          content: `P'(x) = \\frac{${L} - 6x}{2} = 0 \\implies x = \\frac{${L}}{6} = ${x_opt}`,
          explanation: `$P'' = -3 < 0$, więc $x = ${x_opt}$ daje maksimum.`
        },
        {
          step: 4, title: 'Wymiary i pole',
          content: `y = \\frac{${L} - 3\\cdot${x_opt}}{2} = \\frac{${L - 3 * x_opt}}{2} = ${y_opt}\\\\ P_{\\max} = ${x_opt}\\cdot${y_opt} = \\mathbf{${P_max}\\text{ m}^2}`,
          explanation: ''
        },
        {
          step: 5, title: 'Sprawdzenie zużycia siatki',
          content: `3\\cdot${x_opt} + 2\\cdot${y_opt} = ${3 * x_opt} + ${2 * y_opt} = ${3 * x_opt + 2 * y_opt}\\text{ m} = ${L}\\text{ m} \\checkmark`,
          explanation: 'Cała siatka zostaje użyta.'
        },
        {
          step: 6, title: 'Odpowiedź',
          content: `\\text{Optymalne wymiary: } ${x_opt}\\text{ m} \\times ${y_opt}\\text{ m},\\quad P_{\\max} = ${P_max}\\text{ m}^2`,
          explanation: `Każdy z dwóch bokosów ma wymiary $${x_opt}\\text{ m}\\times${y_opt / 2}$... Uwaga: każdy boks to $${x_opt}\\times${y_opt}$ (nie dzielimy przegrodą na pół wymiar y).`
        }
      ]
    };
  }

  // ─── 5. Maksymalizacja zysku — kontekst ekonomiczny ─────────────────────
  // Popyt: p(x) = A - B·x (cena spada z liczbą sztuk)
  // Przychód R(x) = x·p(x), Koszt C(x) = c·x + d
  // Zysk Z(x) = R - C, Z'=0 → x_opt = (A-c)/(2B)
  function profitMaximum() {
    // Dobieramy parametry tak, żeby x_opt był ładną liczbą całkowitą
    const configs = [
      { A: 100, B: 2,  c: 20, d: 500,  x_opt: 20, Z_max: 300,  unit: 'szt.' },
      { A: 80,  B: 2,  c: 16, d: 300,  x_opt: 16, Z_max: 212,  unit: 'szt.' },
      { A: 60,  B: 3,  c: 12, d: 200,  x_opt: 8,  Z_max: 0,    unit: 'szt.' },
      { A: 200, B: 5,  c: 50, d: 1000, x_opt: 15, Z_max: 125,  unit: 'szt.' },
      { A: 120, B: 4,  c: 24, d: 400,  x_opt: 12, Z_max: 272,  unit: 'szt.' },
    ];

    // Oblicz Z_max dla każdej konfiguracji
    const validConfigs = configs.map(cfg => {
      const x = cfg.x_opt;
      const p_x = cfg.A - cfg.B * x;
      const R_x = x * p_x;
      const C_x = cfg.c * x + cfg.d;
      const Z = R_x - C_x;
      return { ...cfg, Z_max: Z, p_opt: p_x };
    }).filter(cfg => cfg.Z_max > 0 && cfg.p_opt > 0);

    const cfg = M.choose(validConfigs.length > 0 ? validConfigs : configs);
    const { A, B, c, d, x_opt, Z_max, p_opt } = cfg;

    const R_x = x_opt * p_opt;
    const C_x = c * x_opt + d;

    const bSign = B > 0 ? `-${B}` : `+${Math.abs(B)}`;
    const cSign = c > 0 ? `+${c}` : `${c}`;

    return {
      id: M.makeId('cat16_profit'),
      category: 16,
      categoryName: 'Zadania 6-punktowe',
      type: 'profit_maximum',
      points: 6,
      params: { A, B, c, d, x_opt, Z_max, p_opt },
      statement:
        `Pewna firma produkuje i sprzedaje pewien produkt. ` +
        `Zbadano, że jeśli firma produkuje $x$ sztuk miesięcznie (gdzie $x > 0$), ` +
        `to cena jednej sztuki (w złotych) jest dana wzorem\n` +
        `$$p(x) = ${A} ${bSign}x$$\n` +
        `Miesięczny koszt produkcji (w złotych) wynosi\n` +
        `$$C(x) = ${c}x + ${d}$$\n\n` +
        `**a)** Wyznacz wzór na miesięczny zysk $Z(x)$ firmy (przychód minus koszt). ` +
        `Podaj dziedzinę.\n\n` +
        `**b)** Oblicz pochodną $Z'(x)$ i wyznacz liczbę sztuk $x_0$, dla której zysk jest największy.\n\n` +
        `**c)** Oblicz maksymalny zysk miesięczny oraz cenę jednostkową przy optymalnej produkcji.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x_0 = ${x_opt},\\quad Z_{\\max} = ${Z_max}\\text{ zł},\\quad p(x_0) = ${p_opt}\\text{ zł}`,
        description: `$x_0 = ${x_opt}$ szt., $Z_{\\max} = ${Z_max}$ zł, cena = ${p_opt} zł/szt.`
      },
      hints: [
        { level: 1, text: `Przychód: $R(x) = x \\cdot p(x) = x(${A}${bSign}x) = ${A}x ${bSign}x^2$. Zysk: $Z(x) = R(x) - C(x)$.` },
        { level: 2, text: `$Z(x) = ${A}x${bSign}x^2 - ${c}x - ${d} = -${B}x^2 + ${A - c}x - ${d}$. Dziedzina: $p(x) > 0$, czyli $x < ${A / B}$.` },
        { level: 3, text: `$Z'(x) = -${2 * B}x + ${A - c} = 0 \\implies x = \\dfrac{${A - c}}{${2 * B}} = ${x_opt}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Funkcja zysku',
          content: `R(x) = x\\cdot(${A}${bSign}x) = ${A}x - ${B}x^2\\\\ Z(x) = R(x) - C(x) = ${A}x - ${B}x^2 - ${c}x - ${d} = -${B}x^2 + ${A - c}x - ${d}`,
          explanation: `Dziedzina: $p(x) = ${A}${bSign}x > 0 \\iff x < ${A / B}$, więc $x \\in (0,\\, ${A / B})$.`
        },
        {
          step: 2, title: 'Pochodna Z\'(x)',
          content: `Z'(x) = -${2 * B}x + ${A - c}`,
          explanation: 'Parabola skierowana w dół ($-${B}x^2$) → jeden punkt maksymalny.'
        },
        {
          step: 3, title: 'Punkt optymalny',
          content: `Z'(x) = 0 \\implies -${2 * B}x + ${A - c} = 0 \\implies x_0 = \\frac{${A - c}}{${2 * B}} = ${x_opt}`,
          explanation: `Sprawdzenie: $Z''(x) = -${2 * B} < 0$, więc $x_0 = ${x_opt}$ to maksimum.`
        },
        {
          step: 4, title: 'Maksymalny zysk',
          content: `Z(${x_opt}) = -${B}\\cdot${x_opt}^2 + ${A - c}\\cdot${x_opt} - ${d}\\\\ = -${B * x_opt * x_opt} + ${(A - c) * x_opt} - ${d} = \\mathbf{${Z_max}\\text{ zł}}`,
          explanation: ''
        },
        {
          step: 5, title: 'Cena przy optymalnej produkcji',
          content: `p(${x_opt}) = ${A} - ${B}\\cdot${x_opt} = ${A} - ${B * x_opt} = \\mathbf{${p_opt}\\text{ zł}}`,
          explanation: `Przy produkcji ${x_opt} szt. miesięcznie cena każdej sztuki to ${p_opt} zł.`
        },
        {
          step: 6, title: 'Odpowiedź',
          content: `\\text{Optymalna produkcja: }x_0 = ${x_opt}\\text{ szt., cena }${p_opt}\\text{ zł, zysk }\\mathbf{${Z_max}\\text{ zł}}`,
          explanation: ''
        }
      ]
    };
  }

  // ─── 6. Prostokąt wpisany w okrąg: maksymalizacja pola ──────────────────
  // Okrąg promień R, prostokąt z wierzchołkami na okręgu
  // Boki 2x i 2y, x²+y²=R² → y=√(R²-x²)
  // P = 4xy, metodą podstawienia lub trygonometryczną: P_max = 2R² (kwadrat)
  // Użyjemy pochodnej: P(x)=4x√(R²-x²), P'=4(R²-2x²)/√(R²-x²)=0 → x=R/√2
  function rectangleInCircle() {
    const configs = [
      { R: 5,  R2: 25,  R_str: '5',       P_max: 50,   side: '5\\sqrt{2}' },
      { R: 6,  R2: 36,  R_str: '6',       P_max: 72,   side: '6\\sqrt{2}' },
      { R: 4,  R2: 16,  R_str: '4',       P_max: 32,   side: '4\\sqrt{2}' },
      { R: 10, R2: 100, R_str: '10',      P_max: 200,  side: '10\\sqrt{2}' },
    ];
    const cfg = M.choose(configs);
    const { R, R2, R_str, P_max, side } = cfg;

    return {
      id: M.makeId('cat16_rect_circle'),
      category: 16,
      categoryName: 'Zadania 6-punktowe',
      type: 'rect_in_circle',
      points: 6,
      params: { R, R2, P_max },
      statement:
        `W okrągłym stawie o promieniu $R = ${R_str}$ m wyznaczono prostokątną ` +
        `platformę tak, że wszystkie cztery narożniki platformy leżą na brzegu stawu. ` +
        `Oznaczamy przez $x$ połowę długości prostokąta (gdzie $0 < x < ${R_str}$).\n\n` +
        `**a)** Korzystając z twierdzenia Pitagorasa, wyraź szerokość $y$ platformy ` +
        `przez $x$ oraz zapisz pole $P(x)$ prostokąta jako funkcję $x$.\n\n` +
        `**b)** Wyznacz wartość $x$, dla której pole jest największe. ` +
        `Oblicz maksymalne pole platformy.\n\n` +
        `**c)** Jaką figurą jest prostokąt o maksymalnym polu? Uzasadnij.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x = \\frac{${R_str}}{\\sqrt{2}},\\quad P_{\\max} = ${P_max}\\text{ m}^2`,
        description: `$x = \\dfrac{${R}}{\\sqrt{2}} = \\dfrac{${R}\\sqrt{2}}{2}$, $P_{\\max} = ${P_max}$ m², figura: kwadrat`
      },
      hints: [
        { level: 1, text: `Prostokąt ma boki $2x$ i $2y$. Wierzchołek $(x, y)$ leży na okręgu: $x^2 + y^2 = ${R2}$, więc $y = \\sqrt{${R2}-x^2}$. Pole: $P(x) = 2x \\cdot 2y = 4x\\sqrt{${R2}-x^2}$.` },
        { level: 2, text: `$P'(x) = 4\\sqrt{${R2}-x^2} + 4x\\cdot\\dfrac{-x}{\\sqrt{${R2}-x^2}} = \\dfrac{4(${R2}-2x^2)}{\\sqrt{${R2}-x^2}}$.` },
        { level: 3, text: `$P'(x)=0 \\iff ${R2}-2x^2=0 \\iff x = \\dfrac{${R_str}}{\\sqrt{2}}$. Wtedy $y=x$, więc $2x=2y$ — kwadrat.` }
      ],
      solution: [
        {
          step: 1, title: 'Zależność y od x',
          content: `\\text{Wierzchołek prostokąta: } (x, y) \\text{ na okręgu} \\implies x^2+y^2=${R2}\\\\ y = \\sqrt{${R2}-x^2}, \\quad x \\in (0, ${R_str})`,
          explanation: ''
        },
        {
          step: 2, title: 'Funkcja pola',
          content: `P(x) = (2x)\\cdot(2y) = 4x\\sqrt{${R2}-x^2}`,
          explanation: 'Boki prostokąta: $2x$ (długość) i $2y$ (szerokość).'
        },
        {
          step: 3, title: 'Pochodna P\'(x)',
          content: `P'(x) = 4\\sqrt{${R2}-x^2} + 4x\\cdot\\frac{-x}{\\sqrt{${R2}-x^2}} = \\frac{4(${R2}-x^2)-4x^2}{\\sqrt{${R2}-x^2}} = \\frac{4(${R2}-2x^2)}{\\sqrt{${R2}-x^2}}`,
          explanation: 'Reguła iloczynu: $(uv)\'=u\'v+uv\'$.'
        },
        {
          step: 4, title: 'Punkt krytyczny',
          content: `P'(x)=0 \\iff ${R2}-2x^2=0 \\iff x^2=\\frac{${R2}}{2} \\iff x=\\frac{${R_str}}{\\sqrt{2}}=\\frac{${R_str}\\sqrt{2}}{2}`,
          explanation: ''
        },
        {
          step: 5, title: 'Weryfikacja (znak P\')',
          content: `x < \\frac{${R_str}}{\\sqrt{2}}: P'>0\\text{ (P rośnie)}\\quad x > \\frac{${R_str}}{\\sqrt{2}}: P'<0\\text{ (P maleje)}`,
          explanation: 'Zmiana znaku + → − potwierdza maksimum.'
        },
        {
          step: 6, title: 'Maksymalne pole i wniosek',
          content: `y = \\sqrt{${R2}-\\frac{${R2}}{2}} = \\sqrt{\\frac{${R2}}{2}} = \\frac{${R_str}}{\\sqrt{2}} = x\\\\ P_{\\max} = 4\\cdot\\frac{${R_str}}{\\sqrt{2}}\\cdot\\frac{${R_str}}{\\sqrt{2}} = 4\\cdot\\frac{${R2}}{2} = \\mathbf{${P_max}\\text{ m}^2}\\\\ \\text{Wniosek: }x=y\\implies\\text{prostokąt jest kwadratem o boku }${side}\\text{ m.}`,
          explanation: 'Prostokąt wpisany w okrąg o największym polu to **kwadrat**.'
        }
      ]
    };
  }

  // ─── 7. Prostokąt wpisany w parabolę: maksymalizacja pola ──────────────────
  // Parabola y = a - x², prostokąt z podstawą na osi OX symetryczny względem OY
  // Wierzchołki: (±x, 0) i (±x, a-x²), szerokość = 2x, wysokość = a-x²
  // P(x) = 2x(a-x²) = 2ax - 2x³, P'(x) = 2a - 6x² = 0 → x = √(a/3)
  // x_opt integer ↔ a/3 = perfect square → a=3k²
  function rectInParabola() {
    const configs = [
      { a: 3,  x_opt: 1, h_opt: 2,  P_max: 4,   sqrtA: '\\sqrt{3}'  },
      { a: 12, x_opt: 2, h_opt: 8,  P_max: 32,  sqrtA: '2\\sqrt{3}' },
      { a: 27, x_opt: 3, h_opt: 18, P_max: 108, sqrtA: '3\\sqrt{3}' },
      { a: 48, x_opt: 4, h_opt: 32, P_max: 256, sqrtA: '4\\sqrt{3}' },
    ];
    const cfg = M.choose(configs);
    const { a, x_opt, h_opt, P_max, sqrtA } = cfg;

    const contexts = [
      {
        intro: `Paraboliczna brama ogrodowa ma kształt łuku opisanego równaniem $y = ${a} - x^2$ (w metrach, dla $x \\in [-${sqrtA}, ${sqrtA}]$). ` +
               `Właściciel chce zamontować prostokątną tablicę reklamową tak, aby dolna krawędź leżała na osi $x$, ` +
               `a górne narożniki dotykały łuku paraboli.`,
        varDesc: 'Oznaczmy przez $x$ odległość każdego górnego narożnika od osi $y$ ($x > 0$).',
      },
      {
        intro: `Przekrój korytarza tunelu ma kształt paraboli opisanej równaniem $y = ${a} - x^2$ (w metrach). ` +
               `Chcemy przeprowadzić przez tunel ciężarówkę o prostokątnym przekroju, ` +
               `której bok jest symetrycznie ustawiony względem osi tunelu, a dolna krawędź leży na jezdni (osi $x$).`,
        varDesc: 'Oznaczmy przez $x$ połowę szerokości ciężarówki ($x > 0$).',
      },
      {
        intro: `Łuk paraboliczny mostu ma równanie $y = ${a} - x^2$ (w metrach, $y \\geq 0$). ` +
               `Pod mostem chcemy przeprowadzić prostokątny baner reklamowy, ` +
               `który symetrycznie wisi między pylonami (oś symetrii paraboli jest osią $y$), ` +
               `a jego górne narożniki dotykają łuku paraboli.`,
        varDesc: 'Oznaczmy przez $x$ połowę szerokości baneru ($x > 0$).',
      },
    ];
    const ctx = M.choose(contexts);

    return {
      id: M.makeId('cat16_para'),
      category: 16,
      categoryName: 'Zadania 6-punktowe',
      type: 'rect_in_parabola',
      points: 6,
      params: { a, x_opt, h_opt, P_max },
      statement:
        `${ctx.intro}\n\n${ctx.varDesc}\n\n` +
        `**a)** Wyraź pole prostokąta $P$ jako funkcję $x$ i podaj dziedzinę tej funkcji.\n\n` +
        `**b)** Oblicz $P'(x)$ i wyznacz $x$, dla którego pole jest największe.\n\n` +
        `**c)** Oblicz wymiary i pole prostokąta o największym polu. ` +
        `Sprawdź, korzystając z drugiej pochodnej, że wyznaczony punkt jest maksimum.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `x = ${x_opt},\\quad P_{\\max} = ${P_max}\\text{ m}^2`,
        description: `$x = ${x_opt}$ m, szerokość $= ${2*x_opt}$ m, wysokość $= ${h_opt}$ m, $P_{\\max} = ${P_max}$ m²`
      },
      hints: [
        { level: 1, text: `Prostokąt ma szerokość $2x$ i wysokość $y = ${a} - x^2$ (odczytana z paraboli). Pole: $P(x) = 2x \\cdot (${a} - x^2)$, dziedzina $x \\in (0,\\, ${sqrtA})$.` },
        { level: 2, text: `$P(x) = ${2*a}x - 2x^3$. Oblicz $P'(x) = ${2*a} - 6x^2$. Przyrównaj do zera.` },
        { level: 3, text: `$${2*a} - 6x^2 = 0 \\implies x^2 = ${a/3} \\implies x = ${x_opt}$. Sprawdź: $P''(x) = -12x < 0$ dla $x > 0$.` }
      ],
      solution: [
        {
          step: 1, title: 'a) Funkcja pola',
          content: `\\text{Szerokość: }2x,\\quad \\text{wysokość: }y = ${a} - x^2 > 0 \\iff x \\in (0,\\,${sqrtA})\\\\ P(x) = 2x(${a}-x^2) = ${2*a}x - 2x^3`,
          explanation: 'Podstawa prostokąta na osi x, górne wierzchołki na łuku paraboli.'
        },
        {
          step: 2, title: 'b) Pochodna',
          content: `P'(x) = ${2*a} - 6x^2`,
          explanation: ''
        },
        {
          step: 3, title: 'b) Punkt krytyczny',
          content: `P'(x) = 0 \\implies 6x^2 = ${2*a} \\implies x^2 = \\frac{${2*a}}{6} = ${a/3} \\implies x = ${x_opt}`,
          explanation: `$x = ${x_opt}$ (odrzucamy ujemne, bo $x > 0$).`
        },
        {
          step: 4, title: 'c) Weryfikacja — druga pochodna',
          content: `P''(x) = -12x \\implies P''(${x_opt}) = -${12*x_opt} < 0`,
          explanation: '$P\'\'< 0$ potwierdza, że $x = ' + x_opt + '$ jest punktem maksimum.'
        },
        {
          step: 5, title: 'c) Wymiary prostokąta',
          content: `\\text{Szerokość: }2x = ${2*x_opt}\\text{ m},\\quad \\text{wysokość: }${a} - ${x_opt}^2 = ${a} - ${x_opt*x_opt} = ${h_opt}\\text{ m}`,
          explanation: ''
        },
        {
          step: 6, title: 'c) Maksymalne pole',
          content: `P_{\\max} = P(${x_opt}) = ${2*a}\\cdot${x_opt} - 2\\cdot${x_opt}^3 = ${2*a*x_opt} - ${2*x_opt**3} = \\mathbf{${P_max}\\text{ m}^2}`,
          explanation: `Prostokąt o wymiarach $${2*x_opt}\\text{ m} \\times ${h_opt}\\text{ m}$ ma największe pole.`
        }
      ]
    };
  }

  function generate() {
    return M.choose([
      cylinderContainer,
      boxFromSheet,
      cylinderInCone,
      fencingWithPartition,
      profitMaximum,
      rectangleInCircle,
      rectInParabola
    ])();
  }

  return { generate };
})();
