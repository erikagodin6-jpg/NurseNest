/**
 * Normalizes arbitrary theme strings (URL segments, legacy labels, aliases) to a canonical
 * theme id that exists in `theme-brand-logo-cdn.ts`.
 */
import { THEME_BRAND_LOGO_CDN_BY_ID } from "@/config/theme-brand-logo-cdn";
import { NURSENEST_DEFAULT_THEME, THEME_OPTIONS } from "@/lib/theme/theme-registry";

const CANONICAL_IDS = new Set(THEME_OPTIONS.map((t) => t.id));

/**
 * Human-friendly and legacy aliases → canonical theme id with a CDN logo mapping.
 * Extend here when adding nicknames; actual URLs stay in `theme-brand-logo-cdn.ts` only.
 */
export const THEME_LOGO_ALIASES: Readonly<Record<string, string>> = {
  black: "midnight",
  /** Common spoken labels */
  pink: "blush",
  blue: "clinical-light",
  grey: "slate",
  gray: "slate",
  sage: "soft-sage",
  sand: "neutral-sand",
  rosegold: "rose-gold",
  /** Hyphen variants */
  "rose-gold": "rose-gold",
  "dark-grey": "midnight",
  "dark-gray": "midnight",
  "bright-blue": "clinical-light",
  brightblue: "clinical-light",
};

export type KnownThemeId = (typeof THEME_OPTIONS)[number]["id"];

/**
 * Returns a canonical theme id that has a pre-colored logo asset, or the app default.
 */
export function normalizeThemeIdForLogo(raw: string | undefined | null): string {
  if (raw == null || raw === "") return NURSENEST_DEFAULT_THEME;
  const slug = raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_/g, "-");

  const viaAlias = THEME_LOGO_ALIASES[slug];
  const candidate = viaAlias ?? slug;

  if (CANONICAL_IDS.has(candidate) && candidate in THEME_BRAND_LOGO_CDN_BY_ID) return candidate;
  if (candidate in THEME_BRAND_LOGO_CDN_BY_ID) return candidate;

  return NURSENEST_DEFAULT_THEME;
}
