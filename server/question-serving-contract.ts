import { createHash } from "node:crypto";

type AnyRow = Record<string, any>;
export type ServedOption = { id: string; text: string; label: string };
export type UnitPreference = "SI" | "CONV";

type UnitVariant = {
  token?: string;
  quantity?: string;
  si?: { display?: string; value?: string | number; unit?: string };
  conv?: { display?: string; value?: string | number; unit?: string };
};

function parse(v: unknown): any {
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); } catch { return v; }
}
function text(v: unknown): string { return typeof v === "string" ? v.trim() : ""; }
function slug(v: string) { return v.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80); }
function stableOptionId(questionId: string, index: number, optionText: string) {
  const digest = createHash("sha1").update(optionText.trim().toLowerCase()).digest("hex").slice(0,8);
  return `${slug(questionId)||"q"}:opt:${String(index+1).padStart(2,"0")}:${digest}`;
}

export function canonicalOptions(row: AnyRow): ServedOption[] {
  const questionId = String(row.contract_question_id || row.id || row.question_id || row.blueprint_id || "question");
  const canonical = parse(row.contract_options);
  const raw = Array.isArray(canonical) && canonical.length ? canonical : parse(row.options ?? row.answer_options ?? row.choices);
  if (Array.isArray(raw)) {
    return raw.map((o:any,i:number) => {
      const label = String.fromCharCode(65+i);
      if (o && typeof o === "object") {
        const optionText = text(o.text) || text(o.content) || text(o.value);
        return { id: text(o.id) || text(o.optionId) || text(o.option_id) || stableOptionId(questionId,i,optionText), text: optionText, label: text(o.label)||label };
      }
      const optionText = String(o ?? "").trim();
      return { id: stableOptionId(questionId,i,optionText), text: optionText, label };
    }).filter(o => o.text);
  }

  const split = ["option_a","option_b","option_c","option_d","option_e","option_f"]
    .filter(k => text(row[k]))
    .map(k => row[k]);
  return split.map((o:any,i:number) => {
    const optionText = String(o).trim();
    return { id: stableOptionId(questionId,i,optionText), text: optionText, label:String.fromCharCode(65+i) };
  });
}

function flattenAnswer(v: unknown): unknown[] {
  const p = parse(v);
  if (Array.isArray(p)) return p.flatMap(flattenAnswer);
  if (p && typeof p === "object") {
    for (const k of ["ids","answers","selected","correct","answer","id","value","index"]) if (k in p) return flattenAnswer(p[k]);
  }
  return [p];
}

export function resolveOptionId(value: unknown, options: ServedOption[]): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" && Number.isInteger(value)) return options[value]?.id || (value > 0 ? options[value-1]?.id : null) || null;
  const needle = String(value).trim();
  if (!needle) return null;
  const byId = options.find(o => o.id.toLowerCase() === needle.toLowerCase());
  if (byId) return byId.id;
  const byLabel = options.find(o => o.label.toLowerCase() === needle.toLowerCase());
  if (byLabel) return byLabel.id;
  const byText = options.find(o => o.text.toLowerCase() === needle.toLowerCase());
  if (byText) return byText.id;
  const numeric = Number(needle);
  if (Number.isInteger(numeric)) return options[numeric]?.id || (numeric > 0 ? options[numeric-1]?.id : null) || null;
  return null;
}

export function correctAnswerIds(row: AnyRow, options = canonicalOptions(row)): string[] {
  const canonical = parse(row.contract_correct_answer_ids);
  const source = Array.isArray(canonical) && canonical.length ? canonical : row.correct_answer ?? row.correctAnswer ?? row.correct_index ?? row.answer_key;
  return [...new Set(flattenAnswer(source).map(v => resolveOptionId(v,options)).filter((v):v is string => !!v))];
}

export function gradeQuestionAttempt(row: AnyRow, selected: unknown): { correct: boolean; selectedOptionId: string | null; correctAnswerIds: string[] } {
  const options = canonicalOptions(row);
  const selectedOptionId = resolveOptionId(selected,options);
  const correctIds = correctAnswerIds(row,options);
  return { correct: !!selectedOptionId && correctIds.includes(selectedOptionId), selectedOptionId, correctAnswerIds:correctIds };
}

function unitVariants(row: AnyRow): UnitVariant[] {
  const p = parse(row.contract_unit_variants ?? row.unit_variants);
  return Array.isArray(p) ? p : [];
}

function replaceVariantText(input: string, variant: UnitVariant, preference: UnitPreference): string {
  const si = text(variant.si?.display);
  const conv = text(variant.conv?.display);
  const target = preference === "SI" ? si : conv;
  if (!target) return input;
  let out = input;
  if (si && si !== target) out = out.split(si).join(target);
  if (conv && conv !== target) out = out.split(conv).join(target);
  if (variant.token && out.includes(`{{${variant.token}}}`)) out = out.split(`{{${variant.token}}}`).join(target);
  return out;
}

export function renderUnitPreference(row: AnyRow, preference: UnitPreference): { stem: string; options: ServedOption[] } {
  let stem = String(row.stem ?? row.question ?? row.question_text ?? "");
  let options = canonicalOptions(row);
  for (const variant of unitVariants(row)) {
    stem = replaceVariantText(stem,variant,preference);
    options = options.map(o => ({ ...o, text: replaceVariantText(o.text,variant,preference) }));
  }
  return { stem, options };
}

function rationaleMap(row: AnyRow): Record<string,string> {
  const p = parse(row.contract_distractor_rationales ?? row.distractor_rationales ?? row.incorrect_answer_rationale);
  return p && typeof p === "object" && !Array.isArray(p) ? p : {};
}

export function learnerQuestionPayload(row: AnyRow, preference: UnitPreference = "SI") {
  const rendered = renderUnitPreference(row,preference);
  return {
    id: String(row.contract_question_id || row.id || row.question_id || row.blueprint_id),
    stem: rendered.stem,
    options: rendered.options,
    questionType: row.question_type || row.questionType || row.question_format || "MCQ",
    tier: row.tier || row.serving_tier || null,
    exam: row.exam || row.exam_tag || row.exam_type || null,
    countryCode: row.contract_country_code || row.country_code || row.country || null,
    regionScope: row.contract_region_scope || row.region_scope || row.region_code || null,
    languageCode: row.contract_language_code || row.language_code || row.locale || "en",
    bodySystem: row.body_system || row.category || row.blueprint_category || null,
    topic: row.topic || row.subtopic || null,
    difficulty: row.difficulty ?? null,
    unitPreference: preference,
    optionContractVersion: row.option_contract_version || 2,
    publicationContractVersion: row.publication_contract_version || 2,
  };
}

export function reviewQuestionPayload(row: AnyRow, selected: unknown, preference: UnitPreference = "SI") {
  const base = learnerQuestionPayload(row,preference);
  const grade = gradeQuestionAttempt(row,selected);
  const distractors = rationaleMap(row);
  return {
    ...base,
    ...grade,
    rationale: row.contract_rationale || row.rationale || row.rationale_long || row.rationale_correct || null,
    correctAnswerExplanation: row.contract_correct_answer_explanation || row.correct_answer_explanation || row.learning_objective || null,
    distractorRationales: distractors,
    selectedDistractorRationale: grade.selectedOptionId && !grade.correct ? distractors[grade.selectedOptionId] || null : null,
    hint: row.contract_hint || row.hint || row.exam_strategy || null,
    whyThisMatters: row.contract_why_this_matters || row.why_this_matters || row.key_takeaway || row.clinical_reasoning || null,
    clinicalPearl: row.contract_clinical_pearl || row.clinical_pearl || row.exam_pearl || row.clinical_takeaway || null,
    mnemonic: row.contract_mnemonic || row.mnemonic || row.memory_hook || null,
    licensingBody: row.contract_licensing_body || row.licensing_body || row.regulatory_body || null,
  };
}
