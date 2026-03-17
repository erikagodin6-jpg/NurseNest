import fs from "fs";
import path from "path";
import {
  PROJECT_ROOT,
  ensureDir,
  collectFiles,
} from "./backup-engine";

const DOMAIN_CATEGORIES: Record<string, { patterns: string[]; description: string }> = {
  "core-app": {
    patterns: ["server/index.ts", "server/routes.ts", "server/storage.ts", "server/db.ts", "client/src/App.tsx", "client/src/main.tsx", "client/index.html", "package.json", "tsconfig.json", "vite.config.ts"],
    description: "Core application files",
  },
  "auth": {
    patterns: ["server/admin-auth.ts", "server/entitlements.ts", "client/src/lib/auth.ts", "client/src/pages/login.tsx"],
    description: "Authentication and authorization",
  },
  "billing": {
    patterns: ["server/stripeClient.ts", "server/stripe-pricing.ts", "server/paypal.ts", "client/src/pages/pricing.tsx", "client/src/pages/upgrade.tsx"],
    description: "Payment and billing",
  },
  "question-bank": {
    patterns: ["server/question-bank-validation.ts", "server/nursing-questions-api.ts", "server/allied-questions-api.ts", "server/paramedic-questions-api.ts", "client/src/pages/question-bank.tsx", "client/src/pages/test-bank.tsx"],
    description: "Question bank and exam questions",
  },
  "lesson-engine": {
    patterns: ["client/src/pages/lessons.tsx", "client/src/pages/lesson-detail.tsx", "client/src/data/"],
    description: "Lesson content and delivery",
  },
  "flashcard-engine": {
    patterns: ["client/src/pages/flashcards.tsx", "client/src/pages/deck-page.tsx", "server/exam-flashcard-mapper.ts"],
    description: "Flashcard system",
  },
  "adaptive-engine": {
    patterns: ["server/adaptive-engine.ts", "server/cat-engine.ts", "client/src/pages/adaptive-study-page.tsx"],
    description: "Adaptive learning and CAT engine",
  },
  "tutor-engine": {
    patterns: ["server/clinical-vignette-generator.ts", "server/ai-provider-router.ts", "server/ai-safety.ts"],
    description: "AI tutor and content generation",
  },
  "scenario-engine": {
    patterns: ["server/allied-scenarios.ts", "client/src/pages/case-simulation.tsx", "client/src/pages/clinical-case-study.tsx"],
    description: "Clinical scenarios and OSCE simulations",
  },
  "translations": {
    patterns: ["server/translation-helpers.ts", "server/translation-audit-routes.ts", "client/src/lib/i18n.ts", "client/public/locales/"],
    description: "Internationalization and translations",
  },
  "seo": {
    patterns: ["server/programmatic-seo-engine.ts", "server/seo-progress-routes.ts", "server/imaging-seo-routes.ts", "client/src/components/seo.tsx"],
    description: "SEO configuration and engines",
  },
  "admin": {
    patterns: ["client/src/pages/admin.tsx", "client/src/pages/admin-*.tsx", "server/ai-jobs-routes.ts"],
    description: "Admin dashboard and tools",
  },
  "database": {
    patterns: ["shared/schema.ts", "drizzle.config.ts", "migrations/"],
    description: "Database schema and migrations",
  },
  "config": {
    patterns: ["postcss.config.js", ".replit", "replit.nix", ".env.example"],
    description: "Build and deployment configuration",
  },
};

function generateCriticalFileInventory() {
  const manifestDir = path.join(PROJECT_ROOT, "backups", "manifests");
  ensureDir(manifestDir);

  const inventory: any = {
    generatedAt: new Date().toISOString(),
    domains: {},
    summary: {
      totalDomains: 0,
      totalCriticalFiles: 0,
      missingFiles: [],
    },
  };

  let totalFiles = 0;

  for (const [domain, config] of Object.entries(DOMAIN_CATEGORIES)) {
    const domainFiles: any[] = [];

    for (const pattern of config.patterns) {
      const fullPath = path.join(PROJECT_ROOT, pattern);

      if (pattern.endsWith("/")) {
        if (fs.existsSync(fullPath)) {
          const files = collectFiles(fullPath, ["**/*"], ["node_modules"]);
          for (const f of files.slice(0, 50)) {
            domainFiles.push({
              path: path.join(pattern, f),
              exists: true,
              isDir: false,
            });
          }
        } else {
          domainFiles.push({ path: pattern, exists: false, isDir: true });
          inventory.summary.missingFiles.push(pattern);
        }
      } else {
        const exists = fs.existsSync(fullPath);
        domainFiles.push({ path: pattern, exists, isDir: false });
        if (!exists) inventory.summary.missingFiles.push(pattern);
      }
    }

    inventory.domains[domain] = {
      description: config.description,
      fileCount: domainFiles.filter((f) => f.exists).length,
      files: domainFiles,
    };

    totalFiles += domainFiles.filter((f) => f.exists).length;
  }

  inventory.summary.totalDomains = Object.keys(DOMAIN_CATEGORIES).length;
  inventory.summary.totalCriticalFiles = totalFiles;

  fs.writeFileSync(
    path.join(manifestDir, "critical-file-inventory.json"),
    JSON.stringify(inventory, null, 2)
  );

  console.log(`[INVENTORY] Critical file inventory generated`);
  console.log(`  Domains: ${inventory.summary.totalDomains}`);
  console.log(`  Critical files: ${inventory.summary.totalCriticalFiles}`);
  console.log(`  Missing: ${inventory.summary.missingFiles.length}`);
}

generateCriticalFileInventory().catch(e => {
  console.error(e);
  process.exit(1);
});
