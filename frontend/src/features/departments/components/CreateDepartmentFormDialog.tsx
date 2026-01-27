import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { useEffect, useMemo, useState } from "react";
import { useDepartmentActions } from "../hooks/useDepartmentActions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import type { CreateDepartmentPayload } from "../types/departments.types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDepartmentSchema } from "../schemas/create-department.schema";

interface CreateDepartmentFormDialogProps {
  onSuccess: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateDepartmentFormDialog({
  onSuccess,
  open = false,
  setOpen,
}: CreateDepartmentFormDialogProps) {
  const { create, loading, apiError, clearApiError } = useDepartmentActions();
  const resolver = useMemo(() => zodResolver(createDepartmentSchema), []);

  const form = useForm<CreateDepartmentPayload>({
    resolver,
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit: SubmitHandler<CreateDepartmentPayload> = async (
    values,
  ) => {
    clearApiError();
    try {
      await create(values);
      form.reset();
      onSuccess();
    } catch {
      //errors handled via useDepartmentActions/useApiError
    }
  };

  const handleClose = () => {
    form.reset();
    clearApiError();
    setOpen(false);
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof CreateDepartmentPayload, {
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
      title="Create Department"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="createDepartmentForm"
    >
      <Form {...form}>
        <form
          id="createDepartmentForm"
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
