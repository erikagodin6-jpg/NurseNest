#!/usr/bin/env npx tsx
/**
 * Bundle Guard — Oversized Import Checker
 *
 * Scans server/*.ts (excluding scripts/seeds/seed-* dirs) for static
 * import/require of files exceeding a configurable size threshold.
 * Exits non-zero if violations are found. Suitable for CI.
 *
 * Usage:
 *   npx tsx scripts/check-server-imports.ts [--threshold-kb=100]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THRESHOLD_KB = parseInt(
  process.argv.find(a => a.startsWith("--threshold-kb="))?.split("=")[1] || "100",
  10
);
const THRESHOLD_BYTES = THRESHOLD_KB * 1024;

const SERVER_DIR = path.resolve(__dirname, "../server");

const EXCLUDE_PATTERNS = [
  /[\/\\]scripts[\/\\]/,
  /[\/\\]seeds[\/\\]/,
  /^seeds[\/\\]/,
  /[\/\\]seed-data[\/\\]/,
  /^seed-/,
  /^__tests__[\/\\]/,
  /^run-seed-/,
  /^data[\/\\]/,
  /-seed\./,
  /-seed-/,
];

const ALLOWED_LARGE_IMPORTS = new Set([
  "storage.ts",
  "storage",
  "./storage",
  "../storage",
  "../shared/schema",
  "../shared/schema.ts",
  "../../shared/schema",
  "@shared/schema",
  "seo-meta.ts",
  "seo-meta",
  "./seo-meta",
  "../seo-meta",
  "../shared/locales",
  "./routes",
  "./platform-resilience",
  "../platform-resilience",
  "./qbank-expansion-engine",
]);

function shouldExcludeFile(relPath: string): boolean {
  return EXCLUDE_PATTERNS.some(p => p.test(relPath));
}

function getServerTsFiles(dir: string, base: string = ""): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      if (!shouldExcludeFile(rel + "/")) {
        files.push(...getServerTsFiles(path.join(dir, entry.name), rel));
      }
    } else if (entry.isFile() && /\.ts$/.test(entry.name) && !shouldExcludeFile(rel)) {
      files.push(rel);
    }
  }
  return files;
}

const STATIC_IMPORT_RE = /(?:^|\n)\s*import\s+.*from\s+['"]([^'"]+)['"]/g;
const REQUIRE_RE = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

function extractStaticImports(content: string): string[] {
  const imports: string[] = [];
  let m: RegExpExecArray | null;

  STATIC_IMPORT_RE.lastIndex = 0;
  while ((m = STATIC_IMPORT_RE.exec(content)) !== null) {
    imports.push(m[1]);
  }

  REQUIRE_RE.lastIndex = 0;
  while ((m = REQUIRE_RE.exec(content)) !== null) {
    imports.push(m[1]);
  }

  return imports;
}

function resolveImportPath(fromFile: string, importSpec: string): string | null {
  if (!importSpec.startsWith(".") && !importSpec.startsWith("/")) return null;

  const fromDir = path.dirname(path.join(SERVER_DIR, fromFile));
  let resolved = path.resolve(fromDir, importSpec);

  const extensions = ["", ".ts", ".js", ".json", "/index.ts", "/index.js"];
  for (const ext of extensions) {
    const candidate = resolved + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

interface Violation {
  sourceFile: string;
  importSpec: string;
  resolvedPath: string;
  sizeKB: number;
}

const violations: Violation[] = [];
const files = getServerTsFiles(SERVER_DIR);

for (const file of files) {
  const fullPath = path.join(SERVER_DIR, file);
  const content = fs.readFileSync(fullPath, "utf-8");
  const imports = extractStaticImports(content);

  for (const imp of imports) {
    if (ALLOWED_LARGE_IMPORTS.has(imp)) continue;
    const resolved = resolveImportPath(file, imp);
    if (!resolved) continue;

    try {
      const stat = fs.statSync(resolved);
      if (stat.size > THRESHOLD_BYTES) {
        violations.push({
          sourceFile: file,
          importSpec: imp,
          resolvedPath: path.relative(SERVER_DIR, resolved),
          sizeKB: Math.round(stat.size / 1024),
        });
      }
    } catch {}
  }
}

if (violations.length > 0) {
  console.error(`\n❌ Found ${violations.length} oversized import(s) exceeding ${THRESHOLD_KB}KB:\n`);
  for (const v of violations) {
    console.error(`  ${v.sourceFile}`);
    console.error(`    → imports "${v.importSpec}" (${v.sizeKB}KB)`);
    console.error(`    resolved: ${v.resolvedPath}\n`);
  }
  console.error("Fix: Use dynamic import() gated behind shouldRunSeeding() or lazy loading.\n");
  process.exit(1);
} else {
  console.log(`✅ No oversized imports found (threshold: ${THRESHOLD_KB}KB, scanned ${files.length} files)`);
  process.exit(0);
}
