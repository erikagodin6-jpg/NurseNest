import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { LocaleLink } from "@/lib/LocaleLink";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  BLUEPRINT_CATEGORIES,
  type BlueprintCategoryConfig,
  getBlueprintCategoryBySlug,
  getParentHub,
} from "@/data/blueprint-hub-data";
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  BookOpen,
  FileText,
  Target,
  Layers,
  HelpCircle,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EndOfContentLeadCapture } from "@/components/lead-capture";

function FAQAccordion({ faqItems, prefix }: { faqItems: { question: string; answer: string }[]; prefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqItems.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden" data-testid={`${prefix}-faq-item-${i}`}>
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            data-testid={`${prefix}-faq-toggle-${i}`}
          >
            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3" data-testid={`${prefix}-faq-answer-${i}`}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#2E3A59] mb-4" data-testid="text-category-not-found">Category Not Found</h1>
        <p className="text-gray-600 mb-6">The exam category page you are looking for is not available.</p>
        <LocaleLink href="/">
          <Button data-testid="button-category-go-home">Return Home</Button>
        </LocaleLink>
      </div>
      <Footer />
    </div>
  );
}

function LinkSection({
  title,
  icon: Icon,
  links,
  testIdPrefix,
  iconColor = "#BFA6F6",
}: {
  title: string;
  icon: any;
  links: { label: string; href: string }[];
  testIdPrefix: string;
  iconColor?: string;
}) {
  if (links.length === 0) return null;
  return (
    <div>
      <h3 className="font-semibold text-[#2E3A59] mb-3 flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
        {title}
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link, i) => (
          <LocaleLink key={i} href={link.href}>
            <Card className="h-full hover:shadow-sm hover:border-[#BFA6F6]/40 transition-all cursor-pointer group" data-testid={`${testIdPrefix}-${i}`}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#BFA6F6]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#BFA6F6]" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#BFA6F6] transition-colors flex-1">
                  {link.label}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#BFA6F6] shrink-0" />
              </CardContent>
            </Card>
          </LocaleLink>
        ))}
      </div>
    </div>
  );
}

export default function ExamBlueprintCategory() {
  const [location] = useLocation();
  const pathSlug = location
    .replace(/^\/(?:en|fr|es|fil|hi|zh|ar|ko|pt|pa|vi|ht|ur|ja|fa|de|th)\//, "/")
    .replace(/^\//, "")
    .replace(/\/$/, "");

  const categoryData = getBlueprintCategoryBySlug(pathSlug);
  const parentHub = categoryData ? getParentHub(pathSlug) : undefined;

  if (!categoryData || !parentHub) {
    return <CategoryNotFound />;
  }

  const faqStructuredData = buildFaqStructuredData(
    categoryData.faqItems.map(f => ({ question: f.question, answer: f.answer }))
  );

  const pageTitle = `${categoryData.name} – ${parentHub.examName} Exam Blueprint Category`;
  const pageDescription = categoryData.description.slice(0, 160);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: categoryData.description.slice(0, 300),
    url: `https://www.nursenest.ca/${categoryData.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "NurseNest",
      url: "https://www.nursenest.ca",
    },
    about: {
      "@type": "EducationalOccupationalCredential",
      name: parentHub.examName,
      credentialCategory: "Professional Licensure Examination",
    },
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://www.nursenest.ca" },
    { name: `${parentHub.examName} Blueprint`, url: `https://www.nursenest.ca/${parentHub.slug}` },
    { name: categoryData.name, url: `https://www.nursenest.ca/${categoryData.slug}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={categoryData.keywords.join(", ")}
        canonicalPath={`/${categoryData.slug}`}
        ogType="article"
        structuredData={webPageSchema}
        additionalStructuredData={[faqStructuredData]}
        breadcrumbs={breadcrumbItems}
      />

      <section className="bg-gradient-to-b from-[#2E3A59] to-[#3d4d73] text-white py-14 md:py-18" data-testid="category-hero">
        <div className="max-w-4xl mx-auto px-4">
          <BreadcrumbNav items={breadcrumbItems} />
          <div className="flex items-center gap-3 mb-4 mt-6">
            <Badge className="bg-[#BFA6F6]/20 text-[#BFA6F6] border-0" data-testid="badge-category-exam">
              {parentHub.examCode}
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-0" data-testid="badge-category-weight">
              {categoryData.weight}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" data-testid="text-category-h1">
            {categoryData.name}
          </h1>
          <p className="text-base text-white/80 leading-relaxed max-w-3xl" data-testid="text-category-description">
            {categoryData.description}
          </p>
          <div className="mt-6">
            <LocaleLink
              href={`/${parentHub.slug}`}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors"
              data-testid="link-back-to-blueprint"
            >
              <ChevronRight className="w-3 h-3 rotate-180" />
              Back to {parentHub.examName} Blueprint
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        <section data-testid="section-topics">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#BFA6F6]/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-[#BFA6F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#2E3A59]">Topics Covered</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {categoryData.topicsList.map((topic, i) => (
                  <li key={i} className="flex items-start gap-3" data-testid={`topic-item-${i}`}>
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section data-testid="section-study-resources" className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-sky-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#2E3A59]">Study Resources</h2>
          </div>

          <LinkSection
            title="Study Guides"
            icon={GraduationCap}
            links={categoryData.guideLinks}
            testIdPrefix="link-guide"
          />

          <LinkSection
            title="Practice Questions"
            icon={FileText}
            links={categoryData.previewQuestionLinks}
            testIdPrefix="link-preview-question"
            iconColor="#10b981"
          />

          <LinkSection
            title="Flashcard Decks"
            icon={Layers}
            links={categoryData.flashcardLinks}
            testIdPrefix="link-flashcard"
            iconColor="#f59e0b"
          />

          <LinkSection
            title="Related Lessons"
            icon={BookOpen}
            links={categoryData.lessonLinks}
            testIdPrefix="link-lesson"
            iconColor="#6366f1"
          />
        </section>

        <section className="bg-gradient-to-r from-[#BFA6F6]/10 to-[#BFA6F6]/5 border border-[#BFA6F6]/20 rounded-2xl p-8 text-center" data-testid="section-category-cta">
          <h2 className="text-2xl font-bold text-[#2E3A59] mb-3">Practice {categoryData.name} Questions</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Access {parentHub.examName} practice questions focused on {categoryData.name} with detailed rationales on NurseNest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <LocaleLink
              href="/mock-exams"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#BFA6F6] text-white rounded-lg font-semibold hover:bg-[#a88de8] transition-colors"
              data-testid="link-category-start-exam"
            >
              Start Practice Exam
              <ArrowRight className="w-4 h-4" />
            </LocaleLink>
            <LocaleLink
              href={`/${parentHub.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#2E3A59] border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              data-testid="link-category-back-blueprint"
            >
              View Full Blueprint
            </LocaleLink>
          </div>
        </section>

        {categoryData.faqItems.length > 0 && (
          <section data-testid="section-category-faq">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-sky-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#2E3A59]">Frequently Asked Questions</h2>
            </div>
            <FAQAccordion faqItems={categoryData.faqItems} prefix="category" />
          </section>
        )}

        <EndOfContentLeadCapture context={`${parentHub.examName} ${categoryData.name}`} />
      </div>

      <Footer />
    </div>
  );
}
