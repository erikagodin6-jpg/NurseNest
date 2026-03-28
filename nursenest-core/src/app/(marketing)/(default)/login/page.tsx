import type { Metadata } from "next";
import { MarketingLoginPage } from "@/components/marketing/marketing-login-page";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to NurseNest Core",
  alternates: { canonical: "/login" },
};

type Props = { searchParams: Promise<{ callbackUrl?: string; registered?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const q = await searchParams;
  return (
    <MarketingLoginPage
      locale="en"
      recoveryPathPrefix=""
      callbackUrl={q.callbackUrl}
      registered={q.registered === "1"}
    />
  );
}
