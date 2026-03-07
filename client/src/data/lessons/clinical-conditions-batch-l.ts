import type { LessonContent } from "./types";

export const clinicalConditionsBatchLLessons: Record<string, LessonContent> = {
  "alzheimer-disease-rpn": {
    title: "Alzheimer Disease: RPN Monitoring",
    cellular: {
      title: "Neurodegenerative Pathology",
      content: "Alzheimer disease is an irreversible and progressive dementia caused by neurodegenerative changes in the brain from abnormal protein buildup. Beta-amyloid plaques accumulate between neurons and tau protein tangles form inside neurons, resulting in cell damage and neuronal death. These changes develop over time, leading to progressive cognitive decline. The RPN monitors for changes in cognition, behavior, and functional ability, assists with activities of daily living, maintains safety, and reports changes to the nursing team."
    },
    riskFactors: [
      "Age over 65 years (greatest risk factor)",
      "Family history of Alzheimer disease",
      "Down syndrome (trisomy 21)",
      "Female sex",
      "History of head trauma",
      "Cardiovascular risk factors (hypertension, diabetes, obesity)",
      "Low educational attainment",
      "Social isolation and sedentary lifestyle"
    ],
    diagnostics: [
      "Assist with cognitive screening tools (MMSE or MoCA) as directed",
      "Monitor client's level of orientation, attention, and recall",
      "Document baseline cognitive and functional abilities",
      "Report changes in behavior, mood, or cognitive function to the RN",
      "Monitor for safety hazards related to cognitive decline",
      "Assist with ADL assessment and report functional changes"
    ],
    management: [
      "Administer cholinesterase inhibitors as ordered (donepezil, rivastigmine)",
      "Administer memantine as ordered for moderate-to-severe disease",
      "Maintain structured and consistent daily routine",
      "Establish normal daytime and nighttime sleep-wake cycle",
      "Decrease stimulation (caffeine, TV) in the evening",
      "Increase daytime exposure to light to promote circadian rhythm",
      "Reorient the client frequently using calm, simple communication"
    ],
    nursingActions: [
      "Maintain a safe environment: door sensors, grab bars, remove throw rugs",
      "Allow client to wander in a safe, enclosed area",
      "Ensure medical identification bracelet is worn at all times",
      "Remove household hazards: gas appliances, toxic chemicals, sharp objects",
      "Install grab bars in shower and bathroom",
      "Do not challenge or negate delusional experiences",
      "Use familiar music, photographs, and visual cues to reduce agitation",
      "Give directions one step at a time with eye contact and gestures",
      "Assess and report caregiver burden; suggest respite care and support groups"
    ],
    signs: {
      left: [
        "Short-term memory decline",
        "Visuospatial deficits",
        "Language difficulties (word-finding problems)",
        "Cognitive impairment (inability to learn new skills)",
        "Self-care deficits",
        "Decline in social skills"
      ],
      right: [
        "Neuropsychiatric symptoms (delusions, hallucinations)",
        "Extrapyramidal motor movements",
        "Myoclonus",
        "Seizures",
        "Loss of bladder or bowel control",
        "Complete dependence on caregivers"
      ]
    },
    medications: [
      { name: "Donepezil", type: "Cholinesterase inhibitor", action: "Increases acetylcholine availability by inhibiting its breakdown at the synapse", sideEffects: "Nausea, diarrhea, insomnia, bradycardia, muscle cramps", contra: "Severe hepatic impairment, sick sinus syndrome without pacemaker", pearl: "Administer at bedtime to minimize GI side effects. Report bradycardia or syncope to the RN." },
      { name: "Memantine", type: "NMDA receptor antagonist", action: "Blocks excessive glutamate stimulation to protect neurons from excitotoxicity", sideEffects: "Dizziness, headache, constipation, confusion", contra: "Severe renal impairment", pearl: "Used for moderate-to-severe Alzheimer disease. Can be combined with cholinesterase inhibitors." }
    ],
    pearls: [
      "Establish a cognitive baseline early so changes can be detected and reported",
      "Structured routines reduce confusion, agitation, and sundowning behavior",
      "Never argue with or correct a client experiencing delusions; redirect gently",
      "Medical identification bracelets are essential for wandering clients",
      "Caregiver burnout is common; assess and encourage use of respite care services"
    ],
    quiz: [
      { question: "Which intervention should the RPN prioritize for a client with Alzheimer disease who becomes agitated in the evening?", options: ["Administer a sedative as ordered", "Reduce environmental stimulation and maintain a calm routine", "Restrain the client for safety", "Increase caffeine intake to keep them awake during the day"], correct: 1, rationale: "Sundowning (increased agitation in the evening) is managed by reducing stimulation, maintaining routine, and ensuring a calm environment. Restraints and sedatives are not first-line interventions." },
      { question: "Which safety measure is most important for a client with Alzheimer disease who wanders?", options: ["Lock the client in their room", "Apply a medical identification bracelet and install door sensors", "Keep all lights off at night", "Remove all furniture from the room"], correct: 1, rationale: "Medical identification bracelets and door sensors allow safe monitoring without restricting freedom. Locking a client in a room is inappropriate and may increase agitation." },
      { question: "The RPN notes a client with Alzheimer disease is experiencing visual hallucinations. What is the best response?", options: ["Challenge the hallucination and explain it is not real", "Reassure the client they are safe and redirect attention", "Ignore the client's experience", "Turn off all lights to eliminate visual stimulation"], correct: 1, rationale: "The nurse should not challenge or negate the experience. Reassuring safety and gentle redirection are therapeutic approaches for neuropsychiatric symptoms." }
    ]
  },

  "alzheimer-disease-rn": {
    title: "Alzheimer Disease: RN Clinical Management",
    cellular: {
      title: "Pathophysiology of Neurodegeneration",
      content: "Alzheimer disease is characterized by progressive accumulation of extracellular beta-amyloid plaques and intracellular neurofibrillary tangles of hyperphosphorylated tau protein. These pathological changes trigger chronic neuroinflammation, oxidative stress, synaptic dysfunction, and widespread neuronal death, particularly in the hippocampus and cerebral cortex. Cholinergic neurotransmission is severely impaired as the nucleus basalis of Meynert degenerates. The disease progresses through predictable stages, from mild cognitive impairment to complete functional dependence. The RN performs comprehensive cognitive assessments, manages pharmacological therapy, coordinates multidisciplinary care, implements safety interventions, and provides caregiver education and support."
    },
    riskFactors: [
      "Advanced age (prevalence doubles every 5 years after age 65)",
      "Apolipoprotein E4 (APOE4) genotype",
      "Family history of early-onset Alzheimer disease",
      "Down syndrome (trisomy 21)",
      "Female sex (longer lifespan and hormonal factors)",
      "Cardiovascular risk factors: hypertension, diabetes, hyperlipidemia",
      "History of traumatic brain injury",
      "Chronic social isolation and depression"
    ],
    diagnostics: [
      "Administer standardized cognitive screening: Mini-Mental State Examination (MMSE) or Montreal Cognitive Assessment (MoCA)",
      "Assess orientation, attention, recall, language, and visuospatial function systematically",
      "Rule out reversible causes of dementia: hypothyroidism, B12 deficiency, depression, normal pressure hydrocephalus",
      "Interpret MRI findings: diffuse cortical and hippocampal atrophy",
      "Review laboratory results: TSH, vitamin B12, CBC, CMP, RPR",
      "Assess functional status using ADL and IADL scales to establish baseline and track decline",
      "Evaluate for depression using validated tools (GDS, PHQ-9)"
    ],
    management: [
      "Initiate and titrate cholinesterase inhibitors (donepezil, rivastigmine, galantamine) for mild-to-moderate disease",
      "Add memantine for moderate-to-severe disease per provider order",
      "Implement structured daily routines to reduce confusion and agitation",
      "Establish and maintain consistent sleep-wake cycles",
      "Coordinate multidisciplinary care: neurology, social work, dietitian, physical therapy",
      "Facilitate advance directive planning: living will, power of attorney, end-of-life preferences",
      "Refer caregivers to support groups and community resources",
      "Implement fall prevention measures and environmental modifications"
    ],
    nursingActions: [
      "Perform serial cognitive assessments at each encounter to track progression",
      "Assess for behavioral and psychological symptoms of dementia (BPSD): agitation, aggression, sundowning, wandering",
      "Implement non-pharmacological interventions first: music therapy, validation therapy, structured activities",
      "Manage medication administration: consider patch formulations for clients who refuse oral medications",
      "Coordinate home safety assessment: remove hazards, install grab bars, secure exits",
      "Educate family on disease trajectory and realistic expectations",
      "Screen for and address caregiver burden using validated tools (Zarit Burden Interview)",
      "Implement aspiration precautions as swallowing function declines"
    ],
    signs: {
      left: [
        "Progressive short-term memory loss",
        "Difficulty with complex tasks and problem-solving",
        "Word-finding difficulties (anomia)",
        "Visuospatial disorientation (getting lost in familiar places)",
        "Impaired judgment and decision-making",
        "Personality and mood changes"
      ],
      right: [
        "Delusions and paranoia",
        "Visual and auditory hallucinations",
        "Agitation and aggression",
        "Sundowning (increased confusion in evening)",
        "Dysphagia and aspiration risk",
        "Incontinence (urinary and fecal)",
        "Seizures in advanced disease"
      ]
    },
    medications: [
      { name: "Donepezil", type: "Cholinesterase inhibitor", action: "Reversibly inhibits acetylcholinesterase, increasing ACh concentration at cholinergic synapses", sideEffects: "Nausea, diarrhea, insomnia, vivid dreams, bradycardia, syncope", contra: "Severe hepatic impairment, sick sinus syndrome", pearl: "First-line for mild-to-moderate Alzheimer disease. Administer at bedtime. Monitor heart rate and report bradycardia." },
      { name: "Rivastigmine", type: "Cholinesterase inhibitor", action: "Inhibits both acetylcholinesterase and butyrylcholinesterase in the CNS", sideEffects: "Nausea, vomiting, weight loss, dizziness", contra: "Known hypersensitivity, severe hepatic impairment", pearl: "Available as transdermal patch (Exelon Patch) which improves adherence and reduces GI side effects. Rotate application sites daily." },
      { name: "Memantine", type: "NMDA receptor antagonist", action: "Blocks excessive glutamate-mediated excitotoxicity while preserving normal neurotransmission", sideEffects: "Dizziness, headache, confusion, constipation", contra: "Severe renal impairment (CrCl <5 mL/min)", pearl: "Indicated for moderate-to-severe Alzheimer disease. Can be used in combination with cholinesterase inhibitors for additive benefit." },
      { name: "Risperidone (low dose)", type: "Atypical antipsychotic", action: "Blocks dopamine D2 and serotonin 5-HT2A receptors to reduce psychotic symptoms", sideEffects: "Sedation, orthostatic hypotension, EPS, metabolic syndrome", contra: "Dementia-related psychosis in elderly (FDA black box warning for increased mortality)", pearl: "Used with extreme caution and only when non-pharmacological interventions fail. Lowest effective dose for shortest duration. Black box warning for increased stroke and death in elderly with dementia." }
    ],
    pearls: [
      "No confirmatory diagnostic test exists for Alzheimer disease during life; diagnosis is clinical and supported by imaging",
      "MRI shows diffuse cortical atrophy with hippocampal volume loss",
      "Cholinesterase inhibitors do not cure or halt disease progression; they temporarily improve symptoms",
      "Sundowning can be managed by increasing daytime light exposure and reducing evening stimulation",
      "Aspiration risk increases significantly in late-stage disease; assess swallowing regularly"
    ],
    quiz: [
      { question: "Which assessment finding should the RN expect in early-stage Alzheimer disease?", options: ["Seizures and myoclonus", "Progressive short-term memory loss with preserved long-term memory", "Complete bowel and bladder incontinence", "Inability to swallow"], correct: 1, rationale: "Early Alzheimer disease is characterized by progressive short-term memory loss while long-term memories are relatively preserved. Seizures, incontinence, and dysphagia are late-stage manifestations." },
      { question: "Which non-pharmacological intervention should the RN implement first for a client with agitation related to Alzheimer disease?", options: ["Apply physical restraints", "Administer haloperidol PRN", "Use music therapy, redirection, and a calm environment", "Increase the dose of donepezil"], correct: 2, rationale: "Non-pharmacological interventions (music therapy, validation therapy, environmental modification) should always be attempted first. Antipsychotics carry a black box warning in elderly dementia patients." },
      { question: "The RN is educating the family of a client with Alzheimer disease about advance care planning. Which action is the priority?", options: ["Recommend immediate nursing home placement", "Facilitate completion of advance directives while the client can still participate", "Advise the family to make all decisions without the client's input", "Defer planning until the client reaches late-stage disease"], correct: 1, rationale: "Advance directive planning should occur as early as possible while the client retains decision-making capacity to express their wishes for future care." }
    ]
  },

  "alzheimer-disease-np": {
    title: "Alzheimer Disease: NP Prescriptive Management",
    cellular: {
      title: "Advanced Neuropathology and Pharmacological Targets",
      content: "Alzheimer disease involves progressive accumulation of extracellular amyloid-beta (Aβ42) plaques and intracellular neurofibrillary tangles composed of hyperphosphorylated tau protein. The amyloid cascade hypothesis posits that Aβ accumulation triggers tau pathology, neuroinflammation via microglial activation, synaptic loss, and selective neuronal death in cholinergic pathways originating from the nucleus basalis of Meynert. Glutamatergic excitotoxicity via NMDA receptor overactivation further accelerates neurodegeneration. Cholinergic deficit underlies the cognitive symptoms, while serotonergic and noradrenergic dysfunction drives behavioral symptoms. The NP must differentiate Alzheimer from other dementias (vascular, Lewy body, frontotemporal), initiate and optimize pharmacotherapy, manage behavioral and psychological symptoms of dementia (BPSD), coordinate goals-of-care discussions, and address caregiver wellness."
    },
    riskFactors: [
      "Advanced age (most significant non-modifiable risk factor)",
      "APOE4 allele (heterozygous: 3x risk; homozygous: 12x risk)",
      "Family history with autosomal dominant mutations (APP, PSEN1, PSEN2) in early-onset cases",
      "Cardiovascular risk factors: midlife hypertension, type 2 diabetes, hyperlipidemia",
      "Traumatic brain injury with loss of consciousness",
      "Female sex and postmenopausal estrogen decline",
      "Down syndrome (APP gene on chromosome 21)",
      "Depression (both risk factor and prodromal symptom)"
    ],
    diagnostics: [
      "Order MRI brain: evaluate hippocampal atrophy, cortical thinning, white matter changes; rule out vascular dementia, NPH, space-occupying lesion",
      "Perform comprehensive cognitive testing: MMSE, MoCA, and neuropsychological battery for domain-specific deficits",
      "Order complete metabolic workup: TSH, vitamin B12, folate, CBC, CMP, RPR/VDRL to exclude reversible causes",
      "Consider CSF biomarkers: decreased Aβ42, elevated total tau, elevated phospho-tau (research and specialty settings)",
      "Order PET imaging in atypical presentations: amyloid PET or FDG-PET showing temporoparietal hypometabolism",
      "Assess for depression with validated tools (GDS, PHQ-9) as comorbid and differential diagnosis",
      "Evaluate genetic testing (APOE genotyping) in context of clinical trials or family counseling only"
    ],
    management: [
      "Prescribe cholinesterase inhibitor for mild-to-moderate disease: donepezil 5mg daily, increase to 10mg after 4-6 weeks; or rivastigmine patch 4.6mg/24h, titrate to 13.3mg/24h",
      "Add memantine 5mg daily for moderate-to-severe disease, titrate to 10mg BID over 4 weeks; available as extended-release 28mg daily",
      "Manage BPSD with non-pharmacological strategies first: music therapy, behavioral interventions, environmental modifications",
      "Prescribe low-dose SSRI (sertraline, citalopram max 20mg in elderly) for depression/anxiety in dementia",
      "Use low-dose atypical antipsychotic (risperidone 0.25-0.5mg, quetiapine 12.5-50mg) only for severe, refractory psychosis or aggression with documented informed consent regarding black box warning",
      "Avoid anticholinergic medications, benzodiazepines, and first-generation antipsychotics",
      "Coordinate referral for clinical trials (anti-amyloid antibodies, tau-targeted therapies)",
      "Initiate palliative care and hospice referral discussions for advanced disease"
    ],
    nursingActions: [
      "Classify disease severity using CDR (Clinical Dementia Rating) or GDS (Global Deterioration Scale) at each visit",
      "Perform comprehensive medication reconciliation to identify and discontinue anticholinergic medications (Beers Criteria)",
      "Assess for and manage comorbid conditions: UTI, constipation, pain (common triggers for delirium superimposed on dementia)",
      "Order and interpret serial cognitive testing to evaluate treatment response",
      "Screen for dysphagia using bedside swallow evaluation and refer for modified barium swallow as needed",
      "Facilitate advance care planning including code status, feeding tube decisions, and hospice eligibility",
      "Assess caregiver health: depression, anxiety, physical exhaustion; prescribe respite care",
      "Monitor for medication side effects: bradycardia with cholinesterase inhibitors, QTc prolongation with antipsychotics"
    ],
    signs: {
      left: [
        "Episodic memory impairment (earliest domain affected)",
        "Anomia and semantic paraphasia",
        "Executive dysfunction (planning, organization)",
        "Visuospatial impairment (clock drawing test abnormalities)",
        "Anosognosia (lack of insight into deficits)",
        "Difficulty with instrumental ADLs (finances, medications)"
      ],
      right: [
        "Behavioral disinhibition and agitation",
        "Psychosis (delusions of theft, infidelity)",
        "Sundowning with sleep-wake cycle disruption",
        "Apraxia (loss of learned motor skills)",
        "Dysphagia and aspiration pneumonia risk",
        "Myoclonus and seizures in end-stage disease",
        "Complete functional dependence and cachexia"
      ]
    },
    medications: [
      { name: "Donepezil", type: "Cholinesterase inhibitor", action: "Selectively and reversibly inhibits central acetylcholinesterase, increasing synaptic ACh concentration", sideEffects: "Nausea, diarrhea, insomnia, vivid dreams, bradycardia, syncope, rhabdomyolysis (rare)", contra: "Severe hepatic impairment, cardiac conduction disorders", pearl: "Start 5mg QHS, increase to 10mg after 4-6 weeks. 23mg formulation available for moderate-to-severe disease. Monitor ECG in patients with cardiac history." },
      { name: "Memantine XR", type: "NMDA receptor antagonist", action: "Voltage-dependent uncompetitive antagonist of NMDA glutamate receptors; blocks pathological excitotoxicity while preserving physiological signaling", sideEffects: "Dizziness, headache, constipation, hypertension", contra: "Severe renal impairment (CrCl <5), concurrent use of other NMDA antagonists (amantadine, dextromethorphan)", pearl: "28mg extended-release capsule available for once-daily dosing. Can be combined with cholinesterase inhibitor. Adjust dose for moderate renal impairment (CrCl 5-29: max 14mg/day)." },
      { name: "Rivastigmine Patch", type: "Dual cholinesterase inhibitor", action: "Inhibits both acetylcholinesterase and butyrylcholinesterase, providing broader cholinergic enhancement", sideEffects: "Application site reactions, nausea, vomiting, weight loss, anorexia", contra: "History of application site allergic dermatitis with rivastigmine", pearl: "Transdermal formulation reduces GI side effects and improves adherence. Start 4.6mg/24h patch, titrate monthly to 9.5mg then 13.3mg. Rotate application sites and avoid reapplication to same site within 14 days." },
      { name: "Citalopram", type: "SSRI", action: "Selectively inhibits serotonin reuptake, increasing serotonergic neurotransmission", sideEffects: "QTc prolongation, hyponatremia (SIADH), falls, GI upset", contra: "Concurrent MAOIs, QTc >500ms, concurrent pimozide", pearl: "Maximum dose 20mg/day in patients >60 years due to dose-dependent QTc prolongation (FDA warning). Effective for agitation and depression in Alzheimer disease (CitAD trial)." }
    ],
    pearls: [
      "The cholinergic hypothesis remains the primary pharmacological target: loss of cholinergic neurons in the nucleus basalis correlates with cognitive decline",
      "Memantine works by a different mechanism (NMDA antagonism) and provides additive benefit when combined with cholinesterase inhibitors",
      "Delirium superimposed on dementia is common and reversible; always evaluate for infection (UTI), constipation, pain, and medication changes",
      "Anticholinergic burden must be minimized; use the Anticholinergic Cognitive Burden (ACB) scale to audit all medications",
      "Anti-amyloid monoclonal antibodies (lecanemab, aducanumab) represent emerging disease-modifying therapies but require amyloid-PET or CSF confirmation and ARIA monitoring"
    ],
    quiz: [
      { question: "Which combination therapy is appropriate for a patient with moderate-to-severe Alzheimer disease?", options: ["Donepezil + benzodiazepine", "Donepezil + memantine", "Memantine + haloperidol", "Two cholinesterase inhibitors simultaneously"], correct: 1, rationale: "Combining a cholinesterase inhibitor with memantine provides additive benefit through complementary mechanisms. Benzodiazepines and anticholinergics should be avoided. Dual cholinesterase inhibitors increase toxicity without benefit." },
      { question: "An NP is prescribing citalopram for agitation in a 78-year-old patient with Alzheimer disease. What is the maximum recommended daily dose?", options: ["10 mg", "20 mg", "40 mg", "60 mg"], correct: 1, rationale: "The FDA recommends a maximum dose of 20mg/day for patients over 60 years due to dose-dependent QTc prolongation. Higher doses increase the risk of cardiac arrhythmias." },
      { question: "A patient on donepezil develops new-onset bradycardia with a heart rate of 48 bpm. What is the NP's priority action?", options: ["Increase the dose to improve efficacy", "Hold the medication and obtain an ECG", "Add a beta-blocker to control the heart rate", "Switch to a higher dose of rivastigmine"], correct: 1, rationale: "Cholinesterase inhibitors can cause significant bradycardia via vagotonic effects. The medication should be held, an ECG obtained to assess for conduction abnormalities, and the dose reassessed." }
    ]
  },

  "guillain-barre-rpn": {
    title: "Guillain-Barré Syndrome: RPN Monitoring",
    cellular: {
      title: "Immune-Mediated Demyelination",
      content: "Guillain-Barré syndrome (GBS) is an acute autoimmune polyneuropathy in which the immune system attacks the peripheral nervous system following a triggering event (usually a viral or bacterial infection). Autoantibodies target the myelin sheath surrounding peripheral nerves, causing demyelination and impaired nerve conduction. This results in ascending symmetrical muscle weakness that begins in the lower extremities and progresses upward, potentially involving respiratory muscles. The RPN monitors vital signs, respiratory status, and neurological function, reporting all changes immediately."
    },
    riskFactors: [
      "Recent viral infection (1-4 weeks prior): influenza, Epstein-Barr, cytomegalovirus, Zika",
      "Campylobacter jejuni gastroenteritis (most common preceding infection)",
      "Recent surgery or vaccination (rare association)",
      "HIV infection",
      "Hodgkin lymphoma"
    ],
    diagnostics: [
      "Monitor vital signs frequently, especially respiratory rate and depth",
      "Measure and report oxygen saturation trends",
      "Monitor and report progressive weakness: note which muscle groups are affected",
      "Report difficulty swallowing, speaking, or breathing immediately",
      "Assess and document deep tendon reflexes as directed (areflexia is expected)",
      "Monitor urine output for urinary retention"
    ],
    management: [
      "Maintain bed rest during acute phase as ordered",
      "Assist with positioning to prevent skin breakdown and contractures",
      "Administer medications as ordered",
      "Keep emergency respiratory equipment accessible (ambu bag, suction)",
      "Implement VTE prophylaxis measures as directed (SCDs, anticoagulants)",
      "Provide emotional support as the client experiences rapidly progressing paralysis"
    ],
    nursingActions: [
      "Monitor respiratory function every 2-4 hours: rate, depth, accessory muscle use, oxygen saturation",
      "Report any decline in respiratory effort immediately to the RN",
      "Assess motor strength in all extremities and document progression of weakness",
      "Monitor for autonomic dysfunction: blood pressure fluctuations, cardiac arrhythmias, diaphoresis",
      "Prevent complications of immobility: reposition every 2 hours, range-of-motion exercises",
      "Assess for pain (neuropathic pain is common) and report for management",
      "Monitor swallowing ability before oral intake; hold feeds if dysphagia suspected"
    ],
    signs: {
      left: [
        "Ascending symmetrical weakness (starts in legs)",
        "Paresthesias (tingling, numbness in extremities)",
        "Diminished or absent deep tendon reflexes",
        "Bilateral facial weakness",
        "Difficulty walking or standing"
      ],
      right: [
        "Respiratory muscle weakness (dyspnea, shallow breathing)",
        "Autonomic instability (BP swings, tachycardia, bradycardia)",
        "Dysphagia and drooling",
        "Urinary retention",
        "Severe neuropathic pain",
        "Complete flaccid paralysis (severe cases)"
      ]
    },
    medications: [
      { name: "Enoxaparin", type: "Low-molecular-weight heparin", action: "Prevents venous thromboembolism in immobilized patients", sideEffects: "Bleeding, injection site bruising, thrombocytopenia", contra: "Active bleeding, HIT, severe renal impairment", pearl: "VTE prophylaxis is critical in GBS patients due to prolonged immobility. Administer subcutaneously as ordered and report signs of bleeding." }
    ],
    pearls: [
      "GBS is a medical emergency; respiratory failure can develop rapidly and unpredictably",
      "Ascending weakness that reaches the respiratory muscles requires intubation and mechanical ventilation",
      "Deep tendon reflexes are typically absent (areflexia) in GBS",
      "Most patients recover fully, but recovery can take weeks to months",
      "Pain management is often overlooked in GBS; neuropathic pain is common and distressing"
    ],
    quiz: [
      { question: "Which finding in a client with Guillain-Barré syndrome should the RPN report immediately?", options: ["Tingling in the toes", "Declining respiratory rate and increasing use of accessory muscles", "Absent patellar reflex", "Mild leg weakness"], correct: 1, rationale: "Respiratory decline indicates ascending paralysis has reached the respiratory muscles, which is a life-threatening emergency requiring immediate intervention including possible intubation." },
      { question: "The RPN is caring for a client with GBS who is on bed rest. Which intervention is most important to prevent complications?", options: ["Encourage ambulation three times daily", "Reposition every 2 hours and apply sequential compression devices", "Maintain strict fluid restriction", "Elevate the head of bed to 90 degrees at all times"], correct: 1, rationale: "Immobility in GBS increases the risk of DVT, skin breakdown, and respiratory complications. Repositioning and SCDs are essential preventive measures." }
    ]
  },

  "guillain-barre-rn": {
    title: "Guillain-Barré Syndrome: RN Clinical Management",
    cellular: {
      title: "Autoimmune Peripheral Neuropathy",
      content: "Guillain-Barré syndrome is an acute inflammatory demyelinating polyneuropathy (AIDP) in which molecular mimicry between microbial antigens and gangliosides on the myelin sheath triggers autoantibody production and complement-mediated destruction of Schwann cells. Demyelination disrupts saltatory conduction in peripheral motor and sensory nerves. The classic presentation is ascending symmetrical weakness with areflexia, progressing over days to weeks. Approximately 30% of patients develop respiratory failure requiring mechanical ventilation. Autonomic dysfunction affects 70% of patients and is the leading cause of death. The RN performs serial neurological assessments, monitors respiratory function, manages hemodynamic instability, coordinates immunotherapy, and provides comprehensive supportive care."
    },
    riskFactors: [
      "Campylobacter jejuni gastroenteritis (30% of cases; associated with axonal variant and poorer prognosis)",
      "Upper respiratory infection 1-4 weeks prior",
      "Cytomegalovirus, Epstein-Barr virus, influenza, Zika virus",
      "Recent surgery or anesthesia",
      "HIV/AIDS",
      "Hodgkin lymphoma",
      "Post-vaccination (rare, approximately 1-2 per million)"
    ],
    diagnostics: [
      "Perform serial neurological assessments: motor strength grading (0-5 scale), DTR assessment, cranial nerve examination",
      "Monitor forced vital capacity (FVC) and negative inspiratory force (NIF) every 4-6 hours during acute phase",
      "Anticipate intubation when FVC <20 mL/kg, NIF <-25 cmH2O, or >30% decline from baseline (20-30-40 rule)",
      "Interpret CSF analysis: albuminocytologic dissociation (elevated protein with normal WBC count)",
      "Interpret nerve conduction studies showing prolonged distal latencies and conduction block",
      "Monitor continuous cardiac telemetry for autonomic arrhythmias",
      "Assess Hughes Functional Grading Scale to track disability progression"
    ],
    management: [
      "Coordinate plasmapheresis (plasma exchange): 5 sessions over 7-14 days for moderate-to-severe GBS",
      "Administer IV immunoglobulin (IVIG) 0.4 g/kg/day for 5 days as alternative to plasmapheresis",
      "Implement aggressive respiratory monitoring and prepare for intubation",
      "Manage autonomic instability: continuous telemetry, cautious use of vasopressors and antiarrhythmics",
      "Implement comprehensive VTE prophylaxis: SCDs plus pharmacological anticoagulation",
      "Manage neuropathic pain with gabapentin or pregabalin per order",
      "Coordinate physical therapy for range-of-motion exercises during acute phase and progressive rehabilitation",
      "Implement nutritional support: enteral feeding if dysphagia present"
    ],
    nursingActions: [
      "Perform respiratory assessment every 2-4 hours: rate, depth, FVC, single-breath count, cough strength",
      "Keep emergency intubation equipment at bedside at all times",
      "Assess motor strength systematically from distal to proximal every 4-8 hours and document progression",
      "Monitor for autonomic dysfunction: labile blood pressure, cardiac arrhythmias, ileus, urinary retention",
      "Perform swallowing assessment before any oral intake; implement aspiration precautions",
      "Provide meticulous skin care and reposition every 2 hours; use pressure-relieving surfaces",
      "Assess pain using validated scales; neuropathic pain may require multimodal management",
      "Provide emotional support and education: explain that GBS is usually self-limiting with good recovery potential"
    ],
    signs: {
      left: [
        "Ascending symmetrical weakness (legs before arms)",
        "Areflexia or hyporeflexia",
        "Paresthesias and numbness",
        "Bilateral facial nerve palsy (cranial nerve VII)",
        "Bulbar weakness (dysarthria, dysphagia)",
        "Pain (neuropathic, back, extremity)"
      ],
      right: [
        "Respiratory failure (diaphragmatic weakness)",
        "Autonomic instability (tachycardia, bradycardia, hypertension, hypotension)",
        "Cardiac arrhythmias (leading cause of mortality)",
        "Paralytic ileus",
        "Urinary retention",
        "Complete quadriplegia in severe cases"
      ]
    },
    medications: [
      { name: "Intravenous Immunoglobulin (IVIG)", type: "Immunomodulator", action: "Provides exogenous antibodies that modulate the immune response and block autoantibody-mediated nerve damage", sideEffects: "Headache, fever, chills, myalgias, anaphylaxis (IgA-deficient patients), aseptic meningitis, renal failure, thromboembolic events", contra: "Selective IgA deficiency with anti-IgA antibodies, history of anaphylaxis to IVIG", pearl: "Standard dose is 0.4 g/kg/day for 5 days (total 2 g/kg). Equally effective as plasmapheresis. Do not combine IVIG with plasmapheresis (no additional benefit). Check IgA level before first infusion." },
      { name: "Gabapentin", type: "Anticonvulsant / neuropathic pain agent", action: "Modulates calcium channels in the CNS to reduce neuropathic pain signaling", sideEffects: "Sedation, dizziness, ataxia, peripheral edema", contra: "Severe renal impairment (dose adjustment required)", pearl: "First-line for neuropathic pain in GBS. Start low (100-300mg TID) and titrate. Monitor for excessive sedation especially in patients with respiratory compromise." },
      { name: "Enoxaparin", type: "LMWH anticoagulant", action: "Inhibits factor Xa and thrombin to prevent venous thromboembolism", sideEffects: "Bleeding, HIT, injection site hematoma", contra: "Active hemorrhage, HIT, severe renal impairment (CrCl <30)", pearl: "VTE prophylaxis is essential due to prolonged immobility. Combined with SCDs. Adjust dose for renal impairment." }
    ],
    pearls: [
      "The 20-30-40 rule for intubation: FVC <20 mL/kg, NIF <-25 (or worse than -30), or >30% decline in FVC from baseline",
      "Corticosteroids are NOT effective in GBS and should not be administered",
      "Albuminocytologic dissociation (high CSF protein, normal cell count) is the classic CSF finding but may be normal in the first week",
      "IVIG and plasmapheresis are equally effective; do not combine them",
      "Recovery follows a pattern: plateau phase (2-4 weeks) followed by gradual improvement over weeks to months"
    ],
    quiz: [
      { question: "A patient with GBS has a forced vital capacity (FVC) of 18 mL/kg. What is the RN's priority action?", options: ["Continue monitoring every 4 hours", "Prepare for intubation and notify the provider immediately", "Administer supplemental oxygen via nasal cannula", "Encourage incentive spirometry"], correct: 1, rationale: "FVC <20 mL/kg meets criteria for intubation in GBS (20-30-40 rule). The RN should prepare for intubation immediately and notify the provider, as respiratory failure can progress rapidly." },
      { question: "Which CSF finding is characteristic of Guillain-Barré syndrome?", options: ["Elevated WBC count with low glucose", "Elevated protein with normal WBC count", "Bloody CSF with xanthochromia", "Normal protein with elevated glucose"], correct: 1, rationale: "Albuminocytologic dissociation (elevated CSF protein with normal WBC count) is the classic finding in GBS, reflecting inflammation and protein leakage at the blood-nerve barrier." },
      { question: "The RN is caring for a patient receiving IVIG for GBS. Which assessment is essential before the first infusion?", options: ["Serum potassium level", "IgA level", "Hemoglobin A1c", "Serum albumin"], correct: 1, rationale: "Patients with selective IgA deficiency can develop anaphylaxis when exposed to IgA-containing blood products including IVIG. IgA level should be checked before the first infusion." }
    ]
  },

  "guillain-barre-np": {
    title: "Guillain-Barré Syndrome: NP Prescriptive Management",
    cellular: {
      title: "Advanced Immunopathology and Treatment Targets",
      content: "Guillain-Barré syndrome encompasses a spectrum of acute autoimmune polyneuropathies. The most common subtype, acute inflammatory demyelinating polyneuropathy (AIDP), involves molecular mimicry between ganglioside epitopes on Schwann cell membranes and lipooligosaccharides on Campylobacter jejuni or other triggering pathogens. Anti-ganglioside antibodies (anti-GM1, anti-GD1a, anti-GQ1b) activate complement, recruit macrophages, and cause segmental demyelination at the nodes of Ranvier. Axonal variants (AMAN, AMSAN) involve direct antibody-mediated attack on axonal membranes and carry a worse prognosis. The NP must differentiate GBS subtypes, initiate immunotherapy, manage respiratory failure and autonomic crisis, and coordinate the rehabilitation trajectory."
    },
    riskFactors: [
      "Campylobacter jejuni infection (most strongly associated; linked to axonal variants and anti-GM1 antibodies)",
      "Cytomegalovirus (linked to anti-GM2 antibodies and cranial nerve variants)",
      "Epstein-Barr virus, influenza, hepatitis E, Zika virus",
      "Mycoplasma pneumoniae infection",
      "HIV seroconversion illness",
      "Post-surgical immunological trigger",
      "Hodgkin lymphoma and other lymphoproliferative disorders"
    ],
    diagnostics: [
      "Order CSF analysis: expect albuminocytologic dissociation (protein >45 mg/dL, WBC <10/mm³); may be normal in first week",
      "Order nerve conduction studies (NCS) and electromyography (EMG): prolonged distal motor latencies, conduction block, temporal dispersion in AIDP; reduced CMAP amplitude in axonal variants",
      "Order anti-ganglioside antibody panel: anti-GM1 (AMAN), anti-GQ1b (Miller Fisher variant with ophthalmoplegia, ataxia, areflexia)",
      "Monitor FVC and NIF every 4 hours: plan intubation for FVC <20 mL/kg, NIF worse than -25 cmH2O, or rapid decline",
      "Order continuous cardiac monitoring: assess for sinus tachycardia, bradycardia, AV block, wide QRS",
      "Obtain baseline CMP, CBC, hepatic panel, IgA level before initiating IVIG",
      "Differentiate from transverse myelitis (sensory level, bowel/bladder involvement, MRI cord lesion) and myasthenia gravis (fatigable weakness, positive antibodies)"
    ],
    management: [
      "Prescribe IVIG 0.4 g/kg/day IV for 5 consecutive days (total 2 g/kg) OR plasmapheresis (5 exchanges over 7-14 days); do not combine",
      "Choose IVIG over plasmapheresis in hemodynamically unstable patients (better tolerated) or patients with poor venous access",
      "Choose plasmapheresis if IVIG is contraindicated (IgA deficiency) or if patient fails to improve after IVIG",
      "Do NOT prescribe corticosteroids: multiple RCTs demonstrate no benefit and potential harm in GBS",
      "Manage respiratory failure: intubate early rather than late; use lung-protective ventilation strategies",
      "Manage autonomic crisis: cautious use of short-acting antihypertensives (esmolol, labetalol) or vasopressors (phenylephrine); avoid long-acting agents due to lability",
      "Prescribe gabapentin 300mg TID (titrate to effect) or pregabalin for neuropathic pain; consider opioids for severe acute pain",
      "Order VTE prophylaxis: enoxaparin 40mg SQ daily plus SCDs"
    ],
    nursingActions: [
      "Classify GBS subtype based on clinical presentation, NCS/EMG, and antibody profile to guide prognosis discussion",
      "Monitor respiratory function serially: single-breath count (<20 indicates FVC <1L), cough strength, ability to clear secretions",
      "Manage hemodynamic instability: avoid rapid position changes, use volume expansion before vasopressors",
      "Coordinate multidisciplinary rehabilitation plan: PT, OT, speech therapy, respiratory therapy",
      "Assess for and manage common complications: ileus (abdominal assessment, bowel regimen), urinary retention (bladder scan, catheterization), SIADH",
      "Educate patient and family: expected course (nadir at 2-4 weeks, plateau, gradual recovery), good prognosis in most AIDP cases",
      "Monitor for treatment-related complications: renal function with IVIG, line sepsis with plasmapheresis",
      "Discuss goals of care and code status early, especially in patients requiring mechanical ventilation"
    ],
    signs: {
      left: [
        "Ascending symmetrical weakness with areflexia",
        "Sensory symptoms (paresthesias, pain) preceding weakness",
        "Bilateral facial palsy (50% of cases)",
        "Oculomotor palsy (Miller Fisher variant)",
        "Back pain and radicular symptoms",
        "Progressive weakness reaching nadir in 2-4 weeks"
      ],
      right: [
        "Respiratory failure (30% require mechanical ventilation)",
        "Autonomic instability: hypertensive crises, profound bradycardia, asystole",
        "Cardiac arrhythmias (most common cause of death in GBS)",
        "Syndrome of inappropriate ADH (SIADH)",
        "Paralytic ileus and gastroparesis",
        "Pressure injuries and contractures from prolonged immobility"
      ]
    },
    medications: [
      { name: "IVIG (Immune Globulin IV)", type: "Immunomodulator", action: "Provides anti-idiotype antibodies that neutralize pathogenic autoantibodies, modulates complement activation, and downregulates Fc receptor-mediated phagocytosis", sideEffects: "Infusion reactions, aseptic meningitis, renal tubular necrosis (sucrose-containing formulations), thromboembolic events, hemolytic anemia", contra: "Selective IgA deficiency with anti-IgA antibodies (anaphylaxis risk), uncompensated heart failure (volume overload)", pearl: "2 g/kg total dose over 5 days. Use sucrose-free formulations in patients with renal risk. Premedicate with acetaminophen and diphenhydramine. Monitor renal function daily during infusion." },
      { name: "Plasmapheresis", type: "Therapeutic apheresis", action: "Removes circulating autoantibodies, complement factors, and immune complexes from plasma", sideEffects: "Hypotension, hypocalcemia (citrate anticoagulant), line sepsis, coagulopathy", contra: "Hemodynamic instability (relative), sepsis, coagulopathy", pearl: "5 exchanges of 1-1.5 plasma volumes over 7-14 days. Monitor ionized calcium (citrate chelation). Most effective when started within 2 weeks of symptom onset. Do not combine with IVIG." },
      { name: "Pregabalin", type: "Calcium channel alpha-2-delta ligand", action: "Binds alpha-2-delta subunit of voltage-gated calcium channels, reducing excitatory neurotransmitter release and neuropathic pain signaling", sideEffects: "Somnolence, dizziness, weight gain, peripheral edema, blurred vision", contra: "Severe renal impairment (dose reduction required)", pearl: "Alternative to gabapentin for neuropathic pain in GBS. Start 75mg BID, titrate to 150-300mg BID. Schedule V controlled substance due to CNS effects." }
    ],
    pearls: [
      "IVIG and plasmapheresis are equally effective; choice depends on patient factors (hemodynamic stability, venous access, IgA status)",
      "Corticosteroids have no role in GBS treatment and may worsen outcomes in axonal variants",
      "Anti-GQ1b antibodies are pathognomonic for Miller Fisher variant (ophthalmoplegia, ataxia, areflexia)",
      "Axonal variants (AMAN, AMSAN) have longer recovery times and higher rates of residual disability",
      "Up to 5% of GBS patients may relapse; a second course of IVIG or plasmapheresis may be needed"
    ],
    quiz: [
      { question: "Which treatment is contraindicated in Guillain-Barré syndrome?", options: ["Intravenous immunoglobulin", "Plasmapheresis", "Corticosteroids", "Gabapentin"], correct: 2, rationale: "Multiple randomized controlled trials have demonstrated that corticosteroids are not effective in GBS and may worsen outcomes, particularly in axonal variants." },
      { question: "A patient with GBS has anti-GQ1b antibodies and presents with ophthalmoplegia, ataxia, and areflexia. Which variant does this represent?", options: ["Acute inflammatory demyelinating polyneuropathy (AIDP)", "Acute motor axonal neuropathy (AMAN)", "Miller Fisher syndrome", "Chronic inflammatory demyelinating polyneuropathy (CIDP)"], correct: 2, rationale: "The triad of ophthalmoplegia, ataxia, and areflexia with anti-GQ1b antibodies is pathognomonic for Miller Fisher syndrome, a variant of GBS." },
      { question: "An NP is deciding between IVIG and plasmapheresis for a patient with GBS who has hemodynamic instability. Which is preferred?", options: ["Plasmapheresis because it works faster", "IVIG because it is better tolerated in hemodynamically unstable patients", "Combine both for maximum effect", "Neither; prescribe corticosteroids instead"], correct: 1, rationale: "IVIG is preferred in hemodynamically unstable patients because plasmapheresis can exacerbate hypotension through fluid shifts. The two should never be combined as there is no additional benefit." }
    ]
  },

  "myasthenia-gravis-rpn": {
    title: "Myasthenia Gravis: RPN Monitoring",
    cellular: {
      title: "Neuromuscular Junction Dysfunction",
      content: "Myasthenia gravis is an autoimmune disorder in which antibodies target acetylcholine receptors at the neuromuscular junction, impairing nerve impulse transmission to skeletal muscles. This results in progressive, fluctuating muscle weakness that worsens with activity and improves with rest. The weakness characteristically affects ocular muscles first (ptosis, diplopia), then progresses to bulbar muscles (dysphagia, dysarthria) and potentially respiratory muscles. The RPN monitors for worsening weakness, respiratory status, and medication effects, reporting all changes immediately."
    },
    riskFactors: [
      "Female sex (onset typically 20-40 years)",
      "Male sex (onset typically 60-80 years)",
      "Thymic abnormalities (thymoma in 10-15% of cases)",
      "Other autoimmune conditions (thyroid disease, rheumatoid arthritis, lupus)",
      "Family history of autoimmune disease",
      "Stress, infection, or temperature extremes (exacerbation triggers)"
    ],
    diagnostics: [
      "Monitor muscle strength throughout the day and document fluctuations",
      "Report worsening ptosis, diplopia, or difficulty swallowing to the RN",
      "Monitor respiratory rate, depth, and oxygen saturation frequently",
      "Assess voice quality for dysarthria and nasal speech",
      "Report difficulty chewing or swallowing before or during meals",
      "Monitor for medication side effects and report"
    ],
    management: [
      "Administer pyridostigmine exactly on time as ordered (timing is critical)",
      "Schedule activities and ADLs early in the day when energy levels are highest",
      "Prepare semisolid foods to reduce aspiration risk during meals",
      "Administer medications before meals to optimize swallowing strength",
      "Encourage rest periods between activities to prevent fatigue",
      "Avoid excessive heat exposure which worsens muscle weakness"
    ],
    nursingActions: [
      "Monitor for signs of respiratory crisis and report immediately: increasing dyspnea, use of accessory muscles, inability to cough",
      "Assess swallowing function before each meal and report any gurgling or coughing during eating",
      "Monitor for gurgling, coughing, or wet voice quality during meals (aspiration risk)",
      "Position client in semi-Fowler's position during and after meals",
      "Encourage relaxation and stress reduction techniques",
      "Ensure vaccinations are up to date per provider orders",
      "Report any sudden severe worsening of weakness (may indicate myasthenic crisis)"
    ],
    signs: {
      left: [
        "Ptosis (drooping eyelids)",
        "Diplopia (double vision)",
        "Fluctuating muscle weakness (worse later in day)",
        "Weakness improves with rest",
        "Dysarthria (slurred speech)",
        "Difficulty chewing"
      ],
      right: [
        "Dysphagia (difficulty swallowing)",
        "Respiratory muscle weakness",
        "Nasal voice quality",
        "Neck weakness (head drop)",
        "Generalized limb weakness",
        "Respiratory failure (myasthenic crisis)"
      ]
    },
    medications: [
      { name: "Pyridostigmine", type: "Cholinesterase inhibitor", action: "Inhibits acetylcholinesterase, increasing acetylcholine availability at the neuromuscular junction", sideEffects: "Abdominal cramps, diarrhea, increased salivation, bradycardia, muscle fasciculations", contra: "Mechanical bowel or urinary obstruction", pearl: "Must be administered exactly on time. Administer 30-60 minutes before meals to improve swallowing. Too much causes cholinergic crisis (SLUDGE symptoms)." }
    ],
    pearls: [
      "Pyridostigmine timing is critical: late doses lead to worsening weakness, overdose leads to cholinergic crisis",
      "Medications that worsen MG include fluoroquinolones, aminoglycosides, magnesium sulfate, and beta-blockers",
      "Myasthenic crisis (too little medication) vs. cholinergic crisis (too much medication) both cause respiratory failure",
      "Weakness that worsens with activity and improves with rest is the hallmark of myasthenia gravis",
      "Schedule ADLs early in the day when muscle strength is greatest"
    ],
    quiz: [
      { question: "Which finding in a client with myasthenia gravis should the RPN report immediately?", options: ["Mild ptosis in the evening", "Increasing difficulty breathing and inability to swallow", "Fatigue after physical activity", "Improvement in strength after rest"], correct: 1, rationale: "Increasing dyspnea and dysphagia suggest progression toward myasthenic crisis with respiratory failure, requiring immediate intervention including potential intubation." },
      { question: "When should pyridostigmine be administered in relation to meals?", options: ["Immediately after the meal", "30-60 minutes before the meal", "At bedtime only", "Only when symptoms worsen"], correct: 1, rationale: "Pyridostigmine should be administered 30-60 minutes before meals to allow peak effect during eating, improving chewing and swallowing strength." }
    ]
  },

  "myasthenia-gravis-rn": {
    title: "Myasthenia Gravis: RN Clinical Management",
    cellular: {
      title: "Autoimmune Neuromuscular Pathophysiology",
      content: "Myasthenia gravis is an autoimmune disorder in which IgG autoantibodies bind to nicotinic acetylcholine receptors (AChRs) on the postsynaptic membrane of the neuromuscular junction. This binding activates complement, destroys receptors, and reduces the number of functional AChRs. As a result, acetylcholine released from motor nerve terminals is insufficient to depolarize the postsynaptic membrane and generate a muscle action potential. The weakness is characteristically fatigable: repeated use of a muscle group depletes available ACh and worsens weakness, while rest allows replenishment. The thymus gland is implicated in 85% of patients (hyperplasia or thymoma). The RN manages medication timing, performs serial respiratory and neurological assessments, distinguishes between myasthenic and cholinergic crises, implements aspiration precautions, and coordinates multidisciplinary care."
    },
    riskFactors: [
      "Bimodal age distribution: women 20-40 years, men 60-80 years",
      "Thymic abnormalities: thymic hyperplasia (65%), thymoma (10-15%)",
      "Other autoimmune conditions (thyroiditis, rheumatoid arthritis, SLE)",
      "Family history of autoimmune disease",
      "HLA-B8 and HLA-DR3 genetic associations",
      "Exacerbation triggers: infection, stress, surgery, pregnancy, temperature extremes",
      "Medications that worsen MG: aminoglycosides, fluoroquinolones, macrolides, beta-blockers, magnesium, D-penicillamine"
    ],
    diagnostics: [
      "Interpret serum AChR antibody test (positive in 85% of generalized MG)",
      "Evaluate anti-MuSK antibody in AChR-negative patients (seronegative MG)",
      "Assess response to edrophonium (Tensilon test): brief improvement in strength confirms MG diagnosis",
      "Order electromyography (EMG) with repetitive nerve stimulation: decremental response is diagnostic",
      "Order CT or MRI of chest to evaluate for thymoma",
      "Perform serial bedside respiratory assessment: FVC, NIF, single-breath count",
      "Monitor complete medication list for drugs that exacerbate MG"
    ],
    management: [
      "Administer pyridostigmine on a strict schedule; titrate dose based on symptom response",
      "Administer corticosteroids (prednisone) as prescribed for immunosuppression; monitor for initial worsening",
      "Coordinate immunosuppressant therapy: azathioprine, mycophenolate as steroid-sparing agents",
      "Prepare patient for thymectomy if thymoma is present or in non-thymomatous MG for potential remission",
      "Manage myasthenic crisis: plasmapheresis or IVIG, respiratory support, ICU monitoring",
      "Differentiate myasthenic crisis from cholinergic crisis (both present with weakness and respiratory failure)",
      "Implement aspiration precautions: assess swallowing, modified diet texture, upright positioning"
    ],
    nursingActions: [
      "Administer pyridostigmine exactly on time; delays worsen weakness, overdose causes cholinergic crisis",
      "Perform respiratory assessment every 2-4 hours during exacerbation: FVC, NIF, cough strength, SpO2",
      "Assess for myasthenic crisis: sudden severe generalized weakness, respiratory distress, dysphagia (undertreated)",
      "Assess for cholinergic crisis: excessive salivation, lacrimation, urination, diarrhea, diaphoresis, bradycardia (SLUDGE; overtreated)",
      "Keep emergency intubation equipment at bedside during acute phase",
      "Perform swallowing assessment before meals; modify diet consistency as needed",
      "Schedule nursing care and patient activities during peak medication effect",
      "Educate patient on medication adherence, trigger avoidance, and signs of crisis"
    ],
    signs: {
      left: [
        "Ptosis (drooping eyelids, often asymmetric)",
        "Diplopia (double vision)",
        "Fatigable weakness (worsens with activity, improves with rest)",
        "Facial weakness (flat affect, snarl when smiling)",
        "Dysarthria (weak, nasal speech)",
        "Weak neck extensors (head drop)"
      ],
      right: [
        "Dysphagia with aspiration risk",
        "Respiratory muscle weakness (dyspnea, shallow breathing)",
        "Myasthenic crisis (acute respiratory failure from undertreated MG)",
        "Cholinergic crisis (SLUDGE symptoms from pyridostigmine overdose)",
        "Generalized limb weakness (proximal > distal)",
        "Inability to maintain upright posture"
      ]
    },
    medications: [
      { name: "Pyridostigmine", type: "Cholinesterase inhibitor", action: "Inhibits acetylcholinesterase at the neuromuscular junction, increasing ACh concentration and improving neuromuscular transmission", sideEffects: "Abdominal cramps, diarrhea, increased secretions, bradycardia, muscle fasciculations", contra: "Mechanical GI or urinary obstruction", pearl: "First-line symptomatic treatment. Typical dose: 60mg every 4-6 hours. Extended-release (Mestinon Timespan 180mg) given at bedtime for overnight coverage. Overdose causes cholinergic crisis." },
      { name: "Prednisone", type: "Corticosteroid", action: "Suppresses autoimmune response by reducing AChR antibody production and complement activation", sideEffects: "Cushingoid features, hyperglycemia, osteoporosis, immunosuppression, adrenal suppression", contra: "Active systemic fungal infection, uncontrolled diabetes", pearl: "May cause initial worsening of weakness in first 2-3 weeks (start low, go slow). Taper gradually to avoid adrenal crisis. Long-term use requires steroid-sparing agent." },
      { name: "Azathioprine", type: "Immunosuppressant", action: "Purine analog that inhibits lymphocyte proliferation, reducing autoantibody production", sideEffects: "Bone marrow suppression, hepatotoxicity, pancreatitis, increased infection risk", contra: "TPMT deficiency (check TPMT before starting), pregnancy", pearl: "Steroid-sparing agent; takes 3-6 months for full effect. Monitor CBC and LFTs regularly. Check TPMT enzyme level before initiating therapy." },
      { name: "IVIG", type: "Immunomodulator", action: "Modulates immune system, neutralizes pathogenic autoantibodies through anti-idiotype mechanisms", sideEffects: "Headache, anaphylaxis (IgA deficiency), renal failure, thromboembolism", contra: "IgA deficiency with anti-IgA antibodies", pearl: "Used for myasthenic crisis and as bridge therapy. 2 g/kg over 2-5 days. Onset of action within days. Check IgA level before first dose." }
    ],
    pearls: [
      "Myasthenic crisis (undertreated) and cholinergic crisis (overtreated) both cause respiratory failure but are treated differently",
      "The Tensilon (edrophonium) test differentiates the two: improvement = myasthenic crisis; worsening = cholinergic crisis",
      "Never administer aminoglycosides, fluoroquinolones, or magnesium sulfate to a patient with MG without extreme caution",
      "Thymectomy may lead to remission or significant improvement in 50-70% of non-thymomatous MG patients",
      "Initial worsening of weakness after starting prednisone is expected; hospitalize patients during initiation if bulbar or respiratory involvement is significant"
    ],
    quiz: [
      { question: "A patient with MG develops profuse salivation, diarrhea, abdominal cramping, and worsening weakness after taking pyridostigmine. The RN suspects:", options: ["Myasthenic crisis", "Cholinergic crisis", "Allergic reaction to pyridostigmine", "Normal medication response"], correct: 1, rationale: "SLUDGE symptoms (Salivation, Lacrimation, Urination, Diarrhea, GI cramping, Emesis) with worsening weakness after pyridostigmine administration indicate cholinergic crisis from medication overdose." },
      { question: "Which medication should the RN question if ordered for a patient with myasthenia gravis?", options: ["Pyridostigmine", "Azathioprine", "Gentamicin", "Prednisone"], correct: 2, rationale: "Aminoglycosides (including gentamicin) can worsen neuromuscular blockade in MG by interfering with ACh release and postsynaptic receptor function, potentially precipitating respiratory failure." },
      { question: "The RN is preparing a patient with MG for thymectomy. Which preoperative assessment is the priority?", options: ["Assess for latex allergy", "Evaluate respiratory function and FVC", "Check serum potassium level", "Assess for peripheral edema"], correct: 1, rationale: "Respiratory function assessment is critical before thymectomy because MG patients are at high risk for postoperative respiratory failure. Baseline FVC and NIF guide postoperative ventilation management." }
    ]
  },

  "myasthenia-gravis-np": {
    title: "Myasthenia Gravis: NP Prescriptive Management",
    cellular: {
      title: "Advanced Immunopathology and Targeted Therapy",
      content: "Myasthenia gravis is a B-cell mediated autoimmune disorder targeting the postsynaptic neuromuscular junction. In 85% of patients, IgG1 and IgG3 autoantibodies bind nicotinic AChRs, activating the classical complement cascade and causing receptor internalization, degradation, and postsynaptic membrane damage. This reduces the safety factor for neuromuscular transmission below the threshold for reliable muscle contraction. In 5-8% of patients, anti-muscle-specific kinase (MuSK) IgG4 antibodies disrupt AChR clustering at the postsynaptic membrane without complement activation, causing a distinct clinical phenotype with prominent bulbar and respiratory weakness. The thymus plays a central role in AChR-positive MG: thymic hyperplasia maintains autoreactive B cells, while thymomas produce ectopic T cells that drive antibody production. The NP classifies MG subtype, initiates and optimizes immunotherapy, manages acute crises, coordinates surgical referral, and monitors for treatment-related complications."
    },
    riskFactors: [
      "Early-onset MG (age <50): female predominance, thymic hyperplasia, AChR antibodies, good response to thymectomy",
      "Late-onset MG (age >50): male predominance, thymic atrophy, AChR antibodies, more comorbidities",
      "Thymoma-associated MG: paraneoplastic syndrome, requires surgery regardless of age",
      "Anti-MuSK MG: female predominance, prominent bulbar symptoms, poor response to pyridostigmine and thymectomy",
      "Medications that exacerbate MG: fluoroquinolones, aminoglycosides, macrolides, beta-blockers, calcium channel blockers, D-penicillamine, magnesium, immune checkpoint inhibitors",
      "Triggers for exacerbation: infection, surgery, pregnancy, emotional stress, temperature extremes"
    ],
    diagnostics: [
      "Order AChR binding antibodies (positive in 85% of generalized MG, 50% of ocular MG)",
      "Order anti-MuSK antibodies in AChR-seronegative patients with suspected MG",
      "Order anti-LRP4 antibodies in double-seronegative patients (research assay)",
      "Order repetitive nerve stimulation (RNS): >10% decremental response at 2-3 Hz is diagnostic",
      "Order single-fiber EMG (most sensitive test): increased jitter and blocking",
      "Order CT or MRI chest for thymoma evaluation",
      "Classify by MGFA Clinical Classification (I-V) and subtype to guide therapy",
      "Obtain baseline labs before immunosuppression: CBC, CMP, LFTs, TPMT (for azathioprine), hepatitis B/C, TB screening"
    ],
    management: [
      "Prescribe pyridostigmine 60mg PO every 4-6 hours; titrate to symptom control (max 120mg/dose); add ER formulation 180mg at bedtime",
      "Initiate prednisone for patients not controlled with pyridostigmine alone: start 10-20mg daily, increase by 5-10mg every 3-5 days to target dose (0.5-1 mg/kg/day)",
      "Add steroid-sparing agent early: azathioprine 2-3 mg/kg/day (check TPMT first), or mycophenolate 1000-1500mg BID",
      "Refer for thymectomy in all patients with thymoma and in AChR-positive generalized MG (ages 18-65) per MGTX trial",
      "Manage myasthenic crisis with IVIG 2 g/kg over 5 days or plasmapheresis (5 exchanges over 10-14 days)",
      "Consider rituximab (anti-CD20) for refractory MG, especially anti-MuSK MG (dramatic response in 70-80%)",
      "Prescribe eculizumab (C5 complement inhibitor) for AChR-positive generalized MG refractory to conventional therapy",
      "Manage anti-MuSK MG differently: poor response to pyridostigmine (often worsens symptoms), no role for thymectomy, excellent response to rituximab"
    ],
    nursingActions: [
      "Classify MGFA class at each visit: I (ocular only), II (mild generalized), III (moderate), IV (severe), V (intubation required)",
      "Develop individualized crisis action plan for each patient (when to present to ED, medications to avoid)",
      "Monitor for steroid side effects: blood glucose, bone density (order DEXA), blood pressure, weight, mood",
      "Monitor immunosuppressant labs: CBC and LFTs every 2-4 weeks for azathioprine, CBC for mycophenolate",
      "Coordinate preoperative optimization before thymectomy: ensure stable MGFA class, consider preop IVIG or plasmapheresis",
      "Educate patient on medication timing, trigger avoidance, and MedicAlert identification",
      "Screen for depression and anxiety (high prevalence in MG patients)",
      "Monitor for treatment-emergent infections with immunosuppressive therapy"
    ],
    signs: {
      left: [
        "Fatigable ptosis and diplopia (earliest symptoms in 50-65%)",
        "Proximal limb weakness (difficulty climbing stairs, lifting arms)",
        "Facial weakness (myasthenic snarl, flat expression)",
        "Fluctuating symptoms (worse with exertion, better with rest)",
        "Nasal dysarthria",
        "Jaw fatigue during chewing"
      ],
      right: [
        "Bulbar crisis: severe dysphagia, aspiration, nasal regurgitation",
        "Respiratory failure requiring intubation (MGFA class V)",
        "Myasthenic crisis: acute generalized weakness triggered by infection, medication change, or stress",
        "Cholinergic crisis: SLUDGE symptoms plus weakness from AChE inhibitor overdose",
        "Dropped head syndrome (severe neck extensor weakness)",
        "Complete ventilator dependence in refractory cases"
      ]
    },
    medications: [
      { name: "Pyridostigmine", type: "Reversible AChE inhibitor", action: "Competitively inhibits acetylcholinesterase at the neuromuscular junction, prolonging ACh activity and improving muscle contraction", sideEffects: "Cholinergic effects: diarrhea, abdominal cramps, hypersalivation, bradycardia, bronchospasm", contra: "Mechanical bowel/urinary obstruction, peritonitis", pearl: "Symptomatic only; does not alter disease course. Max 120mg/dose. Anti-MuSK patients often intolerant (worsens symptoms). ER 180mg at bedtime prevents morning weakness." },
      { name: "Rituximab", type: "Anti-CD20 monoclonal antibody", action: "Depletes CD20-positive B lymphocytes, reducing autoantibody-producing cells", sideEffects: "Infusion reactions, PML (rare), hepatitis B reactivation, hypogammaglobulinemia, infection", contra: "Active severe infection, hepatitis B without prophylaxis", pearl: "Emerging first-line immunosuppressant for anti-MuSK MG (70-80% significant improvement). Used off-label for refractory AChR-positive MG. 375 mg/m² weekly x4 or 1000mg x2 (days 1 and 15)." },
      { name: "Eculizumab", type: "C5 complement inhibitor", action: "Monoclonal antibody that binds C5 complement protein, preventing formation of membrane attack complex (MAC) that destroys postsynaptic AChRs", sideEffects: "Meningococcal infection (requires vaccination 2 weeks before starting), headache, nasopharyngitis, upper respiratory infection", contra: "Unresolved Neisseria meningitidis infection, unvaccinated against meningococcus", pearl: "FDA-approved for AChR-positive generalized MG refractory to conventional immunosuppression. Must administer meningococcal vaccine at least 2 weeks prior to first dose. Biweekly IV infusion." },
      { name: "Mycophenolate Mofetil", type: "Immunosuppressant", action: "Inhibits inosine monophosphate dehydrogenase, blocking purine synthesis in T and B lymphocytes", sideEffects: "GI disturbance, leukopenia, teratogenicity, increased infection risk", contra: "Pregnancy (Category D), breastfeeding", pearl: "Steroid-sparing agent. 1000-1500mg BID. Full effect takes 6-12 months. Requires reliable contraception in women of childbearing age. Monitor CBC every 2-4 weeks initially." }
    ],
    pearls: [
      "The MGTX trial demonstrated that thymectomy plus prednisone is superior to prednisone alone in AChR-positive non-thymomatous generalized MG (improved clinical outcomes and lower steroid requirements over 3 years)",
      "Anti-MuSK MG behaves differently: minimal response to pyridostigmine, no benefit from thymectomy, dramatic response to rituximab",
      "Edrophonium (Tensilon) test distinguishes myasthenic crisis (improvement) from cholinergic crisis (worsening); keep atropine at bedside as antidote",
      "Complement inhibitors (eculizumab, ravulizumab) and FcRn inhibitors (efgartigimod, rozanolixizumab) are changing the treatment landscape for refractory MG",
      "Immune checkpoint inhibitor-associated MG is emerging as cancer immunotherapy use increases; may be fulminant and refractory"
    ],
    quiz: [
      { question: "Which immunosuppressant is most effective for anti-MuSK myasthenia gravis?", options: ["Azathioprine", "Mycophenolate", "Rituximab", "Cyclophosphamide"], correct: 2, rationale: "Anti-MuSK MG responds dramatically to rituximab (anti-CD20 B-cell depletion) with 70-80% of patients achieving significant or complete improvement. It is now considered first-line immunosuppression for this subtype." },
      { question: "Before initiating eculizumab for refractory generalized MG, which vaccination is mandatory?", options: ["Influenza vaccine", "Hepatitis B vaccine", "Meningococcal vaccine", "Pneumococcal vaccine"], correct: 2, rationale: "Eculizumab blocks terminal complement (C5), eliminating the bactericidal activity of MAC against Neisseria meningitidis. Meningococcal vaccination must be administered at least 2 weeks before starting therapy." },
      { question: "A patient with newly diagnosed generalized MG on prednisone has worsening weakness during the first 2 weeks of treatment. What should the NP advise?", options: ["Immediately discontinue prednisone", "This is an expected initial effect; monitor closely and consider hospitalization if respiratory status is compromised", "Double the prednisone dose", "Switch to dexamethasone"], correct: 1, rationale: "Initial worsening of MG symptoms after starting corticosteroids is a well-known phenomenon occurring in the first 2-3 weeks. Patients with significant bulbar or respiratory involvement should be monitored in-hospital during initiation. The steroid should not be abruptly discontinued." }
    ]
  },

  "newborn-diabetic-mother-rpn": {
    title: "Newborn of Diabetic Mother: RPN Monitoring",
    cellular: {
      title: "Fetal Hyperinsulinism",
      content: "During intrauterine life, the fetus of a mother with poorly controlled diabetes is exposed to elevated maternal glucose levels that cross the placenta. The fetal pancreas responds by producing high levels of insulin (fetal hyperinsulinism). After birth, the newborn loses the maternal glucose supply but continues to produce excessive insulin, resulting in rapid neonatal hypoglycemia. Fetal hyperinsulinism also drives excessive fetal growth (macrosomia), which increases the risk of birth injuries. The newborn is additionally at risk for hypocalcemia, hyperbilirubinemia, polycythemia, and respiratory distress syndrome. The RPN monitors blood glucose levels, feeding patterns, and vital signs, reporting abnormalities immediately."
    },
    riskFactors: [
      "Maternal gestational diabetes mellitus (GDM)",
      "Maternal pre-existing type 1 or type 2 diabetes",
      "Poor maternal glycemic control during pregnancy",
      "Macrosomia (birth weight >4000g or >90th percentile)",
      "Large for gestational age (LGA) newborn",
      "Preterm birth (impaired surfactant production)",
      "Maternal obesity"
    ],
    diagnostics: [
      "Monitor blood glucose levels per protocol: typically at 1, 2, 4, 8, 12, and 24 hours of life",
      "Report blood glucose <40 mg/dL (2.2 mmol/L) immediately",
      "Monitor for signs of hypoglycemia: jitteriness, irritability, tremors, poor feeding, lethargy, apnea",
      "Monitor vital signs: temperature instability, respiratory rate, heart rate",
      "Assess for signs of birth injury: clavicle fracture, brachial plexus injury (Erb palsy)",
      "Monitor for jaundice and report yellow skin discoloration"
    ],
    management: [
      "Initiate early and frequent feeding within 30-60 minutes of birth (breastfeeding preferred)",
      "Feed every 2-3 hours to maintain glucose levels",
      "Administer IV dextrose as ordered if oral feeds are insufficient to maintain glucose",
      "Maintain thermoregulation: skin-to-skin contact, warm environment (cold stress increases glucose utilization)",
      "Report respiratory distress signs: tachypnea, grunting, nasal flaring, retractions",
      "Monitor intake and output including wet diapers and stool frequency"
    ],
    nursingActions: [
      "Perform heel stick blood glucose checks at scheduled intervals and report abnormal values",
      "Encourage breastfeeding or provide formula supplementation as ordered",
      "Assess feeding effectiveness: latch, duration, swallowing sounds",
      "Monitor respiratory status: rate, effort, oxygen saturation",
      "Maintain thermoneutral environment to prevent cold stress",
      "Assess for birth trauma: asymmetric Moro reflex (Erb palsy), crepitus over clavicle",
      "Monitor skin color for jaundice and report progression"
    ],
    signs: {
      left: [
        "Macrosomia (large birth weight)",
        "Plethoric (ruddy, flushed) appearance",
        "Organomegaly (enlarged liver, heart)",
        "Cushingoid facial features",
        "Birth injuries from difficult delivery"
      ],
      right: [
        "Hypoglycemia: jitteriness, tremors, irritability, poor feeding",
        "Lethargy, hypotonia, apnea (severe hypoglycemia)",
        "Temperature instability",
        "Respiratory distress (tachypnea, grunting)",
        "Jaundice",
        "Seizures (if severe hypoglycemia untreated)"
      ]
    },
    medications: [
      { name: "Dextrose 10% IV", type: "Glucose replacement", action: "Provides exogenous glucose to maintain blood sugar when oral feeds are insufficient", sideEffects: "Rebound hypoglycemia if infusion stopped abruptly, IV site infiltration", contra: "None (life-saving intervention for neonatal hypoglycemia)", pearl: "Administer 2 mL/kg bolus of D10W followed by continuous infusion at 6-8 mg/kg/min. Wean gradually to prevent rebound hypoglycemia. Always recheck glucose 30 minutes after intervention." }
    ],
    pearls: [
      "Neonatal hypoglycemia can cause permanent neurological damage if not treated promptly",
      "Early feeding (within 30-60 minutes of birth) is the first intervention for maintaining blood glucose",
      "Jitteriness is the most common early sign of neonatal hypoglycemia",
      "Cold stress increases glucose utilization; maintain thermoneutral environment at all times",
      "Macrosomia increases risk of shoulder dystocia, clavicle fracture, and brachial plexus injury during delivery"
    ],
    quiz: [
      { question: "A newborn of a diabetic mother has a blood glucose of 35 mg/dL at 2 hours of life. What is the RPN's priority action?", options: ["Document the finding and recheck in 4 hours", "Report the low glucose immediately and encourage feeding", "Wait for the next scheduled check", "Apply a warm blanket and recheck in 1 hour"], correct: 1, rationale: "Blood glucose <40 mg/dL requires immediate intervention. The RPN should report the finding and initiate or encourage feeding. IV dextrose may be needed if oral feeds do not raise glucose levels." },
      { question: "Which assessment finding is the earliest indicator of hypoglycemia in a newborn of a diabetic mother?", options: ["Seizures", "Cyanosis", "Jitteriness and tremors", "Bradycardia"], correct: 2, rationale: "Jitteriness, tremors, and irritability are early signs of neonatal hypoglycemia. Seizures are a late and severe manifestation indicating prolonged or profound hypoglycemia." }
    ]
  },

  "newborn-diabetic-mother-rn": {
    title: "Newborn of Diabetic Mother: RN Clinical Management",
    cellular: {
      title: "Pathophysiology of Fetal Hyperinsulinism",
      content: "In pregnancies complicated by diabetes mellitus, chronic maternal hyperglycemia exposes the fetus to elevated glucose levels that freely cross the placenta via facilitated diffusion (GLUT-1 transporters). Maternal insulin does not cross the placenta, so the fetal pancreatic beta cells undergo hyperplasia and hypertrophy, producing excessive insulin. Fetal hyperinsulinism acts as a growth factor, causing macrosomia, organomegaly (cardiomegaly, hepatomegaly), and increased adipose deposition. At birth, the maternal glucose supply is abruptly removed, but the neonatal pancreas continues to secrete supraphysiological insulin levels, causing rapid and potentially severe hypoglycemia within the first 1-4 hours of life. Additional metabolic complications include hypocalcemia (impaired parathyroid response), hypomagnesemia, polycythemia (erythropoietin response to chronic fetal hypoxia), hyperbilirubinemia (from polycythemia breakdown), and respiratory distress syndrome (insulin inhibits surfactant production). The RN implements comprehensive metabolic monitoring, manages glucose stabilization, coordinates diagnostic workup, and provides family education."
    },
    riskFactors: [
      "Maternal pre-gestational diabetes (type 1 or type 2) with poor glycemic control",
      "Gestational diabetes mellitus (GDM)",
      "Maternal HbA1c >6.5% during pregnancy",
      "Macrosomia (birth weight >4000g)",
      "Preterm birth (decreased glycogen stores and immature surfactant production)",
      "Operative delivery (cesarean section, vacuum, forceps) due to macrosomia",
      "Maternal obesity and metabolic syndrome"
    ],
    diagnostics: [
      "Perform point-of-care blood glucose at 1, 2, 4, 8, 12, and 24 hours of life per protocol",
      "Confirm point-of-care values <40 mg/dL with serum glucose",
      "Monitor serum calcium levels at 6, 24, and 48 hours (risk of hypocalcemia)",
      "Order serum bilirubin if jaundice develops; monitor with transcutaneous bilirubinometry",
      "Monitor CBC and hematocrit for polycythemia (Hct >65%)",
      "Assess echocardiogram if murmur detected or signs of cardiomyopathy present",
      "Monitor respiratory status continuously: pulse oximetry, respiratory rate, work of breathing"
    ],
    management: [
      "Initiate early feeding within 30 minutes of birth and feed every 2-3 hours",
      "Administer IV dextrose (D10W bolus 2 mL/kg followed by continuous infusion 6-8 mg/kg/min) for glucose <25 mg/dL in first 4 hours or <35 mg/dL after 4 hours",
      "Titrate glucose infusion rate (GIR) based on serial glucose checks; target glucose >45 mg/dL",
      "Wean IV dextrose gradually to prevent rebound hypoglycemia as oral feeds are established",
      "Implement thermoregulation strategies: skin-to-skin contact, radiant warmer, pre-warmed blankets",
      "Manage polycythemia: ensure adequate hydration; partial exchange transfusion if Hct >70% with symptoms",
      "Initiate phototherapy for hyperbilirubinemia per hour-specific bilirubin nomogram",
      "Provide respiratory support as needed: supplemental oxygen, CPAP, or mechanical ventilation for RDS"
    ],
    nursingActions: [
      "Implement standardized neonatal hypoglycemia screening protocol with documented action thresholds",
      "Assess feeding effectiveness at each session: latch quality, duration, audible swallowing",
      "Calculate glucose infusion rate (GIR) accurately: GIR = (% dextrose × rate mL/hr) / (6 × weight kg)",
      "Perform comprehensive newborn assessment: head-to-toe evaluation including birth injury screening",
      "Assess for Erb palsy: asymmetric Moro reflex, arm held in waiter's tip position",
      "Assess for clavicle fracture: crepitus, asymmetric movement, swelling",
      "Monitor for signs of cardiac involvement: murmur, tachypnea, poor perfusion, cardiomegaly on CXR",
      "Educate parents on hypoglycemia signs, feeding importance, and follow-up requirements"
    ],
    signs: {
      left: [
        "Macrosomia (LGA)",
        "Plethoric, round (cushingoid) facies",
        "Cardiomegaly and hepatomegaly",
        "Increased subcutaneous fat",
        "Shoulder dystocia history",
        "Birth injuries (clavicle fracture, Erb palsy)"
      ],
      right: [
        "Hypoglycemia: jitteriness, tremors, poor feeding, lethargy, seizures",
        "Hypocalcemia: jitteriness, irritability, seizures (often overlaps with hypoglycemia presentation)",
        "Respiratory distress syndrome: tachypnea, grunting, nasal flaring, retractions",
        "Polycythemia: plethora, cyanosis, poor feeding, hyperviscosity",
        "Hyperbilirubinemia: jaundice, elevated bilirubin",
        "Hypertrophic cardiomyopathy: murmur, tachypnea, poor feeding"
      ]
    },
    medications: [
      { name: "Dextrose 10% IV (D10W)", type: "Glucose replacement", action: "Provides exogenous glucose to correct and maintain normoglycemia in the setting of persistent fetal hyperinsulinism", sideEffects: "Rebound hypoglycemia with abrupt discontinuation, IV infiltration with tissue necrosis (>12.5% dextrose requires central line)", contra: "No absolute contraindications in neonatal hypoglycemia", pearl: "Bolus: 2 mL/kg D10W IV push (200 mg/kg glucose). Continuous infusion: start at GIR 6-8 mg/kg/min. Recheck glucose 30 minutes after bolus and hourly during infusion. Wean by 1-2 mg/kg/min every 6-12 hours as glucose stabilizes." },
      { name: "Calcium Gluconate 10%", type: "Electrolyte replacement", action: "Replaces calcium in neonatal hypocalcemia resulting from impaired parathyroid function", sideEffects: "Bradycardia (administer slowly), tissue necrosis if extravasation occurs", contra: "Concurrent digitalis use (increased sensitivity)", pearl: "Administer IV slowly over 10-30 minutes with continuous cardiac monitoring. Monitor heart rate during infusion. Stop infusion if bradycardia develops. Check ionized calcium levels." }
    ],
    pearls: [
      "Insulin inhibits fetal surfactant production, making IDMs at higher risk for RDS even at term gestation",
      "Hypocalcemia in IDMs typically occurs at 24-72 hours of life due to functional hypoparathyroidism",
      "Polycythemia results from chronic intrauterine hypoxia stimulating fetal erythropoietin production",
      "Hypertrophic cardiomyopathy in IDMs is usually transient and resolves within 2-4 weeks as insulin levels normalize",
      "GIR calculation: (% dextrose × rate mL/hr) / (6 × weight kg) gives mg/kg/min of glucose delivery"
    ],
    quiz: [
      { question: "A newborn of a diabetic mother has a blood glucose of 22 mg/dL at 3 hours of life. The RN should:", options: ["Encourage breastfeeding and recheck in 1 hour", "Administer D10W bolus 2 mL/kg IV and initiate continuous glucose infusion", "Apply a warm blanket and observe", "Wait for the routine 4-hour glucose check"], correct: 1, rationale: "Blood glucose <25 mg/dL in the first 4 hours of life requires IV dextrose intervention. A 2 mL/kg bolus of D10W followed by continuous infusion at 6-8 mg/kg/min is the standard treatment." },
      { question: "Why are newborns of diabetic mothers at increased risk for respiratory distress syndrome?", options: ["Maternal diabetes causes lung hyperplasia", "Fetal hyperinsulinism inhibits surfactant production", "Maternal antibodies attack fetal lung tissue", "Excessive amniotic fluid dilutes surfactant"], correct: 1, rationale: "Elevated fetal insulin levels inhibit the production of surfactant phospholipids, particularly phosphatidylglycerol, making IDMs more susceptible to RDS even at term gestation." },
      { question: "The RN is weaning IV dextrose in a stabilized IDM. Which practice prevents rebound hypoglycemia?", options: ["Discontinue the infusion abruptly once glucose is >50 mg/dL", "Decrease the GIR by 1-2 mg/kg/min every 6-12 hours while advancing oral feeds", "Switch to D50W for more concentrated glucose delivery", "Reduce feeding frequency to decrease insulin production"], correct: 1, rationale: "Gradual weaning of IV dextrose by 1-2 mg/kg/min every 6-12 hours, while simultaneously advancing oral feeds, prevents rebound hypoglycemia from the ongoing hyperinsulinemic state." }
    ]
  },

  "newborn-diabetic-mother-np": {
    title: "Newborn of Diabetic Mother: NP Prescriptive Management",
    cellular: {
      title: "Advanced Metabolic Pathophysiology of the Infant of a Diabetic Mother",
      content: "The infant of a diabetic mother (IDM) represents a clinical model of fetal programming and in utero metabolic disease. Chronic maternal hyperglycemia drives fetal beta-cell hyperplasia through the Pedersen hypothesis: maternal glucose crosses the placenta, stimulating fetal insulin secretion. Insulin acts as a fetal growth hormone, promoting anabolic pathways including glycogenesis, lipogenesis, and protein synthesis, resulting in macrosomia and organomegaly. At birth, abrupt cessation of transplacental glucose delivery combined with persistent hyperinsulinism produces severe hypoglycemia within 1-4 hours. The metabolic cascade extends beyond glucose: insulin suppresses fetal parathyroid hormone (causing hypocalcemia at 24-72 hours), chronic fetal hypoxia from placental insufficiency stimulates erythropoietin (causing polycythemia and subsequent hyperbilirubinemia), and insulin antagonizes cortisol-mediated surfactant production (increasing RDS risk even at term). Hypertrophic cardiomyopathy occurs in 30% of IDMs from glycogen deposition in the interventricular septum, typically resolving within weeks as insulin levels normalize. The NP prescribes glucose management protocols, manages the full metabolic panel, coordinates diagnostic evaluation, and guides the transition to outpatient follow-up."
    },
    riskFactors: [
      "Pre-gestational diabetes with HbA1c >6.5% in first trimester (congenital anomaly risk proportional to HbA1c)",
      "Gestational diabetes with poor glycemic control",
      "Maternal insulin requirements >100 units/day (marker of severe insulin resistance)",
      "Birth weight >4500g (highest risk for birth injury and metabolic complications)",
      "Preterm delivery (reduced glycogen stores, immature gluconeogenic enzymes, inadequate surfactant)",
      "Shoulder dystocia during delivery (brachial plexus injury, clavicle fracture)",
      "Maternal vascular disease (SGA paradox: growth restriction from uteroplacental insufficiency)"
    ],
    diagnostics: [
      "Prescribe structured glucose monitoring protocol: 1, 2, 4, 8, 12, 24 hours; extend to 48 hours if values remain unstable",
      "Confirm point-of-care glucose <40 mg/dL with serum glucose; differentiate from erroneous capillary values",
      "Order ionized calcium at 6, 24, and 48 hours (more accurate than total calcium in neonates)",
      "Order serum magnesium if hypocalcemia is refractory to calcium supplementation",
      "Order CBC with peripheral smear and reticulocyte count: evaluate for polycythemia (central venous Hct >65%)",
      "Order total and direct bilirubin at 24 hours and per hour-specific nomogram",
      "Order echocardiogram if murmur, cardiomegaly on CXR, or signs of poor cardiac output (hypertrophic cardiomyopathy in 30% of IDMs)",
      "Evaluate for congenital anomalies: cardiac (VSD, transposition), neural tube defects, caudal regression syndrome, renal anomalies"
    ],
    management: [
      "Prescribe D10W bolus 2 mL/kg (200 mg/kg glucose) for symptomatic hypoglycemia or glucose <25 mg/dL in first 4 hours, <35 mg/dL after 4 hours",
      "Initiate continuous D10W infusion at GIR 6-8 mg/kg/min; titrate to maintain glucose 45-60 mg/dL",
      "Advance to D12.5% or higher concentration via central access if peripheral GIR is insufficient (GIR >12 mg/kg/min suggests hyperinsulinism workup needed)",
      "For persistent hypoglycemia >48 hours despite GIR >12-15: consider diazoxide 5-15 mg/kg/day PO divided BID-TID (opens KATP channels to suppress insulin release)",
      "Prescribe calcium gluconate 10% IV 100-200 mg/kg (1-2 mL/kg) over 10-30 minutes with cardiac monitoring for symptomatic hypocalcemia",
      "Manage polycythemia: IV hydration for asymptomatic Hct 65-70%; partial exchange transfusion with normal saline for symptomatic Hct >70%",
      "Order phototherapy per AAP guidelines for hyperbilirubinemia; consider intensive phototherapy if approaching exchange transfusion thresholds",
      "Manage RDS: surfactant replacement therapy for confirmed surfactant deficiency; CPAP or mechanical ventilation as indicated"
    ],
    nursingActions: [
      "Develop and implement unit-based hypoglycemia management algorithm with clear thresholds for feeding vs. IV intervention",
      "Calculate and verify GIR at each infusion rate change: GIR = (% dextrose × rate mL/hr) / (6 × weight kg)",
      "Order critical sample during hypoglycemia episode if persistent: insulin, cortisol, growth hormone, C-peptide, free fatty acids, beta-hydroxybutyrate",
      "Screen for congenital heart disease: pre- and post-ductal pulse oximetry, auscultation, CXR if indicated",
      "Assess for caudal regression syndrome (lumbosacral agenesis) in IDMs of poorly controlled type 1 diabetic mothers",
      "Coordinate lactation consultation for breastfeeding support and supplemental feeding plan",
      "Plan follow-up: glucose monitoring beyond discharge if needed, bilirubin recheck, cardiac follow-up if cardiomyopathy identified",
      "Counsel parents on long-term metabolic risks for IDMs: childhood obesity, insulin resistance, type 2 diabetes"
    ],
    signs: {
      left: [
        "Macrosomia with organomegaly (cardiomegaly, hepatomegaly)",
        "Cushingoid facies with increased subcutaneous fat",
        "Plethoric appearance (polycythemia)",
        "Birth injuries: Erb palsy, clavicle fracture",
        "Hypertrophic interventricular septum on echo",
        "Congenital anomalies (cardiac, neural tube, renal, caudal regression)"
      ],
      right: [
        "Hypoglycemia: jitteriness, tremors, apnea, seizures, coma",
        "Hypocalcemia: jitteriness, tetany, prolonged QTc, seizures",
        "Respiratory distress syndrome: tachypnea, grunting, retractions, cyanosis",
        "Polycythemia/hyperviscosity: plethora, poor feeding, respiratory distress, hyperbilirubinemia",
        "Hypertrophic cardiomyopathy: poor feeding, tachypnea, systolic murmur, outflow obstruction",
        "Renal vein thrombosis (from polycythemia): hematuria, flank mass, thrombocytopenia"
      ]
    },
    medications: [
      { name: "Dextrose 10% IV (D10W)", type: "Glucose replacement", action: "Provides continuous exogenous glucose to overcome hyperinsulinism-driven hypoglycemia", sideEffects: "Rebound hypoglycemia if weaned too rapidly, peripheral line infiltration, osmotic injury with concentrations >12.5% via peripheral IV", contra: "None (emergency treatment for neonatal hypoglycemia)", pearl: "Bolus 2 mL/kg D10W delivers 200 mg/kg glucose. Start GIR 6-8 mg/kg/min. If GIR >12 mg/kg/min required, obtain central access and initiate hyperinsulinism workup. Wean by 1-2 mg/kg/min every 6-12 hours." },
      { name: "Diazoxide", type: "Potassium channel opener", action: "Opens ATP-sensitive potassium channels on pancreatic beta cells, suppressing insulin secretion", sideEffects: "Fluid retention, hypertrichosis, hyperuricemia, hyperglycemia", contra: "Functional hypoglycemia, allergy to thiazide diuretics", pearl: "Used for persistent hyperinsulinemic hypoglycemia unresponsive to IV glucose (GIR >15 mg/kg/min). Dose: 5-15 mg/kg/day divided BID-TID. Often combined with chlorothiazide to offset fluid retention. Response confirms KATP-sensitive mechanism." },
      { name: "Calcium Gluconate 10%", type: "Electrolyte replacement", action: "Replaces ionized calcium in neonatal hypocalcemia due to functional hypoparathyroidism", sideEffects: "Bradycardia (administer slowly with cardiac monitoring), tissue necrosis with extravasation, arrhythmias", contra: "Digoxin use (potentiates toxicity), hypercalcemia", pearl: "Dose: 100-200 mg/kg (1-2 mL/kg of 10% solution) IV slow push over 10-30 minutes. Continuous cardiac monitoring mandatory. Stop infusion for HR <100 bpm. Do not mix with sodium bicarbonate (precipitates)." },
      { name: "Surfactant (Beractant)", type: "Lung surfactant replacement", action: "Replaces deficient endogenous surfactant in alveoli, reducing surface tension and preventing alveolar collapse", sideEffects: "Transient oxygen desaturation, bradycardia during administration, pulmonary hemorrhage", contra: "None (lifesaving for neonatal RDS)", pearl: "IDMs may require surfactant even at term gestation due to insulin-mediated suppression of surfactant production. Administer via endotracheal tube. Response should be rapid with improved compliance and oxygenation." }
    ],
    pearls: [
      "The Pedersen hypothesis: maternal hyperglycemia → fetal hyperglycemia → fetal hyperinsulinism → macrosomia, organomegaly, and metabolic complications",
      "GIR requirement >12-15 mg/kg/min strongly suggests persistent hyperinsulinism requiring further workup (critical sample, genetic testing for KATP channel mutations)",
      "Caudal regression syndrome (sacral agenesis) is the most specific congenital anomaly associated with maternal diabetes, though rare",
      "Hypertrophic cardiomyopathy in IDMs is transient and usually resolves within 2-4 weeks as insulin levels normalize; avoid inotropes (may worsen outflow obstruction)",
      "IDMs have long-term metabolic programming: increased risk of childhood obesity, metabolic syndrome, and type 2 diabetes; counsel parents about healthy lifestyle practices"
    ],
    quiz: [
      { question: "An IDM requires a GIR of 16 mg/kg/min to maintain normoglycemia at 36 hours of life. The NP should:", options: ["Continue current management and observe", "Obtain a critical sample (insulin, C-peptide, cortisol, FFA) and initiate hyperinsulinism workup", "Increase enteral feeds and wean IV glucose", "Switch to D5W to reduce glucose delivery"], correct: 1, rationale: "GIR requirement >12-15 mg/kg/min beyond 48 hours is abnormal and suggests persistent hyperinsulinemic hypoglycemia requiring a critical sample during hypoglycemia and evaluation for congenital hyperinsulinism (KATP channel mutations)." },
      { question: "Which congenital anomaly is most specifically associated with poorly controlled maternal diabetes?", options: ["Cleft lip and palate", "Caudal regression syndrome", "Down syndrome", "Pyloric stenosis"], correct: 1, rationale: "Caudal regression syndrome (sacral agenesis) is the most specific congenital anomaly associated with maternal diabetes, though it is rare. The risk of congenital anomalies is directly proportional to the degree of hyperglycemia during organogenesis (first trimester HbA1c)." },
      { question: "An IDM develops hypertrophic cardiomyopathy with left ventricular outflow tract obstruction. Why should inotropes be avoided?", options: ["They are not available in neonatal formulations", "Increased contractility worsens dynamic outflow obstruction", "They cause hyperglycemia in neonates", "They are contraindicated with phototherapy"], correct: 1, rationale: "In hypertrophic cardiomyopathy with outflow obstruction, inotropic agents increase contractility and worsen the dynamic obstruction. Management is supportive with volume expansion and beta-blockers if symptomatic. The condition is transient and resolves as insulin levels normalize." }
    ]
  }
};
