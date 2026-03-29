/**
 * Next.js 16+: `proxy` replaces `middleware` (same matcher + auth behavior).
 * @see https://nextjs.org/docs/messages/middleware-to-proxy
 */
import "@/lib/auth-trust-env";

export { middlewareAuth as proxy } from "@/lib/auth-middleware";

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
};
