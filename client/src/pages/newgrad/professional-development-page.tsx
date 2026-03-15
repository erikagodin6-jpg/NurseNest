import { CategoryPageLayout } from "./category-layout";
import { Award } from "lucide-react";

export default function ProfessionalDevelopmentPage() {
  return (
    <CategoryPageLayout
      title="Professional Development"
      subtitle="Build your expertise through continuing education, certifications, leadership development, and strategic professional growth."
      icon={Award}
      color="amber"
      seoTitle="New Grad Nurse Professional Development - CE, Certifications & Growth | NurseNest"
      seoDescription="Professional development guide for new graduate nurses. Continuing education requirements, specialty certifications, leadership skills, and career growth strategies."
      seoKeywords="nurse professional development, nursing continuing education, nurse certifications, nursing leadership, new grad nurse growth, nursing career advancement"
      canonicalPath="/newgrad/professional-development"
      premiumContext="Upgrade to access premium professional development planning templates, certification study guides, and leadership development frameworks."
      sections={[
        {
          title: "Continuing Education Requirements",
          content: "Every state and province has continuing education (CE) requirements for license renewal. Understanding and staying ahead of these requirements ensures you never face license expiration issues.",
          items: [
            "Check your state/provincial board of nursing for specific CE requirements",
            "Most jurisdictions require 20-30 CE hours per renewal cycle (typically 2 years)",
            "Many employers offer free CE through learning management systems",
            "Professional conferences often provide CE credits along with networking opportunities",
            "Online CE platforms (NurseNest, Medscape, ANA) offer flexible learning options",
            "Some specialties have additional CE requirements beyond basic licensing",
          ],
        },
        {
          title: "Specialty Certifications Worth Pursuing",
          content: "Specialty certification demonstrates expertise, can increase your salary, and opens doors to advanced roles. Most certifications require 1-2 years of clinical experience before you're eligible.",
          items: [
            "CCRN (Critical Care) — gold standard for ICU nurses, typically eligible after 1,750 hours",
            "CEN (Emergency Nursing) — demonstrates ER competency, requires 2 years experience",
            "RNC-OB (Inpatient Obstetric Nursing) — for L&D and postpartum nurses",
            "PCCN (Progressive Care) — for step-down and telemetry nurses",
            "OCN (Oncology Certified Nurse) — specialty certification for oncology practice",
            "CMSRN (Med-Surg Certified) — validates broad clinical competency",
          ],
        },
        {
          title: "Leadership Development",
          content: "Leadership skills benefit every nurse, not just those in management. Charge nurse roles, precepting, committee participation, and quality improvement projects all develop leadership competencies.",
          items: [
            "Volunteer for unit committees (quality improvement, practice council, safety)",
            "Seek charge nurse training when eligible (typically after 1-2 years)",
            "Become a preceptor for new graduates or nursing students",
            "Participate in evidence-based practice projects or research",
            "Develop your presentation skills through unit in-services",
            "Mentor nursing students during their clinical rotations",
          ],
        },
        {
          title: "Advanced Education Pathways",
          content: "If you're considering advancing your education, it's never too early to start planning. Understanding the options helps you make informed decisions about when and how to pursue further education.",
          items: [
            "BSN completion: many ADN nurses pursue their BSN within the first 2-3 years",
            "MSN pathways: NP, CNS, nurse educator, nurse administrator, informatics",
            "DNP: terminal practice degree for advanced practice and leadership roles",
            "PhD: research-focused doctoral degree for nursing science careers",
            "Post-master's certificates: add specializations without full degree programs",
          ],
        },
        {
          title: "Building Your Professional Portfolio",
          content: "A professional portfolio documents your growth, achievements, and competencies. Start building it during your first year so you have comprehensive documentation for performance reviews, job applications, and certification applications.",
          items: [
            "Include certifications, licenses, and CE completion certificates",
            "Document clinical competencies and skills validation records",
            "Save positive feedback from patients, families, and colleagues",
            "Record committee participation, projects, and presentations",
            "Track quality improvement contributions and outcomes",
            "Maintain an updated resume and professional summary",
          ],
        },
      ]}
      tips={[
        { title: "Start a CE Calendar", desc: "Track your CE requirements and completion dates on a calendar. Set reminders 6 months before your license renewal deadline." },
        { title: "Join a Professional Organization", desc: "ANA, CARNA, specialty organizations — membership provides CE credits, networking, and career resources. Many offer discounted student/new grad rates." },
        { title: "Read One Journal Article Per Week", desc: "Stay current with evidence-based practice by reading articles from AJN, MEDSURG Nursing, or your specialty's journal. This habit builds expertise naturally." },
        { title: "Set Annual Professional Goals", desc: "Each year, set 2-3 specific professional development goals. Review them quarterly and adjust as needed. Share them with your manager for accountability." },
      ]}
    />
  );
}
