import { LocaleLink } from "@/lib/LocaleLink";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import {
  BookOpen,
  Search,
  Calendar,
  ArrowRight,
  Clock,
  Tag,
  User,
  Mail,
  CheckCircle2,
  Bell,
  Brain,
  Activity,
  FlaskConical,
  ClipboardList,
  Stethoscope,
} from "lucide-react";
import { InlineLeadCapture, StickyLeadBanner } from "@/components/lead-capture";
import { ContextualRelatedResources } from "@/components/related-resources";

const CATEGORY_KEYS: Record<string, string> = {
  "clinical-reasoning": "blog.categoryClinicalReasoning",
  "pharmacology": "blog.categoryPharmacology",
  "lab-interpretation": "blog.categoryLabInterpretation",
  "exam-prep": "blog.categoryExamPrep",
  "patient-safety": "blog.categoryPatientSafety",
  "pathophysiology": "blog.categoryPathophysiology",
  "assessment-skills": "blog.categoryAssessmentSkills",
  "medication-safety": "blog.categoryMedicationSafety",
  "nursing-fundamentals": "blog.categoryNursingFundamentals",
  "nursing-education": "blog.categoryNursingEducation",
  "allied-health": "blog.categoryAlliedHealth",
};

function estimateReadTime(content: any[]): number {
  if (!content || !Array.isArray(content)) return 5;
  const totalWords = content.reduce((acc, block) => {
    return acc + (block.content || block.text || "").split(/\s+/).length;
  }, 0);
  return Math.max(3, Math.ceil(totalWords / 200));
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [subEmail, setSubEmail] = useState("");
  const [subFrequency, setSubFrequency] = useState<string>("weekly");
  const [subStep, setSubStep] = useState<"email" | "frequency">("email");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subMessage, setSubMessage] = useState("");

  const FREQUENCY_OPTIONS = [
    { value: "daily", label: t("blog.freqDaily") },
    { value: "3x_week", label: t("blog.freq3xWeek") },
    { value: "weekly", label: t("blog.freqWeekly") },
    { value: "biweekly", label: t("blog.freqBiweekly") },
    { value: "monthly", label: t("blog.freqMonthly") },
  ];

  const TIER_FILTERS = [
    { key: null, label: t("blog.filterAll") },
    { key: "rpn", label: t("blog.filterRpn") },
    { key: "rn", label: t("blog.filterRn") },
    { key: "np", label: t("blog.filterNp") },
  ];

  function handleEmailNext(e: React.FormEvent) {
    e.preventDefault();
    if (!subEmail || !subEmail.includes("@")) {
      setSubStatus("error");
      setSubMessage(t("blog.subscribeErrorInvalidEmail"));
      return;
    }
    setSubStatus("idle");
    setSubStep("frequency");
  }

  async function handleSubscribe() {
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subEmail, source: "blog", tier: "general", frequency: subFrequency }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubStatus("success");
        setSubMessage(data.message === "Already subscribed" ? t("blog.subscribeAlreadySubscribed") : t("blog.subscribeSuccess"));
        setSubEmail("");
        setSubStep("email");
        setSubFrequency("weekly");
      } else {
        setSubStatus("error");
        setSubMessage(data.error || t("blog.subscribeErrorGeneric"));
      }
    } catch {
      setSubStatus("error");
      setSubMessage(t("blog.subscribeErrorConnection"));
    }
  }

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["/api/content", "blog"],
    queryFn: async () => {
      const types = ["article", "blog-post", "blog"];
      const results: any[] = [];
      for (const tp of types) {
        try {
          const res = await fetch(`/api/content?type=${tp}`);
          if (res.ok) {
            const data = await res.json();
            results.push(...data);
          }
        } catch {}
      }
      const uniqueById = Array.from(new Map(results.map((r: any) => [r.id, r])).values());
      return uniqueById.sort((a: any, b: any) =>
        new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
      );
    },
  });

  const categories: string[] = Array.from(new Set(articles.map((a: any) => a.category).filter(Boolean))) as string[];

  const filteredArticles = articles.filter((article: any) => {
    const matchesSearch = !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.summary || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesTier = !selectedTier ||
      article.tier === selectedTier ||
      (article.tags && article.tags.some((tg: string) => tg.toLowerCase() === selectedTier)) ||
      (article.title && article.title.toLowerCase().includes(selectedTier === "rpn" ? "rpn" : selectedTier === "rn" ? " rn " : "np")) ||
      (article.category && article.category.toLowerCase().includes(selectedTier));
    return matchesSearch && matchesCategory && matchesTier;
  });

  const featuredArticles = useMemo(() => articles.slice(0, 3), [articles]);
  const highYieldArticles = useMemo(() => {
    return articles
      .filter(
        (a: any) =>
          a.category === "exam-prep" ||
          a.category === "pharmacology" ||
          a.category === "patient-safety" ||
          (Array.isArray(a.tags) &&
            a.tags.some((tg: string) => /nclex|rex|exam|priority|safety|pharm/i.test(String(tg).toLowerCase())))
      )
      .slice(0, 4);
  }, [articles]);

  const featuredIdSet = useMemo(() => new Set(featuredArticles.map((a: any) => a.id)), [featuredArticles]);
  const listArticles = useMemo(() => {
    if (searchQuery || selectedCategory || selectedTier) return filteredArticles;
    const deduped = filteredArticles.filter((a: any) => !featuredIdSet.has(a.id));
    return deduped.length > 0 ? deduped : filteredArticles;
  }, [filteredArticles, featuredIdSet, searchQuery, selectedCategory, selectedTier]);

  const baseUrl = "https://www.nursenest.ca";

  const blogPostingItems = filteredArticles.slice(0, 10).map((article: any) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary || article.seoDescription || "",
    url: `${baseUrl}/learn/${article.slug}`,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.publishedAt || article.createdAt,
    author: { "@type": "Organization", name: "NurseNest" },
    articleSection: article.category || "Nursing Education",
    ...(article.tags?.length ? { keywords: article.tags.join(", ") } : {}),
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "NurseNest Clinical Education Blog",
    description: "Evidence-based nursing education articles covering clinical reasoning, pharmacology, lab interpretation, and exam preparation for RPN and RN students.",
    url: `${baseUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "NurseNest",
      url: baseUrl,
    },
    inLanguage: "en",
    ...(blogPostingItems.length > 0 ? { blogPost: blogPostingItems } : {}),
  };

  function getCategoryLabel(cat: string): string {
    const key = CATEGORY_KEYS[cat];
    return key ? t(key) : cat;
  }

  const learningTiles = [
    { href: "/lessons", title: t("blog.tileLessons"), desc: t("blog.tileLessonsDesc"), Icon: BookOpen },
    { href: "/flashcards", title: t("blog.tileFlashcards"), desc: t("blog.tileFlashcardsDesc"), Icon: Brain },
    { href: "/lab-values", title: t("blog.tileLabs"), desc: t("blog.tileLabsDesc"), Icon: FlaskConical },
    { href: "/clinical-clarity", title: t("blog.tileRhythm"), desc: t("blog.tileRhythmDesc"), Icon: Activity },
    { href: "/nursing-clinical-scenarios", title: t("blog.tileScenarios"), desc: t("blog.tileScenariosDesc"), Icon: Stethoscope },
    { href: "/mock-exams", title: t("blog.tileMocks"), desc: t("blog.tileMocksDesc"), Icon: ClipboardList },
  ];

  return (
    <div
      className="flex min-h-screen flex-col font-sans"
      style={{ background: "var(--theme-page-bg)", color: "var(--theme-heading-text)" }}
    >
      <SEO
        title={t("pages.blog.nursingEducationBlogClinicalReasoning")}
        description={t("pages.blog.evidencebasedNursingArticlesOnClinical")}
        canonicalPath="/blog"
        keywords="nursing blog, clinical reasoning, pharmacology, NCLEX prep, REX-PN, lab interpretation, nursing education, RPN, RN, NP"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca/" },
          { name: "Blog", url: "https://www.nursenest.ca/blog" },
        ]}
      />
      <Navigation />

      <main className="flex-grow" data-testid="section-blog">
        <section className="border-b border-[var(--theme-border)] bg-gradient-to-b from-primary/10 via-[var(--theme-page-bg)] to-[var(--theme-page-bg)] py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">{t("blog.badge")}</span>
            </div>
            <h1
              className="mb-4 text-4xl font-bold text-[var(--theme-heading-text)] md:text-5xl"
              data-testid="text-blog-heading"
            >
              {t("blog.heading")}
            </h1>
            <p className="mx-auto mb-3 max-w-2xl text-lg text-[var(--theme-body-text)]">{t("blog.subtitle")}</p>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-[var(--theme-muted-text)]">{t("blog.pathwaysHint")}</p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-2" data-testid="section-tier-filters">
              {TIER_FILTERS.map((tier) => (
                <button
                  key={tier.key || "all"}
                  type="button"
                  onClick={() => setSelectedTier(selectedTier === tier.key ? null : tier.key)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    selectedTier === tier.key || (!selectedTier && !tier.key)
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "border border-[var(--theme-border)] bg-[var(--theme-card-bg)] text-[var(--theme-body-text)] hover:border-primary/40 hover:text-primary"
                  }`}
                  data-testid={`filter-tier-${tier.key || "all"}`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            <div className="relative mx-auto max-w-lg">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--theme-muted-text)]" />
              <Input
                type="text"
                placeholder={t("blog.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-xl border-[var(--theme-border)] bg-[var(--theme-input-bg)] pl-12 text-base text-[var(--theme-heading-text)] shadow-sm"
                data-testid="input-search-blog"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--theme-border)] py-10" aria-label={t("blog.learningStripTitle")}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-[var(--theme-heading-text)]">{t("blog.learningStripTitle")}</h2>
              <p className="mx-auto mt-2 max-w-3xl text-sm text-[var(--theme-body-text)]">{t("blog.learningStripSubtitle")}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {learningTiles.map(({ href, title, desc, Icon }) => (
                <LocaleLink key={href} href={href}>
                  <Card className="h-full border border-[var(--theme-border)] bg-[var(--theme-card-bg)] shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                    <CardContent className="flex gap-3 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h3 className="font-semibold text-[var(--theme-heading-text)]">{title}</h3>
                        <p className="mt-1 text-xs leading-snug text-[var(--theme-muted-text)]">{desc}</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[var(--theme-muted-text)]" />
                    </CardContent>
                  </Card>
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Card
            className="mb-10 overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-card-bg)] shadow-sm"
            data-testid="card-blog-subscribe"
          >
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-[var(--theme-heading-text)]">{t("blog.subscribeTitle")}</h3>
                  </div>
                  <p className="text-sm text-[var(--theme-body-text)]">{t("blog.subscribeDesc")}</p>
                </div>
                {subStatus === "success" ? (
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl" data-testid="text-subscribe-success">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-medium text-emerald-700">{subMessage}</span>
                  </div>
                ) : subStep === "email" ? (
                  <form onSubmit={handleEmailNext} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder={t("blog.subscribePlaceholder")}
                        value={subEmail}
                        onChange={(e) => { setSubEmail(e.target.value); if (subStatus === "error") setSubStatus("idle"); }}
                        className="h-11 w-full rounded-full border border-[var(--theme-border)] bg-[var(--theme-input-bg)] pl-10 pr-4 text-sm text-[var(--theme-heading-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-64"
                        data-testid="input-blog-subscribe-email"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="h-11 px-6 rounded-full bg-primary hover:brightness-110 text-white shadow-sm text-sm font-semibold"
                      data-testid="button-blog-subscribe-next"
                    >
                      {t("blog.subscribeNext")}
                    </Button>
                    {subStatus === "error" && (
                      <p className="text-xs text-red-500 mt-1 sm:absolute sm:top-full sm:left-0 sm:mt-1" data-testid="text-subscribe-error">{subMessage}</p>
                    )}
                  </form>
                ) : (
                  <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0" data-testid="section-subscribe-frequency">
                    <p className="text-sm font-medium text-[var(--theme-heading-text)]">{t("blog.freqPrompt")}</p>
                    <div className="flex flex-wrap gap-2">
                      {FREQUENCY_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSubFrequency(opt.value)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            subFrequency === opt.value
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "border border-[var(--theme-border)] bg-[var(--theme-card-bg)] text-[var(--theme-body-text)] hover:border-primary/30"
                          }`}
                          data-testid={`button-freq-${opt.value}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSubStep("email")}
                        className="h-10 px-4 rounded-full text-sm"
                        data-testid="button-freq-back"
                      >
                        {t("blog.freqBack")}
                      </Button>
                      <Button
                        type="button"
                        disabled={subStatus === "loading"}
                        onClick={handleSubscribe}
                        className="h-10 px-6 rounded-full bg-primary hover:brightness-110 text-white shadow-sm text-sm font-semibold"
                        data-testid="button-blog-subscribe"
                      >
                        {subStatus === "loading" ? t("blog.subscribing") : t("blog.subscribeButton")}
                      </Button>
                    </div>
                    {subStatus === "error" && (
                      <p className="text-xs text-red-500" data-testid="text-subscribe-error">{subMessage}</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2" data-testid="section-blog-categories">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "border border-[var(--theme-border)] bg-[var(--theme-card-bg)] text-[var(--theme-body-text)] hover:border-primary/30"
                }`}
                data-testid="filter-category-all"
              >
                {t("blog.filterAll")}
              </button>
              {categories.map((cat: string) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "border border-[var(--theme-border)] bg-[var(--theme-card-bg)] text-[var(--theme-body-text)] hover:border-primary/30"
                  }`}
                  data-testid={`filter-category-${cat}`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          )}

          {!isLoading &&
            featuredArticles.length > 0 &&
            !(searchQuery || selectedCategory || selectedTier) && (
              <section className="mb-12" data-testid="section-blog-featured">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-[var(--theme-heading-text)]">{t("blog.featuredTitle")}</h2>
                  <p className="mt-1 text-sm text-[var(--theme-body-text)]">{t("blog.featuredSubtitle")}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {featuredArticles.map((article: any) => (
                    <LocaleLink key={article.id} href={`/learn/${article.slug}`}>
                      <Card className="group h-full cursor-pointer overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-card-bg)] transition-all hover:border-primary/40 hover:shadow-lg">
                        <CardContent className="flex h-full flex-col p-5">
                          {article.category && (
                            <Badge
                              variant="outline"
                              className="mb-3 w-fit border-[var(--theme-border)] bg-[var(--theme-secondary)] text-xs text-[var(--theme-secondary-foreground)]"
                            >
                              {getCategoryLabel(article.category)}
                            </Badge>
                          )}
                          <h3 className="line-clamp-3 flex-1 text-lg font-bold text-[var(--theme-heading-text)] transition-colors group-hover:text-primary">
                            {article.title}
                          </h3>
                          {article.summary && (
                            <p className="mt-2 line-clamp-2 text-sm text-[var(--theme-body-text)]">{article.summary}</p>
                          )}
                          <div className="mt-4 flex items-center justify-between text-xs text-[var(--theme-muted-text)]">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {estimateReadTime(article.content)} {t("blog.minRead")}
                            </span>
                            <ArrowRight className="h-4 w-4 text-primary/60 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                          </div>
                        </CardContent>
                      </Card>
                    </LocaleLink>
                  ))}
                </div>
              </section>
            )}

          {!isLoading &&
            highYieldArticles.length > 0 &&
            !(searchQuery || selectedCategory || selectedTier) && (
              <section className="mb-12" data-testid="section-blog-high-yield">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--theme-heading-text)]">{t("blog.highYieldTitle")}</h2>
                    <p className="text-sm text-[var(--theme-body-text)]">{t("blog.highYieldSubtitle")}</p>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {highYieldArticles.map((article: any) => (
                    <LocaleLink key={article.id} href={`/learn/${article.slug}`} className="min-w-[260px] max-w-xs shrink-0">
                      <Card className="group h-full cursor-pointer border border-[var(--theme-border)] bg-[var(--theme-card-bg)] transition-all hover:border-primary/40 hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="mb-2 flex flex-wrap gap-2">
                            {article.category && (
                              <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                                {getCategoryLabel(article.category)}
                              </Badge>
                            )}
                          </div>
                          <h3 className="line-clamp-2 font-semibold text-[var(--theme-heading-text)] group-hover:text-primary">
                            {article.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-xs text-[var(--theme-muted-text)]">{article.summary}</p>
                        </CardContent>
                      </Card>
                    </LocaleLink>
                  ))}
                </div>
              </section>
            )}

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-20 text-center">
              <BookOpen className="mx-auto mb-4 h-16 w-16 text-[var(--theme-muted-text)]" />
              <h2 className="mb-2 text-xl font-semibold text-[var(--theme-heading-text)]">
                {searchQuery || selectedCategory || selectedTier ? t("blog.noMatchTitle") : t("blog.noArticlesTitle")}
              </h2>
              <p className="text-[var(--theme-muted-text)]">
                {searchQuery || selectedCategory || selectedTier ? t("blog.noMatchDesc") : t("blog.noArticlesDesc")}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-bold text-[var(--theme-heading-text)]">{t("blog.allArticlesTitle")}</h2>
                <p className="text-sm text-[var(--theme-muted-text)]">
                  {listArticles.length} {listArticles.length === 1 ? "article" : "articles"}
                </p>
              </div>
              {listArticles.length > 3 && (
                <div className="hidden sm:block">
                  <InlineLeadCapture
                    leadMagnetType="practice_questions"
                    professionContext="nursing"
                    source="blog_listing"
                  />
                </div>
              )}
              {listArticles.map((article: any) => (
                <LocaleLink key={article.id} href={`/learn/${article.slug}`}>
                  <Card
                    className="group cursor-pointer overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-card-bg)] transition-all hover:border-primary/40 hover:shadow-lg"
                    data-testid={`card-article-${article.slug}`}
                  >
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="min-w-0 flex-grow">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            {article.category && (
                              <Badge
                                variant="outline"
                                className="border-[var(--theme-border)] bg-[var(--theme-secondary)] text-xs text-[var(--theme-secondary-foreground)]"
                              >
                                {getCategoryLabel(article.category)}
                              </Badge>
                            )}
                            {article.tier && article.tier !== "free" && (
                              <Badge variant="secondary" className="text-xs">
                                {article.tier.toUpperCase()}
                              </Badge>
                            )}
                          </div>

                          <h2
                            className="mb-2 line-clamp-2 text-xl font-bold text-[var(--theme-heading-text)] transition-colors group-hover:text-primary sm:text-2xl"
                            data-testid={`text-article-title-${article.slug}`}
                          >
                            {article.title}
                          </h2>

                          {article.summary && (
                            <p className="mb-4 line-clamp-2 text-[var(--theme-body-text)]">{article.summary}</p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--theme-muted-text)]">
                            {article.authorName && (
                              <span className="flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5" />
                                {article.authorName}
                              </span>
                            )}
                            {article.publishedAt && (
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(article.publishedAt)}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {estimateReadTime(article.content)} {t("blog.minRead")}
                            </span>
                            {article.tags && article.tags.length > 0 && (
                              <span className="flex items-center gap-1.5">
                                <Tag className="h-3.5 w-3.5" />
                                {article.tags.slice(0, 3).join(", ")}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="hidden items-center text-primary/50 transition-colors group-hover:text-primary sm:flex">
                          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </LocaleLink>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <ContextualRelatedResources pageType="blog" className="border-t border-[var(--theme-border)]" />
      </div>

      <AdminEditButton />
      <Footer />

      <StickyLeadBanner
        leadMagnetType="study_guide"
        professionContext="nursing"
        source="blog_sticky"
      />
    </div>
  );
}
