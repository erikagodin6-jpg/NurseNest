import { Link, useRoute } from "wouter";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildFaqStructuredData, buildBreadcrumbStructuredData } from "@/lib/structured-data";
import {
  ArrowRight, ChevronRight, HelpCircle, ExternalLink,
  BookOpen, Award, Route as RouteIcon, Clock, FileText,
  ArrowLeft, Bookmark
} from "lucide-react";

interface HubPageData {
  id: string;
  pageType: string;
  exam: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
  tocJson: { id: string; label: string; level: number }[];
  faqJson: { question: string; answer: string }[];
  internalLinksJson: { url: string; anchor: string; context: string }[];
  relatedPages?: { slug: string; pageType: string; title: string; description: string }[];
}

const TYPE_CONFIG: Record<string, { label: string; pluralLabel: string; parentPath: string; parentLabel: string; accent: string; accentBg: string; accentBorder: string; icon: typeof Award }> = {
  certification: { label: "Certification", pluralLabel: "Certifications", parentPath: "/nursing-certifications", parentLabel: "Nursing Certifications", accent: "text-emerald-700", accentBg: "bg-emerald-50", accentBorder: "border-emerald-100", icon: Award },
  specialty: { label: "Specialty", pluralLabel: "Specialties", parentPath: "/nursing-specialties", parentLabel: "Nursing Specialties", accent: "text-blue-700", accentBg: "bg-blue-50", accentBorder: "border-blue-100", icon: BookOpen },
  "study-pathway": { label: "Study Pathway", pluralLabel: "Study Pathways", parentPath: "/study-pathways", parentLabel: "Study Pathways", accent: "text-violet-700", accentBg: "bg-violet-50", accentBorder: "border-violet-100", icon: RouteIcon },
};

const TYPE_TO_URL_PREFIX: Record<string, string> = {
  certification: "certifications",
  specialty: "specialties",
  "study-pathway": "study-pathways",
};

export default function NursingHubPage({ pageType }: { pageType: string }) {
  const urlPrefix = TYPE_TO_URL_PREFIX[pageType] || pageType;
  const [, params] = useRoute(`/${urlPrefix}/:slug`);
  const slug = params?.slug || "";

  const config = TYPE_CONFIG[pageType] || TYPE_CONFIG.certification;

  const { data: page, isLoading, error } = useQuery<HubPageData>({
    queryKey: ["nursing-hub-page", slug, pageType],
    queryFn: async () => {
      const res = await fetch(`/api/nursing-hub/pages/${slug}?pageType=${pageType}`);
      if (!res.ok) throw new Error("Page not found");
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div data-testid="page-nursing-hub-loading">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div data-testid="page-nursing-hub-error">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
            <p className="text-gray-600">The {config.label.toLowerCase()} page you're looking for doesn't exist or has been moved.</p>
            <Link href={config.parentPath} className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4" /> Back to {config.parentLabel}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const faqStructuredData = page.faqJson?.length ? buildFaqStructuredData(page.faqJson) : null;

  const breadcrumbItems = [
    { name: "Home", url: "https://www.nursenest.ca" },
    { name: config.parentLabel, url: `https://www.nursenest.ca${config.parentPath}` },
    { name: page.title.split(":")[0]?.trim() || page.title, url: `https://www.nursenest.ca/${urlPrefix}/${page.slug}` },
  ];

  const productLinks = (page.internalLinksJson || []).filter(l => l.context === "product");
  const relatedContentLinks = (page.internalLinksJson || []).filter(l => l.context !== "product");

  return (
    <div data-testid={`page-nursing-hub-${pageType}-${slug}`}>
      <Navigation />
      <SEO
        title={page.metaTitle || page.title}
        description={page.metaDescription}
        canonicalPath={`/${urlPrefix}/${page.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "name": page.title,
          "description": page.metaDescription,
          "publisher": { "@type": "Organization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
          "mainEntityOfPage": `https://www.nursenest.ca/${urlPrefix}/${page.slug}`,
        }}
        breadcrumbs={breadcrumbItems}
        additionalStructuredData={faqStructuredData ? [faqStructuredData] : undefined}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={config.parentPath} className="hover:text-blue-600">{config.parentLabel}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={`${config.accent} font-medium`}>{page.exam || page.title.split(":")[0]?.trim()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <main>
            <div className="mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.accentBg} ${config.accent} mb-3`} data-testid="badge-page-type">
                <config.icon className="w-4 h-4" /> {config.label} Guide
              </div>
            </div>

            <article
              className="prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-li:leading-relaxed prose-ul:my-4 prose-ol:my-4 prose-strong:text-gray-900 [&_.lead]:text-lg [&_.lead]:text-gray-600 [&_.lead]:leading-relaxed [&_.exam-trap]:bg-amber-50 [&_.exam-trap]:border [&_.exam-trap]:border-amber-200 [&_.exam-trap]:rounded-lg [&_.exam-trap]:p-4 [&_.exam-trap]:my-4 [&_.exam-trap]:text-sm"
              dangerouslySetInnerHTML={{ __html: page.contentHtml }}
              data-testid="article-content"
            />

            {page.faqJson?.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200" data-testid="section-faq">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {page.faqJson.map((faq: { question: string; answer: string }, i: number) => (
                    <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
                  ))}
                </div>
              </section>
            )}

            {relatedContentLinks.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200" data-testid="section-related-links">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedContentLinks.map((link, i) => (
                    <Link key={i} href={link.url} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group" data-testid={`link-related-${i}`}>
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        {link.context === "certification" ? <Award className="w-4 h-4 text-blue-600" /> :
                         link.context === "pathway" ? <RouteIcon className="w-4 h-4 text-blue-600" /> :
                         <BookOpen className="w-4 h-4 text-blue-600" />}
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{link.anchor}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 ml-auto group-hover:text-blue-600" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {page.relatedPages && page.relatedPages.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200" data-testid="section-more-pages">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {page.relatedPages.map((rp, i) => {
                    const rpPrefix = TYPE_TO_URL_PREFIX[rp.pageType] || rp.pageType;
                    const rpConfig = TYPE_CONFIG[rp.pageType] || TYPE_CONFIG.certification;
                    return (
                      <Link key={i} href={`/${rpPrefix}/${rp.slug}`} className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all group" data-testid={`card-related-${i}`}>
                        <span className={`text-xs font-medium ${rpConfig.accent} ${rpConfig.accentBg} px-2 py-0.5 rounded-full`}>{rpConfig.label}</span>
                        <h3 className="font-semibold text-gray-900 mt-2 mb-1 group-hover:text-blue-700 text-sm">{rp.title}</h3>
                        {rp.description && <p className="text-xs text-gray-500 line-clamp-2">{rp.description}</p>}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {page.tocJson?.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5" data-testid="sidebar-toc">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">On This Page</h3>
                  <nav className="space-y-1.5">
                    {page.tocJson.map((item: { id: string; label: string }) => (
                      <a key={item.id} href={`#${item.id}`} className="block text-sm text-gray-600 hover:text-blue-700 transition-colors py-0.5" data-testid={`toc-link-${item.id}`}>
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {productLinks.length > 0 && (
                <div className={`rounded-xl border ${config.accentBorder} p-5 ${config.accentBg}`} data-testid="sidebar-cta">
                  <h3 className={`font-semibold ${config.accent} mb-3 text-sm`}>Study Resources</h3>
                  <div className="space-y-2">
                    {productLinks.map((link, i) => (
                      <Link key={i} href={link.url} className={`flex items-center gap-2 text-sm font-medium ${config.accent} hover:underline`} data-testid={`cta-link-${i}`}>
                        <ArrowRight className="w-3.5 h-3.5" /> {link.anchor}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white" data-testid="sidebar-cta-pricing">
                <h3 className="font-semibold mb-2 text-sm">Ready to Study?</h3>
                <p className="text-xs text-gray-300 mb-3">Access practice questions, flashcards, and study tools.</p>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors w-full justify-center" data-testid="button-sidebar-pricing">
                  View Plans <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3" data-testid="text-bottom-cta-heading">
            Continue Your Learning Journey
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Explore related certifications, specialty guides, and study pathways to advance your nursing career.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/nursing-certifications" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-500 transition-colors" data-testid="button-bottom-certs">
              <Award className="w-4 h-4" /> Certifications
            </Link>
            <Link href="/nursing-specialties" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors" data-testid="button-bottom-specs">
              <BookOpen className="w-4 h-4" /> Specialties
            </Link>
            <Link href="/study-pathways" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-500 transition-colors" data-testid="button-bottom-paths">
              <RouteIcon className="w-4 h-4" /> Study Pathways
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
