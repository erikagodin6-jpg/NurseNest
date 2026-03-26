import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nursenest.ca"),
  title: {
    default: "NurseNest Core | Nursing Exam Prep",
    template: "%s | NurseNest Core",
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
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
