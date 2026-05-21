// Generator: Ruch obrotowy (moment bezwładności, toczenie, bloczki)
window.fiz03 = (() => {
  const M = window.MathUtils;

  // Schemat A: Walec toczący się bez poślizgu po poziomej powierzchni (2024 zad.2)
  function schemeA() {
    const mC = M.choose([5, 8, 10, 12, 15, 20]);  // masa walca kg
    const F = M.choose([10, 15, 20, 25, 30, 40]);  // siła pozioma N
    const R = M.choose([0.1, 0.2, 0.3, 0.5]);      // promień m (do opisu)

    // I = 1/2 m R², toczenie bez poślizgu
    // F - f = m*a (translacja)
    // f*R = I*alpha = (1/2 m R²)*(a/R) = 1/2 m R a
    // → f = 1/2 m a
    // F = m*a + 1/2 m*a = 3/2 m*a
    const a = Math.round(2 * F / (3 * mC) * 100) / 100;
    const f_fric = Math.round(F / 3 * 100) / 100;

    // Stosunek energii kinetycznej całkowitej do translacyjnej
    // E_trans = 1/2 m v², E_rot = 1/2 I omega² = 1/2*(1/2 m R²)*(v/R)² = 1/4 m v²
    // E_total = 3/4 m v²
    // E_total / E_trans = (3/4)/(1/2) = 3/2

    return {
      id: M.makeId('fiz03_walec_poziomy'),
      category: 'fiz03',
      categoryName: 'Ruch obrotowy',
      type: 'ruch_obrotowy_walec_poziomy',
      points: 3,
      params: { mC, F, a, f_fric },
      statement: `Jednorodny walec o masie $m = ${mC}\\,\\text{kg}$ i promieniu $R$ toczy się bez poślizgu
po poziomej powierzchni. Przyłożono do niego poziomą siłę $F = ${F}\\,\\text{N}$.
Moment bezwładności walca: $I = \\frac{1}{2}mR^2$.

a) Oblicz iloraz $\\frac{E_k}{E_{\\text{trans}}}$ całkowitej energii kinetycznej do energii kinetycznej ruchu postępowego.
b) Oblicz $a$ — wartość przyspieszenia środka masy walca.`,
      answer: {
        type: 'multipart',
        display: `\\frac{E_k}{E_{\\text{trans}}} = \\frac{3}{2},\\quad a = ${a}\\,\\text{m/s}^2`,
        description: `Iloraz energii = 3/2. Przyspieszenie = ${a} m/s².`
      },
      hints: [
        { level: 1, text: 'Energia kinetyczna walca toczącego się: $E_k = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$. Dla $I = \\frac{1}{2}mR^2$ i $\\omega = v/R$: $E_k = \\frac{3}{4}mv^2$.' },
        { level: 2, text: 'II zasada dynamiki dla translacji: $F - f = ma$. Dla obrotu wokół osi: $fR = I\\alpha = \\frac{1}{2}mRa$.' },
        { level: 3, text: 'Z równania obrotowego: $f = \\frac{1}{2}ma$. Podstaw do translacyjnego i wyznacz $a$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Stosunek energii',
          content: `E_k = \\tfrac{1}{2}mv^2 + \\tfrac{1}{4}mv^2 = \\tfrac{3}{4}mv^2 \\implies \\frac{E_k}{E_{\\text{trans}}} = \\frac{3/4}{1/2} = \\frac{3}{2}`,
          explanation: 'Przy toczeniu bez poślizgu ω = v/R.'
        },
        {
          step: 2,
          title: 'Układ równań',
          content: `F - f = ma \\quad (1) \\qquad fR = \\tfrac{1}{2}mR^2\\cdot\\tfrac{a}{R} \\implies f = \\tfrac{1}{2}ma \\quad (2)`,
          explanation: 'Dwie równania: translacja środka masy i obrót wokół osi.'
        },
        {
          step: 3,
          title: 'Przyspieszenie',
          content: `F = ma + \\tfrac{1}{2}ma = \\tfrac{3}{2}ma \\implies a = \\frac{2F}{3m} = \\frac{2\\cdot${F}}{3\\cdot${mC}} = ${a}\\,\\text{m/s}^2`,
          explanation: 'Podstawiamy (2) do (1).'
        }
      ]
    };
  }

  // Schemat B: Ciarek + walec na sznurku (2023 zad.3)
  function schemeB() {
    const m = M.choose([1, 2, 5, 10]);    // masa walca = masa ciarka kg

    // Walec toczony przez sznurek z ciarka
    // Zasada zachowania energii: m*g*h = 1/2*m*v² + 1/2*(1/2*m*R²)*(v/R)² + 1/2*m*v_ciarek²
    // Dla ciarku poruszającego się z prędkością v_c a walca z v:
    // Przy sznurku owiniętym wokół prta walca: v_ciarek = v + v_obr = v + R*omega = v + v = 2v (względem ziemi)
    // Podejście przez 2. zasadę dynamiki:
    // Na ciarek: mg - T = m*a_c
    // Na walec (translacja): T' - 0 = m*a (siła na oś)
    // Na walec (obrót): T*R = I*alpha = (1/2 m R²)*(a/R) = 1/2 m R a
    // → T = 1/2 m a
    // Więc relacja między a_c i a: a_c = 2a (ponieważ v_c = 2v)
    // mg - T = m * 2a → T = m(g - 2a)
    // T = 1/2 m a → m(g - 2a) = 1/2 m a → g = 2a + 0.5a = 2.5a → a = g/2.5 = 2g/5
    const g = 10;
    const a_walec = Math.round((2 * g / 5) * 100) / 100;  // = 4 m/s²
    const a_ciarek = 2 * a_walec;

    return {
      id: M.makeId('fiz03_ciarek_walec'),
      category: 'fiz03',
      categoryName: 'Ruch obrotowy',
      type: 'ruch_obrotowy_ciarek_walec',
      points: 4,
      params: { m, g, a_walec, a_ciarek },
      statement: `Jednorodny walec o masie $m$ i promieniu $R$ spoczywa na stole i może obracać się wokół nieruchomej osi symetrii.
Do osi przymocowano nierozerwalną linkę przewieszoną przez bloczek — na końcu linki wisi ciężarek o masie $m$.
Moment bezwładności walca: $I = \\frac{1}{2}mR^2$.

Wykaż, że przyspieszenie ciężarka wynosi:
$$a_c = \\frac{4g}{5}$$
Wyprowadź wzór, zapisując odpowiednie równania.`,
      answer: {
        type: 'derivation',
        display: `a_c = \\frac{4g}{5}`,
        description: `Przyspieszenie ciężarka: a_c = 4g/5 ≈ ${Math.round(4*g/5)} m/s², przyspieszenie środka walca: a = 2g/5 ≈ ${a_walec} m/s².`
      },
      hints: [
        { level: 1, text: 'Prędkość ciężarka = prędkość końca linki na bębnie walca. Jeśli ось walca przesuwa się z prędkością $v$, a linka odwija z prędkością $v$, to $v_c = 2v$.' },
        { level: 2, text: 'Zapisz II zasadę dynamiki dla ciężarka ($mg - T = m a_c$) i dla obrotu walca ($T\\cdot R = I\\alpha$).' },
        { level: 3, text: 'Skorzystaj z więzu: $a_c = 2a$ (walec toczący się = translacja + obrót).' }
      ],
      solution: [
        {
          step: 1,
          title: 'Równania ruchu',
          content: `mg - T = m\\cdot a_c \\quad (\\text{ciężarek}) \\qquad T\\cdot R = \\tfrac{1}{2}mR^2\\cdot\\tfrac{a}{R} \\implies T = \\tfrac{1}{2}ma \\quad (\\text{walec})`,
          explanation: 'Dwa oddzielne układy: ciężarek i walec.'
        },
        {
          step: 2,
          title: 'Więz kinematyczny',
          content: `a_c = 2a`,
          explanation: 'Punkt zaczepienia linki na walcu ma prędkość = prędkość środka + prędkość obrotowa.'
        },
        {
          step: 3,
          title: 'Wyznaczenie przyspieszenia',
          content: `mg - \\tfrac{1}{2}m\\cdot\\tfrac{a_c}{2} = m\\cdot a_c \\implies g = a_c + \\tfrac{a_c}{4} = \\tfrac{5a_c}{4} \\implies a_c = \\frac{4g}{5}`,
          explanation: 'Podstawiamy T i więz do równania ciężarka.'
        }
      ]
    };
  }

  // Schemat C: Walec staczający się z równi pochyłej
  function schemeC() {
    const angleDeg = M.choose([30, 37, 45]);
    const alpha2 = M.choose([0.25, 0.4, 0.5]); // współczynnik α (I = α m R²)
    const g = 10;

    const sinA = Math.sin(angleDeg * Math.PI / 180);
    const sinA_nice = Math.round(sinA * 1000) / 1000;

    // a = g*sin(alpha) / (1 + alpha2)
    const a = Math.round(g * sinA / (1 + alpha2) * 100) / 100;

    return {
      id: M.makeId('fiz03_walec_rownia'),
      category: 'fiz03',
      categoryName: 'Ruch obrotowy',
      type: 'ruch_obrotowy_walec_rownia',
      points: 4,
      params: { angleDeg, alpha2, a, sinA_nice },
      statement: `Jednorodny walec o masie $m$ i promieniu $R$ toczy się bez poślizgu
po równi pochyłej o kącie $\\alpha = ${angleDeg}°$.
Moment bezwładności walca: $I = ${alpha2}mR^2$. Przyjmij $g = ${g}\\,\\text{m/s}^2$.

Wyznacz $a$ — wartość przyspieszenia liniowego walca — w zależności od $g$, $\\alpha$ i $\\alpha_2 = ${alpha2}$.`,
      answer: {
        type: 'numeric',
        display: `a = \\frac{g\\sin${angleDeg}°}{1 + ${alpha2}} \\approx ${a}\\,\\text{m/s}^2`,
        description: `Przyspieszenie walca: a = g·sin(α)/(1+α₂) ≈ ${a} m/s².`
      },
      hints: [
        { level: 1, text: 'Translacja: $mg\\sin\\alpha - f = ma$. Obrót: $fR = I\\alpha_\\text{kąt} = \\alpha_2 mR \\cdot a$.' },
        { level: 2, text: 'Z równania obrotu: $f = \\alpha_2 ma$. Podstaw do translacji.' },
        { level: 3, text: '$mg\\sin\\alpha = ma(1 + \\alpha_2) \\implies a = \\frac{g\\sin\\alpha}{1+\\alpha_2}$.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Równania dynamiki',
          content: `mg\\sin${angleDeg}° - f = ma \\qquad fR = ${alpha2}mR^2\\cdot\\frac{a}{R} \\implies f = ${alpha2}ma`,
          explanation: 'Dwa równania: translacja środka masy i obrót wokół osi.'
        },
        {
          step: 2,
          title: 'Przyspieszenie',
          content: `mg\\sin${angleDeg}° = ma(1+${alpha2}) \\implies a = \\frac{g\\sin${angleDeg}°}{1+${alpha2}} = \\frac{${g}\\cdot${sinA_nice}}{${1+alpha2}} \\approx ${a}\\,\\text{m/s}^2`,
          explanation: 'Podstawiamy siłę tarcia do równania translacji.'
        }
      ]
    };
  }

  // Schemat D: Ruch po okręgu w płaszczyźnie pionowej — napięcie nici (2026 zad.2)
  function schemeD() {
    const m = M.choose([0.5, 1, 2, 5]);   // masa kg
    const L = M.choose([0.5, 1, 1.5, 2]); // długość nici m
    const g = 10;
    // Prędkość w najwyższym punkcie musi zapewniać napięty sznurek: v_top²/L - g ≥ 4 (z zapasem)
    const v_top = M.choose([3, 4, 5, 6, 8].filter(v => v * v / L - g >= 4)); // m/s

    // v_bottom² = v_top² + 4gL (zasada zachowania energii, h=2L)
    const v_bot_sq = v_top * v_top + 4 * g * L;
    const v_bot = Math.round(Math.sqrt(v_bot_sq) * 100) / 100;

    // T_top = mv_top²/L - mg (siła dośrodkowa - grawitacja)
    const T_top = Math.round(m * v_top * v_top / L - m * g);
    // T_bot = mv_bot²/L + mg
    const T_bot = Math.round(m * v_bot_sq / L + m * g);

    // Iloraz T_max/T_min = T_bot/T_top
    const ratio = Math.round(T_bot / T_top * 100) / 100;

    return {
      id: M.makeId('fiz03_okrag_pionowy'),
      category: 'fiz03',
      categoryName: 'Ruch obrotowy',
      type: 'ruch_obrotowy_okrag_pionowy',
      points: 4,
      params: { m, L, v_top, v_bot, T_top, T_bot, ratio },
      statement: `Ciało o masie $m = ${m}\\,\\text{kg}$ porusza się po okręgu w płaszczyźnie pionowej
na sznurku o długości $L = ${L}\\,\\text{m}$.
Prędkość ciała w najwyższym punkcie wynosi $v_{\\text{góra}} = ${v_top}\\,\\text{m/s}$.
Przyjmij $g = ${g}\\,\\text{m/s}^2$.

Oblicz iloraz $\\dfrac{T_{\\max}}{T_{\\min}}$ największej do najmniejszej wartości naprężenia sznurka.`,
      answer: {
        type: 'numeric',
        display: `\\frac{T_{\\max}}{T_{\\min}} = \\frac{T_{\\text{dół}}}{T_{\\text{góra}}} = ${ratio}`,
        description: `T_dół = ${T_bot} N, T_góra = ${T_top} N. Iloraz ≈ ${ratio}.`
      },
      hints: [
        { level: 1, text: 'Naprężenie sznurka jest największe na dole, najmniejsze na górze.' },
        { level: 2, text: 'Na górze: $T_{\\text{góra}} + mg = \\frac{mv_{\\text{góra}}^2}{L}$. Na dole: $T_{\\text{dół}} - mg = \\frac{mv_{\\text{dół}}^2}{L}$.' },
        { level: 3, text: `Prędkość na dole ze zasady zach. energii: $v_{\\text{dół}}^2 = v_{\\text{góra}}^2 + 4gL = ${v_bot_sq}\\,\\text{m}^2/\\text{s}^2$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Prędkość na dole (zasada zachowania energii)',
          content: `v_{\\text{dół}}^2 = v_{\\text{góra}}^2 + 4gL = ${v_top}^2 + 4\\cdot${g}\\cdot${L} = ${v_bot_sq}\\,\\text{m}^2/\\text{s}^2`,
          explanation: 'Różnica wysokości między górą a dołem = 2L.'
        },
        {
          step: 2,
          title: 'Naprężenia',
          content: `T_{\\text{góra}} = \\frac{mv_{\\text{góra}}^2}{L} - mg = ${T_top}\\,\\text{N} \\qquad T_{\\text{dół}} = \\frac{mv_{\\text{dół}}^2}{L} + mg = ${T_bot}\\,\\text{N}`,
          explanation: 'Na górze: siła wypadkowa skierowana ku środkowi to T+mg. Na dole: T-mg.'
        },
        {
          step: 3,
          title: 'Iloraz',
          content: `\\frac{T_{\\max}}{T_{\\min}} = \\frac{${T_bot}}{${T_top}} = ${ratio}`,
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
