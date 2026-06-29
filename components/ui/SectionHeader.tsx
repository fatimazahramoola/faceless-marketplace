import { cn } from "./utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h2 className={cn("text-3xl font-bold text-neutral-900", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <p className={cn("max-w-2xl text-base leading-relaxed text-neutral-600", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
