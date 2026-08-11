const BOTH_COUNTRIES=["Canada","United States"];

export const rpnAdvancedStructuredReplacements:any[]=[
  {
    id:"rpn-matrix-hf-001",tier:"rpn",exam:"REx-PN/NCLEX-PN",questionType:"MATRIX",bodySystem:"Cardiovascular",topic:"Heart Failure Nursing Care",difficulty:3,regionScope:"BOTH",countryLabels:BOTH_COUNTRIES,languageCode:"en",
    stem:"For a client with acute decompensated heart failure, classify each nursing action as generally indicated or generally contraindicated unless a specific order or clinical condition changes the plan.",
    interactionPayload:{
      rows:[
        {id:"rpn-mx-hf-row-1",label:"Position the client upright to reduce work of breathing"},
        {id:"rpn-mx-hf-row-2",label:"Measure intake and output and report declining urine output"},
        {id:"rpn-mx-hf-row-3",label:"Encourage unrestricted high-sodium foods and fluids"},
        {id:"rpn-mx-hf-row-4",label:"Administer a rapid large-volume IV fluid bolus routinely"},
        {id:"rpn-mx-hf-row-5",label:"Monitor respiratory status and oxygen saturation"},
      ],
      columns:[{id:"indicated",label:"Generally indicated"},{id:"contraindicated",label:"Generally contraindicated"}],
      answerKey:{"rpn-mx-hf-row-1":"indicated","rpn-mx-hf-row-2":"indicated","rpn-mx-hf-row-3":"contraindicated","rpn-mx-hf-row-4":"contraindicated","rpn-mx-hf-row-5":"indicated"},selectionMode:"single",
    },
    rationale:"Upright positioning, respiratory surveillance, and fluid-balance monitoring support assessment and symptom management in acute heart failure. Routine high-sodium intake or indiscriminate large-volume fluid loading can worsen congestion and are not appropriate default interventions.",
    correctAnswerExplanation:"The indicated actions reduce respiratory burden or monitor perfusion/congestion, while unrestricted sodium/fluid intake and routine rapid volume loading can increase cardiac filling pressures and pulmonary or systemic congestion.",
    hint:"Ask whether each action helps breathing or monitors perfusion versus adding unnecessary sodium or circulating volume to an already congested client.",
    whyThisMatters:"Practical nurses frequently detect worsening congestion first. Correctly distinguishing supportive monitoring from interventions that can increase fluid overload helps prevent respiratory deterioration and delayed escalation.",
    clinicalPearl:"In heart failure, trend breathing, urine output, edema, weight, and response to therapy; worsening congestion or perfusion requires escalation rather than simply adding fluid.",
    tags:["cardiology","heart-failure","matrix","rpn","fluid-balance"],
  },
  {
    id:"rpn-bowtie-digoxin-001",tier:"rpn",exam:"REx-PN/NCLEX-PN",questionType:"BOWTIE",bodySystem:"Cardiovascular",topic:"Digoxin Toxicity",difficulty:4,regionScope:"BOTH",countryLabels:BOTH_COUNTRIES,languageCode:"en",
    stem:"An older adult taking digoxin reports nausea, poor appetite, weakness, and new yellow-green visual changes. The apical pulse is 48/min. Complete the bow-tie by identifying the most likely condition, two immediate nursing actions, and two priority parameters to monitor.",
    interactionPayload:{
      conditionOptions:[{id:"dig-tox",text:"Digoxin toxicity"},{id:"hf-fluid",text:"Heart-failure fluid overload"},{id:"stable-af",text:"Stable atrial fibrillation"},{id:"iron-def",text:"Iron-deficiency anemia"}],
      actionOptions:[{id:"withhold-dose",text:"Withhold the scheduled digoxin dose"},{id:"notify-escalate",text:"Notify the prescriber/appropriate clinician promptly"},{id:"give-extra-dose",text:"Give an additional digoxin dose"},{id:"encourage-exercise",text:"Encourage ambulation to raise the pulse"}],
      monitorOptions:[{id:"monitor-rhythm",text:"Heart rate and cardiac rhythm"},{id:"monitor-potassium",text:"Serum potassium and renal function as ordered/available"},{id:"monitor-calories",text:"Daily calorie intake only"},{id:"monitor-vision-alone",text:"Visual acuity only"}],
      slots:{condition:{count:1,correctIds:["dig-tox"]},actions:{count:2,correctIds:["withhold-dose","notify-escalate"]},monitoring:{count:2,correctIds:["monitor-rhythm","monitor-potassium"]}},
    },
    rationale:"Bradycardia together with gastrointestinal and visual symptoms in a client taking digoxin is concerning for toxicity. The medication should be withheld and the finding escalated promptly. Rhythm, renal function, and potassium are clinically important because impaired clearance and electrolyte abnormalities can increase toxicity and dysrhythmia risk.",
    correctAnswerExplanation:"The symptom cluster and pulse of 48/min support digoxin toxicity; withholding the dose and escalating protects the client while rhythm and electrolyte/renal factors are evaluated.",
    hint:"Link the medication to its classic GI, visual, and bradycardic toxicity pattern, then choose actions that prevent further exposure and monitor dysrhythmia risk.",
    whyThisMatters:"Digoxin toxicity can progress from nonspecific nausea or visual changes to dangerous bradyarrhythmias and other dysrhythmias, particularly in older adults or clients with renal impairment.",
    clinicalPearl:"Before digoxin, check the apical pulse and the whole toxicity picture—GI symptoms, visual changes, renal function, potassium, and rhythm matter together.",
    tags:["cardiology","digoxin","toxicity","bowtie","rpn"],
  },
];

export const rnAdvancedStructuredReplacements:any[]=[
  {
    id:"rn-matrix-adhf-001",tier:"rn",exam:"NCLEX-RN",questionType:"MATRIX",bodySystem:"Cardiovascular",topic:"Acute Decompensated Heart Failure",difficulty:4,regionScope:"BOTH",countryLabels:BOTH_COUNTRIES,languageCode:"en",
    stem:"A client is admitted with acute decompensated heart failure and pulmonary congestion. Classify each action according to its immediate role in the plan of care.",
    interactionPayload:{
      rows:[
        {id:"rn-mx-row-1",label:"Position in high Fowler position"},
        {id:"rn-mx-row-2",label:"Administer prescribed IV loop diuretic"},
        {id:"rn-mx-row-3",label:"Trend urine output and renal function"},
        {id:"rn-mx-row-4",label:"Give a routine rapid 1-L isotonic fluid bolus"},
        {id:"rn-mx-row-5",label:"Apply supplemental oxygen when hypoxemia is present"},
      ],
      columns:[{id:"treat",label:"Treat congestion/respiratory distress"},{id:"monitor",label:"Monitor response/safety"},{id:"avoid",label:"Generally avoid as a routine action"}],
      answerKey:{"rn-mx-row-1":"treat","rn-mx-row-2":"treat","rn-mx-row-3":"monitor","rn-mx-row-4":"avoid","rn-mx-row-5":"treat"},selectionMode:"single",
    },
    rationale:"Immediate care for decompensated heart failure targets oxygenation and congestion while monitoring renal perfusion and diuretic response. Upright positioning, indicated oxygen, and prescribed diuresis can improve symptoms; routine large-volume fluid boluses may worsen pulmonary edema unless a separate indication is established.",
    correctAnswerExplanation:"The matrix separates therapeutic actions from monitoring and from a routine intervention that can increase filling pressures and pulmonary congestion.",
    hint:"For each row, decide whether it actively relieves pulmonary congestion, measures response/safety, or adds volume that could worsen the problem.",
    whyThisMatters:"Rapid categorization of treatment versus monitoring helps nurses prioritize care while avoiding interventions that can worsen respiratory failure in a volume-overloaded patient.",
    clinicalPearl:"In acute heart failure, reassess after every major intervention: respiratory effort, oxygenation, blood pressure, urine output, electrolytes, and renal function show whether therapy is helping or causing harm.",
    tags:["cardiology","heart-failure","matrix","rn","acute-care"],
  },
  {
    id:"rn-bowtie-tamponade-001",tier:"rn",exam:"NCLEX-RN",questionType:"BOWTIE",bodySystem:"Cardiovascular",topic:"Cardiac Tamponade",difficulty:4,regionScope:"BOTH",countryLabels:BOTH_COUNTRIES,languageCode:"en",
    stem:"Several hours after cardiac surgery, a client develops rapidly worsening hypotension, tachycardia, jugular venous distention, muffled heart sounds, and decreasing urine output. Complete the bow-tie.",
    interactionPayload:{
      conditionOptions:[{id:"tamponade",text:"Cardiac tamponade"},{id:"pulm-edema",text:"Isolated pulmonary edema"},{id:"stable-af",text:"Stable atrial fibrillation"},{id:"simple-atelectasis",text:"Uncomplicated postoperative atelectasis"}],
      actionOptions:[{id:"emergency-escalation",text:"Activate immediate emergency/surgical escalation"},{id:"prepare-decompression",text:"Prepare for urgent echocardiographic evaluation and pericardial decompression as directed"},{id:"delay-rounds",text:"Wait for routine rounds before notifying the team"},{id:"ambulate",text:"Ambulate the client to improve venous return"}],
      monitorOptions:[{id:"hemodynamics",text:"Blood pressure, heart rate, mental status, and urine output"},{id:"filling-signs",text:"Jugular venous pressure and signs of worsening obstructive shock"},{id:"diet-intake",text:"Meal intake only"},{id:"incision-photo",text:"Incision appearance only"}],
      slots:{condition:{count:1,correctIds:["tamponade"]},actions:{count:2,correctIds:["emergency-escalation","prepare-decompression"]},monitoring:{count:2,correctIds:["hemodynamics","filling-signs"]}},
    },
    rationale:"The postoperative combination of hypotension, tachycardia, elevated venous pressure, muffled heart sounds, oliguria, and deterioration is consistent with tamponade causing impaired ventricular filling and obstructive shock. Immediate escalation and preparation for definitive decompression are priorities while perfusion is continuously reassessed.",
    correctAnswerExplanation:"Tamponade explains both the elevated venous pressure and falling systemic perfusion. Emergency evaluation/decompression and close hemodynamic monitoring address the life-threatening mechanism directly.",
    hint:"Choose the condition that raises venous pressure while simultaneously reducing ventricular filling and systemic output after cardiac surgery.",
    whyThisMatters:"Postoperative tamponade can progress quickly to cardiac arrest. Nurses must recognize the pattern and mobilize definitive treatment before hypotension becomes irreversible shock.",
    clinicalPearl:"After cardiac surgery, unexplained hypotension with rising venous pressure or falling urine output is tamponade until proven otherwise—do not wait for the full classic triad.",
    tags:["cardiology","tamponade","bowtie","rn","postoperative"],
  },
];

export const npAdvancedStructuredReplacements:any[]=[
  {
    id:"np-matrix-hf-phenotype-001",tier:"np",exam:"NP Certification",questionType:"MATRIX",bodySystem:"Cardiovascular",topic:"Heart Failure Phenotypes",difficulty:4,regionScope:"BOTH",countryLabels:BOTH_COUNTRIES,languageCode:"en",
    stem:"Classify each finding by the heart-failure congestion pattern it most strongly reflects. Use 'Both' when the finding commonly occurs with either right- or left-sided congestion.",
    interactionPayload:{
      rows:[
        {id:"np-mx-row-1",label:"Orthopnea and bibasilar crackles"},
        {id:"np-mx-row-2",label:"Jugular venous distention and hepatomegaly"},
        {id:"np-mx-row-3",label:"Dependent peripheral edema"},
        {id:"np-mx-row-4",label:"Paroxysmal nocturnal dyspnea"},
        {id:"np-mx-row-5",label:"Rapid weight gain from sodium and water retention"},
      ],
      columns:[{id:"left",label:"Predominantly left-sided/pulmonary congestion"},{id:"right",label:"Predominantly right-sided/systemic venous congestion"},{id:"both",label:"Can occur in either/biventricular failure"}],
      answerKey:{"np-mx-row-1":"left","np-mx-row-2":"right","np-mx-row-3":"right","np-mx-row-4":"left","np-mx-row-5":"both"},selectionMode:"single",
    },
    rationale:"Left-sided congestion predominantly raises pulmonary venous pressures, producing orthopnea, crackles, and nocturnal dyspnea. Right-sided congestion produces systemic venous findings such as JVD, hepatomegaly, and dependent edema. Neurohormonal sodium/water retention and weight gain may accompany either phenotype and are common in biventricular disease.",
    correctAnswerExplanation:"The answer key follows the vascular compartment in which congestion is most evident while recognizing that real patients often have mixed or biventricular findings.",
    hint:"Ask where pressure is backing up: pulmonary venous circulation points left; systemic venous congestion points right; whole-body fluid retention may accompany either.",
    whyThisMatters:"Phenotyping congestion helps the NP interpret symptoms, select focused examination findings, assess severity, and avoid oversimplifying mixed heart-failure presentations.",
    clinicalPearl:"Use left-versus-right findings as a localization framework, not a rigid rule—advanced heart failure commonly becomes biventricular.",
    tags:["cardiology","heart-failure","matrix","np","assessment"],
  },
  {
    id:"np-bowtie-aortic-dissection-001",tier:"np",exam:"NP Certification",questionType:"BOWTIE",bodySystem:"Cardiovascular",topic:"Acute Aortic Syndrome",difficulty:4,regionScope:"BOTH",countryLabels:BOTH_COUNTRIES,languageCode:"en",
    stem:"A 67-year-old with long-standing hypertension develops abrupt maximal-at-onset tearing chest pain radiating to the back. Blood pressure differs by 32 mmHg between arms and a new diastolic murmur is present. Complete the bow-tie.",
    interactionPayload:{
      conditionOptions:[{id:"aortic-dissection",text:"Acute aortic dissection"},{id:"acute-pericarditis",text:"Acute pericarditis"},{id:"stable-angina",text:"Stable angina"},{id:"pulmonary-infection",text:"Community-acquired pneumonia"}],
      actionOptions:[{id:"emergent-imaging",text:"Arrange emergent definitive aortic imaging appropriate to hemodynamic stability"},{id:"anti-impulse",text:"Begin urgent anti-impulse blood-pressure/heart-rate management per emergency protocol while obtaining specialty consultation"},{id:"thrombolysis",text:"Administer fibrinolytic therapy before defining the aortic pathology"},{id:"discharge",text:"Discharge with routine outpatient stress testing"}],
      monitorOptions:[{id:"perfusion-neuro",text:"Neurologic status and limb/organ perfusion"},{id:"hemodynamics",text:"Blood pressure and heart rate during anti-impulse therapy"},{id:"meal-intake",text:"Meal tolerance"},{id:"daily-weight-only",text:"Daily weight as the primary acute parameter"}],
      slots:{condition:{count:1,correctIds:["aortic-dissection"]},actions:{count:2,correctIds:["emergent-imaging","anti-impulse"]},monitoring:{count:2,correctIds:["perfusion-neuro","hemodynamics"]}},
    },
    rationale:"Abrupt severe tearing pain, pulse or blood-pressure differential, and new aortic regurgitation findings strongly suggest acute aortic dissection. Management requires rapid anatomic confirmation, anti-impulse therapy when appropriate, and urgent specialty involvement while monitoring for malperfusion and hemodynamic deterioration.",
    correctAnswerExplanation:"The presentation is classic for acute aortic syndrome; emergent imaging and controlled reduction of aortic shear stress directly address diagnosis and pathophysiology while perfusion and hemodynamics are monitored closely.",
    hint:"Look for a vascular catastrophe that begins abruptly, can create asymmetric pulses/pressures, and may cause acute aortic regurgitation.",
    whyThisMatters:"Missed aortic dissection can lead to rupture, tamponade, stroke, renal/mesenteric ischemia, or limb loss. Inappropriate antithrombotic/fibrinolytic treatment may be catastrophic when dissection is the true diagnosis.",
    clinicalPearl:"Maximal-at-onset chest/back pain plus pulse or blood-pressure asymmetry should trigger an acute-aortic-syndrome pathway, not a routine chest-pain workup alone.",
    tags:["cardiology","aortic-dissection","bowtie","np","emergency"],
  },
];
