import Link from "next/link";
import { HeartIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
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
      className="group block overflow-hidden rounded-[28px] border border-neutral-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden bg-neutral-100">
        <ListingImage
          src={listing.image_urls[0]}
          alt={listing.title}
          priority={priority}
          className="h-[280px] w-full transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#7B3FE4] shadow-sm backdrop-blur-sm">
          <HeartIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-[#F4F1FF] px-3 py-1 text-xs font-semibold text-[#7B3FE4]">
            {listing.category}
          </span>
          {listing.profiles?.name ? (
            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
              {`Member since ${new Date(listing.profiles.created_at).toLocaleDateString("en-ZA", { month: "short", year: "numeric" })}`}
            </span>
          ) : null}
        </div>

        <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-neutral-900 group-hover:text-[#7B3FE4]">
          {listing.title}
        </h2>

        {listing.profiles?.name ? (
          <p className="mt-2 text-sm text-neutral-600">by {listing.profiles.name}</p>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xl font-bold text-[#7B3FE4]">{formatPrice(listing.price)}</p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#7B3FE4]">
            Explore
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
