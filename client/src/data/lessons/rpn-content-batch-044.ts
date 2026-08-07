import type { LessonContent } from "./types";

const q = (question: string, options: string[], correct: number, rationale: string) => ({ question, options, correct, rationale });
const med = (name: string, type: string, action: string, sideEffects: string, contra: string, pearl: string) => ({ name, type, action, sideEffects, contra, pearl });

/**
 * REx-PN / Canadian RPN cardiovascular expansion.
 * Scope: entry-level practical nursing recognition, monitoring, safety, escalation,
 * medication teaching, and collaborative care for Ontario/BC-style practice.
 */
export const rpnContentBatch044Lessons: Record<string, LessonContent> = {
  "infective-endocarditis-rpn": {
    title: "Infective Endocarditis: Recognition and Nursing Care",
    cellular: {
      title: "How Infection Damages the Endocardium",
      content: "Infective endocarditis occurs when microorganisms enter the bloodstream and adhere to damaged endocardial tissue, prosthetic material, or abnormal valves. Platelets and fibrin collect around the organisms and form vegetations. These vegetations can interfere with valve closure, producing regurgitation and heart failure, or fragment and embolize to the brain, kidneys, spleen, skin, or extremities. Entry-level practical nursing care centres on early recognition of persistent infection, careful cardiovascular and neurologic assessment, safe administration of prescribed antimicrobial therapy, monitoring for embolic complications, and prompt escalation when the client's condition changes. Risk is increased by prosthetic valves, previous endocarditis, some structural heart lesions, injection drug use, indwelling vascular devices, and invasive procedures that introduce bacteraemia."
    },
    riskFactors: [
      "Prosthetic heart valve or prosthetic material used for valve repair",
      "Previous infective endocarditis",
      "Certain congenital or acquired structural heart abnormalities",
      "Injection drug use or repeated bloodstream exposure",
      "Long-term intravascular devices or recent bloodstream infection"
    ],
    diagnostics: [
      "Multiple blood culture sets collected before antimicrobial therapy when clinically feasible",
      "Echocardiography to assess vegetations and valve function",
      "CBC and inflammatory markers as ordered to trend infection",
      "Renal function monitoring during illness and antimicrobial treatment",
      "Focused neurologic and peripheral vascular assessment for embolic complications"
    ],
    management: [
      "Administer prescribed IV antimicrobials on schedule and monitor response",
      "Monitor temperature, heart rate, blood pressure, oxygenation, and new or changing murmur findings",
      "Escalate new focal neurologic deficits, severe dyspnea, chest pain, oliguria, or signs of shock immediately",
      "Support oral hygiene and reinforce individualized prevention teaching for high-risk clients",
      "Coordinate prolonged treatment and follow-up according to the interprofessional plan"
    ],
    nursingActions: [
      "Obtain ordered cultures before the first antimicrobial dose when this will not delay urgent treatment",
      "Assess for fever, chills, fatigue, dyspnea, edema, and worsening activity tolerance",
      "Perform frequent neurologic checks if embolic risk is suspected",
      "Inspect extremities and skin for new painful lesions, pallor, coolness, or reduced perfusion",
      "Teach the client not to stop antimicrobial therapy early even when symptoms improve"
    ],
    signs: {
      left: ["Persistent or recurrent fever", "New or changing cardiac murmur", "Fatigue and malaise", "Unexplained tachycardia"],
      right: ["Sudden focal neurologic deficit", "Acute pulmonary edema or worsening heart failure", "Flank pain or hematuria suggesting renal embolic involvement", "Cool painful limb or other acute embolic signs"]
    },
    medications: [
      med("Culture-directed IV antimicrobial therapy", "Anti-infective therapy", "Eradicates the organism causing endocardial infection; exact drug selection depends on cultures, susceptibilities, allergies, renal function, and specialist direction", "Drug-specific; may include hypersensitivity, GI effects, renal injury, cytopenias, or infusion reactions", "Drug-specific contraindications and severe allergy history must be reviewed", "For REx-PN questions, prioritize obtaining ordered cultures first when the client is stable, then giving prescribed antimicrobials promptly and monitoring for complications.")
    ],
    pearls: [
      "A sudden neurologic change in infective endocarditis can represent septic embolization and requires urgent escalation.",
      "Do not delay urgent antimicrobial therapy in an unstable client simply to complete routine testing.",
      "Persistent fever plus a new murmur is a major recognition pattern, but clients may present less dramatically."
    ],
    quiz: [
      q("A client being treated for infective endocarditis suddenly develops facial droop and arm weakness. What is the priority nursing action?", ["Reassess in 30 minutes", "Encourage oral fluids", "Activate urgent assessment for possible embolic stroke", "Administer the next antibiotic early"], 2, "Vegetations can embolize to the cerebral circulation. A sudden focal neurologic deficit is an emergency and requires immediate stroke-focused escalation."),
      q("Which action is most appropriate before the first scheduled antimicrobial dose when a stable client is being investigated for infective endocarditis?", ["Collect ordered blood cultures", "Give an antipyretic and cancel cultures", "Delay all treatment until echocardiography is complete", "Encourage strenuous ambulation"], 0, "Blood cultures help identify the causative organism and are ideally collected before antimicrobial therapy when this can be done without delaying urgent treatment."),
      q("Which finding most strongly suggests worsening cardiac involvement?", ["Improving appetite", "New dyspnea with crackles and edema", "Mild fatigue after bathing", "Occasional dry mouth"], 1, "Valve destruction can cause regurgitation and heart failure. New dyspnea, crackles, and edema require prompt assessment and escalation.")
    ]
  },

  "pericarditis-rpn": {
    title: "Acute Pericarditis and Pericardial Effusion",
    cellular: {
      title: "Inflammation, Effusion, and Tamponade Risk",
      content: "Acute pericarditis is inflammation of the pericardial sac surrounding the heart. Inflamed pericardial layers can rub against one another, producing a friction rub and sharp pleuritic chest pain. Pain classically worsens with inspiration or lying flat and may improve when the client sits forward. Inflammation can also lead to accumulation of fluid in the pericardial space. A slowly developing effusion may become large before producing severe symptoms, while rapid accumulation can compress the heart and impair ventricular filling. Cardiac tamponade is a life-threatening obstructive shock state. The practical nurse must recognize worsening dyspnea, hypotension, tachycardia, jugular venous distention, reduced heart sounds, altered level of consciousness, and signs of poor perfusion and escalate immediately."
    },
    riskFactors: ["Recent viral illness", "Recent myocardial injury or cardiac procedure", "Autoimmune or inflammatory disease", "Malignancy", "Advanced kidney disease or uremia"],
    diagnostics: ["12-lead ECG as ordered", "Echocardiography for effusion and hemodynamic effects", "Inflammatory markers and CBC as ordered", "Cardiac biomarkers when myocardial involvement or acute coronary syndrome is being considered", "Continuous vital-sign and perfusion assessment if the client is unstable"],
    management: ["Administer prescribed anti-inflammatory therapy and monitor response", "Promote rest during the acute inflammatory phase", "Monitor closely for increasing effusion or tamponade", "Prepare for urgent intervention if tamponade develops", "Avoid assuming all positional chest pain is benign; evaluate for concurrent acute coronary syndrome when indicated"],
    nursingActions: ["Assess chest pain characteristics, position, respiratory association, and severity", "Position for comfort, often upright or leaning forward if tolerated", "Monitor blood pressure, heart rate, oxygenation, mental status, and urine output", "Report rapidly worsening dyspnea, hypotension, syncope, or jugular venous distention urgently", "Reinforce medication adherence and follow-up for recurrent symptoms"],
    signs: {
      left: ["Sharp pleuritic chest pain", "Pain may improve when sitting forward", "Pericardial friction rub", "Low-grade fever may occur"],
      right: ["Hypotension with tachycardia", "Increasing jugular venous distention", "Muffled or reduced heart sounds", "Altered mentation or oliguria from poor cardiac output"]
    },
    medications: [
      med("Anti-inflammatory therapy as prescribed", "Anti-inflammatory treatment", "Reduces pericardial inflammation and pain; regimen is individualized to the cause, comorbidities, and prescriber plan", "GI upset, bleeding risk, renal effects, or other drug-specific adverse effects", "Drug-specific; renal disease, anticoagulation, GI bleeding history, and allergy require review", "REx-PN priority is not selecting a drug dose; it is recognizing deterioration toward tamponade and escalating immediately.")
    ],
    pearls: [
      "Pericarditis pain often improves sitting forward; ischemic chest pain is usually not strongly positional.",
      "Tamponade is a perfusion emergency: hypotension plus signs of venous congestion and deteriorating mental status require immediate escalation.",
      "A large effusion can sometimes develop gradually; trend symptoms and hemodynamics rather than relying on one isolated finding."
    ],
    quiz: [
      q("Which description is most characteristic of acute pericarditis?", ["Pressure only with exertion that resolves with rest", "Sharp pain worse with inspiration and lying flat", "Burning pain only after meals", "Pain isolated to the right calf"], 1, "Acute pericarditis often causes sharp pleuritic and positional chest pain that worsens when supine and may improve when sitting forward."),
      q("Which new finding in a client with a pericardial effusion requires the most urgent action?", ["Mild fatigue", "Blood pressure 82/50 mmHg with increasing drowsiness", "Reduced appetite", "Temperature 37.4°C"], 1, "Hypotension with altered mentation suggests impaired cardiac output and possible tamponade, which is a life-threatening emergency."),
      q("A client says the chest pain improves when leaning forward. What should the nurse do?", ["Conclude there is no cardiac problem", "Document the finding and continue focused cardiac assessment", "Tell the client to lie flat", "Discontinue monitoring"], 1, "Positional improvement supports pericarditis but does not eliminate other serious causes of chest pain. Continue a focused assessment and follow the diagnostic plan.")
    ]
  },

  "peripheral-arterial-disease-rpn": {
    title: "Peripheral Arterial Disease: Limb Ischemia and Foot Safety",
    cellular: {
      title: "Atherosclerotic Reduction of Limb Perfusion",
      content: "Peripheral arterial disease (PAD) is most commonly caused by atherosclerotic narrowing of arteries supplying the lower extremities. Reduced blood flow limits oxygen delivery during activity, producing intermittent claudication, and in advanced disease may cause ischemic rest pain, non-healing wounds, or tissue loss. The affected limb may be cool, pale with elevation, dependent rubor, shiny with reduced hair growth, and have diminished pulses. Practical nursing priorities are vascular assessment, protection of the limb from injury, smoking-cessation support, medication adherence, mobility and exercise teaching when appropriate, and rapid recognition of acute limb ischemia. Sudden pain, pallor, pulselessness, paresthesia, paralysis, or a cold limb suggests an arterial emergency and requires immediate escalation."
    },
    riskFactors: ["Tobacco use", "Diabetes mellitus", "Dyslipidemia", "Hypertension", "Older age and established atherosclerotic cardiovascular disease"],
    diagnostics: ["Peripheral pulse and limb perfusion assessment", "Ankle-brachial index when ordered and clinically appropriate", "Doppler vascular studies", "Skin, wound, and foot assessment", "Glucose and lipid monitoring as part of risk-factor management"],
    management: ["Support smoking cessation and cardiovascular risk reduction", "Encourage prescribed walking or exercise program when the limb is stable", "Administer prescribed antiplatelet and lipid-lowering therapy", "Protect feet from trauma, pressure, burns, and poorly fitting footwear", "Escalate suspected acute limb ischemia immediately"],
    nursingActions: ["Compare skin temperature, colour, capillary refill, sensation, and pulses bilaterally", "Inspect feet and between toes regularly, especially for clients with diabetes", "Avoid heating pads or hot-water bottles on an ischemic limb", "Encourage protective footwear and prompt reporting of blisters or wounds", "Do not apply compression therapy for venous disease unless arterial perfusion has been assessed and the plan supports it"],
    signs: {
      left: ["Intermittent claudication", "Cool extremity and diminished pulses", "Pallor with elevation or dependent rubor", "Painful distal ulcers with delayed healing"],
      right: ["Sudden severe limb pain", "New pulselessness", "Paresthesia or paralysis", "Marked pallor and coldness"]
    },
    medications: [
      med("Antiplatelet therapy as prescribed", "Antiplatelet agent", "Reduces platelet aggregation and cardiovascular thrombotic risk in appropriate clients with atherosclerotic disease", "Bleeding, bruising, GI effects depending on agent", "Active major bleeding or drug-specific contraindication", "Monitor for bleeding and reinforce that risk-factor control is part of treatment; medication does not replace foot protection or smoking cessation.")
    ],
    pearls: [
      "PAD wounds are often distal and painful because arterial perfusion is inadequate.",
      "Never use direct heat on an ischemic limb; reduced sensation and perfusion increase burn and tissue-injury risk.",
      "The six Ps pattern of acute limb ischemia is an emergency, not a routine outpatient teaching issue."
    ],
    quiz: [
      q("Which finding in a client with known PAD requires immediate escalation?", ["Calf discomfort after walking three blocks", "Sudden cold pale foot with absent pulse", "Dry skin on both shins", "Mild fatigue at the end of the day"], 1, "A sudden cold, pale, pulseless limb suggests acute arterial occlusion and threatens limb viability."),
      q("Which teaching is safest for a client with PAD and reduced foot sensation?", ["Use a heating pad for cold feet", "Walk barefoot at home", "Inspect feet daily and wear protective footwear", "Soak feet in very hot water"], 2, "Daily inspection and protective footwear reduce unnoticed injury. Direct heat and barefoot walking increase burn and trauma risk."),
      q("Which assessment pattern is more consistent with PAD than chronic venous insufficiency?", ["Warm edematous lower legs", "Diminished pulses with cool distal skin", "Brown ankle pigmentation with edema", "Symptoms relieved by prolonged standing"], 1, "Arterial insufficiency typically produces reduced pulses and cool skin, while venous disease more commonly causes edema, warmth, and stasis changes.")
    ]
  },

  "chronic-venous-insufficiency-rpn": {
    title: "Chronic Venous Insufficiency and Venous Leg Ulcers",
    cellular: {
      title: "Venous Hypertension and Tissue Injury",
      content: "Chronic venous insufficiency develops when venous valves or calf-muscle pumping do not return blood effectively to the heart. Persistent venous hypertension increases capillary pressure, allowing fluid and inflammatory mediators to move into surrounding tissue. Clients commonly develop dependent edema, aching or heaviness, stasis dermatitis, brown hemosiderin pigmentation, and shallow irregular ulcers near the medial ankle. Symptoms often worsen with prolonged standing and improve with leg elevation. Compression is a central treatment for many venous ulcers, but it must be used according to the care plan because significant arterial disease can make compression unsafe. Practical nursing care includes wound assessment, skin protection, edema management, mobility support, infection surveillance, and confirmation that vascular assessment supports the prescribed compression strategy."
    },
    riskFactors: ["Previous deep-vein thrombosis", "Varicose veins or venous valve dysfunction", "Prolonged standing or immobility", "Obesity", "Reduced calf-muscle pump function"],
    diagnostics: ["Lower-extremity skin, edema, wound, pulse, and temperature assessment", "Vascular assessment to exclude clinically significant arterial disease before strong compression", "Duplex ultrasound when ordered", "Wound measurement and drainage assessment", "Assessment for cellulitis or systemic infection when indicated"],
    management: ["Use prescribed compression when arterial circulation is adequate", "Elevate legs above heart level periodically when tolerated", "Encourage walking and calf-muscle activity", "Use evidence-based moist wound care according to the wound plan", "Treat dermatitis, infection, and contributing mobility problems collaboratively"],
    nursingActions: ["Measure edema and wound dimensions consistently", "Apply compression exactly as ordered and monitor neurovascular status", "Protect fragile periwound skin from moisture and adhesive trauma", "Teach clients to avoid prolonged dependent positioning", "Report increasing pain, pallor, coolness, numbness, or diminished pulses after compression promptly"],
    signs: {
      left: ["Dependent lower-leg edema", "Brown hemosiderin pigmentation", "Aching or heaviness worse with standing", "Shallow irregular ulcer near the gaiter or medial ankle region"],
      right: ["Rapidly spreading erythema or fever", "New severe pain out of proportion", "Cool pale foot or reduced pulses after compression", "Rapidly increasing edema with acute unilateral symptoms"]
    },
    medications: [
      med("Topical skin or wound therapies as ordered", "Local wound/skin therapy", "Supports moisture balance, dermatitis treatment, or local wound management according to wound characteristics", "Local irritation, maceration, contact dermatitis, drug-specific effects", "Product-specific contraindications and allergy", "The highest-yield REx-PN distinction is that venous ulcers often benefit from compression only after arterial sufficiency has been considered.")
    ],
    pearls: [
      "Venous disease usually produces edema and stasis skin changes; arterial disease more often produces coolness and reduced pulses.",
      "Compression is powerful therapy but is not automatically safe in a limb with compromised arterial flow.",
      "Walking supports the calf-muscle pump and can improve venous return when clinically appropriate."
    ],
    quiz: [
      q("Which finding best fits chronic venous insufficiency?", ["Cool pale foot with absent pedal pulse", "Brown ankle pigmentation with dependent edema", "Sudden paralysis of the foot", "Severe rest pain relieved by dangling the limb"], 1, "Venous hypertension commonly produces dependent edema, stasis dermatitis, and hemosiderin-related brown pigmentation."),
      q("What should the nurse verify before applying newly ordered high-compression therapy to a leg ulcer?", ["The client ate breakfast", "Arterial perfusion has been assessed and supports compression", "The wound is completely dry", "The client has no history of hypertension"], 1, "Significant arterial insufficiency can make compression unsafe. Vascular assessment should support the compression plan."),
      q("Which change after compression requires prompt reassessment?", ["Reduced edema", "Improved comfort", "New numbness with a cool pale foot", "Less drainage"], 2, "New numbness, pallor, and coolness can indicate compromised arterial perfusion and require immediate reassessment and escalation.")
    ]
  },

  "prosthetic-heart-valve-care-rpn": {
    title: "Prosthetic Heart Valves: Anticoagulation, Infection, and Safety",
    cellular: {
      title: "Mechanical and Bioprosthetic Valve Considerations",
      content: "Prosthetic heart valves restore forward blood flow when a native valve is severely stenotic or regurgitant. Mechanical valves are highly durable but their artificial surfaces increase thrombosis risk, so long-term vitamin K antagonist anticoagulation is commonly required. Bioprosthetic valves are less thrombogenic but have different durability and antithrombotic considerations. The exact regimen depends on valve type, valve position, rhythm, thromboembolic risk, bleeding risk, and specialist direction. Practical nursing priorities include medication reconciliation, bleeding assessment, monitoring ordered coagulation results for clients taking warfarin, recognition of prosthetic valve thrombosis or heart failure symptoms, infection prevention teaching, and urgent escalation of suspected stroke, major bleeding, or severe dyspnea."
    },
    riskFactors: ["Missed or incorrectly taken anticoagulant doses", "Drug or dietary changes that alter warfarin effect", "Atrial fibrillation or other thromboembolic risk factors", "Poor oral health or bloodstream infection", "Failure to attend anticoagulation or cardiology follow-up"],
    diagnostics: ["INR monitoring for clients prescribed warfarin", "CBC when bleeding or anemia is suspected", "Echocardiography when valve dysfunction is suspected", "Neurologic assessment for thromboembolism", "Assessment for fever or bloodstream infection in high-risk clients"],
    management: ["Administer anticoagulation exactly as prescribed and verify the individualized target plan", "Avoid independently stopping anticoagulation for procedures; follow prescriber and anticoagulation-service instructions", "Monitor for bleeding and thromboembolic symptoms", "Promote consistent medication-taking and coordinated follow-up", "Reinforce oral hygiene and individualized infective-endocarditis prevention advice"],
    nursingActions: ["Review all prescription, over-the-counter, and natural health products for potential interaction concerns", "Assess stool, urine, skin, gums, and neurologic status for evidence of bleeding", "Teach clients taking warfarin to keep vitamin K intake reasonably consistent rather than eliminating vitamin K foods", "Report black stool, hematemesis, uncontrolled bleeding, sudden severe headache, or focal neurologic deficit urgently", "Confirm the client knows which valve type they have and carries relevant health information when recommended"],
    signs: {
      left: ["Stable functional status", "Therapeutic monitoring within individualized plan", "No bleeding or embolic symptoms", "Good medication adherence"],
      right: ["Sudden focal neurologic deficit", "New severe dyspnea or pulmonary edema", "Major or uncontrolled bleeding", "Fever with systemic illness suggesting possible endocarditis"]
    },
    medications: [
      med("Warfarin when prescribed for a mechanical valve", "Vitamin K antagonist anticoagulant", "Reduces synthesis of vitamin K-dependent clotting factors and lowers prosthetic-valve thrombosis risk", "Bleeding, bruising; many drug, food, and illness interactions can alter anticoagulant effect", "Pregnancy in many circumstances, active major bleeding, and other individualized contraindications", "Teach consistency, not avoidance, of vitamin K-containing foods. INR targets are individualized by valve type and specialist plan; do not invent one universal target.")
    ],
    pearls: [
      "Mechanical valve anticoagulation is not managed with one universal INR target; follow the documented individualized plan.",
      "Clients taking warfarin should keep vitamin K intake consistent rather than eliminating healthy vitamin K-containing foods.",
      "A sudden focal neurologic deficit may indicate valve-related thromboembolism and requires emergency assessment."
    ],
    quiz: [
      q("Which statement by a client taking warfarin for a mechanical heart valve shows correct understanding?", ["I should avoid every food containing vitamin K", "I will keep my vitamin K intake reasonably consistent", "I can stop warfarin for dental work without calling anyone", "If I miss several doses I should double the next dose"], 1, "Consistent vitamin K intake helps reduce INR variability. Clients should not independently stop, double, or drastically alter anticoagulation."),
      q("Which finding requires the most urgent action in a client with a prosthetic valve?", ["Mild bruising at an old venipuncture site", "Sudden slurred speech and unilateral weakness", "Questions about diet", "Request for a follow-up appointment"], 1, "Sudden focal neurologic symptoms suggest possible thromboembolism or stroke and require immediate emergency assessment."),
      q("A client asks what INR value is always correct for every mechanical valve. What is the best response?", ["2.0 for everyone", "3.5 for everyone", "The target is individualized by valve type, position, and clinical risk", "INR monitoring is unnecessary"], 2, "Anticoagulation targets vary by valve characteristics and patient risk. The nurse should follow the documented individualized target rather than assuming one universal value.")
    ]
  }
};
