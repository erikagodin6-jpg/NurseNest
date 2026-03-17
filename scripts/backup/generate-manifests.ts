import fs from "fs";
import path from "path";
import {
  PROJECT_ROOT,
  getTimestamp,
  ensureDir,
  collectFiles,
} from "./backup-engine";

async function generateManifests() {
  const timestamp = getTimestamp();
  const manifestDir = path.join(PROJECT_ROOT, "backups", "manifests");
  ensureDir(manifestDir);

  console.log(`[MANIFESTS] Generating structured manifests at ${timestamp}`);

  const questionBankManifest: any = {
    generatedAt: new Date().toISOString(),
    byTier: {},
    byExam: {},
    byCountry: {},
    byLanguage: {},
    totalQuestions: 0,
  };

  try {
    if (process.env.DATABASE_URL) {
      const pg = await import("pg");
      const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });

      try {
        const tierResult = await pool.query(`SELECT tier, COUNT(*) as cnt FROM exam_questions GROUP BY tier`);
        for (const row of tierResult.rows) questionBankManifest.byTier[row.tier] = parseInt(row.cnt);
      } catch {}

      try {
        const examResult = await pool.query(`SELECT exam, COUNT(*) as cnt FROM exam_questions GROUP BY exam`);
        for (const row of examResult.rows) questionBankManifest.byExam[row.exam] = parseInt(row.cnt);
      } catch {}

      try {
        const alliedResult = await pool.query(`SELECT career_type, COUNT(*) as cnt FROM allied_questions GROUP BY career_type`);
        for (const row of alliedResult.rows) {
          questionBankManifest.byTier[`allied_${row.career_type}`] = parseInt(row.cnt);
        }
      } catch {}

      try {
        const totalResult = await pool.query(`SELECT COUNT(*) as cnt FROM exam_questions`);
        questionBankManifest.totalQuestions = parseInt(totalResult.rows[0].cnt);
      } catch {}

      try {
        const alliedTotal = await pool.query(`SELECT COUNT(*) as cnt FROM allied_questions`);
        questionBankManifest.totalQuestions += parseInt(alliedTotal.rows[0].cnt);
      } catch {}

      await pool.end();
    }
  } catch {}

  fs.writeFileSync(
    path.join(manifestDir, "question-bank-manifest.json"),
    JSON.stringify(questionBankManifest, null, 2)
  );

  const lessonsManifest: any = {
    generatedAt: new Date().toISOString(),
    byTopic: {},
    totalLessons: 0,
  };

  const dataDir = path.join(PROJECT_ROOT, "client", "src", "data");
  if (fs.existsSync(dataDir)) {
    const dataFiles = collectFiles(dataDir, ["**/*"], []);
    const lessonFiles = dataFiles.filter((f) => f.includes("lesson") || f.includes("content"));
    lessonsManifest.totalLessons = lessonFiles.length;
    lessonsManifest.files = lessonFiles.slice(0, 50);
  }

  fs.writeFileSync(
    path.join(manifestDir, "lessons-manifest.json"),
    JSON.stringify(lessonsManifest, null, 2)
  );

  const flashcardManifest: any = {
    generatedAt: new Date().toISOString(),
    byDeck: {},
    totalDecks: 0,
    totalCards: 0,
  };

  try {
    if (process.env.DATABASE_URL) {
      const pg = await import("pg");
      const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });
      try {
        const deckResult = await pool.query(`SELECT id, title, card_count, tier FROM flashcard_decks LIMIT 500`);
        flashcardManifest.totalDecks = deckResult.rows.length;
        for (const row of deckResult.rows) {
          flashcardManifest.byDeck[row.id] = { title: row.title, cardCount: row.card_count || 0, tier: row.tier };
          flashcardManifest.totalCards += row.card_count || 0;
        }
      } catch {}
      await pool.end();
    }
  } catch {}

  fs.writeFileSync(
    path.join(manifestDir, "flashcard-manifest.json"),
    JSON.stringify(flashcardManifest, null, 2)
  );

  const mockExamManifest: any = {
    generatedAt: new Date().toISOString(),
    totalAttempts: 0,
  };

  try {
    if (process.env.DATABASE_URL) {
      const pg = await import("pg");
      const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });
      try {
        const result = await pool.query(`SELECT tier, COUNT(*) as cnt FROM mock_exam_attempts GROUP BY tier`);
        for (const row of result.rows) mockExamManifest[row.tier] = parseInt(row.cnt);
        const total = await pool.query(`SELECT COUNT(*) as cnt FROM mock_exam_attempts`);
        mockExamManifest.totalAttempts = parseInt(total.rows[0].cnt);
      } catch {}
      await pool.end();
    }
  } catch {}

  fs.writeFileSync(
    path.join(manifestDir, "mock-exam-manifest.json"),
    JSON.stringify(mockExamManifest, null, 2)
  );

  const routeManifest: any = {
    generatedAt: new Date().toISOString(),
    routes: [],
  };

  const appTsx = path.join(PROJECT_ROOT, "client", "src", "App.tsx");
  if (fs.existsSync(appTsx)) {
    const content = fs.readFileSync(appTsx, "utf-8");
    const routeMatches = content.matchAll(/path=["']([^"']+)["']/g);
    for (const match of routeMatches) {
      routeManifest.routes.push(match[1]);
    }
    routeManifest.totalRoutes = routeManifest.routes.length;
  }

  fs.writeFileSync(
    path.join(manifestDir, "route-registry.json"),
    JSON.stringify(routeManifest, null, 2)
  );

  const localizationManifest: any = {
    generatedAt: new Date().toISOString(),
    languages: [],
    translationFiles: [],
  };

  const localeDirs = ["client/public/locales", "shared/translations"];
  for (const dir of localeDirs) {
    const fullDir = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(fullDir)) {
      const entries = fs.readdirSync(fullDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          localizationManifest.languages.push(entry.name);
        } else if (entry.name.endsWith(".json")) {
          localizationManifest.translationFiles.push(path.join(dir, entry.name));
        }
      }
    }
  }

  fs.writeFileSync(
    path.join(manifestDir, "localization-registry.json"),
    JSON.stringify(localizationManifest, null, 2)
  );

  const blogManifest: any = {
    generatedAt: new Date().toISOString(),
    slugs: [],
  };

  try {
    if (process.env.DATABASE_URL) {
      const pg = await import("pg");
      const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });
      try {
        const result = await pool.query(`SELECT slug, title, status FROM content_items WHERE type = 'blog' OR type = 'article' LIMIT 1000`);
        blogManifest.slugs = result.rows;
        blogManifest.totalPosts = result.rows.length;
      } catch {}
      await pool.end();
    }
  } catch {}

  fs.writeFileSync(
    path.join(manifestDir, "blog-slugs-manifest.json"),
    JSON.stringify(blogManifest, null, 2)
  );

  const certManifest: any = {
    generatedAt: new Date().toISOString(),
    certifications: [],
  };

  const certDataFile = path.join(PROJECT_ROOT, "client", "src", "data", "certification-exam-data.ts");
  if (fs.existsSync(certDataFile)) {
    certManifest.hasDataFile = true;
  }

  fs.writeFileSync(
    path.join(manifestDir, "certification-manifest.json"),
    JSON.stringify(certManifest, null, 2)
  );

  console.log(`[MANIFESTS] Generated manifests in ${manifestDir}`);
  console.log("  - question-bank-manifest.json");
  console.log("  - lessons-manifest.json");
  console.log("  - flashcard-manifest.json");
  console.log("  - mock-exam-manifest.json");
  console.log("  - route-registry.json");
  console.log("  - localization-registry.json");
  console.log("  - blog-slugs-manifest.json");
  console.log("  - certification-manifest.json");
}

generateManifests().catch(e => {
  console.error(e);
  process.exit(1);
});
