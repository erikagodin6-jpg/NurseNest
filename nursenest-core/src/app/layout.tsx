import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { AppThemeProvider } from "@/components/theme/app-theme-provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nursenest.ca"),
  title: {
    default: "NurseNest | Healthcare Exam Prep",
    template: "%s | NurseNest",
  },
  description:
    "Stable, premium nursing exam prep for CA and US learners across RPN, LVN/LPN, RN, and NP pathways.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[var(--theme-page-bg)] text-[var(--theme-body-text)] transition-colors duration-200">
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
