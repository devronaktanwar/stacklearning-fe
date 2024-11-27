import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { RiFilter3Fill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useJobFilter } from "@/context/JobFilterContext";
import cities from "../data/cities.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";

const FilterDrawer = () => {
  const {
    selectedJobLocationType,
    setSelectedJobLocationType,
    selectedPeriod,
    setSelectedPeriod,
    selectedDomain,
    setSelectedDomain,
    selectedJobType,
    setselectedJobType,
    handleCitySelect,
    selectedCities,
    handleRemoveCity,
    selectedExperience,
    setSelectedExperience,
  } = useJobFilter();

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="p-2 bg-primaryNew text-white rounded flex items-center text-xs gap-2">
          Filter <RiFilter3Fill />
        </DrawerTrigger>
        <DrawerContent className="">
          <DrawerHeader>
            <DrawerTitle>Filter by</DrawerTitle>
          </DrawerHeader>
          <div className="p-3 max-h-[80dvh] overflow-y-auto">
            <div className="mt-3">
              <h2 className="text-left text-xs font-medium  mb-3">
                Date Posted
              </h2>
              <div className="flex gap-4 text-xs">
                <div className="flex justify-between items-center gap-2">
                  <p>All</p>
                  <input
                    type="radio"
                    name="datePosted"
                    value="any"
                    className="custom-radio"
                    checked={selectedPeriod === "any"}
                    onChange={() => handlePeriodChange("any")}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>Today</p>
                  <input
                    type="radio"
                    name="datePosted"
                    value="today"
                    className="custom-radio"
                    checked={selectedPeriod === "today"}
                    onChange={() => handlePeriodChange("today")}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>Last week</p>
                  <input
                    type="radio"
                    name="datePosted"
                    value="lastWeek"
                    className="custom-radio"
                    checked={selectedPeriod === "lastWeek"}
                    onChange={() => handlePeriodChange("lastWeek")}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>Last month</p>
                  <input
                    type="radio"
                    name="datePosted"
                    value="lastMonth"
                    className="custom-radio"
                    checked={selectedPeriod === "lastMonth"}
                    onChange={() => handlePeriodChange("lastMonth")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-left text-xs font-medium mb-3">
                Experience
              </h2>
              <div className="flex gap-4 text-xs flex-wrap">
                <div className="flex justify-between items-center gap-2">
                  <p>All</p>
                  <input
                    type="radio"
                    name="experience"
                    value="all"
                    className="custom-radio"
                    checked={selectedExperience === "all"}
                    onChange={() => setSelectedExperience("all")}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>Fresher</p>
                  <input
                    type="radio"
                    name="experience"
                    value="fresher"
                    className="custom-radio"
                    checked={selectedExperience === "fresher"}
                    onChange={() => setSelectedExperience("fresher")}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>0-1 years</p>
                  <input
                    type="radio"
                    name="experience"
                    value="0-1 years"
                    className="custom-radio"
                    checked={selectedExperience === "0-1 years"}
                    onChange={() => setSelectedExperience("0-1 years")}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>1-3 years</p>
                  <input
                    type="radio"
                    name="experience"
                    value="1-3 years"
                    className="custom-radio"
                    checked={selectedExperience === "1-3 years"}
                    onChange={() => setSelectedExperience("1-3 years")}
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>3+ years</p>
                  <input
                    type="radio"
                    name="experience"
                    value="3+ years"
                    className="custom-radio"
                    checked={selectedExperience === "3+ years"}
                    onChange={() => setSelectedExperience("3+ years")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-left text-xs font-medium mb-3">Location</h2>
              <div
                className={twMerge(
                  "flex-wrap gap-2 mb-2",
                  selectedCities.length > 0 ? "flex" : "hidden"
                )}
              >
                {selectedCities.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 bg-green-50 border border-green-200 text-[10px] px-2 py-1 rounded-full text-black"
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
              <Select
                value=""
                onValueChange={(value) => handleCitySelect(value)}
              >
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
            <div className="mt-3">
              <h2 className="text-left text-xs font-medium mb-3">Domain</h2>
              <ToggleGroup
                type="single"
                value={selectedDomain}
                onValueChange={setSelectedDomain}
                className="flex justify-start flex-wrap"
              >
                <ToggleGroupItem
                  value="Any"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  All
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="data-science"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Data Science
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="web-development"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Web development
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="app-development"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  App development
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="ai-ml"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  AI & ML
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="sales-marketing"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Sales & Marketing
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="mt-3">
              <h2 className="text-left text-xs font-medium mb-3">
                Job Location
              </h2>
              <ToggleGroup
                type="single"
                className="flex justify-start"
                value={selectedJobLocationType}
                onValueChange={(value) => {
                  if (value) setSelectedJobLocationType(value);
                }}
              >
                <ToggleGroupItem
                  value="Any"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  All
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="onsite"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Onsite
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="remote"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Remote
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="hybrid"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Hybrid
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="mt-3">
              <h2 className="text-left text-xs font-medium mb-3">Job Type</h2>
              <ToggleGroup
                type="single"
                className="flex justify-center flex-wrap"
                value={selectedJobType}
                onValueChange={(value) => {
                  if (value) setselectedJobType(value);
                }}
              >
                <ToggleGroupItem
                  value="Any"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  All
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="Full Time"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Full Time
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="Part Time"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Part Time
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="Contract"
                  className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                >
                  Contract
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <DrawerFooter>
              <DrawerClose>
                <Button className="bg-primaryNew hover:bg-[#317562] w-full">
                  Apply Filters
                </Button>
              </DrawerClose>
              <DrawerClose className="absolute top-3 right-3">
                <MdOutlineCancel />
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
