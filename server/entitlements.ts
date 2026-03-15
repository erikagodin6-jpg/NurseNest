/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SERVER-SIDE ENTITLEMENT SYSTEM — SOURCE OF TRUTH
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ALL premium access decisions on the server MUST go through this module.
 *
 * DO NOT add inline tier checks in route handlers. Instead use:
 *   - requireEntitlement("featureKey")  — Express middleware, returns 403 if denied
 *   - requireAnyPremium()               — Express middleware, requires any paid tier
 *   - getUserEntitlements(user)          — Compute full entitlement map for a user
 *   - checkEntitlement(user, feature)   — Boolean check for a single feature
 *
 * Admin users always have full access.
 * Active testers (tester_access=true, non-expired) get premium access.
 * Trial users get premium access within their trial window.
 *
 * WARNING: Bypassing this module risks breaking the paywall. Any change to
 * access logic must be reviewed carefully and tested against the entitlement
 * test suite in server/__tests__/entitlements.test.ts.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { resolveAuthUser } from "./admin-auth";
import { pool } from "./storage";
import type { Request, Response, NextFunction } from "express";

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
  | "ai_study_coach"
  | "mock_exams"
  | "study_sessions"
  | "study_plan"
  | "study_groups"
  | "flashcard_bank"
  | "flashcard_review";

export type Tier = "free" | "rpn" | "rn" | "np" | "admin";

const TIER_HIERARCHY: Record<string, number> = {
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
  mock_exams: "rpn",
  study_sessions: "rpn",
  study_plan: "rpn",
  study_groups: "rpn",
  flashcard_bank: "rpn",
  flashcard_review: "rpn",
};

export function isActiveTester(user: any): boolean {
  if (!user) return false;
  const hasTesterAccess = user.tester_access || user.testerAccess;
  if (!hasTesterAccess) return false;
  const expiry = user.tester_expiry || user.testerExpiry;
  if (expiry && new Date(expiry) < new Date()) return false;
  return true;
}

function hasActiveTrialAccess(user: any): boolean {
  if (!user) return false;
  const trialActive = user.trial_active || user.trialActive;
  if (!trialActive) return false;
  const trialEnd = user.trial_end || user.trialEnd || user.trial_expires_at || user.trialExpiresAt;
  if (trialEnd && new Date(trialEnd) < new Date()) return false;
  return true;
}

export function checkEntitlement(user: any, feature: Feature): boolean {
  if (!user) return false;

  const userTier: string = user.tier || "free";

  if (userTier === "admin") return true;

  const requiredTier = FEATURE_TIERS[feature];
  if (!requiredTier || requiredTier === "free") return true;

  if (requiredTier === "admin") return false;

  if (isActiveTester(user)) return true;
  if (hasActiveTrialAccess(user)) return true;

  const userLevel = TIER_HIERARCHY[userTier] ?? 0;
  const requiredLevel = TIER_HIERARCHY[requiredTier] ?? 0;
  return userLevel >= requiredLevel;
}

export function getUserEntitlements(user: any): Record<Feature, { allowed: boolean; reason: string }> {
  const result: Record<string, { allowed: boolean; reason: string }> = {};
  const userTier = user?.tier || "free";
  const isTester = isActiveTester(user);
  const hasTrial = hasActiveTrialAccess(user);

  for (const [feature, requiredTier] of Object.entries(FEATURE_TIERS)) {
    if (!user) {
      result[feature] = { allowed: false, reason: "not_authenticated" };
      continue;
    }
    if (userTier === "admin") {
      result[feature] = { allowed: true, reason: "admin" };
      continue;
    }
    if (requiredTier === "free") {
      result[feature] = { allowed: true, reason: "free_feature" };
      continue;
    }
    if (requiredTier === "admin") {
      result[feature] = { allowed: false, reason: "admin_only" };
      continue;
    }
    if (isTester) {
      result[feature] = { allowed: true, reason: "tester_bypass" };
      continue;
    }
    if (hasTrial) {
      result[feature] = { allowed: true, reason: "trial_access" };
      continue;
    }
    const userLevel = TIER_HIERARCHY[userTier] ?? 0;
    const requiredLevel = TIER_HIERARCHY[requiredTier] ?? 0;
    if (userLevel >= requiredLevel) {
      result[feature] = { allowed: true, reason: `tier_${userTier}` };
    } else {
      result[feature] = { allowed: false, reason: `requires_${requiredTier}` };
    }
  }

  return result as Record<Feature, { allowed: boolean; reason: string }>;
}

export function logEntitlementWarning(routePath: string, userId: string | null, feature: string): void {
  console.warn(
    `[EntitlementWarning] Route "${routePath}" attempted to serve premium content (feature: ${feature}) without a resolved entitlement object. User ID: ${userId || "unknown"}`
  );
}

export function requireEntitlement(feature: Feature) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await resolveAuthUser(req as any);
    if (!user) {
      logEntitlementWarning(req.path, null, feature);
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!checkEntitlement(user, feature)) {
      return res.status(403).json({
        error: "Premium feature - upgrade required",
        upgradeRequired: true,
        feature,
        requiredTier: FEATURE_TIERS[feature],
      });
    }

    (req as any).authUser = user;
    next();
  };
}

export function requireAnyPremium() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await resolveAuthUser(req as any);
    if (!user) {
      logEntitlementWarning(req.path, null, "any_premium");
      return res.status(401).json({ error: "Authentication required" });
    }

    const userTier = user.tier || "free";
    const paidTiers = new Set(["rpn", "rn", "np", "admin"]);

    if (!paidTiers.has(userTier) && !isActiveTester(user) && !hasActiveTrialAccess(user)) {
      return res.status(403).json({
        error: "Premium feature - upgrade required",
        upgradeRequired: true,
      });
    }

    (req as any).authUser = user;
    next();
  };
}

export function requireAuthenticated() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await resolveAuthUser(req as any);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    (req as any).authUser = user;
    next();
  };
}

export async function handleEntitlementDebug(req: any, res: any): Promise<void> {
  const user = await resolveAuthUser(req);
  if (!user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  if (user.tier !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  let targetUser = user;
  const targetUserId = req.query.userId as string;
  if (targetUserId && targetUserId !== user.id) {
    const r = await pool.query("SELECT * FROM users WHERE id = $1", [targetUserId]);
    if (r.rows[0]) {
      targetUser = r.rows[0];
    } else {
      res.status(404).json({ error: "Target user not found" });
      return;
    }
  }

  const entitlements = getUserEntitlements(targetUser);

  let subscriptionStatus = "none";
  try {
    const subResult = await pool.query(
      "SELECT status FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1",
      [targetUser.id]
    );
    if (subResult.rows[0]) {
      subscriptionStatus = subResult.rows[0].status;
    }
  } catch {
    subscriptionStatus = "unknown";
  }

  res.json({
    userId: targetUser.id,
    username: targetUser.username,
    role: targetUser.tier || "free",
    subscriptionTier: targetUser.tier || "free",
    subscriptionStatus,
    isTester: isActiveTester(targetUser),
    testerExpiry: targetUser.tester_expiry || targetUser.testerExpiry || null,
    hasTrialAccess: hasActiveTrialAccess(targetUser),
    trialEnd: targetUser.trial_end || targetUser.trialEnd || targetUser.trial_expires_at || null,
    entitlements,
  });
}
