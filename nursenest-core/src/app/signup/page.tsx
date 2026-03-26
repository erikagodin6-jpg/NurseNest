import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Signup",
  description: "Create your NurseNest Core account",
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-muted">Pick your country and exam path to personalize content.</p>
        <SignupForm />
      </div>
    </main>
  );
}
