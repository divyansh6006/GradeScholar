import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Program } from "@/lib/data";

export default function ProgramsGrid({ programs }: { programs: Program[] }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Programs We Help With"
            title="Every major online degree, one advisory team"
          />
          <Link
            href="/programs"
            className="flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-500"
          >
            View all programs
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <Reveal delay={0.1} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-green-900/8 bg-white p-6 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_20px_50px_-20px_rgba(14,43,8,0.25)]"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-green-950">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-green-900/60">
                  {p.tagline}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-green-900/50 group-hover:text-gold-600">
                Explore
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
