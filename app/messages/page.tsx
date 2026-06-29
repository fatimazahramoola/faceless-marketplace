import Link from "next/link";
import { SectionContainer } from "@/components/SectionContainer";
import { getConversations } from "@/lib/marketplace";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

export const metadata = createPageMetadata({
  title: "Messages",
  description: "View Faceless Marketplace buyer and seller conversations.",
  path: "/messages",
});

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const user = await requireUser();
  const conversations = await getConversations(user.id);

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Messages
        </h1>
        <div className="mt-8 space-y-3">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className="block rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50"
            >
              <h2 className="font-bold text-neutral-900">
                {conversation.listings?.title ?? "Conversation"}
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                {conversation.messages?.length ?? 0} messages
              </p>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
