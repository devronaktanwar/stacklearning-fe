import { FC, useEffect, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiBagSimpleBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import { LuBookmark, LuCheckCircle } from "react-icons/lu";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import toast from "react-hot-toast";
import { useJobFilter } from "@/context/JobFilterContext";
import BASE_URL from "../../config";

export interface JobCardProps {
  jobTitle: string;
  companyName: string;
  jobDescriptionText: string;
  image: string;
  tagsArray: string[];
  date: string;
  location: string;
  jobType: string;
  experienceRequired: string;
  jobDescriptionHtml: string;
  link: string;
  jobId: string;
  domain: string;
}

const JobCard: FC<JobCardProps> = ({
  jobTitle,
  companyName,
  jobDescriptionText,
  image,
  tagsArray,
  date,
  location,
  jobId,
  domain,
}) => {
  const navigate = useNavigate();
  const { user, updateSavedJobs } = useUserContext();
  const { setLoading } = useJobFilter();
  const newDate = new Date(date);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(newDate);
  const fullDescription =
    jobDescriptionText.length > 350
      ? jobDescriptionText.substring(0, 350) + "....."
      : jobDescriptionText;

  const handleShare = async (
    url: string,
    title: string,
    company: string,
    location: string
  ) => {
    const shareData = {
      title: `${title} at ${company}`,
      text: `${company} is Hiring!\nRole: ${title}\nLocation: ${location}\n📩 Apply Here: ${url}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Content shared successfully");
      } else {
        alert("Share API not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  useEffect(() => {
    if (
      user?.savedJobs.length > 0 &&
      user?.savedJobs.some((job: any) => job.jobId === jobId)
    ) {
      setIsSaved(true);
    }
  }, [user, jobId]);
  const handleJobSave = async (jobId: string) => {
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const data = await axios.get(`${BASE_URL}/api/get-job-detail/${jobId}`);
      const response = await axios.post(`${BASE_URL}/api/jobs/save`, {
        jobId: jobId,
        userId: user._id,
      });
      if (response.data.isSuccess) {
        toast.success("Job saved successfully", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
        updateSavedJobs([...user.savedJobs, data.data]);
        setIsSaved(true);
      } else {
        toast.error("Job is already saved", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
      }
    } catch (err) {
      toast.error("something went wrong", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          fontSize: "12px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 border rounded-lg w-full flex flex-col gap-4 bg-white">
      <div className="flex justify-between">
        <div className="flex items-start gap-3">
          <div className="border h-12 w-12 rounded-full overflow-hidden md:h-14 md:w-14 aspect-square">
            <img
              src={image}
              alt="Company logo"
              className="h-full w-full object-cover md:h-14 md:w-14 "
            />
          </div>
          <div className="flex flex-col flex-1 justify-start items-start">
            <h2 className="flex-1 text-sm font-semibold sm:text-base text-wrap text-start">
              {jobTitle}
            </h2>
            <div className="flex gap-1 items-center text-gray-500">
              <PiBagSimpleBold size={16} />
              <p className="text-[9px] text-gray-500 font-medium sm:text-sm flex-1 text-nowrap">
                {companyName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div className="flex items-center gap-2 text-gray-500">
            <SlCalender size={14} />
            <p className="text-[10px] sm:text-sm  text-end text-nowrap">
              {formattedDate}
            </p>
          </div>
          <div className="flex gap-1 items-center text-gray-500 ">
            <SlLocationPin size={14} />
            <p className="text-[10px] sm:text-sm text-end text-nowrap">
              {location}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 text-[10px] mt-1 flex-wrap">
          {tagsArray.map((tag, index) => (
            <p
              key={index}
              className="border py-1 px-2 rounded-full text-[8px] sm:text-xs"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] sm:text-sm text-gray-400">
          <p
            className=""
            dangerouslySetInnerHTML={{
              __html: fullDescription,
            }}
          />
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div
          className="cursor-pointer"
          onClick={() => !isSaved && handleJobSave(jobId)}
        >
          {isSaved ? (
            <div className="text-gray-500 flex items-center gap-1 text-sm">
              <LuCheckCircle size={18} />
              Saved
            </div>
          ) : (
            <LuBookmark size={20} className="text-gray-500" />
          )}
        </div>
        <div className="flex gap-4">
          <button
            className="px-2 py-1 sm:px-3 sm:py-2 rounded text-[10px] font-semibold text-primary border border-primary flex gap-1 items-center sm:text-sm"
            onClick={() =>
              handleShare(
                `https://stacklearning.in/jobs/${domain}/${jobId}`,
                jobTitle,
                companyName,
                location
              )
            }
          >
            Share link <FaLink />
          </button>

          <button
            className="px-2 py-1 text-[10px] sm:px-3 sm:py-2 rounded sm:text-sm font-semibold flex items-center gap-1 bg-primaryNew text-white cursor-pointer border border-primaryNew"
            onClick={() => navigate(`/jobs/${domain}/${jobId}`)}
          >
            Apply
            <CiLocationArrow1 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
