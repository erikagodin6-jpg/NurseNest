import type { ExamQuestion } from "./types";

export type RnRenalRegion = "CAN" | "US";

export interface RegionalRnRenalQuestion extends ExamQuestion {
  regionScope: RnRenalRegion;
  countryCode: "CA" | "US";
  licensingBody: "NCSBN";
  topic: string;
  difficulty: 2 | 3 | 4;
  cognitiveLevel: "application" | "analysis";
  sourceFamily: string;
}

// Renal bedside physiology is largely shared. These items are intentionally scoped
// to national unit/reporting conventions or country-specific implementation context.
export const rnRenalRegionalBankBatch1Questions: RegionalRnRenalQuestion[] = [
  // ==================== CANADA ====================
  {
    q: "A Canadian CKD report lists urine albumin-to-creatinine ratio as 18 mg/mmol. How should the RN classify this using standard KDIGO albuminuria categories commonly used in Canada?",
    o: ["A2, moderately increased albuminuria", "A1, normal to mildly increased", "A3, severely increased", "The value cannot be interpreted in Canadian units"],
    a: 0,
    r: "In mg/mmol units, A1 is below 3, A2 is 3–30, and A3 is above 30 mg/mmol. An ACR of 18 mg/mmol is therefore A2 and carries clinically relevant kidney and cardiovascular risk.",
    s: "Renal",
    dr: ["A1 is below 3 mg/mmol, so 18 is above that range.", "A3 begins above 30 mg/mmol, so 18 does not meet severe-albuminuria criteria.", "Canadian laboratories commonly report ACR in mg/mmol, which maps directly to KDIGO albuminuria categories."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "CKD Albuminuria — Canadian SI Reporting", difficulty: 3, cognitiveLevel: "application", sourceFamily: "KDIGO_CKD_2024_CAN_SI"
  },
  {
    q: "A Canadian patient's urine ACR is 42 mg/mmol on repeated testing. Which interpretation is correct?",
    o: ["A3, severely increased albuminuria", "A1 albuminuria", "Normal because the value is below 300", "The result is a serum creatinine value"],
    a: 0,
    r: "In Canadian-style mg/mmol reporting, an ACR above 30 mg/mmol is KDIGO A3 (severely increased albuminuria). The 300 threshold applies to mg/g reporting used commonly in U.S. materials.",
    s: "Renal",
    dr: ["A1 is below 3 mg/mmol.", "Confusing mg/mmol with mg/g can lead to a tenfold category error; 42 mg/mmol is clearly A3.", "ACR is a urine albumin-to-creatinine ratio, not serum creatinine."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "CKD Albuminuria — Canadian SI Reporting", difficulty: 3, cognitiveLevel: "analysis", sourceFamily: "KDIGO_CKD_2024_CAN_SI"
  },
  {
    q: "A Canadian renal panel reports serum creatinine as 177 µmol/L. Which nursing principle is most important when comparing this with a U.S. resource?",
    o: ["Recognize that Canadian laboratories commonly use µmol/L, so unit conversion is needed before comparing with mg/dL thresholds", "Assume 177 mg/dL", "Ignore the value because creatinine is not used in Canada", "Treat the numerical value as identical in all unit systems"],
    a: 0,
    r: "Canadian laboratories commonly report creatinine in µmol/L, while U.S. references often use mg/dL. The units must be converted or the eGFR/clinical context used rather than comparing raw numbers.",
    s: "Renal",
    dr: ["Interpreting 177 as mg/dL would be a major unit error.", "Serum creatinine remains a core filtration marker in Canadian kidney care.", "µmol/L and mg/dL values are numerically different and cannot be compared without conversion."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Renal Laboratory Units — Canada", difficulty: 2, cognitiveLevel: "application", sourceFamily: "CAN_RENAL_SI_UNITS"
  },
  {
    q: "A Canadian dialysis patient's hemoglobin is reported as 92 g/L. What should the RN recognize when reading a U.S. source that discusses hemoglobin in g/dL?",
    o: ["92 g/L is 9.2 g/dL; unit conversion is required before comparing targets or thresholds", "92 g/L is 92 g/dL", "Hemoglobin is never used in CKD anemia assessment in Canada", "The value represents serum sodium"],
    a: 0,
    r: "Hemoglobin is commonly reported in g/L in Canada and g/dL in the U.S.; dividing g/L by 10 gives g/dL. Unit literacy prevents major interpretation errors in CKD anemia care.",
    s: "Renal",
    dr: ["Treating the values as numerically identical creates a tenfold error.", "Hemoglobin is central to anemia assessment in Canadian CKD care.", "Hemoglobin is a hematology value, not sodium concentration."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "CKD Anemia Units — Canada", difficulty: 2, cognitiveLevel: "application", sourceFamily: "KDIGO_ANEMIA_2026_CAN_UNITS"
  },
  {
    q: "A Canadian patient sees 'urea 18 mmol/L' on a renal panel and a U.S. study discussing BUN in mg/dL. What should the RN do?",
    o: ["Recognize these are related but differently reported measurements and avoid comparing the raw numbers directly", "Assume urea mmol/L and BUN mg/dL are numerically identical", "Ignore urea because Canadian laboratories do not use it", "Diagnose dialysis need from this number alone"],
    a: 0,
    r: "Canadian laboratories often report serum urea in mmol/L, whereas U.S. sources commonly report blood urea nitrogen in mg/dL. They are related but require conversion and clinical context.",
    s: "Renal",
    dr: ["The raw numeric values use different analytes/units and are not directly interchangeable.", "Urea is routinely used in Canadian renal panels and dialysis assessment.", "Kidney-replacement decisions depend on symptoms/complications and overall kidney status, not one urea value alone."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Renal Laboratory Units — Canada", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CAN_RENAL_SI_UNITS"
  },
  {
    q: "A Canadian CKD patient has eGFR 52 mL/min/1.73 m² and persistent urine ACR 12 mg/mmol for more than 3 months. Which interpretation is correct?",
    o: ["The patient meets CKD criteria because reduced eGFR and persistent A2 albuminuria both indicate chronic kidney disease", "CKD is excluded because eGFR is above 30", "ACR 12 mg/mmol is normal", "CKD requires dialysis"],
    a: 0,
    r: "CKD is defined by abnormalities of kidney structure/function present for at least 3 months. An eGFR below 60 and persistent albuminuria both support the diagnosis; dialysis is not required to define CKD.",
    s: "Renal",
    dr: ["CKD can be present at eGFR 52 and does not require GFR below 30.", "An ACR of 12 mg/mmol is A2, not normal/A1.", "Dialysis is a treatment for selected kidney failure, not a diagnostic criterion for CKD."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "CKD Classification — Canada", difficulty: 3, cognitiveLevel: "analysis", sourceFamily: "KDIGO_CKD_2024_CAN_SI"
  },
  {
    q: "A Canadian RN is reviewing a Kidney Paired Donation option with a transplant candidate whose willing living donor is incompatible. What is the core concept?",
    o: ["The incompatible donor-recipient pair may be matched through a national exchange with other pairs to enable compatible living-donor transplants", "The donor must be discarded from consideration permanently", "Paired donation means two kidneys are transplanted into one recipient", "The program is a form of peritoneal dialysis"],
    a: 0,
    r: "Canada's Kidney Paired Donation program allows incompatible donor-recipient pairs to participate in exchanges so compatible living-donor chains or swaps can be created across the country.",
    s: "Renal",
    dr: ["Incompatibility with one intended recipient does not necessarily end living donation options.", "Paired donation matches donors to different compatible recipients; it does not transplant two kidneys into one person as the defining concept.", "KPD is a transplant-matching program, not a dialysis modality."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Kidney Transplantation — Canada", difficulty: 2, cognitiveLevel: "application", sourceFamily: "CAN_KIDNEY_PAIRED_DONATION"
  },
  {
    q: "A Canadian patient with CKD reads a U.S. handout that labels ACR 30 mg/g as abnormal. Which Canadian unit is approximately the corresponding A2 threshold?",
    o: ["About 3 mg/mmol", "About 30 mg/mmol", "About 300 mg/mmol", "About 0.03 mg/mmol"],
    a: 0,
    r: "The KDIGO A2 threshold is approximately 30 mg/g in U.S. units or 3 mg/mmol in SI-style reporting. Recognizing the unit pair prevents category errors.",
    s: "Renal",
    dr: ["30 mg/mmol corresponds approximately to the A3 threshold, not the start of A2.", "300 mg/mmol is far above the standard category boundary.", "0.03 mg/mmol is well below the A2 threshold."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "CKD Albuminuria Unit Conversion — Canada", difficulty: 3, cognitiveLevel: "application", sourceFamily: "KDIGO_CKD_2024_CAN_SI"
  },
  {
    q: "A Canadian patient with CKD asks whether eGFR alone is enough to assess kidney risk. Which response best reflects modern Canadian/KDIGO practice?",
    o: ["No; eGFR and urine albumin-to-creatinine ratio provide complementary risk information", "Yes; urine albumin is never needed", "Only serum urea matters", "Kidney risk is assessed only after dialysis starts"],
    a: 0,
    r: "Modern CKD classification and risk stratification use both GFR category and albuminuria category because each adds prognostic information.",
    s: "Renal",
    dr: ["Albuminuria can reveal important kidney damage even with preserved eGFR.", "Urea alone does not stage chronic kidney disease risk.", "Risk assessment begins long before kidney failure or dialysis."] },
  {
    q: "A Canadian RN sees 'renal' and 'kidney' used interchangeably in older learning resources. Which terminology is preferred in modern patient-centred kidney guidance?",
    o: ["Use clear kidney-focused language with patients while recognizing older clinical terms such as renal may still appear", "Renal and kidney refer to different organs", "The term kidney is prohibited in Canada", "Only Latin terminology should be used"],
    a: 0,
    r: "Modern kidney organizations increasingly favor plain-language 'kidney' terminology for patient communication, while clinicians still encounter established terms such as renal failure, renal replacement, and nephrology.",
    s: "Renal",
    dr: ["Renal means relating to the kidney; it is not a different organ.", "Kidney is standard patient-facing terminology in Canada.", "Plain language improves health communication and Latin-only wording is not required."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Kidney Terminology — Canada", difficulty: 2, cognitiveLevel: "application", sourceFamily: "KIDNEY_FOUNDATION_CANADA"
  },

  // ==================== UNITED STATES ====================
  {
    q: "A U.S. CKD report lists urine albumin-to-creatinine ratio as 145 mg/g. How should the RN classify this using KDIGO/NKF categories?",
    o: ["A2, moderately increased albuminuria", "A1, normal to mildly increased", "A3, severely increased", "The result cannot be used in the U.S."],
    a: 0,
    r: "In mg/g units commonly used by U.S. laboratories, A1 is below 30, A2 is 30–300, and A3 is above 300 mg/g. A uACR of 145 mg/g is A2.",
    s: "Renal",
    dr: ["A1 is below 30 mg/g, so 145 exceeds that category.", "A3 begins above 300 mg/g, so 145 is not severely increased.", "The National Kidney Foundation specifically promotes uACR reporting in mg/g in U.S. laboratories."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "CKD Albuminuria — U.S. Reporting", difficulty: 3, cognitiveLevel: "application", sourceFamily: "NKF_UACR_US"
  },
  {
    q: "A U.S. patient has repeated uACR results of 420 mg/g. Which category is correct?",
    o: ["A3, severely increased albuminuria", "A1", "A2 because all values below 1000 are moderate", "Normal"],
    a: 0,
    r: "U.S. mg/g reporting uses A3 for uACR above 300 mg/g. Persistent A3 albuminuria indicates high kidney and cardiovascular risk and warrants appropriate evaluation/therapy.",
    s: "Renal",
    dr: ["A1 is below 30 mg/g.", "A2 spans 30–300 mg/g, so 420 exceeds it.", "A persistent value of 420 mg/g is not normal."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "CKD Albuminuria — U.S. Reporting", difficulty: 3, cognitiveLevel: "application", sourceFamily: "NKF_UACR_US"
  },
  {
    q: "A U.S. renal panel reports creatinine 2.0 mg/dL. Which nursing principle is important when comparing it with a Canadian source?",
    o: ["Canadian sources commonly use µmol/L, so the raw number cannot be compared without unit conversion", "2.0 mg/dL is identical to 2.0 µmol/L", "Creatinine is not used in Canada", "The result is a urine ACR"],
    a: 0,
    r: "U.S. laboratories commonly report serum creatinine in mg/dL while Canadian laboratories commonly use µmol/L. Cross-border resources require unit awareness.",
    s: "Renal",
    dr: ["The unit systems have very different numerical scales.", "Creatinine remains a standard kidney marker in Canada.", "Serum creatinine and urine albumin-creatinine ratio are different tests."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Renal Laboratory Units — U.S.", difficulty: 2, cognitiveLevel: "application", sourceFamily: "US_RENAL_CONVENTIONAL_UNITS"
  },
  {
    q: "A U.S. CKD patient's hemoglobin is 9.4 g/dL. Which nursing interpretation is correct when reading an international source that reports g/L?",
    o: ["9.4 g/dL corresponds to 94 g/L", "9.4 g/dL corresponds to 9.4 g/L", "Hemoglobin is not used in CKD anemia", "The value is serum potassium"],
    a: 0,
    r: "U.S. laboratories commonly report hemoglobin in g/dL; multiplying by 10 gives g/L. Accurate unit conversion is essential when applying anemia guidance.",
    s: "Renal",
    dr: ["Failing to convert creates a tenfold error.", "Hemoglobin remains central to CKD anemia diagnosis and treatment decisions.", "Hemoglobin is a blood concentration of red-cell protein, not potassium."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "CKD Anemia Units — U.S.", difficulty: 2, cognitiveLevel: "application", sourceFamily: "KDIGO_ANEMIA_2026_US_UNITS"
  },
  {
    q: "A U.S. laboratory reports uACR as 24 mg/g and eGFR 72 mL/min/1.73 m² with no other kidney-damage markers. Which statement is correct?",
    o: ["These values alone do not meet CKD criteria because G1/G2 require another persistent marker of kidney damage", "Every eGFR below 90 is CKD", "uACR 24 mg/g is A3", "Dialysis should begin"],
    a: 0,
    r: "In the absence of another chronic kidney-damage marker, G1/G2 eGFR values do not by themselves define CKD. A uACR below 30 mg/g is A1.",
    s: "Renal",
    dr: ["GFR category G2 alone is not diagnostic of CKD without persistent kidney damage.", "A3 is above 300 mg/g.", "These results do not indicate kidney failure or emergency dialysis."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "CKD Classification — U.S.", difficulty: 3, cognitiveLevel: "analysis", sourceFamily: "NKF_CKD_CLASSIFICATION"
  },
  {
    q: "What is a central concept of the U.S. KDOQI ESKD Life-Plan approach to vascular access?",
    o: ["Plan dialysis modality and access around the individual patient's goals, expected course, vessels, and future options rather than using a single access rule for everyone", "Every patient must receive a fistula immediately regardless of circumstances", "Long-term catheters are preferred for all patients", "Vascular access is chosen without patient input"],
    a: 0,
    r: "The KDOQI vascular-access guideline introduced the ESKD Life-Plan to align access decisions with the patient's modality plans, life goals, anatomy, prognosis, and future access preservation.",
    s: "Renal",
    dr: ["KDOQI moved away from a one-size-fits-all 'fistula first' rule toward individualized planning.", "Catheters carry important infection/thrombosis risks and are not universally preferred.", "Patient goals and shared decision-making are central to the Life-Plan concept."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Vascular Access — U.S. KDOQI Life-Plan", difficulty: 3, cognitiveLevel: "application", sourceFamily: "KDOQI_VASCULAR_ACCESS_2019"
  },
  {
    q: "A U.S. RN caring for an advanced CKD patient sees an order for an unnecessary PICC. Why should vessel preservation be considered?",
    o: ["Upper-extremity venous injury or stenosis can compromise future hemodialysis access options", "PICC lines improve fistula maturation", "CKD eliminates the need for future vascular access", "PICC lines cannot thrombose"],
    a: 0,
    r: "KDOQI vascular-access planning emphasizes preservation of vessels that may be needed for future dialysis. PICCs can cause thrombosis/stenosis and should be thoughtfully reviewed in patients likely to need hemodialysis access.",
    s: "Renal",
    dr: ["Venous injury can impair future fistula/graft creation rather than improving it.", "Progressive CKD can increase the likelihood of needing kidney replacement and vascular access.", "PICCs can cause upper-extremity thrombosis and central venous stenosis."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Vessel Preservation — U.S. KDOQI", difficulty: 3, cognitiveLevel: "application", sourceFamily: "KDOQI_VASCULAR_ACCESS_2019"
  },
  {
    q: "Which two tests does the U.S. National Kidney Foundation emphasize as complementary for detecting and staging CKD?",
    o: ["eGFR and urine albumin-to-creatinine ratio", "Urine culture and chest x-ray", "Troponin and BNP", "Amylase and lipase"],
    a: 0,
    r: "The NKF laboratory initiative emphasizes eGFR for filtration and uACR for albumin leakage because the two tests provide complementary information about kidney function and damage.",
    s: "Renal",
    dr: ["Urine culture evaluates infection and chest imaging does not stage CKD.", "Troponin/BNP are primarily cardiac biomarkers.", "Amylase/lipase evaluate pancreatic disease rather than CKD risk."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "CKD Screening — U.S. NKF", difficulty: 2, cognitiveLevel: "application", sourceFamily: "NKF_LAB_ENGAGEMENT"
  },
  {
    q: "A U.S. patient asks why race is no longer entered into the recommended adult CKD-EPI creatinine equation used by many laboratories. Which response is best?",
    o: ["Current U.S. recommendations use a race-free eGFR equation rather than applying a race coefficient", "Race directly measures nephron number", "The race coefficient is still mandatory in every U.S. laboratory", "eGFR is no longer calculated"],
    a: 0,
    r: "U.S. kidney organizations recommended implementation of the 2021 CKD-EPI race-free creatinine equation to estimate GFR without a race coefficient.",
    s: "Renal",
    dr: ["Race is a social construct and does not directly quantify nephron number or filtration.", "The contemporary recommendation specifically removes the race coefficient.", "eGFR remains a standard kidney-function estimate."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "eGFR Reporting — U.S. Race-Free Equation", difficulty: 3, cognitiveLevel: "application", sourceFamily: "NKF_ASN_CKD_EPI_2021"
  },
  {
    q: "A U.S. renal educator still teaches 'fistula first, catheter last' as an absolute rule for every patient. Which current KDOQI concept should the RN apply?",
    o: ["Access decisions should be individualized through the ESKD Life-Plan rather than treated as a universal slogan", "The slogan is absolute for every age, prognosis, and modality", "Catheters have no complications", "Patients should not participate in access choice"],
    a: 0,
    r: "KDOQI's current vascular-access framework prioritizes the right access for the right patient at the right time, preserving future options and aligning with the ESKD Life-Plan rather than a universal fistula mandate.",
    s: "Renal",
    dr: ["Anatomy, maturation probability, treatment goals, urgency, and life expectancy can change the best access choice.", "Catheters carry major infection and vascular risks.", "Shared decision-making is integral to patient-centred access planning."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Vascular Access — U.S. KDOQI Life-Plan", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "KDOQI_VASCULAR_ACCESS_2019"
  }
];
