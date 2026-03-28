"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { getThemeLogo, getThemeLogoPublicUrl } from "@/lib/theme/theme-logo-url";
import { normalizeThemeIdForLogo } from "@/lib/theme/theme-logo-resolve";
import { NURSENEST_DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/theme/theme-registry";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }
  const el = document.documentElement;
  const mo = new MutationObserver(() => onChange());
  mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
  const onStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    mo.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

function readDomThemeId(): string {
  if (typeof document === "undefined") return NURSENEST_DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr && attr.length > 0) return normalizeThemeIdForLogo(attr);
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v) return normalizeThemeIdForLogo(v);
  } catch {
    /* ignore */
  }
  return NURSENEST_DEFAULT_THEME;
}

function getServerSnapshot(): string {
  return NURSENEST_DEFAULT_THEME;
}

/**
 * Active theme logo: `resolvedTheme ?? theme` from next-themes when hydrated, otherwise
 * `data-theme` / localStorage (via sync external store) so the first paint matches the boot script.
 */
export function useThemeLogo(): {
  themeId: string;
  src: string;
  fallbackSrc: string;
  /** Canonical Spaces HTTPS URL (no proxy) — used if `/api/marketing-assets/...` fails but the bucket allows anonymous GET. */
  directSrc: string;
  directFallbackSrc: string;
} {
  const { resolvedTheme, theme } = useTheme();
  const domThemeId = useSyncExternalStore(subscribe, readDomThemeId, getServerSnapshot);
  const activeId = normalizeThemeIdForLogo(resolvedTheme ?? theme ?? domThemeId);

  return {
    themeId: activeId,
    src: getThemeLogo(activeId),
    fallbackSrc: getThemeLogo(NURSENEST_DEFAULT_THEME),
    directSrc: getThemeLogoPublicUrl(activeId),
    directFallbackSrc: getThemeLogoPublicUrl(NURSENEST_DEFAULT_THEME),
  };
}
