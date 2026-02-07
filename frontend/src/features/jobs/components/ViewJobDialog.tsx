import { ViewDialog } from "@/components/common/dialogs/ViewDialog";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { AlertCircle, Building } from "lucide-react";
import { useJobActions } from "../hooks/useJobsActions";
import { useSafeHtmlRender } from "@/hooks/useSafeHtmlRender";

interface ViewJobDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ViewJobDialog({ id, open, setOpen }: ViewJobDialogProps) {
  const [job, setJob] = useState<any>(null);
  const { findJob, loading } = useJobActions();
  const safeDescription = useSafeHtmlRender(job?.description);

  const handleClose = () => {
    setJob(null);
    setOpen(false);
  };

  useEffect(() => {
    const fetchJob = async () => {
      if (open && id) {
        const jobData = await findJob(id);
        setJob(jobData);
      }
    };

    fetchJob();
  }, [id, open]);

  return (
    <ViewDialog
      title={"Job Details"}
      isOpen={open}
      onClose={handleClose}
      loading={loading}
      className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[85vh] overflow-y-auto"
    >
      <Card className="bg-transparent shadow-none border-0 pt-2">
        {!job && !loading && (
          <CardContent className="space-y-6 px-4 sm:px-6">
            <Alert variant="default">
              <AlertCircle className="mr-2 h-4 w-4" />
              Job not found or has been deleted.
            </Alert>
          </CardContent>
        )}

        {job && (
          <CardContent className="space-y-6 px-0">
            <JobTitle title={job.title} company={job.company} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="md:col-span-2 order-1 sm:order-0">
                <JobDescription description={job.description} />
              </div>

              <div className="grid grid-cols-2 sm:flex flex-col space-y-4 md:space-y-5 order-0 sm:order-1 ">
                <DepartmentInfo department={job.department?.title} />

                <LocationInfo city={job.city} country={job.country} />

                <EmploymentTypeInfo employmentType={job.employmentType} />

                <ExperienceLevelInfo experienceLevel={job.experienceLevel} />

                <StatusInfo status={job.status} />

                <PostedDateInfo
                  postedDate={job.createdAtDiff ?? job.createdAt}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </ViewDialog>
  );
}

const JobTitle = ({
  title,
  company,
}: {
  title: string;
  company: { id: string; name: string };
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary flex items-center justify-center text-xs font-semibold text-slate-200">
        <Building className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{title}</p>
        <p className="text-xs text-gray-500">{company?.name || "N/A"}</p>
      </div>
    </div>
  );
};

const JobDescription = ({ description }: { description: string }) => {
  const safeDescription = useSafeHtmlRender(description);

  return (
    <div className="space-y-1">
      <div className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-semibold">
        Job Description
      </div>
      <div
        className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm whitespace-pre-wrap break-word
                       [&_ul]:list-disc [&_ul]:ml-4 sm:[&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-4 sm:[&_ol]:ml-6 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      />
    </div>
  );
};
const DepartmentInfo = ({ department }: { department: string }) => {
  return (
    <div className="space-y-1">
      <div className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-semibold">
        Department
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
        {department}
      </div>
    </div>
  );
};

const LocationInfo = ({ city, country }: { city: string; country: string }) => {
  return (
    <div className="space-y-1">
      <div className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-semibold">
        Location
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
        {country}
        {city ? `, ${city}` : ""}
      </div>
    </div>
  );
};

const EmploymentTypeInfo = ({ employmentType }: { employmentType: string }) => {
  return (
    <div className="space-y-1">
      <div className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-semibold">
        Employment Type
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
        {employmentType}
      </div>
    </div>
  );
};

const ExperienceLevelInfo = ({
  experienceLevel,
}: {
  experienceLevel: string;
}) => {
  return (
    <div className="space-y-1">
      <div className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-semibold">
        Experience Level
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
        {experienceLevel}
      </div>
    </div>
  );
};

const StatusInfo = ({ status }: { status: string }) => {
  return (
    <div className="space-y-1">
      <div className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-semibold">
        Status
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
        {status}
      </div>
    </div>
  );
};

const PostedDateInfo = ({ postedDate }: { postedDate: string }) => {
  return (
    <div className="space-y-1">
      <div className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-semibold">
        Posted On
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
        {postedDate}
      </div>
    </div>
  );
};
