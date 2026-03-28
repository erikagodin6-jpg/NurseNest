import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your NurseNest account",
  alternates: { canonical: "/reset-password" },
};

type Props = { searchParams: Promise<{ token?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : null;

  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">Reset password</h1>
        <p className="mt-2 text-sm text-muted">Choose a new password for your account.</p>
        <ResetPasswordForm token={token} pathPrefix="" />
      </div>
    </main>
  );
}
