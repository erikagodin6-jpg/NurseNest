/**
 * Canonical theme → DigitalOcean Spaces object keys for pre-colored header logos.
 *
 * **Source of truth:** `marketing-cdn.catalog.json` → `logo.themeBrandLogoObjectKeys`
 * (edit there when new themes or assets are added).
 *
 * **Public URL pattern** (anonymous GET may 403; app uses `/api/marketing-assets/...` proxy):
 *   `https://nursenest-images.tor1.digitaloceanspaces.com/{objectKey}`
 *
 * Filename pattern in bucket: `branding/themes/logo-<canonical-theme-id>.png`
 */
import catalog from "./marketing-cdn.catalog.json";

export const NURSENEST_SPACES_PUBLIC_ORIGIN = catalog.digitalOceanSpaces.nursenestImages.publicBaseUrl.replace(
  /\/$/,
  "",
);

/** Committed map: theme id → object key under the nursenest-images bucket. */
export const THEME_LOGO_OBJECT_KEYS = catalog.logo.themeBrandLogoObjectKeys as Readonly<
  Record<string, string>
>;

export const THEME_LOGO_DEFAULT_FALLBACK_ID =
  (catalog.logo as { defaultFallbackThemeId?: string }).defaultFallbackThemeId ?? "lavender";
