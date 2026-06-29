import { SectionContainer } from "@/components/SectionContainer";
import { getNotifications } from "@/lib/marketplace";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

export const metadata = createPageMetadata({
  title: "Notifications",
  description: "View your Faceless Marketplace notifications.",
  path: "/notifications",
});

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const user = await requireUser();
  const notifications = await getNotifications(user.id);

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Notifications
        </h1>
        <div className="mt-8 space-y-3">
          {notifications.map((notification) => (
            <article key={notification.id} className="rounded-2xl border border-neutral-200 p-5">
              <h2 className="font-bold text-neutral-900">{notification.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{notification.body}</p>
            </article>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
