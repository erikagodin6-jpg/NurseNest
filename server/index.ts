import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

import { runMigrations } from "stripe-replit-sync";
import { getStripeSync } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";
import { storage } from "./storage";

const app = express();
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
// SEO: robots + sitemap (before registerRoutes)
// -------------------------
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /admin",
      "Disallow: /api/",
      "Sitemap: https://www.nursenest.ca/sitemap.xml",
      "",
    ].join("\n"),
  );
});

app.get("/sitemap.xml", (_req, res) => {
  const base = "https://www.nursenest.ca";

  const urls = [
    `${base}/`,
    `${base}/lessons`,
    `${base}/flashcards`,
    `${base}/pricing`,
    `${base}/start-free`,
    `${base}/anatomy`,
    `${base}/faq`,
    `${base}/terms`,
    `${base}/privacy`,
    `${base}/disclaimer`,
    `${base}/med-math`,
    `${base}/lab-values`,
    `${base}/blog`,
    `${base}/clinical-clarity`,
    `${base}/case-simulations`,
    `${base}/medication-mastery`,
    `${base}/mock-exams`,
    `${base}/contact`,
    `${base}/refund-policy`,
    `${base}/pre-nursing`,
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((u) => `<url><loc>${u}</loc></url>`).join("") +
    `</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(xml);
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
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
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