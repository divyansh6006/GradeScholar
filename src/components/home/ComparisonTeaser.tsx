import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ComparisonTable } from "@/components/universities/ComparisonTable";
import type { University } from "@/lib/data";

export default function ComparisonTeaser({ universities }: { universities: University[] }) {
  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <Container>
        <SectionHeading
          eyebrow="Compare Before You Commit"
          title="Every partner university, side by side"
          description="Fees, accreditation, EMI options and outcomes — the data you need before choosing where to apply."
          align="center"
        />
        <Reveal delay={0.1} className="mt-12">
          <ComparisonTable items={universities} />
        </Reveal>
        <div className="mt-8 flex justify-center">
          <Button href="/compare-universities" variant="secondary" size="lg">
            Open Full Comparison Tool
          </Button>
        </div>
      </Container>
    </section>
  );
}
