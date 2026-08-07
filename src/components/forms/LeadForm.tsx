"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Lock, Zap } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validation";
import { useUniversities, usePrograms } from "@/hooks/usePublicData";
import { cn } from "@/lib/utils";

const experienceOptions = ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"];

const steps = ["Basic Details", "Program Interest", "Experience"] as const;

export function LeadForm({
  title = "Start Your Career Journey",
  subtitle = "Get matched with the right university in one free session.",
  defaultProgram,
  defaultUniversity,
  source = "website",
  className,
}: {
  title?: string;
  subtitle?: string;
  defaultProgram?: string;
  defaultUniversity?: string;
  source?: string;
  className?: string;
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const universities = useUniversities();
  const programs = usePrograms();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      program: defaultProgram ?? "",
      university: defaultUniversity ?? "",
      source,
    },
  });

  const stepFields: Record<number, (keyof LeadInput)[]> = {
    0: ["name", "phone", "email"],
    1: ["program", "university"],
    2: ["experience"],
  };

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: LeadInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-green-900/8 bg-white p-8 text-center shadow-[0_30px_70px_-30px_rgba(14,43,8,0.25)]",
          className
        )}
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-500" />
        <h3 className="mt-4 font-display text-xl font-semibold text-green-950">
          You&apos;re all set
        </h3>
        <p className="mt-2 text-sm text-green-900/60">
          A career strategist will call you within 24 hours. In the meantime, check your
          inbox for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-green-900/8 bg-white/95 backdrop-blur p-6 sm:p-8 shadow-[0_30px_70px_-30px_rgba(14,43,8,0.25)]",
        className
      )}
    >
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-green-950">{title}</h3>
        <p className="mt-1 text-sm text-green-900/55">{subtitle}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-medium text-green-900/50">
            <Lock className="h-3 w-3 text-gold-600" />
            100% confidential
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-green-900/50">
            <Zap className="h-3 w-3 text-gold-600" />
            We respond within 2 hours
          </span>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full transition-colors",
                i <= step ? "bg-gold-500" : "bg-green-900/8"
              )}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field label="Full Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  placeholder="e.g. Rahul Mehta"
                  className={inputClass}
                />
              </Field>
              <Field label="Phone Number" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  placeholder="e.g. 98765 43210"
                  className={inputClass}
                />
              </Field>
              <Field label="Email Address" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </Field>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field label="Interested Program" error={errors.program?.message}>
                <select {...register("program")} className={inputClass} defaultValue={defaultProgram ?? ""}>
                  <option value="" disabled>
                    Select a program
                  </option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred University (optional)">
                <select {...register("university")} className={inputClass} defaultValue={defaultUniversity ?? ""}>
                  <option value="">Not sure yet — recommend for me</option>
                  {universities.map((u) => (
                    <option key={u.slug} value={u.shortName}>
                      {u.shortName}
                    </option>
                  ))}
                </select>
              </Field>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field label="Work Experience" error={errors.experience?.message}>
                <div className="grid grid-cols-2 gap-2">
                  {experienceOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center justify-center rounded-xl border border-green-900/10 px-3 py-3 text-sm font-medium text-green-900/70 has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/8 has-[:checked]:text-green-950 transition-colors"
                    >
                      <input
                        type="radio"
                        value={opt}
                        {...register("experience")}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </Field>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-1 rounded-full border border-green-900/12 px-5 py-3 text-sm font-semibold text-green-900/70 hover:bg-green-900/5 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-green-950 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-green-950 hover:bg-gold-400 disabled:opacity-70 transition-colors"
            >
              {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
              Book Free Consultation
            </button>
          )}
        </div>
        {status === "error" && (
          <p className="mt-3 text-center text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </form>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-green-900/40">
        <Lock className="h-3 w-3" />
        By submitting, you agree to be contacted by our career advisory team. We never spam or sell your data.
      </p>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-green-900/12 bg-white px-4 py-3.5 text-[15px] text-green-950 placeholder:text-green-900/35 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-green-900/70">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
