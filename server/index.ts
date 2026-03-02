import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { registerAlliedPipelineRoutes } from "./allied-pipeline";
import { registerAutomationRoutes } from "./allied-automations";
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

import { alliedDetectionMiddleware, hostRedirectMiddleware, isAlliedHost } from "./allied-middleware";
app.use(alliedDetectionMiddleware);
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
  if (!appReady && req.path === "/" && req.method === "GET") {
    return res.status(200).send("<!DOCTYPE html><html><head><meta http-equiv='refresh' content='2'></head><body>Loading...</body></html>");
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
          const { Pool } = await import("pg");
          const dbPool = new Pool({ connectionString: process.env.DATABASE_URL });
          await dbPool.query(
            `UPDATE flashcard_decks SET is_upgraded = true, upgraded_at = NOW(), stripe_payment_intent_id = $1 WHERE id = $2 AND owner_id = $3`,
            [evt.data.object.payment_intent || evt.data.object.id, meta.deckId, meta.userId]
          );
          await dbPool.end();
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
  res.setHeader("Cache-Control", "public, max-age=86400");
  if (req.isAllied) {
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
        "Disallow: /profile",
        "Disallow: /subscription/success",
        "",
        `Sitemap: ${base}/sitemap.xml`,
        `Sitemap: ${base}/sitemap_index.xml`,
        "",
      ].join("\n"),
    );
  }
});

function getSiteBase(): string {
  return "https://www.nursenest.ca";
}

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
      const altHref = `${base}/${alt}${path === "/" ? "" : path}`;
      lines.push(`<xhtml:link rel="alternate" hreflang="${alt}" href="${altHref}"/>`);
    }
    lines.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${base}/en${path === "/" ? "" : path}"/>`);
    lines.push(`</url>`);
  }
  return lines.join("\n");
}

app.get("/sitemap.xml", async (_req, res) => {
  const base = getSiteBase();
  const today = new Date().toISOString().split("T")[0];

  const entries: string[] = [];
  const locales = SUPPORTED_LOCALES;

  entries.push(sitemapUrl(base, "/", "1.0", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/lessons", "0.9", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/flashcards", "0.8", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/pricing", "0.8", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/start-free", "0.9", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/anatomy", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/med-math", "0.8", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/lab-values", "0.8", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/mock-exams", "0.8", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/clinical-clarity", "0.8", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/case-simulations", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/first-action-simulator", "0.8", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/safety-hazard-simulator", "0.8", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/iv-complications-simulator", "0.8", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/electrolyte-abg-simulator", "0.8", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/deteriorating-patient-simulator", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/blood-transfusion-simulator", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/medication-mastery", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/blog", "0.7", "daily", locales, today));
  entries.push(sitemapUrl(base, "/pre-nursing", "0.6", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/question-of-the-day", "0.9", "daily", locales, today));
  entries.push(sitemapUrl(base, "/question-bank", "0.8", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/lectures", "0.7", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/simulators/clinical-skills", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/simulators/osce", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/simulators/clinical-lab", "0.7", "monthly", locales, today));
  entries.push(sitemapUrl(base, "/contact", "0.4", "yearly", locales));
  entries.push(sitemapUrl(base, "/faq", "0.5", "monthly", locales));
  entries.push(sitemapUrl(base, "/terms", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/privacy", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/disclaimer", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/refund-policy", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/feedback", "0.4", "monthly", locales));
  entries.push(sitemapUrl(base, "/nclex-rn-practice-questions", "0.9", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/nclex-pn-practice-questions", "0.9", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/rex-pn-practice-questions", "0.9", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/np-exam-practice-questions", "0.9", "weekly", locales, today));
  entries.push(sitemapUrl(base, "/free-practice", "0.9", "weekly", locales, today));

  const lessonIds = [
    "mi-management-np","shock-syndromes-np","sepsis-mastery-np","siadh-di-np","aaa-rupture-np","dka-hhns-np","increased-icp-np","copd-exacerbation-np","aki-management-np","tumor-lysis-np","transfusion-reactions-np","wound-vac-np","hellp-syndrome-np","amniotic-fluid-embolism-np","eclampsia-np","obstetric-hemorrhage-np","neonatal-rds-np","neonatal-hie-np","persistent-pulm-htn-np","neonatal-abstinence-np","central-line-np","lumbar-puncture-np","abg-sampling-np","mechanical-vent-np","head-to-toe-rpn","vital-signs-assessment","pain-assessment-rpn","gcs-assessment-rpn","braden-scale-rpn","comprehensive-health-assessment","primary-survey-rn","nih-stroke-scale","sepsis-screening-rn","comprehensive-hpi-np","differential-diagnosis-np","ecg-advanced-np","sofa-apache-np","point-of-care-us-np","aaa-rupture","mi-management","hf-advanced","pe-recognition","infective-endocarditis","peripheral-artery-disease","aortic-dissection","carotid-endarterectomy","cardiovascular-rpn","cardiovascular-rn","cardiovascular-np","chf-basics","mi-acute","hypertension-management","cardiac-monitoring","cardiac-rhythm-rn","cardiac-auscultation-rn","cardiogenic-shock","pe-dvt","pacemaker-care","abcs-life-threats","unstable-vs-stable","who-to-see-first","delegation-rules-scope","sbar-escalation","post-op-prioritization","shock-syndromes","sepsis-mastery","burn-management","compartment-syndrome","malignant-hyperthermia","siadh-di","hypothyroidism-basics","adrenal-insufficiency","np-testbank-advanced-assessment","np-testbank-prescribing","np-testbank-differential-diagnosis","np-testbank-emergency-management","rn-testbank-cardiovascular","rn-testbank-respiratory","rn-testbank-neuro","rn-testbank-critical-care","rn-testbank-pharmacology","rn-testbank-maternal-child","rpn-testbank-cardiovascular","rpn-testbank-respiratory","rpn-testbank-neuro","rpn-testbank-endocrine","rpn-testbank-renal","rpn-testbank-safety","rpn-testbank-maternity","rpn-testbank-mental-health","nursing-process-adpie","vital-signs-red-flags","medication-administration-safety","infection-prevention-ppe","documentation-sbar-dar","fluid-balance-assessment","gi-bleed","acute-abdomen","ibs-basics","peptic-ulcer","ulcerative-colitis","ercp-egd","dumping-syndrome","bariatric-surgery","portal-hypertension","esophageal-varices","crohns-disease","h2-receptor-antagonists","proton-pump-inhibitors","hepatic-encephalopathy-meds","all-leukemia","aml-leukemia","sickle-cell","hand-hygiene","ppe-basics","isolation-precautions-rpn","sterile-technique","airborne-precautions","droplet-precautions","fetal-monitoring-advanced","prenatal-basics","labor-stages","postpartum-basics","breastfeeding-basics","placenta-previa-abruption","postpartum-hemorrhage","gestational-diabetes","fetal-monitoring-rn","postpartum-depression-care","newborn-assessment","neonatal-thermoreg","neonatal-feeding","neonatal-jaundice-basics","neonatal-respiratory-distress","neonatal-sepsis","nec-necrotizing","neuro-basics","cp-management","increased-icp","stroke-advanced","seizure-safety","neuritis-neuropathy","betamethasone-dexamethasone","opioid-analgesics-ob","prostaglandins-ob","oxytocin-ob","pph-medications","rh-immune-globulin","rubella-vaccine","lung-surfactants","eye-prophylaxis-newborn","hep-b-vaccine-newborn","kawasaki-critical","congenital-heart","pyloric-intussusception","adhd-basics","separation-anxiety","lead-poisoning","dehydration-peds","hip-dysplasia","foreign-body-aspiration","herbals-safety","electrolyte-safety","cardiac-meds","anticoagulant-safety","insulin-safety","lithium-toxicity","factor-xa-inhibitors","vitals-assessment","wound-care-basics","ngtube-care","iv-therapy","blood-transfusion","chest-tube-mgmt","trach-care","osteoporosis-basics","scoliosis-basics","inhaled-spacers","meds-to-infants","cleansing-enemas","wound-irrigation","vac-dressing","hemodialysis-care","fracture-sprain-care","aki-management","ckd-management","av-fistula","dialysis-steal","copd-exacerbation","asthma-emergency","peds-respiratory","epiglottitis-peds","ards-management","active-tb","osa-management","respiratory-rpn","respiratory-rn","respiratory-np","asthma-copd","pneumonia-basics","abg-basics","abg-interpretation-rn","chest-tube-care","oxygen-therapy","tracheostomy-care","pressure-injury","tinea-corporis","oral-candidiasis","cdiff-basics","pertussis-basics","atopic-dermatitis","head-lice","diaper-candidiasis",
    "stroke"
  ];
  const uniqueLessonIds = [...new Set(lessonIds)];
  for (const id of uniqueLessonIds) {
    entries.push(sitemapUrl(base, `/lessons/${id}`, "0.7", "monthly", locales, today));
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
    entries.push(sitemapUrl(base, `/clinical-clarity/${slug}`, "0.6", "monthly", locales, today));
  }

  try {
    const blogTypes = ["blog", "blog-post", "article"];
    const publishedContent = await storage.getPublishedContent();
    const blogPosts = publishedContent.filter((item) => blogTypes.includes(item.type || "") && item.slug);
    for (const post of blogPosts) {
      const lastmod = post.updatedAt ? new Date(post.updatedAt).toISOString().split("T")[0] : (post.publishedAt ? new Date(post.publishedAt).toISOString().split("T")[0] : today);
      entries.push(sitemapUrl(base, `/learn/${post.slug}`, "0.6", "weekly", locales, lastmod));
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

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
});

app.get("/sitemap_index.xml", async (_req, res) => {
  const base = getSiteBase();
  const today = new Date().toISOString().split("T")[0];
  const sitemaps = SUPPORTED_LOCALES.map(locale =>
    `<sitemap><loc>${base}/sitemap-${locale}.xml</loc><lastmod>${today}</lastmod></sitemap>`
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.join("\n")}\n</sitemapindex>`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
});

import { generateAlliedSitemap } from "./allied-middleware";
app.get("/sitemap-allied.xml", (_req, res) => {
  const alliedBase = "https://allied.nursenest.ca";
  const xml = generateAlliedSitemap(alliedBase);
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
});

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
    import("./seed-study-decks").then(async ({ seedStudyDecks }) => {
      const pg = await import("pg");
      const p = new pg.Pool({ connectionString: process.env.DATABASE_URL });
      seedStudyDecks(p).catch((e: any) => console.error("[Seed] Failed:", e.message));
      import("./seed-seo-clusters").then(({ seedSEOClusters }) => {
        seedSEOClusters(p).catch((e: any) => console.error("[SEO Seed] Failed:", e.message));
      });
    });
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