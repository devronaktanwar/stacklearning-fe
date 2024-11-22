import { FC } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useJobFilter } from "@/context/JobFilterContext";
import { CiFilter } from "react-icons/ci";
import cities from "../data/cities.json";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface lFilterAndSortProps {}
const FilterAndSort: FC<lFilterAndSortProps> = () => {
  const {
    selectedJobLocation,
    setSelectedJobLocation,
    selectedDomain,
    setSelectedDomain,
    selectedJobType,
    setselectedJobType,
    selectedCities,
    handleRemoveCity,
    handleCitySelect,
    selectedExperience,
    setSelectedExperience
  } = useJobFilter();


  return (
    <div>
      <h2 className="text-base font-semibold pb-2 flex items-center gap-1 text-primaryNew">
        <CiFilter size={20} />
        Filter
      </h2>
      <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <div className={twMerge("flex-wrap gap-2 mb-2",selectedCities.length>0 ?"flex":"hidden")}>
            {selectedCities.map((city) => (
              <div
                key={city}
                className="flex items-center gap-2 bg-green-50 border border-green-200 text-[10px] px-2 py-1 rounded-full"
              >
                <span>{city}</span>
                <button
                  onClick={() => handleRemoveCity(city)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
          <Select onValueChange={(value) => handleCitySelect(value)} value="">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {cities.map((location) => (
                  <SelectItem key={location.value} value={location.label}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <Label>Experience Required</Label>
          <div className="flex gap-4 text-xs font-medium">
                  <div className="flex justify-between items-center gap-2">
                    <p>All</p>
                    <input
                      type="radio"
                      name="period"
                      value="all"
                      className="custom-radio"
                      checked={selectedExperience === "all"}
                      onChange={() => setSelectedExperience("all")}
                    />
                  </div>
                  <div className="flex justify-between items-center  gap-2">
                    <p>0-1 year</p>
                    <input
                      type="radio"
                      name="period"
                      value="0-1 year"
                      className="custom-radio"
                      checked={selectedExperience === "0-1 year"}
                      onChange={() => setSelectedExperience("0-1 year")}
                    />
                  </div>
                  <div className="flex justify-between items-center  gap-2">
                    <p>1-3 year</p>
                    <input
                      type="radio"
                      name="period"
                      value="1-3 year"
                      className="custom-radio"
                      checked={selectedExperience === "1-3 year"}
                      onChange={() => setSelectedExperience("1-3 year")}
                    />
                  </div>
                  <div className="flex justify-between items-center  gap-2">
                    <p>3+ year</p>
                    <input
                      type="radio"
                      name="period"
                      value="3+ year"
                      className="custom-radio"
                      checked={selectedExperience === "3+ year"}
                      onChange={() => setSelectedExperience("3+ year")}
                    />
                  </div>
                </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <Label>Job Location</Label>
          <ToggleGroup
            type="single"
            className="flex"
            value={selectedJobLocation}
            onValueChange={setSelectedJobLocation}
          >
            <ToggleGroupItem
              value="Any"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Onsite"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Onsite
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Remote"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Remote
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Hybrid"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Hybrid
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <Label>Domain</Label>
          <ToggleGroup
            type="single"
            value={selectedDomain}
            onValueChange={setSelectedDomain}
            className="flex"
          >
            <ToggleGroupItem
              value="Any"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Data Science"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Data Science
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Android"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Android
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Web"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Web
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <Label>Job Type</Label>
          <ToggleGroup
            type="single"
            className="flex justify-start"
            value={selectedJobType}
            onValueChange={(value) => {
              if (value) setselectedJobType(value);
            }}
          >
            <ToggleGroupItem
              value="Any"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Full Time"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Full Time
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Part Time"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Part Time
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Contract"
              className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-black text-xs rounded-full"
            >
              Contract
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {/* <div className="w-full flex flex-col gap-2">
          <Label htmlFor="location">Companies</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Company</SelectLabel>
                <SelectItem value="Amazon">Amazon</SelectItem>
                <SelectItem value="Google">Google</SelectItem>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Microsoft">Microsoft</SelectItem>
                <SelectItem value="Tesla">Tesla</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </div>
  );
};

export default FilterAndSort;
