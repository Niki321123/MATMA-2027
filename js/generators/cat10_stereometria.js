// Kategoria 10: Stereometria
// Wzorzec matura 2025 z.9: ostrosłup, oblicz kąt, przekrój
// Wzorzec matura 2024 z.10: graniastosłup prostokątny, kąt między ścianą a krawędzią
// Wzorzec matura 2023 z.8: walec, stożek — objętość, pole
window.cat10 = (() => {
  const M = window.MathUtils;

  // === Graniastosłup prostokątny (prostopadłościan) ===
  function cuboid() {
    const dims = [[2,3,5],[3,4,12],[5,5,10],[4,6,8],[2,4,7],[3,5,9],[4,5,6]];
    const [a, b, c] = M.choose(dims);

    const diag = Math.sqrt(a*a + b*b + c*c);
    const diagAB = Math.sqrt(a*a + b*b); // przekątna podstawy
    const vol = a * b * c;
    const surface = 2 * (a*b + b*c + a*c);

    // Kąt między przekątną a podstawą
    const tanAlpha = c / diagAB;
    const diagIsNice = Number.isInteger(diagAB);

    return {
      id: M.makeId('cat10_cuboid'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'cuboid',
      points: 4,
      params: { a, b, c },
      statement:
        `Dany jest prostopadłościan $ABCDA'B'C'D'$ o krawędziach:\n` +
        `$$|AB| = ${a},\\quad |BC| = ${b},\\quad |AA'| = ${c}$$\n\n` +
        `**a)** Oblicz objętość i pole powierzchni prostopadłościanu.\n\n` +
        `**b)** Oblicz długość przekątnej prostopadłościanu $|AC'|$.\n\n` +
        `**c)** Oblicz $\\tg$ kąta między przekątną $AC'$ a płaszczyzną podstawy $ABCD$.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `V = ${vol},\\quad S = ${surface},\\quad |AC'| = \\sqrt{${a*a+b*b+c*c}},\\quad \\tg\\alpha = ${diagIsNice ? `\\frac{${c}}{${diagAB}}` : `\\frac{${c}\\sqrt{${a*a+b*b}}}{${a*a+b*b}}`}`,
        description: `$V = ${vol}$, $S = ${surface}$, $|AC'| = \\sqrt{${a*a+b*b+c*c}}$, $\\tg\\alpha = ${diagIsNice ? `\\tfrac{${c}}{${diagAB}}` : `\\tfrac{${c}}{\\sqrt{${a*a+b*b}}}`}$`
      },
      hints: [
        { level: 1, text: `Objętość: $V = a \\cdot b \\cdot c$. Przekątna: $|AC'| = \\sqrt{a^2+b^2+c^2}$.` },
        { level: 2, text: `Przekątna podstawy: $|AC| = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a*a+b*b}}${diagIsNice ? ' = ' + diagAB : ''}$.` },
        { level: 3, text: `Kąt $\\alpha$ między $AC'$ a podstawą: $\\tg\\alpha = \\frac{|AA'|}{|AC|} = \\frac{${c}}{\\sqrt{${a*a+b*b}}}$.` }
      ],
      solution: [
        { step: 1, title: 'Objętość', content: `V = ${a}\\cdot${b}\\cdot${c} = ${vol}`, explanation: '' },
        { step: 2, title: 'Pole powierzchni', content: `S = 2(${a}\\cdot${b} + ${b}\\cdot${c} + ${a}\\cdot${c}) = 2(${a*b}+${b*c}+${a*c}) = ${surface}`, explanation: '' },
        { step: 3, title: 'Przekątna |AC\'|', content: `|AC'| = \\sqrt{${a}^2+${b}^2+${c}^2} = \\sqrt{${a*a+b*b+c*c}}`, explanation: 'Trójwymiarowe tw. Pitagorasa.' },
        { step: 4, title: 'Kąt z podstawą', content: `|AC| = \\sqrt{${a*a+b*b}}\\\\ \\tg\\alpha = \\frac{|AA'|}{|AC|} = \\frac{${c}}{\\sqrt{${a*a+b*b}}}`, explanation: 'Rzut AC\' na podstawę to AC.' }
      ]
    };
  }

  // === Graniastosłup prostokątny z kątem ===
  function prismAngle() {
    const bases = [[3,4],[5,12],[8,15],[7,24],[6,8]];
    const [catA, catB] = M.choose(bases);
    const hyp = Math.sqrt(catA*catA + catB*catB);
    const height = M.choose([5,6,8,10,12,15,18]);
    const baseArea = catA * catB / 2;
    const vol = baseArea * height;

    return {
      id: M.makeId('cat10_prism'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'triangular_prism',
      points: 4,
      params: { catA, catB, height, baseArea, vol },
      statement:
        `Graniastosłup prostokątny $ABC A_1B_1C_1$ ma podstawę w kształcie trójkąta prostokątnego $ABC$, ` +
        `gdzie kąt prosty jest przy wierzchołku $C$, $|AC| = ${catA}$ i $|BC| = ${catB}$. ` +
        `Wysokość graniastosłupa wynosi $|AA_1| = ${height}$.\n\n` +
        `**a)** Oblicz objętość graniastosłupa.\n\n` +
        `**b)** Oblicz długość krawędzi $|AB_1|$.\n\n` +
        `**c)** Oblicz $\\tg$ kąta między odcinkiem $AB_1$ a płaszczyzną podstawy $ABC$.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `V = ${vol}`,
        description: `$V = ${vol}$`
      },
      hints: [
        { level: 1, text: `Podstawa to trójkąt prostokątny z ramionami ${catA} i ${catB}. Pole podstawy $= \\frac{1}{2}\\cdot${catA}\\cdot${catB}$.` },
        { level: 2, text: `$|AB| = \\sqrt{${catA}^2+${catB}^2} = ${Math.round(hyp * 100)/100}$. Przekątna $|AB_1| = \\sqrt{|AB|^2 + |AA_1|^2}$.` },
        { level: 3, text: `$\\tg\\alpha = \\frac{|BB_1|}{|AB|} = \\frac{${height}}{\\sqrt{${catA*catA+catB*catB}}}$.` }
      ],
      solution: [
        { step: 1, title: 'Pole podstawy', content: `P_{ABC} = \\frac{1}{2}\\cdot${catA}\\cdot${catB} = ${baseArea}`, explanation: '' },
        { step: 2, title: 'Objętość', content: `V = P_{ABC}\\cdot h = ${baseArea}\\cdot${height} = ${vol}`, explanation: '' },
        { step: 3, title: '|AB|', content: `|AB| = \\sqrt{${catA}^2+${catB}^2} = \\sqrt{${catA*catA+catB*catB}}`, explanation: '' },
        { step: 4, title: '|AB₁|', content: `|AB_1| = \\sqrt{|AB|^2+|BB_1|^2} = \\sqrt{${catA*catA+catB*catB}+${height*height}} = \\sqrt{${catA*catA+catB*catB+height*height}}`, explanation: '' },
        { step: 5, title: 'Kąt', content: `\\tg\\alpha = \\frac{|BB_1|}{|AB|} = \\frac{${height}}{\\sqrt{${catA*catA+catB*catB}}}`, explanation: 'Rzut AB₁ na podstawę to AB.' }
      ]
    };
  }

  // === Ostrosłup prawidłowy czworokątny ===
  function pyramid() {
    const a = M.choose([4,6,8,10,12,14]);
    const H = M.choose([3,4,5,6,8,10,12,15]);
    // Apotema podstawy = a/2, apotema ściany bocznej = sqrt((a/2)²+H²)
    const apothem_base = a / 2;
    const apothem_lateral = Math.sqrt(apothem_base * apothem_base + H * H);
    const vol = a * a * H / 3;
    const base_area = a * a;
    const lateral_area = 4 * (a * apothem_lateral / 2);
    // Kąt między ścianą boczną a podstawą
    const tanKat = H / apothem_base;
    const apothemIsNice = Number.isInteger(apothem_lateral);

    return {
      id: M.makeId('cat10_pyramid'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'regular_pyramid',
      points: 4,
      params: { a, H, vol },
      statement:
        `Ostrosłup prawidłowy czworokątny $ABCDS$ ma podstawę będącą kwadratem o boku $a = ${a}$ ` +
        `i wysokość $H = ${H}$.\n\n` +
        `**a)** Oblicz objętość ostrosłupa.\n\n` +
        `**b)** Oblicz $\\tg$ kąta między ścianą boczną a płaszczyzną podstawy.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `V = ${M.latexFrac(vol * 3, 3)},\\quad \\tg\\alpha = ${M.latexFrac(H * 2, a)}`,
        description: `$V = \\frac{${base_area}\\cdot${H}}{3} = ${vol}$, $\\tg\\alpha = \\frac{${H}}{${apothem_base}}$`
      },
      hints: [
        { level: 1, text: `Objętość ostrosłupa: $V = \\frac{1}{3}\\cdot P_{podstawy}\\cdot H = \\frac{1}{3}\\cdot${a}^2\\cdot${H}$.` },
        { level: 2, text: `Apotema podstawy (odległość środka podstawy od środka boku): $m = \\frac{a}{2} = ${apothem_base}$.` },
        { level: 3, text: `Kąt $\\alpha$ między ścianą boczną a podstawą: $\\tg\\alpha = \\frac{H}{m} = \\frac{${H}}{${apothem_base}}$.` }
      ],
      solution: [
        { step: 1, title: 'Objętość', content: `V = \\frac{1}{3}\\cdot${a}^2\\cdot${H} = \\frac{${base_area}\\cdot${H}}{3} = ${vol}`, explanation: '' },
        { step: 2, title: 'Apotema podstawy', content: `m = \\frac{a}{2} = \\frac{${a}}{2} = ${apothem_base}`, explanation: 'Odległość środka kwadratu od środka boku.' },
        { step: 3, title: 'Kąt ściany bocznej', content: `\\tg\\alpha = \\frac{H}{m} = \\frac{${H}}{${apothem_base}} = ${M.latexFrac(H, apothem_base)}`, explanation: 'Spodek wysokości leży w środku podstawy.' }
      ]
    };
  }

  // === Graniastosłup prawidłowy trójkątny ===
  // Wzorzec matura: oblicz kąt między krawędzią boczną a przekątną ściany bocznej,
  //                  lub kąt między prostą a płaszczyzną podstawy
  function regularTriangularPrism() {
    // Podstawa: trójkąt równoboczny o boku a
    // Krawędź boczna: h
    // Oblicz:  a) objętość  b) kąt między krawędzią AA₁ a przekątną AB₁
    const dims = [[4,3],[4,6],[6,4],[6,8],[8,6],[10,6],[6,6],[8,8]];
    const [a, h] = M.choose(dims);

    // Pole trójkąta równobocznego = (√3/4)a²
    // V = (√3/4)a² · h
    const vol_coeff = a * a; // V = (√3/4)·a²·h
    const vol_display = `\\frac{${vol_coeff * h}\\sqrt{3}}{4}`;

    // AB = a (bok podstawy)
    // AB₁ = √(a² + h²)
    const AB1_sq = a * a + h * h;
    // kąt α między AA₁ i AB₁:  rzut AA₁ na AB₁...
    // Metodą: kąt między AA₁ a AB₁ w trójkącie AA₁B (prostokątnym przy A)
    // tg α = AB / AA₁ = a / h   (α to kąt przy A₁)
    // Lub kąt β między AB₁ a płaszczyzną podstawy:
    //   rzut AB₁ na podstawę = AB = a, prostopadle BB₁ = h
    //   tg β = h / a
    const tanAlpha_n = h;
    const tanAlpha_d = a;
    const g = (function gcd(x,y){return y===0?x:gcd(y,x%y);})(tanAlpha_n, tanAlpha_d);
    const tn = tanAlpha_n / g;
    const td = tanAlpha_d / g;
    const tanStr = tn === td ? '1' : M.latexFrac(tn, td);

    return {
      id: M.makeId('cat10_tri_prism'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'regular_triangular_prism',
      points: 5,
      params: { a, h, vol_coeff },
      statement:
        `Graniastosłup prawidłowy trójkątny $ABCA_1B_1C_1$ ma podstawę będącą ` +
        `trójkątem równobocznym o boku $a = ${a}$ i wysokość $|AA_1| = ${h}$.\n\n` +
        `**a)** Oblicz objętość graniastosłupa.\n\n` +
        `**b)** Oblicz $\\tg$ kąta między odcinkiem $AB_1$ a płaszczyzną podstawy $ABC$.\n\n` +
        `**c)** Oblicz długość odcinka $AB_1$.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `V = ${vol_display},\\quad \\tg\\alpha = ${tanStr},\\quad |AB_1| = \\sqrt{${AB1_sq}}`,
        description: `$V = ${vol_display}$, $\\tg\\alpha = ${tanStr}$, $|AB_1| = \\sqrt{${AB1_sq}}$`
      },
      hints: [
        { level: 1, text: `Pole trójkąta równobocznego o boku $a$: $P = \\frac{\\sqrt{3}}{4}a^2 = \\frac{\\sqrt{3}}{4}\\cdot${a}^2$.` },
        { level: 2, text: `Kąt między $AB_1$ a płaszczyzną $ABC$: rzut $AB_1$ na podstawę to $AB = ${a}$, pionowa składowa to $BB_1 = ${h}$. Zatem $\\tg\\alpha = \\frac{BB_1}{AB} = \\frac{${h}}{${a}} = ${tanStr}$.` },
        { level: 3, text: `$|AB_1| = \\sqrt{|AB|^2 + |BB_1|^2} = \\sqrt{${a*a}+${h*h}} = \\sqrt{${AB1_sq}}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Pole podstawy (trójkąt równoboczny)',
          content: `P_{ABC} = \\frac{\\sqrt{3}}{4}\\cdot${a}^2 = \\frac{${a*a}\\sqrt{3}}{4}`,
          explanation: 'Wzór na pole trójkąta równobocznego.'
        },
        {
          step: 2, title: 'Objętość',
          content: `V = P_{ABC}\\cdot h = \\frac{${a*a}\\sqrt{3}}{4}\\cdot${h} = ${vol_display}`,
          explanation: ''
        },
        {
          step: 3, title: 'Kąt między AB₁ a podstawą',
          content: `\\text{Rzut } AB_1 \\text{ na podstawę } = AB = ${a},\\quad \\text{składowa pionowa} = BB_1 = ${h}\\\\ \\tg\\alpha = \\frac{BB_1}{AB} = \\frac{${h}}{${a}} = ${tanStr}`,
          explanation: 'Kąt między prostą a płaszczyzną = kąt między prostą a jej rzutem na płaszczyznę.'
        },
        {
          step: 4, title: 'Długość AB₁',
          content: `|AB_1| = \\sqrt{|AB|^2 + |BB_1|^2} = \\sqrt{${a}^2 + ${h}^2} = \\sqrt{${a*a}+${h*h}} = \\sqrt{${AB1_sq}}`,
          explanation: 'Twierdzenie Pitagorasa w trójkącie prostokątnym $ABB_1$.'
        }
      ]
    };
  }

  // === Walec z obliczaniem kąta i tworzącą ===
  // Wzorzec maturalny: NIE tylko V i Sb, ale kąt + tworzącą stożka wpisanego lub kąt przekroju
  function cylinderWithAngle() {
    // Dany walec: promień r, wysokość h (lub odwrotnie: znana tworząca)
    // Oblicz: a) V walca  b) kąt między tworzącą a podstawą  c) pole całkowite
    const r = M.choose([3,4,5,6]);
    const h = M.choose([4,6,8,10,12]);

    // Tworząca l = √(r²+h²) — to tworząca stożka o tej samej podstawie
    // W walcu: tworząca (krawędź boczna) jest równoległa do osi, więc kąt z podstawą = 90°
    // ZAMIAST: walec z wpisanym stożkiem
    // Stożek wpisany w walec (ta sama podstawa i wierzchołek na górnej podstawie):
    // r_stożka = r, h_stożka = h, tworząca l = √(r²+h²)
    // kąt między tworzącą stożka a podstawą: tg β = h/r
    const l_sq = r * r + h * h;
    const g = (function gcd(x,y){return y===0?x:gcd(y,x%y);})(h, r);
    const tg_n = h / g, tg_d = r / g;
    const tanStr = tg_n === tg_d ? '1' : M.latexFrac(tg_n, tg_d);

    // Obj walca = πr²h
    const Vcyl_str = `${r*r*h}\\pi`;
    // Obj stożka = (1/3)πr²h
    const Vcone_num = r*r*h;
    const Vcone_str = `\\dfrac{${Vcone_num}\\pi}{3}`;
    // Pole całkowite walca = 2πr(r+h)
    const Stot_str = `${2*r}(${r}+${h})\\pi = ${2*r*(r+h)}\\pi`;

    return {
      id: M.makeId('cat10_cyl_angle'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'cylinder_cone',
      points: 5,
      params: { r, h, l_sq },
      statement:
        `W walcu o promieniu podstawy $r = ${r}$ i wysokości $h = ${h}$ wpisano stożek tak, ` +
        `że podstawa stożka jest podstawą walca, a wierzchołek stożka leży w środku ` +
        `górnej podstawy walca.\n\n` +
        `**a)** Oblicz objętość walca i objętość stożka.\n\n` +
        `**b)** Oblicz długość tworzącej stożka.\n\n` +
        `**c)** Oblicz $\\tg$ kąta między tworzącą stożka a płaszczyzną podstawy.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `V_{walca}=${Vcyl_str},\\; V_{stożka}=${Vcone_str},\\; l=\\sqrt{${l_sq}},\\; \\tg\\beta=${tanStr}`,
        description: `$V_w=${Vcyl_str}$, $V_s=${Vcone_str}$, $l=\\sqrt{${l_sq}}$, $\\tg\\beta=${tanStr}$`
      },
      hints: [
        { level: 1, text: `Objętość walca: $V = \\pi r^2 h = \\pi\\cdot${r}^2\\cdot${h}$. Stożka: $V_s = \\frac{1}{3}\\pi r^2 h$.` },
        { level: 2, text: `Tworząca stożka łączy krawędź podstawy z wierzchołkiem: $l = \\sqrt{r^2+h^2} = \\sqrt{${r*r}+${h*h}} = \\sqrt{${l_sq}}$.` },
        { level: 3, text: `Kąt $\\beta$ między tworzącą a podstawą: w trójkącie prostokątnym o przyprostokątnych $r$ i $h$: $\\tg\\beta = \\frac{h}{r} = ${tanStr}$.` }
      ],
      solution: [
        { step: 1, title: 'Objętości', content: `V_{walca} = \\pi\\cdot${r}^2\\cdot${h} = ${Vcyl_str}\\\\ V_{stożka} = \\frac{1}{3}\\cdot${Vcyl_str} = ${Vcone_str}`, explanation: '$V_{stożka} = \\frac{1}{3}V_{walca}$ przy tej samej podstawie i wysokości.' },
        { step: 2, title: 'Tworząca stożka', content: `l = \\sqrt{r^2+h^2} = \\sqrt{${r}^2+${h}^2} = \\sqrt{${l_sq}}`, explanation: 'Tw. Pitagorasa: trójkąt prostokątny o przyprostokątnych $r$ i $h$.' },
        { step: 3, title: 'Kąt tworzącej z podstawą', content: `\\tg\\beta = \\frac{h}{r} = \\frac{${h}}{${r}} = ${tanStr}`, explanation: 'W trójkącie prostokątnym: naprzeciwko kąta $\\beta$ leży $h$, przyległa to $r$.' }
      ]
    };
  }

  // === Ostrosłup prawidłowy trójkątny ===
  // Wzorzec maturalny: krawędź boczna, kąt krawędzi z podstawą — wymaga znajomości środka ciężkości
  function regularTriangularPyramid() {
    const configs = [
      {
        a: 6, H: 4,
        // |GA| = a√3/3 = 6√3/3 = 2√3
        // |SA|² = (2√3)²+4² = 12+16 = 28 → |SA|=2√7
        // tg α = H/|GA| = 4/(2√3) = 2/√3 = 2√3/3
        GA_str: '2\\sqrt{3}',
        SA_sq_str: '(2\\sqrt{3})^2+4^2=12+16=28',
        SA_str: '2\\sqrt{7}',
        tan_str: '\\dfrac{4}{2\\sqrt{3}}=\\dfrac{2\\sqrt{3}}{3}',
        vol_str: '\\dfrac{36\\cdot4\\cdot\\sqrt{3}}{12}=12\\sqrt{3}'
      },
      {
        a: 6, H: 6,
        // |GA| = 2√3, |SA|²=12+36=48 → 4√3, tg=6/(2√3)=√3
        GA_str: '2\\sqrt{3}',
        SA_sq_str: '(2\\sqrt{3})^2+6^2=12+36=48',
        SA_str: '4\\sqrt{3}',
        tan_str: '\\dfrac{6}{2\\sqrt{3}}=\\sqrt{3}',
        vol_str: '\\dfrac{36\\cdot6\\cdot\\sqrt{3}}{12}=18\\sqrt{3}'
      },
      {
        a: 6, H: 3,
        // |GA| = 2√3, |SA|²=12+9=21 → √21, tg=3/(2√3)=√3/2
        GA_str: '2\\sqrt{3}',
        SA_sq_str: '(2\\sqrt{3})^2+3^2=12+9=21',
        SA_str: '\\sqrt{21}',
        tan_str: '\\dfrac{3}{2\\sqrt{3}}=\\dfrac{\\sqrt{3}}{2}',
        vol_str: '\\dfrac{36\\cdot3\\cdot\\sqrt{3}}{12}=9\\sqrt{3}'
      },
    ];
    const cfg = M.choose(configs);

    return {
      id: M.makeId('cat10_tri_pyramid'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'regular_triangular_pyramid',
      points: 5,
      params: { a: cfg.a, H: cfg.H },
      statement:
        `Ostrosłup prawidłowy trójkątny $ABCS$ ma podstawę będącą trójkątem równobocznym o boku $a = ${cfg.a}$ ` +
        `i wysokość $H = ${cfg.H}$ (wierzchołek $S$, środek ciężkości podstawy $G$, $|SG| = H$).\n\n` +
        `**a)** Oblicz objętość ostrosłupa.\n\n` +
        `**b)** Oblicz długość krawędzi bocznej $|SA|$.\n\n` +
        `**c)** Oblicz $\\tg$ kąta między krawędzią boczną $SA$ a płaszczyzną podstawy $ABC$.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `V=${cfg.vol_str},\\; |SA|=${cfg.SA_str},\\; \\tg\\alpha=${cfg.tan_str}`,
        description: `$V=${cfg.vol_str}$, $|SA|=${cfg.SA_str}$, $\\tg\\alpha=${cfg.tan_str}$`
      },
      hints: [
        { level: 1, text: `Pole podstawy: $P=\\frac{\\sqrt{3}}{4}\\cdot${cfg.a}^2=\\frac{${cfg.a*cfg.a}\\sqrt{3}}{4}$. Środek ciężkości od wierzchołka: $|GA|=\\frac{a\\sqrt{3}}{3}=${cfg.GA_str}$.` },
        { level: 2, text: `Krawędź boczna: $|SA|=\\sqrt{|GA|^2+H^2}=\\sqrt{${cfg.SA_sq_str}}=${cfg.SA_str}$.` },
        { level: 3, text: `Kąt $\\alpha$ między $SA$ a podstawą: $\\tg\\alpha=\\frac{H}{|GA|}=${cfg.tan_str}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Pole podstawy',
          content: `P_{ABC}=\\frac{\\sqrt{3}}{4}\\cdot${cfg.a}^2=\\frac{${cfg.a*cfg.a}\\sqrt{3}}{4}`,
          explanation: 'Wzór na pole trójkąta równobocznego.'
        },
        {
          step: 2, title: 'Objętość',
          content: `V=\\frac{1}{3}\\cdot\\frac{${cfg.a*cfg.a}\\sqrt{3}}{4}\\cdot${cfg.H}=${cfg.vol_str}`,
          explanation: ''
        },
        {
          step: 3, title: 'Odległość środka ciężkości od wierzchołka',
          content: `|GA|=\\frac{a\\sqrt{3}}{3}=\\frac{${cfg.a}\\sqrt{3}}{3}=${cfg.GA_str}`,
          explanation: 'Środek ciężkości dzieli medianę w stosunku 2:1 od wierzchołka; mediana $=\\frac{a\\sqrt{3}}{2}$, więc $|GA|=\\frac{2}{3}\\cdot\\frac{a\\sqrt{3}}{2}=\\frac{a\\sqrt{3}}{3}$.'
        },
        {
          step: 4, title: 'Krawędź boczna |SA|',
          content: `|SA|=\\sqrt{|GA|^2+H^2}=\\sqrt{${cfg.SA_sq_str}}=${cfg.SA_str}`,
          explanation: 'Trójkąt $SGA$ jest prostokątny przy $G$: $|GA|$ i $H$ to przyprostokątne.'
        },
        {
          step: 5, title: 'Kąt krawędzi bocznej z podstawą',
          content: `\\tg\\alpha=\\frac{H}{|GA|}=${cfg.tan_str}`,
          explanation: 'Rzut $SA$ na płaszczyznę podstawy to $GA$. Kąt $\\alpha$ leży w trójkącie $SGA$.'
        }
      ]
    };
  }

  // === Kula opisana na prostopadłościanie ===
  // Wzorzec maturalny: związek między przekątną przestrzenną a promieniem kuli
  function sphereOnCuboid() {
    const configs = [
      { a:2, b:2, c:1, diag_sq:9, diag_str:'3', R_str:'\\dfrac{3}{2}' },
      { a:4, b:4, c:2, diag_sq:36, diag_str:'6', R_str:'3' },
      { a:2, b:3, c:6, diag_sq:49, diag_str:'7', R_str:'\\dfrac{7}{2}' },
      { a:6, b:6, c:7, diag_sq:121, diag_str:'11', R_str:'\\dfrac{11}{2}' },
      { a:1, b:2, c:2, diag_sq:9, diag_str:'3', R_str:'\\dfrac{3}{2}' },
    ];
    const cfg = M.choose(configs);

    return {
      id: M.makeId('cat10_sphere'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'sphere_circumscribed',
      points: 4,
      params: { a: cfg.a, b: cfg.b, c: cfg.c },
      statement:
        `Prostopadłościan $ABCDA'B'C'D'$ ma krawędzie $|AB|=${cfg.a}$, $|BC|=${cfg.b}$, $|AA'|=${cfg.c}$.\n\n` +
        `**a)** Oblicz długość przestrzennej przekątnej $|AC'|$.\n\n` +
        `**b)** Wyznacz promień kuli opisanej na tym prostopadłościanie.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `|AC'|=${cfg.diag_str},\\quad R=${cfg.R_str}`,
        description: `$|AC'|=${cfg.diag_str}$, $R=${cfg.R_str}$`
      },
      hints: [
        { level: 1, text: `Przekątna przestrzenna: $|AC'|=\\sqrt{a^2+b^2+c^2}=\\sqrt{${cfg.a}^2+${cfg.b}^2+${cfg.c}^2}$.` },
        { level: 2, text: `$|AC'|=\\sqrt{${cfg.diag_sq}}=${cfg.diag_str}$.` },
        { level: 3, text: `Środek kuli opisanej leży w środku przekątnej, więc $R=\\frac{|AC'|}{2}=${cfg.R_str}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Przekątna przestrzenna',
          content: `|AC'|=\\sqrt{${cfg.a}^2+${cfg.b}^2+${cfg.c}^2}=\\sqrt{${cfg.a*cfg.a}+${cfg.b*cfg.b}+${cfg.c*cfg.c}}=\\sqrt{${cfg.diag_sq}}=${cfg.diag_str}`,
          explanation: 'Twierdzenie Pitagorasa w 3D.'
        },
        {
          step: 2, title: 'Promień kuli opisanej',
          content: `R=\\frac{|AC'|}{2}=\\frac{${cfg.diag_str}}{2}=${cfg.R_str}`,
          explanation: 'Kula opisana na prostopadłościanie ma środek w punkcie przecięcia przekątnych, a każdy z 8 wierzchołków leży na kuli. Przekątna $|AC\'|$ jest średnicą tej kuli.'
        }
      ]
    };
  }

  function generate() {
    // cuboid usunięty — podstawowa bryła bez kąta / przekroju
    // pozostałe wymagają kąta dwuściennego, przekroju lub kuli wpisanej — poziom 8/10
    return M.choose([prismAngle, regularTriangularPrism, cylinderWithAngle, regularTriangularPyramid, sphereOnCuboid])();
  }

  return { generate };
})();
