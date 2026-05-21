// Generator: Fizyka atomowa (atom Bohra, fotony, efekt fotoelektryczny, polaryzacja)
window.fiz13 = (() => {
  const M = window.MathUtils;
  const h = 6.626e-34;  // Js — stała Plancka
  const c = 3e8;        // m/s
  const eV = 1.6e-19;   // J/eV

  // Energie poziomów atomu wodoru: En = -13.6/n² eV
  const E_n = (n) => -13.6 / (n * n);

  // Schemat A: Przejście elektronu w atomie wodoru (2025 zad.11)
  function schemeA() {
    const n_high = M.choose([3, 4, 5, 6]);
    const n_low  = M.choose([1, 2]);
    if (n_high <= n_low) return schemeA();

    const E_h = E_n(n_high);  // eV
    const E_l = E_n(n_low);   // eV
    const dE_eV = Math.round((E_l - E_h) * 1000) / 1000;  // energia fotonu eV (>0)
    const dE_J  = dE_eV * eV;

    // λ = hc/E
    const lambda_nm = Math.round(h * c / dE_J * 1e9 * 10) / 10;

    return {
      id: M.makeId('fiz13_atom_wodoru'),
      category: 'fiz13',
      categoryName: 'Fizyka atomowa',
      type: 'fizyka_atomowa_wodor',
      points: 3,
      params: { n_high, n_low, dE_eV, lambda_nm },
      statement: `Atom wodoru przechodzi ze stanu $n = ${n_high}$ do stanu $n = ${n_low}$.
Dane: $E_n = -\\frac{13{,}6}{n^2}\\,\\text{eV}$, $h = 6{,}626\\cdot10^{-34}\\,\\text{J·s}$, $c = 3\\cdot10^8\\,\\text{m/s}$, $e = 1{,}6\\cdot10^{-19}\\,\\text{C}$.

a) Oblicz energię wyemitowanego fotonu w eV.
b) Oblicz długość fali wyemitowanego fotonu.`,
      answer: {
        type: 'multipart',
        display: `E_{\\gamma} = ${dE_eV}\\,\\text{eV},\\quad \\lambda = ${lambda_nm}\\,\\text{nm}`,
        description: `Energia fotonu: ${dE_eV} eV. Długość fali: ${lambda_nm} nm.`
      },
      hints: [
        { level: 1, text: `Energia fotonu: $E_\\gamma = E_{n_{\\text{wyższy}}} - E_{n_{\\text{niższy}}}$ (wartość bezwzględna różnicy energii).` },
        { level: 2, text: `$E_{${n_high}} = -\\frac{13{,}6}{${n_high}^2} = ${Math.round(E_n(n_high) * 1000) / 1000}\\,\\text{eV}$, $E_{${n_low}} = ${Math.round(E_n(n_low) * 1000) / 1000}\\,\\text{eV}$.` },
        { level: 3, text: `$\\lambda = \\frac{hc}{E_\\gamma}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Energia fotonu',
          content: `E_\\gamma = E_{${n_low}} - E_{${n_high}} = \\left(-\\frac{13{,}6}{${n_low}^2}\\right) - \\left(-\\frac{13{,}6}{${n_high}^2}\\right) = ${Math.round(E_n(n_low)*1000)/1000} - (${Math.round(E_n(n_high)*1000)/1000}) = ${dE_eV}\\,\\text{eV}`,
          explanation: 'Emitowany foton ma energię równą różnicy energii poziomów.'
        },
        {
          step: 2,
          title: 'Długość fali',
          content: `\\lambda = \\frac{hc}{E_\\gamma} = \\frac{6{,}626\\cdot10^{-34}\\cdot3\\cdot10^8}{${dE_eV}\\cdot1{,}6\\cdot10^{-19}} = ${lambda_nm}\\cdot10^{-9}\\,\\text{m} = ${lambda_nm}\\,\\text{nm}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat B: Efekt fotoelektryczny — prędkość elektronu
  function schemeB() {
    const W_eV = M.choose([2.0, 2.5, 3.0, 4.0, 4.5]);  // praca wyjścia eV
    const f_PHz = M.choose([0.8, 1.0, 1.2, 1.5, 2.0]); // częstotliwość ×10^15 Hz

    const f = f_PHz * 1e15;
    const E_foton_eV = Math.round(h * f / eV * 100) / 100;  // eV

    if (E_foton_eV <= W_eV) return schemeB(); // brak efektu fotoelektrycznego

    const Ek_eV = Math.round((E_foton_eV - W_eV) * 100) / 100;
    const Ek_J  = Ek_eV * eV;
    const m_e   = 9.11e-31;
    const v_max = Math.round(Math.sqrt(2 * Ek_J / m_e) / 1e5) / 10;  // ×10^5 m/s

    return {
      id: M.makeId('fiz13_fotoefekt'),
      category: 'fiz13',
      categoryName: 'Fizyka atomowa',
      type: 'fizyka_atomowa_fotoefekt',
      points: 3,
      params: { W_eV, f_PHz, E_foton_eV, Ek_eV, v_max },
      statement: `Na metal o pracy wyjścia $W = ${W_eV}\\,\\text{eV}$ pada światło o częstotliwości $f = ${f_PHz}\\cdot10^{15}\\,\\text{Hz}$.
Dane: $h = 6{,}626\\cdot10^{-34}\\,\\text{J·s}$, $m_e = 9{,}11\\cdot10^{-31}\\,\\text{kg}$, $e = 1{,}6\\cdot10^{-19}\\,\\text{C}$.

Oblicz $v_{\\max}$ — maksymalną prędkość fotoelektronów wybitych z metalu.`,
      answer: {
        type: 'numeric',
        display: `v_{\\max} = ${v_max}\\cdot10^5\\,\\text{m/s}`,
        description: `Energia fotonu: ${E_foton_eV} eV. Ek = ${Ek_eV} eV. v_max = ${v_max}×10⁵ m/s.`
      },
      hints: [
        { level: 1, text: `Równanie Einsteina efektu fotoelektrycznego: $E_{\\text{foton}} = W + E_k$.` },
        { level: 2, text: `$E_k = hf - W = ${E_foton_eV} - ${W_eV} = ${Ek_eV}\\,\\text{eV}$.` },
        { level: 3, text: `$v_{\\max} = \\sqrt{\\frac{2E_k}{m_e}}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Energia fotonu',
          content: `E_\\gamma = hf = 6{,}626\\cdot10^{-34}\\cdot${f_PHz}\\cdot10^{15} \\approx ${E_foton_eV}\\,\\text{eV}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Maksymalna energia kinetyczna',
          content: `E_k = E_\\gamma - W = ${E_foton_eV} - ${W_eV} = ${Ek_eV}\\,\\text{eV}`,
          explanation: ''
        },
        {
          step: 3,
          title: 'Prędkość maksymalna',
          content: `v_{\\max} = \\sqrt{\\frac{2E_k}{m_e}} = \\sqrt{\\frac{2\\cdot${Ek_eV}\\cdot1{,}6\\cdot10^{-19}}{9{,}11\\cdot10^{-31}}} \\approx ${v_max}\\cdot10^5\\,\\text{m/s}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat C: Prawo Malusa — polaryzatory (2025 zad.9)
  function schemeC() {
    const theta = M.choose([30, 45, 60]); // kąt między polaryzatorami
    const I0 = M.choose([100, 200, 400]); // natężenie niespolaryzowanego w / m²

    // Po pierwszym polaryzatorze: I1 = I0/2
    const I1 = I0 / 2;
    // Po drugim (prawo Malusa): I2 = I1 * cos²(θ)
    const cos2 = Math.round(Math.pow(Math.cos(theta * Math.PI / 180), 2) * 1000) / 1000;
    const I2 = Math.round(I1 * cos2 * 100) / 100;

    return {
      id: M.makeId('fiz13_malus'),
      category: 'fiz13',
      categoryName: 'Fizyka atomowa',
      type: 'fizyka_atomowa_polaryzacja',
      points: 2,
      params: { theta, I0, I1, cos2, I2 },
      statement: `Niespolaryzowane światło o natężeniu $I_0 = ${I0}\\,\\text{W/m}^2$ przechodzi przez dwa polaryzatory liniowe.
Kąt między osiami polaryzacji wynosi $\\theta = ${theta}°$.

Oblicz $I_2$ — natężenie światła po przejściu przez oba polaryzatory.`,
      answer: {
        type: 'numeric',
        display: `I_2 = \\frac{I_0}{2}\\cos^2${theta}° = ${I2}\\,\\text{W/m}^2`,
        description: `Po polaryzatorze 1: I₁ = I₀/2 = ${I1} W/m². Po polaryzatorze 2: I₂ = I₁·cos²(${theta}°) = ${I2} W/m².`
      },
      hints: [
        { level: 1, text: 'Po pierwszym polaryzatorze natężenie spada o połowę: $I_1 = I_0/2$ (niespolaryzowane → spolaryzowane).' },
        { level: 2, text: `Prawo Malusa: $I_2 = I_1\\cos^2\\theta = ${I1}\\cdot\\cos^2${theta}°$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Po pierwszym polaryzatorze',
          content: `I_1 = \\frac{I_0}{2} = \\frac{${I0}}{2} = ${I1}\\,\\text{W/m}^2`,
          explanation: 'Polaryzator przepuszcza tylko jedną składową, redukując natężenie o połowę.'
        },
        {
          step: 2,
          title: 'Po drugim polaryzatorze (prawo Malusa)',
          content: `I_2 = I_1\\cos^2${theta}° = ${I1}\\cdot${cos2} = ${I2}\\,\\text{W/m}^2`,
          explanation: ''
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC])();
  }

  return { generate };
})();
