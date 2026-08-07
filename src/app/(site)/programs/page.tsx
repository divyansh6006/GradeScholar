import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPrograms } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Online Degree Programs — MBA, MCA, BBA, BCA & More",
  description:
    "Explore Online MBA, Executive MBA, Online MCA, BBA, BCA, M.Com and M.A. programs from India's leading UGC-entitled universities.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Programs We Help With"
          title="Every major online degree, one advisory team"
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-green-900/8 bg-white p-7 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_20px_50px_-20px_rgba(14,43,8,0.25)]"
            >
              <h3 className="font-display text-xl font-semibold text-green-950">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-green-900/60">{p.tagline}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-green-900/40">
                {p.universities.length} Universities · {p.duration}
              </p>
              <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-green-900/50 group-hover:text-gold-600">
                Explore program
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
