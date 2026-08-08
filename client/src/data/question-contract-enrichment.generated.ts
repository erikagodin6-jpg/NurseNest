// Generated/curated question-contract enrichment overlay.
// Automated bulk runs may append validated authored-v2 entries; clinical editorial entries may also be curated here.
export type QuestionContractEnrichment = {
  correctAnswerExplanation?: string;
  distractorRationales?: Record<string, string>;
  hint?: string;
  whyThisMatters?: string;
  clinicalPearl?: string;
  mnemonic?: string;
  countryCode?: string;
  regionScope?: string;
  languageCode?: string;
  licensingBody?: string;
  unitSystemSupport?: { supported: string[]; default?: string };
  unitVariants?: Array<{
    token: string;
    quantity: string;
    si: { value: number | string; unit: string; display: string };
    conv: { value: number | string; unit: string; display: string };
  }>;
  editorialStatus?: "authored-v2" | "needs-review";
};

export const QUESTION_CONTRACT_ENRICHMENT: Record<string, QuestionContractEnrichment> = {
  "mcq-np-000000": {
    correctAnswerExplanation: "Anterior STEMI with ongoing ischemic symptoms requires immediate activation of the reperfusion pathway. Mobilizing the catheterization team directly advances the time-sensitive definitive treatment—primary PCI—while other indicated ACS measures occur in parallel.",
    distractorRationales: {
      "mcq-np-000000:opt:02:96c4f980": "Morphine may be considered for persistent severe ischemic pain in selected patients, but it does not restore coronary perfusion and must not delay activation of the PCI pathway.",
      "mcq-np-000000:opt:03:377a623a": "A metabolic panel can inform subsequent medication and procedural decisions, but waiting for routine laboratory results would delay time-critical reperfusion in a clear STEMI presentation.",
      "mcq-np-000000:opt:04:6840d282": "Supplemental oxygen is indicated when the patient is hypoxemic or has respiratory compromise; routine oxygen for a normoxic STEMI patient is not the priority over immediate reperfusion activation.",
    },
    hint: "Choose the action that most directly shortens the time to definitive reperfusion rather than an intervention that only treats symptoms or gathers routine data.",
    whyThisMatters: "Every delay in restoring coronary blood flow increases myocardial injury, heart-failure risk, malignant dysrhythmias, and mortality. STEMI systems are designed around rapid recognition and immediate reperfusion activation.",
    clinicalPearl: "For a clear STEMI, think reperfusion pathway first: activate PCI resources immediately while aspirin, monitoring, access, symptom control, and other indicated care proceed in parallel.",
    mnemonic: "Time is muscle.",
    editorialStatus: "authored-v2",
  },
  "mcq-np-000001": {
    correctAnswerExplanation: "Serum potassium is a key safety laboratory value before loop-diuretic therapy because furosemide increases urinary potassium loss. Existing hypokalemia raises the risk of ventricular dysrhythmias and may require correction and closer monitoring.",
    distractorRationales: {
      "mcq-np-000001:opt:02:13769342": "Blood pressure is clinically important before IV diuresis because furosemide can worsen hypotension, but this item is targeting the medication's characteristic electrolyte hazard; potassium is the most specific safety assessment among the choices.",
      "mcq-np-000001:opt:03:d758312b": "Heart rate contributes to the overall cardiovascular assessment, but it does not directly identify the electrolyte complication most strongly associated with loop-diuretic administration.",
      "mcq-np-000001:opt:04:bdfd60e1": "Urine output is essential for evaluating renal response and the effectiveness of diuresis, but a pre-dose potassium abnormality can create an immediate dysrhythmia risk that requires attention before additional potassium loss occurs.",
    },
    hint: "Identify the pre-administration finding most closely tied to the medication's predictable and potentially dangerous adverse effect.",
    whyThisMatters: "Loop diuretics can rapidly alter potassium and volume status. Recognizing pre-existing electrolyte risk helps prevent avoidable dysrhythmias while the clinician also evaluates blood pressure, renal function, fluid status, and response to therapy.",
    clinicalPearl: "With IV loop diuretics, think potassium, renal function, blood pressure, fluid status, and urine response together—electrolyte surveillance is a core medication-safety task.",
    mnemonic: "Loops lose K+.",
    editorialStatus: "authored-v2",
  },
  "mcq-np-000002": {
    correctAnswerExplanation: "After femoral arterial catheterization, distal pulse assessment directly evaluates perfusion below the access site. A diminished or absent pedal pulse can signal arterial obstruction, thrombosis, or embolization and requires prompt escalation to prevent limb ischemia.",
    distractorRationales: {
      "mcq-np-000002:opt:02:037ccf13": "Level of consciousness remains part of routine post-procedure assessment, but in an uncomplicated femoral-access case it is less specific for the access-site vascular complication the nurse must detect promptly.",
      "mcq-np-000002:opt:03:5e365c32": "Urine output is useful for monitoring perfusion and renal function after contrast exposure, but it does not assess the immediate risk of compromised arterial flow distal to the femoral puncture site.",
      "mcq-np-000002:opt:04:c6f3619c": "Local pain should be assessed and may accompany a hematoma or vascular complication, but objective distal perfusion assessment is more urgent because threatened limb circulation may initially be subtle.",
    },
    hint: "Match the access route to the complication that could threaten the tissue beyond that arterial puncture site.",
    whyThisMatters: "Rapid recognition of impaired distal perfusion after arterial instrumentation can prevent progression from an access-site thrombotic complication to irreversible ischemic injury.",
    clinicalPearl: "After femoral arterial access, trend the site and the limb: bleeding/hematoma, color, temperature, capillary refill, sensation, movement, and distal pulses all matter.",
    editorialStatus: "authored-v2",
  },
  "mcq-np-000003": {
    correctAnswerExplanation: "The first decision in rapid atrial fibrillation is whether the patient is hemodynamically stable. Hypotension, ischemic chest discomfort, acute heart failure, shock, or altered mental status changes the treatment pathway and may make urgent synchronized cardioversion necessary.",
    distractorRationales: {
      "mcq-np-000003:opt:02:2de4fbf5": "A rate-control medication may be appropriate for a stable patient, but administering it before establishing hemodynamic stability risks delaying the emergency pathway for an unstable tachyarrhythmia.",
      "mcq-np-000003:opt:03:a423f82d": "Synchronized cardioversion is appropriate when rapid atrial fibrillation is causing instability, but the nurse must first determine whether those instability criteria are actually present.",
      "mcq-np-000003:opt:04:67947afe": "A 12-lead ECG is valuable for rhythm characterization and ischemia assessment, but it should not precede the immediate bedside determination of whether the patient is perfusing adequately and requires emergent intervention.",
    },
    hint: "Before choosing a rate-control or rhythm-control intervention, determine which branch of the stable-versus-unstable tachyarrhythmia pathway applies.",
    whyThisMatters: "The stability assessment determines urgency. Delaying cardioversion in an unstable patient can worsen shock or ischemia, while treating a stable patient as unstable exposes the patient to unnecessary procedural risk.",
    clinicalPearl: "For tachyarrhythmias, stability is the fork in the road: assess perfusion first, then choose rate control, rhythm control, or urgent synchronized cardioversion.",
    editorialStatus: "authored-v2",
  },
  "mcq-np-000004": {
    correctAnswerExplanation: "Sudden hypotension with muffled heart sounds after CABG is highly concerning for postoperative cardiac tamponade, usually from blood accumulating in the pericardial space and restricting ventricular filling. This is a life-threatening obstructive process requiring immediate escalation and definitive drainage.",
    distractorRationales: {
      "mcq-np-000004:opt:02:5507aa32": "Heart-failure decompensation can cause hypotension and congestion, but muffled heart sounds with abrupt postoperative deterioration more strongly suggests impaired filling from pericardial compression.",
      "mcq-np-000004:opt:03:303398d9": "Pneumothorax after cardiac surgery can cause respiratory distress, unilateral breath-sound changes, and hypotension if tension physiology develops, but muffled heart sounds point more directly toward tamponade.",
      "mcq-np-000004:opt:04:ff7bfd5c": "Pulmonary embolism may cause sudden dyspnea, hypoxemia, tachycardia, chest pain, and obstructive shock, but it does not characteristically produce muffled heart sounds after recent cardiac surgery.",
    },
    hint: "Use the postoperative context and identify the diagnosis that specifically explains both impaired circulation and muffled cardiac sounds.",
    whyThisMatters: "Postoperative tamponade can progress rapidly to profound shock and cardiac arrest. Early recognition allows urgent bedside escalation, echocardiographic assessment when feasible, and prompt surgical or pericardial decompression.",
    clinicalPearl: "After cardiac surgery, unexplained hypotension plus rising filling pressures or muffled heart sounds should trigger immediate concern for tamponade—even when the classic triad is incomplete.",
    mnemonic: "Tamponade compresses filling: pressure around the heart, pressure down in the arteries.",
    editorialStatus: "authored-v2",
  },
  "mcq-rn-000000": {
    correctAnswerExplanation: "The RN should immediately activate the STEMI reperfusion pathway because the ECG and symptoms indicate an acute anterior STEMI. Rapid catheterization-team activation moves the patient toward definitive PCI while the RN simultaneously supports monitoring, vascular access, aspirin administration when appropriate, and other protocol-directed care.",
    distractorRationales: {
      "mcq-rn-000000:opt:02:96c4f980": "Pain control is not the definitive treatment for an occluded coronary artery. Morphine may be used selectively for persistent pain, but giving it first would not address the time-sensitive need for reperfusion.",
      "mcq-rn-000000:opt:03:377a623a": "Laboratory testing is part of the ACS workup, but routine metabolic results should not delay activation of the catheterization team when the ECG already demonstrates STEMI.",
      "mcq-rn-000000:opt:04:6840d282": "Oxygen should be given when hypoxemia or respiratory compromise is present; routinely starting oxygen without evidence of hypoxemia is not more urgent than activating definitive reperfusion.",
    },
    hint: "Prioritize the RN action that advances definitive treatment for an occluded coronary artery rather than a supportive action that can occur in parallel.",
    whyThisMatters: "RN recognition and rapid escalation are central to reducing door-to-device delay. Faster reperfusion limits infarct size and lowers the risk of cardiogenic shock, heart failure, malignant dysrhythmias, and death.",
    clinicalPearl: "STEMI is a system emergency: activate the reperfusion pathway immediately and perform protocol-driven nursing interventions in parallel rather than sequentially delaying PCI.",
    mnemonic: "Time is muscle.",
    editorialStatus: "authored-v2",
  },
  "mcq-rn-000001": {
    correctAnswerExplanation: "Potassium is a priority medication-safety laboratory value because furosemide promotes potassium loss. If potassium is already low, additional diuresis can increase the risk of ventricular ectopy and dangerous dysrhythmias, so the RN should identify and escalate the abnormality before administration according to the order and local protocol.",
    distractorRationales: {
      "mcq-rn-000001:opt:02:13769342": "The RN should also evaluate blood pressure before IV furosemide because diuresis can worsen hypotension, but potassium is the answer that most specifically identifies the loop diuretic's characteristic electrolyte safety risk in this item.",
      "mcq-rn-000001:opt:03:d758312b": "Heart rate belongs in the overall assessment, yet it does not directly identify the electrolyte depletion that can make furosemide administration hazardous.",
      "mcq-rn-000001:opt:04:bdfd60e1": "Urine output is essential for assessing renal function and therapeutic response, but it does not replace the pre-dose electrolyte check when potassium depletion may increase dysrhythmia risk.",
    },
    hint: "Connect the medication to the adverse effect the RN can detect before giving the dose.",
    whyThisMatters: "Medication administration is not a task-only process. The RN integrates laboratory results, blood pressure, renal status, volume status, and the indication for therapy to identify preventable harm before IV diuresis.",
    clinicalPearl: "For furosemide, assess the whole safety picture—potassium, renal function, blood pressure, volume status, and urine response—not just whether a dose is scheduled.",
    mnemonic: "Loops lose K+.",
    editorialStatus: "authored-v2",
  },
  "mcq-rn-000002": {
    correctAnswerExplanation: "Distal pedal pulses are a priority after femoral arterial catheterization because they directly assess circulation below the access site. A new reduction or loss of pulse can indicate arterial occlusion or embolization and requires immediate nursing escalation.",
    distractorRationales: {
      "mcq-rn-000002:opt:02:037ccf13": "Neurologic assessment is important after sedation and invasive procedures, but it is not the most direct assessment of the limb-threatening vascular complication associated with femoral arterial access.",
      "mcq-rn-000002:opt:03:5e365c32": "Urine output helps assess perfusion and renal response after contrast exposure, but an access-site arterial complication threatens distal limb circulation more immediately and is detected through neurovascular assessment.",
      "mcq-rn-000002:opt:04:c6f3619c": "Pain at the puncture site should be assessed, especially if a hematoma is suspected, but distal pulse changes provide objective evidence of compromised arterial flow and are the higher-priority vascular assessment.",
    },
    hint: "Think about what complication the femoral arterial route could cause below the insertion site and which assessment detects it fastest.",
    whyThisMatters: "A prompt RN neurovascular assessment can identify an evolving arterial obstruction before prolonged ischemia causes nerve, muscle, or tissue injury.",
    clinicalPearl: "Post-femoral cath checks pair access-site bleeding surveillance with distal neurovascular assessment: pulses, color, temperature, capillary refill, sensation, and movement.",
    editorialStatus: "authored-v2",
  },
  "mcq-rn-000003": {
    correctAnswerExplanation: "The RN should first determine whether rapid atrial fibrillation is causing hemodynamic instability. Findings such as hypotension, acute ischemic chest discomfort, shock, altered mental status, or acute pulmonary edema change the urgency and may require immediate synchronized cardioversion rather than routine rate-control treatment.",
    distractorRationales: {
      "mcq-rn-000003:opt:02:2de4fbf5": "Metoprolol may be appropriate for rate control in a stable patient, but the RN must establish stability before administering a medication that could worsen hypotension or delay urgent cardioversion.",
      "mcq-rn-000003:opt:03:a423f82d": "Preparing for cardioversion is correct when the tachyarrhythmia is causing instability; doing so before assessing perfusion skips the decision point that determines whether cardioversion is urgently indicated.",
      "mcq-rn-000003:opt:04:67947afe": "A 12-lead ECG is valuable, but bedside assessment of perfusion and instability must occur immediately because treatment urgency is determined by the patient's clinical condition, not the tracing alone.",
    },
    hint: "Use the stable-versus-unstable tachyarrhythmia framework before selecting a medication or procedure.",
    whyThisMatters: "The RN's rapid recognition of instability can shorten time to synchronized cardioversion and prevent worsening ischemia, shock, pulmonary edema, or loss of consciousness.",
    clinicalPearl: "In rapid atrial fibrillation, assess the patient before treating the number: instability determines whether the pathway is emergent cardioversion or controlled rate/rhythm management.",
    editorialStatus: "authored-v2",
  },
  "mcq-rn-000004": {
    correctAnswerExplanation: "Cardiac tamponade is the most concerning explanation for sudden hypotension and muffled heart sounds after CABG. Postoperative bleeding can accumulate in the pericardial space, restrict ventricular filling, and rapidly reduce cardiac output, requiring immediate RN escalation and definitive intervention.",
    distractorRationales: {
      "mcq-rn-000004:opt:02:5507aa32": "Heart-failure exacerbation may cause hypotension and congestion, but the abrupt postoperative change with muffled heart sounds more specifically suggests external cardiac compression rather than primary pump failure.",
      "mcq-rn-000004:opt:03:303398d9": "Pneumothorax can produce respiratory distress and, if tension develops, obstructive shock; the expected respiratory and unilateral chest findings differ from the muffled heart sounds that support tamponade.",
      "mcq-rn-000004:opt:04:ff7bfd5c": "Pulmonary embolism can cause abrupt obstructive shock and hypoxemia, but muffled heart sounds in the immediate post-cardiac-surgery context are more characteristic of pericardial fluid compressing the heart.",
    },
    hint: "Link the sudden postoperative hypotension to the finding that specifically indicates impaired cardiac filling from pressure around the heart.",
    whyThisMatters: "Tamponade after cardiac surgery can deteriorate within minutes. The RN's recognition of the pattern and immediate escalation can be lifesaving because the problem requires urgent decompression rather than routine hypotension management.",
    clinicalPearl: "After CABG, unexplained hemodynamic collapse is never routine—consider tamponade early, especially with muffled heart sounds, rising venous pressures, narrowing pulse pressure, or falling chest-tube output despite suspected bleeding.",
    editorialStatus: "authored-v2",
  },
};
