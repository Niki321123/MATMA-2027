// Generator: Fale i akustyka (Doppler, interferencja, natężenie, fale dźwiękowe)
window.fiz07 = (() => {
  const M = window.MathUtils;

  // Schemat A: Efekt Dopplera — oblicz prędkość źródła (2024 zad.4, 2023 zad.4)
  function schemeA() {
    const v_sound = 340;  // m/s
    const f0 = M.choose([440, 500, 800, 1000, 2000]);  // Hz — częstotliwość źródła
    const v_source = M.choose([10, 20, 34, 40, 50, 68]);  // m/s — prędkość pojazdu

    // Obserwator A (przed pojazdem): fA = f0 * v/(v - v_source)
    // Obserwator B (za pojazdem): fB = f0 * v/(v + v_source)
    const fA = Math.round(f0 * v_sound / (v_sound - v_source));
    const fB = Math.round(f0 * v_sound / (v_sound + v_source));

    // Długości fal:
    const lambdaA = Math.round(v_sound / fA * 1000) / 1000;
    const lambdaB = Math.round(v_sound / fB * 1000) / 1000;
    const ratio = Math.round(lambdaB / lambdaA * 100) / 100;

    return {
      id: M.makeId('fiz07_doppler'),
      category: 'fiz07',
      categoryName: 'Fale i akustyka',
      type: 'fale_doppler',
      points: 4,
      params: { v_sound, f0, v_source, fA, fB, lambdaA, lambdaB, ratio },
      statement: `Ambulans jedzie z prędkością $v = ${v_source}\\,\\text{m/s}$ i wydaje dźwięk o częstotliwości $f_0 = ${f0}\\,\\text{Hz}$.
Prędkość dźwięku: $v_d = ${v_sound}\\,\\text{m/s}$.
Obserwator $A$ stoi przed ambulansem (ambulans się zbliża),
obserwator $B$ stoi za ambulansem (ambulans się oddala).

Iloraz długości fal $\\lambda_B / \\lambda_A = ${ratio}$.

Oblicz $v$ — prędkość ambulansu, wiedząc że $\\lambda_B / \\lambda_A = ${ratio}$.`,
      answer: {
        type: 'numeric',
        display: `v = ${v_source}\\,\\text{m/s}`,
        description: `Prędkość ambulansu: v = ${v_source} m/s.`
      },
      hints: [
        { level: 1, text: 'Długość fali: $\\lambda = v_d / f$. Dla obserwatora A: $\\lambda_A = \\frac{v_d - v}{f_0}$. Dla B: $\\lambda_B = \\frac{v_d + v}{f_0}$.' },
        { level: 2, text: `$\\frac{\\lambda_B}{\\lambda_A} = \\frac{v_d + v}{v_d - v} = ${ratio}$.` },
        { level: 3, text: 'Wyznacz v z tego równania.' }
      ],
      solution: [
        {
          step: 1,
          title: 'Długości fal rejestrowane przez obserwatorów',
          content: `\\lambda_A = \\frac{v_d - v}{f_0} \\qquad \\lambda_B = \\frac{v_d + v}{f_0}`,
          explanation: 'Długość fali zależy od odległości między grzbietami, a ta od tego, czy źródło się zbliża czy oddala.'
        },
        {
          step: 2,
          title: 'Równanie z ilorazu',
          content: `\\frac{v_d + v}{v_d - v} = ${ratio} \\implies v_d + v = ${ratio}(v_d - v) \\implies v = \\frac{(${ratio}-1)v_d}{${ratio}+1} = \\frac{${ratio - 1}\\cdot${v_sound}}{${ratio + 1}} = ${v_source}\\,\\text{m/s}`,
          explanation: ''
        }
      ]
    };
  }

  // Schemat B: Interferencja dwóch źródeł dźwięku (2025 zad.4)
  function schemeB() {
    const v_sound = 340; // m/s
    const f = M.choose([680, 850, 1000, 1700, 340]);  // Hz
    const lambda = Math.round(v_sound / f * 1000) / 1000;  // m

    const r1 = M.choose([8, 9, 10, 11, 12]);  // m
    const dr = M.choose([1, 2, 3, 4]);
    const r2 = r1 + dr;  // m

    const delta = r2 - r1;  // droga geometryczna
    const delta_in_lambda = Math.round(delta / lambda * 100) / 100;
    const isInt = Math.abs(delta_in_lambda - Math.round(delta_in_lambda)) < 0.05;
    const isHalfInt = Math.abs(delta_in_lambda - (Math.floor(delta_in_lambda) + 0.5)) < 0.05;
    const resultType = isInt ? 'wzmocnienie' : isHalfInt ? 'wygaszenie' : 'pośrednie';

    if (resultType === 'pośrednie') return schemeB(); // retry

    return {
      id: M.makeId('fiz07_interferencja'),
      category: 'fiz07',
      categoryName: 'Fale i akustyka',
      type: 'fale_interferencja',
      points: 3,
      params: { v_sound, f, lambda, r1, r2, delta, delta_in_lambda, resultType },
      statement: `Dwa identyczne głośniki $G_1$ i $G_2$ emitują synchronicznie i w tej samej fazie fale dźwiękowe o częstotliwości $f = ${f}\\,\\text{Hz}$.
Prędkość dźwięku: $v = ${v_sound}\\,\\text{m/s}$.
Punkt $P$ jest odległy od $G_1$ o $r_1 = ${r1}\\,\\text{m}$ i od $G_2$ o $r_2 = ${r2}\\,\\text{m}$.

Ustal, czy w punkcie $P$ nastąpi **wzmocnienie** czy **wygaszenie** interferencyjne.`,
      answer: {
        type: 'qualitative',
        display: resultType === 'wzmocnienie'
          ? `\\Delta r = ${delta}\\,\\text{m} = ${delta_in_lambda}\\lambda \\Rightarrow \\textbf{wzmocnienie}\\text{ interferencyjne}`
          : `\\Delta r = ${delta}\\,\\text{m} = ${delta_in_lambda}\\lambda \\Rightarrow \\textbf{wygaszenie}\\text{ interferencyjne}`,
        description: `Różnica dróg Δr = ${delta} m = ${delta_in_lambda}λ. ${resultType === 'wzmocnienie' ? 'Całkowita liczba długości fal → wzmocnienie.' : 'Połówkowa liczba długości fal → wygaszenie.'}`
      },
      hints: [
        { level: 1, text: `Długość fali: $\\lambda = \\frac{v}{f} = \\frac{${v_sound}}{${f}} = ${lambda}\\,\\text{m}$.` },
        { level: 2, text: `Oblicz różnicę dróg: $\\Delta r = r_2 - r_1 = ${r2} - ${r1} = ${delta}\\,\\text{m}$.` },
        { level: 3, text: `Wzmocnienie gdy $\\Delta r = k\\lambda$ (całkowita krotność), wygaszenie gdy $\\Delta r = (k+\\frac{1}{2})\\lambda$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Długość fali',
          content: `\\lambda = \\frac{v}{f} = \\frac{${v_sound}}{${f}} = ${lambda}\\,\\text{m}`,
          explanation: ''
        },
        {
          step: 2,
          title: 'Różnica dróg',
          content: `\\Delta r = r_2 - r_1 = ${r2} - ${r1} = ${delta}\\,\\text{m} = ${delta_in_lambda}\\lambda`,
          explanation: ''
        },
        {
          step: 3,
          title: 'Wniosek',
          content: resultType === 'wzmocnienie'
            ? `\\Delta r = ${delta_in_lambda}\\lambda \\in \\mathbb{Z} \\Rightarrow \\textbf{wzmocnienie interferencyjne}`
            : `\\Delta r = ${delta_in_lambda}\\lambda = (k+\\tfrac{1}{2})\\lambda \\Rightarrow \\textbf{wygaszenie interferencyjne}`,
          explanation: 'Źródła zgodne w fazie: wzmocnienie dla Δr = kλ, wygaszenie dla Δr = (k+½)λ.'
        }
      ]
    };
  }

  // Schemat C: Natężenie fali sferycznej (2025 zad.4)
  function schemeC() {
    const P = M.choose([10, 20, 40, 100]);  // moc mW
    const r1 = M.choose([5, 8, 10, 20]);    // m
    const r2 = M.choose([20, 50, 100]);      // m
    if (r2 <= r1) return schemeC();

    // I = P / (4*pi*r²)
    const I1_val = P * 1e-3 / (4 * Math.PI * r1 * r1);
    const I1 = I1_val.toExponential(2);
    const ratio_sq = Math.round(r2 * r2 / (r1 * r1));

    return {
      id: M.makeId('fiz07_natezenie'),
      category: 'fiz07',
      categoryName: 'Fale i akustyka',
      type: 'fale_natezenie',
      points: 2,
      params: { P, r1, r2, I1, ratio_sq },
      statement: `Głośnik $G$ emituje kulistą falę dźwiękową z mocą $P = ${P}\\,\\text{mW}$.
Punkt $A$ leży w odległości $r_1 = ${r1}\\,\\text{m}$ od głośnika.

a) Oblicz $I$ — natężenie dźwięku w punkcie $A$.
b) Ile razy mniejsze jest natężenie w punkcie $B$ odległym o $r_2 = ${r2}\\,\\text{m}$?`,
      answer: {
        type: 'multipart',
        display: `I = ${I1}\\,\\text{W/m}^2,\\quad \\frac{I_A}{I_B} = ${ratio_sq}`,
        description: `Natężenie w A: ${I1} W/m². Natężenie w B jest ${ratio_sq} razy mniejsze.`
      },
      hints: [
        { level: 1, text: `Natężenie fali sferycznej: $I = \\frac{P}{4\\pi r^2}$.` },
        { level: 2, text: `Natężenie maleje jak $1/r^2$: $\\frac{I_A}{I_B} = \\left(\\frac{r_2}{r_1}\\right)^2$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Natężenie w punkcie A',
          content: `I_A = \\frac{P}{4\\pi r_1^2} = \\frac{${P}\\cdot10^{-3}}{4\\pi\\cdot${r1}^2} = ${I1}\\,\\text{W/m}^2`,
          explanation: 'Moc rozkłada się równomiernie na sferę.'
        },
        {
          step: 2,
          title: 'Stosunek natężeń',
          content: `\\frac{I_A}{I_B} = \\frac{r_2^2}{r_1^2} = \\frac{${r2}^2}{${r1}^2} = ${ratio_sq}`,
          explanation: 'Natężenie ∝ 1/r².'
        }
      ]
    };
  }

  // Schemat D: Prawo Snella dla fal dźwiękowych / dyfrakcja (2025 zad.3)
  function schemeD() {
    const v1 = M.choose([340, 300, 350]);    // prędkość w powietrzu m/s
    const v2 = M.choose([1450, 1500, 1200]); // prędkość w wodzie/cieczy m/s
    const angleDeg1 = M.choose([30, 45, 60]); // kąt padania

    // Prawo Snella: sin(θ1)/v1 = sin(θ2)/v2
    const sinT1 = Math.sin(angleDeg1 * Math.PI / 180);
    const sinT2 = sinT1 * v2 / v1;

    if (sinT2 > 1) return schemeD(); // TIR — retry

    const angleDeg2 = Math.round(Math.asin(sinT2) * 180 / Math.PI * 10) / 10;

    return {
      id: M.makeId('fiz07_snell_dzwiek'),
      category: 'fiz07',
      categoryName: 'Fale i akustyka',
      type: 'fale_snell_dzwiek',
      points: 3,
      params: { v1, v2, angleDeg1, angleDeg2, sinT2: Math.round(sinT2 * 1000) / 1000 },
      statement: `Wiązka ultradźwięków biegnie w powietrzu ($v_1 = ${v1}\\,\\text{m/s}$)
i pada na taflę wody ($v_2 = ${v2}\\,\\text{m/s}$) pod kątem $\\theta_1 = ${angleDeg1}°$.

Oblicz kąt załamania $\\theta_2$.`,
      answer: {
        type: 'numeric',
        display: `\\theta_2 = ${angleDeg2}°`,
        description: `Kąt załamania: θ₂ ≈ ${angleDeg2}°.`
      },
      hints: [
        { level: 1, text: 'Prawo Snella (dla fal): $\\frac{\\sin\\theta_1}{v_1} = \\frac{\\sin\\theta_2}{v_2}$.' },
        { level: 2, text: `$\\sin\\theta_2 = \\sin${angleDeg1}°\\cdot\\frac{v_2}{v_1} = ${Math.round(sinT1 * 1000) / 1000}\\cdot\\frac{${v2}}{${v1}} = ${Math.round(sinT2 * 1000) / 1000}$.` },
        { level: 3, text: `$\\theta_2 = \\arcsin(${Math.round(sinT2 * 1000) / 1000}) \\approx ${angleDeg2}°$.` }
      ],
      solution: [
        {
          step: 1,
          title: 'Prawo Snella dla fal',
          content: `\\frac{\\sin${angleDeg1}°}{${v1}} = \\frac{\\sin\\theta_2}{${v2}} \\implies \\sin\\theta_2 = ${Math.round(sinT2 * 1000) / 1000}`,
          explanation: 'Fala przechodzi do ośrodka o większej prędkości → zakrzywia się od normalnej.'
        },
        {
          step: 2,
          title: 'Kąt załamania',
          content: `\\theta_2 = \\arcsin(${Math.round(sinT2 * 1000) / 1000}) \\approx ${angleDeg2}°`,
          explanation: ''
        }
      ]
    };
  }

  function generate() {
    return M.choose([schemeA, schemeB, schemeC, schemeD])();
  }

  return { generate };
})();
