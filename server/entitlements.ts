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
 *   - resolveEntitlement(userId, productType, productId) — Full normalized decision
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
import type { AccessSource, EntitlementDecisionObject } from "@shared/schema";

const PROVISIONAL_GRACE_WINDOW_MS = 15 * 60 * 1000;

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
  | "flashcard_review"
  | "newgrad_toolkit"
  | "newgrad_cert_prep"
  | "newgrad_full_qbank"
  | "newgrad_mock_exams"
  | "newgrad_flashcards"
  | "newgrad_brain_sheets"
  | "newgrad_shift_templates"
  | "newgrad_documentation_cheats"
  | "newgrad_med_safety"
  | "newgrad_unit_onboarding"
  | "newgrad_full_interview_bank"
  | "newgrad_premium_templates"
  | "rrt_pharmacology"
  | "ai_tutor";

export type Tier = "free" | "rpn" | "rn" | "np" | "newgrad" | "new_grad_toolkit" | "certification_prep" | "full_access" | "admin";

const TIER_HIERARCHY: Record<string, number> = {
  free: 0,
  rpn: 1,
  rn: 2,
  np: 3,
  admin: 4,
};

const PAID_TIERS = new Set(["rpn", "rn", "np", "newgrad", "new_grad_toolkit", "certification_prep", "full_access", "admin"]);

const NEWGRAD_TOOLKIT_FEATURES = new Set<Feature>([
  "newgrad_toolkit",
  "newgrad_brain_sheets",
  "newgrad_shift_templates",
  "newgrad_documentation_cheats",
  "newgrad_med_safety",
  "newgrad_unit_onboarding",
  "newgrad_full_interview_bank",
  "newgrad_premium_templates",
]);

const NEWGRAD_CERT_PREP_FEATURES = new Set<Feature>([
  "newgrad_cert_prep",
  "newgrad_full_qbank",
  "newgrad_mock_exams",
  "newgrad_flashcards",
]);

export const FEATURE_TIERS: Record<Feature, Tier> = {
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
  newgrad_toolkit: "new_grad_toolkit",
  newgrad_brain_sheets: "new_grad_toolkit",
  newgrad_shift_templates: "new_grad_toolkit",
  newgrad_documentation_cheats: "new_grad_toolkit",
  newgrad_med_safety: "new_grad_toolkit",
  newgrad_unit_onboarding: "new_grad_toolkit",
  newgrad_full_interview_bank: "new_grad_toolkit",
  newgrad_premium_templates: "new_grad_toolkit",
  rrt_pharmacology: "rpn",
  ai_tutor: "free",
  newgrad_cert_prep: "certification_prep",
  newgrad_full_qbank: "certification_prep",
  newgrad_mock_exams: "certification_prep",
  newgrad_flashcards: "certification_prep",
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

function getTrialExpiry(user: any): string | null {
  const trialEnd = user.trial_end || user.trialEnd || user.trial_expires_at || user.trialExpiresAt;
  return trialEnd ? new Date(trialEnd).toISOString() : null;
}

function getTesterExpiry(user: any): string | null {
  const expiry = user.tester_expiry || user.testerExpiry;
  return expiry ? new Date(expiry).toISOString() : null;
}

function normalizeNewGradTier(tier: string): string {
  return tier === "newgrad" ? "new_grad_toolkit" : tier;
}

function hasNewGradFeatureAccess(userTier: string, feature: Feature): boolean {
  const effective = normalizeNewGradTier(userTier);
  if (effective === "full_access") return true;
  if (effective === "certification_prep") {
    return NEWGRAD_TOOLKIT_FEATURES.has(feature) || NEWGRAD_CERT_PREP_FEATURES.has(feature);
  }
  if (effective === "new_grad_toolkit") {
    return NEWGRAD_TOOLKIT_FEATURES.has(feature);
  }
  return false;
}

function buildDefaultDecision(productType: string, productId: string | null): EntitlementDecisionObject {
  return {
    hasAccess: false,
    accessSource: "none",
    planId: null,
    productType,
    productId,
    locale: null,
    fallbackEligible: false,
    backupModesAvailable: [],
    lastVerifiedContentVersion: null,
    substituteEligible: false,
    expiresAt: null,
    accessDecisionReason: "no_access",
    provisional: false,
  };
}

function determineAccessSource(user: any): { source: AccessSource; reason: string; expiresAt: string | null } {
  const userTier: string = user.tier || "free";

  if (userTier === "admin") {
    return { source: "admin_override", reason: "admin_tier", expiresAt: null };
  }

  if (isActiveTester(user)) {
    return { source: "tester", reason: "active_tester", expiresAt: getTesterExpiry(user) };
  }

  if (hasActiveTrialAccess(user)) {
    return { source: "trial", reason: "active_trial", expiresAt: getTrialExpiry(user) };
  }

  if (user.is_lifetime || user.isLifetime) {
    return { source: "one_time_purchase", reason: "lifetime_purchase", expiresAt: null };
  }

  if (PAID_TIERS.has(userTier)) {
    const planExpiry = user.plan_expires_at || user.planExpiresAt;
    return {
      source: "subscription",
      reason: `active_subscription_${userTier}`,
      expiresAt: planExpiry ? new Date(planExpiry).toISOString() : null,
    };
  }

  return { source: "free", reason: "free_tier", expiresAt: null };
}

export function resolveEntitlementSync(user: any, productType: string, productId: string | null = null): EntitlementDecisionObject {
  const decision = buildDefaultDecision(productType, productId);

  if (!user) {
    decision.accessDecisionReason = "not_authenticated";
    return decision;
  }

  const userTier: string = user.tier || "free";
  const { source, reason, expiresAt } = determineAccessSource(user);
  decision.accessSource = source;
  decision.expiresAt = expiresAt;
  decision.planId = user.stripe_subscription_id || user.stripeSubscriptionId || null;
  decision.locale = user.region || null;

  if (productType === "feature" && productId) {
    const feature = productId as Feature;
    const requiredTier = FEATURE_TIERS[feature];

    if (!requiredTier || requiredTier === "free") {
      decision.hasAccess = true;
      decision.accessSource = "free";
      decision.accessDecisionReason = "free_feature";
      return decision;
    }

    if (requiredTier === "admin") {
      if (userTier === "admin") {
        decision.hasAccess = true;
        decision.accessDecisionReason = "admin_tier";
        return decision;
      }
      decision.hasAccess = false;
      decision.accessDecisionReason = "admin_only";
      decision.fallbackEligible = false;
      return decision;
    }

    if (userTier === "admin") {
      decision.hasAccess = true;
      decision.accessDecisionReason = "admin_tier";
      return decision;
    }

    if (isActiveTester(user)) {
      decision.hasAccess = true;
      decision.accessSource = "tester";
      decision.accessDecisionReason = "tester_bypass";
      return decision;
    }

    if (hasActiveTrialAccess(user)) {
      decision.hasAccess = true;
      decision.accessSource = "trial";
      decision.accessDecisionReason = "trial_access";
      decision.expiresAt = getTrialExpiry(user);
      return decision;
    }

    if (user.is_lifetime || user.isLifetime) {
      decision.hasAccess = true;
      decision.accessSource = "one_time_purchase";
      decision.accessDecisionReason = "lifetime_purchase";
      return decision;
    }

    if (NEWGRAD_TOOLKIT_FEATURES.has(feature) || NEWGRAD_CERT_PREP_FEATURES.has(feature)) {
      if (hasNewGradFeatureAccess(userTier, feature)) {
        decision.hasAccess = true;
        decision.accessDecisionReason = `tier_${userTier}`;
        return decision;
      }
      decision.hasAccess = false;
      decision.accessDecisionReason = `requires_${requiredTier}`;
      decision.fallbackEligible = true;
      decision.substituteEligible = true;
      return decision;
    }

    const userLevel = TIER_HIERARCHY[userTier] ?? 0;
    const requiredLevel = TIER_HIERARCHY[requiredTier] ?? 0;
    if (userLevel >= requiredLevel) {
      decision.hasAccess = true;
      decision.accessDecisionReason = `tier_${userTier}`;
      return decision;
    }

    decision.hasAccess = false;
    decision.accessDecisionReason = `requires_${requiredTier}`;
    decision.fallbackEligible = true;
    decision.substituteEligible = true;
    return decision;
  }

  if (productType === "any_premium") {
    if (userTier === "admin" || PAID_TIERS.has(userTier) || isActiveTester(user) || hasActiveTrialAccess(user) || user.is_lifetime || user.isLifetime) {
      decision.hasAccess = true;
      decision.accessDecisionReason = reason;
      return decision;
    }
    decision.hasAccess = false;
    decision.accessDecisionReason = "requires_paid_tier";
    decision.fallbackEligible = true;
    return decision;
  }

  decision.accessDecisionReason = reason;
  decision.hasAccess = source !== "free" && source !== "none";
  return decision;
}

async function getCachedEntitlement(userId: string, productType: string, productId: string | null): Promise<EntitlementDecisionObject | null> {
  try {
    const result = await pool.query(
      `SELECT * FROM entitlement_cache 
       WHERE user_id = $1 AND product_type = $2 AND ($3::text IS NULL OR product_id = $3)
       AND verified_at > NOW() - INTERVAL '${PROVISIONAL_GRACE_WINDOW_MS / 1000} seconds'
       ORDER BY verified_at DESC LIMIT 1`,
      [userId, productType, productId]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      hasAccess: row.has_access,
      accessSource: row.access_source as AccessSource,
      planId: row.plan_id,
      productType: row.product_type,
      productId: row.product_id,
      locale: null,
      fallbackEligible: false,
      backupModesAvailable: [],
      lastVerifiedContentVersion: null,
      substituteEligible: false,
      expiresAt: row.expires_at ? new Date(row.expires_at).toISOString() : null,
      accessDecisionReason: row.decision_reason || "cached_entitlement",
      provisional: true,
    };
  } catch {
    return null;
  }
}

async function cacheEntitlementDecision(userId: string, decision: EntitlementDecisionObject): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO entitlement_cache (id, user_id, product_type, product_id, has_access, access_source, plan_id, tier, expires_at, decision_reason, verified_at, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
       ON CONFLICT DO NOTHING`,
      [
        userId,
        decision.productType,
        decision.productId,
        decision.hasAccess,
        decision.accessSource,
        decision.planId,
        null,
        decision.expiresAt ? new Date(decision.expiresAt) : null,
        decision.accessDecisionReason,
      ]
    );
  } catch {}
}

async function logProvisionalAccess(userId: string, decision: EntitlementDecisionObject, requestPath?: string): Promise<void> {
  console.warn(`[EntitlementProvisional] ${JSON.stringify({
    timestamp: new Date().toISOString(),
    userId,
    productType: decision.productType,
    productId: decision.productId,
    hasAccess: decision.hasAccess,
    accessSource: decision.accessSource,
    reason: decision.accessDecisionReason,
    provisional: true,
    requestPath: requestPath || null,
  })}`);

  try {
    await pool.query(
      `INSERT INTO entitlement_decisions (id, user_id, product_type, product_id, has_access, access_source, provisional, decision_reason, request_path, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, true, $6, $7, NOW())`,
      [userId, decision.productType, decision.productId, decision.hasAccess, decision.accessSource, decision.accessDecisionReason, requestPath || null]
    );
  } catch {}
}

export async function resolveEntitlement(
  userId: string,
  productType: string,
  productId: string | null = null,
  requestPath?: string,
): Promise<EntitlementDecisionObject> {
  let user: any = null;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    user = result.rows[0] || null;
  } catch {
    const cached = await getCachedEntitlement(userId, productType, productId);
    if (cached) {
      await logProvisionalAccess(userId, cached, requestPath);
      return cached;
    }
    const decision = buildDefaultDecision(productType, productId);
    decision.accessDecisionReason = "database_unavailable";
    return decision;
  }

  if (!user) {
    return buildDefaultDecision(productType, productId);
  }

  const decision = resolveEntitlementSync(user, productType, productId);

  if (!decision.hasAccess) {
    try {
      const { hasProvisionalAccess, isEmergencyMode } = await import("./platform-resilience");
      if (hasProvisionalAccess(userId) || isEmergencyMode()) {
        const cached = await getCachedEntitlement(userId, productType, productId);
        if (cached && cached.hasAccess) {
          cached.provisional = true;
          cached.accessDecisionReason = "provisional_grace_window";
          await logProvisionalAccess(userId, cached, requestPath);
          return cached;
        }
        if (isEmergencyMode()) {
          decision.hasAccess = true;
          decision.provisional = true;
          decision.accessDecisionReason = "emergency_mode_override";
          await logProvisionalAccess(userId, decision, requestPath);
          return decision;
        }
      }
    } catch {}
  }

  if (decision.hasAccess) {
    cacheEntitlementDecision(userId, decision).catch(() => {});
  }

  logEntitlementDecision(userId, decision, requestPath);

  return decision;
}

function logEntitlementDecision(userId: string, decision: EntitlementDecisionObject, requestPath?: string): void {
  console.log(`[EntitlementDecision] ${JSON.stringify({
    timestamp: new Date().toISOString(),
    userId,
    productType: decision.productType,
    productId: decision.productId,
    hasAccess: decision.hasAccess,
    accessSource: decision.accessSource,
    reason: decision.accessDecisionReason,
    provisional: decision.provisional,
    requestPath: requestPath || null,
  })}`);
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

  if (NEWGRAD_TOOLKIT_FEATURES.has(feature) || NEWGRAD_CERT_PREP_FEATURES.has(feature)) {
    return hasNewGradFeatureAccess(userTier, feature);
  }

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

    const feat = feature as Feature;
    if (NEWGRAD_TOOLKIT_FEATURES.has(feat) || NEWGRAD_CERT_PREP_FEATURES.has(feat)) {
      if (hasNewGradFeatureAccess(userTier, feat)) {
        result[feature] = { allowed: true, reason: `tier_${userTier}` };
      } else {
        result[feature] = { allowed: false, reason: `requires_${requiredTier}` };
      }
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

    const decision = await resolveEntitlement(user.id, "feature", feature, req.path);
    (req as any).entitlement = decision;
    (req as any).authUser = user;

    if (!decision.hasAccess) {
      try {
        const { hasProvisionalAccess, isEmergencyMode } = await import("./platform-resilience");
        if (hasProvisionalAccess(user.id) || isEmergencyMode()) {
          logPaywallAccess(req.path, user, feature, true, decision);
          (req as any).provisionalAccess = true;
          return next();
        }
        const { checkAndGrantProvisionalAccess } = await import("./backend-resilience");
        const provisionalResult = await checkAndGrantProvisionalAccess(user.id);
        if (provisionalResult.granted) {
          logPaywallAccess(req.path, user, feature, true, decision);
          (req as any).provisionalAccess = true;
          return next();
        }
      } catch {}
      logPaywallAccess(req.path, user, feature, false, decision);
      return res.status(403).json({
        error: "Premium feature - upgrade required",
        upgradeRequired: true,
        feature,
        requiredTier: FEATURE_TIERS[feature],
      });
    }

    logPaywallAccess(req.path, user, feature, true, decision);
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

    const decision = await resolveEntitlement(user.id, "any_premium", null, req.path);
    (req as any).entitlement = decision;
    (req as any).authUser = user;

    if (!decision.hasAccess) {
      try {
        const { hasProvisionalAccess, isEmergencyMode } = await import("./platform-resilience");
        if (hasProvisionalAccess(user.id) || isEmergencyMode()) {
          (req as any).provisionalAccess = true;
          return next();
        }
        const { checkAndGrantProvisionalAccess } = await import("./backend-resilience");
        const provisionalResult = await checkAndGrantProvisionalAccess(user.id);
        if (provisionalResult.granted) {
          (req as any).provisionalAccess = true;
          return next();
        }
      } catch {}
      return res.status(403).json({
        error: "Premium feature - upgrade required",
        upgradeRequired: true,
      });
    }

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

function logPaywallAccess(path: string, user: any, feature: string, granted: boolean, decision?: EntitlementDecisionObject): void {
  let safePath = path;
  try {
    const qIdx = safePath.indexOf("?");
    if (qIdx >= 0) safePath = safePath.substring(0, qIdx);
  } catch {}
  console.log(`[PaywallAudit] ${JSON.stringify({
    timestamp: new Date().toISOString(),
    userId: user?.id || "unknown",
    tier: user?.tier || "free",
    feature,
    resourcePath: safePath,
    accessGranted: granted,
    accessSource: decision?.accessSource || null,
    provisional: decision?.provisional || false,
    reason: decision?.accessDecisionReason || null,
  })}`);
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

export async function handleEntitlementResolve(req: any, res: any): Promise<void> {
  const user = await resolveAuthUser(req);
  if (!user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const productType = String(req.query.productType || req.body?.productType || "feature");
  const productId = String(req.query.productId || req.body?.productId || "") || null;

  const decision = await resolveEntitlement(user.id, productType, productId, req.path);
  res.json(decision);
}

export { hasActiveTrialAccess, PAID_TIERS };
