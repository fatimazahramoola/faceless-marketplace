import { SectionContainer } from "./SectionContainer";
import {
  HOW_IT_WORKS_HEADING,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_SUBHEADING,
} from "@/lib/constants";

export function HowItWorksSection() {
  return (
    <SectionContainer id="how-it-works" className="scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          {HOW_IT_WORKS_HEADING}
        </h2>
        <p className="mt-4 text-base text-neutral-600 sm:text-lg">
          {HOW_IT_WORKS_SUBHEADING}
        </p>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="relative mx-auto mt-10 max-w-md lg:hidden">
        <div
          className="absolute left-5 top-3 bottom-3 w-0.5 bg-[#D9D1FF]"
          aria-hidden
        />
        <ol className="space-y-6">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li key={step.step} className="relative flex gap-4 pl-0">
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  step.highlight
                    ? "bg-[#3F2B96] text-white ring-4 ring-[#F4F1FF]"
                    : "border-2 border-[#D9D1FF] bg-white text-[#3F2B96]"
                }`}
              >
                {step.step}
              </div>
              <div
                className={`flex-1 rounded-2xl p-4 ${
                  step.highlight
                    ? "border-2 border-[#3F2B96] bg-[#F4F1FF]"
                    : "border border-neutral-200 bg-white"
                }`}
              >
                <p
                  className={`font-semibold ${
                    step.highlight ? "text-[#3F2B96]" : "text-neutral-900"
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{step.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="relative mx-auto mt-14 hidden max-w-6xl lg:block">
        <div
          className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-[#D9D1FF]"
          aria-hidden
        />
        <ol className="grid grid-cols-5 gap-4">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li key={step.step} className="flex flex-col items-center text-center">
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  step.highlight
                    ? "bg-[#3F2B96] text-white ring-4 ring-[#F4F1FF]"
                    : "border-2 border-[#D9D1FF] bg-white text-[#3F2B96]"
                }`}
              >
                {step.step}
              </div>
              <div
                className={`mt-4 w-full rounded-2xl p-4 ${
                  step.highlight
                    ? "border-2 border-[#3F2B96] bg-[#F4F1FF] shadow-sm"
                    : "border border-neutral-200 bg-white"
                }`}
              >
                <p
                  className={`text-sm font-semibold leading-snug ${
                    step.highlight ? "text-[#3F2B96]" : "text-neutral-900"
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {step.subtitle}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}
