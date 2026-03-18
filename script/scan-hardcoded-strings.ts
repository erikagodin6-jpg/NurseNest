import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";

interface Violation {
  file: string;
  line: number;
  text: string;
  context: string;
}

const IGNORE_PATTERNS = [
  /className/,
  /data-testid/,
  /import\s/,
  /from\s+['"]/,
  /require\s*\(/,
  /console\.(log|warn|error|info|debug)/,
  /^\s*\/\//,
  /^\s*\*/,
  /^\s*\/\*/,
  /type\s+\w+/,
  /interface\s+\w+/,
  /\.test\.(ts|tsx)$/,
  /\.spec\.(ts|tsx)$/,
];

const IGNORED_DIRECTORIES = [
  "node_modules",
  "__tests__",
  "__mocks__",
  "test",
  "tests",
];

const SAFE_JSX_ATTRIBUTES = new Set([
  "className",
  "id",
  "data-testid",
  "htmlFor",
  "type",
  "name",
  "role",
  "aria-label",
  "aria-describedby",
  "aria-labelledby",
  "href",
  "src",
  "alt",
  "placeholder",
  "method",
  "action",
  "target",
  "rel",
  "key",
  "style",
  "ref",
  "tabIndex",
  "autoComplete",
  "inputMode",
  "pattern",
  "accept",
  "encType",
  "xmlns",
  "viewBox",
  "fill",
  "stroke",
  "d",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "x1",
  "x2",
  "y1",
  "y2",
  "width",
  "height",
  "transform",
  "strokeWidth",
  "strokeLinecap",
  "strokeLinejoin",
  "fillRule",
  "clipRule",
  "points",
  "gradientUnits",
  "offset",
  "stopColor",
  "stopOpacity",
]);

const NON_USER_FACING_REGEX = [
  /^[a-z]+([A-Z][a-z]+)+$/,
  /^[a-z]+(-[a-z]+)+$/,
  /^[a-z]+\.[a-z]/,
  /^(https?:\/\/|\/[a-z])/i,
  /^\d+(\.\d+)?(%|px|em|rem|vh|vw|s|ms)?$/,
  /^#[0-9a-fA-F]{3,8}$/,
  /^rgb/,
  /^(GET|POST|PUT|DELETE|PATCH)$/,
  /^(string|number|boolean|object|undefined|null)$/,
  /^(div|span|p|h[1-6]|a|button|input|form|img|svg|path|circle|rect|line|text|g)$/,
  /^(true|false)$/,
  /^\s*$/,
  /^[&|<>=!+\-*/%]+$/,
  /^[\w.-]+@[\w.-]+$/,
  /^\w+:\/\//,
];

function isNonUserFacing(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length <= 1) return true;
  if (trimmed.length > 200) return true;
  for (const regex of NON_USER_FACING_REGEX) {
    if (regex.test(trimmed)) return true;
  }
  return false;
}

function isInIgnoredContext(line: string): boolean {
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.test(line)) return true;
  }
  return false;
}

function isInSafeAttribute(line: string, matchIndex: number): boolean {
  const before = line.substring(0, matchIndex);
  const attrMatch = before.match(/(\w+)\s*=\s*["'{]?\s*$/);
  if (attrMatch && SAFE_JSX_ATTRIBUTES.has(attrMatch[1])) {
    return true;
  }
  return false;
}

function scanFile(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  let inJSXReturn = false;
  let braceDepth = 0;
  let returnBraceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/return\s*[\(\{<]/.test(trimmed) || /=>\s*[\(\{<]/.test(trimmed)) {
      inJSXReturn = true;
      returnBraceDepth = braceDepth;
    }

    for (const ch of trimmed) {
      if (ch === "{" || ch === "(") braceDepth++;
      if (ch === "}" || ch === ")") braceDepth--;
    }

    if (inJSXReturn && braceDepth < returnBraceDepth) {
      inJSXReturn = false;
    }

    if (!inJSXReturn) continue;
    if (isInIgnoredContext(line)) continue;

    const jsxTextRegex = />\s*([A-Z][^<>{}`]*[a-z][^<>{}`]*)\s*</g;
    let match: RegExpExecArray | null;
    while ((match = jsxTextRegex.exec(line)) !== null) {
      const text = match[1].trim();
      if (text.length > 2 && !isNonUserFacing(text) && !isInSafeAttribute(line, match.index)) {
        if (!/\{.*t\(/.test(line) && !/\bt\(/.test(text)) {
          violations.push({
            file: filePath,
            line: i + 1,
            text,
            context: trimmed.substring(0, 120),
          });
        }
      }
    }

    const jsxAttrStringRegex = /(?:title|label|placeholder|alt|aria-label|description|heading|message|tooltip)\s*=\s*"([^"]+)"/g;
    while ((match = jsxAttrStringRegex.exec(line)) !== null) {
      const text = match[1].trim();
      if (text.length > 2 && !isNonUserFacing(text)) {
        if (!/\{/.test(match[0])) {
          violations.push({
            file: filePath,
            line: i + 1,
            text,
            context: trimmed.substring(0, 120),
          });
        }
      }
    }
  }

  return violations;
}

function walkDir(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    if (IGNORED_DIRECTORIES.includes(entry)) continue;
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (/\.(tsx|ts)$/.test(entry) && !/\.test\.(tsx|ts)$/.test(entry) && !/\.spec\.(tsx|ts)$/.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  const scanDir = path.resolve(process.cwd(), "client/src");
  console.log(`Scanning ${scanDir} for hardcoded strings...\n`);

  const files = walkDir(scanDir);
  console.log(`Found ${files.length} files to scan\n`);

  const allViolations: Violation[] = [];

  for (const file of files) {
    const violations = scanFile(file);
    allViolations.push(...violations);
  }

  if (allViolations.length === 0) {
    console.log("No hardcoded string violations found.");
    process.exit(0);
  }

  const byFile = new Map<string, Violation[]>();
  for (const v of allViolations) {
    const rel = path.relative(process.cwd(), v.file);
    if (!byFile.has(rel)) byFile.set(rel, []);
    byFile.get(rel)!.push(v);
  }

  console.log(`Found ${allViolations.length} potential hardcoded string violation(s) in ${byFile.size} file(s):\n`);

  for (const [file, violations] of byFile) {
    console.log(`  ${file}`);
    for (const v of violations) {
      console.log(`    Line ${v.line}: "${v.text}"`);
      console.log(`      ${v.context}`);
    }
    console.log();
  }

  console.log(`\nTotal: ${allViolations.length} violation(s)`);
  console.log("Wrap user-facing strings with t() from useI18n() hook.");
  process.exit(1);
}

main();
