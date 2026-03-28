"use client";

import { useCallback, useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { parsePositiveNumber } from "@/lib/platform-tools/parse-clinical-number";
import { trackToolCalculated, trackToolValidationError } from "@/lib/platform-tools/tool-analytics";

const SLUG = "iv-drip";

export default function IvDripTool() {
  const { t } = useMarketingI18n();
  const [mlPerHr, setMlPerHr] = useState("");
  const [dropFactor, setDropFactor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [gttMin, setGttMin] = useState<number | null>(null);

  const calculate = useCallback(() => {
    setError(null);
    setGttMin(null);
    const rate = parsePositiveNumber(mlPerHr);
    const df = parsePositiveNumber(dropFactor);
    if (rate === undefined) {
      setError(t("tools.errors.mlPerHrPositive"));
      trackToolValidationError(SLUG, "ml_per_hr");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (df === undefined) {
      setError(t("tools.errors.dropFactorPositive"));
      trackToolValidationError(SLUG, "drop_factor");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (df > 100) {
      setError(t("tools.errors.dropFactorUnrealistic"));
      trackToolValidationError(SLUG, "drop_factor");
      trackToolCalculated(SLUG, false);
      return;
    }
    const g = (rate * df) / 60;
    setGttMin(Math.round(g * 100) / 100);
    trackToolCalculated(SLUG, true);
  }, [mlPerHr, dropFactor, t]);

  const explanation = useMemo(() => {
    if (gttMin === null) return null;
    return t("tools.ivDrip.explanation");
  }, [gttMin, t]);

  return (
    <ToolShell title={t("tools.ivDrip.title")} description={t("tools.ivDrip.description")}>
      <div className="space-y-6 rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] p-6 shadow-sm">
        <div>
          <label htmlFor="rate" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
            {t("tools.ivDrip.rateLabel")}
          </label>
          <input
            id="rate"
            inputMode="decimal"
            value={mlPerHr}
            onChange={(e) => setMlPerHr(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
            placeholder={t("tools.ivDrip.ratePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="df" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
            {t("tools.ivDrip.dropFactorLabel")}
          </label>
          <input
            id="df"
            inputMode="numeric"
            value={dropFactor}
            onChange={(e) => setDropFactor(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
            placeholder={t("tools.ivDrip.dropFactorPlaceholder")}
          />
          <p className="mt-1 text-xs text-[var(--theme-muted-text)]">{t("tools.ivDrip.dropFactorHint")}</p>
        </div>
        <button
          type="button"
          onClick={calculate}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-95"
        >
          {t("tools.common.calculate")}
        </button>

        {error ? (
          <div role="alert" className="rounded-lg border border-red-300/60 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : null}

        {gttMin !== null && !error ? (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-[var(--theme-heading-text)]">{t("tools.ivDrip.resultLabel")}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-primary">
              {gttMin} <span className="text-base font-normal text-[var(--theme-muted-text)]">gtt/min</span>
            </p>
            {explanation ? <p className="mt-2 text-sm text-[var(--theme-muted-text)]">{explanation}</p> : null}
          </div>
        ) : (
          !error && <p className="text-sm text-[var(--theme-muted-text)]">{t("tools.ivDrip.emptyState")}</p>
        )}
      </div>
    </ToolShell>
  );
}
