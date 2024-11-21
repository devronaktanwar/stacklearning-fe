import ExploreJob from "@/components/ExploreJob";
import FeatureBanner from "@/components/FeatureBanner";
import FeaturedCompanyBanner from "@/components/FeaturedCompanyBanner";
import Header from "@/components/Header";
import JobRoleBanner from "@/components/JobRoleBanner";
import QualificationBanner from "@/components/QualificationBanner";
// import Services from "@/components/Services";
import { FC } from "react";

interface lHomePageProps {}
const HomePage: FC<lHomePageProps> = () => {
  return (
    <div>
      <div>
        <Header />
        <ExploreJob/>
        <FeatureBanner/>
        <FeaturedCompanyBanner/>
        <QualificationBanner/>
        <JobRoleBanner/>
        {/* <Services/> */}
      </div>
    </div>
  );
};

export default HomePage;
