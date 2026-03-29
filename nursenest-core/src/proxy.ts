/**
 * Next.js 16+: `proxy` replaces `middleware` (same matcher + auth behavior).
 * @see https://nextjs.org/docs/messages/middleware-to-proxy
 */
import "@/lib/auth-trust-env";

export { middlewareAuth as proxy } from "@/lib/auth-middleware";

/** Include bare `/app` and `/admin` — `/app/:path*` alone can miss the dashboard root on some matchers. */
export const config = {
  matcher: ["/app", "/app/:path*", "/admin", "/admin/:path*"],
};
