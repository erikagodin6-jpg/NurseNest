#!/usr/bin/env node
/**
 * Production process entry: no installs, no rebuilds, no cache deletion.
 * Fails fast if the server bundle is absent.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const index = path.join(root, "dist", "index.cjs");

if (!fs.existsSync(index)) {
  console.error(
    "[start] dist/index.cjs not found. Run the production build first:\n" +
      "  chmod +x scripts/production-build.sh && ./scripts/production-build.sh\n" +
      "or: npm run build (after npm ci with devDependencies available).",
  );
  process.exit(1);
}

console.log(`[start] launching ${path.relative(root, index)} (Render/npm start entry)`);

const child = spawn(process.execPath, [index], {
  stdio: "inherit",
  env: process.env,
  cwd: root,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
