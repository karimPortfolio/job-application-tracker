import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileUpdatePayload } from "../types/profile.types";
import { Button } from "@/components/ui/button";
import { Save, Trash, Upload } from "lucide-react";
import { useProfileActions } from "../hooks/useProfileActions";
import { Spinner } from "@/components/ui/spinner";
import { FormFieldGrid } from "./shared-components/FormFieldGrid";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../schemas/update-profile.schema";
import { Separator } from "@/components/ui/separator";
import { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formResolver = zodResolver(updateProfileSchema);

export function PersonalInformationsForm() {
  const { user } = useAuthStore();
  const { updateProfile, loading, apiError, clearApiError } =
    useProfileActions();

  const form = useForm<ProfileUpdatePayload>({
    resolver: formResolver,
    defaultValues: {
      name: user?.name,
      email: user?.email,
      avatar: undefined,
    },
  });

  const avatarUrl = useMemo(() => {
    const avatarFile = form.watch("avatar");
    if (avatarFile instanceof File) {
      return URL.createObjectURL(avatarFile);
    }

    return user?.avatarUrl;
  }, [user, form.watch("avatar")]);

  const getInitials = useCallback(
    (name?: string | null): string => {
      if (!name) return "?";
      const parts = name.trim().split(/\s+/);
      const first = parts[0]?.[0] ?? "";
      const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
      const combo = `${first}${last}`.trim();
      return combo ? combo.toUpperCase() : "?";
    },
    [user?.name],
  );

  const clearAvatar = () => {
    form.resetField("avatar");
  };

  const handleSubmit: SubmitHandler<ProfileUpdatePayload> = async (values) => {
    clearApiError();
    try {
      const formData = new FormData();
      if (values.name) formData.append("name", values.name);
      if (values.email) formData.append("email", values.email);
      if (values.avatar instanceof File)
        formData.append("avatar", values.avatar);

      await updateProfile(formData);
      form.reset();
    } catch (err) {}
  };

  return (
    <Form {...form}>
      <form
        id="updateProfileForm"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-3 mb-2"
      >
        <FormFieldGrid
          label="Avatar"
          description="Upload a profile picture to change your current avatar"
        >
          <div className="flex items-center gap-5">
            <Avatar className="w-20 h-20 border border-gray-200">
              <AvatarImage
                src={avatarUrl ?? undefined}
                alt={user?.name ?? "User"}
              />
              <AvatarFallback className="text-lg">{getInitials(user?.name)}</AvatarFallback>
            </Avatar>

            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      value=""
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel
              htmlFor="avatar"
              className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 dark:text-white h-9 px-4 py-2 has-[>svg]:px-3"
            >
              <Upload className="h-3 w-3" />
              Upload avatar
            </FormLabel>
            <Button type="button" variant="destructive" onClick={clearAvatar}>
              <Trash className="w-3 h-3" />
              Delete avatar
            </Button>
          </div>
        </FormFieldGrid>

        <Separator />

        <FormFieldGrid label="Name">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGrid>

        <Separator />

        <FormFieldGrid label="Email" description="Enter your new email">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGrid>

        <Separator />

        <div className="w-full flex justify-end">
          <SubmitButton loading={loading} formId="updateProfileForm" />
        </div>
      </form>
    </Form>
  );
}

function SubmitButton({
  loading,
  formId,
}: {
  loading: boolean;
  formId: string;
}) {
  if (loading) {
    return (
      <Button form={formId} disabled={!!loading}>
        <Spinner className="w-8" />
        Submitting
      </Button>
    );
  }

  return (
    <Button form={formId} disabled={!!loading}>
      <Save className="h-3 w-3" />
      Save
    </Button>
  );
}
