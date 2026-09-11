"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does Naano find the right creators?",
    answer:
      "Every creator is manually vetted before joining the marketplace. You can filter by niche, follower range, and price, and each profile shows an audience fit score against your target buyer.",
  },
  {
    question: "How does per-post pricing work?",
    answer:
      "Creators set their own fixed price per sponsored post — no impression-based billing and no long-term contracts. You see the price before you book, and campaign spend is always separate from your plan fee.",
  },
  {
    question: "How does attribution actually work?",
    answer:
      "Each collaboration gets a unique tracking link. When someone clicks it in the creator's LinkedIn post, we log the click and attribute any resulting lead or pipeline back to that specific post.",
  },
  {
    question: "What's the difference between Self-Serve and Managed?",
    answer:
      "Self-Serve gives you full marketplace access to run campaigns yourself. Managed hands the strategy, creator sourcing, brief creation, and reporting to Naano's team for a flat monthly fee.",
  },
  {
    question: "Do you handle creator payouts?",
    answer:
      "Yes — Naano handles invoicing, contracts, and payouts automatically on the Self-Serve plan, and on your behalf on Managed. You never chase a creator for an invoice.",
  },
  {
    question: "Can I upgrade or cancel any time?",
    answer:
      "Both plans are month-to-month with no lock-in. Upgrade, downgrade, or cancel whenever your campaign needs change.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-16 py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="divide-y divide-border border-t border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
