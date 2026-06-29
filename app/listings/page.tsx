import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { SectionContainer } from "@/components/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { LinkButton } from "@/components/ui/LinkButton";
import { Select } from "@/components/ui/Select";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LISTING_CATEGORIES } from "@/lib/constants";
import { getActiveListings } from "@/lib/listings";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Browse Listings",
  description:
    "Browse active Faceless Marketplace listings from everyday sellers and small businesses.",
  path: "/listings",
});

export const dynamic = "force-dynamic";

type ListingsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
};

function buildPageHref(
  params: Awaited<ListingsPageProps["searchParams"]>,
  page: number,
) {
  const nextParams = new URLSearchParams();
  if (params.q) nextParams.set("q", params.q);
  if (params.category) nextParams.set("category", params.category);
  if (params.sort) nextParams.set("sort", params.sort);
  nextParams.set("page", String(page));
  return `/listings?${nextParams.toString()}`;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const { listings, count, page, pageSize } = await getActiveListings({
    query: params.q,
    category: params.category,
    sort: params.sort,
    page: Number(params.page || "1"),
  });
  const totalPages = Math.max(Math.ceil(count / pageSize), 1);

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>Marketplace MVP</Badge>
            <SectionHeader
              title="Browse listings"
              description="Explore active listings created by sellers. Checkout is currently a placeholder while the core marketplace journey is being tested."
              className="mt-6"
              titleClassName="text-3xl sm:text-4xl md:text-5xl"
            />
          </div>

          <LinkButton href="/sell" className="whitespace-nowrap">
            Sell an item
          </LinkButton>
        </div>

        <form className="mt-8 grid gap-3 rounded-3xl border border-neutral-200 p-4 sm:grid-cols-[1fr_180px_180px_auto]">
          <Input
            id="q"
            name="q"
            type="search"
            defaultValue={params.q ?? ""}
            placeholder="Search listings"
            className="min-h-11"
          />

          <Select
            id="category"
            name="category"
            defaultValue={params.category ?? "All"}
          >
            <option value="All">All categories</option>
            {LISTING_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Select
            id="sort"
            name="sort"
            defaultValue={params.sort ?? "newest"}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </Select>

          <Button type="submit" className="min-h-11">
            Filter
          </Button>
        </form>

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
          <EmptyState
            title="No listings yet"
            description="Create the first marketplace listing to test the seller-to-buyer journey."
            action={<LinkButton href="/sell">Create listing</LinkButton>}
            className="mt-10"
          />
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Listings pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Link
                  key={pageNumber}
                  href={buildPageHref(params, pageNumber)}
                  aria-current={pageNumber === page ? "page" : undefined}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold ${
                    pageNumber === page
                      ? "border-[#7B3FE4] bg-[#7B3FE4] text-white"
                      : "border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </nav>
        )}
      </SectionContainer>
    </main>
  );
}
