import { SectionContainer } from "./SectionContainer";
import { WaitlistButton } from "./WaitlistButton";

export function WaitlistSection() {
  return (
    <SectionContainer id="waitlist" className="py-24">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-[#D9D1FF] bg-[#F4F1FF] px-8 py-12 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          Be first to know
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Faceless Marketplace is launching soon. Join the waitlist and we&apos;ll
          notify you when we go live.
        </p>
        <div className="mt-8">
          <WaitlistButton />
        </div>
      </div>
    </SectionContainer>
  );
}
