import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { University } from "@/lib/data";

export default function UniversityLogos({ universities }: { universities: University[] }) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-green-900/40">
          Our Partner Universities
        </p>
        <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {universities.map((u) => (
            <div
              key={u.slug}
              className="flex h-24 items-center justify-center rounded-2xl border border-green-900/8 bg-cream-50 px-5 py-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100 hover:border-green-900/15 hover:bg-white hover:shadow-[0_12px_30px_-15px_rgba(14,43,8,0.2)]"
            >
              <Image
                src={u.logo}
                alt={u.name}
                width={u.logoWidth}
                height={u.logoHeight}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
