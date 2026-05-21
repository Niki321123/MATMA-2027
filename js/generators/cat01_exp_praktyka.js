// Kategoria 1: Funkcja wykładnicza w praktyce
// Wzorzec: N(t) = N₀ · kᵗ  lub  T(t) = (T₀ - Tₒₜ) · k⁻ᵗ + Tₒₜ
// Typ zadania: oblicz parametr k, potem wartość w danej chwili
// Punkty: 0-2
window.cat01 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: wzrost populacji N(t) = N₀ · kᵗ ===
  function growthModel() {
    const contexts = [
      { what: 'populacja bakterii', unit: '', verb: 'Liczebność', symbol: 'N' },
      { what: 'liczba komórek', unit: '', verb: 'Liczba komórek', symbol: 'N' },
      { what: 'wartość inwestycji (w tys. zł)', unit: ' tys. zł', verb: 'Wartość', symbol: 'V' },
      { what: 'masa próbki', unit: ' mg', verb: 'Masa', symbol: 'M' },
    ];
    const ctx = M.choose(contexts);

    const T = M.choose([2, 3, 4, 5]);
    const bases = [{p:5,q:4},{p:3,q:2},{p:7,q:4},{p:5,q:3},{p:4,q:3},{p:6,q:5}];
    const base = M.choose(bases);

    const m0_mult = M.choose([50,100,200,400,800,1000]);
    const N0 = Math.pow(base.q, T) * m0_mult;
    const NT = Math.pow(base.p, T) * m0_mult;

    const kDecimal = (base.p / base.q).toFixed(4);
    // Procent wzrostu = (k - 1) * 100
    const growthPct = ((base.p / base.q - 1) * 100).toFixed(0);

    // Pytanie: oblicz o ile procent wzrasta w ciągu godziny
    return {
      id: M.makeId('cat01_growth'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'growth_model',
      points: 2,
      params: { N0, NT, T, base, growthPct },
      statement:
        `W chwili rozpoczęcia obserwacji ($t = 0$) ${ctx.what} wynosiła $${N0.toLocaleString('pl-PL')}${ctx.unit}$. ` +
        `Po ${T === 1 ? 'jednej godzinie' : T + ' godzinach'} wynosiła $${NT.toLocaleString('pl-PL')}${ctx.unit}$.\n\n` +
        `${ctx.verb} zmienia się zgodnie z zależnością\n` +
        `$$${ctx.symbol}(t) = ${ctx.symbol}_0 \\cdot k^t \\quad \\text{dla } t \\geq 0$$\n` +
        `gdzie $${ctx.symbol}_0$ to wartość w chwili $t = 0$, $k$ — stała dodatnia, $t$ — czas w godzinach.\n\n` +
        `**Oblicz, o ile procent wzrastała ${ctx.verb.toLowerCase()} w ciągu każdej godziny.** Zapisz obliczenia.`,
      answer: {
        type: 'number',
        value: growthPct,
        display: `${growthPct}\\%`,
        description: `Wzrost o $${growthPct}\\%$ na godzinę`
      },
      hints: [
        { level: 1, text: `Podstaw do wzoru: $${ctx.symbol}(${T}) = ${ctx.symbol}_0 \\cdot k^{${T}}$, czyli $${NT} = ${N0} \\cdot k^{${T}}$.` },
        { level: 2, text: `Oblicz $k^{${T}} = \\frac{${NT}}{${N0}} = ${M.latexFrac(NT, N0)}$, stąd $k = \\sqrt[${T}]{${M.latexFrac(NT, N0)}}$.` },
        { level: 3, text: `Otrzymujesz $k = \\frac{${base.p}}{${base.q}}$. Wzrost procentowy: $(k-1)\\cdot 100\\% = \\left(\\frac{${base.p}}{${base.q}} - 1\\right) \\cdot 100\\% = \\frac{${base.p - base.q}}{${base.q}} \\cdot 100\\% = ${growthPct}\\%$.` }
      ],
      solution: [
        {
          step: 1, title: 'Podstawienie do wzoru',
          content: `$${ctx.symbol}(${T}) = ${ctx.symbol}_0 \\cdot k^{${T}}$, więc $${NT.toLocaleString('pl-PL')} = ${N0.toLocaleString('pl-PL')} \\cdot k^{${T}}$`,
          explanation: 'Podstawiamy znane wartości do wzoru wykładniczego.'
        },
        {
          step: 2, title: 'Wyznaczenie k',
          content: `$k^{${T}} = \\dfrac{${NT.toLocaleString('pl-PL')}}{${N0.toLocaleString('pl-PL')}} = ${M.latexFrac(NT, N0)} \\implies k = \\sqrt[${T}]{${M.latexFrac(NT, N0)}} = \\dfrac{${base.p}}{${base.q}}$`,
          explanation: `Pierwiastek ${T}-go stopnia z ułamka $\\frac{${base.p}^{${T}}}{${base.q}^{${T}}}$.`
        },
        {
          step: 3, title: 'Obliczenie procentu wzrostu',
          content: `$k = \\dfrac{${base.p}}{${base.q}} \\approx ${kDecimal}$, wzrost: $(k - 1) \\cdot 100\\% = \\dfrac{${base.p - base.q}}{${base.q}} \\cdot 100\\% = \\mathbf{${growthPct}\\%}$`,
          explanation: 'Wzrost procentowy to (k − 1) · 100%.'
        }
      ]
    };
  }

  // === SCHEMAT B: ochładzanie / zanik T(t) = T₀ · k^(-t) + Tenv ===
  function decayModel() {
    const contexts = [
      { obj: 'gorąca kawa', T0: 80, Tenv: 20, unit: '°C', verb: 'Temperatura' },
      { obj: 'gorąca herbata', T0: 90, Tenv: 20, unit: '°C', verb: 'Temperatura' },
      { obj: 'zupa', T0: 95, Tenv: 22, unit: '°C', verb: 'Temperatura' },
    ];
    const ctx = M.choose(contexts);

    const T0 = ctx.T0, Tenv = ctx.Tenv;
    const t1 = M.choose([10, 15, 20, 30]);

    const fracs = [{p:3,q:4},{p:4,q:5},{p:5,q:6},{p:2,q:3},{p:7,q:8}];
    const frac = M.choose(fracs);

    // T(t1) = (T0-Tenv)·(p/q) + Tenv
    const diff_T = T0 - Tenv; // np. 60
    const T1 = diff_T * frac.p / frac.q + Tenv;

    // Pytanie: oblicz temperaturę po t2 minutach
    const t2 = t1 + M.choose([5, 10, 15]);
    // k^(1/t1) = (p/q)^(1/t1) → T(t2) = (T0-Tenv)·(p/q)^(t2/t1) + Tenv
    const ratio = frac.p / frac.q;
    const T2 = diff_T * Math.pow(ratio, t2 / t1) + Tenv;
    const T2_round = Math.round(T2);

    return {
      id: M.makeId('cat01_decay'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'decay_model',
      points: 2,
      params: { T0, Tenv, t1, T1: Math.round(T1), t2, T2_round, frac },
      statement:
        `W chwili początkowej $(t = 0)$ temperatura ${ctx.obj} wynosi $${T0}~${ctx.unit}$. ` +
        `Temperatura otoczenia jest stała i wynosi $${Tenv}~${ctx.unit}$. ` +
        `Temperatura zmienia się zgodnie z zależnością\n` +
        `$$T(t) = (T_0 - T_{\\text{ot}}) \\cdot k^{-t} + T_{\\text{ot}} \\quad \\text{dla } t \\geq 0$$\n` +
        `gdzie $T_0 = ${T0}$, $T_{\\text{ot}} = ${Tenv}$, $k > 1$ — stała, $t$ — czas w minutach.\n\n` +
        `Po $${t1}$ minutach temperatura wynosi $${Math.round(T1)}~${ctx.unit}$.\n\n` +
        `**Oblicz temperaturę ${ctx.obj} po następnych $${t2 - t1}$ minutach** (tj. w chwili $t = ${t2}$). Wynik podaj w ${ctx.unit}, z zaokrągleniem do jedności.`,
      answer: {
        type: 'number',
        value: T2_round,
        display: `T(${t2}) \\approx ${T2_round}~\\text{${ctx.unit}}`,
        description: `$T(${t2}) \\approx ${T2_round}~${ctx.unit}$`
      },
      hints: [
        { level: 1, text: `Z warunku $T(${t1}) = ${Math.round(T1)}$ wyznacz $k^{-${t1}}$: $${Math.round(T1)} = ${diff_T} \\cdot k^{-${t1}} + ${Tenv}$.` },
        { level: 2, text: `Otrzymujesz $k^{-${t1}} = \\frac{${Math.round(T1) - Tenv}}{${diff_T}} = ${M.latexFrac(Math.round(T1) - Tenv, diff_T)}$.` },
        { level: 3, text: `Oblicz $T(${t2}) = ${diff_T} \\cdot k^{-${t2}} + ${Tenv} = ${diff_T} \\cdot \\left(${M.latexFrac(frac.p, frac.q)}\\right)^{${t2}/${t1}} + ${Tenv} \\approx ${T2_round}~${ctx.unit}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Wyznaczenie k⁻ᵗ¹',
          content: `$T(${t1}) = ${Math.round(T1)} \\implies ${diff_T} \\cdot k^{-${t1}} + ${Tenv} = ${Math.round(T1)} \\implies k^{-${t1}} = \\dfrac{${Math.round(T1) - Tenv}}{${diff_T}} = ${M.latexFrac(frac.p, frac.q)}$`,
          explanation: 'Podstawiamy t = t₁ do wzoru i wyznaczamy k^(−t₁).'
        },
        {
          step: 2, title: 'Obliczenie T(t₂)',
          content: `$T(${t2}) = ${diff_T} \\cdot \\left(${M.latexFrac(frac.p, frac.q)}\\right)^{${t2}/${t1}} + ${Tenv} = ${diff_T} \\cdot \\left(${M.latexFrac(frac.p, frac.q)}\\right)^{${t2 / t1}} + ${Tenv} \\approx ${T2.toFixed(2)} \\approx \\mathbf{${T2_round}~\\text{${ctx.unit}}}$`,
          explanation: `Korzystamy z $k^{-${t2}} = (k^{-${t1}})^{${t2}/${t1}}$.`
        }
      ]
    };
  }

  // === SCHEMAT C: rozpad substancji m(t) = m₀ · q^t ===
  function substanceDecay() {
    const pcts = [{lose: 25, q:{p:3,q:4}}, {lose: 20, q:{p:4,q:5}}, {lose: 10, q:{p:9,q:10}}, {lose: 30, q:{p:7,q:10}}];
    const chosen = M.choose(pcts);
    const m0 = M.choose([4,8,10,16,20,25,32,50]);
    const losePercent = chosen.lose;
    const q = chosen.q;
    const target = m0 * q.p * q.p / (q.q * q.q);
    const threshold = m0 / 8;
    // m0 · (p/q)^t < threshold  → t > log(threshold/m0) / log(p/q)
    const tMin = Math.ceil(Math.log(threshold / m0) / Math.log(q.p / q.q));

    return {
      id: M.makeId('cat01_decay_sub'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'substance_decay',
      points: 2,
      params: { m0, losePercent, q, threshold, tMin },
      statement:
        `W chwili początkowej $(t = 0)$ masa substancji wynosi $${m0}$ gramów. ` +
        `Po każdej kolejnej dobie ubywa $${losePercent}\\%$ masy, jaka była na początku tej doby. ` +
        `Dla każdej liczby całkowitej $t \\geq 0$ funkcja $m(t)$ określa masę w gramach po $t$ pełnych dobach.\n\n` +
        `**a)** Wyznacz wzór funkcji $m(t)$.\n\n` +
        `**b)** Oblicz, po ilu pełnych dobach masa substancji będzie po raz pierwszy mniejsza od $${threshold}$ grama. Zapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `m(t) = ${m0} \\cdot \\left(${M.latexFrac(q.p, q.q)}\\right)^t; \\quad t > ${tMin - 1} \\implies t_{\\min} = ${tMin}`,
        description: `a) $m(t) = ${m0} \\cdot \\left(\\frac{${q.p}}{${q.q}}\\right)^t$, b) po $${tMin}$ dobach`
      },
      hints: [
        { level: 1, text: `Utrata $${losePercent}\\%$ oznacza, że pozostaje $${100 - losePercent}\\%$ masy, czyli $m(t+1) = ${M.latexFrac(q.p * (100 - losePercent) / 100 === q.p / q.q ? q.p : (100 - losePercent), 100)} \\cdot m(t)$.` },
        { level: 2, text: `Wzór: $m(t) = ${m0} \\cdot \\left(\\frac{${100 - losePercent}}{100}\\right)^t = ${m0} \\cdot \\left(${M.latexFrac(q.p, q.q)}\\right)^t$.` },
        { level: 3, text: `Nierówność: $${m0} \\cdot \\left(${M.latexFrac(q.p, q.q)}\\right)^t < ${threshold}$. Logarytmuj obie strony. Pamiętaj, że $\\log\\left(${M.latexFrac(q.p, q.q)}\\right) < 0$, więc nierówność zmienia zwrot.` }
      ],
      solution: [
        {
          step: 1, title: 'Wzór funkcji',
          content: `Każda doba mnoży masę przez $(1 - ${losePercent}\\%) = ${M.latexFrac(q.p, q.q)}$, więc $m(t) = ${m0} \\cdot \\left(${M.latexFrac(q.p, q.q)}\\right)^t$`,
          explanation: 'Geometryczny zanik: iloraz q = 1 − strata procentowa.'
        },
        {
          step: 2, title: 'Nierówność',
          content: `$${m0} \\cdot \\left(${M.latexFrac(q.p, q.q)}\\right)^t < ${threshold} \\implies \\left(${M.latexFrac(q.p, q.q)}\\right)^t < ${M.latexFrac(threshold, m0)}$`,
          explanation: 'Szukamy najmniejszego całkowitego t spełniającego nierówność.'
        },
        {
          step: 3, title: 'Rozwiązanie nierówności',
          content: `Logarytmując: $t \\cdot \\log\\left(${M.latexFrac(q.p, q.q)}\\right) < \\log\\left(${M.latexFrac(threshold, m0)}\\right)$. Po podzieleniu przez liczbę ujemną i odwróceniu nierówności: $t > ${(tMin - 1).toFixed(2)}\\ldots$, więc $\\mathbf{t_{\\min} = ${tMin}}$.`,
          explanation: 'Pamiętaj: dzielenie przez liczbę ujemną odwraca nierówność!'
        }
      ]
    };
  }

  // === SCHEMAT D: równanie wykładnicze przez podstawienie (t = a^x) ===
  // Wzorzec maturalny 8/10: a^(2x) − k·a^x + m = 0, zamiana na kwadratowe
  function expEquationSubst() {
    const templates = [
      {
        eq: '4^x - 5 \\cdot 2^x + 4 = 0',
        base: '2', squareBase: '4',
        sqEq: 't^2 - 5t + 4 = 0',
        factored: '(t - 1)(t - 4) = 0',
        t_vals: [1, 4], x_vals: [0, 2],
        x_display: 'x = 0 \\text{ lub } x = 2'
      },
      {
        eq: '9^x - 4 \\cdot 3^x + 3 = 0',
        base: '3', squareBase: '9',
        sqEq: 't^2 - 4t + 3 = 0',
        factored: '(t - 1)(t - 3) = 0',
        t_vals: [1, 3], x_vals: [0, 1],
        x_display: 'x = 0 \\text{ lub } x = 1'
      },
      {
        eq: '4^x - 10 \\cdot 2^x + 16 = 0',
        base: '2', squareBase: '4',
        sqEq: 't^2 - 10t + 16 = 0',
        factored: '(t - 2)(t - 8) = 0',
        t_vals: [2, 8], x_vals: [1, 3],
        x_display: 'x = 1 \\text{ lub } x = 3'
      },
      {
        eq: '25^x - 6 \\cdot 5^x + 5 = 0',
        base: '5', squareBase: '25',
        sqEq: 't^2 - 6t + 5 = 0',
        factored: '(t - 1)(t - 5) = 0',
        t_vals: [1, 5], x_vals: [0, 1],
        x_display: 'x = 0 \\text{ lub } x = 1'
      },
      {
        eq: '9^x - 12 \\cdot 3^x + 27 = 0',
        base: '3', squareBase: '9',
        sqEq: 't^2 - 12t + 27 = 0',
        factored: '(t - 3)(t - 9) = 0',
        t_vals: [3, 9], x_vals: [1, 2],
        x_display: 'x = 1 \\text{ lub } x = 2'
      },
      {
        eq: '4^x - 20 \\cdot 2^x + 64 = 0',
        base: '2', squareBase: '4',
        sqEq: 't^2 - 20t + 64 = 0',
        factored: '(t - 4)(t - 16) = 0',
        t_vals: [4, 16], x_vals: [2, 4],
        x_display: 'x = 2 \\text{ lub } x = 4'
      },
    ];

    const tpl = M.choose(templates);

    return {
      id: M.makeId('cat01_eq_subst'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'exp_equation_subst',
      points: 4,
      params: tpl,
      statement:
        `Rozwiąż równanie\n$$${tpl.eq}$$\nZapisz obliczenia.`,
      answer: {
        type: 'set',
        value: tpl.x_vals,
        display: tpl.x_display,
        description: `$${tpl.x_display}$`
      },
      hints: [
        { level: 1, text: `Podstaw $t = ${tpl.base}^x$ (gdzie $t > 0$). Zauważ, że $${tpl.squareBase}^x = (${tpl.base}^x)^2 = t^2$.` },
        { level: 2, text: `Otrzymujesz równanie kwadratowe: $${tpl.sqEq}$. Rozłóż na czynniki: $${tpl.factored}$.` },
        { level: 3, text: `Z $t = ${tpl.t_vals[0]}$ i $t = ${tpl.t_vals[1]}$ dostajesz $${tpl.base}^x = ${tpl.t_vals[0]}$ i $${tpl.base}^x = ${tpl.t_vals[1]}$. Stąd $${tpl.x_display}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Podstawienie $t = ' + tpl.base + '^x$',
          content: `\\text{Niech } t = ${tpl.base}^x,\\; t > 0.\\quad ${tpl.squareBase}^x = (${tpl.base}^2)^x = (${tpl.base}^x)^2 = t^2`,
          explanation: 'Redukcja do równania kwadratowego.'
        },
        {
          step: 2, title: 'Równanie kwadratowe',
          content: `${tpl.sqEq}`,
          explanation: ''
        },
        {
          step: 3, title: 'Rozkład na czynniki',
          content: `${tpl.factored} \\implies t = ${tpl.t_vals[0]} \\text{ lub } t = ${tpl.t_vals[1]}`,
          explanation: 'Oba rozwiązania dodatnie ($t > 0$) — oba dopuszczalne.'
        },
        {
          step: 4, title: 'Powrót do $x$',
          content: `${tpl.base}^x = ${tpl.t_vals[0]} \\implies x = \\log_{${tpl.base}} ${tpl.t_vals[0]} = ${tpl.x_vals[0]}\\\\ ${tpl.base}^x = ${tpl.t_vals[1]} \\implies x = \\log_{${tpl.base}} ${tpl.t_vals[1]} = ${tpl.x_vals[1]}`,
          explanation: ''
        }
      ]
    };
  }

  // === SCHEMAT E: dwie populacje — kiedy pierwsza prześciga drugą? ===
  // Wzorzec maturalny 8/10: N₁(t) = A·k₁^t, N₂(t) = B·k₂^t, kiedy N₁ > N₂?
  // Wymaga: zalogowania obu stron, obsługi log < 0 lub log > 0
  function twoModelsComparison() {
    const templates = [
      // N1 = 100·3^t, N2 = 900·(3/2)^t; N1 = N2 → 100·3^t = 900·(3/2)^t
      // (3/(3/2))^t = 900/100 → 2^t = 9 → t = log₂9 ≈ 3.17 → t_min = 4
      {
        N1_0: 100, k1_str: '3', k1: 3,
        N2_0: 900, k2_str: '\\dfrac{3}{2}', k2: 1.5,
        ratio_str: '2^t = 9', t_exact: 'log_2 9 \\approx 3{,}17',
        t_min: 4, unit: 'roku',
        context: 'Firma A produkuje $100 \\cdot 3^t$ jednostek po $t$ latach, firma B produkuje $900 \\cdot \\left(\\frac{3}{2}\\right)^t$ jednostek.'
      },
      // N1 = 200·2^t, N2 = 1600·(4/3)^t; N1=N2 → 2^t/(4/3)^t = 8 → (3/2)^t = 8 → t·log(3/2) = log8
      // t = log8/log(3/2) ≈ 5.13 → t_min = 6
      {
        N1_0: 200, k1_str: '2', k1: 2,
        N2_0: 1600, k2_str: '\\dfrac{4}{3}', k2: 4/3,
        ratio_str: '\\left(\\dfrac{3}{2}\\right)^t = 8', t_exact: '\\dfrac{\\log 8}{\\log \\frac{3}{2}} \\approx 5{,}13',
        t_min: 6, unit: 'roku',
        context: 'Kolonia X liczy $200 \\cdot 2^t$ bakterii, kolonia Y liczy $1600 \\cdot \\left(\\frac{4}{3}\\right)^t$ bakterii po $t$ godzinach.'
      },
      // N1 = 500·4^t, N2 = 4000·2^t; N1=N2 → 500·4^t = 4000·2^t → 2^t = 8 → t=3
      {
        N1_0: 500, k1_str: '4', k1: 4,
        N2_0: 4000, k2_str: '2', k2: 2,
        ratio_str: '2^t = 8 = 2^3', t_exact: 't = 3',
        t_min: 3, unit: 'godziny', exact: true,
        context: 'Populacja A: $500 \\cdot 4^t$ osobników, populacja B: $4000 \\cdot 2^t$ osobników po $t$ godzinach.'
      },
    ];

    const tpl = M.choose(templates);
    const isExact = !!tpl.exact;

    return {
      id: M.makeId('cat01_two_models'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'two_models_comparison',
      points: 4,
      params: tpl,
      statement:
        `${tpl.context}\n\n` +
        `**a)** Dla jakiej wartości $t$ obie wielkości są równe? Zapisz obliczenia.\n\n` +
        `**b)** Od której ${tpl.unit} (pełna ${tpl.unit}) wielkość populacji A po raz pierwszy przekroczy populację B?`,
      answer: {
        type: 'multipart',
        display: `t = ${tpl.t_exact},\\quad t_{\\min} = ${tpl.t_min}`,
        description: `Równość przy $${tpl.t_exact}$; po raz pierwszy pełna ${tpl.unit}: $t = ${tpl.t_min}$`
      },
      hints: [
        { level: 1, text: `Przyrównaj wzory: $${tpl.N1_0} \\cdot ${tpl.k1_str}^t = ${tpl.N2_0} \\cdot ${tpl.k2_str}^t$. Podziel obie strony przez ${tpl.N2_0} i przez $${tpl.k2_str}^t$.` },
        { level: 2, text: `Uprość lewą stronę do postaci potęgi jednej podstawy: $${tpl.ratio_str}$.` },
        { level: 3, text: `Stąd $${tpl.t_exact}$. Pełna ${tpl.unit}: $t_{\\min} = ${tpl.t_min}$.` }
      ],
      solution: [
        {
          step: 1, title: 'Równanie N₁ = N₂',
          content: `${tpl.N1_0} \\cdot ${tpl.k1_str}^t = ${tpl.N2_0} \\cdot ${tpl.k2_str}^t`,
          explanation: ''
        },
        {
          step: 2, title: 'Przekształcenie',
          content: `\\frac{${tpl.k1_str}^t}{${tpl.k2_str}^t} = \\frac{${tpl.N2_0}}{${tpl.N1_0}} \\implies ${tpl.ratio_str}`,
          explanation: `$\\left(\\frac{k_1}{k_2}\\right)^t = \\frac{N_{2,0}}{N_{1,0}}$`
        },
        {
          step: 3, title: isExact ? 'Dokładne rozwiązanie' : 'Rozwiązanie logarytmiczne',
          content: `t = ${tpl.t_exact}`,
          explanation: isExact ? '' : 'Logarytmujemy obie strony i korzystamy z własności logarytmów.'
        },
        {
          step: 4, title: 'Pierwsza pełna ' + tpl.unit,
          content: `t_{\\min} = ${tpl.t_min} \\text{ (pierwsze całkowite } t \\text{ spełniające nierówność)}`,
          explanation: `Dla $t \\geq ${tpl.t_min}$ populacja A przewyższa B.`
        }
      ]
    };
  }

  function generate() {
    // expEquationSubst (8/10) i twoModelsComparison (8/10) — nowe schematy maturalne
    // substanceDecay (6/10) pozostawiony dla różnorodności
    return M.choose([expEquationSubst, twoModelsComparison, expEquationSubst, twoModelsComparison, substanceDecay])();
  }

  return { generate };
})();
