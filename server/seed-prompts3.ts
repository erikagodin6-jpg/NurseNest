import crypto from "crypto";
import { pool } from "./storage";

const DIFFICULTY_MAP: Record<string, number> = { easy: 2, medium: 3, moderate: 3, hard: 4 };
const ANSWER_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };

function stemHash(text: string): string {
  const normalized = text.trim().toLowerCase().replace(/\s+/g, " ");
  return crypto.createHash("md5").update(normalized).digest("hex");
}

const bowtieQuestions: any[] = [
  {
    question_type: "bowtie",
    scenario: "A postpartum client is saturating a perineal pad every 15 minutes and reports dizziness. The fundus feels boggy on assessment.",
    condition_options: ["Postpartum hemorrhage","Mastitis","Normal lochia","Urinary retention"],
    action_options: ["Massage the fundus and call for immediate help","Encourage the client to ambulate","Offer a high-fiber snack","Delay reassessment for 1 hour"],
    monitor_options: ["Blood pressure","Bowel sounds","Hair texture","Visual acuity"],
    correct_condition: "Postpartum hemorrhage",
    correct_action: "Massage the fundus and call for immediate help",
    correct_monitor: "Blood pressure",
    rationale: "Heavy bleeding with dizziness and a boggy fundus indicates postpartum hemorrhage, often caused by uterine atony. Fundal massage and rapid escalation are priority actions. Blood pressure is critical to monitor because significant blood loss can quickly lead to shock.",
    category: "Maternal", difficulty: "moderate", exam: "NCLEX-PN", country: "US",
    client_needs: "Physiological Integrity", topic: "Postpartum hemorrhage"
  },
  {
    question_type: "bowtie",
    scenario: "A pregnant client at 34 weeks reports a severe headache, blurred vision, and epigastric pain. Blood pressure is 168/104 mm Hg.",
    condition_options: ["Severe preeclampsia","Hyperemesis gravidarum","Normal discomfort of pregnancy","Urinary tract infection"],
    action_options: ["Notify the provider immediately and reduce environmental stimulation","Encourage the client to walk","Offer a large meal","Delay reporting until the next prenatal visit"],
    monitor_options: ["Blood pressure","Bowel frequency","Hair growth","Urine color"],
    correct_condition: "Severe preeclampsia",
    correct_action: "Notify the provider immediately and reduce environmental stimulation",
    correct_monitor: "Blood pressure",
    rationale: "Severe headache, visual changes, epigastric pain, and severe hypertension suggest severe preeclampsia. Immediate reporting is necessary because seizures and stroke may occur. Blood pressure is the most important parameter to monitor closely.",
    category: "Maternal", difficulty: "hard", exam: "NCLEX-PN", country: "US",
    client_needs: "Physiological Integrity", topic: "Severe preeclampsia"
  },
  {
    question_type: "bowtie",
    scenario: "A newborn has a respiratory rate of 72/min, nasal flaring, and intercostal retractions shortly after birth.",
    condition_options: ["Newborn respiratory distress","Normal newborn transition","Neonatal hypoglycemia","Mild jaundice"],
    action_options: ["Assess oxygenation and notify the provider","Feed the newborn immediately and leave","Place the newborn prone and unattended","Delay assessment for 1 hour"],
    monitor_options: ["Respiratory effort","Bowel sounds","Hair texture","Abdominal girth"],
    correct_condition: "Newborn respiratory distress",
    correct_action: "Assess oxygenation and notify the provider",
    correct_monitor: "Respiratory effort",
    rationale: "A respiratory rate over 60/min with nasal flaring and retractions indicates respiratory distress in the newborn. Immediate assessment and escalation are needed. Respiratory effort is the most relevant parameter to monitor because worsening distress can progress rapidly.",
    category: "Pediatrics", difficulty: "moderate", exam: "NCLEX-PN", country: "US",
    client_needs: "Physiological Integrity", topic: "Newborn respiratory distress"
  },
  {
    question_type: "bowtie",
    scenario: "A toddler has a barking cough, inspiratory stridor at rest, and suprasternal retractions.",
    condition_options: ["Moderate to severe croup","Asthma exacerbation","Gastroenteritis","Heart failure"],
    action_options: ["Keep the child calm and notify the provider promptly","Inspect the throat forcefully with a tongue blade","Encourage crying to improve airflow","Offer solid food immediately"],
    monitor_options: ["Work of breathing","Hair growth","Bowel pattern","Urine odor"],
    correct_condition: "Moderate to severe croup",
    correct_action: "Keep the child calm and notify the provider promptly",
    correct_monitor: "Work of breathing",
    rationale: "Barking cough, stridor at rest, and retractions suggest croup with significant upper airway narrowing. Keeping the child calm helps reduce airway obstruction. Work of breathing is the key parameter to monitor for deterioration.",
    category: "Pediatrics", difficulty: "moderate", exam: "NCLEX-PN", country: "US",
    client_needs: "Physiological Integrity", topic: "Croup"
  },
  {
    question_type: "bowtie",
    scenario: "A school-age child with type 1 diabetes is pale, shaky, and irritable before lunch. Blood glucose is 54 mg/dL.",
    condition_options: ["Hypoglycemia","Diabetic ketoacidosis","Hyperglycemia","Appendicitis"],
    action_options: ["Give a fast-acting carbohydrate","Administer more insulin","Encourage vigorous exercise","Restrict oral intake"],
    monitor_options: ["Blood glucose","Bowel sounds","Hair texture","Visual acuity"],
    correct_condition: "Hypoglycemia",
    correct_action: "Give a fast-acting carbohydrate",
    correct_monitor: "Blood glucose",
    rationale: "The symptoms and low glucose reading indicate hypoglycemia. Fast-acting carbohydrate is the appropriate first treatment if the child can swallow safely. Blood glucose should then be rechecked to confirm improvement.",
    category: "Pediatrics", difficulty: "moderate", exam: "NCLEX-PN", country: "US",
    client_needs: "Physiological Integrity", topic: "Pediatric hypoglycemia"
  },
  {
    question_type: "bowtie",
    scenario: "An adolescent states, 'I do not want to live anymore,' and appears tearful and withdrawn.",
    condition_options: ["Suicide risk","Expected mood variation","Oppositional behavior only","Mild anxiety"],
    action_options: ["Stay with the client and notify the charge nurse or provider immediately","Leave the client alone to rest","Tell the client not to talk like that","Offer a sedative without further assessment"],
    monitor_options: ["Safety status","Bowel sounds","Hair texture","Urine color"],
    correct_condition: "Suicide risk",
    correct_action: "Stay with the client and notify the charge nurse or provider immediately",
    correct_monitor: "Safety status",
    rationale: "A direct statement about wanting to die must be treated as suicide risk. The priority is immediate safety, continuous observation as indicated, and urgent escalation. Safety status is the most important thing to monitor.",
    category: "Mental Health", difficulty: "hard", exam: "NCLEX-PN", country: "US",
    client_needs: "Psychosocial Integrity", topic: "Suicide precautions"
  },
  {
    question_type: "bowtie",
    scenario: "A client on a mental health unit is pacing, shouting, clenching fists, and threatening another client.",
    condition_options: ["Escalating aggression","Mild anxiety","Normal coping","Postpartum blues"],
    action_options: ["Use calm de-escalation and obtain assistance immediately","Argue firmly with the client","Turn your back and walk away","Encourage the client to confront peers directly"],
    monitor_options: ["Risk of violence","Hair growth","Bowel frequency","Visual acuity"],
    correct_condition: "Escalating aggression",
    correct_action: "Use calm de-escalation and obtain assistance immediately",
    correct_monitor: "Risk of violence",
    rationale: "Pacing, threats, clenched fists, and shouting suggest escalating aggression. De-escalation and staff support are priority actions to maintain safety. Risk of violence is the key concern to monitor continuously.",
    category: "Mental Health", difficulty: "moderate", exam: "NCLEX-PN", country: "US",
    client_needs: "Psychosocial Integrity", topic: "Aggression de-escalation"
  },
  {
    question_type: "bowtie",
    scenario: "A postpartum client reports sadness, poor sleep, inability to bond with the newborn, and thoughts of harming herself.",
    condition_options: ["Postpartum depression with safety risk","Expected postpartum blues only","Normal maternal adjustment","Urinary tract infection"],
    action_options: ["Stay with the client and notify the provider immediately","Reassure the client this is normal and leave","Encourage the client to handle infant care alone","Delay reporting until discharge teaching"],
    monitor_options: ["Suicide risk","Hair distribution","Bowel sounds","Fundal height"],
    correct_condition: "Postpartum depression with safety risk",
    correct_action: "Stay with the client and notify the provider immediately",
    correct_monitor: "Suicide risk",
    rationale: "Inability to bond combined with self-harm thoughts suggests postpartum depression with immediate safety concerns. The client should not be left alone and the provider must be notified urgently. Suicide risk is the key parameter to monitor.",
    category: "Maternal", difficulty: "hard", exam: "NCLEX-PN", country: "US",
    client_needs: "Psychosocial Integrity", topic: "Postpartum depression"
  },
  {
    question_type: "bowtie",
    scenario: "A child with fever, drooling, muffled voice, and difficulty swallowing is sitting forward and appears anxious.",
    condition_options: ["Epiglottitis","Gastroenteritis","Mild croup","Otitis media"],
    action_options: ["Keep the child calm and notify the provider immediately","Inspect the throat aggressively with a tongue blade","Force oral fluids","Place the child flat in bed"],
    monitor_options: ["Airway patency","Hair texture","Bowel pattern","Urine concentration"],
    correct_condition: "Epiglottitis",
    correct_action: "Keep the child calm and notify the provider immediately",
    correct_monitor: "Airway patency",
    rationale: "Drooling, muffled voice, dysphagia, and tripod positioning suggest epiglottitis, a life-threatening airway emergency. Agitating the child may worsen obstruction. Airway patency is the critical parameter to monitor.",
    category: "Pediatrics", difficulty: "hard", exam: "NCLEX-PN", country: "US",
    client_needs: "Physiological Integrity", topic: "Epiglottitis"
  },
  {
    question_type: "bowtie",
    scenario: "A laboring client has sudden constant abdominal pain, vaginal bleeding, and fetal heart rate abnormalities after previously regular contractions.",
    condition_options: ["Placental abruption","Normal labor progression","Urinary retention","Mastitis"],
    action_options: ["Notify the provider immediately and prepare for emergency intervention","Encourage ambulation","Offer food and fluids","Delay action until the next cervical exam"],
    monitor_options: ["Fetal heart rate","Bowel sounds","Hair pattern","Visual acuity"],
    correct_condition: "Placental abruption",
    correct_action: "Notify the provider immediately and prepare for emergency intervention",
    correct_monitor: "Fetal heart rate",
    rationale: "Sudden abdominal pain, bleeding, and fetal heart rate changes are concerning for placental abruption. This is an obstetric emergency requiring rapid escalation. Fetal heart rate is a critical parameter to monitor because fetal distress can develop quickly.",
    category: "Maternal", difficulty: "hard", exam: "NCLEX-PN", country: "US",
    client_needs: "Physiological Integrity", topic: "Placental abruption"
  },
  {
    question_type: "bowtie",
    scenario: "A postpartum client is saturating a perineal pad every 15 minutes and reports dizziness. The uterus feels boggy.",
    condition_options: ["Postpartum hemorrhage","Mastitis","Normal lochia","Urinary retention"],
    action_options: ["Massage the fundus and call for immediate help","Encourage walking","Offer a high-fibre snack","Delay reassessment for 1 hour"],
    monitor_options: ["Blood pressure","Bowel sounds","Hair texture","Visual acuity"],
    correct_condition: "Postpartum hemorrhage",
    correct_action: "Massage the fundus and call for immediate help",
    correct_monitor: "Blood pressure",
    rationale: "Heavy bleeding with dizziness and a boggy uterus indicates postpartum hemorrhage likely related to uterine atony. Fundal massage and rapid escalation are priorities. Blood pressure is essential to monitor because shock can occur quickly.",
    category: "Maternal", difficulty: "moderate", exam: "REx-PN", country: "Canada",
    client_needs: "Physiological Integrity", topic: "Postpartum hemorrhage"
  },
  {
    question_type: "bowtie",
    scenario: "A pregnant client at 35 weeks reports severe headache, blurred vision, and epigastric pain. Blood pressure is 170/106 mm Hg.",
    condition_options: ["Severe preeclampsia","Hyperemesis gravidarum","Normal pregnancy discomfort","Urinary tract infection"],
    action_options: ["Notify the prescriber immediately and reduce stimulation","Encourage ambulation","Offer a large meal","Delay reporting until the next prenatal visit"],
    monitor_options: ["Blood pressure","Bowel frequency","Hair growth","Urine colour"],
    correct_condition: "Severe preeclampsia",
    correct_action: "Notify the prescriber immediately and reduce stimulation",
    correct_monitor: "Blood pressure",
    rationale: "Headache, visual changes, epigastric pain, and severe hypertension suggest severe preeclampsia. Immediate reporting is needed to reduce the risk of seizures, stroke, and fetal compromise. Blood pressure is the most important parameter to monitor closely.",
    category: "Maternal", difficulty: "hard", exam: "REx-PN", country: "Canada",
    client_needs: "Physiological Integrity", topic: "Severe preeclampsia"
  },
  {
    question_type: "bowtie",
    scenario: "A newborn has a respiratory rate of 70/min, nasal flaring, and intercostal retractions shortly after birth.",
    condition_options: ["Newborn respiratory distress","Normal newborn transition","Neonatal hypoglycemia","Mild jaundice"],
    action_options: ["Assess oxygenation and notify the prescriber","Feed the newborn immediately and leave","Place the newborn prone and unattended","Delay assessment for 1 hour"],
    monitor_options: ["Respiratory effort","Bowel sounds","Hair texture","Abdominal girth"],
    correct_condition: "Newborn respiratory distress",
    correct_action: "Assess oxygenation and notify the prescriber",
    correct_monitor: "Respiratory effort",
    rationale: "A respiratory rate above 60/min with nasal flaring and retractions is abnormal and indicates respiratory distress. Immediate assessment and escalation are required. Respiratory effort is the most relevant parameter to monitor for worsening distress.",
    category: "Pediatrics", difficulty: "moderate", exam: "REx-PN", country: "Canada",
    client_needs: "Physiological Integrity", topic: "Newborn respiratory distress"
  },
  {
    question_type: "bowtie",
    scenario: "A toddler has a barking cough, inspiratory stridor at rest, and suprasternal retractions.",
    condition_options: ["Moderate to severe croup","Asthma exacerbation","Gastroenteritis","Heart failure"],
    action_options: ["Keep the child calm and notify the prescriber promptly","Inspect the throat aggressively with a tongue blade","Encourage crying","Offer solid food immediately"],
    monitor_options: ["Work of breathing","Hair growth","Bowel pattern","Urine odour"],
    correct_condition: "Moderate to severe croup",
    correct_action: "Keep the child calm and notify the prescriber promptly",
    correct_monitor: "Work of breathing",
    rationale: "Barking cough, stridor at rest, and retractions suggest croup with significant upper airway narrowing. Keeping the child calm reduces agitation and airway obstruction. Work of breathing is the key monitoring focus.",
    category: "Pediatrics", difficulty: "moderate", exam: "REx-PN", country: "Canada",
    client_needs: "Physiological Integrity", topic: "Croup"
  },
  {
    question_type: "bowtie",
    scenario: "A school-age child with type 1 diabetes is pale, shaky, and irritable before lunch. Blood glucose is 3.0 mmol/L.",
    condition_options: ["Hypoglycemia","Diabetic ketoacidosis","Hyperglycemia","Appendicitis"],
    action_options: ["Give a fast-acting carbohydrate","Administer more insulin","Encourage vigorous exercise","Restrict oral intake"],
    monitor_options: ["Blood glucose","Bowel sounds","Hair texture","Visual acuity"],
    correct_condition: "Hypoglycemia",
    correct_action: "Give a fast-acting carbohydrate",
    correct_monitor: "Blood glucose",
    rationale: "The symptoms and glucose result indicate hypoglycemia. If the child can swallow safely, fast-acting carbohydrate is the priority treatment. Blood glucose should then be rechecked to confirm recovery.",
    category: "Pediatrics", difficulty: "moderate", exam: "REx-PN", country: "Canada",
    client_needs: "Physiological Integrity", topic: "Pediatric hypoglycemia"
  },
  {
    question_type: "bowtie",
    scenario: "An adolescent says, 'I do not want to live anymore,' and appears withdrawn and tearful.",
    condition_options: ["Suicide risk","Expected mood variation","Oppositional behaviour only","Mild anxiety"],
    action_options: ["Stay with the client and notify the charge nurse or prescriber immediately","Leave the client alone to rest","Tell the client to stop talking that way","Offer a sedative without further assessment"],
    monitor_options: ["Safety status","Bowel sounds","Hair texture","Urine colour"],
    correct_condition: "Suicide risk",
    correct_action: "Stay with the client and notify the charge nurse or prescriber immediately",
    correct_monitor: "Safety status",
    rationale: "A direct statement about not wanting to live must be taken seriously as suicide risk. The priority is immediate safety, observation as indicated, and urgent escalation. Safety status is the most important parameter to monitor.",
    category: "Mental Health", difficulty: "hard", exam: "REx-PN", country: "Canada",
    client_needs: "Psychosocial Integrity", topic: "Suicide precautions"
  },
  {
    question_type: "bowtie",
    scenario: "A client on a mental health unit is pacing, shouting, clenching fists, and threatening another client.",
    condition_options: ["Escalating aggression","Mild anxiety","Normal coping","Postpartum blues"],
    action_options: ["Use calm de-escalation and obtain assistance immediately","Argue firmly with the client","Turn away and leave the area","Encourage the client to confront peers directly"],
    monitor_options: ["Risk of violence","Hair growth","Bowel frequency","Visual acuity"],
    correct_condition: "Escalating aggression",
    correct_action: "Use calm de-escalation and obtain assistance immediately",
    correct_monitor: "Risk of violence",
    rationale: "Threatening behaviour, clenched fists, and shouting suggest escalating aggression. Calm de-escalation and staff support are essential for safety. Risk of violence is the critical parameter to monitor.",
    category: "Mental Health", difficulty: "moderate", exam: "REx-PN", country: "Canada",
    client_needs: "Psychosocial Integrity", topic: "Aggression de-escalation"
  },
  {
    question_type: "bowtie",
    scenario: "A postpartum client reports severe sadness, inability to bond with the newborn, and thoughts of self-harm.",
    condition_options: ["Postpartum depression with safety risk","Expected postpartum blues only","Normal maternal adjustment","Urinary tract infection"],
    action_options: ["Stay with the client and notify the prescriber immediately","Reassure the client this is normal and leave","Encourage the client to manage infant care alone","Delay reporting until discharge teaching"],
    monitor_options: ["Suicide risk","Hair distribution","Bowel sounds","Fundal height"],
    correct_condition: "Postpartum depression with safety risk",
    correct_action: "Stay with the client and notify the prescriber immediately",
    correct_monitor: "Suicide risk",
    rationale: "Thoughts of self-harm in the postpartum period indicate serious depression with immediate safety concerns. The client should not be left alone and urgent escalation is required. Suicide risk is the key parameter to monitor.",
    category: "Maternal", difficulty: "hard", exam: "REx-PN", country: "Canada",
    client_needs: "Psychosocial Integrity", topic: "Postpartum depression"
  },
  {
    question_type: "bowtie",
    scenario: "A child with fever, drooling, muffled voice, and difficulty swallowing is sitting forward and appears anxious.",
    condition_options: ["Epiglottitis","Gastroenteritis","Mild croup","Otitis media"],
    action_options: ["Keep the child calm and notify the prescriber immediately","Inspect the throat forcefully with a tongue blade","Force oral fluids","Place the child flat in bed"],
    monitor_options: ["Airway patency","Hair texture","Bowel pattern","Urine concentration"],
    correct_condition: "Epiglottitis",
    correct_action: "Keep the child calm and notify the prescriber immediately",
    correct_monitor: "Airway patency",
    rationale: "Drooling, muffled voice, dysphagia, and tripod positioning are concerning for epiglottitis. Agitating the child can worsen obstruction. Airway patency is the most urgent parameter to monitor.",
    category: "Pediatrics", difficulty: "hard", exam: "REx-PN", country: "Canada",
    client_needs: "Physiological Integrity", topic: "Epiglottitis"
  },
  {
    question_type: "bowtie",
    scenario: "A labouring client develops sudden constant abdominal pain, vaginal bleeding, and fetal heart rate abnormalities.",
    condition_options: ["Placental abruption","Normal labour progression","Urinary retention","Mastitis"],
    action_options: ["Notify the prescriber immediately and prepare for emergency intervention","Encourage ambulation","Offer food and fluids","Delay action until the next cervical exam"],
    monitor_options: ["Fetal heart rate","Bowel sounds","Hair pattern","Visual acuity"],
    correct_condition: "Placental abruption",
    correct_action: "Notify the prescriber immediately and prepare for emergency intervention",
    correct_monitor: "Fetal heart rate",
    rationale: "Sudden abdominal pain, bleeding, and fetal heart rate changes are concerning for placental abruption, an obstetric emergency. Rapid escalation is required. Fetal heart rate is the most important parameter to monitor for fetal compromise.",
    category: "Maternal", difficulty: "hard", exam: "REx-PN", country: "Canada",
    client_needs: "Physiological Integrity", topic: "Placental abruption"
  }
];

const rrtSimpleQuestions: any[] = [
  {
    exam_category: "ABG Interpretation", difficulty: "medium",
    question: "A patient has the following ABG values: pH 7.28, PaCO2 55 mmHg, HCO3 24 mEq/L. What is the most likely interpretation?",
    option_a: "Respiratory acidosis", option_b: "Metabolic acidosis", option_c: "Respiratory alkalosis", option_d: "Metabolic alkalosis",
    correct_answer: "A", rationale: "The pH is acidic and PaCO2 is elevated, indicating respiratory acidosis."
  },
  {
    exam_category: "ABG Interpretation", difficulty: "medium",
    question: "Which ABG component primarily reflects ventilation?",
    option_a: "pH", option_b: "PaCO2", option_c: "HCO3", option_d: "PaO2",
    correct_answer: "B", rationale: "PaCO2 reflects how effectively carbon dioxide is being removed through ventilation."
  },
  {
    exam_category: "Mechanical Ventilation", difficulty: "medium",
    question: "Which ventilator mode delivers a set tidal volume with every mandatory breath?",
    option_a: "Assist-Control", option_b: "Pressure Support", option_c: "CPAP", option_d: "BiPAP",
    correct_answer: "A", rationale: "Assist-control ventilation guarantees delivery of a preset tidal volume with each mandatory breath."
  },
  {
    exam_category: "Neonatal Respiratory Therapy", difficulty: "medium",
    question: "Which condition is most commonly associated with surfactant deficiency in premature infants?",
    option_a: "Bronchopulmonary dysplasia", option_b: "Respiratory distress syndrome", option_c: "Transient tachypnea of the newborn", option_d: "Meconium aspiration syndrome",
    correct_answer: "B", rationale: "Respiratory distress syndrome occurs due to surfactant deficiency in premature neonates."
  }
];

const rrtDetailedQuestions: any[] = [
  {
    exam_type: "mixed-rrt-exam", category: "abg-interpretation", subcategory: "acid-base-analysis", difficulty: "medium", question_type: "multiple_choice",
    stem: "An arterial blood gas shows pH 7.30, PaCO2 52 mmHg, and HCO3 25 mEq/L. Which interpretation is most accurate?",
    option_a: "Uncompensated respiratory acidosis", option_b: "Partially compensated metabolic acidosis", option_c: "Uncompensated metabolic alkalosis", option_d: "Fully compensated respiratory alkalosis",
    correct_answer: "A", rationale: "The pH is acidemic and the PaCO2 is elevated, indicating a primary respiratory problem. The bicarbonate remains within the normal range, so compensation is not evident.",
    learning_objective: "Interpret basic ABG patterns", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "abg-interpretation", subcategory: "acid-base-analysis", difficulty: "medium", question_type: "multiple_choice",
    stem: "An ABG result shows pH 7.48, PaCO2 31 mmHg, and HCO3 23 mEq/L. Which disorder is present?",
    option_a: "Respiratory alkalosis", option_b: "Metabolic alkalosis", option_c: "Respiratory acidosis", option_d: "Metabolic acidosis",
    correct_answer: "A", rationale: "The pH is alkalemic and the PaCO2 is low, which identifies respiratory alkalosis. The bicarbonate is still near normal.",
    learning_objective: "Recognize respiratory alkalosis on ABG", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "abg-interpretation", subcategory: "sampling", difficulty: "easy", question_type: "multiple_choice",
    stem: "Before obtaining a radial arterial sample, the therapist performs an Allen-style collateral circulation assessment. What is the main purpose of this step?",
    option_a: "To estimate the hemoglobin level", option_b: "To verify collateral hand perfusion if the radial artery becomes compromised", option_c: "To determine whether venous blood may be used instead", option_d: "To reduce the PaCO2 in the sample",
    correct_answer: "B", rationale: "Collateral circulation testing helps confirm that the hand can still receive adequate blood flow through alternate circulation if radial artery flow is impaired.",
    learning_objective: "Identify the purpose of pre-arterial puncture collateral circulation testing", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "abg-interpretation", subcategory: "sampling-errors", difficulty: "medium", question_type: "multiple_choice",
    stem: "Which handling error is most likely to alter blood gas results if an arterial specimen is not analyzed promptly?",
    option_a: "Mixing the sample gently after collection", option_b: "Using a heparinized syringe", option_c: "Allowing ongoing cellular metabolism to continue in the sample", option_d: "Labeling the syringe with the oxygen device",
    correct_answer: "C", rationale: "Delayed analysis allows cellular metabolism to continue, which can change gas tensions and pH, making the result less reliable.",
    learning_objective: "Recognize pre-analytical ABG error sources", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "abg-interpretation", subcategory: "oxygenation", difficulty: "medium", question_type: "multiple_choice",
    stem: "Which ABG value most directly reflects oxygen dissolved in arterial blood?",
    option_a: "SaO2", option_b: "PaO2", option_c: "HCO3", option_d: "Base excess",
    correct_answer: "B", rationale: "PaO2 represents the partial pressure of oxygen dissolved in arterial blood, whereas saturation reflects hemoglobin binding.",
    learning_objective: "Differentiate oxygenation variables on an ABG", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "alarm-troubleshooting", difficulty: "medium", question_type: "multiple_choice",
    stem: "A patient on volume control ventilation suddenly has a major drop in peak inspiratory pressure with no change in settings. What should the therapist suspect first?",
    option_a: "Pulmonary edema", option_b: "Circuit leak or disconnection", option_c: "Bronchospasm", option_d: "Worsening airway resistance",
    correct_answer: "B", rationale: "A sudden drop in peak pressure commonly suggests loss of system integrity, such as a leak or disconnection, rather than increased resistance.",
    learning_objective: "Troubleshoot sudden changes in airway pressure", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "modes", difficulty: "medium", question_type: "multiple_choice",
    stem: "Which ventilator mode is best suited when the clinician wants consistent mandatory breaths with a fixed tidal volume and rate?",
    option_a: "Pressure support ventilation", option_b: "CPAP", option_c: "Controlled mandatory ventilation", option_d: "Spontaneous mode only",
    correct_answer: "C", rationale: "Controlled mandatory ventilation provides machine-delivered breaths according to set parameters and is useful when precise control is required.",
    learning_objective: "Match ventilator modes to clinical goals", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "compliance", difficulty: "hard", question_type: "multiple_choice",
    stem: "A patient is receiving pressure-controlled assist-control ventilation. If lung compliance worsens and pressure settings remain unchanged, what is the most likely consequence?",
    option_a: "Delivered tidal volume will fall", option_b: "Delivered tidal volume will rise sharply", option_c: "FiO2 will automatically increase", option_d: "PEEP will be eliminated",
    correct_answer: "A", rationale: "In pressure control, pressure is fixed. If compliance worsens, less volume is delivered for the same pressure.",
    learning_objective: "Relate compliance changes to pressure-control ventilation", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "triggering", difficulty: "medium", question_type: "multiple_choice",
    stem: "A mechanically ventilated patient appears to struggle to trigger inspiration. Which adjustment is most likely to improve synchrony?",
    option_a: "Make the trigger more sensitive within a safe range", option_b: "Lower the high-pressure alarm limit", option_c: "Increase inspiratory pause", option_d: "Decrease alarm volume",
    correct_answer: "A", rationale: "If a patient has difficulty initiating breaths, trigger sensitivity is a key setting to evaluate and optimize.",
    learning_objective: "Recognize trigger-sensitivity adjustments", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "weaning", difficulty: "medium", question_type: "multiple_choice",
    stem: "Which finding during a spontaneous breathing trial would be most concerning and suggest the trial should be stopped?",
    option_a: "Mildly increased alertness", option_b: "Respiratory distress with rising accessory muscle use", option_c: "Stable blood pressure", option_d: "Improved cough effort",
    correct_answer: "B", rationale: "Visible distress and increasing work of breathing during a spontaneous breathing trial suggest poor tolerance and possible failure.",
    learning_objective: "Identify signs of failed spontaneous breathing trials", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "pressures", difficulty: "medium", question_type: "multiple_choice",
    stem: "Plateau pressure is monitored primarily to assess which issue?",
    option_a: "Humidifier function", option_b: "Alveolar distending pressure and risk of overdistention", option_c: "Nebulizer output", option_d: "Circuit temperature",
    correct_answer: "B", rationale: "Plateau pressure reflects pressure in the small airways and alveoli after flow stops, making it useful for evaluating risk of lung overdistention.",
    learning_objective: "Explain the clinical purpose of plateau pressure", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "peep", difficulty: "hard", question_type: "multiple_choice",
    stem: "An increase in PEEP is ordered for a patient with refractory hypoxemia. What is the intended physiologic benefit?",
    option_a: "Reduce venous admixture by improving alveolar recruitment", option_b: "Increase carbon dioxide production", option_c: "Lower mean airway pressure", option_d: "Eliminate the need for FiO2",
    correct_answer: "A", rationale: "PEEP helps keep alveoli open and can improve oxygenation by recruiting collapsed units and reducing shunt.",
    learning_objective: "Describe why PEEP improves oxygenation", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "obstructive-disease", difficulty: "hard", question_type: "multiple_choice",
    stem: "A ventilated patient with severe obstructive disease develops air trapping. Which adjustment is most appropriate?",
    option_a: "Shorten expiratory time", option_b: "Increase mandatory rate sharply", option_c: "Provide more expiratory time", option_d: "Eliminate monitoring of exhaled volume",
    correct_answer: "C", rationale: "Obstructive disease often requires longer exhalation to reduce dynamic hyperinflation and air trapping.",
    learning_objective: "Adjust ventilation for obstructive pathophysiology", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "tube-placement", difficulty: "easy", question_type: "multiple_choice",
    stem: "After intubation, unilateral absent breath sounds on the left with otherwise stable ventilation most strongly suggests:",
    option_a: "Right mainstem intubation", option_b: "Left pneumothorax every time", option_c: "Acute pulmonary embolism", option_d: "Total ventilator failure",
    correct_answer: "A", rationale: "A tube advanced too far often enters the right mainstem bronchus, reducing or eliminating left-sided breath sounds.",
    learning_objective: "Recognize signs of mainstem intubation", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mechanical-ventilation", subcategory: "abg-vent-changes", difficulty: "medium", question_type: "multiple_choice",
    stem: "A ventilated patient has persistent hypercapnia. Which broad ventilatory strategy would typically help reduce PaCO2 if clinically appropriate?",
    option_a: "Reduce minute ventilation", option_b: "Increase effective alveolar ventilation", option_c: "Lower all alarm limits", option_d: "Decrease monitoring frequency",
    correct_answer: "B", rationale: "Reducing PaCO2 generally requires improved effective ventilation, often by increasing the rate, tidal volume, or other factors depending on the scenario.",
    learning_objective: "Relate ventilation to carbon dioxide elimination", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "capillary-sampling", difficulty: "medium", question_type: "multiple_choice",
    stem: "In infants, an arterialized capillary sample may correlate reasonably with arterial values for which measurements?",
    option_a: "pH and PCO2 more than oxygenation", option_b: "PaO2 only", option_c: "Hemoglobin and platelet count", option_d: "Electrolytes only",
    correct_answer: "A", rationale: "Capillary samples are more useful for acid-base assessment than for precise oxygenation assessment.",
    learning_objective: "Interpret the usefulness of capillary blood gases", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "newborn-assessment", difficulty: "easy", question_type: "multiple_choice",
    stem: "A higher Apgar score at five minutes generally indicates:",
    option_a: "Worsening cardiopulmonary adaptation", option_b: "Improving transition after birth", option_c: "Definite sepsis", option_d: "A need to avoid all follow-up",
    correct_answer: "B", rationale: "A stronger five-minute score reflects better post-delivery adaptation and clinical status.",
    learning_objective: "Understand the meaning of Apgar scoring trends", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "upper-airway", difficulty: "medium", question_type: "multiple_choice",
    stem: "A child presents with inspiratory stridor. This finding most strongly points toward a problem in which region?",
    option_a: "Upper airway", option_b: "Alveolar-capillary membrane only", option_c: "Pleural space only", option_d: "Pulmonary veins only",
    correct_answer: "A", rationale: "Stridor is classically associated with upper airway narrowing or obstruction.",
    learning_objective: "Identify the significance of stridor", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "neonatal-respiratory-distress", difficulty: "hard", question_type: "multiple_choice",
    stem: "A premature infant develops hypoxemia, retractions, and diffuse atelectatic changes consistent with surfactant deficiency. Which condition is most likely?",
    option_a: "Infant respiratory distress syndrome", option_b: "Cystic fibrosis", option_c: "Foreign body aspiration", option_d: "Adult-onset asthma",
    correct_answer: "A", rationale: "Prematurity with surfactant deficiency strongly suggests neonatal respiratory distress syndrome.",
    learning_objective: "Recognize classic features of neonatal surfactant deficiency", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "pediatric-asthma", difficulty: "medium", question_type: "multiple_choice",
    stem: "A young child with acute asthma requires inhaled bronchodilator therapy. Which factor is most important when choosing the delivery approach?",
    option_a: "Only the color of the device", option_b: "The child's ability to cooperate and receive the medication effectively", option_c: "Whether the parent prefers a louder treatment", option_d: "How many stickers fit on the equipment",
    correct_answer: "B", rationale: "Pediatric aerosol delivery should be chosen based on age, cooperation, coordination, and ability to receive the dose effectively.",
    learning_objective: "Select pediatric aerosol approaches appropriately", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "nitric-oxide", difficulty: "hard", question_type: "multiple_choice",
    stem: "Inhaled nitric oxide is most specifically used in neonates to address:",
    option_a: "Pulmonary vascular constriction contributing to severe hypoxemia", option_b: "Low blood glucose", option_c: "Absent surfactant production in all cases", option_d: "Gastroesophageal reflux",
    correct_answer: "A", rationale: "Inhaled nitric oxide is used for selective pulmonary vasodilation, especially when pulmonary hypertension is contributing to hypoxemia.",
    learning_objective: "Explain the role of inhaled nitric oxide in neonatal care", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "resuscitation", difficulty: "medium", question_type: "multiple_choice",
    stem: "A newborn requires immediate resuscitation. Which principle is most appropriate?",
    option_a: "Delay ventilation until a full chest x-ray is obtained", option_b: "Provide timely airway and ventilation support according to neonatal resuscitation priorities", option_c: "Avoid monitoring heart rate", option_d: "Wait for spontaneous improvement regardless of status",
    correct_answer: "B", rationale: "Neonatal resuscitation focuses on prompt support of airway, breathing, and circulation based on established resuscitation priorities.",
    learning_objective: "Apply neonatal resuscitation priorities conceptually", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "work-of-breathing", difficulty: "easy", question_type: "multiple_choice",
    stem: "Which finding suggests increased work of breathing in an infant?",
    option_a: "Quiet effortless respirations", option_b: "Retractions and nasal flaring", option_c: "Normal tone with pink color", option_d: "Calm sleep without desaturation",
    correct_answer: "B", rationale: "Retractions and nasal flaring are classic signs of increased respiratory effort in infants.",
    learning_objective: "Recognize infant respiratory distress signs", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "airway-equipment", difficulty: "medium", question_type: "multiple_choice",
    stem: "When preparing for pediatric or neonatal airway management, equipment selection should primarily be based on:",
    option_a: "Random preference only", option_b: "The patient's size and developmental stage", option_c: "Whether the room is warm or cool", option_d: "The color coding alone without clinical judgment",
    correct_answer: "B", rationale: "Pediatric and neonatal airway equipment must be chosen according to patient size, age, and clinical context.",
    learning_objective: "Select airway equipment based on patient size", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "neonatal-pediatric", subcategory: "meconium", difficulty: "hard", question_type: "multiple_choice",
    stem: "A neonate with meconium aspiration syndrome is mechanically ventilated. Why must pressure strategy be used carefully?",
    option_a: "Because excessive pressure can worsen lung injury and air leak risk", option_b: "Because pressure has no effect in newborns", option_c: "Because neonates never develop barotrauma", option_d: "Because all meconium is removed by humidity alone",
    correct_answer: "A", rationale: "In meconium aspiration, uneven lung involvement can increase the risk of overdistention and air leak if pressures are excessive.",
    learning_objective: "Understand ventilatory caution in meconium aspiration syndrome", tier: "rrt"
  },
  {
    exam_type: "mixed-rrt-exam", category: "mixed-rrt-exams", subcategory: "integrated-clinical-reasoning", difficulty: "hard", question_type: "multiple_choice",
    stem: "A premature infant on supplemental oxygen has worsening hypoxemia and increasing distress. The therapist is considering escalation. Which approach is most aligned with neonatal respiratory support principles?",
    option_a: "Ignore the trend unless the infant stops breathing completely", option_b: "Reassess oxygenation, work of breathing, and need for more structured respiratory support", option_c: "Eliminate monitoring to reduce stimulation", option_d: "Assume all distress is unrelated to the lungs",
    correct_answer: "B", rationale: "Clinical worsening in a premature infant requires reassessment of oxygenation, ventilation, distress, and the possible need for escalation in support.",
    learning_objective: "Integrate neonatal reassessment and support escalation principles", tier: "rrt"
  }
];

const rnNgnQuestions: any[] = [
  {
    id: "RN-Q001", type: "multiple_choice", category: "Adult Health – Cardiac",
    question: "A nurse is caring for a client with hyperkalemia (serum potassium 6.2 mmol/L). Which electrocardiogram change should the nurse expect to observe first?",
    options: { A: "Flattened T waves", B: "Peaked T waves", C: "Shortened PR interval", D: "ST depression" },
    correct_answer: "B",
    rationale: "Hyperkalemia causes increased myocardial excitability. The earliest ECG change is tall, peaked T waves due to rapid ventricular repolarization."
  },
  {
    id: "RN-Q002", type: "multiple_choice", category: "Pharmacology",
    question: "A client taking furosemide reports muscle weakness and palpitations. Which laboratory value should the nurse review first?",
    options: { A: "Serum potassium", B: "Serum sodium", C: "Blood urea nitrogen", D: "Serum calcium" },
    correct_answer: "A",
    rationale: "Loop diuretics cause potassium loss. Hypokalemia can lead to muscle weakness and dysrhythmias."
  },
  {
    id: "RN-Q003", type: "SATA", category: "Respiratory",
    question: "A nurse is assessing a client with acute respiratory distress syndrome (ARDS). Which findings should the nurse expect?",
    options: { A: "Severe hypoxemia", B: "Decreased lung compliance", C: "Bilateral pulmonary infiltrates", D: "Elevated PaO2", E: "Diffuse alveolar damage" },
    correct_answers: ["A","B","C","E"],
    rationale: "ARDS is characterized by hypoxemia refractory to oxygen therapy, decreased lung compliance, diffuse alveolar damage, and bilateral infiltrates."
  },
  {
    id: "RN-Q004", type: "multiple_choice", category: "Maternal Health",
    question: "Which hormone is responsible for maintaining the corpus luteum during early pregnancy?",
    options: { A: "Estrogen", B: "Human chorionic gonadotropin", C: "Progesterone", D: "Prolactin" },
    correct_answer: "B",
    rationale: "hCG maintains the corpus luteum during early pregnancy, allowing progesterone production to support the uterine lining."
  },
  {
    id: "RN-Q005", type: "ordered_response", category: "Emergency",
    question: "A nurse finds a client unresponsive and not breathing. Place the following actions in the correct order.",
    options: ["Activate emergency response system","Check pulse and breathing","Begin chest compressions","Apply AED"],
    correct_order: ["Check pulse and breathing","Activate emergency response system","Begin chest compressions","Apply AED"],
    rationale: "Basic life support sequence: assess responsiveness and breathing, activate help, begin compressions, then apply AED."
  },
  {
    id: "RN-Q006", type: "multiple_choice", category: "Endocrine",
    question: "Which mechanism explains why metformin is effective in treating type 2 diabetes?",
    options: { A: "Stimulates pancreatic insulin secretion", B: "Enhances insulin sensitivity in peripheral tissues", C: "Blocks intestinal glucose absorption completely", D: "Inhibits glucagon secretion" },
    correct_answer: "B",
    rationale: "Metformin primarily improves insulin sensitivity and decreases hepatic gluconeogenesis."
  },
  {
    id: "RN-Q007", type: "SATA", category: "Infection Control",
    question: "Which interventions are appropriate when caring for a client with active tuberculosis?",
    options: { A: "Use N95 respirator", B: "Place client in negative pressure room", C: "Wear surgical mask only", D: "Limit transport outside the room", E: "Use airborne precautions" },
    correct_answers: ["A","B","D","E"],
    rationale: "Tuberculosis requires airborne precautions including N95 mask, negative pressure room, and restricted movement."
  },
  {
    id: "RN-Q008", type: "bowtie", category: "Next Generation Clinical Judgment",
    scenario: "A client presents with fever, hypotension, tachycardia, and suspected infection.",
    condition_options: ["Septic shock","Cardiogenic shock","Hypovolemic shock"],
    actions_options: ["Administer broad spectrum antibiotics","Start fluid resuscitation","Administer insulin","Provide oxygen"],
    parameters_options: ["Serum lactate","White blood cell count","Troponin"],
    correct_condition: "Septic shock",
    correct_actions: ["Administer broad spectrum antibiotics","Start fluid resuscitation"],
    correct_parameters: ["Serum lactate"],
    rationale: "Sepsis presents with infection and systemic inflammatory response leading to hypotension and elevated lactate."
  },
  {
    id: "RN-Q009", type: "matrix", category: "Pharmacology",
    question: "Match the medication with its primary therapeutic use.",
    rows: ["Metoprolol","Albuterol","Warfarin"],
    columns: ["Anticoagulant","Bronchodilator","Beta blocker"],
    correct_matches: { Metoprolol: "Beta blocker", Albuterol: "Bronchodilator", Warfarin: "Anticoagulant" },
    rationale: "Metoprolol is a beta blocker, albuterol is a bronchodilator, and warfarin is an anticoagulant."
  },
  {
    id: "RN-Q010", type: "case_study", category: "Next Generation Clinical Judgment",
    case: "A 72 year old client with a history of heart failure presents with shortness of breath, bilateral crackles, and peripheral edema.",
    questions: [
      { question: "Which finding indicates fluid overload?", options: { A: "Hypotension", B: "Crackles in lung bases", C: "Dry mucous membranes", D: "Bradycardia" }, correct_answer: "B" },
      { question: "Which medication should the nurse anticipate administering?", options: { A: "Furosemide", B: "Metformin", C: "Insulin", D: "Amoxicillin" }, correct_answer: "A" }
    ],
    rationale: "Heart failure exacerbation causes pulmonary congestion and fluid overload which is treated with diuretics."
  }
];

function parseBowtieForExam(q: any): any {
  const stemText = `Bowtie: ${q.scenario.trim()}`;
  const allOptions = [...q.condition_options, ...q.action_options, ...q.monitor_options];
  const correctIndices: number[] = [];
  const condIdx = q.condition_options.indexOf(q.correct_condition);
  const actIdx = q.action_options.indexOf(q.correct_action);
  const monIdx = q.monitor_options.indexOf(q.correct_monitor);
  if (condIdx >= 0) correctIndices.push(condIdx);
  if (actIdx >= 0) correctIndices.push(q.condition_options.length + actIdx);
  if (monIdx >= 0) correctIndices.push(q.condition_options.length + q.action_options.length + monIdx);

  const EXAM_TO_TIER: Record<string, string> = { "NCLEX-PN": "rpn", "REx-PN": "rpn", "NCLEX-RN": "rn" };
  const COUNTRY_TO_REGION: Record<string, string> = { US: "US", Canada: "CAN" };
  const tier = EXAM_TO_TIER[q.exam] || "rpn";
  const regionScope = COUNTRY_TO_REGION[q.country] || "BOTH";
  const diff = DIFFICULTY_MAP[q.difficulty?.toLowerCase()] || 3;

  return {
    tier, exam: q.exam, questionType: "bowtie", status: "published",
    stem: stemText, options: allOptions, correctAnswer: correctIndices,
    rationale: q.rationale, difficulty: diff,
    bodySystem: q.category || null, topic: q.client_needs || null, subtopic: q.topic || null,
    regionScope, careerType: "nursing", stemHash: stemHash(stemText),
    scenario: q.scenario.trim(),
    exhibitData: {
      type: "bowtie",
      conditionOptions: q.condition_options,
      actionOptions: q.action_options,
      monitorOptions: q.monitor_options,
      correctCondition: q.correct_condition,
      correctAction: q.correct_action,
      correctMonitor: q.correct_monitor,
    }
  };
}

function parseRrtSimple(q: any): any {
  const options = [q.option_a, q.option_b, q.option_c, q.option_d];
  const correctIdx = ANSWER_INDEX[q.correct_answer?.toUpperCase()] ?? 0;
  const diff = DIFFICULTY_MAP[q.difficulty?.toLowerCase()] || 3;
  return {
    careerType: "rrt",
    stem: q.question,
    options,
    correctAnswer: correctIdx,
    rationaleLong: q.rationale,
    learningObjective: `Understand ${q.exam_category}`,
    blueprintCategory: q.exam_category,
    subtopic: "General",
    difficulty: diff,
    cognitiveLevel: "application",
    questionType: "multiple_choice",
    status: "published",
    stemHash: stemHash(q.question)
  };
}

function parseRrtDetailed(q: any): any {
  const options = [q.option_a, q.option_b, q.option_c, q.option_d];
  const correctIdx = ANSWER_INDEX[q.correct_answer?.toUpperCase()] ?? 0;
  const diff = DIFFICULTY_MAP[q.difficulty?.toLowerCase()] || 3;
  return {
    careerType: "rrt",
    stem: q.stem,
    options,
    correctAnswer: correctIdx,
    rationaleLong: q.rationale,
    learningObjective: q.learning_objective || `Understand ${q.category}`,
    blueprintCategory: q.category,
    subtopic: q.subcategory || "General",
    difficulty: diff,
    cognitiveLevel: "application",
    questionType: q.question_type || "multiple_choice",
    status: "published",
    stemHash: stemHash(q.stem)
  };
}

function parseRnNgn(q: any): any {
  const qType = q.type?.toLowerCase();

  if (qType === "multiple_choice") {
    const opts = q.options;
    const optArr = typeof opts === "object" && !Array.isArray(opts)
      ? Object.values(opts) as string[]
      : opts as string[];
    const correctIdx = ANSWER_INDEX[q.correct_answer?.toUpperCase()] ?? 0;
    return {
      tier: "rn", exam: "NCLEX-RN", questionType: "standard", status: "published",
      stem: q.question, options: optArr, correctAnswer: [correctIdx],
      rationale: q.rationale, difficulty: 3,
      bodySystem: q.category, topic: null, subtopic: null,
      regionScope: "BOTH", careerType: "nursing",
      stemHash: stemHash(q.question), scenario: null, exhibitData: null
    };
  }

  if (qType === "sata") {
    const opts = q.options;
    const optArr = typeof opts === "object" && !Array.isArray(opts)
      ? Object.values(opts) as string[]
      : opts as string[];
    const correctIndices = (q.correct_answers || []).map((a: string) => ANSWER_INDEX[a.toUpperCase()]).filter((i: number) => i !== undefined);
    return {
      tier: "rn", exam: "NCLEX-RN", questionType: "sata", status: "published",
      stem: q.question, options: optArr, correctAnswer: correctIndices,
      rationale: q.rationale, difficulty: 3,
      bodySystem: q.category, topic: null, subtopic: null,
      regionScope: "BOTH", careerType: "nursing",
      stemHash: stemHash(q.question), scenario: null, exhibitData: null
    };
  }

  if (qType === "ordered_response" || qType === "drag_drop") {
    const optArr = q.options as string[];
    const correctOrder = q.correct_order as string[];
    return {
      tier: "rn", exam: "NCLEX-RN", questionType: "drag_drop", status: "published",
      stem: q.question, options: optArr, correctAnswer: correctOrder.map((item: string) => optArr.indexOf(item)),
      rationale: q.rationale, difficulty: 3,
      bodySystem: q.category, topic: null, subtopic: null,
      regionScope: "BOTH", careerType: "nursing",
      stemHash: stemHash(q.question), scenario: null,
      exhibitData: { type: "drag_drop", items: optArr, correctOrder }
    };
  }

  if (qType === "bowtie") {
    const condOpts = q.condition_options || [];
    const actOpts = q.actions_options || [];
    const monOpts = q.parameters_options || [];
    const allOptions = [...condOpts, ...actOpts, ...monOpts];
    const stemText = `Bowtie: ${q.scenario.trim()}`;
    const correctIndices: number[] = [];
    const condIdx = condOpts.indexOf(q.correct_condition);
    if (condIdx >= 0) correctIndices.push(condIdx);
    const correctActions = q.correct_actions || [];
    for (const ca of correctActions) {
      const idx = actOpts.indexOf(ca);
      if (idx >= 0) correctIndices.push(condOpts.length + idx);
    }
    const correctParams = q.correct_parameters || [];
    for (const cp of correctParams) {
      const idx = monOpts.indexOf(cp);
      if (idx >= 0) correctIndices.push(condOpts.length + actOpts.length + idx);
    }
    return {
      tier: "rn", exam: "NCLEX-RN", questionType: "bowtie", status: "published",
      stem: stemText, options: allOptions, correctAnswer: correctIndices,
      rationale: q.rationale, difficulty: 4,
      bodySystem: q.category, topic: null, subtopic: null,
      regionScope: "BOTH", careerType: "nursing",
      stemHash: stemHash(stemText), scenario: q.scenario.trim(),
      exhibitData: {
        type: "bowtie",
        conditionOptions: condOpts,
        actionOptions: actOpts,
        monitorOptions: monOpts,
        correctCondition: q.correct_condition,
        correctActions: q.correct_actions,
        correctParameters: q.correct_parameters,
      }
    };
  }

  if (qType === "matrix") {
    const stemText = q.question;
    return {
      tier: "rn", exam: "NCLEX-RN", questionType: "matrix", status: "published",
      stem: stemText, options: q.rows, correctAnswer: [],
      rationale: q.rationale, difficulty: 3,
      bodySystem: q.category, topic: null, subtopic: null,
      regionScope: "BOTH", careerType: "nursing",
      stemHash: stemHash(stemText), scenario: null,
      exhibitData: { type: "matrix", rows: q.rows, columns: q.columns, correctMatches: q.correct_matches }
    };
  }

  if (qType === "case_study") {
    const stemText = `Case Study: ${q.case.trim()}`;
    const subQuestions = (q.questions || []).map((sq: any) => {
      const sqOpts = typeof sq.options === "object" && !Array.isArray(sq.options)
        ? Object.values(sq.options) as string[]
        : sq.options as string[];
      return {
        question: sq.question,
        options: sqOpts,
        correctAnswer: ANSWER_INDEX[sq.correct_answer?.toUpperCase()] ?? 0
      };
    });
    return {
      tier: "rn", exam: "NCLEX-RN", questionType: "case_study", status: "published",
      stem: stemText, options: [], correctAnswer: [],
      rationale: q.rationale, difficulty: 4,
      bodySystem: q.category, topic: null, subtopic: null,
      regionScope: "BOTH", careerType: "nursing",
      stemHash: stemHash(stemText), scenario: q.case.trim(),
      exhibitData: { type: "case_study", caseDescription: q.case, linkedQuestions: subQuestions }
    };
  }

  return null;
}

export async function seedPrompts3Questions(): Promise<{
  total: number;
  inserted: number;
  skipped: number;
  errors: number;
  details: string[];
}> {
  const details: string[] = [];
  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  const parsedBowtie = bowtieQuestions.map(parseBowtieForExam).filter(Boolean);
  details.push(`Bowtie questions parsed: ${parsedBowtie.length}`);

  const seenExamHashes = new Set<string>();
  const dedupedBowtie: any[] = [];
  for (const q of parsedBowtie) {
    const key = `${q.stemHash}_${q.exam}`;
    if (!seenExamHashes.has(key)) {
      seenExamHashes.add(key);
      dedupedBowtie.push(q);
    }
  }
  details.push(`Bowtie after in-batch dedup: ${dedupedBowtie.length}`);

  for (const q of dedupedBowtie) {
    try {
      const existing = await pool.query(
        `SELECT id FROM exam_questions WHERE stem_hash = $1 AND exam = $2`,
        [q.stemHash, q.exam]
      );
      if (existing.rows.length > 0) { skipped++; continue; }

      await pool.query(
        `INSERT INTO exam_questions (
          tier, exam, question_type, status, published_at, stem, options, correct_answer,
          rationale, difficulty, body_system, topic, subtopic, region_scope, career_type,
          stem_hash, scenario, exhibit_data
        ) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
        [
          q.tier, q.exam, q.questionType, q.status, q.stem,
          JSON.stringify(q.options), JSON.stringify(q.correctAnswer),
          q.rationale, q.difficulty, q.bodySystem, q.topic, q.subtopic,
          q.regionScope, q.careerType, q.stemHash, q.scenario,
          q.exhibitData ? JSON.stringify(q.exhibitData) : null
        ]
      );
      inserted++;
    } catch (err: any) {
      errors++;
      details.push(`Bowtie DB error: ${err.message.substring(0, 100)}`);
    }
  }
  details.push(`Bowtie inserted: ${inserted}, skipped: ${skipped}`);

  const rrtAll = [
    ...rrtSimpleQuestions.map(parseRrtSimple),
    ...rrtDetailedQuestions.map(parseRrtDetailed)
  ].filter(Boolean);
  details.push(`RRT questions parsed: ${rrtAll.length}`);

  const seenRrtHashes = new Set<string>();
  const dedupedRrt: any[] = [];
  for (const q of rrtAll) {
    if (!seenRrtHashes.has(q.stemHash)) {
      seenRrtHashes.add(q.stemHash);
      dedupedRrt.push(q);
    }
  }
  details.push(`RRT after in-batch dedup: ${dedupedRrt.length}`);

  let rrtInserted = 0;
  let rrtSkipped = 0;
  for (const q of dedupedRrt) {
    try {
      const existing = await pool.query(
        `SELECT id FROM allied_questions WHERE career_type = 'rrt' AND stem = $1`,
        [q.stem]
      );
      if (existing.rows.length > 0) { rrtSkipped++; skipped++; continue; }

      await pool.query(
        `INSERT INTO allied_questions (
          career_type, stem, options, correct_answer, rationale_long,
          learning_objective, blueprint_category, subtopic, difficulty,
          cognitive_level, question_type, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          q.careerType, q.stem, JSON.stringify(q.options), q.correctAnswer,
          q.rationaleLong, q.learningObjective, q.blueprintCategory,
          q.subtopic, q.difficulty, q.cognitiveLevel, q.questionType, q.status
        ]
      );
      rrtInserted++;
      inserted++;
    } catch (err: any) {
      errors++;
      details.push(`RRT DB error: ${err.message.substring(0, 100)}`);
    }
  }
  details.push(`RRT inserted: ${rrtInserted}, skipped: ${rrtSkipped}`);

  const parsedRn = rnNgnQuestions.map(parseRnNgn).filter(Boolean);
  details.push(`RN NGN questions parsed: ${parsedRn.length}`);

  let rnInserted = 0;
  let rnSkipped = 0;
  for (const q of parsedRn) {
    try {
      const existing = await pool.query(
        `SELECT id FROM exam_questions WHERE stem_hash = $1 AND exam = $2`,
        [q.stemHash, q.exam]
      );
      if (existing.rows.length > 0) { rnSkipped++; skipped++; continue; }

      await pool.query(
        `INSERT INTO exam_questions (
          tier, exam, question_type, status, published_at, stem, options, correct_answer,
          rationale, difficulty, body_system, topic, subtopic, region_scope, career_type,
          stem_hash, scenario, exhibit_data
        ) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
        [
          q.tier, q.exam, q.questionType, q.status, q.stem,
          JSON.stringify(q.options), JSON.stringify(q.correctAnswer),
          q.rationale, q.difficulty, q.bodySystem, q.topic, q.subtopic,
          q.regionScope, q.careerType, q.stemHash, q.scenario,
          q.exhibitData ? JSON.stringify(q.exhibitData) : null
        ]
      );
      rnInserted++;
      inserted++;
    } catch (err: any) {
      errors++;
      details.push(`RN DB error: ${err.message.substring(0, 100)}`);
    }
  }
  details.push(`RN NGN inserted: ${rnInserted}, skipped: ${rnSkipped}`);

  const total = bowtieQuestions.length + rrtSimpleQuestions.length + rrtDetailedQuestions.length + rnNgnQuestions.length;
  details.push(`Total: ${total}, Inserted: ${inserted}, Skipped: ${skipped}, Errors: ${errors}`);

  return { total, inserted, skipped, errors, details };
}
