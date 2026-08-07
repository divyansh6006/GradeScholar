import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-green-950">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
              Book a Free Session
            </span>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold text-white text-balance">
              Talk to a career strategist before you choose.
            </h2>
            <p className="mt-4 max-w-md text-white/65">
              No cost, no obligation. We&apos;ll map your background against every
              partner university and tell you honestly which one fits.
            </p>
          </div>
          <LeadForm />
        </div>
      </Container>
    </section>
  );
}
