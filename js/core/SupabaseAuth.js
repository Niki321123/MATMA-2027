// SupabaseAuth — autentykacja, plany i synchronizacja statystyk
window.SupabaseAuth = (() => {
  const SUPABASE_URL = 'https://ohaeqozswszudejxtwcb.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_Xj3K46ULRL7mWoXo05fPmQ_T8LJKL48';

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const PLAN_LIMITS = {
    free: { tasks: 3,        matura: 0 },
    pro:  { tasks: 10,       matura: 1 },
    max:  { tasks: Infinity, matura: Infinity },
  };

  let currentUser = null;
  let onAuthChangeCallback = null;
  let userPlan = 'free';
  let todayUsage = { tasks_generated: 0, matura_started: 0 };

  // === Init ===
  async function init(onAuthChange) {
    onAuthChangeCallback = onAuthChange;

    const { data: { session } } = await sb.auth.getSession();
    if (session?.user) {
      currentUser = session.user;
      await fetchProfile();
      onAuthChangeCallback?.(currentUser);
    }

    sb.auth.onAuthStateChange(async (_event, session) => {
      currentUser = session?.user ?? null;
      if (currentUser) await fetchProfile();
      else { userPlan = 'free'; todayUsage = { tasks_generated: 0, matura_started: 0 }; }
      onAuthChangeCallback?.(currentUser);
    });
  }

  function getUser()    { return currentUser; }
  function isLoggedIn() { return !!currentUser; }
  function getPlan()    { return userPlan; }

  // === Plan & usage ===
  async function fetchProfile() {
    if (!currentUser) return;
    const today = new Date().toISOString().slice(0, 10);

    const [{ data: profile }, { data: daily }] = await Promise.all([
      sb.from('profiles').select('plan').eq('id', currentUser.id).single(),
      sb.from('user_daily')
        .select('tasks_generated, matura_started')
        .eq('user_id', currentUser.id)
        .eq('date', today)
        .single(),
    ]);

    userPlan = profile?.plan ?? 'free';
    todayUsage = {
      tasks_generated: daily?.tasks_generated ?? 0,
      matura_started:  daily?.matura_started  ?? 0,
    };
  }

  function getTasksRemaining() {
    const limit = PLAN_LIMITS[userPlan]?.tasks ?? 3;
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - todayUsage.tasks_generated);
  }

  function getMaturaRemaining() {
    const limit = PLAN_LIMITS[userPlan]?.matura ?? 0;
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - todayUsage.matura_started);
  }

  function canGenerateTask() {
    return getTasksRemaining() > 0;
  }

  function canStartMatura() {
    return getMaturaRemaining() > 0;
  }

  function trackTaskGenerated() {
    if (!currentUser) return;
    todayUsage.tasks_generated++;
    _syncDailyUsage();
  }

  function trackMaturaStarted() {
    if (!currentUser) return;
    todayUsage.matura_started++;
    _syncDailyUsage();
  }

  async function _syncDailyUsage() {
    if (!currentUser) return;
    const today = new Date().toISOString().slice(0, 10);
    await sb.from('user_daily').upsert(
      {
        user_id: currentUser.id,
        date: today,
        tasks_generated: todayUsage.tasks_generated,
        matura_started:  todayUsage.matura_started,
      },
      { onConflict: 'user_id,date' }
    );
  }

  // === Checkout Stripe ===
  async function createCheckoutSession(plan) {
    const { data: { session } } = await sb.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error('Nie jesteś zalogowany.');

    const res = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_KEY,
      },
      body: JSON.stringify({
        plan,
        success_url: window.location.href.split('?')[0] + '?payment=success',
        cancel_url:  window.location.href.split('?')[0] + '?payment=cancel',
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Błąd tworzenia sesji płatności.');
    return data.url;
  }

  // === Auth actions ===
  async function signInWithGoogle() {
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href.split('?')[0],
      },
    });
    if (error) throw error;
  }

  async function signOut() {
    await sb.auth.signOut();
  }

  // === Progress sync ===
  async function fetchProgress() {
    if (!currentUser) return null;
    const { data, error } = await sb.from('user_progress').select('*');
    if (error) { console.error('fetchProgress:', error); return null; }
    return data;
  }

  async function fetchDailyStats() {
    if (!currentUser) return null;
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await sb
      .from('user_daily')
      .select('*')
      .order('date', { ascending: false })
      .limit(60);

    if (error) { console.error('fetchDailyStats:', error); return null; }

    const todayRow = data.find(r => r.date === today) || { attempted: 0, correct: 0 };

    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 60; i++) {
      const dateStr = d.toISOString().slice(0, 10);
      if (data.some(r => r.date === dateStr && r.attempted > 0)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else break;
    }

    return { today: todayRow, streak };
  }

  async function recordAnswer(categoryId, isCorrect) {
    if (!currentUser) return;
    const today = new Date().toISOString().slice(0, 10);

    const { data: existing } = await sb
      .from('user_progress')
      .select('attempted, correct')
      .eq('user_id', currentUser.id)
      .eq('category_id', categoryId)
      .single();

    if (existing) {
      await sb.from('user_progress').update({
        attempted: existing.attempted + 1,
        correct: existing.correct + (isCorrect ? 1 : 0),
        last_played: today,
        updated_at: new Date().toISOString(),
      }).eq('user_id', currentUser.id).eq('category_id', categoryId);
    } else {
      await sb.from('user_progress').insert({
        user_id: currentUser.id, category_id: categoryId,
        attempted: 1, correct: isCorrect ? 1 : 0, last_played: today,
      });
    }

    const { data: dayRow } = await sb
      .from('user_daily')
      .select('attempted, correct')
      .eq('user_id', currentUser.id)
      .eq('date', today)
      .single();

    if (dayRow) {
      await sb.from('user_daily').update({
        attempted: dayRow.attempted + 1,
        correct: dayRow.correct + (isCorrect ? 1 : 0),
      }).eq('user_id', currentUser.id).eq('date', today);
    } else {
      await sb.from('user_daily').insert({
        user_id: currentUser.id, date: today,
        attempted: 1, correct: isCorrect ? 1 : 0,
      });
    }
  }

  async function loadFromCloud(progress) {
    // handled by ProgressTracker
  }

  async function loadDailyFromCloud(daily) {
    // handled by ProgressTracker
  }

  return {
    init, getUser, isLoggedIn,
    getPlan, fetchProfile, getTasksRemaining, getMaturaRemaining,
    canGenerateTask, canStartMatura, trackTaskGenerated, trackMaturaStarted,
    createCheckoutSession,
    signInWithGoogle, signOut,
    fetchProgress, fetchDailyStats, recordAnswer,
    loadFromCloud, loadDailyFromCloud,
  };
})();
