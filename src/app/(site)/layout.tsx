import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTAs from "@/components/layout/FloatingCTAs";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { getUniversities, getPrograms } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [universities, programs] = await Promise.all([getUniversities(), getPrograms()]);

  return (
    <>
      <AnnouncementBar />
      <Header universities={universities} programs={programs} />
      <main className="flex-1">{children}</main>
      <Footer universities={universities} programs={programs} />
      <FloatingCTAs />
    </>
  );
}
