# CNPLE Cram V2 — Acute Stroke Exact-Identity Clinical Second Pass

Date: 2026-08-09
Scope: `46b-neurology-stroke-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity

- `np-stroke-acute-management-and-secondary-prevention`

This is the literal canonical NP parity-generator identity for the acute-stroke concept and is intentionally distinct from the separate TIA and combined historical stroke/TIA Cram objects.

## Clinical audit

PASS. The lesson:

- treats a new disabling focal deficit as a code-stroke/EMS emergency and captures last-known-well, glucose, baseline function and anticoagulant timing without delaying imaging;
- separates ischemic from hemorrhagic stroke before antithrombotic therapy;
- uses immediate brain + vascular imaging for reperfusion selection and preserves current Canadian tissue-/imaging-based EVT selection, including the 2025 EVT interim update;
- does not wait for thrombolysis response before proceeding with EVT preparation when both are indicated;
- preserves swallow/complication/stroke-unit care after the initial reperfusion decision;
- avoids antiplatelet therapy during the first 24 hours after IV thrombolysis until follow-up imaging excludes secondary hemorrhage;
- makes secondary prevention mechanism-specific rather than a generic medication list: antiplatelet vs anticoagulation, vascular intervention, rhythm assessment and vascular-risk management are selected from etiology;
- keeps pregnancy/postpartum, anticoagulation, posterior-circulation and deterioration red flags explicit.

## Current Canadian source refresh

Load-bearing sources rechecked 2026-08-09:

- Canadian Stroke Best Practices, **Acute Stroke Management, 7th Edition**.
- Canadian Stroke Best Practices, **Endovascular Thrombectomy for Acute Ischemic Stroke — Interim Update 2025**.
- Canadian Stroke Best Practices, **Acute Antithrombotic Therapy** and **Secondary Prevention of Stroke**.

## Publication boundary

Clinical authoring second pass only. Structural/global-ID validation, exact current Full-source anchoring, Bottom Line evidence, exactly three eligible lesson-linked Quick Checks, runtime recipe integrity, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
