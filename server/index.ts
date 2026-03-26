import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { asyncHandler } from "./async-handler";
import { HttpError } from "./http-error";
import { installApiNotFoundHandler, installGlobalErrorHandler } from "./global-error-handler";
import { createPublicApiRateLimiter } from "./api-rate-limit";
import {
  testDatabaseConnection,
  isProductionLikeRuntime,
  logStartupDatabaseResolution,
} from "./db";
import { structuredRequestLogMiddleware } from "./structured-request-log";
import { validateCriticalStartupConfig } from "./startup-config";
import { emitStructuredLog, initOptionalLogSinks } from "./log-sink";
import Stripe from "stripe";
import { getStripeClient } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";
import { withWebhookIdempotency } from "./webhook-idempotency";

const app = express();
app.set("trust proxy", 1);

app.use((req: Request, res: Response, next: NextFunction) => {
  const headerId = req.headers["x-request-id"];
  req.requestId =
    typeof headerId === "string" && headerId.trim().length > 0
      ? headerId.trim()
      : randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
});

/* -------------------------
   BASIC HEALTH ROUTES
------------------------- */

app.get("/healthz", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.get("/health", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

// Keep a lightweight root response for platform health checks.
app.get("/", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

app.get("/readyz", async (_req, res) => {
  try {
    const mem = process.memoryUsage();
    const base = {
      status: "healthy" as const,
      rssMB: Math.round(mem.rss / 1024 / 1024),
    };

    const deep = String(process.env.READYZ_DEEP || "").toLowerCase() === "true";
    const configProbe = deep
      ? {
          adminJwtConfigured: Boolean(process.env.ADMIN_JWT_SECRET?.trim()),
          openAiIntegrationConfigured: Boolean(
            process.env.AI_INTEGRATIONS_OPENAI_API_KEY?.trim(),
          ),
        }
      : undefined;

    if (String(process.env.READYZ_CHECK_DB || "").toLowerCase() === "true") {
      const target = isProductionLikeRuntime() ? "production" : "development";
      const db = await testDatabaseConnection(target);
      if (!db.ok) {
        return res.status(503).json({
          status: "degraded",
          rssMB: base.rssMB,
          database: { ok: false, error: db.error },
          ...(configProbe ? { config: configProbe } : {}),
        });
      }
      return res.status(200).json({
        ...base,
        database: { ok: true, timeMs: db.timeMs },
        ...(configProbe ? { config: configProbe } : {}),
      });
    }

    res.status(200).json(configProbe ? { ...base, config: configProbe } : base);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    res.status(503).json({
      status: "unhealthy",
      error: msg,
    });
  }
});

/* -------------------------
   CORE MIDDLEWARE
------------------------- */

app.use(compression());
app.use(cookieParser());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(createPublicApiRateLimiter());

/* -------------------------
   SECURITY HEADERS
------------------------- */

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

/* -------------------------
   STRIPE WEBHOOK (SAFE VERSION)
------------------------- */

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    const signature = req.headers["stripe-signature"];

    if (!signature || typeof signature !== "string") {
      throw new HttpError(400, "Missing signature");
    }

    if (!Buffer.isBuffer(req.body)) {
      emitStructuredLog(
        {
          level: "error",
          type: "webhook_invalid_body",
          provider: "stripe",
          route: "POST /api/stripe/webhook",
          requestId: req.requestId,
          msg: "Body is not buffer",
        },
        "error",
      );
      throw new HttpError(400, "Invalid body");
    }

    const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    if (!secret) {
      emitStructuredLog(
        {
          level: "warn",
          type: "stripe_webhook_secret_unset",
          provider: "stripe",
          route: "POST /api/stripe/webhook",
          requestId: req.requestId,
          msg: "STRIPE_WEBHOOK_SECRET unset — idempotency skipped; align with stripe-replit-sync managed webhook",
        },
        "warn",
      );
      await WebhookHandlers.processWebhook(req.body, signature);
      return res.status(200).json({ received: true });
    }

    const stripe = await getStripeClient();
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, secret);
    } catch {
      throw new HttpError(400, "Invalid Stripe signature");
    }

    const outcome = await withWebhookIdempotency({
      eventId: event.id,
      eventType: event.type,
      source: "stripe",
      payloadSummary: { type: event.type, livemode: event.livemode },
      requestId: req.requestId,
      handler: () => WebhookHandlers.processWebhook(req.body, signature),
    });

    if (outcome.duplicate) {
      return res.status(200).json({ received: true, duplicate: true });
    }

    return res.status(200).json({ received: true });
  }),
);

/* -------------------------
   REQUEST LOGGING (STRUCTURED)
------------------------- */

app.use(structuredRequestLogMiddleware());

/* -------------------------
   BASIC TEST ROUTE
------------------------- */

app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

/* -------------------------
   SERVER START
------------------------- */

const httpServer = createServer(app);

const deployBootT0 = Date.now();
const STARTUP_DIAGNOSTICS = String(process.env.STARTUP_DIAGNOSTICS || "").toLowerCase() === "1" || String(process.env.STARTUP_DIAGNOSTICS || "").toLowerCase() === "true";

function diagPhase(label: string): void {
  if (STARTUP_DIAGNOSTICS) {
    console.log(label);
  }
}

function resolveListenPort(): number {
  const raw = process.env.PORT || "8080";
  const n = parseInt(String(raw).trim(), 10);
  if (!Number.isFinite(n) || n < 1 || n > 65535) {
    throw new Error(`Invalid PORT env (must be 1–65535): ${JSON.stringify(raw)}`);
  }
  return n;
}

async function startServer() {
  try {
    const port = resolveListenPort();
    console.log("STARTING WEB SERVER");
    console.log(`listening_port=${port} bind=0.0.0.0 (from PORT env when set)`);
    console.log(`LISTENING ON PORT ${port}`);
    console.log("HEALTH ENDPOINT READY");

    const nodeEnv = process.env.NODE_ENV || null;
    const hasDatabaseUrl = Boolean(process.env.DATABASE_URL?.trim());
    const hasProdDatabaseUrl = Boolean(process.env.PROD_DATABASE_URL?.trim());
    const allowProdFallback = process.env.ALLOW_PROD_FALLBACK_TO_DATABASE_URL || null;

    console.log(
      JSON.stringify({
        type: "nursenest_startup",
        nodeEnv,
        port,
        portFromEnv: process.env.PORT !== undefined && String(process.env.PORT).trim() !== "",
        hasDatabaseUrl,
        hasProdDatabaseUrl,
        allowProdFallbackToDatabaseUrl: allowProdFallback,
      }),
    );

    diagPhase("PHASE 1: config validation");
    initOptionalLogSinks();

    const startup = validateCriticalStartupConfig();
    if (!startup.ok) {
      console.error(
        "[startup] Cannot boot — fix the following and redeploy:\n  - " + startup.errors.join("\n  - "),
      );
      emitStructuredLog(
        {
          level: "error",
          type: "startup_config",
          msg: "Invalid or missing critical configuration",
          errors: startup.errors,
        },
        "error",
      );
      throw new Error("Startup configuration invalid (see log above).");
    }

    logStartupDatabaseResolution();
    diagPhase("PHASE 2: server initialization");

    httpServer.once("error", (err: NodeJS.ErrnoException) => {
      console.error("[FATAL STARTUP] HTTP server error:", err?.message || err);
      process.exit(1);
    });

    // Route registration can touch many modules. To keep DO promotion reliable,
    // ensure we start listening even if route registration or DB-dependent
    // background probes fail.
    void (async () => {
      try {
        const routesT0 = Date.now();
        await registerRoutes(httpServer, app);
        console.log(`[deploy-timing] register_routes_ms=${Date.now() - routesT0}`);
        // 404 + global error handler MUST be registered after all routes.
        installApiNotFoundHandler(app);
        installGlobalErrorHandler(app);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error("[startup] route registration failed (continuing to listen):", msg);
        if (e instanceof Error && e.stack) console.error(e.stack);
      }
    })();

    diagPhase("PHASE 3: app.listen");
    httpServer.listen(port, "0.0.0.0", () => {
      console.log(`BOOT SUCCESS: HTTP server listening on 0.0.0.0:${port}`);
      console.log(`SERVER STARTED port=${port} bind=0.0.0.0`);
      console.log(`[deploy-timing] listen_ready_ms=${Date.now() - deployBootT0}`);
      diagPhase("PHASE 4: health endpoint ready");
      emitStructuredLog({
        level: "info",
        type: "server_listen",
        msg: "Server running",
        port,
      });

      // DB connectivity is allowed to fail; the service should still start listening
      // so DigitalOcean readiness can pass. We probe and log asynchronously.
      void (async () => {
        diagPhase("PHASE 5: optional DB probe");
        try {
          const dbProbe = await testDatabaseConnection();
          if (dbProbe.ok) {
            console.log(
              JSON.stringify({
                type: "db_startup_probe",
                ok: true,
                target: dbProbe.target,
                timeMs: dbProbe.timeMs,
              }),
            );
          } else {
            console.error(
              JSON.stringify({
                type: "db_startup_probe",
                ok: false,
                target: dbProbe.target,
                error: dbProbe.error,
              }),
            );
          }
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          console.error("[db_startup_probe] unexpected error:", msg);
        }
      })();
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("BOOT FAILED: web server did not start");
    console.error("[FATAL STARTUP]", msg);
    if (err instanceof Error && err.stack) {
      console.error(err.stack);
    }
    try {
      emitStructuredLog(
        {
          level: "error",
          type: "fatal_startup",
          msg,
        },
        "error",
      );
    } catch {
      /* optional sinks may not be initialized */
    }
    process.exit(1);
  }
}

void startServer();

/* -------------------------
   GRACEFUL SHUTDOWN
------------------------- */

function setupGracefulShutdown() {
  let shuttingDown = false;

  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;

    emitStructuredLog({ level: "info", type: "shutdown_signal", msg: signal });

    httpServer.close(() => {
      emitStructuredLog({ level: "info", type: "shutdown_complete", msg: "server closed" });
      process.exit(0);
    });

    setTimeout(() => {
      emitStructuredLog({ level: "error", type: "shutdown_forced", msg: "forced exit after timeout" }, "error");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

setupGracefulShutdown();