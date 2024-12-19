import { FC, ReactNode } from "react";
import { VscAccount } from "react-icons/vsc";
import { RiProfileLine } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";

const HowItWorksData = [
  {
    icon: <VscAccount size={42}/>,
    title: "Create account",
    desc: "The phrasal sequence of the is now so that many campaign and benefit",
  },
  {
    icon: <RiProfileLine size={42}/>,
    title: "Complete Your Profile",
    desc: "The phrasal sequence of the is now so that many campaign and benefit",
  },
  {
    icon: <FaLink size={42}/>,
    title: "Apply for Jobs",
    desc: "The phrasal sequence of the is now so that many campaign and benefit",
  },
];
const HowItWorks = () => {
  return (
    <div className="py-12">
      <div className="w-[95%] sm:w-[80%] m-auto">
        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-lg md:text-2xl font-semibold tracking-wide">
              How it work's
            </h2>
            <p className="max-w-lg m-auto text-center text-xs text-secondaryNew">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {HowItWorksData.map((item, index) => {
              return (
                <HowItWorkBox
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
interface lHowItWorkBoxProps {
  icon: ReactNode;
  title: string;
  desc: string;
}
const HowItWorkBox: FC<lHowItWorkBoxProps> = ({ icon, title, desc }) => {
  return (
    <div className="max-w-sm border-[0.5px] px-4 py-6 rounded">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-primaryNew">{icon}</div>
        <h2 className="font-semibold sm:text-base text-sm">{title}</h2>
        <p className="text-xs text-secondaryNew text-center">{desc}</p>
      </div>
    </div>
  );
};
export default HowItWorks;
