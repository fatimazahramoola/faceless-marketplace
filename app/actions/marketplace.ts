"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient, requireUser } from "@/lib/supabase/server";

export async function saveListing(formData: FormData) {
  const user = await requireUser();
  const listingId = String(formData.get("listing_id") || "");
  const supabase = await createServerClient();

  if (listingId) {
    await supabase.from("wishlist_items").upsert({
      user_id: user.id,
      listing_id: listingId,
    });
  }

  revalidatePath(`/listings/${listingId}`);
}

export async function unsaveListing(formData: FormData) {
  const user = await requireUser();
  const listingId = String(formData.get("listing_id") || "");
  const supabase = await createServerClient();

  if (listingId) {
    await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", user.id)
      .eq("listing_id", listingId);
  }

  revalidatePath(`/listings/${listingId}`);
}

export async function recordRecentlyViewed(userId: string, listingId: string) {
  const supabase = await createServerClient();
  await supabase.from("recently_viewed").upsert({
    user_id: userId,
    listing_id: listingId,
    viewed_at: new Date().toISOString(),
  });
}

export async function reportListing(formData: FormData) {
  const user = await requireUser();
  const listingId = String(formData.get("listing_id") || "");
  const reason = String(formData.get("reason") || "").trim();
  const supabase = await createServerClient();

  if (listingId && reason.length >= 5) {
    await supabase.from("listing_reports").insert({
      listing_id: listingId,
      reporter_id: user.id,
      reason,
    });
  }

  redirect(`/listings/${listingId}?reported=1`);
}

export async function startConversation(formData: FormData) {
  const user = await requireUser();
  const listingId = String(formData.get("listing_id") || "");
  const sellerId = String(formData.get("seller_id") || "");
  const supabase = await createServerClient();

  if (!listingId || !sellerId || sellerId === user.id) {
    redirect(`/listings/${listingId}`);
  }

  const { data } = await supabase
    .from("conversations")
    .upsert(
      {
        listing_id: listingId,
        buyer_id: user.id,
        seller_id: sellerId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "listing_id,buyer_id,seller_id" },
    )
    .select("id")
    .single();

  redirect(data ? `/messages/${data.id}` : `/listings/${listingId}`);
}

export async function sendMessage(formData: FormData) {
  const user = await requireUser();
  const conversationId = String(formData.get("conversation_id") || "");
  const body = String(formData.get("body") || "").trim();
  const supabase = await createServerClient();

  if (conversationId && body) {
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      body,
    });
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);
  }

  revalidatePath(`/messages/${conversationId}`);
}

export async function createMockOrder(formData: FormData) {
  const user = await requireUser();
  const listingId = String(formData.get("listing_id") || "");
  const sellerId = String(formData.get("seller_id") || "");
  const amount = Number(formData.get("amount") || 0);
  const buyerNote = String(formData.get("buyer_note") || "").trim();
  const supabase = await createServerClient();

  if (!listingId || !sellerId || sellerId === user.id || amount <= 0) {
    redirect(`/checkout/${listingId}`);
  }

  const { data } = await supabase
    .from("orders")
    .insert({
      listing_id: listingId,
      buyer_id: user.id,
      seller_id: sellerId,
      amount,
      buyer_note: buyerNote || null,
      status: "paid",
    })
    .select("id")
    .single();

  await supabase
    .from("listings")
    .update({ status: "sold", updated_at: new Date().toISOString() })
    .eq("id", listingId);

  await supabase.rpc("create_notification", {
    target_user_id: sellerId,
    notification_title: "Listing sold",
    notification_body:
      "A buyer completed the test checkout for one of your listings.",
  });
  await supabase.rpc("create_notification", {
    target_user_id: user.id,
    notification_title: "Order placed",
    notification_body:
      "Your test payment was successful. The seller can now update the order.",
  });

  redirect(data ? `/orders/${data.id}` : "/buyer");
}

export async function updateOrderStatus(formData: FormData) {
  const user = await requireUser();
  const orderId = String(formData.get("order_id") || "");
  const status = String(formData.get("status") || "");
  const supabase = await createServerClient();

  if (orderId && status) {
    await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    const { data: order } = await supabase
      .from("orders")
      .select("buyer_id, seller_id")
      .eq("id", orderId)
      .single();

    if (order) {
      const recipientId = order.buyer_id === user.id ? order.seller_id : order.buyer_id;
      await supabase.rpc("create_notification", {
        target_user_id: recipientId,
        notification_title: "Order updated",
        notification_body: `Order status changed to ${status}.`,
      });
    }
  }

  revalidatePath(`/orders/${orderId}`);
}

export async function createReview(formData: FormData) {
  const user = await requireUser();
  const sellerId = String(formData.get("seller_id") || "");
  const orderId = String(formData.get("order_id") || "") || null;
  const rating = Number(formData.get("rating") || 0);
  const comment = String(formData.get("comment") || "").trim();
  const supabase = await createServerClient();

  if (sellerId && rating >= 1 && rating <= 5 && comment.length >= 5) {
    await supabase.from("reviews").insert({
      reviewer_id: user.id,
      seller_id: sellerId,
      order_id: orderId,
      rating,
      comment,
    });
  }

  redirect(`/users/${sellerId}`);
}
