import type { Metadata } from "next";
import { ForgotEmailForm } from "@/components/auth/forgot-email-form";

export const metadata: Metadata = {
  title: "Forgot email or login ID",
  description: "Request help recovering your NurseNest sign-in email",
  alternates: { canonical: "/forgot-email" },
};

export default function ForgotEmailPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">Forgot email or login ID?</h1>
        <p className="mt-2 text-sm text-muted">
          NurseNest signs you in with your email address. If you do not remember it, submit the details below. Our team will verify your
          request and contact you by email. We never show your email on this screen.
        </p>
        <ForgotEmailForm pathPrefix="" />
      </div>
    </main>
  );
}
