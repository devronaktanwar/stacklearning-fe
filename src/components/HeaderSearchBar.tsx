import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cities from "../data/cities.json";
const HeaderSearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (keyword === "" && location === "") {
      navigate("/job-board");
    } else {
      navigate(`jobs/results?keyword=${keyword}&location=${location}`);
    }
  };
  return (
    <div className="border max-w-full lg:w-fit m-auto lg:p-2 p-4 bg-white rounded">
      <div className="flex justify-center text-sm items-center gap-4 flex-col lg:flex-row w-full">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="inline-flex items-center p-3 lg:py-5 py-3 gap-5 bg-[#f9fafc] lg:border-none w-full border-b">
            <PiSuitcaseSimpleBold size={20} className="text-primaryNew" />
            <input
              type="text"
              placeholder="Search keywords"
              className="bg-transparent w-full lg:w-[180px]"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="inline-flex items-center lg:p-3 gap-2 px-3 py-1 bg-[#f9fafc] lg:border-l border-b lg:border-none">
            <IoLocationOutline size={20} className="text-primaryNew" />
            <Select onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="lg:w-[180px] border-none shadow-none outline-none text-secondaryNew">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city, index) => {
                  return (
                    <SelectItem key={index} value={city.label}>
                      {city.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {/* <div className="inline-flex items-center lg:p-3 gap-2 px-3 py-1 bg-[#f9fafc] lg:border-l">
            <PiSuitcaseSimpleBold size={20} className="text-primaryNew" />
            <Select>
              <SelectTrigger className="lg:w-[180px] border-none shadow-none outline-none text-secondaryNew">
                <SelectValue placeholder="Job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Jaipur, Rajasthan</SelectItem>
                <SelectItem value="dark">Gurgaon, Haryana</SelectItem>
                <SelectItem value="system">Noida, Uttar Pradesh</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
        <div className="w-full">
          <button
            className="px-5 lg:py-4  py-2 text-white rounded-full bg-primaryNew flex items-center gap-2 w-full justify-center"
            onClick={handleSearch}
          >
            <IoSearch />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchBar;
