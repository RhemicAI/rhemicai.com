'use client';

import ScrollCanvas from '../ScrollCanvas/ScrollCanvas';
import HeroOverlay from '../HeroOverlay/HeroOverlay';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.heroSection}>
            <ScrollCanvas>
                <HeroOverlay />
            </ScrollCanvas>

            {/* Post-hero content that scrolls naturally after the sticky section */}
            <section className={styles.postHero}>
                <div className={styles.postHeroInner}>
                    <span className={styles.postHeroTag}>Why Rhemic AI</span>
                    <h2 className={styles.postHeroTitle}>
                        Intelligent visibility for the next generation of search
                    </h2>
                    <p className={styles.postHeroDesc}>
                        AI answer engines are reshaping how customers discover brands.
                        Rhemic AI gives you the infrastructure to stay visible, relevant,
                        and ahead of the curve.
                    </p>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🔍</div>
                            <h3 className={styles.featureTitle}>Website Auditing</h3>
                            <p className={styles.featureDesc}>
                                Ensure your site is technically optimized for AI discovery
                                with enterprise-grade audits.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📊</div>
                            <h3 className={styles.featureTitle}>Competitor Analysis</h3>
                            <p className={styles.featureDesc}>
                                Decode rival strategies and outrank them in AI-generated
                                responses and answer engines.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🚀</div>
                            <h3 className={styles.featureTitle}>SEO Recommendations</h3>
                            <p className={styles.featureDesc}>
                                Prioritized, actionable steps to dominate search rankings
                                and AI algorithms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
