import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "./utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "pill";

const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/50 disabled:opacity-60",
  secondary:
    "inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/50 disabled:opacity-60",
  outline:
    "inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/50 disabled:opacity-60",
  ghost:
    "inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/50 disabled:opacity-60",
  danger:
    "inline-flex min-h-11 items-center justify-center rounded-xl border border-red-200 px-6 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 disabled:opacity-60",
  pill:
    "inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/50 disabled:opacity-60",
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  block?: boolean;
};

export function LinkButton({
  variant = "primary",
  block = false,
  className = "",
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariantStyles[variant],
        block && "w-full",
        className,
      )}
      {...props}
    />
  );
}
