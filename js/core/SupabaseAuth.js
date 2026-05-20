// SupabaseAuth — autentykacja, plany i synchronizacja statystyk
window.SupabaseAuth = (() => {
  const SUPABASE_URL = 'https://ohaeqozswszudejxtwcb.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_Xj3K46ULRL7mWoXo05fPmQ_T8LJKL48';

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const PLAN_LIMITS = {
    free:     { tasks: 2,        matura: 0 },
    standard: { tasks: 3,        matura: 1 },  // matura reset co 2 tygodnie — obsługiwane przez backend
    pro:      { tasks: 10,       matura: 1 },
    max:      { tasks: Infinity, matura: Infinity },
  };

  let currentUser = null;
  let onAuthChangeCallback = null;
  let userPlan = 'free';
  let userUsername = null;
  let todayUsage = { tasks_generated: 0, matura_started: 0 };
  let maturaLastStartedAt = null; // tylko dla planu standard (dwutygodniowy reset)

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
      else { userPlan = 'free'; userUsername = null; maturaLastStartedAt = null; todayUsage = { tasks_generated: 0, matura_started: 0 }; }
      onAuthChangeCallback?.(currentUser);
    });
  }

  function getUser()     { return currentUser; }
  function isLoggedIn()  { return !!currentUser; }
  function getPlan()     { return userPlan; }
  function getUsername() { return userUsername; }

  // === Plan & usage ===
  async function fetchProfile() {
    if (!currentUser) return;
    const today = new Date().toISOString().slice(0, 10);

    // Synchronizuj display_name z Google OAuth (przy każdym logowaniu)
    const meta = currentUser.user_metadata || {};
    const displayName = meta.full_name || meta.name || (currentUser.email || '').split('@')[0];
    const avatarUrl   = meta.avatar_url || null;
    if (displayName) {
      sb.from('profiles').update({ display_name: displayName, avatar_url: avatarUrl })
        .eq('id', currentUser.id).then(() => {}); // fire-and-forget
    }

    const [{ data: profile }, { data: daily }] = await Promise.all([
      sb.from('profiles').select('plan, display_name, avatar_url, username, matura_last_started_at').eq('id', currentUser.id).single(),
      sb.from('user_daily')
        .select('tasks_generated, matura_started')
        .eq('user_id', currentUser.id)
        .eq('date', today)
        .single(),
    ]);

    // Sprawdź wygaśnięcie planu
    const rawPlan = profile?.plan ?? 'free';
    const expiresAt = profile?.plan_expires_at;
    if (expiresAt && new Date(expiresAt) < new Date()) {
      userPlan = 'free';
    } else {
      userPlan     = rawPlan;
    userUsername = profile?.username ?? null;
    maturaLastStartedAt = profile?.matura_last_started_at ?? null;
    }
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
    if (userPlan === 'standard') {
      if (!maturaLastStartedAt) return 1;
      const daysSince = (Date.now() - new Date(maturaLastStartedAt).getTime()) / 86400000;
      return daysSince >= 14 ? 1 : 0;
    }
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
    if (userPlan === 'standard') {
      maturaLastStartedAt = new Date().toISOString();
      sb.from('profiles').update({ matura_last_started_at: maturaLastStartedAt }).eq('id', currentUser.id).then(() => {});
      return;
    }
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

  // === Kody promocyjne ===
  async function redeemPromoCode(code) {
    const { data: { session } } = await sb.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error('Nie jesteś zalogowany.');

    const res = await fetch(`${SUPABASE_URL}/functions/v1/redeem-promo-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_KEY,
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Błąd aktywacji kodu.');
    // Odśwież plan lokalnie
    await fetchProfile();
    return data;
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

  // === Username ===
  async function checkUsernameAvailable(name) {
    const { data } = await sb.from('profiles')
      .select('id')
      .eq('username', name)
      .neq('id', currentUser?.id ?? '')
      .maybeSingle();
    return !data; // true = wolna
  }

  async function setUsername(name) {
    if (!currentUser) throw new Error('Nie jesteś zalogowany.');
    const trimmed = name.trim();
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(trimmed))
      throw new Error('3–20 znaków: litery, cyfry, podkreślnik (_).');
    const available = await checkUsernameAvailable(trimmed);
    if (!available) throw new Error('Ta nazwa jest już zajęta.');
    const { error } = await sb.from('profiles')
      .update({ username: trimmed })
      .eq('id', currentUser.id);
    if (error) throw new Error('Błąd zapisywania nazwy.');
    userUsername = trimmed;
    return trimmed;
  }

  // === Leaderboard ===
  async function fetchLeaderboard() {
    const { data, error } = await sb.rpc('get_leaderboard');
    if (error) { console.error('fetchLeaderboard:', error); return []; }
    return data || [];
  }

  return {
    init, getUser, isLoggedIn,
    getPlan, fetchProfile, getTasksRemaining, getMaturaRemaining,
    canGenerateTask, canStartMatura, trackTaskGenerated, trackMaturaStarted,
    createCheckoutSession,
    signInWithGoogle, signOut, redeemPromoCode,
    fetchProgress, fetchDailyStats, recordAnswer,
    loadFromCloud, loadDailyFromCloud,
    getUsername, setUsername, checkUsernameAvailable,
    fetchLeaderboard,
  };
})();
