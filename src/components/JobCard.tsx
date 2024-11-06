import { FC, useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
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
  jobDescriptionText: string;
  image: string;
  tagsArray: string[];
  date: string;
  location: string;
  jobType: string; 
  experienceRequired: string; 
  jobDescriptionHtml: string; 
  link: string;
}

const JobCard: FC<JobCardProps> = ({
  jobTitle,
  companyName,
  jobDescriptionText,
  image,
  tagsArray,
  date,
  location,
  jobType,
  experienceRequired,
  jobDescriptionHtml,
  link,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fullDescription =
    jobDescriptionText.length > 350
      ? jobDescriptionText.substring(0, 350) + "....."
      : jobDescriptionText;
  return (
    <div className="p-3 sm:p-6 border rounded-lg w-full flex flex-col gap-4 bg-white">
      <div className="flex justify-between">
        <div className="flex items-start gap-3">
          <div className="border h-12 w-14 rounded-full overflow-hidden md:h-14 md:w-14 aspect-square">
            <img
              src={image}
              alt="Company logo"
              className="h-full w-full object-cover md:h-14 md:w-14 "
            />
          </div>
          <div className="flex flex-col max-w-[300px] sm:max-w-full w-full ">
            <h2 className="text-sm font-semibold sm:text-base text-wrap text-start">{jobTitle}</h2>
            <p className="text-[10px] text-gray-500 font-medium sm:text-sm">
              {companyName}
            </p>
            <div className="flex gap-2 text-[10px] mt-1 flex-wrap">
              {tagsArray.map((tag: string, index: number) => {
                return (
                  <p key={index} className="border py-1 px-2 rounded-full text-[8px] sm:text-xs">
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <p className="text-[10px] sm:text-sm text-gray-500 text-end text-nowrap">{date}</p>
          <p className="text-[10px] sm:text-sm text-gray-500 text-end text-nowrap">{location}</p>
        </div>
      </div>
      <div>
        <p className="text-xs sm:text-sm font-medium">Job Description</p>
        <p className="text-[10px] sm:text-sm text-gray-400">
          <p
            className=""
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
              <button className="px-2 py-1 sm:px-3 sm:py-2 rounded text-[10px] font-semibold text-primary border border-primary flex gap-1 items-center sm:text-sm">
                View JD <IoBookOutline />
              </button>
            </DialogTrigger>
            <DialogContent className="w-[95%] sm:max-w-[520px] rounded max-h-[600px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-4">
                    <div className="border h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={image}
                        alt="Company logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h2 className="text-sm sm:text-base font-semibold text-start">
                        {jobTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        {companyName}
                      </p>
                    </div>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <h2 className="font-medium text-sm">Job Type - </h2>
                      <p>{jobType}</p>
                    </div>
                    <div className="flex gap-1">
                      <h2 className="font-medium">Experience Required - </h2>
                      <p>{experienceRequired}</p>
                    </div>
                    <div className="flex gap-1">
                      <h2 className="font-medium">Location - </h2>
                      <p>{location}</p>
                    </div>
                    <p
                      className="text-[10px] sm:text-xs text-start"
                      dangerouslySetInnerHTML={{
                        __html: jobDescriptionHtml,
                      }}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="flex justify-center w-full">
                  <a
                    className="px-3 py-2 rounded text-sm font-semibold flex items-center gap-1 bg-primaryNew text-white cursor-pointer"
                    href={link}
                  >
                    Apply
                    <CiLocationArrow1 />
                  </a>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <a
            className="px-2 py-1 text-[10px] sm:px-3 sm:py-2 rounded sm:text-sm font-semibold flex items-center gap-1 bg-primaryNew text-white cursor-pointer"
            href={link}
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
