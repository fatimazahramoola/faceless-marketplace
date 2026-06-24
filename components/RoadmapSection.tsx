import { SectionContainer } from "./SectionContainer";
import { ROADMAP_FUTURE, ROADMAP_LAUNCH } from "@/lib/constants";

export function RoadmapSection() {
  return (
    <SectionContainer className="py-12 sm:py-16">
      <h2 className="text-center text-3xl font-bold text-neutral-900 sm:text-4xl">
        What&apos;s coming
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base text-neutral-600 sm:text-lg">
        We&apos;re launching with the essentials. Here&apos;s what to expect now
        and what&apos;s on the horizon.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-[#3F2B96] bg-[#F4F1FF] p-6 sm:p-8">
          <h3 className="text-lg font-bold text-[#3F2B96] sm:text-xl">
            Available at launch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700 sm:text-base">
            {ROADMAP_LAUNCH.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-neutral-200 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-neutral-900 sm:text-xl">
            Future plans
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-600 sm:text-base">
            {ROADMAP_FUTURE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
