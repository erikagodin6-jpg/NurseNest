/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CLIENT-SIDE ENTITLEMENT SYSTEM — SOURCE OF TRUTH (FRONTEND)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ALL frontend premium access decisions MUST go through this module.
 *
 * Use canAccessFeature(userTier, feature) to check whether the current user
 * can access a given feature. Do NOT write inline tier comparisons elsewhere.
 *
 * The server-side counterpart lives in server/entitlements.ts and mirrors
 * this logic. Both must stay in sync when adding/removing features or tiers.
 *
 * WARNING: Frontend gating is a UX convenience only — it is NOT a security
 * boundary. The server enforces the actual paywall via requireEntitlement().
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export type Feature =
  | "lessons_free"
  | "anatomy_labeling"
  | "concept_checks"
  | "pre_nursing_foundations"
  | "lessons_rpn"
  | "lessons_rn"
  | "lessons_np"
  | "lessons_critical_care"
  | "lessons_emergency"
  | "lessons_pediatric"
  | "lessons_picu"
  | "lessons_nicu"
  | "lessons_obstetrics"
  | "lessons_oncology"
  | "lessons_palliative"
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

export type SpecialtyRole =
  | "critical_care_rn"
  | "emergency_rn"
  | "pediatric_rn"
  | "picu_rn"
  | "nicu_rn"
  | "obstetrics_rn"
  | "oncology_rn"
  | "palliative_rn";

export const SPECIALTY_ROLES: SpecialtyRole[] = [
  "critical_care_rn",
  "emergency_rn",
  "pediatric_rn",
  "picu_rn",
  "nicu_rn",
  "obstetrics_rn",
  "oncology_rn",
  "palliative_rn",
];

export const SPECIALTY_LABELS: Record<SpecialtyRole, string> = {
  critical_care_rn: "Critical Care (CCRN)",
  emergency_rn: "Emergency (CEN)",
  pediatric_rn: "Pediatric (CPN)",
  picu_rn: "Pediatric ICU (CCRN-P)",
  nicu_rn: "Neonatal ICU (RNC-NIC)",
  obstetrics_rn: "Obstetrics (RNC-OB)",
  oncology_rn: "Oncology (OCN)",
  palliative_rn: "Palliative Care (CHPN)",
};

export const SPECIALTY_FEATURE_MAP: Record<SpecialtyRole, Feature> = {
  critical_care_rn: "lessons_critical_care",
  emergency_rn: "lessons_emergency",
  pediatric_rn: "lessons_pediatric",
  picu_rn: "lessons_picu",
  nicu_rn: "lessons_nicu",
  obstetrics_rn: "lessons_obstetrics",
  oncology_rn: "lessons_oncology",
  palliative_rn: "lessons_palliative",
};

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
  lessons_critical_care: "rn",
  lessons_emergency: "rn",
  lessons_pediatric: "rn",
  lessons_picu: "rn",
  lessons_nicu: "rn",
  lessons_obstetrics: "rn",
  lessons_oncology: "rn",
  lessons_palliative: "rn",
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
  lessons_critical_care: "Upgrade to unlock Critical Care certification prep content.",
  lessons_emergency: "Upgrade to unlock Emergency nursing certification prep content.",
  lessons_pediatric: "Upgrade to unlock Pediatric nursing certification prep content.",
  lessons_picu: "Upgrade to unlock Pediatric ICU certification prep content.",
  lessons_nicu: "Upgrade to unlock Neonatal ICU certification prep content.",
  lessons_obstetrics: "Upgrade to unlock Obstetric nursing certification prep content.",
  lessons_oncology: "Upgrade to unlock Oncology nursing certification prep content.",
  lessons_palliative: "Upgrade to unlock Palliative Care certification prep content.",
};

export function canAccessFeature(userTier: string | null | undefined, feature: Feature): boolean {
  const requiredTier = FEATURE_TIERS[feature];
  if (!requiredTier || requiredTier === "free") return true;
  if (!userTier || userTier === "free") return false;
  if (userTier === "admin") return true;
  if (SPECIALTY_ROLES.includes(userTier as SpecialtyRole)) {
    const specialtyFeature = SPECIALTY_FEATURE_MAP[userTier as SpecialtyRole];
    if (feature === specialtyFeature) return true;
    const userLevel = TIER_HIERARCHY["rn"];
    const requiredLevel = TIER_HIERARCHY[requiredTier] ?? 0;
    return userLevel >= requiredLevel;
  }
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

export function isSpecialtyRole(role: string): role is SpecialtyRole {
  return SPECIALTY_ROLES.includes(role as SpecialtyRole);
}

export const FEATURE_LABELS: Record<Feature, string> = {
  lessons_free: "Free Lessons",
  anatomy_labeling: "Interactive Anatomy",
  concept_checks: "Concept Checks",
  pre_nursing_foundations: "Pre-Nursing Foundations",
  lessons_rpn: "RPN/LVN Lessons",
  lessons_rn: "RN Lessons",
  lessons_np: "NP Lessons",
  lessons_critical_care: "Critical Care Lessons",
  lessons_emergency: "Emergency Nursing Lessons",
  lessons_pediatric: "Pediatric Nursing Lessons",
  lessons_picu: "Pediatric ICU Lessons",
  lessons_nicu: "Neonatal ICU Lessons",
  lessons_obstetrics: "Obstetric Nursing Lessons",
  lessons_oncology: "Oncology Nursing Lessons",
  lessons_palliative: "Palliative Care Lessons",
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
