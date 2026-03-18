import { pool } from "./storage";
import { getUserEntitlements } from "./entitlements";

export async function buildAuthUserResponse(user: any): Promise<Record<string, any>> {
  const entitlements = getUserEntitlements(user);

  const userId = user.id;
  let usage = { questionsUsed: 0, flashcardsUsed: 0, catExamsUsed: 0 };
  try {
    const r = await pool.query("SELECT * FROM free_trial_usage WHERE user_id = $1", [userId]);
    if (r.rows[0]) {
      usage = {
        questionsUsed: r.rows[0].questions_used ?? 0,
        flashcardsUsed: r.rows[0].flashcards_used ?? 0,
        catExamsUsed: r.rows[0].cat_exams_used ?? 0,
      };
    }
  } catch {}

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.display_name || user.displayName || null,
    role: user.role || null,
    country: user.country || null,
    examTrack: user.exam_track || user.examTrack || null,
    careerType: user.career_type || user.careerType || "nursing",
    region: user.region || "US",
    onboardingCompleted: user.onboarding_completed ?? user.onboardingCompleted ?? false,
    onboardingComplete: user.onboarding_complete ?? user.onboardingComplete ?? false,
    studyGoal: user.study_goal || user.studyGoal || null,
    dailyStudyTime: user.daily_study_time || user.dailyStudyTime || null,
    examType: user.exam_type || user.examType || null,
    tier: user.tier || "free",
    subscriptionStatus: user.subscription_status || user.subscriptionStatus || "inactive",
    isLifetime: user.is_lifetime ?? user.isLifetime ?? false,
    planExpiresAt: user.plan_expires_at || user.planExpiresAt || null,
    testerAccess: user.tester_access ?? user.testerAccess ?? false,
    testerExpiry: user.tester_expiry || user.testerExpiry || null,
    preferredTheme: user.preferred_theme || user.preferredTheme || null,
    entitlements,
    usage,
  };
}
