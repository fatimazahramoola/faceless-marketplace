import { BookmarkIcon, ClockIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ListingCard } from "@/components/ListingCard";
import { SectionContainer } from "@/components/SectionContainer";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/LinkButton";
import { getRecentlyViewed, getSavedListings, getUserOrders } from "@/lib/marketplace";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

export const metadata = createPageMetadata({
  title: "Buyer Dashboard",
  description: "View saved items, purchases, and recently viewed listings.",
  path: "/buyer",
});

export const dynamic = "force-dynamic";

export default async function BuyerPage() {
  const user = await requireUser();
  const [saved, recent, orders] = await Promise.all([
    getSavedListings(user.id),
    getRecentlyViewed(user.id),
    getUserOrders(user.id),
  ]);

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
          Buyer dashboard
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Your buying activity
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-600">
          Keep tabs on your orders, saved favorites, and recent browsing in one place.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900">Purchases</h2>
          <div className="mt-4 space-y-3">
            {orders.length > 0 ? (
              orders.map((order) => (
                <a
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="block rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50"
                >
                  <span className="font-semibold text-neutral-900">
                    {order.listings?.title ?? "Order"}
                  </span>
                  <span className="ml-3 text-sm text-[#7B3FE4]">{order.status}</span>
                </a>
              ))
            ) : (
              <EmptyState
                icon={<ShoppingBagIcon className="h-6 w-6" />}
                title="No purchases yet"
                description="Browse listings and save items you like. Your orders will appear here once you checkout."
                action={<LinkButton href="/listings">Browse listings</LinkButton>}
              />
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900">Saved items</h2>
          <div className="mt-4">
            {saved.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {saved.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<BookmarkIcon className="h-6 w-6" />}
                title="No saved items yet"
                description="Save listings so you can compare your favorite buys and return to them later."
                action={<LinkButton href="/listings">Explore listings</LinkButton>}
              />
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900">Recently viewed</h2>
          <div className="mt-4">
            {recent.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {recent.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<ClockIcon className="h-6 w-6" />}
                title="No recently viewed items"
                description="Your recent activity will show up here once you start browsing listings."
                action={<LinkButton href="/listings">Continue browsing</LinkButton>}
              />
            )}
          </div>
        </section>
      </SectionContainer>
    </main>
  );
}
