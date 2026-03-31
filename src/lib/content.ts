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
];

export const indexableRoutes = [
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/blog",
  "/careers",
  "/start-free-trial",
  "/products",
  "/products/website-auditing",
  "/products/competitor-analysis",
  "/products/code-generation",
  "/for-local-businesses",
  "/faq",
  "/how-it-works",
  "/compare",
  "/compare/rhemic-vs-seo-ai",
  "/compare/rhemic-vs-surferseo",
  "/compare/rhemic-vs-clearscope",
  "/case-studies",
  "/for-agencies",
  "/resources/glossary",
  "/free-ai-visibility-check",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

export const staticPagePriorities: Record<string, number> = {
  "/": 1,
  "/pricing": 0.95,
  "/products": 0.92,
  "/faq": 0.9,
  "/how-it-works": 0.9,
  "/for-local-businesses": 0.88,
  "/for-agencies": 0.88,
  "/compare": 0.85,
  "/blog": 0.84,
  "/free-ai-visibility-check": 0.84,
  "/about": 0.8,
  "/case-studies": 0.8,
  "/resources/glossary": 0.78,
};

export function routeUrl(path: string) {
  return absoluteUrl(path);
}
