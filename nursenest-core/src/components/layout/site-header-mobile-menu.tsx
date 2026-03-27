"use client";

import Link from "next/link";
import { useState } from "react";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/app/lessons", label: "Lessons" },
  { href: "/app/questions", label: "Question Bank" },
  { href: "/app/exams", label: "Practice Exams" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeaderMobileMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-9 items-center rounded-full border border-primary/20 bg-primary/5 px-3 text-sm font-semibold text-primary md:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label="Toggle mobile menu"
      >
        {mobileOpen ? "Close" : "Menu"}
      </button>

      {mobileOpen && (
        <div className="border-t border-[var(--theme-nav-border)] bg-[var(--theme-nav-bg)] md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-3">
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-full border border-[var(--theme-nav-border)] px-3 py-2 text-center text-sm font-semibold text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)]"
              >
                Log in
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="nn-btn-primary flex-1 px-3 py-2 text-center text-sm font-bold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
