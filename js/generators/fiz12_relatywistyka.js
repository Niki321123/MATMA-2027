// Generator: Szczególna teoria względności (energia spoczynkowa, kinetyczna, prędkość)
window.fiz12 = (() => {
  const M = window.MathUtils;
  const c = 3e8;           // m/s
  const E0_e_eV = 0.511e6; // eV — energia spoczynkowa elektronu
  const E0_e_J  = 9.11e-31 * c * c;  // J

  // Schemat A: Elektron przyspieszony do prędkości relatywistycznej (2023 zad.10, 2024 zad.10)
  function schemeA() {
    // Ek = n * E0 (wielokrotność energii spoczynkowej)
    const n = M.choose([1, 2, 3, 5, 10]);  // Ek = n * E0
    const E0_eV = E0_e_eV;

    // E_total = E0 + Ek = (n+1)*E0
    // E_total = gamma * E0 = E0 / sqrt(1 - v²/c²)
    // gamma = n + 1
    // v/c = sqrt(1 - 1/gamma²) = sqrt(1 - 1/(n+1)²)
    const gamma = n + 1;
    const v_over_c = Math.sqrt(1 - 1 / (gamma * gamma));
    const v_over_c_nice = Math.round(v_over_c * 1000) / 1000;

    // Napięcie: eU = Ek = n * E0_eV → U = n * E0_eV (w woltach)
    const U_V = Math.round(n * E0_eV);

    return {
      id: M.makeId('fiz12_elektron_rel'),
      category: 'fiz12',
      categoryName: 'Szczególna teoria względności',
      type: 'relatywistyka_elektron_predkosc',
      points: 3,
      params: { n, gamma, v_over_c_nice, U_V, E0_eV },
      statement: `Elektron (energia spoczynkowa $E_0 \\approx 0{,}511\\,\\text{MeV}$) został przyspieszony w polu elektrycznym.
Energia kinetyczna uzyskana przez elektron jest **${n === 1 ? 'równa' : n + '-krotnie większa od'}** jego energii spoczynkowej:
$E_k = ${n}\\cdot E_0$.

a) Oblicz $v/c$ — stosunek prędkości elektronu do prędkości światła.
b) Jakie napięcie $U$ przyspieszało elektron?`,
      answer: {
        type: 'multipart',
        display: `\\frac{v}{c} = \\sqrt{1 - \\frac{1}{(${gamma})^2}} \\approx ${v_over_c_nice},\\quad U = ${U_V / 1000}\\,\\text{kV}`,
        description: `v/c ≈ ${v_over_c_nice}. Napięcie: U = ${Math.round(U_V / 1000)} kV.`
      },
      hints: [
        { level: 1, text: `Energia całkowita elektronu: $E = E_0 + E_k = E_0(1 + ${n}) = ${gamma}E_0$.` },
        { level: 2, text: `Czynnik Lorentza: $\\gamma = E/E_0 = ${gamma}$. Prędkość: $v = c\\sqrt{1-1/\\gamma^2}$.` },
        { level: 3, text: `Napięcie: $eU = E_k \\implies U = E_k/e = ${n}E_0/e = ${n}\\cdot0{,}511\\,\\text{MV}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Czynnik Lorentza i prędkość',
          content: `\\gamma = \\frac{E_0 + E_k}{E_0} = \\frac{(${n}+1)E_0}{E_0} = ${gamma} \\implies \\frac{v}{c} = \\sqrt{1 - \\frac{1}{${gamma}^2}} = \\sqrt{1 - \\frac{1}{${gamma * gamma}}} \\approx ${v_over_c_nice}`,
          explanation: 'Z relacji E = γE₀ wyznaczamy γ, a stamtąd v.'
        },
        {
          step: 2,
          title: 'Napięcie przyspieszające',
          content: `eU = E_k = ${n}E_0 = ${n}\\cdot0{,}511\\,\\text{MeV} \\implies U = ${n}\\cdot0{,}511\\,\\text{MV} = ${Math.round(n * 511)}\\,\\text{kV}`,
          explanation: 'Praca sił elektrycznych = zysk energii kinetycznej.'
        }
      ]
    };
  }

  // Schemat B: Cząstka z daną energią kinetyczną — oblicz prędkość (2025 zad.10)
  function schemeB() {
    const Ek_keV = M.choose([79, 100, 200, 511, 1000]);  // keV
    const E0_keV = M.choose([105, 511, 938000]);           // keV
    const type = E0_keV === 511 ? 'elektron' : E0_keV === 105 ? 'mion' : 'proton';

    const gamma = 1 + Ek_keV / E0_keV;
    const v_over_c = Math.round(Math.sqrt(1 - 1 / (gamma * gamma)) * 1000) / 1000;

    return {
      id: M.makeId('fiz12_czastka_ek'),
      category: 'fiz12',
      categoryName: 'Szczególna teoria względności',
      type: 'relatywistyka_predkosc_z_ek',
      points: 3,
      params: { Ek_keV, E0_keV, type, v_over_c, gamma: Math.round(gamma * 1000) / 1000 },
      statement: `Cząstka (${type}, energia spoczynkowa $E_0 = ${E0_keV < 1000 ? E0_keV + '\\,\\text{keV}' : Math.round(E0_keV / 1000) + '\\,\\text{MeV}'})$
ma energię kinetyczną $E_k = ${Ek_keV}\\,\\text{keV}$.

Oblicz $v/c$ — stosunek prędkości cząstki do prędkości światła.`,
      answer: {
        type: 'numeric',
        display: `\\frac{v}{c} = \\sqrt{1 - \\frac{1}{\\gamma^2}} \\approx ${v_over_c}`,
        description: `γ = ${Math.round(gamma * 1000) / 1000}. v/c ≈ ${v_over_c}.`
      },
      hints: [
        { level: 1, text: `Relatywistyczna energia kinetyczna: $E_k = (\\gamma - 1)E_0$.` },
        { level: 2, text: `$\\gamma = 1 + \\frac{E_k}{E_0} = 1 + \\frac{${Ek_keV}}{${E0_keV}} = ${Math.round(gamma * 1000) / 1000}$.` },
        { level: 3, text: `$v = c\\sqrt{1 - 1/\\gamma^2}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Czynnik Lorentza',
          content: `\\gamma = 1 + \\frac{E_k}{E_0} = 1 + \\frac{${Ek_keV}}{${E0_keV}} = ${Math.round(gamma * 1000) / 1000}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Prędkość',
          content: `\\frac{v}{c} = \\sqrt{1 - \\frac{1}{\\gamma^2}} = \\sqrt{1 - \\frac{1}{${Math.round(gamma * 1000) / 1000}^2}} \\approx ${v_over_c}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat C: Efekt Dopplera relatywistyczny — prędkość sondy (2023 zad.4)
  function schemeC() {
    const f0_GHz = M.choose([3, 5, 10]); // GHz
    const df_kHz = M.choose([250, 500, 750, 1000]); // kHz — różnica częstotliwości

    // df/f0 = v/c (dla v << c)
    const v_over_c = df_kHz * 1e3 / (f0_GHz * 1e9);
    const v_ms = Math.round(v_over_c * c);
    const v_kms = Math.round(v_ms / 1000);

    return {
      id: M.makeId('fiz12_doppler_rel'),
      category: 'fiz12',
      categoryName: 'Szczególna teoria względności',
      type: 'relatywistyka_doppler_EM',
      points: 2,
      params: { f0_GHz, df_kHz, v_kms },
      statement: `Sonda kosmiczna oddala się od Ziemi i emituje falę elektromagnetyczną o częstotliwości $f_0 = ${f0_GHz}\\,\\text{GHz}$ (w układzie sondy).
Na Ziemi zarejestrowano częstotliwość różniącą się od $f_0$ o $|\\Delta f| = ${df_kHz}\\,\\text{kHz}$.
Przyjmij $v \\ll c$ oraz $c = 3\\cdot10^8\\,\\text{m/s}$.

Oblicz $v$ — prędkość sondy względem Ziemi.`,
      answer: {
        type: 'numeric',
        display: `v = \\frac{|\\Delta f|}{f_0}\\cdot c = ${v_kms}\\,\\text{km/s}`,
        description: `Prędkość sondy: v ≈ ${v_kms} km/s.`
      },
      hints: [
        { level: 1, text: `Dla $v \\ll c$: $\\frac{|\\Delta f|}{f_0} = \\frac{v}{c}$ (przesunięcie Dopplera).` },
        { level: 2, text: `$v = \\frac{|\\Delta f|}{f_0}\\cdot c = \\frac{${df_kHz}\\cdot10^3}{${f0_GHz}\\cdot10^9}\\cdot3\\cdot10^8$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Prędkość z przesunięcia Dopplera',
          content: `v = \\frac{|\\Delta f|}{f_0}\\cdot c = \\frac{${df_kHz}\\cdot10^3}{${f0_GHz}\\cdot10^9}\\cdot3\\cdot10^8 = ${v_ms}\\,\\text{m/s} = ${v_kms}\\,\\text{km/s}`,
          explanation: 'Dla prędkości dużo mniejszych od c.'
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC])();
  }

  return { generate };
})();
