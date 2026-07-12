"use client";

import { useState } from "react";

export default function AccordionItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-start transition-colors hover:text-emerald-700"
        aria-expanded={isOpen}
      >
        <span className="pe-4 text-base font-semibold text-charcoal">{question}</span>
        <span
          className={`shrink-0 rounded-full bg-emerald-50 p-1.5 text-emerald-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-stone-500">{answer}</p>
        </div>
      </div>
    </div>
  );
}
