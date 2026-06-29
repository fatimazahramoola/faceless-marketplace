import type { ReactNode } from "react";
import { cn } from "./utils";
import { Badge } from "./Badge";

type PageHeaderProps = {
  badge?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function PageHeader({
  badge,
  title,
  description,
  action,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          {badge ? <Badge>{badge}</Badge> : null}
          <div className="space-y-3">
            <h1 className={cn("text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl", titleClassName)}>
              {title}
            </h1>
            {description ? (
              <p className={cn("max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </div>
  );
}
