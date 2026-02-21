import type { LessonContent } from "./types";

const ectopicPregnancy: LessonContent = {
  title: "Ectopic Pregnancy",
  cellular: {
    title: "Pathophysiology of Ectopic Implantation",
    content: "Ectopic pregnancy occurs when a fertilized ovum implants outside the uterine cavity, most commonly in the fallopian tube (tubal pregnancy). The extrauterine tissue cannot support normal placental development or fetal growth. As the embryo grows, it stretches the surrounding structure, eventually leading to rupture with potentially life-threatening hemorrhage. Risk factors include previous ectopic pregnancy, pelvic inflammatory disease, tubal surgery, endometriosis, IUD use, and assisted reproduction. Clinical presentation includes unilateral lower abdominal or pelvic pain, vaginal bleeding (often irregular), and amenorrhea followed by abnormal bleeding. Rupture produces sudden severe pain, signs of hypovolemic shock (tachycardia, hypotension, diaphoresis), referred shoulder pain from diaphragmatic irritation by blood in the peritoneal cavity, and peritoneal signs. A positive pregnancy test with no intrauterine gestational sac on ultrasound is a critical diagnostic clue. Serial beta-hCG levels that fail to double appropriately suggest ectopic pregnancy. This is a surgical/medical emergency requiring rapid intervention to prevent maternal death from hemorrhage."
  },
  signs: {
    left: [
      "Unilateral lower abdominal/pelvic pain",
      "Amenorrhea followed by irregular vaginal bleeding",
      "Positive pregnancy test with no intrauterine sac on ultrasound",
      "Beta-hCG levels that fail to double normally",
      "Adnexal tenderness on examination"
    ],
    right: [
      "Rupture: sudden severe pain, rebound tenderness, guarding",
      "Hypovolemic shock: tachycardia, hypotension, diaphoresis",
      "Referred shoulder pain (Kehr's sign) from peritoneal blood irritating diaphragm",
      "Internal hemorrhage: may be massive and rapidly fatal",
      "Peritonitis from blood in abdominal cavity"
    ]
  },
  medications: [
    { name: "Methotrexate", type: "Antimetabolite", action: "Terminates ectopic pregnancy by inhibiting trophoblastic cell division; used for unruptured ectopic", sideEffects: "Nausea, stomatitis, abdominal pain, transient liver enzyme elevation", contra: "Ruptured ectopic, hemodynamic instability, immunodeficiency, liver/renal disease", pearl: "Medical management only for UNRUPTURED ectopic with stable vitals and specific size/hCG criteria" }
  ],
  pearls: [
    "Positive pregnancy test + no intrauterine sac + pelvic pain = ectopic until proven otherwise",
    "Rupture is a surgical emergency: rapid hemorrhage can be fatal",
    "Referred shoulder pain (Kehr's sign) suggests peritoneal blood irritating the diaphragm",
    "Serial beta-hCG that fails to double appropriately is a key diagnostic clue",
    "Risk factors: PID history, previous ectopic, tubal surgery, IUD use",
    "Two large-bore IVs, type and cross-match, prepare for emergency surgery"
  ],
  quiz: [
    { question: "A woman at 7 weeks gestation presents with unilateral pelvic pain, vaginal spotting, and shoulder pain. What is the priority concern?", options: ["Threatened miscarriage", "Ruptured ectopic pregnancy with possible hemorrhage", "Urinary tract infection", "Round ligament pain"], correct: 1, rationale: "Unilateral pelvic pain + vaginal bleeding + shoulder pain (Kehr's sign) suggests ruptured ectopic pregnancy. Shoulder pain indicates peritoneal blood irritating the diaphragm." },
    { question: "What diagnostic finding is most suspicious for ectopic pregnancy?", options: ["Normal doubling of beta-hCG", "Positive pregnancy test with empty uterus on ultrasound", "High blood pressure", "Elevated white blood cell count"], correct: 1, rationale: "A positive pregnancy test with no intrauterine gestational sac on ultrasound strongly suggests ectopic implantation." }
  ]
};

const dicPregnancy: LessonContent = {
  title: "Disseminated Intravascular Coagulation (DIC) in Pregnancy",
  cellular: {
    title: "Consumptive Coagulopathy Pathophysiology",
    content: "DIC in pregnancy is a life-threatening coagulation disorder characterized by widespread activation of the clotting cascade producing diffuse microvascular thrombosis, which consumes clotting factors and platelets faster than they can be replaced, leading paradoxically to simultaneous clotting AND hemorrhage. Pregnancy-specific triggers include placental abruption (most common obstetric cause), amniotic fluid embolism, retained dead fetus, severe preeclampsia/HELLP syndrome, sepsis, and massive hemorrhage. The pathophysiology involves release of tissue thromboplastin or other procoagulant substances that activate coagulation systemically. Widespread fibrin deposition causes microvascular obstruction and organ ischemia. Simultaneously, consumption of clotting factors (fibrinogen, platelets, factors V and VIII) produces hemorrhagic tendency. Laboratory findings include prolonged PT and aPTT, decreased fibrinogen, decreased platelet count, elevated D-dimer and fibrin degradation products, and fragmented red blood cells (schistocytes) on peripheral smear. Treatment focuses on addressing the underlying cause, replacing consumed blood products (FFP, platelets, cryoprecipitate for fibrinogen), and supportive care."
  },
  signs: {
    left: [
      "Simultaneous bleeding AND clotting (paradoxical)",
      "Petechiae, purpura, ecchymoses",
      "Oozing from IV sites, wounds, mucous membranes",
      "Hematuria, GI bleeding",
      "Bleeding from every puncture site"
    ],
    right: [
      "Multi-organ failure from microvascular thrombosis",
      "Renal failure from fibrin deposition in glomeruli",
      "Respiratory distress from pulmonary microthrombosis",
      "Cerebral ischemia from microvascular obstruction",
      "Massive hemorrhage with cardiovascular collapse"
    ]
  },
  medications: [
    { name: "Fresh Frozen Plasma (FFP)", type: "Blood product", action: "Replaces consumed clotting factors in DIC", sideEffects: "Fluid overload, transfusion reactions, TRALI", contra: "None absolute in life-threatening DIC", pearl: "FFP replaces ALL clotting factors: given when PT/aPTT are prolonged" },
    { name: "Cryoprecipitate", type: "Blood product", action: "Concentrated source of fibrinogen, factor VIII, and von Willebrand factor", sideEffects: "Transfusion reactions", contra: "None absolute in DIC", pearl: "Given specifically when fibrinogen levels are critically low (<100-150 mg/dL)" },
    { name: "Platelet Transfusion", type: "Blood product", action: "Replaces consumed platelets to support hemostasis", sideEffects: "Transfusion reactions, alloimmunization", contra: "HIT (relative)", pearl: "Transfuse when platelets are critically low or active hemorrhage present" }
  ],
  pearls: [
    "DIC = simultaneous clotting AND bleeding: the paradox of consumptive coagulopathy",
    "Placental abruption is the most common obstetric trigger for DIC",
    "Lab triad: low platelets + low fibrinogen + elevated D-dimer",
    "Treatment priority: address the underlying CAUSE (deliver placenta, treat sepsis)",
    "Replace consumed products: FFP for factors, cryoprecipitate for fibrinogen, platelets",
    "Oozing from every puncture site is a classic DIC presentation",
    "Monitor for organ failure from microvascular thrombosis"
  ],
  quiz: [
    { question: "What is the most common obstetric trigger for DIC?", options: ["Gestational diabetes", "Placental abruption", "Preterm labor", "Hyperemesis"], correct: 1, rationale: "Placental abruption releases tissue thromboplastin that activates the coagulation cascade systemically, making it the most common obstetric cause of DIC." },
    { question: "A postpartum patient is oozing from IV sites, has petechiae, and lab shows low platelets and fibrinogen with elevated D-dimer. What is the diagnosis?", options: ["ITP", "DIC", "Von Willebrand disease", "Liver failure"], correct: 1, rationale: "Simultaneous bleeding + low platelets + low fibrinogen + elevated D-dimer is the classic presentation of DIC." }
  ]
};

const hyperemesisGravidarum: LessonContent = {
  title: "Hyperemesis Gravidarum",
  cellular: {
    title: "Pathophysiology of Severe Pregnancy Nausea",
    content: "Hyperemesis gravidarum is severe, persistent nausea and vomiting during pregnancy that exceeds normal morning sickness. It is characterized by weight loss exceeding 5% of pre-pregnancy weight, dehydration, electrolyte imbalances, ketonuria, and nutritional deficiency. The condition typically peaks between 8-12 weeks gestation but can persist throughout pregnancy. The exact pathophysiology is not fully understood but involves elevated beta-hCG levels, estrogen effects on the GI tract, altered gastric motility, and possible thyroid stimulation. Risk factors include molar pregnancy (markedly elevated hCG), multiple gestation, previous hyperemesis, and obesity. Complications include Wernicke encephalopathy from thiamine (B1) deficiency, Mallory-Weiss tears from forceful vomiting, metabolic alkalosis from loss of hydrochloric acid, hypokalemia, hyponatremia, and fetal growth restriction from severe malnutrition. Management includes IV fluid and electrolyte replacement, antiemetic therapy, thiamine supplementation before dextrose administration (to prevent Wernicke's), nutritional support, and in severe cases, parenteral nutrition."
  },
  signs: {
    left: [
      "Persistent, severe vomiting beyond normal morning sickness",
      "Weight loss >5% of pre-pregnancy weight",
      "Dehydration: poor skin turgor, dry mucous membranes, concentrated urine",
      "Ketonuria from starvation ketosis",
      "Peaks 8-12 weeks but can persist throughout pregnancy"
    ],
    right: [
      "Wernicke encephalopathy from thiamine (B1) deficiency",
      "Metabolic alkalosis from HCl loss through vomiting",
      "Hypokalemia and hyponatremia from fluid/electrolyte depletion",
      "Mallory-Weiss tears from forceful retching",
      "Fetal growth restriction from severe maternal malnutrition"
    ]
  },
  medications: [
    { name: "Ondansetron (Zofran)", type: "5-HT3 receptor antagonist antiemetic", action: "Blocks serotonin receptors in the CTZ and vagal afferents to reduce nausea/vomiting", sideEffects: "Headache, constipation, QT prolongation", contra: "QT prolongation, severe liver disease", pearl: "Commonly used for severe hyperemesis when first-line agents fail" },
    { name: "Thiamine (Vitamin B1)", type: "Water-soluble vitamin", action: "Prevents Wernicke encephalopathy in patients with prolonged vomiting and poor intake", sideEffects: "Rare at standard doses", contra: "None significant", pearl: "MUST give thiamine BEFORE dextrose-containing IV fluids to prevent precipitating Wernicke's" },
    { name: "Doxylamine/Pyridoxine", type: "Antihistamine/vitamin B6 combination", action: "First-line antiemetic for pregnancy-related nausea; doxylamine provides antihistamine effect, pyridoxine reduces nausea", sideEffects: "Drowsiness, dry mouth", contra: "MAO inhibitor use", pearl: "Considered first-line therapy for pregnancy nausea before escalating to stronger antiemetics" }
  ],
  pearls: [
    "Hyperemesis gravidarum differs from morning sickness by weight loss, dehydration, and ketonuria",
    "ALWAYS give thiamine BEFORE dextrose IV fluids to prevent Wernicke encephalopathy",
    "Metabolic alkalosis from HCl loss through persistent vomiting",
    "Molar pregnancy causes markedly elevated hCG which can worsen hyperemesis",
    "Risk factors: molar pregnancy, multiple gestation, previous hyperemesis",
    "Monitor electrolytes closely: hypokalemia and hyponatremia are common",
    "IV fluid rehydration is a cornerstone of management"
  ],
  quiz: [
    { question: "Before administering IV dextrose to a patient with hyperemesis gravidarum, what must be given first?", options: ["Ondansetron", "Thiamine (vitamin B1)", "Potassium", "Insulin"], correct: 1, rationale: "Thiamine must be given before dextrose to prevent precipitating Wernicke encephalopathy. Dextrose metabolism requires thiamine, and depleted stores can cause acute neurologic deterioration." },
    { question: "What metabolic disturbance is most characteristic of prolonged vomiting in hyperemesis?", options: ["Metabolic acidosis", "Metabolic alkalosis from loss of hydrochloric acid", "Respiratory alkalosis", "Respiratory acidosis"], correct: 1, rationale: "Persistent vomiting causes loss of hydrochloric acid (HCl), leading to metabolic alkalosis with concurrent hypokalemia and hypochloremia." }
  ]
};

const torchInfections: LessonContent = {
  title: "TORCH Infections in Pregnancy",
  cellular: {
    title: "Transplacental Infection Pathophysiology",
    content: "TORCH is an acronym for a group of infections that can cross the placenta and cause significant fetal harm: Toxoplasmosis, Other (syphilis, varicella, parvovirus B19), Rubella, Cytomegalovirus (CMV), and Herpes simplex virus (HSV). These infections share the ability to cause congenital abnormalities, growth restriction, and neonatal disease despite sometimes producing mild or no symptoms in the mother. Toxoplasmosis is transmitted through undercooked meat or cat feces and can cause hydrocephalus, intracranial calcifications, and chorioretinitis. Rubella in early pregnancy causes congenital rubella syndrome with cataracts, heart defects, and deafness: this triad is heavily tested. CMV is the most common congenital viral infection and can cause hearing loss, developmental delay, and hepatosplenomegaly. HSV transmission typically occurs during vaginal delivery through an active lesion, causing neonatal herpes with high mortality. Syphilis causes congenital syphilis with multi-organ involvement. The timing of maternal infection relative to gestational age critically determines severity: first trimester infections generally cause the most severe fetal effects."
  },
  signs: {
    left: [
      "Maternal infection may be mild or asymptomatic",
      "Routine prenatal screening includes rubella immunity and syphilis testing",
      "First trimester infections cause most severe fetal effects",
      "CMV is the most common congenital viral infection",
      "Cat litter avoidance for toxoplasmosis prevention"
    ],
    right: [
      "Congenital rubella syndrome: cataracts + heart defects + deafness (classic triad)",
      "Toxoplasmosis: hydrocephalus, intracranial calcifications, chorioretinitis",
      "CMV: hearing loss, developmental delay, hepatosplenomegaly",
      "Neonatal herpes: vesicular lesions, encephalitis, high mortality",
      "Congenital syphilis: multi-organ involvement, snuffles, rash, bone changes"
    ]
  },
  medications: [
    { name: "Acyclovir/Valacyclovir", type: "Antiviral", action: "Suppresses HSV replication; given near term to reduce viral shedding and risk of neonatal transmission", sideEffects: "Nausea, headache, renal toxicity at high doses", contra: "Renal impairment requires dose adjustment", pearl: "Active genital herpes at delivery → cesarean section to prevent neonatal transmission" },
    { name: "Penicillin G", type: "Antibiotic", action: "Only proven treatment for syphilis in pregnancy; treats maternal infection and prevents congenital syphilis", sideEffects: "Allergic reactions, Jarisch-Herxheimer reaction (treatment-induced inflammatory response)", contra: "True penicillin allergy (desensitization may be done)", pearl: "Penicillin is the ONLY acceptable treatment for syphilis in pregnancy: no alternatives" }
  ],
  pearls: [
    "TORCH = Toxoplasmosis, Other, Rubella, CMV, Herpes: all cross the placenta",
    "Congenital rubella triad: cataracts + heart defects + deafness: extremely high-yield",
    "CMV is the MOST COMMON congenital viral infection",
    "Active genital herpes at delivery → cesarean section to prevent neonatal herpes",
    "Penicillin is the ONLY treatment for syphilis in pregnancy: no substitutions",
    "Prevention: rubella vaccination before pregnancy, avoid cat litter, safe food handling",
    "First trimester infections generally cause the most severe congenital effects"
  ],
  quiz: [
    { question: "What is the classic triad of congenital rubella syndrome?", options: ["Jaundice, hepatomegaly, anemia", "Cataracts, congenital heart defects, and sensorineural deafness", "Hydrocephalus, seizures, rash", "Microcephaly, limb defects, GI malformation"], correct: 1, rationale: "Congenital rubella syndrome classically presents with cataracts, congenital heart defects, and sensorineural deafness: one of the most tested congenital infection triads." },
    { question: "A pregnant woman with active genital herpes lesions is in labor. What is the recommended delivery method?", options: ["Vaginal delivery with antiviral cream", "Cesarean section to prevent neonatal herpes transmission", "Induced vaginal delivery", "Wait for lesions to resolve"], correct: 1, rationale: "Active genital herpes lesions at delivery carry high risk of neonatal transmission during vaginal birth. Cesarean delivery is recommended." }
  ]
};

const chorioamnionitis: LessonContent = {
  title: "Chorioamnionitis (Intraamniotic Infection)",
  cellular: {
    title: "Infection Pathophysiology",
    content: "Chorioamnionitis is an acute infection of the amniotic membranes and fluid, typically caused by ascending polymicrobial infection from the lower genital tract. The most significant risk factor is prolonged rupture of membranes (PROM), as the protective barrier between the sterile intrauterine environment and vaginal flora is compromised. Other risk factors include multiple vaginal examinations during labor, internal fetal monitoring, preterm labor, and GBS colonization. The infection triggers an inflammatory cascade producing maternal fever (often the earliest clinical sign), maternal and fetal tachycardia, uterine tenderness, purulent or foul-smelling amniotic fluid, and elevated white blood cell count. Fetal effects include tachycardia, sepsis, pneumonia, and neurologic injury. The primary treatment is prompt antibiotic administration and delivery: antibiotics should NOT be delayed while awaiting culture results or delivery. Intrapartum antibiotics significantly reduce neonatal sepsis risk. Post-delivery monitoring of the neonate for signs of infection is essential."
  },
  signs: {
    left: [
      "Maternal fever (often earliest sign)",
      "Maternal tachycardia",
      "Fetal tachycardia",
      "Uterine tenderness",
      "Purulent or foul-smelling amniotic fluid"
    ],
    right: [
      "Neonatal sepsis from vertical transmission",
      "Neonatal pneumonia",
      "Preterm delivery",
      "Postpartum endometritis",
      "Neurologic injury to the fetus from inflammation"
    ]
  },
  medications: [
    { name: "Ampicillin + Gentamicin", type: "Combination antibiotic", action: "Broad-spectrum coverage for polymicrobial intraamniotic infection; standard first-line regimen", sideEffects: "Ampicillin: allergic reactions; Gentamicin: nephrotoxicity, ototoxicity", contra: "Penicillin allergy (use alternatives)", pearl: "Do NOT delay antibiotics: administer promptly upon diagnosis and plan for delivery" }
  ],
  pearls: [
    "Prolonged rupture of membranes is the most significant risk factor",
    "Maternal fever is often the earliest clinical sign",
    "Do NOT delay antibiotics: prompt administration reduces neonatal sepsis risk",
    "Delivery is the definitive treatment: antibiotics buy time but do not replace delivery",
    "Monitor neonate closely post-delivery for signs of infection",
    "Fetal tachycardia may be the first sign of fetal compromise from infection"
  ],
  quiz: [
    { question: "What is the most significant risk factor for chorioamnionitis?", options: ["Gestational diabetes", "Prolonged rupture of membranes", "Advanced maternal age", "Multiparity"], correct: 1, rationale: "Prolonged rupture of membranes compromises the barrier between the sterile intrauterine environment and vaginal flora, allowing ascending infection." },
    { question: "A laboring patient develops fever, tachycardia, and foul-smelling amniotic fluid. What is the priority intervention?", options: ["Wait for culture results", "Administer antibiotics promptly and plan for delivery", "Increase IV fluids only", "Apply ice packs for fever"], correct: 1, rationale: "Chorioamnionitis requires prompt antibiotic administration: do not delay for culture results. Delivery is the definitive treatment." }
  ]
};

const multipleGestation: LessonContent = {
  title: "Multiple Gestation",
  cellular: {
    title: "Physiologic Demands & Complications",
    content: "Multiple gestation (twins, triplets, or higher-order multiples) significantly increases physiologic demands on the maternal system and carries higher risk for both maternal and fetal complications. Maternal blood volume expands more than in singleton pregnancy, increasing cardiac workload, iron requirements, and caloric needs. The overdistended uterus increases risk for preterm labor, preterm rupture of membranes, and postpartum hemorrhage from uterine atony. Maternal complications include gestational hypertension/preeclampsia (significantly higher risk), gestational diabetes, anemia, polyhydramnios, and placental abnormalities. Fetal complications include preterm birth (the most common and significant complication), intrauterine growth restriction (especially in monochorionic twins who share a placenta), twin-to-twin transfusion syndrome (TTTS) in monochorionic twins, malpresentation, cord complications, and higher neonatal morbidity. Monitoring requires more frequent prenatal visits, serial ultrasounds for growth assessment, cervical length monitoring, and careful nutritional counseling with increased caloric and micronutrient needs."
  },
  signs: {
    left: [
      "Uterus large for gestational age",
      "Increased caloric and nutritional requirements",
      "More frequent prenatal monitoring needed",
      "Higher weight gain expectations",
      "Greater blood volume expansion"
    ],
    right: [
      "Preterm labor: most common and significant complication",
      "Preeclampsia: significantly higher risk",
      "Postpartum hemorrhage from uterine overdistension/atony",
      "Twin-to-twin transfusion syndrome (TTTS) in monochorionic twins",
      "Intrauterine growth restriction"
    ]
  },
  medications: [
    { name: "Betamethasone", type: "Corticosteroid", action: "Accelerates fetal lung maturation when preterm delivery is anticipated", sideEffects: "Maternal hyperglycemia, infection risk", contra: "Active systemic infection", pearl: "Given when preterm delivery is anticipated between 24-34 weeks: particularly important in multiple gestation due to high preterm risk" }
  ],
  pearls: [
    "Preterm birth is the most common and significant complication of multiple gestation",
    "Preeclampsia risk is significantly higher with multiples",
    "Uterine overdistension increases postpartum hemorrhage risk (atony)",
    "Monochorionic twins share a placenta: risk for twin-to-twin transfusion syndrome",
    "Increased caloric, iron, and folate requirements compared to singleton pregnancy",
    "More frequent prenatal visits and serial growth ultrasounds required",
    "Cervical length monitoring for preterm labor risk assessment"
  ],
  quiz: [
    { question: "What is the most common and significant complication of multiple gestation?", options: ["Gestational diabetes", "Preterm birth", "Placenta previa", "Hyperemesis"], correct: 1, rationale: "Preterm birth is the most common and significant complication of multiple gestation, resulting from uterine overdistension and the physiologic demands of supporting multiple fetuses." },
    { question: "What complication is unique to monochorionic twins?", options: ["Preeclampsia", "Twin-to-twin transfusion syndrome (TTTS)", "Gestational diabetes", "Shoulder dystocia"], correct: 1, rationale: "TTTS occurs exclusively in monochorionic twins who share a placenta. Unequal blood flow through placental vascular connections causes one twin to receive too much blood and the other too little." }
  ]
};

const placentalAbnormalities: LessonContent = {
  title: "Placental Abnormalities",
  cellular: {
    title: "Abnormal Placentation Pathophysiology",
    content: "Placental abnormalities encompass conditions where the placenta develops or implants abnormally, creating significant maternal and fetal risks. Placenta previa occurs when the placenta implants over or near the cervical os, causing painless bright red vaginal bleeding as the cervix dilates or effaces. Placental abruption (abruptio placentae) is premature separation of a normally implanted placenta, causing painful dark red bleeding, rigid board-like uterus, and potential fetal distress. Placenta accreta spectrum disorders (accreta, increta, percreta) involve abnormally invasive placental attachment to or through the uterine wall, preventing normal separation at delivery and causing massive hemorrhage. Risk factors for accreta spectrum include previous cesarean delivery and placenta previa. Vasa previa occurs when fetal blood vessels cross the cervical os unprotected by placental tissue: rupture of these vessels during labor causes fetal hemorrhage and rapid fetal death. The key clinical distinction between previa and abruption is: previa = painless bright red bleeding; abruption = painful dark red bleeding with rigid uterus."
  },
  signs: {
    left: [
      "Placenta previa: painless, bright red vaginal bleeding",
      "Abruption: painful, dark red bleeding, rigid board-like uterus",
      "Accreta: failure of placenta to separate after delivery",
      "Vasa previa: fetal vessel rupture with membrane rupture",
      "Risk factors: previous cesarean, previous uterine surgery"
    ],
    right: [
      "Previa: hemorrhage requiring cesarean delivery",
      "Abruption: DIC, fetal distress, fetal death",
      "Accreta spectrum: massive hemorrhage, may require hysterectomy",
      "Vasa previa: rapid fetal exsanguination if undiagnosed",
      "All forms: maternal shock, organ failure, death without intervention"
    ]
  },
  medications: [
    { name: "Oxytocin (Pitocin)", type: "Uterotonic", action: "Promotes uterine contraction to control postpartum hemorrhage from placental site bleeding", sideEffects: "Water intoxication, uterine tetany, hypotension", contra: "Before delivery of placenta previa (do not stimulate contractions)", pearl: "First-line uterotonic for postpartum hemorrhage management" },
    { name: "Rh Immune Globulin (RhoGAM)", type: "Immunoglobulin", action: "Prevents Rh sensitization in Rh-negative mothers experiencing bleeding", sideEffects: "Injection site pain, mild fever", contra: "Rh-positive mother", pearl: "Administer to Rh-negative mothers with ANY pregnancy bleeding to prevent isoimmunization" }
  ],
  pearls: [
    "Previa = PAINLESS bright red bleeding; Abruption = PAINFUL dark red + rigid uterus",
    "NEVER perform a vaginal exam with known or suspected placenta previa",
    "Placental abruption is the most common obstetric cause of DIC",
    "Previous cesarean + placenta previa = high risk for placenta accreta",
    "Vasa previa: fetal vessel rupture at membrane rupture → rapid fetal death",
    "Accreta spectrum may require planned cesarean hysterectomy",
    "Rh-negative mothers with ANY bleeding need Rh immune globulin"
  ],
  quiz: [
    { question: "A patient at 32 weeks presents with painless, bright red vaginal bleeding. What is the most likely diagnosis?", options: ["Placental abruption", "Placenta previa", "Cervical dilation", "UTI"], correct: 1, rationale: "Painless bright red bleeding is the hallmark of placenta previa. Abruption presents with painful dark bleeding and uterine rigidity." },
    { question: "Why is vaginal examination contraindicated in suspected placenta previa?", options: ["It causes pain", "It may disrupt the placenta and cause massive hemorrhage", "It is inaccurate", "It increases infection risk"], correct: 1, rationale: "Vaginal examination with placenta previa may disturb the low-lying placenta and trigger catastrophic hemorrhage." }
  ]
};

const pregnancySTIs: LessonContent = {
  title: "Sexually Transmitted Infections in Pregnancy",
  cellular: {
    title: "Vertical Transmission & Fetal Effects",
    content: "Sexually transmitted infections during pregnancy pose unique risks due to potential vertical transmission to the fetus or neonate. Syphilis (Treponema pallidum) crosses the placenta and causes congenital syphilis with multi-organ involvement including characteristic snuffles (nasal discharge), rash, bone abnormalities (Hutchinson's teeth, saddle nose), hepatosplenomegaly, and neurologic damage. Screening is mandatory at first prenatal visit and penicillin G is the ONLY acceptable treatment. Chlamydia (Chlamydia trachomatis) is the most common bacterial STI and can cause neonatal conjunctivitis (ophthalmia neonatorum) and pneumonia through birth canal transmission. Treatment is azithromycin. Gonorrhea (Neisseria gonorrhoeae) can cause ophthalmia neonatorum leading to blindness: prophylactic erythromycin eye ointment is applied to all newborns. HIV requires antiretroviral therapy during pregnancy, scheduled cesarean if viral load is high, avoidance of breastfeeding, and neonatal prophylaxis. Hepatitis B screening is universal; positive mothers require neonatal Hep B vaccine + HBIG within 12 hours of birth. Trichomoniasis is treated with metronidazole to reduce preterm birth risk."
  },
  signs: {
    left: [
      "Many STIs are asymptomatic in pregnancy: screening is essential",
      "Universal prenatal screening: syphilis, HIV, hepatitis B, chlamydia, gonorrhea",
      "Vaginal discharge changes may indicate infection",
      "Partner treatment is essential to prevent reinfection",
      "Test of cure recommended after treatment for some STIs"
    ],
    right: [
      "Congenital syphilis: snuffles, rash, bone changes, hepatosplenomegaly",
      "Ophthalmia neonatorum from chlamydia/gonorrhea: can cause blindness",
      "Neonatal herpes: vesicular lesions, encephalitis, high mortality",
      "HIV vertical transmission without treatment",
      "Hepatitis B chronic carrier state in neonate without prophylaxis"
    ]
  },
  medications: [
    { name: "Penicillin G (Benzathine)", type: "Antibiotic", action: "Only acceptable treatment for syphilis in pregnancy: no alternatives", sideEffects: "Allergic reactions, Jarisch-Herxheimer reaction", contra: "True allergy (desensitization required)", pearl: "There is NO substitute for penicillin in treating syphilis during pregnancy" },
    { name: "Azithromycin", type: "Macrolide antibiotic", action: "Treats chlamydia infection in pregnancy; safe alternative to doxycycline", sideEffects: "GI upset, nausea", contra: "Severe hepatic impairment", pearl: "Doxycycline is contraindicated in pregnancy: azithromycin is the standard" },
    { name: "Erythromycin Eye Ointment", type: "Ophthalmic antibiotic", action: "Prophylaxis against ophthalmia neonatorum from gonorrhea and chlamydia", sideEffects: "Mild eye irritation", contra: "None significant", pearl: "Applied to ALL newborns within 1 hour of birth regardless of maternal STI status" }
  ],
  pearls: [
    "Penicillin is the ONLY treatment for syphilis in pregnancy: no alternatives exist",
    "Erythromycin eye ointment is applied to ALL newborns for ophthalmia neonatorum prophylaxis",
    "Hepatitis B positive mother → neonate gets Hep B vaccine + HBIG within 12 hours of birth",
    "HIV-positive mothers: antiretroviral therapy, possible cesarean, NO breastfeeding",
    "Chlamydia treatment: azithromycin (doxycycline is contraindicated in pregnancy)",
    "Many STIs are asymptomatic: universal prenatal screening is essential",
    "Partner treatment prevents reinfection"
  ],
  quiz: [
    { question: "A pregnant patient tests positive for syphilis. She reports a penicillin allergy. What is the appropriate approach?", options: ["Use azithromycin instead", "Use doxycycline instead", "Penicillin desensitization followed by treatment: no alternative exists", "Defer treatment until postpartum"], correct: 2, rationale: "Penicillin is the ONLY acceptable treatment for syphilis in pregnancy. If the patient is allergic, desensitization must be performed. No alternative antibiotic is adequate." },
    { question: "When should erythromycin eye ointment be applied to a newborn?", options: ["Only if mother has STI", "Within 1 hour of birth to ALL newborns", "At the 2-week well-baby visit", "Only if signs of infection appear"], correct: 1, rationale: "Prophylactic erythromycin eye ointment is applied to ALL newborns within 1 hour of birth to prevent ophthalmia neonatorum, regardless of maternal STI status." }
  ]
};

const uterineRupture: LessonContent = {
  title: "Uterine Rupture",
  cellular: {
    title: "Pathophysiology of Uterine Wall Disruption",
    content: "Uterine rupture is a catastrophic obstetric emergency involving a tear through the uterine wall during labor or delivery. It most commonly occurs along a previous cesarean section scar (classical vertical scars carry higher risk than low transverse scars). The disruption of the uterine wall allows hemorrhage into the peritoneal cavity and may result in fetal extrusion into the abdominal cavity with rapid fetal compromise. Risk factors include previous uterine surgery (cesarean, myomectomy), uterine overdistension, excessive oxytocin use, obstructed labor, grand multiparity, and uterine anomalies. Clinical presentation includes sudden severe abdominal pain (often described as a tearing or ripping sensation), cessation of contractions, loss of fetal station (fetus moves up in birth canal), abnormal fetal heart rate patterns (typically prolonged bradycardia), and signs of hemorrhagic shock. This is a surgical emergency requiring immediate cesarean delivery and uterine repair or hysterectomy."
  },
  signs: {
    left: [
      "Sudden severe tearing abdominal pain",
      "Cessation of contractions",
      "Loss of fetal station (fetus palpable in abdomen)",
      "Change in uterine contour",
      "Vaginal bleeding (may be minimal if blood is intra-abdominal)"
    ],
    right: [
      "Fetal bradycardia: often the first sign on monitor",
      "Maternal hemorrhagic shock: tachycardia, hypotension",
      "Fetal death if not delivered immediately",
      "Maternal death from uncontrolled hemorrhage",
      "Need for hysterectomy if uterus cannot be repaired"
    ]
  },
  medications: [
    { name: "Oxytocin (Pitocin)", type: "Uterotonic", action: "Used postoperatively to maintain uterine tone after repair", sideEffects: "Hypotension, water intoxication", contra: "Excessive use during labor increases rupture risk", pearl: "Excessive oxytocin augmentation is a risk factor FOR rupture: titrate carefully especially with prior uterine scars" }
  ],
  pearls: [
    "Previous cesarean scar is the most common risk factor: classical (vertical) scars carry highest risk",
    "Sudden severe pain + cessation of contractions + fetal bradycardia = suspect rupture",
    "Fetal bradycardia is often the FIRST sign detected on fetal monitoring",
    "Loss of fetal station (fetus moves up) is a hallmark sign",
    "This is a surgical emergency: immediate cesarean delivery required",
    "Excessive oxytocin use increases uterine rupture risk in scarred uteri",
    "Trial of labor after cesarean (TOLAC) requires careful risk-benefit assessment"
  ],
  quiz: [
    { question: "A patient with a previous cesarean section suddenly experiences severe abdominal pain, loss of contractions, and fetal bradycardia. What is the priority concern?", options: ["Placental abruption", "Uterine rupture requiring emergency delivery", "Normal labor progression", "Braxton-Hicks contractions"], correct: 1, rationale: "Sudden pain + cessation of contractions + fetal bradycardia in a patient with a uterine scar is the classic presentation of uterine rupture: a surgical emergency." },
    { question: "Which type of prior uterine incision carries the highest risk for rupture during subsequent labor?", options: ["Low transverse", "Classical (vertical)", "J-incision", "All carry equal risk"], correct: 1, rationale: "Classical (vertical) cesarean incisions involve the muscular upper uterine segment, which contracts most forcefully during labor, carrying significantly higher rupture risk than low transverse incisions." }
  ]
};

const uterineInversion: LessonContent = {
  title: "Uterine Inversion",
  cellular: {
    title: "Mechanism & Pathophysiology",
    content: "Uterine inversion occurs when the uterine fundus collapses inward, partially or completely turning inside out through the cervix. This is a rare but life-threatening obstetric emergency. The mechanism involves loss of normal fundal support combined with downward forces: most commonly caused by excessive traction on the umbilical cord before placental separation, fundal pressure (Credé maneuver) with a relaxed uterus, or spontaneous inversion with short umbilical cord. Risk factors include fundal placental implantation, uterine atony, rapid labor, excessive cord traction, and connective tissue disorders. Classification by degree: first degree (fundus reaches but does not pass through cervix), second degree (fundus protrudes through cervix into vagina), and third degree (complete inversion: uterus visible outside the introitus). Clinical presentation includes sudden severe pelvic pain, a mass visible or palpable in the vagina, absence of the uterine fundus on abdominal palpation, profound hemorrhage, and rapid onset of neurogenic and hypovolemic shock. Treatment involves immediate manual replacement of the uterus (Johnson maneuver), uterine relaxation with terbutaline or general anesthesia, and aggressive fluid/blood replacement."
  },
  signs: {
    left: [
      "Sudden severe pelvic pain after delivery",
      "Mass visible or palpable in vagina",
      "Absence of uterine fundus on abdominal palpation",
      "Excessive vaginal bleeding",
      "Often occurs during third stage of labor"
    ],
    right: [
      "Neurogenic shock from vagal stimulation (bradycardia, hypotension)",
      "Hypovolemic shock from hemorrhage",
      "Cardiovascular collapse without rapid intervention",
      "Need for emergency surgery if manual replacement fails",
      "Maternal death from uncontrolled shock"
    ]
  },
  medications: [
    { name: "Terbutaline", type: "Beta-2 agonist tocolytic", action: "Relaxes uterine smooth muscle to facilitate manual replacement of inverted uterus", sideEffects: "Tachycardia, tremor, hypokalemia", contra: "Cardiac disease", pearl: "Uterine relaxation is essential BEFORE attempting manual replacement" },
    { name: "Oxytocin (After Replacement)", type: "Uterotonic", action: "Contracts uterus AFTER successful replacement to maintain position and control bleeding", sideEffects: "Hypotension, cramping", contra: "Before replacement (would worsen inversion)", pearl: "Do NOT give oxytocin BEFORE replacement: it contracts the cervix around the inverted uterus making replacement impossible" }
  ],
  pearls: [
    "Do NOT apply excessive cord traction before placental separation",
    "Absence of fundus on abdominal palpation is a key diagnostic finding",
    "Neurogenic shock (vagal) occurs in addition to hypovolemic shock",
    "Relax the uterus FIRST (terbutaline), then manually replace (Johnson maneuver)",
    "Do NOT give oxytocin BEFORE replacement: it worsens the condition",
    "Oxytocin is given AFTER successful replacement to maintain tone",
    "Two large-bore IVs, rapid fluid resuscitation, type and cross-match immediately"
  ],
  quiz: [
    { question: "After delivery of the placenta, a nurse cannot palpate the uterine fundus abdominally and sees a mass protruding from the vagina. What is the most likely diagnosis?", options: ["Cervical laceration", "Uterine inversion", "Uterine atony", "Prolapsed cord"], correct: 1, rationale: "Absence of the uterine fundus on abdominal palpation with a vaginal mass is the classic finding of uterine inversion." },
    { question: "In uterine inversion, why should oxytocin NOT be given before replacement?", options: ["It causes nausea", "It contracts the cervix around the inverted uterus, making manual replacement impossible", "It raises blood pressure", "It has no effect in this situation"], correct: 1, rationale: "Oxytocin causes uterine contraction, which would tighten the cervix around the inverted fundus. The uterus must first be relaxed (with terbutaline) before manual replacement." }
  ]
};

const antenatalTesting: LessonContent = {
  title: "Antenatal Diagnostic Testing",
  cellular: {
    title: "Fetal Assessment Methods & Clinical Reasoning",
    content: "Antenatal diagnostic testing encompasses a range of assessments used to evaluate fetal well-being, detect abnormalities, and guide pregnancy management. The Nonstress Test (NST) monitors fetal heart rate response to fetal movement: a reactive NST shows accelerations with movement, indicating adequate fetal oxygenation. Non-reactive results require further evaluation. Kick counts (fetal movement monitoring) are a simple maternal assessment where decreased fetal movement may indicate fetal compromise. The Fern test detects amniotic fluid by examining cervical fluid under microscopy for a ferning (crystallization) pattern, confirming rupture of membranes. The Nitrazine test detects amniotic fluid by pH: amniotic fluid is alkaline (pH 7.0-7.5) compared to normal vaginal secretions (pH 4.5-6.0), turning Nitrazine paper blue. Fetal fibronectin (fFN) testing assesses preterm labor risk: a negative result is highly predictive that delivery will NOT occur within 7-14 days. Chorionic villus sampling (CVS) obtains placental tissue at 10-13 weeks for chromosomal analysis. Amniocentesis obtains amniotic fluid (typically 15-20 weeks) for genetic testing and fetal lung maturity assessment. Noninvasive prenatal testing (NIPT) analyzes cell-free fetal DNA in maternal blood for chromosomal abnormalities."
  },
  signs: {
    left: [
      "NST reactive: accelerations with fetal movement = reassuring",
      "NST non-reactive: further evaluation needed (BPP, CST)",
      "Decreased fetal movement (kick counts) = evaluate immediately",
      "Fern test positive: amniotic fluid confirmed on microscopy",
      "Nitrazine positive (blue): alkaline pH suggests amniotic fluid"
    ],
    right: [
      "Non-reactive NST may indicate fetal hypoxia or sleep cycle",
      "False-positive Nitrazine: blood, semen, BV can also be alkaline",
      "CVS risk: miscarriage (~1%), limb defects if done too early",
      "Amniocentesis risk: miscarriage (<1%), infection, preterm labor",
      "Fetal fibronectin negative = >95% will NOT deliver within 2 weeks"
    ]
  },
  medications: [],
  pearls: [
    "NST: reactive = reassuring (accelerations present); non-reactive = needs further evaluation",
    "Decreased fetal movement is an early warning sign: evaluate immediately",
    "Nitrazine turns BLUE with amniotic fluid (alkaline pH): false positives possible with blood/semen",
    "Fern test: amniotic fluid forms crystal/fern pattern under microscopy",
    "Negative fetal fibronectin is highly predictive that preterm delivery will NOT occur within 2 weeks",
    "NIPT screens for chromosomal abnormalities using cell-free fetal DNA: non-invasive",
    "CVS (10-13 weeks) and amniocentesis (15-20 weeks) are diagnostic, not just screening",
    "After amniocentesis: monitor for cramping, leaking fluid, decreased fetal movement"
  ],
  quiz: [
    { question: "What does a reactive nonstress test indicate?", options: ["Fetal distress", "Adequate fetal oxygenation with heart rate accelerations in response to movement", "Need for immediate delivery", "Maternal hypertension"], correct: 1, rationale: "A reactive NST shows fetal heart rate accelerations with movement, indicating adequate oxygenation and a healthy fetal nervous system response." },
    { question: "Nitrazine paper turns blue when exposed to cervical fluid. What does this suggest?", options: ["Vaginal infection", "Presence of amniotic fluid (alkaline pH) suggesting rupture of membranes", "Normal vaginal secretions", "Presence of blood only"], correct: 1, rationale: "Amniotic fluid is alkaline (pH 7.0-7.5), turning Nitrazine paper blue. This suggests rupture of membranes, though false positives are possible with blood, semen, or BV." },
    { question: "A negative fetal fibronectin test at 26 weeks in a patient with contractions indicates what?", options: ["Definite preterm labor", "Greater than 95% likelihood that delivery will NOT occur within 2 weeks", "Need for immediate tocolytics", "Cervical incompetence"], correct: 1, rationale: "Negative fetal fibronectin has high negative predictive value: over 95% of patients will NOT deliver within 7-14 days. This helps avoid unnecessary interventions." }
  ]
};

export const maternityComplicationsLessons: Record<string, LessonContent> = {
  "ectopic-pregnancy": ectopicPregnancy,
  "dic-pregnancy": dicPregnancy,
  "hyperemesis-gravidarum": hyperemesisGravidarum,
  "torch-infections": torchInfections,
  "chorioamnionitis": chorioamnionitis,
  "multiple-gestation": multipleGestation,
  "placental-abnormalities": placentalAbnormalities,
  "pregnancy-stis": pregnancySTIs,
  "uterine-rupture": uterineRupture,
  "uterine-inversion": uterineInversion,
  "antenatal-testing": antenatalTesting,
};
