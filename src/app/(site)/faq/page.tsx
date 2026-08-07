import type { Metadata } from "next";
import FAQSection from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about online degree admissions, accreditation, scholarships, EMI and our advisory process.",
};

export default function FAQPage() {
  return <FAQSection />;
}
