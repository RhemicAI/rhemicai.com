import type { MetadataRoute } from "next";
import {
  indexableRoutes,
  staticPagePriorities,
  routeUrl,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return indexableRoutes.map((path) => ({
    url: routeUrl(path),
    lastModified: now,
    changeFrequency:
      path === "/" || path === "/blog" || path.startsWith("/blog/")
        ? "weekly"
        : "monthly",
    priority: staticPagePriorities[path] ?? (path.startsWith("/blog/") ? 0.76 : 0.72),
  }));
}
