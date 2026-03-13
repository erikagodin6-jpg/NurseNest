import { pool } from "./storage";

interface SeedGuide {
  title: string;
  slug: string;
  profession: string;
  guideType: string;
  category: string;
  summary: string;
  content: any[];
  sections: any[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  faqItems: any[];
  tags: string[];
  authorName: string;
}

function buildSections(sectionData: { id: string; title: string; content: string; items?: string[] }[]) {
  return sectionData;
}

function buildContent(sectionData: { id: string; title: string; content: string; items?: string[] }[]) {
  const blocks: any[] = [];
  for (const s of sectionData) {
    blocks.push({ type: "heading", text: s.title });
    blocks.push({ type: "paragraph", text: s.content });
    if (s.items && s.items.length > 0) {
      blocks.push({ type: "list", items: s.items });
    }
  }
  return blocks;
}

const SURVIVAL_GUIDES: SeedGuide[] = [
  {
    title: "Your First Year as a New Graduate Nurse: The Complete Survival Guide",
    slug: "new-grad/nursing/first-year-survival-guide",
    profession: "nursing",
    guideType: "survival-guide",
    category: "First Year Guide",
    summary: "A comprehensive guide to surviving and thriving in your first year as a registered nurse, from orientation to independent practice.",
    seoTitle: "New Grad Nurse First Year Survival Guide | NurseNest",
    seoDescription: "Navigate your first year as a new graduate nurse with confidence. Covers orientation, time management, clinical skills, communication, and building confidence.",
    seoKeywords: ["new grad nurse", "first year nursing", "nursing orientation", "new nurse tips", "nursing career"],
    tags: ["nursing", "new-grad", "survival-guide", "first-year"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How long does it take to feel confident as a new nurse?", answer: "Most new graduates report feeling more confident between 6 to 12 months of practice. The transition from student to practicing nurse involves a well-documented adjustment period. Be patient with yourself and celebrate small wins along the way." },
      { question: "What should I do if I make a medication error?", answer: "Report the error immediately to your charge nurse and follow your facility's incident reporting protocol. Document the event accurately, monitor the patient for adverse effects, and notify the prescriber. Errors are learning opportunities, not career-ending events." },
      { question: "How do I handle conflict with a senior nurse?", answer: "Address concerns privately and professionally. Use 'I' statements, focus on the specific behavior rather than the person, and seek to understand their perspective. If the issue persists, involve your charge nurse or nurse manager." },
      { question: "When should I start applying for nursing positions?", answer: "Begin applying 2-3 months before your expected graduation date. Many hospitals have new graduate residency programs with early application deadlines. Tailor your resume to highlight clinical rotations and relevant certifications." },
    ],
  },
  {
    title: "Your First Year as a New Graduate Paramedic: The Complete Survival Guide",
    slug: "new-grad/paramedic/first-year-survival-guide",
    profession: "paramedic",
    guideType: "survival-guide",
    category: "First Year Guide",
    summary: "Essential guidance for new paramedics navigating their first year in emergency medical services, from field preceptorship to independent practice.",
    seoTitle: "New Grad Paramedic First Year Survival Guide | NurseNest",
    seoDescription: "Navigate your first year as a new graduate paramedic. Covers field orientation, emergency protocols, scene management, and building clinical confidence.",
    seoKeywords: ["new grad paramedic", "first year paramedic", "EMS orientation", "new paramedic tips", "paramedic career"],
    tags: ["paramedic", "new-grad", "survival-guide", "first-year"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How do I manage the stress of high-acuity calls?", answer: "Develop a post-call debrief routine with your partner. Practice deep breathing techniques between calls. Seek peer support after particularly traumatic incidents. Many services offer critical incident stress management programs." },
      { question: "What if I freeze during my first cardiac arrest?", answer: "Pre-plan your actions by mentally rehearsing protocols before each shift. Follow your ACLS/BLS algorithm step by step. Lean on your partner and communicate clearly. Every paramedic experiences this, and muscle memory develops with practice." },
      { question: "How do I give a concise radio report?", answer: "Use a structured format: unit identification, patient age and gender, chief complaint, vital signs, interventions, ETA. Practice with your preceptor until it becomes natural. Keep reports under 30 seconds for routine calls." },
      { question: "When will I feel ready to work without a preceptor?", answer: "Most new paramedics need 3-6 months of preceptored practice before feeling confident independently. Your preceptor and supervisor will evaluate your readiness based on clinical competencies, not just time served." },
    ],
  },
  {
    title: "Your First Year as a New Graduate Respiratory Therapist: The Complete Survival Guide",
    slug: "new-grad/respiratory-therapy/first-year-survival-guide",
    profession: "respiratory-therapy",
    guideType: "survival-guide",
    category: "First Year Guide",
    summary: "Navigate your first year as a respiratory therapist with confidence, from mastering ventilator management to ABG interpretation and airway emergencies.",
    seoTitle: "New Grad RRT First Year Survival Guide | NurseNest",
    seoDescription: "Your complete guide to the first year as a new respiratory therapist. Covers ventilator management, ABG interpretation, airway management, and career growth.",
    seoKeywords: ["new grad RRT", "first year respiratory therapist", "RRT orientation", "respiratory therapy career"],
    tags: ["respiratory-therapy", "new-grad", "survival-guide", "first-year"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How do I handle my first emergency intubation?", answer: "Preparation is key. Check your intubation equipment at the start of every shift. Know where backup airways are stored. During the event, focus on your role in the team and communicate clearly with the physician." },
      { question: "What ABG interpretation method should I use?", answer: "Start with the systematic 'Rome' method (Respiratory Opposite, Metabolic Equal) for acid-base analysis. Combine this with the Hendersoin-Hasselbalch approach as your skills develop. Practice interpreting at least 5 ABGs per shift." },
      { question: "How quickly should I master ventilator modes?", answer: "Focus on mastering volume control and pressure control modes in your first 3 months. Add SIMV, PSV, and APRV over the next 3-6 months. Full comfort with advanced modes typically develops within your first year." },
    ],
  },
  {
    title: "Your First Year as a New Graduate MLT: The Complete Survival Guide",
    slug: "new-grad/mlt/first-year-survival-guide",
    profession: "mlt",
    guideType: "survival-guide",
    category: "First Year Guide",
    summary: "A comprehensive guide for new medical laboratory technologists navigating their first year in the clinical laboratory.",
    seoTitle: "New Grad MLT First Year Survival Guide | NurseNest",
    seoDescription: "Navigate your first year as a new MLT. Covers quality control, specimen processing, instrument troubleshooting, and building laboratory confidence.",
    seoKeywords: ["new grad MLT", "first year lab tech", "MLT orientation", "medical lab career"],
    tags: ["mlt", "new-grad", "survival-guide", "first-year"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What do I do when QC results are out of range?", answer: "Do not release patient results until QC is resolved. Repeat the QC run, check reagents and calibrators, review maintenance logs, and consult the troubleshooting guide. Document all corrective actions taken." },
      { question: "How do I handle critical values?", answer: "Follow your lab's critical value policy precisely. Call the appropriate provider, read back the result, document the time and person notified. Never delay reporting a critical value." },
      { question: "When should I ask for help with unusual results?", answer: "Whenever a result does not make clinical sense, does not correlate with other test results, or falls outside your experience level. Consulting senior technologists is a sign of good practice, not weakness." },
    ],
  },
  {
    title: "Your First Year as a New Graduate Imaging Technologist: The Complete Survival Guide",
    slug: "new-grad/imaging/first-year-survival-guide",
    profession: "imaging",
    guideType: "survival-guide",
    category: "First Year Guide",
    summary: "Essential guidance for new diagnostic imaging technologists navigating their first year, from positioning mastery to radiation safety.",
    seoTitle: "New Grad Imaging Tech First Year Survival Guide | NurseNest",
    seoDescription: "Navigate your first year as a new imaging technologist. Covers patient positioning, radiation safety, image quality, and building clinical confidence.",
    seoKeywords: ["new grad imaging tech", "first year radiology", "imaging orientation", "radiography career"],
    tags: ["imaging", "new-grad", "survival-guide", "first-year"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How do I position a difficult or immobile patient?", answer: "Communicate clearly with the patient about what you need. Use creative positioning with sponges and sandbags. Consider adapting the tube angle rather than moving the patient when possible. Ask for help from colleagues when needed." },
      { question: "What if I am unsure about exposure settings?", answer: "Start with technique charts established by your department. Use automatic exposure control when available. Review images immediately and repeat if necessary. Consult with senior techs and use dose reference levels as benchmarks." },
      { question: "How do I manage radiation dose for pediatric patients?", answer: "Follow ALARA principles strictly. Use pediatric-specific protocols with reduced exposure parameters. Shield appropriately. Communicate with the child and parent to minimize repeat exposures." },
    ],
  },
  {
    title: "Your First Year as a New Graduate Occupational Therapist: The Complete Survival Guide",
    slug: "new-grad/occupational-therapy/first-year-survival-guide",
    profession: "occupational-therapy",
    guideType: "survival-guide",
    category: "First Year Guide",
    summary: "Navigate your first year as an occupational therapist with practical guidance on assessments, treatment planning, and building clinical confidence.",
    seoTitle: "New Grad OT First Year Survival Guide | NurseNest",
    seoDescription: "Your complete guide to the first year as a new occupational therapist. Covers assessments, treatment planning, documentation, and career development.",
    seoKeywords: ["new grad OT", "first year occupational therapy", "OT orientation", "occupational therapy career"],
    tags: ["occupational-therapy", "new-grad", "survival-guide", "first-year"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How do I manage my caseload productively?", answer: "Start by tracking your time for the first few weeks to identify inefficiencies. Group patients by location when possible. Develop templates for common documentation. Set realistic daily goals and adjust based on patient complexity." },
      { question: "Which standardized assessments should I learn first?", answer: "Focus on the assessments most used in your setting. For acute care, learn the FIM and Barthel Index. For pediatrics, master the PDMS-2 or BOT-2. For outpatient, start with the COPM and grip strength testing." },
      { question: "How do I set meaningful OT goals?", answer: "Use the SMART framework and make goals occupation-based rather than component-based. Ask clients what matters most to them. Goals should reflect functional outcomes the client can relate to, such as 'independently prepare a simple meal' rather than 'improve grip strength.'" },
    ],
  },
];

const CLINICAL_SKILLS_GUIDES: SeedGuide[] = [
  {
    title: "How to Give Report: Mastering SBAR Communication for New Graduates",
    slug: "new-grad/clinical-skills/giving-report-sbar",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Communication",
    summary: "Master the SBAR framework for giving clear, concise shift reports. Includes templates, common mistakes, and tips from experienced nurses.",
    seoTitle: "How to Give Nursing Report Using SBAR | New Grad Guide",
    seoDescription: "Learn how to give a clear, structured nursing report using the SBAR framework. Includes templates, common mistakes, and expert tips for new graduate nurses.",
    seoKeywords: ["SBAR report", "nursing handoff", "shift report", "giving report new nurse", "SBAR communication"],
    tags: ["clinical-skills", "communication", "SBAR", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How long should a bedside report take per patient?", answer: "Aim for 3-5 minutes per patient. Include essential safety information, current status, pending tasks, and family concerns. Practice keeping reports concise while covering critical details." },
      { question: "What information should I always include in a report?", answer: "Include patient identification, primary diagnosis, code status, allergies, IV access and fluids, recent vital sign trends, medications due, pending labs or procedures, and any safety concerns." },
    ],
  },
  {
    title: "Managing Multiple Patients: Prioritization Strategies for New Graduates",
    slug: "new-grad/clinical-skills/managing-multiple-patients",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Time Management",
    summary: "Learn proven strategies for managing 4-6 patients safely, including prioritization frameworks, delegation principles, and time-blocking techniques.",
    seoTitle: "Managing Multiple Patients as a New Nurse | NurseNest",
    seoDescription: "Proven strategies for new graduate nurses managing multiple patients. Covers prioritization frameworks, delegation, time-blocking, and staying organized on shift.",
    seoKeywords: ["managing multiple patients", "nurse prioritization", "time management nursing", "new nurse organization"],
    tags: ["clinical-skills", "time-management", "prioritization", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How do I prioritize when everything feels urgent?", answer: "Use the ABCs (Airway, Breathing, Circulation) hierarchy. Differentiate between what is urgent (needs action now) versus important (needs action today). Delegate tasks appropriately and communicate delays to patients." },
      { question: "When should I delegate versus do it myself?", answer: "Delegate tasks within the scope of the team member's practice. Retain tasks requiring nursing assessment, critical thinking, or clinical judgment. Always follow the Five Rights of Delegation." },
    ],
  },
  {
    title: "How to Prioritize Tasks on a Busy Shift: A Framework for New Graduates",
    slug: "new-grad/clinical-skills/task-prioritization",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Time Management",
    summary: "A practical framework for prioritizing nursing tasks using Maslow's hierarchy, ABCs, and the Eisenhower matrix adapted for clinical settings.",
    seoTitle: "Task Prioritization for New Nurses | Clinical Guide",
    seoDescription: "Learn how to prioritize nursing tasks effectively using clinical frameworks. Covers Maslow's hierarchy, ABCs, delegation, and time management strategies.",
    seoKeywords: ["nursing task prioritization", "clinical prioritization", "new nurse time management", "nursing workflow"],
    tags: ["clinical-skills", "prioritization", "workflow", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How do I decide which patient to see first?", answer: "Start with the most unstable patient or the one with the most time-sensitive need. Consider scheduled medications, pending procedures, and patient acuity. Your charge nurse can help you prioritize initially." },
    ],
  },
  {
    title: "Handling Your First Emergency: A Guide for New Healthcare Graduates",
    slug: "new-grad/clinical-skills/handling-emergencies",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Emergency Response",
    summary: "Build confidence in recognizing and responding to emergency situations including code blues, rapid responses, and patient deterioration.",
    seoTitle: "Handling Emergencies as a New Nurse | NurseNest Guide",
    seoDescription: "Build confidence in handling emergencies as a new nurse. Covers code blue response, rapid response triggers, patient deterioration recognition, and post-event debriefing.",
    seoKeywords: ["new nurse emergency", "code blue response", "rapid response", "patient deterioration", "emergency nursing"],
    tags: ["clinical-skills", "emergency", "code-blue", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What should I do first when I find an unresponsive patient?", answer: "Call for help immediately. Check for responsiveness, call a code blue, begin CPR if no pulse is detected, and connect the AED. Stay with the patient and designate someone to bring the crash cart." },
      { question: "What are the early warning signs of patient deterioration?", answer: "Watch for rising heart rate, falling blood pressure, increasing respiratory rate, decreasing oxygen saturation, changes in level of consciousness, new confusion, and reduced urine output. Use early warning scoring systems when available." },
    ],
  },
  {
    title: "Clinical Documentation Best Practices for New Healthcare Graduates",
    slug: "new-grad/clinical-skills/documentation-best-practices",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Documentation",
    summary: "Master efficient, accurate, and legally sound clinical documentation including charting tips, common pitfalls, and time-saving strategies.",
    seoTitle: "Clinical Documentation Tips for New Nurses | NurseNest",
    seoDescription: "Learn clinical documentation best practices for new nurses. Covers charting efficiency, legal considerations, EHR tips, and common documentation mistakes to avoid.",
    seoKeywords: ["nursing documentation", "clinical charting", "EHR tips", "nursing documentation best practices"],
    tags: ["clinical-skills", "documentation", "charting", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How often should I document assessments?", answer: "Follow your facility's policy, but typically full assessments are documented at the start of each shift with focused reassessments every 4 hours or with any change in condition. Document interventions and outcomes in real time." },
      { question: "What should I never write in a patient chart?", answer: "Avoid subjective opinions, derogatory comments, references to incident reports, blame statements, or assumptions about patient behavior. Chart objective findings, interventions, and patient responses factually." },
    ],
  },
  {
    title: "Shift Organization Systems: Brain Sheets and Workflow Templates for New Graduates",
    slug: "new-grad/clinical-skills/shift-organization",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Organization",
    summary: "Create effective shift organization systems using brain sheets, time-blocking, and workflow templates to stay on track during busy shifts.",
    seoTitle: "Shift Organization for New Nurses | Brain Sheet Templates",
    seoDescription: "Master shift organization with brain sheet templates, time-blocking strategies, and workflow systems designed for new graduate nurses.",
    seoKeywords: ["nursing brain sheet", "shift organization", "nurse workflow", "time management nursing", "nursing templates"],
    tags: ["clinical-skills", "organization", "brain-sheet", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What should be on a nursing brain sheet?", answer: "Include patient name, room number, diagnosis, code status, allergies, IV access, medications due, labs pending, procedures scheduled, and a section for notes. Customize based on your unit type." },
    ],
  },
  {
    title: "Effective Communication with Senior Staff: A New Graduate's Guide",
    slug: "new-grad/clinical-skills/communication-with-senior-staff",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Communication",
    summary: "Navigate professional communication with experienced colleagues, preceptors, and physicians as a new graduate.",
    seoTitle: "Communicating with Senior Staff as a New Nurse | Guide",
    seoDescription: "Learn effective communication strategies with senior nurses, physicians, and preceptors. Build professional relationships and advocate for your patients confidently.",
    seoKeywords: ["new nurse communication", "nurse-physician communication", "preceptor relationship", "professional communication nursing"],
    tags: ["clinical-skills", "communication", "professional-development", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How do I speak up when I disagree with a physician's order?", answer: "Use assertive communication. State your concern clearly with supporting data. Use phrases like 'I am concerned because...' or 'The patient's condition has changed because...' Escalate through the chain of command if needed." },
    ],
  },
  {
    title: "Building Confidence in Your First Clinical Role: Overcoming Imposter Syndrome",
    slug: "new-grad/clinical-skills/building-confidence",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Professional Development",
    summary: "Practical strategies for building clinical confidence, overcoming imposter syndrome, and developing professional identity as a new healthcare graduate.",
    seoTitle: "Building Confidence as a New Nurse | Overcoming Imposter Syndrome",
    seoDescription: "Overcome imposter syndrome and build confidence in your first clinical role. Practical strategies for new graduate nurses and healthcare professionals.",
    seoKeywords: ["new nurse confidence", "imposter syndrome nursing", "new grad anxiety", "building clinical confidence"],
    tags: ["clinical-skills", "confidence", "imposter-syndrome", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "Is it normal to feel like I am not ready?", answer: "Absolutely. Research shows that 80-90% of new graduate nurses experience imposter syndrome. The transition from student to practitioner is a well-documented phenomenon called 'reality shock.' These feelings typically improve within 6-12 months." },
    ],
  },
  {
    title: "Medication Safety for New Graduates: Preventing Errors and Building Safe Practice",
    slug: "new-grad/clinical-skills/medication-safety",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Patient Safety",
    summary: "Essential medication safety practices including the rights of medication administration, high-alert medications, and error prevention strategies.",
    seoTitle: "Medication Safety for New Nurses | Error Prevention Guide",
    seoDescription: "Learn medication safety practices for new nurses. Covers the rights of medication administration, high-alert medications, and strategies to prevent medication errors.",
    seoKeywords: ["medication safety", "medication errors nursing", "new nurse medication", "drug safety", "medication administration"],
    tags: ["clinical-skills", "medication-safety", "patient-safety", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What are the most common medication errors new nurses make?", answer: "Wrong time, wrong dose, and omission errors are most common. Contributing factors include interruptions, unfamiliarity with medications, look-alike sound-alike drugs, and inadequate patient identification." },
    ],
  },
  {
    title: "Infection Control Essentials for New Healthcare Graduates",
    slug: "new-grad/clinical-skills/infection-control",
    profession: "nursing",
    guideType: "clinical-skills",
    category: "Patient Safety",
    summary: "Master infection control practices including hand hygiene, PPE use, isolation precautions, and preventing healthcare-associated infections.",
    seoTitle: "Infection Control for New Nurses | Essential Practices",
    seoDescription: "Master infection control practices for new healthcare graduates. Covers hand hygiene, PPE, isolation precautions, and preventing healthcare-associated infections.",
    seoKeywords: ["infection control nursing", "hand hygiene", "PPE nursing", "isolation precautions", "new nurse infection control"],
    tags: ["clinical-skills", "infection-control", "patient-safety", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "When should I use standard precautions versus transmission-based precautions?", answer: "Standard precautions apply to ALL patient encounters. Transmission-based precautions (contact, droplet, airborne) are added based on the suspected or confirmed pathogen. Always verify isolation orders and post signage appropriately." },
    ],
  },
];

const UNIT_GUIDES: SeedGuide[] = [
  {
    title: "New Graduate Guide to Medical-Surgical Nursing",
    slug: "new-grad/unit-guides/med-surg",
    profession: "nursing",
    guideType: "unit-guide",
    category: "Med-Surg",
    summary: "Your complete guide to starting your career on a med-surg unit. Covers patient load management, common conditions, and unit-specific skills.",
    seoTitle: "Med-Surg Nursing Guide for New Graduates | NurseNest",
    seoDescription: "Start your med-surg nursing career with confidence. Covers patient management, common conditions, prioritization, and tips for new graduate nurses.",
    seoKeywords: ["med-surg nursing", "new grad med-surg", "medical surgical nursing", "med-surg orientation"],
    tags: ["unit-guide", "med-surg", "nursing", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How many patients will I have on a med-surg unit?", answer: "New graduates typically start with 2-3 patients during orientation and gradually increase to 4-6 patients independently. Staffing ratios vary by facility and jurisdiction." },
      { question: "What are the most common diagnoses on med-surg?", answer: "Common diagnoses include post-surgical patients, pneumonia, COPD exacerbations, heart failure, diabetes management, GI bleeds, UTIs, cellulitis, and hip/knee replacements." },
    ],
  },
  {
    title: "New Graduate Guide to Emergency Department Nursing",
    slug: "new-grad/unit-guides/emergency-department",
    profession: "nursing",
    guideType: "unit-guide",
    category: "Emergency",
    summary: "Navigate your first year in the emergency department with confidence. Covers triage, trauma response, and managing the fast-paced ED environment.",
    seoTitle: "Emergency Department Nursing Guide for New Grads | NurseNest",
    seoDescription: "Start your ED nursing career with confidence. Covers triage principles, trauma response, time management, and tips for new graduate emergency nurses.",
    seoKeywords: ["emergency nursing", "new grad ED nurse", "emergency department orientation", "triage nursing"],
    tags: ["unit-guide", "emergency", "nursing", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "Can new graduates work in the emergency department?", answer: "Yes, many hospitals offer new graduate ED residency programs with extended orientation periods of 12-16 weeks. These programs provide structured support for the transition to emergency nursing." },
    ],
  },
  {
    title: "New Graduate Guide to Critical Care / ICU Nursing",
    slug: "new-grad/unit-guides/critical-care",
    profession: "nursing",
    guideType: "unit-guide",
    category: "Critical Care",
    summary: "Your guide to starting in the ICU as a new graduate, including hemodynamic monitoring, ventilator care, and managing critically ill patients.",
    seoTitle: "ICU Nursing Guide for New Graduates | NurseNest",
    seoDescription: "Start your ICU nursing career with this comprehensive guide. Covers hemodynamic monitoring, ventilator care, vasoactive drips, and critical care skills.",
    seoKeywords: ["ICU nursing new grad", "critical care orientation", "new nurse ICU", "ICU nursing guide"],
    tags: ["unit-guide", "critical-care", "ICU", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "Can new graduates start in the ICU?", answer: "Yes, many ICUs offer new graduate residency programs with extended orientation (often 16-24 weeks). These programs pair you with experienced preceptors and include structured didactic education alongside clinical practice." },
    ],
  },
  {
    title: "New Graduate Guide to Long-Term Care Nursing",
    slug: "new-grad/unit-guides/long-term-care",
    profession: "nursing",
    guideType: "unit-guide",
    category: "Long-Term Care",
    summary: "Navigate your first role in long-term care with guidance on resident care, medication management, and working with interdisciplinary teams.",
    seoTitle: "Long-Term Care Nursing Guide for New Grads | NurseNest",
    seoDescription: "Start your long-term care nursing career with confidence. Covers resident management, medication passes, documentation, and interdisciplinary collaboration.",
    seoKeywords: ["long-term care nursing", "new grad LTC", "nursing home orientation", "geriatric nursing"],
    tags: ["unit-guide", "long-term-care", "nursing", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How many residents will I care for in LTC?", answer: "In long-term care, you may be responsible for 20-30 or more residents, depending on the facility and your role. The care model relies heavily on delegation to PSWs/CNAs while you manage assessments, medications, and care plans." },
    ],
  },
  {
    title: "New Graduate Guide to Pediatric Nursing",
    slug: "new-grad/unit-guides/pediatrics",
    profession: "nursing",
    guideType: "unit-guide",
    category: "Pediatrics",
    summary: "Essential guidance for new nurses starting in pediatrics, covering developmental considerations, family-centered care, and pediatric assessment.",
    seoTitle: "Pediatric Nursing Guide for New Graduates | NurseNest",
    seoDescription: "Start your pediatric nursing career with confidence. Covers developmental considerations, family-centered care, pediatric assessment, and medication safety.",
    seoKeywords: ["pediatric nursing new grad", "new nurse pediatrics", "pediatric assessment", "family-centered care"],
    tags: ["unit-guide", "pediatrics", "nursing", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How is pediatric nursing different from adult nursing?", answer: "Pediatric nursing requires age-specific assessment techniques, weight-based medication dosing, developmental considerations, and extensive family involvement. Communication approaches differ significantly across age groups." },
    ],
  },
  {
    title: "New Graduate Guide to Labor and Delivery Nursing",
    slug: "new-grad/unit-guides/labor-and-delivery",
    profession: "nursing",
    guideType: "unit-guide",
    category: "L&D",
    summary: "Navigate your first year in labor and delivery with guidance on fetal monitoring, labor stages, and managing obstetric emergencies.",
    seoTitle: "Labor and Delivery Nursing Guide for New Grads | NurseNest",
    seoDescription: "Start your L&D nursing career with confidence. Covers fetal monitoring, labor stages, C-section care, and obstetric emergency management.",
    seoKeywords: ["labor and delivery nursing", "new grad L&D", "obstetric nursing", "fetal monitoring"],
    tags: ["unit-guide", "labor-delivery", "nursing", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "Do new graduates get hired into L&D?", answer: "Some hospitals offer new graduate L&D positions with extended orientations. However, many L&D units prefer 1-2 years of med-surg experience first. Look for facilities with specific new grad L&D residency programs." },
    ],
  },
  {
    title: "New Graduate Guide to Operating Room Nursing",
    slug: "new-grad/unit-guides/operating-room",
    profession: "nursing",
    guideType: "unit-guide",
    category: "OR",
    summary: "Your guide to starting as a perioperative nurse, covering scrub and circulator roles, surgical safety, and OR-specific protocols.",
    seoTitle: "Operating Room Nursing Guide for New Graduates | NurseNest",
    seoDescription: "Start your OR nursing career with confidence. Covers scrub and circulator roles, surgical safety checklists, sterile technique, and perioperative care.",
    seoKeywords: ["OR nursing new grad", "perioperative nursing", "operating room orientation", "surgical nursing"],
    tags: ["unit-guide", "operating-room", "nursing", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What is the difference between scrub and circulating nurse roles?", answer: "The scrub nurse maintains the sterile field, passes instruments, and counts sponges and sharps. The circulating nurse manages the room, documents, coordinates with anesthesia, and serves as the patient's advocate." },
    ],
  },
  {
    title: "New Graduate Guide to Mental Health Nursing",
    slug: "new-grad/unit-guides/mental-health",
    profession: "nursing",
    guideType: "unit-guide",
    category: "Mental Health",
    summary: "Navigate your first role in psychiatric/mental health nursing with guidance on therapeutic communication, safety, and managing behavioral crises.",
    seoTitle: "Mental Health Nursing Guide for New Graduates | NurseNest",
    seoDescription: "Start your mental health nursing career with confidence. Covers therapeutic communication, de-escalation, safety protocols, and psychiatric assessment.",
    seoKeywords: ["mental health nursing", "psychiatric nursing new grad", "therapeutic communication", "behavioral crisis"],
    tags: ["unit-guide", "mental-health", "nursing", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "Is mental health nursing safe for new graduates?", answer: "Mental health units prioritize staff safety with training in de-escalation, non-violent crisis intervention, and safety protocols. Most facilities provide comprehensive orientation and ongoing training for new nurses." },
    ],
  },
];

const CAREER_DEVELOPMENT_GUIDES: SeedGuide[] = [
  {
    title: "How to Specialize in Critical Care Nursing: A Career Roadmap",
    slug: "new-grad/career/specializing-critical-care",
    profession: "nursing",
    guideType: "career-development",
    category: "Specialization",
    summary: "A step-by-step career roadmap for nurses looking to specialize in critical care, from building foundational skills to obtaining CCRN certification.",
    seoTitle: "How to Specialize in Critical Care Nursing | Career Guide",
    seoDescription: "Plan your path to ICU specialization. Covers building skills, certification programs, CCRN preparation, and career advancement in critical care nursing.",
    seoKeywords: ["critical care nursing career", "CCRN certification", "ICU specialization", "nursing career advancement"],
    tags: ["career-development", "critical-care", "CCRN", "nursing"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How long should I wait before applying to ICU?", answer: "Some hospitals hire new graduates directly into ICU programs. Otherwise, 6-12 months of med-surg or step-down experience can strengthen your foundation. Focus on mastering assessment skills and hemodynamic concepts." },
      { question: "What certifications help for ICU nursing?", answer: "The CCRN (Critical Care Registered Nurse) is the gold standard. ACLS and PALS are typically required. Additional certifications like CMC (Cardiac Medicine Certification) can strengthen your expertise." },
    ],
  },
  {
    title: "How to Become a Nurse Practitioner: The Complete Career Guide",
    slug: "new-grad/career/becoming-nurse-practitioner",
    profession: "nursing",
    guideType: "career-development",
    category: "Advancement",
    summary: "Plan your journey from RN to Nurse Practitioner, including graduate program options, clinical hours, specialization paths, and licensing requirements.",
    seoTitle: "How to Become a Nurse Practitioner | Career Roadmap",
    seoDescription: "Plan your NP career path. Covers graduate program selection, clinical hours, specialization options, licensing, and what to expect in nurse practitioner practice.",
    seoKeywords: ["become nurse practitioner", "NP career path", "nursing graduate school", "nurse practitioner education"],
    tags: ["career-development", "nurse-practitioner", "graduate-education", "nursing"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How long does it take to become an NP?", answer: "After obtaining your RN, NP programs typically take 2-4 years depending on whether you pursue a master's (MSN) or doctoral (DNP) degree. Most programs recommend 1-2 years of clinical experience before applying." },
      { question: "What specializations are available for NPs?", answer: "Common NP specializations include Family Practice (FNP), Adult-Gerontology (AGPCNP/AGACNP), Pediatric (PNP), Psychiatric-Mental Health (PMHNP), Neonatal (NNP), and Women's Health (WHNP)." },
    ],
  },
  {
    title: "RPN to RN Bridge Program Guide: Advancing Your Nursing Career",
    slug: "new-grad/career/rpn-to-rn-bridge",
    profession: "nursing",
    guideType: "career-development",
    category: "Advancement",
    summary: "Navigate the RPN/LPN to RN bridge program pathway, including program options, study strategies, and what to expect during the transition.",
    seoTitle: "RPN to RN Bridge Program Guide | Career Advancement",
    seoDescription: "Navigate the RPN to RN bridge program pathway. Covers program options, admission requirements, study strategies, and career benefits of advancing from RPN to RN.",
    seoKeywords: ["RPN to RN bridge", "LPN to RN", "nursing bridge program", "nursing career advancement"],
    tags: ["career-development", "bridge-program", "advancement", "nursing"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How long is an RPN to RN bridge program?", answer: "Most bridge programs take 2-3 years of full-time study or 3-4 years part-time. Some accelerated programs can be completed in 12-18 months. Many programs offer flexible scheduling for working RPNs." },
    ],
  },
  {
    title: "Advancing Your Career as a Respiratory Therapist (RRT)",
    slug: "new-grad/career/advancing-as-rrt",
    profession: "respiratory-therapy",
    guideType: "career-development",
    category: "Advancement",
    summary: "Explore career advancement opportunities in respiratory therapy including neonatal specialization, pulmonary function, and leadership roles.",
    seoTitle: "Respiratory Therapy Career Advancement Guide | NurseNest",
    seoDescription: "Explore career advancement paths for respiratory therapists. Covers neonatal specialization, pulmonary function testing, leadership roles, and certification options.",
    seoKeywords: ["RRT career advancement", "respiratory therapy specialization", "respiratory therapy career", "neonatal RRT"],
    tags: ["career-development", "respiratory-therapy", "advancement", "specialization"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What certifications can I pursue as an RRT?", answer: "Key certifications include NPS (Neonatal/Pediatric Specialist), ACCS (Adult Critical Care Specialist), SDS (Sleep Disorders Specialist), and RPFT (Registered Pulmonary Function Technologist)." },
    ],
  },
  {
    title: "PCP to ACP Transition Guide: Advancing as a Paramedic",
    slug: "new-grad/career/pcp-to-acp-transition",
    profession: "paramedic",
    guideType: "career-development",
    category: "Advancement",
    summary: "Plan your transition from Primary Care Paramedic to Advanced Care Paramedic with guidance on programs, clinical requirements, and expanded scope.",
    seoTitle: "PCP to ACP Paramedic Transition Guide | NurseNest",
    seoDescription: "Advance from Primary Care Paramedic to Advanced Care Paramedic. Covers bridging programs, clinical requirements, expanded scope, and career opportunities.",
    seoKeywords: ["PCP to ACP", "paramedic advancement", "advanced care paramedic", "paramedic career"],
    tags: ["career-development", "paramedic", "advancement", "ACP"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How long does the PCP to ACP transition take?", answer: "ACP programs typically require 1-2 years of additional education beyond PCP. Most programs recommend at least 1-2 years of field experience before applying. Clinical preceptorship requirements vary by program." },
    ],
  },
  {
    title: "Becoming a Flight Paramedic: Requirements, Training, and Career Path",
    slug: "new-grad/career/becoming-flight-paramedic",
    profession: "paramedic",
    guideType: "career-development",
    category: "Specialization",
    summary: "Explore the path to becoming a flight paramedic, including required certifications, physical requirements, and what to expect in air medical services.",
    seoTitle: "How to Become a Flight Paramedic | Career Guide",
    seoDescription: "Plan your path to becoming a flight paramedic. Covers certifications, experience requirements, training programs, and what to expect in air medical transport.",
    seoKeywords: ["flight paramedic", "air ambulance paramedic", "HEMS paramedic", "flight paramedic career"],
    tags: ["career-development", "paramedic", "flight-paramedic", "specialization"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "How much experience do I need to become a flight paramedic?", answer: "Most air medical services require 3-5 years of ALS field experience, with preference for critical care transport experience. You typically need ACP/CCP certification, ACLS, PALS, and often FP-C or CCEMTP certification." },
    ],
  },
];

const CLINICAL_SCENARIOS: SeedGuide[] = [
  {
    title: "Clinical Scenario: Recognizing and Responding to Patient Deterioration",
    slug: "new-grad/scenarios/patient-deterioration",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Patient Safety",
    summary: "Practice recognizing early signs of patient deterioration and learn the appropriate escalation pathway using a realistic clinical scenario.",
    seoTitle: "Patient Deterioration Scenario for New Nurses | NurseNest",
    seoDescription: "Practice recognizing patient deterioration with this clinical scenario. Learn early warning signs, escalation pathways, and appropriate nursing interventions.",
    seoKeywords: ["patient deterioration", "early warning signs", "rapid response", "clinical scenario nursing"],
    tags: ["clinical-scenario", "patient-safety", "deterioration", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What is the most reliable early sign of deterioration?", answer: "A rising respiratory rate is often the earliest and most reliable indicator of clinical deterioration. It can precede other vital sign changes by 6-12 hours. Always take respiratory rate changes seriously." },
    ],
  },
  {
    title: "Clinical Scenario: Managing a Medication Error",
    slug: "new-grad/scenarios/medication-error",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Patient Safety",
    summary: "Walk through a medication error scenario and learn the correct response, including reporting, patient monitoring, and preventing future errors.",
    seoTitle: "Medication Error Scenario for New Nurses | NurseNest",
    seoDescription: "Learn how to respond to a medication error with this clinical scenario. Covers immediate actions, reporting requirements, patient monitoring, and error prevention.",
    seoKeywords: ["medication error", "medication safety scenario", "nursing error response", "clinical scenario"],
    tags: ["clinical-scenario", "medication-safety", "patient-safety", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "Will I lose my license over a medication error?", answer: "A single, honest medication error that is properly reported and managed is unlikely to result in license revocation. Regulatory bodies focus on patterns of practice, willful negligence, and failure to report. Transparency and learning from errors are valued." },
    ],
  },
  {
    title: "Clinical Scenario: Dealing with an Aggressive or Agitated Patient",
    slug: "new-grad/scenarios/aggressive-patient",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Safety",
    summary: "Practice de-escalation techniques and safety strategies for managing aggressive or agitated patients in clinical settings.",
    seoTitle: "Managing Aggressive Patients | Clinical Scenario Guide",
    seoDescription: "Learn de-escalation techniques for aggressive patients with this clinical scenario. Covers verbal strategies, safety protocols, and when to call for backup.",
    seoKeywords: ["aggressive patient", "de-escalation nursing", "patient aggression", "clinical safety scenario"],
    tags: ["clinical-scenario", "safety", "de-escalation", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What is the first thing I should do with an agitated patient?", answer: "Ensure your own safety first. Position yourself near an exit. Speak calmly using a low, steady voice. Acknowledge the patient's feelings. Remove potential weapons from the environment. Call for additional support early." },
    ],
  },
  {
    title: "Clinical Scenario: Responding to a Patient Fall",
    slug: "new-grad/scenarios/patient-fall",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Patient Safety",
    summary: "Learn the correct response to a patient fall, including immediate assessment, post-fall protocol, documentation, and prevention strategies.",
    seoTitle: "Patient Fall Response Scenario for New Nurses | NurseNest",
    seoDescription: "Learn the correct response to a patient fall with this clinical scenario. Covers immediate assessment, post-fall protocol, documentation, and fall prevention.",
    seoKeywords: ["patient fall", "fall response nursing", "fall prevention", "clinical scenario"],
    tags: ["clinical-scenario", "patient-safety", "falls", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What is the immediate priority after a patient falls?", answer: "Do not move the patient until you assess for injuries. Check level of consciousness, pain, and visible injuries. Assess vitals and neurological status. Follow your facility's post-fall protocol including physician notification and increased monitoring." },
    ],
  },
  {
    title: "Clinical Scenario: Managing Acute Respiratory Distress",
    slug: "new-grad/scenarios/respiratory-distress",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Emergency",
    summary: "Practice assessing and managing a patient in acute respiratory distress, including oxygen therapy, positioning, and escalation decisions.",
    seoTitle: "Respiratory Distress Scenario for New Nurses | NurseNest",
    seoDescription: "Practice managing acute respiratory distress with this clinical scenario. Covers assessment, oxygen therapy, positioning, and when to call for help.",
    seoKeywords: ["respiratory distress", "acute dyspnea", "oxygen therapy nursing", "clinical scenario"],
    tags: ["clinical-scenario", "respiratory", "emergency", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What oxygen device should I start with for a dyspneic patient?", answer: "Start with a nasal cannula at 2-4 L/min for mild distress. Escalate to a simple face mask (6-10 L/min), then non-rebreather (10-15 L/min) if needed. For severe distress with SpO2 below 90%, apply a non-rebreather and call for help immediately." },
    ],
  },
  {
    title: "Clinical Scenario: Recognizing and Managing Sepsis",
    slug: "new-grad/scenarios/sepsis-recognition",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Emergency",
    summary: "Practice early sepsis recognition using screening tools and learn the time-sensitive interventions in the first hour of suspected sepsis.",
    seoTitle: "Sepsis Recognition Scenario for New Nurses | NurseNest",
    seoDescription: "Practice early sepsis recognition and management with this clinical scenario. Covers screening tools, hour-1 bundle, and time-sensitive nursing interventions.",
    seoKeywords: ["sepsis recognition", "sepsis management", "sepsis bundle", "clinical scenario nursing"],
    tags: ["clinical-scenario", "sepsis", "emergency", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What are the key components of the hour-1 sepsis bundle?", answer: "The Surviving Sepsis Campaign hour-1 bundle includes: measure lactate, obtain blood cultures, administer broad-spectrum antibiotics, begin fluid resuscitation (30 mL/kg crystalloid for hypotension or lactate >= 4), and apply vasopressors if hypotension persists." },
    ],
  },
  {
    title: "Clinical Scenario: Managing Post-Operative Complications",
    slug: "new-grad/scenarios/post-op-complications",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Surgical",
    summary: "Practice recognizing and responding to common post-operative complications including hemorrhage, infection, DVT, and respiratory complications.",
    seoTitle: "Post-Op Complications Scenario for New Nurses | NurseNest",
    seoDescription: "Learn to manage post-operative complications with this clinical scenario. Covers hemorrhage, infection, DVT, atelectasis, and nursing interventions.",
    seoKeywords: ["post-op complications", "surgical nursing", "post-operative care", "clinical scenario"],
    tags: ["clinical-scenario", "surgical", "post-op", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What are the earliest signs of post-op hemorrhage?", answer: "Rising heart rate (often the first sign), falling blood pressure, increased wound drainage, pallor, diaphoresis, restlessness, and decreasing urine output. Check surgical dressings and drains frequently in the first 24 hours." },
    ],
  },
  {
    title: "Clinical Scenario: Hypoglycemia Recognition and Management",
    slug: "new-grad/scenarios/hypoglycemia-management",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Medical",
    summary: "Practice recognizing and treating hypoglycemia in hospitalized patients, including the Rule of 15 and when to use IV dextrose.",
    seoTitle: "Hypoglycemia Management Scenario | New Nurse Guide",
    seoDescription: "Practice hypoglycemia recognition and management with this clinical scenario. Covers the Rule of 15, IV dextrose protocols, and glucose monitoring.",
    seoKeywords: ["hypoglycemia management", "low blood sugar nursing", "diabetes management", "clinical scenario"],
    tags: ["clinical-scenario", "diabetes", "medical", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What is the Rule of 15 for hypoglycemia?", answer: "Give 15 grams of fast-acting carbohydrate, wait 15 minutes, and recheck blood glucose. If still below target, repeat the process. Once blood glucose normalizes, provide a snack with protein and complex carbohydrates." },
    ],
  },
  {
    title: "Clinical Scenario: Chest Pain Assessment and Response",
    slug: "new-grad/scenarios/chest-pain-assessment",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Cardiac",
    summary: "Practice the systematic assessment and response to a patient presenting with chest pain, including ACS protocols and nursing interventions.",
    seoTitle: "Chest Pain Assessment Scenario for New Nurses | NurseNest",
    seoDescription: "Practice chest pain assessment with this clinical scenario. Covers systematic evaluation, ACS protocols, 12-lead ECG, and priority nursing interventions.",
    seoKeywords: ["chest pain assessment", "ACS nursing", "cardiac assessment", "clinical scenario nursing"],
    tags: ["clinical-scenario", "cardiac", "chest-pain", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "What are the priority interventions for chest pain?", answer: "Remember MONA: Morphine (if ordered), Oxygen (if SpO2 below 94%), Nitroglycerin (if systolic BP above 90), Aspirin (if no contraindications). Obtain a 12-lead ECG within 10 minutes and notify the provider immediately." },
    ],
  },
  {
    title: "Clinical Scenario: Responding to Anaphylaxis",
    slug: "new-grad/scenarios/anaphylaxis-response",
    profession: "nursing",
    guideType: "clinical-scenario",
    category: "Emergency",
    summary: "Practice recognizing and responding to anaphylaxis, including epinephrine administration, airway management, and post-reaction monitoring.",
    seoTitle: "Anaphylaxis Response Scenario for New Nurses | NurseNest",
    seoDescription: "Practice anaphylaxis recognition and response with this clinical scenario. Covers epinephrine administration, airway management, and post-reaction care.",
    seoKeywords: ["anaphylaxis response", "allergic reaction nursing", "epinephrine administration", "clinical scenario"],
    tags: ["clinical-scenario", "emergency", "anaphylaxis", "new-grad"],
    authorName: "NurseNest Clinical Team",
    content: [],
    sections: [],
    faqItems: [
      { question: "Where do I administer epinephrine for anaphylaxis?", answer: "Administer epinephrine 0.3-0.5 mg (1:1000) intramuscularly in the mid-outer thigh (vastus lateralis). This location provides the fastest absorption. Repeat every 5-15 minutes if symptoms persist. IV epinephrine requires continuous monitoring." },
    ],
  },
];

function generateSectionContent(guide: SeedGuide): SeedGuide {
  const type = guide.guideType;
  const profession = guide.profession;
  const title = guide.title;

  let sectionData: { id: string; title: string; content: string; items?: string[] }[] = [];

  if (type === "survival-guide") {
    sectionData = [
      {
        id: "what-to-expect",
        title: "What Your First Year Looks Like",
        content: `Your first year as a new graduate ${profession === "nursing" ? "nurse" : profession === "paramedic" ? "paramedic" : profession === "respiratory-therapy" ? "respiratory therapist" : profession === "mlt" ? "medical laboratory technologist" : profession === "imaging" ? "imaging technologist" : "occupational therapist"} is a period of intense growth and transformation. The transition from student to practicing clinician is one of the most significant professional experiences you will have. During orientation, you will be paired with an experienced preceptor who will guide you through unit-specific protocols, documentation systems, and clinical workflows. Expect to feel overwhelmed at times; this is a normal part of the learning curve. Most new graduates report that the first 3-6 months are the most challenging, with confidence steadily building through the remainder of the year.`,
        items: [
          "Orientation and preceptorship period (typically 8-16 weeks depending on setting)",
          "Gradual increase in patient/caseload responsibility",
          "Mastering documentation and electronic health record systems",
          "Developing clinical judgment through real-world experience",
          "Building professional relationships with the interdisciplinary team",
        ],
      },
      {
        id: "common-mistakes",
        title: "Common Mistakes New Graduates Make",
        content: "Being aware of common pitfalls helps you avoid them. New graduates often struggle with certain patterns that experienced clinicians have learned to navigate. Recognizing these tendencies early allows you to develop strategies to overcome them before they become habits.",
        items: [
          "Not asking for help when unsure, leading to delayed care or errors",
          "Trying to remember everything instead of using reference resources",
          "Poor time management resulting in rushed tasks at end of shift",
          "Inadequate documentation of assessments and interventions",
          "Neglecting self-care and work-life balance during the transition period",
          "Taking criticism personally rather than as professional growth feedback",
          "Comparing your progress to other new graduates unfairly",
        ],
      },
      {
        id: "shift-organization",
        title: "Shift Organization Strategies",
        content: "Effective shift organization is one of the strongest predictors of success for new graduates. Developing a consistent workflow from the first week of practice helps build habits that sustain you throughout your career. Many experienced clinicians still use variations of systems they developed in their first year.",
        items: [
          "Create a personalized brain sheet or shift organizer within your first week",
          "Develop a time-blocking routine for assessments, medications, and documentation",
          "Prioritize tasks using ABC (Airway, Breathing, Circulation) hierarchy",
          "Set reminders for time-sensitive tasks using your phone or unit resources",
          "Review your patient assignments at the start of each shift before taking report",
          "Cluster care activities when possible to maximize efficiency",
        ],
      },
      {
        id: "communication",
        title: "Communication with Senior Staff",
        content: "Building effective communication skills with experienced colleagues is essential for patient safety and your professional development. Senior staff are valuable resources, but approaching them requires professionalism and preparation. Come to conversations with specific questions, relevant data, and a clear description of what you need.",
        items: [
          "Use SBAR format when communicating patient concerns",
          "Prepare before calling physicians: know the patient, the problem, and what you are asking for",
          "Ask for feedback regularly and be open to constructive criticism",
          "Build relationships by showing initiative, reliability, and willingness to learn",
          "Escalate concerns through the appropriate chain of command when needed",
        ],
      },
      {
        id: "building-confidence",
        title: "Building Confidence",
        content: "Confidence develops through deliberate practice, reflection, and accumulated experience. Research on the novice-to-expert transition shows that most healthcare professionals move from 'advanced beginner' to 'competent practitioner' within 12-18 months of practice. Be patient with yourself and recognize that competence comes before confidence. Track your achievements and celebrate milestones along the way.",
        items: [
          "Keep a professional journal documenting challenging situations and what you learned",
          "Set weekly learning goals and review them at the end of each week",
          "Seek mentorship from experienced clinicians you admire",
          "Attend continuing education opportunities and bring insights back to practice",
          "Remember that every expert was once a beginner; your growth trajectory is normal",
        ],
      },
    ];
  } else if (type === "clinical-skills") {
    sectionData = [
      {
        id: "overview",
        title: "Why This Skill Matters",
        content: `This clinical skill is fundamental to safe, effective practice. Mastering it early in your career establishes a foundation for more advanced competencies and builds confidence in your daily workflow. New graduates who prioritize developing this skill report higher job satisfaction and better patient outcomes.`,
      },
      {
        id: "step-by-step",
        title: "Step-by-Step Guidance",
        content: "Follow this structured approach to build competency systematically. Each step builds on the previous one, creating a reliable workflow that becomes second nature with practice. Focus on accuracy first, then gradually increase your speed as comfort develops.",
        items: [
          "Prepare by gathering all necessary information and resources",
          "Follow a consistent, systematic approach every time",
          "Verify accuracy through double-checking and using checklists",
          "Communicate clearly with team members throughout the process",
          "Document your actions accurately and in a timely manner",
          "Reflect on your performance and identify areas for improvement",
        ],
      },
      {
        id: "common-mistakes",
        title: "Common Mistakes to Avoid",
        content: "Even experienced clinicians occasionally fall into these patterns. Being aware of common pitfalls helps you develop habits that prevent errors and improve efficiency.",
        items: [
          "Rushing through the process without verifying critical details",
          "Failing to communicate changes to relevant team members",
          "Inconsistent documentation of assessments and interventions",
          "Not asking for help when encountering unfamiliar situations",
          "Skipping steps in established protocols to save time",
        ],
      },
      {
        id: "expert-tips",
        title: "Tips from Experienced Clinicians",
        content: "These practical insights come from clinicians with years of experience. Incorporating them into your practice can accelerate your development and help you avoid common frustrations.",
        items: [
          "Develop your own system and stick with it consistently",
          "Learn from every patient interaction, especially challenging ones",
          "Build relationships with experienced colleagues who can mentor you",
          "Stay current with evidence-based practice updates",
          "Practice the skill mentally (cognitive rehearsal) before high-stakes situations",
        ],
      },
    ];
  } else if (type === "unit-guide") {
    sectionData = [
      {
        id: "overview",
        title: "What to Expect on This Unit",
        content: "Starting on this unit as a new graduate can feel overwhelming, but understanding what to expect helps you prepare mentally and practically. Each clinical environment has unique rhythms, patient populations, and team dynamics that you will learn during orientation.",
      },
      {
        id: "essential-skills",
        title: "Essential Skills for This Setting",
        content: "Success on this unit requires developing specific competencies that may differ from what you practiced in school. Focus on building these core skills during your orientation period and first few months of independent practice.",
        items: [
          "Unit-specific assessment techniques and documentation",
          "Common medications and their nursing implications",
          "Emergency protocols specific to this patient population",
          "Communication patterns with the interdisciplinary team",
          "Technology and equipment unique to this setting",
        ],
      },
      {
        id: "day-in-life",
        title: "A Typical Day on This Unit",
        content: "Understanding the flow of a typical shift helps you prepare for the pace and demands of the unit. While every day is different, having a baseline understanding of the unit's rhythm helps you plan your workflow effectively.",
      },
      {
        id: "survival-tips",
        title: "Survival Tips from Unit Veterans",
        content: "These tips come from clinicians who have worked on this type of unit for years. Their practical wisdom can help you navigate common challenges and build confidence more quickly.",
        items: [
          "Learn the names and roles of everyone on the unit in your first week",
          "Identify the experienced staff members who are willing to mentor and teach",
          "Develop a unit-specific brain sheet for tracking your patients",
          "Learn where supplies and emergency equipment are kept before you need them",
          "Ask about unit-specific policies and unwritten norms early in orientation",
        ],
      },
    ];
  } else if (type === "career-development") {
    sectionData = [
      {
        id: "overview",
        title: "Career Path Overview",
        content: "This career development guide provides a roadmap for advancing your healthcare career. Whether you are looking to specialize, advance to a higher credential, or explore new roles, having a clear plan helps you make strategic decisions about education, certifications, and clinical experience.",
      },
      {
        id: "requirements",
        title: "Requirements and Prerequisites",
        content: "Understanding the educational, experiential, and certification requirements for this career path helps you plan ahead and make informed decisions about your professional development.",
        items: [
          "Educational program requirements and admission criteria",
          "Clinical experience recommendations before applying",
          "Required certifications and licensing examinations",
          "Financial planning and funding options for additional education",
          "Timeline expectations for completing the transition",
        ],
      },
      {
        id: "steps",
        title: "Step-by-Step Career Roadmap",
        content: "Follow this structured roadmap to navigate your career advancement effectively. Each step builds on your existing skills and experience, creating a clear pathway to your goal.",
        items: [
          "Build a strong foundation in your current role (12-24 months minimum)",
          "Research programs and networking opportunities in your target area",
          "Obtain required certifications and prerequisites",
          "Apply to programs and prepare for entrance requirements",
          "Complete additional education while maintaining clinical practice",
          "Transition to your new role with confidence and competence",
        ],
      },
      {
        id: "opportunities",
        title: "Career Opportunities and Outlook",
        content: "Understanding the job market, salary expectations, and growth opportunities for your target role helps you make informed decisions about your career investment. Healthcare career advancement consistently shows strong employment prospects and competitive compensation.",
      },
    ];
  } else if (type === "clinical-scenario") {
    sectionData = [
      {
        id: "scenario",
        title: "The Clinical Scenario",
        content: "You are a new graduate working your shift when a situation arises that requires immediate clinical judgment. This scenario-based learning exercise walks you through the recognition, assessment, and intervention process step by step, helping you build the critical thinking skills needed for safe practice.",
      },
      {
        id: "recognition",
        title: "Recognizing the Problem",
        content: "Early recognition is the first step in effective clinical management. Learning to identify subtle changes in patient status, interpret assessment findings, and trust your clinical instincts develops with experience and deliberate practice.",
        items: [
          "Key assessment findings that indicate a problem",
          "Vital sign changes that should trigger concern",
          "Patient complaints or behaviors that warrant further investigation",
          "Comparison with baseline assessment data",
          "Use of clinical screening tools when available",
        ],
      },
      {
        id: "intervention",
        title: "Priority Nursing Interventions",
        content: "Once you have identified the problem, prioritize your interventions based on patient safety and clinical urgency. Follow established protocols and communicate with your team throughout the process.",
        items: [
          "Stabilize the patient using the ABC (Airway, Breathing, Circulation) approach",
          "Notify the appropriate healthcare provider using SBAR communication",
          "Implement standing orders or protocols relevant to the situation",
          "Continuously monitor the patient's response to interventions",
          "Document all findings, interventions, and outcomes thoroughly",
        ],
      },
      {
        id: "debrief",
        title: "Post-Event Debrief and Learning",
        content: "After the acute situation is managed, take time to debrief with your team, review what went well, and identify areas for improvement. Reflective practice is one of the most powerful tools for developing clinical expertise.",
        items: [
          "Participate in formal or informal debriefing with your team",
          "Identify what you would do differently next time",
          "Review relevant protocols and clinical guidelines",
          "Discuss the scenario with your preceptor or mentor",
          "Update your clinical knowledge based on lessons learned",
        ],
      },
    ];
  }

  guide.sections = buildSections(sectionData);
  guide.content = buildContent(sectionData);
  return guide;
}

const ALL_GUIDES = [
  ...SURVIVAL_GUIDES,
  ...CLINICAL_SKILLS_GUIDES,
  ...UNIT_GUIDES,
  ...CAREER_DEVELOPMENT_GUIDES,
  ...CLINICAL_SCENARIOS,
].map(generateSectionContent);

export const NEW_GRAD_BLOG_TOPICS = [
  "10 Things I Wish I Knew Before My First Nursing Shift",
  "How to Survive Your First Week as a New Graduate Nurse",
  "New Grad Nurse Time Management: Mastering the 12-Hour Shift",
  "Building Confidence as a New Nurse: Overcoming Imposter Syndrome",
  "SBAR Communication for New Nurses: A Complete Guide with Examples",
  "New Grad Nurse Medication Safety: Preventing Your First Error",
  "How to Handle Your First Code Blue as a New Nurse",
  "New Graduate Nurse Resume Tips: Standing Out in a Competitive Market",
  "Night Shift Survival Guide for New Graduate Nurses",
  "Managing Difficult Patients: De-Escalation Strategies for New Nurses",
  "New Grad Paramedic: What to Expect in Your First Year on the Road",
  "Respiratory Therapy Career Guide: From New Grad to Specialist",
  "New Graduate MLT: Your First 90 Days in the Clinical Laboratory",
  "New Imaging Technologist Tips: Building Speed Without Sacrificing Quality",
  "Critical Care Nursing for New Graduates: Is the ICU Right for You?",
  "How New Nurses Can Prevent Burnout in Their First Year",
  "Preceptor Relationships: Making the Most of Your Nursing Orientation",
  "Transitioning from Nursing Student to Professional Nurse",
  "New Graduate Nurse Interview Questions and How to Answer Them",
  "Choosing Your First Nursing Unit: Med-Surg vs ED vs ICU",
  "New Grad OT Guide: Building Your First Caseload Successfully",
  "How to Ask for Help as a New Healthcare Professional",
  "Clinical Documentation Tips That Save Time for New Nurses",
  "New Nurse Self-Care: Protecting Your Mental Health in Healthcare",
];

export async function seedNewGradContent(): Promise<{ seeded: number; skipped: number; errors: string[] }> {
  let seeded = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const guide of ALL_GUIDES) {
    try {
      const existing = await pool.query(
        `SELECT id FROM new_grad_guides WHERE slug = $1`,
        [guide.slug]
      );

      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }

      await pool.query(
        `INSERT INTO new_grad_guides (id, title, slug, profession, guide_type, category, summary, content, sections, seo_title, seo_description, seo_keywords, faq_items, related_guide_ids, status, tags, author_name, published_at, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'published', $14, $15, NOW(), NOW(), NOW())`,
        [
          guide.title,
          guide.slug,
          guide.profession,
          guide.guideType,
          guide.category,
          guide.summary,
          JSON.stringify(guide.content),
          JSON.stringify(guide.sections),
          guide.seoTitle,
          guide.seoDescription,
          guide.seoKeywords,
          JSON.stringify(guide.faqItems),
          [],
          guide.tags,
          guide.authorName,
        ]
      );

      seeded++;
    } catch (err: any) {
      errors.push(`${guide.slug}: ${err.message}`);
    }
  }

  await wireInternalLinks().catch(err => {
    errors.push(`Internal linking error: ${err.message}`);
  });

  return { seeded, skipped, errors };
}

async function wireInternalLinks(): Promise<number> {
  let linked = 0;

  const allGuides = await pool.query(
    `SELECT id, slug, profession, guide_type, title FROM new_grad_guides WHERE status = 'published'`
  );

  for (const guide of allGuides.rows) {
    const relatedIds: string[] = [];

    const sameProfession = allGuides.rows.filter(
      (g: any) => g.profession === guide.profession && g.id !== guide.id && g.guide_type !== guide.guide_type
    );
    for (const related of sameProfession.slice(0, 3)) {
      relatedIds.push(related.id);
    }

    const sameType = allGuides.rows.filter(
      (g: any) => g.guide_type === guide.guide_type && g.id !== guide.id && g.profession !== guide.profession
    );
    for (const related of sameType.slice(0, 2)) {
      if (!relatedIds.includes(related.id)) {
        relatedIds.push(related.id);
      }
    }

    if (relatedIds.length > 0) {
      await pool.query(
        `UPDATE new_grad_guides SET related_guide_ids = $1, updated_at = NOW() WHERE id = $2`,
        [relatedIds, guide.id]
      );
      linked++;
    }
  }

  return linked;
}

export function getNewGradBlogTopics(): string[] {
  return NEW_GRAD_BLOG_TOPICS;
}

export { ALL_GUIDES };
