import type { Metadata } from "next";
import { SectionContainer } from "@/components/SectionContainer";
import { WaitlistButton } from "@/components/WaitlistButton";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — a trusted middleman for safer online buying and selling in South Africa.`,
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#3F2B96]">
            About us
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">
            Safer transactions for everyone
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-neutral-600">
            Faceless Marketplace is building a new kind of online marketplace —
            one where trust isn&apos;t left to chance. We sit between buyers and
            sellers so neither side has to send money or ship goods without
            protection.
          </p>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Our mission</h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                To make buying and selling online as safe and simple as it should
                be. Whether you&apos;re a buyer worried about scams or a seller
                tired of payment uncertainty, Faceless gives both sides confidence
                in every transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900">
                What we&apos;re building
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                An online marketplace where anyone can become a seller — no
                website required, no complicated setup, no need to become a
                formal retailer. Over time, we want Faceless to feel more like
                modern e-commerce than traditional classifieds, while keeping
                the barrier to entry as low as possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Who it&apos;s for</h2>
              <ul className="mt-4 space-y-3 text-neutral-600">
                <li>
                  <strong className="text-neutral-900">Buyers</strong> who want
                  protection when purchasing from individuals or small sellers
                </li>
                <li>
                  <strong className="text-neutral-900">Sellers</strong> who want
                  payment confidence before shipping or delivering goods
                </li>
                <li>
                  <strong className="text-neutral-900">Anyone</strong> who has
                  been burned by direct bank transfers or unreliable marketplace
                  transactions
                </li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-8">
              <h2 className="text-2xl font-bold text-neutral-900">
                Pre-launch
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
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
