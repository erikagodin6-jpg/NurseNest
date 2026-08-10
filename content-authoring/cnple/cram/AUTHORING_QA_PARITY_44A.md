# CNPLE Cram V2 — Parity Batch 44A Clinical Second Pass

Date: 2026-08-09
Scope: `44a-gastrointestinal-upper-lower-liver-parity.json`
Result: **PASS — Canadian clinical authoring second pass**

## Exact identity contract
- `np-gastroesophageal-reflux-disease-diagnosis-and-management`
- `np-peptic-ulcer-disease-and-h-pylori-management`
- `np-dyspepsia-evaluation-and-management`
- `np-inflammatory-bowel-disease-diagnosis-and-management`
- `np-irritable-bowel-syndrome-diagnosis-and-management`
- `np-celiac-disease-diagnosis-and-management`
- `np-hepatitis-b-and-c-evaluation-and-treatment`

All IDs are literal canonical slugs emitted by the NP parity generator.

## Clinical review
- GERD: PASS. Typical uncomplicated reflux can be managed clinically; dysphagia, bleeding/anemia, weight loss, vomiting and refractory/atypical disease trigger structural or alternate-diagnosis evaluation.
- PUD/H. pylori: PASS. Active infection testing and post-treatment eradication confirmation are explicit. No obsolete universal triple-therapy regimen is hard-coded; treatment is current-regimen/resistance/history aware.
- Dyspepsia: PASS. Low-risk uninvestigated dyspepsia uses H. pylori and/or PPI strategy before routine endoscopy; alarm/high-risk presentations change the threshold.
- IBD: PASS. Objective inflammation, extent and complications drive care. Infectious mimics are excluded before escalating immunosuppression; systemic corticosteroids are not maintenance therapy.
- IBS: PASS. Uses a positive gut-brain-interaction diagnosis plus alarm-feature safety check; avoids both endless testing and mislabelling bleeding/anemia/weight loss as IBS.
- Celiac: PASS. Diagnostic testing occurs while gluten is being consumed; total IgA context and adult biopsy pathway are preserved; gluten-free treatment is lifelong only after appropriate confirmation.
- HBV/HCV: PASS. HBV is phase/DNA/ALT/fibrosis driven; HCV antibody is not active infection and requires HCV RNA confirmation. Current CASL/AMMI HBV and Canadian HCV treatment principles are reflected.

## Canadian source refresh
Rechecked 2026-08-09 against Canadian Association of Gastroenterology guideline resources, ACG/CAG dyspepsia guidance, Choosing Wisely Canada Gastroenterology recommendations, CASL/AMMI 2025 hepatitis B guidance, PHAC/CASL hepatitis C resources, Celiac Canada and Crohn's and Colitis Canada clinical resources.

## Publication boundary
Clinical authoring PASS only. Global parse/count/ID validation, exact-current-Full reconciliation, Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain downstream fail-closed gates.
