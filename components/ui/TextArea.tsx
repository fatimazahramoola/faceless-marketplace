import type { TextareaHTMLAttributes } from "react";
import { cn } from "./utils";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

export function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20",
        className,
      )}
      {...props}
    />
  );
}
