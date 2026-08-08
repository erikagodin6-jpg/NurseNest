import OpenAI from "openai";
import { pool } from "../server/storage";

type JsonObject = Record<string, unknown>;
type OptionRef = { key: string; label: string; text: string; aliases: string[]; index: number };

type QuestionRow = {
  id: string;
  status: string | null;
  tier: string | null;
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
  difficulty: number | null;
};

type AuditIssue = {
  id: string;
  status: string | null;
  tier: string | null;
  exam: string | null;
  questionType: string | null;
  topic: string | null;
  issues: string[];
  missingDistractorKeys: string[];
};

const MIN_RATIONALE_CHARS = 80;
const MIN_OPTION_RATIONALE_CHARS = 24;
const MIN_CORRECT_EXPLANATION_CHARS = 24;
const MIN_CLINICAL_PEARL_CHARS = 12;
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
  const v = text(value);
  return v.length >= minChars && !PLACEHOLDER.test(v);
}

function normalizeOptions(raw: unknown): OptionRef[] {
  const parsed = parseJson(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed.map((option, index) => {
    const fallbackLabel = String.fromCharCode(65 + index);
    if (typeof option === "string" || typeof option === "number") {
      return {
        key: fallbackLabel,
        label: fallbackLabel,
        text: String(option).trim(),
        aliases: [fallbackLabel, String(index), String(index + 1)],
        index,
      };
    }

    const obj = (option && typeof option === "object" ? option : {}) as JsonObject;
    const id = text(obj.id);
    const label = text(obj.label) || fallbackLabel;
    const optionText = text(obj.text) || text(obj.content) || text(obj.value) || JSON.stringify(option);
    const key = id || label;
    const aliases = Array.from(new Set([key, id, label, fallbackLabel, String(index), String(index + 1)].filter(Boolean)));
    return { key, label, text: optionText, aliases, index };
  });
}

function flattenCorrectAnswer(raw: unknown): unknown[] {
  const parsed = parseJson(raw);
  if (Array.isArray(parsed)) return parsed.flatMap(flattenCorrectAnswer);
  if (parsed && typeof parsed === "object") {
    const obj = parsed as JsonObject;
    for (const key of ["ids", "values", "answers", "selected", "correct", "answer", "id", "value", "index"]) {
      if (key in obj) return flattenCorrectAnswer(obj[key]);
    }
  }
  return [parsed];
}

function resolveCorrectOptionKeys(raw: unknown, options: OptionRef[]): Set<string> {
  const resolved = new Set<string>();
  const values = flattenCorrectAnswer(raw);

  for (const value of values) {
    if (value === null || value === undefined) continue;
    if (typeof value === "number" && Number.isInteger(value)) {
      const zeroBased = options[value];
      const oneBased = value > 0 ? options[value - 1] : undefined;
      if (zeroBased) resolved.add(zeroBased.key);
      else if (oneBased) resolved.add(oneBased.key);
      continue;
    }

    const needle = String(value).trim();
    if (!needle) continue;
    const exact = options.find(o => o.aliases.some(alias => alias.toLowerCase() === needle.toLowerCase()));
    if (exact) {
      resolved.add(exact.key);
      continue;
    }
    const byText = options.find(o => o.text.toLowerCase() === needle.toLowerCase());
    if (byText) resolved.add(byText.key);
  }

  return resolved;
}

function rationaleMap(raw: unknown): Record<string, string> {
  const parsed = parseJson(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
  return Object.fromEntries(Object.entries(parsed as JsonObject).map(([k, v]) => [k, text(v)]));
}

function lookupOptionRationale(map: Record<string, string>, option: OptionRef): string {
  for (const alias of option.aliases) {
    const direct = map[alias];
    if (substantive(direct, MIN_OPTION_RATIONALE_CHARS)) return direct;
    const caseInsensitiveKey = Object.keys(map).find(k => k.toLowerCase() === alias.toLowerCase());
    if (caseInsensitiveKey && substantive(map[caseInsensitiveKey], MIN_OPTION_RATIONALE_CHARS)) return map[caseInsensitiveKey];
  }
  return "";
}

function auditQuestion(q: QuestionRow): AuditIssue {
  const issues: string[] = [];
  const options = normalizeOptions(q.options);
  const correctKeys = resolveCorrectOptionKeys(q.correct_answer, options);
  const distractors = rationaleMap(q.distractor_rationales);

  if (!substantive(q.stem, 10)) issues.push("missing_or_short_stem");
  if (options.length < 2) issues.push("invalid_options");
  if (correctKeys.size === 0) issues.push("unresolved_correct_answer");
  if (!substantive(q.rationale, MIN_RATIONALE_CHARS)) issues.push("missing_or_weak_rationale");
  if (!substantive(q.correct_answer_explanation, MIN_CORRECT_EXPLANATION_CHARS)) issues.push("missing_correct_answer_explanation");
  if (!substantive(q.clinical_pearl, MIN_CLINICAL_PEARL_CHARS)) issues.push("missing_clinical_pearl");
  if (!substantive(q.body_system, 2)) issues.push("missing_body_system");
  if (!substantive(q.topic, 2)) issues.push("missing_topic");
  if (!q.question_type) issues.push("missing_question_type");
  if (!q.exam) issues.push("missing_exam");
  if (q.difficulty === null || q.difficulty === undefined || q.difficulty < 1 || q.difficulty > 4) issues.push("invalid_difficulty");

  const missingDistractorKeys = options
    .filter(option => !correctKeys.has(option.key))
    .filter(option => !lookupOptionRationale(distractors, option))
    .map(option => option.key);

  if (missingDistractorKeys.length > 0) issues.push("incomplete_distractor_rationales");

  return {
    id: q.id,
    status: q.status,
    tier: q.tier,
    exam: q.exam,
    questionType: q.question_type,
    topic: q.topic,
    issues,
    missingDistractorKeys,
  };
}

function buildOptionPrompt(options: OptionRef[], correctKeys: Set<string>): string {
  return options.map(option => {
    const correctness = correctKeys.has(option.key) ? "CORRECT" : "INCORRECT";
    return `${option.key} [${option.label}] (${correctness}): ${option.text}`;
  }).join("\n");
}

function buildRepairPrompt(q: QuestionRow): { prompt: string; options: OptionRef[]; correctKeys: Set<string> } {
  const options = normalizeOptions(q.options);
  const correctKeys = resolveCorrectOptionKeys(q.correct_answer, options);
  const existing = rationaleMap(q.distractor_rationales);
  const missing = options.filter(option => !correctKeys.has(option.key) && !lookupOptionRationale(existing, option));

  const prompt = `You are a senior nursing and allied-health exam item editor. Repair missing publication fields for ONE existing question. Do not change the stem, options, answer key, scope, country, exam, or difficulty.\n\n` +
    `Tier: ${q.tier || "unknown"}\nExam: ${q.exam || "unknown"}\nQuestion type: ${q.question_type || "unknown"}\nTopic: ${q.topic || "unknown"}\nStem: ${q.stem || ""}\n\nOptions and answer status:\n${buildOptionPrompt(options, correctKeys)}\n\n` +
    `Existing overall rationale: ${q.rationale || "<missing>"}\nExisting correct-answer explanation: ${q.correct_answer_explanation || "<missing>"}\nExisting clinical pearl: ${q.clinical_pearl || "<missing>"}\nExisting distractor rationales: ${JSON.stringify(existing)}\n\n` +
    `Return ONLY strict JSON with this shape:\n{\n  "rationale": "80+ characters, clinically specific",\n  "correct_answer_explanation": "24+ characters, focused on why the keyed answer is correct",\n  "clinical_pearl": "12+ characters, high-yield and specific",\n  "distractor_rationales": {\n    ${missing.map(o => `"${o.key}": "24+ characters explaining specifically why this incorrect option is wrong"`).join(",\n    ")}\n  }\n}\n\n` +
    `Rules: every requested distractor key must be present exactly as shown; never write generic text such as 'this is incorrect'; explain the clinical misconception or priority error; preserve correct existing content where it is already strong; do not invent citations; no markdown.`;

  return { prompt, options, correctKeys };
}

function parseModelJson(raw: string): JsonObject {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("model did not return JSON");
  return JSON.parse(match[0]);
}

function validateRepairPayload(q: QuestionRow, payload: JsonObject, options: OptionRef[], correctKeys: Set<string>): Record<string, string> {
  if (!substantive(payload.rationale, MIN_RATIONALE_CHARS)) throw new Error("generated rationale is too short or placeholder");
  if (!substantive(payload.correct_answer_explanation, MIN_CORRECT_EXPLANATION_CHARS)) throw new Error("generated correct answer explanation is too short");
  if (!substantive(payload.clinical_pearl, MIN_CLINICAL_PEARL_CHARS)) throw new Error("generated clinical pearl is too short");

  const generated = rationaleMap(payload.distractor_rationales);
  const existing = rationaleMap(q.distractor_rationales);
  const merged = { ...existing };

  for (const option of options.filter(o => !correctKeys.has(o.key))) {
    const generatedText = lookupOptionRationale(generated, option);
    const existingText = lookupOptionRationale(existing, option);
    const chosen = existingText || generatedText;
    if (!substantive(chosen, MIN_OPTION_RATIONALE_CHARS)) {
      throw new Error(`missing substantive distractor rationale for ${option.key}`);
    }
    merged[option.key] = chosen;
  }

  return merged;
}

async function loadQuestions(): Promise<QuestionRow[]> {
  const result = await pool.query(`
    SELECT id, status, tier, exam, question_type, stem, options, correct_answer, rationale,
           distractor_rationales, correct_answer_explanation, clinical_pearl,
           body_system, topic, difficulty
    FROM exam_questions
    ORDER BY tier NULLS LAST, exam NULLS LAST, id
  `);
  return result.rows;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const limitArg = process.argv.find(arg => arg.startsWith("--limit="));
  const limit = limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 1) : Number.POSITIVE_INFINITY;

  const questions = await loadQuestions();
  const audits = questions.map(auditQuestion);
  const failing = audits.filter(a => a.issues.length > 0);
  const distractorFailures = audits.filter(a => a.missingDistractorKeys.length > 0);

  const byIssue: Record<string, number> = {};
  const byStatus: Record<string, { total: number; failing: number }> = {};
  for (const q of questions) {
    const status = q.status || "unknown";
    byStatus[status] ||= { total: 0, failing: 0 };
    byStatus[status].total++;
  }
  for (const audit of failing) {
    const status = audit.status || "unknown";
    byStatus[status] ||= { total: 0, failing: 0 };
    byStatus[status].failing++;
    for (const issue of audit.issues) byIssue[issue] = (byIssue[issue] || 0) + 1;
  }

  console.log(JSON.stringify({
    mode: apply ? "apply" : "audit",
    totalQuestions: questions.length,
    failingQuestions: failing.length,
    distractorRationaleFailures: distractorFailures.length,
    byIssue,
    byStatus,
    sample: failing.slice(0, 50),
  }, null, 2));

  if (!apply) return;

  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  if (!apiKey) throw new Error("--apply requires AI_INTEGRATIONS_OPENAI_API_KEY or OPENAI_API_KEY");
  const openai = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });

  let repaired = 0;
  let failed = 0;
  const candidates = questions
    .filter(q => {
      const audit = auditQuestion(q);
      return audit.issues.some(issue => [
        "missing_or_weak_rationale",
        "missing_correct_answer_explanation",
        "missing_clinical_pearl",
        "incomplete_distractor_rationales",
      ].includes(issue));
    })
    .slice(0, limit);

  for (const q of candidates) {
    try {
      const { prompt, options, correctKeys } = buildRepairPrompt(q);
      if (options.length < 2 || correctKeys.size === 0) {
        console.error(`[skip] ${q.id}: cannot safely repair unresolved option/answer contract`);
        failed++;
        continue;
      }

      const response = await openai.chat.completions.create({
        model: process.env.QUESTION_REPAIR_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 1400,
        messages: [{ role: "user", content: prompt }],
      });
      const content = response.choices[0]?.message?.content || "";
      const payload = parseModelJson(content);
      const mergedDistractors = validateRepairPayload(q, payload, options, correctKeys);

      const rationale = substantive(q.rationale, MIN_RATIONALE_CHARS) ? q.rationale : text(payload.rationale);
      const correctExplanation = substantive(q.correct_answer_explanation, MIN_CORRECT_EXPLANATION_CHARS)
        ? q.correct_answer_explanation
        : text(payload.correct_answer_explanation);
      const pearl = substantive(q.clinical_pearl, MIN_CLINICAL_PEARL_CHARS)
        ? q.clinical_pearl
        : text(payload.clinical_pearl);

      await pool.query("BEGIN");
      await pool.query(
        `UPDATE exam_questions
         SET rationale = $1,
             correct_answer_explanation = $2,
             distractor_rationales = $3::jsonb,
             clinical_pearl = $4,
             updated_at = NOW()
         WHERE id = $5`,
        [rationale, correctExplanation, JSON.stringify(mergedDistractors), pearl, q.id],
      );
      await pool.query("COMMIT");

      const refreshed = { ...q, rationale, correct_answer_explanation: correctExplanation, distractor_rationales: mergedDistractors, clinical_pearl: pearl };
      const postAudit = auditQuestion(refreshed);
      if (postAudit.issues.some(issue => ["missing_or_weak_rationale", "missing_correct_answer_explanation", "missing_clinical_pearl", "incomplete_distractor_rationales"].includes(issue))) {
        throw new Error(`post-repair rationale contract still failing: ${postAudit.issues.join(", ")}`);
      }

      repaired++;
      console.log(`[repaired] ${q.id}`);
    } catch (error) {
      try { await pool.query("ROLLBACK"); } catch {}
      failed++;
      console.error(`[failed] ${q.id}:`, error instanceof Error ? error.message : error);
    }
  }

  console.log(JSON.stringify({ applyComplete: true, attempted: candidates.length, repaired, failed }, null, 2));
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try { await pool.end(); } catch {}
  });
