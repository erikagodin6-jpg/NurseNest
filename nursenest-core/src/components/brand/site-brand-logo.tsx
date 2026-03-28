"use client";

import { useEffect, useState } from "react";
import { headerUsesThemeTintedBrandMark } from "@/config/marketing-cdn.catalog";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

function maskStyleUrl(href: string): string {
  return `url("${href.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;
}

/**
 * Header brand mark: either a single Spaces asset (`bluebrandlogo`) tinted with `var(--theme-primary)` via CSS mask,
 * or per-theme PNGs from the catalog when tinting is off.
 */
export function SiteBrandLogoMark({ className = "" }: { className?: string }) {
  const { src, fallbackSrc } = useThemeLogo();
  const tinted = headerUsesThemeTintedBrandMark();
  const [imgSrc, setImgSrc] = useState(src);
  const [failedFinal, setFailedFinal] = useState(false);
  const [maskReady, setMaskReady] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setFailedFinal(false);
    setMaskReady(false);
  }, [src]);

  useEffect(() => {
    if (!tinted) return;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => setMaskReady(true);
    img.onerror = () => setFailedFinal(true);
    img.src = src;
  }, [src, tinted]);

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

  if (tinted && maskReady) {
    return (
      <span
        role="img"
        aria-label="NurseNest"
        className={`inline-block h-8 w-8 shrink-0 bg-[var(--theme-primary)] ${className}`}
        style={{
          WebkitMaskImage: maskStyleUrl(src),
          maskImage: maskStyleUrl(src),
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }

  if (tinted && !maskReady) {
    return (
      <span
        className={`inline-block h-8 w-8 shrink-0 rounded-md bg-[color-mix(in_srgb,var(--theme-primary)_12%,var(--theme-card-bg))] ${className}`}
        aria-hidden
      />
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
