import Link from "next/link";
import { clinicalSkillHref } from "@/lib/clinical-skills/links";

type AdaptiveClinicalNudgeProps = {
  missedLabel: string;
  skillSlug: string;
  examTarget?: string | null;
  audience?: string | null;
  className?: string;
};

/**
 * Remediation strip aligned with other “Because you missed…” surfaces — minimal props,
 * links into the clinical skills walkthrough with pathway context preserved.
 */
export function AdaptiveClinicalNudge({
  missedLabel,
  skillSlug,
  examTarget,
  audience,
  className = "",
}: AdaptiveClinicalNudgeProps) {
  const href = clinicalSkillHref(skillSlug, {
    examTarget: examTarget ?? undefined,
    audience: audience ?? undefined,
  });

  return (
    <div
      className={`rounded-2xl border border-primary/20 bg-[color-mix(in_srgb,var(--theme-primary)_8%,var(--theme-card-bg))] p-4 sm:p-5 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-muted-text)]">
        Adaptive remediation
      </p>
      <p className="mt-2 text-sm text-[var(--theme-body-text)]">
        Because you missed cues on{" "}
        <span className="font-semibold text-[var(--theme-heading-text)]">{missedLabel}</span>, review this
        competency walkthrough next.
      </p>
      <Link
        href={href}
        className="mt-3 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        Open skill module
      </Link>
    </div>
  );
}
