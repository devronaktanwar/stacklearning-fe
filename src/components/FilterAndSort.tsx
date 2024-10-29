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

interface lFilterAndSortProps {}
const FilterAndSort: FC<lFilterAndSortProps> = () => {
  const { selectedJobLocation, setSelectedJobLocation, selectedDomain, setSelectedDomain } = useJobFilter();
  return (
    <div>
      <h2 className="text-base font-semibold pb-2">Filter</h2>
      <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                <SelectItem value="apple">Jaipur, Rajasthan</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
              className="px-3 data-[state=on]:bg-primaryNew data-[state=on]:text-white text-xs"
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
