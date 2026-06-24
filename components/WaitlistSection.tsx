import { SectionContainer } from "./SectionContainer";
import { WaitlistButton } from "./WaitlistButton";

export function WaitlistSection() {
  return (
    <SectionContainer id="waitlist" className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-[#D9D1FF] bg-[#F4F1FF] px-5 py-10 text-center sm:px-8 sm:py-12">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl">
          Be first to know
        </h2>
        <p className="mt-4 text-base text-neutral-600 sm:text-lg">
          Faceless Marketplace is launching soon. Join the waitlist and we&apos;ll
          notify you when we go live.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistButton />
        </div>
      </div>
    </SectionContainer>
  );
}
