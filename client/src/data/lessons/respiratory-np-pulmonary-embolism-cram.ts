import { respiratoryNpPulmonaryEmbolismFullLessons } from "./respiratory-np-pulmonary-embolism-full";

export interface NpPulmonaryEmbolismCram {
  id:string; fullLessonKey:string; tier:"np"; countryCode:"CA"|"US"; regionScope:"CAN"|"US";
  exam:"CNPLE"|"AANP-FNP"; bodySystem:"Respiratory"; topic:"Pulmonary Embolism"; title:string; bottomLine:string;
  mechanism:string[]; recognize:string[]; diagnosticsMonitoring:string[]; priorityActions:string[]; medicationSafety:string[];
  redFlags:string[]; complications:string[]; examTraps:string[]; rapidReview:string[]; sourceBasis:string[]; sourceAsOf:"2026-08";
}

const keys={CA:"pulmonary-embolism-np-ca-cnple-2026",US:"pulmonary-embolism-np-us-aanp-fnp-2026"} as const;
for(const [country,key] of Object.entries(keys)){if(!respiratoryNpPulmonaryEmbolismFullLessons[key])throw new Error(`NP_PE_FULL_MISSING:${country}/${key}`);}

export const npPulmonaryEmbolismCramLessons:NpPulmonaryEmbolismCram[]=[
{
  id:"cram-np-ca-cnple-pe-20260807",fullLessonKey:keys.CA,tier:"np",countryCode:"CA",regionScope:"CAN",exam:"CNPLE",bodySystem:"Respiratory",topic:"Pulmonary Embolism",title:"Pulmonary Embolism — Canadian NP CNPLE Cram",
  bottomLine:"Start with hemodynamic stability and pretest probability. Use D-dimer only when the probability is low/intermediate enough for a negative result to matter; choose CTPA or V/Q rationally; anticoagulate most confirmed PE when safe; and treat PE-related shock as an urgent reperfusion problem. Pregnancy, cancer, bleeding risk and provoking factors materially change drug choice and duration.",
  mechanism:["Pulmonary arterial obstruction increases dead space and RV afterload.","Acute RV dilation can reduce LV preload and cause obstructive shock.","Persistent thromboembolic obstruction can lead to chronic thromboembolic pulmonary hypertension."],
  recognize:["Dyspnea, pleuritic pain, tachycardia, hypoxemia or DVT findings in the right risk context.","Syncope, hypotension, RV failure or poor perfusion signal high-risk PE.","Persistent dyspnea months after PE requires post-PE/CTEPH evaluation rather than dismissal."],
  diagnosticsMonitoring:["Use validated pretest probability before D-dimer.","Use CTPA or V/Q based on renal function, contrast, pregnancy and local imaging context.","Use troponin/BNP and RV imaging for prognostic stratification after PE is established, not as stand-alone diagnosis.","In unstable suspected PE, bedside echo/expedited imaging can support urgent decisions when transport is unsafe."],
  priorityActions:["Anticoagulate promptly when PE is confirmed/highly suspected and bleeding risk permits.","Use validated low-risk criteria plus reliable medication access/follow-up before outpatient management.","Escalate shock/hypotension to systemic, catheter-directed or surgical reperfusion evaluation.","Clarify anticoagulant duration and post-PE follow-up at transition of care."],
  medicationSafety:["DOACs require renal/hepatic/interaction review and strict adherence; they are avoided in pregnancy.","LMWH is preferred in pregnancy and may be favoured in selected cancer/high-bleeding contexts.","UFH is useful when rapid interruption/reversal may be needed.","Systemic thrombolysis carries major/intracranial bleeding risk and is not routine for every normotensive PE."],
  redFlags:["Shock or persistent hypotension","Syncope with RV failure","Severe hypoxemia","Cardiac arrest","New neurologic deficit or major bleeding after lysis"],
  complications:["Obstructive shock","Recurrent VTE","Major anticoagulant/reperfusion bleeding","HIT","CTEPH/post-PE syndrome"],
  examTraps:["Ordering D-dimer without first considering probability.","Calling RV strain diagnostic proof of PE.","Using DOACs in pregnancy.","Placing routine IVC filters when effective anticoagulation is possible.","Automatically stopping therapy at a fixed short interval after unprovoked PE without recurrence/bleeding reassessment."],
  rapidReview:["Probability before D-dimer.","Pregnancy = LMWH.","Shock = reperfusion decision.","IVC filter selective, not routine.","Persistent dyspnea after PE = evaluate CTEPH/post-PE syndrome."],
  sourceBasis:["Thrombosis Canada Pulmonary Embolism Clinical Guide","CCRNR Canadian Nurse Practitioner Examination Blueprint"],sourceAsOf:"2026-08"
},
{
  id:"cram-np-us-aanp-fnp-pe-20260807",fullLessonKey:keys.US,tier:"np",countryCode:"US",regionScope:"US",exam:"AANP-FNP",bodySystem:"Respiratory",topic:"Pulmonary Embolism",title:"Pulmonary Embolism — U.S. AANP-FNP Cram",
  bottomLine:"Use pretest probability to decide whether PERC, D-dimer, CTPA or V/Q is appropriate. Once PE is confirmed, separate low-risk outpatient candidates from intermediate-risk RV-strain patients and high-risk shock; choose anticoagulation around pregnancy, cancer, organ function, interactions and bleeding risk; and own duration and post-PE follow-up.",
  mechanism:["Embolic obstruction raises pulmonary vascular resistance and RV afterload.","Severe RV pressure overload reduces left-heart filling and systemic output.","Unresolved organized thrombus can cause chronic thromboembolic pulmonary hypertension."],
  recognize:["Pleuritic dyspnea/tachycardia/hypoxemia in the right VTE-risk context.","Hypotension or shock defines a high-risk syndrome, not simply a large clot on imaging.","Persistent exertional limitation after treatment can represent post-PE syndrome or CTEPH."],
  diagnosticsMonitoring:["PERC is only for appropriately very-low-risk patients.","Age-adjusted D-dimer can reduce unnecessary imaging in suitable older low/intermediate-risk patients.","Choose CTPA vs V/Q based on contrast/renal/pregnancy and image quality considerations.","Troponin/BNP/RV imaging risk-stratify normotensive confirmed PE."],
  priorityActions:["Anticoagulate most confirmed PE when safe.","Outpatient treatment requires validated low risk plus reliable access and follow-up.","High-risk PE with shock requires urgent reperfusion evaluation.","Reassess persistent symptoms and treatment duration rather than treating anticoagulation as a one-time prescription."],
  medicationSafety:["DOACs are appropriate for many stable nonpregnant patients but require interaction/renal/hepatic review.","Pregnancy favours LMWH.","Cancer-associated VTE selection depends on bleeding site, interactions and patient factors.","Systemic lysis is not automatic for normotensive RV strain and requires bleeding-risk assessment."],
  redFlags:["Shock/hypotension","Severe RV dysfunction with deterioration","Cardiac arrest","Major bleeding","New severe headache/focal deficit after thrombolysis"],
  complications:["Recurrent VTE","Major bleeding","HIT","Post-PE syndrome","CTEPH"],
  examTraps:["Using PERC outside a very-low-risk population.","Using D-dimer as the sole rule-out strategy in high probability.","Routine IVC-filter placement despite safe anticoagulation.","Treating all cancer-associated PE with one anticoagulant regardless of bleeding site/interactions.","Ignoring persistent dyspnea after treatment."],
  rapidReview:["Probability first.","PERC only if very low risk.","DOAC many stable patients; LMWH pregnancy.","Shock = reperfusion.","Follow persistent dyspnea and duration."],
  sourceBasis:["Current U.S. pulmonary embolism guideline/consensus guidance","AANPCB Family Nurse Practitioner Exam Blueprint"],sourceAsOf:"2026-08"
}
];
for(const c of npPulmonaryEmbolismCramLessons){for(const [field,values] of Object.entries({mechanism:c.mechanism,recognize:c.recognize,diagnosticsMonitoring:c.diagnosticsMonitoring,priorityActions:c.priorityActions,medicationSafety:c.medicationSafety,redFlags:c.redFlags,complications:c.complications,examTraps:c.examTraps,rapidReview:c.rapidReview})){if(values.length<2||values.some(v=>!v.trim()))throw new Error(`NP_PE_CRAM_FIELD_INVALID:${c.exam}/${field}`);}if(c.sourceBasis.length<2)throw new Error(`NP_PE_CRAM_SOURCES_MISSING:${c.exam}`);}
export function getNpPulmonaryEmbolismCram(exam:"CNPLE"|"AANP-FNP"){return npPulmonaryEmbolismCramLessons.find(c=>c.exam===exam);}
