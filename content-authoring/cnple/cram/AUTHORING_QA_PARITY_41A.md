# CNPLE Cram V2 — Parity Batch 41A Clinical Second Pass

Date: 2026-08-11  
Scope: `41a-gastro-hepatology-parity.json`  
Result: **PASS — clinical authoring second pass**

## Exact canonical identity set

- `np-gastroesophageal-reflux-disease-diagnosis-and-management`
- `np-peptic-ulcer-disease-and-h-pylori-management`
- `np-dyspepsia-evaluation-and-management`
- `np-inflammatory-bowel-disease-diagnosis-and-management`
- `np-irritable-bowel-syndrome-diagnosis-and-management`
- `np-celiac-disease-diagnosis-and-management`
- `np-hepatitis-b-and-c-evaluation-and-treatment`
- `np-nonalcoholic-fatty-liver-disease-management`
- `np-alcoholic-liver-disease-evaluation`
- `np-cirrhosis-complications-management`

All IDs are literal outputs of the canonical NP parity generator. Learner titles use current terminology where the canonical stored slug is legacy terminology (MASLD; alcohol-associated liver disease) without changing identity.

## Clinical audit

**GERD:** PASS. Typical uncomplicated symptoms use a clinical/PPI pathway; dysphagia, bleeding, anemia, vomiting, weight loss and cardiac-risk chest pain switch to diagnostic evaluation. PPI indication/dose reduction is individualized rather than reflex discontinuation.

**Peptic ulcer / H. pylori:** PASS. Active infection uses urea-breath/stool antigen testing when appropriate; eradication requires post-treatment confirmation. Symptom improvement is not accepted as cure. Prior antibiotic exposure/allergy and local resistance affect regimen selection.

**Dyspepsia:** PASS. Alarm features, H. pylori and medication causes precede a functional label. Routine upper-GI series and unnecessary endoscopy/imaging are avoided in low-risk typical presentations.

**IBD:** PASS. Objective inflammation and ileocolonoscopy/biopsy define diagnosis/extent. Enteric infection including C. difficile is considered before escalating immunosuppression. Corticosteroids are induction/rescue therapy, not maintenance. Toxic megacolon, obstruction, abscess, perforation and major bleeding are urgent.

**IBS:** PASS. Positive diagnosis after a focused alarm-feature screen. Low-value repeated imaging/colonoscopy is avoided. Subtype-directed therapy and structured diet trials retain reintroduction/personalization.

**Celiac disease:** PASS. Diagnostic testing occurs while the patient is consuming gluten. tTG-IgA plus total IgA is the usual adult first-line serologic approach; IgA deficiency changes the testing strategy. Gluten-free treatment begins after appropriate diagnostic confirmation rather than as an unstructured diagnostic trial.

**HBV/HCV:** PASS. HCV antibody indicates exposure while HCV RNA confirms current infection. HBV requires serology plus HBV DNA/liver-risk interpretation. Current PHAC professional resources (updated 2025-12-02) and CASL/AMMI 2025 chronic-HBV guidance are used. HBV reactivation risk before immunosuppression is explicit.

**MASLD:** PASS. Current learner-facing nomenclature is used while preserving the canonical legacy slug. Fibrosis risk, not ALT or steatosis alone, drives liver prognosis; cardiometabolic treatment and non-invasive fibrosis assessment are central.

**Alcohol-associated liver disease:** PASS. Alcohol use disorder and liver disease are treated together. Alcohol-associated hepatitis severity is distinguished from nonspecific aminotransferase elevation; withdrawal, malnutrition, infection, bleeding and pancreatitis are integrated.

**Cirrhosis complications:** PASS. Ascites/SBP, variceal bleeding, encephalopathy, AKI, nutrition and HCC are treated as separate complication pathways. Ammonia alone is not used to diagnose/stage hepatic encephalopathy. Routine INR/platelet normalization before low-risk procedures is not taught.

## Current Canadian source refresh

Reviewed on 2026-08-11:

- Canadian Association of Gastroenterology guideline library and current clinical-practice resources, including dyspepsia, IBS, IBD, dysphagia and upper-GI guidance.
- Choosing Wisely Canada Gastroenterology recommendations, last updated July 2025: confirm PPI indication/lowest effective dose, avoid low-value dyspepsia imaging/endoscopy in low-risk patients.
- Public Health Agency of Canada — Hepatitis C for health professionals, updated 2025-12-02: reactive antibody requires RNA to diagnose current infection; current infection is curable with DAA therapy.
- Public Health Agency of Canada — Hepatitis B for health professionals, updated 2025-12-02: HBV serology/DNA and specialist assessment guide treatment; pregnancy and other special populations require tailored care.
- CASL/AMMI — 2025 chronic hepatitis B guideline update.
- CASL/current Canadian hepatology practice for cirrhosis and steatotic liver disease.

## Quality gates

- Required Cram fields: PASS by editorial review.
- Exact canonical identity: PASS.
- Canadian/SI framing: PASS.
- Current terminology without breaking canonical identity: PASS.
- Generic repeated assessment/intervention text: none.
- Distinct cannot-miss differential and disposition logic: present.
- Medication safety and red flags: present for all 10.
- Clinical second-pass status: PASS.

## Publication boundary

This certifies **clinical authoring only**. JSON/required-field parser validation, exact current Full reconciliation, point/Bottom-Line source anchoring, three eligible Quick Checks, shared runtime Cram integrity, learner rendering, merge and deployment remain separate fail-closed gates.
