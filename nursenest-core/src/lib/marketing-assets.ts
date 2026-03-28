/**
 * Central marketing image URLs. Regenerate from DigitalOcean Spaces:
 * `npm run generate:marketing-assets` (requires SPACES_KEY, SPACES_SECRET, SPACES_REGION, SPACES_BUCKET).
 *
 * Committed `marketing-assets.generated.ts` uses legacy nursenest.ca screenshots until discovery runs.
 */
export {
  MARKETING_CDN_BASE,
  type MarketingResponsiveImage,
  type MarketingScreenshotBundle,
  LOGO_PRIMARY,
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
  LOGO_PRIMARY,
  MARKETING_HERO_CAROUSEL_SLIDES,
} from "./marketing-assets.generated";

const OG_FALLBACK =
  "https://www.nursenest.ca/screenshots/screenshottest_1773379293573-1200w.webp";

/** Absolute URL for Open Graph / Twitter cards (server-safe). */
export function marketingOpenGraphImageUrl(): string {
  return LOGO_PRIMARY ?? MARKETING_HERO_CAROUSEL_SLIDES[0]?.fallback ?? OG_FALLBACK;
}
