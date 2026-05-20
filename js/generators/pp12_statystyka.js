// PP Kategoria 12: Statystyka opisowa
// Schemat A: średnia arytmetyczna i mediana z danych
// Schemat B: zadanie z nieznanym wynikiem (cofnięcie średniej)
// Schemat C: interpretacja danych, moda, rozstęp
window.pp12 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Średnia i mediana z zestawu danych ===
  function meanMedian() {
    const configs = [
      {
        data: [3, 5, 7, 7, 8, 10, 12],
        n: 7, sum: 52, mean: '\\frac{52}{7}\\approx7{,}43', meanNum: 52/7,
        median: 7,
        stmt: 'Dane: $3, 5, 7, 7, 8, 10, 12$. Oblicz średnią arytmetyczną i medianę.',
        steps: [
          { step:1, title:'Średnia', content:'\\bar{x}=\\frac{3+5+7+7+8+10+12}{7}=\\frac{52}{7}\\approx7{,}43', explanation:'' },
          { step:2, title:'Mediana', content:'\\text{Dane są już uszeregowane. Środkowy element (4-ty): }7', explanation:'7 elementów → mediana = 4-ty element.' }
        ],
        hints:[
          { level:1, text:'Średnia = suma / liczba elementów.' },
          { level:2, text:'$\\bar{x}=52/7$.' },
          { level:3, text:'Mediana = środkowy element posortowanego zbioru = 7.' }
        ]
      },
      {
        data: [2, 4, 6, 8, 10],
        n: 5, sum: 30, mean: '6', meanNum: 6,
        median: 6,
        stmt: 'Dane: $2, 4, 6, 8, 10$. Oblicz średnią i medianę.',
        steps: [
          { step:1, title:'Średnia', content:'\\bar{x}=\\frac{2+4+6+8+10}{5}=\\frac{30}{5}=6', explanation:'' },
          { step:2, title:'Mediana', content:'\\text{Środkowy element (3-ci): }6', explanation:'' }
        ],
        hints:[
          { level:1, text:'$\\bar{x}=30/5=6$.' },
          { level:2, text:'Mediana: 3-ci z 5 elementów.' },
          { level:3, text:'Mediana $=6$.' }
        ]
      },
      {
        data: [5, 8, 3, 9, 7, 6],
        sorted: [3, 5, 6, 7, 8, 9],
        n: 6, sum: 38, mean: '\\frac{19}{3}\\approx6{,}33',
        median: '6{,}5',
        stmt: 'Dane: $5, 8, 3, 9, 7, 6$. Oblicz średnią arytmetyczną i medianę.',
        steps: [
          { step:1, title:'Uszeregowanie', content:'3,\\ 5,\\ 6,\\ 7,\\ 8,\\ 9', explanation:'' },
          { step:2, title:'Średnia', content:'\\bar{x}=\\frac{3+5+6+7+8+9}{6}=\\frac{38}{6}=\\frac{19}{3}\\approx6{,}33', explanation:'' },
          { step:3, title:'Mediana', content:'\\text{Parzysta liczba elem.: średnia 3. i 4. elem.}=\\frac{6+7}{2}=6{,}5', explanation:'' }
        ],
        hints:[
          { level:1, text:'Posortuj dane rosnąco.' },
          { level:2, text:'$\\bar{x}=38/6\\approx6{,}33$.' },
          { level:3, text:'Mediana = $\\frac{6+7}{2}=6{,}5$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = `\\bar{x}=${cfg.mean},\\ Me=${cfg.median}`;
    return {
      id: M.makeId('pp12_meanMed'),
      category: 12,
      categoryName: 'Statystyka',
      type: 'mean_median',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Wyznaczanie brakującej wartości ze średniej ===
  function missingValue() {
    const configs = [
      {
        stmt: 'Średnia klasy wynosiła $4{,}0$. Po dodaniu $1$ ucznia ze stopniem $5{,}5$ średnia wzrosła do $4{,}05$. Ile uczniów było w klasie?',
        // Niech n = liczba uczniów. n·4 + 5.5 = (n+1)·4.05
        // 4n + 5.5 = 4.05n + 4.05
        // 1.45 = 0.05n → n=29
        ans: 29,
        steps: [
          { step:1, title:'Równanie', content:'\\frac{4{,}0\\cdot n + 5{,}5}{n+1}=4{,}05', explanation:'Nowa średnia po dodaniu ucznia.' },
          { step:2, title:'Rozwiązanie', content:'4n+5{,}5=4{,}05n+4{,}05\\implies0{,}05n=1{,}45\\implies n=29', explanation:'' }
        ],
        hints:[
          { level:1, text:'Niech $n$ = liczba uczniów. Suma punktów: $4n$.' },
          { level:2, text:'$\\frac{4n+5{,}5}{n+1}=4{,}05$.' },
          { level:3, text:'$0{,}05n=1{,}45\\implies n=29$.' }
        ]
      },
      {
        stmt: 'Pięć liczb ma średnią $12$. Kiedy do zestawu dodamy szóstą liczbę, średnia wzrośnie do $13$. Jaka jest szósta liczba?',
        // 5·12 = 60; 6·13 = 78; x = 78-60 = 18
        ans: 18,
        steps: [
          { step:1, title:'Suma 5 liczb', content:'S_5=5\\cdot12=60', explanation:'' },
          { step:2, title:'Suma 6 liczb', content:'S_6=6\\cdot13=78', explanation:'' },
          { step:3, title:'Szósta liczba', content:'x=78-60=18', explanation:'' }
        ],
        hints:[
          { level:1, text:'Oblicz sumę 5 liczb.' },
          { level:2, text:'Oblicz sumę 6 liczb ze nowej średniej.' },
          { level:3, text:'$x=78-60=18$.' }
        ]
      },
      {
        stmt: 'Dane: $2, 5, x, 8, 10$. Średnia arytmetyczna jest równa $7$. Wyznacz $x$.',
        // (2+5+x+8+10)/5 = 7 → 25+x = 35 → x=10
        ans: 10,
        steps: [
          { step:1, title:'Równanie', content:'\\frac{2+5+x+8+10}{5}=7', explanation:'' },
          { step:2, title:'Rozwiązanie', content:'25+x=35\\implies x=10', explanation:'' }
        ],
        hints:[
          { level:1, text:'Suma wszystkich = $7\\cdot5=35$.' },
          { level:2, text:'$2+5+x+8+10=35$.' },
          { level:3, text:'$x=10$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp12_missing'),
      category: 12,
      categoryName: 'Statystyka',
      type: 'missing_value',
      points: 2,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'number', value: cfg.ans, display: String(cfg.ans), description: `Odpowiedź: $${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Moda, rozstęp, interpretacja danych ===
  function dataInterpret() {
    const configs = [
      {
        stmt: 'Wyniki testu (pkt): $4, 7, 7, 5, 8, 7, 9, 6, 5, 7$.\n' +
          'Oblicz modę, medianę i rozstęp.',
        sorted: [4,5,5,6,7,7,7,7,8,9],
        moda: 7, mediana: 7, rozstep: 5,
        steps: [
          { step:1, title:'Uszeregowanie', content:'4,\\ 5,\\ 5,\\ 6,\\ 7,\\ 7,\\ 7,\\ 7,\\ 8,\\ 9', explanation:'' },
          { step:2, title:'Moda', content:'\\text{Mo}=7\\text{ (najczęstsza wartość — 4 razy)}', explanation:'' },
          { step:3, title:'Mediana', content:'\\text{Me}=\\frac{7+7}{2}=7\\text{ (średnia 5. i 6. z 10 elementów)}', explanation:'' },
          { step:4, title:'Rozstęp', content:'R=9-4=5', explanation:'' }
        ],
        hints:[
          { level:1, text:'Moda to najczęściej powtarzająca się wartość.' },
          { level:2, text:'Mo=7 (4 razy). Mediana: średnia 5. i 6. elementu.' },
          { level:3, text:'Mediana=7, rozstęp=5.' }
        ]
      },
      {
        stmt: 'Tabela: wartość | 10 | 20 | 30. Liczebność: 3 | 5 | 2.\n' +
          'Oblicz średnią ważoną i modę.',
        mean_w: 19, moda_t: 20,
        // (10·3+20·5+30·2)/(3+5+2) = (30+100+60)/10 = 190/10 = 19
        steps: [
          { step:1, title:'Suma ważona', content:'10\\cdot3+20\\cdot5+30\\cdot2=30+100+60=190', explanation:'' },
          { step:2, title:'Średnia ważona', content:'\\bar{x}=\\frac{190}{10}=19', explanation:'' },
          { step:3, title:'Moda', content:'\\text{Mo}=20\\text{ (największa liczebność: 5)}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Średnia ważona: $\\bar{x}=\\frac{\\sum x_i\\cdot n_i}{\\sum n_i}$.' },
          { level:2, text:'$(30+100+60)/10=190/10=19$.' },
          { level:3, text:'Mo=20 (najwyższa liczebność).' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.moda !== undefined
      ? `\\text{Mo}=${cfg.moda},\\ \\text{Me}=${cfg.mediana},\\ R=${cfg.rozstep}`
      : `\\bar{x}=${cfg.mean_w},\\ \\text{Mo}=${cfg.moda_t}`;
    return {
      id: M.makeId('pp12_interpret'),
      category: 12,
      categoryName: 'Statystyka',
      type: 'data_interpret',
      points: 2,
      params: {},
      statement: cfg.stmt + '\n\nZapisz obliczenia.',
      answer: { type: 'expression', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generateClosed() {
    const configs = [
      {
        stmt: 'Mediana zbioru danych $\\{2,\\ 5,\\ 3,\\ 8,\\ 4\\}$ wynosi:',
        options: { A: '$4$', B: '$3$', C: '$5$', D: '$6$' },
        correct: 'A',
        hints: [{ level:1, text:'Uszereguj rosnąco: $\\{2,3,4,5,8\\}$. Mediana = środkowy element.' }],
        solution: [{ step:1, title:'Obliczenie', content:'\\text{Posortowane: }2,3,4,5,8\\implies\\text{mediana}=4', explanation:'' }]
      },
      {
        stmt: 'Średnia arytmetyczna liczb $4,\\ 6,\\ 8,\\ 10,\\ 12$ wynosi:',
        options: { A: '$8$', B: '$6$', C: '$10$', D: '$7$' },
        correct: 'A',
        hints: [{ level:1, text:'Suma: $4+6+8+10+12=40$. Ile elementów?' }],
        solution: [{ step:1, title:'Obliczenie', content:'\\bar{x}=\\frac{40}{5}=8', explanation:'' }]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp12_closed'),
      categoryId: 'pp12',
      categoryName: 'Statystyka',
      type: 'closed',
      points: 1,
      params: {},
      statement: cfg.stmt,
      options: cfg.options,
      correctOption: cfg.correct,
      answer: { type: 'choice', display: cfg.correct, description: `Odpowiedź: ${cfg.correct}` },
      hints: cfg.hints,
      solution: cfg.solution
    };
  }

  function generate() {
    return M.choose([meanMedian, missingValue, dataInterpret])();
  }

  return { generate, generateClosed };
})();
