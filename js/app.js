// app.js — główna logika aplikacji
(() => {
  'use strict';

  const G   = window.Generators;
  const KR  = window.KatexRenderer;
  const PT  = window.ProgressTracker;
  const MT  = window.MaturaTasks;
  const CKE = window.MaturaCKE;   // baza zadań CKE (arkusze PDF 2002-2026)

  // === Stan ===
  let currentTask    = null;
  let hintsUsed      = 0;
  let taskAnswered   = false;
  let hintPenalty    = false;   // true gdy użyto wskazówki lub rozwiązania
  let currentMode    = 'generator';
  let firstTaskShown = false;

  // === Definicja przedmiotów ===
  const SUBJECTS_DEF = [
    { id: 'PR',   name: 'Matematyka',  sub: 'Rozszerzona', icon: '📕', color: '#e74c3c', available: true },
    { id: 'PP',   name: 'Matematyka',  sub: 'Podstawowa',  icon: '📗', color: '#26de81', available: true },
    { id: 'FIZ',  name: 'Fizyka',      sub: 'Rozszerzona', icon: '⚛️', color: '#45aaf2', available: true },
    { id: 'POL',  name: 'Polski',      sub: 'Rozszerzona', icon: '📖', color: '#fd9644', available: false },
    { id: 'BIO',  name: 'Biologia',    sub: 'Rozszerzona', icon: '🧬', color: '#20bf6b', available: false },
    { id: 'HIST', name: 'Historia',    sub: 'Rozszerzona', icon: '📜', color: '#778ca3', available: false },
    { id: 'CHEM', name: 'Chemia',      sub: 'Rozszerzona', icon: '🧪', color: '#a55eea', available: false },
    { id: 'GEO',  name: 'Geografia',   sub: 'Rozszerzona', icon: '🌍', color: '#2bcbba', available: false },
  ];

  // Załaduj zapisane przedmioty (localStorage jako fallback)
  function getLocalSubjects() {
    try { return JSON.parse(localStorage.getItem('userSubjects')); } catch { return null; }
  }

  // Ostateczne subjects — z SA jeśli zalogowany, inaczej localStorage
  function getEffectiveSubjects() {
    if (SA?.isLoggedIn()) {
      const s = SA.getSubjects();
      if (s !== null) return s;
    }
    return getLocalSubjects();
  }

  // === Poziom matematyki (PP / PR / FIZ) ===
  let levelModalCallback = null;

  function getMathLevel() { return localStorage.getItem('mathLevel') || 'PR'; }

  function setMathLevel(level) {
    localStorage.setItem('mathLevel', level);
    rebuildCategorySelect();
    updateLogoSubtitle();
    updateLevelRow();
  }

  function openLevelModal(callback) {
    levelModalCallback = callback || null;
    $('modal-level')?.classList.remove('hidden');
  }

  function closeLevelModal() {
    $('modal-level')?.classList.add('hidden');
  }

  function chooseMathLevel(level) {
    setMathLevel(level);
    closeLevelModal();
    if (levelModalCallback) { levelModalCallback(); levelModalCallback = null; }
  }

  function rebuildCategorySelect() {
    if (!elCatSelect) return;
    elCatSelect.innerHTML = '<option value="0">🎲 Losowa kategoria</option>';
    const lvl = getMathLevel();
    const cats = lvl === 'PP' ? G.getAllPP() : lvl === 'FIZ' ? G.getAllFiz() : G.getAll();
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = typeof cat.id === 'number' ? `${cat.id}. ${cat.name}` : cat.name;
      elCatSelect.appendChild(opt);
    });
  }

  function updateLogoSubtitle() {
    const sub = document.querySelector('.logo-sub');
    const lvl = getMathLevel();
    if (sub) sub.textContent = lvl === 'PP'
      ? 'Matematyka podstawowa'
      : lvl === 'FIZ'
        ? 'Fizyka rozszerzona'
        : 'Matematyka rozszerzona';
  }

  function updateLevelRow() {
    const row = $('um-level-row');
    if (!row) return;
    const subjects = getEffectiveSubjects();
    if (subjects && subjects.length > 0) {
      const names = subjects.map(id => {
        const def = SUBJECTS_DEF.find(s => s.id === id);
        return def ? `${def.icon} ${def.name}` : id;
      });
      row.textContent = 'Przedmioty: ' + names.join(', ');
    } else {
      const lvl = getMathLevel();
      row.textContent = lvl === 'PP' ? 'Poziom: Matematyka podstawowa'
        : lvl === 'FIZ' ? 'Przedmiot: Fizyka rozszerzona'
        : 'Poziom: Matematyka rozszerzona';
    }
  }

  function initLevelEvents() {
    $('btn-level-pp')?.addEventListener('click', () => chooseMathLevel('PP'));
    $('btn-level-pr')?.addEventListener('click', () => chooseMathLevel('PR'));
    $('btn-level-fiz')?.addEventListener('click', () => chooseMathLevel('FIZ'));
    $('btn-um-change-level')?.addEventListener('click', () => {
      $('modal-user')?.classList.add('hidden');
      const cur = getEffectiveSubjects() || [];
      _obSelected = new Set(cur);
      _renderObGrid();
      cur.forEach(id => {
        const card = document.querySelector(`.ob-card[data-id="${id}"]`);
        if (card) {
          card.classList.add('ob-card--selected');
          const check = card.querySelector('.ob-card-check');
          if (check) check.textContent = '✓';
        }
      });
      $('modal-onboarding')?.classList.remove('hidden');
    });
  }

  // ===== ONBOARDING =====

  let _obSelected = new Set();

  function openOnboarding() {
    _obSelected = new Set();
    _renderObGrid();
    $('modal-onboarding')?.classList.remove('hidden');
  }

  function closeOnboarding() {
    $('modal-onboarding')?.classList.add('hidden');
  }

  function _renderObGrid() {
    const grid = $('ob-grid');
    if (!grid) return;
    grid.innerHTML = '';
    SUBJECTS_DEF.forEach(s => {
      const card = document.createElement('div');
      card.className = 'ob-card' + (s.available ? '' : ' ob-card--soon');
      card.dataset.id = s.id;
      card.innerHTML = `
        ${s.available ? '<div class="ob-card-check"></div>' : `<div class="ob-soon-badge">WKRÓTCE</div>`}
        <div class="ob-card-icon">${s.icon}</div>
        <div class="ob-card-name">${s.name}</div>
        <div class="ob-card-sub">${s.sub}</div>
      `;
      if (s.available) {
        card.addEventListener('click', () => _obToggle(s.id));
      }
      grid.appendChild(card);
    });
    _obUpdateNote();
  }

  function _obToggle(id) {
    if (_obSelected.has(id)) _obSelected.delete(id);
    else _obSelected.add(id);
    // Sync visual
    document.querySelectorAll('.ob-card').forEach(c => {
      const sel = _obSelected.has(c.dataset.id);
      c.classList.toggle('ob-card--selected', sel);
      const check = c.querySelector('.ob-card-check');
      if (check) check.textContent = sel ? '✓' : '';
    });
    _obUpdateNote();
  }

  function _obUpdateNote() {
    const note = $('ob-auto-note');
    if (!note) return;
    const hasMatma = _obSelected.has('PR') || _obSelected.has('PP');
    note.style.display = (!hasMatma && _obSelected.size > 0) ? 'block' : 'none';
  }

  async function _obConfirm() {
    let subjects = [..._obSelected];
    // Auto-dodaj PP jeśli brak jakiejkolwiek matematyki
    if (!subjects.includes('PR') && !subjects.includes('PP')) {
      subjects = ['PP', ...subjects];
    }
    // Zapisz
    await SA?.setSubjects(subjects);
    localStorage.setItem('userSubjects', JSON.stringify(subjects));
    // Ustaw domyślny poziom = pierwszy dostępny przedmiot
    const first = subjects[0];
    if (first) setMathLevel(first);
    closeOnboarding();
    buildSubjectTabs();
    generateTask();
  }

  function initOnboardingEvents() {
    $('btn-ob-confirm')?.addEventListener('click', _obConfirm);
    $('modal-onboarding')?.addEventListener('click', e => {
      if (e.target === $('modal-onboarding')) { /* nie zamykaj klikając tło */ }
    });
  }

  // ===== SUBJECT TABS =====

  function buildSubjectTabs() {
    const strip = $('subject-tabs-strip');
    if (!strip) return;
    const subjects = getEffectiveSubjects();
    if (!subjects || subjects.length === 0) { strip.classList.add('hidden'); return; }

    // Jeśli aktywny poziom nie należy do wybranych przedmiotów — ustaw pierwszy dostępny
    let currentLvl = getMathLevel();
    const availableIds = subjects.filter(id => SUBJECTS_DEF.find(s => s.id === id && s.available));
    if (!availableIds.includes(currentLvl)) {
      currentLvl = availableIds[0] || currentLvl;
      setMathLevel(currentLvl);
    }

    strip.innerHTML = '';

    subjects.forEach(id => {
      const def = SUBJECTS_DEF.find(s => s.id === id);
      if (!def || !def.available) return;
      const btn = document.createElement('button');
      btn.className = 'subject-tab-btn' + (id === currentLvl ? ' active' : '');
      btn.dataset.level = id;
      btn.style.cssText = id === currentLvl
        ? `background: ${def.color}22; border-color: ${def.color}; color: #fff;`
        : '';
      btn.innerHTML = `<span class="stb-icon">${def.icon}</span>${def.name} <span style="opacity:.7;font-weight:400">${def.sub}</span>`;
      btn.addEventListener('click', () => {
        setMathLevel(id);
        buildSubjectTabs(); // przebuduj aktywny tab
      });
      strip.appendChild(btn);
    });

    // Przycisk edycji
    const editBtn = document.createElement('button');
    editBtn.className = 'subject-tabs-edit';
    editBtn.textContent = '✏️ Zmień';
    editBtn.addEventListener('click', () => {
      // Wypełnij onboarding bieżącymi zaznaczeniami
      const cur = getEffectiveSubjects() || [];
      _obSelected = new Set(cur);
      _renderObGrid();
      cur.forEach(id => {
        const card = document.querySelector(`.ob-card[data-id="${id}"]`);
        if (card) {
          card.classList.add('ob-card--selected');
          const check = card.querySelector('.ob-card-check');
          if (check) check.textContent = '✓';
        }
      });
      $('modal-onboarding')?.classList.remove('hidden');
    });
    strip.appendChild(editBtn);

    strip.classList.remove('hidden');
  }

  const HINT_BTN_LABELS = ['ogólna', 'wzór', 'podstawienie'];

  // === Stan arkusza ===
  let examTasks   = [];
  let examIndex   = 0;
  let examResults = [];

  // === DOM ===
  const $ = id => document.getElementById(id);
  const elCatSelect        = $('select-category');
  const elBtnGenerate      = $('btn-generate');
  const elYearSelect       = $('select-year');
  const elMaturaTaskSelect = $('select-matura-task');
  const elBtnLoadMatura    = $('btn-load-matura');
  const elBtnRandomMatura  = $('btn-random-matura');
  const elPanelGen         = $('control-panel-generator');
  const elPanelMatura      = $('control-panel-matura');
  const elPanelExam        = $('control-panel-symulacja');
  const elExamNav          = $('exam-nav');
  const elExamNavPills     = $('exam-nav-pills');
  const elExamNavScore     = $('exam-nav-score');
  const elBtnStartExam     = $('btn-start-exam');
  const elModeTabs         = $('mode-tabs');
  const elTaskCard         = $('task-card');
  const elTaskStatement    = $('task-statement');
  const elTaskBadge        = $('task-badge');
  const elTaskPoints       = $('task-points');
  const elTaskSource       = $('task-source');
  const elBtnHint          = $('btn-hint');
  const elHintsList        = $('hints-list');
  const elSolutionPanel    = $('solution-panel');
  const elSolutionSteps    = $('solution-steps');
  const elAnswerDisplay    = $('answer-display');
  const elBtnSelfCorrect   = $('btn-self-correct');
  const elBtnSelfWrong     = $('btn-self-wrong');
  const elBtnShowSolution  = $('btn-show-solution');
  const elBtnNext          = $('btn-next');
  const elProgressSidebar  = $('progress-sidebar');
  const elToast            = $('toast');
  const elModalProgress    = $('modal-progress');
  const elBtnProgressOpen  = $('btn-progress-open');
  const elBtnProgressClose = $('btn-progress-close');
  const elModalBody        = $('modal-body');
  const elLandingCard      = $('landing-card');
  const elLimitBadge       = $('limit-badge');

  // === Inicjalizacja dropdownów ===
  function initCategorySelect() {
    rebuildCategorySelect();
  }

  function initYearSelect() {
    const db = CKE || MT;
    if (!db || !elYearSelect) return;
    db.getYears().forEach(year => {
      const count = db.getByYear(year).length;
      const opt = document.createElement('option');
      opt.value = year;
      opt.textContent = `Matura ${year} (${count} zadań)`;
      elYearSelect.appendChild(opt);
    });
    updateMaturaTaskList();
  }

  function updateMaturaTaskList() {
    const db = CKE || MT;
    if (!db || !elMaturaTaskSelect) return;
    const year = parseInt(elYearSelect.value);
    const tasks = year ? db.getByYear(year) : db.getAll();
    elMaturaTaskSelect.innerHTML = `<option value="">— wybierz zadanie (${tasks.length}) —</option>`;
    tasks.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      const sesLabel = t.session === 'dodatkowa' ? ' dod.' : '';
      opt.textContent = `${t.year}${sesLabel} z.${t.number} (${t.points} pkt) — ${t.categoryName}`;
      elMaturaTaskSelect.appendChild(opt);
    });
  }

  // === Limit badge ===
  function updateLimitBadge() {
    if (!elLimitBadge) return;
    const SA = window.SupabaseAuth;
    if (!SA?.isLoggedIn()) { elLimitBadge.classList.add('hidden'); return; }

    const plan      = SA.getPlan();
    const remaining = SA.getTasksRemaining();
    const planLabels = { free: 'Free', standard: 'Standard', pro: 'Pro', max: 'Max' };

    let text = `${planLabels[plan] || 'Free'}`;
    if (remaining !== Infinity) {
      const cls = remaining <= 1 ? 'limit-low' : '';
      text += ` · <span class="${cls}">${remaining} zad. dziś</span>`;
    } else {
      text += ' · ∞';
    }

    elLimitBadge.innerHTML = text;
    elLimitBadge.className = `limit-badge plan-${plan}`;
  }

  // === Tryby ===
  function switchMode(mode) {
    currentMode = mode;
    elModeTabs.querySelectorAll('.mode-tab').forEach(b =>
      b.classList.toggle('active', b.dataset.mode === mode)
    );
    elPanelGen.classList.toggle('hidden',    mode !== 'generator');
    elPanelMatura?.classList.toggle('hidden', mode !== 'matura');
    elPanelExam?.classList.toggle('hidden',  mode !== 'symulacja');
    elExamNav?.classList.toggle('hidden',    mode !== 'symulacja' || examTasks.length === 0);
    $('wzory-panel')?.classList.toggle('hidden',   mode !== 'wzory');
    $('calc-panel')?.classList.toggle('hidden',    mode !== 'kalkulator');
    document.querySelector('.main-layout')?.classList.toggle('hidden', mode === 'wzory' || mode === 'kalkulator');
    // Stan zadania/matury NIE jest resetowany — wraca po powrocie do zakładki
  }

  // === Generowanie ===
  async function generateTask() {
    const SA = window.SupabaseAuth;
    if (!SA?.isLoggedIn()) { openAuthModal(); return; }
    if (!SA.canGenerateTask()) { openPricingModal('task-limit'); return; }

    const catVal = elCatSelect.value;
    const _lvl   = getMathLevel();

    // PR: używaj bazy CKE zamiast generatorów
    if (_lvl === 'PR' && CKE) {
      let raw = null;
      if (catVal !== '0') {
        const catId = /^\d+$/.test(catVal) ? parseInt(catVal) : catVal;
        raw = CKE.randomByCategory(catId);
      }
      if (!raw) raw = CKE.random();
      currentTask = CKE.asTask(raw);
      SA.trackTaskGenerated();
      updateLimitBadge();
      displayTask(currentTask, true);
      return;
    }

    // PP / FIZ: generatory jak poprzednio
    try {
      if (catVal === '0') {
        currentTask = _lvl === 'PP' ? G.generateRandomPP() : _lvl === 'FIZ' ? G.generateRandomFiz() : G.generateRandom();
      } else {
        const id = /^\d+$/.test(catVal) ? parseInt(catVal) : catVal;
        currentTask = G.generate(id);
      }
    } catch (e) {
      console.error('Błąd generatora:', e);
      showToast('Błąd generowania zadania.', 'error');
      return;
    }
    SA.trackTaskGenerated();
    updateLimitBadge();
    displayTask(currentTask, false);
  }

  async function loadMaturaTask(id) {
    const db = CKE || MT;
    if (!db) return;
    const SA = window.SupabaseAuth;
    if (!SA?.isLoggedIn()) { openAuthModal(); return; }
    if (!SA.canGenerateTask()) { openPricingModal('task-limit'); return; }

    const raw = id ? db.getById(id) : db.random();
    if (!raw) { showToast('Wybierz zadanie z listy.', 'warning'); return; }
    currentTask = db.asTask(raw);
    SA.trackTaskGenerated();
    updateLimitBadge();
    displayTask(currentTask, true);
  }

  async function loadRandomMatura() {
    const db = CKE || MT;
    if (!db) return;
    const SA = window.SupabaseAuth;
    if (!SA?.isLoggedIn()) { openAuthModal(); return; }
    if (!SA.canGenerateTask()) { openPricingModal('task-limit'); return; }

    const year = parseInt(elYearSelect.value);
    const raw  = year ? db.randomByYear(year) : db.random();
    if (!raw) return;
    currentTask = db.asTask(raw);
    SA.trackTaskGenerated();
    updateLimitBadge();
    displayTask(currentTask, true);
  }

  function displayTask(task, isMatura) {
    hintsUsed      = 0;
    taskAnswered   = false;
    hintPenalty    = false;
    firstTaskShown = true;
    closeConfirm();

    hideLanding();

    const isClosed = task.type === 'closed';
    const catId    = task.categoryId ?? task.category;
    const meta     = G.getMeta(catId);
    if (elTaskBadge) elTaskBadge.textContent = meta ? `${meta.icon} ${meta.name}` : (task.categoryName || `Kat. ${catId}`);
    if (elTaskPoints) elTaskPoints.textContent = `${task.points} pkt`;

    // Badge źródła — ukryty dla zadań CKE (nie pokazujemy roku/numeru)
    if (elTaskSource) elTaskSource.classList.add('hidden');

    // Wyświetl treść zadania: obrazek (CKE) lub KaTeX (generatory)
    if (elTaskStatement) {
      if (task.image) {
        elTaskStatement.innerHTML =
          `<img src="${task.image}" alt="Treść zadania" class="task-img" loading="lazy"
                style="max-width:100%;display:block;border-radius:6px;">`;
      } else {
        KR.render(task.statement, elTaskStatement);
      }
    }

    // Zadania zamknięte A/B/C/D
    const closedEl = $('closed-options');
    if (closedEl) {
      closedEl.classList.toggle('hidden', !isClosed);
      if (isClosed) {
        ['A', 'B', 'C', 'D'].forEach(opt => {
          const el = $(`opt-${opt}-text`);
          if (el) KR.render(task.options[opt] || '', el);
        });
        document.querySelectorAll('.opt-btn').forEach(b => {
          b.classList.remove('selected', 'correct', 'wrong');
          b.disabled = false;
        });
      }
    }

    elTaskCard.classList.remove('hidden');
    elTaskCard.style.animation = 'none';
    requestAnimationFrame(() => { elTaskCard.style.animation = ''; });
    elSolutionPanel.classList.add('hidden');
    elHintsList.innerHTML = '';
    if (task.hints?.length) {
      elBtnHint.disabled = false;
      elBtnHint.textContent = `💡 Wskazówka 1/${task.hints.length} — ${HINT_BTN_LABELS[0]}`;
    } else {
      elBtnHint.disabled = true;
      elBtnHint.textContent = '💡 Brak wskazówek';
    }
    elBtnSelfCorrect?.classList.add('hidden');
    elBtnSelfWrong?.classList.add('hidden');
    // Dla zadań zamkniętych: ukryj "Pokaż rozwiązanie" (auto-ujawnienie po wyborze opcji)
    if (isClosed) {
      elBtnShowSolution?.classList.add('hidden');
    } else {
      elBtnShowSolution?.classList.remove('hidden');
    }
    elBtnNext?.classList.add('hidden');
  }

  // === Landing (niezalogowany) ===
  function showLanding() {
    elLandingCard?.classList.remove('hidden');
    elTaskCard?.classList.add('hidden');
    elSolutionPanel?.classList.add('hidden');
  }

  function hideLanding() {
    elLandingCard?.classList.add('hidden');
  }

  // === Potwierdzenie (inline) ===
  function closeConfirm() {
    document.getElementById('inline-confirm')?.remove();
    if (elBtnHint && hintsUsed < (currentTask?.hints?.length ?? 0)) elBtnHint.disabled = false;
    if (elBtnShowSolution) elBtnShowSolution.disabled = false;
  }

  function showConfirm(anchorEl, onYes) {
    closeConfirm();                              // zamknij poprzedni, jeśli istnieje
    anchorEl.disabled = true;

    const div = document.createElement('div');
    div.id = 'inline-confirm';
    div.className = 'inline-confirm';
    div.innerHTML =
      `<span class="inline-confirm-msg">⚠️ Spowoduje to oznaczenie zadania jako <strong>niezaliczone</strong>. Na pewno?</span>` +
      `<button class="btn btn-sm btn-danger-outline" id="ic-yes">✓ Tak</button>` +
      `<button class="btn btn-sm btn-ghost"           id="ic-no">Nie</button>`;
    anchorEl.insertAdjacentElement('afterend', div);

    div.querySelector('#ic-yes').addEventListener('click', () => {
      div.remove();
      anchorEl.disabled = false;
      onYes();
    });
    div.querySelector('#ic-no').addEventListener('click', () => {
      div.remove();
      anchorEl.disabled = false;
    });
  }

  // === Wskazówki ===
  function _updateHintBtn() {
    if (!currentTask) return;
    if (hintsUsed >= currentTask.hints.length) {
      elBtnHint.disabled = true;
      elBtnHint.textContent = '✓ Wszystkie wskazówki';
    } else {
      const label = HINT_BTN_LABELS[hintsUsed] || `${hintsUsed + 1}`;
      elBtnHint.textContent = `💡 Wskazówka ${hintsUsed + 1}/${currentTask.hints.length} — ${label}`;
    }
  }

  function showNextHint() {
    if (!currentTask || hintsUsed >= currentTask.hints.length || taskAnswered) return;
    showConfirm(elBtnHint, () => {
      hintPenalty = true;
      KR.renderHint(currentTask.hints[hintsUsed], elHintsList);
      hintsUsed++;
      _updateHintBtn();
    });
  }

  // === Rozwiązanie ===
  function showSolution() {
    if (!currentTask) return;
    showConfirm(elBtnShowSolution, _doShowSolution);
  }

  function _doShowSolution() {
    hintPenalty = true;
    elSolutionPanel.classList.remove('hidden');

    if (elAnswerDisplay) {
      const ans  = currentTask.answer;
      const desc = ans.description || ans.display;
      KR.render(`**Odpowiedź:** ${desc.includes('$') ? desc : `$${ans.display}$`}`, elAnswerDisplay);
    }

    if (elSolutionSteps) KR.renderSolution(currentTask.solution, elSolutionSteps);
    elBtnShowSolution?.classList.add('hidden');

    // Penalty: ukryj "Poprawnie", zostaw tylko "Nie rozwiązałem"
    elBtnSelfCorrect?.classList.add('hidden');
    elBtnSelfWrong?.classList.remove('hidden');

    elSolutionPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // === Samoocena ===
  function recordResult(correct) {
    if (currentMode === 'symulacja') { recordExamResult(correct); return; }
    if (!currentTask || taskAnswered) return;
    taskAnswered = true;

    const effectiveCorrect = hintPenalty ? false : correct;
    PT.record(currentTask.category, effectiveCorrect);
    SA?.recordAnswer(currentTask.category, effectiveCorrect);

    // Zapisz do historii zadań
    const catId = currentTask.categoryId ?? currentTask.category;
    const meta  = G.getMeta(catId);
    PT.recordTask({
      catId,
      catName:  meta?.name || currentTask.categoryName || `Kat. ${catId}`,
      points:   currentTask.points,
      result:   hintPenalty ? 'hint' : (correct ? 'correct' : 'wrong'),
      mode:     currentMode === 'matura' ? 'matura' : 'generator',
      year:     currentTask.year   || null,
      taskNo:   currentTask.number || null,
    });

    if (hintPenalty) {
      showToast('Zadanie niezaliczone — użyto wskazówki lub rozwiązania.', 'warning');
    } else {
      showToast(effectiveCorrect ? 'Dobrze! Tak trzymaj ✓' : 'Spróbuj ponownie przy następnym zadaniu.',
                effectiveCorrect ? 'success' : 'warning');
    }

    elBtnSelfCorrect?.classList.add('hidden');
    elBtnSelfWrong?.classList.add('hidden');
    if (elBtnNext) { elBtnNext.textContent = '↻ Następne zadanie'; elBtnNext.classList.remove('hidden'); }
    updateSidebar();
  }

  // === Sidebar ===
  function updateSidebar() {
    if (!elProgressSidebar) return;
    const today = PT.getTodayStats();
    const _lvl  = getMathLevel();
    const cats  = _lvl === 'PP' ? G.getAllPP() : _lvl === 'FIZ' ? G.getAllFiz() : G.getAll();
    const accuracyPct = today.attempted > 0 ? Math.round(100 * today.correct / today.attempted) : 0;

    let html = `
      <div class="sb-header">
        <div class="sb-stat-row">
          <div class="sb-stat"><span class="sb-stat-val">${today.correct}</span><span class="sb-stat-lbl">Poprawnych</span></div>
          <div class="sb-stat-divider"></div>
          <div class="sb-stat"><span class="sb-stat-val">${today.attempted}</span><span class="sb-stat-lbl">Łącznie dziś</span></div>
          <div class="sb-stat-divider"></div>
          <div class="sb-stat"><span class="sb-stat-val sb-stat-streak">🔥 ${today.streak}</span><span class="sb-stat-lbl">Dni z rzędu</span></div>
        </div>
        ${today.attempted > 0 ? `
        <div class="sb-accuracy-bar-wrap">
          <div class="sb-accuracy-bar" style="width:${accuracyPct}%"></div>
        </div>
        <div class="sb-accuracy-label">${accuracyPct}% skuteczności</div>
        ` : ''}
      </div>
      <div class="sb-cats-label">Postęp kategorii</div>
      <div class="sb-cats">
    `;

    cats.forEach(cat => {
      const pct  = PT.getCategoryPercent(cat.id);
      const fill = pct !== null ? pct : 0;
      const cs   = PT.getCategoryStats ? PT.getCategoryStats(cat.id) : null;
      html += `
        <div class="sb-cat">
          <div class="sb-cat-left">
            <span class="sb-cat-icon" style="color:${cat.color}">${cat.icon}</span>
            <span class="sb-cat-name">${cat.name.length > 20 ? cat.name.substring(0,20)+'…' : cat.name}</span>
          </div>
          <div class="sb-cat-right">
            <div class="sb-bar-track"><div class="sb-bar-fill" style="width:${fill}%; background:${cat.color}"></div></div>
            <span class="sb-cat-pct" style="color:${pct !== null && pct > 0 ? cat.color : 'var(--text-muted)'}">${pct !== null ? pct+'%' : '—'}</span>
          </div>
        </div>
      `;
    });
    html += '</div>';
    elProgressSidebar.innerHTML = html;
  }

  // === Ranking ===
  let rankingData = null;
  let rankingTab  = 'tasks';

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  async function openRankingModal() {
    const SA = window.SupabaseAuth;
    const modal = $('modal-ranking');
    if (!modal) return;
    modal.classList.remove('hidden');

    if (!SA?.isLoggedIn()) {
      $('ranking-body').innerHTML = '<div class="ranking-empty">Zaloguj się, aby zobaczyć ranking.</div>';
      return;
    }

    $('ranking-body').innerHTML = '<div class="ranking-loading">Ładowanie danych…</div>';
    try {
      rankingData = await SA.fetchLeaderboard();
      renderRankingTab(rankingTab);
    } catch (e) {
      $('ranking-body').innerHTML = '<div class="ranking-empty">Błąd ładowania rankingu.</div>';
    }
  }

  function renderRankingTab(tab) {
    rankingTab = tab;
    if (!rankingData) return;

    // podświetl aktywną zakładkę
    document.querySelectorAll('.ranking-tab').forEach(b =>
      b.classList.toggle('active', b.dataset.tab === tab)
    );

    const SA = window.SupabaseAuth;
    const meId = SA?.getUser()?.id;

    let sorted, valueFn, subNote = '';
    if (tab === 'tasks') {
      sorted  = [...rankingData].sort((a, b) => b.total_attempted - a.total_attempted);
      valueFn = u => `<span>${u.total_attempted}</span><small>zadań</small>`;
    } else if (tab === 'accuracy') {
      sorted  = [...rankingData]
        .filter(u => u.total_attempted >= 10 && u.accuracy_pct !== null)
        .sort((a, b) => b.accuracy_pct - a.accuracy_pct);
      valueFn = u => `<span>${u.accuracy_pct}%</span><small>skuteczności</small>`;
      subNote = '* tylko gracze z min. 10 rozwiązanymi zadaniami';
    } else {
      sorted  = [...rankingData].filter(u => u.max_streak > 0)
                               .sort((a, b) => b.max_streak - a.max_streak);
      valueFn = u => `<span>${u.max_streak} 🔥</span><small>dni z rzędu</small>`;
    }

    const MEDALS = ['🥇', '🥈', '🥉'];
    const top10  = sorted.slice(0, 10);
    const myRank = sorted.findIndex(u => u.user_id === meId);

    if (top10.length === 0) {
      $('ranking-body').innerHTML = '<div class="ranking-empty">Brak danych do wyświetlenia.</div>';
      return;
    }

    let html = '<div class="ranking-list">';
    top10.forEach((u, i) => {
      const isMe   = u.user_id === meId;
      const pos    = i < 3 ? MEDALS[i] : `${i + 1}.`;
      const planBadge = `<span class="rb-plan rb-plan--${u.plan || 'free'}">${(u.plan || 'FREE').toUpperCase()}</span>`;
      html += `
        <div class="ranking-row${isMe ? ' ranking-row--me' : ''}">
          <span class="ranking-pos">${pos}</span>
          <span class="ranking-name">${escHtml(u.display_name)}${isMe ? ' <span class="ranking-you">← Ty</span>' : ''}</span>
          ${planBadge}
          <div class="ranking-val">${valueFn(u)}</div>
        </div>`;
    });

    if (myRank >= 10) {
      const me = sorted[myRank];
      html += `
        <div class="ranking-separator">· · ·</div>
        <div class="ranking-row ranking-row--me">
          <span class="ranking-pos">${myRank + 1}.</span>
          <span class="ranking-name">${escHtml(me.display_name)} <span class="ranking-you">← Ty</span></span>
          <span class="rb-plan rb-plan--${me.plan || 'free'}">${(me.plan || 'FREE').toUpperCase()}</span>
          <div class="ranking-val">${valueFn(me)}</div>
        </div>`;
    }

    if (subNote) html += `<div class="ranking-note">${subNote}</div>`;
    html += '</div>';
    $('ranking-body').innerHTML = html;
  }

  // === Username modal ===
  function showUsernameModal(forceShow = false) {
    const SA = window.SupabaseAuth;
    if (!forceShow && SA?.getUsername()) return; // już ustawiona
    const modal = $('modal-username');
    if (modal) modal.classList.remove('hidden');
    setTimeout(() => $('username-input')?.focus(), 80);
  }

  function hideUsernameModal() {
    $('modal-username')?.classList.add('hidden');
    $('username-input') && ($('username-input').value = '');
    $('username-error')?.classList.add('hidden');
  }

  async function saveUsername() {
    const SA   = window.SupabaseAuth;
    const input = $('username-input');
    const errEl = $('username-error');
    const btn   = $('btn-username-save');
    const name  = input?.value?.trim() || '';
    if (!name) { input?.focus(); return; }

    btn.textContent = 'Sprawdzam…';
    btn.disabled    = true;
    errEl?.classList.add('hidden');

    try {
      await SA.setUsername(name);
      hideUsernameModal();
      updateUserModalUsername(name);
      showToast(`Witaj, ${name}! 🎉`, 'success');
      if (!firstTaskShown) {
        if (!getEffectiveSubjects()) openOnboarding();
        else { buildSubjectTabs(); generateTask(); }
      }
    } catch (err) {
      if (errEl) { errEl.textContent = err.message; errEl.classList.remove('hidden'); }
    } finally {
      btn.textContent = 'Zapisz nazwę';
      btn.disabled    = false;
    }
  }

  function updateUserModalUsername(name) {
    const el = $('um-username');
    if (!el) return;
    if (name) {
      el.textContent = name;
      el.classList.remove('um-username--empty');
    } else {
      el.textContent = 'Brak nazwy';
      el.classList.add('um-username--empty');
    }
  }

  function initUsernameEvents() {
    $('btn-username-save')?.addEventListener('click', saveUsername);
    $('username-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveUsername();
    });
    $('username-input')?.addEventListener('input', () =>
      $('username-error')?.classList.add('hidden')
    );
    // Pomiń
    $('btn-username-skip')?.addEventListener('click', () => {
      hideUsernameModal();
      if (!firstTaskShown) {
        if (!getEffectiveSubjects()) openOnboarding();
        else { buildSubjectTabs(); generateTask(); }
      }
    });
    // "Zmień" w user modal
    $('btn-um-change-username')?.addEventListener('click', () => {
      $('modal-user')?.classList.add('hidden');
      showUsernameModal(true);
    });
  }

  function initRankingEvents() {
    $('btn-ranking-open')?.addEventListener('click', openRankingModal);
    $('btn-ranking-close')?.addEventListener('click', () => $('modal-ranking')?.classList.add('hidden'));
    $('modal-ranking')?.addEventListener('click', e => {
      if (e.target === $('modal-ranking')) $('modal-ranking').classList.add('hidden');
    });
    $('ranking-tabs')?.addEventListener('click', e => {
      if (e.target.classList.contains('ranking-tab')) {
        renderRankingTab(e.target.dataset.tab);
      }
    });
  }

  // === Modal statystyk ===
  let _progressTab = 'stats';

  function _formatAgo(ts) {
    const d = Math.floor((Date.now() - ts) / 86400000);
    const h = Math.floor((Date.now() - ts) / 3600000);
    const m = Math.floor((Date.now() - ts) / 60000);
    if (d > 0)  return `${d} d. temu`;
    if (h > 0)  return `${h} godz. temu`;
    if (m > 0)  return `${m} min temu`;
    return 'przed chwilą';
  }

  function _renderStatsTab() {
    const _lvl  = getMathLevel();
    const cats  = _lvl === 'PP' ? G.getAllPP() : _lvl === 'FIZ' ? G.getAllFiz() : G.getAll();
    const stats = PT.getStats();
    let h = `
      <div class="modal-stats-grid">
        <div class="modal-stat-card"><div class="stat-num">${stats.totalAttempted||0}</div><div class="stat-label">Zadań</div></div>
        <div class="modal-stat-card"><div class="stat-num">${stats.totalCorrect||0}</div><div class="stat-label">Poprawnych</div></div>
        <div class="modal-stat-card"><div class="stat-num">${stats.streak||0} 🔥</div><div class="stat-label">Dni z rzędu</div></div>
        <div class="modal-stat-card"><div class="stat-num">${stats.totalAttempted ? Math.round(100*stats.totalCorrect/stats.totalAttempted) : 0}%</div><div class="stat-label">Skuteczność</div></div>
      </div>
      <h3 style="margin:1.5rem 0 1rem; color:var(--text-secondary)">Postęp per kategoria</h3>
    `;
    cats.forEach(cat => {
      const pct = PT.getCategoryPercent(cat.id);
      const fill = pct !== null ? pct : 0;
      const cs = PT.getCategoryStats(cat.id);
      h += `
        <div class="modal-cat-row">
          <div class="modal-cat-info"><span style="color:${cat.color}">${cat.icon}</span> ${cat.id}. ${cat.name}</div>
          <div class="modal-cat-bar"><div class="modal-cat-fill" style="width:${fill}%; background:${cat.color}"></div></div>
          <div class="modal-cat-pct">${pct !== null ? pct+'%' : '—'} <small>(${cs?.attempted||0})</small></div>
        </div>`;
    });
    return h;
  }

  function _renderTaskHistTab() {
    const hist = PT.getTaskHistory();
    if (!hist.length) return '<div class="hist-empty">Brak rozwiązanych zadań.</div>';
    return '<div class="hist-list">' + hist.map(h => {
      const icon  = h.result === 'correct' ? '✅' : h.result === 'hint' ? '💡' : '❌';
      const label = h.result === 'correct' ? 'Poprawnie' : h.result === 'hint' ? 'Ze wskazówką' : 'Błędnie';
      const src   = h.mode === 'matura' && h.year ? `📜 Matura ${h.year} z.${h.taskNo}` :
                    h.mode === 'symulacja' ? `🎓 Symulacja zad. ${h.taskNo}` : '🎲 Generator';
      return `
        <div class="hist-item">
          <span class="hist-icon">${icon}</span>
          <div class="hist-info">
            <div class="hist-cat">${h.catName}</div>
            <div class="hist-sub">${src} · ${h.points} pkt · ${label}</div>
          </div>
          <span class="hist-time">${_formatAgo(h.ts)}</span>
        </div>`;
    }).join('') + '</div>';
  }

  function _renderExamHistTab() {
    const hist = PT.getExamHistory();
    if (!hist.length) return '<div class="hist-empty">Brak ukończonych symulacji matury.</div>';
    return '<div class="hist-list">' + hist.map(h => {
      const icon  = h.pass ? '✅' : '❌';
      const label = h.pass ? 'Zdany' : 'Niezdany';
      const lvl   = h.level === 'PP' ? 'Podstawowa' : 'Rozszerzona';
      return `
        <div class="hist-exam-item">
          <div class="hist-exam-score ${h.pass ? 'pass' : 'fail'}">${h.pts}/${h.maxPts}</div>
          <div class="hist-info">
            <div class="hist-cat">${icon} ${h.pct}% — ${label}</div>
            <div class="hist-sub">Matematyka ${lvl} · ${h.taskCount} zadań</div>
          </div>
          <span class="hist-time">${_formatAgo(h.ts)}</span>
        </div>`;
    }).join('') + '</div>';
  }

  function _renderProgressModal(tab) {
    _progressTab = tab;
    const tabs = [
      { id: 'stats', label: '📊 Statystyki' },
      { id: 'tasks', label: '📝 Historia zadań' },
      { id: 'exams', label: '🎓 Historia matur' },
    ];
    const tabsHtml = `<div class="hist-tabs">${tabs.map(t =>
      `<button class="hist-tab${tab === t.id ? ' active' : ''}" data-prog-tab="${t.id}">${t.label}</button>`
    ).join('')}</div>`;

    const content = tab === 'stats' ? _renderStatsTab()
                  : tab === 'tasks' ? _renderTaskHistTab()
                  : _renderExamHistTab();

    elModalBody.innerHTML = tabsHtml + content;
  }

  function openProgressModal() {
    if (!elModalProgress) return;
    _renderProgressModal(_progressTab);
    elModalProgress.classList.remove('hidden');
    elModalBody.onclick = e => {
      const btn = e.target.closest('[data-prog-tab]');
      if (btn) _renderProgressModal(btn.dataset.progTab);
    };
  }

  // === Pricing modal ===
  const PLAN_INFO = {
    free: {
      label: 'Free',
      price: '0 zł',
      period: 'na zawsze',
      features: ['2 zadania dziennie'],
      missing:  ['Symulacja matury', 'Karta wzorów', 'Statystyki', 'Sync w chmurze'],
      color: 'var(--text-muted)',
    },
    standard: {
      label: 'Standard',
      price: '3 zł',
      period: '/ miesiąc',
      features: ['3 zadania dziennie', '1 symulacja matury co 2 tygodnie', 'Statystyki per kategoria', 'Sync w chmurze'],
      missing:  [],
      color: 'var(--accent-green)',
    },
    pro: {
      label: 'Pro',
      price: '8 zł',
      period: '/ miesiąc',
      features: ['10 zadań dziennie', '1 symulacja matury dziennie', 'Statystyki per kategoria', 'Sync w chmurze'],
      missing:  [],
      color: 'var(--accent-blue)',
    },
    max: {
      label: 'Max',
      price: '15 zł',
      period: '/ miesiąc',
      features: ['Nieograniczone zadania', 'Nieograniczone matury', 'Wszystkie funkcje Pro'],
      missing:  [],
      color: 'var(--accent-purple)',
      featured: true,
      badge: 'Najbardziej opłacalny',
    },
  };

  function openPricingModal(reason) {
    const SA     = window.SupabaseAuth;
    const modal  = $('modal-pricing');
    const cards  = $('pricing-cards');
    const msgEl  = $('pricing-limit-msg');
    if (!modal || !cards) return;

    const currentPlan = SA?.isLoggedIn() ? SA.getPlan() : 'none';

    if (msgEl) {
      if (reason === 'task-limit') {
        const plan = SA?.getPlan() || 'free';
        const limitMap = { free: '2 dziennie', standard: '3 dziennie', pro: '10 dziennie' };
        const limitDesc = limitMap[plan] || '10 dziennie';
        msgEl.textContent = `Osiągnąłeś limit (${limitDesc}) dla planu ${PLAN_INFO[plan]?.label}. Przejdź na wyższy plan, aby kontynuować.`;
        msgEl.classList.remove('hidden');
      } else if (reason === 'matura-limit') {
        msgEl.textContent = 'Symulacja matury jest dostępna od planu Pro.';
        msgEl.classList.remove('hidden');
      } else {
        msgEl.classList.add('hidden');
      }
    }

    cards.innerHTML = Object.entries(PLAN_INFO).map(([planId, info]) => {
      const isCurrent  = currentPlan === planId;
      const isDowngrade = planId === 'free' && currentPlan !== 'none' && currentPlan !== 'free';
      const featuresHtml = info.features.map(f => `<li class="pc-feat pc-feat--yes">✓ ${f}</li>`).join('');
      const missingHtml  = info.missing.map(f =>  `<li class="pc-feat pc-feat--no">✗ ${f}</li>`).join('');

      let btnHtml;
      if (isCurrent) {
        btnHtml = `<button class="btn btn-ghost btn-full pc-btn" disabled>Obecny plan</button>`;
      } else if (isDowngrade) {
        btnHtml = `<button class="btn btn-ghost btn-full pc-btn" disabled>Dostępny po anulowaniu</button>`;
      } else if (planId === 'free') {
        btnHtml = `<button class="btn btn-ghost btn-full pc-btn" id="btn-plan-free">Zaloguj się za darmo</button>`;
      } else {
        btnHtml = `<button class="btn btn-primary btn-full pc-btn" data-plan="${planId}" id="btn-plan-${planId}">Wybierz ${info.label}</button>`;
      }

      return `
        <div class="pricing-card ${info.featured ? 'pricing-card--featured' : ''}">
          ${info.badge ? `<div class="pc-popular">${info.badge}</div>` : ''}
          ${isCurrent    ? '<div class="pc-current-tag">Twój plan</div>' : ''}
          <div class="pc-name" style="color:${info.color}">${info.label}</div>
          <div class="pc-price-row">
            <span class="pc-amount">${info.price}</span>
            <span class="pc-period">${info.period}</span>
          </div>
          <ul class="pc-features">${featuresHtml}${missingHtml}</ul>
          ${btnHtml}
        </div>
      `;
    }).join('');

    // Bind buttons
    $('btn-plan-free')?.addEventListener('click', () => {
      modal.classList.add('hidden');
      openAuthModal();
    });
    ['standard', 'pro', 'max'].forEach(planId => {
      $(`btn-plan-${planId}`)?.addEventListener('click', () => handleUpgrade(planId));
    });

    modal.classList.remove('hidden');
  }

  async function handleUpgrade(plan) {
    const SA = window.SupabaseAuth;
    if (!SA?.isLoggedIn()) { openAuthModal(); return; }

    const btn = $(`btn-plan-${plan}`);
    if (btn) { btn.textContent = 'Przekierowuję…'; btn.disabled = true; }

    try {
      const url = await SA.createCheckoutSession(plan);
      window.location.href = url;
    } catch (err) {
      showToast(err.message || 'Błąd płatności.', 'error');
      if (btn) { btn.textContent = `Wybierz ${PLAN_INFO[plan]?.label}`; btn.disabled = false; }
    }
  }

  function showToast(msg, type = 'info') {
    if (!elToast) return;
    elToast.textContent = msg;
    elToast.className = `toast toast-${type} show`;
    setTimeout(() => { elToast.className = 'toast'; }, 3500);
  }

  // === Symulacja matury ===
  const EXAM_CATS_PR  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const EXAM_CATS_FIZ = ['fiz01','fiz02','fiz03','fiz04','fiz05','fiz06','fiz07',
                          'fiz08','fiz09','fiz10','fiz11','fiz12','fiz13','fiz14'];

  async function generateExam() {
    const SA = window.SupabaseAuth;
    if (!SA?.isLoggedIn()) { openAuthModal(); return; }
    if (!SA.canStartMatura()) { openPricingModal('matura-limit'); return; }

    examTasks   = [];
    examResults = [];

    const lvl = getMathLevel();

    if (lvl === 'PP') {
      examTasks = G.generatePPExam();
      examResults = new Array(examTasks.length).fill(null);
    } else if (lvl === 'FIZ') {
      // Fizyka rozszerzona: 11 zadań (jak prawdziwa matura)
      const cats = [...EXAM_CATS_FIZ].sort(() => Math.random() - 0.5).slice(0, 11);
      cats.forEach(catId => {
        try { examTasks.push(G.generate(catId)); examResults.push(null); } catch (e) { /* skip */ }
      });
    } else {
      const cats = [...EXAM_CATS_PR].sort(() => Math.random() - 0.5).slice(0, 12);
      cats.forEach(catId => {
        try { examTasks.push(G.generate(catId)); examResults.push(null); } catch (e) { /* skip */ }
      });
    }

    if (examTasks.length === 0) { showToast('Błąd generowania arkusza.', 'error'); return; }

    SA.trackMaturaStarted();
    updateLimitBadge();
    examIndex = 0;
    elExamNav?.classList.remove('hidden');
    renderExamNav();
    loadExamTask(0);
  }

  function loadExamTask(idx) {
    examIndex   = idx;
    currentTask = examTasks[idx];
    displayTask(currentTask, false);
    if (elTaskBadge) elTaskBadge.textContent = `Zad. ${idx + 1}/${examTasks.length}`;
    if (elTaskSource) {
      const section = currentTask.examSection === 'closed' ? '📋 Część I (zamknięta)' : '✏️ Część II (otwarta)';
      elTaskSource.textContent = `🎓 ${section} — ${currentTask.categoryName}`;
      elTaskSource.classList.remove('hidden');
    }
    renderExamNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderExamNav() {
    if (!elExamNavPills) return;
    elExamNavPills.innerHTML = '';
    let lastSection = null;
    examTasks.forEach((t, i) => {
      // Separator sekcji
      if (t.examSection && t.examSection !== lastSection) {
        lastSection = t.examSection;
        const sep = document.createElement('span');
        sep.className = 'exam-section-sep';
        sep.textContent = t.examSection === 'closed' ? 'I' : 'II';
        elExamNavPills.appendChild(sep);
      }
      const pill = document.createElement('button');
      pill.className = 'exam-pill' + (t.examSection === 'open' ? ' exam-pill-open' : '');
      pill.textContent = i + 1;
      pill.title = `${i + 1}. ${t.categoryName} (${t.points} pkt)${t.examSection === 'closed' ? ' — zamknięte' : ''}`;
      if (i === examIndex)                   pill.classList.add('active');
      else if (examResults[i] === 'correct') pill.classList.add('correct');
      else if (examResults[i] === 'wrong')   pill.classList.add('wrong');
      else if (examResults[i] === 'skip')    pill.classList.add('skipped');
      pill.addEventListener('click', () => {
        if (i !== examIndex) {
          if (examResults[examIndex] === null) examResults[examIndex] = 'skip';
          loadExamTask(i);
        }
      });
      elExamNavPills.appendChild(pill);
    });
    const answered = examResults.filter(r => r !== null).length;
    const pts    = examResults.reduce((s, r, i) => s + (r === 'correct' ? examTasks[i].points : 0), 0);
    const maxPts = examTasks.reduce((s, t) => s + t.points, 0);
    if (elExamNavScore) {
      elExamNavScore.textContent = answered < examTasks.length
        ? `${answered}/${examTasks.length} rozwiązanych`
        : `${pts}/${maxPts} pkt`;
    }
  }

  function recordExamResult(correct) {
    if (!currentTask || taskAnswered) return;
    taskAnswered = true;
    examResults[examIndex] = correct ? 'correct' : 'wrong';
    PT.record(currentTask.category, correct);

    // Zapisz do historii zadań (w kontekście symulacji)
    const catId = currentTask.categoryId ?? currentTask.category;
    const meta  = G.getMeta(catId);
    PT.recordTask({
      catId,
      catName: meta?.name || currentTask.categoryName || `Kat. ${catId}`,
      points:  currentTask.points,
      result:  correct ? 'correct' : 'wrong',
      mode:    'symulacja',
      year:    null,
      taskNo:  examIndex + 1,
    });

    renderExamNav();
    showToast(correct ? 'Dobrze! ✓' : 'Zaznaczono jako błędne.', correct ? 'success' : 'warning');
    elBtnSelfCorrect?.classList.add('hidden');
    elBtnSelfWrong?.classList.add('hidden');
    const remaining = examResults.findIndex(r => r === null);
    if (remaining !== -1) {
      const nextIdx  = examResults.findIndex((r, i) => r === null && i > examIndex);
      const labelIdx = nextIdx !== -1 ? nextIdx : remaining;
      if (elBtnNext) { elBtnNext.textContent = `→ Zadanie ${labelIdx + 1}`; elBtnNext.classList.remove('hidden'); }
    } else {
      if (elBtnNext) { elBtnNext.textContent = '📊 Pokaż wyniki'; elBtnNext.classList.remove('hidden'); }
    }
    updateSidebar();
  }

  function advanceExam() {
    if (examResults.every(r => r !== null)) { showExamSummary(); return; }
    let next = -1;
    for (let i = examIndex + 1; i < examTasks.length; i++) { if (examResults[i] === null) { next = i; break; } }
    if (next === -1) { for (let i = 0; i < examIndex; i++) { if (examResults[i] === null) { next = i; break; } } }
    if (next !== -1) loadExamTask(next);
    else showExamSummary();
  }

  function showExamSummary() {
    const pts    = examResults.reduce((s, r, i) => s + (r === 'correct' ? examTasks[i].points : 0), 0);
    const maxPts = examTasks.reduce((s, t) => s + t.points, 0);
    const pct    = Math.round(100 * pts / maxPts);
    const pass   = pct >= 30;

    // Zapisz arkusz do historii matur
    PT.recordExam({
      pts, maxPts, pct, pass,
      taskCount: examTasks.length,
      level: getMathLevel(),
    });

    const breakdownHtml = examTasks.map((t, i) => {
      const r   = examResults[i];
      const cls = r === 'correct' ? 'correct-row' : r === 'wrong' ? 'wrong-row' : 'skip-row';
      const icon = r === 'correct' ? '✓' : r === 'wrong' ? '✗' : '—';
      return `<div class="exam-breakdown-row ${cls}"><span class="task-num">${icon} Zad. ${i+1}</span> (${t.points} pkt)<div class="cat-name">${t.categoryName}</div></div>`;
    }).join('');

    elTaskCard.classList.add('hidden');
    elSolutionPanel.classList.add('hidden');
    $('exam-summary')?.remove();

    const summaryEl = document.createElement('div');
    summaryEl.id = 'exam-summary';
    summaryEl.className = 'exam-summary-card';
    summaryEl.innerHTML = `
      <h2>Wyniki arkusza</h2>
      <div class="exam-score-big ${pass ? 'pass' : 'fail'}">${pts}/${maxPts}</div>
      <div class="exam-score-label">${pct}% punktów — ${pass ? '✅ Zdany (≥30%)' : '❌ Niezdany (<30%)'}</div>
      <div class="exam-breakdown">${breakdownHtml}</div>
      <button class="btn btn-primary" id="btn-new-exam">🎓 Nowy arkusz</button>
    `;
    document.querySelector('.task-section').appendChild(summaryEl);
    summaryEl.scrollIntoView({ behavior: 'smooth' });
    $('btn-new-exam')?.addEventListener('click', () => { summaryEl.remove(); generateExam(); });
    if (elExamNavScore) elExamNavScore.textContent = `${pts}/${maxPts} pkt (${pct}%)`;
  }

  // === Kalkulator ===
  let _cDisp    = '0';   // wyświetlany string
  let _cOp      = null;  // oczekiwana operacja: 'add'|'sub'|'mul'|'div'
  let _cOperand = null;  // lewy argument operacji
  let _cMem     = 0;     // pamięć
  let _cNewNum  = true;  // następna cyfra zaczyna nową liczbę
  let _cMrcHit  = false; // śledzenie podwójnego naciśnięcia MRC

  function _cFmt(n) {
    if (!isFinite(n) || isNaN(n)) return 'E';
    if (Math.abs(n) >= 1e9) return 'E';
    const r = parseFloat(n.toPrecision(10));
    const s = String(r);
    if (s.replace('-','').replace('.','').length <= 8) return s;
    return parseFloat(r.toPrecision(8)).toString();
  }

  function _cCompute(a, b, op) {
    if (op === 'add') return a + b;
    if (op === 'sub') return a - b;
    if (op === 'mul') return a * b;
    if (op === 'div') return b !== 0 ? a / b : NaN;
    return b;
  }

  function _cRefresh() {
    const el  = document.getElementById('calc-display');
    const min = document.getElementById('calc-ind-minus');
    const mem = document.getElementById('calc-ind-memory');
    if (el) {
      el.textContent = _cDisp;
      el.classList.toggle('calc-error', _cDisp === 'E');
    }
    if (min) min.classList.toggle('active', _cDisp.startsWith('-'));
    if (mem) mem.classList.toggle('active', _cMem !== 0);
  }

  function _cKey(key) {
    if (key >= '0' && key <= '9') {
      if (_cDisp === 'E') { _cDisp = key; _cNewNum = false; }
      else if (_cNewNum) { _cDisp = key === '0' ? '0' : key; _cNewNum = false; }
      else if (_cDisp === '0') _cDisp = key;
      else if (_cDisp.replace('-','').replace('.','').length < 8) _cDisp += key;
    } else if (key === 'dot') {
      if (_cDisp === 'E') { _cDisp = '0.'; _cNewNum = false; }
      else if (_cNewNum) { _cDisp = '0.'; _cNewNum = false; }
      else if (!_cDisp.includes('.')) _cDisp += '.';
    } else if (['add','sub','mul','div'].includes(key)) {
      if (_cOperand !== null && !_cNewNum) {
        const r = _cFmt(_cCompute(_cOperand, parseFloat(_cDisp), _cOp));
        _cDisp = r; _cOperand = parseFloat(r);
      } else {
        _cOperand = parseFloat(_cDisp);
      }
      _cOp = key; _cNewNum = true;
    } else if (key === 'eq') {
      if (_cOperand !== null && _cOp !== null) {
        _cDisp = _cFmt(_cCompute(_cOperand, parseFloat(_cDisp), _cOp));
        _cOperand = null; _cOp = null; _cNewNum = true;
      }
    } else if (key === 'ac') {
      _cDisp = '0'; _cOperand = null; _cOp = null; _cNewNum = true;
    } else if (key === 'c') {
      _cDisp = '0'; _cNewNum = true;
    } else if (key === 'sign') {
      if (_cDisp !== '0' && _cDisp !== 'E') {
        _cDisp = _cDisp.startsWith('-') ? _cDisp.slice(1) : '-' + _cDisp;
      }
    } else if (key === 'pct') {
      let v = parseFloat(_cDisp);
      _cDisp = _cFmt(_cOperand !== null ? (_cOperand * v) / 100 : v / 100);
      _cNewNum = true;
    } else if (key === 'sqrt') {
      const v = parseFloat(_cDisp);
      _cDisp = v < 0 ? 'E' : _cFmt(Math.sqrt(v));
      _cNewNum = true;
    } else if (key === 'mplus') {
      _cMem += parseFloat(_cDisp) || 0; _cNewNum = true; _cMrcHit = false;
    } else if (key === 'mminus') {
      _cMem -= parseFloat(_cDisp) || 0; _cNewNum = true; _cMrcHit = false;
    } else if (key === 'mrc') {
      if (_cMrcHit) { _cMem = 0; _cMrcHit = false; }
      else { _cDisp = _cFmt(_cMem); _cNewNum = true; _cMrcHit = true; }
      _cRefresh(); return;
    } else if (key === 'off') {
      return; // OFF nie ma sensu w przeglądarce
    }
    _cMrcHit = false;
    _cRefresh();
  }

  function initCalc() {
    const panel = document.getElementById('calc-panel');
    if (!panel) return;
    panel.addEventListener('click', e => {
      const btn = e.target.closest('[data-calc]');
      if (btn) _cKey(btn.dataset.calc);
    });
  }

  // === Events ===
  function initEvents() {
    elBtnGenerate?.addEventListener('click', () => {
      if (currentMode === 'matura') {
        elMaturaTaskSelect?.value ? loadMaturaTask(elMaturaTaskSelect.value) : loadRandomMatura();
      } else if (currentMode === 'symulacja') {
        generateExam();
      } else {
        generateTask();
      }
    });
    elBtnStartExam?.addEventListener('click', generateExam);
    elBtnLoadMatura?.addEventListener('click', () => loadMaturaTask(elMaturaTaskSelect.value));
    elBtnRandomMatura?.addEventListener('click', loadRandomMatura);
    elYearSelect?.addEventListener('change', updateMaturaTaskList);

    elModeTabs?.addEventListener('click', e => {
      if (e.target.classList.contains('mode-tab')) switchMode(e.target.dataset.mode);
    });

    elBtnHint?.addEventListener('click', showNextHint);
    elBtnShowSolution?.addEventListener('click', showSolution);
    elBtnSelfCorrect?.addEventListener('click', () => recordResult(true));
    elBtnSelfWrong?.addEventListener('click', () => recordResult(false));

    // Opcje A/B/C/D dla zadań zamkniętych
    document.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (taskAnswered || !currentTask || currentTask.type !== 'closed') return;
        const selected = btn.dataset.opt;
        const isCorrect = selected === currentTask.correctOption;
        taskAnswered = true;

        document.querySelectorAll('.opt-btn').forEach(b => {
          b.disabled = true;
          if (b.dataset.opt === currentTask.correctOption) b.classList.add('correct');
          else if (b.dataset.opt === selected) b.classList.add('wrong');
        });

        // Pokaż rozwiązanie automatycznie
        elSolutionPanel.classList.remove('hidden');
        if (elAnswerDisplay) {
          const correctText = currentTask.options[currentTask.correctOption];
          KR.render(`**Odpowiedź:** ${currentTask.correctOption}: ${correctText}`, elAnswerDisplay);
        }
        if (elSolutionSteps) KR.renderSolution(currentTask.solution, elSolutionSteps);
        elBtnShowSolution?.classList.add('hidden');

        if (currentMode === 'symulacja') {
          examResults[examIndex] = isCorrect ? 'correct' : 'wrong';
          PT.record(currentTask.categoryId ?? currentTask.category, isCorrect);
          renderExamNav();
          showToast(isCorrect ? 'Poprawnie! ✓' : `Błąd — prawidłowa: ${currentTask.correctOption}`, isCorrect ? 'success' : 'warning');
          elBtnSelfCorrect?.classList.add('hidden');
          elBtnSelfWrong?.classList.add('hidden');
          const remaining = examResults.findIndex(r => r === null);
          if (remaining !== -1) {
            const nextIdx = examResults.findIndex((r, i) => r === null && i > examIndex);
            const labelIdx = nextIdx !== -1 ? nextIdx : remaining;
            if (elBtnNext) { elBtnNext.textContent = `→ Zadanie ${labelIdx + 1}`; elBtnNext.classList.remove('hidden'); }
          } else {
            if (elBtnNext) { elBtnNext.textContent = '📊 Pokaż wyniki'; elBtnNext.classList.remove('hidden'); }
          }
          updateSidebar();
        } else {
          PT.record(currentTask.categoryId ?? currentTask.category, isCorrect);
          SA?.recordAnswer(currentTask.categoryId ?? currentTask.category, isCorrect);
          showToast(isCorrect ? 'Poprawnie! ✓' : `Błąd — prawidłowa odpowiedź: ${currentTask.correctOption}`, isCorrect ? 'success' : 'warning');
          if (elBtnNext) { elBtnNext.textContent = '↻ Następne zadanie'; elBtnNext.classList.remove('hidden'); }
          updateSidebar();
        }
      });
    });
    elBtnNext?.addEventListener('click', () => {
      if (currentMode === 'symulacja') advanceExam();
      else if (currentMode === 'matura') loadRandomMatura();
      else generateTask();
    });

    elBtnProgressOpen?.addEventListener('click', openProgressModal);
    elBtnProgressClose?.addEventListener('click', () => elModalProgress?.classList.add('hidden'));
    elModalProgress?.addEventListener('click', e => { if (e.target === elModalProgress) elModalProgress.classList.add('hidden'); });

    $('btn-pricing-close')?.addEventListener('click', () => $('modal-pricing')?.classList.add('hidden'));
    $('modal-pricing')?.addEventListener('click', e => { if (e.target === $('modal-pricing')) $('modal-pricing').classList.add('hidden'); });

    $('btn-landing-login')?.addEventListener('click', openAuthModal);
    $('btn-landing-plans')?.addEventListener('click', () => openPricingModal());
    $('btn-open-pricing')?.addEventListener('click', () => openPricingModal());

    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

      // Kalkulator — przejmuje klawiaturę gdy aktywny
      if (currentMode === 'kalkulator') {
        const km = { '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
          '.':'dot',',':'dot',
          '+':'add','-':'sub','*':'mul','/':'div',
          'Enter':'eq','=':'eq',
          'Escape':'ac','Delete':'ac','Backspace':'c',
          'q':'sqrt','Q':'sqrt' };
        if (km[e.key]) { e.preventDefault(); _cKey(km[e.key]); }
        return;
      }

      if (e.key === 'Enter' && (!currentTask || taskAnswered)) {
        if (currentMode === 'symulacja') { if (taskAnswered) advanceExam(); else if (!examTasks.length) generateExam(); }
        else if (currentMode === 'matura') loadRandomMatura();
        else generateTask();
      }
      if ((e.key === 'h' || e.key === 'H') && currentTask && !taskAnswered) showNextHint();
      if ((e.key === 's' || e.key === 'S') && currentTask && !taskAnswered) showSolution();
    });
  }

  // === AUTH ===
  const SA = window.SupabaseAuth;

  const elBtnAuthOpen  = $('btn-auth-open');
  const elBtnUserMenu  = $('btn-user-menu');
  const elModalAuth    = $('modal-auth');
  const elBtnAuthClose = $('btn-auth-close');
  const elModalUser    = $('modal-user');
  const elBtnUserClose = $('btn-user-close');
  const elBtnLogout    = $('btn-logout');
  const elAuthError    = $('auth-error');

  function openAuthModal() {
    elModalAuth?.classList.remove('hidden');
  }

  function onAuthChange(user) {
    const elAvatar     = $('user-avatar');
    const elEmailShort = $('user-email-short');
    const elUmAvatar   = $('um-avatar');
    const elUmEmail    = $('um-email');
    const elUmPlan     = $('um-plan');

    if (user) {
      const letter = (user.email || user.user_metadata?.name || '?')[0].toUpperCase();
      const short  = (user.email || '').replace(/@.*/, '');
      elBtnAuthOpen?.classList.add('hidden');
      elBtnUserMenu?.classList.remove('hidden');
      if (elAvatar)     elAvatar.textContent     = letter;
      if (elEmailShort) elEmailShort.textContent = short;
      if (elUmAvatar)   elUmAvatar.textContent   = letter;
      if (elUmEmail)    elUmEmail.textContent     = user.email || '';

      const plan = SA?.getPlan() || 'free';
      const planLabels = { free: 'Free', standard: 'Standard', pro: 'Pro 🚀', max: 'Max ✨' };
      if (elUmPlan) {
        elUmPlan.textContent  = `Plan: ${planLabels[plan] || plan}`;
        elUmPlan.className    = `user-modal-plan plan-${plan}`;
      }

      // Pokaż username w modalu użytkownika
      updateUserModalUsername(SA?.getUsername() || '');

      updateLimitBadge();

      if (!firstTaskShown) {
        if (!SA?.getUsername()) {
          showUsernameModal();
        } else if (!getEffectiveSubjects()) {
          openOnboarding();
        } else {
          buildSubjectTabs();
          generateTask();
        }
      } else {
        buildSubjectTabs();
        syncProgressFromCloud();
      }
    } else {
      elBtnAuthOpen?.classList.remove('hidden');
      elBtnUserMenu?.classList.add('hidden');
      elLimitBadge?.classList.add('hidden');
      showLanding();
    }
    updateSidebar();
  }

  async function syncProgressFromCloud() {
    if (!SA?.isLoggedIn()) return;
    const [progress, daily] = await Promise.all([SA.fetchProgress(), SA.fetchDailyStats()]);
    if (progress) PT.loadFromCloud?.(progress);
    if (daily)    PT.loadDailyFromCloud?.(daily);
    updateSidebar();
  }

  function showAuthError(msg) {
    if (!elAuthError) return;
    elAuthError.textContent = msg;
    elAuthError.classList.remove('hidden');
  }
  function hideAuthError() { elAuthError?.classList.add('hidden'); }

  function setAuthTab(tab) {
    authMode = tab;
    elAuthTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    if (elAuthSubmit) elAuthSubmit.textContent = tab === 'login' ? 'Zaloguj się' : 'Zarejestruj się';
    hideAuthError();
  }

  function initAuthEvents() {
    elBtnAuthOpen?.addEventListener('click', openAuthModal);
    elBtnAuthClose?.addEventListener('click', () => elModalAuth?.classList.add('hidden'));
    elModalAuth?.addEventListener('click', e => { if (e.target === elModalAuth) elModalAuth.classList.add('hidden'); });

    elBtnUserMenu?.addEventListener('click', () => elModalUser?.classList.remove('hidden'));
    elBtnUserClose?.addEventListener('click', () => elModalUser?.classList.add('hidden'));
    elModalUser?.addEventListener('click', e => { if (e.target === elModalUser) elModalUser.classList.add('hidden'); });

    $('btn-um-upgrade')?.addEventListener('click', () => {
      elModalUser?.classList.add('hidden');
      openPricingModal();
    });

    $('btn-google-login')?.addEventListener('click', async () => {
      try {
        await SA.signInWithGoogle();
      } catch (err) {
        if (elAuthError) {
          if (err.message === 'WEBVIEW_BLOCKED') {
            elAuthError.innerHTML = 'Otwórz stronę w przeglądarce (Chrome/Safari), żeby zalogować się przez Google.<br><small>Logowanie przez Google nie działa w Messengerze i podobnych aplikacjach.</small>';
          } else {
            elAuthError.textContent = err.message || 'Błąd logowania.';
          }
          elAuthError.classList.remove('hidden');
        }
      }
    });

    // Kod promocyjny
    $('btn-redeem-promo')?.addEventListener('click', async () => {
      const input  = $('promo-input');
      const msgEl  = $('promo-msg');
      const code   = input?.value?.trim();
      if (!code) return;
      const btn = $('btn-redeem-promo');
      btn.textContent = '…';
      btn.disabled = true;
      msgEl?.classList.add('hidden');
      try {
        const result = await SA.redeemPromoCode(code);
        msgEl.textContent = result.message;
        msgEl.className = 'promo-msg promo-msg--ok';
        msgEl.classList.remove('hidden');
        input.value = '';
        // Odśwież UI planu
        const plan = SA.getPlan();
        const planLabels = { free: 'Free', standard: 'Standard', pro: 'Pro 🚀', max: 'Max ✨' };
        const elUmPlan = $('um-plan');
        if (elUmPlan) { elUmPlan.textContent = `Plan: ${planLabels[plan]}`; elUmPlan.className = `user-modal-plan plan-${plan}`; }
        updateLimitBadge();
        showToast(result.message, 'success');
      } catch (err) {
        msgEl.textContent = err.message;
        msgEl.className = 'promo-msg promo-msg--err';
        msgEl.classList.remove('hidden');
      } finally {
        btn.textContent = 'Aktywuj';
        btn.disabled = false;
      }
    });

    elBtnLogout?.addEventListener('click', async () => {
      await SA?.signOut();
      elModalUser?.classList.add('hidden');
      firstTaskShown = false;
      showToast('Wylogowano.', 'info');
    });
  }

  // === Init ===
  function init() {
    // Obsłuż powrót po płatności
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      showToast('Płatność zakończona! Plan zostanie aktywowany za chwilę.', 'success');
      history.replaceState({}, '', window.location.pathname);
    } else if (params.get('payment') === 'cancel') {
      showToast('Płatność anulowana.', 'warning');
      history.replaceState({}, '', window.location.pathname);
    }

    initCategorySelect();
    initYearSelect();
    initEvents();
    initAuthEvents();
    initUsernameEvents();
    initRankingEvents();
    initLevelEvents();
    initOnboardingEvents();
    initCalc();

    updateLogoSubtitle();
    updateLevelRow();

    // Pokaż landing dopóki nie znamy stanu auth
    showLanding();

    // Zakładki przedmiotów jeśli już spersonalizowane (np. powrót bez logowania)
    if (getLocalSubjects()) buildSubjectTabs();

    SA?.init(onAuthChange);
    updateSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
