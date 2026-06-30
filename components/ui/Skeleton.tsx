import type { ReactNode } from "react";
import { cn } from "./utils";

type SkeletonProps = {
  className?: string;
  children?: ReactNode;
};

export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-3xl bg-neutral-100/80 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
