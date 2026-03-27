import "./auth-trust-env";
import { Auth } from "@auth/core";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

/** Same behavior as next-auth/lib/env `reqWithEnvURL` (not a public export). */
function reqWithEnvURL(req: NextRequest): NextRequest {
  const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (!url) return req;
  const { origin: envOrigin } = new URL(url);
  const { href, origin } = req.nextUrl;
  return new NextRequest(href.replace(origin, envOrigin), req);
}

export const authConfig: NextAuthConfig = {
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
        token.role = (user as any).role;
        token.country = (user as any).country;
        token.tier = (user as any).tier;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
        (session.user as any).country = token.country;
        (session.user as any).tier = token.tier;
      }
      return session;
    },
  },
};

const { auth, signIn, signOut } = NextAuth(authConfig);

export { auth, signIn, signOut };

/**
 * Turbopack production builds can drop or mishandle config passed into the default
 * next-auth handler closure. Call @auth/core Auth() with an object literal that
 * ends in trustHost: true so assertConfig always sees a plain boolean.
 */
export const handlers = {
  GET: (req: NextRequest) =>
    Auth(reqWithEnvURL(req), { ...authConfig, trustHost: true }),
  POST: (req: NextRequest) =>
    Auth(reqWithEnvURL(req), { ...authConfig, trustHost: true }),
};
