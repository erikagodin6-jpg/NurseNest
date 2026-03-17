import { execSync } from "child_process";
import path from "path";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "../..");

console.log(`[SNAPSHOT:WEEKLY] Running weekly full backup at ${new Date().toISOString()}`);

try {
  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/backup-full.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/backup-content.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/backup-assets.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/generate-manifests.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/generate-critical-file-inventory.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  execSync(`npx tsx ${path.join(PROJECT_ROOT, "scripts/backup/export-deployment.ts")}`, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  console.log(`[SNAPSHOT:WEEKLY] Weekly full backup complete`);
} catch (e: any) {
  console.error(`[SNAPSHOT:WEEKLY] Failed: ${e.message}`);
  process.exit(1);
}
