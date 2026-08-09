import type { LessonContent } from "./types";

// Canadian RPN / practical-nursing respiratory gap lessons.
// Clinical wording uses Canadian spelling, SI units, and current Canadian respiratory practice.
export const respiratoryMissingRpnLessons: Record<string, LessonContent> = {
  "acute-asthma-rpn-ca": {
    title: "Acute Asthma Exacerbation",
    cellular: {
      title: "Bronchospasm, Mucosal Edema, and Mucus Plugging",
      content: "Asthma is a chronic inflammatory airway disorder with variable expiratory airflow limitation. During an exacerbation, airway smooth muscle contracts, the bronchial mucosa becomes edematous, and mucus production increases. These changes narrow the conducting airways and make expiration especially difficult, causing air trapping and increased work of breathing. Early in an attack, the patient may compensate with tachypnea and a low PaCO2. A normalizing or rising PaCO2 in a patient who is still working hard to breathe is concerning because it can signal respiratory muscle fatigue and impending ventilatory failure. Flow should move from recognition of severity to oxygenation, bronchodilation, anti-inflammatory therapy, reassessment, and escalation when the patient fails to improve."
    },
    riskFactors: [
      "Poor adherence to inhaled corticosteroid therapy or incorrect inhaler technique",
      "Viral respiratory infection",
      "Tobacco or vaping exposure",
      "Environmental allergens or occupational sensitizers",
      "Previous severe exacerbation, emergency visit, ICU admission, or intubation",
      "Frequent reliance on short-acting bronchodilator relief",
      "Comorbid allergic rhinitis, obesity, or gastroesophageal reflux"
    ],
    diagnostics: [
      "Assess ability to speak, level of consciousness, respiratory rate, accessory-muscle use, and air entry before focusing on wheeze intensity",
      "Continuous or frequent pulse oximetry during moderate-to-severe exacerbations",
      "Peak expiratory flow when the patient can perform it safely; compare with personal best when available",
      "ABG or VBG when there is severe distress, fatigue, altered mental status, or concern for hypercapnia",
      "Chest radiograph only when an alternative or complication is suspected, such as pneumonia or pneumothorax",
      "Reassess response after each treatment cycle rather than relying on a single initial assessment"
    ],
    management: [
      "Sit the patient upright and reduce unnecessary exertion",
      "Titrate supplemental oxygen to maintain an appropriate saturation while bronchodilator treatment is started",
      "Administer repeated inhaled salbutamol as ordered; add ipratropium for moderate-to-severe exacerbations",
      "Administer systemic corticosteroid early when the exacerbation is more than mild or is not rapidly resolving",
      "Maintain hydration without forcing large oral volumes in a patient with marked respiratory distress",
      "Prepare for higher-acuity review when air entry worsens, the chest becomes silent, mental status changes, or fatigue develops"
    ],
    nursingActions: [
      "Trend respiratory effort, air entry, respiratory rate, heart rate, SpO2, and ability to speak after treatment",
      "Recognize that less wheeze can mean either improvement or critically reduced airflow; correlate with air entry and effort",
      "Verify inhaler and spacer technique before discharge",
      "Confirm the patient understands controller versus reliever therapy",
      "Ensure an asthma action plan and follow-up plan are in place when discharge teaching is within the nurse's role",
      "Escalate immediately for cyanosis, altered consciousness, exhaustion, hypotension, or deteriorating gas exchange"
    ],
    signs: {
      left: [
        "Wheeze with preserved air entry",
        "Dyspnea that improves after bronchodilator",
        "Able to speak in phrases or sentences",
        "Improving respiratory rate and accessory-muscle use after treatment"
      ],
      right: [
        "Silent or nearly silent chest",
        "Exhaustion, confusion, drowsiness, or agitation",
        "Persistent hypoxemia despite oxygen therapy",
        "Rising PaCO2 or worsening acidosis",
        "Inability to speak because of breathlessness"
      ]
    },
    medications: [
      {
        name: "Salbutamol",
        type: "Short-Acting Beta2-Agonist",
        action: "Relaxes bronchial smooth muscle through beta2-receptor stimulation, producing rapid bronchodilation.",
        sideEffects: "Tremor, tachycardia, palpitations, transient hypokalemia, and hyperglycemia at high repeated doses.",
        contra: "Use cautiously with significant tachyarrhythmia; there is no practical substitute when urgently needed for acute bronchospasm.",
        pearl: "Reassess response, not just administration. Persistent need for frequent doses suggests uncontrolled disease or a severe exacerbation."
      },
      {
        name: "Ipratropium",
        type: "Short-Acting Muscarinic Antagonist",
        action: "Blocks muscarinic receptors in the airways, reducing vagally mediated bronchoconstriction.",
        sideEffects: "Dry mouth, throat irritation, blurred vision if aerosol reaches the eyes.",
        contra: "Hypersensitivity to ipratropium or formulation components.",
        pearl: "Most useful as an add-on to a short-acting beta2-agonist in moderate-to-severe acute asthma."
      },
      {
        name: "Prednisone",
        type: "Systemic Corticosteroid",
        action: "Reduces airway inflammation and edema and lowers the risk of relapse after a significant exacerbation.",
        sideEffects: "Hyperglycemia, mood change, dyspepsia, fluid retention, and infection risk with longer exposure.",
        contra: "Relative caution with uncontrolled infection or severe hyperglycemia; acute asthma benefit usually outweighs short-course risk.",
        pearl: "The benefit is anti-inflammatory, so it is not a substitute for rapid bronchodilation. Give early when ordered rather than waiting for bronchodilators to fail completely."
      }
    ],
    pearls: [
      "A silent chest is an emergency finding, not a sign that wheezing has resolved.",
      "A patient who remains in severe distress while PaCO2 rises is losing ventilatory reserve.",
      "Correct inhaler technique and controller adherence are part of exacerbation prevention, not optional discharge details."
    ],
    preTest: [
      {
        question: "Which finding is most concerning in a patient with a severe asthma exacerbation?",
        options: ["Loud expiratory wheeze", "Heart rate 108/min after salbutamol", "Minimal air entry with increasing drowsiness", "Dry cough"],
        correct: 2,
        rationale: "Minimal air entry plus altered level of consciousness suggests critically reduced airflow and impending respiratory failure."
      }
    ],
    quiz: [
      {
        question: "After repeated bronchodilator treatments, a patient has less wheeze but remains tachypneic and now has very poor air entry. What is the best interpretation?",
        options: ["The asthma is resolving", "The patient may have critically reduced airflow", "The patient is developing fluid overload", "The bronchodilator should be stopped because wheeze is absent"],
        correct: 1,
        rationale: "Wheeze requires airflow. Less wheeze with poor air entry and ongoing distress can indicate worsening obstruction and requires urgent escalation."
      },
      {
        question: "Which change most strongly suggests respiratory muscle fatigue during a severe asthma attack?",
        options: ["PaCO2 rising toward or above normal despite ongoing distress", "Mild tachycardia after salbutamol", "Productive cough", "Improving peak flow"],
        correct: 0,
        rationale: "Early acute asthma commonly causes hypocapnia from hyperventilation. A rising PaCO2 with persistent distress is a warning of inadequate ventilation and fatigue."
      }
    ],
    postTest: [
      {
        question: "What should the nurse verify before discharge after an asthma exacerbation?",
        options: ["Only that wheeze is absent", "Correct inhaler technique and understanding of controller versus reliever therapy", "That the patient avoids all exercise", "That antibiotics were prescribed"],
        correct: 1,
        rationale: "Technique, controller adherence, relapse prevention, and a clear action/follow-up plan reduce future exacerbation risk."
      }
    ]
  },

  "copd-exacerbation-rpn-ca": {
    title: "COPD Exacerbation: Recognize, Treat, Reassess",
    cellular: {
      title: "Worsening Expiratory Flow Limitation and V/Q Mismatch",
      content: "COPD combines persistent airflow obstruction with variable contributions from small-airway inflammation, mucus hypersecretion, emphysematous loss of elastic recoil, and pulmonary vascular changes. During an exacerbation, inflammation and bronchoconstriction increase, secretions may thicken, expiratory flow falls, and dynamic hyperinflation worsens. The result is greater ventilation-perfusion mismatch, increased work of breathing, and sometimes acute-on-chronic hypercapnic respiratory failure. Oxygen should be titrated to the patient's clinical target; the major teaching point is not to withhold oxygen from a hypoxemic patient. Excess oxygen can worsen hypercapnia in susceptible patients mainly through worsened V/Q matching and the Haldane effect, so the response is controlled oxygen and reassessment rather than allowing hypoxemia."
    },
    riskFactors: [
      "Respiratory viral or bacterial infection",
      "Continued tobacco exposure",
      "Poor inhaler adherence or technique",
      "Advanced airflow limitation or previous hospitalization",
      "Heart failure, pulmonary hypertension, or other cardiopulmonary comorbidity",
      "Sedating medications that suppress ventilation",
      "Inadequate vaccination or pulmonary rehabilitation participation"
    ],
    diagnostics: [
      "Compare respiratory status with the patient's baseline rather than assuming chronic dyspnea is unchanged",
      "Pulse oximetry with controlled oxygen titration; obtain blood gas when hypercapnia or acidosis is suspected",
      "Chest radiograph when pneumonia, pneumothorax, edema, or another diagnosis is possible",
      "ECG and cardiac assessment when chest pain, arrhythmia, or heart failure may be contributing",
      "CBC and chemistry as ordered, including potassium when frequent beta2-agonists are used",
      "Assess sputum change, fever, and infectious symptoms without assuming coloured sputum alone proves bacterial infection"
    ],
    management: [
      "Position upright and titrate oxygen to the ordered target; 88-92% is commonly used when the patient is at risk of hypercapnic respiratory failure",
      "Administer short-acting bronchodilators as ordered, commonly salbutamol with or without ipratropium",
      "Administer systemic corticosteroid as ordered for a clinically significant exacerbation",
      "Administer antibiotics when the clinical picture supports bacterial exacerbation according to the prescriber's plan",
      "Support secretion clearance with hydration, mobilization, and airway-clearance strategies appropriate to the patient",
      "Prepare for non-invasive ventilation when acute hypercapnic respiratory failure with acidosis and increased work of breathing persists despite initial therapy"
    ],
    nursingActions: [
      "Document baseline and post-treatment respiratory rate, air entry, SpO2, mental status, and work of breathing",
      "Watch for headache, confusion, somnolence, tremor, or asterixis when CO2 retention is suspected",
      "Do not abruptly remove oxygen from a hypoxemic patient because of fear of CO2 retention; titrate and escalate for blood-gas assessment",
      "Encourage pursed-lip breathing and paced activity when the patient can participate",
      "Monitor for steroid-related hyperglycemia and bronchodilator-related tachycardia or hypokalemia",
      "Escalate for worsening acidosis, exhaustion, reduced consciousness, hemodynamic instability, or inability to protect the airway"
    ],
    signs: {
      left: [
        "Increased cough or sputum from baseline",
        "More dyspnea with preserved alertness",
        "Wheeze or reduced breath sounds",
        "Improvement after controlled oxygen and bronchodilator therapy"
      ],
      right: [
        "New confusion or drowsiness",
        "Severe accessory-muscle use or exhaustion",
        "Worsening respiratory acidosis",
        "Persistent hypoxemia despite controlled oxygen",
        "Hemodynamic instability or inability to protect the airway"
      ]
    },
    medications: [
      {
        name: "Salbutamol",
        type: "Short-Acting Beta2-Agonist",
        action: "Relaxes bronchial smooth muscle and improves expiratory airflow.",
        sideEffects: "Tremor, tachycardia, palpitations, transient hypokalemia.",
        contra: "Use cautiously in significant tachyarrhythmia.",
        pearl: "Repeated dosing requires reassessment of heart rate, symptoms, air entry, and potassium risk."
      },
      {
        name: "Ipratropium",
        type: "Short-Acting Muscarinic Antagonist",
        action: "Reduces cholinergic bronchoconstriction and improves airflow when added to acute bronchodilator therapy.",
        sideEffects: "Dry mouth, throat irritation, blurred vision with ocular exposure.",
        contra: "Hypersensitivity to formulation components.",
        pearl: "Useful alongside a short-acting beta2-agonist during acute exacerbation."
      },
      {
        name: "Prednisone",
        type: "Systemic Corticosteroid",
        action: "Reduces airway inflammation and shortens recovery from a moderate-to-severe COPD exacerbation.",
        sideEffects: "Hyperglycemia, insomnia, mood change, dyspepsia, fluid retention.",
        contra: "Relative caution with uncontrolled infection; assess risk-benefit for short-course use.",
        pearl: "Monitor glucose and mental status, especially in older adults and people with diabetes."
      }
    ],
    pearls: [
      "The old 'hypoxic drive' explanation is oversimplified. Oxygen-induced hypercapnia is mainly related to V/Q effects and the Haldane effect.",
      "Treat hypoxemia with controlled oxygen and reassess; do not leave a patient hypoxemic out of fear of CO2 retention.",
      "A change in mental status can be the first obvious sign of worsening hypercapnia."
    ],
    preTest: [
      {
        question: "A patient with COPD is hypoxemic and at risk for chronic CO2 retention. What is the safest nursing approach?",
        options: ["Withhold oxygen", "Give controlled oxygen to the ordered target and reassess", "Use the highest-flow device available without reassessment", "Encourage breath holding"],
        correct: 1,
        rationale: "Hypoxemia must be treated. Controlled oxygen with reassessment balances oxygenation with the risk of worsening hypercapnia."
      }
    ],
    quiz: [
      {
        question: "Which finding most strongly supports escalation for possible non-invasive ventilation?",
        options: ["Mild chronic cough", "Acute hypercapnic respiratory acidosis with increased work of breathing", "Stable SpO2 on baseline oxygen", "Normal mental status and improving dyspnea"],
        correct: 1,
        rationale: "Persistent acute hypercapnic respiratory failure with acidosis and increased work of breathing is a classic indication to consider non-invasive ventilation."
      }
    ],
    postTest: [
      {
        question: "Why can excessive oxygen worsen CO2 retention in susceptible COPD patients?",
        options: ["It always stops respiratory drive completely", "Primarily through worsened V/Q matching and the Haldane effect", "It causes pulmonary embolism", "It blocks beta2 receptors"],
        correct: 1,
        rationale: "The 'hypoxic drive' explanation is incomplete. Worsened V/Q matching and the Haldane effect are major mechanisms of oxygen-induced hypercapnia."
      }
    ]
  },

  "community-acquired-pneumonia-rpn-ca": {
    title: "Community-Acquired Pneumonia",
    cellular: {
      title: "Alveolar Infection, Inflammation, and Impaired Gas Exchange",
      content: "Community-acquired pneumonia develops when lower-respiratory defence mechanisms are overwhelmed and organisms reach the distal airways and alveoli. Alveolar macrophages trigger a cytokine response that recruits neutrophils. Protein-rich inflammatory fluid and cellular debris fill affected alveoli, producing consolidation and reducing ventilation to perfused lung units. This creates low V/Q regions and can cause hypoxemia. The nursing flow should move from severity and oxygenation assessment to cultures or imaging when ordered, timely antimicrobials, hydration and mobilization, secretion management, and surveillance for sepsis or respiratory failure."
    },
    riskFactors: [
      "Older age or frailty",
      "COPD, asthma, heart disease, diabetes, or chronic kidney disease",
      "Smoking or vaping",
      "Dysphagia or aspiration risk",
      "Recent viral respiratory infection",
      "Immunocompromised state",
      "Residence in congregate settings or recent healthcare exposure"
    ],
    diagnostics: [
      "Assess oxygen saturation, respiratory rate, blood pressure, temperature, mental status, and hydration",
      "Chest radiograph when pneumonia is suspected and imaging is clinically indicated",
      "CBC and chemistry as ordered; monitor renal function because illness and treatment may alter medication dosing",
      "Blood cultures before antibiotics when ordered for severe illness, without creating unnecessary treatment delay",
      "Sputum culture when severe disease, resistant pathogen risk, or treatment failure makes the result likely to change care",
      "Screen for sepsis when there is hypotension, altered mental status, elevated lactate, poor perfusion, or organ dysfunction"
    ],
    management: [
      "Administer oxygen when hypoxemic and reassess response",
      "Give prescribed antimicrobials on time and monitor for allergy or intolerance",
      "Promote oral fluids when safe or IV fluids when ordered, while avoiding fluid overload in susceptible patients",
      "Mobilize as tolerated and encourage coughing, deep breathing, and secretion clearance",
      "Provide antipyretic and analgesic therapy as ordered so pain and fever do not prevent ventilation and mobility",
      "Escalate for hemodynamic instability, rising oxygen requirement, severe work of breathing, or new confusion"
    ],
    nursingActions: [
      "Trend oxygen need, not only the saturation number",
      "Assess swallowing safety when aspiration is possible",
      "Monitor intake, urine output, and renal function where clinically relevant",
      "Reassess temperature, respiratory status, and perfusion after antimicrobial and supportive treatment",
      "Use infection-prevention precautions appropriate to the suspected pathogen",
      "Teach completion of the prescribed antimicrobial course and when to return for worsening breathlessness or confusion"
    ],
    signs: {
      left: [
        "Fever or chills",
        "Cough with or without sputum",
        "Localized crackles or bronchial breath sounds",
        "Pleuritic discomfort",
        "Mild oxygen requirement that improves with treatment"
      ],
      right: [
        "New confusion or reduced level of consciousness",
        "Hypotension or poor peripheral perfusion",
        "Rapidly increasing oxygen requirement",
        "Severe tachypnea or respiratory fatigue",
        "Oliguria or other evidence of organ dysfunction"
      ]
    },
    medications: [
      {
        name: "Antimicrobial therapy",
        type: "Pathogen-Directed Anti-Infective Therapy",
        action: "Treats the bacterial pathogen when bacterial community-acquired pneumonia is present or strongly suspected.",
        sideEffects: "Depend on agent; commonly GI upset, allergy, C. difficile infection, QT prolongation, or renal effects.",
        contra: "Depends on selected drug, allergy history, renal function, interactions, pregnancy status, and local resistance patterns.",
        pearl: "Do not memorize one regimen as universal. Selection depends on illness severity, comorbidity, allergy history, local guidance, and resistance risk."
      },
      {
        name: "Acetaminophen",
        type: "Analgesic / Antipyretic",
        action: "Reduces fever and pain that may otherwise limit deep breathing and mobility.",
        sideEffects: "Hepatotoxicity with excessive total daily dosing.",
        contra: "Severe active liver disease or significant hypersensitivity.",
        pearl: "Check combination products so the total daily acetaminophen dose is not unintentionally exceeded."
      }
    ],
    pearls: [
      "Pneumonia can present with confusion and functional decline rather than high fever in older adults.",
      "A rising oxygen requirement is a deterioration signal even when the current SpO2 still looks acceptable.",
      "Cultures should support targeted therapy when indicated, but they should not create harmful delays in treating severe infection."
    ],
    quiz: [
      {
        question: "Which change most clearly suggests that a patient with pneumonia is deteriorating?",
        options: ["Temperature falls from 38.2 C to 37.8 C", "Oxygen requirement rises from 2 L/min to 6 L/min to maintain the same saturation", "Cough remains productive", "Appetite remains reduced"],
        correct: 1,
        rationale: "A rapidly rising oxygen requirement signals worsening gas exchange even if the displayed saturation is temporarily maintained."
      }
    ]
  },

  "pleural-effusion-chest-drain-rpn-ca": {
    title: "Pleural Effusion and Chest Drain Safety",
    cellular: {
      title: "Pleural Fluid Accumulation and Lung Compression",
      content: "Pleural effusion occurs when fluid accumulates between the visceral and parietal pleura because pleural fluid formation exceeds lymphatic removal. Transudates are usually driven by systemic hydrostatic or oncotic pressure changes, while exudates result from local inflammation, infection, malignancy, or pleural injury. As fluid volume increases, the adjacent lung is compressed, reducing ventilation and causing dyspnea. Thoracentesis can relieve symptoms and clarify the cause. When a chest drainage system is used, the nursing priority is maintaining a closed, patent system below chest level while recognizing air leak, obstruction, accidental disconnection, or tension physiology."
    },
    riskFactors: [
      "Heart failure",
      "Pneumonia or empyema",
      "Malignancy",
      "Pulmonary embolism",
      "Liver or renal disease causing transudative fluid accumulation",
      "Thoracic surgery or trauma",
      "Tuberculosis or other pleural infection"
    ],
    diagnostics: [
      "Assess dyspnea, respiratory rate, oxygen saturation, chest symmetry, and breath sounds",
      "Chest imaging to estimate effusion size and guide intervention",
      "Thoracentesis fluid analysis when the cause is uncertain or infection/malignancy is suspected",
      "Compare pleural fluid and serum protein/LDH when Light's criteria are used to classify an exudate",
      "Monitor after thoracentesis for new pleuritic pain, dyspnea, hypoxemia, or unilateral reduced breath sounds suggesting pneumothorax",
      "For chest drains, assess tubing, drainage, water-seal behaviour, insertion site, and patient respiratory status as one system"
    ],
    management: [
      "Position upright for breathing comfort unless contraindicated",
      "Administer oxygen if hypoxemic",
      "Prepare and support the patient for thoracentesis when ordered",
      "Keep the drainage system below chest level and upright",
      "Avoid dependent loops, kinks, routine stripping, or clamping unless a specific clinical indication and order/protocol exists",
      "Escalate for sudden dyspnea, tracheal deviation, severe chest pain, rapidly worsening hypoxemia, or signs of tension pneumothorax"
    ],
    nursingActions: [
      "Mark and trend drainage according to local policy and report sudden unexpected increases or cessation with clinical deterioration",
      "Check for loose connections or system disruption when bubbling patterns change unexpectedly",
      "Do not interpret continuous bubbling in the water seal in isolation; assess the patient and entire system for an air leak",
      "Maintain an occlusive dressing and assess the insertion site for bleeding, infection, or subcutaneous emphysema",
      "Keep emergency supplies required by local policy available at the bedside",
      "If the tube is accidentally removed from the patient, immediately follow local emergency protocol and obtain urgent assistance"
    ],
    signs: {
      left: [
        "Dyspnea proportional to effusion size and reserve",
        "Reduced breath sounds over fluid",
        "Dullness to percussion",
        "Improved breathing after successful drainage"
      ],
      right: [
        "Sudden severe dyspnea after thoracentesis",
        "Rapid oxygen desaturation",
        "Tracheal deviation or hemodynamic compromise",
        "New extensive subcutaneous emphysema",
        "Chest drain dislodgement or uncontrolled system disruption"
      ]
    },
    medications: [],
    pearls: [
      "Never make the drainage device the only focus; the patient comes first when a chest-drain problem is suspected.",
      "Routine stripping or milking can create harmful pressure and should not be performed without a specific indication and local protocol.",
      "Sudden deterioration after thoracentesis raises concern for pneumothorax, bleeding, or re-expansion complications and requires immediate reassessment."
    ],
    quiz: [
      {
        question: "A patient with a chest drain suddenly becomes severely dyspneic and hypoxemic. What is the first nursing priority?",
        options: ["Document the drainage amount", "Assess the patient and immediately check the drainage system for disconnection, obstruction, or other acute complication", "Clamp the tube routinely", "Strip the tube vigorously"],
        correct: 1,
        rationale: "Acute deterioration requires immediate patient assessment while rapidly checking the system for a reversible life-threatening problem. Routine clamping or stripping can worsen risk."
      }
    ]
  }
};
