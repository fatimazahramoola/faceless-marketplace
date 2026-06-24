import { WAITLIST_MAILTO } from "@/lib/constants";

type WaitlistButtonProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children?: string;
};

export function WaitlistButton({
  variant = "primary",
  className = "",
  children = "Join Waitlist",
}: WaitlistButtonProps) {
  const baseClasses =
    "inline-flex min-h-11 w-full items-center justify-center rounded-2xl px-8 py-4 font-semibold transition sm:w-auto";

  const variantClasses =
    variant === "primary"
      ? "bg-[#3F2B96] text-white hover:opacity-90"
      : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50";

  return (
    <a
      href={WAITLIST_MAILTO}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </a>
  );
}
