"use client";

import { useCallback, useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { parseAnyNumber } from "@/lib/platform-tools/parse-clinical-number";
import { trackToolCalculated, trackToolValidationError } from "@/lib/platform-tools/tool-analytics";

const SLUG = "units";

type Mode = "kg_lb" | "ml_L" | "cm_in";

export default function UnitsTool() {
  const { t } = useMarketingI18n();
  const [mode, setMode] = useState<Mode>("kg_lb");
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lineA, setLineA] = useState<string | null>(null);
  const [lineB, setLineB] = useState<string | null>(null);

  const calculate = useCallback(() => {
    setError(null);
    setLineA(null);
    setLineB(null);
    const n = parseAnyNumber(raw);
    if (n === undefined) {
      setError(t("tools.errors.numberRequired"));
      trackToolValidationError(SLUG, "value");
      trackToolCalculated(SLUG, false);
      return;
    }
    if (mode === "kg_lb") {
      const lb = n * 2.2046226218;
      const kgFromLb = n / 2.2046226218;
      setLineA(t("tools.units.lineIfKg", { value: String(Math.round(lb * 1000) / 1000) }));
      setLineB(t("tools.units.lineIfLb", { value: String(Math.round(kgFromLb * 1000) / 1000) }));
    } else if (mode === "ml_L") {
      const L = n / 1000;
      const ml = n * 1000;
      setLineA(t("tools.units.lineIfMl", { value: String(Math.round(L * 10000) / 10000) }));
      setLineB(t("tools.units.lineIfL", { value: String(Math.round(ml * 1000) / 1000) }));
    } else {
      const inches = n / 2.54;
      const cm = n * 2.54;
      setLineA(t("tools.units.lineIfCm", { value: String(Math.round(inches * 100) / 100) }));
      setLineB(t("tools.units.lineIfIn", { value: String(Math.round(cm * 100) / 100) }));
    }
    trackToolCalculated(SLUG, true);
  }, [raw, mode, t]);

  const modeHint = useMemo(() => {
    if (mode === "kg_lb") return t("tools.units.modeKgLbHint");
    if (mode === "ml_L") return t("tools.units.modeMlLHint");
    return t("tools.units.modeCmInHint");
  }, [mode, t]);

  return (
    <ToolShell title={t("tools.units.title")} description={t("tools.units.description")}>
      <div className="space-y-6 rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] p-6 shadow-sm">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-[var(--theme-heading-text)]">{t("tools.units.modeLabel")}</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["kg_lb", t("tools.units.modeKgLb")] as const,
                ["ml_L", t("tools.units.modeMlL")] as const,
                ["cm_in", t("tools.units.modeCmIn")] as const,
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setMode(key);
                  setLineA(null);
                  setLineB(null);
                  setError(null);
                }}
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                  mode === key ? "bg-primary text-primary-foreground" : "bg-[var(--theme-page-bg)] text-[var(--theme-body-text)] ring-1 ring-[var(--theme-nav-border)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="uval" className="mb-1 block text-sm font-medium text-[var(--theme-heading-text)]">
            {t("tools.units.valueLabel")}
          </label>
          <input
            id="uval"
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)] px-3 py-2 text-[var(--theme-body-text)] outline-none ring-primary/30 focus:ring-2"
            placeholder={t("tools.units.valuePlaceholder")}
          />
          <p className="mt-1 text-xs text-[var(--theme-muted-text)]">{modeHint}</p>
        </div>
        <button
          type="button"
          onClick={calculate}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-95"
        >
          {t("tools.common.convert")}
        </button>

        {error ? (
          <div role="alert" className="rounded-lg border border-red-300/60 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : null}

        {lineA && lineB && !error ? (
          <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm text-[var(--theme-heading-text)]">{lineA}</p>
            <p className="text-sm text-[var(--theme-heading-text)]">{lineB}</p>
            <p className="pt-2 text-xs text-[var(--theme-muted-text)]">{t("tools.units.bothDirections")}</p>
          </div>
        ) : (
          !error && <p className="text-sm text-[var(--theme-muted-text)]">{t("tools.units.emptyState")}</p>
        )}
      </div>
    </ToolShell>
  );
}
