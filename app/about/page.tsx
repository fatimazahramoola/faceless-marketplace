import { SectionContainer } from "@/components/SectionContainer";
import { WaitlistButton } from "@/components/WaitlistButton";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Faceless Marketplace is trusted online selling for everyone — side hustlers, once-off sellers, and small businesses in South Africa.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#3F2B96]">
            About us
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
            Trusted online selling for everyone
          </h1>

          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-xl">
            Faceless Marketplace sits between risky classifieds and becoming a
            full online retailer. We&apos;re building a trusted way to buy and
            sell online — with a middleman that protects both sides of every
            transaction.
          </p>

          <div className="mt-10 space-y-10 sm:mt-12">
            <section>
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                Our mission
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                To make online selling accessible to everyone — side hustlers,
                once-off sellers, and small businesses — without the complexity
                of traditional e-commerce or the risks of person-to-person
                deals. Faceless gives both buyers and sellers confidence in
                every transaction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                What we&apos;re building
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                An online marketplace where anyone can become a seller — no
                website required, no complicated setup, no formal retailer
                onboarding. We&apos;re not trying to be another classifieds site
                or a full retail platform. Faceless is the trusted middle ground:
                more protection than classifieds, simpler than becoming an online
                retailer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                Who it&apos;s for
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600 sm:text-base">
                <li>
                  <strong className="text-neutral-900">Side hustlers</strong>{" "}
                  selling handmade products, reselling, or building a small
                  business on the side
                </li>
                <li>
                  <strong className="text-neutral-900">Once-off sellers</strong>{" "}
                  listing a single item without setting up a full store
                </li>
                <li>
                  <strong className="text-neutral-900">Small businesses</strong>{" "}
                  that want a simple way to sell online without retail complexity
                </li>
                <li>
                  <strong className="text-neutral-900">Buyers</strong> who want
                  protection when purchasing from individuals or small sellers
                </li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                Pre-launch
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                We&apos;re currently preparing for launch in South Africa. Join
                our waitlist to be among the first to buy and sell on Faceless
                Marketplace.
              </p>
              <div className="mt-6">
                <WaitlistButton />
              </div>
            </section>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
