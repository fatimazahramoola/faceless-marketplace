import type { ReactNode } from "react";
import { cn } from "./utils";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={cn("rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-8 text-center", className)}>
      <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 sm:text-base">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
