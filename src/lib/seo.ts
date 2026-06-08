import type { Metadata } from "next";

export const siteConfig = {
  name: "Rhemic AI",
  url: "https://rhemicai.com",
  email: "contact@rhemicai.com",
  entity:
    "Rhemic AI makes any business the answer customers find in search and AI engines.",
  description:
    "Rhemic helps businesses get found and recommended across search and AI answer engines, then catches the demand that creates — across calls, after-hours, and forms — and turns it into booked work.",
  social: {
    twitter: "@RhemicAI",
  },
};

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  type = "website",
  noindex = false,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.social.twitter,
    },
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    email: siteConfig.email,
    description: `${siteConfig.entity} ${siteConfig.description}`,
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Dallas, Texas, United States",
    },
    founders: [
      { "@type": "Person", name: "Ittehadul Karim", jobTitle: "CEO" },
      { "@type": "Person", name: "Raahil Shaik", jobTitle: "COO/CFO" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      url: "https://cal.com/rhemic-ai/medspa-discovery-call",
    },
    knowsAbout: [
      "AI search visibility",
      "Answer engine optimization",
      "Getting recommended by AI engines",
      "Google Business Profile optimization",
      "Local search visibility",
      "Lead capture and routing",
      "Missed-call recovery",
      "Source-aware reporting",
      "Schema markup",
      "Structured data",
      "Competitor analysis",
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: `${siteConfig.entity} ${siteConfig.description}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
