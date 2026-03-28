/**
 * Central marketing image URLs. Regenerate from DigitalOcean Spaces:
 * `npm run generate:marketing-assets` (requires SPACES_KEY, SPACES_SECRET, SPACES_REGION, SPACES_BUCKET).
 *
 * Optional: `NEXT_PUBLIC_MARKETING_CDN_BASE` — public origin for Space assets (CDN or Spaces public URL).
 * Optional: `NEXT_PUBLIC_MARKETING_LOGO_URL` — full URL to logo on the Space when not in generated map.
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
  MARKETING_HERO_CAROUSEL_SLIDES,
  MARKETING_SCREENSHOT_SOURCES,
  MARKETING_ASSETS_TODOS,
  MARKETING_ASSETS_UNMATCHED_KEYS,
} from "./marketing-assets.generated";

import {
  LOGO_PRIMARY as LOGO_PRIMARY_GEN,
  LOGO_PRIMARY_SRCSET as LOGO_PRIMARY_SRCSET_GEN,
  MARKETING_HERO_CAROUSEL_SLIDES,
} from "./marketing-assets.generated";
import { marketingAssetSrcSet, marketingAssetUrl } from "./marketing-cdn";

const OG_FALLBACK =
  "https://nursenest-images.tor1.digitaloceanspaces.com/screenshots/screenshottest_1773379293573-1200w.webp";

/** Resolved hero slides (CDN base override applied). */
export function getMarketingHeroCarouselSlides(): { srcSet: string; fallback: string }[] {
  return MARKETING_HERO_CAROUSEL_SLIDES.map((s) => ({
    srcSet: marketingAssetSrcSet(s.srcSet) ?? s.srcSet,
    fallback: marketingAssetUrl(s.fallback),
  }));
}

/**
 * Header brand mark only — real logo from env or generated map.
 * Does not fall back to hero screenshots (those are product imagery, not a logo).
 */
export function getMarketingLogo(): { src: string | null; srcSet?: string } {
  const envLogo = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_MARKETING_LOGO_URL?.trim() : undefined;
  if (envLogo) {
    return { src: marketingAssetUrl(envLogo) };
  }
  if (LOGO_PRIMARY_GEN) {
    return {
      src: marketingAssetUrl(LOGO_PRIMARY_GEN),
      srcSet: marketingAssetSrcSet(LOGO_PRIMARY_SRCSET_GEN) ?? undefined,
    };
  }
  return { src: null };
}

/** Social preview image — logo when set, else first hero screenshot from the Space map (product, not a fake logo). */
export function marketingOpenGraphImageUrl(): string {
  const logo = getMarketingLogo();
  if (logo.src) return logo.src;
  return marketingAssetUrl(MARKETING_HERO_CAROUSEL_SLIDES[0]?.fallback ?? OG_FALLBACK);
}
