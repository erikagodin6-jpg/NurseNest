# CNPLE Cram V2 — Parity Batch 43C Clinical Second Pass

Date: 2026-08-09
Scope: `43c-renal-core-parity.json`
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

## Clinical second-pass findings

- CKD: chronicity is required; eGFR and albuminuria jointly define risk; dialysis is not initiated solely from one outpatient eGFR value.
- AKI: changing creatinine and urine output are interpreted dynamically; complication-driven dialysis and obstruction/sepsis/nephrotoxin assessment are explicit.
- Proteinuria: ACR quantification and persistence are required; nephrotic/active-sediment patterns escalate.
- Hematuria: glomerular versus urologic source is separated; anticoagulation does not explain away otherwise unexplained hematuria.
- UTI: symptomatic syndrome is required; asymptomatic bacteriuria is generally not treated outside defined exceptions.
- Pyelonephritis: upper-tract/systemic disease receives kidney-penetrating therapy and infected obstruction is a source-control emergency.
- Nephrolithiasis: infection plus obstruction, solitary kidney/anuria, AKI or uncontrolled symptoms change disposition; routine severe calcium restriction is rejected.
- Glomerulonephritis: active sediment plus falling kidney function/systemic vasculitic features prompts urgent nephrology rather than empiric UTI treatment.

## Canadian source refresh

Rechecked 2026-08-09 against KDIGO 2024 CKD guidance as adopted in Canadian kidney practice, Kidney Foundation of Canada resources, Choosing Wisely Canada Nephrology recommendations updated November 2025, and Canadian Urological Association recurrent-UTI/nephrolithiasis resources.

## Publication boundary

Clinical authoring PASS only. Structural/global uniqueness, exact-current-Full reconciliation, point and Bottom-Line anchors, three eligible Quick Checks, runtime integrity and learner rendering remain downstream fail-closed gates.
