import type { Express } from "express";
import { requireAdmin } from "./admin-auth";
import { pool } from "./storage";
import { loadLessonData, classifyLessonStatus, deriveTier } from "./lesson-content-api";
import { routeAIRequest, getKillSwitch } from "./ai-provider-router";

interface CoverageTarget {
  category: string;
  key: string;
  target: number;
  current: number;
  percentage: number;
  status: "green" | "yellow" | "red";
  gap: number;
}

interface CoverageReport {
  nursing: {
    byTier: CoverageTarget[];
    byBodySystem: CoverageTarget[];
    bySpecialty: CoverageTarget[];
  };
  alliedHealth: {
    byProfession: CoverageTarget[];
  };
  flashcards: {
    byTopic: CoverageTarget[];
  };
  lessons: {
    total: number;
    complete: number;
    weak: number;
    placeholder: number;
    broken: number;
    missing: { title: string; slug: string; referencedFrom: string }[];
  };
  generationHistory: any[];
  timestamp: string;
}

const NURSING_TIERS = ["rpn", "rn", "np"];
const BODY_SYSTEMS = [
  "Cardiovascular", "Respiratory", "Neurological", "Gastrointestinal",
  "Renal/Urinary", "Endocrine", "Musculoskeletal", "Integumentary",
  "Hematological", "Immunological", "Reproductive", "Mental Health",
  "Pediatrics", "Maternal/Newborn"
];

const ALLIED_PROFESSIONS = [
  { key: "mlt", label: "Medical Lab Tech" },
  { key: "pharmacyTech", label: "Pharmacy Technician" },
  { key: "paramedic", label: "Paramedic" },
  { key: "rrt", label: "Respiratory Therapist" },
  { key: "imaging", label: "Medical Imaging" },
  { key: "ot", label: "Occupational Therapy" },
  { key: "pt", label: "Physical Therapy" },
  { key: "socialWorker", label: "Social Worker" },
  { key: "psychotherapist", label: "Psychotherapist" },
  { key: "addictionsWorker", label: "Addictions Worker" },
];

const DEFAULT_TARGETS = {
  questionsPerTier: 300,
  questionsPerBodySystem: 300,
  questionsPerSpecialty: 500,
  questionsPerProfession: 300,
  flashcardsPerTopic: 25,
};

function computeStatus(current: number, target: number): "green" | "yellow" | "red" {
  if (target <= 0) return "green";
  const pct = (current / target) * 100;
  if (pct >= 80) return "green";
  if (pct >= 40) return "yellow";
  return "red";
}

async function getConfigurableTargets(): Promise<typeof DEFAULT_TARGETS> {
  try {
    const res = await pool.query(
      `SELECT config_value FROM app_config WHERE config_key = 'content_coverage_targets' LIMIT 1`
    );
    if (res.rows[0]?.config_value) {
      return { ...DEFAULT_TARGETS, ...JSON.parse(res.rows[0].config_value) };
    }
  } catch {}
  return DEFAULT_TARGETS;
}

async function analyzeCoverage(): Promise<CoverageReport> {
  const targets = await getConfigurableTargets();

  const tierCounts = await pool.query(
    `SELECT tier, COUNT(*)::int as count FROM exam_questions 
     WHERE career_type = 'nursing' AND status IN ('draft','approved','published','needs_review')
     GROUP BY tier`
  );
  const tierMap: Record<string, number> = {};
  for (const row of tierCounts.rows) {
    tierMap[row.tier] = row.count;
  }
  const byTier: CoverageTarget[] = NURSING_TIERS.map(tier => {
    const current = tierMap[tier] || 0;
    return {
      category: "Nursing Tier",
      key: tier.toUpperCase(),
      target: targets.questionsPerTier,
      current,
      percentage: Math.round((current / targets.questionsPerTier) * 100),
      status: computeStatus(current, targets.questionsPerTier),
      gap: Math.max(0, targets.questionsPerTier - current),
    };
  });

  const systemCounts = await pool.query(
    `SELECT body_system, COUNT(*)::int as count FROM exam_questions 
     WHERE career_type = 'nursing' AND body_system IS NOT NULL 
     AND status IN ('draft','approved','published','needs_review')
     GROUP BY body_system`
  );
  const systemMap: Record<string, number> = {};
  for (const row of systemCounts.rows) {
    systemMap[row.body_system] = row.count;
  }
  const byBodySystem: CoverageTarget[] = BODY_SYSTEMS.map(sys => {
    const current = systemMap[sys] || 0;
    return {
      category: "Body System",
      key: sys,
      target: targets.questionsPerBodySystem,
      current,
      percentage: Math.round((current / targets.questionsPerBodySystem) * 100),
      status: computeStatus(current, targets.questionsPerBodySystem),
      gap: Math.max(0, targets.questionsPerBodySystem - current),
    };
  });

  const specialtyCounts = await pool.query(
    `SELECT topic, COUNT(*)::int as count FROM exam_questions 
     WHERE career_type = 'nursing' AND topic IS NOT NULL
     AND status IN ('draft','approved','published','needs_review')
     GROUP BY topic ORDER BY count DESC LIMIT 50`
  );
  const bySpecialty: CoverageTarget[] = specialtyCounts.rows.map((row: any) => ({
    category: "Specialty",
    key: row.topic,
    target: targets.questionsPerSpecialty,
    current: row.count,
    percentage: Math.round((row.count / targets.questionsPerSpecialty) * 100),
    status: computeStatus(row.count, targets.questionsPerSpecialty),
    gap: Math.max(0, targets.questionsPerSpecialty - row.count),
  }));

  const alliedCounts = await pool.query(
    `SELECT career_type, COUNT(*)::int as count FROM allied_questions 
     WHERE status IN ('pending','approved','published')
     GROUP BY career_type`
  );
  const alliedMap: Record<string, number> = {};
  for (const row of alliedCounts.rows) {
    alliedMap[row.career_type] = row.count;
  }
  const byProfession: CoverageTarget[] = ALLIED_PROFESSIONS.map(prof => {
    const current = alliedMap[prof.key] || 0;
    return {
      category: "Allied Health",
      key: prof.label,
      target: targets.questionsPerProfession,
      current,
      percentage: Math.round((current / targets.questionsPerProfession) * 100),
      status: computeStatus(current, targets.questionsPerProfession),
      gap: Math.max(0, targets.questionsPerProfession - current),
    };
  });

  const flashcardCounts = await pool.query(
    `SELECT topic_tag, COUNT(*)::int as count FROM flashcard_bank 
     WHERE status IN ('draft','approved','published','needs_review')
     AND topic_tag IS NOT NULL
     GROUP BY topic_tag ORDER BY count DESC LIMIT 50`
  );
  const byTopic: CoverageTarget[] = flashcardCounts.rows.map((row: any) => ({
    category: "Flashcard Topic",
    key: row.topic_tag,
    target: targets.flashcardsPerTopic,
    current: row.count,
    percentage: Math.round((row.count / targets.flashcardsPerTopic) * 100),
    status: computeStatus(row.count, targets.flashcardsPerTopic),
    gap: Math.max(0, targets.flashcardsPerTopic - row.count),
  }));

  let lessonReport = { total: 0, complete: 0, weak: 0, placeholder: 0, broken: 0, missing: [] as any[] };
  try {
    const data = await loadLessonData();
    const entries = Object.entries(data);
    lessonReport.total = entries.length;
    for (const [id, lesson] of entries) {
      const status = classifyLessonStatus(lesson);
      if (status === "complete") lessonReport.complete++;
      else if (status === "weak") lessonReport.weak++;
      else if (status === "placeholder") lessonReport.placeholder++;
      else lessonReport.broken++;
    }

    const navLinks = extractNavLessonLinks(data);
    for (const link of navLinks) {
      if (!data[link.slug]) {
        lessonReport.missing.push(link);
      }
    }
  } catch (err: any) {
    console.error("[Coverage] Lesson scan error:", err.message);
  }

  let generationHistory: any[] = [];
  try {
    const histRes = await pool.query(
      `SELECT id, template_key, variant_key, status, generated_count, accepted_count, 
              rejected_count, triggered_by, created_at, completed_at
       FROM qbank_generation_runs 
       ORDER BY created_at DESC LIMIT 20`
    );
    generationHistory = histRes.rows.map((r: any) => ({
      id: r.id,
      templateKey: r.template_key,
      variantKey: r.variant_key,
      status: r.status,
      generated: r.generated_count,
      accepted: r.accepted_count,
      rejected: r.rejected_count,
      triggeredBy: r.triggered_by,
      createdAt: r.created_at,
      completedAt: r.completed_at,
    }));
  } catch {}

  return {
    nursing: { byTier, byBodySystem, bySpecialty },
    alliedHealth: { byProfession },
    flashcards: { byTopic },
    lessons: lessonReport,
    generationHistory,
    timestamp: new Date().toISOString(),
  };
}

function extractNavLessonLinks(data: Record<string, any>): { title: string; slug: string; referencedFrom: string }[] {
  const links: { title: string; slug: string; referencedFrom: string }[] = [];
  const knownSlugs = new Set(Object.keys(data));

  for (const [id, lesson] of Object.entries(data)) {
    const content = JSON.stringify(lesson).toLowerCase();
    const linkMatches = content.match(/\/lessons\/([a-z0-9-]+)/g) || [];
    for (const match of linkMatches) {
      const slug = match.replace("/lessons/", "");
      if (!knownSlugs.has(slug) && slug.length > 2) {
        const exists = links.find(l => l.slug === slug);
        if (!exists) {
          links.push({
            title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            slug,
            referencedFrom: id,
          });
        }
      }
    }
  }

  return links;
}

async function generateQuestionsForGap(params: {
  tier: string;
  bodySystem?: string;
  topic?: string;
  count: number;
  difficulty?: string;
}): Promise<{ generated: number; accepted: number; errors: string[] }> {
  if (getKillSwitch()) {
    return { generated: 0, accepted: 0, errors: ["AI generation kill switch is active"] };
  }

  const { tier, bodySystem, topic, count, difficulty } = params;
  const tierLabel = tier.toUpperCase();
  const scopeNote = tier === "rpn" ? "Practical nursing scope (LPN/RPN)" : tier === "rn" ? "Registered Nurse scope" : "Nurse Practitioner scope";
  const diffDist = difficulty || "30% easy (difficulty 1-2), 50% moderate (difficulty 3), 20% difficult (difficulty 4-5)";

  const systemPrompt = `You are a senior nursing exam psychometrician generating NCLEX-style questions.
Scope: ${scopeNote}
Target difficulty distribution: ${diffDist}

Output ONLY valid JSON array of question objects. No markdown, no commentary.
Each question object:
{
  "stem": "clinical vignette with patient demographics, vitals, assessment findings (min 80 chars)",
  "options": [{"label":"A","text":"..."}, {"label":"B","text":"..."}, {"label":"C","text":"..."}, {"label":"D","text":"..."}],
  "correctAnswer": "A",
  "rationale": "detailed explanation (min 150 words) - why correct, why each wrong",
  "clinicalPearl": "exam-relevant insight",
  "difficulty": 1-5,
  "bodySystem": "${bodySystem || 'appropriate system'}",
  "topic": "${topic || 'appropriate topic'}",
  "subtopic": "specific subtopic",
  "questionType": "MCQ",
  "tags": ["tag1","tag2"]
}`;

  const userPrompt = `Generate exactly ${count} unique clinical exam questions for ${tierLabel} nursing students.
${bodySystem ? `Body System: ${bodySystem}` : ""}
${topic ? `Topic: ${topic}` : ""}
Each question must have a distinct clinical scenario. Return ONLY a JSON array.`;

  try {
    const result = await routeAIRequest(systemPrompt, userPrompt, {
      model: "gpt-4o-mini",
      maxTokens: Math.min(count * 1200, 16000),
      temperature: 0.7,
      taskType: "content",
      feature: "coverage-gap-generator",
    });

    let questions: any[] = [];
    try {
      const arrMatch = result.content.match(/\[[\s\S]*\]/);
      if (arrMatch) questions = JSON.parse(arrMatch[0]);
      else {
        const objMatch = result.content.match(/\{[\s\S]*\}/);
        if (objMatch) {
          const obj = JSON.parse(objMatch[0]);
          questions = obj.questions || obj.items || [obj];
        }
      }
    } catch { return { generated: 0, accepted: 0, errors: ["Failed to parse AI response"] }; }

    let accepted = 0;
    const errors: string[] = [];
    for (const q of questions) {
      if (!q.stem || q.stem.length < 40) continue;
      const options = q.options || [];
      if (options.length < 4) continue;

      try {
        const insertResult = await pool.query(
          `INSERT INTO exam_questions (tier, exam, question_type, status, stem, options, correct_answer, rationale, difficulty, tags, body_system, topic, subtopic, region_scope, career_type, clinical_pearl)
           VALUES ($1, $2, $3, 'draft', $4, $5, $6, $7, $8, $9, $10, $11, $12, 'BOTH', 'nursing', $13)
           ON CONFLICT DO NOTHING`,
          [
            tier, `${tier.toUpperCase()}-CAT`, q.questionType || "MCQ",
            q.stem, JSON.stringify(options), JSON.stringify(q.correctAnswer || "A"),
            q.rationale || "", q.difficulty || 3, q.tags || [],
            q.bodySystem || bodySystem || null, q.topic || topic || null,
            q.subtopic || null, q.clinicalPearl || null,
          ]
        );
        if (insertResult.rowCount && insertResult.rowCount > 0) accepted++;
      } catch (err: any) {
        if (err.code !== "23505") errors.push(err.message);
      }
    }

    return { generated: questions.length, accepted, errors };
  } catch (err: any) {
    return { generated: 0, accepted: 0, errors: [err.message] };
  }
}

async function generateFlashcardsForGap(params: {
  tier: string;
  topicTag: string;
  count: number;
}): Promise<{ generated: number; accepted: number; errors: string[] }> {
  if (getKillSwitch()) {
    return { generated: 0, accepted: 0, errors: ["AI generation kill switch is active"] };
  }

  const { tier, topicTag, count } = params;

  const systemPrompt = `You are a nursing educator creating flashcards for ${tier.toUpperCase()} students.
Create three types of flashcards:
1. Concept Definition - clear front question, concise accurate back
2. Clinical Scenario - mini clinical scenario on front, correct action/assessment on back
3. Exam Recall - high-yield exam fact on front, explanation on back

Output ONLY valid JSON array. Each flashcard:
{
  "front": "question or prompt (concise)",
  "back": "answer with key details (concise but complete)",
  "cardType": "concept_definition | clinical_scenario | exam_recall",
  "topicTag": "${topicTag}",
  "difficulty": 1-5,
  "tags": ["tag1"]
}`;

  const userPrompt = `Generate exactly ${count} unique flashcards about "${topicTag}" for ${tier.toUpperCase()} nursing students.
Mix all three card types. Return ONLY a JSON array.`;

  try {
    const result = await routeAIRequest(systemPrompt, userPrompt, {
      model: "gpt-4o-mini",
      maxTokens: Math.min(count * 500, 8000),
      temperature: 0.7,
      taskType: "content",
      feature: "coverage-flashcard-generator",
    });

    let cards: any[] = [];
    try {
      const arrMatch = result.content.match(/\[[\s\S]*\]/);
      if (arrMatch) cards = JSON.parse(arrMatch[0]);
      else {
        const objMatch = result.content.match(/\{[\s\S]*\}/);
        if (objMatch) {
          const obj = JSON.parse(objMatch[0]);
          cards = obj.flashcards || obj.cards || obj.items || [obj];
        }
      }
    } catch { return { generated: 0, accepted: 0, errors: ["Failed to parse AI response"] }; }

    let accepted = 0;
    const errors: string[] = [];
    const crypto = await import("crypto");

    for (const c of cards) {
      if (!c.front || !c.back) continue;
      const hash = crypto.createHash("sha256").update(c.front.toLowerCase().trim()).digest("hex");

      try {
        const insertResult = await pool.query(
          `INSERT INTO flashcard_bank (tier, topic_tag, front, back, status, content_hash, source_type, difficulty, category)
           VALUES ($1, $2, $3, $4, 'draft', $5, 'auto_coverage', $6, $7)
           ON CONFLICT (content_hash) DO NOTHING`,
          [tier, c.topicTag || topicTag, c.front, c.back, hash, c.difficulty || 3, c.cardType || "concept_definition"]
        );
        if (insertResult.rowCount && insertResult.rowCount > 0) accepted++;
      } catch (err: any) {
        if (err.code !== "23505") errors.push(err.message);
      }
    }

    return { generated: cards.length, accepted, errors };
  } catch (err: any) {
    return { generated: 0, accepted: 0, errors: [err.message] };
  }
}

async function generateMissingLesson(params: {
  title: string;
  slug: string;
}): Promise<{ success: boolean; error?: string }> {
  if (getKillSwitch()) {
    return { success: false, error: "AI generation kill switch is active" };
  }

  const { title, slug } = params;

  const systemPrompt = `You are a senior nursing educator creating comprehensive lesson content for NurseNest.
Generate a complete lesson with clinically accurate, exam-focused content.

Output valid JSON with these fields:
{
  "title": "${title}",
  "definition": "1-2 sentence clinical definition",
  "summary": "3-4 sentence overview",
  "objectives": ["learning objective 1", "objective 2", "objective 3"],
  "pathophysiology": "detailed pathophysiology explanation (min 200 words)",
  "riskFactors": ["specific risk factor 1", "risk factor 2", ...],
  "assessmentFindings": ["finding 1", "finding 2", ...],
  "signs": {
    "left": ["Sign/symptom category 1", "category 2"],
    "right": ["Associated detail 1", "detail 2"]
  },
  "diagnostics": ["diagnostic test 1 with normal values", "test 2", ...],
  "management": ["intervention 1", "intervention 2", ...],
  "nursingActions": ["specific nursing action 1", "action 2", ...],
  "medications": [
    {"name": "Drug Name", "class": "Drug Class", "action": "mechanism", "sideEffects": "key side effects", "nursing": "nursing considerations"}
  ],
  "pearls": ["exam pearl 1", "pearl 2", ...],
  "quiz": [
    {"question": "stem", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctAnswer": 0, "rationale": "explanation"}
  ],
  "seo": {
    "title": "SEO title (60 chars)",
    "description": "Meta description (155 chars)"
  }
}`;

  const userPrompt = `Create a complete nursing lesson on: "${title}"
Include pathophysiology, signs & symptoms, diagnostics, nursing interventions, pharmacology, and clinical pearls.
Generate at least 5 quiz questions with rationales. Make content specific and clinically accurate.`;

  try {
    const result = await routeAIRequest(systemPrompt, userPrompt, {
      model: "gpt-4o",
      maxTokens: 8000,
      temperature: 0.7,
      responseFormat: { type: "json_object" },
      taskType: "content",
      feature: "coverage-lesson-generator",
    });

    const parsed = JSON.parse(result.content);

    await pool.query(
      `INSERT INTO publishing_queue (engine_key, content_type, title, content, status, metadata, created_by)
       VALUES ('lesson_engine', 'lesson', $1, $2, 'pending_review', $3, 'coverage_analyzer')
       ON CONFLICT DO NOTHING`,
      [
        parsed.title || title,
        JSON.stringify(parsed),
        JSON.stringify({ slug, generatedAt: new Date().toISOString(), source: "content_coverage_analyzer" }),
      ]
    );

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export function registerContentCoverageRoutes(app: Express): void {
  app.get("/api/admin/content-coverage", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const report = await analyzeCoverage();
      res.json(report);
    } catch (err: any) {
      console.error("[Coverage] Analysis error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/content-coverage/targets", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const targets = await getConfigurableTargets();
      res.json(targets);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/admin/content-coverage/targets", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const newTargets = { ...DEFAULT_TARGETS, ...req.body };
      try {
        await pool.query(
          `CREATE TABLE IF NOT EXISTS app_config (
             config_key TEXT PRIMARY KEY,
             config_value TEXT,
             updated_at TIMESTAMP DEFAULT NOW()
           )`
        );
        await pool.query(
          `INSERT INTO app_config (config_key, config_value) VALUES ('content_coverage_targets', $1)
           ON CONFLICT (config_key) DO UPDATE SET config_value = $1, updated_at = NOW()`,
          [JSON.stringify(newTargets)]
        );
      } catch (dbErr: any) {
        console.warn("[Coverage] Could not persist targets:", dbErr.message);
      }
      res.json(newTargets);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/content-coverage/generate-questions", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { tier = "rpn", bodySystem, topic, count = 10 } = req.body;
      const validTiers = ["rpn", "rn", "np"];
      if (!validTiers.includes(tier)) {
        return res.status(400).json({ error: `tier must be one of: ${validTiers.join(", ")}` });
      }
      const numCount = Math.floor(Number(count));
      if (!numCount || numCount < 1 || numCount > 50) {
        return res.status(400).json({ error: "Count must be between 1 and 50" });
      }
      const result = await generateQuestionsForGap({ tier, bodySystem, topic, count: numCount });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/content-coverage/generate-flashcards", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { tier = "rpn", topicTag, count = 10 } = req.body;
      if (!topicTag || typeof topicTag !== "string") {
        return res.status(400).json({ error: "topicTag is required" });
      }
      const numCount = Math.floor(Number(count));
      if (!numCount || numCount < 1 || numCount > 50) {
        return res.status(400).json({ error: "Count must be between 1 and 50" });
      }
      const result = await generateFlashcardsForGap({ tier, topicTag, count: numCount });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/content-coverage/generate-lesson", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { title, slug } = req.body;
      if (!title || !slug) {
        return res.status(400).json({ error: "title and slug are required" });
      }
      const result = await generateMissingLesson({ title, slug });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/content-coverage/auto-fill", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { types = ["questions", "flashcards"], maxPerCategory = 10 } = req.body;
      const report = await analyzeCoverage();
      const results: any = { questions: [], flashcards: [], lessons: [], errors: [] };

      if (types.includes("questions")) {
        const gaps = report.nursing.byTier.filter(t => t.status === "red");
        for (const gap of gaps.slice(0, 3)) {
          const tier = gap.key.toLowerCase();
          const r = await generateQuestionsForGap({ tier, count: Math.min(maxPerCategory, gap.gap) });
          results.questions.push({ tier, ...r });
        }

        const systemGaps = report.nursing.byBodySystem.filter(t => t.status === "red");
        for (const gap of systemGaps.slice(0, 3)) {
          const r = await generateQuestionsForGap({ tier: "rn", bodySystem: gap.key, count: Math.min(maxPerCategory, gap.gap) });
          results.questions.push({ bodySystem: gap.key, ...r });
        }
      }

      if (types.includes("flashcards")) {
        const fcGaps = report.flashcards.byTopic.filter(t => t.status === "red");
        for (const gap of fcGaps.slice(0, 3)) {
          const r = await generateFlashcardsForGap({ tier: "rpn", topicTag: gap.key, count: Math.min(maxPerCategory, gap.gap) });
          results.flashcards.push({ topic: gap.key, ...r });
        }
      }

      if (types.includes("lessons")) {
        for (const missing of report.lessons.missing.slice(0, 3)) {
          const r = await generateMissingLesson(missing);
          results.lessons.push({ slug: missing.slug, ...r });
        }
      }

      res.json(results);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/content-coverage/lesson-scan", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const data = await loadLessonData();
      const entries = Object.entries(data);
      const lessonStatuses: any[] = [];

      for (const [id, lesson] of entries) {
        const status = classifyLessonStatus(lesson);
        const tier = deriveTier(id);
        lessonStatuses.push({
          id,
          title: typeof (lesson as any).title === "object" ? ((lesson as any).title.en || (lesson as any).title) : ((lesson as any).title || id),
          tier,
          status,
          hasQuiz: Array.isArray((lesson as any).quiz) && (lesson as any).quiz.length > 0,
          quizCount: Array.isArray((lesson as any).quiz) ? (lesson as any).quiz.length : 0,
          hasMedications: Array.isArray((lesson as any).medications) && (lesson as any).medications.length > 0,
          medCount: Array.isArray((lesson as any).medications) ? (lesson as any).medications.length : 0,
        });
      }

      const navLinks = extractNavLessonLinks(data);
      const missing = navLinks.filter(l => !data[l.slug]);

      res.json({
        total: entries.length,
        statuses: lessonStatuses,
        missing,
        summary: {
          complete: lessonStatuses.filter(l => l.status === "complete").length,
          weak: lessonStatuses.filter(l => l.status === "weak").length,
          placeholder: lessonStatuses.filter(l => l.status === "placeholder").length,
          broken: lessonStatuses.filter(l => l.status === "broken").length,
          missingCount: missing.length,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}
