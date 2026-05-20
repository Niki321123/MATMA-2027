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

  function generate() {
    return M.choose([circleTangent, lineThrough, pointLineDistance, circleFromEquation])();
  }

  return { generate };
})();
