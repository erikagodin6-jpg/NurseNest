/**
 * Canonical theme → public DigitalOcean Spaces CDN logo URLs (source of truth).
 * No CSS tinting/masks — these are the real uploaded assets.
 *
 * Base: https://nursenest-images.tor1.cdn.digitaloceanspaces.com
 */
import { NURSENEST_DEFAULT_THEME, THEME_OPTIONS } from "@/lib/theme/theme-registry";

export const MARKETING_CDN_PUBLIC_BASE = "https://nursenest-images.tor1.cdn.digitaloceanspaces.com" as const;

type ThemeId = (typeof THEME_OPTIONS)[number]["id"];

/** Exact CDN URLs (filenames as uploaded). */
const CDN = MARKETING_CDN_PUBLIC_BASE;

const ASSET = {
  blue: `${CDN}/bluebrandlogo.jpg`,
  coral: `${CDN}/coralbrandlogo.png`,
  darkGrey: `${CDN}/darkgreybrandlogo.png`,
  forest: `${CDN}/forestbrandlogo.png`,
  grey: `${CDN}/greybrandlogo.png`,
  indigo: `${CDN}/indigobrandlogo.png`,
  lavender: `${CDN}/lavenderbrandlogo.png`,
  mint: `${CDN}/mintbrandlogo.png`,
  ocean: `${CDN}/oceanbrandlogo.png`,
  pink: `${CDN}/pinkbrandlogo.png`,
  roseGold: `${CDN}/rosegoldbrandlogo.png`,
  sage: `${CDN}/sagebrandlogo.png`,
  sand: `${CDN}/sandbrandlogo.png`,
  teal: `${CDN}/tealbrandlogo.png`,
} as const;

/**
 * Every `THEME_OPTIONS` id maps to a real CDN file; unlisted variants reuse the closest asset.
 */
export const THEME_BRAND_LOGO_CDN_BY_ID: Record<ThemeId, string> = {
  lavender: ASSET.lavender,
  mint: ASSET.mint,
  blush: ASSET.pink,
  slate: ASSET.grey,
  midnight: ASSET.darkGrey,
  ocean: ASSET.ocean,
  forest: ASSET.forest,
  "clinical-light": ASSET.blue,
  "pastel-blush": ASSET.pink,
  "pastel-lavender": ASSET.lavender,
  "pastel-mint": ASSET.mint,
  "pastel-lilac": ASSET.lavender,
  "lavender-dream": ASSET.lavender,
  "soft-sage": ASSET.sage,
  "neutral-sand": ASSET.sand,
  "neutral-slate": ASSET.grey,
  "rose-gold": ASSET.roseGold,
  coral: ASSET.coral,
  indigo: ASSET.indigo,
  teal: ASSET.teal,
  berry: ASSET.lavender,
  "dark-mode": ASSET.darkGrey,
  "dark-clinical": ASSET.teal,
  "dark-academia": ASSET.darkGrey,
};

export function getThemeBrandLogoCdnUrlForCanonicalId(themeId: string): string {
  const id = themeId as ThemeId;
  return THEME_BRAND_LOGO_CDN_BY_ID[id] ?? THEME_BRAND_LOGO_CDN_BY_ID[NURSENEST_DEFAULT_THEME];
}

/** Bucket object key for optional `/api/marketing-assets/...` fallback (filename at CDN root). */
export function getThemeLogoObjectKeyFromNormalizedId(themeId: string): string {
  const url = getThemeBrandLogoCdnUrlForCanonicalId(themeId);
  return new URL(url).pathname.replace(/^\//, "");
}
