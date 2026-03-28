"use client";

import { useEffect, useMemo, useState } from "react";
import { headerUsesThemeTintedBrandMark } from "@/config/marketing-cdn.catalog";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

export type BrandMarkLoadState = "loading" | "ready" | "error";

function uniqueLogoUrls(...urls: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    if (!u || seen.has(u)) continue;
    seen.add(u);
    out.push(u);
  }
  return out;
}

/**
 * Single Spaces asset (`primaryBrandMarkObjectKey`, e.g. bluebrandlogo) tinted with `var(--theme-primary)`.
 * Requires a PNG with transparency around the mark; alpha defines the mask shape.
 */
function ThemeMaskedBrandMark({
  src,
  directSrc,
  fallbackSrc,
  directFallbackSrc,
  className,
  onMarkState,
}: {
  src: string;
  directSrc: string;
  fallbackSrc: string;
  directFallbackSrc: string;
  className: string;
  onMarkState?: (state: BrandMarkLoadState) => void;
}) {
  const [status, setStatus] = useState<BrandMarkLoadState>("loading");
  const [maskUrl, setMaskUrl] = useState(src);

  useEffect(() => {
    onMarkState?.(status);
  }, [status, onMarkState]);

  useEffect(() => {
    setStatus("loading");
    let cancelled = false;
    const urls = uniqueLogoUrls(src, directSrc, fallbackSrc, directFallbackSrc);
    let idx = 0;

    function tryNext() {
      if (cancelled) return;
      if (idx >= urls.length) {
        setStatus("error");
        return;
      }
      const url = urls[idx++];
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setMaskUrl(url);
        setStatus("ready");
      };
      img.onerror = tryNext;
      img.src = url;
    }

    tryNext();
    return () => {
      cancelled = true;
    };
  }, [src, directSrc, fallbackSrc, directFallbackSrc]);

  if (status === "error") {
    return (
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] text-sm font-extrabold text-[var(--theme-primary)] ${className}`}
        aria-hidden
      >
        N
      </span>
    );
  }

  return (
    <span
      className={`inline-block h-8 w-8 shrink-0 bg-[var(--theme-primary)] ${status === "loading" ? "opacity-50" : ""} ${className}`}
      style={{
        maskImage: `url("${maskUrl}")`,
        WebkitMaskImage: `url("${maskUrl}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      aria-hidden
    />
  );
}

/**
 * Brand mark: `primaryBrandMarkThemeTinted` + mask (`bluebrandlogo`), or per-theme PNGs from the catalog.
 */
export function SiteBrandLogoMark({
  className = "",
  onMarkState,
}: {
  className?: string;
  onMarkState?: (state: BrandMarkLoadState) => void;
}) {
  const { src, fallbackSrc, directSrc, directFallbackSrc } = useThemeLogo();
  const useTintedMask = headerUsesThemeTintedBrandMark();
  const imgChain = useMemo(
    () => uniqueLogoUrls(src, directSrc, fallbackSrc, directFallbackSrc),
    [src, directSrc, fallbackSrc, directFallbackSrc],
  );
  const [attempt, setAttempt] = useState(0);
  const [failedFinal, setFailedFinal] = useState(false);
  const [imgStatus, setImgStatus] = useState<BrandMarkLoadState>("loading");
  const imgSrc = imgChain[attempt] ?? imgChain[0] ?? "";

  useEffect(() => {
    setAttempt(0);
    setFailedFinal(false);
    setImgStatus("loading");
  }, [src, directSrc, fallbackSrc, directFallbackSrc]);

  useEffect(() => {
    if (useTintedMask) return;
    onMarkState?.(imgStatus);
  }, [useTintedMask, imgStatus, onMarkState]);

  if (useTintedMask) {
    return (
      <ThemeMaskedBrandMark
        src={src}
        directSrc={directSrc}
        fallbackSrc={fallbackSrc}
        directFallbackSrc={directFallbackSrc}
        className={className}
        onMarkState={onMarkState}
      />
    );
  }

  if (failedFinal) {
    return (
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] text-sm font-extrabold text-[var(--theme-primary)] ${className}`}
        aria-hidden
      >
        N
      </span>
    );
  }

  return (
    <img
      key={`${imgSrc}-${attempt}`}
      src={imgSrc}
      alt=""
      width={32}
      height={32}
      className={`h-8 w-8 shrink-0 object-contain ${className}`}
      loading="eager"
      decoding="async"
      suppressHydrationWarning
      onLoad={() => setImgStatus("ready")}
      onError={() => {
        if (attempt + 1 < imgChain.length) {
          setAttempt((a) => a + 1);
        } else {
          setFailedFinal(true);
          setImgStatus("error");
        }
      }}
    />
  );
}
