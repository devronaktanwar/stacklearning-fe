import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiOutlineBookmark } from "react-icons/hi";
import JobCard, { JobCardProps } from "./JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const SavedJobsDrawer = () => {
  const [savedJobsData, setSavedJobsData] = useState<JobCardProps[]>([]);
  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(
        "https://stacklearning-be.onrender.com/api/jobs/saved/6a27d6240a148d3e960d91d3"
      );
      setSavedJobsData(response.data.savedJobs);
    } catch (err) {
      console.log("Error fetching saved jobs:", err);
    }
  };
  useEffect(() => {
    fetchSavedJobs();
  }, []);
  return (
    <div>
      <Sheet>
        <SheetTrigger className="p-2 bg-primaryNew text-white rounded flex items-center text-xs gap-2">
          <HiOutlineBookmark />
          Saved
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2 text-lg">
                <HiOutlineBookmark />
                Saved Jobs
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="h-[100vh] overflow-y-scroll gap-3 flex flex-col scrollbar-hidden">
                {savedJobsData.map((job) => {
                  return (
                    <JobCard
                      jobTitle={job.jobTitle}
                      companyName={job.companyName}
                      jobDescriptionText={""}
                      image={job.image}
                      tagsArray={job.tagsArray}
                      date={job.date}
                      location={job.location}
                      jobType={job.jobType}
                      experienceRequired={job.experienceRequired}
                      jobDescriptionHtml={job.jobDescriptionHtml}
                      link={job.link}
                      jobId={job.jobId}
                    />
                  );
                })}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SavedJobsDrawer;
