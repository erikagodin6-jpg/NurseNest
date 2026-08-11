import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOTS = ["server", "script", "scripts", "client/src/data"];
const SKIP = new Set(["node_modules", "dist", ".git", "coverage", "build"]);

type Finding = {
  file: string;
  line: number;
  code: string;
  detail: string;
};

function filesUnder(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (SKIP.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(?:ts|tsx|js|cjs|mjs)$/.test(entry.name)) out.push(full);
    }
  };
  walk(root);
  return out;
}

function propName(node: ts.PropertyName | undefined): string | null {
  if (!node) return null;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return null;
}

function propertyMap(node: ts.ObjectLiteralExpression): Map<string, ts.ObjectLiteralElementLike> {
  const map = new Map<string, ts.ObjectLiteralElementLike>();
  for (const prop of node.properties) {
    if (ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop) || ts.isMethodDeclaration(prop)) {
      const name = propName(prop.name);
      if (name) map.set(name, prop);
    }
  }
  return map;
}

function valueNode(prop: ts.ObjectLiteralElementLike | undefined): ts.Expression | null {
  return prop && ts.isPropertyAssignment(prop) ? prop.initializer : null;
}

function hasAny(map: Map<string, ts.ObjectLiteralElementLike>, keys: string[]): boolean {
  return keys.some(key => map.has(key));
}

function looksLikeQuestion(node: ts.ObjectLiteralExpression): boolean {
  const map = propertyMap(node);
  return hasAny(map, ["stem", "question", "questionText"]) && hasAny(map, ["options", "answerOptions", "optionA"]);
}

function add(findings: Finding[], sf: ts.SourceFile, node: ts.Node, code: string, detail: string) {
  const pos = sf.getLineAndCharacterOfPosition(node.getStart(sf));
  findings.push({ file: sf.fileName.replace(/\\/g, "/"), line: pos.line + 1, code, detail });
}

function inspectQuestion(findings: Finding[], sf: ts.SourceFile, node: ts.ObjectLiteralExpression) {
  const map = propertyMap(node);

  if (!hasAny(map, ["id", "questionId", "question_id", "blueprintId", "blueprint_id"])) {
    add(findings, sf, node, "missing_stable_question_id", "Question-like object has no stable identifier field.");
  }

  const optionsProp = map.get("options") || map.get("answerOptions");
  const options = valueNode(optionsProp);
  if (options && ts.isArrayLiteralExpression(options)) {
    const literalOptions = options.elements.filter(ts.isExpression);
    if (literalOptions.length > 0 && literalOptions.every(opt => ts.isStringLiteralLike(opt) || ts.isNumericLiteral(opt))) {
      add(findings, sf, options, "positional_options", "Options are primitive literals; canonical authored questions require stable option IDs before persistence.");
    }
    for (const opt of literalOptions) {
      if (ts.isObjectLiteralExpression(opt)) {
        const om = propertyMap(opt);
        if (!hasAny(om, ["id", "optionId", "option_id"])) {
          add(findings, sf, opt, "missing_option_id", "Option object has no stable ID.");
        }
      }
    }
  }

  if (map.has("correctIndex") || map.has("correctIndices")) {
    add(findings, sf, map.get("correctIndex") || map.get("correctIndices")!, "positional_answer_key", "Legacy index-based answer key must be normalized to stable option IDs.");
  }
  if (!hasAny(map, ["correctAnswer", "correct_answer", "correctAnswerIds", "correct_answer_ids", "correctIndex", "correctIndices"])) {
    add(findings, sf, node, "missing_answer_key", "Question-like object has no answer contract.");
  }

  const requiredFamilies: Array<[string, string[]]> = [
    ["missing_rationale", ["rationale", "rationaleCorrect", "rationale_correct"]],
    ["missing_distractor_rationales", ["distractorRationales", "distractor_rationales", "incorrectAnswerRationale", "incorrect_answer_rationale"]],
    ["missing_correct_answer_explanation", ["correctAnswerExplanation", "correct_answer_explanation", "learningObjective"]],
    ["missing_hint", ["hint", "examStrategy", "exam_strategy"]],
    ["missing_why_this_matters", ["whyThisMatters", "why_this_matters", "keyTakeaway", "key_takeaway"]],
    ["missing_pearl", ["clinicalPearl", "clinical_pearl", "examPearl", "exam_pearl"]],
    ["missing_country_scope", ["countryCode", "country_code", "country", "regionScope", "region_scope"]],
    ["missing_language_scope", ["languageCode", "language_code", "locale"]],
  ];
  for (const [code, aliases] of requiredFamilies) {
    if (!hasAny(map, aliases)) add(findings, sf, node, code, `Question-like object is missing ${aliases[0]} (or an accepted legacy alias).`);
  }

  const stemProp = valueNode(map.get("stem") || map.get("question") || map.get("questionText"));
  const optionText = options?.getText(sf) || "";
  const stemText = stemProp?.getText(sf) || "";
  const convertible = /(?:mg\\\/dL|mmol\\\/L|mEq\\\/L|mmHg|°F|°C|\\blb\\b|\\bkg\\b|\\bcm\\b|inches?)/i.test(`${stemText} ${optionText}`);
  if (convertible && !hasAny(map, ["unitVariants", "unit_variants", "unitSystemSupport", "unit_system_support", "labUnitVariant", "lab_unit_variant"])) {
    add(findings, sf, node, "missing_unit_contract", "Measurement-bearing question lacks explicit SI/CONV rendering metadata.");
  }
}

const files = ROOTS.flatMap(filesUnder);
const findings: Finding[] = [];
let questionObjects = 0;

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const visit = (node: ts.Node) => {
    if (ts.isObjectLiteralExpression(node) && looksLikeQuestion(node)) {
      questionObjects++;
      inspectQuestion(findings, sf, node);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

const byCode: Record<string, number> = {};
const byFile: Record<string, number> = {};
for (const finding of findings) {
  byCode[finding.code] = (byCode[finding.code] || 0) + 1;
  byFile[finding.file] = (byFile[finding.file] || 0) + 1;
}

console.log(JSON.stringify({ filesScanned: files.length, questionObjects, findings: findings.length, byCode, worstFiles: Object.entries(byFile).sort((a,b) => b[1]-a[1]).slice(0, 50), sample: findings.slice(0, 250) }, null, 2));

const strict = process.argv.includes("--strict");
if (strict && findings.length > 0) process.exitCode = 1;
