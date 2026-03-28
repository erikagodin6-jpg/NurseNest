import marketingEnBase from "@/content/marketing-en.json";

export type MarketingMessages = Record<string, string>;

type Params = Record<string, string | number | undefined>;

const BASE_EN = marketingEnBase as MarketingMessages;

/**
 * Resolves copy for a flat key. Never returns the raw key in production UI (missing keys → English, then empty).
 */
export function formatMarketingMessage(messages: MarketingMessages, key: string, params?: Params): string {
  let raw = messages[key];
  if (raw === undefined) raw = BASE_EN[key];
  if (raw === undefined) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[marketing-i18n] missing key: ${key}`);
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
  return s;
}
