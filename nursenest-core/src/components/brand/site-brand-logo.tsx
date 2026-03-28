"use client";

import { useState } from "react";
import { getBrandLogoMarkResolvedUrl } from "@/lib/marketing-assets";

/**
 * Header brand mark: loads `brand/bluebrandlogo.*` from Spaces (via proxy) and tints with `var(--theme-primary)`
 * using CSS mask so the mark tracks the active theme like buttons and accents.
 */
export function SiteBrandLogoMark({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const url = getBrandLogoMarkResolvedUrl();

  if (state === "error") {
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
    <span className={`relative inline-flex h-8 w-8 shrink-0 items-center justify-center ${className}`}>
      <img
        src={url}
        alt=""
        width={32}
        height={32}
        className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
        loading="eager"
        decoding="async"
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
      />
      {state === "loading" ? (
        <span className="block h-8 w-8 rounded-md bg-primary/15" aria-hidden />
      ) : (
        <span
          className="block h-8 w-8"
          style={{
            backgroundColor: "var(--theme-primary)",
            WebkitMaskImage: `url(${url})`,
            maskImage: `url(${url})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
          aria-hidden
        />
      )}
    </span>
  );
}
