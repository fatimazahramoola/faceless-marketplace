import { createReview } from "@/app/actions/marketplace";
import { SectionContainer } from "@/components/SectionContainer";
import { getSellerReviews } from "@/lib/marketplace";
import { createPageMetadata } from "@/lib/metadata";
import { getProfile } from "@/lib/profiles";
import { getCurrentUser } from "@/lib/supabase/server";

type UserPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = createPageMetadata({
  title: "Seller profile",
  description: "View a Faceless Marketplace seller profile and reviews.",
  path: "/users",
});

export const dynamic = "force-dynamic";

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const [profile, reviews, user] = await Promise.all([
    getProfile(id),
    getSellerReviews(id),
    getCurrentUser(),
  ]);

  const average =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : 0;

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
            Seller profile
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {profile?.name ?? "Faceless seller"}
          </h1>
          <p className="mt-3 text-sm text-neutral-600">
            Joined {profile ? new Date(profile.created_at).toLocaleDateString("en-ZA") : "recently"} ·{" "}
            {profile?.is_verified_seller ? "Verified seller" : "Verification coming soon"}
          </p>
          <p className="mt-3 font-semibold text-[#7B3FE4]">
            {reviews.length > 0 ? `${average.toFixed(1)} / 5 from ${reviews.length} reviews` : "No reviews yet"}
          </p>

          {user && user.id !== id && (
            <form action={createReview} className="mt-8 space-y-4 rounded-3xl border border-neutral-200 p-5">
              <input type="hidden" name="seller_id" value={id} />
              <div>
                <label htmlFor="rating" className="block text-sm font-semibold text-neutral-900">
                  Rating
                </label>
                <select id="rating" name="rating" className="mt-2 min-h-11 rounded-xl border border-neutral-300 bg-white px-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} stars
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-semibold text-neutral-900">
                  Review
                </label>
                <textarea id="comment" name="comment" required minLength={5} rows={4} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3" />
              </div>
              <button className="min-h-11 rounded-xl bg-[#7B3FE4] px-6 font-semibold text-white">
                Leave review
              </button>
            </form>
          )}

          <div className="mt-8 space-y-4">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-neutral-200 p-5">
                <p className="font-bold text-neutral-900">{review.rating} / 5</p>
                <p className="mt-2 text-sm text-neutral-600">{review.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
