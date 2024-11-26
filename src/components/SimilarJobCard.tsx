import { FC } from "react";
import { PiBagSimpleBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface lSimilarJobCardProps {
  jobTitle: string;
  companyName: string;
  image: string;
  location: string;
  jobId: string;
  domain: string;
}
const SimilarJobCard: FC<lSimilarJobCardProps> = ({
  jobTitle,
  companyName,
  image,
  location,
  jobId,
  domain,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border rounded-md cursor-pointer" onClick={() => navigate(`/jobs/${domain}/${jobId}`)}>
      <div className="p-3">
        <div className="flex items-start gap-1">
          <div className="border h-10 w-10 rounded-full overflow-hidden aspect-square">
            <img
              src={image}
              alt="Company logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 justify-start items-start">
            <h2 className="text-xs font-semibold text-wrap text-start">
              {jobTitle}
            </h2>
            <div className="flex gap-1 items-center text-gray-500">
              <PiBagSimpleBold size={14} />
              <p className="text-[10px] text-gray-500 font-medium flex-1 text-nowrap">
                {companyName}
              </p>
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center text-gray-500 ">
              <SlLocationPin size={12} />
              <p className="text-[10px] text-nowrap">{location}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-end">
            <FaArrowRightLong size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarJobCard;
