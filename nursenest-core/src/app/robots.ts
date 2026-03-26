import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/pricing", "/login", "/signup"],
      disallow: ["/app", "/admin", "/api"],
    },
    sitemap: "https://www.nursenest.ca/sitemap.xml",
  };
}
