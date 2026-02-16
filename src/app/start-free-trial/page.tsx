'use client';

import { useState } from 'react';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import Script from 'next/script';
import RelatedLinks from '@/components/shared/RelatedLinks';

export default function StartFreeTrialPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, source: 'waitlist' }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message:
            "You're on the list! We'll reach out within 24 hours to discuss your custom trial.",
        });

        setFormData({
          name: '',
          email: '',
          company: '',
          role: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to submit form. Please try again.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message:
          'Unable to submit form. Please try again or email us directly at contact@rhemicai.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <Script
        id="start-free-trial-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How long is my free trial?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "You get 14 days by default, but your trial duration can be customized based on your needs and the complexity of your website. It's about giving you enough time to see real results.",
              },
            },
            {
              '@type': 'Question',
              name: 'Do I need a credit card to start?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "You may need to provide a card for verification purposes, but you won't be charged during your trial. You're only billed if you decide to continue after the trial ends.",
              },
            },
            {
              '@type': 'Question',
              name: 'What happens after my trial?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "If you love the results, you'll get a custom pricing plan based on your goals and scale. No pressure — you can cancel anytime. You're in control.",
              },
            },
            {
              '@type': 'Question',
              name: 'Is my business a good fit for this?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "If you have an existing website and want to improve visibility in AI-generated search results, you're likely a good fit. This works especially well for B2B, SaaS, local businesses, and content publishers.",
              },
            },
          ],
        })}
      </Script>
      <FixedNav />

      <PageHero
        subtitle="Start Free Trial"
        title="Your business deserves better visibility."
        description="Get a trial built specifically for your challenges. Book a quick call to get started."
        showBackLink={false}
      />

      {/* Early Access Form */}
      <div className="relative z-10 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 text-center">
              Get early access
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 text-center max-w-xl mx-auto leading-relaxed">
              We&apos;re onboarding a limited number of businesses for our beta.
              Tell us about yours — if it&apos;s a fit, you&apos;ll be first in
              line.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all"
                  placeholder="john@company.com"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all"
                  placeholder="Acme Corp"
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all"
                >
                  <option value="">Select your role</option>
                  <option value="founder">Founder / CEO</option>
                  <option value="marketing">Marketing Leader</option>
                  <option value="product">Product Manager</option>
                  <option value="engineering">Engineering / Technical</option>
                  <option value="sales">Sales / Business Development</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Goals (Message) */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  Your Goals *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all resize-none"
                  placeholder="What are your biggest visibility challenges right now?"
                />
              </div>

              {/* Success/Error Messages */}
              {submitStatus.type === 'success' && (
                <div
                  className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
                  role="alert"
                >
                  <p className="text-green-400 text-sm font-medium">
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {submitStatus.type === 'error' && (
                <div
                  className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
                  role="alert"
                >
                  <p className="text-red-400 text-sm font-medium">
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Request Early Access'}
              </button>

              <p className="text-xs text-[var(--text-muted)] text-center">
                Limited spots · No credit card required
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Main CTA Box */}
          <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--text-primary)]"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Your visibility challenges are unique
            </h2>

            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
              You deserve a platform that actually fits your business. Your
              trial is customized based on your industry, your current
              visibility, and your optimization goals. Book a 15-minute call to
              get everything set up exactly how you need it.
            </p>

            <a
              href="https://cal.com/rhemic-ai/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 text-lg font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
            >
              Book Discovery Call
            </a>

            <p className="text-xs text-[var(--text-muted)] mt-6">
              5-minute setup · Cancel anytime
            </p>
          </div>

          {/* What You'll Get */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 text-center">
              What&apos;s included in your free trial
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Custom Website Audit',
                  description:
                    'Full analysis of your site optimized for AI discovery with actionable recommendations.',
                },
                {
                  title: 'Competitor Benchmarking',
                  description:
                    'See where you stand against competitors in AI-generated search results.',
                },
                {
                  title: 'AEO Score Baseline',
                  description:
                    'Understand your current visibility and track improvements over time.',
                },
                {
                  title: 'Strategy Session',
                  description:
                    'Work with our team to create a custom optimization roadmap for your business.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] hover:border-[var(--border-default)] transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="shrink-0 mt-0.5"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-[var(--text-tertiary)]"
                    />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--text-primary)]"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Your Trial is Personalized */}
          <section className="mb-16">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Why your trial is personalized
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  You&apos;re serious about AI search optimization. That&apos;s
                  why your trial needs to be built around your specific
                  challenges. During the discovery call, you&apos;ll get clarity
                  on:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your current website and visibility challenges</li>
                  <li>
                    Industry-specific optimization opportunities for your
                    business
                  </li>
                  <li>
                    Whether AI Engine Optimization makes sense for your goals
                  </li>
                  <li>How you&apos;ll measure success and track ROI</li>
                </ul>
                <p>
                  This ensures you get maximum value from the trial — you only
                  invest time where you know you&apos;ll see results.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 text-center">
              Common questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: 'How long is my free trial?',
                  answer:
                    "You get 14 days by default, but your trial duration can be customized based on your needs and the complexity of your website. It's about giving you enough time to see real results.",
                },
                {
                  question: 'Do I need a credit card to start?',
                  answer:
                    "You may need to provide a card for verification purposes, but you won't be charged during your trial. You're only billed if you decide to continue after the trial ends.",
                },
                {
                  question: 'What happens after my trial?',
                  answer:
                    "If you love the results, you'll get a custom pricing plan based on your goals and scale. No pressure — you can cancel anytime. You're in control.",
                },
                {
                  question: 'Is my business a good fit for this?',
                  answer:
                    "If you have an existing website and want to improve visibility in AI-generated search results, you're likely a good fit. This works especially well for B2B, SaaS, local businesses, and content publishers.",
                },
              ].map((faq) => (
                <details
                  key={faq.question}
                  className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-colors group"
                >
                  <summary className="font-semibold text-[var(--text-primary)] cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 group-open:rotate-180 transition-transform"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <a
              href="https://cal.com/rhemic-ai/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 text-lg font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
            >
              Book Discovery Call
            </a>
            <p className="text-sm text-[var(--text-muted)] mt-4">
              Takes 15 minutes · Get results in 48 hours
            </p>
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="Explore more"
        links={[
          {
            title: 'Our Products',
            description:
              'Website auditing, competitor analysis, and code generation tools.',
            href: '/products',
          },
          {
            title: 'Custom Pricing',
            description:
              'Flexible plans tailored to your business needs and scale.',
            href: '/pricing',
          },
          {
            title: 'About Rhemic AI',
            description:
              'Meet the team building AI Engine Optimization infrastructure.',
            href: '/about',
          },
        ]}
      />

      <Footer />
    </main>
  );
}
