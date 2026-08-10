# CNPLE Cram V2 — Parity Batch 44B Clinical Second Pass

Date: 2026-08-09
Scope: `44b-gastrointestinal-hepatopancreatobiliary-screening-parity.json`
Result: **PASS — Canadian clinical authoring second pass**

## Exact identity contract
- `np-nonalcoholic-fatty-liver-disease-management`
- `np-alcoholic-liver-disease-evaluation`
- `np-cirrhosis-complications-management`
- `np-hepatic-encephalopathy-recognition-and-treatment`
- `np-pancreatitis-diagnosis-and-management`
- `np-gallbladder-disease-evaluation-and-management`
- `np-colorectal-cancer-screening-and-surveillance`

Legacy canonical slugs are preserved exactly while learner-facing terminology is current: MASLD replaces NAFLD in copy, and alcohol-associated liver disease replaces stigmatizing legacy wording.

## Clinical review
- MASLD: PASS. Fibrosis risk rather than transaminase height drives prognosis; FIB-4 first-line risk stratification and cardiometabolic management are explicit.
- Alcohol-associated liver disease: PASS. Separates withdrawal safety from liver decompensation and integrates evidence-based AUD care without stigma.
- Cirrhosis: PASS. Ascites, HE, variceal bleeding and jaundice define decompensation; SBP/AKI/portal-hypertension/HCC/transplant needs are explicit.
- Hepatic encephalopathy: PASS. Clinical syndrome plus precipitant search; ammonia is not used as a stand-alone diagnostic or monitoring test; lactulose is titrated without inducing dehydration and rifaximin is used for appropriate recurrence prevention.
- Pancreatitis: PASS. Diagnosis is criteria-based; lipase does not grade severity; goal-directed fluids, early feeding and cause control are emphasized; routine prophylactic antibiotics/early CT are rejected.
- Gallbladder disease: PASS. Biliary colic, cholecystitis, choledocholithiasis and cholangitis are separated; infected obstruction requires urgent source control.
- Colorectal screening: PASS. Screening is separated from symptomatic diagnostic evaluation and higher-risk surveillance. Current 2026 Canadian guidance versus provincial/territorial implementation variability is explicit.

## Canadian source refresh
Rechecked 2026-08-09 against CASL 2026 MASLD/FIB-4 materials; Choosing Wisely Canada Hepatology and Gastroenterology recommendations; Canadian acute pancreatitis/biliary practice; Canadian Cancer Society colorectal screening guidance reviewed March 2026 and provincial/territorial organized program variability.

## Publication boundary
Clinical authoring PASS only. Global parse/count/ID validation, exact-current-Full reconciliation, Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain downstream fail-closed gates.
