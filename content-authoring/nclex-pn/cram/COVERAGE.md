# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 484
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library contains 484 distinct authored Cram lessons spanning all NCLEX-PN Client Needs areas and major practical-nursing clinical domains. Coverage now includes high-alert infusion safety, renal/urology and CKD pharmacology, GI medication safety, endocrine replacement/thyroid therapy, osteoporosis/calcium-regulation drugs, neurologic medication safety, psych/substance-use pharmacology, HIV treatment/prevention pharmacology, reproductive medication safety, antineoplastic toxicity, newborn/pediatric medication safety, advanced cardiovascular pharmacology, route/site-specific infectious-disease pharmacology, dermatologic medication safety, advanced rheumatology/immunology pharmacology, severe-asthma/COPD biologic and maintenance pharmacology, hepatic/GI motility pharmacology, dementia/Parkinson/seizure/neuropathic pharmacology, and product-specific diabetes/pituitary/growth-hormone pharmacology.

No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**. Open U.S. cohorts remain **139 PN-013 pharmacology-element gaps**, **971 PN-015 Cram-safety gaps**, **796 missing Pre-Tests**, **919 missing Post-Tests**, and **3 live-not-indexed/curation rows** until row-level remediation is proven.

`countedResolvedProductionRows` remains **0**. Authored Cram volume is not used to decrement those measured serving gaps.

## Latest authoring

The newest neuro/cognitive pharmacology batch adds donepezil, memantine, galantamine, carbidopa/levodopa, entacapone, pramipexole, levetiracetam, gabapentin, pregabalin, and buspirone. The lessons distinguish chronic dementia therapy from acute delirium, protect time-critical Parkinson dosing, separate wearing-off from dyskinesia, flag dopamine-agonist sleep/impulse-control effects, preserve antiseizure behavioral monitoring, and emphasize renal/CNS-depressant safety for gabapentinoids. Buspirone is explicitly scheduled therapy rather than rapid PRN panic rescue.

The newest endocrine/metabolic pharmacology batch adds sitagliptin, linagliptin, pioglitazone, acarbose, insulin glargine, insulin lispro, intranasal glucagon, cabergoline, bromocriptine, and somatropin. High-yield distinctions include product-specific DPP-4 renal rules, pioglitazone's congestive-heart-failure boxed warning, the dextrose rule for acarbose-associated combination hypoglycemia, insulin concentration/device and meal-timing safeguards, no-inhalation nasal glucagon rescue, cabergoline valvular/fibrotic and postpartum-lactation safety, formulation-specific bromocriptine use, and somatropin monitoring for intracranial hypertension, slipped capital femoral epiphysis, glucose intolerance, and thyroid/adrenal effects.

Current U.S. DailyMed/FDA guidance was refreshed before authoring. PN/LVN language remains limited to recognition, monitoring, safe implementation, communication, and escalation unless state/facility policy specifically authorizes more.

## Lineage and completion gate

`LINEAGE_CANDIDATES.json` records stable audit slugs and proposed authored Cram counterparts. No candidate reduces a production gap count until its source row is verified as learner-reachable on `us-lpn-nclex-pn` and substantive content equivalence is reviewed.

The production audit does not expose a complete checked-in list of all 139 U.S. PN-013 slugs; it exposes aggregate/source counts and sample slugs. Therefore authoring from clinically plausible source families remains authoring work, not certified row remediation.

Completion requires every applicable serving U.S. PN full lesson to be classified with a stable identifier as `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN`, with zero unexplained `MISSING_CRAM` rows. Canadian REx-PN assumptions must not leak into the U.S. pathway, and state-variable LPN/LVN scope must remain tagged rather than presented as universal law.
