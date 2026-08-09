# CNPLE Cram V2 — Parity Batch 44B Clinical Second Pass

Date: 2026-08-09
Scope: `44b-dermatology-cancer-allergy-emergency-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-skin-cancer-screening-and-recognition`
- `np-melanoma-recognition-and-referral`
- `np-basal-cell-carcinoma-management`
- `np-squamous-cell-carcinoma-management`
- `np-actinic-keratosis-treatment`
- `np-pigmented-lesion-evaluation`
- `np-urticaria-and-angioedema-management`
- `np-drug-eruptions-recognition-and-management`
- `np-autoimmune-blistering-disorders-recognition`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Skin cancer / melanoma
PASS. Screening is separated from diagnostic assessment of a symptomatic/changing lesion. Melanoma recognition includes ABCDE/evolution, ugly-duckling, amelanotic and acral/subungual presentations, with biopsy strategy preserving tumour depth when feasible.

### BCC / SCC / actinic keratosis
PASS. BCC is treated despite low metastatic risk because local destruction progresses. SCC high-risk features and immunosuppression lower the referral threshold. Actinic keratosis is treated as premalignant field disease, while induration, tenderness, ulceration or rapid growth trigger biopsy for SCC.

### Pigmented lesions
PASS. Evolution and comparison with the patient's other lesions drive risk assessment. Dermoscopy supports but does not replace histology when melanoma remains plausible; destructive treatment before diagnosis is rejected.

### Urticaria / angioedema
PASS. Airway/anaphylaxis assessment comes first. IM epinephrine is not delayed for antihistamines/corticosteroids. Histaminergic urticaria is separated from ACE-inhibitor/bradykinin angioedema, and broad allergy testing is rejected for uncomplicated chronic spontaneous urticaria.

### Drug eruptions
PASS. Morbilliform exanthem is separated from SJS/TEN, DRESS and other SCAR. Mucosal disease, skin pain, blistering/detachment, facial edema, fever and organ injury mandate immediate culprit-drug cessation and urgent care. Severe reactions are documented by phenotype rather than as a vague 'rash'.

### Autoimmune blistering disease
PASS. Bullous pemphigoid and pemphigus patterns are distinguished from SCAR/infection. Correct biopsy strategy includes lesional tissue for histology and perilesional tissue for direct immunofluorescence; extensive mucosal/ocular/skin loss is urgent.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Dermatology Association melanoma, basal cell carcinoma, squamous cell carcinoma, actinic keratosis and skin-check resources.
- Health Canada safety communications recognizing severe cutaneous adverse reactions including SJS/TEN and DRESS.
- Canadian dermatology/allergy practice principles for urticaria, angioedema and autoimmune blistering disorders.

## Authoring gates

- Required Cram fields: present in all nine.
- Canadian/SI framing: PASS.
- Screening vs diagnosis separation: PASS.
- Severe skin-reaction/anaphylaxis escalation: PASS.
- Unsupported universal cancer/procedure thresholds: none.

## Publication boundary

Clinical authoring second pass only. Manifest registration, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
