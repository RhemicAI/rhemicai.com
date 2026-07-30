import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { absoluteUrl } from "@/lib/seo";

// ---------------------------------------------------------------------------
// Pillar taxonomy — used for hub-and-spoke internal linking
// ---------------------------------------------------------------------------

export type Pillar =
  | "visibility"
  | "capture"
  | "attribution"
  | "lead-economics"
  | "trade"
  | "agency";

// FAQ item used in FAQPage schema
export type FaqItem = { q: string; a: string };

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  category?: string;
  // New fields (all optional — existing post builds safely with no values)
  pillar?: Pillar;
  cluster?: string;
  relatedPosts?: string[];
  canonical?: string;
  heroImage?: string;
  faq?: FaqItem[];
};

// Guard: return undefined for any string that would produce Invalid Date.
export function safeIsoDate(raw: unknown): string | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? undefined : raw;
}

// ---------------------------------------------------------------------------
// MDX-backed blog helpers
// ---------------------------------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPostSummary[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const fullPath = path.join(BLOG_DIR, filename);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(source);

    return {
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      publishedAt: safeIsoDate(data.publishedAt) ?? "2026-01-01",
      updatedAt: safeIsoDate(data.updatedAt),
      readingTime: (data.readingTime as string) ?? "5 min read",
      category: data.category as string | undefined,
      pillar: data.pillar as Pillar | undefined,
      cluster: data.cluster as string | undefined,
      relatedPosts: Array.isArray(data.relatedPosts)
        ? (data.relatedPosts as string[])
        : undefined,
      canonical: data.canonical as string | undefined,
      heroImage: data.heroImage as string | undefined,
      faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : undefined,
    } satisfies BlogPostSummary;
  });

  // Newest first. safeIsoDate guarantees both values are valid ISO strings.
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(
  slug: string
): (BlogPostSummary & { content: string }) | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    publishedAt: safeIsoDate(data.publishedAt) ?? "2026-01-01",
    updatedAt: safeIsoDate(data.updatedAt),
    readingTime: (data.readingTime as string) ?? "5 min read",
    category: data.category as string | undefined,
    pillar: data.pillar as Pillar | undefined,
    cluster: data.cluster as string | undefined,
    relatedPosts: Array.isArray(data.relatedPosts)
      ? (data.relatedPosts as string[])
      : undefined,
    canonical: data.canonical as string | undefined,
    heroImage: data.heroImage as string | undefined,
    faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : undefined,
    content,
  };
}

// ---------------------------------------------------------------------------
// Pillar hub helper — returns all posts for a given pillar, newest first.
// ---------------------------------------------------------------------------

export function getPostsByPillar(pillar: Pillar): BlogPostSummary[] {
  return getAllPosts().filter((p) => p.pillar === pillar);
}

// ---------------------------------------------------------------------------
// Legacy static export kept for any callers that haven't migrated.
// Returns an empty array — the old pre-pivot posts no longer exist.
// ---------------------------------------------------------------------------
export const blogPosts: BlogPostSummary[] = [];

// ---------------------------------------------------------------------------
// Static routes
// ---------------------------------------------------------------------------

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
  // Answer pages unblocked on 2026-07-30. These carry live AI citations;
  // /answers/why-your-competitor-shows-up-in-ai-answers holds ~54% citation
  // share on its grounding query.
  "/answers/what-is-aeo",
  "/answers/what-is-ai-visibility",
  "/answers/why-your-competitor-shows-up-in-ai-answers",
  "/answers/how-local-businesses-can-show-up-in-ai-answers",
  "/answers/how-to-improve-chatgpt-visibility",
  "/answers/how-to-improve-perplexity-visibility",
  "/answers/how-marketing-agencies-can-sell-ai-visibility",
];

/** Service stack pages. Positioning doc 2026-07-30, sections 3 and 8. */
const serviceRoutes = [
  "/services/aeo",
  "/services/geo",
  "/services/seo",
  "/services/google-business-profile",
];

/** Product pages. /products/website-auditing is our largest AI citation earner. */
const productRoutes = [
  "/products/website-auditing",
];

/** Comparison cluster. Generative engines lean on comparison content. */
const compareRoutes = [
  "/compare",
  "/compare/best-ai-visibility-platforms",
  "/compare/rhemic-ai-vs-otterly",
  "/compare/rhemic-ai-vs-profound",
  "/compare/rhemic-ai-vs-scrunch",
  "/compare/rhemic-ai-vs-traditional-seo-agency",
  "/compare/rhemic-vs-clearscope",
  "/compare/rhemic-vs-seo-ai",
  "/compare/rhemic-vs-surferseo",
];

/** Category landing pages in the buyer's own language. */
const categoryRoutes = [
  "/answer-engine-optimization",
  "/ai-search-visibility",
  "/ai-search-visibility-for-small-businesses",
  "/for-local-businesses",
  "/show-up-in-ai-answers",
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
  ...serviceRoutes,
  ...productRoutes,
  ...compareRoutes,
  ...categoryRoutes,
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
  "/about": 0.8,
  "/case-studies": 0.8,
  "/resources/glossary": 0.78,
  // Service stack — the pages an answer engine grounds on for what we sell.
  "/services/aeo": 0.94,
  "/services/geo": 0.92,
  "/services/seo": 0.92,
  "/services/google-business-profile": 0.92,
  // Citation earners.
  "/products/website-auditing": 0.9,
  "/answers/why-your-competitor-shows-up-in-ai-answers": 0.9,
  "/answers/what-is-aeo": 0.86,
  "/answers/what-is-ai-visibility": 0.86,
  // Category language.
  "/answer-engine-optimization": 0.86,
  "/ai-search-visibility": 0.84,
  "/for-local-businesses": 0.84,
  "/compare": 0.8,
};

export function routeUrl(path: string) {
  return absoluteUrl(path);
}
