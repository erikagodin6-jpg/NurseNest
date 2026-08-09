import { respiratoryLessons } from "./respiratory";

export interface RnPneumothoraxCramLesson {
  id:string;fullLessonKey:string;tier:"rn";countryCode:"CA"|"US";regionScope:"CAN"|"US";exam:"NCLEX-RN";bodySystem:"Respiratory";topic:"Pneumothorax";title:string;
  bottomLine:string;mechanism:string[];recognize:string[];diagnosticsMonitoring:string[];priorityActions:string[];medicationSafety:string[];redFlags:string[];complications:string[];examTraps:string[];rapidReview:string[];sourceBasis:string[];sourceAsOf:"2026-08";
}

const ptxMatches = Object.entries(respiratoryLessons).filter(([key, lesson]) =>
  `${key} ${lesson.title}`.toLowerCase().includes("pneumothorax")
);
if (ptxMatches.length !== 1) {
  throw new Error(`RN_PTX_FULL_RESOLUTION_INVALID: expected 1 Pneumothorax Full lesson, found ${ptxMatches.length}: ${ptxMatches.map(([key]) => key).join(",")}`);
}
export const rnPneumothoraxResolvedFullLessonKey = ptxMatches[0][0];

const sharedMechanism=[
  "Air enters the pleural space, separating visceral and parietal pleura and allowing partial or complete lung collapse.",
  "Tension physiology occurs when pleural pressure rises enough to impair venous return and cardiac output, producing obstructive shock.",
  "Primary spontaneous pneumothorax occurs without known major underlying lung disease; secondary spontaneous pneumothorax occurs in diseased lungs with less reserve and higher clinical risk."
];

export const rnPneumothoraxCramLessons:RnPneumothoraxCramLesson[]=[
{
 id:"cram-rn-ca-pneumothorax-20260807",fullLessonKey:rnPneumothoraxResolvedFullLessonKey,tier:"rn",countryCode:"CA",regionScope:"CAN",exam:"NCLEX-RN",bodySystem:"Respiratory",topic:"Pneumothorax",title:"Pneumothorax & Chest-Drain Emergencies — RN Canada Cram",
 bottomLine:"Pneumothorax management is driven by physiology and context, not size alone. Stable selected primary spontaneous pneumothorax may be managed conservatively, but tension physiology is an immediate decompression emergency. A functioning chest drain must stay patent, dependent, and unclamped unless a specific supervised indication exists.",
 mechanism:sharedMechanism,
 recognize:["Simple pneumothorax: sudden pleuritic pain, dyspnea, unilateral reduced breath sounds, possible tachycardia but preserved perfusion.","Tension pneumothorax: worsening respiratory distress plus hypotension/shock, severe hypoxemia, unilateral absent breath sounds, and often rising airway pressure on positive-pressure ventilation.","Secondary spontaneous pneumothorax can cause major compromise with less pleural air because baseline reserve is limited."],
 diagnosticsMonitoring:["Stable pneumothorax is confirmed/characterized with imaging according to clinical context; do not delay decompression for routine imaging when tension physiology is present.","With a chest drain, monitor respiratory status, oxygen/support needs, insertion site, tubing patency, chamber behavior, drainage, subcutaneous emphysema, and follow-up imaging.","Continuous water-seal bubbling suggests a patient or system air leak; absent tidaling is nonspecific and requires patient/system assessment.","Persistent air leak or incomplete re-expansion requires specialist reassessment."],
 priorityActions:["Support oxygenation and breathing; call for immediate decompression when tension physiology is suspected in an unstable patient.","For an open chest wound, apply the appropriate vented/occlusive trauma dressing and monitor for tension while definitive treatment is prepared.","Keep chest-drain tubing unkinked and the unit upright/below chest level; correct external obstruction immediately.","If the tube is pulled out of the patient, cover the site per emergency protocol, assess ABCs, and obtain urgent assistance—do not reinsert the old tube.","Mobilize/transport safely while preserving the closed dependent drainage pathway."],
 medicationSafety:["Analgesia supports ventilation, cough, movement, and chest-drain tolerance; reassess respiratory effects of opioids when used.","Sedation for pleural procedures requires airway/respiratory monitoring appropriate to the agent and setting.","Do not treat chest-drain bubbling by adding medications or clamping without first identifying the cause.","Smoking-cessation pharmacotherapy/support can be part of recurrence prevention when appropriate."],
 redFlags:["Hypotension or shock with unilateral absent breath sounds","Rapidly increasing oxygen need or ventilator airway pressure","New severe dyspnea after chest-drain kinking, disconnection, or dislodgement","Expanding subcutaneous emphysema toward neck/face","Persistent air leak with failure of lung re-expansion"],
 complications:["Tension pneumothorax and obstructive shock","Persistent air leak/bronchopleural fistula","Recurrent spontaneous pneumothorax","Subcutaneous emphysema","Chest-drain infection, malposition, blockage, dislodgement, or organ injury"],
 examTraps:["Waiting for chest x-ray before treating unstable tension pneumothorax.","Routine clamping of a chest tube used to evacuate pleural air.","Assuming continuous bubbling always means normal drainage.","Reinserting a chest tube that has been pulled out of the patient.","Teaching that every stable spontaneous pneumothorax automatically requires a chest tube."],
 rapidReview:["Tension = physiology + shock → decompress now.","Simple stable PSP may be conservative/ambulatory in selected patients.","Chest box below chest; tubing patent; no routine clamping.","Continuous bubbling = find the leak. No tidaling = assess context.","No flying with unresolved PTX; scuba return requires specialist recurrence-risk clearance."],
 sourceBasis:["British Thoracic Society 2023 Pleural Disease Guideline — Pneumothorax","ERS/EACTS/ESTS guideline on adult spontaneous pneumothorax","NCSBN 2026 NCLEX-RN Test Plan"],sourceAsOf:"2026-08"
},
{
 id:"cram-rn-us-pneumothorax-20260807",fullLessonKey:rnPneumothoraxResolvedFullLessonKey,tier:"rn",countryCode:"US",regionScope:"US",exam:"NCLEX-RN",bodySystem:"Respiratory",topic:"Pneumothorax",title:"Pneumothorax & Pleural-Drain Emergencies — RN U.S. Cram",
 bottomLine:"Treat pneumothorax according to symptoms, reserve, cause, and hemodynamics. A stable primary spontaneous pneumothorax can sometimes avoid invasive drainage, but suspected tension pneumothorax with shock is decompressed immediately. Chest-drain nursing focuses on an open escape path for pleural air and early recognition of system failure.",
 mechanism:sharedMechanism,
 recognize:["Spontaneous pneumothorax commonly presents with abrupt unilateral pleuritic pain and dyspnea with reduced breath sounds.","Tension physiology produces worsening hypoxemia plus obstructive-shock signs; positive-pressure ventilation can accelerate deterioration.","Traumatic/open pneumothorax and secondary spontaneous pneumothorax require a lower threshold for urgent intervention because consequences can be greater."],
 diagnosticsMonitoring:["Use imaging to confirm/size stable disease and guide ongoing management, but do not postpone emergency decompression for unstable tension physiology.","Assess chest-drain position, connections, dependent loops/kinks, water seal, suction setting if ordered, drainage, crepitus, patient breath sounds, and oxygen/support trend.","Continuous water-seal bubbling indicates an air-leak pathway that must be located; chamber movement alone never replaces patient assessment.","Persistent bubbling/non-expansion over time should trigger pleural/thoracic review."],
 priorityActions:["Stabilize ABCs and activate immediate decompression for clinical tension pneumothorax.","Manage open chest wounds with trauma-protocol vented/occlusive dressing while supporting oxygenation and monitoring for tension.","Maintain a closed pleural-drain system below the chest and remove external kinks/compression immediately.","For complete tube dislodgement, protect the insertion site, assess respiratory status, and obtain urgent procedural help rather than reinserting the tube.","Support graded activity and safe transport after stabilization without routine drain clamping."],
 medicationSafety:["Use prescribed analgesia while watching respiratory status so pain does not prevent deep breathing or mobility.","Procedure sedation requires continuous monitoring appropriate to the medication and care setting.","Avoid routine NSAID or opioid assumptions; analgesic choice should account for bleeding risk, renal function, and respiratory vulnerability.","Smoking-cessation treatment is part of recurrence-risk reduction when indicated."],
 redFlags:["Sudden hypotension/syncope with unilateral breath-sound loss","Acute hypoxemia or high-pressure ventilator alarm","Chest-drain obstruction/dislodgement with recurrent symptoms","Rapidly spreading subcutaneous emphysema","Persistent air leak or failure to re-expand"],
 complications:["Tension physiology/cardiac arrest","Recurrent spontaneous pneumothorax","Persistent alveolar-pleural air leak","Procedure-related bleeding/infection/malposition","Subcutaneous emphysema and chest-drain failure"],
 examTraps:["Equating radiographic size with tension physiology.","Clamping a tube simply because bubbling is annoying.","Assuming absent tidaling proves either obstruction or complete re-expansion.","Putting the drainage unit above the patient's chest during transport.","Clearing air travel or scuba based on symptom resolution alone."],
 rapidReview:["Shock + unilateral silence = tension until proven otherwise.","Stable PSP can sometimes be noninvasive; secondary/traumatic disease is higher risk.","Drain below chest, closed, patent, not routinely clamped.","Tube out: cover/assess/call. Tube kinked: unkink/assess.","Recurrence/persistent leak → definitive pleural/thoracic evaluation."],
 sourceBasis:["British Thoracic Society 2023 Pleural Disease Guideline — Pneumothorax","ERS/EACTS/ESTS guideline on adult spontaneous pneumothorax","NCSBN 2026 NCLEX-RN Test Plan"],sourceAsOf:"2026-08"
}
];

if(rnPneumothoraxCramLessons.length!==2)throw new Error(`RN_PTX_CRAM_COUNT_INVALID:${rnPneumothoraxCramLessons.length}`);
for(const c of rnPneumothoraxCramLessons){for(const [field,values] of Object.entries({mechanism:c.mechanism,recognize:c.recognize,diagnosticsMonitoring:c.diagnosticsMonitoring,priorityActions:c.priorityActions,medicationSafety:c.medicationSafety,redFlags:c.redFlags,complications:c.complications,examTraps:c.examTraps,rapidReview:c.rapidReview})){if(values.length<2||values.some(v=>!v.trim()))throw new Error(`RN_PTX_CRAM_FIELD_INVALID:${c.countryCode}/${field}`);}if(c.sourceBasis.length<2)throw new Error(`RN_PTX_CRAM_SOURCES_MISSING:${c.countryCode}`);}
export function getRnPneumothoraxCram(countryCode:"CA"|"US"){return rnPneumothoraxCramLessons.find(c=>c.countryCode===countryCode);}
