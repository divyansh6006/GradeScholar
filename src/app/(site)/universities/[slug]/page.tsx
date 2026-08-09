import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { getUniversityBySlug, getPrograms } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uni = await getUniversityBySlug(slug);
  if (!uni) return {};
  return {
    title: `${uni.name} — Fees, Eligibility & Admission`,
    description: `${uni.tagline}. NAAC ${uni.naac} accredited, UGC-entitled. Fees from ₹${(uni.fees.min / 100000).toFixed(1)}L. Get free counselling.`,
  };
}

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uni = await getUniversityBySlug(slug);
  if (!uni) notFound();

  const programs = await getPrograms();
  const relatedPrograms = programs.filter((p) => p.universities.includes(uni.slug));

  return (
    <>
      <section className="bg-green-950 py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <div className="inline-flex h-16 items-center rounded-xl bg-white px-5 py-3">
                <Image
                  src={uni.logo}
                  alt={uni.name}
                  width={uni.logoWidth}
                  height={uni.logoHeight}
                  className="max-h-10 w-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {uni.accreditation.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold text-gold-400"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance leading-tight">
                {uni.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/65">{uni.tagline}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">
                {uni.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="#lead-form" size="lg">
                  Book Free Consultation
                </Button>
                <Button href="/compare-universities" variant="outline" size="lg" className="border-white/20 text-white bg-white/5 hover:border-white/40">
                  Compare with Others
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat label="NAAC Grade" value={uni.naac} />
                <Stat label="Established" value={String(uni.established)} />
                <Stat label="Duration" value={uni.duration} />
                <Stat label="Rating" value={`${uni.rating} / 5`} />
              </div>
            </div>

            <div id="lead-form" className="scroll-mt-24">
              <LeadForm
                title={`Get Fee Details for ${uni.shortName}`}
                subtitle="Talk to a career strategist and get a personalized quote."
                defaultUniversity={uni.shortName}
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
                  Why Choose {uni.shortName}
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {uni.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3 rounded-xl border border-green-900/8 bg-cream-50 p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-600" />
                      <span className="text-sm text-green-900/70">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Fees &amp; EMI
                </h2>
                <div className="mt-6 overflow-hidden rounded-2xl border border-green-900/8">
                  <table className="w-full border-collapse text-left text-sm">
                    <tbody>
                      <Row label="Total Program Fees" value={`₹${(uni.fees.min).toLocaleString("en-IN")} - ₹${(uni.fees.max).toLocaleString("en-IN")}`} />
                      <Row label="EMI Starts From" value={`₹${uni.emiStarts.toLocaleString("en-IN")}/month`} />
                      <Row label="Program Duration" value={uni.duration} />
                      <Row label="Placement Support" value={uni.placementSupport ? "Included" : "Not Included"} />
                      <Row label="Average Post-Program Salary" value={uni.avgSalary} />
                    </tbody>
                  </table>
                </div>
              </div>

              {uni.feePlans && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-green-950">
                    Payment Plans
                  </h2>
                  <p className="mt-1 text-sm text-green-900/55">
                    Choose whichever schedule works best for you — all lead to the same program.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {uni.feePlans.semesterWise && (
                      <PlanCard title="Semester-wise">
                        <ul className="space-y-1.5 text-sm text-green-900/70">
                          {uni.feePlans.semesterWise.semesters.map((amt, i) => (
                            <li key={i} className="flex justify-between">
                              <span>Semester {i + 1}</span>
                              <span className="font-semibold text-green-950">₹{amt.toLocaleString("en-IN")}</span>
                            </li>
                          ))}
                        </ul>
                        <PlanTotal value={uni.feePlans.semesterWise.total} />
                      </PlanCard>
                    )}
                    {uni.feePlans.annual && (
                      <PlanCard title="Annual">
                        <ul className="space-y-1.5 text-sm text-green-900/70">
                          {uni.feePlans.annual.years.map((amt, i) => (
                            <li key={i} className="flex justify-between">
                              <span>Year {i + 1}</span>
                              <span className="font-semibold text-green-950">₹{amt.toLocaleString("en-IN")}</span>
                            </li>
                          ))}
                        </ul>
                        <PlanTotal value={uni.feePlans.annual.total} />
                      </PlanCard>
                    )}
                    {uni.feePlans.onePayment && (
                      <PlanCard
                        title={uni.feePlans.onePayment.label ?? "One-Time Payment"}
                        highlight="Best Value"
                      >
                        <p className="text-sm text-green-900/60">
                          Pay the full program fee upfront and skip semester/annual instalments.
                        </p>
                        <PlanTotal value={uni.feePlans.onePayment.total} />
                      </PlanCard>
                    )}
                    {uni.feePlans.noCostEmi && (
                      <PlanCard
                        title={uni.feePlans.noCostEmi.label ?? "No-Cost EMI"}
                        highlight="Popular"
                      >
                        <p className="text-sm text-green-900/60">
                          Spread the cost with zero extra interest.
                        </p>
                        <p className="mt-3 font-display text-2xl font-semibold text-gold-600">
                          ₹{uni.feePlans.noCostEmi.monthly.toLocaleString("en-IN")}
                          <span className="text-sm font-medium text-green-900/50">/month</span>
                        </p>
                        <p className="text-xs text-green-900/45">
                          for {uni.feePlans.noCostEmi.months} months, no cost EMI
                        </p>
                      </PlanCard>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Programs Offered
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {uni.programs.map((p) => (
                    <span key={p} className="rounded-full bg-cream-100 px-4 py-2 text-sm font-medium text-green-900/70">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Approvals &amp; Recognition
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {uni.approvals.map((a) => (
                    <div key={a} className="flex items-center gap-2 rounded-xl border border-green-900/8 px-4 py-3">
                      <CheckCircle2 className="h-4 w-4 text-gold-600" />
                      <span className="text-sm font-medium text-green-900/70">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-green-950">
                  Admission Process
                </h2>
                <ol className="mt-6 space-y-4">
                  {[
                    "Free career consultation with our advisory team",
                    "Eligibility check and document collation",
                    "Application submission to " + uni.shortName,
                    "Scholarship / EMI processing (if applicable)",
                    "Admission confirmation and orientation",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-950 text-xs font-semibold text-gold-400">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-sm text-green-900/70">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 self-start">
              <div className="rounded-2xl border border-green-900/8 bg-cream-50 p-6">
                <h3 className="font-display text-base font-semibold text-green-950">
                  Related Programs
                </h3>
                <div className="mt-4 space-y-2">
                  {relatedPrograms.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/programs/${p.slug}`}
                      className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-green-900/75 hover:text-gold-600 transition-colors"
                    >
                      {p.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-green-900/8 bg-green-950 p-6">
                <h3 className="font-display text-base font-semibold text-white">
                  Compare {uni.shortName}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  See how it stacks up against every other partner university.
                </p>
                <Button href="/compare-universities" variant="primary" size="sm" className="mt-4 w-full">
                  Open Comparison Tool
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <p className="font-display text-lg font-semibold text-gold-400">{value}</p>
      <p className="mt-0.5 text-xs text-white/50">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-green-900/6 last:border-0 odd:bg-cream-50/60">
      <td className="px-5 py-3.5 font-medium text-green-900/60 w-1/2">{label}</td>
      <td className="px-5 py-3.5 font-semibold text-green-950">{value}</td>
    </tr>
  );
}

function PlanCard({
  title,
  highlight,
  children,
}: {
  title: string;
  highlight?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-green-900/8 bg-cream-50 p-5">
      {highlight && (
        <span className="absolute -top-3 right-5 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-green-950">
          {highlight}
        </span>
      )}
      <h3 className="font-display text-sm font-semibold text-green-950">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function PlanTotal({ value }: { value: number }) {
  return (
    <p className="mt-3 flex items-baseline justify-between border-t border-green-900/8 pt-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-green-900/45">Total</span>
      <span className="font-display text-lg font-semibold text-green-950">₹{value.toLocaleString("en-IN")}</span>
    </p>
  );
}
