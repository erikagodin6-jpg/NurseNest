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
};
