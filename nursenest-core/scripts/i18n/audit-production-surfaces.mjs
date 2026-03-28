#!/usr/bin/env node
/**
 * Non-marketing production surfaces that are still English-only or hardcoded.
 * Writes reports/i18n-production-surface-audit.json (informational; does not fail).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreRoot = path.resolve(__dirname, "../..");
const reportDir = path.join(coreRoot, "reports");

const notes = {
  learnerShell:
    "Labels centralized in src/lib/i18n/learner-shell-copy.ts. Student /app routes are not locale-prefixed; wire to marketing or learner locale dictionaries when product supports it.",
  paywallCheckout:
    "Stripe/checkout copy lives in API and student components; not in marketing JSON. Audit separately when localizing billing.",
  metadata:
    "Per-route generateMetadata in marketing; programmatic SEO uses src/lib/seo/programmatic-metadata.ts.",
};

const learnerKeys = [
  { key: "navAriaLabel", en: "App" },
  { key: "dashboard", en: "Dashboard" },
  { key: "lessons", en: "Lessons" },
  { key: "questionBank", en: "Question Bank" },
  { key: "practiceExams", en: "Practice Exams" },
  { key: "logout", en: "Logout" },
];

if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

const out = {
  generatedAt: new Date().toISOString(),
  learnerShell: {
    module: "src/lib/i18n/learner-shell-copy.ts",
    englishOnlyStrings: learnerKeys,
  },
  notes,
};

fs.writeFileSync(path.join(reportDir, "i18n-production-surface-audit.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${path.join(reportDir, "i18n-production-surface-audit.json")}`);
