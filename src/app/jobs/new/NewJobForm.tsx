"use client";

import H1 from "@/components/ui/h1";
import { createJobSchema, createJobType } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/jobTypes";
import LocationInput from "@/components/LocationInput";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
export default function NewJobForm() {
  const form = useForm<createJobType>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    trigger,
    control,
    setFocus,
    setValue,
  } = form;

  async function onSubmit(values: createJobType) {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <>
      <main className="my-4">
        <div className="space-y-2 pb-6 text-center">
          <H1>Find your next perfect worker</H1>
          <p className="text-muted-foreground">
            Make your Job visible to a wider audience
          </p>
        </div>
        <div className="rounded-sm border p-3">
          <div className="space-y-1">
            <h2 className="text-sm font-bold">Job Details</h2>
            <p className="text-sm text-muted-foreground">
              Provide a job description and details
            </p>
          </div>

          <div className="py-6">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-3"
              >
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g Frontend developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Job Type</FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue={""}>
                          <option value={""} hidden>
                            Select an option
                          </option>
                          {jobTypes.map((job) => {
                            return (
                              <option key={job} value={job}>
                                {job}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="companyLogo"
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <FormLabel>Company Logo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...fieldValues}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            fieldValues.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Location Types</FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue={""}>
                          <option value={""} hidden>
                            Select an option
                          </option>
                          {locationTypes.map((location) => {
                            return (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Location</FormLabel>
                      <FormControl>
                        <LocationInput
                          onLocationSelected={field.onChange}
                          ref={field.ref}
                        />
                      </FormControl>
                      {watch("location") && (
                        <div className="mt-2 flex items-center gap-3 px-2 py-3 text-sm ">
                          <button
                            className="border-none bg-transparent"
                            onClick={() =>
                              setValue("location", "", { shouldValidate: true })
                            }
                          >
                            <X size={16} color="black" />
                          </button>
                          <p>{watch("location")}</p>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-5">
                  <Label htmlFor="applicationEmail">How to apply</Label>
                  <div className="flex justify-between items-center gap-3 w-full">
                  <FormField
                    control={control}
                    name="applicationEmail"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            onChange={(e) =>{
                              field.onChange(e)
                              trigger('applicationEmail')
                            }}
                           
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>or</div>

                  <FormField
                    control={control}
                    name="applicationUrl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Company url"
                            type="url"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  </div>
                </div>
                <FormField 
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label onClick={() => setFocus("description")}>Job Description</Label>
                    <FormControl>
                      <RichTextEditor 
                      onChange={(draft) => draftToMarkdown(draft)}
                      ref={field.ref}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
