# CNPLE Cram V2 — Parity Batch 41A Clinical Second Pass

Date: 2026-08-09
Scope: `41a-diagnostics-imaging-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-ecg-interpretation-fundamentals`
- `np-chest-x-ray-interpretation`
- `np-abdominal-imaging-selection`
- `np-musculoskeletal-imaging-selection`
- `np-neuroimaging-indications-and-interpretation`
- `np-ultrasound-in-primary-care`
- `np-ct-indications-and-contraindications`
- `np-mri-indications-and-contraindications`

## Clinical review

- ECG: systematic interpretation + clinical context; machine interpretation is non-authoritative.
- Chest x-ray: projection/quality and modality limitations are explicit; normal film does not rule out PE/ACS.
- Abdominal imaging: modality selected by differential, urgency, pregnancy and management question.
- MSK imaging: early MRI/CT avoided for uncomplicated presentations; red flags and neurovascular compromise drive urgency.
- Neuroimaging: CT/CTA/MRI chosen by syndrome/timing; stable migraine and uncomplicated syncope are protected from routine imaging.
- Ultrasound/POCUS: focused-question role and blind spots are explicit; formal imaging remains necessary when the clinical question exceeds POCUS scope.
- CT: ionizing radiation and iodinated contrast risk are balanced against urgency; pregnancy is not treated as an absolute prohibition when CT is required.
- MRI: implant/device conditionality, gadolinium/renal/pregnancy context, scan tolerance and time-critical CT alternatives are explicit.

## Canadian source refresh

Rechecked 2026-08-09 against Canadian Association of Radiologists Referral Guidelines, CAR Practice Guidelines/Resource Library including 2026 MRI-pregnancy guidance, CAR/CSACI contrast-media guidance, Choosing Wisely Canada Radiology recommendations updated June 2026, and Canadian Stroke Best Practices for acute neurovascular imaging.

## Publication boundary

Clinical authoring PASS only. Global parse/count/ID validation, exact current Full identity, source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner render QA, merge and deployment remain downstream fail-closed gates.
