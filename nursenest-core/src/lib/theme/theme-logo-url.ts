/**
 * Resolved logo URL for a theme — public DigitalOcean CDN first (`theme-brand-logo-cdn.ts`), optional proxy.
 * Server-safe: no React hooks.
 */
import {
  getThemeBrandLogoCdnUrlForCanonicalId,
  getThemeLogoObjectKeyFromNormalizedId,
} from "@/config/theme-brand-logo-cdn";
import {
  marketingImageUsesProxy,
  marketingProxyFallbackEnabled,
  marketingProxyPathForKey,
} from "@/lib/marketing-resolve-image-url";
import { NURSENEST_DEFAULT_THEME } from "@/lib/theme/theme-registry";
import { normalizeThemeIdForLogo } from "@/lib/theme/theme-logo-resolve";

function uniqueStrings(urls: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    if (!u || seen.has(u)) continue;
    seen.add(u);
    out.push(u);
  }
  return out;
}

/** Spaces object key (filename) for the theme logo — for optional same-origin proxy fallback. */
export function getThemeLogoObjectKey(themeId: string): string {
  const id = normalizeThemeIdForLogo(themeId);
  return getThemeLogoObjectKeyFromNormalizedId(id);
}

/** Public CDN URL for the theme logo. */
export function getThemeLogoPublicUrl(themeId: string): string {
  const id = normalizeThemeIdForLogo(themeId);
  return getThemeBrandLogoCdnUrlForCanonicalId(id);
}

/**
 * Ordered candidate URLs: direct CDN first, then optional proxy paths when env enables them.
 */
export function getThemeLogoLoadChain(themeId?: string | null): string[] {
  const id = normalizeThemeIdForLogo(themeId ?? NURSENEST_DEFAULT_THEME);
  const defId = NURSENEST_DEFAULT_THEME;
  const pub = getThemeBrandLogoCdnUrlForCanonicalId(id);
  const pubFb = getThemeBrandLogoCdnUrlForCanonicalId(defId);
  const proxy = marketingProxyPathForKey(getThemeLogoObjectKeyFromNormalizedId(id));
  const proxyFb = marketingProxyPathForKey(getThemeLogoObjectKeyFromNormalizedId(defId));

  if (marketingImageUsesProxy()) {
    return uniqueStrings([proxy, pub, proxyFb, pubFb]);
  }
  if (marketingProxyFallbackEnabled()) {
    return uniqueStrings([pub, pubFb, proxy, proxyFb]);
  }
  return uniqueStrings([pub, pubFb]);
}

/**
 * Primary URL for `<img src>` — first candidate in `getThemeLogoLoadChain`.
 */
export function getThemeLogo(themeId?: string | null): string {
  const chain = getThemeLogoLoadChain(themeId);
  if (chain.length > 0) return chain[0];
  const id = normalizeThemeIdForLogo(themeId ?? NURSENEST_DEFAULT_THEME);
  return getThemeBrandLogoCdnUrlForCanonicalId(id);
}
