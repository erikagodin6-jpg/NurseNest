import {
  localizeSlug as _localizeSlug,
  deLocalizeSlug as _deLocalizeSlug,
  LOCALIZED_SLUGS,
} from "@shared/localized-slugs";

export const SUPPORTED_LOCALES = [
  "en", "fr", "es", "fil", "hi", "zh", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th"
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";

export function isValidLocale(str: string): str is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(str);
}

export function getLocaleFromPath(path: string): { locale: SupportedLocale; pathWithoutLocale: string } {
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    const locale = segments[0] as SupportedLocale;
    const rest = "/" + segments.slice(1).join("/");
    return { locale, pathWithoutLocale: rest === "/" ? "/" : rest };
  }
  return { locale: DEFAULT_LOCALE, pathWithoutLocale: path || "/" };
}

export function buildLocalePath(locale: SupportedLocale | string, path: string): string {
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  const localizedPath = localizeSlug(locale, cleanPath);
  if (locale === DEFAULT_LOCALE) {
    return `/${locale}${localizedPath === "/" ? "" : localizedPath}`;
  }
  return `/${locale}${localizedPath === "/" ? "" : localizedPath}`;
}

export function localizeSlug(locale: string, englishPath: string): string {
  return _localizeSlug(locale, englishPath);
}

export function deLocalizeSlug(locale: string, localizedPath: string): string {
  return _deLocalizeSlug(locale, localizedPath);
}

export { LOCALIZED_SLUGS };

export function getMainSiteUrl(path: string = "/", locale?: string): string {
  const isProduction = window.location.hostname.includes("nursenest.ca");
  const cleanPath = path.startsWith("/") ? path : "/" + path;

  const hashIndex = cleanPath.indexOf("#");
  const pathBeforeHash = hashIndex >= 0 ? cleanPath.slice(0, hashIndex) : cleanPath;
  const hashPart = hashIndex >= 0 ? cleanPath.slice(hashIndex) : "";

  if (isProduction) {
    const localePrefix = locale && locale !== "en" ? `/${locale}` : "";
    const pathSuffix = pathBeforeHash === "/" ? "" : pathBeforeHash;
    return `https://www.nursenest.ca${localePrefix}${pathSuffix}${hashPart}`;
  }

  const localeParam = locale && locale !== "en" ? `&locale=${locale}` : "";
  if (pathBeforeHash === "/") {
    return `/?mode=nursing${localeParam}${hashPart}`;
  }
  const separator = pathBeforeHash.includes("?") ? "&" : "?";
  return `${pathBeforeHash}${separator}mode=nursing${localeParam}${hashPart}`;
}
