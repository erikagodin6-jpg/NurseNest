/**
 * Resolved logo URL for a theme (DigitalOcean Spaces path → optional same-origin proxy).
 * Server-safe: no React hooks.
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
 * URL used in `<img src>` or CSS `mask-image` — respects `NEXT_PUBLIC_MARKETING_USE_SPACES_PROXY`.
 * When `primaryBrandMarkThemeTinted` is true, `getThemeLogoObjectKey` resolves to `bluebrandlogo` for every theme.
 */
export function getThemeLogo(themeId?: string | null): string {
  const id = normalizeThemeIdForLogo(themeId ?? NURSENEST_DEFAULT_THEME);
  return resolveMarketingAbsoluteUrl(nursenestImagesSpaceObjectUrl(getThemeLogoObjectKey(id)));
}
