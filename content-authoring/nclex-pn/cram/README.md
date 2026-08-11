# U.S. PN / NCLEX-PN Cram Library

Status: ACTIVE AUTHORING
Locale: United States
Exam: NCLEX-PN
Level: Entry-level practical/vocational nursing (LPN/LVN)
Authored checkpoint: 924 Cram lessons
Latest QA addendum: `AUTHORING_QA_ADDENDUM_924.md`

## Purpose

These are rapid nursing-decision pathways for NCLEX-PN clinical judgment, prioritization, safety, delegation/assignment awareness, medication safety, focused monitoring, and recognition of changes requiring escalation.

The library is authored against the 2026 NCLEX-PN test plan and U.S. entry-level LPN/LVN scope. It must not assume RN assessment authority, independent medical diagnosis, independent prescribing, or jurisdiction-specific tasks that may exceed practical/vocational nursing scope.

The numeric authoring checkpoint is not a production-completion claim. Production completion requires stable reconciliation against the learner-reachable `us-lpn-nclex-pn` full-lesson estate and zero unexplained `MISSING_CRAM` rows.

The 504 checkpoint added an exact-audit-source authoring layer. The 924 checkpoint now includes 420 source-family lessons beyond that exact-source layer. Newest depth adds acute skin/soft-tissue infection safety and orthopedic trauma safety after pediatric emergency/toxicology, geriatric acute-change/polypharmacy, arterial/hemodynamic monitoring, NIV/high-flow support, renal/urologic and GI/endoscopy procedures, antenatal and intrapartum emergencies, vascular/perfusion safety, and gynecologic acute care.

## Cram lesson contract

Every lesson must contain the governed clinical fields defined in `AUTHORING_QA.md`, including stable ID, title/system/Client Needs/clinical judgment, focused recognition/priorities/monitoring/interventions, medication safety, complications/red flags, teaching, delegation/scope, exam trap, source basis/date, and `statePolicyCheck`.

Optional reconciliation fields:
- `sourceLessonSlugCandidate` — exact audited source slug when available
- `lineageStatus` — provisional classification until production row verification is complete; source-family records use `SOURCE_FAMILY_AUTHORED_NOT_ROW_MAPPED`

## Authoring rules

Use the 2026 NCLEX-PN test plan, keep actions within entry-level U.S. LPN/LVN scope, tag jurisdiction-variable scope, emphasize safe implementation/monitoring/escalation, and never decrement PN-013/PN-015 production counts from authored-topic similarity alone.

## Publication rule

Clinical authoring remains separate from serving integration. Publication completion requires current row-level U.S. pathway reconciliation, schema validation, renderer mapping, production merge/deploy, and zero unexplained `MISSING_CRAM` rows.
