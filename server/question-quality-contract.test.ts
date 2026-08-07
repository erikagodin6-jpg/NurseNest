import { describe, expect, it } from "vitest";
import {
  auditQuestionQuality,
  normalizeCorrectAnswerLabels,
  normalizeDistractorRationales,
  normalizeQuestionOptions,
  type QuestionQualityRecord,
} from "./question-quality-contract";

function baseQuestion(overrides: Partial<QuestionQualityRecord> = {}): QuestionQualityRecord {
  return {
    id: "q-1",
    source: "exam_questions",
    tier: "rn",
    exam: "NCLEX-RN",
    questionType: "multiple_choice",
    status: "published",
    stem: "A patient develops acute chest pressure with diaphoresis and dyspnea. Which nursing action is the priority?",
    options: [
      { label: "A", text: "Document the symptoms and reassess in one hour" },
      { label: "B", text: "Initiate the ordered acute coronary syndrome response and obtain immediate assessment data" },
      { label: "C", text: "Provide discharge teaching about long-term risk-factor modification" },
      { label: "D", text: "Encourage ambulation to determine whether the discomfort improves" },
    ],
    correctAnswer: ["B"],
    rationale: "The symptom cluster represents possible acute myocardial ischemia and requires immediate assessment and time-sensitive escalation. The nurse prioritizes current physiologic instability over documentation, routine teaching, or activity. Acute chest pressure with diaphoresis and dyspnea can reflect worsening coronary perfusion, so delaying evaluation risks progression while exertion can increase myocardial oxygen demand.",
    correctAnswerExplanation: "Option B addresses a potentially unstable coronary event immediately and supports rapid assessment, monitoring, and escalation. This protects myocardial perfusion while the cause is being clarified.",
    distractorRationales: {
      A: "Documentation is necessary, but delaying reassessment for an hour is unsafe when the patient has new ischemic symptoms and possible clinical deterioration.",
      C: "Long-term risk-factor teaching is appropriate only after the immediate instability has been assessed and treated; it does not address the current threat.",
      D: "Ambulation increases myocardial oxygen demand and can worsen ischemia, so it is inappropriate during new chest pressure with autonomic symptoms.",
    },
    clinicalPearl: "New chest pressure with diaphoresis or dyspnea is an escalation cue: stabilize and evaluate the acute change before teaching, documentation-only actions, or activity.",
    bodySystem: "Cardiovascular",
    topic: "Acute Coronary Syndrome",
    subtopic: "Priority Nursing Response",
    difficulty: 3,
    cognitiveLevel: "application",
    tags: ["acs", "priority", "ischemia", "nursing-actions"],
    regionScope: "BOTH",
    examStrategy: "Prioritize the unstable acute change over routine care.",
    ...overrides,
  };
}

describe("question quality contract", () => {
  it("accepts a complete high-quality MCQ", () => {
    const audit = auditQuestionQuality(baseQuestion());
    expect(audit.valid).toBe(true);
    expect(audit.requiredDistractorLabels).toEqual(["A", "C", "D"]);
  });

  it("requires every incorrect option to have a specific distractor rationale", () => {
    const audit = auditQuestionQuality(baseQuestion({
      distractorRationales: {
        A: "Documentation is necessary, but delaying reassessment for an hour is unsafe when the patient has new ischemic symptoms and possible clinical deterioration.",
        C: "Incorrect",
      },
    }));
    expect(audit.valid).toBe(false);
    const missing = audit.issues.filter((issue) => issue.code === "missing_or_weak_distractor_rationale");
    expect(missing).toHaveLength(2);
    expect(missing.map((issue) => issue.message).join(" ")).toContain("C");
    expect(missing.map((issue) => issue.message).join(" ")).toContain("D");
  });

  it("does not require a distractor rationale for the correct option", () => {
    const audit = auditQuestionQuality(baseQuestion());
    expect(audit.requiredDistractorLabels).not.toContain("B");
  });

  it("normalizes index-based correct answers", () => {
    const options = normalizeQuestionOptions(["one", "two", "three", "four"]);
    expect(normalizeCorrectAnswerLabels([1], options)).toEqual(["B"]);
    expect(normalizeCorrectAnswerLabels("2", options)).toEqual(["C"]);
  });

  it("normalizes array and object distractor rationale shapes", () => {
    expect(normalizeDistractorRationales(["alpha rationale has enough words to be useful", "beta rationale has enough words to be useful"]).A).toContain("alpha");
    expect(normalizeDistractorRationales({ option_2: "specific rationale" }).C).toBe("specific rationale");
  });

  it("fails structurally invalid answer contracts instead of auto-rewriting them", () => {
    const audit = auditQuestionQuality(baseQuestion({ correctAnswer: ["Z"] }));
    expect(audit.structuralValid).toBe(false);
    expect(audit.issues.some((issue) => issue.code === "missing_correct_answer" || issue.code === "invalid_correct_answer")).toBe(true);
  });

  it("enforces the difficulty ceiling", () => {
    const audit = auditQuestionQuality(baseQuestion({ difficulty: 5 }));
    expect(audit.valid).toBe(false);
    expect(audit.issues.some((issue) => issue.code === "invalid_difficulty")).toBe(true);
  });
});
