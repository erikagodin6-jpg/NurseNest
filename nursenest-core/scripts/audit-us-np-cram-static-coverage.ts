import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  finalUsNpCramLessons,
  findFinalUsNpCramLesson,
} from "../src/lib/content/curated-lessons/us-np-cram-final";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

type SourceFamily = {
  name: string;
  relativePath: string;
};

const sourceFamilies: readonly SourceFamily[] = [
  { name: "advanced-np", relativePath: "client/src/data/lessons/advanced-np.ts" },
  { name: "uploaded-clinical-np", relativePath: "client/src/data/lessons/uploaded-clinical-np.ts" },
  { name: "np-curriculum-batch-1", relativePath: "client/src/data/lessons/np-curriculum-batch-1.ts" },
  { name: "np-generated-batch-7", relativePath: "client/src/data/lessons/np-generated-batch-7.ts" },
  { name: "np-free-batch-1", relativePath: "client/src/data/lessons/np-free-batch-1.ts" },
  { name: "np-free-batch-2", relativePath: "client/src/data/lessons/np-free-batch-2.ts" },
  { name: "np-free-batch-3", relativePath: "client/src/data/lessons/np-free-batch-3.ts" },
  { name: "extra-questions-np", relativePath: "client/src/data/lessons/extra-questions-np.ts" },
  { name: "pharmacology-np-prescribing", relativePath: "client/src/data/lessons/pharmacology-np-prescribing.ts" },
  { name: "np-patho-expansion", relativePath: "client/src/data/lessons/np-patho-expansion.ts" },
  { name: "np-clinical-units", relativePath: "client/src/data/lessons/np-clinical-units.ts" },
  { name: "reproductive-np", relativePath: "client/src/data/lessons/reproductive-np.ts" },
  { name: "respiratory-missing-np", relativePath: "client/src/data/lessons/respiratory-missing-np.ts" },
  { name: "np-content-expansion-patho", relativePath: "client/src/data/lessons/np-content-expansion-patho.ts" },
  { name: "np-content-expansion-patho-2", relativePath: "client/src/data/lessons/np-content-expansion-patho-2.ts" },
  { name: "np-content-expansion-dx", relativePath: "client/src/data/lessons/np-content-expansion-dx.ts" },
  { name: "np-content-expansion-rx", relativePath: "client/src/data/lessons/np-content-expansion-rx.ts" },
  { name: "np-content-expansion-misc", relativePath: "client/src/data/lessons/np-content-expansion-misc.ts" },
] as const;

type DiscoveredLesson = {
  family: string;
  sourceKey: string;
  title: string;
  cramSlug: string | null;
};

const TOP_LEVEL_ENTRY = /^  (?:"([^"\n]+)"|([A-Za-z0-9_-]+))\s*:\s*\{/gm;
const TITLE = /\btitle\s*:\s*["'`]([^"'`\n]+)["'`]/;

function discoverFamily(family: SourceFamily): DiscoveredLesson[] {
  const absolutePath = path.join(repoRoot, family.relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`US_NP_CRAM_STATIC_SOURCE_FILE_MISSING: ${family.relativePath}`);
  }

  const source = fs.readFileSync(absolutePath, "utf8");
  const matches = [...source.matchAll(TOP_LEVEL_ENTRY)];
  const discovered: DiscoveredLesson[] = [];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const sourceKey = match[1] ?? match[2];
    if (!sourceKey) continue;
    const start = match.index ?? 0;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? source.length : source.length;
    const chunk = source.slice(start, end);
    const titleMatch = chunk.match(TITLE);
    if (!titleMatch?.[1]?.trim()) {
      throw new Error(`US_NP_CRAM_STATIC_MALFORMED_SOURCE: ${family.name}/${sourceKey} has no usable title`);
    }
    const title = titleMatch[1].trim();
    const lesson = findFinalUsNpCramLesson({ title, slug: sourceKey });
    discovered.push({ family: family.name, sourceKey, title, cramSlug: lesson?.slug ?? null });
  }

  return discovered;
}

function normalizeTitle(value: string): string {
  return value.trim().toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

function main(): void {
  const discovered = sourceFamilies.flatMap(discoverFamily);
  const uncovered = discovered.filter((entry) => !entry.cramSlug);
  const covered = discovered.length - uncovered.length;

  const familySummary = sourceFamilies.map((family) => {
    const rows = discovered.filter((entry) => entry.family === family.name);
    const gaps = rows.filter((entry) => !entry.cramSlug);
    return {
      family: family.name,
      fullLessons: rows.length,
      matched: rows.length - gaps.length,
      uncovered: gaps.length,
    };
  });

  const duplicateFullTitles = Object.entries(
    discovered.reduce<Record<string, Array<{ family: string; sourceKey: string }>>>((acc, entry) => {
      const identity = normalizeTitle(entry.title);
      (acc[identity] ??= []).push({ family: entry.family, sourceKey: entry.sourceKey });
      return acc;
    }, {}),
  )
    .filter(([, rows]) => rows.length > 1)
    .map(([titleIdentity, rows]) => ({ titleIdentity, rows }));

  const report = {
    authoredCramLessons: finalUsNpCramLessons.length,
    sourceFamilies: sourceFamilies.length,
    discoveredFullLessons: discovered.length,
    matchedFullLessons: covered,
    uncoveredFullLessons: uncovered.length,
    coveragePercent: discovered.length ? Number(((covered / discovered.length) * 100).toFixed(2)) : 0,
    duplicateFullTitleIdentities: duplicateFullTitles.length,
    familySummary,
    uncovered,
    duplicateFullTitles,
  };

  console.log(JSON.stringify(report, null, 2));

  if (finalUsNpCramLessons.length !== 497) {
    throw new Error(`US_NP_CRAM_STATIC_FINAL_REGISTRY_COUNT_INVALID: ${finalUsNpCramLessons.length}/497`);
  }
  if (discovered.length === 0) {
    throw new Error("US_NP_CRAM_STATIC_DISCOVERY_EMPTY: source parser found no NP Full lessons");
  }
  if (uncovered.length > 0) {
    throw new Error(
      `US_NP_CRAM_STATIC_COVERAGE_INCOMPLETE: ${uncovered.length}/${discovered.length} NP Full lessons have no exact/approved Cram identity`,
    );
  }
}

main();
