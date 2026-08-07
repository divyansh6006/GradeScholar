import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { getProgramBySlug, getUniversities } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: `${program.name} — Fees, Eligibility & Top Universities`,
    description: `${program.tagline} Compare ${program.name} options across ${program.universities.length} UGC-entitled universities.`,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const universities = await getUniversities();
  const relatedUniversities = universities.filter((u) =>
    program.universities.includes(u.slug)
  );

  return (
    <>
      <section className="bg-green-950 py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
                {program.duration} Program
              </span>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance leading-tight">
                {program.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/65">{program.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="#lead-form" size="lg">
                  Book Free Consultation
                </Button>
                <Button href="/compare-universities" variant="outline" size="lg" className="border-white/20 text-white bg-white/5 hover:border-white/40">
                  Compare Universities
                </Button>
              </div>
            </div>

            <div id="lead-form" className="scroll-mt-24">
              <LeadForm
                title={`Get Details for ${program.name}`}
                subtitle="Talk to a career strategist about the right fit for you."
                defaultProgram={program.name}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-14">
              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Who Should Join This Program
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {program.bestFor.map((b) => (
                    <span key={b} className="rounded-full bg-cream-100 px-4 py-2 text-sm font-medium text-green-900/70">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Specializations Available
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {program.specializations.map((s) => (
                    <div key={s} className="flex items-center gap-3 rounded-xl border border-green-900/8 bg-cream-50 p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-600" />
                      <span className="text-sm text-green-900/70">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Career Outcomes
                </h2>
                <div className="mt-6 space-y-3">
                  {program.outcomes.map((o) => (
                    <div key={o} className="rounded-xl border border-green-900/8 px-5 py-4 text-sm font-medium text-green-900/70">
                      {o}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Eligibility
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-green-900/65">
                  {program.eligibility}
                </p>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 self-start">
              <div className="rounded-2xl border border-green-900/8 bg-cream-50 p-6">
                <h3 className="font-display text-base font-semibold text-green-950">
                  Universities Offering This Program
                </h3>
                <div className="mt-4 space-y-2">
                  {relatedUniversities.map((u) => (
                    <Link
                      key={u.slug}
                      href={`/universities/${u.slug}`}
                      className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-green-900/75 hover:text-gold-600 transition-colors"
                    >
                      {u.shortName}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-green-900/8 bg-green-950 p-6">
                <h3 className="font-display text-base font-semibold text-white">
                  Not sure which is right for you?
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Take our free 2-minute assessment to get matched instantly.
                </p>
                <Button href="/career-assessment" variant="primary" size="sm" className="mt-4 w-full">
                  Take Career Assessment
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
