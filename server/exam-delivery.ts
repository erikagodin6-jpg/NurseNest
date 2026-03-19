import type { Express, Request, Response, NextFunction } from "express";
import { pool } from "./storage";
import { assembleExam, type AssemblyConfig, type AssembledQuestion } from "./mock-exam-assembly";
import { resolveAuthUser } from "./admin-auth";
import { isMemoryProtectionActive, shouldRejectHeavyWork } from "./memory-monitor";
import crypto from "crypto";

export function generateRequestId(): string {
  return `exam-${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}`;
}

export function examRequestIdMiddleware() {
  return (req: Request, _res: Response, next: NextFunction) => {
    const requestId = generateRequestId();
    (req as any).examRequestId = requestId;
    next();
  };
}

export function getExamRequestId(req: any): string {
  return (req as any).examRequestId || generateRequestId();
}

const MAX_SEMAPHORE_WAIT_QUEUE = 200;

class Semaphore {
  private current = 0;
  private queue: Array<{ resolve: () => void; cancelled: boolean }> = [];

  constructor(private readonly max: number) {}

  acquire(): { promise: Promise<boolean>; cancel: () => void } {
    if (this.current < this.max) {
      this.current++;
      return { promise: Promise.resolve(true), cancel: () => {} };
    }
    const entry = { resolve: () => {}, cancelled: false };
    const promise = new Promise<boolean>((resolve) => {
      entry.resolve = () => {
        if (entry.cancelled) {
          if (this.queue.length > 0) {
            const next = this.queue.shift();
            if (next && !next.cancelled) {
              this.current++;
              next.resolve();
            }
          }
          resolve(false);
          return;
        }
        this.current++;
        resolve(true);
      };
    });
    this.queue = this.queue.filter(e => !e.cancelled);
    if (this.queue.length >= MAX_SEMAPHORE_WAIT_QUEUE) {
      return { promise: Promise.resolve(false), cancel: () => {} };
    }
    this.queue.push(entry);
    return {
      promise,
      cancel: () => { entry.cancelled = true; },
    };
  }

  release(): void {
    this.current--;
    while (this.queue.length > 0) {
      const next = this.queue.shift();
      if (next && !next.cancelled) {
        next.resolve();
        return;
      }
    }
  }

  get activeCount(): number {
    return this.current;
  }

  get waitingCount(): number {
    return this.queue.filter(e => !e.cancelled).length;
  }

  get isFull(): boolean {
    return this.current >= this.max;
  }
}

const assemblySemaphore = new Semaphore(10);

export async function withAssemblyConcurrencyLimit<T>(
  fn: () => Promise<T>,
  requestId: string
): Promise<T> {
  if (assemblySemaphore.isFull) {
    console.warn(`[ExamDelivery] Assembly semaphore full (${assemblySemaphore.activeCount}/${10}), queuing request ${requestId}`);
  }

  const waitStart = Date.now();
  const acquireTimeout = 15000;
  const handle = assemblySemaphore.acquire();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const acquired = await Promise.race([
    handle.promise,
    new Promise<false>((resolve) => {
      timeoutId = setTimeout(() => resolve(false), acquireTimeout);
    }),
  ]);

  if (timeoutId) clearTimeout(timeoutId);

  if (!acquired) {
    handle.cancel();
    const err = new Error("Exam assembly capacity exceeded");
    (err as any).statusCode = 503;
    (err as any).retryAfter = 10;
    throw err;
  }

  const waitTime = Date.now() - waitStart;
  if (waitTime > 100) {
    console.log(`[ExamDelivery] Request ${requestId} waited ${waitTime}ms for assembly slot`);
  }

  try {
    return await fn();
  } finally {
    assemblySemaphore.release();
  }
}

export function getAssemblyStats() {
  return {
    activeAssemblies: assemblySemaphore.activeCount,
    waitingAssemblies: assemblySemaphore.waitingCount,
    isFull: assemblySemaphore.isFull,
    maxConcurrent: 10,
  };
}

const QUERY_TIMEOUTS = {
  questionFetch: 5000,
  assembly: 10000,
  progress: 5000,
  shell: 3000,
  rationale: 5000,
} as const;

export async function timedExamQuery<T = any>(
  queryText: string,
  params: any[],
  category: keyof typeof QUERY_TIMEOUTS,
  requestId?: string
): Promise<T> {
  const timeoutMs = QUERY_TIMEOUTS[category];
  const start = Date.now();

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`SET LOCAL statement_timeout = '${timeoutMs}'`);
    const result = await client.query(queryText, params);
    await client.query("COMMIT");
    const elapsed = Date.now() - start;

    if (elapsed > timeoutMs * 0.8) {
      console.warn(`[ExamDelivery] Slow query (${category}): ${elapsed}ms / ${timeoutMs}ms limit, requestId=${requestId || "unknown"}`);
    }

    return result as T;
  } catch (err: any) {
    await client.query("ROLLBACK").catch(() => {});
    const elapsed = Date.now() - start;
    if (err.message?.includes("statement timeout") || err.code === "57014") {
      console.error(`[ExamDelivery] Query timeout (${category}): ${elapsed}ms exceeded ${timeoutMs}ms limit, requestId=${requestId || "unknown"}`);
      const timeoutErr = new Error(`Database query timed out (${category})`);
      (timeoutErr as any).code = "QUERY_TIMEOUT";
      (timeoutErr as any).category = category;
      (timeoutErr as any).requestId = requestId;
      throw timeoutErr;
    }
    throw err;
  } finally {
    client.release();
  }
}

export interface ExamShell {
  attemptId: string;
  status: string;
  tier: string;
  totalQuestions: number;
  examType: string | null;
  blueprintCode: string | null;
  blueprintMeta: any;
  timeLimit: number | null;
  startedAt: string | null;
  completedAt: string | null;
  score: number | null;
  answers: Record<string, any>;
  flagged: string[];
  timeSpent: number;
  catState: any;
  report: any;
  questionIds: string[];
  shell: true;
}

export function buildExamShell(row: any): ExamShell {
  const rawQuestions = Array.isArray(row.questions) ? row.questions : [];
  const isIdOnly = rawQuestions.length > 0 && typeof rawQuestions[0] === "string";

  let questionIds: string[] = [];
  if (isIdOnly) {
    questionIds = rawQuestions.filter((id: any) => typeof id === "string" && id.length > 0);
  } else {
    questionIds = rawQuestions.map((q: any) => q?.id).filter(Boolean);
  }

  const report = typeof row.report === "string" ? (() => { try { return JSON.parse(row.report); } catch { return {}; } })() : (row.report || {});
  const bpMeta = typeof row.blueprint_meta === "string" ? (() => { try { return JSON.parse(row.blueprint_meta); } catch { return null; } })() : (row.blueprint_meta || null);

  return {
    attemptId: row.id,
    status: row.status,
    tier: row.tier,
    totalQuestions: row.total_questions || questionIds.length,
    examType: row.exam_type || null,
    blueprintCode: row.blueprint_code || null,
    blueprintMeta: bpMeta,
    timeLimit: report?.timeLimit || bpMeta?.timeLimit || null,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    score: row.score,
    answers: row.answers || {},
    flagged: row.flagged || [],
    timeSpent: row.time_spent || 0,
    catState: row.cat_state || null,
    report: report,
    questionIds,
    shell: true,
  };
}

export function examDeliveryLog(
  message: string,
  data: Record<string, any>,
  requestId?: string
): void {
  console.log(JSON.stringify({
    component: "ExamDelivery",
    requestId: requestId || "unknown",
    message,
    timestamp: new Date().toISOString(),
    ...data,
  }));
}

const MAX_CONCURRENT_ASSEMBLIES = 3;
let activeAssemblies = 0;

const DEFAULT_PAGE_SIZE = 15;
const MAX_PAGE_SIZE = 50;

export interface DeliveryExamShell {
  attemptId: string;
  templateId: string;
  examCode: string;
  examName: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingStandard: number;
  sections: { domain: string; questionCount: number }[];
  pageSize: number;
  totalPages: number;
}

async function ensureExamAttemptTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS exam_attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id VARCHAR NOT NULL,
      template_id VARCHAR NOT NULL,
      exam_code VARCHAR NOT NULL,
      status VARCHAR DEFAULT 'in_progress',
      questions_payload JSONB,
      answers JSONB DEFAULT '{}'::jsonb,
      question_count INTEGER DEFAULT 0,
      page_size INTEGER DEFAULT 15,
      time_limit_minutes INTEGER DEFAULT 0,
      passing_standard INTEGER DEFAULT 65,
      score_report JSONB,
      started_at TIMESTAMP DEFAULT NOW(),
      completed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

let tableEnsured = false;

async function ensureTable() {
  if (tableEnsured) return;
  await ensureExamAttemptTable();
  tableEnsured = true;
}

export function registerExamDeliveryRoutes(app: Express): void {

  app.post("/api/exam-delivery/start", async (req: Request, res: Response) => {
    try {
      if (shouldRejectHeavyWork()) {
        return res.status(503).json({ error: "System under heavy load. Please try again shortly.", retryAfter: 30 });
      }

      if (activeAssemblies >= MAX_CONCURRENT_ASSEMBLIES) {
        return res.status(503).json({
          error: "Too many exams being assembled. Please wait a moment and try again.",
          retryAfter: 10,
        });
      }

      const user = await resolveAuthUser(req as any);
      if (!user) return res.status(401).json({ error: "Authentication required" });

      await ensureTable();

      const { templateId, examCode, pageSize: requestedPageSize } = req.body;
      if (!templateId) return res.status(400).json({ error: "templateId is required" });

      const pageSize = Math.min(Math.max(requestedPageSize || DEFAULT_PAGE_SIZE, 5), MAX_PAGE_SIZE);

      const templateResult = await pool.query(
        "SELECT * FROM mock_exam_templates WHERE template_id = $1 AND active = true",
        [templateId]
      );

      if (templateResult.rows.length === 0) {
        return res.status(404).json({ error: "Exam template not found" });
      }

      const template = templateResult.rows[0];

      activeAssemblies++;
      try {
        const config: AssemblyConfig = {
          templateId: template.template_id,
          examCode: examCode || template.exam_code,
          questionCount: template.question_count,
          timeLimitMinutes: template.time_limit_minutes,
          domainWeights: template.domain_weights || [],
          difficultyDistribution: template.difficulty_distribution || { foundational: 0.3, moderate: 0.5, difficult: 0.2 },
          formatMix: template.format_mix || { mcqSingle: 0.6, selectAllThatApply: 0.2, scenarioBased: 0.1, prioritization: 0.05, delegation: 0.05 },
          passingStandard: template.passing_standard || 65,
          seed: Date.now(),
          tier: template.tier || "rn",
        };

        const questions = await assembleExam(config);

        const attemptResult = await pool.query(
          `INSERT INTO exam_attempts (user_id, template_id, exam_code, status, questions_payload, question_count, page_size, time_limit_minutes, passing_standard)
           VALUES ($1, $2, $3, 'in_progress', $4, $5, $6, $7, $8) RETURNING id`,
          [
            user.id,
            templateId,
            config.examCode,
            JSON.stringify(questions),
            questions.length,
            pageSize,
            config.timeLimitMinutes,
            config.passingStandard,
          ]
        );

        const attemptId = attemptResult.rows[0].id;
        const totalPages = Math.ceil(questions.length / pageSize);

        const domainCounts = new Map<string, number>();
        for (const q of questions) {
          domainCounts.set(q.domain, (domainCounts.get(q.domain) || 0) + 1);
        }

        const shell: DeliveryExamShell = {
          attemptId,
          templateId,
          examCode: config.examCode,
          examName: template.template_name || template.exam_name,
          totalQuestions: questions.length,
          timeLimitMinutes: config.timeLimitMinutes,
          passingStandard: config.passingStandard,
          sections: Array.from(domainCounts.entries()).map(([domain, count]) => ({ domain, questionCount: count })),
          pageSize,
          totalPages,
        };

        res.json({ shell });
      } finally {
        activeAssemblies = Math.max(0, activeAssemblies - 1);
      }
    } catch (err: any) {
      console.error("[ExamDelivery] Start error:", err.message);
      res.status(500).json({ error: "Failed to start exam" });
    }
  });

  app.get("/api/exam-delivery/:attemptId/questions", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) return res.status(401).json({ error: "Authentication required" });

      const { attemptId } = req.params;
      const page = Math.max(1, parseInt(req.query.page as string) || 1);

      const attempt = await pool.query(
        "SELECT * FROM exam_attempts WHERE id = $1 AND user_id = $2",
        [attemptId, user.id]
      );

      if (attempt.rows.length === 0) {
        return res.status(404).json({ error: "Exam attempt not found" });
      }

      const row = attempt.rows[0];
      if (row.status === "completed") {
        return res.status(400).json({ error: "This exam has already been completed" });
      }

      const questions: AssembledQuestion[] = typeof row.questions_payload === "string"
        ? JSON.parse(row.questions_payload)
        : row.questions_payload;

      const pageSize = row.page_size || DEFAULT_PAGE_SIZE;
      const totalPages = Math.ceil(questions.length / pageSize);
      const startIdx = (page - 1) * pageSize;
      const endIdx = Math.min(startIdx + pageSize, questions.length);

      const pageQuestions = questions.slice(startIdx, endIdx).map(q => ({
        id: q.id,
        stem: q.stem,
        options: q.options,
        domain: q.domain,
        topic: q.topic,
        difficulty: q.difficulty,
        questionType: q.questionType,
      }));

      res.json({
        attemptId,
        page,
        totalPages,
        pageSize,
        totalQuestions: questions.length,
        questions: pageQuestions,
        hasMore: page < totalPages,
      });
    } catch (err: any) {
      console.error("[ExamDelivery] Questions error:", err.message);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.get("/api/exam-delivery/:attemptId/rationale/:questionId", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) return res.status(401).json({ error: "Authentication required" });

      const { attemptId, questionId } = req.params;

      const attempt = await pool.query(
        "SELECT questions_payload, answers FROM exam_attempts WHERE id = $1 AND user_id = $2",
        [attemptId, user.id]
      );

      if (attempt.rows.length === 0) {
        return res.status(404).json({ error: "Exam attempt not found" });
      }

      const row = attempt.rows[0];
      const questions: AssembledQuestion[] = typeof row.questions_payload === "string"
        ? JSON.parse(row.questions_payload)
        : row.questions_payload;

      const answers = typeof row.answers === "string" ? JSON.parse(row.answers) : (row.answers || {});

      if (!answers[questionId]) {
        return res.status(400).json({ error: "Please answer this question before viewing the rationale" });
      }

      const question = questions.find(q => q.id === questionId);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json({
        questionId,
        correctAnswer: question.correctAnswer,
        rationale: question.rationale,
        domain: question.domain,
        subtopic: question.subtopic,
      });
    } catch (err: any) {
      console.error("[ExamDelivery] Rationale error:", err.message);
      res.status(500).json({ error: "Failed to fetch rationale" });
    }
  });

  app.post("/api/exam-delivery/:attemptId/answer", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) return res.status(401).json({ error: "Authentication required" });

      const { attemptId } = req.params;
      const { questionId, selectedIndex, timeSpent } = req.body;

      if (!questionId || selectedIndex === undefined) {
        return res.status(400).json({ error: "questionId and selectedIndex are required" });
      }

      const attempt = await pool.query(
        "SELECT id, status, questions_payload FROM exam_attempts WHERE id = $1 AND user_id = $2",
        [attemptId, user.id]
      );

      if (attempt.rows.length === 0) {
        return res.status(404).json({ error: "Exam attempt not found" });
      }

      if (attempt.rows[0].status === "completed") {
        return res.status(400).json({ error: "This exam has already been completed" });
      }

      const questions: AssembledQuestion[] = typeof attempt.rows[0].questions_payload === "string"
        ? JSON.parse(attempt.rows[0].questions_payload)
        : attempt.rows[0].questions_payload;

      const question = questions.find(q => q.id === questionId);
      if (!question) {
        return res.status(400).json({ error: "Invalid questionId: question not found in this exam" });
      }

      if (typeof selectedIndex !== "number" || selectedIndex < 0 || selectedIndex >= question.options.length) {
        return res.status(400).json({ error: `Invalid selectedIndex: must be 0-${question.options.length - 1}` });
      }

      await pool.query(
        `UPDATE exam_attempts SET answers = answers || $1::jsonb WHERE id = $2`,
        [JSON.stringify({ [questionId]: { selectedIndex, timeSpent: timeSpent || 0 } }), attemptId]
      );

      res.json({ saved: true });
    } catch (err: any) {
      console.error("[ExamDelivery] Answer error:", err.message);
      res.status(500).json({ error: "Failed to save answer" });
    }
  });

  app.post("/api/exam-delivery/:attemptId/submit", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) return res.status(401).json({ error: "Authentication required" });

      const { attemptId } = req.params;

      const attempt = await pool.query(
        "SELECT * FROM exam_attempts WHERE id = $1 AND user_id = $2",
        [attemptId, user.id]
      );

      if (attempt.rows.length === 0) {
        return res.status(404).json({ error: "Exam attempt not found" });
      }

      const row = attempt.rows[0];
      if (row.status === "completed") {
        return res.status(400).json({ error: "This exam has already been completed" });
      }

      const questions: AssembledQuestion[] = typeof row.questions_payload === "string"
        ? JSON.parse(row.questions_payload)
        : row.questions_payload;

      const answers = typeof row.answers === "string" ? JSON.parse(row.answers) : (row.answers || {});

      const { computeScoreReport } = await import("./mock-exam-assembly");

      const template = await pool.query(
        "SELECT * FROM mock_exam_templates WHERE template_id = $1",
        [row.template_id]
      );
      const tmpl = template.rows[0] || {};

      const config: AssemblyConfig = {
        templateId: row.template_id,
        examCode: row.exam_code,
        questionCount: questions.length,
        timeLimitMinutes: row.time_limit_minutes || 180,
        domainWeights: tmpl.domain_weights || [],
        difficultyDistribution: tmpl.difficulty_distribution || { foundational: 0.3, moderate: 0.5, difficult: 0.2 },
        formatMix: tmpl.format_mix || { mcqSingle: 0.6, selectAllThatApply: 0.2, scenarioBased: 0.1, prioritization: 0.05, delegation: 0.05 },
        passingStandard: row.passing_standard || 65,
        seed: 0,
        tier: tmpl.tier || "rn",
      };

      const scoreReport = computeScoreReport(questions, answers, config);

      await pool.query(
        `UPDATE exam_attempts SET status = 'completed', score_report = $1, completed_at = NOW() WHERE id = $2`,
        [JSON.stringify(scoreReport), attemptId]
      );

      res.json({ scoreReport });
    } catch (err: any) {
      console.error("[ExamDelivery] Submit error:", err.message);
      res.status(500).json({ error: "Failed to submit exam" });
    }
  });

  app.get("/api/exam-delivery/assembly-status", async (_req: Request, res: Response) => {
    res.json({
      activeAssemblies,
      maxConcurrent: MAX_CONCURRENT_ASSEMBLIES,
      available: activeAssemblies < MAX_CONCURRENT_ASSEMBLIES,
    });
  });
}
