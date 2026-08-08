# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 284
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library now contains 284 distinct authored Cram lessons spanning every NCLEX-PN Client Needs area and major practical-nursing clinical domains. Authoring depth includes chronic and emergency cardiovascular care, respiratory deterioration and airborne TB, renal/urologic care, common GI and endocrine disorders, maternal/fetal complications, pediatric emergencies, neuromuscular respiratory-risk disorders, psychopharmacologic emergencies, hematologic clotting disorders, oncology metabolic/compressive emergencies, ophthalmic pharmacology, medication-administration safety, therapeutic communication, documentation safety, fluid-restriction teaching, inhaler/spacer technique, and increasingly granular medication-class safety.

The first 100 lessons established the production baseline. Authoring has continued beyond that count. No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator and open families

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**.

The same audit measured the U.S. practical-nurse open cohorts at:

- **139** `PN-013-pharmacology-element-gap` rows;
- **971** `PN-015-cram-safety-gap` rows;
- **796** missing Pre-Tests;
- **919** missing Post-Tests;
- **3** live-not-indexed/curation rows.

The broader two-pathway PN-family totals remain useful context (`PN-013` 320; `PN-015` 2,244), but U.S. authoring progress is now tracked against the pathway-specific numbers above rather than treating Canadian RPN and U.S. LPN/LVN as one denominator.

## Authoring direction

The medication work after the 180 checkpoint intentionally targets the highest-clinical-risk pharmacology family first. The newest batches add ophthalmic drugs, maternity drugs, and medication-administration safety topics that correspond to source families named by the audit, including the U.S. ophthalmic pharmacology shard and the medication/dosage/IV expansion catalog.

The branch now also contains `LINEAGE_CANDIDATES.json`. It records stable audit slugs such as `hypertension-teaching`, `edema-daily-weights`, `copd-home-care`, `hypokalemia-symptoms`, `insulin-administration-checks`, `oral-hypoglycemics`, `antibiotic-side-effect-reporting`, `inhaler-technique-teaching`, `i-o-fluid-restriction-teaching`, `therapeutic-communication`, and `documentation-do-nots` and proposes the authored Cram object(s) that may satisfy each one.

No lineage candidate is counted as a resolved production gap until both of these are true:

1. the source slug is verified as learner-reachable on `us-lpn-nclex-pn`; and
2. the source lesson's substantive content is compared with the candidate Cram object so clinically important material is not lost.

Four new Cram objects now carry the audited source slug directly as provisional lineage metadata: therapeutic communication, documentation safety, intake/output with fluid restriction, and inhaler/spacer technique. They remain provisional until U.S.-pathway verification is complete.

## Completion gate

The U.S. PN Cram estate is complete only when all of the following are true:

1. Every applicable full U.S. PN/LPN/LVN lesson has exactly one corresponding high-quality Cram lesson or an explicitly documented reason that no separate Cram lesson is appropriate.
2. The full-lesson-to-Cram mapping uses stable identifiers and does not depend on title similarity alone.
3. No Canadian REx-PN scope, legislation, medication availability, measurement convention, or exam assumptions are silently reused for the U.S. pathway.
4. Every Cram lesson contains a real bottom line, recognition cues, prioritized actions, monitoring, medication safety when relevant, complications, red flags, teaching, a PN/LVN scope or delegation note, an exam trap, a rapid-review pearl, source basis, and source date.
5. State-variable nursing scope, mandatory reporting, consent, public-health, IV therapy, medication administration, and delegation rules are marked with `statePolicyCheck: true` rather than presented as universal U.S. law.
6. Duplicate or near-duplicate lessons are merged or differentiated by a clinically meaningful decision pathway.
7. High-risk clinical claims are refreshed against current authoritative U.S. guidance before publication.
8. Topics outside entry-level PN/LPN/LVN scope are framed around recognition, monitoring, safe implementation, communication, and escalation rather than autonomous diagnosis or prescribing.

## Serving-scope finding

The production pathway is `us-lpn-nclex-pn`. The production entitlement model identifies the American practical-nurse learner as `country=US`, `tier=LVN_LPN`. Serving lessons are restricted to published `US_ONLY` or `BOTH` content plus the applicable `lvn`, `free`, and `general` tiers. The older TypeScript `contentMap` is a mixed RN/RPN/NP/general collection and cannot by itself prove American PN coverage.

## Reconciliation work still required

The remaining coverage phase must classify the current serving U.S. PN full-lesson estate with stable identifiers into `MATCHED`, `MISSING_CRAM`, and `NOT_APPLICABLE_TO_US_PN`. Every `MISSING_CRAM` item must then be authored and quality-reviewed, and the proposed lineage must be verified against the actual serving source row before the gap count is reduced.

Do not convert the current lesson count into a completion claim until reconciliation reaches zero unexplained U.S. gaps.
