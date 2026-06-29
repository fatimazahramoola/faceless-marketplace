"use server";

import { redirect } from "next/navigation";
import {
  LISTING_IMAGE_BUCKET,
  validateListingInput,
} from "@/lib/listings";
import { createServerClient, requireUser } from "@/lib/supabase/server";
import type { ListingFormState } from "@/lib/types";

const initialError: ListingFormState = {
  success: false,
  message: "Something went wrong. Please try again.",
};

function slugifyFilename(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase() || "jpg";
  const name = filename
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50);

  return `${name || "listing-image"}.${extension}`;
}

export async function createListing(
  _prevState: ListingFormState,
  formData: FormData,
): Promise<ListingFormState> {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = String(formData.get("price") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const images = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File && value.size > 0);

  const validationError = validateListingInput({
    title,
    description,
    price,
    category,
    images,
  });

  if (validationError) {
    return { success: false, message: validationError };
  }

  const user = await requireUser();
  const supabase = await createServerClient();

  let listingId: string | null = null;

  try {
    const imageUrls: string[] = [];
    for (const image of images) {
      const path = `${user.id}/${crypto.randomUUID()}-${slugifyFilename(image.name)}`;
      const { error } = await supabase.storage
        .from(LISTING_IMAGE_BUCKET)
        .upload(path, image, {
          cacheControl: "31536000",
          upsert: false,
        });

      if (error) {
        return { success: false, message: error.message };
      }

      const { data } = supabase.storage
        .from(LISTING_IMAGE_BUCKET)
        .getPublicUrl(path);

      imageUrls.push(data.publicUrl);
    }

    const { data, error } = await supabase
      .from("listings")
      .insert({
        title,
        description,
        price: Number(price),
        user_id: user.id,
        image_urls: imageUrls,
        cover_image_url: imageUrls[0],
        category,
        status: "active",
      })
      .select("id")
      .single();

    if (error || !data) {
      return { success: false, message: error?.message ?? initialError.message };
    }

    listingId = data.id;
  } catch {
    return initialError;
  }

  redirect(`/listings/${listingId}`);
}
