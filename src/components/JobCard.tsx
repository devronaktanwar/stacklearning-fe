import { FC, useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import img from "../assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface JobCardProps {
  jobTitle: string;
  companyName: string;
}

const JobCard: FC<JobCardProps> = ({ jobData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fullDescription =
    jobData.jobDescriptionText.length > 350
      ? jobData.jobDescriptionText.substring(0, 350) + "....."
      : jobData.jobDescriptionText;
  return (
    <div className="p-6 border rounded-lg w-full flex flex-col gap-4 bg-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="border h-16 w-16 rounded-full overflow-hidden">
            <img
              src={jobData?.image}
              alt="Company logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold">{jobData?.jobTitle}</h2>
            <p className="text-sm text-gray-500 font-medium">
              {jobData?.companyName}
            </p>
            <div className="flex gap-2 text-[10px] mt-1">
              {jobData?.tagsArray.map((tag, index) => {
                return (
                  <p key={index} className="border py-1 px-2 rounded-full">
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <p className="text-sm text-gray-500">{jobData?.date}</p>
          <p className="text-sm text-gray-500">{jobData?.location}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Job Description</p>
        <p className="text-sm text-gray-400">
          <p
            className="text-xs"
            dangerouslySetInnerHTML={{
              __html: fullDescription,
            }}
          />
        </p>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="px-3 py-2 rounded text-sm font-semibold text-primary border border-primary flex gap-1 items-center">
                View JD <IoBookOutline />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-4">
                    <div className="border h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={img}
                        alt="Company logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold">
                        {jobData?.jobTitle}
                      </h2>
                      <p className="text-sm text-gray-500 font-medium">
                        {jobData?.companyName}
                      </p>
                    </div>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <h2 className="font-medium text-sm">Job Type - </h2>
                      <p>{jobData?.jobType}</p>
                    </div>
                    <div className="flex gap-1">
                      <h2 className="font-medium">Experience Required - </h2>
                      <p>{jobData?.experienceRequired}</p>
                    </div>
                    <div className="flex gap-1">
                      <h2 className="font-medium">Location - </h2>
                      <p>{jobData?.location}</p>
                    </div>
                    <p
                      className="text-xs"
                      dangerouslySetInnerHTML={{
                        __html: jobData?.jobDescriptionHtml,
                      }}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="flex justify-center w-full">
                  <a
                    className="px-3 py-2 rounded text-sm font-semibold flex items-center gap-1 bg-primaryNew text-white cursor-pointer"
                    href={jobData?.link}
                  >
                    Apply
                    <CiLocationArrow1 />
                  </a>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <a
            className="px-3 py-2 rounded text-sm font-semibold flex items-center gap-1 bg-primaryNew text-white cursor-pointer"
            href={jobData?.link}
          >
            Apply
            <CiLocationArrow1 />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
