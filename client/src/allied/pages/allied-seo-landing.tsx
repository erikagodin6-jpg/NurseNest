import { Link, useRoute } from "wouter";
import { CAREER_CONFIGS } from "@shared/careers";
import {
  ArrowRight, BookOpen, FileText, Brain, Zap, Target,
  CheckCircle2, HelpCircle, ChevronDown, Star, Award,
  BarChart3, Clock, Shield
} from "lucide-react";
import { useState } from "react";
import { AlliedSEO } from "@/allied/allied-seo";

interface SEOPageConfig {
  slug: string;
  careerSlug: string;
  pageType: "practice-questions" | "mock-exam" | "study-guide" | "flashcards" | "category";
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  sections: { heading: string; content: string }[];
  faqs: { q: string; a: string }[];
}

const SEO_PAGES: SEOPageConfig[] = [
  {
    slug: "pharmacy-technician-practice-questions",
    careerSlug: "pharmacy-tech",
    pageType: "practice-questions",
    title: "Pharmacy Technician Practice Questions | PTCB & ExCPT Prep",
    metaDescription: "Master pharmacy technician certification with 500+ exam-authentic practice questions. 600+ word rationales, adaptive CAT simulation, and weak-area targeting.",
    h1: "Pharmacy Technician Practice Questions",
    heroSubtitle: "Exam-authentic PTCB and ExCPT practice questions with 600+ word rationales that teach you the reasoning behind every answer — not just the correct choice.",
    sections: [
      {
        heading: "Why Our Pharmacy Tech Questions Are Different",
        content: "Most question banks give you a one-sentence explanation. NurseNest Allied provides 600+ word clinical rationales for every single question — covering pharmacology, dosage calculations, compounding, drug interactions, and sterile products. Each rationale walks you through the clinical reasoning so you understand the 'why' behind every answer. Our questions are mapped to the official PTCB and ExCPT exam blueprints, ensuring you study exactly what's tested."
      },
      {
        heading: "Adaptive CAT-Style Question Engine",
        content: "Real certification exams use Computer Adaptive Testing (CAT). Our practice engine simulates this experience by adjusting question difficulty based on your performance. When you answer correctly, difficulty increases. When you struggle, it provides reinforcement questions. This means every practice session is personalized to your current knowledge level — maximizing learning efficiency and preparing you for the actual exam format."
      },
      {
        heading: "Weak-Area Targeting Across All Domains",
        content: "Our platform tracks your performance across every PTCB domain: Pharmacology, Dosage Calculations, Compounding, Drug Interactions, Regulations & Law, Sterile Products, Inventory Management, Patient Safety, Drug Classifications, and Prescription Processing. It identifies where you're struggling and automatically prioritizes those topics, so you spend study time where it matters most."
      },
      {
        heading: "4,000+ Question Roadmap",
        content: "We currently offer 500+ exam-authentic pharmacy technician questions with new questions added regularly. Our roadmap targets 4,000+ questions covering every domain, drug class, and calculation type tested on the PTCB, ExCPT, and PEBC Qualifying exams. Early adopters get access to the full library as it grows — at today's price."
      }
    ],
    faqs: [
      { q: "How many pharmacy technician practice questions are available?", a: "We currently have 500+ exam-authentic questions mapped to the PTCB and ExCPT blueprints, with new questions added weekly. Our roadmap targets 4,000+ questions across all pharmacy domains." },
      { q: "Are the questions aligned with the PTCB exam?", a: "Yes. Every question is mapped to the official PTCB Content Outline, covering all four knowledge areas: Medications, Federal Requirements, Patient Safety and Quality Assurance, and Order Entry and Processing." },
      { q: "What makes the rationales different from other question banks?", a: "Each rationale is 600+ words and teaches you the clinical reasoning — not just 'A is correct because B is wrong.' You'll understand drug mechanisms, calculation methods, and regulatory logic at a deeper level." },
      { q: "Can I practice dosage calculations specifically?", a: "Absolutely. Our question bank includes dedicated dosage calculation questions covering ratios, proportions, dilutions, compounding math, and day supply calculations — all with step-by-step solutions." },
      { q: "Is there a free trial?", a: "Yes! Take our free 15-question diagnostic assessment to see your readiness score and get 5 free practice questions to experience our rationale quality firsthand." },
      { q: "How does the adaptive engine work?", a: "Our CAT-style engine adjusts question difficulty in real-time based on your answers. It simulates the actual exam experience so you're prepared for both the content and format of your certification test." }
    ]
  },
  {
    slug: "pharmacy-technician-mock-exam",
    careerSlug: "pharmacy-tech",
    pageType: "mock-exam",
    title: "Pharmacy Technician Mock Exam | Full-Length PTCB Practice Test",
    metaDescription: "Take a full-length pharmacy technician mock exam with adaptive CAT simulation. Blueprint-weighted, timed practice with detailed performance analytics.",
    h1: "Pharmacy Technician Mock Exam",
    heroSubtitle: "Full-length, blueprint-weighted mock exams that simulate the real PTCB testing experience — including adaptive difficulty, time pressure, and domain-level scoring.",
    sections: [
      {
        heading: "Realistic PTCB Mock Exam Experience",
        content: "Our pharmacy technician mock exams replicate the real PTCB testing environment. Each exam is timed, blueprint-weighted, and uses adaptive CAT-style logic. You'll experience the same question distribution, time pressure, and format as the actual certification exam — so nothing surprises you on test day."
      },
      {
        heading: "Detailed Performance Analytics",
        content: "After completing a mock exam, you receive a comprehensive performance report. See your score breakdown by domain, identify weak areas, and track improvement over time. Our analytics show you exactly where to focus your remaining study time for maximum impact."
      },
      {
        heading: "Blueprint-Weighted Question Distribution",
        content: "Every mock exam follows the official PTCB exam blueprint weighting. Medications make up the largest portion, followed by Federal Requirements, Patient Safety, and Order Entry/Processing — exactly as they appear on the real exam. This ensures your practice reflects actual testing conditions."
      }
    ],
    faqs: [
      { q: "How long is the mock exam?", a: "Our full-length mock exam mirrors the PTCB format with 90 questions in a timed session. We also offer shorter focused practice exams for targeted domain review." },
      { q: "Can I retake the mock exam?", a: "Pro members get unlimited mock exam attempts with different question sets each time. Free users can take one mock exam to experience the format." },
      { q: "How is the mock exam scored?", a: "You receive a scaled score similar to the actual PTCB scoring method, plus a domain-level breakdown showing your strengths and weaknesses across all tested areas." },
      { q: "Does it simulate CAT?", a: "Yes. Our adaptive engine adjusts question difficulty based on your performance throughout the exam, simulating the Computer Adaptive Testing format used by major certification exams." },
      { q: "What happens after I complete the exam?", a: "You get a detailed results page showing your overall score, domain breakdown, time analysis, and personalized recommendations for what to study next." }
    ]
  },
  {
    slug: "pharmacy-technician-study-guide",
    careerSlug: "pharmacy-tech",
    pageType: "study-guide",
    title: "Pharmacy Technician Study Guide | Complete PTCB Prep",
    metaDescription: "Comprehensive pharmacy technician study guide with personalized study plans, flashcards, and case simulations. Everything you need to pass the PTCB.",
    h1: "Pharmacy Technician Study Guide",
    heroSubtitle: "A complete, adaptive study system covering every PTCB domain — from pharmacology and dosage calculations to compounding and drug interactions.",
    sections: [
      {
        heading: "Personalized Study Plans",
        content: "Our platform analyzes your diagnostic results and ongoing performance to create a day-by-day study plan tailored to your timeline and weak areas. Whether you have 2 weeks or 3 months until your exam, the study planner adapts to ensure you cover every domain with appropriate depth."
      },
      {
        heading: "Comprehensive Domain Coverage",
        content: "Our study materials cover every PTCB domain in depth: Pharmacology fundamentals, drug classification systems, dosage calculations, sterile and non-sterile compounding, drug interactions, federal and state regulations, inventory management, patient safety protocols, and prescription processing workflows. Each topic includes detailed explanations, clinical examples, and practice questions."
      },
      {
        heading: "Spaced Repetition Flashcards",
        content: "Master key pharmacy concepts with our spaced repetition flashcard system. Cards automatically resurface at optimal intervals based on how well you know each concept — ensuring long-term retention of drug names, mechanisms, interactions, and calculations."
      },
      {
        heading: "Interactive Case Simulations",
        content: "Go beyond memorization with unfolding case simulations that mirror real pharmacy scenarios. Practice prescription verification, drug interaction checks, dosage calculations in context, and patient counseling situations — building the clinical judgment tested on certification exams."
      }
    ],
    faqs: [
      { q: "How does the study plan work?", a: "After you complete the diagnostic assessment, the platform creates a personalized study schedule. It prioritizes your weakest domains, allocates study time based on your exam date, and adjusts daily as your performance improves." },
      { q: "What study materials are included?", a: "Pro members get access to the full question bank, flashcards, mock exams, case simulations, personalized study planner, and all interactive tools. Everything you need in one platform." },
      { q: "How are the flashcards organized?", a: "Flashcards are organized by domain and topic. The spaced repetition algorithm tracks which cards you know well and which need more practice, ensuring efficient review sessions." },
      { q: "Can I study on my phone?", a: "Yes! NurseNest Allied is fully responsive and works on any device. Study on your phone during breaks, on your tablet at home, or on your computer at your desk." },
      { q: "How long should I study before taking the PTCB?", a: "Most students use our platform for 4-8 weeks before their exam. The study planner will create an optimized schedule based on your timeline and starting knowledge level." }
    ]
  },
  {
    slug: "rrt-practice-questions",
    careerSlug: "rrt",
    pageType: "practice-questions",
    title: "RRT Practice Questions | NBRC TMC & CSE Exam Prep",
    metaDescription: "Master respiratory therapy certification with 500+ RRT practice questions. 600+ word rationales, adaptive CAT simulation, and domain-level weak-area targeting.",
    h1: "RRT Practice Questions",
    heroSubtitle: "Exam-authentic NBRC TMC and CSE practice questions with 600+ word rationales covering ventilator management, ABG analysis, airway management, and every tested domain.",
    sections: [
      {
        heading: "Why Our RRT Questions Stand Out",
        content: "Generic question banks give you a sentence or two of explanation. NurseNest Allied provides 600+ word clinical rationales for every question — covering the pathophysiology, clinical reasoning, and decision-making process behind each answer. Our questions span all NBRC domains: Patient Assessment, Airway Management, Ventilator Management, ABG Interpretation, Neonatal/Pediatric Respiratory, Pharmacology, Diagnostics, Disease Management, Emergency Procedures, and Equipment."
      },
      {
        heading: "Adaptive CAT-Style Practice Engine",
        content: "The NBRC TMC exam uses a scoring algorithm that evaluates your performance across domains. Our adaptive engine simulates this by adjusting question difficulty in real-time based on your answers. You'll experience the same progressive difficulty and domain coverage as the actual exam — building both confidence and competence."
      },
      {
        heading: "Smart Weak-Area Targeting",
        content: "Our platform continuously tracks your performance across all respiratory therapy domains. Struggling with ventilator waveform interpretation? The system automatically serves more ventilator questions until your scores improve. This targeted approach means you spend study time where it has the greatest impact on your overall readiness."
      },
      {
        heading: "Built-In ABG and Ventilator Tools",
        content: "Beyond standard questions, NurseNest Allied includes specialized interactive tools: the ABG Interpretation Engine for practicing arterial blood gas analysis with instant feedback, and the Ventilator Mode Simulator for interactive ventilator settings and waveform analysis. These tools complement the question bank and build the clinical judgment tested on the CSE."
      }
    ],
    faqs: [
      { q: "How many RRT practice questions are available?", a: "We currently have 500+ exam-authentic questions mapped to the NBRC TMC and CSE blueprints, with new questions added regularly. Our roadmap targets 4,000+ questions across all respiratory therapy domains." },
      { q: "Are the questions aligned with the NBRC exam blueprint?", a: "Yes. Every question is mapped to the official NBRC Therapist Multiple-Choice (TMC) examination content outline and the Clinical Simulation Exam (CSE) competency areas." },
      { q: "Do you cover ventilator management questions?", a: "Extensively. Our bank includes questions on all ventilator modes (AC, SIMV, PSV, APRV, HFOV), waveform interpretation, patient-ventilator synchrony, weaning protocols, and troubleshooting — each with detailed rationales." },
      { q: "What about ABG interpretation?", a: "ABG questions cover acid-base disorders, compensation mechanisms, mixed disorders, and clinical correlation. Plus, our dedicated ABG Interpretation Engine provides unlimited practice with instant feedback." },
      { q: "Is there a free trial?", a: "Yes! Take our free 15-question diagnostic to see your readiness score, plus get 5 free practice questions to experience the depth of our rationales." },
      { q: "How does weak-area targeting work?", a: "Our platform tracks your accuracy across every NBRC domain. It identifies your weakest areas and automatically prioritizes those topics in your practice sessions and study plan." }
    ]
  },
  {
    slug: "rrt-mock-exam",
    careerSlug: "rrt",
    pageType: "mock-exam",
    title: "RRT Mock Exam | Full-Length NBRC TMC Practice Test",
    metaDescription: "Take a full-length RRT mock exam with adaptive CAT simulation. Blueprint-weighted, timed practice with detailed domain-level performance analytics.",
    h1: "RRT Mock Exam",
    heroSubtitle: "Full-length, blueprint-weighted mock exams simulating the real NBRC TMC testing experience — with adaptive difficulty, realistic timing, and comprehensive scoring.",
    sections: [
      {
        heading: "Authentic NBRC TMC Exam Simulation",
        content: "Our RRT mock exams replicate the actual NBRC TMC testing environment. Each exam features 160 questions (scoring 100 + 60 pretest), realistic time constraints, and blueprint-weighted domain distribution. The adaptive engine adjusts difficulty based on your performance — just like the real exam."
      },
      {
        heading: "Comprehensive Performance Report",
        content: "After completing your mock exam, receive a detailed performance analysis. Your results are broken down by domain — Patient Assessment, Airway Management, Ventilator Management, and more — so you know exactly where to focus. Track your scores over multiple attempts to see improvement trends."
      },
      {
        heading: "CSE-Style Clinical Simulations",
        content: "Prepare for the Clinical Simulation Exam with our unfolding case scenarios. Manage realistic patient cases from initial assessment through treatment decisions, monitoring interpretation, and outcome evaluation. Each simulation tests the same competencies evaluated on the actual CSE."
      }
    ],
    faqs: [
      { q: "How long is the RRT mock exam?", a: "Our full-length mock mirrors the NBRC TMC format. We also offer shorter focused exams for targeted domain review when you want to drill specific areas." },
      { q: "Can I retake mock exams?", a: "Pro members get unlimited mock exam attempts with randomized question selection, so each attempt provides a fresh testing experience." },
      { q: "Does it prepare me for the CSE too?", a: "Yes. In addition to TMC-style mock exams, we include clinical simulation scenarios that mirror the branching, decision-making format of the NBRC Clinical Simulation Exam." },
      { q: "How is the mock exam scored?", a: "You receive both an overall score and domain-level breakdown. We indicate whether your performance meets the cut-score threshold, giving you a realistic assessment of exam readiness." },
      { q: "What should I do after the mock exam?", a: "Review your domain breakdown and use the study planner to create a targeted review plan focusing on your weakest areas before your next attempt or your actual exam." }
    ]
  },
  {
    slug: "rrt-study-guide",
    careerSlug: "rrt",
    pageType: "study-guide",
    title: "RRT Study Guide | Complete Respiratory Therapy Exam Prep",
    metaDescription: "Comprehensive RRT study guide with personalized study plans, flashcards, ABG engine, and ventilator simulator. Everything you need to pass the NBRC TMC and CSE.",
    h1: "RRT Study Guide",
    heroSubtitle: "A complete, adaptive study system for respiratory therapy certification — covering ventilator management, ABG analysis, airway management, and every NBRC domain.",
    sections: [
      {
        heading: "Personalized Study Plans",
        content: "Our platform builds a day-by-day study plan based on your diagnostic results, exam date, and performance trends. It allocates more time to your weak domains and adjusts daily as you improve. Whether you have 2 weeks or 3 months, you'll have a clear path to exam readiness."
      },
      {
        heading: "Complete NBRC Domain Coverage",
        content: "Study materials cover every tested domain: Patient Assessment techniques, Airway Management procedures, Ventilator Management principles, ABG Interpretation mastery, Neonatal and Pediatric Respiratory care, respiratory Pharmacology, Diagnostic procedures, Disease Management protocols, Emergency Procedures, and Equipment operation and troubleshooting."
      },
      {
        heading: "Interactive ABG & Ventilator Tools",
        content: "Our dedicated ABG Interpretation Engine lets you practice unlimited blood gas analysis with instant feedback. The Ventilator Mode Simulator provides interactive ventilator settings and waveform analysis — building the clinical judgment that sets top scores apart on the CSE."
      },
      {
        heading: "Spaced Repetition & Flashcards",
        content: "Master critical respiratory therapy concepts with our spaced repetition system. Flashcards cover drug dosages, ventilator settings, ABG values, equipment parameters, and disease pathophysiology — resurfacing at optimal intervals for long-term retention."
      }
    ],
    faqs: [
      { q: "How does the study plan work?", a: "Complete the diagnostic assessment, and the platform creates a personalized schedule targeting your weak domains first. It adjusts daily based on your progress and time until your exam." },
      { q: "What study materials are included?", a: "Pro includes the full question bank (500+ questions), flashcards, mock exams, ABG engine, ventilator simulator, case simulations, and personalized study planner — everything in one platform." },
      { q: "Can I use the ABG engine for unlimited practice?", a: "Yes. Pro members get unlimited access to the ABG Interpretation Engine, with auto-generated cases covering simple disorders, mixed acid-base problems, and compensation analysis." },
      { q: "How long should I study for the NBRC TMC?", a: "Most students use our platform for 6-10 weeks before the TMC exam. The study planner optimizes your schedule based on your starting level and exam date." },
      { q: "Is the study guide mobile-friendly?", a: "Absolutely. Study on any device — phone, tablet, or computer. Your progress syncs across all devices automatically." }
    ]
  },
  {
    slug: "pharmacy-tech-us",
    careerSlug: "pharmacy-tech",
    pageType: "study-guide",
    title: "Pharmacy Technician PTCB Exam Prep | United States",
    metaDescription: "Prepare for the PTCB Pharmacy Technician Certification Exam with US-specific content: DEA regulations, USP <795>/<797> compounding standards, HIPAA compliance, and DSCSA requirements.",
    h1: "Pharmacy Technician PTCB Exam Prep (United States)",
    heroSubtitle: "US-focused pharmacy technician exam preparation covering DEA scheduling, USP compounding standards, HIPAA regulations, and the complete PTCE 2026 blueprint with mg/dL lab values.",
    sections: [
      { heading: "PTCB Exam Blueprint Alignment", content: "Our question bank maps directly to the 2026 PTCE Content Outline: Medications (40%), Federal Requirements (12.5%), Patient Safety & Quality Assurance (26.25%), and Order Entry & Processing (21.25%). Every practice session follows this weighted distribution so you study exactly what PTCB tests." },
      { heading: "US Federal Pharmacy Law", content: "Master DEA scheduling and controlled substance documentation, DSCSA drug supply chain requirements, HIPAA patient privacy rules, OBRA-90 counseling obligations, and the FD&C Act drug approval framework. Our legal modules cover every federal regulation tested on the PTCE." },
      { heading: "USP Compounding Standards", content: "Comprehensive coverage of USP <795> non-sterile compounding, USP <797> sterile compounding with cleanroom classifications and beyond-use dating, and USP <800> hazardous drug handling. Practice questions include calculations using US customary and metric measurements." },
      { heading: "US Lab Values and Drug References", content: "All clinical values displayed in standard US units (mg/dL for glucose, creatinine, and BUN). Drug references use US brand names and NDC numbers. Dosage calculations use both US customary and metric systems as tested on the PTCE." }
    ],
    faqs: [
      { q: "Is this aligned with the PTCB exam?", a: "Yes. Content maps to the official PTCE 2026 Content Outline with proper domain weighting: Medications 40%, Federal Requirements 12.5%, Patient Safety & Quality Assurance 26.25%, and Order Entry & Processing 21.25%." },
      { q: "Does this cover US pharmacy law?", a: "Comprehensive coverage of DEA regulations, DSCSA, HIPAA, USP <795>/<797>/<800>, OBRA-90, and the FD&C Act. All legal content is US-specific." },
      { q: "What lab value system is used?", a: "All lab values use US conventional units (mg/dL). You can switch to Canadian SI units (mmol/L) if you are preparing for the PEBC exam instead." },
      { q: "Can I switch to Canadian exam prep?", a: "Yes. Use the region toggle to switch between US (PTCB) and Canadian (PEBC) exam tracks. Legal modules, lab units, and blueprint weights update automatically." }
    ]
  },
  {
    slug: "pharmacy-tech-canada",
    careerSlug: "pharmacy-tech",
    pageType: "study-guide",
    title: "Pharmacy Technician PEBC Exam Prep | Canada",
    metaDescription: "Prepare for the PEBC Pharmacy Technician Qualifying Examination with Canadian-specific content: NAPRA standards, CDSA regulations, PIPEDA privacy, and provincial board requirements.",
    h1: "Pharmacy Technician PEBC Exam Prep (Canada)",
    heroSubtitle: "Canadian-focused pharmacy technician exam preparation covering NAPRA competency standards, Controlled Drugs and Substances Act, PIPEDA privacy, and provincial pharmacy board requirements with SI unit lab values.",
    sections: [
      { heading: "PEBC Qualifying Exam Blueprint", content: "Content aligned with the PEBC Pharmacy Technician Qualifying Examination competencies: Product Distribution (35%), Pharmacy Practice (30%), Pharmaceutical Compounding (15%), and Professional Practice (20%). Practice sessions mirror the competency-based weighting used by Canadian boards." },
      { heading: "Canadian Pharmacy Law", content: "Master NAPRA Model Standards for pharmacy technicians, Controlled Drugs and Substances Act (CDSA) scheduling and documentation, PIPEDA patient privacy regulations, Food and Drugs Act requirements, Narcotic Control Regulations, and province-specific pharmacy technician regulation frameworks." },
      { heading: "NAPRA Compounding Standards", content: "Comprehensive coverage of NAPRA Model Standards for pharmacy compounding of non-sterile and sterile preparations. Includes hazardous drug handling, beyond-use dating in Canadian context, and provincial compounding requirements." },
      { heading: "SI Lab Values and Canadian Drug References", content: "All clinical values displayed in SI units (mmol/L for glucose and urea, umol/L for creatinine). Drug references include Canadian DINs and brand name availability. Dosage calculations use metric measurements exclusively as tested on provincial exams." }
    ],
    faqs: [
      { q: "Is this aligned with the PEBC exam?", a: "Yes. Content maps to the PEBC Pharmacy Technician Qualifying Examination competency framework: Product Distribution 35%, Pharmacy Practice 30%, Pharmaceutical Compounding 15%, and Professional Practice 20%." },
      { q: "Does this cover Canadian pharmacy law?", a: "Yes. NAPRA standards, CDSA, PIPEDA, Food and Drugs Act, Narcotic Control Regulations, and provincial pharmacy board requirements are all covered in depth." },
      { q: "What lab value system is used?", a: "All lab values use SI units (mmol/L, umol/L). You can switch to US conventional units (mg/dL) if preparing for the PTCB exam." },
      { q: "Does this cover provincial requirements?", a: "Our Canadian track covers national NAPRA standards plus a framework for understanding how provincial boards (e.g., OCP, CPBC, ACP) implement delegation and scope of practice." }
    ]
  },
  {
    slug: "rrt-us",
    careerSlug: "rrt",
    pageType: "study-guide",
    title: "Respiratory Therapist NBRC TMC & CSE Exam Prep | United States",
    metaDescription: "Prepare for the NBRC TMC and Clinical Simulation Examination with US-specific respiratory therapy content, AARC practice guidelines, and CMS regulations.",
    h1: "RRT NBRC TMC & CSE Exam Prep (United States)",
    heroSubtitle: "US-focused respiratory therapy exam preparation for the NBRC Therapist Multiple-Choice and Clinical Simulation Examinations with AARC scope of practice and CMS compliance.",
    sections: [
      { heading: "NBRC TMC Blueprint Alignment", content: "Content maps to the NBRC TMC exam blueprint: Patient Data Evaluation & Recommendations (30%), Troubleshooting & Quality Control (20%), and Initiation & Modification of Interventions (50%). Pass score: 130/200 scaled." },
      { heading: "US Regulatory Framework", content: "Coverage of AARC scope of practice, HIPAA compliance for respiratory therapists, CMS regulations for respiratory care services, and TJC accreditation standards for respiratory therapy departments." },
      { heading: "Clinical Simulation Preparation", content: "Targeted preparation for the NBRC Clinical Simulation Examination (CSE) with branching clinical scenarios, decision-point analysis, and competency-based assessment." }
    ],
    faqs: [
      { q: "Does this cover both TMC and CSE?", a: "Yes. Our platform covers both the Therapist Multiple-Choice exam and the Clinical Simulation Examination with appropriate content for each format." },
      { q: "What is the TMC pass score?", a: "The NBRC TMC uses a scaled scoring system of 0-200. The low-cut score for the CRT credential is approximately 96, and the high-cut score for RRT eligibility is approximately 130." }
    ]
  },
  {
    slug: "rrt-canada",
    careerSlug: "rrt",
    pageType: "study-guide",
    title: "Respiratory Therapist CBRC National Exam Prep | Canada",
    metaDescription: "Prepare for the CBRC National Respiratory Therapy Examination with Canadian-specific content, CSRT standards, provincial licensing, and SI unit lab values.",
    h1: "RRT CBRC National Exam Prep (Canada)",
    heroSubtitle: "Canadian-focused respiratory therapy exam preparation for the CBRC National Examination with CSRT competency standards, provincial regulation, and SI unit clinical values.",
    sections: [
      { heading: "CBRC National Exam Blueprint", content: "Content aligned with the CBRC National Examination competency framework: Patient Assessment (30%), Therapeutic Interventions (35%), Equipment & Diagnostics (20%), and Professional Practice (15%). Pass threshold: 65%." },
      { heading: "Canadian Regulatory Framework", content: "Coverage of CSRT national standards, provincial respiratory therapy licensing, PIPEDA patient privacy, and Health Canada medical device regulations applicable to respiratory care." },
      { heading: "SI Units and Canadian Clinical Standards", content: "All ABG values, electrolytes, and clinical parameters displayed in SI units. Canadian drug formulary references and provincial medical directive frameworks included." }
    ],
    faqs: [
      { q: "Is this for the CBRC exam?", a: "Yes. Content is aligned with the Canadian Board for Respiratory Care national examination competencies and uses SI units throughout." },
      { q: "Does this cover provincial regulations?", a: "Our Canadian track covers CSRT national standards and provides a framework for understanding provincial respiratory therapy regulation across Canada." }
    ]
  },
  {
    slug: "imaging-us",
    careerSlug: "imaging",
    pageType: "study-guide",
    title: "Radiologic Technologist ARRT Certification Prep | United States",
    metaDescription: "Prepare for ARRT Radiography Certification with US-specific radiation safety, NRC regulations, MQSA standards, and state licensure requirements.",
    h1: "ARRT Radiography Certification Prep (United States)",
    heroSubtitle: "US-focused diagnostic imaging exam preparation for the ARRT Radiography Certification covering image production, radiation protection, and patient care with US conventional units.",
    sections: [
      { heading: "ARRT Exam Blueprint", content: "Content maps to the ARRT Radiography Examination: Image Production (30%), Procedures (30%), Patient Care & Education (20%), Radiation Protection (15%), and Equipment Operation & Quality Control (5%). 200 questions, 210 minutes, pass score 75/99." },
      { heading: "US Radiation Safety Regulations", content: "Comprehensive coverage of NRC radiation safety standards, state radiation control programs, ARRT Standards of Ethics, and MQSA mammography quality standards. Dose limits, ALARA principle, and regulatory compliance for US practice." },
      { heading: "State Licensure Requirements", content: "Overview of state-specific radiologic technologist licensing requirements, continuing education mandates, and scope of practice variations across US jurisdictions." }
    ],
    faqs: [
      { q: "Is this for the ARRT exam?", a: "Yes. All content is mapped to the ARRT Radiography Examination content specifications with proper domain weighting." },
      { q: "Does this cover radiation safety regulations?", a: "Comprehensive coverage of NRC regulations, ARRT ethics, state radiation control programs, and MQSA standards specific to US practice." }
    ]
  },
  {
    slug: "imaging-canada",
    careerSlug: "imaging",
    pageType: "study-guide",
    title: "Medical Radiation Technologist CAMRT Certification Prep | Canada",
    metaDescription: "Prepare for the CAMRT National Certification Examination with Canadian radiation safety standards, CNSC regulations, and provincial registration requirements.",
    h1: "CAMRT National Certification Prep (Canada)",
    heroSubtitle: "Canadian-focused diagnostic imaging exam preparation for the CAMRT National Certification Examination with CNSC radiation safety, provincial registration, and SI unit clinical values.",
    sections: [
      { heading: "CAMRT Exam Blueprint", content: "Content aligned with the CAMRT National Certification Examination: Radiographic Imaging (30%), Clinical Procedures (25%), Patient Care (20%), Radiation Safety (15%), and Professional Practice (10%). 180 questions, 210 minutes, pass threshold 65%." },
      { heading: "Canadian Radiation Safety", content: "Coverage of CNSC radiation protection requirements, CAMRT practice standards, provincial radiation safety regulations, and Health Canada medical device oversight applicable to diagnostic imaging." },
      { heading: "Provincial Registration", content: "Framework for understanding provincial medical radiation technologist registration, continuing competence requirements, and scope of practice across Canadian provinces." }
    ],
    faqs: [
      { q: "Is this for the CAMRT exam?", a: "Yes. Content is aligned with the CAMRT National Certification Examination competencies and uses SI units throughout." },
      { q: "Does this cover CNSC regulations?", a: "Yes. Canadian Nuclear Safety Commission radiation protection requirements and CAMRT practice standards are covered comprehensively." }
    ]
  },
  {
    slug: "paramedic-us",
    careerSlug: "paramedic",
    pageType: "study-guide",
    title: "Paramedic NREMT Certification Prep | United States",
    metaDescription: "Prepare for NREMT Paramedic Certification with US-specific trauma protocols, ACLS/PALS algorithms, state EMS regulations, and EMTALA requirements.",
    h1: "NREMT Paramedic Certification Prep (United States)",
    heroSubtitle: "US-focused paramedic certification preparation for the NREMT exam covering airway management, cardiology, trauma, pharmacology, and EMS operations with US protocols.",
    sections: [
      { heading: "NREMT Exam Blueprint", content: "Content maps to the NREMT Paramedic blueprint: Airway, Respiration & Ventilation (18%), Cardiology & Resuscitation (20%), Trauma (17%), Medical/OB/GYN (18%), EMS Operations (12%), and Pharmacology (15%). 120 questions, 150 minutes, pass threshold 70%." },
      { heading: "US EMS Regulatory Framework", content: "Coverage of NREMT scope of practice, EMTALA patient rights, HIPAA in EMS, state-specific medical direction and standing orders, and federal drug administration protocols for prehospital care." },
      { heading: "State Protocol Integration", content: "Framework for understanding state EMS protocols, medical director oversight, and standing order variations across US jurisdictions. Prepares you for both the national exam and state-specific practice." }
    ],
    faqs: [
      { q: "Is this for the NREMT exam?", a: "Yes. All content is mapped to the NREMT Paramedic Certification blueprint with proper domain weighting." },
      { q: "Does this cover state protocols?", a: "Our US track covers the NREMT national blueprint and provides a framework for understanding state-level protocol variations." }
    ]
  },
  {
    slug: "paramedic-canada",
    careerSlug: "paramedic",
    pageType: "study-guide",
    title: "Paramedic Provincial Certification Prep | Canada",
    metaDescription: "Prepare for Canadian provincial paramedic certification exams with PAC competency standards, provincial medical directives, base hospital programs, and metric drug calculations.",
    h1: "Paramedic Provincial Certification Prep (Canada)",
    heroSubtitle: "Canadian-focused paramedic exam preparation covering PAC National Competency Profile, provincial medical directives, base hospital programs, and PHIPA/PIPEDA compliance with SI units.",
    sections: [
      { heading: "Provincial Exam Blueprint", content: "Content aligned with Canadian provincial paramedic examination competencies: Patient Assessment (25%), Patient Management (30%), Clinical Decision Making (20%), Professional Practice (10%), and Health & Safety (15%). 120 questions, pass threshold 65%." },
      { heading: "Canadian Regulatory Framework", content: "Coverage of PAC National Competency Profile, provincial medical directives, base hospital program oversight, PHIPA/PIPEDA patient privacy regulations, and provincial scope of practice for PCP and ACP levels." },
      { heading: "Metric Calculations and SI Units", content: "All drug dosages in metric units, clinical values in SI units, and weight-based calculations using kilograms. Provincial drug formulary references and medical directive frameworks included." }
    ],
    faqs: [
      { q: "Is this for provincial exams?", a: "Yes. Content is aligned with PAC National Competency Profile and covers competencies tested on provincial paramedic certification examinations." },
      { q: "Does this cover medical directives?", a: "Our Canadian track covers the PAC competency framework and provides context for understanding provincial medical directive structures and base hospital oversight." }
    ]
  },
  {
    slug: "mlt-us",
    careerSlug: "mlt",
    pageType: "study-guide",
    title: "Medical Laboratory Technician ASCP Exam Prep | United States",
    metaDescription: "Prepare for the ASCP Board of Certification MLS/MLT Examination with US-specific CLIA regulations, CAP accreditation standards, and OSHA laboratory safety.",
    h1: "ASCP MLS/MLT Board Certification Prep (United States)",
    heroSubtitle: "US-focused medical laboratory exam preparation for the ASCP Board of Certification covering hematology, clinical chemistry, microbiology, and immunohematology with US regulatory standards.",
    sections: [
      { heading: "ASCP Exam Blueprint", content: "Content maps to the ASCP MLS/MLT examination: Hematology (25%), Clinical Chemistry (25%), Microbiology (20%), Immunohematology/Blood Banking (15%), Urinalysis & Body Fluids (10%), and Laboratory Operations (5%). 100 questions, 150 minutes, pass score 400/999." },
      { heading: "US Laboratory Regulations", content: "Comprehensive coverage of CLIA quality standards, CAP accreditation requirements, OSHA laboratory safety regulations, and HIPAA patient privacy in laboratory settings." }
    ],
    faqs: [
      { q: "Is this for the ASCP exam?", a: "Yes. All content is mapped to the ASCP Board of Certification MLS/MLT Examination content outline." },
      { q: "Does this cover CLIA regulations?", a: "Yes. CLIA quality standards, CAP accreditation, OSHA lab safety, and HIPAA requirements are covered comprehensively." }
    ]
  },
  {
    slug: "mlt-canada",
    careerSlug: "mlt",
    pageType: "study-guide",
    title: "Medical Laboratory Technologist CSMLS Exam Prep | Canada",
    metaDescription: "Prepare for the CSMLS National Certification Examination with Canadian laboratory standards, Accreditation Canada requirements, and provincial MLT regulation.",
    h1: "CSMLS National Certification Prep (Canada)",
    heroSubtitle: "Canadian-focused medical laboratory exam preparation for the CSMLS National Certification Examination covering hematology, clinical chemistry, microbiology, and transfusion science with SI units.",
    sections: [
      { heading: "CSMLS Exam Blueprint", content: "Content aligned with the CSMLS National Certification Examination: Hematology & Coagulation (25%), Clinical Chemistry (20%), Microbiology (20%), Transfusion Science (15%), Histotechnology (10%), and Quality Management (10%). 120 questions, 180 minutes, pass threshold 65%." },
      { heading: "Canadian Laboratory Standards", content: "Coverage of CSMLS competency standards, Accreditation Canada laboratory quality requirements, provincial MLT regulation, and PIPEDA patient privacy in laboratory settings." }
    ],
    faqs: [
      { q: "Is this for the CSMLS exam?", a: "Yes. Content is aligned with the CSMLS National Certification Examination competencies and uses SI units throughout." },
      { q: "Does this cover provincial regulation?", a: "Our Canadian track covers CSMLS national standards and provides a framework for understanding provincial MLT regulation across Canada." }
    ]
  },
  {
    slug: "pharmacy-technician-top-200-drugs-flashcards",
    careerSlug: "pharmacy-tech",
    pageType: "flashcards",
    title: "Top 200 Drugs Flashcards for Pharmacy Technicians | PTCB Prep",
    metaDescription: "Master the top 200 prescribed drugs with interactive flashcards. Brand/generic names, drug classes, indications, and key side effects for PTCB and ExCPT exam prep.",
    h1: "Top 200 Drugs Flashcards for Pharmacy Technicians",
    heroSubtitle: "Interactive spaced-repetition flashcards covering the most prescribed medications — brand/generic names, classifications, indications, mechanisms, and critical side effects you need for certification.",
    sections: [
      {
        heading: "Why Memorizing the Top 200 Drugs Matters",
        content: "The PTCB and ExCPT exams heavily test your knowledge of the most commonly prescribed medications. Knowing brand/generic name pairs, drug classes, primary indications, and key safety information for the top 200 drugs is essential for passing. Our flashcard system uses spaced repetition to ensure long-term retention — not just short-term cramming."
      },
      {
        heading: "What Each Flashcard Covers",
        content: "Each card tests one drug with its brand name, generic name, drug class, primary indication, mechanism of action, and critical side effects or contraindications. Cards are organized by therapeutic category: cardiovascular, endocrine, CNS, respiratory, GI, anti-infective, and more — matching how drugs are tested on the exam."
      },
      {
        heading: "Spaced Repetition for Maximum Retention",
        content: "Our flashcard engine tracks which drugs you know well and which ones you struggle with. Cards you miss reappear more frequently, while mastered cards space out over longer intervals. This scientifically proven method helps you retain hundreds of drug names and facts with less total study time."
      },
      {
        heading: "Beyond Just Names: Clinical Context",
        content: "Each flashcard includes clinical context — common dosing, drug interactions, monitoring parameters, and patient counseling points. This deeper understanding helps you answer application-level questions on the exam, not just recall questions."
      }
    ],
    faqs: [
      { q: "How many drug flashcards are included?", a: "Our pharmacy tech flashcard library includes 300+ cards across 18 decks. The Top 200 Drugs deck alone has 25 high-yield cards covering the most tested medications, with additional drug cards spread across other decks." },
      { q: "Do the flashcards cover both brand and generic names?", a: "Yes. Every drug flashcard includes both the brand name and generic name, along with the drug class, primary indication, and key clinical facts. You'll be tested on both directions — given the brand, recall the generic, and vice versa." },
      { q: "How does spaced repetition work?", a: "When you mark a card as 'Got It,' it reappears after a longer interval. Cards marked 'Review Again' come back sooner. Over time, the system optimizes your review schedule so you study efficiently — spending more time on challenging drugs and less on ones you've mastered." },
      { q: "Are the drugs organized by category?", a: "Yes. Drugs are grouped by therapeutic class (cardiovascular, CNS, endocrine, anti-infective, etc.) matching how they're tested on the PTCB exam. You can study all cards or focus on specific categories." },
      { q: "Can I use these flashcards on my phone?", a: "Absolutely. The flashcard interface is fully responsive and works on phones, tablets, and computers. Study during breaks, on your commute, or at your desk." },
      { q: "Are these aligned with the PTCB exam?", a: "Yes. The drug selection is based on the most commonly tested medications on the PTCB and ExCPT exams, mapped to the Medications knowledge area of the PTCE blueprint." }
    ]
  },
  {
    slug: "pharmacy-technician-dosage-calculations-practice",
    careerSlug: "pharmacy-tech",
    pageType: "practice-questions",
    title: "Pharmacy Technician Dosage Calculations Practice | Step-by-Step Solutions",
    metaDescription: "Practice pharmacy math with 60+ dosage calculation problems. Step-by-step solutions for dilutions, drip rates, day supply, pediatric dosing, and compounding math.",
    h1: "Pharmacy Technician Dosage Calculations Practice",
    heroSubtitle: "Master pharmacy math with 60+ calculation problems featuring worked step-by-step solutions — covering dilutions, IV drip rates, day supply, pediatric dosing, alligation, and compounding math.",
    sections: [
      {
        heading: "Why Dosage Calculations Are Critical",
        content: "Pharmacy math represents a significant portion of the PTCB exam and is essential for daily pharmacy practice. Calculation errors can directly harm patients. Our practice problems cover every type of math you'll encounter: ratio/proportion, dilutions (C1V1=C2V2), day supply calculations, weight-based dosing, drip rate calculations, alligation, and compounding measurements."
      },
      {
        heading: "Step-by-Step Worked Solutions",
        content: "Every calculation problem includes a detailed step-by-step solution showing exactly how to set up and solve the problem. We don't just give you the answer — we walk you through the method so you can apply the same approach to any similar problem on your exam. Each solution includes the formula used, unit conversions, and common pitfalls to avoid."
      },
      {
        heading: "Progressive Difficulty Levels",
        content: "Problems range from basic unit conversions (Level 1) to complex multi-step calculations like TPN compounding and alligation (Level 5). Start with easier problems to build confidence, then work up to exam-level difficulty. Our adaptive system remembers which calculation types challenge you most."
      },
      {
        heading: "Real-World Pharmacy Scenarios",
        content: "Our calculation problems are set in realistic pharmacy contexts: reconstituting antibiotics, calculating insulin doses, determining day supply for insurance billing, converting between measurement systems, and compounding prescriptions. This context-based approach mirrors how math appears on the actual exam."
      }
    ],
    faqs: [
      { q: "How many dosage calculation problems are available?", a: "We have 60+ dedicated dosage calculation practice problems with detailed step-by-step solutions. Additional math problems are integrated throughout the full question bank of 700+ questions." },
      { q: "What types of calculations are covered?", a: "Everything tested on the PTCB: ratio/proportion, dilutions, day supply, drip rates, weight-based dosing, concentration conversions (%, ratio strength, mg/mL), alligation, compounding math, and business math (markup, inventory turnover)." },
      { q: "Do the solutions show all the steps?", a: "Yes. Every problem includes a complete worked solution showing the formula, setup, unit conversions, and final answer. We also explain why each step is necessary and common mistakes to avoid." },
      { q: "Can I focus on specific calculation types?", a: "Yes. Use the category filter to focus on specific calculation types like drip rates, day supply, or concentration math. The system tracks your performance by calculation type so you can target your weakest areas." },
      { q: "What if I'm terrible at math?", a: "Start with Level 1 problems that cover basic conversions and simple proportions. Our step-by-step solutions teach you the method, and the spaced repetition system ensures you practice each type until it becomes automatic. Most students see significant improvement within 2-3 weeks." },
      { q: "Are these calculations realistic?", a: "Yes. Problems use real drug names, actual concentrations, and realistic pharmacy scenarios. The same types of calculations you'll perform daily as a pharmacy technician." }
    ]
  },
  {
    slug: "pharmacy-technician-dosage-calculations",
    careerSlug: "pharmacy-tech",
    pageType: "category",
    title: "Pharmacy Technician Dosage Calculations | Complete Study Guide & Practice",
    metaDescription: "Master pharmacy dosage calculations for the PTCB exam. Practice drip rates, day supply, dilutions, pediatric dosing, alligation, and compounding math with detailed solutions.",
    h1: "Pharmacy Technician Dosage Calculations",
    heroSubtitle: "Everything you need to master pharmacy math — from basic conversions to complex compounding calculations, with practice problems and step-by-step solutions.",
    sections: [
      { heading: "Essential Conversion Factors", content: "Every pharmacy calculation starts with unit conversions. Master the critical conversions: 1 tsp = 5 mL, 1 tbsp = 15 mL, 1 oz = 30 mL, 1 kg = 2.2 lbs, 1 grain = 65 mg, 1 L = 1000 mL. These form the foundation for every calculation type you'll encounter on the PTCB exam." },
      { heading: "Day Supply Calculations", content: "Insurance billing requires accurate day supply calculations. For tablets: quantity ÷ daily dose. For liquids: total volume ÷ daily volume. For inhalers: total actuations ÷ daily puffs. PRN medications use the maximum daily dose. Our practice problems cover all common day supply scenarios." },
      { heading: "IV Drip Rate & Flow Rate", content: "Calculate IV infusion parameters: flow rate (mL/hr) = volume ÷ time in hours. Drip rate (gtt/min) = (volume × drop factor) ÷ time in minutes. With microdrip sets (60 gtt/mL), the gtt/min equals the mL/hr rate. Practice with real-world infusion scenarios." },
      { heading: "Dilution & Concentration Math", content: "Master C1V1 = C2V2 for dilution problems. Convert between %, ratio strength, and mg/mL. Remember: 1% = 10 mg/mL = 1:100. Alligation is used to mix two concentrations to achieve a desired intermediate strength." }
    ],
    faqs: [
      { q: "What math is on the PTCB exam?", a: "The PTCB tests conversions, ratio/proportion, day supply, drip rates, dilutions, concentration calculations, weight-based dosing, and business math. Calculations appear throughout the exam, not just in one section." },
      { q: "How many calculation questions are on the PTCB?", a: "Approximately 10-15% of PTCB questions involve calculations. However, pharmacology questions also require understanding of dosing, making math skills critical for a larger portion of the exam." },
      { q: "What calculator can I use on the PTCB?", a: "An on-screen calculator is provided during the PTCB exam. Practice using a basic calculator rather than relying on a scientific calculator's advanced functions." },
      { q: "What's the hardest calculation type?", a: "Most students find alligation and multi-step compounding calculations most challenging. Our practice problems build up to these complex types progressively." }
    ]
  },
  {
    slug: "pharmacy-technician-pharmacy-law-and-ethics",
    careerSlug: "pharmacy-tech",
    pageType: "category",
    title: "Pharmacy Law & Ethics for Technicians | DEA, HIPAA, OBRA-90 Guide",
    metaDescription: "Complete pharmacy law review for PTCB exam prep. DEA controlled substance regulations, HIPAA compliance, OBRA-90 requirements, and federal pharmacy law essentials.",
    h1: "Pharmacy Law & Ethics for Pharmacy Technicians",
    heroSubtitle: "Master federal pharmacy regulations — DEA controlled substance scheduling, HIPAA patient privacy, OBRA-90 counseling requirements, and drug safety laws tested on the PTCB exam.",
    sections: [
      { heading: "DEA Controlled Substance Regulations", content: "Understand the five DEA schedules, prescribing and dispensing requirements for each, refill rules (C-II: no refills; C-III to C-V: 5 refills in 6 months), DEA Forms 222, 106, and 41, partial fill rules, emergency dispensing, and transfer regulations. This is high-yield PTCB content." },
      { heading: "HIPAA Privacy and Security", content: "Protected Health Information (PHI) includes any individually identifiable health data. Understand the Privacy Rule (who can access PHI), Security Rule (electronic safeguards), Breach Notification Rule, patient rights, and the minimum necessary standard. Violations carry civil and criminal penalties." },
      { heading: "OBRA-90 and Patient Counseling", content: "OBRA-90 mandates prospective Drug Utilization Review (DUR) and pharmacist counseling for all Medicaid prescriptions. DUR checks include drug-drug interactions, therapeutic duplication, incorrect dosing, and clinical abuse. Understanding OBRA-90 is essential for PTCB success." },
      { heading: "Key Federal Laws", content: "Review the Pure Food and Drug Act (1906), FD&C Act (1938), Durham-Humphrey Amendment (Rx vs OTC), Kefauver-Harris Amendment (efficacy requirement), Poison Prevention Packaging Act, Drug Price Competition Act (generics), and the Dietary Supplement Health and Education Act." }
    ],
    faqs: [
      { q: "How much of the PTCB is pharmacy law?", a: "Federal Requirements make up 12.5% of the PTCB exam. However, law knowledge is also tested within other domains — making it approximately 15-20% of total exam content when combined." },
      { q: "Do I need to know state laws?", a: "The PTCB tests federal law only. However, your state board exam (if required) will test state-specific regulations. When state and federal laws conflict, the stricter law applies." },
      { q: "What DEA forms should I know?", a: "Know DEA Form 222 (ordering C-II), Form 106 (theft/loss reporting), Form 41 (destruction), and the biennial inventory requirement. Also know DEA number format and validation." },
      { q: "Is ethics tested separately?", a: "Ethics is woven throughout the exam, not a separate section. Understanding professional responsibilities, patient confidentiality, and appropriate scope of practice is tested in context." }
    ]
  },
  {
    slug: "pharmacy-technician-medication-safety",
    careerSlug: "pharmacy-tech",
    pageType: "category",
    title: "Medication Safety for Pharmacy Technicians | Error Prevention & ISMP Guidelines",
    metaDescription: "Learn medication safety principles for the PTCB exam. ISMP high-alert drugs, Tall Man Lettering, error prevention strategies, and quality improvement in pharmacy practice.",
    h1: "Medication Safety for Pharmacy Technicians",
    heroSubtitle: "Master medication error prevention — high-alert medications, look-alike/sound-alike drugs, Tall Man Lettering, ISMP guidelines, and quality improvement processes tested on the PTCB exam.",
    sections: [
      { heading: "High-Alert Medications", content: "ISMP high-alert medications have heightened risk of causing significant harm if used in error. Key categories: insulin, anticoagulants (warfarin, heparin), opioids, chemotherapy, concentrated electrolytes (KCl, NaCl 23.4%), and neuromuscular blocking agents. Know the extra safeguards required for each." },
      { heading: "Look-Alike Sound-Alike (LASA) Prevention", content: "Tall Man Lettering visually differentiates confusable drug names: hydrALAZINE vs hydrOXYzine, predniSONE vs prednisoLONE, vinCRIStine vs vinBLAStine. Know the ISMP LASA list and strategies like shelf separation, alert labels, and automated verification." },
      { heading: "Medication Error Prevention", content: "The Five Rights (patient, drug, dose, route, time), barcode medication administration (BCMA), independent double checks, error reporting systems, root cause analysis, and the Swiss cheese model of accident causation. A just culture encourages reporting without punitive consequences." },
      { heading: "Quality Improvement in Pharmacy", content: "Continuous Quality Improvement (CQI) uses data to identify patterns, implement changes, and measure results. Understand MedWatch adverse event reporting, medication guide requirements, REMS programs, and how pharmacies use near-miss reporting to prevent future errors." }
    ],
    faqs: [
      { q: "How much of the PTCB covers safety?", a: "Patient Safety and Quality Assurance makes up 26.25% of the PTCB exam — the second-largest domain. This includes medication error prevention, high-alert drugs, ISMP guidelines, and quality improvement." },
      { q: "What are the most important high-alert drugs to know?", a: "Focus on insulin, warfarin, heparin, opioids, concentrated KCl, neuromuscular blockers, methotrexate (weekly vs daily dosing error), and chemotherapy agents. Know what makes each high-alert and the safety measures required." },
      { q: "What is Tall Man Lettering?", a: "A safety strategy using capital letters to highlight differences between look-alike drug names. The ISMP maintains an official list. Examples: hydrALAZINE/hydrOXYzine, DOBUTamine/DOPamine, buPROPion/busPIRone." },
      { q: "Do I need to know ISMP guidelines?", a: "Yes. The PTCB tests knowledge of ISMP's Do Not Use abbreviation list, high-alert medication list, LASA drug list, and error prevention strategies. These are essential pharmacy safety standards." }
    ]
  },
  {
    slug: "pharmacy-technician-top-200-drugs",
    careerSlug: "pharmacy-tech",
    pageType: "category",
    title: "Top 200 Drugs for Pharmacy Technicians | Brand/Generic Names & Drug Classes",
    metaDescription: "Master the top 200 prescribed drugs for the PTCB exam. Brand/generic name pairs, drug classes, indications, mechanisms, side effects, and clinical pearls.",
    h1: "Top 200 Drugs for Pharmacy Technicians",
    heroSubtitle: "Complete guide to the most commonly prescribed medications — brand/generic name pairs, drug classifications, primary indications, key side effects, and drug interactions for PTCB certification.",
    sections: [
      { heading: "Cardiovascular Drugs", content: "Master the major CV drug classes: ACE inhibitors (-pril), ARBs (-sartan), beta-blockers (-olol), CCBs (-dipine), statins (-statin), diuretics, and anticoagulants. Know brand/generic pairs, mechanisms, key side effects (ACE-I cough, statin myopathy), and monitoring parameters." },
      { heading: "CNS and Psychiatric Medications", content: "Key classes: SSRIs, SNRIs, atypical antidepressants, benzodiazepines (C-IV), antipsychotics, anticonvulsants, and ADHD medications. Know black box warnings (suicidality with antidepressants), drug interactions (serotonin syndrome risk), and controlled substance scheduling." },
      { heading: "Endocrine and Metabolic Drugs", content: "Diabetes medications (metformin, sulfonylureas, insulins, GLP-1 agonists, SGLT2 inhibitors, DPP-4 inhibitors), thyroid drugs (levothyroxine), osteoporosis treatments (bisphosphonates), and hormone therapies. Know mechanisms, monitoring, and key counseling points." },
      { heading: "Anti-Infective Agents", content: "Antibiotics by class: penicillins (-cillin), cephalosporins (cef-), fluoroquinolones (-floxacin), macrolides (-mycin), tetracyclines (-cycline). Plus antifungals (-azole), antivirals (-vir), and key interactions (fluoroquinolone chelation, warfarin-azole interaction)." }
    ],
    faqs: [
      { q: "Do I really need to memorize 200 drugs?", a: "The PTCB Medications domain is 40% of the exam — the largest section. Knowing the top 200 drugs' brand/generic names, classes, and key facts is the single most impactful study strategy." },
      { q: "What's the best way to learn drug names?", a: "Use our flashcards with spaced repetition. Focus on drug class suffixes first (-pril, -sartan, -olol, -statin) to identify classes quickly. Then learn the top 5 drugs in each class with brand names." },
      { q: "Are OTC drugs included?", a: "Yes. Common OTC medications like PPIs, H2 blockers, NSAIDs, antihistamines, and cough/cold products are included since they appear frequently on the PTCB exam." },
      { q: "How are the drugs organized?", a: "Drugs are grouped by therapeutic category matching the PTCB blueprint: cardiovascular, CNS, endocrine, anti-infective, respiratory, GI, and more. This helps you see relationships between drugs in the same class." }
    ]
  },
];

function getPageBySlug(slug: string): SEOPageConfig | undefined {
  return SEO_PAGES.find(p => p.slug === slug);
}

function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3" data-testid="seo-faq-section">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            data-testid={`faq-toggle-${i}`}
          >
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed" data-testid={`faq-answer-${i}`}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PageTypeIcon({ type }: { type: SEOPageConfig["pageType"] }) {
  switch (type) {
    case "practice-questions": return <BookOpen className="w-6 h-6" />;
    case "mock-exam": return <FileText className="w-6 h-6" />;
    case "study-guide": return <Brain className="w-6 h-6" />;
  }
}

export default function AlliedSeoLandingPage({ pageSlug }: { pageSlug: string }) {
  const page = getPageBySlug(pageSlug);

  if (!page) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-page-not-found">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <Link href="/careers" className="text-teal-600 font-medium hover:underline" data-testid="link-browse-careers">Browse All Careers</Link>
      </div>
    );
  }

  const career = Object.values(CAREER_CONFIGS).find(c => c.slug === page.careerSlug);

  return (
    <div data-testid={`seo-landing-${page.slug}`}>
      <AlliedSEO
        title={page.title}
        description={page.metaDescription}
        canonicalPath={`/${page.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": page.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        }}
        additionalStructuredData={[{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://allied.nursenest.ca/" },
            { "@type": "ListItem", "position": 2, "name": career?.name || "Allied Health", "item": `https://allied.nursenest.ca/career/${page.careerSlug}` },
            { "@type": "ListItem", "position": 3, "name": page.h1, "item": `https://allied.nursenest.ca/${page.slug}` }
          ]
        }]}
      />
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-teal-300 mb-6">
            <PageTypeIcon type={page.pageType} />
            <span>{career?.name || "Allied Health"}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" data-testid="text-seo-h1">
            {page.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed" data-testid="text-seo-subtitle">
            {page.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/diagnostic?career=${page.careerSlug}`}
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors"
              data-testid="button-start-diagnostic"
            >
              Start Free Diagnostic
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors border border-white/20"
              data-testid="link-view-pricing"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: BookOpen, label: "500+ Questions", sub: "Exam-authentic" },
              { icon: Target, label: "Weak-Area Focus", sub: "Domain targeting" },
              { icon: BarChart3, label: "Performance", sub: "Detailed analytics" },
              { icon: Clock, label: "CAT Engine", sub: "Adaptive difficulty" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2" data-testid={`stat-${i}`}>
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-900">{stat.label}</span>
                <span className="text-sm text-gray-500">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {page.sections.map((section, i) => (
            <div key={i} data-testid={`content-section-${i}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.heading}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">NurseNest Allied vs Generic Question Banks</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">See why students choose NurseNest Allied for serious exam preparation.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" data-testid="comparison-table">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase">Feature</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-teal-600 uppercase">NurseNest Allied</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase">Generic Banks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Rationale Depth", allied: "600+ words per question", generic: "1–2 sentence explanation" },
                  { feature: "Exam Simulation", allied: "Adaptive CAT-style engine", generic: "Static linear exams" },
                  { feature: "Weak-Area Targeting", allied: "Identifies & drills weak domains", generic: "Random question order" },
                  { feature: "Question Volume", allied: "4,000+ questions roadmap", generic: "Limited static bank" },
                  { feature: "Blueprint Alignment", allied: "Mapped to official blueprint", generic: "Generic topic coverage" },
                  { feature: "Study Planning", allied: "Personalized adaptive schedule", generic: "Self-directed only" },
                  { feature: "Interactive Tools", allied: "Career-specific smart tools", generic: "Not available" },
                  { feature: "Performance Analytics", allied: "Domain-level trends", generic: "Basic score only" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm">{row.feature}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="flex items-center gap-2 text-teal-700">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        {row.allied}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Studying?</h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">Choose the plan that fits your timeline. Start free, upgrade when you're ready.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-sm text-teal-200 mb-1">Monthly</p>
                <p className="text-3xl font-bold">$29<span className="text-sm font-normal text-teal-200">/mo</span></p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/40 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-0.5 rounded-full">BEST VALUE</span>
                <p className="text-sm text-teal-200 mb-1">Annual</p>
                <p className="text-3xl font-bold">$239<span className="text-sm font-normal text-teal-200">/yr</span></p>
                <p className="text-xs text-teal-200">Save 31%</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/diagnostic?career=${page.careerSlug}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-colors"
                data-testid="button-pricing-diagnostic"
              >
                Start Free Diagnostic
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/40 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                data-testid="link-pricing-page"
              >
                See Full Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={page.faqs} />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href={`/qbank?career=${page.careerSlug}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-qbank"
            >
              <BookOpen className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Question Bank</p>
                <p className="text-xs text-gray-500">Practice with rationales</p>
              </div>
            </Link>
            <Link
              href={`/${page.careerSlug}/mock-exams`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-mock-exams"
            >
              <FileText className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Mock Exams</p>
                <p className="text-xs text-gray-500">Full-length practice tests</p>
              </div>
            </Link>
            <Link
              href={`/diagnostic?career=${page.careerSlug}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-diagnostic"
            >
              <Target className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Free Diagnostic</p>
                <p className="text-xs text-gray-500">15-question assessment</p>
              </div>
            </Link>
            <Link
              href={`/${page.careerSlug}/flashcards`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-flashcards"
            >
              <Brain className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Flashcards</p>
                <p className="text-xs text-gray-500">Spaced repetition</p>
              </div>
            </Link>
            <Link
              href={`/${page.careerSlug}/study-plan`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-study-plan"
            >
              <Award className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Study Planner</p>
                <p className="text-xs text-gray-500">Personalized schedule</p>
              </div>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-pricing"
            >
              <Star className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Pricing</p>
                <p className="text-xs text-gray-500">Plans & features</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { SEO_PAGES, getPageBySlug };
export type { SEOPageConfig };
