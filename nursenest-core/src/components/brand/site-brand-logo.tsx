"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getResolvedThemeLogoUrl } from "@/lib/marketing-assets";
import { NURSENEST_DEFAULT_THEME } from "@/lib/theme/theme-registry";

/**
 * Header brand mark: pre-colored raster per theme from `marketing-cdn.catalog.json` → `logo.themeBrandLogoObjectKeys`.
 * Uses next-themes `resolvedTheme` / `theme` (same source as `data-theme` on `<html>`).
 */
export function SiteBrandLogoMark({ className = "" }: { className?: string }) {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const fallbackUrl = getResolvedThemeLogoUrl(NURSENEST_DEFAULT_THEME);
  const [src, setSrc] = useState(fallbackUrl);
  const [failedFinal, setFailedFinal] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const id = (resolvedTheme ?? theme ?? NURSENEST_DEFAULT_THEME) as string;
    setSrc(getResolvedThemeLogoUrl(id));
    setFailedFinal(false);
  }, [mounted, resolvedTheme, theme]);

  if (failedFinal) {
    return (
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] text-sm font-extrabold text-primary ${className}`}
        aria-hidden
      >
        N
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={32}
      height={32}
      className={`h-8 w-8 shrink-0 object-contain ${className}`}
      loading="eager"
      decoding="async"
      suppressHydrationWarning
      onError={() => {
        if (src !== fallbackUrl) {
          setSrc(fallbackUrl);
        } else {
          setFailedFinal(true);
        }
      }}
    />
  );
}
