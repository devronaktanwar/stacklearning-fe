import JobCard from "@/components/JobCard";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import FilterAndSort from "@/components/FilterAndSort";
import { JobFilterProvider, useJobFilter } from "@/context/JobFilterContext";

interface JobBoardPageProps {}
const JobBoardPage: FC<JobBoardPageProps> = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const { selectedJobLocation, selectedDomain } = useJobFilter(); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/all-jobs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);



  const filteredJobs = jobs.filter((job) =>
    [job.jobTitle, job.companyName].some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    ) &&
    (selectedJobLocation === "Any" || job.location === selectedJobLocation) &&
    (selectedDomain === "Any" || job.domain === selectedDomain)
  );

  console.log(filteredJobs)
  return (
    <JobFilterProvider>
    <div className="">
      <div className="sticky top-24 pt-4 pb-2 bg-[#fbfbfb]">
        <div className="relative w-[80%] m-auto mb-4 flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Search for Company, Roles"
            className="max-w-md w-full py-5 pl-10"
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <button className="px-3 py-[9px] rounded text-sm font-semibold bg-primaryNew text-white flex items-center gap-1">
              Search
            </button>
          </div>
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="md:w-[80%] m-auto flex gap-4 flex-col md:flex-row ">
        <div className="flex flex-1 flex-col gap-y-4">
          {filteredJobs.map((job, index) => (
            <JobCard jobData={job} key={index} />
          ))}
        </div>
        <div className="basis-1/3 border rounded-lg p-4 h-fit sticky top-44 bg-white">
          <FilterAndSort />
        </div>
      </div>
    </div>
    </JobFilterProvider>
  );
};

export default JobBoardPage;
