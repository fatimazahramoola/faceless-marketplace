import type { InputHTMLAttributes } from "react";
import { cn } from "./utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={cn(
        "mt-2 min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20",
        className,
      )}
      {...props}
    />
  );
}
