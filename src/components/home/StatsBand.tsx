import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";

export default function StatsBand({ universityCount }: { universityCount: number }) {
  const stats = [
    { value: 50000, suffix: "+", label: "Career Consultations" },
    { value: universityCount, suffix: "", label: "Partner Universities" },
    { value: 94, suffix: "%", label: "Admission Success Rate" },
    { value: 40, prefix: "₹", suffix: "K", label: "Avg. Scholarship Unlocked" },
  ];

  return (
    <section className="bg-green-950 py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-semibold text-gold-400">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-white/55">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
