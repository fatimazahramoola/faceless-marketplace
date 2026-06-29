import type { Conversation, Listing, Notification, Order, Review } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/server";

export async function isListingSaved(userId: string, listingId: string) {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("wishlist_items")
    .select("listing_id")
    .eq("user_id", userId)
    .eq("listing_id", listingId)
    .maybeSingle();

  return Boolean(data);
}

export async function getSavedListings(userId: string): Promise<Listing[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("listings(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return ((data ?? [])
    .map((item) => item.listings)
    .filter(Boolean) as unknown) as Listing[];
}

export async function getRecentlyViewed(userId: string): Promise<Listing[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("recently_viewed")
    .select("listings(*)")
    .eq("user_id", userId)
    .order("viewed_at", { ascending: false })
    .limit(12);

  if (error) throw new Error(error.message);

  return ((data ?? [])
    .map((item) => item.listings)
    .filter(Boolean) as unknown) as Listing[];
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, listings(*)")
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getOrder(userId: string, orderId: string): Promise<Order | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, listings(*)")
    .eq("id", orderId)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .single();

  if (error) return null;
  return data;
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("*, listings(*), messages(*)")
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getConversation(
  userId: string,
  conversationId: string,
): Promise<Conversation | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("*, listings(*), messages(*)")
    .eq("id", conversationId)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .single();

  if (error) return null;
  return data;
}

export async function getSellerReviews(sellerId: string): Promise<Review[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*, profiles:reviewer_id(*)")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
