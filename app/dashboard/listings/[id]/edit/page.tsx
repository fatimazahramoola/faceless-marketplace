import { notFound } from "next/navigation";
import { ListingEditForm } from "@/components/ListingEditForm";
import { SectionContainer } from "@/components/SectionContainer";
import { getUserListing } from "@/lib/listings";
import { createPageMetadata } from "@/lib/metadata";
import { requireUser } from "@/lib/supabase/server";

type EditListingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = createPageMetadata({
  title: "Edit listing",
  description: "Edit a Faceless Marketplace listing.",
  path: "/dashboard",
});

export const dynamic = "force-dynamic";

export default async function EditListingPage({ params }: EditListingPageProps) {
  const user = await requireUser();
  const { id } = await params;
  const listing = await getUserListing(user.id, id);

  if (!listing) {
    notFound();
  }

  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
            Listing management
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Edit listing
          </h1>
          <div className="mt-8">
            <ListingEditForm listing={listing} />
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
