import { usNpCramBatch1 } from "./us-np-cram-batch-1";
import { usNpCramBatch2 } from "./us-np-cram-batch-2";
import { usNpCramBatch3 } from "./us-np-cram-batch-3";
import { usNpCramBatch4 } from "./us-np-cram-batch-4";
import { usNpCramBatch5 } from "./us-np-cram-batch-5";
import { usNpCramBatch6 } from "./us-np-cram-batch-6";
import { usNpCramBatch7 } from "./us-np-cram-batch-7";
import { usNpCramBatch8 } from "./us-np-cram-batch-8";
import { usNpCramBatch9 } from "./us-np-cram-batch-9";
import { usNpCramBatch10 } from "./us-np-cram-batch-10";
import { usNpCramBatch11 } from "./us-np-cram-batch-11";
import { usNpCramBatch12 } from "./us-np-cram-batch-12";
import { usNpCramBatch13 } from "./us-np-cram-batch-13";
import { usNpCramBatch14 } from "./us-np-cram-batch-14";
import { usNpCramBatch15 } from "./us-np-cram-batch-15";
import { usNpCramBatch16 } from "./us-np-cram-batch-16";
import { usNpCramBatch17 } from "./us-np-cram-batch-17";
import { usNpCramBatch18 } from "./us-np-cram-batch-18";
import { usNpCramBatch19 } from "./us-np-cram-batch-19";
import { usNpCramBatch20 } from "./us-np-cram-batch-20";
import { usNpCramBatch21 } from "./us-np-cram-batch-21";
import { usNpCramBatch22 } from "./us-np-cram-batch-22";
import { usNpCramBatch23 } from "./us-np-cram-batch-23";
import { usNpCramBatch24 } from "./us-np-cram-batch-24";
import { usNpCramBatch25 } from "./us-np-cram-batch-25";
import { usNpCramBatch26 } from "./us-np-cram-batch-26";
import { usNpCramBatch27 } from "./us-np-cram-batch-27";
import { usNpCramBatch28 } from "./us-np-cram-batch-28";
import { usNpCramBatch29 } from "./us-np-cram-batch-29";
import { usNpCramBatch30 } from "./us-np-cram-batch-30";
import { usNpCramBatch31 } from "./us-np-cram-batch-31";
import {
  US_NP_EXAMS,
  buildUsNpCramProjection,
  type UsNpCramLesson,
  type UsNpExam,
} from "./us-np-cram-types";

export * from "./us-np-cram-types";

export const EXPECTED_US_NP_CRAM_LESSONS = 243;

export const usNpCramLessons = [
  ...usNpCramBatch1,
  ...usNpCramBatch2,
  ...usNpCramBatch3,
  ...usNpCramBatch4,
  ...usNpCramBatch5,
  ...usNpCramBatch6,
  ...usNpCramBatch7,
  ...usNpCramBatch8,
  ...usNpCramBatch9,
  ...usNpCramBatch10,
  ...usNpCramBatch11,
  ...usNpCramBatch12,
  ...usNpCramBatch13,
  ...usNpCramBatch14,
  ...usNpCramBatch15,
  ...usNpCramBatch16,
  ...usNpCramBatch17,
  ...usNpCramBatch18,
  ...usNpCramBatch19,
  ...usNpCramBatch20,
  ...usNpCramBatch21,
  ...usNpCramBatch22,
  ...usNpCramBatch23,
  ...usNpCramBatch24,
  ...usNpCramBatch25,
  ...usNpCramBatch26,
  ...usNpCramBatch27,
  ...usNpCramBatch28,
  ...usNpCramBatch29,
  ...usNpCramBatch30,
  ...usNpCramBatch31,
] as const satisfies readonly UsNpCramLesson[];

export function normalizeUsNpCramTitle(value: string): string {
  return value.trim().toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

export function normalizeUsNpCramSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const titleIdentityMap = new Map<string, UsNpCramLesson>();
const slugIdentityMap = new Map<string, UsNpCramLesson>();

function registerIdentity(
  map: Map<string, UsNpCramLesson>,
  normalized: string,
  lesson: UsNpCramLesson,
  kind: "TITLE" | "SLUG",
): void {
  const existing = map.get(normalized);
  if (existing && existing.slug !== lesson.slug) {
    throw new Error(`US_NP_CRAM_${kind}_IDENTITY_COLLISION: ${normalized}; ${existing.slug}/${lesson.slug}`);
  }
  map.set(normalized, lesson);
}

for (const lesson of usNpCramLessons) {
  registerIdentity(titleIdentityMap, normalizeUsNpCramTitle(lesson.title), lesson, "TITLE");
  for (const alias of lesson.titleAliases ?? []) {
    registerIdentity(titleIdentityMap, normalizeUsNpCramTitle(alias), lesson, "TITLE");
  }
  registerIdentity(slugIdentityMap, normalizeUsNpCramSlug(lesson.slug), lesson, "SLUG");
  for (const alias of lesson.slugAliases ?? []) {
    registerIdentity(slugIdentityMap, normalizeUsNpCramSlug(alias), lesson, "SLUG");
  }
}

export const usNpCramBySlug = Object.fromEntries(
  usNpCramLessons.map((lesson) => [lesson.slug, lesson]),
) as Record<string, UsNpCramLesson>;

export function findUsNpCramLesson(identity: { title?: string | null; slug?: string | null }): UsNpCramLesson | null {
  const byTitle = identity.title ? titleIdentityMap.get(normalizeUsNpCramTitle(identity.title)) : undefined;
  const bySlug = identity.slug ? slugIdentityMap.get(normalizeUsNpCramSlug(identity.slug)) : undefined;
  if (byTitle && bySlug && byTitle.slug !== bySlug.slug) {
    throw new Error(
      `US_NP_CRAM_DATABASE_IDENTITY_CONFLICT: title=${identity.title ?? ""}; slug=${identity.slug ?? ""}; ` +
        `${byTitle.slug}/${bySlug.slug}`,
    );
  }
  return byTitle ?? bySlug ?? null;
}

export function getUsNpCramLessonsForExam(exam: UsNpExam): readonly UsNpCramLesson[] {
  return usNpCramLessons.filter((lesson) => lesson.applicableExams.includes(exam as never));
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

function validateUsNpCramRegistry(): void {
  if (usNpCramLessons.length < EXPECTED_US_NP_CRAM_LESSONS) {
    throw new Error(
      `US_NP_CRAM_LESSON_COUNT_REGRESSED: ${usNpCramLessons.length}/${EXPECTED_US_NP_CRAM_LESSONS}`,
    );
  }

  const slugs = new Set<string>();
  const titles = new Set<string>();

  for (const lesson of usNpCramLessons) {
    if (slugs.has(lesson.slug)) throw new Error(`US_NP_CRAM_DUPLICATE_SLUG: ${lesson.slug}`);
    if (titles.has(lesson.title)) throw new Error(`US_NP_CRAM_DUPLICATE_TITLE: ${lesson.title}`);
    slugs.add(lesson.slug);
    titles.add(lesson.title);

    if (!lesson.applicableExams.length) {
      throw new Error(`US_NP_CRAM_NO_EXAMS: ${lesson.slug}`);
    }

    const localTitles = new Set<string>();
    for (const title of [lesson.title, ...(lesson.titleAliases ?? [])]) {
      const normalized = normalizeUsNpCramTitle(title);
      if (!normalized) throw new Error(`US_NP_CRAM_EMPTY_TITLE_IDENTITY: ${lesson.slug}`);
      if (localTitles.has(normalized)) throw new Error(`US_NP_CRAM_DUPLICATE_LOCAL_TITLE_IDENTITY: ${lesson.slug}/${title}`);
      localTitles.add(normalized);
    }

    const localSlugs = new Set<string>();
    for (const slug of [lesson.slug, ...(lesson.slugAliases ?? [])]) {
      const normalized = normalizeUsNpCramSlug(slug);
      if (!normalized) throw new Error(`US_NP_CRAM_EMPTY_SLUG_IDENTITY: ${lesson.slug}`);
      if (localSlugs.has(normalized)) throw new Error(`US_NP_CRAM_DUPLICATE_LOCAL_SLUG_IDENTITY: ${lesson.slug}/${slug}`);
      localSlugs.add(normalized);
    }

    const examTags = new Set<UsNpExam>();
    for (const exam of lesson.applicableExams) {
      if (!US_NP_EXAMS.includes(exam)) {
        throw new Error(`US_NP_CRAM_UNKNOWN_EXAM: ${lesson.slug}/${exam}`);
      }
      if (examTags.has(exam)) {
        throw new Error(`US_NP_CRAM_DUPLICATE_EXAM_TAG: ${lesson.slug}/${exam}`);
      }
      examTags.add(exam);
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
        throw new Error(`US_NP_CRAM_FIELD_TOO_THIN: ${lesson.slug}/${field}`);
      }
    }

    if (!lesson.sourceKeys.length) {
      throw new Error(`US_NP_CRAM_SOURCELESS: ${lesson.slug}`);
    }

    const projection = buildUsNpCramProjection(lesson);
    if (
      projection.length !== 6 ||
      projection.map((item) => item.cramOrder).join("|") !== "1|2|3|4|5|6"
    ) {
      throw new Error(`US_NP_CRAM_PROJECTION_INVALID: ${lesson.slug}`);
    }
  }

  for (const exam of US_NP_EXAMS) {
    const actual = getUsNpCramLessonsForExam(exam).length;
    if (actual < minimumCoverage[exam]) {
      throw new Error(`US_NP_CRAM_EXAM_UNDERCOVERED: ${exam}; ${actual}/${minimumCoverage[exam]}`);
    }
  }
}

validateUsNpCramRegistry();
