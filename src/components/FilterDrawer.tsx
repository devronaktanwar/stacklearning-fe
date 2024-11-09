import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { RiFilter3Fill } from "react-icons/ri";
import { Checkbox } from "./ui/checkbox";
import { MdOutlineCancel } from "react-icons/md";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useJobFilter } from "@/context/JobFilterContext";

const FilterDrawer = () => {
  const {
    selectedJobLocation,
    setSelectedJobLocation,
    selectedPeriod,
    setSelectedPeriod,
    selectedDomain,
    setSelectedDomain,
    selectedJobType,
    setselectedJobType
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
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter by</DrawerTitle>
            <DrawerDescription>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Date Posted
                </h2>
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between items-center">
                    <p>Any time</p>
                    <Checkbox
                      checked={selectedPeriod === "any"}
                      onCheckedChange={() => handlePeriodChange("any")}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Today</p>
                    <Checkbox
                      checked={selectedPeriod === "today"}
                      onCheckedChange={() => handlePeriodChange("today")}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Last week</p>
                    <Checkbox
                      checked={selectedPeriod === "lastWeek"}
                      onCheckedChange={() => handlePeriodChange("lastWeek")}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Last month</p>
                    <Checkbox
                      checked={selectedPeriod === "lastMonth"}
                      onCheckedChange={() => handlePeriodChange("lastMonth")}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">Domain</h2>
                <ToggleGroup
                  type="single"
                  value={selectedDomain}
                  onValueChange={setSelectedDomain}
                  className="flex justify-start"
                >
                  <ToggleGroupItem
                    value="Any"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Any
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Data Science"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Data Science
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Android"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Android
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Web"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Web
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Job Location
                </h2>
                <ToggleGroup
                  type="single"
                  className="flex justify-start"
                  value={selectedJobLocation}
                  onValueChange={(value) => {
                    if (value) setSelectedJobLocation(value);
                  }}
                >
                  <ToggleGroupItem
                    value="Any"
                    className="!py-0 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Any
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Onsite"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Onsite
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Remote"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Remote
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Hybrid"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Hybrid
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Job Type
                </h2>
                <ToggleGroup
                  type="single"
                  className="flex justify-start"
                  value={selectedJobType}
                  onValueChange={(value) => {
                    if (value) setselectedJobType(value);
                    console.log("inside --",value)
                  }}
                >
                  <ToggleGroupItem
                    value="Any"
                    className="!py-0 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Any
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Full Time"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Full Time
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Part Time"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Part Time
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Contract"
                    className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
                  >
                    Contract
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </DrawerDescription>
          </DrawerHeader>
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
