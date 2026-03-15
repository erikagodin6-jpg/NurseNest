import { getDevPool } from "./db";

const TIER_PATTERNS = [
  /\s+Rpn$/i,
  /\s+Rn$/i,
  /\s+Np$/i,
  /\s*\(RPN\/LVN\)/i,
  /\s+for Practical Nurses?$/i,
  /\s+for RPN$/i,
  /\s*\(RPN\)$/i,
  /\s*\(RN\)$/i,
  /\s*\(NP\)$/i,
];

const CATEGORY_CORRECTIONS: Record<string, { bodySystem: string; category: string }> = {
  "wound-irrigation-rpn": { bodySystem: "wound-care", category: "Wound Care" },
  "wound-irrigation-rn": { bodySystem: "dermatology", category: "Dermatology & Wound Care" },
  "wound-irrigation-np": { bodySystem: "dermatology", category: "Dermatology" },
  "malignant-hyperthermia-rpn": { bodySystem: "critical-care", category: "Critical Care" },
  "malignant-hyperthermia-rn": { bodySystem: "shock-emergency", category: "Shock & Emergency" },
  "malignant-hyperthermia-np": { bodySystem: "critical-care-advanced", category: "Critical Care Advanced" },
  "fetal-oxygenation-during-second-stage-pushing-rpn": { bodySystem: "maternity", category: "Maternity" },
  "population-screening-programs-for-practical-nurses-rpn": { bodySystem: "community-health", category: "Community Health" },
  "wilms-tumor-nephroblastoma-for-practical-nurses-rpn": { bodySystem: "pediatrics", category: "Pediatrics" },
  "siadh-syndrome-of-inappropriate-adh-rpn": { bodySystem: "endocrine", category: "Endocrine & Fluids" },
  "addison-disease-primary-adrenal-insufficiency-rpn": { bodySystem: "endocrine", category: "Endocrine & Fluids" },
  "amniotic-fluid-imbalances-for-practical-nurses-rpn": { bodySystem: "maternity", category: "Maternity" },
  "amniotic-fluid-embolism-dic-pathway-np": { bodySystem: "maternity", category: "Maternity & Obstetrics" },
  "tardive-dyskinesia-2-rpn": { bodySystem: "neurological", category: "Neurological" },
};

function cleanTitle(title: string): string {
  let cleaned = title;
  for (const pattern of TIER_PATTERNS) {
    cleaned = cleaned.replace(pattern, "");
  }
  return cleaned.trim();
}

export async function runLessonCleanup() {
  const pool = getDevPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows: allLessons } = await client.query(
      `SELECT id, title, slug, body_system, category, status, content FROM content_items WHERE type = 'lesson'`
    );

    let titlesCleaned = 0;
    let categoriesCorrected = 0;
    let draftsSet = 0;

    for (const lesson of allLessons) {
      const updates: string[] = [];
      const values: any[] = [];
      let paramIdx = 1;

      const cleaned = cleanTitle(lesson.title);
      if (cleaned !== lesson.title) {
        updates.push(`title = $${paramIdx++}`);
        values.push(cleaned);
        titlesCleaned++;
      }

      const correction = CATEGORY_CORRECTIONS[lesson.slug];
      if (correction) {
        if (lesson.body_system !== correction.bodySystem) {
          updates.push(`body_system = $${paramIdx++}`);
          values.push(correction.bodySystem);
        }
        if (lesson.category !== correction.category) {
          updates.push(`category = $${paramIdx++}`);
          values.push(correction.category);
          categoriesCorrected++;
        }
      }

      const contentArr = lesson.content;
      const contentStr = typeof contentArr === "string" ? contentArr : JSON.stringify(contentArr);
      const isEmpty = !contentArr
        || contentStr === "[]"
        || contentStr === "{}"
        || contentStr === '""'
        || contentStr === "null"
        || contentStr === ""
        || (Array.isArray(contentArr) && contentArr.length === 0)
        || (typeof contentArr === "object" && !Array.isArray(contentArr) && Object.keys(contentArr).length === 0);
      if (isEmpty && lesson.status === "published") {
        updates.push(`status = $${paramIdx++}`);
        values.push("draft");
        draftsSet++;
      }

      if (updates.length > 0) {
        updates.push(`updated_at = NOW()`);
        values.push(lesson.id);
        await client.query(
          `UPDATE content_items SET ${updates.join(", ")} WHERE id = $${paramIdx}`,
          values
        );
      }
    }

    await client.query("COMMIT");
    console.log(`[lesson-cleanup] Titles cleaned: ${titlesCleaned}`);
    console.log(`[lesson-cleanup] Categories corrected: ${categoriesCorrected}`);
    console.log(`[lesson-cleanup] Empty content set to draft: ${draftsSet}`);
    console.log(`[lesson-cleanup] Total lessons processed: ${allLessons.length}`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[lesson-cleanup] Error:", err);
    throw err;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  runLessonCleanup()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
