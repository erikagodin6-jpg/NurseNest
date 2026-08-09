import { buildCardiovascularLesson, type CardiovascularLessonSeed } from "./cardiovascular-rn-types";

const seeds: CardiovascularLessonSeed[] = [
  {
    title: "Chronic Coronary Disease and Stable Angina",
    summary: "Chronic coronary disease causes predictable myocardial ischemia when oxygen demand exceeds fixed coronary supply.",
    bottomLine: "Stable angina is usually predictable with exertion or stress and improves with rest or antianginal therapy. The exam priority is recognizing when a previously stable pattern becomes acute coronary syndrome.",
    pathophysiology: [
      "Atherosclerotic plaque narrows coronary arteries and limits the ability to increase blood flow during exertion.",
      "Ischemia is typically transient and does not cause myocardial necrosis unless the process becomes unstable or prolonged.",
      "Chronic coronary disease includes patients with prior MI or revascularization as well as chronic angina syndromes."
    ],
    assessment: [
      "Pressure, heaviness, tightness, or exertional dyspnea with a reproducible trigger.",
      "Symptoms usually improve with rest and/or prescribed nitroglycerin.",
      "New rest pain, increasing frequency, increasing severity, or reduced response to usual therapy is not 'stable' and requires urgent evaluation."
    ],
    diagnostics: [
      "Resting ECG may be normal between episodes; obtain ECG promptly when symptoms suggest ACS.",
      "Stress testing or coronary imaging is selected according to symptoms, risk, and prior disease.",
      "Lipids, diabetes screening, renal function, and blood pressure help define modifiable cardiovascular risk."
    ],
    management: [
      "Risk reduction includes smoking cessation, physical activity, blood-pressure control, lipid lowering, diabetes management, and cardiac rehabilitation when eligible.",
      "Antianginal therapy may include beta blockers, calcium-channel blockers, and nitrates according to the clinical plan.",
      "Revascularization is considered when symptoms remain limiting or anatomy/risk warrants it."
    ],
    medications: [
      { medication: "Nitroglycerin", classOrRole: "Nitrate", whyUsed: "Relieves angina by reducing myocardial oxygen demand", nursingSafety: "Check blood pressure and recent PDE-5 inhibitor use; unresolved or changing chest pain requires emergency evaluation." },
      { medication: "Beta blocker", classOrRole: "Anti-ischemic", whyUsed: "Reduces heart rate and myocardial oxygen demand", nursingSafety: "Monitor HR/BP; do not stop abruptly without a plan." },
      { medication: "Statin", classOrRole: "Lipid-lowering / plaque-risk reduction", whyUsed: "Reduces future atherosclerotic events", nursingSafety: "Reinforce adherence and monitor adverse effects/labs as ordered." }
    ],
    priorities: [
      "Compare today's symptoms with the patient's usual angina pattern.",
      "Stop activity, assess vital signs, and follow the prescribed angina plan when symptoms occur.",
      "Escalate immediately for rest pain, hemodynamic instability, persistent symptoms, or a new pattern."
    ],
    redFlags: [
      "Chest pain at rest or pain that is more frequent, severe, or prolonged than baseline.",
      "Syncope, hypotension, new dysrhythmia, acute dyspnea, or diaphoresis with ischemic symptoms.",
      "Pain not relieved as expected by the usual treatment plan."
    ],
    traps: [
      "Do not call new rest pain 'stable angina' just because the patient has known CAD.",
      "A normal ECG between episodes does not exclude coronary disease.",
      "Lifestyle and secondary-prevention medications are part of treatment even when symptoms are controlled."
    ],
    clinicalJudgment: "A patient with previously predictable exertional angina now develops pressure while watching television that persists after rest. Treat the change as possible ACS rather than simply repeating the chronic-angina teaching plan."
  },
  {
    title: "Myocarditis",
    summary: "Myocarditis is inflammatory injury of the myocardium that can range from mild chest discomfort to fulminant heart failure and shock.",
    bottomLine: "Think myocarditis when new heart failure, chest pain, conduction disturbance, or ventricular dysrhythmia follows a compatible inflammatory or infectious context. Deterioration can be rapid.",
    pathophysiology: [
      "Inflammation injures myocytes and can impair contractility and electrical conduction.",
      "Causes include viral and immune-mediated processes, medications/toxins, and selected systemic diseases.",
      "Fulminant myocarditis can cause severe biventricular dysfunction, cardiogenic shock, heart block, and malignant ventricular arrhythmias."
    ],
    assessment: [
      "Chest pain, dyspnea, fatigue, palpitations, syncope, or new exercise intolerance.",
      "Signs of heart failure: crackles, elevated JVP, edema, S3, poor perfusion.",
      "Watch closely for hypotension, new conduction block, or ventricular arrhythmia."
    ],
    diagnostics: [
      "ECG and troponin may show myocardial injury but are not specific.",
      "Echocardiography assesses ventricular function and hemodynamic complications.",
      "Cardiac MRI can support diagnosis; endomyocardial biopsy is reserved for selected high-risk presentations."
    ],
    management: [
      "Limit strenuous activity during active disease and manage heart failure/arrhythmias according to severity.",
      "Treat specific causes when identified; fulminant disease may require advanced circulatory support.",
      "Escalate early when shock, sustained arrhythmia, or high-grade block develops."
    ],
    medications: [
      { medication: "Heart-failure therapy", classOrRole: "Supportive therapy", whyUsed: "Treats ventricular dysfunction when appropriate", nursingSafety: "Use according to hemodynamic stability; hypotension may limit standard agents." },
      { medication: "Antiarrhythmic therapy", classOrRole: "Rhythm management", whyUsed: "Treats clinically significant arrhythmias", nursingSafety: "Continuous monitoring is required in unstable or high-risk disease." },
      { medication: "Immunomodulatory therapy", classOrRole: "Etiology-specific", whyUsed: "Used only in selected myocarditis subtypes", nursingSafety: "Do not assume steroids are routine for every case; therapy depends on etiology and specialist plan." }
    ],
    priorities: [
      "Monitor rhythm, perfusion, oxygenation, urine output, and signs of worsening heart failure.",
      "Cluster activity and reduce unnecessary exertion in unstable patients.",
      "Escalate for shock, sustained arrhythmia, syncope, or progressive conduction disease."
    ],
    redFlags: [
      "Rapidly falling blood pressure or worsening end-organ perfusion.",
      "Sustained VT/VF, high-grade AV block, or recurrent syncope.",
      "Acute pulmonary edema or rapidly worsening ventricular function."
    ],
    traps: [
      "Do not assume every elevated troponin is ACS; myocarditis is an important mimic.",
      "A young patient can still become critically ill from myocarditis.",
      "Exercise restriction is important during active myocarditis even when symptoms improve quickly."
    ],
    clinicalJudgment: "A previously healthy adult develops viral symptoms, then chest pain, rising troponin, reduced EF, and runs of VT. Recognize myocarditis as a dangerous ACS mimic and prioritize telemetry, hemodynamic assessment, and rapid escalation."
  },
  {
    title: "Pericardial Effusion",
    summary: "Pericardial effusion is fluid accumulation around the heart; the key danger is progression to tamponade physiology.",
    bottomLine: "The size of an effusion matters less than its hemodynamic effect. A rapidly accumulating smaller effusion can be more dangerous than a slowly accumulating large one.",
    pathophysiology: [
      "Fluid accumulates in the pericardial space from inflammatory, malignant, renal, infectious, traumatic, or post-procedural causes.",
      "As intrapericardial pressure rises, ventricular filling becomes impaired.",
      "Tamponade occurs when filling is sufficiently restricted to reduce stroke volume and cardiac output."
    ],
    assessment: [
      "May be asymptomatic or cause dyspnea, chest pressure, tachycardia, or reduced exercise tolerance.",
      "Assess JVP, heart sounds, pulse pressure, blood pressure trend, and perfusion.",
      "Worsening tachycardia, hypotension, oliguria, confusion, or pulsus paradoxus suggests hemodynamic compromise."
    ],
    diagnostics: [
      "Echocardiography is the key bedside test for size and tamponade physiology.",
      "ECG may show low voltage or electrical alternans in large effusions, but absence does not exclude danger.",
      "Investigate the cause with labs/imaging guided by the clinical context."
    ],
    management: [
      "Treat the underlying cause and monitor stable effusions according to size, symptoms, and trajectory.",
      "Hemodynamic compromise requires urgent drainage, usually pericardiocentesis or surgical management.",
      "Avoid delays when shock physiology is emerging."
    ],
    medications: [
      { medication: "Anti-inflammatory therapy", classOrRole: "Cause-directed", whyUsed: "Used when inflammatory pericardial disease is driving the effusion", nursingSafety: "Not appropriate for every etiology; monitor renal/GI risk as applicable." },
      { medication: "IV fluid", classOrRole: "Temporary preload support", whyUsed: "May transiently support filling in selected unstable tamponade patients", nursingSafety: "This is a bridge, not definitive treatment; avoid reflexive large-volume resuscitation when pulmonary congestion is present." }
    ],
    priorities: [
      "Trend hemodynamics rather than relying on a single blood pressure.",
      "Recognize progression toward tamponade early.",
      "Prepare rapidly for drainage when ordered and maintain continuous monitoring."
    ],
    redFlags: [
      "Hypotension with rising JVP and worsening tachycardia.",
      "New oliguria, confusion, cool extremities, or narrow pulse pressure.",
      "Sudden deterioration after cardiac procedure, trauma, or anticoagulation."
    ],
    traps: [
      "A large effusion is not automatically tamponade; tamponade is a hemodynamic diagnosis.",
      "Beck triad can be incomplete.",
      "Do not delay escalation while waiting for every classic sign to appear."
    ],
    clinicalJudgment: "A post-procedure patient develops tachycardia, falling BP, increasing JVP, and new dyspnea. Prioritize possible tamponade from pericardial effusion and escalate for urgent bedside imaging and intervention."
  },
  {
    title: "Acute Aortic Dissection",
    summary: "Acute aortic dissection is a time-critical tear in the aortic intima that can compromise major branches or rupture.",
    bottomLine: "Sudden severe chest or back pain plus pulse, neurologic, perfusion, or aortic-valve findings should trigger immediate concern for acute aortic syndrome—not routine ACS treatment alone.",
    pathophysiology: [
      "An intimal tear allows blood to split the aortic media and create a false lumen.",
      "Extension can obstruct coronary, cerebral, renal, mesenteric, or limb arteries.",
      "Proximal dissections can cause aortic regurgitation, tamponade, MI, stroke, or rupture."
    ],
    assessment: [
      "Abrupt severe chest, back, or abdominal pain; may be described as tearing but wording varies.",
      "Check bilateral pulses/BPs when this does not delay care and assess for neurologic deficits or limb ischemia.",
      "New aortic regurgitation murmur, syncope, shock, or unequal perfusion increases concern."
    ],
    diagnostics: [
      "CT angiography is commonly used in stable patients; TEE or other imaging may be used when instability or logistics dictate.",
      "ECG/troponin may be abnormal and can mislead toward isolated ACS.",
      "Assess renal function, type/crossmatch, CBC, and end-organ injury while definitive imaging is arranged."
    ],
    management: [
      "Reduce shear stress with rapid heart-rate and blood-pressure control according to the emergency plan.",
      "Type A/proximal dissection generally requires emergent surgical evaluation; selected distal dissections may be managed medically unless complicated.",
      "Treat branch-vessel ischemia, rupture, tamponade, and organ malperfusion as emergencies."
    ],
    medications: [
      { medication: "IV beta blocker", classOrRole: "Anti-impulse therapy", whyUsed: "Reduces heart rate and aortic shear", nursingSafety: "Titrate with continuous BP/HR monitoring; address contraindications and shock." },
      { medication: "IV vasodilator", classOrRole: "Afterload reduction", whyUsed: "May be added when BP remains high after rate control", nursingSafety: "Avoid reflex tachycardia; rate control generally precedes pure vasodilation." },
      { medication: "Analgesia", classOrRole: "Symptom and sympathetic control", whyUsed: "Reduces pain-driven catecholamine surge", nursingSafety: "Monitor respiratory status and hemodynamics." }
    ],
    priorities: [
      "Keep the patient at rest with continuous monitoring and rapid vascular/surgical escalation.",
      "Trend neurologic status, urine output, distal pulses, and limb temperature/perfusion.",
      "Avoid unnecessary delays for low-priority testing."
    ],
    redFlags: [
      "New focal neurologic deficit or loss of a limb pulse.",
      "Hypotension, tamponade signs, new severe aortic regurgitation, or rapidly worsening pain.",
      "Acute kidney injury, abdominal pain with lactate rise, or other malperfusion signs."
    ],
    traps: [
      "Do not automatically anticoagulate every patient with chest pain before dangerous aortic disease is considered.",
      "Pain can migrate or improve even while the dissection progresses.",
      "A normal chest x-ray does not rule out dissection."
    ],
    clinicalJudgment: "A hypertensive patient has abrupt chest pain radiating to the back, a new pulse deficit, and neurologic symptoms. Prioritize acute aortic dissection, rapid imaging, anti-impulse therapy, and surgical/vascular escalation."
  },
  {
    title: "Acute Limb Ischemia",
    summary: "Acute limb ischemia is a sudden fall in arterial perfusion that threatens tissue viability and requires urgent revascularization assessment.",
    bottomLine: "A suddenly painful, pale, cool, pulseless or neurologically impaired limb is a vascular emergency. Time lost can mean tissue loss.",
    pathophysiology: [
      "Acute occlusion may result from embolism, in-situ thrombosis, graft/stent failure, dissection, or trauma.",
      "Abrupt loss of oxygen delivery causes nerve and muscle ischemia first, then irreversible tissue injury.",
      "Reperfusion can itself cause metabolic and compartment complications."
    ],
    assessment: [
      "Use the classic six Ps as a memory aid: pain, pallor, pulselessness, paresthesia, paralysis, poikilothermia/coolness.",
      "Compare both limbs for pulses, Doppler signals, capillary refill, temperature, color, motor function, and sensation.",
      "Motor deficit or profound sensory loss indicates a more threatened limb."
    ],
    diagnostics: [
      "Bedside Doppler assessment helps establish arterial flow.",
      "CT angiography or catheter angiography may define the lesion when it does not delay definitive care.",
      "Check CBC, coagulation studies, renal function, electrolytes, CK, and lactate according to severity and treatment plan."
    ],
    management: [
      "Obtain urgent vascular consultation and protect the limb from pressure or injury.",
      "Anticoagulation is commonly initiated unless contraindicated while revascularization strategy is determined.",
      "Options include embolectomy/thrombectomy, catheter-directed therapy, bypass, or other endovascular/surgical intervention."
    ],
    medications: [
      { medication: "Unfractionated heparin", classOrRole: "Anticoagulant", whyUsed: "Limits thrombus propagation while definitive therapy is arranged", nursingSafety: "Check bleeding risk, baseline labs, and protocol-specific monitoring." },
      { medication: "Analgesia", classOrRole: "Supportive", whyUsed: "Controls severe ischemic pain", nursingSafety: "Do not let pain relief delay serial neurovascular assessment." }
    ],
    priorities: [
      "Mark/document pulse sites and repeat neurovascular checks frequently.",
      "Keep the limb protected and avoid compression.",
      "Escalate immediately for worsening sensory or motor loss."
    ],
    redFlags: [
      "Paralysis or rapidly progressive sensory loss.",
      "Absent Doppler signals with a cold mottled limb.",
      "After reperfusion: severe swelling, pain out of proportion, hyperkalemia, acidosis, or compartment syndrome."
    ],
    traps: [
      "Do not elevate a severely ischemic arterial limb above the heart as if it were venous edema.",
      "A palpable proximal pulse does not guarantee adequate distal perfusion.",
      "Neurologic deficits in the limb are late and urgent findings."
    ],
    clinicalJudgment: "A patient with atrial fibrillation suddenly develops severe leg pain, pallor, absent pedal Doppler signal, and numbness. Recognize embolic acute limb ischemia and prioritize vascular emergency management."
  },
  {
    title: "Cardiogenic Shock",
    summary: "Cardiogenic shock is critical end-organ hypoperfusion caused by inadequate cardiac pump function.",
    bottomLine: "Cardiogenic shock is not just low blood pressure—it is failure of the heart to deliver enough blood flow to organs. Treat the cause while supporting perfusion without worsening congestion.",
    pathophysiology: [
      "Severe LV, RV, or biventricular dysfunction reduces cardiac output and triggers compensatory vasoconstriction.",
      "Common causes include large MI, mechanical complications, fulminant myocarditis, severe valve failure, and advanced cardiomyopathy.",
      "Rising filling pressures produce pulmonary/systemic congestion while poor forward flow causes organ injury."
    ],
    assessment: [
      "Hypotension may be present, but focus on cool skin, altered mentation, oliguria, weak pulses, delayed refill, and rising lactate.",
      "Pulmonary edema, elevated JVP, S3, or new murmur may point to the cause.",
      "RV shock can present with high JVP and clear lungs."
    ],
    diagnostics: [
      "ECG and troponin rapidly evaluate ischemia; bedside echo assesses ventricular and mechanical causes.",
      "Trend lactate, renal function, urine output, acid-base status, and oxygenation.",
      "Invasive hemodynamics may be used in selected complex shock states."
    ],
    management: [
      "Treat the reversible cause urgently, including reperfusion for MI and surgery/intervention for mechanical complications.",
      "Use vasopressors/inotropes according to the hemodynamic problem and specialist plan.",
      "Selected patients require mechanical circulatory support."
    ],
    medications: [
      { medication: "Norepinephrine", classOrRole: "Vasopressor", whyUsed: "Supports arterial pressure in hypotensive shock", nursingSafety: "Use a pump, monitor perfusion and IV site, and titrate to clinical response." },
      { medication: "Dobutamine", classOrRole: "Inotrope", whyUsed: "Can increase contractility and forward flow", nursingSafety: "May cause tachyarrhythmia or hypotension; monitor ECG and BP continuously." },
      { medication: "Diuretic", classOrRole: "Decongestive therapy", whyUsed: "May relieve pulmonary congestion when perfusion can tolerate it", nursingSafety: "Do not reflexively diurese a profoundly preload-dependent patient without hemodynamic assessment." }
    ],
    priorities: [
      "Assess perfusion repeatedly: mentation, urine output, skin, pulses, lactate, and blood pressure trend.",
      "Identify whether congestion, ischemia, RV failure, or a mechanical complication is driving the shock.",
      "Prepare for urgent reperfusion, invasive support, or transfer when indicated."
    ],
    redFlags: [
      "Rapidly rising lactate, anuria/oliguria, worsening acidosis, or altered mental status.",
      "New murmur after MI, recurrent ischemia, sustained VT/VF, or high-grade block.",
      "Escalating oxygen needs or refractory hypotension despite initial therapy."
    ],
    traps: [
      "Do not give a large fluid bolus automatically to every hypotensive patient with pulmonary edema.",
      "A higher MAP is not enough if end-organ perfusion continues to worsen.",
      "Shock after MI may be caused by a mechanical complication, not only loss of contractility."
    ],
    clinicalJudgment: "After a large MI, a patient becomes cool, confused, oliguric, hypotensive, and develops crackles. Recognize cardiogenic shock, assess for mechanical complications, and prioritize reperfusion/hemodynamic support rather than routine fluid loading."
  }
];

export const cardiovascularRnBatch6 = Object.fromEntries(
  seeds.map((seed) => [seed.title, buildCardiovascularLesson(seed)]),
);
