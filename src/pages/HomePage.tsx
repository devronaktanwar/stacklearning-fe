import Header from "@/components/Header";
import Services from "@/components/Services";
import { FC } from "react";

interface lHomePageProps {}
const HomePage: FC<lHomePageProps> = () => {
  return (
    <div>
      <div>
        <Header />
        <Services/>
      </div>
    </div>
  );
};

export default HomePage;
