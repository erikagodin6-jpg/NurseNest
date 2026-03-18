import { Router } from "express";
import { pool } from "./storage";
import { resolveAuthUser } from "./admin-auth";
import { resolveEntitlementSync } from "./entitlements";
import { computeAbilityEstimate, selectNextItem, type QuestionResponse, type CandidateItem } from "./cat-engine";
import { z } from "zod";
import type { Request, Response } from "express";

const router = Router();

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
  sessionId?: string
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO analytics_events (id, user_id, event_type, event_data, session_id, platform, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, 'web', NOW())`,
      [userId, eventType, JSON.stringify(eventData), sessionId || null]
    );
  } catch (e: any) {
    console.error("[CATSessionAPI] Analytics log error:", e.message);
  }
}

async function recordQuestionHistory(
  userId: string,
  questionId: string,
  selectedAnswer: number | null,
  wasCorrect: boolean,
  sourceId: string,
  sessionId?: string,
  timeSpent?: number
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO unified_question_history (id, user_id, question_id, selected_answer, was_correct, session_id, source_type, source_id, time_spent, answered_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'cat_exam', $6, $7, NOW())`,
      [userId, questionId, selectedAnswer, wasCorrect, sessionId || null, sourceId, timeSpent || null]
    );
  } catch (e: any) {
    console.error("[CATSessionAPI] Question history error:", e.message);
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

async function selectNextQuestion(
  attemptId: string,
  tier: string,
  catState: any
): Promise<any | null> {
  const seenIds: string[] = catState.questionsSeen || [];
  const currentAbility = catState.currentAbility || 0;

  let query = `SELECT id, stem, options, body_system, topic, difficulty, question_type
               FROM exam_questions
               WHERE tier = $1 AND status = 'published'`;
  const params: any[] = [tier];
  let idx = 2;

  if (seenIds.length > 0) {
    query += ` AND id != ALL($${idx})`;
    params.push(seenIds);
    idx++;
  }

  query += ` ORDER BY ABS(difficulty - $${idx}) ASC, RANDOM() LIMIT 10`;
  params.push(Math.max(1, Math.min(5, Math.round(3 + currentAbility))));

  const result = await pool.query(query, params);

  if (result.rows.length === 0) return null;

  const responses: QuestionResponse[] = (catState.responses || []).map((r: any) => ({
    questionId: r.questionId,
    difficulty: r.difficulty || 3,
    correct: r.isCorrect,
    timeSpent: r.timeSpent || 30,
    blueprintCategory: r.bodySystem,
  }));

  const answeredCategories: Record<string, number> = {};
  for (const r of responses) {
    if (r.blueprintCategory) {
      answeredCategories[r.blueprintCategory] = (answeredCategories[r.blueprintCategory] || 0) + 1;
    }
  }

  const candidates: CandidateItem[] = result.rows.map((r: any) => ({
    id: r.id,
    difficulty: r.difficulty || 3,
    blueprintCategory: r.body_system || "General",
    discriminationIndex: 0.5,
    attemptCount: 0,
    exposureCount: 0,
    isCaseSet: false,
    formatType: r.question_type,
  }));

  const blueprintWeights: Record<string, number> = {};
  const allCategories = Array.from(new Set(candidates.map(c => c.blueprintCategory)));
  for (const cat of allCategories) {
    blueprintWeights[cat] = 1 / allCategories.length;
  }

  const selected = selectNextItem(
    currentAbility,
    candidates,
    answeredCategories,
    blueprintWeights,
    seenIds.length,
    -20
  );

  if (!selected) return result.rows[0] || null;

  const match = result.rows.find((r: any) => r.id === selected.id);
  return match || result.rows[0];
}

const startSchema = z.object({
  tier: z.string().optional(),
  questionCount: z.number().int().min(50).max(200).optional(),
  blueprintCode: z.string().optional(),
});

const answerSchema = z.object({
  questionId: z.string().min(1),
  selectedAnswer: z.number().int().min(0).max(9),
  timeSpent: z.number().int().min(0).max(3600).optional(),
});

router.post("/api/cat-exams/start", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const entitlement = resolveEntitlementSync(user, "feature", "cat_exams");
    if (!entitlement.hasAccess) {
      return res.status(403).json({
        error: "CAT exam access requires premium subscription",
        isLocked: true,
        entitlement: {
          hasAccess: false,
          accessSource: entitlement.accessSource,
          reason: entitlement.accessDecisionReason,
        },
      });
    }

    const parsed = startSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    }

    const { tier, questionCount, blueprintCode } = parsed.data;
    const examTier = tier || user.tier || "rpn";
    const maxQuestions = questionCount || 150;

    const sessionId = `cat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const initialCatState = {
      sessionId,
      currentAbility: 0,
      standardError: 1.0,
      questionsSeen: [] as string[],
      abilityTrajectory: [] as number[],
      responses: [] as any[],
      stabilityIndex: 0,
      isPaused: false,
      version: 1,
    };

    const attemptResult = await pool.query(
      `INSERT INTO mock_exam_attempts (id, user_id, tier, total_questions, status, exam_type, career_type, cat_state, blueprint_code, started_at)
       VALUES (gen_random_uuid(), $1, $2, $3, 'in_progress', 'cat', $4, $5, $6, NOW())
       RETURNING *`,
      [
        user.id,
        examTier,
        maxQuestions,
        user.career_type || user.careerType || "nursing",
        JSON.stringify(initialCatState),
        blueprintCode || null,
      ]
    );

    const attempt = attemptResult.rows[0];
    const nextQ = await selectNextQuestion(attempt.id, examTier, initialCatState);

    await logActivity(user.id, "cat_session_started", {
      attemptId: attempt.id,
      sessionId,
      tier: examTier,
      maxQuestions,
    }, sessionId);

    res.json({
      attemptId: attempt.id,
      sessionId,
      status: "in_progress",
      currentQuestion: nextQ ? {
        id: nextQ.id,
        stem: nextQ.stem,
        options: (() => { try { return typeof nextQ.options === "string" ? JSON.parse(nextQ.options) : nextQ.options; } catch { return []; } })(),
        bodySystem: nextQ.body_system,
        topic: nextQ.topic,
        difficulty: nextQ.difficulty,
        questionType: nextQ.question_type,
      } : null,
      questionNumber: 1,
      maxQuestions,
      catState: {
        currentAbility: 0,
        standardError: 1.0,
        questionCount: 0,
      },
    });
  } catch (e: any) {
    console.error("[CATSessionAPI] Start error:", e.message);
    res.status(500).json({ error: "Failed to start CAT exam" });
  }
});

router.get("/api/cat-exams/:sessionId", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const entitlement = resolveEntitlementSync(user, "feature", "cat_exams");
    if (!entitlement.hasAccess) {
      return res.status(403).json({ error: "CAT exam access requires premium subscription", isLocked: true });
    }

    const { sessionId } = req.params;
    const result = await pool.query(
      `SELECT id, user_id, tier, total_questions, status, cat_state, score, started_at, completed_at FROM mock_exam_attempts WHERE id = $1 AND user_id = $2 AND exam_type = 'cat'`,
      [sessionId, user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "CAT exam session not found" });
    }

    const attempt = result.rows[0];
    const catState = attempt.cat_state || {};

    let currentQuestion = null;
    if (attempt.status === "in_progress" && !catState.isPaused) {
      currentQuestion = await selectNextQuestion(attempt.id, attempt.tier, catState);
      if (currentQuestion) {
        currentQuestion = {
          id: currentQuestion.id,
          stem: currentQuestion.stem,
          options: (() => { try { return typeof currentQuestion.options === "string" ? JSON.parse(currentQuestion.options) : currentQuestion.options; } catch { return []; } })(),
          bodySystem: currentQuestion.body_system,
          topic: currentQuestion.topic,
          difficulty: currentQuestion.difficulty,
          questionType: currentQuestion.question_type,
        };
      }
    }

    await logActivity(user.id, "cat_session_viewed", {
      attemptId: attempt.id,
      status: attempt.status,
    }, catState.sessionId);

    res.json({
      attemptId: attempt.id,
      sessionId: catState.sessionId,
      status: attempt.status,
      tier: attempt.tier,
      totalQuestions: attempt.total_questions,
      questionsAnswered: (catState.questionsSeen || []).length,
      currentQuestion,
      questionNumber: (catState.questionsSeen || []).length + 1,
      catState: {
        currentAbility: catState.currentAbility || 0,
        standardError: catState.standardError || 1.0,
        questionCount: (catState.questionsSeen || []).length,
        isPaused: catState.isPaused || false,
      },
      score: attempt.score,
      startedAt: attempt.started_at,
      completedAt: attempt.completed_at,
    });
  } catch (e: any) {
    console.error("[CATSessionAPI] Get error:", e.message);
    res.status(500).json({ error: "Failed to get CAT exam" });
  }
});

router.post("/api/cat-exams/:sessionId/answer", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const entitlement = resolveEntitlementSync(user, "feature", "cat_exams");
    if (!entitlement.hasAccess) {
      return res.status(403).json({ error: "CAT exam access requires premium subscription", isLocked: true });
    }

    const { sessionId } = req.params;
    const parsed = answerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    }
    const { questionId, selectedAnswer, timeSpent } = parsed.data;

    const attemptResult = await pool.query(
      `SELECT id, user_id, tier, total_questions, status, cat_state, answers FROM mock_exam_attempts WHERE id = $1 AND user_id = $2 AND exam_type = 'cat' AND status = 'in_progress'`,
      [sessionId, user.id]
    );

    if (attemptResult.rows.length === 0) {
      return res.status(404).json({ error: "Active CAT exam session not found" });
    }

    const attempt = attemptResult.rows[0];
    const catState = attempt.cat_state || {};

    if ((catState.questionsSeen || []).includes(questionId)) {
      return res.status(409).json({ error: "Question already answered in this session", duplicate: true });
    }

    const qResult = await pool.query(
      `SELECT id, correct_answer, rationale, body_system, difficulty, question_type
       FROM exam_questions WHERE id = $1 AND status = 'published' AND tier = $2`,
      [questionId, attempt.tier]
    );

    if (qResult.rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    const question = qResult.rows[0];
    const correctAnswer = parseCorrectAnswer(question.correct_answer);
    const isCorrect = correctAnswer.includes(selectedAnswer);

    const difficulty = question.difficulty || 3;
    const prevAbility = catState.currentAbility || 0;
    const questionCount = (catState.questionsSeen || []).length + 1;
    const stepSize = Math.max(0.1, 1.0 / Math.sqrt(questionCount));
    const p = 1 / (1 + Math.exp(-1.7 * (prevAbility - difficulty)));
    const newAbility = isCorrect
      ? prevAbility + stepSize * (1 - p)
      : prevAbility - stepSize * p;
    const newSE = Math.max(0.2, (catState.standardError || 1.0) * 0.95);

    const responseRecord = {
      questionId,
      difficulty,
      isCorrect,
      timeSpent: timeSpent || 0,
      bodySystem: question.body_system,
      selectedAnswer,
    };

    const updatedCatState = {
      ...catState,
      currentAbility: Math.round(newAbility * 1000) / 1000,
      standardError: Math.round(newSE * 1000) / 1000,
      questionsSeen: [...(catState.questionsSeen || []), questionId],
      abilityTrajectory: [...(catState.abilityTrajectory || []), newAbility],
      responses: [...(catState.responses || []), responseRecord],
      version: (catState.version || 0) + 1,
    };

    const answers = attempt.answers || {};
    answers[questionId] = { selectedAnswer, isCorrect, timeSpent };

    const shouldStop = questionCount >= attempt.total_questions || (questionCount >= 85 && newSE < 0.33);

    if (shouldStop) {
      let correctCount = 0;
      for (const qId of updatedCatState.questionsSeen) {
        if (answers[qId]?.isCorrect) correctCount++;
      }
      const score = Math.round((correctCount / questionCount) * 100);

      await pool.query(
        `UPDATE mock_exam_attempts SET status = 'completed', score = $1, completed_at = NOW(),
         cat_state = cat_state || $2::jsonb,
         answers = COALESCE(answers, '{}'::jsonb) || $3::jsonb
         WHERE id = $4`,
        [
          score,
          JSON.stringify({
            currentAbility: updatedCatState.currentAbility,
            standardError: updatedCatState.standardError,
            questionsSeen: updatedCatState.questionsSeen,
            abilityTrajectory: updatedCatState.abilityTrajectory,
            responses: updatedCatState.responses,
            version: updatedCatState.version,
          }),
          JSON.stringify({ [questionId]: { selectedAnswer, isCorrect, timeSpent } }),
          sessionId,
        ]
      );

      await logActivity(user.id, "cat_session_completed", {
        attemptId: sessionId,
        finalAbility: newAbility,
        questionsAnswered: questionCount,
        score,
      }, catState.sessionId);
    } else {
      await pool.query(
        `UPDATE mock_exam_attempts SET
         cat_state = cat_state || $1::jsonb,
         answers = COALESCE(answers, '{}'::jsonb) || $2::jsonb
         WHERE id = $3`,
        [
          JSON.stringify({
            currentAbility: updatedCatState.currentAbility,
            standardError: updatedCatState.standardError,
            questionsSeen: updatedCatState.questionsSeen,
            abilityTrajectory: updatedCatState.abilityTrajectory,
            responses: updatedCatState.responses,
            version: updatedCatState.version,
          }),
          JSON.stringify({ [questionId]: { selectedAnswer, isCorrect, timeSpent } }),
          sessionId,
        ]
      );
    }

    await recordQuestionHistory(
      user.id, questionId, selectedAnswer, isCorrect,
      sessionId, catState.sessionId, timeSpent
    );

    await logActivity(user.id, "question_answered", {
      questionId, sourceType: "cat_exam", sourceId: sessionId, isCorrect, timeSpent,
      questionNumber: questionCount,
    }, catState.sessionId);

    let nextQuestion = null;
    if (!shouldStop) {
      const nextQ = await selectNextQuestion(sessionId, attempt.tier, updatedCatState);
      if (nextQ) {
        nextQuestion = {
          id: nextQ.id,
          stem: nextQ.stem,
          options: (() => { try { return typeof nextQ.options === "string" ? JSON.parse(nextQ.options) : nextQ.options; } catch { return []; } })(),
          bodySystem: nextQ.body_system,
          topic: nextQ.topic,
          difficulty: nextQ.difficulty,
          questionType: nextQ.question_type,
        };
      }
    }

    res.json({
      correct: isCorrect,
      correctAnswer,
      rationale: question.rationale,
      isComplete: shouldStop,
      nextQuestion,
      questionNumber: questionCount + 1,
      catState: {
        currentAbility: updatedCatState.currentAbility,
        standardError: updatedCatState.standardError,
        questionCount,
      },
    });
  } catch (e: any) {
    console.error("[CATSessionAPI] Answer error:", e.message);
    res.status(500).json({ error: "Failed to process answer" });
  }
});

router.post("/api/cat-exams/:sessionId/pause", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const entitlement = resolveEntitlementSync(user, "feature", "cat_exams");
    if (!entitlement.hasAccess) {
      return res.status(403).json({ error: "CAT exam access requires premium subscription", isLocked: true });
    }

    const { sessionId } = req.params;
    const result = await pool.query(
      `SELECT * FROM mock_exam_attempts WHERE id = $1 AND user_id = $2 AND exam_type = 'cat' AND status = 'in_progress'`,
      [sessionId, user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Active CAT session not found" });
    }

    const catState = result.rows[0].cat_state || {};
    catState.isPaused = true;
    catState.pausedAt = new Date().toISOString();
    catState.version = (catState.version || 0) + 1;

    await pool.query(
      `UPDATE mock_exam_attempts SET cat_state = $1, status = 'paused' WHERE id = $2`,
      [JSON.stringify(catState), sessionId]
    );

    await logActivity(user.id, "cat_session_paused", {
      attemptId: sessionId,
      questionsAnswered: (catState.questionsSeen || []).length,
    }, catState.sessionId);

    res.json({ success: true, status: "paused" });
  } catch (e: any) {
    console.error("[CATSessionAPI] Pause error:", e.message);
    res.status(500).json({ error: "Failed to pause session" });
  }
});

router.post("/api/cat-exams/:sessionId/resume", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const entitlement = resolveEntitlementSync(user, "feature", "cat_exams");
    if (!entitlement.hasAccess) {
      return res.status(403).json({ error: "CAT exam access requires premium subscription", isLocked: true });
    }

    const { sessionId } = req.params;
    const result = await pool.query(
      `SELECT * FROM mock_exam_attempts WHERE id = $1 AND user_id = $2 AND exam_type = 'cat' AND status = 'paused'`,
      [sessionId, user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Paused CAT session not found" });
    }

    const attempt = result.rows[0];
    const catState = attempt.cat_state || {};
    catState.isPaused = false;
    catState.resumedAt = new Date().toISOString();
    catState.version = (catState.version || 0) + 1;

    await pool.query(
      `UPDATE mock_exam_attempts SET cat_state = $1, status = 'in_progress' WHERE id = $2`,
      [JSON.stringify(catState), sessionId]
    );

    const nextQ = await selectNextQuestion(sessionId, attempt.tier, catState);

    await logActivity(user.id, "cat_session_resumed", {
      attemptId: sessionId,
      questionsAnswered: (catState.questionsSeen || []).length,
    }, catState.sessionId);

    res.json({
      success: true,
      status: "in_progress",
      currentQuestion: nextQ ? {
        id: nextQ.id,
        stem: nextQ.stem,
        options: typeof nextQ.options === "string" ? JSON.parse(nextQ.options) : nextQ.options,
        bodySystem: nextQ.body_system,
        topic: nextQ.topic,
        difficulty: nextQ.difficulty,
        questionType: nextQ.question_type,
      } : null,
      questionNumber: (catState.questionsSeen || []).length + 1,
      catState: {
        currentAbility: catState.currentAbility || 0,
        standardError: catState.standardError || 1.0,
        questionCount: (catState.questionsSeen || []).length,
      },
    });
  } catch (e: any) {
    console.error("[CATSessionAPI] Resume error:", e.message);
    res.status(500).json({ error: "Failed to resume session" });
  }
});

router.get("/api/cat-exams/:sessionId/results", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    const entitlement = resolveEntitlementSync(user, "feature", "cat_exams");
    if (!entitlement.hasAccess) {
      return res.status(403).json({ error: "CAT exam access requires premium subscription", isLocked: true });
    }

    const { sessionId } = req.params;
    const result = await pool.query(
      `SELECT * FROM mock_exam_attempts WHERE id = $1 AND user_id = $2 AND exam_type = 'cat' AND status = 'completed'`,
      [sessionId, user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Completed CAT exam not found" });
    }

    const attempt = result.rows[0];
    const catState = attempt.cat_state || {};
    const answers = attempt.answers || {};
    const questionsSeen = catState.questionsSeen || [];
    const responses = catState.responses || [];

    let correctCount = 0;
    for (const qId of questionsSeen) {
      if (answers[qId]?.isCorrect) correctCount++;
    }

    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    for (const r of responses) {
      const cat = r.bodySystem || "General";
      if (!categoryBreakdown[cat]) categoryBreakdown[cat] = { correct: 0, total: 0 };
      categoryBreakdown[cat].total++;
      if (r.isCorrect) categoryBreakdown[cat].correct++;
    }

    const difficultyBreakdown: Record<string, { correct: number; total: number }> = {};
    for (const r of responses) {
      const level = r.difficulty <= 2 ? "easy" : r.difficulty <= 3 ? "moderate" : "hard";
      if (!difficultyBreakdown[level]) difficultyBreakdown[level] = { correct: 0, total: 0 };
      difficultyBreakdown[level].total++;
      if (r.isCorrect) difficultyBreakdown[level].correct++;
    }

    const weakAreas = Object.entries(categoryBreakdown)
      .map(([cat, stats]) => ({
        category: cat,
        correct: stats.correct,
        total: stats.total,
        accuracy: Math.round((stats.correct / stats.total) * 100),
      }))
      .filter(a => a.accuracy < 60 && a.total >= 2)
      .sort((a, b) => a.accuracy - b.accuracy);

    const readinessLevel = catState.currentAbility >= 0.5
      ? "Above Passing Standard"
      : catState.currentAbility >= -0.3
        ? "Near Passing Standard"
        : "Below Passing Standard";

    res.json({
      attemptId: attempt.id,
      status: "completed",
      score: attempt.score,
      totalQuestions: questionsSeen.length,
      correctCount,
      finalAbility: catState.currentAbility,
      standardError: catState.standardError,
      abilityTrajectory: catState.abilityTrajectory || [],
      readinessLevel,
      categoryBreakdown: Object.entries(categoryBreakdown).map(([cat, stats]) => ({
        category: cat,
        correct: stats.correct,
        total: stats.total,
        accuracy: Math.round((stats.correct / stats.total) * 100),
      })),
      difficultyBreakdown: Object.entries(difficultyBreakdown).map(([level, stats]) => ({
        level,
        correct: stats.correct,
        total: stats.total,
        accuracy: Math.round((stats.correct / stats.total) * 100),
      })),
      weakAreas,
      startedAt: attempt.started_at,
      completedAt: attempt.completed_at,
    });

    await logActivity(user.id, "cat_results_viewed", {
      attemptId: attempt.id,
      score: attempt.score,
      readinessLevel,
    }, catState.sessionId);
  } catch (e: any) {
    console.error("[CATSessionAPI] Results error:", e.message);
    res.status(500).json({ error: "Failed to get results" });
  }
});

export function registerCatSessionApiRoutes(app: any) {
  app.use(router);
}
