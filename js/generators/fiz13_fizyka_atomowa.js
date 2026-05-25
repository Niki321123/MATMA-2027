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

  // Schemat C: Prawo Malusa — trzy polaryzatory (trudniejsza wersja, 4 pkt)
  function schemeC() {
    const theta1 = M.choose([30, 45, 60]); // kąt: polaryzator 1→2
    const theta2 = M.choose([30, 45, 60]); // kąt: polaryzator 2→3
    const I0 = M.choose([100, 200, 400]);

    const I1   = I0 / 2;
    const cos2_1 = Math.round(Math.pow(Math.cos(theta1 * Math.PI / 180), 2) * 1000) / 1000;
    const cos2_2 = Math.round(Math.pow(Math.cos(theta2 * Math.PI / 180), 2) * 1000) / 1000;
    const I2   = Math.round(I1 * cos2_1 * 1000) / 1000;
    const I3   = Math.round(I2 * cos2_2 * 1000) / 1000;

    return {
      id: M.makeId('fiz13_malus'),
      category: 'fiz13',
      categoryName: 'Fizyka atomowa',
      type: 'fizyka_atomowa_polaryzacja',
      points: 4,
      params: { theta1, theta2, I0, I1, I2, I3, cos2_1, cos2_2 },
      statement: `Niespolaryzowane światło o natężeniu $I_0 = ${I0}\\,\\text{W/m}^2$
przechodzi kolejno przez **trzy** polaryzatory liniowe.
Kąt między osiami polaryzatora 1 i 2 wynosi $\\theta_1 = ${theta1}°$,
a między osiami polaryzatora 2 i 3 wynosi $\\theta_2 = ${theta2}°$.

a) Oblicz natężenie $I_3$ po przejściu przez wszystkie trzy polaryzatory.
b) Co się stanie z natężeniem światła, jeśli usuniesz środkowy polaryzator (zostają tylko 1 i 3)?`,
      answer: {
        type: 'multipart',
        display: `I_3 = ${I3}\\,\\text{W/m}^2`,
        description: `I₁ = ${I1}, I₂ = ${I2}, I₃ = ${I3} W/m². Bez środkowego: I = I₀/2·cos²(${theta1+theta2}°).`
      },
      hints: [
        { level: 1, text: 'Po pierwszym polaryzatorze: $I_1 = I_0/2$ (zawsze, dla niespolaryzowanego).' },
        { level: 2, text: `Prawo Malusa kolejno: $I_2 = I_1\\cos^2${theta1}°$, $I_3 = I_2\\cos^2${theta2}°$.` },
        { level: 3, text: `Bez środkowego: światło po polaryzatorze 1 pada na polaryzator 3 pod kątem $${theta1}°+${theta2}°= ${theta1+theta2}°$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Natężenie po kolejnych polaryzatorach',
          content: `I_1 = \\frac{${I0}}{2} = ${I1}\\,\\text{W/m}^2 \\quad I_2 = ${I1}\\cdot\\cos^2${theta1}° = ${I1}\\cdot${cos2_1} = ${I2}\\,\\text{W/m}^2 \\quad I_3 = ${I2}\\cdot\\cos^2${theta2}° = ${I2}\\cdot${cos2_2} = ${I3}\\,\\text{W/m}^2`,
          explanation: 'Stosujemy prawo Malusa na każdym etapie.'
        },
        {
          step: 2,
          title: 'Efekt usunięcia środkowego polaryzatora',
          content: `I' = \\frac{I_0}{2}\\cos^2(${theta1}°+${theta2}°) = \\frac{${I0}}{2}\\cos^2(${theta1+theta2}°)`,
          explanation: `Bez środkowego, światło spolaryzowane po 1. polaryzatorze pada na 3. pod kątem (${theta1}+${theta2})°. Natężenie na ogół będzie inne niż I₃.`
        }
      ]
    };
  }

  // Schemat D: Efekt fotoelektryczny — napięcie hamowania i częstotliwość graniczna (co roku na maturze!)
  function schemeD() {
    const metals = [
      { name: 'cynk',    W_eV: 4.3 },
      { name: 'sód',     W_eV: 2.3 },
      { name: 'potas',   W_eV: 2.2 },
      { name: 'cez',     W_eV: 2.0 },
      { name: 'miedź',   W_eV: 4.5 },
    ];
    const metal = M.choose(metals);
    const W_eV  = metal.W_eV;
    const W_J   = W_eV * eV;

    // Częstotliwość graniczna: W = h·f₀ → f₀ = W/h
    const f0_Hz = W_J / h;
    const f0_PHz = Math.round(f0_Hz / 1e15 * 1000) / 1000;  // ×10¹⁵ Hz

    // Padające światło: f > f₀ (np. 1.5× f₀)
    const factor = M.choose([1.5, 2.0, 2.5]);
    const f_Hz   = factor * f0_Hz;
    const f_PHz  = Math.round(f_Hz / 1e15 * 1000) / 1000;

    // Energia kinetyczna fotoelektronów: Ek = hf - W
    const Ek_eV  = Math.round((h * f_Hz / eV - W_eV) * 100) / 100;

    // Napięcie hamowania: eU = Ek → U = Ek/e [V = eV/e]
    const U_stop_V = Math.round(Ek_eV * 100) / 100;  // numerycznie Ek[eV] = U[V]

    return {
      id: M.makeId('fiz13_napiecie_hamowania'),
      category: 'fiz13',
      categoryName: 'Fizyka atomowa',
      type: 'fizyka_atomowa_napiecie_hamowania',
      points: 5,
      params: { metal: metal.name, W_eV, f0_PHz, f_PHz, Ek_eV, U_stop_V, factor },
      statement: `Na powierzchnię ${metal.name} (praca wyjścia $W = ${W_eV}\\,\\text{eV}$) pada światło o częstotliwości $f = ${f_PHz}\\cdot10^{15}\\,\\text{Hz}$.
Dane: $h = 6{,}626\\cdot10^{-34}\\,\\text{J·s}$, $e = 1{,}6\\cdot10^{-19}\\,\\text{C}$.

a) Oblicz częstotliwość graniczną $f_0$ efektu fotoelektrycznego dla tego metalu.
b) Oblicz maksymalną energię kinetyczną wybitych fotoelektronów.
c) Jakie napięcie hamujące $U_h$ należy przyłożyć, aby zatrzymać wszystkie fotoelektrony?`,
      answer: {
        type: 'multipart',
        display: `f_0 = ${f0_PHz}\\cdot10^{15}\\,\\text{Hz},\\quad E_k = ${Ek_eV}\\,\\text{eV},\\quad U_h = ${U_stop_V}\\,\\text{V}`,
        description: `f₀ = ${f0_PHz}×10¹⁵ Hz. Ek_max = ${Ek_eV} eV. Napięcie hamowania: ${U_stop_V} V.`
      },
      hints: [
        { level: 1, text: `Częstotliwość graniczna: $W = hf_0 \\implies f_0 = W/h$.` },
        { level: 2, text: `Równanie Einsteina: $E_k = hf - W$. Przelicz W do dżuli: $W = ${W_eV}\\,\\text{eV}\\cdot1{,}6\\cdot10^{-19}\\,\\text{J/eV}$.` },
        { level: 3, text: `Napięcie hamowania: $eU_h = E_k \\implies U_h = E_k/e$. W praktyce: $U_h[\\text{V}] = E_k[\\text{eV}]$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Częstotliwość graniczna',
          content: `f_0 = \\frac{W}{h} = \\frac{${W_eV}\\cdot1{,}6\\cdot10^{-19}}{6{,}626\\cdot10^{-34}} \\approx ${f0_PHz}\\cdot10^{15}\\,\\text{Hz}`,
          explanation: 'Poniżej f₀ foton nie ma wystarczającej energii, by wybić elektron.'
        },
        {
          step: 2,
          title: 'Maksymalna energia kinetyczna',
          content: `E_k = hf - W = h\\cdot${f_PHz}\\cdot10^{15} - ${W_eV}\\cdot e \\approx ${Ek_eV}\\,\\text{eV}`,
          explanation: 'Równanie Einsteina dla efektu fotoelektrycznego.'
        },
        {
          step: 3,
          title: 'Napięcie hamowania',
          content: `eU_h = E_k \\implies U_h = \\frac{E_k}{e} = \\frac{${Ek_eV}\\cdot e}{e} = ${U_stop_V}\\,\\text{V}`,
          explanation: 'Elektron z energią Ek zostanie zatrzymany przez pole elektryczne o napięciu U_h = E_k[eV] woltów.'
        }
      ]
    };
  }

  function generate() {
    // schemeD (napięcie hamowania) — ważny temat, zwiększona waga
    return M.choose([schemeA, schemeB, schemeC, schemeD, schemeD])();
  }

  return { generate };
})();
