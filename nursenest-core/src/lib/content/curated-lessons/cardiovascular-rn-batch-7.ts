import { buildCardiovascularLesson, type CardiovascularLessonSeed } from "./cardiovascular-rn-types";

const seeds: CardiovascularLessonSeed[] = [
  {
    title: "Cardiac Arrest and Post-Cardiac Arrest Care",
    summary: "Cardiac arrest requires immediate high-quality resuscitation followed by structured post-ROSC stabilization and cause-directed care.",
    bottomLine: "In cardiac arrest, the priorities are immediate CPR, rapid defibrillation for shockable rhythms, and reversible-cause treatment. After ROSC, shift quickly to oxygenation, ventilation, perfusion, neurologic protection, ECG, and cause identification.",
    pathophysiology: [
      "Cardiac arrest causes abrupt loss of effective circulation and global ischemia.",
      "Shockable rhythms require prompt defibrillation; nonshockable rhythms require CPR, epinephrine, and aggressive search for reversible causes.",
      "After ROSC, post-cardiac-arrest syndrome can involve myocardial dysfunction, brain injury, systemic inflammation, and recurrent instability."
    ],
    assessment: [
      "Cardiac arrest: unresponsive, absent normal breathing, and no pulse when assessed by a trained responder.",
      "During resuscitation, assess rhythm, compression quality, ventilation, and reversible causes.",
      "After ROSC, assess airway, oxygen saturation, blood pressure/perfusion, neurologic status, temperature, glucose, and recurrent arrhythmia."
    ],
    diagnostics: [
      "Obtain a 12-lead ECG as soon as feasible after ROSC.",
      "Use targeted labs, imaging, echocardiography/POCUS, and other testing to identify the arrest cause and resuscitation complications.",
      "Continuous ECG and hemodynamic monitoring are required during early post-arrest care."
    ],
    management: [
      "Deliver high-quality CPR and defibrillate VF/pulseless VT as soon as possible.",
      "Treat reversible causes and follow current adult advanced life support algorithms.",
      "After ROSC, avoid both hypoxemia and hyperoxemia once reliable oxygen measurement is available, support blood pressure/perfusion, control temperature in patients who remain unresponsive, and evaluate for coronary intervention when indicated."
    ],
    medications: [
      { medication: "Epinephrine", classOrRole: "Vasopressor", whyUsed: "Used during adult cardiac arrest according to the resuscitation algorithm", nursingSafety: "Give at algorithm-directed intervals; do not interrupt compressions unnecessarily." },
      { medication: "Amiodarone / lidocaine", classOrRole: "Antiarrhythmic", whyUsed: "May be used for refractory VF/pulseless VT", nursingSafety: "Defibrillation and CPR remain the priority; medication does not replace shocks." },
      { medication: "Vasopressor after ROSC", classOrRole: "Hemodynamic support", whyUsed: "Supports perfusion when hypotension persists", nursingSafety: "Titrate to clinical perfusion goals and monitor rhythm, IV access, and end-organ response." }
    ],
    priorities: [
      "Minimize interruptions in chest compressions.",
      "Defibrillate shockable rhythms promptly and resume CPR immediately after shocks.",
      "After ROSC, transition from arrest algorithm to structured post-arrest stabilization and cause investigation."
    ],
    redFlags: [
      "Recurrent VF/VT or loss of pulses after ROSC.",
      "Persistent hypotension, worsening oxygenation, seizures, or signs of cerebral herniation.",
      "STEMI pattern or another time-sensitive cause requiring definitive intervention."
    ],
    traps: [
      "Do not stop compressions for prolonged pulse checks or medication preparation.",
      "Asystole is not a shockable rhythm.",
      "After ROSC, 100% oxygen should not be continued indefinitely when reliable saturation allows titration."
    ],
    clinicalJudgment: "A patient achieves ROSC after VF arrest. Shift immediately from shock delivery to post-arrest priorities: stabilize oxygenation and perfusion, obtain ECG, identify the arrest cause, prevent recurrent arrest, and initiate neurologic-protection measures."
  },
  {
    title: "Atrial Fibrillation and Flutter",
    summary: "Atrial fibrillation and flutter are supraventricular arrhythmias that require decisions about stability, rate/rhythm control, and thromboembolic risk.",
    bottomLine: "For AF/flutter, first decide whether the patient is unstable. Then address ventricular rate/rhythm and stroke prevention; do not treat the monitor without considering duration, symptoms, and anticoagulation risk.",
    pathophysiology: [
      "AF produces disorganized atrial activation with loss of effective atrial contraction and an irregular ventricular response.",
      "Atrial flutter is usually a macro-reentrant atrial rhythm with characteristic organized flutter activity.",
      "Blood stasis, especially in the left atrial appendage, increases embolic stroke risk in AF."
    ],
    assessment: [
      "Palpitations, fatigue, dyspnea, dizziness, exercise intolerance, or no symptoms.",
      "Instability means hypotension, ischemic chest pain, altered mental status, acute heart failure, or shock attributable to the rhythm.",
      "Assess onset/duration, triggers, prior episodes, medication adherence, bleeding history, and stroke-risk factors."
    ],
    diagnostics: [
      "12-lead ECG confirms rhythm and ventricular response.",
      "Check electrolytes, renal function, thyroid studies, and ischemia evaluation as appropriate.",
      "Echocardiography helps assess structural disease; selected patients need transesophageal echo before cardioversion when thrombus risk is relevant."
    ],
    management: [
      "Unstable AF/flutter with a pulse generally requires synchronized cardioversion.",
      "Stable patients may receive rate control, rhythm control, or both depending on symptoms and comorbidities.",
      "Assess thromboembolic risk and use anticoagulation when indicated."
    ],
    medications: [
      { medication: "Beta blocker / diltiazem", classOrRole: "Rate control", whyUsed: "Slows AV nodal conduction", nursingSafety: "Monitor HR/BP and avoid inappropriate use in severe decompensated HF or other contraindications." },
      { medication: "Antiarrhythmic", classOrRole: "Rhythm control", whyUsed: "Maintains or restores sinus rhythm in selected patients", nursingSafety: "Agent choice depends on structural heart disease, QT, renal/hepatic factors, and interaction risk." },
      { medication: "DOAC / warfarin", classOrRole: "Anticoagulation", whyUsed: "Reduces embolic stroke risk when indicated", nursingSafety: "Assess bleeding risk, renal function, interactions, adherence, and procedure timing." }
    ],
    priorities: [
      "Assess stability before debating the exact rhythm strategy.",
      "Control reversible triggers such as electrolyte abnormalities, infection, or thyroid disease.",
      "Teach anticoagulant adherence and bleeding precautions when prescribed."
    ],
    redFlags: [
      "Rapid ventricular response with hypotension, ischemia, pulmonary edema, or altered mental status.",
      "New focal neurologic deficit suggesting embolic stroke.",
      "Major bleeding while anticoagulated."
    ],
    traps: [
      "An irregularly irregular rhythm is classic for AF, but ECG confirmation still matters.",
      "Do not cardiovert a stable patient without considering arrhythmia duration and thromboembolic protection.",
      "Rate control and anticoagulation solve different problems."
    ],
    clinicalJudgment: "A patient with AF at 160/min is dyspneic, hypotensive, and confused. Prioritize unstable tachyarrhythmia management rather than delaying for a full outpatient-style stroke-risk workup."
  },
  {
    title: "Supraventricular Tachycardia",
    summary: "SVT is a rapid supraventricular rhythm most often caused by re-entry and managed according to stability and rhythm characteristics.",
    bottomLine: "A regular narrow-complex tachycardia is often SVT. Stable patients may respond to vagal maneuvers or adenosine; unstable patients require synchronized cardioversion.",
    pathophysiology: [
      "Common SVTs include AV nodal re-entry and AV re-entry using an accessory pathway.",
      "Very rapid rates shorten filling time and can reduce cardiac output.",
      "Some pre-excitation syndromes require different medication choices when atrial fibrillation is present."
    ],
    assessment: [
      "Sudden-onset palpitations, chest discomfort, dyspnea, dizziness, or anxiety.",
      "Assess BP, mentation, ischemic symptoms, pulmonary edema, and pulse quality.",
      "Determine regularity and QRS width before selecting therapy."
    ],
    diagnostics: [
      "Obtain a 12-lead ECG when feasible without delaying emergency treatment.",
      "Check electrolytes and possible triggers such as stimulants or thyroid disease.",
      "Capture rhythm strips before and after therapy when possible."
    ],
    management: [
      "Stable regular narrow-complex SVT: vagal maneuvers first when appropriate.",
      "Adenosine may terminate AV-node-dependent SVT when the rhythm is appropriate.",
      "Unstable tachycardia with a pulse generally requires synchronized cardioversion."
    ],
    medications: [
      { medication: "Adenosine", classOrRole: "Transient AV nodal blocker", whyUsed: "Terminates selected AV-node-dependent SVTs", nursingSafety: "Rapid IV push followed immediately by flush; anticipate brief flushing/chest pressure; avoid using blindly in irregular wide-complex rhythms." },
      { medication: "Beta blocker / calcium-channel blocker", classOrRole: "Rate/rhythm therapy", whyUsed: "May be used in selected stable SVT patients", nursingSafety: "Monitor HR/BP and consider HF, pre-excitation, and other contraindications." }
    ],
    priorities: [
      "Assess stability before medication selection.",
      "Place on continuous ECG monitoring and have cardioversion capability available if the patient worsens.",
      "Reassess symptoms and rhythm immediately after intervention."
    ],
    redFlags: [
      "Hypotension, ischemic chest pain, pulmonary edema, syncope, or altered mental status.",
      "Wide-complex or irregular tachycardia of uncertain origin.",
      "Failure to convert with progressive hemodynamic compromise."
    ],
    traps: [
      "Adenosine is not a generic treatment for every fast rhythm.",
      "Do not delay synchronized cardioversion in an unstable patient to try multiple medications.",
      "A regular narrow-complex rhythm and an irregular wide-complex rhythm require different thinking."
    ],
    clinicalJudgment: "A patient has sudden regular narrow-complex tachycardia at 190/min, normal BP, and no ischemic symptoms. Treat as stable first, use appropriate vagal/adenosine strategy, and be ready to escalate if stability changes."
  },
  {
    title: "Ventricular Tachycardia and Ventricular Fibrillation",
    summary: "VT and VF are life-threatening ventricular arrhythmias that can rapidly eliminate effective circulation.",
    bottomLine: "Pulseless VT/VF means immediate defibrillation and CPR. VT with a pulse is managed according to stability; never choose the rhythm treatment before checking the patient and pulse.",
    pathophysiology: [
      "Ventricular arrhythmias arise from diseased or electrically unstable ventricular myocardium.",
      "VT may still produce a pulse; VF produces chaotic ventricular activity with no effective output.",
      "Ischemia, scar, cardiomyopathy, electrolyte abnormalities, and prolonged QT can precipitate malignant ventricular rhythms."
    ],
    assessment: [
      "Immediately assess responsiveness, pulse, BP, chest pain, dyspnea, mentation, and perfusion.",
      "Wide-complex tachycardia should be treated cautiously when the diagnosis is uncertain.",
      "Polymorphic VT with prolonged QT suggests torsades de pointes."
    ],
    diagnostics: [
      "Rhythm strip/12-lead ECG when a pulse is present and time permits.",
      "Check potassium, magnesium, ischemia markers, oxygenation, and medication/QT contributors.",
      "After stabilization, evaluate structural heart disease and reversible causes."
    ],
    management: [
      "Pulseless VT/VF: immediate defibrillation, CPR, and advanced life-support algorithm.",
      "Unstable VT with a pulse: synchronized cardioversion when feasible.",
      "Stable VT may be treated with antiarrhythmic therapy and specialist evaluation; torsades often requires magnesium and correction of causes."
    ],
    medications: [
      { medication: "Amiodarone / lidocaine", classOrRole: "Antiarrhythmic", whyUsed: "Used in selected ventricular arrhythmias", nursingSafety: "Monitor rhythm, QT, BP, and drug-specific toxicity; do not delay shocks in pulseless VT/VF." },
      { medication: "Magnesium", classOrRole: "Electrolyte / antiarrhythmic", whyUsed: "Key therapy for torsades de pointes", nursingSafety: "Monitor renal function, BP, and respiratory status with significant dosing." },
      { medication: "Epinephrine", classOrRole: "Arrest vasopressor", whyUsed: "Used during pulseless arrest according to the algorithm", nursingSafety: "Give without unnecessary compression interruption." }
    ],
    priorities: [
      "Check the patient and pulse immediately.",
      "Defibrillate shockable pulseless rhythms without delay.",
      "Correct reversible causes after immediate life-saving actions are underway."
    ],
    redFlags: [
      "Any loss of pulse or consciousness.",
      "Recurrent VT/VF, ischemia, cardiogenic shock, or severe electrolyte derangement.",
      "QT prolongation with polymorphic VT."
    ],
    traps: [
      "Do not synchronize a shock for VF or pulseless VT.",
      "Do not defibrillate stable monomorphic VT automatically; stability and pulse matter.",
      "Medication should never delay defibrillation of VF/pulseless VT."
    ],
    clinicalJudgment: "Telemetry shows wide-complex tachycardia and the patient is unresponsive with no pulse. Do not spend time debating SVT with aberrancy—start CPR and defibrillate as pulseless VT/VF."
  },
  {
    title: "Bradyarrhythmias and Heart Block",
    summary: "Bradyarrhythmias range from benign sinus slowing to high-grade conduction block that can cause profound hypoperfusion.",
    bottomLine: "Treat the patient, not the heart-rate number. Symptomatic bradycardia with poor perfusion needs urgent action; Mobitz II, high-grade AV block, and complete heart block are especially concerning.",
    pathophysiology: [
      "Sinus node dysfunction reduces impulse formation; AV block delays or prevents conduction from atria to ventricles.",
      "Ischemia, medications, electrolyte abnormalities, degenerative conduction disease, and hypoxia can cause bradyarrhythmias.",
      "High-grade block can produce a slow escape rhythm and critically low cardiac output."
    ],
    assessment: [
      "Fatigue, dizziness, syncope, chest pain, dyspnea, confusion, hypotension, or shock.",
      "Assess whether symptoms are caused by the bradycardia rather than the rate alone.",
      "Review AV-nodal blocking medications and reversible causes."
    ],
    diagnostics: [
      "12-lead ECG identifies sinus bradycardia and type/level of AV block.",
      "Check electrolytes, ischemia, thyroid status, and medication exposure as appropriate.",
      "Telemetry helps detect intermittent high-grade block."
    ],
    management: [
      "Symptomatic bradycardia is treated according to perfusion and current advanced life-support guidance.",
      "Atropine may be used in selected symptomatic bradycardia, but high-grade infranodal block may respond poorly.",
      "Prepare for transcutaneous/transvenous pacing and definitive pacemaker evaluation when indicated."
    ],
    medications: [
      { medication: "Atropine", classOrRole: "Anticholinergic", whyUsed: "May increase sinus rate and AV conduction in selected symptomatic bradycardia", nursingSafety: "Do not delay pacing/escalation in severe high-grade block if atropine is ineffective or unlikely to work." },
      { medication: "Epinephrine / dopamine infusion", classOrRole: "Chronotropic support", whyUsed: "Can support rate and perfusion when atropine fails or pacing is pending", nursingSafety: "Continuous ECG/BP monitoring; titrate to perfusion." }
    ],
    priorities: [
      "Determine whether the patient has poor perfusion.",
      "Remove or correct reversible causes when possible.",
      "Apply pacing pads early when high-grade block or clinical deterioration is likely."
    ],
    redFlags: [
      "Mobitz II, high-grade AV block, or complete heart block with symptoms.",
      "Recurrent syncope, hypotension, ischemic chest pain, or acute heart failure.",
      "Progressively widening QRS escape rhythm or pauses with poor perfusion."
    ],
    traps: [
      "A heart rate below 60 does not automatically require treatment.",
      "Mobitz I and Mobitz II are not equivalent in risk.",
      "Do not keep repeating ineffective medication while a patient with high-grade block is deteriorating."
    ],
    clinicalJudgment: "A patient with complete heart block has HR 30/min, hypotension, and confusion. Recognize unstable bradycardia, prepare pacing immediately, and use algorithm-directed chronotropic support while reversible causes are addressed."
  },
  {
    title: "Syncope and Orthostatic Hypotension",
    summary: "Syncope is transient loss of consciousness from cerebral hypoperfusion; the priority is distinguishing benign reflex causes from dangerous cardiac or hemodynamic disease.",
    bottomLine: "Syncope is a symptom, not a diagnosis. History, physical exam, orthostatic assessment when appropriate, and ECG are high-yield first steps; exertional syncope, abnormal ECG, structural heart disease, or injury raises concern.",
    pathophysiology: [
      "Vasovagal/reflex syncope results from transient vasodilation and/or bradycardia.",
      "Orthostatic hypotension reflects inadequate blood-pressure compensation with standing from volume depletion, medications, or autonomic dysfunction.",
      "Arrhythmias and structural cardiac disease can cause sudden cerebral hypoperfusion without a typical prodrome."
    ],
    assessment: [
      "Clarify position, trigger, prodrome, duration, recovery, exertion, palpitations, chest pain, bleeding/volume loss, and medication changes.",
      "Look for injury, dehydration, murmur, abnormal rhythm, focal neurologic findings, and orthostatic BP/HR changes when safe.",
      "A rapid complete recovery supports syncope; prolonged confusion suggests seizure or another diagnosis."
    ],
    diagnostics: [
      "A detailed history, physical exam, and resting 12-lead ECG are core initial evaluation.",
      "Do not order broad routine labs or neuroimaging without a clinical indication.",
      "Further rhythm monitoring, echocardiography, autonomic testing, or specialist evaluation depends on the suspected cause and risk."
    ],
    management: [
      "Treat the cause: hydration/medication review for orthostasis, education/counter-pressure strategies for selected vasovagal syncope, and urgent cardiac treatment when a dangerous cause is suspected.",
      "Institute fall precautions and assist with position changes in symptomatic patients.",
      "High-risk features may require monitored hospital evaluation."
    ],
    medications: [
      { medication: "Antihypertensive / diuretic review", classOrRole: "Medication reconciliation", whyUsed: "Identifies iatrogenic contributors to orthostasis", nursingSafety: "Do not stop prescribed therapy independently; assess and communicate symptomatic BP changes." },
      { medication: "Volume replacement", classOrRole: "Cause-directed support", whyUsed: "Treats dehydration/volume depletion when present", nursingSafety: "Use caution in HF, renal failure, or other fluid-sensitive states." }
    ],
    priorities: [
      "Protect from falls and assess injury after an event.",
      "Identify cardiac red flags before labeling an episode vasovagal.",
      "Teach slow position changes and symptom recognition when orthostasis is confirmed."
    ],
    redFlags: [
      "Syncope during exertion, while supine, or with palpitations/chest pain.",
      "Abnormal ECG, family history of sudden death, known structural heart disease, or persistent hypotension.",
      "Major bleeding, severe anemia/volume loss, or neurologic deficit."
    ],
    traps: [
      "Do not assume every fainting episode is dehydration.",
      "Routine head CT is not automatically required for uncomplicated syncope without neurologic or trauma indications.",
      "Orthostatic hypotension can be medication-related and is especially important in older adults."
    ],
    clinicalJudgment: "An older adult faints after standing, has a new medication increase, and demonstrates a significant orthostatic BP drop without neurologic deficit. Prioritize fall safety, volume/medication assessment, and reversible causes while still screening for cardiac red flags."
  }
];

export const cardiovascularRnBatch7 = Object.fromEntries(
  seeds.map((seed) => [seed.title, buildCardiovascularLesson(seed)]),
);
