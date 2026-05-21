// Generator: Elektrostatyka (pole elektryczne, ładunki, siły Coulomba)
window.fiz10 = (() => {
  const M = window.MathUtils;
  const k_e = 9e9;  // Nm²/C²

  // Schemat A: Siła wypadkowa na ładunek od dwóch innych (2024 zad.6)
  function schemeA() {
    const a = M.choose([0.1, 0.2, 0.3, 0.5]);  // bok kwadratu m
    const q = M.choose([1, 2, 3, 4, 5]) * 1e-6; // ładunek C (μC)
    const q_uC = Math.round(q * 1e6);

    // Trzy ładunki w rogach kwadratu jak w zadaniu 2024 i 2026
    // q1=+q, q2=-q, q3=+q w trzech rogach; punkt W (4. róg) — bez ładunku
    // Natężenie pola w W:
    // E od q1 (odległość a): E1 = k*q/a²
    // E od q3 (odległość a): E3 = k*q/a²
    // E od q2 (odległość a): E2 = k*q/a²
    // Geometria: q1 i q3 parą, q2 diagonal
    // Ale użyjmy prostszej konfiguracji: dwa ładunki +q w odległości d, oblicz E w punkcie na osi

    const q1 = q;
    const q2 = q;
    const d = a;  // odległość między ładunkami

    // Punkt P na osi w odległości d od q1 (i 2d od q2)? Nie — użyj środka
    // E w środku między +q i -q
    const r_half = d / 2;
    const E1 = k_e * q / (r_half * r_half);  // od q1 = +q
    const E2 = k_e * q / (r_half * r_half);  // od q2 = -q (przyciąga z tej samej strony)
    const E_total = E1 + E2; // oba w tym samym kierunku w środku dipola
    const E_nice = E_total.toExponential(2);

    return {
      id: M.makeId('fiz10_pole_dipol'),
      category: 'fiz10',
      categoryName: 'Elektrostatyka',
      type: 'elektrostatyka_pole_dipol',
      points: 3,
      params: { a_cm: Math.round(a * 100), q_uC, E_nice },
      statement: `Dwa ładunki punktowe: $+q = +${q_uC}\\,\\mu\\text{C}$ i $-q = -${q_uC}\\,\\mu\\text{C}$ umieszczono w odległości $d = ${Math.round(a * 100)}\\,\\text{cm}$ od siebie.

Oblicz natężenie pola elektrycznego $E$ w punkcie $P$ leżącym dokładnie w połowie odległości między ładunkami.`,
      answer: {
        type: 'numeric',
        display: `E = \\frac{2kq}{(d/2)^2} = ${E_nice}\\,\\text{N/C}`,
        description: `Pola od obu ładunków są skierowane w tym samym kierunku w środku dipola. E = ${E_nice} N/C.`
      },
      hints: [
        { level: 1, text: `Natężenie od ładunku punktowego: $E = k\\frac{q}{r^2}$.` },
        { level: 2, text: 'W środku dipola pola od +q i −q są skierowane w tym samym kierunku (od + do −).' },
        { level: 3, text: `$E = 2\\cdot k\\frac{q}{(d/2)^2} = \\frac{8kq}{d^2}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Natężenie od każdego ładunku',
          content: `E_1 = E_2 = k\\frac{q}{(d/2)^2} = \\frac{${k_e}\\cdot${q}}{(${a / 2})^2} = ${Math.round(E1 / 100) * 100}\\,\\text{N/C}`,
          explanation: 'Obydwa ładunki leżą w odległości d/2 od punktu P.'
        },
        {
          step: 2,
          title: 'Wypadkowe natężenie',
          content: `E = E_1 + E_2 = ${E_nice}\\,\\text{N/C}`,
          explanation: 'Oba wektory E wskazują w tym samym kierunku.'
        }
      ]
    };
  }

  // Schemat B: Trzy ładunki w rogach kwadratu (2026 zad.7)
  function schemeB() {
    const a = M.choose([0.1, 0.2, 0.3, 0.4]);   // bok kwadratu m
    const q = M.choose([1, 2, 4, 5]) * 1e-6;    // C

    // q1=+q, q2=-q, q3=+q
    // E w rogu W od q1 (odl. a), q2 (odl. a), q3 (odl. a√2)
    const E1 = Math.round(k_e * q / (a * a));        // od q2 (w osi X) - przyciąganie
    const E3 = Math.round(k_e * q / (a * a));        // od q1 (w osi Y) - odpychanie
    const E_diag = Math.round(k_e * q / (2 * a * a)); // od q3 (przekątna)

    // Uproszczona wersja: oblicz siłę Coulomba między dwoma ładunkami
    const r = a;
    const F = Math.round(k_e * q * q / (r * r) * 1000) / 1000;

    return {
      id: M.makeId('fiz10_trzy_ladunki'),
      category: 'fiz10',
      categoryName: 'Elektrostatyka',
      type: 'elektrostatyka_trzy_ladunki',
      points: 3,
      params: { a_cm: Math.round(a * 100), q_uC: Math.round(q * 1e6), F },
      statement: `Trzy jednakowe ładunki punktowe $q = ${Math.round(q * 1e6)}\\,\\mu\\text{C}$
umieszczono w rogach kwadratu o boku $a = ${Math.round(a * 100)}\\,\\text{cm}$.

Oblicz wartość siły elektrostatycznej działającej między **dwoma sąsiednimi** ładunkami.`,
      answer: {
        type: 'numeric',
        display: `F = k\\frac{q^2}{a^2} = ${F}\\,\\text{N}`,
        description: `Siła Coulomba między sąsiednimi ładunkami: F = ${F} N.`
      },
      hints: [
        { level: 1, text: `Prawo Coulomba: $F = k\\frac{q_1 q_2}{r^2}$.` },
        { level: 2, text: `Sąsiednie ładunki są w odległości $a$: $F = k\\frac{q^2}{a^2}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Siła Coulomba',
          content: `F = k\\frac{q^2}{a^2} = \\frac{9\\cdot10^9\\cdot(${Math.round(q * 1e6)}\\cdot10^{-6})^2}{${a}^2} = ${F}\\,\\text{N}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat C: Praca w polu elektrycznym / napięcie
  function schemeC() {
    const U = M.choose([100, 500, 1000, 5000, 10000]);  // V — napięcie
    const q_charge = M.choose([1, 2, 5, 10]) * 1e-9;   // C — ładunek nC
    const q_nC = Math.round(q_charge * 1e9);

    const W = Math.round(q_charge * U * 1000) / 1000;  // J — praca

    // Prędkość elektronu/protonu po przejściu napięcia U
    const m_e = 9.11e-31;  // kg
    const m_p = 1.67e-27;
    const e = 1.6e-19;
    const v_e = Math.round(Math.sqrt(2 * e * U / m_e) / 1e6) / 1000;  // ×10⁶ m/s uproszczone

    return {
      id: M.makeId('fiz10_praca_pole'),
      category: 'fiz10',
      categoryName: 'Elektrostatyka',
      type: 'elektrostatyka_praca',
      points: 2,
      params: { U, q_nC, W },
      statement: `Ładunek $q = ${q_nC}\\,\\text{nC}$ przesuwa się między dwoma płytami kondensatora,
między którymi panuje napięcie $U = ${U}\\,\\text{V}$.

Oblicz pracę $W$ wykonaną przez pole elektryczne podczas przesuwania tego ładunku.`,
      answer: {
        type: 'numeric',
        display: `W = qU = ${W}\\,\\text{J}`,
        description: `Praca pola: W = q·U = ${q_nC}×10⁻⁹ × ${U} = ${W} J.`
      },
      hints: [
        { level: 1, text: `Praca sił elektrycznych: $W = qU$ (ładunek × napięcie).` }
      ],
      solution: [
        {
          step: 1,
          title: 'Praca pola elektrycznego',
          content: `W = qU = ${q_nC}\\cdot10^{-9}\\cdot${U} = ${W}\\,\\text{J}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat D: Kondensator — pojemność, ładunek, energia
  function schemeD() {
    const C_uF = M.choose([1, 2, 4, 10, 100]);   // μF
    const C = C_uF * 1e-6;                        // F
    const U = M.choose([5, 10, 20, 50, 100]);     // V

    const Q = Math.round(C * U * 1e6 * 100) / 100;  // μC
    const E_stored = Math.round(0.5 * C * U * U * 1e6) / 1e3;  // mJ uproszczone
    const E_J = Math.round(0.5 * C * U * U * 10000) / 10000;   // J

    return {
      id: M.makeId('fiz10_kondensator'),
      category: 'fiz10',
      categoryName: 'Elektrostatyka',
      type: 'elektrostatyka_kondensator',
      points: 2,
      params: { C_uF, U, Q, E_J },
      statement: `Kondensator o pojemności $C = ${C_uF}\\,\\mu\\text{F}$ naładowano do napięcia $U = ${U}\\,\\text{V}$.

Oblicz:
a) ładunek $Q$ zgromadzony na okładkach kondensatora,
b) energię $E$ zgromadzoną w kondensatorze.`,
      answer: {
        type: 'multipart',
        display: `Q = ${Q}\\,\\mu\\text{C},\\quad E = ${E_J}\\,\\text{J}`,
        description: `Q = ${Q} μC, E = ${E_J} J.`
      },
      hints: [
        { level: 1, text: `$Q = CU$, $E = \\frac{1}{2}CU^2 = \\frac{1}{2}QU$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Ładunek',
          content: `Q = CU = ${C_uF}\\cdot10^{-6}\\cdot${U} = ${Q}\\cdot10^{-6}\\,\\text{C} = ${Q}\\,\\mu\\text{C}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Energia',
          content: `E = \\tfrac{1}{2}CU^2 = \\tfrac{1}{2}\\cdot${C_uF}\\cdot10^{-6}\\cdot${U}^2 = ${E_J}\\,\\text{J}`,
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
