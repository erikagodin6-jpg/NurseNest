import Link from "next/link";
import type { ClinicalSkillDefinition } from "@/lib/clinical-skills/types";
import { clinicalSkillHref } from "@/lib/clinical-skills/links";

const DIFFICULTY_LABEL: Record<1 | 2 | 3, string> = {
  1: "Foundational",
  2: "Intermediate",
  3: "Advanced",
};

export function ClinicalSkillCard({
  skill,
  examTarget,
  audience,
}: {
  skill: ClinicalSkillDefinition;
  examTarget?: string | null;
  audience?: string | null;
}) {
  const href = clinicalSkillHref(skill.slug, {
    examTarget: examTarget ?? undefined,
    audience: audience ?? undefined,
  });
  const pathwayLabel = skill.npAdvanced ? "NP emphasis" : "Core pathway";

  return (
    <Link
      href={href}
      className="nn-card nn-card-interactive flex flex-col gap-3 p-4 sm:p-5"
      data-testid={`clinical-skill-card-${skill.slug}`}
    >
      <div className="flex items-start gap-3">
        <div className="nn-accent-icon-wrap size-11 shrink-0 rounded-xl">
          <span className="nn-accent-icon text-lg font-semibold" aria-hidden>
            {skill.title.slice(0, 1)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-[var(--theme-heading-text)]">{skill.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-[var(--theme-muted-text)]">{skill.summary}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--theme-body-text)]">
        <span className="rounded-full border border-border bg-muted px-2.5 py-1">{skill.minutesEstimate} min</span>
        <span className="rounded-full border border-border bg-muted px-2.5 py-1">{DIFFICULTY_LABEL[skill.difficulty]}</span>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-primary">{pathwayLabel}</span>
      </div>
    </Link>
  );
}
