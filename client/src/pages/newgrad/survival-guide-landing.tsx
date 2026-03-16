import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  SURVIVAL_GUIDE_CATEGORIES,
  CLINICAL_REFERENCE_LESSONS,
  getLessonsByCategory,
  type SurvivalGuideCategory,
} from "@/data/newgrad/clinical-reference-content";
import { NEWGRAD_GUIDES } from "@/data/newgrad/guide-content";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  AlertTriangle,
  Clock,
  MessageSquare,
  TrendingUp,
  Zap,
  Lightbulb,
  CheckCircle2,
  Shield,
  Heart,
  Brain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  AlertTriangle,
  Clock,
  MessageSquare,
  TrendingUp,
};

const GUIDE_SECTION_CATEGORY_MAP: Record<string, { category: SurvivalGuideCategory; guideSlug: string }> = {
  "transition-to-practice": { category: "professional-growth", guideSlug: "guides" },
  "shift-organization": { category: "shift-survival", guideSlug: "guides" },
  "documentation": { category: "communication-documentation", guideSlug: "guides" },
  "communication": { category: "communication-documentation", guideSlug: "guides" },
  "career-pathways": { category: "professional-growth", guideSlug: "career" },
  "continuing-education": { category: "professional-growth", guideSlug: "career" },
  "leadership-development": { category: "professional-growth", guideSlug: "career" },
  "workplace-dynamics": { category: "professional-growth", guideSlug: "workplace" },
  "professional-boundaries": { category: "professional-growth", guideSlug: "workplace" },
  "behavioral-questions": { category: "shift-survival", guideSlug: "interview" },
  "clinical-scenarios": { category: "shift-survival", guideSlug: "interview" },
  "resume-building": { category: "professional-growth", guideSlug: "resume" },
  "cover-letters": { category: "professional-growth", guideSlug: "resume" },
};

interface GuideSectionItem {
  id: string;
  title: string;
  overview: string;
  guideSlug: string;
}

function getGuideSectionsForCategory(categoryId: SurvivalGuideCategory): GuideSectionItem[] {
  const items: GuideSectionItem[] = [];
  for (const [sectionId, mapping] of Object.entries(GUIDE_SECTION_CATEGORY_MAP)) {
    if (mapping.category === categoryId) {
      const guide = NEWGRAD_GUIDES.find(g => g.slug === mapping.guideSlug);
      const section = guide?.sections.find(s => s.id === sectionId);
      if (section) {
        items.push({ id: section.id, title: section.title, overview: section.overview, guideSlug: mapping.guideSlug });
      }
    }
  }
  return items;
}

const BENEFITS = [
  { icon: Shield, title: "Evidence-Based", desc: "Every guide is grounded in current clinical evidence and best practices." },
  { icon: Brain, title: "Exam-Aligned", desc: "Flashcards and exam tips aligned with NCLEX and certification exams." },
  { icon: Heart, title: "Built for New Grads", desc: "Written specifically for nurses in their first 1-2 years of practice." },
  { icon: BookOpen, title: "Quick Reference", desc: "Summary boxes on every page for fast bedside access." },
];

const TOTAL_FLASHCARDS = CLINICAL_REFERENCE_LESSONS.reduce((sum, l) => sum + l.flashcards.length, 0);

export default function SurvivalGuideLanding() {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="survival-guide-landing">
      <Navigation />
      <SEO
        title="New Grad Survival Guide - Clinical References & Career Resources | NurseNest"
        description="The complete survival guide for new graduate nurses. Four categories covering clinical emergencies, shift survival, communication & documentation, and professional growth with flashcards and quick reference guides."
        keywords="new grad nurse survival guide, new nurse survival guide, first year nurse tips, clinical reference nursing, new graduate nursing guide"
        canonicalPath="/newgrad/survival-guide"
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
          { name: "Survival Guide", url: "https://www.nursenest.ca/newgrad/survival-guide" },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50/50 to-indigo-50/30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad" className="hover:text-blue-600">New Grad Career Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-700 font-medium">Survival Guide</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-emerald-100 text-emerald-700" data-testid="badge-survival-guide">
              <GraduationCap className="w-4 h-4" />
              New Grad Survival Guide
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight" data-testid="text-hero-title">
              Your Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Survival Guide</span> for the First Year
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              Everything new graduate nurses need to navigate their first year with confidence. {CLINICAL_REFERENCE_LESSONS.length} clinical reference lessons, {TOTAL_FLASHCARDS}+ flashcards, and practical guides organized into four clear categories.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#categories" onClick={(e) => { e.preventDefault(); document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200" data-testid="button-explore-categories">
                Explore Categories <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/newgrad/clinical-references" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors border border-emerald-200" data-testid="button-clinical-refs">
                Clinical References
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100" data-testid="section-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-lessons">
              <div className="text-2xl font-bold text-gray-900">{CLINICAL_REFERENCE_LESSONS.length}</div>
              <div className="text-sm text-gray-500">Clinical Lessons</div>
            </div>
            <div data-testid="stat-flashcards">
              <div className="text-2xl font-bold text-gray-900">{TOTAL_FLASHCARDS}+</div>
              <div className="text-sm text-gray-500">Flashcards</div>
            </div>
            <div data-testid="stat-categories">
              <div className="text-2xl font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-500">Learning Categories</div>
            </div>
            <div data-testid="stat-guide-sections">
              <div className="text-2xl font-bold text-gray-900">10+</div>
              <div className="text-sm text-gray-500">Survival Guide Sections</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-how-it-helps">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-benefits-title">How This Guide Helps You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Designed specifically for the unique challenges new graduate nurses face during their transition to practice.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => {
              const BIcon = b.icon;
              return (
                <div key={i} className="bg-gray-50 rounded-xl p-5 text-center" data-testid={`card-benefit-${i}`}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <BIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="categories" data-testid="section-categories">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-categories-title">Four Categories, One Complete Guide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Content is organized into four intuitive categories so you can quickly find what you need, whether you're preparing for a shift or reviewing after a clinical experience.</p>
          </div>
          <div className="space-y-8">
            {SURVIVAL_GUIDE_CATEGORIES.map((cat) => {
              const CatIcon = ICON_MAP[cat.icon] || BookOpen;
              const clinicalLessons = getLessonsByCategory(cat.id);
              const guideSections = getGuideSectionsForCategory(cat.id);
              const totalFlashcards = clinicalLessons.reduce((sum, l) => sum + l.flashcards.length, 0);

              return (
                <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm" data-testid={`category-${cat.id}`}>
                  <div className="p-6 sm:p-8" style={{ borderLeft: `4px solid ${cat.color}` }}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cat.colorAccent }}>
                        <CatIcon className="w-6 h-6" style={{ color: cat.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1" data-testid={`text-category-title-${cat.id}`}>{cat.title}</h3>
                        <p className="text-gray-600 text-sm">{cat.description}</p>
                        {(clinicalLessons.length > 0 || totalFlashcards > 0) && (
                          <div className="flex gap-3 mt-2">
                            {clinicalLessons.length > 0 && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: cat.colorAccent, color: cat.color }}>
                                <Lightbulb className="w-3 h-3" /> {clinicalLessons.length} lessons
                              </span>
                            )}
                            {totalFlashcards > 0 && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: cat.colorAccent, color: cat.color }}>
                                <Zap className="w-3 h-3" /> {totalFlashcards} flashcards
                              </span>
                            )}
                            {guideSections.length > 0 && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: cat.colorAccent, color: cat.color }}>
                                <BookOpen className="w-3 h-3" /> {guideSections.length} guide sections
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {clinicalLessons.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Clinical Reference Lessons</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {clinicalLessons.map((lesson) => (
                            <Link key={lesson.slug} href={`/newgrad/clinical-references/${lesson.slug}`} className="group" data-testid={`link-lesson-${lesson.slug}`}>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: lesson.color }} />
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 block truncate">{lesson.title}</span>
                                  <span className="text-xs text-gray-500">{lesson.flashcards.length} flashcards</span>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 shrink-0" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {guideSections.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Guide Sections</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {guideSections.map((section) => (
                            <Link key={section.id} href={`/newgrad/${section.guideSlug}`} className="group" data-testid={`link-section-${section.id}`}>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <BookOpen className="w-4 h-4 shrink-0" style={{ color: cat.color }} />
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 block truncate">{section.title}</span>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 shrink-0" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-whats-included">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">What's Included in Every Lesson</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Each clinical reference lesson follows a structured format designed for quick learning and bedside access.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: BookOpen, title: "Key Concepts", desc: "Core knowledge organized into expandable sections with detailed explanations." },
              { icon: Lightbulb, title: "Clinical Pearls", desc: "Practical wisdom from experienced nurses that textbooks don't teach." },
              { icon: AlertTriangle, title: "Red Flags", desc: "Critical warning signs and when to escalate care immediately." },
              { icon: GraduationCap, title: "Exam Tips", desc: "High-yield content aligned with NCLEX and certification exams." },
              { icon: Zap, title: "Interactive Flashcards", desc: "Flip-card study tools with questions across assessment, management, and more." },
              { icon: CheckCircle2, title: "Quick Reference Summary", desc: "At-a-glance summary box with the most critical information for bedside use." },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl" data-testid={`card-included-${i}`}>
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <ItemIcon className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Build Your Clinical Confidence?</h2>
          <p className="text-emerald-100 mb-8">Start with any category that matches where you are in your first year. All content is free and designed specifically for new graduate nurses.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/newgrad/clinical-references" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors" data-testid="button-bottom-clinical">
              Browse Clinical References
            </Link>
            <Link href="/newgrad" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-400 transition-colors border border-emerald-400" data-testid="button-bottom-hub">
              Career Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
