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
};

export default function PageSchemas({
  id,
  breadcrumbs,
  service,
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

  if (blocks.length === 0) {
    return null;
  }

  return <JsonLd id={id} data={blocks} />;
}
