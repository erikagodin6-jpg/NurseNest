import { buildCardiovascularLesson, type CardiovascularLessonSeed } from "./cardiovascular-rn-types";
const seeds: CardiovascularLessonSeed[] = [
{
  "title": "Deep Vein Thrombosis",
  "summary": "DVT is a venous thrombus that can embolize to the lungs.",
  "bottomLine": "DVT is a venous thrombus that can embolize to the lungs. NCLEX priorities are prevention, recognition, anticoagulation safety, and avoiding actions that could dislodge a clot.",
  "pathophysiology": ["Virchow triad: venous stasis, endothelial injury, and hypercoagulability.","Common risks include immobility, surgery/trauma, malignancy, estrogen exposure, pregnancy/postpartum, thrombophilia, and prior VTE.","Thrombus extension or embolization can produce pulmonary embolism."],
  "assessment": ["Unilateral swelling, warmth, erythema, heaviness or tenderness may occur, but DVT can be silent.","Compare limb circumference and assess risk factors rather than relying on Homan sign.","Sudden dyspnea, pleuritic chest pain, tachycardia, syncope, or hypoxemia suggests possible PE."],
  "diagnostics": ["Compression ultrasonography is the usual first-line diagnostic test.","D-dimer is useful mainly to exclude VTE in appropriately selected lower-risk patients.","Additional imaging depends on location and clinical probability."],
  "management": ["Therapeutic anticoagulation is standard for most confirmed DVTs unless contraindicated.","Early ambulation is generally appropriate after anticoagulation is started and the patient is stable; prolonged bedrest is not routinely required.","Compression may be used for symptom management when appropriate, but it does not replace anticoagulation."],
  "medications": [
    {"medication":"Heparin / LMWH","classOrRole":"Anticoagulant","whyUsed":"Prevents clot propagation","nursingSafety":"Monitor bleeding; UFH often uses aPTT or anti-Xa per protocol; monitor platelets for HIT."},
    {"medication":"Apixaban / rivaroxaban","classOrRole":"Direct oral anticoagulant","whyUsed":"Inhibits factor Xa","nursingSafety":"Check renal function, adherence, bleeding risk, and interacting drugs."},
    {"medication":"Warfarin","classOrRole":"Vitamin K antagonist","whyUsed":"Reduces synthesis of vitamin K-dependent clotting factors","nursingSafety":"INR monitoring; many drug/food interactions; overlap requirements vary by indication and regimen."}
  ],
  "priorities": ["Use mechanical and pharmacologic prophylaxis when indicated.","Do not massage a suspected DVT.","Teach bleeding precautions, adherence, and warning signs of PE."],
  "redFlags": ["New chest pain, dyspnea, syncope, hemoptysis, or unexplained tachycardia.","Phlegmasia with massive swelling, cyanosis, severe pain, or threatened limb.","Major bleeding while anticoagulated."],
  "traps": ["Homan sign is neither sensitive nor specific and should not be used to diagnose DVT.","Do not massage the affected calf.","Anticoagulants prevent extension/new clot; they do not instantly dissolve the existing thrombus."],
  "clinicalJudgment": "A postoperative patient develops unilateral calf swelling and warmth. Stop routine ambulation until evaluated, notify the team, anticipate ultrasound, and monitor closely for PE symptoms."
},
{
  "title": "Valvular Heart Disease",
  "summary": "Valve disease changes pressure and volume loading.",
  "bottomLine": "Valve disease changes pressure and volume loading. NCLEX questions usually ask you to connect the valve lesion to murmur location, chamber stress, symptoms, and decompensation.",
  "pathophysiology": ["Stenosis obstructs forward flow and creates pressure overload; regurgitation allows backward flow and creates volume overload.","Aortic stenosis stresses the LV; mitral stenosis raises left atrial and pulmonary pressures; mitral regurgitation can cause pulmonary congestion and LV volume overload.","Chronic compensation can fail abruptly when dysrhythmia, infection, ischemia, or volume shifts occur."],
  "assessment": ["Exertional dyspnea, fatigue, decreased exercise tolerance, palpitations.","Aortic stenosis: exertional angina, syncope, dyspnea; harsh systolic murmur radiating to carotids.","Mitral regurgitation: holosystolic apical murmur radiating toward axilla; mitral stenosis: opening snap/diastolic rumble."],
  "diagnostics": ["Echocardiography defines anatomy, severity, gradients, valve area, chamber response, and EF.","ECG may show chamber enlargement or AF; chest imaging can show congestion.","Cardiac catheterization is used selectively before intervention or when noninvasive data are discordant."],
  "management": ["Manage symptoms and complications while planning repair or replacement when severe disease meets criteria.","Rate control and anticoagulation may be required in atrial fibrillation depending on lesion and stroke risk.","Valve intervention may be surgical or transcatheter depending on valve, severity, anatomy, age, risk, and team assessment."],
  "medications": [
    {"medication":"Diuretic","classOrRole":"Symptom relief","whyUsed":"Reduces congestion","nursingSafety":"Avoid excessive preload reduction in preload-dependent severe stenosis."},
    {"medication":"Anticoagulant","classOrRole":"Stroke prevention when indicated","whyUsed":"Prevents thromboembolism","nursingSafety":"Mechanical valves require vitamin K antagonist therapy; DOACs are not used for mechanical prosthetic valves."},
    {"medication":"Beta blocker / rate-control agent","classOrRole":"Rate control in selected patients","whyUsed":"Lengthens diastole and controls ventricular response","nursingSafety":"Monitor bradycardia and hypotension; lesion-specific considerations matter."}
  ],
  "priorities": ["Assess for new AF, worsening dyspnea, syncope, angina, pulmonary edema, or reduced exercise tolerance.","Know prosthetic valve anticoagulation and endocarditis-prevention teaching.","After valve intervention, monitor rhythm, perfusion, bleeding, and vascular access complications."],
  "redFlags": ["Syncope or angina with severe aortic stenosis.","Acute severe mitral regurgitation with pulmonary edema and hypotension.","New prosthetic valve dysfunction, embolic signs, or endocarditis symptoms."],
  "traps": ["Do not treat all murmurs as benign.","Mechanical valve = lifelong warfarin-type anticoagulation; bioprosthetic management differs.","New murmur after MI can signal papillary muscle rupture or VSD and is an emergency."],
  "clinicalJudgment": "A patient with known severe aortic stenosis develops exertional syncope and chest pressure. Recognize symptomatic severe valve disease and escalate; this is not routine 'monitor at next visit' territory."
},
{
  "title": "Cardiac Catheterization",
  "summary": "Cardiac catheterization can diagnose coronary disease and support PCI.",
  "bottomLine": "Cardiac catheterization can diagnose coronary disease and support PCI. Nursing priorities are allergy/renal/bleeding risk before the procedure and vascular, rhythm, perfusion, and contrast-related complications afterward.",
  "pathophysiology": ["Arterial access allows coronary angiography and pressure measurement; PCI can dilate a stenosis and deploy a stent.","Radial access generally allows earlier mobility and has lower access-site bleeding risk than femoral access in many settings.","Contrast exposure and antithrombotic therapy create renal and bleeding considerations."],
  "assessment": ["Before: baseline pulses, renal function, bleeding history, allergies, medication reconciliation, NPO/consent status per local policy.","After: access-site bleeding/hematoma, distal pulses, skin temperature/color, pain, BP, rhythm, chest symptoms.","Watch for recurrent ischemia or abrupt vessel closure after PCI."],
  "diagnostics": ["Creatinine/eGFR, CBC, coagulation studies as clinically indicated.","Continuous ECG and hemodynamic monitoring during/after intervention.","Post-procedure labs depend on clinical course and complications."],
  "management": ["Maintain ordered hydration when appropriate to support contrast clearance.","Follow access-specific activity restrictions and hemostasis-device protocols.","Dual antiplatelet therapy after stent placement is critical unless the cardiology team changes the plan."],
  "medications": [
    {"medication":"Iodinated contrast","classOrRole":"Diagnostic agent","whyUsed":"Visualizes coronary anatomy","nursingSafety":"Assess prior contrast reaction and renal risk; metformin management follows local/current policy and renal function."},
    {"medication":"Heparin","classOrRole":"Procedural anticoagulant","whyUsed":"Reduces thrombosis during PCI","nursingSafety":"Monitor bleeding and ACT/other protocol targets."},
    {"medication":"P2Y12 inhibitor","classOrRole":"Antiplatelet","whyUsed":"Prevents stent thrombosis","nursingSafety":"Premature discontinuation can be catastrophic; reinforce adherence."}
  ],
  "priorities": ["Check distal neurovascular status and compare with baseline.","Apply pressure and escalate for active bleeding; do not repeatedly lift a dressing to 'check' uncontrolled hemorrhage.","Teach access-site care and when to seek help after discharge."],
  "redFlags": ["Expanding hematoma, uncontrolled bleeding, hypotension, back/flank pain after femoral access.","Pain, pallor, pulselessness, paresthesia, paralysis, cool limb distal to access.","New chest pain/ST change after PCI."],
  "traps": ["Femoral retroperitoneal bleeding can present with back/flank pain and hypotension without obvious external bleeding.","Do not flex the affected hip early after femoral access when ordered to remain flat.","After radial access, hand perfusion matters just as much as the wrist dressing."],
  "clinicalJudgment": "Several hours after femoral cath, a patient becomes hypotensive and reports new back pain; the groin site looks dry. Suspect concealed retroperitoneal bleeding and escalate immediately."
},
{
  "title": "Pacemaker and ICD Management",
  "summary": "Pacemakers treat clinically important bradyarrhythmias; ICDs detect and terminate dangerous ventricular tachyarrhythmias.",
  "bottomLine": "Pacemakers treat clinically important bradyarrhythmias; ICDs detect and terminate dangerous ventricular tachyarrhythmias. NCLEX tests sensing, capture, device complications, and patient teaching.",
  "pathophysiology": ["A pacemaker delivers an electrical stimulus when intrinsic rate/conduction is inadequate.","An ICD can pace, perform antitachycardia pacing, and deliver shocks for programmed ventricular rhythms.","Device function depends on lead position, sensing thresholds, capture thresholds, battery status, and programming."],
  "assessment": ["Assess pulse and rhythm, symptoms, incision, and device identification.","Failure to capture: pacing spike not followed by expected depolarization.","Failure to sense: inappropriate pacing because intrinsic beats are not recognized; failure to pace: no spike when one is needed."],
  "diagnostics": ["12-lead ECG and telemetry help identify malfunction.","Device interrogation provides battery, lead, sensing, capture, and event data.","Chest imaging after new implantation can assess lead position and pneumothorax when indicated."],
  "management": ["Treat unstable bradycardia according to ACLS while troubleshooting the device.","Correct reversible causes such as electrolyte abnormalities or lead displacement.","ICD shocks for recurrent VT/VF require rhythm assessment and device interrogation."],
  "medications": [
    {"medication":"Atropine","classOrRole":"Anticholinergic","whyUsed":"Temporizing treatment for selected symptomatic bradycardia","nursingSafety":"May be ineffective in some high-grade/infranodal blocks; prepare for pacing if unstable."},
    {"medication":"Antiarrhythmic therapy","classOrRole":"Rhythm suppression","whyUsed":"May reduce recurrent ventricular arrhythmias/ICD therapies","nursingSafety":"Drug choice depends on rhythm and structural disease; monitor QT and organ toxicity where relevant."}
  ],
  "priorities": ["After implantation, monitor site bleeding, infection, pneumothorax symptoms, and rhythm.","Teach device card/medical identification and follow-up interrogation schedule.","Clarify realistic electromagnetic precautions; ordinary household electronics are generally not a reason for isolation."],
  "redFlags": ["Multiple ICD shocks, syncope, chest pain, or ongoing VT.","Pacemaker malfunction with hypotension, altered mental status, ischemia, or acute heart failure.","New dyspnea after implantation suggesting pneumothorax or lead complication."],
  "traps": ["Spike + no QRS = failure to capture.","No spike when pacing is needed = failure to pace/fire.","Do not place a magnet on a device unless specifically directed; pacemaker and ICD magnet responses differ."],
  "clinicalJudgment": "A pacemaker patient becomes dizzy and telemetry shows pacing spikes without QRS complexes. Recognize failure to capture, assess perfusion, call for urgent help, and prepare for backup pacing."
},
{
  "title": "ECG Interpretation Basics",
  "summary": "Read ECGs systematically: rate, rhythm, P waves, PR, QRS, QT, then ST-T changes.",
  "bottomLine": "Read ECGs systematically: rate, rhythm, P waves, PR, QRS, QT, then ST-T changes. NCLEX rewards a repeatable approach more than memorizing isolated strips.",
  "pathophysiology": ["The SA node normally initiates atrial depolarization; AV node delay allows ventricular filling; His-Purkinje conduction rapidly depolarizes ventricles.","P wave = atrial depolarization; PR interval = atrial-to-ventricular conduction; QRS = ventricular depolarization; T wave = ventricular repolarization.","Abnormal conduction, ectopy, ischemia, electrolyte disturbance, and medications alter these patterns."],
  "assessment": ["Assess the patient whenever a monitor changes: pulse, BP, mental status, chest pain, dyspnea.","Determine regularity and calculate rate.","Identify P-QRS relationship before naming the rhythm."],
  "diagnostics": ["12-lead ECG provides spatial information unavailable from a single telemetry lead.","Compare with prior ECG when available.","Check potassium, magnesium, calcium, ischemia markers, and drug exposures when clinically indicated."],
  "management": ["Treat the patient and hemodynamic effect, not the strip alone.","Correct reversible causes.","Escalate ST-elevation or dynamic ischemic changes with compatible symptoms promptly."],
  "medications": [
    {"medication":"Magnesium sulfate","classOrRole":"Electrolyte/antiarrhythmic","whyUsed":"Treatment for torsades de pointes","nursingSafety":"Monitor BP, reflexes/respiratory status with significant dosing; correct potassium too."},
    {"medication":"Adenosine","classOrRole":"AV nodal blocker","whyUsed":"Diagnostic/therapeutic in selected regular narrow-complex SVT","nursingSafety":"Rapid push; transient asystole sensation can occur; rhythm selection matters."}
  ],
  "priorities": ["Use a consistent interpretation sequence every time.","Verify artifact by checking the patient, electrodes, and pulse.","Document a rhythm strip before/after intervention when safe."],
  "redFlags": ["ST elevation with ischemic symptoms.","Wide-complex tachycardia with instability.","New complete heart block, extreme bradycardia, or prolonged QT with ventricular ectopy."],
  "traps": ["Do not call artifact ventricular fibrillation before checking the patient.","Peaked T waves suggest hyperkalemia; U waves are classically linked with hypokalemia.","QT prolongation raises torsades risk; medication review is essential."],
  "clinicalJudgment": "A monitor shows an apparently chaotic rhythm, but the patient is awake and talking. Check pulse and leads first; artifact is more likely than true VF in a perfusing, alert patient."
}
];

export const cardiovascularRnBatch2 = Object.fromEntries(
  seeds.map((seed) => [seed.title, buildCardiovascularLesson(seed)]),
);
