import { completeUsNpCramLessons } from "./us-np-cram-complete";
import { usNpCramBatch60 } from "./us-np-cram-batch-60";
import { usNpCramBatch61 } from "./us-np-cram-batch-61";
import { usNpCramBatch62 } from "./us-np-cram-batch-62";
import { usNpCramBatch63 } from "./us-np-cram-batch-63";
import { usNpCramBatch64 } from "./us-np-cram-batch-64";
import { usNpCramBatch65 } from "./us-np-cram-batch-65";
import { usNpCramBatch66 } from "./us-np-cram-batch-66";
import { US_NP_CRAM_LEGACY_ALIASES } from "./us-np-cram-legacy-aliases";
import {
  US_NP_EXAMS,
  buildUsNpCramProjection,
  type UsNpCramLesson,
  type UsNpExam,
} from "./us-np-cram-types";

export * from "./us-np-cram-types";

export const EXPECTED_FINAL_US_NP_CRAM_LESSONS = 497;

export const finalUsNpCramLessons = [
  ...completeUsNpCramLessons,
  ...usNpCramBatch60,
  ...usNpCramBatch61,
  ...usNpCramBatch62,
  ...usNpCramBatch63,
  ...usNpCramBatch64,
  ...usNpCramBatch65,
  ...usNpCramBatch66,
] as const satisfies readonly UsNpCramLesson[];

function normalizeTitle(value: string): string {
  return value.trim().toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const titleIdentity = new Map<string, UsNpCramLesson>();
const slugIdentity = new Map<string, UsNpCramLesson>();
const canonicalBySlug = new Map<string, UsNpCramLesson>();

function register(
  map: Map<string, UsNpCramLesson>,
  identity: string,
  lesson: UsNpCramLesson,
  kind: "title" | "slug",
  source: string,
): void {
  const existing = map.get(identity);
  if (existing && existing.slug !== lesson.slug) {
    throw new Error(`US_NP_CRAM_FINAL_${kind.toUpperCase()}_COLLISION: ${identity}; ${existing.slug}/${lesson.slug}; ${source}`);
  }
  map.set(identity, lesson);
}

for (const lesson of finalUsNpCramLessons) {
  const canonicalSlug = normalizeSlug(lesson.slug);
  const canonicalTitle = normalizeTitle(lesson.title);
  const prior = canonicalBySlug.get(canonicalSlug);
  if (prior) throw new Error(`US_NP_CRAM_FINAL_DUPLICATE_CANONICAL_SLUG: ${lesson.slug}/${prior.slug}`);
  canonicalBySlug.set(canonicalSlug, lesson);
  register(slugIdentity, canonicalSlug, lesson, "slug", lesson.slug);
  register(titleIdentity, canonicalTitle, lesson, "title", lesson.slug);

  const inlineTitles = new Set([canonicalTitle]);
  for (const alias of lesson.titleAliases ?? []) {
    const normalized = normalizeTitle(alias);
    if (inlineTitles.has(normalized)) throw new Error(`US_NP_CRAM_FINAL_DUPLICATE_INLINE_TITLE: ${lesson.slug}/${alias}`);
    inlineTitles.add(normalized);
    register(titleIdentity, normalized, lesson, "title", `${lesson.slug}:inline`);
  }

  const inlineSlugs = new Set([canonicalSlug]);
  for (const alias of lesson.slugAliases ?? []) {
    const normalized = normalizeSlug(alias);
    if (inlineSlugs.has(normalized)) throw new Error(`US_NP_CRAM_FINAL_DUPLICATE_INLINE_SLUG: ${lesson.slug}/${alias}`);
    inlineSlugs.add(normalized);
    register(slugIdentity, normalized, lesson, "slug", `${lesson.slug}:inline`);
  }
}

for (const legacy of US_NP_CRAM_LEGACY_ALIASES) {
  const canonical = canonicalBySlug.get(normalizeSlug(legacy.canonicalSlug));
  if (!canonical) throw new Error(`US_NP_CRAM_FINAL_LEGACY_CANONICAL_MISSING: ${legacy.canonicalSlug}`);
  for (const alias of legacy.titleAliases ?? []) {
    register(titleIdentity, normalizeTitle(alias), canonical, "title", `legacy:${legacy.canonicalSlug}`);
  }
  for (const alias of legacy.slugAliases ?? []) {
    register(slugIdentity, normalizeSlug(alias), canonical, "slug", `legacy:${legacy.canonicalSlug}`);
  }
}

export function findFinalUsNpCramLesson(identity: {
  title?: string | null;
  slug?: string | null;
}): UsNpCramLesson | null {
  const byTitle = identity.title ? titleIdentity.get(normalizeTitle(identity.title)) : undefined;
  const bySlug = identity.slug ? slugIdentity.get(normalizeSlug(identity.slug)) : undefined;
  if (byTitle && bySlug && byTitle.slug !== bySlug.slug) {
    throw new Error(
      `US_NP_CRAM_FINAL_DATABASE_IDENTITY_CONFLICT: title=${identity.title ?? ""}; slug=${identity.slug ?? ""}; ` +
        `${byTitle.slug}/${bySlug.slug}`,
    );
  }
  return byTitle ?? bySlug ?? null;
}

export function getFinalUsNpCramLessonsForExam(exam: UsNpExam): readonly UsNpCramLesson[] {
  return finalUsNpCramLessons.filter((lesson) => lesson.applicableExams.includes(exam as never));
}

function validateFinalRegistry(): void {
  if (finalUsNpCramLessons.length !== EXPECTED_FINAL_US_NP_CRAM_LESSONS) {
    throw new Error(`US_NP_CRAM_FINAL_COUNT_INVALID: ${finalUsNpCramLessons.length}/${EXPECTED_FINAL_US_NP_CRAM_LESSONS}`);
  }

  const titles = new Set<string>();
  const slugs = new Set<string>();
  for (const lesson of finalUsNpCramLessons) {
    const title = normalizeTitle(lesson.title);
    const slug = normalizeSlug(lesson.slug);
    if (titles.has(title)) throw new Error(`US_NP_CRAM_FINAL_DUPLICATE_TITLE: ${lesson.title}`);
    if (slugs.has(slug)) throw new Error(`US_NP_CRAM_FINAL_DUPLICATE_SLUG: ${lesson.slug}`);
    titles.add(title);
    slugs.add(slug);

    if (!lesson.applicableExams.length) throw new Error(`US_NP_CRAM_FINAL_NO_EXAMS: ${lesson.slug}`);
    const examSet = new Set<UsNpExam>();
    for (const exam of lesson.applicableExams) {
      if (!US_NP_EXAMS.includes(exam)) throw new Error(`US_NP_CRAM_FINAL_UNKNOWN_EXAM: ${lesson.slug}/${exam}`);
      if (examSet.has(exam)) throw new Error(`US_NP_CRAM_FINAL_DUPLICATE_EXAM: ${lesson.slug}/${exam}`);
      examSet.add(exam);
    }

    for (const [field, value] of [
      ["recognize", lesson.recognize],
      ["diagnostics", lesson.diagnostics],
      ["priorities", lesson.priorities],
      ["medicationSafety", lesson.medicationSafety],
      ["redFlags", lesson.redFlags],
      ["examTraps", lesson.examTraps],
    ] as const) {
      if (value.trim().length < 60) throw new Error(`US_NP_CRAM_FINAL_FIELD_TOO_THIN: ${lesson.slug}/${field}`);
    }
    if (!lesson.sourceKeys.length) throw new Error(`US_NP_CRAM_FINAL_SOURCELESS: ${lesson.slug}`);

    const projection = buildUsNpCramProjection(lesson);
    if (
      projection.length !== 6 ||
      projection.map((item) => item.cramOrder).join("|") !== "1|2|3|4|5|6" ||
      projection.map((item) => item.cramTitle).join("|") !==
        "Recognize It Fast|Must-Know Diagnostics|First Priorities|Medication Safety|Red Flags|Exam Traps"
    ) {
      throw new Error(`US_NP_CRAM_FINAL_PROJECTION_INVALID: ${lesson.slug}`);
    }
  }

  for (const exam of US_NP_EXAMS) {
    if (getFinalUsNpCramLessonsForExam(exam).length === 0) {
      throw new Error(`US_NP_CRAM_FINAL_EMPTY_EXAM_PATHWAY: ${exam}`);
    }
  }
}

validateFinalRegistry();
