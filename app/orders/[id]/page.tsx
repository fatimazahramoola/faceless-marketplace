import { notFound } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/marketplace";
import { SectionContainer } from "@/components/SectionContainer";
import { formatPrice } from "@/lib/listings";
import { getOrder } from "@/lib/marketplace";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = createPageMetadata({
  title: "Order",
  description: "Track a Faceless Marketplace order.",
  path: "/buyer",
});

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: OrderPageProps) {
  const user = await requireUser();
  const { id } = await params;
  const order = await getOrder(user.id, id);

  if (!order) notFound();

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
            Test order
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {order.listings?.title ?? "Order"}
          </h1>
          <p className="mt-3 text-2xl font-bold text-[#7B3FE4]">
            {formatPrice(order.amount)}
          </p>
          <p className="mt-2 text-sm text-neutral-600">Status: {order.status}</p>

          <form action={updateOrderStatus} className="mt-8 flex flex-wrap gap-2">
            <input type="hidden" name="order_id" value={order.id} />
            {["shipped", "delivered", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                name="status"
                value={status}
                className="min-h-11 rounded-xl border border-neutral-300 px-4 text-sm font-semibold capitalize text-neutral-700 hover:bg-neutral-50"
              >
                Mark {status}
              </button>
            ))}
          </form>
        </div>
      </SectionContainer>
    </main>
  );
}
