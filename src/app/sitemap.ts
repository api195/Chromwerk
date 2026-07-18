import type { MetadataRoute } from "next";
import { site, navigation } from "@/data/site";
import { lookbookProjects } from "@/data/lookbook";

/** Seiten, die (noch) auf "noindex" stehen (Coming Soon) – nicht in die Sitemap. */
const EXCLUDED = new Set(["/pflegeprodukte", "/felgen"]);

/** Automatische Sitemap aus Navigation + Lookbook-Projekten. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = navigation
    .filter((item) => !EXCLUDED.has(item.href))
    .map((item) => ({
      url: `${site.url}${item.href === "/" ? "" : item.href}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: item.href === "/" ? 1 : 0.7,
    }));

  const projectRoutes: MetadataRoute.Sitemap = lookbookProjects.map((p) => ({
    url: `${site.url}/lookbook/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
