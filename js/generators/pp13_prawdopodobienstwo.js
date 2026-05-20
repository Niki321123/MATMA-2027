// PP Kategoria 13: Prawdopodobieństwo
// Schemat A: klasyczne prawdopodobieństwo (kombinatoryka)
// Schemat B: prawdopodobieństwo z drzewem zdarzeń
// Schemat C: prawdopodobieństwo warunkowe i niezależność
window.pp13 = (() => {
  const M = window.MathUtils;

  // Pomocnik: silnia i kombinacja
  function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
  }
  function comb(n, k) {
    return fact(n) / (fact(k) * fact(n - k));
  }

  // === SCHEMAT A: Klasyczne prawdopodobieństwo ===
  function classicProb() {
    const configs = [
      {
        stmt: 'Z grupy $5$ kobiet i $3$ mężczyzn losujemy $2$ osoby. Oblicz prawdopodobieństwo, że obie są kobietami.',
        // C(5,2)/C(8,2) = 10/28 = 5/14
        p_num: 10, p_den: 28,
        p_simplified: '\\dfrac{5}{14}',
        steps: [
          { step:1, title:'Przestrzeń zdarzeń', content:'|\\Omega|=\\binom{8}{2}=28', explanation:'Wybieramy 2 z 8 osób.' },
          { step:2, title:'Zdarzenie sprzyjające', content:'|A|=\\binom{5}{2}=10', explanation:'Obie kobiety: 2 z 5.' },
          { step:3, title:'Prawdopodobieństwo', content:'P(A)=\\frac{10}{28}=\\frac{5}{14}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$|\\Omega|=\\binom{8}{2}$.' },
          { level:2, text:'$|\\Omega|=28$, $|A|=\\binom{5}{2}=10$.' },
          { level:3, text:'$P=\\frac{10}{28}=\\frac{5}{14}$.' }
        ]
      },
      {
        stmt: 'W urnie jest $4$ kule czerwone i $6$ niebieskich. Losujemy jedną kulę. Jakie jest prawdopodobieństwo wylosowania czerwonej?',
        p_num: 4, p_den: 10,
        p_simplified: '\\dfrac{2}{5}',
        steps: [
          { step:1, title:'Prawdopodobieństwo', content:'P(\\text{czerwona})=\\frac{4}{10}=\\frac{2}{5}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$P=\\frac{\\text{liczba sprzyjających}}{\\text{wszystkich}}$.' },
          { level:2, text:'$P=\\frac{4}{10}$.' },
          { level:3, text:'$P=\\frac{2}{5}$.' }
        ]
      },
      {
        stmt: 'Rzucamy dwiema kostkami sześciościennymi. Oblicz prawdopodobieństwo, że suma oczek wynosi $7$.',
        // Para (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 zdarzeń z 36
        p_num: 6, p_den: 36,
        p_simplified: '\\dfrac{1}{6}',
        steps: [
          { step:1, title:'Przestrzeń', content:'|\\Omega|=6\\cdot6=36', explanation:'' },
          { step:2, title:'Zdarzenia sprzyjające (suma=7)', content:'(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\\implies|A|=6', explanation:'' },
          { step:3, title:'Prawdopodobieństwo', content:'P=\\frac{6}{36}=\\frac{1}{6}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$|\\Omega|=36$.' },
          { level:2, text:'Ile par daje sumę 7? Wymień je.' },
          { level:3, text:'6 par, $P=1/6$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp13_classic'),
      category: 13,
      categoryName: 'Prawdopodobieństwo',
      type: 'classic_prob',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.p_simplified, description: `$P=${cfg.p_simplified}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Drzewo zdarzeń ===
  function treeDiagram() {
    const configs = [
      {
        stmt: 'Rzucamy monetą $3$ razy. Oblicz prawdopodobieństwo, że wypadną dokładnie $2$ orły.',
        // C(3,2)·(1/2)³ = 3/8
        p: '\\dfrac{3}{8}',
        steps: [
          { step:1, title:'Model', content:'\\text{Schemat Bernoulliego: }n=3,\\ p=\\frac{1}{2},\\ k=2', explanation:'' },
          { step:2, title:'Wzór', content:'P=\\binom{3}{2}\\cdot\\left(\\frac{1}{2}\\right)^2\\cdot\\frac{1}{2}=3\\cdot\\frac{1}{8}=\\frac{3}{8}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz $P(\\text{dokładnie 2 orły})$ ze wzoru Bernoulliego lub drzewa.' },
          { level:2, text:'$\\binom{3}{2}\\cdot(1/2)^3=3/8$.' },
          { level:3, text:'$P=3/8$.' }
        ]
      },
      {
        stmt: 'W klasie $60\\%$ uczniów lubi matematykę, $40\\%$ nie lubi. Spośród lubiących matematykę $70\\%$ zdało test, spośród nielubiących $30\\%$. Jakie jest prawdopodobieństwo, że losowo wybrany uczeń zdał test?',
        // P = 0.6·0.7 + 0.4·0.3 = 0.42+0.12 = 0.54
        p: '0{,}54',
        steps: [
          { step:1, title:'Prawdopodobieństwo całkowite', content:'P=P(L)\\cdot P(Z|L)+P(L^c)\\cdot P(Z|L^c)', explanation:'Wzór na prawdopodobieństwo całkowite.' },
          { step:2, title:'Obliczenie', content:'P=0{,}6\\cdot0{,}7+0{,}4\\cdot0{,}3=0{,}42+0{,}12=0{,}54', explanation:'' }
        ],
        hints:[
          { level:1, text:'Zastosuj wzór na prawdopodobieństwo całkowite.' },
          { level:2, text:'$P=P(L)\\cdot P(Z|L)+P(\\overline{L})\\cdot P(Z|\\overline{L})$.' },
          { level:3, text:'$P=0{,}6\\cdot0{,}7+0{,}4\\cdot0{,}3=0{,}54$.' }
        ]
      },
      {
        stmt: 'Rzucamy raz kostką sześciościenną. Oblicz prawdopodobieństwo, że wyrzucimy liczbę parzystą lub liczbę większą od $4$.',
        // P(par) = 3/6; P(>4) = 2/6; P(par ∩ >4) = P(6) = 1/6
        // P = 3/6+2/6-1/6 = 4/6 = 2/3
        p: '\\dfrac{2}{3}',
        steps: [
          { step:1, title:'Zdarzenia', content:'A=\\{2,4,6\\},\\ B=\\{5,6\\}', explanation:'' },
          { step:2, title:'Prawdopodobieństwa', content:'P(A)=\\frac{3}{6},\\ P(B)=\\frac{2}{6},\\ P(A\\cap B)=P(\\{6\\})=\\frac{1}{6}', explanation:'' },
          { step:3, title:'Suma zdarzeń', content:'P(A\\cup B)=\\frac{3}{6}+\\frac{2}{6}-\\frac{1}{6}=\\frac{4}{6}=\\frac{2}{3}', explanation:'' }
        ],
        hints:[
          { level:1, text:'$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.' },
          { level:2, text:'$P(A)=1/2$, $P(B)=1/3$, $P(A\\cap B)=1/6$.' },
          { level:3, text:'$P=1/2+1/3-1/6=2/3$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp13_tree'),
      category: 13,
      categoryName: 'Prawdopodobieństwo',
      type: 'tree_diagram',
      points: 3,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: `P=${cfg.p}`, description: `$P=${cfg.p}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Kombinatoryka i prawdopodobieństwo ===
  function combProb() {
    const configs = [
      {
        stmt: 'Na ile sposobów można ustawić $5$ różnych książek w rządku na półce?',
        ans: '120', ansNum: 120,
        steps: [
          { step:1, title:'Permutacja', content:'5! = 5\\cdot4\\cdot3\\cdot2\\cdot1=120', explanation:'' }
        ],
        hints:[
          { level:1, text:'Kolejność ma znaczenie — to permutacja.' },
          { level:2, text:'$n!$' },
          { level:3, text:'$5!=120$.' }
        ]
      },
      {
        stmt: 'Na ile sposobów można wybrać $3$ osoby z grupy $7$, jeśli kolejność nie ma znaczenia?',
        ans: '35', ansNum: 35,
        steps: [
          { step:1, title:'Kombinacja', content:'\\binom{7}{3}=\\frac{7!}{3!\\cdot4!}=\\frac{7\\cdot6\\cdot5}{3\\cdot2\\cdot1}=35', explanation:'' }
        ],
        hints:[
          { level:1, text:'Kombinacja: $\\binom{7}{3}$.' },
          { level:2, text:'$\\binom{7}{3}=\\frac{7\\cdot6\\cdot5}{6}=35$.' },
          { level:3, text:'35 sposobów.' }
        ]
      },
      {
        stmt: 'Z talii $52$ kart losujemy $1$ kartę. Jakie jest prawdopodobieństwo, że jest to as?',
        ans: '\\dfrac{1}{13}', ansNum: 4/52,
        steps: [
          { step:1, title:'Asy', content:'\\text{W talii są 4 asy.}', explanation:'' },
          { step:2, title:'Prawdopodobieństwo', content:'P=\\frac{4}{52}=\\frac{1}{13}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Ile asów jest w talii?' },
          { level:2, text:'4 asy z 52 kart.' },
          { level:3, text:'$P=4/52=1/13$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp13_comb'),
      category: 13,
      categoryName: 'Prawdopodobieństwo',
      type: 'comb_prob',
      points: 2,
      params: {},
      statement: cfg.stmt,
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([classicProb, treeDiagram, combProb])();
  }

  return { generate };
})();
