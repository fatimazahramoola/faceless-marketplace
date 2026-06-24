import Link from "next/link";
import { Logo } from "./Logo";
import {
  CONTACT_EMAIL,
  FOOTER_LINKS,
  SITE_TAGLINE,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <Logo size="sm" />
            <p className="mt-4 max-w-sm text-neutral-600">{SITE_TAGLINE}</p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900">Links</h4>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 transition hover:text-[#3F2B96]"
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
              className="mt-3 inline-block text-[#3F2B96] hover:underline"
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
