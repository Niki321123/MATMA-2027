// Generator: Dynamika (zasady dynamiki, zderzenia, pęd)
window.fiz02 = (() => {
  const M = window.MathUtils;

  // Schemat A: Siła oporu F=kv² — oblicz prędkość graniczną (2024 zad.1)
  function schemeA() {
    const r_mm = M.choose([0.1, 0.2, 0.3, 0.5]);   // promień kropli mm
    const r = r_mm * 1e-3;                           // promień m
    const rho_w = 1000;                              // gęstość wody kg/m³
    const rho_air = 1.2;                             // gęstość powietrza
    const k = M.choose([0.3, 0.4, 0.5, 0.6]);       // współczynnik
    const g = 10;

    // F_op = k * rho_air * pi*r² * v²; F_grav = rho_w * (4/3)*pi*r³ * g
    // Prędkość graniczna gdy F_op = F_grav:
    // v² = (rho_w * (4/3)*pi*r³ * g) / (k * rho_air * pi*r²)
    // v² = (4 * rho_w * r * g) / (3 * k * rho_air)
    const v_sq = (4 * rho_w * r * g) / (3 * k * rho_air);
    const v_term = Math.round(Math.sqrt(v_sq) * 100) / 100;

    return {
      id: M.makeId('fiz02_opadanie'),
      category: 'fiz02',
      categoryName: 'Dynamika',
      type: 'dynamika_predkosc_graniczna',
      points: 4,
      params: { r_mm, k, v_term },
      statement: `Kropla wody (kula o promieniu $r = ${r_mm}\\,\\text{mm}$, gęstość wody $\\rho_w = 1000\\,\\text{kg/m}^3$)
opada w powietrzu ($\\rho_p = 1{,}2\\,\\text{kg/m}^3$).
Siła oporu powietrza: $F_r = k\\rho_p A v^2$, gdzie $A = \\pi r^2$, $k = ${k}$, $g = 10\\,\\text{m/s}^2$.

Wyprowadź wzór na $v_{\\text{gran}}$ — prędkość graniczną opadania — i oblicz jej wartość.`,
      answer: {
        type: 'numeric',
        display: `v_{\\text{gran}} = \\sqrt{\\dfrac{4\\rho_w r g}{3k\\rho_p}} \\approx ${v_term}\\,\\text{m/s}`,
        description: `Prędkość graniczna wynosi ok. ${v_term} m/s.`
      },
      hints: [
        { level: 1, text: 'Na prędkości granicznej siła grawitacji = siła oporu: $F_g = F_r$.' },
        { level: 2, text: 'Masa kropli: $m = \\rho_w \\cdot \\frac{4}{3}\\pi r^3$. Siła oporu: $F_r = k\\rho_p \\pi r^2 v^2$.' },
        { level: 3, text: 'Przyrównaj $mg = F_r$ i wyznacz $v$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Warunek równowagi sił',
          content: `\\rho_w \\cdot \\tfrac{4}{3}\\pi r^3 \\cdot g = k\\rho_p \\pi r^2 v^2`,
          explanation: 'Na prędkości granicznej wypadkowa siła = 0.'
        },
        {
          step: 2,
          title: 'Wzór na prędkość graniczną',
          content: `v_{\\text{gran}} = \\sqrt{\\dfrac{4\\rho_w r g}{3k\\rho_p}} = \\sqrt{\\dfrac{4\\cdot1000\\cdot${r_mm}\\cdot10^{-3}\\cdot10}{3\\cdot${k}\\cdot1{,}2}} \\approx ${v_term}\\,\\text{m/s}`,
          explanation: 'Upraszczamy i pierwiastkujemy.'
        }
      ]
    };
  }

  // Schemat B: Zderzenie sprężyste dwóch kulek (2023 zad.2)
  function schemeB() {
    const m1 = M.choose([0.5, 1, 1.5, 2]);   // masa krążka 1 kg
    const m2 = M.choose([0.5, 1, 1.5, 2]);   // masa krążka 2 kg
    const v0 = M.choose([3, 4, 5, 6, 8]);     // prędkość przed zderzeniem m/s

    // Zderzenie centralne sprężyste:
    const v1_after = Math.round(((m1 - m2) / (m1 + m2)) * v0 * 100) / 100;
    const v2_after = Math.round((2 * m1 / (m1 + m2)) * v0 * 100) / 100;

    // Dla m1 = m2 → v1=0, v2=v0
    const isEqual = m1 === m2;

    return {
      id: M.makeId('fiz02_zderzenie'),
      category: 'fiz02',
      categoryName: 'Dynamika',
      type: 'dynamika_zderzenie_sprezyste',
      points: 3,
      params: { m1, m2, v0, v1_after, v2_after },
      statement: `Krążek $K_1$ o masie $m_1 = ${m1}\\,\\text{kg}$ porusza się z prędkością $v_0 = ${v0}\\,\\text{m/s}$
i uderza w nieruchomy krążek $K_2$ o masie $m_2 = ${m2}\\,\\text{kg}$.
Zderzenie jest **doskonale sprężyste** i centralne (czołowe). Pomijamy tarcie.

Oblicz prędkości krążków bezpośrednio po zderzeniu.`,
      answer: {
        type: 'multipart',
        display: `v_1' = ${v1_after}\\,\\text{m/s},\\quad v_2' = ${v2_after}\\,\\text{m/s}`,
        description: isEqual
          ? `Dla równych mas: krążek K₁ zatrzymuje się, K₂ przejmuje całą prędkość.`
          : `Krążek K₁: ${v1_after} m/s, krążek K₂: ${v2_after} m/s (oba w pierwotnym kierunku K₁).`
      },
      hints: [
        { level: 1, text: 'Obowiązują dwie zasady zachowania: pędu i energii kinetycznej.' },
        { level: 2, text: '$m_1 v_0 = m_1 v_1\' + m_2 v_2\'$ oraz $\\frac{1}{2}m_1 v_0^2 = \\frac{1}{2}m_1 v_1\'^2 + \\frac{1}{2}m_2 v_2\'^2$.' },
        { level: 3, text: `Wzory dla zderzenia sprężystego: $v_1' = \\frac{m_1-m_2}{m_1+m_2}v_0$, $v_2' = \\frac{2m_1}{m_1+m_2}v_0$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Zasada zachowania pędu',
          content: `m_1 v_0 = m_1 v_1' + m_2 v_2'`,
          explanation: 'Układ izolowany — pęd jest zachowany.'
        },
        {
          step: 2,
          title: 'Zasada zachowania energii',
          content: `\\tfrac{1}{2}m_1 v_0^2 = \\tfrac{1}{2}m_1 v_1'^2 + \\tfrac{1}{2}m_2 v_2'^2`,
          explanation: 'Zderzenie sprężyste — energia kinetyczna jest zachowana.'
        },
        {
          step: 3,
          title: 'Wyniki',
          content: `v_1' = \\frac{${m1}-${m2}}{${m1}+${m2}}\\cdot${v0} = ${v1_after}\\,\\text{m/s},\\quad v_2' = \\frac{2\\cdot${m1}}{${m1}+${m2}}\\cdot${v0} = ${v2_after}\\,\\text{m/s}`,
          explanation: 'Stosujemy wzory dla centralnego zderzenia sprężystego.'
        }
      ]
    };
  }

  // Schemat C: Impuls siły i zmiana pędu
  function schemeC() {
    const m = M.choose([0.2, 0.5, 1, 2]);     // masa kg
    const v1 = M.choose([5, 8, 10, 12, 15]);  // prędkość przed m/s
    const v2 = M.choose([3, 5, 6, 8, 10]);    // prędkość po m/s
    const dt = M.choose([0.01, 0.02, 0.05, 0.1]); // czas działania s

    const dp = Math.round(m * (v2 - (-v1)) * 100) / 100; // odbicie: kierunki przeciwne
    const F_avg = Math.round(dp / dt);

    return {
      id: M.makeId('fiz02_impuls'),
      category: 'fiz02',
      categoryName: 'Dynamika',
      type: 'dynamika_impuls',
      points: 3,
      params: { m, v1, v2, dt, dp, F_avg },
      statement: `Piłka o masie $m = ${m}\\,\\text{kg}$ uderza w ścianę z prędkością $v_1 = ${v1}\\,\\text{m/s}$
i odbija się od niej z prędkością $v_2 = ${v2}\\,\\text{m/s}$ (w przeciwnym kierunku).
Czas kontaktu piłki ze ścianą wynosi $\\Delta t = ${dt}\\,\\text{s}$.

Oblicz $F_{\\text{śr}}$ — średnią wartość siły, z jaką ściana działała na piłkę.`,
      answer: {
        type: 'numeric',
        display: `F_{\\text{śr}} = ${F_avg}\\,\\text{N}`,
        description: `Zmiana pędu: $\\Delta p = ${dp}\\,\\text{kg\\,m/s}$, siła średnia: $F = ${F_avg}\\,\\text{N}$.`
      },
      hints: [
        { level: 1, text: 'II zasada dynamiki w postaci impulsowej: $F \\cdot \\Delta t = \\Delta p$.' },
        { level: 2, text: 'Zmiana pędu: $\\Delta p = m(v_2 - (-v_1)) = m(v_1 + v_2)$ (uwaga na znaki).' },
        { level: 3, text: `$F_{\\text{śr}} = \\frac{\\Delta p}{\\Delta t}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Zmiana pędu',
          content: `\\Delta p = m(v_2 - (-v_1)) = m(v_1 + v_2) = ${m}\\cdot(${v1}+${v2}) = ${dp}\\,\\text{kg\\,m/s}`,
          explanation: 'Prędkości mają przeciwne zwroty, więc zmiana pędu = m*(v1+v2).'
        },
        {
          step: 2,
          title: 'Siła średnia',
          content: `F_{\\text{śr}} = \\frac{\\Delta p}{\\Delta t} = \\frac{${dp}}{${dt}} = ${F_avg}\\,\\text{N}`,
          explanation: 'Stosujemy II zasadę dynamiki w postaci impulsowej.'
        }
      ]
    };
  }

  // Schemat D: Siły na równi pochyłej
  function schemeD() {
    const m = M.choose([2, 5, 10, 20]);
    const angleDeg = M.choose([30, 37, 45, 53, 60]);
    const g = 10;
    const mu = M.choose([0.1, 0.2, 0.3]);

    const angleRad = angleDeg * Math.PI / 180;
    const sinA = Math.round(Math.sin(angleRad) * 1000) / 1000;
    const cosA = Math.round(Math.cos(angleRad) * 1000) / 1000;

    const N = Math.round(m * g * cosA * 100) / 100;
    const Fg_par = Math.round(m * g * sinA * 100) / 100;
    const Ft = Math.round(mu * N * 100) / 100;
    const Fnet = Math.round((Fg_par - Ft) * 100) / 100;
    const a = Math.round(Fnet / m * 100) / 100;

    if (a <= 0) return schemeD(); // retry if no motion

    return {
      id: M.makeId('fiz02_rownia'),
      category: 'fiz02',
      categoryName: 'Dynamika',
      type: 'dynamika_rownia_pochyla',
      points: 3,
      params: { m, angleDeg, mu, a, N, Fg_par, Ft },
      statement: `Ciało o masie $m = ${m}\\,\\text{kg}$ zsuwa się po równi pochyłej o kącie $\\alpha = ${angleDeg}°$.
Współczynnik tarcia kinetycznego $\\mu = ${mu}$, $g = ${g}\\,\\text{m/s}^2$.

Oblicz $a$ — wartość przyspieszenia ciała.`,
      answer: {
        type: 'numeric',
        display: `a = ${a}\\,\\text{m/s}^2`,
        description: `Przyspieszenie ciała wynosi ${a} m/s².`
      },
      hints: [
        { level: 1, text: 'Rozkładamy siłę grawitacji na składowe: równoległa i prostopadła do równi.' },
        { level: 2, text: `$F_{\\parallel} = mg\\sin${angleDeg}° = ${Fg_par}\\,\\text{N}$, $N = mg\\cos${angleDeg}° = ${N}\\,\\text{N}$.` },
        { level: 3, text: `$F_{\\text{tarcz}} = \\mu N = ${Ft}\\,\\text{N}$. Przyspieszenie: $a = \\frac{F_{\\parallel}-F_{\\text{tarcz}}}{m}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Siły na równi',
          content: `F_{\\parallel} = mg\\sin${angleDeg}° = ${Fg_par}\\,\\text{N},\\quad N = mg\\cos${angleDeg}° = ${N}\\,\\text{N}`,
          explanation: 'Rozkładamy ciężar na kierunek wzdłuż i prostopadły do równi.'
        },
        {
          step: 2,
          title: 'Siła tarcia i wypadkowa',
          content: `F_t = \\mu N = ${mu}\\cdot${N} = ${Ft}\\,\\text{N},\\quad F_{\\text{wyp}} = ${Fg_par} - ${Ft} = ${Fnet}\\,\\text{N}`,
          explanation: 'Tarcie kinetyczne działa przeciwnie do ruchu.'
        },
        {
          step: 3,
          title: 'Przyspieszenie (II zasada dynamiki)',
          content: `a = \\frac{F_{\\text{wyp}}}{m} = \\frac{${Fnet}}{${m}} = ${a}\\,\\text{m/s}^2`,
          explanation: ''
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC, schemeD])();
  }

  return { generate };
})();
