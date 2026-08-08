import { describe, expect, it } from "vitest";
import {
  ALLIED_AUTHORED_TARGETS,
  alliedAuthoredLessons,
  alliedAuthoredQuestions,
  alliedAuthoredTopics,
  assertAlliedAuthoredEstate,
} from "./index";

const banned = /\b(?:todo|tbd|lorem ipsum|placeholder|insert content|generic content)\b/i;

function unique<T>(rows: T[]): boolean {
  return new Set(rows).size === rows.length;
}

describe("Allied authored content estate", () => {
  it("meets the hard estate floors", () => {
    expect(() => assertAlliedAuthoredEstate()).not.toThrow();
    expect(alliedAuthoredTopics).toHaveLength(ALLIED_AUTHORED_TARGETS.minimumTopics);
    expect(alliedAuthoredLessons).toHaveLength(ALLIED_AUTHORED_TARGETS.minimumLessons);
    expect(alliedAuthoredQuestions).toHaveLength(ALLIED_AUTHORED_TARGETS.minimumQuestions);
  });

  it("uses unique stable source identities", () => {
    expect(unique(alliedAuthoredTopics.map((row) => row.id))).toBe(true);
    expect(unique(alliedAuthoredLessons.map((row) => row.id))).toBe(true);
    expect(unique(alliedAuthoredLessons.map((row) => row.slug))).toBe(true);
    expect(unique(alliedAuthoredQuestions.map((row) => row.id))).toBe(true);
    expect(unique(alliedAuthoredQuestions.map((row) => row.stem))).toBe(true);
  });

  it("keeps topic blueprints substantive", () => {
    for (const topic of alliedAuthoredTopics) {
      expect(topic.id.length).toBeGreaterThan(5);
      expect(topic.topic.length).toBeGreaterThan(8);
      expect(topic.bottomLine.length).toBeGreaterThan(90);
      expect(topic.coreConcept.length).toBeGreaterThan(90);
      expect(topic.recognition.length).toBeGreaterThan(90);
      expect(topic.workflow.length).toBeGreaterThan(90);
      expect(topic.interpretation.length).toBeGreaterThan(70);
      expect(topic.safety.length).toBeGreaterThan(60);
      expect(topic.redFlags.length).toBeGreaterThan(70);
      expect(topic.commonErrors.length).toBeGreaterThan(70);
      expect(topic.examFocus.length).toBeGreaterThan(60);
      expect(topic.glossary.length).toBeGreaterThanOrEqual(2);
      expect(banned.test(JSON.stringify(topic))).toBe(false);
    }
  });

  it("keeps every lesson complete and learner-usable", () => {
    for (const lesson of alliedAuthoredLessons) {
      expect(lesson.status).toBe("published");
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(4);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(7);
      expect(lesson.summary.length).toBeGreaterThan(100);
      expect(lesson.estimatedMinutes).toBeGreaterThanOrEqual(14);
      expect(lesson.difficulty).toBeGreaterThanOrEqual(1);
      expect(lesson.difficulty).toBeLessThanOrEqual(4);
      expect(lesson.glossary.length).toBeGreaterThanOrEqual(2);
      expect(banned.test(JSON.stringify(lesson))).toBe(false);
      for (const section of lesson.sections) {
        expect(section.sectionTitle.length).toBeGreaterThan(2);
        expect(section.content.length).toBeGreaterThan(60);
      }
    }
  });

  it("keeps every question structurally complete with per-distractor reasoning", () => {
    for (const question of alliedAuthoredQuestions) {
      expect(question.stem.length).toBeGreaterThan(90);
      expect(question.options).toHaveLength(4);
      expect(unique(question.options)).toBe(true);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
      expect(question.rationale.length).toBeGreaterThan(120);
      expect(question.correctAnswerExplanation.length).toBeGreaterThan(60);
      expect(Object.keys(question.distractorRationales)).toHaveLength(3);
      expect(question.clinicalPearl.length).toBeGreaterThan(100);
      expect(question.tags.length).toBeGreaterThanOrEqual(4);
      expect(question.difficulty).toBeGreaterThanOrEqual(1);
      expect(question.difficulty).toBeLessThanOrEqual(4);
      expect(banned.test(JSON.stringify(question))).toBe(false);
      for (const rationale of Object.values(question.distractorRationales)) {
        expect(rationale.length).toBeGreaterThan(100);
      }
    }
  });

  it("maintains exactly 100 questions for every authored topic", () => {
    for (const topic of alliedAuthoredTopics) {
      const questions = alliedAuthoredQuestions.filter(
        (question) => question.careerType === topic.careerType && question.topic === topic.topic,
      );
      expect(questions).toHaveLength(100);
      expect(new Set(questions.map((question) => question.stem)).size).toBe(100);
    }
  });

  it("keeps the diagnostic medical sonography expansion internally complete", () => {
    const career = "diagnosticMedicalSonography";
    const topics = alliedAuthoredTopics.filter((topic) => topic.careerType === career);
    const lessons = alliedAuthoredLessons.filter((lesson) => lesson.careerType === career);
    const questions = alliedAuthoredQuestions.filter((question) => question.careerType === career);

    expect(topics).toHaveLength(50);
    expect(lessons).toHaveLength(250);
    expect(questions).toHaveLength(5_000);

    for (const topic of topics) {
      expect(lessons.filter((lesson) => lesson.topic === topic.topic)).toHaveLength(5);
      expect(questions.filter((question) => question.topic === topic.topic)).toHaveLength(100);
    }
  });
});
