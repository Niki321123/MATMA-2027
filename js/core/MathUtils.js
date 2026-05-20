// MathUtils — narzędzia do generowania "ładnych" zadań matematycznych
const MathUtils = (() => {

  // ===== LOSOWANIE =====
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function sign() { return Math.random() < 0.5 ? 1 : -1; }
  function nonZeroRand(min, max) {
    let v; do { v = rand(min, max); } while (v === 0); return v;
  }

  // ===== "ŁADNE" LICZBY =====
  const NICE_POOLS = {
    easy:   [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16],
    medium: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18, 20],
    hard:   [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 20, 21, 24, 25]
  };
  function pickNice(diff = 'medium') { return choose(NICE_POOLS[diff] || NICE_POOLS.medium); }
  function pickNiceNonZero(diff) { return choose(NICE_POOLS[diff || 'medium']); }

  // ===== NWD / NWW =====
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcd(b, a % b); }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

  // ===== UŁAMKI =====
  function simplifyFraction(num, den) {
    if (den === 0) return { num: NaN, den: 1 };
    const g = gcd(Math.abs(num), Math.abs(den));
    const s = den < 0 ? -1 : 1;
    return { num: s * num / g, den: s * den / g };
  }

  // Latex ułamka: latexFrac(3,4) → "\\frac{3}{4}", latexFrac(6,1) → "6"
  function latexFrac(num, den) {
    const f = simplifyFraction(num, den);
    if (f.den === 1) return String(f.num);
    if (f.den === -1) return String(-f.num);
    return `\\frac{${f.num}}{${f.den}}`;
  }

  // Latex ułamka z sign dla sumy: "+\\frac{3}{4}" lub "-2"
  function latexFracSigned(num, den) {
    const f = simplifyFraction(num, den);
    const abs_num = Math.abs(f.num);
    if (f.num >= 0) {
      return f.den === 1 ? `+${f.num}` : `+\\frac{${f.num}}{${f.den}}`;
    } else {
      return f.den === 1 ? `${f.num}` : `-\\frac{${abs_num}}{${f.den}}`;
    }
  }

  // Czytelny ułamek numeryczny
  function fracValue(num, den) { return num / den; }

  // ===== WIELOMIANY =====
  // Współczynniki trójmianu kwadratowego a*x²+b*x+c z pierwiastkami x1, x2
  function quadFromRoots(x1, x2, a = 1) {
    return {
      a,
      b: -a * (x1 + x2),
      c: a * x1 * x2,
      roots: [x1, x2]
    };
  }

  // Wyróżnik trójmianu kwadratowego
  function discriminant(a, b, c) { return b * b - 4 * a * c; }

  // Latex trójmianu: ax²+bx+c
  function latexPoly2(a, b, c, variable = 'x') {
    let s = '';
    if (a !== 0) {
      s += a === 1 ? `${variable}^2` : a === -1 ? `-${variable}^2` : `${a}${variable}^2`;
    }
    if (b !== 0) {
      if (b === 1) s += `+${variable}`;
      else if (b === -1) s += `-${variable}`;
      else if (b > 0) s += `+${b}${variable}`;
      else s += `${b}${variable}`;
    }
    if (c !== 0) {
      if (c > 0) s += `+${c}`;
      else s += `${c}`;
    }
    if (s === '' || s === '+') s = '0';
    if (s.startsWith('+')) s = s.slice(1);
    return s;
  }

  // Latex wielomianu stopnia 3: ax³+bx²+cx+d
  function latexPoly3(a, b, c, d, variable = 'x') {
    const terms = [];
    if (a !== 0) terms.push(a === 1 ? `${variable}^3` : a === -1 ? `-${variable}^3` : `${a}${variable}^3`);
    if (b !== 0) {
      const s = b > 0 && terms.length > 0 ? `+${b}` : `${b}`;
      terms.push(b === 1 ? `+${variable}^2` : b === -1 ? `-${variable}^2` : `${s}${variable}^2`);
    }
    if (c !== 0) {
      const s = c > 0 && terms.length > 0 ? `+${c}` : `${c}`;
      terms.push(c === 1 ? `+${variable}` : c === -1 ? `-${variable}` : `${s}${variable}`);
    }
    if (d !== 0) terms.push(d > 0 && terms.length > 0 ? `+${d}` : `${d}`);
    return terms.join('').replace(/^\+/, '') || '0';
  }

  // ===== TRÓJKI PITAGOREJSKIE =====
  const PYTHAGOREAN_TRIPLES = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[5,12,13],[20,21,29]];
  function pythagorean(scale = 1) {
    const t = choose(PYTHAGOREAN_TRIPLES);
    return t.map(x => x * scale);
  }
  // Zwraca trójkę gdzie a²+b²=c²
  function pythagoreanTriple() { return choose(PYTHAGOREAN_TRIPLES); }

  // ===== KĄTY TRYGONOMETRYCZNE =====
  const NICE_ANGLES_DEG = [30, 45, 60];
  const NICE_ANGLES_EXTENDED = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
  // Dokładne wartości trygonometryczne
  const TRIG_EXACT = {
    0:   { sin: '0', cos: '1', tg: '0', sinVal: 0, cosVal: 1 },
    30:  { sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tg: '\\frac{\\sqrt{3}}{3}', sinVal: 0.5, cosVal: Math.sqrt(3)/2 },
    45:  { sin: '\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', tg: '1', sinVal: Math.sqrt(2)/2, cosVal: Math.sqrt(2)/2 },
    60:  { sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tg: '\\sqrt{3}', sinVal: Math.sqrt(3)/2, cosVal: 0.5 },
    90:  { sin: '1', cos: '0', tg: undefined, sinVal: 1, cosVal: 0 },
    120: { sin: '\\frac{\\sqrt{3}}{2}', cos: '-\\frac{1}{2}', tg: '-\\sqrt{3}', sinVal: Math.sqrt(3)/2, cosVal: -0.5 },
    135: { sin: '\\frac{\\sqrt{2}}{2}', cos: '-\\frac{\\sqrt{2}}{2}', tg: '-1', sinVal: Math.sqrt(2)/2, cosVal: -Math.sqrt(2)/2 },
    150: { sin: '\\frac{1}{2}', cos: '-\\frac{\\sqrt{3}}{2}', tg: '-\\frac{\\sqrt{3}}{3}', sinVal: 0.5, cosVal: -Math.sqrt(3)/2 },
    180: { sin: '0', cos: '-1', tg: '0', sinVal: 0, cosVal: -1 },
    210: { sin: '-\\frac{1}{2}', cos: '-\\frac{\\sqrt{3}}{2}', tg: '\\frac{\\sqrt{3}}{3}', sinVal: -0.5, cosVal: -Math.sqrt(3)/2 },
    225: { sin: '-\\frac{\\sqrt{2}}{2}', cos: '-\\frac{\\sqrt{2}}{2}', tg: '1', sinVal: -Math.sqrt(2)/2, cosVal: -Math.sqrt(2)/2 },
    240: { sin: '-\\frac{\\sqrt{3}}{2}', cos: '-\\frac{1}{2}', tg: '\\sqrt{3}', sinVal: -Math.sqrt(3)/2, cosVal: -0.5 },
    270: { sin: '-1', cos: '0', tg: undefined, sinVal: -1, cosVal: 0 },
    300: { sin: '-\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tg: '-\\sqrt{3}', sinVal: -Math.sqrt(3)/2, cosVal: 0.5 },
    315: { sin: '-\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', tg: '-1', sinVal: -Math.sqrt(2)/2, cosVal: Math.sqrt(2)/2 },
    330: { sin: '-\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tg: '-\\frac{\\sqrt{3}}{3}', sinVal: -0.5, cosVal: Math.sqrt(3)/2 }
  };
  function niceAngle(includeMultiples = false) {
    return includeMultiples ? choose(NICE_ANGLES_EXTENDED) : choose(NICE_ANGLES_DEG);
  }
  function getTrig(deg) { return TRIG_EXACT[deg] || null; }

  // ===== PIERWIASTKI "ŁADNE" =====
  function isNiceRoot(discriminantVal) {
    if (discriminantVal < 0) return false;
    const s = Math.sqrt(discriminantVal);
    return Number.isInteger(s);
  }

  // Sprawdź czy liczba jest pierwiastkiem ładnym (drugiego stopnia)
  function niceSquareRoot(n) {
    if (n < 0) return null;
    const s = Math.round(Math.sqrt(n));
    if (s * s === n) return { whole: s, latex: String(s) };
    // Szukaj najdrobniejszego zapisu: c*sqrt(d)
    for (let k = 2; k * k <= n; k++) {
      if (n % (k * k) === 0) {
        const inside = n / (k * k);
        return { whole: null, latex: inside === 1 ? `${k}` : `${k}\\sqrt{${inside}}` };
      }
    }
    return { whole: null, latex: `\\sqrt{${n}}` };
  }

  // ===== FORMATOWANIE LATEX =====
  function signedNum(n) {
    if (n === 0) return '0';
    if (n > 0) return `+${n}`;
    return `${n}`;
  }
  function signedNumNoPlus(n) { return String(n); }

  // Latex współczynnika przy zmiennej: 1→"", -1→"-", 2→"2", -2→"-2"
  function latexCoeff(c) {
    if (c === 1) return '';
    if (c === -1) return '-';
    return String(c);
  }

  // Latex wyrażenia ax gdzie a może być 1,-1,n
  function latexTerm(coeff, varName) {
    if (coeff === 0) return '0';
    if (coeff === 1) return varName;
    if (coeff === -1) return `-${varName}`;
    return `${coeff}${varName}`;
  }

  // ===== KOMBINATORYKA =====
  function factorial(n) {
    if (n <= 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }
  function combinations(n, k) {
    if (k > n || k < 0) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
  }
  function permutations(n, k) {
    if (k > n || k < 0) return 0;
    return factorial(n) / factorial(n - k);
  }

  // ===== POTĘGI / LOGARYTMY =====
  // Sprawdź czy n = base^k dla całkowitego k
  function isPerfectPower(n, base) {
    if (n <= 0) return null;
    let x = n, k = 0;
    while (x % base === 0) { x /= base; k++; }
    return x === 1 ? k : null;
  }

  // ===== RETRY WRAPPER =====
  // Próbuje wygenerować zadanie max maxAttempts razy
  function retry(generatorFn, validatorFn, maxAttempts = 15) {
    for (let i = 0; i < maxAttempts; i++) {
      const result = generatorFn();
      if (!validatorFn || validatorFn(result)) return result;
    }
    return generatorFn(); // fallback
  }

  // ===== CAŁKI =====
  // Latex dla całki nieoznaczonej wielomianu
  function integratePolyTerm(coeff, power) {
    if (coeff === 0) return '0';
    const newPow = power + 1;
    const newCoeff = simplifyFraction(coeff, newPow);
    const coeffStr = newCoeff.den === 1 ? String(newCoeff.num) :
                     `\\frac{${newCoeff.num}}{${newCoeff.den}}`;
    if (newPow === 0) return coeffStr;
    if (newPow === 1) return `${coeffStr}x`;
    return `${coeffStr}x^{${newPow}}`;
  }

  // ===== GENEROWANIE ID =====
  function makeId(prefix) {
    return `${prefix}_${Date.now()}_${rand(100, 999)}`;
  }

  return {
    rand, choose, sign, nonZeroRand,
    pickNice, pickNiceNonZero,
    gcd, lcm,
    simplifyFraction, latexFrac, latexFracSigned, fracValue,
    quadFromRoots, discriminant, latexPoly2, latexPoly3,
    pythagorean, pythagoreanTriple,
    niceAngle, getTrig, TRIG_EXACT, NICE_ANGLES_DEG, NICE_ANGLES_EXTENDED,
    isNiceRoot, niceSquareRoot,
    signedNum, signedNumNoPlus, latexCoeff, latexTerm,
    factorial, combinations, permutations,
    isPerfectPower,
    retry, integratePolyTerm, makeId
  };
})();

window.MathUtils = MathUtils;
