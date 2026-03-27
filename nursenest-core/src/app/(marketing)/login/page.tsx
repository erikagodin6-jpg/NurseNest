import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to NurseNest Core",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">Sign in to continue your exam prep.</p>
        <LoginForm />
      </div>
    </main>
  );
}
