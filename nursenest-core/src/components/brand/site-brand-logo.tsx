"use client";

import { useEffect, useState } from "react";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

/**
 * Brand mark: one pre-colored PNG per theme from DigitalOcean Spaces (`theme-logo-map` / catalog JSON).
 * No CSS filters, masks, or runtime recoloring — only the mapped file per active `data-theme`.
 */
export function SiteBrandLogoMark({ className = "" }: { className?: string }) {
  const { src, fallbackSrc } = useThemeLogo();
  const [imgSrc, setImgSrc] = useState(src);
  const [failedFinal, setFailedFinal] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setFailedFinal(false);
  }, [src]);

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
      src={imgSrc}
      alt=""
      width={32}
      height={32}
      className={`h-8 w-8 shrink-0 object-contain ${className}`}
      loading="eager"
      decoding="async"
      suppressHydrationWarning
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        } else {
          setFailedFinal(true);
        }
      }}
    />
  );
}
