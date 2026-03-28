/**
 * Typed access to `marketing-cdn.catalog.json` — single mapping for Spaces URLs,
 * legacy marketing origins, and documentation for lesson images.
 */
import catalog from "./marketing-cdn.catalog.json";

export const DIGITALOCEAN_SPACES_NURSENEST_IMAGES = catalog.digitalOceanSpaces.nursenestImages;

/** Same hostname as `MARKETING_CDN_BASE` in `marketing-assets.generated.ts` when discovery uses the default bucket. */
export const NURSENEST_IMAGES_SPACE_PUBLIC_BASE_URL =
  DIGITALOCEAN_SPACES_NURSENEST_IMAGES.publicBaseUrl;

export const COMMITTED_MARKETING_ASSET_ORIGIN = catalog.committedMarketingAssets.origin;

export const COMMITTED_MARKETING_SCREENSHOTS_PREFIX =
  catalog.committedMarketingAssets.screenshotsPathPrefix;

export const LOGO_LEGACY_FALLBACK_URL = catalog.logo.legacyFallbackUrl;

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

export type MarketingCdnCatalog = typeof catalog;
