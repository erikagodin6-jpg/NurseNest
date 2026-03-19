import { pool } from "./storage";

const PROCESS_ROLE = "worker";
process.env.PROCESS_ROLE = PROCESS_ROLE;

console.log(`[Worker] Starting NurseNest worker process (PID: ${process.pid})...`);

async function startWorker() {
  try {
    await pool.query("SELECT 1");
    console.log("[Worker] Database connection verified");
  } catch (e: any) {
    console.error("[Worker] Database connection failed:", e.message);
    process.exit(1);
  }

  const { startJobQueueWorker } = await import("./job-queue");
  startJobQueueWorker();

  const { startReportingScheduler } = await import("./reporting-scheduler");
  startReportingScheduler();

  const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
  const MEMORY_LIMIT_MB = 1400;
  setInterval(async () => {
    const memUsage = process.memoryUsage();
    const heapMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    if (heapMB > MEMORY_LIMIT_MB) {
      console.warn(`[Worker Pipeline] Skipping cycle: heap ${heapMB}MB > ${MEMORY_LIMIT_MB}MB`);
      return;
    }
    console.log(`[Worker Pipeline] Starting cycle (heap: ${heapMB}MB)...`);
    try {
      const { createDailyJobs } = await import("./content-pipeline");
      const jobs = await createDailyJobs();
      if (jobs.length > 0) console.log(`[Worker Pipeline] Created ${jobs.length} daily jobs`);
    } catch (e: any) {
      console.error("[Worker Pipeline] createDailyJobs error:", e.message);
    }
    try {
      const { runContinuousImprovementJob } = await import("./content-pipeline");
      const improvement = await runContinuousImprovementJob();
      console.log(`[Worker Pipeline] Improvement: ${improvement.weakQuestions.length} weak questions, ${improvement.generationJobsQueued} jobs queued`);
    } catch (e: any) {
      console.error("[Worker Pipeline] Improvement error:", e.message);
    }
  }, SIX_HOURS_MS);

  setInterval(async () => {
    try {
      const { storage } = await import("./storage");
      const count = await storage.publishScheduledContent();
      if (count > 0) console.log(`[Worker] Auto-published ${count} content item(s)`);
    } catch (e: any) {
      console.error("[Worker] Scheduler error:", e.message);
    }
  }, 60_000);

  console.log("[Worker] All worker services started");
  console.log("[Worker] Job queue polling, reporting scheduler, pipeline scheduler active");
}

startWorker().catch(err => {
  console.error("[Worker] Fatal startup error:", err);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("[Worker] SIGTERM received, shutting down...");
  const { stopJobQueueWorker } = require("./job-queue");
  stopJobQueueWorker();
  const { stopReportingScheduler } = require("./reporting-scheduler");
  stopReportingScheduler();
  setTimeout(() => process.exit(0), 2000);
});
