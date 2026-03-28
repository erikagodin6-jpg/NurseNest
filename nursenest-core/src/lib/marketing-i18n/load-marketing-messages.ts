import "server-only";
import { existsSync, readFileSync } from "fs";
import path from "path";
import type { MarketingMessages } from "@/lib/marketing-i18n-core";
import { safeServerLog } from "@/lib/observability/safe-server-log";

/**
 * Canonical merged bundles live at `public/i18n/{locale}.json` (built by
 * `script/compile-i18n.ts` + `script/merge-marketing-i18n.ts`).
 * Supports cwd = repo root or `nursenest-core/` when running Next.js.
 */
function resolveMergedI18nPath(locale: string): string {
  const root = process.cwd();
  const candidates = [
    path.join(root, "public", "i18n", `${locale}.json`),
    path.join(root, "nursenest-core", "public", "i18n", `${locale}.json`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  const msg = `[i18n] merged bundle not found for locale "${locale}"`;
  safeServerLog("i18n", "merged_bundle_missing", { locale });
  throw new Error(`${msg} (tried: ${candidates.join(", ")})`);
}

/** Server / Node: load merged monolith + marketing strings for one locale. */
export function loadMarketingMessagesSync(locale: string): MarketingMessages {
  const fp = resolveMergedI18nPath(locale);
  const raw = readFileSync(fp, "utf8");
  return JSON.parse(raw) as MarketingMessages;
}

export async function loadMarketingMessages(locale: string): Promise<MarketingMessages> {
  return loadMarketingMessagesSync(locale);
}
