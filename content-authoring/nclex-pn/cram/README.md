# U.S. PN / NCLEX-PN Cram Library

Status: ACTIVE AUTHORING
Locale: United States
Exam: NCLEX-PN
Level: Entry-level practical/vocational nursing (LPN/LVN)
Authored checkpoint: 724 Cram lessons
Latest QA addendum: `AUTHORING_QA_ADDENDUM_724.md`

## Purpose

These are rapid nursing-decision pathways for NCLEX-PN clinical judgment, prioritization, safety, delegation/assignment awareness, medication safety, focused monitoring, and recognition of changes requiring escalation.

The library is authored against the 2026 NCLEX-PN test plan and U.S. entry-level LPN/LVN scope. It must not assume RN assessment authority, independent medical diagnosis, independent prescribing, or jurisdiction-specific tasks that may exceed practical/vocational nursing scope.

The numeric authoring checkpoint is not a production-completion claim. Production completion requires stable reconciliation against the learner-reachable `us-lpn-nclex-pn` full-lesson estate and zero unexplained `MISSING_CRAM` rows.

The 504 checkpoint added an exact-audit-source authoring layer. The 724 checkpoint now includes 220 source-family lessons beyond that exact-source layer. Newest depth includes transfusion/blood-product safety and ostomy/drainage/wound-device safety, on top of dialysis, diabetes-device monitoring, diagnostics, disaster/environmental care, infection/isolation, psychosocial crisis care, nutrition support, HEENT, IV/medication calculations, burns, procedures, postpartum, pediatric, gerontology, rehabilitation, and community/home-health safety.

## Cram lesson contract

Every lesson must contain the governed clinical fields defined in `AUTHORING_QA.md`, including stable ID, title/system/Client Needs/clinical judgment, focused recognition/priorities/monitoring/interventions, medication safety, complications/red flags, teaching, delegation/scope, exam trap, source basis/date, and `statePolicyCheck`.

Optional reconciliation fields:
- `sourceLessonSlugCandidate` — exact audited source slug when available
- `lineageStatus` — provisional classification until production row verification is complete; source-family records use `SOURCE_FAMILY_AUTHORED_NOT_ROW_MAPPED`

## Authoring rules

Use the 2026 NCLEX-PN test plan, keep actions within entry-level U.S. LPN/LVN scope, tag jurisdiction-variable scope, emphasize safe implementation/monitoring/escalation, and never decrement PN-013/PN-015 production counts from authored-topic similarity alone.

## Publication rule

Clinical authoring remains separate from serving integration. Publication completion requires current row-level U.S. pathway reconciliation, schema validation, renderer mapping, production merge/deploy, and zero unexplained `MISSING_CRAM` rows.
