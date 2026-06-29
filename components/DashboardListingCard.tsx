import Link from "next/link";
import {
  deleteListing,
  duplicateListing,
  markListingSold,
} from "@/app/actions/listings";
import { ListingImage } from "@/components/ListingImage";
import { formatPrice } from "@/lib/listings";
import type { Listing } from "@/lib/types";

type DashboardListingCardProps = {
  listing: Listing;
};

export function DashboardListingCard({ listing }: DashboardListingCardProps) {
  return (
    <article className="grid gap-4 rounded-2xl border border-neutral-200 p-4 sm:grid-cols-[120px_1fr]">
      <ListingImage
        src={listing.cover_image_url ?? listing.image_urls[0]}
        alt={listing.title}
        className="rounded-xl"
      />
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#7B3FE4]">
              {listing.status} · {listing.category}
            </p>
            <h3 className="mt-1 font-bold text-neutral-900">{listing.title}</h3>
            <p className="mt-1 font-bold text-[#7B3FE4]">
              {formatPrice(listing.price)}
            </p>
          </div>
          <Link
            href={`/dashboard/listings/${listing.id}/edit`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Edit
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <form action={markListingSold}>
            <input type="hidden" name="listing_id" value={listing.id} />
            <button className="min-h-11 rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
              Mark sold
            </button>
          </form>
          <form action={duplicateListing}>
            <input type="hidden" name="listing_id" value={listing.id} />
            <button className="min-h-11 rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
              Duplicate
            </button>
          </form>
          <form action={deleteListing}>
            <input type="hidden" name="listing_id" value={listing.id} />
            <button className="min-h-11 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50">
              Delete
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
