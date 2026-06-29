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

export type ListingCategory =
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Furniture"
  | "Collectibles"
  | "Gaming"
  | "Automotive"
  | "Other";

export type Listing = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  image_urls: string[];
  cover_image_url: string | null;
  category: ListingCategory;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
  profiles?: Profile | null;
};

export type ListingFormState = {
  success: boolean;
  message: string;
  listingId?: string;
};

export type AuthFormState = {
  success: boolean;
  message: string;
};

export type Profile = {
  id: string;
  name: string;
  avatar_url: string | null;
  is_verified_seller: boolean;
  created_at: string;
  updated_at: string;
};
