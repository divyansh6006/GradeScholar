"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { successStories } from "@/data/content";
import { ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessStories() {
  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Student Success" title="Real career transitions, not testimonials" />
        </div>
        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {successStories.map((s) => (
            <motion.div
              key={s.name}
              variants={revealItem}
              className="rounded-2xl border border-green-900/8 bg-white p-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-950 font-display text-sm font-semibold text-gold-400">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-950">{s.name}</p>
                  <p className="text-xs text-green-900/45">{s.program} · {s.university}</p>
                </div>
              </div>
              <div className="my-5 h-px bg-green-900/8" />
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-900/40">
                    {s.fromRole}
                  </p>
                  <p className="font-display text-sm font-semibold text-green-950">{s.fromSalary}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-green-900/25 shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {s.toRole}
                  </p>
                  <p className="font-display text-sm font-semibold text-green-950">{s.toSalary}</p>
                </div>
              </div>
              <Quote className="mt-5 h-5 w-5 text-gold-500/50" />
              <p className="mt-2 text-sm leading-relaxed text-green-900/70">&ldquo;{s.quote}&rdquo;</p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
