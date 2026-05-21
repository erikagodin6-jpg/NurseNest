import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import { AuthSessionProvider } from "@/components/auth/auth-session-provider";
import { AppThemeProvider } from "@/components/theme/app-theme-provider";
import { marketingOpenGraphImageUrl } from "@/lib/marketing-assets";
import { MARKETING_SITE_ORIGIN } from "@/lib/seo/site-origin";
import {
  NURSENEST_DEFAULT_THEME,
  THEME_COOKIE_NAME,
  THEME_STORAGE_KEY,
  resolveThemeIdFromUnknown,
} from "@/lib/theme/theme-registry";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = MARKETING_SITE_ORIGIN;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NurseNest | Healthcare Exam Prep",
    template: "%s | NurseNest",
  },
  description:
    "Stable, premium nursing exam prep for CA and US learners across RPN, LVN/LPN, RN, and NP pathways.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "NurseNest",
    title: "NurseNest | Healthcare Exam Prep",
    description:
      "Stable, premium nursing exam prep for CA and US learners across RPN, LVN/LPN, RN, and NP pathways.",
    images: [
      {
        url: marketingOpenGraphImageUrl(),
        width: 1200,
        height: 630,
        alt: "NurseNest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NurseNest | Healthcare Exam Prep",
    description:
      "Stable, premium nursing exam prep for CA and US learners across RPN, LVN/LPN, RN, and NP pathways.",
    images: [marketingOpenGraphImageUrl()],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = resolveThemeIdFromUnknown(cookieStore.get(THEME_COOKIE_NAME)?.value);
  const themeBoot = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var fb=${JSON.stringify(cookieTheme)};var v=localStorage.getItem(k);if(v==null||v===""){v=fb||${JSON.stringify(NURSENEST_DEFAULT_THEME)};localStorage.setItem(k,v);}document.documentElement.setAttribute("data-theme",v);}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(NURSENEST_DEFAULT_THEME)});}})();`;

  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
      data-theme={cookieTheme}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--theme-page-bg)] text-[var(--theme-body-text)] transition-colors duration-200">
        <Script id="nursenest-theme-boot" strategy="beforeInteractive">
          {themeBoot}
        </Script>
        <AppThemeProvider>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
