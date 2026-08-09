# CNPLE Cram V2 — Parity Batch 42A Clinical Second Pass

Date: 2026-08-09
Scope: `42a-renal-core-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-chronic-kidney-disease-staging-and-management`
- `np-acute-kidney-injury-recognition-and-workup`
- `np-proteinuria-evaluation-and-management`
- `np-hematuria-workup-and-differential-diagnosis`
- `np-urinary-tract-infection-diagnosis-and-management`
- `np-pyelonephritis-diagnosis-and-treatment`
- `np-nephrolithiasis-evaluation-and-prevention`
- `np-glomerulonephritis-recognition-and-referral`

## Clinical review

PASS across all eight. CKD requires chronicity plus eGFR/albuminuria risk; AKI is treated as a dynamic trajectory and calculated eGFR is not used as steady-state truth; proteinuria is confirmed/quantified; hematuria is localized and anticoagulation does not erase the need for source evaluation; UTI treatment is syndrome/host-risk based rather than culture-only; obstructed pyelonephritis and infected stones retain urgent source-control pathways; recurrent stones receive metabolic prevention; nephritic sediment/proteinuria/renal decline triggers nephrology rather than routine UTI treatment.

## Canadian source refresh

Load-bearing source families rechecked on 2026-08-09:

- KDIGO 2024 CKD guidance and Canadian Kidney Foundation/Kidney Care resources.
- Canadian Urological Association hematuria/nephrolithiasis practice resources.
- Choosing Wisely Canada Urology/Geriatrics antimicrobial stewardship recommendations.
- Canadian nephrology glomerular-disease and acute-kidney-injury practice principles.

## Authoring gates

- Required Cram fields: present in all eight.
- Canadian/SI framing: PASS.
- Chronicity vs AKI distinction: PASS.
- Culture vs clinical UTI distinction: PASS.
- Obstructed infection source-control rule: PASS.
- Red flags/escalation: present in all eight.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
