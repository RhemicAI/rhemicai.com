import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rhemicai.com";
  const updatedAt = "2026-04-01";

  return [
    // Core pages
    { url: baseUrl, lastModified: updatedAt, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: updatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: updatedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog/what-is-aeo`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/start-free-trial`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.8 },
    // Products
    { url: `${baseUrl}/products`, lastModified: updatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/website-auditing`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products/competitor-analysis`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products/code-generation`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.8 },
    // Legal
    { url: `${baseUrl}/privacy-policy`, lastModified: updatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: updatedAt, changeFrequency: "yearly", priority: 0.3 },
  ];
}
