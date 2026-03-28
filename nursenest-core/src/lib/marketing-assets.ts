/**
 * Central marketing image URLs. Regenerate from DigitalOcean Spaces:
 * `npm run generate:marketing-assets` (requires SPACES_KEY, SPACES_SECRET, SPACES_REGION, SPACES_BUCKET).
 *
 * Committed `marketing-assets.generated.ts` supplements discovery output. Homepage hero stills: `home-hero-carousel.ts`.
 *
 * Canonical bucket hostname, legacy stems, and lesson-image documentation: `src/config/marketing-cdn.catalog.json`.
 */
export {
  MARKETING_CDN_BASE,
  type MarketingResponsiveImage,
  type MarketingScreenshotBundle,
  LOGO_PRIMARY_SRCSET,
  HERO_DASHBOARD_SCREENSHOT,
  HERO_DASHBOARD_SCREENSHOT_SRCSET,
  HERO_REPORT_CARD_SCREENSHOT,
  HERO_REPORT_CARD_SCREENSHOT_SRCSET,
  PRICING_SCREENSHOT,
  PRICING_SCREENSHOT_SRCSET,
  MOBILE_APP_SCREENSHOT,
  MOBILE_APP_SCREENSHOT_SRCSET,
  FLASHCARDS_SCREENSHOT,
  FLASHCARDS_SCREENSHOT_SRCSET,
  CAT_EXAM_SCREENSHOT,
  CAT_EXAM_SCREENSHOT_SRCSET,
  PROGRESS_DASHBOARD_SCREENSHOT,
  PROGRESS_DASHBOARD_SCREENSHOT_SRCSET,
  MARKETING_SCREENSHOT_SOURCES,
  MARKETING_ASSETS_TODOS,
  MARKETING_ASSETS_UNMATCHED_KEYS,
} from "./marketing-assets.generated";

import { LOGO_PRIMARY as LOGO_PRIMARY_GENERATED, HERO_DASHBOARD_SCREENSHOT } from "./marketing-assets.generated";

export {
  HOMEPAGE_HERO_SLIDES,
  homeHeroOgImageUrl,
  homeHeroScreenshotPublicUrl,
  homeHeroScreenshotObjectKey,
  HOME_HERO_SCREENSHOT_COUNT,
  type HomeHeroSlide,
} from "@/config/home-hero-carousel";

import { homeHeroOgImageUrl } from "@/config/home-hero-carousel";

import {
  COMMITTED_MARKETING_ASSET_ORIGIN,
  COMMITTED_MARKETING_SCREENSHOTS_PREFIX,
  HOMEPAGE_SCREENSHOT_SLOT_STEMS,
  LOGO_LEGACY_FALLBACK_URL,
  getThemeLogoObjectKey,
  nursenestImagesSpaceObjectUrl,
} from "@/config/marketing-cdn.catalog";
import { resolveMarketingAbsoluteUrl } from "./marketing-resolve-image-url";

/** Legacy brand mark when generated discovery has not set `LOGO_PRIMARY` yet (matches monolith SEO references). */
const LOGO_PRIMARY_FALLBACK = LOGO_LEGACY_FALLBACK_URL;

export const LOGO_PRIMARY = LOGO_PRIMARY_GENERATED ?? LOGO_PRIMARY_FALLBACK;

export {
  DIGITALOCEAN_SPACES_NURSENEST_IMAGES,
  NURSENEST_IMAGES_SPACE_PUBLIC_BASE_URL,
  COMMITTED_MARKETING_ASSET_ORIGIN,
  COMMITTED_MARKETING_SCREENSHOTS_PREFIX,
  HOMEPAGE_SCREENSHOT_SLOT_STEMS,
  LESSON_IMAGES_RESOLUTION,
  LOGO_LEGACY_FALLBACK_URL,
  getThemeLogoObjectKey,
  nursenestImagesSpaceObjectUrl,
} from "@/config/marketing-cdn.catalog";

/** Resolved URL for the theme-specific uploaded logo (not a shared asset tinted per theme). */
export function getResolvedThemeLogoUrl(themeId: string): string {
  const key = getThemeLogoObjectKey(themeId);
  return resolveMarketingAbsoluteUrl(nursenestImagesSpaceObjectUrl(key));
}

/** Legacy OG still if Spaces hero screenshot is unset. */
const OG_FALLBACK =
  `${COMMITTED_MARKETING_ASSET_ORIGIN}${COMMITTED_MARKETING_SCREENSHOTS_PREFIX}${HOMEPAGE_SCREENSHOT_SLOT_STEMS.screenshotTest.stem}-1200w.webp`;

/** Absolute URL for Open Graph / Twitter cards (server-safe). */
export function marketingOpenGraphImageUrl(): string {
  return (
    LOGO_PRIMARY ?? (homeHeroOgImageUrl() || HERO_DASHBOARD_SCREENSHOT) ?? OG_FALLBACK
  );
}

/** First canonical hero still (`screenshots/screenshot1.webp`) for fallbacks. */
export const MARKETING_HERO_IMAGE_FALLBACK = homeHeroOgImageUrl() || HERO_DASHBOARD_SCREENSHOT || OG_FALLBACK;

export {
  marketingImageUsesProxy,
  resolveMarketingAbsoluteUrl,
  resolveMarketingSrcSet,
  getMarketingCdnBaseForDirectFallback,
} from "./marketing-resolve-image-url";
