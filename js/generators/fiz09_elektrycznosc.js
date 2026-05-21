// Generator: Elektryczność (obwody, prawa Kirchhoffa, moc)
window.fiz09 = (() => {
  const M = window.MathUtils;

  // Schemat A: Obwód z 3 opornikami przed i po zwarciu (2024 zad.7)
  function schemeA() {
    const R = M.choose([10, 20, 30, 50, 100]);  // Ω — opór każdego opornika
    const U = M.choose([10, 12, 15, 20, 24]);    // V — napięcie źródła

    // Przed zerwaniem: R1 szeregowo z (R2 || R3)
    // R_eq1 = R + R/2 = 3R/2
    const R_eq1 = 3 * R / 2;
    const I_total1 = Math.round(U / R_eq1 * 1000) / 1000;
    const U_R1 = Math.round(R * I_total1 * 100) / 100;
    const U_R23 = Math.round(U - U_R1 * 100) / 100;
    const I_R3_1 = Math.round(U_R23 / R * 1000) / 1000;

    // Po zerwaniu R1: R2 szeregowo z R3 = 2R
    const R_eq2 = 2 * R;
    const I_total2 = Math.round(U / R_eq2 * 1000) / 1000;

    const ratio = Math.round(I_total2 / I_total1 * 100) / 100;

    return {
      id: M.makeId('fiz09_obwod_3r'),
      category: 'fiz09',
      categoryName: 'Elektryczność',
      type: 'elektrycznosc_obwod_3r',
      points: 3,
      params: { R, U, R_eq1, I_total1, I_total2, ratio },
      statement: `Do źródła napięcia $U = ${U}\\,\\text{V}$ podłączono trzy jednakowe oporniki,
każdy o oporze $R = ${R}\\,\\Omega$:
- Opornik $R_1$ jest w szeregu z układem równoległym $R_2 \\| R_3$.

Oblicz iloraz $\\frac{I_2}{I_1}$ natężeń prądu przez amperomierz **po** i **przed** przerwaniem obwodu w miejscu $R_1$.`,
      answer: {
        type: 'numeric',
        display: `\\frac{I_2}{I_1} = ${ratio}`,
        description: `Przed: I₁ = ${I_total1} A. Po zerwaniu: I₂ = ${I_total2} A. Iloraz = ${ratio}.`
      },
      hints: [
        { level: 1, text: 'Przed zerwaniem: $R_1$ szeregowo z $R_2 \\| R_3 = R/2$. Opór zastępczy = $3R/2$.' },
        { level: 2, text: 'Po zerwaniu $R_1$: $R_2$ szeregowo z $R_3 = 2R$. Opór zastępczy = $2R$.' },
        { level: 3, text: `$I_1 = U/(3R/2) = 2U/(3R)$, $I_2 = U/(2R)$. Iloraz = $\\frac{U/(2R)}{2U/(3R)} = \\frac{3}{4}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Stan przed zerwaniem',
          content: `R_{\\text{zast}} = R + \\frac{R}{2} = \\frac{3R}{2} = ${R_eq1}\\,\\Omega \\implies I_1 = \\frac{U}{R_{\\text{zast}}} = \\frac{${U}}{${R_eq1}} = ${I_total1}\\,\\text{A}`,
          explanation: 'R₂ ∥ R₃ = R/2, połączone szeregowo z R₁ = R.'
        },
        {
          step: 2,
          title: 'Stan po zerwaniu',
          content: `R_{\\text{zast}}' = 2R = ${R_eq2}\\,\\Omega \\implies I_2 = \\frac{U}{2R} = \\frac{${U}}{${R_eq2}} = ${I_total2}\\,\\text{A}`,
          explanation: 'R₂ i R₃ w szeregu.'
        },
        {
          step: 3,
          title: 'Iloraz',
          content: `\\frac{I_2}{I_1} = \\frac{${I_total2}}{${I_total1}} = ${ratio}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat B: Żarówka — opór, temperatura filamentu (2023 zad.8)
  function schemeB() {
    const P_nom = M.choose([25, 40, 60, 100]);   // W — moc znamionowa
    const U_net = 230;                            // V — napięcie sieci
    const R0 = M.choose([50, 60, 65, 70]);        // Ω — opór przy 300 K

    const R_hot = Math.round(U_net * U_net / P_nom);  // Ω — opór przy roboczy
    const ratio_R = Math.round(R_hot / R0 * 100) / 100;

    // Z wykresu: R/R0 = ratio_R → odczyt temperatury ~2900-3200 K
    // Uproszczona aproksymacja liniowa: T ≈ 300 + (ratio_R - 1) * 100 / 0.055
    const T_rough = Math.round(300 + (ratio_R - 1) * 1 / 0.0045);

    return {
      id: M.makeId('fiz09_zarowka'),
      category: 'fiz09',
      categoryName: 'Elektryczność',
      type: 'elektrycznosc_zarowka_opor',
      points: 3,
      params: { P_nom, U_net, R0, R_hot, ratio_R },
      statement: `Żarówka o mocy znamionowej $P = ${P_nom}\\,\\text{W}$ jest zasilana napięciem $U = ${U_net}\\,\\text{V}$.
Opór żarnika w temperaturze $T_0 = 300\\,\\text{K}$ wynosi $R_0 = ${R0}\\,\\Omega$.

a) Oblicz $R$ — opór żarnika w temperaturze roboczej.
b) Ile razy opór roboczego żarnika jest większy od $R_0$?`,
      answer: {
        type: 'multipart',
        display: `R = ${R_hot}\\,\\Omega,\\quad \\frac{R}{R_0} = ${ratio_R}`,
        description: `Opór roboczy: R = ${R_hot} Ω, co jest ${ratio_R} razy więcej niż R₀.`
      },
      hints: [
        { level: 1, text: `Moc elektryczna: $P = \\frac{U^2}{R} \\implies R = \\frac{U^2}{P}$.` },
        { level: 2, text: `$R = \\frac{${U_net}^2}{${P_nom}} = \\frac{${U_net * U_net}}{${P_nom}} = ${R_hot}\\,\\Omega$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Opór roboczy żarnika',
          content: `R = \\frac{U^2}{P} = \\frac{${U_net}^2}{${P_nom}} = ${R_hot}\\,\\Omega`,
          explanation: 'Korzystamy z wzoru na moc elektryczną.'
        },
        {
          step: 2,
          title: 'Stosunek oporów',
          content: `\\frac{R}{R_0} = \\frac{${R_hot}}{${R0}} = ${ratio_R}`,
          explanation: 'Wolfram w wysokiej temperaturze ma wielokrotnie wyższy opór.'
        }
      ]
    };
  }

  // Schemat C: Prawa Kirchhoffa — prosty obwód
  function schemeC() {
    const E = M.choose([6, 9, 12, 15, 18, 24]);   // V — SEM
    const r = M.choose([0.5, 1, 2]);               // Ω — opór wewnętrzny
    const R1 = M.choose([3, 4, 5, 6, 8, 10]);      // Ω
    const R2 = M.choose([3, 4, 5, 6, 8, 10]);      // Ω

    // R1 || R2 szeregowo z r
    const R_par = Math.round(R1 * R2 / (R1 + R2) * 100) / 100;
    const R_total = R_par + r;
    const I = Math.round(E / R_total * 1000) / 1000;
    const U_terminal = Math.round((E - I * r) * 100) / 100;
    const I1 = Math.round(U_terminal / R1 * 1000) / 1000;
    const I2 = Math.round(U_terminal / R2 * 1000) / 1000;
    const P1 = Math.round(I1 * I1 * R1 * 100) / 100;
    const P2 = Math.round(I2 * I2 * R2 * 100) / 100;

    return {
      id: M.makeId('fiz09_kirchhoff'),
      category: 'fiz09',
      categoryName: 'Elektryczność',
      type: 'elektrycznosc_kirchhoff',
      points: 3,
      params: { E, r, R1, R2, I, U_terminal, I1, I2, P1, P2 },
      statement: `Bateria ($\\mathcal{E} = ${E}\\,\\text{V}$, opór wewnętrzny $r = ${r}\\,\\Omega$)
zasila obwód, w którym oporniki $R_1 = ${R1}\\,\\Omega$ i $R_2 = ${R2}\\,\\Omega$ są połączone **równolegle**.

Oblicz:
a) natężenie prądu $I$ w obwodzie głównym,
b) napięcie na zaciskach baterii $U$,
c) moc wydzielaną na $R_1$.`,
      answer: {
        type: 'multipart',
        display: `I = ${I}\\,\\text{A},\\quad U = ${U_terminal}\\,\\text{V},\\quad P_1 = ${P1}\\,\\text{W}`,
        description: `I = ${I} A, napięcie na zaciskach = ${U_terminal} V, moc na R₁ = ${P1} W.`
      },
      hints: [
        { level: 1, text: `Opór zastępczy: $R_{\\text{zast}} = \\frac{R_1 R_2}{R_1+R_2} = ${R_par}\\,\\Omega$. Całkowity opór: $R_{\\text{zast}} + r = ${R_total}\\,\\Omega$.` },
        { level: 2, text: `Prawo Ohma: $I = \\mathcal{E}/(R_{\\text{zast}}+r)$.` },
        { level: 3, text: `Napięcie na zaciskach: $U = \\mathcal{E} - Ir$. Moc: $P_1 = U^2/R_1$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Opór zastępczy i prąd',
          content: `R_{\\text{par}} = \\frac{${R1}\\cdot${R2}}{${R1}+${R2}} = ${R_par}\\,\\Omega \\implies I = \\frac{\\mathcal{E}}{R_{\\text{par}}+r} = \\frac{${E}}{${R_total}} = ${I}\\,\\text{A}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Napięcie na zaciskach',
          content: `U = \\mathcal{E} - Ir = ${E} - ${I}\\cdot${r} = ${U_terminal}\\,\\text{V}`,
          explanation: 'Napięcie spada na oporze wewnętrznym.'
        },
        {
          step: 3,
          title: 'Moc na R₁',
          content: `P_1 = \\frac{U^2}{R_1} = \\frac{${U_terminal}^2}{${R1}} = ${P1}\\,\\text{W}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat D: Temperaturowy współczynnik oporu
  function schemeD() {
    const R0 = M.choose([5, 10, 20, 50]);   // Ω opór w 0°C
    const alpha = M.choose([0.001, 0.002, 0.004, 0.005]); // 1/K
    const T = M.choose([100, 200, 300, 500, 1000]);        // °C

    const R_T = Math.round(R0 * (1 + alpha * T) * 100) / 100;

    return {
      id: M.makeId('fiz09_alpha_oporu'),
      category: 'fiz09',
      categoryName: 'Elektryczność',
      type: 'elektrycznosc_temp_opor',
      points: 2,
      params: { R0, alpha, T, R_T },
      statement: `Opornik ma opór $R_0 = ${R0}\\,\\Omega$ w temperaturze $T_0 = 0°\\text{C}$.
Temperaturowy współczynnik oporu: $\\alpha = ${alpha}\\,\\text{K}^{-1}$.

Oblicz opór $R$ opornika w temperaturze $T = ${T}°\\text{C}$.`,
      answer: {
        type: 'numeric',
        display: `R = R_0(1 + \\alpha T) = ${R_T}\\,\\Omega`,
        description: `R(${T}°C) = ${R_T} Ω.`
      },
      hints: [
        { level: 1, text: `Wzór na zależność oporu od temperatury: $R = R_0(1 + \\alpha\\Delta T)$.` },
        { level: 2, text: `$R = ${R0}\\cdot(1 + ${alpha}\\cdot${T}) = ${R_T}\\,\\Omega$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Opór w temperaturze T',
          content: `R = R_0(1 + \\alpha T) = ${R0}\\cdot(1 + ${alpha}\\cdot${T}) = ${R0}\\cdot${Math.round((1 + alpha * T) * 1000) / 1000} = ${R_T}\\,\\Omega`,
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
