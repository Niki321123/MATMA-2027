// Rejestr wszystkich generatorów zadań
window.Generators = (() => {
  const CATEGORIES = [
    { id: 1,  name: 'Funkcja wykładnicza w praktyce', color: '#f7b731', icon: '📈', gen: () => window.cat01 },
    { id: 2,  name: 'Granica ciągu i funkcji',        color: '#fd9644', icon: '∞',  gen: () => window.cat02 },
    { id: 3,  name: 'Logarytmy',                       color: '#fc5c65', icon: 'log', gen: () => window.cat03 },
    { id: 4,  name: 'Styczna do wykresu',              color: '#eb3b5a', icon: '∂',  gen: () => window.cat04 },
    { id: 5,  name: 'Dowód nierówności',               color: '#a55eea', icon: '≥',  gen: () => window.cat05 },
    { id: 6,  name: 'Nierówność z |...|',              color: '#4b7bec', icon: '|x|', gen: () => window.cat06 },
    { id: 7,  name: 'Ciągi liczbowe',                  color: '#2d98da', icon: 'aₙ', gen: () => window.cat07 },
    { id: 8,  name: 'Planimetria',                     color: '#26de81', icon: '△',  gen: () => window.cat08 },
    { id: 9,  name: 'Równania trygonometryczne',       color: '#20bf6b', icon: 'sin', gen: () => window.cat09 },
    { id: 10, name: 'Stereometria',                    color: '#0fb9b1', icon: '⬡',  gen: () => window.cat10 },
    { id: 11, name: 'Geometria analityczna',           color: '#45aaf2', icon: '⊙',  gen: () => window.cat11 },
    { id: 12, name: 'Parametr w równaniu',             color: '#778ca3', icon: 'm',  gen: () => window.cat12 },
    { id: 13, name: 'Prawdopodobieństwo',              color: '#fd9644', icon: 'P',  gen: () => window.cat13 },
    { id: 14, name: 'Kombinatoryka',                   color: '#a55eea', icon: '∁',  gen: () => window.cat14 },
    { id: 15, name: 'Optymalizacja',                   color: '#26de81', icon: 'max', gen: () => window.cat15 },
  ];

  function getMeta(id) {
    return CATEGORIES.find(c => c.id === id) || null;
  }

  function getAll() {
    return CATEGORIES;
  }

  function generate(categoryId) {
    const meta = getMeta(categoryId);
    if (!meta) throw new Error(`Nieznana kategoria: ${categoryId}`);
    const gen = meta.gen();
    if (!gen) throw new Error(`Generator kategorii ${categoryId} nie jest załadowany`);
    return gen.generate();
  }

  function generateRandom() {
    const meta = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    return generate(meta.id);
  }

  return { getMeta, getAll, generate, generateRandom };
})();
