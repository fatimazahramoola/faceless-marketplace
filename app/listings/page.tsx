import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { SectionContainer } from "@/components/SectionContainer";
import { getActiveListings } from "@/lib/listings";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Browse Listings",
  description:
    "Browse active Faceless Marketplace listings from everyday sellers and small businesses.",
  path: "/listings",
});

export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const listings = await getActiveListings();

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
              Marketplace MVP
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
              Browse listings
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Explore active listings created by sellers. Checkout is currently
              a placeholder while the core marketplace journey is being tested.
            </p>
          </div>

          <Link
            href="/sell"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Sell an item
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing, index) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                priority={index < 4}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-8 text-center">
            <h2 className="text-xl font-bold text-neutral-900">
              No listings yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 sm:text-base">
              Create the first marketplace listing to test the seller-to-buyer
              journey.
            </p>
            <Link
              href="/sell"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Create listing
            </Link>
          </div>
        )}
      </SectionContainer>
    </main>
  );
}
