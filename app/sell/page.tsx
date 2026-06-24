import { SectionContainer } from "@/components/SectionContainer";
import { SellerListingForm } from "@/components/SellerListingForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Sell",
  description:
    "Create a simple Faceless Marketplace listing with images, a description, and a price.",
  path: "/sell",
});

export default function SellPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
              Seller MVP
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
              List an item in minutes
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Add product images, a clear description, and a price. This MVP
              creates public listings so the complete marketplace journey can be
              tested before accounts and payments are added.
            </p>

            <div className="mt-8 rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-6">
              <h2 className="font-bold text-neutral-900">What happens next?</h2>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                <li>✓ Buyers can browse your listing.</li>
                <li>✓ The detail page shows product images and price.</li>
                <li>✓ Checkout is a protected placeholder for now.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-5 sm:p-8">
            <SellerListingForm />
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
