"use client";

import { useCallback, useEffect, useState } from "react";
import { BRAND_NAME } from "@/lib/branding/logo-config";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

export type BrandMarkLoadState = "loading" | "ready" | "error";

/**
 * Theme-aware header mark: `useThemeLogo` → `getHeaderBrandLogoLoadChain` (per-theme Spaces PNG + fallbacks).
 * Advances through the chain on `onError` (no infinite loop — bounded by chain length).
 */
export function SiteBrandLogoMark({
  className = "",
  onMarkState,
}: {
  className?: string;
  onMarkState?: (state: BrandMarkLoadState) => void;
}) {
  const { themeId, loadChain } = useThemeLogo();
  const [candidateIndex, setCandidateIndex] = useState(0);

  useEffect(() => {
    setCandidateIndex(0);
  }, [themeId, loadChain]);

  const safeIndex = Math.min(candidateIndex, Math.max(0, loadChain.length - 1));
  const src = loadChain[safeIndex] ?? loadChain[0];

  useEffect(() => {
    onMarkState?.("loading");
  }, [onMarkState, src]);

  const handleLoad = useCallback(() => {
    onMarkState?.("ready");
  }, [onMarkState]);

  const handleError = useCallback(() => {
    if (candidateIndex < loadChain.length - 1) {
      setCandidateIndex((i) => i + 1);
      return;
    }
    onMarkState?.("error");
  }, [candidateIndex, loadChain.length, onMarkState]);

  return (
    <span className="inline-block h-8 min-h-8 min-w-[7.5rem] max-w-[min(100%,12rem)] shrink-0 [&>img]:block">
      <img
        key={`${themeId}-${safeIndex}-${src}`}
        src={src}
        alt={BRAND_NAME}
        width={160}
        height={48}
        loading="eager"
        decoding="sync"
        className={`h-8 w-auto max-h-8 max-w-[min(100%,12rem)] object-contain object-left ${className}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </span>
  );
}
