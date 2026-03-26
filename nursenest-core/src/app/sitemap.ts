import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.nursenest.ca";
  const publicRoutes = ["/", "/pricing", "/login", "/signup"];

  return publicRoutes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
    lastModified: new Date(),
  }));
}
