import type { LessonContent } from "./types";

export const rnContentBatch001Lessons: Record<string, LessonContent> = {
  "cardiac-arrhythmias-and-acls-management-rn": {
    title: "Cardiac Arrhythmias and ACLS Management",
    cellular: {
      title: "Cardiac Conduction and Arrhythmia Mechanisms",
      content: "Cardiac arrhythmias arise from three primary electrophysiological mechanisms: abnormal automaticity, triggered activity, and re-entry circuits. The sinoatrial (SA) node generates spontaneous depolarization via funny sodium channels (If) and L-type calcium channels at a rate of 60-100 bpm. Abnormal automaticity occurs when ectopic foci develop enhanced phase 4 depolarization due to ischemia, electrolyte imbalances, or catecholamine excess. Triggered activity involves afterdepolarizations—early (EADs) from prolonged QT intervals or delayed (DADs) from calcium overload—that reach threshold and fire ectopic beats. Re-entry, the most common mechanism in sustained tachyarrhythmias, requires a circuit with two pathways having different conduction velocities and refractory periods, allowing a wavefront to loop continuously. In ventricular fibrillation, multiple micro-reentry circuits cause chaotic depolarization, producing no effective cardiac output and requiring immediate defibrillation to reset the electrical system."
    },
    riskFactors: [
      "Acute myocardial ischemia or infarction disrupting conduction pathways",
      "Electrolyte disturbances: hypokalemia, hyperkalemia, hypomagnesemia, hypocalcemia",
      "Structural heart disease including cardiomyopathy and valvular disorders",
      "Medications that prolong QT interval (antiarrhythmics, macrolides, fluoroquinolones)",
      "Hypoxemia and respiratory failure reducing myocardial oxygen delivery",
      "Thyroid dysfunction (hyperthyroidism precipitates atrial fibrillation)",
      "Cocaine and methamphetamine use causing catecholamine-mediated toxicity",
      "Chronic heart failure with myocardial remodeling"
    ],
    diagnostics: [
      "Obtain 12-lead ECG and identify rhythm, rate, intervals (PR, QRS, QT), axis, and ST changes",
      "Continuous cardiac monitoring with ST-segment trending in acute settings",
      "Monitor serum potassium, magnesium, calcium, and phosphorus levels",
      "Obtain troponin levels to evaluate for myocardial ischemia as a precipitant",
      "Assess thyroid function tests (TSH, free T4) in new-onset atrial fibrillation",
      "Expect echocardiography to evaluate ejection fraction and structural abnormalities"
    ],
    management: [
      "Unstable tachycardia: perform synchronized cardioversion per ACLS protocol",
      "Pulseless VT/VF: defibrillate immediately at maximum energy, then CPR and epinephrine every 3-5 minutes",
      "Stable narrow-complex tachycardia: attempt vagal maneuvers, then administer adenosine 6mg rapid IV push",
      "Symptomatic bradycardia: administer atropine 1mg IV, prepare for transcutaneous pacing",
      "Correct underlying electrolyte abnormalities: IV potassium for hypokalemia, IV magnesium for torsades de pointes",
      "Post-cardiac arrest: initiate targeted temperature management (32-36°C) per protocol"
    ],
    nursingActions: [
      "Assess hemodynamic stability immediately: blood pressure, level of consciousness, chest pain, dyspnea",
      "Apply defibrillator pads and ensure crash cart is at bedside for unstable patients",
      "Administer ACLS medications through large-bore proximal IV with 20mL flush followed by arm elevation",
      "Document rhythm strips at onset of arrhythmia, with each intervention, and at resolution",
      "Monitor for proarrhythmic effects of antiarrhythmic medications (QT prolongation, new arrhythmias)",
      "Verify transcutaneous pacemaker capture: electrical capture on monitor and mechanical capture via pulse check",
      "Maintain airway patency and ensure bag-valve-mask is functional during resuscitation"
    ],
    signs: {
      left: [
        "Palpitations and irregular pulse on assessment",
        "Sinus tachycardia with narrow QRS complexes",
        "Atrial fibrillation with irregularly irregular rhythm",
        "Premature ventricular contractions (PVCs) with wide QRS"
      ],
      right: [
        "Hemodynamic instability: hypotension, altered consciousness, chest pain",
        "Pulseless ventricular tachycardia progressing to VF",
        "Third-degree heart block with complete AV dissociation",
        "Torsades de pointes: polymorphic VT with twisting QRS axis"
      ]
    },
    medications: [
      { name: "Amiodarone", type: "Class III Antiarrhythmic", action: "Blocks potassium channels prolonging repolarization, also has sodium/calcium channel and beta-blocking properties. Used for VT/VF refractory to defibrillation and rate control in atrial fibrillation", sideEffects: "Pulmonary toxicity, thyroid dysfunction, hepatotoxicity, corneal deposits, peripheral neuropathy", contra: "Severe sinus node dysfunction, second/third-degree heart block without pacemaker, cardiogenic shock", pearl: "IV loading causes hypotension from the diluent (polysorbate 80). ACLS dose: 300mg IV push for VF/pulseless VT, then 150mg repeat. Drip: 1mg/min x 6 hours, then 0.5mg/min." },
      { name: "Adenosine", type: "Endogenous Nucleoside", action: "Transiently blocks AV node conduction by activating potassium channels and inhibiting calcium influx, terminating re-entrant SVT", sideEffects: "Transient asystole (expected 5-10 seconds), chest tightness, flushing, bronchospasm", contra: "Second or third-degree heart block, severe asthma or COPD, wide-complex tachycardia of unknown origin", pearl: "Must be given as rapid IV push via proximal IV closest to the heart, followed by 20mL NS flush. Half-life is only 10 seconds. Warn patient they may feel chest pressure and brief sense of doom." }
    ],
    pearls: [
      "Unstable means hemodynamically compromised: hypotension, altered LOC, chest pain, or acute heart failure—treat the patient, not the monitor",
      "In cardiac arrest, high-quality CPR (rate 100-120/min, depth 2-2.4 inches, full recoil) is the single most important intervention",
      "Torsades de pointes is treated with IV magnesium 2g over 5-20 minutes, NOT standard antiarrhythmics which worsen it",
      "Always check a pulse with any rhythm change—PEA looks organized on the monitor but has no cardiac output"
    ],
    quiz: [
      { question: "A patient on telemetry suddenly develops a wide-complex tachycardia at 180 bpm. BP drops to 70/40 and the patient is diaphoretic and confused. What is the priority intervention?", options: ["Administer amiodarone 150mg IV over 10 minutes", "Perform synchronized cardioversion", "Administer adenosine 6mg rapid IV push", "Obtain a 12-lead ECG before treatment"], correct: 1, rationale: "Hemodynamic instability (hypotension, altered LOC) with tachycardia requires immediate synchronized cardioversion per ACLS protocol. Medications are for stable patients." },
      { question: "During cardiac arrest with VF, after the second defibrillation attempt, what medication does the nurse anticipate?", options: ["Atropine 1mg IV", "Amiodarone 300mg IV push", "Adenosine 12mg rapid IV push", "Diltiazem 20mg IV over 2 minutes"], correct: 1, rationale: "Per ACLS, epinephrine is given after the second shock, and amiodarone 300mg IV push is given for VF/pulseless VT refractory to defibrillation. A second dose of 150mg may follow." },
      { question: "A nurse is preparing to administer adenosine for stable SVT. Which action is essential?", options: ["Infuse slowly over 5 minutes via distal IV", "Give rapid IV push via proximal IV followed by 20mL NS flush and arm elevation", "Administer IM in the deltoid muscle", "Hold the dose if heart rate is below 200 bpm"], correct: 1, rationale: "Adenosine has a half-life of approximately 10 seconds and must be given as a rapid IV push through a proximal IV site closest to the heart, immediately followed by a 20mL saline flush." },
      { question: "A patient with symptomatic bradycardia (HR 38, BP 82/50, dizziness) does not respond to atropine. What does the nurse prepare next?", options: ["Adenosine 6mg IV push", "Transcutaneous pacing", "Amiodarone drip", "Cardioversion"], correct: 1, rationale: "When atropine fails for symptomatic bradycardia, transcutaneous pacing is the next intervention per ACLS. The nurse should apply pacing pads, set rate and milliamps, and verify capture." },
      { question: "Which ECG finding is associated with torsades de pointes?", options: ["Shortened PR interval", "Prolonged QT interval with polymorphic VT", "Delta waves indicating WPW", "ST elevation in contiguous leads"], correct: 1, rationale: "Torsades de pointes is a polymorphic ventricular tachycardia associated with prolonged QT interval. The QRS complexes appear to twist around the isoelectric line. Treatment is IV magnesium." }
    ]
  },

  "cardiac-auscultation-heart-sounds-and-murmurs-rn": {
    title: "Cardiac Auscultation: Heart Sounds and Murmurs",
    cellular: {
      title: "Hemodynamic Origins of Heart Sounds",
      content: "Heart sounds are produced by turbulent blood flow and valve closure vibrations during the cardiac cycle. S1 (lub) results from closure of the mitral and tricuspid valves at the onset of ventricular systole when ventricular pressure exceeds atrial pressure. S2 (dub) occurs when aortic and pulmonic valves close at the end of systole as ventricular pressure falls below arterial pressure. Physiologic splitting of S2 during inspiration occurs because increased venous return to the right heart delays pulmonic valve closure. S3 is produced by rapid passive ventricular filling in early diastole and is pathologic in adults over 40, indicating volume overload and decreased ventricular compliance as seen in heart failure. S4 results from atrial contraction against a stiff, noncompliant ventricle in late diastole, as in hypertensive heart disease or hypertrophic cardiomyopathy. Murmurs represent turbulent flow across abnormal valves, septal defects, or high-flow states graded on a I-VI scale."
    },
    riskFactors: [
      "Valvular heart disease from rheumatic fever causing fibrosis and calcification",
      "Infective endocarditis damaging valve leaflets",
      "Hypertensive heart disease causing left ventricular hypertrophy and diastolic dysfunction",
      "Congenital bicuspid aortic valve predisposing to early stenosis",
      "Age-related degenerative calcific aortic stenosis",
      "Dilated cardiomyopathy with functional mitral regurgitation",
      "Marfan syndrome with mitral valve prolapse and aortic root dilation"
    ],
    diagnostics: [
      "Systematic auscultation in all four primary areas: aortic, pulmonic, tricuspid, and mitral (Erb's point as fifth)",
      "Use bell of stethoscope for low-pitched sounds (S3, S4, mitral stenosis rumble)",
      "Use diaphragm for high-pitched sounds (S1, S2, aortic regurgitation, mitral regurgitation)",
      "Expect transthoracic echocardiography for definitive valve assessment",
      "Monitor BNP or NT-proBNP levels if heart failure suspected from S3 gallop",
      "Expect chest X-ray for cardiomegaly and pulmonary congestion"
    ],
    management: [
      "Refer for cardiology consultation with new-onset pathologic murmur",
      "Administer diuretics as ordered for volume overload with S3 gallop",
      "Administer afterload reducers (ACE inhibitors) for chronic regurgitant lesions as prescribed",
      "Monitor for worsening heart failure symptoms in valvular disease",
      "Prepare patient for surgical valve repair or replacement when indicated",
      "Provide anticoagulation education for patients with mechanical valve replacements"
    ],
    nursingActions: [
      "Auscultate in a quiet environment with the patient positioned upright, left lateral decubitus, and leaning forward",
      "Document murmur characteristics: timing (systolic/diastolic), location, radiation, grade (I-VI), and pitch",
      "Identify S3 gallop and report immediately as a sign of decompensated heart failure",
      "Assess for peripheral edema, jugular venous distension, and crackles that correlate with auscultatory findings",
      "Monitor daily weights and intake/output in patients with pathologic heart sounds",
      "Position patient in left lateral decubitus to accentuate mitral valve sounds",
      "Auscultate with patient leaning forward and exhaling to best hear aortic regurgitation"
    ],
    signs: {
      left: [
        "S3 gallop (ventricular gallop) heard best at apex with bell",
        "Systolic crescendo-decrescendo murmur at right upper sternal border (aortic stenosis)",
        "Holosystolic blowing murmur at apex radiating to axilla (mitral regurgitation)",
        "Mid-systolic click with late systolic murmur (mitral valve prolapse)"
      ],
      right: [
        "S4 gallop indicating diastolic dysfunction and stiff ventricle",
        "Diastolic decrescendo murmur at left sternal border (aortic regurgitation)",
        "Opening snap followed by low-pitched rumble at apex (mitral stenosis)",
        "Wide fixed split S2 (atrial septal defect)"
      ]
    },
    medications: [
      { name: "Furosemide", type: "Loop Diuretic", action: "Inhibits sodium-potassium-chloride cotransporter in the thick ascending limb of loop of Henle, reducing preload and pulmonary congestion in heart failure with S3 gallop", sideEffects: "Hypokalemia, hyponatremia, dehydration, ototoxicity at high doses", contra: "Severe hypokalemia, anuria, hepatic coma", pearl: "IV onset 5 minutes vs PO 30-60 minutes. Monitor potassium before and after administration. An S3 gallop with crackles indicates fluid overload warranting diuresis." },
      { name: "Lisinopril", type: "ACE Inhibitor", action: "Blocks conversion of angiotensin I to angiotensin II, reducing afterload and preventing ventricular remodeling in chronic regurgitant valve disease and heart failure", sideEffects: "Dry cough, hyperkalemia, angioedema, first-dose hypotension", contra: "Bilateral renal artery stenosis, pregnancy, history of angioedema", pearl: "Monitor renal function and potassium within 1-2 weeks of initiation. Hold if systolic BP <90 or potassium >5.5 mEq/L." }
    ],
    pearls: [
      "S3 gallop in an adult = heart failure until proven otherwise; S4 = stiff ventricle (hypertension, HCM, acute MI)",
      "Aortic stenosis murmur radiates to the carotids and diminishes with reduced cardiac output—a quieter murmur may indicate worsening",
      "Mitral stenosis is best heard with the bell at the apex in left lateral decubitus; it is a diastolic rumble easily missed",
      "Grade IV-VI murmurs have palpable thrills; any new diastolic murmur is pathologic and requires evaluation"
    ],
    quiz: [
      { question: "A nurse auscultates a low-pitched extra heart sound immediately after S2 at the cardiac apex using the bell of the stethoscope. The patient has bilateral crackles and peripheral edema. What does this finding suggest?", options: ["Normal physiologic finding", "S4 gallop indicating hypertensive crisis", "S3 gallop indicating decompensated heart failure", "Innocent flow murmur"], correct: 2, rationale: "An S3 gallop occurs in early diastole after S2 and is heard best at the apex with the bell. In adults, combined with crackles and edema, it indicates volume overload and decompensated heart failure." },
      { question: "Which position best enhances auscultation of aortic regurgitation?", options: ["Supine with legs elevated", "Left lateral decubitus", "Sitting upright, leaning forward, at end-expiration", "Trendelenburg position"], correct: 2, rationale: "Sitting up and leaning forward brings the aortic root closer to the chest wall. End-expiration reduces lung tissue between the heart and stethoscope, making the high-pitched diastolic blowing murmur of aortic regurgitation easier to hear." },
      { question: "A patient with known mitral stenosis asks why she needs warfarin. What is the nurse's best explanation?", options: ["Mitral stenosis increases risk of deep vein thrombosis", "Blood stagnates in the enlarged left atrium, increasing clot formation risk and stroke", "Warfarin prevents the valve from calcifying further", "All valve disease patients require lifelong anticoagulation"], correct: 1, rationale: "Mitral stenosis causes left atrial enlargement and blood stasis, which promotes thrombus formation. This can embolize to the brain causing stroke, especially when atrial fibrillation is present." },
      { question: "A harsh systolic crescendo-decrescendo murmur is heard best at the right upper sternal border with radiation to the carotids. What valve disorder does this suggest?", options: ["Mitral regurgitation", "Aortic stenosis", "Tricuspid regurgitation", "Pulmonic stenosis"], correct: 1, rationale: "Aortic stenosis produces a systolic crescendo-decrescendo (diamond-shaped) murmur best heard at the right second intercostal space (aortic area) that characteristically radiates to the carotid arteries." },
      { question: "Which assessment finding associated with a heart murmur warrants urgent intervention?", options: ["Grade II/VI systolic murmur without symptoms", "Physiologic splitting of S2 during inspiration", "New-onset diastolic murmur with syncope and chest pain", "Mid-systolic click in an asymptomatic young woman"], correct: 2, rationale: "A new diastolic murmur with syncope and chest pain suggests severe aortic regurgitation or aortic stenosis with hemodynamic compromise. All new diastolic murmurs are pathologic and require urgent evaluation." }
    ]
  },

  "cardiac-rhythm-interpretation-rn-level-rn": {
    title: "Cardiac Rhythm Interpretation (RN Level)",
    cellular: {
      title: "Electrophysiology of Cardiac Conduction",
      content: "The cardiac conduction system generates and transmits electrical impulses in a coordinated sequence. The SA node (intrinsic rate 60-100 bpm) initiates depolarization through phase 4 automaticity via hyperpolarization-activated cyclic nucleotide-gated (HCN) channels. The impulse spreads through atrial myocardium (producing the P wave), reaching the AV node where physiologic delay (0.12-0.20 seconds, the PR interval) allows atrial contraction to complete before ventricular activation. The bundle of His divides into right and left bundle branches traversing the interventricular septum, terminating in Purkinje fibers that rapidly depolarize ventricular myocardium from endocardium to epicardium (QRS complex, normally <0.12 seconds). Ventricular repolarization produces the T wave, during which the relative refractory period creates vulnerability to R-on-T phenomenon. QT interval represents total ventricular electrical activity and must be corrected for heart rate (QTc); prolongation above 470ms in women or 450ms in men increases torsades de pointes risk."
    },
    riskFactors: [
      "Myocardial ischemia altering cellular ion channel function and conduction velocity",
      "Hyperkalemia (>6.0 mEq/L) depolarizing resting membrane potential and slowing conduction",
      "Hypokalemia (<3.5 mEq/L) causing U waves and increased ectopy",
      "Digitalis toxicity causing almost any arrhythmia (classically atrial tachycardia with block)",
      "Hypothermia producing Osborn waves and predisposing to ventricular fibrillation",
      "Catheter-related mechanical irritation of the endocardium during central line placement",
      "Caffeine and sympathomimetic medications increasing automaticity"
    ],
    diagnostics: [
      "Systematic ECG interpretation: rate, rhythm, P waves, PR interval, QRS duration, ST segment, T waves, QT interval",
      "Calculate heart rate using 300 method (300 divided by number of large boxes between R-R intervals)",
      "Identify P-wave morphology and relationship to QRS complexes for AV conduction assessment",
      "Measure PR interval (normal 0.12-0.20 seconds) and QRS duration (normal <0.12 seconds)",
      "Assess ST segment for elevation (STEMI) or depression (ischemia/reciprocal changes)",
      "Calculate corrected QT interval using Bazett formula (QTc = QT / square root of RR interval)"
    ],
    management: [
      "Treat the patient not the monitor: correlate rhythm changes with clinical assessment",
      "Apply continuous telemetry monitoring for patients at risk for arrhythmias",
      "Implement ACLS protocols for life-threatening arrhythmias based on hemodynamic stability",
      "Correct electrolyte imbalances that precipitate or worsen arrhythmias",
      "Obtain 12-lead ECG immediately with any acute rhythm change or chest pain",
      "Notify rapid response team for new-onset symptomatic arrhythmias"
    ],
    nursingActions: [
      "Ensure proper lead placement: limb leads on limbs or torso, precordial leads in correct intercostal spaces",
      "Verify artifact versus true arrhythmia by checking lead connections and patient movement",
      "Print and label rhythm strips with patient identification, date, time, and interpretation",
      "Recognize and report new-onset atrial fibrillation for stroke risk assessment (CHA2DS2-VASc score)",
      "Identify wide-complex tachycardia as VT until proven otherwise and initiate emergency protocols",
      "Set appropriate alarm parameters based on patient baseline and current clinical status"
    ],
    signs: {
      left: [
        "Sinus rhythm: regular rate 60-100, upright P before each QRS, consistent PR interval",
        "Sinus bradycardia: rate <60, otherwise normal P-QRS-T morphology",
        "Atrial fibrillation: absent P waves, irregularly irregular rhythm, fibrillatory baseline",
        "Premature atrial contractions: early beat with abnormal P wave morphology"
      ],
      right: [
        "Ventricular tachycardia: wide QRS (>0.12s), rate >150, AV dissociation",
        "Third-degree AV block: P waves and QRS complexes march independently",
        "Asystole: flat line with no electrical activity confirmed in two leads",
        "Peaked T waves with widened QRS in hyperkalemia"
      ]
    },
    medications: [
      { name: "Atropine", type: "Anticholinergic (Parasympatholytic)", action: "Blocks vagal (parasympathetic) input to the SA and AV nodes, increasing heart rate and improving AV conduction in symptomatic bradycardia", sideEffects: "Tachycardia, urinary retention, dry mouth, mydriasis, delirium in elderly", contra: "Not effective in infranodal block (Mobitz II, third-degree with wide QRS) because these blocks are below vagal innervation", pearl: "ACLS dose: 1mg IV every 3-5 minutes, max 3mg. Will NOT work for heart transplant patients (denervated heart) or Mobitz II/complete heart block." },
      { name: "Diltiazem", type: "Non-dihydropyridine Calcium Channel Blocker", action: "Slows AV node conduction and increases AV node refractory period, reducing ventricular rate in atrial fibrillation and atrial flutter", sideEffects: "Hypotension, bradycardia, heart block, constipation, peripheral edema", contra: "Pre-existing second or third-degree AV block, systolic heart failure (EF <40%), concurrent IV beta-blocker use, WPW syndrome", pearl: "Bolus 0.25 mg/kg IV over 2 minutes, may repeat at 0.35 mg/kg. Drip at 5-15 mg/hour. Always confirm narrow-complex rhythm before administering—do not give for wide-complex tachycardia." }
    ],
    pearls: [
      "Wide-complex tachycardia is VT until proven otherwise—never give a calcium channel blocker for an undiagnosed wide complex rhythm",
      "In atrial fibrillation with rapid ventricular response and WPW, AV nodal blockers are contraindicated as they allow unopposed accessory pathway conduction causing VF",
      "First-degree AV block (PR >0.20s) is a conduction delay, not a true block, and usually requires monitoring only",
      "Look for the 'sawtooth' flutter waves in leads II, III, aVF at approximately 300 bpm for atrial flutter diagnosis"
    ],
    quiz: [
      { question: "A telemetry strip shows a regular rhythm at a rate of 150 bpm with narrow QRS complexes. P waves are not clearly visible. What rhythm should the nurse suspect?", options: ["Sinus tachycardia", "Atrial flutter with 2:1 block (flutter waves hidden at rate 150)", "Ventricular tachycardia", "Third-degree heart block"], correct: 1, rationale: "A narrow-complex regular tachycardia at exactly 150 bpm is classic for atrial flutter with 2:1 conduction (atrial rate 300/2 = 150). Flutter waves may be hidden in the QRS or T wave. Adenosine can unmask the flutter waves." },
      { question: "A nurse observes peaked T waves, widened QRS complexes, and a heart rate of 45 bpm on a patient's telemetry. Which lab result does the nurse anticipate?", options: ["Hypokalemia", "Hyperkalemia", "Hypercalcemia", "Hypomagnesemia"], correct: 1, rationale: "Peaked T waves, widened QRS, and bradycardia are classic ECG findings of hyperkalemia. Severe hyperkalemia can progress to a sine wave pattern and cardiac arrest. Emergent treatment includes IV calcium gluconate, insulin/dextrose, and sodium bicarbonate." },
      { question: "When interpreting a rhythm strip, the nurse identifies P waves that are not associated with QRS complexes, with the atrial rate at 80 bpm and ventricular rate at 35 bpm. What is this rhythm?", options: ["Second-degree AV block Type I (Wenckebach)", "Second-degree AV block Type II (Mobitz II)", "Third-degree (complete) heart block", "Sinus bradycardia with junctional escape"], correct: 2, rationale: "Complete dissociation between P waves and QRS complexes with independent atrial and ventricular rates defines third-degree heart block. The ventricles are being paced by an escape rhythm below the block." },
      { question: "A patient on continuous telemetry has an irregularly irregular rhythm with no identifiable P waves. What should the nurse assess for?", options: ["Signs of bundle branch block", "Risk factors for stroke using CHA2DS2-VASc scoring", "Need for immediate defibrillation", "Hyperkalemia on metabolic panel"], correct: 1, rationale: "Irregularly irregular rhythm without P waves is atrial fibrillation. AF increases stroke risk due to blood stasis in the fibrillating atria forming thrombi. CHA2DS2-VASc score guides anticoagulation decisions." },
      { question: "The nurse notes a rhythm change on telemetry: the PR interval progressively lengthens over 4 beats until a QRS complex is dropped, then the pattern repeats. What is this rhythm?", options: ["Third-degree heart block", "Second-degree AV block Type I (Wenckebach)", "Atrial fibrillation", "Sinus arrhythmia"], correct: 1, rationale: "Progressive PR prolongation followed by a dropped QRS with repetition of the cycle is the hallmark pattern of Mobitz Type I (Wenckebach). This is typically a benign condition occurring at the AV node level and rarely requires pacing." }
    ]
  },

  "fetal-heart-rate-monitoring-rn": {
    title: "Fetal Heart Rate Monitoring",
    cellular: {
      title: "Autonomic Regulation of Fetal Heart Rate",
      content: "Fetal heart rate (FHR) is regulated by the interplay between sympathetic and parasympathetic nervous systems, baroreceptors, chemoreceptors, and hormonal influences. The parasympathetic system (vagus nerve) dominates as the fetus matures, gradually lowering baseline FHR from approximately 160 bpm at early gestation to 110-160 bpm at term. Accelerations reflect intact sympathetic nervous system function and are a hallmark of fetal well-being. Variability—the beat-to-beat fluctuation in FHR—represents intact communication between the fetal cerebral cortex, medulla oblongata, and cardiac conduction system; moderate variability (6-25 bpm amplitude) is the single most reliable indicator of adequate fetal oxygenation. Decelerations result from specific physiologic mechanisms: early decelerations from vagal response to fetal head compression, variable decelerations from umbilical cord compression altering baroreceptor signaling, and late decelerations from uteroplacental insufficiency causing fetal chemoreceptor stimulation in response to hypoxemia during contractions."
    },
    riskFactors: [
      "Uteroplacental insufficiency from preeclampsia, chronic hypertension, or diabetes",
      "Umbilical cord abnormalities: nuchal cord, short cord, prolapsed cord, true knots",
      "Oligohydramnios reducing cushioning and increasing cord compression risk",
      "Maternal hypotension from epidural anesthesia or supine positioning",
      "Placental abruption reducing oxygen exchange surface area",
      "Post-term pregnancy (>42 weeks) with aging placenta",
      "Uterine tachysystole from oxytocin overstimulation (>5 contractions in 10 minutes)"
    ],
    diagnostics: [
      "Classify FHR baseline (normal 110-160 bpm), assess for tachycardia or bradycardia",
      "Evaluate variability: absent (<1 bpm), minimal (1-5 bpm), moderate (6-25 bpm), or marked (>25 bpm)",
      "Identify accelerations: transient increase ≥15 bpm above baseline lasting ≥15 seconds (≥32 weeks)",
      "Classify decelerations by morphology and timing relative to contractions",
      "Categorize tracing as Category I (normal), II (indeterminate), or III (abnormal) per NICHD guidelines",
      "Perform fetal scalp stimulation to assess for acceleration response when variability is questionable"
    ],
    management: [
      "Category I tracing: continue routine monitoring; no intervention needed",
      "Category II tracing: implement intrauterine resuscitation and increase surveillance frequency",
      "Category III tracing: prepare for immediate delivery while performing intrauterine resuscitation",
      "Intrauterine resuscitation: reposition maternal (left lateral), IV fluid bolus, discontinue oxytocin, administer oxygen",
      "For tachysystole: discontinue oxytocin and administer terbutaline 0.25mg subcutaneous as ordered",
      "Amnioinfusion for recurrent variable decelerations as ordered to cushion umbilical cord"
    ],
    nursingActions: [
      "Palpate maternal pulse simultaneously with FHR monitoring to differentiate maternal from fetal signal",
      "Reposition external ultrasound transducer when signal quality diminishes or doubles/halves maternal rate",
      "Document FHR characteristics at minimum every 30 minutes in first stage and every 15 minutes in second stage of labor",
      "Communicate FHR concerns using standardized SBAR format to the provider",
      "Recognize that absent variability with recurrent late decelerations (Category III) requires emergency response",
      "Perform Leopold maneuvers to optimize transducer placement over fetal back"
    ],
    signs: {
      left: [
        "Moderate variability (6-25 bpm) indicating intact fetal neurological function",
        "Presence of accelerations indicating fetal well-being (reactive NST)",
        "Early decelerations mirroring contractions (benign, head compression)",
        "Baseline FHR 110-160 bpm"
      ],
      right: [
        "Absent variability with recurrent late decelerations (Category III, emergent)",
        "Prolonged deceleration lasting >2 minutes (possible cord prolapse or abruption)",
        "Variable decelerations with slow return to baseline or absent variability",
        "Sinusoidal pattern (smooth undulating wave, indicates severe fetal anemia)"
      ]
    },
    medications: [
      { name: "Terbutaline", type: "Beta-2 Agonist (Tocolytic)", action: "Relaxes uterine smooth muscle by stimulating beta-2 adrenergic receptors, used for acute tocolysis in uterine tachysystole causing non-reassuring FHR pattern", sideEffects: "Maternal tachycardia, tremor, hypokalemia, hyperglycemia, pulmonary edema with prolonged use", contra: "Maternal cardiac disease, uncontrolled hyperthyroidism, prolonged use (>48 hours, FDA black box warning)", pearl: "Given as 0.25mg subcutaneous for acute rescue tocolysis. Onset within 5-15 minutes. Monitor maternal heart rate and potassium. Not for maintenance tocolysis." }
    ],
    pearls: [
      "Moderate variability is the single most reassuring sign of fetal well-being—its presence virtually excludes fetal metabolic acidemia at the time observed",
      "A sinusoidal pattern (smooth sine wave without variability) is always pathologic and suggests severe fetal anemia—most commonly from Rh isoimmunization, fetomaternal hemorrhage, or twin-to-twin transfusion",
      "Variable decelerations are the most common deceleration type and reflect cord compression; shoulder-shaped (with accelerations before and after) variables are compensatory",
      "When in doubt about fetal status, perform fetal scalp stimulation—an acceleration in response essentially rules out acidemia"
    ],
    quiz: [
      { question: "A nurse observes uniform decelerations that begin and end after contractions with a nadir occurring after the peak of the contraction. Variability is minimal. How should this pattern be classified?", options: ["Category I with early decelerations", "Category II with variable decelerations", "Category III with late decelerations and minimal variability", "Normal variant requiring no intervention"], correct: 2, rationale: "Late decelerations (uniform in shape, onset and nadir after the contraction peak) with minimal variability represent a Category III tracing indicating inadequate fetal oxygenation requiring immediate intervention." },
      { question: "During oxytocin administration, the nurse counts 6 contractions in a 10-minute window. The FHR shows variable decelerations. What is the priority action?", options: ["Increase the oxytocin rate to strengthen contractions", "Discontinue oxytocin and reposition the patient", "Prepare for immediate cesarean delivery", "Continue current rate and monitor closely"], correct: 1, rationale: "Six contractions in 10 minutes constitutes tachysystole. With non-reassuring FHR patterns, the priority is to discontinue oxytocin, reposition the mother to left lateral, administer IV fluid bolus, and notify the provider." },
      { question: "A laboring patient has a Category I tracing. What does this indicate?", options: ["FHR baseline 110-160, moderate variability, no late or variable decelerations, with or without accelerations and early decelerations", "Indeterminate tracing requiring further evaluation", "Abnormal tracing requiring emergent delivery", "Tracing that cannot be interpreted"], correct: 0, rationale: "Category I is normal: baseline 110-160 bpm, moderate variability, no late or variable decelerations. Accelerations and early decelerations may be present. This tracing is strongly predictive of normal fetal acid-base status." },
      { question: "A nurse notes a smooth undulating sine-wave pattern on the fetal monitor without accelerations or variability. What condition should be suspected?", options: ["Normal fetal sleep cycle", "Severe fetal anemia", "Maternal medication effect", "Equipment malfunction"], correct: 1, rationale: "A true sinusoidal pattern—smooth, regular undulations without variability or accelerations—is pathologic and indicates severe fetal anemia (Rh isoimmunization, fetomaternal hemorrhage). This requires emergent evaluation and likely delivery." },
      { question: "What is the most appropriate nursing action when moderate variability is present with occasional accelerations and no decelerations?", options: ["Prepare for emergency cesarean section", "Perform fetal scalp stimulation to verify well-being", "Continue routine monitoring as the tracing is reassuring", "Administer oxygen via non-rebreather mask"], correct: 2, rationale: "Moderate variability with accelerations and no decelerations is a Category I tracing, the most reassuring pattern. Routine monitoring is appropriate with no interventions needed." }
    ]
  },

  "fluid-and-electrolytes-1-rn": {
    title: "Fluid & Electrolytes (1)",
    cellular: {
      title: "Fluid Compartment Dynamics and Electrolyte Transport",
      content: "Total body water comprises approximately 60% of adult body weight, distributed between intracellular fluid (ICF, 40% or two-thirds) and extracellular fluid (ECF, 20% or one-third). ECF further divides into intravascular (plasma, 5%) and interstitial (15%) compartments. Fluid movement between compartments is governed by Starling forces: hydrostatic pressure pushes fluid out of capillaries while oncotic pressure (primarily from albumin) pulls fluid back in. The sodium-potassium ATPase pump maintains electrochemical gradients: sodium (135-145 mEq/L) as the primary ECF cation controlling osmolality and fluid distribution, and potassium (3.5-5.0 mEq/L) as the primary ICF cation critical for resting membrane potential and cellular excitability. ADH (vasopressin) from the posterior pituitary regulates water reabsorption in collecting ducts in response to serum osmolality changes as small as 1-2%. Aldosterone from the adrenal cortex promotes sodium reabsorption and potassium excretion in the distal nephron. Disruption of these mechanisms causes fluid volume excess, deficit, or electrolyte imbalances with significant clinical consequences."
    },
    riskFactors: [
      "Heart failure and cirrhosis causing third-spacing and fluid retention",
      "Chronic kidney disease impairing electrolyte excretion and fluid balance",
      "Diabetic ketoacidosis causing osmotic diuresis and profound dehydration",
      "Prolonged vomiting or nasogastric suction depleting chloride, potassium, and hydrogen ions",
      "Diuretic therapy (loop diuretics deplete potassium and magnesium)",
      "SIADH causing dilutional hyponatremia from excess water retention",
      "Burns increasing insensible fluid losses and capillary permeability"
    ],
    diagnostics: [
      "Monitor serum sodium, potassium, chloride, bicarbonate, calcium, magnesium, and phosphorus levels",
      "Assess serum osmolality (normal 275-295 mOsm/kg) to differentiate causes of hyponatremia",
      "Monitor urine specific gravity (1.005-1.030) and urine osmolality for concentration assessment",
      "Assess BUN/creatinine ratio to differentiate prerenal from intrinsic renal causes of fluid imbalance",
      "Monitor arterial blood gas for acid-base status and its relationship to electrolyte shifts",
      "Track daily weights: 1 kg weight change equals approximately 1 liter of fluid"
    ],
    management: [
      "Fluid volume deficit: administer isotonic crystalloids (0.9% NS or lactated Ringer's) as ordered for volume resuscitation",
      "Fluid volume excess: administer diuretics as ordered, restrict sodium and fluid intake per protocol",
      "Hyponatremia: restrict free water for dilutional causes; administer hypertonic saline (3% NaCl) for severe symptomatic cases via central line with close monitoring",
      "Hyperkalemia: administer IV calcium gluconate for cardiac membrane stabilization, insulin/dextrose for intracellular shifting, sodium polystyrene for potassium elimination",
      "Hypokalemia: replace potassium IV (no faster than 10 mEq/hour peripherally, 20 mEq/hour centrally) with cardiac monitoring",
      "Hypomagnesemia: replace IV magnesium sulfate 1-2g over 1 hour with DTRs and cardiac monitoring"
    ],
    nursingActions: [
      "Maintain strict intake and output documentation including all IV fluids, PO intake, urine, drainage, and insensible losses",
      "Weigh patient daily at the same time, on the same scale, wearing similar clothing",
      "Assess for fluid volume deficit: decreased skin turgor, dry mucous membranes, orthostatic hypotension, tachycardia, concentrated urine",
      "Assess for fluid volume excess: peripheral edema, jugular venous distension, crackles, weight gain, dyspnea",
      "Monitor cardiac rhythm continuously during IV potassium and magnesium replacement",
      "Never give IV potassium as a bolus push; always dilute appropriately and administer via infusion pump"
    ],
    signs: {
      left: [
        "Fluid volume deficit: tachycardia, hypotension, poor skin turgor, concentrated urine",
        "Hypokalemia: muscle weakness, diminished reflexes, flattened T waves, U waves on ECG",
        "Hyponatremia: headache, confusion, nausea, seizures when sodium <120 mEq/L",
        "Hypocalcemia: positive Trousseau and Chvostek signs, tetany, prolonged QT"
      ],
      right: [
        "Fluid volume excess: crackles, JVD, S3 gallop, peripheral edema, weight gain",
        "Hyperkalemia: peaked T waves, widened QRS, bradycardia, muscle weakness progressing to paralysis",
        "Hypernatremia: thirst, dry sticky mucous membranes, restlessness, lethargy, seizures",
        "Hypercalcemia: constipation, polyuria, muscle weakness, shortened QT, confusion"
      ]
    },
    medications: [
      { name: "Potassium Chloride (IV)", type: "Electrolyte Replacement", action: "Directly replaces intracellular potassium deficit, restoring resting membrane potential critical for cardiac, neurological, and skeletal muscle function", sideEffects: "Phlebitis at peripheral IV site, hyperkalemia with rapid infusion, cardiac arrest with bolus push", contra: "Hyperkalemia, severe renal failure without dialysis, untreated Addison disease", pearl: "NEVER IV push potassium. Maximum peripheral rate 10 mEq/hour; central line up to 20 mEq/hour. Always on cardiac monitor. Burns at peripheral site—consider central line for concentrated solutions (>40 mEq/L)." },
      { name: "Calcium Gluconate (IV)", type: "Electrolyte/Membrane Stabilizer", action: "Provides ionized calcium for membrane stabilization in hyperkalemia, replaces calcium deficit, antagonizes neuromuscular effects of hypermagnesemia", sideEffects: "Bradycardia with rapid infusion, tissue necrosis with extravasation, hypercalcemia", contra: "Hypercalcemia, digitalis toxicity (potentiates digoxin), concurrent IV bicarbonate (precipitates)", pearl: "In hyperkalemia, calcium gluconate does NOT lower potassium—it stabilizes cardiac membranes while other treatments (insulin/dextrose, kayexalate) work. Give over 3-5 minutes with cardiac monitoring." }
    ],
    pearls: [
      "Correct hyponatremia slowly: no more than 8-10 mEq/L in 24 hours to prevent osmotic demyelination syndrome (central pontine myelinolysis)",
      "Always check magnesium when potassium is low—hypomagnesemia causes renal potassium wasting and makes hypokalemia refractory to replacement",
      "In hyperkalemia, the order of treatment by onset: calcium gluconate (immediate membrane stabilization), insulin/dextrose (15-30 min shift), sodium bicarbonate (shift), kayexalate (hours, elimination), dialysis (definitive)",
      "1 kg of weight change in 24 hours = approximately 1 liter of fluid gain or loss"
    ],
    quiz: [
      { question: "A patient with heart failure gains 3 kg overnight and has new bilateral crackles and 2+ pedal edema. Which intervention does the nurse anticipate?", options: ["Increase IV fluid rate", "Administer furosemide IV as ordered", "Restrict potassium intake", "Encourage ambulation to reduce edema"], correct: 1, rationale: "A 3 kg weight gain indicates approximately 3 liters of fluid retention. With crackles and edema in a heart failure patient, IV diuretic therapy (furosemide) is the expected intervention to promote fluid excretion." },
      { question: "A nurse is replacing IV potassium for a patient with K+ of 2.8 mEq/L. Which safety measure is essential?", options: ["Administer as IV push for faster correction", "Infuse no faster than 10 mEq/hour via peripheral IV with continuous cardiac monitoring", "Mix with dextrose 5% and infuse over 30 minutes", "Give undiluted via central line at 40 mEq/hour"], correct: 1, rationale: "IV potassium must never be given as a bolus push due to risk of fatal cardiac arrhythmia. Peripheral IV maximum rate is 10 mEq/hour. Continuous cardiac monitoring is required to detect hyperkalemia-related ECG changes." },
      { question: "A post-thyroidectomy patient reports tingling around the mouth and fingertips. The nurse taps the facial nerve and observes ipsilateral facial muscle contraction. What electrolyte imbalance does this suggest?", options: ["Hyperkalemia", "Hypocalcemia", "Hypernatremia", "Hypomagnesemia"], correct: 1, rationale: "Facial muscle contraction upon tapping the facial nerve (Chvostek sign) and perioral/fingertip tingling are classic signs of hypocalcemia. Post-thyroidectomy hypocalcemia occurs from inadvertent removal of or damage to the parathyroid glands." },
      { question: "A patient with SIADH has a sodium level of 118 mEq/L and is having seizures. What is the priority treatment?", options: ["Restrict fluids to 1000 mL/day", "Administer 3% hypertonic saline via infusion pump with close monitoring", "Give normal saline bolus at 500 mL/hour", "Administer loop diuretics immediately"], correct: 1, rationale: "Severe symptomatic hyponatremia (seizures) with Na <120 requires cautious administration of 3% hypertonic saline to raise sodium. However, correction must not exceed 8-10 mEq/L in 24 hours to prevent osmotic demyelination syndrome." },
      { question: "Which ECG change is most concerning in a patient with a potassium level of 6.8 mEq/L?", options: ["Flattened T waves and U waves", "Peaked T waves with widened QRS complexes", "ST elevation in leads V1-V4", "Prolonged QT interval"], correct: 1, rationale: "Peaked T waves and widened QRS complexes are hallmark ECG findings of severe hyperkalemia (>6.0). If untreated, this progresses to sine wave pattern and cardiac arrest. Immediate treatment with IV calcium gluconate is needed to stabilize the myocardium." }
    ]
  },

  "fluid-electrolyte-and-acid-base-balance-rn-rn": {
    title: "Fluid, Electrolyte, and Acid-Base Balance (RN)",
    cellular: {
      title: "Acid-Base Homeostasis and Buffer Systems",
      content: "Arterial blood pH is tightly regulated between 7.35-7.45 through three interrelated buffer systems. The bicarbonate buffer system (H2CO3/HCO3-) is the most important extracellular buffer, regulated by the lungs (CO2 excretion) and kidneys (HCO3- reabsorption and H+ secretion). The Henderson-Hasselbalch equation describes the relationship: pH is proportional to the ratio of bicarbonate (metabolic component, normal 22-26 mEq/L) to carbonic acid (respiratory component, reflected by PaCO2, normal 35-45 mmHg). The lungs respond rapidly (minutes) by adjusting ventilation: hyperventilation blows off CO2 to compensate for metabolic acidosis, while hypoventilation retains CO2 for metabolic alkalosis. Renal compensation is slower (hours to days) but more powerful: the kidneys regenerate bicarbonate, excrete hydrogen ions, and produce ammonia for acid buffering. Compensation returns pH toward normal but never fully normalizes it unless the primary disorder is corrected. Anion gap calculation (Na - [Cl + HCO3], normal 8-12) differentiates causes of metabolic acidosis: elevated gap indicates accumulation of unmeasured acids (DKA, lactic acidosis, uremia, toxins)."
    },
    riskFactors: [
      "Diabetic ketoacidosis from insulin deficiency causing ketone body accumulation",
      "Chronic kidney disease reducing bicarbonate regeneration and acid excretion",
      "COPD causing chronic respiratory acidosis from CO2 retention",
      "Prolonged vomiting causing metabolic alkalosis from HCl loss",
      "Diarrhea causing metabolic acidosis from bicarbonate loss in stool",
      "Mechanical ventilation settings causing iatrogenic respiratory alkalosis or acidosis",
      "Sepsis and shock causing lactic acidosis from tissue hypoperfusion"
    ],
    diagnostics: [
      "Obtain arterial blood gas (ABG) and interpret systematically: pH, PaCO2, HCO3, PaO2, base excess",
      "Calculate anion gap for metabolic acidosis: elevated gap (>12) indicates acid accumulation (MUDPILES mnemonic)",
      "Assess serum lactate level to evaluate tissue perfusion and anaerobic metabolism",
      "Monitor serum electrolytes: potassium shifts with pH changes (0.6 mEq/L change per 0.1 pH unit)",
      "Evaluate urine pH and electrolytes to assess renal compensatory response",
      "Correlate ABG findings with venous blood gas for trending when arterial access is limited"
    ],
    management: [
      "Respiratory acidosis: optimize ventilation—bronchodilators for COPD, increase rate/tidal volume on ventilator, treat underlying cause",
      "Respiratory alkalosis: address underlying cause (anxiety, pain, fever, sepsis), adjust ventilator settings to reduce minute ventilation",
      "Metabolic acidosis: treat underlying cause (insulin for DKA, fluids for lactic acidosis), sodium bicarbonate only for severe pH <7.1",
      "Metabolic alkalosis: replace volume and chloride with 0.9% NS, replace potassium, discontinue offending medications",
      "Mixed disorders: identify and treat each component separately",
      "Monitor for compensation adequacy using Winter formula for metabolic acidosis"
    ],
    nursingActions: [
      "Perform Allen test before radial arterial blood gas draw to confirm collateral ulnar circulation",
      "Apply pressure to arterial puncture site for minimum 5 minutes after ABG draw",
      "Monitor respiratory rate and depth as indicators of acid-base compensation (Kussmaul respirations in metabolic acidosis)",
      "Assess neurological status as pH extremes affect consciousness (confusion, seizures, coma)",
      "Monitor potassium levels closely during acid-base correction: acidosis drives potassium out of cells, alkalosis drives it in",
      "Report ABG results promptly and correlate with clinical presentation"
    ],
    signs: {
      left: [
        "Respiratory acidosis: hypoventilation, CO2 narcosis (confusion, somnolence), headache",
        "Metabolic acidosis: Kussmaul respirations (deep rapid breathing), fruity breath in DKA",
        "Respiratory alkalosis: hyperventilation, lightheadedness, perioral numbness, carpopedal spasm",
        "Metabolic alkalosis: hypoventilation (compensatory), muscle twitching, tetany"
      ],
      right: [
        "pH <7.35 with PaCO2 >45: primary respiratory acidosis",
        "pH <7.35 with HCO3 <22: primary metabolic acidosis",
        "pH >7.45 with PaCO2 <35: primary respiratory alkalosis",
        "pH >7.45 with HCO3 >26: primary metabolic alkalosis"
      ]
    },
    medications: [
      { name: "Sodium Bicarbonate (IV)", type: "Alkalinizing Agent", action: "Directly provides bicarbonate ions to buffer hydrogen ions in severe metabolic acidosis, raising serum pH", sideEffects: "Metabolic alkalosis with overcorrection, hypernatremia, hypokalemia (drives K+ intracellularly), paradoxical CSF acidosis", contra: "Metabolic or respiratory alkalosis, hypocalcemia (worsens ionized calcium), chloride-responsive alkalosis", pearl: "Reserved for severe acidosis (pH <7.1) when other measures fail. Not routinely used in DKA (insulin corrects the underlying cause). Can paradoxically worsen intracellular acidosis. Monitor ABG 15-30 minutes after administration." },
      { name: "Acetazolamide", type: "Carbonic Anhydrase Inhibitor", action: "Inhibits carbonic anhydrase in proximal tubule, promoting bicarbonate excretion and sodium/water diuresis, used for metabolic alkalosis from loop diuretics", sideEffects: "Metabolic acidosis with overuse, hypokalemia, paresthesias, sulfa allergy cross-reactivity", contra: "Hepatic cirrhosis (may precipitate hepatic encephalopathy), hypokalemia, sulfonamide allergy", pearl: "Useful for contraction alkalosis in patients on chronic loop diuretics. Also used for altitude sickness and idiopathic intracranial hypertension. Causes bicarbonate diuresis." }
    ],
    pearls: [
      "ABG interpretation in 5 steps: (1) look at pH, (2) identify primary disorder from PaCO2 or HCO3, (3) check for compensation, (4) calculate anion gap if metabolic acidosis, (5) correlate clinically",
      "MUDPILES for elevated anion gap metabolic acidosis: Methanol, Uremia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates",
      "Potassium and pH have an inverse relationship: for every 0.1 decrease in pH, potassium rises approximately 0.6 mEq/L—correct potassium before correcting acidosis to prevent life-threatening hypokalemia",
      "Never correct chronic respiratory acidosis too rapidly (e.g., over-ventilating COPD patients) as this causes post-hypercapnic metabolic alkalosis and seizures"
    ],
    quiz: [
      { question: "ABG results: pH 7.28, PaCO2 55 mmHg, HCO3 25 mEq/L, PaO2 58 mmHg. What acid-base disorder is present?", options: ["Metabolic acidosis", "Uncompensated respiratory acidosis", "Compensated metabolic alkalosis", "Respiratory alkalosis"], correct: 1, rationale: "pH is acidotic (<7.35), PaCO2 is elevated (>45) indicating respiratory origin, and HCO3 is normal (22-26) indicating no renal compensation yet. This is uncompensated respiratory acidosis, likely from hypoventilation." },
      { question: "A patient in DKA has a pH of 7.10 and potassium of 5.8 mEq/L. As the nurse begins insulin and fluid resuscitation, what electrolyte must be closely monitored?", options: ["Sodium", "Potassium", "Calcium", "Chloride"], correct: 1, rationale: "In DKA, acidosis shifts potassium extracellularly, causing falsely elevated serum levels despite total body potassium depletion. As insulin and pH correction drive potassium back into cells, severe hypokalemia can develop rapidly, causing fatal arrhythmias." },
      { question: "Which ABG finding indicates the lungs are compensating for metabolic acidosis?", options: ["PaCO2 of 50 mmHg", "PaCO2 of 28 mmHg", "HCO3 of 30 mEq/L", "PaO2 of 95 mmHg"], correct: 1, rationale: "In metabolic acidosis, the lungs compensate by hyperventilation (Kussmaul respirations) to blow off CO2, lowering PaCO2 below normal (35-45). A PaCO2 of 28 indicates appropriate respiratory compensation." },
      { question: "A patient with persistent vomiting has ABG: pH 7.52, PaCO2 48, HCO3 38. What is the primary disorder?", options: ["Respiratory acidosis", "Metabolic alkalosis with respiratory compensation", "Respiratory alkalosis", "Mixed acid-base disorder"], correct: 1, rationale: "pH is alkalotic (>7.45), HCO3 is elevated (>26) indicating metabolic alkalosis from vomiting (loss of HCl). PaCO2 is elevated (>45) indicating the lungs are compensating by retaining CO2 (hypoventilation)." },
      { question: "The nurse calculates an anion gap of 22 in a patient with metabolic acidosis. Which condition is most likely?", options: ["Diarrhea-induced bicarbonate loss", "Normal saline overinfusion", "Lactic acidosis from septic shock", "Renal tubular acidosis"], correct: 2, rationale: "An elevated anion gap (>12) indicates accumulation of unmeasured acids. Lactic acidosis from sepsis/shock is a common cause. Normal anion gap acidosis (hyperchloremic) would be seen with diarrhea, RTA, or saline overinfusion." }
    ]
  },

  "advanced-cardiovascular-nursing-rn-rn": {
    title: "Advanced Cardiovascular Nursing (RN)",
    cellular: {
      title: "Cardiovascular Hemodynamics and Heart Failure Pathophysiology",
      content: "Cardiac output (CO = heart rate × stroke volume) is determined by preload, afterload, and contractility. Preload (end-diastolic volume/pressure) reflects venous return and is measured clinically via central venous pressure (CVP, normal 2-6 mmHg) or pulmonary artery wedge pressure (PAWP, normal 8-12 mmHg). Afterload represents the resistance the ventricle must overcome to eject blood, estimated by systemic vascular resistance (SVR, normal 800-1200 dynes/sec/cm-5). Contractility (inotropy) is the inherent force of myocardial contraction independent of preload. In heart failure, compensatory mechanisms (Frank-Starling mechanism, sympathetic nervous system activation, RAAS activation, ventricular remodeling) initially maintain cardiac output but become maladaptive over time. Neurohormonal activation causes sodium/water retention (increased preload), vasoconstriction (increased afterload), and progressive ventricular dilation and fibrosis, creating a vicious cycle of worsening failure. BNP is released by stretched ventricular myocytes and serves as both a biomarker and a counter-regulatory hormone promoting natriuresis."
    },
    riskFactors: [
      "Coronary artery disease reducing myocardial perfusion and causing ischemic cardiomyopathy",
      "Chronic uncontrolled hypertension increasing afterload and causing left ventricular hypertrophy",
      "Valvular heart disease creating chronic volume or pressure overload",
      "Diabetes mellitus accelerating atherosclerosis and causing diabetic cardiomyopathy",
      "Cardiotoxic chemotherapy (anthracyclines such as doxorubicin)",
      "Chronic alcohol abuse causing dilated cardiomyopathy",
      "Familial or genetic dilated or hypertrophic cardiomyopathy"
    ],
    diagnostics: [
      "Monitor BNP (>100 pg/mL suggests HF) or NT-proBNP for heart failure diagnosis and management",
      "Expect echocardiography to assess ejection fraction, wall motion, valvular function, and chamber dimensions",
      "Monitor troponin for acute coronary syndrome when chest pain is present",
      "Assess chest X-ray for cardiomegaly, pulmonary vascular congestion, and pleural effusions",
      "Monitor hemodynamic parameters via arterial line and/or pulmonary artery catheter in critical care",
      "Assess 12-lead ECG for ischemia, hypertrophy, bundle branch block, or arrhythmias"
    ],
    management: [
      "HFrEF guideline-directed medical therapy: ACE inhibitor/ARB + beta-blocker + aldosterone antagonist + SGLT2 inhibitor",
      "Administer IV diuretics for acute decompensation with volume overload",
      "Initiate vasodilator therapy (nitroglycerin, nitroprusside) for afterload reduction in acute HF with hypertension",
      "Administer inotropes (dobutamine, milrinone) for cardiogenic shock with low cardiac output",
      "Implement sodium restriction (2g/day) and fluid restriction (1.5-2L/day) for chronic heart failure",
      "Prepare patient for device therapy (ICD, CRT) or advanced therapies (LVAD, transplant) when indicated"
    ],
    nursingActions: [
      "Assess heart sounds for S3 gallop (volume overload), S4 (stiff ventricle), and new murmurs",
      "Monitor daily weights and notify provider of weight gain >2 lbs/day or 5 lbs/week",
      "Assess jugular venous distension at 30-45 degree elevation as indicator of right-sided preload",
      "Monitor oxygen saturation and administer supplemental oxygen to maintain SpO2 >94%",
      "Position patient in high Fowler's position for dyspnea and pulmonary congestion",
      "Titrate vasoactive medications based on hemodynamic parameters and provider orders",
      "Educate patient on daily weights, sodium restriction, medication adherence, and when to seek emergency care"
    ],
    signs: {
      left: [
        "Left-sided HF: dyspnea, orthopnea, PND, crackles, S3 gallop, pink frothy sputum (pulmonary edema)",
        "Decreased exercise tolerance and fatigue from reduced cardiac output",
        "Tachycardia and narrow pulse pressure as compensatory responses",
        "Cool extremities with delayed capillary refill indicating poor perfusion"
      ],
      right: [
        "Right-sided HF: JVD, hepatomegaly, ascites, dependent peripheral edema, weight gain",
        "Cardiogenic shock: hypotension, altered mental status, oliguria, mottled extremities",
        "Acute pulmonary edema: severe dyspnea, pink frothy sputum, diaphoresis, cyanosis",
        "New-onset atrial fibrillation from atrial dilation"
      ]
    },
    medications: [
      { name: "Carvedilol", type: "Non-selective Beta-Blocker with Alpha-1 Blocking Activity", action: "Blocks beta-1 (reduces heart rate and contractility), beta-2, and alpha-1 receptors (vasodilation), reducing neurohormonal activation and improving survival in HFrEF", sideEffects: "Bradycardia, hypotension, dizziness, fatigue, bronchospasm, weight gain", contra: "Decompensated acute heart failure requiring inotropes, severe bradycardia, second/third-degree heart block, severe asthma, cardiogenic shock", pearl: "Start low (3.125mg BID) and titrate slowly in stable HF patients. Never initiate during acute decompensation. Do not stop abruptly—taper over 1-2 weeks to prevent rebound tachycardia." },
      { name: "Dobutamine", type: "Selective Beta-1 Agonist (Inotrope)", action: "Stimulates beta-1 adrenergic receptors increasing myocardial contractility and cardiac output with mild vasodilation, used for acute cardiogenic shock", sideEffects: "Tachycardia, ventricular ectopy, hypertension, tolerance with prolonged use", contra: "Hypertrophic obstructive cardiomyopathy (increases obstruction), idiopathic hypertrophic subaortic stenosis", pearl: "Dose range 2-20 mcg/kg/min. Requires continuous cardiac monitoring. Tachyphylaxis develops after 72 hours of continuous infusion. Used as bridge to recovery, device, or transplant—not for long-term use." }
    ],
    pearls: [
      "The four pillars of HFrEF therapy (ACEi/ARB/ARNI + beta-blocker + MRA + SGLT2i) each independently reduce mortality—titrate all to target doses",
      "Orthopnea and PND are among the most specific symptoms for heart failure; S3 gallop is the most specific physical exam finding",
      "In acute decompensation: 'warm and wet' (adequate perfusion + congestion) = diuretics; 'cold and wet' (poor perfusion + congestion) = inotropes + diuretics; 'cold and dry' = cautious fluids",
      "BNP <100 pg/mL has a 90% negative predictive value for ruling out heart failure as the cause of dyspnea"
    ],
    quiz: [
      { question: "A patient with HFrEF (EF 25%) is stable on lisinopril and furosemide. Which medication class should be added next per guideline-directed therapy?", options: ["Calcium channel blocker", "Evidence-based beta-blocker (carvedilol, metoprolol succinate, or bisoprolol)", "Digoxin", "Hydralazine"], correct: 1, rationale: "Evidence-based beta-blockers (carvedilol, metoprolol succinate, bisoprolol) reduce mortality in stable HFrEF and should be added when the patient is euvolemic and stable. They are started at low doses and titrated up." },
      { question: "A patient in the ICU on a dobutamine drip has been on the infusion for 4 days. The nurse notes decreasing cardiac output despite the same dose. What is the most likely cause?", options: ["New myocardial infarction", "Tachyphylaxis to dobutamine", "Development of aortic stenosis", "Pulmonary embolism"], correct: 1, rationale: "Dobutamine tachyphylaxis (tolerance) develops after 72 hours of continuous infusion due to beta-receptor downregulation. Increasing the dose provides diminishing returns. Alternative inotropes or mechanical support should be considered." },
      { question: "A nurse assesses a patient with acute HF exacerbation. Vitals: BP 88/60, HR 112, cold mottled extremities, crackles bilaterally, urine output 15 mL/hour. What hemodynamic profile does this represent?", options: ["Warm and wet", "Cold and wet", "Warm and dry", "Cold and dry"], correct: 1, rationale: "Hypotension, tachycardia, cold mottled extremities (poor perfusion = 'cold'), and crackles with decreased urine output (congestion = 'wet') represent the cold and wet profile. This patient needs inotropic support plus diuretics." },
      { question: "A heart failure patient reports sleeping on three pillows and waking up at night gasping for air. What are these symptoms called?", options: ["Orthopnea and paroxysmal nocturnal dyspnea (PND)", "Sleep apnea", "Anxiety with panic attacks", "Pneumonia"], correct: 0, rationale: "Orthopnea (needing multiple pillows to breathe) and PND (sudden awakening with dyspnea 1-2 hours after lying down) are hallmark symptoms of left-sided heart failure caused by redistribution of fluid to the lungs in the supine position." },
      { question: "Which lab value best differentiates heart failure from pulmonary causes of dyspnea?", options: ["Troponin I", "BNP or NT-proBNP", "D-dimer", "Hemoglobin A1C"], correct: 1, rationale: "BNP (brain natriuretic peptide) is released by stretched ventricular myocytes in response to volume and pressure overload. BNP >100 pg/mL strongly suggests heart failure as the cause of dyspnea, while <100 effectively rules it out." }
    ]
  },

  "pulmonary-valve-stenosis-2-rn": {
    title: "Pulmonary Valve Stenosis",
    cellular: {
      title: "Right Ventricular Pressure Overload Pathophysiology",
      content: "Pulmonary valve stenosis (PS) creates an obstruction to right ventricular outflow, requiring the right ventricle to generate higher pressures to eject blood into the pulmonary artery. The stenotic valve results from fused or thickened valve commissures, most commonly congenital in origin (occurring in approximately 8-10% of congenital heart defects). In mild PS, the right ventricle compensates through concentric hypertrophy, maintaining normal cardiac output at rest. As stenosis progresses, right ventricular end-diastolic pressure rises, causing right atrial dilation and potential right-to-left shunting through a patent foramen ovale (resulting in cyanosis). Severe PS leads to right ventricular failure with reduced pulmonary blood flow, decreased left ventricular filling, and diminished systemic cardiac output. Post-stenotic dilation of the pulmonary artery occurs from turbulent jet flow striking the vessel wall distal to the valve. The severity is classified by the pressure gradient across the valve: mild (<36 mmHg), moderate (36-64 mmHg), or severe (>64 mmHg) as measured by echocardiography."
    },
    riskFactors: [
      "Congenital heart defect (most common cause of PS in children and young adults)",
      "Noonan syndrome (associated with dysplastic pulmonary valve)",
      "Carcinoid syndrome causing serotonin-mediated valve fibrosis and retraction",
      "Rheumatic heart disease (rare cause of PS, more commonly affects left-sided valves)",
      "Post-surgical or post-interventional restenosis",
      "Rubella exposure in utero during first trimester",
      "Williams syndrome and Alagille syndrome (associated with peripheral PS)"
    ],
    diagnostics: [
      "Auscultate for systolic crescendo-decrescendo murmur best heard at left upper sternal border (pulmonic area)",
      "Expect transthoracic echocardiography to measure transvalvular gradient and assess RV function",
      "Monitor ECG for right ventricular hypertrophy pattern (right axis deviation, tall R waves in V1)",
      "Assess chest X-ray for post-stenotic dilation of the main pulmonary artery and right ventricular enlargement",
      "Monitor oxygen saturation for right-to-left shunting if PFO present",
      "Expect cardiac catheterization for hemodynamic assessment when intervention is planned"
    ],
    management: [
      "Mild PS: routine monitoring with echocardiography every 3-5 years; typically no intervention needed",
      "Moderate to severe PS: balloon valvuloplasty is the first-line intervention for typical dome-shaped valves",
      "Dysplastic valve (Noonan syndrome): may require surgical valvotomy or valve replacement as balloon is less effective",
      "Manage right heart failure symptoms with diuretics and salt restriction as ordered",
      "Ensure endocarditis prophylaxis per current guidelines for prosthetic valves or recent repair",
      "Monitor for exercise intolerance and progressive symptoms indicating need for intervention"
    ],
    nursingActions: [
      "Assess for signs of right heart failure: JVD, hepatomegaly, peripheral edema, fatigue",
      "Monitor oxygen saturations especially with exertion to detect right-to-left shunting",
      "Auscultate for changes in murmur intensity (louder murmur with increasing stenosis severity)",
      "Monitor post-procedure for complications: arrhythmias, pulmonary regurgitation, vascular access site bleeding",
      "Educate patients about activity restrictions if severe: avoid isometric exercise and competitive sports",
      "Monitor fluid balance and weigh daily in patients with right heart failure symptoms"
    ],
    signs: {
      left: [
        "Systolic ejection murmur at left upper sternal border with radiation to the back",
        "Ejection click that decreases with inspiration (unique to PS vs other right-sided murmurs)",
        "Mild dyspnea on exertion and decreased exercise tolerance",
        "Prominent jugular venous A waves from forceful right atrial contraction"
      ],
      right: [
        "Right ventricular heave (sustained parasternal lift) indicating RV hypertrophy",
        "Cyanosis from right-to-left shunting through PFO (severe PS)",
        "Signs of right heart failure: JVD, hepatomegaly, ascites, peripheral edema",
        "Syncope with exertion indicating severe fixed outflow obstruction"
      ]
    },
    medications: [
      { name: "Furosemide", type: "Loop Diuretic", action: "Reduces right ventricular preload by promoting sodium and water excretion, alleviating systemic venous congestion in right heart failure from PS", sideEffects: "Hypokalemia, hypomagnesemia, dehydration, ototoxicity, metabolic alkalosis", contra: "Severe volume depletion, anuria, hepatic coma with electrolyte depletion", pearl: "Use cautiously in PS—excessive preload reduction can critically decrease right ventricular filling and cardiac output in fixed obstruction. Monitor potassium closely and supplement as needed." },
      { name: "Propranolol", type: "Non-selective Beta-Blocker", action: "Reduces heart rate allowing longer diastolic filling time for the hypertrophied right ventricle, decreases myocardial oxygen demand in RV hypertrophy", sideEffects: "Bradycardia, hypotension, bronchospasm, fatigue, masking of hypoglycemia symptoms", contra: "Severe bradycardia, decompensated heart failure, severe asthma", pearl: "May be used in infants with severe PS as bridge to intervention. Also used to prevent infundibular spasm in tetralogy of Fallot. Monitor heart rate closely in pediatric patients." }
    ],
    pearls: [
      "PS ejection click decreases with inspiration (unlike aortic ejection click)—this is because inspiration increases venous return, partially opening the stenotic valve and reducing the 'snap' of opening",
      "Balloon valvuloplasty is highly effective for typical PS with >90% success rate and low complication rate—it is the definitive treatment for moderate-severe typical dome-shaped PS",
      "Pulmonary regurgitation commonly develops after balloon valvuloplasty but is well-tolerated due to the low-pressure right heart system",
      "Mild PS in children often remains stable or improves with growth; moderate-severe PS tends to progress"
    ],
    quiz: [
      { question: "A child with Noonan syndrome has a systolic murmur at the left upper sternal border. Echocardiography shows a peak gradient of 55 mmHg across the pulmonary valve with a thick dysplastic valve. What treatment does the nurse anticipate?", options: ["No treatment; monitor annually", "Balloon valvuloplasty as first-line therapy", "Surgical valvotomy because dysplastic valves respond poorly to balloon dilation", "Immediate heart transplant evaluation"], correct: 2, rationale: "Dysplastic pulmonary valves (common in Noonan syndrome) have thickened, immobile leaflets without commissural fusion, making balloon valvuloplasty less effective. Surgical valvotomy or valve replacement is typically required." },
      { question: "A nurse auscultates an ejection click followed by a systolic crescendo-decrescendo murmur at the left upper sternal border. The click diminishes when the patient inspires deeply. Where is this murmur originating?", options: ["Aortic valve", "Pulmonary valve", "Mitral valve", "Tricuspid valve"], correct: 1, rationale: "A systolic ejection click at the left upper sternal border (pulmonic area) that diminishes with inspiration is pathognomonic for pulmonary valve stenosis. Inspiration increases venous return, partially opening the valve and reducing click intensity." },
      { question: "Following balloon pulmonary valvuloplasty, what complication should the nurse monitor for?", options: ["Mitral regurgitation", "Pulmonary regurgitation and arrhythmias", "Aortic dissection", "Left ventricular failure"], correct: 1, rationale: "After balloon valvuloplasty, the valve leaflets may become incompetent, causing pulmonary regurgitation. Arrhythmias from catheter manipulation and vascular access site complications also require monitoring." },
      { question: "A patient with severe pulmonary valve stenosis becomes cyanotic during exertion. What is the most likely mechanism?", options: ["Left-to-right shunting through an ASD", "Right-to-left shunting through a patent foramen ovale due to elevated right heart pressures", "Pulmonary embolism", "Bronchospasm"], correct: 1, rationale: "In severe PS, markedly elevated right atrial pressure can exceed left atrial pressure, especially during exertion, causing right-to-left shunting through a patent foramen ovale. This mixes deoxygenated blood into the systemic circulation, producing cyanosis." },
      { question: "What is the primary hemodynamic consequence of moderate pulmonary valve stenosis?", options: ["Left ventricular volume overload", "Right ventricular pressure overload with compensatory hypertrophy", "Pulmonary hypertension", "Aortic root dilation"], correct: 1, rationale: "Pulmonary valve stenosis creates a fixed obstruction to right ventricular outflow, requiring the RV to generate higher pressures. The RV compensates through concentric hypertrophy to maintain cardiac output against the increased afterload." }
    ]
  },

  "advanced-respiratory-nursing-rn-rn": {
    title: "Advanced Respiratory Nursing (RN)",
    cellular: {
      title: "Pulmonary Gas Exchange and Ventilation-Perfusion Matching",
      content: "Gas exchange occurs across the alveolar-capillary membrane (0.2-0.5 micrometers thick) via passive diffusion driven by partial pressure gradients. Oxygen diffuses from alveoli (PAO2 ~100 mmHg) to pulmonary capillary blood (PvO2 ~40 mmHg), while CO2 diffuses in the opposite direction (PvCO2 ~46 to PACO2 ~40 mmHg). CO2 diffuses 20 times faster than O2, so hypercapnia only develops with significant hypoventilation. Ventilation-perfusion (V/Q) matching is critical: the ideal V/Q ratio is 1.0 (ventilation matches perfusion). Dead space (high V/Q) occurs when ventilated alveoli receive no perfusion (pulmonary embolism), wasting ventilation. Shunt (low V/Q or true shunt) occurs when perfused alveoli receive no ventilation (atelectasis, pneumonia, ARDS), causing hypoxemia refractory to supplemental oxygen. Hypoxic pulmonary vasoconstriction is a protective mechanism that redirects blood away from poorly ventilated alveoli to well-ventilated areas, but chronic hypoxia leads to pulmonary hypertension and cor pulmonale through vascular remodeling."
    },
    riskFactors: [
      "Chronic obstructive pulmonary disease causing progressive airflow limitation and air trapping",
      "Acute respiratory distress syndrome (ARDS) from sepsis, aspiration, or trauma",
      "Pulmonary embolism creating dead space and acute V/Q mismatch",
      "Pneumonia causing alveolar consolidation and intrapulmonary shunting",
      "Neuromuscular diseases (myasthenia gravis, ALS, Guillain-Barré) impairing ventilatory muscle function",
      "Morbid obesity causing restrictive physiology and obstructive sleep apnea",
      "Prolonged mechanical ventilation causing ventilator-associated lung injury and deconditioning"
    ],
    diagnostics: [
      "Interpret arterial blood gas for PaO2, PaCO2, pH, base excess, and calculate P/F ratio (PaO2/FiO2)",
      "Classify ARDS severity by P/F ratio: mild (200-300), moderate (100-200), severe (<100)",
      "Assess chest X-ray and CT for consolidation, effusion, pneumothorax, or diffuse bilateral infiltrates",
      "Monitor end-tidal CO2 (EtCO2) as a trending tool for ventilation adequacy",
      "Evaluate pulmonary function tests for obstructive vs restrictive patterns",
      "Monitor D-dimer and CT pulmonary angiography for suspected pulmonary embolism"
    ],
    management: [
      "ARDS: implement lung-protective ventilation with low tidal volumes (6 mL/kg ideal body weight) and plateau pressure <30 cmH2O",
      "COPD exacerbation: administer bronchodilators, systemic corticosteroids, and antibiotics if infectious trigger",
      "Titrate oxygen to target SpO2 88-92% in COPD with chronic CO2 retention to avoid suppressing hypoxic drive",
      "Position prone for 16+ hours in moderate-severe ARDS to improve V/Q matching and oxygenation",
      "Implement high-flow nasal cannula (HFNC) for hypoxemic respiratory failure before intubation when appropriate",
      "Manage ventilator weaning using spontaneous breathing trials (SBT) with readiness criteria"
    ],
    nursingActions: [
      "Assess respiratory rate, depth, pattern, and work of breathing including accessory muscle use every 1-2 hours",
      "Position patient to optimize ventilation: high Fowler's for dyspnea, affected side down for unilateral lung disease (good lung up for shunt)",
      "Suction airways using closed inline system to maintain PEEP in mechanically ventilated patients",
      "Implement ventilator-associated pneumonia (VAP) bundle: HOB 30-45°, daily sedation vacation, oral care with chlorhexidine, DVT/PUD prophylaxis",
      "Monitor for auto-PEEP (breath stacking) in obstructive disease by assessing expiratory flow waveform",
      "Assess readiness for extubation: adequate cough, minimal secretions, passing SBT, protective airway reflexes"
    ],
    signs: {
      left: [
        "Tachypnea and use of accessory muscles (SCM, intercostals, abdominal) indicating increased work of breathing",
        "Pursed-lip breathing in COPD (creates auto-PEEP to prevent airway collapse)",
        "Barrel chest in emphysema (increased AP diameter from chronic air trapping)",
        "Diminished breath sounds in affected areas with adventitious sounds"
      ],
      right: [
        "Acute respiratory failure: SpO2 <88%, PaO2 <60, PaCO2 >50 with pH <7.35",
        "ARDS: bilateral white-out on CXR, refractory hypoxemia, low P/F ratio",
        "Tension pneumothorax: tracheal deviation, absent breath sounds, hypotension, JVD",
        "Respiratory arrest: apnea, cyanosis, loss of consciousness"
      ]
    },
    medications: [
      { name: "Albuterol", type: "Short-Acting Beta-2 Agonist (SABA)", action: "Selectively stimulates beta-2 receptors on bronchial smooth muscle causing bronchodilation via cyclic AMP-mediated relaxation, onset 5-15 minutes, duration 4-6 hours", sideEffects: "Tachycardia, tremor, hypokalemia, nervousness, paradoxical bronchospasm", contra: "Hypersensitivity to albuterol; use with caution in severe cardiovascular disease", pearl: "Rescue inhaler for acute bronchospasm. Using SABA >2 days/week indicates poor asthma control requiring step-up therapy. In acute exacerbation, nebulized continuously. Always shake MDI and use spacer for optimal delivery." },
      { name: "Methylprednisolone", type: "Systemic Corticosteroid", action: "Suppresses inflammatory cascade by inhibiting phospholipase A2, reducing airway edema, mucus production, and inflammatory cell infiltration in acute asthma and COPD exacerbations", sideEffects: "Hyperglycemia, immunosuppression, gastric irritation, insomnia, adrenal suppression with prolonged use", contra: "Active untreated infections, live vaccines during treatment", pearl: "Give early in acute exacerbations for maximum benefit. ARDS: dexamethasone per DEXA-ARDS protocol. COPD exacerbation: 40mg daily x 5 days is as effective as 14 days with fewer side effects. Monitor blood glucose every 6 hours." }
    ],
    pearls: [
      "The P/F ratio (PaO2 divided by FiO2) is the quickest way to assess oxygenation severity: normal >400, ALI <300, ARDS <200, severe ARDS <100",
      "In ARDS, prone positioning improves oxygenation by redistributing perfusion to ventral (now dependent) lung regions and promoting uniform ventilation through gravitational changes",
      "Never give high-flow oxygen to a chronic CO2 retainer (COPD) without monitoring—it can suppress the hypoxic ventilatory drive and worsen CO2 narcosis",
      "Absent breath sounds on one side with increasing ventilator pressures = tension pneumothorax until proven otherwise—decompress with needle then chest tube"
    ],
    quiz: [
      { question: "A patient with ARDS has a PaO2 of 65 mmHg on 80% FiO2. What is the P/F ratio and ARDS severity?", options: ["P/F 81, severe ARDS", "P/F 325, mild ARDS", "P/F 162, moderate ARDS", "P/F 65, unable to classify"], correct: 0, rationale: "P/F ratio = PaO2/FiO2 = 65/0.80 = 81.25. A P/F ratio <100 classifies as severe ARDS per the Berlin definition. This patient requires lung-protective ventilation and consideration for prone positioning." },
      { question: "A COPD patient on 2L nasal cannula has ABG: pH 7.32, PaCO2 62, HCO3 34, PaO2 58. The respiratory therapist increases O2 to 6L. What concern should the nurse have?", options: ["Risk of oxygen toxicity to the lungs", "Suppression of hypoxic ventilatory drive causing CO2 narcosis and respiratory failure", "Development of pulmonary embolism", "Worsening bronchospasm from cold dry oxygen"], correct: 1, rationale: "This COPD patient has chronic compensated respiratory acidosis (elevated HCO3 = renal compensation). In chronic CO2 retainers, the primary respiratory drive shifts to hypoxemia. High-flow O2 can eliminate this drive, causing hypoventilation, worsening CO2 retention, and narcosis. Target SpO2 88-92%." },
      { question: "Which ventilator setting is most important for preventing ventilator-associated lung injury in ARDS?", options: ["High tidal volumes (10-12 mL/kg) to maximize recruitment", "Low tidal volumes (6 mL/kg ideal body weight) with plateau pressure <30 cmH2O", "Minimal PEEP to prevent barotrauma", "100% FiO2 to maximize oxygenation"], correct: 1, rationale: "The ARDSnet protocol demonstrated that low tidal volume ventilation (6 mL/kg IBW) with plateau pressures <30 cmH2O reduces mortality by preventing volutrauma and barotrauma. High PEEP is often needed to maintain recruitment." },
      { question: "A nurse is caring for a patient in prone position for ARDS. Which intervention is essential?", options: ["Keep the patient supine for all assessments", "Ensure endotracheal tube security, protect pressure points, and monitor facial edema", "Discontinue enteral feeding completely", "Reduce PEEP to zero during proning"], correct: 1, rationale: "During prone positioning, the ET tube and lines must be secured to prevent dislodgment. Pressure points (face, chest, pelvis, knees) need padding to prevent injury. Facial edema develops and requires monitoring. Enteral feeding can continue with close monitoring." },
      { question: "A mechanically ventilated patient suddenly develops high peak inspiratory pressures, absent breath sounds on the right, tracheal deviation to the left, and hypotension. What does the nurse anticipate?", options: ["Mucus plugging requiring suctioning", "Right tension pneumothorax requiring needle decompression", "Ventilator malfunction", "ARDS worsening"], correct: 1, rationale: "Absent breath sounds on one side, contralateral tracheal deviation, and hemodynamic instability are the classic triad of tension pneumothorax. Immediate needle decompression at the second intercostal space, midclavicular line is lifesaving, followed by chest tube insertion." }
    ]
  },

  "comprehensive-airway-assessment-rn-rn": {
    title: "Comprehensive Airway Assessment (RN)",
    cellular: {
      title: "Upper and Lower Airway Anatomy and Protective Mechanisms",
      content: "The airway is divided into upper (nose, pharynx, larynx) and lower (trachea, bronchi, bronchioles, alveoli) segments with distinct protective mechanisms at each level. The upper airway warms, humidifies, and filters inspired air. The epiglottis protects against aspiration during swallowing by directing the food bolus posteriorly toward the esophagus while the true vocal cords adduct. The cough reflex involves three phases: inspiratory (deep breath to TLC), compressive (glottic closure with thoracic and abdominal muscle contraction generating pressures up to 300 mmHg), and expulsive (sudden glottic opening producing airflow velocities near 500 mph). The mucociliary escalator—ciliated pseudostratified columnar epithelium covered by a mucus blanket—continuously transports trapped particles toward the pharynx at approximately 1 cm/minute. Goblet cells and submucosal glands produce 100 mL of mucus daily. In pathologic states, airway smooth muscle bronchoconstriction, mucosal edema, and excessive mucus production narrow the airway lumen, increasing resistance exponentially (Poiseuille's law: resistance is inversely proportional to the fourth power of the radius—halving the radius increases resistance 16-fold)."
    },
    riskFactors: [
      "Post-operative sedation and anesthesia reducing airway reflexes and muscle tone",
      "Altered level of consciousness from stroke, TBI, or medication effects",
      "Obesity and short thick neck anatomy complicating airway visualization",
      "Cervical spine injury requiring inline stabilization during airway management",
      "Angioedema from ACE inhibitors, allergic reactions, or hereditary causes",
      "Burns or inhalation injury causing progressive airway edema",
      "Neuromuscular weakness (myasthenia gravis, Guillain-Barré) impairing cough and swallowing"
    ],
    diagnostics: [
      "Assess Mallampati score (I-IV) to predict difficult intubation based on oropharyngeal visualization",
      "Evaluate thyromental distance (>6 cm favorable) and neck mobility for airway management planning",
      "Assess cough strength, gag reflex, and swallowing ability for aspiration risk",
      "Monitor peak expiratory flow rate for objective measurement of airflow obstruction",
      "Assess for stridor (high-pitched inspiratory sound indicating upper airway obstruction >50% narrowed)",
      "Monitor capnography waveform and EtCO2 values for ventilation adequacy and airway patency"
    ],
    management: [
      "Partial upper airway obstruction: position patient upright, apply jaw thrust or chin lift maneuver",
      "Complete airway obstruction: perform abdominal thrusts (Heimlich) for conscious patient, CPR for unconscious",
      "Maintain artificial airway patency: suction as needed, secure ET tube, verify position with capnography",
      "Prepare difficult airway cart with video laryngoscope, bougie, LMA, and cricothyrotomy kit",
      "Administer nebulized racemic epinephrine for post-extubation stridor and laryngeal edema",
      "Implement aspiration precautions: elevate HOB 30-45°, swallowing evaluation, diet modifications"
    ],
    nursingActions: [
      "Perform systematic airway assessment using look-listen-feel approach before proceeding to interventions",
      "Assess respiratory rate, symmetry of chest expansion, use of accessory muscles, and nasal flaring",
      "Auscultate bilateral lung fields comparing side-to-side from apices to bases in a systematic pattern",
      "Identify adventitious breath sounds: crackles (fluid/infection), wheezes (bronchoconstriction), stridor (upper airway obstruction), rhonchi (secretions)",
      "Assess cuff pressure of endotracheal or tracheostomy tube every 8 hours (maintain 20-30 cmH2O)",
      "Perform oral care every 2-4 hours in intubated patients using chlorhexidine to reduce VAP risk",
      "Verify ET tube placement with continuous capnography—gold standard for tube position confirmation"
    ],
    signs: {
      left: [
        "Clear bilateral breath sounds with symmetric chest expansion",
        "Effective cough with ability to clear secretions",
        "Speaks in full sentences without respiratory distress",
        "Normal capnography waveform with EtCO2 35-45 mmHg"
      ],
      right: [
        "Stridor indicating critical upper airway narrowing (>50% obstruction)",
        "Silent chest in severe asthma or complete obstruction (no air movement)",
        "Gurgling indicating fluid or secretions in the upper airway",
        "Absence of capnography waveform indicating esophageal intubation or complete obstruction"
      ]
    },
    medications: [
      { name: "Racemic Epinephrine (2.25%)", type: "Alpha and Beta Agonist (Nebulized)", action: "Alpha-adrenergic stimulation causes mucosal vasoconstriction reducing laryngeal edema, beta-2 stimulation causes bronchial smooth muscle relaxation, used for post-extubation stridor and croup", sideEffects: "Tachycardia, rebound edema after wearing off (2-3 hours), tremor, hypertension", contra: "Use with extreme caution in patients with coronary artery disease or tachyarrhythmias", pearl: "Onset is within 1-5 minutes. Must observe for rebound edema for at least 3-4 hours after administration—symptoms may return or worsen as drug effect diminishes. Keep re-intubation equipment at bedside." },
      { name: "Succinylcholine", type: "Depolarizing Neuromuscular Blocker", action: "Mimics acetylcholine at the neuromuscular junction causing initial depolarization (fasciculations) followed by sustained block, providing rapid paralysis for emergency intubation (onset 30-60 seconds, duration 5-10 minutes)", sideEffects: "Hyperkalemia (especially in burns, crush injuries, denervation >72 hours), malignant hyperthermia in susceptible individuals, masseter spasm, bradycardia", contra: "Hyperkalemia, burns or crush injuries >24 hours old, upper motor neuron lesions, family history of malignant hyperthermia, prolonged immobility", pearl: "Only paralytic with ultra-short duration allowing return of spontaneous ventilation if intubation fails. Contraindicated in conditions with upregulated acetylcholine receptors (burns, spinal cord injury, prolonged immobility) due to massive potassium release." }
    ],
    pearls: [
      "Stridor is an ominous sign: it means the airway is already >50% narrowed. By the time stridor disappears, the airway may be near-complete obstruction—monitor closely",
      "Capnography is the gold standard for confirming ET tube placement, NOT auscultation alone—esophageal intubation kills; always verify with continuous ETCO2",
      "Head-tilt chin-lift opens the airway in most patients, but use jaw thrust only for suspected cervical spine injury to maintain neutral alignment",
      "The 3-3-2 rule predicts difficult intubation: 3 finger-breadths mouth opening, 3 fingers hyoid to mentum, 2 fingers thyroid notch to floor of mouth"
    ],
    quiz: [
      { question: "A patient develops inspiratory stridor 2 hours after extubation. Racemic epinephrine is administered with improvement. How long should the nurse continue monitoring?", options: ["The patient can be discharged immediately after symptom resolution", "Monitor for at least 3-4 hours for rebound edema", "Only 30 minutes if symptoms resolve", "24 hours of ICU observation is always required"], correct: 1, rationale: "Racemic epinephrine provides temporary relief through mucosal vasoconstriction, but rebound edema can occur 2-3 hours after the drug wears off. Continuous monitoring for at least 3-4 hours is essential, with re-intubation equipment at bedside." },
      { question: "What is the gold standard for confirming endotracheal tube placement?", options: ["Bilateral chest auscultation", "Continuous waveform capnography showing ETCO2", "Chest X-ray", "Pulse oximetry"], correct: 1, rationale: "Continuous waveform capnography is the gold standard for confirming and continuously monitoring ET tube placement. Presence of a consistent CO2 waveform confirms tracheal placement. Chest X-ray confirms depth but is not immediate. Auscultation alone is unreliable." },
      { question: "A nurse assesses a patient who can only speak one word at a time between breaths, is using accessory muscles, and has intercostal retractions. What does this indicate?", options: ["Normal respiratory effort", "Mild respiratory distress", "Severe respiratory distress with possible impending failure", "Anxiety-related hyperventilation"], correct: 2, rationale: "One-word dyspnea (inability to speak in sentences), accessory muscle use, and intercostal retractions indicate severe respiratory distress with significantly increased work of breathing. This patient is at risk for respiratory failure and may need emergency airway intervention." },
      { question: "During airway assessment, a nurse notes that only the soft palate and uvula are visible when the patient opens their mouth. What is this Mallampati class?", options: ["Class I", "Class II", "Class III", "Class IV"], correct: 1, rationale: "Mallampati Class II shows the soft palate, uvula, and fauces visible. Class I shows the entire uvula and tonsillar pillars. Class III shows only the soft palate and base of uvula. Class IV shows only the hard palate. Higher classes predict more difficult intubation." },
      { question: "A nurse finds an unconscious patient with suspected cervical spine injury who is not breathing. What airway maneuver should be performed?", options: ["Head-tilt chin-lift", "Jaw thrust without head extension", "Neck hyperextension with chin lift", "Blind nasopharyngeal airway insertion"], correct: 1, rationale: "Jaw thrust without head extension is the recommended airway maneuver for suspected cervical spine injury. It opens the airway by displacing the mandible forward without moving the cervical spine. Head-tilt chin-lift is contraindicated with potential c-spine injury." }
    ]
  },

  "respiratory-assessment-protocol-rn-rn": {
    title: "Respiratory Assessment Protocol (RN)",
    cellular: {
      title: "Mechanics of Ventilation and Assessment Physiology",
      content: "Breathing is a negative pressure process: the diaphragm contracts and descends while external intercostals elevate the ribs, expanding the thoracic cavity. This creates subatmospheric intrapleural pressure (normally -5 cmH2O, dropping to -8 during inspiration), drawing air into the lungs via Boyle's law (volume increases, pressure decreases). Expiration is normally passive, driven by elastic recoil of lung parenchyma and chest wall. Forced expiration recruits internal intercostals and abdominal muscles. Lung compliance (change in volume per change in pressure) reflects the distensibility of lung tissue—decreased in fibrosis, ARDS, and pulmonary edema; increased in emphysema (loss of elastic recoil). Airway resistance is determined by airway caliber and is increased by bronchospasm, mucus plugging, and airway edema. Respiratory assessment integrates inspection (rate, pattern, symmetry, accessory muscle use), palpation (tactile fremitus, chest expansion), percussion (resonance vs dullness vs hyperresonance), and auscultation (breath sounds, adventitious sounds) to generate a clinical picture that guides intervention."
    },
    riskFactors: [
      "Smoking history causing chronic airway inflammation and progressive parenchymal destruction",
      "Occupational exposure to asbestos, silica, coal dust, or chemical irritants",
      "Immobility and prolonged bed rest predisposing to atelectasis and pneumonia",
      "Post-surgical patients especially after thoracic and upper abdominal procedures",
      "Immunosuppression from chemotherapy, HIV, or transplant medications",
      "Aspiration risk from dysphagia, decreased consciousness, or enteral feeding",
      "Chest wall deformities (scoliosis, pectus excavatum) restricting lung expansion"
    ],
    diagnostics: [
      "Systematic respiratory inspection: rate, rhythm, depth, symmetry, accessory muscle use, chest shape",
      "Palpate for tactile fremitus: increased over consolidation (pneumonia), decreased/absent over effusion or pneumothorax",
      "Percuss chest: resonant (normal), hyperresonant (pneumothorax, emphysema), dull (effusion, consolidation)",
      "Auscultate breath sounds systematically comparing bilateral fields from apex to base",
      "Monitor pulse oximetry continuously for trending and set appropriate alarm limits",
      "Obtain and interpret sputum specimens: color, consistency, volume, and culture results"
    ],
    management: [
      "Implement incentive spirometry (10 breaths every 1-2 hours while awake) for atelectasis prevention in surgical patients",
      "Administer bronchodilators via nebulizer or MDI with spacer for bronchospasm",
      "Position patient in semi-Fowler's or high Fowler's to maximize diaphragmatic excursion",
      "Implement chest physiotherapy and postural drainage for secretion mobilization",
      "Coordinate respiratory therapy assessments and treatments per protocol",
      "Escalate oxygen delivery: nasal cannula → simple mask → non-rebreather → HFNC → BiPAP → intubation"
    ],
    nursingActions: [
      "Count respiratory rate for a full 60 seconds including depth and pattern assessment without alerting patient",
      "Document breath sounds using standardized terminology: vesicular, bronchovesicular, bronchial, crackles, wheezes, rhonchi, stridor, pleural friction rub",
      "Assess sputum characteristics and report changes: rusty (pneumococcal pneumonia), green-yellow (infection), pink frothy (pulmonary edema), blood-tinged (TB, PE, cancer)",
      "Monitor oxygen delivery device fit and flow rate; assess for skin breakdown under nasal cannula or mask straps",
      "Assess cough effectiveness and ability to clear secretions; suction as needed using appropriate technique",
      "Implement fall precautions for patients with hypoxemia or respiratory distress who may experience orthostatic symptoms"
    ],
    signs: {
      left: [
        "Normal findings: respiratory rate 12-20, regular rhythm, symmetric expansion, clear breath sounds bilaterally",
        "Vesicular sounds: soft, low-pitched heard over most lung fields (normal peripheral breath sounds)",
        "Bronchovesicular sounds: equal inspiratory and expiratory phases heard over main bronchi",
        "Resonant percussion note over normal lung tissue"
      ],
      right: [
        "Crackles (rales): fine discontinuous sounds indicating fluid in alveoli (HF, pneumonia) or opening of collapsed alveoli",
        "Wheezes: continuous musical sounds indicating airway narrowing (asthma, COPD, foreign body)",
        "Absent or diminished breath sounds: pneumothorax, large pleural effusion, severe bronchospasm",
        "Dullness to percussion: pleural effusion, consolidation, tumor, or hemothorax"
      ]
    },
    medications: [
      { name: "Ipratropium Bromide", type: "Short-Acting Muscarinic Antagonist (SAMA)", action: "Blocks muscarinic (M3) receptors on bronchial smooth muscle, preventing acetylcholine-mediated bronchoconstriction. Produces bronchodilation by reducing vagal tone. Often combined with albuterol (DuoNeb) for synergistic effect in acute exacerbations", sideEffects: "Dry mouth, urinary retention in elderly males, blurred vision if sprayed in eyes, mild tachycardia", contra: "Hypersensitivity to atropine or its derivatives, soy or peanut allergy (MDI formulation contains soy lecithin)", pearl: "Slower onset than albuterol (15-30 minutes vs 5 minutes) but longer duration (4-8 hours). More effective in COPD than asthma. Combination with albuterol (DuoNeb) is standard for acute COPD exacerbation." },
      { name: "Guaifenesin", type: "Expectorant", action: "Increases respiratory tract fluid secretions by reducing mucus viscosity and increasing mucociliary clearance, making cough more productive", sideEffects: "Nausea, vomiting, dizziness, headache, kidney stones with excessive doses", contra: "Chronic cough from smoking, asthma, or emphysema (address underlying cause instead)", pearl: "Must be taken with adequate fluid intake (at least 8 glasses daily) to be effective. Does NOT suppress cough—it makes the cough more productive. Educate patients to maintain hydration." }
    ],
    pearls: [
      "Always count respiratory rate for a full minute—patients alter their breathing pattern when they know they are being observed (do it covertly while pretending to count pulse)",
      "Breath sounds heard over areas where they do not belong are pathologic: bronchial sounds heard peripherally indicate consolidation (pneumonia) transmitting sound more efficiently",
      "Increased tactile fremitus + dullness to percussion + bronchial breath sounds = consolidation (pneumonia); decreased fremitus + dullness + absent sounds = pleural effusion",
      "Wheezes that clear with coughing are from secretions (rhonchi); wheezes that persist indicate bronchospasm requiring bronchodilator therapy"
    ],
    quiz: [
      { question: "A nurse percusses a patient's right lower lung field and hears dullness. Tactile fremitus is decreased and breath sounds are diminished in the same area. What condition is most likely?", options: ["Right lower lobe pneumonia", "Right-sided pleural effusion", "Right-sided pneumothorax", "Normal finding"], correct: 1, rationale: "Dullness to percussion, decreased tactile fremitus, and diminished breath sounds together indicate pleural effusion. Fluid between the lung and chest wall dampens sound transmission. Pneumonia would show dullness with INCREASED fremitus." },
      { question: "A post-operative patient is reluctant to use the incentive spirometer due to incisional pain. What is the nurse's best action?", options: ["Document the refusal and skip the treatment", "Administer prescribed pain medication 30 minutes before incentive spirometry", "Report to the surgeon for a different treatment plan", "Explain that pain medication is not appropriate before respiratory treatments"], correct: 1, rationale: "Pre-medicating with analgesics allows the patient to take deeper breaths during incentive spirometry. Adequate pain control improves participation in respiratory exercises and prevents atelectasis, which is a significant post-surgical complication." },
      { question: "A nurse auscultates bronchial breath sounds over the right lower lobe peripherally. What does this finding suggest?", options: ["Normal finding for that location", "Consolidation in the right lower lobe", "Right-sided pneumothorax", "Pleural effusion"], correct: 1, rationale: "Bronchial breath sounds (loud, high-pitched, with a gap between inspiration and expiration) are normally heard only over the trachea and mainstem bronchi. Hearing them over peripheral lung fields indicates consolidation, where solid tissue transmits sound more efficiently than air-filled alveoli." },
      { question: "During assessment, a patient's respiratory rate changes from 16 to 36 breaths per minute, oxygen saturation drops to 88%, and the nurse observes nasal flaring and intercostal retractions. What action takes priority?", options: ["Document findings and reassess in 30 minutes", "Apply supplemental oxygen and notify the provider immediately", "Encourage coughing and deep breathing", "Administer a scheduled bronchodilator treatment"], correct: 1, rationale: "Acute tachypnea, hypoxemia, nasal flaring, and retractions indicate acute respiratory distress requiring immediate intervention. Apply oxygen to correct hypoxemia and notify the provider for further orders. This patient may be deteriorating toward respiratory failure." },
      { question: "Which sputum characteristic is most concerning and should be reported immediately?", options: ["Clear thin secretions", "White mucoid sputum in a COPD patient", "Pink frothy sputum", "Yellow sputum in a patient completing antibiotics"], correct: 2, rationale: "Pink frothy sputum is a hallmark of acute pulmonary edema indicating fluid in the alveoli mixing with air. This requires emergent treatment with positioning (high Fowler's), oxygen, IV diuretics, and possibly BiPAP or intubation." }
    ]
  }
};
