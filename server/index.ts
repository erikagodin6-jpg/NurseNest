import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { SUPPORTED_LOCALES, SUPPORTED_LOCALES_SET } from "@shared/locales";
import path from "path";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { adminApiRateLimit, csrfProtection } from "./admin-auth";
import { registerNotificationRoutes } from "./notification-routes";
import { registerAlertingRoutes } from "./alerting-routes";
import { sendAdminNotification } from "./admin-notifications";
import { startAlertingEngine } from "./alerting-engine";
import { startSyntheticMonitoring } from "./synthetic-monitoring";
import { serveStatic } from "./static";

import { runMigrations } from "stripe-replit-sync";
import { getStripeSync } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";
import { storage } from "./storage";

const app = express();

// Trust proxy headers so req.hostname and req.protocol work behind
// reverse proxies (Replit, Cloudflare, load balancers, etc.).
// Using 1 = trust first proxy hop. Switch to true if protocol still wrong.
app.set("trust proxy", 1);

let appReady = false;
const APP_START_TIME = Date.now();
app.get("/healthz", async (_req, res) => {
  try {
    const { checkMemoryNow, getMemoryPressure, getActiveConnectionCount, getDetectedMemoryLimitMB } = await import("./memory-monitor");
    const memStatus = checkMemoryNow();
    const pressure = getMemoryPressure();
    let dbStatus: "healthy" | "degraded" | "down" = "down";
    let dbLatencyMs = 0;
    try {
      const dbStart = Date.now();
      const { pool: healthPool } = await import("./storage");
      await healthPool.query("SELECT 1");
      dbLatencyMs = Date.now() - dbStart;
      dbStatus = dbLatencyMs > 2000 ? "degraded" : "healthy";
    } catch { dbStatus = "down"; }

    let emergencyMode = false;
    let minimalCoreMode = false;
    try {
      const resilience = await import("./platform-resilience");
      emergencyMode = resilience.isEmergencyMode();
      minimalCoreMode = resilience.isMinimalCoreMode();
    } catch {}

    const overallStatus = dbStatus === "down" ? "unhealthy" : (pressure.isProtection || emergencyMode) ? "degraded" : "healthy";

    res.status(overallStatus === "unhealthy" ? 503 : 200).json({
      status: overallStatus,
      uptime: Math.round((Date.now() - APP_START_TIME) / 1000),
      memory: {
        rssMB: memStatus.rssMB,
        heapUsedMB: memStatus.heapUsedMB,
        heapTotalMB: memStatus.heapTotalMB,
        memoryLimitMB: memStatus.memoryLimitMB,
        usagePercent: memStatus.heapUsagePercent,
        pressureLevel: pressure.level,
      },
      database: { status: dbStatus, latencyMs: dbLatencyMs },
      activeConnections: getActiveConnectionCount(),
      modes: { emergency: emergencyMode, minimalCore: minimalCoreMode },
      appReady,
    });
  } catch (e: any) {
    res.status(500).json({ status: "unhealthy", error: e.message });
  }
});

app.get("/health", (req, res) => {
  res.redirect(301, "/healthz");
});

// Canonical host + HTTPS redirect middleware (production only).
// Handles:
//   nursenest.ca       -> 301 -> https://www.nursenest.ca (bare domain -> www)
//   http://www.*        -> 301 -> https://www.* (force HTTPS)
// Protections:
//   - Only runs in production; localhost/dev unaffected
//   - req.hostname strips port, avoiding "nursenest.ca:3000" false matches
//   - Skips hosts not in ALLOWED_HOSTS (staging, Replit preview, etc.)
//   - No redirect loops: only redirects when host or protocol needs fixing
//   - Preserves full path + query string via req.originalUrl
//   - Always 301 permanent for SEO canonicalization
const CANONICAL_HOST = "www.nursenest.ca";
const BARE_HOST = "nursenest.ca";
const ALLIED_HOST = "allied.nursenest.ca";
const ALLOWED_HOSTS = new Set([BARE_HOST, CANONICAL_HOST, ALLIED_HOST]);

import { alliedDetectionMiddleware, alliedLegacyRedirectMiddleware, hostRedirectMiddleware, isAlliedHost } from "./allied-middleware";
app.use(alliedDetectionMiddleware);
app.use(alliedLegacyRedirectMiddleware);
app.use(hostRedirectMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    const hostname = req.hostname;
    if (hostname === ALLIED_HOST) return next();
    if (!ALLOWED_HOSTS.has(hostname)) return next();

    const proto = req.protocol;
    const needsWww = hostname === BARE_HOST;
    const needsHttps = proto !== "https";

    if (!needsWww && !needsHttps) return next();

    const targetHost = needsWww ? CANONICAL_HOST : hostname;
    return res.redirect(301, `https://${targetHost}${req.originalUrl}`);
  });
}

app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  if (req.path.startsWith("/api") || req.path.startsWith("/assets") || /\.\w{2,5}($|\?)/.test(req.path)) {
    if (!req.path.endsWith("/index.html")) return next();
  }

  let cleanUrl = req.originalUrl;
  let needsRedirect = false;

  if (req.path.endsWith("/index.html")) {
    cleanUrl = cleanUrl.replace(/\/index\.html(\?|$)/, "/$1");
    needsRedirect = true;
  }

  const queryStart = cleanUrl.indexOf("?");
  let pathPart = queryStart >= 0 ? cleanUrl.substring(0, queryStart) : cleanUrl;
  const queryPart = queryStart >= 0 ? cleanUrl.substring(queryStart) : "";

  if (/\/\/+/.test(pathPart)) {
    pathPart = pathPart.replace(/\/\/+/g, "/");
    needsRedirect = true;
  }

  if (pathPart.length > 1 && pathPart.endsWith("/")) {
    pathPart = pathPart.replace(/\/+$/, "");
    needsRedirect = true;
  }

  const localeMatch = pathPart.match(/^\/(EN|FR|ES|FIL|HI|ZH|ZH-TW|AR|KO|PT|PA|VI|HT|UR|JA|FA|DE|TH|TR|ID)(\/|$)/i);
  if (localeMatch && localeMatch[1] !== localeMatch[1].toLowerCase()) {
    pathPart = "/" + localeMatch[1].toLowerCase() + pathPart.slice(localeMatch[1].length + 1);
    needsRedirect = true;
  }

  if (needsRedirect) {
    cleanUrl = pathPart + queryPart;
    return res.redirect(301, cleanUrl || "/");
  }
  next();
});

app.use((req, res, next) => {
  if (!appReady && req.path === "/" && req.method === "GET") {
    return res.status(200).send("<!DOCTYPE html><html><head><meta http-equiv='refresh' content='2'></head><body>Loading...</body></html>");
  }
  next();
});

app.use((req, res, next) => {
  if (req.path.endsWith("/index.html")) {
    let cleanUrl = req.originalUrl.replace(/\/index\.html/, "");
    if (!cleanUrl || cleanUrl === "" || cleanUrl === "?") cleanUrl = "/";
    cleanUrl = cleanUrl.replace(/\/(\?|#)/, "$1");
    if (cleanUrl !== "/" && cleanUrl.endsWith("/")) cleanUrl = cleanUrl.slice(0, -1);
    return res.redirect(301, cleanUrl);
  }
  next();
});

import { hasTimestampSuffix, stripTimestampSuffix } from "@shared/canonical-url";

const LEARN_REDIRECTS: Record<string, string> = {
  "oxygenation-vs-ventilation-critical-differences": "oxygenation-vs-ventilation-clinical-distinction",
  "create-more-posts-about-hyperkalemia": "hyperkalemia-nursing-guide",
  "test-publish-flow-1772145129698": "",
};

const LOCALE_PREFIX_RE = /^\/([a-z]{2,3}(?:-[a-z]{2,4})?)\//;

app.use((req, res, next) => {
  const learnMatch = req.path.match(/^(?:\/[a-z]{2,3}(?:-[a-z]{2,4})?)?\/learn\/([^/]+)\/?$/);
  if (learnMatch) {
    const slug = learnMatch[1];
    const localeMatch = req.path.match(LOCALE_PREFIX_RE);
    const locale = localeMatch ? localeMatch[1] : "";
    const localePrefix = locale ? `/${locale}` : "";

    if (slug in LEARN_REDIRECTS) {
      const target = LEARN_REDIRECTS[slug];
      if (target) {
        return res.redirect(301, `${localePrefix}/learn/${target}`);
      }
      return res.redirect(301, `${localePrefix}/blog`);
    }
    if (hasTimestampSuffix(slug)) {
      const baseSlug = stripTimestampSuffix(slug);
      if (baseSlug) {
        return res.redirect(301, `${localePrefix}/learn/${baseSlug}`);
      }
      return res.redirect(301, `${localePrefix}/blog`);
    }
  }

  const lessonMatch = req.path.match(/^(?:\/[a-z]{2,3}(?:-[a-z]{2,4})?)?\/lessons\/([^/]+)\/?$/);
  if (lessonMatch) {
    const slug = lessonMatch[1];
    if (hasTimestampSuffix(slug)) {
      const cleanSlug = stripTimestampSuffix(slug);
      const lessonLocaleMatch = req.path.match(LOCALE_PREFIX_RE);
      const localePrefix = lessonLocaleMatch ? `/${lessonLocaleMatch[1]}` : "";
      return res.redirect(301, `${localePrefix}/lessons/${cleanSlug}`);
    }
  }

  next();
});

const TIMESTAMP_SLUG_REGEX = /^(.*\/)([\w-]+)-(\d{13,})$/;
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  if (req.path.startsWith("/api") || req.path.startsWith("/assets")) return next();
  const tsMatch = req.path.match(TIMESTAMP_SLUG_REGEX);
  if (tsMatch) {
    const prefix = tsMatch[1];
    const baseSlug = tsMatch[2];
    const localeMatch = req.path.match(/^\/([a-z]{2,3}(?:-[a-z]{2})?)\//);
    const locale = localeMatch ? localeMatch[1] : "en";
    const cleanPath = prefix + baseSlug;
    const queryString = req.originalUrl.includes("?") ? req.originalUrl.substring(req.originalUrl.indexOf("?")) : "";
    const hasLocalePrefix = cleanPath.startsWith(`/${locale}/`);
    if (hasLocalePrefix) {
      return res.redirect(301, cleanPath + queryString);
    } else {
      return res.redirect(301, `/${locale}${cleanPath}${queryString}`);
    }
  }
  next();
});

import { CAREER_SLUG_TO_CANONICAL_ROUTE } from "@shared/careers";
app.use((req, res, next) => {
  const match = req.path.match(/^\/careers\/([^/]+)(\/.*)?$/);
  if (!match) return next();
  const slug = match[1];
  const rest = match[2] || "";
  const canonical = CAREER_SLUG_TO_CANONICAL_ROUTE[slug];
  if (canonical) {
    const query = req.originalUrl.includes("?") ? req.originalUrl.substring(req.originalUrl.indexOf("?")) : "";
    return res.redirect(301, `${canonical}${rest}${query}`);
  }
  next();
});

app.use(compression());
app.use(cookieParser());

import("./platform-resilience").then(({ emergencyModeMiddleware }) => {
  app.use(emergencyModeMiddleware);
}).catch(() => {});

app.use("/api/admin", adminApiRateLimit());
app.use("/api/admin", csrfProtection());

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  res.setHeader("Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com https://tagmanager.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: blob: https: http:; " +
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://region1.google-analytics.com https://api.stripe.com https://*.nursenest.ca https://*.replit.dev wss://*.replit.dev; " +
    "frame-src 'self' https://js.stripe.com https://www.googletagmanager.com; " +
    "media-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self' https://checkout.stripe.com; " +
    "frame-ancestors 'self'"
  );
  next();
});
const httpServer = createServer(app);

const port = parseInt(process.env.PORT || "5000", 10);
httpServer.keepAliveTimeout = 65000;
httpServer.headersTimeout = 66000;
httpServer.timeout = 30000;
httpServer.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
  log(`port ${port} open (health check ready, routes loading...)`);
});

// -------------------------
// Stripe init (sync + managed webhook)
// -------------------------
async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL required for Stripe");
    return;
  }

  try {
    console.log("Initializing Stripe schema...");
    await runMigrations({ databaseUrl } as any);
    console.log("Stripe schema ready");

    const stripeSync = await getStripeSync();

    console.log("Setting up managed webhook...");
    const domains = process.env.REPLIT_DOMAINS;

    if (domains) {
      const webhookBaseUrl = `https://${domains.split(",")[0]}`;
      try {
        const { webhook } = await stripeSync.findOrCreateManagedWebhook(
          `${webhookBaseUrl}/api/stripe/webhook`,
        );
        console.log(`Webhook configured: ${webhook?.url || "pending"}`);
      } catch (whErr: any) {
        console.log("Webhook setup deferred:", whErr?.message || whErr);
      }
    } else {
      console.log("REPLIT_DOMAINS not set, webhook setup deferred");
    }

    stripeSync
      .syncBackfill()
      .then(() => console.log("Stripe data synced"))
      .catch((err: any) => console.error("Error syncing Stripe data:", err));
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
  }
}

// -------------------------
// Stripe Webhook route (MUST be before express.json())
// -------------------------
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature) return res.status(400).json({ error: "Missing signature" });

    try {
      const sig = Array.isArray(signature) ? signature[0] : signature;

      if (!Buffer.isBuffer(req.body)) {
        console.error("STRIPE WEBHOOK ERROR: req.body is not a Buffer");
        return res.status(500).json({ error: "Webhook processing error" });
      }

      await WebhookHandlers.processWebhook(req.body as Buffer, sig);

      const bodyStr = req.body.toString("utf8");
      let evt: any;
      try { evt = JSON.parse(bodyStr); } catch { evt = null; }

      const { isWebhookProcessed, markWebhookProcessing, markWebhookProcessed, emitEntitlementEvent, upsertSubscription, isEventStale } = await import("./subscription-sync");

      if (evt?.id) {
        const alreadyProcessed = await isWebhookProcessed(evt.id);
        if (alreadyProcessed) {
          console.log(`[Webhook] Skipping duplicate event: ${evt.id} (${evt.type})`);
          return res.status(200).json({ received: true, duplicate: true });
        }
        const claimed = await markWebhookProcessing(evt.id, evt.type, null, evt.data?.object?.metadata || {},
          evt.created ? new Date(evt.created * 1000) : undefined);
        if (!claimed) {
          console.log(`[Webhook] Event already being processed: ${evt.id}`);
          return res.status(200).json({ received: true, duplicate: true });
        }
      }

      try {
        if (!evt) throw new Error("Failed to parse webhook body");

        let webhookUserId: string | null = null;
        let webhookError: string | undefined;

        try {

        if (evt.type === "checkout.session.completed" && evt.data?.object?.metadata?.purchaseType === "deck_upgrade") {
          const meta = evt.data.object.metadata;
          const { getDevPool } = await import("./db");
          const dbPool = getDevPool();
          await dbPool.query(
            `UPDATE flashcard_decks SET is_upgraded = true, upgraded_at = NOW(), stripe_payment_intent_id = $1 WHERE id = $2 AND owner_id = $3`,
            [evt.data.object.payment_intent || evt.data.object.id, meta.deckId, meta.userId]
          );
          console.log(`Deck ${meta.deckId} upgraded for user ${meta.userId}`);
        }

        const trialEventTypes = ["customer.subscription.updated", "customer.subscription.deleted"];
        if (trialEventTypes.includes(evt.type) && evt.data?.object?.metadata?.isTrial === "true") {
          const { handleTrialSubscriptionWebhook } = await import("./trial-subscription");
          await handleTrialSubscriptionWebhook(evt);
        }

        if (evt.type === "checkout.session.completed" && evt.data?.object?.metadata?.isLifetime === "true") {
          const meta = evt.data.object.metadata;
          if (meta.userId && meta.tier) {
            const existingUser = await storage.getUser(meta.userId);
            const isAdmin = existingUser?.tier === "admin";
            await storage.setUserLifetime(meta.userId);
            if (!isAdmin) {
              await storage.updateUserTier(meta.userId, meta.tier);
            }
            console.log(`[Webhook] Lifetime purchase completed: user ${meta.userId}, tier ${isAdmin ? 'admin (preserved)' : meta.tier}`);
            const { getDevPool } = await import("./db");
            sendAdminNotification(getDevPool(), {
              event: "lifetime_purchase",
              stripeEventId: evt.id,
              userId: meta.userId,
              userName: existingUser?.name || existingUser?.username || meta.userId,
              userEmail: existingUser?.email || "",
              tier: meta.tier,
              amount: (evt.data.object.amount_total / 100).toFixed(2),
              currency: evt.data.object.currency || "cad",
            }).catch((e: any) => console.error("[Notifications] lifetime_purchase error:", e.message));
          }
        }

        if (evt.type === "checkout.session.completed") {
          const session = evt.data?.object;
          const meta = session?.metadata;
          if (meta?.userId && meta?.tier && session?.mode === "subscription" && !meta?.isTrial && !meta?.isLifetime) {
            const subscriptionId = session.subscription;
            const existingUser = await storage.getUser(meta.userId);
            const isAdmin = existingUser?.tier === "admin";
            console.log(`[Webhook] checkout.session.completed: userId=${meta.userId} purchasedTier=${meta.tier} currentTier=${existingUser?.tier} isAdmin=${isAdmin} subscriptionId=${subscriptionId}`);

            if (!isAdmin) {
              await storage.updateUserTier(meta.userId, meta.tier);
            }
            if (subscriptionId) {
              await storage.updateUserStripeInfo(meta.userId, {
                stripeSubscriptionId: subscriptionId,
                subscriptionStatus: "active",
                ...(isAdmin ? {} : { tier: meta.tier }),
              });
            }

            try {
              await storage.upsertUserSubscription(meta.userId, {
                planId: meta.planId || meta.tier,
                planName: meta.tier?.toUpperCase() || "Subscription",
                billingInterval: meta.duration || "monthly",
                status: "active",
                activeFrom: new Date(),
                purchaseSource: "web",
                stripeSubscriptionId: subscriptionId || undefined,
                stripeCustomerId: session.customer || undefined,
                lastVerifiedAt: new Date(),
              });
            } catch (subErr: any) {
              console.error("[Webhook] Failed to upsert user_subscription:", subErr.message);
            }

            console.log(`[Webhook] Subscription activated: user ${meta.userId}, tier ${isAdmin ? 'admin (preserved)' : meta.tier}, sub ${subscriptionId}`);
            const { getDevPool } = await import("./db");
            sendAdminNotification(getDevPool(), {
              event: "new_subscription",
              stripeEventId: evt.id,
              userId: meta.userId,
              userName: existingUser?.name || existingUser?.username || meta.userId,
              userEmail: existingUser?.email || "",
              tier: meta.tier,
              subscriptionId: subscriptionId || "",
              amount: session.amount_total ? (session.amount_total / 100).toFixed(2) : undefined,
              currency: session.currency || "cad",
            }).catch((e: any) => console.error("[Notifications] new_subscription error:", e.message));
          }
        }

        if (evt.type === "customer.subscription.updated") {
          const sub = evt.data?.object;
          let userId = sub?.metadata?.userId;
          const tier = sub?.metadata?.tier;
          if (!userId && sub?.customer) {
            const { getDevPool } = await import("./db");
            const dbPool = getDevPool();
            const r = await dbPool.query(`SELECT id FROM users WHERE stripe_customer_id = $1 LIMIT 1`, [sub.customer]);
            if (r.rows.length > 0) userId = r.rows[0].id;
          }
          const staleEvent = sub?.id && evt.created ? await isEventStale(sub.id, evt.created) : false;
          if (staleEvent) {
            console.log(`[Webhook] Skipping stale subscription.updated event ${evt.id} for sub ${sub.id}`);
          } else if (userId && !sub?.metadata?.isTrial) {
            const existingUser = await storage.getUser(userId);
            const isAdmin = existingUser?.tier === "admin";
            const status = sub?.status;
            console.log(`[Webhook] subscription.updated: userId=${userId} status=${status} tier=${tier} isAdmin=${isAdmin}`);
            if (status === "active" || status === "trialing") {
              await storage.updateUserStripeInfo(userId, { subscriptionStatus: "active", ...(tier && !isAdmin ? { tier } : {}) });
              console.log(`[Webhook] Subscription updated (active): user ${userId}, tier ${isAdmin ? 'admin (preserved)' : (tier || 'unchanged')}`);
            } else if (status === "past_due") {
              await storage.updateUserStripeInfo(userId, { subscriptionStatus: "past_due" });
              console.log(`[Webhook] Subscription past_due: user ${userId}`);
            } else if (status === "canceled" || status === "unpaid") {
              await storage.updateUserStripeInfo(userId, { subscriptionStatus: "canceled", ...(isAdmin ? {} : { tier: "free" }) });
              console.log(`[Webhook] Subscription ${status}: user ${userId} ${isAdmin ? '(admin preserved)' : 'downgraded to free'}`);
              const { getDevPool } = await import("./db");
              sendAdminNotification(getDevPool(), {
                event: "subscription_cancelled",
                stripeEventId: evt.id,
                userId,
                userName: existingUser?.name || existingUser?.username || userId,
                userEmail: existingUser?.email || "",
                tier: tier || existingUser?.tier || "",
                details: `Subscription ${status}`,
              }).catch((e: any) => console.error("[Notifications] subscription_cancelled error:", e.message));
            }

            try {
              const subStatus = (status === "canceled" || status === "unpaid") ? "canceled" : status;
              await storage.upsertUserSubscription(userId, {
                status: subStatus,
                stripeSubscriptionId: sub?.id || undefined,
                stripeCustomerId: sub?.customer || undefined,
                lastVerifiedAt: new Date(),
                ...(subStatus === "canceled" ? { canceledAt: new Date() } : {}),
                ...(sub?.current_period_end ? { expiresAt: new Date(sub.current_period_end * 1000) } : {}),
                ...(sub?.current_period_end && subStatus === "active" ? { renewsAt: new Date(sub.current_period_end * 1000) } : {}),
              });
            } catch (subErr: any) {
              console.error("[Webhook] Failed to upsert user_subscription on update:", subErr.message);
            }
          }
        }

        if (evt.type === "customer.subscription.deleted") {
          const sub = evt.data?.object;
          let userId = sub?.metadata?.userId;
          if (!userId && sub?.customer) {
            const { getDevPool } = await import("./db");
            const dbPool = getDevPool();
            const r = await dbPool.query(`SELECT id FROM users WHERE stripe_customer_id = $1 LIMIT 1`, [sub.customer]);
            if (r.rows.length > 0) userId = r.rows[0].id;
          }
          if (userId && !sub?.metadata?.isTrial) {
            const existingUser = await storage.getUser(userId);
            const isAdmin = existingUser?.tier === "admin";
            await storage.updateUserStripeInfo(userId, { subscriptionStatus: "canceled", ...(isAdmin ? {} : { tier: "free" }) });
            console.log(`[Webhook] Subscription deleted: user ${userId} ${isAdmin ? '(admin preserved)' : 'downgraded to free'}`);

            try {
              await storage.upsertUserSubscription(userId, {
                status: "canceled",
                canceledAt: new Date(),
                lastVerifiedAt: new Date(),
              });
            } catch (subErr: any) {
              console.error("[Webhook] Failed to upsert user_subscription on delete:", subErr.message);
            }

            const { getDevPool } = await import("./db");
            sendAdminNotification(getDevPool(), {
              event: "subscription_cancelled",
              stripeEventId: evt.id,
              userId,
              userName: existingUser?.name || existingUser?.username || userId,
              userEmail: existingUser?.email || "",
              tier: sub?.metadata?.tier || existingUser?.tier || "",
              details: "Subscription deleted by Stripe",
            }).catch((e: any) => console.error("[Notifications] subscription_cancelled error:", e.message));
          }
        }

        if (evt.type === "invoice.paid") {
          const invoice = evt.data?.object;
          const customerId = invoice?.customer;
          if (customerId) {
            try {
              const { getDevPool } = await import("./db");
              const dbPool = getDevPool();
              const result = await dbPool.query(
                `SELECT id FROM users WHERE stripe_customer_id = $1 LIMIT 1`,
                [customerId]
              );
              if (result.rows.length > 0) {
                const userId = result.rows[0].id;
                const subscriptionId = invoice?.subscription;
                await storage.updateUserStripeInfo(userId, { subscriptionStatus: "active" });
                if (subscriptionId) {
                  const invoiceTier = invoice?.lines?.data?.[0]?.metadata?.tier;
                  const existingUser = await storage.getUser(userId);
                  const resolvedTier = invoiceTier || existingUser?.tier || "free";
                  await upsertSubscription({
                    userId,
                    stripeSubscriptionId: subscriptionId,
                    stripeCustomerId: customerId,
                    tier: resolvedTier,
                    status: "active",
                    currency: invoice.currency || "usd",
                    amount: invoice.amount_paid || null,
                  });
                }
                console.log(`[Webhook] invoice.paid: user ${userId} (customer ${customerId}), subscription confirmed active`);
                await emitEntitlementEvent(userId, "invoice_paid", {
                  stripeEventId: evt.id,
                  subscriptionId: subscriptionId || null,
                  metadata: { invoiceId: invoice.id, amountPaid: invoice.amount_paid },
                });
              }
            } catch (e: any) {
              console.error("[Webhook] invoice.paid subscription update error:", e.message);
            }
          }
        }

        if (evt.type === "invoice.payment_failed") {
          const invoice = evt.data?.object;
          const customerId = invoice?.customer;
          if (customerId) {
            const { getDevPool } = await import("./db");
            const dbPool = getDevPool();
            const result = await dbPool.query(
              `SELECT id FROM users WHERE stripe_customer_id = $1 LIMIT 1`,
              [customerId]
            );
            if (result.rows.length > 0) {
              const userId = result.rows[0].id;
              await storage.updateUserStripeInfo(userId, { subscriptionStatus: "past_due" });
              console.log(`Invoice payment failed for user ${userId} (customer ${customerId})`);
              const user = await storage.getUser(userId);
              sendAdminNotification(dbPool, {
                event: "payment_failed",
                stripeEventId: evt.id,
                userId,
                userName: user?.name || user?.username || userId,
                userEmail: user?.email || "",
                tier: user?.tier || "",
                amount: invoice.amount_due ? (invoice.amount_due / 100).toFixed(2) : undefined,
                currency: invoice.currency || "cad",
                details: `Invoice ${invoice.id || "unknown"} payment failed`,
              }).catch((e: any) => console.error("[Notifications] payment_failed error:", e.message));
            }
          }
        }
        if (evt.type === "checkout.session.completed") {
          const session = evt.data?.object;
          const meta = session?.metadata;
          if (meta?.userId) {
            webhookUserId = meta.userId;
            const subTier = meta.tier || "free";
            const isLifetimePurchase = meta.isLifetime === "true";
            await upsertSubscription({
              userId: meta.userId,
              stripeSubscriptionId: session.subscription || null,
              stripeCustomerId: session.customer || null,
              tier: subTier,
              status: "active",
              billingInterval: meta.duration || null,
              isLifetime: isLifetimePurchase,
              purchaseSource: meta.purchaseSource || "web",
              currency: session.currency || "usd",
              amount: session.amount_total || null,
            });
            await emitEntitlementEvent(meta.userId, isLifetimePurchase ? "lifetime_purchased" : "subscription_created", {
              tier: subTier,
              stripeEventId: evt.id,
              subscriptionId: session.subscription || null,
              accessSource: "subscription",
              metadata: { billingInterval: meta.duration, amount: session.amount_total },
            });
          }
        }

        if (evt.type === "customer.subscription.updated") {
          const sub = evt.data?.object;
          let syncUserId = sub?.metadata?.userId;
          if (!syncUserId && sub?.customer) {
            const { getUserIdByStripeCustomer } = await import("./subscription-sync");
            syncUserId = await getUserIdByStripeCustomer(sub.customer);
          }
          if (syncUserId) {
            if (sub?.id && evt.created && await isEventStale(sub.id, evt.created)) {
              console.log(`[Webhook] Skipping stale subscription.updated event ${evt.id} for sub ${sub.id}`);
            } else {
            webhookUserId = syncUserId;
            const subStatus = sub?.status || "active";
            const tier = sub?.metadata?.tier;
            await upsertSubscription({
              userId: syncUserId,
              stripeSubscriptionId: sub.id,
              stripeCustomerId: sub.customer || null,
              tier: tier || "free",
              status: subStatus,
              gracePeriodUntil: subStatus === "past_due" ? new Date(Date.now() + 72 * 60 * 60 * 1000) : null,
            });
            if (subStatus === "past_due") {
              await emitEntitlementEvent(syncUserId, "grace_period_started", {
                tier, stripeEventId: evt.id, subscriptionId: sub.id,
                metadata: { gracePeriodHours: 72 },
              });
            } else if (subStatus === "active") {
              await emitEntitlementEvent(syncUserId, "subscription_renewed", {
                tier, stripeEventId: evt.id, subscriptionId: sub.id,
              });
            } else if (subStatus === "canceled" || subStatus === "unpaid") {
              await emitEntitlementEvent(syncUserId, "subscription_canceled", {
                tier, stripeEventId: evt.id, subscriptionId: sub.id,
              });
            }
            }
          }
        }

        if (evt.type === "customer.subscription.deleted") {
          const sub = evt.data?.object;
          let syncUserId = sub?.metadata?.userId;
          if (!syncUserId && sub?.customer) {
            const { getUserIdByStripeCustomer } = await import("./subscription-sync");
            syncUserId = await getUserIdByStripeCustomer(sub.customer);
          }
          if (syncUserId) {
            webhookUserId = syncUserId;
            await upsertSubscription({
              userId: syncUserId,
              stripeSubscriptionId: sub.id,
              status: "canceled",
              canceledAt: new Date(),
              tier: sub?.metadata?.tier || "free",
            });
            await emitEntitlementEvent(syncUserId, "subscription_deleted", {
              tier: sub?.metadata?.tier, stripeEventId: evt.id, subscriptionId: sub.id,
            });
          }
        }

        if (evt.type === "invoice.payment_failed") {
          const invoice = evt.data?.object;
          if (invoice?.customer) {
            const { getUserIdByStripeCustomer } = await import("./subscription-sync");
            const paymentUserId = await getUserIdByStripeCustomer(invoice.customer);
            if (paymentUserId) {
              webhookUserId = paymentUserId;
              await emitEntitlementEvent(paymentUserId, "payment_failed", {
                stripeEventId: evt.id,
                metadata: { invoiceId: invoice.id, amountDue: invoice.amount_due },
              });
            }
          }
        }

        } catch (innerErr: any) {
          webhookError = innerErr?.message;
          console.error("Webhook inner processing error:", innerErr?.message);
        }

        if (evt.id) {
          await markWebhookProcessed(evt.id, { userId: webhookUserId, eventType: evt.type }, webhookError);
          if (webhookUserId) {
            pool.query(`UPDATE webhook_events SET user_id = $1 WHERE event_id = $2`, [webhookUserId, evt.id]).catch(() => {});
          }
        }

      } catch (webhookParseErr: any) {
        console.error("Webhook event processing error:", webhookParseErr?.message);
      }
      return res.status(200).json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error?.message || error);
      return res.status(400).json({ error: "Webhook processing error" });
    }
  },
);

// -------------------------
// Body parsers (AFTER webhook route)
// -------------------------
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

import { connectionTrackingMiddleware, loadSheddingMiddleware, responseSizeLimiterMiddleware, memoryAwareRequestLogger, aiConcurrencyLimiterMiddleware, routeInstrumentationMiddleware, concurrencyLimiterMiddleware } from "./memory-middleware";
import { resourceBudgetMiddleware } from "./resource-budgets";
app.use(connectionTrackingMiddleware());
app.use(routeInstrumentationMiddleware());
app.use(loadSheddingMiddleware());
app.use(aiConcurrencyLimiterMiddleware());
app.use(responseSizeLimiterMiddleware());
app.use(memoryAwareRequestLogger());
app.use(concurrencyLimiterMiddleware());
app.use(resourceBudgetMiddleware());

// -------------------------
// Admin verify (needs express.json() ABOVE)
// Register this BEFORE registerRoutes()
// -------------------------
app.post("/api/admin/verify", (req, res) => {
  try {
    const username = String(req.body?.username || "");
    const password = String(req.body?.password || "");

    const adminUser = String(process.env.ADMIN_USERNAME || "");
    const adminPass = String(process.env.ADMIN_PASSWORD || "");

    const ok = username.length > 0 && password.length > 0 && username === adminUser && password === adminPass;
    return res.json({ isAdmin: ok });
  } catch {
    return res.json({ isAdmin: false });
  }
});

// -------------------------
// Subscription & Entitlement routes
// -------------------------
import { registerSubscriptionRoutes } from "./subscription-routes";
registerSubscriptionRoutes(app);

// -------------------------
// SEO: robots + sitemap (modular, database-driven)
// -------------------------
import { registerSitemapRoutes, getSiteBase } from "./sitemap";
registerSitemapRoutes(app);

app.get("/images/seo/:slug", (req, res) => {
  const slug = req.params.slug.replace(/\.(png|jpg|jpeg|webp)$/i, "");
  const cleanSlug = slug.replace(/-nursing-diagram$/, "").replace(/-diagram$/, "");
  res.redirect(301, `/attached_assets/generated_images/${cleanSlug}.png`);
});


// -------------------------
// SEO Debug API
// -------------------------
import { getPageMeta } from "./seo-meta";

const SEO_DEBUG_ROUTES = [
  "/", "/lessons", "/flashcards", "/pricing", "/start-free", "/anatomy",
  "/med-math", "/lab-values", "/mock-exams", "/clinical-clarity", "/blog",
  "/pre-nursing", "/question-of-the-day", "/question-bank", "/lectures",
  "/nursing", "/nursing-specialties", "/faq", "/about", "/contact",
  "/terms", "/privacy", "/nclex-rn-practice-questions", "/nclex-pn-practice-questions",
  "/rex-pn-practice-questions", "/np-exam-practice-questions", "/free-practice",
  "/practice-questions", "/glossary", "/medication-mastery", "/medical-imaging",
  "/admin", "/dashboard", "/login", "/register", "/profile", "/feedback",
  "/diagnostic-assessment", "/settings",
];

const HREFLANG_MAP: Record<string, string> = {
  en: "en-ca", fr: "fr-ca", es: "es", fil: "fil", hi: "hi",
  zh: "zh", ar: "ar", ko: "ko", pt: "pt", pa: "pa",
  vi: "vi", ht: "ht", ur: "ur", ja: "ja", fa: "fa",
};

app.get("/api/seo-debug", (_req, res) => {
  const siteBase = getSiteBase();
  const debugLocales = [...SUPPORTED_LOCALES];
  const results: any[] = [];

  for (const route of SEO_DEBUG_ROUTES) {
    for (const locale of debugLocales) {
      const fullPath = `/${locale}${route === "/" ? "" : route}`;
      const meta = getPageMeta(fullPath);
      const basePath = route === "/" ? "" : route;
      const hreflangs = debugLocales.map(l => ({
        lang: HREFLANG_MAP[l] || l,
        href: `${siteBase}/${l}${basePath}`,
      }));
      hreflangs.push({ lang: "x-default", href: `${siteBase}/en${basePath}` });

      results.push({
        url: `${siteBase}${fullPath}`,
        path: fullPath,
        locale,
        canonical: meta.canonical,
        robotsMeta: meta.noindex ? "noindex, follow" : "index, follow",
        hreflangs,
        inSitemap: !meta.noindex,
        title: meta.title,
      });
    }
  }

  res.json({ routes: results, locales: debugLocales, totalRoutes: results.length });
});

// -------------------------
// Locale redirect middleware
// -------------------------

function detectLocaleFromAcceptLanguage(acceptLanguage: string | undefined): string {
  if (!acceptLanguage) return "en";
  const parts = acceptLanguage.split(",").map(part => {
    const [lang, qStr] = part.trim().split(";q=");
    return { lang: lang.trim().toLowerCase(), q: qStr ? parseFloat(qStr) : 1.0 };
  });
  parts.sort((a, b) => b.q - a.q);

  for (const { lang } of parts) {
    if (lang === "zh-tw" || lang.startsWith("zh-hant") || lang.startsWith("zh-tw")) {
      return "zh-tw";
    }
    const primary = lang.split("-")[0];
    if (primary === "tl" || primary === "fil") {
      if (SUPPORTED_LOCALES_SET.has("fil")) return "fil";
    }
    if (SUPPORTED_LOCALES_SET.has(primary)) return primary;
    if (SUPPORTED_LOCALES_SET.has(lang)) return lang;
  }
  return "en";
}

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.isAllied) return next();

  const urlPath = req.path;

  if (
    urlPath.startsWith("/api") ||
    urlPath.startsWith("/assets") ||
    urlPath.startsWith("/vite-hmr") ||
    urlPath.startsWith("/@") ||
    urlPath.startsWith("/src") ||
    urlPath.startsWith("/node_modules") ||
    urlPath === "/robots.txt" ||
    urlPath === "/sitemap-index.xml" ||
    urlPath.startsWith("/sitemaps/") ||
    urlPath === "/sitemap.xml" ||
    urlPath === "/sitemap_index.xml" ||
    urlPath === "/sitemap-index.xml" ||
    /\.\w{2,5}($|\?)/.test(urlPath)
  ) {
    return next();
  }

  const segments = urlPath.split("/").filter(Boolean);
  const firstSegment = segments[0] || "";

  if (SUPPORTED_LOCALES_SET.has(firstSegment)) {
    return next();
  }

  if (process.env.NODE_ENV === "production") {
    const restPath = urlPath === "/" ? "" : urlPath;
    const query = req.originalUrl.includes("?") ? req.originalUrl.substring(req.originalUrl.indexOf("?")) : "";
    const detectedLocale = detectLocaleFromAcceptLanguage(req.headers["accept-language"]);
    return res.redirect(301, `/${detectedLocale}${restPath}${query}`);
  }

  return next();
});

// -------------------------
// Logging helper + /api request logging
// -------------------------
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedSnippet: string | undefined;

  const originalResJson = res.json.bind(res);
  res.json = ((bodyJson: any, ...args: any[]) => {
    try {
      const str = JSON.stringify(bodyJson);
      capturedSnippet = str.length > 500 ? str.slice(0, 500) + "…" : str;
    } catch {}
    return originalResJson(bodyJson, ...args);
  }) as any;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedSnippet) {
        logLine += ` :: ${capturedSnippet}`;
      }
      capturedSnippet = undefined;
      log(logLine);
    }
  });

  next();
});

// -------------------------
// Bootstrap server
// -------------------------
(async () => {
  const serverStartTime = Date.now();
  console.log("[Startup] Server initialization starting...");

  const stripeStart = Date.now();
  await initStripe();
  console.log(`[Startup] Stripe init: ${Date.now() - stripeStart}ms`);

  const { setupSeoRedirects } = await import("./seo-redirects");
  setupSeoRedirects(app);

  const { getDevPool } = await import("./db");
  const devPool = getDevPool();
  registerNotificationRoutes(app, devPool);
  registerAlertingRoutes(app, devPool);

  const deferredAdminModules = [
    { path: "./allied-pipeline", fn: "registerAlliedPipelineRoutes" },
    { path: "./allied-automations", fn: "registerAutomationRoutes" },
    { path: "./ai-jobs-routes", fn: "registerAiJobsRoutes" },
    { path: "./social-content-automation", fn: "registerSocialContentRoutes" },
    { path: "./allied-scenarios", fn: "registerScenarioRoutes" },
    { path: "./paramedic-bulk-upload", fn: "registerParamedicBulkUploadRoutes" },
    { path: "./mass-expansion-routes", fn: "registerMassExpansionRoutes" },
  ];
  setTimeout(async () => {
    for (const { path: modPath, fn } of deferredAdminModules) {
      try {
        const mod = await import(modPath);
        mod[fn](app);
      } catch (e: any) {
        console.error(`[DeferredLoad] Failed to load ${modPath}: ${e.message}`);
      }
    }
    console.log(`[DeferredLoad] ${deferredAdminModules.length} admin modules loaded`);
  }, 5000);

  const { registerMockExamTemplateRoutes } = await import("./mock-exam-template-routes");
  registerMockExamTemplateRoutes(app);

  const [
    { registerScheduleRoutes },
    { setupAiOpsRoutes },
    { loadProviders },
    { setupQBankGenerator },
    { setupBulkGeneratorRoutes },
    { setupContentExpansionRoutes },
    { setupClinicalVignetteRoutes },
    { setupTrialRoutes },
    { setupTrialSubscriptionRoutes },
    { setupStudyPathRoutes },
    jobQueue,
    { setupAutopilotRoutes },
    { setupContentCoverageRoutes },
    { setupLessonContentRoutes },
    { setupSeoEngineRoutes },
    { setupContentGrowthRoutes },
    { registerNursingContentHubRoutes },
    { registerSeoContentRoutes },
    { registerParamedicSeoRoutes },
    { setupQBankRoutes },
    { loadStripePrices },
  ] = await Promise.all([
    import("./qbank-scheduler"),
    import("./ai-ops-routes"),
    import("./ai-provider-router"),
    import("./qbank-generator"),
    import("./bulk-question-generator"),
    import("./content-expansion-job"),
    import("./clinical-vignette-generator"),
    import("./trial"),
    import("./trial-subscription"),
    import("./study-path"),
    import("./job-queue"),
    import("./autopilot"),
    import("./content-coverage"),
    import("./lesson-content-api"),
    import("./seo-engine"),
    import("./content-growth-routes"),
    import("./nursing-content-hub"),
    import("./seo-content-pages"),
    import("./paramedic-seo"),
    import("./qbank-api"),
    import("./stripe-pricing"),
  ]);

  registerScheduleRoutes(app);
  setupAiOpsRoutes(app);
  loadProviders().catch(err => console.error("[AIRouter] Init failed:", err.message));
  setupQBankGenerator(app);
  setupBulkGeneratorRoutes(app);
  setupContentExpansionRoutes(app);
  setupClinicalVignetteRoutes(app);
  setupTrialRoutes(app);
  setupTrialSubscriptionRoutes(app);
  setupStudyPathRoutes(app);
  jobQueue.setupJobQueueRoutes(app);
  setupAutopilotRoutes(app);
  setupContentCoverageRoutes(app);

  const processRole = process.env.PROCESS_ROLE || "web";
  if (processRole === "worker") {
    const { registerAllJobHandlers } = await import("./job-handlers");
    registerAllJobHandlers(jobQueue.registerJobHandler);
    jobQueue.startJobQueueWorker();
    console.log("[Startup] Worker process: job queue worker + handlers started");
  } else {
    console.log("[Startup] Web process: job queue worker + handlers deferred to worker process");
  }
  setupLessonContentRoutes(app);
  setupSeoEngineRoutes(app);
  setupContentGrowthRoutes(app);
  registerNursingContentHubRoutes(app);
  registerSeoContentRoutes(app);
  registerParamedicSeoRoutes(app);
  setupQBankRoutes(app);
  loadStripePrices();

  const { registerExamDeliveryRoutes } = await import("./exam-delivery");
  registerExamDeliveryRoutes(app);
  console.log("[ExamDelivery] Paginated exam delivery routes registered");

  const { routeMemoryDeltaMiddleware } = await import("./memory-observability");
  app.use(routeMemoryDeltaMiddleware());

  app.get("/api/admin/memory-observability", async (req, res) => {
    try {
      const { resolveAuthUser } = await import("./admin-auth");
      const user = await resolveAuthUser(req as any);
      if (!user || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const { getMemoryObservabilityDashboard } = await import("./memory-observability");
      res.json(getMemoryObservabilityDashboard());
    } catch (err: any) {
      res.status(500).json({ error: "Failed to get memory observability data" });
    }
  });

  const routeStart = Date.now();
  await registerRoutes(httpServer, app);
  console.log(`[Startup] Route registration: ${Date.now() - routeStart}ms`);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });

  app.use(
    "/attached_assets",
    express.static(path.resolve(process.cwd(), "attached_assets"), {
      maxAge: "7d",
      immutable: true,
    }),
  );

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  appReady = true;
  console.log(`[Startup] Total server startup: ${Date.now() - serverStartTime}ms`);
  log(`routes loaded, app ready on port ${port}`);

  const sitemapFiles = [
    "sitemap-index.xml (master index)",
    "sitemap-pages.xml (static/marketing pages)",
    "sitemap-lessons.xml (lesson content)",
    "sitemap-questions.xml (practice questions)",
    "sitemap-flashcards.xml (glossary/flashcards)",
    "sitemap-specialties.xml (nursing specialties)",
    "sitemap-professions.xml (profession landing pages)",
    "sitemap-allied.xml (allied health)",
    "sitemap-newgrad.xml (new graduate)",
    "sitemap-content.xml (SEO articles/content)",
    "image-sitemap.xml (images)",
    "sitemap-study-guides.xml (programmatic)",
    "sitemap-exam-tips.xml (programmatic)",
    "sitemap-clinical-scenarios.xml (programmatic)",
    "sitemap-practice-questions.xml (programmatic)",
    "sitemap-question-details.xml (programmatic)",
    "sitemap-flashcard-details.xml (programmatic)",
  ];
  console.log("\n[Sitemap] Registered sitemap files:");
  for (const f of sitemapFiles) {
    console.log(`  ✓ /${f}`);
  }
  console.log(`[Sitemap] Total: ${sitemapFiles.length} sitemap files`);
  console.log(`[Sitemap] robots.txt → Sitemap: https://www.nursenest.ca/sitemap-index.xml`);
  console.log(`[Sitemap] /sitemap.xml → 301 → /sitemap-index.xml`);
  console.log(`[Sitemap] /sitemap_index.xml → 301 → /sitemap-index.xml\n`);

  import("./memory-monitor").then(({ startMemoryMonitorWithTrend }) => startMemoryMonitorWithTrend()).catch(e => console.error("[MemoryMonitor] Failed to start:", e.message));
  import("./resource-budgets").then(({ startMemoryMonitor: startBudgetMonitor }) => startBudgetMonitor(30000)).catch(e => console.error("[ResourceBudgets] Failed to start memory monitor:", e.message));
  import("./auto-containment").then(({ startAutoContainment }) => startAutoContainment(60000)).catch(e => console.error("[AutoContainment] Failed to start:", e.message));

  import("./memory-observability").then(({ startMemoryTrendTracking }) => {
    startMemoryTrendTracking(30_000);
    console.log("[MemoryObservability] Memory trend tracking active");
  }).catch(e => console.error("[MemoryObservability] Failed to start:", e.message));

  const webProcessRole = process.env.PROCESS_ROLE || "web";

  runDeferredStartupWork();

  if (webProcessRole === "worker") {
    const alertPool = getDevPool();
    startAlertingEngine(alertPool, 5 * 60 * 1000);
    const syntheticBaseUrl = `http://127.0.0.1:${port}`;
    startSyntheticMonitoring(alertPool, syntheticBaseUrl, 10 * 60 * 1000);

    import("./content-integrity-audit").then(({ startPostPublishAudit }) => {
      startPostPublishAudit();
    }).catch(e => console.error("[PostPublishAudit] Failed to start:", e.message));

    setInterval(async () => {
      try {
        const { shouldPauseBackgroundJobs } = await import("./memory-monitor");
        if (shouldPauseBackgroundJobs()) {
          return;
        }
        const count = await storage.publishScheduledContent();
        if (count > 0) log(`Scheduler: auto-published ${count} content item(s)`);
      } catch (err: any) {
        console.error("Scheduler error:", err?.message || err);
      }
    }, 60_000);
  } else {
    console.log("[Startup] Web process: alerting, synthetic monitoring, content scheduler, post-publish audit deferred to worker process");
  }
})();

async function startupMemoryGuard(label: string) {
  const rss = process.memoryUsage.rss();
  const rssMB = Math.round(rss / 1024 / 1024);
  let limitMB = 512;
  try { const { getDetectedMemoryLimitMB } = await import("./memory-monitor"); limitMB = getDetectedMemoryLimitMB(); } catch {}
  const guardThreshold = Math.round(limitMB * 0.70);
  if (rssMB > guardThreshold) {
    console.log(`[StartupMemoryGuard] ${label}: RSS at ${rssMB}MB (limit: ${limitMB}MB), pausing for GC...`);
    if (global.gc) global.gc();
    await new Promise(r => setTimeout(r, 500));
  }
}

async function runSeedStep(name: string, fn: () => Promise<void>) {
  try {
    await fn();
  } catch (e: any) {
    console.error(`[Seed] ${name} failed (non-fatal):`, e.message);
  }
}

function runDeferredStartupWork() {
  setImmediate(async () => {
    const deferredStart = Date.now();
    console.log("[DeferredStartup] Beginning phased startup...");

    // ── Phase 0: Quick validations (no heavy data) ──
    const phase0Start = Date.now();
    try {
      const t0 = Date.now();
      const { validateStripeConnection } = await import("./stripeClient");
      const stripeValid = await validateStripeConnection();
      if (!stripeValid) {
        console.error("[STARTUP] WARNING: Stripe connection validation failed — checkout will not work until the key is fixed");
      }
      console.log(`[Startup Timing] Stripe validation: ${Date.now() - t0}ms`);
    } catch (e: any) {
      console.error("[Deferred Startup] Stripe validation error:", e.message);
    }

    try {
      const t0 = Date.now();
      const { validateSchemaAtStartup } = await import("./schema-validation");
      await validateSchemaAtStartup();
      console.log(`[Startup Timing] Schema validation: ${Date.now() - t0}ms`);
    } catch (e: any) {
      console.error("[Deferred Startup] Schema validation error:", e.message);
    }

    try {
      const t0 = Date.now();
      const { ensureSchemaSync } = await import("./ensure-schema");
      const { pool: schemaPool } = await import("./storage");
      await ensureSchemaSync(schemaPool);
      console.log(`[Startup Timing] Schema sync: ${Date.now() - t0}ms`);
    } catch (e: any) {
      console.error("[SchemaSync] Failed:", e.message);
    }

    try {
      const t0 = Date.now();
      const { runStartupDataMigrations } = await import("./startup-data-migrations");
      await runStartupDataMigrations();
      console.log(`[Startup Timing] Data migrations: ${Date.now() - t0}ms`);
    } catch (e: any) {
      console.error("[Startup Migrations] Failed:", e.message);
    }

    try {
      const t0 = Date.now();
      const { scanAndQuarantineInvalidPublishedContent } = await import("./content-versioning-quarantine");
      const scanResult = await scanAndQuarantineInvalidPublishedContent();
      console.log(`[Startup Timing] Content quarantine scan: ${Date.now() - t0}ms (quarantined: ${scanResult.quarantined})`);
    } catch (e: any) {
      console.error("[StartupScan] Content quarantine scan failed:", e.message);
    }

    const deferredRole = process.env.PROCESS_ROLE || "web";
    if (deferredRole === "worker") {
      import("./reporting-scheduler").then(({ startReportingScheduler }) => startReportingScheduler())
        .catch((e: any) => console.error("[ReportingScheduler] Init failed:", e.message));

      const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
      setInterval(async () => {
        try {
          const { shouldPauseBackgroundJobs, getDetectedMemoryLimitMB } = await import("./memory-monitor");
          if (shouldPauseBackgroundJobs()) {
            console.warn("[Pipeline Scheduler] Skipping cycle: memory pressure active");
            return;
          }
          const limitMB = getDetectedMemoryLimitMB();
          const pipelineMemLimit = Math.round(limitMB * 0.70);
          const memUsage = process.memoryUsage();
          const heapMB = Math.round(memUsage.heapUsed / 1024 / 1024);
          if (heapMB > pipelineMemLimit) {
            console.warn(`[Pipeline Scheduler] Skipping cycle: heap usage ${heapMB}MB exceeds ${pipelineMemLimit}MB limit (${limitMB}MB detected)`);
            return;
          }
        } catch {}
        const memUsage = process.memoryUsage();
        const heapMB = Math.round(memUsage.heapUsed / 1024 / 1024);
        const pipelineStart = Date.now();
        console.log(`[Pipeline Scheduler] Starting cycle (heap: ${heapMB}MB)...`);
        try {
          const { createDailyJobs } = await import("./content-pipeline");
          const jobs = await createDailyJobs();
          if (jobs.length > 0) console.log(`[Pipeline Scheduler] Created ${jobs.length} daily generation jobs`);
        } catch (e: any) {
          console.error("[Pipeline Scheduler] createDailyJobs error (non-fatal):", e.message);
        }
        try {
          const { runContinuousImprovementJob } = await import("./content-pipeline");
          const improvement = await runContinuousImprovementJob();
          console.log(`[Pipeline Scheduler] Continuous improvement: ${improvement.weakQuestions.length} weak questions, ${improvement.weakTopics.length} weak topics, ${improvement.generationJobsQueued} jobs queued`);
          console.log(`[Pipeline Scheduler] Cycle completed in ${Date.now() - pipelineStart}ms`);
        } catch (e: any) {
          console.error("[Pipeline Scheduler] runContinuousImprovementJob error (non-fatal):", e.message);
        }
      }, SIX_HOURS_MS);
      console.log("[Pipeline Scheduler] Registered: daily jobs + continuous improvement (every 6h)");
    } else {
      console.log("[DeferredStartup] Web process: reporting scheduler + pipeline scheduler deferred to worker");
    }
    console.log(`[DeferredStartup] Phase 0 complete (validations + schedulers) in ${Date.now() - phase0Start}ms`);

    // ── Phase 1: Schema sync + data migrations (sequential) ──
    async function startupMemoryGuard(label: string) {
      const mem = process.memoryUsage();
      const heapUsedMB = Math.round(mem.heapUsed / 1024 / 1024);
      const rssMB = Math.round(mem.rss / 1024 / 1024);
      let limitMB = 512;
      try { const { getDetectedMemoryLimitMB } = await import("./memory-monitor"); limitMB = getDetectedMemoryLimitMB(); } catch {}
      const guardThreshold = Math.round(limitMB * 0.60);
      if (heapUsedMB > guardThreshold || rssMB > Math.round(limitMB * 0.70)) {
        console.warn(`[MemoryGuard] ${label}: heapUsed=${heapUsedMB}MB rss=${rssMB}MB (limit: ${limitMB}MB) — forcing GC`);
        if (global.gc) global.gc();
        await new Promise(r => setTimeout(r, 200));
      }
    }

    async function runSeedStep(name: string, fn: () => Promise<void>) {
      try {
        const t0 = Date.now();
        await fn();
        console.log(`[Startup Timing] ${name}: ${Date.now() - t0}ms`);
      } catch (e: any) {
        console.error(`[${name}] Failed:`, e.message);
      }
    }

    const isProduction = process.env.NODE_ENV === "production";
    async function shouldSkipSeed(tableName: string, minRows: number = 1): Promise<boolean> {
      if (!isProduction) return false;
      try {
        const { pool: checkPool } = await import("./storage");
        const result = await checkPool.query(`SELECT EXISTS (SELECT 1 FROM ${tableName} LIMIT 1) as has_data`);
        if (result.rows[0]?.has_data) {
          console.log(`[DeferredStartup] Skipping seed for ${tableName} — data already exists`);
          return true;
        }
      } catch {}
      return false;
    }

    const phase1Start = Date.now();
    await startupMemoryGuard("Phase 1: Schema/Migrations");
    console.log("[DeferredStartup] Phase 1: Schema sync + data migrations...");

    await runSeedStep("SchemaSync", async () => {
      const { ensureSchemaSync } = await import("./ensure-schema");
      const { pool: schemaPool } = await import("./storage");
      await ensureSchemaSync(schemaPool);
    });

    await runSeedStep("Startup Migrations", async () => {
      const { runStartupDataMigrations } = await import("./startup-data-migrations");
      await runStartupDataMigrations();
    });

    await runSeedStep("QBank Templates", async () => {
      const { seedPromptTemplates } = await import("./prompts/qbank-templates");
      await seedPromptTemplates();
    });

    await runSeedStep("Quarantine Zero-Valid Content", async () => {
      const { runStartupQuarantine } = await import("./publish-gate");
      await runStartupQuarantine();
    });

    console.log(`[DeferredStartup] Phase 1 complete in ${Date.now() - phase1Start}ms`);

    const shouldRunSeeding = deferredRole === "worker" || process.env.RUN_SEEDING === "true";
    if (!shouldRunSeeding) {
      console.log("[DeferredStartup] Web process: skipping Phase 2 & 3 seeding (deferred to worker process)");
    }

    // ── Phase 2: Exam questions + flashcard mapping (sequential) ──
    const phase2Start = Date.now();
    await startupMemoryGuard("Phase 2: Exam Questions");
    if (shouldRunSeeding) {
    console.log("[DeferredStartup] Phase 2: Exam questions + flashcard mapping...");

    const { pool: seedPool } = await import("./storage");

    const skipExamSeed = await shouldSkipSeed("exam_questions");
    if (!skipExamSeed) {
      await runSeedStep("ExamSeed", async () => {
        const { seedExamQuestions } = await import("./seed-exam-questions");
        await seedExamQuestions(seedPool);
      });

      await runSeedStep("RRTSeed", async () => {
        const { seedRRTQuestions } = await import("./seed-rrt-questions");
        await seedRRTQuestions(seedPool);
      });

      await runSeedStep("RPNPathoSeed", async () => {
        const { seedRPNPathoQuestions } = await import("./seed-rpn-patho-questions");
        await seedRPNPathoQuestions(seedPool);
      });

      await runSeedStep("DocxSeed", async () => {
        const { seedRNQuestionsFromDocx } = await import("./seed-rn-questions-docx");
        const result = await seedRNQuestionsFromDocx();
        console.log(`[DocxSeed] Total: ${result.total}, Inserted: ${result.inserted}, Skipped: ${result.skipped}, Errors: ${result.errors}`);
      });

      await runSeedStep("EmergencyNursing", async () => {
        const { seedEmergencyNursingToxDisaster } = await import("./seed-emergency-nursing-tox-disaster");
        await seedEmergencyNursingToxDisaster();
      });

      await runSeedStep("ParamedicQuestions", async () => {
        const { seedParamedicQuestions } = await import("./seed-paramedic-questions");
        await seedParamedicQuestions();
      });
    }

    if (!(await shouldSkipSeed("flashcard_bank"))) {
      await runSeedStep("CATFlashcards", async () => {
        const { seedCatFlashcards } = await import("./seed-cat-flashcards");
        await seedCatFlashcards(seedPool);
      });

      await startupMemoryGuard("Phase 2b: Flashcard Mapper");

      await runSeedStep("ExamFlashcardMapper", async () => {
        const { mapExamQuestionsToFlashcards, bulkGenerateAlignedFlashcards } = await import("./exam-flashcard-mapper");
        const result = await mapExamQuestionsToFlashcards();
        console.log(`[ExamFlashcardMapper] Synced: ${result.inserted} inserted, ${result.updated} updated, ${result.skipped} skipped`);
        const aligned = await bulkGenerateAlignedFlashcards();
        console.log(`[FlashcardAlignment] Bulk aligned: ${aligned.summary.totalCreated} created, ${aligned.summary.totalUpdated} updated`);
      });
    }

    if (!(await shouldSkipSeed("digital_products"))) {
      await runSeedStep("DigitalProductSeed", async () => {
        const { seedDigitalProducts } = await import("./seed-digital-products");
        await seedDigitalProducts(seedPool);
      });
    }

    console.log(`[DeferredStartup] Phase 2 complete in ${Date.now() - phase2Start}ms`);
    } // end shouldRunSeeding for Phase 2

    // ── Phase 3: SEO/content seeds (sequential) ──
    const phase3Start = Date.now();
    await startupMemoryGuard("Phase 3: SEO/Content Seeds");
    if (shouldRunSeeding) {
    console.log("[DeferredStartup] Phase 3: SEO/content seeds...");

    if (!(await shouldSkipSeed("flashcard_decks"))) {
      await runSeedStep("StudyDecks", async () => {
        const { seedStudyDecks } = await import("./seed-study-decks");
        await seedStudyDecks(seedPool);
      });
    }

    if (!(await shouldSkipSeed("seo_clusters"))) {
      await runSeedStep("SEOClusters", async () => {
        const { seedSEOClusters } = await import("./seed-seo-clusters");
        await seedSEOClusters(seedPool);
      });
    }

    if (!(await shouldSkipSeed("seo_ctr_pages"))) {
      await runSeedStep("SEO-CTR", async () => {
        const { seedSeoCtrPages } = await import("./seed-seo-ctr-pages");
        await seedSeoCtrPages(seedPool);
      });
    }

    if (!(await shouldSkipSeed("content_items"))) {
      await runSeedStep("ParamedicContent", async () => {
        const { seedParamedicContent } = await import("./seed-paramedic-content");
        await seedParamedicContent(seedPool);
      });

      await runSeedStep("NursingHubSeed", async () => {
        const { seedNursingContentHub } = await import("./seed-nursing-content-hub");
        await seedNursingContentHub(seedPool);
      });

      await runSeedStep("AlliedLandingPages", async () => {
        const { seedAlliedHealthLandingPages } = await import("./seed-allied-health-landing-pages");
        await seedAlliedHealthLandingPages();
      });
    }

    if (!(await shouldSkipSeed("encyclopedia_entries"))) {
      await runSeedStep("EncyclopediaSeed", async () => {
        const { seedEncyclopediaEntries } = await import("./encyclopedia-seed");
        await seedEncyclopediaEntries();
      });
    }

    if (!(await shouldSkipSeed("allied_health_questions"))) {
      await runSeedStep("AlliedHealthQuestions", async () => {
        const { seedAlliedHealthQuestions } = await import("./seeds/seed-allied-health-questions");
        await seedAlliedHealthQuestions(seedPool);
      });
    }

    await startupMemoryGuard("Phase 3b: Hub/Guide pages");

    if (!(await shouldSkipSeed("topic_hub_pages"))) {
      await runSeedStep("TopicHubPages", async () => {
        const { seedTopicHubPages } = await import("./seed-topic-hub-pages");
        await seedTopicHubPages();
      });
    }

    if (!(await shouldSkipSeed("long_form_study_guides"))) {
      await runSeedStep("LongFormGuides", async () => {
        const { seedLongFormStudyGuides } = await import("./seed-long-form-study-guides");
        await seedLongFormStudyGuides();
      });
    }

    if (!(await shouldSkipSeed("educational_pages"))) {
      await runSeedStep("LongTailPages", async () => {
        const { seedLongTailEducationalPages } = await import("./seed-long-tail-educational-pages");
        await seedLongTailEducationalPages();
      });
    }

    if (!(await shouldSkipSeed("imaging_seo_clusters"))) {
      await runSeedStep("ImagingSeoClustersSeed", async () => {
        const { seedImagingSeoContent } = await import("./seed-imaging-seo-clusters");
        await seedImagingSeoContent();
      });
    }

    console.log(`[DeferredStartup] Phase 3 complete in ${Date.now() - phase3Start}ms`);
    } // end shouldRunSeeding for Phase 3

    // ── Startup health summary ──
    try {
      const { pool: healthPool } = await import("./storage");
      const tierCounts = await healthPool.query(
        `SELECT tier, COUNT(*)::int AS count FROM exam_questions WHERE status = 'published' GROUP BY tier ORDER BY tier`
      );
      const fbCounts = await healthPool.query(
        `SELECT status, COUNT(*)::int AS count FROM flashcard_bank GROUP BY status`
      ).catch(() => ({ rows: [] }));
      const deckCount = await healthPool.query(
        `SELECT COUNT(*)::int AS count FROM flashcard_decks`
      ).catch(() => ({ rows: [{ count: 0 }] }));
      const dpCounts = await healthPool.query(
        `SELECT COUNT(*)::int AS count, COALESCE(SUM(question_count),0)::int AS total_q FROM digital_products WHERE is_active = true`
      ).catch(() => ({ rows: [{ count: 0, total_q: 0 }] }));

      const tierSummary = tierCounts.rows.map((r: any) => `${r.tier}: ${r.count}`).join(", ");
      const fbSummary = fbCounts.rows.map((r: any) => `${r.status}: ${r.count}`).join(", ");
      const dbHost = (process.env.DATABASE_URL || "").replace(/\/\/.*@/, "//***@").split("/")[2] || "unknown";
      const dp = dpCounts.rows[0] || { count: 0, total_q: 0 };

      console.log("═══════════════════════════════════════════");
      console.log("[Startup Health] Environment:", process.env.NODE_ENV || "development");
      console.log("[Startup Health] DB Host:", dbHost);
      console.log("[Startup Health] Exam Questions by tier:", tierSummary || "none");
      console.log("[Startup Health] Flashcard Bank:", fbSummary || "none");
      console.log("[Startup Health] Flashcard Decks:", deckCount.rows[0]?.count || 0);
      console.log("[Startup Health] Digital Products:", dp.count, "products,", dp.total_q, "store questions");
      console.log("═══════════════════════════════════════════");
    } catch (healthErr: any) {
      console.error("[Startup Health] Failed to log summary:", healthErr.message);
    }

    console.log(`[DeferredStartup] All phases complete — total deferred startup: ${Date.now() - deferredStart}ms`);
  });
}

function setupGracefulShutdown() {
  let shuttingDown = false;
  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`[Shutdown] Received ${signal}, cleaning up interval timers...`);
    try {
      const { stopMemoryMonitor } = await import("./memory-monitor");
      stopMemoryMonitor();
    } catch {}
    try {
      const { stopMemoryTrendTracking } = await import("./memory-observability");
      stopMemoryTrendTracking();
    } catch {}
    try {
      const { stopJobQueueWorker } = await import("./job-queue");
      stopJobQueueWorker();
    } catch {}
    try {
      const { stopAIHealthChecks } = await import("./ai-provider-router");
      stopAIHealthChecks();
    } catch {}
    try {
      const { stopQBankScheduler } = await import("./qbank-scheduler");
      stopQBankScheduler();
    } catch {}
    try {
      const { stopAlertingEngine } = await import("./alerting-engine");
      stopAlertingEngine();
    } catch {}
    try {
      const { stopSyntheticMonitoring } = await import("./synthetic-monitoring");
      stopSyntheticMonitoring();
    } catch {}
    try {
      const { stopPostPublishAudit } = await import("./content-integrity-audit");
      stopPostPublishAudit();
    } catch {}
    console.log("[Shutdown] All interval timers cleared");
    process.exit(0);
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

setupGracefulShutdown();