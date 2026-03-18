import { Router } from "express";
import { pool } from "./storage";
import { resolveAuthUser } from "./admin-auth";
import { resolveEntitlementSync, checkEntitlement } from "./entitlements";
import { z } from "zod";
import type { Request, Response } from "express";
import { premiumDegradationMiddleware, getDegradation, attachDegradationToResponse, logDegradedAccess } from "./premium-degradation";

const router = Router();

router.use(premiumDegradationMiddleware());

function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj === null || typeof obj !== "object") return obj;
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
    result[camelKey] = value;
  }
  return result;
}

async function requireAuth(req: Request, res: Response): Promise<any | null> {
  const user = await resolveAuthUser(req as any);
  if (!user) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }
  return user;
}

async function logActivity(
  userId: string,
  eventType: string,
  eventData: any = {},
  sessionId?: string,
  platform?: string
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO analytics_events (id, user_id, event_type, event_data, session_id, platform, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())`,
      [userId, eventType, JSON.stringify(eventData), sessionId || null, platform || "web"]
    );
  } catch (e: any) {
    console.error("[TestBankAPI] Analytics log error:", e.message);
  }
}

async function recordQuestionHistory(
  userId: string,
  questionId: string,
  selectedAnswer: number | null,
  wasCorrect: boolean,
  sourceType: string,
  sourceId?: string,
  sessionId?: string,
  timeSpent?: number
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO unified_question_history (id, user_id, question_id, selected_answer, was_correct, session_id, source_type, source_id, time_spent, answered_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [userId, questionId, selectedAnswer, wasCorrect, sessionId || null, sourceType, sourceId || null, timeSpent || null]
    );
  } catch (e: any) {
    console.error("[TestBankAPI] Question history error:", e.message);
  }
}

function parseCorrectAnswer(raw: any): number[] {
  let correctAnswer = raw;
  if (typeof correctAnswer === "string") {
    try { correctAnswer = JSON.parse(correctAnswer); } catch {}
  }
  const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
  if (typeof correctAnswer === "string") {
    const mapped = letterMap[correctAnswer.toUpperCase()];
    if (mapped !== undefined) return [mapped];
  }
  if (typeof correctAnswer === "number") return [correctAnswer];
  if (Array.isArray(correctAnswer)) return correctAnswer;
  return [0];
}

const answerSchema = z.object({
  questionId: z.string().min(1),
  selectedAnswer: z.number().int().min(0).max(9),
  timeSpent: z.number().int().min(0).max(3600).optional(),
  idempotencyKey: z.string().max(100).optional(),
});

router.get("/api/test-banks", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const { role, country, exam } = req.query;

    let query = `SELECT id, name, slug, description, role, country, exam_type, tier, question_count, categories, sort_order FROM test_bank_collections WHERE status = 'active'`;
    const params: any[] = [];
    let idx = 1;

    if (role) {
      query += ` AND role = $${idx}`;
      params.push(role);
      idx++;
    }
    if (country) {
      query += ` AND country = $${idx}`;
      params.push(country);
      idx++;
    }
    if (exam) {
      query += ` AND exam_type = $${idx}`;
      params.push(exam);
      idx++;
    }

    query += ` ORDER BY sort_order ASC, name ASC`;

    const result = await pool.query(query, params);

    const progressResult = await pool.query(
      `SELECT collection_id, questions_attempted, questions_correct FROM test_bank_progress WHERE user_id = $1`,
      [user.id]
    );
    const progressMap = new Map(progressResult.rows.map((r: any) => [r.collection_id, r]));

    const collections = result.rows.map((row: any) => {
      const entitlement = resolveEntitlementSync(user, "feature", "qbank");
      const isLocked = row.tier !== "free" && !entitlement.hasAccess;
      const progress: any = progressMap.get(row.id);

      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        role: row.role,
        country: row.country,
        examType: row.exam_type,
        tier: row.tier,
        questionCount: row.question_count,
        categories: row.categories,
        isLocked,
        requiredTier: isLocked ? row.tier : null,
        progress: progress ? {
          questionsAttempted: progress.questions_attempted || 0,
          questionsCorrect: progress.questions_correct || 0,
          percentComplete: row.question_count > 0
            ? Math.round(((progress.questions_attempted || 0) / row.question_count) * 100)
            : 0,
        } : {
          questionsAttempted: 0,
          questionsCorrect: 0,
          percentComplete: 0,
        },
      };
    });

    await logActivity(user.id, "test_banks_listed", {
      count: collections.length,
      filters: { role: role || null, country: country || null, exam: exam || null },
    });

    res.json({ collections });
  } catch (e: any) {
    console.error("[TestBankAPI] List error:", e.message);
    res.status(500).json({ error: "Failed to fetch test banks" });
  }
});

router.get("/api/test-banks/:bankId", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const { bankId } = req.params;
    const result = await pool.query(
      `SELECT id, name, slug, description, role, country, exam_type, tier, question_count, categories, metadata
       FROM test_bank_collections WHERE id = $1 AND status = 'active'`,
      [bankId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Test bank not found" });
    }

    const bank = result.rows[0];
    const entitlement = resolveEntitlementSync(user, "feature", "qbank");
    const isLocked = bank.tier !== "free" && !entitlement.hasAccess;

    const progress = await pool.query(
      `SELECT questions_attempted, questions_correct, last_question_id, last_accessed_at
       FROM test_bank_progress WHERE user_id = $1 AND collection_id = $2`,
      [user.id, bankId]
    );

    res.json({
      id: bank.id,
      name: bank.name,
      slug: bank.slug,
      description: bank.description,
      role: bank.role,
      country: bank.country,
      examType: bank.exam_type,
      tier: bank.tier,
      questionCount: bank.question_count,
      categories: bank.categories,
      metadata: bank.metadata,
      isLocked,
      requiredTier: isLocked ? bank.tier : null,
      entitlement: {
        hasAccess: entitlement.hasAccess,
        accessSource: entitlement.accessSource,
        reason: entitlement.accessDecisionReason,
      },
      progress: progress.rows[0] ? {
        questionsAttempted: progress.rows[0].questions_attempted || 0,
        questionsCorrect: progress.rows[0].questions_correct || 0,
        lastQuestionId: progress.rows[0].last_question_id,
        lastAccessedAt: progress.rows[0].last_accessed_at,
        percentComplete: bank.question_count > 0
          ? Math.round(((progress.rows[0].questions_attempted || 0) / bank.question_count) * 100)
          : 0,
      } : null,
    });

    await logActivity(user.id, "test_bank_viewed", {
      bankId,
      bankName: bank.name,
      isLocked,
    });
  } catch (e: any) {
    console.error("[TestBankAPI] Detail error:", e.message);
    res.status(500).json({ error: "Failed to fetch test bank" });
  }
});

router.get("/api/test-banks/:bankId/questions", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const { bankId } = req.params;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    const offset = parseInt(req.query.offset as string) || 0;
    const category = req.query.category as string;
    const difficulty = req.query.difficulty as string;
    const shuffle = req.query.shuffle !== "false";

    const bankResult = await pool.query(
      `SELECT id, name, exam_type, tier, question_count FROM test_bank_collections WHERE id = $1 AND status = 'active'`,
      [bankId]
    );
    if (bankResult.rows.length === 0) {
      return res.status(404).json({ error: "Test bank not found" });
    }

    const bank = bankResult.rows[0];
    const entitlement = resolveEntitlementSync(user, "feature", "qbank");

    if (bank.tier !== "free" && !entitlement.hasAccess) {
      return res.status(403).json({
        error: "Premium access required",
        isLocked: true,
        requiredTier: bank.tier,
      });
    }

    let query = `SELECT id, stem, options, body_system, topic, difficulty, question_type
                 FROM exam_questions
                 WHERE status = 'published'`;
    const params: any[] = [];
    let idx = 1;

    if (bank.exam_type) {
      query += ` AND tier = $${idx}`;
      params.push(bank.exam_type);
      idx++;
    }

    if (category) {
      query += ` AND body_system = $${idx}`;
      params.push(category);
      idx++;
    }

    if (difficulty) {
      const diffMap: Record<string, number> = { easy: 2, moderate: 3, hard: 4 };
      const diffVal = diffMap[difficulty.toLowerCase()];
      if (diffVal) {
        query += ` AND difficulty = $${idx}`;
        params.push(diffVal);
        idx++;
      }
    }

    if (shuffle) {
      query += ` ORDER BY RANDOM()`;
    } else {
      query += ` ORDER BY created_at`;
    }

    query += ` LIMIT $${idx} OFFSET $${idx + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    let countQuery = `SELECT COUNT(*) FROM exam_questions WHERE status = 'published'`;
    const countParams: any[] = [];
    let cIdx = 1;
    if (bank.exam_type) {
      countQuery += ` AND tier = $${cIdx}`;
      countParams.push(bank.exam_type);
      cIdx++;
    }
    if (category) {
      countQuery += ` AND body_system = $${cIdx}`;
      countParams.push(category);
      cIdx++;
    }
    const countResult = await pool.query(countQuery, countParams);

    await logActivity(user.id, "test_bank_questions_viewed", {
      bankId,
      bankName: bank.name,
      questionCount: result.rows.length,
      offset,
    });

    const deg = getDegradation(req);
    if (deg.degradedMode) {
      logDegradedAccess(user.id, "/api/test-banks/questions", deg.degradationReason || "memory_pressure", deg.memoryLevel || "unknown");
    }

    const response: any = {
      questions: result.rows.map((q: any) => ({
        id: q.id,
        stem: q.stem,
        options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
        bodySystem: q.body_system,
        topic: q.topic,
        difficulty: q.difficulty,
        questionType: q.question_type,
      })),
      total: parseInt(countResult.rows[0].count),
      limit,
      offset,
    };

    if (deg.degradedMode) {
      response.degradedMode = true;
      response.degradationReason = deg.degradationReason;
    }

    res.json(response);
  } catch (e: any) {
    console.error("[TestBankAPI] Questions error:", e.message);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

router.post("/api/test-banks/:bankId/answer", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const { bankId } = req.params;
    const parsed = answerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    }
    const { questionId, selectedAnswer, timeSpent, idempotencyKey } = parsed.data;

    const recentDupe = await pool.query(
      `SELECT id, was_correct FROM unified_question_history
       WHERE user_id = $1 AND question_id = $2 AND source_type = 'test_bank' AND source_id = $3
       AND answered_at > NOW() - INTERVAL '5 minutes'
       ORDER BY answered_at DESC LIMIT 1`,
      [user.id, questionId, bankId]
    );
    if (recentDupe.rows.length > 0) {
      return res.json({
        correct: recentDupe.rows[0].was_correct,
        duplicate: true,
        message: "Answer already recorded",
      });
    }

    const bankResult = await pool.query(
      `SELECT id, name, tier FROM test_bank_collections WHERE id = $1 AND status = 'active'`,
      [bankId]
    );
    if (bankResult.rows.length === 0) {
      return res.status(404).json({ error: "Test bank not found" });
    }
    const bank = bankResult.rows[0];
    const entitlement = resolveEntitlementSync(user, "feature", "qbank");
    if (bank.tier !== "free" && !entitlement.hasAccess) {
      return res.status(403).json({ error: "Premium access required", isLocked: true, requiredTier: bank.tier });
    }

    const qResult = await pool.query(
      `SELECT id, correct_answer, rationale, correct_answer_explanation, distractor_rationales, clinical_pearl, body_system
       FROM exam_questions WHERE id = $1 AND status = 'published'`,
      [questionId]
    );

    if (qResult.rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    const question = qResult.rows[0];
    const correctAnswer = parseCorrectAnswer(question.correct_answer);
    const isCorrect = correctAnswer.includes(selectedAnswer);

    await recordQuestionHistory(
      user.id, questionId, selectedAnswer, isCorrect,
      "test_bank", bankId, undefined, timeSpent
    );

    await pool.query(
      `INSERT INTO test_bank_progress (id, user_id, collection_id, questions_attempted, questions_correct, last_question_id, last_accessed_at, updated_at)
       VALUES (gen_random_uuid(), $1, $2, 1, $3, $4, NOW(), NOW())
       ON CONFLICT (user_id, collection_id) DO UPDATE SET
         questions_attempted = test_bank_progress.questions_attempted + 1,
         questions_correct = test_bank_progress.questions_correct + $3,
         last_question_id = $4,
         last_accessed_at = NOW(),
         updated_at = NOW()`,
      [user.id, bankId, isCorrect ? 1 : 0, questionId]
    );

    await logActivity(user.id, "question_answered", {
      questionId,
      sourceType: "test_bank",
      sourceId: bankId,
      isCorrect,
      timeSpent,
    });

    let distractorRationales = question.distractor_rationales;
    if (typeof distractorRationales === "string") {
      try { distractorRationales = JSON.parse(distractorRationales); } catch { distractorRationales = null; }
    }

    res.json({
      correct: isCorrect,
      correctAnswer,
      rationale: question.rationale,
      correctAnswerExplanation: question.correct_answer_explanation || null,
      distractorRationales: distractorRationales || null,
      clinicalPearl: question.clinical_pearl || null,
      bodySystem: question.body_system,
    });
  } catch (e: any) {
    console.error("[TestBankAPI] Answer error:", e.message);
    res.status(500).json({ error: "Failed to process answer" });
  }
});

router.get("/api/test-banks/:bankId/progress", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const { bankId } = req.params;

    const bankResult = await pool.query(
      `SELECT id, question_count FROM test_bank_collections WHERE id = $1`,
      [bankId]
    );
    if (bankResult.rows.length === 0) {
      return res.status(404).json({ error: "Test bank not found" });
    }

    const bank = bankResult.rows[0];

    const progress = await pool.query(
      `SELECT questions_attempted, questions_correct, last_question_id, last_accessed_at
       FROM test_bank_progress WHERE user_id = $1 AND collection_id = $2`,
      [user.id, bankId]
    );

    const history = await pool.query(
      `SELECT question_id, was_correct, time_spent, answered_at FROM unified_question_history
       WHERE user_id = $1 AND source_type = 'test_bank' AND source_id = $2
       ORDER BY answered_at DESC LIMIT 50`,
      [user.id, bankId]
    );

    const categoryStats = await pool.query(
      `SELECT eq.body_system, COUNT(*) as total,
              SUM(CASE WHEN uqh.was_correct THEN 1 ELSE 0 END) as correct
       FROM unified_question_history uqh
       JOIN exam_questions eq ON uqh.question_id = eq.id
       WHERE uqh.user_id = $1 AND uqh.source_type = 'test_bank' AND uqh.source_id = $2
       GROUP BY eq.body_system`,
      [user.id, bankId]
    );

    const progressData = progress.rows[0];
    const percentComplete = progressData && bank.question_count > 0
      ? Math.round((progressData.questions_attempted / bank.question_count) * 100)
      : 0;
    const accuracy = progressData && progressData.questions_attempted > 0
      ? Math.round((progressData.questions_correct / progressData.questions_attempted) * 100)
      : 0;

    res.json({
      progress: progressData ? {
        ...snakeToCamel(progressData),
        percentComplete,
        accuracy,
      } : null,
      categoryBreakdown: categoryStats.rows.map((r: any) => ({
        category: r.body_system,
        total: parseInt(r.total),
        correct: parseInt(r.correct),
        accuracy: parseInt(r.total) > 0 ? Math.round((parseInt(r.correct) / parseInt(r.total)) * 100) : 0,
      })),
      recentHistory: history.rows.map((r: any) => snakeToCamel(r)),
    });
  } catch (e: any) {
    console.error("[TestBankAPI] Progress error:", e.message);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

export function registerTestBankApiRoutes(app: any) {
  app.use(router);
}
