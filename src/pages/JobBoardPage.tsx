import JobCard from "@/components/JobCard";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import FilterAndSort from "@/components/FilterAndSort";
import { useJobFilter } from "@/context/JobFilterContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FilterDrawer from "@/components/FilterDrawer";
import SavedJobsDrawer from "@/components/SavedJobsDrawer";

interface JobBoardPageProps {}
const JobBoardPage: FC<JobBoardPageProps> = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    selectedJobLocation,
    selectedPeriod,
    selectedDomain,
    selectedJobType,
    selectedLocation,
  } = useJobFilter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://stacklearning-be-h0pq.onrender.com/api/all-jobs",
          {
            headers: {
              authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLoading(false);
        setJobs(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const isDateWithinRange = (date: string, range: string): boolean => {
    const jobDate = new Date(date);
    const today = new Date();
    if (range === "today") {
      return (
        jobDate.getDate() === today.getDate() &&
        jobDate.getMonth() === today.getMonth() &&
        jobDate.getFullYear() === today.getFullYear()
      );
    } else if (range === "lastWeek") {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      return jobDate >= oneWeekAgo && jobDate <= today;
    } else if (range === "lastMonth") {
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      return jobDate >= oneMonthAgo && jobDate <= today;
    }
    return true;
  };

  const filteredJobs = jobs.filter(
    (job) =>
      [job.jobTitle, job.companyName].some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (selectedJobLocation === "Any" ||
        job?.jobLocation === selectedJobLocation) &&
      isDateWithinRange(job.date, selectedPeriod) &&
      (selectedDomain === "Any" || job?.domain === selectedDomain) &&
      (selectedJobType === "Any" || job?.jobType === selectedJobType) &&
      (selectedLocation === "Any" || job?.location === selectedLocation)
  );
  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-[40vh]">
        <AiOutlineLoading3Quarters
          size={28}
          className="animate-spin text-primaryNew"
        />
      </div>
    );

  if (!filteredJobs) {
    return <div className="text-[400px]">No Jobs Found</div>;
  }

  return (
    <div className="relative">
      <div className="sticky top-0 pt-4 pb-2 bg-[#fbfbfb]">
        <div className="relative w-[95%] sm:w-[80%] m-auto mb-4 flex items-center gap-2">
          <div className="sm:max-w-md w-[90%] flex items-center gap-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search for company, roles"    
                className="w-full py-5 pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <SavedJobsDrawer />
            </div>
          </div>
          <div className="md:hidden">
            <FilterDrawer />
          </div>
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="md:w-[80%] m-auto flex gap-4 flex-col md:flex-row w-[95%]">
        <div className="flex flex-1 flex-col gap-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard
                key={index}
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
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">No jobs found</div>
          )}
        </div>
        <div className="hidden md:flex basis-1/3 border rounded-lg p-4 h-fit sticky top-44 bg-white">
          <FilterAndSort />
        </div>
      </div>
    </div>
  );
};

export default JobBoardPage;
