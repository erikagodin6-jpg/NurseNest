/**
 * Resolved logo URL for a theme (DigitalOcean Spaces path → optional same-origin proxy).
 * Server-safe: no React hooks. Object keys: `theme-logo-map.ts` / `marketing-cdn.catalog.json`.
 */
import { getThemeLogoObjectKey, nursenestImagesSpaceObjectUrl } from "@/config/marketing-cdn.catalog";
import { resolveMarketingAbsoluteUrl } from "@/lib/marketing-resolve-image-url";
import { NURSENEST_DEFAULT_THEME } from "@/lib/theme/theme-registry";
import { normalizeThemeIdForLogo } from "@/lib/theme/theme-logo-resolve";

/** Public HTTPS URL for the object key (before proxy rewrite). */
export function getThemeLogoPublicUrl(themeId: string): string {
  const key = getThemeLogoObjectKey(themeId);
  return nursenestImagesSpaceObjectUrl(key);
}

/**
 * URL for `<img src>` — respects `NEXT_PUBLIC_MARKETING_USE_SPACES_PROXY`.
 * Uses per-theme keys from `themeBrandLogoObjectKeys` unless catalog enables mask mode.
 */
export function getThemeLogo(themeId?: string | null): string {
  const id = normalizeThemeIdForLogo(themeId ?? NURSENEST_DEFAULT_THEME);
  return resolveMarketingAbsoluteUrl(nursenestImagesSpaceObjectUrl(getThemeLogoObjectKey(id)));
}
