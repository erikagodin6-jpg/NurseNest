"use client";

import { useCallback, useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { parsePositiveNumber } from "@/lib/platform-tools/parse-clinical-number";
import { trackToolCalculated, trackToolValidationError } from "@/lib/platform-tools/tool-analytics";

const SLUG = "dose-per-kg";

export default function DosePerKgTool() {
  const { t } = useMarketingI18n();
  const [weightKg, setWeightKg] = useState("");
  const [mgPerKg, setMgPerKg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resultMg, setResultMg] = useState<number | null>(null);

  const calculate = useCallback(() => {
    setError(null);
    setResultMg(null);
    const w = parsePositiveNumber(weightKg);
    const d = parsePositiveNumber(mgPerKg);
    if (w === undefined) {
      setError(t("tools.errors.weightPositive"));
      trackToolValidationError(SLUG, "weight_kg");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (d === undefined) {
      setError(t("tools.errors.dosePerKgPositive"));
      trackToolValidationError(SLUG, "mg_per_kg");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (w > 500) {
      setError(t("tools.errors.weightUnrealistic"));
      trackToolValidationError(SLUG, "weight_kg");
      trackToolCalculated(SLUG, false);
      return;
    }
    const total = w * d;
    setResultMg(Math.round(total * 1000) / 1000);
    trackToolCalculated(SLUG, true);
  }, [weightKg, mgPerKg, t]);

  const explanation = useMemo(() => {
    if (resultMg === null) return null;
    return t("tools.dosePerKg.explanation");
  }, [resultMg, t]);

  return (
    <ToolShell title={t("tools.dosePerKg.title")} description={t("tools.dosePerKg.description")}>
      <div className="space-y-6 rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] p-6 shadow-sm">
        <div>
          <label htmlFor="w" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
            {t("tools.dosePerKg.weightLabel")}
          </label>
          <input
            id="w"
            inputMode="decimal"
            autoComplete="off"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
            placeholder={t("tools.dosePerKg.weightPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="d" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
            {t("tools.dosePerKg.doseLabel")}
          </label>
          <input
            id="d"
            inputMode="decimal"
            autoComplete="off"
            value={mgPerKg}
            onChange={(e) => setMgPerKg(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
            placeholder={t("tools.dosePerKg.dosePlaceholder")}
          />
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

        {resultMg !== null && !error ? (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-[var(--theme-heading-text)]">{t("tools.dosePerKg.resultLabel")}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-primary">
              {resultMg} <span className="text-base font-normal text-[var(--theme-muted-text)]">mg</span>
            </p>
            {explanation ? <p className="mt-2 text-sm text-[var(--theme-muted-text)]">{explanation}</p> : null}
          </div>
        ) : (
          !error && (
            <p className="text-sm text-[var(--theme-muted-text)]">{t("tools.dosePerKg.emptyState")}</p>
          )
        )}
      </div>
    </ToolShell>
  );
}
