import { Job } from "@prisma/client";
import Image from "next/image";

import defaultImage from "../assets/default.png";

import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatCurrency, relativeDate } from "@/lib/utils";
import Badge from "./Badge";

interface JobListItemsProbs {
  job: Job;
}
export default function JobListItems({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItemsProbs) {
  return (
    <>
      <article className="flex gap-3 rounded-lg border p-4 hover:bg-muted/60">
        <Image
          src={companyLogoUrl || defaultImage}
          alt={companyName + "logo image"}
          width={100}
          height={100}
          className="self-center rounded-lg"
        />
        <div className="flex-grow space-y-3">
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-sm text-muted-foreground">{companyName}</p>
          </div>

          <div className="text-muted-foreground space-y-1">
            <p className="flex items-center gap-1.5 sm:hidden text-sm">
                <Briefcase size={16} className="shrink-0"/>
                {type}
            </p>
            <p className="flex items-center gap-1.5 text-sm">
                <MapPin size={16} className="shrink-0"/>
                {locationType}
            </p>
            <p className="flex items-center gap-1.5 sm:hidden text-sm">
                <Globe2 size={16} className="shrink-0"/>
                {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5 text-sm">
                <Banknote size={16} className="shrink-0"/>
                {formatCurrency(salary)}
            </p>
            <p className="flex items-center gap-1.5 sm:hidden text-sm">
                <Clock size={16} className="shrink-0"/>
                {relativeDate(createdAt)}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
            <Badge>{type}</Badge>

            <span className="flex items-center gap-1.5 text-muted-foreground ">
                <Clock size={16} className="shrink-0"/>
                {relativeDate(createdAt)}
            </span>
        </div>
      </article>
    </>
  );
}
