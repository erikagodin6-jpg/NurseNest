"use client";

import { useEffect, useState } from "react";
import { headerUsesThemeTintedBrandMark } from "@/config/marketing-cdn.catalog";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

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
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] text-sm font-extrabold text-[var(--theme-primary)] ${className}`}
        aria-hidden
      >
        N
      </span>
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
      className={`inline-block h-8 w-8 shrink-0 bg-[var(--theme-primary)] ${className}`}
      style={maskStyle(resolvedUrl)}
      aria-hidden
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
        if (attempt + 1 < loadChain.length) {
          setAttempt((a) => a + 1);
        } else {
          setFailedFinal(true);
          setImgStatus("error");
        }
      }}
    />
  );
}
