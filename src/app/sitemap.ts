import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rhemicai.com";
  const pageDates: Record<string, string> = {
    "/": "2026-04-01",
    "/about": "2026-04-01",
    "/pricing": "2026-04-01",
    "/contact": "2026-04-01",
    "/products": "2026-04-01",
    "/products/website-auditing": "2026-04-01",
    "/products/code-generation": "2026-04-01",
    "/products/competitor-analysis": "2026-03-15",
    "/blog": "2026-03-15",
    "/blog/what-is-aeo": "2026-03-15",
    "/for-local-businesses": "2026-03-15",
    "/careers": "2026-02-01",
    "/start-free-trial": "2026-03-01",
    "/privacy-policy": "2026-01-15",
    "/terms-of-service": "2026-01-15",
  };

  return [
    // Core pages
    { url: baseUrl, lastModified: pageDates["/"], changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: pageDates["/about"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: pageDates["/pricing"], changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: pageDates["/contact"], changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: pageDates["/blog"], changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog/what-is-aeo`, lastModified: pageDates["/blog/what-is-aeo"], changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: pageDates["/careers"], changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/start-free-trial`, lastModified: pageDates["/start-free-trial"], changeFrequency: "monthly", priority: 0.8 },
    // Products
    { url: `${baseUrl}/products`, lastModified: pageDates["/products"], changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/website-auditing`, lastModified: pageDates["/products/website-auditing"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products/competitor-analysis`, lastModified: pageDates["/products/competitor-analysis"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products/code-generation`, lastModified: pageDates["/products/code-generation"], changeFrequency: "monthly", priority: 0.8 },
    // Legal
    { url: `${baseUrl}/privacy-policy`, lastModified: pageDates["/privacy-policy"], changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: pageDates["/terms-of-service"], changeFrequency: "yearly", priority: 0.3 },
  ];
}
