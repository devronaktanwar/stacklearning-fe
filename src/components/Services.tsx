import Design from "./Design";
import FeatureCard from "./FeatureCard";

const Services = () => {
  return (
    <div className="w-[80%] m-auto">
      <div className="flex flex-col justify-center items-center gap-12">
        <div>
          <h2 className="text-2xl font-semibold">Our services</h2>
          <Design />
        </div>
        <div className="flex justify-center gap-12">
            <FeatureCard/>
            <FeatureCard/>
            <FeatureCard/>
        </div>
      </div>
    </div>
  );
};

export default Services;
