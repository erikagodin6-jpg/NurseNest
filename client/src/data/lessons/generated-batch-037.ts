import type { LessonContent } from "./types";

export const generatedBatch037Lessons: Record<string, LessonContent> = {
  "fluid-electrolyte-basics": {
    title: "Fluid and Electrolyte Basics",
    cellular: { title: "Pathophysiology of Fluid and Electrolyte Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of fluid electrolyte basics or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Furosemide",
      type: "Loop diuretic",
      action: "Inhibits sodium-potassium-chloride cotransporter in the loop of Henle",
      sideEffects: "Hypokalemia, dehydration, ototoxicity, hyperglycemia, hyperuricemia",
      contra: "Anuria, severe electrolyte depletion, hepatic coma",
      pearl: "Monitor potassium levels; administer IV push no faster than 4 mg/min to prevent ototoxicity"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with fluid electrolyte basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with fluid electrolyte basics?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their fluid electrolyte basics diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "fluid-resuscitation-logic-rpn": {
        title: "Fluid Resuscitation Principles and Monitoring for Practical Nurses",
        cellular: { title: "Pathophysiology of Shock and Fluid Resuscitation", content: "Fluid resuscitation is the rapid administration of intravenous fluids to restore adequate circulating blood volume and tissue perfusion in patients experiencing shock or severe fluid loss. Shock is defined as a state of inadequate tissue perfusion in which oxygen delivery to cells is insufficient to meet metabolic demand, resulting in cellular hypoxia, anaerobic metabolism, and ultimately, organ dysfunction and death if untreated. At the cellular level, when oxygen delivery fails, cells switch from aerobic metabolism (which produces 36-38 ATP molecules per glucose molecule via the Krebs cycle and oxidative phosphorylation) to anaerobic metabolism (which produces only 2 ATP molecules per glucose molecule via glycolysis). This energy deficit causes failure of the sodium-potassium ATPase pump, leading to sodium and water influx into the cell (cellular edema), potassium efflux (hyperkalemia), and ultimately cell membrane rupture (lysis). Anaerobic metabolism produces lactic acid as a byproduct, leading to lactic acidosis (serum lactate above 2 mmol/L; levels above 4 mmol/L indicate severe tissue hypoperfusion and carry high mortality). There are four primary types of shock. Hypovolemic shock results from loss of circulating blood volume through hemorrhage (trauma, GI bleeding, surgical blood loss) or fluid loss (severe dehydration from vomiting, diarrhea, burns, or diabetic ketoacidosis). Compensatory mechanisms (tachycardia, peripheral vasoconstriction, ADH and aldosterone release) initially maintain blood pressure; hypotension is a LATE sign indicating loss of approximately 30% of blood volume (Class III hemorrhage). Distributive shock occurs when blood vessels inappropriately vasodilate, reducing systemic vascular resistance and creating a relative hypovolemia despite normal or increased total blood volume. Subtypes include septic shock (most common, caused by systemic inflammatory response to infection releasing vasodilatory mediators including nitric oxide, interleukins, and tumor necrosis factor), anaphylactic shock (massive histamine and leukotriene release from IgE-mediated immune response causing vasodilation, bronchospasm, and increased capillary permeability), and neurogenic shock (loss of sympathetic tone from spinal cord injury above T6 causing vasodilation and bradycardia). Cardiogenic shock results from pump failure: the heart cannot generate adequate cardiac output to perfuse tissues. Causes include massive myocardial infarction (loss of more than 40% of left ventricular muscle), severe heart failure, cardiac tamponade, and massive pulmonary embolism. Obstructive shock results from mechanical obstruction of blood flow, including tension pneumothorax (air compressing the heart and great vessels), cardiac tamponade (fluid compressing the heart), and massive pulmonary embolism. Fluid resuscitation addresses hypovolemic and distributive shock by replacing lost volume or filling the expanded vascular space. Crystalloid solutions (normal saline, lactated Ringer) are first-line because they are readily available, inexpensive, and effective at expanding intravascular volume. However, because crystalloids distribute freely across the extracellular fluid (approximately 25% remains intravascular and 75% moves into interstitial space), large volumes may be needed, and excessive administration causes peripheral edema, pulmonary edema, and abdominal compartment syndrome. Colloid solutions (albumin, hydroxyethyl starch) contain large molecules that remain in the intravascular space longer, providing more sustained volume expansion per volume infused. Mean arterial pressure (MAP) is the primary perfusion pressure target during resuscitation: MAP = diastolic BP + 1/3 (systolic BP minus diastolic BP). A MAP of at least 65 mmHg is the minimum target to maintain adequate organ perfusion. The Parkland formula for burn resuscitation calculates fluid requirements in the first 24 hours: 4 mL x body weight (kg) x total body surface area (TBSA) burned (%). Half of the calculated volume is given in the first 8 hours from the time of burn (not from hospital arrival), and the remaining half is given over the next 16 hours. Lactated Ringer solution is the preferred fluid for burn resuscitation. Urine output is the most reliable real-time indicator of adequate resuscitation: the target is 0.5 mL/kg/hour in adults (30-50 mL/hour) and 1 mL/kg/hour in children." },
        riskFactors: ["Hemorrhage from trauma, surgery, or gastrointestinal bleeding (most common cause of hypovolemic shock)","Severe sepsis or septic shock (systemic vasodilation and capillary leak from infection-mediated inflammatory response)","Major burns (massive fluid shifts through damaged capillaries; fluid requirements proportional to burn surface area)","Severe dehydration from prolonged vomiting, diarrhea, diabetic ketoacidosis, or heat-related illness","Anaphylaxis causing massive vasodilation and increased capillary permeability (insect stings, medications, foods)","Acute pancreatitis (massive third-spacing of fluid into the retroperitoneal space and peritoneal cavity)","Postoperative patients (blood loss, NPO status, third-spacing, insensible losses from surgical exposure)"],
        diagnostics: ["Serum lactate: most important marker of tissue perfusion during resuscitation; lactate above 2 mmol/L indicates tissue hypoperfusion; above 4 mmol/L indicates severe shock with high mortality; trending lactate clearance (decrease of 10-20% every 2 hours) indicates effective resuscitation","Arterial blood gas (ABG): identifies metabolic acidosis (decreased pH, decreased bicarbonate) from lactic acid accumulation in shock; base deficit greater than -6 mEq/L correlates with significant tissue oxygen debt","Complete blood count (CBC): hemoglobin and hematocrit assess blood loss (may be falsely normal in acute hemorrhage before hemodilution occurs); white blood cell count elevated in sepsis or may be critically low in severe sepsis","Basic metabolic panel (BMP): BUN/creatinine assess renal perfusion (rising creatinine indicates acute kidney injury from inadequate perfusion); electrolytes guide replacement therapy","Coagulation studies (INR, PTT, fibrinogen): assess for disseminated intravascular coagulation (DIC) in septic shock and massive hemorrhage; prolonged INR/PTT with low fibrinogen and elevated D-dimer indicate DIC","Central venous pressure (CVP) monitoring: when available, CVP below 8 cmH2O suggests hypovolemia and need for volume; CVP above 12 cmH2O may indicate adequate filling or fluid overload; interpreted in conjunction with clinical response"],
        management: ["Establish two large-bore IV lines (16-18 gauge) in antecubital fossa for rapid fluid administration; larger gauge catheters allow faster flow rates (flow rate is proportional to the fourth power of catheter radius)","Administer isotonic crystalloid boluses as ordered: typical initial bolus is 500-1000 mL of normal saline or lactated Ringer over 15-30 minutes; reassess after each bolus (vital signs, urine output, level of consciousness) before administering additional boluses","For burn resuscitation using the Parkland formula: 4 mL x body weight (kg) x %TBSA burned; give half in first 8 hours from time of burn, remaining half over next 16 hours; titrate based on urine output target of 0.5 mL/kg/hour","Monitor MAP continuously; target MAP of 65 mmHg or greater; if MAP does not improve with fluid administration alone, anticipate vasopressor support (norepinephrine is first-line for septic shock)","Monitor urine output hourly via indwelling catheter: target 0.5 mL/kg/hour in adults (approximately 30-50 mL/hour); urine output below this target for 2 consecutive hours despite fluid administration indicates inadequate resuscitation or developing organ dysfunction","Monitor for signs of fluid overload during aggressive resuscitation: new onset crackles, increasing oxygen requirements, rising JVP, new peripheral edema -- report immediately as this may indicate cardiogenic component or over-resuscitation","Warm all IV fluids to body temperature when administering large volumes to prevent hypothermia (hypothermia worsens coagulopathy, acidosis, and cardiac function in shocked patients -- the lethal triad of trauma is hypothermia, acidosis, and coagulopathy)"],
        nursingActions: ["Perform rapid primary assessment (ABCDE: Airway, Breathing, Circulation, Disability, Exposure) and report findings using SBAR to the medical team immediately","Obtain and document baseline vital signs including blood pressure, heart rate, respiratory rate, temperature, oxygen saturation, and level of consciousness; reassess every 5-15 minutes during active resuscitation","Insert indwelling urinary catheter as ordered and measure urine output hourly; report output less than 0.5 mL/kg/hour for 2 consecutive hours -- this is the most reliable bedside indicator of resuscitation adequacy","Administer IV fluids and blood products as ordered using an infusion pump or pressure bag for rapid infusion; verify fluid type, rate, and volume against physician orders before initiating","Position patient in modified Trendelenburg (legs elevated 15-30 degrees with trunk flat) to augment venous return in hypovolemic shock; avoid this position in cardiogenic shock or head injury","Monitor and record all intake and output meticulously: IV fluids, blood products, medications, urine, wound drainage, nasogastric output, and estimated blood loss; calculate fluid balance every 1-2 hours during resuscitation","Monitor for signs of transfusion reaction if blood products are administered: fever, chills, urticaria, dyspnea, back pain, hemoglobinuria -- stop transfusion immediately, maintain normal saline infusion, and notify physician"],
        assessmentFindings: ["Early (compensated) shock: anxiety, restlessness, tachycardia (first sign), mild tachypnea, normal or slightly decreased blood pressure (compensatory vasoconstriction maintains BP initially), cool pale skin, delayed capillary refill (greater than 3 seconds), slightly decreased urine output","Progressive (decompensated) shock: confusion, agitation, significant tachycardia, hypotension (systolic below 90 mmHg or MAP below 65 mmHg), rapid shallow breathing, cold clammy skin, mottling, oliguria (below 0.5 mL/kg/hour), weak thready pulse, metabolic acidosis on ABG","Irreversible (refractory) shock: obtunded or unresponsive, severe hypotension unresponsive to fluids and vasopressors, bradycardia (pre-terminal sign), agonal breathing, anuria, multiple organ dysfunction, disseminated intravascular coagulation","Septic shock (warm/distributive phase): warm flushed skin, bounding pulse, fever, tachycardia, wide pulse pressure, hypotension despite fluid resuscitation; later transitions to cold shock with vasoconstriction and organ failure","Adequate resuscitation indicators: MAP 65 mmHg or greater, urine output 0.5 mL/kg/hour or greater, serum lactate trending downward (lactate clearance), improving level of consciousness, capillary refill less than 2 seconds, normalized heart rate","Over-resuscitation indicators: new pulmonary crackles, rising oxygen requirements, jugular venous distension, increasing abdominal girth (abdominal compartment syndrome from massive crystalloid administration), worsening peripheral edema"],
        signs: { left: ["Tachycardia (heart rate above 100 -- earliest sign of hypovolemia)","Mild anxiety or restlessness","Slightly decreased urine output (less than 30 mL/hour for one measurement)","Cool extremities with capillary refill 3-4 seconds","Mild tachypnea (respiratory rate 20-24)","Systolic blood pressure maintained above 90 mmHg by compensatory mechanisms"], right: ["Hypotension (systolic below 90 mmHg or MAP below 65 mmHg) unresponsive to initial fluid bolus","Anuria (no urine output) or severe oliguria despite fluid administration","Altered level of consciousness (confusion, obtundation, unresponsiveness)","Serum lactate above 4 mmol/L or rising lactate despite resuscitation","Signs of massive hemorrhage (visible blood loss, dropping hemoglobin, coagulopathy)","Cardiac arrest (PEA or asystole) from uncorrected hypovolemia"] },
        medications: [{ name: "Normal Saline (0.9% Sodium Chloride)", type: "Isotonic crystalloid IV solution -- first-line resuscitation fluid", action: "Isotonic solution (308 mOsm/L) that expands intravascular volume by distributing across the entire extracellular fluid compartment. Approximately 25% of infused volume remains intravascular while 75% shifts to interstitial space. In shock, rapid infusion of 1-2 liters over 15-30 minutes increases preload, cardiac output, and mean arterial pressure. Compatible with all blood products and most IV medications.", sideEffects: "Hyperchloremic metabolic acidosis with large volumes (chloride exceeds physiological concentration at 154 mEq/L), fluid overload (pulmonary edema, peripheral edema), hypernatremia, dilutional coagulopathy with massive infusion", contra: "Known fluid overload or decompensated heart failure (use with extreme caution and smaller volumes); severe hypernatremia; conditions requiring potassium-containing solutions", pearl: "Normal saline is the default resuscitation fluid and the ONLY IV solution compatible with blood products; for large-volume resuscitation (greater than 2 liters), consider switching to or alternating with lactated Ringer to reduce risk of hyperchloremic acidosis; warm fluids to 37-40 degrees Celsius for massive resuscitation to prevent hypothermia" },{ name: "Lactated Ringer Solution (LR/Hartmann Solution)", type: "Isotonic crystalloid IV solution -- preferred for burn and surgical resuscitation", action: "Balanced isotonic crystalloid containing sodium (130 mEq/L), potassium (4 mEq/L), calcium (3 mEq/L), chloride (109 mEq/L), and lactate (28 mEq/L). The lactate is converted to bicarbonate by the liver, providing a buffering effect that counteracts acidosis. Lower chloride concentration compared to normal saline reduces risk of hyperchloremic metabolic acidosis. Standard fluid for Parkland formula burn resuscitation.", sideEffects: "Fluid overload, hyperkalemia (contains potassium -- dangerous in renal failure), metabolic alkalosis (excessive lactate conversion), hypercalcemia risk, lactic acidosis if liver cannot metabolize lactate (severe liver failure)", contra: "Hyperkalemia or severe renal failure; severe hepatic failure (cannot metabolize lactate); NOT compatible with blood product transfusion (calcium causes clotting with citrated blood); NOT compatible with ceftriaxone (calcium-ceftriaxone precipitate)", pearl: "Preferred over normal saline for large-volume resuscitation in burns (Parkland formula), trauma, and surgical patients because its electrolyte composition more closely matches plasma and avoids hyperchloremic acidosis; critical reminder: NEVER run LR with blood products (use NS) and NEVER mix with ceftriaxone" },{ name: "Norepinephrine (Levophed)", type: "Catecholamine vasopressor -- first-line for septic shock", action: "Potent alpha-1 adrenergic agonist with moderate beta-1 activity. Alpha-1 stimulation causes arterial and venous vasoconstriction, increasing systemic vascular resistance and raising blood pressure. Beta-1 stimulation increases heart rate and contractility, augmenting cardiac output. In septic shock, norepinephrine counteracts the pathological vasodilation caused by inflammatory mediators, restoring vascular tone and organ perfusion pressure.", sideEffects: "Peripheral ischemia (vasoconstriction reduces blood flow to extremities, skin, and kidneys), cardiac dysrhythmias, hypertension (overshoot), tissue necrosis if extravasation occurs (alpha-mediated vasoconstriction causes local ischemia), reflex bradycardia, anxiety, headache", contra: "Uncorrected hypovolemia (vasopressors without adequate volume resuscitation worsen tissue ischemia); mesenteric or peripheral vascular thrombosis; concurrent use with certain anesthetic agents (halothane -- increases dysrhythmia risk)", pearl: "Norepinephrine MUST be administered through a central venous catheter to prevent tissue necrosis from extravasation; if extravasation occurs, phentolamine (alpha-blocker) is injected locally as an antidote; always ensure adequate fluid resuscitation BEFORE initiating vasopressors -- vasopressors on a dry tank worsen organ ischemia; titrate to maintain MAP of 65 mmHg or greater; the practical nurse must monitor the infusion site continuously and report any signs of infiltration immediately" }],
        pearls: ["Tachycardia is the EARLIEST sign of hypovolemia and shock -- do not wait for hypotension (which is a LATE sign indicating approximately 30% blood volume loss) to initiate assessment and intervention","Urine output is the most reliable bedside indicator of adequate resuscitation: target 0.5 mL/kg/hour in adults (approximately 30-50 mL/hour); urine output below this target for 2 consecutive hours requires immediate reporting and intervention","The Parkland formula for burn resuscitation: 4 mL x body weight (kg) x %TBSA burned = total fluid for first 24 hours; give HALF in the first 8 hours from time of burn (not hospital arrival), remaining half over next 16 hours; use lactated Ringer solution","Mean arterial pressure (MAP) must be maintained at 65 mmHg or greater to ensure adequate organ perfusion; MAP = diastolic BP + 1/3(systolic - diastolic); report MAP below 65 immediately","The lethal triad of trauma is hypothermia, acidosis, and coagulopathy -- each element worsens the others; warm all resuscitation fluids to body temperature and monitor for these complications during massive fluid administration","Always ensure adequate volume resuscitation BEFORE vasopressor initiation -- vasopressors on a hypovolemic patient ('dry tank') cause dangerous vasoconstriction that worsens organ ischemia rather than improving perfusion","Normal saline is the ONLY IV fluid compatible with blood products; lactated Ringer contains calcium which causes clotting in citrated blood products -- this is a critical safety principle during massive transfusion protocols"],
        quiz: [{ question: "A practical nurse is monitoring a patient receiving fluid resuscitation for hypovolemic shock. The patient's heart rate has decreased from 128 to 96 beats per minute, blood pressure has increased from 78/52 to 104/68 mmHg, and urine output is 40 mL in the past hour. How should the nurse interpret these findings?", options: ["The patient is deteriorating and requires immediate vasopressor support","The patient is responding appropriately to fluid resuscitation with improving perfusion indicators","The patient is developing fluid overload and IV fluids should be stopped immediately","The findings are inconclusive and no action is needed"], correct: 1, rationale: "Decreasing heart rate (from tachycardia toward normal), increasing blood pressure, and adequate urine output (0.5 mL/kg/hour target) are all positive indicators of effective fluid resuscitation. The compensatory tachycardia is resolving as circulating volume improves. These findings should be documented and reported, and the nurse should continue monitoring closely." },{ question: "A patient with 40% total body surface area burns weighing 80 kg is being resuscitated using the Parkland formula. What is the total volume of lactated Ringer solution to be infused in the first 24 hours?", options: ["6,400 mL","9,600 mL","12,800 mL","16,000 mL"], correct: 2, rationale: "The Parkland formula calculates: 4 mL x body weight (kg) x %TBSA burned. For this patient: 4 mL x 80 kg x 40% = 12,800 mL in the first 24 hours. Half (6,400 mL) is given in the first 8 hours from the time of burn, and the remaining half (6,400 mL) is given over the next 16 hours using lactated Ringer solution." },{ question: "A practical nurse notices that a norepinephrine infusion has infiltrated into the surrounding tissue at the peripheral IV site. The skin around the insertion site is blanched and cool. What is the priority nursing action?", options: ["Apply warm compresses to the infiltrated area and continue the infusion at a different site","Stop the infusion immediately, notify the physician, and anticipate phentolamine injection into the affected area","Increase the infusion rate to maintain blood pressure while finding another IV site","Document the finding and recheck the site in 30 minutes"], correct: 1, rationale: "Norepinephrine extravasation is an emergency because its potent alpha-adrenergic vasoconstriction can cause tissue necrosis and gangrene. The infusion must be stopped immediately. Phentolamine (an alpha-adrenergic blocker) is the specific antidote and should be injected subcutaneously into the affected area to reverse local vasoconstriction. Norepinephrine should be administered through a central venous catheter to prevent this complication. Continuing infusion or delaying treatment risks permanent tissue damage." }]
  },
  "focused-assessment-rn": {
    title: "Focused Assessment by System",
    cellular: { title: "Pathophysiology of Focused Assessment by System", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of focused assessment or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with focused assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with focused assessment?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their focused assessment diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "foundations-rn": {
    title: "Airborne Precautions",
    cellular: { title: "Pathophysiology of Airborne Precautions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of foundations or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Furosemide",
      type: "Loop diuretic",
      action: "Inhibits sodium-potassium-chloride cotransporter in the loop of Henle",
      sideEffects: "Hypokalemia, dehydration, ototoxicity, hyperglycemia, hyperuricemia",
      contra: "Anuria, severe electrolyte depletion, hepatic coma",
      pearl: "Monitor potassium levels; administer IV push no faster than 4 mg/min to prevent ototoxicity"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with foundations. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with foundations?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their foundations diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "fracture-types": {
    title: "Fracture Types and Healing",
    cellular: { title: "Pathophysiology of Fracture Types and Healing", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of fracture types or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with fracture types. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with fracture types?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their fracture types diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "frailty-assessment-np": {
    title: "Frailty Assessment (Clinical Frailty Scale)",
    cellular: { title: "Pathophysiology of Frailty Assessment (Clinical Frailty Scale)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of frailty assessment or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with frailty assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with frailty assessment?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their frailty assessment diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "frailty-np": {
    title: "Frailty",
    cellular: { title: "Pathophysiology of Frailty", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of frailty or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with frailty. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with frailty?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their frailty diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "frontotemporal-dementia-rn": {
    title: "Frontotemporal Dementia",
    cellular: { title: "Pathophysiology of Frontotemporal Dementia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of frontotemporal dementia or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levetiracetam",
      type: "Anticonvulsant",
      action: "Modulates synaptic vesicle protein SV2A to reduce neuronal excitability",
      sideEffects: "Drowsiness, behavioral changes, dizziness, fatigue",
      contra: "Known hypersensitivity; dose adjustment needed in renal impairment",
      pearl: "Fewer drug interactions than older anticonvulsants; monitor for mood changes"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with frontotemporal dementia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with frontotemporal dementia?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their frontotemporal dementia diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "fsgs-rn": {
    title: "Focal Segmental Glomerulosclerosis (FSGS)",
    cellular: { title: "Pathophysiology of Focal Segmental Glomerulosclerosis (FSGS)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of fsgs or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Furosemide",
      type: "Loop diuretic",
      action: "Inhibits sodium-potassium-chloride cotransporter in the loop of Henle",
      sideEffects: "Hypokalemia, dehydration, ototoxicity, hyperglycemia, hyperuricemia",
      contra: "Anuria, severe electrolyte depletion, hepatic coma",
      pearl: "Monitor potassium levels; administer IV push no faster than 4 mg/min to prevent ototoxicity"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with fsgs. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with fsgs?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their fsgs diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "fulminant-hepatitis-rn": {
    title: "Fulminant Hepatitis",
    cellular: { title: "Pathophysiology of Fulminant Hepatitis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of fulminant hepatitis or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Omeprazole",
      type: "Proton pump inhibitor (PPI)",
      action: "Irreversibly inhibits hydrogen-potassium ATPase pump in gastric parietal cells",
      sideEffects: "Headache, diarrhea, abdominal pain, risk of C. difficile, hypomagnesemia",
      contra: "Concomitant use with rilpivirine; caution with long-term use",
      pearl: "Take 30 minutes before meals; long-term use requires monitoring of magnesium and B12"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with fulminant hepatitis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with fulminant hepatitis?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their fulminant hepatitis diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "functional-assessment-rn": {
    title: "Functional Assessment (ADL, Katz, Barthel)",
    cellular: { title: "Pathophysiology of Functional Assessment (ADL, Katz, Barthel)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of functional assessment or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with functional assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with functional assessment?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their functional assessment diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "fundal-height-rpn": {
        title: "Uterine Fundal Assessment for Practical Nurses",
        cellular: { title: "Anatomy and Physiology of the Uterus During Pregnancy and Postpartum", content: "The uterus is a hollow muscular organ situated in the pelvic cavity between the bladder and the rectum. In its non-pregnant state, the uterus weighs approximately 60 grams and measures approximately 7.5 centimeters in length. During pregnancy, the uterus undergoes remarkable changes driven by estrogen and progesterone: it increases in weight to approximately 1000 grams (a 16-fold increase), its capacity increases from 10 mL to 5000 mL or more, and its blood flow increases from 50 mL per minute to approximately 500 to 700 mL per minute at term. The uterine wall consists of three layers: the endometrium (inner mucosal layer, which becomes the decidua during pregnancy), the myometrium (thick muscular middle layer composed of smooth muscle cells arranged in interlocking bundles), and the perimetrium (outer serosal layer continuous with the peritoneum). The myometrium is the thickest layer and is responsible for the powerful contractions of labor. The unique figure-of-eight arrangement of myometrial muscle fibers surrounding blood vessels is critical to understanding postpartum hemostasis: when these fibers contract after placental delivery, they compress the blood vessels that supplied the placental site (often called physiological ligatures or living ligatures), effectively controlling bleeding. This mechanism makes myometrial contraction the primary defense against postpartum hemorrhage. Fundal height measurement during pregnancy uses the McDonald rule: the distance in centimeters from the symphysis pubis to the top of the uterine fundus correlates approximately with the gestational age in weeks between 20 and 36 weeks. For example, at 28 weeks gestation, the fundal height should measure approximately 28 centimeters (plus or minus 2 cm). A fundal height measurement more than 2 cm greater than expected for gestational age may indicate multiple gestation, polyhydramnios (excess amniotic fluid), fetal macrosomia, or incorrect dating. A measurement more than 2 cm less than expected may indicate intrauterine growth restriction (IUGR), oligohydramnios (decreased amniotic fluid), transverse lie, or incorrect dating. During pregnancy, the uterine fundus rises predictably: at 12 weeks it is palpable just above the symphysis pubis, at 20 weeks it reaches the umbilicus, and at 36 weeks it reaches the xiphoid process before dropping slightly at 38-40 weeks as the fetal head descends into the pelvis (lightening). After delivery, the uterine fundus should be palpable at or slightly below the level of the umbilicus immediately after placental delivery. Postpartum involution is the process by which the uterus returns to its pre-pregnant size and position. During involution, the uterus decreases in size by approximately one fingerbreadth (approximately 1 cm) per day. By day 10-14 postpartum, the uterus should no longer be palpable above the symphysis pubis. Involution is mediated by autolysis (self-digestion of uterine tissue by intracellular proteolytic enzymes) and by the compressive effect of myometrial contractions. Factors that impair involution include uterine atony, retained placental fragments, overdistended uterus (macrosomia, multiple gestation, polyhydramnios), full bladder (displaces the uterus and prevents effective contraction), and infection (endometritis). A boggy, soft, non-contracted uterus is the most common cause of early postpartum hemorrhage and requires immediate intervention. The practical nurse must be proficient in assessing fundal height and firmness, recognizing deviations from expected findings, and implementing first-line interventions for uterine atony including fundal massage and bladder emptying." },
        riskFactors: ["Grand multiparity (five or more previous pregnancies) resulting in reduced myometrial tone and increased risk of uterine atony","Uterine overdistension from macrosomic fetus (greater than 4000 grams), multiple gestation, or polyhydramnios","Prolonged labor (greater than 20 hours for nulliparas, greater than 14 hours for multiparas) causing myometrial fatigue","Precipitous labor (less than 3 hours) with inadequate time for progressive uterine adaptation","Chorioamnionitis (intrauterine infection during labor) predisposing to postpartum endometritis and impaired involution","Use of tocolytic agents (terbutaline, magnesium sulfate) that promote uterine relaxation","Retained placental fragments preventing effective myometrial contraction at the placental site"],
        diagnostics: ["Fundal height measurement (McDonald rule): using a non-elastic measuring tape, measure from the superior border of the symphysis pubis over the abdominal curve to the top of the uterine fundus; result in centimeters should approximate gestational age in weeks (plus or minus 2 cm) between 20 and 36 weeks","Postpartum fundal assessment: palpate the uterine fundus using one hand to support the lower uterine segment while the other hand locates the top of the fundus; assess height relative to the umbilicus, firmness (firm vs boggy), and position (midline vs deviated)","Ultrasound measurement of fundal height: used when tape measurement is unreliable (obesity, fibroids, abnormal lie); provides fetal biometry for growth assessment","Lochia assessment: evaluate amount (scant, light, moderate, heavy), color (rubra days 1-3, serosa days 4-10, alba days 11-21+), odor (should not be foul-smelling), and presence of clots; correlate with fundal findings","Complete blood count (CBC): hemoglobin and hematocrit to assess for blood loss; baseline should be obtained on admission and repeated if hemorrhage is suspected","Quantitative blood loss (QBL): weigh blood-soaked pads and linens (1 gram equals approximately 1 mL of blood); more accurate than visual estimation for detecting postpartum hemorrhage"],
        management: ["Antepartum: measure fundal height at every prenatal visit from 20 weeks onward; plot measurements on a growth chart to identify trends suggesting SGA or LGA","Immediate postpartum: assess fundal height, firmness, and position every 15 minutes for the first hour, then every 30 minutes for the next hour, then every 4 hours for 24 hours per facility protocol","If uterus is boggy (soft and non-contracted): first ensure the bladder is empty (a full bladder displaces the uterus and prevents effective contraction), then perform fundal massage by placing one hand on the lower uterine segment for support and using the other hand to firmly massage the fundus in a circular motion until it becomes firm","Administer uterotonic medications as prescribed: oxytocin (first-line), methylergonovine (second-line), misoprostol (when other agents are unavailable or contraindicated)","If fundal height during pregnancy is more than 2 cm greater or less than expected for gestational age, report to the physician or midwife for further evaluation (ultrasound for fetal growth, amniotic fluid volume, and presentation)","Encourage early ambulation and breastfeeding postpartum: breastfeeding stimulates endogenous oxytocin release which promotes uterine contraction and involution","Monitor for subinvolution (failure of the uterus to return to pre-pregnant size by 6 weeks postpartum): causes include retained products of conception and endometritis; report persistent elevation of the fundus, heavy or prolonged bleeding, and foul-smelling lochia"],
        nursingActions: ["Measure fundal height during pregnancy using the McDonald rule: empty the bladder first, position the patient supine with knees slightly flexed, place the zero mark of the tape at the symphysis pubis, and measure to the top of the fundus without stretching the tape","Assess postpartum fundal position by documenting the number of fingerbreadths above or below the umbilicus (for example: fundus firm, midline, at the umbilicus; or fundus firm, 2 fingerbreadths below the umbilicus)","Always assess bladder fullness before fundal assessment: a full bladder displaces the uterus upward and laterally (typically to the right) and prevents effective myometrial contraction -- encourage voiding or catheterize if unable to void","Document lochia concurrently with fundal assessment: increased lochia with a rising or boggy fundus suggests uterine atony or retained products; foul-smelling lochia suggests endometritis","Teach the postpartum patient self-assessment of fundal firmness and how to perform self-massage if the uterus feels soft; instruct on signs requiring immediate medical attention (heavy bleeding, large clots, dizziness, feeling faint)","Report immediately: boggy uterus that does not respond to massage, fundal height that is rising rather than descending postpartum, heavy bleeding with clots, or uterine deviation from midline that persists after bladder emptying","Calculate and document estimated blood loss or quantitative blood loss per facility protocol; recognize that postpartum hemorrhage is defined as blood loss greater than 500 mL for vaginal delivery or greater than 1000 mL for cesarean delivery"],
        assessmentFindings: ["Normal antepartum: fundal height in centimeters approximately equals gestational age in weeks between 20 and 36 weeks (plus or minus 2 cm)","Normal immediate postpartum: fundus firm, midline, at or one fingerbreadth below the umbilicus; lochia rubra moderate amount","Boggy uterus: soft, non-contracted, spongy feel on palpation; the most common cause of early postpartum hemorrhage; requires immediate fundal massage and bladder emptying","Uterine deviation from midline (typically to the right): most commonly caused by a distended bladder; fundus may also be higher than expected because a full bladder elevates the uterus","Fundal height greater than expected for gestational age (more than 2 cm above): suggests macrosomia, multiple gestation, polyhydramnios, or incorrect dating","Fundal height less than expected for gestational age (more than 2 cm below): suggests intrauterine growth restriction, oligohydramnios, transverse lie, or incorrect dating","Subinvolution: uterus remains enlarged beyond expected timeline; lochia persists beyond 3 weeks or returns to rubra; may indicate retained products of conception or endometritis"],
        signs: { left: ["Fundal height appropriate for gestational age (within 2 cm of expected)","Postpartum fundus firm and midline, descending approximately 1 cm per day","Normal lochia progression: rubra (days 1-3), serosa (days 4-10), alba (days 11-21)","Mild uterine cramping with breastfeeding (afterpains from oxytocin release)","Slight fundal deviation corrected after bladder emptying","Small clots (less than golf ball size) in lochia within first 24 hours"], right: ["Boggy uterus not responding to fundal massage (uterine atony -- postpartum hemorrhage risk)","Heavy bleeding saturating more than one pad per hour with large clots","Fundal height rising rather than descending postpartum (suggests hemorrhage or retained products)","Persistent uterine deviation from midline despite empty bladder (may indicate pelvic mass or hematoma)","Foul-smelling lochia with fever and uterine tenderness (endometritis)","Signs of hypovolemic shock: tachycardia, hypotension, pallor, diaphoresis, altered level of consciousness"] },
        medications: [{ name: "Oxytocin (Pitocin/Syntocinon)", type: "Uterotonic agent (synthetic posterior pituitary hormone)", action: "Binds to oxytocin receptors on myometrial smooth muscle cells, activating the phospholipase C-inositol triphosphate (IP3) signaling cascade that releases intracellular calcium stores. The resulting increase in intracellular calcium activates myosin light-chain kinase, producing sustained myometrial contraction. Postpartum oxytocin promotes uterine contraction to compress the spiral arteries at the placental site, preventing hemorrhage. The number of oxytocin receptors increases dramatically during pregnancy, reaching peak density at term, which explains the uterus's increasing sensitivity to oxytocin as pregnancy progresses.", sideEffects: "Water intoxication and hyponatremia (oxytocin has antidiuretic hormone-like effects at high doses), hypotension (especially with rapid IV bolus), nausea, vomiting, uterine hyperstimulation (tachysystole)", contra: "Hypersensitivity to oxytocin; situations where vaginal delivery is contraindicated (for labor induction); caution with IV bolus as it can cause severe hypotension", pearl: "Postpartum oxytocin is administered as a continuous IV infusion (10-40 units in 1000 mL of lactated Ringer solution) or as an IM injection (10 units); NEVER give oxytocin as an undiluted IV bolus because it can cause life-threatening hypotension; breastfeeding triggers endogenous oxytocin release which naturally supports involution" },{ name: "Methylergonovine (Methergine)", type: "Ergot alkaloid uterotonic agent", action: "Directly stimulates smooth muscle contraction by acting on alpha-adrenergic and serotonin receptors in the myometrium, producing a sustained tetanic contraction. Unlike oxytocin which produces rhythmic contractions, methylergonovine produces a prolonged, firm contraction of the uterus that compresses uterine blood vessels and controls hemorrhage. It also constricts peripheral and cerebral blood vessels through alpha-adrenergic receptor activation.", sideEffects: "Hypertension (significant risk due to systemic vasoconstriction), nausea, vomiting, headache, dizziness, chest pain, coronary vasospasm, peripheral vasoconstriction causing numbness and tingling in extremities", contra: "ABSOLUTELY CONTRAINDICATED in hypertension, preeclampsia, and eclampsia because of the risk of severe hypertension, stroke, and seizures; also contraindicated in peripheral vascular disease and coronary artery disease", pearl: "ALWAYS check blood pressure BEFORE administering methylergonovine -- if BP is greater than 140/90 mmHg, withhold the medication and notify the physician; administer IM (0.2 mg) as first-line route; oral form (0.2 mg every 6-8 hours) may be prescribed for up to 7 days postpartum for persistent bleeding; never administer IV unless life-threatening hemorrhage (risk of severe hypertensive crisis)" },{ name: "Misoprostol (Cytotec)", type: "Prostaglandin E1 analogue (uterotonic agent)", action: "Binds to prostaglandin EP2 and EP3 receptors on myometrial smooth muscle cells, increasing intracellular calcium concentration and producing sustained uterine contractions. Misoprostol also promotes cervical ripening by stimulating collagen degradation and increasing cervical water content. As a synthetic prostaglandin E1 analogue, it stimulates both uterine contraction and gastrointestinal motility. It is heat-stable and does not require refrigeration, making it invaluable in resource-limited settings where oxytocin cold chain cannot be maintained.", sideEffects: "Diarrhea (most common), nausea, vomiting, abdominal cramping, fever and chills (especially with higher doses), shivering, headache", contra: "Known hypersensitivity to prostaglandins; use with caution in patients with asthma (may cause bronchospasm); pregnancy (teratogenic -- used only when pregnancy termination is the intended goal or postpartum)", pearl: "Misoprostol can be administered orally, sublingually, rectally, or buccally, making it extremely versatile when IV access is unavailable; for postpartum hemorrhage, the typical dose is 600-800 mcg rectally or sublingually; it is the WHO-recommended alternative when oxytocin is unavailable; shivering and fever are dose-dependent side effects that should not be confused with infection" }],
        pearls: ["A full bladder is the most common REVERSIBLE cause of uterine atony in the immediate postpartum period -- always assess bladder fullness and encourage voiding (or catheterize) before performing fundal massage or administering uterotonics","The McDonald rule (fundal height in centimeters equals gestational age in weeks) is reliable between 20 and 36 weeks; beyond 36 weeks, fetal descent into the pelvis (lightening) and variable fetal position make the measurement less reliable","Postpartum fundal height should decrease by approximately one fingerbreadth (1 cm) per day -- a fundus that is rising or remaining at the same level suggests complications such as hemorrhage, retained placental fragments, or full bladder","ALWAYS check blood pressure before administering methylergonovine (Methergine) -- this medication is ABSOLUTELY CONTRAINDICATED in hypertension and preeclampsia because it causes systemic vasoconstriction that can precipitate hypertensive crisis, stroke, or seizures","Afterpains (uterine cramping with breastfeeding) are caused by endogenous oxytocin release stimulated by infant suckling -- they are more intense in multiparous women because the uterus must contract more vigorously to involute after being stretched by multiple pregnancies","When assessing the fundus, use TWO hands: one hand supports the lower uterine segment (just above the symphysis pubis) while the other hand palpates and locates the top of the fundus -- failure to support the lower segment can cause uterine inversion, a life-threatening obstetric emergency","Quantitative blood loss (QBL) using weighed pads and linens (1 gram = 1 mL blood) is more accurate than visual estimation for detecting postpartum hemorrhage -- visual estimation consistently underestimates blood loss by 30-50%"],
        quiz: [{ question: "During a postpartum assessment, the practical nurse finds the uterus displaced to the right side and the fundus is two fingerbreadths above the umbilicus. The patient delivered vaginally 2 hours ago. What is the nurse's first action?", options: ["Administer the prescribed oxytocin infusion","Perform vigorous fundal massage","Assist the patient to void or catheterize if she cannot void","Notify the physician immediately"], correct: 2, rationale: "A uterus displaced to the right and higher than expected is the classic presentation of bladder distension. A full bladder elevates and displaces the uterus, preventing effective myometrial contraction. The first action is to empty the bladder by assisting the patient to void or performing catheterization. Once the bladder is empty, the fundus should return to midline and descend. If the uterus remains boggy after bladder emptying, then fundal massage and uterotonics are indicated." },{ question: "A physician orders methylergonovine (Methergine) 0.2 mg IM for a postpartum patient with persistent uterine atony. The patient's blood pressure is 152/96 mmHg. What should the practical nurse do?", options: ["Administer the medication as ordered since uterine atony is the priority concern","Withhold the medication and notify the physician because methylergonovine is contraindicated in hypertension","Administer a lower dose of methylergonovine to reduce the risk of hypertensive effects","Give the medication orally instead of IM to reduce the hypertensive effect"], correct: 1, rationale: "Methylergonovine (Methergine) is ABSOLUTELY CONTRAINDICATED in patients with hypertension because it causes systemic vasoconstriction that can precipitate severe hypertensive crisis, stroke, or seizures. With a blood pressure of 152/96 mmHg, the nurse must withhold the medication and notify the physician so an alternative uterotonic (such as misoprostol or additional oxytocin) can be prescribed. This is a safety-critical medication check." },{ question: "A practical nurse is measuring fundal height during a routine prenatal visit at 32 weeks gestation. The measurement is 38 cm. Which action should the nurse take?", options: ["Document the finding as normal since there is a range of variation","Report the discrepancy to the physician because the measurement is more than 2 cm greater than expected for gestational age","Remeasure in one week to see if the discrepancy persists","Ask the patient about her last menstrual period to recalculate the due date"], correct: 1, rationale: "According to the McDonald rule, fundal height at 32 weeks should measure approximately 32 cm (plus or minus 2 cm, so the normal range would be 30-34 cm). A measurement of 38 cm is 6 cm greater than expected, which may indicate macrosomia, multiple gestation, polyhydramnios, or incorrect dating. The nurse should report this discrepancy to the physician so that an ultrasound can be ordered for further evaluation. A difference of more than 2 cm from expected warrants investigation." }]
  },
  "fundamentals-core": {
    title: "Nursing Process (ADPIE) & Clinical Reasoning",
    cellular: { title: "Pathophysiology of Nursing Process (ADPIE) & Clinical Reasoning", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of fundamentals core or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Sertraline",
      type: "Selective serotonin reuptake inhibitor (SSRI)",
      action: "Selectively inhibits serotonin reuptake at the presynaptic membrane",
      sideEffects: "Nausea, insomnia, sexual dysfunction, diarrhea, headache",
      contra: "Concurrent use with MAOIs; pimozide co-administration",
      pearl: "Therapeutic effects may take 4-6 weeks; monitor for suicidal ideation especially in adolescents"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with fundamentals core. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with fundamentals core?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their fundamentals core diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "fungal-infections-np": {
    title: "Fungal Infections",
    cellular: { title: "Pathophysiology of Fungal Infections", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of fungal infections or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Ceftriaxone",
      type: "Third-generation cephalosporin",
      action: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins",
      sideEffects: "Diarrhea, rash, injection site pain, pseudolithiasis (biliary sludge)",
      contra: "Neonates with hyperbilirubinemia; do not co-infuse with calcium-containing solutions in neonates",
      pearl: "Broad-spectrum coverage; commonly used empirically for community-acquired pneumonia and meningitis"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with fungal infections. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with fungal infections?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their fungal infections diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "fungal-infections-overview-rpn": {
    title: "Fungal Infections Overview",
    cellular: { title: "Pathophysiology of Fungal Infections Overview", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of fungal infections overview or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Ceftriaxone",
      type: "Third-generation cephalosporin",
      action: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins",
      sideEffects: "Diarrhea, rash, injection site pain, pseudolithiasis (biliary sludge)",
      contra: "Neonates with hyperbilirubinemia; do not co-infuse with calcium-containing solutions in neonates",
      pearl: "Broad-spectrum coverage; commonly used empirically for community-acquired pneumonia and meningitis"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with fungal infections overview. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with fungal infections overview?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their fungal infections overview diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
};
