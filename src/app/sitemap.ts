import type { MetadataRoute } from "next";
import { SITE_URL, publicPaths } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicPaths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/weekly-menu" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
