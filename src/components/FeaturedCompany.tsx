import { FC } from "react";
import { useNavigate } from "react-router-dom";
const featuredCompaniesData = [
  {
    url: "https://i.ibb.co/WVky7qP/Untitled-design-2.png",
    title: "Amazon",
  },
  {
    url: "https://i.ibb.co/wYf6qb6/Untitled-design-3.png",
    title: "Uber",
  },
  {
    url: "https://i.ibb.co/y4zRHYD/Untitled-design-4.png",
    title: "Google",
  },
  {
    url: "https://i.ibb.co/N1cC8XC/Untitled-design-5.png",
    title: "Walmart",
  },
  {
    url: "https://i.ibb.co/5rWW9bg/Untitled-design-6.png",
    title: "Zomato",
  },
];
const FeaturedCompany = () => {
  return (
    <div className="py-6">
      <div className="w-[95%] sm:w-[80%] m-auto border-[0.5px] py-12 rounded-lg shadow-sm">
        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-lg md:text-2xl font-semibold tracking-wide">
              Featured companies hiring
            </h2>
            <p className="max-w-lg m-auto text-center text-xs text-secondaryNew">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {featuredCompaniesData.map((item, index) => {
              return (
                <FeaturedBox key={index} url={item.url} title={item.title} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
interface lFeaturedBoxProps {
  url: string;
  title: string;
}
const FeaturedBox: FC<lFeaturedBoxProps> = ({ url, title }) => {
    const navigate = useNavigate();
    const handleSearch = ({ company }: { company: string }) => {
      navigate(`jobs/company?company=${company}`);
    };
  return (
    <div className="md:p-6 p-4 shadow-sm border-[0.5px] rounded cursor-pointer"onClick={()=>handleSearch({company:title.toLocaleLowerCase()})}>
      <div className="flex flex-col gap-2">
        <div className="w-32 overflow-hidden">
          <img
            src={url}
            alt="img"
            className="w-full rounded hover:scale-95 transition-all border"
          />
        </div>
        <div>
          <h2 className="md:text-base text-sm font-semibold text-center">{title}</h2>
        </div>
      </div>
    </div>
  );
};
export default FeaturedCompany;
