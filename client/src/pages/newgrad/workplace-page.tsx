import { CategoryPageLayout } from "./category-layout";
import { Users } from "lucide-react";

export default function WorkplacePage() {
  return (
    <CategoryPageLayout
      title="Workplace Navigation"
      subtitle="Navigate preceptor relationships, team dynamics, workplace culture, and professional boundaries with confidence during your first year."
      icon={Users}
      color="emerald"
      seoTitle="New Grad Nurse Workplace Navigation Guide | NurseNest"
      seoDescription="Navigate workplace dynamics as a new graduate nurse. Preceptor relationships, team communication, workplace culture, and professional boundary strategies."
      seoKeywords="new nurse workplace, preceptor relationship, new grad nurse tips, nursing team dynamics, workplace boundaries nursing, nurse communication"
      canonicalPath="/newgrad/workplace"
      premiumContext="Upgrade to access detailed workplace navigation scripts, preceptor relationship worksheets, and conflict resolution frameworks."
      sections={[
        {
          title: "Building Strong Preceptor Relationships",
          content: "Your preceptor is your most important professional relationship during your first months. A strong preceptor relationship accelerates your learning, builds confidence, and creates a foundation for your clinical career.",
          items: [
            "Come prepared: review your patients and ask specific questions rather than vague ones",
            "Accept constructive feedback gracefully — it's an investment in your growth",
            "Communicate your learning style and goals early in the preceptorship",
            "Take initiative to practice skills and volunteer for learning opportunities",
            "Ask for a debrief at the end of each shift to discuss what went well and what to improve",
          ],
        },
        {
          title: "Navigating Team Dynamics",
          content: "Every unit has its own culture and social dynamics. Understanding how to navigate these relationships professionally while staying true to your values is essential for long-term career satisfaction.",
          items: [
            "Introduce yourself to every team member and learn their roles and preferences",
            "Avoid workplace gossip — it damages trust and professional relationships",
            "Build relationships with CNAs, respiratory therapists, pharmacists, and other team members",
            "Communicate patient concerns using structured frameworks like SBAR",
            "Offer help when your workload allows — reciprocity builds strong team bonds",
          ],
        },
        {
          title: "Professional Communication Strategies",
          content: "Effective communication is the foundation of safe patient care and positive workplace relationships. As a new grad, developing strong communication skills early sets you apart and builds credibility.",
          items: [
            "Use SBAR for all clinical communications with physicians and charge nurses",
            "Practice assertive communication: clear, direct, respectful, and patient-centered",
            "Learn to give and receive handoff reports using a consistent structure",
            "Document your communication — if it wasn't documented, it didn't happen",
            "Address conflicts directly and privately rather than through intermediaries",
          ],
        },
        {
          title: "Setting Professional Boundaries",
          content: "Healthy boundaries protect your wellbeing, prevent burnout, and maintain professional relationships. Learning to say no appropriately and manage expectations is a critical skill.",
          items: [
            "Learn to say no to unsafe assignments or tasks beyond your scope",
            "Set limits on overtime and extra shifts to protect your health",
            "Maintain professional boundaries with patients and families",
            "Don't take work problems home — develop a transition routine between shifts",
            "Seek support from your nurse manager when boundary issues arise",
          ],
        },
        {
          title: "Handling Difficult Situations",
          content: "Every new grad encounters challenging workplace situations. Having strategies prepared helps you respond professionally rather than reactively.",
          items: [
            "Bullying: Document incidents, report to management, and know your rights",
            "Scope conflicts: Consult your facility policy and state/provincial nursing act",
            "Unsafe staffing: Report through proper channels and document your concerns",
            "Difficult patients: Maintain professionalism, set clear expectations, and involve charge nurse when needed",
          ],
        },
      ]}
      tips={[
        { title: "The 30-Second Rule", desc: "Before responding to a frustrating situation, take 30 seconds to breathe and collect your thoughts. Reactive responses rarely serve you well." },
        { title: "Find Your People", desc: "Identify 2-3 supportive colleagues who you can trust for advice, venting, and encouragement. A strong support network is essential." },
        { title: "Learn the Unwritten Rules", desc: "Every unit has unwritten norms — preferred communication methods, break room etiquette, supply ordering processes. Observe and adapt." },
        { title: "Document Professionally", desc: "When workplace issues arise, keep factual written records with dates, times, and witnesses. This protects you if situations escalate." },
      ]}
    />
  );
}
