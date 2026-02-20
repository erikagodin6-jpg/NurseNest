import type { LessonContent } from "./types";

const pphShock: LessonContent = {
  title: "Postpartum Hemorrhage & Hypovolemic Shock",
  cellular: {
    title: "Hemorrhage Pathophysiology & Shock Progression",
    content: "Postpartum hemorrhage (PPH) is one of the most dangerous obstetric emergencies and a leading cause of maternal mortality worldwide. During pregnancy, maternal blood volume increases substantially to support the fetus and prepare for delivery. After birth, hemostasis depends primarily on effective uterine contraction — when the uterus contracts, muscle fibers compress blood vessels that supplied the placenta. PPH occurs when normal hemostasis fails. The causes follow the 'Four Ts' framework: Tone (uterine atony — the most common cause), Tissue (retained placental fragments), Trauma (lacerations, hematomas, uterine rupture/inversion), and Thrombin (coagulation disorders). Uterine atony means the uterus fails to contract adequately, leaving uterine vessels open for continuous bleeding. As blood loss increases, circulating volume decreases, reducing venous return and cardiac output. Cellular hypoxia develops, shifting to anaerobic metabolism and lactic acid production. Progressive hypoperfusion produces organ dysfunction, altered mental status, and eventually cardiovascular collapse. Pregnancy masks early shock signs — tachycardia and hypotension may appear late due to the expanded blood volume."
  },
  signs: {
    left: [
      "Boggy, soft uterus on palpation (uterine atony)",
      "Excessive vaginal bleeding — steady flow or gush",
      "Blood clots larger than expected",
      "Uterus displaced or higher than expected (retained clots)",
      "Perineal or vaginal lacerations visible"
    ],
    right: [
      "Tachycardia (may be LATE sign due to pregnancy blood volume)",
      "Hypotension, dizziness, pallor, diaphoresis",
      "Altered mental status, restlessness, confusion",
      "Oliguria from renal hypoperfusion",
      "DIC: oozing from IV sites, petechiae, bleeding from everywhere"
    ]
  },
  medications: [
    { name: "Oxytocin (Pitocin)", type: "Uterotonic", action: "First-line agent — stimulates uterine contraction to compress bleeding vessels", sideEffects: "Water intoxication (high doses), hypotension (IV bolus), nausea", contra: "None absolute in PPH emergency", pearl: "First-line for PPH — begin immediately; fundal massage simultaneously" },
    { name: "Methylergonovine (Methergine)", type: "Ergot alkaloid uterotonic", action: "Produces sustained uterine contraction", sideEffects: "Severe hypertension, nausea, vomiting, peripheral vasoconstriction", contra: "HYPERTENSION — absolute contraindication", pearl: "NEVER give to hypertensive patients — can cause stroke or seizure" },
    { name: "Carboprost (Hemabate)", type: "Prostaglandin F2-alpha", action: "Stimulates strong uterine contractions when oxytocin and methergine fail", sideEffects: "Bronchospasm, diarrhea, fever, nausea", contra: "ASTHMA — absolute contraindication", pearl: "NEVER give to patients with asthma — causes severe bronchospasm" },
    { name: "Misoprostol (Cytotec)", type: "Prostaglandin E1", action: "Stimulates uterine contraction; can be given rectally, sublingually, or buccally", sideEffects: "Fever, chills, diarrhea, nausea", contra: "Few absolute contraindications", pearl: "Versatile route options make it useful when IV access is limited" }
  ],
  pearls: [
    "Four Ts of PPH: Tone (atony — most common), Tissue, Trauma, Thrombin",
    "Uterine atony = boggy uterus — first intervention is bimanual uterine massage",
    "Methergine is CONTRAINDICATED in hypertension; Hemabate is CONTRAINDICATED in asthma",
    "Pregnancy masks early shock — tachycardia and hypotension may appear LATE",
    "Two large-bore IVs, rapid crystalloid, type and cross-match immediately",
    "Monitor urine output as indicator of organ perfusion",
    "Weigh pads and linens to quantify blood loss accurately",
    "Every postpartum patient needs fundal assessment — firm fundus = contracted = good"
  ],
  quiz: [
    { question: "What is the most common cause of postpartum hemorrhage?", options: ["Cervical laceration", "Uterine atony", "Retained placenta", "Coagulopathy"], correct: 1, rationale: "Uterine atony (failure of the uterus to contract) is the most common cause of PPH, accounting for the majority of cases." },
    { question: "Which PPH medication is absolutely contraindicated in asthma?", options: ["Oxytocin", "Methylergonovine", "Carboprost (Hemabate)", "Misoprostol"], correct: 2, rationale: "Carboprost (Hemabate/prostaglandin F2-alpha) causes bronchospasm and is absolutely contraindicated in patients with asthma." },
    { question: "A postpartum patient's uterus feels soft and boggy. What is the first nursing action?", options: ["Administer Methergine", "Perform bimanual uterine massage", "Call for surgery", "Apply ice to abdomen"], correct: 1, rationale: "Bimanual uterine massage is the immediate first intervention for a boggy uterus to stimulate contraction and compress bleeding vessels." },
    { question: "Why might vital signs appear normal initially despite significant postpartum blood loss?", options: ["Pain medication masks symptoms", "Pregnancy increases blood volume, so compensatory mechanisms maintain vital signs longer", "Epidural effects", "Lab values are inaccurate postpartum"], correct: 1, rationale: "The expanded blood volume of pregnancy allows significant hemorrhage before compensatory mechanisms fail and vital sign changes appear — making early PPH detection challenging." }
  ]
};

const subinvolution: LessonContent = {
  title: "Subinvolution of the Uterus",
  cellular: {
    title: "Impaired Uterine Involution Pathophysiology",
    content: "Subinvolution is the failure of the uterus to return to its pre-pregnancy size and condition at the expected rate after delivery. Normally, the uterus involutes rapidly — the fundus descends approximately one fingerbreadth per day, returning to the pelvic cavity by two weeks postpartum. Subinvolution occurs when this process is impaired, typically due to retained placental fragments, endometritis (uterine infection), or uterine fibroids. The retained tissue prevents complete vasoconstriction of the placental site vessels, maintaining a potential source of bleeding. Clinical presentation includes a uterus that remains larger than expected for the postpartum day, prolonged or excessive lochia (especially return of heavy red bleeding after it had decreased), pelvic pain or tenderness, and sometimes fever if infection is present. Assessment involves monitoring fundal height and consistency, lochia character and volume, and vital signs. Treatment addresses the underlying cause: uterotonic medications for atony, antibiotics for infection, and possible dilation and curettage for retained tissue."
  },
  signs: {
    left: [
      "Uterus larger than expected for postpartum day",
      "Fundal height not descending at expected rate",
      "Prolonged or recurrent heavy lochia rubra",
      "Uterus may feel boggy on palpation",
      "Pelvic heaviness or discomfort"
    ],
    right: [
      "Secondary postpartum hemorrhage",
      "Endometritis: fever, uterine tenderness, foul-smelling lochia",
      "Retained placental tissue requiring surgical removal",
      "Anemia from ongoing blood loss",
      "Sepsis if infection progresses untreated"
    ]
  },
  medications: [
    { name: "Oxytocin", type: "Uterotonic", action: "Promotes uterine contraction to assist involution", sideEffects: "Water intoxication, hypotension", contra: "None absolute", pearl: "May be given to support uterine tone in subinvolution" },
    { name: "Broad-spectrum Antibiotics", type: "Anti-infective", action: "Treats endometritis contributing to subinvolution", sideEffects: "GI upset, allergic reactions", contra: "Known allergy", pearl: "Fever + tender uterus + foul lochia = endometritis until proven otherwise" }
  ],
  pearls: [
    "Normal involution: fundus descends ~1 fingerbreadth per day after delivery",
    "Subinvolution: uterus remains larger than expected for postpartum day",
    "Return of heavy bright red bleeding after lochia had decreased = red flag",
    "Retained placental fragments are a common cause — may require D&C",
    "Monitor fundal height, firmness, and lochia at every postpartum assessment",
    "Fever + uterine tenderness + foul lochia = suspect endometritis"
  ],
  quiz: [
    { question: "At postpartum day 7, a patient's fundus is palpable at the umbilicus and lochia has returned to heavy rubra. What is the concern?", options: ["Normal finding", "Subinvolution — the uterus should be well below the umbilicus by day 7", "Menstruation returning", "Bladder distension"], correct: 1, rationale: "By day 7, the fundus should be halfway between the umbilicus and symphysis pubis. A fundus at the umbilicus with heavy rubra lochia suggests subinvolution." }
  ]
};

const postpartumVTE: LessonContent = {
  title: "Venous Thromboembolism (Postpartum)",
  cellular: {
    title: "Virchow's Triad in the Postpartum Period",
    content: "The postpartum period carries significantly elevated risk for venous thromboembolism (VTE), encompassing both deep vein thrombosis (DVT) and pulmonary embolism (PE). Pregnancy and the postpartum state activate all three components of Virchow's triad: venous stasis (from decreased mobility, uterine compression of pelvic veins), hypercoagulability (pregnancy increases clotting factors and decreases natural anticoagulants as a protective mechanism against hemorrhage), and endothelial injury (from delivery, particularly cesarean section or operative vaginal delivery). Risk factors include cesarean delivery, prolonged immobility, obesity, advanced maternal age, preeclampsia, history of VTE, thrombophilia, and smoking. DVT most commonly presents with unilateral leg swelling, pain, warmth, redness, and positive Homans sign (though this is unreliable). PE presents with sudden dyspnea, chest pain, tachycardia, tachypnea, hypoxia, and potentially cardiovascular collapse. PE is a leading cause of maternal death and requires immediate recognition and treatment with anticoagulation."
  },
  signs: {
    left: [
      "DVT: unilateral leg swelling, pain, warmth, redness",
      "Calf tenderness, positive Homans sign (unreliable)",
      "Risk highest in first 6 weeks postpartum",
      "Cesarean delivery increases risk significantly",
      "Assess calves at every postpartum visit"
    ],
    right: [
      "PE: sudden dyspnea, chest pain, tachycardia, hypoxia",
      "PE: hemodynamic instability, cardiovascular collapse",
      "PE is a leading cause of maternal death",
      "Massive PE: right heart strain, cardiac arrest",
      "Post-phlebitic syndrome from chronic venous insufficiency"
    ]
  },
  medications: [
    { name: "Enoxaparin (Lovenox)", type: "Low molecular weight heparin", action: "Prophylactic or therapeutic anticoagulation for VTE prevention and treatment", sideEffects: "Bleeding, injection site reactions, HIT (rare)", contra: "Active bleeding, severe thrombocytopenia, HIT history", pearl: "Preferred anticoagulant postpartum — safe during breastfeeding; monitor anti-Xa levels" },
    { name: "Unfractionated Heparin", type: "Anticoagulant", action: "Short-acting anticoagulation for acute PE or when rapid reversal may be needed", sideEffects: "Bleeding, HIT, osteoporosis (long-term)", contra: "Active hemorrhage, HIT", pearl: "Antidote is protamine sulfate; preferred when surgical intervention may be needed" }
  ],
  pearls: [
    "Pregnancy activates ALL three components of Virchow's triad",
    "VTE risk is highest in the first 6 weeks postpartum",
    "Cesarean delivery significantly increases VTE risk",
    "PE is a leading cause of maternal death — sudden dyspnea postpartum is an emergency",
    "Early ambulation is the most important preventive measure",
    "Sequential compression devices for immobilized patients",
    "Enoxaparin is safe during breastfeeding",
    "Unilateral leg swelling postpartum = evaluate for DVT immediately"
  ],
  quiz: [
    { question: "A postpartum patient 3 days after cesarean delivery develops sudden dyspnea, chest pain, and tachycardia. What is the priority concern?", options: ["Anxiety", "Pulmonary embolism", "Asthma exacerbation", "Postpartum hemorrhage"], correct: 1, rationale: "Sudden dyspnea + chest pain + tachycardia in a postpartum cesarean patient is pulmonary embolism until proven otherwise. PE is a leading cause of maternal death." },
    { question: "What is the single most important nursing intervention to prevent postpartum VTE?", options: ["IV fluids", "Early ambulation", "Compression stockings alone", "Aspirin administration"], correct: 1, rationale: "Early ambulation is the most important preventive measure for postpartum VTE, reducing venous stasis and promoting circulation." }
  ]
};

const newbornReflexes: LessonContent = {
  title: "Newborn Reflexes",
  cellular: {
    title: "Primitive Reflex Neurology",
    content: "Newborn reflexes are involuntary motor responses that reflect the integrity and maturity of the neonatal nervous system. These primitive reflexes are present at birth and gradually disappear as the central nervous system matures and voluntary motor control develops. Their presence confirms normal neurologic function; their absence or persistence beyond expected timeframes indicates potential neurologic abnormality. The Moro (startle) reflex involves symmetric arm extension and abduction followed by adduction in response to sudden position change or loud noise — asymmetric Moro suggests brachial plexus injury (Erb's palsy) or clavicle fracture. The rooting reflex (turning toward stimulus on cheek) and sucking reflex are essential for feeding. The Babinski reflex (toe fanning with sole stimulation) is normal in infants but abnormal in adults (indicating upper motor neuron lesion). The palmar grasp reflex (fingers closing around object placed in palm), stepping reflex, and tonic neck reflex (fencing position) are additional primitive reflexes assessed. Risk factors affecting reflex integrity include birth trauma, hypoxia, prematurity, neurologic injury, and maternal substance exposure."
  },
  signs: {
    left: [
      "Moro: symmetric arm extension/abduction then adduction with startle",
      "Rooting: turns head toward cheek stimulus (feeding reflex)",
      "Sucking: rhythmic sucking when object touches palate",
      "Babinski: toe fanning with sole stroke (normal in infants)",
      "Palmar grasp: fingers close around object in palm"
    ],
    right: [
      "Asymmetric Moro: suspect brachial plexus injury (Erb's palsy) or clavicle fracture",
      "Absent or weak suck: neurologic depression, prematurity, substance exposure",
      "Persistent primitive reflexes beyond expected age: neurologic concern",
      "Absent reflexes at birth: evaluate for birth injury, hypoxia, or congenital abnormality",
      "Hyperactive reflexes: CNS irritability, substance withdrawal"
    ]
  },
  medications: [],
  pearls: [
    "Primitive reflexes indicate neurologic integrity — assess all newborns systematically",
    "Asymmetric Moro reflex = suspect birth injury (Erb's palsy or clavicle fracture)",
    "Babinski reflex is NORMAL in infants, ABNORMAL in adults",
    "Rooting and sucking reflexes are essential for feeding — absent suck is a red flag",
    "Primitive reflexes should DISAPPEAR as CNS matures (typically by 4-6 months)",
    "Persistence of primitive reflexes beyond expected timeframes = neurologic evaluation needed",
    "Hyperactive reflexes may indicate CNS irritability or neonatal abstinence syndrome"
  ],
  quiz: [
    { question: "A newborn demonstrates asymmetric Moro reflex with the right arm remaining at the side. What is the concern?", options: ["Normal variation", "Right-sided brachial plexus injury (Erb's palsy) or clavicle fracture", "Left-sided weakness", "Sedation effect"], correct: 1, rationale: "Asymmetric Moro reflex where one arm fails to respond normally suggests birth injury — either brachial plexus injury (Erb's palsy) or clavicle fracture on the affected side." },
    { question: "A 1-year-old still demonstrates a prominent Babinski reflex. What is the significance?", options: ["Normal finding at this age", "Possible upper motor neuron lesion — requires neurologic evaluation", "Sign of giftedness", "Nutritional deficiency"], correct: 0, rationale: "Babinski reflex is normal in infants up to approximately 12-24 months as myelination is still occurring. Persistence beyond 2 years warrants neurologic evaluation." }
  ]
};

const meconiumAspiration: LessonContent = {
  title: "Meconium Aspiration Syndrome",
  cellular: {
    title: "Aspiration Pathophysiology & Respiratory Compromise",
    content: "Meconium aspiration syndrome (MAS) occurs when a newborn inhales meconium-stained amniotic fluid, causing respiratory distress. Meconium passage in utero typically indicates fetal stress — most commonly from hypoxia, which stimulates vagal activity and relaxes the anal sphincter. When the distressed fetus gasps in utero or takes initial breaths at delivery, meconium enters the airway. The aspirated meconium causes multiple pathologic effects: mechanical airway obstruction (creating ball-valve effect with air trapping and hyperinflation), chemical pneumonitis (meconium contains bile acids, enzymes, and other irritants that damage alveolar tissue), surfactant inactivation (impairing gas exchange), and secondary infection risk. These combined effects produce ventilation-perfusion mismatch, hypoxemia, hypercapnia, and respiratory acidosis. Severe MAS may trigger persistent pulmonary hypertension of the newborn (PPHN) as pulmonary vasospasm develops in response to hypoxia and acidosis. Air leak syndromes (pneumothorax) may occur from hyperinflation. Risk factors include post-term pregnancy, prolonged labor, fetal distress, thick meconium, and low Apgar scores."
  },
  signs: {
    left: [
      "Meconium-stained amniotic fluid (yellow-green)",
      "Respiratory distress at or shortly after birth",
      "Tachypnea, grunting, nasal flaring, retractions",
      "Barrel-shaped chest from air trapping",
      "Meconium staining on skin, nails, or umbilical cord"
    ],
    right: [
      "Pneumothorax from air trapping and hyperinflation",
      "Persistent pulmonary hypertension (PPHN) — severe hypoxemia",
      "Chemical pneumonitis with ongoing respiratory deterioration",
      "Secondary bacterial infection",
      "Hypoxic-ischemic encephalopathy if prolonged hypoxia"
    ]
  },
  medications: [
    { name: "Exogenous Surfactant", type: "Pulmonary surfactant", action: "Replaces inactivated surfactant to improve lung compliance and gas exchange", sideEffects: "Transient desaturation during administration, pulmonary hemorrhage (rare)", contra: "None absolute in severe MAS", pearl: "Meconium inactivates native surfactant — replacement may significantly improve respiratory status" },
    { name: "Inhaled Nitric Oxide (iNO)", type: "Pulmonary vasodilator", action: "Selectively dilates pulmonary vasculature in PPHN to improve oxygenation", sideEffects: "Methemoglobinemia (rare), rebound pulmonary hypertension on discontinuation", contra: "Dependent on right-to-left shunt for survival", pearl: "Used specifically for PPHN associated with MAS — improves V/Q matching" }
  ],
  pearls: [
    "Meconium passage in utero indicates fetal stress — most commonly hypoxia",
    "Thick meconium-stained fluid carries higher aspiration risk than thin",
    "MAS causes mechanical obstruction + chemical pneumonitis + surfactant inactivation",
    "Monitor for pneumothorax — sudden deterioration may indicate air leak",
    "PPHN is a major complication of severe MAS requiring urgent intervention",
    "Gentle handling and minimal stimulation reduce oxygen consumption",
    "Post-term infants are at highest risk for meconium aspiration"
  ],
  quiz: [
    { question: "What is the primary mechanism by which meconium causes respiratory distress?", options: ["Infection only", "Combined mechanical obstruction, chemical pneumonitis, and surfactant inactivation", "Allergic reaction", "Cardiac compression"], correct: 1, rationale: "Meconium causes respiratory compromise through multiple mechanisms: mechanical airway obstruction creating air trapping, chemical irritation damaging alveolar tissue, and surfactant inactivation impairing gas exchange." },
    { question: "A newborn delivered through thick meconium-stained fluid develops increasing respiratory distress and sudden deterioration. What complication should be considered?", options: ["Feeding intolerance", "Pneumothorax from air trapping", "Jaundice", "Constipation"], correct: 1, rationale: "The ball-valve effect of meconium causes air trapping and hyperinflation, which can lead to pneumothorax. Sudden deterioration in MAS should prompt evaluation for air leak." }
  ]
};

export const postpartumNeonatalLessons: Record<string, LessonContent> = {
  "pph-shock": pphShock,
  "subinvolution": subinvolution,
  "postpartum-vte": postpartumVTE,
  "newborn-reflexes": newbornReflexes,
  "meconium-aspiration": meconiumAspiration,
};
