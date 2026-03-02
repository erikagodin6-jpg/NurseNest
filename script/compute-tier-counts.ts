import { contentMap, questionCount } from "../client/src/data/lessons/index.js";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function inferTier(key: string): "rpn" | "rn" | "np" | "free" {
  if (key.endsWith("-np")) return "np";
  if (key.endsWith("-rn")) return "rn";
  if (key.endsWith("-rpn")) return "rpn";
  const freePatterns = [
    "pre-nursing", "anatomy-", "clinical-clarity",
    "first-aid", "vital-signs", "hand-hygiene",
    "body-mechanics", "patient-communication",
  ];
  for (const p of freePatterns) {
    if (key.startsWith(p)) return "free";
  }
  return "free";
}

const counts = { free: 0, rpn: 0, rn: 0, np: 0 };
for (const key of Object.keys(contentMap)) {
  const tier = inferTier(key);
  counts[tier]++;
}

const totalStatic = counts.free + counts.rpn + counts.rn + counts.np;

const output = `export const tierCounts = {
    free: ${counts.free},
    rpn: ${counts.rpn},
    rn: ${counts.rn},
    np: ${counts.np},
    totalStatic: ${totalStatic},
    questionCount: ${questionCount},
    computedAt: "${new Date().toISOString()}",
  };
`;

const outPath = resolve(__dirname, "..", "shared", "tier-counts.ts");
writeFileSync(outPath, output, "utf-8");
console.log(`[tier-counts] Updated: free=${counts.free} rpn=${counts.rpn} rn=${counts.rn} np=${counts.np} total=${totalStatic} questions=${questionCount}`);
