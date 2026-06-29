import { ListingCard } from "@/components/ListingCard";
import { SectionContainer } from "@/components/SectionContainer";
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
              <p className="text-sm text-neutral-500">No purchases yet.</p>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900">Saved items</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900">Recently viewed</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </SectionContainer>
    </main>
  );
}
