import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getUniversities } from "@/lib/data";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partner Universities — UGC-Entitled Online Degrees",
  description:
    "Explore NMIMS Online, Amity University Online, Chandigarh University Online, Shoolini University Online, GLA University, DY Patil Online, IIM Executive Education and Manipal Online — our partner universities for online degree programs.",
};

export default async function UniversitiesPage() {
  const universities = await getUniversities();

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Partner Universities"
          title="India's leading online universities, one advisory team"
          description="Every partner is UGC-entitled to offer online degrees with the same validity as on-campus programs."
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((u) => (
            <Link
              key={u.slug}
              href={`/universities/${u.slug}`}
              className="group flex flex-col rounded-2xl border border-green-900/8 bg-white p-7 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_20px_50px_-20px_rgba(14,43,8,0.25)]"
            >
              <div className="flex h-14 items-center">
                <Image
                  src={u.logo}
                  alt={u.name}
                  width={u.logoWidth}
                  height={u.logoHeight}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              <span className="mt-5 inline-flex w-fit items-center rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-700">
                NAAC {u.naac}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-green-950">
                {u.shortName}
              </h3>
              <p className="mt-1.5 text-sm text-green-900/60">{u.tagline}</p>
              <div className="mt-5 space-y-1.5 text-sm text-green-900/55">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold-600" />
                  Fees from ₹{(u.fees.min / 100000).toFixed(1)}L
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold-600" />
                  EMI starts ₹{u.emiStarts.toLocaleString("en-IN")}/mo
                </p>
              </div>
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
