# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 384
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library contains 384 distinct authored Cram lessons spanning all NCLEX-PN Client Needs areas and major practical-nursing clinical domains. Coverage now includes high-alert infusion safety, renal/urology and CKD pharmacology, GI medication safety, endocrine replacement/thyroid therapy, osteoporosis/calcium-regulation drugs, antiepileptic safety, migraine therapy, spasticity/myasthenia therapy, psych/substance-use pharmacology, HIV treatment/prevention pharmacology, and reproductive medication safety.

No numeric milestone by itself is a declaration of complete coverage.

## U.S.-specific production denominator

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,296 catalog rows**, **117 retired**, **1,179 live**, and **1,177 indexed/learner-reachable full lessons**. Open U.S. cohorts remain **139 PN-013 pharmacology-element gaps**, **971 PN-015 Cram-safety gaps**, **796 missing Pre-Tests**, **919 missing Post-Tests**, and **3 live-not-indexed/curation rows** until row-level remediation is proven.

## Latest authoring

The newest 20 lessons target two additional medication-safety surfaces.

Psych/substance-use pharmacology now adds venlafaxine, duloxetine, mirtazapine, trazodone, methylphenidate, atomoxetine, buprenorphine/naloxone, extended-release naltrexone, acamprosate, and disulfiram. Current safety distinctions include antidepressant suicidality monitoring, SNRI blood-pressure/discontinuation risks, trazodone priapism, stimulant abuse/misuse/addiction, atomoxetine pediatric suicidal-ideation risk, buprenorphine precipitated withdrawal/respiratory-depression risk, naltrexone opioid-free initiation and post-blockade overdose vulnerability, renal limits for acamprosate, and disulfiram-alcohol/hepatotoxicity risk.

HIV/reproductive pharmacology now adds bictegravir/TAF/FTC, dolutegravir, oral PrEP, injectable cabotegravir PrEP, HIV nPEP, combined hormonal contraception, depot medroxyprogesterone, progestin-only pills, levonorgestrel emergency contraception, and ulipristal emergency contraception. Current CDC/NIH/FDA guidance is preserved, including HIV testing/renal/HBV monitoring for PrEP, rapid nPEP initiation within the guideline window, ART interaction/adherence safety, DMPA bone-density risk, estrogen-specific contraceptive risk screening, and the 5-day delay before resuming hormonal contraception after ulipristal.

PN/LVN language remains limited to recognition, monitoring, safe implementation, communication, and escalation unless state/facility policy specifically authorizes more.

## Lineage and completion gate

`LINEAGE_CANDIDATES.json` records stable audit slugs and proposed authored Cram counterparts. No candidate reduces a production gap count until its source row is verified as learner-reachable on `us-lpn-nclex-pn` and substantive content equivalence is reviewed.

Completion requires every applicable serving U.S. PN full lesson to be classified with a stable identifier as `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN`, with zero unexplained `MISSING_CRAM` rows. Canadian REx-PN assumptions must not leak into the U.S. pathway, and state-variable LPN/LVN scope must remain tagged rather than presented as universal law.
