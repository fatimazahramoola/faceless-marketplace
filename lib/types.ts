export type FaqItem = {
  question: string;
  answer: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type WaitlistResult =
  | { success: true; alreadyRegistered?: boolean }
  | { success: false; error: string };

export type HowItWorksStep = {
  step: number;
  title: string;
  subtitle: string;
  highlight?: boolean;
};

export type ListingStatus = "draft" | "active" | "sold" | "archived";

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_urls: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
};

export type ListingFormState = {
  success: boolean;
  message: string;
  listingId?: string;
};
