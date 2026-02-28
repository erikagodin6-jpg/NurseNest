import { createDailyJobs, runGenerationJob } from "./content-pipeline";

let schedulerTimer: NodeJS.Timeout | null = null;

function getNextRunTime(): Date {
  const now = new Date();
  const toronto = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
  const target = new Date(toronto);
  target.setHours(2, 0, 0, 0);

  if (target <= toronto) {
    target.setDate(target.getDate() + 1);
  }

  const diffMs = target.getTime() - toronto.getTime();
  return new Date(now.getTime() + diffMs);
}

async function runDailyPipeline() {
  console.log("[Scheduler] Starting daily content generation pipeline...");
  try {
    const jobIds = await createDailyJobs();
    console.log(`[Scheduler] Created ${jobIds.length} jobs for today`);

    for (const jobId of jobIds) {
      try {
        const result = await runGenerationJob(jobId);
        console.log(`[Scheduler] Job ${jobId} result:`, result);
      } catch (error) {
        console.error(`[Scheduler] Job ${jobId} failed:`, error);
      }
    }

    console.log("[Scheduler] Daily pipeline complete");
  } catch (error) {
    console.error("[Scheduler] Pipeline error:", error);
  }
}

function scheduleNext() {
  const nextRun = getNextRunTime();
  const delayMs = nextRun.getTime() - Date.now();

  console.log(`[Scheduler] Next pipeline run at ${nextRun.toISOString()} (${Math.round(delayMs / 3600000)}h from now)`);

  schedulerTimer = setTimeout(async () => {
    await runDailyPipeline();
    scheduleNext();
  }, delayMs);
}

export function startContentScheduler() {
  console.log("[Scheduler] Content generation scheduler initialized");
  scheduleNext();
}

export function stopContentScheduler() {
  if (schedulerTimer) {
    clearTimeout(schedulerTimer);
    schedulerTimer = null;
    console.log("[Scheduler] Scheduler stopped");
  }
}
