# CNPLE Cram V2 — Parity Batch 44A Clinical Second Pass

Date: 2026-08-09
Scope: `42a-gi-hepatology-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-celiac-disease-diagnosis-and-management`
- `np-alcoholic-liver-disease-evaluation`
- `np-hepatic-encephalopathy-recognition-and-treatment`
- `np-colorectal-polyp-follow-up-guidelines`
- `np-dysphagia-evaluation-and-management`
- `np-hemorrhoids-and-anorectal-disorders`
- `np-tumor-marker-interpretation-in-gi-disease`
- `np-chronic-constipation-evaluation-and-management`

All IDs are literal canonical NP parity-generator slugs.

## Clinical review

### Celiac disease
PASS. Testing occurs while consuming gluten, IgA deficiency is handled appropriately and diet begins after diagnostic confirmation/pathway planning.

### Alcohol-associated liver disease
PASS. Current alcohol exposure, withdrawal risk, AUD treatment and liver severity/complications are managed together. Alcohol is not used to prematurely close the differential.

### Hepatic encephalopathy
PASS. HE is a clinical diagnosis with precipitant search. Serum ammonia is explicitly rejected for diagnosis/staging/serial treatment response in established chronic liver disease. Overaggressive lactulose/dehydration risk is explicit.

### Colorectal-polyp surveillance
PASS. Pathology, number, size, dysplasia, resection completeness and colonoscopy quality determine surveillance. Screening and surveillance intervals are not conflated.

### Dysphagia
PASS. Oropharyngeal vs esophageal localization precedes workup; progressive/alarm esophageal dysphagia and complete obstruction trigger urgent pathways.

### Hemorrhoids/anorectal disease
PASS. Visible hemorrhoids do not automatically explain rectal bleeding. Fissure, abscess, IBD and malignancy remain in the differential and abscess requires drainage rather than hemorrhoid therapy.

### GI tumour markers
PASS. CEA/CA19-9/AFP are not population screening tests or stand-alone cancer diagnoses. Trends are used only in validated disease-specific pathways with imaging/pathology context.

### Chronic constipation
PASS. Medication/secondary causes and alarm features are assessed first; colonoscopy/broad labs are not routine for uncomplicated functional constipation; refractory outlet symptoms trigger pelvic-floor evaluation.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Association of Gastroenterology guideline library, including esophageal dysphagia and colorectal guidance.
- Canadian Association for the Study of the Liver resources.
- Choosing Wisely Canada Hepatology recommendations, including the recommendation not to use serum ammonia to diagnose/manage HE.
- Provincial colorectal screening/surveillance pathways and Cancer Care Ontario disease pathways where applicable.

## Authoring gates

- Required Cram fields: present in all eight records.
- Canadian/SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Unsupported universal colonoscopy/tumour-marker thresholds: none.
- Red flags/escalation: present in all eight.
- Specialist/local-program boundaries: explicit where relevant.

## Publication boundary

Clinical authoring second pass only. Structural parsing, exact current Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
