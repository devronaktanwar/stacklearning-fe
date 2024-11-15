import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiOutlineBookmark } from "react-icons/hi";
import { Button } from "./ui/button";
import JobCard from "./JobCard";

const SavedJobsDrawer = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger><Button><HiOutlineBookmark/>Saved</Button></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle><div className="flex items-center gap-2 text-lg"><HiOutlineBookmark/>Saved Jobs</div></SheetTitle>
            <SheetDescription>
            <JobCard
                jobTitle={"jobTitle"}
                companyName={"companyName"}
                jobDescriptionText={""}
                image={"image"}
                tagsArray={["HTML","CSS"]}
                date="date"
                location={"location"}
                jobType={"jobType"}
                experienceRequired={"experienceRequired"}
                jobDescriptionHtml={"jobDescriptionHtml"}
                link={"link"}
                jobId={"jobId"}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SavedJobsDrawer;
