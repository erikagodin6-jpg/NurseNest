import crypto from "crypto";
import { pool } from "../server/storage";
import { getKillSwitch, routeAIRequest } from "../server/ai-provider-router";
import {
  auditQuestionQuality,
  normalizeQuestionOptions,
  normalizeCorrectAnswerLabels,
  type QuestionQualityAudit,
  type QuestionQualityRecord,
  type QuestionQualitySource,
} from "../server/question-quality-contract";

type ColumnInfo = { column_name: string; data_type: string; udt_name: string };
type TableInfo = { name: QuestionQualitySource; columns: Map<string, ColumnInfo> };

type RepairBundle = {
  rationale: string;
  correctAnswerExplanation: string;
  distractorRationales: Record<string, string>;
  clinicalPearl: string;
  bodySystem: string;
  topic: string;
  subtopic: string;
  difficulty: number;
  cognitiveLevel: "recall" | "understanding" | "application" | "analysis";
  tags: string[];
  regionScope: string;
  examStrategy: string;
};

type RunStats = {
  scanned: number;
  healthy: number;
  repaired: number;
  quarantined: number;
  failed: number;
  skipped: number;
  aiCalls: number;
  bySource: Record<string, { scanned: number; healthy: number; repaired: number; quarantined: number; failed: number }>;
  byTier: Record<string, { scanned: number; healthy: number; repaired: number; quarantined: number; failed: number }>;
  issueCounts: Record<string, number>;
};

const ACTIVE_STATUSES = ["published", "approved"];
const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_MAX_ROUNDS = 5000;
const MAX_REPAIR_ATTEMPTS = 2;

function argValue(name: string): string | null {
  const exact = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  return exact ? exact.slice(name.length + 3) : null;
}

function hasArg(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

const APPLY = hasArg("apply") && !hasArg("dry-run");
const BATCH_SIZE = Math.max(1, Math.min(Number(argValue("batch") || DEFAULT_BATCH_SIZE), 100));
const MAX_ROUNDS = Math.max(1, Number(argValue("max-rounds") || DEFAULT_MAX_ROUNDS));
const TIER_FILTER = argValue("tier");
const SOURCE_FILTER = argValue("source") as QuestionQualitySource | null;
const VERIFY_WITH_AI = !hasArg("no-ai-review");
const LIMIT = Math.max(0, Number(argValue("limit") || 0));

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function createStats(): RunStats {
  return {
    scanned: 0,
    healthy: 0,
    repaired: 0,
    quarantined: 0,
    failed: 0,
    skipped: 0,
    aiCalls: 0,
    bySource: {},
    byTier: {},
    issueCounts: {},
  };
}

function bump(stats: RunStats, row: QuestionQualityRecord, field: "scanned" | "healthy" | "repaired" | "quarantined" | "failed") {
  const tier = row.tier || "unknown";
  if (!stats.bySource[row.source]) stats.bySource[row.source] = { scanned: 0, healthy: 0, repaired: 0, quarantined: 0, failed: 0 };
  if (!stats.byTier[tier]) stats.byTier[tier] = { scanned: 0, healthy: 0, repaired: 0, quarantined: 0, failed: 0 };
  stats.bySource[row.source][field]++;
  stats.byTier[tier][field]++;
  stats[field]++;
}

async function getTableInfo(name: QuestionQualitySource): Promise<TableInfo | null> {
  const table = await pool.query(`SELECT to_regclass($1) AS table_name`, [`public.${name}`]);
  if (!table.rows[0]?.table_name) return null;
  const columns = await pool.query<ColumnInfo>(
    `SELECT column_name, data_type, udt_name
       FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1`,
    [name],
  );
  return { name, columns: new Map(columns.rows.map((column) => [column.column_name, column])) };
}

function expr(info: TableInfo, column: string, alias: string): string {
  return info.columns.has(column) ? `${column} AS ${alias}` : `NULL AS ${alias}`;
}

function rowSelect(info: TableInfo): string {
  return [
    expr(info, "id", "id"),
    expr(info, "tier", "tier"),
    expr(info, "career_type", "career_type"),
    expr(info, "exam", "exam"),
    expr(info, "question_type", "question_type"),
    expr(info, "status", "status"),
    expr(info, "stem", "stem"),
    expr(info, "options", "options"),
    expr(info, "correct_answer", "correct_answer"),
    expr(info, "rationale", "rationale"),
    expr(info, "correct_answer_explanation", "correct_answer_explanation"),
    expr(info, "distractor_rationales", "distractor_rationales"),
    expr(info, "clinical_pearl", "clinical_pearl"),
    expr(info, "body_system", "body_system"),
    expr(info, "topic", "topic"),
    expr(info, "subtopic", "subtopic"),
    expr(info, "difficulty", "difficulty"),
    expr(info, "cognitive_level", "cognitive_level"),
    expr(info, "tags", "tags"),
    expr(info, "region_scope", "region_scope"),
    expr(info, "exam_strategy", "exam_strategy"),
  ].join(", ");
}

function mapRow(source: QuestionQualitySource, row: any): QuestionQualityRecord {
  const tier = clean(row.tier) || clean(row.career_type) || null;
  return {
    id: String(row.id),
    source,
    tier,
    exam: clean(row.exam) || null,
    questionType: clean(row.question_type) || null,
    status: clean(row.status) || null,
    stem: clean(row.stem) || null,
    options: row.options,
    correctAnswer: row.correct_answer,
    rationale: clean(row.rationale) || null,
    correctAnswerExplanation: clean(row.correct_answer_explanation) || null,
    distractorRationales: row.distractor_rationales,
    clinicalPearl: clean(row.clinical_pearl) || null,
    bodySystem: clean(row.body_system) || null,
    topic: clean(row.topic) || null,
    subtopic: clean(row.subtopic) || null,
    difficulty: row.difficulty == null ? null : Number(row.difficulty),
    cognitiveLevel: clean(row.cognitive_level) || null,
    tags: row.tags,
    regionScope: clean(row.region_scope) || null,
    examStrategy: clean(row.exam_strategy) || null,
  };
}

async function fetchRows(info: TableInfo, offset: number, limit: number): Promise<QuestionQualityRecord[]> {
  const where: string[] = [];
  const params: any[] = [];
  if (info.columns.has("status")) {
    params.push(ACTIVE_STATUSES);
    where.push(`status = ANY($${params.length})`);
  }
  if (TIER_FILTER) {
    const tierColumn = info.columns.has("tier") ? "tier" : info.columns.has("career_type") ? "career_type" : null;
    if (tierColumn) {
      params.push(TIER_FILTER);
      where.push(`${tierColumn} = $${params.length}`);
    }
  }
  params.push(limit, offset);
  const result = await pool.query(
    `SELECT ${rowSelect(info)} FROM ${info.name}
      ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
      ORDER BY id
      LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params,
  );
  return result.rows.map((row) => mapRow(info.name, row));
}

function auditSummary(audit: QuestionQualityAudit): string {
  return audit.issues.map((issue) => `${issue.field}:${issue.code}:${issue.message}`).join("\n");
}

function jsonFromModel(content: string): any {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const candidate = fenced || content.match(/\{[\s\S]*\}/)?.[0] || content;
  return JSON.parse(candidate.trim());
}

function normalizedExistingQuestion(row: QuestionQualityRecord) {
  const options = normalizeQuestionOptions(row.options);
  const correctLabels = normalizeCorrectAnswerLabels(row.correctAnswer, options);
  return { options, correctLabels };
}

function buildRepairPrompt(row: QuestionQualityRecord, audit: QuestionQualityAudit, reviewerIssues: string[] = []): { system: string; user: string } {
  const { options, correctLabels } = normalizedExistingQuestion(row);
  const optionsText = options.map((option) => `${option.label}. ${option.text}`).join("\n");
  const incorrectLabels = options.map((option) => option.label).filter((label) => !correctLabels.includes(label));
  const tierLabel = (row.tier || "nursing").toUpperCase();
  const reviewFeedback = reviewerIssues.length ? `\nA previous reviewer found these defects. Correct every one:\n- ${reviewerIssues.join("\n- ")}\n` : "";

  const system = `You are a senior nursing and health-professions assessment editor. Your task is to repair explanatory and classification fields around an EXISTING approved question without changing the tested answer contract. Clinical accuracy and learner safety are more important than stylistic flourish.

NON-NEGOTIABLE RULES:
- NEVER change the stem, option texts, option order, or correct-answer labels.
- Do not invent country/exam filler. Mention jurisdiction only when it changes safe clinical reasoning.
- Write at the stated tier/scope. Do not expand a practical-nursing item into NP prescribing authority, or reduce an NP item to bedside-only reasoning.
- Every incorrect option needs its OWN specific explanation tied to what that option says and why it is clinically wrong, unsafe, incomplete, lower priority, or inconsistent with the data.
- Never write generic distractor text such as "incorrect", "not the best answer", "this is wrong", or restate the option without analysis.
- Rationales must teach the decision rule a learner can reuse on a new question.
- Do not cite fabricated guidelines, statistics, doses, lab ranges, or time windows.
- Difficulty must be an integer 1-4.
- Cognitive level must be one of recall, understanding, application, analysis.
- Return JSON only.`;

  const user = `Repair the missing/weak fields for this ${tierLabel} question.

SOURCE TABLE: ${row.source}
QUESTION ID: ${row.id}
EXAM: ${row.exam || "unspecified"}
QUESTION TYPE: ${row.questionType || "unspecified"}
BODY SYSTEM: ${row.bodySystem || "missing"}
TOPIC: ${row.topic || "missing"}
SUBTOPIC: ${row.subtopic || "missing"}
REGION SCOPE: ${row.regionScope || "missing"}

FROZEN STEM:
${row.stem}

FROZEN OPTIONS:
${optionsText || "No standard option bank"}

FROZEN CORRECT ANSWER LABEL(S): ${correctLabels.join(", ") || "unresolved"}
INCORRECT LABEL(S) REQUIRING OPTION-SPECIFIC RATIONALES: ${incorrectLabels.join(", ") || "none"}

CURRENT OVERALL RATIONALE:
${row.rationale || "missing"}

CURRENT CORRECT-ANSWER EXPLANATION:
${row.correctAnswerExplanation || "missing"}

CURRENT DISTRACTOR RATIONALES:
${JSON.stringify(audit.distractorRationales)}

CURRENT CLINICAL PEARL:
${row.clinicalPearl || "missing"}

QUALITY DEFECTS TO REPAIR:
${auditSummary(audit)}
${reviewFeedback}
Return exactly this JSON shape:
{
  "rationale": "120-300 words of clinically specific reasoning",
  "correctAnswerExplanation": "2-5 sentences explaining precisely why the correct answer is correct",
  "distractorRationales": {
    ${incorrectLabels.map((label) => `"${label}": "1-3 sentences specific to option ${label}"`).join(",\n    ")}
  },
  "clinicalPearl": "1-3 sentences with a genuinely useful high-yield takeaway",
  "bodySystem": "specific body system",
  "topic": "specific topic",
  "subtopic": "specific subtopic",
  "difficulty": 1,
  "cognitiveLevel": "application",
  "tags": ["at least", "three", "specific-tags"],
  "regionScope": "${row.regionScope || "BOTH"}",
  "examStrategy": "brief strategy only if it adds real value; otherwise empty string"
}`;

  return { system, user };
}

async function generateRepair(row: QuestionQualityRecord, audit: QuestionQualityAudit, reviewerIssues: string[] = []): Promise<RepairBundle> {
  const prompt = buildRepairPrompt(row, audit, reviewerIssues);
  const ai = await routeAIRequest(prompt.system, prompt.user, {
    model: "gpt-4o-mini",
    maxTokens: 1800,
    temperature: 0.2,
    taskType: "content",
    feature: "question-quality-remediation",
  });
  const parsed = jsonFromModel(ai.content);
  return {
    rationale: clean(parsed.rationale),
    correctAnswerExplanation: clean(parsed.correctAnswerExplanation ?? parsed.correct_answer_explanation),
    distractorRationales: parsed.distractorRationales ?? parsed.distractor_rationales ?? {},
    clinicalPearl: clean(parsed.clinicalPearl ?? parsed.clinical_pearl),
    bodySystem: clean(parsed.bodySystem ?? parsed.body_system),
    topic: clean(parsed.topic),
    subtopic: clean(parsed.subtopic),
    difficulty: Number(parsed.difficulty),
    cognitiveLevel: clean(parsed.cognitiveLevel ?? parsed.cognitive_level).toLowerCase() as RepairBundle["cognitiveLevel"],
    tags: Array.isArray(parsed.tags) ? parsed.tags.map(clean).filter(Boolean).slice(0, 8) : [],
    regionScope: clean(parsed.regionScope ?? parsed.region_scope) || row.regionScope || "BOTH",
    examStrategy: clean(parsed.examStrategy ?? parsed.exam_strategy),
  };
}

async function reviewRepair(row: QuestionQualityRecord, generated: RepairBundle): Promise<{ pass: boolean; issues: string[] }> {
  const { options, correctLabels } = normalizedExistingQuestion(row);
  const user = `Audit this proposed rationale bundle against the frozen question. Do NOT rewrite it. Return JSON only: {"pass":true|false,"issues":["specific issue"]}.

PASS only if:
- the correct answer explanation supports exactly the frozen correct answer(s)
- every incorrect option has a specific, clinically accurate explanation
- no distractor rationale accidentally says an incorrect option is correct
- rationale is clinically accurate and appropriate for tier ${row.tier || "nursing"}
- there are no invented unsafe doses, thresholds, scope claims, or unsupported absolutes
- metadata is plausible

STEM: ${row.stem}
OPTIONS: ${JSON.stringify(options)}
CORRECT LABELS: ${JSON.stringify(correctLabels)}
PROPOSED BUNDLE: ${JSON.stringify(generated)}`;
  const ai = await routeAIRequest(
    "You are a strict clinical assessment quality reviewer. False passes are worse than false failures. Return JSON only.",
    user,
    {
      model: "gpt-4o-mini",
      maxTokens: 700,
      temperature: 0.0,
      taskType: "content",
      feature: "question-quality-remediation-review",
    },
  );
  const parsed = jsonFromModel(ai.content);
  return {
    pass: parsed.pass === true,
    issues: Array.isArray(parsed.issues) ? parsed.issues.map(clean).filter(Boolean) : ["Reviewer did not return a valid issue list"],
  };
}

function buildMergedRecord(row: QuestionQualityRecord, generated: RepairBundle): QuestionQualityRecord {
  return {
    ...row,
    rationale: generated.rationale || row.rationale,
    correctAnswerExplanation: generated.correctAnswerExplanation || row.correctAnswerExplanation,
    distractorRationales: generated.distractorRationales,
    clinicalPearl: generated.clinicalPearl || row.clinicalPearl,
    bodySystem: generated.bodySystem || row.bodySystem,
    topic: generated.topic || row.topic,
    subtopic: generated.subtopic || row.subtopic,
    difficulty: generated.difficulty || row.difficulty,
    cognitiveLevel: generated.cognitiveLevel || row.cognitiveLevel,
    tags: generated.tags.length ? generated.tags : row.tags,
    regionScope: generated.regionScope || row.regionScope,
    examStrategy: generated.examStrategy || row.examStrategy,
  };
}

function dbValue(info: TableInfo, column: string, value: any): any {
  const columnInfo = info.columns.get(column);
  if (!columnInfo) return value;
  if (columnInfo.data_type === "json" || columnInfo.data_type === "jsonb") return JSON.stringify(value);
  return value;
}

async function applyRepair(info: TableInfo, row: QuestionQualityRecord, generated: RepairBundle): Promise<void> {
  const fields: Array<[string, any]> = [
    ["rationale", generated.rationale],
    ["correct_answer_explanation", generated.correctAnswerExplanation],
    ["distractor_rationales", generated.distractorRationales],
    ["clinical_pearl", generated.clinicalPearl],
    ["body_system", generated.bodySystem],
    ["topic", generated.topic],
    ["subtopic", generated.subtopic],
    ["difficulty", generated.difficulty],
    ["cognitive_level", generated.cognitiveLevel],
    ["tags", generated.tags],
    ["region_scope", generated.regionScope],
    ["exam_strategy", generated.examStrategy],
  ].filter(([column]) => info.columns.has(column));

  if (info.columns.has("updated_at")) fields.push(["updated_at", new Date()]);

  const sets: string[] = [];
  const params: any[] = [];
  fields.forEach(([column, value]) => {
    params.push(dbValue(info, column, value));
    sets.push(`${column} = $${params.length}`);
  });
  params.push(row.id);
  await pool.query(`UPDATE ${info.name} SET ${sets.join(", ")} WHERE id = $${params.length}`, params);
}

async function quarantine(info: TableInfo, row: QuestionQualityRecord, audit: QuestionQualityAudit): Promise<void> {
  if (!info.columns.has("status")) return;
  const sets = ["status = 'needs_review'"];
  if (info.columns.has("published_at")) sets.push("published_at = NULL");
  if (info.columns.has("updated_at")) sets.push("updated_at = NOW()");
  await pool.query(`UPDATE ${info.name} SET ${sets.join(", ")} WHERE id = $1`, [row.id]);
  await writeLog(info.name, row, "quarantined", audit.issues, null);
}

async function ensureLogTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS question_quality_remediation_log (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      run_id text NOT NULL,
      source_table text NOT NULL,
      question_id text NOT NULL,
      tier text,
      action text NOT NULL,
      issues jsonb NOT NULL DEFAULT '[]'::jsonb,
      before_hash text,
      after_hash text,
      created_at timestamptz NOT NULL DEFAULT NOW()
    )
  `);
}

const RUN_ID = `qqr-${new Date().toISOString()}-${crypto.randomBytes(4).toString("hex")}`;

async function writeLog(source: QuestionQualitySource, row: QuestionQualityRecord, action: string, issues: unknown, generated: RepairBundle | null) {
  const beforeHash = hash(JSON.stringify({
    rationale: row.rationale,
    correctAnswerExplanation: row.correctAnswerExplanation,
    distractorRationales: row.distractorRationales,
    clinicalPearl: row.clinicalPearl,
    bodySystem: row.bodySystem,
    topic: row.topic,
    subtopic: row.subtopic,
    difficulty: row.difficulty,
    cognitiveLevel: row.cognitiveLevel,
    tags: row.tags,
    regionScope: row.regionScope,
  }));
  const afterHash = generated ? hash(JSON.stringify(generated)) : null;
  await pool.query(
    `INSERT INTO question_quality_remediation_log
      (run_id, source_table, question_id, tier, action, issues, before_hash, after_hash)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8)`,
    [RUN_ID, source, row.id, row.tier, action, JSON.stringify(issues), beforeHash, afterHash],
  );
}

async function repairOne(info: TableInfo, row: QuestionQualityRecord, audit: QuestionQualityAudit, stats: RunStats): Promise<void> {
  if (!audit.structuralValid) {
    if (APPLY) await quarantine(info, row, audit);
    bump(stats, row, "quarantined");
    return;
  }

  if (!audit.needsContentRepair) {
    bump(stats, row, "healthy");
    return;
  }

  if (getKillSwitch()) {
    stats.skipped++;
    await writeLog(info.name, row, "skipped_ai_kill_switch", audit.issues, null);
    return;
  }

  let reviewerIssues: string[] = [];
  for (let attempt = 0; attempt < MAX_REPAIR_ATTEMPTS; attempt++) {
    try {
      stats.aiCalls++;
      const generated = await generateRepair(row, audit, reviewerIssues);
      const merged = buildMergedRecord(row, generated);
      const deterministicAudit = auditQuestionQuality(merged);
      if (!deterministicAudit.valid) {
        reviewerIssues = deterministicAudit.issues.map((issue) => `${issue.field}: ${issue.message}`);
        if (attempt + 1 < MAX_REPAIR_ATTEMPTS) continue;
        bump(stats, row, "failed");
        await writeLog(info.name, row, "failed_deterministic_validation", reviewerIssues, generated);
        return;
      }

      if (VERIFY_WITH_AI) {
        stats.aiCalls++;
        const reviewed = await reviewRepair(row, generated);
        if (!reviewed.pass) {
          reviewerIssues = reviewed.issues;
          if (attempt + 1 < MAX_REPAIR_ATTEMPTS) continue;
          bump(stats, row, "failed");
          await writeLog(info.name, row, "failed_ai_review", reviewerIssues, generated);
          return;
        }
      }

      if (APPLY) {
        await applyRepair(info, row, generated);
        await writeLog(info.name, row, "repaired", audit.issues, generated);
      }
      bump(stats, row, "repaired");
      return;
    } catch (error: any) {
      reviewerIssues = [error?.message || String(error)];
      if (attempt + 1 < MAX_REPAIR_ATTEMPTS) continue;
      bump(stats, row, "failed");
      await writeLog(info.name, row, "failed_exception", reviewerIssues, null);
      return;
    }
  }
}

async function finalAudit(infos: TableInfo[]) {
  const result: Record<string, any> = {};
  for (const info of infos) {
    let offset = 0;
    let scanned = 0;
    let invalid = 0;
    const byTier: Record<string, { total: number; invalid: number }> = {};
    while (true) {
      const rows = await fetchRows(info, offset, 500);
      if (!rows.length) break;
      for (const row of rows) {
        scanned++;
        const tier = row.tier || "unknown";
        if (!byTier[tier]) byTier[tier] = { total: 0, invalid: 0 };
        byTier[tier].total++;
        const audit = auditQuestionQuality(row);
        if (!audit.valid) {
          invalid++;
          byTier[tier].invalid++;
        }
      }
      offset += rows.length;
      if (rows.length < 500) break;
    }
    result[info.name] = { scanned, invalid, byTier };
  }
  return result;
}

async function main() {
  console.log(`[QuestionQuality] run=${RUN_ID} mode=${APPLY ? "APPLY" : "DRY_RUN"} batch=${BATCH_SIZE} tier=${TIER_FILTER || "ALL"} source=${SOURCE_FILTER || "ALL"} aiReview=${VERIFY_WITH_AI}`);
  await ensureLogTable();

  const sourceNames: QuestionQualitySource[] = SOURCE_FILTER ? [SOURCE_FILTER] : ["exam_questions", "allied_questions"];
  const infos = (await Promise.all(sourceNames.map(getTableInfo))).filter(Boolean) as TableInfo[];
  if (!infos.length) throw new Error("No supported question tables found");

  const stats = createStats();
  let totalVisited = 0;

  for (const info of infos) {
    let offset = 0;
    let rounds = 0;
    while (rounds < MAX_ROUNDS) {
      const rows = await fetchRows(info, offset, BATCH_SIZE);
      if (!rows.length) break;
      for (const row of rows) {
        if (LIMIT && totalVisited >= LIMIT) break;
        totalVisited++;
        bump(stats, row, "scanned");
        const audit = auditQuestionQuality(row);
        for (const issue of audit.issues) stats.issueCounts[issue.code] = (stats.issueCounts[issue.code] || 0) + 1;
        await repairOne(info, row, audit, stats);
      }
      if (LIMIT && totalVisited >= LIMIT) break;
      offset += rows.length;
      rounds++;
      if (rows.length < BATCH_SIZE) break;
    }
    if (LIMIT && totalVisited >= LIMIT) break;
  }

  const after = await finalAudit(infos);
  const output = {
    runId: RUN_ID,
    mode: APPLY ? "apply" : "dry-run",
    stats,
    finalAudit: after,
  };
  console.log(JSON.stringify(output, null, 2));

  const remaining = Object.values(after).reduce((sum: number, item: any) => sum + Number(item.invalid || 0), 0);
  if (APPLY && remaining > 0) {
    console.error(`[QuestionQuality] ${remaining} active questions still fail the strict quality contract.`);
    process.exitCode = 2;
  }
}

main()
  .catch((error) => {
    console.error("[QuestionQuality] fatal", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try { await pool.end(); } catch {}
  });
