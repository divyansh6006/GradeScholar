import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number")
    .regex(/^[0-9+\-\s]+$/, "Digits only"),
  email: z.email("Enter a valid email"),
  program: z.string().min(1, "Select a program"),
  university: z.string().optional(),
  experience: z.string().min(1, "Select your experience"),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const feePlansSchema = z.object({
  semesterWise: z
    .object({
      label: z.string().optional(),
      semesters: z.array(z.number().nonnegative()),
      total: z.number().nonnegative(),
    })
    .optional(),
  annual: z
    .object({
      label: z.string().optional(),
      years: z.array(z.number().nonnegative()),
      total: z.number().nonnegative(),
    })
    .optional(),
  onePayment: z
    .object({
      label: z.string().optional(),
      total: z.number().nonnegative(),
    })
    .optional(),
  noCostEmi: z
    .object({
      label: z.string().optional(),
      monthly: z.number().nonnegative(),
      months: z.number().int().positive(),
    })
    .optional(),
});

export type FeePlansInput = z.infer<typeof feePlansSchema>;

export const universitySchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  shortName: z.string().min(2, "Short name is required"),
  tagline: z.string().min(3, "Tagline is required"),
  logo: z.string().min(1, "Upload a logo"),
  logoWidth: z.number().positive(),
  logoHeight: z.number().positive(),
  accreditation: z.array(z.string()).min(1, "Add at least one accreditation"),
  naac: z.string().min(1, "NAAC grade is required"),
  established: z.number().int().min(1800).max(new Date().getFullYear()),
  bestFor: z.string().min(1, "Required"),
  feesMin: z.number().nonnegative(),
  feesMax: z.number().nonnegative(),
  emiStarts: z.number().nonnegative(),
  feePlans: feePlansSchema.nullable().optional(),
  duration: z.string().min(1, "Required"),
  programs: z.array(z.string()).min(1, "Add at least one program"),
  highlights: z.array(z.string()).min(1, "Add at least one highlight"),
  overview: z.string().min(10, "Write a short overview"),
  approvals: z.array(z.string()).min(1, "Add at least one approval"),
  placementSupport: z.boolean(),
  avgSalary: z.string().min(1, "Required"),
  rating: z.number().min(0).max(5),
  color: z.string().min(1),
  published: z.boolean(),
});

export type UniversityInput = z.infer<typeof universitySchema>;

export const programSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  shortName: z.string().min(1, "Short name is required"),
  tagline: z.string().min(3, "Tagline is required"),
  duration: z.string().min(1, "Required"),
  eligibility: z.string().min(3, "Required"),
  specializations: z.array(z.string()).min(1, "Add at least one specialization"),
  bestFor: z.array(z.string()).min(1, "Add at least one audience"),
  outcomes: z.array(z.string()).min(1, "Add at least one outcome"),
  universities: z.array(z.string()),
  published: z.boolean(),
});

export type ProgramInput = z.infer<typeof programSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().min(10, "Write a short excerpt"),
  content: z.array(z.string()).min(1, "Add at least one paragraph"),
  readTime: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  published: z.boolean(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
