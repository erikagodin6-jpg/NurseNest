"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  GraduationCap,
  Heart,
  Menu,
  X,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { mapLegacyMarketingHref } from "@/lib/legacy-marketing-routes";
import { useNursenestRegion } from "@/lib/region/use-nursenest-region";
import { marketingT as t } from "@/lib/marketing-i18n";
import { MARKETING_LANGUAGES } from "@/lib/i18n/marketing-languages";
import { ThemePicker } from "@/components/theme/theme-picker";
import { Button } from "@/components/ui/button";

const PUBLIC_SITE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_NURSENEST_ASSETS_BASE?.replace(/\/$/, "")) || "https://www.nursenest.ca";

function ecosystemTopLinks() {
  return [
    { href: mapLegacyMarketingHref("/exam-prep"), label: t("nav.examPrep"), icon: BookOpen },
    { href: mapLegacyMarketingHref("/new-graduate-support"), label: t("nav.newGradSupport"), icon: GraduationCap },
    { href: mapLegacyMarketingHref("/healthcare-careers"), label: t("nav.healthcareCareers"), icon: Briefcase },
    { href: mapLegacyMarketingHref("/allied-health"), label: t("nav.alliedHealth"), icon: Heart },
  ];
}

function NavDetails({
  label,
  children,
  subBar,
}: {
  label: string;
  children: ReactNode;
  subBar?: boolean;
}) {
  return (
    <details className="group relative">
      <summary
        className={`flex cursor-pointer list-none items-center gap-1 font-medium text-[var(--theme-menu-text)] hover:text-primary [&::-webkit-details-marker]:hidden ${
          subBar ? "h-7 rounded-md px-1.5 text-xs text-primary/70 hover:text-primary lg:px-2" : "rounded-full px-3 py-2 text-sm"
        }`}
      >
        {label}
        <ChevronDown className={`shrink-0 transition-transform group-open:rotate-180 ${subBar ? "h-3 w-3" : "h-3.5 w-3.5"}`} />
      </summary>
      <div className="absolute left-0 top-full z-50 mt-1 min-w-[12rem] rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] py-1 shadow-lg">{children}</div>
    </details>
  );
}

function NavLinkItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary"
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const { region, setRegion } = useNursenestRegion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const topLinks = ecosystemTopLinks();

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-[var(--theme-nav-bg)]/90 shadow-sm backdrop-blur-xl transition-all duration-300">
      <div className="hidden md:block" style={{ background: "var(--theme-topbar-bg)", color: "var(--theme-topbar-text)" }}>
        <div className="mx-auto flex h-7 max-w-7xl items-center justify-center gap-1 px-2 text-[10px] font-medium sm:h-8 sm:gap-6 sm:px-4 sm:text-xs lg:px-8">
          {topLinks.map((item, index) => (
            <div key={item.href} className="flex items-center gap-1 sm:gap-6">
              <Link href={item.href} className="flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-white/15">
                <item.icon className="h-3 w-3" />
                <span>{item.label}</span>
              </Link>
              {index < topLinks.length - 1 && (
                <span className="hidden opacity-30 sm:inline" aria-hidden="true">
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-2 px-2 sm:h-16 sm:px-4 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <span className="truncate text-xl font-extrabold tracking-tight text-primary group-hover:text-[var(--theme-menu-hover-text)]">NurseNest</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1">
          <Link
            href="/"
            className="rounded-full px-3 py-2 text-sm font-medium text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)]"
          >
            {t("nav.home")}
          </Link>

          <NavDetails label={t("nav.study")}>
            <NavLinkItem href={mapLegacyMarketingHref("/lessons")}>{t("nav.lessons")}</NavLinkItem>
            <NavLinkItem href={mapLegacyMarketingHref("/test-bank")}>{t("nav.questionBank")}</NavLinkItem>
            <NavLinkItem href={mapLegacyMarketingHref("/mock-exams")}>{t("nav.practiceExams")}</NavLinkItem>
            <NavLinkItem href={mapLegacyMarketingHref("/flashcards")}>{t("nav.flashcards")}</NavLinkItem>
          </NavDetails>

          <NavDetails label={t("nav.resources")}>
            <NavLinkItem href="/pricing">{t("nav.pricing")}</NavLinkItem>
            <NavLinkItem href={mapLegacyMarketingHref("/faq")}>{t("footer.faq")}</NavLinkItem>
            <NavLinkItem href={mapLegacyMarketingHref("/shop")}>{t("nav.store")}</NavLinkItem>
          </NavDetails>

          <div className="mx-1 flex items-center gap-1 rounded-full border border-[var(--theme-nav-border)] px-1 py-0.5">
            <button
              type="button"
              onClick={() => setRegion("US")}
              className={`rounded-full px-2 py-1 text-xs font-semibold ${region === "US" ? "bg-primary/15 text-primary" : "text-[var(--theme-muted-text)] hover:bg-[var(--theme-menu-hover-bg)]"}`}
            >
              {t("home.region.us")}
            </button>
            <button
              type="button"
              onClick={() => setRegion("CA")}
              className={`rounded-full px-2 py-1 text-xs font-semibold ${region === "CA" ? "bg-primary/15 text-primary" : "text-[var(--theme-muted-text)] hover:bg-[var(--theme-menu-hover-bg)]"}`}
            >
              {t("home.region.ca")}
            </button>
          </div>

          <ThemePicker className="hidden lg:block" />

          <div className="relative hidden xl:block" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)]"
            >
              {t("nav.language")}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {langOpen && (
              <div className="absolute right-0 z-[100] mt-1 max-h-64 w-52 overflow-y-auto rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] py-1 shadow-lg">
                {MARKETING_LANGUAGES.map((lang) => (
                  <a
                    key={lang.code}
                    href={lang.code === "en" ? "/" : `${PUBLIC_SITE}/${lang.code}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)]"
                    rel={lang.code === "en" ? undefined : "noopener noreferrer"}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </a>
                ))}
                <Link
                  href={mapLegacyMarketingHref("/languages")}
                  className="block border-t border-[var(--theme-separator)] px-3 py-2 text-xs font-semibold text-primary hover:underline"
                  onClick={() => setLangOpen(false)}
                >
                  {t("footer.viewAllLanguages")}
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemePicker className="lg:hidden" />
          <Link
            href="/login"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)] sm:inline-flex"
          >
            {t("nav.logIn")}
          </Link>
          <Link href="/signup" className="hidden nn-btn-primary px-4 py-2 text-sm font-bold sm:inline-flex">
            {t("nav.signUp")}
          </Link>
          <Button
            type="button"
            variant="ghost"
            className="md:hidden h-9 w-9 shrink-0 p-0 text-[var(--theme-menu-text)]"
            aria-label={t("nav.openMenu")}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="hidden border-t border-primary/10 bg-primary/5 md:block">
        <div className="mx-auto flex h-9 max-w-7xl flex-wrap items-center gap-x-1 gap-y-1 px-2 sm:px-4 lg:px-8">
          <NavDetails label={t("nav.learningTools")} subBar>
            <NavLinkItem href={mapLegacyMarketingHref("/lessons")}>{t("nav.lessons")}</NavLinkItem>
            <NavLinkItem href={mapLegacyMarketingHref("/flashcards")}>{t("nav.flashcards")}</NavLinkItem>
            <NavLinkItem href={mapLegacyMarketingHref("/test-bank")}>{t("nav.questionBank")}</NavLinkItem>
          </NavDetails>
          <NavDetails label={t("nav.examPrepShort")} subBar>
            <NavLinkItem href={mapLegacyMarketingHref("/mock-exams")}>{t("nav.practiceExams")}</NavLinkItem>
            <NavLinkItem href="/pricing">{t("nav.pricing")}</NavLinkItem>
          </NavDetails>
          <Link
            href="/pricing"
            className="px-1.5 py-1 text-xs font-medium text-primary/70 hover:text-primary lg:px-2"
          >
            {t("nav.pricing")}
          </Link>
          <Link
            href={mapLegacyMarketingHref("/faq")}
            className="px-1.5 py-1 text-xs font-medium text-primary/70 hover:text-primary lg:px-2"
          >
            {t("footer.faq")}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label={t("nav.closeMenu")} onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-[var(--theme-separator)] bg-[var(--theme-card-bg)] shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--theme-separator)] p-4">
              <span className="text-lg font-extrabold text-primary">NurseNest</span>
              <Button type="button" variant="ghost" className="h-9 w-9 p-0" aria-label={t("nav.closeMenu")} onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">{t("nav.regionLabel")}</p>
              <div className="mb-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setRegion("US")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold ${
                    region === "US" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"
                  }`}
                >
                  {t("home.region.us")}
                  {region === "US" ? <CheckCircle2 className="h-4 w-4" /> : null}
                </button>
                <button
                  type="button"
                  onClick={() => setRegion("CA")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold ${
                    region === "CA" ? "border-red-600 bg-red-50 text-red-700" : "border-gray-200 text-gray-600"
                  }`}
                >
                  {t("home.region.ca")}
                  {region === "CA" ? <CheckCircle2 className="h-4 w-4" /> : null}
                </button>
              </div>
              <p className="mb-2 flex items-start gap-2 text-xs text-[var(--theme-muted-text)]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {region === "US" ? t("home.region.usDesc") : t("home.region.caDesc")}
              </p>
              <hr className="my-3 border-[var(--theme-separator)]" />
              {[
                { href: "/", label: t("nav.home") },
                { href: mapLegacyMarketingHref("/lessons"), label: t("nav.lessons") },
                { href: mapLegacyMarketingHref("/test-bank"), label: t("nav.questionBank") },
                { href: mapLegacyMarketingHref("/mock-exams"), label: t("nav.practiceExams") },
                { href: "/pricing", label: t("nav.pricing") },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-full border border-[var(--theme-nav-border)] py-2 text-center text-sm font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.logIn")}
                </Link>
                <Link href="/signup" className="nn-btn-primary flex-1 py-2 text-center text-sm font-bold" onClick={() => setMobileOpen(false)}>
                  {t("nav.signUp")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
