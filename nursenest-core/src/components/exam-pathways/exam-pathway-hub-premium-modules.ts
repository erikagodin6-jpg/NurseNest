import { mapLegacyMarketingHref } from "@/lib/legacy-marketing-routes";
import { withMarketingLocale } from "@/lib/i18n/marketing-path";

/**
 * Public marketing “nursing exam pathway hub” surface is implemented as programmatic SEO pages
 * (see `programmatic-registry.ts`). This matrix controls which premium module cards appear
 * for the four primary hub slugs we smoke-test in e2e.
 */
export type NursingPathwayHubKind = "RN_US" | "RPN_CA" | "NP" | "NEW_GRAD";

const HUB_SLUGS: Record<NursingPathwayHubKind, string> = {
  RN_US: "nclex-rn-practice-questions",
  RPN_CA: "rex-pn-practice-questions",
  NP: "np-exam-practice-questions",
  NEW_GRAD: "new-graduate-nursing-roadmap",
};

export function resolveNursingPathwayHubKindFromSlug(slug: string): NursingPathwayHubKind | null {
  const entry = (Object.entries(HUB_SLUGS) as [NursingPathwayHubKind, string][]).find(
    ([, s]) => s === slug,
  );
  return entry?.[0] ?? null;
}

/** Mirrors product expectation: ECG-linked learning on RN + NP tiers only (not PN/RPN, not new grad). */
export function pathwayAllowsEcgLinkedLearning(kind: NursingPathwayHubKind): boolean {
  return kind === "RN_US" || kind === "NP";
}

export type PremiumMarketingModuleCard = {
  id: string;
  title: string;
  description: string;
  /** Public-safe destination; omit when locked (no raw gated app routes). */
  href?: string;
  locked?: boolean;
  lockHint?: string;
  testId: string;
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

function osceEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_OSCE_SCENARIOS === "true";
}

export function buildPremiumMarketingModuleCards(input: {
  locale: string;
  pathwayKind: NursingPathwayHubKind;
}): PremiumMarketingModuleCard[] {
  const { locale, pathwayKind } = input;
  const pathwayQuery =
    pathwayKind === "RN_US"
      ? "NCLEX_RN"
      : pathwayKind === "RPN_CA"
        ? "REX_PN"
        : pathwayKind === "NP"
          ? "NP"
          : "NEW_GRAD";

  const qBank = `${appDeepLink("/app/questions")}?examTarget=${pathwayQuery}`;
  const studyPlan = `${appDeepLink("/app/study-plan")}?examTarget=${pathwayQuery}`;
  const lessons = `${appDeepLink("/app/lessons")}?examTarget=${pathwayQuery}`;

  const labs: PremiumMarketingModuleCard = {
    id: "labs-diagnostics",
    title: "Labs & diagnostics",
    description: "Reference ranges and interpretation drills paired with your pathway scope.",
    href: marketingToolHref(locale, "/tools/lab-values"),
    testId: "premium-module-labs",
  };

  const medMath: PremiumMarketingModuleCard = {
    id: "med-calculations",
    title: "Medication calculations",
    description: "Drip rates, weight-based dosing, and safety checks with instant feedback.",
    href: marketingToolHref(locale, "/tools/med-math"),
    testId: "premium-module-med-math",
  };

  const ecg: PremiumMarketingModuleCard = {
    id: "ecg-linked",
    title: "ECG & rhythm orientation",
    description: "Linked lesson paths that reinforce cardiac interpretation without jumping scope.",
    href: lessons,
    testId: "premium-module-ecg",
  };

  const ngn: PremiumMarketingModuleCard = {
    id: "clinical-judgment-ngn",
    title: "Clinical judgment & NGN-style items",
    description: "Next-gen formats and prioritization drills in the question bank.",
    href: qBank,
    testId: "premium-module-ngn",
  };

  const osceOpen: PremiumMarketingModuleCard = {
    id: "osce-case-studies",
    title: "OSCE & case studies",
    description: "Structured scenarios for communication, assessment, and safety closure.",
    href: `${appDeepLink("/app/osce")}?examTarget=${pathwayQuery}`,
    testId: "premium-module-osce",
  };

  const osceLocked: PremiumMarketingModuleCard = {
    id: "osce-case-studies",
    title: "OSCE & case studies",
    description: "Interactive scenarios unlock when enabled for your workspace.",
    locked: true,
    lockHint: "Included on eligible plans — sign in to see availability in your region.",
    testId: "premium-module-osce-locked",
  };

  const progress: PremiumMarketingModuleCard = {
    id: "progress-study-plan",
    title: "Progress, readiness & study plan",
    description: "Cadence-friendly planning that connects weak domains to practice blocks.",
    href: studyPlan,
    testId: "premium-module-study-plan",
  };

  const npCases: PremiumMarketingModuleCard = {
    id: "np-clinical-cases",
    title: "NP clinical cases",
    description: "Advanced reasoning vignettes aligned to NP exam preparation.",
    href: lessons,
    testId: "premium-module-np-cases",
  };

  const ordered: PremiumMarketingModuleCard[] = [labs, medMath];
  if (pathwayAllowsEcgLinkedLearning(pathwayKind)) {
    ordered.push(ecg);
  }
  ordered.push(ngn);
  ordered.push(osceEnabled() ? osceOpen : osceLocked);
  ordered.push(progress);
  if (pathwayKind === "NP") {
    ordered.push(npCases);
  }

  return ordered;
}
