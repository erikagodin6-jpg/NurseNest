# CNPLE Cram — Post-Generator Hematology Batch 54A Clinical Second Pass

Date: 2026-08-10
Scope: `54a-postgen-hematology-iron-b12-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full-lesson identities

- `np-iron-deficiency-anemia-evaluation`
- `np-iron-deficiency-anemia-oral-therapy`
- `np-iv-iron-therapy`
- `np-vitamin-b12-deficiency`

These IDs come directly from the current `generate-np-hematology-catalog.py` source. No fuzzy/title-derived identity is counted.

## Clinical corrections versus the legacy Full generator

### Iron-deficiency evaluation
PASS. Ferritin is the preferred initial iron-store test but is interpreted on a continuum and in inflammatory/chronic-disease context. The Cram does not require routine serum iron/TIBC for every otherwise-well patient, does not treat microcytosis as proof of iron deficiency, and makes investigation of unexplained blood loss/malabsorption part of the diagnosis.

### Oral iron
PASS. Removed the legacy universal `ferrous sulfate 325 mg TID` teaching. The Cram uses individualized preparation and the lowest effective/tolerated schedule, permits lower-dose/divided/alternate-day strategies, distinguishes expected dark stool from concerning GI bleeding, and requires cause/adherence/absorption review before automatic escalation.

### Intravenous iron
PASS. IV iron is not routine first-line treatment. Indications are oral failure/intolerance, inadequate absorption, continued loss, selected CKD/preoperative/disease-specific indications, and similar evidence-based contexts. Product, maximum dose, infusion rate, test-dose requirement and observation are formulation/local-protocol dependent; no universal IV iron dose is authored. Active hemorrhage/instability remains a resuscitation/transfusion problem rather than an IV-iron problem.

### Vitamin B12 deficiency
PASS. B12 deficiency is treated as a neurologic as well as hematologic disorder. The Cram avoids one universal serum cutoff, reflects the indeterminate zone/laboratory variability, treats neurologic findings promptly, permits high-dose oral therapy in appropriate stable patients, and uses parenteral therapy for neurologic/symptomatic/pregnancy or selected malabsorption contexts. Folate alone is explicitly unsafe when clinically important B12 deficiency is plausible.

## Current Canadian source refresh

Load-bearing sources rechecked 2026-08-10:

- BC Guidelines — **Iron Deficiency: Diagnosis and Management**: CBC + ferritin as usual initial tests; ferritin continuum/context; oral iron first-line with tolerance-guided preparation and alternative schedules including every-other-day dosing; IV iron for defined failure/intolerance/absorption/continued-loss/selected disease contexts; investigate unexplained GI/GU loss.
- BC Guidelines — **Cobalamin (Vitamin B12) and Folate Deficiency** (2023): no routine asymptomatic screening; neurologic injury can be permanent; oral high-dose therapy is effective in many patients; parenteral treatment is appropriate for neurologic/symptomatic/pregnancy and selected malabsorptive settings.
- BC Guidelines — **Folate Deficiency: Investigation & Management**: in suspected cobalamin deficiency, replace B12 as well; folate alone can worsen/unmask neurologic harm.
- BC PharmaCare 2026 formulary/Special Authority updates: current IV-iron products and indications reinforce product-specific rather than universal dosing.

## Safety/quality gates

- Canadian/SI framing: PASS.
- US exam/regulatory framing: none intentionally authored.
- Fixed universal transfusion threshold: none.
- Fixed universal ferritin target across all populations: none.
- Fixed universal IV formulation/dose: none.
- Red flags/disposition present: PASS.
- Required Cram fields present by editorial review; machine parser still required.

## Publication boundary

This PASS is clinical authoring only. Exact current normalized Full-lesson existence/publicComplete status, source-section anchors for every point and Bottom Line, exactly three eligible lesson-linked Quick Checks, shared runtime recipe certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
