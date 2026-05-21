// Generator: Grawitacja i astronomia (orbity, III prawo Keplera)
window.fiz04 = (() => {
  const M = window.MathUtils;

  // Schemat A: III prawo Keplera — wyznacz okres orbity planetoidy (2025 zad.5, 2026 zad.5)
  function schemeA() {
    // Planetoida na orbicie eliptycznej, Ziemia na kołowej
    const rP_min = M.choose([0.8, 1.2, 2.0, 3.5, 5.0, 8.5]);  // au (peryhelium)
    const rP_max = M.choose([2.5, 4.0, 6.0, 12.0, 18.9, 30.0]); // au (aphelium)
    if (rP_max <= rP_min) return schemeA();

    const a_planet = (rP_min + rP_max) / 2;  // półoś wielka au
    const a_earth = 1.0;                       // au
    const T_earth = 1.0;                       // rok

    // T² ∝ a³ → T_p² = T_e² * (a_p/a_e)³
    const T_sq = T_earth * T_earth * Math.pow(a_planet / a_earth, 3);
    const T_period = Math.round(Math.sqrt(T_sq) * 100) / 100;

    return {
      id: M.makeId('fiz04_kepler3'),
      category: 'fiz04',
      categoryName: 'Grawitacja i astronomia',
      type: 'grawitacja_kepler3',
      points: 3,
      params: { rP_min, rP_max, a_planet, T_period },
      statement: `Planetoida obiega Słońce po orbicie eliptycznej.
Minimalna odległość od Słońca: $r_{\\min} = ${rP_min}\\,\\text{au}$,
maksymalna odległość: $r_{\\max} = ${rP_max}\\,\\text{au}$.
Ziemia obiega Słońce po orbicie kołowej ($r_Z = 1{,}0\\,\\text{au}$, $T_Z = 1{,}00\\,\\text{rok}$).

Oblicz $T$ — okres obiegu planetoidy wokół Słońca.`,
      answer: {
        type: 'numeric',
        display: `T \\approx ${T_period}\\,\\text{lat}`,
        description: `Półoś wielka orbity: a = ${a_planet} au. Okres: T ≈ ${T_period} lat.`
      },
      hints: [
        { level: 1, text: `Półoś wielka orbity eliptycznej: $a = \\frac{r_{\\min}+r_{\\max}}{2} = ${a_planet}\\,\\text{au}$.` },
        { level: 2, text: 'III prawo Keplera: $\\frac{T^2}{a^3} = \\text{const}$ dla ciał krążących wokół tego samego centrum.' },
        { level: 3, text: `$T = T_Z\\cdot\\left(\\frac{a}{r_Z}\\right)^{3/2} = ${a_planet}^{3/2}\\,\\text{lat}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Półoś wielka orbity',
          content: `a = \\frac{r_{\\min}+r_{\\max}}{2} = \\frac{${rP_min}+${rP_max}}{2} = ${a_planet}\\,\\text{au}`,
          explanation: 'Półoś wielka to połowa sumy odległości w peryhelium i aphelium.'
        },
        {
          step: 2,
          title: 'III prawo Keplera',
          content: `\\frac{T^2}{a^3} = \\frac{T_Z^2}{r_Z^3} \\implies T = T_Z\\cdot\\left(\\frac{a}{r_Z}\\right)^{3/2} = 1\\cdot${a_planet}^{3/2} \\approx ${T_period}\\,\\text{lat}`,
          explanation: 'Porównujemy z Ziemią jako punktem odniesienia.'
        }
      ]
    };
  }

  // Schemat B: Prędkość w peryhelium i aphelium — zasada zachowania momentu pędu (2025 zad.5, 2026 zad.5)
  function schemeB() {
    const r_min_au = M.choose([0.5, 0.8, 1.0, 1.5, 2.0]);
    const r_max_au = M.choose([10, 15, 18.9, 25, 30, 40]);
    if (r_max_au <= r_min_au) return schemeB();

    const v_max_mps = M.choose([20, 30, 40, 43, 50]);  // km/s przy peryhelium
    // v_max * r_min = v_min * r_max → v_min = v_max * r_min / r_max
    const v_min = Math.round(v_max_mps * r_min_au / r_max_au * 100) / 100;

    return {
      id: M.makeId('fiz04_predkosci_orb'),
      category: 'fiz04',
      categoryName: 'Grawitacja i astronomia',
      type: 'grawitacja_predkosc_orbitalna',
      points: 2,
      params: { r_min_au, r_max_au, v_max_mps, v_min },
      statement: `Planetoida obiega Słońce po orbicie eliptycznej.
Odległości w peryhelium i aphelium: $r_{\\min} = ${r_min_au}\\,\\text{au}$, $r_{\\max} = ${r_max_au}\\,\\text{au}$.
Prędkość w peryhelium: $v_{\\max} = ${v_max_mps}\\,\\text{km/s}$.

Oblicz $v_{\\min}$ — prędkość w aphelium.`,
      answer: {
        type: 'numeric',
        display: `v_{\\min} = ${v_min}\\,\\text{km/s}`,
        description: `Zasada zachowania momentu pędu: v·r = const. v_min ≈ ${v_min} km/s.`
      },
      hints: [
        { level: 1, text: 'W ruchu orbitalnym moment pędu jest zachowany: $L = mvr = \\text{const}$.' },
        { level: 2, text: 'W peryhelium i aphelium prędkość jest prostopadła do promienia wodzącego.' },
        { level: 3, text: `$v_{\\min}\\cdot r_{\\max} = v_{\\max}\\cdot r_{\\min} \\implies v_{\\min} = ${v_max_mps}\\cdot\\frac{${r_min_au}}{${r_max_au}}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Zasada zachowania momentu pędu',
          content: `v_{\\max}\\cdot r_{\\min} = v_{\\min}\\cdot r_{\\max} \\implies v_{\\min} = \\frac{v_{\\max}\\cdot r_{\\min}}{r_{\\max}} = \\frac{${v_max_mps}\\cdot ${r_min_au}}{${r_max_au}} = ${v_min}\\,\\text{km/s}`,
          explanation: 'W punktach zwrotnych orbity prędkość ⊥ promień.'
        }
      ]
    };
  }

  // Schemat C: Punkt Lagrange'a (2024 zad.5 — punkt L1 Ziemia-Księżyc)
  function schemeC() {
    // Masa Ziemi / Masa Księżyca = 81.28
    const ratio = M.choose([81, 81.28, 80, 82]);
    const d_km = M.choose([384400, 380000, 390000]); // odległość Ziemia-Księżyc km

    // Punkt P: M_Z/r_P² = M_K/(d - r_P)²
    // (d - r_P)² / r_P² = M_K/M_Z = 1/ratio
    // (d - r_P)/r_P = 1/sqrt(ratio) → d = r_P*(1 + 1/sqrt(ratio))
    const sqrtR = Math.sqrt(ratio);
    const r_P = Math.round(d_km / (1 + 1 / sqrtR));
    const r_P_au = Math.round(r_P / 1.496e8 * 1000) / 1000; // au approximation not useful

    return {
      id: M.makeId('fiz04_lagrange'),
      category: 'fiz04',
      categoryName: 'Grawitacja i astronomia',
      type: 'grawitacja_punkt_neutralny',
      points: 3,
      params: { ratio, d_km, r_P, sqrtR: Math.round(sqrtR * 100) / 100 },
      statement: `Na odcinku łączącym środek Ziemi ze środkiem Księżyca istnieje punkt $P$,
w którym wypadkowa siła grawitacji (od Ziemi i od Księżyca) działająca na punkt materialny wynosi zero.

Stosunek masy Ziemi do masy Księżyca: $\\frac{M_Z}{M_K} = ${ratio}$.
Odległość Ziemia–Księżyc: $d = ${d_km}\\,\\text{km}$.

Oblicz odległość punktu $P$ od środka Ziemi.`,
      answer: {
        type: 'numeric',
        display: `r_P \\approx ${r_P}\\,\\text{km}`,
        description: `Punkt P leży w odległości ok. ${r_P} km od środka Ziemi.`
      },
      hints: [
        { level: 1, text: 'W punkcie P: siła od Ziemi = siła od Księżyca (co do wartości, przeciwne zwroty).' },
        { level: 2, text: '$\\frac{GM_Z m}{r_P^2} = \\frac{GM_K m}{(d-r_P)^2}$, więc $\\frac{M_Z}{M_K} = \\frac{r_P^2}{(d-r_P)^2}$.' },
        { level: 3, text: `$\\frac{r_P}{d-r_P} = \\sqrt{\\frac{M_Z}{M_K}} = \\sqrt{${ratio}} \\approx ${Math.round(sqrtR * 100) / 100}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Warunek zerowej siły wypadkowej',
          content: `\\frac{M_Z}{r_P^2} = \\frac{M_K}{(d-r_P)^2} \\implies \\frac{r_P}{d-r_P} = \\sqrt{\\frac{M_Z}{M_K}} = \\sqrt{${ratio}} \\approx ${Math.round(sqrtR * 100) / 100}`,
          explanation: 'Siły grawitacyjne muszą być równe co do wartości.'
        },
        {
          step: 2,
          title: 'Wyznaczenie r_P',
          content: `r_P = \\frac{\\sqrt{${ratio}}}{1+\\sqrt{${ratio}}}\\cdot d = \\frac{${Math.round(sqrtR * 100) / 100}}{${Math.round((1 + sqrtR) * 100) / 100}}\\cdot ${d_km} \\approx ${r_P}\\,\\text{km}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat D: Wyznaczanie masy obiektu z ruchu orbitalnego (2023 zad.5 — Sgr A*)
  function schemeD() {
    // Gwiazda S2 wokół Sgr A*: T=16 lat, a=(120+1820)/2 au
    const T_years = M.choose([10, 16, 20, 25]);          // okres obiegu lat
    const r_min_au = M.choose([50, 120, 200, 300]);       // peryhelium au
    const r_max_au = M.choose([1000, 1500, 1820, 2500]);  // aphelium au

    const a_au = (r_min_au + r_max_au) / 2;
    const T_earth = 1.0;
    const a_earth = 1.0;
    const M_sun = 2e30; // kg

    // M_sgr / M_sun = (a³/T²) / (a_earth³/T_earth²) = (a_au)³ / T_years²
    const mass_ratio = Math.round(Math.pow(a_au, 3) / (T_years * T_years));

    return {
      id: M.makeId('fiz04_masa_z_orbity'),
      category: 'fiz04',
      categoryName: 'Grawitacja i astronomia',
      type: 'grawitacja_masa_centralna',
      points: 2,
      params: { T_years, r_min_au, r_max_au, a_au, mass_ratio },
      statement: `Gwiazda obiega masywny obiekt w centrum galaktyki po orbicie eliptycznej.
Dane orbity: peryhelium $r_{\\min} = ${r_min_au}\\,\\text{au}$, aphelium $r_{\\max} = ${r_max_au}\\,\\text{au}$,
okres obiegu $T = ${T_years}\\,\\text{lat}$.

Ziemia obiega Słońce: $r_Z = 1{,}0\\,\\text{au}$, $T_Z = 1{,}0\\,\\text{rok}$.

Oblicz iloraz masy centralnego obiektu $M_X$ do masy Słońca $M_S$.`,
      answer: {
        type: 'numeric',
        display: `\\frac{M_X}{M_S} \\approx ${mass_ratio}`,
        description: `Masa centralnego obiektu ≈ ${mass_ratio} mas Słońca.`
      },
      hints: [
        { level: 1, text: `Półoś wielka: $a = \\frac{r_{\\min}+r_{\\max}}{2} = ${a_au}\\,\\text{au}$.` },
        { level: 2, text: 'Z III prawa Keplera (uogólnionego): $\\frac{M_X}{M_S} = \\frac{a^3/T^2}{a_Z^3/T_Z^2}$.' },
        { level: 3, text: `$\\frac{M_X}{M_S} = \\frac{${a_au}^3}{${T_years}^2} \\approx ${mass_ratio}$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Półoś wielka',
          content: `a = \\frac{${r_min_au}+${r_max_au}}{2} = ${a_au}\\,\\text{au}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Stosunek mas',
          content: `\\frac{M_X}{M_S} = \\frac{a^3/T^2}{a_Z^3/T_Z^2} = \\frac{${a_au}^3}{${T_years}^2} = \\frac{${Math.pow(a_au,3)}}{${T_years*T_years}} \\approx ${mass_ratio}`,
          explanation: 'Dla różnych centrów grawitacji stosunek M/T² · a³ jest stały tylko dla tego samego centrum — porównujemy więc bezpośrednio.'
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC, schemeD])();
  }

  return { generate };
})();
