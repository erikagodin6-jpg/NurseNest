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
import { testDatabaseConnection } from "./db";
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
      const db = await testDatabaseConnection("development");
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

const port = parseInt(process.env.PORT || "5000", 10);

async function startServer() {
  initOptionalLogSinks();

  const startup = validateCriticalStartupConfig();
  if (!startup.ok) {
    emitStructuredLog(
      {
        level: "error",
        type: "startup_config",
        msg: "Invalid or missing critical configuration",
        errors: startup.errors,
      },
      "error",
    );
    process.exit(1);
  }

  await registerRoutes(httpServer, app);
  // 404 + global error handler MUST be registered after all routes (including registerRoutes).
  installApiNotFoundHandler(app);
  installGlobalErrorHandler(app);
  httpServer.listen(port, "0.0.0.0", () => {
    emitStructuredLog({
      level: "info",
      type: "server_listen",
      msg: "Server running",
      port,
    });
  });
}

startServer().catch((err: any) => {
  emitStructuredLog(
    {
      level: "error",
      type: "startup_routes_failed",
      msg: err?.message || String(err),
    },
    "error",
  );
  process.exit(1);
});

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