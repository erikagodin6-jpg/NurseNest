import type { Express, Request, Response } from "express";
import { requireAdmin } from "./admin-auth";

export function registerAdminSeedRoutes(app: Express) {
  app.post("/api/admin/run-seeds", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const startTime = Date.now();
    const results: Record<string, { status: string; duration: number; error?: string }> = {};

    async function runSeed(name: string, fn: () => Promise<void>) {
      const t0 = Date.now();
      try {
        await fn();
        results[name] = { status: "ok", duration: Date.now() - t0 };
      } catch (e: any) {
        results[name] = { status: "error", duration: Date.now() - t0, error: e.message };
        console.error(`[AdminSeed] ${name} failed:`, e.message);
      }
    }

    await runSeed("pricingPlans", async () => {
      const { seedPricingPlans } = await import("./seed-pricing-plans");
      await seedPricingPlans();
    });

    await runSeed("promptTemplates", async () => {
      const { seedPromptTemplates } = await import("./prompts/qbank-templates");
      await seedPromptTemplates();
    });

    await runSeed("studyDecks", async () => {
      const { seedStudyDecks } = await import("./seed-study-decks");
      const { getDevPool } = await import("./db");
      await seedStudyDecks(getDevPool());
    });

    await runSeed("seoCluster", async () => {
      const { seedSEOClusters } = await import("./seed-seo-clusters");
      const { getDevPool } = await import("./db");
      await seedSEOClusters(getDevPool());
    });

    await runSeed("seoCtrPages", async () => {
      const { seedSeoCtrPages } = await import("./seed-seo-ctr-pages");
      const { getDevPool } = await import("./db");
      await seedSeoCtrPages(getDevPool());
    });

    await runSeed("paramedicContent", async () => {
      const { seedParamedicContent } = await import("./seed-paramedic-content");
      const { getDevPool } = await import("./db");
      await seedParamedicContent(getDevPool());
    });

    await runSeed("paramedicQuestions", async () => {
      const { seedParamedicQuestions } = await import("./seed-paramedic-questions");
      await seedParamedicQuestions();
    });

    await runSeed("emergencyNursingToxDisaster", async () => {
      const { seedEmergencyNursingToxDisaster } = await import("./seed-emergency-nursing-tox-disaster");
      await seedEmergencyNursingToxDisaster();
    });

    await runSeed("rnQuestionsDocx", async () => {
      const { seedRNQuestionsFromDocx } = await import("./seed-rn-questions-docx");
      await seedRNQuestionsFromDocx();
    });

    await runSeed("examQuestions", async () => {
      const { seedExamQuestions } = await import("./seed-exam-questions");
      const { pool } = await import("./storage");
      await seedExamQuestions(pool);
    });

    await runSeed("rrtQuestions", async () => {
      const { seedRRTQuestions } = await import("./seed-rrt-questions");
      const { pool } = await import("./storage");
      await seedRRTQuestions(pool);
    });

    await runSeed("rpnPathoQuestions", async () => {
      const { seedRPNPathoQuestions } = await import("./seed-rpn-patho-questions");
      const { pool } = await import("./storage");
      await seedRPNPathoQuestions(pool);
    });

    await runSeed("catFlashcards", async () => {
      const { seedCatFlashcards } = await import("./seed-cat-flashcards");
      const { pool } = await import("./storage");
      await seedCatFlashcards(pool);
    });

    await runSeed("examFlashcardMapper", async () => {
      const { mapExamQuestionsToFlashcards, bulkGenerateAlignedFlashcards } = await import("./exam-flashcard-mapper");
      await mapExamQuestionsToFlashcards();
      await bulkGenerateAlignedFlashcards();
    });

    await runSeed("digitalProducts", async () => {
      const { seedDigitalProducts } = await import("./seed-digital-products");
      const { pool } = await import("./storage");
      await seedDigitalProducts(pool);
    });

    await runSeed("encyclopediaEntries", async () => {
      const { seedEncyclopediaEntries } = await import("./encyclopedia-seed");
      await seedEncyclopediaEntries();
    });

    await runSeed("nursingContentHub", async () => {
      const { seedNursingContentHub } = await import("./seed-nursing-content-hub");
      const { pool } = await import("./storage");
      await seedNursingContentHub(pool);
    });

    await runSeed("alliedHealthLandingPages", async () => {
      const { seedAlliedHealthLandingPages } = await import("./seed-allied-health-landing-pages");
      await seedAlliedHealthLandingPages();
    });

    await runSeed("alliedHealthQuestions", async () => {
      const { seedAlliedHealthQuestions } = await import("./seeds/seed-allied-health-questions");
      const { pool } = await import("./storage");
      await seedAlliedHealthQuestions(pool);
    });

    await runSeed("topicHubPages", async () => {
      const { seedTopicHubPages } = await import("./seed-topic-hub-pages");
      await seedTopicHubPages();
    });

    await runSeed("longFormStudyGuides", async () => {
      const { seedLongFormStudyGuides } = await import("./seed-long-form-study-guides");
      await seedLongFormStudyGuides();
    });

    await runSeed("longTailEducationalPages", async () => {
      const { seedLongTailEducationalPages } = await import("./seed-long-tail-educational-pages");
      await seedLongTailEducationalPages();
    });

    await runSeed("imagingSeoContent", async () => {
      const { seedImagingSeoContent } = await import("./seed-imaging-seo-clusters");
      await seedImagingSeoContent();
    });

    await runSeed("imagingQuestions", async () => {
      const { seedImagingQuestions } = await import("./seed-imaging-startup-data");
      const { getDevPool } = await import("./db");
      await seedImagingQuestions(getDevPool());
    });

    await runSeed("positioningEntries", async () => {
      const { seedPositioningEntries } = await import("./seed-imaging-startup-data");
      const { getDevPool } = await import("./db");
      await seedPositioningEntries(getDevPool());
    });

    await runSeed("physicsTopics", async () => {
      const { seedPhysicsTopics } = await import("./seed-imaging-startup-data");
      const { getDevPool } = await import("./db");
      await seedPhysicsTopics(getDevPool());
    });

    await runSeed("imagingFlashcards", async () => {
      const { seedImagingFlashcards } = await import("./seed-imaging-startup-data");
      const { getDevPool } = await import("./db");
      await seedImagingFlashcards(getDevPool());
    });

    await runSeed("waveformData", async () => {
      const { seedWaveforms } = await import("./seed-imaging-startup-data");
      await seedWaveforms();
    });

    await runSeed("echoQuestionBank", async () => {
      const { seedEchoQuestionBank } = await import("./seed-echo-question-bank");
      await seedEchoQuestionBank();
    });

    const totalDuration = Date.now() - startTime;
    const successCount = Object.values(results).filter(r => r.status === "ok").length;
    const errorCount = Object.values(results).filter(r => r.status === "error").length;

    console.log(`[AdminSeed] Complete: ${successCount} succeeded, ${errorCount} failed, ${totalDuration}ms total`);

    const httpStatus = errorCount > 0 ? 207 : 200;
    res.status(httpStatus).json({
      success: errorCount === 0,
      totalDuration,
      successCount,
      errorCount,
      results,
    });
  });
}
