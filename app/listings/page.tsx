import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { SectionContainer } from "@/components/SectionContainer";
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
            <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
              Marketplace MVP
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
              Browse listings
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Explore active listings created by sellers. Checkout is currently
              a placeholder while the core marketplace journey is being tested.
            </p>
          </div>

          <Link
            href="/sell"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Sell an item
          </Link>
        </div>

        <form className="mt-8 grid gap-3 rounded-3xl border border-neutral-200 p-4 sm:grid-cols-[1fr_180px_180px_auto]">
          <label htmlFor="q" className="sr-only">
            Search listings
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={params.q ?? ""}
            placeholder="Search listings"
            className="min-h-11 rounded-xl border border-neutral-300 px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          />

          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={params.category ?? "All"}
            className="min-h-11 rounded-xl border border-neutral-300 bg-white px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          >
            <option value="All">All categories</option>
            {LISTING_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="sort" className="sr-only">
            Sort
          </label>
          <select
            id="sort"
            name="sort"
            defaultValue={params.sort ?? "newest"}
            className="min-h-11 rounded-xl border border-neutral-300 bg-white px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </select>

          <button className="min-h-11 rounded-xl bg-[#7B3FE4] px-6 font-semibold text-white transition hover:opacity-90">
            Filter
          </button>
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
          <div className="mt-10 rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-8 text-center">
            <h2 className="text-xl font-bold text-neutral-900">
              No listings yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 sm:text-base">
              Create the first marketplace listing to test the seller-to-buyer
              journey.
            </p>
            <Link
              href="/sell"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Create listing
            </Link>
          </div>
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
