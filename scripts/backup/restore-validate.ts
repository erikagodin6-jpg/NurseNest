import fs from "fs";
import path from "path";
import {
  PROJECT_ROOT,
  getTimestamp,
  ensureDir,
  writeBackupLog,
  type BackupResult,
} from "./backup-engine";

interface ValidationCheck {
  name: string;
  status: "pass" | "fail" | "warn";
  details: string;
}

function checkFileExists(basePath: string, filePath: string, label: string): ValidationCheck {
  const fullPath = path.join(basePath, filePath);
  return {
    name: label,
    status: fs.existsSync(fullPath) ? "pass" : "fail",
    details: fs.existsSync(fullPath) ? `Found: ${filePath}` : `Missing: ${filePath}`,
  };
}

function checkDirExists(basePath: string, dirPath: string, label: string): ValidationCheck {
  const fullPath = path.join(basePath, dirPath);
  if (!fs.existsSync(fullPath)) {
    return { name: label, status: "fail", details: `Missing directory: ${dirPath}` };
  }
  const entries = fs.readdirSync(fullPath);
  return {
    name: label,
    status: entries.length > 0 ? "pass" : "warn",
    details: `${dirPath}: ${entries.length} entries`,
  };
}

async function runRestoreValidation() {
  const startTime = Date.now();
  const timestamp = getTimestamp();

  console.log(`[RESTORE:VALIDATE] Starting project validation at ${timestamp}`);

  const checks: ValidationCheck[] = [];

  checks.push(checkFileExists(PROJECT_ROOT, "package.json", "Package manifest"));
  checks.push(checkFileExists(PROJECT_ROOT, "tsconfig.json", "TypeScript config"));
  checks.push(checkFileExists(PROJECT_ROOT, "vite.config.ts", "Vite config"));
  checks.push(checkFileExists(PROJECT_ROOT, "drizzle.config.ts", "Drizzle config"));
  checks.push(checkFileExists(PROJECT_ROOT, ".env.example", "Environment template"));

  checks.push(checkFileExists(PROJECT_ROOT, "shared/schema.ts", "Database schema"));
  checks.push(checkDirExists(PROJECT_ROOT, "migrations", "Migration files"));
  checks.push(checkDirExists(PROJECT_ROOT, "server", "Server source"));
  checks.push(checkDirExists(PROJECT_ROOT, "client/src", "Client source"));
  checks.push(checkDirExists(PROJECT_ROOT, "shared", "Shared modules"));

  checks.push(checkFileExists(PROJECT_ROOT, "server/routes.ts", "API routes"));
  checks.push(checkFileExists(PROJECT_ROOT, "server/storage.ts", "Storage layer"));
  checks.push(checkFileExists(PROJECT_ROOT, "server/index.ts", "Server entry"));

  checks.push(checkFileExists(PROJECT_ROOT, "client/src/App.tsx", "App component"));
  checks.push(checkFileExists(PROJECT_ROOT, "client/index.html", "HTML entry"));

  const migDir = path.join(PROJECT_ROOT, "migrations");
  if (fs.existsSync(migDir)) {
    const sqlFiles = fs.readdirSync(migDir).filter((f) => f.endsWith(".sql"));
    checks.push({
      name: "SQL migration count",
      status: sqlFiles.length > 0 ? "pass" : "warn",
      details: `${sqlFiles.length} migration files found`,
    });
  }

  checks.push(checkFileExists(PROJECT_ROOT, "config/env-schema.json", "Env schema documentation"));
  checks.push(checkFileExists(PROJECT_ROOT, "docs/deployment/recovery-environment-checklist.md", "Recovery checklist"));
  checks.push(checkFileExists(PROJECT_ROOT, "docs/recovery/external-backup-strategy.md", "External backup strategy"));

  const hasNodeModules = fs.existsSync(path.join(PROJECT_ROOT, "node_modules"));
  checks.push({
    name: "Dependencies installed",
    status: hasNodeModules ? "pass" : "warn",
    details: hasNodeModules ? "node_modules exists" : "node_modules not found (run npm install)",
  });

  const hasDbUrl = !!process.env.DATABASE_URL;
  checks.push({
    name: "Database connection",
    status: hasDbUrl ? "pass" : "warn",
    details: hasDbUrl ? "DATABASE_URL is set" : "DATABASE_URL not set",
  });

  const passed = checks.filter((c) => c.status === "pass").length;
  const warned = checks.filter((c) => c.status === "warn").length;
  const failed = checks.filter((c) => c.status === "fail").length;

  console.log("\n=== Restore Validation Results ===\n");

  for (const check of checks) {
    const icon = check.status === "pass" ? "PASS" : check.status === "warn" ? "WARN" : "FAIL";
    console.log(`  [${icon}] ${check.name}: ${check.details}`);
  }

  console.log(`\n  Summary: ${passed} passed, ${warned} warnings, ${failed} failed`);
  console.log(`  Overall: ${failed === 0 ? "VALIDATION PASSED" : "VALIDATION FAILED"}\n`);

  const validationDir = path.join(PROJECT_ROOT, "backups", "logs");
  ensureDir(validationDir);
  fs.writeFileSync(
    path.join(validationDir, `restore-validation-${timestamp}.json`),
    JSON.stringify({ timestamp, checks, summary: { passed, warned, failed } }, null, 2)
  );

  const result: BackupResult = {
    timestamp,
    type: "restore-validate",
    status: failed === 0 ? "success" : "failed",
    fileCount: checks.length,
    archiveSize: 0,
    archivePath: PROJECT_ROOT,
    validationResult: failed === 0 ? "pass" : "fail",
    warnings: checks.filter((c) => c.status === "warn").map((c) => c.details),
    errors: checks.filter((c) => c.status === "fail").map((c) => c.details),
    duration: Date.now() - startTime,
  };

  writeBackupLog(result);
  return result;
}

runRestoreValidation().then(result => {
  if (result.status === "failed") process.exit(1);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
