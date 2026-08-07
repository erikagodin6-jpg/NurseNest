import type { LessonContent } from "./types";

// U.S. practical-nursing respiratory lessons authored for 2026 NCLEX-PN scope.
// These are intentionally separate from Canadian RPN content. Medication names,
// guideline details, and exam framing follow U.S. practice where it differs.
export const respiratoryMissingPnUsLessons: Record<string, LessonContent> = {
  "acute-asthma-pn-us": {
    title: "Acute Asthma Exacerbation",
    cellular: {
      title: "Bronchospasm, Airway Inflammation, and Mucus Narrow the Airways",
      content:
        "Asthma is a chronic inflammatory airway disorder with variable expiratory airflow limitation. During an acute exacerbation, bronchial smooth muscle constricts, mucosal edema increases, and mucus can plug already narrowed airways. Expiration becomes especially difficult, producing air trapping and rising work of breathing. Early in a significant attack, hyperventilation often lowers PaCO2. A PaCO2 that rises toward normal or above normal while the patient remains visibly distressed is concerning because it can signal respiratory-muscle fatigue and failing ventilation. Nursing priorities are to recognize severity, support oxygenation, administer ordered rapid bronchodilator and anti-inflammatory therapy, reassess after each treatment cycle, and escalate immediately when air movement, mental status, or gas exchange worsens."
    },
    riskFactors: [
      "Poor adherence to anti-inflammatory controller therapy or incorrect inhaler technique",
      "Viral respiratory infection",
      "Tobacco smoke, vaping aerosols, allergens, or occupational exposures",
      "Prior emergency visit, ICU admission, or intubation for asthma",
      "Frequent reliance on short-acting reliever therapy",
      "Comorbid rhinitis, obesity, reflux, or other conditions that worsen control"
    ],
    diagnostics: [
      "Assess speech, mental status, respiratory rate, accessory-muscle use, and bilateral air entry before relying on wheeze intensity",
      "Use frequent or continuous pulse oximetry in moderate-to-severe exacerbations",
      "Use peak expiratory flow when the patient can perform it safely and compare with personal best when available",
      "Expect ABG or VBG assessment when severe distress, fatigue, altered mental status, or hypercapnia is suspected",
      "Chest imaging is not routine for uncomplicated asthma; expect it when pneumonia, pneumothorax, foreign body, or another diagnosis is suspected",
      "Trend response after treatment rather than treating one initial value as the whole story"
    ],
    management: [
      "Position upright and reduce unnecessary exertion",
      "Administer supplemental oxygen as ordered or by protocol for hypoxemia while acute treatment begins",
      "Administer repeated inhaled albuterol as ordered; ipratropium is commonly added in moderate-to-severe exacerbations",
      "Administer systemic corticosteroid early when ordered for a significant exacerbation",
      "Recognize prescribed ICS-formoterol SMART regimens as valid for appropriate patients rather than automatically substituting an older SABA-only model",
      "Prepare for emergency airway/critical-care escalation when the patient develops a silent chest, exhaustion, altered consciousness, or worsening gas exchange"
    ],
    nursingActions: [
      "Trend work of breathing, air entry, respiratory rate, heart rate, SpO2, and ability to speak after each treatment cycle",
      "Recognize that less wheeze with less air entry can mean worsening obstruction rather than improvement",
      "Monitor for albuterol-associated tremor, tachycardia, and clinically important hypokalemia with intensive dosing",
      "Verify inhaler and spacer technique using return demonstration",
      "Confirm that the patient can identify controller versus rescue therapy within the prescribed regimen",
      "Escalate immediately for cyanosis, hypotension, altered consciousness, exhaustion, a silent chest, or a rising PaCO2 during persistent distress"
    ],
    signs: {
      left: [
        "Wheeze with preserved air movement",
        "Dyspnea that improves after bronchodilator treatment",
        "Ability to speak in phrases or full sentences",
        "Improving accessory-muscle use and respiratory rate after treatment"
      ],
      right: [
        "Silent or nearly silent chest",
        "Exhaustion, agitation, confusion, or drowsiness",
        "Persistent or worsening hypoxemia",
        "Rising PaCO2 or worsening acidosis",
        "Inability to speak because of breathlessness"
      ]
    },
    medications: [
      {
        name: "Albuterol",
        type: "Short-Acting Beta2-Agonist",
        action: "Rapidly relaxes bronchial smooth muscle to improve expiratory airflow.",
        sideEffects: "Tremor, tachycardia, palpitations, transient hypokalemia, and hyperglycemia with high repeated doses.",
        contra: "Use cautiously in significant tachyarrhythmia; urgent bronchospasm treatment usually outweighs these relative concerns.",
        pearl: "Reassess the patient after treatment. Escalating dose requirement is itself a severity cue."
      },
      {
        name: "Ipratropium",
        type: "Short-Acting Muscarinic Antagonist",
        action: "Reduces cholinergic bronchoconstriction and adds bronchodilation during significant exacerbations.",
        sideEffects: "Dry mouth, throat irritation, and blurred vision if aerosol reaches the eyes.",
        contra: "Hypersensitivity to ipratropium or formulation components.",
        pearl: "Use as an add-on to rapid beta2-agonist therapy in moderate-to-severe acute asthma when ordered."
      },
      {
        name: "Systemic Corticosteroid",
        type: "Anti-Inflammatory Therapy",
        action: "Reduces airway inflammation and edema and lowers risk of persistent or recurrent exacerbation symptoms.",
        sideEffects: "Hyperglycemia, mood or sleep changes, dyspepsia, fluid retention, and infection risk with longer exposure.",
        contra: "Risk-benefit is individualized; short-course treatment is commonly appropriate in significant exacerbations.",
        pearl: "Steroids treat inflammation; they do not replace rapid bronchodilation during acute bronchospasm."
      }
    ],
    pearls: [
      "A silent chest is an emergency finding, not evidence that wheezing has resolved.",
      "A 'normal' PaCO2 can be abnormal in a patient who remains severely distressed and should still be hyperventilating.",
      "U.S. asthma therapy includes current ICS-formoterol and intermittent-ICS strategies for selected patients; do not default to outdated SABA-only assumptions."
    ],
    preTest: [
      {
        question: "Which finding is most concerning in a patient with severe acute asthma?",
        options: ["Loud expiratory wheeze", "Mild tremor after albuterol", "Minimal air entry with increasing drowsiness", "Dry cough"],
        correct: 2,
        rationale: "Minimal air entry with altered consciousness suggests critically reduced airflow and impending ventilatory failure."
      }
    ],
    quiz: [
      {
        question: "A patient has less wheeze after repeated albuterol but remains tachypneic and now has very poor air entry. What is the best interpretation?",
        options: ["The attack is resolving", "Airflow may be critically reduced", "The patient is developing nephrotic syndrome", "Wheezing must be present for asthma to be severe"],
        correct: 1,
        rationale: "Wheezing requires airflow. Less wheeze with poor air movement and persistent distress can indicate dangerous worsening obstruction."
      },
      {
        question: "Which trend is most concerning for respiratory muscle fatigue in severe asthma?",
        options: ["PaCO2 rising toward normal while distress persists", "Mild tachycardia after albuterol", "Improving peak flow", "Decreasing accessory-muscle use with better air entry"],
        correct: 0,
        rationale: "A rising PaCO2 during persistent severe distress may signal failing ventilation."
      }
    ],
    postTest: [
      {
        question: "What should be verified before discharge after an asthma exacerbation?",
        options: ["Only that wheezing is absent", "Inhaler technique, medication purpose, action plan, and red-flag understanding", "That the patient will avoid all exercise", "That antibiotics were prescribed"],
        correct: 1,
        rationale: "Safe discharge requires demonstrated device technique, understanding of the regimen, relapse prevention, and clear escalation instructions."
      }
    ]
  },

  "copd-exacerbation-pn-us": {
    title: "COPD Exacerbation: Recognize, Treat, Reassess",
    cellular: {
      title: "Expiratory Flow Limitation, Hyperinflation, and V/Q Mismatch",
      content:
        "COPD causes persistent airflow obstruction through variable combinations of small-airway disease, mucus hypersecretion, emphysematous loss of elastic recoil, and pulmonary vascular change. During an exacerbation, airway inflammation and bronchoconstriction increase, secretions may increase, expiratory flow falls, and dynamic hyperinflation worsens. Gas exchange becomes less efficient and some patients develop acute-on-chronic hypercapnic respiratory failure. The unsafe myth is that oxygen must be withheld to preserve 'hypoxic drive.' Hypoxemia should be treated with controlled oxygen while the team reassesses ventilation; oxygen-associated hypercapnia in susceptible patients is driven mainly by worsened V/Q matching and the Haldane effect rather than complete loss of respiratory drive."
    },
    riskFactors: [
      "Respiratory viral or bacterial infection",
      "Continued tobacco exposure",
      "Incorrect inhaler technique or poor adherence",
      "Prior exacerbation or hospitalization",
      "Heart failure, pulmonary hypertension, or other cardiopulmonary comorbidity",
      "Sedatives or opioids that worsen hypoventilation",
      "Low physical conditioning or lack of pulmonary rehabilitation"
    ],
    diagnostics: [
      "Compare current dyspnea, cough, sputum, mental status, and oxygen need with the patient's baseline",
      "Use pulse oximetry and controlled oxygen; expect blood-gas assessment when hypercapnia, acidosis, or ventilatory failure is suspected",
      "Chest radiograph is useful when pneumonia, pneumothorax, edema, or another diagnosis is possible",
      "ECG/cardiac assessment is important when ischemia, dysrhythmia, or heart failure may be contributing",
      "Monitor chemistry including potassium when intensive beta2-agonist treatment is used",
      "Stable COPD diagnosis requires spirometric confirmation; current GOLD uses persistent post-bronchodilator airflow obstruction in the appropriate clinical context"
    ],
    management: [
      "Position upright and administer controlled oxygen to the ordered target rather than withholding oxygen from a hypoxemic patient",
      "Administer short-acting bronchodilator therapy as ordered, commonly albuterol with or without ipratropium",
      "Administer systemic corticosteroid therapy as ordered for a clinically significant exacerbation",
      "Administer antibiotics only when indicated by the clinical picture and treatment plan rather than by sputum color alone",
      "Support secretion clearance, hydration appropriate to comorbidity, and graded mobility",
      "Prepare for non-invasive ventilation when acute hypercapnic respiratory failure with acidosis and increased work of breathing persists despite initial therapy"
    ],
    nursingActions: [
      "Trend respiratory rate, work of breathing, air entry, oxygen support, SpO2, and mental status",
      "Watch for headache, confusion, somnolence, asterixis, or worsening acidosis when CO2 retention is suspected",
      "Monitor albuterol-associated tachycardia/hypokalemia and steroid-associated hyperglycemia",
      "Verify maintenance versus rescue inhaler purpose and observe inhaler technique",
      "Encourage pursed-lip breathing and paced activity when the patient can participate",
      "Escalate for worsening acidosis, exhaustion, reduced consciousness, hemodynamic instability, or inability to protect the airway"
    ],
    signs: {
      left: [
        "Increased cough, sputum, or dyspnea from baseline",
        "Wheeze or reduced breath sounds with preserved alertness",
        "Improvement after bronchodilator and controlled oxygen",
        "Ability to speak and participate in care"
      ],
      right: [
        "New confusion or somnolence",
        "Severe accessory-muscle use or exhaustion",
        "Worsening hypercapnic acidosis",
        "Increasing oxygen requirement",
        "Hemodynamic instability or inability to protect the airway"
      ]
    },
    medications: [
      {
        name: "Albuterol",
        type: "Short-Acting Beta2-Agonist",
        action: "Relaxes bronchial smooth muscle and improves expiratory airflow.",
        sideEffects: "Tremor, tachycardia, palpitations, and transient hypokalemia.",
        contra: "Use cautiously in significant tachyarrhythmia.",
        pearl: "With repeated dosing, reassess respiratory response, heart rate, and potassium risk."
      },
      {
        name: "Ipratropium",
        type: "Short-Acting Muscarinic Antagonist",
        action: "Reduces cholinergic bronchoconstriction and adds bronchodilation.",
        sideEffects: "Dry mouth, urinary retention, and ocular irritation with eye exposure.",
        contra: "Hypersensitivity to formulation components.",
        pearl: "Often paired with a short-acting beta2-agonist during an acute exacerbation."
      },
      {
        name: "Systemic Corticosteroid",
        type: "Anti-Inflammatory Therapy",
        action: "Reduces airway inflammation and shortens recovery in clinically important exacerbations.",
        sideEffects: "Hyperglycemia, insomnia, mood change, dyspepsia, and fluid retention.",
        contra: "Risks are individualized; monitor closely in diabetes and infection risk.",
        pearl: "A short steroid course can still destabilize glucose."
      }
    ],
    pearls: [
      "Treat hypoxemia with controlled oxygen and reassess ventilation; do not leave a patient hypoxemic because of an outdated 'hypoxic drive' myth.",
      "A rising oxygen requirement or new somnolence is deterioration even if a single SpO2 value looks acceptable.",
      "Stable COPD requires spirometric confirmation; symptoms alone do not establish the diagnosis."
    ],
    preTest: [
      {
        question: "A patient with COPD is hypoxemic and at risk for hypercapnia. What is the safest action?",
        options: ["Withhold oxygen", "Give controlled oxygen to the ordered target and reassess ventilation", "Give maximum oxygen indefinitely without reassessment", "Encourage breath holding"],
        correct: 1,
        rationale: "Hypoxemia should be treated. Controlled oxygen plus reassessment addresses oxygenation while monitoring for worsening hypercapnia."
      }
    ],
    quiz: [
      {
        question: "Which finding most strongly supports escalation for possible non-invasive ventilation?",
        options: ["Stable chronic cough", "Acute hypercapnic respiratory acidosis with increased work of breathing", "Baseline dyspnea", "Improving oxygen need"],
        correct: 1,
        rationale: "Persistent acute hypercapnic respiratory failure with acidosis and increased work of breathing is a major indication for escalation to ventilatory support."
      },
      {
        question: "What should the nurse assess before assuming a maintenance inhaler is ineffective?",
        options: ["Device technique and adherence", "Only device color", "Whether the patient knows every receptor subtype", "Whether the patient can hold their breath for one minute"],
        correct: 0,
        rationale: "Incorrect technique and poor adherence commonly mimic medication failure."
      }
    ],
    postTest: [
      {
        question: "Which finding during a COPD exacerbation requires urgent escalation?",
        options: ["Stable chronic cough", "New somnolence with shallow respirations", "Mild dry mouth after ipratropium", "Improving dyspnea"],
        correct: 1,
        rationale: "New somnolence with shallow breathing can indicate worsening hypercapnic ventilatory failure."
      }
    ]
  },

  "community-acquired-pneumonia-pn-us": {
    title: "Community-Acquired Pneumonia",
    cellular: {
      title: "Alveolar Infection, Inflammatory Exudate, and Shunt Physiology",
      content:
        "Community-acquired pneumonia develops when organisms reach the lower respiratory tract and overcome host defenses. Inflammatory mediators recruit neutrophils and protein-rich fluid into alveoli, creating consolidation. Perfusion continues through poorly ventilated lung units, producing low V/Q regions and shunt-like physiology that can cause hypoxemia. Severe infection can extend beyond the lungs into sepsis and organ dysfunction. Nursing care should move from respiratory and hemodynamic severity assessment to ordered imaging/testing, timely antimicrobial or antiviral therapy when indicated, oxygenation support, secretion management, mobility, aspiration prevention, and early recognition of sepsis or pleural complications."
    },
    riskFactors: [
      "Advanced age or frailty",
      "Smoking and chronic lung disease",
      "Heart disease, diabetes, kidney disease, or immunocompromise",
      "Dysphagia, impaired cough, sedation, or aspiration risk",
      "Recent influenza or another respiratory viral infection",
      "Recent hospitalization or antimicrobial exposure when resistant pathogens are a concern"
    ],
    diagnostics: [
      "Trend respiratory rate, oxygen saturation, oxygen requirement, blood pressure, mental status, and urine output",
      "Chest imaging can demonstrate infiltrates and identify pleural or alternative pathology but does not identify every causative organism",
      "Blood cultures and sputum cultures are selective rather than routine for every mild case; when ordered for severe/high-risk CAP, obtain promptly before antibiotics when feasible without delaying treatment",
      "Do not use sputum color alone to diagnose bacterial pneumonia",
      "A low initial procalcitonin alone should not be used to withhold prescribed empiric antibacterial therapy in clinically suspected and radiographically confirmed adult CAP",
      "Assess swallowing safety when recurrent pneumonia, cough during meals, or a wet voice suggests aspiration"
    ],
    management: [
      "Administer supplemental oxygen as ordered for hypoxemia and escalate a rising oxygen requirement",
      "Administer prescribed empiric antibiotics on time after verifying allergies; follow local pathway and culture results for subsequent adjustment",
      "Implement organism-appropriate infection precautions while contagious respiratory causes are being evaluated",
      "Treat pain and fever as ordered so the patient can breathe deeply, cough, rest, and mobilize",
      "Balance hydration with heart or kidney failure risk rather than using a universal 'push fluids' rule",
      "Escalate immediately for sepsis, progressive respiratory failure, empyema/effusion concern, or another complication"
    ],
    nursingActions: [
      "Recognize new confusion in an older adult as possible hypoxemia or sepsis rather than normal aging",
      "Track the oxygen flow/device required to maintain saturation, not just the saturation value",
      "Monitor antimicrobial adverse effects including hypersensitivity and clinically significant antibiotic-associated diarrhea",
      "Trend urine output as a marker of perfusion in severe infection",
      "Use upright positioning and the established swallowing plan for patients with dysphagia",
      "Advance mobility gradually as respiratory and hemodynamic status improves"
    ],
    signs: {
      left: [
        "Fever or chills, cough, pleuritic discomfort, or dyspnea",
        "Focal crackles or bronchial breath sounds",
        "Consolidation on imaging",
        "Improving oxygen requirement and appetite with treatment"
      ],
      right: [
        "Rapidly increasing oxygen requirement",
        "New confusion, hypotension, or oliguria",
        "Severe work of breathing or exhaustion",
        "Persistent fever and worsening unilateral pleuritic findings despite therapy",
        "Signs of aspiration or inability to protect the airway"
      ]
    },
    medications: [
      {
        name: "Empiric Antibacterial Therapy",
        type: "Pathogen-Directed Treatment",
        action: "Treats likely bacterial CAP while microbiologic information and clinical response refine therapy.",
        sideEffects: "Allergic reactions, GI effects, drug-specific interactions, and C. difficile risk.",
        contra: "Drug-specific allergies, organ dysfunction, interactions, and local resistance considerations affect selection.",
        pearl: "Give prescribed therapy on time; cultures should not create a harmful treatment delay."
      },
      {
        name: "Influenza Antiviral Therapy",
        type: "Antiviral",
        action: "Treats influenza when clinically indicated, especially in hospitalized or high-risk patients.",
        sideEffects: "Agent-specific GI, neuropsychiatric, or other adverse effects.",
        contra: "Agent and route are individualized to patient factors.",
        pearl: "A positive viral test does not automatically exclude bacterial coinfection in a severely ill patient."
      }
    ],
    pearls: [
      "A stable SpO2 maintained with much more oxygen is not a stable respiratory trajectory.",
      "Color is not culture: purulent sputum alone does not prove bacterial pneumonia.",
      "Do not let diagnostic testing or biomarker interpretation delay indicated therapy in a deteriorating patient."
    ],
    preTest: [
      {
        question: "Which change most strongly indicates pneumonia deterioration?",
        options: ["Improving appetite", "Oxygen requirement rising from 2 L/min to 7 L/min", "Cough becoming less frequent", "Normal urine output"],
        correct: 1,
        rationale: "A sharply rising oxygen requirement indicates worsening gas exchange even if the displayed SpO2 is temporarily maintained."
      }
    ],
    quiz: [
      {
        question: "A patient with CAP has a low initial procalcitonin and an empiric antibiotic order. What should the LPN/VN do?",
        options: ["Withhold the antibiotic solely because procalcitonin is low", "Administer the prescribed antibiotic unless the authorized prescriber changes the plan", "Declare the pneumonia viral", "Discontinue all anti-infective therapy"],
        correct: 1,
        rationale: "Initial procalcitonin alone should not be used to withhold empiric antibacterial treatment in clinically suspected and radiographically confirmed CAP."
      },
      {
        question: "Which findings suggest sepsis-related organ dysfunction?",
        options: ["Improving oxygen need and appetite", "Hypotension, new confusion, and declining urine output", "Stable cough and normal mentation", "Mild fatigue after walking"],
        correct: 1,
        rationale: "Hypotension, acute mental-status change, and oliguria suggest impaired perfusion and organ dysfunction."
      }
    ],
    postTest: [
      {
        question: "Which discharge statement requires correction?",
        options: ["I will seek care for worsening breathlessness or confusion", "I will take medication as prescribed", "I will save leftover antibiotics for my spouse", "I will rebuild activity gradually"],
        correct: 2,
        rationale: "Prescription antibiotics should not be saved or shared; another person's cough may not require the same medication or any antibiotic."
      }
    ]
  }
};

for (const requiredKey of [
  "acute-asthma-pn-us",
  "copd-exacerbation-pn-us",
  "community-acquired-pneumonia-pn-us"
]) {
  const lesson = respiratoryMissingPnUsLessons[requiredKey];
  if (!lesson) throw new Error(`PN_US_RESPIRATORY_FULL_LESSON_MISSING: ${requiredKey}`);
  if (!lesson.preTest?.length || !lesson.quiz.length || !lesson.postTest?.length) {
    throw new Error(`PN_US_RESPIRATORY_INTERACTIVE_CHECKS_MISSING: ${requiredKey}`);
  }
  if (!lesson.diagnostics?.length || !lesson.management?.length || !lesson.nursingActions?.length) {
    throw new Error(`PN_US_RESPIRATORY_FLOW_MISSING: ${requiredKey}`);
  }
}
