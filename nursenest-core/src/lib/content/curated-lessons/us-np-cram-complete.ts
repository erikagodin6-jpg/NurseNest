import { usNpCramLessons as usNpCramBaseLessons } from "./us-np-cram";
import { usNpCramBatch32 } from "./us-np-cram-batch-32";
import { usNpCramBatch33 } from "./us-np-cram-batch-33";
import { usNpCramBatch34 } from "./us-np-cram-batch-34";
import { usNpCramBatch35 } from "./us-np-cram-batch-35";
import { usNpCramBatch36 } from "./us-np-cram-batch-36";
import { usNpCramBatch37 } from "./us-np-cram-batch-37";
import { usNpCramBatch38 } from "./us-np-cram-batch-38";
import { usNpCramBatch39 } from "./us-np-cram-batch-39";
import { usNpCramBatch40 } from "./us-np-cram-batch-40";
import { usNpCramBatch41 } from "./us-np-cram-batch-41";
import { usNpCramBatch42 } from "./us-np-cram-batch-42";
import { usNpCramBatch43 } from "./us-np-cram-batch-43";
import { usNpCramBatch44 } from "./us-np-cram-batch-44";
import { usNpCramBatch45 } from "./us-np-cram-batch-45";
import { usNpCramBatch46 } from "./us-np-cram-batch-46";
import { usNpCramBatch47 } from "./us-np-cram-batch-47";
import { usNpCramBatch48 } from "./us-np-cram-batch-48";
import { usNpCramBatch49 } from "./us-np-cram-batch-49";
import { usNpCramBatch50 } from "./us-np-cram-batch-50";
import { usNpCramBatch51 } from "./us-np-cram-batch-51";
import { usNpCramBatch52 } from "./us-np-cram-batch-52";
import { usNpCramBatch53 } from "./us-np-cram-batch-53";
import { usNpCramBatch54 } from "./us-np-cram-batch-54";
import { usNpCramBatch55 } from "./us-np-cram-batch-55";
import { usNpCramBatch56 } from "./us-np-cram-batch-56";
import { usNpCramBatch57 } from "./us-np-cram-batch-57";
import { usNpCramBatch58 } from "./us-np-cram-batch-58";
import { usNpCramBatch59 } from "./us-np-cram-batch-59";
import { US_NP_CRAM_LEGACY_ALIASES } from "./us-np-cram-legacy-aliases";
import {
  US_NP_EXAMS,
  buildUsNpCramProjection,
  type UsNpCramLesson,
  type UsNpExam,
} from "./us-np-cram-types";

export * from "./us-np-cram-types";

export const EXPECTED_COMPLETE_US_NP_CRAM_LESSONS = 441;

export const completeUsNpCramLessons = [
  ...usNpCramBaseLessons,
  ...usNpCramBatch32,
  ...usNpCramBatch33,
  ...usNpCramBatch34,
  ...usNpCramBatch35,
  ...usNpCramBatch36,
  ...usNpCramBatch37,
  ...usNpCramBatch38,
  ...usNpCramBatch39,
  ...usNpCramBatch40,
  ...usNpCramBatch41,
  ...usNpCramBatch42,
  ...usNpCramBatch43,
  ...usNpCramBatch44,
  ...usNpCramBatch45,
  ...usNpCramBatch46,
  ...usNpCramBatch47,
  ...usNpCramBatch48,
  ...usNpCramBatch49,
  ...usNpCramBatch50,
  ...usNpCramBatch51,
  ...usNpCramBatch52,
  ...usNpCramBatch53,
  ...usNpCramBatch54,
  ...usNpCramBatch55,
  ...usNpCramBatch56,
  ...usNpCramBatch57,
  ...usNpCramBatch58,
  ...usNpCramBatch59,
] as const satisfies readonly UsNpCramLesson[];

export function normalizeCompleteUsNpCramTitle(value: string): string {
  return value.trim().toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

export function normalizeCompleteUsNpCramSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const titleIdentityMap = new Map<string, UsNpCramLesson>();
const slugIdentityMap = new Map<string, UsNpCramLesson>();
const canonicalBySlug = new Map<string, UsNpCramLesson>();

function registerIdentity(
  map: Map<string, UsNpCramLesson>,
  normalized: string,
  lesson: UsNpCramLesson,
  kind: "TITLE" | "SLUG",
  source: string,
): void {
  if (!normalized) throw new Error(`US_NP_CRAM_COMPLETE_EMPTY_${kind}_IDENTITY: ${source}`);
  const existing = map.get(normalized);
  if (existing && existing.slug !== lesson.slug) {
    throw new Error(
      `US_NP_CRAM_COMPLETE_${kind}_IDENTITY_COLLISION: ${normalized}; ${existing.slug}/${lesson.slug}; source=${source}`,
    );
  }
  map.set(normalized, lesson);
}

function registerLesson(lesson: UsNpCramLesson): void {
  const canonicalSlug = normalizeCompleteUsNpCramSlug(lesson.slug);
  const existingCanonical = canonicalBySlug.get(canonicalSlug);
  if (existingCanonical && existingCanonical.slug !== lesson.slug) {
    throw new Error(`US_NP_CRAM_COMPLETE_CANONICAL_SLUG_COLLISION: ${lesson.slug}/${existingCanonical.slug}`);
  }
  canonicalBySlug.set(canonicalSlug, lesson);

  registerIdentity(titleIdentityMap, normalizeCompleteUsNpCramTitle(lesson.title), lesson, "TITLE", lesson.slug);
  registerIdentity(slugIdentityMap, canonicalSlug, lesson, "SLUG", lesson.slug);

  const localTitles = new Set<string>([normalizeCompleteUsNpCramTitle(lesson.title)]);
  for (const alias of lesson.titleAliases ?? []) {
    const normalized = normalizeCompleteUsNpCramTitle(alias);
    if (localTitles.has(normalized)) {
      throw new Error(`US_NP_CRAM_COMPLETE_DUPLICATE_LOCAL_TITLE: ${lesson.slug}/${alias}`);
    }
    localTitles.add(normalized);
    registerIdentity(titleIdentityMap, normalized, lesson, "TITLE", `${lesson.slug}:inline-alias`);
  }

  const localSlugs = new Set<string>([canonicalSlug]);
  for (const alias of lesson.slugAliases ?? []) {
    const normalized = normalizeCompleteUsNpCramSlug(alias);
    if (localSlugs.has(normalized)) {
      throw new Error(`US_NP_CRAM_COMPLETE_DUPLICATE_LOCAL_SLUG: ${lesson.slug}/${alias}`);
    }
    localSlugs.add(normalized);
    registerIdentity(slugIdentityMap, normalized, lesson, "SLUG", `${lesson.slug}:inline-alias`);
  }
}

for (const lesson of completeUsNpCramLessons) registerLesson(lesson);

for (const aliasRecord of US_NP_CRAM_LEGACY_ALIASES) {
  const canonical = canonicalBySlug.get(normalizeCompleteUsNpCramSlug(aliasRecord.canonicalSlug));
  if (!canonical) {
    throw new Error(`US_NP_CRAM_COMPLETE_LEGACY_CANONICAL_MISSING: ${aliasRecord.canonicalSlug}`);
  }
  for (const alias of aliasRecord.titleAliases ?? []) {
    registerIdentity(
      titleIdentityMap,
      normalizeCompleteUsNpCramTitle(alias),
      canonical,
      "TITLE",
      `legacy:${aliasRecord.canonicalSlug}`,
    );
  }
  for (const alias of aliasRecord.slugAliases ?? []) {
    registerIdentity(
      slugIdentityMap,
      normalizeCompleteUsNpCramSlug(alias),
      canonical,
      "SLUG",
      `legacy:${aliasRecord.canonicalSlug}`,
    );
  }
}

export const completeUsNpCramBySlug = Object.fromEntries(
  completeUsNpCramLessons.map((lesson) => [lesson.slug, lesson]),
) as Record<string, UsNpCramLesson>;

export function findCompleteUsNpCramLesson(identity: {
  title?: string | null;
  slug?: string | null;
}): UsNpCramLesson | null {
  const byTitle = identity.title
    ? titleIdentityMap.get(normalizeCompleteUsNpCramTitle(identity.title))
    : undefined;
  const bySlug = identity.slug
    ? slugIdentityMap.get(normalizeCompleteUsNpCramSlug(identity.slug))
    : undefined;

  if (byTitle && bySlug && byTitle.slug !== bySlug.slug) {
    throw new Error(
      `US_NP_CRAM_COMPLETE_DATABASE_IDENTITY_CONFLICT: title=${identity.title ?? ""}; slug=${identity.slug ?? ""}; ` +
        `${byTitle.slug}/${bySlug.slug}`,
    );
  }
  return byTitle ?? bySlug ?? null;
}

export function getCompleteUsNpCramLessonsForExam(exam: UsNpExam): readonly UsNpCramLesson[] {
  return completeUsNpCramLessons.filter((lesson) => lesson.applicableExams.includes(exam as never));
}

const minimumCoverage: Record<UsNpExam, number> = {
  "AANP-FNP": 243,
  "ANCC-FNP": 243,
  "AGPCNP-AANP": 177,
  "AGPCNP-ANCC": 177,
  "AGACNP": 118,
  "PMHNP": 48,
  "PNP": 69,
  "WHNP": 58,
  "ENP": 140,
};

function validateCompleteUsNpCramRegistry(): void {
  if (completeUsNpCramLessons.length !== EXPECTED_COMPLETE_US_NP_CRAM_LESSONS) {
    throw new Error(
      `US_NP_CRAM_COMPLETE_COUNT_INVALID: ${completeUsNpCramLessons.length}/${EXPECTED_COMPLETE_US_NP_CRAM_LESSONS}`,
    );
  }

  const canonicalSlugs = new Set<string>();
  const canonicalTitles = new Set<string>();

  for (const lesson of completeUsNpCramLessons) {
    const slug = normalizeCompleteUsNpCramSlug(lesson.slug);
    const title = normalizeCompleteUsNpCramTitle(lesson.title);
    if (canonicalSlugs.has(slug)) throw new Error(`US_NP_CRAM_COMPLETE_DUPLICATE_SLUG: ${lesson.slug}`);
    if (canonicalTitles.has(title)) throw new Error(`US_NP_CRAM_COMPLETE_DUPLICATE_TITLE: ${lesson.title}`);
    canonicalSlugs.add(slug);
    canonicalTitles.add(title);

    if (!lesson.applicableExams.length) throw new Error(`US_NP_CRAM_COMPLETE_NO_EXAMS: ${lesson.slug}`);
    const seenExam = new Set<UsNpExam>();
    for (const exam of lesson.applicableExams) {
      if (!US_NP_EXAMS.includes(exam)) throw new Error(`US_NP_CRAM_COMPLETE_UNKNOWN_EXAM: ${lesson.slug}/${exam}`);
      if (seenExam.has(exam)) throw new Error(`US_NP_CRAM_COMPLETE_DUPLICATE_EXAM: ${lesson.slug}/${exam}`);
      seenExam.add(exam);
    }

    const fields = [
      ["recognize", lesson.recognize],
      ["diagnostics", lesson.diagnostics],
      ["priorities", lesson.priorities],
      ["medicationSafety", lesson.medicationSafety],
      ["redFlags", lesson.redFlags],
      ["examTraps", lesson.examTraps],
    ] as const;
    for (const [field, value] of fields) {
      if (value.trim().length < 60) {
        throw new Error(`US_NP_CRAM_COMPLETE_FIELD_TOO_THIN: ${lesson.slug}/${field}`);
      }
    }
    if (!lesson.sourceKeys.length) throw new Error(`US_NP_CRAM_COMPLETE_SOURCELESS: ${lesson.slug}`);

    const projection = buildUsNpCramProjection(lesson);
    if (
      projection.length !== 6 ||
      projection.map((section) => section.cramTitle).join("|") !==
        "Recognize It Fast|Must-Know Diagnostics|First Priorities|Medication Safety|Red Flags|Exam Traps" ||
      projection.map((section) => section.cramOrder).join("|") !== "1|2|3|4|5|6"
    ) {
      throw new Error(`US_NP_CRAM_COMPLETE_PROJECTION_INVALID: ${lesson.slug}`);
    }
  }

  for (const exam of US_NP_EXAMS) {
    const actual = getCompleteUsNpCramLessonsForExam(exam).length;
    if (actual < minimumCoverage[exam]) {
      throw new Error(`US_NP_CRAM_COMPLETE_EXAM_UNDERCOVERED: ${exam}; ${actual}/${minimumCoverage[exam]}`);
    }
  }
}

validateCompleteUsNpCramRegistry();
