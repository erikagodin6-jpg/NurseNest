import { mapLegacyMarketingHref } from "@/lib/legacy-marketing-routes";
import { withMarketingLocale } from "@/lib/i18n/marketing-path";

/**
 * Public marketing “nursing exam pathway hub” surface is implemented as programmatic SEO pages
 * (see `programmatic-registry.ts`). This matrix controls premium module cards for primary hub slugs.
 */
export type NursingPathwayHubKind = "RN_US" | "RPN_CA" | "NP" | "NEW_GRAD";

const HUB_SLUGS: Record<NursingPathwayHubKind, string> = {
  RN_US: "nclex-rn-practice-questions",
  RPN_CA: "rex-pn-practice-questions",
  NP: "np-exam-practice-questions",
  NEW_GRAD: "new-graduate-nursing-roadmap",
};

export function resolveNursingPathwayHubKindFromSlug(slug: string): NursingPathwayHubKind | null {
  const entry = (Object.entries(HUB_SLUGS) as [NursingPathwayHubKind, string][]).find(([, s]) => s === slug);
  return entry?.[0] ?? null;
}

/** Mirrors product expectation: ECG-linked learning on RN + NP tiers only (not PN/RPN, not new grad). */
export function pathwayAllowsEcgLinkedLearning(kind: NursingPathwayHubKind): boolean {
  return kind === "RN_US" || kind === "NP";
}

export function pathwayExamTarget(kind: NursingPathwayHubKind): string {
  if (kind === "RN_US") return "NCLEX_RN";
  if (kind === "RPN_CA") return "REX_PN";
  if (kind === "NP") return "NP";
  return "NEW_GRAD";
}

export type PremiumHubIconId =
  | "book-open"
  | "layers"
  | "clipboard-list"
  | "activity"
  | "flask-conical"
  | "pill"
  | "stethoscope"
  | "heart-pulse"
  | "users"
  | "file-text"
  | "brain"
  | "line-chart"
  | "grid";

export type LearnerHubProgressHints = {
  completedLessons: number;
  attemptCount: number;
  nextLessonTitle: string | null;
} | null;

export type PremiumMarketingModuleCard = {
  id: string;
  title: string;
  description: string;
  /** Public-safe destination; omit when locked (no raw gated app routes in HTML). */
  href?: string;
  locked?: boolean;
  lockHint?: string;
  testId: string;
  iconId: PremiumHubIconId;
  ctaLabel?: string;
  /** Shown when signed in and snapshot data exists; otherwise a neutral empty line is rendered in the shell. */
  progressLabel?: string | null;
};

function marketingToolHref(locale: string, path: string): string {
  const mapped = mapLegacyMarketingHref(path);
  if (mapped.startsWith("http")) return mapped;
  return withMarketingLocale(locale, mapped);
}

/** Deep links to learner surfaces stay unprefixed — `/app/*` is outside locale-prefixed marketing. */
function appDeepLink(path: string): string {
  const mapped = mapLegacyMarketingHref(path);
  return mapped.startsWith("/app") ? mapped : path;
}

function programmaticPublicHref(locale: string, slug: string): string {
  return withMarketingLocale(locale, `/${slug}`);
}

function osceEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_OSCE_SCENARIOS === "true";
}

function attachProgress(card: PremiumMarketingModuleCard, hints: LearnerHubProgressHints): PremiumMarketingModuleCard {
  if (!hints) return { ...card, progressLabel: null };
  if (card.id === "lessons") {
    if (hints.nextLessonTitle) return { ...card, progressLabel: `Next up: ${hints.nextLessonTitle}` };
    if (hints.completedLessons > 0) return { ...card, progressLabel: `${hints.completedLessons} lessons completed` };
    return { ...card, progressLabel: null };
  }
  if (card.id === "progress-study-plan" && hints.attemptCount > 0) {
    return { ...card, progressLabel: `${hints.attemptCount} mock attempts logged` };
  }
  return { ...card, progressLabel: null };
}

export function buildPremiumMarketingModuleCards(input: {
  locale: string;
  pathwayKind: NursingPathwayHubKind;
  progressHints?: LearnerHubProgressHints;
}): PremiumMarketingModuleCard[] {
  const { locale, pathwayKind, progressHints } = input;
  const pathwayQuery = pathwayExamTarget(pathwayKind);

  const qBank = `${appDeepLink("/app/questions")}?examTarget=${pathwayQuery}`;
  const studyPlan = `${appDeepLink("/app/study-plan")}?examTarget=${pathwayQuery}`;
  const lessons = `${appDeepLink("/app/lessons")}?examTarget=${pathwayQuery}`;
  const exams = `${appDeepLink("/app/exams")}?examTarget=${pathwayQuery}`;

  const lessonsCard: PremiumMarketingModuleCard = {
    id: "lessons",
    title: "Lessons",
    description:
      "Structured lesson paths that connect physiology, safety, and judgement checks before you move into timed practice.",
    href: lessons,
    testId: "premium-module-lessons",
    iconId: "book-open",
    ctaLabel: "Open lessons",
  };

  const flashcards: PremiumMarketingModuleCard = {
    id: "flashcards",
    title: "Flashcards",
    description:
      "Deck-style recall inside the same pathway filters as your bank—pair memorization with exam-style stems.",
    href: qBank,
    testId: "premium-module-flashcards",
    iconId: "layers",
    ctaLabel: "Open flashcards",
  };

  const practiceExams: PremiumMarketingModuleCard = {
    id: "practice-exams",
    title: "Practice exams",
    description: "Full-length mocks with rationales and attempt history so stamina matches authorization-to-test pacing.",
    href: exams,
    testId: "premium-module-practice-exams",
    iconId: "clipboard-list",
    ctaLabel: "Open mock exams",
  };

  const cat: PremiumMarketingModuleCard = {
    id: "cat-exams",
    title: "CAT exams",
    description:
      "Computer-adaptive style blocks that concentrate on weak domains—ideal between lessons and full mocks.",
    href: qBank,
    testId: "premium-module-cat-exams",
    iconId: "activity",
    ctaLabel: "Start adaptive block",
  };

  const pharmacology: PremiumMarketingModuleCard = {
    id: "pharmacology",
    title: "Pharmacology",
    description:
      pathwayKind === "NP"
        ? "Prescribing judgement, monitoring, and interactions at NP depth—paired with public scope guides."
        : "Mechanisms, adverse effects, interactions, and monitoring emphasis aligned to your licensure pathway.",
    href: programmaticPublicHref(locale, "pharmacology-nursing-practice-questions"),
    testId: "premium-module-pharmacology",
    iconId: "pill",
    ctaLabel: "Open pharmacology guide",
  };

  /** Stable test id `premium-module-ngn` retained for RN smoke tests (diagnostic / NGN-style practice). */
  const diagnosticReasoning: PremiumMarketingModuleCard = {
    id: "diagnostic-reasoning",
    title: "Diagnostic reasoning",
    description:
      "Prioritization, NGN-style judgement, and differential framing inside timed question practice for this tier.",
    href: qBank,
    testId: "premium-module-ngn",
    iconId: "brain",
    ctaLabel: "Open question bank",
  };

  const labs: PremiumMarketingModuleCard = {
    id: "labs-diagnostics",
    title: "Labs & diagnostics",
    description: "Reference ranges and interpretation drills paired with your pathway scope.",
    href: marketingToolHref(locale, "/tools/lab-values"),
    testId: "premium-module-labs",
    iconId: "flask-conical",
    ctaLabel: "Open lab values tool",
  };

  const medMath: PremiumMarketingModuleCard = {
    id: "med-calculations",
    title: "Medication calculations",
    description: "Drip rates, weight-based dosing, and safety checks with instant feedback.",
    href: marketingToolHref(locale, "/tools/med-math"),
    testId: "premium-module-med-math",
    iconId: "grid",
    ctaLabel: "Open med math tool",
  };

  const ecg: PremiumMarketingModuleCard = {
    id: "ecg-linked",
    title: "ECG & rhythm orientation",
    description: "Linked lesson paths that reinforce cardiac interpretation without jumping outside pathway scope.",
    href: lessons,
    testId: "premium-module-ecg",
    iconId: "heart-pulse",
    ctaLabel: "Open cardiac lessons",
  };

  const clinicalSkills: PremiumMarketingModuleCard = {
    id: "clinical-skills",
    title: "Clinical skills",
    description:
      "Bedside assessment, procedural readiness, and safety checklists—public cheat sheets plus in-app drills.",
    href: programmaticPublicHref(locale, "clinical-cheat-sheets-nursing"),
    testId: "premium-module-clinical-skills",
    iconId: "stethoscope",
    ctaLabel: "Open clinical skills guide",
  };

  const caseStudies: PremiumMarketingModuleCard = {
    id: "case-studies",
    title: pathwayKind === "NP" ? "Case studies & NP vignettes" : "Case studies & scenarios",
    description:
      pathwayKind === "NP"
        ? "Advanced vignettes that stress differential diagnosis, prescribing, and follow-up at NP exam depth."
        : "Breadth-first clinical vignettes sequenced through your lesson queue and question bank filters.",
    href: lessons,
    testId: "premium-module-case-studies",
    iconId: "file-text",
    ctaLabel: "Open case studies",
  };

  const osceOpen: PremiumMarketingModuleCard = {
    id: "osce-scenarios",
    title: "OSCE & interactive scenarios",
    description: "Communication, assessment, and closure drills with structured rubrics for objective encounters.",
    href: `${appDeepLink("/app/osce")}?examTarget=${pathwayQuery}`,
    testId: "premium-module-osce",
    iconId: "users",
    ctaLabel: "Open OSCE lab",
  };

  const osceLocked: PremiumMarketingModuleCard = {
    id: "osce-scenarios",
    title: "OSCE & interactive scenarios",
    description: "Structured scenarios for communication, assessment, and safety closure.",
    locked: true,
    lockHint: "Included on eligible plans — sign in to see availability in your region.",
    testId: "premium-module-osce-locked",
    iconId: "users",
  };

  const progress: PremiumMarketingModuleCard = {
    id: "progress-study-plan",
    title: "Dashboard & study plan",
    description: "Continue tiles, readiness nudges, streaks, and cadence planning tied to your tier and region filters.",
    href: studyPlan,
    testId: "premium-module-study-plan",
    iconId: "line-chart",
    ctaLabel: "Open study plan",
  };

  const ordered: PremiumMarketingModuleCard[] = [
    lessonsCard,
    flashcards,
    practiceExams,
    cat,
    pharmacology,
    diagnosticReasoning,
    labs,
    medMath,
  ];
  if (pathwayAllowsEcgLinkedLearning(pathwayKind)) ordered.push(ecg);
  ordered.push(clinicalSkills, caseStudies, osceEnabled() ? osceOpen : osceLocked, progress);

  return ordered.map((c) => attachProgress(c, progressHints ?? null));
}
