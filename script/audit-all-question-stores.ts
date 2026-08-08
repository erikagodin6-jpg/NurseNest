import { pool } from "../server/storage";

type ColumnRow = { table_name: string; column_name: string; data_type: string; udt_name: string };
type StoreConfig = {
  table: string;
  columns: Set<string>;
  idColumn: string | null;
  stemColumn: string;
  optionsColumn: string;
  correctColumn: string;
  rationaleColumn: string | null;
  distractorColumn: string | null;
  correctExplanationColumn: string | null;
  statusColumn: string | null;
  tierColumn: string | null;
};

type OptionRef = { key: string; aliases: string[]; index: number };

const IDENTIFIER = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const MIN_RATIONALE = 20;
const MIN_DISTRACTOR = 24;
const PLACEHOLDER = /^(?:tbd|todo|placeholder|n\/?a|none|rationale here|add rationale|see rationale|explanation|coming soon|to be added|to be determined|not available|-+|\.+)$/i;

function quoteIdent(value: string): string {
  if (!IDENTIFIER.test(value)) throw new Error(`Unsafe SQL identifier: ${value}`);
  return `"${value}"`;
}

function firstExisting(columns: Set<string>, candidates: string[]): string | null {
  return candidates.find(candidate => columns.has(candidate)) || null;
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

function substantive(value: unknown, min: number): boolean {
  const valueText = text(value);
  return valueText.length >= min && !PLACEHOLDER.test(valueText);
}

function normalizeOptions(raw: unknown): OptionRef[] {
  const parsed = parseJson(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((option, index) => {
    const fallback = String.fromCharCode(65 + index);
    if (typeof option === "string" || typeof option === "number") {
      const value = String(option).trim();
      return { key: fallback, aliases: [fallback, String(index), value], index };
    }
    const obj = option && typeof option === "object" ? option as Record<string, unknown> : {};
    const id = text(obj.id);
    const label = text(obj.label) || fallback;
    const value = text(obj.text) || text(obj.content) || text(obj.value);
    const key = id || label;
    return { key, aliases: Array.from(new Set([key, id, label, fallback, String(index), value].filter(Boolean))), index };
  });
}

function flattenAnswer(raw: unknown): unknown[] {
  const parsed = parseJson(raw);
  if (Array.isArray(parsed)) return parsed.flatMap(flattenAnswer);
  if (parsed && typeof parsed === "object") {
    const obj = parsed as Record<string, unknown>;
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
  return Object.fromEntries(Object.entries(parsed as Record<string, unknown>).map(([key, value]) => [key, text(value)]));
}

function optionHasRationale(map: Record<string, string>, option: OptionRef): boolean {
  for (const alias of option.aliases) {
    const direct = map[alias];
    if (substantive(direct, MIN_DISTRACTOR)) return true;
    const key = Object.keys(map).find(candidate => candidate.toLowerCase() === alias.toLowerCase());
    if (key && substantive(map[key], MIN_DISTRACTOR)) return true;
  }
  return false;
}

async function discoverStores(): Promise<StoreConfig[]> {
  const result = await pool.query<ColumnRow>(`
    SELECT table_name, column_name, data_type, udt_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position
  `);

  const grouped = new Map<string, Set<string>>();
  for (const row of result.rows) {
    if (!grouped.has(row.table_name)) grouped.set(row.table_name, new Set());
    grouped.get(row.table_name)!.add(row.column_name);
  }

  const stores: StoreConfig[] = [];
  for (const [table, columns] of grouped) {
    const stemColumn = firstExisting(columns, ["stem", "question_stem", "question", "prompt"]);
    const optionsColumn = firstExisting(columns, ["options", "answer_options", "choices"]);
    const correctColumn = firstExisting(columns, ["correct_answer", "correct_index", "correct_answer_id", "answer_key", "correct"]);
    if (!stemColumn || !optionsColumn || !correctColumn) continue;

    stores.push({
      table,
      columns,
      idColumn: firstExisting(columns, ["id", "question_id", "blueprint_id"]),
      stemColumn,
      optionsColumn,
      correctColumn,
      rationaleColumn: firstExisting(columns, ["rationale", "rationale_long", "explanation"]),
      distractorColumn: firstExisting(columns, ["distractor_rationales", "distractor_explanations", "option_rationales"]),
      correctExplanationColumn: firstExisting(columns, ["correct_answer_explanation", "learning_objective", "answer_explanation"]),
      statusColumn: firstExisting(columns, ["status", "publication_status"]),
      tierColumn: firstExisting(columns, ["tier", "serving_tier", "career_type"]),
    });
  }
  return stores;
}

async function auditStore(store: StoreConfig) {
  const selected: Array<[string, string | null]> = [
    ["id", store.idColumn],
    ["stem", store.stemColumn],
    ["options", store.optionsColumn],
    ["correct", store.correctColumn],
    ["rationale", store.rationaleColumn],
    ["distractors", store.distractorColumn],
    ["correct_explanation", store.correctExplanationColumn],
    ["status", store.statusColumn],
    ["tier", store.tierColumn],
  ];

  const selectSql = selected.map(([alias, column]) => column ? `${quoteIdent(column)} AS ${quoteIdent(alias)}` : `NULL AS ${quoteIdent(alias)}`).join(", ");
  const query = `SELECT ${selectSql} FROM ${quoteIdent(store.table)}`;
  const result = await pool.query(query);

  const issueCounts: Record<string, number> = {};
  const affected = new Set<string>();
  const samples: Array<{ id: string; status: string | null; tier: string | null; issues: string[] }> = [];

  function record(code: string) {
    issueCounts[code] = (issueCounts[code] || 0) + 1;
  }

  if (!store.rationaleColumn) record("schema_missing_rationale_column");
  if (!store.distractorColumn) record("schema_missing_distractor_rationales_column");
  if (!store.correctExplanationColumn) record("schema_missing_correct_answer_explanation_column");

  result.rows.forEach((row: any, index: number) => {
    const id = String(row.id ?? `${store.table}:${index}`);
    const issues: string[] = [];
    const options = normalizeOptions(row.options);
    const correct = resolveCorrect(row.correct, options);

    if (!substantive(row.stem, 10)) issues.push("missing_or_short_stem");
    if (options.length < 2) issues.push("invalid_options");
    if (correct.size === 0) issues.push("unresolved_correct_answer");
    if (store.rationaleColumn && !substantive(row.rationale, MIN_RATIONALE)) issues.push("missing_or_short_rationale");
    if (store.correctExplanationColumn && !substantive(row.correct_explanation, MIN_RATIONALE)) issues.push("missing_correct_answer_explanation");

    if (store.distractorColumn && options.length >= 2 && correct.size > 0) {
      const rationales = rationaleMap(row.distractors);
      const missing = options.filter(option => !correct.has(option.key) && !optionHasRationale(rationales, option));
      if (missing.length > 0) issues.push(`incomplete_distractor_rationales:${missing.map(option => option.key).join(",")}`);
    }

    if (issues.length === 0) return;
    affected.add(id);
    for (const issue of issues) record(issue.split(":", 1)[0]);
    if (samples.length < 50) samples.push({ id, status: row.status ?? null, tier: row.tier ?? null, issues });
  });

  return {
    table: store.table,
    totalRows: result.rows.length,
    affectedRows: affected.size,
    schema: {
      rationaleColumn: store.rationaleColumn,
      distractorRationalesColumn: store.distractorColumn,
      correctAnswerExplanationColumn: store.correctExplanationColumn,
      statusColumn: store.statusColumn,
      tierColumn: store.tierColumn,
    },
    issueCounts,
    samples,
  };
}

async function main() {
  const stores = await discoverStores();
  const audits = [];
  for (const store of stores) audits.push(await auditStore(store));

  const totals = audits.reduce((acc, audit) => {
    acc.rows += audit.totalRows;
    acc.affected += audit.affectedRows;
    return acc;
  }, { rows: 0, affected: 0 });

  console.log(JSON.stringify({
    audit: "all-question-stores-rationale-contract",
    discoveredStores: stores.map(store => store.table),
    totalRowsAcrossStores: totals.rows,
    affectedRowsAcrossStores: totals.affected,
    stores: audits,
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
