// SupabaseAuth — autentykacja i synchronizacja statystyk z Supabase
window.SupabaseAuth = (() => {
  const SUPABASE_URL = 'https://ohaeqozswszudejxtwcb.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_Xj3K46ULRL7mWoXo05fPmQ_T8LJKL48';

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  let currentUser = null;
  let onAuthChangeCallback = null;

  // === Init ===
  async function init(onAuthChange) {
    onAuthChangeCallback = onAuthChange;

    const { data: { session } } = await sb.auth.getSession();
    if (session?.user) {
      currentUser = session.user;
      onAuthChangeCallback?.(currentUser);
    }

    sb.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user ?? null;
      onAuthChangeCallback?.(currentUser);
    });
  }

  function getUser() { return currentUser; }
  function isLoggedIn() { return !!currentUser; }

  // === Auth actions ===
  async function signInEmail(email, password) {
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUpEmail(email, password) {
    const { error } = await sb.auth.signUp({ email, password });
    if (error) throw error;
  }

  async function signOut() {
    await sb.auth.signOut();
  }

  // === Progress sync ===

  // Pobierz cały postęp z bazy dla zalogowanego użytkownika
  async function fetchProgress() {
    if (!currentUser) return null;
    const { data, error } = await sb.from('user_progress').select('*');
    if (error) { console.error('fetchProgress:', error); return null; }
    return data; // array of { category_id, attempted, correct, last_played }
  }

  // Pobierz aktywność dziś + streak
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

    // Oblicz streak: ile kolejnych dni wstecz ma wpis
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 60; i++) {
      const dateStr = d.toISOString().slice(0, 10);
      if (data.some(r => r.date === dateStr && (r.attempted > 0))) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }

    return { today: todayRow, streak };
  }

  // Zapisz wynik jednego zadania
  async function recordAnswer(categoryId, isCorrect) {
    if (!currentUser) return;

    const today = new Date().toISOString().slice(0, 10);

    // Upsert category progress
    await sb.from('user_progress').upsert({
      user_id: currentUser.id,
      category_id: categoryId,
      attempted: 1,
      correct: isCorrect ? 1 : 0,
      last_played: today,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,category_id',
      ignoreDuplicates: false
    }).then(() => {
      // Increment via RPC not available without custom function — use update after fetch
    });

    // Increment properly via separate update
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
        updated_at: new Date().toISOString()
      })
      .eq('user_id', currentUser.id)
      .eq('category_id', categoryId);
    } else {
      await sb.from('user_progress').insert({
        user_id: currentUser.id,
        category_id: categoryId,
        attempted: 1,
        correct: isCorrect ? 1 : 0,
        last_played: today
      });
    }

    // Upsert daily
    const { data: dayRow } = await sb
      .from('user_daily')
      .select('attempted, correct')
      .eq('user_id', currentUser.id)
      .eq('date', today)
      .single();

    if (dayRow) {
      await sb.from('user_daily').update({
        attempted: dayRow.attempted + 1,
        correct: dayRow.correct + (isCorrect ? 1 : 0)
      })
      .eq('user_id', currentUser.id)
      .eq('date', today);
    } else {
      await sb.from('user_daily').insert({
        user_id: currentUser.id,
        date: today,
        attempted: 1,
        correct: isCorrect ? 1 : 0
      });
    }
  }

  return { init, getUser, isLoggedIn, signInEmail, signUpEmail, signOut, fetchProgress, fetchDailyStats, recordAnswer };
})();
