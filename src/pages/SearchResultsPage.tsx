import JobCard, { JobCardProps } from "@/components/JobCard";
import Loader from "@/components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BASE_URL from "../../config";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResults = async () => {
    if (keyword || location) {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/search`, {
          params: { keyword, location },
        });
        setResults(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchResults();
  }, [keyword, location]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-[95%] md:w-[80%] m-auto">
      <div className="py-4">
        <p className="text-sm text-primaryNew">
          <i className="font-semibold text-secondaryNew">
            Showing results for{" "}
          </i>
          {keyword} {location}
        </p>
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

export default SearchResultsPage;
