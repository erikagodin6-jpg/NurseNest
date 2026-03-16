import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PremiumUpgradeCTA } from "./premium-cta";
import {
  ChevronRight, ArrowRight, BookOpen, GraduationCap, Lock, CheckCircle2
} from "lucide-react";

const GUIDE_CATEGORIES = [
  { id: "transition-to-practice", title: "Transition to Practice", desc: "Navigate the shift from student to confident clinical practitioner with structured guidance." },
  { id: "shift-organization", title: "Shift Organization", desc: "Master time management, workflow efficiency, and task prioritization during your shifts." },
  { id: "documentation-tips", title: "Documentation Tips", desc: "Learn efficient charting techniques, avoid common documentation errors, and protect your license." },
  { id: "communication", title: "Communication with Physicians", desc: "Master SBAR reporting, handle difficult conversations, and build professional credibility." },
  { id: "workplace-boundaries", title: "Workplace Boundaries", desc: "Set healthy professional boundaries while maintaining collaborative relationships." },
  { id: "burnout-prevention", title: "Burnout Prevention", desc: "Recognize early warning signs and develop sustainable self-care strategies." },
  { id: "professional-growth", title: "Professional Growth", desc: "Build your clinical expertise and develop leadership skills for career advancement." },
  { id: "career-pathways", title: "Career Pathways", desc: "Explore specialty areas, advanced practice roles, and non-clinical career options." },
  { id: "continuing-education", title: "Continuing Education", desc: "Navigate CE requirements, choose valuable certifications, and maintain competency." },
  { id: "leadership-development", title: "Leadership Development", desc: "Develop charge nurse skills, preceptor abilities, and management competencies." },
];

export default function GuidesPage() {
  const { data: guides = [] } = useQuery({
    queryKey: ["/api/new-grad/guides", "all"],
    queryFn: async () => {
      const res = await fetch("/api/new-grad/guides?status=published");
      return res.ok ? res.json() : [];
    },
  });

  return (
    <div data-testid="newgrad-guides-page">
      <Navigation />
      <SEO
        title="New Grad Nursing Guides - Career Transition & Clinical Practice | NurseNest"
        description="Comprehensive guides for new graduate nurses covering transition to practice, shift organization, documentation, communication, burnout prevention, and career development."
        keywords="new grad nurse guides, new nurse survival guide, first year nurse tips, new nurse documentation tips, new grad nurse career guide"
        canonicalPath="/newgrad/guides"
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
          { name: "Guides", url: "https://www.nursenest.ca/newgrad/guides" },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad" className="hover:text-blue-600">New Grad Career Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">Guides</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-700">
            <BookOpen className="w-4 h-4" /> Comprehensive Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            New Grad Career & Clinical Guides
          </h1>
          <p className="text-lg text-gray-600" data-testid="text-subtitle">
            Evidence-based guides covering every aspect of your transition from nursing student to confident healthcare professional. Free access to all guide content.
          </p>
        </div>
      </section>

      <section className="py-16" data-testid="section-guide-categories">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Guide Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GUIDE_CATEGORIES.map((cat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all" data-testid={`card-guide-category-${i}`}>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{cat.title}</h3>
                    <p className="text-sm text-gray-500">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="py-16 bg-gray-50" data-testid="section-published-guides">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Published Guides</h2>
            <div className="space-y-3">
              {guides.map((guide: any) => (
                <Link key={guide.id} href={`/new-grad/guides/${guide.slug}`} className="block group" data-testid={`link-guide-${guide.id}`}>
                  <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">{guide.title}</h3>
                          {guide.is_premium && <Lock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{guide.summary}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{guide.guide_type}</span>
                          {guide.category && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{guide.category}</span>}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0 ml-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PremiumUpgradeCTA requiredEntitlement="toolkit" context="Upgrade to access premium guides with advanced career strategies, detailed clinical scenarios, and exclusive professional development content." />
      </div>

      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Explore More Career Resources</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/newgrad/interview" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200" data-testid="link-interview">
              Interview Prep
            </Link>
            <Link href="/newgrad/resume" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200" data-testid="link-resume">
              Resume Tools
            </Link>
            <Link href="/newgrad" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors" data-testid="link-hub">
              Career Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
