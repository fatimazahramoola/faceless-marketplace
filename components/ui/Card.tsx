import type { ReactNode } from "react";
import { cn } from "./utils";

type CardVariant = "default" | "subtle";

type CardProps = {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

const cardStyles: Record<CardVariant, string> = {
  default: "rounded-3xl border border-neutral-200 bg-white",
  subtle: "rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF]",
};

export function Card({
  variant = "default",
  children,
  className = "",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag className={cn(cardStyles[variant], className)}>{children}</Tag>
  );
}
