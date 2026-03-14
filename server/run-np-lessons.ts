import { seedNpLessons, getNpLessonPlan } from "./seed-np-lessons";
import { getProdPool, getDevPool, hasSeparateProdDb } from "./db";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const useDev = args.includes("--dev");
  const startFromArg = args.find((a) => a.startsWith("--start="));
  const startFrom = startFromArg ? parseInt(startFromArg.split("=")[1], 10) : 0;
  const batchSizeArg = args.find((a) => a.startsWith("--batch="));
  const batchSize = batchSizeArg ? parseInt(batchSizeArg.split("=")[1], 10) : 25;

  if (args.includes("--plan")) {
    const plan = getNpLessonPlan();
    const domains: Record<string, number> = {};
    for (const l of plan) {
      domains[l.domain] = (domains[l.domain] || 0) + 1;
    }
    console.log(`\nNP Lesson Plan: ${plan.length} total lessons\n`);
    for (const [domain, count] of Object.entries(domains)) {
      console.log(`  ${domain}: ${count} lessons`);
    }
    process.exit(0);
  }

  const targetPool = useDev ? getDevPool() : getProdPool();
  const dbTarget = useDev
    ? "DEVELOPMENT"
    : hasSeparateProdDb()
      ? "PRODUCTION"
      : "DEFAULT (dev=prod)";

  console.log(`Starting NP lesson generation (AI-powered with validation)...`);
  console.log(`  Database target: ${dbTarget}`);
  console.log(`  Batch size: ${batchSize}`);
  console.log(`  Start from: ${startFrom}`);
  console.log(`  Dry run: ${dryRun}`);

  try {
    const result = await seedNpLessons(targetPool, {
      batchSize,
      startFrom,
      dryRun,
    });
    console.log("\nResult:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
  }

  process.exit(0);
}

main();
