import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompareUniversities } from "@/components/universities/CompareUniversities";

export const metadata: Metadata = {
  title: "Compare Universities — Fees, NAAC, EMI & Outcomes",
  description:
    "Compare NMIMS Online, Amity University Online, Chandigarh University, Shoolini University, GLA University, DY Patil, IIM and Manipal Online side by side on fees, accreditation, EMI and career outcomes.",
};

export default function CompareUniversitiesPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Compare Universities"
          title="Every partner university, side by side"
          description="Select the universities you're considering, or compare two head-to-head."
          align="center"
        />
        <div className="mt-14">
          <CompareUniversities />
        </div>
      </Container>
    </section>
  );
}
