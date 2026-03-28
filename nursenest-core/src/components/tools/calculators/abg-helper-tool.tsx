"use client";

import { useCallback, useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import type { AbgPattern } from "@/lib/platform-tools/abg-interpret";
import { interpretAbgSimple } from "@/lib/platform-tools/abg-interpret";
import { parseAnyNumber } from "@/lib/platform-tools/parse-clinical-number";
import { trackToolCalculated, trackToolValidationError } from "@/lib/platform-tools/tool-analytics";
import { useMarketingI18n } from "@/lib/marketing-i18n";

const SLUG = "abg";

function abgDetailKey(pattern: AbgPattern): string {
  const map: Record<AbgPattern, string> = {
    respiratory_acidosis: "tools.abg.detail.respiratory_acidosis",
    respiratory_alkalosis: "tools.abg.detail.respiratory_alkalosis",
    metabolic_acidosis: "tools.abg.detail.metabolic_acidosis",
    metabolic_alkalosis: "tools.abg.detail.metabolic_alkalosis",
    mixed_or_compensated: "tools.abg.detail.mixed_or_compensated",
    within_typical: "tools.abg.detail.within_typical",
  };
  return map[pattern];
}

function abgTitleKey(pattern: AbgPattern): string {
  const map: Record<AbgPattern, string> = {
    respiratory_acidosis: "tools.abg.patternRespiratoryAcidosis",
    respiratory_alkalosis: "tools.abg.patternRespiratoryAlkalosis",
    metabolic_acidosis: "tools.abg.patternMetabolicAcidosis",
    metabolic_alkalosis: "tools.abg.patternMetabolicAlkalosis",
    mixed_or_compensated: "tools.abg.patternMixed",
    within_typical: "tools.abg.patternWithinTypical",
  };
  return map[pattern];
}

export default function AbgHelperTool() {
  const { t } = useMarketingI18n();
  const [pH, setPH] = useState("");
  const [pco2, setPco2] = useState("");
  const [hco3, setHco3] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const calculate = useCallback(() => {
    setError(null);
    setSummary(null);
    const ph = parseAnyNumber(pH);
    const co2 = parseAnyNumber(pco2);
    const bic = parseAnyNumber(hco3);
    if (ph === undefined || ph < 6.8 || ph > 7.8) {
      setError(t("tools.errors.phRange"));
      trackToolValidationError(SLUG, "ph");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (co2 === undefined || co2 < 10 || co2 > 100) {
      setError(t("tools.errors.pco2Range"));
      trackToolValidationError(SLUG, "pco2");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (bic === undefined || bic < 5 || bic > 50) {
      setError(t("tools.errors.hco3Range"));
      trackToolValidationError(SLUG, "hco3");
      trackToolCalculated(SLUG, false);
      return;
    }
    const pattern = interpretAbgSimple(ph, co2, bic);
    setSummary(`${t(abgTitleKey(pattern))}\n\n${t(abgDetailKey(pattern))}`);
    trackToolCalculated(SLUG, true);
  }, [pH, pco2, hco3, t]);

  return (
    <ToolShell title={t("tools.abg.title")} description={t("tools.abg.description")}>
      <div className="space-y-6 rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="ph" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
              pH
            </label>
            <input
              id="ph"
              inputMode="decimal"
              value={pH}
              onChange={(e) => setPH(e.target.value)}
              className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
              placeholder="7.40"
            />
          </div>
          <div>
            <label htmlFor="pco2" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
              PaCO₂ (mmHg)
            </label>
            <input
              id="pco2"
              inputMode="decimal"
              value={pco2}
              onChange={(e) => setPco2(e.target.value)}
              className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
              placeholder="40"
            />
          </div>
          <div>
            <label htmlFor="hco3" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
              HCO₃⁻ (mEq/L)
            </label>
            <input
              id="hco3"
              inputMode="decimal"
              value={hco3}
              onChange={(e) => setHco3(e.target.value)}
              className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
              placeholder="24"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={calculate}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-95"
        >
          {t("tools.common.interpret")}
        </button>

        {error ? (
          <div role="alert" className="rounded-lg border border-red-300/60 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : null}

        {summary && !error ? (
          <div className="whitespace-pre-line rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed text-[var(--theme-body-text)]">
            {summary}
          </div>
        ) : (
          !error && <p className="text-sm text-[var(--theme-muted-text)]">{t("tools.abg.emptyState")}</p>
        )}
      </div>
    </ToolShell>
  );
}
