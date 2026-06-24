import Link from "next/link";
import { Logo } from "./Logo";
import {
  CONTACT_EMAIL,
  FOOTER_LINKS,
  SITE_TAGLINE,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 sm:mt-24">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:flex md:flex-row md:justify-between">
          <div className="sm:col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 max-w-sm text-sm text-neutral-600 sm:text-base">
              {SITE_TAGLINE}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900">Links</h4>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-neutral-600 transition hover:text-[#7B3FE4] sm:min-h-0 sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900">Contact</h4>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block break-all text-sm text-[#7B3FE4] hover:underline sm:text-base"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Faceless Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
