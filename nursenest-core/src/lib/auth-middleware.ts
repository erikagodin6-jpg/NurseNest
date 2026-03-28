import "./auth-trust-env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authCallbacks } from "@/lib/auth-callbacks";

/**
 * Edge-only NextAuth instance: no Prisma, bcrypt, or PrismaAdapter.
 * Bundling `@/lib/auth` into middleware pulled Prisma into the Edge runtime and
 * broke session resolution in production behind proxies.
 *
 * Credentials `authorize` is never invoked here (login uses the Node route handler).
 * JWT/session callbacks must match `auth.ts` exactly.
 */
export const { auth: middlewareAuth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async () => null,
    }),
  ],
  callbacks: {
    ...authCallbacks,
    /** Matcher is only /app/* and /admin/* — require a session with a user id or email. */
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      const hasUser =
        !!(auth?.user && ((auth.user as { id?: string }).id || auth.user.email));
      if (path.startsWith("/app") || path.startsWith("/admin")) {
        return hasUser;
      }
      return true;
    },
  },
});
