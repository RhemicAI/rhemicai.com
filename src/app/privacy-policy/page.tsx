import type { Metadata } from "next";
import Link from "next/link";
import FixedNav from "@/components/FixedNav/FixedNav";
import Footer from "@/components/Footer/Footer";
import SummaryModal from "@/components/SummaryModal/SummaryModal";

const privacySummary = `Rhemic AI LLC collects personal, business, and technical data to deliver AI Engine Optimization (AEO) and digital marketing services.

Key Points:
- We collect names, emails, company info, billing details, website analytics, and technical data like IP addresses and cookies.
- We do NOT sell your personal information.
- Client data is never used to train public AI models. Internal improvements use only anonymized, aggregated data.
- Data is shared only with necessary service providers (cloud hosting, payment processors, advertising platforms) under appropriate safeguards.
- International transfers are protected by Standard Contractual Clauses.
- GDPR (EEA/UK) and CCPA/CPRA (California) rights are fully supported — including access, deletion, correction, and data portability.
- We do not collect data from individuals under 18.
- Data is retained only as long as needed for contractual and legal obligations.
- In a data breach, we notify affected parties and regulators as required by law.

Contact: contact@rhemicai.com | RHEMIC AI LLC, Dallas, Texas`;

export const metadata: Metadata = {
  title: "Privacy Policy | Rhemic AI",
  description:
    "Privacy Policy for RHEMIC AI LLC. Learn how we collect, use, disclose, process, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative z-10 min-h-screen bg-[var(--bg-base)]">
      <FixedNav />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-12"
        >
          &larr; Back to Home
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-[var(--text-tertiary)]">
            RHEMIC AI LLC
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Effective Date: February 13th, 2026
          </p>
          <div className="mt-6">
            <SummaryModal summary={privacySummary} />
          </div>
        </header>

        <div className="space-y-12 text-[var(--text-secondary)] leading-relaxed">
          <p>
            RHEMIC AI LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and handling personal data in a transparent and secure manner. This Privacy Policy explains how we collect, use, disclose, process, and protect information when you visit our website, use our services, or otherwise interact with us.
          </p>
          <p>
            By accessing our website or engaging our services, you agree to the terms of this Privacy Policy.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              1. Scope of This Policy
            </h2>
            <p className="mb-4">This Policy applies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Visitors to our website</li>
              <li>Prospective clients</li>
              <li>Clients and their representatives</li>
              <li>Contractors and service providers</li>
              <li>Individuals whose information we process in connection with providing services</li>
            </ul>
            <p className="mt-4">
              This Policy does not apply to third-party platforms or services that we do not control.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              2. Categories of Information We Collect
            </h2>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 mt-6">
              A. Personal Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Job title</li>
              <li>Billing and payment information</li>
              <li>Mailing address</li>
              <li>Account login credentials (if applicable)</li>
            </ul>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 mt-6">
              B. Business and Marketing Data
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Website URLs</li>
              <li>Advertising account data</li>
              <li>Analytics and campaign performance metrics</li>
              <li>Lead and conversion data</li>
              <li>Publicly available brand information</li>
              <li>CRM and pipeline data provided by clients</li>
            </ul>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 mt-6">
              C. Technical and Usage Data
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Device type and operating system</li>
              <li>Browser type</li>
              <li>Referring URLs</li>
              <li>Website interaction data</li>
              <li>Cookies and tracking technologies</li>
              <li>Log data and timestamps</li>
            </ul>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 mt-6">
              D. Sensitive Data
            </h3>
            <p>
              We do not intentionally collect sensitive personal data (such as health, biometric, or government identification data) unless explicitly required for lawful business purposes and agreed upon in writing.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              3. Legal Bases for Processing (GDPR)
            </h2>
            <p className="mb-4">
              If you are located in the European Economic Area (EEA), United Kingdom, or similar jurisdictions, we process personal data under the following lawful bases:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Performance of a contract</li>
              <li>Legitimate business interests</li>
              <li>Compliance with legal obligations</li>
              <li>Consent (where required)</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              4. How We Use Information
            </h2>
            <p className="mb-4">We use personal data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide AI Engine Optimization (AEO) services</li>
              <li>Deliver digital marketing and advertising services</li>
              <li>Optimize AI search visibility strategies</li>
              <li>Communicate with clients and prospects</li>
              <li>Process payments and invoices</li>
              <li>Improve services and website functionality</li>
              <li>Conduct analytics and performance reporting</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Prevent fraud and maintain security</li>
            </ul>
            <p className="mt-4 font-semibold text-[var(--text-primary)]">
              We do not sell personal information.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              5. AI and Data Processing Practices
            </h2>
            <p className="mb-4">In providing AEO and AI-related services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We may analyze publicly available information for optimization purposes.</li>
              <li>Client-provided data is processed strictly to deliver contracted services.</li>
              <li>We do not use confidential client data to train public AI models.</li>
              <li>Proprietary client data remains the property of the client.</li>
              <li>Any internal model improvements rely on anonymized and aggregated data only.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              6. Data Sharing and Disclosure
            </h2>
            <p className="mb-4">We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cloud hosting providers</li>
              <li>Payment processors</li>
              <li>Advertising platforms (e.g., Google, Meta)</li>
              <li>Analytics and CRM providers</li>
              <li>Professional advisors (legal, accounting)</li>
              <li>Contractors bound by confidentiality obligations</li>
            </ul>
            <p className="mt-4">
              We only share data as necessary and require service providers to implement appropriate safeguards.
            </p>
            <p className="mt-4">
              We may disclose information if required by law, court order, or regulatory authority.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              7. International Data Transfers
            </h2>
            <p className="mb-4">
              If personal data is transferred outside of your jurisdiction, including outside the EEA or UK, we implement appropriate safeguards such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Contractual data protection agreements</li>
              <li>Other lawful transfer mechanisms</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              8. Data Security
            </h2>
            <p className="mb-4">
              We implement reasonable administrative, technical, and organizational safeguards including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Access controls and role-based permissions</li>
              <li>Secure cloud storage providers</li>
              <li>Confidentiality agreements</li>
            </ul>
            <p className="mt-4">No system can guarantee absolute security.</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              9. Data Retention
            </h2>
            <p className="mb-4">
              We retain data only as long as necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fulfill contractual obligations</li>
              <li>Comply with legal requirements</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p className="mt-4">
              Retention periods vary based on data type and legal requirements.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              10. Your Privacy Rights
            </h2>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 mt-6">
              A. GDPR Rights (EEA/UK Residents)
            </h3>
            <p className="mb-4">You may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-4">
              You may lodge a complaint with your local data protection authority.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 mt-6">
              B. CCPA/CPRA Rights (California Residents)
            </h3>
            <p className="mb-4">You may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Know what personal information we collect</li>
              <li>Request deletion of personal information</li>
              <li>Request correction</li>
              <li>Opt out of sale or sharing (we do not sell data)</li>
              <li>Non-discrimination for exercising rights</li>
            </ul>

            <p className="mt-6">
              To exercise rights, email:{" "}
              <a
                href="mailto:contact@rhemicai.com"
                className="text-[var(--text-primary)] underline hover:text-white transition-colors"
              >
                contact@rhemicai.com
              </a>
            </p>
            <p className="mt-2">
              We may verify your identity before processing requests.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              11. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">
              We use cookies and similar technologies for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Website functionality</li>
              <li>Analytics and performance tracking</li>
              <li>Advertising measurement</li>
            </ul>
            <p className="mt-4">
              Users may manage cookie preferences through browser settings or consent banners.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              12. Do Not Track Signals
            </h2>
            <p>
              Our website does not currently respond to &quot;Do Not Track&quot; browser signals.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              13. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from minors.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              14. Data Processing Addendum (DPA)
            </h2>
            <p className="mb-4">
              Where required, we enter into Data Processing Agreements with clients outlining:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Roles of controller and processor</li>
              <li>Security measures</li>
              <li>Subprocessor disclosures</li>
              <li>Data breach notification procedures</li>
              <li>Data subject rights assistance</li>
            </ul>
            <p className="mt-4">
              Clients may request a formal DPA for enterprise engagements.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              15. Data Breach Notification
            </h2>
            <p>
              In the event of a data breach affecting personal information, we will notify affected parties and regulators as required by applicable law.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              16. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted with a revised Effective Date.
            </p>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              17. Contact Information
            </h2>
            <address className="not-italic space-y-1">
              <p className="font-semibold text-[var(--text-primary)]">RHEMIC AI LLC</p>
              <p>Dallas, Texas</p>
              <p>
                <a
                  href="mailto:contact@rhemicai.com"
                  className="text-[var(--text-primary)] underline hover:text-white transition-colors"
                >
                  contact@rhemicai.com
                </a>
              </p>
            </address>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
