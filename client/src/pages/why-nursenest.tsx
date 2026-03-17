import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import {
  WhyNurseNestGrid,
  RetentionSection,
  ComparisonTable,
  TrustBadges,
  DifferentiatorCTA,
} from "@/components/competitive-differentiation";

export default function WhyNurseNestPage() {
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900 animate-page-enter">
      <SEO
        title="Why NurseNest | Modern Clinical Learning System for Nursing Exam Prep"
        description="Discover why NurseNest is the preferred healthcare exam study platform. Adaptive practice exams, spaced-repetition flashcards, clinical lessons, and readiness analytics for NCLEX, REx-PN, NP certification, and allied health exams."
        keywords="nursing exam prep, NCLEX preparation, REx-PN exam prep, nursing practice questions, clinical judgment exam prep, nurse practitioner exam prep, healthcare exam study platform, nursing study tools, best NCLEX prep"
        canonicalPath="/why-nursenest"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Why NurseNest Works Better",
          description: "Learn why NurseNest is a modern clinical learning system designed for nursing, NP, and allied health exam preparation.",
          url: "https://www.nursenest.ca/why-nursenest",
          isPartOf: {
            "@type": "WebSite",
            name: "NurseNest",
            url: "https://www.nursenest.ca",
          },
        }}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca/" },
          { name: "Why NurseNest", url: "https://www.nursenest.ca/why-nursenest" },
        ]}
      />
      <Navigation />

      <main className="flex-grow">
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "var(--space-hero-top)", paddingBottom: "var(--space-block)" }}
          data-testid="section-why-hero"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none hidden md:block">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[80px]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[100px]" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "https://www.nursenest.ca/" },
                { name: "Why NurseNest", url: "https://www.nursenest.ca/why-nursenest" },
              ]}
            />
            <div className="text-center mt-8 max-w-3xl mx-auto">
              <h1
                className="font-bold tracking-tight text-gray-900 leading-[1.08] mb-5"
                style={{ fontSize: "var(--text-hero)" }}
                data-testid="text-why-nursenest-h1"
              >
                Why NurseNest Works Better
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto" data-testid="text-why-nursenest-subtitle">
                NurseNest is a modern clinical learning system built for nursing exam prep, NCLEX preparation, REx-PN exam prep, nurse practitioner exam prep, and allied health certification. Every feature is designed to build the clinical judgment skills that modern licensure exams demand.
              </p>
            </div>
          </div>
        </section>

        <WhyNurseNestGrid />
        <RetentionSection />
        <ComparisonTable />
        <TrustBadges />
        <DifferentiatorCTA
          headline="Start Preparing with Confidence"
          subtitle="Join thousands of nursing and healthcare students using NurseNest to study smarter. Access practice questions, flashcards, mock exams, and clinical lessons — all in one platform."
        />
      </main>

      <Footer />
    </div>
  );
}
