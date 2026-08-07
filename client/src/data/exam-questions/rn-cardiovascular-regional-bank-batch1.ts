import type { ExamQuestion } from "./types";

export type RnCardiovascularRegion = "CAN" | "US";

export interface RegionalRnCardiovascularQuestion extends ExamQuestion {
  regionScope: RnCardiovascularRegion;
  countryCode: "CA" | "US";
  licensingBody: "NCSBN";
  topic: string;
  difficulty: 2 | 3 | 4;
  cognitiveLevel: "application" | "analysis";
  sourceFamily: string;
}

// These items are intentionally region-scoped because the expected answer depends
// on a Canadian or U.S. guideline framework. Do not serve them cross-region.
export const rnCardiovascularRegionalBankBatch1Questions: RegionalRnCardiovascularQuestion[] = [
  // ==================== CANADA ====================
  {
    q: "A Canadian RN reviews discharge medications for a clinically stable patient with HFrEF. Which combination best reflects the CCS/CHFS standard four foundational drug classes when there are no contraindications?",
    o: ["ARNI (or ACEI/ARB), evidence-based beta blocker, mineralocorticoid receptor antagonist, and SGLT2 inhibitor", "Loop diuretic, digoxin, aspirin, and nitrate only", "Calcium-channel blocker, fibrate, thiazide, and aspirin", "Warfarin, amiodarone, nitroglycerin, and furosemide for every patient"],
    a: 0,
    r: "Canadian HFrEF guidance identifies four standard therapeutic classes: ARNI (or ACEI/ARB), beta blocker, MRA, and SGLT2 inhibitor, individualized for hemodynamics, renal function, potassium, tolerance, access, and patient factors.",
    s: "Cardiovascular",
    dr: ["These agents can have selected roles but do not represent the CCS four foundational HFrEF classes.", "This combination does not represent the Canadian foundational HFrEF standard and omits mortality-reducing classes.", "Anticoagulation and antiarrhythmics are indication-specific and are not routine four-pillar HFrEF therapy."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Heart Failure — Canadian CCS/CHFS", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CCS_CHFS_HFrEF_2021"
  },
  {
    q: "A Canadian patient with symptomatic HFrEF and no diabetes is prescribed dapagliflozin. Which explanation is most accurate?",
    o: ["SGLT2 inhibitors provide heart-failure benefit even in patients without type 2 diabetes", "The prescription is automatically an error because SGLT2 inhibitors are diabetes drugs only", "The drug is being used only to treat atrial fibrillation", "The medication replaces every other HFrEF therapy"],
    a: 0,
    r: "Canadian HF/cardiorenal guidance supports SGLT2 inhibitors for HFrEF because cardiovascular and HF benefits extend beyond glucose lowering and are seen in patients with and without diabetes.",
    s: "Cardiovascular",
    dr: ["Current HF evidence and CCS guidance extend SGLT2 use beyond diabetes treatment.", "SGLT2 inhibitors are not rhythm-control drugs for AF.", "SGLT2 inhibition is one component of multidrug guideline-directed HFrEF therapy, not a replacement for all other foundational classes."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Heart Failure — Canadian CCS/CHFS", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CCS_CARDIORENAL_2022"
  },
  {
    q: "A 67-year-old Canadian patient has nonvalvular atrial fibrillation and no other CHADS2 risk factors. Under the CCS CHADS-65 approach, what stroke-prevention plan should the RN expect to be considered?",
    o: ["Oral anticoagulation because age is 65 years or older", "No antithrombotic therapy because the CHADS2 score is zero", "Aspirin alone specifically for AF stroke prevention", "No risk assessment is needed until age 75"],
    a: 0,
    r: "The CCS CHADS-65 algorithm recommends oral anticoagulation for most patients with AF who are age 65 years or older, even when no additional CHADS2 risk factor is present.",
    s: "Cardiovascular",
    dr: ["CHADS-65 intentionally uses age 65 as an anticoagulation decision point.", "CCS states antiplatelet therapy has no role as a substitute for OAC specifically for AF-related stroke prevention.", "The Canadian algorithm does not defer stroke-risk assessment until age 75."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Atrial Fibrillation — Canadian CHADS-65", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CCS_AF_2020"
  },
  {
    q: "A 58-year-old Canadian patient with nonvalvular AF has hypertension but no previous stroke, diabetes, or heart failure. How does the CCS CHADS-65 approach affect stroke prevention?",
    o: ["A CHADS2 risk factor supports oral anticoagulation even though the patient is younger than 65", "Age under 65 means anticoagulation can never be used", "Aspirin is preferred to oral anticoagulation for AF-related stroke prevention", "Stroke prevention is not considered until symptoms occur"],
    a: 0,
    r: "Under CHADS-65, patients younger than 65 with a CHADS2 risk factor such as hypertension are generally candidates for oral anticoagulation after individualized bleeding-risk and clinical assessment.",
    s: "Cardiovascular",
    dr: ["The Canadian algorithm uses CHADS2 risk factors as a reason for OAC in younger patients.", "CCS does not prefer antiplatelet therapy over indicated OAC for AF-related stroke prevention.", "AF-related thromboembolic prevention is based on risk, not whether a stroke symptom has already occurred."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Atrial Fibrillation — Canadian CHADS-65", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CCS_AF_2020"
  },
  {
    q: "A 52-year-old Canadian patient has nonvalvular AF, no CHADS2 risk factors, and no coronary or peripheral arterial disease. Which statement best reflects CCS stroke-prevention guidance?",
    o: ["For most such patients, no antithrombotic therapy is recommended solely for AF stroke prevention", "Aspirin is mandatory for every patient with AF", "Warfarin is mandatory regardless of risk", "Dual antiplatelet therapy is preferred to anticoagulation"],
    a: 0,
    r: "CCS recommends no antithrombotic therapy for most NVAF patients younger than 65 with no CHADS2 risk factors; antiplatelet therapy is not used as an AF-stroke-prevention substitute in this low-risk group.",
    s: "Cardiovascular",
    dr: ["CCS explicitly states that antiplatelet therapy has no role solely for AF-related stroke prevention in this low-risk group.", "Routine OAC is not recommended when the Canadian algorithm identifies very low stroke risk.", "DAPT is not the preferred AF-stroke-prevention strategy in this scenario."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Atrial Fibrillation — Canadian CHADS-65", difficulty: 3, cognitiveLevel: "analysis", sourceFamily: "CCS_AF_2020"
  },
  {
    q: "A Canadian patient undergoes cardioversion for atrial fibrillation. In the absence of a strong contraindication, what post-cardioversion anticoagulation principle should the nurse recognize from CCS guidance?",
    o: ["Therapeutic anticoagulation is continued for at least 4 weeks after cardioversion, then ongoing need is reassessed using CHADS-65", "Anticoagulation always stops immediately when sinus rhythm returns", "Only aspirin is used for the first 24 hours", "No anticoagulation is needed after electrical cardioversion"],
    a: 0,
    r: "CCS recommends at least four weeks of therapeutic anticoagulation after cardioversion in the absence of a strong contraindication, with longer-term therapy determined by ongoing stroke risk using CHADS-65.",
    s: "Cardiovascular",
    dr: ["Atrial stunning and thromboembolic risk persist after rhythm restoration; immediate cessation is unsafe as a general rule.", "Aspirin is not an adequate substitute for indicated post-cardioversion OAC.", "The recommendation applies after cardioversion regardless of whether it was electrical or pharmacologic."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Atrial Fibrillation — Canadian Cardioversion", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CCS_AF_2020"
  },
  {
    q: "A Canadian RN sees the term HFnrEF in a 2025 CCS/CHFS care plan. Which patient fits that definition?",
    o: ["A symptomatic heart-failure patient with LVEF greater than 40%", "Any patient with LVEF 30% regardless of symptoms", "Only patients with an EF exactly 50%", "A patient with hypertension but no signs or symptoms of heart failure"],
    a: 0,
    r: "The 2025 CCS/CHFS guideline defines heart failure with non-reduced ejection fraction (HFnrEF) as signs and symptoms of HF with LVEF greater than 40%.",
    s: "Cardiovascular",
    dr: ["An EF of 30% is within the reduced-EF range rather than HFnrEF.", "HFnrEF includes the spectrum above 40%, not only an EF of exactly 50%.", "Heart failure requires a clinical syndrome; hypertension alone without HF signs/symptoms does not meet the definition."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Heart Failure — Canadian HFnrEF 2025", difficulty: 2, cognitiveLevel: "application", sourceFamily: "CCS_CHFS_HFnrEF_2025"
  },
  {
    q: "A Canadian patient with AF is age 70 and also has stable coronary artery disease with no ACS or revascularization in the previous year. Which general CCS principle should the nurse recognize?",
    o: ["Oral anticoagulation alone is generally preferred rather than routinely adding an antiplatelet solely because stable CAD is present", "Triple therapy is routinely continued indefinitely", "Anticoagulation should be stopped because CAD is present", "Aspirin alone replaces anticoagulation for AF stroke prevention"],
    a: 0,
    r: "For AF patients who require OAC and have stable coronary/arterial vascular disease, CCS generally recommends OAC alone because routinely adding antiplatelet therapy increases bleeding without clear net benefit.",
    s: "Cardiovascular",
    dr: ["Long-term triple therapy markedly increases bleeding and is not the routine stable-CAD strategy.", "Stable CAD does not remove the AF-related indication for anticoagulation.", "Aspirin does not replace indicated OAC for AF-related stroke prevention."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "AF with Stable CAD — Canadian CCS", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "CCS_AF_2020"
  },
  {
    q: "Which concept is specifically addressed in the 2023 CCS/CAIC focused antiplatelet update for patients with ACS or PCI?",
    o: ["Individualizing DAPT duration and P2Y12 strategy according to ischemic and bleeding risk", "Using antibiotics instead of antiplatelet therapy after PCI", "Stopping all antiplatelets immediately after every stent", "Treating ACS with anticoagulation alone in every patient"],
    a: 0,
    r: "The Canadian focused update addresses contemporary DAPT duration, potent P2Y12 choice, de-escalation strategies, and shortened DAPT in selected high-bleeding-risk patients rather than a one-size-fits-all approach.",
    s: "Cardiovascular",
    dr: ["Antibiotics do not prevent coronary stent thrombosis.", "Immediate universal cessation would expose many patients to stent thrombosis and recurrent ischemia.", "ACS antithrombotic management is not reduced to anticoagulation alone for every patient."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "ACS/PCI — Canadian Antiplatelet Guidance", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CCS_CAIC_APT_2023"
  },
  {
    q: "A Canadian patient with symptomatic lower-extremity PAD is prescribed low-dose rivaroxaban plus aspirin after vascular risk and bleeding assessment. Which nursing interpretation is best?",
    o: ["This is an evidence-based antithrombotic strategy used in selected PAD patients and requires bleeding surveillance", "The combination proves the patient has atrial fibrillation", "The doses can be doubled if claudication persists", "Bleeding assessment is unnecessary because the rivaroxaban dose is low"],
    a: 0,
    r: "Canadian PAD guidance includes low-dose rivaroxaban plus aspirin as an evidence-based option for selected patients. The regimen is a vascular-protection strategy and still carries clinically important bleeding risk.",
    s: "Cardiovascular",
    dr: ["Low-dose rivaroxaban plus aspirin can be used for PAD vascular protection independent of AF.", "Antithrombotic doses must not be changed by the patient based on symptoms.", "Even low-dose anticoagulant plus antiplatelet therapy requires careful bleeding-risk monitoring."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Peripheral Arterial Disease — Canadian CCS", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "CCS_PAD_2022"
  },

  // ==================== UNITED STATES ====================
  {
    q: "A U.S. patient with ACS is discharged after PCI and is not at high bleeding risk. Which antiplatelet plan reflects the 2025 ACC/AHA ACS default strategy?",
    o: ["Aspirin plus an oral P2Y12 inhibitor for at least 12 months", "Stop all antiplatelets at discharge", "Aspirin alone for 48 hours only", "Warfarin monotherapy for every patient"],
    a: 0,
    r: "The 2025 U.S. ACS guideline identifies DAPT with aspirin plus an oral P2Y12 inhibitor for at least 12 months as the default strategy when bleeding risk does not require an alternative approach.",
    s: "Cardiovascular",
    dr: ["Stopping antiplatelets immediately after ACS/PCI risks recurrent thrombosis and stent thrombosis.", "Aspirin for only 48 hours does not match the default post-ACS DAPT strategy.", "Warfarin is not routine monotherapy for all ACS patients."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "ACS — U.S. ACC/AHA 2025", difficulty: 3, cognitiveLevel: "application", sourceFamily: "ACC_AHA_ACS_2025"
  },
  {
    q: "A U.S. patient with ACS undergoes PCI and has no contraindication to potent P2Y12 inhibition. Which guideline principle should the RN recognize?",
    o: ["Ticagrelor or prasugrel is preferred to clopidogrel in this setting", "Clopidogrel is always superior to every other P2Y12 inhibitor", "P2Y12 therapy is unnecessary after PCI", "Only dipyridamole is recommended"],
    a: 0,
    r: "The 2025 ACC/AHA ACS guideline recommends ticagrelor or prasugrel in preference to clopidogrel for NSTE-ACS and STEMI patients undergoing PCI when appropriate.",
    s: "Cardiovascular",
    dr: ["Clopidogrel remains important in selected patients but is not the preferred potent agent for all PCI-treated ACS when ticagrelor/prasugrel are suitable.", "PCI-treated ACS requires antiplatelet therapy unless a specific contraindication or alternative plan exists.", "Dipyridamole is not the standard P2Y12 therapy for ACS PCI."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "ACS — U.S. ACC/AHA 2025", difficulty: 3, cognitiveLevel: "application", sourceFamily: "ACC_AHA_ACS_2025"
  },
  {
    q: "A U.S. patient on DAPT after ACS has a high gastrointestinal bleeding risk. Which additional therapy is recommended in the 2025 ACS guideline?",
    o: ["A proton pump inhibitor", "Routine systemic corticosteroid", "Daily NSAID", "No gastroprotection because DAPT does not cause bleeding"],
    a: 0,
    r: "The 2025 ACC/AHA ACS guideline recommends a proton pump inhibitor for patients at gastrointestinal bleeding risk who are receiving DAPT.",
    s: "Cardiovascular",
    dr: ["Systemic corticosteroids can increase GI and other adverse-event risks and are not routine DAPT gastroprotection.", "NSAIDs increase gastrointestinal bleeding and cardiovascular risk and are not protective.", "DAPT increases bleeding risk, so high-risk patients require appropriate mitigation strategies."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "ACS — U.S. Bleeding Risk", difficulty: 3, cognitiveLevel: "application", sourceFamily: "ACC_AHA_ACS_2025"
  },
  {
    q: "A U.S. ACS patient undergoes PCI but also requires long-term oral anticoagulation. Which 2025 guideline strategy is designed to reduce bleeding after the early post-PCI period?",
    o: ["Discontinue aspirin 1 to 4 weeks after PCI and continue a P2Y12 inhibitor, preferably clopidogrel, with the anticoagulant when appropriate", "Continue triple therapy unchanged for life", "Stop the anticoagulant permanently", "Stop every antithrombotic after 24 hours"],
    a: 0,
    r: "For ACS patients who require long-term anticoagulation, the 2025 U.S. guideline recommends aspirin discontinuation 1 to 4 weeks after PCI with continued P2Y12 inhibition, preferably clopidogrel, to reduce bleeding risk.",
    s: "Cardiovascular",
    dr: ["Prolonged triple therapy substantially increases bleeding and is not the default lifelong strategy.", "A separate long-term anticoagulation indication should not be abandoned without a clinical reason.", "Stopping all antithrombotic therapy immediately would expose the patient to major thrombotic risk."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "ACS with OAC — U.S. ACC/AHA 2025", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "ACC_AHA_ACS_2025"
  },
  {
    q: "A U.S. patient starts intensive lipid-lowering therapy after ACS. When does the 2025 ACC/AHA guideline recommend a follow-up fasting lipid panel after initiation or a dose adjustment?",
    o: ["About 4 to 8 weeks", "Only after 5 years", "Within 30 minutes", "No follow-up lipid testing is recommended"],
    a: 0,
    r: "The 2025 U.S. ACS guideline recommends a fasting lipid panel 4 to 8 weeks after starting or adjusting lipid-lowering therapy as part of secondary prevention.",
    s: "Cardiovascular",
    dr: ["Waiting years would miss inadequate response or need for treatment intensification.", "Lipid-lowering response cannot be meaningfully assessed within minutes.", "Follow-up lipid assessment is explicitly part of post-ACS secondary prevention."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "ACS Secondary Prevention — U.S. 2025", difficulty: 2, cognitiveLevel: "application", sourceFamily: "ACC_AHA_ACS_2025"
  },
  {
    q: "Which discharge referral is specifically recommended as part of U.S. secondary prevention after ACS?",
    o: ["Cardiac rehabilitation, including home-based options when appropriate", "Permanent bed rest", "Routine long-term oxygen for every patient", "Avoidance of all physical activity indefinitely"],
    a: 0,
    r: "The 2025 ACC/AHA ACS guideline recommends referral to cardiac rehabilitation and recognizes home-based programs for patients unable or unwilling to attend in person.",
    s: "Cardiovascular",
    dr: ["Prolonged inactivity worsens deconditioning and is not secondary prevention.", "Long-term oxygen is not routinely indicated after ACS without hypoxemia or another qualifying condition.", "Structured graded activity is a central part of recovery rather than indefinite exercise avoidance."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "ACS Secondary Prevention — U.S. 2025", difficulty: 2, cognitiveLevel: "application", sourceFamily: "ACC_AHA_ACS_2025"
  },
  {
    q: "A U.S. RN reviews medications for a stable patient with HFrEF. Which concept reflects the 2022 AHA/ACC/HFSA guideline?",
    o: ["HFrEF guideline-directed therapy includes four foundational medication classes, including an SGLT2 inhibitor", "SGLT2 inhibitors are used only when diabetes is present", "Only a loop diuretic is needed if edema improves", "Beta blockers are contraindicated in all HFrEF"],
    a: 0,
    r: "The 2022 U.S. heart-failure guideline identifies four foundational HFrEF medication classes and includes SGLT2 inhibitors as part of guideline-directed therapy.",
    s: "Cardiovascular",
    dr: ["SGLT2 inhibitors have HFrEF benefit irrespective of type 2 diabetes status.", "Loop diuretics improve congestion but do not replace the outcome-modifying foundational drug classes.", "Evidence-based beta blockers are a core HFrEF therapy when the patient is clinically stable and has no contraindication."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Heart Failure — U.S. AHA/ACC/HFSA", difficulty: 3, cognitiveLevel: "application", sourceFamily: "AHA_ACC_HF_2022"
  },
  {
    q: "A U.S. patient with symptomatic chronic HFrEF does not have diabetes. Which statement about SGLT2 inhibitors is correct under AHA/ACC/HFSA guidance?",
    o: ["They are recommended to reduce HF hospitalization and cardiovascular mortality regardless of type 2 diabetes status", "They are contraindicated solely because diabetes is absent", "They are used only to treat atrial flutter", "They replace every other heart-failure medication"],
    a: 0,
    r: "U.S. HFrEF guidance recommends SGLT2 inhibitors for symptomatic chronic HFrEF to reduce HF hospitalization and cardiovascular mortality irrespective of whether type 2 diabetes is present.",
    s: "Cardiovascular",
    dr: ["Diabetes is not required for the HFrEF indication.", "SGLT2 inhibitors are not antiarrhythmic therapy for atrial flutter.", "They complement rather than replace other foundational HFrEF classes."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Heart Failure — U.S. AHA/ACC/HFSA", difficulty: 3, cognitiveLevel: "application", sourceFamily: "AHA_ACC_HF_2022"
  },
  {
    q: "A U.S. patient with nonvalvular AF has a long-term contraindication to oral anticoagulation. Which 2023 ACC/AHA/ACCP/HRS option received an upgraded recommendation for selected patients?",
    o: ["Percutaneous left atrial appendage occlusion", "Routine aspirin as an equal substitute for anticoagulation in all patients", "Permanent dual antiplatelet therapy for every patient", "No stroke-prevention options should be discussed"],
    a: 0,
    r: "The 2023 U.S. AF guideline upgraded percutaneous left atrial appendage occlusion to a Class 2a recommendation for selected patients with a long-term contraindication to anticoagulation.",
    s: "Cardiovascular",
    dr: ["Aspirin is not an equivalent universal substitute for indicated oral anticoagulation in AF.", "DAPT is not a universal long-term AF stroke-prevention replacement.", "Selected patients with contraindications to anticoagulation may have nonpharmacologic stroke-prevention options."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Atrial Fibrillation — U.S. ACC/AHA 2023", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "ACC_AHA_AF_2023"
  },
  {
    q: "A U.S. adult remains unresponsive to verbal commands after return of spontaneous circulation. Which concept is part of the 2025 AHA post-cardiac-arrest guidance?",
    o: ["Use a deliberate temperature-control strategy for at least 36 hours", "Induce fever to stimulate awakening", "Stop all neurologic monitoring after ROSC", "Immediately discharge if a pulse is present"],
    a: 0,
    r: "The 2025 AHA CPR/ECC update recommends a temperature-control strategy for at least 36 hours in adults who remain unresponsive to verbal commands after cardiac arrest.",
    s: "Cardiovascular",
    dr: ["Fever can worsen neurologic injury and is not an awakening strategy.", "Post-arrest neurologic assessment and monitoring remain essential.", "ROSC begins intensive post-arrest stabilization; it is not a discharge criterion."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Post-Cardiac Arrest — U.S. AHA 2025", difficulty: 3, cognitiveLevel: "application", sourceFamily: "AHA_CPR_ECC_2025"
  }
];
