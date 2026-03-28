import "@/lib/auth-trust-env";

export { middlewareAuth as middleware } from "@/lib/auth-middleware";

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
};
