import type { Express } from "express";
import { pool } from "./storage";

function getClientIp(req: any): string {
  return String(req.headers["x-forwarded-for"] || req.ip || "unknown").split(",")[0].trim();
}

function mapExamKeyToTier(examKey: string): string {
  const key = examKey.toLowerCase();
  if (key === "rex-pn" || key === "nclex-pn") return "rpn";
  if (key === "nclex-rn") return "rn";
  if (key.startsWith("np-") || key === "aanp" || key === "ancc") return "np";
  return "rpn";
}

async function requireAdmin(req: any, res: any): Promise<any> {
  const username = String(req.body?.username || req.query?.username || "");
  const password = String(req.body?.password || req.query?.password || "");
  if (username && password) {
    const r = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2 AND tier = 'admin'", [username, password]);
    if (r.rows[0]) return r.rows[0];
  }
  const adminId = String(req.headers?.["x-admin-id"] || req.body?.adminId || req.query?.adminId || "");
  if (adminId) {
    const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
    if (r.rows[0]) return r.rows[0];
  }
  res.status(401).json({ error: "Admin required" });
  return null;
}

export function setupTrialRoutes(app: Express): void {

  app.post("/api/trial/start", async (req, res) => {
    try {
      const { examKey, timerEnabled, deviceFingerprint, userId } = req.body;
      if (!examKey) {
        return res.status(400).json({ error: "examKey is required" });
      }

      const ip = getClientIp(req);
      const tier = mapExamKeyToTier(examKey);

      const abuseCheck = await pool.query(
        `SELECT id FROM trial_sessions
         WHERE exam_key = $1 AND status = 'completed'
         AND (ip_address = $2 OR ($3::text IS NOT NULL AND device_fingerprint = $3))
         AND started_at > NOW() - INTERVAL '30 days'
         LIMIT 1`,
        [examKey, ip, deviceFingerprint || null]
      );

      if (abuseCheck.rows.length > 0) {
        return res.status(409).json({
          error: "Trial already used for this exam",
          message: "You've already taken a trial for this exam. Upgrade to unlock unlimited practice.",
        });
      }

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const result = await pool.query(
        `INSERT INTO trial_sessions (exam_key, tier, status, total_questions, user_id, ip_address, device_fingerprint, timer_enabled, expires_at)
         VALUES ($1, $2, 'started', 50, $3, $4, $5, $6, $7)
         RETURNING id, exam_key, tier, total_questions, expires_at`,
        [examKey, tier, userId || null, ip, deviceFingerprint || null, !!timerEnabled, expiresAt]
      );

      const session = result.rows[0];
      res.json({
        sessionId: session.id,
        examKey: session.exam_key,
        tier: session.tier,
        totalQuestions: session.total_questions,
        expiresAt: session.expires_at,
      });
    } catch (err: any) {
      console.error("[Trial] Start error:", err.message);
      res.status(500).json({ error: "Failed to start trial session" });
    }
  });

  app.post("/api/trial/:sessionId/save-questions", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { questions } = req.body;

      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ error: "questions array is required" });
      }

      const check = await pool.query("SELECT id, status FROM trial_sessions WHERE id = $1", [sessionId]);
      if (!check.rows[0]) {
        return res.status(404).json({ error: "Session not found" });
      }
      if (check.rows[0].status !== "started") {
        return res.status(400).json({ error: "Questions already saved for this session" });
      }

      await pool.query(
        `UPDATE trial_sessions SET questions = $1, status = 'in_progress' WHERE id = $2`,
        [JSON.stringify(questions), sessionId]
      );

      res.json({ success: true, questionsCount: questions.length });
    } catch (err: any) {
      console.error("[Trial] Save questions error:", err.message);
      res.status(500).json({ error: "Failed to save questions" });
    }
  });

  app.post("/api/trial/:sessionId/submit-answer", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { questionIndex, selectedAnswer, timeSpent } = req.body;

      if (questionIndex === undefined || selectedAnswer === undefined) {
        return res.status(400).json({ error: "questionIndex and selectedAnswer are required" });
      }

      const session = await pool.query(
        "SELECT id, status, questions, answers, questions_answered, total_questions FROM trial_sessions WHERE id = $1",
        [sessionId]
      );
      if (!session.rows[0]) {
        return res.status(404).json({ error: "Session not found" });
      }
      const s = session.rows[0];
      if (s.status !== "in_progress") {
        return res.status(400).json({ error: "Session is not in progress" });
      }

      const questions = typeof s.questions === "string" ? JSON.parse(s.questions) : s.questions;
      const answers = typeof s.answers === "string" ? JSON.parse(s.answers) : (s.answers || {});

      const question = questions[questionIndex];
      const isCorrect = question ? selectedAnswer === question.correct : false;

      answers[String(questionIndex)] = {
        selected: selectedAnswer,
        timeSpent: timeSpent || 0,
        correct: isCorrect,
      };

      const answeredCount = Object.keys(answers).length;
      const newIndex = questionIndex + 1;

      await pool.query(
        `UPDATE trial_sessions SET answers = $1, questions_answered = $2, current_index = $3 WHERE id = $4`,
        [JSON.stringify(answers), answeredCount, newIndex, sessionId]
      );

      res.json({
        questionsAnswered: answeredCount,
        totalQuestions: s.total_questions,
        currentIndex: newIndex,
      });
    } catch (err: any) {
      console.error("[Trial] Submit answer error:", err.message);
      res.status(500).json({ error: "Failed to submit answer" });
    }
  });

  app.post("/api/trial/:sessionId/complete", async (req, res) => {
    try {
      const { sessionId } = req.params;

      const session = await pool.query(
        "SELECT * FROM trial_sessions WHERE id = $1",
        [sessionId]
      );
      if (!session.rows[0]) {
        return res.status(404).json({ error: "Session not found" });
      }
      const s = session.rows[0];
      if (s.status === "completed") {
        return res.json(typeof s.report === "string" ? JSON.parse(s.report) : s.report);
      }

      const questions = typeof s.questions === "string" ? JSON.parse(s.questions) : (s.questions || []);
      const answers = typeof s.answers === "string" ? JSON.parse(s.answers) : (s.answers || {});

      let totalCorrect = 0;
      let totalIncorrect = 0;
      let totalTimeSpent = 0;
      let fastestTime = Infinity;
      let slowestTime = 0;
      const domainCorrect: Record<string, number> = {};
      const domainTotal: Record<string, number> = {};

      for (const [idx, answer] of Object.entries(answers) as [string, any][]) {
        const q = questions[parseInt(idx)];
        const bodySystem = q?.bodySystem || "General";

        if (!domainTotal[bodySystem]) domainTotal[bodySystem] = 0;
        if (!domainCorrect[bodySystem]) domainCorrect[bodySystem] = 0;
        domainTotal[bodySystem]++;

        if (answer.correct) {
          totalCorrect++;
          domainCorrect[bodySystem]++;
        } else {
          totalIncorrect++;
        }

        const t = answer.timeSpent || 0;
        totalTimeSpent += t;
        if (t > 0 && t < fastestTime) fastestTime = t;
        if (t > slowestTime) slowestTime = t;
      }

      if (fastestTime === Infinity) fastestTime = 0;

      const total = totalCorrect + totalIncorrect;
      const score = total > 0 ? totalCorrect / total : 0;
      const percentage = Math.round(score * 100);

      const domainScores: Record<string, { correct: number; total: number; percentage: number }> = {};
      const weakDomains: string[] = [];
      const strongDomains: string[] = [];

      for (const domain of Object.keys(domainTotal)) {
        const correct = domainCorrect[domain] || 0;
        const dt = domainTotal[domain];
        const pct = dt > 0 ? Math.round((correct / dt) * 100) : 0;
        domainScores[domain] = { correct, total: dt, percentage: pct };
        if (pct < 60) weakDomains.push(domain);
        if (pct >= 70) strongDomains.push(domain);
      }

      let difficultyEstimate: number;
      if (score > 0.8) difficultyEstimate = 4;
      else if (score > 0.6) difficultyEstimate = 3;
      else if (score > 0.4) difficultyEstimate = 2;
      else difficultyEstimate = 1;

      let readinessLevel: string;
      if (score >= 0.75) readinessLevel = "Exam Ready";
      else if (score >= 0.55) readinessLevel = "Moderate";
      else if (score >= 0.40) readinessLevel = "Borderline";
      else readinessLevel = "Very Low";

      const avgTimePerQuestion = total > 0 ? Math.round(totalTimeSpent / total) : 0;

      const report = {
        score: totalCorrect,
        percentage,
        domainScores,
        readinessLevel,
        difficultyEstimate,
        totalCorrect,
        totalIncorrect,
        totalQuestions: total,
        avgTimePerQuestion,
        fastestQuestion: fastestTime,
        slowestQuestion: slowestTime,
        completionTimeSeconds: totalTimeSpent,
        weakDomains,
        strongDomains,
      };

      await pool.query(
        `UPDATE trial_sessions SET
          report = $1, readiness_level = $2, difficulty_estimate = $3,
          completion_time_seconds = $4, status = 'completed', completed_at = NOW(),
          domain_scores = $5
         WHERE id = $6`,
        [
          JSON.stringify(report), readinessLevel, difficultyEstimate,
          totalTimeSpent, JSON.stringify(domainScores), sessionId,
        ]
      );

      res.json(report);
    } catch (err: any) {
      console.error("[Trial] Complete error:", err.message);
      res.status(500).json({ error: "Failed to complete trial session" });
    }
  });

  app.get("/api/trial/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;

      const result = await pool.query("SELECT * FROM trial_sessions WHERE id = $1", [sessionId]);
      if (!result.rows[0]) {
        return res.status(404).json({ error: "Session not found" });
      }

      const s = result.rows[0];

      if (s.expires_at && new Date(s.expires_at) < new Date() && s.status !== "completed") {
        return res.json({
          id: s.id,
          examKey: s.exam_key,
          tier: s.tier,
          status: "expired",
          totalQuestions: s.total_questions,
          questionsAnswered: s.questions_answered,
          currentIndex: s.current_index,
          timerEnabled: s.timer_enabled,
          expiresAt: s.expires_at,
          startedAt: s.started_at,
        });
      }

      const questions = typeof s.questions === "string" ? JSON.parse(s.questions) : s.questions;
      const answers = typeof s.answers === "string" ? JSON.parse(s.answers) : s.answers;
      const report = typeof s.report === "string" ? JSON.parse(s.report) : s.report;

      res.json({
        id: s.id,
        userId: s.user_id,
        examKey: s.exam_key,
        tier: s.tier,
        status: s.status,
        totalQuestions: s.total_questions,
        questionsAnswered: s.questions_answered,
        currentIndex: s.current_index,
        questions,
        answers,
        report,
        readinessLevel: s.readiness_level,
        difficultyEstimate: s.difficulty_estimate,
        completionTimeSeconds: s.completion_time_seconds,
        timerEnabled: s.timer_enabled,
        expiresAt: s.expires_at,
        startedAt: s.started_at,
        completedAt: s.completed_at,
      });
    } catch (err: any) {
      console.error("[Trial] Get session error:", err.message);
      res.status(500).json({ error: "Failed to get trial session" });
    }
  });

  app.get("/api/admin/trial/analytics", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const statsResult = await pool.query(`
        SELECT
          COUNT(*)::int AS total_trials,
          COUNT(*) FILTER (WHERE status = 'completed')::int AS completed_trials,
          ROUND(AVG(CASE WHEN status = 'completed' AND report IS NOT NULL
            THEN (report->>'percentage')::numeric ELSE NULL END), 1) AS average_score,
          COUNT(*) FILTER (WHERE readiness_level = 'Very Low')::int AS very_low,
          COUNT(*) FILTER (WHERE readiness_level = 'Borderline')::int AS borderline,
          COUNT(*) FILTER (WHERE readiness_level = 'Moderate')::int AS moderate,
          COUNT(*) FILTER (WHERE readiness_level = 'Exam Ready')::int AS exam_ready
        FROM trial_sessions
      `);

      const stats = statsResult.rows[0] || {};

      const examBreakdownResult = await pool.query(`
        SELECT exam_key, COUNT(*)::int AS count,
          COUNT(*) FILTER (WHERE status = 'completed')::int AS completed
        FROM trial_sessions
        GROUP BY exam_key
        ORDER BY count DESC
      `);

      const recentResult = await pool.query(`
        SELECT id, exam_key, tier, status, readiness_level, difficulty_estimate,
          questions_answered, total_questions, completion_time_seconds,
          started_at, completed_at
        FROM trial_sessions
        ORDER BY created_at DESC
        LIMIT 20
      `);

      const completedTrials = stats.completed_trials || 0;
      const readinessDistribution = {
        veryLow: stats.very_low || 0,
        borderline: stats.borderline || 0,
        moderate: stats.moderate || 0,
        examReady: stats.exam_ready || 0,
      };

      const readinessValues: Record<string, number> = { "Very Low": 1, "Borderline": 2, "Moderate": 3, "Exam Ready": 4 };
      let readinessSum = 0;
      let readinessCount = 0;
      for (const [level, val] of Object.entries(readinessValues)) {
        const count = readinessDistribution[level === "Very Low" ? "veryLow" : level === "Exam Ready" ? "examReady" : level.toLowerCase() as keyof typeof readinessDistribution] || 0;
        readinessSum += val * count;
        readinessCount += count;
      }
      const averageReadiness = readinessCount > 0 ? Math.round((readinessSum / readinessCount) * 10) / 10 : 0;

      const examKeyBreakdown: Record<string, { total: number; completed: number }> = {};
      for (const row of examBreakdownResult.rows) {
        examKeyBreakdown[row.exam_key] = { total: row.count, completed: row.completed };
      }

      res.json({
        totalTrials: stats.total_trials || 0,
        completedTrials,
        averageScore: stats.average_score ? Number(stats.average_score) : 0,
        averageReadiness,
        conversionRate: 0,
        readinessDistribution,
        examKeyBreakdown,
        recentTrials: recentResult.rows.map((r: any) => ({
          id: r.id,
          examKey: r.exam_key,
          tier: r.tier,
          status: r.status,
          readinessLevel: r.readiness_level,
          difficultyEstimate: r.difficulty_estimate,
          questionsAnswered: r.questions_answered,
          totalQuestions: r.total_questions,
          completionTimeSeconds: r.completion_time_seconds,
          startedAt: r.started_at,
          completedAt: r.completed_at,
        })),
      });
    } catch (err: any) {
      console.error("[Trial] Analytics error:", err.message);
      res.status(500).json({ error: "Failed to get trial analytics" });
    }
  });
}
