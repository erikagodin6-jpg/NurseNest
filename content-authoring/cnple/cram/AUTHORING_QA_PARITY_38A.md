# CNPLE Cram V2 — Lab Interpretation Parity Batch 38A Audit

Audit date: 2026-08-08

Scope: `38a-lab-interpretation-parity.json` — eight Full-lesson parity records using the exact canonical Full-lesson slug as the authoring ID.

## Disposition

**Clinical second pass: PASS.**

The batch is authoring-only. Parse/required-field checks, private-core identity/source anchoring, Quick Check evidence, shared Cram certification and learner rendering remain required before publication.

## Identity rule

Unlike earlier topic-led CNPLE authoring IDs, every record in this parity file uses its current Full-lesson slug as `id`:

- `lab-a1c-interpretation`
- `lab-abg`
- `lab-aptt`
- `lab-pt-inr`
- `lab-d-dimer`
- `lab-troponin-interpretation`
- `lab-bnp-ntprobnp`
- `lab-lactate-interpretation`

This is intentional. Full-lesson-driven parity objects should not require fuzzy title matching when the canonical Full identity is already known.

## Clinical review

### A1C

PASS. Uses A1C as a long-term glycemia marker and preserves Diabetes Canada diagnostic framing while explicitly screening for altered red-cell turnover, transfusion, anemia, kidney disease, pregnancy and other A1C/glucose discordance. It prevents therapy escalation from A1C alone when recurrent hypoglycemia is present.

### ABG

PASS. Uses a fixed physiologic sequence: pH -> PaCO2 -> bicarbonate -> expected compensation -> oxygenation. It explicitly prevents a near-normal pH from hiding compensation/mixed disorders and prevents bicarbonate from being presented as universal therapy for metabolic acidosis.

### aPTT

PASS. States that UFH aPTT therapeutic ranges are laboratory-specific and that institutions may use aPTT or anti-Xa according to the validated protocol. It explicitly blocks use of aPTT as a routine LMWH or quantitative DOAC monitor.

Canadian anchor: Thrombosis Canada `Unfractionated Heparin, Low Molecular Weight Heparin and Fondaparinux` and `DOACs: Coagulation Tests`.

### PT / INR

PASS. Keeps INR indication-specific for warfarin, separates warfarin management from unexplained PT prolongation and from DOAC exposure, and makes bleeding severity/clinical context determine reversal urgency rather than the INR number alone.

Canadian anchor: Thrombosis Canada warfarin and out-of-range INR guidance.

### D-dimer

PASS. Requires pretest probability before ordering/interpreting D-dimer. A positive result is explicitly nonspecific and does not diagnose VTE; high-probability/unstable PE is not allowed to wait behind a low-value screening step. Age/probability-adapted strategies are permitted only inside a validated compatible algorithm.

Canadian anchor: Thrombosis Canada DVT/PE diagnostic guidance.

### Troponin

PASS. Separates myocardial injury from myocardial infarction, requires clinical ischemic evidence plus dynamic injury for acute MI classification, prevents automatic NSTEMI labelling in sepsis/PE/HF/renal disease and prevents waiting for troponin when an emergency reperfusion pathway is already indicated clinically/ECG-wise.

### BNP / NT-proBNP

PASS. Treats natriuretic peptides as probability/risk tools rather than standalone HF diagnosis. Explicitly accounts for renal dysfunction, older age, AF and obesity; distinguishes BNP from NT-proBNP and notes the ARNI/BNP interpretation issue.

Canadian anchor: CCS/CHFS heart-failure biomarker guidance.

### Lactate

PASS. Treats lactate as a perfusion/metabolic stress clue, not a sepsis-specific test. Includes shock, seizure, adrenergic medication, liver-clearance, ischemia and toxin/metabolic causes, and prevents serial lactate from becoming an isolated resuscitation target.

## Safety checks

- No routine coagulation test is presented as a universal DOAC concentration.
- No single universal UFH aPTT target is hard-coded.
- No positive D-dimer is presented as diagnostic of VTE.
- No elevated troponin is automatically labelled type 1 MI.
- BNP/NT-proBNP are not used to replace echocardiography/clinical HF assessment.
- Normal lactate is not used to exclude serious sepsis/shock.
- A1C does not override clinically important hypoglycemia or known reliability problems.
- ABG interpretation requires the patient/oxygen/ventilation context, not values alone.

## Remaining publication gates

1. Manifest/file parse and required-field validation.
2. Exact Full-lesson identity confirmation in current `ca-np-cnple` catalogue.
3. Learner-visible Full source hash plus point/Bottom-Line anchor review.
4. Exactly three lesson-related, single-answer, server-gradable Quick Check IDs.
5. Shared Cram integrity certification.
6. Learner Full/Cram render and accessibility verification.
