// Generator: Termodynamika (gaz doskonały, przemiany, cykl p-V)
window.fiz05 = (() => {
  const M = window.MathUtils;

  // Schemat A: Izochoryczna + izobaryczna (2023 zad.6)
  function schemeA() {
    const n = M.choose([1, 2, 3]);      // liczba moli
    const Q1 = M.choose([50, 100, 150, 200]); // ciepło w przemianie 1 (izochoryczna) J
    const Q2 = Q1;  // tyle samo ciepła w przemianie 2 (izobaryczna)
    const R = 8.314;

    // Cv = (3/2)R (gaz jednoatomowy), Cp = (5/2)R
    // Przemiana izochoryczna: Q1 = n*Cv*ΔT1 → ΔT1 = Q1/(n*Cv)
    // Przemiana izobaryczna: Q2 = n*Cp*ΔT2 → ΔT2 = Q2/(n*Cp)
    const Cv = 1.5 * R;
    const Cp = 2.5 * R;
    const dT1 = Math.round(Q1 / (n * Cv) * 100) / 100;
    const dT2 = Math.round(Q2 / (n * Cp) * 100) / 100;

    // W przemianie izobarycznej: W = n*R*ΔT2 = Q2*(R/Cp) = Q2*2/5
    const W2 = Math.round(Q2 * R / Cp * 100) / 100;
    // = Q2 * 2/5
    const W2_approx = Math.round(Q2 * 2 / 5 * 100) / 100;

    return {
      id: M.makeId('fiz05_izochizob'),
      category: 'fiz05',
      categoryName: 'Termodynamika',
      type: 'termodynamika_izochizob',
      points: 3,
      params: { n, Q1, Q2, dT1, dT2, W2_approx },
      statement: `$n = ${n}\\,\\text{mol}$ jednoatomowego gazu doskonałego ($C_V = \\frac{3}{2}R$) poddano dwóm przemianom:
1. Izochorycznej — dostarczono ciepło $Q_1 = ${Q1}\\,\\text{J}$.
2. Izobarycznej — dostarczono ciepło $Q_2 = ${Q2}\\,\\text{J}$.

Oblicz pracę wykonaną przez siłę parcia gazu na tłok w **drugiej przemianie**.`,
      answer: {
        type: 'numeric',
        display: `W = ${W2_approx}\\,\\text{J}`,
        description: `Praca w przemianie izobarycznej: W = Q₂·R/Cₚ = Q₂·2/5 = ${W2_approx} J.`
      },
      hints: [
        { level: 1, text: 'I zasada termodynamiki: $Q = \\Delta U + W$.' },
        { level: 2, text: `Dla gazu jednoatomowego: $C_V = \\frac{3}{2}R$, $C_p = \\frac{5}{2}R$. Przyrost energii wewnętrznej: $\\Delta U = nC_V \\Delta T$.` },
        { level: 3, text: `W przemianie izobarycznej: $Q_2 = n C_p \\Delta T_2$ i $W = nR\\Delta T_2 = Q_2\\cdot\\frac{R}{C_p} = Q_2\\cdot\\frac{2}{5}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Przyrost temperatury w przemianach',
          content: `\\Delta T_1 = \\frac{Q_1}{nC_V} = \\frac{${Q1}}{${n}\\cdot\\frac{3}{2}R} \\approx ${dT1}\\,\\text{K}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Praca w przemianie izobarycznej',
          content: `W = Q_2 - n C_V \\Delta T_2 = Q_2\\left(1 - \\frac{C_V}{C_p}\\right) = ${Q2}\\cdot\\frac{2}{5} = ${W2_approx}\\,\\text{J}`,
          explanation: 'W przemianie izobarycznej ΔU = nCvΔT = Q₂·Cv/Cp.'
        }
      ]
    };
  }

  // Schemat B: Cykl termodynamiczny na wykresie p-V (2024 zad.8, 2026 zad.6)
  function schemeB() {
    const p1 = M.choose([1, 2, 3]);       // ciśnienie w stanie 1 (×10⁵ Pa)
    const p2 = M.choose([2, 3, 4, 6]);    // ciśnienie w stanie 2
    if (p2 <= p1) return schemeB();
    const V1 = M.choose([1, 2, 3]);       // objętość (×10⁻³ m³)
    const V2 = M.choose([2, 3, 4]);
    if (V2 <= V1) return schemeB();

    // Stan 1: (V1, p1), Stan 2: (V2, p1) — izobara, Stan 3: (V2, p2) — izochora, Stan 4: (V1, p2) — izobara
    // Cykl prostokątny: G1→G2 (izobara p1), G2→G3 (izochora V2), G3→G4 (izobara p2), G4→G1 (izochora V1)
    const pScalar = 1e5; // Pa
    const VScalar = 1e-3; // m³

    const Wcykl = (p2 - p1) * pScalar * (V2 - V1) * VScalar; // J
    const Wcykl_J = Math.round(Wcykl);

    return {
      id: M.makeId('fiz05_cykl_pv'),
      category: 'fiz05',
      categoryName: 'Termodynamika',
      type: 'termodynamika_cykl_pv',
      points: 3,
      params: { p1, p2, V1, V2, Wcykl_J },
      statement: `Na wykresie $p$-$V$ przedstawiono cykl prostokątny silnika cieplnego (gaz doskonały jednoatomowy):
- Stan $G_1$: $p_1 = ${p1}\\cdot10^5\\,\\text{Pa}$, $V_1 = ${V1}\\cdot10^{-3}\\,\\text{m}^3$
- Stan $G_2$: $p_1$, $V_2 = ${V2}\\cdot10^{-3}\\,\\text{m}^3$
- Stan $G_3$: $p_2 = ${p2}\\cdot10^5\\,\\text{Pa}$, $V_2$
- Stan $G_4$: $p_2$, $V_1$

Oblicz pracę netto wykonaną przez gaz w jednym cyklu.`,
      answer: {
        type: 'numeric',
        display: `W_{\\text{netto}} = ${Wcykl_J}\\,\\text{J}`,
        description: `Praca netto = pole prostokąta na wykresie p-V = (p₂−p₁)·(V₂−V₁) = ${Wcykl_J} J.`
      },
      hints: [
        { level: 1, text: 'Praca w cyklu = pole powierzchni zamkniętej na wykresie p-V.' },
        { level: 2, text: 'Dla cyklu prostokątnego: $W = \\Delta p \\cdot \\Delta V = (p_2-p_1)(V_2-V_1)$.' },
        { level: 3, text: 'Zwróć uwagę na jednostki: Pa × m³ = J.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Praca netto = pole prostokąta',
          content: `W = (p_2 - p_1)(V_2 - V_1) = (${p2}-${p1})\\cdot10^5\\cdot(${V2}-${V1})\\cdot10^{-3} = ${Wcykl_J}\\,\\text{J}`,
          explanation: 'Pole zamkniętego wykresu p-V = praca netto w cyklu.'
        }
      ]
    };
  }

  // Schemat C: Przemiana adiabatyczna / prawa gazu — temperatura i objętość
  function schemeC() {
    const T1 = M.choose([300, 400, 500, 600]);   // K
    const p1 = M.choose([1, 2, 4, 5]);            // jednostki względne
    const p2 = M.choose([2, 3, 4, 8, 10]);        // jednostki względne
    if (p2 <= p1) return schemeC();

    // Przemiana izochoryczna: p/T = const
    const T2_izochoryczna = Math.round(T1 * p2 / p1);
    // Przemiana izobara: V/T = const; V1 → V2 = V1 * T2/T1
    const T2 = M.choose([400, 500, 600, 700, 800]);
    if (T2 <= T1) return schemeC();
    const V_ratio = Math.round(T2 / T1 * 100) / 100;

    return {
      id: M.makeId('fiz05_gaz_idealny'),
      category: 'fiz05',
      categoryName: 'Termodynamika',
      type: 'termodynamika_gaz_idealny',
      points: 2,
      params: { T1, T2, p1, p2, V_ratio, T2_izochoryczna },
      statement: `Stała masa jednoatomowego gazu doskonałego przechodzi przez dwie przemiany:
1. **Izochoryczna**: temperatura wzrasta z $T_1 = ${T1}\\,\\text{K}$, ciśnienie rośnie od $p_1$ do $p_2 = ${p2/p1}\\cdot p_1$.
2. **Izobaryczna**: temperatura rośnie z $T_1' = ${T2_izochoryczna}\\,\\text{K}$ do $T_2 = ${T2}\\,\\text{K}$.

Oblicz iloraz $\\frac{V_2}{V_1}$ objętości gazu po obu przemianach do objętości początkowej.`,
      answer: {
        type: 'numeric',
        display: `\\frac{V_2}{V_1} = \\frac{p_2}{p_1}\\cdot\\frac{T_2}{T_1} = \\frac{${p2}}{${p1}}\\cdot\\frac{${T2}}{${T1}} = ${Math.round(p2/p1 * T2/T1 * 100)/100}`,
        description: `Iloraz V₂/V₁ = (p₂/p₁)·(T₂/T₁) = ${Math.round(p2/p1 * T2/T1 * 100)/100}.`
      },
      hints: [
        { level: 1, text: 'Równanie stanu gazu doskonałego: $pV = nRT$.' },
        { level: 2, text: 'Po przemianie izochorycznej (V = const): $\\frac{p_2}{p_1} = \\frac{T_{iz}}{T_1}$.' },
        { level: 3, text: 'Po przemianie izobarycznej (p = const): $\\frac{V_2}{V_{iz}} = \\frac{T_2}{T_{iz}}$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Stan po przemianie izochorycznej',
          content: `T_{iz} = T_1\\cdot\\frac{p_2}{p_1} = ${T1}\\cdot\\frac{${p2}}{${p1}} = ${T2_izochoryczna}\\,\\text{K}, \\quad V_{iz} = V_1`,
          explanation: 'Izochora: objętość stała, temperatura i ciśnienie proporcjonalne.'
        },
        {
          step: 2,
          title: 'Stan po przemianie izobarycznej',
          content: `V_2 = V_{iz}\\cdot\\frac{T_2}{T_{iz}} = V_1\\cdot\\frac{${T2}}{${T2_izochoryczna}} \\implies \\frac{V_2}{V_1} = \\frac{${p2}}{${p1}}\\cdot\\frac{${T2}}{${T1}} = ${Math.round(p2/p1 * T2/T1*100)/100}`,
          explanation: 'Izobara: ciśnienie stałe, objętość i temperatura proporcjonalne.'
        }
      ]
    };
  }

  // Schemat D: Oblicz zmianę energii wewnętrznej (I zasada termodynamiki)
  function schemeD() {
    const n = M.choose([1, 2, 3, 4]);
    const dT = M.choose([100, 200, 300, 400, 500]);
    const W = M.choose([100, 200, 300, 500, 1000]);  // praca wykonana przez gaz J
    const R = 8.314;
    const Cv = 1.5 * R;

    const dU = Math.round(n * Cv * dT);
    const Q = dU + W;

    return {
      id: M.makeId('fiz05_energia_wewn'),
      category: 'fiz05',
      categoryName: 'Termodynamika',
      type: 'termodynamika_I_zasada',
      points: 2,
      params: { n, dT, W, dU, Q },
      statement: `Jednoatomowy gaz doskonały ($C_V = \\frac{3}{2}R$) o ilości $n = ${n}\\,\\text{mol}$
jest ogrzewany. Temperatura gazu wzrasta o $\\Delta T = ${dT}\\,\\text{K}$,
a gaz wykonuje pracę $W = ${W}\\,\\text{J}$ na otoczenie.

Oblicz $Q$ — ciepło dostarczone do gazu.`,
      answer: {
        type: 'numeric',
        display: `Q = ${Q}\\,\\text{J}`,
        description: `ΔU = nCvΔT = ${dU} J. Q = ΔU + W = ${Q} J.`
      },
      hints: [
        { level: 1, text: 'I zasada termodynamiki: $Q = \\Delta U + W$.' },
        { level: 2, text: `Zmiana energii wewnętrznej: $\\Delta U = nC_V\\Delta T = ${n}\\cdot\\frac{3}{2}R\\cdot${dT}$.` },
        { level: 3, text: `$Q = ${dU} + ${W} = ${Q}\\,\\text{J}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Zmiana energii wewnętrznej',
          content: `\\Delta U = nC_V\\Delta T = ${n}\\cdot\\tfrac{3}{2}\\cdot 8{,}314\\cdot${dT} \\approx ${dU}\\,\\text{J}`,
          explanation: 'Dla gazu jednoatomowego Cv = (3/2)R.'
        },
        {
          step: 2,
          title: 'I zasada termodynamiki',
          content: `Q = \\Delta U + W = ${dU} + ${W} = ${Q}\\,\\text{J}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat E (TRUDNY ~7/10): wyprowadzenie wzoru na ciepło w przemianie izobarycznej
  // (matura: 2024 zad.8.2, 2025 zad.6.3 — zadanie typu „wyprowadź wzór")
  function schemeE() {
    const p_kPa = M.choose([100, 150, 200, 250]);   // ciśnienie kPa
    const dV_L = M.choose([2, 3, 4, 5, 8]);         // przyrost objętości w litrach
    const p = p_kPa * 1000;       // Pa
    const dV = dV_L * 1e-3;       // m³
    const W = Math.round(p * dV);             // praca = pΔV
    const dU = Math.round(1.5 * p * dV);      // ΔU = (3/2)pΔV
    const Q = Math.round(2.5 * p * dV);       // Q = (5/2)pΔV

    return {
      id: M.makeId('fiz05_wyprow_izobara'),
      category: 'fiz05',
      categoryName: 'Termodynamika',
      type: 'termodynamika_wyprowadzenie',
      points: 4,
      params: { p_kPa, dV_L, W, dU, Q },
      statement: `Jednoatomowy gaz doskonały ($C_V = \\frac{3}{2}R$) jest ogrzewany pod stałym ciśnieniem $p = ${p_kPa}\\,\\text{kPa}$.
Objętość gazu zwiększa się o $\\Delta V = ${dV_L}\\,\\text{l}$.

Wyprowadź wzór na ciepło $Q$ pobrane przez gaz w tej przemianie izobarycznej — wyrażone tylko przez $p$ i $\\Delta V$. Następnie oblicz $Q$.`,
      answer: {
        type: 'derivation',
        display: `Q = \\tfrac{5}{2}\\,p\\,\\Delta V = ${Q}\\,\\text{J}`,
        description: `Praca W = pΔV = ${W} J, przyrost energii wewnętrznej ΔU = (3/2)pΔV = ${dU} J, ciepło Q = (5/2)pΔV = ${Q} J.`
      },
      hints: [
        { level: 1, text: 'I zasada termodynamiki: $Q = \\Delta U + W$.' },
        { level: 2, text: 'Praca w przemianie izobarycznej: $W = p\\,\\Delta V$. Z równania $pV = nRT$ wynika, że przy stałym $p$: $nR\\,\\Delta T = p\\,\\Delta V$.' },
        { level: 3, text: 'Przyrost energii wewnętrznej: $\\Delta U = nC_V\\Delta T = \\frac{3}{2}nR\\Delta T = \\frac{3}{2}p\\,\\Delta V$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Praca siły parcia gazu',
          content: `W = p\\,\\Delta V`,
          explanation: 'W przemianie izobarycznej ciśnienie jest stałe, więc praca = p·ΔV.'
        },
        {
          step: 2,
          title: 'Przyrost energii wewnętrznej',
          content: `\\Delta U = nC_V\\Delta T = \\tfrac{3}{2}nR\\,\\Delta T = \\tfrac{3}{2}p\\,\\Delta V`,
          explanation: 'Korzystamy z równania stanu gazu: przy stałym ciśnieniu nRΔT = pΔV.'
        },
        {
          step: 3,
          title: 'Ciepło — I zasada termodynamiki',
          content: `Q = \\Delta U + W = \\tfrac{3}{2}p\\,\\Delta V + p\\,\\Delta V = \\tfrac{5}{2}p\\,\\Delta V = \\tfrac{5}{2}\\cdot${p}\\cdot${dV} = ${Q}\\,\\text{J}`,
          explanation: ''
        }
      ]
    };
  }

  function generate() {
    // schemE (trudny) wymieniony dwukrotnie — pojawia się częściej, by podnieść poziom trudności
    return M.choose([schemeA, schemeB, schemeC, schemeD, schemeE, schemeE])();
  }

  return { generate };
})();
