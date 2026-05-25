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
  // Rozszerzony do 4 pkt — dodano podpunkt o przesunięciu ku czerwieni
  function schemeC() {
    const f0_GHz = M.choose([3, 5, 10]); // GHz
    const df_kHz = M.choose([250, 500, 750, 1000]); // kHz — różnica częstotliwości

    // df/f0 = v/c (dla v << c)
    const v_over_c = df_kHz * 1e3 / (f0_GHz * 1e9);
    const v_ms = Math.round(v_over_c * c);
    const v_kms = Math.round(v_ms / 1000);
    const f_obs_GHz = Math.round((f0_GHz - df_kHz * 1e3 / 1e9) * 1000) / 1000;

    return {
      id: M.makeId('fiz12_doppler_rel'),
      category: 'fiz12',
      categoryName: 'Szczególna teoria względności',
      type: 'relatywistyka_doppler_EM',
      points: 4,
      params: { f0_GHz, df_kHz, v_kms, f_obs_GHz },
      statement: `Sonda kosmiczna oddala się od Ziemi i emituje falę elektromagnetyczną o częstotliwości $f_0 = ${f0_GHz}\\,\\text{GHz}$ (w układzie sondy).
Na Ziemi zarejestrowano częstotliwość $f_{obs}$, która różni się od $f_0$ o $|\\Delta f| = ${df_kHz}\\,\\text{kHz}$.
Przyjmij $v \\ll c$ oraz $c = 3\\cdot10^8\\,\\text{m/s}$.

a) Oblicz $v$ — prędkość sondy względem Ziemi.
b) Czy zmierzona częstotliwość $f_{obs}$ jest większa, czy mniejsza od $f_0$? Uzasadnij krótko.`,
      answer: {
        type: 'multipart',
        display: `v = ${v_kms}\\,\\text{km/s};\\quad f_{obs} < f_0 \\text{ (przesunięcie ku czerwieni)}`,
        description: `v ≈ ${v_kms} km/s. Sonda oddala się → f_obs < f₀ (przesunięcie ku czerwieni, efekt Dopplera).`
      },
      hints: [
        { level: 1, text: `Dla $v \\ll c$: $\\frac{|\\Delta f|}{f_0} = \\frac{v}{c}$ (przesunięcie Dopplera).` },
        { level: 2, text: `$v = \\frac{|\\Delta f|}{f_0}\\cdot c = \\frac{${df_kHz}\\cdot10^3}{${f0_GHz}\\cdot10^9}\\cdot3\\cdot10^8$.` },
        { level: 3, text: 'Gdy źródło się oddala, obserwowana częstotliwość jest niższa od wyemitowanej (przesunięcie ku czerwieni).' }
      ],
      solution: [
        {
          step: 1,
          title: 'Prędkość z przesunięcia Dopplera',
          content: `v = \\frac{|\\Delta f|}{f_0}\\cdot c = \\frac{${df_kHz}\\cdot10^3}{${f0_GHz}\\cdot10^9}\\cdot3\\cdot10^8 = ${v_ms}\\,\\text{m/s} = ${v_kms}\\,\\text{km/s}`,
          explanation: 'Stosujemy wzór Dopplera dla fal EM przy v ≪ c.'
        },
        {
          step: 2,
          title: 'Kierunek przesunięcia częstotliwości',
          content: `f_{obs} = f_0 - |\\Delta f| = ${f0_GHz}\\,\\text{GHz} - ${df_kHz}\\,\\text{kHz} < f_0`,
          explanation: 'Sonda oddala się od Ziemi → częstotliwość maleje (przesunięcie ku czerwieni, red-shift). Gdyby się zbliżała, byłoby przesunięcie ku fioletu.'
        }
      ]
    };
  }

  // Schemat D: Dylatacja czasu — astronauta / mion kosmiczny (co roku na maturze!)
  function schemeD() {
    // Wybieramy v/c z ładnymi gammi
    const configs = [
      { v_str: '0{,}6c', v_over_c: 0.6, gamma: 1.25,   gamma_str: '\\tfrac{5}{4}',  sqrt_str: '\\sqrt{1 - 0{,}36} = 0{,}8',  t_choices: [5, 10, 15, 20] },
      { v_str: '0{,}8c', v_over_c: 0.8, gamma: 5 / 3,  gamma_str: '\\tfrac{5}{3}',  sqrt_str: '\\sqrt{1 - 0{,}64} = 0{,}6',  t_choices: [5, 10, 15] },
    ];
    const cfg = M.choose(configs);
    const t_Earth = M.choose(cfg.t_choices);  // lat — czas w układzie Ziemi
    const tau0    = Math.round(t_Earth / cfg.gamma);  // czas własny astronauty
    const d_ly    = Math.round(cfg.v_over_c * t_Earth * 100) / 100;  // lata świetlne

    return {
      id: M.makeId('fiz12_dylatacja'),
      category: 'fiz12',
      categoryName: 'Szczególna teoria względności',
      type: 'str_dylatacja_czasu',
      points: 5,
      params: { v_str: cfg.v_str, t_Earth, tau0, gamma: cfg.gamma, gamma_str: cfg.gamma_str, d_ly, v_over_c: cfg.v_over_c },
      statement: `Rakieta kosmiczna porusza się ze stałą prędkością $v = ${cfg.v_str}$ względem Ziemi.
Obserwator na Ziemi zmierzył, że podróż trwała $t = ${t_Earth}\\,\\text{lat}$.
Przyjmij rok świetlny (j.ś.) za jednostkę odległości pokonanej przez światło w 1 roku.

a) Oblicz $\\gamma$ — czynnik Lorentza dla tej prędkości.
b) Oblicz $\\tau_0$ — czas odmierzony przez zegar astronauty w rakiecie podczas podróży.
c) Jaką odległość pokonała rakieta według obserwatora na Ziemi (podaj w latach świetlnych)?`,
      answer: {
        type: 'multipart',
        display: `\\gamma = ${cfg.gamma_str},\\quad \\tau_0 = ${tau0}\\,\\text{lat},\\quad d = ${d_ly}\\,\\text{j.ś.}`,
        description: `γ = ${Math.round(cfg.gamma * 1000) / 1000}. Czas astronauty: τ₀ = ${tau0} lat (krótszy!). Odległość: d = ${d_ly} j.ś.`
      },
      hints: [
        { level: 1, text: `Czynnik Lorentza: $\\gamma = \\dfrac{1}{\\sqrt{1-(v/c)^2}} = \\dfrac{1}{${cfg.sqrt_str}} = ${cfg.gamma_str}$.` },
        { level: 2, text: `Dylatacja czasu: $t = \\gamma \\cdot \\tau_0$, skąd $\\tau_0 = \\dfrac{t}{\\gamma} = \\dfrac{${t_Earth}}{${cfg.gamma_str}} = ${tau0}\\,\\text{lat}$.` },
        { level: 3, text: `Odległość (układ Ziemi): $d = v \\cdot t = ${cfg.v_over_c}c \\cdot ${t_Earth}\\,\\text{lat} = ${d_ly}\\,\\text{j.ś.}$ (bo $1\\,\\text{j.ś.} = c \\cdot 1\\,\\text{rok}$).` }
      ],
      solution: [
        {
          step: 1,
          title: 'Czynnik Lorentza',
          content: `\\gamma = \\frac{1}{\\sqrt{1-\\left(\\frac{v}{c}\\right)^2}} = \\frac{1}{${cfg.sqrt_str}} = ${cfg.gamma_str}`,
          explanation: 'γ > 1 zawsze; im bliżej c, tym γ większe.'
        },
        {
          step: 2,
          title: 'Czas własny astronauty (dylatacja czasu)',
          content: `\\tau_0 = \\frac{t}{\\gamma} = \\frac{${t_Earth}}{${cfg.gamma_str}} = ${tau0}\\,\\text{lat}`,
          explanation: 'Zegar w rakiecie porusza się względem Ziemi — chodzi wolniej. Czas własny τ₀ < t (czas na Ziemi).'
        },
        {
          step: 3,
          title: 'Odległość w układzie Ziemi',
          content: `d = v \\cdot t = ${cfg.v_over_c}c \\cdot ${t_Earth}\\,\\text{lat} = ${d_ly}\\,\\text{j.ś.}`,
          explanation: 'Rok świetlny = c × rok, więc d [j.ś.] = (v/c) × t [lat].'
        }
      ]
    };
  }

  // Schemat E: Skurcz Lorentza — długość statku kosmicznego (co roku na maturze!)
  function schemeE() {
    const configs = [
      { v_str: '0{,}6c', v_over_c: 0.6, gamma: 1.25,  factor: 0.8, gamma_str: '\\tfrac{5}{4}', sqrt_str: '\\sqrt{1-0{,}36}=0{,}8' },
      { v_str: '0{,}8c', v_over_c: 0.8, gamma: 5 / 3, factor: 0.6, gamma_str: '\\tfrac{5}{3}', sqrt_str: '\\sqrt{1-0{,}64}=0{,}6' },
    ];
    const cfg  = M.choose(configs);
    const L0   = M.choose([100, 200, 500, 1000]);  // długość własna [m]
    const L    = Math.round(L0 * cfg.factor * 10) / 10;  // skrócona długość [m]

    // Czas przelotu według stacji: front wchodzi, tył wychodzi → statek zajmuje L przy v
    const v_ms     = cfg.v_over_c * 3e8;
    const t_stacja_ns = Math.round(L / v_ms * 1e9 * 10) / 10;   // ns
    const t_statek_ns = Math.round(L0 / v_ms * 1e9 * 10) / 10;  // ns (dłuższy — γ·t_stacja)

    return {
      id: M.makeId('fiz12_skurcz'),
      category: 'fiz12',
      categoryName: 'Szczególna teoria względności',
      type: 'str_skurcz_lorentza',
      points: 5,
      params: { v_str: cfg.v_str, L0, L, gamma_str: cfg.gamma_str, t_stacja_ns, t_statek_ns, v_over_c: cfg.v_over_c },
      statement: `Statek kosmiczny ma długość własną $L_0 = ${L0}\\,\\text{m}$ (zmierzoną w jego układzie spoczynku).
Statek przelatuje obok stacji orbitalnej z prędkością $v = ${cfg.v_str}$.
Przyjmij $c = 3\\cdot10^8\\,\\text{m/s}$.

a) Jaką długość $L$ zmierzy obserwator na stacji?
b) Oblicz, przez ile nanosekund obserwator na stacji rejestruje przelot statku (od momentu pojawienia się dzioba do zniknięcia rufy).
c) Ile nanosekund trwa według zegara astronauty na statku „przelot stacji przez cały statek" (od pojawienia się stacji przy dziobie do zniknięcia przy rufie)?`,
      answer: {
        type: 'multipart',
        display: `L = ${L}\\,\\text{m},\\quad t_{\\text{stacja}} = ${t_stacja_ns}\\,\\text{ns},\\quad t_{\\text{statek}} = ${t_statek_ns}\\,\\text{ns}`,
        description: `L = ${L} m (skurcz). Stacja: ${t_stacja_ns} ns. Statek: ${t_statek_ns} ns (dłużej — stacja przesuwa się przez cały statek długości L₀).`
      },
      hints: [
        { level: 1, text: `Skurcz Lorentza: $L = \\dfrac{L_0}{\\gamma}$, gdzie $\\gamma = ${cfg.gamma_str}$.` },
        { level: 2, text: `Stacja mierzy czas dla skróconego statku: $t_{stacja} = L/v$.` },
        { level: 3, text: `Astronauta widzi stację przelatującą przez cały (nieskrócony) statek: $t_{statek} = L_0/v = \\gamma \\cdot t_{stacja}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Długość statku według stacji (skurcz Lorentza)',
          content: `L = \\frac{L_0}{\\gamma} = \\frac{${L0}}{${cfg.gamma_str}} = ${L}\\,\\text{m}`,
          explanation: 'Długość poruszającego się obiektu jest skrócona w kierunku ruchu.'
        },
        {
          step: 2,
          title: 'Czas przelotu według stacji',
          content: `t_{stacja} = \\frac{L}{v} = \\frac{${L}}{${cfg.v_over_c}\\cdot3\\cdot10^8} = ${t_stacja_ns}\\,\\text{ns}`,
          explanation: 'Stacja widzi skrócony statek długości L przemierzający odległość L przy prędkości v.'
        },
        {
          step: 3,
          title: 'Czas przelotu według astronauty',
          content: `t_{statek} = \\frac{L_0}{v} = \\frac{${L0}}{${cfg.v_over_c}\\cdot3\\cdot10^8} = ${t_statek_ns}\\,\\text{ns} = \\gamma \\cdot t_{stacja}`,
          explanation: 'W układzie statku stacja (punkt) przelatuje przez cały statek o długości L₀. Wynik zgodny z dylatacją czasu: t_statek = γ·t_stacja (zegar stacji chodzi wolniej względem statku).'
        }
      ]
    };
  }

  function generate() {
    // schemeD i schemeE (dylatacja, skurcz) wymienione dwukrotnie — ważne tematy maturalne
    return M.choose([schemeA, schemeB, schemeC, schemeD, schemeD, schemeE, schemeE])();
  }

  return { generate };
})();
