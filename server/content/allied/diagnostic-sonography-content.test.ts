import { describe, expect, it } from "vitest";
import { materializeAlliedLessons, materializeAlliedQuestions } from "./builders";
import { normalizeAlliedAuthoredQuestion } from "./question-contract";
import {
  DIAGNOSTIC_SONOGRAPHY_PROGRAM_TARGETS,
  diagnosticSonographyTopics10,
} from "./topics-10-diagnostic-sonography";

const lessons = materializeAlliedLessons(diagnosticSonographyTopics10);
const questions = materializeAlliedQuestions(diagnosticSonographyTopics10).map(
  normalizeAlliedAuthoredQuestion,
);

describe("diagnostic medical sonography authored expansion", () => {
  it("materializes the first ten canonical topics into fifty lessons", () => {
    expect(diagnosticSonographyTopics10).toHaveLength(10);
    expect(lessons).toHaveLength(50);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(50);
    expect(new Set(lessons.map((lesson) => lesson.slug)).size).toBe(50);
  });

  it("provides one hundred questions for every topic", () => {
    expect(questions).toHaveLength(1_000);
    expect(new Set(questions.map((question) => question.id)).size).toBe(1_000);
    expect(new Set(questions.map((question) => question.stem)).size).toBe(1_000);

    for (const topic of diagnosticSonographyTopics10) {
      expect(questions.filter((question) => question.topic === topic.topic)).toHaveLength(100);
    }
  });

  it("uses stable answer identities and complete learner explanations", () => {
    for (const question of questions) {
      expect(question.options).toHaveLength(4);
      expect(question.options.every((option) => option.id && option.text)).toBe(true);
      expect(question.options.map((option) => option.id)).toContain(question.correctAnswer);
      expect(Object.keys(question.distractorRationales)).toHaveLength(3);
      expect(question.rationale.length).toBeGreaterThan(120);
      expect(question.correctAnswerExplanation.length).toBeGreaterThan(60);
      expect(question.hint.length).toBeGreaterThan(12);
      expect(question.whyThisMatters.length).toBeGreaterThan(20);
      expect(question.clinicalPearl.length).toBeGreaterThan(100);
      expect(question.languageCode).toBe("en");
      expect(question.licensingBody).toBe("ARDMS SPI | Sonography Canada Generalist");
      expect(question.difficulty).toBeGreaterThanOrEqual(1);
      expect(question.difficulty).toBeLessThanOrEqual(4);
    }
  });

  it("records the owner's non-negotiable completion floors", () => {
    expect(DIAGNOSTIC_SONOGRAPHY_PROGRAM_TARGETS).toEqual({
      minimumTopics: 200,
      lessonsPerTopic: 5,
      minimumLessons: 1_000,
      minimumQuestionsPerTopic: 60,
      authoredQuestionsPerTopic: 100,
      minimumQuestions: 3_000,
    });
  });
});
