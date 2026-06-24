import Link from "next/link";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-5">
        <Logo linkToHome compact size="md" />

        <div className="flex shrink-0 items-center gap-3 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#waitlist"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#7B3FE4] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:px-8 sm:py-3"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
