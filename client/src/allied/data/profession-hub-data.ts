export interface ProfessionFAQ {
  q: string;
  a: string;
}

export interface CrossLink {
  label: string;
  href: string;
  description: string;
}

export interface ProfessionHubData {
  professionSlug: string;
  careerSlug: string;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  colorAccent: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonicalPath: string;
  };
  examInfo: {
    examNames: string[];
    examDescription: string;
    examFormat: string;
    certifyingBodies: string[];
  };
  careerDescription: string;
  salaryRange: string;
  jobOutlook: string;
  domains: string[];
  studyFeatures: { label: string; description: string }[];
  faqs: ProfessionFAQ[];
  crossLinks: CrossLink[];
  contentClusterBase: string;
}

export const PROFESSION_HUB_DATA: Record<string, ProfessionHubData> = {
  rrt: {
    professionSlug: "rrt",
    careerSlug: "rrt",
    name: "Registered Respiratory Therapist",
    shortName: "RRT",
    tagline: "Master ventilator management, ABG analysis, and airway management for NBRC TMC & CSE certification.",
    color: "#2196F3",
    colorAccent: "#E3F2FD",
    seo: {
      title: "RRT Exam Prep — Respiratory Therapy NBRC TMC & CSE | NurseNest Allied",
      description: "Prepare for your respiratory therapy certification with adaptive practice questions, ventilator simulators, ABG interpretation tools, and blueprint-weighted mock exams for NBRC TMC and CSE.",
      keywords: "RRT exam prep, respiratory therapy exam, NBRC TMC practice questions, respiratory therapist study guide, RRT mock exam, CSE exam prep, ventilator management, ABG interpretation, respiratory therapy certification, CBRC exam",
      canonicalPath: "/rrt",
    },
    examInfo: {
      examNames: ["NBRC TMC", "NBRC CSE", "CBRC"],
      examDescription: "The Therapist Multiple-Choice (TMC) Examination and Clinical Simulation Exam (CSE) are administered by the National Board for Respiratory Care (NBRC). In Canada, the CBRC exam is the pathway to respiratory therapy licensure.",
      examFormat: "The TMC is a 160-question multiple-choice exam (100 scored + 60 pretest) with a 3-hour time limit. The CSE consists of clinical simulation scenarios testing clinical decision-making in patient management.",
      certifyingBodies: ["NBRC (National Board for Respiratory Care)", "CBRC (Canadian Board for Respiratory Care)"],
    },
    careerDescription: "Respiratory Therapists (RTs) are healthcare professionals who specialize in cardiopulmonary care. They work in hospitals, ICUs, emergency departments, sleep labs, and home health settings. RTs manage ventilators, administer breathing treatments, perform ABG analysis, assist with intubations, and provide life-saving interventions for patients with respiratory failure, COPD, asthma, and other pulmonary conditions.",
    salaryRange: "$62,000 – $85,000 USD / $58,000 – $78,000 CAD",
    jobOutlook: "14% growth projected through 2032 (much faster than average)",
    domains: [
      "Airway Management",
      "Oxygen Therapy",
      "ABG Interpretation",
      "Mechanical Ventilation",
      "Pulmonary Function Testing",
      "Neonatal & Pediatric Respiratory Care",
      "Critical Care Respiratory Therapy",
      "Cardiopulmonary Physiology",
      "Aerosol & Medication Delivery",
      "Sleep & Noninvasive Ventilation",
      "Emergency Respiratory Care",
      "Patient Assessment",
      "Infection Control & Equipment",
    ],
    studyFeatures: [
      { label: "Adaptive Question Bank", description: "500+ respiratory therapy questions with 600+ word clinical rationales covering all NBRC domains." },
      { label: "ABG Interpretation Engine", description: "Practice unlimited ABG analysis with instant AI feedback on acid-base disorders and compensation." },
      { label: "Ventilator Mode Simulator", description: "Interactive ventilator settings, waveform analysis, and troubleshooting scenarios." },
      { label: "Blueprint-Weighted Mock Exams", description: "Full-length TMC simulations with adaptive difficulty and domain-level scoring." },
      { label: "Spaced Repetition Flashcards", description: "Master ventilator settings, drug dosages, and pulmonary function values with adaptive flashcards." },
      { label: "Clinical Simulation Scenarios", description: "Unfolding CSE-style cases testing clinical decision-making from assessment to outcome." },
    ],
    faqs: [
      { q: "What is the NBRC TMC exam?", a: "The Therapist Multiple-Choice (TMC) Examination is the primary certification exam for respiratory therapists in the United States. It consists of 160 questions (100 scored, 60 pretest) covering patient data evaluation, equipment manipulation, therapeutic procedures, and clinical judgment. Passing at the high cut-score earns the RRT credential." },
      { q: "How is the CSE different from the TMC?", a: "The Clinical Simulation Exam (CSE) tests clinical decision-making through branching patient scenarios. You manage patients from initial assessment through treatment, monitoring, and outcome evaluation. It evaluates your ability to apply knowledge in realistic clinical situations — not just recall facts." },
      { q: "What topics are covered on the respiratory therapy exam?", a: "The NBRC exams cover airway management, ventilator management (all modes including AC, SIMV, PSV, APRV), ABG interpretation, oxygen therapy, pulmonary function testing, neonatal/pediatric respiratory care, pharmacology, patient assessment, and emergency procedures." },
      { q: "How should I prepare for the NBRC TMC?", a: "Start with a diagnostic assessment to identify your weak domains. Then use targeted practice questions with detailed rationales, ventilator and ABG simulators for hands-on practice, and blueprint-weighted mock exams to simulate test-day conditions. Most students study 6-10 weeks before their exam." },
      { q: "Do you cover Canadian respiratory therapy exams?", a: "Yes. We include content aligned with the CBRC (Canadian Board for Respiratory Care) exam, including Canadian respiratory therapy regulations, scope of practice, and clinical standards." },
      { q: "Is there a free trial?", a: "Yes! Take our free 15-question diagnostic to assess your readiness across all respiratory therapy domains. You also get 5 free practice questions with full rationales to experience the depth of our content." },
    ],
    crossLinks: [
      { label: "Paramedic Airway Management", href: "/paramedic", description: "Related airway management and ventilation content for paramedic students" },
      { label: "Critical Care Nursing (CCRN)", href: "/critical-care", description: "ICU nursing certification covering ventilator management and hemodynamic monitoring" },
      { label: "Emergency Nursing (CEN)", href: "/emergency-nursing", description: "Emergency department nursing certification with respiratory emergency content" },
    ],
    contentClusterBase: "/rrt",
  },

  "social-work": {
    professionSlug: "social-work",
    careerSlug: "social-worker",
    name: "Licensed Clinical Social Worker",
    shortName: "Social Work",
    tagline: "Master clinical practice, DSM-5 diagnosis, and evidence-based interventions for ASWB licensing exams.",
    color: "#00ACC1",
    colorAccent: "#E0F7FA",
    seo: {
      title: "Social Work Exam Prep — ASWB Clinical, Masters & Advanced | NurseNest Allied",
      description: "Prepare for ASWB Clinical, Masters, and Advanced Generalist licensing exams with practice questions, DSM-5 case studies, intervention matching, and ethics scenario drills.",
      keywords: "social work exam prep, ASWB practice questions, LCSW exam prep, social work licensing exam, ASWB clinical exam, MSW exam prep, social work mock exam, DSM-5 practice, social work study guide, ASWB masters exam",
      canonicalPath: "/social-work",
    },
    examInfo: {
      examNames: ["ASWB Clinical", "ASWB Masters", "ASWB Advanced Generalist"],
      examDescription: "The Association of Social Work Boards (ASWB) administers licensing exams at four levels: Bachelors, Masters, Advanced Generalist, and Clinical. Each exam tests competency in human development, assessment, intervention, ethics, and professional practice.",
      examFormat: "Each ASWB exam consists of 170 multiple-choice questions (150 scored + 20 pretest) with a 4-hour time limit. Questions are scenario-based, testing application of social work knowledge to clinical situations.",
      certifyingBodies: ["ASWB (Association of Social Work Boards)", "State Social Work Licensing Boards"],
    },
    careerDescription: "Licensed Clinical Social Workers (LCSWs) provide mental health services including psychotherapy, crisis intervention, case management, and advocacy. They work in hospitals, community mental health centers, private practice, schools, and government agencies. Social workers address individual, family, and community challenges including mental illness, substance abuse, child welfare, aging, and social justice issues.",
    salaryRange: "$50,000 – $82,000 USD / $52,000 – $85,000 CAD",
    jobOutlook: "7% growth projected through 2032 (faster than average)",
    domains: [
      "Human Behavior & Development",
      "Assessment & Diagnosis",
      "Intervention & Treatment Planning",
      "Ethics & Professional Practice",
      "Community Resources",
      "Crisis Intervention",
    ],
    studyFeatures: [
      { label: "Adaptive Question Bank", description: "500+ ASWB-aligned questions with detailed clinical rationales covering all exam content areas." },
      { label: "DSM-5 Diagnosis Simulator", description: "Practice differential diagnosis using DSM-5 criteria with realistic case vignettes." },
      { label: "Intervention Matching Engine", description: "Match evidence-based interventions (CBT, DBT, MI, EMDR) to client presentations." },
      { label: "Ethics Scenario Drills", description: "Navigate complex ethical dilemmas in social work practice with NASW Code of Ethics alignment." },
      { label: "Blueprint-Weighted Mock Exams", description: "Full-length ASWB simulations with domain-level scoring and performance analytics." },
      { label: "Personalized Study Plan", description: "Adaptive daily study schedule targeting your weakest content areas first." },
    ],
    faqs: [
      { q: "What ASWB exam levels do you cover?", a: "We cover all four ASWB exam levels: Bachelors, Masters, Advanced Generalist, and Clinical. Content is organized by exam level so you study exactly what's tested at your certification stage." },
      { q: "How are the questions different from other social work prep?", a: "Each question includes a detailed clinical rationale explaining the social work reasoning — not just which answer is correct. We cover DSM-5 diagnosis, evidence-based interventions, ethical decision-making, and cultural competence in depth." },
      { q: "Do you cover DSM-5 content?", a: "Extensively. Our DSM-5 Diagnosis Simulator presents realistic client vignettes and teaches you to apply diagnostic criteria, differential diagnosis, and rule-out processes — exactly as tested on the ASWB Clinical exam." },
      { q: "How does the ethics preparation work?", a: "Our ethics scenario drills present complex ethical dilemmas aligned with the NASW Code of Ethics. You practice navigating dual relationships, confidentiality conflicts, duty to warn, informed consent, and professional boundaries." },
      { q: "Is there a free trial?", a: "Yes! Take a free diagnostic assessment to identify your strengths and gaps across all ASWB content areas, plus access 5 free practice questions with full rationales." },
      { q: "How long should I study for the ASWB exam?", a: "Most students study 8-12 weeks before their ASWB exam. Our personalized study planner creates an optimized schedule based on your diagnostic results, exam date, and available study time." },
    ],
    crossLinks: [
      { label: "Psychotherapy Exam Prep", href: "/psychotherapy", description: "Related therapeutic modality content for registered psychotherapists" },
      { label: "Addictions Counselling", href: "/addictions", description: "Substance use disorders, motivational interviewing, and co-occurring disorders" },
      { label: "Mental Health Nursing", href: "/nursing", description: "Psychiatric nursing content with DSM-5 and therapeutic communication" },
    ],
    contentClusterBase: "/social-work",
  },

  psychotherapy: {
    professionSlug: "psychotherapy",
    careerSlug: "psychotherapist",
    name: "Registered Psychotherapist",
    shortName: "Psychotherapy",
    tagline: "Master therapeutic modalities, clinical ethics, and psychopathology for RP qualifying and counselor certification exams.",
    color: "#5C6BC0",
    colorAccent: "#E8EAF6",
    seo: {
      title: "Psychotherapy Exam Prep — CRPO, NCE & Counseling Certification | NurseNest Allied",
      description: "Prepare for the CRPO Registration Exam, National Counselor Examination (NCE), and counseling certification with practice questions, therapeutic modality simulations, and ethics scenario drills.",
      keywords: "psychotherapy exam prep, CRPO registration exam, registered psychotherapist exam, NCE practice questions, counseling certification, psychotherapy study guide, therapeutic modalities, clinical mental health counseling exam, psychotherapy mock exam",
      canonicalPath: "/psychotherapy",
    },
    examInfo: {
      examNames: ["CRPO Registration Exam", "RP Qualifying Exam", "NCE", "CMHCE", "CCC Exam"],
      examDescription: "In Canada, the College of Registered Psychotherapists of Ontario (CRPO) Registration Exam tests competency in therapeutic practice, ethics, and professional standards. In the US, the National Counselor Examination (NCE) and Clinical Mental Health Counseling Examination (CMHCE) are pathways to licensure.",
      examFormat: "The CRPO exam uses a competency-based multiple-choice format testing clinical judgment, therapeutic application, and ethical decision-making. The NCE consists of 200 questions (160 scored) covering 8 content areas with a 3-hour 45-minute time limit.",
      certifyingBodies: ["CRPO (College of Registered Psychotherapists of Ontario)", "NBCC (National Board for Certified Counselors)", "CCPA (Canadian Counselling and Psychotherapy Association)"],
    },
    careerDescription: "Registered Psychotherapists (RPs) and Licensed Professional Counselors (LPCs) provide psychotherapy and counseling services for individuals, couples, families, and groups. They treat anxiety, depression, trauma, relationship issues, grief, and other mental health conditions using evidence-based modalities including CBT, DBT, EMDR, psychodynamic therapy, and person-centered approaches.",
    salaryRange: "$48,000 – $80,000 USD / $50,000 – $82,000 CAD",
    jobOutlook: "18% growth projected through 2032 (much faster than average)",
    domains: [
      "Therapeutic Modalities",
      "Psychopathology",
      "Assessment and Diagnosis",
      "Ethics and Boundaries",
      "Treatment Planning",
      "Crisis Intervention",
    ],
    studyFeatures: [
      { label: "Adaptive Question Bank", description: "500+ exam-aligned questions covering therapeutic modalities, psychopathology, ethics, and clinical practice." },
      { label: "Therapeutic Modality Simulator", description: "Practice applying CBT, DBT, EMDR, motivational interviewing, and other modalities to case vignettes." },
      { label: "Ethics Scenario Drills", description: "Navigate ethical dilemmas in psychotherapy practice — dual relationships, confidentiality, informed consent, and duty to report." },
      { label: "DSM-5 Case Studies", description: "Practice diagnostic formulation with realistic client presentations and differential diagnosis." },
      { label: "Blueprint-Weighted Mock Exams", description: "Full-length exam simulations for CRPO, NCE, and CMHCE with domain-level analytics." },
      { label: "Spaced Repetition Flashcards", description: "Master therapeutic techniques, ethical principles, and psychopathology criteria with adaptive flashcards." },
    ],
    faqs: [
      { q: "What exams do you prepare for?", a: "We cover the CRPO Registration Exam (Canada/Ontario), the National Counselor Examination (NCE), the Clinical Mental Health Counseling Examination (CMHCE), and the Canadian Certified Counsellor (CCC) Exam. Content adapts to your target certification." },
      { q: "What therapeutic modalities are covered?", a: "We cover all major evidence-based modalities: Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Eye Movement Desensitization and Reprocessing (EMDR), Motivational Interviewing (MI), Psychodynamic Therapy, Person-Centered Therapy, Solution-Focused Brief Therapy, Narrative Therapy, and Emotion-Focused Therapy." },
      { q: "How does the ethics preparation work?", a: "Our ethics drills present complex scenarios aligned with the CRPO Professional Practice Standards and NBCC Code of Ethics. You practice managing dual relationships, confidentiality conflicts, informed consent, mandatory reporting, and professional boundaries." },
      { q: "Do you cover DSM-5 diagnosis?", a: "Yes. Our case studies present realistic client presentations where you practice applying DSM-5 diagnostic criteria, differential diagnosis, and clinical formulation — essential skills for both the CRPO and NCE exams." },
      { q: "Is there a free trial?", a: "Yes! Take a free diagnostic assessment to evaluate your readiness across all exam content areas, plus access 5 free practice questions with detailed rationales." },
      { q: "How long should I study for the CRPO exam?", a: "Most students study 8-12 weeks. Our personalized study planner creates an adaptive schedule based on your diagnostic results, exam date, and available study hours." },
    ],
    crossLinks: [
      { label: "Social Work Exam Prep", href: "/social-work", description: "Related clinical assessment and intervention content for social workers" },
      { label: "Addictions Counselling", href: "/addictions", description: "Substance use disorders, motivational interviewing, and dual diagnosis" },
      { label: "Mental Health Nursing", href: "/nursing", description: "Psychiatric nursing content with therapeutic communication and psychopharmacology" },
    ],
    contentClusterBase: "/psychotherapy",
  },

  addictions: {
    professionSlug: "addictions",
    careerSlug: "addictions-counsellor",
    name: "Addictions Counsellor Certification",
    shortName: "Addictions",
    tagline: "Master substance use assessment, motivational interviewing, and relapse prevention for addiction counselor certification.",
    color: "#558B2F",
    colorAccent: "#DCEDC8",
    seo: {
      title: "Addictions Counsellor Exam Prep — IC&RC, CASAC & CCAC Certification | NurseNest Allied",
      description: "Prepare for addiction counselor certification with practice questions, motivational interviewing simulations, substance identification drills, and co-occurring disorders case studies for IC&RC ADC, CASAC, and CCAC exams.",
      keywords: "addictions counsellor exam prep, IC&RC ADC exam, CASAC certification, addiction counselor practice questions, substance abuse counselor exam, CCAC exam prep, motivational interviewing, relapse prevention, addictions study guide, substance use disorders",
      canonicalPath: "/addictions",
    },
    examInfo: {
      examNames: ["IC&RC ADC", "CASAC", "CCAC"],
      examDescription: "The IC&RC Alcohol and Drug Counselor (ADC) exam is the international standard for addiction counselor certification. State-specific exams like CASAC (New York) and provincial exams like CCAC (Canada) follow similar competency frameworks covering screening, assessment, treatment planning, counseling, and professional ethics.",
      examFormat: "The IC&RC ADC exam consists of 150 multiple-choice questions with a 3-hour time limit, covering 8 performance domains: screening, intake, orientation, assessment, treatment planning, counseling, case management, crisis intervention, client education, referral, reports & recordkeeping, and professional & ethical responsibilities.",
      certifyingBodies: ["IC&RC (International Certification & Reciprocity Consortium)", "OASAS/CASAC (New York)", "CCAC/CACCF (Canada)"],
    },
    careerDescription: "Addictions Counsellors help individuals and families affected by substance use disorders and behavioral addictions. They conduct assessments, develop treatment plans, facilitate individual and group counseling, implement relapse prevention strategies, and coordinate care with other healthcare providers. They work in treatment centers, hospitals, community health agencies, correctional facilities, and private practice.",
    salaryRange: "$38,000 – $62,000 USD / $42,000 – $68,000 CAD",
    jobOutlook: "18% growth projected through 2032 (much faster than average due to opioid crisis response)",
    domains: [
      "Pharmacology of Substances",
      "Assessment/Screening",
      "Treatment Planning",
      "Counseling Approaches",
      "Relapse Prevention",
      "Co-occurring Disorders",
      "Ethics/Professional Practice",
      "Cultural Competence",
      "Group Counseling",
      "Crisis Intervention",
    ],
    studyFeatures: [
      { label: "Adaptive Question Bank", description: "500+ exam-aligned questions with detailed rationales covering all addiction counseling domains." },
      { label: "Motivational Interviewing Simulator", description: "Practice MI techniques with AI-generated client responses — OARS, rolling with resistance, developing discrepancy." },
      { label: "Substance Identification Drill", description: "Identify substances, mechanisms of action, intoxication/withdrawal patterns, and pharmacological treatments." },
      { label: "Co-occurring Disorders Cases", description: "Practice integrated assessment and treatment planning for clients with dual diagnosis (mental health + substance use)." },
      { label: "Blueprint-Weighted Mock Exams", description: "Full-length IC&RC ADC simulations with domain-level scoring and performance analytics." },
      { label: "Relapse Prevention Planning", description: "Build comprehensive relapse prevention plans using evidence-based models (Gorski, Marlatt)." },
    ],
    faqs: [
      { q: "What addiction counselor exams do you cover?", a: "We cover the IC&RC ADC (international standard), CASAC (New York), CCAC (Canada), and other state/provincial addiction counselor certification exams. Content is organized around the 8 IC&RC performance domains that most jurisdictions follow." },
      { q: "How are the questions different from other prep materials?", a: "Each question includes a detailed clinical rationale explaining the addiction counseling reasoning — covering pharmacology, screening tools (CAGE, AUDIT, DAST), treatment modalities, motivational interviewing principles, and ethical decision-making." },
      { q: "Do you cover motivational interviewing (MI)?", a: "Extensively. Our MI Simulator lets you practice OARS techniques (Open questions, Affirmations, Reflective listening, Summarizing), rolling with resistance, developing discrepancy, and supporting self-efficacy through interactive client scenarios." },
      { q: "What about co-occurring disorders?", a: "We include comprehensive content on dual diagnosis — integrated assessment, treatment planning for co-occurring mental health and substance use disorders, medication-assisted treatment (MAT), and coordination with mental health providers." },
      { q: "Is there a free trial?", a: "Yes! Take a free diagnostic assessment to identify your strengths and gaps across all addiction counseling domains, plus access 5 free practice questions with detailed rationales." },
      { q: "How long should I study for the IC&RC ADC exam?", a: "Most students study 6-10 weeks before their certification exam. Our personalized study planner creates an adaptive schedule based on your diagnostic results and exam date." },
    ],
    crossLinks: [
      { label: "Social Work Exam Prep", href: "/social-work", description: "Clinical social work with substance abuse assessment and intervention" },
      { label: "Psychotherapy Exam Prep", href: "/psychotherapy", description: "Therapeutic modalities including MI, CBT, and trauma-informed care" },
      { label: "Mental Health Nursing", href: "/nursing", description: "Psychiatric nursing with substance use disorder content" },
    ],
    contentClusterBase: "/addictions",
  },

  "occupational-therapy": {
    professionSlug: "occupational-therapy",
    careerSlug: "occupational-therapy",
    name: "Occupational Therapy Certification",
    shortName: "Occupational Therapy",
    tagline: "Master evaluation, intervention planning, and professional practice for NBCOT OTR and NOTCE licensing exams.",
    color: "#6A1B9A",
    colorAccent: "#E1BEE7",
    seo: {
      title: "Occupational Therapy Exam Prep — NBCOT OTR & NOTCE Certification | NurseNest Allied",
      description: "Prepare for NBCOT OTR and NOTCE occupational therapy licensing exams with practice questions, case analysis simulations, SMART goal writing tools, and comprehensive domain coverage.",
      keywords: "occupational therapy exam prep, NBCOT OTR practice questions, OT licensing exam, occupational therapy study guide, NOTCE exam prep, OT mock exam, occupational therapy certification, OTR exam, COTO exam prep, occupational therapy flashcards",
      canonicalPath: "/occupational-therapy",
    },
    examInfo: {
      examNames: ["NBCOT OTR", "NOTCE"],
      examDescription: "The NBCOT OTR (National Board for Certification in Occupational Therapy) exam is the primary US licensing exam for occupational therapists. In Canada, the NOTCE (National Occupational Therapy Certification Examination) administered by CAOT is the pathway to provincial registration.",
      examFormat: "The NBCOT OTR exam consists of 200 questions (170 scored + 30 pretest) including multiple-choice and clinical simulation test items, with a 4-hour time limit. The exam tests evaluation, intervention planning, professional practice, and clinical reasoning across practice settings.",
      certifyingBodies: ["NBCOT (National Board for Certification in Occupational Therapy)", "CAOT (Canadian Association of Occupational Therapists)", "State/Provincial OT Regulatory Boards"],
    },
    careerDescription: "Occupational Therapists (OTs) help people across the lifespan participate in meaningful activities (occupations) despite physical, cognitive, developmental, or psychosocial challenges. They evaluate functional abilities, design intervention plans, recommend adaptive equipment, and modify environments to promote independence. OTs work in hospitals, rehabilitation centers, schools, community health agencies, and private practice.",
    salaryRange: "$72,000 – $100,000 USD / $65,000 – $95,000 CAD",
    jobOutlook: "12% growth projected through 2032 (much faster than average)",
    domains: [
      "Evaluation & Assessment",
      "Intervention Planning & Implementation",
      "Professional Practice & Ethics",
      "Psychosocial & Mental Health",
      "Pediatrics & Development",
      "ADL/IADL Performance",
      "Cognitive Rehabilitation",
      "Assistive Technology",
      "Documentation & Reimbursement",
      "Evidence-Based Practice",
    ],
    studyFeatures: [
      { label: "Adaptive Question Bank", description: "500+ NBCOT-aligned questions with detailed clinical rationales covering all OT practice domains." },
      { label: "Case Analysis Simulator", description: "Practice clinical reasoning with OT-specific patient vignettes across pediatric, adult, and geriatric populations." },
      { label: "SMART Goal Writer", description: "Practice writing measurable, occupation-focused treatment goals for OT interventions." },
      { label: "Activity Analysis Tool", description: "Break down activities into component skills and grade interventions for therapeutic benefit." },
      { label: "Blueprint-Weighted Mock Exams", description: "Full-length NBCOT OTR simulations with domain-level scoring and clinical simulation items." },
      { label: "Spaced Repetition Flashcards", description: "Master assessment tools, frames of reference, intervention techniques, and developmental milestones." },
    ],
    faqs: [
      { q: "What OT exams do you cover?", a: "We cover the NBCOT OTR exam (United States) and the NOTCE exam (Canada). Content is organized to cover both exam blueprints, with country-specific regulatory and practice standards." },
      { q: "How are the questions different from other OT prep?", a: "Each question includes a detailed clinical rationale explaining the occupational therapy reasoning — not just which answer is correct. We cover evaluation, intervention planning, clinical reasoning, and professional practice in depth." },
      { q: "Do you cover pediatric OT content?", a: "Yes. We include comprehensive pediatric content covering developmental milestones, sensory processing, school-based OT, early intervention, play-based assessment, and pediatric intervention techniques." },
      { q: "What about mental health OT?", a: "Our content covers psychosocial OT including group dynamics, therapeutic use of self, coping skills training, cognitive behavioral approaches, and occupation-based mental health interventions." },
      { q: "Is there a free trial?", a: "Yes! Take a free diagnostic assessment to identify your strengths and gaps across all OT content areas, plus access 5 free practice questions with full clinical rationales." },
      { q: "How long should I study for the NBCOT exam?", a: "Most students study 8-12 weeks before the NBCOT OTR exam. Our personalized study planner creates an adaptive schedule based on your diagnostic results, exam date, and available study time." },
    ],
    crossLinks: [
      { label: "Physical Therapy Exam Prep", href: "/physical-therapy", description: "Related rehabilitation content for physical therapists" },
      { label: "Psychotherapy & Mental Health", href: "/psychotherapy", description: "Therapeutic modalities and mental health assessment" },
      { label: "Pediatric Nursing (CPN)", href: "/pediatric-cert", description: "Pediatric development and family-centered care" },
    ],
    contentClusterBase: "/occupational-therapy",
  },

  "physical-therapy": {
    professionSlug: "physical-therapy",
    careerSlug: "physical-therapy",
    name: "Physical Therapy Certification",
    shortName: "Physical Therapy",
    tagline: "Master musculoskeletal, neuromuscular, and cardiopulmonary systems for NPTE and PCE licensing exams.",
    color: "#00695C",
    colorAccent: "#B2DFDB",
    seo: {
      title: "Physical Therapy Exam Prep — NPTE & PCE Certification | NurseNest Allied",
      description: "Prepare for NPTE and PCE physical therapy licensing exams with practice questions, differential diagnosis training, gait analysis tools, and comprehensive domain coverage.",
      keywords: "physical therapy exam prep, NPTE practice questions, PT licensing exam, physical therapy study guide, PCE exam prep, PT mock exam, physical therapy certification, physiotherapy exam, FSBPT exam prep, physical therapy flashcards",
      canonicalPath: "/physical-therapy",
    },
    examInfo: {
      examNames: ["NPTE", "PCE"],
      examDescription: "The NPTE (National Physical Therapy Examination) is the primary US licensing exam for physical therapists, administered by the FSBPT. In Canada, the PCE (Physiotherapy Competency Examination) administered by CAPR is the pathway to provincial registration.",
      examFormat: "The NPTE consists of 250 questions (200 scored + 50 pretest) with a 5-hour time limit. The exam covers musculoskeletal, neuromuscular, cardiopulmonary, integumentary systems, and non-system/professional responsibilities.",
      certifyingBodies: ["FSBPT (Federation of State Boards of Physical Therapy)", "CAPR (Canadian Alliance of Physiotherapy Regulators)", "State/Provincial PT Regulatory Boards"],
    },
    careerDescription: "Physical Therapists (PTs) are healthcare professionals who help patients improve movement, manage pain, and restore function after injury, surgery, or illness. They perform evaluations, design exercise programs, apply manual therapy techniques, and educate patients on injury prevention. PTs work in hospitals, outpatient clinics, sports medicine facilities, home health agencies, schools, and private practice.",
    salaryRange: "$76,000 – $105,000 USD / $68,000 – $98,000 CAD",
    jobOutlook: "15% growth projected through 2032 (much faster than average)",
    domains: [
      "Musculoskeletal",
      "Neuromuscular",
      "Cardiopulmonary",
      "Integumentary",
      "Non-System/Professional Responsibilities",
      "Biomechanics & Kinesiology",
      "Therapeutic Exercise",
      "Patient Education",
      "Discharge Planning",
      "Evidence-Based Practice",
    ],
    studyFeatures: [
      { label: "Adaptive Question Bank", description: "500+ NPTE-aligned questions with detailed clinical rationales covering all PT system domains." },
      { label: "Differential Diagnosis Trainer", description: "Practice differential diagnosis with realistic patient presentations across musculoskeletal and neurological conditions." },
      { label: "Gait Analysis Simulator", description: "Analyze gait patterns, identify deviations, and correlate findings with clinical diagnoses." },
      { label: "Manual Therapy Reference", description: "Interactive guide to joint mobilization grades, soft tissue techniques, and therapeutic interventions." },
      { label: "Blueprint-Weighted Mock Exams", description: "Full-length NPTE simulations with system-level scoring and performance analytics." },
      { label: "Spaced Repetition Flashcards", description: "Master anatomy, special tests, exercise progressions, and clinical outcome measures." },
    ],
    faqs: [
      { q: "What PT exams do you cover?", a: "We cover the NPTE (United States) and the PCE (Canada). Content is organized to cover both exam blueprints, with country-specific clinical standards and regulatory requirements." },
      { q: "How are the questions different from other PT prep?", a: "Each question includes a detailed clinical rationale explaining the physical therapy reasoning — not just which answer is correct. We cover evaluation, differential diagnosis, intervention selection, and professional practice in depth." },
      { q: "Do you cover neurological PT content?", a: "Yes. We include comprehensive neurological content covering stroke rehabilitation, spinal cord injury management, traumatic brain injury, Parkinson's disease, multiple sclerosis, and neurodevelopmental treatment approaches." },
      { q: "What about sports rehabilitation?", a: "Our content covers sports injury rehabilitation including ACL reconstruction protocols, rotator cuff repair rehab, concussion management, return-to-sport testing, and sport-specific exercise progressions." },
      { q: "Is there a free trial?", a: "Yes! Take a free diagnostic assessment to identify your strengths and gaps across all PT content areas, plus access 5 free practice questions with full clinical rationales." },
      { q: "How long should I study for the NPTE?", a: "Most students study 8-12 weeks before the NPTE. Our personalized study planner creates an adaptive schedule based on your diagnostic results, exam date, and available study time." },
    ],
    crossLinks: [
      { label: "Occupational Therapy Exam Prep", href: "/occupational-therapy", description: "Related rehabilitation content for occupational therapists" },
      { label: "Paramedic Exam Prep", href: "/paramedic", description: "Emergency patient assessment and musculoskeletal trauma" },
      { label: "Sports Medicine Nursing", href: "/nursing", description: "Nursing certification with orthopedic and sports injury content" },
    ],
    contentClusterBase: "/physical-therapy",
  },
};
