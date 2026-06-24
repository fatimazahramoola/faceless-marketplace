import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingImage } from "@/components/ListingImage";
import { SectionContainer } from "@/components/SectionContainer";
import { formatPrice, getActiveListing } from "@/lib/listings";
import { createPageMetadata } from "@/lib/metadata";

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

            <Link
              href={`/checkout/${listing.id}`}
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              Buy Now
            </Link>

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
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
