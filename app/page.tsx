import { HeroTrustPanel } from "@/components/HeroTrustPanel";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PositioningSection } from "@/components/PositioningSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SectionContainer } from "@/components/SectionContainer";
import { WaitlistButton } from "@/components/WaitlistButton";
import { WaitlistSection } from "@/components/WaitlistSection";
import {
  HERO_BADGE,
  HERO_CTA_TRUST_LINES,
  HERO_HEADLINE,
  HERO_SUBHEADING,
  HERO_TRUST_POINTS,
  WHY_FACELESS_HEADING,
  WHY_FACELESS_SUBHEADING,
} from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  description: HERO_SUBHEADING,
  path: "/",
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SectionContainer className="flex min-h-0 items-center py-12 lg:min-h-[calc(100vh-88px)] lg:py-0">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#3F2B96]">
              {HERO_BADGE}
            </div>

            <h1 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {HERO_HEADLINE}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:mt-8 sm:text-xl">
              {HERO_SUBHEADING}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <WaitlistButton />
              <a
                href="#how-it-works"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-neutral-300 px-8 py-4 font-semibold text-neutral-700 transition hover:bg-neutral-50 sm:w-auto"
              >
                Learn More
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 sm:text-sm">
              {HERO_CTA_TRUST_LINES.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-neutral-700 sm:mt-10 sm:gap-3 sm:text-sm">
              {HERO_TRUST_POINTS.map((point) => (
                <span key={point} className="whitespace-nowrap">
                  ✓ {point}
                </span>
              ))}
            </div>
          </div>

          <HeroTrustPanel />
        </div>
      </SectionContainer>

      <HowItWorksSection />

      <SectionContainer id="learn-more" className="scroll-mt-20 py-12 sm:py-16">
        <h2 className="text-center text-3xl font-bold text-neutral-900 sm:text-4xl">
          {WHY_FACELESS_HEADING}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-neutral-600 sm:text-lg">
          {WHY_FACELESS_SUBHEADING}
        </p>

        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-neutral-900 sm:text-xl">
              Traditional Marketplace
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-neutral-600 sm:mt-6 sm:space-y-4 sm:text-base">
              <li>Buyer sends money directly</li>
              <li>Seller hopes payment is real</li>
              <li>Trust is required upfront</li>
              <li>Disputes are difficult</li>
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-[#3F2B96] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#3F2B96] sm:text-xl">
              Faceless Marketplace
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-neutral-700 sm:mt-6 sm:space-y-4 sm:text-base">
              <li>✓ Payment held securely</li>
              <li>✓ Seller verifies payment first</li>
              <li>✓ Buyer receives protection</li>
              <li>✓ Built-in dispute resolution</li>
            </ul>
          </div>
        </div>
      </SectionContainer>

      <PositioningSection />
      <RoadmapSection />
      <WaitlistSection />
    </main>
  );
}
