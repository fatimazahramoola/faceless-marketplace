import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { ListingCard } from "@/components/ListingCard";
import { SectionContainer } from "@/components/SectionContainer";
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
            <SectionHeader
              title="Browse listings"
              description="Explore active listings from local sellers. Find something great, ask a question, and get a feel for the marketplace."
            />
          </div>

          <LinkButton href="/sell" className="whitespace-nowrap">
            Sell an item
          </LinkButton>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="rounded-[28px] border border-neutral-200 bg-[#FAF8FF] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7B3FE4]">
              Marketplace activity
            </p>
            <p className="mt-3 text-3xl font-semibold text-neutral-900">
              {count} active listing{count === 1 ? "" : "s"}
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Popular right now: {LISTING_CATEGORIES.slice(0, 3).join(", ")} and fresh arrivals.
            </p>
          </div>

          <div className="hidden items-center gap-3 rounded-[28px] border border-neutral-200 bg-white p-5 sm:flex">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7B3FE4]/10 text-[#7B3FE4]">
              <SparklesIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Fresh listings every day</p>
              <p className="mt-1 text-sm text-neutral-600">
                Browse the latest items and connect with sellers directly from the marketplace.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {LISTING_CATEGORIES.slice(0, 6).map((category) => (
            <span
              key={category}
              className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
            >
              {category}
            </span>
          ))}
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
            icon={<SparklesIcon className="h-6 w-6" />}
            title="No listings yet"
            description="Get the marketplace moving by posting your first listing — then buyers can browse, ask questions, and make offers."
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
