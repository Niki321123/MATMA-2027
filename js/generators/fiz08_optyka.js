// Generator: Optyka geometryczna (soczewki, prawo Snella, całkowite wewnętrzne)
window.fiz08 = (() => {
  const M = window.MathUtils;

  // Schemat A: Układ dwóch soczewek skupiających (2024 zad.9)
  function schemeA() {
    const f1 = M.choose([10, 15, 20, 25]);   // cm
    const f2 = M.choose([25, 30, 40, 50]);   // cm
    const w1 = M.choose([1.5, 2, 3, 4]);     // szerokość wejściowej wiązki mm

    // Prawy ognisk S1 = lewy ognisk S2 → zoom = f2/f1 (powiększenie wiązki)
    const zoom = f2 / f1;
    const w2 = Math.round(w1 * zoom * 100) / 100;

    return {
      id: M.makeId('fiz08_uklad_soczewek'),
      category: 'fiz08',
      categoryName: 'Optyka geometryczna',
      type: 'optyka_uklad_soczewek',
      points: 2,
      params: { f1, f2, w1, w2, zoom },
      statement: `Układ dwóch soczewek skupiających $S_1$ i $S_2$ o ogniskowych $f_1 = ${f1}\\,\\text{cm}$ i $f_2 = ${f2}\\,\\text{cm}$
ustawiono tak, że prawe ognisko $S_1$ pokrywa się z lewym ogniskiem $S_2$.
Na $S_1$ pada wiązka równoległa do osi optycznej o szerokości $d_1 = ${w1}\\,\\text{mm}$.

Oblicz $d_2$ — szerokość wiązki wychodzącej z $S_2$.`,
      answer: {
        type: 'numeric',
        display: `d_2 = \\frac{f_2}{f_1}\\cdot d_1 = \\frac{${f2}}{${f1}}\\cdot${w1} = ${w2}\\,\\text{mm}`,
        description: `Powiększenie kątowe układu = f₂/f₁. Szerokość wiązki: d₂ = ${w2} mm.`
      },
      hints: [
        { level: 1, text: 'Promienie równoległe do osi ogniskują się w ognisku $S_1$, a potem wychodzą z $S_2$ jako równoległa wiązka.' },
        { level: 2, text: 'Powiększenie układu (luneta Keplera): $M = f_2/f_1$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Powiększenie kątowe',
          content: `M = \\frac{f_2}{f_1} = \\frac{${f2}}{${f1}} = ${zoom}`,
          explanation: 'Gdy wspólne ognisko S1 i S2 leżą w tym samym punkcie, szerokość wiązki rośnie M-krotnie.'
        },
        {
          step: 2,
          title: 'Szerokość wiązki wyjściowej',
          content: `d_2 = M\\cdot d_1 = ${zoom}\\cdot${w1} = ${w2}\\,\\text{mm}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat B: Równanie soczewki — wyznacz ogniskową lub położenie obrazu
  function schemeB() {
    const f = M.choose([10, 15, 20, 25, 30]);  // cm
    const x = M.choose([2, 3, 4]);              // mnożnik f dla odległości przedmiotu
    const u = x * f;  // odległość przedmiotu

    // 1/v = 1/f - 1/u → v = u*f/(u-f)
    const v = Math.round(u * f / (u - f));
    const powi = Math.round(-v / u * 100) / 100;  // powiększenie liniowe

    return {
      id: M.makeId('fiz08_rownanie_soczewki'),
      category: 'fiz08',
      categoryName: 'Optyka geometryczna',
      type: 'optyka_rownanie_soczewki',
      points: 3,
      params: { f, u, v, powi },
      statement: `Soczewka skupiająca ma ogniskową $f = ${f}\\,\\text{cm}$.
Przedmiot umieszczono w odległości $u = ${u}\\,\\text{cm}$ od soczewki.

Oblicz:
a) odległość obrazu $v$ od soczewki,
b) powiększenie liniowe $p$.`,
      answer: {
        type: 'multipart',
        display: `v = ${v}\\,\\text{cm},\\quad p = ${powi}`,
        description: `Obraz leży w odległości ${v} cm od soczewki. Powiększenie = ${powi} (${powi < 0 ? 'obraz odwrócony' : 'obraz prosty'}).`
      },
      hints: [
        { level: 1, text: `Równanie soczewki: $\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}$ lub $\\frac{1}{v} = \\frac{1}{f} + \\frac{1}{u}$ (konwencja znakowa!).` },
        { level: 2, text: `Dla przedmiotu po lewej stronie soczewki: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{(-u)} \\Rightarrow \\frac{1}{v} = \\frac{1}{f} - \\frac{1}{u}$.` },
        { level: 3, text: `Powiększenie liniowe: $p = -v/u$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Odległość obrazu',
          content: `\\frac{1}{v} = \\frac{1}{f} - \\frac{1}{u} = \\frac{1}{${f}} - \\frac{1}{${u}} = \\frac{${u} - ${f}}{${f*u}} \\implies v = \\frac{${f*u}}{${u-f}} = ${v}\\,\\text{cm}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Powiększenie',
          content: `p = -\\frac{v}{u} = -\\frac{${v}}{${u}} = ${powi}`,
          explanation: `Powiększenie ujemne oznacza obraz odwrócony i rzeczywisty.`
        }
      ]
    };
  }

  // Schemat C: Prawo Snella — złamanie światła na granicy ośrodków
  function schemeC() {
    const n1 = 1.0;   // powietrze
    const n2 = M.choose([1.3, 1.4, 1.5, 1.6, 1.7]); // szkło/woda
    const theta1 = M.choose([30, 45, 60]);  // kąt padania stopnie

    // n1 * sin(theta1) = n2 * sin(theta2)
    const sinT2 = Math.sin(theta1 * Math.PI / 180) / n2;
    const theta2 = Math.round(Math.asin(sinT2) * 180 / Math.PI * 10) / 10;

    // Prędkość w szkle: v = c/n
    const c = 3e8;
    const v_glass = Math.round(c / n2 / 1e6) / 100;  // ×10⁸ m/s

    return {
      id: M.makeId('fiz08_snell'),
      category: 'fiz08',
      categoryName: 'Optyka geometryczna',
      type: 'optyka_prawo_snella',
      points: 3,
      params: { n1, n2, theta1, theta2, v_glass },
      statement: `Promień światła biegnący w powietrzu pada na płaską powierzchnię szkła ($n = ${n2}$)
pod kątem $\\theta_1 = ${theta1}°$ (kąt między promieniem a normalną).

a) Oblicz kąt załamania $\\theta_2$.
b) Oblicz prędkość światła w szkle (przyjmij $c = 3\\cdot10^8\\,\\text{m/s}$).`,
      answer: {
        type: 'multipart',
        display: `\\theta_2 = ${theta2}°,\\quad v = \\frac{c}{n} = ${v_glass}\\cdot10^8\\,\\text{m/s}`,
        description: `Kąt załamania: ${theta2}°. Prędkość w szkle: ${v_glass}×10⁸ m/s.`
      },
      hints: [
        { level: 1, text: `Prawo Snella: $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$.` },
        { level: 2, text: `$\\sin\\theta_2 = \\frac{n_1}{n_2}\\sin\\theta_1 = \\frac{1}{${n2}}\\sin${theta1}°$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Prawo Snella',
          content: `\\sin\\theta_2 = \\frac{\\sin${theta1}°}{${n2}} = \\frac{${Math.round(Math.sin(theta1 * Math.PI / 180) * 1000) / 1000}}{${n2}} = ${Math.round(sinT2 * 1000) / 1000} \\implies \\theta_2 = ${theta2}°`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Prędkość w szkle',
          content: `v = \\frac{c}{n} = \\frac{3\\cdot10^8}{${n2}} = ${v_glass}\\cdot10^8\\,\\text{m/s}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat D: Kąt graniczny całkowitego wewnętrznego odbicia (2026 zad.8)
  function schemeD() {
    const n_glass = M.choose([1.4, 1.5, 1.6, 1.7]);  // szkło
    const n_air = 1.0;

    // sin(theta_c) = n_air / n_glass
    const sinTc = n_air / n_glass;
    const theta_c = Math.round(Math.asin(sinTc) * 180 / Math.PI * 10) / 10;
    const alpha = Math.round((90 - theta_c) * 10) / 10;  // kąt α na rysunku

    return {
      id: M.makeId('fiz08_tir'),
      category: 'fiz08',
      categoryName: 'Optyka geometryczna',
      type: 'optyka_kat_graniczny',
      points: 3,
      params: { n_glass, theta_c, alpha },
      statement: `Szklana kula (współczynnik załamania $n = ${n_glass}$) leży w powietrzu.
Wewnątrz kuli, tuż pod jej powierzchnią, umieszczono małą diodę LED emitującą światło we wszystkich kierunkach.
Okazuje się, że światło wychodzi z kuli jedynie przez fragment powierzchni.

Oblicz $\\alpha$ — połowę kąta tego fragmentu (kąt między promieniem normalnym a skrajnym promieniem wychodzącym z kuli).`,
      answer: {
        type: 'numeric',
        display: `\\alpha = 90° - \\theta_c = 90° - \\arcsin\\!\\left(\\frac{1}{${n_glass}}\\right) \\approx ${alpha}°`,
        description: `Kąt graniczny: θ_c ≈ ${theta_c}°. Kąt fragmentu α ≈ ${alpha}°.`
      },
      hints: [
        { level: 1, text: `Kąt graniczny całkowitego wewnętrznego odbicia: $\\sin\\theta_c = \\frac{n_{\\text{pow}}}{n_{\\text{szkło}}} = \\frac{1}{${n_glass}}$.` },
        { level: 2, text: `$\\theta_c = \\arcsin\\left(\\frac{1}{${n_glass}}\\right) \\approx ${theta_c}°$.` },
        { level: 3, text: `Dla promieni padających pod kątem > θ_c (mierzonym od normalnej) — całkowite wewnętrzne odbicie. Kąt α = 90° − θ_c.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Kąt graniczny',
          content: `\\theta_c = \\arcsin\\!\\left(\\frac{1}{${n_glass}}\\right) = \\arcsin(${Math.round(sinTc * 1000) / 1000}) \\approx ${theta_c}°`,
          explanation: 'Przy kącie padania równym θ_c kąt załamania = 90°.'
        },
        {
          step: 2,
          title: 'Kąt fragmentu wyjścia',
          content: `\\alpha = 90° - \\theta_c = 90° - ${theta_c}° = ${alpha}°`,
          explanation: 'Promienie padające pod kątem ≤ θ_c od normalnej mogą wyjść z kuli.'
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC, schemeD])();
  }

  return { generate };
})();
