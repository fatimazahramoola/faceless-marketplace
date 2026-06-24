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
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:border-[#D9D1FF] hover:shadow-sm"
    >
      <ListingImage
        src={listing.image_urls[0]}
        alt={listing.title}
        priority={priority}
      />
      <div className="p-4">
        <h2 className="line-clamp-2 text-base font-bold text-neutral-900 group-hover:text-[#7B3FE4]">
          {listing.title}
        </h2>
        <p className="mt-2 text-lg font-bold text-[#7B3FE4]">
          {formatPrice(listing.price)}
        </p>
      </div>
    </Link>
  );
}
