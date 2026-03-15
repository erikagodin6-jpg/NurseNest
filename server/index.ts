import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { registerAlliedPipelineRoutes } from "./allied-pipeline";
import { registerAutomationRoutes } from "./allied-automations";
import { registerAiJobsRoutes } from "./ai-jobs-routes";
import { registerSocialContentRoutes } from "./social-content-automation";
import { registerScenarioRoutes } from "./allied-scenarios";
import { registerParamedicBulkUploadRoutes } from "./paramedic-bulk-upload";
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
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

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
  const pathPart = queryStart >= 0 ? cleanUrl.substring(0, queryStart) : cleanUrl;
  const queryPart = queryStart >= 0 ? cleanUrl.substring(queryStart) : "";

  if (pathPart.length > 1 && pathPart.endsWith("/")) {
    cleanUrl = pathPart.replace(/\/+$/, "") + queryPart;
    needsRedirect = true;
  }

  if (needsRedirect) {
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

const LEARN_REDIRECTS: Record<string, string> = {
  "oxygenation-vs-ventilation-critical-differences": "oxygenation-vs-ventilation-clinical-distinction",
  "create-more-posts-about-hyperkalemia": "hyperkalemia-nursing-guide",
  "test-publish-flow-1772145129698": "",
};

app.use((req, res, next) => {
  const match = req.path.match(/^(?:\/[a-z]{2,3})?\/learn\/([^/]+)\/?$/);
  if (match) {
    const slug = match[1];
    if (slug in LEARN_REDIRECTS) {
      const target = LEARN_REDIRECTS[slug];
      if (target) {
        const locale = req.path.match(/^\/([a-z]{2,3})\/learn\//)?.[1] || "en";
        return res.redirect(301, `/${locale}/learn/${target}`);
      }
      return res.redirect(301, "/en/blog");
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

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});
const httpServer = createServer(app);

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

      // With express.raw(), req.body should be a Buffer
      if (!Buffer.isBuffer(req.body)) {
        console.error("STRIPE WEBHOOK ERROR: req.body is not a Buffer");
        return res.status(500).json({ error: "Webhook processing error" });
      }

      await WebhookHandlers.processWebhook(req.body as Buffer, sig);

      const bodyStr = req.body.toString("utf8");
      try {
        const evt = JSON.parse(bodyStr);

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
            console.log(`[Webhook] Subscription activated: user ${meta.userId}, tier ${isAdmin ? 'admin (preserved)' : meta.tier}, sub ${subscriptionId}`);
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
          if (userId && !sub?.metadata?.isTrial) {
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
            }
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
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

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
  const debugLocales = ["en", "fr", "es", "fil", "hi", "zh", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa"];
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
const SUPPORTED_LOCALES = ["en", "fr", "es", "fil", "hi", "zh", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa"];
const SUPPORTED_LOCALES_SET = new Set(SUPPORTED_LOCALES);

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
    return res.redirect(301, `/en${restPath}${query}`);
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
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json.bind(res);
  res.json = ((bodyJson: any, ...args: any[]) => {
    capturedJsonResponse = bodyJson;
    return originalResJson(bodyJson, ...args);
  }) as any;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        const body = JSON.stringify(capturedJsonResponse);
        logLine += ` :: ${body.length > 500 ? body.slice(0, 500) + "…" : body}`;
      }
      log(logLine);
    }
  });

  next();
});

// -------------------------
// Bootstrap server
// -------------------------
(async () => {
  await initStripe();

  registerAlliedPipelineRoutes(app);
  registerAutomationRoutes(app);
  registerAiJobsRoutes(app);
  registerSocialContentRoutes(app);
  registerScenarioRoutes(app);
  registerParamedicBulkUploadRoutes(app);

  const { registerScheduleRoutes } = await import("./qbank-scheduler");
  registerScheduleRoutes(app);

  const { setupAiOpsRoutes } = await import("./ai-ops-routes");
  setupAiOpsRoutes(app);

  const { loadProviders } = await import("./ai-provider-router");
  loadProviders().catch(err => console.error("[AIRouter] Init failed:", err.message));

  const { setupQBankGenerator } = await import("./qbank-generator");
  setupQBankGenerator(app);

  const { setupContentExpansionRoutes } = await import("./content-expansion-job");
  setupContentExpansionRoutes(app);

  const { setupClinicalVignetteRoutes } = await import("./clinical-vignette-generator");
  setupClinicalVignetteRoutes(app);

  const { setupTrialRoutes } = await import("./trial");
  setupTrialRoutes(app);

  const { setupTrialSubscriptionRoutes } = await import("./trial-subscription");
  setupTrialSubscriptionRoutes(app);

  const { setupStudyPathRoutes } = await import("./study-path");
  setupStudyPathRoutes(app);

  const { setupJobQueueRoutes, startJobQueueWorker } = await import("./job-queue");
  setupJobQueueRoutes(app);

  const { setupAutopilotRoutes } = await import("./autopilot");
  setupAutopilotRoutes(app);

  const { setupContentCoverageRoutes } = await import("./content-coverage");
  setupContentCoverageRoutes(app);

  startJobQueueWorker();

  const { setupLessonContentRoutes } = await import("./lesson-content-api");
  setupLessonContentRoutes(app);

  const { setupSeoEngineRoutes } = await import("./seo-engine");
  setupSeoEngineRoutes(app);

  const { registerNursingContentHubRoutes } = await import("./nursing-content-hub");
  registerNursingContentHubRoutes(app);

  const { registerParamedicSeoRoutes } = await import("./paramedic-seo");
  registerParamedicSeoRoutes(app);

  const { setupQBankRoutes } = await import("./qbank-api");
  setupQBankRoutes(app);

  const { loadStripePrices } = await import("./stripe-pricing");
  loadStripePrices();

  const { validateStripeConnection } = await import("./stripeClient");
  const stripeValid = await validateStripeConnection();
  if (!stripeValid) {
    console.error("[STARTUP] WARNING: Stripe connection validation failed — checkout will not work until the key is fixed");
  }

  // Seed/upsert pricing plans from pricing-config.ts on startup
  const { seedPricingPlans } = await import("./seed-pricing-plans");
  await seedPricingPlans();

  // Register the rest of your app routes
  await registerRoutes(httpServer, app);

  // Central error handler
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

  // Vite dev / static prod
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  appReady = true;

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.keepAliveTimeout = 65000;
  httpServer.headersTimeout = 66000;
  httpServer.timeout = 30000;
  httpServer.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`serving on port ${port}`);

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

    // AI schedulers disabled — all AI generation is now admin-triggered via /admin/ai-jobs
    // import("./content-scheduler").then(({ startContentScheduler }) => startContentScheduler());
    // import("./qbank-scheduler").then(({ startQBankScheduler }) => startQBankScheduler());
    import("./reporting-scheduler").then(({ startReportingScheduler }) => startReportingScheduler())
      .catch((e: any) => console.error("[ReportingScheduler] Init failed:", e.message));
    import("./prompts/qbank-templates").then(({ seedPromptTemplates }) => seedPromptTemplates().catch((e: any) => console.error("[QBank Templates] Seed failed:", e.message)));
    import("./seed-study-decks").then(async ({ seedStudyDecks }) => {
      const { getDevPool } = await import("./db");
      const p = getDevPool();
      seedStudyDecks(p).catch((e: any) => console.error("[Seed] Failed:", e.message));
      import("./seed-seo-clusters").then(({ seedSEOClusters }) => {
        seedSEOClusters(p).catch((e: any) => console.error("[SEO Seed] Failed:", e.message));
      });
      import("./seed-paramedic-content").then(({ seedParamedicContent }) => {
        seedParamedicContent(p).catch((e: any) => console.error("[Paramedic Seed] Failed:", e.message));
      });
      import("./seed-paramedic-questions").then(({ seedParamedicQuestions }) => {
        seedParamedicQuestions().catch((e: any) => console.error("[Paramedic Q-Seed] Failed:", e.message));
      });
    });

    import("./seed-emergency-nursing-tox-disaster").then(({ seedEmergencyNursingToxDisaster }) => {
      seedEmergencyNursingToxDisaster().catch((e: any) => console.error("[EN-ToxDisaster] Failed:", e.message));
    });

    import("./ensure-schema").then(async ({ ensureSchemaSync }) => {
      const { pool: schemaPool } = await import("./storage");
      await ensureSchemaSync(schemaPool);
    }).catch((e: any) => console.error("[SchemaSync] Import failed:", e.message));

    import("./startup-data-migrations").then(({ runStartupDataMigrations }) => {
      runStartupDataMigrations().catch((e: any) => console.error("[Startup Migrations] Failed:", e.message));
    }).catch((e: any) => console.error("[Startup Migrations] Import failed:", e.message));

    import("./seed-rn-questions-docx").then(async ({ seedRNQuestionsFromDocx }) => {
      const result = await seedRNQuestionsFromDocx();
      console.log(`[DocxSeed] Total: ${result.total}, Inserted: ${result.inserted}, Skipped: ${result.skipped}, Errors: ${result.errors}`);
    }).catch((e: any) => console.error("[DocxSeed] Import failed:", e.message));

    import("./seed-exam-questions").then(async ({ seedExamQuestions }) => {
      const { pool: seedPool } = await import("./storage");
      await seedExamQuestions(seedPool).catch((e: any) => console.error("[ExamSeed] Failed:", e.message));
      await import("./seed-rrt-questions").then(({ seedRRTQuestions }) => seedRRTQuestions(seedPool)).catch((e: any) => console.error("[RRTSeed] Failed:", e.message));
      await import("./seed-cat-flashcards").then(({ seedCatFlashcards }) => seedCatFlashcards(seedPool)).catch((e: any) => console.error("[CATFlashcards] Failed:", e.message));
      await import("./exam-flashcard-mapper").then(async ({ mapExamQuestionsToFlashcards }) => {
        const result = await mapExamQuestionsToFlashcards();
        console.log(`[ExamFlashcardMapper] Synced: ${result.inserted} inserted, ${result.updated} updated, ${result.skipped} skipped`);
      }).catch((e: any) => console.error("[ExamFlashcardMapper] Failed:", e.message));
      await import("./seed-digital-products").then(({ seedDigitalProducts }) => seedDigitalProducts(seedPool)).catch((e: any) => console.error("[DigitalProductSeed] Failed:", e.message));
      await import("./encyclopedia-seed").then(({ seedEncyclopediaEntries }) => seedEncyclopediaEntries()).catch((e: any) => console.error("[EncyclopediaSeed] Failed:", e.message));
      await import("./seed-nursing-content-hub").then(({ seedNursingContentHub }) => seedNursingContentHub(seedPool)).catch((e: any) => console.error("[NursingHubSeed] Failed:", e.message));

      try {
        const tierCounts = await seedPool.query(
          `SELECT tier, COUNT(*)::int AS count FROM exam_questions WHERE status = 'published' GROUP BY tier ORDER BY tier`
        );
        const fbCounts = await seedPool.query(
          `SELECT status, COUNT(*)::int AS count FROM flashcard_bank GROUP BY status`
        ).catch(() => ({ rows: [] }));
        const deckCount = await seedPool.query(
          `SELECT COUNT(*)::int AS count FROM flashcard_decks`
        ).catch(() => ({ rows: [{ count: 0 }] }));
        const dpCounts = await seedPool.query(
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
    }).catch((e: any) => console.error("[ExamSeed] Import failed:", e.message));
  });

  // Scheduler loop
  setInterval(async () => {
    try {
      const count = await storage.publishScheduledContent();
      if (count > 0) log(`Scheduler: auto-published ${count} content item(s)`);
    } catch (err: any) {
      console.error("Scheduler error:", err?.message || err);
    }
  }, 60_000);
})();