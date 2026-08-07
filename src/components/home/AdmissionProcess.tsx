"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

const steps = [
  { title: "Career Consultation", description: "A free session to understand your goals, background and budget." },
  { title: "University Shortlisting", description: "We match you against every partner university's data." },
  { title: "Application", description: "We handle the paperwork-heavy parts of applying." },
  { title: "Documentation", description: "Verification and submission, tracked end-to-end." },
  { title: "Scholarship & Loan", description: "We check eligibility and coordinate with lenders." },
  { title: "Admission Confirmed", description: "Your seat is locked in with the right university." },
  { title: "Orientation", description: "Onboarding support as you start your program." },
];

export default function AdmissionProcess() {
  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From first call to confirmed admission"
          align="center"
        />
        <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={revealItem} className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-950 font-display text-sm font-semibold text-gold-400">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-green-950">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-green-900/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
