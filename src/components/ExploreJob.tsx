import { FaArrowRightLong } from "react-icons/fa6";
import mumbai from "../assets/mumbai.webp";
import delhi from "../assets/delhi.webp";
import bangalore from "../assets/bangalore.webp";
import hyderabad from "../assets/hyderabad.webp";
import chennai from "../assets/chennai.webp";
import { Button } from "./ui/button";
import Design from "./Design";

const cityData = [
  { name: "Mumbai", image: mumbai },
  { name: "Delhi", image: delhi },
  { name: "Bangalore", image: bangalore },
  { name: "Hyderabad", image: hyderabad },
  { name: "Chennai", image: chennai },
];

const ExploreJob = () => {
  return (
    <div>
      <div className="w-[95%] sm:w-[80%] m-auto bg-white sm:px-6 py-8 rounded-lg border-[1px] px-2">
        <h2 className="text-center font-semibold text-xl sm:text-2xl">
          Explore jobs in 100+ cities
        </h2>
        <Design/>
        <div className="flex justify-center sm:gap-6 mt-6 flex-wrap gap-2">
          {cityData.map((city, index) => (
            <div
              key={index}
              className="w-[150px] sm:w-[200px] border flex flex-col items-center rounded-lg p-4 gap-4"
            >
              <div className="w-full">
                <img src={city.image} alt={city.name} className="w-full" />
              </div>
              <h2 className="font-semibold">{city.name}</h2>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button className="sm:p-6 border-1 rounded-full bg-transparent border border-primaryNew text-primaryNew text-sm sm:text-lg hover:bg-primaryNew hover:text-white flex items-center space-x-2 group">
            View all cities
            <span className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-2">
              <FaArrowRightLong />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreJob;
