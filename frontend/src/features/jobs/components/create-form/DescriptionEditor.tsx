import { Control } from "react-hook-form";
import { CreateJobPayload } from "../../types/jobs.types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface DescriptionEditorProps {
  control: Control<CreateJobPayload>;
}

export function DescriptionEditor({ control }: DescriptionEditorProps) {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-0">Description</FormLabel>
          <FormControl>
            <RichTextEditor value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
