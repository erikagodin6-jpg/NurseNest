import type { ParsedLearningProfile } from "@/lib/learning/profile-shape";
import { computeReadiness } from "@/lib/learning/readiness";
import { buildLearningSignals } from "@/lib/learning/learning-signals";

export type StudyRecommendation = {
  id: string;
  title: string;
  detail: string;
  href: string;
  priority: number;
};

function topWeakSystems(profile: ParsedLearningProfile | null, n: number): string[] {
  if (!profile) return [];
  const rows = Object.entries(profile.aggregatesBySystem)
    .map(([key, b]) => ({ key, acc: b.t > 0 ? b.c / b.t : 1, t: b.t }))
    .filter((x) => x.t >= 2)
    .sort((a, b) => a.acc - b.acc);
  return rows.slice(0, n).map((r) => r.key);
}

/**
 * Short, actionable strings for dashboard / API consumers.
 */
export function buildRecommendations(profile: ParsedLearningProfile | null): StudyRecommendation[] {
  const readiness = computeReadiness(profile);
  const sig = buildLearningSignals(profile);
  const out: StudyRecommendation[] = [];

  const weakSys = topWeakSystems(profile, 2).filter((k) => k !== "__na__");
  if (weakSys.length) {
    out.push({
      id: "weak-system",
      title: `Focus on ${weakSys[0].replace(/_/g, " ")}`,
      detail: "Your recent attempts show lower accuracy in this area—short targeted blocks beat long cram sessions.",
      href: "/app/questions",
      priority: 10,
    });
  }

  const pharmWeak = weakSys.find((k) => k.toLowerCase().includes("pharm"));
  if (pharmWeak) {
    out.push({
      id: "pharm-weak",
      title: "Review pharmacology weak areas",
      detail: "Pair medication questions with the matching lesson, then retry a short SATA or MCQ block.",
      href: "/app/lessons",
      priority: 9,
    });
  }

  if (sig.weakCategories.size > 0 && weakSys.length < 2) {
    out.push({
      id: "weak-category",
      title: "Review lesson-linked weak categories",
      detail: "Cross-check missed items with the related lesson, then retry a small question set.",
      href: "/app/lessons",
      priority: 8,
    });
  }

  if (readiness.factors.lastExamRatio != null && readiness.factors.lastExamRatio < 0.72) {
    out.push({
      id: "cat-mock",
      title: "Take a CAT-style mock now",
      detail: "Another timed session will refresh weak-area weighting and update your readiness estimate.",
      href: "/app/exams",
      priority: 9,
    });
  }

  if (readiness.band !== "ready" && readiness.confidence !== "low") {
    out.push({
      id: "flashcards",
      title: "Use flashcards on weak topics",
      detail: "Pair quick recall with questions so facts stick before you raise difficulty.",
      href: "/app/lessons",
      priority: 5,
    });
  }

  if (readiness.factors.practiceVolume < 20) {
    out.push({
      id: "volume",
      title: "Build baseline volume",
      detail: "Complete at least twenty scored items so personalization can target real gaps.",
      href: "/app/questions",
      priority: 7,
    });
  }

  if (out.length === 0) {
    out.push({
      id: "maintain",
      title: "Maintain with mixed review",
      detail: "Keep mixing systems and difficulties so strengths stay sharp.",
      href: "/app/questions",
      priority: 3,
    });
  }

  return out.sort((a, b) => b.priority - a.priority).slice(0, 5);
}
