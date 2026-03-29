"use client";

import { useCallback, useEffect, useState } from "react";
import { BRAND_NAME, PRIMARY_LOGO_URL, SITE_LOGO_FALLBACK_PATH } from "@/lib/branding/logo-config";

export type BrandMarkLoadState = "loading" | "ready" | "error";

/**
 * Global brand mark: fixed CDN PNG, then same-origin SVG fallback. No proxy, no theme-based URLs.
 */
export function SiteBrandLogoMark({
  className = "",
  onMarkState,
}: {
  className?: string;
  onMarkState?: (state: BrandMarkLoadState) => void;
}) {
  const [useFallback, setUseFallback] = useState(false);
  const src = useFallback ? SITE_LOGO_FALLBACK_PATH : PRIMARY_LOGO_URL;

  useEffect(() => {
    onMarkState?.("loading");
  }, [onMarkState]);

  const handleLoad = useCallback(() => {
    onMarkState?.("ready");
  }, [onMarkState]);

  const handleError = useCallback(() => {
    if (!useFallback) {
      setUseFallback(true);
      return;
    }
    onMarkState?.("error");
  }, [useFallback, onMarkState]);

  return (
    <span className="inline-block h-8 min-h-8 min-w-[7.5rem] max-w-[min(100%,12rem)] shrink-0 [&>img]:block">
      <img
        key={src}
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
