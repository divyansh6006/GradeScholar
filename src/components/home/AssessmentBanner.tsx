import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export default function AssessmentBanner() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-green-950 px-8 py-14 sm:px-16 sm:py-16">
          <div className="pointer-events-none absolute -top-24 right-[-5%] h-72 w-72 rounded-full bg-gold-500/15 blur-[100px]" />
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
              <Sparkles className="h-3.5 w-3.5" />
              Free Career Assessment
            </span>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold text-white text-balance">
              Find the Best Online MBA for You in 2 Minutes
            </h2>
            <p className="mt-4 text-white/65">
              Answer a few questions about your salary, experience and goals — get matched
              with your top 3 universities and a personalized career report.
            </p>
            <div className="mt-8">
              <Button href="/career-assessment" size="lg">
                Take the Free Assessment
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
