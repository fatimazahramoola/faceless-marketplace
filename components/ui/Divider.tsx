import { cn } from "./utils";

type DividerProps = {
  className?: string;
};

export function Divider({ className = "" }: DividerProps) {
  return <div className={cn("h-px bg-neutral-200", className)} />;
}
