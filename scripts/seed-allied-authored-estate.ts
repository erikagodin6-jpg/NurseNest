import "../server/load-env";
import { pool } from "../server/storage";
import {
  alliedAuthoredLessons,
  alliedAuthoredQuestions,
  alliedAuthoredTopics,
  assertAlliedAuthoredEstate,
} from "../server/content/allied";

type ColumnInfo = { column_name: string; data_type: string; udt_name: string };

async function tableExists(table: string): Promise<boolean> {
  const result = await pool.query(`SELECT to_regclass($1) AS table_name`, [`public.${table}`]);
  return Boolean(result.rows[0]?.table_name);
}

async function columnsFor(table: string): Promise<Map<string, ColumnInfo>> {
  const result = await pool.query<ColumnInfo>(
    `SELECT column_name, data_type, udt_name
       FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1`,
    [table],
  );
  return new Map(result.rows.map((row) => [row.column_name, row]));
}

function valueForColumn(info: ColumnInfo | undefined, value: unknown): unknown {
  if (!info) return value;
  if (info.data_type === "jsonb" || info.data_type === "json") return JSON.stringify(value);
  if (info.data_type === "ARRAY") return Array.isArray(value) ? value : [String(value)];
  return value;
}

async function seedLessons(): Promise<{ insertedOrUpdated: number; total: number }> {
  if (!(await tableExists("content_items"))) {
    throw new Error("content_items table is required to seed authored Allied lessons");
  }

  let insertedOrUpdated = 0;
  for (const lesson of alliedAuthoredLessons) {
    const content = {
      source: "allied-authored-estate-v1",
      careerType: lesson.careerType,
      examTag: lesson.examTag,
      regionScope: lesson.regionScope,
      category: lesson.category,
      topic: lesson.topic,
      mode: lesson.mode,
      objectives: lesson.objectives,
      sections: lesson.sections,
      glossary: lesson.glossary,
      estimatedMinutes: lesson.estimatedMinutes,
      difficulty: lesson.difficulty,
    };
    const tags = [
      "allied-authored-estate-v1",
      lesson.careerType,
      lesson.examTag,
      lesson.category,
      lesson.topic,
      lesson.mode,
    ];

    const result = await pool.query(
      `INSERT INTO content_items (
         title, slug, type, category, body_system, tier, status, tags, summary, content,
         seo_title, seo_description, clinical_safety_review, auto_publish, region_scope,
         author_name, updated_by_ai, source_version, published_at, created_at, updated_at
       ) VALUES (
         $1, $2, 'allied_lesson', $3, $4, 'free', 'published', $5, $6, $7::jsonb,
         $8, $9, true, false, $10, $11, true, 1, NOW(), NOW(), NOW()
       )
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         type = EXCLUDED.type,
         category = EXCLUDED.category,
         body_system = EXCLUDED.body_system,
         status = EXCLUDED.status,
         tags = EXCLUDED.tags,
         summary = EXCLUDED.summary,
         content = EXCLUDED.content,
         seo_title = EXCLUDED.seo_title,
         seo_description = EXCLUDED.seo_description,
         clinical_safety_review = EXCLUDED.clinical_safety_review,
         region_scope = EXCLUDED.region_scope,
         author_name = EXCLUDED.author_name,
         updated_by_ai = EXCLUDED.updated_by_ai,
         source_version = content_items.source_version + 1,
         published_at = COALESCE(content_items.published_at, NOW()),
         updated_at = NOW()`,
      [
        lesson.title,
        lesson.slug,
        lesson.category,
        lesson.category,
        tags,
        lesson.summary,
        JSON.stringify(content),
        `${lesson.title} | NurseNest Allied Health`,
        lesson.summary.slice(0, 155),
        lesson.regionScope,
        "NurseNest AI Content Author",
      ],
    );
    insertedOrUpdated += result.rowCount ?? 0;
  }

  const count = await pool.query(
    `SELECT COUNT(*)::int AS count
       FROM content_items
      WHERE type = 'allied_lesson'
        AND tags @> ARRAY['allied-authored-estate-v1']::text[]`,
  );
  return { insertedOrUpdated, total: count.rows[0]?.count ?? 0 };
}

async function seedQuestions(): Promise<{ inserted: number; total: number; optionalColumns: string[] }> {
  if (!(await tableExists("allied_questions"))) {
    throw new Error("allied_questions table is required to seed authored Allied questions");
  }

  const columns = await columnsFor("allied_questions");
  const required = [
    "career_type",
    "blueprint_id",
    "stem",
    "options",
    "correct_answer",
    "rationale_long",
    "learning_objective",
    "blueprint_category",
    "subtopic",
    "difficulty",
    "cognitive_level",
    "question_type",
    "exam_tag",
  ];
  for (const column of required) {
    if (!columns.has(column)) throw new Error(`allied_questions missing required column: ${column}`);
  }

  const optionalCandidates = [
    "region_scope",
    "rationale",
    "distractor_rationales",
    "correct_answer_explanation",
    "clinical_pearl",
    "tags",
    "status",
    "topic",
    "body_system",
    "tier",
  ];
  const optionalColumns = optionalCandidates.filter((column) => columns.has(column));
  const insertColumns = [...required, ...optionalColumns];
  const BATCH_SIZE = 100;
  let inserted = 0;

  for (let offset = 0; offset < alliedAuthoredQuestions.length; offset += BATCH_SIZE) {
    const batch = alliedAuthoredQuestions.slice(offset, offset + BATCH_SIZE);
    const values: unknown[] = [];
    const rows: string[] = [];
    let parameter = 1;

    for (const question of batch) {
      const record: Record<string, unknown> = {
        career_type: question.careerType,
        blueprint_id: question.id,
        stem: question.stem,
        options: question.options,
        correct_answer: question.correctIndex,
        rationale_long: question.rationale,
        learning_objective: question.correctAnswerExplanation,
        blueprint_category: question.category,
        subtopic: question.topic,
        difficulty: question.difficulty,
        cognitive_level: question.cognitiveLevel,
        question_type: "multiple-choice",
        exam_tag: question.examTag,
        region_scope: question.regionScope,
        rationale: question.rationale,
        distractor_rationales: question.distractorRationales,
        correct_answer_explanation: question.correctAnswerExplanation,
        clinical_pearl: question.clinicalPearl,
        tags: question.tags,
        status: "published",
        topic: question.topic,
        body_system: question.category,
        tier: "allied",
      };

      const placeholders: string[] = [];
      for (const column of insertColumns) {
        placeholders.push(`$${parameter++}`);
        values.push(valueForColumn(columns.get(column), record[column]));
      }
      rows.push(`(${placeholders.join(", ")})`);
    }

    const result = await pool.query(
      `INSERT INTO allied_questions (${insertColumns.join(", ")})
       VALUES ${rows.join(", ")}
       ON CONFLICT DO NOTHING`,
      values,
    );
    inserted += result.rowCount ?? 0;
  }

  const count = await pool.query(
    `SELECT COUNT(*)::int AS count
       FROM allied_questions
      WHERE blueprint_id LIKE 'allied-q-%'`,
  );
  return { inserted, total: count.rows[0]?.count ?? 0, optionalColumns };
}

async function main() {
  assertAlliedAuthoredEstate();

  console.log(
    JSON.stringify({
      phase: "source-verification",
      topics: alliedAuthoredTopics.length,
      lessons: alliedAuthoredLessons.length,
      questions: alliedAuthoredQuestions.length,
    }),
  );

  const lessons = await seedLessons();
  const questions = await seedQuestions();

  if (lessons.total < 500) {
    throw new Error(`Database Allied authored lesson floor failed after seed: ${lessons.total} < 500`);
  }
  if (questions.total < 10_000) {
    throw new Error(`Database Allied authored question floor failed after seed: ${questions.total} < 10000`);
  }

  console.log(
    JSON.stringify(
      {
        type: "allied_authored_estate_seed_verification",
        success: true,
        topics: alliedAuthoredTopics.length,
        sourceLessons: alliedAuthoredLessons.length,
        sourceQuestions: alliedAuthoredQuestions.length,
        lessonsInsertedOrUpdatedThisRun: lessons.insertedOrUpdated,
        authoredLessonsInDatabase: lessons.total,
        questionsInsertedThisRun: questions.inserted,
        authoredQuestionsInDatabase: questions.total,
        optionalQuestionColumnsPersisted: questions.optionalColumns,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error("[AlliedAuthoredEstate] fatal", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await pool.end();
    } catch {}
  });
