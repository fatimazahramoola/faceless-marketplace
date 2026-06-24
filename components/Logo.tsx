import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md";
  showText?: boolean;
  linkToHome?: boolean;
};

const sizeClasses = {
  sm: "h-12",
  md: "h-14",
} as const;

export function Logo({ size = "md", showText = true, linkToHome = false }: LogoProps) {
  const content = (
    <div className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="Faceless Marketplace"
        className={`${sizeClasses[size]} w-auto`}
      />
      {showText && (
        <div>
          <div className="text-xl font-bold tracking-wide text-neutral-900">
            FACELESS
          </div>
          <div className="text-xs tracking-[0.2em] text-neutral-500">
            MARKETPLACE
          </div>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}
