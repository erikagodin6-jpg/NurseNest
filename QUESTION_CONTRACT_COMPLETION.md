# NurseNest Question Publication Contract — 100% Completion Criteria

A question estate is **not complete** because a repair script exists or because a runtime fallback can synthesize missing text. Completion requires every production question-definition row and every active learner-facing authoring/import path to satisfy the same canonical contract with editorially authored metadata.

## Required on every publishable question

- persistent stable question ID
- stable ID on every answer option / selectable interaction choice
- correct answer stored/resolved by stable ID(s), never dependent on array position
- for ordinary single-answer MCQs: at least four distinct options and exactly one keyed answer
- distractor rationale for every incorrect flat option, keyed by stable option ID
- type-specific stable interaction payload for Bow-Tie, Matrix, Cloze, Trend, NGN Case, Chart Review, Order Review, and other certified structured types
- substantive overall rationale
- substantive correct-answer explanation
- hint/exam strategy for tutor mode
- Why This Matters / key clinical significance
- clinical/exam pearl
- mnemonic or memory hook only when one genuinely exists or adds learning value
- explicit serving tier / role
- explicit country scope; `BOTH` must include named country labels rather than an ambiguous flag
- exam/pathway label
- licensing/certification body when applicable
- language/locale metadata
- body system/category
- topic/subtopic
- tags
- difficulty 1–4
- certified/renderable question type
- SI and CONV representations for every **actually convertible** measurement, bound to one semantic unit token so changing display units cannot change grading
- deterministic conversion validation for supported lab/measurement pairs; unsupported pairs require editorial verification rather than an automatic pass

## Required behavior

1. Option or interaction-choice shuffling must preserve stable IDs, correct-answer IDs, and rationale association.
2. SI/CONV switching may change display text only; question ID, option/choice IDs, answer IDs, and clinical meaning must remain unchanged.
3. Learner/exam payloads must not expose answer keys or rationales before review is unlocked.
4. Tutor/review payloads must return rationale, correct-answer explanation, selected distractor explanation, hint, Why This Matters, pearl, and mnemonic when present.
5. Legacy numeric/letter submissions may be accepted temporarily for migration compatibility, but canonical stored answer state must be stable-ID based.
6. No publisher, admin route, seed script, generator, translation importer, static source loader, or bulk import may bypass the contract.
7. Exact/near-identical duplicate items must not inflate learner-facing question counts; one canonical item is kept and redundant copies are retired/quarantined or deduplicated before serving.
8. Large single-answer banks must not exhibit severe answer-position bias. Stable IDs permit shuffling, but source answer distributions are still audited because extreme bias is a content-generation defect.
9. Runtime-derived fallback copy may protect learners during migration, but it does **not** qualify a question as editorially complete. Active learner content must be `authored-v2` before it counts toward 100% completion.

## Production completion gate

Run, in order:

```bash
# 1. Apply additive schema migrations first:
#    - universal all-question-store sidecars
#    - exam_questions publication gate

# 2. Backfill all question-definition stores with stable IDs and canonical sidecars.
npx tsx script/backfill-all-question-stores-contract-v3.ts --apply --ai

# 3. Resolve explicit country labels. Ambiguous BOTH scope remains blocked.
npx tsx script/backfill-question-country-labels.ts --apply

# 4. Recalculate every store against the CURRENT canonical contract.
npx tsx script/recheck-question-contract-registry.ts --apply

# 5. Detect and retire duplicate production questions.
npx tsx script/audit-retire-question-duplicates.ts --apply

# 6. Recheck after duplicate retirement.
npx tsx script/recheck-question-contract-registry.ts --apply

# 7. Audit active source-bank duplication, positional bias, and contract debt.
npx tsx script/audit-active-question-source-estate.ts

# 8. Bulk-author missing active-source educational metadata into the validated overlay.
npx tsx script/enrich-active-source-question-contract.ts --apply

# 9. Or run the database-side sequence through the orchestrator.
npx tsx script/complete-question-contract-estate.ts --apply --ai
```

Do **not** rewrite legacy positional `exam_questions.correct_answer` values to stable IDs until every current learner surface grades through the stable serving adapter. During cutover, `contract_correct_answer_ids` is the canonical source of truth and the legacy field remains compatibility-only.

Completion requires all of the following simultaneously:

- `question_contract_store_registry.blocked_rows = 0` for every discovered question-definition table
- `question_contract_store_registry.quality_only_rows = 0` for every discovered question-definition table
- `verified_rows = total_rows` for every learner-serving store
- every published `exam_questions` row passes the database publication trigger
- every learner-serving question has `publication_contract_version >= 2`
- no unresolved answer or structured-interaction contracts
- no missing per-distractor rationale contracts for flat-option items
- no missing hint / Why This Matters / pearl / tier / language scope on publishable questions
- every `BOTH` jurisdiction item has explicit supported-country labels
- no measurement-bearing question missing paired SI/CONV variants where conversion is actually required
- no known-invalid SI/CONV conversion; unknown conversion pairs remain blocked until editorially verified
- no learner-facing exact duplicate clusters after canonicalization
- no unresolved severe answer-position-bias warning in a production single-answer bank
- zero active learner questions counted as complete solely because of `legacy-derived` runtime fallback metadata
- every active learner question that contributes to published coverage is either source-authored v2 or has a validated `authored-v2` enrichment overlay entry
- generated enrichment overlay contains no `needs-review` entry that is served as publication-ready
- canonical contract tests pass
- changed-question CI guard passes
- production learner smoke tests confirm grading, shuffling, tutor review, country filtering, translation/locale rendering, and SI/CONV rendering
- learner QBank, demo exam, mock exam, CAT/adaptive, lesson quiz, case-study, and Allied/specialty surfaces all consume stable IDs or an explicitly temporary compatibility adapter whose canonical stable IDs are preserved end-to-end

Historical source debt may be remediated incrementally only while it is not serving learners. Any content moved to `published` or counted toward learner coverage must pass the full runtime/database gate and the authored-v2 requirement.
