"use client";

import { useEffect, useState } from "react";
import { useThemeLogo } from "@/lib/theme/use-theme-logo";

export type BrandMarkLoadState = "loading" | "ready" | "error";

/**
 * Brand mark: real CDN logo files from `theme-brand-logo-cdn.ts` (no CSS mask, tint, or filters).
 */
export function SiteBrandLogoMark({
  className = "",
  onMarkState,
}: {
  className?: string;
  onMarkState?: (state: BrandMarkLoadState) => void;
}) {
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
    onMarkState?.(imgStatus);
  }, [imgStatus, onMarkState]);

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
