"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ChevronLeft, Loader2, Sparkles, Lock } from "lucide-react";
import type { University } from "@/lib/data";
import { useUniversities } from "@/hooks/usePublicData";
import { cn } from "@/lib/utils";

type Answers = {
  qualification: string;
  experience: string;
  salary: string;
  goal: string;
  budget: string;
};

const questions: {
  key: keyof Answers;
  title: string;
  options: string[];
}[] = [
  {
    key: "qualification",
    title: "What's your current qualification?",
    options: ["Graduate (Any Stream)", "B.Tech / Engineering", "B.Com / Commerce", "Already hold an MBA"],
  },
  {
    key: "experience",
    title: "How many years of work experience do you have?",
    options: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"],
  },
  {
    key: "salary",
    title: "What's your current annual salary?",
    options: ["Under ₹5 LPA", "₹5-10 LPA", "₹10-20 LPA", "₹20 LPA+"],
  },
  {
    key: "goal",
    title: "What's your primary career goal?",
    options: [
      "Move into Management/Leadership",
      "Switch Industry or Function",
      "Increase My Salary",
      "Eligibility for Govt/PSU Roles",
    ],
  },
  {
    key: "budget",
    title: "What's your budget for the program?",
    options: ["Under ₹1 Lakh", "₹1 - 1.5 Lakh", "₹1.5 - 2 Lakh", "₹2 Lakh+"],
  },
];

const budgetCeiling: Record<string, number> = {
  "Under ₹1 Lakh": 100000,
  "₹1 - 1.5 Lakh": 150000,
  "₹1.5 - 2 Lakh": 200000,
  "₹2 Lakh+": Infinity,
};

function recommend(answers: Answers, universities: University[]): University[] {
  const ceiling = budgetCeiling[answers.budget] ?? Infinity;
  const withinBudget = universities.filter((u) => u.fees.min <= ceiling);
  const pool = withinBudget.length ? withinBudget : universities;
  return [...pool].sort((a, b) => b.rating - a.rating).slice(0, 3);
}

const captureSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number").max(15),
  email: z.email("Enter a valid email"),
});
type CaptureInput = z.infer<typeof captureSchema>;

export function CareerAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const universities = useUniversities();

  const totalSteps = questions.length;
  const isQuizDone = step >= totalSteps;

  const results = useMemo(() => {
    if (!isQuizDone) return [];
    return recommend(answers as Answers, universities);
  }, [isQuizDone, answers, universities]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaptureInput>({ resolver: zodResolver(captureSchema) });

  const selectOption = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  const onCapture = async (data: CaptureInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          program: "Online MBA",
          university: results[0]?.shortName ?? "",
          experience: answers.experience ?? "",
          source: "career-assessment",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setUnlocked(true);
    } catch {
      setStatus("error");
    }
  };

  if (isQuizDone) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
            <Sparkles className="h-3.5 w-3.5" />
            Assessment Complete
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold text-green-950">
            Your Top University Matches
          </h2>
          <p className="mt-3 text-green-900/60">
            Based on your goals, experience and budget, here&apos;s where you fit best.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {results.map((u, i) => (
            <div
              key={u.slug}
              className={cn(
                "relative rounded-2xl border bg-white p-6",
                i === 0 ? "border-gold-500/40 shadow-[0_20px_50px_-20px_rgba(232,185,35,0.4)]" : "border-green-900/8"
              )}
            >
              {i === 0 && (
                <span className="absolute -top-3 left-6 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-green-950">
                  BEST MATCH
                </span>
              )}
              <p className="font-display text-lg font-semibold text-green-950">{u.shortName}</p>
              <p className="mt-1 text-sm text-green-900/55">{u.tagline}</p>
              <div className="mt-4 space-y-1.5 text-sm text-green-900/60">
                <p>NAAC: <span className="font-semibold text-green-950">{u.naac}</span></p>
                <p>Fees: <span className="font-semibold text-green-950">₹{(u.fees.min / 100000).toFixed(1)}L - ₹{(u.fees.max / 100000).toFixed(1)}L</span></p>
                <p>EMI from: <span className="font-semibold text-green-950">₹{u.emiStarts.toLocaleString("en-IN")}/mo</span></p>
              </div>
            </div>
          ))}
        </div>

        {!unlocked ? (
          <div className="mx-auto mt-12 max-w-md rounded-3xl border border-green-900/8 bg-cream-50 p-7">
            <h3 className="font-display text-lg font-semibold text-green-950 text-center">
              Unlock Your Complete Career Report
            </h3>
            <p className="mt-1.5 text-center text-sm text-green-900/55">
              Get personalized fees, ROI and scholarship eligibility for these universities.
            </p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-green-900/45">
              <Lock className="h-3 w-3 text-gold-600" />
              100% confidential — never spammed or sold
            </p>
            <form onSubmit={handleSubmit(onCapture)} className="mt-6 space-y-3">
              <input
                {...register("name")}
                placeholder="Full Name"
                className="w-full rounded-xl border border-green-900/12 bg-white px-4 py-3.5 text-[15px] focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
              {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
              <input
                {...register("phone")}
                placeholder="Phone Number"
                className="w-full rounded-xl border border-green-900/12 bg-white px-4 py-3.5 text-[15px] focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-green-900/12 bg-white px-4 py-3.5 text-[15px] focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3.5 text-sm font-semibold text-green-950 hover:bg-gold-400 disabled:opacity-70 transition-colors"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                Unlock Complete Report
              </button>
              {status === "error" && (
                <p className="text-center text-xs text-red-600">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-md rounded-3xl border border-gold-500/30 bg-gold-500/5 p-7 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-gold-600" />
            <p className="mt-3 font-display text-lg font-semibold text-green-950">
              Report unlocked
            </p>
            <p className="mt-1.5 text-sm text-green-900/60">
              A career strategist will call you within 24 hours to walk through your
              options in detail.
            </p>
          </div>
        )}
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-2">
        {questions.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full overflow-hidden bg-green-900/8">
            <div
              className={cn(
                "h-full bg-gold-500 transition-all duration-300",
                i < step ? "w-full" : i === step ? "w-1/2" : "w-0"
              )}
            />
          </div>
        ))}
      </div>

      <p className="text-sm font-semibold text-gold-600">
        Question {step + 1} of {totalSteps}
      </p>
      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-green-950 text-balance">
        {q.title}
      </h2>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => selectOption(q.key, opt)}
            className={cn(
              "rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all",
              answers[q.key] === opt
                ? "border-gold-500 bg-gold-500/8 text-green-950"
                : "border-green-900/10 text-green-900/75 hover:border-gold-500/30 hover:bg-gold-500/5"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="mt-8 flex items-center gap-1 text-sm font-semibold text-green-900/50 hover:text-green-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}
    </div>
  );
}
