import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md";
  showText?: boolean;
  compact?: boolean;
  linkToHome?: boolean;
};

const sizeClasses = {
  sm: "h-10 sm:h-12",
  md: "h-10 sm:h-14",
} as const;

export function Logo({
  size = "md",
  showText = true,
  compact = false,
  linkToHome = false,
}: LogoProps) {
  const hideText = !showText || compact;

  const content = (
    <div className="flex items-center gap-2 sm:gap-3">
      <img
        src="/logo.png"
        alt="Faceless Marketplace"
        className={`${sizeClasses[size]} w-auto shrink-0`}
      />
      {showText && (
        <div className={hideText ? "hidden sm:block" : undefined}>
          <div className="text-lg font-bold tracking-wide text-neutral-900 sm:text-xl">
            FACELESS
          </div>
          <div className="text-[10px] tracking-[0.2em] text-neutral-500 sm:text-xs">
            MARKETPLACE
          </div>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex min-h-11 items-center">
        {content}
      </Link>
    );
  }

  return content;
}
