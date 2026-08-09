const BOTH=["Canada","United States"];

const meta=(tier:string,exam:string)=>({tier,exam,regionScope:"BOTH",countryLabels:BOTH,languageCode:"en",bodySystem:"Cardiovascular",difficulty:4});

export const rpnAdvancedOrderCaseReplacements:any[]=[
  {
    id:"rpn-order-digoxin-001",...meta("rpn","REx-PN/NCLEX-PN"),questionType:"ORDERED_RESPONSE",topic:"Digoxin Toxicity Response",
    stem:"Place the nursing actions in the safest sequence after a client taking digoxin reports nausea and yellow-green vision and has an apical pulse of 46/min.",
    options:[
      {id:"rpn-dig-1",text:"Stop and assess the client, including apical pulse, blood pressure, symptoms, and level of consciousness"},
      {id:"rpn-dig-2",text:"Withhold the scheduled digoxin dose"},
      {id:"rpn-dig-3",text:"Notify the prescriber/appropriate clinician promptly and report the toxicity findings"},
      {id:"rpn-dig-4",text:"Obtain/prepare for ordered ECG and laboratory evaluation such as potassium, renal function, and digoxin level when indicated"},
      {id:"rpn-dig-5",text:"Continue cardiac/symptom monitoring and document the response and new orders"},
    ],
    correctAnswerIds:["rpn-dig-1","rpn-dig-2","rpn-dig-3","rpn-dig-4","rpn-dig-5"],
    correctAnswer:["rpn-dig-1","rpn-dig-2","rpn-dig-3","rpn-dig-4","rpn-dig-5"],
    rationale:"The nurse first assesses for immediate instability, prevents further exposure by withholding the scheduled dose, escalates the suspected toxicity, facilitates ordered rhythm/laboratory evaluation, and then continues monitoring and documentation.",
    correctAnswerExplanation:"The sequence prioritizes patient assessment and prevention of another dose before diagnostic follow-up and ongoing monitoring.",
    hint:"Assessment and stopping further exposure come before diagnostic workup and documentation.",
    whyThisMatters:"Digoxin toxicity can progress to dangerous bradyarrhythmias and other dysrhythmias, especially when renal impairment or potassium abnormalities are present.",
    clinicalPearl:"GI symptoms plus visual changes plus bradycardia in a client taking digoxin should trigger a toxicity pathway.",
    tags:["digoxin","ordered-response","rpn","medication-safety"],
  },
  {
    id:"rpn-case-hf-001",...meta("rpn","REx-PN/NCLEX-PN"),questionType:"NGN_CASE",topic:"Acute Heart Failure Deterioration",
    stem:"Work through this seven-decision case involving a client with worsening heart failure.",
    interactionPayload:{
      tabs:[
        {id:"rpn-hf-case-history",title:"History",content:"72-year-old with HFrEF, hypertension, and CKD presents with increasing dyspnea, orthopnea, and 3-kg weight gain in 5 days."},
        {id:"rpn-hf-case-vitals",title:"Assessment",content:"HR 108/min, BP 104/66 mmHg, RR 28/min, SpO2 89% room air; bibasilar crackles, 2+ leg edema, cool feet."},
        {id:"rpn-hf-case-meds",title:"Medication Record",content:"Furosemide, ramipril, metoprolol; client reports missing several diuretic doses."},
      ],
      subQuestions:[
        {id:"rpn-hf-q1",questionType:"MCQ",stem:"Which finding requires the most immediate action?",options:[{id:"q1-a",text:"SpO2 89% with RR 28/min"},{id:"q1-b",text:"3-kg weight gain"},{id:"q1-c",text:"2+ leg edema"},{id:"q1-d",text:"Missed doses this week"}],correctAnswerIds:["q1-a"],rationale:"Current hypoxemia and respiratory distress are the immediate ABC priority."},
        {id:"rpn-hf-q2",questionType:"SATA",stem:"Which actions should the nurse take now?",options:[{id:"q2-a",text:"Position upright"},{id:"q2-b",text:"Apply oxygen per protocol/order for hypoxemia"},{id:"q2-c",text:"Measure intake/output"},{id:"q2-d",text:"Give a routine large fluid bolus"}],correctAnswerIds:["q2-a","q2-b","q2-c"],rationale:"Support breathing and monitor fluid status; routine volume loading can worsen congestion."},
        {id:"rpn-hf-q3",questionType:"MCQ",stem:"Which medication history most likely contributed to this exacerbation?",options:[{id:"q3-a",text:"Missed loop-diuretic doses"},{id:"q3-b",text:"Long-term beta blocker use"},{id:"q3-c",text:"Remote acetaminophen use"},{id:"q3-d",text:"Daily multivitamin"}],correctAnswerIds:["q3-a"],rationale:"Missed diuretic therapy can promote sodium/water retention and worsening congestion."},
        {id:"rpn-hf-q4",questionType:"MCQ",stem:"After prescribed IV diuresis, which finding best suggests a beneficial early response?",options:[{id:"q4-a",text:"Improved dyspnea and increasing urine output"},{id:"q4-b",text:"New confusion"},{id:"q4-c",text:"Worsening hypotension"},{id:"q4-d",text:"Increasing oxygen requirement"}],correctAnswerIds:["q4-a"],rationale:"Improved breathing and diuretic response support effective decongestion."},
        {id:"rpn-hf-q5",questionType:"SATA",stem:"Which findings after diuresis require prompt reporting?",options:[{id:"q5-a",text:"BP falls to 82/48 mmHg"},{id:"q5-b",text:"New muscle weakness with potassium 2.9 mmol/L"},{id:"q5-c",text:"Creatinine rises substantially with oliguria"},{id:"q5-d",text:"Edema decreases from 2+ to 1+"}],correctAnswerIds:["q5-a","q5-b","q5-c"],rationale:"Hypotension, significant hypokalemia, and worsening renal perfusion can make ongoing therapy unsafe."},
        {id:"rpn-hf-q6",questionType:"MCQ",stem:"Which discharge teaching is most important for detecting recurrent fluid retention early?",options:[{id:"q6-a",text:"Track daily weight using the same scale and report rapid gain according to the care plan"},{id:"q6-b",text:"Check temperature once monthly"},{id:"q6-c",text:"Avoid all physical activity"},{id:"q6-d",text:"Stop medications when swelling improves"}],correctAnswerIds:["q6-a"],rationale:"Daily weight is a sensitive home marker of recurrent fluid retention."},
        {id:"rpn-hf-q7",questionType:"MCQ",stem:"Which statement shows correct medication understanding?",options:[{id:"q7-a",text:"I will contact my care team if I cannot take my diuretic as prescribed rather than stopping it on my own"},{id:"q7-b",text:"I can double every missed dose"},{id:"q7-c",text:"I should stop the diuretic when my breathing improves"},{id:"q7-d",text:"Monitoring is unnecessary if I feel well"}],correctAnswerIds:["q7-a"],rationale:"Medication adherence and early communication reduce preventable decompensation."},
      ],
    },
    rationale:"This case integrates recognition of congestion, ABC prioritization, safe diuresis monitoring, electrolyte/renal complications, adherence, and early home detection of recurrent fluid retention.",
    correctAnswerExplanation:"The seven decisions follow the practical-nursing role from immediate respiratory support through monitoring, escalation, evaluation, and discharge reinforcement.",
    hint:"Follow the case chronologically: stabilize breathing, manage congestion safely, then prevent recurrence.",
    whyThisMatters:"Heart-failure readmissions are often preceded by worsening congestion and medication/adherence problems that nurses can identify early.",
    clinicalPearl:"For worsening HF, pair symptoms with objective trends: oxygenation, weight, urine output, blood pressure, electrolytes, and renal function.",
    tags:["heart-failure","case-study","rpn","seven-decision"],
  },
];

export const rnAdvancedOrderCaseReplacements:any[]=[
  {
    id:"rn-order-transfusion-001",...meta("rn","NCLEX-RN"),questionType:"ORDERED_RESPONSE",topic:"Acute Transfusion Reaction",
    stem:"A client receiving packed red blood cells develops fever, chills, dyspnea, and flank discomfort. Place the RN actions in the safest sequence.",
    options:[
      {id:"rn-tx-1",text:"Stop the transfusion immediately"},
      {id:"rn-tx-2",text:"Maintain IV access with new tubing and compatible normal saline according to policy"},
      {id:"rn-tx-3",text:"Assess airway, breathing, circulation, vital signs, and symptom severity"},
      {id:"rn-tx-4",text:"Notify the provider and blood bank/transfusion service and initiate the reaction protocol"},
      {id:"rn-tx-5",text:"Obtain/send required blood and urine specimens and the blood product/tubing as directed by policy"},
      {id:"rn-tx-6",text:"Continue monitoring, treatment, and documentation of the client's response"},
    ],
    correctAnswerIds:["rn-tx-1","rn-tx-2","rn-tx-3","rn-tx-4","rn-tx-5","rn-tx-6"],correctAnswer:["rn-tx-1","rn-tx-2","rn-tx-3","rn-tx-4","rn-tx-5","rn-tx-6"],
    rationale:"Suspected transfusion reaction requires immediate cessation of the blood product, preservation of IV access with compatible fluid/new tubing per policy, rapid assessment, notification/protocol activation, required specimens/product investigation, and ongoing treatment/documentation.",
    correctAnswerExplanation:"The sequence first stops exposure, protects access and the patient, then activates investigation and treatment without restarting the implicated product.",
    hint:"First stop the suspected cause; then preserve access and assess before completing the investigation workflow.",
    whyThisMatters:"Hemolytic, septic, allergic, and pulmonary transfusion reactions can deteriorate quickly; correct sequencing limits further exposure and accelerates treatment.",
    clinicalPearl:"Never simply slow a transfusion when a serious reaction is suspected—stop it and follow the reaction protocol.",
    tags:["transfusion","ordered-response","rn","emergency"],
  },
  {
    id:"rn-case-acs-001",...meta("rn","NCLEX-RN"),questionType:"NGN_CASE",topic:"Acute Coronary Syndrome",stem:"Work through this seven-decision case involving evolving acute coronary syndrome.",
    interactionPayload:{tabs:[{id:"rn-acs-history",title:"History",content:"61-year-old with diabetes and hypertension has crushing substernal pain radiating to the left arm with diaphoresis and nausea."},{id:"rn-acs-ecg",title:"ECG",content:"ST elevation V2-V5."},{id:"rn-acs-vitals",title:"Vitals",content:"HR 104/min, BP 148/88 mmHg, RR 22/min, SpO2 95% room air."}],subQuestions:[
      {id:"rn-acs-q1",questionType:"MCQ",stem:"Which interpretation is the priority?",options:[{id:"a",text:"Anterior STEMI requiring immediate reperfusion activation"},{id:"b",text:"Stable angina"},{id:"c",text:"Musculoskeletal pain"},{id:"d",text:"Uncomplicated reflux"}],correctAnswerIds:["a"],rationale:"Symptoms plus anterior ST elevation indicate STEMI."},
      {id:"rn-acs-q2",questionType:"SATA",stem:"Which actions should occur promptly?",options:[{id:"a",text:"Activate the STEMI/reperfusion pathway"},{id:"b",text:"Administer chewable aspirin if not contraindicated"},{id:"c",text:"Establish monitoring and IV access"},{id:"d",text:"Delay care for routine fasting labs"}],correctAnswerIds:["a","b","c"],rationale:"Reperfusion activation and evidence-based immediate ACS care should not be delayed for routine tests."},
      {id:"rn-acs-q3",questionType:"MCQ",stem:"The client asks why oxygen has not been started. Which response is best?",options:[{id:"a",text:"Oxygen is routinely required for every MI"},{id:"b",text:"With SpO2 95% and no respiratory distress, routine oxygen is not necessarily indicated"},{id:"c",text:"Oxygen is contraindicated in STEMI"},{id:"d",text:"Oxygen is only used after PCI"}],correctAnswerIds:["b"],rationale:"Supplemental oxygen is targeted to hypoxemia/respiratory compromise rather than automatically used in normoxic ACS."},
      {id:"rn-acs-q4",questionType:"MCQ",stem:"Before nitroglycerin is administered, which history requires immediate clarification?",options:[{id:"a",text:"Recent PDE-5 inhibitor use"},{id:"b",text:"Remote appendectomy"},{id:"c",text:"Seasonal allergies"},{id:"d",text:"Daily multivitamin"}],correctAnswerIds:["a"],rationale:"PDE-5 inhibitors can create dangerous hypotension with nitrates."},
      {id:"rn-acs-q5",questionType:"MCQ",stem:"Thirty minutes later BP is 82/54 mmHg with cool skin and confusion. What is the priority?",options:[{id:"a",text:"Immediate hemodynamic/shock escalation"},{id:"b",text:"Routine discharge education"},{id:"c",text:"Ambulation"},{id:"d",text:"Reassess tomorrow"}],correctAnswerIds:["a"],rationale:"Hypotension with end-organ hypoperfusion after MI suggests shock and requires immediate escalation."},
      {id:"rn-acs-q6",questionType:"SATA",stem:"Which complications should the RN actively monitor for after a large anterior MI?",options:[{id:"a",text:"Ventricular dysrhythmias"},{id:"b",text:"Acute heart failure/cardiogenic shock"},{id:"c",text:"Mechanical complications such as acute MR or VSD"},{id:"d",text:"Improved appetite only"}],correctAnswerIds:["a","b","c"],rationale:"Large infarctions can cause electrical, pump, and mechanical complications."},
      {id:"rn-acs-q7",questionType:"MCQ",stem:"Which discharge teaching best reduces recurrent cardiovascular risk?",options:[{id:"a",text:"Take secondary-prevention medications as prescribed and attend cardiac follow-up/rehabilitation"},{id:"b",text:"Stop medications once pain resolves"},{id:"c",text:"Avoid all activity indefinitely"},{id:"d",text:"Only return if identical pain recurs"}],correctAnswerIds:["a"],rationale:"Adherence, follow-up, rehabilitation, and risk-factor management are core secondary prevention."},
    ]},
    rationale:"The case follows STEMI recognition, reperfusion activation, medication safety, shock recognition, complication surveillance, and secondary prevention.",correctAnswerExplanation:"The seven decisions progress from immediate diagnosis and time-critical care to deterioration management and discharge prevention.",hint:"For ACS, prioritize reperfusion and perfusion; then anticipate treatment contraindications and post-MI complications.",whyThisMatters:"Delays in STEMI recognition or shock escalation increase myocardial loss, heart failure, arrhythmia, and mortality.",clinicalPearl:"Time is muscle, but safe ACS care still requires attention to oxygenation, blood pressure, medication contraindications, and mechanical complications.",tags:["acs","stemi","case-study","rn","seven-decision"],
  },
];

export const npAdvancedOrderCaseReplacements:any[]=[
  {
    id:"np-order-hyperkalemia-001",...meta("np","NP Certification"),questionType:"ORDERED_RESPONSE",topic:"Severe Hyperkalemia",
    stem:"A patient with CKD has potassium 7.1 mmol/L, weakness, and ECG changes. Place the initial management priorities in sequence.",
    options:[
      {id:"np-k-1",text:"Confirm immediate stability, place on cardiac monitoring, and obtain/verify ECG"},
      {id:"np-k-2",text:"Administer IV calcium for membrane stabilization when ECG toxicity is present"},
      {id:"np-k-3",text:"Shift potassium intracellularly with rapid temporizing therapy such as insulin with glucose as appropriate"},
      {id:"np-k-4",text:"Add other temporizing therapy when appropriate and monitor glucose/potassium closely"},
      {id:"np-k-5",text:"Initiate potassium removal and definitive treatment based on cause/severity, including urgent dialysis when indicated"},
      {id:"np-k-6",text:"Repeat potassium/ECG assessment and treat recurrence while the cause is corrected"},
    ],correctAnswerIds:["np-k-1","np-k-2","np-k-3","np-k-4","np-k-5","np-k-6"],correctAnswer:["np-k-1","np-k-2","np-k-3","np-k-4","np-k-5","np-k-6"],
    rationale:"Severe hyperkalemia with ECG toxicity requires immediate rhythm assessment, cardiac membrane stabilization, rapid intracellular shifting, potassium elimination/definitive treatment, and frequent reassessment because temporizing therapies do not remove total-body potassium.",correctAnswerExplanation:"Calcium protects the myocardium but does not lower potassium; shifting therapy acts quickly but temporarily, so definitive potassium removal must follow.",hint:"Separate the jobs: stabilize the heart, temporarily shift potassium, then remove potassium and reassess.",whyThisMatters:"Severe hyperkalemia can cause fatal conduction disturbances; mistaking temporizing treatment for definitive removal can allow rebound toxicity.",clinicalPearl:"Calcium stabilizes; insulin shifts; dialysis/removal eliminates.",tags:["hyperkalemia","ordered-response","np","emergency"],
  },
  {
    id:"np-case-af-001",...meta("np","NP Certification"),questionType:"NGN_CASE",topic:"Atrial Fibrillation With Rapid Ventricular Response",stem:"Work through this seven-decision case involving new atrial fibrillation with rapid ventricular response.",
    interactionPayload:{tabs:[{id:"np-af-history",title:"History",content:"69-year-old with hypertension and diabetes reports palpitations and dyspnea for 10 hours; no prior AF diagnosis."},{id:"np-af-vitals",title:"Vitals/ECG",content:"Irregularly irregular rhythm 146/min, BP 112/70 mmHg, SpO2 96%; ECG confirms AF without acute ST elevation."},{id:"np-af-labs",title:"Initial Data",content:"K 4.0 mmol/L, Mg 0.82 mmol/L, creatinine mildly elevated; TSH pending."}],subQuestions:[
      {id:"np-af-q1",questionType:"MCQ",stem:"What is the first management branch point?",options:[{id:"a",text:"Determine hemodynamic stability"},{id:"b",text:"Calculate BMI"},{id:"c",text:"Order routine lipid testing before assessment"},{id:"d",text:"Discharge immediately"}],correctAnswerIds:["a"],rationale:"Stability determines whether urgent synchronized cardioversion or controlled diagnostic/rate management is appropriate."},
      {id:"np-af-q2",questionType:"SATA",stem:"Which findings would make this AF immediately unstable?",options:[{id:"a",text:"Shock/hypotension attributable to the tachyarrhythmia"},{id:"b",text:"Ongoing ischemic chest discomfort"},{id:"c",text:"Acute pulmonary edema/severe heart failure"},{id:"d",text:"Palpitations with preserved perfusion"}],correctAnswerIds:["a","b","c"],rationale:"Hemodynamic compromise, ischemia, or acute heart failure make urgent cardioversion pathways appropriate."},
      {id:"np-af-q3",questionType:"MCQ",stem:"The patient remains stable. Which immediate strategy is generally appropriate while causes are assessed?",options:[{id:"a",text:"Rate control using an agent appropriate to comorbidities and ventricular function"},{id:"b",text:"No treatment despite rate 146/min"},{id:"c",text:"Empiric fibrinolysis"},{id:"d",text:"High-dose diuretic regardless of volume status"}],correctAnswerIds:["a"],rationale:"Stable AF with RVR generally requires rate control individualized to ventricular function and comorbidities."},
      {id:"np-af-q4",questionType:"SATA",stem:"Which reversible contributors should be considered?",options:[{id:"a",text:"Thyroid disease"},{id:"b",text:"Electrolyte abnormality"},{id:"c",text:"Infection or acute cardiopulmonary illness"},{id:"d",text:"Eyeglass prescription"}],correctAnswerIds:["a","b","c"],rationale:"AF can be triggered by endocrine, electrolyte, infectious, and cardiopulmonary stressors."},
      {id:"np-af-q5",questionType:"MCQ",stem:"What additional risk decision is required even if rate control succeeds?",options:[{id:"a",text:"Assess thromboembolic risk and need for anticoagulation"},{id:"b",text:"Stop all cardiovascular medications"},{id:"c",text:"Avoid future blood-pressure measurement"},{id:"d",text:"No further risk assessment is needed"}],correctAnswerIds:["a"],rationale:"Stroke prevention is a separate core AF management decision."},
      {id:"np-af-q6",questionType:"MCQ",stem:"If elective rhythm conversion is considered and AF duration is uncertain, which issue is critical?",options:[{id:"a",text:"Pericardioversion anticoagulation/left-atrial-thrombus strategy"},{id:"b",text:"Hair colour"},{id:"c",text:"Routine antibiotics for all patients"},{id:"d",text:"High-sodium meal before procedure"}],correctAnswerIds:["a"],rationale:"Unknown/prolonged AF duration increases concern for atrial thrombus and embolization with cardioversion."},
      {id:"np-af-q7",questionType:"MCQ",stem:"Which follow-up plan best addresses recurrence and long-term risk?",options:[{id:"a",text:"Review symptoms/rate-rhythm strategy, anticoagulation adherence, BP/diabetes control, sleep-apnea/weight and other modifiable risks"},{id:"b",text:"No follow-up if palpitations stop"},{id:"c",text:"Stop anticoagulation whenever rhythm feels normal"},{id:"d",text:"Avoid exercise permanently"}],correctAnswerIds:["a"],rationale:"Long-term AF care includes stroke prevention, symptom/rhythm management, and treatment of modifiable drivers."},
    ]},
    rationale:"The case covers stability assessment, rate/rhythm strategy, reversible triggers, stroke prevention, cardioversion safety, and longitudinal risk-factor management.",correctAnswerExplanation:"The seven decisions reflect the NP workflow from immediate stability through chronic AF risk reduction.",hint:"Separate AF management into stability, ventricular rate/rhythm, cause, and stroke prevention.",whyThisMatters:"AF management errors often come from focusing only on rate while missing instability, thromboembolic risk, or cardioversion anticoagulation requirements.",clinicalPearl:"AF has two simultaneous questions: how is the patient tolerating the rhythm, and how will stroke risk be managed?",tags:["atrial-fibrillation","case-study","np","seven-decision"],
  },
];
