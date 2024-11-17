import ExploreJob from "@/components/ExploreJob";
import FeatureBanner from "@/components/FeatureBanner";
import FeaturedCompanyBanner from "@/components/FeaturedCompanyBanner";
import Header from "@/components/Header";
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
        {/* <Services/> */}
      </div>
    </div>
  );
};

export default HomePage;
