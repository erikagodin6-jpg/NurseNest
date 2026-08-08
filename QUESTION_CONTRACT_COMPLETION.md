# NurseNest Question Publication Contract — 100% Completion Criteria

A question estate is **not complete** because a repair script exists. Completion requires every production question-definition row and every active authoring/import path to satisfy the same canonical contract.

## Required on every publishable question

- persistent stable question ID
- stable ID on every answer option
- correct answer stored/resolved by stable option ID(s), never dependent on array position
- for ordinary single-answer MCQs: at least four distinct options and exactly one keyed answer
- distractor rationale for every incorrect option, keyed by stable option ID
- substantive overall rationale
- substantive correct-answer explanation
- hint/exam strategy for tutor mode
- Why This Matters / key clinical significance
- clinical/exam pearl
- mnemonic or memory hook only when one genuinely exists or adds learning value
- explicit country scope (country code or explicit global scope)
- exam/pathway label
- licensing/certification body when applicable
- language/locale metadata
- body system/category
- topic/subtopic
- tags
- difficulty 1–4
- renderable question type
- SI and CONV representations for every **actually convertible** measurement, bound to one semantic unit token so changing display units cannot change grading
- deterministic conversion validation for supported lab/measurement pairs; unsupported pairs require editorial verification rather than an automatic pass

## Required behavior

1. Option shuffling must preserve option IDs, correct-answer IDs, and distractor-rationale association.
2. SI/CONV switching may change display text only; question ID, option IDs, answer IDs, and clinical meaning must remain unchanged.
3. Learner/exam payloads must not expose answer keys or rationales before review is unlocked.
4. Tutor/review payloads must return rationale, correct-answer explanation, selected distractor explanation, hint, Why This Matters, pearl, and mnemonic when present.
5. Legacy numeric/letter submissions may be accepted temporarily for migration compatibility, but canonical stored answer state must be stable-ID based.
6. No publisher, admin route, seed script, generator, translation importer, or bulk import may bypass the contract.
7. Exact/near-identical duplicate items must not inflate learner-facing question counts; one canonical item is kept and redundant copies are retired/quarantined.
8. Large single-answer banks must not exhibit severe answer-position bias. Stable IDs permit shuffling, but source answer distributions are still audited because extreme bias is a content-generation defect.

## Production completion gate

Run, in order:

```bash
# Apply additive schema migrations first, including the universal question-store sidecar.

# Backfill all question-definition stores. Legacy grading columns may remain temporarily;
# canonical answer truth is written to stable-ID sidecars.
npx tsx script/backfill-all-question-stores-contract-v2.ts --apply --ai

# Repeat until blocked=0.
npx tsx script/backfill-all-question-stores-contract-v2.ts

# Detect duplicate clusters and answer-position bias.
npx tsx script/audit-dedupe-question-estate-v2.ts

# After review, retire duplicate rows without deleting audit history.
npx tsx script/audit-dedupe-question-estate-v2.ts --apply --retire-public

# Report authored-source debt separately from production DB readiness.
npx tsx script/audit-authored-question-contract-v2.ts
```

Do **not** rewrite legacy positional `exam_questions.correct_answer` values to stable IDs until every current learner surface grades through the stable serving adapter. During cutover, `contract_correct_answer_ids` is the canonical source of truth and the legacy field remains compatibility-only.

Completion requires:

- `question_contract_store_registry.blocked_rows = 0` for every discovered question-definition table
- every published `exam_questions` row passes the database publication trigger
- every question store has `publication_contract_version >= 2` for all rows intended to serve learners
- no unresolved answer contracts
- no missing per-distractor rationale contracts
- no missing hint / Why This Matters / pearl / language scope on publishable questions
- no measurement-bearing question missing paired SI/CONV variants where conversion is actually required
- no known-invalid SI/CONV conversion; unknown conversion pairs remain blocked until editorially verified
- no learner-facing exact duplicate clusters after canonicalization
- no unresolved severe answer-position-bias warning in a production single-answer bank
- canonical contract tests pass
- changed-question CI guard passes
- production learner smoke tests confirm grading, shuffling, tutor review, country filtering, and SI/CONV rendering
- learner QBank, demo exam, mock exam, CAT/adaptive, lesson quiz, case-study, and Allied/specialty surfaces all consume stable IDs or an explicitly temporary compatibility adapter

Historical source debt may be remediated incrementally only while it is not serving learners. Any content moved to `published` must pass the full runtime/database gate.
