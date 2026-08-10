# CNPLE Cram V2 — Geriatrics Parity Batch 43C Clinical Second Pass

Date: 2026-08-09
Scope: `43c-geriatrics-goals-chronic-care-transitions-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-advance-care-planning`
- `np-palliative-care-in-geriatrics`
- `np-hypertension-management-in-elderly`
- `np-diabetes-management-in-elderly`
- `np-heart-failure-in-elderly`
- `np-cognitive-impairment-screening`
- `np-functional-assessment-tools`
- `np-transitions-of-care-for-elderly`
- `np-long-term-care-considerations`

All are literal canonical NP-generator slugs.

## Clinical second-pass findings

**Advance care planning:** PASS. Values/future decision-maker planning is distinguished from present informed consent and clinician medical orders. Current capable choice remains primary; substitute decision-making and documentation are jurisdiction-sensitive.

**Palliative care:** PASS. Palliative care is concurrent serious-illness care rather than synonymous with imminent death or automatic treatment withdrawal. Testing and medications are filtered through symptom benefit, goals and time-to-benefit.

**Hypertension:** PASS. Older age does not erase evidence-based vascular prevention. Standardized measurement and risk-based therapy remain core; orthostasis, falls, frailty and limited life expectancy modify intensity/tolerance.

**Diabetes:** PASS. Functional independence, frailty, cognition, CKD, meal reliability and hypoglycemia risk determine targets/regimen complexity. Tight control is actively de-intensified when recurrent hypoglycemia or treatment burden outweighs long-term benefit.

**Heart failure:** PASS. Guideline-directed disease-modifying therapy remains appropriate in suitable older adults while titration accounts for BP, renal function, potassium, cognition, frailty and goals. Age alone is not used to deny therapy.

**Cognitive screening:** PASS. Screening is not diagnosis. Delirium, depression, sensory loss, medication burden and functional history are integrated before labelling dementia.

**Functional tools:** PASS. ADLs/IADLs, gait/transfers and medication self-management inform actual independence and discharge safety; medical stability is not treated as functional readiness.

**Transitions:** PASS. Medication reconciliation, pending-result ownership, equipment/access, function/cognition and teach-back are required. Discharge paperwork alone is not treated as a completed transition.

**Long-term care:** PASS. Frailty/goals/function and stewardship frame care. Asymptomatic bacteriuria, chronic sedative use and sliding-scale-only insulin are explicitly avoided; true acute illness is still recognized and transferred when needed/goal-concordant.

## Canadian source refresh

- Diabetes Canada: Diabetes in Older People and Hypoglycemia guidance.
- Hypertension Canada 2025 Primary Care Guideline.
- Canadian Cardiovascular Society heart-failure guidance.
- Choosing Wisely Canada Geriatrics, Palliative Care, Hospital Pharmacy, Family Medicine and Nurse Practitioner recommendations.
- Canadian advance-care-planning, consent/substitute-decision, frailty, functional-assessment and transitions-of-care practice principles.

## Authoring gates

Required Cram fields, Canadian/SI framing, frailty/time-to-benefit reasoning, hypoglycemia/orthostasis safety, consent/capacity boundaries, transition ownership and long-term-care stewardship: PASS by editorial review.

## Publication boundary

Clinical authoring only. Structural JSON/global-ID validation, exact current Full-source/Bottom-Line anchors, exactly three eligible lesson-linked Quick Checks, shared runtime certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
