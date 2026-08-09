# CNPLE Cram V2 — Parity Batch 40B Clinical Second Pass

Date: 2026-08-09
Scope: `40b-cardio-prevention-management-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-cardiovascular-disease-prevention-strategies`
- `np-post-mi-secondary-prevention-and-rehabilitation`
- `np-heart-failure-medication-titration-and-monitoring`
- `np-device-therapy-indications-pacemakers-and-icds`
- `np-endocarditis-prophylaxis-guidelines-and-risk-stratification`
- `np-hyperlipidemia-statin-selection-and-monitoring`

All IDs are literal canonical NP parity-generator slugs.

## Clinical review

### Cardiovascular prevention
PASS. Total absolute risk drives the plan; primary and secondary prevention are separated; aspirin is not taught as routine primary prevention.

### Post-MI secondary prevention
PASS. Medication reconciliation, lipid/BP/diabetes/smoking management, antithrombotic plan, cardiac rehabilitation and closed-loop follow-up are all explicit; recurrent ischemia/HF/bleeding change disposition.

### HFrEF medication titration
PASS. The four foundational classes are introduced early in parallel as tolerated; diuretics are not substituted for disease-modifying therapy; beta-blocker titration is distinguished from shock/acute decompensation; renal/potassium/BP monitoring is explicit.

### Device therapy
PASS. Pacemaker, ICD and CRT indications are differentiated by brady/conduction, sudden-death and dyssynchrony/HF problems. Primary-prevention ICD/CRT referral follows optimized/maximally tolerated GDMT and repeat EF when clinically feasible.

### Endocarditis prophylaxis
PASS. Prophylaxis is limited to selected highest-risk cardiac conditions and appropriate dental procedures; uncomplicated MVP, innocent murmurs and routine GI/GU procedures do not trigger prophylaxis by themselves.

### Statin selection/monitoring
PASS. Statin intensity follows ASCVD risk/indication. Routine CK/liver surveillance in asymptomatic stable patients is not taught. Possible intolerance is evaluated through timing, interactions, alternative causes and rechallenge rather than automatic permanent discontinuation.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Cardiovascular Society Secondary Prevention Pathway.
- CCS/CHFS 2021 HFrEF guideline and device-referral chapter.
- CCS dyslipidemia guidance and secondary-prevention resources.
- Canadian cardiovascular/endocarditis-prevention practice resources and antimicrobial-stewardship principles.

## Authoring gates

- Required Cram fields: present in all six records.
- Canadian/SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Universal antithrombotic/device/prophylaxis thresholds invented: none.
- Red flags/escalation: present in all six.
- Longitudinal ownership/follow-up: explicit.

## Publication boundary

Clinical authoring second pass only. Structural parsing, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
