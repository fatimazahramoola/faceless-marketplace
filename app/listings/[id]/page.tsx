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
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { FormLabel } from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/Input";
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    image: listing.image_urls,
    category: listing.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      price: listing.price,
      availability:
        listing.status === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://facelessmarketplace.co.za/listings/${listing.id}`,
    },
    seller: {
      "@type": "Person",
      name: listing.profiles?.name ?? "Faceless seller",
    },
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SectionContainer className="py-12 sm:py-20">
        <LinkButton href="/listings" variant="ghost" className="text-sm font-semibold text-[#7B3FE4] hover:underline">
          Back to listings
        </LinkButton>

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
            <Badge>Active listing</Badge>
            <h1 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
              {listing.title}
            </h1>
            <p className="mt-5 text-3xl font-bold text-[#7B3FE4]">
              {formatPrice(listing.price)}
            </p>
            <p className="mt-6 whitespace-pre-wrap text-base leading-relaxed text-neutral-600 sm:text-lg">
              {listing.description}
            </p>

            <Card className="mt-6 p-5">
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
            </Card>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={`/checkout/${listing.id}`} className="min-h-11 w-full sm:w-auto">
                Buy Now
              </LinkButton>
              {user && user.id !== listing.user_id && (
                <form action={saved ? unsaveListing : saveListing}>
                  <input type="hidden" name="listing_id" value={listing.id} />
                  <Button type="submit" variant="secondary">
                    {saved ? "Saved" : "Save"}
                  </Button>
                </form>
              )}
              {user && user.id !== listing.user_id && (
                <form action={startConversation}>
                  <input type="hidden" name="listing_id" value={listing.id} />
                  <input type="hidden" name="seller_id" value={listing.user_id} />
                  <Button type="submit" variant="secondary">
                    Message seller
                  </Button>
                </form>
              )}
              <ShareButton title={listing.title} />
            </div>

            <Card variant="subtle" className="mt-8 p-6">
              <h2 className="font-bold text-neutral-900">
                Faceless protection preview
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                The checkout flow is currently a placeholder. The production
                marketplace will add verified payments, seller controls, and
                delivery status before launch.
              </p>
            </Card>

            {user && (
              <form action={reportListing} className="mt-6 space-y-3">
                <input type="hidden" name="listing_id" value={listing.id} />
                <FormLabel htmlFor="reason">Report listing</FormLabel>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="reason"
                    name="reason"
                    minLength={5}
                    placeholder="Tell us what looks unsafe"
                    className="flex-1"
                  />
                  <Button type="submit" variant="danger">
                    Report
                  </Button>
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
