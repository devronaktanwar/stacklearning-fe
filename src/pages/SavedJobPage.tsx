import CircularLoader from "@/components/CircularLoader";
import JobCard, { JobCardProps } from "@/components/JobCard";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { LuBookmark } from "react-icons/lu";

const SavedJobPage = () => {
  const { user } = useUserContext();
  const [savedJobs, setSavedJobs] = useState<JobCardProps[]>([]);

  useEffect(() => {
    if (user.savedJobs) {
      setSavedJobs(user.savedJobs); 
    }
  }, [user.savedJobs]);

  if (!user.savedJobs) {
    return (
      <div className="w-full justify-center flex items-center h-[40vh]">
        <CircularLoader />
      </div>
    );
  }
  if (savedJobs?.length === 0) {
    return (
      <div className="w-full justify-center flex mt-6">
        <h2>Nothing to show</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="w-[95%] lg:w-[80%] m-auto py-4 flex flex-col gap-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <LuBookmark size={24} /> Saved Jobs
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {savedJobs.map((job, index) => (
            <JobCard
              key={job.jobId || index}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              jobDescriptionText={job.jobDescriptionText}
              image={job.image}
              tagsArray={job.tagsArray}
              date={job.date}
              location={job.location}
              jobType={job.jobType}
              experienceRequired={job.experienceRequired}
              jobDescriptionHtml={job.jobDescriptionHtml}
              link={job.link}
              jobId={job.jobId}
              domain={job.domain}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobPage;
