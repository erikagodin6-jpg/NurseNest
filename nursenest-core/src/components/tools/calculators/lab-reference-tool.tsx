"use client";

import { ToolShell } from "@/components/tools/tool-shell";
import { LAB_PANELS } from "@/content/tools/lab-reference-data";
import { useMarketingI18n } from "@/lib/marketing-i18n";

export default function LabReferenceTool() {
  const { t } = useMarketingI18n();

  return (
    <ToolShell title={t("tools.labReference.title")} description={t("tools.labReference.description")}>
      <div className="space-y-6">
        <p className="text-sm text-[var(--theme-muted-text)]">{t("tools.labReference.intro")}</p>
        {LAB_PANELS.map((panel) => (
          <section
            key={panel.id}
            className="overflow-hidden rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] shadow-sm"
          >
            <h2 className="border-b border-[var(--theme-nav-border)] bg-[var(--theme-page-bg)]/50 px-4 py-3 text-sm font-semibold text-[var(--theme-heading-text)]">
              {t(panel.titleKey)}
            </h2>
            <ul className="divide-y divide-[var(--theme-nav-border)]">
              {panel.rows.map((row) => (
                <li key={row.name} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="text-sm font-medium text-[var(--theme-heading-text)]">{row.name}</span>
                  <span className="text-sm tabular-nums text-[var(--theme-body-text)] sm:text-right">{row.interval}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-xs leading-relaxed text-[var(--theme-muted-text)]">{t("tools.labReference.footer")}</p>
      </div>
    </ToolShell>
  );
}
