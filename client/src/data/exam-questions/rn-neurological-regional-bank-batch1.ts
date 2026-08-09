import type { ExamQuestion } from "./types";

export type RnNeurologicalRegion = "CAN" | "US";

export interface RegionalRnNeurologicalQuestion extends ExamQuestion {
  regionScope: RnNeurologicalRegion;
  countryCode: "CA" | "US";
  licensingBody: "NCSBN";
  topic: string;
  difficulty: 2 | 3 | 4;
  cognitiveLevel: "application" | "analysis";
  sourceFamily: string;
}

// Nationally scoped questions where the expected answer depends on the current
// Canadian Stroke Best Practices or U.S. AHA/ASA acute-stroke framework.
export const rnNeurologicalRegionalBankBatch1Questions: RegionalRnNeurologicalQuestion[] = [
  // ==================== CANADA ====================
  {
    q: "A Canadian adult has a disabling acute ischemic stroke and presents within 4.5 hours of last known well with no contraindication to thrombolysis. Which reperfusion statement reflects current Canadian Stroke Best Practices?",
    o: ["Either IV alteplase or IV tenecteplase may be used according to the acute stroke protocol", "Only aspirin is used because thrombolysis is no longer recommended", "Tenecteplase is used only for myocardial infarction in Canada", "Thrombolysis is delayed until symptoms have been present for 24 hours"],
    a: 0,
    r: "Canadian Stroke Best Practices support intravenous thrombolysis with either alteplase or tenecteplase for eligible patients with disabling ischemic stroke within the standard treatment window. Local protocols determine operational details.",
    s: "Neurological",
    dr: ["Antiplatelet therapy does not replace indicated reperfusion in an eligible disabling acute ischemic stroke.", "Tenecteplase is an accepted thrombolytic option in current Canadian acute ischemic stroke guidance.", "Time-sensitive reperfusion is pursued urgently rather than intentionally delayed to 24 hours."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Acute Ischemic Stroke — Canadian Thrombolysis", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CAN_STROKE_BEST_PRACTICES_2022_2025"
  },
  {
    q: "A Canadian stroke centre uses tenecteplase for an eligible adult with acute ischemic stroke. Which dosing concept should the RN recognize from Canadian guidance?",
    o: ["A single IV bolus of 0.25 mg/kg to a maximum of 25 mg", "A 24-hour continuous infusion at 1 mg/kg", "A fixed 100 mg dose for every adult", "An oral dose given after swallowing assessment"],
    a: 0,
    r: "Current Canadian acute-stroke guidance uses tenecteplase 0.25 mg/kg IV as a single bolus, to a maximum of 25 mg, when tenecteplase is selected for thrombolysis.",
    s: "Neurological",
    dr: ["Tenecteplase for acute ischemic stroke is not administered as a 24-hour infusion.", "Stroke thrombolysis dosing is weight based and capped; it is not a universal 100 mg dose.", "Tenecteplase is administered intravenously and is not an oral medication."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Acute Ischemic Stroke — Canadian Tenecteplase", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CAN_STROKE_BEST_PRACTICES_2022_2025"
  },
  {
    q: "A Canadian hospital reviews its stroke metrics. Which door-to-needle performance concept is consistent with Canadian Stroke Best Practices?",
    o: ["Thrombolysis systems should aim for a median door-to-needle time of 30 minutes or less, with treatment within 60 minutes for at least 90% of eligible patients", "A two-hour door-to-needle time is the preferred target", "Treatment speed is unimportant once CT is complete", "Door-to-needle metrics apply only to hemorrhagic stroke"],
    a: 0,
    r: "Canadian stroke systems emphasize very rapid thrombolysis, including a median door-to-needle target of 30 minutes or less and treatment within 60 minutes for at least 90% of eligible patients.",
    s: "Neurological",
    dr: ["A two-hour routine target is slower than current Canadian quality expectations.", "Treatment delay costs salvageable brain tissue; speed remains important after imaging.", "Door-to-needle is a reperfusion metric for acute ischemic stroke, not an ICH metric."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Acute Stroke Systems — Canadian Quality Metrics", difficulty: 2, cognitiveLevel: "application", sourceFamily: "CAN_STROKE_BEST_PRACTICES_2022_2025"
  },
  {
    q: "A Canadian patient develops sudden severe headache and neurologic worsening during an IV thrombolytic infusion for ischemic stroke. What should the RN do?",
    o: ["Stop the infusion if still running and activate the emergency post-thrombolysis deterioration pathway, including urgent brain imaging", "Continue the infusion and reassess tomorrow", "Give an antiplatelet immediately before imaging", "Encourage ambulation"],
    a: 0,
    r: "Acute neurologic deterioration or severe headache during/after thrombolysis raises concern for intracranial hemorrhage. Canadian stroke guidance calls for immediate assessment and emergent brain imaging, with thrombolytic management according to the emergency protocol.",
    s: "Neurological",
    dr: ["Delay can allow catastrophic intracranial hemorrhage to progress.", "Antiplatelet therapy can worsen bleeding and is not given reflexively before urgent imaging in this setting.", "Ambulation is unsafe during acute neurologic deterioration."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Post-Thrombolysis Deterioration — Canada", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "CAN_STROKE_BEST_PRACTICES_2022_2025"
  },
  {
    q: "A Canadian patient has received IV thrombolysis for ischemic stroke and is clinically stable. Which antiplatelet principle should the RN recognize?",
    o: ["Antiplatelet therapy is generally withheld for the first 24 hours and brain imaging is obtained before initiation", "Aspirin should always be given simultaneously with the thrombolytic", "Dual antiplatelet therapy must begin during the thrombolytic bolus", "Antiplatelets are permanently contraindicated after thrombolysis"],
    a: 0,
    r: "Canadian Stroke Best Practices recommend avoiding antiplatelet therapy during the first 24 hours after IV thrombolysis and obtaining follow-up imaging before antithrombotic therapy is started.",
    s: "Neurological",
    dr: ["Concurrent antiplatelet administration can increase hemorrhagic risk and is not routine thrombolysis care.", "DAPT is not started during the thrombolytic bolus.", "Antiplatelets may be appropriate later after the required post-thrombolysis assessment and imaging."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Post-Thrombolysis Antithrombotics — Canada", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CAN_STROKE_BEST_PRACTICES_2022_2025"
  },
  {
    q: "A Canadian adult has a high-risk TIA or minor non-cardioembolic ischemic stroke and is not at high bleeding risk. Which secondary-prevention concept should the RN expect to see considered?",
    o: ["A short course of dual antiplatelet therapy followed by single antiplatelet therapy", "Long-term triple antiplatelet therapy for every patient", "No antithrombotic therapy because symptoms are mild", "Routine warfarin for all non-cardioembolic minor strokes"],
    a: 0,
    r: "Canadian guidance supports short-term dual antiplatelet therapy for selected high-risk TIA/minor non-cardioembolic stroke patients with low bleeding risk, followed by single antiplatelet therapy.",
    s: "Neurological",
    dr: ["Prolonged multi-agent antiplatelet therapy increases bleeding and is not the routine long-term strategy.", "Minor symptoms can still carry significant early recurrence risk.", "Warfarin is not routine therapy for non-cardioembolic minor stroke without another anticoagulation indication."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "TIA/Minor Stroke — Canadian Antiplatelet Therapy", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CAN_STROKE_BEST_PRACTICES_2022_2025"
  },
  {
    q: "A Canadian patient with acute spontaneous intracerebral hemorrhage has markedly elevated blood pressure. Which principle best reflects Canadian Stroke Best Practices?",
    o: ["Blood-pressure reduction is individualized; a systolic target in the approximately 140–160 mmHg range may be reasonable in many patients rather than treating one rigid number as universal", "Every patient must be driven below 100 mmHg immediately", "Blood pressure is never treated in ICH", "Only oral antihypertensives are used in unstable ICH"],
    a: 0,
    r: "Canadian ICH guidance emphasizes controlled, individualized blood-pressure management that avoids both ongoing severe hypertension and harmful hypotension; a systolic target below roughly 140–160 mmHg may be reasonable for many patients depending on presentation.",
    s: "Neurological",
    dr: ["Overly aggressive hypotension can reduce cerebral perfusion and harm patients.", "Severe hypertension can contribute to hematoma expansion and is actively managed.", "Acute ICH often requires titratable IV therapy rather than relying only on oral medication."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Intracerebral Hemorrhage — Canadian BP Management", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "CAN_STROKE_BEST_PRACTICES_ICH_2020_2025"
  },
  {
    q: "A Canadian ICH survivor asks about the most important long-term modifiable recurrence factor. Which target concept should the RN reinforce?",
    o: ["Long-term blood-pressure control, commonly targeting below 130/80 mmHg when tolerated and appropriate", "Allow chronic severe hypertension", "Stop antihypertensives once the headache resolves", "Blood pressure has no relationship to recurrent ICH"],
    a: 0,
    r: "Canadian secondary-prevention guidance emphasizes intensive long-term blood-pressure control after ICH, commonly targeting below 130/80 mmHg when appropriate and tolerated.",
    s: "Neurological",
    dr: ["Uncontrolled hypertension is a major recurrent-ICH risk factor.", "Resolution of acute symptoms does not eliminate vascular recurrence risk.", "Blood pressure is one of the most important modifiable risks for spontaneous ICH."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "ICH Secondary Prevention — Canada", difficulty: 3, cognitiveLevel: "application", sourceFamily: "CAN_STROKE_BEST_PRACTICES_ICH_SECONDARY"
  },
  {
    q: "A Canadian patient with a disabling large-vessel occlusion is eligible for IV thrombolysis and is also being transferred for endovascular thrombectomy. What should the RN understand?",
    o: ["When both are indicated, thrombolysis should not be withheld merely to wait for EVT, and EVT should not be delayed to see whether thrombolysis works", "Only one reperfusion treatment can ever be used", "EVT is postponed for 24 hours after thrombolysis", "Thrombolysis is stopped solely because a thrombectomy centre is available"],
    a: 0,
    r: "Canadian stroke guidance supports parallel reperfusion pathways in eligible patients: IV thrombolysis is given without delaying transfer/procedure, and thrombectomy proceeds without waiting to assess thrombolytic response.",
    s: "Neurological",
    dr: ["Selected patients benefit from both IV thrombolysis and EVT.", "Waiting 24 hours would sacrifice salvageable brain tissue.", "Availability of EVT does not automatically eliminate an otherwise indicated thrombolytic treatment."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Endovascular Thrombectomy — Canadian Bridging Therapy", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "CAN_STROKE_BEST_PRACTICES_EVT_2025"
  },
  {
    q: "A Canadian patient awakens with a disabling stroke and the last-known-well time was many hours earlier. What current Canadian principle should the RN recognize?",
    o: ["Selected patients may still be eligible for reperfusion based on advanced imaging and endovascular criteria rather than being excluded solely by clock time", "All wake-up strokes are automatically untreatable", "Only noncontrast CT is ever used to select late-window therapy", "Treatment eligibility ends exactly 4.5 hours for every reperfusion strategy"],
    a: 0,
    r: "Modern Canadian stroke pathways use advanced imaging to identify salvageable tissue and large-vessel occlusion in selected late- or unknown-onset strokes, including EVT consideration out to 24 hours in appropriate patients.",
    s: "Neurological",
    dr: ["Unknown onset does not automatically exclude reperfusion in current imaging-based pathways.", "Advanced vascular/perfusion imaging can be central to late-window selection.", "The 4.5-hour window applies to standard thrombolysis pathways, not all modern reperfusion strategies."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Late-Window Reperfusion — Canada", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "CAN_STROKE_BEST_PRACTICES_EVT_2025"
  },

  // ==================== UNITED STATES ====================
  {
    q: "Under the 2026 AHA/ASA acute ischemic stroke guideline, which IV thrombolytic options are endorsed for an eligible patient with a disabling deficit within 4.5 hours?",
    o: ["Either alteplase or tenecteplase", "Aspirin only", "Warfarin or heparin only", "No thrombolysis for any patient"],
    a: 0,
    r: "The 2026 AHA/ASA guideline endorses either alteplase or tenecteplase for eligible acute ischemic stroke patients within the standard 4.5-hour window.",
    s: "Neurological",
    dr: ["Antiplatelet therapy does not replace indicated IV thrombolysis in an eligible disabling stroke.", "Anticoagulants are not substitutes for acute IV thrombolysis.", "The current U.S. guideline continues to recommend IV thrombolysis for appropriately selected patients."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Acute Ischemic Stroke — U.S. AHA/ASA 2026", difficulty: 3, cognitiveLevel: "application", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "A U.S. patient has a clearly disabling acute ischemic stroke deficit but a relatively low NIHSS score and presents within the standard IV thrombolysis window. Which 2026 AHA/ASA principle applies?",
    o: ["Treatment decisions focus on whether the deficit is disabling rather than excluding the patient solely because the NIHSS number is low", "A low NIHSS always prohibits thrombolysis", "Only patients with NIHSS above 20 can be treated", "Thrombolysis is used only when the patient is unconscious"],
    a: 0,
    r: "The 2026 U.S. guideline emphasizes rapid thrombolysis for eligible disabling deficits regardless of NIHSS score; functional impact matters, not a single numeric cutoff alone.",
    s: "Neurological",
    dr: ["A low total NIHSS can hide disabling aphasia, hand weakness, or visual deficits.", "The guideline does not require an NIHSS above 20 for IV thrombolysis.", "Conscious patients with disabling deficits can be appropriate candidates."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Disabling Stroke — U.S. AHA/ASA 2026", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "A U.S. patient has a non-disabling minor ischemic stroke within 4.5 hours. Which 2026 AHA/ASA concept should the RN recognize?",
    o: ["For non-disabling deficits, thrombolysis has not shown benefit in trials and dual antiplatelet therapy is preferred in appropriate patients", "Every minor stroke must receive thrombolysis", "No antithrombotic therapy is ever used", "Emergency thrombectomy is mandatory for every minor deficit"],
    a: 0,
    r: "The 2026 U.S. guideline distinguishes disabling from non-disabling minor stroke; for appropriate non-disabling presentations, DAPT is preferred because IV thrombolysis has not demonstrated benefit.",
    s: "Neurological",
    dr: ["Minor severity does not automatically mean thrombolysis when the deficit is non-disabling.", "Selected non-disabling minor stroke patients do receive antiplatelet therapy for early recurrence prevention.", "EVT depends on vessel occlusion, disability, imaging, and eligibility rather than being mandatory for every minor stroke."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Minor Non-Disabling Stroke — U.S. AHA/ASA 2026", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "A U.S. patient presents 6 hours after last known well with a disabling ischemic stroke and favorable advanced imaging. What new U.S. guideline concept is relevant?",
    o: ["Selected patients in the 4.5- to 9-hour or unknown-onset window may be eligible for IV thrombolysis based on advanced imaging", "IV thrombolysis is categorically impossible after 4.5 hours in all circumstances", "Only a chest x-ray can select extended-window therapy", "Advanced imaging has no role in late-window stroke"],
    a: 0,
    r: "The 2026 AHA/ASA guideline supports IV thrombolysis in selected extended-window or unknown-onset patients using advanced imaging to identify favorable tissue profiles.",
    s: "Neurological",
    dr: ["Current U.S. recommendations allow imaging-selected exceptions beyond the traditional standard window.", "Chest x-ray does not identify salvageable ischemic brain tissue.", "Advanced CT/MR imaging can guide late-window reperfusion selection."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Extended-Window Thrombolysis — U.S. 2026", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "A U.S. patient has basilar artery occlusion, NIHSS 14, and symptom onset 10 hours ago. Which 2026 AHA/ASA principle is relevant?",
    o: ["Endovascular thrombectomy has a strong recommendation in appropriately selected basilar-occlusion patients within 24 hours when NIHSS is 10 or greater", "Posterior-circulation stroke is never treated with thrombectomy", "Treatment must wait until 48 hours", "NIHSS cannot be used in basilar-occlusion assessment"],
    a: 0,
    r: "The 2026 U.S. guideline gives a strong recommendation for EVT in selected basilar artery occlusion patients presenting within 24 hours with NIHSS 10 or greater.",
    s: "Neurological",
    dr: ["Evidence now supports EVT for selected basilar occlusions.", "Waiting beyond the evidence-based acute window sacrifices treatment opportunity.", "NIHSS is explicitly incorporated into the new basilar-occlusion recommendation."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Basilar Occlusion EVT — U.S. AHA/ASA 2026", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "A U.S. patient has a large-vessel occlusion but also a relatively large ischemic core on imaging. Which 2026 AHA/ASA update should the RN recognize?",
    o: ["EVT eligibility has expanded to selected patients with larger ischemic cores rather than excluding all large-core strokes", "All large-core strokes are automatically untreatable", "Core imaging is irrelevant", "Only IV fluids are used for large-vessel occlusion"],
    a: 0,
    r: "The 2026 U.S. guideline broadened thrombectomy eligibility to selected patients with larger ischemic cores based on newer randomized evidence.",
    s: "Neurological",
    dr: ["Large core is no longer an automatic universal exclusion for EVT.", "Imaging remains important for selection and prognosis.", "Large-vessel occlusion is a reperfusion emergency, not a condition treated only with supportive fluids."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Large-Core EVT — U.S. AHA/ASA 2026", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "A U.S. stroke patient has persistent glucose 220 mg/dL. Which 2026 AHA/ASA principle should the nurse recognize regarding intensive glucose control?",
    o: ["Intensive targeting of 80–130 mg/dL is not recommended because it does not improve outcome and increases severe hypoglycemia risk", "Glucose should be driven below 60 mg/dL", "Hyperglycemia is never monitored", "Insulin is prohibited in stroke"],
    a: 0,
    r: "The 2026 U.S. guideline specifically advises against intensive 80–130 mg/dL glucose targets after acute ischemic stroke because trials did not improve outcomes and increased severe hypoglycemia.",
    s: "Neurological",
    dr: ["Induced hypoglycemia can worsen neurologic injury.", "Glucose abnormalities are clinically important and require monitoring.", "Insulin may be used when appropriate; the issue is avoiding overly intensive targets, not prohibiting therapy."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Acute Stroke Glucose — U.S. AHA/ASA 2026", difficulty: 3, cognitiveLevel: "application", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "After IV thrombolysis or endovascular thrombectomy in a U.S. ischemic stroke patient, which 2026 blood-pressure concept is important?",
    o: ["Intensive systolic reduction below 140 mmHg is not routinely recommended and may be harmful after EVT", "Every patient should immediately be lowered below 100 mmHg", "Blood pressure is ignored after reperfusion", "Only oral medication can be used"],
    a: 0,
    r: "The 2026 AHA/ASA guideline advises against routine intensive SBP lowering below 140 mmHg after IVT/EVT; overly aggressive reduction may compromise cerebral perfusion and has shown harm after EVT.",
    s: "Neurological",
    dr: ["Profound hypotension can worsen cerebral ischemia.", "Post-reperfusion BP remains an important monitored treatment variable.", "Titrated IV agents are commonly needed when acute BP treatment is indicated."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Post-Reperfusion BP — U.S. AHA/ASA 2026", difficulty: 4, cognitiveLevel: "analysis", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "A U.S. EMS system is redesigning acute stroke transport. Which 2026 guideline principle should the RN involved in stroke-system planning recognize?",
    o: ["Destination planning may consider direct transport to an EVT-capable centre when local geography and system performance support it", "Every stroke patient must bypass the nearest hospital regardless of circumstances", "EMS destination has no effect on stroke systems", "Only patients with hemorrhage require regionalized care"],
    a: 0,
    r: "The 2026 AHA/ASA guideline emphasizes regional systems of care and permits direct EVT-capable destination strategies when supported by local transport times, capabilities, and outcomes.",
    s: "Neurological",
    dr: ["Transport strategy is system-specific rather than an absolute bypass rule for every geography.", "Prehospital destination decisions can materially affect reperfusion times.", "Regionalized acute-stroke systems apply to ischemic stroke as well as hemorrhagic disease."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Stroke Systems — U.S. AHA/ASA 2026", difficulty: 3, cognitiveLevel: "application", sourceFamily: "AHA_ASA_AIS_2026"
  },
  {
    q: "Which 2026 AHA/ASA system-of-care innovation can shorten time to brain imaging and thrombolysis in selected U.S. communities?",
    o: ["Mobile stroke units", "Routine delayed outpatient CT", "Eliminating EMS stroke screening", "Waiting for symptoms to resolve at home"],
    a: 0,
    r: "The 2026 U.S. guideline endorses mobile stroke units as an effective strategy in appropriate systems because they can bring imaging and treatment closer to the patient and reduce treatment delays.",
    s: "Neurological",
    dr: ["Outpatient delayed imaging is incompatible with time-critical acute stroke care.", "Prehospital stroke recognition supports rather than impedes rapid treatment.", "Waiting at home can eliminate reperfusion opportunities and worsen outcome."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Mobile Stroke Units — U.S. AHA/ASA 2026", difficulty: 2, cognitiveLevel: "application", sourceFamily: "AHA_ASA_AIS_2026"
  }
];
