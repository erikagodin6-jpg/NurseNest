export type Feature =
  | "lessons_free"
  | "anatomy_labeling"
  | "concept_checks"
  | "pre_nursing_foundations"
  | "lessons_rpn"
  | "lessons_rn"
  | "lessons_np"
  | "flashcards"
  | "med_math"
  | "lab_interpretation"
  | "case_simulations"
  | "medication_mastery"
  | "clinical_skills_simulator"
  | "qbank"
  | "cat_exams"
  | "reports"
  | "admin_dashboard"
  | "content_editor"
  | "adaptive_engine"
  | "pass_probability_model"
  | "intelligent_recommendations"
  | "unlimited_mock_exams"
  | "ai_study_coach";

export type Tier = "free" | "rpn" | "rn" | "np" | "admin";

const TIER_HIERARCHY: Record<Tier, number> = {
  free: 0,
  rpn: 1,
  rn: 2,
  np: 3,
  admin: 4,
};

const FEATURE_TIERS: Record<Feature, Tier> = {
  lessons_free: "free",
  anatomy_labeling: "free",
  concept_checks: "free",
  pre_nursing_foundations: "free",
  lessons_rpn: "rpn",
  lessons_rn: "rn",
  lessons_np: "np",
  flashcards: "rpn",
  med_math: "rpn",
  lab_interpretation: "rpn",
  case_simulations: "rpn",
  medication_mastery: "rpn",
  clinical_skills_simulator: "rpn",
  qbank: "rpn",
  cat_exams: "rpn",
  reports: "rpn",
  admin_dashboard: "admin",
  content_editor: "admin",
  adaptive_engine: "rpn",
  pass_probability_model: "rpn",
  intelligent_recommendations: "rpn",
  unlimited_mock_exams: "rpn",
  ai_study_coach: "rpn",
};

const FEATURE_UPGRADE_MESSAGES: Partial<Record<Feature, string>> = {
  adaptive_engine: "Upgrade to unlock adaptive learning that adjusts to your performance in real time.",
  pass_probability_model: "Upgrade to unlock predictive analytics.",
  intelligent_recommendations: "Upgrade to unlock personalized study recommendations powered by AI.",
  unlimited_mock_exams: "Upgrade to unlock unlimited mock exams with detailed analytics.",
  case_simulations: "Upgrade to unlock interactive clinical case simulations.",
  ai_study_coach: "Upgrade to unlock your AI-powered study coach.",
};

export function canAccessFeature(userTier: string | null | undefined, feature: Feature): boolean {
  const requiredTier = FEATURE_TIERS[feature];
  if (!requiredTier || requiredTier === "free") return true;
  if (!userTier || userTier === "free") return false;
  if (userTier === "admin") return true;
  const userLevel = TIER_HIERARCHY[userTier as Tier] ?? 0;
  const requiredLevel = TIER_HIERARCHY[requiredTier] ?? 0;
  return userLevel >= requiredLevel;
}

export function getRequiredTier(feature: Feature): Tier {
  return FEATURE_TIERS[feature];
}

export function isFreeTier(feature: Feature): boolean {
  return FEATURE_TIERS[feature] === "free";
}

export function getFeaturesByTier(tier: Tier): Feature[] {
  return Object.entries(FEATURE_TIERS)
    .filter(([, t]) => t === tier)
    .map(([f]) => f as Feature);
}

export function getUpgradeMessage(feature: Feature): string {
  return FEATURE_UPGRADE_MESSAGES[feature] || "Upgrade to unlock this premium feature.";
}

export const FEATURE_LABELS: Record<Feature, string> = {
  lessons_free: "Free Lessons",
  anatomy_labeling: "Interactive Anatomy",
  concept_checks: "Concept Checks",
  pre_nursing_foundations: "Pre-Nursing Foundations",
  lessons_rpn: "RPN/LVN Lessons",
  lessons_rn: "RN Lessons",
  lessons_np: "NP Lessons",
  flashcards: "Flashcards",
  med_math: "Med Math Lab",
  lab_interpretation: "Lab Interpretation",
  case_simulations: "Case Simulations",
  medication_mastery: "Medication Mastery",
  clinical_skills_simulator: "Clinical Skills Simulator",
  qbank: "Question Bank",
  cat_exams: "CAT Exams",
  reports: "Performance Reports",
  admin_dashboard: "Admin Dashboard",
  content_editor: "Content Editor",
  adaptive_engine: "Adaptive Learning Engine",
  pass_probability_model: "Pass Probability Predictor",
  intelligent_recommendations: "Intelligent Recommendations",
  unlimited_mock_exams: "Unlimited Mock Exams",
  ai_study_coach: "AI Study Coach",
};
