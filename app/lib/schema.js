import { z } from "zod";

export const onboardingSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email"),

  mobile: z
    .string({
      required_error: "Mobile number is required",
    })
    .min(7, "Mobile number must be at least 7 digits")
    .max(20, "Mobile number can't exceed 20 digits"),

  location: z
    .string({
      required_error: "Location is required",
    })
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location can't exceed 100 characters"),

  linkedin: z
    .string({
      required_error: "LinkedIn profile is required",
    })
    .url("Please enter a valid LinkedIn URL")
    .includes("linkedin.com", { message: "Must be a LinkedIn profile URL" }),

  github: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/(www\.)?github\.com\/.+/.test(val),
      { message: "Please enter a valid GitHub URL" }
    ),

  portfolio: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+\..+/.test(val),
      { message: "Please enter a valid portfolio URL" }
    ),

  industry: z.string({
    required_error: "Please select an industry",
  }),

  subIndustries: z
    .array(z.string(), {
      required_error: "Please select at least one specialization",
    })
    .min(1, "Please select at least one specialization"),

  bio: z
    .string({
      required_error: "Please enter a short professional bio",
    })
    .min(20, "Bio must be at least 20 characters")
    .max(500, "Bio cannot exceed 500 characters"),

  experience: z
    .number({
      required_error: "Experience is required",
      invalid_type_error: "Please enter a valid number",
    })
    .min(0, "Experience must be at least 0 years")
    .max(50, "Experience cannot exceed 50 years"),

  skills: z
    .array(z.string(), {
      required_error: "Please select at least one skill",
    })
    .min(1, "Please select at least one skill")
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Organization is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required unless this is your current position",
      path: ["endDate"],
    }
  );

export const resumeSchema = z.object({
  contactInfo: contactSchema,
  summary: z.string().min(1, "Professional summary is required"),
  skills: z
    .array(z.string(), {
      required_error: "Please select at least one skill",
    })
    .min(1, "Please select at least one skill"),
  experience: z.array(entrySchema),
  education: z.array(entrySchema),
  projects: z.array(entrySchema),
});

export const coverLetterSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
});
