import { THEME_COOKIE_NAME } from "@/lib/theme/theme-registry";

const MAX_AGE_SEC = 60 * 60 * 24 * 365;

/** Persist theme for SSR first paint (`RootLayout` reads `cookies()`). */
export function writeThemePreferenceCookieClient(themeId: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(themeId)}; Path=/; Max-Age=${MAX_AGE_SEC}; SameSite=Lax`;
}
