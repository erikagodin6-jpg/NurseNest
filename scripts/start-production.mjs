#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexAbs = path.join(root, "dist", "index.cjs");

console.log("STARTING WEB PROCESS");
console.log(`NODE_ENV=${process.env.NODE_ENV ?? "(unset)"}`);
console.log(`PORT=${process.env.PORT ?? "(unset; app defaults to 5000 if still unset)"}`);
console.log(`cwd=${process.cwd()}`);
console.log(`app_root=${root}`);
console.log(`server_entry=${indexAbs}`);

if (!fs.existsSync(indexAbs)) {
  console.error(
    "[FATAL BOOT] dist/index.cjs is missing. Build must produce dist/index.cjs before start.\n" +
      `  expected: ${indexAbs}`,
  );
  process.exit(1);
}

process.on("unhandledRejection", (reason) => {
  console.error("[FATAL BOOT] unhandledRejection:", reason);
  if (reason instanceof Error && reason.stack) console.error(reason.stack);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("[FATAL BOOT] uncaughtException:", err?.message || err);
  if (err?.stack) console.error(err.stack);
  process.exit(1);
});

const require = createRequire(import.meta.url);
console.log("[start] loading server bundle (dist/index.cjs) …");
try {
  require(indexAbs);
} catch (e) {
  console.error("[FATAL BOOT] require(dist/index.cjs) threw:", e?.message || e);
  if (e?.stack) console.error(e.stack);
  process.exit(1);
}

console.log(
  "[start] server bundle evaluated; async boot continues until HTTP listen (see STARTING WEB SERVER / BOOT SUCCESS logs).",
);
