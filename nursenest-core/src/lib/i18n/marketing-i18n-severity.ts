/**
 * Localization severity and category for marketing JSON keys.
 * P0 = production-critical (nav, auth, pricing entry, recovery, tools chrome, metadata).
 * P1 = important marketing copy (footer, hero, FAQ teasers).
 * P2 = long-form / secondary (remaining keys).
 */

export type MarketingI18nSeverity = "P0" | "P1" | "P2";

export type MarketingI18nCategory =
  | "nav"
  | "auth"
  | "pricing"
  | "recovery"
  | "tools_chrome"
  | "metadata"
  | "marketing"
  | "paywall_checkout"
  | "other";

/** Longest-prefix wins. Order: more specific prefixes first. */
const RULES: ReadonlyArray<{
  prefix: string;
  severity: MarketingI18nSeverity;
  category: MarketingI18nCategory;
}> = [
  { prefix: "pages.home.meta", severity: "P0", category: "metadata" },
  { prefix: "pages.recovery.", severity: "P0", category: "recovery" },
  { prefix: "pages.login.", severity: "P0", category: "auth" },
  { prefix: "pages.signup.", severity: "P0", category: "auth" },
  { prefix: "pages.pricing.", severity: "P0", category: "pricing" },
  { prefix: "pages.tools.", severity: "P0", category: "tools_chrome" },
  { prefix: "tools.common.", severity: "P0", category: "tools_chrome" },
  { prefix: "tools.errors.", severity: "P0", category: "tools_chrome" },
  { prefix: "tools.disclaimer", severity: "P0", category: "tools_chrome" },
  { prefix: "tools.", severity: "P1", category: "tools_chrome" },
  { prefix: "checkout.", severity: "P0", category: "paywall_checkout" },
  { prefix: "paywall.", severity: "P0", category: "paywall_checkout" },
  { prefix: "subscription.ui.", severity: "P0", category: "paywall_checkout" },
  { prefix: "nav.", severity: "P0", category: "nav" },
  { prefix: "footer.", severity: "P1", category: "marketing" },
  { prefix: "components.footer.", severity: "P1", category: "marketing" },
  { prefix: "home.hero.", severity: "P1", category: "marketing" },
  { prefix: "home.email.", severity: "P1", category: "marketing" },
  { prefix: "home.cta.", severity: "P1", category: "marketing" },
  { prefix: "pages.home.", severity: "P1", category: "marketing" },
];

export function classifyMarketingKey(key: string): {
  severity: MarketingI18nSeverity;
  category: MarketingI18nCategory;
} {
  for (const r of RULES) {
    if (key.startsWith(r.prefix)) {
      return { severity: r.severity, category: r.category };
    }
  }
  return { severity: "P2", category: "other" };
}

export function isP0Key(key: string): boolean {
  return classifyMarketingKey(key).severity === "P0";
}

export function isP1Key(key: string): boolean {
  return classifyMarketingKey(key).severity === "P1";
}

/** Brand / exam tokens that may legitimately remain Latin characters in translations. */
export const ENGLISH_INVARIANT_TOKEN_REGEX =
  /\b(NurseNest|NCLEX|REx-PN|NP|RN|RPN|LVN|LPN|L\/L|US|CA|URL|API)\b/gi;
