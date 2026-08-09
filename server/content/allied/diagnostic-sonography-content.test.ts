import { describe, expect, it } from "vitest";
import { materializeAlliedLessons, materializeAlliedQuestions } from "./builders";
import { normalizeAlliedAuthoredQuestion } from "./question-contract";
import {
  DIAGNOSTIC_SONOGRAPHY_PROGRAM_TARGETS,
  diagnosticSonographyTopics10,
} from "./topics-10-diagnostic-sonography";
import { diagnosticSonographyAbdominalTopics11 } from "./topics-11-diagnostic-sonography-abdominal";
import { diagnosticSonographyObGynTopics12 } from "./topics-12-diagnostic-sonography-obgyn";
import { diagnosticSonographyVascularTopics13 } from "./topics-13-diagnostic-sonography-vascular";
import { diagnosticSonographySmallPartsTopics14 } from "./topics-14-diagnostic-sonography-small-parts";
import { diagnosticSonographyPediatricTopics15 } from "./topics-15-diagnostic-sonography-pediatric";
import { alliedTopics03 } from "./topics-03-imaging-sonography";
import { diagnosticSonographyCardiacGapTopics16 } from "./topics-16-diagnostic-sonography-cardiac-gaps";
import { diagnosticSonographyFetalPediatricEchoTopics17 } from "./topics-17-diagnostic-sonography-fetal-pediatric-echo";

const canonicalCardiacTopics = alliedTopics03.filter(
  (topic) => topic.careerType === "cardiacSonographer",
);
const topics = [...diagnosticSonographyTopics10, ...diagnosticSonographyAbdominalTopics11, ...diagnosticSonographyObGynTopics12, ...diagnosticSonographyVascularTopics13, ...diagnosticSonographySmallPartsTopics14, ...diagnosticSonographyPediatricTopics15, ...canonicalCardiacTopics, ...diagnosticSonographyCardiacGapTopics16, ...diagnosticSonographyFetalPediatricEchoTopics17];
const lessons = materializeAlliedLessons(topics);
const questions = materializeAlliedQuestions(topics).map(
  normalizeAlliedAuthoredQuestion,
);

describe("diagnostic medical sonography authored expansion", () => {
  it("materializes the first ten canonical topics into fifty lessons", () => {
    expect(canonicalCardiacTopics).toHaveLength(8);
    expect(topics).toHaveLength(79);
    expect(lessons).toHaveLength(395);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(395);
    expect(new Set(lessons.map((lesson) => lesson.slug)).size).toBe(395);
  });

  it("provides one hundred questions for every topic", () => {
    expect(questions).toHaveLength(7_900);
    expect(new Set(questions.map((question) => question.id)).size).toBe(7_900);
    expect(new Set(questions.map((question) => question.stem)).size).toBe(7_900);

    for (const topic of topics) {
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
      expect(question.licensingBody).toMatch(/ARDMS/);
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
