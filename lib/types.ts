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
