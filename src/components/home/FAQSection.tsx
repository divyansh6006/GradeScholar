"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/data/content";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="FAQs" title="Common questions, answered plainly" align="center" />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-green-900/8 rounded-2xl border border-green-900/8">
          {homeFaqs.map((faq, i) => (
            <div key={faq.question}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-[15px] font-semibold text-green-950">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-green-900/40 transition-transform",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <p className="px-6 pb-5 text-sm leading-relaxed text-green-900/60">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
