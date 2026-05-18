import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lock } from "lucide-react";

export function FallBackButton({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="border border-transparent text-white shadow-sm hover:opacity-90 disabled:opacity-70 cursor-not-allowed"
          style={{
            background:
              "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(90deg, #4338ca, #0284c7) border-box",
          }}
        >
          <Lock className="h-4 w-4 text-white" />
          {text}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Upgrade to Pro to unlock this feature</p>
      </TooltipContent>
    </Tooltip>
  );
}
