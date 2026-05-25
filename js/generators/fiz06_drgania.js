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

  // Schemat B: Energia drgań — prędkość przy x ≠ 0 (zasada zachowania energii)
  // Zastąpił trywialny schemat "oblicz L wahadła" — ten typ zadania pojawia się na maturze co roku
  function schemeB() {
    // Używamy kombinacji dających ładne omega (całkowite)
    const configs = [
      { m_g: 100, k: 10,  omega: 10, T_nice: '0{,}628' },  // ω=√(10/0.1)=10
      { m_g: 200, k: 20,  omega: 10, T_nice: '0{,}628' },  // ω=√(20/0.2)=10
      { m_g: 500, k: 20,  omega:  2, T_nice: '3{,}14'  },  // ω=√(20/5)=2
      { m_g: 100, k: 40,  omega: 20, T_nice: '0{,}314' },  // ω=√(40/0.1)=20
    ];
    const cfg = M.choose(configs);
    const m   = cfg.m_g / 1000;
    const A   = M.choose([0.06, 0.08, 0.10, 0.12, 0.15]);  // m

    // Pytamy o v gdy x = A/2
    const x   = A / 2;
    // E = ½kA², v = ω√(A²-x²) = ω·A·√(3)/2
    const v   = Math.round(cfg.omega * A * Math.sqrt(3) / 2 * 10000) / 10000;
    const E   = Math.round(0.5 * cfg.k * A * A * 10000) / 10000;
    const Ep  = Math.round(0.5 * cfg.k * x * x * 10000) / 10000;
    const Ek  = Math.round((E - Ep) * 10000) / 10000;
    const A_cm = Math.round(A * 100);
    const x_cm = Math.round(x * 100);

    return {
      id: M.makeId('fiz06_energia_drgan'),
      category: 'fiz06',
      categoryName: 'Drgania harmoniczne',
      type: 'drgania_energia_zachowania',
      points: 5,
      params: { m_g: cfg.m_g, k: cfg.k, A_cm, x_cm, v, E, Ep, Ek, omega: cfg.omega },
      statement: `Ciężarek o masie $m = ${cfg.m_g}\\,\\text{g}$ zawieszony na sprężynie o stałej $k = ${cfg.k}\\,\\text{N/m}$
wykonuje drgania harmoniczne w pionie o amplitudzie $A = ${A_cm}\\,\\text{cm}$.
Przyjmij $g = 10\\,\\text{m/s}^2$.

a) Oblicz całkowitą energię mechaniczną układu.
b) Oblicz prędkość ciężarka w chwili, gdy jego wychylenie od położenia równowagi wynosi $x = \\frac{A}{2} = ${x_cm}\\,\\text{cm}$.`,
      answer: {
        type: 'multipart',
        display: `E = ${E}\\,\\text{J},\\quad v = ${v}\\,\\text{m/s}`,
        description: `Energia: E = ½kA² = ${E} J. Prędkość przy x = A/2: v = ${v} m/s.`
      },
      hints: [
        { level: 1, text: `Energia całkowita = energia potencjalna sprężystości w skrajnym położeniu: $E = \\tfrac{1}{2}kA^2$.` },
        { level: 2, text: `Przy wychyleniu x energia potencjalna: $E_p = \\tfrac{1}{2}kx^2$. Energia kinetyczna: $E_k = E - E_p$.` },
        { level: 3, text: `$v = \\sqrt{\\dfrac{2E_k}{m}} = \\omega\\sqrt{A^2 - x^2}$, gdzie $\\omega = \\sqrt{k/m} = ${cfg.omega}\\,\\text{rad/s}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Energia całkowita układu',
          content: `E = \\frac{1}{2}kA^2 = \\frac{1}{2}\\cdot${cfg.k}\\cdot(${A})^2 = ${E}\\,\\text{J}`,
          explanation: 'W skrajnym położeniu (x = A) cała energia jest potencjalna sprężystości.'
        },
        {
          step: 2,
          title: 'Energia kinetyczna przy x = A/2',
          content: `E_p = \\frac{1}{2}kx^2 = \\frac{1}{2}\\cdot${cfg.k}\\cdot(${x})^2 = ${Ep}\\,\\text{J} \\qquad E_k = E - E_p = ${E} - ${Ep} = ${Ek}\\,\\text{J}`,
          explanation: 'Stosujemy zasadę zachowania energii mechanicznej.'
        },
        {
          step: 3,
          title: 'Prędkość',
          content: `v = \\sqrt{\\frac{2E_k}{m}} = \\sqrt{\\frac{2\\cdot${Ek}}{${m}}} = ${v}\\,\\text{m/s}`,
          explanation: `Można też skorzystać ze wzoru: $v = \\omega\\sqrt{A^2-x^2} = ${cfg.omega}\\cdot\\sqrt{(${A})^2-(${x})^2} = ${v}\\,\\text{m/s}$.`
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
      points: 4,
      params: { m_g, k, A_cm: Math.round(A * 100), T, v_max, E_total },
      statement: `Ciężarek o masie $m = ${m_g}\\,\\text{g}$ jest zawieszony na sprężynie o stałej $k = ${k}\\,\\text{N/m}$
i wykonuje drgania harmoniczne o amplitudzie $A = ${Math.round(A * 100)}\\,\\text{cm}$.

Oblicz:
a) Okres drgań $T$.
b) Maksymalną prędkość ciężarka $v_{\\max}$.
c) Całkowitą energię układu $E$.
d) W jakim stosunku pozostają energia kinetyczna do energii potencjalnej, gdy ciężarek jest w odległości $A/2$ od położenia równowagi?`,
      answer: {
        type: 'multipart',
        display: `T = ${T}\\,\\text{s},\\quad v_{\\max} = ${v_max}\\,\\text{m/s},\\quad E = ${E_total}\\,\\text{J},\\quad E_k/E_p = 3`,
        description: `T = ${T} s, v_max = ${v_max} m/s, E = ${E_total} J. Stosunek E_k/E_p przy x=A/2: E_k = ¾E, E_p = ¼E → E_k/E_p = 3.`
      },
      hints: [
        { level: 1, text: `$T = 2\\pi\\sqrt{\\frac{m}{k}}$, $v_{\\max} = A\\omega = A\\sqrt{\\frac{k}{m}}$, $E = \\frac{1}{2}kA^2$.` },
        { level: 2, text: `$\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{${k}}{${m}}}\\,\\text{rad/s}$.` },
        { level: 3, text: 'Przy $x = A/2$: $E_p = \\frac{1}{2}k(A/2)^2 = \\frac{1}{4}\\cdot\\frac{1}{2}kA^2 = \\frac{E}{4}$, więc $E_k = \\frac{3E}{4}$. Stosunek: $E_k/E_p = 3$.' }
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
        },
        {
          step: 4,
          title: 'Stosunek E_k/E_p przy x = A/2',
          content: `E_p = \\frac{1}{2}k\\left(\\frac{A}{2}\\right)^2 = \\frac{E}{4} \\qquad E_k = E - E_p = \\frac{3E}{4} \\qquad \\frac{E_k}{E_p} = \\frac{3E/4}{E/4} = 3`,
          explanation: 'Wynik niezależy od k, m ani A — tylko od stosunku x/A.'
        }
      ]
    };
  }

  // Schemat D: Wahadło na innej planecie — zmiana okresu przy zmianie g
  function schemeD() {
    const planets = [
      { name: 'Księżycu', g: 10 / 6,  g_str: '\\frac{g}{6}',   ratio_str: '\\sqrt{6}',   ratio: Math.sqrt(6)   },
      { name: 'Marsie',   g: 3.72,     g_str: '3{,}72\\,\\text{m/s}^2', ratio_str: '\\sqrt{\\tfrac{g_Z}{g_M}}', ratio: Math.sqrt(10 / 3.72) },
      { name: 'Jowiszu',  g: 24.8,     g_str: '24{,}8\\,\\text{m/s}^2', ratio_str: '\\sqrt{\\tfrac{g_Z}{g_J}}', ratio: Math.sqrt(10 / 24.8) },
    ];
    const pl = M.choose(planets);
    const L  = M.choose([0.1, 0.25, 0.4, 1.0]);  // m
    const g_Z = 10;

    const T_Z = Math.round(2 * Math.PI * Math.sqrt(L / g_Z) * 1000) / 1000;
    const T_pl = Math.round(2 * Math.PI * Math.sqrt(L / pl.g) * 1000) / 1000;

    // Liczba drgań na Ziemi w czasie t = T_pl (ułamki mogą być ładne)
    const t_obs = M.choose([10, 20, 30, 60]);  // s — czas obserwacji
    const n_Z  = Math.round(t_obs / T_Z * 10) / 10;
    const n_pl = Math.round(t_obs / T_pl * 10) / 10;

    return {
      id: M.makeId('fiz06_wahadlo_planeta'),
      category: 'fiz06',
      categoryName: 'Drgania harmoniczne',
      type: 'drgania_wahadlo_planeta',
      points: 4,
      params: { planet: pl.name, g_pl: pl.g, g_str: pl.g_str, L, T_Z, T_pl, t_obs, n_Z, n_pl },
      statement: `Wahadło matematyczne o długości $L = ${L}\\,\\text{m}$ wykonuje drgania na Ziemi ($g_Z = ${g_Z}\\,\\text{m/s}^2$)
i na ${pl.name} ($g_{pl} = ${pl.g_str}$).

a) Oblicz okres drgań wahadła na Ziemi i na ${pl.name}.
b) W ciągu $t = ${t_obs}\\,\\text{s}$ ile pełnych drgań wykona wahadło na Ziemi, a ile na ${pl.name}?`,
      answer: {
        type: 'multipart',
        display: `T_Z = ${T_Z}\\,\\text{s},\\quad T_{pl} = ${T_pl}\\,\\text{s};\\quad n_Z \\approx ${n_Z},\\quad n_{pl} \\approx ${n_pl}`,
        description: `Na Ziemi: T = ${T_Z} s, n = ${n_Z} drgań. Na ${pl.name}: T = ${T_pl} s, n = ${n_pl} drgań.`
      },
      hints: [
        { level: 1, text: `Wzór na okres: $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$.` },
        { level: 2, text: `Przy mniejszym g → większy okres → mniej drgań w tym samym czasie.` },
        { level: 3, text: `Liczba drgań: $n = \\dfrac{t}{T}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Okresy drgań',
          content: `T_Z = 2\\pi\\sqrt{\\frac{${L}}{${g_Z}}} = ${T_Z}\\,\\text{s} \\qquad T_{pl} = 2\\pi\\sqrt{\\frac{${L}}{${pl.g}}} = ${T_pl}\\,\\text{s}`,
          explanation: `Na ${pl.name} g jest ${pl.g < g_Z ? 'mniejsze' : 'większe'}, więc okres jest ${pl.g < g_Z ? 'dłuższy' : 'krótszy'}.`
        },
        {
          step: 2,
          title: 'Liczba drgań w czasie t',
          content: `n_Z = \\frac{t}{T_Z} = \\frac{${t_obs}}{${T_Z}} \\approx ${n_Z} \\qquad n_{pl} = \\frac{t}{T_{pl}} = \\frac{${t_obs}}{${T_pl}} \\approx ${n_pl}`,
          explanation: ''
        }
      ]
    };
  }

  function generate() {
    // schemeB (energia) i schemeD (planeta) — ważne tematy maturalne, zwiększona waga
    return M.choose([schemeA, schemeB, schemeB, schemeC, schemeD])();
  }

  return { generate };
})();
