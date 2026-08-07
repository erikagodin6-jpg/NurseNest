import { advancedNpLessons } from "../../client/src/data/lessons/advanced-np";
import { uploadedClinicalNpLessons } from "../../client/src/data/lessons/uploaded-clinical-np";
import { npCurriculumBatch1 } from "../../client/src/data/lessons/np-curriculum-batch-1";
import { npGeneratedBatch7 } from "../../client/src/data/lessons/np-generated-batch-7";
import { npFreeBatch1Lessons } from "../../client/src/data/lessons/np-free-batch-1";
import { npFreeBatch2Lessons } from "../../client/src/data/lessons/np-free-batch-2";
import { npFreeBatch3Lessons } from "../../client/src/data/lessons/np-free-batch-3";
import { npExtraBank } from "../../client/src/data/lessons/extra-questions-np";
import { pharmacologyNpPrescribingLessons } from "../../client/src/data/lessons/pharmacology-np-prescribing";
import { npPathoExpansionLessons } from "../../client/src/data/lessons/np-patho-expansion";
import { npClinicalUnitLessons } from "../../client/src/data/lessons/np-clinical-units";
import { reproductiveNpLessons } from "../../client/src/data/lessons/reproductive-np";
import { respiratoryMissingNpLessons } from "../../client/src/data/lessons/respiratory-missing-np";
import { npContentExpansionPathoLessons } from "../../client/src/data/lessons/np-content-expansion-patho";
import { npContentExpansionPatho2Lessons } from "../../client/src/data/lessons/np-content-expansion-patho-2";
import { npContentExpansionDxLessons } from "../../client/src/data/lessons/np-content-expansion-dx";
import { npContentExpansionRxLessons } from "../../client/src/data/lessons/np-content-expansion-rx";
import { npContentExpansionMiscLessons } from "../../client/src/data/lessons/np-content-expansion-misc";
import {
  completeUsNpCramLessons,
  findCompleteUsNpCramLesson,
} from "../src/lib/content/curated-lessons/us-np-cram-complete";

type UnknownMap = Record<string, unknown>;

type SourceFamily = {
  name: string;
  records: UnknownMap;
};

const sourceFamilies: readonly SourceFamily[] = [
  { name: "advanced-np", records: advancedNpLessons as UnknownMap },
  { name: "uploaded-clinical-np", records: uploadedClinicalNpLessons as UnknownMap },
  { name: "np-curriculum-batch-1", records: npCurriculumBatch1 as UnknownMap },
  { name: "np-generated-batch-7", records: npGeneratedBatch7 as UnknownMap },
  { name: "np-free-batch-1", records: npFreeBatch1Lessons as UnknownMap },
  { name: "np-free-batch-2", records: npFreeBatch2Lessons as UnknownMap },
  { name: "np-free-batch-3", records: npFreeBatch3Lessons as UnknownMap },
  { name: "extra-questions-np", records: npExtraBank as UnknownMap },
  { name: "pharmacology-np-prescribing", records: pharmacologyNpPrescribingLessons as UnknownMap },
  { name: "np-patho-expansion", records: npPathoExpansionLessons as UnknownMap },
  { name: "np-clinical-units", records: npClinicalUnitLessons as UnknownMap },
  { name: "reproductive-np", records: reproductiveNpLessons as UnknownMap },
  { name: "respiratory-missing-np", records: respiratoryMissingNpLessons as UnknownMap },
  { name: "np-content-expansion-patho", records: npContentExpansionPathoLessons as UnknownMap },
  { name: "np-content-expansion-patho-2", records: npContentExpansionPatho2Lessons as UnknownMap },
  { name: "np-content-expansion-dx", records: npContentExpansionDxLessons as UnknownMap },
  { name: "np-content-expansion-rx", records: npContentExpansionRxLessons as UnknownMap },
  { name: "np-content-expansion-misc", records: npContentExpansionMiscLessons as UnknownMap },
] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function extractTitle(value: unknown): string | null {
  if (!isObject(value)) return null;
  const title = value.title;
  return typeof title === "string" && title.trim() ? title.trim() : null;
}

function main(): void {
  const discovered: Array<{
    family: string;
    sourceKey: string;
    title: string;
    cramSlug: string | null;
  }> = [];
  const malformed: Array<{ family: string; sourceKey: string }> = [];

  for (const family of sourceFamilies) {
    for (const [sourceKey, value] of Object.entries(family.records)) {
      const title = extractTitle(value);
      if (!title) {
        malformed.push({ family: family.name, sourceKey });
        continue;
      }
      const lesson = findCompleteUsNpCramLesson({ title, slug: sourceKey });
      discovered.push({
        family: family.name,
        sourceKey,
        title,
        cramSlug: lesson?.slug ?? null,
      });
    }
  }

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
      const key = entry.title.trim().toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ");
      (acc[key] ??= []).push({ family: entry.family, sourceKey: entry.sourceKey });
      return acc;
    }, {}),
  )
    .filter(([, rows]) => rows.length > 1)
    .map(([titleIdentity, rows]) => ({ titleIdentity, rows }));

  const report = {
    authoredCramLessons: completeUsNpCramLessons.length,
    sourceFamilies: sourceFamilies.length,
    discoveredFullLessons: discovered.length,
    matchedFullLessons: covered,
    uncoveredFullLessons: uncovered.length,
    coveragePercent: discovered.length ? Number(((covered / discovered.length) * 100).toFixed(2)) : 0,
    malformedSourceEntries: malformed.length,
    duplicateFullTitleIdentities: duplicateFullTitles.length,
    familySummary,
    uncovered,
    malformed,
    duplicateFullTitles,
  };

  console.log(JSON.stringify(report, null, 2));

  if (malformed.length > 0) {
    throw new Error(`US_NP_CRAM_STATIC_MALFORMED_SOURCE: ${malformed.length} source entries have no usable title`);
  }
  if (uncovered.length > 0) {
    throw new Error(
      `US_NP_CRAM_STATIC_COVERAGE_INCOMPLETE: ${uncovered.length}/${discovered.length} NP Full lessons have no exact/approved Cram identity`,
    );
  }
}

main();
