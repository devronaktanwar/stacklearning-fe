import { JobCardProps } from "@/components/JobCard";
import SimilarJobCard from "@/components/SimilarJobCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { PiBagSimpleBold } from "react-icons/pi";
import { SlCalender, SlLocationPin } from "react-icons/sl";
import { useParams } from "react-router-dom";
import hiring from "../assets/hiring.svg";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaLink } from "react-icons/fa";
const JobPage = () => {
  const { jobId, domain } = useParams<{ jobId: string; domain: string }>();
  const [jobData, setJobData] = useState<JobCardProps | null>(null);
  const [similarJob, setSimilarJob] = useState<JobCardProps[] | null>(null);

  const fetchJobData = async () => {
    try {
      const response = await axios.get(
        `https://stacklearning-be-h0pq.onrender.com/api/get-job-detail/${jobId}`
      );
      setJobData(response.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const fetchSimilarJobs = async () => {
    try {
      const response = await axios.get(
        `https://stacklearning-be-h0pq.onrender.com/api/get-jobs-by-domain/${domain}`
      );
      setSimilarJob(response.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  useEffect(() => {
    if (jobId && domain) {
      fetchJobData();
      fetchSimilarJobs();
    }
  }, [jobId, domain]);
  console.log("similar", similarJob);
  if (!jobData) {
    return <div className="text-center mt-12">Loading...</div>;
  }

  const newDate = new Date(jobData.date);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(newDate);

  return (
    <div className="py-4 sm:py-8">
      <div className="w-[98%] sm:w-[95%] m-auto">
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="flex-1 bg-white sm:p-6 sm:px-8 p-3 px-4 border rounded-lg flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-start gap-3">
                <div className="border h-12 w-12 rounded-full overflow-hidden md:h-14 md:w-14 aspect-square">
                  <img
                    src={jobData.image}
                    alt="Company logo"
                    className="h-full w-full object-cover md:h-14 md:w-14"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-start items-start">
                  <h2 className="text-sm font-semibold sm:text-base text-wrap text-start">
                    {jobData.jobTitle}
                  </h2>
                  <div className="flex gap-1 items-center text-gray-500">
                    <PiBagSimpleBold size={16} />
                    <p className="text-[10px] text-gray-500 font-medium sm:text-sm">
                      {jobData.companyName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <div className="flex items-center gap-2 text-gray-500">
                  <SlCalender size={14} />
                  <p className="text-[10px] sm:text-sm text-end text-nowrap">
                    {formattedDate}
                  </p>
                </div>
                <div className="flex gap-1 items-center text-gray-500">
                  <SlLocationPin size={14} />
                  <p className="text-[10px] sm:text-sm text-end text-nowrap">
                    {jobData.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 text-[10px] mt-1 flex-wrap">
                {jobData.tagsArray.map((tag, index) => (
                  <p
                    key={index}
                    className="border py-1 px-2 rounded-full text-[8px] sm:text-xs"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button className="px-2 py-1 sm:px-3 sm:py-2 rounded text-[10px] font-semibold text-primary border border-primary flex gap-1 items-center sm:text-sm">
                Copy Link <FaLink  />
              </button>
                <a
                  className="px-2 py-1 text-[10px] sm:px-3 sm:py-2 rounded sm:text-sm font-semibold flex items-center gap-1 bg-primaryNew text-white cursor-pointer"
                  href={jobData.link}
                >
                  Apply
                  <CiLocationArrow1 />
                </a>
              </div>
            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-semibold text-[14px]">Job Description</h2>
              <div
                className="text-sm prose w-full max-w-none"
                dangerouslySetInnerHTML={{ __html: jobData.jobDescriptionHtml }}
              />
            </div>
          </div>

          <div className="w-full lg:w-[400px] border p-3 sm:p-6 rounded-lg h-fit bg-white flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <img src={hiring} alt="img" className="w-6" />
              <h2 className="font-semibold text-base">Similar Jobs</h2>
            </div>
            <div className="flex flex-col gap-3">
              {similarJob?.map((job, index) => {
                return (
                  <SimilarJobCard
                    key={index}
                    jobTitle={job.jobTitle}
                    companyName={job.companyName}
                    image={job.image}
                    location={job.location}
                    jobId={job.jobId}
                    domain={job.domain}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
