// import ExploreJob from "@/components/ExploreJob";
// import FeatureBanner from "@/components/FeatureBanner";
// import FeaturedCompanyBanner from "@/components/FeaturedCompanyBanner";
import FeaturedCompany from "@/components/FeaturedCompany";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
// import JobRoleBanner from "@/components/JobRoleBanner";
import PopularJobs from "@/components/PopularJobs";
// import QualificationBanner from "@/components/QualificationBanner";
// import Services from "@/components/Services";
import { FC } from "react";

interface lHomePageProps {}
const HomePage: FC<lHomePageProps> = () => {
  return (
    <div>
      <div>
        <Header />
        <PopularJobs/>
        <HowItWorks/>
        <FeaturedCompany/>
        {/* <ExploreJob />
        <FeatureBanner />
        <FeaturedCompanyBanner />
        <QualificationBanner />
        <JobRoleBanner /> */}
        {/* <Services/> */}
      </div>
    </div>
  );
};

export default HomePage;
