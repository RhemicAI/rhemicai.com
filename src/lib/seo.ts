import type { Metadata } from "next";

export const siteConfig = {
  name: "Rhemic AI",
  url: "https://rhemicai.com",
  email: "contact@rhemicai.com",
  description:
    "Rhemic AI is an AI visibility platform that helps businesses get discovered, cited, and recommended in ChatGPT, Claude, Perplexity, Gemini, and Google AI experiences.",
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
    description: siteConfig.description,
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Dallas, Texas, United States",
    },
    founders: [
      { "@type": "Person", name: "Ittehadul Karim", jobTitle: "CEO" },
      { "@type": "Person", name: "Shifat Santo", jobTitle: "CTO" },
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
      url: "https://cal.com/rhemic-ai/discovery-call",
    },
    knowsAbout: [
      "AI Engine Optimization",
      "Answer engine optimization",
      "AI visibility tracking",
      "Schema markup",
      "Structured data",
      "Competitor analysis",
    ],
    areaServed: "Worldwide",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
