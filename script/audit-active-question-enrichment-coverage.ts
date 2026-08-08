import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOTS = [
  "client/src/data/exam-questions",
  "client/src/data/career-questions",
  "client/src/data/newgrad/scenario-questions",
  "client/src/pages/international-nurses",
];
const OVERLAY = path.resolve("client/src/data/question-contract-enrichment.generated.ts");

type Row = { id: string; file: string; line: number; tier: string; hasAuthoredInline: boolean; fingerprint: string };

function text(v: unknown): string { return typeof v === "string" ? v.trim() : ""; }
function norm(v: string): string { return v.toLowerCase().replace(/\s+/g, " ").replace(/[.!?,;:]+$/g, "").trim(); }
function propName(prop: ts.ObjectLiteralElementLike): string | null {
  if (!ts.isPropertyAssignment(prop)) return null;
  return ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name) ? prop.name.text : null;
}
function getProp(node: ts.ObjectLiteralExpression, name: string): ts.Expression | null {
  for (const prop of node.properties) if (propName(prop) === name && ts.isPropertyAssignment(prop)) return prop.initializer;
  return null;
}
function unwrap(node: ts.Expression): ts.Expression {
  while (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) node = node.expression;
  return node;
}
function literalString(node: ts.Expression | null): string {
  if (!node) return "";
  node = unwrap(node);
  return ts.isStringLiteralLike(node) ? node.text.trim() : "";
}
function optionTexts(node: ts.Expression | null): string[] {
  if (!node) return [];
  node = unwrap(node);
  if (!ts.isArrayLiteralExpression(node)) return [];
  return node.elements.map(element => {
    if (!ts.isExpression(element)) return "";
    const e = unwrap(element);
    if (ts.isStringLiteralLike(e)) return e.text.trim();
    if (ts.isObjectLiteralExpression(e)) {
      return literalString(getProp(e, "text")) || literalString(getProp(e, "content")) || literalString(getProp(e, "value")) || literalString(getProp(e, "label"));
    }
    return "";
  }).filter(Boolean);
}
function hasNonEmptyObject(node: ts.Expression | null): boolean {
  if (!node) return false;
  node = unwrap(node);
  return ts.isObjectLiteralExpression(node) && node.properties.length > 0;
}
function collectFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.|\.spec\./.test(entry.name) && !/index\.ts$/.test(entry.name) && !entry.name.includes("question-contract-enrichment.generated")) out.push(full);
    }
  };
  walk(root); return out;
}

function scan(): Row[] {
  const rows: Row[] = [];
  for (const file of ROOTS.flatMap(collectFiles)) {
    const source = fs.readFileSync(file, "utf8");
    const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    let ordinal = 0;
    const visit = (node: ts.Node) => {
      if (ts.isObjectLiteralExpression(node)) {
        ordinal++;
        const stem = literalString(getProp(node, "stem")) || literalString(getProp(node, "question")) || literalString(getProp(node, "questionText"));
        const rationale = literalString(getProp(node, "rationale")) || literalString(getProp(node, "rationaleCorrect"));
        const optionNode = getProp(node, "options") || getProp(node, "answerOptions");
        const optionList = optionTexts(optionNode);
        if (stem && rationale && optionNode && optionList.length >= 2) {
          const explicit = literalString(getProp(node, "id")) || literalString(getProp(node, "questionId"));
          const id = explicit || `source-${path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(ordinal).padStart(6, "0")}`;
          const inlineCorrect = literalString(getProp(node, "correctAnswerExplanation")) || literalString(getProp(node, "correct_answer_explanation"));
          const inlineHint = literalString(getProp(node, "hint")) || literalString(getProp(node, "examStrategy"));
          const inlineWhy = literalString(getProp(node, "whyThisMatters")) || literalString(getProp(node, "keyTakeaway"));
          const inlinePearl = literalString(getProp(node, "clinicalPearl")) || literalString(getProp(node, "examPearl"));
          const inlineDistractors = hasNonEmptyObject(getProp(node, "distractorRationales")) || hasNonEmptyObject(getProp(node, "distractor_rationales"));
          const qtype = literalString(getProp(node, "questionType")) || literalString(getProp(node, "question_type")) || "MCQ";
          const tier = literalString(getProp(node, "tier")) || literalString(getProp(node, "servingTier")) || "allied";
          const fingerprint = `${norm(tier)}::${norm(qtype)}::${norm(stem)}::${optionList.map(norm).join("||")}`;
          const lc = sf.getLineAndCharacterOfPosition(node.getStart(sf));
          rows.push({ id, file, line: lc.line + 1, tier, fingerprint, hasAuthoredInline: !!inlineCorrect && !!inlineHint && !!inlineWhy && !!inlinePearl && inlineDistractors });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return rows;
}

function overlayIds(): { authored: Set<string>; needsReview: Set<string> } {
  if (!fs.existsSync(OVERLAY)) return { authored: new Set(), needsReview: new Set() };
  const source = fs.readFileSync(OVERLAY, "utf8");
  const authored = new Set<string>();
  const needsReview = new Set<string>();
  const sf = ts.createSourceFile(OVERLAY, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const visit = (node: ts.Node) => {
    if (ts.isPropertyAssignment(node) && (ts.isStringLiteralLike(node.name) || ts.isIdentifier(node.name)) && ts.isObjectLiteralExpression(node.initializer)) {
      const id = node.name.text;
      const status = literalString(getProp(node.initializer, "editorialStatus"));
      if (status === "authored-v2") authored.add(id);
      if (status === "needs-review") needsReview.add(id);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { authored, needsReview };
}

const rows = scan();
const overlay = overlayIds();
// Learner loaders deduplicate repeated items within a serving tier/pathway, never across tiers.
const byFingerprint = new Map<string, Row>();
for (const row of rows) if (!byFingerprint.has(row.fingerprint)) byFingerprint.set(row.fingerprint, row);
const active = [...byFingerprint.values()];
const duplicateSourceObjectsExcluded = rows.length - active.length;
const complete = active.filter(row => row.hasAuthoredInline || overlay.authored.has(row.id));
const missing = active.filter(row => !row.hasAuthoredInline && !overlay.authored.has(row.id));
const needsReview = active.filter(row => overlay.needsReview.has(row.id));

const byTier: Record<string, { total: number; authoredV2: number; missing: number }> = {};
for (const row of active) {
  byTier[row.tier] ||= { total: 0, authoredV2: 0, missing: 0 };
  byTier[row.tier].total++;
  if (row.hasAuthoredInline || overlay.authored.has(row.id)) byTier[row.tier].authoredV2++;
  else byTier[row.tier].missing++;
}

const result = {
  sourceQuestionObjects: rows.length,
  canonicalUniqueLearnerQuestions: active.length,
  duplicateSourceObjectsExcluded,
  authoredV2: complete.length,
  missingAuthoredV2: missing.length,
  needsReview: needsReview.length,
  coveragePercent: active.length ? Math.round((complete.length / active.length) * 10000) / 100 : 100,
  byTier,
  sampleMissing: missing.slice(0, 200),
  sampleNeedsReview: needsReview.slice(0, 200),
};
console.log(JSON.stringify(result, null, 2));
if (missing.length || needsReview.length) process.exitCode = 2;
