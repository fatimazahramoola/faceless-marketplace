import { updateListing } from "@/app/actions/listings";
import { LISTING_CATEGORIES } from "@/lib/constants";
import type { Listing, ListingStatus } from "@/lib/types";

type ListingEditFormProps = {
  listing: Listing;
};

const statuses: ListingStatus[] = ["draft", "active", "sold", "archived"];

export function ListingEditForm({ listing }: ListingEditFormProps) {
  return (
    <form action={updateListing} className="space-y-5 rounded-3xl border border-neutral-200 p-5 sm:p-8">
      <input type="hidden" name="listing_id" value={listing.id} />

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-neutral-900">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={listing.title}
          required
          minLength={3}
          maxLength={120}
          className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-neutral-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={listing.description}
          required
          minLength={10}
          rows={7}
          className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-neutral-900">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            step="0.01"
            defaultValue={listing.price}
            required
            className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-neutral-900">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={listing.category}
            className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          >
            {LISTING_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-neutral-900">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={listing.status}
            className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Save changes
      </button>
    </form>
  );
}
