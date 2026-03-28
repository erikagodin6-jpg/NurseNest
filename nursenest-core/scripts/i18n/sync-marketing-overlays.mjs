#!/usr/bin/env node
/**
 * Merges marketing-en.json into each locale overlay so every key exists explicitly
 * in the locale file (no reliance on empty {} + silent runtime merge for missing keys).
 * Preserves any non-empty overlay values already present.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreRoot = path.resolve(__dirname, "../..");
const contentDir = path.join(coreRoot, "src/content");
const basePath = path.join(contentDir, "marketing-en.json");
const localeDir = path.join(contentDir, "locale");

const base = JSON.parse(fs.readFileSync(basePath, "utf8"));

if (typeof base !== "object" || base === null) {
  console.error("sync-marketing-overlays: invalid marketing-en.json");
  process.exit(1);
}

const baseKeys = Object.keys(base);
let updated = 0;

for (const file of fs.readdirSync(localeDir).sort()) {
  if (!/^marketing-[a-z-]+\.json$/i.test(file)) continue;
  const full = path.join(localeDir, file);
  let existing = {};
  try {
    const raw = fs.readFileSync(full, "utf8");
    existing = JSON.parse(raw);
  } catch {
    console.error(`sync-marketing-overlays: failed to parse ${full}`);
    process.exit(1);
  }
  if (typeof existing !== "object" || existing === null || Array.isArray(existing)) {
    console.error(`sync-marketing-overlays: ${file} must be a flat JSON object`);
    process.exit(1);
  }

  const merged = {};
  for (const k of baseKeys) {
    const prev = existing[k];
    if (prev !== undefined && prev !== "") {
      merged[k] = prev;
    } else {
      merged[k] = base[k];
    }
  }
  for (const k of Object.keys(existing)) {
    if (!Object.prototype.hasOwnProperty.call(base, k)) {
      merged[k] = existing[k];
    }
  }

  const out = JSON.stringify(merged, null, 2) + "\n";
  if (out !== fs.readFileSync(full, "utf8")) {
    fs.writeFileSync(full, out);
    updated++;
    console.log(`updated ${file}`);
  }
}

console.log(`sync-marketing-overlays: done (${updated} files touched, ${baseKeys.length} base keys)`);
