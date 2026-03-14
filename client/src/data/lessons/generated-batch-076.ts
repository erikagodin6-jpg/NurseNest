import type { LessonContent } from "./types";

export const generatedBatch076Lessons: Record<string, LessonContent> = {
  "pituitary-function": {
    title: "Pituitary Function: Anterior & Posterior Hormones",
    cellular: { title: "Pituitary Gland Physiology", content: "The pituitary gland (hypophysis) is the 'master gland' of the endocrine system, located in the sella turcica at the base of the skull. It consists of two functionally distinct lobes.\n\nThe anterior pituitary (adenohypophysis) produces six hormones regulated by hypothalamic releasing and inhibiting hormones delivered via the hypothalamic-hypophyseal portal system: Growth Hormone (GH) — stimulates IGF-1 production, promotes growth and metabolism; Prolactin (PRL) — stimulates breast milk production (unique: tonically INHIBITED by dopamine); Thyroid-Stimulating Hormone (TSH) — stimulates thyroid hormone production; Adrenocorticotropic Hormone (ACTH) — stimulates cortisol from adrenal cortex; Follicle-Stimulating Hormone (FSH) — follicular development and spermatogenesis; Luteinizing Hormone (LH) — ovulation and testosterone production.\n\nThe posterior pituitary (neurohypophysis) does not synthesize hormones — it stores and releases two hormones produced by hypothalamic neurons: Antidiuretic Hormone (ADH/vasopressin) — acts on V2 receptors in renal collecting ducts to insert aquaporin-2 channels, promoting water reabsorption and concentrating urine; Oxytocin — stimulates uterine contractions during labor and milk ejection (let-down reflex) during breastfeeding.\n\nAll anterior pituitary hormones except prolactin are regulated by negative feedback. Prolactin is uniquely inhibited by dopamine — disruption of the pituitary stalk causes prolactin to RISE (stalk effect), while all other hormones FALL." },
    riskFactors: ["Pituitary adenoma (most common cause of pituitary dysfunction)", "Pituitary surgery or radiation", "Traumatic brain injury (pituitary damage in up to 30%)", "Sheehan syndrome (postpartum pituitary infarction from hemorrhage)", "Autoimmune hypophysitis", "Craniopharyngioma", "Sarcoidosis or histiocytosis infiltrating the pituitary", "Genetic conditions (MEN 1, isolated hormone deficiencies)"],
    diagnostics: ["Order anterior pituitary hormone panel: GH/IGF-1, prolactin, TSH/free T4, ACTH/cortisol, FSH/LH, estradiol/testosterone", "Order morning cortisol (8 AM) — <3 mcg/dL suggests deficiency; >18 mcg/dL excludes it", "Order dynamic testing for equivocal results: insulin tolerance test (gold standard for GH and ACTH reserve)", "Order serum and urine osmolality, urine specific gravity (DI assessment)", "Order MRI pituitary with gadolinium for structural evaluation", "Order visual field testing if macroadenoma present"],
    management: ["Replace deficient hormones in priority order: cortisol first (life-threatening), then thyroid, then sex hormones, then GH", "Cortisol replacement: hydrocortisone 15-25 mg/day divided doses (MUST replace before thyroid hormone)", "Thyroid replacement: levothyroxine (monitor free T4, NOT TSH — TSH unreliable in secondary hypothyroidism)", "Sex hormone replacement: testosterone for men; estrogen/progesterone for premenopausal women", "GH replacement: daily subcutaneous recombinant GH injection", "ADH deficiency (diabetes insipidus): desmopressin (DDAVP)"],
    nursingActions: ["Assess for signs of hormone deficiency across all pituitary axes", "Monitor cortisol replacement: teach stress dosing (double or triple dose during illness, trauma, surgery)", "Ensure cortisol is replaced BEFORE thyroid hormone (thyroxine without cortisol can cause adrenal crisis)", "Monitor for diabetes insipidus: urine output, specific gravity, serum sodium, thirst", "Educate on lifelong medication adherence", "Teach patients to wear medical alert identification for adrenal insufficiency"],
    assessmentFindings: ["ACTH/cortisol deficiency: fatigue, hypotension, hypoglycemia, hyponatremia", "TSH/thyroid deficiency: fatigue, cold intolerance, weight gain, constipation", "GH deficiency: decreased muscle mass, increased body fat, reduced bone density", "FSH/LH deficiency: amenorrhea, infertility, decreased libido", "Prolactin excess: galactorrhea, amenorrhea", "ADH deficiency (DI): polyuria, polydipsia, dilute urine, hypernatremia"],
    signs: {
      left: ["Fatigue and weakness", "Cold intolerance", "Amenorrhea or decreased libido", "Excessive thirst and urination", "Galactorrhea"],
      right: ["Low morning cortisol (<3 mcg/dL)", "Low free T4 with low/normal TSH", "Low IGF-1", "Elevated prolactin", "High urine output with low specific gravity"]
    },
    medications: [{
      name: "Hydrocortisone (Cortef)",
      type: "Glucocorticoid replacement",
      action: "Replaces deficient cortisol in secondary adrenal insufficiency; essential for stress response, glucose metabolism, vascular tone",
      sideEffects: "Weight gain, hyperglycemia, osteoporosis, Cushingoid features at supraphysiological doses",
      contra: "Systemic fungal infections (relative); no contraindication to replacement doses in adrenal insufficiency",
      pearl: "Physiological replacement: 15-25 mg/day divided (2/3 morning, 1/3 afternoon); STRESS DOSING: double/triple dose during illness; must be replaced BEFORE levothyroxine; patients need medical alert ID"
    }],
    pearls: ["Mnemonic for anterior pituitary hormones: FLAT PiG — FSH, LH, ACTH, TSH, Prolactin, GH", "Prolactin is the ONLY anterior pituitary hormone tonically INHIBITED by dopamine — stalk damage raises prolactin but lowers everything else", "Replace cortisol BEFORE thyroid hormone — thyroxine increases cortisol metabolism and can precipitate adrenal crisis", "In secondary hypothyroidism, monitor FREE T4 (not TSH) because TSH is unreliable", "Posterior pituitary stores ADH and oxytocin but does NOT make them — they are made in the hypothalamus", "Sheehan syndrome: postpartum pituitary necrosis from hemorrhagic shock — failure to lactate is often the first sign"],
    quiz: [{
      question: "A patient with panhypopituitarism needs hormone replacement. In what order should replacement begin?",
      options: ["Thyroid hormone first, then cortisol", "Cortisol FIRST, then thyroid hormone — starting thyroid without cortisol can cause adrenal crisis", "Growth hormone first", "All hormones simultaneously"],
      correct: 1,
      rationale: "Cortisol must be replaced before thyroid hormone because levothyroxine increases metabolic rate and cortisol clearance. In a cortisol-deficient patient, this can precipitate acute adrenal crisis."
    }, {
      question: "After pituitary stalk transection, what happens to prolactin levels?",
      options: ["Prolactin decreases like all other hormones", "Prolactin INCREASES because it is normally inhibited by dopamine — loss of dopamine removes that inhibition", "Prolactin stays the same", "Prolactin becomes undetectable"],
      correct: 1,
      rationale: "Prolactin is uniquely tonically inhibited by dopamine from the hypothalamus. When the stalk is damaged, dopamine cannot reach lactotrophs and prolactin secretion increases, while all other hormones decrease because they depend on stimulatory releasing hormones."
    }, {
      question: "A woman who experienced massive postpartum hemorrhage cannot breastfeed and has persistent fatigue. What should be suspected?",
      options: ["Postpartum depression", "Sheehan syndrome — postpartum pituitary necrosis from hemorrhagic shock", "Thyroid cancer", "Normal postpartum recovery"],
      correct: 1,
      rationale: "Sheehan syndrome is infarction of the enlarged pituitary gland due to hemorrhagic shock during or after delivery. The first sign is failure to lactate (prolactin deficiency), followed by progressive pituitary hormone deficiencies."
    }]
  },
  "pku-adult-management-np": {
    title: "PKU Adult Management: Lifelong Dietary & Pharmacologic",
    cellular: { title: "Adult PKU Management Challenges", content: "Phenylketonuria requires lifelong management. Evidence clearly demonstrates that elevated phenylalanine (Phe) in adulthood causes executive dysfunction, psychiatric symptoms (anxiety, depression, ADHD-like symptoms), reduced processing speed, and white matter abnormalities on MRI. Current guidelines recommend maintaining blood Phe 2-6 mg/dL (120-360 µmol/L) for life.\n\nAdult PKU management faces unique challenges: dietary non-adherence after years of relaxed restrictions, transition from pediatric to adult metabolic care, pregnancy planning (maternal PKU syndrome is devastating to the fetus if Phe is uncontrolled), access to medical foods, and comorbid mental health conditions exacerbated by elevated Phe.\n\nPharmacologic options have expanded: sapropterin (Kuvan/BH4) enhances residual PAH activity in responsive patients (~25-50%); pegvaliase (Palynziq) is a PEGylated phenylalanine ammonia lyase enzyme substitution therapy that can normalize Phe in patients unresponsive to sapropterin. Large neutral amino acid (LNAA) supplements competitively inhibit Phe transport across the blood-brain barrier." },
    riskFactors: ["Dietary non-adherence (most common issue in adult PKU)", "Transition gaps from pediatric to adult care", "Pregnancy without preconception Phe control (maternal PKU syndrome)", "Loss of access to metabolic dietitian or medical foods", "Mental health comorbidities (depression, anxiety)", "Limited insurance coverage for medical foods", "Cognitive executive dysfunction from elevated Phe", "Social isolation related to dietary restrictions"],
    diagnostics: ["Monitor blood Phe regularly (target 2-6 mg/dL / 120-360 µmol/L)", "Assess nutritional status: prealbumin, essential amino acids, vitamin B12, vitamin D, iron, zinc", "Screen for neuropsychiatric symptoms at every visit (depression, anxiety, executive dysfunction)", "Order brain MRI if neurological symptoms develop (white matter abnormalities)", "Perform BH4 responsiveness testing before prescribing sapropterin", "Monitor bone density (DEXA — PKU patients at risk for osteopenia)"],
    management: ["Maintain Phe-restricted diet with medical formula providing amino acid supplementation", "Trial of sapropterin for all patients — ~25-50% are responsive (≥30% Phe reduction)", "Pegvaliase for patients with uncontrolled Phe despite diet and sapropterin", "LNAA supplementation as adjunctive therapy to reduce brain Phe uptake", "Preconception counseling for all women: achieve Phe 2-6 mg/dL BEFORE conception", "Address mental health comorbidities with appropriate pharmacotherapy"],
    nursingActions: ["Assess dietary adherence using motivational interviewing", "Monitor blood Phe and correlate with symptoms", "Screen for depression and anxiety using validated tools", "Educate on lifelong nature of PKU management", "Provide preconception counseling to all women of childbearing age", "Coordinate with metabolic dietitian", "Monitor for pegvaliase adverse effects: injection site reactions, anaphylaxis risk"],
    assessmentFindings: ["Blood Phe level within or above target range", "Neuropsychiatric symptoms: difficulty concentrating, irritability, anxiety, depression", "Nutritional status markers", "Dietary adherence assessment", "Executive function assessment", "Bone density results"],
    signs: {
      left: ["Difficulty concentrating", "Anxiety and depression", "Irritability and mood changes", "Headaches", "Tremor (very high Phe)"],
      right: ["Elevated blood Phe (>6 mg/dL)", "White matter changes on brain MRI", "Nutritional deficiencies (B12, iron, zinc)", "Low bone density on DEXA", "Elevated Phe:Tyr ratio"]
    },
    medications: [{
      name: "Pegvaliase (Palynziq)",
      type: "PEGylated phenylalanine ammonia lyase (enzyme substitution)",
      action: "Converts phenylalanine to trans-cinnamic acid and ammonia via a PAH-independent pathway; can normalize blood Phe",
      sideEffects: "Injection site reactions, anaphylaxis risk (must carry epinephrine), arthralgia, alopecia",
      contra: "Inadequate anaphylaxis management plan",
      pearl: "Self-administered SC injection; REMS program due to anaphylaxis risk; titrate slowly from 2.5 mg to 20-40 mg daily; all patients must carry auto-injectable epinephrine"
    }],
    pearls: ["PKU diet is for LIFE — adults who stop develop executive dysfunction and psychiatric symptoms", "Target Phe for adults: 2-6 mg/dL (120-360 µmol/L)", "Maternal PKU: uncontrolled Phe during pregnancy causes microcephaly, heart defects, intellectual disability in the baby — even if baby does NOT have PKU", "Pegvaliase can normalize Phe in diet-unresponsive patients but carries anaphylaxis risk", "Depression and anxiety may be directly caused by elevated Phe affecting neurotransmitter synthesis", "Sapropterin works only in BH4-responsive patients — trial required"],
    quiz: [{
      question: "An adult with PKU who stopped the diet reports difficulty concentrating and anxiety. Blood Phe is 18 mg/dL. What is the likely cause?",
      options: ["Unrelated psychiatric disorder", "Elevated phenylalanine causing neurocognitive dysfunction — dietary non-adherence has direct neuropsychiatric consequences", "Normal aging", "Side effect of PKU formula"],
      correct: 1,
      rationale: "Elevated Phe in adults directly impairs executive function and mood through disruption of dopamine and serotonin synthesis. These symptoms are reversible with Phe lowering."
    }, {
      question: "A woman with PKU wants to become pregnant. Her blood Phe is 14 mg/dL. What is the critical counseling?",
      options: ["PKU has no effect on pregnancy", "She must achieve Phe 2-6 mg/dL BEFORE conception — maternal PKU syndrome causes microcephaly and heart defects in the baby", "She can start the diet after becoming pregnant", "PKU prevents pregnancy"],
      correct: 1,
      rationale: "High maternal Phe crosses the placenta and damages the developing fetus, causing microcephaly, congenital heart defects, and intellectual disability. Phe must be controlled BEFORE conception."
    }, {
      question: "A patient on diet and sapropterin still has Phe of 12 mg/dL. What option remains?",
      options: ["Higher-dose sapropterin", "Pegvaliase — enzyme substitution that can normalize Phe in diet-unresponsive patients", "Insulin", "No further options"],
      correct: 1,
      rationale: "Pegvaliase converts Phe to trans-cinnamic acid via a PAH-independent pathway. It requires REMS due to anaphylaxis risk, and all patients must carry auto-injectable epinephrine."
    }]
  },
  "placental-abruption-basics-rpn": {
    title: "Placental Abruption Basics",
    cellular: { title: "Understanding Placental Abruption", content: "Placental abruption is a serious pregnancy complication where the placenta separates from the uterine wall before the baby is born. The placenta is the baby's lifeline providing oxygen and nutrients. When it separates, the baby loses part or all of its blood supply, and the mother can experience severe bleeding.\n\nAbruption can be partial or complete (life-threatening emergency). Bleeding can be revealed (dark red vaginal bleeding) or concealed (blood trapped behind the placenta — no visible bleeding but the uterus becomes rigid and painful). Concealed abruption is more dangerous because severity is underestimated.\n\nThe classic presentation is painful vaginal bleeding with a rigid, tender uterus in the third trimester. Risk factors include hypertension (the #1 risk factor), prior abruption, abdominal trauma, cocaine use, smoking, and premature rupture of membranes." },
    riskFactors: ["Hypertension/preeclampsia (most common risk factor)", "Previous placental abruption (recurrence risk 10-15%)", "Abdominal trauma (car accident, fall, domestic violence)", "Cocaine or methamphetamine use", "Cigarette smoking", "Premature rupture of membranes", "Advanced maternal age", "Multiple gestation"],
    diagnostics: ["Monitor fetal heart rate continuously (late decelerations, bradycardia = fetal distress)", "Assess uterine tone (rigid, board-like uterus is classic)", "Monitor vital signs for hemorrhagic shock", "Estimate blood loss (concealed hemorrhage may be present)", "Expect CBC, coagulation studies (DIC can develop)", "Ultrasound may confirm but CANNOT rule out abruption (sensitivity only 50%)"],
    management: ["Call for help immediately — obstetric emergency", "Start large-bore IV access (two lines) for fluid resuscitation", "Position patient on left side to optimize uteroplacental blood flow", "Prepare for emergency cesarean delivery if fetal distress", "Administer oxygen via non-rebreather mask", "Type and crossmatch blood for potential transfusion"],
    nursingActions: ["Apply continuous electronic fetal monitoring — report abnormalities immediately", "Monitor uterine activity: tone, tenderness, contractions", "Monitor for hemorrhagic shock: tachycardia, hypotension, pallor", "Maintain two large-bore IV lines", "Monitor pad count and weigh pads for blood loss estimation", "Assess for DIC: oozing from IV sites, petechiae, gingival bleeding", "Provide emotional support", "Prepare for emergency delivery at all times"],
    assessmentFindings: ["Painful dark red vaginal bleeding in third trimester", "Rigid, board-like, tender uterus", "Fetal heart rate abnormalities (late decelerations, bradycardia)", "Signs of hemorrhagic shock", "Concealed hemorrhage: rigidity and pain WITHOUT visible bleeding", "Increasing fundal height (blood accumulating behind placenta)"],
    signs: {
      left: ["Painful vaginal bleeding (dark red)", "Abdominal pain and tenderness", "Back pain", "Constant uterine pain", "Decreased fetal movement"],
      right: ["Rigid board-like uterus", "Fetal heart rate abnormalities", "Tachycardia and hypotension", "Increasing fundal height", "Abnormal coagulation studies"]
    },
    medications: [{
      name: "Oxytocin (Pitocin) — post-delivery",
      type: "Uterotonic",
      action: "Stimulates uterine contractions to control postpartum hemorrhage by compressing blood vessels at the placental site",
      sideEffects: "Uterine hyperstimulation, water intoxication at high doses",
      contra: "Before delivery if fetal distress requires emergent cesarean",
      pearl: "Used AFTER delivery to prevent postpartum hemorrhage from uterine atony; the definitive treatment for abruption with fetal distress is DELIVERY"
    }],
    pearls: ["Abruption = PAINFUL bleeding + RIGID uterus; Previa = PAINLESS bleeding + SOFT uterus", "Hypertension is the #1 risk factor", "Concealed hemorrhage can be MORE dangerous — severity is underestimated", "A negative ultrasound does NOT rule out abruption (sensitivity only ~50%)", "DIC can develop rapidly from tissue thromboplastin release", "Delivery is the definitive treatment"],
    quiz: [{
      question: "A patient at 34 weeks has painful dark red vaginal bleeding and a rigid, tender uterus. What should the nurse suspect?",
      options: ["Placenta previa", "Placental abruption — painful bleeding with rigid uterus is classic", "Normal labor", "Cervical insufficiency"],
      correct: 1,
      rationale: "Painful bleeding with rigid, board-like uterus is classic for abruption. Placenta previa causes PAINLESS bright red bleeding with a soft uterus."
    }, {
      question: "A pregnant patient had a car accident and has severe abdominal pain and rigid uterus but NO vaginal bleeding. Could this be abruption?",
      options: ["No — abruption always causes visible bleeding", "Yes — concealed abruption where blood is trapped behind the placenta", "No — just muscle soreness", "Only if bleeding starts later"],
      correct: 1,
      rationale: "Concealed abruption occurs when blood is trapped between the placenta and uterine wall. Pain and rigidity are present without visible bleeding, making it more dangerous because blood loss is hidden."
    }, {
      question: "What is the most common risk factor for placental abruption?",
      options: ["Gestational diabetes", "Hypertension/preeclampsia", "Group B Streptococcus", "Iron deficiency anemia"],
      correct: 1,
      rationale: "Hypertension and preeclampsia are the most common risk factors. Chronic hypertension damages spiral arteries supplying the placenta, predisposing to premature separation."
    }]
  },
  "placenta-previa-basics-rpn": {
    title: "Placenta Previa Basics",
    cellular: { title: "Understanding Placenta Previa", content: "Placenta previa occurs when the placenta implants over or near the opening of the cervix. Normally the placenta implants in the upper uterus. When it covers the cervix, it blocks the baby's exit and can cause severe bleeding.\n\nTypes include complete previa (placenta completely covers the cervical opening), partial previa (partially covers), and marginal previa (edge near but not covering). Low-lying placenta means it is within 2 cm of the cervix.\n\nThe hallmark is PAINLESS bright red vaginal bleeding, usually starting in the late second or third trimester. As the cervix thins and dilates, the placenta separates from the cervix, tearing blood vessels. Key difference from abruption: previa causes PAINLESS bleeding with SOFT uterus; abruption causes PAINFUL bleeding with RIGID uterus.\n\nDo NOT perform a digital vaginal exam on a patient with suspected placenta previa — this can cause massive hemorrhage." },
    riskFactors: ["Prior cesarean section (scar provides abnormal implantation site)", "Prior placenta previa (recurrence risk 4-8%)", "Multiple gestation", "Advanced maternal age (>35 years)", "Multiparity", "Smoking", "Uterine surgery (myomectomy, prior D&C)", "In vitro fertilization"],
    diagnostics: ["Diagnosis confirmed by transvaginal ultrasound (safe — NOT a digital vaginal exam)", "Monitor fetal heart rate during bleeding episodes", "Monitor maternal vital signs for hemorrhagic shock", "Order CBC for hemoglobin and hematocrit", "Type and crossmatch blood", "Serial ultrasounds to track placental location (many resolve by term)"],
    management: ["Nothing per vagina: no vaginal exams, no intercourse, no tampons", "If preterm and stable: expectant management with antenatal corticosteroids", "If bleeding is severe: emergency cesarean regardless of gestational age", "Complete previa at term: planned cesarean delivery (vaginal delivery contraindicated)", "Prepare for potential blood transfusion", "Bed rest or modified activity as ordered"],
    nursingActions: ["Do NOT perform digital vaginal exam — can cause massive hemorrhage", "Monitor vaginal bleeding: amount, color, clots", "Apply continuous fetal monitoring during bleeding", "Monitor maternal vital signs frequently", "Maintain IV access with large-bore catheter", "Educate on pelvic rest: no intercourse, no douching, no tampons", "Keep emergency delivery supplies at bedside", "Provide emotional support about activity restrictions"],
    assessmentFindings: ["Painless bright red vaginal bleeding (hallmark)", "Soft, non-tender uterus", "Fetal heart rate usually normal initially", "Intermittent bleeding — first bleed often mild ('sentinel bleed')", "Transverse or breech fetal position", "Ultrasound confirms placental location over cervix"],
    signs: {
      left: ["Painless bright red vaginal bleeding", "Bleeding often at rest or during sleep", "No abdominal pain", "Bleeding may stop and restart", "Decreased fetal movement (if severe)"],
      right: ["Soft non-tender uterus", "Ultrasound showing placenta over cervix", "Normal fetal heart rate (unless severe hemorrhage)", "Abnormal fetal lie", "Hemoglobin drop with bleeding"]
    },
    medications: [{
      name: "Betamethasone (Celestone)",
      type: "Antenatal corticosteroid",
      action: "Crosses placenta to accelerate fetal lung surfactant production, reducing respiratory distress syndrome risk if preterm delivery needed",
      sideEffects: "Maternal hyperglycemia (transient), insomnia",
      contra: "Active chorioamnionitis",
      pearl: "12 mg IM × 2 doses 24 hours apart; given between 23-36 weeks when preterm delivery anticipated within 7 days; maximum benefit 2-7 days after administration"
    }],
    pearls: ["Previa = PAINLESS, bright red, SOFT uterus; Abruption = PAINFUL, dark red, RIGID uterus", "NEVER perform digital vaginal exam — use transvaginal ultrasound (safe)", "Complete previa = mandatory cesarean delivery", "First bleed is often mild ('sentinel bleed') — subsequent bleeds progressively heavier", "Many low-lying placentas resolve by term ('placental migration')", "Prior cesarean is the strongest risk factor"],
    quiz: [{
      question: "A patient at 32 weeks has painless bright red vaginal bleeding with a soft uterus. What should the nurse suspect and NOT do?",
      options: ["Suspect abruption and perform vaginal exam", "Suspect placenta previa and do NOT perform digital vaginal exam — diagnose with ultrasound", "Suspect normal bloody show", "Suspect cervical infection"],
      correct: 1,
      rationale: "Painless bright red bleeding with soft uterus is classic for placenta previa. Digital vaginal exam must NEVER be performed as it can disrupt the placenta and cause massive hemorrhage."
    }, {
      question: "Can a patient with complete placenta previa have a vaginal delivery?",
      options: ["Yes, if labor progresses normally", "No — complete previa requires cesarean because the placenta blocks the birth canal", "Only if the baby is small", "It depends on preference"],
      correct: 1,
      rationale: "Complete previa is an absolute contraindication to vaginal delivery. The placenta covers the cervical opening — dilation would cause massive hemorrhage."
    }, {
      question: "How does previa bleeding differ from abruption bleeding?",
      options: ["No difference", "Previa: painless, bright red, soft uterus; Abruption: painful, dark red, rigid uterus", "Previa causes more bleeding", "Abruption bleeding is painless"],
      correct: 1,
      rationale: "This key clinical distinction is critical for rapid nursing assessment. Previa = PAINLESS, bright red, SOFT uterus. Abruption = PAINFUL, dark red, RIGID uterus."
    }]
  },
  "plasmapheresis-indications-np": {
    title: "Plasmapheresis: Indications & Management",
    cellular: { title: "Therapeutic Plasma Exchange Principles", content: "Therapeutic plasma exchange (TPE/plasmapheresis) removes the patient's plasma containing pathogenic antibodies, immune complexes, or toxins and replaces it with donor plasma or albumin solution. Blood is separated by centrifugation or membrane filtration; plasma is removed and cellular components returned to the patient.\n\nA typical session exchanges 1-1.5 plasma volumes (~40 mL/kg), removing ~60-70% of intravascular IgG per treatment. Most protocols involve 5-7 sessions over 10-14 days. Multiple sessions are needed because only intravascular immunoglobulin is removed and extravascular redistribution occurs.\n\nASFA Category I (first-line) indications: Guillain-Barré syndrome (GBS), myasthenic crisis, thrombotic thrombocytopenic purpura (TTP), anti-GBM disease (Goodpasture syndrome). Category II (second-line/adjunctive): ANCA-associated vasculitis with diffuse alveolar hemorrhage, antibody-mediated transplant rejection." },
    riskFactors: ["Hemodynamic instability (relative contraindication — fluid shifts)", "Severe coagulopathy (clotting factor removal)", "Citrate toxicity risk (hypocalcemia)", "Central venous catheter complications", "Allergic reactions to replacement fluids (FFP)", "Severe infection (relative contraindication)", "Medication removal (TPE removes protein-bound drugs)"],
    diagnostics: ["Confirm diagnosis requiring plasmapheresis", "Order baseline labs: CBC, BMP, coagulation panel, fibrinogen, immunoglobulin levels", "Monitor calcium during and after sessions (citrate-induced hypocalcemia)", "Monitor coagulation post-procedure (clotting factors removed)", "Order pathogenic antibody levels to track response", "Monitor hemoglobin and platelet count"],
    management: ["Choose replacement fluid: albumin 5% (preferred for most indications) or FFP (required for TTP — contains ADAMTS13)", "Order calcium supplementation during procedure", "Coordinate with immunosuppressive therapy — plasmapheresis is temporary; immunosuppression prevents antibody re-synthesis", "Time medications to avoid removal during exchange (give AFTER procedure)", "Ensure adequate vascular access", "Prescribe appropriate number of exchanges based on indication"],
    nursingActions: ["Monitor vital signs continuously during procedure", "Assess for hypocalcemia (citrate toxicity): perioral numbness, tingling, muscle cramps, Chvostek/Trousseau signs, arrhythmias", "Administer calcium supplementation as ordered", "Monitor vascular access site for bleeding, infection, hematoma", "Time medications AFTER exchange procedure", "Monitor for allergic reactions to replacement fluids (especially FFP)", "Assess neurological status before and after treatments", "Ensure blood products available if FFP is replacement fluid"],
    assessmentFindings: ["Improvement in disease-specific symptoms after serial treatments", "Decreasing pathogenic antibody titers", "Signs of citrate toxicity: perioral tingling, cramps, prolonged QT", "Hypotension during procedure", "Post-procedure coagulopathy (increased bleeding risk 24-48 hours)", "Allergic reactions to replacement fluids"],
    signs: {
      left: ["Tingling around mouth", "Muscle cramps", "Lightheadedness", "Chills during procedure", "Nausea"],
      right: ["Hypotension during exchange", "Prolonged QT on ECG", "Decreased fibrinogen", "Positive Chvostek/Trousseau signs", "Declining pathogenic antibody levels"]
    },
    medications: [{
      name: "Calcium Gluconate (IV)",
      type: "Calcium supplement / electrolyte replacement",
      action: "Replaces calcium chelated by citrate anticoagulant; prevents symptomatic hypocalcemia and cardiac arrhythmias",
      sideEffects: "Flushing, bradycardia if given too rapidly",
      contra: "Hypercalcemia, digoxin use (increased toxicity)",
      pearl: "Prophylactic oral calcium before and during TPE reduces citrate symptoms; IV calcium gluconate preferred over chloride for peripheral administration; monitor ionized calcium"
    }],
    pearls: ["Category I indications: GBS, myasthenic crisis, TTP, anti-GBM disease", "TTP MUST use FFP (contains ADAMTS13); albumin preferred for most other indications", "Citrate toxicity (hypocalcemia) is most common complication — watch for tingling, cramps, QT prolongation", "Give medications AFTER plasmapheresis — protein-bound drugs are removed", "Plasmapheresis is a BRIDGE — immunosuppression must prevent antibody re-synthesis", "Post-procedure coagulopathy: increased bleeding risk 24-48 hours"],
    quiz: [{
      question: "A patient during plasmapheresis develops perioral tingling, muscle cramps, and prolonged QT. What is happening?",
      options: ["Allergic reaction", "Citrate toxicity causing hypocalcemia — citrate chelates ionized calcium", "Heart attack", "Medication side effect"],
      correct: 1,
      rationale: "Citrate anticoagulant chelates ionized calcium, causing hypocalcemia symptoms. Treatment: slow exchange rate and administer IV calcium gluconate."
    }, {
      question: "Why must FFP be used for TTP rather than albumin?",
      options: ["FFP is cheaper", "FFP contains ADAMTS13, the enzyme deficient in TTP; albumin does not", "Albumin causes reactions", "FFP has more protein"],
      correct: 1,
      rationale: "TTP is caused by ADAMTS13 deficiency. FFP contains ADAMTS13 and replenishes the enzyme while plasmapheresis removes pathogenic autoantibodies."
    }, {
      question: "Why should medications be given AFTER plasmapheresis?",
      options: ["Medications work better after TPE", "Plasmapheresis removes protein-bound medications along with the plasma", "Medications interfere with exchange", "No timing requirement"],
      correct: 1,
      rationale: "Plasmapheresis removes plasma and everything bound in it, including protein-bound medications. Giving medications before exchange results in therapeutic drug removal."
    }]
  },
  "plastic-bronchitis-rn": {
    title: "Plastic Bronchitis: Airway Cast Formation",
    cellular: { title: "Pathophysiology of Plastic Bronchitis", content: "Plastic bronchitis is a rare condition characterized by formation of thick, rubbery casts within the bronchial tree that can partially or completely obstruct airways. These branching structures conform to airway anatomy and can be expectorated intact.\n\nType 1 (inflammatory) casts are composed of fibrin and inflammatory cells, occurring with asthma, ABPA, or cystic fibrosis. Type 2 (acellular/plastic) casts are primarily mucin, most commonly seen in children after Fontan palliation for single-ventricle congenital heart disease due to elevated central venous pressure and lymphatic dysfunction.\n\nIn Fontan-associated type, elevated systemic venous pressure disrupts thoracic lymphatic drainage, causing protein-rich lymphatic fluid leakage into airways. This fluid solidifies into casts that obstruct airways, causing acute respiratory distress and life-threatening airway obstruction." },
    riskFactors: ["Fontan palliation for single-ventricle congenital heart disease (most common pediatric cause)", "Asthma (inflammatory type)", "Allergic bronchopulmonary aspergillosis", "Cystic fibrosis", "Sickle cell disease", "Lymphatic malformations", "Elevated central venous pressure", "Post-cardiac surgery"],
    diagnostics: ["Visualize expectorated bronchial casts (pathognomonic — rubbery branching structures)", "Chest X-ray: atelectasis, air trapping, or lobar collapse", "CT chest: airway obstruction, mucoid impaction", "Flexible bronchoscopy for cast removal (diagnostic and therapeutic)", "Lymphangiography or dynamic MRI for lymphatic anatomy (Fontan patients)", "Histopathology of casts determines type"],
    management: ["Flexible bronchoscopy for acute cast removal (life-saving)", "Mucolytic therapy: inhaled dornase alfa or inhaled tPA", "Aggressive pulmonary hygiene: chest physiotherapy, postural drainage, oscillatory PEP", "Treat underlying cause: optimize Fontan hemodynamics, treat asthma/ABPA", "Lymphatic intervention for Fontan-associated type: selective lymphatic embolization", "Low-fat diet with MCTs to reduce lymphatic flow (Fontan patients)"],
    nursingActions: ["Monitor respiratory status: SpO2, respiratory rate, work of breathing, breath sounds", "Recognize acute airway obstruction: sudden dyspnea, wheezing, decreased breath sounds on one side", "Collect and save expectorated casts for examination", "Administer inhaled mucolytics as prescribed", "Perform or assist with chest physiotherapy", "Encourage coughing to mobilize casts", "Prepare for emergent bronchoscopy if acute obstruction", "Educate family on recognizing cast formation signs"],
    assessmentFindings: ["Acute dyspnea, cough, and wheezing", "Expectoration of rubbery branching casts", "Decreased or absent breath sounds on affected side", "Sudden lobar atelectasis on CXR", "History of Fontan surgery or chronic airway disease", "Recurrent episodes of airway obstruction"],
    signs: {
      left: ["Sudden dyspnea and cough", "Unilateral wheezing", "Chest tightness", "Expectoration of rubbery material", "Recurrent respiratory distress"],
      right: ["Branching rubbery casts expectorated", "Unilateral decreased breath sounds", "Lobar atelectasis on CXR", "SpO2 desaturation", "Air trapping on imaging"]
    },
    medications: [{
      name: "Dornase Alfa (Pulmozyme) — inhaled",
      type: "Recombinant human DNase / mucolytic",
      action: "Cleaves extracellular DNA in airway secretions, reducing viscosity; may help dissolve inflammatory bronchial casts",
      sideEffects: "Voice alteration, pharyngitis, chest pain",
      contra: "Known hypersensitivity",
      pearl: "2.5 mg nebulized once daily; more effective for inflammatory Type 1 casts; inhaled tPA used for Type 2 casts; combine with chest physiotherapy"
    }],
    pearls: ["Expectorated bronchial casts are PATHOGNOMONIC — save them for examination", "Most common pediatric cause is Fontan palliation (lymphatic dysfunction)", "Acute airway obstruction is a medical emergency requiring emergent bronchoscopy", "Fontan-associated type: elevated venous pressure → impaired lymphatic drainage → cast formation", "Low-fat diet with MCTs reduces lymphatic flow in Fontan patients", "Save any expectorated casts — they are diagnostically important"],
    quiz: [{
      question: "A child with Fontan history coughs up a rubbery branching structure and breathing immediately improves. What was it?",
      options: ["Food aspiration", "A bronchial cast — characteristic of plastic bronchitis after Fontan", "Blood clot", "Normal mucus"],
      correct: 1,
      rationale: "Expectorated bronchial casts are pathognomonic for plastic bronchitis. In Fontan patients, lymphatic fluid leakage forms casts that obstruct airflow. Coughing them up relieves obstruction."
    }, {
      question: "A nurse finds a branching rubbery substance a patient coughed up. What should be done?",
      options: ["Discard as sputum", "Save it and notify provider — it may be a bronchial cast indicating plastic bronchitis", "Send for routine culture only", "Ignore it"],
      correct: 1,
      rationale: "Bronchial casts should be saved for histopathology to determine type and notify the provider for appropriate treatment and monitoring."
    }, {
      question: "A child with plastic bronchitis develops severe respiratory distress with absent left-sided breath sounds and SpO2 of 82%. What is needed?",
      options: ["Albuterol nebulizer", "Emergent bronchoscopy for cast removal — complete airway obstruction is a medical emergency", "Antibiotics", "Reassurance"],
      correct: 1,
      rationale: "Sudden unilateral absent breath sounds with severe desaturation indicates complete airway obstruction by a cast, requiring emergent bronchoscopy for removal."
    }]
  },
  "pleurisy-rpn": {
    title: "Pleurisy: Basic Assessment & Care",
    cellular: { title: "Understanding Pleurisy", content: "Pleurisy (pleuritis) is inflammation of the pleura — the thin membrane lining the chest wall (parietal pleura) and covering the lungs (visceral pleura). Normally a small amount of lubricating fluid allows smooth lung movement. When inflamed, the rough surfaces rub against each other with every breath, causing sharp chest pain.\n\nThe hallmark is sharp, stabbing chest pain that worsens with deep breathing, coughing, or sneezing and improves when holding the breath or leaning forward. A pleural friction rub — a grating, creaking sound synchronized with breathing — may be heard on auscultation (disappears if fluid accumulates between the layers).\n\nCommon causes include viral infections (most common), pneumonia, pulmonary embolism, autoimmune diseases, rib fracture, and tuberculosis. Pleurisy itself is a symptom requiring identification and treatment of the underlying cause." },
    riskFactors: ["Viral respiratory infections (most common cause)", "Bacterial pneumonia", "Pulmonary embolism", "Autoimmune diseases (SLE, rheumatoid arthritis)", "Tuberculosis", "Rib fracture or chest trauma", "Recent chest surgery", "Cancer (lung cancer, mesothelioma)"],
    diagnostics: ["Listen for pleural friction rub on auscultation", "Assess pain characteristics: sharp, localized, worse with breathing", "Expect chest X-ray (may show effusion, pneumonia, or be normal)", "Monitor vital signs including oxygen saturation", "Expect blood work: CBC, ESR/CRP", "Monitor for pleural effusion development"],
    management: ["Treat the underlying cause", "Administer prescribed analgesics and anti-inflammatory medications", "Encourage gentle deep breathing exercises despite pain (prevent atelectasis)", "Position on the affected side to splint and reduce pain", "Apply warm compresses for comfort", "Rest during acute phase"],
    nursingActions: ["Assess pain: location, quality, severity, aggravating/alleviating factors", "Auscultate for pleural friction rub", "Monitor respiratory status: rate, depth, oxygen saturation", "Administer pain medications and assess effectiveness", "Teach splinting: press pillow against chest when coughing", "Encourage lying on the affected side (reduces pleural movement and pain)", "Monitor for pleural effusion: increasing dyspnea, decreased breath sounds", "Encourage incentive spirometry despite pain"],
    assessmentFindings: ["Sharp, stabbing chest pain worse with breathing, coughing, sneezing", "Pain improves with shallow breathing or breath-holding", "Pain improves lying on affected side", "Pleural friction rub on auscultation", "Decreased breath sounds if effusion develops", "Tachypnea (rapid shallow breathing)"],
    signs: {
      left: ["Sharp chest pain with breathing", "Worse with deep breaths and coughing", "Better when holding breath", "Better lying on affected side", "Shallow rapid breathing"],
      right: ["Pleural friction rub", "Normal or decreased breath sounds", "Elevated ESR/CRP", "CXR findings (effusion, infiltrate)", "Dullness to percussion (if effusion)"]
    },
    medications: [{
      name: "Ibuprofen (Advil/Motrin)",
      type: "NSAID",
      action: "Inhibits COX-1 and COX-2, reducing prostaglandin synthesis to decrease pleural inflammation and pain",
      sideEffects: "GI upset, GI bleeding, renal impairment",
      contra: "Active GI bleeding, severe renal disease, aspirin-sensitive asthma",
      pearl: "First-line for pleuritic pain; 400-800 mg TID with food; if contraindicated, acetaminophen provides analgesia without anti-inflammatory effect"
    }],
    pearls: ["Pleuritic pain is SHARP and WORSE with deep breathing — the hallmark feature", "Friction rub DISAPPEARS when effusion accumulates (fluid separates inflamed surfaces)", "Position on the AFFECTED side to splint and reduce pain", "Teach pillow splinting when coughing", "Pleurisy is a SYMPTOM — always identify underlying cause", "PE can cause pleurisy — always consider PE in new pleuritic chest pain"],
    quiz: [{
      question: "A patient with sharp chest pain worse with breathing should be positioned how for comfort?",
      options: ["Sitting upright", "Lying on unaffected side", "Lying on the AFFECTED side — this splints and reduces pleural movement", "Prone"],
      correct: 2,
      rationale: "Lying on the affected side splints the inflamed pleura, limiting chest wall expansion on that side and reducing friction between inflamed layers."
    }, {
      question: "A nurse hears a pleural friction rub. The next day it's gone but dyspnea has increased. What happened?",
      options: ["Pleurisy resolved", "Pleural effusion developed — fluid eliminated the rub but is compressing the lung", "Faulty stethoscope", "Asthma attack"],
      correct: 1,
      rationale: "Fluid accumulation separates inflamed surfaces (rub disappears) but compresses the lung (increased dyspnea). Report the change to the provider."
    }, {
      question: "Why encourage deep breathing despite pleurisy pain?",
      options: ["To cure pleurisy", "To prevent atelectasis — avoiding deep breaths can lead to lung collapse", "To increase effusion", "No benefit"],
      correct: 1,
      rationale: "Pain causes shallow breathing which can lead to atelectasis and pneumonia. Premedicate with analgesics and teach splinting to enable effective deep breathing."
    }]
  },
  "pnh-rn": {
    title: "Paroxysmal Nocturnal Hemoglobinuria: Nursing Care",
    cellular: { title: "Pathophysiology of PNH", content: "PNH is an acquired clonal disorder caused by a PIGA gene mutation in hematopoietic stem cells. This gene is essential for GPI anchors that attach complement-regulatory proteins (CD55 and CD59) to cell surfaces.\n\nWithout CD59, red blood cells are vulnerable to complement-mediated destruction. Complement continuously lyses unprotected RBCs (intravascular hemolysis), releasing free hemoglobin. Hemolysis worsens at night because mild respiratory acidosis during sleep activates complement.\n\nFree hemoglobin scavenges nitric oxide, causing smooth muscle dystonia, vasoconstriction, and platelet activation — leading to thrombosis (the leading cause of death in PNH), dysphagia, erectile dysfunction, abdominal pain, and renal damage. Thrombosis occurs in unusual sites: hepatic veins (Budd-Chiari), cerebral sinuses, portal and mesenteric veins." },
    riskFactors: ["Aplastic anemia (PNH develops in up to 30%)", "Myelodysplastic syndrome", "Bone marrow failure syndromes", "Prior immunosuppressive therapy for aplastic anemia"],
    diagnostics: ["Order flow cytometry for GPI-anchored proteins (CD55, CD59) — gold standard", "Order CBC: anemia, possible reticulocytosis, possible pancytopenia", "Order hemolysis markers: markedly elevated LDH, undetectable haptoglobin, elevated indirect bilirubin, reticulocytosis", "Order urinalysis: hemoglobinuria (dark/cola-colored urine, especially morning)", "Order D-dimer and coagulation studies", "Order renal function"],
    management: ["Eculizumab (Soliris) or ravulizumab (Ultomiris): anti-C5 monoclonal antibodies — first-line", "Vaccinate against Neisseria meningitidis BEFORE starting complement inhibitor", "Anticoagulation for PNH-related thrombosis", "Iron and folate supplementation", "Blood transfusions for severe anemia", "Bone marrow transplant: only curative therapy (reserved for severe cases)"],
    nursingActions: ["Monitor urine color (dark/cola-colored = hemoglobinuria — worse in morning)", "Assess for hemolysis: fatigue, pallor, jaundice, dark urine", "Monitor for thrombosis: abdominal pain (Budd-Chiari), headache (cerebral sinus thrombosis), leg swelling (DVT)", "Administer eculizumab/ravulizumab per protocol", "Verify meningococcal vaccination BEFORE complement inhibitor", "Monitor for meningococcal infection: fever, headache, neck stiffness, rash", "Educate on emergency signs", "Monitor CBC, LDH for treatment response"],
    assessmentFindings: ["Dark/cola-colored urine especially upon waking", "Fatigue and exercise intolerance", "Jaundice and scleral icterus", "Dysphagia and abdominal pain", "Erectile dysfunction", "Signs of thrombosis in unusual sites", "Pancytopenia if underlying marrow failure"],
    signs: {
      left: ["Dark morning urine", "Fatigue and weakness", "Abdominal pain", "Difficulty swallowing", "Headache"],
      right: ["Markedly elevated LDH", "Undetectable haptoglobin", "Absent GPI-anchored proteins on flow cytometry", "Anemia with reticulocytosis", "Thrombosis in unusual venous sites"]
    },
    medications: [{
      name: "Eculizumab (Soliris)",
      type: "Anti-C5 complement monoclonal antibody",
      action: "Binds C5 preventing MAC formation (C5b-9), stopping complement-mediated hemolysis of GPI-deficient RBCs",
      sideEffects: "Headache, back pain, nausea, increased meningococcal infection risk",
      contra: "Unresolved Neisseria infection; must vaccinate ≥2 weeks before starting",
      pearl: "Must vaccinate against meningococcal disease BEFORE starting; prophylactic antibiotics recommended; IV every 2 weeks; ravulizumab is longer-acting (every 8 weeks)"
    }],
    pearls: ["PNH triad: hemolysis + thrombosis + possible bone marrow failure", "Dark/cola-colored MORNING urine — hemolysis increases overnight from respiratory acidosis", "Flow cytometry for GPI proteins (CD55/CD59) is diagnostic gold standard", "Thrombosis is #1 cause of death — occurs in UNUSUAL sites (Budd-Chiari, cerebral sinuses)", "MUST vaccinate against meningococcus BEFORE eculizumab", "LDH is the best marker for hemolysis severity and treatment response"],
    quiz: [{
      question: "A patient reports dark urine every morning that clears later. What test should be ordered?",
      options: ["Urinalysis for UTI", "Flow cytometry for GPI-anchored proteins — morning hemoglobinuria suggests PNH", "Renal ultrasound", "Urine culture"],
      correct: 1,
      rationale: "Morning hemoglobinuria is classic for PNH. Nocturnal respiratory acidosis activates complement, destroying GPI-deficient RBCs. Flow cytometry confirms the diagnosis."
    }, {
      question: "What vaccination is mandatory before starting eculizumab?",
      options: ["Influenza", "Meningococcal vaccine — eculizumab blocks complement needed to fight Neisseria", "Hepatitis B", "Pneumococcal only"],
      correct: 1,
      rationale: "Eculizumab blocks C5, critical for meningococcal clearance. Patients are ~1000x more susceptible to meningococcal disease. Vaccination must occur ≥2 weeks before starting."
    }, {
      question: "What is the leading cause of death in untreated PNH?",
      options: ["Severe anemia", "Thrombosis in unusual venous sites", "Infection", "Renal failure"],
      correct: 1,
      rationale: "Free hemoglobin scavenges nitric oxide, causing platelet activation and vasoconstriction. Thrombosis occurs characteristically in unusual sites including hepatic veins, cerebral sinuses, and mesenteric veins."
    }]
  },
  "polyarteritis-nodosa-np": {
    title: "Polyarteritis Nodosa: Diagnosis & Management",
    cellular: { title: "Pathophysiology of PAN", content: "Polyarteritis nodosa (PAN) is a systemic necrotizing vasculitis affecting medium-sized muscular arteries with segmental transmural inflammation and fibrinoid necrosis. Unlike ANCA-associated vasculitides, PAN is ANCA-negative and does NOT involve small vessels (no glomerulonephritis, no pulmonary capillaritis).\n\nInflammation weakens vessels causing aneurysm formation at branch points ('string of beads' on angiography). Thrombosis of inflamed vessels causes downstream ischemia and infarction.\n\nHistorically HBV was associated with ~30% of PAN cases, but this has decreased with vaccination. Most commonly affected organs: kidneys (renovascular hypertension — NOT glomerulonephritis), peripheral nerves (mononeuritis multiplex), GI tract (mesenteric ischemia), skin (livedo reticularis, subcutaneous nodules), and musculoskeletal system.\n\nKey distinction: PAN spares the LUNGS and does NOT cause glomerulonephritis. Lung involvement or glomerulonephritis suggests ANCA-associated vasculitis instead." },
    riskFactors: ["Hepatitis B infection (decreasing with vaccination)", "Male sex (slight predominance)", "Age 40-60 years", "Hairy cell leukemia", "HIV infection"],
    diagnostics: ["Order mesenteric or renal angiography: microaneurysms and segmental narrowing ('string of beads')", "Order biopsy of affected tissue: transmural necrotizing arteritis with fibrinoid necrosis", "Order ANCA panel: PAN is ANCA-NEGATIVE", "Order HBV serology (HBsAg, anti-HBc)", "Order ESR, CRP (elevated)", "Order EMG/NCS if neuropathy present (mononeuritis multiplex pattern)"],
    management: ["Non-HBV PAN: corticosteroids + cyclophosphamide for severe disease", "Mild PAN: corticosteroids alone may suffice", "HBV-associated PAN: short-course steroids + antivirals + plasmapheresis (prolonged immunosuppression CONTRAINDICATED)", "Remission maintenance: azathioprine or methotrexate", "Manage renovascular hypertension", "Monitor for relapse"],
    nursingActions: ["Monitor blood pressure closely (renovascular hypertension common)", "Assess for mononeuritis multiplex: foot drop, wrist drop, patchy numbness", "Assess for GI involvement: abdominal pain, bloody stool (mesenteric ischemia)", "Monitor renal function", "Assess skin: livedo reticularis, nodules, digital gangrene", "Monitor for cyclophosphamide side effects: myelosuppression, hemorrhagic cystitis", "Educate on corticosteroid side effects and tapering"],
    assessmentFindings: ["Constitutional symptoms: fever, weight loss, malaise, myalgias (90%)", "Mononeuritis multiplex: asymmetric sensorimotor neuropathy", "Renovascular hypertension", "Abdominal pain from mesenteric ischemia", "Skin: livedo reticularis, subcutaneous nodules, ulcers", "Testicular pain (highly suggestive of PAN)"],
    signs: {
      left: ["Fever, weight loss, malaise", "Asymmetric weakness (foot/wrist drop)", "Abdominal pain after eating", "Skin nodules along arteries", "Testicular pain"],
      right: ["ANCA negative", "Microaneurysms on angiography", "Elevated ESR/CRP", "Biopsy: transmural necrotizing vasculitis", "HBV positive (HBV-associated PAN)"]
    },
    medications: [{
      name: "Cyclophosphamide (Cytoxan)",
      type: "Alkylating immunosuppressant",
      action: "Cross-links DNA preventing cell division; suppresses immune-driven vascular inflammation",
      sideEffects: "Myelosuppression, hemorrhagic cystitis (give with mesna), nausea, alopecia, infertility, increased malignancy risk",
      contra: "Severe leukopenia, active infection, pregnancy",
      pearl: "IV pulse monthly × 3-6 months for induction; give with hydration and mesna for cystitis prevention; monitor CBC weekly; transition to azathioprine for maintenance"
    }],
    pearls: ["PAN is ANCA-NEGATIVE — positive ANCA suggests GPA, MPA, or EGPA", "PAN does NOT involve lungs and does NOT cause glomerulonephritis", "Microaneurysms on angiography are highly suggestive", "Mononeuritis multiplex is the hallmark neurological finding", "Testicular pain from testicular artery vasculitis is highly suggestive", "HBV-associated PAN: treat with antivirals, NOT prolonged immunosuppression"],
    quiz: [{
      question: "A patient has fever, weight loss, foot drop, hypertension, and negative ANCA. Angiography shows microaneurysms. Diagnosis?",
      options: ["GPA", "Polyarteritis nodosa — ANCA-negative with microaneurysms and mononeuritis multiplex", "Microscopic polyangiitis", "Takayasu arteritis"],
      correct: 1,
      rationale: "ANCA-negative vasculitis with microaneurysms, mononeuritis multiplex, and renovascular hypertension is classic for PAN."
    }, {
      question: "What distinguishes PAN from ANCA-associated vasculitides?",
      options: ["PAN affects larger arteries", "PAN is ANCA-negative, does NOT involve lungs, does NOT cause glomerulonephritis", "PAN is more common", "PAN only affects skin"],
      correct: 1,
      rationale: "PAN is ANCA-negative and affects medium-sized arteries, sparing lungs and glomeruli. Lung involvement or glomerulonephritis should prompt reconsideration toward GPA or MPA."
    }, {
      question: "How does HBV-associated PAN change management?",
      options: ["No change", "Use antivirals + short-course steroids + plasmapheresis instead of prolonged immunosuppression", "Only immunosuppression", "Avoid all treatment"],
      correct: 1,
      rationale: "Prolonged immunosuppression promotes HBV replication. Use antivirals to suppress HBV, short-course steroids for acute vasculitis, and plasmapheresis to remove immune complexes."
    }]
  },
  "polycystic-kidney-disease-rpn": {
    title: "Polycystic Kidney Disease Basics",
    cellular: { title: "Understanding Polycystic Kidney Disease", content: "Polycystic kidney disease (PKD) is a genetic condition where many fluid-filled cysts grow in both kidneys, gradually replacing normal tissue. As cysts grow over years, they destroy kidney structure and impair function, eventually leading to kidney failure.\n\nThe most common form is autosomal dominant PKD (ADPKD), meaning only one copy of the abnormal gene is needed. Symptoms usually appear in adulthood (ages 30-50), but cysts begin forming before birth. ADPKD affects approximately 1 in 400-1000 people.\n\nAs kidneys fill with cysts, they become very large. Patients may feel fullness or pain. Cysts can bleed, become infected, or develop stones. High blood pressure is very common and often appears before kidney function declines. About 50% of ADPKD patients develop kidney failure requiring dialysis or transplant by age 60." },
    riskFactors: ["Family history of PKD (autosomal dominant — 50% chance)", "PKD1 mutation (more severe — ESRD average age 54)", "PKD2 mutation (milder — ESRD average age 74)", "Hypertension (accelerates damage)", "Male sex (faster progression)", "Frequent UTIs", "Kidney stones", "High-protein diet"],
    diagnostics: ["Expect kidney ultrasound (multiple bilateral cysts)", "Monitor blood pressure regularly (often first sign)", "Monitor kidney function: BUN and creatinine", "Monitor urinalysis for blood and protein", "Expect genetic testing if family history unclear", "Monitor for liver cysts (common in ADPKD)"],
    management: ["Control blood pressure (target <130/80) — MOST IMPORTANT modifiable factor", "Limit sodium intake", "Stay well hydrated (may slow cyst growth)", "Report blood in urine, flank pain, fever", "Avoid contact sports (cyst rupture risk)", "Avoid NSAIDs (worsen kidney function)"],
    nursingActions: ["Monitor blood pressure at every visit and teach home monitoring", "Monitor kidney function labs", "Assess for flank or abdominal pain", "Monitor for UTIs (cysts can become infected)", "Educate on fluid intake and low-sodium diet", "Teach to avoid NSAIDs", "Provide genetic counseling resources", "Assess emotional impact of chronic progressive genetic disease"],
    assessmentFindings: ["Flank or abdominal pain from enlarged kidneys", "Palpable enlarged kidneys", "Hypertension (often first sign)", "Hematuria from cyst bleeding", "Urinary tract infections", "Kidney stones", "Abdominal fullness and early satiety", "Family history of kidney disease"],
    signs: {
      left: ["Flank pain or fullness", "Blood in urine", "Frequent headaches (hypertension)", "Abdominal fullness", "Family members with kidney disease"],
      right: ["Enlarged kidneys on exam", "Multiple bilateral cysts on ultrasound", "Elevated blood pressure", "Rising creatinine", "Liver cysts on imaging"]
    },
    medications: [{
      name: "Tolvaptan (Jynarque)",
      type: "Vasopressin V2 receptor antagonist",
      action: "Blocks ADH action on collecting duct, reducing cAMP-driven cyst growth; slows kidney volume increase and eGFR decline",
      sideEffects: "Excessive thirst and polyuria, liver toxicity (monitor LFTs), hypernatremia",
      contra: "Liver disease, inability to sense thirst, hypovolemia",
      pearl: "FDA-approved to slow ADPKD progression; patients must drink 2-3 L water daily; LFTs required monthly for 18 months; REMS program"
    }],
    pearls: ["ADPKD is autosomal DOMINANT — 50% chance of passing to each child", "Hypertension is often the FIRST sign — treat aggressively (target <130/80)", "Avoid NSAIDs — they worsen kidney function", "Avoid contact sports — enlarged kidneys are vulnerable", "Adequate hydration (2-3 L/day) may slow cyst growth", "About 50% need dialysis or transplant by age 60"],
    quiz: [{
      question: "What is the MOST important modifiable factor to slow PKD progression?",
      options: ["Restricting protein", "Blood pressure control (target <130/80)", "Limiting fluid", "Avoiding exercise"],
      correct: 1,
      rationale: "Aggressive blood pressure control is the single most important modifiable factor. ACE inhibitors or ARBs are preferred."
    }, {
      question: "Why should PKD patients avoid ibuprofen?",
      options: ["Doesn't work for kidney pain", "NSAIDs reduce blood flow to already-compromised kidneys — use acetaminophen instead", "Causes cyst growth", "No reason to avoid"],
      correct: 1,
      rationale: "NSAIDs reduce renal blood flow by inhibiting prostaglandin-mediated vasodilation, further impairing function in cystic kidneys."
    }, {
      question: "A parent with ADPKD asks about inheritance risk. What should they know?",
      options: ["No risk", "Each child has 50% chance — autosomal dominant inheritance", "25% chance", "Only sons inherit"],
      correct: 1,
      rationale: "ADPKD is autosomal dominant. Each child has a 50% chance of inheriting the mutation. Genetic counseling and testing are available."
    }]
  },
  "polycystic-kidney-management-np": {
    title: "PKD Management: Tolvaptan & Progression Monitoring",
    cellular: { title: "Advanced PKD Pathophysiology & Management", content: "ADPKD results from mutations in PKD1 (85%, polycystin-1) or PKD2 (15%, polycystin-2), which form a calcium-permeable channel on the primary cilium. Loss of functional polycystin disrupts intracellular calcium signaling, leading to increased cAMP which drives both cell proliferation and fluid secretion via CFTR chloride channels, fueling cyst growth.\n\nTolvaptan blocks vasopressin V2 receptor on collecting duct cells, reducing cAMP accumulation. The TEMPO 3:4 and REPRISE trials demonstrated tolvaptan slows total kidney volume (TKV) growth by ~50% and eGFR decline by ~30%.\n\nProgression risk stratification uses Mayo Imaging Classification (Class 1A-1E based on height-adjusted TKV growth rate) or PRO-PKD score. High-risk patients (Mayo 1C-1E, rapid TKV growth >5%/year) benefit most from tolvaptan." },
    riskFactors: ["PKD1 truncating mutation (fastest progression — ESRD ~54)", "PKD1 non-truncating mutation (intermediate)", "PKD2 mutation (slowest — ESRD ~74)", "Male sex", "Early-onset hypertension (<35 years)", "Macroscopic hematuria before 30", "Large TKV for age", "Urological complications before 35"],
    diagnostics: ["Order MRI kidneys for TKV and Mayo classification", "Calculate height-adjusted TKV (htTKV) for staging", "Order genetic testing (PKD1 vs PKD2, mutation type)", "Monitor eGFR trajectory over time", "Monitor serum sodium, liver function (tolvaptan monitoring)", "Order liver MRI for hepatic cysts"],
    management: ["Tolvaptan for patients at risk of rapid progression (Mayo 1C-1E, eGFR ≥25)", "BP target <110/75 if tolerated (HALT-PKD trial)", "RAAS blockade: ACE inhibitor or ARB first-line", "Adequate hydration: 2-3 L/day to suppress vasopressin", "Moderate sodium restriction (<2.3 g/day)", "Manage complications: cyst infections (fluoroquinolones), hemorrhage, nephrolithiasis"],
    nursingActions: ["Monitor LFTs monthly for first 18 months of tolvaptan (hepatotoxicity risk)", "Monitor serum sodium (hypernatremia risk)", "Educate on expected polyuria and polydipsia with tolvaptan", "Assess for hepatotoxicity: RUQ pain, nausea, fatigue, dark urine, jaundice", "Monitor BP and eGFR at regular intervals", "Coordinate genetic counseling", "Screen for intracranial aneurysms if family history of SAH"],
    assessmentFindings: ["TKV on imaging (htTKV for Mayo classification)", "eGFR trajectory over serial measurements", "Blood pressure control", "Tolvaptan response: urine osmolality decrease, TKV stability, eGFR preservation", "LFTs within normal limits", "Serum sodium within normal limits"],
    signs: {
      left: ["Increased urine output (expected with tolvaptan)", "Excessive thirst (expected)", "Flank pain or fullness", "Headache", "Fatigue"],
      right: ["Rising htTKV on serial imaging", "Declining eGFR slope", "Elevated LFTs (hepatotoxicity)", "Hypernatremia", "Cyst infection (fever, localized pain)"]
    },
    medications: [{
      name: "Tolvaptan (Jynarque)",
      type: "Vasopressin V2 receptor antagonist",
      action: "Blocks ADH at V2 receptors, reducing intracellular cAMP that drives cyst proliferation and fluid secretion; slows TKV growth ~50% and eGFR decline ~30%",
      sideEffects: "Polyuria/polydipsia (expected effect), hepatotoxicity (requires monthly LFT monitoring), hypernatremia",
      contra: "Liver disease, inability to sense thirst, hypovolemia, pregnancy, strong CYP3A4 inhibitors",
      pearl: "Split-dose regimen (higher AM, lower PM); REMS required; monthly LFTs for 18 months; discontinue immediately if ALT/AST >3× ULN; patients must drink water freely"
    }],
    pearls: ["Tolvaptan reduces cAMP-driven cyst growth by blocking V2 receptor", "Mayo Classification 1C-1E benefit most from tolvaptan", "PKD1 truncating → fastest progression; PKD2 → slowest", "Monthly LFT monitoring mandatory with tolvaptan for first 18 months", "Polyuria and polydipsia are EXPECTED pharmacologic effects, not side effects to treat", "Screen for intracranial aneurysms in patients with family history of SAH (5-10% aneurysm risk)"],
    quiz: [{
      question: "A patient on tolvaptan reports urinating every 2 hours and drinking 3 L water daily. Concerning?",
      options: ["Yes — stop tolvaptan", "No — polyuria and polydipsia are expected pharmacologic effects of V2 receptor blockade", "Yes — diabetes insipidus", "Reduce dose"],
      correct: 1,
      rationale: "Tolvaptan produces aquaresis (electrolyte-free water excretion). Polyuria and polydipsia are expected and necessary. The patient must drink freely to prevent hypernatremia."
    }, {
      question: "Which ADPKD patients benefit most from tolvaptan?",
      options: ["All PKD patients", "Those at risk of rapid progression: Mayo 1C-1E, PKD1 truncating mutations, early hypertension, large TKV", "Only dialysis patients", "Only PKD2 carriers"],
      correct: 1,
      rationale: "High-risk patients identified by Mayo Classification 1C-1E, PKD1 truncating mutations, early-onset hypertension, and large TKV benefit most."
    }, {
      question: "A patient on tolvaptan develops fatigue, nausea, dark urine, and ALT 5× ULN. What should be done?",
      options: ["Continue and monitor", "Discontinue tolvaptan immediately — this indicates hepatotoxicity", "Increase dose", "Add hepatoprotective supplement"],
      correct: 1,
      rationale: "ALT >3× ULN with symptoms of liver injury requires immediate tolvaptan discontinuation. This is the reason for monthly LFT monitoring and REMS."
    }]
  },
  "polycythemia-basics-rpn": {
    title: "Polycythemia Basics",
    cellular: { title: "Understanding Polycythemia", content: "Polycythemia means too many red blood cells. Thick blood flows slowly and can form clots, leading to stroke, heart attack, or pulmonary embolism.\n\nPrimary polycythemia (polycythemia vera, PV) is a bone marrow cancer where a JAK2 V617F mutation (>95% of cases) causes excess RBC production without normal signals. Secondary polycythemia occurs when the body produces extra RBCs in response to low oxygen — from chronic lung disease, high altitude, sleep apnea, or heavy smoking.\n\nPV presents with a ruddy (red, flushed) complexion and itching after warm baths (aquagenic pruritus from histamine release). Treatment includes regular phlebotomy (removing blood to lower RBC count) and low-dose aspirin to prevent clots." },
    riskFactors: ["JAK2 V617F mutation (PV)", "Chronic lung disease/COPD (secondary)", "Chronic smoking", "Obstructive sleep apnea", "Living at high altitude", "Dehydration (relative polycythemia)", "EPO-secreting tumors", "Congenital heart disease with right-to-left shunt"],
    diagnostics: ["Monitor CBC: elevated hemoglobin (>16.5 men, >16 women) and hematocrit (>49% men, >48% women)", "Expect JAK2 V617F testing (positive in >95% of PV)", "Expect EPO level: LOW in PV, HIGH in secondary", "Monitor for clot symptoms", "Assess for aquagenic pruritus", "Monitor for hyperviscosity: headache, dizziness, visual changes"],
    management: ["Phlebotomy to maintain hematocrit <45% — primary treatment", "Low-dose aspirin (81 mg daily)", "Stay well hydrated", "Report clot symptoms immediately", "Avoid iron supplements", "Report worsening symptoms"],
    nursingActions: ["Monitor hemoglobin and hematocrit", "Assist with therapeutic phlebotomy (500 mL removed, target Hct <45%)", "Monitor vitals during phlebotomy (hypotension, dizziness)", "Assess for hyperviscosity: headache, dizziness, visual changes, flushed face", "Educate on hydration", "Assess for thrombosis: leg swelling, chest pain, neurological changes", "Educate on avoiding iron supplements", "Ask about itching after warm baths"],
    assessmentFindings: ["Ruddy (plethoric) complexion", "Aquagenic pruritus after warm baths", "Headache, dizziness, visual disturbances", "Elevated H&H", "Splenomegaly", "Tinnitus", "Gout"],
    signs: {
      left: ["Red flushed face", "Itching after warm bath", "Headache and dizziness", "Visual disturbances", "Fatigue"],
      right: ["Elevated hemoglobin and hematocrit", "JAK2 V617F positive (PV)", "Low EPO (PV)", "Splenomegaly", "Elevated uric acid"]
    },
    medications: [{
      name: "Aspirin (81 mg)",
      type: "Antiplatelet agent",
      action: "Irreversibly inhibits COX-1, preventing thromboxane A2 and platelet aggregation; reduces thrombotic events in PV",
      sideEffects: "GI bleeding, easy bruising",
      contra: "Active GI bleeding, aspirin allergy",
      pearl: "81 mg daily for ALL PV patients unless contraindicated; used with phlebotomy as first-line; does NOT replace phlebotomy"
    }],
    pearls: ["PV = ruddy face + itching after warm bath + elevated H&H + JAK2 positive", "Phlebotomy target: hematocrit BELOW 45%", "PV: EPO LOW; Secondary: EPO HIGH", "Thick blood = clot risk — aspirin + phlebotomy reduce this", "Avoid iron supplements in PV", "Aquagenic pruritus is nearly pathognomonic for PV"],
    quiz: [{
      question: "A patient with PV has hematocrit of 52%. Treatment priority?",
      options: ["Chemotherapy", "Therapeutic phlebotomy to reduce hematocrit below 45%", "Iron supplements", "No treatment needed"],
      correct: 1,
      rationale: "Hematocrit <45% is the primary goal. At 52%, blood viscosity significantly increases thrombotic risk."
    }, {
      question: "A patient with elevated H&H reports itching after every warm shower. What does this suggest?",
      options: ["Allergic dermatitis", "Polycythemia vera — aquagenic pruritus is characteristic", "Eczema", "Drug allergy"],
      correct: 1,
      rationale: "Aquagenic pruritus triggered by warm water is nearly pathognomonic for PV, caused by histamine release from increased mast cells."
    }, {
      question: "How does EPO level distinguish primary from secondary polycythemia?",
      options: ["Elevated in both", "In PV, EPO is LOW (autonomous production); in secondary, EPO is HIGH (response to hypoxemia)", "Normal in both", "Not useful"],
      correct: 1,
      rationale: "In PV, JAK2 mutation drives autonomous proliferation so EPO is suppressed. In secondary polycythemia, EPO is appropriately elevated in response to chronic hypoxemia."
    }]
  },
  "polymyositis-rn": {
    title: "Polymyositis: Nursing Assessment & Care",
    cellular: { title: "Pathophysiology of Polymyositis", content: "Polymyositis (PM) is an idiopathic inflammatory myopathy with symmetric proximal muscle weakness from CD8+ T-cell-mediated destruction of muscle fibers. Unlike dermatomyositis (humoral/complement-mediated with skin findings), PM involves direct T-cell invasion of individual muscle fibers.\n\nProximal muscles are preferentially affected: shoulder girdle (difficulty lifting arms), pelvic girdle (difficulty climbing stairs, rising from chair), and neck flexors (difficulty lifting head off pillow). Distal strength is preserved early. Facial and eye muscles are NOT affected (distinguishing from myasthenia gravis).\n\nComplications include interstitial lung disease (up to 40%, especially with anti-Jo-1 antibodies), dysphagia (aspiration risk from pharyngeal muscle weakness), and cardiac involvement. PM is associated with increased malignancy risk in patients over 40." },
    riskFactors: ["Female sex (2:1 predominance)", "Age 40-60 years", "African American descent", "Associated autoimmune diseases", "Anti-Jo-1 antibodies (antisynthetase syndrome with ILD)", "Malignancy association (>40 years)", "HLA-DR3", "Statin medications"],
    diagnostics: ["Order CK — markedly elevated (5-50× normal)", "Order aldolase (elevated)", "Order myositis-specific antibodies: anti-Jo-1, anti-Mi-2, anti-SRP, anti-MDA5", "Order EMG: myopathic pattern", "Order muscle biopsy (gold standard): CD8+ T-cell endomysial inflammation", "Order PFTs and HRCT for ILD screening"],
    management: ["First-line: high-dose corticosteroids (prednisone 1 mg/kg/day) with slow taper", "Steroid-sparing agent early: methotrexate or azathioprine", "Refractory: IVIG, rituximab, mycophenolate, tacrolimus", "Screen for malignancy at diagnosis", "Treat ILD if present", "Physical therapy: gentle ROM during active disease; strengthening in remission"],
    nursingActions: ["Assess proximal strength: rise from chair without arms? Climb stairs? Lift arms overhead? Lift head off pillow?", "Monitor CK for disease activity", "Assess swallowing function (aspiration risk)", "Monitor respiratory symptoms (ILD)", "Implement fall prevention", "Monitor steroid side effects", "Distinguish steroid myopathy from disease flare (CK normal in steroid myopathy)", "Educate on gradual activity progression"],
    assessmentFindings: ["Symmetric PROXIMAL muscle weakness", "Difficulty rising from chairs, climbing stairs, reaching overhead", "Markedly elevated CK (5-50× normal)", "Dysphagia", "No skin rash (differentiates from dermatomyositis)", "No facial/eye weakness (differentiates from MG)", "Mechanic's hands if antisynthetase syndrome"],
    signs: {
      left: ["Difficulty rising from chair", "Difficulty climbing stairs", "Unable to lift arms overhead", "Difficulty swallowing", "Weak neck flexion"],
      right: ["CK markedly elevated", "Positive anti-Jo-1", "Myopathic EMG pattern", "CD8+ T-cell invasion on biopsy", "ILD on HRCT"]
    },
    medications: [{
      name: "Prednisone (for Polymyositis)",
      type: "Systemic corticosteroid",
      action: "Suppresses T-cell-mediated immune attack on muscle fibers; reduces inflammation allowing regeneration",
      sideEffects: "Weight gain, hyperglycemia, osteoporosis, immunosuppression, Cushingoid features, steroid myopathy",
      contra: "Active untreated infections",
      pearl: "Start 1 mg/kg/day; maintain until CK normalizes AND strength improves (4-8 weeks); taper slowly (10%/month); CK normalizes before strength — do NOT taper on CK alone; steroid myopathy has NORMAL CK"
    }],
    pearls: ["PROXIMAL weakness is the hallmark — stairs, chairs, overhead reaching", "CK is the best disease activity marker (5-50× normal)", "Dermatomyositis has SKIN findings; polymyositis does NOT", "CK normalizes before strength returns — wait for both before tapering steroids", "Steroid myopathy mimics PM flare but CK is NORMAL", "Anti-Jo-1 = antisynthetase syndrome: PM + ILD + mechanic's hands — screen for ILD"],
    quiz: [{
      question: "A patient cannot rise from a chair, has difficulty climbing stairs, CK is 20× normal, and no skin rash. Likely diagnosis?",
      options: ["Myasthenia gravis", "Polymyositis — proximal weakness with elevated CK and no rash", "Dermatomyositis", "Fibromyalgia"],
      correct: 1,
      rationale: "Symmetric proximal weakness with markedly elevated CK and no skin rash is classic for polymyositis. Dermatomyositis has characteristic skin findings. MG affects ocular/facial muscles with normal CK."
    }, {
      question: "A patient on prednisone for PM develops new weakness but CK is now normal. What should be suspected?",
      options: ["PM flare requiring more prednisone", "Steroid myopathy — weakness from prolonged steroids; CK is NORMAL (elevated in PM flare)", "Non-adherence", "New onset MG"],
      correct: 1,
      rationale: "In PM flare, CK is elevated from active muscle destruction. In steroid myopathy, weakness occurs from muscle atrophy but CK is normal. Normal CK with new weakness on chronic steroids = steroid myopathy."
    }, {
      question: "Why assess swallowing in every PM patient?",
      options: ["Medication difficulty", "Pharyngeal muscle weakness causes dysphagia and increases aspiration pneumonia risk", "Appetite loss", "Steroid throat effects"],
      correct: 1,
      rationale: "PM can affect pharyngeal muscles causing dysphagia in up to 30% of patients, increasing aspiration pneumonia risk."
    }]
  },
  "polypharmacy-deprescribing-np": {
    title: "Polypharmacy & Deprescribing: Evidence-Based Approach",
    cellular: { title: "Polypharmacy Harm and Deprescribing Principles", content: "Polypharmacy (≥5 medications; excessive ≥10) increases adverse drug events, drug-drug interactions, falls, hospitalizations, and mortality. Each additional medication increases ADE risk by ~10%. The prescribing cascade — drug side effects treated with additional drugs — is a major driver.\n\nDeprescribing is the planned, supervised process of reducing or stopping medications no longer needed or causing harm. It requires systematic review, shared decision-making, gradual dose reduction, and monitoring.\n\nThe framework: (1) Identify all medications and indications; (2) Assess harm risk using Beers Criteria, STOPP/START criteria; (3) Determine if each can be discontinued, reduced, or substituted; (4) Plan the process (one drug at a time, taper if needed, monitor); (5) Monitor outcomes.\n\nPPIs, benzodiazepines, anticholinergics, first-generation antihistamines, long-acting sulfonylureas, and Z-drugs are the most commonly deprescribed in older adults." },
    riskFactors: ["Age ≥65 years", "≥5 chronic medications", "Multiple prescribers without coordination", "Transitions of care", "Cognitive impairment", "Fall history", "Renal or hepatic impairment", "Prescribing cascade"],
    diagnostics: ["Complete medication reconciliation: all prescriptions, OTC, herbals, supplements", "Review each medication for current indication and potential harm", "Apply Beers Criteria (AGS)", "Apply STOPP/START criteria", "Calculate anticholinergic burden score", "Assess patient goals of care and functional status"],
    management: ["Deprescribe one medication at a time", "Taper medications requiring gradual withdrawal: benzodiazepines, SSRIs/SNRIs, corticosteroids, beta-blockers, gabapentinoids, opioids", "Stop medications that can be discontinued without taper: statins, PPIs (after 8 weeks), bisphosphonates, vitamins without deficiency", "Prioritize highest-harm medications: anticholinergics, benzodiazepines, opioids, long-term PPIs", "Implement non-pharmacological alternatives when possible", "Monitor for withdrawal and disease recurrence"],
    nursingActions: ["Perform medication reconciliation at every visit", "Assess functional ability to manage medication regimen", "Identify prescribing cascades", "Monitor for withdrawal or disease recurrence during deprescribing", "Educate that fewer medications can be better", "Use teach-back method after changes", "Coordinate communication between prescribers"],
    assessmentFindings: ["Number of medications and regimen complexity", "Potentially inappropriate medications identified", "Medications without current indication", "Prescribing cascade patterns", "Anticholinergic burden score", "Patient functional ability to manage medications"],
    signs: {
      left: ["Patient confused about medications", "Not taking medications as prescribed", "New falls or dizziness", "Cognitive decline", "Fatigue and decreased function"],
      right: ["≥5 medications", "Beers Criteria drugs identified", "High anticholinergic burden", "Drug-drug interactions present", "Prescribing cascade identified"]
    },
    medications: [{
      name: "Omeprazole (Prilosec) — Deprescribing Example",
      type: "PPI — commonly deprescribed in older adults",
      action: "Irreversibly inhibits H+/K+ ATPase reducing gastric acid",
      sideEffects: "Long-term: C. difficile, pneumonia, hypomagnesemia, B12 deficiency, bone fractures, CKD",
      contra: "No absolute contraindication, but long-term use without indication should prompt deprescribing",
      pearl: "Deprescribing: reduce dose 50% for 2-4 weeks, then every other day for 2-4 weeks, then stop; use on-demand H2 blocker for breakthrough symptoms"
    }],
    pearls: ["Each additional medication increases ADE risk by ~10%", "Deprescribe one at a time to identify cause of any new symptoms", "Prescribing cascade example: NSAID → edema → furosemide → hypokalemia → K+ supplement — better to stop the NSAID", "Beers Criteria: avoid benzodiazepines, anticholinergics, long-acting sulfonylureas in elderly", "PPIs started for appropriate reason should be reassessed after 8 weeks", "Taper medications that cause withdrawal: benzodiazepines, opioids, beta-blockers, corticosteroids"],
    quiz: [{
      question: "An 82-year-old on 12 medications falls and fractures her hip. Her list includes a benzodiazepine and anticholinergic. Priority?",
      options: ["Add osteoporosis medication", "Deprescribe fall-risk medications (benzodiazepine, anticholinergic) — they contributed to the fall", "Add calcium", "Increase activity"],
      correct: 1,
      rationale: "The benzodiazepine and anticholinergic directly increase fall risk. Deprescribing these potentially inappropriate medications per Beers Criteria is the priority."
    }, {
      question: "A patient has been on omeprazole for 3 years for GERD that resolved 2 years ago. How to discontinue?",
      options: ["Stop immediately", "Gradual step-down: reduce dose, then alternate days, then stop — with on-demand H2 blocker for rebound", "Continue indefinitely", "Switch PPI"],
      correct: 1,
      rationale: "Gradual step-down over 4-8 weeks prevents rebound acid hypersecretion from abrupt discontinuation."
    }, {
      question: "What is a prescribing cascade?",
      options: ["Prescribing antibiotics sequentially", "A drug side effect mistaken for a new condition, leading to additional prescriptions in a chain of unnecessary polypharmacy", "Prescribing by priority", "Alphabetical prescribing"],
      correct: 1,
      rationale: "Example: amlodipine → edema → furosemide → hypokalemia → K+ supplement → GI upset → PPI. The better approach: recognize edema as a drug side effect and switch the antihypertensive."
    }]
  }
};
