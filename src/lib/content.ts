import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { absoluteUrl } from "@/lib/seo";

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  category?: string;
};

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
      publishedAt: (data.publishedAt as string) ?? "2026-01-01",
      updatedAt: data.updatedAt as string | undefined,
      readingTime: (data.readingTime as string) ?? "5 min read",
      category: data.category as string | undefined,
    } satisfies BlogPostSummary;
  });

  // Newest first.
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
    publishedAt: (data.publishedAt as string) ?? "2026-01-01",
    updatedAt: data.updatedAt as string | undefined,
    readingTime: (data.readingTime as string) ?? "5 min read",
    category: data.category as string | undefined,
    content,
  };
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
  "/about": 0.8,
  "/case-studies": 0.8,
  "/resources/glossary": 0.78,
};

export function routeUrl(path: string) {
  return absoluteUrl(path);
}
