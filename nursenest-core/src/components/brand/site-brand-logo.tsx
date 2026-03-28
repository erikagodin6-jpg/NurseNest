"use client";

import { useEffect, useState } from "react";
import { headerUsesThemeTintedBrandMark } from "@/config/marketing-cdn.catalog";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

/**
 * Single Spaces asset (`primaryBrandMarkObjectKey`, e.g. bluebrandlogo) tinted with `var(--theme-primary)`.
 * Requires a PNG with transparency around the mark; alpha defines the mask shape.
 */
function ThemeMaskedBrandMark({ src, fallbackSrc, className }: { src: string; fallbackSrc: string; className: string }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [maskUrl, setMaskUrl] = useState(src);

  useEffect(() => {
    setStatus("loading");
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setMaskUrl(src);
      setStatus("ready");
    };
    img.onerror = () => {
      if (cancelled) return;
      if (src !== fallbackSrc) {
        const img2 = new Image();
        img2.onload = () => {
          if (cancelled) return;
          setMaskUrl(fallbackSrc);
          setStatus("ready");
        };
        img2.onerror = () => {
          if (!cancelled) setStatus("error");
        };
        img2.src = fallbackSrc;
      } else {
        setStatus("error");
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, fallbackSrc]);

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
export function SiteBrandLogoMark({ className = "" }: { className?: string }) {
  const { src, fallbackSrc } = useThemeLogo();
  const [imgSrc, setImgSrc] = useState(src);
  const [failedFinal, setFailedFinal] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setFailedFinal(false);
  }, [src]);

  if (headerUsesThemeTintedBrandMark()) {
    return <ThemeMaskedBrandMark src={src} fallbackSrc={fallbackSrc} className={className} />;
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
