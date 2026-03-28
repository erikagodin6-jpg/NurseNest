import "./auth-trust-env";
import NextAuth, { type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

/**
 * One NextAuth instance: same config for `auth()`, `handlers` (GET/POST /api/auth/*),
 * middleware, and signIn/signOut. Do not construct parallel `Auth()` handlers elsewhere —
 * that was splitting `setEnvDefaults`/session behavior between RSC and the session endpoint.
 */
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials.email ?? "").toLowerCase();
        const password = String(credentials.password ?? "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user?.passwordHash) return null;

        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          country: user.country,
          tier: user.tier,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as {
          id: string;
          email: string;
          name: string;
          role: string;
          country: string;
          tier: string;
        };
        token.sub = u.id;
        token.email = u.email;
        token.name = u.name;
        token.role = u.role;
        token.country = u.country;
        token.tier = u.tier;
      }
      // Keep JWT claims in sync with DB (e.g. ADMIN promotion) without requiring a password reset.
      if (token.sub) {
        try {
          const row = await prisma.user.findUnique({
            where: { id: token.sub as string },
            select: { role: true, country: true, tier: true, name: true, email: true },
          });
          if (row) {
            token.role = row.role;
            token.country = row.country;
            token.tier = row.tier;
            token.name = row.name;
            token.email = row.email;
          }
        } catch {
          // Edge / transient DB: keep existing token claims.
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.sub as string;
        session.user.email = (token.email as string) ?? session.user.email;
        session.user.name = (token.name as string) ?? session.user.name;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { country?: string }).country = token.country as string;
        (session.user as { tier?: string }).tier = token.tier as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
