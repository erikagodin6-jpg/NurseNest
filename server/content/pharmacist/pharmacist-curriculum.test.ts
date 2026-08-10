import { describe, expect, it } from "vitest";
import { pharmacistContentSummary, pharmacistLessons, pharmacistQuestions, pharmacistTopics } from "./pharmacist-curriculum";

describe("pharmacist curriculum contract", () => {
  it("meets volume and isolation requirements", () => {
    expect(pharmacistTopics).toHaveLength(200);
    expect(pharmacistLessons).toHaveLength(1000);
    expect(pharmacistQuestions).toHaveLength(12000);
    expect(pharmacistContentSummary.questionsPerTopic).toBe(60);
    expect(pharmacistLessons.every(x => x.pathway === "pharmacist")).toBe(true);
    expect(pharmacistQuestions.every(x => x.pathway === "pharmacist")).toBe(true);
  });
  it("has unique IDs and complete answer metadata", () => {
    expect(new Set(pharmacistLessons.map(x => x.id)).size).toBe(1000);
    expect(new Set(pharmacistQuestions.map(x => x.id)).size).toBe(12000);
    expect(pharmacistQuestions.every(q => q.options.length === 4 && q.options.some(o => o.id === q.correctOptionId) && q.options.every(o => o.rationale))).toBe(true);
  });
});
