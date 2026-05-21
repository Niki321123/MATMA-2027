// Generator: Drgania harmoniczne (masa na sprężynie, wahadło)
window.fiz06 = (() => {
  const M = window.MathUtils;

  // Schemat A: Masa na sprężynie — wykres v(t), wyznacz siłę sprężystości (2024 zad.3)
  function schemeA() {
    const m_g = M.choose([50, 100, 200, 500]);   // masa w gramach
    const m = m_g / 1000;                         // kg
    const T = M.choose([0.2, 0.4, 0.5, 0.6, 1.0]); // okres s
    const A = M.choose([2, 3, 4, 5, 6, 8]) / 100;  // amplituda m (cm→m)
    const g = 9.81;

    // v_max = A * omega = A * 2pi/T
    const omega = 2 * Math.PI / T;
    const v_max = Math.round(A * omega * 1000) / 1000;

    // k = m * omega²
    const k = Math.round(m * omega * omega * 100) / 100;

    // Siła sprężystości w najniższym punkcie = k * (A + x_0) gdzie x_0 = mg/k
    const x0 = m * g / k;
    const F_bottom = Math.round(k * (A + x0) * 1000) / 1000;
    // = k*A + mg
    const F_bottom2 = Math.round((k * A + m * g) * 1000) / 1000;

    return {
      id: M.makeId('fiz06_masa_sprezyna'),
      category: 'fiz06',
      categoryName: 'Drgania harmoniczne',
      type: 'drgania_masa_sprezyna',
      points: 4,
      params: { m_g, T, A_cm: Math.round(A * 100), k, v_max, F_bottom2 },
      statement: `Ciężarek o masie $m = ${m_g}\\,\\text{g}$ zawieszony na sprężynie wykonuje drgania harmoniczne w kierunku pionowym. Amplituda drgań: $A = ${Math.round(A * 100)}\\,\\text{cm}$, okres: $T = ${T}\\,\\text{s}$.
Przyjmij $g = 9{,}81\\,\\text{m/s}^2$.

a) Oblicz $k$ — współczynnik sprężystości sprężyny.
b) Oblicz wartość siły sprężystości działającej na ciężarek w najniższym punkcie drgań.`,
      answer: {
        type: 'multipart',
        display: `k = ${k}\\,\\text{N/m},\\quad F_{\\text{spr,dół}} = ${F_bottom2}\\,\\text{N}`,
        description: `Stała sprężyny: k = ${k} N/m. Siła sprężystości na dole: ${F_bottom2} N.`
      },
      hints: [
        { level: 1, text: `Okres drgań: $T = 2\\pi\\sqrt{\\frac{m}{k}} \\implies k = m\\left(\\frac{2\\pi}{T}\\right)^2$.` },
        { level: 2, text: `Wydłużenie równowagowe sprężyny: $x_0 = \\frac{mg}{k}$.` },
        { level: 3, text: 'Na dole: $F_{\\text{spr}} = k(A + x_0) = kA + mg$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Stała sprężyny',
          content: `k = m\\left(\\frac{2\\pi}{T}\\right)^2 = ${m}\\cdot\\left(\\frac{2\\pi}{${T}}\\right)^2 \\approx ${k}\\,\\text{N/m}`,
          explanation: 'Ze wzoru na okres drgań masy na sprężynie.'
        },
        {
          step: 2,
          title: 'Siła sprężystości na dole',
          content: `F = kA + mg = ${k}\\cdot${A} + ${m}\\cdot9{,}81 = ${F_bottom2}\\,\\text{N}`,
          explanation: 'W najniższym punkcie wychylenie od równowagi = A, dodajemy rozciągnięcie równowagowe.'
        }
      ]
    };
  }

  // Schemat B: Wahadło matematyczne — wyznacz długość
  function schemeB() {
    const T = M.choose([1.0, 1.4, 2.0, 2.8, 3.0]);  // okres s
    const g = M.choose([9.80, 9.81, 9.82]);

    // T = 2pi * sqrt(L/g) → L = g*(T/2pi)²
    const L = Math.round(g * Math.pow(T / (2 * Math.PI), 2) * 1000) / 1000;

    return {
      id: M.makeId('fiz06_wahadlo'),
      category: 'fiz06',
      categoryName: 'Drgania harmoniczne',
      type: 'drgania_wahadlo',
      points: 2,
      params: { T, g, L },
      statement: `Wahadło matematyczne wykonuje drgania o okresie $T = ${T}\\,\\text{s}$.
Przyjmij $g = ${g}\\,\\text{m/s}^2$.

Oblicz $L$ — długość wahadła.`,
      answer: {
        type: 'numeric',
        display: `L = \\frac{g}{4\\pi^2}T^2 \\approx ${L}\\,\\text{m}`,
        description: `Długość wahadła: L ≈ ${L} m.`
      },
      hints: [
        { level: 1, text: `Wzór na okres wahadła matematycznego: $T = 2\\pi\\sqrt{\\frac{L}{g}}$.` },
        { level: 2, text: `Przekształć: $L = \\frac{gT^2}{4\\pi^2}$.` },
        { level: 3, text: `$L = \\frac{${g}\\cdot${T}^2}{4\\pi^2} \\approx ${L}\\,\\text{m}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Długość wahadła',
          content: `L = \\frac{gT^2}{4\\pi^2} = \\frac{${g}\\cdot${T}^2}{4\\pi^2} \\approx ${L}\\,\\text{m}`,
          explanation: 'Wyznaczamy L z wzoru na okres wahadła matematycznego.'
        }
      ]
    };
  }

  // Schemat C: Masa na sprężynie — ocena prawdziwości twierdzeń (True/False)
  function schemeC() {
    const m_g = M.choose([100, 200, 500]);
    const m = m_g / 1000;
    const k = M.choose([10, 20, 40, 50]);   // N/m
    const A = M.choose([0.05, 0.10, 0.15]); // m

    const omega = Math.sqrt(k / m);
    const T = Math.round(2 * Math.PI / omega * 1000) / 1000;
    const v_max = Math.round(A * omega * 1000) / 1000;
    const E_total = Math.round(0.5 * k * A * A * 1000) / 1000;  // J

    return {
      id: M.makeId('fiz06_drgania_analiza'),
      category: 'fiz06',
      categoryName: 'Drgania harmoniczne',
      type: 'drgania_analiza',
      points: 2,
      params: { m_g, k, A_cm: Math.round(A * 100), T, v_max, E_total },
      statement: `Ciężarek o masie $m = ${m_g}\\,\\text{g}$ jest zawieszony na sprężynie o stałej $k = ${k}\\,\\text{N/m}$
i wykonuje drgania harmoniczne o amplitudzie $A = ${Math.round(A * 100)}\\,\\text{cm}$.

Oblicz:
a) Okres drgań $T$.
b) Maksymalną prędkość ciężarka $v_{\\max}$.
c) Całkowitą energię układu $E$.`,
      answer: {
        type: 'multipart',
        display: `T = ${T}\\,\\text{s},\\quad v_{\\max} = ${v_max}\\,\\text{m/s},\\quad E = ${E_total}\\,\\text{J}`,
        description: `T = ${T} s, v_max = ${v_max} m/s, E = ${E_total} J.`
      },
      hints: [
        { level: 1, text: `$T = 2\\pi\\sqrt{\\frac{m}{k}}$, $v_{\\max} = A\\omega = A\\sqrt{\\frac{k}{m}}$, $E = \\frac{1}{2}kA^2$.` },
        { level: 2, text: `$\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{${k}}{${m}}}\\,\\text{rad/s}$.` },
        { level: 3, text: 'Oblicz kolejno T, v_max, E.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Pulsacja własna',
          content: `\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{${k}}{${m}}} = ${Math.round(omega * 1000) / 1000}\\,\\text{rad/s}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Okres i prędkość maksymalna',
          content: `T = \\frac{2\\pi}{\\omega} = ${T}\\,\\text{s} \\qquad v_{\\max} = A\\omega = ${A}\\cdot${Math.round(omega * 1000) / 1000} = ${v_max}\\,\\text{m/s}`,
          explanation: ''
        },
        {
          step: 3,
          title: 'Energia układu',
          content: `E = \\tfrac{1}{2}kA^2 = \\tfrac{1}{2}\\cdot${k}\\cdot${A}^2 = ${E_total}\\,\\text{J}`,
          explanation: 'Energia całkowita = maksymalna energia potencjalna sprężystości.'
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC])();
  }

  return { generate };
})();
