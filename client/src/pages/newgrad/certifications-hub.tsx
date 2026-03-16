import { Link } from "wouter";
import { useState } from "react";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PremiumUpgradeCTA } from "./premium-cta";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  ArrowRight, Award, ShieldCheck, BookOpen, ChevronRight,
  HelpCircle, TrendingUp, Clock, DollarSign, GraduationCap,
  Heart, Zap, Activity, Baby, Scissors, Stethoscope, Brain
} from "lucide-react";

export const NEWGRAD_CERTIFICATIONS = [
  {
    slug: "acls",
    name: "ACLS",
    fullName: "Advanced Cardiovascular Life Support",
    org: "AHA",
    description: "Master cardiac arrest algorithms, STEMI management, stroke protocols, and advanced airway interventions required in most acute care settings.",
    questionCount: "200+",
    icon: Heart,
    color: "red",
    topics: [
      "Cardiac arrest algorithms (VF/pVT, PEA, Asystole)",
      "Post-cardiac arrest care & targeted temperature management",
      "Acute coronary syndromes & STEMI management",
      "Stroke recognition & fibrinolytic checklist",
      "Bradycardia & tachycardia algorithms",
      "Advanced airway management",
      "Pharmacology (epinephrine, amiodarone, atropine, adenosine)",
      "High-quality CPR & team dynamics",
    ],
    clinicalContext: "ACLS certification is required by virtually all hospitals for nurses working in ICU, ER, telemetry, step-down, and procedural areas. Many employers require ACLS within 90 days of hire for new graduate nurses in acute care.",
    faq: [
      { question: "Is ACLS required for new graduate nurses?", answer: "Most hospitals require ACLS for nurses in critical care, emergency, telemetry, and step-down units. Some require it before starting, others within 90 days of hire. Med-surg units may not require it immediately but encourage it." },
      { question: "How long does the ACLS course take?", answer: "The initial ACLS provider course is typically 2 days (about 14 hours). Renewal courses are shorter, usually 1 day. Many programs include online pre-learning modules." },
      { question: "What is the pass rate for ACLS?", answer: "ACLS pass rates are generally high (85-95%) because the course includes extensive practice before testing. The written exam requires 84% to pass, and you must demonstrate competency in megacode scenarios." },
    ],
  },
  {
    slug: "bls",
    name: "BLS",
    fullName: "Basic Life Support",
    org: "AHA",
    description: "Foundation of emergency response — high-quality CPR, AED use, choking management, and team-based resuscitation for healthcare providers.",
    questionCount: "150+",
    icon: Activity,
    color: "blue",
    topics: [
      "High-quality CPR for adults, children, and infants",
      "AED operation and pad placement",
      "Bag-valve-mask ventilation technique",
      "Choking management (conscious and unconscious)",
      "Recovery position and post-resuscitation care",
      "Team-based resuscitation dynamics",
      "Special considerations (drowning, opioid overdose, pregnancy)",
      "Chain of survival and early recognition",
    ],
    clinicalContext: "BLS is the most fundamental certification for all healthcare providers. Every hospital requires current BLS certification for all nursing staff, regardless of unit or specialty. It must be renewed every 2 years.",
    faq: [
      { question: "Do I need BLS before starting my nursing job?", answer: "Yes. BLS (Basic Life Support) for Healthcare Providers is universally required before your first day on any nursing unit. Most nursing programs include BLS certification before graduation." },
      { question: "What is the difference between BLS and CPR?", answer: "BLS for Healthcare Providers is more comprehensive than basic CPR. It includes two-rescuer CPR, bag-valve-mask ventilation, team dynamics, and special situations. It's designed specifically for healthcare professionals." },
      { question: "How often does BLS need to be renewed?", answer: "BLS certification is valid for 2 years. Many hospitals offer on-site renewal courses. Some now accept HeartCode BLS (online + skills session) for renewal." },
    ],
  },
  {
    slug: "pals",
    name: "PALS",
    fullName: "Pediatric Advanced Life Support",
    org: "AHA",
    description: "Systematic approach to pediatric emergencies — recognition of respiratory distress, shock management, and pediatric resuscitation algorithms.",
    questionCount: "180+",
    icon: Baby,
    color: "sky",
    topics: [
      "Pediatric assessment triangle (PAT)",
      "Pediatric respiratory distress vs. failure recognition",
      "Pediatric shock recognition and fluid resuscitation",
      "Pediatric cardiac arrest algorithms",
      "Weight-based medication dosing (Broselow tape)",
      "Pediatric bradycardia and tachycardia management",
      "Post-resuscitation care in pediatrics",
      "Effective team communication in pediatric emergencies",
    ],
    clinicalContext: "PALS is required for nurses working in pediatric units (PICU, NICU, pediatric ED, pediatric med-surg) and emergency departments. Many hospitals require it within 6 months of starting in these units.",
    faq: [
      { question: "Which units require PALS certification?", answer: "PALS is required in pediatric ICU, NICU, pediatric emergency, pediatric med-surg, and general emergency departments. Labor & delivery units often require it as well." },
      { question: "Is PALS harder than ACLS?", answer: "Many nurses find PALS more challenging because pediatric physiology, weight-based dosing, and age-specific parameters add complexity. The systematic approach (assess-categorize-decide-act) helps organize the content." },
      { question: "Can I take PALS without ACLS?", answer: "Yes, PALS and ACLS are independent certifications. However, BLS is a prerequisite for both. Having ACLS knowledge helps because many concepts overlap." },
    ],
  },
  {
    slug: "tncc",
    name: "TNCC",
    fullName: "Trauma Nursing Core Course",
    org: "ENA",
    description: "Systematic trauma assessment, life-threatening injury recognition, and evidence-based trauma interventions using the nursing process.",
    questionCount: "150+",
    icon: Zap,
    color: "orange",
    topics: [
      "Systematic trauma assessment (primary & secondary survey)",
      "Airway management in trauma patients",
      "Hemorrhage control and massive transfusion protocols",
      "Thoracic, abdominal, and pelvic trauma",
      "Traumatic brain injury assessment and management",
      "Spinal cord injury immobilization and assessment",
      "Musculoskeletal trauma and compartment syndrome",
      "Special populations (pediatric, geriatric, obstetric trauma)",
    ],
    clinicalContext: "TNCC is the gold standard trauma nursing certification offered by the Emergency Nurses Association (ENA). Required or strongly preferred for emergency department and trauma center nurses.",
    faq: [
      { question: "Is TNCC required for ER nurses?", answer: "Many Level I and Level II trauma centers require TNCC within the first year of hire. Even if not required, it significantly strengthens your trauma assessment and intervention skills." },
      { question: "How is TNCC different from ACLS?", answer: "ACLS focuses on cardiac emergencies and resuscitation algorithms. TNCC focuses specifically on trauma assessment and management using the Trauma Nursing Process (assessment, diagnosis, planning, implementation, evaluation)." },
      { question: "How long is the TNCC course?", answer: "TNCC is a 2-day course (approximately 16 hours) with both didactic and hands-on psychomotor skills testing. You must pass a written exam and demonstrate competency in trauma assessment stations." },
    ],
  },
  {
    slug: "nrp",
    name: "NRP",
    fullName: "Neonatal Resuscitation Program",
    org: "AAP",
    description: "Evidence-based neonatal resuscitation — initial steps, positive pressure ventilation, chest compressions, and medication administration for newborns.",
    questionCount: "120+",
    icon: Baby,
    color: "pink",
    topics: [
      "Initial steps of neonatal resuscitation (warm, dry, stimulate)",
      "Positive pressure ventilation (PPV) technique",
      "Corrective steps for ventilation (MR SOPA)",
      "Chest compressions in neonates (3:1 ratio)",
      "Epinephrine and volume expansion administration",
      "Laryngeal mask airway and intubation",
      "Umbilical venous catheter insertion",
      "Post-resuscitation care and monitoring",
    ],
    clinicalContext: "NRP is required for all nurses working in labor & delivery, NICU, newborn nursery, and postpartum units. It's administered by the American Academy of Pediatrics and renewed every 2 years.",
    faq: [
      { question: "Which nurses need NRP certification?", answer: "NRP is required for labor & delivery, NICU, newborn nursery, and postpartum nurses. Some emergency departments also require it. It's essential for any nurse who may be present at a delivery." },
      { question: "Is NRP difficult?", answer: "NRP focuses on a systematic algorithm that builds step by step. The online exam must be completed before the hands-on skills session. Most nurses pass with adequate preparation using the NRP textbook and online modules." },
      { question: "How often is NRP renewed?", answer: "NRP certification is valid for 2 years. Renewal requires completing the updated online exam and demonstrating skills competency. Many hospitals offer on-site renewal courses." },
    ],
  },
  {
    slug: "enpc",
    name: "ENPC",
    fullName: "Emergency Nursing Pediatric Course",
    org: "ENA",
    description: "Systematic approach to pediatric emergency care — triage, respiratory emergencies, shock management, trauma assessment, and stabilization of critically ill children.",
    questionCount: "130+",
    icon: Baby,
    color: "violet",
    topics: [
      "Pediatric assessment triangle and triage",
      "Pediatric respiratory emergencies (croup, epiglottitis, asthma, bronchiolitis)",
      "Pediatric shock recognition and fluid resuscitation",
      "Pediatric trauma assessment (primary and secondary survey)",
      "Child maltreatment recognition and reporting",
      "Pediatric seizure and neurological emergency management",
      "Neonatal emergencies in the ED setting",
      "Family-centered care and psychosocial considerations",
    ],
    clinicalContext: "ENPC is offered by the Emergency Nurses Association (ENA) for nurses caring for pediatric patients in emergency settings. It is strongly preferred or required for pediatric ED nurses and general ED nurses who see pediatric patients.",
    faq: [
      { question: "Who should take ENPC?", answer: "ENPC is designed for emergency nurses, pediatric nurses, and any nurse who may care for acutely ill or injured children. Many emergency departments require or strongly encourage ENPC certification." },
      { question: "How is ENPC different from PALS?", answer: "PALS focuses on pediatric resuscitation algorithms (cardiac arrest, arrhythmias). ENPC covers the broader scope of pediatric emergency nursing including triage, trauma, medical emergencies, and family-centered care using the nursing process." },
      { question: "How long is the ENPC course?", answer: "ENPC is a 2-day course (approximately 16 hours) with didactic content, hands-on skills stations, and written/skills testing. Certification is valid for 4 years." },
    ],
  },
  {
    slug: "cen",
    name: "CEN",
    fullName: "Certified Emergency Nurse",
    org: "BCEN",
    description: "Comprehensive emergency nursing certification covering triage, trauma, cardiac emergencies, and the full spectrum of ED patient presentations.",
    questionCount: "250+",
    icon: Stethoscope,
    color: "emerald",
    topics: [
      "Emergency triage systems (ESI 5-level triage)",
      "Cardiovascular emergencies (ACS, aortic emergencies, dysrhythmias)",
      "Neurological emergencies (stroke, seizures, TBI)",
      "Respiratory emergencies (PE, pneumothorax, status asthmaticus)",
      "Gastrointestinal and genitourinary emergencies",
      "Toxicological emergencies and substance overdose",
      "Environmental emergencies (hypothermia, heat stroke, envenomation)",
      "Psychosocial and mental health emergencies",
    ],
    clinicalContext: "The CEN is the premier emergency nursing certification from the Board of Certification for Emergency Nursing (BCEN). It requires 2 years of ED experience and demonstrates specialized emergency nursing expertise.",
    faq: [
      { question: "How much experience do I need for CEN?", answer: "BCEN recommends 2 years of emergency nursing experience before attempting the CEN exam. The exam tests applied clinical knowledge across all emergency nursing domains." },
      { question: "What is the CEN exam format?", answer: "The CEN exam consists of 175 multiple-choice questions (150 scored + 25 pretest) with a 3-hour time limit. It covers cardiovascular, respiratory, neurological, GI/GU, psychosocial, and professional practice domains." },
      { question: "Does CEN increase salary?", answer: "Yes. Many hospitals offer certification pay differentials ranging from $1,000-$5,000 annually for CEN certification. It also strengthens your resume for leadership and educator positions." },
    ],
  },
  {
    slug: "ccrn",
    name: "CCRN",
    fullName: "Critical-Care Registered Nurse",
    org: "AACN",
    description: "Gold standard ICU certification — hemodynamic monitoring, ventilator management, vasoactive medications, and complex critical care decision-making.",
    questionCount: "300+",
    icon: Activity,
    color: "rose",
    topics: [
      "Hemodynamic monitoring and waveform interpretation",
      "Mechanical ventilation modes and troubleshooting",
      "Vasoactive medication titration protocols",
      "Sepsis bundles and management",
      "Acute respiratory distress syndrome (ARDS)",
      "Acute kidney injury and CRRT",
      "Neurological critical care (ICP monitoring, stroke)",
      "Multisystem organ dysfunction and critical care pharmacology",
    ],
    clinicalContext: "The CCRN from the American Association of Critical-Care Nurses (AACN) is the most recognized ICU certification. It requires 1,750 hours of direct critical care experience within the past 2 years.",
    faq: [
      { question: "How long before I can sit for the CCRN?", answer: "You need 1,750 hours of direct adult critical care nursing experience in the 2 years preceding your application. Most new grads can sit for the exam after about 1.5-2 years of full-time ICU work." },
      { question: "What is the CCRN pass rate?", answer: "The CCRN pass rate is approximately 70-80% for first-time test-takers. Thorough preparation using practice questions and review courses significantly improves pass rates." },
      { question: "Is CCRN worth it for new ICU nurses?", answer: "Absolutely. CCRN certification demonstrates critical care expertise, often increases salary ($2,000-$10,000 annually), and is required for clinical ladder advancement at many hospitals." },
    ],
  },
];

const COLOR_MAP: Record<string, { bg: string; iconColor: string; border: string; badge: string }> = {
  red: { bg: "bg-red-50", iconColor: "text-red-600", border: "border-red-100", badge: "bg-red-100 text-red-700" },
  blue: { bg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100", badge: "bg-blue-100 text-blue-700" },
  sky: { bg: "bg-sky-50", iconColor: "text-sky-600", border: "border-sky-100", badge: "bg-sky-100 text-sky-700" },
  orange: { bg: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100", badge: "bg-orange-100 text-orange-700" },
  pink: { bg: "bg-pink-50", iconColor: "text-pink-600", border: "border-pink-100", badge: "bg-pink-100 text-pink-700" },
  emerald: { bg: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-emerald-100", badge: "bg-emerald-100 text-emerald-700" },
  rose: { bg: "bg-rose-50", iconColor: "text-rose-600", border: "border-rose-100", badge: "bg-rose-100 text-rose-700" },
  violet: { bg: "bg-violet-50", iconColor: "text-violet-600", border: "border-violet-100", badge: "bg-violet-100 text-violet-700" },
};

const FAQ_DATA = [
  { question: "Which certifications should I get first as a new grad?", answer: "BLS is universally required before your first day. ACLS is typically required within 90 days for acute care nurses. After that, pursue certifications based on your unit: PALS for pediatric/ED settings, NRP for L&D/NICU, TNCC for trauma/ED, and CCRN/CEN after gaining experience in ICU or ER." },
  { question: "Does my hospital pay for certification courses?", answer: "Many hospitals cover certification course fees, especially for required certifications like BLS, ACLS, and PALS. Some offer tuition reimbursement for optional certifications like CCRN and CEN. Check with your nurse educator or HR department about certification support programs." },
  { question: "How long does it take to prepare for these certifications?", answer: "BLS requires minimal preparation (1-day course). ACLS and PALS courses are 2 days with pre-course study. TNCC is a 2-day course. CCRN and CEN require 6-12 weeks of dedicated study because they are comprehensive knowledge-based exams." },
  { question: "Are these certifications recognized in Canada?", answer: "BLS, ACLS, PALS, and NRP are recognized across North America. The Heart & Stroke Foundation of Canada offers equivalent courses. CCRN and CEN are American certifications but are recognized by many Canadian employers. CNA offers Canada-specific specialty certifications." },
  { question: "Do certifications increase my salary?", answer: "Yes. Most hospitals offer certification pay differentials. BLS and ACLS are baseline requirements. CCRN and CEN typically command the highest premiums ($2,000-$10,000 annually). Certifications also strengthen your position for clinical ladder advancement and leadership roles." },
  { question: "Can I take ACLS and PALS online?", answer: "The AHA offers HeartCode ACLS and HeartCode PALS which include online learning and testing components. However, you still need to complete an in-person skills session with an AHA instructor to receive certification." },
];

const WHY_CERTIFY = [
  { icon: ShieldCheck, title: "Hospital Requirement", desc: "Most acute care units require certifications within 90 days of hire" },
  { icon: DollarSign, title: "Salary Increase", desc: "Certified nurses earn $2,000-$10,000 more annually" },
  { icon: TrendingUp, title: "Career Advancement", desc: "Required for clinical ladder promotion and leadership roles" },
  { icon: Clock, title: "Clinical Confidence", desc: "Evidence-based protocols for managing emergencies independently" },
];

export default function NewGradCertificationsHub() {
  const faqStructuredData = buildFaqStructuredData(FAQ_DATA);

  const courseStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "New Grad Nursing Certifications",
    "description": "Essential hospital certifications for new graduate nurses including ACLS, BLS, PALS, TNCC, NRP, CEN, and CCRN.",
    "numberOfItems": NEWGRAD_CERTIFICATIONS.length,
    "itemListElement": NEWGRAD_CERTIFICATIONS.map((cert, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "EducationalOccupationalCredential",
        "name": `${cert.name} - ${cert.fullName}`,
        "description": cert.description,
        "credentialCategory": "Hospital Certification",
        "recognizedBy": { "@type": "Organization", "name": cert.org },
        "url": `https://www.nursenest.ca/newgrad/certifications/${cert.slug}`,
      },
    })),
  };

  return (
    <div data-testid="page-newgrad-certifications-hub">
      <Navigation />
      <SEO
        title="New Grad Certifications: ACLS, BLS, PALS, TNCC, NRP, CEN, CCRN | NurseNest"
        description="Essential hospital certifications for new graduate nurses. Comprehensive prep guides for ACLS, BLS, PALS, TNCC, NRP, CEN, and CCRN with practice questions, study resources, and exam tips."
        keywords="new grad certifications, ACLS certification, BLS certification, PALS certification, TNCC certification, NRP certification, CEN certification, CCRN certification, new nurse certifications, hospital certifications nursing"
        canonicalPath="/newgrad/certifications"
        structuredData={courseStructuredData}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Hub", url: "https://www.nursenest.ca/new-grad" },
          { name: "Certifications", url: "https://www.nursenest.ca/newgrad/certifications" },
        ]}
        additionalStructuredData={[faqStructuredData]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad" className="hover:text-blue-600">New Grad Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">Certifications</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-4" data-testid="badge-certifications">
              <GraduationCap className="w-4 h-4" /> New Graduate Certifications
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              Hospital Certifications for New Graduate Nurses
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-page-subtitle">
              Everything you need to prepare for the certifications hospitals require in your first year. Practice questions, study guides, and exam strategies for ACLS, BLS, PALS, TNCC, NRP, CEN, and CCRN.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#certifications" onClick={(e) => { e.preventDefault(); document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200" data-testid="button-explore-certs">
                Explore Certifications <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/newgrad" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200" data-testid="button-new-grad-hub">
                New Grad Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-why-certify">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-why-heading">Why Certifications Matter for New Grads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CERTIFY.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 text-center" data-testid={`card-why-${i}`}>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="certifications" data-testid="section-certification-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-grid-heading">8 Essential Certifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Each certification includes practice questions, study strategies, and everything you need to pass on your first attempt.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEWGRAD_CERTIFICATIONS.map((cert) => {
              const colors = COLOR_MAP[cert.color] || COLOR_MAP.blue;
              const hasPrepPage = ["bls", "acls", "pals", "nrp", "tncc", "enpc"].includes(cert.slug);
              return (
                <div key={cert.slug} className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`} data-testid={`card-cert-${cert.slug}`}>
                  <Link href={`/newgrad/certifications/${cert.slug}`} className="group">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                      <cert.icon className={`w-6 h-6 ${colors.iconColor}`} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors" data-testid={`text-cert-name-${cert.slug}`}>
                        {cert.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cert.org}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{cert.fullName}</p>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{cert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{cert.questionCount} questions</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                        Study Guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                  {hasPrepPage && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                      <Link href={`/certifications/${cert.slug}-prep`} className="flex-1 text-center text-xs font-medium px-2 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" data-testid={`link-prep-${cert.slug}`}>
                        Prep Guide
                      </Link>
                      <Link href={`/certifications/${cert.slug}-renewal-prep`} className="flex-1 text-center text-xs font-medium px-2 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors" data-testid={`link-renewal-${cert.slug}`}>
                        Renewal Prep
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-timeline">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-timeline-heading">Certification Timeline for New Grads</h2>
            <p className="text-gray-600">When to pursue each certification during your first years of nursing.</p>
          </div>
          <div className="space-y-4">
            {[
              { phase: "Before Day 1", certs: "BLS", desc: "Required before starting any nursing position. Usually completed in nursing school." },
              { phase: "First 90 Days", certs: "ACLS", desc: "Required for most acute care units. Many hospitals offer the course during orientation." },
              { phase: "First 6 Months", certs: "PALS / NRP / TNCC / ENPC", desc: "Unit-specific requirements. PALS for peds/ED, NRP for L&D/NICU, TNCC for trauma/ED, ENPC for pediatric emergency." },
              { phase: "After 1-2 Years", certs: "CEN / CCRN", desc: "Specialty certifications requiring clinical experience. Demonstrates advanced expertise." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-white rounded-xl border border-gray-100 p-5" data-testid={`timeline-phase-${i}`}>
                <div className="w-32 shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{item.phase}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.certs}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-cross-links">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" data-testid="text-cross-heading">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/nursing-certifications" className="bg-emerald-50 rounded-xl p-6 hover:bg-emerald-100 transition-colors group" data-testid="link-nursing-certs">
              <h3 className="font-semibold text-emerald-900 mb-1 group-hover:text-emerald-700">Specialty Nursing Certifications</h3>
              <p className="text-sm text-emerald-700/70">CMSRN, OCN, CNOR, CPN, PMH-BC and more specialty certification guides.</p>
            </Link>
            <Link href="/newgrad/guides" className="bg-violet-50 rounded-xl p-6 hover:bg-violet-100 transition-colors group" data-testid="link-guides">
              <h3 className="font-semibold text-violet-900 mb-1 group-hover:text-violet-700">New Grad Survival Guides</h3>
              <p className="text-sm text-violet-700/70">First-year roadmap, shift organization, charting tips, and more.</p>
            </Link>
            <Link href="/free-practice" className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors group" data-testid="link-test-bank">
              <h3 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">Practice Questions</h3>
              <p className="text-sm text-blue-700/70">Thousands of practice questions with detailed rationales for certification prep.</p>
            </Link>
            <Link href="/flashcards" className="bg-amber-50 rounded-xl p-6 hover:bg-amber-100 transition-colors group" data-testid="link-flashcards">
              <h3 className="font-semibold text-amber-900 mb-1 group-hover:text-amber-700">Flashcard Decks</h3>
              <p className="text-sm text-amber-700/70">Spaced-repetition flashcards for medications, algorithms, and key concepts.</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PremiumUpgradeCTA requiredEntitlement="certification" context="Unlock the full certification prep suite with practice question banks, mock exams, flashcard decks, and algorithm reviews for all nursing certifications." />
      </div>

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-faq-heading">Certification FAQs</h2>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700" data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Start Your Certification Journey
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Practice questions, flashcards, and study tools for every certification you need in your first year.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/free-practice" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg" data-testid="button-cta-qbank">
              Practice Questions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/subscribe/newgrad" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-cta-pricing">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden" data-testid={`faq-item-${index}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors" data-testid={`button-faq-toggle-${index}`}>
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? 'text-blue-500' : 'text-gray-400'}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>{answer}</div>}
    </div>
  );
}
