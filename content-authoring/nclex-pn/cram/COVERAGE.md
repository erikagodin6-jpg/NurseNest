# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 324
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library contains 324 distinct authored Cram lessons spanning all NCLEX-PN Client Needs areas and major practical-nursing clinical domains, including high-alert infusion and medication-administration safety.

No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**. Open U.S. cohorts remain **139 PN-013 pharmacology-element gaps**, **971 PN-015 Cram-safety gaps**, **796 missing Pre-Tests**, **919 missing Post-Tests**, and **3 live-not-indexed/curation rows** until row-level remediation is proven.

## Latest authoring

The newest 20 lessons target medication/dosage/IV safety and cover alteplase, tenecteplase, sodium nitroprusside, IV nicardipine, dexmedetomidine, propofol, vasopressin, dobutamine, mannitol, phenylephrine, IV insulin infusion, continuous heparin infusion, 3% hypertonic saline, IV magnesium replacement, IV sodium phosphate, esmolol infusion, IV diltiazem, IV antiarrhythmic lidocaine, phentolamine extravasation rescue, and IV potassium phosphate.

Current U.S. labeling was refreshed before authoring. PN/LVN language is limited to recognition, monitoring, safe implementation, communication, and escalation unless state/facility policy specifically authorizes more.

## Lineage and completion gate

`LINEAGE_CANDIDATES.json` records stable audit slugs and proposed authored Cram counterparts. No candidate reduces a production gap count until its source row is verified as learner-reachable on `us-lpn-nclex-pn` and substantive content equivalence is reviewed.

Completion requires every applicable serving U.S. PN full lesson to be classified with a stable identifier as `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN`, with zero unexplained `MISSING_CRAM` rows. Canadian REx-PN assumptions must not leak into the U.S. pathway, and state-variable LPN/LVN scope must remain tagged rather than presented as universal law.
