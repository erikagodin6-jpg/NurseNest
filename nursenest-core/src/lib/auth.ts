import "./auth-trust-env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

const authConfigBase: Omit<NextAuthConfig, "trustHost"> & { trustHost?: boolean } = {
  adapter: PrismaAdapter(prisma),
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

/**
 * @auth/core setEnvDefaults() can assign trustHost from AUTH_URL/AUTH_TRUST_HOST.
 * An empty AUTH_URL yields !!( "") === false and breaks hosted deploys. A getter
 * prevents any assignment from clearing trust on DigitalOcean and similar hosts.
 */
export const authConfig: NextAuthConfig = Object.defineProperty(
  authConfigBase,
  "trustHost",
  {
    configurable: true,
    enumerable: true,
    get(): boolean {
      return true;
    },
    set() {
      /* ignore — must stay trusted behind reverse proxies */
    },
  },
) as NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
