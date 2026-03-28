import type { ExamFamily, TierCode } from "@prisma/client";
import type { ParsedLearningProfile } from "@/lib/learning/profile-shape";
import { examFamilyHintForTier } from "@/lib/learning/learning-signals";

export type StudyPathStep = {
  id: string;
  title: string;
  done: boolean;
  href: string;
};

/**
 * Lightweight ordered checklist derived from role, exam focus, and weakest systems. Adjusts as profile grows.
 */
export function buildStudyPath(args: {
  tier: TierCode;
  examFamily?: ExamFamily | null;
  profile: ParsedLearningProfile | null;
}): StudyPathStep[] {
  const family = args.examFamily ?? examFamilyHintForTier(args.tier);
  const profile = args.profile;

  const weakSystems = profile
    ? Object.entries(profile.aggregatesBySystem)
        .filter(([, b]) => b.t >= 2 && b.c / b.t < 0.58)
        .sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t)
        .slice(0, 3)
        .map(([k]) => k)
    : [];

  const steps: StudyPathStep[] = [
    {
      id: "baseline-mock",
      title: `Baseline mock (${family.replace(/_/g, " ")})`,
      done: (profile?.examScoreHistory.length ?? 0) > 0,
      href: "/app/exams",
    },
    {
      id: "weak-drill",
      title: weakSystems.length
        ? `Targeted questions: ${weakSystems[0].replace(/_/g, " ")}`
        : "Targeted questions: mixed systems",
      done: (profile?.totalPracticeAttempts ?? 0) > 30,
      href: "/app/questions",
    },
    {
      id: "lessons-gap",
      title: "Close gaps with clinical lessons",
      done: false,
      href: "/app/lessons",
    },
    {
      id: "cat-recheck",
      title: "CAT recheck under time pressure",
      done: (profile?.examScoreHistory.length ?? 0) > 2,
      href: "/app/exams",
    },
  ];

  return steps;
}
