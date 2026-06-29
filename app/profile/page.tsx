import { updateProfile } from "@/app/actions/auth";
import { SectionContainer } from "@/components/SectionContainer";
import { getProfile } from "@/lib/profiles";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

export const metadata = createPageMetadata({
  title: "Profile",
  description: "Manage your Faceless Marketplace profile.",
  path: "/profile",
});

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireUser();
  const profile = await getProfile(user.id);

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
            Your profile
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Account details
          </h1>
          <p className="mt-3 text-neutral-600">
            Joined {profile ? new Date(profile.created_at).toLocaleDateString("en-ZA") : "recently"}
          </p>

          <form
            action={updateProfile}
            className="mt-8 space-y-5 rounded-3xl border border-neutral-200 p-5 sm:p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-neutral-900"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                defaultValue={profile?.name ?? ""}
                required
                minLength={2}
                className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
              />
            </div>

            <div>
              <label
                htmlFor="avatar_url"
                className="block text-sm font-semibold text-neutral-900"
              >
                Avatar URL
              </label>
              <input
                id="avatar_url"
                name="avatar_url"
                type="url"
                defaultValue={profile?.avatar_url ?? ""}
                className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
            >
              Save profile
            </button>
          </form>
        </div>
      </SectionContainer>
    </main>
  );
}
