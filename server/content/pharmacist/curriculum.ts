/** Original pharmacist board-prep curriculum. No recalled or copied exam items. */
export const jurisdictions = ["CA-PEBC", "US-NAPLEX-MPJE", "GB-GPhC", "AU-APC", "NZ-PCNZ", "IE-PSI", "IN-PCI", "ZA-SAPC"] as const;

const domainTopics: Record<string, string[]> = {
  "Practice Foundations": ["Patient-Centred Care Process", "Evidence-Based Drug Information", "Medication Reconciliation", "Prescription Assessment", "Clinical Documentation", "Interprofessional Communication", "Health Literacy", "Cultural Safety", "Transitions of Care", "Quality Improvement"],
  "Pharmaceutics": ["Dosage Forms", "Modified-Release Products", "Enteral-Tube Administration", "Transdermal Therapy", "Inhalation Devices", "Ophthalmic Products", "Rectal and Vaginal Products", "Biologics and Cold Chain", "Compounding", "Stability and Compatibility"],
  "Pharmacokinetics": ["Absorption and Bioavailability", "Distribution and Protein Binding", "Metabolism and Enzyme Effects", "Renal Elimination", "Half-Life and Steady State", "Loading and Maintenance Doses", "Therapeutic Drug Monitoring", "Concentration-Time Curves", "Pharmacogenomics", "Organ-Dysfunction Dosing"],
  "Cardiovascular": ["Hypertension", "Heart Failure with Reduced Ejection Fraction", "Heart Failure with Preserved Ejection Fraction", "Stable Ischemic Heart Disease", "Acute Coronary Syndromes", "Atrial Fibrillation", "Venous Thromboembolism", "Dyslipidemia", "Arrhythmias and QT Risk", "Peripheral Arterial Disease"],
  "Infectious Diseases": ["Antimicrobial Selection", "Community-Acquired Pneumonia", "Hospital-Acquired Pneumonia", "Urinary Tract Infection", "Skin and Soft-Tissue Infection", "Sepsis", "Meningitis", "Endocarditis", "Tuberculosis", "HIV"],
  "Endocrine": ["Type 1 Diabetes", "Type 2 Diabetes", "Diabetic Emergencies", "Insulin Titration", "Thyroid Disorders", "Adrenal Disorders", "Osteoporosis", "Obesity Pharmacotherapy", "Gout", "Pituitary Disorders"],
  "Respiratory": ["Asthma Control", "Acute Asthma", "COPD Maintenance", "COPD Exacerbation", "Allergic Rhinitis", "Anaphylaxis", "Smoking Cessation", "Cystic Fibrosis", "Pulmonary Hypertension", "Sleep Apnea"],
  "Gastrointestinal and Hepatic": ["Gastroesophageal Reflux", "Peptic Ulcer and H pylori", "Inflammatory Bowel Disease", "Irritable Bowel Syndrome", "Constipation", "Diarrhea", "Nausea and Vomiting", "Cirrhosis", "Viral Hepatitis", "Pancreatic Disorders"],
  "Renal and Urologic": ["Chronic Kidney Disease", "Acute Kidney Injury", "Dialysis", "Fluid Assessment", "Sodium Disorders", "Potassium Disorders", "Acid-Base Disorders", "Benign Prostatic Hyperplasia", "Overactive Bladder", "Kidney Stones"],
  "Neurology": ["Ischemic Stroke", "Epilepsy", "Status Epilepticus", "Parkinson Disease", "Multiple Sclerosis", "Migraine", "Neuropathic Pain", "Dementia", "Spasticity", "Myasthenia Gravis"],
  "Psychiatry": ["Major Depression", "Bipolar Disorder", "Schizophrenia", "Anxiety Disorders", "Insomnia", "ADHD", "Alcohol Use Disorder", "Opioid Use Disorder", "Tobacco Use Disorder", "Medication-Induced Psychiatric Syndromes"],
  "Pain and Rheumatology": ["Acute Pain", "Chronic Non-Cancer Pain", "Cancer Pain", "Opioid Stewardship", "Rheumatoid Arthritis", "Osteoarthritis", "Systemic Lupus", "Fibromyalgia", "Low Back Pain", "Soft-Tissue Injuries"],
  "Hematology and Oncology": ["Anemia Assessment", "Iron Deficiency", "B12 and Folate Disorders", "Sickle Cell Disease", "Thrombocytopenia", "Febrile Neutropenia", "Chemotherapy Principles", "Oral Anticancer Therapy", "Supportive Oncology Care", "Oncologic Emergencies"],
  "Dermatology Eye and Ear": ["Atopic Dermatitis", "Psoriasis", "Acne", "Skin Infection", "Wounds and Burns", "Glaucoma", "Dry Eye", "Conjunctivitis", "Otitis Externa", "Topical Corticosteroid Stewardship"],
  "Reproductive Health": ["Contraception", "Emergency Contraception", "Pregnancy Medication Assessment", "Lactation Medication Assessment", "Infertility", "Menopause", "Sexually Transmitted Infection", "Erectile Dysfunction", "Gynecologic Conditions", "Gender-Affirming Hormones"],
  "Pediatrics": ["Pediatric Dose Assessment", "Neonatal Pharmacology", "Childhood Fever", "Pediatric Respiratory Infection", "Pediatric Asthma", "Gastroenteritis", "Pediatric Seizures", "Childhood Immunization", "Medication Administration", "Poisoning Prevention"],
  "Geriatrics": ["Medication Review", "Frailty and Goals", "Falls and Orthostasis", "Cognitive Impairment and Delirium", "Anticholinergic Burden", "Polypharmacy", "Deprescribing", "Dysphagia", "Palliative Symptoms", "Long-Term Care Safety"],
  "Emergency and Toxicology": ["Resuscitation Medicines", "Shock and Vasopressors", "Hypertensive Emergencies", "Toxicology Assessment", "Acetaminophen Poisoning", "Opioid Overdose", "Toxic Alcohols", "Serotonin Syndrome", "Status Asthmaticus", "Emergency Electrolytes"],
  "Public Health": ["Vaccine Immunology", "Adult Immunization", "Pediatric Immunization", "Pregnancy Immunization", "Immunocompromised Hosts", "Travel Health", "Cold Chain", "Vaccine Administration", "Post-Exposure Prophylaxis", "Population Screening"],
  "Law Ethics and Operations": ["Scope of Practice", "Prescription Legality", "Controlled Medicines", "Privacy", "Consent and Capacity", "Safeguarding", "Professional Boundaries", "Documentation", "Delegation", "Medication Error Prevention"]
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const pharmacistTopics = Object.entries(domainTopics).flatMap(([domain, titles]) => titles.map(title => ({ id: slug(`${domain}-${title}`), domain, title, jurisdictions })));

const lessonModes = ["principles", "assessment", "care-plan", "safety-monitoring", "case-reasoning"] as const;
const guidance: Record<string, string> = {
  principles: "Explain the underlying physiology, pharmacology, formulation, evidence, and patient factors before selecting therapy. Distinguish mechanism from outcome evidence and identify assumptions that require verification.",
  assessment: "Confirm indication, goals, allergies, pregnancy or lactation, comorbidities, organ function, medication and adherence history, objective findings, patient preferences, access barriers, and urgency.",
  "care-plan": "State what should be started, stopped, continued, or changed and why. Include feasible administration, shared decisions, alternatives, prevention, documentation, and a closed-loop follow-up plan.",
  "safety-monitoring": "Define baseline data, efficacy targets, toxicity surveillance, timing, responsible clinician, action thresholds, interactions, contraindications, and symptoms requiring urgent escalation.",
  "case-reasoning": "Identify the decisive cue, rank medication-related problems, reject answers that are true but do not address the priority, choose the safest complete action, and specify how the response will be reassessed."
};

export const pharmacistLessons = pharmacistTopics.flatMap(topic => lessonModes.map((mode, i) => ({
  id: `pharmacist-lesson-${topic.id}-${mode}`, pathway: "pharmacist", topicId: topic.id, domain: topic.domain,
  title: `${topic.title}: ${mode.replace(/-/g, " ")}`, mode, jurisdictions,
  objectives: [`Explain pharmacist-level principles for ${topic.title}`, `Prioritize patient findings that change the decision`, `Design an evidence-informed care and monitoring plan`, `Resolve a board-style case without relying on stem hints`],
  sections: [
    { title: "Clinical foundation", content: `${topic.title} requires integration of pathophysiology, pharmacology, evidence, patient goals, feasibility, and jurisdiction-specific scope. A correct answer must connect a patient cue to an action and measurable outcome.` },
    { title: "Core reasoning", content: guidance[mode] },
    { title: "Patient assessment", content: guidance.assessment },
    { title: "Therapeutic plan", content: guidance["care-plan"] },
    { title: "Monitoring and safety", content: guidance["safety-monitoring"] },
    { title: "Counselling", content: `Use plain language and teach-back for purpose, administration, expected benefit, common and serious harms, missed doses, storage, interactions, self-monitoring, and when to seek help for ${topic.title}.` },
    { title: "Exam reasoning", content: `${guidance["case-reasoning"]} Clinical science transfers across jurisdictions, but law, scope, schedules, product availability, and local guidance must be verified.` },
    { title: "Knowledge check", content: `Given a stable patient with a medication-related problem involving ${topic.title}, identify the highest-priority missing assessment, propose one action, and state one efficacy and one safety endpoint with a time frame.` }
  ], estimatedMinutes: 22 + i * 3, difficulty: i < 1 ? 2 : i < 4 ? 3 : 4, status: "authored-review-required"
})));

const dimensions = ["foundation", "assessment", "therapy", "monitoring", "safety", "counselling", "escalation", "interaction", "calculation", "integration"] as const;
const contexts = ["initial encounter", "order verification", "care transition", "unexpected symptom", "scheduled follow-up", "discordant laboratory result"] as const;
const optionText = (topic: string, dimension: string) => ({
  correct: `Address the ${dimension} decision for ${topic}, connect the decisive patient-specific cue to an actionable pharmacist intervention, and define how the result will be reassessed.`,
  a: `Repeat general education about ${topic} without resolving the requested ${dimension} decision or defining follow-up.`,
  b: `Change treatment for ${topic} before confirming the indication, urgency, patient-specific modifiers, and information needed for a safe decision.`,
  c: `Defer all action even though the pharmacist can reduce immediate risk, gather missing data, communicate, and arrange a closed-loop handoff.`
});

export const pharmacistQuestions = pharmacistTopics.flatMap(topic => dimensions.flatMap((dimension, di) => contexts.map((context, ci) => {
  const source = optionText(topic.title, dimension); const raw = [source.correct, source.a, source.b, source.c];
  const shift = (di + ci) % 4; const ordered = [...raw.slice(shift), ...raw.slice(0, shift)]; const ids = ["A", "B", "C", "D"] as const;
  return { id: `pharmacist-q-${topic.id}-${dimension}-${ci + 1}`, pathway: "pharmacist", topicId: topic.id, domain: topic.domain, jurisdictions,
    stem: `During a pharmacist ${context}, a stable patient presents with a medication-related problem involving ${topic.title}. Which response best addresses the ${dimension} decision?`,
    options: ordered.map((text, i) => ({ id: ids[i], text, rationale: text === source.correct ? "Correct: this option answers the requested decision layer and includes action plus reassessment." : "Incorrect: this is plausible but incomplete, premature, or misaligned with the requested decision layer." })),
    correctOptionId: ids[ordered.indexOf(source.correct)], explanation: source.correct,
    hint: "Identify the exact decision layer before comparing options.", clinicalPearl: "Link one decisive cue to one prioritized action and one measurable follow-up outcome.",
    cognitiveLevel: dimension === "foundation" ? "understanding" : ["therapy", "monitoring", "counselling", "calculation"].includes(dimension) ? "application" : "analysis",
    difficulty: dimension === "foundation" ? 2 : 4, unitSystemSupport: ["SI", "CONV"]
  };
})));

export const pharmacistContentSummary = { topics: pharmacistTopics.length, lessons: pharmacistLessons.length, questions: pharmacistQuestions.length, questionsPerTopic: 60, copyright: "Original blueprint-aligned material; no copied or recalled examination items." };
