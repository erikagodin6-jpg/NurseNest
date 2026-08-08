import { pool } from "../server/storage";
import { validateForPublish } from "../server/content-integrity-validation";

type JsonRecord = Record<string, unknown>;
type OptionRef = { key: string; aliases: string[]; text: string; index: number };

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
  tags: unknown;
  difficulty: number | null;
  is_adaptive_eligible: boolean | null;
  country_code: string | null;
  language_code: string | null;
  licensing_body: string | null;
};

const MIN_DISTRACTOR_RATIONALE_CHARS = 24;
const PLACEHOLDER = /^(?:tbd|todo|placeholder|n\/?a|none|rationale here|add rationale|see rationale|explanation|coming soon|to be added|to be determined|not available|-+|\.+)$/i;

function parseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  try { return JSON.parse(trimmed); } catch { return value; }
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function substantive(value: unknown, minChars: number): boolean {
  const valueText = asText(value);
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
        aliases: [fallbackLabel, String(index), String(index + 1), optionText],
        text: optionText,
        index,
      };
    }

    const obj = (option && typeof option === "object" ? option : {}) as JsonRecord;
    const id = asText(obj.id);
    const label = asText(obj.label) || fallbackLabel;
    const optionText = asText(obj.text) || asText(obj.content) || asText(obj.value);
    const key = id || label;
    return {
      key,
      aliases: Array.from(new Set([key, id, label, fallbackLabel, String(index), String(index + 1), optionText].filter(Boolean))),
      text: optionText,
      index,
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
  const keys = new Set<string>();
  for (const answer of flattenAnswer(raw)) {
    if (answer === null || answer === undefined) continue;

    if (typeof answer === "number" && Number.isInteger(answer)) {
      const zeroBased = options[answer];
      const oneBased = answer > 0 ? options[answer - 1] : undefined;
      if (zeroBased) keys.add(zeroBased.key);
      else if (oneBased) keys.add(oneBased.key);
      continue;
    }

    const needle = String(answer).trim().toLowerCase();
    if (!needle) continue;
    const match = options.find(option => option.aliases.some(alias => alias.toLowerCase() === needle));
    if (match) keys.add(match.key);
  }
  return keys;
}

function rationaleMap(raw: unknown): Record<string, string> {
  const parsed = parseJson(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
  return Object.fromEntries(Object.entries(parsed as JsonRecord).map(([key, value]) => [key, asText(value)]));
}

function hasRationale(map: Record<string, string>, option: OptionRef): boolean {
  for (const alias of option.aliases) {
    const direct = map[alias];
    if (substantive(direct, MIN_DISTRACTOR_RATIONALE_CHARS)) return true;
    const caseInsensitive = Object.keys(map).find(key => key.toLowerCase() === alias.toLowerCase());
    if (caseInsensitive && substantive(map[caseInsensitive], MIN_DISTRACTOR_RATIONALE_CHARS)) return true;
  }
  return false;
}

function normalizedTags(raw: unknown): unknown[] {
  const parsed = parseJson(raw);
  if (Array.isArray(parsed)) return parsed.filter(Boolean);
  return [];
}

function mapForValidator(q: QuestionRow) {
  return {
    stem: q.stem,
    options: parseJson(q.options),
    correctAnswer: parseJson(q.correct_answer),
    tier: q.tier,
    rationale: q.rationale,
    correctAnswerExplanation: q.correct_answer_explanation,
    distractorRationales: parseJson(q.distractor_rationales),
    clinicalPearl: q.clinical_pearl,
    bodySystem: q.body_system,
    topic: q.topic,
    tags: normalizedTags(q.tags),
    difficulty: q.difficulty,
    questionType: q.question_type,
    isAdaptiveEligible: q.is_adaptive_eligible,
  };
}

function strictDistractorIssues(q: QuestionRow): string[] {
  const options = normalizeOptions(q.options);
  if (options.length < 2) return [];

  const correctKeys = resolveCorrectKeys(q.correct_answer, options);
  if (correctKeys.size === 0) return ["unresolved_correct_answer_for_distractor_audit"];

  const rationales = rationaleMap(q.distractor_rationales);
  return options
    .filter(option => !correctKeys.has(option.key))
    .filter(option => !hasRationale(rationales, option))
    .map(option => `missing_distractor_rationale:${option.key}`);
}

function additionalRequiredIssues(q: QuestionRow): string[] {
  const issues: string[] = [];
  if (!q.exam || !q.exam.trim()) issues.push("missing_exam");
  if (!q.question_type || !q.question_type.trim()) issues.push("missing_question_type");
  if (q.difficulty === null || q.difficulty === undefined || q.difficulty < 1 || q.difficulty > 4) issues.push("invalid_difficulty");
  return issues;
}

async function main() {
  const result = await pool.query<QuestionRow>(`
    SELECT id, status, tier, exam, question_type, stem, options, correct_answer, rationale,
           distractor_rationales, correct_answer_explanation, clinical_pearl,
           body_system, topic, tags, difficulty, is_adaptive_eligible,
           country_code, language_code, licensing_body
    FROM exam_questions
    ORDER BY status, tier NULLS LAST, exam NULLS LAST, id
  `);

  const byIssue: Record<string, number> = {};
  const byTier: Record<string, { total: number; ready: number; blocked: number }> = {};
  const byStatus: Record<string, { total: number; ready: number; blocked: number }> = {};
  const blocked: Array<{
    id: string;
    status: string;
    tier: string;
    exam: string | null;
    questionType: string | null;
    topic: string | null;
    blockers: string[];
  }> = [];

  let ready = 0;
  let publishedButInvalid = 0;

  for (const q of result.rows) {
    const base = validateForPublish("question", mapForValidator(q));
    const blockers = [
      ...base.errors.map(error => `${error.field}:${error.message}`),
      ...additionalRequiredIssues(q),
      ...strictDistractorIssues(q),
    ];

    const uniqueBlockers = Array.from(new Set(blockers));
    const tier = q.tier || "unknown";
    const status = q.status || "unknown";
    byTier[tier] ||= { total: 0, ready: 0, blocked: 0 };
    byStatus[status] ||= { total: 0, ready: 0, blocked: 0 };
    byTier[tier].total++;
    byStatus[status].total++;

    if (uniqueBlockers.length === 0) {
      ready++;
      byTier[tier].ready++;
      byStatus[status].ready++;
      continue;
    }

    byTier[tier].blocked++;
    byStatus[status].blocked++;
    if (status === "published") publishedButInvalid++;

    for (const blocker of uniqueBlockers) {
      const key = blocker.includes(":") ? blocker.split(":", 1)[0] : blocker;
      byIssue[key] = (byIssue[key] || 0) + 1;
    }

    blocked.push({
      id: q.id,
      status,
      tier,
      exam: q.exam,
      questionType: q.question_type,
      topic: q.topic,
      blockers: uniqueBlockers,
    });
  }

  const distractorBlocked = blocked.filter(item => item.blockers.some(blocker => blocker.startsWith("missing_distractor_rationale:"))).length;

  console.log(JSON.stringify({
    audit: "strict-question-publication-readiness",
    totalQuestions: result.rows.length,
    publicationReady: ready,
    blocked: blocked.length,
    publishedButInvalid,
    distractorRationaleBlocked: distractorBlocked,
    byIssue,
    byTier,
    byStatus,
    sampleBlocked: blocked.slice(0, 100),
  }, null, 2));
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try { await pool.end(); } catch {}
  });
