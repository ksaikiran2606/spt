import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SPT Solutions",
  description: "Terms of service for using SPT Solutions website and AI services.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">
          Terms of Service
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-[var(--foreground)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              By accessing or using the SPT Solutions website (sptsolutions.com) and any related services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              2. Use of the Website and Services
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Our website provides information about our AI services (e.g., AI chatbots, automation, custom AI development), contact and booking forms, a recommendation flow, and an AI-powered chat assistant. You agree to use these only for lawful purposes and in accordance with these terms. You may not attempt to gain unauthorized access to our systems, misuse the chat or forms, or use our services in any way that could harm SPT Solutions or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              3. AI and Content
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Our chat and recommendation features use AI to generate responses. Such content is for general information only and does not constitute professional or legal advice. We do not guarantee the accuracy or completeness of AI-generated content. For formal proposals, pricing, or contracts, please contact us directly at{" "}
              <a href="mailto:hello@sptsolutions.com" className="text-[var(--primary)] hover:underline">
                hello@sptsolutions.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              4. Bookings and Contact
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Submitting a contact form or booking a demo does not create a binding agreement until we confirm in writing. We will use the contact details you provide to respond and, where applicable, send confirmations and calendar invites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              5. Intellectual Property
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              All content on this website (text, graphics, logos, images) is the property of SPT Solutions or its licensors and is protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              6. Limitation of Liability
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              To the fullest extent permitted by law, SPT Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              7. Changes and Contact
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              We may update these Terms of Service at any time. The &quot;Last updated&quot; date at the top reflects the latest version. Continued use of the site after changes constitutes acceptance. For questions about these terms, contact us at{" "}
              <a href="mailto:hello@sptsolutions.com" className="text-[var(--primary)] hover:underline">
                hello@sptsolutions.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
