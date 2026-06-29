import Link from "next/link";
import { notFound } from "next/navigation";
import {
  reportListing,
  saveListing,
  startConversation,
  unsaveListing,
  recordRecentlyViewed,
} from "@/app/actions/marketplace";
import { ListingCard } from "@/components/ListingCard";
import { ListingImage } from "@/components/ListingImage";
import { SectionContainer } from "@/components/SectionContainer";
import { ShareButton } from "@/components/ShareButton";
import {
  formatPrice,
  getActiveListing,
  getRelatedListings,
} from "@/lib/listings";
import { isListingSaved } from "@/lib/marketplace";
import { createPageMetadata } from "@/lib/metadata";
import { getCurrentUser } from "@/lib/supabase/server";

type ListingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listing = await getActiveListing(id);

  if (!listing) {
    return createPageMetadata({
      title: "Listing not found",
      path: `/listings/${id}`,
    });
  }

  return createPageMetadata({
    title: listing.title,
    description: listing.description,
    path: `/listings/${listing.id}`,
  });
}

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { id } = await params;
  const listing = await getActiveListing(id);

  if (!listing) {
    notFound();
  }

  const user = await getCurrentUser();
  const saved = user ? await isListingSaved(user.id, listing.id) : false;
  const relatedListings = await getRelatedListings(listing);
  if (user) {
    await recordRecentlyViewed(user.id, listing.id);
  }

  const images = listing.image_urls.length > 0 ? listing.image_urls : [undefined];

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <Link
          href="/listings"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-[#7B3FE4] hover:underline"
        >
          Back to listings
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {images.map((image, index) => (
              <ListingImage
                key={image ?? "placeholder"}
                src={image}
                alt={`${listing.title} image ${index + 1}`}
                priority={index === 0}
                className={index === 0 ? "sm:col-span-2" : ""}
              />
            ))}
          </div>

          <div>
            <div className="mb-5 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
              Active listing
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
              {listing.title}
            </h1>
            <p className="mt-5 text-3xl font-bold text-[#7B3FE4]">
              {formatPrice(listing.price)}
            </p>
            <p className="mt-6 whitespace-pre-wrap text-base leading-relaxed text-neutral-600 sm:text-lg">
              {listing.description}
            </p>

            <div className="mt-6 rounded-3xl border border-neutral-200 p-5">
              <p className="text-sm font-semibold text-neutral-500">Seller</p>
              <Link
                href={`/users/${listing.user_id}`}
                className="mt-2 inline-flex items-center gap-2 font-bold text-neutral-900 hover:text-[#7B3FE4]"
              >
                {listing.profiles?.name ?? "Faceless seller"}
                {listing.profiles?.is_verified_seller && (
                  <span className="rounded-full bg-[#F4F1FF] px-2 py-1 text-xs text-[#7B3FE4]">
                    Verified seller
                  </span>
                )}
              </Link>
              <p className="mt-3 text-sm text-neutral-600">
                Buyer protection and seller protection are built into the
                Faceless checkout workflow.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/checkout/${listing.id}`}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 sm:w-auto"
              >
                Buy Now
              </Link>
              {user && user.id !== listing.user_id && (
                <form action={saved ? unsaveListing : saveListing}>
                  <input type="hidden" name="listing_id" value={listing.id} />
                  <button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
                    {saved ? "Saved" : "Save"}
                  </button>
                </form>
              )}
              {user && user.id !== listing.user_id && (
                <form action={startConversation}>
                  <input type="hidden" name="listing_id" value={listing.id} />
                  <input type="hidden" name="seller_id" value={listing.user_id} />
                  <button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
                    Message seller
                  </button>
                </form>
              )}
              <ShareButton title={listing.title} />
            </div>

            <div className="mt-8 rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-6">
              <h2 className="font-bold text-neutral-900">
                Faceless protection preview
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                The checkout flow is currently a placeholder. The production
                marketplace will add verified payments, seller controls, and
                delivery status before launch.
              </p>
            </div>

            {user && (
              <form action={reportListing} className="mt-6 space-y-3">
                <input type="hidden" name="listing_id" value={listing.id} />
                <label
                  htmlFor="reason"
                  className="block text-sm font-semibold text-neutral-900"
                >
                  Report listing
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="reason"
                    name="reason"
                    minLength={5}
                    placeholder="Tell us what looks unsafe"
                    className="min-h-11 flex-1 rounded-xl border border-neutral-300 px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
                  />
                  <button className="min-h-11 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50">
                    Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {relatedListings.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-neutral-900">
              Related listings
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedListings.map((related) => (
                <ListingCard key={related.id} listing={related} />
              ))}
            </div>
          </section>
        )}
      </SectionContainer>
    </main>
  );
}
