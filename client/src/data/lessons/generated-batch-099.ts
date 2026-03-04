import type { LessonContent } from "./types";

export const generatedBatch099Lessons: Record<string, LessonContent> = {
  "type1-vs-type2-dm-np": {
    title: "Type 1 vs Type 2 Diabetes",
    cellular: { title: "Pathophysiology of Type 1 vs Type 2 Diabetes", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of type1 vs type2 dm or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Metoprolol",
      type: "Beta-blocker",
      action: "Blocks beta-1 adrenergic receptors to reduce heart rate and blood pressure",
      sideEffects: "Bradycardia, hypotension, fatigue, dizziness",
      contra: "Severe bradycardia, heart block, decompensated heart failure, cardiogenic shock",
      pearl: "Do not stop abruptly; taper to prevent rebound hypertension and tachycardia"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with type1 vs type2 dm. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with type1 vs type2 dm?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their type1 vs type2 dm diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "ulcerative-colitis-basics-rpn": {
        title: "Ulcerative Colitis Basics",
        cellular: { title: "Pathophysiology of Ulcerative Colitis", content: "Ulcerative colitis (UC) is a chronic inflammatory bowel disease characterised by diffuse, continuous mucosal and submucosal inflammation of the colon and rectum. Unlike Crohn disease, UC invariably involves the rectum and extends proximally in a continuous pattern without skip lesions. The disease is classified by extent: ulcerative proctitis (rectum only, 30-40%), left-sided colitis (up to the splenic flexure, 30-40%), and pancolitis (extending beyond the splenic flexure, 20-30%).\n\nThe pathogenesis shares features with Crohn disease: a dysregulated immune response to commensal gut bacteria in genetically predisposed individuals. However, the immunologic profile differs. UC is characterised by a Th2-dominant response with increased production of IL-4, IL-5, IL-13, and natural killer T cells. IL-13 is particularly important as it disrupts epithelial tight junctions, increases epithelial permeability, and induces epithelial cell apoptosis.\n\nInflammation in UC is superficial, affecting the mucosa and submucosa only (not transmural as in Crohn disease). The inflammatory infiltrate damages crypts (the glands of the colonic mucosa), producing cryptitis (neutrophil invasion of crypts) and crypt abscesses (accumulation of neutrophils within crypt lumens). Progressive crypt destruction leads to mucosal ulceration, with residual surviving mucosa forming inflammatory polyps (pseudopolyps) that project above the denuded surface.\n\nThe continuous nature of inflammation, always starting at the rectum and extending proximally, is a key diagnostic feature. The transition between inflamed and normal mucosa is typically abrupt. Chronic inflammation leads to loss of haustral folds, muscular shortening, and the characteristic 'lead pipe' appearance on imaging where the colon appears as a featureless tube.\n\nThe most feared acute complication is toxic megacolon, defined as total or segmental non-obstructive colonic dilatation (transverse colon diameter greater than 6 cm on plain radiograph) with systemic toxicity. It occurs when inflammation extends through the muscularis propria, causing loss of muscular tone and massive dilation. Without treatment, toxic megacolon progresses to perforation, peritonitis, and death.\n\nLong-term UC carries a significant colorectal cancer risk that increases with disease duration and extent. After 8-10 years of pancolitis, the risk begins to increase, reaching approximately 5-10% after 20 years and 12-20% after 30 years. Dysplasia-carcinoma surveillance colonoscopy is essential, typically beginning 8 years after diagnosis for pancolitis.\n\nUC has a unique relationship with smoking: current smoking appears to be protective, and disease onset or flares commonly occur after smoking cessation. However, smoking is never recommended as therapy given its systemic health risks. Appendectomy before age 20, performed for appendicitis, also appears to reduce UC risk." },
        riskFactors: ["Family history of inflammatory bowel disease (first-degree relative confers 10-15 fold increased risk for UC)","Age of onset typically 15-40 years with a second smaller peak at 50-80 years","Ashkenazi Jewish and Northern European ancestry","Recent smoking cessation (smoking is paradoxically protective in UC; flares commonly follow quitting)","NSAID use may exacerbate existing disease or trigger flares","Urban living and westernised lifestyle","History of enteric infection (Salmonella, Campylobacter) may trigger onset in genetically susceptible individuals","Previous C. difficile infection (associated with worse outcomes in UC patients)"],
        diagnostics: ["Colonoscopy with biopsies is the diagnostic standard: reveals continuous erythema, edema, friability (mucosa bleeds on contact), ulceration, and pseudopolyps starting from the rectum; biopsies show cryptitis, crypt abscesses, and mucosal architectural distortion","Flexible sigmoidoscopy may be preferred over full colonoscopy during severe flares to reduce perforation risk","CBC: anemia (iron deficiency from chronic blood loss), leukocytosis, thrombocytosis (reactive to chronic inflammation)","Inflammatory markers: ESR and CRP elevated during active disease; CRP is better for monitoring acute flares","Fecal calprotectin: non-invasive marker of mucosal inflammation; highly sensitive for active IBD; correlates with endoscopic disease activity","Stool culture and C. difficile toxin: mandatory to exclude infectious colitis before initiating or escalating immunosuppressive therapy","Abdominal X-ray: essential during severe flares to monitor for toxic megacolon (transverse colon diameter >6 cm) and perforation (free air)","p-ANCA positive in 60-70% of UC patients (vs ASCA positive in Crohn) - serologic markers can support diagnosis in uncertain cases"],
        management: ["Mild-moderate UC: first-line is mesalamine (5-ASA) in oral and topical (rectal suppository or enema) formulations; combination oral + topical is more effective than either alone","Moderate-severe UC: oral corticosteroids (prednisone 40-60 mg/day) for induction of remission, then taper over 8-12 weeks; not for maintenance","Steroid-dependent or steroid-refractory disease: immunomodulators (azathioprine, 6-mercaptopurine) for maintenance; biologic therapy (infliximab, adalimumab, vedolizumab, tofacitinib)","Acute severe UC (6+ bloody stools/day, heart rate >90, temperature >37.8, ESR >30, hemoglobin <10.5): IV corticosteroids (methylprednisolone 60 mg/day or hydrocortisone 100 mg every 6-8 hours), IV fluids, NPO or liquid diet, DVT prophylaxis, daily abdominal X-rays","Failure to respond to IV steroids within 3-5 days: rescue therapy with infliximab or ciclosporin, or proceed to surgery","Surgery (total proctocolectomy): curative for UC; indicated for refractory disease, toxic megacolon, perforation, high-grade dysplasia, or colorectal cancer; options include ileal pouch-anal anastomosis (J-pouch) or permanent ileostomy","Colorectal cancer surveillance: begin 8 years after pancolitis diagnosis with colonoscopy every 1-2 years with targeted biopsies and chromoendoscopy"],
        nursingActions: ["Assess stool pattern: frequency, volume, consistency, amount of blood and mucus, urgency, tenesmus, and nocturnal stools","Monitor for signs of severe flare and toxic megacolon: increasing abdominal distension, decreased bowel sounds, high fever, tachycardia, severe abdominal pain with tenderness","Administer rectal medications (mesalamine suppositories and enemas): teach patient to retain for at least 1 hour for optimal effect; position in left lateral decubitus position for enema administration","Monitor for corticosteroid side effects during induction: blood glucose (check regularly), blood pressure, mood and sleep changes, signs of infection (fever may be masked)","Implement VTE prophylaxis as ordered during hospitalization: UC flares significantly increase deep vein thrombosis and pulmonary embolism risk","Monitor hemoglobin and administer iron supplementation or blood transfusion as ordered for chronic blood loss anemia","Provide psychosocial support: UC significantly impacts quality of life, body image, and social functioning; assess for depression and anxiety, which are common","Pre-operative education if colectomy planned: explain J-pouch procedure and timeline, ostomy care education if applicable, discuss expected changes in bowel function","Educate about cancer surveillance: importance of regular colonoscopy schedule starting 8 years after diagnosis"],
        assessmentFindings: ["Bloody diarrhea (hallmark symptom) with mucus and pus, ranging from mildly increased frequency to 10-20 bloody stools per day in severe disease","Urgency, tenesmus (painful straining with feeling of incomplete evacuation), and faecal incontinence","Left lower quadrant cramping pain that is relieved or worsened by defecation","Fatigue, malaise, and anorexia during active disease","Pallor due to iron deficiency anemia from chronic blood loss","Fever (typically low-grade in moderate disease; high fever in severe disease or toxic megacolon)","Extraintestinal manifestations: joint pain/swelling (most common), erythema nodosum, pyoderma gangrenosum, eye inflammation (uveitis)"],
        signs: { left: ["Bloody diarrhea with mucus (hallmark symptom)","Urgency and tenesmus","Left lower quadrant tenderness","Pallor and tachycardia (from anemia)","Low-grade fever during flares"], right: ["Abdominal distension with decreased bowel sounds (toxic megacolon - emergency)","High fever with tachycardia and hypotension (systemic toxicity)","Extraintestinal manifestations (joint pain, skin lesions, eye inflammation)","Peripheral edema (hypoalbuminemia from protein-losing enteropathy)","Deep vein thrombosis (UC increases VTE risk 3-fold during flares)"] },
        medications: [{ name: "Mesalamine (5-ASA)", type: "Aminosalicylate Anti-inflammatory", action: "Topical anti-inflammatory that acts directly on the colonic mucosa to inhibit prostaglandin and leukotriene synthesis, scavenge free radicals, and suppress NF-kB-mediated inflammatory pathways", sideEffects: "Headache, nausea, abdominal pain, diarrhea (paradoxical), rash; rare but serious: interstitial nephritis, pancreatitis, pericarditis", contra: "Salicylate allergy, severe renal impairment, severe hepatic impairment", pearl: "First-line for mild-moderate UC; combining oral + rectal formulations is significantly more effective than either alone; rectal formulations (suppository for proctitis, enema for left-sided) deliver drug directly to inflamed mucosa; monitor renal function annually with long-term use" },{ name: "Prednisone", type: "Systemic Corticosteroid", action: "Broadly suppresses inflammatory and immune responses by inhibiting NF-kB, reducing pro-inflammatory cytokine production, decreasing leukocyte migration, and stabilising lysosomal membranes", sideEffects: "Hyperglycemia, weight gain, fluid retention, insomnia, mood changes (euphoria to psychosis), increased infection risk, osteoporosis, adrenal suppression, peptic ulcer (especially with NSAID co-administration), cataracts, skin thinning", contra: "Active untreated infections, live vaccines during therapy, poorly controlled diabetes (relative)", pearl: "Used for induction of remission only, NOT maintenance - chronic steroid use is never the goal; always taper gradually (typically over 8-12 weeks) to avoid Addisonian crisis from adrenal suppression; if patient cannot taper below 10 mg without flare, this is steroid-dependent disease requiring immunomodulator or biologic escalation" },{ name: "Vedolizumab (Entyvio)", type: "Biologic - Anti-Integrin (Gut-Selective)", action: "Humanised monoclonal antibody targeting alpha4-beta7 integrin, blocking its interaction with MAdCAM-1 on gut vascular endothelium; prevents migration of lymphocytes from the bloodstream into the gut wall; gut-selective action reduces systemic immunosuppression compared to anti-TNF agents", sideEffects: "Nasopharyngitis, headache, arthralgia, nausea, upper respiratory tract infection, infusion reactions; lower risk of serious infections than anti-TNF agents due to gut-selective mechanism", contra: "Active severe infection, hypersensitivity to vedolizumab, concurrent natalizumab (both target integrins - compounding immunosuppression)", pearl: "Preferred over anti-TNF agents in older patients or those with infection concerns due to gut-selective immunosuppression; takes longer to reach full effect (12-14 weeks) compared to anti-TNF agents; progressive multifocal leukoencephalopathy (PML) risk is theoretical but has not been reported with vedolizumab alone" }],
        pearls: ["UC ALWAYS involves the rectum and extends proximally in a continuous pattern - if inflammation is patchy or rectal-sparing, consider Crohn colitis instead","Toxic megacolon is a life-threatening emergency: transverse colon >6 cm with systemic toxicity (fever >38.6, HR >120, WBC >10.5); stop anticholinergics and opioids, obtain surgical consultation immediately","Bloody diarrhea is the hallmark of UC; non-bloody diarrhea should raise suspicion for alternative diagnoses or concurrent infection (always test for C. difficile during flares)","Never give anti-diarrheal agents (loperamide) during severe UC flares as they can precipitate toxic megacolon","UC patients have a 3-fold increased risk of venous thromboembolism during flares - DVT prophylaxis during hospitalisation is essential","Surgical cure: unlike Crohn disease, UC can be cured by total proctocolectomy because disease is limited to the colon and rectum","Rectal mesalamine suppositories are the most effective treatment for ulcerative proctitis - more effective than oral mesalamine alone","Cancer surveillance colonoscopy begins 8 years after pancolitis diagnosis and every 1-2 years thereafter - this is a critical preventive measure"],
        quiz: [{ question: "A patient hospitalised with a severe ulcerative colitis flare has increasing abdominal distension, high fever, and tachycardia. An abdominal X-ray shows transverse colon diameter of 7.5 cm. Which action is the priority?", options: ["Administer loperamide to reduce stool frequency","Prepare for colonoscopy to assess disease extent","Notify the provider immediately and prepare for potential surgical consultation","Increase the oral mesalamine dose and add a rectal enema"], correct: 2, rationale: "A transverse colon diameter greater than 6 cm with systemic toxicity (fever, tachycardia, distension) defines toxic megacolon, which is a surgical emergency. The provider must be notified immediately for IV steroid optimisation and surgical consultation. Loperamide is contraindicated as it can worsen toxic megacolon. Colonoscopy carries high perforation risk. Oral medications alone are inadequate for this severity." },{ question: "Which statement by a patient with ulcerative colitis indicates a correct understanding of their medication therapy?", options: ["I will continue taking prednisone daily to prevent all future flares","I should use both my oral mesalamine and rectal suppository together for best results","I can stop my mesalamine whenever my symptoms go away since the disease is cured","I should take loperamide whenever I have a flare to control the diarrhea quickly"], correct: 1, rationale: "Combining oral and rectal mesalamine is more effective than either alone for inducing and maintaining remission in UC - this demonstrates correct understanding. Prednisone is for induction only, not long-term maintenance. UC is a chronic disease requiring ongoing maintenance therapy even during remission. Loperamide can precipitate toxic megacolon during flares and should be avoided." },{ question: "A nurse is assessing a patient with UC. Which finding most effectively differentiates UC from Crohn disease?", options: ["Elevated CRP and ESR levels","Continuous inflammation from the rectum without skip lesions","Diarrhea with abdominal cramping","Response to corticosteroid therapy"], correct: 1, rationale: "The hallmark that distinguishes UC from Crohn disease is continuous mucosal inflammation invariably involving the rectum and extending proximally without skip lesions. Crohn disease, by contrast, shows transmural inflammation with skip lesions that can occur anywhere from mouth to anus. CRP/ESR, diarrhea, and steroid response occur in both conditions." }]
  },
  "umbilical-cord-prolapse-rpn": {
    title: "Umbilical Cord Prolapse",
    cellular: { title: "Pathophysiology of Umbilical Cord Prolapse", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of umbilical cord prolapse or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
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
        question: "A nurse is caring for a patient with umbilical cord prolapse. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with umbilical cord prolapse?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their umbilical cord prolapse diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uremic-encephalopathy-rn": {
    title: "Uremic Encephalopathy",
    cellular: { title: "Pathophysiology of Uremic Encephalopathy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uremic encephalopathy or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with uremic encephalopathy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uremic encephalopathy?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uremic encephalopathy diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uremic-pericarditis-rn": {
    title: "Uremic Pericarditis",
    cellular: { title: "Pathophysiology of Uremic Pericarditis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uremic pericarditis or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Metoprolol",
      type: "Beta-blocker",
      action: "Blocks beta-1 adrenergic receptors to reduce heart rate and blood pressure",
      sideEffects: "Bradycardia, hypotension, fatigue, dizziness",
      contra: "Severe bradycardia, heart block, decompensated heart failure, cardiogenic shock",
      pearl: "Do not stop abruptly; taper to prevent rebound hypertension and tachycardia"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with uremic pericarditis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uremic pericarditis?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uremic pericarditis diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uric-acid-nephropathy-rn": {
    title: "Uric Acid Nephropathy",
    cellular: { title: "Pathophysiology of Uric Acid Nephropathy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uric acid nephropathy or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with uric acid nephropathy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uric acid nephropathy?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uric acid nephropathy diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uri-differentiation-np": {
    title: "URI Differentiation",
    cellular: { title: "Pathophysiology of URI Differentiation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uri differentiation or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with uri differentiation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uri differentiation?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uri differentiation diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "urinalysis-interpretation-np": {
    title: "Urinalysis Interpretation",
    cellular: { title: "Pathophysiology of Urinalysis Interpretation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of urinalysis interpretation or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with urinalysis interpretation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with urinalysis interpretation?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their urinalysis interpretation diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "urinary-incontinence-np": {
    title: "Urinary Incontinence: Types & Management",
    cellular: { title: "Pathophysiology of Urinary Incontinence: Types & Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of urinary incontinence or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with urinary incontinence. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with urinary incontinence?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their urinary incontinence diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "urine-culture-logic-np": {
    title: "Urine Culture Logic",
    cellular: { title: "Pathophysiology of Urine Culture Logic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of urine culture logic or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with urine culture logic. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with urine culture logic?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their urine culture logic diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "urine-output-monitoring": {
    title: "Urine Output Monitoring",
    cellular: { title: "Pathophysiology of Urine Output Monitoring", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of urine output monitoring or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with urine output monitoring. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with urine output monitoring?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their urine output monitoring diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uterine-inversion": {
    title: "Uterine Inversion",
    cellular: { title: "Pathophysiology of Uterine Inversion", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uterine inversion or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with uterine inversion. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uterine inversion?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uterine inversion diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uterine-rupture-np": {
    title: "Uterine Rupture: Risk Factors & Emergency Management",
    cellular: { title: "Pathophysiology of Uterine Rupture: Risk Factors & Emergency Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uterine rupture or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with uterine rupture. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uterine rupture?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uterine rupture diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uti-basics": {
    title: "Urinary Tract Infections",
    cellular: { title: "Pathophysiology of Urinary Tract Infections", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uti basics or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with uti basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uti basics?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uti basics diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "uti-basics-rpn": {
    title: "UTI Basics",
    cellular: { title: "Pathophysiology of UTI Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of uti basics or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
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
        question: "A nurse is caring for a patient with uti basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with uti basics?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their uti basics diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
};
