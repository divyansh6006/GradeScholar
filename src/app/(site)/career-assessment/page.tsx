import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CareerAssessment } from "@/components/assessment/CareerAssessment";

export const metadata: Metadata = {
  title: "Free Career Assessment — Find Your Best-Fit Online MBA",
  description:
    "Answer 5 quick questions about your experience, salary and goals to get matched with your top 3 online university options.",
};

export default function CareerAssessmentPage() {
  return (
    <section className="py-16 lg:py-24 bg-cream-50 min-h-[70vh]">
      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-900/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">
            Free Career Assessment
          </span>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-green-950 text-balance">
            Find the Best Online MBA for You in 2 Minutes
          </h1>
          <p className="mt-3 text-green-900/60">
            No sign-up required until your results are ready.
          </p>
        </div>
        <div className="rounded-3xl border border-green-900/8 bg-white p-8 sm:p-12">
          <CareerAssessment />
        </div>
      </Container>
    </section>
  );
}
