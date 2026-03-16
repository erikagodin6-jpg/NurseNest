import type { Pool } from "pg";

interface CareerQuestionInput {
  id: string;
  stem: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  difficulty: number;
  category: string;
  topic: string;
}

interface SeedConfig {
  careerType: string;
  importFn: () => Promise<CareerQuestionInput[]>;
}

const SEED_CONFIGS: SeedConfig[] = [
  {
    careerType: "occupationalTherapy",
    importFn: async () => (await import("../../client/src/data/career-questions/ota-questions")).otaQuestions,
  },
  {
    careerType: "physicalTherapy",
    importFn: async () => (await import("../../client/src/data/career-questions/pta-questions")).ptaQuestions,
  },
  {
    careerType: "healthInfoMgmt",
    importFn: async () => (await import("../../client/src/data/career-questions/him-questions")).himQuestions,
  },
  {
    careerType: "surgicalTechnologist",
    importFn: async () => {
      const [p1, p2, p3, p4, p5, p6] = await Promise.all([
        import("../../client/src/data/career-questions/surgical-technologist-questions").then(m => m.surgicalTechnologistQuestions),
        import("../../client/src/data/career-questions/surgical-technologist-questions-2").then(m => m.surgicalTechnologistQuestionsPart2),
        import("../../client/src/data/career-questions/surgical-technologist-questions-3").then(m => m.surgicalTechnologistQuestionsPart3),
        import("../../client/src/data/career-questions/surgical-technologist-questions-4").then(m => m.surgicalTechnologistQuestionsPart4),
        import("../../client/src/data/career-questions/surgical-technologist-questions-5").then(m => m.surgicalTechnologistQuestionsPart5),
        import("../../client/src/data/career-questions/surgical-technologist-questions-6").then(m => m.surgicalTechnologistQuestionsPart6),
      ]);
      return [...p1, ...p2, ...p3, ...p4, ...p5, ...p6];
    },
  },
  {
    careerType: "diagnosticSonography",
    importFn: async () => (await import("../../client/src/data/career-questions/sonography-questions")).sonographyQuestions,
  },
  {
    careerType: "cardiacSonographer",
    importFn: async () => (await import("../../client/src/data/career-questions/cardiac-sonographer-questions")).cardiacSonographerQuestions,
  },
  {
    careerType: "imaging",
    importFn: async () => (await import("../../client/src/data/career-questions/imaging-questions")).imagingQuestions,
  },
  {
    careerType: "rrt",
    importFn: async () => {
      const [base, b1] = await Promise.all([
        import("../../client/src/data/career-questions/rrt-questions").then(m => m.rrtQuestions),
        import("../../client/src/data/career-questions/rrt-questions-batch1").then(m => m.rrtQuestionsBatch1),
      ]);
      return [...base, ...b1];
    },
  },
];

export async function seedAlliedHealthQuestions(pool: Pool): Promise<void> {
  for (const config of SEED_CONFIGS) {
    try {
      const existingCount = await pool.query(
        "SELECT COUNT(*)::int AS cnt FROM allied_questions WHERE career_type = $1",
        [config.careerType]
      );
      const dbCount = existingCount.rows[0].cnt as number;

      let questions: CareerQuestionInput[];
      try {
        questions = await config.importFn();
      } catch {
        console.log(`[AlliedSeed] Skipping ${config.careerType}: import failed`);
        continue;
      }

      if (dbCount >= questions.length) {
        console.log(`[AlliedSeed] ${config.careerType}: ${dbCount} questions in DB (>= ${questions.length} in source), skipping`);
        continue;
      }

      console.log(`[AlliedSeed] Seeding ${questions.length} questions for ${config.careerType}...`);

      const BATCH_SIZE = 50;
      let inserted = 0;

      for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        const batch = questions.slice(i, i + BATCH_SIZE);
        const values: (string | number)[] = [];
        const placeholders: string[] = [];
        let paramIdx = 1;

        for (const q of batch) {
          placeholders.push(
            `($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++})`
          );
          values.push(
            config.careerType,
            q.id,
            q.stem,
            JSON.stringify(q.options),
            q.correctIndex,
            q.rationale,
            q.rationale.split(".")[0] || "",
            q.category,
            q.topic,
            q.difficulty,
            "recall",
            "multiple-choice"
          );
        }

        await pool.query(
          `INSERT INTO allied_questions (career_type, blueprint_id, stem, options, correct_answer, rationale_long, learning_objective, blueprint_category, subtopic, difficulty, cognitive_level, question_type)
           VALUES ${placeholders.join(", ")}
           ON CONFLICT DO NOTHING`,
          values
        );
        inserted += batch.length;
      }

      console.log(`[AlliedSeed] ${config.careerType}: inserted up to ${inserted} questions`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[AlliedSeed] Error seeding ${config.careerType}:`, message);
    }
  }
}
