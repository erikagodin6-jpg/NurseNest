# CNPLE Cram V2 — Parity Batch 42B Clinical Second Pass

Date: 2026-08-09
Scope: `42b-gi-core-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-gastroesophageal-reflux-disease-diagnosis-and-management`
- `np-peptic-ulcer-disease-and-h-pylori-management`
- `np-dyspepsia-evaluation-and-management`
- `np-inflammatory-bowel-disease-diagnosis-and-management`
- `np-irritable-bowel-syndrome-diagnosis-and-management`
- `np-hepatitis-b-and-c-evaluation-and-treatment`
- `np-nonalcoholic-fatty-liver-disease-management`
- `np-cirrhosis-complications-management`
- `np-pancreatitis-diagnosis-and-management`

All IDs are literal `np-${slugify(concept)}` outputs from the canonical NP parity generator.

## Clinical second-pass findings

- GERD: uncomplicated typical disease can be managed clinically, while dysphagia, bleeding, anemia, weight loss and refractory/atypical symptoms move to investigation.
- Peptic ulcer/H. pylori: H. pylori cure must be confirmed; symptom improvement is not proof of eradication.
- Dyspepsia: H. pylori/alarm-feature pathway is kept distinct from uncomplicated GERD.
- IBD: infection and objective inflammation are reassessed before escalating immunosuppression.
- IBS: positive symptom-based diagnosis is supported without indiscriminate testing, while alarm features reopen the differential.
- HBV/HCV: HCV RNA confirms active infection; HBV serology/DNA/ALT are interpreted as a pattern with fibrosis and special-population context.
- MASLD: fibrosis and cardiovascular/metabolic risk drive management; normal aminotransferases do not exclude advanced disease.
- Cirrhosis: decompensation, renal dysfunction, infection, bleeding and surveillance drive care; ammonia/INR alone do not define severity or management.
- Pancreatitis: diagnosis uses the accepted multi-criterion syndrome; early care is supportive/cause-directed and prophylactic antibiotics are not routine for sterile disease.

## Canadian source refresh

Rechecked 2026-08-09 against the Canadian Association of Gastroenterology guideline library and dyspepsia/GERD pathways, PHAC hepatitis C resources, CASL/AMMI hepatitis B guidance, Choosing Wisely Canada hepatology recommendations, and current Canadian hepatology/pancreatitis practice principles.

## Publication boundary

Clinical authoring PASS only. Structural/global uniqueness, exact-current-Full reconciliation, point and Bottom-Line anchors, three eligible Quick Checks, runtime integrity and learner rendering remain downstream fail-closed gates.
