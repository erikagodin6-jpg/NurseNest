import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { logBackup } from "./backup-logger";

const ROOT = path.resolve(import.meta.dirname, "..");

const REQUIRED_COMPONENTS = [
  { name: "Client Code", patterns: ["client/src/App.tsx", "client/src/main.tsx", "client/index.html"] },
  { name: "Server Code", patterns: ["server/index.ts", "server/routes.ts", "server/storage.ts"] },
  { name: "Schema", patterns: ["shared/schema.ts"] },
  { name: "Package Config", patterns: ["package.json"] },
  { name: "TypeScript Config", patterns: ["tsconfig.json"] },
  { name: "Vite Config", patterns: ["vite.config.ts"] },
  { name: "Drizzle Config", patterns: ["drizzle.config.ts"] },
  { name: "Migrations", patterns: ["migrations/"] },
];

export interface ValidationResult {
  valid: boolean;
  archivePath: string;
  totalFiles: number;
  components: {
    name: string;
    found: boolean;
    matchedFiles: string[];
  }[];
  warnings: string[];
  timestamp: string;
}

export async function validateBackupArchive(archivePath?: string): Promise<ValidationResult> {
  if (!archivePath) {
    const backupsDir = path.join(ROOT, "backups");
    if (!fs.existsSync(backupsDir)) {
      throw new Error("No backups directory found");
    }
    const files = fs.readdirSync(backupsDir)
      .filter((f) => f.endsWith(".zip"))
      .sort()
      .reverse();
    if (files.length === 0) {
      throw new Error("No backup archives found in /backups/");
    }
    archivePath = path.join(backupsDir, files[0]);
  }

  if (!fs.existsSync(archivePath)) {
    throw new Error(`Archive not found: ${archivePath}`);
  }

  const zipBuffer = fs.readFileSync(archivePath);
  const zip = await JSZip.loadAsync(zipBuffer);
  const allFiles = Object.keys(zip.files);
  const totalFiles = allFiles.filter((f) => !zip.files[f].dir).length;

  const components: ValidationResult["components"] = [];
  const warnings: string[] = [];

  for (const component of REQUIRED_COMPONENTS) {
    const matchedFiles: string[] = [];
    for (const pattern of component.patterns) {
      if (pattern.endsWith("/")) {
        const dirFiles = allFiles.filter((f) => f.startsWith(pattern));
        matchedFiles.push(...dirFiles.slice(0, 3));
      } else {
        if (allFiles.includes(pattern)) {
          matchedFiles.push(pattern);
        }
      }
    }
    const found = matchedFiles.length > 0;
    components.push({ name: component.name, found, matchedFiles });
    if (!found) {
      warnings.push(`Missing component: ${component.name}`);
    }
  }

  const valid = components.every((c) => c.found);

  if (totalFiles < 50) {
    warnings.push(`Low file count (${totalFiles}) - backup may be incomplete`);
  }

  const stat = fs.statSync(archivePath);
  if (stat.size < 10000) {
    warnings.push(`Very small archive size (${stat.size} bytes) - backup may be incomplete`);
  }

  const result: ValidationResult = {
    valid,
    archivePath,
    totalFiles,
    components,
    warnings,
    timestamp: new Date().toISOString(),
  };

  await logBackup({
    type: "validation",
    timestamp: new Date().toISOString(),
    archivePath,
    size: stat.size,
    fileCount: totalFiles,
    status: valid ? "valid" : "invalid",
    validationResult: result,
  });

  return result;
}

if (process.argv[1] && process.argv[1].includes("validate-backup")) {
  const archivePath = process.argv[2] || undefined;
  validateBackupArchive(archivePath)
    .then((result) => {
      console.log("\nBackup Validation Report");
      console.log("========================");
      console.log(`Archive: ${result.archivePath}`);
      console.log(`Total Files: ${result.totalFiles}`);
      console.log(`Status: ${result.valid ? "VALID" : "INVALID"}`);
      console.log("\nComponents:");
      for (const c of result.components) {
        const icon = c.found ? "[OK]" : "[MISSING]";
        console.log(`  ${icon} ${c.name}`);
      }
      if (result.warnings.length > 0) {
        console.log("\nWarnings:");
        for (const w of result.warnings) {
          console.log(`  - ${w}`);
        }
      }
      if (!result.valid) process.exit(1);
    })
    .catch((err) => {
      console.error("Validation failed:", err.message);
      process.exit(1);
    });
}
