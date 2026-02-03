import { memo, useCallback, useEffect } from "react";
import { SubmitHandler, useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { CountrySelect } from "./create-form/CountrySelect";
import { EmploymentTypeSelect } from "./create-form/EmploymentTypeSelect";
import { ExperienceLevelSelect } from "./create-form/ExperienceLevelSelect";
import { StatusSelect } from "./create-form/StatusSelect";
import { DescriptionEditor } from "./create-form/DescriptionEditor";
import { DynamicSelect } from "@/components/common/DynamicSelect";
import { useJobActions } from "../hooks/useJobsActions";
import { updateJobSchema } from "../schemas/update-job.schema";
import type { Job, UpdateJobPayload } from "../types/jobs.types";
import { useCountries } from "@/shared/hooks/useCountries";
import { toast } from "sonner";

interface UpdateJobFormProps {
	job: Job | null;
	onSuccess: () => void;
}

export function UpdateJobForm({ job, onSuccess }: UpdateJobFormProps) {
	const { update, loading, apiError, clearApiError } = useJobActions();
	const { countries } = useCountries();

	const getDepartmentValue = useCallback((currentJob: Job | null) => {
		const dept = currentJob?.department as any;
		if (!dept) return "";
		if (typeof dept === "string") return dept;
		return dept._id ?? dept.id ?? dept.title ?? "";
	}, []);

	const normalizeCountry = useCallback(
		(value?: string) => {
			if (!value) return "";
			const exact = countries.find((c) => c.name === value);
			if (exact) return exact.name;
			const lower = value.toLowerCase();
			const byNameInsensitive = countries.find((c) => c.name.toLowerCase() === lower);
			const byCode = countries.find((c) => c.code.toLowerCase() === lower);
			return byNameInsensitive?.name ?? byCode?.name ?? value;
		},
		[countries],
	);

	const form = useForm<UpdateJobPayload>({
		resolver: zodResolver(updateJobSchema),
		defaultValues: {
			title: job?.title ?? "",
			description: job?.description ?? "",
			country: job?.country ?? "",
			city: job?.city ?? "",
			status: job?.status,
			employmentType: job?.employmentType,
			experienceLevel: job?.experienceLevel,
			isRemote: job?.isRemote ?? false,
			salaryMin: job?.salaryMin,
			salaryMax: job?.salaryMax,
			department: getDepartmentValue(job),
		},
	});

	useEffect(() => {
		if (!job || countries.length === 0) return;

		const normalizedCountry = normalizeCountry(job.country ?? "");

		form.reset({
			title: job.title ?? "",
			description: job.description ?? "",
			country: normalizedCountry,
			city: job.city ?? "",
			status: job.status,
			employmentType: job.employmentType,
			experienceLevel: job.experienceLevel,
			isRemote: job.isRemote ?? false,
			salaryMin: job.salaryMin,
			salaryMax: job.salaryMax,
			department: getDepartmentValue(job),
		});
	}, [form, job, countries, getDepartmentValue, normalizeCountry]);

	const handleSubmit: SubmitHandler<UpdateJobPayload> = async (values) => {
		clearApiError();
		const jobId = job?.id ?? job?._id;
		if (!jobId) {
			toast.error("Job ID is missing");
			return;
		}

		const dirty = form.formState.dirtyFields as Partial<
			Record<keyof UpdateJobPayload, boolean>
		>;

		const payload = Object.entries(dirty).reduce((acc, [key, isDirty]) => {
			if (!isDirty) return acc;
			const value = values[key as keyof UpdateJobPayload];
			return { ...acc, [key]: value } as UpdateJobPayload;
		}, {} as UpdateJobPayload);

		if (Object.keys(payload).length === 0) {
			toast("Nothing to update. Make a change first.");
			return;
		}

		try {
			await update(jobId, payload);
			onSuccess();
		} catch {
			//=== errors handled via useJobActions/useApiError
		}
	};

	useEffect(() => {
		if (apiError?.validationErrors) {
			apiError.validationErrors.forEach((error) => {
				form.setError(error.field as keyof UpdateJobPayload, {
					type: "server",
					message: error.errors[0],
				});
			});
		} else {
			form.clearErrors();
		}
	}, [apiError?.validationErrors, form]);

	return <JobFormContent form={form} onSubmit={handleSubmit} loading={loading} />;
}

interface JobFormContentProps {
	form: UseFormReturn<UpdateJobPayload>;
	onSubmit: SubmitHandler<UpdateJobPayload>;
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
				id="update-job-form"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 mt-3 mb-2"
			>
				<Card className="shadow-none mt-5">
					<CardContent className="grid sm:grid-cols-3 gap-10">
						<div className="sm:col-span-2 space-y-4 flex flex-col">
							<TitleInput control={form.control} />

							<DepartmentSelect control={form.control} />

							<DescriptionEditor form={form} />
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
	control: UseFormReturn<UpdateJobPayload>["control"];
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
	control: UseFormReturn<UpdateJobPayload>["control"];
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
	control: UseFormReturn<UpdateJobPayload>["control"];
}) {
	return (
		<FormField
			control={control}
			name="city"
			render={({ field }) => (
				<FormItem>
					<FormLabel>City</FormLabel>
					<FormControl>
						<Input placeholder="e.g. New York" {...field} value={field.value ?? ""} />
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
	control: UseFormReturn<UpdateJobPayload>["control"];
	name: keyof Pick<UpdateJobPayload, "salaryMin" | "salaryMax">;
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
						<InputGroup>
							<InputGroupAddon>
								<InputGroupText>$</InputGroupText>
							</InputGroupAddon>
							<InputGroupInput
								type="number"
								min={0}
								placeholder="0.00"
								{...field}
								value={field.value ?? ""}
								onChange={(e) =>
									field.onChange(
										e.target.value === "" ? undefined : Number(e.target.value),
									)
								}
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
	control: UseFormReturn<UpdateJobPayload>["control"];
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

