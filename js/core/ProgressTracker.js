// ProgressTracker — zarządzanie postępami ucznia w localStorage
const ProgressTracker = (() => {
  const KEY = 'matura_matma_progress_v2';

  const CAT_NAMES = {
    1: 'Funkcja wykł. w praktyce',
    2: 'Granica',
    3: 'Logarytmy',
    4: 'Styczna do wykresu',
    5: 'Dowód nierówności',
    6: 'Nierówność z |...|',
    7: 'Ciągi liczbowe',
    8: 'Planimetria',
    9: 'Równanie trygonometryczne',
    10: 'Stereometria',
    11: 'Geometria analityczna',
    12: 'Rów. z parametrem',
    13: 'Schemat Bernoulliego',
    14: 'Kombinatoryka',
    15: 'Optymalizacja'
  };

  function defaultState() {
    const cats = {};
    for (let i = 1; i <= 15; i++) cats[i] = { attempted: 0, correct: 0 };
    return {
      version: 2,
      stats: {
        totalAttempted: 0,
        totalCorrect: 0,
        streak: 0,
        lastActiveDate: null
      },
      categories: cats,
      history: []
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const data = JSON.parse(raw);
      if (data.version !== 2) return defaultState();
      return data;
    } catch {
      return defaultState();
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('ProgressTracker: cannot save', e);
    }
  }

  function getToday() {
    return new Date().toISOString().slice(0, 10);
  }

  // Zaktualizuj streak
  function updateStreak(data) {
    const today = getToday();
    if (data.stats.lastActiveDate === today) return;
    if (data.stats.lastActiveDate) {
      const last = new Date(data.stats.lastActiveDate);
      const now = new Date(today);
      const diff = (now - last) / (1000 * 60 * 60 * 24);
      data.stats.streak = diff <= 1 ? data.stats.streak + 1 : 1;
    } else {
      data.stats.streak = 1;
    }
    data.stats.lastActiveDate = today;
  }

  // Zarejestruj attempt
  function record(categoryId, correct) {
    const data = load();
    updateStreak(data);
    data.stats.totalAttempted++;
    if (correct) data.stats.totalCorrect++;

    const cat = data.categories[categoryId];
    if (cat) {
      cat.attempted++;
      if (correct) cat.correct++;
    }

    data.history.unshift({ cat: categoryId, correct, date: getToday() });
    if (data.history.length > 100) data.history = data.history.slice(0, 100);

    save(data);
    return data;
  }

  function getAll() { return load(); }

  function getTodayStats() {
    const data = load();
    const today = getToday();
    const todayHistory = data.history.filter(h => h.date === today);
    return {
      attempted: todayHistory.length,
      correct: todayHistory.filter(h => h.correct).length,
      streak: data.stats.streak
    };
  }

  function getCategoryStats(catId) {
    const data = load();
    return data.categories[catId] || { attempted: 0, correct: 0 };
  }

  function getCategoryPercent(catId) {
    const s = getCategoryStats(catId);
    if (s.attempted === 0) return null;
    return Math.round((s.correct / s.attempted) * 100);
  }

  function getStats() {
    return load().stats;
  }

  function reset() {
    save(defaultState());
  }

  function getCatName(id) { return CAT_NAMES[id] || `Kategoria ${id}`; }

  return {
    record, getAll, getTodayStats, getStats,
    getCategoryStats, getCategoryPercent,
    reset, getCatName,
    CAT_NAMES
  };
})();

window.ProgressTracker = ProgressTracker;
