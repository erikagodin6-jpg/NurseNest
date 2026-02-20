import type { LessonContent } from "./types";

export const pharmacologyLessons: Record<string, LessonContent> = {
  "herbals-safety": {
    title: "Herbal & Supplement Safety",
    cellular: { title: "Phytotherapy Safety", content: "Herbals can have potent physiological effects and significant interactions with conventional medications, especially anticoagulants and CNS depressants." },
    riskFactors: ["Polypharmacy", "Elderly patients", "Liver or kidney disease", "Anticoagulant therapy", "Surgical patients", "Pregnancy", "Self-medication without provider knowledge", "Cultural practices promoting herbal use"],
    diagnostics: ["Expect liver and renal function tests if hepatotoxicity suspected", "Monitor coagulation studies (PT/INR) in patients on anticoagulants", "Expect medication reconciliation to be completed", "Monitor for signs of drug-herb interactions", "Expect blood glucose monitoring if hypoglycemia risk"],
    management: ["Document all herbal supplements in medication history", "Advise to stop herbals 2 weeks before surgery as ordered", "Report herbal use to healthcare team", "Educate patients that herbals are not FDA-regulated", "Avoid concurrent use of herbals with prescribed medications without approval"],
    nursingActions: ["Ask about herbal and supplement use during every assessment", "Report use of bleeding-risk herbals (Ginkgo, Garlic, Ginger, Ginseng) to physician", "Monitor for signs of adverse interactions (bleeding, sedation, serotonin syndrome)", "Document all herbals and supplements in the medication record", "Educate patients about potential herb-drug interactions", "Report unexplained symptoms that could indicate herbal interactions"],
    signs: {
      left: ["St. John's Wort: Serotonin Syndrome risk", "Ginkgo/Garlic: Bleeding risk", "Ginseng: Hypoglycemia risk"],
      right: ["Kava: Hepatotoxicity", "Valerian: Excessive sedation", "Licorice root: Hypokalemia/HTN"]
    },
    medications: [
      { name: "Ginkgo Biloba", type: "Herbal", action: "Memory enhancement (unproven)", sideEffects: "Bleeding", contra: "Warfarin/Heparin", pearl: "Stop 2 weeks before surgery." },
      { name: "St. John's Wort", type: "Herbal", action: "Antidepressant", sideEffects: "Photosensitivity", contra: "SSRIs/MAOIs", pearl: "Reduces effectiveness of many drugs (e.g., Digoxin, Warfarin)." }
    ],
    pearls: ["Always ask about herbals in the pre-op assessment", "G's (Ginkgo, Garlic, Ginger, Ginseng) = Bleeding risk", "Herbals are not regulated like pharmaceuticals"],
    quiz: [{ question: "A patient on Warfarin takes Ginkgo Biloba. What is the risk?", options: ["Blood clots", "Bleeding", "Hypertension", "Drowsiness"], correct: 1, rationale: "Ginkgo has antiplatelet properties and increases bleeding risk with anticoagulants." }]
  },
  "electrolyte-safety": {
    title: "Electrolyte Imbalances",
    cellular: { title: "Ionic Homeostasis", content: "Electrolytes (K, Na, Ca, Mg) are critical for nerve conduction, muscle contraction, and fluid balance. Imbalances lead to lethal cardiac and neurological complications." },
    riskFactors: ["Renal failure", "Diuretic therapy", "Chronic vomiting/diarrhea", "Burns", "Malnutrition", "Endocrine disorders", "Excessive IV fluid administration", "Eating disorders"],
    diagnostics: ["Monitor serum electrolyte levels (Na+, K+, Ca2+, Mg2+, PO4)", "Monitor ECG for electrolyte-related changes", "Expect metabolic panel to be drawn regularly", "Monitor serum osmolality", "Expect ABG if acid-base imbalance suspected", "Monitor urine specific gravity"],
    management: ["Administer electrolyte replacements as prescribed", "Follow dietary modifications as ordered", "Maintain IV access for replacement therapy", "Implement cardiac monitoring for K+ and Ca2+ abnormalities", "Follow fluid restriction or replacement orders", "Maintain seizure precautions for hyponatremia/hypocalcemia"],
    nursingActions: ["Monitor and report electrolyte results promptly", "NEVER give potassium IV push (lethal)", "Assess for signs of cardiac instability (palpitations, irregular pulse)", "Monitor for neuromuscular changes (weakness, tremors, tetany)", "Report ECG changes (peaked T waves, U waves) immediately", "Educate patients on dietary sources of electrolytes", "Document intake and output strictly"],
    signs: {
      left: ["Hyponatremia: Seizures/Confusion", "Hypokalemia: U-waves/Cramps", "Hypocalcemia: Trousseau/Chvostek"],
      right: ["Hyperkalemia: Peaked T-waves", "Hypernatremia: Thirst/Dry mucus", "Hypercalcemia: Stones/Moans/Groans"]
    },
    medications: [
      { name: "Calcium Gluconate", type: "Mineral", action: "Stabilizes cardiac membrane", sideEffects: "Bradycardia", contra: "Digoxin toxicity", pearl: "First drug for lethal hyperkalemia." },
      { name: "Magnesium Sulfate", type: "Mineral", action: "CNS Depressant", sideEffects: "Loss of DTRs", contra: "Renal failure", pearl: "Standard for Torsades de Pointes." }
    ],
    pearls: ["NEVER give Potassium IV Push (Lethal)", "Monitor for cardiac changes with K+ shifts", "Fluid follows Sodium"],
    quiz: [{ question: "Early sign of hyperkalemia on ECG?", options: ["U-waves", "ST depression", "Peaked T-waves", "Flat P-waves"], correct: 2, rationale: "Tall, peaked T-waves are the earliest indicator of hyperkalemia on an ECG." }]
  },
  "cardiac-meds": {
    title: "Vasoactive & Cardiac Meds",
    cellular: { title: "Hemodynamic Support", content: "Inotropes (contractility), Vasopressors (SVR), and Antiarrhythmics are used to stabilize hemodynamics in critical care. Each class has narrow therapeutic windows and specific monitoring requirements." },
    riskFactors: ["Polypharmacy", "Renal impairment", "Hepatic impairment", "Elderly patients", "Electrolyte imbalances", "Non-adherence to medication regimen", "Drug-drug interactions", "Narrow therapeutic index medications"],
    diagnostics: ["Monitor drug levels (digoxin, theophylline) as ordered", "Monitor electrolytes (K+ affects digoxin toxicity)", "Expect ECG monitoring for cardiac medications", "Monitor renal and hepatic function tests", "Monitor vital signs before and after administration", "Expect CBC if bleeding risk from anticoagulants"],
    management: ["Check apical pulse for 1 full minute before giving digoxin", "Hold beta blockers if HR < 60 or SBP < 100 per protocol", "Administer cardiac medications at scheduled times", "Maintain continuous cardiac monitoring as ordered", "Report signs of drug toxicity immediately", "Follow medication administration safety checks"],
    nursingActions: ["Assess vital signs before administering vasoactive medications", "Report bradycardia (< 60) or hypotension (SBP < 90) before giving dose", "Monitor for signs of digoxin toxicity (yellow halos, nausea, bradycardia)", "Educate patients on medication adherence and side effects", "Monitor for angioedema with ACE inhibitors", "Report signs of drug toxicity to physician promptly", "Document medication administration and patient response"],
    signs: {
      left: ["Beta Blockers: Low HR/BP", "ACE Inhibitors: Cough/Angioedema", "Nitrates: Headache/Hypotension"],
      right: ["Digoxin Toxicity: Yellow halos/Nausea", "Amiodarone: Blue-gray skin", "Epinephrine: Palpitations"]
    },
    medications: [
      { name: "Digoxin", type: "Cardiac Glycoside", action: "Increases contractility", sideEffects: "Nausea/Bradycardia", contra: "Hypokalemia", pearl: "Check apical pulse for 1 min (hold if < 60)." },
      { name: "Amlodipine", type: "CCB", action: "Vasodilation", sideEffects: "Peripheral edema", contra: "Severe HF", pearl: "Monitor for ankle swelling." }
    ],
    pearls: ["Hold Beta Blockers if HR < 50 or SBP < 100", "ACE inhibitors can cause life-threatening angioedema", "Potassium levels affect Digoxin toxicity"],
    quiz: [{ question: "Priority assessment before giving Digoxin?", options: ["Temperature", "Apical pulse for 60 seconds", "Weight", "Respiratory rate"], correct: 1, rationale: "Digoxin can slow the heart rate too much; an apical pulse of <60 requires the dose to be held." }]
  },
  "anticoagulant-safety": {
    title: "Anticoagulation Mastery",
    cellular: { title: "Hemostasis Control", content: "Anticoagulants prevent thrombus formation by interrupting the coagulation cascade. They do not dissolve existing clots but prevent them from growing larger." },
    riskFactors: ["Renal impairment", "Hepatic disease", "Active bleeding history", "Recent surgery", "Falls risk", "Concomitant antiplatelet therapy", "Advanced age", "Thrombocytopenia", "Non-adherence"],
    diagnostics: ["Monitor PT/INR for warfarin therapy", "Monitor aPTT for heparin therapy", "Expect CBC with platelet count to be drawn", "Monitor stool and urine for occult blood", "Expect coagulation panel regularly", "Monitor hemoglobin and hematocrit trends"],
    management: ["Administer anticoagulants at consistent scheduled times", "Maintain fall precautions for patients on anticoagulants", "Apply pressure to venipuncture sites for 5+ minutes", "Avoid IM injections when possible", "Use electric razors instead of straight razors", "Use soft-bristled toothbrush only"],
    nursingActions: ["Monitor for signs of bleeding (bruising, petechiae, gum bleeding, melena)", "Report INR > 3.0 or aPTT above therapeutic range immediately", "Educate on consistent vitamin K intake with warfarin", "Report black tarry stools or blood in urine immediately", "Assess for signs of internal bleeding (abdominal distension, back pain)", "Document all anticoagulant administration times", "Educate on wearing medical alert identification"],
    signs: {
      left: ["Ecchymosis/Bruising", "Hematuria", "Epistaxis (Nosebleed)", "Gingival bleeding"],
      right: ["Hemorrhagic Stroke signs", "Melena", "Hypotension (Internal bleed)", "HIT (Thrombocytopenia)"]
    },
    medications: [
      { name: "Warfarin", type: "Vitamin K Antagonist", action: "Inhibits clotting factors", sideEffects: "Bleeding", contra: "Pregnancy", pearl: "Antidote: Vitamin K. Monitor PT/INR." },
      { name: "Enoxaparin", type: "LMWH", action: "Antithrombin activator", sideEffects: "Injection site bruising", contra: "Active bleeding", pearl: "Don't expel the air bubble in the syringe." }
    ],
    pearls: ["Monitor PTT for Heparin, PT/INR for Warfarin", "Avoid Vitamin K-rich foods (kale/spinach) on Warfarin", "Report black tarry stools immediately"],
    quiz: [{ question: "Antidote for Warfarin toxicity?", options: ["Protamine Sulfate", "Vitamin K", "Naloxone", "Glucagon"], correct: 1, rationale: "Vitamin K is the reversal agent for Warfarin; Protamine is for Heparin." }]
  },
  "insulin-safety": {
    title: "Insulin & Diabetic Safety",
    cellular: { title: "Glucose Metabolism", content: "Insulin facilitates glucose entry into cells. Over-administration or inadequate intake leads to hypoglycemia (neuroglycopenia), a medical emergency." },
    riskFactors: ["Renal impairment (delayed insulin clearance)", "Irregular meal patterns", "Exercise without carb adjustment", "Alcohol use", "Sick days", "Multiple insulin types", "Elderly patients", "Cognitive impairment"],
    diagnostics: ["Monitor blood glucose before meals and at bedtime", "Expect HbA1c to be ordered quarterly", "Monitor serum potassium during DKA treatment", "Expect metabolic panel for acid-base status in DKA", "Monitor urine ketones as ordered", "Expect point-of-care glucose checks per protocol"],
    management: ["Check blood glucose before insulin administration", "Ensure food is available before giving rapid-acting insulin", "Follow sliding scale insulin protocol as ordered", "Rotate injection sites systematically", "Store insulin properly (refrigerate unopened, room temp opened)", "Follow Rule of 15 for hypoglycemia (15g carbs, recheck in 15 min)"],
    nursingActions: ["Monitor for signs of hypoglycemia (shakiness, sweating, confusion)", "Report blood glucose < 70 mg/dL and treat immediately", "Verify insulin type, dose, and expiration before administration", "Monitor for signs of DKA (Kussmaul respirations, fruity breath)", "Educate on sick day management and when to seek care", "Document blood glucose levels and insulin administered", "Report hyperglycemia > 300 mg/dL to physician"],
    signs: {
      left: ["Hypoglycemia: Shakiness", "Sweating/Diaphoresis", "Confusion", "Hunger"],
      right: ["DKA: Kussmaul respirations", "Fruity breath", "Severe Dehydration", "Altered LOC"]
    },
    medications: [
      { name: "Lispro", type: "Rapid-acting", action: "Bolus insulin", sideEffects: "Hypoglycemia", contra: "Hypoglycemia", pearl: "Give within 15 mins of food." },
      { name: "Glargine", type: "Long-acting", action: "Basal coverage", sideEffects: "Hypoglycemia", contra: "Hypoglycemia", pearl: "Cannot be mixed with other insulins." }
    ],
    pearls: ["Check blood glucose before administration", "Rule of 15 for hypoglycemia", "Rotate injection sites"],
    quiz: [{ question: "When to give rapid-acting insulin?", options: ["30 mins before food", "Within 15 mins of eating", "Only at bedtime", "After exercise"], correct: 1, rationale: "Rapid-acting insulin has a quick onset; food must be available immediately to prevent hypoglycemia." }]
  },
  "lithium-toxicity": {
    title: "Lithium & Mood Stabilizers",
    cellular: { title: "Ion Competition", content: "Lithium is a salt that competes with Sodium in the kidneys. Dehydration or low sodium intake causes the kidneys to reabsorb lithium, leading to toxicity." },
    riskFactors: ["Dehydration", "Renal impairment", "Sodium-depleting diuretics (thiazides, loop)", "NSAID use", "ACE inhibitor/ARB use", "Low-sodium diet", "Elderly patients", "Fever/infection (dehydration risk)"],
    diagnostics: ["Expect serum lithium level to be drawn (therapeutic 0.6-1.2 mEq/L)", "Monitor BUN and creatinine for renal function", "Expect BMP to be ordered (electrolytes, especially sodium)", "Expect thyroid function tests (lithium affects thyroid)", "Monitor ECG for cardiac conduction changes", "Expect urine specific gravity to be checked"],
    management: ["Hold lithium dose and notify provider immediately if toxicity suspected", "Maintain adequate hydration (2-3 L/day)", "Maintain normal sodium intake (do not restrict)", "Avoid NSAIDs, which increase lithium levels", "Position safely if confusion or ataxia present", "Prepare for possible hemodialysis if levels > 2.5 mEq/L"],
    nursingActions: ["Monitor for signs of toxicity (coarse tremors, confusion, ataxia, blurred vision)", "Report GI symptoms (nausea, vomiting, diarrhea) as early toxicity signs", "Weigh patient daily to assess hydration status", "Monitor intake and output", "Educate patient on maintaining consistent fluid and sodium intake", "Report changes in mental status or coordination immediately"],
    signs: {
      left: ["Therapeutic range: 0.6 - 1.2 mEq/L", "Mild tremor", "Nausea", "Thirst"],
      right: ["Toxicity (>1.5): Confusion", "Ataxia", "Coarse tremors", "Blurred vision"]
    },
    medications: [{ name: "Lithium Carbonate", type: "Mood Stabilizer", action: "Alters neurotransmitters", sideEffects: "Polyuria/Weight gain", contra: "Renal failure", pearl: "Maintain consistent sodium intake." }],
    pearls: ["Avoid NSAIDs - they increase lithium levels", "Ensure 2-3L fluid intake daily", "Monitor renal function and thyroid"],
    quiz: [{ question: "A patient on lithium has diarrhea and blurred vision. Action?", options: ["Give the next dose", "Increase salt intake", "Hold dose and call provider", "Nothing, these are normal"], correct: 2, rationale: "Diarrhea and blurred vision are signs of toxicity; the drug must be stopped immediately." }]
  },
  "factor-xa-inhibitors": {
    title: "Factor Xa Inhibitors (DOACs)",
    cellular: { title: "Direct Oral Anticoagulants", content: "Direct oral anticoagulants (DOACs) selectively inhibit Factor Xa in the coagulation cascade, preventing conversion of prothrombin to thrombin and subsequent fibrin clot formation. Unlike warfarin, they have predictable pharmacokinetics requiring no routine INR monitoring. Examples: Rivaroxaban (Xarelto), Apixaban (Eliquis), Edoxaban (Savaysa)." },
    riskFactors: ["Renal impairment (affects drug clearance)","Elderly age","Low body weight","Concomitant antiplatelet therapy","Active GI lesions","Recent surgery","Hepatic impairment"],
    diagnostics: ["Monitor for signs of bleeding (bruising, petechiae, blood in stool/urine)","Assess vital signs for unexplained tachycardia or hypotension","Monitor renal function trends as reported","Assess for neurological changes (intracranial bleed)"],
    management: ["Administer medication at consistent times as prescribed","Do not crush or chew extended-release formulations","Report any signs of bleeding immediately","Hold medication and notify provider before procedures","Avoid concurrent NSAIDs and aspirin unless prescribed"],
    nursingActions: ["Assess for signs of bleeding at every interaction","Monitor stool color (melena) and urine color (hematuria)","Educate patient on bleeding precautions (soft toothbrush, electric razor)","Remind patient of consistent dosing schedule","Report unexplained bruising or prolonged bleeding","Teach patient to inform all healthcare providers about anticoagulant use"],
    signs: {
      left: ["Bleeding: Gingival, Epistaxis, Ecchymosis", "Hematuria", "Melena or GI Bleeding", "No Routine Lab Monitoring Needed"],
      right: ["Rivaroxaban: MUST Take With Food (absorption)", "Shorter Half-Life Than Warfarin", "Renal Clearance (dose adjust for kidney function)", "No Dietary Restrictions (unlike Warfarin/Vit K)"]
    },
    medications: [
      { name: "Andexanet Alfa (Andexxa)", type: "Specific Reversal Agent", action: "Recombinant modified Factor Xa that binds and sequesters Factor Xa inhibitors", sideEffects: "Thrombotic events, infusion reactions", contra: "None in life-threatening bleeding", pearl: "Specific reversal agent for Apixaban and Rivaroxaban. Very expensive. Used for life-threatening or uncontrolled bleeding." },
      { name: "Prothrombin Complex Concentrate (PCC)", type: "Alternative Reversal", action: "Provides clotting factors to overcome anticoagulant effect", sideEffects: "Thromboembolism risk", contra: "DIC, HIT", pearl: "Alternative reversal when Andexanet alfa unavailable. Contains Factors II, VII, IX, X. More widely available than Andexanet alfa." }
    ],
    pearls: ["No dietary restrictions needed (unlike warfarin which requires consistent Vitamin K intake)", "Renal dose adjustment required, especially with declining GFR - monitor kidney function", "Shorter half-life than warfarin means missed doses lead to rapid loss of anticoagulant protection", "Avoid concurrent use with strong CYP3A4 inhibitors (ketoconazole, ritonavir)", "Assess for bleeding clinically - do NOT monitor with PT/INR (not reliable for DOACs)"],
    quiz: [{ question: "What is the key advantage of Factor Xa inhibitors over Warfarin?", options: ["They are cheaper", "No routine lab monitoring (INR) needed and no dietary restrictions", "They work faster in emergencies", "They have no bleeding risk"], correct: 1, rationale: "Factor Xa inhibitors have predictable pharmacokinetics that eliminate the need for routine INR monitoring and have no dietary restrictions (no Vitamin K concerns). Warfarin requires frequent INR checks, dose adjustments, and consistent Vitamin K intake, creating significant patient burden." }]
  },
};
