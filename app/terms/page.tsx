import type { Metadata } from "next";
import { SectionContainer } from "@/components/SectionContainer";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-900">
            <strong>Draft terms.</strong> This document is provided for
            pre-launch purposes only and requires review by qualified legal
            counsel before the platform launches.
          </div>

          <h1 className="text-4xl font-bold text-neutral-900">Terms of Service</h1>
          <p className="mt-4 text-sm text-neutral-500">
            Last updated: [DATE — TO BE CONFIRMED UPON LEGAL REVIEW]
          </p>

          <div className="prose-neutral mt-10 space-y-8 text-neutral-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                1. Acceptance of terms
              </h2>
              <p className="mt-3">
                By accessing or using the Faceless Marketplace website at
                facelessmarketplace.co.za (the &quot;Site&quot;) or, upon launch,
                our marketplace platform (the &quot;Platform&quot;), you agree to be
                bound by these Terms of Service (&quot;Terms&quot;). If you do not
                agree, do not use the Site or Platform.
              </p>
              <p className="mt-3">
                [REGISTERED ENTITY NAME AND REGISTRATION NUMBER — TO BE INSERTED
                UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                2. Description of service
              </h2>
              <p className="mt-3">
                Faceless Marketplace provides an online marketplace and payment
                intermediary service that facilitates transactions between buyers
                and sellers. Faceless holds funds securely until transaction
                conditions are met, as described on the Site. The Platform is
                currently in pre-launch; features described may change before
                general availability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">3. Eligibility</h2>
              <p className="mt-3">
                You must be at least 18 years old and capable of entering into a
                binding contract to use the Platform. [ADDITIONAL ELIGIBILITY
                REQUIREMENTS TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                4. User accounts and responsibilities
              </h2>
              <p className="mt-3">When using the Platform, you agree to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Provide accurate and complete information</li>
                <li>Keep your account credentials secure</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use the Platform for fraudulent or illegal activity</li>
                <li>
                  Not list prohibited items [PROHIBITED ITEMS LIST TO BE INSERTED
                  UPON LEGAL REVIEW]
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                5. Transactions and payment handling
              </h2>
              <p className="mt-3">
                Faceless acts as an intermediary in transactions between buyers
                and sellers. Payment is held by Faceless until the buyer confirms
                receipt of the item or the dispute resolution process is
                completed. [DETAILED PAYMENT FLOW AND ESCROW TERMS TO BE INSERTED
                UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">6. Fees</h2>
              <p className="mt-3">
                Applicable fees for buyers and sellers will be published before
                or at launch. By completing a transaction on the Platform, you
                agree to pay any fees disclosed at the time of the transaction.
                [FEE SCHEDULE TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                7. Disputes between users
              </h2>
              <p className="mt-3">
                Faceless provides a dispute resolution process to help resolve
                issues between buyers and sellers. Our decisions in dispute
                matters are made in accordance with our policies. [DISPUTE
                RESOLUTION PROCEDURE TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                8. Limitation of liability
              </h2>
              <p className="mt-3">
                To the fullest extent permitted by applicable law, Faceless
                Marketplace and its directors, employees, and affiliates shall not
                be liable for any indirect, incidental, special, or consequential
                damages arising from your use of the Site or Platform. [FULL
                LIABILITY CLAUSE TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">9. Indemnification</h2>
              <p className="mt-3">
                You agree to indemnify and hold harmless Faceless Marketplace from
                any claims, damages, or expenses arising from your use of the
                Platform or violation of these Terms. [FULL INDEMNIFICATION CLAUSE
                TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                10. Intellectual property
              </h2>
              <p className="mt-3">
                All content, branding, and materials on the Site are owned by or
                licensed to Faceless Marketplace. You may not reproduce or use
                our intellectual property without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                11. Termination
              </h2>
              <p className="mt-3">
                We may suspend or terminate your access to the Platform at our
                discretion if you violate these Terms or engage in conduct harmful
                to other users or the Platform. [TERMINATION PROCEDURE TO BE
                INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                12. Governing law
              </h2>
              <p className="mt-3">
                These Terms are governed by the laws of the Republic of South
                Africa. [JURISDICTION AND DISPUTE RESOLUTION VENUE TO BE INSERTED
                UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                13. Changes to these terms
              </h2>
              <p className="mt-3">
                We may update these Terms from time to time. Continued use of the
                Site or Platform after changes are posted constitutes acceptance
                of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">14. Contact us</h2>
              <p className="mt-3">
                Questions about these Terms? Contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#3F2B96] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
