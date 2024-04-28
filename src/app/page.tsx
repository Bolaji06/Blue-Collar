import Image from "next/image";

import prisma from "@/lib/prisma";
import JobListItems from "@/components/JobListItems";
import JobFilterSideBar from "@/components/JobFilterSideBar";
import JobResults from "@/components/JobResults";
import { jobFilterType } from "@/lib/validation";
import H1 from "@/components/ui/h1";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    job_type?: string;
    location?: string;
    remote?: string;
  };
}

function titleText({ q, job_type, location, remote }: jobFilterType) {
  const textString = q
    ? `${q} jobs`
    : job_type
      ? ` ${job_type}`
      : remote
        ? `${remote} jobs`
        : "";

  const surfix = location ? ` in ${location}` : "";
  const text = textString && `Search Result: ${textString}`;
  return `${text} ${surfix}`;
}

export function generateMetadata({ searchParams: { q, job_type, location, remote }}: PageProps): Metadata{
  return {
    title: `${titleText({
      q, job_type, location, remote: remote === "true"
    })} Blue Collar`,

  }
}

export default async function Home({
  searchParams: { q, job_type, location, remote },
}: PageProps) {
  const filterValues: jobFilterType = {
    q,
    job_type,
    location,
    remote: remote === "true",
  };

  return (
    <>
      <main className="mx-auto max-w-5xl pb-8">
        <header className="mx-auto mb-4 space-y-2 py-3 text-center">
          <H1 className="text-2xl font-bold tracking-tighter">
            Home for Blue Collar Jobs
          </H1>
          <p className="text-muted-foreground">
            No experience should go to waste
          </p>
          <H1 className="text-base font-medium">
            {titleText(filterValues)}
          </H1>

        </header>
        <section className="flex flex-col justify-center gap-4 px-4 md:flex-row">
          <div>
            <JobFilterSideBar defaultValues={filterValues} />
          </div>
          <div className="w-full">
            <JobResults filterValues={filterValues} />
          </div>
        </section>
      </main>
    </>
  );
}
