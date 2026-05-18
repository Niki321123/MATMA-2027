// Kategoria 1: Funkcja wykładnicza w praktyce
// Wzorzec: N(t) = N₀ · kᵗ  lub  T(t) = (T₀ - Tₒₜ) · k⁻ᵗ + Tₒₜ
// Typ zadania: oblicz parametr k, potem wartość w danej chwili
// Punkty: 0-2
window.cat01 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: wzrost populacji N(t) = N₀ · kᵗ ===
  function growthModel(diff) {
    const contexts = [
      { what: 'populacja bakterii', unit: '', verb: 'Liczebność', symbol: 'N' },
      { what: 'liczba komórek', unit: '', verb: 'Liczba komórek', symbol: 'N' },
      { what: 'wartość inwestycji (w tys. zł)', unit: ' tys. zł', verb: 'Wartość', symbol: 'V' },
    ];
    const ctx = M.choose(contexts);

    // N₀ i k takie żeby N(T) / N₀ = kᵗ było ładne
    const T = diff === 'easy' ? M.choose([1, 2]) : M.choose([2, 3, 4]);
    // Dobieramy k jako ładny ułamek: k = (p/q)
    const bases = diff === 'easy'
      ? [{p:5,q:4},{p:3,q:2},{p:2,q:1},{p:4,q:3}]
      : [{p:5,q:4},{p:3,q:2},{p:7,q:4},{p:5,q:3},{p:4,q:3}];
    const base = M.choose(bases);

    // N₀ powinno być ładne, N(T) = N₀ · (p/q)^T też
    // Dobieramy N₀ = q^T · m dla jakiegoś małego m
    const m0_mult = M.choose(diff === 'easy' ? [100,200,500,1000] : [50,100,200,400,800]);
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
      difficulty: diff,
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
  function decayModel(diff) {
    const contexts = [
      { obj: 'gorąca kawa', T0: 80, Tenv: 20, unit: '°C', verb: 'Temperatura' },
      { obj: 'gorąca herbata', T0: 90, Tenv: 20, unit: '°C', verb: 'Temperatura' },
      { obj: 'substancja radioaktywna', T0: null, Tenv: 0, unit: ' g', verb: 'Masa' },
    ];
    const ctx = M.choose(contexts.slice(0, 2)); // tylko ochładzanie

    // T(t) = (T0 - Tenv) · k^(-t) + Tenv
    // Po t1 minutach: T1 znane
    const T0 = ctx.T0, Tenv = ctx.Tenv;
    const t1 = diff === 'easy' ? M.choose([5, 10]) : M.choose([10, 15, 20]);

    // Dobieramy k tak żeby k^(-t1) był ładny
    const fracs = diff === 'easy'
      ? [{p:1,q:2},{p:3,q:4},{p:2,q:3}]
      : [{p:3,q:4},{p:4,q:5},{p:5,q:6},{p:2,q:3}];
    const frac = M.choose(fracs);

    // T(t1) = (T0-Tenv)·(p/q) + Tenv
    const diff_T = T0 - Tenv; // np. 60
    const T1 = diff_T * frac.p / frac.q + Tenv;

    // Pytanie: oblicz temperaturę po t2 minutach
    const t2 = t1 + M.choose(diff === 'easy' ? [5] : [5, 10]);
    // k^(1/t1) = (p/q)^(1/t1) → T(t2) = (T0-Tenv)·(p/q)^(t2/t1) + Tenv
    const ratio = frac.p / frac.q;
    const T2 = diff_T * Math.pow(ratio, t2 / t1) + Tenv;
    const T2_round = Math.round(T2);

    return {
      id: M.makeId('cat01_decay'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'decay_model',
      difficulty: diff,
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
  function substanceDecay(diff) {
    const pcts = diff === 'easy'
      ? [{lose: 50, q: {p:1,q:2}}]
      : [{lose: 25, q:{p:3,q:4}}, {lose: 20, q:{p:4,q:5}}, {lose: 10, q:{p:9,q:10}}];
    const chosen = M.choose(pcts);
    const m0 = M.choose(diff === 'easy' ? [4,8,16,32] : [4,8,10,16,20,25,32]);
    const losePercent = chosen.lose;
    const q = chosen.q;
    // m(t) = m0 · (p/q)^t
    const target = diff === 'easy' ? m0 / 2 : m0 * q.p * q.p / (q.q * q.q); // po 2 dobach
    // Oblicz po ilu dobach < target2
    const threshold = diff === 'easy' ? m0 / 4 : m0 / 8;
    // m0 · (p/q)^t < threshold  → t > log(threshold/m0) / log(p/q)
    const tMin = Math.ceil(Math.log(threshold / m0) / Math.log(q.p / q.q));

    return {
      id: M.makeId('cat01_decay_sub'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'substance_decay',
      difficulty: diff,
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

  function generate(diff = 'medium') {
    const gen = M.choose([growthModel, decayModel, substanceDecay]);
    return gen(diff);
  }

  return { generate, easy: () => generate('easy'), medium: () => generate('medium'), hard: () => generate('hard') };
})();
