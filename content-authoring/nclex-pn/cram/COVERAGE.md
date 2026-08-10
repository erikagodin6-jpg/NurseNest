# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 524
Latest QA addendum: `AUTHORING_QA_ADDENDUM_524.md`
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library contains 524 distinct authored Cram lessons spanning all NCLEX-PN Client Needs areas and major practical-nursing clinical domains. The 504-lesson estate is preserved; the newest 20 lessons deepen the two largest still-open PN-015 source families: health assessment/fundamentals and perioperative/procedure safety.

No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**. Open U.S. cohorts remain **139 PN-013 pharmacology-element gaps**, **971 PN-015 Cram-safety gaps**, **796 missing Pre-Tests**, **919 missing Post-Tests**, and **3 live-not-indexed/curation rows** until row-level remediation is proven.

`countedResolvedProductionRows` remains **0**. Authored Cram volume is not used to decrement those measured serving gaps.

## Latest authoring: source-family PN-015 depth

`52-health-assessment-fundamentals-depth.json` adds orthostatic assessment, pulse-oximetry limitations, respiratory-work-of-breathing deterioration, delirium recognition, peripheral neurovascular checks, pressure-injury risk/skin assessment, fluid-status trends, pain reassessment, focused acute-abdominal deterioration, and post-fall assessment.

`53-perioperative-procedure-safety-depth.json` adds preprocedure verification/time-out safety, postoperative airway/respiratory deterioration, postoperative hemorrhage, surgical-site infection prevention, postoperative urinary retention/catheter safety, VTE prevention, pulmonary-expansion care, surgical-drain safety, dehiscence/evisceration response, and postoperative hypothermia/rewarming.

Current U.S. source refresh for these tranches includes FDA pulse-oximetry limitations and skin-pigmentation accuracy concerns; AHRQ Fall TIPS and pressure-injury prevention resources; Joint Commission 2026 National Performance Goals and Universal Protocol; CDC SSI, CAUTI, and healthcare-associated VTE resources.

These 20 records are **source-family authoring**, not exact source-row reconciliation. They carry `SOURCE_FAMILY_AUTHORED_NOT_ROW_MAPPED` and do not alter measured PN-013/PN-015 counts.

## Exact audit-source reconciliation layer

`50-audit-exact-source-remediation.json` and `51-audit-exact-labor-medication-remediation.json` retain the 20 exact audit/source candidates authored at the 504 checkpoint. `LINEAGE_CANDIDATES.json` remains provisional and no source-slug candidate reduces a production gap until learner reachability and substantive equivalence are proven.

## Completion gate

The checked-in production audit exposes aggregate/source counts and samples, not a complete checked-in list of all 139 U.S. PN-013 or 971 U.S. PN-015 rows. Source-family authoring therefore improves clinical coverage but cannot be credited as row closure by inference.

Completion requires every applicable serving U.S. PN full lesson to be classified with a stable identifier as `MATCHED`, `MISSING_CRAM`, `NOT_APPLICABLE_TO_US_PN`, or a documented curation disposition, with zero unexplained `MISSING_CRAM` rows. Canadian REx-PN assumptions must not leak into the U.S. pathway, and state-variable LPN/LVN scope must remain tagged rather than presented as universal law.
