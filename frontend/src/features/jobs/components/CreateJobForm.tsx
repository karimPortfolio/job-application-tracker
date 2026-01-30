import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { memo, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateJobPayload } from "../types/jobs.types";
import { createJobSchema } from "../schemas/create-job.schema";
import { useJobActions } from "../hooks/useJobsActions";
import { useCountries } from "@/shared/hooks/useCountries";
import { DynamicSelect } from "@/components/common/DynamicSelect";
import { Switch } from "@/components/ui/switch";
import type { UseFormReturn } from "react-hook-form";
import { CountrySelect } from "./create-form/CountrySelect";
import { EmploymentTypeSelect } from "./create-form/EmploymentTypeSelect";
import { ExperienceLevelSelect } from "./create-form/ExperienceLevelSelect";
import { StatusSelect } from "./create-form/StatusSelect";
import { DescriptionEditor } from "./create-form/DescriptionEditor";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

const createJobResolver = zodResolver(createJobSchema);

interface CreateJobFormProps {
  onSuccess: () => void;
}

export function CreateJobForm({ onSuccess }: CreateJobFormProps) {
  const { create, loading, apiError, clearApiError } = useJobActions();

  const form = useForm<CreateJobPayload>({
    resolver: createJobResolver,
    defaultValues: {
      country: "",
      city: "",
      title: "",
      department: "",
      employmentType: undefined,
      experienceLevel: undefined,
      salaryMin: undefined,
      salaryMax: undefined,
      isRemote: false,
      status: undefined,
      description: "",
    },
  });

  const handleSubmit: SubmitHandler<CreateJobPayload> = async (values) => {
    clearApiError();
    try {
      await create(values);
      form.reset();
      onSuccess();
    } catch {
      //=== errors handled via useJobActions/useApiError
    }
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof CreateJobPayload, {
          type: "server",
          message: error.errors[0],
        });
      });
    } else {
      form.clearErrors();
    }
  }, [apiError?.validationErrors, form]);

  return (
    <JobFormContent form={form} onSubmit={handleSubmit} loading={loading} />
  );
}

interface JobFormContentProps {
  form: UseFormReturn<CreateJobPayload>;
  onSubmit: SubmitHandler<CreateJobPayload>;
  loading: boolean;
}

const JobFormContent = memo(function JobFormContent({
  form,
  onSubmit,
  loading,
}: JobFormContentProps) {
  return (
    <Form {...form}>
      <form
        id="create-job-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-3 mb-2"
      >
        <Card className="shadow-none mt-5">
          <CardContent className="grid sm:grid-cols-3 gap-10">
            <div className="sm:col-span-2 space-y-4 flex flex-col">
              <TitleInput control={form.control} />

              <DepartmentSelect control={form.control} />

              <DescriptionEditor control={form.control} />
            </div>

            <div className="space-y-4">
              <CountrySelect control={form.control} />

              <CityInput control={form.control} />

              <EmploymentTypeSelect control={form.control} />

              <ExperienceLevelSelect control={form.control} />

              <div className="flex items-center gap-4">
                <SalaryInput
                  control={form.control}
                  name="salaryMax"
                  label="Salary Max (annual)"
                />

                <SalaryInput
                  control={form.control}
                  name="salaryMin"
                  label="Salary Min (annual)"
                />
              </div>

              <StatusSelect control={form.control} />

              <RemoteSwitch control={form.control} />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
});

const TitleInput = memo(function TitleInput({
  control,
}: {
  control: UseFormReturn<CreateJobPayload>["control"];
}) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="e.g. Software Engineer" {...field} value={field.value ?? ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

const DepartmentSelect = memo(function DepartmentSelect({
  control,
}: {
  control: UseFormReturn<CreateJobPayload>["control"];
}) {
  return (
    <FormField
      control={control}
      name="department"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Department</FormLabel>
          <FormControl>
            <DynamicSelect
              placeholder="Select department"
              endpoint={`${process.env.NEXT_PUBLIC_API_VERSION ?? "V1"}/jobs/departments`}
              label="title"
              value="_id"
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

const CityInput = memo(function CityInput({
  control,
}: {
  control: UseFormReturn<CreateJobPayload>["control"];
}) {
  return (
    <FormField
      control={control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input placeholder="e.g. Marketing" {...field} value={field.value ?? ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

const SalaryInput = memo(function SalaryInput({
  control,
  name,
  label,
}: {
  control: UseFormReturn<CreateJobPayload>["control"];
  name: keyof Pick<CreateJobPayload, "salaryMin" | "salaryMax">;
  label: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputGroup >
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput 
                type="number" 
                min={0} 
                placeholder="0.00" 
                {...field} 
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

const RemoteSwitch = memo(function RemoteSwitch({
  control,
}: {
  control: UseFormReturn<CreateJobPayload>["control"];
}) {
  return (
    <FormField
      control={control}
      name="isRemote"
      render={({ field }) => (
        <FormItem className="flex items-center gap-4 pt-3">
          <FormLabel className="mb-0">Remote</FormLabel>
          <FormControl>
            <Switch
              id="remote-job"
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
