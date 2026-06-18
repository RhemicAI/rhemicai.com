import Link from "next/link";
import type { BlogPostSummary, Pillar } from "@/lib/content";

interface RelatedPostsProps {
  /** Explicit related slugs from frontmatter (shown first, up to 3) */
  relatedSlugs?: string[];
  /** Posts in the same pillar, used to fill "More in this pillar" */
  pillarPosts?: BlogPostSummary[];
  /** Current post slug — excluded from pillar list */
  currentSlug: string;
  pillar?: Pillar;
}

const PILLAR_LABELS: Record<Pillar, string> = {
  visibility: "Get Found",
  capture: "Answer Every Call",
  attribution: "Know What Works",
  "lead-economics": "Lead Economics",
  trade: "Trade Playbooks",
  agency: "For Agencies",
};

/**
 * Renders two blocks at the bottom of a post:
 * 1. Explicitly linked "Related posts" from frontmatter `relatedPosts`.
 * 2. Auto-generated "More in this pillar" from `pillar` frontmatter tag.
 *
 * Both are cream-paper styled and scale without manual maintenance.
 */
export default function RelatedPosts({
  relatedSlugs = [],
  pillarPosts = [],
  currentSlug,
  pillar,
}: RelatedPostsProps) {
  // Pillar posts excluding current post and anything already in relatedSlugs
  const excludeSlugs = new Set([currentSlug, ...relatedSlugs]);
  const morePillar = pillarPosts
    .filter((p) => !excludeSlugs.has(p.slug))
    .slice(0, 3);

  const hasRelated = relatedSlugs.length > 0;
  const hasMore = morePillar.length > 0;

  if (!hasRelated && !hasMore) return null;

  const pillarLabel = pillar ? PILLAR_LABELS[pillar] : null;

  return (
    <aside
      style={{
        borderTop: "1.5px solid var(--line)",
        marginTop: "3.5rem",
        paddingTop: "2.5rem",
      }}
    >
      {hasRelated && (
        <section style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--spot)",
              marginBottom: "1.25rem",
            }}
          >
            ✦ Related
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {relatedSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  style={{
                    fontFamily: "var(--font-newsreader, Georgia, serif)",
                    fontSize: "1rem",
                    color: "var(--ink)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasMore && pillarLabel && (
        <section>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--spot)",
              marginBottom: "1.25rem",
            }}
          >
            ✦ More in {pillarLabel}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              border: "1.5px solid var(--line)",
            }}
          >
            {morePillar.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "1.1rem 1.25rem",
                    borderBottom: "1px solid var(--line)",
                    transition: "background-color 0.15s",
                  }}
                  className="related-post-hover"
                >
                  <p
                    style={{
                      fontFamily: "var(--font-fraunces, Georgia, serif)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: "0.25rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains-mono, monospace)",
                      fontSize: "0.62rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--ink-faint)",
                    }}
                  >
                    {p.readingTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .related-post-hover:hover {
          background-color: var(--paper-2);
        }
      `}</style>
    </aside>
  );
}
