# CNPLE Cram V2 — Diagnostics Parity Batch 40 Clinical Second Pass

Date: 2026-08-09
Scope: `40a-diagnostics-core-parity.json` through `40d-diagnostics-immunology-genetics-parity.json`
Result: **PASS — clinical authoring second pass**

## Coverage

All 26 canonical concepts emitted by the NP parity generator's Diagnostics system are now represented by exact Full-lesson IDs. The batch covers:

- CBC, comprehensive metabolic, lipid, thyroid, liver, cardiac biomarker, tumour marker and inflammatory marker interpretation;
- coagulation studies, urinalysis, ABG, ECG, chest X-ray, abdominal/MSK/neuro imaging selection;
- primary-care ultrasound, CT, MRI and nuclear-medicine selection;
- screening-test interpretation, sensitivity/specificity, point-of-care testing and microbiology interpretation;
- immunology testing and genetic-testing considerations.

## Clinical gates

### Laboratory interpretation
PASS. Panel results are decomposed into the physiologic problem they actually measure. Single abnormal values do not become diagnoses. Serial trends, baseline values, pretest probability and clinical severity determine action.

### Coagulation
PASS. INR is preserved for vitamin-K antagonist management; aPTT is laboratory/protocol specific for UFH; routine PT/INR/aPTT are not used as quantitative DOAC levels. Major bleeding management remains time-critical and drug-specific.

### Urinalysis / microbiology
PASS. Positive urine or culture results do not create infection without a compatible syndrome. Asymptomatic bacteriuria treatment is rejected outside accepted exceptions. Sterile-site, colonized-site, culture, NAAT, antigen and serology signals are distinguished.

### ABG / ECG / cardiac biomarkers
PASS. ABGs require primary-process plus compensation reasoning; near-normal pH can hide mixed disorders. ECG machine interpretation is not authoritative. Troponin means myocardial injury until the clinical syndrome determines the cause; BNP/NT-proBNP is not a stand-alone heart-failure diagnosis.

### Imaging
PASS. CT/MRI/ultrasound/nuclear medicine are chosen by the question and urgency. Uncomplicated headache, simple syncope and low-back pain are not reflexively imaged without red flags. Pediatric/pregnancy radiation considerations are preserved without delaying time-critical imaging.

### Screening / diagnostic-test performance
PASS. Screening is separated from symptomatic diagnosis. Sensitivity/specificity are interpreted through pretest probability; predictive values are not treated as fixed across populations.

### POC testing
PASS. Speed does not remove QC, specimen, analytic-range or confirmation requirements.

### Immunology
PASS. Clinical phenotype precedes antibody testing. Broad autoimmune panels for nonspecific symptoms and food-specific IgG testing are rejected; sensitization is not synonymous with clinical allergy.

### Genetics
PASS. Testing requires a defined question, informed decision-making and a plan for positive/negative/uncertain/incidental results. Variants of uncertain significance are not managed as confirmed pathogenic variants, and direct-to-consumer high-stakes findings require clinical confirmation.

## Current Canadian source anchors rechecked

- Choosing Wisely Canada Radiology, Spine, Internal Medicine, Emergency Medicine, Medical Microbiology, Family Medicine, Allergy & Clinical Immunology and laboratory stewardship recommendations.
- Thrombosis Canada DOAC/coagulation testing and bleeding guidance.
- Canadian Cardiovascular Society ACS/heart-failure/rhythm guidance.
- BC thyroid and liver-chemistry guidance.
- Canadian Association of Genetic Counsellors resources.

## Publication boundary

This PASS certifies clinical authoring only. Manifest registration remains ordered behind predecessor parity batches. Private-core still must prove exact current Full identity, structural JSON/required fields, Full-source anchors for every point and Bottom Line, exactly three eligible lesson-linked Quick Checks, shared Cram integrity certification and learner Full/Cram rendering before publication.
