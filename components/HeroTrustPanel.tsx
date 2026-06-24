import { HERO_TRUST_PANEL_ITEMS } from "@/lib/constants";

export function HeroTrustPanel() {
  return (
    <div className="hidden rounded-[32px] border border-neutral-200 bg-white p-8 shadow-xl lg:block">
      <p className="text-center text-sm font-medium uppercase tracking-wider text-neutral-500">
        Built for trust
      </p>

      <ul className="mt-8 space-y-5">
        {HERO_TRUST_PANEL_ITEMS.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F1FF] text-sm font-bold text-[#3F2B96]"
              aria-hidden
            >
              ✓
            </span>
            <div>
              <p className="font-semibold text-neutral-900">{item.title}</p>
              <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
