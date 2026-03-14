#!/bin/bash
set -e
echo "=== Starting Allied Health Expansion ==="
echo "$(date): Starting Paramedic/ACP..."
npx tsx server/run-allied-expansion.ts paramedic 2>&1 | tee -a /tmp/allied_all.log
echo "$(date): Starting RRT..."
npx tsx server/run-allied-expansion.ts rrt 2>&1 | tee -a /tmp/allied_all.log
echo "$(date): Starting MLT..."
npx tsx server/run-allied-expansion.ts mlt 2>&1 | tee -a /tmp/allied_all.log
echo "$(date): Starting RadTech..."
npx tsx server/run-allied-expansion.ts radtech 2>&1 | tee -a /tmp/allied_all.log
echo "$(date): Starting Sonography..."
npx tsx server/run-allied-expansion.ts sonography 2>&1 | tee -a /tmp/allied_all.log
echo ""
echo "=== FINAL SUMMARY REPORT ==="
npx tsx -e "
const pg = require('pg');
const pool = new pg.Pool({ connectionString: process.env.PROD_DATABASE_URL || process.env.DATABASE_URL });
async function report() {
  const q = await pool.query(\"SELECT career_type, blueprint_category, COUNT(*) as c FROM allied_questions WHERE status != 'rejected' AND career_type IN ('rrt','mlt','paramedic','imaging') GROUP BY career_type, blueprint_category ORDER BY career_type, c DESC\");
  const fc = await pool.query(\"SELECT career_type, COUNT(*) as c FROM flashcard_bank WHERE career_type IN ('rrt','mlt','paramedic','imaging') GROUP BY career_type\");
  const totals = {};
  for (const r of q.rows) { totals[r.career_type] = (totals[r.career_type] || 0) + parseInt(r.c); }
  const fcTotals = {};
  for (const r of fc.rows) { fcTotals[r.career_type] = parseInt(r.c); }
  console.log('Career Type       | Questions | Flashcards | Target | Status');
  console.log('------------------|-----------|------------|--------|-------');
  for (const ct of ['paramedic','rrt','mlt','imaging']) {
    const qc = totals[ct] || 0;
    const fcc = fcTotals[ct] || 0;
    const target = ct === 'imaging' ? 1000 : 500;
    const status = qc >= target ? 'COMPLETE' : 'PARTIAL';
    console.log(ct.padEnd(18) + '| ' + String(qc).padEnd(10) + '| ' + String(fcc).padEnd(11) + '| ' + String(target).padEnd(7) + '| ' + status);
  }
  const totalQ = Object.values(totals).reduce((a, b) => a + b, 0);
  const totalF = Object.values(fcTotals).reduce((a, b) => a + b, 0);
  console.log('------------------|-----------|------------|--------|-------');
  console.log('TOTAL'.padEnd(18) + '| ' + String(totalQ).padEnd(10) + '| ' + String(totalF).padEnd(11) + '| 2500   |');
  await pool.end();
}
report().catch(e => console.error(e));
" 2>/dev/null
echo "=== ALL DONE ==="
