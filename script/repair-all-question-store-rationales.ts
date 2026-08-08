import OpenAI from "openai";
import { pool } from "../server/storage";

type Store = {
  table: string;
  id: string;
  stem: string;
  options: string;
  correct: string;
  rationale: string;
  distractors: string;
  correctExplanation: string;
  clinicalPearl: string | null;
  status: string | null;
  tier: string | null;
  exam: string | null;
  topic: string | null;
};

type OptionRef = { key: string; label: string; text: string; index: number; aliases: string[] };
type JsonRecord = Record<string, unknown>;

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
const MIN_RATIONALE = 20;
const MIN_DISTRACTOR = 24;
const MIN_CORRECT_EXPLANATION = 24;
const PLACEHOLDER = /^(?:tbd|todo|placeholder|n\/?a|none|rationale here|add rationale|see rationale|explanation|coming soon|to be added|to be determined|not available|-+|\.+)$/i;

function qi(value: string): string {
  if (!IDENTIFIER.test(value)) throw new Error(`Unsafe identifier ${value}`);
  return `"${value}"`;
}

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
    const fallback = String.fromCharCode(65 + index);
    if (typeof option === "string" || typeof option === "number") {
      const optionText = String(option).trim();
      return { key: fallback, label: fallback, text: optionText, index, aliases: [fallback, String(index), optionText] };
    }
    const obj = option && typeof option === "object" ? option as JsonRecord : {};
    const id = text(obj.id);
    const label = text(obj.label) || fallback;
    const optionText = text(obj.text) || text(obj.content) || text(obj.value) || JSON.stringify(option);
    const key = id || label;
    return {
      key,
      label,
      text: optionText,
      index,
      aliases: Array.from(new Set([key, id, label, fallback, String(index), optionText].filter(Boolean))),
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

function resolveCorrect(raw: unknown, options: OptionRef[]): Set<string> {
  const resolved = new Set<string>();
  for (const answer of flattenAnswer(raw)) {
    if (answer === null || answer === undefined) continue;
    if (typeof answer === "number" && Number.isInteger(answer)) {
      const option = options[answer];
      if (option) resolved.add(option.key);
      continue;
    }
    const needle = String(answer).trim().toLowerCase();
    if (!needle) continue;
    const option = options.find(candidate => candidate.aliases.some(alias => alias.toLowerCase() === needle));
    if (option) resolved.add(option.key);
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
    if (substantive(direct, MIN_DISTRACTOR)) return direct;
    const caseInsensitive = Object.keys(map).find(key => key.toLowerCase() === alias.toLowerCase());
    if (caseInsensitive && substantive(map[caseInsensitive], MIN_DISTRACTOR)) return map[caseInsensitive];
  }
  return "";
}

function first(columns: Set<string>, candidates: string[]): string | null {
  return candidates.find(candidate => columns.has(candidate)) || null;
}

async function discoverRepairableStores(): Promise<{ repairable: Store[]; unsupported: Array<{ table: string; missing: string[] }> }> {
  const result = await pool.query(`
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position
  `);
  const grouped = new Map<string, Set<string>>();
  for (const row of result.rows) {
    if (!grouped.has(row.table_name)) grouped.set(row.table_name, new Set());
    grouped.get(row.table_name)!.add(row.column_name);
  }

  const repairable: Store[] = [];
  const unsupported: Array<{ table: string; missing: string[] }> = [];
  for (const [table, columns] of grouped) {
    const stem = first(columns, ["stem", "question_stem", "question", "prompt"]);
    const options = first(columns, ["options", "answer_options", "choices"]);
    const correct = first(columns, ["correct_answer", "correct_index", "correct_answer_id", "answer_key", "correct"]);
    if (!stem || !options || !correct) continue;

    const id = first(columns, ["id", "question_id", "blueprint_id"]);
    const rationale = first(columns, ["rationale", "rationale_long", "explanation"]);
    const distractors = first(columns, ["distractor_rationales", "distractor_explanations", "option_rationales"]);
    const correctExplanation = first(columns, ["correct_answer_explanation", "learning_objective", "answer_explanation"]);
    const missing = [!id && "id", !rationale && "rationale", !distractors && "distractor_rationales", !correctExplanation && "correct_answer_explanation"].filter(Boolean) as string[];
    if (missing.length > 0) {
      unsupported.push({ table, missing });
      continue;
    }

    repairable.push({
      table,
      id: id!,
      stem,
      options,
      correct,
      rationale: rationale!,
      distractors: distractors!,
      correctExplanation: correctExplanation!,
      clinicalPearl: first(columns, ["clinical_pearl", "pearl"]),
      status: first(columns, ["status", "publication_status"]),
      tier: first(columns, ["tier", "serving_tier", "career_type"]),
      exam: first(columns, ["exam", "exam_tag", "exam_type"]),
      topic: first(columns, ["topic", "subtopic", "blueprint_category"]),
    });
  }
  return { repairable, unsupported };
}

function selectColumn(column: string | null, alias: string): string {
  return column ? `${qi(column)} AS ${qi(alias)}` : `NULL AS ${qi(alias)}`;
}

async function loadRows(store: Store, limit: number): Promise<any[]> {
  const selected = [
    selectColumn(store.id, "id"),
    selectColumn(store.stem, "stem"),
    selectColumn(store.options, "options"),
    selectColumn(store.correct, "correct"),
    selectColumn(store.rationale, "rationale"),
    selectColumn(store.distractors, "distractors"),
    selectColumn(store.correctExplanation, "correct_explanation"),
    selectColumn(store.clinicalPearl, "clinical_pearl"),
    selectColumn(store.status, "status"),
    selectColumn(store.tier, "tier"),
    selectColumn(store.exam, "exam"),
    selectColumn(store.topic, "topic"),
  ].join(", ");

  const where = store.status ? ` WHERE ${qi(store.status)} IN ('draft','published') OR ${qi(store.status)} IS NULL` : "";
  const result = await pool.query(`SELECT ${selected} FROM ${qi(store.table)}${where} ORDER BY ${qi(store.id)} LIMIT $1`, [limit]);
  return result.rows;
}

function needsRepair(row: any): { needed: boolean; options: OptionRef[]; correct: Set<string>; missing: OptionRef[] } {
  const options = normalizeOptions(row.options);
  const correct = resolveCorrect(row.correct, options);
  const map = rationaleMap(row.distractors);
  const missing = options.filter(option => !correct.has(option.key) && !lookupRationale(map, option));
  return {
    needed: !substantive(row.rationale, MIN_RATIONALE) || !substantive(row.correct_explanation, MIN_CORRECT_EXPLANATION) || missing.length > 0,
    options,
    correct,
    missing,
  };
}

function buildPrompt(store: Store, row: any, options: OptionRef[], correct: Set<string>, missing: OptionRef[]): string {
  return `Repair only missing rationale fields for one existing healthcare exam question. Preserve the question, all options, answer key, scope, and publication status. Return ONLY JSON.\n\nStore: ${store.table}\nTier/career: ${row.tier || "unknown"}\nExam: ${row.exam || "unknown"}\nTopic: ${row.topic || "unknown"}\nStem: ${row.stem}\n\nOptions:\n${options.map(option => `${option.key} [${option.label}] ${correct.has(option.key) ? "CORRECT" : "INCORRECT"}: ${option.text}`).join("\n")}\n\nExisting rationale: ${row.rationale || "<missing>"}\nExisting correct-answer explanation: ${row.correct_explanation || "<missing>"}\nExisting distractor rationales: ${JSON.stringify(rationaleMap(row.distractors))}\n\nReturn this shape:\n{\n  "rationale": "specific overall rationale, at least 80 characters",\n  "correct_answer_explanation": "specific reason the keyed answer is correct, at least 24 characters",\n  "clinical_pearl": "optional high-yield takeaway",\n  "distractor_rationales": {\n    ${missing.map(option => `"${option.key}": "specific reason this incorrect option is wrong, at least 24 characters"`).join(",\n    ")}\n  }\n}\n\nEvery requested distractor key must be present exactly. Explain the actual misconception, unsafe action, wrong priority, or clinical/professional reason. Do not write generic filler and do not invent citations.`;
}

function parseModelJson(raw: string): JsonRecord {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Model did not return JSON");
  return JSON.parse(match[0]);
}

async function updateRow(store: Store, row: any, rationale: string, explanation: string, distractors: Record<string, string>, pearl: string) {
  const sets = [
    `${qi(store.rationale)} = $1`,
    `${qi(store.correctExplanation)} = $2`,
    `${qi(store.distractors)} = $3::jsonb`,
  ];
  const params: unknown[] = [rationale, explanation, JSON.stringify(distractors)];
  if (store.clinicalPearl) {
    params.push(pearl);
    sets.push(`${qi(store.clinicalPearl)} = $${params.length}`);
  }
  params.push(row.id);
  await pool.query(`UPDATE ${qi(store.table)} SET ${sets.join(", ")} WHERE ${qi(store.id)} = $${params.length}`, params);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const perStoreArg = process.argv.find(arg => arg.startsWith("--per-store="));
  const maxRepairsArg = process.argv.find(arg => arg.startsWith("--max-repairs="));
  const perStore = perStoreArg ? Math.max(1, Number(perStoreArg.split("=")[1]) || 1000) : 5000;
  const maxRepairs = maxRepairsArg ? Math.max(1, Number(maxRepairsArg.split("=")[1]) || 100) : 100;
  const discovered = await discoverRepairableStores();

  const auditSummary: Array<{ table: string; scanned: number; candidates: number; unsafeAnswerContracts: number }> = [];
  const candidates: Array<{ store: Store; row: any; shape: ReturnType<typeof needsRepair> }> = [];

  for (const store of discovered.repairable) {
    const rows = await loadRows(store, perStore);
    let candidateCount = 0;
    let unsafe = 0;
    for (const row of rows) {
      const shape = needsRepair(row);
      if (!shape.needed) continue;
      candidateCount++;
      if (shape.options.length < 2 || shape.correct.size === 0) {
        unsafe++;
        continue;
      }
      candidates.push({ store, row, shape });
    }
    auditSummary.push({ table: store.table, scanned: rows.length, candidates: candidateCount, unsafeAnswerContracts: unsafe });
  }

  console.log(JSON.stringify({
    mode: apply ? "apply" : "audit",
    repairableStores: discovered.repairable.map(store => store.table),
    unsupportedQuestionStores: discovered.unsupported,
    auditSummary,
    totalSafeRepairCandidates: candidates.length,
    maxRepairs,
  }, null, 2));

  if (!apply) return;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("--apply requires AI_INTEGRATIONS_OPENAI_API_KEY or OPENAI_API_KEY");
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const openai = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });

  let repaired = 0;
  let failed = 0;
  const failures: Array<{ table: string; id: string; reason: string }> = [];

  for (const candidate of candidates.slice(0, maxRepairs)) {
    const { store, row, shape } = candidate;
    try {
      const prompt = buildPrompt(store, row, shape.options, shape.correct, shape.missing);
      const response = await openai.chat.completions.create({
        model: process.env.QUESTION_REPAIR_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 1400,
        messages: [{ role: "user", content: prompt }],
      });
      const payload = parseModelJson(response.choices[0]?.message?.content || "");
      const generated = rationaleMap(payload.distractor_rationales);
      const existing = rationaleMap(row.distractors);
      const merged = { ...existing };

      for (const option of shape.options.filter(option => !shape.correct.has(option.key))) {
        const chosen = lookupRationale(existing, option) || lookupRationale(generated, option);
        if (!substantive(chosen, MIN_DISTRACTOR)) throw new Error(`Missing distractor rationale for ${option.key}`);
        merged[option.key] = chosen;
      }

      const rationale = substantive(row.rationale, MIN_RATIONALE) ? row.rationale : text(payload.rationale);
      const explanation = substantive(row.correct_explanation, MIN_CORRECT_EXPLANATION) ? row.correct_explanation : text(payload.correct_answer_explanation);
      const pearl = substantive(row.clinical_pearl, 12) ? row.clinical_pearl : text(payload.clinical_pearl);
      if (!substantive(rationale, MIN_RATIONALE)) throw new Error("Overall rationale still invalid");
      if (!substantive(explanation, MIN_CORRECT_EXPLANATION)) throw new Error("Correct-answer explanation still invalid");

      const post = needsRepair({ ...row, rationale, correct_explanation: explanation, distractors: merged });
      if (post.needed) throw new Error("Post-repair rationale contract still fails");

      await updateRow(store, row, rationale, explanation, merged, pearl);
      repaired++;
      console.log(`[repaired] ${store.table}:${row.id}`);
    } catch (error) {
      failed++;
      const reason = error instanceof Error ? error.message : String(error);
      failures.push({ table: store.table, id: String(row.id), reason });
      console.error(`[failed] ${store.table}:${row.id} ${reason}`);
    }
  }

  console.log(JSON.stringify({ applyComplete: true, attempted: Math.min(candidates.length, maxRepairs), repaired, failed, failures: failures.slice(0, 100) }, null, 2));
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try { await pool.end(); } catch {}
  });
