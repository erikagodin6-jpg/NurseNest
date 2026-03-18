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
  examTag?: string;
  importFn: () => Promise<CareerQuestionInput[]>;
}

const SEED_CONFIGS: SeedConfig[] = [
  {
    careerType: "occupationalTherapy",
    examTag: "NBCOT COTA",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/ota-questions").then(m => m.otaQuestions),
        import("../../client/src/data/career-questions/ota-questions-expansion").then(m => m.otaQuestionsExpansion),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "occupationalTherapyAssistant",
    examTag: "NBCOT COTA",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/ota-questions").then(m => m.otaQuestions),
        import("../../client/src/data/career-questions/ota-questions-batch2").then(m => m.otaQuestionsBatch2),
        import("../../client/src/data/career-questions/ota-questions-batch3").then(m => m.otaQuestionsBatch3),
        import("../../client/src/data/career-questions/ota-questions-batch4").then(m => m.otaQuestionsBatch4),
        import("../../client/src/data/career-questions/ota-questions-batch5").then(m => m.otaQuestionsBatch5),
        import("../../client/src/data/career-questions/ota-questions-batch6").then(m => m.otaQuestionsBatch6),
        import("../../client/src/data/career-questions/ota-questions-batch7").then(m => m.otaQuestionsBatch7),
        import("../../client/src/data/career-questions/ota-questions-batch8").then(m => m.otaQuestionsBatch8),
        import("../../client/src/data/career-questions/ota-questions-batch9").then(m => m.otaQuestionsBatch9),
        import("../../client/src/data/career-questions/ota-questions-batch10").then(m => m.otaQuestionsBatch10),
        import("../../client/src/data/career-questions/ota-questions-batch11").then(m => m.otaQuestionsBatch11),
        import("../../client/src/data/career-questions/ota-questions-batch12").then(m => m.otaQuestionsBatch12),
        import("../../client/src/data/career-questions/ota-questions-batch13").then(m => m.otaQuestionsBatch13),
        import("../../client/src/data/career-questions/ota-questions-batch14").then(m => m.otaQuestionsBatch14),
        import("../../client/src/data/career-questions/ota-questions-batch15").then(m => m.otaQuestionsBatch15),
        import("../../client/src/data/career-questions/ota-questions-expansion").then(m => m.otaQuestionsExpansion),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "physicalTherapy",
    examTag: "FSBPT PTA",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/pta-questions").then(m => m.ptaQuestions),
        import("../../client/src/data/career-questions/pta-questions-expansion").then(m => m.ptaQuestionsExpansion),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "physiotherapyAssistant",
    examTag: "FSBPT PTA",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/pta-questions").then(m => m.ptaQuestions),
        import("../../client/src/data/career-questions/pta-questions-batch1").then(m => m.ptaQuestionsBatch1),
        import("../../client/src/data/career-questions/pta-questions-batch2").then(m => m.ptaQuestionsBatch2),
        import("../../client/src/data/career-questions/pta-questions-batch3").then(m => m.ptaQuestionsBatch3),
        import("../../client/src/data/career-questions/pta-questions-batch4").then(m => m.ptaQuestionsBatch4),
        import("../../client/src/data/career-questions/pta-questions-batch5").then(m => m.ptaQuestionsBatch5),
        import("../../client/src/data/career-questions/pta-questions-batch6").then(m => m.ptaQuestionsBatch6),
        import("../../client/src/data/career-questions/pta-questions-batch7").then(m => m.ptaQuestionsBatch7),
        import("../../client/src/data/career-questions/pta-questions-batch8").then(m => m.ptaQuestionsBatch8),
        import("../../client/src/data/career-questions/pta-questions-batch9").then(m => m.ptaQuestionsBatch9),
        import("../../client/src/data/career-questions/pta-questions-batch10").then(m => m.ptaQuestionsBatch10),
        import("../../client/src/data/career-questions/pta-questions-batch11").then(m => m.ptaQuestionsBatch11),
        import("../../client/src/data/career-questions/pta-questions-batch12").then(m => m.ptaQuestionsBatch12),
        import("../../client/src/data/career-questions/pta-questions-batch13").then(m => m.ptaQuestionsBatch13),
        import("../../client/src/data/career-questions/pta-questions-batch14").then(m => m.ptaQuestionsBatch14),
        import("../../client/src/data/career-questions/pta-questions-batch15").then(m => m.ptaQuestionsBatch15),
        import("../../client/src/data/career-questions/pta-questions-batch16").then(m => m.ptaQuestionsBatch16),
        import("../../client/src/data/career-questions/pta-questions-batch17").then(m => m.ptaQuestionsBatch17),
        import("../../client/src/data/career-questions/pta-questions-batch18").then(m => m.ptaQuestionsBatch18),
        import("../../client/src/data/career-questions/pta-questions-batch19").then(m => m.ptaQuestionsBatch19),
        import("../../client/src/data/career-questions/pta-questions-batch20").then(m => m.ptaQuestionsBatch20),
        import("../../client/src/data/career-questions/pta-questions-batch21").then(m => m.ptaQuestionsBatch21),
        import("../../client/src/data/career-questions/pta-questions-batch22").then(m => m.ptaQuestionsBatch22),
        import("../../client/src/data/career-questions/pta-questions-batch23").then(m => m.ptaQuestionsBatch23),
        import("../../client/src/data/career-questions/pta-questions-batch24").then(m => m.ptaQuestionsBatch24),
        import("../../client/src/data/career-questions/pta-questions-batch25").then(m => m.ptaQuestionsBatch25),
        import("../../client/src/data/career-questions/pta-questions-batch26").then(m => m.ptaQuestionsBatch26),
        import("../../client/src/data/career-questions/pta-questions-batch27").then(m => m.ptaQuestionsBatch27),
        import("../../client/src/data/career-questions/pta-questions-batch28").then(m => m.ptaQuestionsBatch28),
        import("../../client/src/data/career-questions/pta-questions-batch29").then(m => m.ptaQuestionsBatch29),
        import("../../client/src/data/career-questions/pta-questions-batch30").then(m => m.ptaQuestionsBatch30),
        import("../../client/src/data/career-questions/pta-questions-batch31").then(m => m.ptaQuestionsBatch31),
        import("../../client/src/data/career-questions/pta-questions-batch32").then(m => m.ptaQuestionsBatch32),
        import("../../client/src/data/career-questions/pta-questions-batch33").then(m => m.ptaQuestionsBatch33),
        import("../../client/src/data/career-questions/pta-questions-batch34").then(m => m.ptaQuestionsBatch34),
        import("../../client/src/data/career-questions/pta-questions-batch35").then(m => m.ptaQuestionsBatch35),
        import("../../client/src/data/career-questions/pta-questions-expansion").then(m => m.ptaQuestionsExpansion),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "healthInfoMgmt",
    examTag: "AHIMA RHIT",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/him-questions").then(m => m.himQuestions),
        import("../../client/src/data/career-questions/him-questions-batch2").then(m => m.himQuestionsBatch2),
        import("../../client/src/data/career-questions/him-questions-batch3").then(m => m.himQuestionsBatch3),
        import("../../client/src/data/career-questions/him-questions-batch4").then(m => m.himQuestionsBatch4),
        import("../../client/src/data/career-questions/him-questions-batch5").then(m => m.himQuestionsBatch5),
        import("../../client/src/data/career-questions/him-questions-batch6").then(m => m.himQuestionsBatch6),
        import("../../client/src/data/career-questions/him-questions-batch7").then(m => m.himQuestionsBatch7),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "surgicalTechnologist",
    examTag: "NBSTSA CST",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/surgical-technologist-questions").then(m => m.surgicalTechnologistQuestions),
        import("../../client/src/data/career-questions/surgical-technologist-questions-2").then(m => m.surgicalTechnologistQuestionsPart2),
        import("../../client/src/data/career-questions/surgical-technologist-questions-3").then(m => m.surgicalTechnologistQuestionsPart3),
        import("../../client/src/data/career-questions/surgical-technologist-questions-4").then(m => m.surgicalTechnologistQuestionsPart4),
        import("../../client/src/data/career-questions/surgical-technologist-questions-5").then(m => m.surgicalTechnologistQuestionsPart5),
        import("../../client/src/data/career-questions/surgical-technologist-questions-6").then(m => m.surgicalTechnologistQuestionsPart6),
        import("../../client/src/data/career-questions/surgical-technologist-questions-7").then(m => m.surgicalTechnologistQuestionsPart7),
        import("../../client/src/data/career-questions/surgical-technologist-questions-8").then(m => m.surgicalTechnologistQuestionsPart8),
        import("../../client/src/data/career-questions/surgical-technologist-questions-9").then(m => m.surgicalTechnologistQuestionsPart9),
        import("../../client/src/data/career-questions/surgical-technologist-questions-10").then(m => m.surgicalTechnologistQuestionsPart10),
        import("../../client/src/data/career-questions/surgical-technologist-questions-11").then(m => m.surgicalTechnologistQuestionsPart11),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "diagnosticSonography",
    examTag: "ARDMS SPI",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/sonography-questions").then(m => m.sonographyQuestions),
        import("../../client/src/data/career-questions/sonography-questions-batch2").then(m => m.sonographyQuestionsBatch2),
        import("../../client/src/data/career-questions/sonography-questions-batch3").then(m => m.sonographyQuestionsBatch3),
        import("../../client/src/data/career-questions/sonography-questions-batch4").then(m => m.sonographyQuestionsBatch4),
        import("../../client/src/data/career-questions/sonography-questions-batch5").then(m => m.sonographyQuestionsBatch5),
        import("../../client/src/data/career-questions/sonography-questions-batch6").then(m => m.sonographyQuestionsBatch6),
        import("../../client/src/data/career-questions/sonography-questions-batch7").then(m => m.sonographyQuestionsBatch7),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "cardiacSonographer",
    examTag: "ARDMS RDCS",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/cardiac-sonographer-questions").then(m => m.cardiacSonographerQuestions),
        import("../../client/src/data/career-questions/cardiac-sonographer-questions-batch2").then(m => m.cardiacSonographerQuestionsBatch2),
        import("../../client/src/data/career-questions/cardiac-sonographer-questions-batch3").then(m => m.cardiacSonographerQuestionsBatch3),
        import("../../client/src/data/career-questions/cardiac-sonographer-questions-batch4").then(m => m.cardiacSonographerQuestionsBatch4),
        import("../../client/src/data/career-questions/cardiac-sonographer-questions-batch5").then(m => m.cardiacSonographerQuestionsBatch5),
        import("../../client/src/data/career-questions/cardiac-sonographer-questions-batch6").then(m => m.cardiacSonographerQuestionsBatch6),
        import("../../client/src/data/career-questions/cardiac-sonographer-questions-batch7").then(m => m.cardiacSonographerQuestionsBatch7),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "psychotherapist",
    examTag: "RP Qualifying",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/psychotherapist-questions").then(m => m.psychotherapistQuestions),
        import("../../client/src/data/career-questions/psychotherapist-questions-batch2").then(m => m.psychotherapistQuestionsBatch2),
        import("../../client/src/data/career-questions/psychotherapist-questions-batch3").then(m => m.psychotherapistQuestionsBatch3),
        import("../../client/src/data/career-questions/psychotherapist-questions-batch4").then(m => m.psychotherapistQuestionsBatch4),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "addictionsCounsellor",
    examTag: "IC&RC CAC",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/addictions-counsellor-questions").then(m => m.addictionsCounsellorQuestions),
        import("../../client/src/data/career-questions/addictions-counsellor-questions-batch2").then(m => m.addictionsCounsellorQuestionsBatch2),
        import("../../client/src/data/career-questions/addictions-counsellor-questions-batch3").then(m => m.addictionsCounsellorQuestionsBatch3),
        import("../../client/src/data/career-questions/addictions-counsellor-questions-batch4").then(m => m.addictionsCounsellorQuestionsBatch4),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "imaging",
    examTag: "ARRT Radiography",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/imaging-questions").then(m => m.imagingQuestions),
        import("../../client/src/data/career-questions/imaging-questions-expansion").then(m => m.imagingQuestionsExpansion),
        import("../../client/src/data/career-questions/imaging-questions-batch2").then(m => m.imagingQuestionsBatch2),
        import("../../client/src/data/career-questions/imaging-questions-batch3").then(m => m.imagingQuestionsBatch3),
        import("../../client/src/data/career-questions/imaging-questions-batch4").then(m => m.imagingQuestionsBatch4),
        import("../../client/src/data/career-questions/imaging-questions-batch5").then(m => m.imagingQuestionsBatch5),
        import("../../client/src/data/career-questions/imaging-questions-batch6").then(m => m.imagingQuestionsBatch6),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "rrt",
    examTag: "NBRC TMC/CSE",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/rrt-questions").then(m => m.rrtQuestions),
        import("../../client/src/data/career-questions/rrt-questions-batch1").then(m => m.rrtQuestionsBatch1),
        import("../../client/src/data/career-questions/rrt-questions-batch2").then(m => m.rrtQuestionsBatch2),
        import("../../client/src/data/career-questions/rrt-questions-batch3").then(m => m.rrtQuestionsBatch3),
        import("../../client/src/data/career-questions/rrt-questions-batch4").then(m => m.rrtQuestionsBatch4),
        import("../../client/src/data/career-questions/rrt-questions-batch5").then(m => m.rrtQuestionsBatch5),
        import("../../client/src/data/career-questions/rrt-questions-batch6").then(m => m.rrtQuestionsBatch6),
        import("../../client/src/data/career-questions/rrt-questions-batch7").then(m => m.rrtQuestionsBatch7),
        import("../../client/src/data/career-questions/rrt-questions-batch8").then(m => m.rrtQuestionsBatch8),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "paramedic",
    examTag: "NREMT Paramedic",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/paramedic-questions").then(m => m.paramedicQuestions),
        import("../../client/src/data/career-questions/paramedic-questions-expansion").then(m => m.paramedicQuestionsExpansion),
        import("../../client/src/data/career-questions/paramedic-questions-batch2").then(m => m.paramedicQuestionsBatch2),
        import("../../client/src/data/career-questions/paramedic-questions-batch3").then(m => m.paramedicQuestionsBatch3),
        import("../../client/src/data/career-questions/paramedic-questions-batch4").then(m => m.paramedicQuestionsBatch4),
        import("../../client/src/data/career-questions/paramedic-questions-batch5").then(m => m.paramedicQuestionsBatch5),
        import("../../client/src/data/career-questions/paramedic-questions-batch6").then(m => m.paramedicQuestionsBatch6),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "pharmacyTech",
    examTag: "PTCB CPHT",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/pharmacy-tech-questions").then(m => m.pharmacyTechQuestions),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch2").then(m => m.pharmacyTechQuestionsBatch2),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch3").then(m => m.pharmacyTechQuestionsBatch3),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch4").then(m => m.pharmacyTechQuestionsBatch4 as any),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch5").then(m => m.pharmacyTechQuestionsBatch5),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch6").then(m => m.pharmacyTechQuestionsBatch6),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch7").then(m => m.pharmacyTechQuestionsBatch7),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch8").then(m => m.pharmacyTechQuestionsBatch8),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-batch9").then(m => m.pharmacyTechQuestionsBatch9),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-extended").then(m => m.pharmacyTechQuestionsExtended),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-pebc").then(m => m.pharmacyTechQuestionsPEBC as any),
        import("../../client/src/data/career-questions/pharmacy-tech-questions-expansion").then(m => m.pharmacyTechQuestionsExpansion),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "mlt",
    examTag: "ASCP MLT",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/mlt-questions").then(m => m.mltQuestions),
        import("../../client/src/data/career-questions/mlt-questions-batch2").then(m => m.mltQuestionsBatch2),
        import("../../client/src/data/career-questions/mlt-questions-expansion").then(m => m.mltQuestionsExpansion),
        import("../../client/src/data/career-questions/mlt-questions-batch3").then(m => m.mltQuestionsBatch3),
        import("../../client/src/data/career-questions/mlt-questions-batch4").then(m => m.mltQuestionsBatch4),
        import("../../client/src/data/career-questions/mlt-questions-batch5").then(m => m.mltQuestionsBatch5),
        import("../../client/src/data/career-questions/mlt-questions-batch6").then(m => m.mltQuestionsBatch6),
        import("../../client/src/data/career-questions/mlt-questions-batch7").then(m => m.mltQuestionsBatch7),
      ]);
      return parts.flat();
    },
  },
  {
    careerType: "socialWorker",
    examTag: "ASWB Clinical",
    importFn: async () => {
      const parts = await Promise.all([
        import("../../client/src/data/career-questions/social-worker-questions").then(m => m.socialWorkerQuestions),
        import("../../client/src/data/career-questions/social-worker-questions-batch2").then(m => m.socialWorkerQuestionsBatch2),
        import("../../client/src/data/career-questions/social-worker-questions-batch3").then(m => m.socialWorkerQuestionsBatch3),
        import("../../client/src/data/career-questions/social-worker-questions-batch4").then(m => m.socialWorkerQuestionsBatch4),
        import("../../client/src/data/career-questions/social-worker-questions-batch5").then(m => m.socialWorkerQuestionsBatch5),
        import("../../client/src/data/career-questions/social-worker-questions-batch6").then(m => m.socialWorkerQuestionsBatch6),
        import("../../client/src/data/career-questions/social-worker-questions-batch7").then(m => m.socialWorkerQuestionsBatch7),
        import("../../client/src/data/career-questions/social-worker-questions-batch8").then(m => m.socialWorkerQuestionsBatch8),
        import("../../client/src/data/career-questions/social-worker-questions-batch9").then(m => m.socialWorkerQuestionsBatch9),
        import("../../client/src/data/career-questions/social-worker-questions-batch10").then(m => m.socialWorkerQuestionsBatch10),
        import("../../client/src/data/career-questions/social-worker-questions-batch11").then(m => m.socialWorkerQuestionsBatch11),
        import("../../client/src/data/career-questions/social-worker-questions-batch12").then(m => m.socialWorkerQuestionsBatch12),
        import("../../client/src/data/career-questions/social-worker-questions-batch13").then(m => m.socialWorkerQuestionsBatch13),
        import("../../client/src/data/career-questions/social-worker-questions-batch14").then(m => m.socialWorkerQuestionsBatch14),
        import("../../client/src/data/career-questions/social-worker-questions-batch15").then(m => m.socialWorkerQuestionsBatch15),
        import("../../client/src/data/career-questions/social-worker-questions-batch16").then(m => m.socialWorkerQuestionsBatch16),
        import("../../client/src/data/career-questions/social-worker-questions-batch17").then(m => m.socialWorkerQuestionsBatch17),
        import("../../client/src/data/career-questions/social-worker-questions-batch18").then(m => m.socialWorkerQuestionsBatch18),
        import("../../client/src/data/career-questions/social-worker-questions-batch19").then(m => m.socialWorkerQuestionsBatch19),
        import("../../client/src/data/career-questions/social-worker-questions-batch20").then(m => m.socialWorkerQuestionsBatch20),
        import("../../client/src/data/career-questions/social-worker-questions-batch21").then(m => m.socialWorkerQuestionsBatch21),
        import("../../client/src/data/career-questions/social-worker-questions-batch22").then(m => m.socialWorkerQuestionsBatch22),
        import("../../client/src/data/career-questions/social-worker-questions-batch23").then(m => m.socialWorkerQuestionsBatch23),
        import("../../client/src/data/career-questions/social-worker-questions-batch24").then(m => m.socialWorkerQuestionsBatch24),
        import("../../client/src/data/career-questions/social-worker-questions-batch25").then(m => m.socialWorkerQuestionsBatch25),
        import("../../client/src/data/career-questions/social-worker-questions-batch26").then(m => m.socialWorkerQuestionsBatch26),
        import("../../client/src/data/career-questions/social-worker-questions-batch27").then(m => m.socialWorkerQuestionsBatch27),
      ]);
      return parts.flat();
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
        const values: (string | number | null)[] = [];
        const placeholders: string[] = [];
        let paramIdx = 1;

        for (const q of batch) {
          placeholders.push(
            `($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++})`
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
            "multiple-choice",
            config.examTag || null
          );
        }

        await pool.query(
          `INSERT INTO allied_questions (career_type, blueprint_id, stem, options, correct_answer, rationale_long, learning_objective, blueprint_category, subtopic, difficulty, cognitive_level, question_type, exam_tag)
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
