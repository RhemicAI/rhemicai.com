import type { Metadata } from "next";
import Link from "next/link";
import FixedNav from "@/components/FixedNav/FixedNav";
import Footer from "@/components/Footer/Footer";
import SummaryModal from "@/components/SummaryModal/SummaryModal";

const tosSummary = `Rhemic AI LLC provides AI Engine Optimization (AEO), generative AI search consulting, digital marketing, and analytics services. Specific deliverables and fees are defined in separate agreements.

Key Points:
- No guaranteed results — AI search rankings depend on third-party platforms and algorithms outside our control.
- Clients must provide accurate information, comply with platform rules, and approve all published materials.
- Rhemic AI retains ownership of all proprietary tools, methodologies, and frameworks. Clients retain ownership of their brand assets and data.
- Both parties maintain confidentiality of non-public information, surviving termination.
- Fees are defined in separate agreements. Late payments may result in service suspension. Fees are generally non-refundable.
- Either party may terminate per the governing agreement. Rhemic AI may terminate immediately for non-payment, fraud, or material breach.
- Services are provided "as is" with no warranties. Liability is capped at fees paid in the preceding 3 months.
- Clients indemnify Rhemic AI against claims from client-provided materials, legal violations, or IP infringement.
- Governed by Texas law. Disputes resolved in Texas courts, with optional binding arbitration.

Contact: contact@rhemicai.com | RHEMIC AI LLC, Dallas, Texas`;

export const metadata: Metadata = {
  title: "Terms of Service | Rhemic AI",
  description:
    "Terms of Service for RHEMIC AI LLC. Read our terms governing access to and use of our AI Engine Optimization and digital marketing services.",
};

export default function TermsOfService() {
  return (
    <main className="relative z-10 min-h-screen bg-[var(--bg-base)]">
      <FixedNav />
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>

        <header className="mb-16">
          <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            Terms of Service
          </h1>
          <p className="text-lg text-[var(--text-tertiary)]">
            RHEMIC AI LLC
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Effective Date: February 13th, 2026
          </p>
          <div className="mt-6">
            <SummaryModal summary={tosSummary} />
          </div>
        </header>

        <div className="space-y-12 text-[var(--text-secondary)] leading-relaxed">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern access to and use of
            services provided by RHEMIC AI LLC (&ldquo;Company,&rdquo;
            &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By
            accessing our website or engaging our services, you agree to be bound
            by these Terms.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              1. Services Overview
            </h2>
            <p className="mb-4">
              RHEMIC AI LLC provides professional services including, but not
              limited to:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>AI Engine Optimization (AEO)</li>
              <li>Generative AI search visibility consulting</li>
              <li>Digital marketing and advertising management</li>
              <li>AI consulting and automation strategy</li>
              <li>Analytics and performance optimization</li>
            </ul>
            <p>
              Specific services, deliverables, fees, and timelines will be
              defined in a separate written agreement, proposal, or Statement of
              Work (SOW).
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              2. No Guarantee of Results
            </h2>
            <p className="mb-4">
              Due to the evolving and third-party-controlled nature of AI
              systems, search engines, and digital advertising platforms:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                We do not guarantee specific rankings, citations, traffic, or
                revenue outcomes.
              </li>
              <li>
                AI-generated responses are controlled by independent platforms.
              </li>
              <li>
                Algorithm or platform policy changes may impact performance.
              </li>
            </ul>
            <p>
              Clients acknowledge that performance outcomes are influenced by
              external factors beyond our control.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              3. Client Responsibilities
            </h2>
            <p className="mb-4">Clients agree to:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>Provide accurate, complete, and timely information</li>
              <li>Maintain lawful use of services</li>
              <li>
                Comply with advertising platform rules and applicable laws
              </li>
              <li>
                Secure necessary rights to all materials provided to us
              </li>
              <li>
                Review and approve deliverables in a timely manner
              </li>
            </ul>
            <p>
              Clients remain responsible for final approval and compliance of
              all published materials.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              4. Intellectual Property Rights
            </h2>

            <h3 className="mb-3 mt-6 text-xl font-bold text-[var(--text-primary)]">
              A. Company Intellectual Property
            </h3>
            <p className="mb-4">
              All proprietary tools, methodologies, prompts, frameworks,
              workflows, software, and optimization systems developed by RHEMIC
              AI LLC remain our exclusive property unless otherwise agreed in
              writing.
            </p>
            <p>
              No license is granted except as necessary for the client to use
              deliverables for their internal business purposes.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-bold text-[var(--text-primary)]">
              B. Client Intellectual Property
            </h3>
            <p>
              Clients retain ownership of their brand assets, content, and
              proprietary data provided to us.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              5. Confidentiality
            </h2>
            <p>
              Each party agrees to maintain confidentiality of non-public,
              proprietary, or confidential information disclosed during the
              course of engagement. Confidentiality obligations survive
              termination.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              6. Data Protection and Privacy
            </h2>
            <p className="mb-4">
              Both parties agree to comply with applicable data protection laws
              including, where applicable, GDPR and CCPA/CPRA.
            </p>
            <p>
              Where required, the parties will execute a Data Processing
              Agreement (DPA) outlining controller/processor roles and security
              obligations.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              7. Fees and Payment Terms
            </h2>
            <p className="mb-4">
              Fees are defined in separate service agreements or proposals.
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                Payments are due as specified in invoices or agreements.
              </li>
              <li>
                Late payments may incur interest or service suspension.
              </li>
              <li>
                We reserve the right to pause services for non-payment.
              </li>
            </ul>
            <p>Unless otherwise stated, fees are non-refundable.</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              8. Term and Termination
            </h2>
            <p className="mb-4">
              Either party may terminate services according to the governing
              agreement.
            </p>
            <p className="mb-4">
              We may suspend or terminate services immediately for:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>Non-payment</li>
              <li>Illegal or fraudulent activity</li>
              <li>Material breach of agreement</li>
              <li>Conduct that poses legal or reputational risk</li>
            </ul>
            <p>Upon termination, outstanding fees remain payable.</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              9. Warranties Disclaimer
            </h2>
            <p className="mb-4">
              Services are provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis.
            </p>
            <p className="mb-4">
              We disclaim all warranties, express or implied, including:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              10. Limitation of Liability
            </h2>
            <p className="mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                We are not liable for indirect, incidental, consequential,
                special, or punitive damages.
              </li>
              <li>
                Total liability shall not exceed the total amount paid by the
                client in the preceding three (3) months.
              </li>
            </ul>
            <p>This limitation applies regardless of legal theory.</p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              11. Indemnification
            </h2>
            <p className="mb-4">
              Client agrees to indemnify and hold harmless RHEMIC AI LLC, its
              officers, members, employees, and contractors from claims arising
              from:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Client-provided materials</li>
              <li>Violation of laws or regulations</li>
              <li>Intellectual property infringement</li>
              <li>Misuse of services</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              12. Third-Party Platforms
            </h2>
            <p>
              Our services may involve third-party platforms such as Google,
              Meta, or AI systems. We are not responsible for actions, policies,
              outages, or decisions of third-party platforms.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              13. Force Majeure
            </h2>
            <p>
              We are not liable for failure to perform due to causes beyond
              reasonable control, including natural disasters, internet outages,
              government actions, or platform disruptions.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              14. Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4">
              These Terms are governed by the laws of the State of Texas.
            </p>
            <p>
              Any disputes shall be resolved exclusively in state or federal
              courts located in Texas.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              15. Arbitration (Optional Clause)
            </h2>
            <p>
              At our discretion, disputes may be resolved through binding
              arbitration in Texas under applicable arbitration rules.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              16. Assignment
            </h2>
            <p>
              Clients may not assign rights or obligations without prior written
              consent. We may assign these Terms in connection with a merger,
              acquisition, or restructuring.
            </p>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              17. Severability
            </h2>
            <p>
              If any provision is held unenforceable, the remaining provisions
              remain in effect.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              18. Entire Agreement
            </h2>
            <p>
              These Terms, together with any service agreements or SOWs,
              constitute the entire agreement between the parties.
            </p>
          </section>

          {/* Section 19 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              19. Modifications
            </h2>
            <p>
              We may update these Terms at any time. Continued use of services
              after updates constitutes acceptance of revised Terms.
            </p>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              20. Contact Information
            </h2>
            <address className="not-italic">
              <p>RHEMIC AI LLC</p>
              <p>Dallas, Texas</p>
              <p>
                <a
                  href="mailto:contact@rhemicai.com"
                  className="text-[var(--text-primary)] underline underline-offset-4 transition-colors hover:text-white"
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
