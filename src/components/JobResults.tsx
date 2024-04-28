import prisma from "@/lib/prisma";
import JobListItems from "./JobListItems";
import { jobFilterType } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import H1 from "./ui/h1";

interface JobResultsProps {
    filterValues: jobFilterType
}
export default async function JobResults({ filterValues: {
    q, job_type, location, remote
} }: JobResultsProps){

    const searchString = q?.split(" ").filter((word) => word.length > 0).join(" & ")

    const searchFilter: Prisma.JobWhereInput = searchString ? {
        OR: [
            { title: { search: searchString}},
            { companyName: { search: searchString }},
            { locationType: { search: searchString }},
            { type: { search: searchString }},
            { location: { search: searchString }}
        ]
    }: {}

    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            job_type ? { type: job_type } : {},
            location ? { location } : {},
            remote ? { locationType: "Remote"} : {},
            { approved: true}
        ]
    }
    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
      
    return(
        <>
            <div className="space-y-4 grow">
            
            {jobs.map((job) => {
              return (
              <JobListItems job={job} key={job.id} />
            );
            })}
            {
                jobs.length === 0 && (
                    <div className="mx-auto">
                        <H1 className="text-center text-xl font-light">Job is not available you can try to adjust your filter</H1>
                    </div>
                )
            }
          </div>
        </>
    )
}