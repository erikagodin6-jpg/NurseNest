/**
 * Global site logo: single DigitalOcean Spaces CDN asset (header, auth, marketing, footer).
 * `SiteBrandLogoMark` uses `PRIMARY_LOGO_URL` first, then `SITE_LOGO_FALLBACK_PATH` if the CDN fails.
 */
export const PRIMARY_LOGO_URL =
  "https://nursenest-images.tor1.cdn.digitaloceanspaces.com/bluebrandlogo.png" as const;

/** Same-origin SVG when the CDN mark fails — `public/marketing/hero-fallback.svg`. */
export const SITE_LOGO_FALLBACK_PATH = "/marketing/hero-fallback.svg" as const;

/**
 * @deprecated Alias for legacy `theme-logo-url` chains; same as `SITE_LOGO_FALLBACK_PATH`.
 */
export const FALLBACK_LOGO_PATH = SITE_LOGO_FALLBACK_PATH;

export const BRAND_NAME = "NurseNest" as const;
