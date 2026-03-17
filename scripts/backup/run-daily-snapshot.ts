import { execSync } from "child_process";
import path from "path";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "../..");

console.log(`[SNAPSHOT:DAILY] Running daily snapshot at ${new Date().toISOString()}`);

try {
  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/backup-code.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/backup-db.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/generate-manifests.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  console.log(`[SNAPSHOT:DAILY] Daily snapshot complete`);
} catch (e: any) {
  console.error(`[SNAPSHOT:DAILY] Failed: ${e.message}`);
  process.exit(1);
}
