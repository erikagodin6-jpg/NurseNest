"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { withMarketingLocale } from "@/lib/i18n/marketing-path";
import { trackToolClientError } from "@/lib/platform-tools/tool-analytics";

export default function LocalizedToolsErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale, t } = useMarketingI18n();

  useEffect(() => {
    trackToolClientError("tools-route", error.message || "unknown");
  }, [error]);

  const toolsHref = withMarketingLocale(locale, "/tools");

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-[var(--theme-heading-text)]">{t("pages.tools.errorTitle")}</h1>
      <p className="mt-2 text-sm text-[var(--theme-muted-text)]">{t("pages.tools.errorBody")}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {t("pages.tools.errorRetry")}
        </button>
        <Link href={toolsHref} className="rounded-lg border border-[var(--theme-nav-border)] px-4 py-2 text-sm font-medium text-[var(--theme-heading-text)]">
          {t("pages.tools.backToHub")}
        </Link>
      </div>
    </div>
  );
}
