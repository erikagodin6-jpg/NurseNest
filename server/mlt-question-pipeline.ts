import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import {
  MLT_DISCIPLINES,
  MLT_SUBDISCIPLINES,
  MLT_CANADA_BLUEPRINT_CATEGORIES,
  MLT_USA_CONTENT_AREAS,
  MLT_DIFFICULTY_LEVELS,
  MLT_COGNITIVE_LEVELS,
} from "@shared/mlt-taxonomy";

const DISCIPLINE_WEIGHTS: Record<string, number> = {
  "Clinical Chemistry": 0.18,
  "Hematology": 0.16,
  "Microbiology": 0.14,
  "Immunohematology / Blood Banking": 0.10,
  "Hemostasis / Coagulation": 0.08,
  "Urinalysis & Body Fluids": 0.06,
  "Immunology / Serology": 0.06,
  "Molecular Diagnostics": 0.05,
  "Laboratory Operations & Quality Management": 0.05,
  "Phlebotomy & Specimen Collection": 0.04,
  "Point-of-Care Testing": 0.03,
  "Histotechnology": 0.02,
  "Cytotechnology": 0.01,
  "Mycology": 0.01,
  "Parasitology": 0.005,
  "Virology": 0.005,
};

const DIFFICULTY_DISTRIBUTION = {
  easy: 0.20,
  medium: 0.45,
  hard: 0.25,
  very_hard: 0.10,
};

const COGNITIVE_DISTRIBUTION = {
  recall: 0.35,
  application: 0.45,
  analysis: 0.20,
};

const SIMILARITY_THRESHOLD = 0.70;

function resolveCountryTag(discipline: string, countryTrack: "canada" | "usa" | "both"): string {
  if (countryTrack === "canada") {
    const cat = MLT_CANADA_BLUEPRINT_CATEGORIES.find((c) => c.disciplines.includes(discipline as any));
    return `${cat?.name || discipline} [canada/csmls]`;
  } else if (countryTrack === "usa") {
    const area = MLT_USA_CONTENT_AREAS.find((c) => c.disciplines.includes(discipline as any));
    return `${area?.name || discipline} [usa/ascp]`;
  }
  return `${discipline} [both]`;
}

async function getOpenAI() {
  const OpenAI = (await import("openai")).default;
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function jaccardSimilarity(a: string, b: string): number {
  const wordsA = new Set(normalizeText(a).split(" "));
  const wordsB = new Set(normalizeText(b).split(" "));
  const intersection = new Set([...wordsA].filter((w) => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function mapDifficultyToNumber(diff: string): number {
  switch (diff) {
    case "easy": return 2;
    case "medium": return 3;
    case "hard": return 4;
    case "very_hard": return 5;
    default: return 3;
  }
}

function difficultyLabel(n: number): string {
  if (n <= 2) return "easy";
  if (n === 3) return "medium";
  if (n === 4) return "hard";
  return "very_hard";
}

interface GenerationRequest {
  discipline: string;
  countryTrack: "canada" | "usa" | "both";
  count: number;
  difficultyDistribution?: Record<string, number>;
  cognitiveDistribution?: Record<string, number>;
  subdiscipline?: string;
  model?: string;
}

interface GeneratedQuestion {
  stem: string;
  options: string[];
  correctAnswer: number;
  rationaleLong: string;
  discipline: string;
  subdiscipline: string;
  blueprintCategory: string;
  usaContentArea: string;
  difficulty: number;
  cognitiveLevel: string;
  tags: string[];
  seoKeywords: string[];
  countryTrack: string;
  learningObjective: string;
  examTrap: string;
  safetyNote: string;
  distractorRationales: string[];
  clinicalPearls: string[];
}

function buildMltPrompt(
  discipline: string,
  countryTrack: string,
  count: number,
  diffDist: Record<string, number>,
  cogDist: Record<string, number>,
  subdiscipline?: string
): { systemPrompt: string; userPrompt: string } {
  const subdisciplines = MLT_SUBDISCIPLINES[discipline] || [];
  const canadaCategory = MLT_CANADA_BLUEPRINT_CATEGORIES.find((c) =>
    c.disciplines.includes(discipline as any)
  );
  const usaArea = MLT_USA_CONTENT_AREAS.find((c) =>
    c.disciplines.includes(discipline as any)
  );

  const countryContext =
    countryTrack === "canada"
      ? `Focus on Canadian CSMLS certification exam content. Use Canadian spelling and terminology where applicable. Blueprint category: "${canadaCategory?.name || discipline}".`
      : countryTrack === "usa"
        ? `Focus on American ASCP Board of Certification exam content. Content area: "${usaArea?.name || discipline}".`
        : `Questions should be applicable to both Canadian CSMLS and American ASCP certification exams.`;

  const easyCount = Math.round(count * diffDist.easy);
  const mediumCount = Math.round(count * diffDist.medium);
  const hardCount = Math.round(count * diffDist.hard);
  const veryHardCount = count - easyCount - mediumCount - hardCount;

  const recallCount = Math.round(count * cogDist.recall);
  const applicationCount = Math.round(count * cogDist.application);
  const analysisCount = count - recallCount - applicationCount;

  const systemPrompt = `You are an expert Medical Laboratory Technologist (MLT/MLS) exam item writer with deep expertise in ${discipline}. You create CSMLS and ASCP Board of Certification-level exam questions that test real clinical laboratory knowledge.

${countryContext}

CRITICAL RULES:
- Every question MUST present a realistic laboratory scenario with specific patient data, specimen types, and test results
- NEVER use generic stems like "Which is the most appropriate action?" without clinical context
- NEVER use "all of the above" or "none of the above" as answer options
- All answer options must be plausible and commonly confused by students
- Each distractor must represent a real misconception or common error
- Rationales must explain the clinical/scientific reasoning, not just state the answer is correct
- Include specific lab values, reagent names, organism characteristics, and procedural details
- Questions must reflect current laboratory practice standards`;

  const userPrompt = `Generate exactly ${count} unique, high-quality MLT exam questions for the discipline: ${discipline}${subdiscipline ? ` (subtopic: ${subdiscipline})` : ""}.

SUBTOPICS TO COVER (spread questions across these): ${subdiscipline ? subdiscipline : subdisciplines.join(", ")}

DIFFICULTY DISTRIBUTION:
- Easy (difficulty 2, direct recall): ${easyCount} questions
- Medium (difficulty 3, straightforward application): ${mediumCount} questions
- Hard (difficulty 4, complex reasoning): ${hardCount} questions
- Very Hard (difficulty 5, multi-step analysis): ${veryHardCount > 0 ? veryHardCount : 1} questions

COGNITIVE LEVEL DISTRIBUTION:
- Recall (memorize facts, definitions, normal values): ${recallCount} questions
- Application (apply knowledge to standard lab scenarios): ${applicationCount} questions
- Analysis (interpret complex data, troubleshoot, correlate): ${analysisCount} questions

Return a JSON array where each question has this EXACT structure:
{
  "stem": "A 45-year-old patient's blood sample shows... [realistic clinical scenario with specific data]",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correctAnswer": 0,
  "rationaleLong": "Detailed rationale (minimum 150 words) explaining why the correct answer is right, why each distractor is wrong, the underlying science, and common exam pitfalls",
  "discipline": "${discipline}",
  "subdiscipline": "specific subtopic from the list above",
  "difficulty": 2-5,
  "cognitiveLevel": "recall|application|analysis",
  "tags": ["tag1", "tag2", "tag3"],
  "seoKeywords": ["keyword1", "keyword2"],
  "learningObjective": "What the student should know after answering this question",
  "examTrap": "How test writers try to trick students on this topic",
  "safetyNote": "Critical safety concern if applicable, or null",
  "distractorRationales": ["Why option A is wrong/right", "Why B...", "Why C...", "Why D..."],
  "clinicalPearls": ["Key clinical fact 1", "Key clinical fact 2"]
}

Return ONLY the JSON array, no other text.`;

  return { systemPrompt, userPrompt };
}

async function fetchExistingStems(): Promise<string[]> {
  const result = await pool.query(
    `SELECT stem FROM allied_questions WHERE career_type = 'mlt' AND status != 'archived'`
  );
  return result.rows.map((r: any) => r.stem);
}

function checkDuplicates(
  newStem: string,
  existingStems: string[],
  batchStems: string[]
): { isDuplicate: boolean; similarity: number; match: string } {
  for (const existing of existingStems) {
    const sim = jaccardSimilarity(newStem, existing);
    if (sim > SIMILARITY_THRESHOLD) {
      return { isDuplicate: true, similarity: sim, match: "existing_bank" };
    }
  }
  for (const batchStem of batchStems) {
    const sim = jaccardSimilarity(newStem, batchStem);
    if (sim > SIMILARITY_THRESHOLD) {
      return { isDuplicate: true, similarity: sim, match: "intra_batch" };
    }
  }
  return { isDuplicate: false, similarity: 0, match: "" };
}

function parseJsonFromAiResponse(text: string): any[] | null {
  try {
    const arrMatch = text.match(/\[[\s\S]*\]/);
    if (arrMatch) return JSON.parse(arrMatch[0]);
    return null;
  } catch {
    return null;
  }
}

function validateMltQuestion(q: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!q.stem || q.stem.length < 30) errors.push("stem_too_short");
  if (!q.options || !Array.isArray(q.options) || q.options.length < 4) errors.push("insufficient_options");
  if (q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer >= (q.options?.length || 4)) errors.push("invalid_correct_answer");
  if (!q.rationaleLong || q.rationaleLong.split(/\s+/).length < 50) errors.push("rationale_too_short");
  if (!q.discipline) errors.push("missing_discipline");
  if (!q.cognitiveLevel || !["recall", "application", "analysis"].includes(q.cognitiveLevel)) errors.push("invalid_cognitive_level");
  if (!q.difficulty || q.difficulty < 1 || q.difficulty > 5) errors.push("invalid_difficulty");

  const optionsText = (q.options || []).map((o: string) => (o || "").toLowerCase());
  if (optionsText.some((o: string) => o.includes("all of the above") || o.includes("none of the above"))) {
    errors.push("contains_all_none_of_the_above");
  }

  return { valid: errors.length === 0, errors };
}

async function generateQuestionBatch(
  req: GenerationRequest,
  existingStems: string[]
): Promise<{
  questions: GeneratedQuestion[];
  rejected: number;
  rejectionReasons: Record<string, number>;
  tokensUsed: number;
}> {
  const openai = await getOpenAI();
  const diffDist = req.difficultyDistribution || DIFFICULTY_DISTRIBUTION;
  const cogDist = req.cognitiveDistribution || COGNITIVE_DISTRIBUTION;

  const { systemPrompt, userPrompt } = buildMltPrompt(
    req.discipline,
    req.countryTrack,
    req.count,
    diffDist,
    cogDist,
    req.subdiscipline
  );

  const model = req.model || "gpt-4o-mini";
  const maxTokens = Math.min(Math.max(4000, req.count * 1200), 16000);

  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: maxTokens,
    temperature: 0.75,
  });

  const tokensUsed = response.usage?.total_tokens || 0;
  const content = response.choices[0]?.message?.content || "";
  const parsed = parseJsonFromAiResponse(content);

  if (!parsed || !Array.isArray(parsed)) {
    return { questions: [], rejected: 0, rejectionReasons: { parse_error: 1 }, tokensUsed };
  }

  const acceptedQuestions: GeneratedQuestion[] = [];
  let rejected = 0;
  const rejectionReasons: Record<string, number> = {};
  const batchStems: string[] = [];

  const canadaCategory = MLT_CANADA_BLUEPRINT_CATEGORIES.find((c) =>
    c.disciplines.includes(req.discipline as any)
  );
  const usaArea = MLT_USA_CONTENT_AREAS.find((c) =>
    c.disciplines.includes(req.discipline as any)
  );

  for (const q of parsed) {
    const validation = validateMltQuestion(q);
    if (!validation.valid) {
      rejected++;
      for (const err of validation.errors) {
        rejectionReasons[err] = (rejectionReasons[err] || 0) + 1;
      }
      continue;
    }

    const dupCheck = checkDuplicates(q.stem, existingStems, batchStems);
    if (dupCheck.isDuplicate) {
      rejected++;
      rejectionReasons[`duplicate_${dupCheck.match}`] = (rejectionReasons[`duplicate_${dupCheck.match}`] || 0) + 1;
      continue;
    }

    batchStems.push(q.stem);
    existingStems.push(q.stem);

    acceptedQuestions.push({
      stem: q.stem,
      options: q.options.slice(0, 4),
      correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
      rationaleLong: q.rationaleLong || q.rationale || "",
      discipline: q.discipline || req.discipline,
      subdiscipline: q.subdiscipline || q.subtopic || "",
      blueprintCategory: canadaCategory?.name || req.discipline,
      usaContentArea: usaArea?.name || req.discipline,
      difficulty: q.difficulty || 3,
      cognitiveLevel: q.cognitiveLevel || "application",
      tags: q.tags || [],
      seoKeywords: q.seoKeywords || [],
      countryTrack: req.countryTrack,
      learningObjective: q.learningObjective || "",
      examTrap: q.examTrap || "",
      safetyNote: q.safetyNote || null,
      distractorRationales: q.distractorRationales || [],
      clinicalPearls: q.clinicalPearls || [],
    });
  }

  return { questions: acceptedQuestions, rejected, rejectionReasons, tokensUsed };
}

function planDisciplineDistribution(
  totalCount: number,
  countryTrack: string,
  disciplineOverride?: string
): Array<{ discipline: string; count: number }> {
  if (disciplineOverride) {
    return [{ discipline: disciplineOverride, count: totalCount }];
  }

  const plan: Array<{ discipline: string; count: number }> = [];
  let remaining = totalCount;

  const weights = { ...DISCIPLINE_WEIGHTS };
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  for (const [discipline, weight] of Object.entries(weights)) {
    const normalizedWeight = weight / totalWeight;
    const target = Math.max(1, Math.round(totalCount * normalizedWeight));
    if (remaining > 0) {
      const count = Math.min(target, remaining);
      plan.push({ discipline, count });
      remaining -= count;
    }
    if (remaining <= 0) break;
  }

  if (remaining > 0 && plan.length > 0) {
    plan[0].count += remaining;
  }

  return plan;
}

function resolveBlueprint(discipline: string, countryTrack: "canada" | "usa" | "both"): string {
  if (countryTrack === "canada") {
    const cat = MLT_CANADA_BLUEPRINT_CATEGORIES.find((c) => c.disciplines.includes(discipline as any));
    return cat?.name || discipline;
  } else if (countryTrack === "usa") {
    const area = MLT_USA_CONTENT_AREAS.find((c) => c.disciplines.includes(discipline as any));
    return area?.name || discipline;
  }
  return discipline;
}

function toImportReadyFormat(q: GeneratedQuestion, countryTrack: "canada" | "usa" | "both"): Record<string, any> {
  const options = q.options.slice(0, 4);
  const correctAnswer = q.correctAnswer >= options.length ? 0 : q.correctAnswer;

  return {
    stem: q.stem,
    options,
    correctAnswer,
    rationaleLong: q.rationaleLong,
    blueprintCategory: q.discipline,
    subtopic: `${q.subdiscipline || q.discipline} ${resolveCountryTag(q.discipline, countryTrack)}`,
    discipline: q.discipline,
    subdiscipline: q.subdiscipline || "",
    canadaBlueprintCategory: q.blueprintCategory,
    usaContentArea: q.usaContentArea,
    difficulty: q.difficulty,
    cognitiveLevel: q.cognitiveLevel,
    questionType: "mcq",
    learningObjective: q.learningObjective || "",
    examTrap: q.examTrap || null,
    clinicalPearls: q.clinicalPearls || [],
    safetyNote: q.safetyNote || null,
    distractorRationales: (q.distractorRationales || []).slice(0, 4),
    seoKeywords: q.seoKeywords || [],
    tags: q.tags || [],
  };
}

async function runMltBatchGeneration(params: {
  countryTrack: "canada" | "usa" | "both";
  totalCount: number;
  discipline?: string;
  subdiscipline?: string;
  difficultyDistribution?: Record<string, number>;
  cognitiveDistribution?: Record<string, number>;
  model?: string;
  dryRun?: boolean;
  triggeredBy: string;
}): Promise<{
  batchId: string;
  totalGenerated: number;
  totalAccepted: number;
  totalRejected: number;
  tokensUsed: number;
  disciplineBreakdown: Record<string, number>;
  difficultyBreakdown: Record<string, number>;
  cognitiveBreakdown: Record<string, number>;
  rejectionReasons: Record<string, number>;
  previewQuestions: any[];
  importReadyQuestions: Record<string, any>[];
}> {
  const batchRes = await pool.query(
    `INSERT INTO mlt_generation_batches (country_track, requested_count, discipline, status, triggered_by, created_at)
     VALUES ($1, $2, $3, 'running', $4, NOW()) RETURNING id`,
    [params.countryTrack, params.totalCount, params.discipline || "multi", params.triggeredBy]
  );
  const batchId = batchRes.rows[0].id;

  try {
    const existingStems = await fetchExistingStems();
    const plan = planDisciplineDistribution(params.totalCount, params.countryTrack, params.discipline);

    let allQuestions: GeneratedQuestion[] = [];
    let totalRejected = 0;
    let totalTokens = 0;
    const allRejectionReasons: Record<string, number> = {};

    for (const chunk of plan) {
      const chunkSize = Math.min(chunk.count, 15);
      const iterations = Math.ceil(chunk.count / chunkSize);

      for (let i = 0; i < iterations; i++) {
        const remaining = chunk.count - (i * chunkSize);
        const thisCount = Math.min(chunkSize, remaining);
        if (thisCount <= 0) break;

        const result = await generateQuestionBatch(
          {
            discipline: chunk.discipline,
            countryTrack: params.countryTrack,
            count: thisCount,
            difficultyDistribution: params.difficultyDistribution,
            cognitiveDistribution: params.cognitiveDistribution,
            subdiscipline: params.subdiscipline,
            model: params.model,
          },
          existingStems
        );

        allQuestions = allQuestions.concat(result.questions);
        totalRejected += result.rejected;
        totalTokens += result.tokensUsed;
        for (const [reason, count] of Object.entries(result.rejectionReasons)) {
          allRejectionReasons[reason] = (allRejectionReasons[reason] || 0) + count;
        }
      }
    }

    const disciplineBreakdown: Record<string, number> = {};
    const difficultyBreakdown: Record<string, number> = {};
    const cognitiveBreakdown: Record<string, number> = {};

    for (const q of allQuestions) {
      disciplineBreakdown[q.discipline] = (disciplineBreakdown[q.discipline] || 0) + 1;
      const dLabel = difficultyLabel(q.difficulty);
      difficultyBreakdown[dLabel] = (difficultyBreakdown[dLabel] || 0) + 1;
      cognitiveBreakdown[q.cognitiveLevel] = (cognitiveBreakdown[q.cognitiveLevel] || 0) + 1;
    }

    const importReadyQuestions = allQuestions.map((q) => toImportReadyFormat(q, params.countryTrack));

    if (!params.dryRun) {
      const importedIds: string[] = [];
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        for (const q of importReadyQuestions) {
          const result = await client.query(
            `INSERT INTO allied_questions (
              id, career_type, stem, options, correct_answer, rationale_long,
              learning_objective, blueprint_category, subtopic, difficulty,
              cognitive_level, question_type, exam_trap, clinical_pearls,
              safety_note, distractor_rationales, is_free, status,
              batch_id, created_at
            ) VALUES (
              gen_random_uuid(), 'mlt', $1, $2, $3, $4,
              $5, $6, $7, $8,
              $9, 'mcq', $10, $11,
              $12, $13, false, 'draft',
              $14, NOW()
            ) RETURNING id`,
            [
              q.stem, JSON.stringify(q.options), q.correctAnswer, q.rationaleLong,
              q.learningObjective, q.blueprintCategory, q.subtopic, q.difficulty,
              q.cognitiveLevel, q.examTrap || null, JSON.stringify(q.clinicalPearls || []),
              q.safetyNote || null, JSON.stringify(q.distractorRationales || []),
              batchId,
            ]
          );
          importedIds.push(result.rows[0].id);
        }
        await client.query("COMMIT");
      } catch (txErr) {
        await client.query("ROLLBACK");
        throw txErr;
      } finally {
        client.release();
      }

      await pool.query(
        `INSERT INTO mlt_import_history (id, import_type, file_name, total_rows, success_count, error_count, warning_count, duplicate_count, imported_ids, errors, warnings, imported_by, created_at)
         VALUES (gen_random_uuid(), 'pipeline', $1, $2, $3, $4, 0, $5, $6, $7, '[]', $8, NOW())`,
        [
          `pipeline-batch-${batchId}`,
          allQuestions.length + totalRejected,
          allQuestions.length,
          0,
          totalRejected,
          JSON.stringify(importedIds),
          JSON.stringify(Object.entries(allRejectionReasons).map(([k, v]) => `${k}: ${v}`)),
          params.triggeredBy,
        ]
      );
    }

    await pool.query(
      `UPDATE mlt_generation_batches SET
        status = 'completed', generated_count = $1, accepted_count = $2,
        rejected_count = $3, tokens_used = $4,
        discipline_breakdown = $5, difficulty_breakdown = $6,
        cognitive_breakdown = $7, rejection_reasons = $8,
        completed_at = NOW()
       WHERE id = $9`,
      [
        allQuestions.length + totalRejected, allQuestions.length,
        totalRejected, totalTokens,
        JSON.stringify(disciplineBreakdown), JSON.stringify(difficultyBreakdown),
        JSON.stringify(cognitiveBreakdown), JSON.stringify(allRejectionReasons),
        batchId,
      ]
    );

    const previewQuestions = allQuestions.slice(0, 5).map((q) => ({
      stem: q.stem.substring(0, 200),
      discipline: q.discipline,
      subdiscipline: q.subdiscipline,
      difficulty: q.difficulty,
      cognitiveLevel: q.cognitiveLevel,
      countryTrack: q.countryTrack,
      rationaleWords: q.rationaleLong.split(/\s+/).length,
    }));

    return {
      batchId,
      totalGenerated: allQuestions.length + totalRejected,
      totalAccepted: allQuestions.length,
      totalRejected,
      tokensUsed: totalTokens,
      disciplineBreakdown,
      difficultyBreakdown,
      cognitiveBreakdown,
      rejectionReasons: allRejectionReasons,
      previewQuestions,
      importReadyQuestions: params.dryRun ? importReadyQuestions : [],
    };
  } catch (err: any) {
    await pool.query(
      `UPDATE mlt_generation_batches SET status = 'failed', error_message = $1, completed_at = NOW() WHERE id = $2`,
      [err.message || "Unknown error", batchId]
    );
    throw err;
  }
}

async function ensureMltPipelineTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mlt_generation_batches (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      country_track TEXT NOT NULL DEFAULT 'both',
      requested_count INTEGER NOT NULL,
      generated_count INTEGER DEFAULT 0,
      accepted_count INTEGER DEFAULT 0,
      rejected_count INTEGER DEFAULT 0,
      tokens_used INTEGER DEFAULT 0,
      discipline TEXT,
      discipline_breakdown JSONB,
      difficulty_breakdown JSONB,
      cognitive_breakdown JSONB,
      rejection_reasons JSONB,
      status TEXT DEFAULT 'running',
      error_message TEXT,
      triggered_by TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMP
    )
  `);
}

export function registerMltPipelineRoutes(app: Express) {
  ensureMltPipelineTables().catch((err) => console.error("Failed to ensure MLT pipeline tables:", err.message));

  app.post("/api/admin/mlt/pipeline/generate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const {
        countryTrack = "both",
        count = 50,
        discipline,
        subdiscipline,
        difficultyDistribution,
        cognitiveDistribution,
        model = "gpt-4o-mini",
        dryRun = false,
      } = req.body;

      if (count < 1 || count > 500) {
        return res.status(400).json({ error: "Count must be between 1 and 500" });
      }
      if (!["canada", "usa", "both"].includes(countryTrack)) {
        return res.status(400).json({ error: "countryTrack must be canada, usa, or both" });
      }
      if (discipline && !MLT_DISCIPLINES.includes(discipline)) {
        return res.status(400).json({ error: `Unknown discipline: ${discipline}` });
      }

      const BATCH_SIZE_MIN = 50;
      const BATCH_SIZE_MAX = 100;
      const batchSizes: number[] = [];
      let remaining = count;
      while (remaining > 0) {
        if (remaining <= BATCH_SIZE_MAX) {
          batchSizes.push(remaining);
          remaining = 0;
        } else if (remaining <= BATCH_SIZE_MAX + BATCH_SIZE_MIN) {
          const half = Math.ceil(remaining / 2);
          batchSizes.push(half);
          batchSizes.push(remaining - half);
          remaining = 0;
        } else {
          batchSizes.push(BATCH_SIZE_MAX);
          remaining -= BATCH_SIZE_MAX;
        }
      }

      const allResults: any[] = [];
      for (const batchSize of batchSizes) {
        const result = await runMltBatchGeneration({
          countryTrack,
          totalCount: batchSize,
          discipline,
          subdiscipline,
          difficultyDistribution: difficultyDistribution || DIFFICULTY_DISTRIBUTION,
          cognitiveDistribution: cognitiveDistribution || COGNITIVE_DISTRIBUTION,
          model,
          dryRun,
          triggeredBy: admin.id || "admin",
        });
        allResults.push(result);
      }

      if (allResults.length === 1) {
        res.json(allResults[0]);
      } else {
        const combined = {
          batchIds: allResults.map((r) => r.batchId),
          totalBatches: allResults.length,
          totalGenerated: allResults.reduce((s, r) => s + r.totalGenerated, 0),
          totalAccepted: allResults.reduce((s, r) => s + r.totalAccepted, 0),
          totalRejected: allResults.reduce((s, r) => s + r.totalRejected, 0),
          tokensUsed: allResults.reduce((s, r) => s + r.tokensUsed, 0),
          previewQuestions: allResults.flatMap((r) => r.previewQuestions).slice(0, 10),
          importReadyQuestions: dryRun ? allResults.flatMap((r) => r.importReadyQuestions) : [],
        };
        res.json(combined);
      }
    } catch (err: any) {
      console.error("[MLT Pipeline] Generation error:", err.message);
      res.status(500).json({ error: err.message || "Generation failed" });
    }
  });

  app.get("/api/admin/mlt/pipeline/batches", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await pool.query(
        `SELECT * FROM mlt_generation_batches ORDER BY created_at DESC LIMIT 50`
      );
      res.json(result.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/mlt/pipeline/batches/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await pool.query(
        `SELECT * FROM mlt_generation_batches WHERE id = $1`,
        [req.params.id]
      );
      if (!result.rows[0]) return res.status(404).json({ error: "Batch not found" });

      const questionsResult = await pool.query(
        `SELECT id, stem, blueprint_category, difficulty, cognitive_level, status, subtopic
         FROM allied_questions WHERE batch_id = $1 AND career_type = 'mlt' ORDER BY created_at`,
        [req.params.id]
      );

      res.json({
        batch: result.rows[0],
        questions: questionsResult.rows,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/mlt/pipeline/batches/:id/publish", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { status = "published" } = req.body;
      if (!["published", "draft"].includes(status)) {
        return res.status(400).json({ error: "Status must be published or draft" });
      }

      const result = await pool.query(
        `UPDATE allied_questions SET status = $1
         WHERE batch_id = $2 AND career_type = 'mlt' AND status = 'draft'
         RETURNING id`,
        [status, req.params.id]
      );

      res.json({ updated: result.rowCount });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/mlt/pipeline/batches/:id/rollback", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await pool.query(
        `DELETE FROM allied_questions WHERE batch_id = $1 AND career_type = 'mlt' RETURNING id`,
        [req.params.id]
      );

      await pool.query(
        `UPDATE mlt_generation_batches SET status = 'rolled_back' WHERE id = $1`,
        [req.params.id]
      );

      res.json({ deleted: result.rowCount });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/mlt/pipeline/dashboard", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const totalResult = await pool.query(
        `SELECT COUNT(*) as total,
                COUNT(*) FILTER (WHERE status = 'published') as published,
                COUNT(*) FILTER (WHERE status = 'draft') as draft,
                COUNT(*) FILTER (WHERE status = 'archived') as archived
         FROM allied_questions WHERE career_type = 'mlt'`
      );

      const disciplineResult = await pool.query(
        `SELECT blueprint_category as discipline,
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE status = 'published') as published,
                COUNT(*) FILTER (WHERE difficulty <= 2) as easy,
                COUNT(*) FILTER (WHERE difficulty = 3) as medium,
                COUNT(*) FILTER (WHERE difficulty = 4) as hard,
                COUNT(*) FILTER (WHERE difficulty >= 5) as very_hard,
                COUNT(*) FILTER (WHERE cognitive_level = 'recall') as recall,
                COUNT(*) FILTER (WHERE cognitive_level = 'application') as application,
                COUNT(*) FILTER (WHERE cognitive_level = 'analysis') as analysis
         FROM allied_questions WHERE career_type = 'mlt' AND status != 'archived'
         GROUP BY blueprint_category
         ORDER BY blueprint_category`
      );

      const countryResult = await pool.query(
        `SELECT
           CASE
             WHEN subtopic LIKE '%[canada/csmls]%' THEN 'canada'
             WHEN subtopic LIKE '%[usa/ascp]%' THEN 'usa'
             WHEN subtopic LIKE '%[both]%' THEN 'both'
             ELSE 'untagged'
           END as country_track,
           COUNT(*) as count
         FROM allied_questions WHERE career_type = 'mlt' AND status != 'archived'
         GROUP BY 1`
      );

      const totalQuestions = Number(totalResult.rows[0]?.total || 0);
      const targetTotal = 10000;

      const disciplineTargets = MLT_DISCIPLINES.map((d) => {
        const weight = DISCIPLINE_WEIGHTS[d] || 0.01;
        const target = Math.round(targetTotal * weight);
        const actual = disciplineResult.rows.find((r: any) => r.discipline === d);
        return {
          discipline: d,
          targetCount: target,
          targetPct: Math.round(weight * 100),
          actualCount: Number(actual?.total || 0),
          publishedCount: Number(actual?.published || 0),
          gap: target - Number(actual?.total || 0),
          difficulty: {
            easy: Number(actual?.easy || 0),
            medium: Number(actual?.medium || 0),
            hard: Number(actual?.hard || 0),
            very_hard: Number(actual?.very_hard || 0),
          },
          cognitive: {
            recall: Number(actual?.recall || 0),
            application: Number(actual?.application || 0),
            analysis: Number(actual?.analysis || 0),
          },
        };
      });

      const recentBatches = await pool.query(
        `SELECT id, country_track, requested_count, accepted_count, status, created_at
         FROM mlt_generation_batches ORDER BY created_at DESC LIMIT 10`
      );

      res.json({
        overview: {
          total: totalQuestions,
          target: targetTotal,
          progress: Math.round((totalQuestions / targetTotal) * 100),
          published: Number(totalResult.rows[0]?.published || 0),
          draft: Number(totalResult.rows[0]?.draft || 0),
          archived: Number(totalResult.rows[0]?.archived || 0),
        },
        disciplineTargets,
        countryBreakdown: countryResult.rows,
        recentBatches: recentBatches.rows,
        distributions: {
          difficulty: DIFFICULTY_DISTRIBUTION,
          cognitive: COGNITIVE_DISTRIBUTION,
          discipline: DISCIPLINE_WEIGHTS,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/mlt/pipeline/export/:batchId", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await pool.query(
        `SELECT stem, options, correct_answer as "correctAnswer",
                rationale_long as "rationaleLong", blueprint_category as "blueprintCategory",
                subtopic, difficulty, cognitive_level as "cognitiveLevel",
                question_type as "questionType", learning_objective as "learningObjective",
                exam_trap as "examTrap", clinical_pearls as "clinicalPearls",
                safety_note as "safetyNote", distractor_rationales as "distractorRationales"
         FROM allied_questions WHERE batch_id = $1 AND career_type = 'mlt'
         ORDER BY blueprint_category, difficulty`,
        [req.params.batchId]
      );

      const formatted = result.rows.map((r: any) => ({
        ...r,
        options: typeof r.options === "string" ? JSON.parse(r.options) : r.options,
        clinicalPearls: typeof r.clinicalPearls === "string" ? JSON.parse(r.clinicalPearls) : (r.clinicalPearls || []),
        distractorRationales: typeof r.distractorRationales === "string" ? JSON.parse(r.distractorRationales) : (r.distractorRationales || []),
      }));

      res.setHeader("Content-Disposition", `attachment; filename=mlt-batch-${req.params.batchId}.json`);
      res.json(formatted);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/mlt/pipeline/template", async (req, res) => {
    const format = (req.query?.format as string) || "json";
    const sampleQuestions = [
      {
        stem: "A 55-year-old male patient presents with fatigue and pallor. CBC results show: RBC 3.2 x 10^12/L, Hgb 95 g/L, Hct 0.28, MCV 72 fL, MCH 25 pg, MCHC 310 g/L. The peripheral blood smear shows microcytic hypochromic red blood cells with target cells. Which type of anemia is most consistent with these findings?",
        options: ["Iron deficiency anemia", "Vitamin B12 deficiency", "Folate deficiency", "Sickle cell anemia"],
        correctAnswer: 0,
        rationaleLong: "The CBC findings show decreased RBC, hemoglobin, and hematocrit with low MCV (microcytic), low MCH, and low-normal MCHC (hypochromic). These indices are classic for iron deficiency anemia. Target cells can be seen in iron deficiency due to relative membrane excess. Vitamin B12 and folate deficiencies cause macrocytic anemia (elevated MCV), not microcytic. Sickle cell anemia shows normocytic indices with sickle cells on smear, not target cells as the primary finding.",
        blueprintCategory: "Hematology",
        subtopic: "Hematology [usa/ascp]",
        difficulty: 3,
        cognitiveLevel: "application",
        questionType: "mcq",
        learningObjective: "Identify iron deficiency anemia based on CBC indices and peripheral blood smear findings",
        examTrap: "Students may confuse target cells with sickle cells",
        clinicalPearls: ["Low MCV + low MCH + low MCHC = microcytic hypochromic anemia", "Target cells appear in iron deficiency, thalassemia, and liver disease"],
        distractorRationales: ["Correct - matches microcytic hypochromic pattern", "Wrong - B12 deficiency causes macrocytic anemia", "Wrong - folate deficiency causes macrocytic anemia", "Wrong - sickle cell shows normocytic indices"],
        tags: ["hematology", "anemia", "CBC", "iron-deficiency"]
      },
      {
        stem: "During quality control testing on a chemistry analyzer, the technologist notices the Levey-Jennings chart shows 2 consecutive control values beyond 2 standard deviations on the same side of the mean. Which Westgard rule has been violated?",
        options: ["1-2s warning", "2-2s rule", "R-4s rule", "4-1s rule"],
        correctAnswer: 1,
        rationaleLong: "The 2-2s rule is violated when 2 consecutive control measurements exceed the same mean + 2SD or mean - 2SD limit. This indicates systematic error (shift or trend). The 1-2s is a warning rule, not a rejection rule. The R-4s rule requires a range of 4SD between two controls within the same run. The 4-1s rule requires 4 consecutive results beyond 1SD on the same side.",
        blueprintCategory: "Laboratory Operations & Quality Management",
        subtopic: "Quality Management [canada/csmls]",
        difficulty: 2,
        cognitiveLevel: "recall",
        questionType: "mcq",
        learningObjective: "Identify Westgard QC rule violations from Levey-Jennings chart patterns",
        examTrap: "Students confuse 2-2s (systematic) with R-4s (random error)",
        clinicalPearls: ["2-2s indicates systematic error", "1-2s is warning only, not rejection"],
        distractorRationales: ["Wrong - 1-2s is a warning, not violation", "Correct - 2 consecutive past 2SD same side", "Wrong - R-4s is range between two controls", "Wrong - 4-1s needs 4 consecutive past 1SD"],
        tags: ["quality-control", "westgard", "levey-jennings"]
      }
    ];

    if (format === "csv") {
      const headers = "stem,options,correctAnswer,rationaleLong,blueprintCategory,subtopic,difficulty,cognitiveLevel,questionType,learningObjective";
      const rows = sampleQuestions.map((q) =>
        `"${q.stem.replace(/"/g, '""')}","${JSON.stringify(q.options).replace(/"/g, '""')}",${q.correctAnswer},"${q.rationaleLong.replace(/"/g, '""')}","${q.blueprintCategory}","${q.subtopic}",${q.difficulty},"${q.cognitiveLevel}","${q.questionType}","${q.learningObjective.replace(/"/g, '""')}"`
      );
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=mlt-import-template.csv");
      return res.send([headers, ...rows].join("\n"));
    }

    res.setHeader("Content-Disposition", "attachment; filename=mlt-import-template.json");
    res.json(sampleQuestions);
  });

  app.get("/api/admin/mlt/pipeline/taxonomy", async (_req, res) => {
    res.json({
      disciplines: MLT_DISCIPLINES,
      subdisciplines: MLT_SUBDISCIPLINES,
      canadaBlueprintCategories: MLT_CANADA_BLUEPRINT_CATEGORIES,
      usaContentAreas: MLT_USA_CONTENT_AREAS,
      difficultyLevels: MLT_DIFFICULTY_LEVELS,
      cognitiveLevels: MLT_COGNITIVE_LEVELS,
      disciplineWeights: DISCIPLINE_WEIGHTS,
      defaultDifficultyDistribution: DIFFICULTY_DISTRIBUTION,
      defaultCognitiveDistribution: COGNITIVE_DISTRIBUTION,
    });
  });
}
