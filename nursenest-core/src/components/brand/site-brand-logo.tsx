"use client";

import { useEffect, useState } from "react";
import { headerUsesThemeTintedBrandMark } from "@/config/marketing-cdn.catalog";
import { BRAND_NAME } from "@/lib/branding/logo-config";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

const LOGO_DEV_PREFIX = "[NurseNest logo]";

function warnDevRemoteFailure(message: string, detail?: unknown): void {
  if (process.env.NODE_ENV !== "development") return;
  if (detail !== undefined) {
    console.warn(`${LOGO_DEV_PREFIX} ${message}`, detail);
  } else {
    console.warn(`${LOGO_DEV_PREFIX} ${message}`);
  }
}

export type BrandMarkLoadState = "loading" | "ready" | "error";

function maskStyle(url: string) {
  const u = JSON.stringify(url);
  return {
    WebkitMaskImage: `url(${u})`,
    maskImage: `url(${u})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;
}

function ThemeTintedBrandMark({
  loadChain,
  className,
  onMarkState,
}: {
  loadChain: string[];
  className: string;
  onMarkState?: (state: BrandMarkLoadState) => void;
}) {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [failedFinal, setFailedFinal] = useState(false);

  useEffect(() => {
    onMarkState?.("loading");
    setResolvedUrl(null);
    setFailedFinal(false);

    if (loadChain.length === 0) {
      warnDevRemoteFailure("Logo load chain is empty; using text fallback in header.");
      setFailedFinal(true);
      onMarkState?.("error");
      return;
    }
    let cancelled = false;

    function probe(url: string): Promise<boolean> {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    }

    (async () => {
      for (const url of loadChain) {
        if (cancelled) return;
        const ok = await probe(url);
        if (cancelled) return;
        if (ok) {
          setResolvedUrl(url);
          onMarkState?.("ready");
          return;
        }
      }
      warnDevRemoteFailure("All logo URLs failed (tinted mask chain). Using header wordmark fallback.", loadChain);
      setFailedFinal(true);
      onMarkState?.("error");
    })();

    return () => {
      cancelled = true;
    };
  }, [loadChain, onMarkState]);

  if (failedFinal) {
    return (
      <span
        className={`inline-block h-8 w-[7.5rem] max-w-[40vw] shrink-0 ${className}`}
        aria-hidden
      />
    );
  }

  if (!resolvedUrl) {
    return (
      <span
        className={`inline-block h-8 w-8 shrink-0 rounded-md bg-[var(--theme-muted-surface)]/40 ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <span
      className={`inline-block h-8 w-auto min-w-8 max-w-[10rem] shrink-0 bg-[var(--theme-primary)] ${className}`}
      style={{ ...maskStyle(resolvedUrl), aspectRatio: "400 / 119" }}
      role="img"
      aria-label={BRAND_NAME}
    />
  );
}

/**
 * Header brand mark: canonical blue-brand asset + CSS mask + `var(--theme-primary)` when the catalog
 * enables tinting; otherwise per-theme rasters from `getThemeLogoLoadChain`.
 */
export function SiteBrandLogoMark({
  className = "",
  onMarkState,
}: {
  className?: string;
  onMarkState?: (state: BrandMarkLoadState) => void;
}) {
  const tintedHeaderMark = headerUsesThemeTintedBrandMark();
  const { loadChain } = useThemeLogo();
  const [attempt, setAttempt] = useState(0);
  const [failedFinal, setFailedFinal] = useState(false);
  const [imgStatus, setImgStatus] = useState<BrandMarkLoadState>("loading");
  const imgSrc = loadChain[attempt] ?? loadChain[0] ?? "";

  useEffect(() => {
    setAttempt(0);
    setFailedFinal(false);
    setImgStatus("loading");
  }, [loadChain]);

  useEffect(() => {
    if (tintedHeaderMark) return;
    onMarkState?.(imgStatus);
  }, [tintedHeaderMark, imgStatus, onMarkState]);

  if (tintedHeaderMark) {
    return <ThemeTintedBrandMark loadChain={loadChain} className={className} onMarkState={onMarkState} />;
  }

  if (failedFinal) {
    return (
      <span
        className={`inline-block h-8 w-[7.5rem] max-w-[40vw] shrink-0 ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <img
      key={`${imgSrc}-${attempt}`}
      src={imgSrc}
      alt={BRAND_NAME}
      width={160}
      height={48}
      className={`h-8 w-auto max-h-8 max-w-[10rem] shrink-0 object-contain object-left ${className}`}
      loading="eager"
      decoding="async"
      suppressHydrationWarning
      onLoad={() => setImgStatus("ready")}
      onError={() => {
        if (attempt === 0) {
          warnDevRemoteFailure("Primary logo failed to load; advancing fallback chain.", imgSrc);
        }
        if (attempt + 1 < loadChain.length) {
          setAttempt((a) => a + 1);
        } else {
          warnDevRemoteFailure("All logo URLs in chain failed. Using header wordmark fallback.", loadChain);
          setFailedFinal(true);
          setImgStatus("error");
        }
      }}
    />
  );
}
