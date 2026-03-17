import { execSync } from "child_process";
import path from "path";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "../..");

console.log(`[SNAPSHOT:PRE-DEPLOY] Running pre-deploy snapshot at ${new Date().toISOString()}`);

try {
  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/backup-db.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/backup-code.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/restore-validate.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  console.log(`[SNAPSHOT:PRE-DEPLOY] Pre-deploy snapshot complete. Safe to deploy.`);
} catch (e: any) {
  console.error(`[SNAPSHOT:PRE-DEPLOY] Failed: ${e.message}`);
  console.error("WARNING: Pre-deploy snapshot failed. Consider investigating before deploying.");
  process.exit(1);
}
