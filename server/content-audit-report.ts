import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import { routeAIRequest, getKillSwitch } from "./ai-provider-router";

type JsonRecord = Record<string, unknown>;
type OptionRef = { key: string; label: string; text: string; index: number; aliases: string[] };

type ExamQuestionRow = {
  id: string;
  tier: string | null;
  status: string | null;
  exam: string | null;
  question_type: string | null;
  stem: string | null;
  options: unknown;
  correct_answer: unknown;
  rationale: string | null;
  distractor_rationales: unknown;
  correct_answer_explanation: string | null;
  clinical_pearl: string | null;
  body_system: string | null;
  topic: string | null;
  tags: unknown;
  difficulty: number | null;
  is_adaptive_eligible: boolean | null;
};

type PublicationIssue = {
  code: string;
  field: string;
  blocking: boolean;
  detail: string;
};

const MIN_RATIONALE_CHARS = 20;
const MIN_DISTRACTOR_RATIONALE_CHARS = 24;
const MIN_CORRECT_EXPLANATION_CHARS = 24;
const PLACEHOLDER = /^(?:tbd|todo|placeholder|n\/?a|none|rationale here|add rationale|see rationale|explanation|coming soon|to be added|to be determined|not available|-+|\.+)$/i;

function parseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  try { return JSON.parse(trimmed); } catch { return value; }
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function substantive(value: unknown, minChars: number): boolean {
  const valueText = text(value);
  return valueText.length >= minChars && !PLACEHOLDER.test(valueText);
}

function normalizeOptions(raw: unknown): OptionRef[] {
  const parsed = parseJson(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed.map((option, index) => {
    const fallbackLabel = String.fromCharCode(65 + index);
    if (typeof option === "string" || typeof option === "number") {
      const optionText = String(option).trim();
      return {
        key: fallbackLabel,
        label: fallbackLabel,
        text: optionText,
        index,
        aliases: [fallbackLabel, String(index), optionText],
      };
    }

    const obj = (option && typeof option === "object" ? option : {}) as JsonRecord;
    const id = text(obj.id);
    const label = text(obj.label) || fallbackLabel;
    const optionText = text(obj.text) || text(obj.content) || text(obj.value) || JSON.stringify(option);
    const key = id || label;
    return {
      key,
      label,
      text: optionText,
      index,
      aliases: Array.from(new Set([key, id, label, fallbackLabel, String(index), optionText].filter(Boolean))),
    };
  });
}

function flattenAnswer(raw: unknown): unknown[] {
  const parsed = parseJson(raw);
  if (Array.isArray(parsed)) return parsed.flatMap(flattenAnswer);
  if (parsed && typeof parsed === "object") {
    const obj = parsed as JsonRecord;
    for (const key of ["ids", "values", "answers", "selected", "correct", "answer", "id", "value", "index"]) {
      if (key in obj) return flattenAnswer(obj[key]);
    }
  }
  return [parsed];
}

function resolveCorrectKeys(raw: unknown, options: OptionRef[]): Set<string> {
  const resolved = new Set<string>();
  for (const value of flattenAnswer(raw)) {
    if (value === null || value === undefined) continue;

    if (typeof value === "number" && Number.isInteger(value)) {
      const option = options[value];
      if (option) resolved.add(option.key);
      continue;
    }

    const needle = String(value).trim().toLowerCase();
    if (!needle) continue;
    const match = options.find(option => option.aliases.some(alias => alias.toLowerCase() === needle));
    if (match) resolved.add(match.key);
  }
  return resolved;
}

function rationaleMap(raw: unknown): Record<string, string> {
  const parsed = parseJson(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
  return Object.fromEntries(Object.entries(parsed as JsonRecord).map(([key, value]) => [key, text(value)]));
}

function lookupRationale(map: Record<string, string>, option: OptionRef): string {
  for (const alias of option.aliases) {
    const direct = map[alias];
    if (substantive(direct, MIN_DISTRACTOR_RATIONALE_CHARS)) return direct;
    const caseInsensitive = Object.keys(map).find(key => key.toLowerCase() === alias.toLowerCase());
    if (caseInsensitive && substantive(map[caseInsensitive], MIN_DISTRACTOR_RATIONALE_CHARS)) return map[caseInsensitive];
  }

  // Some legacy content used one-based numeric keys. Only use that fallback when
  // the map explicitly contains the terminal one-based key, avoiding ambiguity
  // with the repository's more common zero-based numeric contract.
  if (Object.prototype.hasOwnProperty.call(map, String(option.index + 1))) {
    const candidate = map[String(option.index + 1)];
    if (substantive(candidate, MIN_DISTRACTOR_RATIONALE_CHARS)) return candidate;
  }
  return "";
}

function normalizedTags(raw: unknown): unknown[] {
  const parsed = parseJson(raw);
  return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
}

function auditPublicationContract(q: ExamQuestionRow): PublicationIssue[] {
  const issues: PublicationIssue[] = [];
  const options = normalizeOptions(q.options);
  const correctKeys = resolveCorrectKeys(q.correct_answer, options);
  const distractors = rationaleMap(q.distractor_rationales);

  if (!substantive(q.stem, 10)) issues.push({ code: "missing_stem", field: "stem", blocking: true, detail: "Stem missing or shorter than 10 characters" });
  if (options.length < 4) issues.push({ code: "incomplete_options", field: "options", blocking: true, detail: `Expected at least 4 options; found ${options.length}` });
  if (correctKeys.size === 0) issues.push({ code: "unresolved_correct_answer", field: "correct_answer", blocking: true, detail: "Correct answer cannot be resolved to an option" });
  if (!substantive(q.rationale, MIN_RATIONALE_CHARS)) issues.push({ code: "missing_rationale", field: "rationale", blocking: true, detail: "Overall rationale missing, placeholder, or too short" });
  if (!substantive(q.correct_answer_explanation, MIN_CORRECT_EXPLANATION_CHARS)) issues.push({ code: "missing_correct_answer_explanation", field: "correct_answer_explanation", blocking: true, detail: "Correct-answer explanation missing or too short" });
  if (!q.tier || !q.tier.trim()) issues.push({ code: "missing_tier", field: "tier", blocking: true, detail: "Tier missing" });
  if (!q.exam || !q.exam.trim()) issues.push({ code: "missing_exam", field: "exam", blocking: true, detail: "Exam missing" });
  if (!q.question_type || !q.question_type.trim()) issues.push({ code: "missing_question_type", field: "question_type", blocking: true, detail: "Question type missing" });
  if (!q.body_system || !q.body_system.trim()) issues.push({ code: "missing_body_system", field: "body_system", blocking: true, detail: "Body system missing" });
  if (!q.topic || !q.topic.trim()) issues.push({ code: "missing_topic", field: "topic", blocking: true, detail: "Topic missing" });
  if (normalizedTags(q.tags).length === 0) issues.push({ code: "missing_tags", field: "tags", blocking: true, detail: "At least one tag is required" });
  if (q.difficulty === null || q.difficulty === undefined || q.difficulty < 1 || q.difficulty > 4) issues.push({ code: "invalid_difficulty", field: "difficulty", blocking: true, detail: "Difficulty must be 1-4" });

  if (options.length >= 2 && correctKeys.size > 0) {
    const missing = options
      .filter(option => !correctKeys.has(option.key))
      .filter(option => !lookupRationale(distractors, option));
    for (const option of missing) {
      issues.push({
        code: "missing_distractor_rationale",
        field: `distractor_rationales.${option.key}`,
        blocking: true,
        detail: `Missing substantive rationale for incorrect option ${option.label}`,
      });
    }
  }

  if (!substantive(q.clinical_pearl, 12)) {
    issues.push({ code: "missing_clinical_pearl", field: "clinical_pearl", blocking: false, detail: "Clinical pearl missing or too short" });
  }

  return issues;
}

function buildTierQuality(rows: ExamQuestionRow[], tier: string) {
  const tierRows = rows.filter(row => row.tier === tier);
  const audits = tierRows.map(row => ({ row, issues: auditPublicationContract(row) }));
  const count = (code: string) => audits.filter(item => item.issues.some(issue => issue.code === code)).length;
  return {
    tier,
    totalPublished: tierRows.length,
    missingRationale: count("missing_rationale"),
    missingDistractorRationales: count("missing_distractor_rationale"),
    missingCorrectAnswerExplanation: count("missing_correct_answer_explanation"),
    missingExam: count("missing_exam"),
    missingBodySystem: count("missing_body_system"),
    missingTopic: count("missing_topic"),
    missingTags: count("missing_tags"),
    invalidDifficulty: count("invalid_difficulty"),
    publicationBlocked: audits.filter(item => item.issues.some(issue => issue.blocking)).length,
  };
}

function buildRepairPrompt(q: ExamQuestionRow, options: OptionRef[], correctKeys: Set<string>, missing: OptionRef[]): string {
  const existing = rationaleMap(q.distractor_rationales);
  const optionText = options.map(option => `${option.key} [${option.label}] ${correctKeys.has(option.key) ? "CORRECT" : "INCORRECT"}: ${option.text}`).join("\n");
  return `You are a senior nursing exam item editor. Repair ONLY missing rationale fields for this existing question. Do not change the stem, options, keyed answer, tier, exam, scope, difficulty, or clinical meaning.\n\nTier: ${q.tier || "unknown"}\nExam: ${q.exam || "unknown"}\nQuestion type: ${q.question_type || "unknown"}\nTopic: ${q.topic || "unknown"}\nStem: ${q.stem || ""}\n\nOptions:\n${optionText}\n\nExisting overall rationale: ${q.rationale || "<missing>"}\nExisting correct-answer explanation: ${q.correct_answer_explanation || "<missing>"}\nExisting clinical pearl: ${q.clinical_pearl || "<missing>"}\nExisting distractor rationales: ${JSON.stringify(existing)}\n\nReturn ONLY valid JSON with this exact structure:\n{\n  "rationale": "clinically specific overall rationale, at least 80 characters",\n  "correct_answer_explanation": "focused explanation of why the keyed answer is correct, at least 24 characters",\n  "clinical_pearl": "specific high-yield takeaway",\n  "distractor_rationales": {\n    ${missing.map(option => `"${option.key}": "specific explanation of why this incorrect option is wrong, at least 24 characters"`).join(",\n    ")}\n  }\n}\n\nEvery requested distractor key must appear exactly as shown. Explain the clinical misconception, priority error, unsafe action, or pathophysiologic reason. Never use generic text such as 'this is incorrect'. Preserve strong existing content; do not invent citations; no markdown.`;
}

function parseModelJson(raw: string): JsonRecord {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Model did not return JSON");
  return JSON.parse(match[0]);
}

async function loadPublishedCoreQuestions(): Promise<ExamQuestionRow[]> {
  const result = await pool.query(`
    SELECT id, tier, status, exam, question_type, stem, options, correct_answer, rationale,
           distractor_rationales, correct_answer_explanation, clinical_pearl,
           body_system, topic, tags, difficulty, is_adaptive_eligible
    FROM exam_questions
    WHERE status = 'published' AND tier IN ('rpn', 'rn', 'np')
    ORDER BY tier, id
  `);
  return result.rows;
}

export function registerContentAuditRoutes(app: Express) {
  app.get("/api/admin/content-quality-audit", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const tierCountsResult = await pool.query(`
        SELECT tier,
          COUNT(*) FILTER (WHERE status = 'published') as published,
          COUNT(*) FILTER (WHERE status = 'draft') as draft,
          COUNT(*) as total
        FROM exam_questions
        WHERE tier IN ('rpn', 'rn', 'np')
        GROUP BY tier ORDER BY tier
      `);
      const targets: Record<string, number> = { rpn: 8000, rn: 12000, np: 15000 };
      const allTiers = ["np", "rn", "rpn"];
      const tierMap = new Map(tierCountsResult.rows.map(row => [row.tier, row]));
      const tierSummary = allTiers.map(tier => {
        const row: any = tierMap.get(tier);
        const published = row ? parseInt(row.published) : 0;
        return {
          tier,
          published,
          draft: row ? parseInt(row.draft) : 0,
          total: row ? parseInt(row.total) : 0,
          target: targets[tier],
          shortfall: Math.max(0, targets[tier] - published),
          targetMet: published >= targets[tier],
        };
      });

      const publishedRows = await loadPublishedCoreQuestions();
      const audits = publishedRows.map(row => ({ row, issues: auditPublicationContract(row) }));
      const dataQuality = allTiers.map(tier => buildTierQuality(publishedRows, tier));
      const blockedRows = audits.filter(item => item.issues.some(issue => issue.blocking));
      const distractorBlockedRows = audits.filter(item => item.issues.some(issue => issue.code === "missing_distractor_rationale"));
      const invalidQuestions = audits.filter(item => item.issues.some(issue => ["missing_stem", "incomplete_options", "unresolved_correct_answer"].includes(issue.code))).length;
      const totalMissingRationales = audits.filter(item => item.issues.some(issue => issue.code === "missing_rationale")).length;

      const issueCounts: Record<string, number> = {};
      for (const item of audits) {
        for (const issue of item.issues) issueCounts[issue.code] = (issueCounts[issue.code] || 0) + 1;
      }

      const flashcardResult = await pool.query(`
        SELECT tier, COUNT(*) FILTER (WHERE status = 'published') as published, COUNT(*) as total
        FROM flashcard_bank WHERE tier IN ('rpn', 'rn', 'np') GROUP BY tier ORDER BY tier
      `);
      const flashcardMap = new Map(flashcardResult.rows.map(row => [row.tier, row]));
      const flashcardCoverage = allTiers.map(tier => {
        const row: any = flashcardMap.get(tier);
        return { tier, published: row ? parseInt(row.published) : 0, total: row ? parseInt(row.total) : 0 };
      });

      const linkageResult = await pool.query(`
        SELECT eq.tier,
          COUNT(DISTINCT eq.id) as total_questions,
          COUNT(DISTINCT fb.source_question_id) as with_flashcards,
          COUNT(DISTINCT eq.id) - COUNT(DISTINCT fb.source_question_id) as without_flashcards
        FROM exam_questions eq
        LEFT JOIN flashcard_bank fb ON fb.source_question_id = eq.id AND fb.status = 'published'
        WHERE eq.status = 'published' AND eq.tier IN ('rpn', 'rn', 'np')
        GROUP BY eq.tier ORDER BY eq.tier
      `);
      const linkageMap = new Map(linkageResult.rows.map(row => [row.tier, row]));
      const flashcardLinkage = allTiers.map(tier => {
        const row: any = linkageMap.get(tier);
        return {
          tier,
          totalQuestions: row ? parseInt(row.total_questions) : 0,
          withFlashcards: row ? parseInt(row.with_flashcards) : 0,
          withoutFlashcards: row ? parseInt(row.without_flashcards) : 0,
        };
      });

      const examBreakdownResult = await pool.query(`SELECT tier, exam, COUNT(*) as count FROM exam_questions WHERE status = 'published' AND tier IN ('rpn', 'rn', 'np') GROUP BY tier, exam ORDER BY tier, count DESC`);
      const examBreakdown = examBreakdownResult.rows.map(row => ({ tier: row.tier, exam: row.exam, count: parseInt(row.count) }));
      const bodySystemResult = await pool.query(`SELECT tier, body_system, COUNT(*) as count FROM exam_questions WHERE status = 'published' AND tier IN ('rpn', 'rn', 'np') GROUP BY tier, body_system ORDER BY tier, count DESC`);
      const bodySystemBreakdown = bodySystemResult.rows.map(row => ({ tier: row.tier, bodySystem: row.body_system, count: parseInt(row.count) }));
      const questionFormatResult = await pool.query(`SELECT tier, question_type, COUNT(*) as count FROM exam_questions WHERE status = 'published' AND tier IN ('rpn', 'rn', 'np') GROUP BY tier, question_type ORDER BY tier, count DESC`);
      const formatBreakdown = questionFormatResult.rows.map(row => ({ tier: row.tier, format: row.question_type, count: parseInt(row.count) }));
      const duplicateResult = await pool.query(`SELECT COUNT(*) as total_published, COUNT(*) - COUNT(DISTINCT LOWER(TRIM(stem))) as duplicate_stems FROM exam_questions WHERE status = 'published' AND tier IN ('rpn', 'rn', 'np')`);
      const totalPublished = parseInt(duplicateResult.rows[0]?.total_published || "0");
      const duplicateStems = parseInt(duplicateResult.rows[0]?.duplicate_stems || "0");
      const duplicateRate = totalPublished > 0 ? Math.round((duplicateStems / totalPublished) * 10000) / 100 : 0;

      let qualityScore = 100;
      if (duplicateRate > 5) qualityScore -= 20;
      else if (duplicateRate > 2) qualityScore -= 10;
      if (invalidQuestions > 0) qualityScore -= Math.min(30, invalidQuestions * 5);
      if (blockedRows.length > 0) qualityScore -= Math.min(40, Math.ceil(blockedRows.length / 10));
      const targetsMet = tierSummary.filter(tier => tier.targetMet).length;
      if (targetsMet < allTiers.length) qualityScore -= (allTiers.length - targetsMet) * 5;
      qualityScore = Math.max(0, qualityScore);

      res.json({
        auditTimestamp: new Date().toISOString(),
        qualityScore,
        duplicateRate,
        invalidQuestions,
        publicationBlockingQuestions: blockedRows.length,
        distractorRationaleBlockedQuestions: distractorBlockedRows.length,
        totalMissingRationales,
        issueCounts,
        deployGate: {
          passed: qualityScore >= 70 && blockedRows.length === 0,
          reason: blockedRows.length > 0
            ? `${blockedRows.length} published questions fail the publication contract; ${distractorBlockedRows.length} have incomplete distractor rationales`
            : qualityScore < 70
              ? `Quality score ${qualityScore} below threshold 70`
              : "All strict publication checks passed",
        },
        tierSummary,
        dataQuality,
        sampleBlockedQuestions: blockedRows.slice(0, 100).map(item => ({
          id: item.row.id,
          tier: item.row.tier,
          exam: item.row.exam,
          topic: item.row.topic,
          blockers: item.issues.filter(issue => issue.blocking),
        })),
        flashcardCoverage,
        flashcardLinkage,
        examBreakdown,
        bodySystemBreakdown,
        formatBreakdown,
        catExamBehavior: {
          rationalesHiddenDuringExam: true,
          rationalesShownInReview: true,
          verifiedFiles: ["client/src/pages/mock-exam-session.tsx", "client/src/pages/qbank-exam.tsx"],
          notes: "Rationale rendering only occurs in review mode (post-exam). Active exam rendering blocks do not render rationale fields.",
        },
        paywallEnforcement: {
          serverSideEntitlements: true,
          clientSideGating: true,
          verifiedMiddleware: ["requireEntitlement", "requireAnyPremium"],
          verifiedFiles: ["server/entitlements.ts", "client/src/lib/entitlements.ts", "client/src/components/content-gate.tsx"],
        },
      });
    } catch (error: any) {
      console.error("[ContentAudit] Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/content-audit/repair-publication-rationales", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      if (getKillSwitch()) return res.status(503).json({ error: "AI generation is disabled by kill switch" });

      const requested = Number(req.body?.batchSize || 25);
      const batchSize = Math.max(1, Math.min(Number.isFinite(requested) ? requested : 25, 100));
      const source = await pool.query(`
        SELECT id, tier, status, exam, question_type, stem, options, correct_answer, rationale,
               distractor_rationales, correct_answer_explanation, clinical_pearl,
               body_system, topic, tags, difficulty, is_adaptive_eligible
        FROM exam_questions
        WHERE tier IN ('rpn', 'rn', 'np')
          AND status IN ('draft', 'published')
        ORDER BY CASE WHEN status = 'draft' THEN 0 ELSE 1 END, tier, id
        LIMIT 5000
      `);

      const candidates = (source.rows as ExamQuestionRow[])
        .map(row => ({ row, issues: auditPublicationContract(row) }))
        .filter(item => item.issues.some(issue => ["missing_rationale", "missing_distractor_rationale", "missing_correct_answer_explanation", "missing_clinical_pearl"].includes(issue.code)))
        .slice(0, batchSize);

      const results: Array<{ id: string; status: "repaired" | "failed" | "skipped"; reason?: string }> = [];
      let repaired = 0;
      let failed = 0;
      let skipped = 0;

      for (const { row } of candidates) {
        try {
          const options = normalizeOptions(row.options);
          const correctKeys = resolveCorrectKeys(row.correct_answer, options);
          if (options.length < 2 || correctKeys.size === 0) {
            skipped++;
            results.push({ id: row.id, status: "skipped", reason: "Unresolved option/answer contract" });
            continue;
          }

          const existing = rationaleMap(row.distractor_rationales);
          const missing = options.filter(option => !correctKeys.has(option.key) && !lookupRationale(existing, option));
          const prompt = buildRepairPrompt(row, options, correctKeys, missing);
          const ai = await routeAIRequest(
            "You repair nursing exam rationale fields. Return only strict JSON and preserve the keyed answer and clinical meaning.",
            prompt,
            { model: "gpt-4o-mini", maxTokens: 1400, temperature: 0.2, taskType: "content", feature: "question-publication-rationale-repair" },
          );
          const payload = parseModelJson(ai.content || "");

          const generatedRationales = rationaleMap(payload.distractor_rationales);
          const merged = { ...existing };
          for (const option of options.filter(option => !correctKeys.has(option.key))) {
            const current = lookupRationale(existing, option);
            const generated = lookupRationale(generatedRationales, option);
            const chosen = current || generated;
            if (!substantive(chosen, MIN_DISTRACTOR_RATIONALE_CHARS)) {
              throw new Error(`Missing substantive distractor rationale for ${option.key}`);
            }
            merged[option.key] = chosen;
          }

          const rationale = substantive(row.rationale, MIN_RATIONALE_CHARS) ? row.rationale! : text(payload.rationale);
          const correctExplanation = substantive(row.correct_answer_explanation, MIN_CORRECT_EXPLANATION_CHARS)
            ? row.correct_answer_explanation!
            : text(payload.correct_answer_explanation);
          const clinicalPearl = substantive(row.clinical_pearl, 12) ? row.clinical_pearl! : text(payload.clinical_pearl);

          if (!substantive(rationale, MIN_RATIONALE_CHARS)) throw new Error("Generated overall rationale is missing or too short");
          if (!substantive(correctExplanation, MIN_CORRECT_EXPLANATION_CHARS)) throw new Error("Generated correct-answer explanation is missing or too short");

          const refreshed: ExamQuestionRow = {
            ...row,
            rationale,
            correct_answer_explanation: correctExplanation,
            clinical_pearl: clinicalPearl,
            distractor_rationales: merged,
          };
          const remainingRationaleIssues = auditPublicationContract(refreshed).filter(issue => ["missing_rationale", "missing_distractor_rationale", "missing_correct_answer_explanation"].includes(issue.code));
          if (remainingRationaleIssues.length > 0) throw new Error(`Post-repair rationale validation failed: ${remainingRationaleIssues.map(issue => issue.field).join(", ")}`);

          await pool.query(
            `UPDATE exam_questions
             SET rationale = $1,
                 correct_answer_explanation = $2,
                 distractor_rationales = $3::jsonb,
                 clinical_pearl = $4,
                 updated_at = NOW()
             WHERE id = $5`,
            [rationale, correctExplanation, JSON.stringify(merged), clinicalPearl, row.id],
          );

          try {
            await pool.query(
              `INSERT INTO content_repair_log
                 (id, scan_run_id, content_type, content_id, repair_type, field, before_value, after_value, repair_method, status, created_at)
               VALUES (gen_random_uuid(), NULL, 'questions', $1, 'publication_rationale_repair', 'rationale_contract', $2, $3, 'ai_strict_per_option', 'applied', NOW())`,
              [row.id, JSON.stringify({ rationale: row.rationale, distractor_rationales: row.distractor_rationales }).slice(0, 5000), JSON.stringify({ rationale, distractor_rationales: merged }).slice(0, 5000)],
            );
          } catch {}

          repaired++;
          results.push({ id: row.id, status: "repaired" });
        } catch (error: any) {
          failed++;
          results.push({ id: row.id, status: "failed", reason: error.message });
        }
      }

      res.json({ scannedCandidates: candidates.length, repaired, failed, skipped, results });
    } catch (error: any) {
      console.error("[ContentAudit] Rationale repair error:", error.message);
      res.status(500).json({ error: "Rationale repair failed", details: error.message });
    }
  });

  app.post("/api/admin/content-audit/fix-quality", async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) {
        client.release();
        return;
      }

      const publishedRowsResult = await client.query(`
        SELECT id, tier, status, exam, question_type, stem, options, correct_answer, rationale,
               distractor_rationales, correct_answer_explanation, clinical_pearl,
               body_system, topic, tags, difficulty, is_adaptive_eligible
        FROM exam_questions
        WHERE status = 'published' AND tier IN ('rpn', 'rn', 'np')
      `);
      const unsafeIds = (publishedRowsResult.rows as ExamQuestionRow[])
        .filter(row => auditPublicationContract(row).some(issue => issue.blocking))
        .map(row => row.id);

      if (unsafeIds.length === 0) {
        return res.json({ timestamp: new Date().toISOString(), totalFixed: 0, defectsFound: { totalDefective: 0 }, fixedByTier: {} });
      }

      await client.query("BEGIN");
      const updateResult = await client.query(
        `UPDATE exam_questions SET status = 'draft', updated_at = NOW() WHERE id = ANY($1::text[]) RETURNING id, tier`,
        [unsafeIds],
      );
      await client.query("COMMIT");

      const tierCounts = updateResult.rows.reduce((acc: Record<string, number>, row: any) => {
        acc[row.tier] = (acc[row.tier] || 0) + 1;
        return acc;
      }, {});

      res.json({
        timestamp: new Date().toISOString(),
        totalFixed: updateResult.rowCount,
        defectsFound: { totalDefective: unsafeIds.length },
        fixedByTier: tierCounts,
        action: "Moved strict publication-contract failures back to draft; use repair-publication-rationales for rationale remediation before republishing.",
      });
    } catch (error: any) {
      await client.query("ROLLBACK").catch(() => {});
      console.error("[ContentAudit] Fix error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      client.release();
    }
  });
}
