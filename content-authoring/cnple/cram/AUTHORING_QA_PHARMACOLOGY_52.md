# CNPLE Cram V2 — Complete Pharmacology Generator Clinical Second Pass

Date: 2026-08-10
Scope: `52a-pharmacology-prescribing-parity.json` + `52b-pharmacology-systems-parity.json`
Canonical generator denominator: **26/26 exact identities**
Result: **PASS — clinical authoring second pass**

## Clinical standards

- Prescribing is indication + patient + drug + monitoring + follow-up/exit plan, not merely order entry.
- Controlled-substance care uses current Canadian federal plus provincial/territorial authority; U.S. DEA assumptions are prohibited. The new federal Controlled Substances Regulations effective October 1, 2026 are treated as a future transition, not as already-in-force August 2026 rules.
- Interactions are interpreted by mechanism, magnitude, timing and patient vulnerability; alert count is not clinical severity.
- Adverse reaction, intolerance and true allergy are distinguished; serious immune/organ reactions are not casually rechallenged.
- PK/PD and renal/hepatic dose adjustment are patient/drug specific; unstable AKI is not treated as steady-state CKD.
- Antibiotic prescribing is syndrome/severity/source/stewardship driven with culture review and source control.
- Anticoagulation distinguishes warfarin INR monitoring from DOAC surveillance; routine INR does not quantify factor-Xa inhibitor effect.
- Pain/opioid care is mechanism/function/overdose-risk based; established opioids/benzodiazepines are not abruptly discontinued because risk is discovered.
- Diabetes, cardiovascular and psychiatric medication management use current Canadian disease-specific guidance and class-specific monitoring.
- Immunization uses current NACI/Canadian Immunization Guide plus local program implementation rather than memorized schedules.
- Natural health products are treated as active therapies with interaction, pregnancy and product-quality considerations.
- Medication reconciliation resolves discrepancies deliberately at transitions; it is not copying an electronic list.
- Pregnancy/lactation prescribing weighs medication exposure against untreated disease; pediatric prescribing uses current kg weight, formulation/concentration and maximum-dose checks; geriatric prescribing incorporates frailty/function/renal clearance/falls and time-to-benefit.
- Adherence interventions target the actual barrier; cost-effective prescribing means total value and access, not lowest acquisition price.
- E-prescribing can create wrong-patient/default-dose/duplicate-order/alert-fatigue errors; prescription-error prevention uses standardization and independent verification for high-risk calculations.
- High-alert medication safety uses stronger systems rather than avoiding necessary therapy.
- Transdermal/injectable products are formulation- and route-specific; duplicate patches, concentration/device errors and depot-route mistakes are explicit hazards.
- Compounding requires individualized clinical need, traceability, stability and applicable pharmacy/regulatory standards rather than bypassing authorized commercial products.
- Storage/stability follows product-specific labelled conditions; temperature/light/moisture/time excursions are not cleared by visual appearance.

## Current Canadian source refresh

Rechecked 2026-08-10:
- Health Canada medication safe-use and product-monograph resources.
- Health Canada controlled-substances regulatory resources; new Controlled Substances Regulations replace current regulations October 1, 2026.
- Health Canada natural health product safety/interactions and 2026 compounding-policy resources.
- Health Canada pediatric drug/medication safety resources, including the June 2026 Prescription Drug List change for pediatric melatonin.
- Health Canada drug storage/transportation and stability guidance.
- Diabetes Canada, Canadian Cardiovascular Society, Thrombosis Canada, CANMAT/CAMH, NACI/Canadian Immunization Guide and Choosing Wisely Canada for disease-/class-specific prescribing.

## Authoring gates

- Literal 26-ID Pharmacology generator denominator: required by consolidation gate.
- Required Cram clinical fields: present by editorial review; global structural parser still required.
- Canadian regulatory framing: PASS.
- Product-specific dosing/monitoring fabricated where monograph dependent: none intentionally authored.
- Special-population, interaction, high-alert and transition safety: PASS.
- Patient education and closed-loop follow-up: PASS.

## Publication boundary

Clinical authoring PASS only. Exact current Full-lesson reconciliation, learner-visible Full-source and Bottom-Line anchors, exactly three eligible linked Quick Checks, shared runtime integrity certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
