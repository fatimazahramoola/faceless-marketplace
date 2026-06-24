import { SectionContainer } from "./SectionContainer";
import {
  MARKET_COMPARISON,
  POSITIONING_BODY,
  POSITIONING_HEADING,
  POSITIONING_INTRO,
} from "@/lib/constants";

export function PositioningSection() {
  return (
    <SectionContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          {POSITIONING_HEADING}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
          {POSITIONING_INTRO}
        </p>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
          {POSITIONING_BODY}
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 md:grid md:grid-cols-3 md:items-stretch md:gap-6">
        {MARKET_COMPARISON.map((column, index) => (
          <div key={column.label} className="flex w-full flex-col items-center md:contents">
            <div
              className={`w-full rounded-3xl p-6 sm:p-8 ${
                column.highlight
                  ? "border-2 border-[#3F2B96] bg-[#F4F1FF]"
                  : "border border-neutral-200 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-bold sm:text-xl ${
                  column.highlight ? "text-[#3F2B96]" : "text-neutral-900"
                }`}
              >
                {column.label}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600 sm:text-base">
                {column.points.map((point) => (
                  <li key={point}>
                    {column.highlight ? `✓ ${point}` : point}
                  </li>
                ))}
              </ul>
            </div>
            {index < MARKET_COMPARISON.length - 1 && (
              <span
                className="py-1 text-2xl text-[#3F2B96] md:hidden"
                aria-hidden
              >
                ↓
              </span>
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
