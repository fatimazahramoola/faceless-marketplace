import Link from "next/link";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo linkToHome size="md" />

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-4 sm:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#waitlist"
            className="inline-flex items-center justify-center rounded-xl bg-[#3F2B96] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:px-8 sm:py-4 sm:text-base"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
