import { useEffect, useState, useMemo } from "react";
import { ViewDialog } from "@/components/common/dialogs/ViewDialog";
import { 
  Application, 
  ApplicationSmartScreeningResult 
} from "../types/applications.types";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Knob } from "@/components/common/Knob";
import { Loader2, RefreshCcw, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SmartScreeningDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: Application;
}

export function SmartScreeningDialog({ open, setOpen, application }: SmartScreeningDialogProps) {
  const { runSmartScreening, clearApiError, apiError, loading } = useApplicationsActions();
  const [screeningResult, setScreeningResult] = useState<ApplicationSmartScreeningResult | null>(null);

  async function handleRunScreening() {
    clearApiError();
    const result = await runSmartScreening(application.id);
    if (result) setScreeningResult(result);
  }

  function handleClose() {
    setScreeningResult(null);
    clearApiError();
    setOpen(false);
  }

  useEffect(() => {
    if (open && application && !application?.aiScore && !screeningResult && !loading) {
      handleRunScreening();
    }
  }, [open, application]);

  // Determine if we are showing existing data or new results
  const data = screeningResult || (application?.aiScore ? {
    candidateName: application.fullName,
    score: application.aiScore,
    summary: application.aiSummary,
    decision: application.aiDecision
  } : null);

  return (
    <ViewDialog title="Smart Screening Results" isOpen={open} onClose={handleClose}>
      <div className="space-y-6">
        
        {/* Re-run Alert: Only show if we already have a score and aren't currently loading a new one */}
        {application?.aiScore && !loading && !screeningResult && (
          <Alert className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm flex justify-between items-center w-full">
              <span>This application was previously screened.</span>
              <Button variant="outline" size="sm" onClick={handleRunScreening} className="ml-4 h-8">
                <RefreshCcw className="mr-2 h-3 w-3" /> Re-run
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              Analyzing candidate profile...
            </p>
          </div>
        ) : apiError ? (
          <Alert variant="destructive">
            <AlertDescription>{apiError.message || "Failed to analyze application."}</AlertDescription>
          </Alert>
        ) : data ? (
          <div className="animate-in fade-in duration-500 mt-5">
            <div className="flex justify-center items-center mb-10">
              <Knob value={data.score || 0} size={140} strokeWidth={10} />
            </div>

            <div className="space-y-4 text-sm border-t pt-6">
              <DataRow label="Candidate" value={data.candidateName} />
              <DataRow label="Score" value={`${data.score}/100`} />
              <DataRow label="AI Summary" value={data.summary} isLongText />
              <DataRow 
                label="Recommendation" 
                value={<DecisionBadge decision={data.decision as any} />} 
              />
            </div>
          </div>
        ) : null}
      </div>
    </ViewDialog>
  );
}

function DataRow({ label, value, isLongText = false }: { label: string; value: React.ReactNode; isLongText?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <dt className="text-muted-foreground font-medium">{label}</dt>
      <dd className={cn(
        "col-span-2 text-foreground leading-relaxed",
        isLongText ? "text-xs md:text-sm italic" : "font-semibold"
      )}>
        {value || "N/A"}
      </dd>
    </div>
  );
}

function DecisionBadge({ decision }: { decision: "Reject" | "Move Forward" | "Needs Review" }) {
  const variants = {
    "Move Forward": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "Reject": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "Needs Review": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  const style = variants[decision] || "bg-gray-100 text-gray-700";

  return (
    <Badge className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold", style)}>
      {decision}
    </Badge>
  );
}