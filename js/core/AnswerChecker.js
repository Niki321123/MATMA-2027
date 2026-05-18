// AnswerChecker — prosta weryfikacja odpowiedzi
// W trybie self-assessment: user sam decyduje czy dobrze rozwiązał
// Dla zadań typu "number": próba porównania numerycznego
const AnswerChecker = (() => {

  // Porównanie numeryczne z tolerancją
  function numeric(userInput, expected, tolerance = 0.001) {
    const val = parseFloat(userInput.replace(',', '.').trim());
    if (isNaN(val)) return null; // nie można sprawdzić
    return Math.abs(val - expected) <= tolerance;
  }

  // Normalizacja stringa (do prostych porównań tekstowych)
  function normalize(s) {
    return s.replace(/\s+/g, '').toLowerCase()
      .replace(/\*/g, '·')
      .replace(/\^/g, '');
  }

  // Sprawdź czy user wpisał liczbę która jest "bliska" expected
  function checkNumber(userInput, expected, tolerance = 1e-6) {
    if (!userInput) return null;
    const clean = userInput.replace(',', '.').replace(/\s/g, '');
    const val = parseFloat(clean);
    if (isNaN(val)) return null;
    return Math.abs(val - expected) / (Math.abs(expected) + 1e-10) < tolerance + 0.001;
  }

  // Sprawdź ułamek zapisany jako "a/b"
  function checkFraction(userInput, numExpected, denExpected) {
    if (!userInput) return null;
    const clean = userInput.trim().replace(/\s/g, '');
    const parts = clean.split('/');
    if (parts.length === 2) {
      const n = parseFloat(parts[0]);
      const d = parseFloat(parts[1]);
      if (!isNaN(n) && !isNaN(d) && d !== 0) {
        return Math.abs(n / d - numExpected / denExpected) < 0.001;
      }
    }
    return checkNumber(userInput, numExpected / denExpected);
  }

  return { numeric, normalize, checkNumber, checkFraction };
})();

window.AnswerChecker = AnswerChecker;
