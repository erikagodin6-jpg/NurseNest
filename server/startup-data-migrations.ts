import pg from "pg";
import { fixCorrectAnswerData, verifyCorrectAnswerData } from "./migrations/fix-correct-answer-data";
import { seedEchoQuestionBank } from "./seed-echo-question-bank";
import { readFileSync } from "fs";
import { join } from "path";

export let lastStartupMigrationTimestamp: string | null = null;

function loadSeedData<T>(filename: string): T {
  const filePath = join(__dirname, "data", "seed", filename);
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkMemoryPressure(): boolean {
  const mem = process.memoryUsage();
  const rssMB = mem.rss / (1024 * 1024);
  return rssMB > (parseFloat(process.env.MEMORY_LIMIT_MB || "167") * 0.8);
}

export async function runStartupDataMigrations() {
  const { getDevPool } = await import("./db");
  const pool = getDevPool();

  try {
    const client = await pool.connect();
    try {
      const { rows: [{ count: needsReviewCount }] } = await client.query(
        "SELECT count(*) as count FROM exam_questions WHERE status = 'needs_review'"
      );
      const nrCount = parseInt(needsReviewCount);
      if (nrCount > 0) {
        const result = await client.query(
          "UPDATE exam_questions SET status = 'published' WHERE status = 'needs_review'"
        );
        console.log(`[Startup Migration] Published ${result.rowCount} exam questions (were needs_review)`);
      }

      const { rows: [{ count: draftCount }] } = await client.query(
        "SELECT count(*) as count FROM exam_questions WHERE status = 'draft'"
      );
      const dCount = parseInt(draftCount);
      if (dCount > 0) {
        const result = await client.query(
          "UPDATE exam_questions SET status = 'published' WHERE status = 'draft'"
        );
        console.log(`[Startup Migration] Published ${result.rowCount} draft exam questions`);
      }

      const { rows: [{ count: publishedCount }] } = await client.query(
        "SELECT count(*) as count FROM exam_questions WHERE status = 'published'"
      );
      console.log(`[Startup Migration] Total published exam questions: ${publishedCount}`);

      if (checkMemoryPressure()) {
        console.warn("[Startup Migration] High memory pressure detected, deferring non-critical seeds");
        lastStartupMigrationTimestamp = new Date().toISOString();
        return;
      }

      const { rows: [{ count: imgCount }] } = await client.query(
        "SELECT count(*) as count FROM imaging_questions WHERE status = 'published'"
      );
      if (parseInt(imgCount) < 20) {
        const IMAGING_QUESTIONS = loadSeedData<any[]>("imaging-questions.json");
        let created = 0;
        for (const q of IMAGING_QUESTIONS) {
          const existing = await client.query(
            "SELECT id FROM imaging_questions WHERE question=$1 AND country=$2 LIMIT 1",
            [q.question, q.country]
          );
          if (existing.rows.length > 0) continue;
          await client.query(
            `INSERT INTO imaging_questions (question, option_a, option_b, option_c, option_d, correct_answer, rationale, category, topic, difficulty, country, body_part, exam, status)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'published')`,
            [q.question, q.optionA, q.optionB, q.optionC, q.optionD, q.correctAnswer, q.rationale, q.category, q.topic, q.difficulty, q.country, q.bodyPart || null, q.exam || null]
          );
          created++;
        }
        console.log(`[Startup Migration] Seeded ${created} imaging questions`);
      } else {
        console.log(`[Startup Migration] Imaging questions already seeded (${imgCount})`);
      }

      await delay(100);

      try {
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS slug text NOT NULL DEFAULT ''`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS body_region text DEFAULT ''`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS country text DEFAULT 'canada'`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS exam_relevance text DEFAULT 'medium'`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS body_part_position text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS central_ray_direction text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS detector_placement text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS collimation_guidance text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS breathing_instructions text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS common_errors jsonb DEFAULT '[]'::jsonb`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS evaluation_criteria text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS clinical_notes text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS exam_tips text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS teaching_image_url text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS exam_image_url text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS positioning_diagram_url text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS incorrect_image_url text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS positioning_errors jsonb DEFAULT '[]'::jsonb`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS quiz_questions jsonb DEFAULT '[]'::jsonb`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS label_overlays jsonb DEFAULT '[]'::jsonb`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS learning_steps jsonb DEFAULT '[]'::jsonb`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS seo_title text`);
        await client.query(`ALTER TABLE imaging_positioning_entries ADD COLUMN IF NOT EXISTS seo_description text`);
        console.log(`[Startup Migration] Ensured positioning entry columns exist`);
      } catch (colErr: any) {
        console.log(`[Startup Migration] Positioning column migration: ${colErr.message}`);
      }

      await client.query(`UPDATE imaging_positioning_entries SET slug = lower(replace(replace(projection_name, ' ', '-'), '(', '')) WHERE slug = '' OR slug IS NULL`);
      await client.query(`UPDATE imaging_positioning_entries SET body_region = body_part WHERE (body_region = '' OR body_region IS NULL) AND body_part IS NOT NULL`);

      const { rows: [{ count: posCount }] } = await client.query(
        "SELECT count(*) as count FROM imaging_positioning_entries WHERE status = 'published'"
      );
      if (parseInt(posCount) < 10) {
        const POSITIONING_ENTRIES = loadSeedData<any[]>("positioning-entries.json");
        let posCreated = 0;
        for (const e of POSITIONING_ENTRIES) {
          const ex = await client.query("SELECT id FROM imaging_positioning_entries WHERE body_part=$1 AND projection_name=$2 LIMIT 1", [e.bodyPart, e.projectionName]);
          if (ex.rows.length > 0) continue;
          const slug = e.projectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          await client.query(
            `INSERT INTO imaging_positioning_entries (slug, projection_name, body_part, body_region, country, patient_position, central_ray, sid, film_size, anatomy_demonstrated, tips, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'published')`,
            [slug, e.projectionName, e.bodyPart, e.bodyPart, 'canada', e.patientPosition, e.centralRay, e.sid || null, e.filmSize || null, e.anatomyDemonstrated || null, e.tips || null]
          );
          posCreated++;
        }
        console.log(`[Startup Migration] Seeded ${posCreated} positioning entries`);
      } else {
        console.log(`[Startup Migration] Positioning entries already seeded (${posCount})`);
      }

      await delay(100);

      const { rows: [{ count: physCount }] } = await client.query(
        "SELECT count(*) as count FROM imaging_physics_topics WHERE status = 'published'"
      );
      if (parseInt(physCount) < 5) {
        const PHYSICS_TOPICS = loadSeedData<any[]>("physics-topics.json");
        let physCreated = 0;
        for (const t of PHYSICS_TOPICS) {
          const ex = await client.query("SELECT id FROM imaging_physics_topics WHERE title=$1 LIMIT 1", [t.title]);
          if (ex.rows.length > 0) continue;
          await client.query(
            `INSERT INTO imaging_physics_topics (title, content, category, key_concepts, formulas, difficulty, status) VALUES ($1,$2,$3,$4,$5,$6,'published')`,
            [t.title, t.content, t.category, t.keyConcepts, JSON.stringify(t.formulas), t.difficulty]
          );
          physCreated++;
        }
        console.log(`[Startup Migration] Seeded ${physCreated} physics topics`);
      } else {
        console.log(`[Startup Migration] Physics topics already seeded (${physCount})`);
      }

      await delay(100);

      const { rows: [{ count: fcCount }] } = await client.query(
        "SELECT count(*) as count FROM imaging_flashcards WHERE status = 'published'"
      );
      if (parseInt(fcCount) < 20) {
        const FLASHCARDS = loadSeedData<any[]>("flashcards.json");
        let fcCreated = 0;
        for (const fc of FLASHCARDS) {
          const ex = await client.query("SELECT id FROM imaging_flashcards WHERE front=$1 LIMIT 1", [fc.front]);
          if (ex.rows.length > 0) continue;
          await client.query(
            `INSERT INTO imaging_flashcards (front, back, category, body_part, difficulty, status) VALUES ($1,$2,$3,$4,$5,'published')`,
            [fc.front, fc.back, fc.category, fc.bodyPart || null, fc.difficulty]
          );
          fcCreated++;
        }
        console.log(`[Startup Migration] Seeded ${fcCreated} flashcards`);
      } else {
        console.log(`[Startup Migration] Flashcards already seeded (${fcCount})`);
      }

      await delay(200);

      try {
        const { seedWaveformData } = await import("./paramedic-waveform-routes");
        const wfCount = await seedWaveformData();
        if (wfCount > 0) {
          console.log(`[Startup Migration] Seeded ${wfCount} paramedic waveforms`);
        } else {
          console.log(`[Startup Migration] Paramedic waveforms already seeded`);
        }
      } catch (wfErr: any) {
        console.log(`[Startup Migration] Waveform seed skipped: ${wfErr.message}`);
      }

      await delay(200);

      try {
        const fixResult = await fixCorrectAnswerData(pool);
        if (fixResult.stringFixed > 0 || fixResult.numberFixed > 0 || fixResult.optionsFixed > 0) {
          console.log(`[Startup Migration] Fixed exam data: ${fixResult.stringFixed} correct_answer strings, ${fixResult.numberFixed} correct_answer numbers, ${fixResult.optionsFixed} options strings converted`);
        }
        const verify = await verifyCorrectAnswerData(pool);
        if (!verify.valid) {
          console.warn(`[Startup Migration] correct_answer types still non-array:`, verify.counts);
        }
      } catch (caErr: any) {
        console.error(`[Startup Migration] correct_answer fix error: ${caErr.message}`);
      }

      await delay(200);

      try {
        await client.query(`CREATE TABLE IF NOT EXISTS imaging_products (
          id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
          title text NOT NULL,
          slug text NOT NULL UNIQUE,
          product_type text NOT NULL,
          description text,
          features text[] DEFAULT '{}'::text[],
          price_cad integer NOT NULL,
          price_usd integer NOT NULL,
          compare_at_price_cad integer,
          compare_at_price_usd integer,
          stripe_price_id_cad text,
          stripe_price_id_usd text,
          stripe_product_id text,
          billing_interval text,
          content_scope jsonb DEFAULT '{}'::jsonb,
          question_count integer DEFAULT 0,
          flashcard_count integer DEFAULT 0,
          exam_count integer DEFAULT 0,
          country text,
          popular boolean DEFAULT false,
          sort_order integer DEFAULT 0,
          is_active boolean DEFAULT true,
          created_at timestamp DEFAULT NOW() NOT NULL,
          updated_at timestamp DEFAULT NOW() NOT NULL
        )`);
        await client.query(`CREATE TABLE IF NOT EXISTS imaging_entitlements (
          id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id varchar NOT NULL,
          product_id varchar,
          entitlement_type text NOT NULL,
          scope jsonb DEFAULT '{}'::jsonb,
          status text DEFAULT 'active',
          expires_at timestamp,
          created_at timestamp DEFAULT NOW() NOT NULL
        )`);
        await client.query(`CREATE TABLE IF NOT EXISTS imaging_purchases (
          id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id varchar NOT NULL,
          product_id varchar NOT NULL,
          stripe_session_id text,
          stripe_payment_intent_id text,
          amount integer NOT NULL,
          currency text DEFAULT 'USD',
          status text DEFAULT 'completed',
          purchased_at timestamp DEFAULT NOW() NOT NULL
        )`);
        await client.query(`CREATE TABLE IF NOT EXISTS imaging_preview_config (
          id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
          content_type text NOT NULL UNIQUE,
          free_limit integer NOT NULL DEFAULT 5,
          preview_message text,
          updated_at timestamp DEFAULT NOW() NOT NULL
        )`);
        console.log(`[Startup Migration] Imaging monetization tables ensured`);
      } catch (monErr: any) {
        console.log(`[Startup Migration] Imaging monetization tables: ${monErr.message}`);
      }

      if (checkMemoryPressure()) {
        console.warn("[Startup Migration] High memory pressure detected, deferring echo seed and auth migration");
        lastStartupMigrationTimestamp = new Date().toISOString();
        return;
      }

      await delay(500);

      try {
        const echoCheck = await pool.query(
          `SELECT COUNT(*)::int AS cnt FROM exam_questions WHERE tier = 'imaging' AND (exam LIKE '%RDCS%' OR exam LIKE '%CSCT%')`
        );
        if (echoCheck.rows[0].cnt < 1500) {
          const { seedEchoQuestionBank } = await import("./seed-echo-question-bank");
          await seedEchoQuestionBank();
        } else {
          console.log(`[Echo QBank] Fast-path: ${echoCheck.rows[0].cnt} echo questions in DB (>= 1500), skipping import`);
        }
      } catch (echoErr: any) {
        console.error(`[Echo QBank] Seed error: ${echoErr.message}`);
      }

      await delay(500);

      const { runCrossPlatformAuthMigration } = await import("./migrations/cross-platform-auth-unification");
      await runCrossPlatformAuthMigration(pool);

      await delay(300);

      const { runAnalyticsEventsMigration } = await import("./migrations/analytics-events");
      await runAnalyticsEventsMigration(pool);

      lastStartupMigrationTimestamp = new Date().toISOString();
      console.log(`[Startup Migration] Completed at ${lastStartupMigrationTimestamp}`);
      const dbHost = (process.env.DATABASE_URL || "").replace(/\/\/.*@/, "//***@").split("/")[2] || "unknown";
      console.log(`[Startup Migration] Target database: ${dbHost}`);

    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("[Startup Migration] Error:", err.message);
  }
}
