"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types";

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-200 rounded-3xl border border-neutral-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full min-h-11 items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-neutral-50 sm:gap-4 sm:px-6 sm:py-5"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-neutral-900 sm:text-base">
                {item.question}
              </span>
              <span
                className="shrink-0 text-xl text-[#7B3FE4]"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm leading-relaxed text-neutral-600 sm:px-6 sm:pb-5 sm:text-base">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
