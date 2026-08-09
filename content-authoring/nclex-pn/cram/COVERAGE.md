# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 504
Latest QA addendum: `AUTHORING_QA_ADDENDUM_504.md`
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library contains 504 distinct authored Cram lessons spanning all NCLEX-PN Client Needs areas and major practical-nursing clinical domains. The 484-lesson pharmacology estate is preserved, and the newest 20 lessons add an explicit exact-audit-source reconciliation layer rather than another broad topic-only expansion.

No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**. Open U.S. cohorts remain **139 PN-013 pharmacology-element gaps**, **971 PN-015 Cram-safety gaps**, **796 missing Pre-Tests**, **919 missing Post-Tests**, and **3 live-not-indexed/curation rows** until row-level remediation is proven.

`countedResolvedProductionRows` remains **0**. Authored Cram volume is not used to decrement those measured serving gaps.

## Latest authoring: exact audit-source reconciliation prep

`50-audit-exact-source-remediation.json` adds dedicated source-slug candidates for `hypertension-teaching`, `edema-daily-weights`, `copd-home-care`, `hypokalemia-symptoms`, `pn-scope-safety-basics`, `vital-signs-escalation`, `heart-failure-monitoring`, `oxygen-devices-for-pn-care`, `insulin-administration-checks`, and `oral-hypoglycemics`.

`51-audit-exact-labor-medication-remediation.json` adds dedicated candidates for `antibiotic-side-effect-reporting`, `us-pn-angina`, and eight exact U.S. labour/delivery audit samples: 5 Ps, fetal positions, mechanisms of labor, true labor vs prelabor, labor breathing techniques, fetal monitoring, FHR variability, and the four stages of labor.

The fetal-monitoring lessons use ACOG Clinical Practice Guideline No. 10 (October 2025) and the ACOG fetal-monitoring patient resource reviewed January 2026. Labor-management lessons use ACOG Clinical Practice Guideline No. 8. Diabetes medication content is aligned to ADA Standards of Care in Diabetes—2026, and antibiotic adverse-effect reporting uses current CDC 2026 stewardship, allergy, and C. difficile guidance.

These 20 records include `sourceLessonSlugCandidate` and a provisional `lineageStatus`. They are intentionally authored close to exact serving identities, but they are **not** counted as production-resolved rows until the corresponding source row is independently confirmed as learner-reachable on the U.S. pathway and the audit family/Cram deficiency is proven for that row.

## Lineage and completion gate

`LINEAGE_CANDIDATES.json` records the audit samples and proposed authored Cram counterparts. No candidate reduces a production gap count until its source row is verified on `us-lpn-nclex-pn` and substantive content equivalence is reviewed.

The checked-in production audit exposes aggregate/source counts and sample slugs, not a complete checked-in list of all 139 U.S. PN-013 or 971 U.S. PN-015 source rows. Some sample slugs come from PN-011/PN-012 assessment gaps rather than PN-015; authoring them improves source alignment but does not prove they were missing Cram.

Completion requires every applicable serving U.S. PN full lesson to be classified with a stable identifier as `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN`, with zero unexplained `MISSING_CRAM` rows. Canadian REx-PN assumptions must not leak into the U.S. pathway, and state-variable LPN/LVN scope must remain tagged rather than presented as universal law.
