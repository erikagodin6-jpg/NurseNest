import { normalizeAuthoredQuestion } from "../../question-authoring-normalizer";
import type { AuthoredAlliedQuestion, AlliedRegionScope } from "./types";

function countryCode(region: AlliedRegionScope): string | undefined {
  if (region === "CAN") return "CA";
  if (region === "US") return "US";
  return undefined;
}

export function normalizeAlliedAuthoredQuestion(question: AuthoredAlliedQuestion) {
  const normalized = normalizeAuthoredQuestion({
    ...question,
    tier: "allied",
    exam: question.examTag,
    questionType: "multiple-choice",
    countryCode: question.countryCode || countryCode(question.regionScope),
    regionScope: question.regionScope,
    licensingBody: question.licensingBody || question.examTag,
    languageCode: question.languageCode || "en",
    bodySystem: question.category,
    topic: question.topic,
    hint: question.hint || "Identify exactly what decision layer the stem is testing, then eliminate options that are clinically related but answer a different question.",
    whyThisMatters: question.whyThisMatters || `In ${question.careerType} practice, selecting a related fact instead of the exact priority, interpretation, workflow, or safety action can produce preventable errors.`,
    mnemonic: question.mnemonic,
  });

  return {
    ...question,
    ...normalized,
    countryCode: normalized.countryCode,
    languageCode: normalized.languageCode,
    options: normalized.options,
    correctAnswer: normalized.correctAnswer as string,
    distractorRationales: normalized.distractorRationales,
    hint: normalized.hint,
    whyThisMatters: normalized.whyThisMatters,
    mnemonic: normalized.mnemonic,
  };
}
