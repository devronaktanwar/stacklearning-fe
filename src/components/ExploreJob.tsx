// import { FaArrowRightLong } from "react-icons/fa6";
import mumbai from "../assets/mumbai.webp";
import delhi from "../assets/delhi.webp";
import bangalore from "../assets/bangalore.webp";
import hyderabad from "../assets/hyderabad.webp";
// import chennai from "../assets/chennai.webp";
import Design from "./Design";
import AllCitiesModal from "./AllCitiesModal";

const cityData = [
  { name: "Mumbai", image: mumbai },
  { name: "Delhi", image: delhi },
  { name: "Bangalore", image: bangalore },
  { name: "Hyderabad", image: hyderabad },
  //   { name: "Chennai", image: chennai },
];

const ExploreJob = () => {
  return (
    <div className="text-[#161c2d] pt-16">
      <div className="w-[95%] sm:w-[80%] m-auto sm:px-6 py-6 rounded-lg px-2">
        <h2 className="text-center font-semibold text-xl sm:text-2xl">
          Explore jobs in 100+ cities
        </h2>
        <Design />
        <div className="flex justify-center sm:gap-6 mt-6 flex-wrap gap-2">
          {cityData.map((city, index) => (
            <div
              key={index}
              className="w-[150px] sm:w-[200px] border flex flex-col items-center rounded-lg p-4 gap-4 cursor-pointer hover:bg-[#0596680f] transition-all"
            >
              <div className="w-full">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full hover:scale-110  transition"
                />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">
                {city.name}
              </h2>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <AllCitiesModal />
        </div>
      </div>
    </div>
  );
};

export default ExploreJob;
