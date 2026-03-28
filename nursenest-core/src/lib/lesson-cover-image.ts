/**
 * Maps lesson metadata to Space screenshot bundles (thumb variants) for list cards.
 * Uses semantic rules + optional slug overrides; no DB schema required.
 */
import { MARKETING_SCREENSHOT_SOURCES } from "@/lib/marketing-assets.generated";
import { marketingAssetSrcSet, marketingAssetUrl } from "@/lib/marketing-cdn";

export type LessonCoverBundleKey = keyof typeof MARKETING_SCREENSHOT_SOURCES;

const SLUG_BUNDLE: Partial<Record<string, LessonCoverBundleKey>> = {
  "ca-rpn-fluid-balance": "screenshot3",
  "us-lvn-infection-control": "screenshot9",
  "rn-clinical-prioritization": "screenshot9",
  "np-differential-diagnosis": "screenshot9",
};

function pickBundleKey(input: {
  slug: string;
  systemTag?: string | null;
  topicTag?: string | null;
  categorySlug?: string;
  title: string;
}): LessonCoverBundleKey {
  const bySlug = SLUG_BUNDLE[input.slug];
  if (bySlug) return bySlug;

  const hay = [
    input.systemTag,
    input.topicTag,
    input.categorySlug,
    input.slug,
    input.title,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/clinical|priorit|delegat|patient|case|ngn|judgment|triage|safety/i.test(hay)) {
    return "screenshot9";
  }
  if (/flashcard|deck|memory|spaced|retention/i.test(hay)) {
    return "screenshot6";
  }
  if (/plan|week|schedule|calendar/i.test(hay)) {
    return "screenshot11";
  }
  if (/pharm|medication|drug|dosage/i.test(hay)) {
    return "screenshotTest";
  }
  if (/fluid|electrolyte|balance|acid|renal/i.test(hay)) {
    return "screenshot3";
  }
  if (/infection|sepsis|ppe|isolation/i.test(hay)) {
    return "screenshot9";
  }
  if (/progress|analytics|score|percentile|performance|trend|improve|dashboard/i.test(hay)) {
    return "screenshot2";
  }
  if (/category|domain|weak|breakdown|blueprint/i.test(hay)) {
    return "screenshot3";
  }
  if (/exam|session|mock|nclex|quiz|practice/i.test(hay)) {
    return "screenshot5";
  }
  if (/differential|diagnos|pathophys/i.test(hay)) {
    return "screenshot9";
  }

  return "screenshotTest";
}

export function resolveLessonCoverThumb(input: {
  slug: string;
  title: string;
  systemTag?: string | null;
  topicTag?: string | null;
  categorySlug?: string;
}): { src: string; srcSet?: string } {
  const key = pickBundleKey(input);
  const bundle = MARKETING_SCREENSHOT_SOURCES[key] ?? MARKETING_SCREENSHOT_SOURCES.screenshotTest;
  return {
    src: marketingAssetUrl(bundle.thumbFallback),
    srcSet: marketingAssetSrcSet(bundle.thumbSrcSet),
  };
}
