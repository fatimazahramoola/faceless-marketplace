import { SectionContainer } from "./SectionContainer";
import { WaitlistForm } from "./WaitlistForm";
import {
  WAITLIST_SECTION_HEADING,
  WAITLIST_SECTION_SUBHEADING,
  WAITLIST_TRUST_LINES,
} from "@/lib/constants";

export function WaitlistSection() {
  return (
    <SectionContainer id="waitlist" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-[#D9D1FF] bg-[#F4F1FF] px-5 py-10 text-center sm:px-8 sm:py-12">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl">
          {WAITLIST_SECTION_HEADING}
        </h2>
        <p className="mt-4 text-base text-neutral-600 sm:text-lg">
          {WAITLIST_SECTION_SUBHEADING}
        </p>

        <div className="mt-8">
          <WaitlistForm />
        </div>

        <div className="mt-6 flex flex-col gap-1 text-sm text-neutral-500">
          {WAITLIST_TRUST_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
