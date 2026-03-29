import "./auth-trust-env";
import { Auth } from "@auth/core";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import { authCallbacks } from "@/lib/auth-callbacks";
import { isEmailLikeIdentifier, normalizeLoginIdentifier } from "@/lib/auth/normalize-login-identifier";
import { prisma } from "@/lib/db";
import { safeServerLog, safeServerLogCritical } from "@/lib/observability/safe-server-log";

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
        email: { label: "Email or username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const identifier = normalizeLoginIdentifier(String(credentials.email ?? ""));
        const password = String(credentials.password ?? "");
        if (!identifier || !password) {
          safeServerLog("auth", "credentials_rejected", { reason: "missing_fields" });
          return null;
        }

        let user;
        try {
          if (isEmailLikeIdentifier(identifier)) {
            user = await prisma.user.findUnique({
              where: { email: identifier },
            });
          } else {
            user = await prisma.user.findUnique({
              where: { username: identifier },
            });
          }
        } catch (e) {
          const detail = e instanceof Error ? e.message.slice(0, 800) : String(e).slice(0, 800);
          safeServerLogCritical("auth", "user_lookup_failed", { surface: "credentials", detail }, e);
          return null;
        }

        if (!user?.passwordHash) {
          safeServerLog("auth", "credentials_rejected", { reason: "no_account_or_no_password" });
          return null;
        }

        const ok = await compare(password, user.passwordHash);
        if (!ok) {
          safeServerLog("auth", "credentials_rejected", { reason: "invalid_password" });
          return null;
        }

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
  callbacks: authCallbacks,
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
