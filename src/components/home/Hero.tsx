import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Star, ShieldCheck } from "lucide-react";

export default function Hero({ universityCount }: { universityCount: number }) {
  return (
    <section className="relative overflow-hidden bg-green-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-gold-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-green-600/30 blur-[120px]" />

      <Container className="relative py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
              Career Advancement &amp; Higher Education Consultancy
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-white text-balance">
              Your Next Promotion Starts With the Right Degree.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              We help ambitious professionals choose the right Online MBA, Executive
              Programs and career path from India&apos;s leading UGC-entitled
              universities — through personalized counselling, admission guidance and
              end-to-end enrollment support.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact" size="lg">
                Book Free Career Consultation
              </Button>
              <Button href="/compare-universities" variant="outline" size="lg" className="border-white/20 text-white bg-white/5 hover:border-white/40">
                Compare Universities
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
                <span className="ml-1.5 text-sm font-medium text-white/70">4.9 Google Rating</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-white/70">
                <ShieldCheck className="h-4 w-4 text-gold-400" />
                UGC-Entitled Partner Universities
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-sm">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-800 to-green-950">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8 w-full">
                    <StatCard value="50,000+" label="Career Consultations" />
                    <StatCard value={String(universityCount)} label="Partner Universities" />
                    <StatCard value="94%" label="Admission Success Rate" />
                    <StatCard value="₹40K" label="Avg. Scholarship Unlocked" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="font-display text-2xl font-semibold text-gold-400">{value}</p>
      <p className="mt-1 text-xs leading-snug text-white/55">{label}</p>
    </div>
  );
}
