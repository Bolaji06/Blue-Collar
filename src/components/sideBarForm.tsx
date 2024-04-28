"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes, locationTypes } from "@/lib/jobTypes";
import { Button } from "./ui/button";
import { filterJobAction } from "../../actions/filter-action";
import { jobFilterType } from "@/lib/validation";
import { useFormState, useFormStatus } from "react-dom";
import FormButton from "./ui/form-button";

interface SideBarFormProps {
  locationList: string[];
  defaultValues: jobFilterType
}

export default function SideBarForm({ locationList, defaultValues }: SideBarFormProps) {
  
  return (
    <>
      <form action={filterJobAction} key={JSON.stringify(defaultValues)}>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              defaultValue={defaultValues.q}
              placeholder="Jobs, title, company etc"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="job_type">Job Types</Label>
            <Select
              id="job_type"
              name="job_type"
              defaultValue={defaultValues.job_type || ""}
            >
              <option value={""}>All Job Types</option>
              {jobTypes.map((type) => {
                return (
                  <option id="job_type" key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </Select>
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All location</option>
              {locationList.map((locationOption) => {
                return (
                  <option key={locationOption} value={locationOption}>
                    {locationOption}
                  </option>
                );
              })}
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="remote"
              name="remote"
              type="checkbox"
             defaultChecked={defaultValues.remote}
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <FormButton className="w-full text-white text-base mt-4">
            Filter Job
          </FormButton>
        </div>
      </form>
    </>
  );
}
