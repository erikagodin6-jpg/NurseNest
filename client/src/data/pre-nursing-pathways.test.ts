import { describe, expect, it } from "vitest";
import {
  PRE_NURSING_MODULE_IDS,
  PRE_NURSING_PATHWAYS,
  PRE_NURSING_QUALITY_FLOOR,
  PRE_NURSING_SEO_CONTRACT,
  getPreNursingPathway,
  getPreNursingPathwayContentTargets,
} from "./pre-nursing-pathways";
import { PRE_NURSING_DEEP_LESSONS_BATCH_02 } from "./pre-nursing-deep-lessons-batch-02";

describe("pre-nursing pathway contract", () => {
  it("defines the four launch pathways", () => {
    expect(PRE_NURSING_PATHWAYS.map((pathway) => pathway.id)).toEqual([
      "core-foundations",
      "canada-admissions",
      "us-admissions",
      "nursing-school-readiness",
    ]);
  });

  it("keeps the free authoring floor high enough to be genuinely useful", () => {
    expect(PRE_NURSING_QUALITY_FLOOR.minimumLessonsPerModule).toBeGreaterThanOrEqual(12);
    expect(PRE_NURSING_QUALITY_FLOOR.minimumQuestionsPerModule).toBeGreaterThanOrEqual(120);
    expect(PRE_NURSING_QUALITY_FLOOR.minimumInteractiveChecksPerLesson).toBeGreaterThanOrEqual(3);
    expect(PRE_NURSING_QUALITY_FLOOR.minimumMasteryQuestionsPerLesson).toBeGreaterThanOrEqual(10);
    expect(PRE_NURSING_QUALITY_FLOOR.minimumCumulativeAssessmentsPerPathway).toBeGreaterThanOrEqual(3);
    expect(PRE_NURSING_QUALITY_FLOOR.requireBeginnerExplanation).toBe(true);
    expect(PRE_NURSING_QUALITY_FLOOR.requirePerOptionRationales).toBe(true);
  });

  it("keeps pre-nursing permanently free and indexable", () => {
    expect(PRE_NURSING_SEO_CONTRACT.freeAccess).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.requiresAuthentication).toBe(false);
    expect(PRE_NURSING_SEO_CONTRACT.requiresEntitlement).toBe(false);
    expect(PRE_NURSING_SEO_CONTRACT.indexable).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.selfCanonicalLessonUrls).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.uniqueSearchIntentPerLesson).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.semanticHeadingHierarchy).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.contextualInternalLinks).toBe(true);
  });

  it("does not publish empty phases or pathways", () => {
    for (const pathway of PRE_NURSING_PATHWAYS) {
      expect(pathway.phases.length).toBeGreaterThanOrEqual(3);
      expect(pathway.capstone.minimumQuestions).toBeGreaterThanOrEqual(150);

      for (const phase of pathway.phases) {
        expect(phase.moduleIds.length).toBeGreaterThan(0);
        expect(phase.exitCompetencies.length).toBeGreaterThanOrEqual(3);
        expect(phase.assessmentKinds.length).toBeGreaterThan(0);
      }
    }
  });

  it("derives non-trivial lesson and question targets from unique module coverage", () => {
    for (const pathway of PRE_NURSING_PATHWAYS) {
      const targets = getPreNursingPathwayContentTargets(pathway);
      expect(targets.modules).toBeGreaterThanOrEqual(9);
      expect(targets.minimumLessons).toBe(
        targets.modules * PRE_NURSING_QUALITY_FLOOR.minimumLessonsPerModule,
      );
      expect(targets.minimumQuestions).toBe(
        targets.modules * PRE_NURSING_QUALITY_FLOOR.minimumQuestionsPerModule,
      );
    }
  });

  it("keeps module ids unique in the exported module inventory", () => {
    expect(PRE_NURSING_MODULE_IDS.length).toBe(new Set(PRE_NURSING_MODULE_IDS).size);
  });

  it("falls back to core foundations for an unknown pathway", () => {
    expect(getPreNursingPathway("does-not-exist").id).toBe("core-foundations");
  });

  it("requires every deep lesson in batch 02 to include dense retrieval practice", () => {
    expect(PRE_NURSING_DEEP_LESSONS_BATCH_02.length).toBe(3);
    for (const lesson of PRE_NURSING_DEEP_LESSONS_BATCH_02) {
      expect(lesson.sections.length).toBeGreaterThanOrEqual(4);
      const embeddedChecks = lesson.sections.reduce((sum, section) => sum + section.knowledgeChecks.length, 0);
      expect(embeddedChecks).toBeGreaterThanOrEqual(12);
      expect(lesson.masteryQuestions.length).toBeGreaterThanOrEqual(10);
      expect(lesson.learningObjectives.length).toBeGreaterThanOrEqual(5);
      expect(lesson.faq.length).toBeGreaterThanOrEqual(3);
      expect(lesson.internalLinks.length).toBeGreaterThanOrEqual(3);
      expect(lesson.targetQueries.length).toBeGreaterThanOrEqual(3);
      expect(lesson.seoTitle.length).toBeGreaterThan(20);
      expect(lesson.seoDescription.length).toBeGreaterThan(60);
    }
  });
});
