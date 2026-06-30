import Link from "next/link";
import { ListingImage } from "@/components/ListingImage";
import { formatPrice } from "@/lib/listings";
import type { Listing } from "@/lib/types";

type ListingCardProps = {
  listing: Listing;
  priority?: boolean;
};

export function ListingCard({ listing, priority = false }: ListingCardProps) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:border-[#D9D1FF] hover:shadow-lg"
    >
      <ListingImage
        src={listing.image_urls[0]}
        alt={listing.title}
        priority={priority}
        className="aspect-[4/3]"
      />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-[#F4F1FF] px-3 py-1 text-xs font-semibold text-[#7B3FE4]">
            {listing.category}
          </span>
          {listing.profiles?.is_verified_seller ? (
            <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Verified seller
            </span>
          ) : null}
        </div>

        <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-neutral-900 group-hover:text-[#7B3FE4]">
          {listing.title}
        </h2>

        {listing.profiles?.name ? (
          <p className="mt-2 text-sm text-neutral-600">{listing.profiles.name}</p>
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-[#7B3FE4]">{formatPrice(listing.price)}</p>
          <span className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
            Browse
          </span>
        </div>
      </div>
    </Link>
  );
}
