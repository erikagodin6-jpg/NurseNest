import * as Sentry from "@sentry/nextjs";
import { scrubSentryEvent } from "@/lib/observability/sentry-scrub";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: dsn || undefined,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
  sendDefaultPii: false,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 0.3 : Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0.08),
  integrations: [Sentry.browserTracingIntegration()],
  maxBreadcrumbs: 60,
  ignoreErrors: [
    /^ResizeObserver loop/i,
    /Non-Error promise rejection/i,
    /Loading chunk \d+ failed/i,
    /Failed to fetch dynamically imported module/i,
  ],
  beforeSend(event) {
    if (typeof window !== "undefined") {
      const mechanismType = event.exception?.values?.[0]?.mechanism?.type;
      const isUnhandledRejection = mechanismType === "auto.browser.global_handlers.onunhandledrejection";
      event.tags = {
        ...event.tags,
        route: window.location.pathname,
        environment:
          process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
        ...(isUnhandledRejection ? { feature: "unhandledrejection" } : {}),
      };
    }
    return scrubSentryEvent(event) as typeof event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
