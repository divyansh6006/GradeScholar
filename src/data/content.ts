export type SuccessStory = {
  name: string;
  fromRole: string;
  fromSalary: string;
  program: string;
  university: string;
  toRole: string;
  toSalary: string;
  quote: string;
};

export const successStories: SuccessStory[] = [
  {
    name: "Rahul Mehta",
    fromRole: "Software Engineer",
    fromSalary: "₹7 LPA",
    program: "Online MBA",
    university: "NMIMS Online",
    toRole: "Product Manager",
    toSalary: "₹18 LPA",
    quote:
      "My advisor mapped out the exact specialization and university fit for a PM transition — not just any MBA, the right one.",
  },
  {
    name: "Ananya Verma",
    fromRole: "Marketing Executive",
    fromSalary: "₹6 LPA",
    program: "Online MBA",
    university: "Amity University Online",
    toRole: "Marketing Manager",
    toSalary: "₹13.5 LPA",
    quote:
      "The scholarship guidance alone saved me over ₹40,000. The whole process felt handled, not sold to.",
  },
  {
    name: "Vikram Singh",
    fromRole: "Operations Associate",
    fromSalary: "₹5.5 LPA",
    program: "Online MBA",
    university: "Chandigarh University Online",
    toRole: "Operations Manager",
    toSalary: "₹11 LPA",
    quote:
      "I compared five universities on my own and got nowhere. One session with a career strategist and it was obvious.",
  },
  {
    name: "Sneha Reddy",
    fromRole: "HR Executive",
    fromSalary: "₹5 LPA",
    program: "Online MBA",
    university: "Manipal Online",
    toRole: "HR Business Partner",
    toSalary: "₹12 LPA",
    quote:
      "I didn't know Manipal offered a UGC-entitled online MBA until my advisor mapped it against my budget and goals.",
  },
  {
    name: "Aditya Kulkarni",
    fromRole: "Bank Officer",
    fromSalary: "₹6.5 LPA",
    program: "Executive MBA",
    university: "IIM",
    toRole: "Branch Manager",
    toSalary: "₹16 LPA",
    quote:
      "The team was upfront that IIM's program was a certificate, not a degree — that honesty is why I trusted the rest of their advice.",
  },
  {
    name: "Neha Bansal",
    fromRole: "Business Analyst",
    fromSalary: "₹8 LPA",
    program: "Online MBA",
    university: "Shoolini University Online",
    toRole: "Senior Business Analyst",
    toSalary: "₹15 LPA",
    quote:
      "Scholarship guidance and EMI planning were sorted in the first call. No repeated follow-up calls trying to upsell me.",
  },
];

export type FAQ = { question: string; answer: string };

export const homeFaqs: FAQ[] = [
  {
    question: "Are these online degrees UGC-approved and valid for government jobs?",
    answer:
      "Yes. Every degree-granting university in our partner portfolio — NMIMS, Amity, Chandigarh University, Shoolini, GLA, DY Patil and Manipal — is UGC-entitled to offer online degrees, and these degrees carry the same validity as regular/on-campus degrees for employment and higher education, including government positions. Our IIM executive education programs are certificate programs from an Institute of National Importance rather than UGC degrees, and are positioned for leadership credentialing rather than degree equivalence.",
  },
  {
    question: "How is this different from applying directly to a university?",
    answer:
      "Applying directly means navigating fees, specializations, scholarships, and eligibility alone. Our career strategists compare your goals against every partner university's data — fees, ROI, accreditation, placement support — and guide you end-to-end, at no cost to you.",
  },
  {
    question: "Is the consultation actually free?",
    answer:
      "Yes, career consultations are free. We're compensated by our partner universities for guiding qualified candidates through admissions, so there is no cost to you at any stage.",
  },
  {
    question: "Can I get an education loan or EMI option?",
    answer:
      "Yes. All partner programs offer no-cost EMI options, and we assist with education loan documentation and lender coordination as part of the admission process.",
  },
  {
    question: "How long does the admission process take?",
    answer:
      "Typically 1-3 weeks from your first consultation to confirmed admission, depending on documentation and the university's intake cycle.",
  },
  {
    question: "Will you push me toward a specific university?",
    answer:
      "No. Our advisors are not incentivized to favor any single partner. We compare your profile, budget and goals against all 9 partner universities and recommend whichever genuinely fits best — including telling you if a program isn't a good match.",
  },
  {
    question: "Is my personal information safe with you?",
    answer:
      "Yes. Your details are used only to match you with relevant universities and are never sold to third parties. We share your information with a university only after you choose to proceed with that application.",
  },
  {
    question: "What happens after I submit the consultation form?",
    answer:
      "A career strategist reviews your profile and calls you within 24 hours (usually much sooner). There's no obligation to proceed — the first conversation is purely to understand your goals.",
  },
];
