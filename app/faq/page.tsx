import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionContainer } from "@/components/SectionContainer";
import { FAQ_ITEMS, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${SITE_NAME} — how it works, who can sell, fees, and launch timeline.`,
};

export default function FaqPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#3F2B96]">
            FAQ
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">
            Frequently asked questions
          </h1>

          <p className="mt-6 text-lg text-neutral-600">
            Everything you need to know about Faceless Marketplace. Can&apos;t
            find what you&apos;re looking for?{" "}
            <Link href="/about" className="text-[#3F2B96] hover:underline">
              Learn more about us
            </Link>{" "}
            or reach out via the contact email in our footer.
          </p>

          <div className="mt-12">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
