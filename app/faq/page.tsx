import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionContainer } from "@/components/SectionContainer";
import { FAQ_ITEMS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Answers about Faceless Marketplace — trusted online selling for side hustlers, small businesses, and everyday sellers in South Africa.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
            FAQ
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h1>

          <p className="mt-6 text-base text-neutral-600 sm:text-lg">
            Everything you need to know about trusted online selling with
            Faceless Marketplace. Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/about" className="text-[#7B3FE4] hover:underline">
              Learn more about us
            </Link>{" "}
            or reach out via the contact email in our footer.
          </p>

          <div className="mt-10 sm:mt-12">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
