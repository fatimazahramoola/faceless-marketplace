import Link from "next/link";
import { DevicePhoneMobileIcon, HomeIcon, SparklesIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { HeroTrustPanel } from "@/components/HeroTrustPanel";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ListingCard } from "@/components/ListingCard";
import { PositioningSection } from "@/components/PositioningSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SectionContainer } from "@/components/SectionContainer";
import { WaitlistSection } from "@/components/WaitlistSection";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/LinkButton";
import { getActiveListings } from "@/lib/listings";
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

export default async function Home() {
  const { listings: featuredListings } = await getActiveListings({ pageSize: 4 });

  type FeaturedCategory = {
    label: string;
    description: string;
    href: string;
    Icon: typeof DevicePhoneMobileIcon;
  };

  const featuredCategories: FeaturedCategory[] = [
    {
      label: "Electronics",
      description: "Gadgets, devices and accessories",
      href: "/listings?category=Electronics",
      Icon: DevicePhoneMobileIcon,
    },
    {
      label: "Fashion",
      description: "Style, clothing and wearable finds",
      href: "/listings?category=Fashion",
      Icon: ShoppingBagIcon,
    },
    {
      label: "Home",
      description: "Furniture, decor and everyday essentials",
      href: "/listings?category=Home",
      Icon: HomeIcon,
    },
    {
      label: "Collectibles",
      description: "Rare finds, hobbies and unique goods",
      href: "/listings?category=Collectibles",
      Icon: SparklesIcon,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <SectionContainer className="flex min-h-0 items-center py-12 lg:min-h-[calc(100vh-88px)] lg:py-0">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Badge>{HERO_BADGE}</Badge>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {HERO_HEADLINE}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:mt-8 sm:text-xl">
              {HERO_SUBHEADING}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <LinkButton href="#waitlist" variant="primary">
                Join waitlist
              </LinkButton>
              <LinkButton href="#how-it-works" variant="secondary">
                How it works
              </LinkButton>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {HERO_CTA_TRUST_LINES.map((line) => (
                <div key={line} className="rounded-3xl border border-neutral-200 bg-[#F8F8FF] px-4 py-3 text-sm text-neutral-700">
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {HERO_TRUST_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F1FF] text-sm font-bold text-[#7B3FE4]">
                    ✓
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroTrustPanel />
        </div>
      </SectionContainer>

      <SectionContainer className="py-12 sm:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7B3FE4]">
              Featured listings
            </p>
            <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Discover what people are buying now
            </h2>
          </div>
          <LinkButton href="/listings" variant="secondary">
            Browse all listings
          </LinkButton>
        </div>

        {featuredListings.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredListings.map((listing, index) => (
              <ListingCard key={listing.id} listing={listing} priority={index < 4} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No featured listings yet"
            description="We’re getting the marketplace ready. Join the waitlist and be first to know when listings go live."
            action={<LinkButton href="#waitlist">Join waitlist</LinkButton>}
            className="mt-8"
          />
        )}
      </SectionContainer>

      <SectionContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7B3FE4]">
            Discover categories
          </p>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
            Find goods by category
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Popular categories chosen for everyday sellers and buyers.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link key={category.label} href={category.href} className="group">
              <Card className="h-full p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#F4F1FF] text-[#7B3FE4]">
                  <category.Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-6 text-lg font-semibold text-neutral-900">
                  {category.label}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{category.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-[#7B3FE4]">
                  <span>Browse category</span>
                  <span aria-hidden>→</span>
                </div>
              </Card>
            </Link>
          ))}
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

          <div className="rounded-3xl border-2 border-[#7B3FE4] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#7B3FE4] sm:text-xl">
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
