#!/usr/bin/env node
/**
 * Summarizes how marketing locale payloads are loaded (Phase 3 audit).
 * Run: node scripts/marketing-locale-payload-audit.mjs
 */
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const localeDir = join(root, "src/content/locale");
const overlays = readdirSync(localeDir).filter((f) => f.startsWith("marketing-") && f.endsWith(".json"));

console.log("=== Marketing locale payload audit (nursenest-core) ===\n");
console.log("Eager (bundled with routes that import loadMarketingMessages + en):");
console.log("  - src/content/marketing-en.json (full base, ~all keys)\n");
console.log("Lazy / route-loaded (dynamic import() in load-marketing-messages.ts):");
for (const f of overlays.sort()) {
  console.log(`  - src/content/locale/${f}`);
}
console.log("\nLearner / exam routes:");
console.log("  - Do not import load-marketing-messages or MarketingI18nProvider.");
console.log("  - ThemePicker uses fixed English labels when used outside marketing (learner shell).\n");
