export const SITE_NAME = "Faceless Marketplace";
export const SITE_TAGLINE = "A trusted way to buy and sell online.";
export const CONTACT_EMAIL = "fatimazahramoola@gmail.com";

export const BRAND_COLOR = "#3F2B96";
export const BRAND_ACCENT_BG = "#F4F1FF";
export const BRAND_ACCENT_BORDER = "#D9D1FF";

export const WAITLIST_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Faceless Marketplace Waitlist")}`;

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const HERO_BADGE =
  "For side hustles, small businesses, and everyday sellers.";

export const HERO_HEADLINE = "Trusted online selling for everyone.";

export const HERO_SUBHEADING =
  "Whether you're selling a once-off item, a handmade product, or building a side business, Faceless Marketplace helps buyers and sellers transact with confidence through a trusted middleman.";

export const HERO_TRUST_POINTS = [
  "Buyer Protection",
  "Seller Protection",
  "Secure Payments",
  "Dispute Resolution",
] as const;

export const WHY_FACELESS_HEADING = "Why Faceless?";

export const WHY_FACELESS_SUBHEADING =
  "Most online selling forces you to choose between risky person-to-person deals and complicated retail setups. Faceless gives everyday sellers a trusted way to sell — with protection built in.";

export const POSITIONING_HEADING =
  "More trusted than classifieds. Simpler than becoming an online retailer.";

export const POSITIONING_INTRO =
  "Most online selling options force you into one of two extremes: risky person-to-person transactions that rely entirely on trust, or full online retail platforms that can be overwhelming for everyday sellers.";

export const POSITIONING_BODY =
  "Faceless Marketplace sits in the middle. Whether you're selling a once-off item, running a side hustle, or growing a small business, Faceless helps buyers and sellers transact with confidence through a trusted middleman.";

export const MARKET_COMPARISON = [
  {
    label: "Classifieds",
    points: ["Direct payments", "Trust strangers", "Limited protection"],
    highlight: false,
  },
  {
    label: "Faceless Marketplace",
    points: [
      "Trusted middleman",
      "Buyer and seller protection",
      "Built for everyday sellers",
    ],
    highlight: true,
  },
  {
    label: "Online Retailer",
    points: ["Formal onboarding", "Store setup", "More complexity"],
    highlight: false,
  },
] as const;

export const ROADMAP_LAUNCH = [
  "Buyer protection",
  "Seller protection",
  "Secure transactions",
] as const;

export const ROADMAP_FUTURE = [
  "Delivery integration",
  "Verified sellers",
  "Seller profiles",
  "Marketplace search",
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is Faceless Marketplace?",
    answer:
      "Faceless Marketplace is a trusted way to buy and sell online. We sit between buyers and sellers as a middleman — so side hustlers, once-off sellers, and small businesses can sell without building a full online store, and buyers can purchase with confidence.",
  },
  {
    question: "How does it work?",
    answer:
      "The buyer pays Faceless, we hold the funds securely, the seller ships or delivers the item, and once the buyer confirms receipt, we release payment to the seller. If something goes wrong, our dispute process helps resolve it fairly.",
  },
  {
    question: "Why is it safer?",
    answer:
      "Faceless is more trusted than classifieds because we sit in the middle of every transaction — buyers never send money directly to strangers, and sellers know payment is verified before they ship. It's simpler than becoming a traditional online retailer, but with the buyer and seller protection you'd expect from a trusted marketplace.",
  },
  {
    question: "When will it launch?",
    answer:
      "We're currently in pre-launch and building the platform. Join our waitlist to be notified when Faceless Marketplace goes live in South Africa.",
  },
  {
    question: "Who can sell?",
    answer:
      "Anyone — side hustlers, once-off sellers, and small businesses alike. You don't need your own website, a complicated setup, or formal retailer status. Faceless gives you a simple way to reach buyers with built-in trust and payment confidence.",
  },
  {
    question: "Can anyone sell on Faceless Marketplace?",
    answer:
      "Yes. Faceless is designed so that everyday people — not just established businesses — can become online sellers. You'll need to follow our seller guidelines and comply with applicable laws, but no prior e-commerce experience is required.",
  },
  {
    question: "What fees might apply?",
    answer:
      "Fee structures will be published before launch. Our goal is to keep pricing transparent and fair for both buyers and sellers. Specific rates are subject to final review and will be clearly communicated when the platform opens.",
  },
] as const;
