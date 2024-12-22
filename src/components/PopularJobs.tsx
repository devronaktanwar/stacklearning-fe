import { FC, ReactNode } from "react";
import { CgWebsite } from "react-icons/cg";
import { GrCloudSoftware } from "react-icons/gr";
import { FaNodeJs } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoLogoAndroid } from "react-icons/io";
import { FaReact } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const popularJobsData = [
  {
    icon: <CgWebsite size={38} />,
    title: "Frontend Developer",
  },
  {
    icon: <IoLogoAndroid size={38} />,
    title: "Android Developer",
  },
  {
    icon: <FaReact size={38} />,
    title: "React Developer",
  },
  {
    icon: <FaNodeJs size={38} />,
    title: "Backend Developer",
  },
  {
    icon: <MdOutlineDesignServices size={38} />,
    title: "UI/UX Designer",
  },
  {
    icon: <GrCloudSoftware size={38} />,
    title: "Software Developer",
  },
];
const PopularJobs = () => {
  return (
    <div className="py-12">
      <div className="w-[95%] sm:w-[80%] m-auto">
        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-lg md:text-2xl font-semibold tracking-wide">
              Popular Roles
            </h2>
            <p className="max-w-lg m-auto text-center text-xs text-secondaryNew">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {popularJobsData.map((item, index) => {
              return (
                <PopularJobComponent
                  key={index}
                  icon={item.icon}
                  title={item.title}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface lPopularJobComponentProps {
  icon: ReactNode;
  title: string;
}
const PopularJobComponent: FC<lPopularJobComponentProps> = ({
  icon,
  title,
}) => {
  const navigate = useNavigate();
  const handleSearch = ({ title }: { title: string }) => {
    navigate(`jobs/results?keyword=${title}`);
  };
  return (
    <div
      className="md:p-6 md:py-8 p-4 shadow-sm border-[0.5px] rounded hover:bg-[#25a98420] flex flex-col items-center gap-4 text-[#080808] group transition-all cursor-pointer"
      onClick={() => handleSearch({ title })}
    >
      <div className="p-2 rounded flex justify-center items-center w-fit group-hover:bg-primaryNew group-hover:text-white text-primaryNew bg-green-50">
        {icon}
      </div>
      <h1 className="font-semibold text-sm">{title}</h1>
    </div>
  );
};
export default PopularJobs;
