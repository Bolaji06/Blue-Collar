"use server"

import { jobFilterValidationSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export async function filterJobAction(formData: FormData){
  const values = Object.fromEntries(formData.entries());

  const { q, job_type, location, remote} = jobFilterValidationSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && ({ q: q.trim()})),
    ...(job_type && ({ job_type })),
    ...(location && ({ location })),
    ...(remote && ({ remote: "true"})),
  });
  redirect(`/?${searchParams}`);

}