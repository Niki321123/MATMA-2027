// Generator: Fizyka jądrowa (rozpad α/β, czas połowicznego rozpadu, energia wiązania)
window.fiz14 = (() => {
  const M = window.MathUtils;
  const u_kg = 1.66054e-27;  // kg
  const c = 3e8;             // m/s
  const MeV_per_u = 931.5;   // MeV/u

  // Tablica pierwiastków (Z → symbol)
  const ELEMENTS = {
    82: 'Pb', 83: 'Bi', 84: 'Po', 86: 'Rn', 88: 'Ra', 90: 'Th',
    92: 'U',  94: 'Pu', 96: 'Cm', 112: 'Cn', 79: 'Au', 80: 'Hg',
    10: 'Ne', 11: 'Na', 9: 'F',   8: 'O',   7: 'N',  6: 'C'
  };

  function symbol(Z) { return ELEMENTS[Z] || '?'; }

  // Schemat A: Rozpad alfa — uzupełnij równanie (2025 zad.12)
  function schemeA() {
    // Jądro macierzyste: (A, Z) → (A-4, Z-2) + He-4
    const parents = [
      { A: 239, Z: 94, name: 'pluton' },
      { A: 226, Z: 88, name: 'rad' },
      { A: 232, Z: 90, name: 'tor' },
      { A: 238, Z: 92, name: 'uran' },
      { A: 210, Z: 84, name: 'polon' }
    ];
    const parent = M.choose(parents);
    const A_d = parent.A - 4;
    const Z_d = parent.Z - 2;
    const daughter = symbol(Z_d);

    // Przybliżone energie kinetyczne z zasady zachowania pędu (m_alpha / m_daughter << 1)
    // p_alpha = p_daughter → Ek_alpha / Ek_daughter = m_daughter / m_alpha ≈ A_d/4
    const ratio = Math.round(A_d / 4);

    return {
      id: M.makeId('fiz14_rozpad_alfa'),
      category: 'fiz14',
      categoryName: 'Fizyka jądrowa',
      type: 'fizyka_jadrowa_rozpad_alfa',
      points: 3,
      params: { parent, A_d, Z_d, daughter, ratio },
      statement: `Izotop ${parent.name} \${}^{${parent.A}}_{${parent.Z}}\\text{${symbol(parent.Z)}}$ ulega rozpadowi promieniotwórczemu w wyniku przemiany $\\alpha$.

a) Uzupełnij równanie rozpadu:
\$\${}^{${parent.A}}_{${parent.Z}}\\text{${symbol(parent.Z)}} \\rightarrow {}^{?}_{?}\\text{X} + {}^{4}_{2}\\text{He}\$\$

b) Oblicz iloraz energii kinetycznej cząstki $\\alpha$ do energii kinetycznej jądra X tuż po rozpadzie.`,
      answer: {
        type: 'multipart',
        display: `\\text{X} = {}^{${A_d}}_{${Z_d}}\\text{${daughter}},\\quad \\frac{E_{k\\alpha}}{E_{kX}} = ${ratio}`,
        description: `Jądro córki: ${daughter}-${A_d}. Stosunek energii: E_α/E_X ≈ ${ratio}.`
      },
      hints: [
        { level: 1, text: 'Zasada zachowania liczby masowej: $A_{\\text{mac}} = A_{\\alpha} + A_X$, i liczby atomowej: $Z_{\\text{mac}} = Z_{\\alpha} + Z_X$.' },
        { level: 2, text: `$A_X = ${parent.A} - 4 = ${A_d}$, $Z_X = ${parent.Z} - 2 = ${Z_d}$.` },
        { level: 3, text: 'Z zasady zachowania pędu (macierzyste w spoczynku): $m_\\alpha v_\\alpha = m_X v_X$ → $E_{k\\alpha}/E_{kX} = m_X/m_\\alpha \\approx A_X/4$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Równanie rozpadu',
          content: `{}^{${parent.A}}_{${parent.Z}}\\text{${symbol(parent.Z)}} \\rightarrow {}^{${A_d}}_{${Z_d}}\\text{${daughter}} + {}^{4}_{2}\\text{He}`,
          explanation: 'Zachowanie liczb masowych i atomowych.'
        },
        {
          step: 2,
          title: 'Iloraz energii kinetycznych',
          content: `p_\\alpha = p_X \\implies m_\\alpha v_\\alpha = m_X v_X \\implies \\frac{E_{k\\alpha}}{E_{kX}} = \\frac{m_X}{m_\\alpha} = \\frac{${A_d}}{4} = ${ratio}`,
          explanation: 'Jądro macierzyste spoczywa → produkty mają równe co do wartości pędy.'
        }
      ]
    };
  }

  // Schemat B: Rozpad beta — uzupełnij równanie (2024 zad.11, 2026 zad.11)
  function schemeB() {
    const types = [
      { A: 18, Z: 9,  symbol: 'F',  betaType: '+', A_d: 18, Z_d: 8,  d_sym: 'O',  d_name: 'tlen' },
      { A: 23, Z: 10, symbol: 'Ne', betaType: '-', A_d: 23, Z_d: 11, d_sym: 'Na', d_name: 'sód' },
      { A: 14, Z: 6,  symbol: 'C',  betaType: '-', A_d: 14, Z_d: 7,  d_sym: 'N',  d_name: 'azot' },
      { A: 131, Z: 53, symbol: 'I', betaType: '-', A_d: 131, Z_d: 54, d_sym: 'Xe', d_name: 'ksenon' }
    ];
    const decay = M.choose(types);

    return {
      id: M.makeId('fiz14_rozpad_beta'),
      category: 'fiz14',
      categoryName: 'Fizyka jądrowa',
      type: 'fizyka_jadrowa_rozpad_beta',
      points: 2,
      params: { decay },
      statement: `Izotop \${}^{${decay.A}}_{${decay.Z}}\\text{${decay.symbol}}$ ulega rozpadowi $\\beta^${decay.betaType}$.

Uzupełnij równanie rozpadu:
\$\${}^{${decay.A}}_{${decay.Z}}\\text{${decay.symbol}} \\rightarrow {}^{?}_{?}\\text{X} + \\beta^${decay.betaType} + \\nu\$\$`,
      answer: {
        type: 'symbolic',
        display: `{}^{${decay.A_d}}_{${decay.Z_d}}\\text{${decay.d_sym}}`,
        description: `Jądro córki: ${decay.d_name} (${decay.d_sym}-${decay.A_d}).`
      },
      hints: [
        { level: 1, text: `Przy rozpadzie $\\beta^${decay.betaType === '+' ? '+' : '-'}$: liczba masowa nie zmienia się. Liczba atomowa ${decay.betaType === '+' ? 'maleje o 1' : 'rośnie o 1'}.` },
        { level: 2, text: `$A_X = ${decay.A}$, $Z_X = ${decay.Z} ${decay.betaType === '+' ? '- 1' : '+ 1'} = ${decay.Z_d}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Równanie rozpadu beta',
          content: `{}^{${decay.A}}_{${decay.Z}}\\text{${decay.symbol}} \\rightarrow {}^{${decay.A_d}}_{${decay.Z_d}}\\text{${decay.d_sym}} + \\beta^${decay.betaType} + \\nu`,
          explanation: `Przy rozpadzie β${decay.betaType === '+' ? '⁺' : '⁻'} liczba atomowa zmienia się o ±1, masa pozostaje ta sama.`
        }
      ]
    };
  }

  // Schemat C: Czas połowicznego rozpadu — oblicz z wykresu (2024 zad.11, 2026 zad.11)
  function schemeC() {
    const T_half = M.choose([10, 15, 20, 30, 60, 110]);  // minuty
    // Po czasie t masa = m0 * (1/2)^(t/T_half)
    const t1 = T_half * M.choose([2, 3, 4]);   // czas obserwacji
    const m0 = M.choose([100, 200, 400]);        // g
    const m_t1 = Math.round(m0 * Math.pow(0.5, t1 / T_half) * 100) / 100;

    return {
      id: M.makeId('fiz14_czas_polowiczny'),
      category: 'fiz14',
      categoryName: 'Fizyka jądrowa',
      type: 'fizyka_jadrowa_czas_polowiczny',
      points: 3,
      params: { T_half, t1, m0, m_t1 },
      statement: `Próbka promieniotwórcza zawierała początkowo $m_0 = ${m0}\\,\\text{g}$ izotopu.
Po czasie $t = ${t1}\\,\\text{min}$ pozostało $m = ${m_t1}\\,\\text{g}$.

Oblicz $T_{\\frac{1}{2}}$ — czas połowicznego rozpadu tego izotopu.`,
      answer: {
        type: 'numeric',
        display: `T_{1/2} = ${T_half}\\,\\text{min}`,
        description: `Czas połowicznego rozpadu: T₁/₂ = ${T_half} min.`
      },
      hints: [
        { level: 1, text: `Wzór na rozpad: $m(t) = m_0\\cdot\\left(\\frac{1}{2}\\right)^{t/T_{1/2}}$.` },
        { level: 2, text: `$\\frac{m}{m_0} = \\left(\\frac{1}{2}\\right)^{t/T_{1/2}} \\implies \\frac{t}{T_{1/2}} = \\log_{1/2}\\frac{m}{m_0}$.` },
        { level: 3, text: `$T_{1/2} = t\\cdot\\frac{\\log 2}{\\log(m_0/m)}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Wzór na rozpad promieniotwórczy',
          content: `\\frac{m}{m_0} = \\left(\\frac{1}{2}\\right)^{t/T_{1/2}} = \\frac{${m_t1}}{${m0}} = ${Math.round(m_t1 / m0 * 1000) / 1000}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Wyznaczenie T₁/₂',
          content: `\\frac{t}{T_{1/2}} = \\frac{\\ln(m_0/m)}{\\ln 2} = \\frac{\\ln(${Math.round(m0 / m_t1 * 100) / 100})}{\\ln 2} = ${Math.round(t1 / T_half * 100) / 100} \\implies T_{1/2} = \\frac{${t1}}{${Math.round(t1 / T_half * 100) / 100}} = ${T_half}\\,\\text{min}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat D: Energia wiązania jądra (2023 zad.11)
  function schemeD() {
    // Defekt masy → energia wiązania
    const nuclei = [
      { symbol: 'He', A: 4,   Z: 2, mass_u: 4.002602 },
      { symbol: 'C',  A: 12,  Z: 6, mass_u: 12.000000 },
      { symbol: 'O',  A: 16,  Z: 8, mass_u: 15.994915 },
      { symbol: 'Fe', A: 56,  Z: 26, mass_u: 55.934939 }
    ];
    const nucleus = M.choose(nuclei);
    const N = nucleus.A - nucleus.Z;

    // m_p = 1.007276 u, m_n = 1.008665 u
    const m_p_u = 1.007276;
    const m_n_u = 1.008665;
    const m_free = nucleus.Z * m_p_u + N * m_n_u;
    const delta_m_u = Math.round((m_free - nucleus.mass_u) * 1e6) / 1e6;  // u
    const E_bind_MeV = Math.round(delta_m_u * MeV_per_u * 10) / 10;  // MeV

    return {
      id: M.makeId('fiz14_energia_wiazania'),
      category: 'fiz14',
      categoryName: 'Fizyka jądrowa',
      type: 'fizyka_jadrowa_energia_wiazania',
      points: 3,
      params: { nucleus, N, m_p_u, m_n_u, delta_m_u, E_bind_MeV },
      statement: `Masa jądra \${}^{${nucleus.A}}_{${nucleus.Z}}\\text{${nucleus.symbol}}$ wynosi $m = ${nucleus.mass_u}\\,\\text{u}$.
Masa protonu: $m_p = ${m_p_u}\\,\\text{u}$, masa neutronu: $m_n = ${m_n_u}\\,\\text{u}$.
Związek: $1\\,\\text{u} \\cdot c^2 = ${MeV_per_u}\\,\\text{MeV}$.

Oblicz energię wiązania tego jądra.`,
      answer: {
        type: 'numeric',
        display: `E_b = ${E_bind_MeV}\\,\\text{MeV}`,
        description: `Defekt masy: Δm = ${delta_m_u} u. Energia wiązania: E_b = ${E_bind_MeV} MeV.`
      },
      hints: [
        { level: 1, text: `Defekt masy: $\\Delta m = Z\\cdot m_p + N\\cdot m_n - m_{\\text{jądra}}$, gdzie $N = A - Z = ${N}$.` },
        { level: 2, text: `$\\Delta m = ${nucleus.Z}\\cdot${m_p_u} + ${N}\\cdot${m_n_u} - ${nucleus.mass_u} = ${delta_m_u}\\,\\text{u}$.` },
        { level: 3, text: `Energia wiązania: $E_b = \\Delta m \\cdot c^2 = \\Delta m \\cdot ${MeV_per_u}\\,\\text{MeV/u}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Defekt masy',
          content: `\\Delta m = ${nucleus.Z}\\cdot${m_p_u} + ${N}\\cdot${m_n_u} - ${nucleus.mass_u} = ${Math.round(m_free * 1e6) / 1e6} - ${nucleus.mass_u} = ${delta_m_u}\\,\\text{u}`,
          explanation: 'Swobodne nukleony ważą więcej niż jądro.'
        },
        {
          step: 2,
          title: 'Energia wiązania',
          content: `E_b = \\Delta m\\cdot${MeV_per_u}\\,\\frac{\\text{MeV}}{\\text{u}} = ${delta_m_u}\\cdot${MeV_per_u} = ${E_bind_MeV}\\,\\text{MeV}`,
          explanation: 'Zgodnie z równoważnością masy i energii E = mc².'
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC, schemeD])();
  }

  return { generate };
})();
