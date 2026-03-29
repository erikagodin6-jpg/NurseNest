import "server-only";
import { existsSync, readFileSync } from "fs";
import path from "path";
import type { MarketingMessages } from "@/lib/marketing-i18n-core";
import { DEFAULT_MARKETING_LOCALE } from "@/lib/i18n/marketing-locale-policy";
import { safeServerLog } from "@/lib/observability/safe-server-log";

/**
 * Canonical merged bundles live at `public/i18n/{locale}.json` (built by
 * `script/compile-i18n.ts` + `script/merge-marketing-i18n.ts`).
 * Supports cwd = repo root or `nursenest-core/` when running Next.js.
 */
function resolveMergedI18nPath(locale: string): string | null {
  const root = process.cwd();
  const candidates = [
    path.join(root, "public", "i18n", `${locale}.json`),
    path.join(root, "nursenest-core", "public", "i18n", `${locale}.json`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

let enBundleCache: MarketingMessages | null = null;

function loadEnglishBundle(): MarketingMessages {
  if (enBundleCache) return enBundleCache;
  const fp = resolveMergedI18nPath(DEFAULT_MARKETING_LOCALE);
  if (!fp) {
    safeServerLog("i18n", "merged_bundle_missing", { locale: DEFAULT_MARKETING_LOCALE });
    enBundleCache = {} as MarketingMessages;
    return enBundleCache;
  }
  const raw = readFileSync(fp, "utf8");
  enBundleCache = JSON.parse(raw) as MarketingMessages;
  return enBundleCache;
}

/** Server / Node: load merged monolith + marketing strings for one locale. Never throws. */
export function loadMarketingMessagesSync(locale: string): MarketingMessages {
  const fp = resolveMergedI18nPath(locale);
  if (!fp) {
    safeServerLog("i18n", "merged_bundle_missing", { locale });
    if (locale !== DEFAULT_MARKETING_LOCALE) {
      return loadEnglishBundle();
    }
    return {} as MarketingMessages;
  }
  try {
    const raw = readFileSync(fp, "utf8");
    return JSON.parse(raw) as MarketingMessages;
  } catch (e) {
    safeServerLog("i18n", "merged_bundle_read_failed", { locale });
    return locale === DEFAULT_MARKETING_LOCALE ? ({} as MarketingMessages) : loadEnglishBundle();
  }
}

export async function loadMarketingMessages(locale: string): Promise<MarketingMessages> {
  return loadMarketingMessagesSync(locale);
}
