import z, { literal, string } from "zod";
import { jobTypes, locationTypes } from "./jobTypes";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = z
  .string()
  .max(9, "Number shouldn't exceedes 9 digits")
  .min(1, "Required")
  .regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "File must be an image",
  )
  .refine((file) => {
    return file && file.size < 1024 * 1024 * 2;
  }, "File size should'nt exceedes 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().email().optional().or(literal("")),
    applicationUrl: z.string().url().optional().or(literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Application email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: z
      .string()
      .refine(
        (value) => locationTypes.includes(value),
        "Invalid location type",
      ),
    location: z.string().max(100),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid Job Type",
    ),
    companyName: string().min(1, 'Required').max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString,
  })
  .and(applicationSchema)
  .and(locationSchema);

export const jobFilterValidationSchema = z.object({
  q: z.string().optional(),
  job_type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type jobFilterType = z.infer<typeof jobFilterValidationSchema>;
export type createJobType = z.infer<typeof createJobSchema>;
