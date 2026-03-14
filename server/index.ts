import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { registerAlliedPipelineRoutes } from "./allied-pipeline";
import { registerAutomationRoutes } from "./allied-automations";
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
      } catch {}
      await WebhookHandlers.processWebhook(req.body as Buffer, sig);
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
// SEO: robots + sitemap + verification (before registerRoutes)
// -------------------------
app.get("/robots.txt", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  if (req.isNewGrad) {
    const newGradBase = "https://newgrad.nursenest.ca";
    res.type("text/plain").send(
      [
        "User-agent: *",
        "Allow: /",
        "",
        "Disallow: /admin",
        "Disallow: /api/",
        "Disallow: /account",
        "Disallow: /checkout",
        "",
        `Sitemap: ${newGradBase}/sitemap-newgrad.xml`,
        "",
      ].join("\n"),
    );
  } else if (req.isAllied) {
    const alliedBase = "https://allied.nursenest.ca";
    res.type("text/plain").send(
      [
        "User-agent: *",
        "Allow: /",
        "",
        "Disallow: /admin",
        "Disallow: /api/",
        "Disallow: /account",
        "Disallow: /checkout",
        "",
        `Sitemap: ${alliedBase}/sitemap-allied.xml`,
        `Sitemap: ${alliedBase}/sitemap-study-guides.xml`,
        `Sitemap: ${alliedBase}/sitemap-exam-tips.xml`,
        `Sitemap: ${alliedBase}/sitemap-clinical-scenarios.xml`,
        `Sitemap: ${alliedBase}/sitemap-practice-questions.xml`,
        `Sitemap: ${alliedBase}/sitemap-question-details.xml`,
        `Sitemap: ${alliedBase}/sitemap-flashcard-details.xml`,
        "",
      ].join("\n"),
    );
  } else {
    const base = getSiteBase();
    res.type("text/plain").send(
      [
        "User-agent: *",
        "Allow: /",
        "",
        "Disallow: /admin",
        "Disallow: /content-editor",
        "Disallow: /api/",
        "Disallow: /login",
        "Disallow: /register",
        "Disallow: /profile",
        "Disallow: /dashboard",
        "Disallow: /upgrade",
        "Disallow: /subscription/",
        "Disallow: /checkout",
        "Disallow: /account",
        "Disallow: /trial/",
        "Disallow: /diagnostic-assessment",
        "Disallow: /mock-exams/*/report",
        "Disallow: /feedback",
        "Disallow: /settings",
        "Disallow: /notes",
        "Disallow: /invite",
        "Disallow: /reset-password",
        "Disallow: /verify-email",
        "Disallow: /qbank/",
        "Disallow: /reports",
        "Disallow: /*?sort=",
        "Disallow: /*?filter=",
        "Disallow: /*?q=",
        "Disallow: /*?search=",
        "Disallow: /*?page=",
        "Disallow: /*?tab=",
        "Disallow: /*?ref=",
        "",
        "Crawl-delay: 1",
        "",
        `Sitemap: ${base}/sitemap.xml`,
        "",
      ].join("\n"),
    );
  }
});

function getSiteBase(): string {
  return "https://www.nursenest.ca";
}

import { getIndexableLocales, getHreflangCode } from "./translation-audit";

function sitemapUrl(base: string, path: string, priority: string, changefreq: string, locales: string[], lastmod?: string): string {
  const lines: string[] = [];
  for (const locale of locales) {
    const loc = `${base}/${locale}${path === "/" ? "" : path}`;
    lines.push(`<url>`);
    lines.push(`<loc>${loc}</loc>`);
    lines.push(`<priority>${priority}</priority>`);
    lines.push(`<changefreq>${changefreq}</changefreq>`);
    if (lastmod) lines.push(`<lastmod>${lastmod}</lastmod>`);
    for (const alt of locales) {
      const hreflang = getHreflangCode(alt);
      const altHref = `${base}/${alt}${path === "/" ? "" : path}`;
      lines.push(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${altHref}"/>`);
    }
    lines.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${base}/en${path === "/" ? "" : path}"/>`);
    lines.push(`</url>`);
  }
  return lines.join("\n");
}

let sitemapCache: { xml: string; builtAt: number } | null = null;
const SITEMAP_CACHE_TTL = 3600_000;

app.get("/sitemap.xml", async (_req, res) => {
  if (sitemapCache && Date.now() - sitemapCache.builtAt < SITEMAP_CACHE_TTL) {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    res.setHeader("X-Sitemap-Cache", "HIT");
    return res.status(200).send(sitemapCache.xml);
  }

  const base = getSiteBase();
  const today = new Date().toISOString().split("T")[0];

  const entries: string[] = [];
  const indexableLocales = getIndexableLocales();

  entries.push(sitemapUrl(base, "/", "1.0", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/lessons", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/flashcards", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/pricing", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/start-free", "0.9", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/anatomy", "0.7", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/med-math", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/lab-values", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/mock-exams", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/clinical-clarity", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/blog", "0.7", "daily", indexableLocales, today));
  entries.push(sitemapUrl(base, "/pre-nursing", "0.6", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/question-of-the-day", "0.9", "daily", indexableLocales, today));
  entries.push(sitemapUrl(base, "/question-bank", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/lectures", "0.7", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/nursing", "0.9", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/nursing-specialties", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/faq", "0.5", "monthly", indexableLocales));
  entries.push(sitemapUrl(base, "/about", "0.6", "monthly", indexableLocales));
  entries.push(sitemapUrl(base, "/contact", "0.4", "monthly", indexableLocales));
  entries.push(sitemapUrl(base, "/terms", "0.3", "yearly", indexableLocales));
  entries.push(sitemapUrl(base, "/privacy", "0.3", "yearly", indexableLocales));
  entries.push(sitemapUrl(base, "/nclex-rn-practice-questions", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/nclex-pn-practice-questions", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/rex-pn-practice-questions", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/np-exam-practice-questions", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/free-practice", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/practice-questions", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/glossary", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medication-mastery", "0.7", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/exam-prep", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/new-graduate-support", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/healthcare-careers", "0.9", "weekly", indexableLocales, today));

  const enOnly = ["en"];
  entries.push(sitemapUrl(base, "/case-simulations", "0.8", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/first-action-simulator", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/safety-hazard-simulator", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/iv-complications-simulator", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/electrolyte-abg-simulator", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/deteriorating-patient-simulator", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/blood-transfusion-simulator", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/simulators/clinical-skills", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/simulators/osce", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/simulators/clinical-lab", "0.7", "monthly", enOnly, today));
  entries.push(sitemapUrl(base, "/shop", "0.7", "weekly", enOnly, today));
  entries.push(sitemapUrl(base, "/disclaimer", "0.3", "yearly", enOnly));
  entries.push(sitemapUrl(base, "/refund-policy", "0.3", "yearly", enOnly));

  const comparePages = [
    "uworld-vs-archer-vs-nursenest",
    "best-uworld-alternatives-nclex",
    "best-rex-pn-question-bank-canada",
    "nursenest-vs-uworld",
    "nursenest-vs-archer",
    "nursenest-vs-quizlet",
    "best-nclex-prep-canada",
    "cheapest-nclex-prep",
    "rex-pn-practice-questions-free",
  ];
  for (const slug of comparePages) {
    entries.push(sitemapUrl(base, `/compare/${slug}`, "0.7", "monthly", indexableLocales, today));
  }

  entries.push(sitemapUrl(base, "/medical-imaging", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/canada", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/usa", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/blog", "0.8", "daily", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/canada/lessons", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/canada/positioning", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/canada/physics", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/canada/flashcards", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/canada/practice-exams", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/canada/exam-simulator", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/usa/lessons", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/usa/positioning", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/usa/physics", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/usa/flashcards", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/usa/practice-exams", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/medical-imaging/usa/exam-simulator", "0.8", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/radiography-practice-questions", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/radiography-positioning-guide", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/radiography-artifact-recognition", "0.9", "weekly", indexableLocales, today));

  try {
    const { pool: sitemapPool } = await import("./storage");
    const seoPages = await sitemapPool.query(
      `SELECT slug, country, updated_at FROM imaging_seo_pages WHERE status = 'published' ORDER BY updated_at DESC LIMIT 500`
    ).catch(() => ({ rows: [] }));
    for (const page of seoPages.rows) {
      const lastmod = page.updated_at ? new Date(page.updated_at).toISOString().split("T")[0] : today;
      entries.push(sitemapUrl(base, `/medical-imaging/${page.country}/seo/${page.slug}`, "0.7", "weekly", indexableLocales, lastmod));
    }
    const blogArticles = await sitemapPool.query(
      `SELECT slug, updated_at FROM imaging_blog_articles WHERE status = 'published' ORDER BY updated_at DESC LIMIT 500`
    ).catch(() => ({ rows: [] }));
    for (const article of blogArticles.rows) {
      const lastmod = article.updated_at ? new Date(article.updated_at).toISOString().split("T")[0] : today;
      entries.push(sitemapUrl(base, `/medical-imaging/blog/${article.slug}`, "0.7", "weekly", indexableLocales, lastmod));
    }
    const posEntries = await sitemapPool.query(
      `SELECT slug, country, updated_at FROM imaging_positioning_entries WHERE status = 'published' ORDER BY updated_at DESC LIMIT 500`
    ).catch(() => ({ rows: [] }));
    for (const entry of posEntries.rows) {
      const lastmod = entry.updated_at ? new Date(entry.updated_at).toISOString().split("T")[0] : today;
      entries.push(sitemapUrl(base, `/medical-imaging/${entry.country}/positioning/${entry.slug}`, "0.7", "monthly", indexableLocales, lastmod));
    }
  } catch (e) {
    console.error("Imaging sitemap error:", e);
  }

  entries.push(sitemapUrl(base, "/perioperative-nursing", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/preoperative-care", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/preoperative-nursing-guide", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/perioperative-nurse-career", "0.7", "monthly", indexableLocales, today));

  entries.push(sitemapUrl(base, "/nclex-rn/mock-exam", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/nclex-pn/mock-exam", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/rex-pn/mock-exam", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/canada-np/mock-exam", "0.9", "weekly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/us-np/mock-exam", "0.9", "weekly", indexableLocales, today));

  entries.push(sitemapUrl(base, "/nclex-rn", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/nclex-pn", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/canada-np", "0.8", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/us-np", "0.8", "monthly", indexableLocales, today));

  entries.push(sitemapUrl(base, "/topics", "0.8", "weekly", indexableLocales, today));
  const topicSlugs = Object.keys((await import("../client/src/data/internal-links")).internalLinkMap);
  for (const slug of topicSlugs) {
    entries.push(sitemapUrl(base, `/topics/${slug}`, "0.7", "monthly", indexableLocales, today));
  }

  const seoConditions = ["hypertension", "diabetes", "asthma", "copd", "heart-failure", "sepsis", "pneumonia"];
  for (const c of seoConditions) {
    entries.push(sitemapUrl(base, `/conditions/${c}`, "0.8", "monthly", indexableLocales, today));
  }

  const seoMedications = ["metformin", "lisinopril", "warfarin", "insulin", "amiodarone"];
  for (const m of seoMedications) {
    entries.push(sitemapUrl(base, `/medications/${m}`, "0.8", "monthly", indexableLocales, today));
  }

  const seoLabValues = ["sodium", "potassium", "troponin", "creatinine", "inr"];
  for (const l of seoLabValues) {
    entries.push(sitemapUrl(base, `/lab-values/${l}`, "0.8", "monthly", indexableLocales, today));
  }

  const glossaryTermSlugs = [
    "auscultation","blood-pressure","bradycardia","tachycardia","cardiac-output","stroke-volume","preload","afterload",
    "myocardial-infarction","heart-failure","pulmonary-embolism","deep-vein-thrombosis","atrial-fibrillation","sinus-rhythm",
    "st-elevation","qrs-complex","p-wave","t-wave","ventricular-tachycardia","ventricular-fibrillation",
    "hemoglobin","hematocrit","potassium","sodium","calcium","magnesium","bun","creatinine","inr","troponin","abg",
    "metabolic-acidosis","metabolic-alkalosis","respiratory-acidosis","respiratory-alkalosis",
    "anaphylaxis","sepsis","septic-shock","diabetic-ketoacidosis","siadh","diabetes-insipidus",
    "pneumothorax","copd","asthma","stroke","increased-intracranial-pressure",
    "glasgow-coma-scale","apgar-score","braden-scale","pain-assessment","sbar","head-to-toe-assessment","vital-signs","pulse-oximetry",
    "epinephrine","warfarin","heparin","digoxin","ace-inhibitors","beta-blockers","nitroglycerin","insulin","morphine","naloxone",
    "dopamine","furosemide","amiodarone",
    "foley-catheter","nasogastric-tube","central-line","lumbar-puncture","tracheostomy","chest-tube","blood-transfusion",
    "wound-vac","mechanical-ventilation","endotracheal-intubation","iv-insertion","sterile-technique",
    "atelectasis","pleural-effusion","acute-kidney-injury","cirrhosis","pancreatitis",
    "hypothyroidism","hyperthyroidism","addison-disease","cushing-syndrome","compartment-syndrome",
    "malignant-hyperthermia","dic","tumor-lysis-syndrome","eclampsia","hellp-syndrome",
    "placenta-previa","abruptio-placentae","neonatal-respiratory-distress-syndrome",
    "delegation","nursing-process","informed-consent","alveoli","diaphragm",
    "sinoatrial-node","atrioventricular-node","nephron","glomerular-filtration-rate",
    "cerebral-perfusion-pressure","myelin-sheath","peritoneum","hemostasis",
    "wbc-count","platelet-count","albumin","lactate","prothrombin-time","aptt",
    "cardiogenic-shock","hypovolemic-shock","distributive-shock","infective-endocarditis",
    "aortic-dissection","peripheral-artery-disease","autonomic-dysreflexia","rhabdomyolysis",
    "guillain-barre-syndrome","meningitis","burns-classification","pacemaker","defibrillation",
    "cardioversion","arterial-blood-gas-sampling","incentive-spirometry","suctioning",
  ];
  for (const slug of glossaryTermSlugs) {
    entries.push(sitemapUrl(base, `/glossary/${slug}`, "0.5", "monthly", indexableLocales, today));
  }

  const nursingQuestionTiers = ["rpn", "rn", "np"];
  for (const tier of nursingQuestionTiers) {
    entries.push(sitemapUrl(base, `/${tier}/questions`, "0.8", "weekly", indexableLocales, today));
  }

  entries.push(sitemapUrl(base, "/how-to-become-a-nurse/rpn", "0.7", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/how-to-become-a-nurse/rn", "0.7", "monthly", indexableLocales, today));
  entries.push(sitemapUrl(base, "/how-to-become-a-nurse/np", "0.7", "monthly", indexableLocales, today));

  try {
    const { pool: nursingPool } = await import("./storage");
    const nursingTopicResult = await nursingPool.query(
      `SELECT DISTINCT tier, topic FROM exam_questions WHERE status = 'published' AND topic IS NOT NULL AND topic != '' AND tier IN ('rpn', 'rn', 'np') ORDER BY topic`
    ).catch(() => ({ rows: [] }));

    const seenSlugs = new Set<string>();
    for (const row of nursingTopicResult.rows) {
      const slug = row.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const key = `${row.tier}/${slug}`;
      if (slug && !seenSlugs.has(key)) {
        seenSlugs.add(key);
        entries.push(sitemapUrl(base, `/${row.tier}/questions/${slug}`, "0.7", "weekly", indexableLocales, today));
      }
    }
  } catch (e) {
    console.error("Nursing question topics sitemap error:", e);
  }

  const practiceQuestionCombos = [
    { tier: "rpn", systems: ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "endocrine", "renal", "pharmacology", "hematology", "maternal", "pediatric", "mental-health", "musculoskeletal", "assessment"] },
    { tier: "rn", systems: ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "endocrine", "renal", "pharmacology", "hematology", "maternal", "pediatric", "mental-health", "musculoskeletal", "assessment"] },
    { tier: "np", systems: ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "endocrine", "renal", "pharmacology", "hematology", "assessment"] },
  ];
  for (const combo of practiceQuestionCombos) {
    for (const system of combo.systems) {
      entries.push(sitemapUrl(base, `/practice-questions/${combo.tier}/${system}`, "0.8", "weekly", indexableLocales, today));
    }
  }

  const lessonIds = [
    "mi-management-np","shock-syndromes-np","sepsis-mastery-np","siadh-di-np","aaa-rupture-np","dka-hhns-np","increased-icp-np","copd-exacerbation-np","aki-management-np","tumor-lysis-np","transfusion-reactions-np","wound-vac-np","hellp-syndrome-np","amniotic-fluid-embolism-np","eclampsia-np","obstetric-hemorrhage-np","neonatal-rds-np","neonatal-hie-np","persistent-pulm-htn-np","neonatal-abstinence-np","central-line-np","lumbar-puncture-np","abg-sampling-np","mechanical-vent-np","head-to-toe-rpn","vital-signs-assessment","pain-assessment-rpn","gcs-assessment-rpn","braden-scale-rpn","comprehensive-health-assessment","primary-survey-rn","nih-stroke-scale","sepsis-screening-rn","comprehensive-hpi-np","differential-diagnosis-np","ecg-advanced-np","sofa-apache-np","point-of-care-us-np","aaa-rupture","mi-management","hf-advanced","pe-recognition","infective-endocarditis","peripheral-artery-disease","aortic-dissection","carotid-endarterectomy","cardiovascular-rpn","cardiovascular-rn","cardiovascular-np","chf-basics","mi-acute","hypertension-management","cardiac-monitoring","cardiac-rhythm-rn","cardiac-auscultation-rn","cardiogenic-shock","pe-dvt","pacemaker-care","abcs-life-threats","unstable-vs-stable","who-to-see-first","delegation-rules-scope","sbar-escalation","post-op-prioritization","shock-syndromes","sepsis-mastery","burn-management","compartment-syndrome","malignant-hyperthermia","siadh-di","hypothyroidism-basics","adrenal-insufficiency","np-testbank-advanced-assessment","np-testbank-prescribing","np-testbank-differential-diagnosis","np-testbank-emergency-management","rn-testbank-cardiovascular","rn-testbank-respiratory","rn-testbank-neuro","rn-testbank-critical-care","rn-testbank-pharmacology","rn-testbank-maternal-child","rpn-testbank-cardiovascular","rpn-testbank-respiratory","rpn-testbank-neuro","rpn-testbank-endocrine","rpn-testbank-renal","rpn-testbank-safety","rpn-testbank-maternity","rpn-testbank-mental-health","nursing-process-adpie","vital-signs-red-flags","medication-administration-safety","infection-prevention-ppe","documentation-sbar-dar","fluid-balance-assessment","gi-bleed","acute-abdomen","ibs-basics","peptic-ulcer","ulcerative-colitis","ercp-egd","dumping-syndrome","bariatric-surgery","portal-hypertension","esophageal-varices","crohns-disease","h2-receptor-antagonists","proton-pump-inhibitors","hepatic-encephalopathy-meds","all-leukemia","aml-leukemia","sickle-cell","hand-hygiene","ppe-basics","isolation-precautions-rpn","sterile-technique","airborne-precautions","droplet-precautions","fetal-monitoring-advanced","prenatal-basics","labor-stages","postpartum-basics","breastfeeding-basics","placenta-previa-abruption","postpartum-hemorrhage","gestational-diabetes","fetal-monitoring-rn","postpartum-depression-care","newborn-assessment","neonatal-thermoreg","neonatal-feeding","neonatal-jaundice-basics","neonatal-respiratory-distress","neonatal-sepsis","nec-necrotizing","neuro-basics","cp-management","increased-icp","stroke-advanced","seizure-safety","neuritis-neuropathy","betamethasone-dexamethasone","opioid-analgesics-ob","prostaglandins-ob","oxytocin-ob","pph-medications","rh-immune-globulin","rubella-vaccine","lung-surfactants","eye-prophylaxis-newborn","hep-b-vaccine-newborn","kawasaki-critical","congenital-heart","pyloric-intussusception","adhd-basics","separation-anxiety","lead-poisoning","dehydration-peds","hip-dysplasia","foreign-body-aspiration","herbals-safety","electrolyte-safety","cardiac-meds","anticoagulant-safety","insulin-safety","lithium-toxicity","factor-xa-inhibitors","vitals-assessment","wound-care-basics","ngtube-care","iv-therapy","blood-transfusion","chest-tube-mgmt","trach-care","osteoporosis-basics","scoliosis-basics","inhaled-spacers","meds-to-infants","cleansing-enemas","wound-irrigation","vac-dressing","hemodialysis-care","fracture-sprain-care","aki-management","ckd-management","av-fistula","dialysis-steal","copd-exacerbation","asthma-emergency","peds-respiratory","epiglottitis-peds","ards-management","active-tb","osa-management","respiratory-rpn","respiratory-rn","respiratory-np","asthma-copd","pneumonia-basics","abg-basics","abg-interpretation-rn","chest-tube-care","oxygen-therapy","tracheostomy-care","pressure-injury","tinea-corporis","oral-candidiasis","cdiff-basics","pertussis-basics","atopic-dermatitis","head-lice","diaper-candidiasis",
    "stroke"
  ];
  const uniqueLessonIds = [...new Set(lessonIds)];
  for (const id of uniqueLessonIds) {
    entries.push(sitemapUrl(base, `/lessons/${id}`, "0.7", "monthly", indexableLocales, today));
  }

  const clarityTopics = [
    "why-does-potassium-affect-the-heart",
    "why-does-blood-pressure-drop-during-sepsis",
    "why-do-patients-with-copd-retain-co2",
    "why-does-the-brain-swell-after-injury",
    "why-does-insulin-cause-hypokalemia",
    "why-does-liver-failure-cause-bleeding",
    "why-does-dehydration-cause-confusion",
    "why-does-dka-cause-fruity-breath",
    "why-do-opioids-cause-constipation",
    "why-does-preeclampsia-cause-seizures",
    "why-does-heart-failure-cause-edema",
    "why-does-anemia-cause-tachycardia",
    "why-does-pneumothorax-cause-tracheal-deviation",
    "why-does-hypothyroidism-cause-weight-gain",
    "why-does-diabetes-cause-peripheral-neuropathy",
    "why-does-immobility-cause-deep-vein-thrombosis",
    "why-does-hyperglycemia-cause-polyuria",
    "why-does-copd-cause-barrel-chest",
    "why-does-pancreatitis-cause-hypocalcemia",
    "why-does-cirrhosis-cause-ascites",
    "why-do-burns-cause-hyperkalemia",
    "why-does-a-stroke-cause-dysphagia",
    "why-does-acute-kidney-injury-cause-metabolic-acidosis",
    "why-does-myocardial-infarction-cause-cardiogenic-shock",
    "why-does-hypoxia-cause-restlessness-before-drowsiness",
    "why-does-atrial-fibrillation-cause-stroke",
    "why-does-addisons-disease-cause-hyperpigmentation",
    "why-does-spinal-cord-injury-cause-autonomic-dysreflexia",
    "why-does-blood-transfusion-cause-hyperkalemia",
    "why-does-nephrotic-syndrome-cause-edema",
    "why-does-pyloric-stenosis-cause-metabolic-alkalosis",
    "why-does-cushing-syndrome-cause-moon-face",
    "why-does-iron-deficiency-cause-pica",
    "why-does-sickle-cell-crisis-cause-severe-pain",
    "why-does-magnesium-deficiency-worsen-hypokalemia",
    "why-does-meningitis-cause-neck-stiffness",
    "why-does-thyroid-storm-cause-hyperthermia",
    "why-does-calcium-affect-muscle-contraction",
    "why-does-massive-pe-cause-right-heart-failure",
    "why-does-rhabdomyolysis-cause-acute-kidney-injury",
    "why-does-guillain-barre-cause-ascending-paralysis",
  ];
  for (const slug of clarityTopics) {
    entries.push(sitemapUrl(base, `/clinical-clarity/${slug}`, "0.6", "monthly", indexableLocales, today));
  }

  try {
    const blogTypes = ["blog", "blog-post", "article"];
    const publishedContent = await storage.getPublishedContent();
    const blogPosts = publishedContent.filter((item) => {
      if (!blogTypes.includes(item.type || "") || !item.slug) return false;
      const contentLen = JSON.stringify(item.content || "").length;
      if (contentLen < 5000) return false;
      if (item.slug in LEARN_REDIRECTS) return false;
      return true;
    });
    for (const post of blogPosts) {
      const lastmod = post.updatedAt ? new Date(post.updatedAt).toISOString().split("T")[0] : (post.publishedAt ? new Date(post.publishedAt).toISOString().split("T")[0] : today);
      entries.push(sitemapUrl(base, `/learn/${post.slug}`, "0.6", "weekly", indexableLocales, lastmod));
    }
  } catch {}

  try {
    const { pool: dbPool } = await import("./storage");
    const seoPages = await dbPool.query(
      `SELECT slug, language_code, page_type, last_updated FROM seo_pages WHERE is_public = true AND is_indexable = true ORDER BY language_code, page_type DESC`
    );
    for (const page of seoPages.rows) {
      const priority = page.page_type === "pillar" ? "0.9" : "0.7";
      const lastmod = page.last_updated ? new Date(page.last_updated).toISOString().split("T")[0] : today;
      const pagePath = `/study-guide/${page.slug}`;
      entries.push(`<url>`);
      entries.push(`<loc>${base}/${page.language_code}${pagePath}</loc>`);
      entries.push(`<priority>${priority}</priority>`);
      entries.push(`<changefreq>weekly</changefreq>`);
      entries.push(`<lastmod>${lastmod}</lastmod>`);
      entries.push(`</url>`);
    }
  } catch {}

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join("\n") +
    `\n</urlset>`;

  sitemapCache = { xml, builtAt: Date.now() };

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.setHeader("X-Sitemap-Cache", "MISS");
  res.status(200).send(xml);
});

const SITEMAP_MAX_URLS = 45000;

async function getContentSitemapEntries(base: string, today: string, offset: number, limit: number): Promise<string[]> {
  const entries: string[] = [];
  const enOnly = ["en"];
  const { pool: dbPool } = await import("./storage");

  const seoArticles = await dbPool.query(
    `SELECT slug, updated_at, type, site_context, career_track FROM seo_articles WHERE status = 'published' ORDER BY updated_at DESC`
  ).catch(() => ({ rows: [] }));
  for (const article of seoArticles.rows) {
    const lastmod = article.updated_at ? new Date(article.updated_at).toISOString().split("T")[0] : today;
    const priority = article.type === "pillar" ? "0.9" : "0.7";
    const articlePath = article.site_context === "allied" && article.career_track
      ? `/allied/${article.slug}`
      : `/seo/${article.slug}`;
    entries.push(sitemapUrl(base, articlePath, priority, "weekly", enOnly, lastmod));
  }

  const practicePages = await dbPool.query(
    `SELECT slug, updated_at FROM practice_pages WHERE status = 'published' ORDER BY updated_at DESC`
  ).catch(() => ({ rows: [] }));
  for (const page of practicePages.rows) {
    const lastmod = page.updated_at ? new Date(page.updated_at).toISOString().split("T")[0] : today;
    entries.push(sitemapUrl(base, `/practice/${page.slug}`, "0.7", "weekly", enOnly, lastmod));
  }

  const blogClusters = await dbPool.query(
    `SELECT pillar_slug, updated_at FROM blog_clusters WHERE status = 'published' ORDER BY updated_at DESC`
  ).catch(() => ({ rows: [] }));
  for (const cluster of blogClusters.rows) {
    const lastmod = cluster.updated_at ? new Date(cluster.updated_at).toISOString().split("T")[0] : today;
    entries.push(sitemapUrl(base, `/blog/${cluster.pillar_slug}`, "0.8", "weekly", enOnly, lastmod));
  }

  const seoPages = await dbPool.query(
    `SELECT slug, language_code, page_type, last_updated FROM seo_pages WHERE is_public = true AND is_indexable = true ORDER BY last_updated DESC`
  ).catch(() => ({ rows: [] }));
  for (const page of seoPages.rows) {
    const priority = page.page_type === "pillar" ? "0.9" : "0.7";
    const lastmod = page.last_updated ? new Date(page.last_updated).toISOString().split("T")[0] : today;
    entries.push(`<url><loc>${base}/${page.language_code}/study-guide/${page.slug}</loc><priority>${priority}</priority><changefreq>weekly</changefreq><lastmod>${lastmod}</lastmod></url>`);
  }

  const lessonItems = await dbPool.query(
    `SELECT DISTINCT ON (slug) slug, updated_at FROM content_items WHERE type = 'lesson' AND status = 'published' ORDER BY slug, updated_at DESC`
  ).catch(() => ({ rows: [] }));
  const seenLessonSlugs = new Set<string>();
  for (const lesson of lessonItems.rows) {
    if (seenLessonSlugs.has(lesson.slug)) continue;
    seenLessonSlugs.add(lesson.slug);
    const lastmod = lesson.updated_at ? new Date(lesson.updated_at).toISOString().split("T")[0] : today;
    entries.push(sitemapUrl(base, `/lessons/${lesson.slug}`, "0.8", "weekly", enOnly, lastmod));
  }

  const programmaticPages = await dbPool.query(
    `SELECT slug, updated_at, career_track FROM programmatic_pages WHERE status = 'published' ORDER BY updated_at DESC`
  ).catch(() => ({ rows: [] }));
  for (const page of programmaticPages.rows) {
    const lastmod = page.updated_at ? new Date(page.updated_at).toISOString().split("T")[0] : today;
    entries.push(sitemapUrl(base, `/${page.slug}`, "0.6", "weekly", enOnly, lastmod));
  }

  return entries.slice(offset, offset + limit);
}

app.get("/sitemap-content.xml", async (_req, res) => {
  const base = getSiteBase();
  const today = new Date().toISOString().split("T")[0];

  try {
    const entries = await getContentSitemapEntries(base, today, 0, SITEMAP_MAX_URLS);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>`;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(xml);
  } catch (e) {
    console.error("Content sitemap error:", e);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(xml);
  }
});

app.get("/sitemap-content-:page.xml", async (req, res) => {
  const pageNum = parseInt(req.params.page);
  if (isNaN(pageNum) || pageNum < 2) return res.status(404).send("Not found");

  const base = getSiteBase();
  const today = new Date().toISOString().split("T")[0];
  const offset = (pageNum - 1) * SITEMAP_MAX_URLS;

  try {
    const entries = await getContentSitemapEntries(base, today, offset, SITEMAP_MAX_URLS);
    if (entries.length === 0) return res.status(404).send("Not found");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>`;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(xml);
  } catch (e) {
    console.error("Content sitemap page error:", e);
    res.status(500).send("Error generating sitemap");
  }
});

app.get("/sitemap_index.xml", async (_req, res) => {
  const base = getSiteBase();
  const today = new Date().toISOString().split("T")[0];
  const sitemaps: string[] = [
    `<sitemap><loc>${base}/sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    `<sitemap><loc>${base}/sitemap-content.xml</loc><lastmod>${today}</lastmod></sitemap>`,
  ];

  try {
    const allEntries = await getContentSitemapEntries(base, today, 0, 999999);
    const totalPages = Math.ceil(allEntries.length / SITEMAP_MAX_URLS);
    for (let i = 2; i <= totalPages; i++) {
      sitemaps.push(`<sitemap><loc>${base}/sitemap-content-${i}.xml</loc><lastmod>${today}</lastmod></sitemap>`);
    }
  } catch {}

  for (const locale of SUPPORTED_LOCALES) {
    sitemaps.push(`<sitemap><loc>${base}/sitemap-${locale}.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  }
  sitemaps.push(`<sitemap><loc>${base}/sitemap-allied.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/sitemap-newgrad.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/image-sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/sitemap-study-guides.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/sitemap-exam-tips.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/sitemap-clinical-scenarios.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/sitemap-practice-questions.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/sitemap-question-details.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  sitemaps.push(`<sitemap><loc>${base}/sitemap-flashcard-details.xml</loc><lastmod>${today}</lastmod></sitemap>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.join("\n")}\n</sitemapindex>`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
});

import { generateAlliedSitemap, generateNewGradSitemap, generateAlliedSitemapAsync } from "./allied-middleware";

app.get("/sitemap-newgrad.xml", (req, res) => {
  const newGradBase = "https://newgrad.nursenest.ca";
  const xml = generateNewGradSitemap(newGradBase);
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
});

app.get("/sitemap-allied.xml", async (req, res) => {
  if (!req.isAllied && process.env.NODE_ENV === "production") {
    return res.status(404).send("Not found");
  }
  const alliedBase = "https://allied.nursenest.ca";
  try {
    const xml = await generateAlliedSitemapAsync(alliedBase);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(xml);
  } catch {
    const xml = generateAlliedSitemap(alliedBase);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(xml);
  }
});

const programmaticSitemapTypes: Record<string, string> = {
  "sitemap-study-guides": "study-guide",
  "sitemap-exam-tips": "exam-tips",
  "sitemap-clinical-scenarios": "clinical-scenarios",
  "sitemap-practice-questions": "practice-questions",
  "sitemap-question-details": "question-detail",
  "sitemap-flashcard-details": "flashcard-detail",
};

for (const [xmlName, pageType] of Object.entries(programmaticSitemapTypes)) {
  app.get(`/${xmlName}.xml`, async (_req, res) => {
    try {
      const { pool } = await import("./storage");
      const result = await pool.query(
        "SELECT slug, updated_at FROM programmatic_pages WHERE page_type = $1 AND status = 'published' ORDER BY slug",
        [pageType]
      );
      const base = getSiteBase();
      const today = new Date().toISOString().split("T")[0];
      const urls = result.rows.map((row: any) => {
        const lastmod = row.updated_at ? new Date(row.updated_at).toISOString().split("T")[0] : today;
        return `<url><loc>${base}/${row.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`;
      });
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.status(200).send(xml);
    } catch {
      res.status(500).send("Error generating sitemap");
    }
  });
}

app.get("/sitemap-:lang.xml", async (req, res) => {
  const lang = req.params.lang;
  if (!SUPPORTED_LOCALES.includes(lang)) return res.status(404).send("Not found");
  const base = getSiteBase();
  const today = new Date().toISOString().split("T")[0];
  const entries: string[] = [];

  const coreRoutes = ["/", "/lessons", "/flashcards", "/pricing", "/start-free", "/mock-exams", "/clinical-clarity", "/blog", "/question-of-the-day", "/question-bank", "/faq", "/contact", "/nclex-rn-practice-questions", "/nclex-pn-practice-questions", "/rex-pn-practice-questions", "/np-exam-practice-questions"];
  for (const route of coreRoutes) {
    const loc = `${base}/${lang}${route === "/" ? "" : route}`;
    entries.push(`<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${today}</lastmod></url>`);
  }

  try {
    const { pool: dbPool } = await import("./storage");
    const seoPages = await dbPool.query(
      `SELECT slug, page_type, last_updated FROM seo_pages WHERE language_code = $1 AND is_public = true AND is_indexable = true ORDER BY page_type DESC`,
      [lang]
    );
    for (const page of seoPages.rows) {
      const priority = page.page_type === "pillar" ? "0.9" : "0.7";
      const lastmod = page.last_updated ? new Date(page.last_updated).toISOString().split("T")[0] : today;
      entries.push(`<url><loc>${base}/${lang}/study-guide/${page.slug}</loc><changefreq>weekly</changefreq><priority>${priority}</priority><lastmod>${lastmod}</lastmod></url>`);
    }
  } catch {}

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
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
    urlPath === "/sitemap.xml" ||
    urlPath === "/sitemap_index.xml" ||
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
  registerSocialContentRoutes(app);
  registerScenarioRoutes(app);
  registerParamedicBulkUploadRoutes(app);

  const { registerScheduleRoutes } = await import("./qbank-scheduler");
  registerScheduleRoutes(app);

  const { setupQBankGenerator } = await import("./qbank-generator");
  setupQBankGenerator(app);

  const { setupContentExpansionRoutes } = await import("./content-expansion-job");
  setupContentExpansionRoutes(app);

  const { setupClinicalVignetteRoutes } = await import("./clinical-vignette-generator");
  setupClinicalVignetteRoutes(app);

  const { setupTrialRoutes } = await import("./trial");
  setupTrialRoutes(app);

  const { setupStudyPathRoutes } = await import("./study-path");
  setupStudyPathRoutes(app);

  const { setupAutopilotRoutes } = await import("./autopilot");
  setupAutopilotRoutes(app);

  const { setupLessonContentRoutes } = await import("./lesson-content-api");
  setupLessonContentRoutes(app);

  const { setupSeoEngineRoutes } = await import("./seo-engine");
  setupSeoEngineRoutes(app);

  const { registerParamedicSeoRoutes } = await import("./paramedic-seo");
  registerParamedicSeoRoutes(app);

  const { setupQBankRoutes } = await import("./qbank-api");
  setupQBankRoutes(app);

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

    import("./content-scheduler").then(({ startContentScheduler }) => startContentScheduler());
    import("./qbank-scheduler").then(({ startQBankScheduler }) => startQBankScheduler());
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