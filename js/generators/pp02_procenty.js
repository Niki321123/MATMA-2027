// PP Kategoria 2: Procenty i obliczenia finansowe
// Schemat A: obliczanie % liczby i liczby z %
// Schemat B: podwyżka/obniżka procentowa (kolejne zmiany)
// Schemat C: odsetki bankowe (procent prosty / złożony)
window.pp02 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Podstawowe obliczenia procentowe ===
  function basicPercent() {
    const configs = [
      {
        stmt: 'W sklepie cena butów wynosi $240$ zł. Sklep oferuje rabat $15\\%$. Oblicz cenę po rabacie.',
        ans: 204, display: '204', unit: 'zł',
        steps: [
          { step:1, title:'Obliczenie rabatu', content:'240 \\cdot \\frac{15}{100} = 240 \\cdot 0{,}15 = 36\\text{ zł}', explanation:'15% z 240 zł.' },
          { step:2, title:'Cena po rabacie', content:'240 - 36 = \\mathbf{204\\text{ zł}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz 15% z 240 zł.' },
          { level:2, text:'$240\\cdot0{,}15=36$ zł rabatu.' },
          { level:3, text:'$240-36=204$ zł.' }
        ]
      },
      {
        stmt: 'Po podwyżce o $20\\%$ cena produktu wynosi $360$ zł. Oblicz cenę przed podwyżką.',
        ans: 300, display: '300', unit: 'zł',
        steps: [
          { step:1, title:'Równanie', content:'x \\cdot 1{,}2 = 360', explanation:'Podwyżka 20% oznacza mnożenie przez 1,2.' },
          { step:2, title:'Wyznaczenie x', content:'x = \\frac{360}{1{,}2} = \\mathbf{300\\text{ zł}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Niech $x$ = cena przed podwyżką. $x\\cdot(1+0{,}20)=360$.' },
          { level:2, text:'$1{,}2x=360$.' },
          { level:3, text:'$x=300$ zł.' }
        ]
      },
      {
        stmt: 'W klasie jest $32$ uczniów. $25\\%$ z nich uzyskało ocenę bardzo dobrą. Ile to uczniów?',
        ans: 8, display: '8', unit: '',
        steps: [
          { step:1, title:'Obliczenie', content:'32 \\cdot \\frac{25}{100} = 32 \\cdot 0{,}25 = \\mathbf{8\\text{ uczniów}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz 25% z 32.' },
          { level:2, text:'$32\\cdot0{,}25=8$.' },
          { level:3, text:'8 uczniów.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp02_basic'),
      category: 2,
      categoryName: 'Procenty i obliczenia finansowe',
      type: 'basic_percent',
      points: 1,
      params: {},
      statement: cfg.stmt,
      answer: { type: 'number', value: cfg.ans, display: cfg.display, description: `Odpowiedź: $${cfg.display}$${cfg.unit ? '\\text{ '+cfg.unit+'}' : ''}` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Kolejne zmiany procentowe ===
  function percentChanges() {
    const configs = [
      {
        stmt: 'Cena towaru wzrosła o $20\\%$, a następnie o $25\\%$. O ile procent wzrosła łącznie?',
        ans: 50, display: '50',
        steps: [
          { step:1, title:'Całkowity współczynnik', content:'1{,}2 \\cdot 1{,}25 = 1{,}5', explanation:'Każda zmiana to mnożenie przez odpowiedni czynnik.' },
          { step:2, title:'Wzrost procentowy', content:'(1{,}5 - 1)\\cdot100\\% = \\mathbf{50\\%}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Mnóż współczynniki obu zmian: $1{,}2$ i $1{,}25$.' },
          { level:2, text:'$1{,}2\\cdot1{,}25=1{,}5$.' },
          { level:3, text:'$(1{,}5-1)\\cdot100\\%=50\\%$.' }
        ]
      },
      {
        stmt: 'Cena towaru wzrosła o $10\\%$, a następnie obniżono ją o $10\\%$. Czy cena wróciła do pierwotnej wartości? O ile procent różni się od ceny wyjściowej?',
        ans: -1, display: '-1',
        steps: [
          { step:1, title:'Współczynniki', content:'1{,}1 \\cdot 0{,}9 = 0{,}99', explanation:'' },
          { step:2, title:'Zmiana', content:'(0{,}99 - 1)\\cdot100\\% = -1\\%', explanation:'Cena jest o 1% niższa niż pierwotna.' }
        ],
        hints:[
          { level:1, text:'$1{,}1\\cdot0{,}9=?$' },
          { level:2, text:'$1{,}1\\cdot0{,}9=0{,}99$.' },
          { level:3, text:'$(0{,}99-1)\\cdot100\\%=-1\\%$. Cena jest o 1% niższa.' }
        ]
      },
      {
        stmt: 'Liczba mieszkańców miasta wzrosła w ciągu roku o $5\\%$, a w następnym roku o $8\\%$. O ile procent wzrosła łącznie przez te dwa lata?',
        ans: 13.4, display: '13{,}4',
        steps: [
          { step:1, title:'Iloczyn współczynników', content:'1{,}05 \\cdot 1{,}08 = 1{,}134', explanation:'' },
          { step:2, title:'Łączny wzrost', content:'(1{,}134-1)\\cdot100\\% = \\mathbf{13{,}4\\%}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Mnóż: $1{,}05\\cdot1{,}08$.' },
          { level:2, text:'$1{,}05\\cdot1{,}08=1{,}134$.' },
          { level:3, text:'$13{,}4\\%$ wzrostu łącznie.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp02_changes'),
      category: 2,
      categoryName: 'Procenty i obliczenia finansowe',
      type: 'percent_changes',
      points: 2,
      params: {},
      statement: cfg.stmt,
      answer: { type: 'number', value: cfg.ans, display: cfg.display + '\\%', description: `Łączna zmiana: $${cfg.display}\\%$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Odsetki bankowe ===
  function bankInterest() {
    const configs = [
      {
        capital: 5000, rate: 8, years: 2,
        simple: 5000 + 5000 * 0.08 * 2,      // 5800
        compound: Math.round(5000 * 1.08 * 1.08), // 5832
        stmt_type: 'compound',
        stmt: 'Kapitał $5000$ zł ulokowano na lokacie o oprocentowaniu $8\\%$ w skali roku (odsetki doliczane do kapitału co rok). Ile wyniesie kapitał po $2$ latach?',
        ans: Math.round(5000 * 1.08 * 1.08),
        display: String(Math.round(5000 * 1.08 * 1.08)),
        steps: [
          { step:1, title:'Po 1. roku', content:'5000 \\cdot 1{,}08 = 5400\\text{ zł}', explanation:'' },
          { step:2, title:'Po 2. roku', content:'5400 \\cdot 1{,}08 = 5832\\text{ zł}', explanation:'Lub: $5000\\cdot(1{,}08)^2=5000\\cdot1{,}1664=5832$ zł.' }
        ],
        hints:[
          { level:1, text:'Wzór na procent składany: $K_n = K_0\\cdot(1+p)^n$.' },
          { level:2, text:'$K_2=5000\\cdot(1{,}08)^2$.' },
          { level:3, text:'$K_2=5000\\cdot1{,}1664=5832$ zł.' }
        ]
      },
      {
        capital: 10000, rate: 5, years: 3,
        compound: Math.round(10000 * Math.pow(1.05, 3)),
        stmt: 'Kapitał $10\\,000$ zł ulokowano na lokacie z oprocentowaniem $5\\%$ rocznie (odsetki kapitalizowane co roku). Ile wyniesie kapitał po $3$ latach?',
        ans: Math.round(10000 * Math.pow(1.05, 3)),
        display: String(Math.round(10000 * Math.pow(1.05, 3))),
        steps: [
          { step:1, title:'Wzór', content:'K_3 = 10000\\cdot(1{,}05)^3', explanation:'' },
          { step:2, title:'Obliczenie', content:'K_3 = 10000\\cdot1{,}157625 \\approx \\mathbf{11\\,576\\text{ zł}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$K_n = K_0\\cdot(1+p)^n$.' },
          { level:2, text:'$K_3=10000\\cdot1{,}05^3$.' },
          { level:3, text:'$1{,}05^3=1{,}157625$, więc $K_3=11\\,576$ zł.' }
        ]
      },
      {
        capital: 2000, rate: 10, years: 1,
        stmt: 'Pożyczono $2000$ zł na $1$ rok przy oprocentowaniu prostym $10\\%$ w skali roku. Ile wynosi kwota do zwrotu?',
        ans: 2200, display: '2200',
        steps: [
          { step:1, title:'Odsetki', content:'2000\\cdot\\frac{10}{100}\\cdot1 = 200\\text{ zł}', explanation:'Procent prosty: odsetki = kapitał · stopa · czas.' },
          { step:2, title:'Kwota do zwrotu', content:'2000 + 200 = \\mathbf{2200\\text{ zł}}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Odsetki proste: $K_0\\cdot p\\cdot t$.' },
          { level:2, text:'$2000\\cdot0{,}10\\cdot1=200$ zł odsetek.' },
          { level:3, text:'$2000+200=2200$ zł.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp02_interest'),
      category: 2,
      categoryName: 'Procenty i obliczenia finansowe',
      type: 'bank_interest',
      points: 2,
      params: {},
      statement: cfg.stmt,
      answer: { type: 'number', value: cfg.ans, display: cfg.display + '\\text{ zł}', description: `Kwota: $${cfg.display}$ zł` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([basicPercent, percentChanges, bankInterest])();
  }

  return { generate };
})();
