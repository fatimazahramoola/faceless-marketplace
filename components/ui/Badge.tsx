import type { ReactNode } from "react";
import { cn } from "./utils";

type BadgeVariant = "info" | "success" | "warning" | "neutral";

type BadgeProps = {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
};

const badgeStyles: Record<BadgeVariant, string> = {
  info: "inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#7B3FE4]",
  success: "inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700",
  warning: "inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900",
  neutral: "inline-flex rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700",
};

export function Badge({
  variant = "info",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span className={cn(badgeStyles[variant], className)}>{children}</span>
  );
}
