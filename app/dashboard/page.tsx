import { PlusIcon } from "@heroicons/react/24/outline";
import { DashboardListingCard } from "@/components/DashboardListingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/LinkButton";
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
            <p className="mt-3 max-w-2xl text-sm text-neutral-600">
              Review your inventory, publish new items, and keep your active listings in view.
            </p>
          </div>
          <LinkButton href="/sell">New listing</LinkButton>
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
                  <EmptyState
                    icon={<PlusIcon className="h-6 w-6" />}
                    title={`No ${status} listings yet`}
                    description={`Create a new listing to build your ${status} inventory and draw buyer interest.`}
                    action={<LinkButton href="/sell">Add a listing</LinkButton>}
                  />
                )}
              </div>
            </section>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
