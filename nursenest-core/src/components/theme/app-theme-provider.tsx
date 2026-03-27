"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { NURSENEST_DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/theme/theme-registry";

/**
 * Single root for NurseNest theming. Default is lavender (brand baseline).
 * Persistence: localStorage via next-themes (server user theme sync in a later phase).
 */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={NURSENEST_DEFAULT_THEME}
      enableSystem={false}
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
