import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getUniversities } from "@/lib/data";
import { team } from "@/data/team";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us — Career Advancement & Higher Education Consultancy",
  description: `${siteConfig.name} — "${siteConfig.tagline}" — is India's Career Advancement & Higher Education Consultancy, helping professionals choose the right online degree from India's leading universities.`,
};

export default async function AboutPage() {
  const universities = await getUniversities();

  return (
    <>
      <section className="bg-green-950 py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
              About {siteConfig.name} — {siteConfig.tagline}
            </span>
            <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance">
              India&apos;s Career Advancement &amp; Higher Education Consultancy
            </h1>
            <p className="mt-5 text-lg text-white/65">
              We help students and working professionals choose the right UGC-entitled
              online degree from India&apos;s leading universities through personalized
              career counselling, admission guidance, scholarship support and end-to-end
              enrollment assistance.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading eyebrow="Our Approach" title="We advise. We don't sell." />
              <p className="mt-5 text-green-900/65 leading-relaxed">
                Most admission consultants are compensated to push a single university.
                We work across a portfolio of {universities.length} UGC-entitled and
                nationally recognized institutions —{" "}
                {universities.map((u) => u.shortName).join(", ")} — so our
                recommendation is based on fit, not favoritism.
              </p>
              <p className="mt-4 text-green-900/65 leading-relaxed">
                Every engagement starts with a free career consultation, not a sales
                pitch. From there, we handle university shortlisting, documentation,
                scholarship checks, EMI coordination and post-admission support.
              </p>
              <Button href="/contact" size="lg" className="mt-8">
                Book Free Career Consultation
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="50,000+" label="Career Consultations" />
              <StatCard value={String(universities.length)} label="Partner Universities" />
              <StatCard value="94%" label="Admission Success Rate" />
              <StatCard value="4.9 / 5" label="Average Rating" />
            </div>
          </div>
        </Container>
      </section>

      <section id="experts" className="py-20 lg:py-28 bg-cream-50 scroll-mt-24">
        <Container>
          <SectionHeading eyebrow="Meet Our Experts" title="A team of career strategists, not sales reps" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((e) => (
              <div key={e.name} className="rounded-2xl border border-green-900/8 bg-white p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-950 font-display text-lg font-semibold text-gold-400">
                  {e.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-green-950">{e.name}</h3>
                <p className="text-sm font-medium text-gold-600">{e.role}</p>
                <p className="mt-2 text-sm text-green-900/55">{e.expertise}</p>
                <div className="mt-4 flex items-center justify-between border-t border-green-900/8 pt-3">
                  <span className="text-xs font-medium text-green-900/45">{e.experience} experience</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                    <span className="text-xs font-semibold text-green-900/60">{e.rating} / 5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-green-900/8 bg-cream-50 p-6">
      <p className="font-display text-2xl font-semibold text-green-950">{value}</p>
      <p className="mt-1 text-sm text-green-900/55">{label}</p>
    </div>
  );
}
