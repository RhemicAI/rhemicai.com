import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import ArticleSchema from '@/components/SchemaOrg/ArticleSchema';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

// ---------------------------------------------------------------------------
// Static params — derived from MDX files in src/content/blog/
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const postUrl = absoluteUrl(`/blog/${slug}`);
  const publishedFormatted = new Date(`${post.publishedAt}T12:00:00Z`).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  );

  return (
    <main style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh' }}>
      <ArticleSchema
        title={post.title}
        description={post.description}
        url={postUrl}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt ?? post.publishedAt}
      />

      <PaperNav />

      {/* Article header */}
      <header
        style={{
          borderBottom: '1.5px solid var(--line)',
          paddingTop: '6rem',
          paddingBottom: '2.5rem',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Breadcrumb */}
          <nav
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--ink-faint)',
              marginBottom: '1.5rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <Link href="/blog" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>
              Blog
            </Link>
            {post.category && (
              <>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--spot)' }}>{post.category}</span>
              </>
            )}
          </nav>

          <h1
            style={{
              fontFamily: 'var(--font-fraunces, Georgia, serif)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--ink)',
              maxWidth: '32ch',
              marginBottom: '1.25rem',
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-newsreader, Georgia, serif)',
              fontSize: '1.1rem',
              color: 'var(--ink-2)',
              maxWidth: '58ch',
              lineHeight: 1.65,
              marginBottom: '1.5rem',
            }}
          >
            {post.description}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--ink-faint)',
            }}
          >
            <time dateTime={post.publishedAt}>{publishedFormatted}</time>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                backgroundColor: 'var(--ink-faint)',
                display: 'inline-block',
              }}
            />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Article body */}
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr min(64ch, 100%) 1fr' }}>
          <article
            style={{ gridColumn: 2, padding: '3.5rem 0 5rem' }}
            className="mdx-prose"
          >
            <MDXRemote source={post.content} />
          </article>
        </div>
      </div>

      {/* Back link + CTA */}
      <section style={{ borderTop: '1.5px solid var(--line)', padding: '3rem 1.5rem' }}>
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--ink-3)',
              textDecoration: 'none',
            }}
          >
            &larr; All posts
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--ink)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: 700,
              padding: '0.85rem 1.75rem',
              textDecoration: 'none',
            }}
          >
            Get a free visibility audit
          </Link>
        </div>
      </section>

      <PaperFooter />

      <style>{`
        .mdx-prose h2 {
          font-family: var(--font-fraunces, Georgia, serif);
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--ink);
          margin-top: 2.5rem;
          margin-bottom: 0.85rem;
          line-height: 1.2;
        }
        .mdx-prose h3 {
          font-family: var(--font-fraunces, Georgia, serif);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ink);
          margin-top: 2rem;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }
        .mdx-prose p {
          font-family: var(--font-newsreader, Georgia, serif);
          font-size: 1.05rem;
          color: var(--ink-2);
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .mdx-prose a {
          color: var(--spot);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .mdx-prose a:hover {
          color: var(--spot-deep);
        }
        .mdx-prose strong {
          color: var(--ink);
          font-weight: 700;
        }
        .mdx-prose ul,
        .mdx-prose ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .mdx-prose li {
          font-family: var(--font-newsreader, Georgia, serif);
          font-size: 1.05rem;
          color: var(--ink-2);
          line-height: 1.7;
          margin-bottom: 0.4rem;
        }
        .mdx-prose blockquote {
          border-left: 3px solid var(--spot);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: var(--ink-2);
          font-style: italic;
        }
        .mdx-prose hr {
          border: none;
          border-top: 1.5px solid var(--line);
          margin: 2.5rem 0;
        }
        .mdx-prose code {
          font-family: var(--font-jetbrains-mono, monospace);
          font-size: 0.88em;
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 0.1em 0.4em;
        }
      `}</style>
    </main>
  );
}
