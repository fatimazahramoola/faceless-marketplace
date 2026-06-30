import type { ReactNode } from "react";
import { cn } from "./utils";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={cn("rounded-3xl border border-[#D9D1FF] bg-[#F4F1FF] p-8 text-center", className)}>
      {icon ? <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#7B3FE4] shadow-sm">{icon}</div> : null}
      <h2 className="mt-6 text-xl font-bold text-neutral-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 sm:text-base">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
