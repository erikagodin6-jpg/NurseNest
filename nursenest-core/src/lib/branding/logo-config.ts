/**
 * Canonical site header logo: production CDN first, same file shipped under `public/branding/` as fallback.
 * Import from here only — do not duplicate URLs in components.
 */
export const PRIMARY_LOGO_URL =
  "https://nursenest-images.tor1.cdn.digitaloceanspaces.com/bluebrandlogo.png" as const;

/** Same-origin fallback when the CDN (or proxy) is unreachable — must match `public/branding/nursenest-logo.png`. */
export const FALLBACK_LOGO_PATH = "/branding/nursenest-logo.png" as const;

export const BRAND_NAME = "NurseNest" as const;
