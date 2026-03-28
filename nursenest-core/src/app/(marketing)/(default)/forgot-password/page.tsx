import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a secure password reset link for NurseNest",
  alternates: { canonical: "/forgot-password" },
};

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">Forgot password</h1>
        <p className="mt-2 text-sm text-muted">
          Enter the email you use to sign in. If an account exists, we will send a reset link (expires in 60 minutes).
        </p>
        <ForgotPasswordForm pathPrefix="" />
      </div>
    </main>
  );
}
