import type { SelectHTMLAttributes } from "react";
import { cn } from "./utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export function Select({ className = "", ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "min-h-12 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#7B3FE4]/20 disabled:cursor-not-allowed disabled:bg-neutral-100",
        className,
      )}
      {...props}
    />
  );
}
