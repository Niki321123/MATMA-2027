// PP Kategoria 8: Ciągi
// Schemat A: ciąg arytmetyczny — wyraz ogólny i suma
// Schemat B: ciąg geometryczny — wyraz ogólny i suma
// Schemat C: zadanie tekstowe z ciągiem
window.pp08 = (() => {
  const M = window.MathUtils;

  // === SCHEMAT A: Ciąg arytmetyczny ===
  function arithmeticSeq() {
    const configs = [
      { a1:3, r:4, n:10,
        an: 3+9*4,   // 39
        Sn: 10*(3+39)/2, // 210
        stmt: 'Dany jest ciąg arytmetyczny, w którym $a_1 = 3$ i różnica $r = 4$.',
        qA: 'Oblicz $a_{10}$ i $S_{10}$.',
        steps:[
          { step:1, title:'Wyraz ogólny', content:'a_n=a_1+(n-1)r=3+9\\cdot4=3+36=39', explanation:'$a_n=a_1+(n-1)r$.' },
          { step:2, title:'Suma', content:'S_{10}=\\frac{10}{2}(a_1+a_{10})=5\\cdot(3+39)=5\\cdot42=210', explanation:'' }
        ],
        hints:[
          { level:1, text:'Wzór na n-ty wyraz: $a_n=a_1+(n-1)r$.' },
          { level:2, text:'$a_{10}=3+9\\cdot4=39$.' },
          { level:3, text:'$S_{10}=\\frac{10}{2}(3+39)=210$.' }
        ]
      },
      { a1:2, r:3, n:8,
        an: 2+7*3,  // 23
        Sn: 8*(2+23)/2, // 100
        stmt: 'Dany jest ciąg arytmetyczny, w którym $a_1 = 2$ i $r = 3$.',
        qA: 'Oblicz $a_8$ i $S_8$.',
        steps:[
          { step:1, title:'Wyraz ogólny', content:'a_8=2+7\\cdot3=23', explanation:'' },
          { step:2, title:'Suma', content:'S_8=\\frac{8}{2}(2+23)=4\\cdot25=100', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a_8=a_1+7r$.' },
          { level:2, text:'$a_8=23$.' },
          { level:3, text:'$S_8=100$.' }
        ]
      },
      { a1:5, r:-2, n:6,
        an: 5+5*(-2), // -5
        Sn: 6*(5+(-5))/2, // 0
        stmt: 'Dany jest ciąg arytmetyczny, w którym $a_1 = 5$ i $r = -2$.',
        qA: 'Oblicz $a_6$ i $S_6$.',
        steps:[
          { step:1, title:'Wyraz ogólny', content:'a_6=5+5\\cdot(-2)=5-10=-5', explanation:'' },
          { step:2, title:'Suma', content:'S_6=\\frac{6}{2}(5+(-5))=3\\cdot0=0', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a_6=5+5\\cdot(-2)$.' },
          { level:2, text:'$a_6=-5$.' },
          { level:3, text:'$S_6=3\\cdot(5+(-5))=0$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp08_arith'),
      category: 8,
      categoryName: 'Ciągi',
      type: 'arithmetic_seq',
      points: 2,
      params: cfg,
      statement: cfg.stmt + ' ' + cfg.qA + ' Zapisz obliczenia.',
      answer: { type: 'multipart', display: `a_{${cfg.n}}=${cfg.an},\\quad S_{${cfg.n}}=${cfg.Sn}`, description: `$a_{${cfg.n}}=${cfg.an}$, $S_{${cfg.n}}=${cfg.Sn}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT B: Ciąg geometryczny ===
  function geometricSeq() {
    const configs = [
      { a1:2, q:3, n:5,
        // a3=2·3²=18, a5=2·3⁴=162
        a3: 18, a5: 162,
        stmt: 'Ciąg geometryczny: $a_1 = 2$, $a_3 = 18$. Oblicz iloraz $q$ i wyraz $a_5$.',
        steps:[
          { step:1, title:'Wyznaczenie q', content:'a_3=a_1\\cdot q^2\\implies18=2q^2\\implies q^2=9\\implies q=3\\text{ (lub }-3\\text{)}', explanation:'Zakładamy $q>0$.' },
          { step:2, title:'Wyraz a₅', content:'a_5=a_1\\cdot q^4=2\\cdot81=162', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a_3=a_1q^2$.' },
          { level:2, text:'$18=2q^2\\implies q=3$.' },
          { level:3, text:'$a_5=2\\cdot3^4=162$.' }
        ]
      },
      { a1:4, q:2, n:6,
        a3: 16, a5: 64, a6: 128,
        stmt: 'Ciąg geometryczny: $a_1 = 4$, $q = 2$. Oblicz $a_6$ i $S_5$.',
        S5: 4*(Math.pow(2,5)-1)/(2-1), // 4·31=124
        steps:[
          { step:1, title:'Wyraz a₆', content:'a_6=4\\cdot2^5=4\\cdot32=128', explanation:'' },
          { step:2, title:'Suma S₅', content:'S_5=\\frac{a_1(q^5-1)}{q-1}=\\frac{4(32-1)}{1}=4\\cdot31=124', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a_6=a_1q^5$.' },
          { level:2, text:'$a_6=128$.' },
          { level:3, text:'$S_5=\\frac{4(2^5-1)}{1}=124$.' }
        ]
      },
      { a1:3, q:3, n:4,
        a4: 3*27, // 81
        S4: 3*(81-1)/2, // = 3*80/2 = 120
        stmt: 'Ciąg geometryczny: $a_1 = 3$, $q = 3$. Oblicz $a_4$ i $S_4$.',
        steps:[
          { step:1, title:'Wyraz a₄', content:'a_4=3\\cdot3^3=3\\cdot27=81', explanation:'' },
          { step:2, title:'Suma S₄', content:'S_4=\\frac{3(3^4-1)}{3-1}=\\frac{3\\cdot80}{2}=120', explanation:'' }
        ],
        hints:[
          { level:1, text:'$a_4=a_1q^3=3\\cdot27=81$.' },
          { level:2, text:'$S_4=\\frac{a_1(q^4-1)}{q-1}$.' },
          { level:3, text:'$S_4=120$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    const display = cfg.S5 !== undefined
      ? `a_6=${cfg.a6},\\quad S_5=${cfg.S5}`
      : (cfg.S4 !== undefined
          ? `a_4=${cfg.a4},\\quad S_4=${cfg.S4}`
          : `q=${cfg.q},\\quad a_5=${cfg.a5}`);
    return {
      id: M.makeId('pp08_geom'),
      category: 8,
      categoryName: 'Ciągi',
      type: 'geometric_seq',
      points: 2,
      params: cfg,
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'multipart', display, description: `$${display}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  // === SCHEMAT C: Zadanie tekstowe — ciąg w kontekście ===
  function seqWordProblem() {
    const configs = [
      {
        stmt: 'Firma wypłacała premie roczne rosnące o stałą kwotę. W pierwszym roku premia wynosiła $2000$ zł, w czwartym $5000$ zł. ' +
          'Oblicz roczny przyrost premii i łączną kwotę premii przez $6$ lat.',
        // r = (5000-2000)/(4-1) = 1000; S6 = 6/2*(2000+7000)=6/2*9000=27000
        ans: 'r=1000\\text{ zł},\\quad S_6=27\\,000\\text{ zł}',
        steps:[
          { step:1, title:'Wyznaczenie różnicy', content:'r=\\frac{a_4-a_1}{4-1}=\\frac{5000-2000}{3}=1000\\text{ zł}', explanation:'' },
          { step:2, title:'Wyraz a₆', content:'a_6=2000+5\\cdot1000=7000\\text{ zł}', explanation:'' },
          { step:3, title:'Suma S₆', content:'S_6=\\frac{6}{2}(a_1+a_6)=3\\cdot9000=27\\,000\\text{ zł}', explanation:'' }
        ],
        hints:[
          { level:1, text:'Różnica ciągu arytm.: $r=\\frac{a_4-a_1}{3}$.' },
          { level:2, text:'$r=1000$ zł.' },
          { level:3, text:'$S_6=3\\cdot(2000+7000)=27\\,000$ zł.' }
        ]
      },
      {
        stmt: 'Łańcuch sprzedażowy działa tak, że każda osoba pozyskuje $3$ nowych klientów. ' +
          'W pierwszym tygodniu jest $1$ klient, w drugim $3$, w trzecim $9$ itd. ' +
          'Ile klientów łącznie będzie przez $5$ tygodni?',
        // Ciąg geometryczny: a1=1, q=3, S5 = (3^5-1)/(3-1) = 242/2 = 121
        ans: 'S_5 = 121',
        steps:[
          { step:1, title:'Wzór', content:'a_k=3^{k-1},\\quad q=3', explanation:'' },
          { step:2, title:'Suma S₅', content:'S_5=\\frac{3^5-1}{3-1}=\\frac{242}{2}=121', explanation:'' }
        ],
        hints:[
          { level:1, text:'To ciąg geometryczny z $a_1=1$, $q=3$.' },
          { level:2, text:'$S_n=\\frac{a_1(q^n-1)}{q-1}$.' },
          { level:3, text:'$S_5=\\frac{3^5-1}{2}=121$.' }
        ]
      },
    ];
    const cfg = M.choose(configs);
    return {
      id: M.makeId('pp08_word'),
      category: 8,
      categoryName: 'Ciągi',
      type: 'seq_word',
      points: 3,
      params: {},
      statement: cfg.stmt + ' Zapisz obliczenia.',
      answer: { type: 'expression', display: cfg.ans, description: `$${cfg.ans}$` },
      hints: cfg.hints,
      solution: cfg.steps
    };
  }

  function generate() {
    return M.choose([arithmeticSeq, geometricSeq, seqWordProblem])();
  }

  return { generate };
})();
