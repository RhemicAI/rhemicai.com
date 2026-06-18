import Link from 'next/link';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import AuditButton from '@/components/redesign/AuditButton';
import { getAllPosts } from '@/lib/content';

export const dynamic = 'force-static';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh' }}>
      <PaperNav />

      {/* Page header */}
      <header
        style={{
          borderBottom: '1.5px solid var(--line)',
          paddingTop: '6rem',
          paddingBottom: '3rem',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--spot)',
              marginBottom: '1rem',
            }}
          >
            ✦ Field notes
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces, Georgia, serif)',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--ink)',
              maxWidth: '30ch',
              marginBottom: '1.25rem',
            }}
          >
            Visibility, capture, and growth for local service businesses.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-newsreader, Georgia, serif)',
              fontSize: '1.15rem',
              color: 'var(--ink-2)',
              maxWidth: '55ch',
              lineHeight: 1.65,
            }}
          >
            Practical thinking on getting found in AI answers, converting the leads that come
            in, and building a growth system that compounds. No fluff.
          </p>
        </div>
      </header>

      {/* Post list */}
      <section style={{ maxWidth: '72rem', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--ink-3)', fontStyle: 'italic' }}>
            First post coming shortly. Check back soon.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 34rem), 1fr))',
              gap: '1.5px',
              border: '1.5px solid var(--line)',
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <article
                  style={{
                    padding: '2.25rem 2rem',
                    borderBottom: '1.5px solid var(--line)',
                    transition: 'background-color 0.15s',
                  }}
                  className="blog-card-hover"
                >
                  {post.category && (
                    <p
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono, monospace)',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'var(--spot)',
                        marginBottom: '0.65rem',
                      }}
                    >
                      {post.category}
                    </p>
                  )}
                  <h2
                    style={{
                      fontFamily: 'var(--font-fraunces, Georgia, serif)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: 'var(--ink)',
                      marginBottom: '0.65rem',
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-newsreader, Georgia, serif)',
                      fontSize: '0.97rem',
                      color: 'var(--ink-2)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
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
                    <time dateTime={post.publishedAt}>
                      {new Date(`${post.publishedAt}T12:00:00Z`).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
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
                    <span
                      style={{
                        marginLeft: 'auto',
                        color: 'var(--spot)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                      }}
                    >
                      Read &rarr;
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA strip */}
      <section
        className="ink-block"
        style={{ padding: '4rem 1.5rem' }}
      >
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'flex-start',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-fraunces, Georgia, serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 700,
              color: 'var(--paper)',
              lineHeight: 1.2,
              maxWidth: '40ch',
            }}
          >
            Find out where AI ranks your business today.
          </p>
          <AuditButton
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--spot)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: 700,
              padding: '0.9rem 2rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Get a free audit
          </AuditButton>
        </div>
      </section>

      <PaperFooter />

      <style>{`
        .blog-card-hover:hover {
          background-color: var(--paper-2);
        }
      `}</style>
    </main>
  );
}
