import Link from "next/link";
import { CLINICAL_SKILL_CATEGORIES, groupSkillsByCategory } from "@/lib/clinical-skills/catalog";
import type { ClinicalSkillDefinition } from "@/lib/clinical-skills/types";
import { ClinicalSkillCard } from "./clinical-skill-card";
import { clinicalSkillsHubHref } from "@/lib/clinical-skills/links";

export function ClinicalSkillsHubView({
  skills,
  examTarget,
  audience,
}: {
  skills: ClinicalSkillDefinition[];
  examTarget?: string | null;
  audience?: string | null;
}) {
  const grouped = groupSkillsByCategory(skills);
  const hubQs = clinicalSkillsHubHref({ examTarget: examTarget ?? undefined, audience: audience ?? undefined });

  return (
    <div className="space-y-10" data-testid="clinical-skills-hub">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-muted-text)]">
          Premium clinical competency lab
        </p>
        <h1 className="text-3xl font-bold text-[var(--theme-heading-text)]">Clinical skills</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--theme-body-text)]">
          Interactive procedure walkthroughs with competency milestones — structured like your other premium modules,
          optimized for mobile review between shifts.
        </p>
        {audience === "np" ? (
          <p className="max-w-3xl rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-[var(--theme-body-text)]">
            NP view: advanced airway and assessment skills are surfaced first; all shared competencies remain
            available below.
          </p>
        ) : null}
      </header>

      {CLINICAL_SKILL_CATEGORIES.map((cat) => {
        const list = grouped.get(cat.id) ?? [];
        if (list.length === 0) return null;
        return (
          <section key={cat.id} className="space-y-4" aria-labelledby={`clinical-cat-${cat.id}`}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id={`clinical-cat-${cat.id}`} className="text-xl font-semibold text-[var(--theme-heading-text)]">
                  {cat.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--theme-muted-text)]">{cat.description}</p>
              </div>
              <Link href={hubQs} className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
                Reset filters
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {list.map((skill) => (
                <ClinicalSkillCard key={skill.slug} skill={skill} examTarget={examTarget} audience={audience} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
