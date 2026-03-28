import * as Sentry from "@sentry/nextjs";
import { scrubSentryEvent } from "@/lib/observability/sentry-scrub";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: dsn || undefined,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.VERCEL_ENV || process.env.NODE_ENV,
  sendDefaultPii: false,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 0.2 : Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.08),
  maxBreadcrumbs: 80,
  ignoreErrors: [
    /^ResizeObserver loop/i,
    /Non-Error promise rejection/i,
    /Loading chunk \d+ failed/i,
  ],
  beforeSend(event) {
    return scrubSentryEvent(event) as typeof event;
  },
});
