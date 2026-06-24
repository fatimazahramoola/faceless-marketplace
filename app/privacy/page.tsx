import { SectionContainer } from "@/components/SectionContainer";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Faceless Marketplace. Learn how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-900">
            <strong>Draft policy.</strong> This document is provided for
            pre-launch purposes only and requires review by qualified legal
            counsel before the platform launches.
          </div>

          <h1 className="text-4xl font-bold text-neutral-900">Privacy Policy</h1>
          <p className="mt-4 text-sm text-neutral-500">
            Last updated: [DATE — TO BE CONFIRMED UPON LEGAL REVIEW]
          </p>

          <div className="prose-neutral mt-10 space-y-8 text-neutral-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-neutral-900">1. Introduction</h2>
              <p className="mt-3">
                Faceless Marketplace (&quot;Faceless&quot;, &quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) operates the website facelessmarketplace.co.za (the
                &quot;Site&quot;). This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our Site
                or join our waitlist.
              </p>
              <p className="mt-3">
                [REGISTERED ENTITY NAME AND REGISTRATION NUMBER — TO BE INSERTED
                UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                2. Information we collect
              </h2>
              <p className="mt-3">We may collect the following types of information:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-neutral-900">Contact information</strong>{" "}
                  — such as your name and email address when you join our waitlist
                  or contact us
                </li>
                <li>
                  <strong className="text-neutral-900">Usage data</strong> — such
                  as pages visited, browser type, and device information
                </li>
                <li>
                  <strong className="text-neutral-900">Transaction data</strong>{" "}
                  — when the platform launches, information related to buying and
                  selling activities [DETAILS TO BE CONFIRMED UPON LEGAL REVIEW]
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                3. How we use your information
              </h2>
              <p className="mt-3">We use collected information to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Operate and improve the Site and our services</li>
                <li>Communicate with you about launch updates and platform news</li>
                <li>Process transactions and facilitate marketplace activity [UPON LAUNCH]</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and maintain platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                4. Legal basis for processing
              </h2>
              <p className="mt-3">
                [TO BE CONFIRMED UPON LEGAL REVIEW — including reference to
                applicable South African legislation such as POPIA (Protection of
                Personal Information Act, 2013) and the legal bases under which
                personal information is processed.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                5. Sharing your information
              </h2>
              <p className="mt-3">
                We do not sell your personal information. We may share information
                with:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Service providers who assist in operating the Site [LIST TO BE
                  INSERTED UPON LEGAL REVIEW]
                </li>
                <li>Payment processors [UPON LAUNCH — TO BE CONFIRMED]</li>
                <li>Law enforcement or regulators when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                6. Data retention
              </h2>
              <p className="mt-3">
                We retain personal information only for as long as necessary to
                fulfil the purposes described in this policy, unless a longer
                retention period is required by law. [SPECIFIC RETENTION PERIODS
                TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">7. Cookies</h2>
              <p className="mt-3">
                We may use cookies and similar technologies to analyse Site
                traffic and improve user experience. [COOKIE POLICY DETAILS AND
                CONSENT MECHANISM TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">8. Your rights</h2>
              <p className="mt-3">
                Depending on applicable law, you may have rights to access,
                correct, delete, or restrict processing of your personal
                information, and to object to certain processing. [FULL RIGHTS
                DESCRIPTION UNDER POPIA TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">9. Security</h2>
              <p className="mt-3">
                We implement reasonable technical and organisational measures to
                protect your information. No method of transmission over the
                internet is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                10. Changes to this policy
              </h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. We will
                notify you of material changes by posting the updated policy on
                this page with a revised &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">11. Contact us</h2>
              <p className="mt-3">
                For privacy-related questions or to exercise your rights, contact
                us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#3F2B96] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                . [INFORMATION OFFICER DETAILS TO BE INSERTED UPON LEGAL REVIEW]
              </p>
            </section>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
