import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageSchemasProps = {
  id: string;
  breadcrumbs?: BreadcrumbItem[];
  service?: {
    name: string;
    description: string;
    path: string;
    audience?: string;
  };
  softwareApplication?: {
    name: string;
    description: string;
    path: string;
    category?: string;
    offerDescription?: string;
  };
};

export default function PageSchemas({
  id,
  breadcrumbs,
  service,
  softwareApplication,
}: PageSchemasProps) {
  const blocks: Record<string, unknown>[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  if (service) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.description,
      url: absoluteUrl(service.path),
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      audience: service.audience
        ? {
            "@type": "Audience",
            audienceType: service.audience,
          }
        : undefined,
    });
  }

  if (softwareApplication) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: softwareApplication.name,
      description: softwareApplication.description,
      url: absoluteUrl(softwareApplication.path),
      applicationCategory:
        softwareApplication.category ?? "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description:
          softwareApplication.offerDescription ??
          "Book a visibility and call leak audit for current med-spa pricing.",
        url: "https://cal.com/rhemic-ai/medspa-discovery-call",
      },
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    });
  }

  if (blocks.length === 0) {
    return null;
  }

  return <JsonLd id={id} data={blocks} />;
}
