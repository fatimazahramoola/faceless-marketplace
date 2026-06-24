import type { Listing } from "@/lib/types";
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

export async function getActiveListings(): Promise<Listing[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getActiveListing(id: string): Promise<Listing | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
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

export function validateListingInput(input: {
  title: string;
  description: string;
  price: string;
  images: File[];
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

  if (input.images.length === 0) {
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
