import { pool } from "./storage";

const WORKER_START_TIME = Date.now();

console.log("═══════════════════════════════════════════");
console.log("[Worker] NurseNest Background Worker starting...");
console.log("[Worker] PID:", process.pid);
console.log("[Worker] NODE_ENV:", process.env.NODE_ENV || "development");
console.log("═══════════════════════════════════════════");

process.env.PROCESS_ROLE = "worker";

let shuttingDown = false;
const intervals: NodeJS.Timeout[] = [];

async function startWorker(): Promise<void> {
  try {
    const dbResult = await pool.query("SELECT current_database() AS db, NOW() AS ts");
    console.log(`[Worker] Database connected: ${dbResult.rows[0].db}`);
  } catch (err: any) {
    console.error("[Worker] FATAL: Cannot connect to database:", err.message);
    process.exit(1);
  }

  const { startMemoryMonitorWithTrend } = await import("./memory-monitor");
  startMemoryMonitorWithTrend();
  console.log("[Worker] Memory monitor started");

  const { startJobQueueWorker, registerJobHandler } = await import("./job-queue");
  const { registerAllJobHandlers } = await import("./job-handlers");
  registerAllJobHandlers(registerJobHandler);
  startJobQueueWorker();
  console.log("[Worker] Job queue worker started");

  const { startQBankScheduler } = await import("./qbank-scheduler");
  startQBankScheduler();
  console.log("[Worker] QBank scheduler started");

  const { storage } = await import("./storage");
  intervals.push(setInterval(async () => {
    if (shuttingDown) return;
    try {
      const { shouldPauseBackgroundJobs } = await import("./memory-monitor");
      if (shouldPauseBackgroundJobs()) return;
      const count = await storage.publishScheduledContent();
      if (count > 0) console.log(`[Worker] Auto-published ${count} content item(s)`);
    } catch (err: any) {
      console.error("[Worker] Scheduler error:", err?.message || err);
    }
  }, 60_000));

  try {
    const { startReportingScheduler } = await import("./reporting-scheduler");
    startReportingScheduler();
    console.log("[Worker] Reporting scheduler started");
  } catch (e: any) {
    console.error("[Worker] Reporting scheduler init failed:", e.message);
  }

  const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
  intervals.push(setInterval(async () => {
    if (shuttingDown) return;
    try {
      const { shouldPauseBackgroundJobs, getDetectedMemoryLimitMB } = await import("./memory-monitor");
      if (shouldPauseBackgroundJobs()) {
        console.warn("[Worker:Pipeline] Skipping cycle: memory pressure active");
        return;
      }
      const limitMB = getDetectedMemoryLimitMB();
      const pipelineMemLimit = Math.round(limitMB * 0.70);
      const heapMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
      if (heapMB > pipelineMemLimit) {
        console.warn(`[Worker:Pipeline] Skipping cycle: heap ${heapMB}MB > ${pipelineMemLimit}MB`);
        return;
      }
    } catch {}
    const pipelineStart = Date.now();
    console.log("[Worker:Pipeline] Starting cycle...");
    try {
      const { createDailyJobs } = await import("./content-pipeline");
      const jobs = await createDailyJobs();
      if (jobs.length > 0) console.log(`[Worker:Pipeline] Created ${jobs.length} daily jobs`);
    } catch (e: any) {
      console.error("[Worker:Pipeline] createDailyJobs error:", e.message);
    }
    try {
      const { runContinuousImprovementJob } = await import("./content-pipeline");
      const improvement = await runContinuousImprovementJob();
      console.log(`[Worker:Pipeline] Improvement: ${improvement.weakQuestions.length} weak Q, ${improvement.generationJobsQueued} jobs queued (${Date.now() - pipelineStart}ms)`);
    } catch (e: any) {
      console.error("[Worker:Pipeline] Improvement error:", e.message);
    }
  }, SIX_HOURS_MS));
  console.log("[Worker] Pipeline scheduler started (every 6h)");

  try {
    const { startPostPublishAudit } = await import("./content-integrity-audit");
    startPostPublishAudit();
    console.log("[Worker] Post-publish audit started");
  } catch (e: any) {
    console.error("[Worker] Post-publish audit init failed:", e.message);
  }

  try {
    const { startAlertingEngine } = await import("./alerting-engine");
    startAlertingEngine(pool, 5 * 60 * 1000);
    console.log("[Worker] Alerting engine started (5min interval)");
  } catch (e: any) {
    console.error("[Worker] Alerting engine init failed:", e.message);
  }

  try {
    const { startSyntheticMonitoring } = await import("./synthetic-monitoring");
    const syntheticBaseUrl = process.env.SYNTHETIC_MONITOR_URL || "http://127.0.0.1:5000";
    startSyntheticMonitoring(pool, syntheticBaseUrl, 10 * 60 * 1000);
    console.log("[Worker] Synthetic monitoring started (10min interval)");
  } catch (e: any) {
    console.error("[Worker] Synthetic monitoring init failed:", e.message);
  }

  console.log("═══════════════════════════════════════════");
  console.log(`[Worker] All subsystems started in ${Date.now() - WORKER_START_TIME}ms`);
  console.log("[Worker] Active services: job-queue, qbank-scheduler, content-scheduler, pipeline, reporting, post-publish-audit, alerting, synthetic-monitoring");
  console.log("═══════════════════════════════════════════");
}

async function gracefulShutdown(signal: string): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`[Worker] ${signal} received, shutting down gracefully...`);

  for (const interval of intervals) {
    clearInterval(interval);
  }

  try { const { stopJobQueueWorker } = await import("./job-queue"); stopJobQueueWorker(); } catch {}
  try { const { stopQBankScheduler } = await import("./qbank-scheduler"); stopQBankScheduler(); } catch {}
  try { const { stopMemoryMonitorWithTrend } = await import("./memory-monitor"); stopMemoryMonitorWithTrend(); } catch {}
  try { const { stopAlertingEngine } = await import("./alerting-engine"); stopAlertingEngine(); } catch {}
  try { const { stopSyntheticMonitoring } = await import("./synthetic-monitoring"); stopSyntheticMonitoring(); } catch {}
  try { const { stopReportingScheduler } = await import("./reporting-scheduler"); stopReportingScheduler(); } catch {}

  console.log("[Worker] Cleanup complete, exiting");
  setTimeout(() => process.exit(0), 2000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startWorker().catch(err => {
  console.error("[Worker] Fatal startup error:", err);
  process.exit(1);
});
