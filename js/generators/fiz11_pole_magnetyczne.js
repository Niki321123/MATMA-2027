// Generator: Pole magnetyczne i elektromagnetyzm (siła Lorentza, indukcja, ruch cząstki)
window.fiz11 = (() => {
  const M = window.MathUtils;

  // Schemat A: Proton w polu magnetycznym — ruch po kole (2023 zad.7, 2026 zad.9)
  function schemeA() {
    const B = M.choose([0.1, 0.2, 0.5, 1.0, 1.5, 2.0]);  // T
    // Proton: m = 1.67e-27 kg, q = 1.6e-19 C
    const m_p = 1.67e-27;
    const q_p = 1.6e-19;
    const v = M.choose([1e6, 2e6, 5e6, 1e7]);   // m/s

    // Promień: r = mv/(qB)
    const r = Math.round(m_p * v / (q_p * B) * 1000) / 1000;  // m

    // Okres: T = 2π*m/(q*B) — nie zależy od v
    const T_period = Math.round(2 * Math.PI * m_p / (q_p * B) * 1e9 * 100) / 100;  // ns

    return {
      id: M.makeId('fiz11_proton_B'),
      category: 'fiz11',
      categoryName: 'Pole magnetyczne',
      type: 'magnetyzm_proton_cyklotron',
      points: 3,
      params: { B, v_Ms: Math.round(v / 1e6 * 10) / 10, r, T_period },
      statement: `Proton porusza się prostopadle do jednorodnego pola magnetycznego $B = ${B}\\,\\text{T}$
z prędkością $v = ${Math.round(v / 1e6 * 10) / 10}\\cdot10^6\\,\\text{m/s}$.
Dane: masa protonu $m_p = 1{,}67\\cdot10^{-27}\\,\\text{kg}$, ładunek $e = 1{,}6\\cdot10^{-19}\\,\\text{C}$.

a) Oblicz promień toru kołowego protonu.
b) Oblicz okres obiegu protonu.`,
      answer: {
        type: 'multipart',
        display: `r = ${r}\\,\\text{m},\\quad T = ${T_period}\\,\\text{ns}`,
        description: `Promień: r = ${r} m. Okres: T = ${T_period} ns.`
      },
      hints: [
        { level: 1, text: 'Siła Lorentza = siła dośrodkowa: $qvB = \\frac{mv^2}{r}$.' },
        { level: 2, text: `$r = \\frac{mv}{qB}$.` },
        { level: 3, text: `Okres: $T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB}$ (niezależny od prędkości).` }
      ],
      solution: [
        {
          step: 1,
          title: 'Promień toru',
          content: `r = \\frac{mv}{qB} = \\frac{1{,}67\\cdot10^{-27}\\cdot${Math.round(v/1e6*10)/10}\\cdot10^6}{1{,}6\\cdot10^{-19}\\cdot${B}} = ${r}\\,\\text{m}`,
          explanation: 'Siła magnetyczna dostarcza dośrodkowego przyspieszenia.'
        },
        {
          step: 2,
          title: 'Okres',
          content: `T = \\frac{2\\pi m}{qB} = \\frac{2\\pi\\cdot1{,}67\\cdot10^{-27}}{1{,}6\\cdot10^{-19}\\cdot${B}} = ${T_period}\\cdot10^{-9}\\,\\text{s} = ${T_period}\\,\\text{ns}`,
          explanation: 'Okres nie zależy od prędkości — zasada cyklotronu.'
        }
      ]
    };
  }

  // Schemat B: Elektron w polu magnetycznym — oblicz okres (2026 zad.9)
  function schemeB() {
    const B_mT = M.choose([1.0, 1.5, 1.7, 2.0, 5.0]);  // mT
    const B = B_mT * 1e-3;  // T
    const m_e = 9.11e-31;
    const q_e = 1.6e-19;

    // T = 2πm/(qB)
    const T_period = 2 * Math.PI * m_e / (q_e * B);
    const T_ns = Math.round(T_period * 1e9 * 100) / 100;

    return {
      id: M.makeId('fiz11_elektron_B'),
      category: 'fiz11',
      categoryName: 'Pole magnetyczne',
      type: 'magnetyzm_elektron_okres',
      points: 3,
      params: { B_mT, T_ns },
      statement: `Elektron porusza się po okręgu w jednorodnym polu magnetycznym $B = ${B_mT}\\,\\text{mT}$.
Dane: $m_e = 9{,}11\\cdot10^{-31}\\,\\text{kg}$, $e = 1{,}6\\cdot10^{-19}\\,\\text{C}$.

Oblicz $T$ — okres obiegu elektronu. Prędkość elektronu jest dużo mniejsza od prędkości światła.`,
      answer: {
        type: 'numeric',
        display: `T = \\frac{2\\pi m_e}{eB} = ${T_ns}\\,\\text{ns}`,
        description: `Okres obiegu elektronu: T = ${T_ns} ns.`
      },
      hints: [
        { level: 1, text: 'Siła Lorentza = siła dośrodkowa: $evB = \\frac{m_e v^2}{r}$ → $r = \\frac{m_e v}{eB}$.' },
        { level: 2, text: 'Okres: $T = \\frac{2\\pi r}{v} = \\frac{2\\pi m_e}{eB}$ (niezależny od prędkości).' }
      ],
      solution: [
        {
          step: 1,
          title: 'Okres obiegu elektronu',
          content: `T = \\frac{2\\pi m_e}{eB} = \\frac{2\\pi\\cdot9{,}11\\cdot10^{-31}}{1{,}6\\cdot10^{-19}\\cdot${B_mT}\\cdot10^{-3}} = ${T_ns}\\cdot10^{-9}\\,\\text{s} = ${T_ns}\\,\\text{ns}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat C: Pole przewodnika z prądem (2025 zad.8)
  function schemeC() {
    const I = M.choose([1, 2, 5, 10, 20]);  // A
    const r1_cm = M.choose([1, 2, 5]);       // cm
    const r2_cm = r1_cm * M.choose([2, 3, 4, 5]);  // cm
    const r1 = r1_cm / 100;
    const r2 = r2_cm / 100;

    // B = μ0*I / (2π*r)
    const mu0 = 4 * Math.PI * 1e-7;
    const B1 = Math.round(mu0 * I / (2 * Math.PI * r1) * 1e6) / 1000;  // μT
    const B2 = Math.round(mu0 * I / (2 * Math.PI * r2) * 1e6) / 1000;  // μT
    const ratio = Math.round(r2_cm / r1_cm * 100) / 100;

    return {
      id: M.makeId('fiz11_przewodnik_B'),
      category: 'fiz11',
      categoryName: 'Pole magnetyczne',
      type: 'magnetyzm_przewodnik',
      points: 3,
      params: { I, r1_cm, r2_cm, B1, B2, ratio },
      statement: `Długi prostoliniowy przewodnik przewodzi prąd $I = ${I}\\,\\text{A}$.
Punkt $P_1$ leży w odległości $r_1 = ${r1_cm}\\,\\text{cm}$ od przewodnika,
punkt $P_2$ — w odległości $r_2 = ${r2_cm}\\,\\text{cm}$.

a) Oblicz $B_1$ — indukcję magnetyczną w $P_1$ ($\\mu_0 = 4\\pi\\cdot10^{-7}\\,\\text{T\\,m/A}$).
b) Ile razy mniejsza jest indukcja w $P_2$?`,
      answer: {
        type: 'multipart',
        display: `B_1 = ${B1}\\,\\mu\\text{T},\\quad \\frac{B_1}{B_2} = ${ratio}`,
        description: `B₁ = ${B1} μT. Indukcja w P₂ jest ${ratio} razy mniejsza.`
      },
      hints: [
        { level: 1, text: `Indukcja pola przewodnika z prądem: $B = \\frac{\\mu_0 I}{2\\pi r}$.` },
        { level: 2, text: `$B \\propto 1/r$ → $B_1/B_2 = r_2/r_1$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Indukcja w P₁',
          content: `B_1 = \\frac{\\mu_0 I}{2\\pi r_1} = \\frac{4\\pi\\cdot10^{-7}\\cdot${I}}{2\\pi\\cdot${r1}} = ${B1}\\,\\mu\\text{T}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Stosunek indukcji',
          content: `\\frac{B_1}{B_2} = \\frac{r_2}{r_1} = \\frac{${r2_cm}}{${r1_cm}} = ${ratio}`,
          explanation: 'Indukcja jest odwrotnie proporcjonalna do odległości.'
        }
      ]
    };
  }

  // Schemat D: Siła Lorentza na przewodnik z prądem
  function schemeD() {
    const I = M.choose([2, 5, 10, 20]);     // A
    const L = M.choose([0.1, 0.2, 0.5, 1]); // m długość przewodnika
    const B = M.choose([0.1, 0.5, 1.0, 2.0]); // T
    const sinAlpha = M.choose([0.5, 0.707, 0.866, 1.0]); // sin(kąt między I a B)
    const alpha = Math.round(Math.asin(sinAlpha) * 180 / Math.PI);

    const F = Math.round(I * L * B * sinAlpha * 1000) / 1000;

    return {
      id: M.makeId('fiz11_sila_laplace'),
      category: 'fiz11',
      categoryName: 'Pole magnetyczne',
      type: 'magnetyzm_sila_laplace',
      points: 2,
      params: { I, L, B, alpha, F },
      statement: `Przewodnik o długości $L = ${L}\\,\\text{m}$ przewodzi prąd $I = ${I}\\,\\text{A}$.
Przewodnik jest umieszczony w jednorodnym polu magnetycznym $B = ${B}\\,\\text{T}$.
Kąt między prądem a polem: $\\alpha = ${alpha}°$.

Oblicz wartość siły magnetycznej działającej na przewodnik.`,
      answer: {
        type: 'numeric',
        display: `F = BIL\\sin\\alpha = ${F}\\,\\text{N}`,
        description: `Siła magnetyczna na przewodnik: F = ${F} N.`
      },
      hints: [
        { level: 1, text: 'Siła Ampère\'a: $F = BIL\\sin\\alpha$.' },
        { level: 2, text: `$F = ${B}\\cdot${I}\\cdot${L}\\cdot\\sin${alpha}° = ${F}\\,\\text{N}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Siła na przewodnik',
          content: `F = BIL\\sin\\alpha = ${B}\\cdot${I}\\cdot${L}\\cdot${sinAlpha} = ${F}\\,\\text{N}`,
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
