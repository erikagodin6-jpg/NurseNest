import { CategoryPageLayout } from "./category-layout";
import { TrendingUp } from "lucide-react";

export default function CareerPage() {
  return (
    <CategoryPageLayout
      title="Career Development"
      subtitle="Strategic career planning, goal setting, and professional growth frameworks to help you build a fulfilling nursing career from day one."
      icon={TrendingUp}
      color="indigo"
      seoTitle="New Grad Nurse Career Development - Career Planning Guide | NurseNest"
      seoDescription="Career development strategies for new graduate nurses. Goal setting, career planning frameworks, specialty exploration, and professional advancement pathways."
      seoKeywords="new grad nurse career, nursing career development, nurse career planning, new nurse career path, nursing career advancement"
      canonicalPath="/newgrad/career"
      premiumContext="Upgrade to access premium career planning frameworks, professional portfolio templates, and detailed career pathway guides."
      sections={[
        {
          title: "Setting Career Goals as a New Grad",
          content: "Your first year is about building a strong clinical foundation, but it's never too early to think about where you want your career to go. Setting clear, achievable goals helps you stay motivated and make intentional decisions about your professional development.",
          items: [
            "Set SMART goals for your first 90 days, 6 months, and 1 year",
            "Identify 2-3 clinical areas that interest you for future specialization",
            "Build a professional development plan with your manager during orientation",
            "Start documenting your achievements and clinical growth milestones",
          ],
        },
        {
          title: "Exploring Specialty Pathways",
          content: "Nursing offers incredible career diversity. From ICU to community health, from bedside nursing to advanced practice, understanding your options helps you make informed decisions about your career trajectory.",
          items: [
            "Acute care specialties: ICU, ER, OR, L&D, NICU, cardiac",
            "Community health: public health, home care, school nursing, occupational health",
            "Advanced practice: NP, CNS, CRNA, CNM pathways",
            "Non-clinical roles: education, informatics, administration, research, legal nurse consulting",
          ],
        },
        {
          title: "Building Your Professional Network",
          content: "Your network is one of your most valuable career assets. Start building professional relationships early by connecting with mentors, joining professional organizations, and attending conferences and networking events.",
          items: [
            "Join your specialty's professional organization (ANA, CARNA, RNAO, etc.)",
            "Attend at least one nursing conference or workshop per year",
            "Connect with mentors both inside and outside your organization",
            "Build an authentic LinkedIn presence highlighting your clinical experience",
          ],
        },
        {
          title: "Career Advancement Timeline",
          content: "Understanding typical career progression helps you set realistic expectations and plan your advancement. Most nurses follow a general trajectory, though timelines vary based on specialty, location, and individual goals.",
          items: [
            "Year 1: Focus on clinical competency and confidence building",
            "Years 2-3: Pursue specialty certifications and begin precepting",
            "Years 3-5: Take on charge nurse or team lead responsibilities",
            "Years 5+: Consider advanced education, management, or specialist roles",
          ],
        },
      ]}
      tips={[
        { title: "Find a Career Mentor", desc: "Identify an experienced nurse whose career path aligns with your goals. Ask for informal mentorship — most nurses are happy to guide new grads." },
        { title: "Document Everything", desc: "Keep a career portfolio with certifications, achievements, positive feedback, and professional development activities. This becomes invaluable during performance reviews and job applications." },
        { title: "Stay Curious", desc: "Shadow nurses in specialties that interest you. Many hospitals allow cross-training or float experiences that expose you to different areas." },
        { title: "Invest in Education", desc: "Consider BSN completion if you have an ADN, or start planning for graduate education. Many employers offer tuition assistance." },
      ]}
    />
  );
}
