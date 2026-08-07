import type { LessonContent } from "./types";

/**
 * Additive RN respiratory hardening bank.
 * Intended for RN pathway mapping by locale/exam without deleting legacy respiratory content.
 */
export const respiratoryRnExamHardeningLessons: Record<string, LessonContent> = {
  "ards-rn": {
    title: "Acute Respiratory Distress Syndrome",
    cellular: {
      title: "Diffuse Alveolar-Capillary Injury",
      content: "ARDS is a non-cardiogenic inflammatory lung injury that can follow sepsis, severe pneumonia, aspiration, pancreatitis, trauma, or transfusion. Injury to alveolar epithelium and pulmonary capillary endothelium increases permeability, allowing protein-rich fluid to enter alveoli. Surfactant dysfunction and alveolar collapse reduce lung compliance and create intrapulmonary shunt, so hypoxemia may remain severe even as inspired oxygen is increased. The lesson flow is cause recognition, severity and oxygenation assessment, lung-protective support, fluid/hemodynamic management, prevention of complications, and repeated reassessment for multi-organ dysfunction."
    },
    riskFactors: ["Sepsis", "Severe pneumonia", "Aspiration", "Major trauma or shock", "Pancreatitis", "Massive transfusion", "Inhalational injury"],
    diagnostics: ["Trend oxygen requirement together with SpO2", "ABG for oxygenation, ventilation, and acid-base assessment", "Chest imaging showing bilateral opacities", "Evaluate for cardiogenic pulmonary edema when uncertain", "Monitor lactate, renal function, hemodynamics, and organ dysfunction", "Assess ventilator pressures and synchrony when mechanically ventilated"],
    management: ["Treat the precipitating cause", "Use lung-protective ventilation with low tidal volumes based on predicted body weight when ventilated", "Use PEEP to support alveolar recruitment while monitoring hemodynamics", "Consider prone positioning for severe hypoxemia when appropriate", "Use conservative fluid management after shock is adequately resuscitated", "Prevent VTE, pressure injury, delirium, and ventilator-associated complications"],
    nursingActions: ["Escalate for increasing oxygen need, fatigue, altered consciousness, or worsening gas exchange", "Trend FiO2/device intensity rather than reading SpO2 alone", "Assess for tube displacement, secretions, pneumothorax, or equipment problems when deterioration is sudden", "Protect eyes, pressure points, tubes, and lines during proning", "Monitor perfusion and urine output", "Coordinate sedation to defined goals rather than unnecessary deep sedation"],
    signs: { left: ["Tachypnea", "Increasing oxygen requirement", "Diffuse crackles", "Reduced compliance"], right: ["Refractory hypoxemia", "Exhaustion", "Worsening acidosis", "Hemodynamic instability", "Multi-organ dysfunction"] },
    medications: [{ name: "Cause-directed antimicrobial therapy", type: "Anti-Infective Therapy", action: "Treats bacterial pneumonia or sepsis when present.", sideEffects: "Agent-specific allergy, renal/hepatic effects, GI effects, QT effects, and C. difficile risk.", contra: "Agent-specific.", pearl: "Obtain appropriate cultures when indicated without delaying urgent treatment of severe infection." }],
    pearls: ["ARDS is a permeability injury, not simply fluid overload.", "A stable SpO2 on rapidly increasing FiO2 still represents deterioration.", "Low tidal volume ventilation is based on predicted rather than actual body weight."],
    preTest: [{ question: "Why can hypoxemia be difficult to correct in ARDS?", options: ["Intrapulmonary shunt through poorly aerated alveoli", "Excess hemoglobin", "Upper-airway narrowing only", "Reduced kidney function"], correct: 0, rationale: "Flooded and collapsed alveoli may remain perfused despite poor ventilation, creating shunt physiology." }],
    quiz: [{ question: "Which change most strongly signals worsening gas exchange?", options: ["FiO2 rises from 0.40 to 0.80 to maintain the same SpO2", "Temperature falls slightly", "Heart rate improves", "Urine output is stable"], correct: 0, rationale: "Needing substantially more inspired oxygen to maintain the same saturation shows worsening pulmonary reserve." }],
    postTest: [{ question: "Which ventilation principle reduces ventilator-induced lung injury in ARDS?", options: ["Large tidal volumes", "Low tidal volumes based on predicted body weight", "No PEEP", "Routine hyperventilation"], correct: 1, rationale: "Lung-protective ventilation reduces volutrauma and barotrauma." }]
  },

  "pulmonary-embolism-rn": {
    title: "Pulmonary Embolism: Recognition and Escalation",
    cellular: {
      title: "Pulmonary Vascular Obstruction and Right-Heart Strain",
      content: "Pulmonary embolism usually occurs when venous thrombus embolizes to the pulmonary arterial circulation. Obstruction increases pulmonary vascular resistance and creates ventilated but underperfused lung units, producing dead space and V/Q mismatch. Large emboli can acutely overload the right ventricle, reduce left ventricular filling, and progress to obstructive shock. RN priorities are rapid recognition, oxygenation and perfusion support, diagnostic preparation, anticoagulation safety, and immediate escalation for right-heart failure or shock."
    },
    riskFactors: ["Recent surgery or trauma", "Immobility", "Active cancer", "Previous VTE", "Pregnancy/postpartum", "Estrogen therapy", "Thrombophilia"],
    diagnostics: ["Assess sudden dyspnea, pleuritic pain, syncope, hemoptysis, leg symptoms, and VTE risks", "Continuous SpO2 and cardiac monitoring for significant presentations", "CT pulmonary angiography when appropriate", "D-dimer only when pretest probability makes it useful", "Troponin/BNP and echocardiography for right-heart strain/risk stratification", "Trend blood pressure, mental status, lactate, and oxygen requirement for instability"],
    management: ["Stabilize airway, breathing, and circulation", "Administer oxygen for hypoxemia", "Administer anticoagulation as ordered when benefits exceed bleeding risk", "Prepare for reperfusion therapy or advanced intervention in high-risk PE with shock", "Monitor closely for bleeding after anticoagulation or thrombolysis", "Use VTE prevention in at-risk hospitalized patients"],
    nursingActions: ["Escalate immediately for hypotension, syncope, confusion, rapidly rising oxygen need, or shock", "Verify anticoagulant dose, renal function, weight when relevant, and interactions", "Monitor CBC and clinical signs of bleeding", "Avoid unnecessary invasive procedures after thrombolysis", "Do not massage a limb with suspected DVT", "Teach anticoagulant adherence and bleeding precautions"],
    signs: { left: ["Sudden dyspnea", "Pleuritic chest pain", "Tachycardia", "Mild hypoxemia"], right: ["Hypotension", "Syncope with instability", "Severe hypoxemia", "Right ventricular failure", "Cardiac arrest"] },
    medications: [{ name: "Anticoagulant therapy", type: "Antithrombotic Therapy", action: "Prevents clot propagation and recurrent thrombosis while endogenous fibrinolysis resolves thrombus.", sideEffects: "Bleeding and agent-specific thrombocytopenia or renal dosing concerns.", contra: "Active major bleeding or agent-specific contraindications.", pearl: "Anticoagulants prevent extension and recurrence; they do not instantly dissolve the existing embolus." }],
    pearls: ["A normal chest x-ray does not exclude PE.", "D-dimer is a rule-out tool in appropriately selected patients, not a stand-alone diagnosis.", "Hypotension in PE suggests right ventricular failure and obstructive shock."],
    quiz: [{ question: "A patient with PE becomes hypotensive and confused. What is the priority interpretation?", options: ["Expected anxiety", "Possible obstructive shock from acute right ventricular failure", "Mild medication effect", "Stable pleuritic pain"], correct: 1, rationale: "Hypotension and altered mental status indicate impaired perfusion and possible high-risk PE." }]
  },

  "tension-pneumothorax-rn": {
    title: "Pneumothorax and Tension Physiology",
    cellular: { title: "Loss of Pleural Vacuum and Obstructive Shock", content: "Air in the pleural space breaks the negative pressure that keeps the lung expanded. In tension pneumothorax, a one-way-valve effect progressively raises intrathoracic pressure, compresses the affected lung, shifts mediastinal structures, reduces venous return, and can cause obstructive shock. In an unstable patient with convincing tension physiology, emergency decompression should not wait for routine imaging. Flow: recognize, support oxygenation/perfusion, escalate, prepare for decompression/chest drainage, then reassess the patient and drainage system." },
    riskFactors: ["Chest trauma", "Positive-pressure ventilation", "Central venous access", "COPD/bullous disease", "Thoracic procedure", "Previous pneumothorax"],
    diagnostics: ["Assess sudden dyspnea, unilateral breath sounds, chest pain, SpO2, blood pressure, and mental status", "Bedside ultrasound can rapidly support diagnosis", "Chest radiograph in stable patients", "Do not delay emergency decompression for imaging in unstable tension physiology", "Reassess after chest tube insertion"],
    management: ["Administer oxygen for hypoxemia", "Activate emergency response for suspected tension pneumothorax", "Prepare for immediate decompression", "Prepare for chest tube placement", "Keep drainage system below chest level and closed", "Provide adequate analgesia after life-threatening physiology is addressed"],
    nursingActions: ["Suspect tension pneumothorax with sudden hypoxemia/hypotension on positive-pressure ventilation", "Assess the patient before focusing on the device", "Check tubing for disconnection, kink, dependent loop, or obstruction", "Avoid routine clamping with an ongoing air leak", "Monitor insertion site and subcutaneous emphysema", "Escalate for recurrent sudden dyspnea or hypotension"],
    signs: { left: ["Unilateral chest pain", "Reduced breath sounds", "Dyspnea", "Tachycardia"], right: ["Hypotension", "Severe distress", "Rapid hypoxemia", "Late tracheal deviation", "Peri-arrest deterioration"] },
    medications: [],
    pearls: ["Tension pneumothorax is a clinical emergency.", "Positive-pressure ventilation can make deterioration very rapid.", "Do not wait for tracheal deviation; it is a late and inconsistent sign."],
    quiz: [{ question: "A ventilated patient suddenly becomes hypoxemic and hypotensive with absent right breath sounds. What should be suspected first?", options: ["Stable effusion", "Tension pneumothorax", "Mild atelectasis", "Chronic bronchitis"], correct: 1, rationale: "Sudden respiratory and hemodynamic collapse with unilateral absent breath sounds during positive-pressure ventilation is classic tension physiology." }]
  }
};
