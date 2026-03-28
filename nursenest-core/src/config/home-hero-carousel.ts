/**
 * Homepage hero carousel — public DigitalOcean Spaces CDN assets (PNG at bucket root).
 *
 * Pattern: {NURSENEST_IMAGES_SPACE_PUBLIC_BASE_URL}/screenshot{N}.png
 * e.g. https://nursenest-images.tor1.cdn.digitaloceanspaces.com/screenshot1.png
 *
 * Optional proxy / fallback: see `marketing-resolve-image-url.ts` and `home-restored-client.tsx`.
 */
import { nursenestImagesSpaceObjectUrl } from "./marketing-cdn.catalog";

export const HOME_HERO_SCREENSHOT_COUNT = 15 as const;

/** Object key at bucket root: `screenshot1.png` … `screenshot15.png`. */
export function homeHeroScreenshotObjectKey(index1To15: number): string {
  if (!Number.isInteger(index1To15) || index1To15 < 1 || index1To15 > HOME_HERO_SCREENSHOT_COUNT) {
    throw new Error(`homeHeroScreenshotObjectKey: expected 1–${HOME_HERO_SCREENSHOT_COUNT}, got ${index1To15}`);
  }
  return `screenshot${index1To15}.png`;
}

/** Canonical public CDN URL for `screenshot{N}.png`. */
export function homeHeroScreenshotPublicUrl(index1To15: number): string {
  return nursenestImagesSpaceObjectUrl(homeHeroScreenshotObjectKey(index1To15));
}

export type HomeHeroSlide = {
  index: number;
  objectKey: string;
  /** Canonical `https://…cdn.digitaloceanspaces.com/screenshot{N}.png` */
  publicUrl: string;
  title: string;
  caption: string;
  alt: string;
};

const SLIDE_COPY: readonly { title: string; caption: string }[] = [
  {
    title: "Exam-style practice",
    caption: "Realistic NCLEX-style items with clear stems, answer choices, and an interface built for timed review.",
  },
  {
    title: "Lessons & rationales",
    caption: "Deep-dive study content with explanations that connect pathophysiology to bedside decisions.",
  },
  {
    title: "Flashcards & active recall",
    caption: "High-yield decks for drills on definitions, labs, and meds—optimized for short study bursts.",
  },
  {
    title: "Analytics & readiness",
    caption: "Track performance by topic and difficulty so you know what to revisit before test day.",
  },
  {
    title: "NGN & case-style items",
    caption: "Next Generation case clusters that mirror prioritization, delegation, and multi-step clinical judgment.",
  },
  {
    title: "Country & exam pathway",
    caption: "Choose your region and exam track so content, wording, and prep stay aligned to your regulator.",
  },
  {
    title: "Nursing tier overview",
    caption: "See how RN, RPN/LPN, and NP paths map to the right banks, lessons, and upgrade options.",
  },
  {
    title: "Allied health hub",
    caption: "One place for PT, OT, MLT, and other allied certifications alongside nursing—shared study habits, one account.",
  },
  {
    title: "Global & language coverage",
    caption: "Study in the language and locale you need with content tuned for international nursing cohorts.",
  },
  {
    title: "Learner dashboard",
    caption: "Your home base for streaks, due reviews, and what to tackle next across lessons and questions.",
  },
  {
    title: "Onboarding & account",
    caption: "A fast path from signup to your first practice set—minimal friction, maximum time on questions.",
  },
  {
    title: "Reports & performance",
    caption: "Session summaries and score breakdowns that show strengths, gaps, and trends over time.",
  },
  {
    title: "Lesson library",
    caption: "Browse structured modules by system and topic to fill knowledge gaps between question blocks.",
  },
  {
    title: "Study anywhere",
    caption: "Responsive layouts that stay readable on phone and tablet for commutes and bedside breaks.",
  },
  {
    title: "All-in-one prep",
    caption: "Questions, lessons, flashcards, and analytics in one premium ecosystem—no tab-hopping between tools.",
  },
];

function buildAlt(title: string, caption: string): string {
  const t = title.trim();
  const c = caption.trim();
  return `${t}. ${c}`.slice(0, 220);
}

export const HOMEPAGE_HERO_SLIDES: readonly HomeHeroSlide[] = SLIDE_COPY.map((copy, i) => {
  const index = i + 1;
  const objectKey = homeHeroScreenshotObjectKey(index);
  const publicUrl = nursenestImagesSpaceObjectUrl(objectKey);
  return {
    index,
    objectKey,
    publicUrl,
    title: copy.title,
    caption: copy.caption,
    alt: buildAlt(copy.title, copy.caption),
  };
});

if (process.env.NODE_ENV === "development") {
  HOMEPAGE_HERO_SLIDES.forEach((slide) => {
    const expected = homeHeroScreenshotObjectKey(slide.index);
    if (slide.objectKey !== expected) {
      throw new Error(
        `[home-hero-carousel] objectKey mismatch for slide ${slide.index}: got "${slide.objectKey}", expected "${expected}"`,
      );
    }
    if (!/^https:\/\//i.test(slide.publicUrl)) {
      throw new Error(`[home-hero-carousel] publicUrl must be HTTPS: ${slide.publicUrl}`);
    }
  });
}

/** Open Graph / Twitter default image when no uploaded logo is set. */
export function homeHeroOgImageUrl(): string {
  return HOMEPAGE_HERO_SLIDES[0]?.publicUrl ?? "";
}
