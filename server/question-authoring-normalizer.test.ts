import { describe, expect, it } from "vitest";
import { normalizeAuthoredQuestion } from "./question-authoring-normalizer";

describe("question authoring normalizer", () => {
  it("converts string options and correctIndex to stable ids", () => {
    const normalized = normalizeAuthoredQuestion({
      id: "ca-rn-diabetes-001",
      stem: "A client with diabetes has a glucose of 180 mg/dL. Which finding requires follow-up?",
      options: ["Option one", "Option two", "Option three", "Option four"],
      correctIndex: 1,
      distractorRationales: {
        "0": "The first option does not represent the priority finding in this scenario.",
        "2": "The third option is clinically less urgent than the keyed finding.",
        "3": "The fourth option does not address the priority concern in the stem.",
      },
    });

    expect(normalized.options).toHaveLength(4);
    expect(normalized.options.every(option => option.id.includes(":opt:"))).toBe(true);
    expect(normalized.correctAnswer).toBe(normalized.options[1].id);
    expect(Object.keys(normalized.distractorRationales)).toEqual([
      normalized.options[0].id,
      normalized.options[2].id,
      normalized.options[3].id,
    ]);
  });

  it("preserves existing stable ids across label/order changes", () => {
    const base = normalizeAuthoredQuestion({
      id: "us-rn-cardio-001",
      stem: "Which intervention is the priority?",
      options: [
        { id: "o-oxygen", label: "A", text: "Apply oxygen when indicated" },
        { id: "o-walk", label: "B", text: "Ambulate immediately" },
      ],
      correctAnswer: "o-oxygen",
      distractorRationales: { "o-walk": "Immediate ambulation is unsafe before the unstable condition is assessed." },
    });

    const shuffled = normalizeAuthoredQuestion({
      id: "us-rn-cardio-001",
      stem: base.stem,
      options: [
        { ...base.options[1], label: "A" },
        { ...base.options[0], label: "B" },
      ],
      correctAnswer: "o-oxygen",
      distractorRationales: base.distractorRationales,
    });

    expect(shuffled.correctAnswer).toBe("o-oxygen");
    expect(shuffled.options.find(option => option.id === "o-oxygen")?.label).toBe("B");
  });

  it("does not fabricate a new answer when the legacy key cannot be resolved", () => {
    expect(() => normalizeAuthoredQuestion({
      id: "ca-rpn-unknown-001",
      stem: "Which action is best?",
      options: ["One", "Two", "Three", "Four"],
      correctAnswer: "not-a-real-option",
    })).toThrow(/Unable to resolve correct answer/);
  });
});
