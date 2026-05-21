import type { ClinicalSkillMilestone } from "@/lib/clinical-skills/types";

export function CompetencyTrack({ milestones }: { milestones: ClinicalSkillMilestone[] }) {
  const last = milestones[milestones.length - 1];
  const pct = last?.percent ?? 0;

  return (
    <div className="space-y-3" data-testid="clinical-skill-competency-track">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--theme-heading-text)]">Competency progression</p>
        <p className="text-xs font-medium text-[var(--theme-muted-text)]">{pct}% milestone map</p>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Competency progress"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="grid gap-2 sm:grid-cols-3">
        {milestones.map((m) => (
          <li
            key={m.label}
            className="rounded-xl border border-border bg-card px-3 py-2 text-xs text-[var(--theme-body-text)]"
          >
            <span className="font-semibold text-[var(--theme-heading-text)]">{m.percent}%</span>
            <span className="mt-1 block text-[var(--theme-muted-text)]">{m.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
