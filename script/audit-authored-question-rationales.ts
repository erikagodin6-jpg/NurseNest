import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

type Issue = {
  file: string;
  line: number;
  column: number;
  stem: string;
  issues: string[];
};

const ROOTS = ["server", "script", "scripts"];
const IGNORE_PARTS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  "generated",
  "question-publication-readiness",
  "audit-authored-question-rationales",
];

const CORRECT_KEYS = new Set(["correct", "correctAnswer", "correct_answer", "correctIndex", "answer"]);
const DISTRACTOR_KEYS = new Set(["distractorRationales", "distractor_rationales", "dr"]);
const CORRECT_EXPLANATION_KEYS = new Set(["correctAnswerExplanation", "correct_answer_explanation"]);
const PEARL_KEYS = new Set(["clinicalPearl", "clinical_pearl", "cp"]);
const RATIONALE_KEYS = new Set(["rationale", "rat"]);
const MIN_DISTRACTOR_CHARS = 24;
const MIN_RATIONALE_CHARS = 20;

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const normalized = full.split(path.sep).join("/");
    if (IGNORE_PARTS.some(part => normalized.includes(`/${part}/`) || normalized.endsWith(`/${part}`))) continue;
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(?:ts|tsx|js|cjs|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function propName(node: ts.PropertyName | undefined): string | null {
  if (!node) return null;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return null;
}

function propertyMap(node: ts.ObjectLiteralExpression): Map<string, ts.Expression> {
  const map = new Map<string, ts.Expression>();
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = propName(prop.name);
    if (name) map.set(name, prop.initializer);
  }
  return map;
}

function getByAliases(map: Map<string, ts.Expression>, aliases: Set<string>): ts.Expression | undefined {
  for (const alias of aliases) {
    const value = map.get(alias);
    if (value) return value;
  }
  return undefined;
}

function staticString(node: ts.Expression | undefined): string | null {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text.trim();
  return null;
}

function staticArrayLength(node: ts.Expression | undefined): number | null {
  return node && ts.isArrayLiteralExpression(node) ? node.elements.length : null;
}

function staticNumber(node: ts.Expression | undefined): number | null {
  if (!node) return null;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  return null;
}

function staticCorrectIndexes(node: ts.Expression | undefined): Set<number> | null {
  if (!node) return null;
  if (ts.isNumericLiteral(node)) return new Set([Number(node.text)]);
  if (ts.isArrayLiteralExpression(node)) {
    const indexes = new Set<number>();
    for (const el of node.elements) {
      if (!ts.isNumericLiteral(el)) return null;
      indexes.add(Number(el.text));
    }
    return indexes;
  }
  return null;
}

function staticObjectEntries(node: ts.Expression | undefined): Map<string, string> | null {
  if (!node || !ts.isObjectLiteralExpression(node)) return null;
  const map = new Map<string, string>();
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) return null;
    const name = propName(prop.name);
    const value = staticString(prop.initializer);
    if (name === null || value === null) return null;
    map.set(name, value);
  }
  return map;
}

function hasSubstantiveText(node: ts.Expression | undefined, minChars: number): boolean | null {
  if (!node) return false;
  const value = staticString(node);
  if (value === null) return null;
  return value.length >= minChars;
}

function inferDistractorCoverage(
  optionsNode: ts.Expression | undefined,
  correctNode: ts.Expression | undefined,
  distractorNode: ts.Expression | undefined,
): { complete: boolean | null; detail?: string } {
  const optionCount = staticArrayLength(optionsNode);
  const correct = staticCorrectIndexes(correctNode);
  const rationales = staticObjectEntries(distractorNode);
  if (optionCount === null || correct === null || rationales === null) return { complete: null };

  const expected = new Set<number>();
  for (let i = 0; i < optionCount; i++) if (!correct.has(i)) expected.add(i);

  const missing: string[] = [];
  for (const index of expected) {
    const letter = String.fromCharCode(65 + index);
    const candidates = [String(index), letter];
    const found = candidates.some(key => {
      const rationale = rationales.get(key);
      return !!rationale && rationale.trim().length >= MIN_DISTRACTOR_CHARS;
    });
    if (!found) missing.push(`${letter}/${index}`);
  }

  return missing.length === 0
    ? { complete: true }
    : { complete: false, detail: `missing substantive distractor rationale for ${missing.join(", ")}` };
}

function inspectObject(node: ts.ObjectLiteralExpression, source: ts.SourceFile, file: string): Issue | null {
  const props = propertyMap(node);
  const stemNode = props.get("stem");
  const optionsNode = props.get("options");
  const correctNode = getByAliases(props, CORRECT_KEYS);

  if (!stemNode || !optionsNode || !correctNode) return null;

  const issues: string[] = [];
  const stem = staticString(stemNode) || "<dynamic stem>";
  const rationaleNode = getByAliases(props, RATIONALE_KEYS);
  const distractorNode = getByAliases(props, DISTRACTOR_KEYS);
  const correctExplanationNode = getByAliases(props, CORRECT_EXPLANATION_KEYS);
  const pearlNode = getByAliases(props, PEARL_KEYS);

  const rationaleOkay = hasSubstantiveText(rationaleNode, MIN_RATIONALE_CHARS);
  if (rationaleOkay === false) issues.push("missing_or_short_rationale");

  if (!distractorNode) {
    issues.push("missing_distractor_rationales");
  } else {
    const coverage = inferDistractorCoverage(optionsNode, correctNode, distractorNode);
    if (coverage.complete === false) issues.push(`incomplete_distractor_rationales:${coverage.detail}`);
    else if (coverage.complete === null) {
      const staticEntries = staticObjectEntries(distractorNode);
      if (staticEntries && staticEntries.size === 0) issues.push("empty_distractor_rationales");
    }
  }

  if (!correctExplanationNode) issues.push("missing_correct_answer_explanation");
  if (!pearlNode) issues.push("missing_clinical_pearl");
  if (issues.length === 0) return null;

  const pos = source.getLineAndCharacterOfPosition(node.getStart(source));
  return {
    file: file.split(path.sep).join("/"),
    line: pos.line + 1,
    column: pos.character + 1,
    stem: stem.slice(0, 160),
    issues,
  };
}

function inspectFile(file: string): Issue[] {
  const sourceText = fs.readFileSync(file, "utf8");
  const kind = file.endsWith(".tsx") ? ts.ScriptKind.TSX : file.endsWith(".js") || file.endsWith(".cjs") || file.endsWith(".mjs") ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true, kind);
  const issues: Issue[] = [];

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const issue = inspectObject(node, source, file);
      if (issue) issues.push(issue);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return issues;
}

function main() {
  const files = ROOTS.flatMap(root => walk(root));
  const issues = files.flatMap(inspectFile);
  const byIssue: Record<string, number> = {};
  const byFile: Record<string, number> = {};

  for (const issue of issues) {
    byFile[issue.file] = (byFile[issue.file] || 0) + 1;
    for (const item of issue.issues) {
      const key = item.split(":", 1)[0];
      byIssue[key] = (byIssue[key] || 0) + 1;
    }
  }

  console.log(JSON.stringify({
    audit: "authored-question-rationale-contract",
    scannedFiles: files.length,
    failingQuestionObjects: issues.length,
    byIssue,
    byFile,
    issues,
  }, null, 2));

  if (issues.length > 0) process.exitCode = 1;
}

main();
