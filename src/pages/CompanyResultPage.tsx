import JobCard, { JobCardProps } from "@/components/JobCard";
import Loader from "@/components/Loader";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import BASE_URL from "../../config";

const CompanyResultPage = () => {
  const [searchParams] = useSearchParams();
  const company = searchParams.get("company") || "";
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyDetail, setCompanyDetail] = useState<any>([]);
  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/get-company-by-name`, {
        company,
      });
      setCompanyDetail(response.data.data[0]);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const fetchResults = async () => {
    if (company) {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/search`, {
          params: { company },
        });
        setResults(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log({ results });
  useEffect(() => {
    fetchResults();
    fetchCompanyDetails();
  }, [company]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (results.length == 0) {
    return <div>No results found</div>;
  }
  return (
    <div className="w-[95%] md:w-[80%] m-auto py-8 flex flex-col gap-4">
      <div className="bg-white">
        <CompanyHeader
          url={companyDetail.image}
          title={companyDetail.name}
          desc={companyDetail.desc}
        />
      </div>
      <div className="grid xl:grid-cols-2 gap-4">
        {results.map((job: JobCardProps, index: number) => {
          return (
            <div key={index} className="w-full">
              <JobCard
                jobTitle={job.jobTitle}
                companyName={job.companyName}
                jobDescriptionText={job.jobDescriptionText}
                image={job.image}
                tagsArray={job.tagsArray}
                date={job.date}
                location={job.location}
                jobType={job.jobType}
                experienceRequired={job.experienceRequired}
                jobDescriptionHtml={job.jobDescriptionHtml}
                link={job.link}
                jobId={job.jobId}
                domain={job.domain}
              />
            </div>
          );
        })}
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
    <div className="flex items-center gap-4 border-[0.5px] p-4 rounded-lg bg-gradient-to-r from-green-50 via-green-100 to-green-50 border-primaryNew">
      <div className="w-20 md:w-24 -translate-y-10 lg:-translate-y-9">
        <img src={url} alt="img" className="w-full rounded border" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-lg md:text-2xl font-semibold text-primaryNew">
          {title}
        </h2>
        <p className="text-xs text-secondaryNew max-w-xl">{desc}</p>
        <div className="flex items-center gap-1">
          <IoIosStar size={14} className="text-yellow-500" />
          <p className="text-xs font-medium">4.6 Ratings</p>
        </div>
      </div>
    </div>
  );
};
export default CompanyResultPage;
