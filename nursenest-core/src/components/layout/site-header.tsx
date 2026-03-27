import Link from "next/link";
import { BookOpen, Briefcase, GraduationCap, Heart } from "lucide-react";
import { SiteHeaderMobileMenu } from "@/components/layout/site-header-mobile-menu";

const topLinks = [
  { href: "/pricing", label: "Exam Prep", icon: BookOpen },
  { href: "/pricing", label: "New Grad Support", icon: GraduationCap },
  { href: "/pricing", label: "Healthcare Careers", icon: Briefcase },
  { href: "/pricing", label: "Allied Health", icon: Heart },
];

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/app/lessons", label: "Lessons" },
  { href: "/app/questions", label: "Question Bank" },
  { href: "/app/exams", label: "Practice Exams" },
  { href: "/pricing", label: "Pricing" },
];

const subLinks = [
  { href: "/app/lessons", label: "Lessons" },
  { href: "/app/questions", label: "Question Bank" },
  { href: "/app/exams", label: "Practice Exams" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-300">
      <div className="hidden md:block" style={{ background: "var(--theme-topbar-bg)", color: "var(--theme-topbar-text)" }}>
        <div className="mx-auto flex h-7 max-w-7xl items-center justify-center gap-1 px-2 text-[10px] font-medium sm:h-8 sm:gap-6 sm:px-4 sm:text-xs lg:px-8">
          {topLinks.map((item, index) => (
            <div key={`${item.label}-${item.href}`} className="flex items-center gap-1 sm:gap-6">
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

      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-2 sm:h-16 sm:px-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-primary group-hover:text-[var(--theme-menu-hover-text)]">NurseNest</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-full px-3 py-2 text-sm font-medium text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)] sm:inline-flex">
            Log in
          </Link>
          <Link href="/signup" className="hidden nn-btn-primary px-4 py-2 text-sm font-bold sm:inline-flex">
            Sign up
          </Link>
          <SiteHeaderMobileMenu />
        </div>
      </div>

      <div className="hidden border-t border-primary/10 bg-primary/5 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-2 px-2 sm:px-4 lg:px-8">
          <div className="flex items-center gap-0.5">
          {subLinks.map((item) => (
            <Link
              key={`sub-${item.href}`}
              href={item.href}
              className="px-1.5 py-1 text-xs font-medium text-primary/70 lg:px-2"
            >
              {item.label}
            </Link>
          ))}
          </div>
        </div>
      </div>
    </header>
  );
}
