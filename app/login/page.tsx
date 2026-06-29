import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { SectionContainer } from "@/components/SectionContainer";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Log in",
  description: "Log in to manage Faceless Marketplace listings and orders.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <main className="bg-white">
      <SectionContainer className="py-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]">
            Welcome back
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Log in to Faceless
          </h1>
        </div>
        <div className="mt-8">
          <Suspense>
            <AuthForm mode="login" />
          </Suspense>
        </div>
      </SectionContainer>
    </main>
  );
}
