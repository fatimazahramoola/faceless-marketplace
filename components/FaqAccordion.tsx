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
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-neutral-50"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-neutral-900">
                {item.question}
              </span>
              <span
                className="shrink-0 text-xl text-[#3F2B96] transition-transform"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-neutral-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
