import Link from "next/link";
import { DashboardListingCard } from "@/components/DashboardListingCard";
import { SectionContainer } from "@/components/SectionContainer";
import { getUserListings, groupListingsByStatus } from "@/lib/listings";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

export const metadata = createPageMetadata({
  title: "Dashboard",
  description: "Manage your Faceless Marketplace listings and buyer activity.",
  path: "/dashboard",
});

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const listings = await getUserListings(user.id);
  const groupedListings = groupListingsByStatus(listings);
  const activeCount = listings.filter((listing) => listing.status === "active").length;
  const soldCount = listings.filter((listing) => listing.status === "sold").length;
  const draftCount = listings.filter((listing) => listing.status === "draft").length;

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
              Seller dashboard
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              Manage your listings
            </h1>
          </div>
          <Link
            href="/sell"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            New listing
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Active", activeCount],
            ["Sold", soldCount],
            ["Draft", draftCount],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-neutral-200 p-5">
              <p className="text-sm text-neutral-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {groupedListings.map(({ status, listings: statusListings }) => (
            <section key={status}>
              <h2 className="text-xl font-bold capitalize text-neutral-900">
                {status} listings
              </h2>
              <div className="mt-4 space-y-4">
                {statusListings.length > 0 ? (
                  statusListings.map((listing) => (
                    <DashboardListingCard key={listing.id} listing={listing} />
                  ))
                ) : (
                  <p className="rounded-2xl border border-neutral-200 p-5 text-sm text-neutral-500">
                    No {status} listings yet.
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
