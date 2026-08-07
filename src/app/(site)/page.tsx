import Hero from "@/components/home/Hero";
import StatsBand from "@/components/home/StatsBand";
import TrustStrip from "@/components/home/TrustStrip";
import UniversityLogos from "@/components/home/UniversityLogos";
import WhoWeHelp from "@/components/home/WhoWeHelp";
import ProgramsGrid from "@/components/home/ProgramsGrid";
import WhyDifferent from "@/components/home/WhyDifferent";
import AccreditationTrust from "@/components/home/AccreditationTrust";
import ComparisonTeaser from "@/components/home/ComparisonTeaser";
import AssessmentBanner from "@/components/home/AssessmentBanner";
import CareerRoadmaps from "@/components/home/CareerRoadmaps";
import TeamSection from "@/components/home/TeamSection";
import SuccessStories from "@/components/home/SuccessStories";
import WhyTrustUs from "@/components/home/WhyTrustUs";
import AdmissionProcess from "@/components/home/AdmissionProcess";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getUniversities, getPrograms } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [universities, programs] = await Promise.all([getUniversities(), getPrograms()]);

  return (
    <>
      <Hero universityCount={universities.length} />
      <StatsBand universityCount={universities.length} />
      <TrustStrip universityCount={universities.length} />
      <UniversityLogos universities={universities} />
      <WhoWeHelp />
      <ProgramsGrid programs={programs} />
      <WhyDifferent />
      <AccreditationTrust universities={universities} />
      <ComparisonTeaser universities={universities} />
      <AssessmentBanner />
      <CareerRoadmaps />
      <TeamSection />
      <SuccessStories />
      <WhyTrustUs />
      <AdmissionProcess />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
