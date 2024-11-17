import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import mumbai from "../assets/mumbai.webp";
import delhi from "../assets/delhi.webp";
import bangalore from "../assets/bangalore.webp";
import hyderabad from "../assets/hyderabad.webp";
const AllCitiesModal = () => {
  const cityData = [
    { name: "Mumbai", image: mumbai },
    { name: "Delhi", image: delhi },
    { name: "Bangalore", image: bangalore },
    { name: "Hyderabad", image: hyderabad },
    { name: "Mumbai", image: mumbai },
    { name: "Delhi", image: delhi },
    { name: "Bangalore", image: bangalore },
    { name: "Hyderabad", image: hyderabad },
    { name: "Mumbai", image: mumbai },
    { name: "Delhi", image: delhi },
    { name: "Bangalore", image: bangalore },
    { name: "Hyderabad", image: hyderabad },
  ];
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="sm:p-6 border-1 rounded-full bg-transparent border border-primaryNew text-primaryNew text-sm sm:text-lg hover:bg-primaryNew hover:text-white flex items-center space-x-2 group">
            View all cities
            <span className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-2">
              <FaArrowRightLong />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-scroll h-[600px] scrollbar-hidden">
          <DialogHeader>
            <DialogTitle>All cities</DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {cityData.map((city, index) => (
                  <div
                    key={index}
                    className="w-[150px] sm:w-[200px] border flex flex-col items-center rounded-lg p-4 gap-4 cursor-pointer"
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllCitiesModal;
