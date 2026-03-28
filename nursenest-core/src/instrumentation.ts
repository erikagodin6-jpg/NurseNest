import * as Sentry from "@sentry/nextjs";
import { assertValidDatabaseUrl } from "@/lib/env/validate-database-url";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    assertValidDatabaseUrl();
    await import("./sentry.server.config");
    process.on("unhandledRejection", (reason) => {
      const msg = reason instanceof Error ? reason.message : String(reason);
      console.error(`[nursenest-core] process_unhandledRejection ${msg}`);
    });
    process.on("uncaughtException", (err) => {
      console.error(`[nursenest-core] process_uncaughtException ${err?.message ?? err}`);
    });
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
