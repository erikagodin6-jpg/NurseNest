# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 344
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library contains 344 distinct authored Cram lessons spanning all NCLEX-PN Client Needs areas and major practical-nursing clinical domains, including high-alert infusion safety, CKD/mineral-bone pharmacology, potassium-binder safety, BPH/urinary-retention medications, overactive-bladder therapy, stone-prevention pharmacology, and UTI symptom/treatment distinctions.

No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**. Open U.S. cohorts remain **139 PN-013 pharmacology-element gaps**, **971 PN-015 Cram-safety gaps**, **796 missing Pre-Tests**, **919 missing Post-Tests**, and **3 live-not-indexed/curation rows** until row-level remediation is proven.

## Latest authoring

The newest 20 lessons target renal/metabolic and urology pharmacology: desmopressin, octreotide, albumin, IV iron sucrose, sevelamer, cinacalcet, calcitriol, patiromer, sodium zirconium cyclosilicate, acetazolamide, hydrochlorothiazide, tamsulosin, finasteride, oxybutynin, mirabegron, bethanechol, calcium acetate, potassium citrate, phenazopyridine, and fosfomycin.

Current U.S. DailyMed/FDA labeling was refreshed before authoring. High-yield corrections include desmopressin's boxed hyponatremia warning; explicit recognition that patiromer and sodium-zirconium cyclosilicate are not emergency substitutes for life-threatening hyperkalemia treatment; calcium/PTH monitoring with cinacalcet/calcitriol; and clear distinction between phenazopyridine symptom relief and definitive UTI treatment.

PN/LVN language remains limited to recognition, monitoring, safe implementation, communication, and escalation unless state/facility policy specifically authorizes more.

## Lineage and completion gate

`LINEAGE_CANDIDATES.json` records stable audit slugs and proposed authored Cram counterparts. No candidate reduces a production gap count until its source row is verified as learner-reachable on `us-lpn-nclex-pn` and substantive content equivalence is reviewed.

Completion requires every applicable serving U.S. PN full lesson to be classified with a stable identifier as `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN`, with zero unexplained `MISSING_CRAM` rows. Canadian REx-PN assumptions must not leak into the U.S. pathway, and state-variable LPN/LVN scope must remain tagged rather than presented as universal law.
