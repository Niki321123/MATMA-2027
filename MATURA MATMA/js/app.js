// app.js — główna logika aplikacji (tryby: Generator + Matura)
(() => {
  'use strict';

  const G = window.Generators;
  const KR = window.KatexRenderer;
  const PT = window.ProgressTracker;
  const MT = window.MaturaTasks;

  // === Stan ===
  let currentTask = null;
  let hintsUsed = 0;
  let taskAnswered = false;
  let currentMode = 'generator';

  // === Stan arkusza (symulacja) ===
  let examTasks = [];
  let examIndex = 0;
  let examResults = []; // 'correct' | 'wrong' | 'skip' | null

  // === DOM ===
  const $ = id => document.getElementById(id);
  const elCatSelect = $('select-category');
  const elBtnGenerate = $('btn-generate');
  const elYearSelect = $('select-year');
  const elMaturaTaskSelect = $('select-matura-task');
  const elBtnLoadMatura = $('btn-load-matura');
  const elBtnRandomMatura = $('btn-random-matura');
  const elPanelGen = $('control-panel-generator');
  const elPanelMatura = $('control-panel-matura');
  const elPanelExam = $('control-panel-symulacja');
  const elExamNav = $('exam-nav');
  const elExamNavPills = $('exam-nav-pills');
  const elExamNavScore = $('exam-nav-score');
  const elBtnStartExam = $('btn-start-exam');
  const elModeTabs = $('mode-tabs');

  const elTaskCard = $('task-card');
  const elTaskStatement = $('task-statement');
  const elTaskBadge = $('task-badge');
  const elTaskPoints = $('task-points');
  const elTaskSource = $('task-source');
  const elBtnHint = $('btn-hint');
  const elHintsList = $('hints-list');
  const elSolutionPanel = $('solution-panel');
  const elSolutionSteps = $('solution-steps');
  const elAnswerDisplay = $('answer-display');
  const elBtnSelfCorrect = $('btn-self-correct');
  const elBtnSelfWrong = $('btn-self-wrong');
  const elBtnShowSolution = $('btn-show-solution');
  const elBtnNext = $('btn-next');
  const elProgressSidebar = $('progress-sidebar');
  const elToast = $('toast');
  const elModalProgress = $('modal-progress');
  const elBtnProgressOpen = $('btn-progress-open');
  const elBtnProgressClose = $('btn-progress-close');
  const elModalBody = $('modal-body');

  // === Inicjalizacja dropdownów ===
  function initCategorySelect() {
    G.getAll().forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.id}. ${cat.name}`;
      elCatSelect.appendChild(opt);
    });
  }

  function initYearSelect() {
    if (!MT || !elYearSelect) return;
    MT.getYears().forEach(year => {
      const count = MT.getByYear(year).length;
      const opt = document.createElement('option');
      opt.value = year;
      opt.textContent = `Matura ${year} (${count} zadań)`;
      elYearSelect.appendChild(opt);
    });
    updateMaturaTaskList();
  }

  function updateMaturaTaskList() {
    if (!MT || !elMaturaTaskSelect) return;
    const year = parseInt(elYearSelect.value);
    const tasks = year ? MT.getByYear(year) : MT.getAll();
    elMaturaTaskSelect.innerHTML = `<option value="">— wybierz zadanie (${tasks.length}) —</option>`;
    tasks.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.year} z.${t.number} (${t.points} pkt) — ${t.categoryName}`;
      elMaturaTaskSelect.appendChild(opt);
    });
  }

  // === Tryby ===
  function switchMode(mode) {
    currentMode = mode;
    elModeTabs.querySelectorAll('.mode-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    elPanelGen.classList.toggle('hidden', mode !== 'generator');
    elPanelMatura.classList.toggle('hidden', mode !== 'matura');
    elPanelExam?.classList.toggle('hidden', mode !== 'symulacja');
    elExamNav?.classList.toggle('hidden', mode !== 'symulacja' || examTasks.length === 0);
    // Reset karty
    elTaskCard.classList.add('hidden');
    elSolutionPanel.classList.add('hidden');
    document.getElementById('exam-summary')?.remove();
    currentTask = null;
    if (mode !== 'symulacja') {
      examTasks = [];
      examResults = [];
    }
  }

  // === Generowanie ===
  function generateTask() {
    const catVal = elCatSelect.value;
    try {
      currentTask = catVal === '0' ? G.generateRandom() : G.generate(parseInt(catVal));
    } catch (e) {
      console.error('Błąd generatora:', e);
      showToast('Błąd generowania zadania.', 'error');
      return;
    }
    displayTask(currentTask, false);
  }

  function loadMaturaTask(id) {
    if (!MT) return;
    const raw = id ? MT.getById(id) : MT.random();
    if (!raw) {
      showToast('Wybierz zadanie z listy.', 'warning');
      return;
    }
    currentTask = MT.asTask(raw);
    displayTask(currentTask, true);
  }

  function loadRandomMatura() {
    if (!MT) return;
    const year = parseInt(elYearSelect.value);
    const raw = year ? MT.randomByYear(year) : MT.random();
    if (!raw) return;
    currentTask = MT.asTask(raw);
    displayTask(currentTask, true);
  }

  function displayTask(task, isMatura) {
    hintsUsed = 0;
    taskAnswered = false;

    // Badge kategorii
    const meta = G.getMeta(task.category);
    if (elTaskBadge && meta) {
      elTaskBadge.textContent = `${meta.icon} ${meta.name}`;
    } else if (elTaskBadge) {
      elTaskBadge.textContent = task.categoryName || `Kat. ${task.category}`;
    }
    if (elTaskPoints) elTaskPoints.textContent = `${task.points} pkt`;

    // Source badge (only for matura)
    if (elTaskSource) {
      if (isMatura) {
        elTaskSource.textContent = `📜 Matura ${task.year} z.${task.number}`;
        elTaskSource.classList.remove('hidden');
      } else {
        elTaskSource.classList.add('hidden');
      }
    }

    // Statement
    if (elTaskStatement) KR.render(task.statement, elTaskStatement);

    // Reset UI
    elTaskCard.classList.remove('hidden');
    elTaskCard.style.animation = 'none';
    requestAnimationFrame(() => { elTaskCard.style.animation = ''; });
    elSolutionPanel.classList.add('hidden');
    elHintsList.innerHTML = '';
    elBtnHint.disabled = false;
    elBtnHint.textContent = `💡 Pokaż wskazówkę (1/${task.hints.length})`;
    elBtnSelfCorrect?.classList.add('hidden');
    elBtnSelfWrong?.classList.add('hidden');
    elBtnShowSolution?.classList.remove('hidden');
    elBtnNext?.classList.add('hidden');
  }

  // === Wskazówki ===
  function showNextHint() {
    if (!currentTask || hintsUsed >= currentTask.hints.length) return;
    KR.renderHint(currentTask.hints[hintsUsed], elHintsList);
    hintsUsed++;
    if (hintsUsed >= currentTask.hints.length) {
      elBtnHint.disabled = true;
      elBtnHint.textContent = '✓ Wszystkie wskazówki';
    } else {
      elBtnHint.textContent = `💡 Pokaż wskazówkę (${hintsUsed + 1}/${currentTask.hints.length})`;
    }
  }

  // === Rozwiązanie ===
  function showSolution() {
    if (!currentTask) return;
    elSolutionPanel.classList.remove('hidden');

    // Format odpowiedzi
    if (elAnswerDisplay) {
      const ans = currentTask.answer;
      const desc = ans.description || ans.display;
      KR.render(`**Odpowiedź:** ${desc.includes('$') ? desc : `$${ans.display}$`}`, elAnswerDisplay);
    }

    if (elSolutionSteps) KR.renderSolution(currentTask.solution, elSolutionSteps);
    elBtnSelfCorrect?.classList.remove('hidden');
    elBtnSelfWrong?.classList.remove('hidden');
    elBtnShowSolution?.classList.add('hidden');
    elSolutionPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // === Samoocena ===
  function recordResult(correct) {
    if (currentMode === 'symulacja') { recordExamResult(correct); return; }
    if (!currentTask || taskAnswered) return;
    taskAnswered = true;
    PT.record(currentTask.category, correct);
    SA?.recordAnswer(currentTask.category, correct);
    showToast(correct ? 'Dobrze! Tak trzymaj ✓' : 'Spróbuj ponownie przy następnym zadaniu.', correct ? 'success' : 'warning');
    elBtnSelfCorrect?.classList.add('hidden');
    elBtnSelfWrong?.classList.add('hidden');
    if (elBtnNext) { elBtnNext.textContent = '↻ Następne zadanie'; elBtnNext.classList.remove('hidden'); }
    updateSidebar();
  }

  // === Sidebar ===
  function updateSidebar() {
    if (!elProgressSidebar) return;
    const today = PT.getTodayStats();
    const cats = G.getAll();
    const accuracyPct = today.attempted > 0 ? Math.round(100 * today.correct / today.attempted) : 0;

    let html = `
      <div class="sb-header">
        <div class="sb-stat-row">
          <div class="sb-stat">
            <span class="sb-stat-val">${today.correct}</span>
            <span class="sb-stat-lbl">Poprawnych</span>
          </div>
          <div class="sb-stat-divider"></div>
          <div class="sb-stat">
            <span class="sb-stat-val">${today.attempted}</span>
            <span class="sb-stat-lbl">Łącznie dziś</span>
          </div>
          <div class="sb-stat-divider"></div>
          <div class="sb-stat">
            <span class="sb-stat-val sb-stat-streak">🔥 ${today.streak}</span>
            <span class="sb-stat-lbl">Dni z rzędu</span>
          </div>
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
      const pct = PT.getCategoryPercent(cat.id);
      const fill = pct !== null ? pct : 0;
      const pctStr = pct !== null ? `${pct}%` : '—';
      const cs = PT.getCategoryStats ? PT.getCategoryStats(cat.id) : null;
      const attempted = cs?.attempted || 0;
      html += `
        <div class="sb-cat">
          <div class="sb-cat-left">
            <span class="sb-cat-icon" style="color:${cat.color}">${cat.icon}</span>
            <span class="sb-cat-name">${cat.name.length > 20 ? cat.name.substring(0,20)+'…' : cat.name}</span>
          </div>
          <div class="sb-cat-right">
            <div class="sb-bar-track">
              <div class="sb-bar-fill" style="width:${fill}%; background:${cat.color}"></div>
            </div>
            <span class="sb-cat-pct" style="color:${pct !== null && pct > 0 ? cat.color : 'var(--text-muted)'}">${pctStr}</span>
          </div>
        </div>
      `;
    });

    html += '</div>';
    elProgressSidebar.innerHTML = html;
  }

  // === Modal statystyk ===
  function openProgressModal() {
    if (!elModalProgress) return;
    const cats = G.getAll();
    const stats = PT.getStats();
    let html = `
      <div class="modal-stats-grid">
        <div class="modal-stat-card"><div class="stat-num">${stats.totalAttempted || 0}</div><div class="stat-label">Zadań</div></div>
        <div class="modal-stat-card"><div class="stat-num">${stats.totalCorrect || 0}</div><div class="stat-label">Poprawnych</div></div>
        <div class="modal-stat-card"><div class="stat-num">${stats.streak || 0}</div><div class="stat-label">Dni z rzędu</div></div>
        <div class="modal-stat-card"><div class="stat-num">${stats.totalAttempted ? Math.round(100*stats.totalCorrect/stats.totalAttempted) : 0}%</div><div class="stat-label">Skuteczność</div></div>
      </div>
      <h3 style="margin:1.5rem 0 1rem; color:var(--text-secondary)">Postęp per kategoria</h3>
    `;
    cats.forEach(cat => {
      const pct = PT.getCategoryPercent(cat.id);
      const fill = pct !== null ? pct : 0;
      const cs = PT.getCategoryStats(cat.id);
      html += `
        <div class="modal-cat-row">
          <div class="modal-cat-info"><span style="color:${cat.color}">${cat.icon}</span> ${cat.id}. ${cat.name}</div>
          <div class="modal-cat-bar"><div class="modal-cat-fill" style="width:${fill}%; background:${cat.color}"></div></div>
          <div class="modal-cat-pct">${pct !== null ? pct + '%' : '—'} <small>(${cs?.attempted || 0})</small></div>
        </div>
      `;
    });
    elModalBody.innerHTML = html;
    elModalProgress.classList.remove('hidden');
  }

  function showToast(msg, type = 'info') {
    if (!elToast) return;
    elToast.textContent = msg;
    elToast.className = `toast toast-${type} show`;
    setTimeout(() => { elToast.className = 'toast'; }, 3000);
  }

  // === Symulacja matury ===

  const EXAM_CATS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  function generateExam() {
    examTasks = [];
    examResults = [];
    const cats = [...EXAM_CATS].sort(() => Math.random() - 0.5).slice(0, 12);
    cats.forEach(catId => {
      try {
        const task = G.generate(catId);
        examTasks.push(task);
        examResults.push(null);
      } catch (e) { /* skip if generator fails */ }
    });
    if (examTasks.length === 0) {
      showToast('Błąd generowania arkusza.', 'error');
      return;
    }
    examIndex = 0;
    elExamNav?.classList.remove('hidden');
    renderExamNav();
    loadExamTask(0);
  }

  function loadExamTask(idx) {
    examIndex = idx;
    currentTask = examTasks[idx];
    displayTask(currentTask, false);
    // Override badge to show task number
    if (elTaskBadge) elTaskBadge.textContent = `Zad. ${idx + 1}/${examTasks.length}`;
    if (elTaskSource) {
      elTaskSource.textContent = `🎓 Arkusz — ${currentTask.categoryName}`;
      elTaskSource.classList.remove('hidden');
    }
    renderExamNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderExamNav() {
    if (!elExamNavPills) return;
    elExamNavPills.innerHTML = '';
    examTasks.forEach((t, i) => {
      const pill = document.createElement('button');
      pill.className = 'exam-pill';
      pill.textContent = i + 1;
      pill.title = `${i + 1}. ${t.categoryName} (${t.points} pkt)`;
      if (i === examIndex) pill.classList.add('active');
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
    // Score
    const answered = examResults.filter(r => r !== null).length;
    const pts = examResults.reduce((sum, r, i) => sum + (r === 'correct' ? examTasks[i].points : 0), 0);
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
    renderExamNav();
    showToast(correct ? 'Dobrze! ✓' : 'Zaznaczono jako błędne.', correct ? 'success' : 'warning');
    elBtnSelfCorrect?.classList.add('hidden');
    elBtnSelfWrong?.classList.add('hidden');
    // Check if more tasks remain
    const remaining = examResults.findIndex(r => r === null);
    if (remaining !== -1) {
      const nextIdx = examResults.findIndex((r, i) => r === null && i > examIndex);
      const labelIdx = nextIdx !== -1 ? nextIdx : remaining;
      if (elBtnNext) {
        elBtnNext.textContent = `→ Zadanie ${labelIdx + 1}`;
        elBtnNext.classList.remove('hidden');
      }
    } else {
      if (elBtnNext) {
        elBtnNext.textContent = '📊 Pokaż wyniki';
        elBtnNext.classList.remove('hidden');
      }
    }
    updateSidebar();
  }

  function advanceExam() {
    const allAnswered = examResults.every(r => r !== null);
    if (allAnswered) {
      showExamSummary();
      return;
    }
    // Go to next unanswered, wrapping around from current position
    let next = -1;
    for (let i = examIndex + 1; i < examTasks.length; i++) {
      if (examResults[i] === null) { next = i; break; }
    }
    if (next === -1) {
      for (let i = 0; i < examIndex; i++) {
        if (examResults[i] === null) { next = i; break; }
      }
    }
    if (next !== -1) loadExamTask(next);
    else showExamSummary();
  }

  function showExamSummary() {
    const pts = examResults.reduce((sum, r, i) => sum + (r === 'correct' ? examTasks[i].points : 0), 0);
    const maxPts = examTasks.reduce((s, t) => s + t.points, 0);
    const pct = Math.round(100 * pts / maxPts);
    const pass = pct >= 30; // próg zdawalności
    const breakdownHtml = examTasks.map((t, i) => {
      const r = examResults[i];
      const cls = r === 'correct' ? 'correct-row' : r === 'wrong' ? 'wrong-row' : 'skip-row';
      const icon = r === 'correct' ? '✓' : r === 'wrong' ? '✗' : '—';
      return `<div class="exam-breakdown-row ${cls}">
        <span class="task-num">${icon} Zad. ${i + 1}</span> (${t.points} pkt)
        <div class="cat-name">${t.categoryName}</div>
      </div>`;
    }).join('');

    elTaskCard.classList.add('hidden');
    elSolutionPanel.classList.add('hidden');

    const summaryEl = document.createElement('div');
    summaryEl.className = 'exam-summary-card';
    summaryEl.innerHTML = `
      <h2>Wyniki arkusza</h2>
      <div class="exam-score-big ${pass ? 'pass' : 'fail'}">${pts}/${maxPts}</div>
      <div class="exam-score-label">${pct}% punktów — ${pass ? '✅ Zdany (≥30%)' : '❌ Niezdany (<30%)'}</div>
      <div class="exam-breakdown">${breakdownHtml}</div>
      <button class="btn btn-primary" id="btn-new-exam">🎓 Nowy arkusz</button>
    `;
    const section = document.querySelector('.task-section');
    // Remove old summary if exists
    const old = document.getElementById('exam-summary');
    if (old) old.remove();
    summaryEl.id = 'exam-summary';
    section.appendChild(summaryEl);
    summaryEl.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('btn-new-exam')?.addEventListener('click', () => {
      summaryEl.remove();
      generateExam();
    });
    if (elExamNavScore) {
      const answered = examResults.filter(r => r !== null).length;
      elExamNavScore.textContent = `${pts}/${maxPts} pkt (${pct}%)`;
    }
  }

  // === Event listeners ===
  function initEvents() {
    elBtnGenerate?.addEventListener('click', () => {
      if (currentMode === 'matura') {
        const id = elMaturaTaskSelect?.value;
        id ? loadMaturaTask(id) : loadRandomMatura();
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
    elBtnNext?.addEventListener('click', () => {
      if (currentMode === 'symulacja') advanceExam();
      else if (currentMode === 'matura') loadRandomMatura();
      else generateTask();
    });
    elBtnProgressOpen?.addEventListener('click', openProgressModal);
    elBtnProgressClose?.addEventListener('click', () => elModalProgress?.classList.add('hidden'));
    elModalProgress?.addEventListener('click', e => {
      if (e.target === elModalProgress) elModalProgress.classList.add('hidden');
    });

    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
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
  const elBtnAuthOpen   = $('btn-auth-open');
  const elBtnUserMenu   = $('btn-user-menu');
  const elModalAuth     = $('modal-auth');
  const elBtnAuthClose  = $('btn-auth-close');
  const elModalUser     = $('modal-user');
  const elBtnUserClose  = $('btn-user-close');
  const elBtnLogout     = $('btn-logout');
  const elAuthForm      = $('auth-form');
  const elAuthEmail     = $('auth-email');
  const elAuthPassword  = $('auth-password');
  const elAuthSubmit    = $('auth-submit');
  const elAuthError     = $('auth-error');
  const elAuthTabs      = document.querySelectorAll('.auth-tab');
  let authMode = 'login'; // 'login' | 'register'

  function onAuthChange(user) {
    const elAvatar    = $('user-avatar');
    const elEmailShort = $('user-email-short');
    const elUmAvatar  = $('um-avatar');
    const elUmEmail   = $('um-email');

    if (user) {
      const letter = (user.email || user.user_metadata?.name || '?')[0].toUpperCase();
      const short  = (user.email || '').replace(/@.*/, '');
      elBtnAuthOpen?.classList.add('hidden');
      elBtnUserMenu?.classList.remove('hidden');
      if (elAvatar) elAvatar.textContent = letter;
      if (elEmailShort) elEmailShort.textContent = short;
      if (elUmAvatar) elUmAvatar.textContent = letter;
      if (elUmEmail) elUmEmail.textContent = user.email || '';
      // Załaduj postęp z chmury
      syncProgressFromCloud();
    } else {
      elBtnAuthOpen?.classList.remove('hidden');
      elBtnUserMenu?.classList.add('hidden');
    }
    updateSidebar();
  }

  async function syncProgressFromCloud() {
    if (!SA?.isLoggedIn()) return;
    const [progress, daily] = await Promise.all([SA.fetchProgress(), SA.fetchDailyStats()]);
    if (progress) PT.loadFromCloud(progress);
    if (daily)    PT.loadDailyFromCloud(daily);
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
    elBtnAuthOpen?.addEventListener('click', () => {
      elModalAuth?.classList.remove('hidden');
      elAuthEmail?.focus();
    });
    elBtnAuthClose?.addEventListener('click', () => elModalAuth?.classList.add('hidden'));
    elModalAuth?.addEventListener('click', e => { if (e.target === elModalAuth) elModalAuth.classList.add('hidden'); });

    elBtnUserMenu?.addEventListener('click', () => elModalUser?.classList.remove('hidden'));
    elBtnUserClose?.addEventListener('click', () => elModalUser?.classList.add('hidden'));
    elModalUser?.addEventListener('click', e => { if (e.target === elModalUser) elModalUser.classList.add('hidden'); });

    elAuthTabs.forEach(t => t.addEventListener('click', () => setAuthTab(t.dataset.tab)));

    elAuthForm?.addEventListener('submit', async e => {
      e.preventDefault();
      hideAuthError();
      const email = elAuthEmail?.value.trim();
      const pass  = elAuthPassword?.value;
      if (!email || !pass) return;
      elAuthSubmit?.classList.add('loading');
      elAuthSubmit.textContent = 'Ładowanie…';
      try {
        if (authMode === 'login') {
          await SA.signInEmail(email, pass);
        } else {
          await SA.signUpEmail(email, pass);
          showToast('Sprawdź email, żeby potwierdzić konto!', 'info');
        }
        elModalAuth?.classList.add('hidden');
      } catch (err) {
        const msg = err.message?.includes('Invalid login') ? 'Błędny email lub hasło.'
          : err.message?.includes('already registered') ? 'Ten email jest już zarejestrowany.'
          : err.message?.includes('Password should') ? 'Hasło musi mieć min. 6 znaków.'
          : err.message || 'Coś poszło nie tak.';
        showAuthError(msg);
      } finally {
        elAuthSubmit?.classList.remove('loading');
        setAuthTab(authMode);
      }
    });

    elBtnLogout?.addEventListener('click', async () => {
      await SA?.signOut();
      elModalUser?.classList.add('hidden');
      showToast('Wylogowano.', 'info');
    });
  }

  // === Init ===
  function init() {
    initCategorySelect();
    initYearSelect();
    initEvents();
    initAuthEvents();
    SA?.init(onAuthChange);
    updateSidebar();
    generateTask();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
