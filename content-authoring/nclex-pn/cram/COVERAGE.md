# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 404
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library contains 404 distinct authored Cram lessons spanning all NCLEX-PN Client Needs areas and major practical-nursing clinical domains. Coverage now includes high-alert infusion safety, renal/urology and CKD pharmacology, GI medication safety, endocrine replacement/thyroid therapy, osteoporosis/calcium-regulation drugs, neurologic medication safety, psych/substance-use pharmacology, HIV treatment/prevention pharmacology, reproductive medication safety, drug-specific antineoplastic toxicity, newborn prophylactic pharmacology, infant RSV antibodies, apnea-of-prematurity therapy, neonatal surfactant, pediatric seizure-rescue pharmacology, and pediatric dose/measurement safety.

No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**. Open U.S. cohorts remain **139 PN-013 pharmacology-element gaps**, **971 PN-015 Cram-safety gaps**, **796 missing Pre-Tests**, **919 missing Post-Tests**, and **3 live-not-indexed/curation rows** until row-level remediation is proven.

## Latest authoring

The newest 20 lessons add two additional medication-safety surfaces.

Oncology pharmacology now has dedicated lessons for cisplatin, doxorubicin, cyclophosphamide, vincristine, fluorouracil, paclitaxel, trastuzumab, bleomycin, etoposide, and tamoxifen. Current U.S. labeling is preserved, including cisplatin nephrotoxicity/ototoxicity, doxorubicin cardiomyopathy and vesicant necrosis, cyclophosphamide hemorrhagic cystitis, vincristine's fatal intrathecal-route hazard, fluorouracil's DPD-deficiency boxed warning, paclitaxel hypersensitivity, trastuzumab cardiomyopathy/infusion/pulmonary toxicity, bleomycin pulmonary fibrosis, etoposide myelosuppression/infusion hypotension, and tamoxifen clot/uterine risk.

Newborn/pediatric medication safety now adds neonatal phytonadione, erythromycin ophthalmic prophylaxis, nirsevimab, clesrovimab, caffeine citrate, beractant surfactant, diazepam nasal seizure-cluster rescue, pediatric weight-based dosing, pediatric liquid-medication measurement, and neonatal excipient/preservative safety. Current CDC/FDA guidance is preserved, including the distinction between maternal RSV vaccination and infant antibody protection, first- versus second-season antibody eligibility, caffeine toxicity/apnea reassessment, rapid respiratory changes after surfactant, current diazepam nasal boxed warnings, and kilogram/concentration safeguards.

PN/LVN language remains limited to recognition, monitoring, safe implementation, communication, and escalation unless state/facility policy specifically authorizes more.

## Lineage and completion gate

`LINEAGE_CANDIDATES.json` records stable audit slugs and proposed authored Cram counterparts. No candidate reduces a production gap count until its source row is verified as learner-reachable on `us-lpn-nclex-pn` and substantive content equivalence is reviewed.

Completion requires every applicable serving U.S. PN full lesson to be classified with a stable identifier as `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN`, with zero unexplained `MISSING_CRAM` rows. Canadian REx-PN assumptions must not leak into the U.S. pathway, and state-variable LPN/LVN scope must remain tagged rather than presented as universal law.
