import JsonLd from "@/components/seo/JsonLd";
import { siteConfig, absoluteUrl } from "@/lib/seo";

interface LocalBusinessServiceSchemaProps {
  /** e.g. "HVAC", "Plumbing", "Roofing" */
  trade: string;
  /** e.g. "HVAC Visibility and Capture" */
  serviceName: string;
  /** Short service description */
  serviceDescription: string;
  /** Geographic area served, e.g. "United States" */
  areaServed?: string;
  /** Page URL — defaults to Rhemic services page */
  url?: string;
  id: string;
}

/**
 * LocalBusiness + Service schema block for trade-playbook posts.
 * Tells AI engines the post is relevant to a specific trade.
 * Usable on Pillar 5 posts and any capture/attribution post with a trade angle.
 */
export default function LocalBusinessServiceSchema({
  trade,
  serviceName,
  serviceDescription,
  areaServed = "United States",
  url,
  id,
}: LocalBusinessServiceSchemaProps) {
  const pageUrl = url ?? absoluteUrl("/services");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    serviceType: trade,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
    url: pageUrl,
  };

  return <JsonLd id={`local-biz-service-${id}`} data={schema} />;
}
