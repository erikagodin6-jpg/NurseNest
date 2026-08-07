import { buildCardiovascularLesson, type CardiovascularLessonSeed } from "./cardiovascular-rn-types";
const seeds: CardiovascularLessonSeed[] = [
{
  "title": "Heart Failure Management",
  "summary": "Heart failure means the heart cannot meet metabolic demand without elevated filling pressures.",
  "bottomLine": "Heart failure means the heart cannot meet metabolic demand without elevated filling pressures. NCLEX questions usually test congestion, perfusion, medication safety, and recognition of acute decompensation.",
  "pathophysiology": [
    "HFrEF primarily reflects impaired systolic contraction and reduced ejection fraction; HFpEF primarily reflects impaired relaxation and a stiff ventricle.",
    "Reduced forward flow activates the sympathetic nervous system and RAAS, increasing heart rate, vasoconstriction, sodium retention, and ventricular remodeling.",
    "Left-sided congestion produces pulmonary symptoms; right-sided congestion produces systemic venous findings. Many patients have features of both."
  ],
  "assessment": [
    "Dyspnea, orthopnea, paroxysmal nocturnal dyspnea, fatigue, reduced exercise tolerance.",
    "Crackles, S3, elevated JVP, peripheral edema, hepatomegaly, rapid weight gain.",
    "Poor perfusion: cool extremities, confusion, narrow pulse pressure, oliguria, worsening renal function."
  ],
  "diagnostics": [
    "BNP/NT-proBNP supports the diagnosis when interpreted in context; trend rather than memorizing one cut-off.",
    "Echocardiography defines EF, chamber size, valve disease, and structural abnormalities.",
    "ECG, chest imaging, electrolytes, creatinine, and troponin help identify triggers and complications."
  ],
  "management": [
    "Treat precipitating causes such as ischemia, dysrhythmia, uncontrolled hypertension, infection, medication nonadherence, or excess sodium/fluid.",
    "Acute congestion is commonly treated with IV loop diuretics; oxygen is used for hypoxemia, not automatically for every patient.",
    "Chronic HFrEF guideline-directed therapy generally includes an ARNI/ACE inhibitor/ARB, evidence-based beta blocker, mineralocorticoid receptor antagonist, and SGLT2 inhibitor when appropriate."
  ],
  "medications": [
    {"medication":"Furosemide","classOrRole":"Loop diuretic","whyUsed":"Relieves congestion","nursingSafety":"Monitor BP, urine output, potassium, magnesium, renal function; rapid IV administration can contribute to ototoxicity."},
    {"medication":"Sacubitril/valsartan","classOrRole":"ARNI","whyUsed":"Reduces neurohormonal activation and remodeling","nursingSafety":"Do not overlap with an ACE inhibitor; a washout period is required because of angioedema risk."},
    {"medication":"Metoprolol succinate / carvedilol","classOrRole":"Evidence-based beta blockers","whyUsed":"Reduce sympathetic injury and mortality in stable HFrEF","nursingSafety":"Do not initiate or aggressively up-titrate during unstable decompensation; monitor HR, BP, and worsening congestion."}
  ],
  "priorities": [
    "Daily weights using the same scale and conditions; trend intake/output and edema.",
    "Assess response to diuresis by symptoms, lung sounds, weight, urine output, and perfusion—not urine output alone.",
    "Teach medication adherence, sodium awareness, symptom zones, and when to report rapid weight gain or worsening dyspnea."
  ],
  "redFlags": [
    "New severe dyspnea at rest, pink frothy sputum, rapidly worsening hypoxemia.",
    "New confusion, oliguria, cool clammy skin, hypotension, or signs of cardiogenic shock.",
    "New chest pain or malignant dysrhythmia."
  ],
  "traps": [
    "An S3 in an adult with dyspnea suggests volume overload; an S4 is more associated with a stiff ventricle.",
    "Do not give large fluid boluses reflexively to a congested patient with poor perfusion.",
    "Beta blockers are beneficial chronically but can worsen an acutely unstable low-output state if started or rapidly increased at the wrong time."
  ],
  "clinicalJudgment": "A patient with chronic HFrEF gains 3 kg in four days, has new orthopnea and bibasilar crackles. Recognize fluid overload, assess oxygenation and perfusion, verify medication/diuretic adherence, anticipate diuresis, and escalate if respiratory distress or hypotension develops."
},
{
  "title": "Acute Coronary Syndrome",
  "summary": "ACS is acute myocardial ischemia caused by a sudden reduction in coronary blood flow.",
  "bottomLine": "ACS is acute myocardial ischemia caused by a sudden reduction in coronary blood flow. NCLEX priorities are rapid recognition, 12-lead ECG, antiplatelet therapy when appropriate, reperfusion, and monitoring for lethal complications.",
  "pathophysiology": [
    "Plaque rupture or erosion can trigger platelet activation and thrombus formation.",
    "STEMI usually reflects complete acute coronary occlusion; NSTEMI typically reflects partial occlusion or severe supply-demand mismatch with myocardial necrosis.",
    "Ischemic myocardium becomes electrically unstable before necrosis is complete, which is why dysrhythmias can occur early."
  ],
  "assessment": [
    "Pressure, heaviness, squeezing, or discomfort in chest, arm, jaw, back, or epigastrium; dyspnea, diaphoresis, nausea, unexplained weakness may predominate.",
    "Older adults, women, and people with diabetes may present atypically.",
    "Watch for hypotension, new crackles, S3, new murmur, brady/tachydysrhythmia, or altered mental status."
  ],
  "diagnostics": [
    "Obtain a 12-lead ECG rapidly and repeat if symptoms persist or evolve.",
    "Serial high-sensitivity troponin identifies myocardial injury and trends infarction.",
    "Continuous rhythm monitoring, electrolytes, renal function, CBC/coagulation studies, and chest imaging as clinically indicated."
  ],
  "management": [
    "Activate the ACS pathway and prepare for urgent reperfusion when indicated.",
    "Aspirin is foundational unless contraindicated; additional antiplatelet and anticoagulant therapy is selected by the clinical team.",
    "Nitroglycerin can relieve ischemic discomfort but is unsafe with significant hypotension, certain right-ventricular infarctions, or recent PDE-5 inhibitor exposure.",
    "Do not delay reperfusion for low-priority tasks."
  ],
  "medications": [
    {"medication":"Aspirin","classOrRole":"Antiplatelet","whyUsed":"Irreversibly inhibits platelet COX-1","nursingSafety":"Check allergy and active bleeding; chewable non-enteric-coated aspirin is used for rapid effect in suspected ACS when appropriate."},
    {"medication":"Nitroglycerin","classOrRole":"Nitrate","whyUsed":"Venodilation lowers preload and myocardial oxygen demand; also dilates coronary arteries","nursingSafety":"Check BP and PDE-5 inhibitor use; reassess pain and hemodynamics after each dose."},
    {"medication":"P2Y12 inhibitor","classOrRole":"Antiplatelet","whyUsed":"Adds platelet inhibition to aspirin","nursingSafety":"Bleeding risk and timing around PCI/CABG matter."}
  ],
  "priorities": [
    "Keep the patient on continuous telemetry and reassess pain, BP, rhythm, and respiratory status.",
    "Establish IV access, obtain labs, and prepare for PCI without delaying time-sensitive therapy.",
    "Recognize mechanical complications: new murmur, acute pulmonary edema, sudden hypotension, or recurrent severe chest pain."
  ],
  "redFlags": [
    "Persistent/recurrent ischemic pain with ST changes.",
    "Ventricular tachycardia/fibrillation, high-grade heart block, cardiogenic shock.",
    "New holosystolic murmur with instability, acute pulmonary edema, or signs of free-wall rupture/tamponade."
  ],
  "traps": [
    "Oxygen is not automatic; use it for hypoxemia or another clear indication.",
    "Do not choose 'get a full history' before obtaining an ECG in active suspected ACS.",
    "Inferior MI can involve the right ventricle and conduction system; hypotension and bradycardia change nitrate safety."
  ],
  "clinicalJudgment": "A patient arrives with crushing chest pressure, diaphoresis, and ST elevation. Prioritize ECG confirmation and the reperfusion pathway, aspirin if appropriate, continuous monitoring, IV access, and rapid assessment for contraindications to ordered therapies."
},
{
  "title": "Hypertension Management",
  "summary": "Hypertension is usually silent until target-organ damage occurs.",
  "bottomLine": "Hypertension is usually silent until target-organ damage occurs. NCLEX questions focus on accurate measurement, medication adherence, lifestyle changes, and distinguishing chronic hypertension from hypertensive emergency.",
  "pathophysiology": [
    "Persistent arterial pressure increases afterload and promotes endothelial injury, LV hypertrophy, nephrosclerosis, retinopathy, and cerebrovascular disease.",
    "Most adult hypertension is primary; secondary causes include renal disease, endocrine disorders, sleep apnea, and medications/substances.",
    "Treatment reduces long-term stroke, MI, heart failure, kidney disease, and mortality risk."
  ],
  "assessment": [
    "Usually asymptomatic.",
    "Look for target-organ effects: LVH, kidney dysfunction, retinal changes, vascular disease, neurologic deficits.",
    "Confirm technique: appropriate cuff size, seated rest, arm supported at heart level, repeated readings."
  ],
  "diagnostics": [
    "Repeated office and/or out-of-office measurements establish the diagnosis.",
    "Baseline renal function, electrolytes, glucose/A1c, lipids, urinalysis/albuminuria, and ECG help assess risk and organ damage.",
    "Investigate secondary causes when presentation is severe, resistant, abrupt, or atypical."
  ],
  "management": [
    "Use lifestyle measures plus medication according to cardiovascular risk and BP severity.",
    "Common first-line classes include thiazide-type diuretics, ACE inhibitors/ARBs, and calcium-channel blockers depending on comorbidities.",
    "Use combination therapy when needed; simplify regimens to improve adherence."
  ],
  "medications": [
    {"medication":"ACE inhibitor / ARB","classOrRole":"RAAS blocker","whyUsed":"Reduces vasoconstriction and aldosterone effects","nursingSafety":"Monitor potassium and creatinine; contraindicated in pregnancy; ACE inhibitors can cause cough/angioedema."},
    {"medication":"Thiazide-type diuretic","classOrRole":"Diuretic","whyUsed":"Reduces sodium/volume, then vascular resistance","nursingSafety":"Monitor sodium, potassium, uric acid, glucose, and volume status."},
    {"medication":"Amlodipine","classOrRole":"DHP calcium-channel blocker","whyUsed":"Arteriolar vasodilation","nursingSafety":"Peripheral edema, flushing, headache; edema is not automatically heart failure."}
  ],
  "priorities": [
    "Validate home BP technique and medication list, including NSAIDs, decongestants, stimulants, and supplements.",
    "Teach that treatment continues even when the patient feels well.",
    "Assess orthostatic symptoms, especially after medication changes and in older adults."
  ],
  "redFlags": [
    "Severe BP elevation with acute neurologic deficit, chest pain, pulmonary edema, aortic syndrome, AKI, or retinal injury.",
    "Syncope or symptomatic hypotension after treatment.",
    "Rapid renal deterioration or severe hyperkalemia after RAAS blockade."
  ],
  "traps": [
    "Do not treat a single poorly measured BP reading as a diagnosis.",
    "Hypertensive emergency is defined by acute target-organ injury, not the BP number alone.",
    "Never tell a patient to stop antihypertensives abruptly because the pressure is currently normal."
  ],
  "clinicalJudgment": "A patient with long-standing hypertension says the medication is unnecessary because there are no symptoms. Teach that hypertension is commonly asymptomatic and treatment prevents cumulative target-organ injury."
},
{
  "title": "Cardiac Arrhythmias",
  "summary": "Arrhythmia questions are pattern-recognition plus patient stability.",
  "bottomLine": "Arrhythmia questions are pattern-recognition plus patient stability. First decide whether the rhythm is causing poor perfusion; then identify the rhythm and choose the next safe action.",
  "pathophysiology": [
    "Abnormal automaticity, triggered activity, or re-entry can alter rate and conduction.",
    "Electrolyte disturbances, ischemia, hypoxia, medications, structural heart disease, and autonomic changes are common triggers.",
    "The same ECG rhythm can require different urgency depending on BP, mentation, chest pain, heart failure, and pulse."
  ],
  "assessment": [
    "Palpitations, dizziness, syncope, chest discomfort, dyspnea, fatigue.",
    "Poor perfusion: hypotension, confusion, ischemic chest pain, acute heart failure, shock.",
    "Always assess the patient and pulse before treating the monitor."
  ],
  "diagnostics": [
    "12-lead ECG confirms rhythm and conduction abnormalities.",
    "Check potassium, magnesium, oxygenation, ischemia markers, thyroid function, and medication causes when appropriate.",
    "Telemetry trends help detect intermittent episodes."
  ],
  "management": [
    "Unstable tachyarrhythmia with a pulse generally requires synchronized cardioversion; pulseless VT/VF requires defibrillation and CPR.",
    "Symptomatic bradycardia is managed according to perfusion and ACLS principles.",
    "Atrial fibrillation management includes rate/rhythm strategy plus thromboembolic risk assessment."
  ],
  "medications": [
    {"medication":"Adenosine","classOrRole":"AV nodal blocker","whyUsed":"Transiently interrupts AV nodal conduction in selected regular narrow-complex SVT","nursingSafety":"Give rapid IV push with immediate flush; expect brief flushing/chest pressure; not for irregular wide-complex rhythms."},
    {"medication":"Amiodarone","classOrRole":"Antiarrhythmic","whyUsed":"Blocks multiple cardiac ion channels","nursingSafety":"Monitor QT, bradycardia, hypotension and long-term pulmonary, thyroid, hepatic effects."},
    {"medication":"Anticoagulant","classOrRole":"Thromboembolism prevention","whyUsed":"Reduces embolic stroke risk in appropriate AF patients","nursingSafety":"Bleeding precautions and indication-specific dosing/renal adjustment."}
  ],
  "priorities": [
    "Assess hemodynamic stability first.",
    "Correct reversible causes such as hypoxia and potassium/magnesium abnormalities.",
    "Document rhythm strips before and after interventions when this does not delay emergency treatment."
  ],
  "redFlags": [
    "Pulseless rhythm, sustained VT/VF, torsades with instability.",
    "New high-grade AV block with poor perfusion.",
    "Rapid AF/flutter with hypotension, ischemia, acute heart failure, or altered mental status."
  ],
  "traps": [
    "Do not defibrillate a stable SVT with a pulse.",
    "Do not give adenosine just because the rate is fast; rhythm regularity and QRS pattern matter.",
    "Pacemaker spikes without a following depolarization indicate failure to capture."
  ],
  "clinicalJudgment": "A telemetry patient suddenly has a wide-complex tachycardia at 190/min and becomes hypotensive and confused. Treat the patient as unstable; prepare for synchronized cardioversion if a pulse is present and follow ACLS if pulseless."
},
{
  "title": "Peripheral Vascular Disease",
  "summary": "Peripheral arterial disease is a perfusion problem.",
  "bottomLine": "Peripheral arterial disease is a perfusion problem. NCLEX contrasts it with venous disease: arterial disease is cool, pale, painful and pulse-poor; venous disease is warm, edematous, and stasis-prone.",
  "pathophysiology": [
    "Atherosclerotic narrowing reduces arterial flow to the legs.",
    "Demand ischemia causes intermittent claudication; progression can produce rest pain, ulcers, and critical limb ischemia.",
    "Diabetes and tobacco exposure accelerate endothelial injury and small-vessel disease."
  ],
  "assessment": [
    "Intermittent claudication, rest pain, cool skin, pallor with elevation, dependent rubor.",
    "Decreased/absent pulses, delayed capillary refill, shiny hairless skin.",
    "Arterial ulcers are often distal/toe-based, painful, punched-out, and poorly perfused."
  ],
  "diagnostics": [
    "Ankle-brachial index is a common noninvasive screening test; very high values may reflect noncompressible calcified vessels.",
    "Doppler, duplex ultrasound, CTA/MRA, or angiography define anatomy when intervention is considered.",
    "Assess lipids, diabetes, renal function, and overall cardiovascular risk."
  ],
  "management": [
    "Smoking cessation, antiplatelet/statin therapy when indicated, risk-factor control, and structured walking exercise are core management.",
    "Revascularization is considered for limb-threatening ischemia or lifestyle-limiting symptoms despite therapy.",
    "Protect feet and avoid thermal injury."
  ],
  "medications": [
    {"medication":"Statin","classOrRole":"Lipid-lowering therapy","whyUsed":"Reduces ASCVD risk and plaque events","nursingSafety":"Monitor for muscle symptoms and clinically indicated liver testing."},
    {"medication":"Antiplatelet agent","classOrRole":"Platelet inhibitor","whyUsed":"Reduces arterial thrombotic events","nursingSafety":"Monitor bleeding; distinguish from anticoagulants."},
    {"medication":"Cilostazol","classOrRole":"PDE-3 inhibitor","whyUsed":"Can improve claudication walking distance","nursingSafety":"Contraindicated in heart failure."}
  ],
  "priorities": [
    "Assess pulses bilaterally and mark/compare when acute changes occur.",
    "Keep the limb in a dependent or neutral position when severe arterial perfusion is a concern unless otherwise directed.",
    "Do not apply compression to significant arterial insufficiency without confirming it is safe."
  ],
  "redFlags": [
    "Six Ps of acute arterial occlusion: pain, pallor, pulselessness, paresthesia, paralysis, poikilothermia.",
    "New rest pain, nonhealing ulcer, gangrene, or rapidly changing pulse.",
    "Sudden limb ischemia after vascular procedure."
  ],
  "traps": [
    "Arterial = down/dependent can improve flow; venous = elevation/compression often helps.",
    "Compression stockings are not a generic answer for every leg ulcer.",
    "Do not use heating pads on ischemic or neuropathic feet."
  ],
  "clinicalJudgment": "A patient with PAD develops sudden severe leg pain, pallor, numbness, and an absent pedal pulse. Recognize acute arterial occlusion and escalate urgently rather than trying exercise, elevation, or compression."
}
];

export const cardiovascularRnBatch1 = Object.fromEntries(
  seeds.map((seed) => [seed.title, buildCardiovascularLesson(seed)]),
);
