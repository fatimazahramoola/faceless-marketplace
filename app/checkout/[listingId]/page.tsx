import Link from "next/link";
import { notFound } from "next/navigation";
import { createMockOrder } from "@/app/actions/marketplace";
import { ListingImage } from "@/components/ListingImage";
import { SectionContainer } from "@/components/SectionContainer";
import { formatPrice, getActiveListing } from "@/lib/listings";
import { createPageMetadata } from "@/lib/metadata";

type CheckoutPageProps = {
  params: Promise<{
    listingId: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CheckoutPageProps) {
  const { listingId } = await params;
  const listing = await getActiveListing(listingId);

  return createPageMetadata({
    title: listing ? `Checkout: ${listing.title}` : "Checkout",
    description:
      "Faceless Marketplace checkout placeholder with buyer and seller protection messaging.",
    path: `/checkout/${listingId}`,
  });
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { listingId } = await params;
  const listing = await getActiveListing(listingId);

  if (!listing) {
    notFound();
  }

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <Link
          href={`/listings/${listing.id}`}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-[#7B3FE4] hover:underline"
        >
          Back to listing
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="rounded-3xl border border-neutral-200 p-5 sm:p-6">
            <ListingImage
              src={listing.image_urls[0]}
              alt={listing.title}
              priority
              className="rounded-2xl"
            />
            <h1 className="mt-5 text-2xl font-bold text-neutral-900">
              {listing.title}
            </h1>
            <p className="mt-2 text-2xl font-bold text-[#7B3FE4]">
              {formatPrice(listing.price)}
            </p>
          </div>

          <div>
            <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
              Checkout preview
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
              Protected checkout is coming soon
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
              This placeholder completes the MVP journey from seller listing to
              buyer checkout intent. Payments, escrow, delivery, disputes, and
              account ownership are intentionally not active yet.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-6">
                <h3 className="font-bold text-neutral-900">Buyer protection</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                  Buyers should pay through Faceless, not direct transfer. The
                  production flow will verify payment and protect the order
                  before funds move to the seller.
                </p>
              </div>

              <div className="rounded-3xl border border-neutral-200 p-6">
                <h3 className="font-bold text-neutral-900">Seller protection</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Sellers should only release goods after Faceless confirms the
                  buyer has paid. The production flow will add seller-side order
                  status and payout controls.
                </p>
              </div>
            </div>

            <button
              form="checkout-form"
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              Complete test payment
            </button>
            <form id="checkout-form" action={createMockOrder} className="mt-6">
              <input type="hidden" name="listing_id" value={listing.id} />
              <input type="hidden" name="seller_id" value={listing.user_id} />
              <input type="hidden" name="amount" value={listing.price} />
              <label
                htmlFor="buyer_note"
                className="block text-sm font-semibold text-neutral-900"
              >
                Note to seller
              </label>
              <textarea
                id="buyer_note"
                name="buyer_note"
                rows={3}
                className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
              />
            </form>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
