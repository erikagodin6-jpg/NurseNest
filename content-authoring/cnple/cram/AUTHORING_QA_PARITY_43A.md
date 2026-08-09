# CNPLE Cram V2 — Parity Batch 43A Clinical Second Pass

Date: 2026-08-09
Scope: `43a-renal-chronic-management-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-diabetic-nephropathy-prevention-and-management`
- `np-hypertensive-nephrosclerosis-management`
- `np-electrolyte-management-in-ckd`
- `np-anemia-of-ckd-evaluation-and-treatment`
- `np-mineral-bone-disorder-in-ckd`
- `np-dialysis-indications-and-preparation`
- `np-kidney-transplant-follow-up-basics`
- `np-drug-dosing-in-renal-impairment`

All are literal slugs from the canonical NP parity generator.

## Clinical review

### Diabetic kidney disease
PASS. Persistent ACR/eGFR abnormalities establish chronic disease; atypical active sediment/heavy proteinuria/rapid decline triggers non-diabetic kidney differential. RAAS/SGLT2/GLP-1/nsMRA kidney-protective therapy is layered according to current Diabetes Canada indications and monitored for potassium/renal/volume safety.

### Hypertensive kidney disease
PASS. Hypertension is not accepted as a catch-all CKD etiology. Heavy proteinuria, active sediment, resistant/accelerated disease and renovascular clues force diagnostic reconsideration.

### CKD electrolytes
PASS. Dangerous hyperkalemia separates membrane stabilization, intracellular shift and potassium removal. Chronic mild hyperkalemia prompts reversible-cause management rather than automatic permanent withdrawal of beneficial RAAS therapy.

### CKD anemia
PASS. Iron and alternate causes are assessed before ESA. ESA therapy is conservative and is not used to normalize hemoglobin; acute bleeding is not treated by ESA escalation.

### CKD mineral-bone disorder
PASS. CKD-MBD is treated as calcium/phosphate/PTH/vitamin-D/bone/vascular physiology with stage and trend context, not as routine osteoporosis or one abnormal PTH value.

### Dialysis indications/preparation
PASS. Kidney-failure planning begins before crisis, including dialysis modality/access, transplant and active conservative kidney management. Chronic dialysis is initiated for clinical indications/refractory complications rather than an isolated eGFR threshold.

### Kidney transplant follow-up
PASS. Graft dysfunction, infection, immunosuppressant toxicity/interactions and malignancy risk are explicit. Immunosuppression is not independently stopped/adjusted without transplant-team coordination.

### Renal drug dosing
PASS. Drug-specific renal clearance, the correct renal estimate, stability of kidney function and dialysis removal determine dosing. Stable-CKD equations are not blindly applied during evolving AKI.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Diabetes Canada 2025 Chronic Kidney Disease in Diabetes update.
- Choosing Wisely Canada / Canadian Society of Nephrology recommendations, updated 2025, including ESA and dialysis initiation recommendations.
- Kidney Foundation of Canada CKD, dialysis, transplant and conservative kidney management resources.
- Health Canada product monographs and Canadian renal-pharmacy practice for medication-specific dosing.

## Authoring gates

- Required Cram fields: present in all eight records.
- Canadian/SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Unsupported universal dialysis/ESA/CKD-MBD thresholds invented: none.
- Red flags/escalation: present in all eight.
- Shared-decision/specialist boundaries: explicit.

## Publication boundary

Clinical authoring second pass only. Structural parsing, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
