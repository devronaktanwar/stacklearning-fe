import { FC } from "react";

const CompanyResultPage = () => {
  return (
    <div className="w-[95%] md:w-[80%] m-auto py-12">
      <div className="border-b pb-6">
        <CompanyHeader
          url="https://i.ibb.co/HgnYzsD/download-1.png"
          title="Blinkit"
          desc="lorem fbjbjerf ibierifbe berubfe ibiiberigb ibigeri gbidrbrgi ergirdbridfbfgi rigbibv difbgirbg dibvidfbg"
        />
      </div>
    </div>
  );
};
interface lCompanyHeaderProps {
  url: string;
  title: string;
  desc: string;
}
const CompanyHeader: FC<lCompanyHeaderProps> = ({ url, title, desc }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-36">
        <img src={url} alt="img" className="w-full rounded"/>
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-secondaryNew max-w-xl">{desc}</p>
      </div>
    </div>
  );
};
export default CompanyResultPage;
