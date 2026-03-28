/**
 * Typed access to `marketing-cdn.catalog.json` — single mapping for Spaces URLs,
 * legacy marketing origins, and documentation for lesson images.
 */
import catalog from "./marketing-cdn.catalog.json";
import { NURSENEST_DEFAULT_THEME } from "@/lib/theme/theme-registry";
import { normalizeThemeIdForLogo } from "@/lib/theme/theme-logo-resolve";

export const DIGITALOCEAN_SPACES_NURSENEST_IMAGES = catalog.digitalOceanSpaces.nursenestImages;

/** Same hostname as `MARKETING_CDN_BASE` in `marketing-assets.generated.ts` when discovery uses the default bucket. */
export const NURSENEST_IMAGES_SPACE_PUBLIC_BASE_URL =
  DIGITALOCEAN_SPACES_NURSENEST_IMAGES.publicBaseUrl;

export const COMMITTED_MARKETING_ASSET_ORIGIN = catalog.committedMarketingAssets.origin;

export const COMMITTED_MARKETING_SCREENSHOTS_PREFIX =
  catalog.committedMarketingAssets.screenshotsPathPrefix;

export const LOGO_LEGACY_FALLBACK_URL = catalog.logo.legacyFallbackUrl;

type LogoCatalog = typeof catalog.logo & {
  primaryBrandMarkObjectKey?: string;
  primaryBrandMarkThemeTinted?: boolean;
};

/** Single Spaces key for `bluebrandlogo` (mask + theme primary). */
export function getPrimaryBrandMarkObjectKey(): string | null {
  const k = (catalog.logo as LogoCatalog).primaryBrandMarkObjectKey?.trim();
  return k || null;
}

/** When true, header uses one mask-tinted mark; per-theme PNG map is not used for the header. */
export function headerUsesThemeTintedBrandMark(): boolean {
  return Boolean((catalog.logo as LogoCatalog).primaryBrandMarkThemeTinted && getPrimaryBrandMarkObjectKey());
}

/**
 * Spaces object key for the pre-colored header logo for `themeId` (`data-theme` / next-themes).
 * Aliases: `theme-logo-resolve.ts` → `THEME_LOGO_ALIASES`. Falls back to `defaultFallbackThemeId`.
 * Skipped when `headerUsesThemeTintedBrandMark()` — use `getPrimaryBrandMarkObjectKey()` instead.
 */
export function getThemeLogoObjectKey(themeId: string): string {
  if (headerUsesThemeTintedBrandMark()) {
    return getPrimaryBrandMarkObjectKey() as string;
  }
  const map = catalog.logo.themeBrandLogoObjectKeys as Record<string, string>;
  const fallbackId =
    (catalog.logo as { defaultFallbackThemeId?: string }).defaultFallbackThemeId ?? NURSENEST_DEFAULT_THEME;
  const normalized = normalizeThemeIdForLogo(themeId);
  const key = map[normalized] ?? map[fallbackId];
  if (key) return key;
  return map[fallbackId] ?? map[NURSENEST_DEFAULT_THEME];
}

export const HOMEPAGE_SCREENSHOT_SLOT_STEMS = catalog.homepageScreenshots.slotToLegacyStem;

/** Build a public URL for an object key in the nursenest-images Space (matches generate-marketing-assets `publicUrl`). */
export function nursenestImagesSpaceObjectUrl(objectKey: string): string {
  const b = NURSENEST_IMAGES_SPACE_PUBLIC_BASE_URL.replace(/\/$/, "");
  const enc = objectKey
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${b}/${enc}`;
}

export const LESSON_IMAGES_RESOLUTION = catalog.lessonImages;

/** Documented canonical hero URLs — source of truth: `src/config/home-hero-carousel.ts`. */
export const HOMEPAGE_HERO_CAROUSEL_PUBLIC_URLS = catalog.homepageHeroCarousel.canonicalPublicFallbackUrls;

export type MarketingCdnCatalog = typeof catalog;
