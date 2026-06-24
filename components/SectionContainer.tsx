import type { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
};

export function SectionContainer({
  children,
  className = "",
  as: Tag = "section",
  id,
}: SectionContainerProps) {
  return (
    <Tag id={id} className={`mx-auto max-w-7xl px-6 ${className}`}>
      {children}
    </Tag>
  );
}
