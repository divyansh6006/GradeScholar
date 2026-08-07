"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import {
  UserRound,
  ScanSearch,
  Award,
  FileCheck2,
  ClipboardList,
  HeartHandshake,
  Wallet,
  LifeBuoy,
} from "lucide-react";

const reasons = [
  { icon: UserRound, title: "Expert Career Counselling" },
  { icon: ScanSearch, title: "Personalized University Matching" },
  { icon: Award, title: "Scholarship Guidance" },
  { icon: FileCheck2, title: "Documentation Support" },
  { icon: ClipboardList, title: "Admission Tracking" },
  { icon: HeartHandshake, title: "Dedicated Success Manager" },
  { icon: Wallet, title: "EMI & Loan Assistance" },
  { icon: LifeBuoy, title: "Post-Admission Support" },
];

export default function WhyTrustUs() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Students Trust Us"
          title="End-to-end support, not a one-time recommendation"
          align="center"
        />
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title }) => (
            <motion.div
              key={title}
              variants={revealItem}
              className="flex items-center gap-4 rounded-2xl border border-green-900/8 bg-white p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/10">
                <Icon className="h-5 w-5 text-gold-600" />
              </div>
              <p className="text-sm font-semibold text-green-950 leading-snug">{title}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
