import { cn } from "./utils";

type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
  className?: string;
};

export function StatCard({
  label,
  value,
  description,
  className = "",
}: StatCardProps) {
  return (
    <div className={cn("rounded-2xl border border-neutral-200 p-5", className)}>
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
      {description ? <p className="mt-2 text-sm text-neutral-600">{description}</p> : null}
    </div>
  );
}
