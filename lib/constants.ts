export const SITE_NAME = "Faceless Marketplace";
export const SITE_TAGLINE = "Your trusted middleman for safer transactions.";
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

export const FAQ_ITEMS = [
  {
    question: "What is Faceless Marketplace?",
    answer:
      "Faceless Marketplace is an online marketplace where anyone can buy or sell with confidence. We act as a trusted middleman, holding payment securely until both buyer and seller are satisfied — so you never have to send money directly to a stranger.",
  },
  {
    question: "How does it work?",
    answer:
      "The buyer pays Faceless, we hold the funds securely, the seller ships or delivers the item, and once the buyer confirms receipt, we release payment to the seller. If something goes wrong, our dispute process helps resolve it fairly.",
  },
  {
    question: "Why is it safer?",
    answer:
      "Traditional marketplaces often leave buyers and sellers to trust each other upfront. Faceless sits in the middle: buyers get protection if items don't arrive or aren't as described, and sellers know payment is verified before they ship.",
  },
  {
    question: "When will it launch?",
    answer:
      "We're currently in pre-launch and building the platform. Join our waitlist to be notified when Faceless Marketplace goes live in South Africa.",
  },
  {
    question: "Who can sell?",
    answer:
      "Anyone who wants to sell online — you don't need your own website, a complicated setup, or formal retailer status. Faceless gives you a simple way to reach buyers with built-in trust and payment confidence.",
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
