import JsonLd from "@/components/seo/JsonLd";
import type { FaqItem } from "@/lib/content";

interface FAQPageSchemaProps {
  items: FaqItem[];
  /** Stable id suffix — typically the post slug */
  id: string;
}

/**
 * Renders a FAQPage JSON-LD block from a frontmatter `faq` array.
 * Semantic aid for AI engines; we do NOT depend on FAQ rich results.
 * Usage: add `faq: [{q: "...", a: "..."}]` to post frontmatter.
 */
export default function FAQPageSchema({ items, id }: FAQPageSchemaProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return <JsonLd id={`faq-schema-${id}`} data={schema} />;
}
