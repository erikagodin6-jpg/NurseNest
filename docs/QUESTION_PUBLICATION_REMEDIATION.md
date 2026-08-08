# Question Publication Remediation

This runbook is the canonical workflow for finding and repairing question records that cannot safely be published because required fields are missing or structurally incomplete, especially per-option distractor rationales.

## Contract

A question is not publication-ready merely because `distractor_rationales` is non-null or non-empty. For ordinary option-based questions, every incorrect option must resolve to its own substantive rationale. The audit must also verify the stem, options, answer contract, overall rationale, correct-answer explanation, tier, exam, question type, body system, topic, tags, and difficulty.

Do not weaken publication guards to increase published counts. Repair deficient content first. Preserve the keyed answer, stable option IDs, exam scope, country scope, tier, and current publication status during rationale repair.

## 1. Discover every question store

Run:

```bash
npx tsx script/audit-all-question-stores.ts
```

This introspects the production schema rather than assuming all questions live in `exam_questions`. Review every discovered table. A table is itself structurally deficient if it stores option-based questions but has no field capable of storing the required overall rationale, distractor rationales, or correct-answer explanation.

Do not proceed as though the estate is complete until every served question store is accounted for.

## 2. Audit core publication readiness

Run:

```bash
npx tsx script/audit-question-publication-readiness.ts > question-publication-audit.before.json
```

Capture at minimum:

- total questions
- publication-ready questions
- blocked questions
- published-but-invalid questions
- questions blocked by distractor rationale coverage
- blocker counts by field
- blocker counts by tier and status

The pre-repair report is evidence. Keep it.

## 3. Audit authored source files

Run:

```bash
npx tsx script/audit-authored-question-rationales.ts > authored-question-rationale-audit.json
```

This detects source question objects that can reintroduce missing rationale fields on a later seed/import. Fix source defects as well as database defects. Database remediation alone is not durable.

## 4. Repair rationale fields in bounded batches

Run a small batch first:

```bash
npx tsx script/audit-fix-question-publication-rationales.ts --apply --limit=25
```

Then re-audit. If the post-repair contract holds, continue in bounded batches:

```bash
npx tsx script/audit-fix-question-publication-rationales.ts --apply --limit=100
```

Repeat audit -> repair -> audit until there are no remaining rationale-contract candidates that can be safely auto-repaired.

The repair must:

- preserve the question stem
- preserve answer options
- preserve the keyed answer
- preserve stable option IDs
- preserve tier, exam, country/region scope, and difficulty
- preserve strong existing rationale text
- generate only missing/weak rationale fields
- require a substantive rationale for every incorrect option
- validate the repaired record before counting it as repaired
- refuse records whose answer/option contract cannot be resolved safely
- never auto-publish a repaired draft

## 5. Use the authenticated admin repair route after deployment

The deployed server exposes:

```text
POST /api/admin/content-audit/repair-publication-rationales
```

Body example:

```json
{ "batchSize": 25 }
```

The route is admin-only, respects the AI kill switch, operates in bounded batches, preserves question status, and post-validates the rationale contract before updating a record.

Use:

```text
GET /api/admin/content-quality-audit
```

between batches. Its deploy gate must remain failed while any published core question violates the strict publication contract.

## 6. Quarantine/draft unsafe published records

If a published record still has a blocking defect that cannot be repaired safely, it should not remain public. The existing admin endpoint:

```text
POST /api/admin/content-audit/fix-quality
```

moves strict publication-contract failures back to draft. This is a containment step, not a substitute for repair.

## 7. Re-audit every store

After repairs, rerun both:

```bash
npx tsx script/audit-question-publication-readiness.ts > question-publication-audit.after.json
npx tsx script/audit-all-question-stores.ts > all-question-stores-audit.after.json
```

Completion requires:

- zero published questions with blocking publication-contract defects
- zero ordinary option-based questions missing a substantive rationale for any incorrect option
- zero unresolved correct-answer contracts among published questions
- no served question table omitted from the audit
- source-level authored question audit clean for newly changed question packages

Do not report remediation complete from code inspection alone. Production database counts from the post-repair audits are required.
