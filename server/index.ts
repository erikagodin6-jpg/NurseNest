import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

import { runMigrations } from "stripe-replit-sync";
import { getStripeSync } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";
import { storage } from "./storage";

const app = express();

app.use(compression());

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
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
app.use(express.json());
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
app.get("/robots.txt", (_req, res) => {
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
      "",
    ].join("\n"),
  );
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
  entries.push(sitemapUrl(base, "/contact", "0.4", "yearly", locales));
  entries.push(sitemapUrl(base, "/faq", "0.5", "monthly", locales));
  entries.push(sitemapUrl(base, "/terms", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/privacy", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/disclaimer", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/refund-policy", "0.3", "yearly", locales));
  entries.push(sitemapUrl(base, "/feedback", "0.4", "monthly", locales));

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

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join("\n") +
    `\n</urlset>`;

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

  // Vite dev / static prod
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`serving on port ${port}`);
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