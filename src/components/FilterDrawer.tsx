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
    const { selectedJobLocation, setSelectedJobLocation } = useJobFilter();
  return (
    <div>
      <Drawer>
        <DrawerTrigger className="p-1 bg-primaryNew text-white rounded">
          <RiFilter3Fill />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter by</DrawerTitle>
            <DrawerDescription className="">
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Date Posted
                </h2>
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between items-center">
                    <p>Any time</p>
                    <Checkbox />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Today</p>
                    <Checkbox />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Last week</p>
                    <Checkbox />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Last month</p>
                    <Checkbox />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Job Location
                </h2>
                <ToggleGroup
                  type="single"
                  className="flex justify-start"
                  value={selectedJobLocation}
                  onValueChange={setSelectedJobLocation}
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
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button className="bg-primaryNew hover:bg-[#317562]">Apply Filters</Button>
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
