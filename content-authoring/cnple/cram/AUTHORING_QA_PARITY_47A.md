# CNPLE Cram V2 — Pediatrics Parity Batch 47A Clinical Second Pass

Date: 2026-08-09
Scope: `47a-pediatrics-prevention-development-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

The batch contains nine literal NP-generator Full-lesson identities:

- `np-well-child-care-and-anticipatory-guidance`
- `np-immunization-schedule-and-catch-up`
- `np-newborn-care-and-screening`
- `np-infant-feeding-and-nutrition`
- `np-childhood-growth-and-development`
- `np-developmental-surveillance-and-screening`
- `np-autism-spectrum-disorder-screening`
- `np-adhd-diagnosis-and-management`
- `np-childhood-asthma-diagnosis-and-management`

## Clinical review

**Well-child / growth / development:** PASS. Longitudinal trajectory, caregiver concern and functional development outrank one percentile or one screening score. Regression, faltering trajectory, abnormal neurologic findings and safeguarding concerns remain explicit escalation signals.

**Immunization:** PASS. The lesson does not hard-code one static national schedule. It requires current NACI/Canadian Immunization Guide recommendations plus the applicable provincial or territorial program and correctly continues rather than restarts delayed multidose series. This is important because the Canadian Immunization Guide and NACI issued multiple pediatric updates during 2026.

**Newborn care:** PASS. Feeding, hydration/weight, bilirubin age-in-hours context, cardiorespiratory transition and completion/closure of provincial newborn screening are separated from adult/older-child pathways. Respiratory distress, temperature instability, poor feeding, lethargy, cyanosis and bilious vomiting are explicit urgent signals.

**Infant nutrition:** PASS. Feeding is family-centred and judged by growth/hydration/transfer rather than ideology or minutes at breast. Unsafe formula dilution and unregulated homemade formula are rejected; vitamin D/iron/complementary-food/allergen guidance is kept Canadian and current-guidance based.

**Autism:** PASS. Screening is explicitly not diagnosis. Clear clinical concern or regression can trigger referral despite a negative screen, and the language is neurodiversity-affirming and function focused.

**ADHD:** PASS. Diagnosis requires developmental history, impairment across settings and evaluation of sleep, learning, mood, trauma and comorbidities. Rating scales support rather than replace diagnosis. Medication monitoring includes BP/HR, growth, appetite, sleep, mood and diversion risk without teaching routine ECG for every child.

**Childhood asthma:** PASS. The lesson distinguishes recurrent preschool wheeze from confirmed asthma, uses objective testing when age permits, preserves ICS-containing controller care and written action planning, and escalates silent chest, hypoxemia, exhaustion and poor initial bronchodilator response.

## Canadian source refresh

Load-bearing source families rechecked on 2026-08-09:

- Public Health Agency of Canada, Canadian Immunization Guide and 2026 NACI statements/updates.
- Canadian Paediatric Society preventive care, newborn, infant nutrition, developmental, autism, ADHD and asthma resources.
- Rourke Baby Record / Canadian preventive-care framework for early-childhood longitudinal surveillance.
- Canadian Thoracic Society asthma guidance where relevant.

No U.S.-only exam or AAP-only operational rule is presented as Canadian national policy. Province/territory-specific program differences remain explicit.

## Authoring gates

- Required Cram fields: present in all nine records by editorial review.
- Canadian/SI framing: PASS.
- Screening versus diagnosis: PASS.
- Developmental regression and safeguarding escalation: PASS.
- Medication and immunization safety: PASS.
- Static schedule/age-rule overreach: avoided.

## Publication boundary

This is clinical authoring certification only. It does not certify the current Full-source anchor, Bottom Line evidence, exactly three eligible lesson-linked Quick Checks, runtime recipe integrity, authenticated learner rendering, merge or deployment. Those remain fail-closed downstream gates.
