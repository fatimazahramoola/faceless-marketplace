"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logOut } from "@/app/actions/auth";
import { Logo } from "./Logo";
import type { NavLink } from "@/lib/types";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

type NavbarClientProps = {
  links: readonly NavLink[];
  isLoggedIn: boolean;
};

export function NavbarClient({ links, isLoggedIn }: NavbarClientProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeLink = useMemo(
    () => (href: string) =>
      pathname === href || pathname?.startsWith(`${href}/`),
    [pathname],
  );

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null;

    if (typeof window !== "undefined") {
      mediaQuery = window.matchMedia("(min-width: 768px)");
      const handleMediaChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          setOpen(false);
        }
      };
      mediaQuery.addEventListener("change", handleMediaChange);

      return () => {
        mediaQuery?.removeEventListener("change", handleMediaChange);
      };
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => setVisible(false), 250);
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (open && panelRef.current && target && !panelRef.current.contains(target)) {
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocus);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocus);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Logo linkToHome compact size="md" />

        <div className="hidden items-center gap-3 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={activeLink(link.href) ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeLink(link.href)
                    ? "bg-[#7B3FE4] text-white"
                    : "text-neutral-600 hover:bg-[#F4F1FF] hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {isLoggedIn ? (
            <form action={logOut}>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#7B3FE4] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Log out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#7B3FE4] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Log in
            </Link>
          )}
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white p-3 text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 md:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6 transition-transform duration-200" />
          ) : (
            <Bars3Icon className="h-6 w-6 transition-transform duration-200" />
          )}
          <span className="sr-only">Open navigation</span>
        </button>
      </div>

      {(open || visible) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-navigation-title"
          className="fixed inset-0 z-50 flex"
        >
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />

          <div
            ref={panelRef}
            id="mobile-navigation"
            className={`relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white px-5 py-6 shadow-2xl transition-transform duration-200 md:hidden ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 1rem) + 1rem)",
              paddingBottom: "calc(env(safe-area-inset-bottom, 1rem) + 1rem)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p id="mobile-navigation-title" className="text-base font-semibold text-neutral-900">
                  Menu
                </p>
                <p className="mt-1 text-sm text-neutral-500">Browse Faceless</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-100"
              >
                <XMarkIcon className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav className="mt-8 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={activeLink(link.href) ? "page" : undefined}
                  className={`block rounded-3xl px-4 py-3 text-base font-semibold transition ${
                    activeLink(link.href)
                      ? "bg-[#7B3FE4] text-white"
                      : "text-neutral-700 hover:bg-[#F4F1FF]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              {isLoggedIn ? (
                <form action={logOut} onSubmit={() => setOpen(false)}>
                  <button
                    type="submit"
                    className="w-full rounded-3xl bg-[#7B3FE4] px-5 py-4 text-base font-semibold text-white transition hover:opacity-90"
                  >
                    Log out
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-[#7B3FE4] px-5 py-4 text-base font-semibold text-white transition hover:opacity-90"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
