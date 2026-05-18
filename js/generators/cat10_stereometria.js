// Kategoria 10: Stereometria
// Wzorzec matura 2025 z.9: ostrosłup, oblicz kąt, przekrój
// Wzorzec matura 2024 z.10: graniastosłup prostokątny, kąt między ścianą a krawędzią
// Wzorzec matura 2023 z.8: walec, stożek — objętość, pole
window.cat10 = (() => {
  const M = window.MathUtils;

  // === Graniastosłup prostokątny (prostopadłościan) ===
  function cuboid(diff) {
    const dims = diff === 'easy'
      ? [[3,4,5],[2,3,6],[4,4,6],[3,3,4]]
      : [[2,3,5],[3,4,12],[5,5,10],[4,6,8],[2,4,7]];
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
      difficulty: diff,
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
  function prismAngle(diff) {
    const bases = diff === 'easy'
      ? [[3,4],[5,12],[6,8]] // trójkąty prostokątne
      : [[3,4],[5,12],[8,15],[7,24]];
    const [catA, catB] = M.choose(bases);
    const hyp = Math.sqrt(catA*catA + catB*catB);
    const height = M.choose(diff === 'easy' ? [4,5,6,8,10] : [5,6,8,10,12,15]);
    const baseArea = catA * catB / 2;
    const vol = baseArea * height;

    return {
      id: M.makeId('cat10_prism'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'triangular_prism',
      difficulty: diff,
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
  function pyramid(diff) {
    const a = M.choose(diff === 'easy' ? [4,6,8,10] : [4,6,8,10,12]);
    const H = M.choose(diff === 'easy' ? [3,4,5,6] : [3,4,5,6,8,10,12]);
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
      difficulty: diff,
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

  // === Walec / Stożek ===
  function cylinder(diff) {
    const r = M.choose(diff === 'easy' ? [2,3,4,5] : [2,3,4,5,6]);
    const h = M.choose(diff === 'easy' ? [4,5,6,8,10] : [3,4,5,6,8,10,12]);
    const vol_latex = `${r*r} \\cdot ${h}\\pi`;
    const vol_num = Math.PI * r * r * h;
    const lateral = `2\\pi \\cdot ${r} \\cdot ${h} = ${2*r*h}\\pi`;

    return {
      id: M.makeId('cat10_cylinder'),
      category: 10,
      categoryName: 'Stereometria',
      type: 'cylinder',
      difficulty: diff,
      points: 3,
      params: { r, h },
      statement:
        `Walec ma promień podstawy $r = ${r}$ i wysokość $h = ${h}$.\n\n` +
        `**a)** Oblicz objętość walca.\n\n` +
        `**b)** Oblicz pole powierzchni bocznej walca.\n\nZapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `V = ${r*r*h}\\pi,\\quad S_b = ${2*r*h}\\pi`,
        description: `$V = ${r*r*h}\\pi$, $S_{boczna} = ${2*r*h}\\pi$`
      },
      hints: [
        { level: 1, text: 'Objętość walca: $V = \\pi r^2 h$.' },
        { level: 2, text: 'Pole powierzchni bocznej: $S_b = 2\\pi r h$ (rozwinięcie: prostokąt $2\\pi r \\times h$).' },
        { level: 3, text: `$V = \\pi\\cdot${r}^2\\cdot${h} = ${r*r*h}\\pi$, $S_b = 2\\pi\\cdot${r}\\cdot${h} = ${2*r*h}\\pi$.` }
      ],
      solution: [
        { step: 1, title: 'Objętość', content: `V = \\pi r^2 h = \\pi\\cdot${r}^2\\cdot${h} = ${r*r*h}\\pi`, explanation: '' },
        { step: 2, title: 'Pole boczne', content: `S_b = 2\\pi r h = 2\\pi\\cdot${r}\\cdot${h} = ${2*r*h}\\pi`, explanation: '' }
      ]
    };
  }

  function generate(diff = 'medium') {
    const gens = diff === 'easy'
      ? [cylinder, cuboid]
      : [cuboid, prismAngle, pyramid, cylinder];
    return M.choose(gens)(diff);
  }

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
