"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { THEME_OPTIONS } from "@/lib/theme/theme-registry";
import { marketingT as t } from "@/lib/marketing-i18n";

/** Lightweight theme control; no heavy UI deps. Keeps exam/student bundles free if tree-shaken from exam entry. */
export function ThemePicker({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const current = resolvedTheme ?? theme ?? "lavender";
  const currentLabel = THEME_OPTIONS.find((o) => o.id === current)?.label ?? current;

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-[var(--theme-nav-border)] bg-[var(--theme-nav-bg)] px-2.5 py-1.5 text-xs font-semibold text-[var(--theme-menu-text)] hover:bg-[var(--theme-menu-hover-bg)] hover:text-[var(--theme-menu-hover-text)]"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: THEME_OPTIONS.find((o) => o.id === current)?.color ?? "#9d82dd" }} />
        <span className="max-w-[7rem] truncate">{t("nav.theme")}</span>
        <span className="text-[10px] opacity-70">▾</span>
      </button>
      {open && (
        <div
          className="absolute right-0 z-[100] mt-1 max-h-[min(70vh,22rem)] w-56 overflow-y-auto rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] py-1 shadow-lg"
          role="listbox"
        >
          {(["light", "dark"] as const).map((group) => (
            <div key={group}>
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--theme-muted-text)]">
                {group === "light" ? t("nav.themeGroupLight") : t("nav.themeGroupDark")}
              </p>
              {THEME_OPTIONS.filter((o) => o.group === group).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={opt.id === current}
                  onClick={() => {
                    setTheme(opt.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--theme-menu-hover-bg)] ${
                    opt.id === current ? "font-semibold text-primary" : "text-[var(--theme-menu-text)]"
                  }`}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: opt.color }} />
                  {opt.label}
                </button>
              ))}
            </div>
          ))}
          <p className="border-t border-[var(--theme-separator)] px-3 py-1.5 text-[10px] text-[var(--theme-muted-text)]">{currentLabel}</p>
        </div>
      )}
    </div>
  );
}
