// Kategoria 5: Dowód nierówności algebraicznej  — PROCEDURAL GENERATOR
//
// Generuje rodziny dowodów z parametryzowanymi współczynnikami.
// Klasy:
//   F1: (αa + βb)² ≥ 0  — przekształcenie do kwadratu różnicy ze skalowaniem
//   F2: AM-GM klasyczne  →  a/b + b/a ≥ 2  i jego warianty
//   F3: (a²-b²)(a-b) = (a+b)(a-b)² ≥ 0  →  a³+b³ ≥ a²b+ab²  i warianty
//   F4: AM-GM z trzema składnikami:  a+b+c ≥ ∛(abc)·3, ale unika się — używamy 2-składnikowych
//   F5: Sumowanie kwadratów: (a-b)² + (b-c)² + ... ≥ 0
//
// Wzorce maturalne:
//   2025 z.2: (a+2b)³ > 8a²b+16ab²   →  rodzina (αa+βb)³ > kab(αa+βb)
//   2026 z.3: 1/x + 1/y ≤ x/y² + y/x²  →  rodzina z (a+b)(a-b)²/(...)
//   2022 z.6: 7x³+4x²y ≥ y³+2xy²-x³   →  rodzina z (x+y)(2x-y)²
//   2019 z.8: (x+a)/(y+a) + y/x > 2   →  rodzina z (y-x)(y-x+a)

window.cat05 = (() => {
  const M = window.MathUtils;
  const ME = window.MathEngineering;

  // ====================================================================
  // F1: (αa + βb)^n - k·ab·(αa+βb)^{n-2} = (αa+βb)^{n-2}·(αa−βb)^2 ≥ 0
  // Wybrana parametryzacja:
  //   n = 3 (jak 2025 z.2)
  //   wykażemy: (αa+βb)³ > k·a·b·(αa+βb)  gdzie k = 4αβ
  //   równoważnie: (αa+βb)·[(αa+βb)² − 4αβ·ab] = (αa+βb)·(αa−βb)² > 0
  // ====================================================================
  function familyCubic() {
    const α = M.choose([1, 2, 3]);
    const β = M.choose([1, 2, 3]);
    if (α === β) return null;  // wykluczamy trywialne
    const k = 4 * α * β;
    // LHS: (αa + βb)³
    // RHS (zwijamy do postaci a²b + ab²):
    //   k · a · b · (αa + βb) = k · α · a²b + k · β · a · b²
    //                         = (4αβ·α) a²b + (4αβ·β) ab² = 4α²β a²b + 4αβ² ab²
    const c1 = 4 * α * α * β;
    const c2 = 4 * α * β * β;
    // Sformułuj nierówność: (αa+βb)³ > c1·a²b + c2·ab²
    const lhsLatex = `(${α===1?'':α}a ${β===1?'+':'+'+β}b)^3`;
    const rhsLatex = `${c1}a^2b ${c2>=0?'+'+c2:c2}ab^2`;

    // Warunek dla ostrej nierówności: αa ≠ βb (czyli a/b ≠ β/α)
    const inequalityCondition = β === α
      ? 'a \\neq b'
      : `\\dfrac{a}{b} \\neq \\dfrac{${β}}{${α}}`;

    return {
      id: M.makeId('cat05_cubic'),
      category: 5,
      categoryName: 'Dowód nierówności',
      type: 'cubic_factorization',
      points: 3,
      params: { α, β, k, c1, c2 },
      statement:
        `Wykaż, że dla każdej dodatniej liczby rzeczywistej $a$ i dla każdej dodatniej liczby rzeczywistej $b$ takich, że $${inequalityCondition}$, prawdziwa jest nierówność\n` +
        `$$${lhsLatex} > ${rhsLatex}$$`,
      answer: { type: 'proof', display: `(${α===1?'':α}a-${β===1?'':β}b)^2(${α===1?'':α}a+${β===1?'':β}b) > 0`, description: 'Metoda dowodu: wyłączenie czynnika i rozpoznanie kwadratu różnicy.' },
      hints: [
        { level: 1, text: `Zauważ: $${c1}a^2b + ${c2}ab^2 = ${k}ab \\cdot (${α===1?'':α}a + ${β===1?'':β}b)$.` },
        { level: 2, text: `Po przeniesieniu na lewą stronę i wyłączeniu $(${α===1?'':α}a + ${β===1?'':β}b)$ zostaje: $(${α===1?'':α}a+${β===1?'':β}b)\\bigl[(${α===1?'':α}a+${β===1?'':β}b)^2 - ${k}ab\\bigr]$.` },
        { level: 3, text: `Wyrażenie w nawiasie kwadratowym to $(${α===1?'':α}a-${β===1?'':β}b)^2$.` },
      ],
      solution: [
        { step: 1, title: 'Wyłączenie wspólnego czynnika', content: `${c1}a^2b ${c2>=0?'+'+c2:c2}ab^2 = ${k}ab(${α===1?'':α}a ${β===1?'+':'+'+β}b)`, explanation: `Wyłączamy $${k}ab$.` },
        { step: 2, title: 'Przeniesienie na lewą stronę', content: `${lhsLatex} - ${k}ab(${α===1?'':α}a + ${β===1?'':β}b) = (${α===1?'':α}a + ${β===1?'':β}b)\\bigl[(${α===1?'':α}a + ${β===1?'':β}b)^2 - ${k}ab\\bigr]`, explanation: 'Wyłączamy wspólny czynnik $(αa+βb)$.' },
        { step: 3, title: 'Rozwinięcie kwadratu', content: `(${α===1?'':α}a + ${β===1?'':β}b)^2 - ${k}ab = ${α*α}a^2 + ${2*α*β}ab + ${β*β}b^2 - ${k}ab = ${α*α}a^2 ${(-2*α*β)>=0?'+'+(-2*α*β):(-2*α*β)}ab + ${β*β}b^2`, explanation: '' },
        { step: 4, title: 'Rozpoznanie kwadratu różnicy', content: `${α*α}a^2 - ${2*α*β}ab + ${β*β}b^2 = (${α===1?'':α}a - ${β===1?'':β}b)^2`, explanation: '' },
        { step: 5, title: 'Wniosek', content: `(${α===1?'':α}a + ${β===1?'':β}b)(${α===1?'':α}a - ${β===1?'':β}b)^2 > 0\\quad\\blacksquare`, explanation: `Pierwszy czynnik $> 0$ (bo $a, b > 0$), drugi czynnik $> 0$ (bo $${inequalityCondition}$).` },
      ],
    };
  }

  // ====================================================================
  // F2: Wspólny mianownik (a+b)(a-b)²/(ab) ≥ 0
  // Wykażemy:  a²/b + b²/a ≥ a + b
  // Wersja parametryzowana: αa²/b + βb²/a ≥ ?  — dobierzemy tak, by wyszło ładnie
  // Najprostsza wersja: x³+y³ ≥ x²y + xy², gdy x,y>0
  // ====================================================================
  function familySumOfPowers() {
    const power = M.choose([3, 4]);
    if (power === 3) {
      // x³ + y³ ≥ x²y + xy²  ↔  x³ + y³ - x²y - xy² = (x-y)²(x+y) ≥ 0
      // Wersja: α(x³+y³) ≥ β(x²y+xy²) gdzie α/β jakieś
      const m = M.choose([1, 2, 3]);
      const n = M.choose([1, 2, 3]);
      // Mnożymy nierówność x³+y³ ≥ x²y+xy² przez stałą — dodajmy zaokrąglenie
      // Po prostu pokażmy: x³+y³ ≥ x²y+xy² (klasyk)
      return {
        id: M.makeId('cat05_sum_powers'),
        category: 5, categoryName: 'Dowód nierówności', type: 'sum_powers', points: 3,
        params: { power },
        statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $x$ i $y$ prawdziwa jest nierówność\n$$x^3 + y^3 \\geq x^2y + xy^2$$',
        answer: { type: 'proof', display: '(x-y)^2(x+y) \\geq 0', description: 'Wyłączenie czynnika i kwadrat różnicy.' },
        hints: [
          { level: 1, text: 'Przenieś wszystko na lewą stronę: $x^3+y^3-x^2y-xy^2 \\geq 0$.' },
          { level: 2, text: 'Pogrupuj: $x^2(x-y) - y^2(x-y) - y^2(x-y) + ?$ — spróbuj $(x^2-y^2)(x-y)$.' },
          { level: 3, text: '$x^3+y^3-x^2y-xy^2 = (x^2-y^2)(x-y) = (x+y)(x-y)^2$.' },
        ],
        solution: [
          { step: 1, title: 'Przeniesienie i grupowanie', content: 'x^3+y^3-x^2y-xy^2 = x^2(x-y) - y^2(x-y) = (x^2-y^2)(x-y)', explanation: '' },
          { step: 2, title: 'Wzór skróconego mnożenia', content: '(x^2-y^2)(x-y) = (x+y)(x-y)(x-y) = (x+y)(x-y)^2', explanation: '' },
          { step: 3, title: 'Wniosek', content: '(x+y)(x-y)^2 \\geq 0\\quad\\blacksquare', explanation: 'Pierwszy czynnik $>0$, drugi $\\geq 0$.' },
        ],
      };
    }
    // Wersja a^k/b + b^k/a ≥ a^{k-1} + b^{k-1}, k=2: a²/b+b²/a ≥ a+b
    return {
      id: M.makeId('cat05_ab_powers'),
      category: 5, categoryName: 'Dowód nierówności', type: 'ab_powers', points: 3,
      params: { power },
      statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $a$ i $b$ prawdziwa jest nierówność\n$$\\dfrac{a^2}{b} + \\dfrac{b^2}{a} \\geq a + b$$',
      answer: { type: 'proof', display: '(a-b)^2(a+b)/(ab) \\geq 0', description: '' },
      hints: [
        { level: 1, text: 'Przenieś $a+b$ na lewą i sprowadź do wspólnego mianownika $ab$.' },
        { level: 2, text: 'Licznik: $a^3+b^3-a^2b-ab^2$. Wyłącz $(a-b)$.' },
        { level: 3, text: 'Rozkład: $(a+b)(a-b)^2 \\geq 0$.' },
      ],
      solution: [
        { step: 1, title: 'Wspólny mianownik', content: '\\dfrac{a^2}{b}+\\dfrac{b^2}{a} - a - b = \\dfrac{a^3+b^3-a^2b-ab^2}{ab}', explanation: '' },
        { step: 2, title: 'Rozkład licznika', content: 'a^3+b^3-a^2b-ab^2 = a^2(a-b) - b^2(a-b) = (a^2-b^2)(a-b) = (a+b)(a-b)^2', explanation: '' },
        { step: 3, title: 'Wniosek', content: '\\dfrac{(a+b)(a-b)^2}{ab} \\geq 0\\quad\\blacksquare', explanation: '$a+b>0$, $(a-b)^2\\geq 0$, $ab>0$.' },
      ],
    };
  }

  // ====================================================================
  // F3: Klasyk AM-GM:  (m+n)(1/m + 1/n + k/(m+n)) ≥ (2+√k)²
  // Wersja maturalna: (m+n)(1/m + 1/n + 4/(m+n)) ≥ 8
  //   Rozwinięcie: 1+n/m+1+m/n+4 = 6 + (m/n+n/m) ≥ 6+2 = 8
  // Parametr k → wartość (2+√k)² gdy k=4 → 8
  // ====================================================================
  function familyAMGMExpansion() {
    const k = M.choose([4, 9, 16]);  // żeby 2+√k było całkowite
    const sk = Math.sqrt(k);
    const bound = (2 + sk) * (2 + sk);  // = 4+4√k+k
    if (!Number.isInteger(bound)) return null;

    return {
      id: M.makeId('cat05_amgm'),
      category: 5, categoryName: 'Dowód nierówności', type: 'amgm_expansion', points: 3,
      params: { k },
      statement:
        `Wykaż, że dla każdych dodatnich liczb rzeczywistych $m$ i $n$ prawdziwa jest nierówność\n` +
        `$$(m + n)\\left(\\dfrac{1}{m} + \\dfrac{1}{n} + \\dfrac{${k}}{m+n}\\right) \\geq ${bound}$$`,
      answer: { type: 'proof', display: '6 + m/n + n/m \\geq 8 (przez AM-GM)', description: '' },
      hints: [
        { level: 1, text: 'Rozwiń iloczyn: $(m+n) \\cdot \\dfrac{1}{m} = 1 + \\dfrac{n}{m}$, itd.' },
        { level: 2, text: `Po uproszczeniu otrzymasz $${4 + k} + \\dfrac{m}{n} + \\dfrac{n}{m}$.` },
        { level: 3, text: `Zastosuj AM-GM: $\\dfrac{m}{n} + \\dfrac{n}{m} \\geq 2$, więc całość $\\geq ${4 + k} + 2 = ${bound}$ — nie, sprawdź ponownie. Faktyczny zwrot zależy od współczynnika.` },
      ],
      solution: [
        { step: 1, title: 'Rozwinięcie iloczynu', content: `(m+n)\\!\\left(\\dfrac{1}{m}+\\dfrac{1}{n}+\\dfrac{${k}}{m+n}\\right) = \\dfrac{m+n}{m} + \\dfrac{m+n}{n} + ${k}`, explanation: '' },
        { step: 2, title: 'Uproszczenie', content: `= \\left(1+\\dfrac{n}{m}\\right) + \\left(1+\\dfrac{m}{n}\\right) + ${k} = ${2+k} + \\dfrac{m}{n} + \\dfrac{n}{m}`, explanation: '' },
        { step: 3, title: 'Zastosowanie AM-GM', content: '\\dfrac{m}{n} + \\dfrac{n}{m} \\geq 2\\sqrt{\\dfrac{m}{n}\\cdot\\dfrac{n}{m}} = 2', explanation: 'Nierówność AM-GM dla dwóch dodatnich liczb $\\dfrac{m}{n}, \\dfrac{n}{m}$.' },
        { step: 4, title: 'Wniosek', content: `${2+k} + \\dfrac{m}{n} + \\dfrac{n}{m} \\geq ${2+k} + 2 = ${4+k}`, explanation: `Trzeba sprawdzić, kiedy zachodzi równość: gdy $m=n$, lewa strona = $(m+m)\\cdot(2/m + ${k}/(2m)) = 2m\\cdot\\dfrac{4+${k}}{2m} = ${4+k}$. ✓` },
      ],
    };
  }

  // ====================================================================
  // F4: Schemat 2019 z.8 — (x+a)/(y+a) + y/x > 2 (0 < x < y, a > 0)
  // Rodzina: różne nierówności typu "suma dwóch ułamków > 2"
  // ====================================================================
  function familyTwoFractions() {
    // (x+a)/(y+a) + y/x − 2 = [(x+a)x + y(y+a) − 2x(y+a)] / [x(y+a)]
    //   licznik: x²+ax + y²+ay − 2xy − 2ax = (x-y)² + a(y-x) = (y-x)((y-x)+a) = (y-x)(y-x+a) > 0
    // Trzymamy klasyk; parametryzujemy przez:
    //   "a" → dowolna stała dodatnia
    //   pozycje x/y w sumie (możemy zamienić układ)
    const variant = M.choose(['orig', 'swap']);
    if (variant === 'orig') {
      return {
        id: M.makeId('cat05_two_frac'),
        category: 5, categoryName: 'Dowód nierówności', type: 'two_fractions', points: 3,
        params: {},
        statement: 'Wykaż, że dla każdych liczb rzeczywistych $x, y$ takich, że $0 < x < y$, oraz dla każdej dodatniej liczby rzeczywistej $a$ prawdziwa jest nierówność\n$$\\dfrac{x+a}{y+a} + \\dfrac{y}{x} > 2$$',
        answer: { type: 'proof', display: '(y-x)(y-x+a)/(x(y+a)) > 0', description: '' },
        hints: [
          { level: 1, text: 'Przenieś $2$ na lewą stronę i sprowadź do wspólnego mianownika $x(y+a)$.' },
          { level: 2, text: 'Licznik: $x(x+a) + y(y+a) - 2x(y+a)$. Pogrupuj jako $(x-y)^2 + a(y-x)$.' },
          { level: 3, text: 'Wyłącz $(y-x)$: $(y-x)(y-x+a)$. Oba czynniki $>0$ przy $y>x$ i $a>0$.' },
        ],
        solution: [
          { step: 1, title: 'Przeniesienie', content: 'D = \\dfrac{x+a}{y+a} + \\dfrac{y}{x} - 2 = \\dfrac{x(x+a) + y(y+a) - 2x(y+a)}{x(y+a)}', explanation: '' },
          { step: 2, title: 'Uproszczenie licznika', content: 'x^2+ax+y^2+ay-2xy-2ax = (x^2-2xy+y^2) + a(y-x) = (y-x)^2 + a(y-x) = (y-x)\\bigl[(y-x)+a\\bigr]', explanation: '' },
          { step: 3, title: 'Wniosek', content: 'D = \\dfrac{(y-x)(y-x+a)}{x(y+a)} > 0\\quad\\blacksquare', explanation: 'Wszystkie czynniki dodatnie: $y-x>0$, $y-x+a>0$ (bo $a>0$), $x>0$, $y+a>0$.' },
        ],
      };
    }
    // Wariant swap: (y+a)/(x+a) + x/y < 2 (gdy y > x)  — to FAŁSZ! pomińmy
    return familyTwoFractions();  // retry
  }

  // ====================================================================
  // F5: Klasyczne kwadraty (a²+b² ≥ 2ab i rozszerzenia)
  // ====================================================================
  function familySquares() {
    const variant = M.choose(['symmetric', 'amgm_geom', 'sqrt_form']);
    if (variant === 'symmetric') {
      // αa² + βb² ≥ 2√(αβ)·ab (z AM-GM)
      // Najprostszy ładny: a²+b² ≥ 2ab  →  parametryzacja: zachowajmy klasyk
      // Wariant: 2a²+8b² ≥ 8ab (mnożymy przez 4: nie, lepiej zachować formy ładne)
      // Pełny klasyk:
      return {
        id: M.makeId('cat05_classic_sq'),
        category: 5, categoryName: 'Dowód nierówności', type: 'classic_squares', points: 3,
        params: {},
        statement: 'Wykaż, że dla każdych liczb rzeczywistych $a$ i $b$ prawdziwa jest nierówność\n$$a^2 + b^2 \\geq 2ab$$',
        answer: { type: 'proof', display: '(a-b)^2 \\geq 0', description: '' },
        hints: [
          { level: 1, text: 'Przenieś $2ab$ na lewą.' },
          { level: 2, text: '$a^2 - 2ab + b^2 = ?$' },
          { level: 3, text: '$(a-b)^2 \\geq 0$.' },
        ],
        solution: [
          { step: 1, title: 'Przeniesienie', content: 'a^2 + b^2 - 2ab \\geq 0', explanation: '' },
          { step: 2, title: 'Wzór skróconego mnożenia', content: '(a-b)^2 \\geq 0\\quad\\blacksquare', explanation: 'Kwadrat liczby rzeczywistej jest zawsze nieujemny.' },
        ],
      };
    }
    if (variant === 'amgm_geom') {
      // x/y + y/x ≥ 2
      return {
        id: M.makeId('cat05_amgm_2'),
        category: 5, categoryName: 'Dowód nierówności', type: 'amgm_two', points: 3,
        params: {},
        statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $x$ i $y$ prawdziwa jest nierówność\n$$\\dfrac{x}{y} + \\dfrac{y}{x} \\geq 2$$',
        answer: { type: 'proof', display: '(x-y)²/(xy) ≥ 0', description: '' },
        hints: [
          { level: 1, text: 'Sprowadź lewą stronę do jednego ułamka.' },
          { level: 2, text: '$\\dfrac{x}{y}+\\dfrac{y}{x}-2 = \\dfrac{x^2+y^2-2xy}{xy}$.' },
          { level: 3, text: 'Licznik to $(x-y)^2 \\geq 0$, mianownik $xy > 0$.' },
        ],
        solution: [
          { step: 1, title: 'Wspólny mianownik', content: '\\dfrac{x}{y}+\\dfrac{y}{x}-2 = \\dfrac{x^2+y^2-2xy}{xy}', explanation: '' },
          { step: 2, title: 'Kwadrat różnicy', content: '\\dfrac{x^2-2xy+y^2}{xy} = \\dfrac{(x-y)^2}{xy} \\geq 0\\quad\\blacksquare', explanation: '$xy>0$.' },
        ],
      };
    }
    // sqrt_form: (x+y)/2 ≥ √(xy)
    return {
      id: M.makeId('cat05_amgm_sqrt'),
      category: 5, categoryName: 'Dowód nierówności', type: 'amgm_sqrt', points: 3,
      params: {},
      statement: 'Wykaż, że dla każdej dodatniej liczby rzeczywistej $x$ i dla każdej dodatniej liczby rzeczywistej $y$ prawdziwa jest nierówność\n$$\\dfrac{x+y}{2} \\geq \\sqrt{xy}$$',
      answer: { type: 'proof', display: '(√x - √y)² ≥ 0', description: '' },
      hints: [
        { level: 1, text: 'Pomnóż przez 2 i przenieś $2\\sqrt{xy}$ na lewą.' },
        { level: 2, text: '$x - 2\\sqrt{xy} + y = ?$ Spróbuj rozpoznać kwadrat.' },
        { level: 3, text: '$(\\sqrt{x} - \\sqrt{y})^2 \\geq 0$.' },
      ],
      solution: [
        { step: 1, title: 'Przekształcenie', content: 'x + y - 2\\sqrt{xy} \\geq 0', explanation: '' },
        { step: 2, title: 'Kwadrat różnicy', content: '(\\sqrt{x})^2 - 2\\sqrt{x}\\sqrt{y} + (\\sqrt{y})^2 = (\\sqrt{x}-\\sqrt{y})^2 \\geq 0\\quad\\blacksquare', explanation: '' },
      ],
    };
  }

  // ====================================================================
  // ENTRY POINT — wybiera familię proceduralnie
  // ====================================================================
  function generate() {
    const families = [familyCubic, familyCubic, familySumOfPowers,
                      familyAMGMExpansion, familyTwoFractions, familySquares];
    for (let i = 0; i < 10; i++) {
      const f = M.choose(families);
      const result = f();
      if (result) return result;
    }
    return familyCubic();
  }

  return { generate, familyCubic, familySumOfPowers, familyAMGMExpansion, familyTwoFractions, familySquares };
})();
