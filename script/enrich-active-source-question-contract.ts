import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import OpenAI from "openai";

const APPLY = process.argv.includes("--apply");
const limitArg = process.argv.find(arg => arg.startsWith("--limit="));
const LIMIT = limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 1) : Number.POSITIVE_INFINITY;
const onlyArg = process.argv.find(arg => arg.startsWith("--path="));
const ONLY = onlyArg ? onlyArg.split("=")[1] : null;
const OUTPUT = path.resolve("client/src/data/question-contract-enrichment.generated.ts");
const CHECKPOINT = path.resolve(".question-contract-enrichment.checkpoint.json");

const ACTIVE_ROOTS = [
  "client/src/data/exam-questions",
  "client/src/data/career-questions",
  "client/src/data/newgrad/scenario-questions",
  "client/src/pages/international-nurses",
];

const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const openai = APPLY && apiKey ? new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) }) : null;

type Simple = string | number | boolean | null | Simple[] | { [key: string]: Simple };
type Candidate = {
  id: string;
  file: string;
  line: number;
  stem: string;
  options: Array<{ id: string; text: string; label: string }>;
  correctAnswerIds: string[];
  rationale: string;
  topic: string;
  tier: string;
  questionType: string;
  existing: Record<string, any>;
  fingerprint: string;
};
type Enrichment = {
  correctAnswerExplanation?: string;
  distractorRationales?: Record<string, string>;
  hint?: string;
  whyThisMatters?: string;
  clinicalPearl?: string;
  mnemonic?: string;
  unitSystemSupport?: { supported: string[]; default?: string };
  unitVariants?: any[];
  editorialStatus?: "authored-v2" | "needs-review";
};

function text(v: unknown): string { return typeof v === "string" ? v.trim() : ""; }
function slug(v: string): string { return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80); }
function hash(v: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < v.length; i++) { h ^= v.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, "0");
}
function optionId(qid: string, index: number, value: string) { return `${slug(qid) || "q"}:opt:${String(index + 1).padStart(2, "0")}:${hash(value.toLowerCase().trim())}`; }
function normalize(v: string) { return v.toLowerCase().replace(/\s+/g, " ").replace(/[.!?,;:]+$/g, "").trim(); }
function fingerprint(stem: string, options: string[]) { return `${normalize(stem)}::${options.map(normalize).join("||")}`; }

function unwrap(node: ts.Expression): ts.Expression {
  while (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) node = node.expression;
  return node;
}

function literal(node: ts.Expression): Simple | undefined {
  node = unwrap(node);
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    const n = Number(node.operand.text); return node.operator === ts.SyntaxKind.MinusToken ? -n : n;
  }
  if (ts.isArrayLiteralExpression(node)) {
    const out: Simple[] = [];
    for (const element of node.elements) {
      if (!ts.isExpression(element)) return undefined;
      const value = literal(element); if (value === undefined) return undefined; out.push(value);
    }
    return out;
  }
  if (ts.isObjectLiteralExpression(node)) {
    const out: Record<string, Simple> = {};
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name) ? prop.name.text : undefined;
      if (!name) continue;
      const value = literal(prop.initializer); if (value !== undefined) out[name] = value;
    }
    return out;
  }
  return undefined;
}

function props(node: ts.ObjectLiteralExpression): Record<string, Simple> {
  const out: Record<string, Simple> = {};
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name) ? prop.name.text : undefined;
    if (!name) continue;
    const value = literal(prop.initializer); if (value !== undefined) out[name] = value;
  }
  return out;
}

function flattenAnswer(value: any): any[] {
  if (Array.isArray(value)) return value.flatMap(flattenAnswer);
  if (value && typeof value === "object") {
    for (const key of ["ids", "answers", "selected", "correct", "answer", "id", "value", "index"]) if (key in value) return flattenAnswer(value[key]);
  }
  return [value];
}

function resolveAnswers(raw: any, options: Candidate["options"]): string[] {
  const ids: string[] = [];
  for (const value of flattenAnswer(raw)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "number" && Number.isInteger(value)) {
      const option = options[value] || (value > 0 ? options[value - 1] : undefined); if (option) ids.push(option.id); continue;
    }
    const needle = String(value).trim(); if (!needle) continue;
    const option = options.find(o => o.id.toLowerCase() === needle.toLowerCase()) || options.find(o => o.label.toLowerCase() === needle.toLowerCase()) || options.find(o => o.text.toLowerCase() === needle.toLowerCase());
    if (option) ids.push(option.id);
  }
  return [...new Set(ids)];
}

function candidateFromObject(node: ts.ObjectLiteralExpression, sf: ts.SourceFile, file: string, ordinal: number): Candidate | null {
  const p = props(node);
  const stem = text(p.stem) || text(p.question) || text(p.questionText);
  const rawOptions = Array.isArray(p.options) ? p.options : Array.isArray(p.answerOptions) ? p.answerOptions : null;
  const rationale = text(p.rationale) || text(p.rationaleCorrect);
  if (!stem || !rawOptions || rawOptions.length < 2 || !rationale) return null;

  const id = text(p.id) || text(p.questionId) || `source-${slug(path.basename(file, path.extname(file)))}-${String(ordinal).padStart(6, "0")}`;
  const options = rawOptions.map((raw, index) => {
    const label = String.fromCharCode(65 + index);
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const obj = raw as Record<string, Simple>;
      const optionText = text(obj.text) || text(obj.content) || text(obj.value) || text(obj.label);
      return { id: text(obj.id) || text(obj.optionId) || text(obj.option_id) || optionId(id, index, optionText), text: optionText, label: text(obj.label) || label };
    }
    const optionText = String(raw ?? "").trim();
    return { id: optionId(id, index, optionText), text: optionText, label };
  }).filter(option => option.text);
  if (options.length < 2) return null;

  const answerSource = p.correctAnswerIds ?? p.correct_answer_ids ?? p.correctAnswer ?? p.correct_answer ?? p.correctIndex ?? p.correctIndices;
  const correctAnswerIds = resolveAnswers(answerSource, options);
  if (!correctAnswerIds.length) return null;

  const lc = sf.getLineAndCharacterOfPosition(node.getStart(sf));
  return {
    id,
    file,
    line: lc.line + 1,
    stem,
    options,
    correctAnswerIds,
    rationale,
    topic: text(p.topic) || text(p.subtopic) || text(p.bodySystem) || text(p.category) || "General",
    tier: text(p.tier) || "allied",
    questionType: text(p.questionType) || text(p.question_type) || "MCQ",
    existing: p as Record<string, any>,
    fingerprint: fingerprint(stem, options.map(option => option.text)),
  };
}

function collectFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.|\.spec\./.test(entry.name) && !/index\.ts$/.test(entry.name)) out.push(full);
    }
  };
  walk(root); return out;
}

function collectCandidates(): Candidate[] {
  const files = ACTIVE_ROOTS.flatMap(root => collectFiles(root)).filter(file => !ONLY || file.includes(ONLY));
  const found: Candidate[] = [];
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    let ordinal = 0;
    const visit = (node: ts.Node) => {
      if (ts.isObjectLiteralExpression(node)) {
        const candidate = candidateFromObject(node, sf, file, ++ordinal); if (candidate) found.push(candidate);
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return found;
}

function loadCheckpoint(): Record<string, Enrichment> {
  if (!fs.existsSync(CHECKPOINT)) return {};
  try { return JSON.parse(fs.readFileSync(CHECKPOINT, "utf8")); } catch { return {}; }
}
function saveCheckpoint(entries: Record<string, Enrichment>) { fs.writeFileSync(CHECKPOINT, JSON.stringify(entries, null, 2)); }

function substantive(v: unknown, min: number) { return text(v).length >= min && !/^(todo|tbd|placeholder|none|n\/a)$/i.test(text(v)); }
function validateEnrichment(candidate: Candidate, value: Enrichment): string[] {
  const issues: string[] = [];
  if (!substantive(value.correctAnswerExplanation, 24)) issues.push("correctAnswerExplanation");
  if (!substantive(value.hint, 12)) issues.push("hint");
  if (!substantive(value.whyThisMatters, 20)) issues.push("whyThisMatters");
  if (!substantive(value.clinicalPearl, 12)) issues.push("clinicalPearl");
  const distractors = value.distractorRationales || {};
  for (const option of candidate.options) {
    if (!candidate.correctAnswerIds.includes(option.id) && !substantive(distractors[option.id], 24)) issues.push(`distractor:${option.id}`);
  }
  const combined = [candidate.stem, ...candidate.options.map(option => option.text)].join(" ");
  if (/(?:\bmg\/dL\b|\bmmol\/L\b|°F|°C|\blb\b|\bkg\b|\binches?\b|\bcm\b|\bfeet\b|\bft\b|\bmeters?\b)/i.test(combined)) {
    if (!value.unitSystemSupport?.supported?.includes("SI") || !value.unitSystemSupport?.supported?.some(v => /CONV/i.test(v)) || !(value.unitVariants?.length)) issues.push("unitVariants");
  }
  return issues;
}

async function generate(candidate: Candidate): Promise<Enrichment> {
  if (!openai) throw new Error("--apply requires AI_INTEGRATIONS_OPENAI_API_KEY or OPENAI_API_KEY");
  const incorrect = candidate.options.filter(option => !candidate.correctAnswerIds.includes(option.id));
  const prompt = `You are a senior exam-item editor. Author the missing learner-teaching metadata for ONE existing question. Preserve the stem, option texts, correct answer IDs, scope, tier and difficulty exactly.\n\nQuestion ID: ${candidate.id}\nTier: ${candidate.tier}\nQuestion type: ${candidate.questionType}\nTopic: ${candidate.topic}\nStem: ${candidate.stem}\nOptions:\n${candidate.options.map(o => `${o.id} [${o.label}] ${candidate.correctAnswerIds.includes(o.id) ? "CORRECT" : "INCORRECT"}: ${o.text}`).join("\n")}\nExisting rationale: ${candidate.rationale}\n\nReturn ONLY JSON:\n{\n  "correctAnswerExplanation": "specific explanation of why the keyed answer is correct",\n  "distractorRationales": {${incorrect.map(o => `\n    "${o.id}": "specific clinical/professional reason this option is wrong"`).join(",")}\n  },\n  "hint": "brief useful hint that does not reveal the answer",\n  "whyThisMatters": "why this decision matters in real practice",\n  "clinicalPearl": "specific high-yield takeaway",\n  "mnemonic": "real mnemonic only when genuinely useful, otherwise empty string",\n  "unitSystemSupport": {"supported": ["SI","CONV"], "default": "SI"},\n  "unitVariants": []\n}\n\nRules: every incorrect option needs its own non-generic rationale keyed by the exact stable option ID. Do not merely say it is incorrect. Explain the misconception, unsafe action, wrong priority, mechanism, or criterion. If the stem/options contain a genuinely convertible measurement, provide mathematically equivalent structured SI/CONV unitVariants; otherwise return an empty array and unitSystemSupport may still contain SI/CONV. No citations. No markdown.`;
  const response = await openai.chat.completions.create({
    model: process.env.QUESTION_REPAIR_MODEL || "gpt-4o-mini",
    temperature: 0.2,
    max_tokens: 1800,
    messages: [{ role: "user", content: prompt }],
  });
  const raw = response.choices[0]?.message?.content || "";
  const match = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Model did not return JSON");
  const value = JSON.parse(match[0]) as Enrichment;
  const issues = validateEnrichment(candidate, value);
  value.editorialStatus = issues.length ? "needs-review" : "authored-v2";
  if (issues.length) throw new Error(`Generated enrichment failed validation: ${issues.join(", ")}`);
  return value;
}

function renderModule(entries: Record<string, Enrichment>): string {
  return `// Generated by script/enrich-active-source-question-contract.ts.\n// Re-run the bulk enrichment pipeline instead of hand-editing entries.\nexport type QuestionContractEnrichment = {\n  correctAnswerExplanation?: string;\n  distractorRationales?: Record<string, string>;\n  hint?: string;\n  whyThisMatters?: string;\n  clinicalPearl?: string;\n  mnemonic?: string;\n  countryCode?: string;\n  regionScope?: string;\n  languageCode?: string;\n  licensingBody?: string;\n  unitSystemSupport?: { supported: string[]; default?: string };\n  unitVariants?: Array<{ token: string; quantity: string; si: { value: number | string; unit: string; display: string }; conv: { value: number | string; unit: string; display: string } }>;\n  editorialStatus?: \"authored-v2\" | \"needs-review\";\n};\n\nexport const QUESTION_CONTRACT_ENRICHMENT: Record<string, QuestionContractEnrichment> = ${JSON.stringify(entries, null, 2)};\n`;
}

async function main() {
  const candidates = collectCandidates();
  const checkpoint = loadCheckpoint();
  const byFingerprint = new Map<string, Enrichment>();
  for (const candidate of candidates) if (checkpoint[candidate.id]?.editorialStatus === "authored-v2") byFingerprint.set(candidate.fingerprint, checkpoint[candidate.id]);

  let processed = 0, generated = 0, reused = 0, failed = 0;
  const failures: Array<{ id: string; file: string; line: number; error: string }> = [];
  for (const candidate of candidates) {
    if (processed >= LIMIT) break;
    if (checkpoint[candidate.id]?.editorialStatus === "authored-v2") continue;
    processed++;
    try {
      const reusable = byFingerprint.get(candidate.fingerprint);
      if (reusable) {
        // Distractor keys are option-id specific; only reuse if the option texts and derived stable IDs match exactly.
        const keys = Object.keys(reusable.distractorRationales || {});
        const expected = candidate.options.filter(o => !candidate.correctAnswerIds.includes(o.id)).map(o => o.id);
        if (keys.every(k => expected.includes(k)) && expected.every(k => keys.includes(k))) {
          checkpoint[candidate.id] = reusable; reused++; continue;
        }
      }
      if (!APPLY) continue;
      const value = await generate(candidate);
      checkpoint[candidate.id] = value;
      byFingerprint.set(candidate.fingerprint, value);
      generated++;
      if ((generated + reused) % 10 === 0) saveCheckpoint(checkpoint);
    } catch (error) {
      failed++;
      failures.push({ id: candidate.id, file: candidate.file, line: candidate.line, error: error instanceof Error ? error.message : String(error) });
    }
  }

  if (APPLY) {
    saveCheckpoint(checkpoint);
    fs.writeFileSync(OUTPUT, renderModule(checkpoint));
  }
  console.log(JSON.stringify({ mode: APPLY ? "apply" : "audit", discovered: candidates.length, processed, generated, reused, failed, authoredOverlayEntries: Object.keys(checkpoint).length, failures: failures.slice(0, 100) }, null, 2));
  if (failed) process.exitCode = 2;
}

main().catch(error => { console.error(error); process.exitCode = 1; });
