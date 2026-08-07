"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import type { University } from "@/lib/data";
import { ShieldCheck, Lock, Ban, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const commitments = [
  {
    icon: ShieldCheck,
    title: "Verified Partner Universities",
    description: "Every institution is independently checked for UGC entitlement before we recommend it.",
  },
  {
    icon: Ban,
    title: "No Hidden Fees",
    description: "Our counselling is completely free. We're compensated by universities, never by you.",
  },
  {
    icon: Lock,
    title: "Your Data Stays Confidential",
    description: "Your details are shared only with the university you choose to apply to — never sold or spammed.",
  },
  {
    icon: BadgeCheck,
    title: "Accreditation-First Advice",
    description: "We only recommend NAAC-accredited, UGC-entitled programs valid for employment and higher study.",
  },
];

export default function AccreditationTrust({ universities }: { universities: University[] }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Verified & Accredited"
          title="Every partner university, independently verified"
          description="We don't just list universities — we check UGC entitlement and NAAC accreditation for every program before it reaches you."
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((u) => (
            <motion.div
              key={u.slug}
              variants={revealItem}
              className="flex items-center gap-4 rounded-2xl border border-green-900/8 bg-white p-5"
            >
              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl bg-cream-50 p-2">
                <Image
                  src={u.logo}
                  alt={u.name}
                  width={u.logoWidth}
                  height={u.logoHeight}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-green-950">
                  {u.shortName}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center rounded-full bg-gold-500/10 px-2 py-0.5 text-[11px] font-semibold text-gold-700">
                    NAAC {u.naac}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-900/6 px-2 py-0.5 text-[11px] font-semibold text-green-800">
                    {u.accreditation[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl bg-green-950 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">{description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
