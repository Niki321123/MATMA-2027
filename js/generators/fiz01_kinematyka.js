// Generator: Kinematyka (rzut, ruch jednostajny i przyspieszony)
window.fiz01 = (() => {
  const M = window.MathUtils;

  // Schemat A: Pościg (ruch jednostajny + jednostajnie przyspieszony) — 2023 zad.1
  function schemeA() {
    const v0 = M.choose([15, 20, 25, 18, 16]); // prędkość policjanta m/s
    const v  = M.choose([30, 35, 40, 45, 32]); // prędkość uciekającego m/s
    if (v <= v0) return schemeA();
    const a  = M.choose([4, 5, 6, 8]);          // przyspieszenie m/s²
    const d0 = M.choose([20, 30, 40, 50]);       // początkowa odległość m

    // t_max gdy v_rel = 0 → v0 + a*t = v → t = (v-v0)/a
    const t_max = (v - v0) / a;
    // Odległość maksymalna = d0 + v*t - (v0*t + 0.5*a*t²)
    const d_max_val = d0 + v * t_max - (v0 * t_max + 0.5 * a * t_max * t_max);
    const d_max = Math.round(d_max_val * 100) / 100;

    return {
      id: M.makeId('fiz01_poscig'),
      category: 'fiz01',
      categoryName: 'Kinematyka',
      type: 'kinematyka_poscig',
      points: 4,
      params: { v0, v, a, d0, t_max, d_max },
      statement: `Samochód policyjny jedzie ze stałą prędkością $v_0 = ${v0}\\,\\text{m/s}$.
W chwili $t_0 = 0$ zostaje wyprzedzony przez samochód jadący ze stałą prędkością $v = ${v}\\,\\text{m/s}$.
W tej chwili odległość między samochodami wynosi $d_0 = ${d0}\\,\\text{m}$,
a policjant rozpoczyna pościg ze stałym przyspieszeniem $a = ${a}\\,\\text{m/s}^2$.

Oblicz $d_{\\max}$ — maksymalną odległość między samochodami podczas pościgu.`,
      answer: {
        type: 'numeric',
        display: `d_{\\max} = ${d_max}\\,\\text{m}`,
        description: `Maksymalna odległość wynosi ${d_max} m (w chwili, gdy prędkości obu samochodów się wyrównają, czyli po czasie $t = ${t_max}\\,\\text{s}$).`
      },
      hints: [
        { level: 1, text: 'Odległość jest maksymalna, gdy prędkości obu samochodów są równe.' },
        { level: 2, text: `Wyznacz czas $t^*$ kiedy $v_0 + a\\cdot t^* = v$, czyli $t^* = \\frac{v - v_0}{a} = ${t_max}\\,\\text{s}$.` },
        { level: 3, text: `Policz odległość w chwili $t^*$: $d(t^*) = d_0 + v\\cdot t^* - \\left(v_0 t^* + \\frac{1}{2}a t^{*2}\\right)$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Warunek maksimum odległości',
          content: `v_0 + a\\cdot t^* = v \\implies t^* = \\frac{v - v_0}{a} = \\frac{${v} - ${v0}}{${a}} = ${t_max}\\,\\text{s}`,
          explanation: 'Odległość rośnie dopóki policjant jedzie wolniej od uciekającego.'
        },
        {
          step: 2,
          title: 'Odległość w chwili t*',
          content: `d_{\\max} = d_0 + v\\cdot t^* - v_0 t^* - \\tfrac{1}{2}a t^{*2} = ${d0} + ${v}\\cdot ${t_max} - ${v0}\\cdot ${t_max} - \\tfrac{1}{2}\\cdot ${a}\\cdot ${t_max}^2 = ${d_max}\\,\\text{m}`,
          explanation: 'Stosujemy wzory na drogi obu samochodów.'
        }
      ]
    };
  }

  // Schemat B: Rzut poziomy — wyznacz odległość/czas lotu
  function schemeB() {
    const h = M.choose([20, 45, 80, 125, 180, 45, 20]); // wysokość m
    const v0 = M.choose([5, 10, 15, 20, 25, 30]);         // prędkość pozioma m/s
    const g = 10;

    // t = sqrt(2h/g)
    const t_sq = 2 * h / g;
    const t_flight = Math.sqrt(t_sq);
    const t_nice = Math.round(t_flight * 100) / 100;
    const x = Math.round(v0 * t_flight * 100) / 100;
    const vy = Math.round(g * t_flight * 100) / 100;
    const v_final = Math.round(Math.sqrt(v0 * v0 + vy * vy) * 100) / 100;

    return {
      id: M.makeId('fiz01_rzut_poziomy'),
      category: 'fiz01',
      categoryName: 'Kinematyka',
      type: 'kinematyka_rzut_poziomy',
      points: 3,
      params: { h, v0, g, t_nice, x, v_final },
      statement: `Z krawędzi klifu o wysokości $h = ${h}\\,\\text{m}$ wyrzucono poziomo ciało
z prędkością $v_0 = ${v0}\\,\\text{m/s}$. Przyjmij $g = ${g}\\,\\text{m/s}^2$, pomijaj opory powietrza.

Oblicz $x$ — zasięg poziomy rzutu (odległość od podstawy klifu).`,
      answer: {
        type: 'numeric',
        display: `x = ${x}\\,\\text{m}`,
        description: `Czas lotu $t = ${t_nice}\\,\\text{s}$, zasięg $x = ${x}\\,\\text{m}$.`
      },
      hints: [
        { level: 1, text: 'Ruch poziomy: $x = v_0 \\cdot t$. Ruch pionowy (swobodny spadek): $h = \\frac{1}{2}g t^2$.' },
        { level: 2, text: `Z ruchu pionowego wyznacz czas lotu: $t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2\\cdot${h}}{${g}}} = ${t_nice}\\,\\text{s}$.` },
        { level: 3, text: `Podstaw do wzoru na ruch poziomy: $x = ${v0}\\cdot ${t_nice} = ${x}\\,\\text{m}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Czas lotu',
          content: `h = \\tfrac{1}{2}g t^2 \\implies t = \\sqrt{\\tfrac{2h}{g}} = \\sqrt{\\tfrac{2\\cdot ${h}}{${g}}} = ${t_nice}\\,\\text{s}`,
          explanation: 'Ruch pionowy to swobodny spadek.'
        },
        {
          step: 2,
          title: 'Zasięg poziomy',
          content: `x = v_0 \\cdot t = ${v0} \\cdot ${t_nice} = ${x}\\,\\text{m}`,
          explanation: 'W poziomie ciało porusza się ruchem jednostajnym.'
        }
      ]
    };
  }

  // Schemat C: Dwa ciała w ruchu — spotkanie (rzut pionowy + poziomy) — 2025 zad.1
  function schemeC() {
    // Kulka A rzucona poziomo z (0, h), kulka B rzucona pionowo w górę z (x_B, 0)
    // Spotykają się w punkcie C
    const h  = M.choose([10, 12, 15, 20]);   // wysokość punktu A
    const xB = M.choose([4, 6, 8, 10]);       // poziome przesunięcie B
    const yC = M.choose([2, 3, 4, 5]);        // wysokość spotkania
    const g  = 10;

    // Kulka A: xA(t) = v0A*t, yA(t) = h - 0.5*g*t²
    // Kulka B: xB(t) = xB, yB(t) = v0B*t - 0.5*g*t²
    // Spotkanie: yA = yC → t = sqrt(2*(h-yC)/g)
    const t_meet = Math.sqrt(2 * (h - yC) / g);
    const t_nice = Math.round(t_meet * 100) / 100;
    const v0A = xB / t_meet;
    const v0A_nice = Math.round(v0A * 100) / 100;
    // yB(t) = yC → v0B*t - 0.5*g*t² = yC → v0B = (yC + 0.5*g*t²)/t
    const v0B = (yC + 0.5 * g * t_meet * t_meet) / t_meet;
    const v0B_nice = Math.round(v0B * 100) / 100;

    return {
      id: M.makeId('fiz01_spotkanie'),
      category: 'fiz01',
      categoryName: 'Kinematyka',
      type: 'kinematyka_spotkanie',
      points: 3,
      params: { h, xB, yC, g, t_nice, v0A_nice, v0B_nice },
      statement: `Z punktu $A = (0,\\,${h}\\,\\text{m})$ w chwili $t=0$ rzucono poziomo kulkę $K_A$
z prędkością $v_{0A} = ${v0A_nice}\\,\\text{m/s}$.
Z punktu $B = (${xB}\\,\\text{m},\\,0)$ rzucono jednocześnie pionowo w górę kulkę $K_B$.
Kulki spotkały się w punkcie $C = (${xB}\\,\\text{m},\\,${yC}\\,\\text{m})$.

Oblicz $v_{0B}$ — wartość prędkości początkowej kulki $K_B$. Przyjmij $g = ${g}\\,\\text{m/s}^2$.`,
      answer: {
        type: 'numeric',
        display: `v_{0B} = ${v0B_nice}\\,\\text{m/s}`,
        description: `Czas spotkania $t = ${t_nice}\\,\\text{s}$, prędkość kulki B: $v_{0B} = ${v0B_nice}\\,\\text{m/s}$.`
      },
      hints: [
        { level: 1, text: 'Czas spotkania wyznacz z ruchu kulki A (pionowego): $y_A = h - \\frac{1}{2}gt^2 = y_C$.' },
        { level: 2, text: `$t = \\sqrt{\\frac{2(h - y_C)}{g}} = ${t_nice}\\,\\text{s}$` },
        { level: 3, text: `Zastosuj do kulki B: $y_B = v_{0B}\\cdot t - \\frac{1}{2}gt^2 = y_C$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Czas spotkania z ruchu kulki A',
          content: `h - \\tfrac{1}{2}g t^2 = y_C \\implies t = \\sqrt{\\tfrac{2(${h}-${yC})}{${g}}} = ${t_nice}\\,\\text{s}`,
          explanation: 'Kulka A porusza się pionowo jak swobodny spadek.'
        },
        {
          step: 2,
          title: 'Prędkość początkowa kulki B',
          content: `v_{0B}\\cdot t - \\tfrac{1}{2}g t^2 = y_C \\implies v_{0B} = \\tfrac{y_C + \\frac{1}{2}g t^2}{t} = \\tfrac{${yC} + \\frac{1}{2}\\cdot${g}\\cdot${t_nice}^2}{${t_nice}} = ${v0B_nice}\\,\\text{m/s}`,
          explanation: 'Kulka B wykonuje rzut pionowy w górę.'
        }
      ]
    };
  }

  // Schemat D: Rzut pionowy w górę — wykres h(t)
  function schemeD() {
    const h0 = M.choose([5, 8, 10, 12, 15]);  // wysokość startowa m
    const v0 = M.choose([10, 15, 20, 25]);      // prędkość początkowa m/s
    const g = 10;

    // t_max (szczyt) = v0/g
    const t_top = v0 / g;
    // h_max = h0 + v0²/(2g)
    const h_max = h0 + v0 * v0 / (2 * g);
    // t_land (zderzenie z ziemią): h0 + v0*t - 0.5*g*t² = 0
    // 0.5*g*t² - v0*t - h0 = 0
    const disc = v0 * v0 + 2 * g * h0;
    const t_land = (v0 + Math.sqrt(disc)) / g;
    const t_land_nice = Math.round(t_land * 100) / 100;

    return {
      id: M.makeId('fiz01_rzut_pionowy'),
      category: 'fiz01',
      categoryName: 'Kinematyka',
      type: 'kinematyka_rzut_pionowy',
      points: 3,
      params: { h0, v0, g, t_top, h_max, t_land_nice },
      statement: `Z wysokości $h_0 = ${h0}\\,\\text{m}$ nad ziemią wyrzucono pionowo w górę ciało
z prędkością $v_0 = ${v0}\\,\\text{m/s}$. Przyjmij $g = ${g}\\,\\text{m/s}^2$.

a) Oblicz $h_{\\max}$ — maksymalną wysokość ciała nad ziemią.
b) Oblicz czas lotu ciała do momentu uderzenia w podłoże.`,
      answer: {
        type: 'multipart',
        display: `h_{\\max} = ${h_max}\\,\\text{m},\\quad t_{\\text{lot}} = ${t_land_nice}\\,\\text{s}`,
        description: `Ciało wznosi się do wysokości ${h_max} m, a uderza w ziemię po czasie ${t_land_nice} s.`
      },
      hints: [
        { level: 1, text: `Na szczycie prędkość = 0. Czas wznoszenia: $t_1 = \\frac{v_0}{g} = ${t_top}\\,\\text{s}$.` },
        { level: 2, text: `$h_{\\max} = h_0 + v_0 t_1 - \\frac{1}{2}g t_1^2 = ${h_max}\\,\\text{m}$.` },
        { level: 3, text: `Czas lotu z równania kwadratowego: $h_0 + v_0 t - \\frac{1}{2}g t^2 = 0$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Wysokość maksymalna',
          content: `h_{\\max} = h_0 + \\frac{v_0^2}{2g} = ${h0} + \\frac{${v0}^2}{2\\cdot${g}} = ${h_max}\\,\\text{m}`,
          explanation: 'Na szczycie energia kinetyczna = 0, cała jest potencjalna.'
        },
        {
          step: 2,
          title: 'Czas lotu',
          content: `h_0 + v_0 t - \\tfrac{1}{2}g t^2 = 0 \\implies t = \\frac{v_0 + \\sqrt{v_0^2 + 2g h_0}}{g} = ${t_land_nice}\\,\\text{s}`,
          explanation: 'Rozwiązujemy równanie kwadratowe, bierzemy dodatni pierwiastek.'
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC, schemeD])();
  }

  return { generate };
})();
