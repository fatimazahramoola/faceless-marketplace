import type { Listing, ListingStatus } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/server";

export const LISTING_IMAGE_BUCKET = "listing-images";
export const MAX_LISTING_IMAGES = 4;
export const MAX_LISTING_IMAGE_SIZE = 5 * 1024 * 1024;
export const LISTING_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(price);
}

type ActiveListingFilters = {
  query?: string;
  category?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
};

export async function getActiveListings(
  filters: ActiveListingFilters = {},
): Promise<{ listings: Listing[]; count: number; page: number; pageSize: number }> {
  const supabase = await createServerClient();
  const pageSize = Math.min(Math.max(filters.pageSize ?? 12, 1), 24);
  const page = Math.max(filters.page ?? 1, 1);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("listings")
    .select("*, profiles:user_id(id, name, avatar_url, is_verified_seller, created_at, updated_at)", {
      count: "exact",
    })
    .eq("status", "active");

  if (filters.query) {
    const safeQuery = filters.query.replace(/[%_]/g, "");
    query = query.or(`title.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%`);
  }

  if (filters.category && filters.category !== "All") {
    query = query.eq("category", filters.category);
  }

  if (filters.sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("price", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    listings: data ?? [],
    count: count ?? 0,
    page,
    pageSize,
  };
}

export async function getActiveListing(id: string): Promise<Listing | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, profiles:user_id(id, name, avatar_url, is_verified_seller, created_at, updated_at)")
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
}

export async function getUserListings(userId: string): Promise<Listing[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, profiles:user_id(id, name, avatar_url, is_verified_seller, created_at, updated_at)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getUserListing(
  userId: string,
  listingId: string,
): Promise<Listing | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", userId)
    .eq("id", listingId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
}

export async function getRelatedListings(listing: Listing): Promise<Listing[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, profiles:user_id(id, name, avatar_url, is_verified_seller, created_at, updated_at)")
    .eq("status", "active")
    .eq("category", listing.category)
    .neq("id", listing.id)
    .limit(4);

  if (error) {
    return [];
  }

  return data ?? [];
}

export function groupListingsByStatus(listings: Listing[]) {
  const statuses: ListingStatus[] = ["active", "sold", "draft", "archived"];

  return statuses.map((status) => ({
    status,
    listings: listings.filter((listing) => listing.status === status),
  }));
}

export function validateListingInput(input: {
  title: string;
  description: string;
  price: string;
  category: string;
  images: File[];
  requireImages?: boolean;
}): string | null {
  if (input.title.trim().length < 3) {
    return "Please enter a title with at least 3 characters.";
  }

  if (input.description.trim().length < 10) {
    return "Please enter a description with at least 10 characters.";
  }

  const price = Number(input.price);
  if (!Number.isFinite(price) || price <= 0) {
    return "Please enter a valid price.";
  }

  if (!input.category.trim()) {
    return "Please choose a category.";
  }

  if (input.requireImages !== false && input.images.length === 0) {
    return "Please upload at least one product image.";
  }

  if (input.images.length > MAX_LISTING_IMAGES) {
    return `Please upload no more than ${MAX_LISTING_IMAGES} images.`;
  }

  for (const image of input.images) {
    if (!LISTING_IMAGE_TYPES.includes(image.type)) {
      return "Images must be JPG, PNG, or WebP files.";
    }

    if (image.size > MAX_LISTING_IMAGE_SIZE) {
      return "Each image must be 5 MB or smaller.";
    }
  }

  return null;
}
