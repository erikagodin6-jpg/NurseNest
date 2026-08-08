import type { LessonContent } from "./types";

export const respiratoryRnAlpha1FullLessons: Record<string, LessonContent> = {
  "alpha-1-antitrypsin-deficiency-rn-ca": {
    title: "Alpha-1 Antitrypsin Deficiency — RN Canada",
    cellular: {
      title: "Protease–Antiprotease Imbalance and Multisystem Disease",
      content: "Alpha-1 antitrypsin deficiency (A1ATD) is an inherited SERPINA1 disorder. Alpha-1 antitrypsin is produced mainly in the liver and protects lung elastin by inhibiting neutrophil elastase. Severe deficiency leaves alveolar tissue vulnerable to proteolytic destruction, producing emphysema that may be early, severe, or disproportionate to smoking exposure. Tobacco smoke and inhaled occupational irritants accelerate injury. Some abnormal A1AT variants also polymerize and accumulate in hepatocytes, causing chronic liver injury even though circulating A1AT is low. The nursing flow is: recognize who should be tested → confirm the diagnosis/genetic context → protect the lungs and liver → optimize COPD care → identify selected augmentation-therapy candidates → monitor infusion and disease complications → support family counselling/testing."
    },
    riskFactors: [
      "COPD/emphysema at any age under current 2025 Canadian Thoracic Society testing guidance",
      "Adult-onset asthma with persistent airflow obstruction",
      "Unexplained bronchiectasis",
      "Known abnormal SERPINA1 variant or first-degree relative with A1ATD",
      "Tobacco smoke, second-hand smoke, biomass, dust, fumes, or occupational respiratory irritants",
      "Unexplained chronic liver disease"
    ],
    diagnostics: [
      "Current CTS guidance supports A1ATD testing in all patients with COPD at diagnosis, persistent obstructive adult-onset asthma, and unexplained bronchiectasis",
      "High clinical suspicion can justify SERPINA1 DNA sequencing as an initial test; moderate suspicion may begin with serum A1AT level followed by genetic confirmation when low",
      "Assess spirometry, symptoms, exacerbation history, CT emphysema pattern when indicated, oxygenation, and exercise tolerance",
      "Monitor liver enzymes and clinical signs of chronic liver disease; evaluate jaundice, ascites, encephalopathy, or other hepatic decompensation urgently",
      "After an abnormal A1AT gene is identified, first-degree relatives should receive genetic counselling and be offered testing"
    ],
    management: [
      "Complete smoking cessation and avoidance of harmful inhaled occupational/environmental exposures",
      "Continue evidence-based COPD management: bronchodilators, vaccination, pulmonary rehabilitation, activity, exacerbation prevention, and oxygen when clinically indicated",
      "Specialist assessment for A1AT augmentation therapy when severe deficiency, emphysema, smoking status, lung-function criteria, genotype, and optimal COPD care meet current Canadian criteria",
      "Monitor liver disease and use liver-protective counselling including avoidance of unnecessary hepatotoxic exposure and indicated hepatitis vaccination",
      "Consider transplant referral when advanced lung or liver disease warrants it"
    ],
    nursingActions: [
      "Verify the patient understands that augmentation therapy may slow further lung damage but does not reverse established emphysema",
      "Monitor augmentation infusions for hypersensitivity/anaphylaxis and follow product-specific precautions",
      "Reinforce smoking cessation and workplace/environmental exposure reduction at every visit",
      "Assess inhaler technique, pulmonary-rehabilitation participation, nutrition, exercise tolerance, exacerbation burden, and oxygen needs",
      "Promote genetic counselling/testing for biologic relatives without presenting inheritance outcomes as deterministic",
      "Escalate signs of acute respiratory failure or hepatic decompensation"
    ],
    signs: {
      left: [
        "Progressive exertional dyspnea",
        "Obstructive spirometry/emphysema",
        "Reduced exercise tolerance",
        "Possible basilar-predominant panacinar emphysema",
        "Family history of COPD/emphysema or liver disease"
      ],
      right: [
        "Rapid oxygen/support escalation",
        "Acute respiratory acidosis or severe exacerbation",
        "Jaundice, ascites, GI bleeding, or encephalopathy",
        "Anaphylaxis during plasma-derived augmentation",
        "Rapid functional decline or advanced organ failure"
      ]
    },
    medications: [
      {
        name: "Alpha-1 Proteinase Inhibitor (IV augmentation)",
        type: "Plasma-Derived Protein Replacement",
        action: "Raises circulating and pulmonary A1AT levels to improve antiprotease protection in selected patients with severe deficiency and emphysema.",
        sideEffects: "Infusion reactions, fatigue/flu-like symptoms, rare serious hypersensitivity/anaphylaxis.",
        contra: "Eligibility and product contraindications are specialist/product specific; augmentation is not routine for isolated liver disease or unconfirmed deficiency.",
        pearl: "Canadian 2025 CTS criteria are more specific than the phrase 'low alpha-1.' Confirm genotype, severe deficiency, emphysema, smoking status, lung function, and optimal COPD therapy."
      },
      {
        name: "COPD maintenance therapies",
        type: "Bronchodilator / Guideline-Based COPD Therapy",
        action: "Treats airflow obstruction, symptoms, and exacerbation risk while A1AT-specific care addresses the inherited cause.",
        sideEffects: "Depend on agent; monitor beta-agonist, antimuscarinic, corticosteroid, and oxygen-therapy risks as applicable.",
        contra: "Agent specific.",
        pearl: "A genetic diagnosis does not replace standard COPD care."
      }
    ],
    pearls: [
      "2025 CTS guidance widened A1ATD testing: all COPD at diagnosis, persistent obstructive adult-onset asthma, and unexplained bronchiectasis are included.",
      "Low serum A1AT is not the entire diagnosis; genotype-aware confirmation matters for treatment and family counselling.",
      "Augmentation protects remaining lung tissue; it does not regenerate destroyed alveoli.",
      "A1ATD can injure lungs because too little functional protein reaches them and injure liver because abnormal protein accumulates in hepatocytes."
    ],
    preTest: [{ question: "Which Canadian patient should now be tested for A1ATD?", options: ["Every patient newly diagnosed with COPD", "Only smokers under 40", "Only transplant candidates", "Only patients with a known affected parent"], correct: 0, rationale: "The 2025 CTS update conditionally recommends A1ATD testing in all individuals with COPD at diagnosis." }],
    quiz: [
      { question: "What is the primary lung-protective role of A1AT?", options: ["It stimulates mucus production", "It inhibits neutrophil elastase", "It replaces surfactant", "It blocks histamine"], correct: 1, rationale: "A1AT is an antiprotease that limits neutrophil-elastase injury to lung elastin." },
      { question: "Which statement about augmentation therapy is correct?", options: ["It reverses emphysema", "It cures liver disease", "It may slow further lung destruction in selected severe-deficiency emphysema patients", "It replaces all COPD therapy"], correct: 2, rationale: "Augmentation is selected lung-directed protein replacement added to optimal COPD care; it is not curative." }
    ],
    postTest: [{ question: "Which family action follows identification of an abnormal A1AT gene?", options: ["No family discussion", "Test spouses only", "Assume all children have severe disease", "Offer first-degree relatives genetic counselling/testing"], correct: 3, rationale: "Current CTS guidance supports genetic counselling and testing for first-degree relatives after an abnormal gene is identified." }]
  },

  "alpha-1-antitrypsin-deficiency-rn-us": {
    title: "Alpha-1 Antitrypsin Deficiency — RN U.S.",
    cellular: {
      title: "Inherited Antiprotease Deficiency: Lung and Liver Consequences",
      content: "Alpha-1 antitrypsin deficiency is an inherited SERPINA1 disorder in which insufficient functional A1AT leaves lung elastin exposed to neutrophil elastase. The result can be early or disproportionate emphysema, especially when smoking or occupational exposures accelerate injury. Abnormal protein can also accumulate in hepatocytes and cause chronic liver disease. U.S. nursing care focuses on broad case finding in COPD/emphysema and other recognized risk groups, genetic/family counselling, complete smoke avoidance, standard COPD care, careful selection and monitoring of plasma-derived augmentation therapy for appropriate emphysema, and surveillance for lung/liver complications."
    },
    riskFactors: [
      "COPD or emphysema",
      "Incompletely reversible/persistent obstructive asthma",
      "Unexplained chronic liver disease",
      "Necrotizing panniculitis",
      "Biologic relative with A1ATD or abnormal SERPINA1 variant",
      "Smoking and occupational/environmental inhaled irritants"
    ],
    diagnostics: [
      "Measure A1AT and use genotype/phenotype testing as appropriate; serum level alone does not always define the inherited variant",
      "Assess COPD/emphysema severity with spirometry, symptoms, exacerbations, oxygenation, and imaging when clinically indicated",
      "Evaluate liver disease when jaundice, hepatomegaly, abnormal liver tests, ascites, or other hepatic clues occur",
      "Offer genetic counselling/testing to biologic relatives after a diagnosis",
      "Do not wait for a stereotypical young nonsmoker before testing COPD/emphysema"
    ],
    management: [
      "Complete tobacco cessation and avoidance of second-hand smoke, dust, fumes, and other preventable lung irritants",
      "Continue standard COPD therapy and prevention: bronchodilators, vaccines, pulmonary rehabilitation, activity, and oxygen when indicated",
      "Specialist evaluation for FDA-approved IV A1AT augmentation therapy when severe deficiency with emphysema meets product/clinical criteria",
      "Monitor liver disease and protect against avoidable hepatic insults",
      "Use timely lung/liver transplant referral when advanced organ disease warrants evaluation"
    ],
    nursingActions: [
      "Teach that augmentation raises protective A1AT but does not edit SERPINA1 or rebuild destroyed alveoli",
      "Review product-specific hypersensitivity and IgA-related precautions before plasma-derived augmentation and monitor each infusion",
      "Reinforce tobacco cessation and exposure reduction",
      "Assess COPD symptom control, inhaler technique, rehabilitation, oxygen needs, exacerbations, and liver symptoms",
      "Support family genetic counselling/testing",
      "Escalate anaphylaxis, acute respiratory failure, or liver decompensation immediately"
    ],
    signs: {
      left: ["Early/disproportionate emphysema", "Progressive dyspnea", "Obstructive spirometry", "Family history", "Possible chronic liver disease"],
      right: ["Respiratory failure", "Severe exacerbation", "Jaundice/ascites/encephalopathy", "Serious infusion hypersensitivity", "Advanced organ failure"]
    },
    medications: [
      {
        name: "Alpha-1 Proteinase Inhibitor (IV augmentation)",
        type: "Plasma-Derived Protein Replacement",
        action: "Raises A1AT levels to improve antiprotease protection in selected severe-deficiency patients with emphysema.",
        sideEffects: "Fatigue, flu-like symptoms, infusion reactions, rare severe hypersensitivity.",
        contra: "Product specific; severe IgA deficiency with relevant antibodies can increase hypersensitivity risk. Not a treatment for isolated A1ATD liver disease.",
        pearl: "Weekly augmentation is chronic protective therapy, not a cure or bronchodilator."
      },
      {
        name: "COPD maintenance therapy",
        type: "Guideline-Based COPD Care",
        action: "Treats airflow obstruction and exacerbation risk in parallel with A1AT-specific care.",
        sideEffects: "Agent specific.",
        contra: "Agent specific.",
        pearl: "Treat the phenotype and the genotype."
      }
    ],
    pearls: [
      "Current U.S. guidance recommends testing people with COPD/emphysema and other recognized risk groups rather than only classic young nonsmokers.",
      "Family testing and counselling are major benefits of making the diagnosis.",
      "Augmentation is used for selected A1ATD emphysema; it does not remove abnormal protein from the liver.",
      "Smoking avoidance is one of the highest-value interventions at any disease stage."
    ],
    preTest: [{ question: "Which U.S. patient is a standard A1ATD testing candidate?", options: ["An adult with COPD/emphysema", "Only a patient awaiting transplant", "Only a young nonsmoker", "No one without liver disease"], correct: 0, rationale: "Current U.S. guidance includes COPD/emphysema among core testing populations." }],
    quiz: [
      { question: "Why does severe A1ATD cause emphysema?", options: ["Reduced antiprotease protection allows neutrophil elastase injury", "Excess surfactant", "Histamine excess only", "Pleural fluid accumulation"], correct: 0, rationale: "A1AT normally limits neutrophil-elastase injury to alveolar elastin." },
      { question: "Which statement about augmentation therapy is correct?", options: ["It cures the genetic disorder", "It may protect remaining lung tissue in selected severe-deficiency emphysema patients", "It treats isolated liver disease", "It replaces smoking cessation"], correct: 1, rationale: "Augmentation is lung-directed replacement therapy for selected patients; it is not curative." }
    ],
    postTest: [{ question: "Which finding during augmentation infusion requires emergency action?", options: ["Mild boredom", "Improved appetite", "Hives, wheeze, and hypotension", "Stable vital signs"], correct: 2, rationale: "Hives with bronchospasm and hypotension indicate serious hypersensitivity/anaphylaxis." }]
  }
};
