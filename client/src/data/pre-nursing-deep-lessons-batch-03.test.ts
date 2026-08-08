import { describe, expect, it } from "vitest";
import { PRE_NURSING_DEEP_LESSONS_BATCH_03 } from "./pre-nursing-deep-lessons-batch-03";

describe("pre-nursing deep lessons batch 03", () => {
  it("authors the four high-value free SEO lessons", () => {
    expect(PRE_NURSING_DEEP_LESSONS_BATCH_03.map((lesson) => lesson.moduleId)).toEqual([
      "fluids-electrolytes",
      "oxygenation",
      "infection-control",
      "pharmacology",
    ]);
  });

  it("keeps every lesson deep, interactive, and search-ready", () => {
    for (const lesson of PRE_NURSING_DEEP_LESSONS_BATCH_03) {
      expect(lesson.title.length).toBeGreaterThan(30);
      expect(lesson.seoTitle.length).toBeGreaterThan(25);
      expect(lesson.seoDescription.length).toBeGreaterThan(100);
      expect(lesson.targetQueries.length).toBeGreaterThanOrEqual(3);
      expect(lesson.learningObjectives.length).toBeGreaterThanOrEqual(5);
      expect(lesson.hook.length).toBeGreaterThan(150);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(4);
      expect(lesson.masteryQuestions.length).toBeGreaterThanOrEqual(10);
      expect(lesson.faq.length).toBeGreaterThanOrEqual(3);
      expect(lesson.internalLinks.length).toBeGreaterThanOrEqual(3);

      const embeddedChecks = lesson.sections.reduce(
        (total, section) => total + section.knowledgeChecks.length,
        0,
      );
      expect(embeddedChecks).toBeGreaterThanOrEqual(12);

      for (const section of lesson.sections) {
        expect(section.body.length).toBeGreaterThanOrEqual(2);
        expect(section.knowledgeChecks.length).toBeGreaterThanOrEqual(3);
      }

      for (const question of [
        ...lesson.sections.flatMap((section) => section.knowledgeChecks),
        ...lesson.masteryQuestions,
      ]) {
        expect(question.options.length).toBeGreaterThanOrEqual(4);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(question.options.length);
        expect(question.rationale.length).toBeGreaterThan(25);
      }
    }
  });

  it("adds substantial retrieval practice", () => {
    const embedded = PRE_NURSING_DEEP_LESSONS_BATCH_03.reduce(
      (total, lesson) => total + lesson.sections.reduce((n, section) => n + section.knowledgeChecks.length, 0),
      0,
    );
    const mastery = PRE_NURSING_DEEP_LESSONS_BATCH_03.reduce(
      (total, lesson) => total + lesson.masteryQuestions.length,
      0,
    );

    expect(embedded).toBeGreaterThanOrEqual(48);
    expect(mastery).toBeGreaterThanOrEqual(40);
    expect(embedded + mastery).toBeGreaterThanOrEqual(88);
  });
});
