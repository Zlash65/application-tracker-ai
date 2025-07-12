import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  subIndustries: z
    .array(z.string(), {
      required_error: "Please select at least one specialization",
    })
    .min(1, "Please select at least one specialization"),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience cannot exceed 50 years")
    ),
  skills: z
    .array(z.string(), {
      required_error: "Please select at least one skill",
    })
    .min(1, "Please select at least one skill")
});
