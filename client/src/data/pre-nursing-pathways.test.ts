import { describe, expect, it } from "vitest";
import {
  PRE_NURSING_MODULE_IDS,
  PRE_NURSING_PATHWAYS,
  PRE_NURSING_QUALITY_FLOOR,
  getPreNursingPathway,
  getPreNursingPathwayContentTargets,
} from "./pre-nursing-pathways";

describe("pre-nursing pathway contract", () => {
  it("defines the four launch pathways", () => {
    expect(PRE_NURSING_PATHWAYS.map((pathway) => pathway.id)).toEqual([
      "core-foundations",
      "canada-admissions",
      "us-admissions",
      "nursing-school-readiness",
    ]);
  });

  it("keeps the premium authoring floor high enough to be commercially meaningful", () => {
    expect(PRE_NURSING_QUALITY_FLOOR.minimumLessonsPerModule).toBeGreaterThanOrEqual(12);
    expect(PRE_NURSING_QUALITY_FLOOR.minimumQuestionsPerModule).toBeGreaterThanOrEqual(120);
    expect(PRE_NURSING_QUALITY_FLOOR.minimumInteractiveChecksPerLesson).toBeGreaterThanOrEqual(3);
    expect(PRE_NURSING_QUALITY_FLOOR.minimumCumulativeAssessmentsPerPathway).toBeGreaterThanOrEqual(3);
    expect(PRE_NURSING_QUALITY_FLOOR.requireBeginnerExplanation).toBe(true);
    expect(PRE_NURSING_QUALITY_FLOOR.requirePerOptionRationales).toBe(true);
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
});
