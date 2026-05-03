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
    "/": "2026-04-01",
    "/about": "2026-04-01",
    "/pricing": "2026-04-01",
    "/contact": "2026-04-01",
    "/products": "2026-04-01",
    "/products/website-auditing": "2026-04-01",
    "/products/code-generation": "2026-04-01",
    "/products/competitor-analysis": "2026-03-15",
    "/blog": "2026-03-31",
    "/for-local-businesses": "2026-03-15",
    "/for-agencies": "2026-03-15",
    "/faq": "2026-03-01",
    "/how-it-works": "2026-03-01",
    "/compare": "2026-03-15",
    "/compare/rhemic-vs-seo-ai": "2026-03-15",
    "/compare/rhemic-vs-surferseo": "2026-03-15",
    "/compare/rhemic-vs-clearscope": "2026-03-15",
    "/case-studies": "2026-03-15",
    "/resources/glossary": "2026-03-01",
    "/answers": "2026-05-03",
    "/ai-search-visibility": "2026-05-03",
    "/answer-engine-optimization": "2026-05-03",
    "/glossary": "2026-05-03",
    "/sample-ai-visibility-report": "2026-05-03",
    "/show-up-in-ai-answers": "2026-05-03",
    "/best-ai-visibility-tools": "2026-05-03",
    "/best-aeo-tools": "2026-05-03",
    "/best-ai-search-optimization-tools": "2026-05-03",
    "/ai-visibility-tools-for-agencies": "2026-05-03",
    "/ai-search-visibility-for-small-businesses": "2026-05-03",
    "/compare/best-ai-visibility-platforms": "2026-05-03",
    "/compare/rhemic-ai-vs-profound": "2026-05-03",
    "/compare/rhemic-ai-vs-scrunch": "2026-05-03",
    "/compare/rhemic-ai-vs-otterly": "2026-05-03",
    "/compare/rhemic-ai-vs-traditional-seo-agency": "2026-05-03",
    "/free-ai-visibility-check": "2026-03-15",
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
