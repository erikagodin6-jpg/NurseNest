import type { QuestionContractEnrichment } from "./question-contract-enrichment.generated";

export const CURATED_QUESTION_CONTRACT_ENRICHMENT: Record<string, QuestionContractEnrichment> = {
  "mcq-rpn-000000": {
    correctAnswerExplanation: "The practical nurse should recognize the STEMI emergency and immediately initiate the facility's emergency reperfusion/escalation pathway within role and organizational policy. Rapid activation moves the client toward definitive PCI while the team completes protocol-directed supportive care in parallel.",
    distractorRationales: {
      "mcq-rpn-000000:opt:02:96c4f980": "Morphine addresses pain but does not reopen an occluded coronary artery. Symptom relief must not delay immediate escalation for definitive reperfusion.",
      "mcq-rpn-000000:opt:03:377a623a": "A metabolic panel may be needed during the ACS workup, but obtaining routine laboratory data is lower priority than activating the emergency STEMI pathway.",
      "mcq-rpn-000000:opt:04:6840d282": "Oxygen is appropriate when hypoxemia or respiratory compromise is present, but routine oxygen without evidence of hypoxemia does not take priority over urgent STEMI escalation.",
    },
    hint: "Choose the action that gets a client with a clear STEMI to definitive emergency treatment fastest, within the nurse's role and local protocol.",
    whyThisMatters: "Practical nurses must rapidly recognize time-sensitive deterioration and escalate without delay. In STEMI, delayed reperfusion increases myocardial damage and the risk of shock, dysrhythmia, heart failure, and death.",
    clinicalPearl: "Recognize, escalate, and support: a practical nurse does not wait for routine tasks to finish before activating the emergency pathway for a clear STEMI.",
    mnemonic: "Time is muscle.",
    editorialStatus: "authored-v2",
  },
  "mcq-rpn-000001": {
    correctAnswerExplanation: "Potassium is a key pre-administration safety value because furosemide increases potassium loss. Existing hypokalemia can increase dysrhythmia risk, so the practical nurse should identify the abnormality and follow the medication order, reporting parameters, and local policy before administration.",
    distractorRationales: {
      "mcq-rpn-000001:opt:02:13769342": "Blood pressure is also important before IV diuresis because furosemide can worsen hypotension, but potassium is the option most specifically linked to the medication's characteristic electrolyte complication in this item.",
      "mcq-rpn-000001:opt:03:d758312b": "Heart rate contributes to the overall cardiovascular assessment but does not directly identify the predictable electrolyte depletion associated with loop diuretics.",
      "mcq-rpn-000001:opt:04:bdfd60e1": "Urine output helps evaluate renal function and the response to diuresis, but it does not replace assessment of a pre-existing potassium abnormality that can increase cardiac risk.",
    },
    hint: "Connect the medication with the adverse effect that should be identified before the dose is given.",
    whyThisMatters: "Safe medication administration requires more than matching the order to the MAR. Recognizing electrolyte risk before loop-diuretic administration can prevent avoidable dysrhythmias and unsafe treatment.",
    clinicalPearl: "Before loop diuretics, review potassium, renal function, blood pressure, fluid status, and urine response; report findings outside ordered or policy-based parameters.",
    mnemonic: "Loops lose K+.",
    editorialStatus: "authored-v2",
  },
  "mcq-rpn-000002": {
    correctAnswerExplanation: "Distal pedal pulses directly assess circulation below a femoral arterial access site. A new decrease or absence can indicate impaired arterial flow and requires immediate reporting/escalation to prevent progression to limb ischemia.",
    distractorRationales: {
      "mcq-rpn-000002:opt:02:037ccf13": "Level of consciousness remains part of post-procedure assessment, but it is less specific than a distal neurovascular check for complications of femoral arterial access.",
      "mcq-rpn-000002:opt:03:5e365c32": "Urine output is useful after contrast exposure and for overall perfusion monitoring, but it does not assess arterial flow to the leg distal to the puncture site.",
      "mcq-rpn-000002:opt:04:c6f3619c": "Insertion-site pain should be assessed, particularly if bleeding or hematoma is suspected, but distal pulse changes provide more direct evidence of threatened arterial perfusion.",
    },
    hint: "Think about which assessment identifies a circulation problem below the femoral access site.",
    whyThisMatters: "Early recognition and reporting of neurovascular compromise can prevent prolonged ischemia and permanent tissue or nerve injury after an arterial procedure.",
    clinicalPearl: "After femoral arterial access, assess both the puncture site and the distal limb—pulses, color, warmth, capillary refill, sensation, movement, and bleeding matter.",
    editorialStatus: "authored-v2",
  },
  "mcq-rpn-000003": {
    correctAnswerExplanation: "The first priority is to assess whether the rapid atrial fibrillation is causing hemodynamic instability. Hypotension, chest pain, acute dyspnea/pulmonary edema, altered mental status, or other poor-perfusion findings require urgent escalation and determine the next treatment pathway.",
    distractorRationales: {
      "mcq-rpn-000003:opt:02:2de4fbf5": "Metoprolol may be ordered for a stable client, but administering a rate-control drug before assessing stability could delay emergency treatment or worsen hypotension.",
      "mcq-rpn-000003:opt:03:a423f82d": "Cardioversion may be required when the client is unstable, but the nurse first needs the clinical assessment that establishes whether that emergency pathway is indicated.",
      "mcq-rpn-000003:opt:04:67947afe": "A 12-lead ECG is useful, but immediate assessment of perfusion and instability cannot be postponed while additional diagnostic data are obtained.",
    },
    hint: "Use the stable-versus-unstable tachyarrhythmia framework before selecting a medication or procedure.",
    whyThisMatters: "Rapid recognition of instability allows the practical nurse to escalate promptly and support time-sensitive treatment before tachyarrhythmia causes worsening shock, ischemia, pulmonary edema, or loss of consciousness.",
    clinicalPearl: "Assess the client, not just the rate: signs of poor perfusion determine how urgently a rapid atrial rhythm must be escalated.",
    editorialStatus: "authored-v2",
  },
  "mcq-rpn-000004": {
    correctAnswerExplanation: "Sudden hypotension with muffled heart sounds after CABG is highly concerning for cardiac tamponade. The practical nurse should recognize this as a life-threatening postoperative change and escalate immediately for definitive assessment and intervention.",
    distractorRationales: {
      "mcq-rpn-000004:opt:02:5507aa32": "Heart-failure worsening can cause hypotension and congestion, but the abrupt postoperative deterioration with muffled heart sounds is more characteristic of impaired filling from pericardial compression.",
      "mcq-rpn-000004:opt:03:303398d9": "Pneumothorax can cause respiratory distress and hypotension if tension develops, but the expected respiratory findings differ from the muffled heart sounds that support tamponade.",
      "mcq-rpn-000004:opt:04:ff7bfd5c": "Pulmonary embolism can cause abrupt dyspnea, hypoxemia, tachycardia, and obstructive shock, but muffled heart sounds after cardiac surgery point more directly to tamponade.",
    },
    hint: "Identify the postoperative complication that explains both sudden poor circulation and muffled cardiac sounds.",
    whyThisMatters: "Tamponade can progress rapidly to cardiac arrest. Practical nurses caring for postoperative clients must recognize unexpected hemodynamic deterioration and activate urgent assistance without delaying for routine reassessment cycles.",
    clinicalPearl: "After cardiac surgery, sudden hypotension is an emergency; muffled heart sounds or other signs of impaired filling should trigger immediate concern for tamponade.",
    editorialStatus: "authored-v2",
  },
};
