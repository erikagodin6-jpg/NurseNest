import type { LessonContent } from "./types";

export const respiratoryRnRadiationPneumonitisFullLessons: Record<string, LessonContent> = {
  "radiation-pneumonitis-rn-ca-2026": {
    title: "Radiation Pneumonitis — RN Canada",
    cellular: {
      title: "Radiation-Induced Alveolar and Interstitial Injury",
      content: "Radiation pneumonitis (RP) is an inflammatory lung injury after thoracic radiotherapy. Ionizing radiation damages alveolar epithelial and endothelial cells, activates inflammatory signalling, disrupts the alveolar-capillary barrier, and can produce interstitial/alveolar inflammation followed later by fibrotic remodelling. Modern conformal radiotherapy reduces but does not eliminate risk. RP is a diagnosis of exclusion: the RN should never assume that new cough or dyspnea after radiation is automatically RP because infection, pulmonary embolism, heart failure, tumour progression, aspiration, COPD/asthma exacerbation, and systemic-therapy pneumonitis can present similarly. Combined or sequential immune-checkpoint therapy can make attribution particularly difficult. The safest flow is: assess stability and oxygenation → identify timing/radiation field/systemic therapies → evaluate competing diagnoses → support prescribed anti-inflammatory and respiratory treatment → monitor steroid toxicity and rebound → follow for chronic fibrosis and functional decline."
    },
    riskFactors: [
      "Greater irradiated lung volume or higher lung dose exposure",
      "Pre-existing interstitial lung disease or idiopathic pulmonary fibrosis",
      "Concurrent or sequential systemic therapies that increase pneumonitis risk, including some immune-checkpoint therapies",
      "Prior thoracic radiation or significant underlying lung disease",
      "Older age/comorbidity and reduced pulmonary reserve",
      "Smoking history does not reliably exclude RP and should not be used as reassurance"
    ],
    diagnostics: [
      "Trend respiratory rate, work of breathing, SpO2/oxygen requirement, temperature, hemodynamics, and mental status",
      "Review radiotherapy site, dose/field, timing, and concurrent/sequential anticancer therapies",
      "Chest CT is commonly used; early inflammatory changes may conform to the radiation field but imaging is not diagnostic in isolation",
      "Investigate infection, PE, heart failure, aspiration, tumour progression, and immune-checkpoint pneumonitis when clinically plausible",
      "Use CBC, cultures, viral testing, cardiac/PE evaluation, bronchoscopy/BAL, or other testing selectively according to the differential",
      "Trend symptoms, oxygenation, pulmonary function and imaging during recovery or evolution to fibrosis"
    ],
    management: [
      "Mild/asymptomatic radiographic change may be observed with close clinical follow-up rather than automatically treated",
      "Clinically significant symptomatic RP is commonly treated with systemic corticosteroids under oncology/pulmonary direction; exact dose and taper are individualized rather than a one-size-fits-all memorized regimen",
      "Severe RP with hypoxemia or respiratory failure requires hospital-level respiratory support and urgent specialist management; IV corticosteroids may be used in severe disease",
      "Treat or exclude competing infection before escalating immunosuppression when clinically indicated",
      "Use oxygen and other respiratory support according to physiologic need",
      "For prolonged/high-dose corticosteroid courses, monitor glucose, infection, GI, bone, mood/sleep and opportunistic-infection prophylaxis needs according to the care plan"
    ],
    nursingActions: [
      "Escalate rapidly rising oxygen requirement, severe work of breathing, new confusion, hypotension, or inability to maintain gas exchange",
      "Do not delay emergency evaluation while waiting for a perfect radiographic diagnosis",
      "Ask explicitly about immune-checkpoint inhibitors and other systemic anticancer drugs because treatment attribution changes management",
      "Monitor response to corticosteroids and report rebound symptoms during taper rather than accelerating the taper independently",
      "Teach the patient to report new/worsening dyspnea, dry cough, fever, chest pain, hemoptysis, or reduced exercise tolerance promptly",
      "Coordinate radiation oncology, medical oncology, pulmonology, respiratory therapy and infection-management input when the diagnosis is uncertain"
    ],
    signs: {
      left: [
        "New dry cough after thoracic radiation",
        "Exertional dyspnea",
        "Low-grade fever or chest discomfort",
        "New inflammatory CT change in/near the irradiated field",
        "Mild oxygen requirement with preserved hemodynamics"
      ],
      right: [
        "Rapidly increasing oxygen requirement",
        "Severe tachypnea or respiratory fatigue",
        "Altered mental status or hemodynamic instability",
        "Diffuse/bilateral progression or respiratory failure",
        "Clinical features suggesting infection, PE, heart failure, or another competing emergency"
      ]
    },
    medications: [
      {
        name: "Systemic corticosteroid",
        type: "Anti-Inflammatory Immunosuppressive Therapy",
        action: "Suppresses clinically significant radiation-induced pulmonary inflammation when RP is sufficiently symptomatic/severe to warrant treatment.",
        sideEffects: "Hyperglycemia, infection risk, mood/sleep changes, GI effects, myopathy, osteoporosis and adrenal suppression with prolonged courses.",
        contra: "Risk-benefit is individualized, especially when uncontrolled infection is possible; steroids should not substitute for evaluating a dangerous alternative diagnosis.",
        pearl: "Current expert guidance does not support memorizing one universal RP dose/taper for every patient. Follow the oncology/pulmonary plan and monitor for rebound during taper."
      },
      {
        name: "Supplemental oxygen / respiratory support",
        type: "Supportive Therapy",
        action: "Treats hypoxemia and reduces physiologic stress while the inflammatory process and alternative diagnoses are managed.",
        sideEffects: "Device-related injury and hyperoxia if excessive; escalation failure if support is not reassessed.",
        contra: "No absolute contraindication when clinically significant hypoxemia is present.",
        pearl: "A rising oxygen requirement is itself a deterioration signal even if the displayed saturation remains temporarily acceptable."
      }
    ],
    pearls: [
      "RP is a diagnosis of exclusion, not a label applied to every post-radiation cough.",
      "Pre-existing ILD/IPF substantially raises the stakes of thoracic-radiation lung injury.",
      "Immune-checkpoint pneumonitis can overlap clinically and radiographically with RP; medication history matters.",
      "Avoid rigid dose/taper memorization: monitor clinical response and rebound under the prescribed plan."
    ],
    preTest: [{ question: "A patient 10 weeks after thoracic RT develops dyspnea and fever. What is the safest first assumption?", options: ["It must be RP", "A differential including RP, infection, PE, heart failure and treatment-related pneumonitis is required", "It is anxiety", "No evaluation is needed"], correct: 1, rationale: "RP is a diagnosis of exclusion; common and dangerous alternatives must be considered." }],
    quiz: [
      { question: "Which change most strongly indicates severe deterioration?", options: ["Stable dry cough", "Mild fatigue", "Rapidly rising oxygen requirement with confusion", "Unchanged CT scar"], correct: 2, rationale: "Increasing support need plus altered mentation suggests impending respiratory failure." },
      { question: "Which steroid teaching is safest?", options: ["All patients need the same dose", "Stop abruptly when cough improves", "Steroids eliminate the need to exclude infection", "Follow the individualized plan and report rebound during taper"], correct: 3, rationale: "Treatment intensity and taper are individualized; rebound and toxicity require monitoring." }
    ],
    postTest: [{ question: "Why ask about immune-checkpoint inhibitors?", options: ["They can cause pneumonitis that may mimic or overlap RP", "They prevent all lung toxicity", "They diagnose PE", "They eliminate infection risk"], correct: 0, rationale: "Checkpoint-inhibitor pneumonitis can complicate diagnosis and management after thoracic radiation." }]
  },

  "radiation-pneumonitis-rn-us-2026": {
    title: "Radiation Pneumonitis — RN U.S.",
    cellular: {
      title: "Post-Radiotherapy Inflammatory Lung Injury",
      content: "Radiation pneumonitis is an inflammatory toxicity after thoracic radiotherapy caused by radiation injury to alveolar epithelial cells, capillary endothelium and the interstitium. Cytokine signalling and barrier injury produce inflammatory opacities, impaired diffusion and sometimes hypoxemia; later remodelling can become radiation fibrosis. The diagnosis is clinical and radiographic but remains one of exclusion. New dyspnea after lung or mediastinal radiation may instead represent bacterial/viral infection, pulmonary embolism, heart failure, tumour progression, aspiration, COPD/asthma exacerbation or drug-induced pneumonitis. Immune-checkpoint therapy is a major modern confounder. RN care prioritizes physiologic stabilization, complete cancer-treatment history, differential-based diagnostics, prescribed anti-inflammatory/supportive care, toxicity surveillance and longitudinal recovery/fibrosis monitoring."
    },
    riskFactors: [
      "Higher irradiated lung dose/volume",
      "Pre-existing ILD/IPF or reduced pulmonary reserve",
      "Prior thoracic RT",
      "Concurrent/sequential systemic therapies with pneumonitis risk",
      "Complex combined-modality lung cancer treatment",
      "Comorbid cardiopulmonary disease"
    ],
    diagnostics: [
      "Assess respiratory stability first: SpO2/support requirement, respiratory effort, hemodynamics and mentation",
      "Review radiation field/timing plus chemotherapy, targeted therapy and immune-checkpoint exposure",
      "Use chest CT and compare abnormalities with the radiation distribution while recognizing that overlap patterns occur",
      "Exclude infection, PE, pulmonary edema, tumour progression and other treatment toxicities as clinically indicated",
      "Use bronchoscopy/BAL or other testing selectively when diagnosis remains uncertain or infection is a serious concern",
      "Trend oxygen requirement, symptoms, PFTs and imaging through recovery/fibrotic evolution"
    ],
    management: [
      "Observe selected asymptomatic/minimally symptomatic radiographic RP with close follow-up",
      "Treat clinically meaningful symptomatic disease with systemic corticosteroids when prescribed; dose and taper depend on severity, response and competing diagnoses",
      "Admit/escalate severe hypoxemic disease for high-acuity respiratory support and multidisciplinary treatment; IV corticosteroids may be used for severe disease",
      "Address infection and other alternative diagnoses instead of assuming all post-RT infiltrates are inflammatory",
      "Use oxygen/support according to physiologic need and reassess frequently",
      "Manage prolonged corticosteroid toxicities and prophylaxis according to duration/intensity and patient risk"
    ],
    nursingActions: [
      "Escalate rising oxygen need, respiratory fatigue, altered mental status or hemodynamic compromise immediately",
      "Document complete oncology treatment chronology to help distinguish radiation from immune-therapy or other drug toxicity",
      "Monitor glucose, infection, mood, GI symptoms and muscle weakness during systemic corticosteroid therapy",
      "Report recurrent cough/dyspnea during taper because rebound may require reassessment",
      "Teach prompt reporting of new dyspnea, cough, fever, pleuritic pain, hemoptysis or exercise decline",
      "Coordinate radiation oncology, medical oncology and pulmonary evaluation when attribution is uncertain"
    ],
    signs: {
      left: ["Subacute dry cough", "Exertional dyspnea", "Low fever", "Radiation-distribution inflammatory opacity", "Mild hypoxemia"],
      right: ["Rapid support escalation", "Severe hypoxemia", "Respiratory fatigue", "Confusion/hypotension", "Features of PE, infection, edema or other emergency"]
    },
    medications: [
      { name: "Systemic corticosteroid", type: "Anti-Inflammatory Therapy", action: "Suppresses symptomatic inflammatory RP when indicated.", sideEffects: "Hyperglycemia, infection, psychiatric/sleep effects, GI toxicity, myopathy, osteoporosis, adrenal suppression.", contra: "Use requires clinical risk-benefit assessment and evaluation of infection/alternate diagnoses.", pearl: "Severity and response guide dosing/taper; there is no single NCLEX-safe universal milligram regimen for every RP patient." },
      { name: "Supplemental oxygen / ventilatory support", type: "Supportive Therapy", action: "Treats hypoxemia during inflammatory lung injury or competing pulmonary disease.", sideEffects: "Hyperoxia/device complications and delayed escalation if failure is not recognized.", contra: "None when clinically significant hypoxemia requires treatment.", pearl: "Trend the support requirement, not only the saturation number." }
    ],
    pearls: [
      "Radiation pneumonitis is a diagnosis of exclusion.",
      "Checkpoint-inhibitor pneumonitis is a modern high-yield mimic/overlap syndrome.",
      "Pre-existing fibrotic ILD increases risk and reduces reserve.",
      "Steroid therapy is individualized; report rebound during taper and monitor immunosuppression toxicity."
    ],
    preTest: [{ question: "A post-RT patient develops new dyspnea. What must the nurse avoid?", options: ["Assuming every infiltrate is RP without evaluating alternatives", "Checking oxygen requirement", "Reviewing systemic therapies", "Escalating instability"], correct: 0, rationale: "RP remains a diagnosis of exclusion." }],
    quiz: [
      { question: "Which oncology history most complicates attribution of new pneumonitis?", options: ["Remote appendectomy", "Immune-checkpoint inhibitor therapy", "Seasonal vitamins", "Eyeglasses"], correct: 1, rationale: "Checkpoint inhibitors can cause pneumonitis that overlaps with RP." },
      { question: "Which treatment principle is correct?", options: ["Every CT change needs steroids", "Steroid dose is identical for all patients", "Treatment intensity follows symptoms/severity and alternative diagnoses", "Oxygen should be withheld"], correct: 2, rationale: "Management depends on severity and diagnostic context." }
    ],
    postTest: [{ question: "Which finding requires immediate escalation?", options: ["Stable mild cough", "Unchanged fatigue", "Stable room-air saturation", "Rising oxygen requirement with respiratory fatigue"], correct: 3, rationale: "Increasing support need and fatigue indicate severe deterioration." }]
  }
};
