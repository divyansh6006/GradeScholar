"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Landmark,
  Cpu,
  RefreshCw,
} from "lucide-react";

const audiences = [
  {
    icon: Briefcase,
    title: "Working Professionals",
    description:
      "Upskill without pausing your career — flexible schedules built around your job.",
  },
  {
    icon: GraduationCap,
    title: "Fresh Graduates",
    description: "Build a strong foundation with a degree mapped to real career outcomes.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurs",
    description: "Structured business and leadership frameworks to scale what you've built.",
  },
  {
    icon: Landmark,
    title: "Government Employees",
    description: "Eligible, UGC-recognized programs that support promotions and transfers.",
  },
  {
    icon: Cpu,
    title: "IT Professionals",
    description: "Move from execution roles into product, strategy and leadership tracks.",
  },
  {
    icon: RefreshCw,
    title: "Career Switchers",
    description: "A credible, structured path into a completely new function or industry.",
  },
];

export default function WhoWeHelp() {
  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <Container>
        <SectionHeading
          eyebrow="Who We Help"
          title="Tailored guidance for every career stage"
          description="Our career strategists match your background and goals against every partner university's data — not a one-size-fits-all recommendation."
          align="center"
        />
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={revealItem}
              className="group rounded-2xl border border-green-900/8 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(14,43,8,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-950 transition-colors group-hover:bg-gold-500">
                <Icon className="h-5 w-5 text-gold-400 group-hover:text-green-950" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-green-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-green-900/60">
                {description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
