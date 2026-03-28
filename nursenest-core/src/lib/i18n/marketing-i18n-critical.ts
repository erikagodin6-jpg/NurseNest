/**
 * Keys and prefixes used for production-critical UI (nav, auth shell, pricing entry,
 * tools hub/shell, common errors). Used by i18n validation to flag English leakage
 * when overlay values still match the English base.
 */
export const MARKETING_I18N_CRITICAL_PREFIXES = [
  "nav.",
  "footer.",
  "pages.login.",
  "pages.signup.",
  "pages.pricing.",
  "pages.tools.",
  "pages.forgot",
  "pages.reset",
  "forgotPassword.",
  "resetPassword.",
  "signup.",
  "login.",
  "pricing.",
  "checkout.",
  "tools.common.",
  "tools.errors.",
  "tools.dosePerKg.",
  "tools.abg.",
  "tools.units.",
  "tools.infusionMlHr.",
  "tools.ivDrip.",
  "tools.labReference.",
  "toolShell.",
  "components.footer.",
  "emailSignup.",
  "pages.home.meta",
] as const;

export function isMarketingCriticalKey(key: string): boolean {
  return MARKETING_I18N_CRITICAL_PREFIXES.some((p) => key.startsWith(p));
}
