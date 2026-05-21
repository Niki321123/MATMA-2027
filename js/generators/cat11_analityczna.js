// Kategoria 11: Geometria analityczna
// Wzorzec matura 2025 z.11: prosta styczna do okręgu, odległość
// Wzorzec matura 2024 z.11: okrąg, punkt na okręgu, styczna
// Wzorzec matura 2023 z.11: prosta i okrąg — przecięcie, cięciwa
window.cat11 = (() => {
  const M = window.MathUtils;

  // === Okrąg i prosta styczna ===
  function circleTangent() {
    const cx = M.choose([-4,-3,-2,-1,0,1,2,3,4]);
    const cy = M.choose([-4,-3,-2,-1,0,1,2,3,4]);
    const r = M.choose([2,3,4,5,6,7]);

    // Punkt na okręgu - wybieramy tak, żeby styczna miała ładne równanie
    // Punkt P = (cx + r, cy) - prawa część okręgu
    // Styczna w tym punkcie: x = cx + r (pionowa)
    // Lub P = (cx, cy+r) - górna
    const useHoriz = M.choose([true, false]);
    const px = useHoriz ? cx + r : cx;
    const py = useHoriz ? cy : cy + r;

    // Styczna w P = (px, py):
    // Równanie okręgu: (x-cx)² + (y-cy)² = r²
    // Styczna: (px-cx)(x-cx) + (py-cy)(y-cy) = r²
    // czyli: (px-cx)·x + (py-cy)·y = r² + (px-cx)·cx + (py-cy)·cy
    const A = px - cx;
    const B = py - cy;
    const C = r * r + A * cx + B * cy;

    let tangentStr = '';
    if (A === 0) {
      // pozioma: By = C → y = C/B
      tangentStr = `y = ${C / B}`;
    } else if (B === 0) {
      // pionowa: Ax = C → x = C/A
      tangentStr = `x = ${C / A}`;
    } else {
      // ogólna: Ax + By = C → y = (C - Ax)/B
      const b_val = C / B;
      const a_val = -A / B;
      const b_int = Number.isInteger(b_val) && Number.isInteger(a_val);
      if (b_int) {
        tangentStr = `y = ${a_val === 1 ? '' : a_val === -1 ? '-' : a_val}x${b_val >= 0 ? '+' + b_val : b_val}`;
      } else {
        tangentStr = `${A}x + ${B}y = ${C}`;
      }
    }

    const circleEq = `(x ${cx >= 0 ? '-' + cx : '+' + Math.abs(cx)})^2 + (y ${cy >= 0 ? '-' + cy : '+' + Math.abs(cy)})^2 = ${r*r}`;

    return {
      id: M.makeId('cat11_tangent'),
      category: 11,
      categoryName: 'Geometria analityczna',
      type: 'circle_tangent',
      points: 4,
      params: { cx, cy, r, px, py },
      statement:
        `Dany jest okrąg o równaniu\n$$${circleEq}$$\n` +
        `Punkt $P = (${px},\\ ${py})$ leży na tym okręgu.\n\n` +
        `**Wyznacz równanie prostej stycznej do okręgu w punkcie $P$.** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: tangentStr,
        description: `Równanie stycznej: $${tangentStr}$`
      },
      hints: [
        { level: 1, text: `Styczna do okręgu $(x-a)^2+(y-b)^2=r^2$ w punkcie $(x_0,y_0)$: $(x_0-a)(x-a)+(y_0-b)(y-b)=r^2$.` },
        { level: 2, text: `Środek okręgu $S = (${cx}, ${cy})$. Promień do $P$: kierunek $(${A}, ${B})$. Styczna jest prostopadła do promienia.` },
        { level: 3, text: `Równanie stycznej: $${A}(x-${cx})+${B}(y-${cy})=${r*r}$, czyli $${tangentStr}$.` }
      ],
      solution: [
        { step: 1, title: 'Sprawdzenie punktu', content: `(${px}-${cx})^2+(${py}-${cy})^2 = ${A*A}+${B*B} = ${A*A+B*B} = ${r*r}\\checkmark`, explanation: 'P leży na okręgu.' },
        { step: 2, title: 'Wzór na styczną', content: `(x_0-a)(x-a)+(y_0-b)(y-b) = r^2\\\\ ${A}\\cdot(x-${cx})+${B}\\cdot(y-${cy}) = ${r*r}`, explanation: 'Styczna prostopadła do promienia w punkcie P.' },
        { step: 3, title: 'Uproszczenie', content: `${A}x ${-A*cx >= 0 ? '+' : ''}${-A*cx}+${B}y ${-B*cy >= 0 ? '+' : ''}${-B*cy} = ${r*r}\\\\ ${tangentStr}`, explanation: '' }
      ]
    };
  }

  // === Prosta przez dwa punkty ===
  function lineThrough() {
    const x1 = M.choose([-5,-4,-3,-2,-1,0,1,2,3,4,5]);
    const y1 = M.choose([-5,-4,-3,-2,-1,0,1,2,3,4,5]);
    const x2 = x1 + M.choose([-4,-3,-2,-1,1,2,3,4,5]);
    const y2 = y1 + M.choose([-5,-4,-3,-2,-1,1,2,3,4,5]);

    if (x1 === x2) return lineThrough(diff); // unikaj pionowych

    const dxRaw = x2 - x1, dyRaw = y2 - y1;
    const g = M.gcd(Math.abs(dxRaw), Math.abs(dyRaw));
    const a_num = dyRaw / g, a_den = dxRaw / g;
    // y - y1 = (a_num/a_den)(x - x1)
    // y = (a_num/a_den)x + (y1 - a_num*x1/a_den)
    const b_num = y1 * a_den - a_num * x1;
    const b_den = a_den;

    // Współczynnik kierunkowy: jeśli a=1 → pomiń, -1 → znak minus
    const slopeSimple = a_den === 1 ? a_num : null;
    const slopeStr = slopeSimple === 1 ? '' : slopeSimple === -1 ? '-' : M.latexFrac(a_num, a_den);
    const interceptVal = b_num / b_den;
    const interceptStr = M.latexFrac(b_num, b_den);
    const lineStr = b_num === 0
      ? `y = ${slopeStr || '0'}${slopeStr ? 'x' : ''}`
      : `y = ${slopeStr}x ${interceptVal >= 0 ? '+ ' : '- '}${M.latexFrac(Math.abs(b_num), Math.abs(b_den))}`;

    return {
      id: M.makeId('cat11_line'),
      category: 11,
      categoryName: 'Geometria analityczna',
      type: 'line_equation',
      points: 3,
      params: { x1, y1, x2, y2 },
      statement:
        `Dane są dwa punkty: $A = (${x1},\\ ${y1})$ oraz $B = (${x2},\\ ${y2})$.\n\n` +
        `**Wyznacz równanie prostej $AB$.** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: lineStr,
        description: `Równanie prostej: $${lineStr}$`
      },
      hints: [
        { level: 1, text: `Współczynnik kierunkowy: $a = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2}-${y1}}{${x2}-${x1}}$.` },
        { level: 2, text: `$a = ${slopeStr}$. Następnie wyznacz wyraz wolny $b$: $b = y_1 - a\\cdot x_1$.` },
        { level: 3, text: `Równanie: $${lineStr}$.` }
      ],
      solution: [
        { step: 1, title: 'Współczynnik kierunkowy', content: `a = \\frac{${y2}-${y1}}{${x2}-${x1}} = \\frac{${dyRaw}}{${dxRaw}} = ${slopeStr}`, explanation: '' },
        { step: 2, title: 'Wyraz wolny', content: `b = ${y1} - ${slopeStr}\\cdot${x1} = ${interceptStr}`, explanation: '' },
        { step: 3, title: 'Równanie prostej', content: lineStr, explanation: '' }
      ]
    };
  }

  // === Odległość punktu od prostej ===
  function pointLineDistance() {
    const a = M.choose([1,-1,2,-2,3,-3,4,-4]);
    const b = M.choose([-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]);
    const px = M.choose([-4,-3,-2,-1,0,1,2,3,4,5]);
    const py = M.choose([-4,-3,-2,-1,0,1,2,3,4,5]);

    // d = |a·px - py + b| / sqrt(a²+1)
    const num = Math.abs(a * px - py + b);
    const den_sq = a * a + 1;
    // d = num / sqrt(den_sq) = num*sqrt(den_sq)/den_sq
    const d_display = num === 0 ? '0' : `\\frac{${num}\\sqrt{${den_sq}}}{${den_sq}}`;

    const lineStr = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x${b >= 0 ? '+' + b : b}`;

    return {
      id: M.makeId('cat11_dist'),
      category: 11,
      categoryName: 'Geometria analityczna',
      type: 'point_line_distance',
      points: 3,
      params: { a, b, px, py, num, den_sq },
      statement:
        `Dana jest prosta $l: ${lineStr}$ i punkt $P = (${px},\\ ${py})$.\n\n` +
        `**Oblicz odległość punktu $P$ od prostej $l$.** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: d_display,
        description: `Odległość $= ${d_display}$`
      },
      hints: [
        { level: 1, text: `Wzór na odległość punktu $(x_0, y_0)$ od prostej $Ax+By+C=0$: $d = \\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$.` },
        { level: 2, text: `Prosta w postaci ogólnej: $${a}x - y + ${b} = 0$. Podstaw $P=(${px},${py})$.` },
        { level: 3, text: `$d = \\frac{|${a}\\cdot${px} - ${py} + ${b}|}{\\sqrt{${a}^2+1}} = \\frac{${num}}{\\sqrt{${den_sq}}} = ${d_display}$.` }
      ],
      solution: [
        { step: 1, title: 'Postać ogólna prostej', content: `${a}x - y + ${b} = 0`, explanation: 'Przenosimy na jedną stronę.' },
        { step: 2, title: 'Wzór na odległość', content: `d = \\frac{|${a}\\cdot${px} + (-1)\\cdot${py} + ${b}|}{\\sqrt{${a}^2+(-1)^2}} = \\frac{|${a*px - py + b}|}{\\sqrt{${den_sq}}} = \\frac{${num}}{\\sqrt{${den_sq}}}`, explanation: '' },
        { step: 3, title: 'Racjonalizacja', content: `d = \\frac{${num}\\sqrt{${den_sq}}}{${den_sq}} = ${d_display}`, explanation: '' }
      ]
    };
  }

  // === Okrąg: środek i promień z równania ===
  function circleFromEquation() {
    const cx = M.choose([-5,-4,-3,-2,-1,0,1,2,3,4,5]);
    const cy = M.choose([-5,-4,-3,-2,-1,0,1,2,3,4,5]);
    const r = M.choose([2,3,4,5,6,7,8]);

    // Postać ogólna: x² + y² - 2cx·x - 2cy·y + (cx²+cy²-r²) = 0
    const D = -2 * cx, E = -2 * cy, F = cx*cx + cy*cy - r*r;

    const standardForm = `(x${cx !== 0 ? (cx > 0 ? '-' + cx : '+' + Math.abs(cx)) : ''})^2 + (y${cy !== 0 ? (cy > 0 ? '-' + cy : '+' + Math.abs(cy)) : ''})^2 = ${r*r}`;
    const generalForm = `x^2 + y^2 ${D !== 0 ? (D > 0 ? '+' + D : D) + 'x' : ''} ${E !== 0 ? (E > 0 ? '+' + E : E) + 'y' : ''} ${F !== 0 ? (F > 0 ? '+' + F : F) : ''} = 0`;

    return {
      id: M.makeId('cat11_circle'),
      category: 11,
      categoryName: 'Geometria analityczna',
      type: 'circle_equation',
      points: 3,
      params: { cx, cy, r, D, E, F },
      statement:
        `Dany jest okrąg o równaniu\n$$${generalForm}$$\n\n` +
        `**Wyznacz środek i promień tego okręgu.** Następnie napisz równanie okręgu w postaci kanonicznej. Zapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `S = (${cx},\\ ${cy}),\\quad r = ${r}`,
        description: `Środek $S = (${cx}, ${cy})$, promień $r = ${r}$`
      },
      hints: [
        { level: 1, text: `Uzupełnij do kwadratów: $x^2 + Dx = (x + D/2)^2 - (D/2)^2$.` },
        { level: 2, text: `Uzupełnij dla $x$: $(x - ${cx})^2 - ${cx*cx}$, dla $y$: $(y - ${cy})^2 - ${cy*cy}$.` },
        { level: 3, text: `Postać kanoniczna: $${standardForm}$. Środek $(${cx}, ${cy})$, promień $${r}$.` }
      ],
      solution: [
        { step: 1, title: 'Uzupełnianie do kwadratów', content: `(x${D > 0 ? '+' + D/2 : D < 0 ? D/2 : ''})^2 ${D !== 0 ? '- ' + (D/2)*(D/2) : ''} + (y${E > 0 ? '+' + E/2 : E < 0 ? E/2 : ''})^2 ${E !== 0 ? '- ' + (E/2)*(E/2) : ''} + ${F} = 0`, explanation: '' },
        { step: 2, title: 'Postać kanoniczna', content: `${standardForm}`, explanation: '' },
        { step: 3, title: 'Wynik', content: `S = (${cx},\\ ${cy}),\\quad r = \\sqrt{${r*r}} = ${r}`, explanation: '' }
      ]
    };
  }

  // === Okrąg przez 2 punkty, środek na prostej ===
  // Wzorzec matura 2017 z.13: znajdź okrąg przez A, B z centrum na danej prostej
  const CIRCLE_THROUGH_TASKS = [
    {
      // Okrąg przez A=(1,1) i B=(5,1), środek na prostej y=3
      // Środek: (x₀, 3), odległość od A = odległość od B
      // (x₀-1)²+(3-1)² = (x₀-5)²+(3-1)²
      // (x₀-1)² = (x₀-5)² → x₀²-2x₀+1 = x₀²-10x₀+25 → 8x₀=24 → x₀=3
      // S=(3,3), r²=(3-1)²+(3-1)²=8, r=2√2
      A: [1, 1], B: [5, 1], lineStr: 'y = 3',
      center: [3, 3], r2: 8, rStr: '2\\sqrt{2}',
      eqStr: '(x-3)^2 + (y-3)^2 = 8',
      solution: [
        { step: 1, title: 'Środek na prostej', content: 'S = (x_0, 3)', explanation: 'Środek leży na prostej $y=3$.' },
        { step: 2, title: 'Równoodległość od A i B', content: '(x_0-1)^2+(3-1)^2 = (x_0-5)^2+(3-1)^2\\\\ (x_0-1)^2 = (x_0-5)^2\\\\ 8x_0 = 24 \\implies x_0 = 3', explanation: '' },
        { step: 3, title: 'Promień', content: 'r^2 = (3-1)^2+(3-1)^2 = 4+4 = 8\\\\ r = 2\\sqrt{2}', explanation: '' },
        { step: 4, title: 'Równanie okręgu', content: '(x-3)^2+(y-3)^2=8', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Środek okręgu leży na osi symetrii odcinka AB i na prostej $y=3$.' },
        { level: 2, text: 'Środek: $S=(x_0, 3)$. Z warunku $|SA|=|SB|$ wyznacz $x_0$.' },
        { level: 3, text: '$x_0=3$, $S=(3,3)$, $r^2=8$.' }
      ]
    },
    {
      // Okrąg przez A=(-2,0) i B=(4,0), środek na prostej y=x-1
      // Środek (x₀, x₀-1), równoodległość:
      // (x₀+2)²+(x₀-1)² = (x₀-4)²+(x₀-1)²
      // (x₀+2)² = (x₀-4)² → 4x₀+4=-8x₀+16... wait:
      // (x₀+2)²=(x₀-4)² → x₀²+4x₀+4 = x₀²-8x₀+16 → 12x₀=12 → x₀=1
      // S=(1,0), r²=(1+2)²+0²=9, r=3
      A: [-2, 0], B: [4, 0], lineStr: 'y = x-1',
      center: [1, 0], r2: 9, rStr: '3',
      eqStr: '(x-1)^2 + y^2 = 9',
      solution: [
        { step: 1, title: 'Środek na prostej', content: 'S = (x_0,\\ x_0-1)', explanation: 'Środek leży na prostej $y=x-1$.' },
        { step: 2, title: 'Równoodległość', content: '(x_0+2)^2+(x_0-1)^2 = (x_0-4)^2+(x_0-1)^2\\\\ (x_0+2)^2 = (x_0-4)^2\\\\ 12x_0 = 12 \\implies x_0 = 1', explanation: '' },
        { step: 3, title: 'Środek i promień', content: 'S = (1, 0),\\quad r^2 = (1-(-2))^2+0^2 = 9,\\quad r = 3', explanation: '' },
        { step: 4, title: 'Równanie', content: '(x-1)^2+y^2=9', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Środek: $S=(x_0, x_0-1)$ (na prostej $y=x-1$).' },
        { level: 2, text: 'Z $|SA|^2 = |SB|^2$ wyznacz $x_0$.' },
        { level: 3, text: '$x_0=1$, $S=(1,0)$, $r=3$.' }
      ]
    },
    {
      // Okrąg przez A=(0,2) i B=(4,6), środek na osi Ox (y=0)
      // S=(x₀,0): (x₀)²+(0-2)² = (x₀-4)²+(0-6)²
      // x₀²+4 = x₀²-8x₀+16+36 → 8x₀=48 → x₀=6
      // S=(6,0), r²=36+4=40, r=2√10
      A: [0, 2], B: [4, 6], lineStr: '\\text{oś }Ox\\text{ (y=0)}',
      center: [6, 0], r2: 40, rStr: '2\\sqrt{10}',
      eqStr: '(x-6)^2 + y^2 = 40',
      solution: [
        { step: 1, title: 'Środek na osi Ox', content: 'S = (x_0, 0)', explanation: '' },
        { step: 2, title: 'Równoodległość', content: 'x_0^2+4 = (x_0-4)^2+36\\\\ x_0^2+4 = x_0^2-8x_0+52\\\\ 8x_0 = 48 \\implies x_0 = 6', explanation: '' },
        { step: 3, title: 'Promień', content: 'r^2 = 36+4 = 40,\\quad r = 2\\sqrt{10}', explanation: '' },
        { step: 4, title: 'Równanie', content: '(x-6)^2+y^2=40', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Środek okręgu leży na osi $Ox$: $S=(x_0, 0)$.' },
        { level: 2, text: 'Warunek $|SA|=|SB|$: $(x_0)^2+4=(x_0-4)^2+36$.' },
        { level: 3, text: '$x_0=6$, $r^2=40$.' }
      ]
    }
  ];

  function circleThroughPoints() {
    const task = M.choose(CIRCLE_THROUGH_TASKS);
    return {
      id: M.makeId('cat11_circle2pts'),
      category: 11,
      categoryName: 'Geometria analityczna',
      type: 'circle_through_points',
      points: 5,
      params: {},
      statement:
        `Okrąg przechodzi przez punkty $A = (${task.A[0]},\\ ${task.A[1]})$ i $B = (${task.B[0]},\\ ${task.B[1]})$, ` +
        `a jego środek leży na prostej $${task.lineStr}$.\n\n` +
        `**Wyznacz równanie tego okręgu.** Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: task.eqStr,
        description: `$${task.eqStr}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  // === Dwa okręgi — warunek styczny ===
  // Wzorzec matura 2019 z.11: znajdź parametr a, przy którym okręgi mają dokładnie jeden wspólny punkt
  const TWO_CIRCLES_TASKS = [
    {
      // k₁: (x-2)²+(y-1)²=9, k₂: (x-a)²+(y+2)²=4
      // Zewnętrzna styczna: d=r₁+r₂=5
      // d²=(2-a)²+(1+2)²=(2-a)²+9=25 → (2-a)²=16 → a=6 lub a=-2
      // Wewnętrzna styczna: d=|r₁-r₂|=1 → (2-a)²+9=1 → (2-a)²=-8 — niemożliwe
      c1Str: '(x-2)^2+(y-1)^2=9', c1: [2,1,3],
      c2Str: '(x-a)^2+(y+2)^2=4', r2: 2,
      external_only: true,
      answer_display: 'a = 6 \\text{ lub } a = -2',
      solution: [
        { step: 1, title: 'Warunek stycznej zewnętrznej', content: 'd = r_1+r_2 = 3+2 = 5', explanation: '' },
        { step: 2, title: 'Odległość środków', content: 'd^2 = (2-a)^2+(1-(-2))^2 = (2-a)^2+9 = 25\\\\ (2-a)^2 = 16', explanation: '' },
        { step: 3, title: 'Wartości a', content: '2-a = \\pm 4 \\implies a = -2\\text{ lub }a = 6', explanation: '' },
        { step: 4, title: 'Styczna wewnętrzna', content: 'd = |r_1-r_2| = 1 \\implies (2-a)^2+9=1\\text{ — niemożliwe}', explanation: 'Tylko styczna zewnętrzna.' }
      ],
      hints: [
        { level: 1, text: 'Okręgi mają jeden wspólny punkt gdy: $d = r_1+r_2$ (zewnętrzna) lub $d=|r_1-r_2|$ (wewnętrzna).' },
        { level: 2, text: '$r_1=3$, $r_2=2$. Środki: $(2,1)$ i $(a,-2)$. Oblicz $d^2=(2-a)^2+9$.' },
        { level: 3, text: '$d=5$: $(2-a)^2=16$, $a=6$ lub $a=-2$.' }
      ]
    },
    {
      // k₁: x²+y²=16, k₂: (x-a)²+(y-3)²=1
      // Zewnętrzna: d=r₁+r₂=4+1=5 → a²+9=25 → a²=16 → a=±4
      // Wewnętrzna: d=r₁-r₂=3 → a²+9=9 → a=0
      c1Str: 'x^2+y^2=16', c1: [0,0,4],
      c2Str: '(x-a)^2+(y-3)^2=1', r2: 1,
      answer_display: 'a \\in \\{-4,\\ 0,\\ 4\\}',
      solution: [
        { step: 1, title: 'Odległość środków', content: 'd^2 = a^2+9', explanation: 'Środek k₂ to $(a,3)$, środek k₁ to $(0,0)$.' },
        { step: 2, title: 'Styczna zewnętrzna (d=5)', content: 'a^2+9=25 \\implies a^2=16 \\implies a=\\pm4', explanation: '' },
        { step: 3, title: 'Styczna wewnętrzna (d=3)', content: 'a^2+9=9 \\implies a=0', explanation: 'k₂ leży wewnątrz k₁.' },
        { step: 4, title: 'Odpowiedź', content: 'a \\in \\{-4,\\ 0,\\ 4\\}', explanation: '' }
      ],
      hints: [
        { level: 1, text: 'Jeden wspólny punkt: $d=r_1+r_2$ lub $d=|r_1-r_2|$.' },
        { level: 2, text: '$d^2=a^2+9$. Rozpatrz oba przypadki.' },
        { level: 3, text: 'Zewnętrzna: $a=\\pm4$. Wewnętrzna: $a=0$.' }
      ]
    }
  ];

  function twoCirclesParam() {
    const task = M.choose(TWO_CIRCLES_TASKS);
    return {
      id: M.makeId('cat11_2circles'),
      category: 11,
      categoryName: 'Geometria analityczna',
      type: 'two_circles_param',
      points: 5,
      params: {},
      statement:
        `Dane są okręgi:\n$$k_1:\\ ${task.c1Str}$$\n$$k_2:\\ ${task.c2Str}$$\n` +
        `gdzie $a$ jest parametrem rzeczywistym.\n\n` +
        `**Wyznacz wszystkie wartości $a$, dla których okręgi $k_1$ i $k_2$ mają dokładnie jeden punkt wspólny.** ` +
        `Zapisz obliczenia.`,
      answer: {
        type: 'expression',
        display: task.answer_display,
        description: `$${task.answer_display}$`
      },
      hints: task.hints,
      solution: task.solution
    };
  }

  function generate() {
    // lineThrough i circleFromEquation usunięte — prosta prosta / odczyt równania okręgu
    // circleTangent, circleThroughPoints, twoCirclesParam, pointLineDistance — poziom 8/10
    return M.choose([circleTangent, pointLineDistance, circleThroughPoints, twoCirclesParam])();
  }

  return { generate };
})();
