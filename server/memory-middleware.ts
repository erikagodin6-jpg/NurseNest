import type { Request, Response, NextFunction } from "express";
import {
  isMemoryProtectionActive,
  isMemoryCritical,
  checkMemoryNow,
  logSpike,
  incrementConnections,
  decrementConnections,
} from "./memory-monitor";

const MAX_RESPONSE_SIZE_BYTES = 1 * 1024 * 1024;
const MAX_ITEMS_UNDER_PRESSURE = 10;

const BULK_AI_PATTERNS = [
  "/api/ai/generate",
  "/api/ai/content",
  "/api/ai/tutor",
  "/api/admin/ai",
  "/api/admin/seo",
  "/api/seo/generate",
  "/api/admin/mass-expansion",
  "/api/admin/bulk",
];

const LARGE_LIST_PATTERNS = [
  "/api/exam-questions",
  "/api/question-bank",
  "/api/flashcard-decks",
  "/api/flashcards",
  "/api/lessons",
  "/api/mock-exams",
  "/api/content",
  "/api/nursing/question-topics",
  "/api/allied-questions",
];

export function connectionTrackingMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    incrementConnections();
    let decremented = false;
    const onDone = () => {
      if (!decremented) {
        decremented = true;
        decrementConnections();
      }
    };
    res.on("finish", onDone);
    res.on("close", onDone);
    next();
  };
}

const EXEMPT_PATHS = [
  "/api/platform/status",
  "/api/admin/resilience",
  "/api/healthz",
  "/api/auth",
  "/api/user",
  "/api/stripe/webhook",
];

export function loadSheddingMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith("/api/")) return next();

    if (EXEMPT_PATHS.some(p => req.path.startsWith(p))) return next();

    if (isMemoryCritical()) {
      const isBulkAI = BULK_AI_PATTERNS.some(p => req.path.startsWith(p));
      if (isBulkAI) {
        res.setHeader("Retry-After", "60");
        return res.status(503).json({
          error: "System under high memory pressure. Bulk operations temporarily disabled.",
          retryAfter: 60,
          memoryPressure: true,
        });
      }
    }

    if (isMemoryProtectionActive()) {
      const isBulkAI = BULK_AI_PATTERNS.some(p => req.path.startsWith(p));
      if (isBulkAI && req.method === "POST") {
        res.setHeader("Retry-After", "30");
        return res.status(503).json({
          error: "AI generation temporarily disabled due to high memory usage. Please try again shortly.",
          retryAfter: 30,
          memoryPressure: true,
        });
      }

      const isLargeList = LARGE_LIST_PATTERNS.some(p => req.path.startsWith(p));
      if (isLargeList && req.method === "GET") {
        const currentLimit = parseInt(req.query.limit as string) || 50;
        if (currentLimit > MAX_ITEMS_UNDER_PRESSURE) {
          req.query.limit = String(MAX_ITEMS_UNDER_PRESSURE);
        }
      }
    }

    next();
  };
}

export function responseSizeLimiterMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith("/api/")) return next();

    const originalJson = res.json.bind(res);

    res.json = function (body: any): Response {
      try {
        const serialized = JSON.stringify(body);
        const sizeBytes = Buffer.byteLength(serialized, "utf8");

        if (sizeBytes > MAX_RESPONSE_SIZE_BYTES) {
          const status = checkMemoryNow();
          logSpike(status, req.path, sizeBytes);

          console.warn(
            `[ResponseSizeLimiter] Oversized response blocked: ${req.path} (${Math.round(sizeBytes / 1024)}KB)`
          );

          res.status(413);
          return originalJson({
            error: "Response too large. Please use pagination or filters to reduce the result set.",
            maxSizeBytes: MAX_RESPONSE_SIZE_BYTES,
            actualSizeBytes: sizeBytes,
            path: req.path,
          });
        }

        return originalJson(body);
      } catch {
        return originalJson(body);
      }
    };

    next();
  };
}

export function memoryAwareRequestLogger() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith("/api/")) return next();

    if (isMemoryProtectionActive()) {
      const contentLength = parseInt(req.headers["content-length"] || "0");
      if (contentLength > 0) {
        const status = checkMemoryNow();
        logSpike(status, req.path, contentLength);
      }
    }

    next();
  };
}
