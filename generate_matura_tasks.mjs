import fs from "node:fs";
import { TextDecoder } from "node:util";

const SOURCE = "C:/Users/user/Downloads/matura_all_text.txt";
const TARGET = "js/data/matura_tasks.js";

const CATS = {
  1: "Funkcja wykladnicza w praktyce",
  2: "Granica ciagu i funkcji",
  3: "Logarytmy",
  4: "Styczna do wykresu",
  5: "Dowod nierownosci",
  6: "Rownania i nierownosci",
  7: "Ciagi liczbowe",
  8: "Planimetria",
  9: "Rownania trygonometryczne",
  10: "Stereometria",
  11: "Geometria analityczna",
  12: "Parametr w rownaniu",
  13: "Prawdopodobienstwo",
  14: "Kombinatoryka",
  15: "Optymalizacja",
  16: "Wielomiany",
  17: "Funkcja wymierna",
  18: "Rownanie wykladnicze",
  19: "Inne",
};

const OVERRIDES = {
  m2015_z6: { category: 2, statement: "Oblicz granicę $$\\lim_{n\\to\\infty}\\left(\\frac{11n^3+6n+5}{6n^3+1}-\\frac{2n^2+2n+1}{5n^2-4}\\right).$$ W kratki wpisz kolejno cyfrę jedności i pierwsze dwie cyfry po przecinku rozwinięcia dziesiętnego otrzymanego wyniku." },
  m2015_z7: { category: 12, statement: "Liczby $-1$ i $3$ są miejscami zerowymi funkcji kwadratowej $f$. Oblicz $\\frac{f(6)}{f(12)}$." },
  m2015_z8: { category: 5, statement: "Udowodnij, że dla każdej liczby rzeczywistej $x$ prawdziwa jest nierówność $$x^4-x^2-2x+3>0.$$" },
  m2015_z12: { category: 4, statement: "Funkcja $f$ określona jest wzorem $f(x)=x^3-2x^2+1$ dla każdej liczby rzeczywistej $x$. Wyznacz równania tych stycznych do wykresu funkcji $f$, które są równoległe do prostej $y=4x$." },
  m2015_z13: { category: 12, statement: "Dany jest trójmian kwadratowy $f(x)=(m+1)x^2+2(m-2)x-m+4$. Wyznacz wszystkie wartości parametru $m$, dla których trójmian $f$ ma dwa różne pierwiastki rzeczywiste $x_1,x_2$ spełniające warunek $$x_1^2-x_2^2=x_1^4-x_2^4.$$" },
  m2015_z15: { category: 16, statement: "Suma wszystkich czterech współczynników wielomianu $W(x)=x^3+ax^2+bx+c$ jest równa $0$. Trzy pierwiastki tego wielomianu tworzą ciąg arytmetyczny o różnicy równej $3$. Oblicz współczynniki $a,b,c$. Rozważ wszystkie możliwe przypadki." },

  m2016_z4: { category: 4, statement: "Funkcja $f(x)=\\frac{3x-1}{x^2+4}$ jest określona dla każdej liczby rzeczywistej $x$. Wskaż poprawny wzór pochodnej tej funkcji." },
  m2016_z5: { category: 2, statement: "Granica $$\\lim_{n\\to\\infty}\\frac{pn^2+4n}{5n^2-4}=-\\frac85.$$ Wynika stąd, że: A. $p=-8$ B. $p=4$ C. $p=2$ D. $p=-2$." },
  m2016_z7: { category: 7, statement: "Dany jest ciąg geometryczny $(a_n)$ określony wzorem $$a_n=\\left(\\frac{1}{2x-371}\\right)^n$$ dla $n\\ge1$. Wszystkie wyrazy tego ciągu są dodatnie. Wyznacz najmniejszą liczbę całkowitą $x$, dla której nieskończony szereg $a_1+a_2+a_3+\\ldots$ jest zbieżny." },
  m2016_z10: { category: 17, statement: "Wyznacz wszystkie wartości parametru $a$, dla których wykresy funkcji $f(x)=|x-2|$ oraz $g(x)=5-ax$ przecinają się w punkcie o obu współrzędnych dodatnich." },
  m2016_z11: { category: 9, statement: "Rozwiąż nierówność $$\\frac{2\\cos x-\\sqrt3}{\\cos^2x}<0$$ w przedziale $[0,2\\pi]$." },
  m2016_z12: { category: 12, statement: "Dany jest trójmian kwadratowy $f(x)=x^2+2(m+1)x+6m+1$. Wyznacz wszystkie rzeczywiste wartości parametru $m$, dla których ten trójmian ma dwa różne pierwiastki $x_1,x_2$ tego samego znaku, spełniające warunek $|x_1-x_2|<3$." },
  m2016_z16: { category: 15, statement: "Parabola $y=2-\\frac12x^2$ przecina oś $Ox$ w punktach $A=(-2,0)$ i $B=(2,0)$. Rozpatrujemy trapezy równoramienne $ABCD$, których dłuższą podstawą jest $AB$, a końce $C,D$ krótszej podstawy leżą na paraboli. Wyznacz pole trapezu w zależności od pierwszej współrzędnej wierzchołka $C$ i oblicz współrzędne $C$ dla największego pola." },

  m2017_z5: { category: 16, statement: "Reszta z dzielenia wielomianu $W(x)=x^3-2x^2+ax+3$ przez dwumian $x-2$ jest równa $1$. Oblicz wartość współczynnika $a$." },
  m2017_z6: { category: 4, statement: "Funkcja $f$ jest określona wzorem $$f(x)=\\frac{x-1}{x^2+1}.$$ Wyznacz równanie stycznej do wykresu tej funkcji w punkcie $P=(1,0)$." },
  m2017_z7: { category: 5, statement: "Udowodnij, że dla dowolnych różnych liczb rzeczywistych $x,y$ prawdziwa jest nierówność $$x^2y^2+2x^2+2y^2-8xy+4>0.$$" },
  m2017_z10: { category: 9, statement: "Rozwiąż równanie $$\\cos 2x+3\\cos x=-2$$ w przedziale $[0,2\\pi]$." },
  m2017_z12: { category: 12, statement: "Wyznacz wszystkie wartości parametru $m$, dla których równanie $$4x^2-6mx+(2m+3)(m-3)=0$$ ma dwa różne rozwiązania rzeczywiste $x_1<x_2$ spełniające $$(4x_1-4x_2-1)(4x_1-4x_2+1)<0.$$" },
  m2017_z13: { category: 11, statement: "Wyznacz równanie okręgu przechodzącego przez punkty $A=(-5,3)$ i $B=(0,6)$, którego środek leży na prostej $x-3y+1=0$." },
  m2017_z14: { category: 7, statement: "Liczby $a,b,c$ są odpowiednio pierwszym, drugim i trzecim wyrazem ciągu arytmetycznego. Suma tych liczb jest równa $27$. Ciąg $(a-2,b,2c+1)$ jest geometryczny. Wyznacz $a,b,c$." },

  m2018_z5: { category: 17, statement: "Punkt $A=(-5,3)$ jest środkiem symetrii wykresu funkcji homograficznej $$f(x)=\\frac{ax+7}{x+d},\\quad x\\ne -d.$$ Oblicz iloraz $\\frac da$." },
  m2018_z6: { category: 4, statement: "Styczna do paraboli $y=3x^2-1$ w punkcie $P=(x_0,y_0)$ jest nachylona do osi $Ox$ pod kątem $30^\\circ$. Oblicz współrzędne punktu $P$." },
  m2018_z8: { category: 5, statement: "Udowodnij, że dla każdej liczby całkowitej $k$ i każdej liczby całkowitej $m$ liczba $k^3m-km^3$ jest podzielna przez $6$." },
  m2018_z10: { category: 10, statement: "Objętość stożka ściętego można obliczyć ze wzoru $$V=\\frac13\\pi H(r^2+rR+R^2).$$ Dany jest stożek ścięty o wysokości $H=10$, objętości $840\\pi$ i promieniu $r=6$. Oblicz cosinus kąta nachylenia przekątnej przekroju osiowego tej bryły do jednej z podstaw." },
  m2018_z11: { category: 9, statement: "Rozwiąż równanie $$\\sin 6x+\\cos 3x=2\\sin 3x+1$$ w przedziale $[0,\\pi]$." },
  m2018_z12: { category: 12, statement: "Wyznacz wszystkie wartości parametru $m$, dla których równanie $$x^2+(m+1)x-m^2+1=0$$ ma dwa rozwiązania rzeczywiste $x_1\\ne x_2$ spełniające warunek $$x_1^3+x_2^3>-7x_1x_2.$$" },
  m2018_z13: { category: 7, statement: "Wyrazy ciągu geometrycznego $(a_n)$ spełniają układ $$a_3+a_6=-84,\\qquad a_4+a_7=168.$$ Wyznacz liczbę $n$ początkowych wyrazów tego ciągu, których suma $S_n$ jest równa $32769$." },

  m2019_z5: { category: 2, statement: "Oblicz granicę $$\\lim_{n\\to\\infty}\\left(\\frac{9n^3+11n^2}{7n^3+5n^2+3n+1}-\\frac{n^2}{3n^2+1}\\right).$$ Wpisz trzy kolejne cyfry po przecinku rozwinięcia dziesiętnego otrzymanego wyniku." },
  m2019_z7: { category: 4, statement: "Punkt $P=(10,2429)$ leży na paraboli $y=2x^2+x+2219$. Prosta $y=ax+b$ jest styczna do tej paraboli w punkcie $P$. Oblicz współczynnik $b$." },
  m2019_z8: { category: 5, statement: "Udowodnij, że dla dowolnych dodatnich liczb rzeczywistych $x,y$ takich, że $x<y$, i dowolnej dodatniej liczby rzeczywistej $a$, prawdziwa jest nierówność $$\\frac{x+a}{y+a}+\\frac yx>2.$$" },
  m2019_z11: { category: 11, statement: "Dane są okręgi $$x^2+y^2-12x-8y+43=0$$ oraz $$x^2+y^2-2ax+4y+a^2-77=0.$$ Wyznacz wszystkie wartości parametru $a$, dla których te okręgi mają dokładnie jeden punkt wspólny. Rozważ wszystkie przypadki." },
  m2019_z12: { category: 7, statement: "Trzywyrazowy ciąg $(a,b,c)$ o wyrazach dodatnich jest arytmetyczny, natomiast ciąg $$\\left(\\frac1a,\\frac{2}{3b},\\frac{1}{2a+2b+c}\\right)$$ jest geometryczny. Oblicz iloraz ciągu geometrycznego." },
  m2019_z13: { category: 16, statement: "Wielomian $$W(x)=2x^3+(m^3+2)x^2-11x-2(2m+1)$$ jest podzielny przez dwumian $(x-2)$ oraz przy dzieleniu przez $(x+1)$ daje resztę $6$. Oblicz $m$ i dla wyznaczonej wartości $m$ rozwiąż nierówność $W(x)\\le0$." },

  m2022_z5: { category: 2, statement: "Ciąg $(a_n)$ jest określony dla każdej liczby naturalnej $n\\ge1$ wzorem $$a_n=\\frac{(7p-1)n^3+5pn-3}{(p+1)n^3+n^2+p},$$ gdzie $p$ jest liczbą rzeczywistą dodatnią. Oblicz wartość $p$, dla której granica ciągu $(a_n)$ jest równa $\\frac43$. W poniższe kratki wpisz kolejno — od lewej do prawej — pierwszą, drugą oraz trzecią cyfrę po przecinku nieskończonego rozwinięcia dziesiętnego otrzymanego wyniku." },
  m2022_z10: { category: 7, statement: "Ciąg $(a_n)$ jest geometryczny i ma wszystkie wyrazy dodatnie. Ponadto $a_1=675$ oraz spełniony jest warunek z arkusza. Ciąg $(b_n)$ jest arytmetyczny. Suma wszystkich wyrazów ciągu $(a_n)$ jest równa sumie dwudziestu pięciu początkowych kolejnych wyrazów ciągu $(b_n)$ oraz $a_3=b_4$. Oblicz $b_1$." },
  m2022_z12: { category: 12, statement: "Wyznacz wszystkie wartości parametru $m$, dla których równanie $$x^2-(m+1)x+m=0$$ ma dwa różne rozwiązania rzeczywiste $x_1,x_2$, spełniające warunki $x_1\\ne0$, $x_2\\ne0$ oraz $$\\frac1{x_1}+\\frac1{x_2}+2=\\frac1{x_1^2}+\\frac1{x_2^2}.$$" },
  m2022_z15: { category: 15, statement: "Rozpatrujemy wszystkie trójkąty równoramienne o obwodzie równym $18$. a) Wykaż, że pole $P$ każdego z tych trójkątów, jako funkcja długości $b$ ramienia, wyraża się wzorem $$P(b)=\\frac{(18-2b)\\sqrt{18b-81}}{2}.$$ b) Wyznacz dziedzinę funkcji $P$. c) Oblicz długości boków tego z rozpatrywanych trójkątów, który ma największe pole." },

  m2023_z11: { category: 12, statement: "Wyznacz wszystkie wartości parametru $m\\ne2$, dla których równanie $$x^2+4x-\\frac{m-3}{m-2}=0$$ ma dwa różne rozwiązania rzeczywiste $x_1,x_2$ spełniające warunek $$x_1^3+x_2^3>-28.$$" },
  m2023_z12_1: { category: 3, statement: "Funkcja $f$ jest określona wzorem z arkusza dla każdej liczby dodatniej $x$. Wykaż, że $$f(x)=x^4+x^2-6x.$$" },
  m2023_z12_2: { category: 15, statement: "Dla funkcji z zadania 12.1, czyli $$f(x)=x^4+x^2-6x,$$ oblicz najmniejszą wartość tej funkcji dla $x>0$." },
  m2024_z12: { category: 12, statement: "Wyznacz wszystkie wartości parametru $m$, dla których równanie $$x^2-(3m+1)x+2m^2+m+1=0$$ ma dwa różne rozwiązania rzeczywiste $x_1,x_2$ spełniające warunek $$x_1^3+x_2^3+3x_1x_2(x_1+x_2-3)\\le3m-7.$$" },
  m2024_z13_1: { category: 10, statement: "Rozważamy wszystkie graniastosłupy prawidłowe trójkątne o objętości $3456$ i krawędzi podstawy $a\\le8\\sqrt3$. Wykaż, że pole powierzchni całkowitej takiego graniastosłupa jest opisane wzorem $$P(a)=\\frac{\\sqrt3a^2}{2}+\\frac{13824\\sqrt3}{a}.$$" },
  m2024_z13_2: { category: 15, statement: "Dla graniastosłupów z zadania 13.1 oblicz najmniejsze pole powierzchni całkowitej." },
  m2025_z5: { category: 6, statement: "Rozwiąż nierówność $$|x-2|-2|x+3|<-2.$$ Zapisz obliczenia." },
  m2025_z6: { category: 7, statement: "Ciąg $(a_n)$, określony dla każdej liczby naturalnej $n\\ge1$, jest geometryczny i zbieżny. W tym ciągu $$a_1+a_3=20\\quad\\text{oraz}\\quad a_1^2+a_3^2=328.$$ Oblicz sumę wszystkich wyrazów tego ciągu. Rozważ wszystkie przypadki." },
  m2025_z12_1: { category: 10, statement: "Stożek ma taką własność, że odległość środka podstawy od tworzącej jest równa $5$, a wysokość stożka wynosi $h>5$. Wykaż, że objętość stożka jako funkcja $h$ jest dana wzorem $$V(h)=\\frac{\\pi}{3}\\cdot\\frac{25h^3}{h^2-25}.$$" },
  m2025_z12_2: { category: 15, statement: "Dla stożka z zadania 12.1 oblicz najmniejszą możliwą objętość." },
  m2026_z1: { category: 2, statement: "Oblicz granicę z arkusza 2026: $$\\lim_{n\\to+\\infty}\\frac{\\left(\\frac{n+2}{n-1}\\right)^n}{\\sqrt[2]{n^3-4n+7}}.$$ Zapisz obliczenia." },
  m2026_z3: { category: 5, statement: "Wykaż, że dla każdej dodatniej liczby rzeczywistej $x$ i każdej dodatniej liczby rzeczywistej $y$ prawdziwa jest nierówność $$\\frac1x+\\frac1y\\le\\frac{x}{y^2}+\\frac{y}{x^2}.$$" },
  m2026_z5: { category: 6, statement: "Rozwiąż nierówność $$|2x-6|-|x^2-9|<0.$$ Zapisz obliczenia." },
  m2026_z7: { category: 9, statement: "Rozwiąż równanie $$\\sin(6x)-2\\sin(2x)=0.$$ Zapisz obliczenia." },
  m2026_z10: { category: 12, statement: "Wyznacz wszystkie rzeczywiste wartości parametru $m\\ne0$, dla których funkcja kwadratowa $$f(x)=m^2x^2-2mx-m+1$$ ma dwa różne miejsca zerowe $x_1,x_2$ należące do przedziału $(-2,2)$." },
  m2026_z12_1: { category: 15, statement: "W projekcie ogrodu zaplanowano kwietnik w kształcie trójkąta równoramiennego o podstawie długości $x\\le10$. W trójkąt wpisano koło o promieniu $2$. Wykaż, że pole trójkąta opisuje funkcja $$P(x)=\\frac{2x^3}{x^2-16}.$$" },
  m2026_z12_2: { category: 15, statement: "Dla funkcji $$P(x)=\\frac{2x^3}{x^2-16},\\quad x\\in(4,10],$$ oblicz najmniejsze możliwe pole kwietnika." },

  m2015_z3: { category: 3, statement: "Uprość wyrażenie $\\left(3-2\\sqrt3\\right)^3$ i wskaż poprawną odpowiedź spośród podanych w arkuszu." },
  m2016_z1: { category: 14, statement: "W rozwinięciu wyrażenia $(3x+4y)^3$ wyznacz współczynnik przy iloczynie $xy^2$ i wskaż poprawną odpowiedź." },
  m2017_z1: { category: 3, statement: "Oblicz wartość wyrażenia $\\sqrt{2-\\sqrt3}-\\sqrt{2+\\sqrt3}$ i wskaż poprawną odpowiedź." },
  m2017_z4: { category: 11, statement: "Dane są punkt $B=(-4,7)$ i wektor $\\vec u=[-3,5]$. Punkt $A$ spełnia warunek $\\vec{AB}=-3\\vec u$. Wyznacz współrzędne punktu $A$." },
  m2019_z1: { category: 3, statement: "Dla dodatnich liczb $x\\ne1$ oraz $y\\ne1$ oblicz wartość wyrażenia $\\log_x y\\cdot\\log_y x$ i wskaż poprawną odpowiedź." },
  m2019_z2: { category: 9, statement: "Oblicz wartość wyrażenia $\\cos^2 105^\\circ-\\sin^2 105^\\circ$ i wskaż poprawną odpowiedź." },
  m2019_z4: { category: 13, statement: "Zdarzenia losowe $A$ i $B$ są zawarte w $\\Omega$. Korzystając z danych o $P(B')$ oraz $P(A\\mid B)$ z arkusza, oblicz $P(A\\cap B)$ i wskaż poprawną odpowiedź." },
  m2019_z14: { category: 9, statement: "Rozwiąż równanie $$\\cos x\\left(\\sin\\left(x-\\frac\\pi3\\right)+\\sin\\left(x+\\frac\\pi3\\right)\\right)=\\frac12\\sin x.$$" },
  m2020_z2: { category: 2, statement: "Ciąg $(a_n)$ jest określony wzorem $$a_n=\\frac{3n^2+7n-5}{11-5n+5n^2}$$ dla każdej liczby naturalnej $n\\ge1$. Oblicz granicę tego ciągu i wskaż poprawną odpowiedź." },
  m2020_z4: { category: 14, statement: "Po przekształceniu wyrażenia $(x\\sqrt2+y\\sqrt3)^4$ do postaci $ax^4+bx^3y+cx^2y^2+dxy^3+ey^4$ wyznacz współczynnik $c$." },
  m2020_z9: { category: 9, statement: "Rozwiąż równanie $$3\\cos 2x+10\\cos^2x=24\\sin x-3$$ dla $x\\in[0,2\\pi]$." },
  m2020_z11: { category: 12, statement: "Dane jest równanie kwadratowe $$x^2-(3m+2)x+2m^2+7m-15=0.$$ Wyznacz wszystkie wartości parametru $m$, dla których istnieją dwa różne rozwiązania $x_1,x_2$ spełniające warunek $$2x_1^2+5x_1x_2+2x_2^2=2.$$" },
  m2020_z14: { category: 10, statement: "Podstawą ostrosłupa czworokątnego $ABCDS$ jest trapez $ABCD$, gdzie $AB\\parallel CD$. Ramiona trapezu mają długości $AD=10$ i $BC=16$, a $\\angle ABC=30^\\circ$. Każda ściana boczna tworzy z płaszczyzną podstawy kąt $\\alpha$ taki, że $\\tg\\alpha=\\frac92$. Oblicz objętość ostrosłupa." },
  m2021_z1: { category: 9, statement: "Oblicz wartość wyrażenia $\\cos^2 165^\\circ-\\sin^2 165^\\circ$ i wskaż poprawną odpowiedź." },
  m2021_z2: { category: 9, statement: "Na rysunku w arkuszu przedstawiono fragment wykresu funkcji trygonometrycznej. Wskaż wzór funkcji spośród odpowiedzi A-D." },
  m2021_z3: { category: 16, statement: "Wskaż dwumian lub trójmian, przez który podzielny jest wielomian $$W(x)=x^4+81.$$" },
  m2021_z5: { category: 2, statement: "Oblicz granicę $$\\lim_{n\\to\\infty}\\frac{(3n+2)^2-(1-2n)^2}{(2n-1)^2}.$$ W kratki wpisz cyfrę jedności i pierwsze dwie cyfry po przecinku skończonego rozwinięcia dziesiętnego wyniku." },
  m2021_z6: { category: 3, statement: "Niech $\\log_2 18=c$. Wykaż, że $$\\log_3 4=\\frac4{c-1}.$$" },
  m2021_z7: { category: 6, statement: "Rozwiąż nierówność $$\\frac{2x-1}{1-x}\\le\\frac{2+2x}{5x}.$$" },
  m2021_z11: { category: 12, statement: "Wyznacz wszystkie wartości parametru $m$, dla których trójmian kwadratowy $$4x^2-2(m+1)x+m$$ ma dwa różne pierwiastki rzeczywiste $x_1,x_2$, spełniające warunki $x_1\\ne0$, $x_2\\ne0$ oraz $$x_1+x_2\\le\\frac1{x_1}+\\frac1{x_2}.$$" },
  m2021_z12: { category: 9, statement: "Rozwiąż równanie $$\\cos 2x=\\frac{\\sqrt2}{2}(\\cos x-\\sin x)$$ w przedziale $[0,\\pi]$." },
  m2021_z14: { category: 15, statement: "Dana jest parabola $y=x^2$ oraz punkty $A=(0,2)$ i $B=(1,3)$. Punkt $C$ leży na tej paraboli, a $m$ oznacza pierwszą współrzędną punktu $C$. a) Wyznacz pole $P$ trójkąta $ABC$ jako funkcję $m$. b) Wyznacz wszystkie wartości $m$, dla których trójkąt $ABC$ jest ostrokątny." },
  m2021_z15: { category: 15, statement: "Prostopadłościenny zbiornik otwarty od góry ma pojemność $144\\,m^3$, a jego dno jest kwadratem. Żaden wymiar nie może przekraczać $9$ m. Koszt wykonania wynosi $100$ zł za $1\\,m^2$ dna i $75$ zł za $1\\,m^2$ ścian. Wyznacz wymiary zbiornika o najmniejszym koszcie." },
  m2022_z1: { category: 3, statement: "Oblicz wartość wyrażenia $\\log_3\\sqrt{27}-\\log_3\\sqrt3$ i wskaż poprawną odpowiedź." },
  m2022_z7: { category: 6, statement: "Rozwiąż równanie $$|x-3|=2x+11.$$" }
};

const cp1250Decoder = new TextDecoder("windows-1250");
const cp1250Reverse = new Map();
for (let byte = 0; byte < 256; byte++) {
  cp1250Reverse.set(cp1250Decoder.decode(Uint8Array.from([byte])), byte);
}

function fixMojibake(text) {
  if (!/[ÄĹĂÂâ]/.test(text)) return text;

  const bytes = [];
  for (const char of text) {
    const byte = cp1250Reverse.get(char);
    if (byte === undefined) return text;
    bytes.push(byte);
  }

  return Buffer.from(bytes).toString("utf8");
}

function classify(statement) {
  const s = statement.toLowerCase();
  if (["bakter", "temperatur", "masa substancji", "rozpadu"].some(k => s.includes(k))) return 1;
  if (s.includes("granica") || s.includes("lim")) return 2;
  if (s.includes("log")) return 3;
  if (s.includes("styczn") || s.includes("pochodn")) return 4;
  if (s.includes("udowodnij") || s.includes("wykaż") || s.includes("wykaz")) return 5;
  if (statement.includes("|") || s.includes("nierówność") || s.includes("nierownosc")) return 6;
  if (s.includes("ciąg") || s.includes("ciag") || s.includes("szereg")) return 7;
  if (["trójkąt", "trojkat", "trapez", "kwadrat", "prostokąt", "prostokat", "czworokąt", "czworokat"].some(k => s.includes(k))) return 8;
  if (["sin", "cos", "tg"].some(k => s.includes(k))) return 9;
  if (["ostrosłup", "ostroslup", "graniastosłup", "graniastoslup", "stożek", "stozek", "walec", "sześcian", "szescian"].some(k => s.includes(k))) return 10;
  if (["układzie współrzędnych", "ukladzie wspolrzednych", "współrzędn", "wspolrzedn", "okręg", "okreg", "prosta"].some(k => s.includes(k))) return 11;
  if (s.includes("parametr") || s.includes("wartości parametru") || s.includes("wartosci parametru")) return 12;
  if (["prawdopodobieństwo", "prawdopodobienstwo", "losujemy", "kostk", "urn"].some(k => s.includes(k))) return 13;
  if (["ile jest", "cyfr", "zbioru", "tworzymy"].some(k => s.includes(k))) return 14;
  if (["największ", "najwieksz", "najmniejsz", "koszt", "maksymal"].some(k => s.includes(k))) return 15;
  if (s.includes("wielomian") || s.includes("reszta z dzielenia")) return 16;
  return 19;
}

function cleanBlock(block) {
  const skip = ["Strona", "MMA", "MMAP", "EMAP", "lp.ezsukra", ":einorts", "an", "zseizdjanz", "yzsukra", "jecęiW", "BRUDNOPIS", "Nr zadania", "Wypełnia", "Wypelnia", "Maks.", "egzaminator", "Uzyskana", "Odpowiedź:", "Odpowiedz:"];
  return block.split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !skip.some(prefix => l.startsWith(prefix)) && !/^[0-9–\- ]+$/.test(l))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeTask(year, number, points, statement) {
  const id = `m${year}_z${String(number).replace(".", "_")}`;
  const override = OVERRIDES[id];
  statement = override?.statement ? fixMojibake(override.statement) : statement;
  statement = statement.replace(/^Zadanie\s+\d+(?:\.\d+)?\.\s*\(0[–-]\d+\)\s*/u, "");
  const category = override?.category ?? classify(statement);
  const categoryName = CATS[category];
  return {
    id,
    year,
    number,
    category,
    categoryName,
    points,
    statement,
    answer: {
      type: category === 5 ? "proof" : "expression",
      display: "Zadanie z arkusza CKE",
      description: "Zadanie z arkusza CKE. Rozwiazanie wymaga pelnego toku obliczen.",
    },
    hints: [
      { level: 1, text: "Wypisz dane z tresci i nazwij szukane wielkosci." },
      { level: 2, text: `Rozpoznany dzial: ${categoryName}. Zastosuj typowy schemat dla tego dzialu.` },
      { level: 3, text: "Sprawdz warunki z polecenia i zapisz odpowiedz w wymaganej postaci." },
    ],
    solution: [
      { step: 1, title: "Dane z arkusza", content: "To jest pelna tresc zadania odczytana z arkusza CKE. Najpierw przepisz dane i oznacz niewiadome.", explanation: "" },
      { step: 2, title: "Plan rozwiazania", content: `Uzyj metod z dzialu: ${categoryName}. W razie potrzeby skorzystaj z odpowiednich wzorow maturalnych.`, explanation: "" },
      { step: 3, title: "Wynik", content: "Doprowadz obliczenia do postaci wymaganej w poleceniu.", explanation: "" },
    ],
  };
}

const text = fs.readFileSync(SOURCE, "utf8");
const markerRegex = /=+\s*\r?\n=== ROK (\d{4}) ===\s*\r?\n=+\s*\r?\n/g;
const markers = [...text.matchAll(markerRegex)].map(m => ({ year: Number(m[1]), start: m.index + m[0].length }));
const tasks = [];

for (let i = 0; i < markers.length; i++) {
  const { year, start } = markers[i];
  const end = i + 1 < markers.length ? markers[i + 1].start : text.length;
  const body = text.slice(start, end);
  const taskRegex = /Zadanie\s+(\d+(?:\.\d+)?)\.\s*\(0[–-](\d+)\)/g;
  const matches = [...body.matchAll(taskRegex)];
  for (let j = 0; j < matches.length; j++) {
    const numberRaw = matches[j][1];
    const number = numberRaw.includes(".") ? numberRaw : Number(numberRaw);
    const points = Number(matches[j][2]);
    // W trybie "Zadania z matur" pokazujemy caly arkusz: rowniez zadania zamkniete
    // i kodowane z poczatku starych matur, bo uzytkownik chce "kazde zadanie jakie bylo".
    const blockStart = matches[j].index;
    const blockEnd = j + 1 < matches.length ? matches[j + 1].index : body.length;
    const statement = cleanBlock(body.slice(blockStart, blockEnd));
    if (statement.length >= 25) tasks.push(makeTask(year, number, points, statement));
  }
}

let js = "// Pelny bank zadan z PDF-ow CKE 2015-2026. Wygenerowano z matura_all_text.txt.\n";
js += "window.MaturaTasks = (() => {\n";
js += "  const TASKS = " + JSON.stringify(tasks, null, 2) + ";\n\n";
js += "  const getAll = () => [...TASKS];\n";
js += "  const getByYear = year => TASKS.filter(t => t.year === Number(year));\n";
js += "  const getByCategory = catId => TASKS.filter(t => t.category === Number(catId));\n";
js += "  const getById = id => TASKS.find(t => t.id === id);\n";
js += "  const getYears = () => [...new Set(TASKS.map(t => t.year))].sort((a, b) => b - a);\n";
js += "  const random = () => TASKS[Math.floor(Math.random() * TASKS.length)];\n";
js += "  const randomByYear = year => { const pool = getByYear(year); return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null; };\n";
js += "  const asTask = matura => matura ? ({ ...matura, type: 'matura', difficulty: 'matura', params: {} }) : null;\n";
js += "  return { getAll, getByYear, getByCategory, getById, getYears, random, randomByYear, asTask };\n";
js += "})();\n";

fs.writeFileSync(TARGET, js, "utf8");
console.log("written", tasks.length, "tasks");
const counts = new Map();
for (const task of tasks) counts.set(task.year, (counts.get(task.year) || 0) + 1);
for (const [year, count] of [...counts.entries()].sort((a, b) => a[0] - b[0])) console.log(year, count);
