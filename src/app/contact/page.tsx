'use client';

import { useState } from 'react';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';

export default function ContactPage() {
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
        body: JSON.stringify({ ...formData, source: 'contact' }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message,
        });

        // Reset form
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
        message: 'Unable to submit form. Please try again or email us directly at contact@rhemicai.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="Contact"
        title="Get a visibility and call leak audit."
        description="Talk with Rhemic about search visibility, AI answers, calls, handoffs, source context, and where consult opportunities may be leaking."
        showBackLink={false}
      />

      <div className="relative z-10 py-12 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-panel p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Tell us about your clinic
              </h2>
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
                    placeholder="Jane Smith"
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
                    placeholder="jane@clinic.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                  >
                    Clinic *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all"
                    placeholder="Your med spa"
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
                    <option value="owner">Owner / Founder</option>
                    <option value="operator">Clinic Operator</option>
                    <option value="practice-manager">Practice Manager</option>
                    <option value="marketing">Marketing Lead</option>
                    <option value="multi-location">Multi-location Leader</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all resize-none"
                    placeholder="Tell us about your locations, main treatments, and where consult opportunities may be leaking..."
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
                      : 'text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--pulse)] hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info & CTA */}
            <div className="space-y-8">
              {/* Book an audit CTA */}
              <div className="glass-panel p-8">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Ready to find the leaks?
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Get a visibility and call leak audit to review where your clinic can improve Google visibility, trust, call recovery, and consult routing.
                </p>
                <a
                  href="#" data-cal-link="rhemic-ai/medspa-discovery-call"
                  className="w-full block text-center px-8 py-4 text-base font-semibold text-[var(--bg)] bg-[var(--ink)] rounded-full hover:bg-[var(--pulse)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get a visibility + call leak audit
                </a>
              </div>

              {/* Direct Contact */}
              <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  Email us directly
                </h3>
                <a
                  href="mailto:contact@rhemicai.com"
                  className="text-lg text-[var(--text-primary)] hover:text-[var(--pulse-deep)] transition-colors underline underline-offset-4"
                >
                  contact@rhemicai.com
                </a>
                <p className="text-sm text-[var(--text-muted)] mt-4">
                  We typically respond within 24 hours
                </p>
              </div>

              {/* Address */}
              <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  Headquarters
                </h3>
                <address className="not-italic text-[var(--text-secondary)] leading-relaxed">
                  <p className="font-semibold text-[var(--text-primary)] mb-2">
                    RHEMIC AI LLC
                  </p>
                  <p>Dallas, Texas</p>
                  <p>United States</p>
                </address>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Explore Rhemic
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                href="/#what-we-optimize"
                className="glass-panel group p-6 transition-all hover:border-[var(--border-default)]"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--pulse-deep)] transition-colors">What We Optimize</h3>
                <p className="text-sm text-[var(--text-secondary)]">GBP, Maps, reviews, treatment pages, AI answers, missed calls, and Meta Ads intelligence.</p>
              </Link>
              <Link
                href="/pricing"
                className="glass-panel group p-6 transition-all hover:border-[var(--border-default)]"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--pulse-deep)] transition-colors">Pricing</h3>
                <p className="text-sm text-[var(--text-secondary)]">Basic, Growth, Premium, and Custom plans for finding leaks and routing intent.</p>
              </Link>
              <Link
                href="/about"
                className="glass-panel group p-6 transition-all hover:border-[var(--border-default)]"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--pulse-deep)] transition-colors">About Rhemic AI</h3>
                <p className="text-sm text-[var(--text-secondary)]">Meet the Dallas team building consult opportunity infrastructure for med spas.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
