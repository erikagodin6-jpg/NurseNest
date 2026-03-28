import type { ContentStatus } from "@prisma/client";

export type FlashcardQualityInput = {
  id: string;
  front: string;
  back: string;
  status: ContentStatus;
  lessonId: string | null;
};

export type FlashcardQualityResult = {
  id: string;
  critical: string[];
  quality: string[];
  shouldFlagNeedsReview: boolean;
};

export function analyzeFlashcardQuality(fc: FlashcardQualityInput): FlashcardQualityResult {
  const critical: string[] = [];
  const quality: string[] = [];

  const f = fc.front.trim();
  const b = fc.back.trim();
  if (f.length < 4) critical.push("front_too_short");
  if (b.length < 4) critical.push("back_too_short");
  if (f.length > 0 && b.length > 0 && f.toLowerCase() === b.toLowerCase()) {
    critical.push("front_and_back_identical");
  }
  if (f.length > 400) quality.push("front_very_long_consider_split");
  if (b.length > 800) quality.push("back_very_long_consider_explanation_sections");

  if (!fc.lessonId) {
    quality.push("no_linked_lesson_for_alignment");
  }

  return {
    id: fc.id,
    critical,
    quality,
    shouldFlagNeedsReview: critical.length > 0,
  };
}
