import type { ReactNode } from "react";
import { cn } from "./utils";

type FormLabelProps = {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export function FormLabel({
  htmlFor,
  children,
  className = "",
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-semibold text-neutral-900", className)}
    >
      {children}
    </label>
  );
}
