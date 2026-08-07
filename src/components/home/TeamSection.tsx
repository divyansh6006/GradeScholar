"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { team } from "@/data/team";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TeamSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <Container>
        <SectionHeading
          eyebrow="Meet Our Experts"
          title="Career strategists, not sales reps"
          description="Every advisor on our team specializes in a specific slice of the admissions process — so you always talk to the right person."
          align="center"
        />
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={revealItem}
              className="rounded-2xl border border-green-900/8 bg-white p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-950 font-display text-lg font-semibold text-gold-400">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-green-950">{member.name}</h3>
              <p className="text-sm font-medium text-gold-600">{member.role}</p>
              <p className="mt-2 text-sm text-green-900/55">{member.expertise}</p>
              <div className="mt-4 flex items-center justify-between border-t border-green-900/8 pt-3">
                <span className="text-xs font-medium text-green-900/45">{member.experience} experience</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                  <span className="text-xs font-semibold text-green-900/60">{member.rating} / 5</span>
                </div>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
