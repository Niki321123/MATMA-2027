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
    { id: 16, name: 'Zadania 6-punktowe',              color: '#e74c3c', icon: '★',  gen: () => window.cat16 },
  ];

  // ── Kategorie PP (Matura Podstawowa) ──────────────────────────────────────
  const PP_CATEGORIES = [
    { id: 'pp01', name: 'Liczby rzeczywiste',         color: '#f7b731', icon: '√',   level: 'PP', gen: () => window.pp01 },
    { id: 'pp02', name: 'Procenty i finanse',          color: '#fd9644', icon: '%',   level: 'PP', gen: () => window.pp02 },
    { id: 'pp03', name: 'Wyrażenia algebraiczne',      color: '#fc5c65', icon: 'x²',  level: 'PP', gen: () => window.pp03 },
    { id: 'pp04', name: 'Równania i układy',           color: '#eb3b5a', icon: '=',   level: 'PP', gen: () => window.pp04 },
    { id: 'pp05', name: 'Nierówności',                 color: '#a55eea', icon: '≤',   level: 'PP', gen: () => window.pp05 },
    { id: 'pp06', name: 'Funkcja liniowa',             color: '#4b7bec', icon: 'f',   level: 'PP', gen: () => window.pp06 },
    { id: 'pp07', name: 'Funkcja kwadratowa',          color: '#2d98da', icon: '∩',   level: 'PP', gen: () => window.pp07 },
    { id: 'pp08', name: 'Ciągi (PP)',                  color: '#26de81', icon: 'aₙ',  level: 'PP', gen: () => window.pp08 },
    { id: 'pp09', name: 'Trygonometria (PP)',          color: '#20bf6b', icon: 'sin', level: 'PP', gen: () => window.pp09 },
    { id: 'pp10', name: 'Planimetria (PP)',            color: '#0fb9b1', icon: '△',   level: 'PP', gen: () => window.pp10 },
    { id: 'pp11', name: 'Stereometria (PP)',           color: '#45aaf2', icon: '⬡',   level: 'PP', gen: () => window.pp11 },
    { id: 'pp12', name: 'Statystyka',                  color: '#778ca3', icon: 'x̄',   level: 'PP', gen: () => window.pp12 },
    { id: 'pp13', name: 'Prawdopodobieństwo (PP)',     color: '#fd9644', icon: 'P',   level: 'PP', gen: () => window.pp13 },
    { id: 'pp14', name: 'Geometria analityczna (PP)', color: '#a55eea', icon: '⊙',   level: 'PP', gen: () => window.pp14 },
  ];

  const ALL_CATEGORIES = [...CATEGORIES, ...PP_CATEGORIES];

  function getMeta(id) {
    return ALL_CATEGORIES.find(c => c.id === id) || null;
  }

  function getAll() {
    return CATEGORIES;
  }

  function getAllPP() {
    return PP_CATEGORIES;
  }

  function getByLevel(level) {
    if (level === 'PP') return PP_CATEGORIES;
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

  function generateRandomPP() {
    const meta = PP_CATEGORIES[Math.floor(Math.random() * PP_CATEGORIES.length)];
    return generate(meta.id);
  }

  return { getMeta, getAll, getAllPP, getByLevel, generate, generateRandom, generateRandomPP };
})();
