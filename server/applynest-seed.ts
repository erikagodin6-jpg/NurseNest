import { pool } from "./storage";

export async function seedApplyNestContent(): Promise<{ seeded: number; skipped: number }> {
  let seeded = 0;
  let skipped = 0;

  const existing = await pool.query(`SELECT COUNT(*)::int AS c FROM applynest_career_profiles`);
  if (parseInt(existing.rows[0]?.c || "0") > 0) {
    skipped++;
  } else {
    await seedCareerProfiles();
    seeded += 8;
  }

  const existingTemplates = await pool.query(`SELECT COUNT(*)::int AS c FROM applynest_resume_templates`);
  if (parseInt(existingTemplates.rows[0]?.c || "0") > 0) {
    skipped++;
  } else {
    await seedResumeTemplates();
    seeded += 6;
  }

  const existingQuestions = await pool.query(`SELECT COUNT(*)::int AS c FROM applynest_interview_questions`);
  if (parseInt(existingQuestions.rows[0]?.c || "0") > 0) {
    skipped++;
  } else {
    await seedInterviewQuestions();
    seeded += 20;
  }

  const existingGuides = await pool.query(`SELECT COUNT(*)::int AS c FROM applynest_career_guides`);
  if (parseInt(existingGuides.rows[0]?.c || "0") > 0) {
    skipped++;
  } else {
    await seedCareerGuides();
    seeded += 4;
  }

  return { seeded, skipped };
}

async function seedCareerProfiles() {
  const profiles = [
    {
      profession: "rn",
      professionLabel: "Registered Nurse (RN)",
      jobMarketOverview: "The RN job market is robust with a projected 6% growth through 2032. Hospitals, clinics, home health, and telehealth all seek qualified RNs. New grads can expect multiple offers in most markets, especially in acute care, med-surg, and critical care units.",
      salaryRangeJson: { entry: "$58,000-$68,000", mid: "$72,000-$90,000", senior: "$85,000-$120,000", currency: "USD", note: "Varies by state/province and specialty" },
      topEmployers: ["Hospital systems (HCA, Kaiser, Mayo Clinic)", "VA Medical Centers", "Home health agencies", "Travel nursing agencies (Aya, Cross Country)", "Ambulatory surgery centers", "Telehealth companies"],
      licensingRequirements: [
        { region: "USA", requirements: ["BSN or ADN degree from accredited program", "Pass NCLEX-RN examination", "State board of nursing license", "Background check and fingerprinting"] },
        { region: "Canada", requirements: ["BScN degree from approved program", "Pass NCLEX-RN examination", "Provincial/territorial registration (CNO, CARNA, etc.)", "Jurisprudence examination (some provinces)"] }
      ],
      resumeTips: ["Highlight clinical rotations with patient volumes and acuity levels", "Include certifications (BLS, ACLS, PALS) prominently", "Quantify achievements: patient loads, outcomes, quality metrics", "List EMR systems you've used (Epic, Cerner, Meditech)"],
      interviewQuestions: [
        { q: "Describe a time you advocated for a patient.", a: "Use STAR method: describe the Situation, your Task, the Action you took, and the Result for the patient." },
        { q: "How do you handle a high-acuity assignment?", a: "Discuss prioritization frameworks, delegation to support staff, and communication with charge nurse." }
      ],
      firstJobChecklist: ["Apply to new grad residency programs 3-6 months before graduation", "Prepare resume and cover letter tailored to unit type", "Complete BLS and ACLS certifications", "Register for NCLEX-RN", "Research nurse residency program deadlines", "Set up professional references from clinical preceptors", "Create accounts on hospital job boards and Indeed"],
      seoTitle: "RN Career Guide - Job Market, Salary & Licensing | ApplyNest",
      seoDescription: "Complete RN career placement guide. Job market overview, salary ranges ($58K-$120K), licensing requirements, resume tips, interview prep, and first-job checklist for registered nurses.",
      seoKeywords: ["RN jobs", "registered nurse career", "nursing salary", "NCLEX-RN", "new grad RN jobs"],
    },
    {
      profession: "rpn-lvn",
      professionLabel: "RPN / LVN",
      jobMarketOverview: "Demand for RPNs/LVNs remains strong, particularly in long-term care, community health, and rehabilitation settings. A 6% growth rate is expected through 2032. Many employers offer tuition assistance for RPN-to-RN bridging programs.",
      salaryRangeJson: { entry: "$42,000-$50,000", mid: "$50,000-$62,000", senior: "$58,000-$72,000", currency: "USD", note: "Higher in urban areas and specialized settings" },
      topEmployers: ["Long-term care facilities", "Home health agencies", "Community health centers", "Rehabilitation hospitals", "Physician offices", "Urgent care clinics"],
      licensingRequirements: [
        { region: "USA (LVN/LPN)", requirements: ["Diploma or certificate from accredited practical nursing program", "Pass NCLEX-PN examination", "State board of nursing license"] },
        { region: "Canada (RPN)", requirements: ["Practical nursing diploma from approved college", "Pass REx-PN examination", "Provincial registration (CNO, etc.)"] }
      ],
      resumeTips: ["Emphasize hands-on clinical skills: wound care, medication administration, vital signs", "Highlight experience in long-term care or community settings", "Include scope-appropriate certifications", "Mention any bridging program enrollment or plans"],
      interviewQuestions: [
        { q: "How do you manage a heavy patient assignment?", a: "Discuss time management, prioritization of critical tasks, and delegation within scope of practice." }
      ],
      firstJobChecklist: ["Register for and pass NCLEX-PN or REx-PN", "Prepare a clinical-focused resume", "Apply to long-term care and community health positions", "Complete BLS certification", "Research RPN-to-RN bridging programs in your area"],
      seoTitle: "RPN / LVN Career Guide - Jobs, Salary & Licensing | ApplyNest",
      seoDescription: "Complete RPN/LVN career guide. Job market overview, salary ranges ($42K-$72K), licensing for NCLEX-PN and REx-PN, resume tips, and first-job checklist.",
      seoKeywords: ["RPN jobs", "LVN career", "practical nurse salary", "NCLEX-PN", "REx-PN"],
    },
    {
      profession: "np",
      professionLabel: "Nurse Practitioner (NP)",
      jobMarketOverview: "NP roles are among the fastest-growing healthcare positions with 40%+ projected growth through 2032. Full practice authority is expanding across states/provinces, increasing demand in primary care, urgent care, and specialty clinics.",
      salaryRangeJson: { entry: "$95,000-$110,000", mid: "$110,000-$130,000", senior: "$125,000-$160,000", currency: "USD", note: "Specialty NPs (psych, acute care) earn higher" },
      topEmployers: ["Community health centers (FQHCs)", "Private physician practices", "Hospital-based clinics", "Retail health clinics (CVS, Walgreens)", "Telehealth platforms", "Veterans Affairs"],
      licensingRequirements: [
        { region: "USA", requirements: ["MSN or DNP from accredited program", "National certification (AANP or ANCC)", "State APRN license", "DEA registration for prescribing", "Collaborative agreement (state-dependent)"] },
        { region: "Canada", requirements: ["MN/MScN with NP stream", "Pass CNPLE or OSCE", "Provincial NP registration", "Prescriptive authority application"] }
      ],
      resumeTips: ["Lead with certification and specialty (FNP-BC, AGPCNP-BC)", "Include patient panel size and visit volumes from clinical placements", "Highlight prescriptive authority and procedures performed", "Emphasize any published research or quality improvement projects"],
      interviewQuestions: [
        { q: "How do you manage a complex patient with multiple comorbidities?", a: "Describe your systematic assessment approach, interdisciplinary collaboration, and evidence-based treatment planning." }
      ],
      firstJobChecklist: ["Pass national certification exam (AANP/ANCC or CNPLE)", "Apply for state APRN license", "Obtain DEA registration", "Negotiate salary and benefits (CME allowance, malpractice coverage)", "Establish collaborative agreements if required", "Set up credentialing with insurance panels"],
      seoTitle: "Nurse Practitioner Career Guide - Jobs, Salary & Certification | ApplyNest",
      seoDescription: "Complete NP career guide. 40% job growth, salary ranges ($95K-$160K), AANP/ANCC/CNPLE certification, prescriptive authority, and first-job negotiation tips.",
      seoKeywords: ["NP jobs", "nurse practitioner salary", "AANP certification", "ANCC", "NP career"],
    },
    {
      profession: "paramedic",
      professionLabel: "Paramedic",
      jobMarketOverview: "Paramedic demand is growing at 5% through 2032 with critical staffing shortages in rural areas. Community paramedicine and mobile integrated healthcare are expanding the traditional scope of practice beyond emergency response.",
      salaryRangeJson: { entry: "$38,000-$48,000", mid: "$48,000-$65,000", senior: "$60,000-$85,000", currency: "USD", note: "Fire department medics often earn more with overtime" },
      topEmployers: ["Municipal fire departments", "Private ambulance services (AMR, Acadian)", "Hospital-based EMS", "Air medical transport (PHI, Air Methods)", "Industrial/oil field medic companies", "Community paramedicine programs"],
      licensingRequirements: [
        { region: "USA", requirements: ["Accredited paramedic program completion", "NREMT-Paramedic certification", "State EMS license", "ACLS, PALS, PHTLS certifications"] },
        { region: "Canada", requirements: ["Primary Care Paramedic (PCP) or Advanced Care Paramedic (ACP) program", "Provincial licensing (COPR, etc.)", "ITLS/PHTLS certification"] }
      ],
      resumeTips: ["List call volume and types of calls run", "Highlight advanced skills: RSI, chest decompression, 12-lead interpretation", "Include continuing education hours and specializations", "Mention any community paramedicine or special operations experience"],
      interviewQuestions: [
        { q: "Describe your approach to a multi-casualty incident.", a: "Walk through triage process (START/JumpSTART), incident command structure, resource allocation, and patient prioritization." }
      ],
      firstJobChecklist: ["Pass NREMT or provincial certification exam", "Complete ACLS, PALS certifications", "Apply to municipal services and private ambulance companies", "Prepare for physical agility testing", "Research rural vs urban service differences"],
      seoTitle: "Paramedic Career Guide - Jobs, Salary & Certification | ApplyNest",
      seoDescription: "Complete paramedic career guide. Job market, salary ranges ($38K-$85K), NREMT/provincial certification, resume tips, and first-job checklist for EMTs and paramedics.",
      seoKeywords: ["paramedic jobs", "EMT career", "NREMT certification", "paramedic salary", "EMS careers"],
    },
    {
      profession: "rrt",
      professionLabel: "Respiratory Therapist (RRT)",
      jobMarketOverview: "Respiratory therapy is growing at 13% through 2032, much faster than average. COVID-19 highlighted the critical role of RRTs. Demand is especially high in ICUs, sleep labs, pulmonary rehabilitation, and home respiratory care.",
      salaryRangeJson: { entry: "$55,000-$65,000", mid: "$65,000-$80,000", senior: "$78,000-$100,000", currency: "USD", note: "Critical care and travel RRTs earn premium rates" },
      topEmployers: ["Hospital ICUs and NICUs", "Sleep disorder centers", "Home respiratory care companies (Apria, Lincare)", "Pulmonary rehabilitation centers", "Long-term acute care hospitals", "Travel therapy agencies"],
      licensingRequirements: [
        { region: "USA", requirements: ["Associate or bachelor's degree in respiratory therapy", "Pass NBRC TMC and CSE exams", "State licensure", "BLS and ACLS certification"] },
        { region: "Canada", requirements: ["Respiratory therapy diploma or degree", "CBRC national certification", "Provincial registration", "ACLS certification"] }
      ],
      resumeTips: ["Highlight ventilator management experience and patient volumes", "List ABG interpretation proficiency", "Include specialty areas: NICU, adult ICU, sleep lab", "Mention any research or quality improvement involvement"],
      interviewQuestions: [
        { q: "How do you troubleshoot a ventilator alarm?", a: "Describe systematic approach: assess patient first, check circuit, review alarm parameters, and escalate as needed." }
      ],
      firstJobChecklist: ["Pass NBRC TMC and CSE exams", "Obtain state/provincial license", "Complete ACLS certification", "Apply to hospital respiratory departments", "Prepare for clinical competency assessments"],
      seoTitle: "Respiratory Therapist Career Guide - Jobs, Salary & NBRC | ApplyNest",
      seoDescription: "Complete RRT career guide. 13% job growth, salary ranges ($55K-$100K), NBRC certification, ventilator skills, and first-job checklist for respiratory therapists.",
      seoKeywords: ["RRT jobs", "respiratory therapist salary", "NBRC certification", "respiratory therapy career"],
    },
    {
      profession: "mlt",
      professionLabel: "Medical Lab Technologist (MLT)",
      jobMarketOverview: "MLT demand is growing at 5% through 2032 with significant staffing shortages nationwide. Automation is changing workflows but not reducing demand. Specializations in microbiology, blood banking, and molecular diagnostics are particularly sought after.",
      salaryRangeJson: { entry: "$50,000-$58,000", mid: "$58,000-$72,000", senior: "$70,000-$90,000", currency: "USD", note: "Specialty certifications increase earning potential" },
      topEmployers: ["Hospital laboratories", "Reference laboratories (Quest, LabCorp)", "Public health laboratories", "Blood banks and transfusion services", "Molecular diagnostics companies", "Research institutions"],
      licensingRequirements: [
        { region: "USA", requirements: ["Bachelor's degree in medical laboratory science or related field", "ASCP Board of Certification", "State licensure (in applicable states)", "Specialty certification optional (SBB, SM, SC)"] },
        { region: "Canada", requirements: ["Medical laboratory science diploma or degree", "CSMLS national certification", "Provincial registration", "Continuing education requirements"] }
      ],
      resumeTips: ["List instrumentation and analyzer experience by name", "Highlight QC/QA experience and proficiency testing results", "Include specimen processing volumes", "Mention any LIS/LIMS systems experience"],
      interviewQuestions: [
        { q: "How do you handle a critical lab value?", a: "Describe immediate notification protocol, verification steps, documentation, and follow-up procedures." }
      ],
      firstJobChecklist: ["Pass ASCP BOC or CSMLS certification", "Apply to hospital and reference laboratories", "Prepare for bench competency assessments", "Research specialty certification options", "Set up continuing education tracking"],
      seoTitle: "MLT Career Guide - Jobs, Salary & ASCP Certification | ApplyNest",
      seoDescription: "Complete MLT career guide. Job market overview, salary ranges ($50K-$90K), ASCP/CSMLS certification, laboratory skills, and first-job checklist for lab technologists.",
      seoKeywords: ["MLT jobs", "medical lab technologist salary", "ASCP certification", "lab technologist career"],
    },
    {
      profession: "imaging",
      professionLabel: "Medical Imaging / Radiologic Technologist",
      jobMarketOverview: "Radiologic technologist demand is growing at 6% through 2032. Advancement opportunities exist in CT, MRI, mammography, and interventional radiology. Cross-training in multiple modalities significantly increases employability.",
      salaryRangeJson: { entry: "$52,000-$62,000", mid: "$62,000-$78,000", senior: "$75,000-$100,000", currency: "USD", note: "Multi-modality techs and travel techs earn more" },
      topEmployers: ["Hospital radiology departments", "Outpatient imaging centers", "Orthopedic and urgent care clinics", "Interventional radiology suites", "Mobile imaging companies", "Travel imaging agencies"],
      licensingRequirements: [
        { region: "USA", requirements: ["Associate or bachelor's degree in radiologic technology", "ARRT certification", "State licensure and radiation safety permit", "BLS certification"] },
        { region: "Canada", requirements: ["Radiological technology diploma or degree", "CAMRT national certification", "Provincial registration", "Radiation safety training"] }
      ],
      resumeTips: ["List imaging modalities and equipment operated", "Include patient volume and types of exams performed", "Highlight radiation safety compliance record", "Mention any post-primary certifications (CT, MRI, mammography)"],
      interviewQuestions: [
        { q: "How do you manage a contrast reaction?", a: "Describe recognition of symptoms, immediate interventions, notification of radiologist, and documentation protocol." }
      ],
      firstJobChecklist: ["Pass ARRT or CAMRT certification exam", "Obtain state/provincial license", "Complete BLS certification", "Apply to hospital radiology departments", "Research post-primary certification options"],
      seoTitle: "Radiologic Technologist Career Guide - Jobs & ARRT Certification | ApplyNest",
      seoDescription: "Complete imaging career guide. Job market, salary ranges ($52K-$100K), ARRT/CAMRT certification, positioning skills, and first-job checklist for radiologic technologists.",
      seoKeywords: ["radiology tech jobs", "ARRT certification", "radiologic technologist salary", "imaging career"],
    },
    {
      profession: "pharmtech",
      professionLabel: "Pharmacy Technician",
      jobMarketOverview: "Pharmacy technician demand is growing at 6% through 2032. Expanded scope of practice in many states allows techs to administer vaccines, perform medication therapy management support, and manage automated dispensing systems.",
      salaryRangeJson: { entry: "$32,000-$38,000", mid: "$38,000-$48,000", senior: "$45,000-$58,000", currency: "USD", note: "Hospital and specialty pharmacy techs earn more" },
      topEmployers: ["Retail pharmacies (CVS, Walgreens, Walmart)", "Hospital pharmacy departments", "Specialty pharmacies", "Mail-order pharmacies", "Compounding pharmacies", "Long-term care pharmacies"],
      licensingRequirements: [
        { region: "USA", requirements: ["High school diploma plus training program or on-the-job training", "PTCB or ExCPT certification (required in most states)", "State registration or license", "Background check"] },
        { region: "Canada", requirements: ["Pharmacy technician diploma from accredited program", "PEBC Qualifying Exam", "Provincial registration", "Structured practical training"] }
      ],
      resumeTips: ["Highlight prescription processing volume", "List pharmacy software and automated dispensing systems used", "Include any sterile compounding or IV admixture experience", "Mention immunization administration certification if applicable"],
      interviewQuestions: [
        { q: "How do you handle a potential drug interaction at point of sale?", a: "Describe flagging the interaction, notifying the pharmacist, documenting the intervention, and communicating with the patient." }
      ],
      firstJobChecklist: ["Pass PTCB or PEBC certification exam", "Register with state/provincial pharmacy board", "Apply to retail and hospital pharmacies", "Complete immunization administration training if available", "Research advanced certification options (CPhT-Adv, sterile compounding)"],
      seoTitle: "Pharmacy Technician Career Guide - Jobs, Salary & PTCB | ApplyNest",
      seoDescription: "Complete pharmacy tech career guide. Job market, salary ranges ($32K-$58K), PTCB/PEBC certification, dispensing skills, and first-job checklist for pharmacy technicians.",
      seoKeywords: ["pharmacy tech jobs", "PTCB certification", "pharmacy technician salary", "pharmtech career"],
    },
  ];

  for (const p of profiles) {
    await pool.query(
      `INSERT INTO applynest_career_profiles (profession, profession_label, job_market_overview, salary_range_json, top_employers, licensing_requirements, resume_tips, interview_questions, first_job_checklist, seo_title, seo_description, seo_keywords, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'published')
       ON CONFLICT (profession) DO NOTHING`,
      [p.profession, p.professionLabel, p.jobMarketOverview, JSON.stringify(p.salaryRangeJson), JSON.stringify(p.topEmployers), JSON.stringify(p.licensingRequirements), JSON.stringify(p.resumeTips), JSON.stringify(p.interviewQuestions), JSON.stringify(p.firstJobChecklist), p.seoTitle, p.seoDescription, p.seoKeywords]
    );
  }
}

async function seedResumeTemplates() {
  const templates = [
    {
      title: "New Graduate Healthcare Resume",
      slug: "new-grad-healthcare",
      category: "new-grad",
      profession: null,
      description: "Designed for recent healthcare graduates with limited work experience. Emphasizes clinical rotations, certifications, and academic achievements.",
      templateContent: {
        sections: ["Contact Information", "Professional Summary", "Education", "Clinical Rotations / Practicums", "Certifications & Licenses", "Skills", "Volunteer Experience"],
        tips: ["Lead with a strong professional summary highlighting your specialty interest", "List clinical rotations with facility names, unit types, and patient populations", "Include all certifications with expiration dates", "Add relevant coursework if it strengthens your application"],
      },
      tips: ["Customize your summary for each position", "Use action verbs: assessed, administered, documented, educated", "Keep to one page as a new graduate", "Include your GPA if it's above 3.5"],
    },
    {
      title: "Experienced Healthcare Professional Resume",
      slug: "experienced-healthcare",
      category: "experienced",
      profession: null,
      description: "For healthcare professionals with 2+ years of experience. Highlights achievements, patient outcomes, and professional development.",
      templateContent: {
        sections: ["Contact Information", "Professional Summary", "Work Experience", "Education", "Certifications & Licenses", "Professional Development", "Skills"],
        tips: ["Quantify achievements with metrics (patient loads, outcomes, quality scores)", "Highlight leadership roles and committee participation", "Include continuing education and specialty certifications", "Show career progression and increasing responsibility"],
      },
      tips: ["Lead each bullet point with a measurable achievement", "Include awards, employee recognition, or quality metrics", "List professional memberships and conferences attended", "Tailor each resume to the specific job posting"],
    },
    {
      title: "Specialty Transition Resume",
      slug: "specialty-transition",
      category: "transition",
      profession: null,
      description: "For healthcare professionals transitioning between specialties or advancing their career. Emphasizes transferable skills and relevant training.",
      templateContent: {
        sections: ["Contact Information", "Objective Statement", "Transferable Skills", "Relevant Training & Certifications", "Work Experience", "Education", "Professional Development"],
        tips: ["Write a clear objective explaining your transition goals", "Map transferable skills to the new specialty requirements", "Highlight any cross-training or shadowing experience", "Include relevant continuing education courses"],
      },
      tips: ["Research the target specialty's key competencies", "Connect your existing skills to the new role's requirements", "Mention any informational interviews or job shadowing completed", "Consider adding a skills-based format instead of chronological"],
    },
    {
      title: "Nursing Resume - ICU / Critical Care",
      slug: "nursing-icu-resume",
      category: "specialty",
      profession: "rn",
      description: "Tailored for nurses applying to ICU, CCU, or critical care positions. Emphasizes acuity experience, advanced certifications, and technology skills.",
      templateContent: {
        sections: ["Contact Information", "Professional Summary", "Critical Care Experience", "Certifications (CCRN, ACLS, etc.)", "Education", "Skills & Technology", "Professional Memberships"],
        tips: ["Highlight patient acuity levels and nurse-to-patient ratios", "List hemodynamic monitoring, ventilator, and CRRT experience", "Include any rapid response or code team participation", "Mention EHR systems and bedside monitoring technology"],
      },
      tips: ["Lead with ACLS, CCRN, or other critical care certifications", "Quantify code team responses and patient outcomes", "Include any preceptor or charge nurse experience"],
    },
    {
      title: "Allied Health Resume - Lab / Imaging",
      slug: "allied-health-lab-imaging",
      category: "specialty",
      profession: null,
      description: "Designed for MLTs, radiologic technologists, and other diagnostic professionals. Focuses on technical proficiency, equipment experience, and quality metrics.",
      templateContent: {
        sections: ["Contact Information", "Professional Summary", "Technical Experience", "Equipment & Instrumentation", "Certifications", "Education", "Quality & Safety"],
        tips: ["List specific analyzers, imaging equipment, and LIS/RIS systems by name", "Include specimen/exam volumes processed", "Highlight quality control and proficiency testing results", "Mention any method validation or SOP development experience"],
      },
      tips: ["Name specific equipment models and software systems", "Include accreditation survey participation", "Highlight any CAP, AABB, or Joint Commission experience"],
    },
    {
      title: "Paramedic / EMS Resume",
      slug: "paramedic-ems-resume",
      category: "specialty",
      profession: "paramedic",
      description: "Tailored for paramedics and EMTs applying to fire departments, ambulance services, or hospital-based EMS positions.",
      templateContent: {
        sections: ["Contact Information", "Professional Summary", "EMS Experience", "Certifications & Training", "Education", "Skills", "Physical Fitness / Special Operations"],
        tips: ["Include call volume and response area demographics", "List advanced procedures performed: intubation, medication administration, 12-lead ECG", "Highlight any SWAT medic, flight medic, or tactical EMS experience", "Mention continuing education hours and specialty training"],
      },
      tips: ["Include physical fitness test scores if applicable", "List driver's license class and driving record", "Mention any instructor certifications or teaching experience"],
    },
  ];

  for (const t of templates) {
    await pool.query(
      `INSERT INTO applynest_resume_templates (title, slug, category, profession, description, template_content, tips, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'published')
       ON CONFLICT (slug) DO NOTHING`,
      [t.title, t.slug, t.category, t.profession, t.description, JSON.stringify(t.templateContent), JSON.stringify(t.tips)]
    );
  }
}

async function seedInterviewQuestions() {
  const questions = [
    { question: "Tell me about yourself.", category: "General", profession: null, sampleAnswer: "I recently graduated from [Program] with a focus on [specialty]. During my clinical rotations at [Hospital], I developed strong skills in [specific areas]. I'm particularly passionate about [patient population/specialty] and I'm excited about this opportunity because [connection to role].", tips: "Keep it to 2-3 minutes. Focus on professional background, not personal life.", difficulty: "easy", questionType: "behavioral" },
    { question: "Why did you choose healthcare as a career?", category: "General", profession: null, sampleAnswer: "I was drawn to healthcare because of [personal experience/motivation]. What keeps me committed is the daily opportunity to make a tangible difference in patients' lives. I find fulfillment in [specific aspect of care delivery].", tips: "Be genuine. Brief personal stories are powerful here.", difficulty: "easy", questionType: "behavioral" },
    { question: "Describe a time you made an error. How did you handle it?", category: "Situational", profession: null, sampleAnswer: "During a clinical rotation, I [describe error]. I immediately notified my preceptor and [describe steps taken]. We addressed the situation by [corrective actions]. I learned [lesson] and since then I always [preventive measure]. This experience reinforced the importance of transparency and continuous learning.", tips: "Show accountability, immediate reporting, and what you learned. Never say you've never made a mistake.", difficulty: "hard", questionType: "behavioral" },
    { question: "How do you handle a difficult or combative patient?", category: "Situational", profession: null, sampleAnswer: "I approach difficult situations with empathy first - understanding that behavior often stems from fear, pain, or loss of control. I use therapeutic communication, maintain a calm tone, and set clear boundaries while ensuring safety. If the situation escalates, I follow facility de-escalation protocols and involve security when needed.", tips: "Emphasize patient safety, de-escalation, and team communication.", difficulty: "medium", questionType: "behavioral" },
    { question: "How do you prioritize when you have multiple patients with competing needs?", category: "Clinical Judgment", profession: null, sampleAnswer: "I use the ABCs framework combined with Maslow's hierarchy. I assess which patient has the most acute or life-threatening condition first. I delegate appropriate tasks to support staff, communicate with the charge nurse about workload concerns, and reassess priorities continuously throughout the shift.", tips: "Show systematic thinking and willingness to delegate and communicate.", difficulty: "medium", questionType: "clinical" },
    { question: "What would you do if you noticed a colleague making an unsafe practice?", category: "Ethics", profession: null, sampleAnswer: "Patient safety is the top priority. I would first approach my colleague privately and professionally to address the concern. If the behavior continued or if it posed immediate danger, I would escalate to the charge nurse or supervisor. I believe in supporting colleagues while maintaining safety standards and would document the incident as appropriate.", tips: "Show you prioritize patient safety while being respectful to colleagues.", difficulty: "medium", questionType: "behavioral" },
    { question: "Tell me about a time you worked effectively as part of a team.", category: "Teamwork", profession: null, sampleAnswer: "During a code situation on my unit, I worked with the rapid response team where I was responsible for [specific role]. I communicated patient history using SBAR, assisted with [tasks], and ensured smooth handoff to the ICU. The effective coordination resulted in a positive patient outcome.", tips: "Use STAR format. Highlight your specific contribution and team communication.", difficulty: "easy", questionType: "behavioral" },
    { question: "Where do you see yourself in 5 years?", category: "Career Development", profession: null, sampleAnswer: "In 5 years, I plan to have developed expertise in [specialty area]. I'm interested in pursuing [certification/education] and eventually taking on [leadership/specialty role]. I see this position as an excellent foundation because [specific reasons related to the role].", tips: "Show ambition that aligns with the employer's growth opportunities.", difficulty: "easy", questionType: "behavioral" },
    { question: "How do you stay current with evidence-based practice?", category: "Professional Development", profession: null, sampleAnswer: "I regularly review journals in my specialty, participate in continuing education through [specific platforms], and attend professional conferences when possible. I'm a member of [professional organization] and use their resources. I also engage with colleagues in case discussions and quality improvement initiatives.", tips: "Name specific journals, organizations, and learning methods you actually use.", difficulty: "easy", questionType: "behavioral" },
    { question: "Describe your experience with electronic health records.", category: "Technical", profession: null, sampleAnswer: "I have experience with [specific EHR systems: Epic, Cerner, Meditech]. I'm proficient in documentation, order entry, medication administration records, and generating reports. I understand the importance of accurate, timely documentation for patient safety, legal protection, and interdisciplinary communication.", tips: "Name specific systems. If limited experience, show eagerness to learn.", difficulty: "easy", questionType: "technical" },
    { question: "How do you handle end-of-life care conversations?", category: "Clinical Judgment", profession: "rn", sampleAnswer: "I approach end-of-life discussions with compassion and cultural sensitivity. I ensure the patient and family have a clear understanding of the prognosis, support their decision-making process, and coordinate with palliative care and chaplaincy services. I focus on comfort measures and respect the patient's advance directives.", tips: "Show emotional intelligence and knowledge of palliative care principles.", difficulty: "hard", questionType: "clinical" },
    { question: "What ventilator modes are you most experienced with?", category: "Technical", profession: "rrt", sampleAnswer: "I have experience with AC (volume and pressure), SIMV, PSV, CPAP, and APRV. During my clinical rotations, I managed patients on [specific ventilator brands]. I'm comfortable with initial settings, weaning protocols, and troubleshooting alarms. I also have experience with non-invasive ventilation including BiPAP and high-flow nasal cannula.", tips: "Be specific about modes AND the clinical scenarios where each is appropriate.", difficulty: "medium", questionType: "technical" },
    { question: "How do you verify specimen identity and handle mislabeled specimens?", category: "Technical", profession: "mlt", sampleAnswer: "I follow strict two-patient-identifier verification at every step. For mislabeled specimens, I reject and document the rejection, notify the collecting unit immediately, and request a recollection. I never relabel or make assumptions about specimen identity as this directly impacts patient safety and test accuracy.", tips: "Emphasize zero tolerance for specimen identity errors.", difficulty: "medium", questionType: "technical" },
    { question: "What is your approach to radiation safety?", category: "Technical", profession: "imaging", sampleAnswer: "I follow ALARA principles rigorously - using the lowest exposure that produces diagnostic quality images. I verify patient identity, confirm pregnancy status for female patients of childbearing age, use appropriate shielding, select correct technical factors, and monitor my personal dosimetry badge. I also educate patients about the procedure and radiation safety.", tips: "Demonstrate systematic approach to ALARA and patient communication.", difficulty: "medium", questionType: "technical" },
    { question: "How do you handle a high-stress emergency scene?", category: "Situational", profession: "paramedic", sampleAnswer: "I rely on training and protocols to maintain focus. I perform a scene size-up, ensure crew safety, then systematically assess and treat using the primary survey (ABCDE). I communicate clearly with my partner and dispatch, document interventions, and debrief with my team after critical calls to process the experience.", tips: "Show composure, systematic thinking, and awareness of crew wellness.", difficulty: "medium", questionType: "behavioral" },
    { question: "How do you handle a medication error at the pharmacy?", category: "Situational", profession: "pharmtech", sampleAnswer: "I immediately notify the pharmacist, document the error in the pharmacy's incident reporting system, and if the medication reached the patient, follow the facility's adverse event protocol. I then participate in a root cause analysis to identify what went wrong and help implement process improvements to prevent recurrence.", tips: "Show accountability, knowledge of reporting systems, and focus on prevention.", difficulty: "medium", questionType: "behavioral" },
    { question: "What attracted you to this specific facility/organization?", category: "General", profession: null, sampleAnswer: "I researched your organization and was impressed by [specific programs, awards, patient populations, or values]. Your commitment to [specific initiative] aligns with my professional interests. I also spoke with [current employees/connections] who described a supportive learning environment, which is important to me as I begin my career.", tips: "Research the employer beforehand. Reference specific programs, awards, or values.", difficulty: "easy", questionType: "behavioral" },
    { question: "How do you manage your own stress and prevent burnout?", category: "Self-Care", profession: null, sampleAnswer: "I maintain work-life balance through regular exercise, adequate sleep, and social connections outside of work. I practice mindfulness and utilize my employee assistance program when needed. I also debrief with colleagues after difficult shifts and set boundaries around overtime to protect my mental health and ensure I can provide safe patient care.", tips: "Show self-awareness and concrete strategies. Mention EAP awareness.", difficulty: "easy", questionType: "behavioral" },
    { question: "What is your greatest professional strength?", category: "General", profession: null, sampleAnswer: "My greatest strength is my attention to detail combined with strong clinical communication. In my rotations, I consistently identified subtle changes in patient status that led to early interventions. For example, [brief specific example]. I pair this clinical awareness with clear SBAR communication to ensure the entire care team is informed.", tips: "Choose a strength relevant to healthcare and back it with a specific example.", difficulty: "easy", questionType: "behavioral" },
    { question: "Do you have any questions for us?", category: "General", profession: null, sampleAnswer: "Yes! I'd like to know: (1) What does your orientation/onboarding program look like? (2) What opportunities exist for continuing education and certification support? (3) How does the team handle shift transitions and handoff communication? (4) What are the typical nurse-to-patient ratios on this unit?", tips: "Always have 3-4 thoughtful questions prepared. Focus on professional development, team culture, and patient care.", difficulty: "easy", questionType: "behavioral" },
  ];

  for (const q of questions) {
    await pool.query(
      `INSERT INTO applynest_interview_questions (question, category, profession, sample_answer, tips, difficulty, question_type, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'published')`,
      [q.question, q.category, q.profession, q.sampleAnswer, q.tips, q.difficulty, q.questionType]
    );
  }
}

async function seedCareerGuides() {
  const guides = [
    {
      title: "Where to Find Healthcare Jobs: A Complete Guide",
      slug: "where-to-find-healthcare-jobs",
      category: "job-search",
      summary: "Comprehensive guide to finding healthcare positions through job boards, networking, recruitment agencies, and direct applications.",
      content: [
        { heading: "Hospital Career Pages", body: "Most major hospital systems post positions on their own career portals before third-party sites. Check career pages for systems like HCA, Kaiser Permanente, Mayo Clinic, Cleveland Clinic, and your local health networks. Many offer new grad residency programs with application deadlines 3-6 months before start dates." },
        { heading: "Healthcare-Specific Job Boards", body: "NursingJobs.com, Health eCareers, and Indeed Healthcare are top resources. LinkedIn Jobs has strong healthcare listings with networking features. For travel positions, check Vivian, Nomad Health, and Aya Healthcare. Canadian healthcare workers should also check HealthForceOntario, BCHealthJobs, and provincial health authority sites." },
        { heading: "Professional Associations", body: "Your professional association often maintains a job board. ANA (nursing), AARC (respiratory), ASCP (lab), ASRT (imaging), and ASHP (pharmacy) all offer career resources, networking events, and job postings exclusive to members." },
        { heading: "Recruitment Agencies", body: "Healthcare staffing agencies can open doors, especially for new graduates. Many agencies offer permanent placement alongside travel positions. Build relationships with recruiters who specialize in your profession." },
        { heading: "Networking Strategies", body: "Attend clinical conferences, join professional LinkedIn groups, and connect with preceptors from your clinical rotations. Many healthcare positions are filled through internal referrals before being posted publicly. Ask your program's career services office for alumni connections." },
      ],
      seoTitle: "Where to Find Healthcare Jobs - Complete Job Search Guide | ApplyNest",
      seoDescription: "Comprehensive guide to finding healthcare jobs. Hospital career pages, healthcare job boards, professional associations, recruitment agencies, and networking strategies.",
      seoKeywords: ["healthcare jobs", "nursing job search", "healthcare career", "hospital jobs", "nursing job boards"],
    },
    {
      title: "How to Evaluate Healthcare Job Offers",
      slug: "how-to-evaluate-healthcare-job-offers",
      category: "job-search",
      summary: "Learn how to compare and evaluate healthcare job offers beyond base salary - including benefits, schedule, orientation, and growth opportunities.",
      content: [
        { heading: "Beyond Base Salary", body: "Healthcare compensation includes much more than hourly rate. Evaluate shift differentials (nights, weekends, holidays can add $3-8/hour), overtime policies, certification bonuses, and sign-on bonuses. Some facilities offer student loan repayment assistance or tuition reimbursement worth $5,000-$10,000+ annually." },
        { heading: "Benefits Package Comparison", body: "Compare health insurance premiums and coverage levels, retirement plans with employer matching (typically 3-6%), paid time off accrual rates, CME/CE allowances ($500-$2,000/year), and professional development support. Don't overlook malpractice insurance coverage for advanced practice providers." },
        { heading: "Work Environment Factors", body: "Research nurse-to-patient ratios, support staff availability, scheduling flexibility, float requirements, and mandatory overtime policies. Ask about unit culture, preceptorship programs for new hires, and staff retention rates. A lower-paying position with better ratios and culture may be worth more long-term." },
        { heading: "Orientation and Onboarding", body: "New grad programs typically offer 8-16 weeks of orientation with a dedicated preceptor. Experienced hire orientations are usually 4-8 weeks. Longer orientation programs correlate with better outcomes and higher retention. Ask about simulation training and competency assessment processes." },
        { heading: "Career Growth Potential", body: "Evaluate advancement pathways: clinical ladder programs, charge nurse opportunities, specialty certification support, and leadership development. Some facilities offer internal transfer policies that allow you to explore different units after a set tenure period." },
      ],
      seoTitle: "How to Evaluate Healthcare Job Offers - Salary, Benefits & More | ApplyNest",
      seoDescription: "Learn how to evaluate healthcare job offers. Compare salary, benefits, shift differentials, orientation programs, and career growth opportunities for nursing and allied health positions.",
      seoKeywords: ["evaluate job offer", "healthcare salary negotiation", "nursing benefits", "compare job offers", "healthcare compensation"],
    },
    {
      title: "Salary Negotiation Tips for Healthcare Professionals",
      slug: "salary-negotiation-healthcare",
      category: "job-search",
      summary: "Practical negotiation strategies for healthcare job seekers, including how to research fair compensation and negotiate beyond base pay.",
      content: [
        { heading: "Research Market Rates", body: "Use the BLS Occupational Outlook Handbook, Salary.com, Glassdoor, and PayScale to research competitive rates for your role, experience level, and geographic area. Professional associations often publish annual salary surveys with detailed breakdowns." },
        { heading: "Know Your Value", body: "Calculate your total value including specialty certifications, bilingual skills, experience with specific equipment/systems, and unique competencies. Quantify your contributions: reduced readmission rates, improved patient satisfaction scores, or quality metrics you've achieved." },
        { heading: "Negotiation Strategies", body: "Never accept the first offer without reviewing it. Ask for 24-48 hours to consider. If the base salary is firm (common in unionized settings), negotiate other components: sign-on bonus, relocation assistance, schedule preferences, certification reimbursement, or an earlier pay review date." },
        { heading: "What's Negotiable in Healthcare", body: "Start date flexibility, shift preferences, weekend rotation frequency, on-call requirements, PTO frontloading, student loan repayment, parking/commuter benefits, professional development funds, and guaranteed hours minimums are all commonly negotiable even when base pay isn't." },
        { heading: "When to Walk Away", body: "Set a minimum acceptable package before negotiations begin. If the total compensation doesn't meet your minimum after good-faith negotiation, it's okay to decline. Healthcare professionals are in demand - another opportunity will arise." },
      ],
      seoTitle: "Healthcare Salary Negotiation Tips - Negotiate Your Job Offer | ApplyNest",
      seoDescription: "Salary negotiation strategies for nurses and healthcare professionals. Research market rates, quantify your value, and negotiate beyond base pay for the best total compensation.",
      seoKeywords: ["salary negotiation healthcare", "nursing salary negotiation", "negotiate job offer", "healthcare compensation tips"],
    },
    {
      title: "Credentialing Timeline: From Graduation to First Day",
      slug: "credentialing-timeline",
      category: "job-search",
      summary: "Step-by-step credentialing timeline for healthcare graduates, from exam registration to first day on the job.",
      content: [
        { heading: "Month 1-2 Before Graduation", body: "Register for your licensing/certification exam (NCLEX, NREMT, NBRC, ASCP, ARRT, PTCB, etc.). Most exam applications can be submitted before graduation with school verification. Begin applying for positions - many new grad programs have early application deadlines." },
        { heading: "Graduation Month", body: "Obtain official transcripts and degree verification. Complete your exam application with final school verification. Schedule your exam date. Apply for a graduate permit/temporary license if your state/province offers one - this allows you to begin working under supervision before passing your exam." },
        { heading: "Month 1-2 After Graduation", body: "Take and pass your certification/licensing exam. Apply for your permanent license/registration with your state/provincial regulatory body. Processing times vary from 2 weeks to 3 months depending on jurisdiction and background check requirements." },
        { heading: "While Awaiting License", body: "Complete employer onboarding requirements: drug screening, background check, health screening, immunization records, and orientation documentation. Begin BLS/ACLS/PALS certifications if not already completed. Some employers allow you to start orientation on a graduate permit while awaiting full licensure." },
        { heading: "First Day Preparation", body: "Confirm your license is active and verified by your employer. Gather required documents: government ID, professional license, certifications, immunization records, and Social Security/SIN card. Review your facility's dress code, parking, and first-day logistics. Arrive early and bring a positive attitude!" },
      ],
      seoTitle: "Healthcare Credentialing Timeline - Graduation to First Day | ApplyNest",
      seoDescription: "Step-by-step credentialing timeline for healthcare graduates. Exam registration, licensing applications, employer onboarding, and first-day preparation guide.",
      seoKeywords: ["credentialing timeline", "healthcare licensing", "new grad onboarding", "nursing license timeline", "exam registration"],
    },
  ];

  for (const g of guides) {
    await pool.query(
      `INSERT INTO applynest_career_guides (title, slug, category, summary, content, seo_title, seo_description, seo_keywords, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'published')
       ON CONFLICT (slug) DO NOTHING`,
      [g.title, g.slug, g.category, g.summary, JSON.stringify(g.content), g.seoTitle, g.seoDescription, g.seoKeywords]
    );
  }
}
