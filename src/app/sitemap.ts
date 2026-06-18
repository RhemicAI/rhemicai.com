import type { MetadataRoute } from "next";
import {
  getAllPosts,
  indexableRoutes,
  staticPagePriorities,
  routeUrl,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const pageDates: Record<string, string> = {
    "/": "2026-06-17",
    "/about": "2026-05-26",
    "/services": "2026-06-08",
    "/pricing": "2026-06-08",
    "/testimonials": "2026-06-08",
    "/contact": "2026-05-26",
    "/products": "2026-05-26",
    "/products/website-auditing": "2026-04-01",
    "/products/code-generation": "2026-04-01",
    "/products/competitor-analysis": "2026-03-15",
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
    "/privacy-policy": "2026-01-15",
    "/terms-of-service": "2026-01-15",
  };

  // Blog index page — date of the newest post, or today if no posts.
  const newestPostDate = posts[0]?.publishedAt ?? "2026-06-17";

  const staticEntries: MetadataRoute.Sitemap = [
    // Blog index
    {
      url: routeUrl("/blog"),
      lastModified: newestPostDate,
      changeFrequency: "weekly",
      priority: 0.84,
    },
    // All other static pages
    ...indexableRoutes.map((path) => ({
      url: routeUrl(path),
      lastModified: pageDates[path] ?? "2026-04-01",
      changeFrequency: (path === "/" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: staticPagePriorities[path] ?? 0.72,
    })),
  ];

  // Individual blog post entries derived from MDX frontmatter.
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: routeUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.76,
  }));

  return [...staticEntries, ...blogEntries];
}
