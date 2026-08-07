import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

export default function TrustStrip({ universityCount }: { universityCount: number }) {
  const items = [
    "UGC-Entitled Universities",
    "AICTE Recognized Programs",
    `${universityCount} University Partners`,
    "50,000+ Career Consultations",
    "4.9 Google Rating",
  ];

  return (
    <div className="border-b border-green-900/8 bg-cream-50">
      <Container className="py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-600" />
              <span className="text-sm font-medium text-green-900/70">{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
