import type { ExamQuestion } from "./types";

export type RnRespiratoryRegion = "CAN" | "US";

export interface RegionalRnRespiratoryQuestion extends ExamQuestion {
  regionScope: RnRespiratoryRegion;
  countryCode: "CA" | "US";
  licensingBody: "NCSBN";
  topic: string;
  difficulty: 2 | 3 | 4;
  cognitiveLevel: "application" | "analysis";
}

// RN respiratory questions where the expected answer depends on national guidance,
// terminology, diagnostic workflow, or treatment framework. These must never be
// served cross-region without the qbank region filter.
export const rnRespiratoryRegionalBankBatch1Questions: RegionalRnRespiratoryQuestion[] = [
  // ==================== CANADA ====================
  {
    q: "A Canadian RN receives a patient who is being evaluated for respiratory tuberculosis. Which infection-control action should occur immediately?",
    o: [
      "Wait for the first sputum smear before initiating precautions",
      "Initiate airborne precautions while the evaluation is underway",
      "Use droplet precautions only",
      "Use contact precautions until chest imaging is completed"
    ],
    a: 1,
    r: "Canadian Tuberculosis Standards recommend immediate airborne precautions for people with, or being evaluated for, respiratory TB. Waiting for microbiologic confirmation can expose patients and health-care workers during the period when TB is still only suspected.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — Canadian Standards",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A hospitalized Canadian patient being evaluated for respiratory TB must leave the airborne infection isolation room for an essential CT scan. What should the nurse do?",
    o: [
      "Have the patient wear a medical mask during transport",
      "Have the patient wear a fit-tested respirator instead of a medical mask",
      "Remove all respiratory precautions during transport",
      "Delay all medically necessary testing until TB is excluded"
    ],
    a: 0,
    r: "Under Canadian TB infection-prevention guidance, a patient with or being evaluated for respiratory TB may leave the isolation room for medical reasons when necessary but should wear a medical mask for source control during transport.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — Canadian Standards",
    difficulty: 2,
    cognitiveLevel: "application"
  },
  {
    q: "Which respiratory protection is appropriate for a Canadian health-care worker providing direct care to a patient being evaluated for respiratory TB?",
    o: [
      "A medical mask only",
      "A Health Canada-approved respirator with filtration equivalent to or greater than N95, used according to the respiratory-protection program",
      "A face shield without a respirator",
      "No respiratory protection until the sputum smear is positive"
    ],
    a: 1,
    r: "Canadian Tuberculosis Standards specify respirator use for health-care workers in direct contact with patients who have or are being evaluated for respiratory TB. Medical masks are source-control devices for patients and do not provide equivalent occupational respiratory protection.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — Canadian Standards",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A Canadian adult is being investigated for pulmonary TB and can produce sputum. Which collection schedule best reflects the Canadian Tuberculosis Standards?",
    o: [
      "Three sputum specimens on the same day, separated by at least 1 hour",
      "One sputum specimen only if the chest x-ray is abnormal",
      "Three specimens collected exactly 24 hours apart",
      "One specimen every week for 3 weeks"
    ],
    a: 0,
    r: "Canadian guidance recommends at least three sputum specimens for suspected pulmonary TB and permits collection of all three on the same day when they are separated by at least one hour.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — Canadian Standards",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A Canadian hospitalized patient has smear-positive, rifampin-susceptible pulmonary TB. Which combination supports discontinuation of airborne precautions under the Canadian minimum criteria?",
    o: [
      "Twenty-four hours of treatment and no fever",
      "Clinical improvement, at least 2 weeks of effective therapy, and 3 consecutive negative AFB sputum smears",
      "A single negative sputum smear after treatment begins",
      "Normal oxygen saturation and no hemoptysis"
    ],
    a: 1,
    r: "For smear-positive rifampin-susceptible pulmonary TB, Canadian guidance uses clinical improvement plus a minimum of two weeks of effective therapy and three consecutive negative AFB sputum smears as the standard minimum de-isolation criteria, subject to expert and infection-control judgment.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — Canadian Standards",
    difficulty: 4,
    cognitiveLevel: "analysis"
  },
  {
    q: "A 26-year-old Canadian with confirmed asthma is well controlled using PRN salbutamol and is assessed as lower risk for exacerbations. Which statement best reflects the current CTS mild-asthma framework?",
    o: [
      "PRN salbutamol is the only acceptable regimen",
      "Options can include continuing PRN SABA, daily ICS plus PRN SABA, or PRN budesonide/formoterol after individualized discussion",
      "Daily oral prednisone is preferred",
      "All inhaled corticosteroids should be stopped"
    ],
    a: 1,
    r: "For people at least 12 years old with well-controlled asthma and lower exacerbation risk, the current CTS focused mild-asthma guideline allows more than one evidence-based option, including continued PRN SABA, daily ICS plus PRN SABA, or PRN budesonide/formoterol, with patient preference and risk considered.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Asthma — Canadian CTS",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A 34-year-old Canadian with asthma remains poorly controlled on PRN salbutamol. Which teaching point is most consistent with the CTS approach?",
    o: [
      "Continue SABA-only therapy indefinitely regardless of control",
      "Anti-inflammatory controller therapy should be added rather than relying on PRN SABA alone",
      "Stop all reliever therapy",
      "Use an antibiotic whenever wheezing occurs"
    ],
    a: 1,
    r: "CTS guidance recommends stepping away from SABA-only treatment when asthma is poorly controlled. Daily inhaled corticosteroid therapy with a PRN reliever is a core option; selected patients at least 12 years old with poor adherence despite substantial education may use PRN budesonide/formoterol according to the guideline framework.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Asthma — Canadian CTS",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A Canadian RN reviews an asthma discharge plan that lists 'albuterol' in a U.S.-authored handout. Which medication name should the nurse recognize as the commonly used Canadian generic name for the same short-acting beta2-agonist?",
    o: ["Salbutamol", "Formoterol", "Tiotropium", "Montelukast"],
    a: 0,
    r: "Albuterol and salbutamol refer to the same short-acting beta2-agonist. Canadian educational materials and formularies commonly use the name salbutamol, so learners should recognize both names without treating them as different drugs.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Respiratory Pharmacology — Canadian Terminology",
    difficulty: 2,
    cognitiveLevel: "application"
  },
  {
    q: "Which findings should prompt a Canadian RN to question whether a patient on PRN reliever-only asthma therapy is truly low risk? Select all that apply.",
    o: [
      "Previous severe exacerbation",
      "Poor symptom control",
      "History of near-fatal asthma",
      "Good adherence with no exacerbation history and stable control",
      "Psychosocial factors that increase risk of fatal or near-fatal asthma"
    ],
    a: 0,
    ca: [0, 1, 2, 4],
    t: "sata",
    r: "CTS treatment choices for very mild and mild asthma depend not only on symptom frequency but also on exacerbation risk. Prior severe events, poor control, near-fatal asthma, and important behavioural or psychosocial risk factors should move the nurse away from assuming a low-risk profile.",
    s: "Respiratory",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    topic: "Asthma — Canadian CTS",
    difficulty: 4,
    cognitiveLevel: "analysis"
  },

  // ==================== UNITED STATES ====================
  {
    q: "A U.S. patient is being evaluated for pulmonary TB and can produce sputum. Which collection schedule is consistent with current CDC diagnostic guidance?",
    o: [
      "At least 3 consecutive sputum specimens collected 8 to 24 hours apart, with at least one early-morning specimen",
      "Three specimens on the same day exactly 1 hour apart",
      "One specimen is sufficient for all patients",
      "Collect sputum only after antibiotics have been completed"
    ],
    a: 0,
    r: "Current CDC guidance for presumed pulmonary TB calls for at least three consecutive sputum specimens collected 8 to 24 hours apart, with at least one early-morning specimen. This timing differs from the current Canadian same-day collection recommendation.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — U.S. CDC",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A U.S. hospital admits a patient with suspected infectious pulmonary TB. Which room placement is appropriate?",
    o: [
      "Airborne infection isolation room",
      "Positive-pressure protective-environment room",
      "Semi-private room with another patient who has pneumonia",
      "Any room as long as the curtain is closed"
    ],
    a: 0,
    r: "CDC infection-control guidance calls for prompt airborne precautions and appropriate airborne infection isolation for presumed or confirmed infectious pulmonary TB.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — U.S. CDC",
    difficulty: 2,
    cognitiveLevel: "application"
  },
  {
    q: "Which PPE should a U.S. RN use when entering the room of a patient with suspected infectious pulmonary TB?",
    o: [
      "Fit-tested NIOSH-approved N95 or higher-level respirator",
      "Standard surgical mask only",
      "Face shield only",
      "Sterile gloves only"
    ],
    a: 0,
    r: "CDC infection-control guidance recommends a fit-tested NIOSH-approved N95 or higher-level respirator for health-care personnel entering the room of a patient with suspected or confirmed infectious pulmonary TB.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — U.S. CDC",
    difficulty: 2,
    cognitiveLevel: "application"
  },
  {
    q: "A U.S. patient with suspected infectious pulmonary TB must be transported for a medically necessary test. What source-control measure should the nurse use?",
    o: [
      "Place a mask on the patient during transport and follow airborne-precaution transport procedures",
      "Have the patient remove all masks during transport",
      "Place only a face shield on the patient",
      "No source control is necessary outside the patient room"
    ],
    a: 0,
    r: "CDC transmission-based precautions limit transport to medically necessary purposes and use patient masking/source control during movement outside an airborne isolation room.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — U.S. CDC",
    difficulty: 2,
    cognitiveLevel: "application"
  },
  {
    q: "Which statement by a U.S. nursing student about latent TB infection requires correction?",
    o: [
      "A person with latent TB infection can transmit TB whenever they cough",
      "Latent TB infection can progress to active TB disease",
      "Treatment of latent TB infection can reduce later progression to active disease",
      "Latent TB infection is different from active contagious pulmonary TB"
    ],
    a: 0,
    r: "CDC states that people with inactive or latent TB infection cannot spread TB germs to others. They remain at risk for later active disease, which is why preventive treatment may be offered.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Tuberculosis — U.S. CDC",
    difficulty: 2,
    cognitiveLevel: "application"
  },
  {
    q: "A U.S. adult with moderate-to-severe persistent asthma is prescribed one inhaler containing an inhaled corticosteroid and formoterol for both daily control and symptom relief. Which guideline concept does this reflect?",
    o: [
      "SMART therapy", "SABA-only therapy", "Antibiotic prophylaxis", "Daily oral corticosteroid monotherapy"
    ],
    a: 0,
    r: "The U.S. NHLBI/NAEPP 2020 focused update identifies single-maintenance-and-reliever therapy using ICS-formoterol as the preferred approach for many patients age 4 years and older with moderate-to-severe persistent asthma.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Asthma — U.S. NHLBI/NAEPP",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A U.S. parent asks about a 3-year-old with recurrent infection-triggered wheezing and no symptoms between infections. Which recommendation appears in the U.S. NHLBI focused asthma update?",
    o: [
      "A short 7- to 10-day course of daily inhaled corticosteroid started with the respiratory infection plus an as-needed short-acting bronchodilator",
      "Daily oral prednisone indefinitely",
      "No bronchodilator use under age 4",
      "Routine antibiotic treatment with every viral infection"
    ],
    a: 0,
    r: "For selected children age 0 to 4 years with recurrent wheezing triggered by respiratory infections, U.S. NHLBI guidance includes a short course of daily inhaled corticosteroid started at the beginning of the infection along with an as-needed short-acting bronchodilator.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Asthma — U.S. NHLBI/NAEPP",
    difficulty: 3,
    cognitiveLevel: "application"
  },
  {
    q: "A U.S. patient says, 'My rescue inhaler is albuterol.' Which medication should the RN recognize?",
    o: [
      "A short-acting beta2-agonist used for rapid bronchodilation",
      "A long-acting muscarinic antagonist",
      "An inhaled corticosteroid",
      "A leukotriene receptor antagonist"
    ],
    a: 0,
    r: "Albuterol is the U.S. generic name commonly used for the short-acting beta2-agonist known as salbutamol in Canada and many other countries. It is used for rapid relief of bronchospasm.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Respiratory Pharmacology — U.S. Terminology",
    difficulty: 2,
    cognitiveLevel: "application"
  },
  {
    q: "Which statements align with the U.S. NHLBI focused asthma updates? Select all that apply.",
    o: [
      "ICS-formoterol can be used as both maintenance and reliever therapy in appropriate patients with moderate-to-severe persistent asthma",
      "Inhaled corticosteroids remain central anti-inflammatory therapy",
      "Selected patients age 12 years and older with mild asthma may use an inhaled corticosteroid with a short-acting bronchodilator for quick relief",
      "Long-acting beta2-agonist monotherapy is preferred for every patient with asthma",
      "Asthma management should be individualized by age, severity, response, and patient factors"
    ],
    a: 0,
    ca: [0, 1, 2, 4],
    t: "sata",
    r: "The U.S. focused update emphasizes inhaled corticosteroid-containing strategies, includes ICS-formoterol SMART for appropriate moderate-to-severe persistent asthma, and provides an intermittent ICS option with short-acting bronchodilator use for some patients age 12 and older with mild asthma. LABA monotherapy is not the preferred stand-alone strategy for asthma.",
    s: "Respiratory",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    topic: "Asthma — U.S. NHLBI/NAEPP",
    difficulty: 4,
    cognitiveLevel: "analysis"
  }
];
