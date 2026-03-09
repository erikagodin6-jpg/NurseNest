import type { Express } from "express";
import { pool } from "./storage";
import { resolveAuthUser } from "./admin-auth";
import rateLimit from "express-rate-limit";
import { getAllowedExamTiers } from "../shared/tier-config";

function getPreviewTier(req: any, userTier: string): string {
  if (userTier !== "admin") return userTier;
  const previewToken = (req.cookies?.nursenest_preview || "") as string;
  if (!previewToken) return userTier;
  return userTier;
}

const qbankLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: "Too many requests. Please try again later." },
  validate: { xForwardedForHeader: false, trustProxy: false },
});

export function setupQBankRoutes(app: Express) {
  app.get("/api/qbank", qbankLimiter, async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required", upgradeRequired: true });
      }

      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
        if (!["rpn", "rn", "np"].includes(queryTier)) queryTier = "rpn";
      } else {
        const requestedTier = (req.query.tier as string) || userTier;
        const allowed = getAllowedExamTiers(userTier);
        queryTier = allowed.includes(requestedTier) ? requestedTier : (allowed[0] || userTier);
      }

      const limit = Math.min(parseInt(req.query.limit as string) || 50, 50);
      const offset = parseInt(req.query.offset as string) || 0;
      const bodySystem = req.query.bodySystem as string;
      const shuffle = req.query.shuffle === "true";

      let query = `SELECT id, tier, exam, question_type, stem, options, body_system, topic, difficulty
                   FROM exam_questions
                   WHERE tier = $1 AND status = 'published'`;
      const params: any[] = [queryTier];
      let paramIdx = 2;

      if (bodySystem) {
        query += ` AND body_system = $${paramIdx}`;
        params.push(bodySystem);
        paramIdx++;
      }

      if (shuffle) {
        query += ` ORDER BY RANDOM()`;
      } else {
        query += ` ORDER BY created_at`;
      }

      query += ` LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      const countResult = await pool.query(
        `SELECT COUNT(*) FROM exam_questions WHERE tier = $1 AND status = 'published'`,
        [queryTier]
      );

      res.json({
        questions: result.rows.map((row: any) => ({
          id: row.id,
          tier: row.tier,
          exam: row.exam,
          questionType: row.question_type,
          stem: row.stem,
          options: typeof row.options === "string" ? JSON.parse(row.options) : row.options,
          bodySystem: row.body_system,
          topic: row.topic,
          difficulty: row.difficulty,
        })),
        total: parseInt(countResult.rows[0].count),
        limit,
        offset,
        tier: queryTier,
      });
    } catch (e: any) {
      console.error("QBank fetch error:", e.message);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/qbank/attempt", qbankLimiter, async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required" });
      }

      const { questionId, selectedOption } = req.body;
      if (!questionId || selectedOption === undefined) {
        return res.status(400).json({ error: "questionId and selectedOption required" });
      }

      const queryTier = userTier === "admin" ? undefined : userTier;
      let query = `SELECT id, tier, stem, options, correct_answer, rationale, body_system FROM exam_questions WHERE id = $1`;
      const params: any[] = [questionId];

      if (queryTier) {
        query += ` AND tier = $2`;
        params.push(queryTier);
      }

      const result = await pool.query(query, params);
      if (result.rows.length === 0) {
        return res.status(403).json({ error: "Question not accessible for your tier" });
      }

      const question = result.rows[0];
      const correctAnswer = typeof question.correct_answer === "string"
        ? JSON.parse(question.correct_answer)
        : question.correct_answer;
      const isCorrect = Array.isArray(correctAnswer)
        ? correctAnswer.includes(selectedOption)
        : selectedOption === correctAnswer;

      res.json({
        correct: isCorrect,
        correctAnswer,
        rationale: question.rationale,
        bodySystem: question.body_system,
      });
    } catch (e: any) {
      console.error("QBank attempt error:", e.message);
      res.status(500).json({ error: "Failed to process answer" });
    }
  });

  app.get("/api/qbank/stats", async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required" });
      }

      const queryTier = userTier === "admin" ? null : userTier;

      let query: string;
      let params: any[];

      if (queryTier) {
        query = `SELECT body_system, COUNT(*) as count
                 FROM exam_questions
                 WHERE tier = $1 AND status = 'published'
                 GROUP BY body_system
                 ORDER BY count DESC`;
        params = [queryTier];
      } else {
        query = `SELECT tier, body_system, COUNT(*) as count
                 FROM exam_questions
                 WHERE status = 'published'
                 GROUP BY tier, body_system
                 ORDER BY tier, count DESC`;
        params = [];
      }

      const result = await pool.query(query, params);

      const totalQuery = queryTier
        ? `SELECT COUNT(*) FROM exam_questions WHERE tier = $1 AND status = 'published'`
        : `SELECT COUNT(*) FROM exam_questions WHERE status = 'published'`;
      const totalResult = await pool.query(totalQuery, queryTier ? [queryTier] : []);

      res.json({
        bodySystems: result.rows,
        total: parseInt(totalResult.rows[0].count),
        tier: queryTier || "all",
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/qbank/body-systems", async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
      } else if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required" });
      } else {
        queryTier = userTier;
      }

      const result = await pool.query(
        `SELECT DISTINCT body_system FROM exam_questions WHERE tier = $1 AND status = 'published' AND body_system IS NOT NULL ORDER BY body_system`,
        [queryTier]
      );

      res.json({
        bodySystems: result.rows.map((r: any) => r.body_system),
        tier: queryTier,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/qbank/exam-set", qbankLimiter, async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required" });
      }

      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
        if (!["rpn", "rn", "np"].includes(queryTier)) queryTier = "rpn";
      } else {
        const requestedTier = (req.query.tier as string) || userTier;
        const allowed = getAllowedExamTiers(userTier);
        queryTier = allowed.includes(requestedTier) ? requestedTier : (allowed[0] || userTier);
      }

      const count = Math.min(parseInt(req.query.count as string) || 25, 200);
      const bodySystems = req.query.bodySystems ? (req.query.bodySystems as string).split(",") : [];

      let query = `SELECT id, tier, exam, question_type, stem, options, correct_answer, rationale, body_system, topic, difficulty, scenario, clinical_pearl, exam_strategy, memory_hook, framework_used, clinical_trap, distractor_rationales
                   FROM exam_questions
                   WHERE tier = $1 AND status = 'published'`;
      const params: any[] = [queryTier];
      let paramIdx = 2;

      if (bodySystems.length > 0) {
        query += ` AND body_system = ANY($${paramIdx})`;
        params.push(bodySystems);
        paramIdx++;
      }

      query += ` ORDER BY RANDOM() LIMIT $${paramIdx}`;
      params.push(count);

      const result = await pool.query(query, params);

      res.json({
        questions: result.rows.map((row: any) => ({
          id: row.id,
          tier: row.tier,
          exam: row.exam,
          questionType: row.question_type,
          stem: row.stem,
          options: typeof row.options === "string" ? JSON.parse(row.options) : row.options,
          correctAnswer: typeof row.correct_answer === "string" ? JSON.parse(row.correct_answer) : row.correct_answer,
          rationale: row.rationale,
          bodySystem: row.body_system,
          topic: row.topic,
          difficulty: row.difficulty,
          scenario: row.scenario,
          clinicalPearl: row.clinical_pearl,
          examStrategy: row.exam_strategy,
          memoryHook: row.memory_hook,
          frameworkUsed: row.framework_used,
          clinicalTrap: row.clinical_trap,
          distractorRationales: typeof row.distractor_rationales === "string" ? JSON.parse(row.distractor_rationales) : row.distractor_rationales,
        })),
        count: result.rows.length,
        tier: queryTier,
      });
    } catch (e: any) {
      console.error("QBank exam-set error:", e.message);
      res.status(500).json({ error: "Failed to fetch exam set" });
    }
  });
}
