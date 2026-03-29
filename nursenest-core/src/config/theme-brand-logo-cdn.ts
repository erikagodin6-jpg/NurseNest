/**
 * Canonical theme id → pre-colored logo URL on DigitalOcean Spaces.
 *
 * Object keys follow: `branding/themes/logo-{themeId}.png`
 * (e.g. `branding/themes/logo-lavender.png`, `branding/themes/logo-mint.png`, …).
 * Full URL = `marketing-cdn.catalog.json` → `digitalOceanSpaces.nursenestImages.publicBaseUrl` + that key.
 *
 * Source of truth for the header and `getThemeBrandLogoCdnUrlForCanonicalId` / `getThemeLogoLoadChain`.
 *
 * Theme id ↔ UI label (for audits):
 * - lavender, mint, blush, slate, midnight (Midnight / near-black mark), ocean, forest
 * - clinical-light (Clinical), pastel-blush (Pastel Blush), pastel-lavender, pastel-mint, pastel-lilac
 * - lavender-dream, soft-sage, neutral-sand (Sand), neutral-slate (Cool Slate), rose-gold, coral, indigo, teal, berry
 * - dark-mode, dark-clinical, dark-academia
 *
 * Fallback when an id is unknown: `NURSENEST_DEFAULT_THEME` (lavender) logo.
 */
import {
  NURSENEST_IMAGES_SPACE_PUBLIC_BASE_URL,
  nursenestImagesSpaceObjectUrl,
} from "./marketing-cdn.catalog";
import { NURSENEST_DEFAULT_THEME, THEME_OPTIONS } from "@/lib/theme/theme-registry";

export const MARKETING_CDN_PUBLIC_BASE = NURSENEST_IMAGES_SPACE_PUBLIC_BASE_URL;

/** Default theme used when resolving an unknown id or after load failures (lavender pre-colored asset). */
export const THEME_LOGO_FALLBACK_ID = NURSENEST_DEFAULT_THEME;

type ThemeId = (typeof THEME_OPTIONS)[number]["id"];

/** Public URL for one Spaces object key. */
function logoKey(key: string): string {
  return nursenestImagesSpaceObjectUrl(key);
}

/** Bucket path segment for theme logos (no leading slash). */
export const THEME_BRAND_LOGO_PREFIX = "branding/themes" as const;

/** Spaces object key for a theme id, e.g. `branding/themes/logo-lavender.png`. */
export function themeBrandLogoObjectKey(themeId: string): string {
  return `${THEME_BRAND_LOGO_PREFIX}/logo-${themeId}.png`;
}

export const THEME_BRAND_LOGO_CDN_BY_ID = Object.fromEntries(
  THEME_OPTIONS.map((t) => [t.id, logoKey(themeBrandLogoObjectKey(t.id))] as const),
) as Record<ThemeId, string>;

export function getThemeBrandLogoCdnUrlForCanonicalId(themeId: string): string {
  const id = themeId as ThemeId;
  return THEME_BRAND_LOGO_CDN_BY_ID[id] ?? THEME_BRAND_LOGO_CDN_BY_ID[NURSENEST_DEFAULT_THEME];
}

/** Bucket object key for `/api/marketing-assets/...` proxy (path after host). */
export function getThemeLogoObjectKeyFromNormalizedId(themeId: string): string {
  const url = getThemeBrandLogoCdnUrlForCanonicalId(themeId);
  return new URL(url).pathname.replace(/^\//, "");
}
