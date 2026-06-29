import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { SectionContainer } from "@/components/SectionContainer";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Sign up",
  description: "Create a Faceless Marketplace account to buy and sell safely.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
            Join Faceless
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-4 text-base text-neutral-600">
            One account lets you list items, save favourites, and track orders.
          </p>
        </div>
        <div className="mt-8">
          <Suspense>
            <AuthForm mode="signup" />
          </Suspense>
        </div>
      </SectionContainer>
    </main>
  );
}
