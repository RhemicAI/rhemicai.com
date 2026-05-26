import type { MetadataRoute } from "next";
import {
  blogPosts,
  indexableRoutes,
  staticPagePriorities,
  routeUrl,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogDates = Object.fromEntries(
    blogPosts.map((post) => [`/blog/${post.slug}`, post.publishedAt])
  ) as Record<string, string>;

  const pageDates: Record<string, string> = {
    "/": "2026-05-26",
    "/about": "2026-05-26",
    "/pricing": "2026-05-26",
    "/contact": "2026-05-26",
    "/products": "2026-05-26",
    "/products/website-auditing": "2026-04-01",
    "/products/code-generation": "2026-04-01",
    "/products/competitor-analysis": "2026-03-15",
    "/blog": "2026-03-31",
    "/faq": "2026-05-26",
    "/how-it-works": "2026-05-26",
    "/compare": "2026-03-15",
    "/compare/rhemic-vs-seo-ai": "2026-03-15",
    "/compare/rhemic-vs-surferseo": "2026-03-15",
    "/compare/rhemic-vs-clearscope": "2026-03-15",
    "/case-studies": "2026-03-15",
    "/resources/glossary": "2026-03-01",
    "/answers": "2026-05-26",
    "/answers/what-is-rhemic-ai": "2026-05-26",
    "/answers/who-is-rhemic-ai-for": "2026-05-26",
    "/answers/how-does-rhemic-ai-work": "2026-05-26",
    "/glossary": "2026-05-26",
    "/careers": "2026-02-01",
    "/start-free-trial": "2026-03-01",
    "/privacy-policy": "2026-01-15",
    "/terms-of-service": "2026-01-15",
    ...blogDates,
  };

  return indexableRoutes.map((path) => ({
    url: routeUrl(path),
    lastModified: pageDates[path] ?? "2026-04-01",
    changeFrequency:
      path === "/" || path === "/blog" || path.startsWith("/blog/")
        ? "weekly"
        : "monthly",
    priority:
      staticPagePriorities[path] ?? (path.startsWith("/blog/") ? 0.76 : 0.72),
  }));
}
