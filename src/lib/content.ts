import { absoluteUrl } from "@/lib/seo";

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
};

export const blogPosts: BlogPostSummary[] = [
  {
    slug: "what-is-aeo",
    title: "The Complete Guide to AI Engine Optimization (AEO) in 2026",
    description:
      "Learn what AEO is, how AI answer engines work, and the 5-step process to optimize your website for ChatGPT, Claude, Perplexity, and Google AI Overviews.",
    publishedAt: "2026-02-14",
    readingTime: "15 min read",
  },
  {
    slug: "seo-vs-aeo",
    title:
      "SEO vs AEO: What’s the Difference Between Traditional SEO and AI Engine Optimization?",
    description:
      "A practical breakdown of how traditional SEO differs from AI Engine Optimization, when they overlap, and what teams need to change right now.",
    publishedAt: "2026-03-31",
    readingTime: "10 min read",
  },
  {
    slug: "how-to-audit-your-websites-ai-visibility",
    title: "How to Audit Your Website’s AI Visibility (Step-by-Step Guide)",
    description:
      "A field guide for auditing how ChatGPT, Claude, Perplexity, and Gemini understand your site, with a repeatable workflow for finding the highest-impact gaps.",
    publishedAt: "2026-03-31",
    readingTime: "11 min read",
  },
  {
    slug: "how-marketing-agencies-can-get-recommended-by-ai-tools",
    title: "How Marketing Agencies Can Get Recommended by AI Tools",
    description:
      "How agencies can structure service pages, proof, schema, and delivery systems so AI engines recommend them for client work.",
    publishedAt: "2026-03-31",
    readingTime: "9 min read",
  },
  {
    slug: "my-business-isnt-showing-up-in-ai-chat-answers",
    title: "My Business Isn’t Showing Up in AI Chat Answers. Here’s How to Fix It",
    description:
      "Why businesses disappear from AI answers and the fixes that usually move the needle first: entity clarity, content depth, schema, and competitive coverage.",
    publishedAt: "2026-03-31",
    readingTime: "10 min read",
  },
  {
    slug: "how-to-improve-chatgpt-visibility",
    title: "How to Improve Your ChatGPT Visibility: A Practical Guide",
    description:
      "The structural and content changes that move the needle on ChatGPT recommendations — entity clarity, schema, FAQ pages, and AI crawler access.",
    publishedAt: "2026-05-03",
    readingTime: "9 min read",
  },
  {
    slug: "schema-markup-for-ai-visibility",
    title: "Schema Markup for AI Visibility: Which Types Matter Most",
    description:
      "A practical guide to the schema markup types that most improve AI answer engine visibility — FAQPage, Organization, Service, LocalBusiness, and BreadcrumbList.",
    publishedAt: "2026-05-03",
    readingTime: "8 min read",
  },
  {
    slug: "why-your-competitor-shows-up-in-ai-and-you-dont",
    title: "Why Your Competitor Shows Up in AI Answers and You Do Not",
    description:
      "The structural reasons competitors appear in ChatGPT, Perplexity, and Gemini answers when you do not — and the specific fixes for each gap.",
    publishedAt: "2026-05-03",
    readingTime: "8 min read",
  },
  {
    slug: "how-perplexity-visibility-works",
    title: "How Perplexity Visibility Works and How to Improve It",
    description:
      "Perplexity cites sources in its answers. Understanding how it retrieves, ranks, and cites content is the key to improving your Perplexity visibility.",
    publishedAt: "2026-05-03",
    readingTime: "7 min read",
  },
  {
    slug: "local-business-ai-recommendations",
    title: "How Local Businesses Get Recommended in AI Answers",
    description:
      "A practical guide for local service businesses on the specific signals that drive AI recommendations — entity clarity, local schema, FAQ content, and review signals.",
    publishedAt: "2026-05-03",
    readingTime: "8 min read",
  },
];

// Public entity routes kept in the sitemap after the PR #53 med-spa positioning sweep.
const aeoRoutes = [
  // Answers index
  "/answers",
  // Answer pages
  "/answers/what-is-rhemic-ai",
  "/answers/who-is-rhemic-ai-for",
  "/answers/how-does-rhemic-ai-work",
  // Glossary
  "/glossary",
  "/glossary/ai-search-visibility",
  "/glossary/answer-engine-optimization",
  "/glossary/generative-engine-optimization",
  "/glossary/ai-citation",
  "/glossary/brand-share",
  "/glossary/llm-visibility",
  "/glossary/schema-markup",
  "/glossary/entity-authority",
];

export const indexableRoutes = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/testimonials",
  "/contact",
  "/careers",
  "/products",
  "/faq",
  "/how-it-works",
  "/case-studies",
  "/resources/glossary",
  "/privacy-policy",
  "/terms-of-service",
  ...aeoRoutes,
];

export const staticPagePriorities: Record<string, number> = {
  "/": 1,
  "/services": 0.95,
  "/pricing": 0.95,
  "/testimonials": 0.9,
  "/products": 0.92,
  "/faq": 0.9,
  "/how-it-works": 0.9,
  // Answers index + answer pages
  "/answers": 0.88,
  "/answers/what-is-rhemic-ai": 0.9,
  "/answers/who-is-rhemic-ai-for": 0.88,
  "/answers/how-does-rhemic-ai-work": 0.88,
  // Glossary
  "/glossary": 0.82,
  "/blog": 0.84,
  "/about": 0.8,
  "/case-studies": 0.8,
  "/resources/glossary": 0.78,
};

export function routeUrl(path: string) {
  return absoluteUrl(path);
}
