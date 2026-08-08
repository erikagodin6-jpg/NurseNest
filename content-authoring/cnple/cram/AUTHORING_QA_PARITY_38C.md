# CNPLE Cram V2 — Parity Batch 38C Clinical Second Pass

Date: 2026-08-08
Scope: `38c-lab-liver-inflammation-endocrine-parity.json`
Result: **PASS — clinical authoring second pass**

## Identity contract

Each record uses the literal underlying canonical `ca-np-cnple` Full-lesson slug recovered from the reverse-coverage/search-index evidence:

- `lab-ast-and-alt`
- `lab-bilirubin-and-jaundice`
- `lab-liver-function-patterns`
- `lab-crp`
- `lab-esr`
- `lab-procalcitonin`
- `lab-thyroid-function-tests`
- `lab-glucose-interpretation`

No conceptual alias is treated as canonical identity. Private-core reconciliation must still confirm these slugs against the current public-complete Full denominator before publication.

## Clinical review

### AST / ALT
PASS. The lesson treats aminotransferases as injury markers rather than direct hepatic-function measures, preserves AST's extrahepatic differential, and prevents the unsafe inference that falling aminotransferases necessarily mean recovery during severe acute liver injury.

### Bilirubin / jaundice
PASS. The lesson separates conjugated and unconjugated mechanisms, integrates hemolysis versus hepatocellular/cholestatic patterns, and keeps neonatal bilirubin on an age-in-hours/gestational-risk pathway rather than importing adult thresholds.

### Liver-function patterns
PASS. The lesson separates hepatocellular injury, cholestasis and synthetic dysfunction. Albumin/INR/bilirubin are not collapsed into the same clinical role as AST/ALT, and acute deterioration is disposition-driven rather than panel-driven.

### CRP
PASS. CRP is framed as a nonspecific acute-phase adjunct/trend, not a bacterial-infection diagnosis or an antibiotic trigger. Ordering requires a clinical question and a decision the result can change.

### ESR
PASS. ESR is not used as a general inflammation screen. The lesson includes major confounders and preserves selected disease-specific uses while teaching that CRP is generally the preferable single acute systemic-inflammation marker.

### Procalcitonin
PASS. Procalcitonin is limited to validated stewardship contexts and can support de-escalation/shorter exposure when the clinical course agrees. It cannot rule out sepsis, meningitis, neutropenic infection or another time-critical bacterial syndrome, and no universal assay cutoff is invented.

### Thyroid function tests
PASS. TSH-first reasoning is used for most primary thyroid disease; free T4 becomes necessary with abnormal TSH and when central/pituitary disease or another special context makes TSH unreliable. Acute non-thyroidal illness, pregnancy and assay/medication interference are explicit.

### Glucose interpretation
PASS. Canadian SI glucose criteria are used. The lesson separates chronic diabetes diagnosis, acute stress hyperglycemia, hypoglycemia and DKA/HHS; asymptomatic diagnostic-range results require confirmation, while symptomatic metabolic emergencies are treated immediately. Euglycemic DKA is preserved as an exam/safety trap.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-08:

- Province of British Columbia, **Abnormal Liver Chemistry — Evaluation and Interpretation**: hepatocellular vs cholestatic patterns; aminotransferases are not measures of global hepatic function; albumin/INR support synthetic-function assessment; bilirubin occurs in both hepatocellular and cholestatic disease.
- Choosing Wisely Canada / Canadian Association of Medical Biochemists, **Medical Biochemistry Recommendations**: do not use ESR as a general inflammation screen; CRP is generally the preferable acute-phase marker for this purpose.
- Province of British Columbia, **Thyroid Function Testing in the Diagnosis and Monitoring of Thyroid Function Disorder** and **Hormone Testing — Indications and Appropriate Use**: TSH is preferred first-line for most primary thyroid testing; free T4 is required when TSH is abnormal and when central disease is suspected; free T3 is rarely an initial test.
- Diabetes Canada Clinical Practice Guidelines, **Definition, Classification and Diagnosis of Diabetes, Prediabetes and Metabolic Syndrome**: Canadian diagnostic glucose criteria and confirmation rules.
- Public Health Agency of Canada antimicrobial-stewardship evidence/action-plan resources: procalcitonin may support antibiotic stewardship in selected settings; it remains an adjunct rather than a stand-alone infection diagnosis.

## Authoring gates

- Required Cram fields present in every record: PASS by editorial review; structural parser still required.
- Canadian SI instructional framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Universal product/assay-specific cutoffs invented: none.
- Clinical red flags and escalation: present in all eight.
- `localPolicyCheck` used where stewardship/protocol implementation can vary locally.

## Publication boundary

This PASS certifies the **clinical authoring second pass only**. It does **not** certify JSON/required-field integrity, exact current Full identity, point-level Full-source anchors, Bottom Line evidence, Quick Check eligibility, runtime recipe integrity, learner rendering, merge, or deployment. Those remain fail-closed private-core gates.
