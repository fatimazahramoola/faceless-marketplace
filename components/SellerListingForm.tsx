"use client";

import { useActionState } from "react";
import { createListing } from "@/app/actions/listings";
import { LISTING_CATEGORIES } from "@/lib/constants";
import type { ListingFormState } from "@/lib/types";

const initialState: ListingFormState = {
  success: false,
  message: "",
};

export function SellerListingForm() {
  const [state, formAction, pending] = useActionState(
    createListing,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-neutral-900"
        >
          Listing title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={3}
          maxLength={120}
          placeholder="Vintage denim jacket"
          className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-neutral-900"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          placeholder="Describe the item condition, size, colour, and anything buyers should know."
          className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-neutral-900"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue="Other"
          className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
        >
          {LISTING_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-semibold text-neutral-900"
        >
          Price
        </label>
        <div className="mt-2 flex rounded-xl border border-neutral-300 bg-white focus-within:border-[#7B3FE4] focus-within:ring-2 focus-within:ring-[#7B3FE4]/20">
          <span className="flex min-h-11 items-center border-r border-neutral-200 px-4 text-sm font-semibold text-neutral-500">
            R
          </span>
          <input
            id="price"
            name="price"
            type="number"
            required
            min="1"
            step="0.01"
            placeholder="450.00"
            className="min-h-11 w-full rounded-r-xl px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="images"
          className="block text-sm font-semibold text-neutral-900"
        >
          Product images
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          required
          className="mt-2 block w-full rounded-xl border border-dashed border-[#D9D1FF] bg-[#F4F1FF] px-4 py-5 text-sm text-neutral-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#7B3FE4] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        <p className="mt-2 text-xs text-neutral-500">
          Upload 1-4 JPG, PNG, or WebP images. Each image must be 5 MB or less.
        </p>
      </div>

      {state.message && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Creating listing..." : "Create listing"}
      </button>
    </form>
  );
}
