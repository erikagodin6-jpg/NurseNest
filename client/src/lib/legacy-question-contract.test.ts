import { describe, expect, it } from "vitest";
import { normalizeLegacyClientQuestion } from "./legacy-question-contract";

describe("legacy question contract boundary", () => {
  it("derives stable option ids without falsely claiming authored-v2 metadata", () => {
    const question = normalizeLegacyClientQuestion({
      id: "legacy-cardio-001",
      stem: "Which action is the priority for a client with symptomatic bradycardia?",
      options: ["Prepare atropine", "Ambulate the client", "Offer oral fluids", "Prepare discharge"],
      correctIndex: 0,
      rationale: "Symptomatic bradycardia with poor perfusion requires treatment directed at the unstable rate and perfusion problem.",
      bodySystem: "Cardiovascular",
      topic: "Bradycardia",
    }, 0, { countryCode: "US", regionScope: "US", languageCode: "en", exam: "NCLEX-RN" });

    expect(question.options).toHaveLength(4);
    expect(new Set(question.options.map(option => option.id)).size).toBe(4);
    expect(question.correctAnswerIds).toEqual([question.options[0].id]);
    expect(question.metadataOrigin).toBe("legacy-derived");
    expect(Object.keys(question.distractorRationales)).toEqual(expect.arrayContaining(question.options.slice(1).map(option => option.id)));
  });

  it("preserves stable ids across repeated normalization", () => {
    const raw = {
      id: "stable-q-001",
      stem: "Which assessment finding requires immediate escalation?",
      options: ["Finding A", "Finding B", "Finding C", "Finding D"],
      correctAnswer: "B",
      rationale: "Finding B represents the immediate safety threat in this scenario and therefore requires escalation before lower-priority findings.",
      topic: "Safety",
    };
    const a = normalizeLegacyClientQuestion(raw, 0, { regionScope: "GLOBAL", languageCode: "en", exam: "General" });
    const b = normalizeLegacyClientQuestion(raw, 99, { regionScope: "GLOBAL", languageCode: "en", exam: "General" });
    expect(a.options.map(option => option.id)).toEqual(b.options.map(option => option.id));
    expect(a.correctAnswerIds).toEqual(b.correctAnswerIds);
  });

  it("treats complete source-authored teaching metadata as authored-v2", () => {
    const raw = {
      id: "authored-q-001",
      stem: "Which intervention best addresses the immediate safety risk?",
      options: [
        { id: "auth-a", text: "Correct priority" },
        { id: "auth-b", text: "Lower priority B" },
        { id: "auth-c", text: "Lower priority C" },
        { id: "auth-d", text: "Lower priority D" },
      ],
      correctAnswer: "auth-a",
      rationale: "The keyed intervention addresses the immediate safety risk before lower-priority actions and is therefore the best response.",
      correctAnswerExplanation: "The keyed option directly treats the immediate threat and follows priority-based clinical reasoning.",
      distractorRationales: {
        "auth-b": "This action may be reasonable later, but it does not address the immediate safety threat.",
        "auth-c": "This action focuses on a secondary problem and delays the intervention required for the priority risk.",
        "auth-d": "This action is inappropriate because it does not mitigate the urgent risk identified in the stem.",
      },
      hint: "Identify the option that addresses the most immediate threat before secondary care needs.",
      whyThisMatters: "Prioritizing immediate threats prevents avoidable deterioration and is central to safe clinical decision-making.",
      clinicalPearl: "When several actions are reasonable, address the immediate threat before secondary needs.",
      topic: "Safety",
    };
    const question = normalizeLegacyClientQuestion(raw, 0, { regionScope: "GLOBAL", languageCode: "en", exam: "General" });
    expect(question.metadataOrigin).toBe("authored-v2");
  });
});
