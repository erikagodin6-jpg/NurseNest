import { useRoute } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { useAuth } from "@/lib/auth";
import { LocaleLink } from "@/lib/LocaleLink";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Shield, Star, ChevronRight, ArrowRight } from "lucide-react";

interface ComparisonData {
  seoTitle: string;
  seoDescription: string;
  seoKeyword: string;
  heroTitle: string;
  heroSubtitle: string;
  competitorName: string;
  competitorPrice: string;
  nurseNestPrice: string;
  features: { feature: string; nurseNest: boolean | string; competitor: boolean | string }[];
  pricingNote: string;
  faqs: { question: string; answer: string }[];
  hubLinks: { label: string; href: string }[];
}

const comparisonData: Record<string, ComparisonData> = {
  "nursenest-vs-uworld": {
    seoTitle: "NurseNest vs UWorld NCLEX: Compare Features & Pricing (2025)",
    seoDescription: "Compare NurseNest ($4.99/mo) vs UWorld ($69/mo) for NCLEX prep. See feature-by-feature comparison of question banks, adaptive testing, flashcards, and Canada REx-PN support.",
    seoKeyword: "nursenest vs uworld nclex prep comparison",
    heroTitle: "NurseNest vs UWorld: Which NCLEX Prep Is Right for You?",
    heroSubtitle: "UWorld charges $69/month for a question bank alone. NurseNest gives you questions, flashcards, adaptive testing, and full REx-PN support — starting at $4.99/month.",
    competitorName: "UWorld",
    competitorPrice: "$69/mo",
    nurseNestPrice: "$4.99/mo",
    features: [
      { feature: "Monthly Price", nurseNest: "$4.99/mo", competitor: "$69/mo" },
      { feature: "Practice Questions", nurseNest: "4,000+", competitor: "2,100+" },
      { feature: "Unlimited Flashcards", nurseNest: true, competitor: false },
      { feature: "Adaptive Testing (CAT)", nurseNest: true, competitor: true },
      { feature: "Detailed Rationales", nurseNest: true, competitor: true },
      { feature: "Canada REx-PN Support", nurseNest: true, competitor: false },
      { feature: "Clinical Simulations", nurseNest: true, competitor: false },
      { feature: "Video Micro-Lectures", nurseNest: true, competitor: false },
      { feature: "Medication Mastery Tool", nurseNest: true, competitor: false },
      { feature: "30-Day Money-Back Guarantee", nurseNest: true, competitor: false },
    ],
    pricingNote: "NurseNest Pro costs 93% less than UWorld while offering more study tools.",
    faqs: [
      { question: "Is NurseNest as good as UWorld for NCLEX prep?", answer: "NurseNest offers 4,000+ NCLEX-style questions with detailed rationales, adaptive CAT testing, and additional tools like flashcards, clinical simulations, and video lectures — all at a fraction of UWorld's price." },
      { question: "Does NurseNest have the same question quality as UWorld?", answer: "NurseNest questions are written by nurse educators and cover all NCLEX-RN and REx-PN test plan categories. Each question includes detailed rationales explaining correct and incorrect answer choices." },
      { question: "Can I use NurseNest for Canadian REx-PN preparation?", answer: "Yes. NurseNest is one of the few platforms with dedicated REx-PN content, Canadian pricing in CAD, and exam-specific practice modes — something UWorld does not offer." },
      { question: "Does NurseNest offer a money-back guarantee?", answer: "Yes. NurseNest offers a 30-day money-back guarantee on all subscriptions. If you're not satisfied, you receive a full refund — no questions asked." },
      { question: "What extra features does NurseNest have that UWorld doesn't?", answer: "NurseNest includes unlimited AI-generated flashcards, spaced repetition, clinical case simulations, medication mastery tools, video micro-lectures, and a safety hazard simulator — all included in the subscription." },
    ],
    hubLinks: [
      { label: "Browse NCLEX Lessons", href: "/lessons" },
      { label: "Try Free Practice Questions", href: "/question-of-the-day" },
      { label: "Explore Mock Exams", href: "/mock-exams" },
      { label: "View All Flashcard Decks", href: "/flashcards" },
    ],
  },
  "nursenest-vs-archer": {
    seoTitle: "NurseNest vs Archer NCLEX Review: Features & Pricing (2025)",
    seoDescription: "Compare NurseNest ($4.99/mo) vs Archer ($59/quarter) for NCLEX prep. Feature comparison of question banks, flashcards, adaptive testing, and Canadian exam support.",
    seoKeyword: "nursenest vs archer nclex review comparison",
    heroTitle: "NurseNest vs Archer Review: Full Feature Comparison",
    heroSubtitle: "Archer charges $59/quarter for question bank access. NurseNest includes questions, flashcards, simulations, and Canadian exam support from $4.99/month.",
    competitorName: "Archer",
    competitorPrice: "$59/quarter",
    nurseNestPrice: "$4.99/mo",
    features: [
      { feature: "Monthly Price", nurseNest: "$4.99/mo", competitor: "~$20/mo (billed quarterly)" },
      { feature: "Practice Questions", nurseNest: "4,000+", competitor: "1,800+" },
      { feature: "Unlimited Flashcards", nurseNest: true, competitor: false },
      { feature: "Adaptive Testing (CAT)", nurseNest: true, competitor: true },
      { feature: "Detailed Rationales", nurseNest: true, competitor: true },
      { feature: "Canada REx-PN Support", nurseNest: true, competitor: false },
      { feature: "Clinical Simulations", nurseNest: true, competitor: false },
      { feature: "Video Micro-Lectures", nurseNest: true, competitor: false },
      { feature: "Medication Mastery Tool", nurseNest: true, competitor: false },
      { feature: "30-Day Money-Back Guarantee", nurseNest: true, competitor: false },
    ],
    pricingNote: "NurseNest Pro costs 75% less than Archer on a monthly basis with more learning tools included.",
    faqs: [
      { question: "Is NurseNest better than Archer for NCLEX prep?", answer: "NurseNest offers more practice questions (4,000+ vs 1,800+), unlimited flashcards, clinical simulations, and dedicated Canadian exam support — all at a lower price than Archer." },
      { question: "Does Archer offer Canadian REx-PN content?", answer: "No. Archer focuses exclusively on NCLEX-RN preparation for US students. NurseNest supports both NCLEX-RN and Canadian REx-PN exams with region-specific content." },
      { question: "Which has better adaptive testing — NurseNest or Archer?", answer: "Both platforms offer computer adaptive testing (CAT) that mirrors real exam logic. NurseNest additionally provides probability readiness scoring to estimate your pass likelihood." },
      { question: "Does NurseNest have a free option?", answer: "Yes. NurseNest offers free access to clinical lessons, a daily question, and limited flashcard creation. You can upgrade to Pro for full access starting at $4.99/month." },
      { question: "Can I try NurseNest before committing?", answer: "Yes. NurseNest offers free content access and a 30-day money-back guarantee on paid subscriptions, so you can try it risk-free." },
    ],
    hubLinks: [
      { label: "Browse NCLEX Lessons", href: "/lessons" },
      { label: "Try Free Practice Questions", href: "/question-of-the-day" },
      { label: "Explore Mock Exams", href: "/mock-exams" },
      { label: "View Pricing Plans", href: "/pricing" },
    ],
  },
  "nursenest-vs-quizlet": {
    seoTitle: "NurseNest vs Quizlet for Nursing: Compare Features (2025)",
    seoDescription: "Compare NurseNest ($4.99/mo) vs Quizlet+ ($7.99/mo) for nursing exam prep. See why purpose-built nursing tools outperform generic flashcard apps.",
    seoKeyword: "nursenest vs quizlet nursing flashcards comparison",
    heroTitle: "NurseNest vs Quizlet: Purpose-Built Nursing Prep vs Generic Flashcards",
    heroSubtitle: "Quizlet+ costs $7.99/month for generic flashcards. NurseNest gives you nursing-specific questions, AI flashcards, adaptive exams, and clinical simulations for less.",
    competitorName: "Quizlet+",
    competitorPrice: "$7.99/mo",
    nurseNestPrice: "$4.99/mo",
    features: [
      { feature: "Monthly Price", nurseNest: "$4.99/mo", competitor: "$7.99/mo" },
      { feature: "NCLEX Practice Questions", nurseNest: "4,000+", competitor: "None (user-generated only)" },
      { feature: "AI Flashcard Generation", nurseNest: true, competitor: true },
      { feature: "Spaced Repetition", nurseNest: true, competitor: true },
      { feature: "Adaptive Testing (CAT)", nurseNest: true, competitor: false },
      { feature: "Nursing-Specific Content", nurseNest: true, competitor: false },
      { feature: "Clinical Simulations", nurseNest: true, competitor: false },
      { feature: "Detailed NCLEX Rationales", nurseNest: true, competitor: false },
      { feature: "Video Micro-Lectures", nurseNest: true, competitor: false },
      { feature: "30-Day Money-Back Guarantee", nurseNest: true, competitor: false },
    ],
    pricingNote: "NurseNest costs 38% less than Quizlet+ while offering purpose-built nursing exam preparation tools.",
    faqs: [
      { question: "Is NurseNest better than Quizlet for nursing students?", answer: "Yes. While Quizlet is a general-purpose flashcard tool, NurseNest is purpose-built for nursing exam preparation with NCLEX-style questions, adaptive testing, clinical simulations, and expert-written rationales." },
      { question: "Does NurseNest have flashcards like Quizlet?", answer: "Yes. NurseNest includes unlimited AI-powered flashcard generation, spaced repetition, and pre-built nursing decks — plus 4,000+ practice questions that Quizlet doesn't offer." },
      { question: "Why should I pay for NurseNest instead of using free Quizlet decks?", answer: "Free Quizlet nursing decks are user-generated and often contain errors. NurseNest content is created by nurse educators, clinically verified, and aligned with official NCLEX-RN and REx-PN test plans." },
      { question: "Can I import my Quizlet decks into NurseNest?", answer: "NurseNest lets you create custom flashcard decks and generate cards using AI. While direct import isn't available, AI generation makes it easy to recreate and improve your study sets." },
      { question: "Does NurseNest offer exam simulation?", answer: "Yes. NurseNest provides full-length mock exams with computer adaptive testing (CAT) that mirrors the real NCLEX and REx-PN experience — something Quizlet cannot offer." },
    ],
    hubLinks: [
      { label: "Explore Flashcard Decks", href: "/flashcards" },
      { label: "Try AI Flashcard Generation", href: "/flashcards" },
      { label: "Browse Clinical Lessons", href: "/lessons" },
      { label: "View Pricing Plans", href: "/pricing" },
    ],
  },
  "best-nclex-prep-canada": {
    seoTitle: "Best NCLEX & REx-PN Prep in Canada (2025) | NurseNest",
    seoDescription: "Find the best NCLEX and REx-PN prep for Canadian nursing students. Compare features, CAD pricing, and Canadian exam-specific content across top platforms.",
    seoKeyword: "best nclex prep canada rex-pn study guide",
    heroTitle: "Best NCLEX & REx-PN Prep for Canadian Nursing Students",
    heroSubtitle: "Most NCLEX prep platforms are built for US students. NurseNest is the only platform with dedicated REx-PN content, Canadian pricing, and bilingual support.",
    competitorName: "Other Platforms",
    competitorPrice: "$59–$69/mo USD",
    nurseNestPrice: "From $29.99 CAD/mo",
    features: [
      { feature: "Canadian Dollar (CAD) Pricing", nurseNest: true, competitor: false },
      { feature: "REx-PN Exam-Specific Content", nurseNest: true, competitor: false },
      { feature: "NCLEX-RN Content", nurseNest: true, competitor: true },
      { feature: "French Language Support", nurseNest: true, competitor: false },
      { feature: "Practice Questions", nurseNest: "4,000+", competitor: "Varies" },
      { feature: "Adaptive Testing (CAT)", nurseNest: true, competitor: "Some" },
      { feature: "Clinical Simulations", nurseNest: true, competitor: false },
      { feature: "Unlimited Flashcards", nurseNest: true, competitor: false },
      { feature: "Video Micro-Lectures", nurseNest: true, competitor: false },
      { feature: "30-Day Money-Back Guarantee", nurseNest: true, competitor: false },
    ],
    pricingNote: "NurseNest is the only platform offering Canadian-dollar pricing with REx-PN specific content and bilingual support.",
    faqs: [
      { question: "What is the best NCLEX prep for Canadian students?", answer: "NurseNest is the top choice for Canadian nursing students because it offers REx-PN specific content, CAD pricing, French language support, and content aligned with Canadian nursing competencies." },
      { question: "Does NurseNest support REx-PN preparation?", answer: "Yes. NurseNest is one of the few platforms with dedicated REx-PN content, including practice questions, mock exams, and clinical simulations tailored to Canadian practical nursing." },
      { question: "Can I pay for NurseNest in Canadian dollars?", answer: "Yes. NurseNest offers Canadian Dollar (CAD) pricing for all subscription tiers. Plans start at $29.99 CAD/month for RPN preparation." },
      { question: "Is NurseNest available in French?", answer: "Yes. NurseNest supports French and English, making it ideal for nursing students across all Canadian provinces including Quebec." },
      { question: "How does NurseNest compare to UWorld for Canadian students?", answer: "UWorld focuses exclusively on US NCLEX preparation with USD-only pricing. NurseNest offers Canadian-specific content, REx-PN support, CAD pricing, and French language access." },
    ],
    hubLinks: [
      { label: "Browse RPN Lessons", href: "/lessons?tier=rpn" },
      { label: "Try REx-PN Mock Exams", href: "/mock-exams" },
      { label: "View Canadian Pricing", href: "/pricing" },
      { label: "Explore Clinical Simulations", href: "/case-simulations" },
    ],
  },
  "cheapest-nclex-prep": {
    seoTitle: "Cheapest NCLEX Prep 2025: Affordable Study Tools Compared",
    seoDescription: "Find the most affordable NCLEX prep in 2025. Compare NurseNest ($4.99/mo) vs UWorld ($69/mo) vs Archer ($59/quarter) vs Quizlet+ ($7.99/mo).",
    seoKeyword: "cheapest nclex prep affordable nursing exam study",
    heroTitle: "Cheapest NCLEX Prep in 2025: Full Price Comparison",
    heroSubtitle: "Don't overpay for NCLEX prep. NurseNest starts at $4.99/month — up to 93% cheaper than competitors — with more features included.",
    competitorName: "Competitors",
    competitorPrice: "$7.99–$69/mo",
    nurseNestPrice: "$4.99/mo",
    features: [
      { feature: "NurseNest Pro", nurseNest: "$4.99/mo", competitor: "—" },
      { feature: "Quizlet+", nurseNest: "—", competitor: "$7.99/mo" },
      { feature: "Archer Review", nurseNest: "—", competitor: "$59/quarter (~$20/mo)" },
      { feature: "UWorld NCLEX", nurseNest: "—", competitor: "$69/mo" },
      { feature: "Practice Questions Included", nurseNest: "4,000+", competitor: "Varies" },
      { feature: "Flashcards Included", nurseNest: true, competitor: "Quizlet only" },
      { feature: "Adaptive Testing (CAT)", nurseNest: true, competitor: "UWorld & Archer only" },
      { feature: "Clinical Simulations", nurseNest: true, competitor: false },
      { feature: "Video Micro-Lectures", nurseNest: true, competitor: false },
      { feature: "30-Day Money-Back Guarantee", nurseNest: true, competitor: "Varies" },
    ],
    pricingNote: "NurseNest Pro at $4.99/month is the most affordable comprehensive NCLEX prep platform available in 2025.",
    faqs: [
      { question: "What is the cheapest NCLEX prep in 2025?", answer: "NurseNest Pro at $4.99/month is the most affordable comprehensive NCLEX prep platform, offering 4,000+ questions, adaptive testing, flashcards, and clinical simulations." },
      { question: "Is cheap NCLEX prep effective?", answer: "Yes. NurseNest's affordable pricing doesn't mean lower quality. All questions are written by nurse educators, include detailed rationales, and cover the full NCLEX-RN and REx-PN test plans." },
      { question: "How much does UWorld cost compared to NurseNest?", answer: "UWorld costs $69/month for their NCLEX question bank alone. NurseNest Pro costs $4.99/month and includes practice questions, flashcards, simulations, and video lectures — 93% less expensive." },
      { question: "Can I study for NCLEX for free?", answer: "NurseNest offers free access to clinical lessons, a daily practice question, and limited flashcard creation. For full access to 4,000+ questions and adaptive exams, Pro starts at $4.99/month." },
      { question: "Does NurseNest offer a yearly plan discount?", answer: "Yes. NurseNest offers a yearly plan at $39/year, which works out to $3.25/month — the best value for long-term NCLEX preparation." },
    ],
    hubLinks: [
      { label: "Start Free Today", href: "/start-free" },
      { label: "View All Pricing Plans", href: "/pricing" },
      { label: "Try Free Practice Questions", href: "/question-of-the-day" },
      { label: "Browse Clinical Lessons", href: "/lessons" },
    ],
  },
  "rex-pn-practice-questions-free": {
    seoTitle: "Free REx-PN Practice Questions 2025 | NurseNest Canada",
    seoDescription: "Access free REx-PN practice questions for Canadian practical nursing exam prep. Daily questions, detailed rationales, and full mock exams available.",
    seoKeyword: "free rex-pn practice questions canada nursing exam",
    heroTitle: "Free REx-PN Practice Questions for Canadian Nursing Students",
    heroSubtitle: "Prepare for the REx-PN with free daily practice questions, clinical lessons, and NCLEX-style rationales — built specifically for Canadian practical nursing students.",
    competitorName: "Other Platforms",
    competitorPrice: "No REx-PN content",
    nurseNestPrice: "Free + Pro from $4.99/mo",
    features: [
      { feature: "Free Daily REx-PN Question", nurseNest: true, competitor: false },
      { feature: "REx-PN Specific Content", nurseNest: true, competitor: false },
      { feature: "Free Clinical Lessons", nurseNest: true, competitor: false },
      { feature: "Free Flashcard Access", nurseNest: "300 cards free", competitor: false },
      { feature: "Full Question Bank (Pro)", nurseNest: "4,000+ questions", competitor: "No REx-PN" },
      { feature: "Adaptive CAT Mock Exams", nurseNest: true, competitor: false },
      { feature: "Canadian Dollar Pricing", nurseNest: true, competitor: false },
      { feature: "French Language Support", nurseNest: true, competitor: false },
      { feature: "Clinical Simulations", nurseNest: true, competitor: false },
      { feature: "30-Day Money-Back Guarantee", nurseNest: true, competitor: false },
    ],
    pricingNote: "Start with free REx-PN practice questions today. Upgrade to Pro for unlimited access to 4,000+ questions and full mock exams.",
    faqs: [
      { question: "Where can I find free REx-PN practice questions?", answer: "NurseNest offers a free daily REx-PN practice question with detailed rationales, plus free access to clinical lessons and limited flashcard creation — no credit card required." },
      { question: "How many free questions does NurseNest offer?", answer: "NurseNest provides a free question of the day plus access to clinical lessons with embedded practice questions. For unlimited access to 4,000+ questions, upgrade to Pro starting at $4.99/month." },
      { question: "Is NurseNest the best platform for REx-PN prep?", answer: "NurseNest is one of the only platforms with dedicated REx-PN content, Canadian-specific nursing competencies, CAD pricing, and French language support — making it the top choice for Canadian practical nursing students." },
      { question: "Do I need a paid account to access REx-PN content?", answer: "No. You can access free daily questions, clinical lessons, and limited flashcards without paying. Pro access unlocks the full 4,000+ question bank, adaptive mock exams, and clinical simulations." },
      { question: "What topics do REx-PN practice questions cover?", answer: "NurseNest REx-PN questions cover all test plan categories including professional practice, assessment, therapeutic interventions, pharmacology, and clinical judgment as defined by Canadian nursing regulators." },
    ],
    hubLinks: [
      { label: "Free Question of the Day", href: "/question-of-the-day" },
      { label: "Browse RPN Lessons", href: "/lessons?tier=rpn" },
      { label: "Try Free Flashcards", href: "/flashcards" },
      { label: "View Canadian Pricing", href: "/pricing" },
    ],
  },
};

function FeatureTable({ features, nurseNestLabel, competitorLabel }: {
  features: ComparisonData["features"];
  nurseNestLabel: string;
  competitorLabel: string;
}) {
  return (
    <div className="overflow-x-auto" data-testid="comparison-feature-table">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Feature</th>
            <th className="text-center py-3 px-4 font-semibold bg-primary/5 text-primary">NurseNest</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-500">{competitorLabel}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50" data-testid={`row-feature-${i}`}>
              <td className="py-3 px-4 font-medium text-gray-700">{row.feature}</td>
              <td className="text-center py-3 px-4 bg-primary/5">
                {typeof row.nurseNest === "boolean" ? (
                  row.nurseNest ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
                ) : <span className="font-semibold text-primary">{row.nurseNest}</span>}
              </td>
              <td className="text-center py-3 px-4">
                {typeof row.competitor === "boolean" ? (
                  row.competitor ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-400 mx-auto" />
                ) : <span className="text-gray-600">{row.competitor}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  const [, params] = useRoute("/compare/:slug");
  const slug = params?.slug || "";
  const data = comparisonData[slug];
  const { user } = useAuth();

  if (!data) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center" data-testid="text-compare-not-found">
            <h1 className="text-2xl font-bold mb-4">Comparison Not Found</h1>
            <p className="text-gray-500 mb-6">The comparison page you're looking for doesn't exist.</p>
            <LocaleLink href="/pricing">
              <Button data-testid="button-view-pricing">View Pricing</Button>
            </LocaleLink>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        keywords={data.seoKeyword}
        canonicalPath={`/compare/${slug}`}
        structuredData={faqSchema}
      />
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 via-white to-white py-16 px-4" data-testid="section-compare-hero">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1.5" data-testid="badge-compare">
              <Star className="w-3 h-3 mr-1.5" /> Comparison Guide
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight" data-testid="text-compare-title">
              {data.heroTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8" data-testid="text-compare-subtitle">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <LocaleLink href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" data-testid="button-compare-dashboard">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </LocaleLink>
              ) : (
                <LocaleLink href="/start-free">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" data-testid="button-compare-start-free">
                    Start Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </LocaleLink>
              )}
              <LocaleLink href="/pricing">
                <Button size="lg" variant="outline" className="px-8" data-testid="button-compare-pricing">
                  View Pricing
                </Button>
              </LocaleLink>
            </div>
          </div>
        </section>

        <section className="py-12 px-4" data-testid="section-compare-pricing">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-primary/20 bg-primary/5" data-testid="card-nursenest-price">
                <CardContent className="p-6 text-center">
                  <p className="text-sm font-medium text-primary mb-1">NurseNest Pro</p>
                  <p className="text-4xl font-bold text-primary">{data.nurseNestPrice}</p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium" data-testid="text-guarantee-nursenest">30-day money-back guarantee</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200" data-testid="card-competitor-price">
                <CardContent className="p-6 text-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">{data.competitorName}</p>
                  <p className="text-4xl font-bold text-gray-400">{data.competitorPrice}</p>
                  <p className="mt-3 text-sm text-gray-400">No money-back guarantee</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-sm text-gray-500 italic" data-testid="text-pricing-note">{data.pricingNote}</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-50/50" data-testid="section-compare-table">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" data-testid="text-feature-heading">
              Feature-by-Feature Comparison
            </h2>
            <Card className="overflow-hidden">
              <FeatureTable
                features={data.features}
                nurseNestLabel="NurseNest"
                competitorLabel={data.competitorName}
              />
            </Card>
          </div>
        </section>

        <section className="py-12 px-4" data-testid="section-compare-cta">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Start Studying?</h2>
            <p className="text-gray-600 mb-6">Join thousands of nursing students preparing smarter with NurseNest.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <LocaleLink href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" data-testid="button-cta-dashboard">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </LocaleLink>
              ) : (
                <LocaleLink href="/start-free">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" data-testid="button-cta-start-free">
                    Start Free Today <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </LocaleLink>
              )}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium" data-testid="text-guarantee-cta">30-day money-back guarantee on all plans</span>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-50/50" data-testid="section-compare-faq">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" data-testid="text-faq-heading">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <Card key={i} data-testid={`card-faq-${i}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2" data-testid={`text-faq-question-${i}`}>{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed" data-testid={`text-faq-answer-${i}`}>{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4" data-testid="section-compare-links">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6" data-testid="text-links-heading">Explore More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.hubLinks.map((link, i) => (
                <LocaleLink key={i} href={link.href}>
                  <Card className="hover:border-primary/30 hover:shadow-md transition-all cursor-pointer" data-testid={`link-hub-${i}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="font-medium text-gray-700">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </CardContent>
                  </Card>
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
