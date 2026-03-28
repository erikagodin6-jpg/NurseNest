#!/usr/bin/env npx tsx
import { config } from "dotenv";
config();
import "../server/load-env";
import type { Pool } from "pg";
import { logStartupDatabaseResolution } from "../server/db";

/** Whitelisted tables touched by one or more seeds in this runner; counts are diagnostic only. */
const POST_SEED_COUNT_TABLES = [
  "pricing_plans",
  "allied_questions",
  "exam_questions",
  "flashcard_decks",
  "deck_flashcards",
  "flashcard_bank",
  "seo_pages",
  "digital_products",
  "content_items",
  "encyclopedia_entries",
  "imaging_questions",
  "imaging_flashcards",
  "imaging_positioning_entries",
  "imaging_physics_topics",
  "mlt_lessons",
  "mlt_flashcards",
] as const;

async function logPostSeedTableCounts(pool: Pool) {
  const tables: Record<string, string> = {};
  for (const table of POST_SEED_COUNT_TABLES) {
    try {
      const r = await pool.query(`SELECT COUNT(*)::bigint AS c FROM ${table}`);
      tables[table] = String(r.rows[0].c);
    } catch {
      tables[table] = "(query failed or table missing)";
    }
  }
  console.log("\n=== Post-seed verification (row counts) ===");
  console.log(JSON.stringify({ type: "run_seeds_verification", tables }));
}

async function main() {
  console.log("=== NurseNest Seed Runner ===");
  logStartupDatabaseResolution();
  console.log("Starting all seed operations...\n");

  const startTime = Date.now();
  const results: { name: string; status: string; duration: number; error?: string }[] = [];

  async function runSeed(name: string, fn: () => Promise<void>) {
    const t0 = Date.now();
    process.stdout.write(`[${name}] Running... `);
    try {
      await fn();
      const dur = Date.now() - t0;
      console.log(`OK (${dur}ms)`);
      results.push({ name, status: "ok", duration: dur });
    } catch (e: any) {
      const dur = Date.now() - t0;
      console.log(`FAILED (${dur}ms): ${e.message}`);
      results.push({ name, status: "error", duration: dur, error: e.message });
    }
  }

  await runSeed("pricingPlans", async () => {
    const { seedPricingPlans } = await import("../server/seed-pricing-plans");
    await seedPricingPlans();
  });

  await runSeed("promptTemplates", async () => {
    const { seedPromptTemplates } = await import("../server/prompts/qbank-templates");
    await seedPromptTemplates();
  });

  await runSeed("studyDecks", async () => {
    const { seedStudyDecks } = await import("../server/seed-study-decks");
    const { getDevPool } = await import("../server/db");
    await seedStudyDecks(getDevPool());
  });

  await runSeed("seoCluster", async () => {
    const { seedSEOClusters } = await import("../server/seed-seo-clusters");
    const { getDevPool } = await import("../server/db");
    await seedSEOClusters(getDevPool());
  });

  await runSeed("seoCtrPages", async () => {
    const { seedSeoCtrPages } = await import("../server/seed-seo-ctr-pages");
    const { getDevPool } = await import("../server/db");
    await seedSeoCtrPages(getDevPool());
  });

  await runSeed("paramedicContent", async () => {
    const { seedParamedicContent } = await import("../server/seed-paramedic-content");
    const { getDevPool } = await import("../server/db");
    await seedParamedicContent(getDevPool());
  });

  await runSeed("paramedicQuestions", async () => {
    const { seedParamedicQuestions } = await import("../server/seed-paramedic-questions");
    await seedParamedicQuestions();
  });

  await runSeed("emergencyNursingToxDisaster", async () => {
    const { seedEmergencyNursingToxDisaster } = await import("../server/seed-emergency-nursing-tox-disaster");
    await seedEmergencyNursingToxDisaster();
  });

  await runSeed("rnQuestionsDocx", async () => {
    const { seedRNQuestionsFromDocx } = await import("../server/seed-rn-questions-docx");
    await seedRNQuestionsFromDocx();
  });

  await runSeed("examQuestions", async () => {
    const { seedExamQuestions } = await import("../server/seed-exam-questions");
    const { pool } = await import("../server/storage");
    await seedExamQuestions(pool);
  });

  await runSeed("rrtQuestions", async () => {
    const { seedRRTQuestions } = await import("../server/seed-rrt-questions");
    const { pool } = await import("../server/storage");
    await seedRRTQuestions(pool);
  });

  await runSeed("rpnPathoQuestions", async () => {
    const { seedRPNPathoQuestions } = await import("../server/seed-rpn-patho-questions");
    const { pool } = await import("../server/storage");
    await seedRPNPathoQuestions(pool);
  });

  await runSeed("catFlashcards", async () => {
    const { seedCatFlashcards } = await import("../server/seed-cat-flashcards");
    const { pool } = await import("../server/storage");
    await seedCatFlashcards(pool);
  });

  await runSeed("examFlashcardMapper", async () => {
    const { mapExamQuestionsToFlashcards, bulkGenerateAlignedFlashcards } = await import("../server/exam-flashcard-mapper");
    await mapExamQuestionsToFlashcards();
    await bulkGenerateAlignedFlashcards();
  });

  await runSeed("digitalProducts", async () => {
    const { seedDigitalProducts } = await import("../server/seed-digital-products");
    const { pool } = await import("../server/storage");
    await seedDigitalProducts(pool);
  });

  await runSeed("encyclopediaEntries", async () => {
    const { seedEncyclopediaEntries } = await import("../server/encyclopedia-seed");
    await seedEncyclopediaEntries();
  });

  await runSeed("nursingContentHub", async () => {
    const { seedNursingContentHub } = await import("../server/seed-nursing-content-hub");
    const { pool } = await import("../server/storage");
    await seedNursingContentHub(pool);
  });

  await runSeed("alliedHealthLandingPages", async () => {
    const { seedAlliedHealthLandingPages } = await import("../server/seed-allied-health-landing-pages");
    await seedAlliedHealthLandingPages();
  });

  await runSeed("alliedHealthQuestions", async () => {
    const { seedAlliedHealthQuestions } = await import("../server/seeds/seed-allied-health-questions");
    const { pool } = await import("../server/storage");
    await seedAlliedHealthQuestions(pool);
  });

  await runSeed("topicHubPages", async () => {
    const { seedTopicHubPages } = await import("../server/seed-topic-hub-pages");
    await seedTopicHubPages();
  });

  await runSeed("longFormStudyGuides", async () => {
    const { seedLongFormStudyGuides } = await import("../server/seed-long-form-study-guides");
    await seedLongFormStudyGuides();
  });

  await runSeed("longTailEducationalPages", async () => {
    const { seedLongTailEducationalPages } = await import("../server/seed-long-tail-educational-pages");
    await seedLongTailEducationalPages();
  });

  await runSeed("imagingSeoContent", async () => {
    const { seedImagingSeoContent } = await import("../server/seed-imaging-seo-clusters");
    await seedImagingSeoContent();
  });

  await runSeed("imagingQuestions", async () => {
    const { seedImagingQuestions } = await import("../server/seed-imaging-startup-data");
    const { getDevPool } = await import("../server/db");
    await seedImagingQuestions(getDevPool());
  });

  await runSeed("positioningEntries", async () => {
    const { seedPositioningEntries } = await import("../server/seed-imaging-startup-data");
    const { getDevPool } = await import("../server/db");
    await seedPositioningEntries(getDevPool());
  });

  await runSeed("physicsTopics", async () => {
    const { seedPhysicsTopics } = await import("../server/seed-imaging-startup-data");
    const { getDevPool } = await import("../server/db");
    await seedPhysicsTopics(getDevPool());
  });

  await runSeed("imagingFlashcards", async () => {
    const { seedImagingFlashcards } = await import("../server/seed-imaging-startup-data");
    const { getDevPool } = await import("../server/db");
    await seedImagingFlashcards(getDevPool());
  });

  await runSeed("waveformData", async () => {
    const { seedWaveforms } = await import("../server/seed-imaging-startup-data");
    await seedWaveforms();
  });

  await runSeed("echoQuestionBank", async () => {
    const { seedEchoQuestionBank } = await import("../server/seed-echo-question-bank");
    await seedEchoQuestionBank();
  });

  const totalDuration = Date.now() - startTime;
  const successCount = results.filter(r => r.status === "ok").length;
  const errorCount = results.filter(r => r.status === "error").length;

  console.log("\n=== Seed Summary ===");
  console.log(`Total: ${results.length} seeds, ${successCount} succeeded, ${errorCount} failed`);
  console.log(`Duration: ${(totalDuration / 1000).toFixed(1)}s`);

  if (errorCount > 0) {
    console.log("\nFailed seeds:");
    for (const r of results.filter(r => r.status === "error")) {
      console.log(`  - ${r.name}: ${r.error}`);
    }
  }

  const { pool } = await import("../server/storage");
  try {
    await logPostSeedTableCounts(pool);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("\nPost-seed verification failed:", message);
  }

  console.log(
    JSON.stringify({
      type: "run_seeds_summary",
      success: errorCount === 0,
      totalSeeds: results.length,
      succeeded: successCount,
      failed: errorCount,
    }),
  );

  await pool.end();
  process.exit(errorCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
