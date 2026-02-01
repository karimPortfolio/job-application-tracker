import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { useEffect, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import type {
  Department,
  UpdateDepartmentPayload,
} from "../types/departments.types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDepartmentSchema } from "../schemas/update-department.schema";
import { useDepartmentsActions } from "../hooks/useDepartmentsActions";

interface UpdateDepartmentFormDialogProps {
  onSuccess: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export function UpdateDepartmentFormDialog({
  onSuccess,
  open = false,
  setOpen,
  id,
}: UpdateDepartmentFormDialogProps) {
  const { update, loading, apiError, findDepartment, clearApiError } =
    useDepartmentsActions();
  const resolver = useMemo(() => zodResolver(updateDepartmentSchema), []);
  const [department, setDepartment] = useState<Department | null>(null);

  const form = useForm<UpdateDepartmentPayload>({
    resolver,
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit: SubmitHandler<UpdateDepartmentPayload> = async (
    values,
  ) => {
    clearApiError();
    if (!department?._id)
      throw new Error("Department ID is required for update.");

    // Only send fields that have actually changed
    const dirtyData = Object.keys(form.formState.dirtyFields).reduce((acc, key) => {
      const field = key as keyof UpdateDepartmentPayload;
      acc[field] = values[field];
      return acc;
    }, {} as Partial<UpdateDepartmentPayload>);

    if (Object.keys(dirtyData).length === 0) {
      setOpen(false);
      return;
    }

    try {
      await update(department._id, dirtyData as UpdateDepartmentPayload);
      form.reset();
      onSuccess();
    } catch {
      //====errors handled via useDepartmentActions/useApiError
    }
  };

  const handleClose = () => {
    form.reset();
    clearApiError();
    setOpen(false);
  };

  useEffect(() => {
    async function fetchDepartment(id: string) {
      if (open && id) {
        const dept = await findDepartment(id);
        setDepartment(dept);
        if (dept) {
          form.reset({
            title: dept.title,
            description: dept.description || "",
          });
        }
      }
    }

    fetchDepartment(id);
  }, [open, id]);

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof UpdateDepartmentPayload, {
          type: "server",
          message: error.errors[0],
        });
      });
    } else {
      form.clearErrors();
    }
  }, [apiError?.validationErrors, form]);

  return (
    <FormDialog
      title="Update Department"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="updateDepartmentForm"
    >
      <Form {...form}>
        <form
          id="updateDepartmentForm"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mt-3 mb-2"
        >
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Marketing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Responsible for marketing strategies"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </FormDialog>
  );
}
