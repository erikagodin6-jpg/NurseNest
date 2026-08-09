import type { ExamQuestion } from "./types";

export type RnPediatricsRegion = "CAN" | "US";
export interface RegionalRnPediatricsQuestion extends ExamQuestion {
  regionScope: RnPediatricsRegion;
  countryCode: "CA" | "US";
  licensingBody: "NCSBN";
  topic: string;
  difficulty: 2 | 3 | 4;
  cognitiveLevel: "application" | "analysis";
}

export const rnPediatricsRegionalBankBatch1Questions: RegionalRnPediatricsQuestion[] = [
  // ==================== CANADA ====================
  {
    q: "A Canadian parent reports a rectal temperature of 38.0°C in a 6-week-old infant who looks well. What should the RN advise?",
    o: ["The infant needs prompt medical assessment because fever in an infant 90 days or younger is clinically significant", "Observe at home until the temperature reaches 39.5°C", "Give aspirin and reassess tomorrow", "Ignore the fever if the infant is feeding"],
    a: 0,
    r: "Canadian Paediatric Society guidance treats a documented rectal temperature of at least 38.0°C in a young infant 90 days or younger as fever requiring age- and risk-based evaluation for invasive bacterial infection.",
    s: "Pediatrics",
    dr: ["Waiting for a higher fever can delay recognition of invasive infection.", "Aspirin is avoided in children because of Reye syndrome risk and does not replace assessment.", "Well appearance lowers risk but does not make fever in this age group ignorable."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Febrile Infant — CPS", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A well-appearing Canadian infant is 18 days old with a rectal temperature of 38.2°C. Which principle best reflects the CPS febrile-infant approach?",
    o: ["Infants in the first month are managed as a higher-risk group and generally require comprehensive bacterial-infection evaluation and empiric treatment", "Because the infant looks well, no testing is needed", "Only a throat swab is required", "Wait for a rash before investigating"],
    a: 0,
    r: "Neonates in the youngest age group have the highest risk of invasive bacterial infection even when well appearing, so blood/urine evaluation, consideration of CSF testing, empiric antibiotics and observation are commonly required.",
    s: "Pediatrics",
    dr: ["Well appearance cannot reliably exclude invasive infection in a neonate.", "A throat swab does not evaluate bacteremia, UTI or meningitis.", "Serious bacterial infection often occurs without rash."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Febrile Infant — CPS", difficulty: 3, cognitiveLevel: "application"
  },
  {
    q: "A well-appearing Canadian infant is 45 days old with fever. Which statement best reflects current CPS practice?",
    o: ["Urine testing and inflammatory-risk assessment help determine whether lumbar puncture, antibiotics and admission are needed rather than treating every infant identically", "Every 29- to 60-day-old infant automatically requires the identical full neonatal pathway", "No bacterial testing is needed after 28 days", "A normal physical exam excludes UTI"],
    a: 0,
    r: "For well-appearing infants beyond the neonatal period, CPS guidance uses age, urinalysis and validated inflammatory markers to stratify invasive-bacterial-infection risk and guide CSF testing, antibiotics and disposition.",
    s: "Pediatrics",
    dr: ["Risk-based management is more nuanced after the first month.", "Invasive bacterial infection and UTI remain possible after 28 days.", "UTI may occur without focal examination findings."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Febrile Infant — CPS", difficulty: 4, cognitiveLevel: "analysis"
  },
  {
    q: "A Canadian infant is 75 days old with fever and no source. Which infection remains especially important to screen for in this age group?",
    o: ["Urinary tract infection", "Gout", "Adult-type diverticulitis", "Osteoarthritis"],
    a: 0,
    r: "UTI is among the most common serious bacterial infections in febrile young infants, so urinalysis and appropriately collected urine culture remain central in CPS risk assessment through 90 days.",
    s: "Pediatrics",
    dr: ["Gout is not a routine cause of fever in young infants.", "Diverticulitis is an adult colonic disorder and not a typical infant fever source.", "Osteoarthritis does not cause an acute febrile illness in infancy."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Febrile Infant — CPS", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A Canadian child presents with an acute asthma exacerbation. Which bedside tool should the RN recognize as commonly recommended to grade severity and response?",
    o: ["PRAM score", "CHA2DS2-VASc", "CURB-65", "Glasgow-Blatchford score"],
    a: 0,
    r: "The Pediatric Respiratory Assessment Measure (PRAM) is widely used in Canadian pediatric acute-asthma guidance to standardize severity using oxygen saturation, air entry, wheeze, scalene use and suprasternal retractions.",
    s: "Pediatrics",
    dr: ["CHA2DS2-VASc estimates stroke risk in atrial fibrillation.", "CURB-65 assesses adult pneumonia severity.", "Glasgow-Blatchford assesses upper-GI bleeding risk."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Acute Asthma — CPS", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A Canadian child with moderate-to-severe acute asthma is receiving repeated salbutamol. Which additional inhaled medication is commonly used during the first hour for more severe exacerbations?",
    o: ["Ipratropium bromide", "Long-acting salmeterol alone", "Inhaled antibiotic", "Montelukast as rapid rescue"],
    a: 0,
    r: "CPS acute-asthma guidance uses repeated inhaled salbutamol and adds ipratropium during the initial hour for moderate-to-severe exacerbations because dual bronchodilation can reduce admission risk.",
    s: "Pediatrics",
    dr: ["A LABA is not used alone as acute rescue therapy.", "Routine antibiotics do not treat uncomplicated asthma.", "Montelukast does not provide rapid bronchodilation for a severe attack."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Acute Asthma — CPS", difficulty: 3, cognitiveLevel: "application"
  },
  {
    q: "A Canadian child with bronchiolitis has oxygen saturation persistently 88% with increased work of breathing. What should the RN anticipate?",
    o: ["Supplemental oxygen with a goal generally at or above about 90% while the clinical picture is reassessed", "Routine high-flow oxygen for every bronchiolitis case regardless of saturation", "No oxygen until saturation is below 70%", "Antibiotics as the primary oxygen therapy"],
    a: 0,
    r: "Canadian bronchiolitis guidance is supportive and generally recommends oxygen when saturation persistently falls below about 90%, with escalation determined by work of breathing, feeding, apnea and overall status.",
    s: "Pediatrics",
    dr: ["Routine oxygen is not required in every normally oxygenated infant.", "Waiting for profound hypoxemia is unsafe.", "Antibiotics do not correct viral bronchiolitis hypoxemia unless bacterial infection is also present."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Bronchiolitis — CPS", difficulty: 3, cognitiveLevel: "application"
  },
  {
    q: "A Canadian infant has classic bronchiolitis with wheeze and crackles but no history suggesting asthma. Which treatment principle is appropriate?",
    o: ["Supportive care rather than routine salbutamol for all infants", "Routine salbutamol for every bronchiolitis diagnosis", "Routine systemic corticosteroids for every infant", "Routine antibiotics"],
    a: 0,
    r: "CPS bronchiolitis guidance emphasizes nasal suction when needed, hydration and oxygen support rather than routine bronchodilators, corticosteroids or antibiotics in typical bronchiolitis.",
    s: "Pediatrics",
    dr: ["Bronchodilator responsiveness is not the usual pathophysiology of first-episode bronchiolitis.", "Systemic steroids have not shown routine benefit in typical bronchiolitis.", "Most bronchiolitis is viral and does not require antibiotics."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Bronchiolitis — CPS", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A Canadian parent asks about safest routine sleep positioning for a healthy infant. Which teaching aligns with national safe-sleep recommendations?",
    o: ["Place the infant supine on a firm flat separate sleep surface with no soft bedding", "Place the infant prone for deeper sleep", "Use a padded sleep nest", "Place pillows around the infant to prevent rolling"],
    a: 0,
    r: "Canadian safe-sleep guidance recommends back-to-sleep on a firm flat approved sleep surface without pillows, bumper pads, loose blankets or other soft objects that increase suffocation/SIDS risk.",
    s: "Pediatrics",
    dr: ["Prone sleep increases sleep-related death risk for routine unsupervised sleep.", "Padded nests and positioners create soft-surface and entrapment hazards.", "Pillows are suffocation hazards and are not used to prevent rolling."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Infant Safe Sleep — PHAC", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A Canadian parent asks whether the infant should sleep in the parents' room. Which national recommendation is most appropriate?",
    o: ["Room-share with the infant on a separate safe sleep surface for the first 6 months when possible", "Bed-share every night", "Place the infant alone in another room from birth because room-sharing is unsafe", "Sleep with the infant on a sofa"],
    a: 0,
    r: "Canadian public-health safe-sleep messaging recommends room-sharing, not bed-sharing, for the first 6 months because proximity supports supervision and feeding while preserving a separate safe sleep surface.",
    s: "Pediatrics",
    dr: ["Bed-sharing increases suffocation and sleep-related death risk, particularly with additional hazards.", "Room-sharing on a separate surface is protective rather than unsafe.", "Sofas and armchairs are particularly hazardous sleep environments."],
    regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", topic: "Infant Safe Sleep — PHAC", difficulty: 2, cognitiveLevel: "application"
  },

  // ==================== UNITED STATES ====================
  {
    q: "A U.S. clinician refers to the AAP 2021 febrile-infant clinical practice guideline. Which infants are specifically within its core age scope?",
    o: ["Well-appearing term infants 8 to 60 days old with documented fever", "All newborns from birth through 6 months", "Only infants older than 90 days", "Any ill-appearing child under 5 years"],
    a: 0,
    r: "The AAP guideline specifically addresses well-appearing, term infants 8–60 days old with fever of at least 38.0°C; younger neonates, older infants and ill-appearing infants require different pathways.",
    s: "Pediatrics",
    dr: ["The guideline does not cover every infant through 6 months.", "It is specifically aimed at infants younger than 61 days.", "Ill-appearing children require urgent individualized sepsis management rather than this well-appearing pathway."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Febrile Infant — AAP", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A well-appearing U.S. infant is 14 days old with temperature 38.1°C. Which AAP pathway principle applies?",
    o: ["This youngest 8- to 21-day group generally receives urine, blood and CSF evaluation, parenteral antibiotics and hospital monitoring", "No testing is needed if feeding normally", "Only urinalysis is required", "Home observation without cultures is the default"],
    a: 0,
    r: "AAP places well-appearing febrile infants 8–21 days in the highest-risk pathway, including broad bacterial evaluation, CSF assessment, empiric parenteral antibiotics and hospitalization.",
    s: "Pediatrics",
    dr: ["Well appearance cannot reliably exclude invasive bacterial infection in this age group.", "Urine testing alone misses bacteremia and meningitis.", "Routine home observation is not the default for a febrile infant this young."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Febrile Infant — AAP", difficulty: 3, cognitiveLevel: "application"
  },
  {
    q: "A well-appearing U.S. infant is 45 days old with fever and normal inflammatory markers. Which AAP concept is appropriate?",
    o: ["Management can be risk-stratified; not every 29- to 60-day infant automatically requires lumbar puncture and admission", "Every infant must receive identical neonatal treatment", "No urine testing is needed after 28 days", "Inflammatory markers are never used"],
    a: 0,
    r: "AAP's 29–60-day pathway uses urinalysis and inflammatory markers to identify infants who can avoid CSF testing or hospitalization when other safety criteria and reliable follow-up are met.",
    s: "Pediatrics",
    dr: ["Older well-appearing infants can be managed with more selective risk-based testing.", "UTI remains a major bacterial infection in this age group.", "Inflammatory markers are explicitly incorporated into risk stratification."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Febrile Infant — AAP", difficulty: 4, cognitiveLevel: "analysis"
  },
  {
    q: "Which infant is outside the age range specifically covered by the U.S. AAP 8- to 60-day febrile-infant guideline?",
    o: ["A 75-day-old infant", "A 14-day-old infant", "A 30-day-old infant", "A 55-day-old infant"],
    a: 0,
    r: "The AAP CPG is specifically structured for infants 8–60 days; a 75-day-old infant requires an age-appropriate pathway rather than mechanically applying the 8–60-day algorithm.",
    s: "Pediatrics",
    dr: ["Fourteen days lies within the 8–21-day age band.", "Thirty days lies within the 29–60-day band.", "Fifty-five days lies within the 29–60-day band."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Febrile Infant — AAP", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A U.S. infant with typical bronchiolitis is wheezing but oxygenating adequately. Which AAP-aligned treatment should the RN question if ordered routinely without another indication?",
    o: ["Scheduled albuterol for every bronchiolitis patient", "Nasal suction when secretions impair feeding/breathing", "Hydration support", "Observation of work of breathing"],
    a: 0,
    r: "AAP bronchiolitis guidance recommends against routine albuterol because bronchiolitis is primarily an inflammatory/edematous small-airway disease and trials have not shown consistent meaningful outcome benefit.",
    s: "Pediatrics",
    dr: ["Suction can improve airway patency and feeding when nasal secretions are significant.", "Hydration is a core supportive need.", "Work-of-breathing assessment determines severity and disposition."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Bronchiolitis — AAP", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A U.S. infant hospitalized with bronchiolitis has oxygen saturation 92% and is otherwise improving. Which AAP principle is appropriate?",
    o: ["Supplemental oxygen is not routinely required solely to raise saturation above 90%", "All infants must be maintained at 100% saturation", "Oxygen is withheld until saturation is below 70%", "Antibiotics should replace oxygen"],
    a: 0,
    r: "AAP bronchiolitis guidance supports a permissive oxygen threshold around 90% rather than routine oxygen for saturations above that level when the infant is clinically stable.",
    s: "Pediatrics",
    dr: ["Targeting 100% unnecessarily increases oxygen use without proven benefit in routine bronchiolitis.", "Waiting for profound hypoxemia is unsafe.", "Antibiotics do not correct viral bronchiolitis oxygenation."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Bronchiolitis — AAP", difficulty: 3, cognitiveLevel: "application"
  },
  {
    q: "A U.S. infant with bronchiolitis has no bacterial infection evidence. Which order should the RN question as routine therapy?",
    o: ["Systemic antibiotics", "Small frequent feeds or IV/NG hydration when needed", "Nasal suction", "Oxygen when hypoxemic"],
    a: 0,
    r: "Most bronchiolitis is viral. AAP guidance recommends against antibacterial therapy unless a concomitant bacterial infection is present or strongly suspected.",
    s: "Pediatrics",
    dr: ["Hydration support is appropriate when oral intake is limited.", "Nasal suction can reduce upper-airway obstruction.", "Supplemental oxygen is appropriate for clinically important hypoxemia."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Bronchiolitis — AAP", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "Which U.S. infant sleep setup best aligns with current AAP safe-sleep recommendations?",
    o: ["Supine on a firm, flat, noninclined separate sleep surface with no loose bedding or soft objects", "Prone on a soft pillow-top mattress", "In an inclined sleeper with positioners", "On a sofa next to a sleeping caregiver"],
    a: 0,
    r: "AAP safe-sleep recommendations emphasize supine positioning, a firm flat approved sleep surface, no incline, and an empty sleep space to reduce suffocation and sleep-related infant death.",
    s: "Pediatrics",
    dr: ["Prone positioning and soft bedding increase sleep-related death risk.", "Inclined sleep products and positioners can cause airway obstruction/entrapment.", "Sofas are among the highest-risk surfaces for infant sleep."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Infant Safe Sleep — AAP", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A U.S. parent asks whether room-sharing is safer than bed-sharing. What should the RN teach?",
    o: ["Room-share with the infant on a separate sleep surface, ideally for at least the first 6 months; avoid bed-sharing", "Bed-sharing is safer because the infant is closer", "Move the infant to a sofa for night feeds", "Use pillows to separate the infant in the adult bed"],
    a: 0,
    r: "AAP recommends room-sharing without bed-sharing, ideally for at least the first 6 months, because it lowers sleep-related death risk while preserving a separate safe sleep surface.",
    s: "Pediatrics",
    dr: ["Bed-sharing adds overlay, entrapment and soft-bedding risks.", "Sofas and armchairs are dangerous sleep surfaces.", "Pillows do not make adult-bed sharing safe and add suffocation hazards."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Infant Safe Sleep — AAP", difficulty: 2, cognitiveLevel: "application"
  },
  {
    q: "A U.S. parent says the infant sleeps longer in a weighted swaddle. Which teaching is appropriate under AAP safe-sleep guidance?",
    o: ["Weighted blankets, weighted swaddles and other weighted sleep products are not recommended for infants", "Weighted products are recommended for deeper sleep", "Add a pillow under the infant as well", "Use the product only when the infant is prone"],
    a: 0,
    r: "AAP advises against weighted sleep products because added chest/body load may impair movement or breathing and has no proven safe-sleep benefit.",
    s: "Pediatrics",
    dr: ["Longer sleep does not establish safety.", "Pillows add suffocation risk.", "Prone positioning further increases sleep-related risk."],
    regionScope: "US", countryCode: "US", licensingBody: "NCSBN", topic: "Infant Safe Sleep — AAP", difficulty: 2, cognitiveLevel: "application"
  }
];
