import prisma from "@/lib/prisma";
import { jobFilterType, jobFilterValidationSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import SideBarForm from "./sideBarForm";

interface FilterSideBarProps {
  defaultValues: jobFilterType
}
export default async function JobFilterSideBar({ defaultValues }: FilterSideBarProps) {

  // Get all DISTINCT location from the Database
  const distinctLocation = await prisma.job.findMany({
    where: { approved: true },
    select: { location: true },
    distinct: ["location"],
  });
  const locationStringList = distinctLocation
    .map(({ location }) => location)
    .filter(Boolean) as string[];

  // breaking down of @locationSstringList
  // const mapLocation = distinctLocation.map(({location}) => location);
  // const filterLocation = mapLocation.filter((item) => item)
  // console.log(filterLocation);

  return (
    <>
      <aside className="sticky top-0 h-fit rounded-md border bg-background p-4 md:w-[260px]">
        <SideBarForm locationList={locationStringList} defaultValues={defaultValues}/>
      </aside>
    </>
  );
}
