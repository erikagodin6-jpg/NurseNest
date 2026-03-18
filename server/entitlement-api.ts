import { Router } from "express";
import { pool } from "./storage";
import { resolveAuthUser, requireAdmin } from "./admin-auth";
import { getUserEntitlements, resolveEntitlementSync, FEATURE_TIERS, isActiveTester, PAID_TIERS, determineAccessSource as centralDetermineAccessSource } from "./entitlements";
import {
  getSubscriptionsByUserId, getActiveSubscription,
  getWebhookEventsByUserId, getEntitlementEventsByUserId,
  findDuplicateAccounts, findPotentialDuplicates,
  emitEntitlementEvent, upsertSubscription,
  normalizeEmail,
} from "./subscription-sync";
import type { Feature, Tier } from "./entitlements";

const router = Router();

router.get("/api/me/entitlements", async (req, res) => {
  try {
    const user = await resolveAuthUser(req as any);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const subscription = await getActiveSubscription(user.id);

    const canonicalTier = subscription?.tier || user.tier || "free";
    const canonicalStatus = subscription?.status || user.subscription_status || user.subscriptionStatus || "inactive";

    const effectiveUser = { ...user };
    if (subscription && (subscription.status === "active" || subscription.status === "trialing")) {
      if (subscription.tier && subscription.tier !== "free") {
        effectiveUser.tier = subscription.tier;
      }
    }

    const entitlements = getUserEntitlements(effectiveUser);
    const accessInfo = centralDetermineAccessSource(effectiveUser);

    const featureFlags: Record<string, boolean> = {};
    for (const [feature, info] of Object.entries(entitlements)) {
      featureFlags[feature] = info.allowed;
    }

    const isPremiumByResolver = Object.values(entitlements).some(e => e.allowed && e.reason !== "free_feature");

    const canAccessPremiumQuestions = featureFlags["qbank"] || false;
    const canAccessFlashcards = featureFlags["flashcards"] || false;
    const canAccessAI = featureFlags["ai_study_coach"] || false;
    const canAccessMockExams = featureFlags["mock_exams"] || false;

    res.json({
      userId: user.id,
      tier: canonicalTier,
      subscriptionStatus: canonicalStatus,
      isPremium: isPremiumByResolver || accessInfo.source !== "free",
      accessSource: accessInfo.source,
      expiresAt: accessInfo.expiresAt,
      gracePeriodActive: !!subscription?.grace_period_until && new Date(subscription.grace_period_until) > new Date(),
      gracePeriodUntil: subscription?.grace_period_until || null,
      isLifetime: subscription?.is_lifetime || user.is_lifetime || user.isLifetime || false,
      isTester: isActiveTester(effectiveUser),
      isTrialing: accessInfo.source === "trial",
      verifiedAt: new Date().toISOString(),
      features: featureFlags,
      gating: {
        canAccessPremiumQuestions,
        canAccessFlashcards,
        canAccessAI,
        canAccessMockExams,
      },
      subscription: subscription ? {
        id: subscription.id,
        stripeSubscriptionId: subscription.stripe_subscription_id,
        tier: subscription.tier,
        status: subscription.status,
        billingInterval: subscription.billing_interval,
        activeFrom: subscription.active_from,
        expiresAt: subscription.expires_at,
        renewsAt: subscription.renews_at,
        isLifetime: subscription.is_lifetime,
      } : null,
    });
  } catch (e: any) {
    console.error("[EntitlementAPI] /api/me/entitlements error:", e.message);
    res.status(500).json({ error: "Failed to resolve entitlements" });
  }
});

router.get("/api/me/subscription", async (req, res) => {
  try {
    const user = await resolveAuthUser(req as any);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const subscriptions = await getSubscriptionsByUserId(user.id);
    const active = subscriptions.find(s => s.status === "active" || s.status === "trialing") || null;

    res.json({
      userId: user.id,
      currentSubscription: active ? {
        id: active.id,
        stripeSubscriptionId: active.stripe_subscription_id,
        planId: active.plan_id,
        planName: active.plan_name,
        tier: active.tier,
        billingInterval: active.billing_interval,
        status: active.status,
        purchaseSource: active.purchase_source,
        activeFrom: active.active_from,
        expiresAt: active.expires_at,
        renewsAt: active.renews_at,
        canceledAt: active.canceled_at,
        trialStart: active.trial_start,
        trialEnd: active.trial_end,
        gracePeriodUntil: active.grace_period_until,
        isLifetime: active.is_lifetime,
        currency: active.currency,
        lastVerifiedAt: active.last_verified_at,
      } : null,
      history: subscriptions.map(s => ({
        id: s.id,
        tier: s.tier,
        status: s.status,
        billingInterval: s.billing_interval,
        activeFrom: s.active_from,
        expiresAt: s.expires_at,
        canceledAt: s.canceled_at,
        isLifetime: s.is_lifetime,
        createdAt: s.created_at,
      })),
      userTier: user.tier || "free",
      stripeCustomerId: user.stripe_customer_id || user.stripeCustomerId || null,
      isLifetime: user.is_lifetime || user.isLifetime || false,
    });
  } catch (e: any) {
    console.error("[EntitlementAPI] /api/me/subscription error:", e.message);
    res.status(500).json({ error: "Failed to retrieve subscription" });
  }
});

router.post("/api/billing/refresh-entitlements", async (req, res) => {
  try {
    const user = await resolveAuthUser(req as any);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const stripeCustomerId = user.stripe_customer_id || user.stripeCustomerId;
    if (!stripeCustomerId) {
      return res.json({
        refreshed: false,
        reason: "no_stripe_customer",
        currentTier: user.tier || "free",
      });
    }

    let stripeSubscription: any = null;
    try {
      const { getUncachableStripeClient } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      const subs = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: "all",
        limit: 1,
      });
      stripeSubscription = subs.data[0] || null;
    } catch (e: any) {
      console.error("[BillingRefresh] Stripe lookup failed:", e.message);
      return res.status(503).json({ error: "Unable to reach billing provider" });
    }

    if (!stripeSubscription) {
      return res.json({
        refreshed: true,
        reason: "no_active_subscription",
        currentTier: user.tier || "free",
      });
    }

    const tier = stripeSubscription.metadata?.tier || user.tier || "free";
    const status = stripeSubscription.status;

    await upsertSubscription({
      userId: user.id,
      stripeSubscriptionId: stripeSubscription.id,
      stripeCustomerId,
      tier,
      status,
      billingInterval: stripeSubscription.items?.data?.[0]?.plan?.interval || null,
      renewsAt: stripeSubscription.current_period_end ? new Date(stripeSubscription.current_period_end * 1000) : null,
      expiresAt: stripeSubscription.current_period_end ? new Date(stripeSubscription.current_period_end * 1000) : null,
      canceledAt: stripeSubscription.canceled_at ? new Date(stripeSubscription.canceled_at * 1000) : null,
      currency: stripeSubscription.currency || "usd",
      amount: stripeSubscription.items?.data?.[0]?.plan?.amount || null,
    });

    if (status === "active" || status === "trialing") {
      const storage = (await import("./storage")).storage;
      const isAdmin = user.tier === "admin";
      await storage.updateUserStripeInfo(user.id, {
        stripeSubscriptionId: stripeSubscription.id,
        subscriptionStatus: "active",
        ...(isAdmin ? {} : { tier }),
      });
    }

    await emitEntitlementEvent(user.id, "access_restored", {
      tier,
      accessSource: "subscription",
      subscriptionId: stripeSubscription.id,
      metadata: { trigger: "user_refresh", stripeStatus: status },
    });

    const updatedUser = await pool.query("SELECT * FROM users WHERE id = $1", [user.id]);
    const refreshedEntitlements = getUserEntitlements(updatedUser.rows[0] || user);

    res.json({
      refreshed: true,
      currentTier: updatedUser.rows[0]?.tier || user.tier,
      stripeStatus: status,
      entitlements: refreshedEntitlements,
    });
  } catch (e: any) {
    console.error("[BillingRefresh] Error:", e.message);
    res.status(500).json({ error: "Failed to refresh entitlements" });
  }
});

router.post("/api/billing/restore-access", async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const { userId, tier, reason, hours } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (!user.rows[0]) return res.status(404).json({ error: "User not found" });

    const targetUser = user.rows[0];
    const previousTier = targetUser.tier;
    const targetTier = tier || previousTier || "rpn";
    const durationHours = hours || 24;

    const storage = (await import("./storage")).storage;
    const isAdmin = targetUser.tier === "admin";

    if (!isAdmin) {
      await storage.updateUserStripeInfo(userId, {
        subscriptionStatus: "active",
        tier: targetTier,
      });
    }

    const gracePeriodUntil = new Date(Date.now() + durationHours * 60 * 60 * 1000);

    await upsertSubscription({
      userId,
      tier: targetTier,
      status: "active",
      purchaseSource: "admin_restore",
      gracePeriodUntil,
      metadata: { restoredBy: admin.id || admin.username, reason: reason || "admin_restore" },
    });

    await emitEntitlementEvent(userId, "access_restored", {
      tier: targetTier,
      previousTier,
      accessSource: "admin_override",
      metadata: {
        restoredBy: admin.id || admin.username,
        reason: reason || "admin_restore",
        durationHours,
      },
    });

    try {
      await pool.query(
        `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, before_json, after_json, reason, severity, created_at)
         VALUES (gen_random_uuid(), $1, $2, 'user', $3, 'restore_access', $4, $5, $6, 'warning', NOW())`,
        [
          admin.id, admin.username, userId,
          JSON.stringify({ tier: previousTier }),
          JSON.stringify({ tier: targetTier, gracePeriodUntil }),
          reason || "admin_restore",
        ]
      );
    } catch {}

    res.json({
      restored: true,
      userId,
      tier: targetTier,
      previousTier,
      gracePeriodUntil,
      restoredBy: admin.username,
    });
  } catch (e: any) {
    console.error("[RestoreAccess] Error:", e.message);
    res.status(500).json({ error: "Failed to restore access" });
  }
});

router.get("/api/admin/subscription-history/:userId", async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const { userId } = req.params;
    const subscriptions = await getSubscriptionsByUserId(userId);
    const user = await pool.query("SELECT id, username, email, tier, subscription_status, stripe_customer_id, is_lifetime FROM users WHERE id = $1", [userId]);

    res.json({
      user: user.rows[0] || null,
      subscriptions,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/admin/webhook-history/:userId", async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const events = await getWebhookEventsByUserId(userId, limit);

    res.json({ userId, events });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/admin/entitlement-audit/:userId", async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const events = await getEntitlementEventsByUserId(userId, limit);

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    const entitlements = user.rows[0] ? getUserEntitlements(user.rows[0]) : {};

    res.json({
      userId,
      currentEntitlements: entitlements,
      auditTrail: events,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/admin/refresh-user-entitlements", async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (!user.rows[0]) return res.status(404).json({ error: "User not found" });

    const targetUser = user.rows[0];
    const stripeCustomerId = targetUser.stripe_customer_id;

    if (!stripeCustomerId) {
      return res.json({
        refreshed: false,
        reason: "no_stripe_customer",
        entitlements: getUserEntitlements(targetUser),
      });
    }

    let stripeSubscription: any = null;
    try {
      const { getUncachableStripeClient } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      const subs = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: "all",
        limit: 5,
      });
      stripeSubscription = subs.data.find((s: any) => s.status === "active" || s.status === "trialing") || subs.data[0] || null;
    } catch (e: any) {
      return res.status(503).json({ error: "Stripe lookup failed: " + e.message });
    }

    if (stripeSubscription) {
      const tier = stripeSubscription.metadata?.tier || targetUser.tier || "free";
      const status = stripeSubscription.status;

      await upsertSubscription({
        userId,
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId,
        tier,
        status,
        billingInterval: stripeSubscription.items?.data?.[0]?.plan?.interval || null,
        renewsAt: stripeSubscription.current_period_end ? new Date(stripeSubscription.current_period_end * 1000) : null,
        currency: stripeSubscription.currency || "usd",
      });

      const storage = (await import("./storage")).storage;
      const isAdmin = targetUser.tier === "admin";
      if ((status === "active" || status === "trialing") && !isAdmin) {
        await storage.updateUserStripeInfo(userId, {
          stripeSubscriptionId: stripeSubscription.id,
          subscriptionStatus: "active",
          tier,
        });
      }
    }

    await emitEntitlementEvent(userId, "access_restored", {
      tier: targetUser.tier,
      accessSource: "admin_override",
      metadata: { trigger: "admin_refresh", adminId: admin.id },
    });

    const refreshedUser = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    res.json({
      refreshed: true,
      user: {
        id: refreshedUser.rows[0]?.id,
        tier: refreshedUser.rows[0]?.tier,
        subscriptionStatus: refreshedUser.rows[0]?.subscription_status,
      },
      entitlements: getUserEntitlements(refreshedUser.rows[0] || targetUser),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/admin/grant-entitlement", async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const { userId, tier, hours, reason } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (!user.rows[0]) return res.status(404).json({ error: "User not found" });

    const targetUser = user.rows[0];
    const previousTier = targetUser.tier;
    const targetTier = tier || "rpn";
    const durationHours = hours || 24;

    const storage = (await import("./storage")).storage;
    const isAdmin = targetUser.tier === "admin";

    if (!isAdmin) {
      await storage.updateUserStripeInfo(userId, {
        subscriptionStatus: "active",
        tier: targetTier,
      });
    }

    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO provisional_access_grants (user_id, reason, expires_at, granted_by, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, reason || "admin_manual_grant", expiresAt, admin.username || admin.id, JSON.stringify({ tier: targetTier, hours: durationHours })]
    );

    await emitEntitlementEvent(userId, "manual_grant", {
      tier: targetTier,
      previousTier,
      accessSource: "admin_override",
      metadata: {
        grantedBy: admin.id || admin.username,
        reason: reason || "admin_manual_grant",
        durationHours,
        expiresAt: expiresAt.toISOString(),
      },
    });

    try {
      await pool.query(
        `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, before_json, after_json, reason, severity, created_at)
         VALUES (gen_random_uuid(), $1, $2, 'user', $3, 'manual_entitlement_grant', $4, $5, $6, 'warning', NOW())`,
        [
          admin.id, admin.username, userId,
          JSON.stringify({ tier: previousTier }),
          JSON.stringify({ tier: targetTier, expiresAt, durationHours }),
          reason || "admin_manual_grant",
        ]
      );
    } catch {}

    res.json({
      granted: true,
      userId,
      tier: targetTier,
      previousTier,
      expiresAt,
      grantedBy: admin.username,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/admin/duplicate-accounts", async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const email = req.query.email as string;

    if (email) {
      const duplicates = await findDuplicateAccounts(email);
      return res.json({ email, accounts: duplicates });
    }

    const allDuplicates = await findPotentialDuplicates();
    res.json({ duplicates: allDuplicates });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/admin/billing-profile/:userId", async (req, res) => {
  try {
    const admin = await requireAdmin(req as any, res);
    if (!admin) return;

    const userId = req.params.userId;
    const { storage } = await import("./storage");
    const user = await storage.getUser(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const subscriptions = await getSubscriptionsByUserId(userId);
    const activeSubscription = await getActiveSubscription(userId);
    const webhookEvents = await getWebhookEventsByUserId(userId, 20);
    const entitlementEvents = await getEntitlementEventsByUserId(userId, 20);

    const effectiveUser = { ...user };
    if (activeSubscription && (activeSubscription.status === "active" || activeSubscription.status === "trialing")) {
      if (activeSubscription.tier && activeSubscription.tier !== "free") {
        effectiveUser.tier = activeSubscription.tier;
      }
    }
    const entitlements = getUserEntitlements(effectiveUser);
    const featureFlags: Record<string, boolean> = {};
    for (const [feature, info] of Object.entries(entitlements)) {
      featureFlags[feature] = info.allowed;
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tier: user.tier,
        isLifetime: user.isLifetime,
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
        subscriptionStatus: user.subscriptionStatus,
        planExpiresAt: user.planExpiresAt,
      },
      currentPlan: activeSubscription ? {
        id: activeSubscription.id,
        tier: activeSubscription.tier,
        status: activeSubscription.status,
        purchaseSource: activeSubscription.purchase_source || activeSubscription.purchaseSource || "web",
        billingInterval: activeSubscription.billing_interval || activeSubscription.billingInterval,
        stripeSubscriptionId: activeSubscription.stripe_subscription_id || activeSubscription.stripeSubscriptionId,
        stripeCustomerId: activeSubscription.stripe_customer_id || activeSubscription.stripeCustomerId,
        isLifetime: activeSubscription.is_lifetime || activeSubscription.isLifetime || false,
        currency: activeSubscription.currency,
        amount: activeSubscription.amount,
        activeFrom: activeSubscription.active_from || activeSubscription.activeFrom,
        expiresAt: activeSubscription.expires_at || activeSubscription.expiresAt,
        renewsAt: activeSubscription.renews_at || activeSubscription.renewsAt,
        lastVerifiedAt: activeSubscription.last_verified_at || activeSubscription.lastVerifiedAt,
      } : null,
      entitlements: featureFlags,
      subscriptionHistory: subscriptions.map((s: any) => ({
        id: s.id,
        tier: s.tier,
        status: s.status,
        purchaseSource: s.purchase_source || s.purchaseSource || "web",
        billingInterval: s.billing_interval || s.billingInterval,
        isLifetime: s.is_lifetime || s.isLifetime || false,
        createdAt: s.created_at || s.createdAt,
        canceledAt: s.canceled_at || s.canceledAt,
      })),
      recentWebhookEvents: webhookEvents.slice(0, 10).map((e: any) => ({
        id: e.id,
        eventId: e.event_id || e.eventId,
        eventType: e.event_type || e.eventType,
        status: e.status,
        createdAt: e.created_at || e.createdAt,
      })),
      recentEntitlementEvents: entitlementEvents.slice(0, 10).map((e: any) => ({
        id: e.id,
        eventType: e.event_type || e.eventType,
        tier: e.tier,
        createdAt: e.created_at || e.createdAt,
      })),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
