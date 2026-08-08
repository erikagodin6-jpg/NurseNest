import { describe, expect, it } from "vitest";
import { PRE_NURSING_ACCESS_MODEL, PRE_NURSING_SEO_CONTRACT, PRE_NURSING_SEO_PILLARS } from "../pre-nursing-seo-contract";
import { CORE_FOUNDATIONS_BATCH_01, CORE_FOUNDATIONS_BATCH_01_COUNTS } from "./core-foundations-batch-01";

describe("pre-nursing free SEO contract", () => {
  it("keeps the acquisition surface free and indexable", () => {
    expect(PRE_NURSING_ACCESS_MODEL).toBe("free");
    expect(PRE_NURSING_SEO_CONTRACT.indexable).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.requireNoEntitlementGate).toBe(true);
  });

  it("requires durable SEO and learning primitives", () => {
    expect(PRE_NURSING_SEO_CONTRACT.requireUniqueSearchIntentPerLesson).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.requireSingleH1).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.requireSemanticHeadings).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.requireInternalLinks).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.requireBeginnerFirstAnswer).toBe(true);
    expect(PRE_NURSING_SEO_CONTRACT.minimumMasteryQuestionsPerLesson).toBeGreaterThanOrEqual(10);
  });

  it("defines search-intent pillar clusters", () => {
    expect(PRE_NURSING_SEO_PILLARS.length).toBeGreaterThanOrEqual(6);
    for (const pillar of PRE_NURSING_SEO_PILLARS) {
      expect(pillar.primaryIntent.length).toBeGreaterThan(10);
      expect(pillar.supportingIntents.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("core foundations batch 01", () => {
  it("ships deep learner-facing lessons", () => {
    expect(CORE_FOUNDATIONS_BATCH_01.length).toBe(3);
    expect(CORE_FOUNDATIONS_BATCH_01_COUNTS.embeddedKnowledgeChecks).toBeGreaterThanOrEqual(30);
    expect(CORE_FOUNDATIONS_BATCH_01_COUNTS.finalReviewQuestions).toBeGreaterThanOrEqual(30);
  });

  it("gives every lesson an SEO target and substantial practice", () => {
    const primaryQueries = new Set<string>();

    for (const lesson of CORE_FOUNDATIONS_BATCH_01) {
      expect(lesson.seoTitle.length).toBeGreaterThan(20);
      expect(lesson.metaDescription.length).toBeGreaterThan(80);
      expect(lesson.primaryQuery.length).toBeGreaterThan(10);
      expect(primaryQueries.has(lesson.primaryQuery)).toBe(false);
      primaryQueries.add(lesson.primaryQuery);

      expect(lesson.objectives.length).toBeGreaterThanOrEqual(4);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(4);
      expect(lesson.finalReview.length).toBeGreaterThanOrEqual(10);
      expect(lesson.faq.length).toBeGreaterThanOrEqual(3);

      for (const section of lesson.sections) {
        expect(section.paragraphs.length).toBeGreaterThanOrEqual(3);
        expect(section.knowledgeChecks.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("keeps every knowledge check answerable with explanatory feedback", () => {
    const allChecks = CORE_FOUNDATIONS_BATCH_01.flatMap((lesson) => [
      ...lesson.sections.flatMap((section) => section.knowledgeChecks),
      ...lesson.finalReview,
    ]);

    for (const check of allChecks) {
      expect(check.options.length).toBeGreaterThanOrEqual(4);
      expect(check.correctIndex).toBeGreaterThanOrEqual(0);
      expect(check.correctIndex).toBeLessThan(check.options.length);
      expect(check.rationale.length).toBeGreaterThan(20);
    }
  });
});
