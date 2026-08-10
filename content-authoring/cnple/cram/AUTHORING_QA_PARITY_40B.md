# CNPLE Cram V2 — Cardiovascular Parity Batch 40B Clinical Second Pass

Date: 2026-08-10
Scope: `40b-cardiovascular-vascular-valve-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-coronary-artery-disease-risk-stratification-and-management`
- `np-stable-angina-diagnostic-workup-and-treatment`
- `np-valvular-heart-disease-murmur-recognition-and-referral`
- `np-peripheral-artery-disease-diagnosis-and-management`
- `np-anticoagulation-management-and-reversal-strategies`
- `np-aortic-stenosis-severity-assessment-and-timing-of-intervention`

## Clinical review
- CAD and stable angina correctly separate stable chronic symptoms from ACS-pattern change and pair symptom control with secondary prevention.
- Valvular disease treats murmur as a clue and uses symptoms/echo/hemodynamics for referral; routine endocarditis prophylaxis for every murmur is explicitly rejected.
- PAD uses ABI/TBI confirmation, distinguishes vascular from neurogenic pain, treats systemic vascular risk, and escalates acute/chronic limb-threatening ischemia.
- Anticoagulation/reversal is agent-, timing-, organ-function-, bleed-site- and urgency-specific; normal routine coagulation tests are not misused to exclude DOAC effect.
- Aortic stenosis integrates valve area/velocity/gradient/flow and symptoms; symptomatic severe disease is referred for valve intervention rather than indefinitely medicated.

## Current Canadian source refresh
Rechecked 2026-08-10 against CCS 2022 PAD guidance, current CCS heart-valve/structural-heart resources, Thrombosis Canada DOAC bleeding and heparin reversal guides, and CCS secondary-prevention/ischemic-heart-disease resources.

## Publication boundary
Clinical authoring only. Manifest registration, JSON/schema validation, exact current Full identity, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner render QA, merge and deployment remain separate fail-closed gates.
