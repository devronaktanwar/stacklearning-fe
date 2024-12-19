import { FC } from "react";
const featuredCompaniesData = [
  {
    url: "https://i.ibb.co/HgnYzsD/download-1.png",
    title: "Amazon",
  },
  {
    url: "https://i.ibb.co/HgnYzsD/download-1.png",
    title: "Google",
  },
  {
    url: "https://i.ibb.co/HgnYzsD/download-1.png",
    title: "Microsoft",
  },
  {
    url: "https://i.ibb.co/HgnYzsD/download-1.png",
    title: "Blinkit",
  },
  {
    url: "https://i.ibb.co/HgnYzsD/download-1.png",
    title: "Blinkit",
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
  return (
    <div className="md:p-6 p-4 shadow-sm border-[0.5px] rounded cursor-pointer">
      <div className="flex flex-col gap-2">
        <div className="w-32 overflow-hidden">
          <img
            src={url}
            alt="img"
            className="w-full rounded hover:scale-95 transition-all"
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
