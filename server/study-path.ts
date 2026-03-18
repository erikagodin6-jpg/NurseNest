import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";

function getClientIp(req: any): string {
  return String(req.headers["x-forwarded-for"] || req.ip || "unknown").split(",")[0].trim();
}

const NURSING_DOMAINS = [
  "Cardiovascular", "Respiratory", "Neurological", "Gastrointestinal",
  "Renal", "Endocrine", "Hematology", "Musculoskeletal",
  "Maternity", "Pediatrics", "Mental Health", "Pharmacology",
  "Infection Control", "Safety", "Leadership"
];

function buildWeeklySchedule(
  weakTopics: string[],
  strongTopics: string[],
  planLengthWeeks: number,
  minutesPerDay: number
): any[] {
  const topicSet = new Set([...weakTopics, ...NURSING_DOMAINS.filter(d => !strongTopics.includes(d))]);
  const allTopics = Array.from(topicSet);
  const weeks: any[] = [];

  for (let w = 1; w <= planLengthWeeks; w++) {
    const isReviewWeek = w === planLengthWeeks;
    const weekDays: any[] = [];

    for (let d = 1; d <= 7; d++) {
      const tasks: any[] = [];
      let remainingMinutes = minutesPerDay;

      if (isReviewWeek) {
        tasks.push({
          type: "review",
          domain: "All Domains",
          title: `Comprehensive Review - Day ${d}`,
          minutes: Math.min(Math.floor(remainingMinutes * 0.5), remainingMinutes),
        });
        remainingMinutes -= tasks[0].minutes;
        if (remainingMinutes > 0) {
          tasks.push({
            type: "practice",
            domain: weakTopics[d % weakTopics.length] || "General",
            title: `Practice Questions - Weak Areas`,
            minutes: remainingMinutes,
          });
        }
      } else {
        const topicIndex = ((w - 1) * 7 + (d - 1)) % allTopics.length;
        const primaryTopic = allTopics[topicIndex];
        const isWeakTopic = weakTopics.includes(primaryTopic);

        const lessonMinutes = Math.floor(remainingMinutes * 0.4);
        tasks.push({
          type: "lesson",
          domain: primaryTopic,
          title: `Study: ${primaryTopic}`,
          minutes: lessonMinutes,
        });
        remainingMinutes -= lessonMinutes;

        const practiceMinutes = Math.floor(remainingMinutes * (isWeakTopic ? 0.7 : 0.5));
        tasks.push({
          type: "practice",
          domain: primaryTopic,
          title: `Practice Questions: ${primaryTopic}`,
          minutes: practiceMinutes,
        });
        remainingMinutes -= practiceMinutes;

        if (remainingMinutes > 0) {
          const remediationType = isWeakTopic ? "remediation" : "flashcard";
          tasks.push({
            type: remediationType,
            domain: primaryTopic,
            title: isWeakTopic ? `Remediation: ${primaryTopic}` : `Flashcard Review: ${primaryTopic}`,
            minutes: remainingMinutes,
          });
        }
      }

      weekDays.push({
        dayNum: d,
        title: isReviewWeek ? `Review Day ${d}` : `Week ${w} - Day ${d}`,
        focusDomains: [allTopics[((w - 1) * 7 + (d - 1)) % allTopics.length] || "General"],
        tasks,
      });
    }

    weeks.push({
      weekNum: w,
      title: isReviewWeek ? "Final Review Week" : `Week ${w}: ${allTopics.slice(((w - 1) * 3) % allTopics.length, ((w - 1) * 3) % allTopics.length + 3).join(", ")}`,
      days: weekDays,
    });
  }

  return weeks;
}

function calculatePlanLength(readinessLevel: string, examDate: Date | null): number {
  if (examDate) {
    const now = new Date();
    const diffMs = examDate.getTime() - now.getTime();
    const diffWeeks = Math.max(1, Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000)));
    return Math.min(diffWeeks, 12);
  }

  switch (readinessLevel) {
    case "Exam Ready": return 2;
    case "Moderate": return 4;
    case "Borderline": return 6;
    case "Very Low": return 8;
    default: return 4;
  }
}

export function setupStudyPathRoutes(app: Express): void {

  app.post("/api/study-plan/generate", async (req, res) => {
    try {
      const {
        userId,
        trialSessionId,
        examKey,
        region,
        examDate,
        minutesPerDay,
        stylePreference,
      } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      let weakTopics: string[] = [];
      let strongTopics: string[] = [];
      let readinessLevel = "Moderate";
      let tier = "rpn";
      let domainScores: Record<string, any> = {};
      let quizResults: any = null;

      if (trialSessionId) {
        const sessionResult = await pool.query(
          "SELECT * FROM trial_sessions WHERE id = $1",
          [trialSessionId]
        );
        if (sessionResult.rows[0]) {
          const session = sessionResult.rows[0];
          readinessLevel = session.readiness_level || "Moderate";
          tier = session.tier || "rpn";
          domainScores = typeof session.domain_scores === "string"
            ? JSON.parse(session.domain_scores)
            : (session.domain_scores || {});

          const report = typeof session.report === "string"
            ? JSON.parse(session.report)
            : (session.report || {});

          weakTopics = report.weakDomains || [];
          strongTopics = report.strongDomains || [];
          quizResults = {
            source: "trial",
            sessionId: trialSessionId,
            score: report.percentage || 0,
            totalQuestions: report.totalQuestions || 0,
            domainScores,
          };
        }
      }

      if (!trialSessionId && examKey) {
        const mockResult = await pool.query(
          `SELECT id, user_id, status, report, tier, score, completed_at
           FROM mock_exam_attempts
           WHERE user_id = $1 AND status = 'completed'
           ORDER BY completed_at DESC LIMIT 1`,
          [userId]
        );
        if (mockResult.rows[0]) {
          const mock = mockResult.rows[0];
          const report = typeof mock.report === "string"
            ? JSON.parse(mock.report)
            : (mock.report || {});
          tier = mock.tier || "rpn";
          weakTopics = report.weakDomains || [];
          strongTopics = report.strongDomains || [];
          readinessLevel = report.readinessLevel || "Moderate";
          domainScores = report.domainScores || {};
          quizResults = {
            source: "mock_exam",
            score: report.percentage || 0,
            totalQuestions: report.totalQuestions || 0,
            domainScores,
          };
        }
      }

      if (weakTopics.length === 0) {
        weakTopics = NURSING_DOMAINS.slice(0, 5);
      }

      const parsedExamDate = examDate ? new Date(examDate) : null;
      const planLengthWeeks = calculatePlanLength(readinessLevel, parsedExamDate);
      const effectiveMinutes = minutesPerDay || 30;

      const weeklySchedule = buildWeeklySchedule(weakTopics, strongTopics, planLengthWeeks, effectiveMinutes);

      await pool.query(
        `UPDATE study_plans SET is_active = false, updated_at = NOW()
         WHERE user_id = $1 AND is_active = true`,
        [userId]
      );

      const planResult = await pool.query(
        `INSERT INTO study_plans (
          id, user_id, tier, timeframe_weeks, minutes_per_day, exam_date,
          exam_type, style_preference, domain_ratings, quiz_results,
          preferences, is_active, progress_percent, career_type, created_at, updated_at
        ) VALUES (
          gen_random_uuid(), $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, true, 0, 'nursing', NOW(), NOW()
        ) RETURNING *`,
        [
          userId,
          tier,
          planLengthWeeks,
          effectiveMinutes,
          parsedExamDate,
          examKey || null,
          stylePreference || "read_then_practice",
          JSON.stringify(domainScores),
          JSON.stringify(quizResults),
          JSON.stringify({
            region: region || "US",
            weakTopics,
            strongTopics,
            readinessLevel,
          }),
        ]
      );

      const plan = planResult.rows[0];

      for (const week of weeklySchedule) {
        for (const day of week.days) {
          const dayResult = await pool.query(
            `INSERT INTO study_plan_days (id, study_plan_id, week_num, day_num, title, focus_domains)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING id`,
            [plan.id, week.weekNum, day.dayNum, day.title, JSON.stringify(day.focusDomains)]
          );
          const dayId = dayResult.rows[0].id;

          for (const task of day.tasks) {
            await pool.query(
              `INSERT INTO study_plan_tasks (id, day_id, type, domain, title, minutes, status)
               VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'todo')`,
              [dayId, task.type, task.domain, task.title, task.minutes]
            );
          }
        }
      }

      res.json({
        id: plan.id,
        userId: plan.user_id,
        tier: plan.tier,
        timeframeWeeks: plan.timeframe_weeks,
        minutesPerDay: plan.minutes_per_day,
        examDate: plan.exam_date,
        examType: plan.exam_type,
        readinessLevel,
        weakTopics,
        strongTopics,
        weeklySchedule,
        progressPercent: 0,
        isActive: true,
        createdAt: plan.created_at,
      });
    } catch (err: any) {
      console.error("[StudyPath] Generate error:", err.message);
      res.status(500).json({ error: "Failed to generate study plan" });
    }
  });

  app.get("/api/study-plan/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      const planResult = await pool.query(
        `SELECT * FROM study_plans WHERE user_id = $1 AND is_active = true ORDER BY created_at DESC LIMIT 1`,
        [userId]
      );

      if (!planResult.rows[0]) {
        return res.status(404).json({ error: "No active study plan found" });
      }

      const plan = planResult.rows[0];

      const daysResult = await pool.query(
        `SELECT * FROM study_plan_days WHERE study_plan_id = $1 ORDER BY week_num, day_num`,
        [plan.id]
      );

      const dayIds = daysResult.rows.map((d: any) => d.id);
      let tasks: any[] = [];
      if (dayIds.length > 0) {
        const tasksResult = await pool.query(
          `SELECT * FROM study_plan_tasks WHERE day_id = ANY($1) ORDER BY id`,
          [dayIds]
        );
        tasks = tasksResult.rows;
      }

      const tasksByDay: Record<string, any[]> = {};
      for (const task of tasks) {
        if (!tasksByDay[task.day_id]) tasksByDay[task.day_id] = [];
        tasksByDay[task.day_id].push({
          id: task.id,
          type: task.type,
          domain: task.domain,
          title: task.title,
          minutes: task.minutes,
          status: task.status,
          completedAt: task.completed_at,
          linkUrl: task.link_url,
          resourceId: task.resource_id,
        });
      }

      const weeklySchedule: any[] = [];
      const weekMap: Record<number, any> = {};

      for (const day of daysResult.rows) {
        if (!weekMap[day.week_num]) {
          weekMap[day.week_num] = {
            weekNum: day.week_num,
            title: `Week ${day.week_num}`,
            days: [],
          };
        }
        weekMap[day.week_num].days.push({
          dayNum: day.day_num,
          title: day.title,
          focusDomains: day.focus_domains,
          tasks: tasksByDay[day.id] || [],
        });
      }

      for (const weekNum of Object.keys(weekMap).map(Number).sort((a, b) => a - b)) {
        weeklySchedule.push(weekMap[weekNum]);
      }

      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((t: any) => t.status === "completed").length;
      const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      if (progressPercent !== plan.progress_percent) {
        await pool.query(
          `UPDATE study_plans SET progress_percent = $1, updated_at = NOW() WHERE id = $2`,
          [progressPercent, plan.id]
        );
      }

      const preferences = typeof plan.preferences === "string"
        ? JSON.parse(plan.preferences)
        : (plan.preferences || {});

      res.json({
        id: plan.id,
        userId: plan.user_id,
        tier: plan.tier,
        timeframeWeeks: plan.timeframe_weeks,
        minutesPerDay: plan.minutes_per_day,
        examDate: plan.exam_date,
        examType: plan.exam_type,
        stylePreference: plan.style_preference,
        readinessLevel: preferences.readinessLevel || null,
        weakTopics: preferences.weakTopics || [],
        strongTopics: preferences.strongTopics || [],
        weeklySchedule,
        progressPercent,
        totalTasks,
        completedTasks,
        isActive: plan.is_active,
        createdAt: plan.created_at,
        updatedAt: plan.updated_at,
      });
    } catch (err: any) {
      console.error("[StudyPath] Get plan error:", err.message);
      res.status(500).json({ error: "Failed to get study plan" });
    }
  });

  app.post("/api/study-plan/:id/update-progress", async (req, res) => {
    try {
      const { id } = req.params;
      const { taskId, status } = req.body;

      if (!taskId || !status) {
        return res.status(400).json({ error: "taskId and status are required" });
      }

      const validStatuses = ["todo", "in_progress", "completed", "skipped"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
      }

      const planCheck = await pool.query(
        "SELECT id, user_id FROM study_plans WHERE id = $1",
        [id]
      );
      if (!planCheck.rows[0]) {
        return res.status(404).json({ error: "Study plan not found" });
      }

      const completedAt = status === "completed" ? "NOW()" : "NULL";
      await pool.query(
        `UPDATE study_plan_tasks SET status = $1, completed_at = ${status === "completed" ? "NOW()" : "NULL"}
         WHERE id = $2`,
        [status, taskId]
      );

      const dayResult = await pool.query(
        "SELECT day_id FROM study_plan_tasks WHERE id = $1",
        [taskId]
      );
      if (!dayResult.rows[0]) {
        return res.status(404).json({ error: "Task not found" });
      }

      const allDaysResult = await pool.query(
        "SELECT id FROM study_plan_days WHERE study_plan_id = $1",
        [id]
      );
      const allDayIds = allDaysResult.rows.map((d: any) => d.id);

      let totalTasks = 0;
      let completedTasks = 0;
      if (allDayIds.length > 0) {
        const statsResult = await pool.query(
          `SELECT COUNT(*)::int AS total,
                  COUNT(*) FILTER (WHERE status = 'completed')::int AS completed
           FROM study_plan_tasks WHERE day_id = ANY($1)`,
          [allDayIds]
        );
        totalTasks = statsResult.rows[0]?.total || 0;
        completedTasks = statsResult.rows[0]?.completed || 0;
      }

      const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      const planStatus = progressPercent >= 100 ? "completed" : "active";
      await pool.query(
        `UPDATE study_plans SET progress_percent = $1, updated_at = NOW() WHERE id = $2`,
        [progressPercent, id]
      );

      if (progressPercent >= 100) {
        await pool.query(
          `UPDATE study_plans SET is_active = false, updated_at = NOW() WHERE id = $1`,
          [id]
        );
      }

      res.json({
        planId: id,
        taskId,
        status,
        progressPercent,
        totalTasks,
        completedTasks,
      });
    } catch (err: any) {
      console.error("[StudyPath] Update progress error:", err.message);
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  app.get("/api/admin/study-plans/analytics", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const statsResult = await pool.query(`
        SELECT
          COUNT(*)::int AS total_plans,
          COUNT(*) FILTER (WHERE is_active = true)::int AS active_plans,
          COUNT(*) FILTER (WHERE progress_percent >= 100)::int AS completed_plans,
          ROUND(AVG(progress_percent), 1) AS avg_progress,
          ROUND(AVG(timeframe_weeks), 1) AS avg_plan_weeks,
          ROUND(AVG(minutes_per_day), 1) AS avg_minutes_per_day
        FROM study_plans
      `);

      const stats = statsResult.rows[0] || {};

      const tierBreakdownResult = await pool.query(`
        SELECT tier, COUNT(*)::int AS count,
               ROUND(AVG(progress_percent), 1) AS avg_progress
        FROM study_plans
        GROUP BY tier
        ORDER BY count DESC
      `);

      const recentResult = await pool.query(`
        SELECT id, user_id, tier, exam_type, timeframe_weeks,
               minutes_per_day, progress_percent, is_active,
               created_at, updated_at
        FROM study_plans
        ORDER BY created_at DESC
        LIMIT 20
      `);

      const weeklyCreationResult = await pool.query(`
        SELECT DATE_TRUNC('week', created_at) AS week,
               COUNT(*)::int AS plans_created
        FROM study_plans
        WHERE created_at > NOW() - INTERVAL '8 weeks'
        GROUP BY week
        ORDER BY week DESC
      `);

      res.json({
        totalPlans: stats.total_plans || 0,
        activePlans: stats.active_plans || 0,
        completedPlans: stats.completed_plans || 0,
        avgProgress: stats.avg_progress ? Number(stats.avg_progress) : 0,
        avgPlanWeeks: stats.avg_plan_weeks ? Number(stats.avg_plan_weeks) : 0,
        avgMinutesPerDay: stats.avg_minutes_per_day ? Number(stats.avg_minutes_per_day) : 0,
        tierBreakdown: tierBreakdownResult.rows.map((r: any) => ({
          tier: r.tier,
          count: r.count,
          avgProgress: r.avg_progress ? Number(r.avg_progress) : 0,
        })),
        recentPlans: recentResult.rows.map((r: any) => ({
          id: r.id,
          userId: r.user_id,
          tier: r.tier,
          examType: r.exam_type,
          timeframeWeeks: r.timeframe_weeks,
          minutesPerDay: r.minutes_per_day,
          progressPercent: r.progress_percent,
          isActive: r.is_active,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        })),
        weeklyCreation: weeklyCreationResult.rows.map((r: any) => ({
          week: r.week,
          count: r.plans_created,
        })),
      });
    } catch (err: any) {
      console.error("[StudyPath] Analytics error:", err.message);
      res.status(500).json({ error: "Failed to get study plan analytics" });
    }
  });
}
