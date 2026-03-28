"use client";

import { useCallback, useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { parsePositiveNumber } from "@/lib/platform-tools/parse-clinical-number";
import { trackToolCalculated, trackToolValidationError } from "@/lib/platform-tools/tool-analytics";

const SLUG = "infusion-ml-hr";

export default function InfusionMlHrTool() {
  const { t } = useMarketingI18n();
  const [volumeMl, setVolumeMl] = useState("");
  const [hours, setHours] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mlPerHr, setMlPerHr] = useState<number | null>(null);

  const calculate = useCallback(() => {
    setError(null);
    setMlPerHr(null);
    const v = parsePositiveNumber(volumeMl);
    const h = parsePositiveNumber(hours);
    if (v === undefined) {
      setError(t("tools.errors.volumePositive"));
      trackToolValidationError(SLUG, "volume_ml");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (h === undefined || h <= 0) {
      setError(t("tools.errors.hoursPositive"));
      trackToolValidationError(SLUG, "hours");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (h > 168) {
      setError(t("tools.errors.hoursUnrealistic"));
      trackToolValidationError(SLUG, "hours");
      trackToolCalculated(SLUG, false);
      return;
    }
    const rate = v / h;
    setMlPerHr(Math.round(rate * 1000) / 1000);
    trackToolCalculated(SLUG, true);
  }, [volumeMl, hours, t]);

  const explanation = useMemo(() => {
    if (mlPerHr === null) return null;
    return t("tools.infusionMlHr.explanation");
  }, [mlPerHr, t]);

  return (
    <ToolShell title={t("tools.infusionMlHr.title")} description={t("tools.infusionMlHr.description")}>
      <div className="space-y-6 rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] p-6 shadow-sm">
        <div>
          <label htmlFor="vol" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
            {t("tools.infusionMlHr.volumeLabel")}
          </label>
          <input
            id="vol"
            inputMode="decimal"
            value={volumeMl}
            onChange={(e) => setVolumeMl(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
            placeholder={t("tools.infusionMlHr.volumePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="hr" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
            {t("tools.infusionMlHr.hoursLabel")}
          </label>
          <input
            id="hr"
            inputMode="decimal"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
            placeholder={t("tools.infusionMlHr.hoursPlaceholder")}
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

        {mlPerHr !== null && !error ? (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-[var(--theme-heading-text)]">{t("tools.infusionMlHr.resultLabel")}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-primary">
              {mlPerHr} <span className="text-base font-normal text-[var(--theme-muted-text)]">mL/hr</span>
            </p>
            {explanation ? <p className="mt-2 text-sm text-[var(--theme-muted-text)]">{explanation}</p> : null}
          </div>
        ) : (
          !error && <p className="text-sm text-[var(--theme-muted-text)]">{t("tools.infusionMlHr.emptyState")}</p>
        )}
      </div>
    </ToolShell>
  );
}
