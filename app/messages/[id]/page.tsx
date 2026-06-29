import { notFound } from "next/navigation";
import { sendMessage } from "@/app/actions/marketplace";
import { SectionContainer } from "@/components/SectionContainer";
import { getConversation } from "@/lib/marketplace";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

type ConversationPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = createPageMetadata({
  title: "Conversation",
  description: "Send a message on Faceless Marketplace.",
  path: "/messages",
});

export const dynamic = "force-dynamic";

export default async function ConversationPage({ params }: ConversationPageProps) {
  const user = await requireUser();
  const { id } = await params;
  const conversation = await getConversation(user.id, id);

  if (!conversation) notFound();

  const messages = [...(conversation.messages ?? [])].sort((a, b) =>
    a.created_at.localeCompare(b.created_at),
  );

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {conversation.listings?.title ?? "Conversation"}
          </h1>

          <div className="mt-8 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl p-4 ${
                  message.sender_id === user.id
                    ? "ml-auto bg-[#7B3FE4] text-white"
                    : "mr-auto border border-neutral-200 bg-white text-neutral-800"
                } max-w-[85%]`}
              >
                {message.body}
              </div>
            ))}
          </div>

          <form action={sendMessage} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input type="hidden" name="conversation_id" value={conversation.id} />
            <label htmlFor="body" className="sr-only">
              Message
            </label>
            <input
              id="body"
              name="body"
              required
              minLength={1}
              maxLength={2000}
              className="min-h-11 flex-1 rounded-xl border border-neutral-300 px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
              placeholder="Write a message"
            />
            <button className="min-h-11 rounded-xl bg-[#7B3FE4] px-6 font-semibold text-white">
              Send
            </button>
          </form>
        </div>
      </SectionContainer>
    </main>
  );
}
