# CNPLE Cram V2 — Parity Batch 42C Clinical Second Pass

Date: 2026-08-09
Scope: `42c-gi-diagnostics-nutrition-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-gallbladder-disease-evaluation-and-management`
- `np-colorectal-cancer-screening-and-surveillance`
- `np-chronic-diarrhea-workup`
- `np-gi-bleeding-evaluation-and-management`
- `np-abdominal-pain-diagnostic-approach`
- `np-liver-function-test-interpretation-in-gi-disease`
- `np-endoscopy-indications-and-follow-up`
- `np-nutritional-assessment-and-supplementation`
- `np-short-bowel-syndrome-management`

All IDs are literal canonical NP parity-generator slugs.

## Clinical second-pass findings

- Gallbladder disease: syndrome is split into biliary colic, cholecystitis, duct obstruction/cholangitis and gallstone pancreatitis; incidental stones are not treated automatically.
- Colorectal screening: screening is restricted to asymptomatic risk-based programs; bleeding, iron-deficiency anemia, weight loss and bowel-change symptoms use a diagnostic pathway instead of screening FIT.
- Chronic diarrhea: watery/fatty/inflammatory pattern and alarm features drive targeted testing; IBS is not used to explain objective inflammatory or nocturnal/red-flag disease.
- GI bleeding: hemodynamic stabilization and ongoing-loss assessment precede source localization; the first hemoglobin is not used to rule out severe acute hemorrhage.
- Abdominal pain: disposition and time-sensitive surgical/vascular/pregnancy causes precede diagnostic perfection; analgesia is not withheld to preserve examination findings.
- Liver tests: hepatocellular injury, cholestasis and synthetic function remain separate interpretive axes.
- Endoscopy: indication is tied to a management-changing clinical question, and pathology/polyp/surveillance ownership is explicit.
- Nutrition: albumin is not treated as a stand-alone nutrition diagnosis and supplement testing/replacement is cause-directed.
- Short bowel syndrome: remaining anatomy, output, hydration/electrolyte losses and intestinal-failure status determine therapy; high-output patients are not told simply to drink unrestricted hypotonic water.

## Canadian source refresh

Rechecked 2026-08-09 against Ontario Health ColonCancerCheck 2026 changes, Choosing Wisely Canada Gastroenterology/Medical Biochemistry recommendations, Canadian Association of Gastroenterology guideline library/endoscopy resources, and Canadian hepatobiliary, transfusion and clinical-nutrition practice principles.

## Publication boundary

Clinical authoring PASS only. Structural/global uniqueness, exact-current-Full reconciliation, point and Bottom-Line source anchors, three eligible Quick Checks, runtime recipe integrity and learner-render certification remain downstream fail-closed gates.
