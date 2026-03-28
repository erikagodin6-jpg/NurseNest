import marketingEn from "@/content/marketing-en.json";

export type MarketingMessages = Record<string, string>;

type Params = Record<string, string | number | undefined>;

const baseEn = marketingEn as Record<string, string>;

/**
 * Resolves copy without ever returning raw i18n keys in production UI (missing keys fall back to English, then empty).
 */
export function formatMarketingMessage(messages: MarketingMessages, key: string, params?: Params): string {
  let raw = messages[key];
  if (raw === undefined || raw === "") {
    raw = baseEn[key];
  }
  if (raw === undefined) {
    if (process.env.NODE_ENV === "development") {
      return `[i18n missing: ${key}]`;
    }
    return "";
  }
  let s = raw;
  if (params) {
    for (const [k, val] of Object.entries(params)) {
      if (val === undefined) continue;
      s = s.split(`{{${k}}}`).join(String(val));
    }
  }
  // Never render the lookup key (or identical string) as visible copy.
  if (s === key) {
    if (process.env.NODE_ENV === "development") {
      return `[i18n invalid value for ${key}]`;
    }
    return "";
  }
  return s;
}
