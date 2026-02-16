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
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="Contact"
        title="Let's talk about your visibility."
        description="Book a demo, ask a question, or just say hello. We're here to help."
        showBackLink={false}
      />

      <div className="relative z-10 py-12 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Send us a message
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
                    placeholder="Tell us about your business and what you're looking to achieve..."
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info & CTA */}
            <div className="space-y-8">
              {/* Book a Demo CTA */}
              <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Ready to see it in action?
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Book a 15-minute demo and see how Rhemic AI can transform your
                  visibility in AI-generated search results.
                </p>
                <a
                  href="https://cal.com/rhemic-ai/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Book a Demo
                </a>
              </div>

              {/* Direct Contact */}
              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  Email us directly
                </h3>
                <a
                  href="mailto:contact@rhemicai.com"
                  className="text-lg text-[var(--text-primary)] hover:text-white transition-colors underline underline-offset-4"
                >
                  contact@rhemicai.com
                </a>
                <p className="text-sm text-[var(--text-muted)] mt-4">
                  We typically respond within 24 hours
                </p>
              </div>

              {/* Address */}
              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8">
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
              Explore our platform
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                href="/products"
                className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-all"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">Our Products</h3>
                <p className="text-sm text-[var(--text-secondary)]">Website auditing, competitor analysis, and code generation tools for AI search.</p>
              </Link>
              <Link
                href="/pricing"
                className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-all"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">Custom Pricing</h3>
                <p className="text-sm text-[var(--text-secondary)]">Flexible plans tailored to your business needs and goals.</p>
              </Link>
              <Link
                href="/about"
                className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-all"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">About Rhemic AI</h3>
                <p className="text-sm text-[var(--text-secondary)]">Meet the team building AI Engine Optimization infrastructure.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
