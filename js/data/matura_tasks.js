// Bank prawdziwych zadań z matur (CKE, poziom rozszerzony)
// Format identyczny z generatorami: { id, year, number, category, statement, answer, hints, solution }
window.MaturaTasks = (() => {

  const TASKS = [

    // ============ MATURA 2026 ============
    {
      id: 'm2026_z4', year: 2026, number: 4, category: 4, categoryName: 'Styczna do wykresu', points: 4,
      statement: 'Funkcja $f$ jest określona wzorem\n$$f(x) = \\dfrac{x^3}{3} - x^2$$\ndla każdej liczby rzeczywistej $x$. Punkt $P = (3,\\ f(3))$ należy do wykresu funkcji $f$.\n\nProsta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.',
      answer: { type: 'multipart', display: 'a = 3,\\ b = -9', description: '$a = 3$, $b = -9$' },
      hints: [
        { level: 1, text: 'Współczynnik $a = f\'(x_0)$, gdzie $x_0 = 3$.' },
        { level: 2, text: '$f\'(x) = x^2 - 2x$. Oblicz $f(3)$ i $f\'(3)$.' },
        { level: 3, text: '$f(3) = 0$, $f\'(3) = 3$. Styczna przechodzi przez $(3,0)$, więc $b = 0 - 3\\cdot3$.' }
      ],
      solution: [
        { step: 1, title: 'Obliczenie $f(3)$', content: 'f(3) = \\dfrac{27}{3} - 9 = 9 - 9 = 0', explanation: '' },
        { step: 2, title: 'Pochodna', content: 'f\'(x) = x^2 - 2x', explanation: '' },
        { step: 3, title: 'Współczynnik kierunkowy', content: 'a = f\'(3) = 9 - 6 = 3', explanation: '' },
        { step: 4, title: 'Wyraz wolny', content: 'b = f(3) - a \\cdot 3 = 0 - 9 = -9', explanation: 'Styczna przechodzi przez $P=(3,0)$.' },
        { step: 5, title: 'Wynik', content: 'y = 3x - 9', explanation: '' }
      ]
    },
    {
      id: 'm2026_z6', year: 2026, number: 6, category: 7, categoryName: 'Ciągi liczbowe', points: 4,
      statement: 'Ciąg arytmetyczny $(a_n)$ spełnia warunki:\n$$a_3 + a_7 = 20 \\qquad \\text{oraz} \\qquad a_3 \\cdot a_7 = 64$$\n\n**Oblicz sumę 10 pierwszych wyrazów tego ciągu. Rozważ wszystkie przypadki.** Zapisz obliczenia.',
      answer: { type: 'expression', display: 'S_{10} = 115\\ \\text{lub}\\ S_{10} = 85', description: '$S_{10} = 115$ lub $S_{10} = 85$' },
      hints: [
        { level: 1, text: 'Oznacz $a_3 = p$, $a_7 = q$. Masz $p+q=20$ i $pq=64$ — rozwiąż układ.' },
        { level: 2, text: '$p$ i $q$ są pierwiastkami $t^2-20t+64=0$. Stąd $\\{p,q\\}=\\{4,16\\}$.' },
        { level: 3, text: 'W ciągu arytmetycznym $a_7-a_3=4d$. Wyznacz $d$ i $a_1$, potem $S_{10} = \\frac{10}{2}(2a_1+9d)$.' }
      ],
      solution: [
        { step: 1, title: 'Wyznaczenie $a_3$ i $a_7$', content: 't^2 - 20t + 64 = 0\\\\ (t-4)(t-16)=0 \\implies t=4 \\text{ lub } t=16', explanation: '$a_3$ i $a_7$ są pierwiastkami.' },
        { step: 2, title: 'Przypadek 1: $a_3=4$, $a_7=16$', content: 'd = \\dfrac{16-4}{4} = 3,\\quad a_1 = 4 - 2\\cdot3 = -2\\\\ S_{10} = \\tfrac{10}{2}(2\\cdot(-2)+9\\cdot3) = 5\\cdot23 = 115', explanation: '' },
        { step: 3, title: 'Przypadek 2: $a_3=16$, $a_7=4$', content: 'd = \\dfrac{4-16}{4} = -3,\\quad a_1 = 16 - 2\\cdot(-3) = 22\\\\ S_{10} = \\tfrac{10}{2}(2\\cdot22+9\\cdot(-3)) = 5\\cdot17 = 85', explanation: '' }
      ]
    },
    {
      id: 'm2026_z7', year: 2026, number: 7, category: 8, categoryName: 'Planimetria', points: 3,
      statement: 'W trójkącie $ABC$ krawędzie spełniają: $|AB| = 6$, $|BC| = 8$ i $\\angle ABC = 60^\\circ$.\n\n**Oblicz długość boku $|AC|$.** Zapisz obliczenia.',
      answer: { type: 'expression', display: '|AC| = 2\\sqrt{13}', description: '$|AC| = 2\\sqrt{13}$' },
      hints: [
        { level: 1, text: 'Zastosuj twierdzenie cosinusów dla kąta przy wierzchołku $B$.' },
        { level: 2, text: '$|AC|^2 = |AB|^2 + |BC|^2 - 2\\cdot|AB|\\cdot|BC|\\cdot\\cos(\\angle ABC)$.' },
        { level: 3, text: '$|AC|^2 = 36 + 64 - 96\\cdot\\tfrac{1}{2} = 52$.' }
      ],
      solution: [
        { step: 1, title: 'Twierdzenie cosinusów', content: '|AC|^2 = |AB|^2 + |BC|^2 - 2\\cdot|AB|\\cdot|BC|\\cdot\\cos(60^\\circ)', explanation: 'Kąt $60^\\circ$ jest przy wierzchołku $B$.' },
        { step: 2, title: 'Obliczenie', content: '|AC|^2 = 36 + 64 - 2\\cdot6\\cdot8\\cdot\\tfrac{1}{2} = 100 - 48 = 52', explanation: '$\\cos60^\\circ = \\tfrac{1}{2}$.' },
        { step: 3, title: 'Wynik', content: '|AC| = \\sqrt{52} = 2\\sqrt{13}', explanation: '' }
      ]
    },
    {
      id: 'm2026_z9', year: 2026, number: 9, category: 10, categoryName: 'Stereometria', points: 4,
      statement: 'Ostrosłup prawidłowy czworokątny ma krawędź podstawy długości $a = 6$. Kąt między ścianą boczną a podstawą wynosi $60^\\circ$.\n\n**Oblicz objętość tego ostrosłupa.** Zapisz obliczenia.',
      answer: { type: 'expression', display: 'V = 36\\sqrt{3}', description: '$V = 36\\sqrt{3}$' },
      hints: [
        { level: 1, text: 'Kąt między ścianą boczną a podstawą mierzy się wzdłuż apotemy ściany bocznej w punkcie środka krawędzi podstawy.' },
        { level: 2, text: 'Apotema podstawy (odległość od środka do środka krawędzi) = $a/2 = 3$. Stąd $\\tan60^\\circ = h/3$.' },
        { level: 3, text: '$h = 3\\sqrt{3}$. Oblicz $V = \\frac{1}{3}a^2h$.' }
      ],
      solution: [
        { step: 1, title: 'Apotema podstawy', content: 'm = \\dfrac{a}{2} = 3', explanation: 'Odległość od środka podstawy do środka krawędzi.' },
        { step: 2, title: 'Wysokość ostrosłupa', content: '\\tan 60^\\circ = \\dfrac{h}{m} \\implies h = 3\\tan60^\\circ = 3\\sqrt{3}', explanation: 'Kąt dwuścienny wynosi $60°$.' },
        { step: 3, title: 'Objętość', content: 'V = \\dfrac{1}{3}\\cdot a^2 \\cdot h = \\dfrac{1}{3}\\cdot 36 \\cdot 3\\sqrt{3} = 36\\sqrt{3}', explanation: '' }
      ]
    },
    {
      id: 'm2026_z11', year: 2026, number: 11, category: 11, categoryName: 'Geometria analityczna', points: 4,
      statement: 'Dany jest okrąg $k$ o równaniu\n$$x^2 + y^2 - 4x + 6y - 12 = 0$$\n\nPunkt $P = (5,\\ 1)$ należy do okręgu $k$.\n\n**Wyznacz równanie stycznej do okręgu $k$ w punkcie $P$.** Zapisz obliczenia.',
      answer: { type: 'expression', display: '3x + 4y = 19', description: 'Równanie stycznej: $3x + 4y = 19$' },
      hints: [
        { level: 1, text: 'Wyznacz środek $S$ okręgu przez uzupełnienie do kwadratu.' },
        { level: 2, text: 'Styczna w $P$ jest prostopadła do promienia $SP$.' },
        { level: 3, text: 'Nachylenie $SP$: $\\frac{1-(-3)}{5-2} = \\frac{4}{3}$. Nachylenie stycznej: $-\\frac{3}{4}$.' }
      ],
      solution: [
        { step: 1, title: 'Postać kanoniczna', content: '(x-2)^2 + (y+3)^2 = 4+9+12 = 25', explanation: 'Środek $S=(2,-3)$, promień $r=5$.' },
        { step: 2, title: 'Weryfikacja punktu $P$', content: '(5-2)^2+(1+3)^2 = 9+16=25\\checkmark', explanation: '' },
        { step: 3, title: 'Nachylenie promienia $SP$', content: 'k_{SP} = \\dfrac{1-(-3)}{5-2} = \\dfrac{4}{3}', explanation: '' },
        { step: 4, title: 'Równanie stycznej', content: 'y - 1 = -\\dfrac{3}{4}(x-5)\\\\ 4y-4 = -3x+15\\\\ 3x+4y=19', explanation: 'Styczna $\\perp$ promieniowi.' }
      ]
    },
    {
      id: 'm2026_z3', year: 2026, number: 3, category: 5, categoryName: 'Dowód nierówności', points: 3,
      statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $x$ i $y$ prawdziwa jest nierówność\n$$\\frac{1}{x} + \\frac{1}{y} \\leq \\frac{x}{y^2} + \\frac{y}{x^2}$$',
      answer: { type: 'proof', display: '(x+y)(x-y)^2 \\geq 0', description: 'Dowód przez przekształcenie do $(x+y)(x-y)^2 \\geq 0$' },
      hints: [
        { level: 1, text: 'Przenieś wszystko na jedną stronę i sprowadź do wspólnego mianownika $x^2y^2$.' },
        { level: 2, text: 'Licznik to $x^3 + y^3 - x^2y - xy^2$. Wyłącz $(x-y)$.' },
        { level: 3, text: 'Rozkład: $x^3+y^3-x^2y-xy^2 = (x+y)(x-y)^2 \\geq 0$.' }
      ],
      solution: [
        { step: 1, title: 'Przeniesienie', content: '\\frac{x}{y^2} + \\frac{y}{x^2} - \\frac{1}{x} - \\frac{1}{y} \\geq 0', explanation: '' },
        { step: 2, title: 'Wspólny mianownik $x^2y^2$', content: '\\frac{x^3 + y^3 - x^2y - xy^2}{x^2y^2}', explanation: '$x^2y^2 > 0$' },
        { step: 3, title: 'Rozkład licznika', content: 'x^3+y^3-x^2y-xy^2 = x^2(x-y) - y^2(x-y) = (x+y)(x-y)^2', explanation: '' },
        { step: 4, title: 'Wniosek', content: '\\frac{(x+y)(x-y)^2}{x^2y^2} \\geq 0\\quad\\blacksquare', explanation: '$(x-y)^2 \\geq 0$, $x+y>0$, $x^2y^2>0$.' }
      ]
    },
    {
      id: 'm2026_z5', year: 2026, number: 5, category: 6, categoryName: 'Nierówność z |…|', points: 4,
      statement: 'Rozwiąż nierówność\n$$|2x - 6| - |x^2 - 9| < 0$$\nZapisz obliczenia.',
      answer: { type: 'interval', display: 'x \\in (-\\infty,-5)\\cup(-1,3)\\cup(3,+\\infty)', description: 'Zbiór rozwiązań: $x \\in (-\\infty,-5)\\cup(-1,3)\\cup(3,+\\infty)$' },
      hints: [
        { level: 1, text: 'Rozłóż: $2x-6 = 2(x-3)$, $x^2-9 = (x-3)(x+3)$, więc $|x^2-9| = |x-3|\\cdot|x+3|$.' },
        { level: 2, text: 'Wyłącz $|x-3|$. Przypadek $x=3$ sprawdź osobno.' },
        { level: 3, text: 'Po skróceniu: $2 < |x+3|$, czyli $x+3 > 2$ lub $x+3 < -2$.' }
      ],
      solution: [
        { step: 1, title: 'Przekształcenie', content: '|2x-6| < |x^2-9|\\\\ 2|x-3| < |x+3|\\cdot|x-3|', explanation: '$x^2-9=(x+3)(x-3)$' },
        { step: 2, title: 'Przypadek $x = 3$', content: '\\text{LS}=0,\\ \\text{PS}=0;\\ 0<0 - \\text{fałsz. Odrzucamy } x=3', explanation: '' },
        { step: 3, title: 'Przypadek $x \\neq 3$', content: '2 < |x+3| \\iff x > -1 \\text{ lub } x < -5', explanation: 'Dzielimy przez $|x-3|>0$.' },
        { step: 4, title: 'Odpowiedź', content: 'x \\in (-\\infty,-5)\\cup(-1,3)\\cup(3,+\\infty)', explanation: '' }
      ]
    },

    // ============ MATURA 2025 ============
    {
      id: 'm2025_z3', year: 2025, number: 3, category: 12, categoryName: 'Parametr w równaniu', points: 4,
      statement: 'Dane jest równanie\n$$x^2 + 2mx + m + 6 = 0$$\ngdzie $m$ jest parametrem rzeczywistym.\n\n**Wyznacz wszystkie wartości parametru $m$, dla których to równanie ma dwa różne pierwiastki rzeczywiste dodatnie.** Zapisz obliczenia.',
      answer: { type: 'interval', display: 'm \\in (-6,\\,-2)', description: '$m \\in (-6,\\ -2)$' },
      hints: [
        { level: 1, text: 'Trzy warunki naraz: $\\Delta > 0$, suma pierwiastków $> 0$, iloczyn pierwiastków $> 0$.' },
        { level: 2, text: '$\\Delta > 0$: $(m-3)(m+2)>0$, więc $m<-2$ lub $m>3$. Suma $=-2m>0$ daje $m<0$. Iloczyn $=m+6>0$ daje $m>-6$.' },
        { level: 3, text: 'Przekrój: $m<-2$ i $m<0$ i $m>-6$ daje $m\\in(-6,-2)$.' }
      ],
      solution: [
        { step: 1, title: 'Wyróżnik $\\Delta > 0$', content: '\\Delta = 4m^2 - 4(m+6) = 4(m^2-m-6) = 4(m-3)(m+2)\\\\ (m-3)(m+2)>0 \\iff m<-2\\ \\text{lub}\\ m>3', explanation: '' },
        { step: 2, title: 'Suma pierwiastków $> 0$', content: 'x_1+x_2 = -2m > 0 \\iff m < 0', explanation: 'Wzór Viète\'a.' },
        { step: 3, title: 'Iloczyn pierwiastków $> 0$', content: 'x_1 x_2 = m+6 > 0 \\iff m > -6', explanation: '' },
        { step: 4, title: 'Przekrój warunków', content: 'm \\in (-6,-2)', explanation: '$m<-2$ i $m<0$ i $m>-6$.' }
      ]
    },
    {
      id: 'm2025_z4', year: 2025, number: 4, category: 4, categoryName: 'Styczna do wykresu', points: 4,
      statement: 'Funkcja $f$ jest określona wzorem\n$$f(x) = 2x^2 + x + 1$$\ndla każdej liczby rzeczywistej $x$. Punkt $P = (1,\\ f(1))$ należy do wykresu funkcji $f$.\n\nProsta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.',
      answer: { type: 'multipart', display: 'a = 5,\\ b = -1', description: '$a = 5$, $b = -1$' },
      hints: [
        { level: 1, text: '$a = f\'(1)$.' },
        { level: 2, text: '$f\'(x) = 4x+1$, więc $f\'(1) = 5$.' },
        { level: 3, text: '$f(1) = 4$. Styczna: $b = 4 - 5\\cdot1 = -1$.' }
      ],
      solution: [
        { step: 1, title: 'Obliczenie $f(1)$', content: 'f(1) = 2+1+1 = 4', explanation: '' },
        { step: 2, title: 'Pochodna', content: 'f\'(x) = 4x+1,\\quad f\'(1) = 5', explanation: '' },
        { step: 3, title: 'Wynik', content: 'a = 5,\\quad b = 4 - 5\\cdot1 = -1\\\\ y = 5x - 1', explanation: '' }
      ]
    },
    {
      id: 'm2025_z2', year: 2025, number: 2, category: 5, categoryName: 'Dowód nierówności', points: 3,
      statement: 'Wykaż, że dla każdej dodatniej liczby rzeczywistej $a$ i dla każdej dodatniej liczby rzeczywistej $b$ takiej, że $b \\neq \\frac{1}{2}a$, prawdziwa jest nierówność\n$$(a + 2b)^3 > 8a^2b + 16ab^2$$',
      answer: { type: 'proof', display: '(a+2b)(a-2b)^2 > 0', description: 'Dowód przez wyłączenie czynnika $(a+2b)$ i $(a-2b)^2$.' },
      hints: [
        { level: 1, text: 'Prawa strona $= 8ab(a+2b)$. Przenieś na lewą i wyłącz $(a+2b)$.' },
        { level: 2, text: 'Zostaje $(a+2b)^2 - 8ab = (a-2b)^2$.' },
        { level: 3, text: '$(a+2b)(a-2b)^2$: pierwszy czynnik $>0$, drugi $>0$ bo $b \\neq a/2$.' }
      ],
      solution: [
        { step: 1, title: 'Wyłączenie z prawej', content: '8a^2b + 16ab^2 = 8ab(a+2b)', explanation: '' },
        { step: 2, title: 'Różnica', content: '(a+2b)^3 - 8ab(a+2b) = (a+2b)\\bigl[(a+2b)^2 - 8ab\\bigr]', explanation: '' },
        { step: 3, title: 'Uproszczenie', content: '(a+2b)^2 - 8ab = a^2-4ab+4b^2 = (a-2b)^2', explanation: '' },
        { step: 4, title: 'Wniosek', content: '(a+2b)(a-2b)^2 > 0\\quad\\blacksquare', explanation: '$a+2b>0$ bo $a,b>0$; $(a-2b)^2>0$ bo $b \\neq a/2$.' }
      ]
    },
    {
      id: 'm2025_z5', year: 2025, number: 5, category: 6, categoryName: 'Nierówność z |…|', points: 4,
      statement: 'Rozwiąż nierówność\n$$|x - 2| - 2 \\cdot |x + 3| < -2$$\nZapisz obliczenia.',
      answer: { type: 'interval', display: 'x \\in (-\\infty,\\,-10)\\cup\\left(-\\tfrac{2}{3},\\,+\\infty\\right)', description: 'Zbiór rozwiązań: $x \\in (-\\infty,-10)\\cup(-\\tfrac{2}{3},+\\infty)$' },
      hints: [
        { level: 1, text: 'Podziel na trzy przypadki względem punktów $x=-3$ i $x=2$.' },
        { level: 2, text: 'W każdym przedziale opuść moduły uwzględniając znaki.' },
        { level: 3, text: 'Uwaga: przy dzieleniu przez $-3$ odwraca się nierówność!' }
      ],
      solution: [
        { step: 1, title: 'Punkty podziału', content: 'x_1 = -3,\\quad x_2 = 2', explanation: 'Zerują wyrażenia w modułach.' },
        { step: 2, title: 'Przypadek $x < -3$', content: '-(x-2)-2(-(x+3))<-2\\\\ x+8<-2 \\implies x<-10', explanation: '$x-2<0,\\ x+3<0$' },
        { step: 3, title: 'Przypadek $-3 \\leq x < 2$', content: '-(x-2)-2(x+3)<-2\\\\ -3x-4<-2 \\implies x>-\\tfrac{2}{3}', explanation: 'Dzielenie przez $-3$: odwracamy nierówność!' },
        { step: 4, title: 'Przypadek $x \\geq 2$', content: '(x-2)-2(x+3)<-2\\\\ -x-8<-2 \\implies x>-6 - \\text{zawsze spełnione}', explanation: '' },
        { step: 5, title: 'Suma rozwiązań', content: 'x \\in (-\\infty,-10)\\cup(-\\tfrac{2}{3},+\\infty)', explanation: '' }
      ]
    },
    {
      id: 'm2025_z6', year: 2025, number: 6, category: 7, categoryName: 'Ciągi liczbowe', points: 4,
      statement: 'Ciąg $(a_n)$, określony dla każdej liczby naturalnej $n \\geq 1$, jest geometryczny i zbieżny. W tym ciągu $a_1 + a_3 = 20$ i $a_1^2 + a_3^2 = 328$.\n\n**Oblicz sumę wszystkich wyrazów tego ciągu. Rozważ wszystkie przypadki.** Zapisz obliczenia.',
      answer: { type: 'expression', display: 'S = 27 \\text{ lub } S = \\frac{27}{2}', description: 'Suma $S = 27$ lub $S = \\tfrac{27}{2}$' },
      hints: [
        { level: 1, text: 'Oznacz $a_1 = p$. Wtedy $a_3 = pq^2$, gdzie $|q|<1$.' },
        { level: 2, text: 'Oblicz $(p+pq^2)^2 = 400$ i odejmij $p^2 + p^2q^4 = 328$, otrzymasz $2p^2q^2 = 72$, czyli $pq = \\pm 6$.' },
        { level: 3, text: 'Z układu $p+pq^2=20$ i $pq=\\pm6$ wyznacz $p$ i $q$, a następnie $S = \\frac{p}{1-q}$.' }
      ],
      solution: [
        { step: 1, title: 'Układ równań', content: '\\begin{cases} p + pq^2 = 20 \\\\ p^2 + p^2q^4 = 328 \\end{cases}', explanation: '$a_3 = pq^2$' },
        { step: 2, title: 'Kwadrat sumy', content: '(p+pq^2)^2 = 400\\\\ p^2 + 2p^2q^2 + p^2q^4 = 400\\\\ 328 + 2p^2q^2 = 400 \\implies p^2q^2 = 36', explanation: '' },
        { step: 3, title: 'Wartości pq', content: 'pq = 6 \\text{ lub } pq = -6', explanation: '' },
        { step: 4, title: 'Przypadek $pq=6$', content: 'q = 6/p,\\quad p + p \\cdot 36/p^2 = 20 \\implies p + 36/p = 20\\\\ p^2 - 20p + 36 = 0\\\\ p = 18 \\text{ lub } p = 2', explanation: 'Tylko $p=18,q=1/3$ daje $|q|<1$.' },
        { step: 5, title: 'Suma — przypadek $pq=6$', content: 'p=18,\\ q=\\tfrac{1}{3}:\\ S = \\dfrac{18}{1-\\frac{1}{3}} = \\dfrac{18}{\\frac{2}{3}} = 27\\\\ p=2,\\ q=3:\\ |q|\\geq1 \\text{ — odrzucamy}', explanation: '' },
        { step: 6, title: 'Suma — przypadek $pq=-6$', content: 'p=18,\\ q=-\\tfrac{1}{3}:\\ S = \\dfrac{18}{1+\\frac{1}{3}} = \\dfrac{18}{\\frac{4}{3}} = \\dfrac{27}{2}\\\\ p=2,\\ q=-3:\\ |q|>1 \\text{ — odrzucamy}', explanation: '' },
        { step: 7, title: 'Odpowiedź', content: 'S = 27 \\quad\\text{lub}\\quad S = \\dfrac{27}{2}', explanation: 'Dwa przypadki zbieżności.' }
      ]
    },

    // ============ MATURA 2024 ============
    {
      id: 'm2024_z3', year: 2024, number: 3, category: 12, categoryName: 'Parametr w równaniu', points: 4,
      statement: 'Dane jest równanie\n$$x^2 - (m+1)x + m = 0$$\nz niewiadomą $x$, gdzie $m$ jest parametrem rzeczywistym.\n\n**Wyznacz wszystkie wartości parametru $m$, dla których to równanie ma dwa różne pierwiastki rzeczywiste $x_1$ i $x_2$ spełniające warunek $x_1^2 + x_2^2 = 5$.** Zapisz obliczenia.',
      answer: { type: 'set', display: 'm = -2 \\text{ lub } m = 2', description: '$m \\in \\{-2,\\ 2\\}$' },
      hints: [
        { level: 1, text: 'Δ > 0: $(m+1)^2 - 4m > 0 \\iff (m-1)^2 > 0 \\iff m \\neq 1$.' },
        { level: 2, text: 'Wzory Viète\'a: $x_1+x_2 = m+1$, $x_1 x_2 = m$.' },
        { level: 3, text: '$x_1^2+x_2^2 = (m+1)^2 - 2m = m^2 + 1 = 5 \\implies m^2 = 4$.' }
      ],
      solution: [
        { step: 1, title: 'Wyróżnik', content: '\\Delta = (m+1)^2 - 4m = m^2 - 2m + 1 = (m-1)^2', explanation: '' },
        { step: 2, title: 'Warunek dwóch pierwiastków', content: '(m-1)^2 > 0 \\iff m \\neq 1', explanation: '' },
        { step: 3, title: 'Wzory Viète\'a', content: 'x_1 + x_2 = m+1,\\quad x_1 x_2 = m', explanation: '' },
        { step: 4, title: 'Warunek', content: 'x_1^2+x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = (m+1)^2 - 2m = m^2 + 1', explanation: '' },
        { step: 5, title: 'Rozwiązanie', content: 'm^2 + 1 = 5 \\implies m^2 = 4 \\implies m = -2 \\text{ lub } m = 2', explanation: 'Oba $\\neq 1$, więc spełniają warunek dwóch pierwiastków.' }
      ]
    },
    {
      id: 'm2024_z4', year: 2024, number: 4, category: 4, categoryName: 'Styczna do wykresu', points: 4,
      statement: 'Funkcja $f$ jest określona wzorem\n$$f(x) = \\frac{x^3 - 3x + 2}{x}$$\ndla każdej liczby rzeczywistej $x \\neq 0$. Punkt $P = (2,\\ f(2))$ należy do wykresu funkcji $f$.\n\nProsta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.',
      answer: { type: 'multipart', display: 'a = \\frac{7}{2},\\quad b = -5', description: '$a = \\tfrac{7}{2}$, $b = -5$' },
      hints: [
        { level: 1, text: 'Uprość $f(x) = x^2 - 3 + \\frac{2}{x}$.' },
        { level: 2, text: '$f\'(x) = 2x - \\frac{2}{x^2}$. Oblicz $f(2)$ i $f\'(2)$.' },
        { level: 3, text: '$a = f\'(2) = 4 - \\tfrac{1}{2} = \\tfrac{7}{2}$; $b = f(2) - a \\cdot 2$.' }
      ],
      solution: [
        { step: 1, title: 'Uproszczenie f', content: 'f(x) = x^2 - 3 + \\frac{2}{x}', explanation: 'Dzielimy każdy wyraz przez $x$.' },
        { step: 2, title: 'Wartość f(2)', content: 'f(2) = 4 - 3 + 1 = 2', explanation: '' },
        { step: 3, title: 'Pochodna', content: 'f\'(x) = 2x - \\frac{2}{x^2}', explanation: '' },
        { step: 4, title: 'Wartość f\'(2)', content: 'f\'(2) = 4 - \\frac{2}{4} = 4 - \\frac{1}{2} = \\frac{7}{2}', explanation: '' },
        { step: 5, title: 'Wyznaczenie a, b', content: 'a = \\frac{7}{2}\\\\ b = f(2) - a \\cdot 2 = 2 - \\frac{7}{2} \\cdot 2 = 2 - 7 = -5', explanation: 'Styczna przechodzi przez $P=(2,2)$.' }
      ]
    },
    {
      id: 'm2024_z5', year: 2024, number: 5, category: 3, categoryName: 'Logarytmy', points: 3,
      statement: 'Wykaż, że jeżeli $\\log_5 4 = a$ oraz $\\log_4 3 = b$, to\n$$\\log_{12} 80 = \\frac{2a + 1}{a(1 + b)}$$',
      answer: { type: 'proof', display: '\\log_{12} 80 = \\frac{2a+1}{a(1+b)}', description: 'Dowód przez zmianę podstawy i wyrażenie wszystkiego przez log 4.' },
      hints: [
        { level: 1, text: 'Zmień podstawę: $\\log_{12} 80 = \\frac{\\log 80}{\\log 12}$.' },
        { level: 2, text: '$\\log 80 = 2\\log 4 + \\log 5$, $\\log 12 = \\log 4 + \\log 3$.' },
        { level: 3, text: 'Z $a = \\frac{\\log 4}{\\log 5}$ wyznacz $\\log 5 = \\frac{\\log 4}{a}$. Z $b$ wyznacz $\\log 3 = b\\log 4$.' }
      ],
      solution: [
        { step: 1, title: 'Zmiana podstawy', content: '\\log_{12} 80 = \\frac{\\log 80}{\\log 12} = \\frac{\\log(16\\cdot 5)}{\\log(4\\cdot 3)} = \\frac{2\\log 4 + \\log 5}{\\log 4 + \\log 3}', explanation: '' },
        { step: 2, title: 'Wyrażenie log5 i log3', content: 'a = \\log_5 4 = \\frac{\\log 4}{\\log 5} \\implies \\log 5 = \\frac{\\log 4}{a}\\\\ b = \\log_4 3 = \\frac{\\log 3}{\\log 4} \\implies \\log 3 = b\\log 4', explanation: '' },
        { step: 3, title: 'Podstawienie', content: '\\frac{2\\log 4 + \\frac{\\log 4}{a}}{\\log 4 + b\\log 4} = \\frac{\\log 4(2 + \\frac{1}{a})}{\\log 4(1+b)} = \\frac{\\frac{2a+1}{a}}{1+b} = \\frac{2a+1}{a(1+b)}\\quad\\blacksquare', explanation: 'Skracamy log4.' }
      ]
    },
    {
      id: 'm2024_z8', year: 2024, number: 8, category: 8, categoryName: 'Planimetria', points: 3,
      statement: 'Dany jest trójkąt $ABC$, w którym $|AB| = c$, $|BC| = a$, $|AC| = b$ oraz $\\angle ABC = \\beta$.\n\n**Wykaż, że jeżeli** $\\cos \\beta = -\\dfrac{1}{3}$, **to** $b^2 = a^2 + c^2 + \\dfrac{2}{3}ac$.',
      answer: { type: 'proof', display: 'b^2 = a^2+c^2+\\tfrac{2}{3}ac', description: 'Bezpośrednio z twierdzenia cosinusów dla kąta $\\beta = \\angle ABC$.' },
      hints: [
        { level: 1, text: 'Twierdzenie cosinusów dla boku $b$ (naprzeciw kąta $\\beta$): $b^2 = a^2 + c^2 - 2ac\\cos\\beta$.' },
        { level: 2, text: 'Podstaw $\\cos\\beta = -\\tfrac{1}{3}$.' },
        { level: 3, text: '$-2ac \\cdot (-\\tfrac{1}{3}) = \\tfrac{2}{3}ac$.' }
      ],
      solution: [
        { step: 1, title: 'Twierdzenie cosinusów', content: 'b^2 = a^2 + c^2 - 2ac\\cos\\beta', explanation: 'Bok $b$ jest naprzeciw kąta $\\beta$ w wierzchołku $B$.' },
        { step: 2, title: 'Podstawienie', content: 'b^2 = a^2 + c^2 - 2ac\\cdot\\left(-\\tfrac{1}{3}\\right) = a^2 + c^2 + \\tfrac{2}{3}ac\\quad\\blacksquare', explanation: '' }
      ]
    },
    {
      id: 'm2024_z6', year: 2024, number: 6, category: 7, categoryName: 'Ciągi liczbowe', points: 4,
      statement: 'W ciągu geometrycznym $(a_n)$ zachodzi $a_2 = 6$ i $a_5 = 48$.\n\n**Wyznacz pierwszy wyraz i iloraz tego ciągu. Oblicz sumę 6 pierwszych wyrazów.** Zapisz obliczenia.',
      answer: { type: 'expression', display: 'a_1=3,\\ q=2,\\ S_6=189', description: '$a_1 = 3$, $q = 2$, $S_6 = 189$' },
      hints: [
        { level: 1, text: '$a_5/a_2 = q^3$.' },
        { level: 2, text: '$q^3 = 48/6 = 8$, więc $q = 2$.' },
        { level: 3, text: '$a_1 = a_2/q = 3$. $S_6 = a_1 \\cdot \\frac{q^6-1}{q-1}$.' }
      ],
      solution: [
        { step: 1, title: 'Iloraz', content: '\\dfrac{a_5}{a_2} = q^3 = \\dfrac{48}{6} = 8 \\implies q = 2', explanation: '' },
        { step: 2, title: 'Pierwszy wyraz', content: 'a_1 = \\dfrac{a_2}{q} = \\dfrac{6}{2} = 3', explanation: '' },
        { step: 3, title: 'Suma $S_6$', content: 'S_6 = 3 \\cdot \\dfrac{2^6-1}{2-1} = 3 \\cdot 63 = 189', explanation: '$2^6 = 64$.' }
      ]
    },

    // ============ MATURA 2023 ============
    {
      id: 'm2023_z7', year: 2023, number: 7, category: 9, categoryName: 'Równania trygonometryczne', points: 4,
      statement: 'Rozwiąż równanie\n$$2\\sin^2 x - 3\\sin x + 1 = 0$$\ndla $x \\in [0,\\ 2\\pi)$. Zapisz obliczenia.',
      answer: { type: 'set', display: 'x \\in \\left\\{\\dfrac{\\pi}{6},\\ \\dfrac{\\pi}{2},\\ \\dfrac{5\\pi}{6}\\right\\}', description: '$x \\in \\{\\tfrac{\\pi}{6},\\ \\tfrac{\\pi}{2},\\ \\tfrac{5\\pi}{6}\\}$' },
      hints: [
        { level: 1, text: 'Podstaw $t = \\sin x$. Rozwiąż $2t^2 - 3t + 1 = 0$.' },
        { level: 2, text: '$(2t-1)(t-1)=0 \\implies t = \\tfrac{1}{2}$ lub $t = 1$.' },
        { level: 3, text: '$\\sin x = \\tfrac{1}{2}$: $x = \\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$. $\\sin x = 1$: $x = \\tfrac{\\pi}{2}$.' }
      ],
      solution: [
        { step: 1, title: 'Podstawienie', content: 't = \\sin x: \\quad 2t^2 - 3t + 1 = 0', explanation: '' },
        { step: 2, title: 'Rozkład', content: '(2t-1)(t-1) = 0 \\implies t = \\tfrac{1}{2}\\ \\text{lub}\\ t = 1', explanation: '' },
        { step: 3, title: 'Rozwiązania', content: '\\sin x = \\tfrac{1}{2}: x = \\tfrac{\\pi}{6}\\ \\text{lub}\\ \\tfrac{5\\pi}{6}\\\\ \\sin x = 1: x = \\tfrac{\\pi}{2}', explanation: '' }
      ]
    },
    {
      id: 'm2023_z10', year: 2023, number: 10, category: 7, categoryName: 'Ciągi liczbowe', points: 5,
      statement: 'Pewien kwadrat $K_1$ ma bok długości $a > 0$. Bok kwadratu $K_2$ jest przekątną kwadratu $K_1$. Bok kwadratu $K_3$ jest przekątną kwadratu $K_2$ itd. Pola tych kwadratów tworzą ciąg geometryczny.\n\n**Wyznacz iloraz tego ciągu oraz oblicz sumę pól wszystkich tych kwadratów, jeżeli $a = 1$.** Następnie wyjaśnij dlaczego suma jest skończona lub nieskończona.',
      answer: { type: 'expression', display: 'q = 2,\\ \\text{suma rozbieżna}', description: 'Iloraz $q=2$, suma jest rozbieżna (do $+\\infty$)' },
      hints: [
        { level: 1, text: 'Przekątna kwadratu o boku $a$ ma długość $a\\sqrt{2}$, więc pole kolejnego kwadratu jest $2$ razy większe.' },
        { level: 2, text: '$q = 2 > 1$, więc szereg geometryczny jest rozbieżny.' },
        { level: 3, text: 'Suma pól rośnie nieskończenie: $1 + 2 + 4 + 8 + \\ldots = +\\infty$.' }
      ],
      solution: [
        { step: 1, title: 'Bok kolejnego kwadratu', content: '\\text{bok}_{n+1} = \\text{bok}_n \\cdot \\sqrt{2}', explanation: 'Przekątna kwadratu o boku $a$ to $a\\sqrt{2}$.' },
        { step: 2, title: 'Pole', content: 'P_{n+1} = (\\text{bok}_n\\sqrt{2})^2 = 2 P_n', explanation: '' },
        { step: 3, title: 'Iloraz', content: 'q = \\frac{P_{n+1}}{P_n} = 2', explanation: '' },
        { step: 4, title: 'Suma', content: '|q| = 2 \\geq 1, \\text{ więc szereg geometryczny jest rozbieżny.}\\\\ \\text{Suma pól: } +\\infty', explanation: 'Warunek zbieżności: $|q| < 1$.' }
      ]
    },

    {
      id: 'm2023_z3', year: 2023, number: 3, category: 3, categoryName: 'Logarytmy', points: 3,
      statement: 'Wykaż, że jeżeli $p = \\log_2 5$, to\n$$\\log_{16} 25 = \\dfrac{p}{2}$$',
      answer: { type: 'proof', display: '\\log_{16}25 = p/2', description: 'Dowód przez zmianę podstawy.' },
      hints: [
        { level: 1, text: 'Zastosuj wzór zmiany podstawy: $\\log_{16}25 = \\frac{\\log_2 25}{\\log_2 16}$.' },
        { level: 2, text: '$\\log_2 25 = \\log_2 5^2 = 2\\log_2 5 = 2p$.' },
        { level: 3, text: '$\\log_2 16 = 4$. Wynik: $\\frac{2p}{4} = \\frac{p}{2}$.' }
      ],
      solution: [
        { step: 1, title: 'Zmiana podstawy', content: '\\log_{16}25 = \\dfrac{\\log_2 25}{\\log_2 16}', explanation: '' },
        { step: 2, title: 'Obliczenie', content: '\\dfrac{\\log_2 25}{\\log_2 16} = \\dfrac{2\\log_2 5}{4} = \\dfrac{2p}{4} = \\dfrac{p}{2}\\quad\\blacksquare', explanation: '$\\log_2 5^2 = 2p$, $\\log_2 16 = \\log_2 2^4 = 4$.' }
      ]
    },
    {
      id: 'm2023_z4', year: 2023, number: 4, category: 4, categoryName: 'Styczna do wykresu', points: 4,
      statement: 'Funkcja $f$ jest określona wzorem\n$$f(x) = \\dfrac{3x^2 - 2x}{x^2 + 2x + 8}$$\n\nPunkt $P = (-3,\\ 3)$ należy do wykresu funkcji $f$.\n\nProsta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.',
      answer: { type: 'multipart', display: 'a = -\\frac{8}{11},\\quad b = \\frac{9}{11}', description: '$a = -\\tfrac{8}{11}$, $b = \\tfrac{9}{11}$' },
      hints: [
        { level: 1, text: 'Sprawdź, że $f(-3)=3$. Oblicz $f\'(x)$ korzystając ze wzoru na pochodną ilorazu.' },
        { level: 2, text: '$f\'(x) = \\frac{(6x-2)(x^2+2x+8)-(3x^2-2x)(2x+2)}{(x^2+2x+8)^2}$.' },
        { level: 3, text: 'W $x=-3$: licznik $= -20\\cdot11-33\\cdot(-4)=-88$, mianownik $=121$.' }
      ],
      solution: [
        { step: 1, title: 'Weryfikacja punktu', content: 'f(-3) = \\dfrac{27+6}{9-6+8} = \\dfrac{33}{11} = 3\\checkmark', explanation: '' },
        { step: 2, title: 'Pochodna', content: 'f\'(x) = \\dfrac{(6x-2)(x^2+2x+8)-(3x^2-2x)(2x+2)}{(x^2+2x+8)^2}', explanation: 'Pochodna ilorazu.' },
        { step: 3, title: 'Wartość $f\'(-3)$', content: 'f\'(-3) = \\dfrac{(-20)(11)-(33)(-4)}{121} = \\dfrac{-220+132}{121} = \\dfrac{-88}{121} = -\\dfrac{8}{11}', explanation: '' },
        { step: 4, title: 'Wynik', content: 'a = -\\dfrac{8}{11},\\quad b = 3 - \\left(-\\dfrac{8}{11}\\right)\\cdot(-3) = 3 - \\dfrac{24}{11} = \\dfrac{9}{11}', explanation: '' }
      ]
    },
    {
      id: 'm2023_z9', year: 2023, number: 9, category: 10, categoryName: 'Stereometria', points: 4,
      statement: 'Graniastosłup prostego ma za podstawę trójkąt równoboczny o boku $4$. Wysokość graniastosłupa wynosi $3$.\n\n**Oblicz długość przekątnej ściany bocznej i kąt, który ta przekątna tworzy z płaszczyzną podstawy.** Zapisz obliczenia.',
      answer: { type: 'expression', display: 'd = 5,\\ \\sin\\alpha = \\frac{3}{5}', description: 'Przekątna $d = 5$, $\\sin\\alpha = \\frac{3}{5}$' },
      hints: [
        { level: 1, text: 'Ściana boczna jest prostokątem $4 \\times 3$. Przekątna to długość $d = \\sqrt{4^2+3^2}$.' },
        { level: 2, text: '$d = 5$ (trójka pitagorejska $3,4,5$).' },
        { level: 3, text: 'Kąt $\\alpha$ między przekątną a podstawą: $\\sin\\alpha = \\frac{\\text{wysokość}}{d} = \\frac{3}{5}$.' }
      ],
      solution: [
        { step: 1, title: 'Przekątna ściany bocznej', content: 'd = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5', explanation: 'Ściana boczna to prostokąt $4\\times 3$.' },
        { step: 2, title: 'Kąt z płaszczyzną podstawy', content: '\\sin\\alpha = \\dfrac{3}{5}', explanation: 'Rzut przekątnej na podstawę = bok 4, składowa pionowa = 3.' }
      ]
    },

    // ============ MATURA 2022 ============
    {
      id: 'm2022_z6', year: 2022, number: 6, category: 5, categoryName: 'Dowód nierówności', points: 3,
      statement: 'Wykaż, że dla każdych liczb rzeczywistych $x$ i $y$ takich, że $2x > y$, prawdziwa jest nierówność\n$$7x^3 + 4x^2y \\geq y^3 + 2xy^2 - x^3$$',
      answer: { type: 'proof', display: '(2x-y)(2x+y)^2 \\geq 0', description: 'Dowód przez przekształcenie do $(2x-y)(2x+y)^2 \\geq 0$' },
      hints: [
        { level: 1, text: 'Przenieś wszystko na lewą stronę: $8x^3 + 4x^2y - 2xy^2 - y^3 \\geq 0$.' },
        { level: 2, text: 'Pogrupuj: $4x^2(2x+y) - y^2(2x+y) = (2x+y)(4x^2-y^2)$.' },
        { level: 3, text: '$(2x+y)(2x-y)(2x+y) = (2x-y)(2x+y)^2$. Skoro $2x>y$, oba czynniki są dodatnie.' }
      ],
      solution: [
        { step: 1, title: 'Przeniesienie', content: '8x^3 + 4x^2y - 2xy^2 - y^3 \\geq 0', explanation: '' },
        { step: 2, title: 'Grupowanie', content: '4x^2(2x+y) - y^2(2x+y) = (2x+y)(4x^2 - y^2)', explanation: '' },
        { step: 3, title: 'Rozkład', content: '(2x+y)(2x-y)(2x+y) = (2x-y)(2x+y)^2', explanation: '' },
        { step: 4, title: 'Wniosek', content: '2x > y \\implies (2x-y)>0,\\quad (2x+y)^2 \\geq 0\\\\ \\therefore (2x-y)(2x+y)^2 \\geq 0\\quad\\blacksquare', explanation: '' }
      ]
    },
    {
      id: 'm2022_z7', year: 2022, number: 7, category: 6, categoryName: 'Nierówność z |…|', points: 3,
      statement: 'Rozwiąż równanie\n$$|x - 3| = 2x + 11$$\nZapisz obliczenia.',
      answer: { type: 'set', display: 'x = -\\dfrac{8}{3}', description: '$x = -\\tfrac{8}{3}$' },
      hints: [
        { level: 1, text: 'Warunek: prawa strona $\\geq 0$, czyli $2x+11 \\geq 0 \\iff x \\geq -\\tfrac{11}{2}$.' },
        { level: 2, text: 'Dwa przypadki: $x \\geq 3$ i $x < 3$.' },
        { level: 3, text: 'Sprawdź, czy każde znalezione rozwiązanie spełnia warunek znaku.' }
      ],
      solution: [
        { step: 1, title: 'Warunek', content: '2x+11 \\geq 0 \\iff x \\geq -\\tfrac{11}{2}', explanation: 'Lewa strona jest $\\geq 0$.' },
        { step: 2, title: 'Przypadek $x \\geq 3$', content: 'x - 3 = 2x + 11 \\implies x = -14 - \\text{sprzeczność (}x\\geq 3\\text{)}', explanation: '' },
        { step: 3, title: 'Przypadek $x < 3$', content: '-(x-3) = 2x+11\\\\ -x+3 = 2x+11 \\implies -3x = 8 \\implies x = -\\tfrac{8}{3}', explanation: '' },
        { step: 4, title: 'Weryfikacja', content: '-\\tfrac{8}{3} < 3\\ \\checkmark,\\quad -\\tfrac{8}{3} > -\\tfrac{11}{2}\\ \\checkmark', explanation: '' }
      ]
    },

    {
      id: 'm2022_z4', year: 2022, number: 4, category: 4, categoryName: 'Styczna do wykresu', points: 4,
      statement: 'Funkcja $f$ jest określona wzorem\n$$f(x) = x^3 - 3x^2 + 2$$\ndla każdej liczby rzeczywistej $x$. Punkt $P = (1,\\ f(1))$ należy do wykresu funkcji $f$.\n\nProsta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.',
      answer: { type: 'multipart', display: 'a = -3,\\ b = 3', description: '$a = -3$, $b = 3$' },
      hints: [
        { level: 1, text: '$f(1) = 1 - 3 + 2 = 0$. Punkt $P = (1,0)$.' },
        { level: 2, text: "$f'(x) = 3x^2 - 6x$. Oblicz $f'(1)$." },
        { level: 3, text: "$f'(1) = 3 - 6 = -3$. Wyraz wolny: $b = 0 - (-3)\\cdot1$." }
      ],
      solution: [
        { step: 1, title: 'Obliczenie $f(1)$', content: 'f(1) = 1 - 3 + 2 = 0', explanation: '' },
        { step: 2, title: 'Pochodna', content: "f'(x) = 3x^2 - 6x,\\quad f'(1) = 3 - 6 = -3", explanation: '' },
        { step: 3, title: 'Wynik', content: 'a = -3,\\quad b = 0-(-3)\\cdot1 = 3\\\\ y = -3x+3', explanation: '' }
      ]
    },
    {
      id: 'm2022_z8', year: 2022, number: 8, category: 7, categoryName: 'Ciągi liczbowe', points: 4,
      statement: 'Ciąg arytmetyczny $(a_n)$ spełnia warunki: $S_5 = 25$ i $a_5 = 11$, gdzie $S_5$ jest sumą 5 pierwszych wyrazów.\n\n**Wyznacz pierwszy wyraz $a_1$ i różnicę $d$ tego ciągu. Oblicz $S_{10}$.** Zapisz obliczenia.',
      answer: { type: 'expression', display: 'a_1=-1,\\ d=3,\\ S_{10}=125', description: '$a_1 = -1$, $d = 3$, $S_{10} = 125$' },
      hints: [
        { level: 1, text: '$S_5 = \\frac{5}{2}(a_1+a_5) = 25$ i $a_5 = 11$.' },
        { level: 2, text: '$a_1 + 11 = 10$, więc $a_1 = -1$.' },
        { level: 3, text: '$d = \\frac{a_5-a_1}{4} = \\frac{12}{4} = 3$.' }
      ],
      solution: [
        { step: 1, title: 'Wyznaczenie $a_1$', content: 'S_5 = \\tfrac{5}{2}(a_1+a_5) = \\tfrac{5}{2}(a_1+11) = 25\\\\ a_1+11 = 10 \\implies a_1 = -1', explanation: '' },
        { step: 2, title: 'Różnica', content: 'd = \\dfrac{a_5-a_1}{4} = \\dfrac{11-(-1)}{4} = 3', explanation: '' },
        { step: 3, title: 'Suma $S_{10}$', content: 'S_{10} = \\tfrac{10}{2}(2a_1+9d) = 5\\cdot(-2+27) = 5\\cdot25 = 125', explanation: '' }
      ]
    },

    // ============ MATURA 2021 ============
    {
      id: 'm2021_z6', year: 2021, number: 6, category: 3, categoryName: 'Logarytmy', points: 3,
      statement: 'Niech $\\log_2 18 = c$.\n\n**Wykaż, że** $\\log_3 4 = \\dfrac{4}{c - 1}$.',
      answer: { type: 'proof', display: '\\log_3 4 = \\frac{4}{c-1}', description: 'Dowód: $\\log_2 3 = \\frac{c-1}{2}$, a stąd $\\log_3 4 = \\frac{4}{c-1}$' },
      hints: [
        { level: 1, text: '$\\log_2 18 = \\log_2(2 \\cdot 3^2) = 1 + 2\\log_2 3$.' },
        { level: 2, text: 'Wyznacz $\\log_2 3 = \\tfrac{c-1}{2}$.' },
        { level: 3, text: '$\\log_3 4 = \\frac{\\log_2 4}{\\log_2 3} = \\frac{2}{(c-1)/2}$.' }
      ],
      solution: [
        { step: 1, title: 'Rozkład log₂18', content: 'c = \\log_2 18 = \\log_2(2 \\cdot 9) = 1 + 2\\log_2 3', explanation: '' },
        { step: 2, title: 'Wyznaczenie log₂3', content: '\\log_2 3 = \\frac{c-1}{2}', explanation: '' },
        { step: 3, title: 'Obliczenie log₃4', content: '\\log_3 4 = \\frac{\\log_2 4}{\\log_2 3} = \\frac{2}{(c-1)/2} = \\frac{4}{c-1}\\quad\\blacksquare', explanation: 'Zmiana podstawy.' }
      ]
    },

    {
      id: 'm2021_z4', year: 2021, number: 4, category: 12, categoryName: 'Parametr w równaniu', points: 4,
      statement: 'Dane jest równanie\n$$x^2 - 2mx + m = 0$$\ngdzie $m$ jest parametrem rzeczywistym.\n\n**Wyznacz wszystkie wartości $m$, dla których równanie ma dwa różne pierwiastki rzeczywiste dodatnie.** Zapisz obliczenia.',
      answer: { type: 'interval', display: 'm \\in (1,\\,+\\infty)', description: '$m > 1$' },
      hints: [
        { level: 1, text: 'Trzy warunki: $\\Delta > 0$, suma pierwiastków $> 0$, iloczyn pierwiastków $> 0$.' },
        { level: 2, text: '$\\Delta = 4m^2-4m = 4m(m-1) > 0 \\iff m<0$ lub $m>1$.' },
        { level: 3, text: 'Suma $= 2m > 0 \\iff m>0$. Iloczyn $= m > 0$. Przekrój: $m>1$.' }
      ],
      solution: [
        { step: 1, title: '$\\Delta > 0$', content: '\\Delta = 4m^2-4m = 4m(m-1)>0 \\iff m<0\\ \\text{lub}\\ m>1', explanation: '' },
        { step: 2, title: 'Suma i iloczyn $> 0$', content: 'x_1+x_2 = 2m > 0 \\iff m>0\\\\ x_1 x_2 = m > 0 \\iff m>0', explanation: '' },
        { step: 3, title: 'Przekrój', content: 'm > 1', explanation: '$(m<0\\ \\text{lub}\\ m>1)$ i $m>0$ daje $m>1$.' }
      ]
    },
    {
      id: 'm2021_z9', year: 2021, number: 9, category: 10, categoryName: 'Stereometria', points: 4,
      statement: 'Ostrosłup prawidłowy czworokątny ma krawędź podstawy długości $6$ i wysokość $3$.\n\n**Oblicz kąt między krawędzią boczną a płaszczyzną podstawy.** Zapisz obliczenia.',
      answer: { type: 'expression', display: '\\alpha = 45^\\circ', description: 'Kąt $= 45°$' },
      hints: [
        { level: 1, text: 'Odległość od środka podstawy do wierzchołka podstawy = $\\frac{a\\sqrt{2}}{2} = 3\\sqrt{2}$.' },
        { level: 2, text: '$\\tan\\alpha = \\frac{h}{3\\sqrt{2}} = \\frac{3}{3\\sqrt{2}} = \\frac{1}{\\sqrt{2}}$.' },
        { level: 3, text: '$\\tan\\alpha = \\frac{\\sqrt{2}}{2}$, a kąt $\\alpha = \\arctan\\frac{1}{\\sqrt{2}} \\approx 35{,}26°$. Sprawdź ponownie krawędź boczną.' }
      ],
      solution: [
        { step: 1, title: 'Odległość $r$: środek → wierzchołek podstawy', content: 'r = \\dfrac{a\\sqrt{2}}{2} = \\dfrac{6\\sqrt{2}}{2} = 3\\sqrt{2}', explanation: 'Połowa przekątnej podstawy kwadratu $6\\times6$.' },
        { step: 2, title: 'Długość krawędzi bocznej', content: 'l = \\sqrt{h^2+r^2} = \\sqrt{9+18} = \\sqrt{27} = 3\\sqrt{3}', explanation: '' },
        { step: 3, title: 'Kąt z płaszczyzną podstawy', content: '\\sin\\alpha = \\dfrac{h}{l} = \\dfrac{3}{3\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3}', explanation: '' },
        { step: 4, title: 'Wynik', content: '\\alpha = \\arcsin\\dfrac{\\sqrt{3}}{3} \\approx 35{,}26^\\circ', explanation: '' }
      ]
    },

    // ============ MATURA 2020 ============
    {
      id: 'm2020_z3', year: 2020, number: 3, category: 3, categoryName: 'Logarytmy', points: 2,
      statement: 'Oblicz wartość wyrażenia\n$$\\log_2 5 \\cdot \\log_5 4$$\nZapisz obliczenia.',
      answer: { type: 'number', value: 2, display: '2', description: 'Wynik $= 2$' },
      hints: [
        { level: 1, text: 'Skorzystaj ze wzoru łańcuchowego: $\\log_a b \\cdot \\log_b c = \\log_a c$.' },
        { level: 2, text: '$\\log_2 5 \\cdot \\log_5 4 = \\log_2 4$.' },
        { level: 3, text: '$\\log_2 4 = \\log_2 2^2 = 2$.' }
      ],
      solution: [
        { step: 1, title: 'Wzór łańcuchowy', content: '\\log_2 5 \\cdot \\log_5 4 = \\log_2 4', explanation: '$\\log_a b \\cdot \\log_b c = \\log_a c$.' },
        { step: 2, title: 'Wynik', content: '\\log_2 4 = \\log_2 2^2 = 2', explanation: '' }
      ]
    },
    {
      id: 'm2020_z5', year: 2020, number: 5, category: 6, categoryName: 'Równanie wykładnicze', points: 4,
      statement: 'Rozwiąż równanie\n$$4^x - 6 \\cdot 2^x + 8 = 0$$\nZapisz obliczenia.',
      answer: { type: 'set', display: 'x = 1\\ \\text{lub}\\ x = 2', description: '$x \\in \\{1,\\ 2\\}$' },
      hints: [
        { level: 1, text: 'Podstaw $t = 2^x$. Pamiętaj: $4^x = (2^x)^2 = t^2$.' },
        { level: 2, text: 'Rozwiąż $t^2 - 6t + 8 = 0$.' },
        { level: 3, text: '$(t-2)(t-4)=0$, więc $t=2$ lub $t=4$. Wróć do $2^x$.' }
      ],
      solution: [
        { step: 1, title: 'Podstawienie $t = 2^x$', content: 't^2 - 6t + 8 = 0', explanation: '$4^x = (2^2)^x = (2^x)^2 = t^2$.' },
        { step: 2, title: 'Rozwiązanie', content: '(t-2)(t-4)=0 \\implies t=2\\ \\text{lub}\\ t=4', explanation: '' },
        { step: 3, title: 'Powrót do $x$', content: '2^x=2 \\implies x=1\\\\ 2^x=4 \\implies x=2', explanation: '' }
      ]
    },
    {
      id: 'm2020_z8', year: 2020, number: 8, category: 9, categoryName: 'Równania trygonometryczne', points: 4,
      statement: 'Rozwiąż równanie\n$$\\sin(2x) = \\dfrac{\\sqrt{3}}{2}$$\ndla $x \\in [0,\\ 2\\pi)$. Zapisz obliczenia.',
      answer: { type: 'set', display: 'x \\in \\left\\{\\dfrac{\\pi}{6},\\ \\dfrac{\\pi}{3},\\ \\dfrac{7\\pi}{6},\\ \\dfrac{4\\pi}{3}\\right\\}', description: '$x \\in \\{\\tfrac{\\pi}{6},\\ \\tfrac{\\pi}{3},\\ \\tfrac{7\\pi}{6},\\ \\tfrac{4\\pi}{3}\\}$' },
      hints: [
        { level: 1, text: 'Niech $u = 2x$. Wtedy $u \\in [0, 4\\pi)$.' },
        { level: 2, text: '$\\sin u = \\tfrac{\\sqrt{3}}{2}$: $u = \\tfrac{\\pi}{3},\\ \\tfrac{2\\pi}{3}$ i odpowiednio $+ 2\\pi$.' },
        { level: 3, text: '$u = \\tfrac{\\pi}{3},\\ \\tfrac{2\\pi}{3},\\ \\tfrac{\\pi}{3}+2\\pi,\\ \\tfrac{2\\pi}{3}+2\\pi$. Podziel przez $2$.' }
      ],
      solution: [
        { step: 1, title: 'Podstawienie $u = 2x$', content: '\\sin u = \\dfrac{\\sqrt{3}}{2},\\quad u \\in [0, 4\\pi)', explanation: '' },
        { step: 2, title: 'Rozwiązania $u$', content: 'u = \\tfrac{\\pi}{3},\\ \\tfrac{2\\pi}{3},\\ \\tfrac{\\pi}{3}+2\\pi,\\ \\tfrac{2\\pi}{3}+2\\pi', explanation: '' },
        { step: 3, title: 'Wartości $x$', content: 'x = \\dfrac{u}{2}: \\quad x = \\tfrac{\\pi}{6},\\ \\tfrac{\\pi}{3},\\ \\tfrac{7\\pi}{6},\\ \\tfrac{4\\pi}{3}', explanation: '' }
      ]
    },

    // ============ MATURA 2019 ============
    {
      id: 'm2019_z7', year: 2019, number: 7, category: 4, categoryName: 'Styczna do wykresu', points: 4,
      statement: 'Funkcja $f$ jest określona wzorem\n$$f(x) = 2x^2 + x + 2219$$\ndla każdej liczby rzeczywistej $x$. Punkt $P = (10,\\ 2429)$ należy do wykresu funkcji $f$.\n\nProsta $y = ax + b$ jest **styczna** do wykresu funkcji $f$ w punkcie $P$.\n\n**Oblicz współczynniki $a$ i $b$.** Zapisz obliczenia.',
      answer: { type: 'multipart', display: 'a = 41,\\ b = 2019', description: '$a = 41$, $b = 2019$' },
      hints: [
        { level: 1, text: 'Sprawdź: $f(10) = 200 + 10 + 2219 = 2429\\checkmark$.' },
        { level: 2, text: "$f'(x) = 4x + 1$. Oblicz $f'(10)$." },
        { level: 3, text: "$f'(10) = 41$. Stąd $b = 2429 - 41 \\cdot 10$." }
      ],
      solution: [
        { step: 1, title: 'Pochodna', content: "f'(x) = 4x+1,\\quad f'(10) = 41", explanation: '' },
        { step: 2, title: 'Wynik', content: 'a = 41,\\quad b = 2429 - 41\\cdot10 = 2429-410 = 2019\\\\ y = 41x + 2019', explanation: 'Rok 2019 pojawia się w odpowiedzi!' }
      ]
    },
    {
      id: 'm2019_z8', year: 2019, number: 8, category: 5, categoryName: 'Dowód nierówności', points: 4,
      statement: 'Wykaż, że dla każdych liczb rzeczywistych $x > 0$, $y > 0$ takich, że $x < y$, i dla każdej dodatniej liczby rzeczywistej $a$ prawdziwa jest nierówność\n$$\\frac{x + a}{y + a} + \\frac{y}{x} > 2$$',
      answer: { type: 'proof', display: '\\frac{(y-x)(y-x+a)}{x(y+a)} > 0', description: 'Wszystkie czynniki dodatnie.' },
      hints: [
        { level: 1, text: 'Sprowadź do wspólnego mianownika $x(y+a)$ i odejmij 2.' },
        { level: 2, text: 'Licznik: $x(x+a)+y(y+a)-2x(y+a) = (x-y)^2 + a(y-x)$.' },
        { level: 3, text: 'Wyłącz $(y-x)$: $(y-x)(y-x+a)$, oba czynniki $> 0$.' }
      ],
      solution: [
        { step: 1, title: 'Przeniesienie', content: 'D = \\frac{x+a}{y+a} + \\frac{y}{x} - 2 = \\frac{x(x+a) + y(y+a) - 2x(y+a)}{x(y+a)}', explanation: '' },
        { step: 2, title: 'Uproszczenie licznika', content: 'x^2 + ax + y^2 + ay - 2xy - 2ax = (x-y)^2 + a(y-x)', explanation: '' },
        { step: 3, title: 'Wyłączenie', content: '(y-x)^2 + a(y-x) = (y-x)(y-x+a)', explanation: '' },
        { step: 4, title: 'Wniosek', content: 'y > x \\implies y-x > 0,\\quad y-x+a > 0,\\quad x(y+a)>0\\\\ \\therefore D > 0\\quad\\blacksquare', explanation: '' }
      ]
    },
    // ============ MATURA 2018 ============
    {
      id: 'm2018_z4', year: 2018, number: 4, category: 7, categoryName: 'Ciągi liczbowe', points: 3,
      statement: 'Nieskończony ciąg geometryczny jest zbieżny. Jego pierwszy wyraz wynosi $a_1 = 8$, a suma wszystkich wyrazów wynosi $S = 12$.\n\n**Wyznacz iloraz $q$ tego ciągu.** Zapisz obliczenia.',
      answer: { type: 'number', value: 1/3, display: 'q = \\dfrac{1}{3}', description: '$q = \\tfrac{1}{3}$' },
      hints: [
        { level: 1, text: 'Wzór na sumę nieskończonego szeregu geometrycznego: $S = \\frac{a_1}{1-q}$ (dla $|q|<1$).' },
        { level: 2, text: '$\\frac{8}{1-q} = 12$. Wyznacz $q$.' },
        { level: 3, text: '$1-q = \\frac{2}{3}$, więc $q = \\frac{1}{3}$.' }
      ],
      solution: [
        { step: 1, title: 'Wzór na sumę', content: 'S = \\dfrac{a_1}{1-q} \\implies 12 = \\dfrac{8}{1-q}', explanation: '$|q|<1$ — warunek zbieżności.' },
        { step: 2, title: 'Wyznaczenie $q$', content: '1-q = \\dfrac{8}{12} = \\dfrac{2}{3} \\implies q = \\dfrac{1}{3}', explanation: '' }
      ]
    },
    {
      id: 'm2018_z5', year: 2018, number: 5, category: 5, categoryName: 'Dowód nierówności', points: 3,
      statement: 'Wykaż, że dla każdych dodatnich liczb rzeczywistych $a$ i $b$ prawdziwa jest nierówność\n$$(a+b)\\left(\\dfrac{1}{a}+\\dfrac{1}{b}\\right) \\geq 4$$',
      answer: { type: 'proof', display: '(a+b)(\\frac{1}{a}+\\frac{1}{b}) - 4 = \\frac{(a-b)^2}{ab} \\geq 0', description: 'Dowód przez rozwinięcie i AM-GM.' },
      hints: [
        { level: 1, text: 'Rozwiń: $(a+b)(\\frac{1}{a}+\\frac{1}{b}) = 1 + \\frac{a}{b} + \\frac{b}{a} + 1 = 2 + \\frac{a}{b} + \\frac{b}{a}$.' },
        { level: 2, text: 'Korzystając z AM-GM: $\\frac{a}{b} + \\frac{b}{a} \\geq 2$.' },
        { level: 3, text: 'Stąd cała suma $\\geq 2 + 2 = 4$.' }
      ],
      solution: [
        { step: 1, title: 'Rozwinięcie', content: '(a+b)\\left(\\tfrac{1}{a}+\\tfrac{1}{b}\\right) = \\tfrac{a}{a}+\\tfrac{a}{b}+\\tfrac{b}{a}+\\tfrac{b}{b} = 2 + \\tfrac{a}{b} + \\tfrac{b}{a}', explanation: '' },
        { step: 2, title: 'Nierówność $\\frac{a}{b}+\\frac{b}{a} \\geq 2$', content: '\\tfrac{a}{b}+\\tfrac{b}{a} - 2 = \\dfrac{a^2+b^2-2ab}{ab} = \\dfrac{(a-b)^2}{ab} \\geq 0', explanation: '$(a-b)^2\\geq0$, $ab>0$.' },
        { step: 3, title: 'Wniosek', content: '2 + \\tfrac{a}{b} + \\tfrac{b}{a} \\geq 2+2 = 4\\quad\\blacksquare', explanation: '' }
      ]
    },
    {
      id: 'm2018_z8', year: 2018, number: 8, category: 6, categoryName: 'Równanie wykładnicze', points: 4,
      statement: 'Rozwiąż równanie\n$$9^x - 4 \\cdot 3^x - 5 = 0$$\nZapisz obliczenia.',
      answer: { type: 'number', value: Math.log(5)/Math.log(3), display: 'x = \\log_3 5', description: '$x = \\log_3 5$' },
      hints: [
        { level: 1, text: 'Podstaw $t = 3^x$. Pamiętaj: $9^x = (3^x)^2 = t^2$.' },
        { level: 2, text: '$t^2 - 4t - 5 = 0$. Rozłóż na czynniki.' },
        { level: 3, text: '$(t-5)(t+1)=0$, więc $t=5$ lub $t=-1$. Ale $t = 3^x > 0$.' }
      ],
      solution: [
        { step: 1, title: 'Podstawienie $t = 3^x$', content: 't^2 - 4t - 5 = 0', explanation: '$9^x = (3^2)^x = (3^x)^2 = t^2$.' },
        { step: 2, title: 'Rozwiązanie', content: '(t-5)(t+1) = 0 \\implies t = 5\\ \\text{lub}\\ t = -1', explanation: '' },
        { step: 3, title: 'Powrót do $x$', content: 't = 3^x > 0, \\text{ więc } t=-1 \\text{ odrzucamy}\\\\ 3^x = 5 \\implies x = \\log_3 5', explanation: '' }
      ]
    },

  ];

  function getAll() { return TASKS; }
  function getByYear(year) { return TASKS.filter(t => t.year === year); }
  function getByCategory(catId) { return TASKS.filter(t => t.category === catId); }
  function getById(id) { return TASKS.find(t => t.id === id); }
  function getYears() { return [...new Set(TASKS.map(t => t.year))].sort((a,b) => b-a); }
  function random() { return TASKS[Math.floor(Math.random() * TASKS.length)]; }
  function randomByYear(year) {
    const pool = getByYear(year);
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }

  // Adapter pod ten sam format co generatory
  function asTask(matura) {
    if (!matura) return null;
    return {
      id: matura.id,
      category: matura.category,
      categoryName: matura.categoryName,
      type: 'matura',
      difficulty: 'matura',
      points: matura.points,
      year: matura.year,
      number: matura.number,
      params: {},
      statement: matura.statement,
      answer: matura.answer,
      hints: matura.hints,
      solution: matura.solution
    };
  }

  return { getAll, getByYear, getByCategory, getById, getYears, random, randomByYear, asTask };
})();
