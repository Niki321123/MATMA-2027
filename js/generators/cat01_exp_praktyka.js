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
    const diff_T = T0 - Tenv;
    const T1 = diff_T * frac.p / frac.q + Tenv;

    // Podpytanie a): oblicz temperaturę po t2 minutach
    const t2 = t1 + M.choose([5, 10, 15]);
    const ratio = frac.p / frac.q;
    const T2 = diff_T * Math.pow(ratio, t2 / t1) + Tenv;
    const T2_round = Math.round(T2);

    // Podpytanie b): po ilu minutach temperatura spadnie poniżej progu?
    // Próg: Tenv + round(diff_T / 4) — ok. 25% różnicy temperatur powyżej otoczenia
    const T_thresh = Tenv + Math.round(diff_T / 4);
    const thresh_rem = T_thresh - Tenv; // pozostała różnica w progu
    const R_c = thresh_rem / diff_T;   // ułamek diff_T
    // T(t) < T_thresh ↔ (p/q)^(t/t1) < R_c
    // t/t1 · log(p/q) < log(R_c),  log(p/q)<0 → nierówność odwraca się:
    // t > t1 · log(R_c) / log(p/q)
    const tExactC = t1 * Math.log(R_c) / Math.log(frac.p / frac.q);
    const tMinC = Math.ceil(tExactC + 1e-9);
    const tExactC_str = tExactC.toFixed(2);
    const frac_latex = M.latexFrac(frac.p, frac.q);
    const R_latex = M.latexFrac(thresh_rem, diff_T);

    // Weryfikacja (dla rozwiązania)
    const T_at_tMinC = diff_T * Math.pow(ratio, tMinC / t1) + Tenv;
    const T_at_tMinC1 = diff_T * Math.pow(ratio, (tMinC - 1) / t1) + Tenv;

    return {
      id: M.makeId('cat01_decay'),
      category: 1,
      categoryName: 'Funkcja wykładnicza w praktyce',
      type: 'decay_model',
      points: 4,
      params: { T0, Tenv, t1, T1: Math.round(T1), t2, T2_round, frac, T_thresh, tMinC },
      statement:
        `W chwili początkowej $(t = 0)$ temperatura ${ctx.obj} wynosi $${T0}~${ctx.unit}$. ` +
        `Temperatura otoczenia jest stała i wynosi $${Tenv}~${ctx.unit}$. ` +
        `Temperatura zmienia się zgodnie z zależnością\n` +
        `$$T(t) = (T_0 - T_{\\text{ot}}) \\cdot k^{-t} + T_{\\text{ot}} \\quad \\text{dla } t \\geq 0$$\n` +
        `gdzie $T_0 = ${T0}$, $T_{\\text{ot}} = ${Tenv}$, $k > 1$ — stała, $t$ — czas w minutach.\n\n` +
        `Po $${t1}$ minutach temperatura wynosi $${Math.round(T1)}~${ctx.unit}$.\n\n` +
        `**a)** Oblicz temperaturę ${ctx.obj} w chwili $t = ${t2}$ (tj. po kolejnych $${t2 - t1}$ minutach). Wynik zaokrąglij do jedności.\n\n` +
        `**b)** Po ilu pełnych minutach temperatura ${ctx.obj} będzie po raz pierwszy niższa niż $${T_thresh}~${ctx.unit}$? Zapisz obliczenia.`,
      answer: {
        type: 'multipart',
        display: `T(${t2}) \\approx ${T2_round}~\\text{${ctx.unit}};\\quad t_{\\min} = ${tMinC}~\\text{min}`,
        description: `a) $T(${t2}) \\approx ${T2_round}~${ctx.unit}$, b) po $${tMinC}$ minutach`
      },
      hints: [
        { level: 1, text: `Z warunku $T(${t1}) = ${Math.round(T1)}$ wyznacz $k^{-${t1}}$: $${diff_T} \\cdot k^{-${t1}} + ${Tenv} = ${Math.round(T1)}$.` },
        { level: 2, text: `a) $k^{-${t1}} = ${frac_latex}$, więc $T(${t2}) = ${diff_T} \\cdot \\left(${frac_latex}\\right)^{${t2}/${t1}} + ${Tenv} \\approx ${T2_round}~\\text{${ctx.unit}}$.` },
        { level: 3, text: `b) Nierówność: $${diff_T} \\cdot \\left(${frac_latex}\\right)^{t/${t1}} < ${thresh_rem}$, czyli $\\left(${frac_latex}\\right)^{t/${t1}} < ${R_latex}$. Logarytmuj — uwaga: $\\log(${frac.p}/${frac.q}) < 0$ odwraca nierówność!` }
      ],
      solution: [
        {
          step: 1, title: 'Wyznaczenie k⁻ᵗ¹',
          content: `${diff_T} \\cdot k^{-${t1}} + ${Tenv} = ${Math.round(T1)} \\implies k^{-${t1}} = \\dfrac{${Math.round(T1) - Tenv}}{${diff_T}} = ${frac_latex}`,
          explanation: 'Podstawiamy t = t₁ do wzoru i wyznaczamy k^(−t₁).'
        },
        {
          step: 2, title: 'a) Obliczenie T(t₂)',
          content: `T(${t2}) = ${diff_T} \\cdot \\left(${frac_latex}\\right)^{\\!${t2}/${t1}} + ${Tenv} \\approx ${T2.toFixed(2)} \\approx \\mathbf{${T2_round}~\\text{${ctx.unit}}}`,
          explanation: `Korzystamy z $k^{-${t2}} = (k^{-${t1}})^{${t2}/${t1}}$.`
        },
        {
          step: 3, title: 'b) Ustawienie nierówności',
          content: `T(t) < ${T_thresh} \\iff ${diff_T} \\cdot \\left(${frac_latex}\\right)^{t/${t1}} < ${thresh_rem} \\iff \\left(${frac_latex}\\right)^{t/${t1}} < ${R_latex}`,
          explanation: `Szukamy najmniejszego całkowitego $t$ spełniającego nierówność.`
        },
        {
          step: 4, title: 'Logarytmowanie (uwaga na kierunek!)',
          content: `\\frac{t}{${t1}} \\cdot \\log\\!\\left(${frac_latex}\\right) < \\log\\!\\left(${R_latex}\\right)\\\\ \\log\\!\\left(${frac_latex}\\right) < 0 \\implies \\text{nierówność odwraca się:}\\\\ \\frac{t}{${t1}} > \\frac{\\log(${thresh_rem}/${diff_T})}{\\log(${frac.p}/${frac.q})} \\approx \\frac{${(Math.log(R_c)).toFixed(4)}}{${(Math.log(frac.p/frac.q)).toFixed(4)}} \\approx \\frac{${tExactC_str}}{${t1}} \\cdot ${t1}`,
          explanation: 'Kluczowa pułapka: dzielenie przez liczbę ujemną ODWRACA kierunek nierówności!'
        },
        {
          step: 5, title: 'Odpowiedź',
          content: `t > ${tExactC_str} \\implies \\mathbf{t_{\\min} = ${tMinC}}`,
          explanation: `Weryfikacja: $T(${tMinC}) \\approx ${T_at_tMinC.toFixed(1)}~\\text{${ctx.unit}} < ${T_thresh}~\\checkmark$,\\quad $T(${tMinC-1}) \\approx ${T_at_tMinC1.toFixed(1)}~\\text{${ctx.unit}} \\geq ${T_thresh}~\\checkmark$`
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
    // Próg: losuj spośród m0/4, m0/8, m0/16 — trudniejszy próg wymaga więcej kroków logarytmu
    const thresholdOptions = [m0/4, m0/8, m0/16].filter(v => v > 0 && Number.isInteger(v));
    const threshold = M.choose(thresholdOptions.length > 0 ? thresholdOptions : [m0/8]);
    // m0 · (p/q)^t < threshold  → t > log(threshold/m0) / log(p/q)
    const tMin = Math.ceil(Math.log(threshold / m0) / Math.log(q.p / q.q));
    const tExact = (Math.log(threshold / m0) / Math.log(q.p / q.q)).toFixed(3);

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
          step: 3, title: 'Rozwiązanie nierówności logarytmicznej',
          content: `t \\cdot \\log\\!\\left(${M.latexFrac(q.p, q.q)}\\right) < \\log\\!\\left(${M.latexFrac(threshold, m0)}\\right)\\\\ \\log\\!\\left(${M.latexFrac(q.p, q.q)}\\right) < 0 \\implies \\text{odwróć nierówność przy dzieleniu:}\\\\ t > \\frac{\\log(${threshold}/${m0})}{\\log(${q.p}/${q.q})} \\approx ${tExact}`,
          explanation: 'Kluczowa pułapka: dzielenie przez liczbę ujemną ODWRACA kierunek nierówności!'
        },
        {
          step: 4, title: 'Odpowiedź',
          content: `t > ${tExact}\\ldots \\implies \\mathbf{t_{\\min} = ${tMin}}`,
          explanation: `Weryfikacja: $m(${tMin}) = ${m0}\\cdot\\left(${M.latexFrac(q.p,q.q)}\\right)^{${tMin}} \\approx ${(m0*Math.pow(q.p/q.q,tMin)).toFixed(2)} < ${threshold}\\checkmark$`
        }
      ]
    };
  }

  function generate() {
    // growthModel usunięty — 1 krok, poziom zamkniętego
    // substanceDecay (2 pkt A+B) i decayModel (złożone k⁻ᵗ) — poziom 7-8/10
    return M.choose([decayModel, substanceDecay, substanceDecay])();
  }

  return { generate };
})();
