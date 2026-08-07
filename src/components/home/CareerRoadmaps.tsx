"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const roadmaps = [
  {
    from: "Software Engineer",
    fromSalary: "₹7 LPA",
    program: "Online MBA — Product Mgmt",
    to: "Product Manager",
    toSalary: "₹18 LPA",
  },
  {
    from: "Marketing Executive",
    fromSalary: "₹6 LPA",
    program: "Online MBA — Marketing",
    to: "Marketing Manager",
    toSalary: "₹13.5 LPA",
  },
  {
    from: "Operations Associate",
    fromSalary: "₹5.5 LPA",
    program: "Online MBA — Operations",
    to: "Operations Manager",
    toSalary: "₹11 LPA",
  },
];

export default function CareerRoadmaps() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Career Roadmaps"
          title="We don't sell degrees. We plan career moves."
          description="Illustrative outcomes based on past learner trajectories — your advisor builds the specific roadmap for your role and industry."
          align="center"
        />
        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
          {roadmaps.map((r) => (
            <motion.div
              key={r.from}
              variants={revealItem}
              className="rounded-2xl border border-green-900/8 bg-white p-7"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-900/40">
                    Today
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-green-950">
                    {r.from}
                  </p>
                  <p className="text-sm text-green-900/50">{r.fromSalary}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-green-900/25" />
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    Outcome*
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-green-950">
                    {r.to}
                  </p>
                  <p className="text-sm font-semibold text-gold-600">{r.toSalary}</p>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-cream-50 px-4 py-3 text-center text-sm font-medium text-green-900/70">
                {r.program}
              </div>
            </motion.div>
          ))}
        </RevealGroup>
        <p className="mt-6 text-center text-xs text-green-900/40">
          *Illustrative outcomes based on past learner journeys, not guaranteed.
        </p>
      </Container>
    </section>
  );
}
