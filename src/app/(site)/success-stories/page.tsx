import type { Metadata } from "next";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { successStories } from "@/data/content";

export const metadata: Metadata = {
  title: "Student Success Stories — Real Career Transitions",
  description:
    "Real career transitions from professionals who chose the right online degree with Grad Scholar.",
};

export default function SuccessStoriesPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Student Success"
          title="Real career transitions, not testimonials"
          align="center"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {successStories.map((s) => (
            <div key={s.name} className="rounded-2xl border border-green-900/8 bg-white p-7">
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-900/40">{s.fromRole}</p>
                  <p className="font-display text-sm font-semibold text-green-950">{s.fromSalary}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-green-900/25 shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{s.toRole}</p>
                  <p className="font-display text-sm font-semibold text-green-950">{s.toSalary}</p>
                </div>
              </div>
              <Quote className="mt-5 h-5 w-5 text-gold-500/50" />
              <p className="mt-2 text-sm leading-relaxed text-green-900/70">&ldquo;{s.quote}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center rounded-3xl bg-green-950 px-8 py-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white text-balance">
            Your career transition could be next.
          </h2>
          <p className="mt-3 max-w-md text-white/65">
            Book a free consultation and find out which university and program fits
            your goals.
          </p>
          <Button href="/contact" size="lg" className="mt-7">
            Book Free Career Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
