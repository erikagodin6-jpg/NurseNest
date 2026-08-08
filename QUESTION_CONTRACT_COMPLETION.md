# NurseNest Question Publication Contract — 100% Completion Criteria

A question estate is **not complete** because a repair script exists. Completion requires every production question-definition row and every active authoring/import path to satisfy the same canonical contract.

## Required on every publishable question

- persistent stable question ID
- stable ID on every answer option
- correct answer stored/resolved by stable option ID(s), never dependent on array position
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
- SI and CONV representations for every convertible measurement, bound to one semantic unit token so changing display units cannot change grading

## Required behavior

1. Option shuffling must preserve option IDs, correct-answer IDs, and distractor-rationale association.
2. SI/CONV switching may change display text only; question ID, option IDs, answer IDs, and clinical meaning must remain unchanged.
3. Learner/exam payloads must not expose answer keys or rationales before review is unlocked.
4. Tutor/review payloads must return rationale, correct-answer explanation, selected distractor explanation, hint, Why This Matters, pearl, and mnemonic when present.
5. Legacy numeric/letter submissions may be accepted temporarily for migration compatibility, but canonical stored answer state must be stable-ID based.
6. No publisher, admin route, seed script, generator, translation importer, or bulk import may bypass the contract.

## Production completion gate

Run, in order:

```bash
# Apply additive schema migrations first.
# Then audit/backfill all question-definition stores.
npx tsx script/backfill-all-question-stores-contract-v2.ts --apply --ai

# Repeat until blocked=0.
npx tsx script/backfill-all-question-stores-contract-v2.ts

# Core exam_questions-specific repair remains available for deeper remediation.
npx tsx script/repair-full-question-publication-contract.ts --apply

# Report authored-source debt.
npx tsx script/audit-authored-question-contract-v2.ts
```

Completion requires:

- `question_contract_store_registry.blocked_rows = 0` for every discovered question-definition table
- every published `exam_questions` row passes the database publication trigger
- every question store has `publication_contract_version >= 2` for all rows intended to serve learners
- no unresolved answer contracts
- no missing per-distractor rationale contracts
- no measurement-bearing question missing paired SI/CONV variants
- canonical contract tests pass
- changed-question CI guard passes
- production learner smoke tests confirm grading, shuffling, tutor review, country filtering, and SI/CONV rendering

Historical source debt may be remediated incrementally only while it is not serving learners. Any content moved to `published` must pass the full runtime/database gate.
