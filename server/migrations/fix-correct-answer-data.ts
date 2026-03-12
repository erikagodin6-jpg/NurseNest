import pg from "pg";

const letterToIndex: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

export async function fixCorrectAnswerData(pool: pg.Pool): Promise<{ stringFixed: number; numberFixed: number }> {
  const stringResult = await pool.query(`
    UPDATE exam_questions
    SET correct_answer = CASE
      WHEN correct_answer::text = '"A"' THEN '[0]'::jsonb
      WHEN correct_answer::text = '"B"' THEN '[1]'::jsonb
      WHEN correct_answer::text = '"C"' THEN '[2]'::jsonb
      WHEN correct_answer::text = '"D"' THEN '[3]'::jsonb
    END
    WHERE jsonb_typeof(correct_answer) = 'string'
      AND correct_answer::text IN ('"A"', '"B"', '"C"', '"D"')
  `);

  const numberResult = await pool.query(`
    UPDATE exam_questions
    SET correct_answer = jsonb_build_array(correct_answer)
    WHERE jsonb_typeof(correct_answer) = 'number'
  `);

  return {
    stringFixed: stringResult.rowCount ?? 0,
    numberFixed: numberResult.rowCount ?? 0,
  };
}

export async function verifyCorrectAnswerData(pool: pg.Pool): Promise<{ valid: boolean; counts: Record<string, number> }> {
  const result = await pool.query(`
    SELECT jsonb_typeof(correct_answer) as type, COUNT(*)::int as cnt
    FROM exam_questions
    GROUP BY jsonb_typeof(correct_answer)
  `);

  const counts: Record<string, number> = {};
  for (const row of result.rows) {
    counts[row.type] = row.cnt;
  }

  const valid = !counts["string"] && !counts["number"];
  return { valid, counts };
}
