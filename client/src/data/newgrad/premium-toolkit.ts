export interface ResumeTemplate {
  id: string;
  title: string;
  description: string;
  targetRole: string;
  sections: string[];
  preview: string;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  sampleAnswer: string;
  tips: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface SalaryData {
  region: string;
  specialty: string;
  entryLevel: string;
  midCareer: string;
  experienced: string;
  notes: string;
}

export interface CareerFramework {
  id: string;
  title: string;
  description: string;
  steps: { title: string; description: string; timeline: string }[];
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: "med-surg-new-grad",
    title: "Med-Surg New Graduate Resume",
    description: "ATS-optimized resume template for new graduate nurses applying to medical-surgical units. Highlights clinical rotations, assessment skills, and medication administration experience.",
    targetRole: "Medical-Surgical RN",
    sections: ["Professional Summary", "Education", "Licenses & Certifications", "Clinical Rotations", "Skills", "Professional Memberships"],
    preview: "Professional Summary: Compassionate and detail-oriented new graduate BSN-prepared registered nurse with 720+ clinical hours across medical-surgical, pediatric, and critical care settings. Strong foundation in patient assessment, medication administration, and interdisciplinary communication. Seeking a medical-surgical RN position to apply clinical judgment and evidence-based practice skills in a fast-paced acute care environment.",
  },
  {
    id: "icu-new-grad",
    title: "ICU New Graduate Resume",
    description: "Specialized resume template for new graduates targeting intensive care unit positions. Emphasizes critical care clinical hours, advanced skills, and certification readiness.",
    targetRole: "ICU RN",
    sections: ["Professional Summary", "Education", "Licenses & Certifications", "Critical Care Clinical Experience", "Advanced Skills", "Professional Development"],
    preview: "Professional Summary: Highly motivated new graduate registered nurse with BSN and 180+ critical care clinical hours. Demonstrated proficiency in hemodynamic monitoring, ventilator management, and ACLS protocols. Capstone experience in a 24-bed MICU with exposure to complex multi-system patients. ACLS and BLS certified with strong critical thinking and rapid assessment skills.",
  },
  {
    id: "er-new-grad",
    title: "Emergency Department New Graduate Resume",
    description: "Resume template optimized for emergency nursing applications. Highlights triage experience, rapid assessment skills, and emergency care competencies.",
    targetRole: "Emergency Department RN",
    sections: ["Professional Summary", "Education", "Licenses & Certifications", "Emergency & Acute Care Experience", "Competencies", "Volunteer Experience"],
    preview: "Professional Summary: Energetic and adaptable new graduate RN with BSN degree and clinical experience in emergency department, trauma, and acute care settings. 160+ hours of ED clinical rotation with exposure to triage, rapid assessment, and multi-patient management. BLS, ACLS, and TNCC certified. Thrives in fast-paced environments with strong prioritization and communication skills.",
  },
  {
    id: "pediatric-new-grad",
    title: "Pediatric Nursing New Graduate Resume",
    description: "Tailored resume for new graduates applying to pediatric units, children's hospitals, or NICU positions.",
    targetRole: "Pediatric RN / NICU RN",
    sections: ["Professional Summary", "Education", "Licenses & Certifications", "Pediatric Clinical Experience", "Family-Centered Care Skills", "Community Involvement"],
    preview: "Professional Summary: Dedicated new graduate BSN-prepared nurse with a passion for pediatric and family-centered care. 200+ clinical hours in pediatric acute care, NICU, and outpatient pediatric settings. Experienced in developmental assessment, family education, and age-appropriate care delivery. PALS and NRP certified with strong therapeutic communication skills.",
  },
  {
    id: "cover-letter-template",
    title: "New Graduate Nursing Cover Letter",
    description: "Customizable cover letter framework with unit-specific variations for med-surg, ICU, ER, L&D, pediatrics, and specialty applications.",
    targetRole: "All Nursing Positions",
    sections: ["Opening Hook", "Clinical Experience Connection", "Career Goal Alignment", "Professional Closing"],
    preview: "Dear [Hiring Manager Name], I am writing to express my enthusiastic interest in the [Unit] Registered Nurse position at [Hospital Name]. As a recent BSN graduate from [School] with [X] clinical hours and a deep commitment to [specialty area], I am excited about the opportunity to contribute to your team's mission of [reference hospital mission].",
  },
];

export const INTERVIEW_QUESTION_BANK: InterviewQuestion[] = [
  {
    id: "iq-1",
    category: "Patient Advocacy",
    question: "Tell me about a time you advocated for a patient.",
    sampleAnswer: "During my med-surg clinical rotation, I noticed a 78-year-old patient with diabetes was being served a regular diet tray despite having a diabetic diet order. I verified the order in the chart, contacted dietary services to correct the tray, informed my preceptor, and documented the dietary error. The patient received the correct meal, and I learned the importance of verifying even routine aspects of patient care.",
    tips: ["Use a specific clinical example", "Show your assessment and critical thinking process", "Emphasize the positive outcome for the patient", "Mention communication and documentation"],
    difficulty: "beginner",
  },
  {
    id: "iq-2",
    category: "Error Management",
    question: "Describe a time you made a mistake in clinical. How did you handle it?",
    sampleAnswer: "During my third clinical rotation, I nearly administered the wrong dose of metoprolol. I caught the error during my final rights check before administration. I immediately stopped, rechecked the MAR, consulted with my preceptor, and prepared the correct dose. I then voluntarily filed an incident report documenting the near-miss and participated in a debrief with my clinical instructor. The transparency led to a unit-wide discussion about medication safety.",
    tips: ["Show honesty and accountability", "Describe your immediate corrective actions", "Include what you learned", "Demonstrate commitment to patient safety culture"],
    difficulty: "intermediate",
  },
  {
    id: "iq-3",
    category: "Teamwork",
    question: "Give an example of a time you worked effectively as part of a team.",
    sampleAnswer: "During a clinical rotation in the ED, we received notification of a multi-vehicle accident with 4 incoming patients. I worked with my preceptor, two other RNs, and an ER tech to prepare rooms, gather supplies, and assign roles. I was responsible for documentation and vital sign monitoring for two patients. Clear communication and defined roles allowed us to stabilize all patients efficiently. I learned the critical importance of teamwork in high-acuity situations.",
    tips: ["Describe your specific role and contributions", "Show awareness of team dynamics", "Highlight communication skills", "Connect to patient outcomes"],
    difficulty: "beginner",
  },
  {
    id: "iq-4",
    category: "Conflict Resolution",
    question: "Tell me about a time you had a disagreement with a colleague or instructor.",
    sampleAnswer: "My preceptor and I disagreed about the best approach to wound care for a patient with a stage 3 pressure ulcer. I had learned a newer evidence-based technique in school, while my preceptor preferred the traditional method. Instead of challenging her directly, I asked if she could explain her approach, shared the recent research I'd read, and suggested we consult the wound care nurse. The wound care nurse confirmed the newer approach, and my preceptor appreciated my respectful way of raising the issue.",
    tips: ["Show emotional intelligence and respect", "Focus on resolution, not the conflict", "Demonstrate evidence-based thinking", "Avoid speaking negatively about anyone"],
    difficulty: "intermediate",
  },
  {
    id: "iq-5",
    category: "Prioritization",
    question: "How do you prioritize when you have multiple patients with competing needs?",
    sampleAnswer: "I use ABC assessment and Maslow's hierarchy to prioritize. During my capstone, I had a patient with acute chest pain, another requesting pain medication, and a third whose family needed a discharge education session. I immediately assessed the chest pain patient, called a rapid response, delegated the pain medication administration to my preceptor, and scheduled the discharge education for after the acute situation was stabilized. I documented all interventions and communicated status updates to the charge nurse.",
    tips: ["Reference clinical prioritization frameworks", "Give a specific example with multiple patients", "Show delegation skills", "Include documentation and communication"],
    difficulty: "advanced",
  },
  {
    id: "iq-6",
    category: "Cultural Sensitivity",
    question: "Describe a situation where you cared for a patient from a different cultural background.",
    sampleAnswer: "I cared for a Somali patient whose family requested that only female nurses provide care, and the patient preferred having family present during assessments. I coordinated with the charge nurse to ensure female nursing staff were assigned, arranged for an interpreter for medical discussions, and adapted my assessment approach to maintain the patient's cultural comfort while ensuring thorough care. I documented the cultural care preferences in the care plan for continuity.",
    tips: ["Show cultural awareness and respect", "Describe concrete accommodations you made", "Include how you ensured quality care was maintained", "Mention interdisciplinary collaboration"],
    difficulty: "intermediate",
  },
  {
    id: "iq-7",
    category: "Stress Management",
    question: "How do you handle stress in high-pressure clinical situations?",
    sampleAnswer: "During a code blue in my critical care rotation, I initially felt overwhelmed but quickly focused on my assigned role: documenting the timeline and interventions. I used controlled breathing to manage my anxiety, followed the code team's structured communication protocol, and maintained accurate records throughout the 20-minute resuscitation. Afterward, I participated in the debrief session and reflected on what I learned. I now use controlled breathing and mental preparation before entering high-pressure situations.",
    tips: ["Give a real clinical example", "Show self-awareness about your stress response", "Describe healthy coping mechanisms", "Include what you learned"],
    difficulty: "intermediate",
  },
  {
    id: "iq-8",
    category: "Time Management",
    question: "Tell me about a time you had to manage multiple tasks under a tight deadline.",
    sampleAnswer: "During my final semester clinical rotation, I was assigned 4 patients on a busy med-surg unit. I had morning medications due at 0800, two patients needing blood glucose checks before meals, a new admission arriving at 0830, and scheduled dressing changes for two patients. I created a prioritized task list, completed blood glucose checks first, administered time-sensitive medications, performed a focused admission assessment, and scheduled dressing changes for mid-morning. I communicated my plan to my preceptor and CNA to ensure nothing was missed.",
    tips: ["Describe your organizational strategy", "Show prioritization skills", "Include delegation when appropriate", "Quantify your workload"],
    difficulty: "beginner",
  },
];

export const SALARY_DATA: SalaryData[] = [
  { region: "Northeast US", specialty: "Med-Surg", entryLevel: "$62,000-$75,000", midCareer: "$75,000-$90,000", experienced: "$85,000-$105,000", notes: "Higher cost of living; strong union presence in many hospitals" },
  { region: "Southeast US", specialty: "Med-Surg", entryLevel: "$52,000-$62,000", midCareer: "$62,000-$78,000", experienced: "$75,000-$92,000", notes: "Lower cost of living; growing demand in major metro areas" },
  { region: "Midwest US", specialty: "Med-Surg", entryLevel: "$54,000-$65,000", midCareer: "$65,000-$82,000", experienced: "$78,000-$95,000", notes: "Moderate cost of living; competitive benefits packages" },
  { region: "West Coast US", specialty: "Med-Surg", entryLevel: "$72,000-$95,000", midCareer: "$90,000-$115,000", experienced: "$105,000-$135,000", notes: "Highest salaries but very high cost of living; California nurse ratios" },
  { region: "Ontario, Canada", specialty: "Med-Surg", entryLevel: "$60,000-$72,000 CAD", midCareer: "$72,000-$88,000 CAD", experienced: "$85,000-$100,000 CAD", notes: "ONA collective agreement; step increases based on experience" },
  { region: "British Columbia, Canada", specialty: "Med-Surg", entryLevel: "$62,000-$75,000 CAD", midCareer: "$75,000-$92,000 CAD", experienced: "$88,000-$105,000 CAD", notes: "BCNU collective agreement; geographic allowances for rural areas" },
  { region: "Alberta, Canada", specialty: "Med-Surg", entryLevel: "$64,000-$78,000 CAD", midCareer: "$78,000-$95,000 CAD", experienced: "$92,000-$110,000 CAD", notes: "UNA collective agreement; competitive compensation" },
  { region: "All Regions", specialty: "ICU/Critical Care", entryLevel: "+$3,000-$8,000", midCareer: "+$5,000-$12,000", experienced: "+$8,000-$18,000", notes: "Premium over med-surg base; additional for CCRN certification" },
  { region: "All Regions", specialty: "Emergency", entryLevel: "+$2,000-$6,000", midCareer: "+$4,000-$10,000", experienced: "+$6,000-$15,000", notes: "Shift differentials significant; trauma center premiums" },
  { region: "All Regions", specialty: "OR/Perioperative", entryLevel: "+$3,000-$7,000", midCareer: "+$5,000-$12,000", experienced: "+$8,000-$16,000", notes: "Limited new grad openings; strong demand for experienced nurses" },
];

export const CAREER_FRAMEWORKS: CareerFramework[] = [
  {
    id: "clinical-ladder",
    title: "Clinical Ladder Advancement",
    description: "A structured pathway for clinical nurses to advance through levels of expertise, from novice to expert, with increasing responsibilities and compensation.",
    steps: [
      { title: "RN I - New Graduate", description: "Focus on building core competencies, passing probationary period, and establishing safe practice patterns.", timeline: "0-12 months" },
      { title: "RN II - Competent", description: "Demonstrate consistent competence, begin precepting students, participate in unit-based committees.", timeline: "1-3 years" },
      { title: "RN III - Proficient", description: "Serve as charge nurse, lead quality improvement projects, mentor new graduates, pursue specialty certification.", timeline: "3-5 years" },
      { title: "RN IV - Expert", description: "Function as clinical resource, lead evidence-based practice initiatives, contribute to policy development, present at conferences.", timeline: "5+ years" },
    ],
  },
  {
    id: "advanced-practice",
    title: "Advanced Practice Pathway",
    description: "Progression from bedside nursing to advanced practice roles (NP, CNS, CRNA, CNM) requiring graduate education and expanded scope.",
    steps: [
      { title: "Build Clinical Foundation", description: "Gain 2-3 years of clinical experience in your target specialty area.", timeline: "0-3 years" },
      { title: "Graduate Education", description: "Complete MSN or DNP program in your chosen advanced practice specialty.", timeline: "2-4 years (part-time)" },
      { title: "Certification & Licensure", description: "Pass national certification exam and obtain advanced practice licensure.", timeline: "6-12 months" },
      { title: "Independent Practice", description: "Establish your advanced practice role with prescriptive authority and clinical autonomy.", timeline: "Ongoing" },
    ],
  },
  {
    id: "leadership-track",
    title: "Nursing Leadership Track",
    description: "Career path from bedside nursing through management and administrative leadership roles.",
    steps: [
      { title: "Charge Nurse Experience", description: "Take on charge nurse responsibilities and develop shift-level leadership skills.", timeline: "1-3 years" },
      { title: "Assistant Nurse Manager", description: "Move into formal management with responsibility for staffing, scheduling, and team performance.", timeline: "3-5 years" },
      { title: "Nurse Manager / Director", description: "Lead a unit or department with budget, staffing, and quality outcome accountability.", timeline: "5-8 years" },
      { title: "Executive Leadership", description: "Advance to CNO, VP of Nursing, or system-level leadership roles.", timeline: "10+ years" },
    ],
  },
];

export const PORTFOLIO_SECTIONS = [
  { title: "Professional Summary", description: "Updated resume and career objective statement" },
  { title: "Education & Credentials", description: "Degree documentation, transcripts, and licensure verification" },
  { title: "Certifications", description: "BLS, ACLS, PALS, specialty certifications with expiration dates" },
  { title: "Clinical Competencies", description: "Skills checklist, competency validation records, orientation completion" },
  { title: "Professional Development", description: "CE certificates, conference attendance, workshop completions" },
  { title: "Quality & Safety", description: "QI project documentation, evidence-based practice contributions" },
  { title: "Leadership Activities", description: "Committee participation, precepting records, mentoring activities" },
  { title: "Professional References", description: "Contact information for 3-5 professional references with their permission" },
  { title: "Awards & Recognition", description: "Performance awards, DAISY nominations, peer recognition" },
  { title: "Goals & Reflections", description: "Professional development plan with short and long-term career goals" },
];
